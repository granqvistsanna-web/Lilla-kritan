// Raden av småbilder (kotten, nallen, bullen, lastbilen) som discot/ slår upp i 16a–16c och slutet/ har i vila: vita kritskivor
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
  [90, [0, 0, 693, 880], g => bild(`${ROT}assets/rekvisita/kotte/cut/kotte-v2-premium.png`, g, { width: 693, height: 880 })],
  [100, [0, 0, 848, 856], g => {   // nallen (tagning 3: "Kotten, nallen, bullen"), som på flaket: kodögonen ur lastbilen.js
    bild(lastbilen.NALLE, g, { width: 848, height: 856 });
    lastbilen.nalleAnsikte(g);
  }],
  [85, [116, 129, 904, 913], g => bild(`${ROT}assets/rekvisita/kanelbulle/cut/kanelbulle-v3-ruta.png`, g)],
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
