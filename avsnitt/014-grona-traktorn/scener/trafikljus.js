// Trafikljuset (assets/rekvisita/trafikljus/, trafikljus() i bygg.py): båda lamporna är släckta i bilden, den tända ritas i kod
// (en mjuk glöd, en cirkel i lampans tända färg och en liten glans), så att rött slår om till grönt på rätt bildruta.
// Vanligt skript efter kit.js och verktyg/kant.js. Används i vagen-2 (07a–c), busshållplatsen (10–14g) och ikonraden.
//   const lj = trafikljus.ny(parent);   lj.g ritas i ljusets 1024-ruta, foten (512, 930) i (0, 0)
//   lj.pose({ x, y, h, tand: 'rod' | 'gron' | null, k })   x, y = foten i bild, h = höjd i bild (bildens bbox, som place()),
//                                                          k = 0..1 hur tänd lampan är (tona eller poppa in), standard 1
(() => {
const { el, bild, ROT } = kit;
const A = `${ROT}assets/rekvisita/trafikljus/`;
const BB = [352, 109, 672, 940];   // trafikljus.png:s bbox (med den inbakade vita kanten)
const LAMPOR = { rod: { mitt: [510, 264], r: 77, tand: '#F2443A' }, gron: { mitt: [511, 469], r: 84, tand: '#5FD35A' } };   // trafikljus-rigg.json

function ny(parent) {
  const defs = document.querySelector('svg defs');
  if (!defs.querySelector('#lampglod')) defs.insertAdjacentHTML('beforeend', '<filter id="lampglod" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="28"/></filter>');
  const g = el('g', {}, parent), inre = el('g', {}, g);
  bild(`${A}cut/trafikljus.png`, inre);
  const lampor = {};
  for (const [k, L] of Object.entries(LAMPOR)) {
    const lg = el('g', { transform: `translate(${L.mitt[0]} ${L.mitt[1]})` }, inre);
    const glod = el('circle', { r: L.r * 1.5, fill: L.tand, opacity: 0.55, filter: 'url(#lampglod)' }, lg);
    const lampa = el('g', { filter: 'url(#kritkant)' }, lg);   // lite ojämn kritkant, som kritfyll i bygg.py
    el('circle', { r: L.r * 1.04, fill: L.tand }, lampa);
    el('ellipse', { cx: -L.r * 0.33, cy: -L.r * 0.4, rx: L.r * 0.22, ry: L.r * 0.2, fill: '#fff', opacity: 0.6 }, lampa);
    lampor[k] = { lg, glod };
  }
  window.kant?.lagg(g);
  const pose = ({ x = 0, y = 0, h = 430, tand = 'rod', k = 1, synlig = true } = {}) => {
    g.style.display = synlig ? '' : 'none';
    const s = h / (BB[3] - BB[1]);
    g.setAttribute('transform', `translate(${x} ${y}) scale(${s}) translate(${-(BB[0] + BB[2]) / 2} ${-BB[3]})`);
    for (const [n, l] of Object.entries(lampor)) {
      const v = n === tand ? k : 0;
      l.lg.style.display = v > 0.001 ? '' : 'none';
      l.lg.setAttribute('opacity', Math.min(1, v).toFixed(3));
      l.lg.setAttribute('transform', `translate(${LAMPOR[n].mitt[0]} ${LAMPOR[n].mitt[1]}) scale(${(0.6 + 0.4 * Math.min(1, v)).toFixed(3)})`);
    }
  };
  pose();
  return { g, pose };
}

window.trafikljus = { ny, BB, LAMPOR };
})();
