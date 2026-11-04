// Solen som kritan ritar i avsnitt 004, i vaxkrita med kodansikte. Vanligt skript, allt hamnar i window.kritSol.
// Samma sol används i kritan-ritar och på himlen i körscen 1, så att klippet mellan dem inte syns:
//   const sol = kritSol(forelder);           // en <g> i ett <svg>; filtret läggs i det svg:ets <defs>
//   sol.satt(x, y, skala, vrid);             // mitten i bild; skala 1 = radie 150 px. Vid klippet: kritSol.HIMMEL
//   sol.rita({ kant, fyll, stralar, ansikte, blink });   // allt 0..1 (stralar: ett tal eller en lista med 12), standard allt klart
(() => {
const NS = 'http://www.w3.org/2000/svg';
const R = 150, N = 12, GUL = '#f5c62e', STRALE = '#f0a92a', INK = '#1d1d1d';
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const clamp = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k));
const lerp = (a, b, k) => a + (b - a) * k;
// samma lite skeva cirkel som hjulet i avsnitt 003
const vingel = th => 1 + 0.03 * Math.sin(2 * th + 1.3) + 0.015 * Math.sin(3 * th + 0.4);
function spiralD(r0, r1, varv, a0, n = 240) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const u = i / n, th = a0 + varv * 2 * Math.PI * u, r = lerp(r0, r1, u) * vingel(th);
    d += (i ? 'L' : 'M') + (r * Math.cos(th)).toFixed(1) + ' ' + (r * Math.sin(th)).toFixed(1);
  }
  return d;
}
// strålarnas vinklar: 0 rakt upp, sedan medurs
const VINKEL = Array.from({ length: N }, (_, i) => -Math.PI / 2 + i * 2 * Math.PI / N);
const STRALE_R = [R + 38, R + 96];

function kritSol(forelder) {
  const svg = forelder.ownerSVGElement || forelder;
  let defs = svg.querySelector('defs') || el('defs', {}, svg);
  if (!svg.querySelector('#sol-vax')) defs.insertAdjacentHTML('beforeend', `
    <filter id="sol-vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`);
  const g = el('g', {}, forelder);
  const vax = p => el('g', { transform: 'rotate(28)' }, el('g', { filter: 'url(#sol-vax)' }, el('g', { transform: 'rotate(-28)' }, p)));
  const s = { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' };

  // strålarna (bakom skivan), var och en i en egen grupp som kan poppa
  const stralar = VINKEL.map(v => {
    const pop = el('g', {}, g), [a, b] = STRALE_R;
    const d = `M${(a * Math.cos(v)).toFixed(1)} ${(a * Math.sin(v)).toFixed(1)}L${(b * Math.cos(v)).toFixed(1)} ${(b * Math.sin(v)).toFixed(1)}`;
    const vit = el('path', { ...s, d, stroke: '#fff', 'stroke-width': 36 }, pop);
    const p = el('path', { ...s, d, stroke: STRALE, 'stroke-width': 24 }, vax(pop));
    return { pop, vit, p, v, langd: b - a };
  });
  // skivan: en vit kant (klistermärket) under kanten, sedan kanten och fyllnaden som spiralar inåt
  const kantD = spiralD(R - 6, R - 6, 1.04, -1.9);
  const rand = el('path', { ...s, d: kantD, stroke: '#fff', 'stroke-width': 50 }, g);
  const skiva = vax(g);
  const kant = el('path', { ...s, d: kantD, stroke: GUL, 'stroke-width': 26 }, skiva);
  const fyll = el('path', { ...s, d: spiralD(R - 22, 6, 4.2, -1.9 + 1.04 * 2 * Math.PI), stroke: GUL, 'stroke-width': 54 }, skiva);
  rand.L = kant.L = kant.getTotalLength();
  for (const p of [rand, kant, fyll]) { p.L = p.getTotalLength(); p.setAttribute('stroke-dasharray', `${p.L} ${p.L + 1}`); }

  // ansiktet i kod: två ögon och ett leende
  const ansikte = el('g', {}, g);
  const ogon = [-50, 50].map(x => el('ellipse', { cx: x, cy: -24, rx: 13, ry: 17, fill: INK }, el('g', { transform: `translate(${x} -24)` }, ansikte)));
  const mun = el('path', { ...s, d: 'M-62 28 Q0 88 62 28', stroke: INK, 'stroke-width': 11 }, ansikte);
  mun.L = mun.getTotalLength(); mun.setAttribute('stroke-dasharray', `${mun.L} ${mun.L + 1}`);
  const kinder = [-92, 92].map(x => el('circle', { cx: x, cy: 22, r: 20, fill: '#f28d3c', opacity: 0 }, ansikte));

  const sol = {
    g, R, VINKEL, STRALE_R,
    // var spetsen på kritan är när den ritar: 'kant' / 'fyll' / strålen i (0..11), k 0..1, i solens egna koordinater
    spets(vad, k, i) {
      if (vad === 'strale') { const v = VINKEL[i], r = lerp(STRALE_R[0], STRALE_R[1], clamp(k)); return [r * Math.cos(v), r * Math.sin(v)]; }
      const p = (vad === 'kant' ? kant : fyll), q = p.getPointAtLength(p.L * clamp(k)); return [q.x, q.y];
    },
    satt(x, y, skala = 1, vrid = 0) {
      g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${vrid.toFixed(2)}) scale(${skala.toFixed(4)})`);
    },
    // stralar: 0..1 ritas fram inifrån (kritan), eller { pop } 0..1.4 poppar ut med översväng
    rita({ kant: k = 1, fyll: f = 1, stralar: st = 1, ansikte: a = 1, blink = 0 } = {}) {
      kant.setAttribute('stroke-dashoffset', (kant.L * (1 - clamp(k))).toFixed(1));
      fyll.setAttribute('stroke-dashoffset', (fyll.L * (1 - clamp(f))).toFixed(1));
      rand.setAttribute('stroke-dashoffset', (rand.L * (1 - clamp(k))).toFixed(1));
      stralar.forEach((s, i) => {
        const v = Array.isArray(st) ? st[i] : st;
        if (typeof v === 'object') {           // pop: växer ut från skivan
          const p = v.pop, sk = Math.max(0, p);
          s.pop.style.display = p > 0 ? '' : 'none';
          for (const e of [s.vit, s.p]) e.removeAttribute('stroke-dashoffset'), e.setAttribute('stroke-dasharray', 'none');
          const mx = STRALE_R[0] * Math.cos(s.v), my = STRALE_R[0] * Math.sin(s.v);
          s.pop.setAttribute('transform', `translate(${mx.toFixed(1)} ${my.toFixed(1)}) scale(${sk.toFixed(3)}) translate(${-mx.toFixed(1)} ${-my.toFixed(1)})`);
        } else {                               // ritas fram av kritan, inifrån och ut
          s.pop.style.display = v > 0 ? '' : 'none';
          s.pop.removeAttribute('transform');
          for (const e of [s.vit, s.p]) { e.setAttribute('stroke-dasharray', `${s.langd} ${s.langd + 40}`); e.setAttribute('stroke-dashoffset', (s.langd * (1 - clamp(v))).toFixed(1)); }
        }
      });
      ansikte.style.display = a > 0 ? '' : 'none';
      const ogonK = clamp(a / 0.4), munK = clamp((a - 0.3) / 0.7);
      ogon.forEach(o => o.parentNode.setAttribute('transform', o.parentNode.getAttribute('transform').replace(/ scale\(.*$/, '') + ` scale(${ogonK.toFixed(3)} ${(ogonK * (1 - 0.9 * blink)).toFixed(3)})`));
      mun.setAttribute('stroke-dashoffset', (mun.L * (1 - munK)).toFixed(1));
      kinder.forEach(c => c.setAttribute('opacity', (0.45 * munK).toFixed(3)));
    },
  };
  sol.rita();
  return sol;
}
// Solens plats på himlen i körscen 1, där zoomen landar (första rutan i körscen 1).
kritSol.HIMMEL = { x: 215, y: 175, skala: 0.45, vrid: 0 };
window.kritSol = kritSol;
})();
