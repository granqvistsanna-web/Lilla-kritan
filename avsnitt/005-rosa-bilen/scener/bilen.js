// Rosa bilen med musen Mille (v2) i, som bilen() i storyboard/bygg.py. Vanligt skript efter kit.js, ../ansikten.js, ../v2-riggar.js och ../v2.js:
//   <script src="../kit.js"></script><script src="../ansikten.js"></script><script src="../v2-riggar.js"></script><script src="../v2.js"></script><script src="../bilen.js"></script>
//
//   const bil = bilen.ny(kit.lager.figurer, { vit: true, kontur: true, mus: true });
//   bil.pose({ x, y, h, tilt, sx, sy, dist,                   // x, y = hjulens underkant i mitten, h = hela bildens höjd (som place() i bygg.py)
//              humor: 'skrattar', titt, tittY, blink, m,      // musens ansikte (ansikten.js: glad skrattar ropar forvanad nyfiken skelogd njuter slickar karleksfull blinkar ledsen)
//              arm_r: 145, arm_l: 'kant',                     // vinkel (0 ner, 90 ut, 180 upp) eller 'kant' (standard): i bilen håller båda tassarna ratten (framifrån,
//                                                             // klockan 10 och 2); en arm uppe: den tassen släpper, den andra kvar; båda uppe: ingen ratt. 'styra' = 'kant'.
//              fram: 'r',                                     // armar framför kroppen (tassen på ratten ligger alltid framför)
//              rot: 7,                                        // musen lutar (grader, positivt = bakåt mot vänster, som bygg.py)
//              glass: { s: 'r', typ: 'berg' },              // en glass i tassen: typ rosa (standard), berg, tva, tre, strut, gul, gron; hand: [x, y] för en annan tass-punkt; k: storlek (1 = standard)
//              armFlytt: { r: [dx, dy] }, lyft: dy })        // flytta en arm (knytnävarna rullar), lyft musen i bilen (hopp ur)
//   v2-bilen har sin vita kant i bilden; vit och kontur tas emot men gör inget (konturen finns inte på v2-bilen, 2026-11-08).
//   bil.puffa(t, tider)   vita avgaspuffar ur avgasröret, tre per tid (efter pose)
//   bil.musPunkt([px, py]) → var en punkt i musens 1024-ruta hamnar i bild (efter pose), t.ex. nosen [509, 418]
//   bil.g är gruppen; bil.id kan användas med <use href="#id"> för kopior (refrängens mönster).
// Lagren bakifrån: hela bilen → musens bakre armar, kropp och ratt → bilens sida och front → armarna framför → hjulen.
// Bilens mått (1024-rutan): bbox [67, 30, 958, 850] med musens huvud (y 62) och hjulens kant (850), som v1.
(() => {
const { el, bild, ROT } = kit;
const BIL = `${ROT}assets/rekvisita/rosa-bilen/`, MUS = `${ROT}assets/karaktarer/musen-mille/`;
const LAGER = new URL('lager/', document.currentScript.src).href;
// musen i bilen: hennes (512, 926) på bilens (MUS_X, MUS_Y), skala MUS_K. v2-bilen (Sanna 2026-11-08: "larger inside car"): större, lite
// bakåt i sätet, sidans kant (bilens y 461) skär henne vid hennes y 720 (magen), så att huvudet ändå ryms i närbilderna
const MUS_K = 0.86, MUS_X = 380, MUS_Y = 640;
const VRID = [MUS_X, MUS_Y - 60];                   // hon lutar runt den här punkten
// glassarna i art direction v2 (2026-11-08): assets/rekvisita/glass-v2/gor-glass.py, i v1-glassarnas rutor (431 × 743, berget 434 × 940)
const GLASS_V2 = `${ROT}assets/rekvisita/glass-v2/cut/`;
const GLASS = { rosa: `${GLASS_V2}glass-rosa.png`, berg: `${GLASS_V2}glass-berg.png`,
  strut: `${GLASS_V2}glass-strut.png`, gul: `${GLASS_V2}glass-gul.png`, gron: `${GLASS_V2}glass-gron.png`,
  tva: `${GLASS_V2}glass-tva.png`, tre: `${GLASS_V2}glass-tre.png` };   // tva, tre: två och tre kulor, varje ny kula framför den under (019:s kiosk)
const GLASS_H = { rosa: 743, berg: 940, strut: 743, gul: 743, gron: 743, tva: 933, tre: 1123 }, GLASS_W = { rosa: 431, berg: 434, strut: 431, gul: 431, gron: 431, tva: 431, tre: 431 };
const GH = 250;                                      // glassens höjd i musens ruta (bygg.py)
let n = 0;
// trim: skär bort den inbakade dubbla kanten på v1-glassarna i bilen (TRIM.glass, px i bildens ruta)
const TRIM = { glass: 9 };
function trim(r) {   // skär bort r px av bildens kant (alfat krymps, färgen behålls)
  const id = `trim${r}`, defs = document.querySelector('svg defs');
  if (!defs.querySelector(`#${id}`)) defs.insertAdjacentHTML('beforeend', `<filter id="${id}">
    <feMorphology in="SourceAlpha" operator="erode" radius="${r}" result="e"/><feComposite in="SourceGraphic" in2="e" operator="in"/></filter>`);
  return `url(#${id})`;
}
// trim + en egen vit klistermärkeskant på kant px (bildens ruta): musens armar, tassar och glass när hon står (Sanna: lika tydlig kant som kroppen)
function klister(r, k) {
  const id = `klister${r}-${k}`, defs = document.querySelector('svg defs');
  if (!defs.querySelector(`#${id}`)) defs.insertAdjacentHTML('beforeend', `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
    <feMorphology in="SourceAlpha" operator="erode" radius="${r}" result="e"/><feComposite in="SourceGraphic" in2="e" operator="in" result="f"/>
    <feMorphology in="e" operator="dilate" radius="${k}" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
    <feMerge><feMergeNode/><feMergeNode in="f"/></feMerge></filter>`);
  return `url(#${id})`;
}
const KROPP_KANT = 12;  // kroppens inbakade vita kant (ca 12 px i musens ruta)

function filtren(defs) {
  if (defs.querySelector('#vitkant')) return;
  Object.values(GLASS).forEach(u => bild(u, defs));   // glassarna byts med href: läs in dem i förväg (i defs syns de inte)
  defs.insertAdjacentHTML('beforeend', `
    <filter id="vitkant" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d"/>
      <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
`);
}

// Musen i art direction v2 (Sanna 2026-11-08: "update rosa sång to v2 too"): v2-Mille ur v2.js/v2-riggar.js i sin 1024-ruta
// (fötterna (512, 926)), utan ben i bilen och utan svans där. Samma API som v1: armvinkel 0 ner, 90 ut, 180 upp (kit.mot ger den),
// 'kant'/'styra' = tassen på ratten, fram, glass, humor. En vinkel blir en punkt från v2-axeln (PIV) som v2.js riktar armen mot.
// Tre kopior: kroppen, armarna bakom kroppen (bak) och armarna framför (fram); i bilen dessutom ratten och greppet (tassarna på ratten).
const R2 = () => v2riggar['musen-mille'], SIDA2 = { r: 1, l: -1 };
const v2Punkt = (s, a, d) => { const [x, y] = R2().PIV[s], r = a * Math.PI / 180; return [x + SIDA2[s] * Math.sin(r) * d, y + Math.cos(r) * d]; };
const hand = (s, a, sk = 1) => v2Punkt(s, a, (R2().ARM[s] + 20) * sk);   // tassens mitt i musens ruta (v2-armarna är kortare än v1:s 170 px)
// Ratten (Sanna 2026-11-08: "work on steering wheel position and arms"): v2-ratten ur bilscenen (stiltest-premium/bil/cut/ratt.png,
// ringen r 643 px i bilden) på en rattstång, framför henne mot fronten, navet strax över sidans kant (hennes y 720) så att nedre halvan
// är bakom sidan som en instrumentbräda. Den sitter i bilen (ny nedan), inte på musen: den står kvar när hon lutar, hoppar eller kliver ur.
// RATT_MITT/RATT_R i musens ruta i vila. Greppet = armarna framför kroppen i en pose som lägger tassarna på ringen klockan 10 och 2.
const SKISS = window.BIL_SKISS || {};   // provbänk (_test/ratt/): window.BIL_SKISS = { ratt: [x, y], r, grepp, rikt } före bilen.js
const RATT = `${ROT}assets/stiltest-premium/bil/cut/ratt.png`, RATT_MITT = SKISS.ratt || [672, 700], RATT_R = SKISS.r || 139,
  GREPP = SKISS.grepp || { fram: [1, 1], armar: [-48, -98], klapp: 90 }, RIKT = SKISS.rikt || 0,
  HALL = SKISS.hall || 'r';   // RIKT: riktningsposen mot fronten i bilen. Sanna valde skiss E (2026-11-08, "steering wheel closer to car nose").
  // HALL: tassarna som håller ratten när båda vilar; 'r' = bara tassen mot fronten, den andra hänger bakom kroppen (Sanna: "looks like there is an extra arm")
const MUMS = t => ({ humor: 'fnissig', m: 0.3 + 0.25 * Math.sin(t * 2 * Math.PI / 0.26) });   // tuggar (kiosken): mp.mums

// Milles spel i v2 (Sanna 2026-11-08: "reanimate Mille in the v2 style", se mille-v2.md): scenernas humör (v1-namnen) blir
// uttryck ur hennes ark (premium/uttryck.html UTTRYCK); ett objekt är en egen blandning av arkets parametrar.
const HUMOR_M = { glad: 'glad', open: 'glad', skrattar: 'jatteglad', ropar: 'jatteglad', forvanad: 'forvanad', big: 'forvanad',
  nyfiken: 'nyfiken', ledsen: 'ledsen', blinkar: 'blinkar', slickar: 'fnissig', fnissig: 'fnissig', happy: 'stolt', stolt: 'stolt',
  karleksfull: 'kawaii', kawaii: 'kawaii', tanker: 'tanker', somnig: 'somnig', sleep: 'sover', sover: 'sover', jatteglad: 'jatteglad',
  jublar: { kind: 1, streck: 0, mun: [22, 18, 1, 449], ogonS: [1.06, 1.05], oron: [-8, -8], strack: 1.03 },   // som jätteglad men med öppna ögon (Sanna 2026-11-09: "milles eyes more open, too much closed")
  mumsar: { kind: 1, streck: 0, mun: [10, 9, 1, 450], leX: 3, oron: [-4, 8], luta: 4, strack: 0.98 },               // som fnissig men med öppna ögon
  njuter: { sov: 1, kind: 1, le: 1.3, leBred: 1.1, oron: [6, 6], strack: 0.99 },                       // blundar och njuter (doften)
  skelogd: { ogonS: [1.1, 1.08], kind: 0.9, streck: 0, mun: [8, 9, 0, 466], oron: [-4, -4], titt: [0, 10] } };   // tittar på nosen (+ ögonen inåt)
const STANGDA = ['njuter', 'sleep', 'sover', 'skelogd'];   // inga automatiska blinkningar
// Kroppens pose ur arket (p.kropp: namn eller [namn, k]), utan armarna (de styr scenen)
const KROPP = ['luta', 'upp', 'bred', 'strack', 'sank', 'oron', 'svans'];
const kl = (x, a, b) => Math.max(a, Math.min(b, x));
// glid: a → b med tidskonstanten tau (s); objekt och listor tal för tal, allt annat byts direkt
const glid = (a, b, k) => a == null ? b : Array.isArray(b) ? b.map((v, i) => glid(a[i], v, k)) : typeof b === 'number' ? a + (b - a) * k
  : b && typeof b === 'object' ? Object.fromEntries(Object.keys(b).map(n => [n, glid(a[n], b[n], k)])) : b;
const munAv = (f, m) => { m = Math.min(1.6, m);   // som v2.js ansikte(): m öppnar munnen
  return m < 0.1 ? { ...f, mun: [0, 0, 0, f.mun[3]], streck: 1, le: Math.max(f.le, 1) }
    : { ...f, mun: [16 + 6 * Math.min(1, m), 13 * m, f.mun[0] ? f.mun[2] : 0.6, f.mun[3] - (f.mun[0] ? 0 : 4)], streck: 0 }; };
let musNr = 0;

function musKropp(bak, fram, kropp, iBil = false) {
  const glas = {}, figur = (p, armar, ben = false) => v2.figur('musen-mille', p, { s: 1, ben }, armar);
  const armBak = figur(bak, 'bara'), kr = figur(kropp, false, !iBil), armFram = figur(fram, 'bara');
  if (iBil) kr.fig.querySelectorAll('.tail').forEach(e => (e.style.display = 'none'));   // Sanna: svansen syns inte i bilen
  for (const s of 'rl') glas[s] = el('image', { width: 431, height: 743, style: 'display:none', filter: iBil ? trim(TRIM.glass) : klister(3, KROPP_KANT) }, fram);
  const grepp = iBil ? figur(fram, 'bara') : null;
  const ansikte = { g: kr.fig.querySelector('.drag') };   // vagen-2 lägger glansen i kroppen (g.parentNode)
  const R = R2(), fas = (musNr++ * 0.618) % 1, st = {}, ogon = [...kr.fig.querySelectorAll('.oga')];
  // spel(p, rorelse): uttrycket, blicken, kroppen och munnen glider mjukt mellan scenens lägen (inga byten på en bildruta),
  // plus v2-rörelserna: öronen släpar efter (rorelse.vy, figurens px per bildruta), fladdrar lite (fartvind i bilen), svansen
  // vilar och viftar ibland, andningen i bilen och en blinkning var 3:e sekund. Tillståndet bärs mellan bildrutorna (kit.seek värmer upp).
  const spel = (p, rorelse = {}) => {
    // samma bildruta igen (scenen ritar om henne): räkna om steget från läget före bildrutan, så att sista anropet gäller
    const t = kit.nu || 0;
    if (t !== st.t) { st.fore = { f: st.f, mW: st.mW, titt: st.titt, skel: st.skel, kropp: st.kropp, vy: st.vy, m: st.m }; st.dt = t - (st.t ?? -1); st.t = t; }
    Object.assign(st, st.fore);
    const dt = st.dt, steg = dt > 0 && dt <= 0.1, k = tau => steg ? 1 - Math.exp(-dt / tau) : 1;
    const mums = p.mums ? MUMS(t) : {}, humor = mums.humor || p.humor || 'glad', m = mums.m ?? p.m, h = HUMOR_M[humor] ?? 'glad';
    const mal = { ...R.param(typeof h === 'string' ? h : { ...R.param('neutral'), ...h }) };
    mal.armar = [8, 8]; mal.luta *= 0.5;   // armarna styr scenen; huvudet lutar halvt så mycket som i arket
    st.f = glid(st.f, mal, k(0.14));
    // öppna ögon ↔ ^-bågar / slutna ögon byts som en blinkning (ingen spöklik övertoning): första halvan av bytet går locket ner
    // över det öppna ögat, sedan visas bågen helt (se F.lock nedan); 0,08 s
    for (const n of ['glad', 'sov']) st.f[n] = glid(st.fore?.f?.[n], mal[n], k(0.08));
    if (m != null) st.m = m;
    st.mW = glid(st.mW, m != null ? 1 : 0, k(0.06));
    const F = st.mW > 0.001 ? R.blanda(st.f, munAv(st.f, st.m ?? 0), st.mW) : { ...st.f };
    const halv = g => g < 0.5 ? 2 * g : 0;
    F.lock = F.lock.map((v, i) => Math.max(v, halv(F.glad[i]), halv(F.sov)));
    F.glad = F.glad.map(g => g >= 0.5 ? 1 : 0); F.sov = F.sov >= 0.5 ? 1 : 0;
    st.titt = glid(st.titt, [p.titt || 0, p.tittY || 0], k(0.07));
    st.skel = glid(st.skel, humor === 'skelogd' ? 1 : 0, k(0.15));
    const [kn, kk] = Array.isArray(p.kropp) ? p.kropp : [p.kropp || 'neutral', 1];
    const kp = R.blandaPose('neutral', kn, kk);
    st.kropp = glid(st.kropp, Object.fromEntries(KROPP.map(n => [n, kp[n]])), k(0.18));
    // öronen: släp efter rörelsen (som arkets hopp: clamp(vy × 0,9, ±25)), fladder, fartvind i bilen
    st.vy = glid(st.vy, rorelse.vy || 0, k(0.05));
    const ora = kl(st.vy * 0.9, -25, 25), fart = rorelse.fart || 0, fl = Math.sin(t * 5 + fas * 6) * 2 + fart * 3 * Math.sin(t * 11);
    const svans = iBil ? 0 : Math.sin(t * 3 + fas * 6) * 3 + (((t + fas * 4.5) % 4.5) > 3.6 && ((t + fas * 4.5) % 4.5) < 4.2 ? Math.sin(t * 34) * 18 : 0);
    const pose2 = { ...st.kropp, oron: [st.kropp.oron[0] + ora + fart * 6 + fl, st.kropp.oron[1] + ora + fart * 6 - fl],
      svans: st.kropp.svans + svans, strack: st.kropp.strack + (iBil ? 0.008 * Math.sin(2 * Math.PI * (t / 2.8 + fas)) : 0) };
    const auto = !STANGDA.includes(humor) && ((t + fas * 3) % (iBil ? 3.3 : 3.1)) < 0.12 ? 1 : 0;
    return { F, pose2, titt: st.titt[0], tittY: st.titt[1], blink: Math.max(p.blink || 0, auto), skel: st.skel };
  };
  const pose = (p, standard = 'kant', rorelse) => {
    if (p.synlig === false) return;   // osynlig: ändra inget (inte heller spelets tillstånd)
    const sp = spel(p, rorelse);
    const bas = { x: 512, y: 926, s: 1, andas: 0, humor: 'glad', ansikte2: sp.F, titt: sp.titt, tittY: sp.tittY, blink: sp.blink, pose2: sp.pose2 };
    const mal = {}, uppB = [], uppF = [], pa = [];
    for (const s of 'rl') {
      let v = p[`arm_${s}`] ?? standard;
      const vilar = typeof v !== 'number' || (iBil && v === kit.MUS_VILA);   // i bilen betyder vila: tassen på ratten
      if (vilar && iBil) pa.push(s);
      if (vilar) v = kit.MUS_VILA;
      let [mx, my] = v2Punkt(s, v, 100);
      const fl = p.armFlytt?.[s]; if (fl) { mx += fl[0]; my += fl[1]; }
      if (!pa.includes(s)) { mal[s] = [mx, my]; ((p.fram || '').includes(s) ? uppF : uppB).push(s); }
      const gl = p.glass?.s === s ? p.glass : null;
      glas[s].style.display = gl ? '' : 'none';
      if (gl) {   // glassen under tassen, som bygg.py: underkanten 0,3 glasshöjd under tassen
        const typ2 = gl.typ || 'rosa', h = GH * (gl.k ?? 1) * GLASS_H[typ2] / 743, w = h * GLASS_W[typ2] / GLASS_H[typ2], [hx, hy] = gl.hand || hand(s, v, iBil ? 1.25 : 1);
        glas[s].setAttribute('href', GLASS[typ2]);
        Object.entries({ x: hx - w / 2, y: hy + GH * (gl.k ?? 1) * 0.3 - h, width: w, height: h }).forEach(([k, x]) => glas[s].setAttribute(k, x));
      }
    }
    const utanRatt = iBil && (p.lyft > 0 || pa.length === 0);   // båda armarna uppe eller hoppar ur: ingen ratt (som v1)
    if (!utanRatt) for (const s of pa.filter(s => !HALL.includes(s))) {   // tassen som inte når ratten hänger bakom kroppen
      pa.splice(pa.indexOf(s), 1); mal[s] = v2Punkt(s, 4, 100); uppB.push(s);   // nästan rakt ner, gömd bakom kroppen (Sanna 2026-11-08: "polish Mille in car", stumpen stack ut)
    }
    if (utanRatt) for (const s of pa.splice(0)) uppF.push(s);       // då hänger de vilande armarna framför kroppen
    if (iBil && RIKT) bas.pose2 = { ...bas.pose2, rikt: RIKT };   // kroppen och armkopiorna vänder sig lika mycket mot fronten
    kr.pose(bas);
    if (sp.skel > 0.01) ogon.forEach((e, i) => e.setAttribute('transform', `translate(${(i ? -9 : 9) * sp.skel} ${5 * sp.skel}) ${e.getAttribute('transform')}`));   // skelögd: ögonen inåt mot nosen
    const sk = iBil ? { armSk: SKISS.armSk || 1.25 } : {};   // i bilen sträcks armarna som är uppe, så att tassen syns över kanten (som 007:s ARM_SK); 019: SKISS.armSk
    armBak.pose({ ...bas, ...mal, ...sk, uppe: uppB });
    armFram.pose({ ...bas, ...mal, ...sk, uppe: uppF, framSida: 'rl' });
    if (grepp) {
      grepp.g.style.display = utanRatt ? 'none' : '';
      // SKISS.mal (019, Sanna 2026-11-09 "polish millies arms in car"): tassarna mot punkter på ratten (musens ruta), sträckta mal.sk
      const ml = SKISS.mal ? { r: SKISS.mal.r, l: SKISS.mal.l, armSk: SKISS.mal.sk || 1 } : {};
      grepp.pose({ ...bas, ...ml, uppe: pa, pose2: { ...bas.pose2, ...GREPP, ...(RIKT ? { rikt: RIKT } : {}) } });
    }
  };
  return { pose, ansikte, kropp: kr };
}

// Bilen i art direction v2 (Sanna 2026-11-08, take 2 ur Google Flow): assets/rekvisita/rosa-bilen/v2/cut/rosa-bil-v2.png
// (1031 × 653, ratten borttagen, egen vit kant 7 px, se v2/README.md), lagd i den gamla bilens 1024-ruta så att scenerna inte ändras:
// skala BK, bredden som v1 (x 67–958) och underkanten på y 850. En bild: hela bilen bakom musen, sidan under sätets gräddvita
// nederkant (bildens y > FRAM_Y) och fronten (x > HUV_X) en gång till framför henne, hjulen som klippta, snurrande kopior.
// Kanten finns i bilden (ingen kantfilter längre); konturen (kontur: true) finns inte på v2-bilen.
const BIL2 = `${BIL}v2/cut/rosa-bil-v2.png`, BW = 1031, BH = 653, BK = 891 / 1000, BOX = 67 - 15 * BK, BOY = 850 - 637 * BK;
const BIL_T = `translate(${BOX} ${BOY}) scale(${BK})`, FRAM_Y = 200, HUV_X = 728;
const HJUL2 = [[267.5, 512], [758.5, 512]], HJUL_R2 = 117, HJUL_KLIPP = 110;   // i bildens ruta
const ROR = [80, 676];                                                    // avgasrörets mynning i bilens ruta (röret finns i bilden)

function ny(parent, { mus = true } = {}) {   // vit och kontur tas emot men gör inget längre
  const id = `bil${++n}`, defs = document.querySelector('svg defs');
  filtren(defs);
  const g = el('g', { id }, parent), inre = el('g', {}, g);
  bild(BIL2, el('g', { transform: BIL_T }, inre), { width: BW, height: BH });   // hela bilen, sätet bakom musen
  let m = null, musG = null;
  const fram = el('g', {});
  if (mus) {
    musG = el('g', { id: `${id}-mus` }, inre);
    const bak = el('g', {}), kropp = el('g', {});
    musG.append(bak, kropp);
    m = musKropp(bak, fram, kropp, true);
  }
  // ratten på sin stång, i bilens ruta (står kvar när musen rör sig), mellan musen och bilens sida
  { const RK = RATT_R / 643, k = MUS_K, cx = MUS_X + (RATT_MITT[0] - 512) * k, cy = MUS_Y + (RATT_MITT[1] - 926) * k;
    const rg = el('g', { transform: `translate(${cx} ${cy}) scale(${k})` }, inre), stang = el('g', { filter: 'url(#kritkant)' }, rg);
    stang.innerHTML = '<path d="M0 0 L165 45" stroke="#5f5a57" stroke-width="30" stroke-linecap="round"/><path d="M0 -5 L162 38" stroke="#8e8883" stroke-width="16" stroke-linecap="round"/>';
    bild(RATT, rg, { x: -1431 * RK / 2, y: -1459 * RK / 2, width: 1431 * RK, height: 1459 * RK }); }
  const fc = el('clipPath', { id: `${id}-fram` }, defs);
  el('rect', { x: -50, y: FRAM_Y, width: BW + 100, height: BH }, fc); el('rect', { x: HUV_X, y: -50, width: BW, height: BH + 100 }, fc);
  bild(BIL2, el('g', { transform: BIL_T, 'clip-path': `url(#${id}-fram)` }, inre), { width: BW, height: BH });   // sidan och fronten framför musen
  if (mus) inre.appendChild(fram);
  const hjulG = el('g', { transform: BIL_T }, inre);
  const hjul = HJUL2.map(([hx, hy], i) => {   // däcket roterar i en klippt kopia (en ljus kritprick visar snurren)
    el('circle', { cx: hx, cy: hy, r: HJUL_KLIPP }, el('clipPath', { id: `${id}-hjul${i}` }, defs));
    const rot = el('g', {}, el('g', { 'clip-path': `url(#${id}-hjul${i})` }, hjulG));
    bild(BIL2, rot, { width: BW, height: BH });
    el('circle', { cx: hx + 0.78 * HJUL_R2, cy: hy, r: 9, fill: '#8C8C90', opacity: 0.8 }, rot);
    return { rot, hx, hy };
  });
  const bb = [67, 30, 958, 850], fot = [(bb[0] + bb[2]) / 2, bb[3]];
  const b = { id, g, mus: m, fot, bbox: bb }, bst = { rot: 0 };
  b.pose = (p = {}) => {
    const s = (p.h ?? 300) / (bb[3] - bb[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? 400} ${p.y ?? 600}) rotate(${p.tilt || 0}) scale(${s * (p.sx ?? 1) * (p.flip ? -1 : 1)} ${s * (p.sy ?? 1)}) translate(${-fot[0]} ${-fot[1]})`);
    const v = (p.dist || 0) / (HJUL_R2 * BK * s) * 180 / Math.PI;
    hjul.forEach(h => h.rot.setAttribute('transform', `rotate(${v} ${h.hx} ${h.hy})`));
    if (m && p.synlig !== false) {
      // v2: lutningen (rot) glider i stället för att hoppa; öronen får bilens studs och lyft (figurens px per bildruta) och fartvinden
      const t = kit.nu || 0, dt = t - (bst.t ?? -1), steg = dt > 0 && dt <= 0.1, y = ((p.y ?? 600) / s + (p.lyft || 0)) / MUS_K;
      if (dt !== 0) {   // samma bildruta igen (scenen ritar om): behåll stegets värden
        bst.rot = steg ? bst.rot + ((p.rot || 0) - bst.rot) * (1 - Math.exp(-dt / 0.15)) : (p.rot || 0);
        bst.vy = steg ? (y - bst.y) / (dt * 30) : 0; bst.fart = steg ? Math.min(1, Math.abs((p.dist || 0) - bst.dist) / dt / s / 900) : 0;
        Object.assign(bst, { t, y, dist: p.dist || 0 });
      }
      const { vy, fart } = bst;
      const tr = `rotate(${-bst.rot} ${VRID[0]} ${VRID[1]}) translate(${MUS_X} ${MUS_Y + (p.lyft || 0)}) scale(${MUS_K}) translate(-512 -926)`;
      musG.setAttribute('transform', tr);
      fram.setAttribute('transform', tr);
      m.pose(p, 'kant', { vy, fart });
    }
  };
  // en punkt i musens 1024-ruta → bild (lager.figurer, efter kameran)
  b.musPunkt = pt => {
    const r = kit.lager.figurer.getCTM().inverse().multiply(musG.getCTM());
    const q = new DOMPoint(pt[0], pt[1]).matrixTransform(r); return [q.x, q.y];
  };
  const puffG = el('g', { filter: 'url(#kritkant)' }, el('g', { filter: 'url(#boil)' }, g)), puffar = [];   // krita, kokar som resten
  b.puffa = (t, tider) => {
    while (puffar.length < tider.length * 3) puffar.push(el('circle', { fill: '#fff', stroke: '#e4ddd2', 'stroke-width': 7 }, puffG));
    puffar.forEach((c, j) => {   // växer ut ur röret, driver bakåt och uppåt och krymper bort
      const i = j % 3, u = kit.del(tider[(j - i) / 3] + i * 0.15, tider[(j - i) / 3] + i * 0.15 + 0.9, t), syns = u > 0 && u < 1;
      c.style.display = syns ? '' : 'none';
      if (!syns) return;
      c.setAttribute('r', kit.lerp(25, 100 - i * 18, Math.sqrt(u)) * (1 - kit.mjuk(kit.del(0.65, 1, u))));
      c.setAttribute('cx', ROR[0] - 320 * u); c.setAttribute('cy', ROR[1] - 120 * u + 15 * Math.sin(u * 5 + i));
    });
  };
  b.pose();
  return b;
}

// Musen på egna ben (vid disken, i discot, på glassberget): v2-Mille med benen (musKropp ovan, utan ratt).
//   const mus = await bilen.musen({ h: 200, forelder }); mus.pose({ x, y, h, tilt, sx, sy, flip, synlig, opacity, humor, titt, arm_r: 145, arm_l: 145, fram: 'rl', glass, ben, mums })
// (x, y) = fötterna. ben: [vänster, höger] i grader (hopp: kit.benHopp). Armarna som i bilen, men 'kant' finns inte: standard är vila (30).
// mus.punkt([px, py]) → bild; mus.hand(s, vinkel) → tassen i musens ruta. Andas lugnt (hela figuren, så att armarna följer med).
async function musen(opt = {}) {   // async som förut (refrang.js använder .then)
  filtren(document.querySelector('svg defs'));
  const g = el('g', {}, opt.forelder || kit.lager.figurer), inre = el('g', {}, g);
  const bak = el('g', {}, inre), kropp = el('g', {}, inre), fram = el('g', {}, inre);
  const m = musKropp(bak, fram, kropp), H0 = 821, fas = (musNr * 0.37) % 1, mst = {};   // H0 = v2-Milles höjd (BBOX 106–927)
  const benG = [...m.kropp.fig.querySelectorAll('.leg-l, .leg-r')];
  const f = { g, inre, kropp: m.kropp, ansikte: m.ansikte, hand, skala: (opt.h ?? 352) / H0 };
  f.pose = (p = {}) => {
    const s = (p.h ?? opt.h ?? 352) / H0 * (p.k ?? 1), an = Math.sin(2 * Math.PI * ((kit.nu || 0) / 2.8 + fas));
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? 688} ${p.y ?? 650}) rotate(${p.tilt || 0}) scale(${s * (p.flip ? -1 : 1) * (p.sx ?? 1) * (1 - 0.008 * an)} ${s * (p.sy ?? 1) * (1 + 0.015 * an)}) translate(-512 -926)`);
    const t = kit.nu || 0, dt = t - (mst.t ?? -1), y = (p.y ?? 650) / s + (p.dy || 0) / s;   // öronen släpar efter hopp och gupp
    if (dt !== 0 && p.synlig !== false) { mst.vy = dt > 0 && dt <= 0.1 ? (y - mst.y) / (dt * 30) : 0; Object.assign(mst, { t, y }); }
    m.pose(p, kit.MUS_VILA, { vy: mst.vy });
    // benen som v1 (kit.figur delar): p.delar['leg-l'|'leg-r'] = grader eller [grader, dx, dy] (kit.benHopp), annars p.ben
    const ben = p.ben || [0, 0], dl = p.delar || { 'leg-l': -ben[0], 'leg-r': ben[1] };
    benG.forEach(e => { const n = e.getAttribute('class'), [px, py] = R2().RIGG[n], v = dl[n]; if (v == null) return;
      const [deg, dx = 0, dy = 0] = Array.isArray(v) ? v : [v];
      e.setAttribute('transform', `translate(${dx} ${dy}) ${e.getAttribute('transform') || ''} rotate(${deg} ${px} ${py})`); });
  };
  f.punkt = ([ax, ay]) => { const pt = new DOMPoint(ax, ay).matrixTransform(kit.lager.figurer.getCTM().inverse().multiply(inre.getCTM())); return [pt.x, pt.y]; };
  f.pose();
  return f;
}

window.bilen = { ny, musen, hand, klister, KROPP_KANT, GLASS, MUS_K, MUS_X, MUS_Y };
})();
