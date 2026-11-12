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
// sida när biten börjar, och alla som är inne vinkar i bitar med rörelsen vinka. slut: 'vi-ses-snart' byter ramens slutreplik, badd: 'jul-badd-2' byter bädd (lucka.js).
// staScen: scenens skala i stående bild (standard 1), när scenen är bredare än den stående bilden.
// vid: [skala, marken] = vidare bild liggande (standard 0,82 och 864/925), t.ex. hela pulkabacken. nara: true | [från, till] på en bit = hårt klipp till
// närbild på huvudfigurens ansikte (zoom 2,1, som Bruna sången) och hårt tillbaka. jacka: 'färg', jackor: { gästnr: 'färg' } = vinterjackor. pynt: se nedan.
// Rörelser med saken: tittar (ser på den), nyfiken, oj (förvånad), peka (arm: grader, pekar på den), tassa (steg: antal lugna
// steg åt sidan, djuret står kvar där det hamnar), putta (lutar sig mot den och nuddar den vid: sekunder in, standard 0,5),
// vagga (gungar från sida till sida), glid (djuret och pulkan åker ut till höger och kommer in igen från vänster; sats: sekunder
// den tar sats först, standard 0,3). ser: true på en bit = djuret tittar på saken medan det gör bitens rörelse (vinkar till snögubben),
// ser: [x, y] = på en punkt räknad från sakens plats (skärvorna på snön).
// Ljusen: tand: [sekunder, …] på en bit = kritan kommer in och tänder ett ljus vid varje tid, blink: [...] = lågorna blinkar till.
// Kulan: faller, spade och ritar (sekunder in i biten), se SAKER.kula.
// Lucia (lucka 13): knacka (vid: knacken), sjunga (takt: [sekunder per slag, ett slag i biten], munnen i takt), musik: [[fil, vid, styrka]] = en hel sång ur assets/ljud/musik/jul/ (lägg tyst: true på bitarna), gästen somnig/vaknar, in med dyker: true (syns i dörren utan hopp),
// ting dorr/dorroppen och hink, stro: sand i en båge som blir liggande. busig: [sekunder, x, y] = kritan kommer in och vickar busigt.
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
const STANGD = { borta: 1, glant: 0.78 };   // hur stängd luckan är i tittut-bitarna
const ROD = '#E5302A', GUL = '#F6C531', GRON = '#2F7D46', KOL = '#3B3431';

// Sakerna, ritade i kod som kritteckningar med vit klisterkant. Måtten är scenens, med saken kring sin plats.
// plats [x, y] · ruta = kritkornets område kring platsen · bak/fram = det som ligger bakom/framför djuret · med: saken
// följer med djuret (pulkan) · ser [dx, dy] = dit djuret tittar · rita(el, s) sätter saken varje bildruta: el(namn) är
// elementet #sak-namn, s = { tt, b: biten, tl: sekunder in i den, syns: 0–1 från biten "sak", bitar, sida, tak, kant }.
// ruta2 = ett andra, mindre kornområde (sak-vax2) för små saker som rör sig.
const klister = (d, farg, mer = '', vax = 'sak-vax') => `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>
  <g filter="url(#${vax})"><path d="${d}" fill="${farg}"/>${mer}</g>`;
// kritan: samma röda kritbild som i 020–024 (rekvisita/krita-rod, spetsen i [742, 132]), lutad 125°, med spetsen i (0, 0).
// Skalan ger samma storlek i bild som 022:s 0,33 (scenen här är skalad 0,82). Skuggan läggs utanför spegelvändningen (kritaGrupp).
const kritaBild = () => `<image href="/assets/rekvisita/krita-rod/cut/krita-rod-tunn.png" width="755" height="265" transform="rotate(125) scale(0.4) translate(-742 -132)"/>`;
const kritaGrupp = (pre = 'sak') => `<g filter="url(#kritskugga)"><g id="${pre}-krita">${kritaBild()}</g></g><g id="${pre}-smulor"></g>`;
// Kritan ritar en riktig bild (som rita.js och 020–024): konturen (rekvisita/<namn>/cut/<namn>-kontur.json) i ett lugnt drag med smulor och
// gnistor, sedan fylls bilden i inifrån och ut (en cirkel som växer från mitten, 1,2 s) medan konturen tonar bort. ritbild ger bilden med punkten
// [ax, ay] (bildens pixlar) i (0, 0) och skalan s; farg = konturens färg (sakens mörkare ton). Den ritas av rit: [[sekunder, id, konturens
// sekunder = 2,4], …] på en bit; utan rit syns den hela tiden (dold = aldrig). I TINGRIT står id som __ID__ och blir tingets namn.
const ritbild = (id, namn, w, h, [ax, ay], s, farg, dold = false) => `<g class="ritbar" data-id="${id}" data-namn="${namn}"${dold ? ' data-dold="1"' : ''} transform="scale(${s}) translate(${-ax} ${-ay})">
  <image href="/assets/rekvisita/${namn}/cut/${namn}.png" width="${w}" height="${h}"/><path class="ritkontur" fill="none" stroke="${farg}" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></g>`;
// kritsmulor som faller från spetsen och några mjuka krit-gnistor medan kritan ritar (som ritKrita i 022), p = spetsen, i scenens mått
const slumpK = x => { const v = Math.sin(x * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
const kritSmulor = (p, tt) => { const e = 1.22; let h = '';
  for (let j = 0; j < 8; j++) { const b = Math.floor(tt * 14) - j, age = tt - b / 14, r = slumpK(b * 7.13), r2 = slumpK(b * 3.31 + 1.7), op = Math.max(0, 0.7 - age * 1.4);
    if (op > 0) h += `<circle cx="${(p[0] + (r - 0.5) * 26 * e).toFixed(1)}" cy="${(p[1] + (6 + age * 55 + r2 * 8) * e).toFixed(1)}" r="${((2 + 2.5 * r2) * e).toFixed(1)}" fill="#D9503F" opacity="${op.toFixed(2)}"/>`; }
  for (let j = 0; j < 3; j++) { const b = Math.floor(tt * 3) - j, age = tt - b / 3, r = slumpK(b * 5.7 + 2), r2 = slumpK(b * 9.1 + 4), k = age > 0 && age < 0.9 ? Math.sin(Math.PI * age / 0.9) : 0;
    if (k <= 0) continue; const x = p[0] + (r - 0.5) * 70 * e, y = p[1] - (14 + 26 * r2 + 18 * age) * e, R = (7 + 4 * r2) * e * k, f = v => v.toFixed(1);
    h += `<path d="M${f(x)} ${f(y - R)} Q${f(x)} ${f(y)} ${f(x + R)} ${f(y)} Q${f(x)} ${f(y)} ${f(x)} ${f(y + R)} Q${f(x)} ${f(y)} ${f(x - R)} ${f(y)} Q${f(x)} ${f(y)} ${f(x)} ${f(y - R)}Z" fill="#FFF3B8" stroke="#fff" stroke-width="${f(2.2 * e)}" paint-order="stroke" opacity="${(0.9 * k).toFixed(2)}"/>`; }
  return h; };
// delade former. LJUSET står med foten i (0, 0); LAGAN har vekens topp i (0, 0): ett mjukt varmt sken, gul låga, orange kärna
const LJUSET = 'M-35 14 L-35 -210 Q-35 -236 0 -236 Q35 -236 35 -210 L35 14 Z', VEKE = -262;
// Sakernas riktiga bilder (assets/rekvisita/<namn>/cut/<namn>.png, julkalender-saker-overlamning.md): punkten [ax, ay] i bildens pixlar hamnar
// i (0, 0) med skalan s. Saknas filen ritas kod-versionen i stället (onerror). mer = extra attribut på bilden (t.ex. ett färgfilter).
const bild = (namn, w, h, [ax, ay], s, kod = '', mer = '') => `<g><image href="/assets/rekvisita/${namn}/cut/${namn}.png" width="${w}" height="${h}" transform="scale(${s}) translate(${-ax} ${-ay})" ${mer}
  onerror="this.nextElementSibling.removeAttribute('display')"/><g display="none">${kod}</g></g>`;
// lågan (laga.png, basen i vekens topp) ovanpå ett mjukt varmt sken
const LAGAN = `<circle cy="-36" r="120" fill="url(#sak-sken)"/>${bild('laga', 1024, 1024, [511.5, 901], 0.17,
  `<path d="M0 -84 C40 -40 34 2 0 2 C-34 2 -40 -40 0 -84 Z" fill="${GUL}" stroke="#fff" stroke-width="9" stroke-linejoin="round" paint-order="stroke"/>
  <path d="M0 -46 C17 -24 14 -4 0 -4 C-14 -4 -17 -24 0 -46 Z" fill="#F08A24"/>`)}`;
// fyra adventsljus i rad (det vänstra i x = 0, LJX mellan dem) med snö kring foten och lågor (#sak-laga0 … 3, släckta). Bilden adventsljus.png:
// botten (512, 1173) i (0, 0), vekens topp (512, 221) i VEKE. #sak-kv: ljuset (stump och växande ljus skalas i höjd); kf och vek är tomma (kod-versionens delar)
const LJX = 124;
const ljusrad = X => [0, 1, 2, 3].map(i => `<g id="sak-kv${i}" transform="translate(${X(i)} 0)">${bild('adventsljus', 1024, 1371, [512, 1173], -VEKE / 952,
    `<path d="${LJUSET}" fill="${ROD}" stroke="#fff" stroke-width="14" stroke-linejoin="round" paint-order="stroke"/><path d="M0 -236 L0 ${VEKE}" stroke="${KOL}" stroke-width="7" stroke-linecap="round"/>`)}</g>
    <g id="sak-kf${i}"></g><g id="sak-vek${i}"></g><ellipse class="sno" cx="${X(i)}" cy="16" rx="66" ry="20"/><g id="sak-laga${i}" transform="scale(0)">${LAGAN}</g>`).join('');
// en julkula med mitten i (0, 0) och radien r (julkula.png: bollens mitt (512.5, 612.5), r 321.5, hatten och öglan ovanför). Den gula: bildens
// röda görs gul med filtret kula-gul (grönt ur rött); andra färger blir röda
const kulan = (farg, r, vax = 'sak-vax') => bild('julkula', 1024, 1024, [512.5, 612.5], r / 321.5, `<circle r="${r}" fill="#fff" stroke="#fff" stroke-width="12"/>
  <rect x="${-0.26 * r}" y="${-r - 0.2 * r}" width="${0.52 * r}" height="${0.38 * r}" rx="5" fill="${GUL}" stroke="#fff" stroke-width="7" paint-order="stroke"/>
  <g filter="url(#${vax})"><circle r="${r}" fill="${farg}"/><path d="M${-0.6 * r} ${-0.22 * r} Q${-0.5 * r} ${-0.65 * r} ${-0.12 * r} ${-0.76 * r}" fill="none" stroke="#fff" stroke-width="${0.17 * r}" stroke-linecap="round" opacity=".85"/></g>`,
  farg === GUL ? 'filter="url(#kula-gul)"' : '');
// granen: skogens gran (assets/bakgrunder/skogen-gron-saker/gran.png, 896 × 1200, stammens fot i (448, 1136), toppen i (450, 73)), samma gran
// som i lucka 1 och 22. GS = bildens skala i scenen; granKula ger en kulas plats på granen, GTOPP toppens höjd
const GS = 0.77, GTOPP = (73 - 1136) * GS, granen = `<image href="/assets/bakgrunder/skogen-gron-saker/gran.png" x="${-448 * GS}" y="${-1136 * GS + 8}" width="${896 * GS}" height="${1200 * GS}"/>`;
const GKULOR = [[-128, -300, ROD], [112, -452, GUL], [-52, -610, ROD]];   // kulorna på granen: x, y, färg
// spaden (spade.png, bladet nedåt): liggande på snön med bladets spets i (0, 0) och skaftet snett uppåt åt höger, bladet ca 190 px långt
const SPADE = `<g transform="rotate(84) scale(0.45) translate(-512 -1290)"><image href="/assets/rekvisita/spade/cut/spade.png" width="1024" height="1371"/></g>`;
// skärvor av julkula.png: bitar av bilden (en klippt månghörning med vit kant), mitten i (0, 0), ca 50 px. Nr 2 är den gula hatten.
// skarvbit-skarva1…3 är samma bitar som tingen skarva1…3 i lucka 7 (hunden hämtar skärva 2, 1 och 0)
const SKARVBIT = [['260,470 420,430 450,600 300,640', 357, 535], ['380,700 540,660 560,840 400,860', 470, 765], ['420,222 605,222 605,305 420,305', 512, 262],
  ['560,420 740,470 720,620 580,590', 650, 525], ['600,680 780,650 760,820 620,850', 690, 750]];
const skarvDefs = SKARVBIT.map(([pts, cx, cy], i) => `<clipPath id="skarvk-${i}"><polygon points="${pts}"/></clipPath><g id="skarvbit-${i}" transform="scale(0.3) translate(${-cx} ${-cy})">
  <polygon points="${pts}" fill="#fff" stroke="#fff" stroke-width="26" stroke-linejoin="round"/><image href="/assets/rekvisita/julkula/cut/julkula.png" width="1024" height="1024" clip-path="url(#skarvk-${i})"/></g>`).join('')
  + [2, 1, 0].map((i, n) => `<use id="skarvbit-skarva${n + 1}" href="#skarvbit-${i}"/>`).join('');
// storGran: skala = den klädda granen (julgran-kladd.png 1024², fot (504, 942), topp (512, 81)) i stället för skogens gran, med varma ljus som tindrar
// (.tindra) och stjärnan i toppen. Ljusen sitter på slingans bågar, räknat i bildens pixlar
const LAMPOR = [[455, 175], [585, 205], [340, 318], [470, 345], [640, 300], [300, 470], [450, 500], [610, 480], [740, 430], [255, 625], [420, 655], [580, 650], [760, 610], [300, 790], [520, 800], [700, 780]];
const storGran = s => `<image href="/assets/rekvisita/julgran/cut/julgran-kladd.png" x="${-504 * s}" y="${-942 * s + 8}" width="${1024 * s}" height="${1024 * s}"/>
  ${LAMPOR.map(([x, y]) => `<g class="tindra" transform="translate(${((x - 504) * s).toFixed(0)} ${((y - 942) * s + 8).toFixed(0)})"><circle r="${40 * s}" fill="url(#sak-sken)"/><circle r="${7 * s}" fill="#FFE9A8"/></g>`).join('')}
  <g transform="translate(${8 * s} ${(81 - 942) * s - 40 * s}) scale(${0.9 * s})"><circle r="150" fill="url(#sak-sken)" class="tindra"/><image href="/assets/rekvisita/stjarna-gul/cut/stjarna-gul.png" x="-82" y="-82" width="164" height="164"/></g>`;
const stjarnan = `<image href="/assets/rekvisita/stjarna-gul/cut/stjarna-gul.png" x="-82" y="-82" width="164" height="164"/>`;   // julstjärnan, mitten i (0, 0)
const SAKER = {
  // pepparkakshjärtat: brunt med en prickad vit kristyrkant, gungar i takt medan djuret dansar och klappar
  // kritan ritar det (rit: [[sekunder, 'hjarta', …]] på sak-biten)
  hjarta: { plats: [-330, -430], ritas: true,
    fram: `<g id="sak-a">${ritbild('hjarta', 'pepparkakshjarta', 1024, 1024, [512, 522], 0.42, '#7A4520')}</g>`,
    rita(el, { syns, b, tl }) { const takt = /dansa|klappa/.test(b.typ) ? mjuk(kl(Math.min(tl, b.d - tl) / 0.4)) : 0;
      el('a').setAttribute('transform', `translate(${20 * takt * Math.sin(2 * Math.PI * tl)} ${-16 * takt * Math.abs(Math.sin(2 * Math.PI * tl))}) rotate(${14 * takt * Math.sin(2 * Math.PI * tl)}) scale(${1.1 * syns})`); } },
  // pulkan (pulka.png, en kälke med röd sits): kritan ritar den bakom djuret (rit: [[sekunder, 'pulka', …]] på sak-biten), sedan sätter sig
  // djuret på sitsen (sate = hur högt, i figurens mått) och lutar med backen. Pulkan ligger på backen från början (vriden mot djurets lutning)
  pulka: { plats: [0, 0], med: true, ritas: true, ser: [60, 0], sate: -150,
    fram: `<g id="sak-a">${ritbild('pulka', 'pulka', 1024, 572, [560, 392], 1.4, '#7A4A2A')}</g>`,
    rita(el, { syns, backe }) { el('a').setAttribute('transform', `rotate(${(backe * (1 - syns)).toFixed(2)})`); } },
  // fyra röda ljus i snön (platsen är det vänstra ljuset) och en liten gul krita som tänder dem från vänster: lågan ritas när kritan nuddar veken
  ljus: (() => { const X = i => i * LJX;
    return { plats: [-500, 0], ser: [156, -200], ruta: [-130, -400, 640, 460],
      fram: `${ljusrad(X)}<g transform="translate(${X(3)} 0)">${ritbild('ljus-nytt', 'adventsljus', 1024, 1371, [512, 1173], -VEKE / 952, '#8E1F1A', true)}</g>${kritaGrupp()}`,
      rita(el, { tt, bitar, tak, sida }) {
        // tand: [sekunder | [sekunder, ljus nr], …] = tänds nästa ljus i ordningen (eller ljus nr: tänds igen), slock: [[sekunder, ljus nr], …] = blåses ut (mjukt, 0,3 s)
        let n = 0; const E = bitar.flatMap(b => (b.tand ?? []).map(v => [].concat(v)).map(([v, i = n++]) => ({ t: b.t0 + v, i }))), O = bitar.flatMap(b => (b.slock ?? []).map(([v, i]) => ({ t: b.t0 + v, i })));
        let m = 0; const B = bitar.flatMap(b => (b.blink ?? []).map(v => [].concat(v)).map(([v, i = m++ % 4]) => ({ t: b.t0 + v, i })));   // blink: [sekunder | [sekunder, ljus nr]]
        // stump: 0,3 på en bit = det fjärde ljuset är en kort stump. rit: [[sekunder, 'ljus-nytt', …]] = kritan ritar ett nytt, helt ljus på stumpens plats
        // (ritbild); stumpen tonar bort medan det nya fylls i, och lågan sitter sedan på det nya
        const H0 = bitar.find(b => b.stump != null)?.stump ?? 1, NY = bitar.flatMap(b => (b.rit ?? []).filter(r => r[1] === 'ljus-nytt').map(([v, , sek = 2.4]) => b.t0 + v + sek))[0] ?? 1e9;
        const hj = tt >= NY ? 1 : H0;
        for (const id of ['kv', 'kf', 'vek']) { el(id + 3).setAttribute('transform', `translate(${X(3)} 0) scale(1 ${H0})`); el(id + 3).setAttribute('opacity', (1 - mjuk(kl((tt - NY) / 0.8))).toFixed(3)); }
        const HI = i => i === 3 ? hj : 1;
        // lågan växer fram när den tänds och blinkar till (större en halv sekund) när vi räknar igen
        for (let i = 0; i < 4; i++) { const tand = E.filter(e => e.i === i && e.t <= tt).at(-1)?.t, ut = O.filter(e => e.i === i && e.t <= tt).at(-1)?.t;
          if (tand === undefined) continue; const av = ut !== undefined && ut >= tand ? 1 - mjuk(kl((tt - ut) / 0.3)) : 1;
          el('laga' + i).setAttribute('transform', `translate(${X(i)} ${VEKE * HI(i)}) scale(${pop((tt - tand) / 0.35) * av * (0.35 + 0.65 * HI(i)) * (1 + 0.4 * Math.sin(Math.PI * kl((tt - (B.filter(e => e.i === i && e.t <= tt).at(-1)?.t ?? 1e9)) / 0.5)))})`); }
        // kritan: in uppifrån till första veken (2,6 s, i bild efter 0,3 s), väntar där 0,8 s (nu händer det snart) och tänder; en liten båge
        // till nästa veke (högst 1,6 s före), väntar igen, och ut 0,2 s efter den sista lågan
        const UT = [sida < 0 ? X(0) - 260 : X(3) + 260, tak - 80], vid = i => [X(i), VEKE * HI(i)]; let p = UT;   // in från den sida där djuret inte står
        const V = [...E].sort((a, c) => a.t - c.t), slut = e => e.slut ?? e.t;
        // är det mer än 3 s till nästa besök går kritan ut emellan (0,2 s efter, på 1 s) och kommer in igen uppifrån
        const langt = (a, c) => !a || !c || c.t - 2.4 - slut(a) > 3;
        V.forEach((e, j) => { const t = e.t, fore = V[j - 1], ny = langt(fore, e), fran = ny ? UT : vid(fore.i), t0 = ny ? t - 3.4 : Math.max(slut(fore) + 0.45, t - 2.4), u = kl((tt - t0) / Math.max(0.2, t - 0.8 - t0)), k = ny ? 1 - (1 - u) ** 2 : mjuk(u);   // in: fort först, så att den syns direkt
          if (tt > t0) p = [lerp(fran[0], X(e.i), k), lerp(fran[1], VEKE * HI(e.i), k) - (!ny && fore.i !== e.i ? 60 * Math.sin(Math.PI * k) : 0) - (e.slut ? 0 : 7 * Math.sin(Math.PI * kl((tt - t + 0.8) / 0.8)) ** 2)];
          const ut = langt(e, V[j + 1]) ? mjuk(kl((tt - slut(e) - 0.2) / 1.0)) : 0; if (ut > 0) p = [lerp(p[0], UT[0], ut), lerp(p[1], UT[1], ut)]; });
        el('krita').setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) scale(${sida < 0 ? -1 : 1} 1)`); } }; })(),
  // granen med julkulan: en hel gran (platsen är stammens fot) och en röd kula i ett snöre från en gren i noshöjd. Kulan poppar
  // fram i biten "sak", gungar när djuret puttar på den (dämpad pendel) och följer med när djuret vaggar. På bitarna:
  // faller: sekunder = snöret släpper, kulan faller (0,45 s), spricker och ligger i skärvor på snön · spade: sekunder = en liten spade
  // kommer in från höger, tar skärvorna och åker ut (2,6 s) · ritar: sekunder = den röda kritan kommer in och ritar en ny
  // kula: snöret, sedan kulan inifrån och ut, sist hatten (klar efter 3,25 s, kritan ute efter 4,2 s)
  kula: (() => { const P0 = [-133, -628], SN = 110, R = 70, FALL = -P0[1] - SN - 2 * R + 10;   // snörets fäste (under granens översta våning), dess längd, kulans radie, fallet till snön
    const SKARVOR = [[-150, 2, 20], [-88, 14, -40], [-22, 4, 65], [40, 16, -15], [100, 0, 35]];   // skärvorna på snön: x, y, vridning
    const skarva = i => `<use href="#skarvbit-${i}"/>`, PLATS = i => 28 + 18 * i;   // PLATS: skärvans plats på spadbladet
    const KULA = id => ritbild(id, 'julkula', 1024, 1024, [512.5, 612.5], R / 321.5, '#8E1F1A');
    return { plats: [326, 0], ritas: true, ser: [P0[0], P0[1] + SN + R],
      bak: `<g id="sak-spade">${SPADE}${SKARVOR.map(([, , a], i) => `<g class="last" transform="translate(${PLATS(i)} -4) rotate(${a})" opacity="0">${skarva(i)}</g>`).join('')}</g>
        ${granen}<ellipse class="sno" cy="20" rx="120" ry="22"/>`,
      fram: `<g id="sak-pendel"><path id="sak-snore" stroke="${GUL}" stroke-width="7" stroke-linecap="round"/>
          <g id="sak-boll"><g id="sak-k1">${KULA('kula')}</g><g id="sak-k2">${KULA('kula-ny')}</g>
            <path id="sak-spricka" d="M-10 -62 L12 -30 L-16 -4 L14 24 L-8 60 M12 -30 L44 -18 M-16 -4 L-48 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></g></g>
        <g id="sak-skarvor" transform="translate(${P0[0]} -8)">${SKARVOR.map((_, i) => `<g>${skarva(i)}</g>`).join('')}</g>`,
      rita(el, { tt, b, tl, bitar, sida, kant }) {
        const tid = n => { const p = bitar.find(p => p[n] != null); return p ? p.t0 + p[n] : 1e9; }, TF = tid('faller'), sp = tt - tid('spade');
        const rt = id => { for (const p of bitar) for (const [v, i, sek = 2.4] of p.rit ?? []) if (i === id) return [p.t0 + v, sek]; return [1e9, 2.4]; };
        const [r1, s1] = rt('kula'), [r2, s2] = rt('kula-ny'), ny = tt >= r2 - 1;   // ny: från att kritan kommer in för att rita den nya kulan
        let v = b.typ === 'vagga' ? 9 * Math.sin(2 * Math.PI * tl / 1.4) * mjuk(kl(Math.min(tl, b.d - tl) / 0.5)) : 0;
        for (const p of bitar) { const u = tt - p.t0 - (p.vid ?? 0.5); if (p.typ === 'putta' && u > 0) v -= 34 * sida * Math.sin(2 * Math.PI * u / 1.2) * Math.exp(-0.9 * u); }
        // kritan ritar kulan (rit 'kula' på sak-biten, sedan 'kula-ny'): snöret dras ner strax före, och kulan hänger stilla medan den ritas.
        // Den första faller (faller): när den landar spricker den (0,2 s: en vit spricka, lite hoptryckt mot snön), sedan far skärvorna isär i en låg båge
        const fall = kl((tt - TF) / 0.45) ** 2, kras = ny ? 0 : kl((tt - TF - 0.45) / 0.2), tryck = 0.14 * Math.sin(Math.PI * kras), stilla = ny ? tt < r2 + s2 + 1.2 : tt < r1 + s1 + 1.2;
        el('pendel').setAttribute('transform', `translate(${P0[0]} ${P0[1] + (ny ? 0 : FALL * fall)}) rotate(${(stilla ? 0 : v).toFixed(2)})`);
        el('pendel').setAttribute('opacity', ny || kras < 1 ? 1 : 0); el('k1').setAttribute('opacity', ny ? 0 : 1);
        el('spricka').setAttribute('opacity', kras > 0 && kras < 1 ? 1 : 0);
        const strang = kl((tt - (ny ? r2 : r1) + 0.6) / 0.4);
        el('snore').setAttribute('d', `M0 0 L0 ${((SN + R - 104) * strang).toFixed(1)}`); el('snore').setAttribute('opacity', strang > 0 && (ny || tt < TF) ? 1 : 0);
        el('boll').setAttribute('transform', kras > 0 ? `translate(0 ${SN + 2 * R}) scale(${1 + tryck} ${1 - tryck}) translate(0 ${-R})` : `translate(0 ${SN + R})`);
        // spaden (bakom granen): in från höger längs snön (1 s), lyfter (0,4 s), ut igen (1,2 s). När bladet har glidit in under en skärva ligger
        // den på bladet (kopian i spadens grupp) och åker med ut
        const XR = kant - this.plats[0] + 80, in_ = mjuk(kl(sp / 1.0)), blad = lerp(XR, bitar.find(q => q.spade != null)?.till ?? P0[0] - 190, in_), lyft = mjuk(kl((sp - 1.0) / 0.4));
        el('spade').setAttribute('transform', `translate(${lerp(blad, XR, mjuk(kl((sp - 1.4) / 1.2))).toFixed(1)} ${-36 * lyft}) rotate(${10 * lyft})`);
        const pa = el('spade').querySelectorAll('.last');
        el('skarvor').querySelectorAll(':scope > g').forEach((e, i) => { const [x, y, a] = SKARVOR[i], u = kl((tt - TF - 0.57) / 0.4), k = 1 - (1 - u) ** 2;
          const tagen = sp > 0 && blad <= P0[0] + x - 1.5 * PLATS(i), bort = bitar.some(q => q.tagna?.some(([v, j]) => j === i && tt >= q.t0 + v));   // tagna: [[sekunder, skärva nr]] = bärs bort (ting visar den)
          e.setAttribute('transform', `translate(${x * k} ${y - 50 * Math.sin(Math.PI * u)}) rotate(${a * k}) scale(${1.5 * Math.min(1, 3 * u)})`);
          e.setAttribute('opacity', tagen || bort || tt < TF ? 0 : 1); pa[i].setAttribute('opacity', tagen ? 1 : 0); }); } }; })(),
  // snögubben: på varje putta-bit ritar kritan en snöboll vid djuret (rit: [[sekunder, 'boll0' | 'boll1' | 'boll2', …]]), som puttas iväg vid bitens vid
  // och hoppar på plats (0,7 s). Platsen är där gubben står. I biten "sak" ritar kritan morotsnäsan (rit 'nos'), och kolögonen kommer när den fylls i.
  snogubbe: (() => { const R = [132, 102, 78], Y = [-114, -298, -444], FRAN = -150;
    return { plats: [370, 0], ser: [-60, -330], ritas: true,
      fram: `<ellipse id="sak-skugga" cy="8" rx="170" ry="26" fill="#7FA6C9" opacity="0"/>
        ${R.map((r, i) => `<g id="sak-boll${i}" transform="scale(0)">${ritbild('boll' + i, 'snoboll', 1024, 1024, [512, 512], r / 378, '#6FA3CC')}</g>`).join('')}
        <g id="sak-nasa" transform="translate(0 ${Y[2]})"><g id="sak-ogon"><circle cx="-27" cy="-20" r="10" fill="${KOL}"/><circle cx="25" cy="-20" r="10" fill="${KOL}"/></g>
          <circle id="sak-hal" cx="0" cy="8" r="9" fill="#6FA3CC" opacity="0"/>
          <g id="sak-nas">${ritbild('nos', 'morot', 1024, 572, [212, 293], 0.112, '#C0601A')}</g></g>`,
      rita(el, { tt, bitar }) {
        bitar.filter(b => b.typ === 'putta').slice(0, 3).forEach((b, i) => { const u = tt - b.t0, vid = b.vid ?? 0.5, k = kl((u - vid) / 0.7);
          el('boll' + i).setAttribute('transform', `translate(${lerp(FRAN, 0, mjuk(k)).toFixed(1)} ${(lerp(-R[i] + 14, Y[i], mjuk(k)) - (i ? 90 : 40) * Math.sin(Math.PI * k)).toFixed(1)}) scale(${u > 0 ? 1 : 0})`); });
        const forsta = bitar.find(b => b.typ === 'putta');   // skuggan på snön kommer när första bollen landar
        el('skugga').setAttribute('opacity', forsta ? 0.3 * kl((tt - forsta.t0 - (forsta.vid ?? 0.5) - 0.6) / 0.3) : 0);
        const nos = bitar.flatMap(b => (b.rit ?? []).filter(r => r[1] === 'nos').map(([v, , sek = 2.4]) => b.t0 + v + sek))[0] ?? 1e9;
        el('ogon').setAttribute('opacity', kl((tt - nos) / 0.4));
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
        <g transform="translate(${LX} 0)">${ljusrad(i => i * LJX)}</g>`,
      fram: `<g id="sak-paket"><clipPath id="sak-nalleklipp"><rect x="-400" y="-900" width="800" height="${900 - H + LOCK + 6}"/></clipPath>
          <g clip-path="url(#sak-nalleklipp)"><image id="sak-nalle" href="/assets/rekvisita/nalle/cut/nalle-framifran-v1-kanel.png" x="-175" y="0" width="350" height="350"/></g>
          <g transform="translate(0 8)">${bild('paket', 1024, 1024, [512, 831], 0.379, `<g transform="translate(0 -8)"><path d="${lada(-H + LOCK, 8)}" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round"/>
            <g filter="url(#sak-vax)"><path d="${lada(-H + LOCK, 8)}" fill="${ROD}"/><path d="M0 ${-H + LOCK} L0 8" stroke="${GUL}" stroke-width="40"/></g>${kontur(lada(-H + LOCK, 8))}</g>`)}</g>
          <g id="sak-lock"><g transform="translate(0 -200)">${bild('paketlock', 1024, 572, [512, 464], 0.36, `<g transform="translate(0 200)"><path d="${lada(-H, -H + LOCK)}" fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round" transform="scale(1.06 1)"/>
            <g filter="url(#sak-vax)"><path d="${lada(-H, -H + LOCK)}" fill="${ROD}" transform="scale(1.06 1)"/><path d="M0 ${-H} L0 ${-H + LOCK}" stroke="${GUL}" stroke-width="40"/></g><g transform="scale(1.06 1)">${kontur(lada(-H, -H + LOCK))}</g></g>`)}</g>
            <g transform="translate(0 -326)">${bild('rosett', 1024, 1024, [511.6, 458.1], 0.26)}</g></g></g>`,
      rita(el, { tt, bitar }) { const tid = n => { const p = bitar.find(p => p[n] != null); return p ? p.t0 + p[n] : 1e9; };
        [0, 1, 2, 3].forEach(i => el('laga' + i).setAttribute('transform', `translate(${i * LJX} ${VEKE})`));   // alla fyra brinner
        const sk = bitar.flatMap(b => (b.skramlar ?? []).map(v => tt - b.t0 - v)).find(u => u > 0 && u < 0.9), o = tt - tid('oppnas'), ok = kl(o / 0.6), flyg = 1 - (1 - ok) ** 2;
        el('paket').setAttribute('transform', `rotate(${sk ? 5 * Math.sin(2 * Math.PI * sk / 0.3) * Math.sin(Math.PI * sk / 0.9) : 0} 0 0)`);
        // locket poppar upp i en båge och lägger sig på snön framför lådan, lite till vänster; nallen kommer upp ur lådan (0,4–1,2 s)
        // lock: [[sekunder, höjd px], …] på bitar = locket lyfts en bit i taget och blir sittande där (en liten skakning när det rycker), tills det poppar av (oppnas)
        const LK = bitar.flatMap(b => (b.lock ?? []).map(([v, h]) => [b.t0 + v, h])), la = LK.findLastIndex(k => tt >= k[0]), lh = la < 0 ? 0 : LK[la + 1] ? lerp(LK[la][1], LK[la + 1][1], mjuk(kl((tt - LK[la][0]) / (LK[la + 1][0] - LK[la][0])))) : LK[la][1];
        el('lock').setAttribute('transform', o > 0 ? `translate(${-235 * flyg} ${(H + 40) * flyg - 300 * Math.sin(Math.PI * ok)}) rotate(${-12 * flyg} 0 ${-H})` : lh ? `translate(0 ${-lh}) rotate(${2 * Math.sin(tt * 40) * (la >= 0 && LK[la + 1] && tt - LK[la][0] < 0.8 ? 1 : 0)} 0 ${-H})` : '');
        el('nalle').setAttribute('y', lerp(-H + LOCK + 20, -H - 250, mjuk(kl((o - 0.4) / 0.8))));
        const gl = tt - tid('glans'), puls = gl > 0 ? mjuk(kl(gl / 0.5)) * (0.5 + 0.5 * Math.sin(2 * Math.PI * gl / 1.3)) : 0;
        el('stralar').setAttribute('opacity', (0.25 + 0.75 * puls) * mjuk(kl(gl / 0.5))); } }; })(),
};

// Inne (plats): sovrummets runda fönster (mått från 026, sovrummet-v1.jpeg i 1920 × 1080) med kvällshimmel och månen, en fönsterruta som slås upp
// (fonster på bitar), gardinerna från 026 över fönstret, kvällens slöja och lampans varma sken (lampan till höger i sovrummet)
const FONSTER = { cx: 552, cy: 321, r: 173 }, A = '/assets/';
const rummet = (g, VW, VH) => { const { cx, cy, r } = FONSTER, ri = r - 14;
  const fonster = g.fonster ? `<clipPath id="fonsterklipp"><circle cx="${cx}" cy="${cy}" r="${ri}"/></clipPath><g clip-path="url(#fonsterklipp)">
      <rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#26386E"/>
      <image href="${A}bakgrunder/appeltradet-natt/mane.png" x="${cx + 10}" y="${cy - 118}" width="104" height="113"/>
      ${[[-90, -60, 5], [-40, -110, 4], [-110, 30, 4], [30, 70, 5], [-30, 10, 3]].map(([x, y, rr]) => `<circle cx="${cx + x}" cy="${cy + y}" r="${rr}" fill="#FFF3C4"/>`).join('')}
      <g id="ruta"><circle cx="${cx}" cy="${cy}" r="${ri}" fill="#BFDDF0" opacity=".4"/><path d="M${cx - ri} ${cy} H${cx + ri} M${cx} ${cy - ri} V${cy + ri}" stroke="#F7F1E6" stroke-width="12"/>
        <circle cx="${cx}" cy="${cy}" r="${ri}" fill="none" stroke="#F7F1E6" stroke-width="10"/></g></g>
    <g id="gardin" transform="translate(${cx} ${cy - r - 25}) scale(0.393) translate(-657 -58)"><image href="${A}rekvisita/gardiner/cut/gardiner.png" width="1314" height="695"/></g>` : '';
  return fonster + (g.kvall ? `<rect width="${VW}" height="${VH}" fill="#1E2550" opacity=".34"/>${g.plats === 'sovrummet' ? `<circle cx="1795" cy="600" r="320" fill="url(#sak-sken)" opacity=".6"/>` : ''}` : ''); };

async function kor(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const STA = new URLSearchParams(location.search).has('staende'), render = navigator.webdriver, SK = g.skala ?? 0.95;
  // bilden och scenen: E = scenens skala, MARK = marken (stående: ovanför YouTubes knappar), KANT och TAK = bildens kant och överkant i scenens mått
  // Djuret står på Vinterkullens bild (PLAT: dag eller kväll; liggande med fötterna på 80 % av höjden, stående på y 1400, ovanför
  // YouTubes knappar); bara backen (lucka 5) ritas i kod
  // plats: 'koket' | 'sovrummet' | 'hallen' = inne (assets/bakgrunder/<plats>/<plats>-v1.jpeg), ingen snö; fötterna mitt på golvet (väggen slutar vid 75 %).
  // kvall inne = rummet mörkare (ingen egen kvällsbild); varmt ljus får saken stå för
  const INNE = g.plats && `/assets/bakgrunder/${g.plats}/${g.plats}-v1.jpeg`, BACKE = g.backe ?? 0, PLAT = INNE || !BACKE && lucka.KULLE(g.kvall);
  const [VW, VH] = STA ? [1080, 1920] : [1920, 1080], E = STA ? g.staScen ?? 1 : g.vid?.[0] ?? 0.82, MARK = STA ? 1400 : g.vid?.[1] ?? (PLAT ? 864 : 925), KANT = VW / 2 / E, TAK = -MARK / E;
  const SCEN = `transform="translate(${VW / 2} ${MARK}) scale(${E})"`, GX = g.x ?? 0, SNO = PLAT ? (g.kvall ? '#D3E0F5' : '#F7F3EA') : g.kvall ? '#E3EAF5' : '#fff';
  const SAK = g.sak && { ...SAKER[g.sak], ...(g.sakPlats && { plats: g.sakPlats }) };
  if (g.storGran && SAK?.bak) SAK.bak = SAK.bak.replace(granen, storGran(g.storGran));
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
  const flingBild = (kod, s = 55 / 437) => bild('snoflinga', 1024, 1024, [512, 512], s, `<g fill="none" stroke-linecap="round" stroke-linejoin="round">${kod}</g>`);   // snoflinga.png: mitten (512, 512), radie 437
  const storFlinga = `<g id="stor-flinga" opacity="0">${flingBild(`<g stroke="#8FBBDA" stroke-width="17">${arm}</g><g stroke="#fff" stroke-width="9">${arm}</g>`)}</g>`;
  document.body.innerHTML = `<svg viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg"><defs>
      <filter id="boil" filterUnits="userSpaceOnUse" x="0" y="0" width="${VW}" height="${VH}">
        <feTurbulence id="boil-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
        <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>
      <filter id="kula-gul"><feColorMatrix type="matrix" values="1.08 0 0 0 0  0.85 0.12 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>
      <filter id="kritskugga" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="10" dy="16" stdDeviation="7" flood-color="#7a4a3a" flood-opacity="0.22"/></filter>
      <radialGradient id="sak-sken"><stop offset="0" stop-color="#FFD76A" stop-opacity=".7"/><stop offset=".45" stop-color="#FFB84A" stop-opacity=".32"/><stop offset="1" stop-color="#FFA63C" stop-opacity="0"/></radialGradient>
      ${skarvDefs}${SAK?.ruta ? lucka.vax('sak-vax', ...SAK.ruta) : ''}${SAK?.ruta2 ? lucka.vax('sak-vax2', ...SAK.ruta2) : ''}</defs>
    <g id="kamera">${PLAT ? `<image href="${PLAT}" width="${VW}" height="${VH}" preserveAspectRatio="xMidYMid slice"/>${INNE ? rummet(g, VW, VH) : ''}`
      : `<rect width="${VW}" height="${VH}" fill="${g.kvall ? '#263A6B' : '#CFE3F0'}"/>${g.kvall ? `<g ${SCEN}>${kulle('#CBD7EA')}</g>` : ''}`}
    <g filter="url(#lucka-vax)">${INNE ? '' : flingor}${PLAT ? '' : `<g ${SCEN}>${kulle(SNO)}</g>`}</g>
    <g filter="url(#boil)"><g ${SCEN}>${lager('bak')}<g id="akare">${lager('bak', 1)}<g id="djur"></g>${lager('fram', 1)}</g>${lager('fram')}<g id="tingbak"></g><g id="gaster"></g><g id="ting"></g><g id="puff"></g><g id="ritlager">${kritaGrupp('rit')}</g></g></g>
    <g ${SCEN}>${storFlinga}</g></g></svg>`;
  await Promise.all([PLAT, ...(INNE && g.fonster ? [A + 'bakgrunder/appeltradet-natt/mane.png', A + 'rekvisita/gardiner/cut/gardiner.png'] : []),
    ...(g.storGran ? [A + 'rekvisita/julgran/cut/julgran-kladd.png', A + 'rekvisita/stjarna-gul/cut/stjarna-gul.png'] : [])].filter(Boolean).map(lucka.bild));
  const svg = document.querySelector('svg'), F = await v2rigg(g.figur), fig = F.figur(0, 0, SK, svg.querySelector('#djur'));
  if (SAK?.iFigur) fig.querySelector('.figuren').insertAdjacentHTML('beforeend', `<g transform="translate(${SAK.plats})">${SAK.fram}</g>`);   // saken sitter på figuren
  // gästerna: egna riggar i scenen, utanför bild tills de kommer in
  const GASTER = await Promise.all((g.gaster ?? []).map(async ([figur, x, sk = SK, hand = 1], i) => { const R = await v2rigg(figur);
    svg.querySelector('#gaster').insertAdjacentHTML('beforeend', '<g></g>'); const hall = svg.querySelector('#gaster').lastChild;
    return { R, x, sk, hand, mot: -Math.sign(x) || 1, hall, fig: R.figur(0, 0, sk, hall), blinka: skapaBlinka(7 + 3 * i), glad: R.blanda('neutral', 'glad', 1) }; }));
  // tomteluvor (lucka 23): hattar: [[vem (-1 = huvudfiguren, annars gästens nummer), id, x, y, skala, grader], …] i figurens 1024-ruta, brättets
  // nederkant (450, 840 i tomteluva.png) i (x, y), på huvudet framför öronen (följer kroppen). Kritan kan rita en (rit: [[sekunder, id, …]]).
  // luva: [[sekunder, px], …] på bitar = huvudfigurens luva glider ner så många px (över ögonen) och upp igen
  for (const [vem, id, x, y, s, rot = 0] of g.hattar ?? []) { const f = vem < 0 ? fig : GASTER[vem].fig;
    (f.querySelector('.kropp') ?? f.querySelector('.figuren')).insertAdjacentHTML('beforeend', `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${vem < 0 ? 'luva-ner' : ''}">${ritbild(id, 'tomteluva', 1024, 1024, [450, 840], s, '#9E2A22')}</g></g>`); }
  // vinterjackor utomhus (Sanna 2026-11-12): jacka: 'färg' (huvudfiguren), jackor: { gästnr: 'färg' }. Jackan ritas i kod som tröjan i
  // verktyg/rigg-motor.js (kladIn): kroppsbilden (krympt innanför den vita kanten) som mask, från halsen (under munnen) och ner, i .kropp så att
  // den följer kroppen; en mörkare krage, dragkedja och fåll, med kritkorn. Ärmarna har armbildernas form utom tassen och följer varje armkopia.
  const JMATT = { 'grisen-greta': { hals: 560, hand: [[184, 650], [832, 650]] }, 'lammet-ludde': { hals: 548, hand: [[134, 652], [882, 645]] },
    'hunden-hugo': { hals: 540, hand: [[180, 622], [840, 616]] }, 'bjornen-bulle': { hals: 552, hand: [[212, 606], [812, 606]] },
    'leoparden-lova': { hals: 560, hand: [[176, 648], [844, 648]] } };
  const morkare = (h, k = 0.72) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('');
  const JACKOR = [];
  const jackaIn = (f, figur, farg) => { const M = JMATT[figur]; if (!M || !farg) return; const id = 'jacka' + JACKOR.length, mork = morkare(farg), H = M.hals;
    const kr = f.querySelector('.kropp'), ki = [...kr.querySelectorAll('image')].find(i => /body|kropp/.test(i.getAttribute('href'))) ?? kr.querySelector('image'), kb = ki.getAttribute('href'), r = 10;   // kroppens bild (hunden har svansen först)
    const mask = (n, href) => `<mask id="${id}-${n}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style="mask-type:alpha"><image href="${href}" width="1024" height="1024" filter="url(#${id}-krymp)"/></mask>`;
    const hals = `M0 ${H - 40} Q512 ${H + 46} 1024 ${H - 40}`;
    ki.insertAdjacentHTML('afterend', `<g class="jacka">${lucka.vax(id + '-vax', -60, -60, 1144, 1144)}<filter id="${id}-krymp"><feMorphology operator="erode" radius="${r}"/></filter>${mask('kropp', kb)}
      <clipPath id="${id}-form"><path d="${hals} V1024 H0Z"/></clipPath><g mask="url(#${id}-kropp)"><g clip-path="url(#${id}-form)" filter="url(#${id}-vax)">
      <rect width="1024" height="1024" fill="${farg}"/><path d="M512 ${H + 10} V1024" stroke="${mork}" stroke-width="16"/>
      ${[H + 90, H + 170, H + 250].map(y => `<circle cx="512" cy="${y}" r="9" fill="#fff" opacity="0.85"/>`).join('')}
      <path d="${hals}" fill="none" stroke="${mork}" stroke-width="44"/><rect y="790" width="1024" height="60" fill="${mork}"/></g></g></g>`);
    const fig0 = f.querySelector('.figuren') ?? f, armar = [];
    ['l', 'r'].forEach((n, i) => fig0.querySelectorAll(':scope > .arm-' + n + ', :scope > .arm-' + n + '2').forEach((a, j) => { const m = `arm-${n}${j}`, [hx, hy] = M.hand[i], hr = 46;
      a.insertAdjacentHTML('afterend', `<g class="jacka-arm">${mask(m, a.getAttribute('href'))}
        <clipPath id="${id}-${m}-c"><path d="M0 0H1024V1024H0Z M${hx - hr} ${hy} a${hr} ${hr} 0 1 0 ${2 * hr} 0 a${hr} ${hr} 0 1 0 ${-2 * hr} 0Z" clip-rule="evenodd"/></clipPath>
        <g clip-path="url(#${id}-${m}-c)"><g mask="url(#${id}-${m})" filter="url(#${id}-vax)"><rect width="1024" height="1024" fill="${farg}"/>
        <circle cx="${hx}" cy="${hy}" r="${hr + 22}" fill="none" stroke="${mork}" stroke-width="30"/></g></g></g>`); armar.push([a, a.nextElementSibling]); }));
    JACKOR.push(() => armar.forEach(([a, g]) => { g.setAttribute('transform', a.getAttribute('transform') || ''); const o = a.getAttribute('opacity') ?? 1, d = a.getAttribute('display') ?? a.style.display;
      g.setAttribute('opacity', o); g.setAttribute('display', d === 'none' ? 'none' : 'inline'); })); };
  jackaIn(fig, g.figur, g.jacka); GASTER.forEach((G, i) => jackaIn(G.fig, g.gaster[i][0], g.jackor?.[i]));
  // julpynt på huvudfiguren (lucka 2): pynt: [[id, bild, [ax, ay], x, y, skala, grader], …] = rekvisitabilder (assets/rekvisita/<bild>/cut/<bild>.png, 1024-ruta)
  // med ankarpunkten (ax, ay) i (x, y) i figurens 1024-ruta (följer kroppen). Alla är dolda; pynt: 'id' (eller null) på en bit visar det pyntet från bitens början.
  for (const [id, bild, ank, x, y, s, rot = 0] of g.pynt ?? []) (fig.querySelector('.kropp') ?? fig.querySelector('.figuren')).insertAdjacentHTML('beforeend',
    `<g class="pynt" data-pynt="${id}" opacity="0" transform="translate(${x} ${y}) rotate(${rot})">${ritbild('pynt-' + id, bild, 1024, 1024, ank, s, '#9E2A22')}</g>`);
  const K = await lucka.bygg(svg, g.lucka, { kvall: g.kvall, ...(g.pekare && { pekare: g.pekare }), ...(g.slut && { slut: g.slut }), ...(g.badd && { badd: g.badd }) }), blinka = skapaBlinka(11);

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
    // sömnig (har sovit): halvslutna ögon, gungar långsamt; vaknar: o.vid = sekunder in då den vaknar och blir glad med ett litet hopp
    somnig: (tl, d, G) => { const w = Math.sin(tl * 1.4); return [G.R.blanda('neutral', 'somnig', 1), GP(G, { luta: 1.5 * w, boj: 2 * w })]; },
    vaknar: (tl, d, G, i, o = {}) => { const v = o.vid ?? 0.5; if (tl < v) return GROR.somnig(tl, d, G);
      const [, p] = G.R.ROR.hoppa(Math.min(tl - v, 2.39)); return [G.R.blanda('neutral', tl - v < 1.6 ? 'jatteglad' : 'glad', 1), p]; },
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
      return [F.ROR.skratta ? F.ROR.skratta(tl)[0] : F.blanda('glad', 'fnissig', 1), P({ luta: 4 * s, boj: 4 * s, lyft: -5 * Math.abs(s) }), [(b.flytt ?? -90) * u, 0]]; },
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
    // knackar på dörren till höger: vid = [sekunder, …] (ett knack var), armen närmast dörren uppe och lutar sig mot den
    knacka: (tl, d, b) => { const V = b.vid ?? [], uppe = mjuk(kl(Math.min((tl - V[0] + 0.6) / 0.4, (V.at(-1) + 0.7 - tl) / 0.4))), k = Math.max(0, ...V.map(v => bump(tl, v, 0.3)));
      return [{ ...glad, titt: [7 * uppe, 0] }, P({ rikt: 0.5 * uppe, armar: [0, (70 + 16 * k) * uppe], luta: 2 * uppe, boj: 4 * uppe + 3 * k, x: 20 * uppe / SK })]; },
    // skjuter upp luvan: armarna upp mot huvudet kring vid (sekunder in), fnissande
    luvaupp: (tl, d, b) => { const k = bump(tl, b.vid ?? 1, 1.4); return [F.blanda('neutral', 'fnissig', 1), P({ armar: [100 * k, 100 * k], strack: 0.02 * k, lyft: -4 * k })]; },
    // sjunger: gungar lugnt i takten (100 BPM, 0,6 s), och munnen öppnas på varje slag (hela ansikten: glad och jätteglad)
    sjunga: (tl, d, b) => { const [T, fas] = b.takt ?? [0.6, 0], k = (tl - fas) / T, s = Math.sin(2 * Math.PI * k / 4);   // takt: [sekunder per slag, ett slag i biten]: munnen öppen första halvan av varje slag, gungar på fyra slag
      return [F.blanda('neutral', ((k % 1) + 1) % 1 < 0.5 ? 'jatteglad' : 'glad', 1), P({ luta: 2 * s, boj: 5 * s, oron: [5 * s, -5 * s] })]; },
    tittar: () => ser, oj: () => [F.blanda('neutral', 'forvanad', 1), ser[1]],   // oj: förvånad, rycker till
    nyfiken: () => [{ ...F.blanda('neutral', 'nyfiken', 1), titt, luta: 1.5 * SIDA }, { ...ser[1], boj: 4.5 * SIDA }],   // böjer sig nyfiket mot saken
    sak: (tl, d, b) => { const fy = b.rit ? b.rit[0][0] + (b.rit[0][2] ?? 2.4) : 0.9;   // förvånad när saken poppar fram, sedan glad; ritas den: nyfiken medan kritan ritar, glad när bilden fylls i
      return [{ ...F.blanda(b.rit ? 'nyfiken' : 'forvanad', 'glad', mjuk(kl((tl - fy) / 0.3))), titt }, ser[1]]; },
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
  const DURATION = K.slut(t), SNOAR = g.snoa ? -60 : BITAR.find(b => b.typ === 'snoar')?.t0, FART = g.snoa ? 0.32 : 1, FL = [...svg.querySelectorAll('.flinga')], stor = svg.querySelector('#stor-flinga');
  // Ting i steg (M2): ting: { namn: [[sekunder, x, y, skala, opacitet, grader, följer, gästföljer], …] } på en bit. Nycklarna från alla bitar läggs i tidsordning och tinget
  // glider mjukt mellan dem (osynligt före den första, kvar efter den sista). x, y i scenens mått från marken under djuret; följer 1 = följer
  // med huvudfiguren (dess flytt och hopp). Formerna står i TINGRIT. Puffar (blåsning): puff: [[sekunder, x, y, riktning ±1]] på en bit.
  // flinga: snoflinga.png, mitten vid (0, 0), radie 62; kritan kan rita den (rit: [[sekunder, 'flinga', …]], annars syns den direkt)
  const TINGRIT = { flinga: ritbild('__ID__', 'snoflinga', 1024, 1024, [512, 512], 62 / 437, '#8FBBDA'),
    // en gran (gran, foten vid (0, 0)) och en morot med spetsen åt höger (morot, mitten vid (0, 0))
    gran: `<image href="/assets/bakgrunder/skogen-gron-saker/gran.png" x="${-448 * 0.72}" y="${-1136 * 0.72 + 8}" width="${896 * 0.72}" height="${1200 * 0.72}"/>`,   // skogens gran, som i lucka 1, 22 och 24
    morot: bild('morot', 1024, 572, [559, 289], 0.204, `<path d="M-60 -16 L78 0 L-60 16 Z" fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round"/><path d="M-60 -16 L78 0 L-60 16 Z" fill="#F08A24" stroke="#F08A24" stroke-width="4" stroke-linejoin="round"/><path d="M-60 0 L-96 -14 M-60 0 L-100 2 M-60 0 L-94 16" stroke="${GRON}" stroke-width="9" stroke-linecap="round" fill="none"/>`),
    // en isfläck på marken (is, mitten vid (0, 0))
    is: `<ellipse cy="6" rx="330" ry="34" fill="#fff" stroke="#fff" stroke-width="12"/><ellipse cy="6" rx="330" ry="34" fill="#BFE1F2" stroke="#8FBBDA" stroke-width="8"/><path d="M-190 -6 Q-120 -20 -50 -8 M60 8 Q130 -2 200 6" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".85"/>`,
    // paket.png (botten (512, 831) vid foten, 96 px brett); paketg har dessutom rosett.png på locket (knuten på överkantens mitt)
    paket: bild('paket', 1024, 1024, [512, 831], 0.121, `<rect x="-48" y="-72" width="96" height="72" rx="6" fill="#fff" stroke="#fff" stroke-width="14"/><rect x="-48" y="-72" width="96" height="72" rx="6" fill="${ROD}" stroke="#2A2421" stroke-width="5"/><path d="M0 -72 L0 0 M-48 -36 L48 -36" stroke="${GUL}" stroke-width="16"/>`),
    paketg: `${bild('paket', 1024, 1024, [512, 831], 0.121, `<rect x="-48" y="-72" width="96" height="72" rx="6" fill="#fff" stroke="#fff" stroke-width="14"/><rect x="-48" y="-72" width="96" height="72" rx="6" fill="${GRON}" stroke="#2A2421" stroke-width="5"/><path d="M0 -72 L0 0 M-48 -36 L48 -36" stroke="${GUL}" stroke-width="16"/>`)}<g transform="translate(0 -76)">${bild('rosett', 1024, 1024, [511.6, 458.1], 0.083)}</g>`,
    // en julkula, röd (kula) eller gul (kulag), mitten vid (0, 0)
    kula: kulan(ROD, 40).replace('<g filter="url(#sak-vax)">', '<g>'), kulag: kulan(GUL, 40).replace('<g filter="url(#sak-vax)">', '<g>'),   // utan kritkorn (kornfiltret gäller bara sakens egen ruta)
    // en skimrande stjärna (glans), en röd skärva av en julkula (skarva), och spaden med bladet vid (0, 0) (spade)
    glans: `<path d="M0 -44 Q4 -4 44 0 Q4 4 0 44 Q-4 4 -44 0 Q-4 -4 0 -44 Z" fill="${GUL}" stroke="#fff" stroke-width="8" stroke-linejoin="round" paint-order="stroke"/>`,
    skarva: `<use href="#skarvbit-__ID__"/>`,
    spade: SPADE,
    // grisens dörr (rekvisita/dorr.md), stängd (dorr) och öppen (dorroppen): bilderna ligger exakt på varandra, trappsteget (512, 880) vid (0, 0)
    dorr: `<image href="/assets/rekvisita/dorr/cut/dorr.png" width="1024" height="1024" transform="translate(-512 -880)"/>`,
    dorroppen: `<image href="/assets/rekvisita/dorr/cut/dorr-oppen.png" width="1024" height="1024" transform="translate(-512 -880)"/>`,
    // den gula hinken (hink-gul), hörnet nere till höger vid (0, 0) så att den tippar åt höger kring det; kritan ritar den (rit: [[sekunder, 'hink', …]])
    hink: ritbild('__ID__', 'hink-gul', 1458, 1817, [1150, 1770], 1, '#C9961E') };
  Object.assign(TINGRIT, g.tingrit);   // tingrit: { namn: svg } = luckans egna ting (lucka 3 och 4), med julDjur.ritbild/bild för rekvisitabilder
  // sand: stro: [[sekunder, x, y, landar från x, landar till x, bågens höjd = 380], …] på en bit = 16 sandkorn far i en båge från (x, y) och blir liggande prickigt på marken
  const STRO = BITAR.flatMap(b => (b.stro ?? []).map(([v, x, y, a, c, h = 380]) => ({ t: b.t0 + v, x, y, a, c, h })));
  const KORN = STRO.flatMap((q, k) => Array.from({ length: 16 }, (_, j) => ({ ...q, t: q.t + 0.04 * j, mx: lerp(q.a, q.c, slumpK(k * 31 + j)), my: 4 + 22 * slumpK(k * 17 + j + 5) - 11, r: 5 + 3 * slumpK(k * 7 + j) })));
  const TING = {}, PUFFAR = BITAR.flatMap(b => (b.puff ?? []).map(([s, x, y, rik = 1, v = 330]) => ({ t: b.t0 + s, x, y, rik, v })));
  for (const b of BITAR) for (const [n, ny] of Object.entries(b.ting ?? {})) { if (!TINGRIT[n.replace(/^bak_/, '').replace(/\d+$/, '')]) throw new Error(`tinget "${n}" finns inte i djur.js`);
    for (const [s, x = 0, y = 0, sk = 1, op = 1, rot = 0, folj = 0, gfolj = 0] of ny) (TING[n] ??= []).push([b.t0 + s, x, y, sk, op, rot, folj, gfolj]); }
  Object.entries(TING).forEach(([n, a]) => { a.sort((u, v) => u[0] - v[0]); svg.querySelector(n.startsWith('bak_') ? '#tingbak' : '#ting').insertAdjacentHTML('beforeend', `<g id="ting-${n}" opacity="0">${TINGRIT[n.replace(/^bak_/, '').replace(/\d+$/, '')].replaceAll('__ID__', n)}</g>`); });
  // ritningarna (ritbild): konturerna läses in, varje bild klipps av en egen cirkel; RIT = när de ritas
  const RITBAR = [...svg.querySelectorAll('.ritbar')], KONT = {};
  await Promise.all([...new Set(RITBAR.map(e => e.dataset.namn))].map(async n => { KONT[n] = await (await fetch(`/assets/rekvisita/${n}/cut/${n}-kontur.json`)).json(); }));
  RITBAR.forEach((e, i) => { const j = KONT[e.dataset.namn], [x, y, w, h] = j.bbox, k = e.querySelector('.ritkontur');
    e.insertAdjacentHTML('afterbegin', `<clipPath id="ritk-${i}"><circle cx="${x + w / 2}" cy="${y + h / 2}" r="0"/></clipPath>`); e.querySelector('image').setAttribute('clip-path', `url(#ritk-${i})`);
    k.setAttribute('d', j.d); e.R = { cirkel: e.querySelector('clipPath circle'), kontur: k, L: k.getTotalLength(), radie: Math.hypot(w, h) / 2 + 4 }; k.setAttribute('stroke-dasharray', e.R.L); });
  const RIT = BITAR.flatMap(b => (b.rit ?? []).map(([v, id, sek = 2.4]) => ({ t0: b.t0 + v, id, sek, e: RITBAR.find(e => e.dataset.id === id) }))).sort((a, c) => a.t0 - c.t0);
  for (const r of RIT) if (!r.e) throw new Error(`rit: "${r.id}" finns inte`);
  const BUSIG = BITAR.filter(b => b.busig).map(b => ({ t0: b.t0 + b.busig[0], x: b.busig[1], y: b.busig[2] }));   // busig: [sekunder, x, y] på en bit
  const KP = svg.querySelector('#ritlager'), rk = svg.querySelector('#rit-krita'), rsm = svg.querySelector('#rit-smulor');
  const punkt = (e, k) => { const R = e.R, c = R.kontur.getPointAtLength(R.L * kl(k)).matrixTransform(R.kontur.getCTM()).matrixTransform(KP.getCTM().inverse()); return [c.x, c.y]; };
  const ritaRit = tt => {
    for (const e of RITBAR) { const R = e.R, ev = RIT.filter(r => r.e === e), r = ev.filter(r => tt >= r.t0 - 1.2).at(-1);
      if (!r) { R.cirkel.setAttribute('r', !ev.length && !e.dataset.dold ? R.radie : 0); R.kontur.setAttribute('opacity', 0); continue; }
      const k = kl((tt - r.t0) / r.sek), m = R.kontur.getCTM();
      R.cirkel.setAttribute('r', (R.radie * mjuk(kl((tt - r.t0 - r.sek) / 1.2))).toFixed(1));
      R.kontur.setAttribute('stroke-dashoffset', (R.L * (1 - k)).toFixed(1)); R.kontur.setAttribute('stroke-width', (6.5 / Math.hypot(m.a, m.b)).toFixed(2));   // ca 6,5 px i bild
      R.kontur.setAttribute('opacity', k > 0 ? (1 - mjuk(kl((tt - r.t0 - r.sek - 0.5) / 0.7))).toFixed(3) : 0); }
    // kritan: in uppifrån (1 s, fort först) till konturens början, följer konturen medan den ritas, och ut igen (0,2 s efter, på 1 s)
    const q = RIT.filter(r => tt >= r.t0 - 1.0 && tt <= r.t0 + r.sek + 1.2).at(-1); let p = null, vrid = 0;
    if (q) { const s0 = punkt(q.e, 0), UT = [s0[0] + 420, TAK - 160], u = tt - q.t0;
      p = u < 0 ? s0.map((v, j) => lerp(UT[j], v, 1 - (1 - kl(u + 1)) ** 2)) : u <= q.sek ? punkt(q.e, u / q.sek) : punkt(q.e, 1).map((v, j) => lerp(v, UT[j], mjuk(kl((u - q.sek - 0.2) / 1.0)))); }
    // busig: kritan kommer in till punkten, vickar fnissande kring spetsen (±8°, tre gånger på 1 s, små skutt, som rita.js) och åker ut igen
    const bq = !q && BUSIG.find(b => tt >= b.t0 - 1.0 && tt <= b.t0 + 2.3);
    if (bq) { const s0 = [bq.x, bq.y], UT = [s0[0] + 420, TAK - 160], u = tt - bq.t0, bu = u >= 0 && u < 1 ? u : 0, fniss = Math.sin(Math.PI * bu);
      p = u < 0 ? s0.map((v, j) => lerp(UT[j], v, 1 - (1 - kl(u + 1)) ** 2)) : s0.map((v, j) => lerp(v, UT[j], mjuk(kl((u - 1.3) / 1.0))));
      p[1] -= 12 * fniss * Math.abs(Math.sin(3 * Math.PI * bu)); vrid = 8 * fniss * Math.sin(6 * Math.PI * bu); }
    rk.setAttribute('display', p ? '' : 'none'); if (p) rk.setAttribute('transform', `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${vrid.toFixed(2)})`);
    rsm.innerHTML = q && tt >= q.t0 && tt <= q.t0 + q.sek ? kritSmulor(p, tt) : ''; };   // bak_…: bakom gästerna
  svg.querySelector('#ting').insertAdjacentHTML('beforeend', `<g id="sand">${KORN.map(q => `<circle r="${q.r.toFixed(1)}" fill="#C9A46A" stroke="#A9834A" stroke-width="2.5" opacity="0"/>`).join('')}</g>`);
  const SANDK = [...svg.querySelectorAll('#sand circle')];
  svg.querySelector('#puff').innerHTML = PUFFAR.map((_, i) => `<g id="puff-${i}" opacity="0" fill="none" stroke-linecap="round">${[0, 1, 2].map(k =>
    `<g transform="translate(${k * 38} 0)"><path d="M0 -${30 - 6 * k} Q${18 - 3 * k} 0 0 ${30 - 6 * k}" stroke="#9CC3DE" stroke-width="15"/><path d="M0 -${30 - 6 * k} Q${18 - 3 * k} 0 0 ${30 - 6 * k}" stroke="#fff" stroke-width="8"/></g>`).join('')}</g>`).join('');
  const nyckel = (a, tt) => { if (tt <= a[0][0]) return [...a[0].slice(1, 3), a[0][3], 0, ...a[0].slice(5)];   // före den första nyckeln: osynlig
    const i = a.findLastIndex(k => tt >= k[0]), k0 = a[i], k1 = a[i + 1]; if (!k1) return k0.slice(1);
    const u = mjuk(kl((tt - k0[0]) / (k1[0] - k0[0]))); return k0.slice(1).map((v, j) => lerp(v, k1[j + 1], u)); };
  const LUVA = BITAR.flatMap(b => (b.luva ?? []).map(([v, y]) => [b.t0 + v, y]));
  const FON = g.fonster ? BITAR.flatMap(b => (b.fonster ?? []).map(([v, o]) => [b.t0 + v, o])) : [];   // fonster: [[sekunder, 1 = öppna | 0 = stäng]]
  const TINDRA = [...svg.querySelectorAll('.tindra')];
  const PYNT = BITAR.filter(b => b.pynt !== undefined).map(b => [b.t0, b.pynt]), PYNTEL = [...svg.querySelectorAll('.pynt')];
  const T2 = BITAR.find(b => b.snomycket)?.t0, FL2 = [...svg.querySelectorAll('.flinga2')];
  const SAKT = (BITAR.find(b => b.typ === 'sak')?.t0 ?? -9) + 0.15, SITT = SAK?.ritas && RIT[0] ? RIT[0].t0 + RIT[0].sek + 1.2 : SAKT + 0.7, sitt = tt => mjuk(kl((tt - SITT) / 0.5)), akare = svg.querySelector('#akare'), el = n => svg.querySelector('#sak-' + n);
  if (SNOAR !== undefined) FL.forEach(c => c.setAttribute('cy', -60));   // ingen snö i luften förrän det börjar snöa
  const lage = tt => {   // [ansikte, pose, luckans stängning, biten, sekunder in i den, flytt] vid tiden tt
    const i = Math.max(0, BITAR.findLastIndex(b => tt >= b.t0)), b = BITAR[i], tl = kl(tt - b.t0, 0, b.d), fore = BITAR[i - 1];
    // bitens eget ansikte (uttryck); skrattar och gratar är riggens slingor (munnen skrattar, tårarna rinner), resten står still
    const gor = (b, tl) => { const [f, p, [fx, fy] = [0, 0]] = b.fn(tl, b.d, b), fl = [fx + b.gatt, fy], lp = F.ROR[{ skrattar: 'skratta', gratar: 'grata' }[b.uttryck]];
      const u = lp ? lp(tl)[0] : b.uttryck ? { ...F.blanda('neutral', b.uttryck, 1), titt: f.titt } : f;
      return [b.ser ? { ...u, titt: b.ser === true ? titt : blick(b.ser) } : u, p, fl]; };
    let [f, p, fl] = gor(b, tl);
    if (fore && tl < 0.4) { const [f0, p0, fl0] = gor(fore, fore.d), k = mjuk(tl / 0.4);
      f = F.blanda(f0, f, k); p = F.blandaPose(p0, p, k); fl = fl.map((v, j) => lerp(fl0[j], v, k)); }
    // medan djuret står och väntar (stilla) lever det: blicken går åt sidan en stund, tyngden flyttas, ett öra vippar (riggens vila)
    if (b.typ === 'stilla') { const [fv, pv] = F.vila(f, p, tt), w = mjuk(kl(Math.min(tl, b.d - tl) / 0.4)); f = F.blanda(f, fv, w); p = F.blandaPose(p, pv, w); }
    // sitter i saken (pulkan) från strax efter att den har poppat fram (ritas den: när bilden är ifylld): benen ut och kroppen ner (sate: upp på sitsen, med ett litet hopp)
    if (SAK?.med) { const S = F.POSER.sitter, k = sitt(tt); p = F.blandaPose(p, { ...p, ben: S.ben, benY: S.benY, sank: S.sank, lyft: (p.lyft ?? 0) + (SAK.sate ?? 0) }, k);
      if (SAK.sate) p = { ...p, lyft: (p.lyft ?? 0) - 50 * Math.sin(Math.PI * k) }; }
    // backe: djuret (och pulkan) står alltid på backens linje (y följer x); sjunk: [[sekunder, px]] på bitar = pulkan sjunker ner i snön (kvar där)
    if (BACKE) fl = [fl[0], fl[0] * Math.tan(BACKE * Math.PI / 180)];
    const SJ = BITAR.flatMap(q => (q.sjunk ?? []).map(([v, h]) => [q.t0 + v, h])), sa = SJ.findLastIndex(k => tt >= k[0]);
    if (sa >= 0) fl = [fl[0], fl[1] + (SJ[sa + 1] ? lerp(SJ[sa][1], SJ[sa + 1][1], mjuk(kl((tt - SJ[sa][0]) / (SJ[sa + 1][0] - SJ[sa][0])))) : SJ[sa][1])];
    const a = (1 - Math.cos(2 * Math.PI * tt / 3.6)) / 2;   // andas
    const dorr = q => q?.dorr ?? STANGD[q?.typ] ?? 0;   // dorr: hur stängd luckan är på en bit (0 öppen, 1 stängd), annars bitens rörelse
    return [f, { ...p, strack: p.strack + 0.012 * a }, lerp(dorr(fore), dorr(b), mjuk(kl(tl / 0.5))), b, tl, fl];
  };
  // hela ansikten, inga halvblandningar: glada bågar och sovande ögon av eller på; kawaii av under 0,5, annars sitt eget värde (stolt har 0,7)
  const rent = fb => ({ ...fb, glad: fb.glad.map(v => +(v > 0.5)), ...('kawaii' in fb && { kawaii: fb.kawaii > 0.5 ? fb.kawaii : 0 }), ...('sov' in fb && { sov: +(fb.sov > 0.5) }) });
  function rita(tt) {
    const [f, p, stangd, b, tl, fl] = lage(tt), syns = SAK ? (SAK.ritas ? (SAK.med ? sitt(tt) : 1) : pop((tt - SAKT) / 0.4)) : 0;   // ritas: saken ritas av kritan (rit på en bit), poppar inte
    const fb = blinka(f, tt);   // ögonens form byts i en bildruta (som en blinkning), aldrig två former ovanpå varandra
    F.rita(fig, rent(fb), p);
    akare.setAttribute('transform', `translate(${(GX + fl[0]).toFixed(1)} ${fl[1].toFixed(1)}) rotate(${SAK?.med ? BACKE * kl(syns) : 0})`);
    SAK?.rita(el, { tt, b, tl, syns, bitar: BITAR, sida: SIDA, tak: TAK, kant: KANT, backe: BACKE });
    // gästerna: in med ett hopp (1,2 s) från sin sida när biten med in: nummer börjar; sedan bitens rörelse (med), vinkar när huvudfiguren vinkar, annars vilar de
    GASTER.forEach((G, i) => { const inb = BITAR.find(p => p.in === i), DIN = inb?.dyker ? 0.001 : inb?.tass ? 3.0 : 1.2, u = tt - (inb?.t0 ?? 1e9), k = kl(u / DIN), luft = inb?.tass ? 0 : Math.sin(Math.PI * k) * (k < 1), R = G.R;   // tass: true på biten med in = kommer in på tå (3 s) i stället för med ett hopp; dyker: true = syns där den står (i dörren)
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
    for (const j of JACKOR) j();   // ärmarna följer armarna
    // närbild (som i Bruna sången, 007 v2): nara: true | [från, till] sekunder in i biten = hårt klipp till ansiktet, zoom 2,1, och hårt tillbaka
    { const n = b.nara, nu = n === true || (Array.isArray(n) && tl >= n[0] && tl < n[1]), K = svg.querySelector('#kamera');
      K.removeAttribute('transform');
      if (nu) { const kr = fig.querySelector('.kropp'), bb = kr.getBBox(), m = kr.getCTM(), pt = new DOMPoint(bb.x + bb.width / 2, bb.y + 0.4 * bb.height).matrixTransform(m), Z = 1.7;
        const tx = Math.min(0, Math.max(VW - VW * Z, VW / 2 - pt.x * Z)), ty = Math.min(0, Math.max(VH - VH * Z, 0.56 * VH - pt.y * Z));   // ansiktet lite under mitten: luvan får plats
        K.setAttribute('transform', `translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${Z})`); } }
    window.FIG = [[GX + fl[0] + (p.x ?? 0) * SK, SK], ...GASTER.map(G => [G.hall.style.display ? null : G.px, G.sk])];   // figurernas x i scenen, för kontrollskript
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
    // snön faller lugnt bakom djuret (olika fart och lite sväng), från biten "snoar" (snoa: true = långsamt hela tiden)
    TINDRA.forEach((e, i) => e.setAttribute('opacity', (0.6 + 0.4 * Math.sin(tt * 2.1 + i * 1.9)).toFixed(2)));
    if (SNOAR !== undefined) FL.forEach((c, i) => { const u = tt - SNOAR - i * 0.37 % 2.5;
      c.setAttribute('cy', u < 0 ? -60 : u * FART * (150 + i % 4 * 30) % (STA ? 1340 : 900) - 40); c.setAttribute('cx', FX(i) + 14 * Math.sin(tt * 0.9 + i)); });
    // den stora flingan: dalar mot nosen, sitter där från hoppets topp och smälter efter landningen
    const fangar = b.typ === 'fanga' && g.nos;
    stor.setAttribute('opacity', fangar ? Math.min(kl(tl / 0.15), 1 - kl((tl - 1.45) / 0.4)) : 0);
    if (fangar) {
      const nx = GX + (g.nos[0] - 512 + p.x) * SK, ny = (g.nos[1] - F.FOTTER + p.lyft) * SK - 26, k = mjuk(kl(tl / 0.85));
      stor.setAttribute('transform', `translate(${nx + (70 + 12 * Math.sin(tl * 5)) * (1 - k)} ${lerp(TAK - 70, ny, k)}) rotate(${20 * (1 - k)}) scale(${(1 - 0.5 * kl((tl - 1.45) / 0.4)) * (b.storlek ?? 1)})`);
    }
    KORN.forEach((q, i) => { const u = kl((tt - q.t) / 0.9), e = SANDK[i];
      e.setAttribute('opacity', tt >= q.t ? 1 : 0); e.setAttribute('cx', lerp(q.x, q.mx, u).toFixed(1)); e.setAttribute('cy', (lerp(q.y, q.my, u) - 4 * q.h * u * (1 - u)).toFixed(1)); });
    if (FON.length) { const i = FON.findLastIndex(k => tt >= k[0]), fr = i > 0 ? FON[i - 1][1] : 0, oppen = i < 0 ? 0 : lerp(fr, FON[i][1], mjuk(kl((tt - FON[i][0]) / 0.35)));
      const { cx, cy, r } = FONSTER, f = oppen * (Math.sin(tt * 9) + 0.5 * Math.sin(tt * 14.3 + 1));   // öppet fönster: gardinerna fladdrar i vinden
      svg.querySelector('#ruta').setAttribute('transform', `translate(${cx - r + 14} 0) scale(${(1 - 0.82 * oppen).toFixed(3)} 1) translate(${-(cx - r + 14)} 0)`);
      svg.querySelector('#gardin').setAttribute('transform', `translate(${cx} ${cy - r - 25}) rotate(${(0.5 * Math.sin(tt * 0.9) + 2.2 * f).toFixed(2)}) skewX(${(5 * f).toFixed(2)}) scale(0.393) translate(-657 -58)`); }
    if (PYNTEL.length) { const nu = PYNT.findLast(k => tt >= k[0] - 1e-6)?.[1] ?? null; for (const e of PYNTEL) e.setAttribute('opacity', e.dataset.pynt === nu ? 1 : 0); }
    if (LUVA.length) { const a = LUVA.findLastIndex(k => tt >= k[0]), y = a < 0 ? 0 : LUVA[a + 1] ? lerp(LUVA[a][1], LUVA[a + 1][1], mjuk(kl((tt - LUVA[a][0]) / (LUVA[a + 1][0] - LUVA[a][0])))) : LUVA[a][1];
      svg.querySelector('.luva-ner').setAttribute('transform', `translate(0 ${y.toFixed(1)})`); }
    svg.querySelector('#boil-brus').setAttribute('seed', 1 + Math.floor(tt * 8) % 4);
    // ryck: [sekunder, …] på en bit = luckan rycker till (en liten glipa på 0,4 s) men öppnas inte; ryckstyrka standard 0,05
    const ryck = Math.max(0, ...BITAR.flatMap(q => (q.ryck ?? []).map(v => (q.ryckstyrka ?? 0.05) * Math.sin(Math.PI * kl((tt - q.t0 - v) / 0.4)))));
    K.rita(tt, tt < DURATION - 2.4 ? stangd - ryck : 0);
    ritaRit(tt);
  }

  const eff = (n, k = 1) => n.includes('/') ? `assets/ljud/effekter/${n}-${k}.m4a` : `assets/ljud/effekter/${n}/${n}-${k}.m4a`;   // 'kanin-gullig/kanin-hej': filen ligger i en annan mapp
  // musiken under: julbädden (K.BADD, slingan K.baddLangd s: jul-badd 57,96 s, kvällsbädden 88,47 s) från att öppningsjingeln klingar ut tills luckan stängs (introt och jinglarna: lucka.js).
  // tyst: true på en bit = ingen musik under biten (den tonas ut och in igen på 0,8 s); ss håller loopen i takt
  const TYST = BITAR.filter(b => b.tyst).reduce((m, b) => { const z = m.at(-1); if (z && Math.abs(z[1] - b.t0) < 0.01) z[1] = b.t0 + b.d; else m.push([b.t0, b.t0 + b.d]); return m; }, []);
  const SEG = []; let fran0 = K.baddFran; for (const [a, c] of TYST) { SEG.push([fran0, a]); fran0 = c; } SEG.push([fran0, K.stangs + 0.6]);
  const MUSIK = SEG.filter(([a, c]) => c - a > 0.5).map(([a, c]) => ({ t: a, fil: K.BADD, vol: 0.5, ss: (a - K.baddFran) % K.baddLangd, langd: c - a, loop: true, fade: 0.8, fadeIn: a > K.baddFran ? 0.8 : 1.2 }));
  const ljud = [...MUSIK, ...K.ljud(), ...RIT.flatMap((r, i) => [{ t: r.t0, fil: eff('krita-ritar', 1 + i % 8), vol: 4, langd: r.sek, fade: 0.3, fadeIn: 0.1 }, { t: r.t0 + r.sek, fil: eff('glimt', 1 + i % 2), vol: 4.3 }]),
    ...BITAR.flatMap(b => [...(b.sag ?? []).map(([fil, tal, vid, ss, langd, vol = 2.5]) => ({ t: b.t0 + vid, fil: `assets/ljud/roster/${fil}.m4a`, vol, tal, ss, langd, fade: 0.08 })),
      ...(b.musik ?? []).map(([fil, vid, vol = 0.8]) => ({ t: b.t0 + vid, fil: `assets/ljud/musik/jul/${fil}.m4a`, vol, fade: 0.8, fadeIn: 0.003 })),   // en hel sång, oklippt
      ...(b.ljud ?? []).map(([n, vid, k, vol = 1.5, langd, ss]) => ({ t: b.t0 + vid, fil: eff(n, k), vol, langd, ss, fade: 0.15, fadeIn: 0.003 })),   // fadeIn kort: klapp, pop och puff har sin smäll allra först
      ...(STANGD[b.typ] === 1 && STANGD[BITAR[BITAR.indexOf(b) - 1]?.typ] !== 0.78 ? [{ t: b.t0, fil: eff('swoosh'), vol: 1.2, fadeIn: 0.003 }] : [])])];
  await Promise.all(ljud.map(async c => { if (!(await fetch('/' + c.fil, { method: 'HEAD' }).catch(() => ({}))).ok) c.fil = null; }));
  window.LJUD = ljud.filter(c => c.fil);
  window.DURATION = DURATION; window.BITAR = BITAR.map(b => [+b.t0.toFixed(2), b.typ]);
  window.BITAR2 = BITAR.map(({ fn, ...b }) => b);   // hela bitarna, för kontrollskript   // bitarnas tider, för att välja stillbilder
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
return { kor, ritbild, bild };
})();
