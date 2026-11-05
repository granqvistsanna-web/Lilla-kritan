// Refrängen i 005 (05a–f, 09a–f), likadan båda gångerna: en rosa luftballong lyfter bilen uppför en hel glasstrut
// (Sanna, 2026-11-04: "Rosa luftballong" i _skiss/refrang runda 3, i stället för vägen uppför berget). Läses in efter kit.js, ansikten.js och bilen.js.
// En hög värld (himmel ovanför, kulorna, struten, en grön kulle längst ner), en kamera som följer bilen, inga klipp:
//   a  rad 1–2 "Rosa! (Rosa!) Rosa! (Rosa!)"  ballongen lyfter bilen fyra steg, ett per "Rosa!" (pschhh), musen ropar med
//   b  rad 3 "Rosa är min favoritfärg!"         bilen svävar still, kameran åker in, tassarna på hjärtat, gungar, små hjärtan flyger upp
//   c  rad 4–5 "Rosa! (Rosa!) Rosa! (Rosa!)"   fyra steg till, förbi struten och upp längs kulorna
//   d  rad 6 "Rosa som ett glassberg!"          över kanten och ner på toppen, flaggan poppar upp på "glassberg"
//   e  rad 7 "Brum, brum, tut, tut"             bilen skakar och puffar vita moln ur avgasröret på "brum, brum", studsar när den tutar
//   f  rad 8 "vad är rosa? Titta ut!"           kameran drar sig ut lite, ett rosa moln seglar in från höger, musen spanar och skrattar
//      (09, andra gången: rosa moln täcker hela bilden den sista sekunden; kiosken öppnar dem igen med r.moln(k))
// På varje rop i a och c poppar en bubbla med en rosa sak upp bredvid ballongen (ballong, blomma, glass, hjärta) och gungar på ekot.
// Struten, kullen och ballongen är kod tills Sannas bilder finns (prompter i bakgrunder/glassberget.md och rekvisita/luftballong-rosa.md).
//
//   const r = await refrang.ny(M, '05', S);   // S: avsnittstid → scentid
//   await r.bygg(L, bil, { ljud: true })        // en gång; bil = scenens bil (bilen.ny). ljud: false om scenen bara visar en bildruta
//   r.rita(t)                                   // varje bildruta: null utanför refrängen, annars klippets bokstav ('a'…'f').
//                                               // Under refrängen poserar refrängen bilen och kameran; scenen gömmer sina egna saker.
//   r.sista()                                   // refrängens sista bildruta (kiosken börjar på den)
//   r.moln(k)                                   // rosa moln över hela bilden, k 0–1 (0 = borta); efter r.rita/r.dolj
//   refrang.glassberg(L) → { rita(t, t0, synlig) }  glassberget med musen på egna ben (discot använder det i 15e); t0 = när klippet börjar
(() => {
const { el, bild, ROT, W, H, del, mjuk, inUt, clamp, BEAT, BEAT0, hopp, lerp } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const DANS = { x: W / 2, g: 715, h: 560 };                     // (discot läser refrang.DANS)
const GB = { x: 702, y: 272 };                                 // glassbergets topp (GB_TOPP)
const FLAGGA = { bbox: [244, 111, 787, 922], x: GB.x + 110, g: GB.y + 40, h: 0.24 * H };
// världen: glassberget.png ligger på y 0–768 (toppen GB), himmel ovanför till y -520, struten under till kullen vid y 1536
const VARLD = { y0: -520, y1: 1536 };
const KON = [[360, 735], [1050, 735], [705, 1490]];           // strutens hörn (stand-in)
// var bilen svävar efter varje lyft (hjulens underkant): från kullen, längs strutens och kulornas vänstra sida
const STIG = [[300, 1432], [280, 1350], [318, 1240], [282, 1130], [320, 1020], [284, 905], [318, 790], [286, 680], [322, 570]];
const TOPP = [718, 292];                                       // där bilen landar: mitt på toppkulan
const FLAGG_FOT = [838, 336];                                  // flaggan instucken i glassen till höger om bilen
const STROSSEL = [581,667,144,406,712,84,778,600,113,852,483,176,818,350,50,772,535,102,541,549,23,584,347,26,892,767,34,709,660,135,633,457,50,678,562,47,808,760,31,993,708,151,607,391,70,448,651,88,639,669,119,586,756,100,698,476,65,636,733,33,629,358,67,564,395,156,879,512,40,868,613,161,513,731,55,954,702,127,799,700,0,579,595,60,617,563,167,746,440,95,658,504,53,725,711,27,580,709,143,842,408,143,586,458,138,993,748,156,770,372,151,363,754,121,942,749,48,584,499,133,678,437,121,473,752,123,528,658,83,909,674,151,879,434,70,673,386,110,719,389,27,836,586,152,483,557,99,785,639,172,536,503,94,465,595,99,757,762,155,479,692,0,955,656,61,541,609,71,615,632,90,750,494,38,829,544,65,722,531,156,738,609,134,823,629,88,530,765,91,613,322,8,782,463,51,537,465,21,798,427,81,818,503,173,674,639,12,872,729,112,584,538,36,429,756,167,843,675,144,664,704,95,521,413,2,671,748,73,718,764,15,822,459,1,879,560,156,1048,762,18];   // x, y, vinkel: strössel på kulorna (ur plattans rosa, inte där bilen står)
const BUBBLOR = [   // en bubbla med en rosa sak per rop (inte ekot): sida av ballongen, sak
  { sida: 1, sak: 'ballong' }, { sida: -1, sak: 'blomma' }, { sida: 1, sak: 'glass' }, { sida: -1, sak: 'hjarta' }];
const BIL_H = 150, LYFT_D = 1.3, LAND_D = 1.3;                // bilens höjd; ett lyft (s); över kanten och ner (s)
const ZOOM = { folj: 1.35, nar: 2.2, topp: 1.5, ut: 1.25 };
const MOLN = { w: 538, h: 195, x: 1060, y: 150 };              // det rosa molnet (lager/moln-rosa.png), mitt, där det stannar

// slagen i sångtid → avsnittstid (M.av)
const slag = (M, t) => BEAT0 + Math.round((t - M.av - BEAT0) / BEAT) * BEAT + M.av;

// flaggan sticks ner på 0,35 s från t0 och fladdrar sedan; x, g = stångens fot
function flaggaPose(flagga, t, t0, x, g, sk) {
  const ner = mjuk(del(t0, t0 + 0.35, t)), fladder = Math.sin(t * 9) * 4.5 * ner, dy = (1 - ner) * -90;
  flagga.setAttribute('transform', `translate(${x} ${g + dy}) skewX(${-4.6 + fladder}) scale(${sk}) translate(${-(FLAGGA.bbox[0] + FLAGGA.bbox[2]) / 2} ${-FLAGGA.bbox[3]})`);
  flagga.setAttribute('opacity', clamp((t - t0) / 0.1));
}

// Himlen (Sanna): en lugn kritig himmel i stället för plattans grova sneda streck. En mjuk gradient (lite djupare upptill,
// ljusare ner mot kullen och där kritsvepet går in: HIMMEL i vagen-1, #a9dcf3), fint mjukt kritkorn, och vita
// kritmoln i några storlekar (ritade i kod) som glider sakta. Plattans himmel nycklas bort (blått → genomskinligt, kulorna och
// molnen kvar; små blå prickar i kulorna fylls igen), och dess fasta moln klipps bort.
function himmel(parent) {
  const defs = document.querySelector('svg defs');
  if (!defs.querySelector('#refrang-himmel')) defs.insertAdjacentHTML('beforeend', `
    <linearGradient id="refrang-himmel" gradientUnits="userSpaceOnUse" x1="0" y1="${VARLD.y0}" x2="0" y2="1200">
      <stop offset="0" stop-color="#8fcdee"/><stop offset="0.55" stop-color="#a2d8f2"/><stop offset="1" stop-color="#addef4"/></linearGradient>
    <filter id="refrang-himmelkorn" filterUnits="userSpaceOnUse" x="-500" y="${VARLD.y0 - 100}" width="${W + 1000}" height="${VARLD.y1 - VARLD.y0 + 300}">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="v"/>
      <feColorMatrix in="v" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.32 -0.14" result="ljus"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 0.85" result="korn0"/><feGaussianBlur in="korn0" stdDeviation="0.6" result="korn"/>
      <feComposite in="korn" in2="SourceGraphic" operator="in" result="k2"/>
      <feComposite in="ljus" in2="SourceGraphic" operator="in" result="l2"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="l2"/><feMergeNode in="k2"/></feMerge></filter>
    <filter id="refrang-nyckel" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  10 0 -10 0 2" result="a"/>
      <feMorphology in="a" operator="dilate" radius="3" result="d"/><feMorphology in="d" operator="erode" radius="3" result="c"/>
      <feComposite in="SourceGraphic" in2="c" operator="in"/></filter>
    <filter id="refrang-molnkrita" x="-20%" y="-30%" width="140%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="5" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="14" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="8" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.75" result="hal"/>
      <feComposite in="d" in2="hal" operator="in"/></filter>
    <clipPath id="refrang-utanmoln"><path d="M0 228H${W}V${H}H0Z M268 0H1108V228H268Z"/></clipPath>`);
  el('rect', { x: -500, y: VARLD.y0 - 100, width: W + 1000, height: VARLD.y1 - VARLD.y0 + 300, fill: 'url(#refrang-himmel)', filter: 'url(#refrang-himmelkorn)' }, parent);
  // vita kritmoln i kod som plattans (platt underkant, tre–fyra kullar), i några storlekar: [form, x, y, skala, fart px/s]
  const FORM = [[[-70, 0, 46], [-15, -28, 62], [50, -10, 50], [95, 6, 36]], [[-55, 0, 40], [5, -22, 52], [60, 2, 38]]];
  const MOLN2 = [[0, 90, 110, 1, 9], [1, 1100, 140, 0.85, 7], [1, 360, -130, 0.6, 5], [0, 1180, -320, 0.7, 6], [0, 560, -460, 0.5, 4],
    [1, -60, 560, 0.65, 8], [0, 1240, 1000, 0.55, 5], [1, 140, 1200, 0.45, 6]];
  const moln = MOLN2.map(([f, x, y, sk, v]) => { const g = el('g', {}, parent), m = el('g', { filter: 'url(#refrang-molnkrita)', fill: '#f6fbfe' }, g);
    FORM[f].forEach(([cx, cy, rr]) => el('circle', { cx, cy, r: rr }, m));
    el('rect', { x: FORM[f][0][0] - 20, y: -4, width: FORM[f].at(-1)[0] - FORM[f][0][0] + 40, height: 44, rx: 22 }, m);
    return { g, x, y, sk, v }; });
  return t => moln.forEach(m => { const x = ((m.x + m.v * t + 300) % (W + 600) + W + 600) % (W + 600) - 300;   // glider åt höger, in igen från vänster
    m.g.setAttribute('transform', `translate(${x} ${m.y}) scale(${m.sk})`); });
}
// plattan utan himmel och utan sina fasta moln (himlen ovan syns igenom)
const utanHimmel = { filter: 'url(#refrang-nyckel)', 'clip-path': 'url(#refrang-utanmoln)' };

function glassberg(L) {
  const plate = el('g', {}, L.plate), himmelRita = himmel(plate);
  bild(`${LAGER}glassberget.png`, el('g', utanHimmel, plate), { width: W, height: H });
  const strossel = el('g', { filter: 'url(#boil)' }, L.plate), FARG = ['#F7C948', '#7CC6F2', '#ffffff', '#8FD16A', '#B58BE0', '#F49A5C'];   // som i refrängen
  for (let i = 0; i < STROSSEL.length; i += 3)
    el('rect', { x: -11, y: -3.5, width: 22, height: 7, rx: 3.5, fill: FARG[(i / 3) % FARG.length], transform: `translate(${STROSSEL[i]} ${STROSSEL[i + 1]}) rotate(${STROSSEL[i + 2]})` }, strossel);
  const g = el('g', {}, L.figurer);
  const sk = FLAGGA.h / (FLAGGA.bbox[3] - FLAGGA.bbox[1]);
  const flagga = el('g', {}, g), flaggaIn = el('g', {}, flagga);
  bild(`${ROT}assets/rekvisita/cut/flagga-rosa.png`, flaggaIn);
  window.kant?.lagg(flaggaIn);   // vit klistermärkeskant (vita-kanter): grundkanten ovanpå den inbakade, stången med
  let mus = null;
  const topp = bild(`${ROT}assets/bakgrunder/glassberget/cut/glassberget-topp.png`, g, { width: W, height: H });
  const klar = bilen.musen({ h: 0.25 * H, forelder: g }).then(m => { mus = m; g.insertBefore(m.g, topp); });
  // t0: klippets början. Flaggan sticks ner på 0,35 s (plopp vid 0,35), fladdrar; musen jublar från 0,4 s.
  // vink (discot, "hej då"): { w: 0–1, v: −1..1 i takt } musen vinkar lugnt hej då med höger tass, den vänstra ner, glad.
  // Returnerar musens ansikte (i världen, före kameran), för kritirisen.
  const ANSIKTE = [GB.x - 30, GB.y + 30 - 0.6 * 0.25 * H];
  const rita = (t, t0, synlig = true, vink = null) => {
    plate.style.display = g.style.display = strossel.style.display = synlig ? '' : 'none';
    if (!synlig || !mus) return ANSIKTE;
    himmelRita(t);
    const k = t - t0, w = vink?.w ?? 0, v = vink?.v ?? 0;
    flaggaPose(flagga, t, t0, FLAGGA.x, FLAGGA.g, sk);
    const jubel = mjuk(del(0.35, 0.6, k)), studs = k > 0.35 ? hopp(t, t0 + 0.55, t0 + 0.85, 14) : { y: 0, sx: 1, sy: 1 };
    // innan flaggan står: höger tass håller stången (pekar ner mot den), sedan båda armarna upp
    mus.pose({ x: GB.x - 30, y: GB.y + 30 + studs.y, h: 0.25 * H, sx: studs.sx, sy: studs.sy, tilt: 3 * v * w,
      humor: w > 0.5 ? 'glad' : jubel > 0.5 ? 'skrattar' : 'glad', titt: 0.6 * (1 - jubel),
      arm_r: lerp(lerp(110, 150, jubel), 25, w), arm_l: lerp(lerp(30, 150, jubel), 132 + 16 * v, w) });   // vinkar med tassen bort från flaggan
    return ANSIKTE;
  };
  return { rita, klar };
}

async function ny(M, nr, S) {
  const id = k => M.bild(nr + k), [A0] = id('a'), [, A1] = id('a2'), [C0] = id('c'), [, C1] = id('c2');
  const K = { a: id('a')[0], b: id('b')[0], c: C0, d: id('d')[0], e: id('e')[0], f: id('f')[0], slut: id('f')[1] };
  const START = S(K.a), SLUT = S(K.slut);
  // fyra "Rosa!" på rad 1–2 och 4–5: fjärdedelar av raden (rop, eko, rop, eko), snäppta till närmaste slag
  const rosa = (a, b) => [0, 1, 2, 3].map(i => S(slag(M, lerp(a, b, i / 4))));
  const R12 = rosa(A0, A1), R45 = rosa(C0, C1);
  const HOPP = [...R12, ...R45];                                             // åtta lyft, ett per "Rosa!"
  const LAND = S(K.d) - 0.35, LANDAT = LAND + LAND_D;                        // över kanten och ner på toppen på rad 6
  const FLAGGA_T = S(lerp(K.d, K.e, 0.62));                                  // "glassberg"
  const TUT = [0.5, 0.75].map(q => S(slag(M, lerp(K.e, K.f, q))));         // "tut, tut" i andra halvan av rad 7
  const BRUM = [0, 0.25].map(q => S(slag(M, lerp(K.e, K.f, q))));        // "brum, brum" i första halvan
  const r = { START, SLUT, R12, R45, TUT, HOPP, BRUM };
  const skott = t => t < START || t >= SLUT ? null : t < S(K.b) ? 'a' : t < S(K.c) ? 'b' : t < S(K.d) ? 'c' : t < S(K.e) ? 'd' : t < S(K.f) ? 'e' : 'f';
  r.skott = skott;

  let himmelRita, bil, plate, moln, flagga, sk, ballong, bubblor, hjartan = [], tacke, tackeBak, tackeMoln;
  const ROP = [R12[0], R12[2], R45[0], R45[2]], EKO = [R12[1], R12[3], R45[1], R45[3]];
  r.bygg = async (L, scenBil, { ljud = true } = {}) => {
    bil = scenBil;
    plate = el('g', {}, L.plate);
    const defs = document.querySelector('svg defs'), PL = `${LAGER}glassberget.png`;
    // kritkorn som kit.backar(): ojämn kant och vita korn i fyllningen. Kit:s filter räcker bara en skärm på höjden, världen här är högre.
    const korn = (id, region) => defs.insertAdjacentHTML('beforeend', `<filter id="${id}" ${region}>
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="10" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -4.2 1.56" result="p"/>
      <feComposite in="p" in2="d" operator="in" result="pk"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge></filter>`);
    if (!defs.querySelector('#refrang-boil')) {
      korn('refrang-boil', `filterUnits="userSpaceOnUse" x="-400" y="${VARLD.y0 - 200}" width="${W + 800}" height="${VARLD.y1 - VARLD.y0 + 400}"`);
      korn('refrang-korn', 'x="-10%" y="-10%" width="120%" height="120%"');
      korn('refrang-skarm', `filterUnits="userSpaceOnUse" x="-1200" y="-400" width="${W + 2400}" height="${H + 800}"`);   // molnen över hela bilden: glider in utifrån
    }
    himmelRita = himmel(plate);   // kritig himmel med glidande moln (ersätter plattans speglade himmelsband)
    // struten: våffla med rutnät, vit klistermärkeskant (stand-in)
    const pts = KON.join(' ');
    const kp = el('clipPath', { id: 'refrang-kon' }, defs); el('polygon', { points: pts }, kp);
    const kon = el('g', { filter: 'url(#refrang-boil)' }, plate);
    el('polygon', { points: pts, fill: '#E8B46A', stroke: '#fff', 'stroke-width': 10, 'stroke-linejoin': 'round' }, kon);
    const rut = el('g', { 'clip-path': 'url(#refrang-kon)', stroke: '#C98B45', 'stroke-width': 9, 'stroke-linecap': 'round' }, kon);
    for (let i = -12; i < 14; i++) { el('line', { x1: 200 + i * 60, y1: 700, x2: 1000 + i * 60, y2: 1500 }, rut); el('line', { x1: 1200 - i * 60, y1: 700, x2: 400 - i * 60, y2: 1500 }, rut); }
    // plattan tonas ut mot himlen under den (nedersta raderna är ljusare och gav en skarv)
    if (!defs.querySelector('#refrang-fot')) defs.insertAdjacentHTML('beforeend', `<linearGradient id="refrang-fot-g" gradientUnits="userSpaceOnUse" x1="0" y1="700" x2="0" y2="756">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="refrang-fot" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#refrang-fot-g)"/><rect x="300" width="${W - 590}" height="${H}" fill="#fff"/></mask>`);   // kulorna i mitten tonas inte
    const kulor = el('g', utanHimmel, plate); bild(PL, kulor, { width: W, height: H, mask: 'url(#refrang-fot)' });
    // glassen droppar ner över strutens kant, och en grön kulle bär strutens spets
    const dropp = el('g', { filter: 'url(#refrang-boil)', fill: '#E07F92' }, plate);
    ['M420 760 q12 70 30 0z', 'M560 760 q14 110 34 0z', 'M840 760 q12 80 30 0z', 'M960 760 q14 120 34 0z'].forEach(d => el('path', { d }, dropp));
    [[452, 70], [700, 160], [930, 90]].forEach(([cx, rx]) => el('ellipse', { cx, cy: 768, rx, ry: 22 }, dropp));
    const strossel = el('g', { filter: 'url(#refrang-boil)' }, plate), FARG = ['#F7C948', '#7CC6F2', '#ffffff', '#8FD16A', '#B58BE0', '#F49A5C'];
    for (let i = 0; i < STROSSEL.length; i += 3)
      el('rect', { x: -11, y: -3.5, width: 22, height: 7, rx: 3.5, fill: FARG[(i / 3) % FARG.length], transform: `translate(${STROSSEL[i]} ${STROSSEL[i + 1]}) rotate(${STROSSEL[i + 2]})` }, strossel);
    el('ellipse', { cx: 688, cy: 1610, rx: 900, ry: 200, fill: '#9ccf6a', stroke: '#fff', 'stroke-width': 8, filter: 'url(#refrang-boil)' }, plate);
    moln = bild(`${LAGER}moln-rosa.png`, plate, { width: MOLN.w, height: MOLN.h });
    // luftballongen (stand-in): knuten mitt mellan repens fästen i (200, 520); repen går till bilens sidor
    ballong = el('g', { filter: 'url(#refrang-korn)' }, bil.g.parentNode); bil.g.parentNode.insertBefore(ballong, bil.g);
    const bp = el('clipPath', { id: 'refrang-hylle' }, defs);
    const HYLLE = 'M200 20 C 340 20 370 150 330 250 C 300 320 240 350 230 380 L170 380 C 160 350 100 320 70 250 C 30 150 60 20 200 20z';
    el('path', { d: HYLLE }, bp);
    ballong.innerHTML = `<path d="M70 250 L 140 520 M330 250 L 260 520 M170 390 L 150 520 M230 390 L 250 520" stroke="#7a6a62" stroke-width="3" fill="none"/>
      <path d="${HYLLE}" fill="#F06EAA" stroke="#fff" stroke-width="10"/>
      <g clip-path="url(#refrang-hylle)"><path d="M150 0 C 120 120 130 260 175 400 L 200 400 C 175 260 170 120 185 0z" fill="#F8BBD6"/>
        <path d="M250 0 C 280 120 270 260 225 400 L 200 400 C 225 260 230 120 215 0z" fill="#F8BBD6"/><rect x="0" y="210" width="400" height="26" fill="#fff" opacity=".8"/></g>
      <rect x="162" y="374" width="76" height="22" rx="8" fill="#C98B45" stroke="#fff" stroke-width="6"/>
      <ellipse cx="130" cy="110" rx="34" ry="20" fill="#fff" opacity=".5" transform="rotate(-30 130 110)"/>`;
    // bubblorna: bakom ballongen, en rosa sak i varje (bilder där de finns, hjärta och blomma i kod)
    bubblor = BUBBLOR.map(b => {
      const g = el('g', { filter: 'url(#refrang-korn)' }, ballong.parentNode); ballong.parentNode.insertBefore(g, ballong);
      el('circle', { r: 88, fill: '#ffffff', 'fill-opacity': 0.28, stroke: '#fff', 'stroke-width': 7 }, g);
      const inne = el('g', {}, g), BILD = { ballong: ['bakgrunder/vagen-saker/ballong-rosa.png', 579, 861], glass: ['rekvisita/cut/jordgubbsglass-glassberg.png', 434, 940] }[b.sak];
      if (BILD) { const h = 118, w = h * BILD[1] / BILD[2]; bild(`${ROT}assets/${BILD[0]}`, inne, { x: -w / 2, y: -h / 2, width: w, height: h }); }
      else if (b.sak === 'hjarta') el('path', { d: 'M0 42 C -60 0 -62 -42 -32 -48 C -12 -52 0 -36 0 -26 C 0 -36 12 -52 32 -48 C 62 -42 60 0 0 42z', fill: '#F06EAA', stroke: '#fff', 'stroke-width': 7 }, inne);
      else { el('path', { d: 'M0 60 Q 6 20 0 0', stroke: '#5aa84a', 'stroke-width': 8, fill: 'none' }, inne);
        for (let i = 0; i < 8; i++) el('ellipse', { cx: 0, cy: -46, rx: 13, ry: 24, fill: '#F49AC1', stroke: '#fff', 'stroke-width': 4, transform: `rotate(${i * 45} 0 -20)` }, inne);
        el('circle', { cx: 0, cy: -20, r: 17, fill: '#F7C948', stroke: '#fff', 'stroke-width': 4 }, inne); }
      el('path', { d: 'M-58 -40 A 70 70 0 0 1 -20 -70', stroke: '#fff', 'stroke-width': 9, 'stroke-linecap': 'round', fill: 'none', opacity: 0.85 }, g);
      return g;
    });
    // små hjärtan som flyger upp ur musens bröst på "favoritfärg" (Sanna), framför bilen
    hjartan = Array.from({ length: 6 }, () => { const g = el('g', { filter: 'url(#refrang-korn)', style: 'display:none' }, scenBil.g.parentNode);
      el('path', { d: 'M0 42 C -60 0 -62 -42 -32 -48 C -12 -52 0 -36 0 -26 C 0 -36 12 -52 32 -48 C 62 -42 60 0 0 42z', fill: '#F06EAA', stroke: '#fff', 'stroke-width': 9 }, g); return g; });
    // molnen som täcker hela bilden i slutet av 09 (skärmens mått, ovanpå allt)
    tacke = el('g', { filter: 'url(#refrang-skarm)', style: 'display:none' }, kit.lager.overst.parentNode);
    tackeBak = el('rect', { x: -20, y: -20, width: W + 40, height: H + 40, fill: '#F9B4D4' }, tacke);
    tackeMoln = [[-1, 150, 120], [1, 520, 90], [-1, 380, 320], [1, 960, 300], [-1, 240, 540], [1, 760, 560], [-1, 620, 740], [1, 1180, 720], [1, 1250, 110], [-1, 60, 700]]
      .map(([fran, x, y]) => ({ fran, x, y, e: bild(`${LAGER}moln-rosa.png`, tacke, { width: 900, height: 326 }) }));
    flagga = el('g', {}, L.figurer);
    const flaggaIn = el('g', {}, flagga);
    bild(`${ROT}assets/rekvisita/cut/flagga-rosa.png`, flaggaIn);
    window.kant?.lagg(flaggaIn);   // vit klistermärkeskant (vita-kanter); kräver verktyg/kant.js i scenen
    sk = 0.7 * FLAGGA.h / (FLAGGA.bbox[3] - FLAGGA.bbox[1]);
    if (!ljud) return;
    HOPP.forEach(t => kit.ljud('pschhh', t, { vol: 0.7, langd: 0.8, fade: 0.25 }));   // brännaren puffar vid varje lyft
    kit.ljud('pschhh', LAND, { vol: 0.3, langd: 0.6, fade: 0.2 });
    kit.ljud('duns', LANDAT - 0.05, { vol: 0.5 });
    kit.ljud('pop', FLAGGA_T + 0.3, { vol: 0.7 });          // flaggan: plopp (saknas, pop så länge)
    kit.ljud('plopp', FLAGGA_T + 0.3);
    TUT.forEach(t => kit.ljud('tuta-tut', t, { vol: 0.8, langd: 0.5 }));
    BRUM.forEach(t => kit.ljud('brum', t - 0.03, { vol: 0.7, langd: 0.5, fade: 0.15 }));
    kit.ljud('glitter', S(K.f) + 0.2, { vol: 0.6 });        // det rosa molnet
    ROP.forEach(t => kit.ljud('pling', t + 0.05, { vol: 0.8 }));   // bubblorna
    if (nr === '09') kit.ljud('swoosh', SLUT - 1.0, { vol: 0.6 });   // molnen täcker bilden
  };

  // var bilen svävar vid t: varje "Rosa!" startar ett långt, mjukt lyft som flyter ihop med nästa, så att bilen stiger
  // i ett svep i stället för i hack. Sidled gungar den mjukt mellan stegen. Rad 6: en lugn båge över kanten ner på toppen.
  const lage = t => {
    const u = HOPP.reduce((a, h) => a + inUt(del(h, h + LYFT_D, t)), 0);   // 0…8, glider jämnt
    const i = Math.min(Math.floor(u), STIG.length - 2), f = u - i, fs = inUt(f);
    const [x0, y0] = STIG[i], [x1, y1] = STIG[i + 1];
    let x = lerp(x0, x1, fs), g = lerp(y0, y1, f);
    const l = inUt(del(LAND, LANDAT, t));
    const gung = t > HOPP[0] ? Math.sin(t * 2.2) * 5 * (1 - l) : 0;
    x = lerp(x, TOPP[0], l); g = lerp(g + gung, TOPP[1], l) - Math.sin(Math.PI * l) * 55;
    const duns = hopp(t, LANDAT, LANDAT + 0.3, 4, 0.04, 0.12);
    const fart = HOPP.reduce((a, h) => a + Math.sin(Math.PI * del(h, h + LYFT_D, t)), 0);   // lutar lite medan den stiger
    return { x, g: g + duns.y, sx: duns.sx, sy: duns.sy, tilt: (Math.sin(t * 1.6) * 2.5 - Math.min(1, fart) * 2.5) * (t > HOPP[0] ? 1 - l : 0), landat: t >= LANDAT };
  };

  r.rita = t => {
    const s = skott(t);
    plate.style.display = flagga.style.display = ballong.style.display = s ? '' : 'none';
    bubblor.forEach(b => (b.style.display = 'none'));
    hjartan.forEach(h => (h.style.display = 'none'));
    r.moln(nr === '09' && s ? mjuk(del(SLUT - 1.0, SLUT - 0.1, t)) : 0);
    if (!s) return null;
    himmelRita(t);
    // bubblorna: poppar upp på ropet bredvid ballongen, stiger sakta, gungar på ekot (bara i a–c, sedan är de förbi)
    ROP.forEach((t0, i) => { const b = bubblor[i], k = del(t0, t0 + 0.35, t); if (t < t0 || t > S(K.d) + 0.5) return;
      const [sx, sy] = STIG[Math.min(8, 2 * i + 1 + (i > 1 ? 0 : 0))], up = (t - t0) * 22, eko = Math.max(0, 1 - Math.abs(t - EKO[i] - 0.15) / 0.25);
      const sc = (k < 1 ? (k < 0.6 ? k / 0.6 * 1.15 : 1.15 - 0.15 * (k - 0.6) / 0.4) : 1) * (1 + 0.08 * eko);
      b.style.display = '';
      b.setAttribute('transform', `translate(${sx + BUBBLOR[i].sida * 230 + 20} ${sy - 300 - up + Math.sin(t * 1.7 + i) * 8}) rotate(${Math.sin(t * 2 + i) * 4 + eko * 8}) scale(${sc} ${sc * (1 - 0.06 * eko)})`); });
    const p = lage(t);
    let mus = { humor: 'skrattar' }, extra = { y: 0, tilt: 0, sx: 1, sy: 1 };
    if (s === 'a' || s === 'c') {   // musen ropar med på varje "Rosa!"
      const rop = (s === 'a' ? R12 : R45).some(x => t >= x - 0.05 && t < x + 0.35);
      mus = { humor: rop ? 'ropar' : 'skrattar', m: rop ? 0.9 : 0.4 };
    }
    if (s === 'b') {   // tassarna på hjärtat, gungar åt sidorna (en gång per två slag)
      const v = Math.sin((t - S(K.b)) * Math.PI / (2 * BEAT));
      mus = { humor: 'karleksfull', arm_r: kit.mot('r', [552, 612]), arm_l: kit.mot('l', [472, 618]), fram: 'rl', rot: 7 * v };
    }
    if (s === 'e') {   // brum, brum: skakar på stället och puffar; tut, tut: studsar och öppnar munnen
      const tut = TUT.map(x => hopp(t, x, x + 0.22, 12, 0.05, 0.12)), pump = Math.max(...TUT.map(x => Math.max(0, 1 - Math.abs(t - x - 0.1) / 0.25)));
      const bt = tut.find(h => h.y || h.sx !== 1) || { y: 0, sx: 1, sy: 1 };
      const skak = BRUM.reduce((a, b) => a + Math.sin(Math.PI * del(b, b + 0.4, t)), 0);
      extra = { y: bt.y + 1.5 * skak * Math.sin(t * 2 * Math.PI * 12), sx: bt.sx, sy: bt.sy, tilt: 1.2 * skak * Math.sin(t * 2 * Math.PI * 16) };
      mus = { humor: 'skrattar', m: 0.4 + 0.6 * pump };
    }
    if (s === 'f') {   // tassen över ögonen: spanar åt vänster, sedan åt höger mot molnet, och skrattar när det är framme
      const q = del(S(K.f), S(K.slut), t), framme = q > 0.5;
      mus = { humor: framme ? 'skrattar' : 'nyfiken', arm_r: framme ? 'kant' : kit.mot('r', [612, 390]), fram: 'r', titt: q < 0.25 ? -1 : 1, tittY: -0.3, rot: q < 0.25 ? 5 : -5 };
    }
    if ((s === 'd' || s === 'e') && t >= FLAGGA_T) mus.humor = 'skrattar';
    const by = p.g + extra.y, tilt = p.tilt + extra.tilt;
    bil.g.style.display = '';
    bil.pose({ x: p.x, y: by, h: BIL_H, sx: p.sx * extra.sx, sy: p.sy * extra.sy, tilt, vit: true, ...mus });
    bil.puffa(t, BRUM);
    if (s === 'b' || s === 'c') {   // hjärtana: ett i taget, växelvis åt vänster och höger, stiger i en mjuk våg och tonar bort
      const [hx, hy] = bil.musPunkt([509, 600]), b0 = S(K.b), steg = 0.38;
      hjartan.forEach((h, i) => {
        const u = del(b0 + 0.1 + i * steg, b0 + 0.1 + i * steg + 1.6, t), ut = 45 + 40 * ((i * 5) % 3);
        if (u <= 0 || u >= 1) return;
        const sida = i % 2 ? 1 : -1, sc = 0.3 * mjuk(u * 5) * (1 - mjuk(del(0.7, 1, u)));
        h.parentNode.appendChild(h); h.style.display = '';
        h.setAttribute('transform', `translate(${hx + sida * (25 + ut * Math.sqrt(u)) + 12 * Math.sin(u * 6 + i * 2)} ${hy - 20 - (120 + 25 * (i % 3)) * u}) rotate(${sida * 12 * Math.sin(u * 5)}) scale(${sc})`);
      });
    }

    // ballongen över bilen: repen fäster i bilens sidor, den gungar lite efter bilen (studsar inte med i tut och duns)
    const bw = BIL_H * 891 / 820, bsk = 0.8 * bw / 120, sv = Math.sin(t * 1.3) * 2;
    ballong.setAttribute('transform', `translate(${p.x} ${p.g - BIL_H * 0.42}) rotate(${tilt * 0.6 + sv}) scale(${bsk}) translate(-200 -520)`);

    // flaggan till vänster om bilen på toppen, molnet seglar in från höger på rad 8
    flagga.style.display = t >= FLAGGA_T ? '' : 'none';
    flaggaPose(flagga, t, FLAGGA_T, FLAGG_FOT[0], FLAGG_FOT[1], sk);
    const mk = mjuk(del(S(K.f) - 0.2, S(K.f) + 1.0, t));
    moln.setAttribute('x', lerp(W + 40, MOLN.x - MOLN.w / 2, mk) + Math.sin(t * 0.8) * 6);
    moln.setAttribute('y', MOLN.y - MOLN.h / 2);
    moln.style.display = mk > 0 ? '' : 'none';

    // kameran följer bilen (och nedre delen av ballongen) med en lugn zoom, åker in i b, och står still på toppen
    const kam = (cx, cy, z) => { const hw = W / 2 / z, hh = H / 2 / z;
      kit.kamera(clamp(cx, hw, W - hw), clamp(cy, VARLD.y0 + hh, VARLD.y1 - hh), z, true); };
    const cx = p.x + 120, cy = p.g - BIL_H * 1.3;
    if (s === 'b') {
      const [nx, ny] = bil.musPunkt([509, 430]), k = mjuk(del(S(K.b), S(K.b) + 0.6, t)) * (1 - mjuk(del(S(K.c) - 0.9, S(K.c) - 0.1, t)));
      kam(lerp(cx, nx, k), lerp(cy, ny, k), lerp(ZOOM.folj, ZOOM.nar, k));
    } else if (s === 'a' || (s === 'c' && t < LAND - 0.5)) kam(cx, cy, ZOOM.folj);
    else {   // d: följer bågen upp och vidgar mot toppen; f: åker in mot bilen och flaggan på kulan
      // på toppen (Sanna: mindre ballong, mer glass): kulan med strösslet fyller nedre halvan, ballongen beskärs upptill
      // (bara korgen, repen och höljets nedre del syns); sista åkningen in siktar på bilen och flaggan, inte ballongen
      const k = mjuk(del(LAND - 0.5, LANDAT + 0.5, t)), nara = mjuk(del(S(K.f), S(K.f) + 1.0, t));
      const tx = TOPP[0] + 40, ty = TOPP[1] - 20, nx = (TOPP[0] + FLAGG_FOT[0]) / 2, ny = TOPP[1] - 45;
      const andas = Math.sin(Math.PI * k);   // mitt i bågen: ut så att hela glassen syns när hon landar på den
      kam(lerp(lerp(cx, tx, k), nx, nara), lerp(lerp(cy, ty, k) + andas * 140, ny, nara), lerp(lerp(ZOOM.folj, ZOOM.topp, k) / (1 + 0.3 * andas), 2.0, nara));
    }
    return s;
  };
  // rosa moln över hela bilden: molnen glider in från sidorna, en rosa botten tonas in under dem så att inget lyser igenom
  r.moln = k => {
    tacke.style.display = k > 0 ? '' : 'none';
    if (k <= 0) return;
    tackeBak.setAttribute('opacity', mjuk(del(0.8, 1, k)));   // bara de sista gliporna: molnen gör jobbet
    tackeMoln.forEach((m, i) => { const q = mjuk(clamp(k * 1.25 - i * 0.025)), x = lerp(m.fran < 0 ? -1000 : W + 100, m.x - 450, q);
      m.e.setAttribute('x', x + Math.sin(i * 2.3) * 10); m.e.setAttribute('y', m.y - 163); });
  };
  r.sista = () => r.rita(SLUT - 0.001);
  r.dolj = () => r.rita(-1e9);
  return r;
}

window.refrang = { ny, glassberg, DANS };
})();
