// Outrot till Gissa teckningen-mixarna (16:9), i formatets stil (format/intro-outro.md, som 003:s outro):
// tomt papper, tre av temats figurer tittar upp vid nederkanten och vinkar (vaggar, snurrar aldrig), sjunker ner igen,
// och sedan poppar logotypen fram stort, en bokstav i taget, med ett pop per bokstav och ett pling när den är klar.
// Under ligger Shortsens musik (gissa-bad), som tonas ut. Outrojingeln finns inte än (sv och en), så ingen röst och
// ingen jingel här; den läggs till när den finns.
// Varje mapp har outro/index.html som sätter window.TITT (figurerna) och laddar den här filen.
// ?en: tiny crayon tv. Rendering: node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/mix/gissa-<tema>-liggande/outro [--en]
(() => {
const EN = new URLSearchParams(location.search).has('en');
const DURATION = 8.0, TITT = [0.3, 3.5], LOGO_T = 3.4;
const F = { rod: '#df342f', orange: '#f28d3c', gron: '#4fae4a', turkos: '#2fb3b5', lila: '#8e44c9', rosa: '#e93c8f', bla: '#3b8fe0' };
// logotypens bokstäver och färger, som i introt och 003:s outro (baslinje y 0, x-höjd 100)
const GLYF = {
  l: { d: 'M20 -182 Q17 -90 19 -20 Q20 2 36 -4', b: 44 },
  i: { d: 'M16 -98 Q14 -50 16 0', b: 32, prick: [16, -150] },
  a: { d: 'M74 -78 Q58 -106 32 -98 Q2 -88 4 -46 Q6 -2 36 -2 Q64 -2 74 -40 M76 -100 Q74 -50 78 0', b: 92 },
  k: { d: 'M16 -182 Q14 -90 16 0 M70 -100 Q40 -70 20 -46 Q46 -28 74 0', b: 82 },
  r: { d: 'M16 -98 Q14 -50 16 0 M16 -56 Q26 -100 66 -94', b: 70 },
  t: { d: 'M32 -158 Q30 -80 32 -22 Q34 2 58 -6 M6 -100 Q34 -103 62 -98', b: 66 },
  n: { d: 'M16 -98 Q14 -50 16 0 M16 -62 Q28 -104 56 -100 Q80 -96 79 -58 Q78 -30 80 0', b: 96 },
  o: { d: 'M48 -98 Q8 -100 6 -50 Q4 -2 46 -2 Q86 -2 86 -50 Q86 -98 48 -98', b: 92 },
  c: { d: 'M74 -84 Q58 -102 36 -98 Q4 -90 4 -48 Q6 -2 38 -2 Q62 -2 76 -18', b: 80 },
  v: { d: 'M6 -98 Q24 -50 42 0 Q60 -50 78 -98', b: 84 },
  y: { d: 'M6 -98 Q22 -60 42 -14 M80 -98 Q58 -40 40 6 Q26 50 4 56', b: 86 },
};
const LOGO = EN ? 'tiny crayon tv' : 'lilla kritan', LOGO_S = EN ? 1.3 : 1.5, LOGO_BAS = 640;
const LOGO_FARG = [F.rod, F.orange, F.gron, F.turkos, F.lila, F.rosa, F.bla, F.rod, F.orange, F.gron, F.lila];

const NS = 'http://www.w3.org/2000/svg';
const el = (n, a, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
const clamp = x => Math.max(0, Math.min(1, x)), del = (a, b, t) => clamp((t - a) / (b - a));
const inUt = x => x < 0.5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x);

document.body.style.cssText = 'margin:0;background:#FBF7EE;overflow:hidden';
const svg = el('svg', { viewBox: '0 0 1920 1080', preserveAspectRatio: 'xMidYMid slice', style: 'position:absolute;inset:0;width:100vw;height:100vh;display:block' }, document.body);
svg.innerHTML = `<defs>
  <filter id="korn" x="0" y="0" width="1" height="1">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  1.1 0 0 0 -0.47"/>
  </filter>
  <filter id="vax" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
    <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
    <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
    <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
    <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs>
<rect width="1920" height="1080" fill="#FBF7EE"/><rect width="1920" height="1080" filter="url(#korn)"/>`;

// figurerna: lagren i samma 1024-ruta som i Shortsen; topp/botten = figurens del av rutan (alfakanalens gränser)
const S = 0.5, X = [420, 960, 1500];
const figurer = window.TITT.map((f, i) => {
  const g = el('g', {}, svg), v = el('g', {}, g);
  for (const fil of f.lager) el('image', { href: '/' + fil, x: 0, y: 0, width: 1024, height: 1024 }, v);
  return { ...f, g, v, x: X[i] };
});
function rendTitt(t) {
  const [a, b] = TITT;
  figurer.forEach((f, i) => {
    const t0 = a + i * 0.25, upp = inUt(del(t0, t0 + 0.6, t)) * (1 - inUt(del(b - 0.6 + i * 0.08, b + i * 0.08, t)));
    const h = (f.botten - f.topp) * S, topp = 1080 + 20 - upp * (0.8 * h + 20);
    const vagg = 5 * Math.sin((t - t0) * Math.PI * 2 * 1.3) * upp;   // vinkar genom att vagga lite, runt fötterna
    f.g.style.display = upp > 0 ? '' : 'none';
    f.g.setAttribute('transform', `translate(${f.x} ${topp + h}) rotate(${((i % 2 ? 4 : -4) * upp + vagg).toFixed(2)})`);
    f.v.setAttribute('transform', `scale(${S}) translate(-512 ${-f.botten})`);
  });
}

// logotypen: vit kant under vaxkrita; varje bokstav poppar runt sin mitt
const logo = el('g', {}, svg), bokst = [];
let bredd = 0;
for (const ch of LOGO) {
  if (ch === ' ') { bredd += 62 - 26; continue; }
  bokst.push({ ch, x: bredd, farg: LOGO_FARG[bokst.length % LOGO_FARG.length] }); bredd += GLYF[ch].b + 26;
}
bredd -= 26;
logo.setAttribute('transform', `translate(${960 - bredd * LOGO_S / 2} ${LOGO_BAS}) scale(${LOGO_S})`);
for (const b of bokst) {
  const g = GLYF[b.ch], v = el('g', { transform: `translate(${b.x} 0)` }, logo);
  b.pop = el('g', { transform: 'scale(0)' }, v); b.mitt = [g.b / 2, -60];
  const streck = { d: g.d, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const vax = el('g', { filter: 'url(#vax)' }, null);
  el('path', { ...streck, stroke: '#fff', 'stroke-width': 46 }, b.pop);
  b.pop.appendChild(vax);
  el('path', { ...streck, stroke: b.farg, 'stroke-width': 32 }, vax);
  if (g.prick) {
    el('circle', { cx: g.prick[0], cy: g.prick[1], r: 23, fill: '#fff' }, b.pop);
    el('circle', { cx: g.prick[0], cy: g.prick[1], r: 16, fill: b.farg }, el('g', { filter: 'url(#vax)' }, b.pop));
  }
}
const settle = s => 1 + 0.04 * Math.sin(s * 9) * Math.exp(-s * 4);

function render(t) {
  rendTitt(t);
  bokst.forEach((b, i) => {
    const t0 = LOGO_T + i * 0.2, k = del(t0, t0 + 0.38, t), [mx, my] = b.mitt;
    const sk = k <= 0 ? 0 : k < 1 ? (1 - Math.pow(1 - k, 3)) * (1 + 0.1 * Math.sin(k * Math.PI)) : settle(t - t0 - 0.38);
    b.pop.setAttribute('transform', `translate(${mx} ${my}) scale(${sk.toFixed(4)}) rotate(${(-6 * (1 - clamp(k))).toFixed(2)}) translate(${-mx} ${-my})`);
  });
}

// ljud i render.mjs format: musiken under (tonas ut), boing när figurerna tittar fram, pop per bokstav, pling på slutet
const fx = (n, v) => `assets/ljud/effekter/${n}/${n}-${v}.m4a`;
window.LJUD = [
  { t: 0, fil: 'assets/ljud/musik/gissa-bad.m4a', vol: EN ? 0.4 : 0.55, langd: DURATION, fade: 1.5 },
  ...figurer.map((f, i) => ({ t: TITT[0] + i * 0.25 + 0.2, fil: fx('boing', i + 1), vol: 0.4 })),
  ...bokst.map((b, i) => ({ t: +(LOGO_T + i * 0.2).toFixed(2), fil: fx('pop', i % 4 + 1), vol: 0.45 })),
  { t: +(LOGO_T + bokst.length * 0.2 + 0.3).toFixed(2), fil: fx('pling', 1), vol: 0.6 },
];
window.DURATION = DURATION;
window.render = render;
window.seek = t => { window.stilla = true; render(t); };
window.ready = Promise.all(figurer.flatMap(f => f.lager).map(src => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = '/' + src; })));
const start = performance.now();
(function loop() { if (!window.stilla) render(((performance.now() - start) / 1000) % DURATION); requestAnimationFrame(loop); })();
})();
