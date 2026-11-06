// Raden av småbilder (grodan, lampan, ärtorna, traktorn) som discot/ slår upp i 16a–16c och slutet/ har i vila: vita kritskivor
// med saken i, som skiva() och IKONER i bygg.py. Vanligt skript efter kit.js, verktyg/kant.js, ansikten.js, trafikljus.js och traktorn.js.
//   const rad = await ikonrad.ny(parent, M)   → [{ g, sak, x, y }] en per sak, i radens ordning; g ritas runt (0, 0) = skivans mitt
//   ikonrad.RAD (x, y för var och en), ikonrad.R (skivans radie)
// Skivan står kvar på (0, 0): scenen flyttar g dit den ska (rad[i].x, rad[i].y i vila) och skalar sak för poppen.
(() => {
const { el, bild, ROT } = kit;
// IKON_BÅGE:s x (006:s rad utan mittplatsen, där kulan hänger), men rak, på kulans höjd (som 007)
const RAD = [288, 488, 888, 1088].map(x => [x, 168]), R = 54;
// en sak i 1024-rutan med bbox bb, i skivan: höjd hh, botten på y = botten, mitt i x
const passa = (g, bb, botten, hh) => el('g', { transform: `translate(0 ${botten}) scale(${hh / (bb[3] - bb[1])}) translate(${-(bb[0] + bb[2]) / 2} ${-bb[3]})` }, g);
let nr = 0;
const SAKER = [   // [storlek (höjd i en skiva med radien 60, IKONER i bygg.py), bbox, rita(inre, M)]
  [80, [200, 150, 824, 600], async g => {   // Gurras huvud (gurra("skrattar").crop i bygg.py): figuren klipps vid halsen
    const id = `ikongurra${nr++}`;
    el('rect', { x: 200, y: 150, width: 624, height: 450 }, el('clipPath', { id }, document.querySelector('svg defs')));
    const f = await kit.figur('grodan-gurra', { forelder: el('g', { 'clip-path': `url(#${id})` }, g), kant: false, s: 1 });
    const a = ansikten.iFigur(f);
    f.pose({ x: 509.5, y: 926, s: 1, andas: 0 }); a.satt('skrattar');
  }],
  [100, trafikljus.BB, g => trafikljus.ny(g).pose({ x: 512, y: 940, h: 831, tand: 'gron' })],
  [70, [96, 349, 915, 708], g => bild(`${ROT}assets/rekvisita/artskida/cut/artskida.png`, g)],
  [95, null, async (g, M) => {   // traktorn utan Lova, pose h = 1
    const b = await traktorn.ny(g, M); b.pose({ x: 0, y: 0, h: 1, lova: false });
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
