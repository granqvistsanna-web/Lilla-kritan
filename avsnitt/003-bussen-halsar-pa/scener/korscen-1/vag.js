// Körscenernas väg (korscen-1 och korscen-2). Läses in efter kit.js; allt hamnar i window.vag.
// Vägplattan rullar sömlöst åt vänster och sakerna (klippta ur plattorna med klipp.py) glider förbi i samma fart.
// Bör flytta in i kit.js som kit.vag när körscenerna är godkända.
(() => {
const { el, bild, ROT } = kit;
const PX = 1080 / 768;                                   // plattornas pixlar → bild
const KLIPP = new URL('klipp/', document.currentScript.src).href;
const STORLEK = { tradet: [432, 590], dammen: [426, 330], blommor: [250, 200] };   // klippens mått i plattpixlar
let plattor, saker;

// Ersätter kit.duk:s platta med tre rutor av vägen, varannan spegelvänd, så att skarvarna alltid möts.
function vag() {
  const L = kit.lager.plate;
  L.querySelector('image').remove();
  plattor = [0, 1, 2].map(() => bild(`${ROT}assets/bakgrunder/vagen/vagen.png`, L, { width: 1920, height: 1080, preserveAspectRatio: 'none' }));
  saker = el('g', {}, L);
}
// d = körd sträcka i bild (px). Vägen flyttas d åt vänster.
function rulla(d) {
  const n0 = Math.floor(d / 1920), off = d - n0 * 1920;
  plattor.forEach((p, i) => {
    const n = n0 + i, x = i * 1920 - off;
    p.setAttribute('transform', n % 2 ? `translate(${x + 1920} 0) scale(-1 1)` : `translate(${x} 0)`);
  });
}
// Körd sträcka vid tid t, när farten v(t) (px/s) varierar. Summeras i små steg (billigt, och alltid samma svar för samma t).
function stracka(t, v, dt = 1 / 120) {
  let d = 0;
  for (let s = 0; s < t; s += dt) d += v(Math.min(s + dt / 2, t)) * Math.min(dt, t - s);
  return d;
}
// En sak ur klipp/ med foten (bildens underkant) på y. k skalar. s.pa(x) sätter mitten i x.
function sak(namn, y, k = 1) {
  const [w, h] = STORLEK[namn].map(v => v * PX * k);
  const g = el('g', {}, saker);
  bild(KLIPP + namn + '.png', g, { width: w, height: h });
  return { g, w, pa: x => g.setAttribute('transform', `translate(${x - w / 2} ${y - h})`), };
}
// En plöjd åkerremsa längs väggens nederkant, w bred. a.pa(x, plojd) sätter vänsterkanten i x;
// fårorna syns bara till vänster om plojd (bild-x), så att traktorn plöjer fram dem.
let akrar = 0;
function aker(w, y0 = 665, y1 = 806) {
  const g = el('g', {}, saker), id = `plojt-${akrar++}`;
  el('rect', { x: 0, y: y0, width: w, height: y1 - y0, rx: 40, fill: '#9a6239' }, g);
  const klipp = el('rect', { x: 0, y: y0, width: w, height: y1 - y0 }, el('clipPath', { id }, g));
  const faror = el('g', { 'clip-path': `url(#${id})` }, g);
  for (let y = y0 + 20, i = 0; y < y1 - 10; y += 20, i++)
    el('path', { d: `M30 ${y} L${w - 30} ${y + (i % 2 ? 2 : -2)}`, stroke: '#6b3f22', 'stroke-width': 6, 'stroke-linecap': 'round',
      'stroke-dasharray': `${40 + (i * 13) % 30} ${10 + (i * 7) % 12}`, 'stroke-dashoffset': i * 23, opacity: 0.75 }, faror);
  return { g, w, pa: (x, plojd = Infinity) => {
    g.setAttribute('transform', `translate(${x} 0)`);
    klipp.setAttribute('width', Math.max(0, Math.min(w, plojd - x)));
  } };
}
// Fartstreck bakom bussen: tre korta vita kritstreck som fladdrar.
function fartstreck(parent) {
  const s = [0, 1, 2].map(() => el('path', { fill: 'none', stroke: '#fff', 'stroke-width': 11, 'stroke-linecap': 'round', opacity: 0.9 }, parent));
  return (t, x, y, styrka = 1) => s.forEach((p, i) => {
    const l = (60 + 30 * Math.sin(t * 11 + i * 2.1)) * styrka, yy = y + i * 62;
    p.setAttribute('d', `M${x - l - i * 18} ${yy} L${x - i * 18} ${yy}`);
    p.setAttribute('opacity', 0.9 * Math.min(1, styrka));
  });
}
// Rökpuffar ur traktorns avgasrör. kallor = [{ t0, x, y }] i bild-x vid t0; puffen driver bakåt med vägen (dx = sträcka sedan t0).
function puffar(parent, n = 6) {
  const c = Array.from({ length: n }, () => el('circle', { fill: '#fbf8f1', stroke: '#d8d1c2', 'stroke-width': 4 }, parent));
  return (t, kallor, d) => c.forEach((p, i) => {
    const k = kallor[kallor.length - 1 - i], a = k ? t - k.t0 : -1;
    if (!k || a < 0 || a > 1.1) return p.setAttribute('opacity', 0);
    const q = a / 1.1;
    p.setAttribute('cx', k.x - (d(t) - d(k.t0)) * 0.9 - 40 * q);
    p.setAttribute('cy', k.y - 110 * Math.sqrt(q));
    p.setAttribute('r', 16 + 30 * Math.sqrt(q));
    p.setAttribute('opacity', a < 0.08 ? a / 0.08 : 1 - q * q);
  });
}

window.vag = { PX, vag, rulla, stracka, sak, aker, fartstreck, puffar };
})();
