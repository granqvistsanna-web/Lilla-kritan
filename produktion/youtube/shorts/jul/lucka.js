// Julkalenderns ram, delad av alla luckor i produktion/youtube/shorts/jul/. Formatet läses ur svg:ns viewBox: liggande
// 1920×1080 (det vanliga) eller stående 1080×1920 (Shorts). Luckorna har bildens egna proportioner, så att dagens lucka fyller
// bilden precis när vi har åkt in i den (kameran zoomar olika mycket för stora och små luckor).
// Kalendern är bilder: tavlan (rekvisita/kalendertavla) framför Vinterkullen (kvall: true ger kvällsbilden), luckorna
// (rekvisita/kalenderlucka, siffran ritas i kod) och mjuk snö som faller bakom tavlan och kaninen. Liggande är luckorna murade i
// olika storlekar så att de fyller tavlan (MUR) och kaninen står i förgrunden till höger. Stående (Shorts) är tavlan hög med
// 6 × 4 lika stora luckor, kaninen står under den, och öppningen är kort (ca 3,7 s, se bygg).
// Varje lucka börjar på kalendern med alla 24 luckor: de tidigare dagarna står öppna. Introt (ca 14 s), en sak i taget:
//   1 "Hej och välkommen till julkalendern!"                        jul/valkommen
//   2 kaninen vinkar, "Hej kaninen!", och kaninen svarar med sitt hej-läte   tittut/kanin-hej, effekter/kanin-gullig/kanin-hej-4
//   3 "Vilken dag är det idag?", 1,5 s för barnet medan kaninen tittar längs tavlan; sedan får dagens lucka sin guldram och kaninen pekar
//   4 "Just det, ett!"                                              jul/just-det-N (finns den inte: jul/lucka-N, "Idag öppnar vi lucka ett!")
//   5 kameran börjar åka in, "Nu öppnar vi och ser vad som finns där!", och luckan öppnas precis när repliken slutar   jul/nu-oppnar-vi
// Sedan tar innehållet över. Sist stängs luckan, vi åker ut igen, kaninen vinkar och berättaren säger "Vi ses i morgon!",
// så att filmen går runt. Repliker som inte är inspelade får en rimlig längd (RESERV) och är tysta i renderingen.
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script>
//   const K = await lucka.bygg(svg, 2)      läggs överst i svg:n; { pekare: 'kaninen-kanel' } byter figur, { kvall: true } kvällsbilden, { slut: 'vi-ses-snart' } slutrepliken (julafton)
//   await lucka.bild(src)                   laddar en bild i förväg, så att den finns i första bildrutan
//   K.oppnar, K.oppen                       när luckan börjar öppnas och när den är helt öppen (innehållet börjar)
//   const DURATION = K.slut(t)              t = när innehållet är klart; luckan stängs därifrån
//   K.rita(t, stangd)                       varje bildruta; stangd 0–1 låter innehållet stänga luckan själv (tittut)
//   K.ljud()                                kalenderns ljud och repliker, i render.mjs format ({ t, fil, vol, tal })
// Dagens lucka har papper bakom kritkornet, så att det som finns bakom luckan inte lyser igenom.
// Röster: assets/ljud/roster/jul/ (valkommen, vilken-dag, just-det-N eller lucka-N, nu-oppnar-vi, vi-ses-i-morgon) och tittut/kanin-hej.
window.lucka = (() => {
const GUL = '#F6C531', PAPPER = '#FBF7EE';
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
// en lucka i helbild (VW×VH). Kalenderns små luckor är samma dörr, förminskad. Liggande (L): bilden av luckan (handtag, panellinje
// och kritkorn finns i bilden, lite större än rutan så att ingen springa syns i kanten) med siffran i kod mitt på den fria ytan
// till vänster om handtaget. Stående är dörren 9:16: bildens kritröda yta innanför panellinjen (utsnittet x 300–1200, y 160–1360)
// fyller rutan, och panellinjen, siffran och handtaget ritas i kod i bildens färger.
const TAVLA = '/assets/rekvisita/kalendertavla/cut/kalendertavla.png', LUCKA = '/assets/rekvisita/kalenderlucka/kalenderlucka.jpeg';
const KULLE = kvall => `/assets/bakgrunder/vinterkullen${kvall ? '-natt/vinterkullen-natt.png' : '/vinterkullen.jpeg'}`;
const bild = src => new Promise(r => { const im = new Image(); im.onload = im.onerror = r; im.src = src; });
const siffror = (n, x, y, sk) => `<g transform="translate(${x} ${y}) scale(${sk}) translate(${-(String(n).length * 130 - 30) / 2} -80)"
  fill="none" stroke="${PAPPER}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
  ${[...String(n)].map((s, i) => `<path transform="translate(${i * 130} 0)" d="${SIFFRA[s]}"/>`).join('')}</g>`;
const dorrBild = (n, VW, VH, L = VW > VH) => L
  ? `<image href="${LUCKA}" x="-6" y="-3.4" width="${VW + 12}" height="${VH + 6.8}" preserveAspectRatio="none"/>${siffror(n, VW * 0.44, VH * 0.5, n > 9 ? 3 : 3.3)}`
  : `<svg x="-6" y="-3.4" width="${VW + 12}" height="${VH + 6.8}" viewBox="300 160 900 1200" preserveAspectRatio="none"><image href="${LUCKA}" width="2720" height="1530"/></svg>
  <rect x="70" y="70" width="${VW - 140}" height="${VH - 140}" rx="70" fill="none" stroke="#BF1F12" stroke-width="20"/>
  ${siffror(n, VW / 2, VH * 0.42, n > 9 ? 3.3 : 3.6)}<circle cx="${VW - 170}" cy="${VH * 0.62}" r="50" fill="#F6BE28" stroke="#D49C17" stroke-width="7"/>`;
// Liggande: luckorna murade på tavlan, [kolumn, rad, storlek] i ett rutnät 8 × 6 av rutor i 16:9. Åtta stora (2 × 2) och sexton små.
const MUR = { 1: [0, 0, 2], 2: [2, 0, 1], 3: [3, 0, 1], 4: [4, 0, 1], 5: [5, 0, 2], 6: [7, 0, 1], 7: [2, 1, 1], 8: [3, 1, 2], 9: [7, 1, 1],
  10: [0, 2, 1], 11: [1, 2, 2], 12: [5, 2, 1], 13: [6, 2, 2], 14: [0, 3, 1], 15: [3, 3, 1], 16: [4, 3, 2], 17: [0, 4, 2],
  18: [2, 4, 1], 19: [3, 4, 1], 20: [2, 5, 1], 21: [3, 5, 1], 22: [4, 5, 1], 23: [5, 5, 1], 24: [6, 4, 2] };
// tavlans bild (2501 × 1520) visas 1420 px bred med hörnet i (40, 70). I bildens egna pixlar: gröna fältet x 142, y 462,
// 2204 × 918, 30 px marginal uppe och nere, 21 px mellan rutorna i sidled (och 21 · 9/16 i höjdled, så att allt är 16:9)
const TB = 1420 / 2501, TX = 40, TY = 70, MG = 21, MH = (918 - 60 - 5 * MG * 9 / 16) / 6, MW = MH * 16 / 9, MX = 142 + (2204 - 8 * MW - 7 * MG) / 2;
// Stående (Shorts): tavlans bild 820 px bred med hörnet i (130, 50), och 6 × 4 lika stora luckor i 9:16. Fältet måste vara högre
// än i bilden, så tavlan läggs i tre delar: överdelen (snö, girlang, fältets övre hörn), mitten (bildens y 540–1300, tre gånger
// under varandra, varannan spegelvänd så att skarvarna inte syns) och nederdelen. Kaninen står under tavlan, ovanför bildens
// nedersta fjärdedel (där YouTubes knappar ligger).
const SQ = 820 / 2501, SX = 130, SY = 50, SW = 105.8, SH = SW * 16 / 9, SGX = 12, SGY = 14, SX0 = SX + 142 * SQ + (2204 * SQ - 6 * SW - 5 * SGX) / 2, SY0 = SY + 492 * SQ + 4;
const SMITT = SY + 540 * SQ, SNER = SY0 + 4 * SH + 3 * SGY + 30 * SQ + 4 - 80 * SQ, SDEL = (SNER - SMITT) / 3;   // mittens början, nederdelens början, en mittdels höjd
const tavlaDel = (y, h, vy, vh, speglad) => `<g transform="${speglad ? `translate(0 ${2 * y + h}) scale(1 -1)` : ''}"><svg x="${SX}" y="${y}" width="820" height="${h + 0.5}" viewBox="0 ${vy} 2501 ${vh}" preserveAspectRatio="none"><image href="${TAVLA}" width="2501" height="1520"/></svg></g>`;
const TAVLA_STA = [0, 1, 2].map(i => tavlaDel(SMITT + i * SDEL, SDEL, 540, 760, i % 2)).join('') + tavlaDel(SY, 540 * SQ, 0, 540) + tavlaDel(SNER, 220 * SQ, 1300, 220);
// den mjuka snön bakom tavlan: tre djup [antal, minsta radie, största, opacitet, fall px/s, svaj px]
const SNO = [[60, 3, 5, 0.6, 35, 12], [34, 6, 9, 0.8, 55, 18], [14, 11, 16, 0.92, 80, 26]];
const slump = (i, n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453 % 1 + 1) % 1;
const TAL = ['', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton',
  'arton', 'nitton', 'tjugo', 'tjugoett', 'tjugotvå', 'tjugotre', 'tjugofyra'];
const RESERV = { valkommen: 2.4, kanin: 1.4, dag: 1.7, just: 1.3, oppnar: 2.7 };   // replikernas längd (s) tills de är inspelade
const vax = (id, x, y, w, h) => `<filter id="${id}" filterUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}">
  <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
  <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
  <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
  <feComposite in="SourceGraphic" in2="tand" operator="in"/></filter>`;

async function bygg(svg, N, { pekare = 'kaninen-kanel', kvall = false, slut = 'vi-ses-i-morgon' } = {}) {
  // ruta(n) = [x, y, bredd] för lucka n. Stående: 6 × 4 lika stora. Liggande (L): murade på tavlans bild.
  const { width: VW, height: VH } = svg.viewBox.baseVal, L = VW > VH, dorr = n => dorrBild(n, VW, VH), KOL = 6;
  const ruta = n => { if (!L) return [SX0 + (n - 1) % KOL * (SW + SGX), SY0 + Math.floor((n - 1) / KOL) * (SH + SGY), SW];
    const [k, r, s] = MUR[n]; return [TX + TB * (MX + k * (MW + MG)), TY + TB * (492 + r * (MH + MG * 9 / 16)), TB * (s * MW + (s - 1) * MG)]; };
  const FOT = L ? 985 : 1425, FSK = L ? 0.67 : 0.5;   // pekarens fötter och skala
  const [cx, cy, cw] = ruta(N), S = VW / cw, mitt = [cx + cw / 2, cy + cw * VH / VW / 2], hoger = !L && (N - 1) % KOL >= KOL / 2;   // stående, luckan till höger: figuren står till vänster
  const liten = (n, inne) => { const [x, y, w] = ruta(n); return `<g transform="translate(${x} ${y}) scale(${w / VW})">${inne}</g>`; };
  const ovriga = Array.from({ length: 24 }, (_, i) => i + 1).filter(n => n !== N).map(n => liten(n, n < N   // tidigare dagar står öppna
    ? `<rect width="${VW}" height="${VH}" fill="#F1E7D2"/><g transform="scale(0.2 1)">${dorr(n)}<rect width="${VW}" height="${VH}" fill="#2A2421" opacity=".3"/></g>`
    : dorr(n))).join('');
  const flingor = SNO.flatMap(([antal, r0, r1], d) => Array.from({ length: antal }, (_, i) =>
    `<circle class="lucka-flinga" r="${(1.25 * (r0 + (r1 - r0) * slump(i, 3 + d))).toFixed(1)}" fill="url(#lucka-mjuk)" opacity="${SNO[d][3]}"/>`)).join('');
  await Promise.all([TAVLA, LUCKA, KULLE(kvall)].map(bild));
  svg.insertAdjacentHTML('beforeend', `<g id="lucka"><defs>${vax('lucka-vax', -40, -40, VW + 80, VH + 80)}
    <clipPath id="orrot"><rect width="1024" height="308"/></clipPath>
    <radialGradient id="lucka-mjuk"><stop offset=".62" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="lucka-grad"><stop offset="0" stop-color="#2A2421" stop-opacity=".3"/><stop offset="1" stop-color="#2A2421" stop-opacity="0"/></linearGradient></defs>
    <g id="lucka-rest"><rect width="${VW}" height="${VH}" fill="${PAPPER}"/><g class="lucka-kamera">
      <image href="${KULLE(kvall)}" width="${VW}" height="${VH}" preserveAspectRatio="xMidYMid slice"/>${flingor}
      ${L ? `<image href="${TAVLA}" x="${TX}" y="${TY}" width="1420" height="${1420 * 1520 / 2501}"/>` : TAVLA_STA}${ovriga}
      <g id="lucka-figur"></g></g></g>
    <g id="lucka-idag" class="lucka-kamera">${liten(N, `<g id="lucka-puls"><g id="lucka-dorr"><rect x="-6" y="-3.4" width="${VW + 12}" height="${VH + 6.8}" fill="${PAPPER}"/>${dorr(N)}
      <rect id="lucka-mork" x="-6" y="-3.4" width="${VW + 12}" height="${VH + 6.8}" fill="#2A2421" opacity="0"/></g>
      <rect id="lucka-ram" x="-10" y="-10" width="${VW + 20}" height="${VH + 20}" rx="40" fill="none" stroke="${GUL}" stroke-width="${S * 11.5}" opacity="0"/>
      <rect id="lucka-skugga" width="140" height="${VH}" fill="url(#lucka-grad)"/></g>`)}</g></g>`);
  const id = n => svg.querySelector('#lucka' + n), kameror = [...svg.querySelectorAll('.lucka-kamera')], FL = [...svg.querySelectorAll('.lucka-flinga')];
  const FX = L ? 1620 : hoger ? 300 : 780, R = await v2rigg(pekare), fig = R.figur(FX, FOT, FSK, id('-figur')), blinka = skapaBlinka(5);
  // pekaren siktar på dagens lucka: armen närmast tavlan (PI) vrids så att den pekar från axeln mot luckans mitt, och blicken går dit.
  // Armens viloaxel är ca 115° (kaninen: snett ner och utåt, mätt i stillbilder mot luckorna); armar räknas uppåt från den, uttryckets egna 16° dras av.
  const PI = !L && hoger ? 1 : 0, [ax, ay] = R.RIGG[PI ? 'arm-r' : 'arm-l'], mot = [mitt[0] - FX - (ax - 512) * FSK, mitt[1] - FOT - (ay - R.FOTTER) * FSK];
  const vinkel = Math.atan2(mot[1], mot[0]) * 180 / Math.PI, sikte = kl((PI ? 65 - vinkel : (vinkel + 360) % 360 - 115) - 16, 20, 125), blick = mot.map(v => 7 * v / Math.hypot(...mot));
  // introts repliker och längder: "Just det, N!" om den finns, annars "Idag öppnar vi lucka N!"
  const harJust = await langd(`${ROST}/just-det-${N}.m4a`, 0), JUST = harJust ? `just-det-${N}` : `lucka-${N}`;
  const [dV, dK, dD, dJ, dO] = await Promise.all([langd(`${ROST}/valkommen.m4a`, RESERV.valkommen), langd('assets/ljud/roster/tittut/kanin-hej.m4a', RESERV.kanin),
    langd(`${ROST}/vilken-dag.m4a`, RESERV.dag), harJust || langd(`${ROST}/lucka-${N}.m4a`, RESERV.just), langd(`${ROST}/nu-oppnar-vi.m4a`, RESERV.oppnar)]);
  // tider (rörelsen först, repliken 0,4 s in): välkommen · kaninen vinkar (VINK), "Hej kaninen!", kaninens läte (LATE) · frågan (FRAGA),
  // 1,5 s för barnet · guldramen och pekandet (PEK), "Just det, N!" · kameran åker in (zoom), "Nu öppnar vi …", luckan öppnas när repliken slutar
  // Stående (Shorts) är öppningen kort, ca 3,7 s: dagens lucka har guldramen från början, kaninen pekar, "Idag öppnar vi lucka N!",
  // och kameran åker in när repliken slutar. Ingen hälsning och ingen fråga (VINK, LATE, FRAGA inträffar aldrig).
  const VINK = L ? 0.4 + dV + 0.3 : -9, LATE = L ? VINK + 0.4 + dK + 0.1 : -9, FRAGA = L ? LATE + 0.85 + 0.45 : -9, PEK = L ? FRAGA + dD + 1.5 : 0.25;
  const dN = L ? 0 : await langd(`${ROST}/lucka-${N}.m4a`, 1.9), zoom = [L ? PEK + 0.5 + dJ + 0.3 : Math.max(1.3, 0.3 + dN - 0.2), 0], oppna = [0, 0];
  if (L) { oppna[1] = zoom[0] + 0.4 + dO; zoom[1] = oppna[0] = oppna[1] - 0.8; } else { zoom[1] = oppna[0] = zoom[0] + 0.9; oppna[1] = oppna[0] + 0.8; }
  const ANDA = ruta(1).map((v, i) => [v + ruta(1)[2] / 2, ruta(24)[i] + ruta(24)[2] / 2]);   // blicken går längs tavlan: från lucka 1 till lucka 24
  let stang = [1e9, 1e9 + 1], ut = [1e9, 1e9 + 1], SLUT = 1e9;

  function rita(t, stangd = 0) {
    const e = mjuk(del(zoom, t)) - mjuk(del(ut, t));   // 0 = hela kalendern, 1 = inne i dagens lucka
    const k = Math.max(1 - mjuk(del(oppna, t)) + mjuk(del(stang, t)), stangd);   // 1 = stängd
    const kam = `translate(${lerp(mitt[0], VW / 2, e)} ${lerp(mitt[1], VH / 2, e)}) scale(${S ** e}) translate(${-mitt[0]} ${-mitt[1]})`;
    for (const g of kameror) g.setAttribute('transform', kam);
    id('-rest').style.display = e < 1 ? '' : 'none';
    id('-idag').style.display = k > 0 ? '' : 'none';
    // dagens lucka pulserar medan kaninen pekar; inne i luckan viks den upp åt vänster och blir lite mörkare
    const pek = mjuk(kl((t - PEK) / 0.4)) * (1 - mjuk(del([zoom[0], zoom[0] + 0.3], t)));
    const puls = 1 + 0.07 * pek * Math.sin(Math.PI * kl((t - PEK - 0.25) / 1.2) * 2) ** 2;
    id('-ram').setAttribute('opacity', pek.toFixed(3));   // guldram kring dagens lucka
    id('-puls').setAttribute('transform', `translate(${VW / 2} ${VH / 2}) scale(${puls}) translate(${-VW / 2} ${-VH / 2})`);
    id('-dorr').setAttribute('transform', `scale(${Math.max(k, 0.001).toFixed(4)} 1)`);
    id('-mork').setAttribute('opacity', (0.35 * (1 - k)).toFixed(3));
    id('-skugga').setAttribute('transform', `translate(${(k * (VW + 30)).toFixed(1)} 0)`);
    id('-skugga').setAttribute('opacity', k < 1 ? 1 : 0);
    if (e >= 1) return;
    // snön faller långsamt och svajar (4–6 s per svaj), samma platser varje gång; flingan börjar om uppifrån
    let j = 0; for (const [antal, , , , fall, svaj] of SNO) for (let i = 0; i < antal; i++, j++) {
      FL[j].setAttribute('cx', (slump(j, 1) * VW + svaj * Math.sin(2 * Math.PI * t / (4 + 2 * slump(j, 5)) + 6.28 * slump(j, 6))).toFixed(1));
      FL[j].setAttribute('cy', ((slump(j, 2) * (VH + 60) + fall * t) % (VH + 60) - 30).toFixed(1)); }
    // pekaren: armen närmast luckan upp medan repliken sägs; på vägen ut vinkar den (armen glider upp bakom kroppen, som Kanels vink)
    // I introt vinkar den först hej med den fria armen (hej: från VINK tills lätet har klingat ut), och medan barnet tänker (soker:
    // från frågan till pekandet) går blicken lugnt längs tavlan
    const hej = mjuk(kl(Math.min((t - VINK) / 0.35, (LATE + 0.85 - t) / 0.35))), v = Math.max(hej, mjuk(kl(Math.min((t - ut[0] - 0.1) / 0.35, (SLUT - 0.1 - t) / 0.35)))), upp = Math.max(pek, v);
    const arm = mjuk(kl((upp - 0.3) / 0.4)) * (v > 0 ? 60 : sikte) + v * 14 * Math.sin(t * 2 * Math.PI / 1.2), gom = Math.sin(Math.PI * upp) * (upp < 1 ? 1 : 0);
    const i = hej > 0 ? 1 - PI : !L && v > 0 ? 1 : PI, par = x => i ? [0, x] : [x, 0];   // liggande: armen mot tavlan när den pekar och vinkar hej då
    const s = PI ? 1 : -1, skutt = Math.sin(Math.PI * kl((t - PEK - 0.2) / 0.5)) * pek;   // ett litet glatt skutt när den pekar, blicken mot luckan
    const soker = L ? mjuk(kl((t - FRAGA - 0.3) / 0.4)) * (1 - mjuk(kl((t - PEK + 0.2) / 0.3))) : 0, u = mjuk(kl((t - FRAGA - dD) / 1.5));
    const dit = [lerp(ANDA[0][0], ANDA[0][1], u) - FX, lerp(ANDA[1][0], ANDA[1][1], u) - FOT + 355 * FSK].map((d, _, a) => 7 * d / Math.hypot(...a));
    // kroppen böjer sig från fötterna (boj) mot tavlan när den pekar och söker och gungar när den vinkar; medan den bara står och
    // lyssnar ser den sig omkring (riggens vila)
    const f0 = { ...R.blanda('neutral', 'glad', Math.max(upp, soker)), titt: blick.map((b, j) => b * pek + dit[j] * soker) };
    const p0 = { ...R.POSE0, armar: par(arm), gom: par(gom), rikt: 0.7 * s * soker, luta: s * (1.5 * pek + soker), boj: s * (4 * pek + 2.5 * soker) + Math.sin(t * 7) * 3 * v, lyft: -26 * skutt };
    const [fv, pv] = R.vila(f0, p0, t), w = (1 - upp) * (1 - soker);
    R.rita(fig, blinka(R.blanda(f0, fv, w), t), R.blandaPose(p0, pv, w));
  }
  return {
    oppnar: oppna[0], oppen: oppna[1], rita,
    slut(t) { stang = [t, t + 0.8]; ut = [t + 0.8, t + 1.7]; return SLUT = t + 2.4; },   // kameran backar först när luckan är helt stängd
    ljud: () => [...(L ? [
      { t: 0.4, fil: `${ROST}/valkommen.m4a`, vol: 2.5, tal: 'Hej och välkommen till julkalendern!' },
      { t: VINK + 0.4, fil: 'assets/ljud/roster/tittut/kanin-hej.m4a', vol: 2.5, tal: 'Hej kaninen!' },
      { t: LATE, fil: 'assets/ljud/effekter/kanin-gullig/kanin-hej-4.m4a', vol: 1.3 },   // kaninens eget hej, lägre än berättaren
      { t: FRAGA, fil: `${ROST}/vilken-dag.m4a`, vol: 2.5, tal: 'Vilken dag är det idag?' },
      { t: PEK + 0.5, fil: `${ROST}/${JUST}.m4a`, vol: 2.5, tal: harJust ? `Just det, ${TAL[N]}!` : `Idag öppnar vi lucka ${TAL[N]}!` },
      { t: zoom[0] + 0.4, fil: `${ROST}/nu-oppnar-vi.m4a`, vol: 2.5, tal: 'Nu öppnar vi och ser vad som finns där!' },
    ] : [{ t: 0.3, fil: `${ROST}/lucka-${N}.m4a`, vol: 2.5, tal: `Idag öppnar vi lucka ${TAL[N]}!` }]),
      { t: zoom[0], fil: effekt('swoosh'), vol: 1.5 }, { t: oppna[0] + 0.1, fil: effekt('ding'), vol: 1.3, fadeIn: 0.003 },   // hörs över musiken, under rösten
      { t: stang[0], fil: effekt('swoosh'), vol: 1.4 },
      { t: stang[0] + 0.5, fil: `${ROST}/${slut}.m4a`, vol: 2.5, tal: slut === 'vi-ses-snart' ? 'Vi ses snart!' : 'Vi ses i morgon!' },
    ],
  };
}
return { bygg, langd, effekt, vax, bild, KULLE };
})();
