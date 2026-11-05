// Raden av småbilder (kotten, björnen, bullen, lastbilen) som discot/ slår upp i 16a–16c och slutet/ har i vila: vita kritskivor
// med saken i, som skiva() och IKONER i bygg.py. Vanligt skript efter kit.js, verktyg/kant.js, ansikten.js och lastbilen.js.
//   const rad = await ikonrad.ny(parent, M)   → [{ g, sak, x, y }] en per sak, i radens ordning; g ritas runt (0, 0) = skivans mitt
//   ikonrad.RAD (x, y för var och en), ikonrad.R (skivans radie)
// Skivan står kvar på (0, 0): scenen flyttar g dit den ska (rad[i].x, rad[i].y i vila) och skalar sak för poppen.
(() => {
const { el, bild, ROT } = kit;
// IKON_BÅGE:s x (006:s rad utan mittplatsen, där kulan hänger), men rak, på kulans höjd (storyboardbilderna)
const RAD = [288, 488, 888, 1088].map(x => [x, 168]), R = 54;
// en sak i 1024-rutan med bbox bb, i skivan: höjd hh, botten på y = botten, mitt i x
const passa = (g, bb, botten, hh) => el('g', { transform: `translate(0 ${botten}) scale(${hh / (bb[3] - bb[1])}) translate(${-(bb[0] + bb[2]) / 2} ${-bb[3]})` }, g);
const SAKER = [   // [storlek (höjd i en skiva med radien 60, IKONER i bygg.py), bbox, rita(inre, M)]
  [90, [183, 88, 838, 934], g => bild(`${ROT}assets/rekvisita/kotte/cut/kotte-v1.png`, g)],
  [90, [200, 120, 824, 600], async g => {   // björnen: Bulles huvud med kepsen (björnhuvud() i bygg.py)
    const id = `bjornhuvud${Math.random().toString(36).slice(2, 7)}`;
    el('rect', { x: 0, y: 0, width: 1024, height: 600 }, el('clipPath', { id }, document.querySelector('svg defs')));
    const f = await lastbilen.bulle(el('g', { 'clip-path': `url(#${id})` }, g), { s: 1, kant: false });
    f.pose({ x: f.fot[0], y: f.fot[1], s: 1, humor: 'skrattar', andas: 0 });
    for (const n in f.delar) f.delar[n].style.display = 'none';
  }],
  [85, [116, 129, 904, 913], g => bild(`${ROT}assets/rekvisita/kanelbulle/cut/kanelbulle-v1.png`, g)],
  [95, null, async (g, M) => {   // lastbilen utan Bulle (lastbilen(med_bulle=False)), pose h = 1
    const b = await lastbilen.ny(g, M); b.pose({ x: 0, y: 0, h: 1 }); b.bulle.g.style.display = 'none';
  }],
];

async function ny(parent, M) {
  const ut = [];
  for (const [i, [x, y]] of RAD.entries()) {
    const g = el('g', {}, parent), [hs, bb, rita] = SAKER[i], hh = hs * R / 60;
    el('circle', { r: R, fill: '#fff', filter: 'url(#kritkorn)' }, g);
    const sak = el('g', {}, g);
    if (bb) await rita(passa(sak, bb, hh * 0.45, hh * 0.9), M);
    else await rita(el('g', { transform: `translate(0 ${hh * 0.45}) scale(${hh * 0.9})` }, sak), M);
    window.kant?.lagg(g, { andel: 0.01 });   // klistermärkena ritas i kod: vit kant (verktyg/kant.js)
    ut.push({ g, sak, x, y });
  }
  return ut;
}

window.ikonrad = { ny, RAD, R };
})();
