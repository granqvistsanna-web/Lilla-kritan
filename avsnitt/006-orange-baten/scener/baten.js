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
// armarnas vridpunkt och vilans riktning (grader, y nedåt) ur dinon-disa-rigg-lemmar.json: de ritade armarna hänger rakt ner
const PIV = { r: [765, 545], l: [252, 545] }, VILA = { r: 90, l: 90 }, ARM_K = 1;
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
  b.skarm = pt => d.skarm(pt);
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

// Öar som glider förbi på horisonten (Sanna, 2026-11-05: "to show that boat is traveling forward add some island or stuff in bg").
// Gröna kullar med runda träd och en liten segelbåt, ritade i kod med vit kant och lite vinglig (kritkant). Inget orange: det är
// det barnet letar efter. Längre bort = långsammare (parallax). Läggs i plattan före bagar(), så att vågbågarna ligger framför.
//   const o = baten.oar(L.plate);   o.rita(s, t)   // s = sträckan vattnet har glidit (px, samma som bagar), t = tiden (gupp)
const ISLAR = [   // x, bredd, höjd, träd [x, storlek], parallax (andel av vattnets fart)
  { x: 1050, w: 420, h: 92, trad: [[-110, 1.4], [0, 1.75], [115, 1.25]], d: 0.42 },
  { x: 1700, w: 210, h: 50, trad: [[15, 1.05]], d: 0.3 },
  { x: 2350, w: 330, h: 76, trad: [[-60, 1.4], [70, 1.5]], d: 0.36 },
  { x: 650, segel: true, d: 0.34 },
], OAR_VARV = W + 1300;
function oar(parent, { y0 = 448 } = {}) {
  const defs = document.querySelector('svg defs');
  if (!defs.querySelector('#okorn')) defs.insertAdjacentHTML('beforeend', `
    <filter id="okorn" filterUnits="userSpaceOnUse" x="-200" y="0" width="${W + 400}" height="${H}">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="6"/>
    </filter>`);
  const g = el('g', { filter: 'url(#okorn)' }, parent), kant = { stroke: '#fff', 'stroke-width': 7, 'stroke-linejoin': 'round' };
  const ar = ISLAR.map(o => {
    const og = el('g', {}, g);
    if (o.segel) {   // en liten segelbåt långt borta: blått skrov, vitt segel
      el('path', { d: 'M-26 -10 L26 -10 L18 4 L-18 4Z', fill: '#3f7fb6', ...kant, 'stroke-width': 5 }, og);
      el('path', { d: 'M-2 -12 L-2 -62 L22 -14Z', fill: '#fbf8ef', ...kant, 'stroke-width': 5 }, og);
    } else {
      const { w, h } = o, topp = x => -h * 0.75 * (1 - (2 * x / w) ** 2);   // kullens överkant ungefär (bezierkurvan)
      for (const [tx, k] of o.trad) {   // trädet bakom kullens kant: brun stam och en rund krona
        const fy = topp(tx) + 6;
        el('rect', { x: tx - 4 * k, y: fy - 30 * k, width: 8 * k, height: 30 * k, fill: '#8a5a35' }, og);
        el('circle', { cx: tx, cy: fy - 38 * k, r: 22 * k, fill: '#5f9e4a', ...kant, 'stroke-width': 5 }, og);
      }
      el('path', { d: `M${-w / 2} 6 C${-w * 0.35} ${-h} ${w * 0.35} ${-h} ${w / 2} 6Z`, fill: '#8cc35f', ...kant }, og);
    }
    el('path', { d: `M${-(o.w || 60) * 0.55} 6 Q${-(o.w || 60) * 0.27} 1 0 6 T${(o.w || 60) * 0.55} 6`, fill: 'none', stroke: '#E6F5FC', 'stroke-width': 5, 'stroke-linecap': 'round' }, og);   // vågkammen vid stranden
    return { o, og };
  });
  return {
    g,
    rita(s = 0, t = 0) {
      ar.forEach(({ o, og }, i) => {
        const x = (((o.x - s * o.d) % OAR_VARV) + OAR_VARV) % OAR_VARV - 450;
        og.setAttribute('transform', `translate(${x.toFixed(1)} ${(y0 + (o.segel ? 1.5 * Math.sin(t * 1.7 + i) : 0)).toFixed(1)})${o.segel ? ' scale(1.6)' : ''}`);
      });
    },
  };
}

window.baten = { ny, disa, vagor, bagar, oar, peka, TOPP, DISA_K, DISA_X, DISA_Y, BB };
})();
