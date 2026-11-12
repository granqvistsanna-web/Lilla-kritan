// Julkalenderns djurluckor: ett djur (v2-rigg) står i snön bakom luckan och gör en liten sak, medan berättaren pratar.
// Liggande 1920×1080 är det vanliga; ?staende (render.mjs --staende) ger 1080×1920 för Shorts ur samma fil. Allt bakom luckan
// ritas i scenens mått: (0, 0) är marken under djuret mitt i bild, uppåt är minus, och liggande är scenen förminskad (E).
// En lucka är en index.html med bara djuret och scenen, bit för bit:
//   <script src="/verktyg/blinka.js"></script><script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
//   <script src="/produktion/youtube/shorts/jul/lucka.js"></script><script src="/produktion/youtube/shorts/jul/djur.js"></script>
//   julDjur.kor({ lucka: 2, figur: 'lammet-ludde', vinkArm: [38, 16], skala: 0.95,
//     scen: [[sekunder, rörelse, { sag: [[fil, text, vid]], ljud: [[namn, vid, variant]] }], ...] })
// Riggens senaste rörelser används: kroppen böjer sig från fötterna (boj) när djuret vinkar, vaggar, puttar, pekar och dansar, så att
// fötterna står kvar, och i stilla bitar ser djuret sig omkring (vila). Saker i handen och sätta sig/lägga sig finns än bara på
// kaninen respektive ugglan och används inte här.
// Rörelser: stilla, vinka, hoppa (ett hopp), klappa, dansa, nicka, och för tittut med luckan: borta (luckan stängd) och
// glant (luckan på glänt, djuret kikar fram vid kanten). Varje bit blandas mjukt från den förra (0,4 s).
// Snön: snoar = det börjar snöa (flingorna faller från den biten och framåt) och djuret tittar upp; fanga = ett hopp där en
// stor snöflinga landar på nosen i hoppets topp (0,85 s in) och smälter efter landningen. nos: [x, y] i riggens 1024-ruta.
// Saken: sak: 'hjarta' | 'pulka' | 'ljus' | 'kula' | 'snogubbe' | 'krona' | 'gran' | 'julafton' (se SAKER), sakPlats: [x, y] flyttar den,
// x: djurets plats i sidled, kvall: true ger kvällen (också i kalendern), backe: grader gör kullen till en backe ner åt höger (ritad i kod).
// Platsen är bilden av Vinterkullen (assets/bakgrunder/vinterkullen, -natt på kvällen); bara backen ritas i kod.
// Saken finns från biten "sak" (den poppar fram och djuret tittar på den), eller från början om ingen sådan bit finns.
// Fler figurer (julafton): gaster: [[figur, x, skala, vinkHand], …]; in: nummer på en bit = den gästen kommer in med ett hopp från sin
// sida när biten börjar, och alla som är inne vinkar i bitar med rörelsen vinka. slut: 'vi-ses-snart' byter ramens slutreplik.
// staScen: scenens skala i stående bild (standard 1), när scenen är bredare än den stående bilden.
// Rörelser med saken: tittar (ser på den), nyfiken, oj (förvånad), peka (arm: grader, pekar på den), tassa (steg: antal lugna
// steg åt sidan, djuret står kvar där det hamnar), putta (lutar sig mot den och nuddar den vid: sekunder in, standard 0,5),
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
// delade former. LJUSET står med foten i (0, 0); LAGAN har vekens topp i (0, 0): ett mjukt varmt sken, gul låga, orange kärna
const LJUSET = 'M-35 14 L-35 -210 Q-35 -236 0 -236 Q35 -236 35 -210 L35 14 Z', VEKE = -262;
const LAGAN = `<circle cy="-36" r="120" fill="url(#sak-sken)"/>
  <path d="M0 -84 C40 -40 34 2 0 2 C-34 2 -40 -40 0 -84 Z" fill="${GUL}" stroke="#fff" stroke-width="9" stroke-linejoin="round" paint-order="stroke"/>
  <path d="M0 -46 C17 -24 14 -4 0 -4 C-14 -4 -17 -24 0 -46 Z" fill="#F08A24"/>`;
// fyra röda ljus i rad (det vänstra i x = 0) med vekar, snö kring foten och lågor (#sak-laga0 … 3, släckta)
const ljusrad = X => { const ljus = [0, 1, 2, 3].map(i => `<path id="sak-kv${i}" transform="translate(${X(i)} 0)" d="${LJUSET}"`), ljus2 = [0, 1, 2, 3].map(i => `<path id="sak-kf${i}" transform="translate(${X(i)} 0)" d="${LJUSET}"`);   // kv/kf: ljusets vita kant och färg (stump och växande ljus)
  return `${ljus.map(l => `${l} fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>`).join('')}
    <g filter="url(#sak-vax)">${ljus2.map(l => `${l} fill="${ROD}"/>`).join('')}</g>
    ${[0, 1, 2, 3].map(i => `<path id="sak-vek${i}" transform="translate(${X(i)} 0)" d="M0 -236 L0 ${VEKE}" stroke="${KOL}" stroke-width="7" stroke-linecap="round"/>
      <ellipse class="sno" cx="${X(i)}" cy="16" rx="66" ry="20"/><g id="sak-laga${i}" transform="scale(0)">${LAGAN}</g>`).join('')}`; };
// en julkula med mitten i (0, 0): vit klisterkant, hatt upptill, färg med kritkorn och en vit glans
const kulan = (farg, r, vax = 'sak-vax') => `<circle r="${r}" fill="#fff" stroke="#fff" stroke-width="12"/>
  <rect x="${-0.26 * r}" y="${-r - 0.2 * r}" width="${0.52 * r}" height="${0.38 * r}" rx="5" fill="${GUL}" stroke="#fff" stroke-width="7" paint-order="stroke"/>
  <g filter="url(#${vax})"><circle r="${r}" fill="${farg}"/><path d="M${-0.6 * r} ${-0.22 * r} Q${-0.5 * r} ${-0.65 * r} ${-0.12 * r} ${-0.76 * r}" fill="none" stroke="#fff" stroke-width="${0.17 * r}" stroke-linecap="round" opacity=".85"/></g>`;
// granen: skogens gran (assets/bakgrunder/skogen-gron-saker/gran.png, 896 × 1200, stammens fot i (448, 1136), toppen i (450, 73)), samma gran
// som i lucka 1 och 22. GS = bildens skala i scenen; granKula ger en kulas plats på granen, GTOPP toppens höjd
const GS = 0.77, GTOPP = (73 - 1136) * GS, granen = `<image href="/assets/bakgrunder/skogen-gron-saker/gran.png" x="${-448 * GS}" y="${-1136 * GS + 8}" width="${896 * GS}" height="${1200 * GS}"/>`;
const GKULOR = [[-128, -300, ROD], [112, -452, GUL], [-52, -610, ROD]];   // kulorna på granen: x, y, färg
const stjarnan = `<image href="/assets/rekvisita/stjarna-gul/cut/stjarna-gul.png" x="-82" y="-82" width="164" height="164"/>`;   // julstjärnan, mitten i (0, 0)
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
  ljus: (() => { const X = i => i * 104;
    return { plats: [-500, 0], ser: [156, -200], ruta: [-130, -400, 640, 460],
      fram: `${ljusrad(X)}<g id="sak-krita">${kritaBild(GUL)}</g>`,
      rita(el, { tt, bitar, tak, sida }) {
        // tand: [sekunder | [sekunder, ljus nr], …] = tänds nästa ljus i ordningen (eller ljus nr: tänds igen), slock: [[sekunder, ljus nr], …] = blåses ut (mjukt, 0,3 s)
        let n = 0; const E = bitar.flatMap(b => (b.tand ?? []).map(v => [].concat(v)).map(([v, i = n++]) => ({ t: b.t0 + v, i }))), O = bitar.flatMap(b => (b.slock ?? []).map(([v, i]) => ({ t: b.t0 + v, i })));
        let m = 0; const B = bitar.flatMap(b => (b.blink ?? []).map(v => [].concat(v)).map(([v, i = m++]) => ({ t: b.t0 + v, i })));   // blink: [sekunder | [sekunder, ljus nr]]
        // stump: 0,3 på en bit = det fjärde ljuset är en kort stump; hojd: [[sekunder, höjd 0,3–1], …] = det växer (ritas) mjukt mellan nycklarna
        const H0 = bitar.find(b => b.stump != null)?.stump ?? 1, HK = bitar.flatMap(b => (b.hojd ?? []).map(([v, h]) => [b.t0 + v, h]));
        const hj = HK.length ? (() => { const a = HK.findLastIndex(k => tt >= k[0]); if (a < 0) return H0; const c = HK[a + 1]; return c ? lerp(HK[a][1], c[1], mjuk(kl((tt - HK[a][0]) / (c[0] - HK[a][0])))) : HK[a][1]; })() : H0;
        for (const id of ['kv', 'kf', 'vek']) el(id + 3).setAttribute('transform', `translate(${X(3)} 0) scale(1 ${hj.toFixed(3)})`);
        const HI = i => i === 3 ? hj : 1;
        // lågan växer fram när den tänds och blinkar till (större en halv sekund) när vi räknar igen
        for (let i = 0; i < 4; i++) { const tand = E.filter(e => e.i === i && e.t <= tt).at(-1)?.t, ut = O.filter(e => e.i === i && e.t <= tt).at(-1)?.t;
          if (tand === undefined) continue; const av = ut !== undefined && ut >= tand ? 1 - mjuk(kl((tt - ut) / 0.3)) : 1;
          el('laga' + i).setAttribute('transform', `translate(${X(i)} ${VEKE * HI(i)}) scale(${pop((tt - tand) / 0.35) * av * (0.35 + 0.65 * HI(i)) * (1 + 0.4 * Math.sin(Math.PI * kl((tt - (B.filter(e => e.i === i && e.t <= tt).at(-1)?.t ?? 1e9)) / 0.5)))})`); }
        // kritan: in uppifrån till första veken (2,6 s, i bild efter 0,3 s), väntar där 0,8 s (nu händer det snart) och tänder; en liten båge
        // till nästa veke (högst 1,6 s före), väntar igen, och ut 0,2 s efter den sista lågan
        const UT = [sida < 0 ? X(0) - 260 : X(3) + 260, tak - 80], vid = i => [X(i), VEKE * HI(i)]; let p = UT;   // in från den sida där djuret inte står
        E.forEach((e, j) => { const t = e.t, fran = j ? vid(E[j - 1].i) : UT, t0 = j ? Math.max(E[j - 1].t + 0.45, t - 2.4) : t - 3.4, u = kl((tt - t0) / Math.max(0.2, t - 0.8 - t0)), k = j ? mjuk(u) : 1 - (1 - u) ** 2;   // in: fort först, så att den syns direkt
          if (tt > t0) p = [lerp(fran[0], X(e.i), k), lerp(fran[1], VEKE * HI(e.i), k) - (j && E[j - 1].i !== e.i ? 60 * Math.sin(Math.PI * k) : 0) - 7 * Math.sin(Math.PI * kl((tt - t + 0.8) / 0.8)) ** 2]; });
        const k = mjuk(kl((tt - E.at(-1).t - 0.2) / 1.0)); if (k > 0) p = [lerp(p[0], UT[0], k), lerp(p[1], UT[1], k)];
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
        const XR = kant - this.plats[0] + 80, in_ = mjuk(kl(sp / 1.0)), blad = lerp(XR, bitar.find(q => q.spade != null)?.till ?? P0[0] - 190, in_), lyft = mjuk(kl((sp - 1.0) / 0.4));
        el('spade').setAttribute('transform', `translate(${lerp(blad, XR, mjuk(kl((sp - 1.4) / 1.2))).toFixed(1)} ${-36 * lyft}) rotate(${10 * lyft}) scale(1.5)`);
        const pa = el('spade').querySelectorAll('.last');
        el('skarvor').querySelectorAll(':scope > g').forEach((e, i) => { const [x, y, a] = SKARVOR[i], u = kl((tt - TF - 0.57) / 0.4), k = 1 - (1 - u) ** 2;
          const tagen = sp > 0 && blad <= P0[0] + x - 1.5 * PLATS(i), bort = bitar.some(q => q.tagna?.some(([v, j]) => j === i && tt >= q.t0 + v));   // tagna: [[sekunder, skärva nr]] = bärs bort (ting visar den)
          e.setAttribute('transform', `translate(${x * k} ${y - 50 * Math.sin(Math.PI * u)}) rotate(${a * k}) scale(${1.5 * Math.min(1, 3 * u)})`);
          e.setAttribute('opacity', tagen || bort ? 0 : 1); pa[i].setAttribute('opacity', tagen ? 1 : 0); });
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
          <circle id="sak-hal" cx="0" cy="8" r="9" fill="#6FA3CC" opacity="0"/>
          <path id="sak-nas" d="M-4 -4 L78 14 L-4 26 Z" fill="#F08A24" stroke="#F08A24" stroke-width="10" stroke-linejoin="round"/></g>`,
      rita(el, { tt, syns, bitar }) {
        bitar.filter(b => b.typ === 'putta').slice(0, 3).forEach((b, i) => { const u = tt - b.t0, vid = b.vid ?? 0.5, vaxer = mjuk(kl(u / (vid - 0.25))), k = kl((u - vid) / 0.7);
          el('boll' + i).setAttribute('transform', `translate(${lerp(FRAN, 0, mjuk(k)).toFixed(1)} ${(lerp(-R[i] * vaxer + 14, Y[i], mjuk(k)) - (i ? 90 : 40) * Math.sin(Math.PI * k)).toFixed(1)}) scale(${u > 0 ? vaxer : 0})`); });
        const forsta = bitar.find(b => b.typ === 'putta');   // skuggan på snön kommer när första bollen landar
        el('skugga').setAttribute('opacity', forsta ? 0.3 * kl((tt - forsta.t0 - (forsta.vid ?? 0.5) - 0.6) / 0.3) : 0);
        el('nasa').setAttribute('transform', `translate(0 ${Y[2]}) scale(${syns})`);
        // nasa: sekunder på en bit = morotsnäsan försvinner (bara ett litet hål), nasaback: sekunder på en bit = den sitter där igen
        const nb = bitar.find(b => b.nasa != null), nt = bitar.find(b => b.nasaback != null), borta = nb && tt >= nb.t0 + nb.nasa && !(nt && tt >= nt.t0 + nt.nasaback);
        el('nas').setAttribute('opacity', borta ? 0 : 1); el('hal').setAttribute('opacity', borta ? 1 : 0); } }; })(),
  // Lucias ljuskrona: sitter på djurets huvud (iFigur: ritas i figurens egen 1024-ruta och följer kroppen). En grön krans och
  // fyra vita ljus. tand: [sekunder, …] på en bit tänder ljusen ett i taget, av sig själva. plats = kransens mitt på huvudet
  krona: (() => { const LX = [-171, -57, 57, 171];
    return { iFigur: true, plats: [512, 214], ser: [0, -300], ruta: [-260, -330, 520, 420],
      fram: `<path d="M-232 6 Q0 -78 232 6" fill="none" stroke="#fff" stroke-width="74" stroke-linecap="round"/>
        ${LX.map(x => `<rect x="${x - 19}" y="${-150 - 0.1 * Math.abs(x)}" width="38" height="118" rx="14" fill="#F8F2E4" stroke="#fff" stroke-width="10" paint-order="stroke" transform="translate(0 ${0.22 * Math.abs(x)})"/>
          <path d="M${x} ${-150 + 0.12 * Math.abs(x)} l0 -16" stroke="${KOL}" stroke-width="6" stroke-linecap="round"/>`).join('')}
        <g filter="url(#sak-vax)" fill="none" stroke-linecap="round"><path d="M-232 6 Q0 -78 232 6" stroke="${GRON}" stroke-width="58"/>
          <path d="M-232 6 Q0 -78 232 6" stroke="#4FA466" stroke-width="16" stroke-dasharray="26 34" transform="translate(0 -10)"/>
          ${[-200, -114, 0, 114, 200].map(x => `<circle cx="${x}" cy="${-34 + 0.0009 * x * x + 6}" r="11" fill="${ROD}" stroke="none"/>`).join('')}</g>
        ${LX.map((x, i) => `<g id="sak-laga${i}" transform="scale(0)">${LAGAN}</g>`).join('')}`,
      rita(el, { tt, bitar }) { const T = bitar.flatMap(b => (b.tand ?? []).map(v => b.t0 + v)), B = bitar.flatMap(b => (b.blink ?? []).map(v => b.t0 + v));   // blink: lågorna blinkar till en i taget
        LX.forEach((x, i) => { const bl = B.filter(v => v <= tt).slice(-1)[0] ?? 1e9, mine = B.indexOf(bl) % 4 === i ? bl : 1e9;
          el('laga' + i).setAttribute('transform', `translate(${x} ${-166 + 0.12 * Math.abs(x)}) scale(${0.62 * pop((tt - (T[i] ?? 1e9)) / 0.35) * (1 + 0.4 * Math.sin(Math.PI * kl((tt - mine) / 0.5)))})`); }); } }; })(),
  // granen som kläs (lucka 23): granen står där från början. På bitarna: kulor: [sekunder, …] = en kula hoppar upp ur snön och
  // landar på sin plats i granen vid varje tid (0,8 s i luften) · stjarna: sekunder = julstjärnan dalar ner och landar i toppen
  // (1 s) · skimrar: sekunder = stjärnan börjar skimra (strålar som pulserar, stjärnan växer lite i takt)
  gran: { plats: [300, 0], ser: [0, -520], ruta: [-60, -60, 120, 120],
    bak: `${granen}<ellipse class="sno" cy="20" rx="130" ry="22"/>`,
    fram: `${GKULOR.map(([, , farg], i) => `<g id="sak-kula${i}" transform="scale(0)">${kulan(farg, 40)}</g>`).join('')}
      <g id="sak-stralar" opacity="0" stroke="${GUL}" stroke-width="13" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path transform="rotate(${a})" d="M0 -112 L0 -150"/>`).join('')}</g>
      <g id="sak-stjarna" transform="scale(0)">${stjarnan}</g>`,
    rita(el, { tt, bitar, tak }) { const tid = n => { const p = bitar.find(p => p[n] != null); return p ? p.t0 + p[n] : 1e9; };
      bitar.flatMap(b => (b.kulor ?? []).map(v => b.t0 + v)).forEach((t, i) => { const [x, y] = GKULOR[i], u = kl((tt - t + 0.8) / 0.8), k = 1 - (1 - u) ** 2;
        el('kula' + i).setAttribute('transform', `translate(${lerp(-330, x, k).toFixed(1)} ${(lerp(-40, y, k) - 240 * Math.sin(Math.PI * u)).toFixed(1)}) scale(${tt > t - 0.8 ? 0.4 + 0.6 * Math.min(1, 3 * u) : 0})`); });
      for (let i = 0; i < 3; i++) if (tt >= tid('kulaborta')) el('kula' + i).setAttribute('opacity', 0);   // kulaborta: sekunder på en bit = kulorna i granen ersätts av ting (kula1…)
      const ts = tid('stjarna'), u = kl((tt - ts + 1) / 1), sk = tt - tid('skimrar'), puls = sk > 0 ? mjuk(kl(sk / 0.5)) * (0.5 + 0.5 * Math.sin(2 * Math.PI * sk / 1.3)) : 0;
      el('stjarna').setAttribute('transform', `translate(2 ${lerp(tak - 120, GTOPP - 52, 1 - (1 - u) ** 2).toFixed(1)}) scale(${(tt > ts - 1 ? 1 : 0) * (1 + 0.1 * Math.sin(Math.PI * kl((tt - ts) / 0.3)) + 0.07 * puls)})`);
      el('stralar').setAttribute('transform', `translate(2 ${GTOPP - 52}) scale(${1 + 0.12 * puls})`); el('stralar').setAttribute('opacity', (0.25 + 0.75 * puls) * mjuk(kl(sk / 0.5))); } },
  // julafton (lucka 24): den klädda granen lyser (kulor, stjärna och små varma ljus), de fyra ljusen brinner till vänster och
  // paketet från lucka 9 (röd låda med mörk kritkontur, gult band i kors och rosett) ligger framför granen. Platsen är paketets fot.
  // På bitarna: skramlar: [sekunder, …] = paketet skakar till (0,9 s) · oppnas: sekunder = locket med rosetten poppar av och landar
  // bredvid, och nallen (rekvisita/nalle) tittar upp ur lådan · glans: sekunder = stjärnan i toppen skimrar
  julafton: (() => { const LX = -1390, GX0 = 300, B = 150, H = 230, LOCK = 62;   // ljusraden, granen (räknat från paketet), lådans halva bredd, höjd, lockets höjd
    const lada = (y0, y1) => `M${-B} ${y0} L${B} ${y0} L${B} ${y1} L${-B} ${y1} Z`, kontur = d => `<path d="${d}" fill="none" stroke="#2A2421" stroke-width="9" stroke-linejoin="round"/>`;
    return { plats: [290, 0], ser: [0, -120], ruta: [-420, -420, 840, 560],
      bak: `<g transform="translate(${GX0} 0)">${granen}<ellipse class="sno" cy="20" rx="130" ry="22"/>
          ${[[-150, -190], [60, -250], [-30, -380], [130, -360], [-90, -520], [40, -560], [10, -700]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="46" fill="url(#sak-sken)"/><circle cx="${x}" cy="${y}" r="9" fill="#FFE9A8"/>`).join('')}
          ${GKULOR.map(([x, y, farg]) => `<g transform="translate(${x} ${y})">${kulan(farg, 40)}</g>`).join('')}
          <g id="sak-stralar" opacity="0" stroke="${GUL}" stroke-width="13" stroke-linecap="round" transform="translate(2 ${GTOPP - 52})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path transform="rotate(${a})" d="M0 -112 L0 -150"/>`).join('')}</g>
          <g id="sak-stjarna" transform="translate(2 ${GTOPP - 52})">${stjarnan}</g></g>
        <g transform="translate(${LX} 0)">${ljusrad(i => i * 104)}</g>`,
      fram: `<g id="sak-paket"><clipPath id="sak-nalleklipp"><rect x="-400" y="-900" width="800" height="${900 - H + LOCK + 6}"/></clipPath>
          <g clip-path="url(#sak-nalleklipp)"><image id="sak-nalle" href="/assets/rekvisita/nalle/cut/nalle-framifran-v1-kanel.png" x="-175" y="0" width="350" height="350"/></g>
          <path d="${lada(-H + LOCK, 8)}" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round"/>
          <g filter="url(#sak-vax)"><path d="${lada(-H + LOCK, 8)}" fill="${ROD}"/><path d="M0 ${-H + LOCK} L0 8" stroke="${GUL}" stroke-width="40"/></g>${kontur(lada(-H + LOCK, 8))}
          <g id="sak-lock"><path d="${lada(-H, -H + LOCK)}" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round" transform="scale(1.06 1)"/>
            <g filter="url(#sak-vax)"><path d="${lada(-H, -H + LOCK)}" fill="${ROD}" transform="scale(1.06 1)"/><path d="M0 ${-H} L0 ${-H + LOCK}" stroke="${GUL}" stroke-width="40"/>
              <path d="M0 ${-H} C-42 ${-H - 70} -118 ${-H - 56} -103 ${-H} C-93 ${-H + 38} -29 ${-H + 22} 0 ${-H} C42 ${-H - 70} 118 ${-H - 56} 103 ${-H} C93 ${-H + 38} 29 ${-H + 22} 0 ${-H}" fill="none" stroke="${GUL}" stroke-width="22" stroke-linejoin="round"/></g>
            <g transform="scale(1.06 1)">${kontur(lada(-H, -H + LOCK))}</g></g></g>`,
      rita(el, { tt, bitar }) { const tid = n => { const p = bitar.find(p => p[n] != null); return p ? p.t0 + p[n] : 1e9; };
        [0, 1, 2, 3].forEach(i => el('laga' + i).setAttribute('transform', `translate(${i * 104} ${VEKE})`));   // alla fyra brinner
        const sk = bitar.flatMap(b => (b.skramlar ?? []).map(v => tt - b.t0 - v)).find(u => u > 0 && u < 0.9), o = tt - tid('oppnas'), ok = kl(o / 0.6), flyg = 1 - (1 - ok) ** 2;
        el('paket').setAttribute('transform', `rotate(${sk ? 5 * Math.sin(2 * Math.PI * sk / 0.3) * Math.sin(Math.PI * sk / 0.9) : 0} 0 0)`);
        // locket poppar upp i en båge och lägger sig på snön framför lådan, lite till vänster; nallen kommer upp ur lådan (0,4–1,2 s)
        // lock: [[sekunder, höjd px], …] på bitar = locket lyfts en bit i taget och blir sittande där (en liten skakning när det rycker), tills det poppar av (oppnas)
        const LK = bitar.flatMap(b => (b.lock ?? []).map(([v, h]) => [b.t0 + v, h])), la = LK.findLastIndex(k => tt >= k[0]), lh = la < 0 ? 0 : LK[la + 1] ? lerp(LK[la][1], LK[la + 1][1], mjuk(kl((tt - LK[la][0]) / (LK[la + 1][0] - LK[la][0])))) : LK[la][1];
        el('lock').setAttribute('transform', o > 0 ? `translate(${-235 * flyg} ${(H + 40) * flyg - 300 * Math.sin(Math.PI * ok)}) rotate(${-12 * flyg} 0 ${-H})` : lh ? `translate(0 ${-lh}) rotate(${2 * Math.sin(tt * 40) * (la >= 0 && LK[la + 1] && tt - LK[la][0] < 0.8 ? 1 : 0)} 0 ${-H})` : '');
        el('nalle').setAttribute('y', lerp(-H + LOCK + 20, -H - 185, mjuk(kl((o - 0.4) / 0.8))));
        const gl = tt - tid('glans'), puls = gl > 0 ? mjuk(kl(gl / 0.5)) * (0.5 + 0.5 * Math.sin(2 * Math.PI * gl / 1.3)) : 0;
        el('stralar').setAttribute('opacity', (0.25 + 0.75 * puls) * mjuk(kl(gl / 0.5))); } }; })(),
};

async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const STA = new URLSearchParams(location.search).has('staende'), render = navigator.webdriver, SK = g.skala ?? 0.95;
  // bilden och scenen: E = scenens skala, MARK = marken (stående: ovanför YouTubes knappar), KANT och TAK = bildens kant och överkant i scenens mått
  // Djuret står på Vinterkullens bild (PLAT: dag eller kväll; liggande med fötterna på 80 % av höjden, stående på y 1400, ovanför
  // YouTubes knappar); bara backen (lucka 5) ritas i kod
  const BACKE = g.backe ?? 0, PLAT = !BACKE && lucka.KULLE(g.kvall);
  const [VW, VH] = STA ? [1080, 1920] : [1920, 1080], E = STA ? g.staScen ?? 1 : 0.82, MARK = STA ? 1400 : PLAT ? 864 : 925, KANT = VW / 2 / E, TAK = -MARK / E;
  const SCEN = `transform="translate(${VW / 2} ${MARK}) scale(${E})"`, GX = g.x ?? 0, SNO = PLAT ? (g.kvall ? '#D3E0F5' : '#F7F3EA') : g.kvall ? '#E3EAF5' : '#fff';
  const SAK = g.sak && { ...SAKER[g.sak], ...(g.sakPlats && { plats: g.sakPlats }) };
  if (g.sak && !SAKER[g.sak]) throw new Error(`saken "${g.sak}" finns inte i djur.js`);
  const lager = (n, med) => SAK?.[n] && !SAK.iFigur && !SAK.med === !med ? `<g ${med ? '' : `transform="translate(${SAK.plats})"`}>${SAK[n]}</g>` : '';
  document.head.insertAdjacentHTML('beforeend', `<style>
    html,body{margin:0;height:100%;background:#2b2724;font:15px/1.4 system-ui,sans-serif;color:#eee}
    body{display:flex;gap:24px;align-items:center;justify-content:center}
    svg{height:${render ? '100vh' : '96vh'};max-width:100vw;aspect-ratio:${VW}/${VH};display:block} button{font:inherit;padding:8px 14px;cursor:pointer}
    .sno{fill:${SNO}}</style>`);
  // snön: bilden av Vinterkullen, eller ritad i kod: ljusblå himmel (nattblå på kvällen, och då täckande färg under kritkornet)
  // och en vit kulle. Ovanpå några stilla flingor (samma platser varje gång)
  const slump = (i, n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453 % 1 + 1) % 1, FX = i => STA ? (i * 397 + 90) % VW : slump(i, 1) * VW;   // liggande: utspridda, inte i rader
  const flingor = Array.from({ length: STA ? 16 : 28 }, (_, i) => `<circle class="flinga" cx="${FX(i)}" cy="${STA ? (i * 263 + 140) % 1150 : slump(i, 2) * 760 + 20}" r="${10 + i % 3 * 4}" fill="#fff"/>`).join('')
    + Array.from({ length: STA ? 22 : 40 }, (_, i) => `<circle class="flinga2" cx="${FX(i + 40)}" cy="-60" r="${8 + i % 4 * 3}" fill="#fff"/>`).join('');   // flinga2: det snöar mycket (snomycket)
  const kulle = farg => `<ellipse fill="${farg}" cy="590" rx="${STA ? 1000 : 2600}" ry="720" transform="rotate(${BACKE} 0 -130)"/>`;
  // den stora flingan som fångas: sex armar med en liten hake, vit krita med ljusblå kant så att den syns mot både himmel och snö
  const arm = [0, 60, 120, 180, 240, 300].map(a => `<path transform="rotate(${a})" d="M0 0 L0 -46 M-13 -36 L0 -25 L13 -36"/>`).join('');
  const storFlinga = `<g id="stor-flinga" opacity="0" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g stroke="#8FBBDA" stroke-width="17">${arm}</g><g stroke="#fff" stroke-width="9">${arm}</g></g>`;
  document.body.innerHTML = `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"><defs>
      <filter id="boil" filterUnits="userSpaceOnUse" x="0" y="0" width="${VW}" height="${VH}">
        <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
        <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>
      <radialGradient id="sak-sken"><stop offset="0" stop-color="#FFD76A" stop-opacity=".7"/><stop offset=".45" stop-color="#FFB84A" stop-opacity=".32"/><stop offset="1" stop-color="#FFA63C" stop-opacity="0"/></radialGradient>
      ${SAK?.ruta ? lucka.vax('sak-vax', ...SAK.ruta) : ''}${SAK?.ruta2 ? lucka.vax('sak-vax2', ...SAK.ruta2) : ''}</defs>
    ${PLAT ? `<image href="${PLAT}" width="${VW}" height="${VH}" preserveAspectRatio="xMidYMid slice"/>`
      : `<rect width="${VW}" height="${VH}" fill="${g.kvall ? '#263A6B' : '#CFE3F0'}"/>${g.kvall ? `<g ${SCEN}>${kulle('#CBD7EA')}</g>` : ''}`}
    <g filter="url(#lucka-vax)">${flingor}${PLAT ? '' : `<g ${SCEN}>${kulle(SNO)}</g>`}</g>
    <g filter="url(#boil)"><g ${SCEN}>${lager('bak')}<g id="akare">${lager('bak', 1)}<g id="djur"></g>${lager('fram', 1)}</g>${lager('fram')}<g id="tingbak"></g><g id="gaster"></g><g id="ting"></g><g id="puff"></g></g></g>
    <g ${SCEN}>${storFlinga}</g></svg>`;
  if (PLAT) await lucka.bild(PLAT);
  const svg = document.querySelector('svg'), F = await v2rigg(g.figur), fig = F.figur(0, 0, SK, svg.querySelector('#djur'));
  if (SAK?.iFigur) fig.querySelector('.figuren').insertAdjacentHTML('beforeend', `<g transform="translate(${SAK.plats})">${SAK.fram}</g>`);   // saken sitter på figuren
  // gästerna: egna riggar i scenen, utanför bild tills de kommer in
  const GASTER = await Promise.all((g.gaster ?? []).map(async ([figur, x, sk = SK, hand = 1], i) => { const R = await v2rigg(figur);
    svg.querySelector('#gaster').insertAdjacentHTML('beforeend', '<g></g>'); const hall = svg.querySelector('#gaster').lastChild;
    return { R, x, sk, hand, mot: -Math.sign(x) || 1, hall, fig: R.figur(0, 0, sk, hall), blinka: skapaBlinka(7 + 3 * i), glad: R.blanda('neutral', 'glad', 1) }; }));
  const K = await lucka.bygg(svg, g.lucka, { kvall: g.kvall, ...(g.pekare && { pekare: g.pekare }), ...(g.slut && { slut: g.slut }) }), blinka = skapaBlinka(11);

  // rörelserna: (tl = sekunder in i biten, d = bitens längd, b = biten) → [ansikte, pose, [x, y] = hela djuret flyttat]
  const P = o => ({ ...F.POSE0, ...o }), glad = F.blanda('neutral', 'glad', 1), [va, vs] = g.vinkArm ?? [92, 12], STEG = 55;
  const ror = (namn, tl) => { const [f, p] = F.ROR[namn](tl); return [{ ...f, armar: F.NEUTRAL.armar }, p]; };   // rörelsen styr armarna själv
  // dit djuret tittar när det ser på saken: blicken mot saken, och riktningsposen åt det hållet om saken står vid sidan
  const blick = ([x, y]) => { const m = [SAK.plats[0] + x - GX, SAK.plats[1] + y + (F.FOTTER - 420) * SK]; return m.map(v => 8 * v / Math.hypot(...m)); };
  const mal = SAK && !SAK.iFigur ? SAK.plats[0] + (SAK.ser?.[0] ?? 0) - GX : 0, SIDA = Math.abs(mal) > 150 ? Math.sign(mal) : 0;
  const titt = SAK && !SAK.iFigur ? blick(SAK.ser ?? [0, 0]) : [0, -8], ser = [{ ...glad, titt }, P({ rikt: 0.5 * SIDA })];   // saken på huvudet: blicken uppåt
  // Gästens rörelser (M1): med: { gästnummer: 'namn' | ['namn', val] } på en bit. tl = sekunder in i biten, d = dess längd, G = gästen, o = val.
  // En gäst som inte har någon rörelse på biten står still och ser sig omkring (vila), och vinkar när huvudfiguren vinkar. Mot = åt vilket håll huvudfiguren står.
  const gangX = (K, t) => { const a = K.findLastIndex(k => t >= k[0]); if (a < 0) return K[0][1]; const c = K[a + 1]; return c ? lerp(K[a][1], c[1], mjuk(kl((t - K[a][0]) / (c[0] - K[a][0])))) : K[a][1]; };   // förflyttning ur nycklar [[sekunder, px], …]
  const GP = (G, o) => ({ ...G.R.POSE0, ...o }), upp = (tl, d, t = 0.5) => mjuk(kl(Math.min(tl / t, (d - tl) / t))), bump = (tl, v, br = 1) => Math.sin(Math.PI * kl((tl - v + br / 2) / br));
  const GROR = {
    vinka: (tl, d, G, i) => { const u = upp(tl, d, 0.4), v = u * (38 + 16 * Math.sin(tl * 13 + i)); return [G.glad, GP(G, { armar: G.hand ? [0, v] : [v, 0], boj: Math.sin(tl * 7 + i) * 3 * u })]; },
    // nosar på saken: böjer sig mot den med ett nyfiket ansikte, och nosen går lite fram och tillbaka
    nosa: (tl, d, G) => { const u = upp(tl, d), s = G.mot; return [{ ...G.R.blanda('neutral', 'nyfiken', 1), titt: [8 * s * u, 2 * u] },
      GP(G, { rikt: 0.5 * s * u, luta: 2 * s * u, boj: s * u * (5 + 1.5 * Math.sin(tl * 4)), strack: 0.02 * u })]; },
    // blåser: o.vid = sekunder in i biten där det blåses (en puff, mjukt); kroppen lutar sig mot saken och ansiktet är öppet medan det blåses
    blasa: (tl, d, G, i, o = {}) => { const u = upp(tl, d), s = G.mot, p = Math.max(0, ...(o.vid ?? []).map(v => bump(tl, v, 1.1)));
      return [{ ...G.R.blanda('neutral', p > 0.3 ? 'gaspar' : 'nyfiken', 1), titt: [6 * s * u, 0] }, GP(G, { rikt: 0.5 * s * u, luta: 2 * s * u, boj: s * u * (4 + 8 * p), strack: 0.02 * u + 0.03 * p })]; },
    // väntar på tittaren: ser mot bilden, lutar sig lite framåt och uppmuntrande
    vanta: (tl, d, G) => { const u = upp(tl, d); return [G.R.blanda('neutral', 'glad', u), GP(G, { boj: 2 * G.mot * u, strack: 0.01 * u })]; },
    hoppa: (tl, d, G) => G.R.ROR.hoppa(Math.min(tl, 2.39)),
    stilla: (tl, d, G, i) => G.R.vila(G.glad, GP(G, {}), tl + i),   // står still utan att vinka
    // går och hämtar: o.gang = [[sekunder, förflyttning i px från sin plats], …] (mjukt mellan), o.ner = [[från, till], …] sekunder då den nosar/tar något (böjer sig mot det).
    // Fötterna går lugnt medan den rör sig. Förflyttningen lämnas kvar efter biten bara om nästa bit har samma gang (annars: börja från 0).
    hamta: (tl, d, G, i, o = {}) => { const K = o.gang ?? [[0, 0]], dx = t => gangX(K, t), hopp = Math.max(0, ...(o.luft ?? []).map(([a, c, h]) => h * Math.sin(Math.PI * kl((tl - a) / (c - a)))));   // luft: [[från, till, höjd px]] hopp
      const x = dx(tl), v = Math.abs(dx(tl + 0.05) - dx(tl - 0.05)) / 0.1, gaar = mjuk(kl(v / 40)), ner = Math.max(0, ...(o.ner ?? []).map(([a, c]) => mjuk(kl(Math.min((tl - a) / 0.4, (c - tl) / 0.4))))), ph = Math.sin(tl * 7), s = Math.sign(dx(tl + 0.1) - dx(tl - 0.1)) || G.mot;
      return [{ ...G.R.blanda('neutral', ner > 0.5 ? 'nyfiken' : 'glad', 1), titt: [6 * s, 0] }, GP(G, { rikt: 0.5 * s * gaar, boj: 2 * ph * gaar + 6 * G.mot * ner, lyft: -5 * Math.abs(ph) * gaar - hopp / G.sk, strack: 0.02 * ner + 0.03 * (hopp > 0), benY: [-24 * Math.max(0, ph) * gaar, -24 * Math.max(0, -ph) * gaar] }), x]; },
    // tittar sig omkring: åt ena hållet, sedan det andra (långsamt)
    titta: (tl, d, G) => { const u = upp(tl, d), w = Math.sin(2 * Math.PI * tl / 3.2) * u; return [{ ...G.R.blanda('neutral', 'nyfiken', 1), titt: [8 * w, 0] }, GP(G, { rikt: 0.45 * w, luta: w })]; },
    dansa: (tl, d, G) => { const [f, p] = G.R.ROR.dansa(tl); return [f, { ...p, luta: 1.6 * p.luta, boj: 1.5 * (p.boj || 0) }]; },
    // drar i något (luckans kant): o.vid = sekunder in i biten då det dras; lutar sig bakåt, bort från saken, armen mot den, och släpper efter 0,9 s
    dra: (tl, d, G, i, o = {}) => { const u = upp(tl, d), k = Math.max(0, ...(o.vid ?? []).map(v => bump(tl, v + 0.3, 1.2))), s = G.mot;
      return [{ ...G.R.blanda('neutral', k > 0.3 ? 'gaspar' : 'glad', 1), titt: [8 * s * u, 0] }, GP(G, { rikt: 0.35 * s * u, armar: s > 0 ? [0, 55 * u] : [55 * u, 0], boj: -s * (8 * k) + s * 2 * u, luta: -s * 3 * k, x: -s * 40 * k / G.sk, strack: 0.03 * k })]; },
    lyfta: (tl, d, G, i, o = {}) => { const k = Math.max(0, ...(o.vid ?? []).map(v => bump(tl, v + 0.4, 1.6))), u = upp(tl, d), s = G.mot;
      return [{ ...G.R.blanda('glad', k > 0.3 ? 'nyfiken' : 'glad', 1), titt: [6 * s * u, 0] }, GP(G, { rikt: 0.4 * s * u, armar: [75 * k, 75 * k], boj: 5 * s * k, luta: 2 * s * k, strack: 0.04 * k, lyft: -3 * k })]; },
    klappa: (tl, d, G) => { const [f, p] = G.R.ROR.klappa(tl); return [f, p]; },   // riggens klapp, om och om igen
    // stampar lugnt takten: en fot i taget lyfts och sätts ner, kroppen gungar lite (en gång per sekund, mjukt in och ut)
    stampa: (tl, d, G) => { const u = upp(tl, d), ph = Math.sin(Math.PI * tl), a = Math.max(0, ph), c = Math.max(0, -ph); return [G.glad, GP(G, { lyft: -3 * Math.abs(ph) * u, boj: 2 * Math.sin(Math.PI * tl) * u, benY: [-22 * a * u, -22 * c * u], ben: [6 * a * u, 6 * c * u] })]; },
    vagga: (tl, d, G) => { const sv = Math.sin(2 * Math.PI * tl / 1.4) * upp(tl, d); return [G.glad, GP(G, { luta: 2 * sv, boj: 6 * sv, oron: [5 * sv, -5 * sv] })]; },   // gungar från fötterna, som huvudfiguren
  };
  const ROR = {
    stilla: () => [glad, P()], borta: () => [glad, P()],
    glant: () => [F.blanda('glad', 'fnissig', 1), P({ x: ((0.78 - 0.5) * VW - 12) / E / SK - GX / SK, luta: 7 })],   // kikar fram vid luckans kant
    vinka: (tl, d) => { const upp = mjuk(kl(Math.min(tl / 0.4, (d - tl) / 0.4))), v = upp * (va + vs * Math.sin(tl * 13));
      return [glad, P({ armar: (g.vinkHand ?? 1) ? [0, v] : [v, 0], luta: Math.sin(tl * 7) * 0.8 * upp, boj: Math.sin(tl * 7) * 3 * upp })]; },   // kroppen gungar från fötterna (boj), fötterna står kvar
    hoppa: tl => ror('hoppa', Math.min(tl, 2.39)),   // ett hopp, sedan står den still
    klappa: tl => ror('klappa', Math.min(tl, 2.99)),   // tre klappar, sedan står den still
    dansa: (tl, d, b) => { const tk = b.otakt ? tl * 0.73 : tl, [f, p] = ror('dansa', tk), s = Math.sin(2 * Math.PI * tk) * mjuk(kl(Math.min(tl, d - tl) / 0.4));   // riggens dans, med större gung och ett litet sidsteg. otakt: true = lite långsammare än takten (pepparkakan gungar i den vanliga)
      return [f, { ...p, luta: 1.6 * p.luta, boj: 1.5 * (p.boj || 0), x: 26 * s / SK }]; },
    nicka: tl => F.nicka(glad, P(), tl),
    snoar: tl => { const k = mjuk(kl(tl / 0.5)); return [{ ...F.blanda('glad', 'forvanad', k), titt: [0, -8 * k] }, P({ strack: 0.02 * k })]; },   // tittar upp
    fanga: (tl, d, b) => { const [f, p] = ror('hoppa', Math.min(tl, 2.39)); return [f, { ...p, lyft: p.lyft * (b.hojd ?? 1) }]; },   // hojd: högre hopp för en större flinga
    // skakar på huvudet (varv gånger, riggens skakaHuvud) med kroppen lugn
    skaka: (tl, d, b) => F.skakaHuvud(glad, P(), tl, Math.max(1, d - 0.3), b.varv ?? 3),
    // stapplar lugnt åt sidan (flytt: px, minus = åt vänster) med en liten gung i kroppen och ett fnissande ansikte; djuret står kvar där det hamnar
    stappla: (tl, d, b) => { const u = mjuk(kl(tl / (d - 0.4))), s = Math.sin(tl * 3.5) * mjuk(kl(Math.min(tl, d - tl) / 0.4));
      return [F.blanda('glad', 'fnissig', 1), P({ luta: 4 * s, boj: 4 * s, lyft: -5 * Math.abs(s) }), [(b.flytt ?? -90) * u, 0]]; },
    peka: (tl, d, b) => { const upp = mjuk(kl(Math.min(tl / 0.4, (d - tl) / 0.4))) * (b.arm ?? 70);   // armen närmast saken pekar på den
      return [ser[0], P({ rikt: 0.5 * SIDA, armar: SIDA > 0 ? [0, upp] : [upp, 0], luta: SIDA, boj: 2.5 * SIDA })]; },
    // lyfter något (paketets lock): vid = [sekunder, …] då det lyfts; armarna uppåt och kroppen lutar sig mot saken, ansiktet ansträngt, och släpper efter ca 1 s
    lyfta: (tl, d, b) => { const k = Math.max(0, ...(b.vid ?? []).map(v => bump(tl, v + 0.4, 1.6))), u = upp(tl, d);
      return [{ ...F.blanda('glad', k > 0.3 ? 'nyfiken' : 'glad', 1), titt }, P({ rikt: 0.4 * SIDA * u, armar: [75 * k, 75 * k], boj: 5 * SIDA * k, luta: 2 * SIDA * k, strack: 0.04 * k, lyft: -3 * k })]; },
    // går: gang = [[sekunder, förflyttning i px från bitens start], …] (mjukt mellan), ner = [[från, till], …] sekunder då den nosar/tittar ner, luft = [[från, till, höjd px], …] hopp.
    // Fötterna går lugnt medan den rör sig, och den står kvar där den hamnar (bitens sista förflyttning).
    ga: (tl, d, b) => { const x = gangX(b.gang, tl), v = Math.abs(gangX(b.gang, tl + 0.05) - gangX(b.gang, tl - 0.05)) / 0.1, win = b.glidar === true || (Array.isArray(b.glidar) && b.glidar.some(([a, c]) => tl >= a && tl <= c)), gaar = win ? 0 : mjuk(kl(v / 40)), s = Math.sign(gangX(b.gang, tl + 0.1) - gangX(b.gang, tl - 0.1)) || 1,
        gl = win ? mjuk(kl(v / 40)) : 0, ner = Math.max(0, ...(b.ner ?? []).map(([a, c]) => mjuk(kl(Math.min((tl - a) / 0.4, (c - tl) / 0.4))))), ph = Math.sin(tl * 7), hopp = Math.max(0, ...(b.luft ?? []).map(([a, c, h]) => h * Math.sin(Math.PI * kl((tl - a) / (c - a)))));
      return [{ ...F.blanda('neutral', ner > 0.5 || b.nyfiken ? 'nyfiken' : gl > 0.3 ? 'forvanad' : 'glad', 1), titt: [6 * s * gaar, 0] }, P({ rikt: 0.5 * s * gaar, armar: [28 * gl, 28 * gl], boj: 2 * ph * gaar + 6 * s * ner - 5 * s * gl, lyft: -5 * Math.abs(ph) * gaar - hopp / SK, strack: 0.02 * ner + 0.03 * (hopp > 0), benY: [-24 * Math.max(0, ph) * gaar, -24 * Math.max(0, -ph) * gaar] }), [x, 0]]; },
    // lugna steg på tå åt höger (steg: antal): en fot i taget lyfts, kroppen följer med 55 px per steg, ansiktet vänt dit den går
    tassa: (tl, d, b) => { const n = b.steg ?? 3, u = kl((tl - 0.2) / (d - 0.4)) * n, i = Math.min(n - 1, Math.floor(u)), k = u - i, lyft = Math.sin(Math.PI * kl(k / 0.8));
      return [glad, P({ rikt: 0.6, strack: 0.02, lyft: -5 * lyft, boj: (i % 2 ? -2 : 2) * lyft, benY: i % 2 ? [0, -30 * lyft] : [-30 * lyft, 0], ben: i % 2 ? [0, -8 * lyft] : [8 * lyft, 0] }),
        [STEG * (i + mjuk(kl(k / 0.8))), 0]]; },
    tittar: () => ser, oj: () => [F.blanda('neutral', 'forvanad', 1), ser[1]],   // oj: förvånad, rycker till
    nyfiken: () => [{ ...F.blanda('neutral', 'nyfiken', 1), titt, luta: 1.5 * SIDA }, { ...ser[1], boj: 4.5 * SIDA }],   // böjer sig nyfiket mot saken
    sak: tl => [{ ...F.blanda('forvanad', 'glad', mjuk(kl((tl - 0.9) / 0.3))), titt }, ser[1]],   // förvånad när saken poppar fram, sedan glad
    putta: (tl, d, b) => { const k = Math.sin(Math.PI * kl((tl - (b.vid ?? 0.5) + 0.4) / 0.8));   // lutar sig fram, nuddar vid "vid", och tillbaka
      const lyft = (b.arm ?? 0) * k;   // arm: armen närmast saken lyfts så många grader och nuddar den; annars båda armarna mot saken (bada)
      return [ser[0], P({ rikt: SIDA, bada: b.arm ? 0 : 1, armar: SIDA > 0 ? [0, lyft] : [lyft, 0], luta: 3 * SIDA * k, boj: 6 * SIDA * k, x: 45 * SIDA * k / SK, strack: 0.02 * k })]; },
    vagga: (tl, d) => { const s = Math.sin(2 * Math.PI * tl / 1.4) * mjuk(kl(Math.min(tl, d - tl) / 0.5)); return [glad, P({ luta: 2 * s, boj: 6 * s, oron: [5 * s, -5 * s] })]; },   // gungar från fötterna
    // ett åk: tar sats (gungar bakåt), åker ut till höger med ökande fart (1,3 s), och kommer genast in från vänster och bromsar in mitt i bild
    glid: (tl, d, b) => { const UT = KANT + 440, s = b.sats ?? 0.3, upp = mjuk(kl(Math.min(tl - s + 0.3, d - tl) / 0.3));
      const x = tl < s + 1.3 ? UT * kl((tl - s) / 1.3) ** 2 - 30 * Math.sin(Math.PI * kl(tl / s)) : -UT * (1 - kl((tl - s - 1.3) / (d - s - 1.5))) ** 2;
      return [F.blanda('glad', 'jatteglad', 1), P({ armar: [30 * upp, 30 * upp] }), [x, x * Math.tan(BACKE * Math.PI / 180)]]; },
  };
  // bitarnas tider: den första börjar när luckan öppnas, så att djuret redan rör sig när det syns
  let t = K.oppnar + 0.1, gatt = 0;   // gatt: hur långt djuret har gått i tidigare tassa-bitar, så att det står kvar där
  const BITAR = g.scen.map(([d, typ, x = {}]) => { const b = { t0: t, d, typ, fn: ROR[typ], gatt, ...x }; t += d; if (typ === 'tassa') gatt += STEG * (x.steg ?? 3); else if (typ === 'stappla') gatt += x.flytt ?? -90; else if (typ === 'ga') gatt += x.gang.at(-1)[1]; return b; });
  for (const b of BITAR) if (!b.fn) throw new Error(`rörelsen "${b.typ}" finns inte i djur.js`);
  const DURATION = K.slut(t), SNOAR = BITAR.find(b => b.typ === 'snoar')?.t0, FL = [...svg.querySelectorAll('.flinga')], stor = svg.querySelector('#stor-flinga');
  // Ting i steg (M2): ting: { namn: [[sekunder, x, y, skala, opacitet, grader, följer, gästföljer], …] } på en bit. Nycklarna från alla bitar läggs i tidsordning och tinget
  // glider mjukt mellan dem (osynligt före den första, kvar efter den sista). x, y i scenens mått från marken under djuret; följer 1 = följer
  // med huvudfiguren (dess flytt och hopp). Formerna står i TINGRIT. Puffar (blåsning): puff: [[sekunder, x, y, riktning ±1]] på en bit.
  const TINGRIT = { flinga: `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#8FBBDA" stroke-width="17">${arm}</g><g stroke="#fff" stroke-width="9">${arm}</g>
    <circle r="27" fill="#fff" stroke="#8FBBDA" stroke-width="9"/></g>`,
    // en gran (gran, foten vid (0, 0)) och en morot med spetsen åt höger (morot, mitten vid (0, 0))
    gran: `<g transform="scale(0.8)">${[['M-36 16 L-36 -160 L36 -160 L36 16 Z', '#6B4A2E'], [`M-270 -130 Q-135 -84 0 -130 Q135 -84 270 -130 L0 -640 Z`, GRON], [`M-200 -560 Q-100 -514 0 -560 Q100 -514 200 -560 L0 -870 Z`, '#37894F'], [`M-132 -780 Q-66 -734 0 -780 Q66 -734 132 -780 L0 -960 Z`, '#409659']].map(([d, f]) => `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>`).join('')}
      ${[['M-36 16 L-36 -160 L36 -160 L36 16 Z', '#6B4A2E'], [`M-270 -130 Q-135 -84 0 -130 Q135 -84 270 -130 L0 -640 Z`, GRON], [`M-200 -560 Q-100 -514 0 -560 Q100 -514 200 -560 L0 -870 Z`, '#37894F'], [`M-132 -780 Q-66 -734 0 -780 Q66 -734 132 -780 L0 -960 Z`, '#409659']].map(([d, f]) => `<path d="${d}" fill="${f}" stroke="${f}" stroke-width="5" stroke-linejoin="round"/>`).join('')}</g>`,
    morot: `<path d="M-60 -16 L78 0 L-60 16 Z" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/><path d="M-60 -16 L78 0 L-60 16 Z" fill="#F08A24" stroke="#F08A24" stroke-width="4" stroke-linejoin="round"/><path d="M-60 0 L-96 -14 M-60 0 L-100 2 M-60 0 L-94 16" stroke="${GRON}" stroke-width="9" stroke-linecap="round" fill="none"/>`,
    // en isfläck på marken (is, mitten vid (0, 0))
    is: `<ellipse cy="6" rx="330" ry="34" fill="#fff" stroke="#fff" stroke-width="12"/><ellipse cy="6" rx="330" ry="34" fill="#BFE1F2" stroke="#8FBBDA" stroke-width="8"/><path d="M-190 -6 Q-120 -20 -50 -8 M60 8 Q130 -2 200 6" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".85"/>`,
    // ett litet paket med foten vid (0, 0): paket = rött med gult band, paketg = grönt med gult band
    paket: `<rect x="-48" y="-72" width="96" height="72" rx="6" fill="#fff" stroke="#fff" stroke-width="14"/><rect x="-48" y="-72" width="96" height="72" rx="6" fill="${ROD}" stroke="#2A2421" stroke-width="5"/><path d="M0 -72 L0 0 M-48 -36 L48 -36" stroke="${GUL}" stroke-width="16"/>`,
    paketg: `<rect x="-48" y="-72" width="96" height="72" rx="6" fill="#fff" stroke="#fff" stroke-width="14"/><rect x="-48" y="-72" width="96" height="72" rx="6" fill="${GRON}" stroke="#2A2421" stroke-width="5"/><path d="M0 -72 L0 0 M-48 -36 L48 -36" stroke="${GUL}" stroke-width="16"/>`,
    // en julkula, röd (kula) eller gul (kulag), mitten vid (0, 0)
    kula: kulan(ROD, 40).replace('<g filter="url(#sak-vax)">', '<g>'), kulag: kulan(GUL, 40).replace('<g filter="url(#sak-vax)">', '<g>'),   // utan kritkorn (kornfiltret gäller bara sakens egen ruta)
    // en skimrande stjärna (glans), en röd skärva av en julkula (skarva), och spaden med bladet vid (0, 0) (spade)
    glans: `<path d="M0 -44 Q4 -4 44 0 Q4 4 0 44 Q-4 4 -44 0 Q-4 -4 0 -44 Z" fill="${GUL}" stroke="#fff" stroke-width="8" stroke-linejoin="round" paint-order="stroke"/>`,
    skarva: `<path d="M-26 8 Q-12 -28 24 -10 Q4 -2 -6 18 Z" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/><path d="M-26 8 Q-12 -28 24 -10 Q4 -2 -6 18 Z" fill="${ROD}"/>`,
    spade: `<g transform="scale(1.5)"><path d="M128 0 L400 -62 M388 -92 L412 -32" fill="none" stroke="#fff" stroke-width="32" stroke-linecap="round"/>
      <path d="M0 0 Q4 -34 44 -40 L128 -34 Q138 0 128 34 L44 40 Q4 34 0 0 Z" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>
      <path d="M0 0 Q4 -34 44 -40 L128 -34 Q138 0 128 34 L44 40 Q4 34 0 0 Z" fill="#8FA3B5"/><path d="M128 0 L400 -62 M388 -92 L412 -32" fill="none" stroke="#B5793A" stroke-width="18" stroke-linecap="round"/></g>` };
  const TING = {}, PUFFAR = BITAR.flatMap(b => (b.puff ?? []).map(([s, x, y, rik = 1, v = 330]) => ({ t: b.t0 + s, x, y, rik, v })));
  for (const b of BITAR) for (const [n, ny] of Object.entries(b.ting ?? {})) { if (!TINGRIT[n.replace(/^bak_/, '').replace(/\d+$/, '')]) throw new Error(`tinget "${n}" finns inte i djur.js`);
    for (const [s, x = 0, y = 0, sk = 1, op = 1, rot = 0, folj = 0, gfolj = 0] of ny) (TING[n] ??= []).push([b.t0 + s, x, y, sk, op, rot, folj, gfolj]); }
  Object.entries(TING).forEach(([n, a]) => { a.sort((u, v) => u[0] - v[0]); svg.querySelector(n.startsWith('bak_') ? '#tingbak' : '#ting').insertAdjacentHTML('beforeend', `<g id="ting-${n}" opacity="0">${TINGRIT[n.replace(/^bak_/, '').replace(/\d+$/, '')]}</g>`); });   // bak_…: bakom gästerna
  svg.querySelector('#puff').innerHTML = PUFFAR.map((_, i) => `<g id="puff-${i}" opacity="0" fill="none" stroke-linecap="round">${[0, 1, 2].map(k =>
    `<g transform="translate(${k * 38} 0)"><path d="M0 -${30 - 6 * k} Q${18 - 3 * k} 0 0 ${30 - 6 * k}" stroke="#9CC3DE" stroke-width="15"/><path d="M0 -${30 - 6 * k} Q${18 - 3 * k} 0 0 ${30 - 6 * k}" stroke="#fff" stroke-width="8"/></g>`).join('')}</g>`).join('');
  const nyckel = (a, tt) => { if (tt <= a[0][0]) return [...a[0].slice(1, 3), a[0][3], 0, ...a[0].slice(5)];   // före den första nyckeln: osynlig
    const i = a.findLastIndex(k => tt >= k[0]), k0 = a[i], k1 = a[i + 1]; if (!k1) return k0.slice(1);
    const u = mjuk(kl((tt - k0[0]) / (k1[0] - k0[0]))); return k0.slice(1).map((v, j) => lerp(v, k1[j + 1], u)); };
  const T2 = BITAR.find(b => b.snomycket)?.t0, FL2 = [...svg.querySelectorAll('.flinga2')];
  const SAKT = (BITAR.find(b => b.typ === 'sak')?.t0 ?? -9) + 0.15, akare = svg.querySelector('#akare'), el = n => svg.querySelector('#sak-' + n);
  if (SNOAR !== undefined) FL.forEach(c => c.setAttribute('cy', -60));   // ingen snö i luften förrän det börjar snöa
  const lage = tt => {   // [ansikte, pose, luckans stängning, biten, sekunder in i den, flytt] vid tiden tt
    const i = Math.max(0, BITAR.findLastIndex(b => tt >= b.t0)), b = BITAR[i], tl = kl(tt - b.t0, 0, b.d), fore = BITAR[i - 1];
    const gor = (b, tl) => { const [f, p, [fx, fy] = [0, 0]] = b.fn(tl, b.d, b), fl = [fx + b.gatt, fy]; const u = b.uttryck ? { ...F.blanda('neutral', b.uttryck, 1), titt: f.titt } : f;   // bitens eget ansikte
      return [b.ser ? { ...u, titt: b.ser === true ? titt : blick(b.ser) } : u, p, fl]; };
    let [f, p, fl] = gor(b, tl);
    if (fore && tl < 0.4) { const [f0, p0, fl0] = gor(fore, fore.d), k = mjuk(tl / 0.4);
      f = F.blanda(f0, f, k); p = F.blandaPose(p0, p, k); fl = fl.map((v, j) => lerp(fl0[j], v, k)); }
    // medan djuret står och väntar (stilla) lever det: blicken går åt sidan en stund, tyngden flyttas, ett öra vippar (riggens vila)
    if (b.typ === 'stilla') { const [fv, pv] = F.vila(f, p, tt), w = mjuk(kl(Math.min(tl, b.d - tl) / 0.4)); f = F.blanda(f, fv, w); p = F.blandaPose(p, pv, w); }
    // sitter i saken (pulkan) från strax efter att den har poppat fram: benen ut och kroppen ner, bakom pulkans framsida
    if (SAK?.med) { const S = F.POSER.sitter; p = F.blandaPose(p, { ...p, ben: S.ben, benY: S.benY, sank: S.sank }, mjuk(kl((tt - SAKT - 0.7) / 0.5))); }
    // backe: djuret (och pulkan) står alltid på backens linje (y följer x); sjunk: [[sekunder, px]] på bitar = pulkan sjunker ner i snön (kvar där)
    if (BACKE) fl = [fl[0], fl[0] * Math.tan(BACKE * Math.PI / 180)];
    const SJ = BITAR.flatMap(q => (q.sjunk ?? []).map(([v, h]) => [q.t0 + v, h])), sa = SJ.findLastIndex(k => tt >= k[0]);
    if (sa >= 0) fl = [fl[0], fl[1] + (SJ[sa + 1] ? lerp(SJ[sa][1], SJ[sa + 1][1], mjuk(kl((tt - SJ[sa][0]) / (SJ[sa + 1][0] - SJ[sa][0])))) : SJ[sa][1])];
    const a = (1 - Math.cos(2 * Math.PI * tt / 3.6)) / 2;   // andas
    const dorr = q => q?.dorr ?? STANGD[q?.typ] ?? 0;   // dorr: hur stängd luckan är på en bit (0 öppen, 1 stängd), annars bitens rörelse
    return [f, { ...p, strack: p.strack + 0.012 * a }, lerp(dorr(fore), dorr(b), mjuk(kl(tl / 0.5))), b, tl, fl];
  };
  function rita(tt) {
    const [f, p, stangd, b, tl, fl] = lage(tt), syns = SAK ? pop((tt - SAKT) / 0.4) : 0;
    const fb = blinka(f, tt);   // ögonens form byts i en bildruta (som en blinkning), aldrig två former ovanpå varandra
    F.rita(fig, { ...fb, glad: fb.glad.map(v => +(v > 0.5)), ...('kawaii' in fb && { kawaii: +(fb.kawaii > 0.5) }), ...('sov' in fb && { sov: +(fb.sov > 0.5) }) }, p);
    akare.setAttribute('transform', `translate(${(GX + fl[0]).toFixed(1)} ${fl[1].toFixed(1)}) rotate(${SAK?.med ? BACKE * kl(syns) : 0})`);
    SAK?.rita(el, { tt, b, tl, syns, bitar: BITAR, sida: SIDA, tak: TAK, kant: KANT });
    // gästerna: in med ett hopp (1,2 s) från sin sida när biten med in: nummer börjar; sedan bitens rörelse (med), vinkar när huvudfiguren vinkar, annars vilar de
    const rent = fb => ({ ...fb, glad: fb.glad.map(v => +(v > 0.5)), ...('kawaii' in fb && { kawaii: +(fb.kawaii > 0.5) }), ...('sov' in fb && { sov: +(fb.sov > 0.5) }) });   // hela ansikten, inga halvblandningar
    GASTER.forEach((G, i) => { const inb = BITAR.find(p => p.in === i), DIN = inb?.tass ? 3.0 : 1.2, u = tt - (inb?.t0 ?? 1e9), k = kl(u / DIN), luft = inb?.tass ? 0 : Math.sin(Math.PI * k) * (k < 1), R = G.R;   // tass: true på biten med in = kommer in på tå (3 s) i stället för med ett hopp
      G.hall.style.display = u > 0 ? '' : 'none';
      let gf, gp, gx = 0; const m = [].concat(b.med?.[i] ?? (b.typ === 'vinka' ? 'vinka' : []));
      if (u < DIN) { const ph = Math.sin(u * 5), s = G.mot, tass = inb.tass ? mjuk(kl(Math.min(u / 0.4, (DIN - u) / 0.4))) : 0;
        gf = luft > 0.15 ? R.blanda('neutral', 'jatteglad', 1) : G.glad; gp = GP(G, { lyft: -190 * luft - 5 * Math.abs(ph) * tass, strack: 0.04 * luft, rikt: 0.5 * s * tass, boj: 2 * ph * tass, benY: [-24 * Math.max(0, ph) * tass, -24 * Math.max(0, -ph) * tass] }); }
      else if (m[0]) [gf, gp, gx = 0] = GROR[m[0]](tl, b.d, G, i, m[1], b);
      else [gf, gp] = R.vila(G.glad, GP(G, {}), tt + i);
      const gxx = lerp(Math.sign(G.x) * (KANT + 380), G.x, 1 - (1 - k) ** 2) + gx, gyy = gxx * Math.tan(BACKE * Math.PI / 180);   // på backen står gästen på backens linje
      G.hall.setAttribute('transform', `translate(${gxx.toFixed(1)} ${gyy.toFixed(1)})`);
      G.px = gxx + (gp.x ?? 0) * G.sk; G.py = gyy + (gp.lyft ?? 0) * G.sk;
      R.rita(G.fig, rent(G.blinka(gf, tt)), { ...gp, strack: (gp.strack ?? 0) + 0.012 * (1 - Math.cos(2 * Math.PI * (tt + i) / 3.6)) / 2 }); });
    // tingen i steg och puffarna
    const dX = GX + fl[0] + (p.x ?? 0) * SK, dY = fl[1] + (p.lyft ?? 0) * SK;
    for (const n in TING) { const [x, y, sk, op, rot, folj, gfolj] = nyckel(TING[n], tt), e = svg.querySelector('#ting-' + n), G0 = GASTER[0] ?? { px: 0, py: 0 };
      const th = SAK?.med ? BACKE * Math.PI / 180 * kl(syns) : 0, xr = x * Math.cos(th) - y * Math.sin(th), yr = x * Math.sin(th) + y * Math.cos(th);   // på pulkan: förskjutningen vrids med backen
      e.setAttribute('opacity', op); e.setAttribute('transform', `translate(${((1 - folj) * x + folj * (xr + dX) + gfolj * G0.px).toFixed(1)} ${((1 - folj) * y + folj * (yr + dY) + gfolj * G0.py).toFixed(1)}) rotate(${(rot + folj * th * 180 / Math.PI).toFixed(1)}) scale(${sk.toFixed(3)})`); }
    PUFFAR.forEach((q, i) => { const u = (tt - q.t) / 1.0, e = svg.querySelector('#puff-' + i);
      e.setAttribute('opacity', u > 0 && u < 1 ? (0.9 * Math.sin(Math.PI * u) ** 0.7).toFixed(2) : 0);
      e.setAttribute('transform', `translate(${(q.x + q.rik * q.v * mjuk(kl(u))).toFixed(1)} ${q.y}) scale(${q.rik * (1.5 + 0.7 * kl(u))} ${1.5 + 0.7 * kl(u)})`); });
    // det snöar mycket: ännu fler flingor, tätare under några sekunder
    if (T2 !== undefined) FL2.forEach((c, i) => { const u = tt - T2 - i * 0.16;
      c.setAttribute('cy', u < 0 ? -60 : u * (140 + i % 5 * 28) % (STA ? 1340 : 900) - 40); c.setAttribute('cx', FX(i + 40) + 16 * Math.sin(tt * 0.8 + i)); });
    // snön faller lugnt bakom djuret (olika fart och lite sväng), från biten "snoar"
    if (SNOAR !== undefined) FL.forEach((c, i) => { const u = tt - SNOAR - i * 0.37 % 2.5;
      c.setAttribute('cy', u < 0 ? -60 : u * (150 + i % 4 * 30) % (STA ? 1340 : 900) - 40); c.setAttribute('cx', FX(i) + 14 * Math.sin(tt * 0.9 + i)); });
    // den stora flingan: dalar mot nosen, sitter där från hoppets topp och smälter efter landningen
    const fangar = b.typ === 'fanga' && g.nos;
    stor.setAttribute('opacity', fangar ? Math.min(kl(tl / 0.15), 1 - kl((tl - 1.45) / 0.4)) : 0);
    if (fangar) {
      const nx = GX + (g.nos[0] - 512 + p.x) * SK, ny = (g.nos[1] - F.FOTTER + p.lyft) * SK - 26, k = mjuk(kl(tl / 0.85));
      stor.setAttribute('transform', `translate(${nx + (70 + 12 * Math.sin(tl * 5)) * (1 - k)} ${lerp(TAK - 70, ny, k)}) rotate(${20 * (1 - k)}) scale(${(1 - 0.5 * kl((tl - 1.45) / 0.4)) * (b.storlek ?? 1)})`);
    }
    svg.querySelector('#boil-brus').setAttribute('seed', 1 + Math.floor(tt * 8) % 4);
    // ryck: [sekunder, …] på en bit = luckan rycker till (en liten glipa på 0,4 s) men öppnas inte; ryckstyrka standard 0,05
    const ryck = Math.max(0, ...BITAR.flatMap(q => (q.ryck ?? []).map(v => (q.ryckstyrka ?? 0.05) * Math.sin(Math.PI * kl((tt - q.t0 - v) / 0.4)))));
    K.rita(tt, tt < DURATION - 2.4 ? stangd - ryck : 0);
  }

  const eff = (n, k = 1) => n.includes('/') ? `assets/ljud/effekter/${n}-${k}.m4a` : `assets/ljud/effekter/${n}/${n}-${k}.m4a`;   // 'kanin-gullig/kanin-hej': filen ligger i en annan mapp
  // musiken under (bädden är 61 s, så den loopar): tyst: true på en bit = ingen musik under biten (den tonas ut och in igen på 0,8 s)
  const TYST = BITAR.filter(b => b.tyst).reduce((m, b) => { const z = m.at(-1); if (z && Math.abs(z[1] - b.t0) < 0.01) z[1] = b.t0 + b.d; else m.push([b.t0, b.t0 + b.d]); return m; }, []);
  const SEG = []; let fran0 = 0; for (const [a, c] of TYST) { SEG.push([fran0, a]); fran0 = c; } SEG.push([fran0, DURATION]);
  const MUSIK = SEG.filter(([a, c]) => c - a > 0.5).map(([a, c]) => ({ t: a, fil: BAD, vol: 0.45, ss: a % 61.12, langd: c - a, loop: true, fade: 0.8, fadeIn: a > 0 ? 0.8 : 0.02 }));
  const ljud = [...MUSIK, ...K.ljud(),
    ...BITAR.flatMap(b => [...(b.sag ?? []).map(([fil, tal, vid, ss, langd, vol = 2.5]) => ({ t: b.t0 + vid, fil: `assets/ljud/roster/${fil}.m4a`, vol, tal, ss, langd, fade: 0.08 })),
      ...(b.ljud ?? []).map(([n, vid, k, vol = 1.5, langd, ss]) => ({ t: b.t0 + vid, fil: eff(n, k), vol, langd, ss, fade: 0.15, fadeIn: 0.003 })),   // fadeIn kort: klapp, pop och puff har sin smäll allra först
      ...(STANGD[b.typ] === 1 && STANGD[BITAR[BITAR.indexOf(b) - 1]?.typ] !== 0.78 ? [{ t: b.t0, fil: eff('swoosh'), vol: 1.2, fadeIn: 0.003 }] : [])])];
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION; window.BITAR = BITAR.map(b => [+b.t0.toFixed(2), b.typ]);   // bitarnas tider, för att välja stillbilder
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
