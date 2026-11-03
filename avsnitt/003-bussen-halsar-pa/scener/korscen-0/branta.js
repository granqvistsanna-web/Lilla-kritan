// Branta kritbackar för refrängklippen (korscen-0 och sista-refrangen). Läses in efter kit.js; allt hamnar i window.branta.
// Samma kritkorn och vita kant som kit.backar, men profilen är en funktion som ritas om varje bild,
// så att vägen kan rulla förbi (lägg till `off` i funktionen). Allt i bildkoordinater, 1920×1080.
(() => {
const { el } = kit;
const UTE = -140, SLUT = 2060;

// y(x) som en kritlinje / en fylld kulle under linjen
const linje = (f, steg = 16) => { let d = ''; for (let x = UTE; x <= SLUT; x += steg) d += (d ? ' L' : 'M') + x + ' ' + f(x).toFixed(1); return d; };
const yta = f => linje(f) + ` L${SLUT} 1300 L${UTE} 1300Z`;
// vägens lutning i grader vid x (för fordonens tilt)
const grader = (f, x) => Math.atan((f(x + 6) - f(x - 6)) / 12) * 180 / Math.PI;

function backar(forelder) {
  const defs = forelder.ownerSVGElement.querySelector('defs');
  if (!defs.querySelector('#brantkorn')) defs.insertAdjacentHTML('beforeend', `
    <filter id="brantkorn" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" result="v"/>
      <feDisplacementMap in="SourceGraphic" in2="v" scale="10" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 3.0" result="p"/>
      <feComposite in="p" in2="d" operator="in" result="pk"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
    </filter>`);
  const g = el('g', {}, forelder);
  el('rect', { x: -200, y: -200, width: 2320, height: 1480, fill: '#b1e0ee' }, g);
  const k = el('g', { filter: 'url(#brantkorn)' }, g);
  const rand = { stroke: '#fff', 'stroke-width': 14, 'stroke-linejoin': 'round' };
  // sol och två moln, högt upp
  el('circle', { cx: 1690, cy: 165, r: 78, fill: '#f2eaa1', ...rand }, k);
  const moln = [[380, 170, 1], [1120, 120, 0.8]].map(([x, y, s]) => {
    const m = el('g', {}, k);
    for (const [dx, dy, r] of [[-70, 10, 46], [0, -14, 62], [72, 8, 44]]) el('circle', { cx: dx * s, cy: dy * s, r: r * s, fill: '#fbfaf4', ...rand }, m);
    return { m, x, y };
  });
  const bort = el('path', { fill: '#cfe8a4', ...rand }, k);
  const mitt = el('path', { fill: '#a9d77a', ...rand }, k);
  const kulle = el('path', { fill: '#8cc35f', ...rand }, k);
  const vag = el('path', { fill: 'none', stroke: '#f7f3ea', 'stroke-width': 40, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, k);
  const streck = el('path', { fill: 'none', stroke: '#8e8e8a', 'stroke-width': 5, 'stroke-dasharray': '26 22', 'stroke-linecap': 'round' }, k);
  // rita({ vag, bort, mitt, off }): tre profiler (y som funktion av bild-x). off flyttar vägstrecken och molnen.
  const rita = ({ vag: f, bort: fb, mitt: fm, off = 0 }) => {
    bort.setAttribute('d', yta(fb));
    mitt.setAttribute('d', yta(fm));
    kulle.setAttribute('d', yta(x => f(x) - 18));
    const d = linje(f);
    vag.setAttribute('d', d);
    streck.setAttribute('d', d);
    streck.setAttribute('stroke-dashoffset', off);
    moln.forEach(({ m, x, y }) => m.setAttribute('transform', `translate(${((x - off * 0.05) % 2300 + 2300) % 2300 - 190} ${y})`));
  };
  return { g, rita };
}

// Profiler. Den stora branta backen mitt i bild (krön i x 960, y 460), lite skev: brantare ner till höger.
const BACKE = x => 1000 - 540 * Math.exp(-Math.pow((x - 960) / (x < 960 ? 430 : 370), 2));
const BORT = (x, off = 0) => 610 - 110 * Math.sin(2 * Math.PI * (x + off * 0.25 + 200) / 900) - 45 * Math.sin(2 * Math.PI * (x + off * 0.25) / 410);
const MITT = (x, off = 0) => 760 - 150 * Math.sin(2 * Math.PI * (x + off * 0.5 - 100) / 1300);
// berg-och-dalbana: pucklar med 1250 px mellanrum; krön där (x + off) = 312,5 + 1250·n
const DAL = (x, off = 0) => 820 - 150 * Math.sin(2 * Math.PI * (x + off) / 1250) - 30 * Math.sin(2 * Math.PI * (x + off) / 530 + 1);
// nästan plan väg (närbilder): fötterna i y 978 i x 900, som i körscenerna
const PLAN = (x, off = 0) => 964 + 7 * Math.sin(2 * Math.PI * (x + off) / 1700);

window.branta = { backar, grader, BACKE, BORT, MITT, DAL, PLAN };
})();
