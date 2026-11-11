// Julkalenderns ram, delad av alla luckor i produktion/youtube/shorts/jul/ (9:16, 1080×1920).
// Varje lucka börjar på kalendern med alla 24 luckor: de tidigare dagarna står öppna, kaninen pekar på dagens lucka och
// berättaren säger "Idag öppnar vi lucka två!". Sedan åker vi in i luckan, den öppnas och innehållet tar över. Sist stängs
// luckan, vi åker ut igen, kaninen vinkar och berättaren säger "Vi ses i morgon!", så att Shorten går runt.
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script>
//   const K = await lucka.bygg(svg, 2)      läggs överst i svg:n (1080×1920); { pekare: 'kaninen-kanel' } byter figur
//   K.oppnar, K.oppen                       när luckan börjar öppnas och när den är helt öppen (innehållet börjar)
//   const DURATION = K.slut(t)              t = när innehållet är klart; luckan stängs därifrån
//   K.rita(t, stangd)                       varje bildruta; stangd 0–1 låter innehållet stänga luckan själv (tittut)
//   K.ljud()                                kalenderns ljud och repliker, i render.mjs format ({ t, fil, vol, tal })
// Dagens lucka har papper bakom kritkornet, så att det som finns bakom luckan inte lyser igenom.
// Röster: assets/ljud/roster/jul/lucka-N.m4a och vi-ses-i-morgon.m4a. Saknas de är de tysta i renderingen.
window.lucka = (() => {
const NS = 'http://www.w3.org/2000/svg', VW = 1080, VH = 1920, ROD = '#E5302A', GUL = '#F6C531', PAPPER = '#FBF7EE';
const kl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const del = ([a, b], t) => kl((t - a) / (b - a)), mjuk = k => k * k * (3 - 2 * k);
const effekt = n => `assets/ljud/effekter/${n}/${n}-1.m4a`, ROST = 'assets/ljud/roster/jul';
// en m4a-fils längd i sekunder ur dess mvhd-box (som i gissa.js), eller reserv om filen saknas
const langd = async (fil, reserv) => {
  const r = await fetch('/' + fil).catch(() => null); if (!r?.ok) return reserv;
  const b = new DataView(await r.arrayBuffer());
  for (let i = 0; i < b.byteLength - 32; i++) if (b.getUint32(i) === 0x6d766864) {   // 'mvhd'
    const v1 = b.getUint8(i + 4) === 1, o = i + (v1 ? 24 : 16);
    return (v1 ? Number(b.getBigUint64(o + 4)) : b.getUint32(o + 4)) / b.getUint32(o);
  }
  return reserv;
};
// siffrorna som kritstreck, var och en i en ruta på 100×160
const SIFFRA = ['M50 10 C15 10 10 60 10 80 C10 120 20 150 50 150 C80 150 90 120 90 80 C90 40 85 10 50 10 Z', 'M30 42 L60 10 L60 150',
  'M15 45 C15 0 85 0 85 45 C85 80 30 110 12 150 L90 150', 'M15 30 C30 0 85 5 82 42 C80 70 50 75 40 76 C60 76 90 85 88 115 C85 155 25 158 12 125',
  'M70 150 L70 10 L10 105 L92 105', 'M82 10 L25 10 L18 70 C40 55 88 60 88 105 C88 155 30 160 12 128',
  'M78 15 C40 20 12 60 12 105 C12 160 88 160 88 110 C88 65 30 65 14 100', 'M12 10 L88 10 L40 150',
  'M50 75 C10 60 15 10 50 10 C85 10 90 60 50 75 C5 92 8 150 50 150 C92 150 95 92 50 75 Z', 'M86 60 C80 100 14 95 14 52 C14 0 86 5 86 60 C88 100 75 140 30 150'];
// en lucka i helbild (1080×1920): röd kritdörr med siffran och ett gult handtag. Kalenderns små luckor är samma dörr, förminskad.
const dorr = n => `<rect x="-30" y="-30" width="${VW + 60}" height="${VH + 60}" fill="${ROD}"/>
  <rect x="70" y="70" width="${VW - 140}" height="${VH - 140}" rx="70" fill="none" stroke="#A81D18" stroke-width="22"/>
  <g transform="translate(${VW / 2} ${VH * 0.42}) scale(${n > 9 ? 3.3 : 3.6}) translate(${-(String(n).length * 130 - 30) / 2} -80)"
    fill="none" stroke="${PAPPER}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
    ${[...String(n)].map((s, i) => `<path transform="translate(${i * 130} 0)" d="${SIFFRA[s]}"/>`).join('')}</g>
  <circle cx="${VW - 170}" cy="${VH * 0.62}" r="46" fill="${GUL}"/>`;
const vax = (id, x, y, w, h) => `<filter id="${id}" filterUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}">
  <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
  <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
  <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
  <feComposite in="SourceGraphic" in2="tand" operator="in"/></filter>`;

// kalendern: 6 × 4 luckor i 9:16, så att dagens lucka fyller bilden precis när vi har åkt in i den
const KOL = 6, CW = 138, CH = CW * 16 / 9, GAP = 16, X0 = (VW - KOL * CW - (KOL - 1) * GAP) / 2, Y0 = 120, S = VW / CW;
const ruta = n => [X0 + (n - 1) % KOL * (CW + GAP), Y0 + Math.floor((n - 1) / KOL) * (CH + GAP)];
const FOT = 1660, FSK = 0.58;   // pekarens fötter och skala

async function bygg(svg, N, { pekare = 'kaninen-kanel' } = {}) {
  const [cx, cy] = ruta(N), mitt = [cx + CW / 2, cy + CH / 2], hoger = (N - 1) % KOL >= KOL / 2;   // luckan till höger: figuren står till vänster
  const liten = (n, inne) => `<g transform="translate(${ruta(n).join(' ')}) scale(${1 / S})">${inne}</g>`;
  svg.insertAdjacentHTML('beforeend', `<g id="lucka"><defs>${vax('lucka-vax', -40, -40, VW + 80, VH + 80)}
    <clipPath id="orrot"><rect width="1024" height="308"/></clipPath>
    <linearGradient id="lucka-grad"><stop offset="0" stop-color="#2A2421" stop-opacity=".3"/><stop offset="1" stop-color="#2A2421" stop-opacity="0"/></linearGradient></defs>
    <g id="lucka-rest"><rect width="${VW}" height="${VH}" fill="${PAPPER}"/><g class="lucka-kamera">
      <g filter="url(#lucka-vax)"><rect x="${X0 - 34}" y="${Y0 - 34}" width="${VW - 2 * X0 + 68}" height="${4 * CH + 3 * GAP + 68}" rx="44" fill="#2F7D46"/>
        ${Array.from({ length: 24 }, (_, i) => i + 1).filter(n => n !== N).map(n => liten(n, n < N   // tidigare dagar står öppna
          ? `<rect width="${VW}" height="${VH}" fill="#F1E7D2"/><g transform="scale(0.2 1)">${dorr(n)}<rect width="${VW}" height="${VH}" fill="#2A2421" opacity=".3"/></g>`
          : dorr(n))).join('')}</g>
      <g id="lucka-figur"></g></g></g>
    <g id="lucka-idag" class="lucka-kamera">${liten(N, `<g id="lucka-puls"><g id="lucka-dorr"><rect x="-30" y="-30" width="${VW + 60}" height="${VH + 60}" fill="${PAPPER}"/><g filter="url(#lucka-vax)">${dorr(N)}</g>
      <rect id="lucka-mork" x="-30" y="-30" width="${VW + 60}" height="${VH + 60}" fill="#2A2421" opacity="0"/></g>
      <rect id="lucka-ram" x="-10" y="-10" width="${VW + 20}" height="${VH + 20}" rx="40" fill="none" stroke="${GUL}" stroke-width="90" opacity="0"/>
      <rect id="lucka-skugga" width="140" height="${VH}" fill="url(#lucka-grad)"/></g>`)}</g></g>`);
  const id = n => svg.querySelector('#lucka' + n), kameror = [...svg.querySelectorAll('.lucka-kamera')];
  const R = await v2rigg(pekare), fig = R.figur(hoger ? 330 : 750, FOT, FSK, id('-figur')), blinka = skapaBlinka(5);
  const dIntro = await langd(`${ROST}/lucka-${N}.m4a`, 1.9);
  // tider: repliken, åka in (precis när repliken slutar), luckan öppnas; slut(t) sätter stängningen och vägen ut
  const zoom = [Math.max(1.3, 0.3 + dIntro - 0.2), 0], oppna = [0, 0];
  zoom[1] = oppna[0] = zoom[0] + 0.9; oppna[1] = oppna[0] + 0.8;
  let stang = [1e9, 1e9 + 1], ut = [1e9, 1e9 + 1], SLUT = 1e9;

  function rita(t, stangd = 0) {
    const e = mjuk(del(zoom, t)) - mjuk(del(ut, t));   // 0 = hela kalendern, 1 = inne i dagens lucka
    const k = Math.max(1 - mjuk(del(oppna, t)) + mjuk(del(stang, t)), stangd);   // 1 = stängd
    const kam = `translate(${lerp(mitt[0], VW / 2, e)} ${lerp(mitt[1], VH / 2, e)}) scale(${S ** e}) translate(${-mitt[0]} ${-mitt[1]})`;
    for (const g of kameror) g.setAttribute('transform', kam);
    id('-rest').style.display = e < 1 ? '' : 'none';
    id('-idag').style.display = k > 0 ? '' : 'none';
    // dagens lucka pulserar medan kaninen pekar; inne i luckan viks den upp åt vänster och blir lite mörkare
    const pek = mjuk(kl((t - 0.25) / 0.4)) * (1 - mjuk(del([zoom[0], zoom[0] + 0.3], t)));
    const puls = 1 + 0.07 * pek * Math.sin(Math.PI * kl((t - 0.5) / 1.2) * 2) ** 2;
    id('-ram').setAttribute('opacity', pek.toFixed(3));   // guldram kring dagens lucka
    id('-puls').setAttribute('transform', `translate(${VW / 2} ${VH / 2}) scale(${puls}) translate(${-VW / 2} ${-VH / 2})`);
    id('-dorr').setAttribute('transform', `scale(${Math.max(k, 0.001).toFixed(4)} 1)`);
    id('-mork').setAttribute('opacity', (0.35 * (1 - k)).toFixed(3));
    id('-skugga').setAttribute('transform', `translate(${(k * (VW + 30)).toFixed(1)} 0)`);
    id('-skugga').setAttribute('opacity', k < 1 ? 1 : 0);
    if (e >= 1) return;
    // pekaren: armen närmast luckan upp medan repliken sägs; på vägen ut vinkar den (armen glider upp bakom kroppen, som Kanels vink)
    const v = mjuk(kl(Math.min((t - ut[0] - 0.1) / 0.35, (SLUT - 0.1 - t) / 0.35))), upp = Math.max(pek, v);
    const arm = mjuk(kl((upp - 0.3) / 0.4)) * 60 + v * 14 * Math.sin(t * 2 * Math.PI / 1.2), gom = Math.sin(Math.PI * upp) * (upp < 1 ? 1 : 0);
    const i = v > 0 || hoger ? 1 : 0, par = x => i ? [0, x] : [x, 0];
    const s = i ? 1 : -1, skutt = Math.sin(Math.PI * kl((t - 0.45) / 0.5)) * pek;   // ett litet glatt skutt när den pekar, blicken mot luckan
    R.rita(fig, blinka({ ...R.blanda('neutral', 'glad', upp), titt: [7 * s * pek, -7 * pek] }, t),
      { ...R.POSE0, armar: par(arm + 30 * pek), gom: par(gom), luta: 5 * s * pek + Math.sin(t * 7) * 2 * v, lyft: -26 * skutt });
  }
  return {
    oppnar: oppna[0], oppen: oppna[1], rita,
    slut(t) { stang = [t, t + 0.8]; ut = [t + 0.7, t + 1.6]; return SLUT = t + 2.4; },
    ljud: () => [
      { t: 0.3, fil: `${ROST}/lucka-${N}.m4a`, vol: 2.5, tal: `Idag öppnar vi lucka ${N}!` },
      { t: zoom[0], fil: effekt('swoosh'), vol: 0.5 }, { t: oppna[0] + 0.1, fil: effekt('ding'), vol: 0.6 },
      { t: stang[0], fil: effekt('swoosh'), vol: 0.4 },
      { t: stang[0] + 0.5, fil: `${ROST}/vi-ses-i-morgon.m4a`, vol: 2.5, tal: 'Vi ses i morgon!' },
    ],
  };
}
return { bygg, langd, effekt };
})();
