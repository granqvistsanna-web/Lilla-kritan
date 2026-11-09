(async () => {
const { el, bild, lerp, mjuk, del, clamp, W, H, BEAT, BEAT0 } = kit;
const M = await kit.manus();
// v2-disco/ är danspausen (2:13–2:38), v2-disco2/ slutet (2:59–3:21.8): samma disco, läget väljs av mappnamnet
const ID = location.pathname.split('/').at(-2), SLUTET = ID === 'v2-disco2';
const [a0, a1] = M.bild(ID), SLUT = a1 - a0, K0 = a0 - M.av, SANG_SLUT = K0 + SLUT;
const ev = (s, a, b, r = 0.25) => mjuk(del(a, a + r, s)) * (1 - mjuk(del(b - r, b, s)));
const fas = s => (s - BEAT0) / BEAT, takt = kit.takt;

// ---------- discot som discot/ (plåten och ljusen) ----------
const L = kit.duk('avsnitt/007-bruna-ladbilen/scener/discot/disco-beige.png');
const ljus = discoljus.ny(L);
const defs = L.plate.parentNode.querySelector('defs');
L.plate.querySelector('rect[filter="url(#discokorn)"]')?.remove();
defs.querySelectorAll('linearGradient[id^="kagla"] stop').forEach(st => st.setAttribute('stop-color', '#FFF6DC'));
defs.querySelectorAll('linearGradient[id^="kagla"]').forEach(g => { const st = g.querySelectorAll('stop');
  st[0].setAttribute('stop-opacity', 0.55); st[1].setAttribute('stop-opacity', st.length > 2 ? 0.14 : 0); });
L.plate.querySelectorAll('path[opacity="0"]').forEach(e => e.getAttribute('fill')?.startsWith('#') && e.setAttribute('fill', '#FFEFC4'));
const FLACKAR = [...L.plate.querySelectorAll('ellipse[filter="url(#ljusoskarpa)"]')];
const FARG006 = ['#FFF0B0', '#FFC8D4', '#FFE0A8', '#D6ECFF', '#E8D8FF', '#D9F5CF'];
const ljusRita = s => { ljus.rita(s); FLACKAR.forEach((e, i) => { e.setAttribute('opacity', 0.35); e.setAttribute('fill', FARG006[(i + Math.floor(fas(s) / 4)) % 6]); }); };

// ---------- figurerna ----------
const FOT = 0.9 * H, X = { L: W / 2 - 360, B: W / 2, I: W / 2 + 350 }, HF = { B: 340, L: 305, I: 240 };
const skuggG = el('g', {}, L.figurer), figG = el('g', {}, L.figurer);
const skugga = () => el('ellipse', { fill: '#6e4630', opacity: 0.3, filter: 'url(#kritkant)' }, skuggG);
const fig = {
  L: { f: await v2.figur('lammet-ludde', figG, { h: HF.L, ben: true }), sk: skugga() },
  I: { f: await v2.figur('igelkotten-igge', figG, { h: HF.I, ben: true }), sk: skugga() },
  B: { f: await v2.figur('grodan-gurra', figG, { h: HF.B, ben: true }), sk: skugga() },
};
// glitter vid den stora landningen: vita fyruddiga stjärnor som flyger ut och tonar bort
const STJ = 'M0 -1 L.22 -.22 L1 0 L.22 .22 L0 1 L-.22 .22 L-1 0 L-.22 -.22Z';
const glitter = Array.from({ length: 27 }, () => el('path', { d: STJ, fill: '#FFF8E0', stroke: '#E8C27A', 'stroke-width': 0.08 }, L.figurer));
const gnistor = Array.from({ length: 48 }, () => el('path', { d: STJ, fill: '#FFF8E0', stroke: '#E8C27A', 'stroke-width': 0.1 }, L.figurer));

// ---------- vad som händer (sångtid) ----------
const IN = { B: [[133.15, 0.55, 260, W / 2, X.B]], L: [[133.3, 0.42, 40, -140, X.L - 170], [133.95, 0.42, 40, X.L - 170, X.L]],
             I: [[133.55, 0.42, 34, W + 130, X.I + 170], [134.2, 0.42, 34, X.I + 170, X.I]] };   // [start, luft, höjd, från x, till x]
const VINK = 194.6, KLAPP = [135.2, 150], RING = [150, 151], HOPPA = [151, 151.5], PLASK = 152.4, PLASK_A = 151.85, DANSA = [152.8, 158];
const SOLO = [[takt(138.5), 'B'], [takt(141.8), 'L'], [takt(145.1), 'I'], [takt(148.4), null]];   // närbilder i klappet
const solo = s => { let v = null; for (const [a, w] of SOLO) if (s >= a) v = w; return s >= KLAPP[0] && s < KLAPP[1] ? v : null; };
const FASV = { B: 0, L: 0.6, I: 1.2 };
// lärdomar från 013:s disco (Sanna 2026-11-09): grodan har ett eget hopp i dansen, varje landning fjädrar efter, munnarna öppnas på
// slaget, lammets öron och svans släpar efter kroppen, gnistor på klapp och landning, golvet skakar på de stora landningarna
const GHOPP = (SLUTET ? [179, VINK - 0.6, 4] : [DANSA[0], DANSA[1] - 0.5, 2]), GHOPP_T = [];
for (let a = takt(GHOPP[0]) + BEAT; a < GHOPP[1]; a += GHOPP[2] * BEAT) GHOPP_T.push(a);
const LANDA = { B: [[133.7, 0.14], ...GHOPP_T.map(a => [a + 0.36, 0.1])], L: [], I: [] };   // [landning, huk]
for (const v in IN) IN[v].forEach(([a, air]) => v !== 'B' && LANDA[v].push([a + air, 0.14]));
for (const v in LANDA) { if (!SLUTET) LANDA[v].push(...HOPPA.map(a => [a + 0.32, 0.1]), [PLASK, 0.16]); if (SLUTET) LANDA[v] = LANDA[v].filter(([a]) => a > 179); }
const studs = (s, vem) => { const l = LANDA[vem].filter(([a, h]) => s >= a + h).at(-1); if (!l) return 0;   // fjädringen efter landningen
  const q = s - l[0] - l[1]; return q < 0.6 ? Math.exp(-q * 7) * Math.sin(q * 24) : 0; };
const munSlag = s => 0.72 * Math.sin(Math.PI * clamp(((fas(s) / 2) % 1 + 1) % 1 / 0.5));   // öppen första halvan av varannat slag
const SKAK = SLUTET ? [] : [133.7, PLASK];
const skak = s => SKAK.reduce((m, a) => { const q = s - a; return q >= 0 && q < 0.45 ? 6 * Math.exp(-q * 9) * Math.sin(q * 55) : m; }, 0);

// arkets hopp (som v2-landet): huk, sträckt i luften, landningen trycker ihop
function arkHopp(s, a, air, h, huk = 0.14) {
  if (s < a - huk || s > a + air + huk) return null;
  const tryck = q => ({ y: 0, l: s < a ? 0 : 1, p2: { strack: -0.12 * q, bred: 0.1 * q }, arm: -12 * q });
  if (s < a) return tryck(Math.sin(Math.PI * (s - a + huk) / huk));
  if (s > a + air) return tryck(Math.sin(Math.PI * (s - a - air) / huk));
  const l = (s - a) / air, w = Math.sin(Math.PI * l);
  return { y: -4 * h * l * (1 - l), l, p2: { strack: 0.08 * w, bred: -0.06 * w, benY: [-30 * w, -30 * w] }, arm: 32 * w };
}

function stall(s, vem) {
  if (SLUTET) { let hopp = null; if (vem === 'B') for (const a of GHOPP_T) hopp = hopp || arkHopp(s, a, 0.36, 46, 0.1); return { x: X[vem], y: FOT, syns: true, hopp }; }   // står redan på golvet när molnet drar bort
  let x = X[vem], y = FOT, syns = true, hopp = null;
  // in på golvet
  const inl = IN[vem];
  if (s < inl[0][0] - 0.15) { syns = false; }
  else for (const [a, air, h, fx, tx] of inl) {
    const hp = arkHopp(s, a, air, h);
    if (s < a + air + 0.14) { if (hp) { hopp = hp; x = lerp(fx, tx, hp.l); } else x = fx; break; }
    x = tx;
  }
  if (vem === 'B' && s >= 133.15 && s < 133.7) {   // Gurra faller ner ovanifrån i stället för att hoppa in
    const l = clamp((s - 133.15) / 0.55); y = lerp(FOT - 620, FOT, l * l); hopp = { y: 0, p2: { strack: 0.08, bred: -0.06, benY: [-30, -30] }, arm: 32 }; }
  hopp = hopp || arkHopp(s, HOPPA[0], 0.32, 34, 0.1) || arkHopp(s, HOPPA[1], 0.32, 34, 0.1) || arkHopp(s, PLASK_A, PLASK - PLASK_A, 110, 0.16);
  if (vem === 'B') for (const a of GHOPP_T) hopp = hopp || arkHopp(s, a, 0.36, 46, 0.1);
  return { x, y, syns, hopp };
}

function gest(s, vem) {
  const g = { humor: 'glad', dx: 0, dy: 0, tilt: 0 };
  if (SLUTET) {   // dansar tills raden "Brunt, brunt, brunt – mums!" (3:14), sedan vinkar alla (som v2-landet)
    g.humor = 'skrattar';
    g.rorelse = ['dansa', s - 179 + (vem === 'I' ? BEAT : 0), 4 * BEAT]; g.rorelseK = ev(s, 178, VINK, 0.4);
    const v0 = VINK + { L: 0, B: 0.25, I: 0.5 }[vem], upp = ev(s, v0, SANG_SLUT + 1, 0.4), tl = s - v0;   // en i taget, som 013
    if (upp > 0) g.vink = { armar: [0, upp * (38 + 16 * Math.sin(tl * 13 + FASV[vem]))], luta: 2 * Math.sin(tl * 7) * upp };
    return g;
  }
  if (s >= KLAPP[0] && s < KLAPP[1]) {
    const k = ev(s, ...KLAPP, 0.4), mig = solo(s) === vem;
    // klappet (Sanna 2026-11-09: "needs better clap animation"): armarna upp till bröstet, isär och snabbt ihop på varannat slag
    // (samma slag som klapp-ljudet), kroppen hoppar till och trycks ihop i smacket
    const u = (((s - takt(KLAPP[0])) / (2 * BEAT)) % 1 + 1) % 1, c = Math.sin(Math.PI * u) ** 0.6;
    g.klapp = { k, c, smack: k * Math.max(0, 1 - u / 0.16) * (u < 0.5 ? 1 : 0) }; g.humor = 'skrattar';
    g.dy = -(mig ? 16 : 9) * g.klapp.smack; g.tilt = (mig ? 4 : 2) * Math.sin(Math.PI * fas(s) / 2) * k;
  }
  if (s >= RING[0] && s < RING[1] + 0.2) { const a = 2 * Math.PI * clamp(del(...RING, s)); g.dx = 40 * Math.sin(a); g.dy += -12 * (1 - Math.cos(a)); g.tilt = 5 * Math.sin(a); g.humor = 'skrattar'; }
  if (s > HOPPA[0] - 0.15 && s < DANSA[0]) g.humor = 'skrattar';
  if (s >= DANSA[0] && s < DANSA[1]) { g.rorelse = ['dansa', s - DANSA[0] + (vem === 'I' ? BEAT : 0), 4 * BEAT]; g.rorelseK = ev(s, ...DANSA, 0.4); g.humor = 'skrattar'; }
  if (s < 135.2) g.humor = s > 133.0 ? 'skrattar' : 'glad';
  return g;
}

// ---------- kameran: raka klipp på slaget (som discot/) ----------
const narbild = vem => vem === 'I' ? [X.I + 60, FOT - 0.55 * HF.I, 2.5] : [X[vem], FOT - 0.64 * HF[vem], vem === 'B' ? 1.9 : 1.6];   // igelkotten centrerad, grodan utanför bild (runda 9 QA)   // grodan tätare (runda 9), i stället för en extra kort närbild
const KAM = SLUTET ? [[0, [W / 2, H / 2, 1]], [takt(181), [W / 2, FOT - 190, 1.3]]] : [[0, [W / 2, H / 2, 1]],
  ...SOLO.map(([a, v]) => [a, v ? narbild(v) : [W / 2, H / 2, 1]]),
  [takt(154.5), [W / 2, FOT - 190, 1.3]], [takt(156.6), [W / 2, H / 2, 1]]];
const kam0 = s => KAM.reduce((c, [a, k]) => s >= a ? k : c, KAM[0][1]);
// runda 9 ("a camera move on snurra runt"): kameran glider sakta in mot de tre under "Snurra runt!" och "Hoppa, hoppa!", rakt klipp ut på plasket
const kam = s => { if (SLUTET || s < RING[0] - 0.2 || s >= PLASK) return kam0(s);
  const q = kit.inUt(del(RING[0] - 0.2, PLASK, s)); return [W / 2, lerp(H / 2, FOT - 200, q), 1 + 0.4 * q]; };

// ---------- ljud (lågt) ----------
const L0 = s => s - K0;
if (!SLUTET) {
kit.ljud('glitter', L0(133.0), { vol: 0.25 });
Object.values(IN).flat().forEach(([a, air]) => kit.ljud('hopp-mjuk', L0(a), { vol: 0.2 }));
kit.ljud('landa-mjuk', L0(133.7), { vol: 0.3 });
for (let s = takt(KLAPP[0]); s < KLAPP[1] - 0.1; s += 2 * BEAT) kit.ljud('klapp', L0(s), { vol: 0.18 });
HOPPA.forEach(a => kit.ljud('boing', L0(a), { vol: 0.18 }));
kit.ljud('hupp', L0(PLASK_A), { vol: 0.2 }); kit.ljud('duns', L0(PLASK), { vol: 0.35 }); kit.ljud('glitter', L0(PLASK), { vol: 0.3 });
kit.ljud('jippi', L0(DANSA[0] + 0.3), { vol: 0.15 });
}
GHOPP_T.forEach(a => kit.ljud('hopp-mjuk', L0(a), { vol: 0.12 }));

const BLINK = { B: [], L: [], I: [] };
for (const v in BLINK) for (let x = K0 + 0.5 + FASV[v]; x < SANG_SLUT; x += 3.1 + 0.4 * Math.sin(x)) BLINK[v].push(x);
const BRED = { B: 0.8, L: 0.75, I: 0.85 };
// klapp-posen per figur (riggens pose2): grodan lyfter händerna till bröstet och möts mitt fram (armY), lammet (korta armar)
// och igelkotten klappar framför magen
const KLAPPA = {
  B: ({ k, c }) => ({ fram: [k, k], armar: [k * (-122 + 75 * c), k * (-122 + 75 * c)], armY: 15 * k, klapp: k * (240 - 225 * c) }),   // runda 6: "better clap for gurra": ihop på den gula magen (syns), vidöppet ut förbi kanten
  L: ({ k, c }) => ({ fram: [k, k], armar: [k * (-150 + 45 * c), k * (-150 + 45 * c)], klapp: k * (165 - 120 * c) }),
  I: ({ k, c }) => ({ fram: [k, k], armar: [k * (-138 + 26 * c), k * (-138 + 26 * c)], klapp: k * (176 - 60 * c) }) };

// danshjälpen uppe i hörnet (Sanna 2026-11-09, runda 5: "show the dance helps", "use the dance helpers from other sessions"): samma
// rörelsesymboler som första 007:s disco (../discot/, som 005 och 006): en kritdekal i övre högra hörnet med motivet ritat i kod i
// brunt (inga pilar, ingen text), slås upp på ordet och dras av när raden tar slut: tassar som klappar, en spiral för "snurra runt",
// en boll som studsar i en prickad båge för "hoppa"
const IKON_R = 64, FALL = 0.18, SYMBOL = { x: 1215, y: 150, skala: 1.3 }, SBRUN = '#A0673A', INK = '#1d1d1d';
defs.insertAdjacentHTML('beforeend', `
  <filter id="d5sken" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="d5kant" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
  <filter id="d5korn" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  1.1 0 0 0 -0.47"/></filter>
  <filter id="d5krita" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="v"/>
    <feDisplacementMap in="SourceGraphic" in2="v" scale="5" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="3" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 2.3" result="p"/>
    <feComposite in="p" in2="d" operator="in" result="pk"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
  </filter>`);
function dekal(parent) {
  const g = el('g', {}, parent), kropp = el('g', {}, g);
  el('circle', { cx: 4, cy: 8, r: IKON_R, fill: '#6B4A2E', opacity: 0.28, filter: 'url(#d5sken)' }, kropp);
  const skiva = el('g', { filter: 'url(#d5krita)' }, kropp);
  el('circle', { r: IKON_R, fill: '#fff', filter: 'url(#d5kant)' }, skiva);
  el('circle', { r: IKON_R - 11, fill: '#F3E2CC' }, skiva);
  el('circle', { r: IKON_R - 11, fill: '#000', filter: 'url(#d5korn)', opacity: 0.45 }, kropp);
  return { g, kropp, m: el('g', { filter: 'url(#kritkorn)' }, kropp) };
}
function slagUpp(q, tilt) {   // fallet in (q < 0) och fjädringen efteråt, tryckt mot sin underkant
  if (q < 0) { const k = clamp(1 + q / FALL); return { dy: -46 * (1 - k * k), rot: tilt + 10 * (1 - k), sx: 1.15 - 0.15 * k, sy: 1.15 - 0.15 * k }; }
  const f = Math.exp(-q * 9) * Math.cos(q * 28);
  return { dy: 0, rot: tilt + 5 * Math.exp(-q * 6) * Math.sin(q * 26), sx: 1 + 0.12 * f, sy: 1 - 0.14 * f };
}
const ink = { stroke: INK, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, symboler = {};
{
  let d = dekal(kit.lager.overst), m = d.m;   // hoppa: en boll som studsar i en prickad båge
  for (const x of [-30, 30]) el('path', { d: `M${x - 10} 30L${x + 10} 30`, ...ink, 'stroke-width': 5 }, m);
  el('path', { d: 'M-30 20C-26 -40 26 -40 30 20', fill: 'none', ...ink, stroke: SBRUN, 'stroke-width': 6, 'stroke-dasharray': '1 11' }, m);
  d.boll = el('circle', { r: 11, fill: SBRUN, ...ink, 'stroke-width': 4 }, m);
  symboler.hoppa = d;
  d = dekal(kit.lager.overst); m = d.m;       // snurra runt: en spiral
  let sp = ''; for (let v = 0; v <= 3.6 * Math.PI; v += 0.15) sp += `${sp ? 'L' : 'M'}${(3.5 + 4.4 * v) * Math.cos(v)} ${(3.5 + 4.4 * v) * Math.sin(v)}`;
  d.spiral = el('g', {}, m);
  el('path', { d: sp, fill: 'none', ...ink, 'stroke-width': 12 }, d.spiral);
  el('path', { d: sp, fill: 'none', ...ink, stroke: SBRUN, 'stroke-width': 6 }, d.spiral);
  symboler.snurra = d;
  d = dekal(kit.lager.overst); m = d.m;       // klappa: två tassar som slår ihop
  d.tassar = [-1, 1].map(sd => { const g = el('g', {}, m);
    el('ellipse', { cx: 0, cy: 2, rx: 14, ry: 21, fill: '#C68A55', ...ink, 'stroke-width': 4 }, g);
    el('ellipse', { cx: 0, cy: 9, rx: 7, ry: 7, fill: '#7A4A28' }, g);
    for (const [x, y] of [[-7, -9], [0, -12], [7, -9]]) el('circle', { cx: x, cy: y, r: 3.2, fill: '#7A4A28' }, g);
    return { g, sd }; });
  symboler.klappa = d;
}
const SYMBOL_TID = SLUTET ? [] : [['klappa', KLAPP[0], KLAPP[1]], ['snurra', ...RING], ['hoppa', HOPPA[0], PLASK_A]];
SYMBOL_TID.forEach(([, a]) => kit.ljud('pop', L0(a + FALL - 0.05), { vol: 0.2 }));
function brickaRita(s) {
  for (const d of Object.values(symboler)) d.g.style.display = 'none';
  for (const [namn, a, b] of SYMBOL_TID) {
    const d = symboler[namn], q = s - a - FALL, ut = del(b - 0.22, b, s);
    if (q < -FALL || s >= b) continue;
    d.g.style.display = '';
    const u = slagUpp(q, -4);
    u.dy -= mjuk(del(0.8, 1.4, q)) * 4 * Math.abs(Math.sin(fas(s) * Math.PI));   // studsar lätt i takt
    u.rot -= 25 * ut; u.sx *= 1 - ut; u.sy *= 1 - ut;
    d.g.setAttribute('transform', `translate(${SYMBOL.x} ${(SYMBOL.y + u.dy).toFixed(1)}) rotate(${u.rot.toFixed(2)}) scale(${SYMBOL.skala}) translate(0 ${IKON_R}) scale(${u.sx.toFixed(3)} ${u.sy.toFixed(3)}) translate(0 ${-IKON_R})`);
    if (d.boll) { const w = fas(s) % 2, v = w < 1 ? w : 2 - w, e = mjuk(v);
      d.boll.setAttribute('cx', lerp(-30, 30, e)); d.boll.setAttribute('cy', 18 - 46 * Math.sin(Math.PI * e)); }
    if (d.spiral) d.spiral.setAttribute('transform', `rotate(${-s * 120})`);
    if (d.tassar) { const uu = (((s - takt(KLAPP[0])) / (2 * BEAT)) % 1 + 1) % 1, c = Math.sin(Math.PI * uu) ** 0.6;   // ihop på klapp-slaget, som figurerna
      d.tassar.forEach(({ g, sd }) => g.setAttribute('transform', `translate(${sd * (14 + 8 * c)} 5) rotate(${sd * 16})`)); }
  }
}

// ---------- slutet: bilderboken som dekaler, sedan kritirisen (båda från v2-landet) ----------
// På varje "brunt" (3:07, 3:11) slås en dekal med något brunt vi sett upp stor mitt i bild och flyger till raden överst (inget chokladträd)
const A = `${kit.ROT}assets/rekvisita/`, BOK_T = [187, 187.67, 188.33, 191.2, 191.87, 192.53], B_IMG = 2 * (IKON_R - 13);
const bok = (SLUTET ? ['../lager/lastbil.png', lastbilen.NALLE, `${A}kanelbulle/cut/kanelbulle-v3.png`, `${A}choklad/cut/choklad-v7.png`,
  `${A}kola/cut/kola-kub-v2.png`, `${A}rutschkana/cut/vattenrutschbana-v2-tunn.png`] : []).map(src => {
  const d = dekal(kit.lager.overst), b = B_IMG;
  bild(new URL(src, location.href).href, d.kropp, { x: -b / 2, y: -b / 2, width: b, height: b });
  if (src === lastbilen.NALLE) lastbilen.nalleAnsikte(el('g', { transform: `translate(${-b / 2} ${-b / 2}) scale(${b / 856})` }, d.kropp)).satt('glad');
  d.g.style.display = 'none'; return d.g; });
if (SLUTET) { BOK_T.forEach(a => { kit.ljud('plupp', L0(a), { vol: 0.22 }); kit.ljud('glitter', L0(a + 0.05), { vol: 0.1 }); });   // runda 8: glitter på varje dekal
  kit.ljud('jippi', L0(VINK + 0.2), { vol: 0.16 }); }   // och ett jippi när alla vinkar
// runda 7: "match outro circle better to face", "tone in music a little bit earlier": mitt på ansiktet (ögon y 260–279, kinder 370 i riggen)
// och sluten på sångens sista ton (200,0 s, mätt i v2/sang.m4a)
const IRIS = [197.0, 198.2, 199.4, 200.0], IRIS_R = 140, GLINT = IRIS[3] - 0.05;
const iris = el('path', { fill: '#000', 'fill-rule': 'evenodd' }, kit.lager.overst);
const irisKant = el('path', { fill: 'none', stroke: '#fff8e0', 'stroke-linejoin': 'round' }, el('g', { filter: 'url(#boil)' }, kit.lager.overst));
const glimt = el('path', { d: 'M0 -1 L.16 -.16 L1 0 L.16 .16 L0 1 L-.16 .16 L-1 0 L-.16 -.16Z', fill: '#fff8e0', opacity: 0 }, kit.lager.overst);
if (SLUTET) kit.ljud('glitter', L0(IRIS[0]), { vol: 0.3 });
const skarm = ([x, y]) => { const p = new DOMPoint(x, y).matrixTransform(kit.lager.overst.getCTM().inverse().multiply(kit.lager.figurer.getCTM())); return [p.x, p.y]; };
function slutRita(s) {
  bok.forEach((g, i) => {   // först stor mitt i bild, sedan liten på sin plats i raden
    const a = BOK_T[i], m = mjuk(del(a + 0.3, a + 0.68, s)), k = (s < a ? 0 : 1 - Math.exp(-7 * (s - a)) * Math.cos(16 * (s - a))) * (1 - mjuk(del(IRIS[0], IRIS[0] + 0.5, s)));
    g.style.display = k > 0.01 ? '' : 'none';
    const x = lerp(W / 2, W * (0.14 + 0.144 * i), m), y = lerp(H * 0.42, (i % 2 ? 96 : 120) + 5 * Math.sin(2 * Math.PI * s / 1.7 + i), m);
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(i % 2 ? 4 : -4) * m}) scale(${(k * lerp(2.6, 1.05, m)).toFixed(3)})`);
  });
  if (s < IRIS[0]) { iris.setAttribute('d', ''); irisKant.setAttribute('d', ''); return; }
  const [ix, iy] = skarm(fig.B.f.punkt([512, 320]));   // irisen runt grodans ansikte
  const ir = s < IRIS[1] ? lerp(1220, IRIS_R, mjuk(del(IRIS[0], IRIS[1], s))) : lerp(IRIS_R, 0, mjuk(del(IRIS[2], IRIS[3], s)));
  const ring = 'M' + Array.from({ length: 145 }, (_, i) => {
    const a = i / 144 * 2 * Math.PI, rr = ir * (1 + 0.07 * Math.sin(9 * a + s * 0.8));
    return `${(ix + rr * Math.cos(a)).toFixed(1)} ${(iy + rr * Math.sin(a)).toFixed(1)}`;
  }).join('L') + 'Z';
  iris.setAttribute('d', `M-50 -50H${W + 50}V${H + 50}H-50Z ${ring}`);
  irisKant.setAttribute('d', ir > 1 ? ring : ''); irisKant.setAttribute('stroke-width', Math.min(14, ir / 4));
  const gl = s >= GLINT ? Math.sin(Math.PI * clamp((s - GLINT) / (SANG_SLUT - GLINT))) : 0;
  glimt.setAttribute('transform', `translate(${ix} ${iy}) rotate(${30 * gl}) scale(${40 * mjuk(gl)})`); glimt.setAttribute('opacity', gl);
}

const yAt = (s, vem) => { const st = stall(s, vem); return st.y + gest(s, vem).dy + (st.hopp ? st.hopp.y : 0); };
const GNISTA = [];   // [tid, vem, k = klapp | l = landning]
if (!SLUTET) for (let s = takt(KLAPP[0]); s < KLAPP[1] - 0.1; s += 2 * BEAT) (solo(s) ? [solo(s)] : ['L', 'B', 'I']).forEach(v => GNISTA.push([s, v, 'k']));
for (const v in LANDA) LANDA[v].forEach(([a]) => a !== PLASK && GNISTA.push([a, v, 'l']));
function render(t) {
  const s = t + K0;
  ljusRita(s);
  brickaRita(s);
  const [kx, ky, kz] = kam(s), sh = skak(s);
  kit.kamera(kx, ky + sh, kz * (sh ? 1.012 : 1), false, true);
  for (const vem of ['L', 'I', 'B']) {
    const { f, sk } = fig[vem], st = stall(s, vem);
    if (!st.syns) { f.pose({ synlig: false }); sk.style.display = 'none'; continue; }
    const g = gest(s, vem), o = { x: st.x + g.dx, y: st.y + g.dy, tilt: g.tilt, humor: g.humor, blink: kit.blink(s, BLINK[vem]) };
    let p2 = {};
    if (g.rorelse) { o.rorelse = g.rorelse; o.rorelseK = g.rorelseK; }
    if (g.klapp) p2 = { ...KLAPPA[vem](g.klapp), strack: -0.05 * g.klapp.smack, bred: 0.04 * g.klapp.smack };
    if (st.hopp) { o.y += st.hopp.y; p2 = { ...p2, ...st.hopp.p2 }; if (!g.rorelse && !g.klapp) p2.armar = [st.hopp.arm, st.hopp.arm]; }
    if (g.vink) Object.assign(p2, g.vink);
    if (g.humor === 'skrattar') o.m = munSlag(s);
    if (!g.rorelse && !g.klapp && !st.hopp && !g.vink) o.tilt += 1.5 * Math.sin(2 * Math.PI * (s / 2.4 + FASV[vem]));   // gungar lite när den står still
    const w = st.hopp ? 0 : studs(s, vem);
    if (w) p2 = { ...p2, strack: (p2.strack || 0) + 0.06 * w, bred: (p2.bred || 0) - 0.05 * w };
    if (vem === 'L') {   // öron och svans släpar efter (hastigheten en stund bakåt), viks ner i landningen
      const vy = (yAt(s - 0.04, vem) - yAt(s - 0.09, vem)) / 0.05, ora = clamp(-vy * 0.025, -18, 22) + 10 * w, fl = 4 * Math.sin(2 * Math.PI * fas(s) / 2);
      p2 = { ...p2, oron: [ora + fl, ora - fl], svans: (g.rorelse ? 14 * Math.sin(Math.PI * fas(s)) * g.rorelseK : 3 * Math.sin(s * 3)) + 0.6 * ora };
    }
    if (Object.keys(p2).length) o.pose2 = p2;
    f.pose(o);
    const luft = clamp((FOT - o.y) / 200), k = 1 - 0.5 * luft;   // varm brun skugga som krymper och bleknar i luften
    sk.style.display = ''; sk.setAttribute('cx', st.x + g.dx); sk.setAttribute('cy', FOT - 4); sk.setAttribute('opacity', 0.3 * (1 - 0.5 * luft));
    sk.setAttribute('rx', BRED[vem] * HF[vem] * 0.7 / 2 * k); sk.setAttribute('ry', 16 * k);
  }
  // gnistor: där tassarna möts på klappen, vid fötterna på landningarna
  let n = 0;
  for (const [a, vem, typ] of GNISTA) {
    const u = s - a; if (u < 0 || u > 0.5) continue;
    const [cx, cy] = typ === 'k' ? fig[vem].f.punkt([512, 560]) : [stall(a, vem).x, FOT - 12];
    for (let i = 0; i < 6 && n < gnistor.length; i++, n++) {
      const ang = typ === 'k' ? 2 * Math.PI * (i + 0.5) / 6 : Math.PI * (1.1 + 0.8 * i / 5), v = 170 + 30 * (i % 3), r = (9 + 3 * (i % 2)) * (1 - u / 0.5);
      gnistor[n].style.display = ''; gnistor[n].setAttribute('transform', `translate(${(cx + Math.cos(ang) * v * u).toFixed(1)} ${(cy + Math.sin(ang) * v * u + 120 * u * u).toFixed(1)}) rotate(${(i * 30 + 90 * u).toFixed(0)}) scale(${r.toFixed(2)})`);
    }
  }
  for (; n < gnistor.length; n++) gnistor[n].style.display = 'none';
  // glitter runt fötterna efter "Plask!"
  const u = s - PLASK;
  glitter.forEach((e, i) => {
    if (u < 0 || u > 0.9) { e.style.display = 'none'; return; }
    const vem = 'LBI'[i % 3], ang = Math.PI * (1.05 + 0.9 * ((i * 7) % 6) / 5), v = 230 + 60 * (i % 4);
    const x = X[vem] + Math.cos(ang) * v * u, y = FOT - 20 + Math.sin(ang) * v * u + 260 * u * u, r = (20 + 8 * (i % 3)) * (1 - u / 0.9);
    e.style.display = ''; e.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(40 * u + i * 20).toFixed(0)}) scale(${r.toFixed(2)})`);
  });
  slutRita(s);
}

kit.kor(render, SLUT, { sang: [K0, SANG_SLUT] });
})();
