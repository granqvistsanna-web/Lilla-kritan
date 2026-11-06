// Vagnen (Sanna 2026-11-06): en liten släpvagn i brunt trä bakom traktorn, för Pip och Gurra (bondgarden 14g–14h, slutet 17).
// Ritad i kod, ingen ny bild; brun så att bara målen är gröna. Ruta 200 × 120: lådan 0–200 × 0–80, hjulen under, dragstången åt höger.
//   const v = vagnen.ny(parent)          → { bak, fram, pose }; figurerna i vagnen läggs mellan bak och fram: v.fram.before(f.g)
//   v.pose({ x, y, h, dist, synlig })    x = lådans mitt, y = hjulens underkant, h = hela höjden, dist = körd sträcka (hjulen snurrar)
//   v.golv()                            → var figurernas fötter står (bild), v.krok() → dragstångens ände (bild)
(() => {
const { el } = kit;
const TRA = '#9A6535', MORK = '#6E4524', DACK = '#4b4542', NAV = '#C9C9C9', HR = 22, HJUL = [52, 148];
function ny(parent) {
  const bak = el('g', {}, parent), fram = el('g', {}, parent);
  const bakI = el('g', {}, bak), framI = el('g', {}, fram);
  el('rect', { x: 6, y: 4, width: 188, height: 40, rx: 6, fill: MORK }, bakI);                       // insidan, bakre väggen
  el('rect', { x: 196, y: 70, width: 44, height: 8, rx: 4, fill: MORK }, framI);                    // dragstången
  el('rect', { x: 0, y: 26, width: 200, height: 56, rx: 8, fill: TRA }, framI);                      // främre sidan
  for (const y of [44, 62]) el('rect', { x: 8, y, width: 184, height: 4, rx: 2, fill: MORK, opacity: 0.55 }, framI);   // plankorna
  const hjul = HJUL.map(cx => {
    const g = el('g', { transform: `translate(${cx} 98)` }, framI);
    el('circle', { r: HR, fill: DACK }, g); el('circle', { r: 9, fill: NAV }, g);
    const ekr = el('path', { d: 'M-9 0H9M0 -9V9', stroke: '#8f8f8f', 'stroke-width': 3 }, g);
    return ekr;
  });
  window.kant?.lagg(bak, { andel: 0.01 }); window.kant?.lagg(fram, { andel: 0.01 });
  let m = [1, 0, 0];   // skala, x0, y0
  const v = { bak, fram };
  v.pose = (p = {}) => {
    const syn = p.synlig !== false;
    bak.style.display = fram.style.display = syn ? '' : 'none';
    if (!syn) return;
    const s = (p.h ?? 120) / 120, x0 = (p.x ?? 0) - 100 * s, y0 = (p.y ?? 0) - 120 * s;
    m = [s, x0, y0];
    for (const g of [bakI, framI]) g.setAttribute('transform', `translate(${x0.toFixed(1)} ${y0.toFixed(1)}) scale(${s.toFixed(4)})`);
    const vr = ((p.dist || 0) / (HR * s)) * 180 / Math.PI;
    hjul.forEach(e => e.setAttribute('transform', `rotate(${vr.toFixed(1)})`));
  };
  v.golv = () => [m[1] + 100 * m[0], m[2] + 70 * m[0]];
  v.krok = () => [m[1] + 240 * m[0], m[2] + 74 * m[0]];
  return v;
}
window.vagnen = { ny };
})();
