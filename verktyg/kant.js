// Vita klistermärkeskanter för alla Lilla Kritan-scener (skill: vita-kanter). Läses in direkt efter kit.js:
//   <script src="../../../../verktyg/kant.js"></script>
// Regel (Sanna, 2026-11-05): kanten i färdig bild = 3 px + 1 % av sakens höjd i bild. Stora saker får lite tjockare kant,
// små och långt borta behåller alltid sin. Nästan hel vit, lite kritkorn, lätt handklippt kant.
// PNG-figurer och -saker har redan en inbakad kant på ca 1 % av höjden (klippsteget, vit_kant i bygg.py), så de får bara
// grundkanten ovanpå (andel 0, standard). Saker utan inbakad kant (ritade i kod) får andel 0,01.
// Kanten räknas om varje bildruta efter hur stor saken är i bild, så den blir rätt både i närbild och långt bort.
//   kant.lagg(g)                  en sak (g = gruppen eller bilden); returnerar elementet som fick filtret
//   kant.lagg(g, { andel: 0.01 }) en sak utan inbakad kant
// Alla kit.figur får kanten av sig själva ({ kant: false } stänger av). kit.kor räknar om kanterna efter varje render.
(() => {
const NS = 'http://www.w3.org/2000/svg';
const BAS = 3, ANDEL = 0.01;     // px i en 1920 bred bild
const VAG = 0.05, KORN = 0.35;   // kantens vågighet och kritkorn, per px i bild
const lista = [];
let nr = 0;

function lagg(g, { andel = 0 } = {}) {
  if (!g) return g;
  if (g.getAttribute('filter')) {   // har redan ett filter (t.ex. ljusare vinge): kanten läggs på en grupp runt om
    const w = document.createElementNS(NS, 'g');
    g.replaceWith(w); w.append(g); g = w;
  }
  const defs = g.ownerSVGElement.querySelector('defs'), id = `kant-${nr++}`;
  defs.insertAdjacentHTML('beforeend', `
    <filter id="${id}" x="-0.1" y="-0.1" width="1.2" height="1.2" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="${7 + nr % 5}" result="b"/>
      <feDisplacementMap in="d" in2="b" scale="1" xChannelSelector="R" yChannelSelector="G" result="dd"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="1" seed="2" result="k"/>
      <feColorMatrix in="k" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.45" result="kk"/>
      <feComposite in="kk" in2="dd" operator="in" result="vit"/>
      <feMerge><feMergeNode in="vit"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`);
  const f = defs.lastElementChild;
  g.setAttribute('filter', `url(#${id})`);
  lista.push({ g, f, andel, m: f.querySelector('feMorphology'), t: f.querySelectorAll('feTurbulence'), dm: f.querySelector('feDisplacementMap'), r: 0, s: 0 });
  return g;
}

// efter varje render: kantens bredd i sakens egna enheter, så att den blir BAS + andel × höjden i bild
function uppdatera() {
  for (const k of lista) {
    if (!k.g.isConnected) continue;
    // kanten mäts i en bild vars långsida är 1920 (liggande 1920×1080 och stående 1080×1920 Shorts, --snabb i halv storlek)
    const ruta = k.g.ownerSVGElement.getBoundingClientRect(), px = 1920 / (Math.max(ruta.width, ruta.height) || innerWidth);
    const c = k.g.getScreenCTM();
    if (!c) continue;
    const s = Math.hypot(c.a, c.b) * px;   // px i bild per enhet
    if (!s) continue;
    let bb;
    try { bb = k.g.getBBox(); } catch { continue; }
    if (!bb.width || !bb.height) continue;
    const r = BAS + k.andel * bb.height * s;
    if (Math.abs(r - k.r) < 0.05 && Math.abs(s - k.s) < 0.01 * s && k.bw === bb.width && k.bh === bb.height) continue;
    Object.assign(k, { r, s, bw: bb.width, bh: bb.height });
    const ru = r / s;
    k.m.setAttribute('radius', ru.toFixed(3));
    k.dm.setAttribute('scale', (0.35 * ru).toFixed(3));
    k.t[0].setAttribute('baseFrequency', (VAG * s).toFixed(5));
    k.t[1].setAttribute('baseFrequency', (KORN * s).toFixed(5));
    const p = 1.6 * ru;   // filtrets ruta: plats för kanten runt saken
    k.f.setAttribute('x', (-p / bb.width).toFixed(4)); k.f.setAttribute('width', (1 + 2 * p / bb.width).toFixed(4));
    k.f.setAttribute('y', (-p / bb.height).toFixed(4)); k.f.setAttribute('height', (1 + 2 * p / bb.height).toFixed(4));
  }
}

if (window.kit?.figur) {   // utan kit.js (t.ex. godnattsagorna): scenen anropar kant.uppdatera() själv efter varje bildruta
  const figur0 = kit.figur, kor0 = kit.kor;
  kit.figur = async (slug, opt = {}) => { const f = await figur0(slug, opt); if (opt.kant !== false) lagg(f.g); return f; };
  kit.kor = (render, DURATION, opt) => kor0(t => { const v = render(t); uppdatera(); return v; }, DURATION, opt);
}
window.kant = { lagg, uppdatera, BAS, ANDEL };
})();
