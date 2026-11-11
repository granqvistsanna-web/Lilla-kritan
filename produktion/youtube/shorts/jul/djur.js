// Julkalenderns djurluckor: ett djur (v2-rigg) står i snön bakom luckan och gör en liten sak, medan berättaren pratar.
// Liggande 1920×1080 är det vanliga; ?staende (render.mjs --staende) ger 1080×1920 för Shorts ur samma fil. Allt bakom luckan
// ritas i scenens mått: (0, 0) är marken under djuret mitt i bild, uppåt är minus, och liggande är scenen förminskad (E).
// En lucka är en index.html med bara djuret och scenen, bit för bit:
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script><script src="/produktion/youtube/shorts/jul/djur.js"></script>
//   julDjur.kor({ lucka: 2, figur: 'lammet-ludde', vinkArm: [38, 16], skala: 0.95,
//     scen: [[sekunder, rörelse, { sag: [[fil, text, vid]], ljud: [[namn, vid, variant]] }], ...] })
// Rörelser: stilla, vinka, hoppa (ett hopp), klappa, dansa, nicka, och för tittut med luckan: borta (luckan stängd) och
// glant (luckan på glänt, djuret kikar fram vid kanten). Varje bit blandas mjukt från den förra (0,4 s).
// Snön: snoar = det börjar snöa (flingorna faller från den biten och framåt) och djuret tittar upp; fanga = ett hopp där en
// stor snöflinga landar på nosen i hoppets topp (0,85 s in) och smälter efter landningen. nos: [x, y] i riggens 1024-ruta.
// Saken: sak: 'hjarta' | 'pulka' | 'ljus' | 'kula' | 'snogubbe' (ritade i kod, se SAKER), sakPlats: [x, y] flyttar den,
// x: djurets plats i sidled, kvall: true ger kvällen (också i kalendern), backe: grader gör kullen till en backe ner åt höger (ritad i kod).
// Liggande är platsen bilden av Vinterkullen (assets/bakgrunder/vinterkullen, -natt på kvällen); stående och backen ritas i kod.
// Saken finns från biten "sak" (den poppar fram och djuret tittar på den), eller från början om ingen sådan bit finns.
// Rörelser med saken: tittar (ser på den), nyfiken, oj (förvånad), putta (lutar sig mot den och nuddar den vid: sekunder in, standard 0,5),
// vagga (gungar från sida till sida), glid (djuret och pulkan åker ut till höger och kommer in igen från vänster; sats: sekunder
// den tar sats först, standard 0,3). ser: true på en bit = djuret tittar på saken medan det gör bitens rörelse (vinkar till snögubben),
// ser: [x, y] = på en punkt räknad från sakens plats (skärvorna på snön).
// Ljusen: tand: [sekunder, …] på en bit = kritan kommer in och tänder ett ljus vid varje tid, blink: [...] = lågorna blinkar till.
// Kulan: faller, spade och ritar (sekunder in i biten), se SAKER.kula.
// sag: berättarens repliker, [fil, text, vid, ss, langd, styrka]: fil under assets/ljud/roster/ utan .m4a, vid = sekunder in i biten
// (rörelsen först, repliken 0,4–0,8 s in), ss och langd = bara en del av filen (när tre ord i en replik ska ligga på var sin rörelse), styrka 2,5 om inget anges (högre för en tyst tagning).
// ljud: [namn, vid, variant, styrka, langd, ss]: effekter ur assets/ljud/effekter/<namn>/<namn>-<variant>.m4a, styrka 1,5 om inget anges
// (djurets hej då-läte ska ligga under berättaren: 0,75 för hundens), langd och ss = bara en del av ljudet (ett bräk ur en fil med två). Djurets läten ska börja när berättarens replik är slut och vara
// klara före nästa. Efter renderingen: mastra.sh <mapp> (−16 LUFS, gör också förhandskopian). Saknade filer är tysta i renderingen.
// Förhandsvisning: http://127.0.0.1:8765/<mapp>/ (python3 -m http.server 8765 i repots rot), stående med ?staende. Rendering:
//   node avsnitt/004-bussen-badar/scener/render.mjs <mapp>            -> <mapp>/<namn>.mp4 (liggande), stillbilder i stills/
//   node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende  -> <mapp>/<namn>-staende.mp4, stills-staende/
window.julDjur = (() => {
const kl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), mjuk = k => k * k * (3 - 2 * k), lerp = (a, b, k) => a + (b - a) * k;
const pop = k => mjuk(kl(k)) * (1 + 0.2 * Math.sin(Math.PI * kl(k)));   // poppar fram med en liten studs
const BAD = 'assets/ljud/musik/gissa-bad.m4a';   // musiken under, samma som i Gissa
const STANGD = { borta: 1, glant: 0.78 };   // hur stängd luckan är i tittut-bitarna
const ROD = '#E5302A', GUL = '#F6C531', GRON = '#2F7D46', KOL = '#3B3431';

// Sakerna, ritade i kod som kritteckningar med vit klisterkant. Måtten är scenens, med saken kring sin plats.
// plats [x, y] · ruta = kritkornets område kring platsen · bak/fram = det som ligger bakom/framför djuret · med: saken
// följer med djuret (pulkan) · ser [dx, dy] = dit djuret tittar · rita(el, s) sätter saken varje bildruta: el(namn) är
// elementet #sak-namn, s = { tt, b: biten, tl: sekunder in i den, syns: 0–1 från biten "sak", bitar, sida, tak, kant }.
// ruta2 = ett andra, mindre kornområde (sak-vax2) för små saker som rör sig.
const klister = (d, farg, mer = '', vax = 'sak-vax') => `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>
  <g filter="url(#${vax})"><path d="${d}" fill="${farg}"/>${mer}</g>`;
const HJARTA = 'M0 118 C-175 5 -160 -120 -78 -120 C-34 -120 -6 -92 0 -62 C6 -92 34 -120 78 -120 C160 -120 175 5 0 118 Z';
const KRITA = 'M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z';   // gissas krita, spetsen i (0, 0)
// den lilla kritan utan ansikte (gissas krita), lutad, med spetsen i (0, 0)
const kritaBild = (farg, vax) => `<g transform="rotate(38) scale(0.75)">${klister(KRITA, farg, '<path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="#fff" opacity=".4"/>', vax)}</g>`;
const BALJA = 'M-360 -150 Q0 -92 300 -150 L395 -232 Q452 -246 442 -196 Q420 -30 285 26 L-265 26 Q-352 14 -360 -150 Z';
const SAKER = {
  // pepparkakshjärtat: brunt med en prickad vit kristyrkant, gungar i takt medan djuret dansar och klappar
  hjarta: { plats: [-330, -430], ruta: [-230, -230, 460, 460],
    fram: `<g id="sak-a">${klister(HJARTA, '#B4703A', `<path d="${HJARTA}" transform="translate(0 -4) scale(0.72)" fill="none" stroke="#fff" stroke-width="15" stroke-linecap="round" stroke-dasharray="0.1 31"/>`)}</g>`,
    rita(el, { syns, b, tl }) { const takt = /dansa|klappa/.test(b.typ) ? mjuk(kl(Math.min(tl, b.d - tl) / 0.4)) : 0;
      el('a').setAttribute('transform', `translate(${20 * takt * Math.sin(2 * Math.PI * tl)} ${-16 * takt * Math.abs(Math.sin(2 * Math.PI * tl))}) rotate(${14 * takt * Math.sin(2 * Math.PI * tl)}) scale(${1.1 * syns})`); } },
  // pulkan: en röd balja med uppsvängd nos och gult snöre. Djuret sitter i den: baljans insida bakom, framsidan framför
  pulka: { plats: [0, 0], med: true, ser: [60, 0], ruta: [-440, -330, 960, 420],
    bak: `<g id="sak-a"><path d="M-360 -150 Q0 -222 300 -150 Q0 -92 -360 -150Z" fill="#A81D18" stroke="#fff" stroke-width="14" stroke-linejoin="round"/></g>`,
    fram: `<g id="sak-b">${klister(BALJA, ROD, `<path d="M-300 -30 Q0 6 300 -40" fill="none" stroke="#A81D18" stroke-width="12" stroke-linecap="round"/>`)}
      <path d="M418 -226 Q372 -128 300 -262" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round"/>
      <path d="M418 -226 Q372 -128 300 -262" fill="none" stroke="${GUL}" stroke-width="11" stroke-linecap="round"/></g>`,
    rita(el, { syns }) { for (const n of 'ab') el(n).setAttribute('transform', `scale(${syns})`); } },
  // fyra röda ljus i snön (platsen är det vänstra ljuset) och en liten gul krita som tänder dem från vänster: lågan ritas när kritan nuddar veken
  ljus: (() => { const X = i => i * 104, VEKE = -262;
    const ljus = [0, 1, 2, 3].map(i => `<path transform="translate(${X(i)} 0)" d="M-35 14 L-35 -210 Q-35 -236 0 -236 Q35 -236 35 -210 L35 14 Z"`);
    return { plats: [-500, 0], ser: [156, -200], ruta: [-130, -400, 640, 460],
      fram: `<radialGradient id="sak-sken"><stop offset="0" stop-color="#FFD76A" stop-opacity=".7"/><stop offset=".45" stop-color="#FFB84A" stop-opacity=".32"/><stop offset="1" stop-color="#FFA63C" stop-opacity="0"/></radialGradient>
        ${ljus.map(l => `${l} fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>`).join('')}
        <g filter="url(#sak-vax)">${ljus.map(l => `${l} fill="${ROD}"/>`).join('')}</g>
        ${[0, 1, 2, 3].map(i => `<path d="M${X(i)} -236 L${X(i)} ${VEKE}" stroke="${KOL}" stroke-width="7" stroke-linecap="round"/>
          <ellipse class="sno" cx="${X(i)}" cy="16" rx="66" ry="20"/>
          <g id="sak-laga${i}" transform="scale(0)"><circle cy="-36" r="120" fill="url(#sak-sken)"/>
            <path d="M0 -84 C40 -40 34 2 0 2 C-34 2 -40 -40 0 -84 Z" fill="${GUL}" stroke="#fff" stroke-width="9" stroke-linejoin="round" paint-order="stroke"/>
            <path d="M0 -46 C17 -24 14 -4 0 -4 C-14 -4 -17 -24 0 -46 Z" fill="#F08A24"/></g>`).join('')}
        <g id="sak-krita">${kritaBild(GUL)}</g>`,
      rita(el, { tt, bitar, tak, sida }) {
        const T = bitar.flatMap(b => (b.tand ?? []).map(v => b.t0 + v)), B = bitar.flatMap(b => (b.blink ?? []).map(v => b.t0 + v));
        // lågan växer fram när den tänds och blinkar till (större en halv sekund) när vi räknar igen
        T.forEach((t, i) => el('laga' + i).setAttribute('transform', `translate(${X(i)} ${VEKE}) scale(${pop((tt - t) / 0.35) * (1 + 0.4 * Math.sin(Math.PI * kl((tt - (B[i] ?? 1e9)) / 0.5)))})`));
        // kritan: in uppifrån till första veken (2,6 s, i bild efter 0,3 s), väntar där 0,8 s (nu händer det snart) och tänder; en liten båge
        // till nästa veke 0,45 s efter lågan, väntar igen, och ut 0,2 s efter den sista lågan
        const UT = [sida < 0 ? X(0) - 260 : X(3) + 260, tak - 80], vid = i => [X(i), VEKE]; let p = UT;   // in från den sida där djuret inte står
        T.forEach((t, i) => { const fran = i ? vid(i - 1) : UT, t0 = i ? T[i - 1] + 0.45 : t - 3.4, u = kl((tt - t0) / Math.max(0.2, t - 0.8 - t0)), k = i ? mjuk(u) : 1 - (1 - u) ** 2;   // in: fort först, så att den syns direkt
          if (tt > t0) p = [lerp(fran[0], X(i), k), lerp(fran[1], VEKE, k) - (i ? 60 * Math.sin(Math.PI * k) : 0) - 7 * Math.sin(Math.PI * kl((tt - t + 0.8) / 0.8)) ** 2]; });
        const k = mjuk(kl((tt - T.at(-1) - 0.2) / 1.0)); if (k > 0) p = [lerp(p[0], UT[0], k), lerp(p[1], UT[1], k)];
        el('krita').setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) scale(${sida < 0 ? -1 : 1} 1)`); } }; })(),
  // granen med julkulan: en hel gran (platsen är stammens fot) och en röd kula i ett snöre från en gren i noshöjd. Kulan poppar
  // fram i biten "sak", gungar när djuret puttar på den (dämpad pendel) och följer med när djuret vaggar. På bitarna:
  // faller: sekunder = snöret släpper, kulan faller (0,45 s), spricker och ligger i skärvor på snön · spade: sekunder = en liten spade
  // kommer in från höger, tar skärvorna och åker ut (2,6 s) · ritar: sekunder = den röda kritan kommer in och ritar en ny
  // kula: snöret, sedan kulan inifrån och ut, sist hatten (klar efter 3,25 s, kritan ute efter 4,2 s)
  kula: (() => { const P0 = [-200, -560], SN = 100, R = 70, FALL = -P0[1] - SN - 2 * R + 10;   // snörets fäste, dess längd, kulans radie, fallet till snön
    const vaning = (b, y0, y1) => `M${-b} ${y0} Q${-b / 2} ${y0 + 46} 0 ${y0} Q${b / 2} ${y0 + 46} ${b} ${y0} L0 ${y1} Z`;
    const GRAN = [['M-36 16 L-36 -160 L36 -160 L36 16 Z', '#6B4A2E'], [vaning(270, -130, -640), GRON], [vaning(200, -560, -870), '#37894F'], [vaning(132, -780, -960), '#409659']];
    const SKARVOR = [[-120, 2, 20], [-58, 14, -40], [10, 4, 65], [72, 16, -15], [132, 0, 35]];   // skärvorna på snön: x, y, vridning
    const skarva = i => i === 2 ? `<rect x="-16" y="-11" width="32" height="22" rx="6" fill="${GUL}" stroke="#fff" stroke-width="8" paint-order="stroke"/>`
      : klister('M-26 8 Q-12 -28 24 -10 Q4 -2 -6 18 Z', ROD, '', 'sak-vax2'), PLATS = i => 28 + 18 * i;   // PLATS: skärvans plats på spadbladet
    return { plats: [326, 0], ser: [P0[0], P0[1] + SN + R], ruta: [-320, -1010, 640, 1050], ruta2: [-660, -300, 1320, 600],
      bak: `${GRAN.map(([d]) => `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>`).join('')}
        <g filter="url(#sak-vax)">${GRAN.map(([d, f]) => `<path d="${d}" fill="${f}" stroke="${f}" stroke-width="5" stroke-linejoin="round"/>`).join('')}</g>
        <ellipse class="sno" cy="20" rx="120" ry="22"/>`,
      fram: `<g id="sak-pendel"><path id="sak-snore" stroke="${GUL}" stroke-width="7" stroke-linecap="round"/>
          <g id="sak-boll"><circle r="${R}" fill="#fff" stroke="#fff" stroke-width="14"/>
            <g filter="url(#sak-vax2)"><circle r="${R}" fill="${ROD}"/><path d="M-42 -16 Q-36 -46 -8 -54" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".85"/></g>
            <path id="sak-spricka" d="M-10 -62 L12 -30 L-16 -4 L14 24 L-8 60 M12 -30 L44 -18 M-16 -4 L-48 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></g>
          <rect id="sak-hatt" x="-18" y="-14" width="36" height="26" rx="6" fill="${GUL}" stroke="#fff" stroke-width="8" paint-order="stroke"/></g>
        <g id="sak-skarvor" transform="translate(${P0[0]} -8)">${SKARVOR.map((_, i) => `<g>${skarva(i)}</g>`).join('')}</g>
        <g id="sak-spade"><path d="M128 0 L400 -62 M388 -92 L412 -32" fill="none" stroke="#fff" stroke-width="32" stroke-linecap="round"/>
          ${klister('M0 0 Q4 -34 44 -40 L128 -34 Q138 0 128 34 L44 40 Q4 34 0 0 Z', '#8FA3B5', `<path d="M128 0 L400 -62 M388 -92 L412 -32" fill="none" stroke="#B5793A" stroke-width="18" stroke-linecap="round"/>`, 'sak-vax2')}
          ${SKARVOR.map(([, , a], i) => `<g class="last" transform="translate(${PLATS(i)} -4) rotate(${a})" opacity="0">${skarva(i)}</g>`).join('')}</g>
        <g id="sak-krita">${kritaBild(ROD, 'sak-vax2')}</g>`,
      rita(el, { tt, b, tl, syns, bitar, sida, tak, kant }) {
        const tid = n => { const p = bitar.find(p => p[n] != null); return p ? p.t0 + p[n] : 1e9; }, TF = tid('faller'), sp = tt - tid('spade'), r = tt - tid('ritar');
        let v = b.typ === 'vagga' ? 9 * Math.sin(2 * Math.PI * tl / 1.4) * mjuk(kl(Math.min(tl, b.d - tl) / 0.5)) : 0;
        for (const p of bitar) { const u = tt - p.t0 - (p.vid ?? 0.5); if (p.typ === 'putta' && u > 0) v -= 34 * sida * Math.sin(2 * Math.PI * u / 1.2) * Math.exp(-0.9 * u); }
        // kulan: den första poppar fram (syns) och faller; den nya (r >= 0) ritas: snöret 1,0–1,4 s, kulan 1,4–3,0 s, hatten 3,0 s
        // När den landar spricker den (0,2 s: en vit spricka, lite hoptryckt mot snön), sedan far skärvorna isär i en låg båge
        const ny = r >= 0, fall = kl((tt - TF) / 0.45) ** 2, k3 = kl((r - 1.4) / 1.6), kras = ny ? 0 : kl((tt - TF - 0.45) / 0.2), tryck = 0.14 * Math.sin(Math.PI * kras);
        el('pendel').setAttribute('transform', `translate(${P0[0]} ${P0[1] + (ny ? 0 : FALL * fall)}) rotate(${(ny && r < 3.2 ? 0 : v).toFixed(2)})`);
        el('pendel').setAttribute('opacity', ny || kras < 1 ? 1 : 0);
        el('spricka').setAttribute('opacity', kras > 0 && kras < 1 ? 1 : 0);
        el('snore').setAttribute('d', `M0 0 L0 ${SN * (ny ? kl((r - 1) / 0.4) : kl(syns))}`);
        el('snore').setAttribute('opacity', (ny ? r > 1 : syns > 0) ? 1 : 0);
        el('boll').setAttribute('transform', kras > 0 ? `translate(0 ${SN + 2 * R}) scale(${1 + tryck} ${1 - tryck}) translate(0 ${-R})`
          : `translate(0 ${SN}) scale(${ny ? k3 : syns}) translate(0 ${R})`);   // växer från snörets ände
        el('hatt').setAttribute('transform', `translate(0 ${SN}) scale(${ny ? pop((r - 3) / 0.25) : syns})`);
        // spaden: in från höger längs snön (1 s), lyfter (0,4 s), ut igen (1,2 s). När bladet har glidit in under en skärva ligger
        // den på bladet (kopian i spadens grupp) och åker med ut
        const XR = kant - this.plats[0] + 80, in_ = mjuk(kl(sp / 1.0)), blad = lerp(XR, P0[0] - 190, in_), lyft = mjuk(kl((sp - 1.0) / 0.4));
        el('spade').setAttribute('transform', `translate(${lerp(blad, XR, mjuk(kl((sp - 1.4) / 1.2))).toFixed(1)} ${-36 * lyft}) rotate(${10 * lyft}) scale(1.5)`);
        const pa = el('spade').querySelectorAll('.last');
        el('skarvor').querySelectorAll(':scope > g').forEach((e, i) => { const [x, y, a] = SKARVOR[i], u = kl((tt - TF - 0.57) / 0.4), k = 1 - (1 - u) ** 2;
          const tagen = sp > 0 && blad <= P0[0] + x - 1.5 * PLATS(i);
          e.setAttribute('transform', `translate(${x * k} ${y - 50 * Math.sin(Math.PI * u)}) rotate(${a * k}) scale(${1.5 * Math.min(1, 3 * u)})`);
          e.setAttribute('opacity', tagen ? 0 : 1); pa[i].setAttribute('opacity', tagen ? 1 : 0); });
        // kritan: in uppifrån till fästet (1 s), drar snöret, går i varv inifrån och ut medan kulan växer, och ut igen (från 3,2 s)
        const UT = [P0[0] - 240, tak - 80], k1 = mjuk(kl(r / 1.0)), a = 6 * Math.PI * k3 - Math.PI / 2, ut = mjuk(kl((r - 3.2) / 1.0));
        let p = !ny ? UT : r < 1 ? [lerp(UT[0], P0[0], k1), lerp(UT[1], P0[1], k1)] : r < 1.4 ? [P0[0], P0[1] + SN * kl((r - 1) / 0.4)]
          : [P0[0] + (R - 6) * k3 * Math.cos(a), P0[1] + SN + R * k3 + (R - 6) * k3 * Math.sin(a)];
        el('krita').setAttribute('transform', `translate(${lerp(p[0], UT[0], ut).toFixed(1)} ${lerp(p[1], UT[1], ut).toFixed(1)}) scale(-1 1)`); } }; })(),
  // snögubben: varje putta-bit ger en snöboll som växer fram vid djuret, puttas iväg vid bitens vid och hoppar på plats (0,7 s).
  // Platsen är där gubben står. I biten "sak" poppar morotsnäsan och kolögonen fram. Ljusblå kant, så att den syns mot snön.
  snogubbe: (() => { const R = [132, 102, 78], Y = [-114, -298, -444], FRAN = -250;
    return { plats: [370, 0], ser: [-60, -330],
      fram: `<ellipse id="sak-skugga" cy="8" rx="170" ry="26" fill="#7FA6C9" opacity="0"/>
        ${R.map((r, i) => `<g id="sak-boll${i}" transform="scale(0)"><circle r="${r}" fill="#fff" stroke="#6FA3CC" stroke-width="12"/>
          <path d="M${-0.25 * r} ${0.66 * r} Q${0.48 * r} ${0.62 * r} ${0.66 * r} ${0.02 * r}" fill="none" stroke="#B5D0E6" stroke-width="16" stroke-linecap="round"/></g>`).join('')}
        <g id="sak-nasa"><circle cx="-27" cy="-20" r="10" fill="${KOL}"/><circle cx="25" cy="-20" r="10" fill="${KOL}"/>
          <path d="M-4 -4 L78 14 L-4 26 Z" fill="#F08A24" stroke="#F08A24" stroke-width="10" stroke-linejoin="round"/></g>`,
      rita(el, { tt, syns, bitar }) {
        bitar.filter(b => b.typ === 'putta').forEach((b, i) => { const u = tt - b.t0, vid = b.vid ?? 0.5, vaxer = mjuk(kl(u / (vid - 0.25))), k = kl((u - vid) / 0.7);
          el('boll' + i).setAttribute('transform', `translate(${lerp(FRAN, 0, mjuk(k)).toFixed(1)} ${(lerp(-R[i] * vaxer + 14, Y[i], mjuk(k)) - (i ? 90 : 40) * Math.sin(Math.PI * k)).toFixed(1)}) scale(${u > 0 ? vaxer : 0})`); });
        const forsta = bitar.find(b => b.typ === 'putta');   // skuggan på snön kommer när första bollen landar
        el('skugga').setAttribute('opacity', forsta ? 0.3 * kl((tt - forsta.t0 - (forsta.vid ?? 0.5) - 0.6) / 0.3) : 0);
        el('nasa').setAttribute('transform', `translate(0 ${Y[2]}) scale(${syns})`); } }; })(),
};

async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const STA = new URLSearchParams(location.search).has('staende'), render = navigator.webdriver, SK = g.skala ?? 0.95;
  // bilden och scenen: E = scenens skala, MARK = marken (stående: ovanför YouTubes knappar), KANT och TAK = bildens kant och överkant i scenens mått
  // Liggande står djuret på Vinterkullens bild (PLAT: dag eller kväll, fötterna på 80 % av höjden); backen (lucka 5) och stående ritas i kod
  const BACKE = g.backe ?? 0, PLAT = !STA && !BACKE && lucka.KULLE(g.kvall);
  const [VW, VH] = STA ? [1080, 1920] : [1920, 1080], E = STA ? 1 : 0.82, MARK = STA ? 1400 : PLAT ? 864 : 925, KANT = VW / 2 / E, TAK = -MARK / E;
  const SCEN = `transform="translate(${VW / 2} ${MARK}) scale(${E})"`, GX = g.x ?? 0, SNO = PLAT ? (g.kvall ? '#D3E0F5' : '#F7F3EA') : g.kvall ? '#E3EAF5' : '#fff';
  const SAK = g.sak && { ...SAKER[g.sak], ...(g.sakPlats && { plats: g.sakPlats }) };
  if (g.sak && !SAKER[g.sak]) throw new Error(`saken "${g.sak}" finns inte i djur.js`);
  const lager = (n, med) => SAK?.[n] && !SAK.med === !med ? `<g ${med ? '' : `transform="translate(${SAK.plats})"`}>${SAK[n]}</g>` : '';
  document.head.insertAdjacentHTML('beforeend', `<style>
    html,body{margin:0;height:100%;background:#2b2724;font:15px/1.4 system-ui,sans-serif;color:#eee}
    body{display:flex;gap:24px;align-items:center;justify-content:center}
    svg{height:${render ? '100vh' : '96vh'};max-width:100vw;aspect-ratio:${VW}/${VH};display:block} button{font:inherit;padding:8px 14px;cursor:pointer}
    .sno{fill:${SNO}}</style>`);
  // snön: bilden av Vinterkullen, eller ritad i kod: ljusblå himmel (nattblå på kvällen, och då täckande färg under kritkornet)
  // och en vit kulle. Ovanpå några stilla flingor (samma platser varje gång)
  const slump = (i, n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453 % 1 + 1) % 1, FX = i => STA ? (i * 397 + 90) % VW : slump(i, 1) * VW;   // liggande: utspridda, inte i rader
  const flingor = Array.from({ length: STA ? 16 : 28 }, (_, i) => `<circle class="flinga" cx="${FX(i)}" cy="${STA ? (i * 263 + 140) % 1150 : slump(i, 2) * 760 + 20}" r="${10 + i % 3 * 4}" fill="#fff"/>`).join('');
  const kulle = farg => `<ellipse fill="${farg}" cy="590" rx="${STA ? 1000 : 2600}" ry="720" transform="rotate(${BACKE} 0 -130)"/>`;
  // den stora flingan som fångas: sex armar med en liten hake, vit krita med ljusblå kant så att den syns mot både himmel och snö
  const arm = [0, 60, 120, 180, 240, 300].map(a => `<path transform="rotate(${a})" d="M0 0 L0 -46 M-13 -36 L0 -25 L13 -36"/>`).join('');
  const storFlinga = `<g id="stor-flinga" opacity="0" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="#8FBBDA" stroke-width="17">${arm}</g><g stroke="#fff" stroke-width="9">${arm}</g></g>`;
  document.body.innerHTML = `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"><defs>
      <filter id="boil" filterUnits="userSpaceOnUse" x="0" y="0" width="${VW}" height="${VH}">
        <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
        <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>
      ${SAK?.ruta ? lucka.vax('sak-vax', ...SAK.ruta) : ''}${SAK?.ruta2 ? lucka.vax('sak-vax2', ...SAK.ruta2) : ''}</defs>
    ${PLAT ? `<image href="${PLAT}" width="${VW}" height="${VH}" preserveAspectRatio="xMidYMid slice"/>`
      : `<rect width="${VW}" height="${VH}" fill="${g.kvall ? '#263A6B' : '#CFE3F0'}"/>${g.kvall ? `<g ${SCEN}>${kulle('#CBD7EA')}</g>` : ''}`}
    <g filter="url(#lucka-vax)">${flingor}${PLAT ? '' : `<g ${SCEN}>${kulle(SNO)}</g>`}</g>
    <g filter="url(#boil)"><g ${SCEN}>${lager('bak')}<g id="akare">${lager('bak', 1)}<g id="djur"></g>${lager('fram', 1)}</g>${lager('fram')}</g></g>
    <g ${SCEN}>${storFlinga}</g></svg>`;
  if (PLAT) await lucka.bild(PLAT);
  const svg = document.querySelector('svg'), F = await v2rigg(g.figur), fig = F.figur(0, 0, SK, svg.querySelector('#djur'));
  const K = await lucka.bygg(svg, g.lucka, { kvall: g.kvall, ...(g.pekare && { pekare: g.pekare }) }), blinka = skapaBlinka(11);

  // rörelserna: (tl = sekunder in i biten, d = bitens längd, b = biten) → [ansikte, pose, [x, y] = hela djuret flyttat]
  const P = o => ({ ...F.POSE0, ...o }), glad = F.blanda('neutral', 'glad', 1), [va, vs] = g.vinkArm ?? [92, 12];
  const ror = (namn, tl) => { const [f, p] = F.ROR[namn](tl); return [{ ...f, armar: F.NEUTRAL.armar }, p]; };   // rörelsen styr armarna själv
  // dit djuret tittar när det ser på saken: blicken mot saken, och riktningsposen åt det hållet om saken står vid sidan
  const blick = ([x, y]) => { const m = [SAK.plats[0] + x - GX, SAK.plats[1] + y + (F.FOTTER - 420) * SK]; return m.map(v => 8 * v / Math.hypot(...m)); };
  const mal = SAK ? SAK.plats[0] + (SAK.ser?.[0] ?? 0) - GX : 0, SIDA = Math.abs(mal) > 150 ? Math.sign(mal) : 0;
  const titt = SAK ? blick(SAK.ser ?? [0, 0]) : [0, -8], ser = [{ ...glad, titt }, P({ rikt: 0.5 * SIDA })];
  const ROR = {
    stilla: () => [glad, P()], borta: () => [glad, P()],
    glant: () => [F.blanda('glad', 'fnissig', 1), P({ x: ((0.78 - 0.5) * VW - 12) / E / SK - GX / SK, luta: 7 })],   // kikar fram vid luckans kant
    vinka: (tl, d) => { const upp = mjuk(kl(Math.min(tl / 0.4, (d - tl) / 0.4))), v = upp * (va + vs * Math.sin(tl * 13));
      return [glad, P({ armar: (g.vinkHand ?? 1) ? [0, v] : [v, 0], luta: Math.sin(tl * 7) * 2 * upp })]; },
    hoppa: tl => ror('hoppa', Math.min(tl, 2.39)),   // ett hopp, sedan står den still
    klappa: tl => ror('klappa', Math.min(tl, 2.99)),   // tre klappar, sedan står den still
    dansa: (tl, d) => { const [f, p] = ror('dansa', tl), s = Math.sin(2 * Math.PI * tl) * mjuk(kl(Math.min(tl, d - tl) / 0.4));   // riggens dans, med större gung och ett litet sidsteg
      return [f, { ...p, luta: 1.6 * p.luta, x: 26 * s / SK }]; },
    nicka: tl => F.nicka(glad, P(), tl),
    snoar: tl => { const k = mjuk(kl(tl / 0.5)); return [{ ...F.blanda('glad', 'forvanad', k), titt: [0, -8 * k] }, P({ strack: 0.02 * k })]; },   // tittar upp
    fanga: tl => ror('hoppa', Math.min(tl, 2.39)),
    tittar: () => ser, oj: () => [F.blanda('neutral', 'forvanad', 1), ser[1]],   // oj: förvånad, rycker till
    nyfiken: () => [{ ...F.blanda('neutral', 'nyfiken', 1), titt, luta: 5 * SIDA }, ser[1]],   // lutar huvudet mot saken
    sak: tl => [{ ...F.blanda('forvanad', 'glad', mjuk(kl((tl - 0.9) / 0.3))), titt }, ser[1]],   // förvånad när saken poppar fram, sedan glad
    putta: (tl, d, b) => { const k = Math.sin(Math.PI * kl((tl - (b.vid ?? 0.5) + 0.4) / 0.8));   // lutar sig fram, nuddar vid "vid", och tillbaka
      const lyft = (b.arm ?? 0) * k;   // arm: armen närmast saken lyfts så många grader och nuddar den; annars båda armarna mot saken (bada)
      return [ser[0], P({ rikt: SIDA, bada: b.arm ? 0 : 1, armar: SIDA > 0 ? [0, lyft] : [lyft, 0], luta: 8 * SIDA * k, x: 45 * SIDA * k / SK, strack: 0.02 * k })]; },
    vagga: (tl, d) => { const s = Math.sin(2 * Math.PI * tl / 1.4) * mjuk(kl(Math.min(tl, d - tl) / 0.5)); return [glad, P({ luta: 7 * s, oron: [5 * s, -5 * s] })]; },
    // ett åk: tar sats (gungar bakåt), åker ut till höger med ökande fart (1,3 s), och kommer genast in från vänster och bromsar in mitt i bild
    glid: (tl, d, b) => { const UT = KANT + 440, s = b.sats ?? 0.3, upp = mjuk(kl(Math.min(tl - s + 0.3, d - tl) / 0.3));
      const x = tl < s + 1.3 ? UT * kl((tl - s) / 1.3) ** 2 - 30 * Math.sin(Math.PI * kl(tl / s)) : -UT * (1 - kl((tl - s - 1.3) / (d - s - 1.5))) ** 2;
      return [F.blanda('glad', 'jatteglad', 1), P({ armar: [30 * upp, 30 * upp] }), [x, x * Math.tan(BACKE * Math.PI / 180)]]; },
  };
  // bitarnas tider: den första börjar när luckan öppnas, så att djuret redan rör sig när det syns
  let t = K.oppnar + 0.1;
  const BITAR = g.scen.map(([d, typ, x = {}]) => { const b = { t0: t, d, typ, fn: ROR[typ], ...x }; t += d; return b; });
  for (const b of BITAR) if (!b.fn) throw new Error(`rörelsen "${b.typ}" finns inte i djur.js`);
  const DURATION = K.slut(t), SNOAR = BITAR.find(b => b.typ === 'snoar')?.t0, FL = [...svg.querySelectorAll('.flinga')], stor = svg.querySelector('#stor-flinga');
  const SAKT = (BITAR.find(b => b.typ === 'sak')?.t0 ?? -9) + 0.15, akare = svg.querySelector('#akare'), el = n => svg.querySelector('#sak-' + n);
  if (SNOAR !== undefined) FL.forEach(c => c.setAttribute('cy', -60));   // ingen snö i luften förrän det börjar snöa
  const lage = tt => {   // [ansikte, pose, luckans stängning, biten, sekunder in i den, flytt] vid tiden tt
    const i = Math.max(0, BITAR.findLastIndex(b => tt >= b.t0)), b = BITAR[i], tl = kl(tt - b.t0, 0, b.d), fore = BITAR[i - 1];
    const gor = (b, tl) => { const [f, p, fl = [0, 0]] = b.fn(tl, b.d, b); const u = b.uttryck ? { ...F.blanda('neutral', b.uttryck, 1), titt: f.titt } : f;   // bitens eget ansikte
      return [b.ser ? { ...u, titt: b.ser === true ? titt : blick(b.ser) } : u, p, fl]; };
    let [f, p, fl] = gor(b, tl);
    if (fore && tl < 0.4) { const [f0, p0, fl0] = gor(fore, fore.d), k = mjuk(tl / 0.4);
      f = F.blanda(f0, f, k); p = F.blandaPose(p0, p, k); fl = fl.map((v, j) => lerp(fl0[j], v, k)); }
    // sitter i saken (pulkan) från strax efter att den har poppat fram: benen ut och kroppen ner, bakom pulkans framsida
    if (SAK?.med) { const S = F.POSER.sitter; p = F.blandaPose(p, { ...p, ben: S.ben, benY: S.benY, sank: S.sank }, mjuk(kl((tt - SAKT - 0.7) / 0.5))); }
    const a = (1 - Math.cos(2 * Math.PI * tt / 3.6)) / 2;   // andas
    return [f, { ...p, strack: p.strack + 0.012 * a }, lerp(STANGD[fore?.typ] ?? 0, STANGD[b.typ] ?? 0, mjuk(kl(tl / 0.5))), b, tl, fl];
  };
  function rita(tt) {
    const [f, p, stangd, b, tl, fl] = lage(tt), syns = SAK ? pop((tt - SAKT) / 0.4) : 0;
    const fb = blinka(f, tt);   // ögonens form byts i en bildruta (som en blinkning), aldrig två former ovanpå varandra
    F.rita(fig, { ...fb, glad: fb.glad.map(v => +(v > 0.5)), ...('kawaii' in fb && { kawaii: +(fb.kawaii > 0.5) }), ...('sov' in fb && { sov: +(fb.sov > 0.5) }) }, p);
    akare.setAttribute('transform', `translate(${(GX + fl[0]).toFixed(1)} ${fl[1].toFixed(1)}) rotate(${SAK?.med ? BACKE * kl(syns) : 0})`);
    SAK?.rita(el, { tt, b, tl, syns, bitar: BITAR, sida: SIDA, tak: TAK, kant: KANT });
    // snön faller lugnt bakom djuret (olika fart och lite sväng), från biten "snoar"
    if (SNOAR !== undefined) FL.forEach((c, i) => { const u = tt - SNOAR - i * 0.37 % 2.5;
      c.setAttribute('cy', u < 0 ? -60 : u * (150 + i % 4 * 30) % (STA ? 1340 : 900) - 40); c.setAttribute('cx', FX(i) + 14 * Math.sin(tt * 0.9 + i)); });
    // den stora flingan: dalar mot nosen, sitter där från hoppets topp och smälter efter landningen
    const fangar = b.typ === 'fanga' && g.nos;
    stor.setAttribute('opacity', fangar ? Math.min(kl(tl / 0.15), 1 - kl((tl - 1.45) / 0.4)) : 0);
    if (fangar) {
      const nx = GX + (g.nos[0] - 512 + p.x) * SK, ny = (g.nos[1] - F.FOTTER + p.lyft) * SK - 26, k = mjuk(kl(tl / 0.85));
      stor.setAttribute('transform', `translate(${nx + (70 + 12 * Math.sin(tl * 5)) * (1 - k)} ${lerp(TAK - 70, ny, k)}) rotate(${20 * (1 - k)}) scale(${1 - 0.5 * kl((tl - 1.45) / 0.4)})`);
    }
    svg.querySelector('#boil-brus').setAttribute('seed', 1 + Math.floor(tt * 8) % 4);
    K.rita(tt, tt < DURATION - 2.4 ? stangd : 0);
  }

  const eff = (n, k = 1) => `assets/ljud/effekter/${n}/${n}-${k}.m4a`;
  const ljud = [{ t: 0, fil: BAD, vol: 0.45, langd: DURATION, fade: 0.8 }, ...K.ljud(),
    ...BITAR.flatMap(b => [...(b.sag ?? []).map(([fil, tal, vid, ss, langd, vol = 2.5]) => ({ t: b.t0 + vid, fil: `assets/ljud/roster/${fil}.m4a`, vol, tal, ss, langd, fade: 0.08 })),
      ...(b.ljud ?? []).map(([n, vid, k, vol = 1.5, langd, ss]) => ({ t: b.t0 + vid, fil: eff(n, k), vol, langd, ss, fade: 0.15, fadeIn: 0.003 })),   // fadeIn kort: klapp, pop och puff har sin smäll allra först
      ...(STANGD[b.typ] === 1 && STANGD[BITAR[BITAR.indexOf(b) - 1]?.typ] !== 0.78 ? [{ t: b.t0, fil: eff('swoosh'), vol: 1.2, fadeIn: 0.003 }] : [])])];
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION;
  window.seek = window.render = rita;
  window.ready = true;   // render.mjs väntar på den
  rita(0);
  if (render) return;

  // förhandsvisningen: ▶ spelar med ljud och går runt; saknade repliker läses av talsyntesen
  document.body.insertAdjacentHTML('beforeend', '<aside><button id="spela">▶ Spela</button><div id="tid"></div></aside>');
  let start = null, senast = 0;
  const spela = c => { if (!c.fil) { if (c.tal) { const u = new SpeechSynthesisUtterance(c.tal); u.lang = 'sv-SE'; u.rate = 0.8; speechSynthesis.speak(u); } return; }
    const a = new Audio('/' + c.fil); a.currentTime = c.ss ?? 0; a.volume = Math.min(1, c.vol * 0.4); a.play(); if (c.langd) setTimeout(() => a.pause(), c.langd * 1000); };
  const ruta = nu => {
    const tt = start === null ? senast : (nu - start) / 1000;
    if (start !== null) for (const c of ljud) if (c.t > senast - 1e-6 && c.t <= tt) spela(c);
    senast = tt; rita(Math.min(tt, DURATION));
    document.getElementById('tid').textContent = `${tt.toFixed(1)} / ${DURATION.toFixed(1)} s`;
    if (start !== null && tt >= DURATION) start = performance.now(), senast = -1e-3;
    requestAnimationFrame(ruta);
  };
  document.getElementById('spela').onclick = () => { start = performance.now(); senast = -1e-3; };
  window.hoppa = t => { senast = t; };   // granska en bildruta: hoppa(12)
  requestAnimationFrame(ruta);
}
return { kor };
})();
