// Orange båten med Dinon Disa i, som båten() i storyboard/bygg.py (efter 005:s bilen.js). Vanligt skript efter kit.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../ansikten.js"></script><script src="../baten.js"></script>
//
//   const b = await baten.ny(parent, { vit: true, kontur: true });
//   b.pose({ x, y, h, tilt, gung,               // x = mitten, y = skrovets underkant, h = hela bildens höjd (som place() i bygg.py)
//            humor, titt, tittY, blink,          // Disas ansikte (ansikten.js)
//            r: [x, y], l: [x, y],              // en punkt i Disas 1024-ruta som armen pekar mot (utan: armen vilar på relingen)
//            rot, lyft, kontur })               // rot = Disa lutar (grader), lyft = Disa högre i båten, kontur = den mörkorange konturen
//   b.punkt([px, py]) → var en punkt i Disas 1024-ruta hamnar i bild (efter pose)
//   baten.vagor(parent, y0) → { rita(t, fart) } vattnet med vita vågkammar framför skrovets nederkant
// Lagren bakifrån: bortre relingen, flaggan och motorn → Disa (kroppen, västen, ansiktet, armarna framför) → skrovet → konturen.
// Bilderna ligger i lager/ (gor-lager.py tar ut dem ur storyboarden, platshållarna i kod tills assets finns).
(() => {
const { el, bild, ROT } = kit;
const LAGER = new URL('lager/', document.currentScript.src).href;
const TOPP = 300, DISA_K = 0.6, DISA_X = 520, DISA_Y = 700;   // bygg.py: Disas (512, 926) på båtens (520, 700), skala 0,6
const BB = [21, 236, 992, 807];                                 // hela båten med Disa i vila, i båtens 1024-ruta (utan TOPP)
// armarnas vridpunkt och vilans riktning (grader, y nedåt) ur riggen; armarna är förlängda 1,4× som i storyboarden
const PIV = { r: [803, 565], l: [209, 576] }, VILA = { r: 71, l: 104 }, ARM_K = 1.4;
let n = 0;

function filtren(defs) {
  if (defs.querySelector('#vitkant')) return;
  defs.insertAdjacentHTML('beforeend', `
    <filter id="vitkant" x="-5%" y="-5%" width="110%" height="110%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d"/>
      <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="vitarm" x="-30%" y="-30%" width="160%" height="160%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d"/>
      <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`);
}

// Vinkeln (SVG, medurs) som riktar armen mot punkten p i Disas 1024-ruta
const peka = (s, p) => Math.atan2(p[1] - PIV[s][1], p[0] - PIV[s][0]) * 180 / Math.PI - VILA[s];

// Disa på egna ben eller i båten: kit.figur med västen och ansikten.js. Armarna framför kroppen, förlängda, med vit kant.
async function disa(parent, opt = {}) {
  filtren(document.querySelector('svg defs'));
  const f = await kit.figur('dinon-disa', { forelder: parent, ...opt });
  bild(`${LAGER}vast.png`, f.kropp);
  const a = ansikten.iFigur(f);
  for (const s of 'rl') f.delar[`arm-${s}`].setAttribute('filter', 'url(#vitarm)');
  const pose0 = f.pose;
  f.pose = (p = {}) => {
    const delar = { ...(p.delar || {}) };
    for (const s of 'rl') delar[`arm-${s}`] = [p[s] ? peka(s, p[s]) : (p.ben === false ? 0 : 0), 0, 0, ARM_K];
    if (p.ben === false) { delar['leg-l'] = (px, py) => 'scale(0)'; delar['leg-r'] = delar['leg-l']; }
    pose0({ ...p, delar });
    a.satt(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink || 0 });
  };
  f.pose();
  return f;
}

async function ny(parent, { vit = false, kontur = false } = {}) {
  filtren(document.querySelector('svg defs'));
  const id = `bat${++n}`;
  const g = el('g', { id }, parent), inre = el('g', vit ? { filter: 'url(#vitkant)' } : {}, g);
  bild(`${LAGER}insida.png`, inre);
  const dg = el('g', {}, inre);
  const d = await disa(dg, { s: DISA_K });
  bild(`${LAGER}skrov.png`, inre);
  const konturEl = kontur ? bild(`${LAGER}bat-kontur.png`, inre, { y: -TOPP, height: 1024 + TOPP }) : null;
  const fot = [(BB[0] + BB[2]) / 2, BB[3]];
  const b = { id, g, disa: d };
  b.pose = (p = {}) => {
    const s = (p.h ?? 470) / (BB[3] - BB[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    if (konturEl) konturEl.style.display = p.kontur === false ? 'none' : '';
    g.setAttribute('transform', `translate(${p.x ?? 459} ${p.y ?? 735}) rotate(${p.tilt || 0}) scale(${s * (p.flip ? -1 : 1)} ${s}) translate(${-fot[0]} ${-fot[1]})`);
    dg.setAttribute('transform', `rotate(${-(p.rot || 0)} ${DISA_X} ${DISA_Y - 60})`);
    d.pose({ ...p, x: DISA_X + (573.5 - 512) * DISA_K, y: DISA_Y - (p.lyft || 0), s: DISA_K, ben: false, tilt: 0, k: 1, h: undefined, synlig: true });
  };
  b.punkt = pt => d.punkt(pt);
  b.pose();
  return b;
}

// Vatten framför skrovets nederkant: en blå yta med en vit vågkam som rör sig åt vänster (fart px/s).
function vagor(parent, y0, { x0 = -40, x1 = W + 40, farg = '#56A8D6' } = {}) {
  const g = el('g', {}, parent);
  const yta = el('path', { fill: farg }, g), kam = el('path', { fill: 'none', stroke: '#E6F5FC', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  return {
    g,
    rita(t, fart = 120, y = y0) {
      let d = '';
      for (let x = x0; x <= x1; x += 12) d += `${d ? 'L' : 'M'}${x} ${(y + 6 * Math.sin((x + fart * t) / 38) + 2 * Math.sin(t * 3)).toFixed(1)} `;
      kam.setAttribute('d', d);
      yta.setAttribute('d', d + `L${x1} ${H + 20} L${x0} ${H + 20}Z`);
    },
  };
}

// Vita vågbågar på vattnet som glider åt vänster (körscenen). Ritas över plåten, under båten.
function bagar(parent, { y0 = 440, n = 46, seed = 3 } = {}) {
  const g = el('g', { opacity: 0.85 }, parent), rnd = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(seed);
  const b = Array.from({ length: n }, () => {
    const y = y0 + rnd() * (H - y0), r = 14 + (y - 430) / 14;
    return { x: rnd() * W, r, el: el('path', { d: `M${-r} 0 Q0 ${-r * 0.55} ${r} 0`, fill: 'none', stroke: '#D7EEF8', 'stroke-width': 4, 'stroke-linecap': 'round', transform: '' }, g), y };
  });
  return { g, rita(t, fart = 120) { b.forEach(o => o.el.setAttribute('transform', `translate(${(((o.x - fart * t * (0.4 + (o.y - 430) / 500)) % (W + 80)) + W + 80) % (W + 80) - 40} ${o.y})`)); } };
}

window.baten = { ny, disa, vagor, bagar, peka, TOPP, DISA_K, DISA_X, DISA_Y, BB };
})();
