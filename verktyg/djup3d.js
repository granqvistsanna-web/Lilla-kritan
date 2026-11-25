// djup3d.js – djup och 3D-effekter för Lilla Kritans platta SVG-scener (prov 2026-11-25, väntar på Sannas ja).
// Allt räknas på scenens tid t (inga slumptal, ingen requestAnimationFrame), så delade renderingar blir lika.
// Recept och inkoppling: produktion/three-rum/README.md, avsnittet "Djup-kit". Provet: produktion/three-rum/djup-prov/.
//
// Varför SVG och inte three.js: plattorna är en enda målad bild och effekterna måste ligga MELLAN scenens lager
// (regnet bakom fönsterkarmen, ljuset över rummet men under kritan) och få husets filter (line boil, kant.js).
// En WebGL-duk kan bara ligga överst, och lekrummets väg (SVG → textur varje bildruta) är för tung för 3 min scener.
// Djupet kommer därför från lager som rör sig olika mycket när kameran rör sig (parallax), inte från en 3D-motor.
//
// Inkoppling (tre rader i scenen):
//   <script src="/verktyg/djup3d.js"></script>
//   djup.init(svg)                                   en gång, när sidan laddats
//   djup.skott(t => kameranVid(t), DURATION)         en gång: hittar skotten (klipp till klipp) i scenens egen kamera
//   kamera(djup.kamera(K, t))                        varje bildruta: lugn push/glid/settle ovanpå skottets kamera
//   djup.ram(t)                                      sist i bildrutan: flyttar lagren, line boil 2,5 px / zoom, 6 brusbilder/s
// Lager får djup med data-attribut (p = 0 är figurernas plan, minus längre bort, plus närmare):
//   <g id="himmel" data-djup="-0.1">                 väggen och det som sitter på den
//   <g id="platta" data-djup-ramp="810:-0.1 905:0 1080:0.18">  plattan i band: väggen bak, golvet följer figurernas fötter
// Effekterna returnerar SVG-text som scenen lägger i det lager den vill (vard = lagrets eget djup).
(() => {
const NS = 'http://www.w3.org/2000/svg';
const W = 1920, H = 1080;
const kl = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k)), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = kl(k), k * k * (3 - 2 * k));
const bump = (a, b, t) => (t <= a || t >= b) ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
const fr = v => v - Math.floor(v);
const h = (i, k = 0) => fr(Math.sin(i * 127.1 + k * 311.7 + 17.3) * 43758.5453);   // fast "slump" per index
const f1 = v => (+v).toFixed(1), f3 = v => (+v).toFixed(3);

let svg, defs, SK = [], BAS = [1, W / 2, H / 2], NY = BAS, T = 0, nr = 0;

function init(s) {
  svg = s; defs = s.querySelector('defs') || s.insertBefore(document.createElementNS(NS, 'defs'), s.firstChild);
  defs.insertAdjacentHTML('beforeend', `
    <filter id="djup-boil" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="5000">
      <feTurbulence id="djup-brus" type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="1"/>
      <feDisplacementMap in="SourceGraphic" scale="2.5"/></filter>
    <filter id="djup-korn" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.4 0 0 0 1.15"/>
      <feComposite in="SourceGraphic" operator="in"/></filter>
    <filter id="djup-mjuk1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="djup-anga" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="26"/></filter>
    <filter id="djup-skugga" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>
    <radialGradient id="djup-sken"><stop offset="0" stop-color="#FFF1C2" stop-opacity="0.95"/><stop offset="0.35" stop-color="#FFD98A" stop-opacity="0.5"/><stop offset="1" stop-color="#FFC56A" stop-opacity="0"/></radialGradient>
    <radialGradient id="djup-vask"><stop offset="0" stop-color="#FFB45A" stop-opacity="1"/><stop offset="0.5" stop-color="#FFB45A" stop-opacity="0.45"/><stop offset="1" stop-color="#FFB45A" stop-opacity="0"/></radialGradient>
    <radialGradient id="djup-bubbla" cx="0.4" cy="0.38" r="0.7"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.95"/><stop offset="0.75" stop-color="#EEF6FF" stop-opacity="0.9"/><stop offset="1" stop-color="#D3E6FA" stop-opacity="0.95"/></radialGradient>
    <linearGradient id="djup-iris" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB9DE"/><stop offset="0.35" stop-color="#FFF0A8"/><stop offset="0.65" stop-color="#A9EEDF"/><stop offset="1" stop-color="#B7C8FF"/></linearGradient>
    <linearGradient id="djup-vatten" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9FD4F5"/><stop offset="0.45" stop-color="#D9F1FF"/><stop offset="1" stop-color="#8CC8EE"/></linearGradient>`);
}

// --- Kameran: skott och lugn rörelse -------------------------------------------------------------------------------------
// Skotten hittas ur scenens egen kamera: där kamerans värde byts är ett klipp (sökt till 1 ms). Rörelsen går över hela skottet,
// mjukt in och ut, så den börjar och slutar stilla och aldrig hoppar mitt i ett skott.
const nyckel = K => K ? K.map(v => (+v).toFixed(2)).join() : '';
function skott(kamVid, langd, steg = 0.1) {
  SK = []; let s = 0, k = nyckel(kamVid(0));
  for (let t = steg; t <= langd + 1e-9; t += steg) {
    const kt = nyckel(kamVid(Math.min(t, langd)));
    if (kt === k) continue;
    let a = t - steg, b = t;   // klippet ligger mellan a och b
    while (b - a > 0.001) { const m = (a + b) / 2; nyckel(kamVid(m)) === k ? a = m : b = m; }
    SK.push({ s, e: b, nyckel: k }); s = b; k = kt;
  }
  SK.push({ s, e: langd, nyckel: k });
  return SK;
}
// typ: 'push' (lugnt in), 'glid' (åt sidan), 'settle' (landar in, lite ut), 'still'. Utan typ väljs den efter zoomen.
function rorelse([z, cx, cy], u, typ, i = 0) {
  const k = mjuk(u), sida = i % 2 ? 1 : -1;
  typ ||= z < 1.25 ? 'push' : z < 2.2 ? 'glid' : 'settle';
  if (typ === 'push') return [z * (1 + 0.04 * k), cx, cy];
  if (typ === 'glid') return [z * (1 + 0.015 * k), cx + sida * (50 / z) * (k - 0.5), cy];
  if (typ === 'settle') return [z * (1.03 - 0.03 * k), cx - sida * (16 / z) * (k - 0.5), cy];
  return [z, cx, cy];
}
function kamera(K, t, typ) {
  const i = SK.findIndex(s => t >= s.s && t < s.e), sk = SK[i] || { s: t, e: t + 1 };
  BAS = K; NY = rorelse(K, (t - sk.s) / Math.max(0.001, sk.e - sk.s), typ, i);
  return NY;
}
// var kameran faktiskt tittar (som scenernas kamera(): utsnittet stannar inne i bilden)
function centrum([z, cx, cy]) {
  const tx = Math.max(W - W * z, Math.min(0, W / 2 - cx * z)), ty = Math.max(H - H * z, Math.min(0, H / 2 - cy * z));
  return [(W / 2 - tx) / z, (H / 2 - ty) / z];
}
// lagrets extra flytt för djupet p, i scenens koordinater (inuti kamera-gruppen)
function lagerTr(p) {
  if (!p) return '';
  const [bx, by] = centrum(BAS), [nx, ny] = centrum(NY), s = (NY[0] / BAS[0]) ** p;
  return `translate(${f1(nx)} ${f1(ny)}) scale(${s.toFixed(5)}) translate(${f1(-nx - (nx - bx) * p)} ${f1(-ny - (ny - by) * p)})`;
}
// "810:-0.1 905:0 1080:0.18" → p(y), styckvis linjär
const ramp = txt => { const pk = txt.trim().split(/\s+/).map(s => s.split(':').map(Number));
  return y => { if (y <= pk[0][0]) return pk[0][1]; for (let i = 1; i < pk.length; i++) if (y <= pk[i][0]) return lerp(pk[i - 1][1], pk[i][1], (y - pk[i - 1][0]) / (pk[i][0] - pk[i - 1][0])); return pk.at(-1)[1]; }; };
const RAMPER = new Map();
function bandMasker(el) {   // band var 30:e px från rampens början till bildens nederkant, varje band täcker allt under sig
  const txt = el.dataset.djupRamp; if (RAMPER.get(el)?.txt === txt) return RAMPER.get(el);
  const p = ramp(txt), y0 = +txt.trim().split(/\s+/)[0].split(':')[0], id = `djup-ramp-${nr++}`, band = [];
  for (let y = y0; y < H + 30; y += 30) band.push(y);
  defs.insertAdjacentHTML('beforeend', band.slice(1).map((y, i) => `<linearGradient id="${id}-g${i}" gradientUnits="userSpaceOnUse" x1="0" y1="${band[i]}" x2="0" y2="${y}"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <mask id="${id}-${i}" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="8000" height="7000"><rect x="-3000" y="${band[i]}" width="8000" height="6000" fill="url(#${id}-g${i})"/></mask>`).join(''));
  const r = { txt, id, band, p: band.map(y => p(y)) }; RAMPER.set(el, r); return r;
}
// sist i varje bildruta
function ram(t) {
  T = t;
  const z = NY[0], d = svg.querySelector('#djup-brus');
  d.setAttribute('seed', Math.floor(t * 6) % 50 + 1); d.nextElementSibling.setAttribute('scale', (2.5 / z).toFixed(2));
  svg.querySelectorAll('[data-djup]').forEach(el => { const tr = lagerTr(+el.dataset.djup); tr ? el.setAttribute('transform', tr) : el.removeAttribute('transform'); });
  svg.querySelectorAll('[data-djup-ramp]').forEach(el => {
    const r = bandMasker(el), inne = el.innerHTML;
    if (!inne) return;
    el.innerHTML = r.p.map((p, i) => `<g${i ? ` mask="url(#${r.id}-${i - 1})"` : ''}${lagerTr(p) ? ` transform="${lagerTr(p)}"` : ''}>${inne}</g>`).join('');
  });
}
const relativ = (p, vard = 0) => { const tr = lagerTr(p - vard); return tr ? ` transform="${tr}"` : ''; };

// --- Regn och snö i lager --------------------------------------------------------------------------------------------------
// ruta [x, y, w, h] (t.ex. fönstret), lagren längst bort först. Fjärran lager är tunna, ljusa, långsamma och lite mjuka.
const REGN = [{ p: -0.8, n: 34, l: 14, b: 2, fart: 230, o: 0.32, mjuk: true }, { p: -0.45, n: 22, l: 22, b: 3.2, fart: 320, o: 0.55 }, { p: -0.25, n: 12, l: 32, b: 4.6, fart: 420, o: 0.75 }];
function regn({ ruta: [x, y, w, hh], t = T, vard = 0, lager = REGN, farg = '#CFDDF5', vind = 0.22, glas = 5 }) {
  const m = 80, X = x - m, Y = y - m, WW = w + 2 * m, HH = hh + 2 * m;
  const lagerSvg = lager.map((L, li) => `<g${relativ(L.p, vard)}${L.mjuk ? ' filter="url(#djup-mjuk1)"' : ''} opacity="${L.o}">` + Array.from({ length: L.n }, (_, i) => {
    const v = L.fart * (0.85 + 0.3 * h(i, li + 1)), a = fr(h(i, li + 7) + t * v / (HH + L.l)), yy = Y - L.l + a * (HH + L.l), xx = X + h(i, li + 3) * WW - vind * (yy - Y);
    return `<line x1="${f1(xx)}" y1="${f1(yy)}" x2="${f1(xx - vind * L.l)}" y2="${f1(yy + L.l)}" stroke="${farg}" stroke-width="${L.b}" stroke-linecap="round"/>`; }).join('') + '</g>').join('');
  // droppar på rutan: rinner långsamt ner med ett kort spår (i fönstrets eget plan)
  const droppar = Array.from({ length: glas }, (_, i) => { const P = 5 + 3 * h(i, 21), a = fr(t / P + h(i, 22)), dx = x + (0.12 + 0.76 * h(i, 23)) * w,
    dy = y + hh * (0.08 + 0.84 * mjuk(Math.min(1, a * 1.3))), r = 4.5 + 2.5 * h(i, 24), o = 0.7 * kl(a * 8) * kl((1 - a) * 6);
    return `<g opacity="${f3(o)}"><line x1="${f1(dx)}" y1="${f1(dy - 26)}" x2="${f1(dx)}" y2="${f1(dy - r)}" stroke="#E6EEFF" stroke-width="${f1(r * 0.6)}" stroke-linecap="round" opacity="0.4"/>
      <ellipse cx="${f1(dx)}" cy="${f1(dy)}" rx="${f1(r)}" ry="${f1(r * 1.15)}" fill="#DCE8FF" opacity="0.75"/><circle cx="${f1(dx - r * 0.35)}" cy="${f1(dy - r * 0.4)}" r="${f1(r * 0.3)}" fill="#fff"/></g>`; }).join('');
  return lagerSvg + droppar;
}
const SNO = [{ p: -0.8, n: 40, r: 3, fart: 45, o: 0.55, mjuk: true }, { p: -0.45, n: 26, r: 5, fart: 70, o: 0.8 }, { p: -0.25, n: 12, r: 7.5, fart: 95, o: 0.95 }];
function sno({ ruta: [x, y, w, hh], t = T, vard = 0, lager = SNO, farg = '#FFFFFF' }) {
  const m = 80, X = x - m, Y = y - m, WW = w + 2 * m, HH = hh + 2 * m;
  return lager.map((L, li) => `<g${relativ(L.p, vard)}${L.mjuk ? ' filter="url(#djup-mjuk1)"' : ''} opacity="${L.o}">` + Array.from({ length: L.n }, (_, i) => {
    const v = L.fart * (0.8 + 0.4 * h(i, li + 1)), a = fr(h(i, li + 7) + t * v / HH), yy = Y + a * HH,
      xx = X + h(i, li + 3) * WW + 14 * Math.sin(t * (0.6 + 0.5 * h(i, li + 5)) + 6.28 * h(i, li + 9));
    return `<circle cx="${f1(xx)}" cy="${f1(yy)}" r="${f1(L.r * (0.75 + 0.5 * h(i, li + 11)))}" fill="${farg}"/>`; }).join('') + '</g>').join('');
}

// --- Lampsken som sprider sig ----------------------------------------------------------------------------------------------
// (x, y) = lampskärmen, r = hur långt ljuset når när det är helt tänt, k = 0–1 (tänds: ljuset växer ut i rummet på samma k).
// golv: golvets y under lampan ger en ljuspöl på golvet. Andas mycket lugnt (3 %, 4 s), fladdrar aldrig.
function lampsken({ x, y, r = 320, k = 1, t = T, golv = null, vard = 0, p = vard }) {
  if (k < 0.005) return '';
  const R = r * (0.35 + 0.65 * mjuk(k)) * (1 + 0.03 * Math.sin(2 * Math.PI * t / 4)), o = mjuk(k);
  return `<g${relativ(p, vard)}>
    <ellipse cx="${f1(x)}" cy="${f1(y + R * 0.1)}" rx="${f1(R * 1.9)}" ry="${f1(R * 1.45)}" fill="url(#djup-vask)" opacity="${f3(0.5 * o)}" style="mix-blend-mode:soft-light"/>
    ${golv != null ? `<ellipse cx="${f1(x)}" cy="${f1(golv)}" rx="${f1(R * 1.15)}" ry="${f1(R * 0.24)}" fill="url(#djup-sken)" opacity="${f3(0.4 * o)}" style="mix-blend-mode:screen"/>` : ''}
    <ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(R * 0.75)}" ry="${f1(R * 0.62)}" fill="url(#djup-sken)" opacity="${f3(0.55 * o)}" style="mix-blend-mode:screen"/>
    <ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(R * 0.3)}" ry="${f1(R * 0.26)}" fill="url(#djup-sken)" opacity="${f3(0.7 * o)}"/></g>`;
}

// --- Ånga -------------------------------------------------------------------------------------------------------------------
// mjuka moln som stiger från [x, y] över bredden w, växer och tonas bort. Lägg en ånga bakom figuren och en framför (olika p).
function anga({ x, y, w = 300, hojd = 380, n = 14, t = T, vard = 0, p = vard, o = 0.5, fro = 0 }) {
  return `<g${relativ(p, vard)} filter="url(#djup-anga)">` + Array.from({ length: n }, (_, i) => {
    const P = 4.5 + 2 * h(i, fro + 1), a = fr(t / P + h(i, fro + 2)), r = 50 + 60 * a + 20 * h(i, fro + 3),
      xx = x + (h(i, fro + 4) - 0.5) * w + 22 * Math.sin(t * 0.7 + 6.28 * h(i, fro + 5)) * a, yy = y - hojd * a;
    return `<ellipse cx="${f1(xx)}" cy="${f1(yy)}" rx="${f1(r)}" ry="${f1(r * 0.8)}" fill="#FFFDF6" opacity="${f3(o * Math.sin(Math.PI * a) ** 1.4)}"/>`; }).join('') + '</g>';
}

// --- Bubblor ---------------------------------------------------------------------------------------------------------------
// glimt: en liten kritstjärna med vit kant som tänds kort på bubblans ljussida (en gång per ca 3 s per bubbla, aldrig alla på en gång)
const glimt = (x, y, s, o) => o < 0.02 ? '' : `<path transform="translate(${f1(x)} ${f1(y)}) scale(${f3(s)})" opacity="${f3(o)}" d="M0 -1 L.22 -.22 L1 0 L.22 .22 L0 1 L-.22 .22 L-1 0 L-.22 -.22Z" fill="#FFF6C8" stroke="#fff" stroke-width=".18" stroke-linejoin="round"/>`;
function bubbla(cx, cy, r, ljus, t, i, { fyll = 'url(#djup-bubbla)', irisO = 0.75 } = {}) {
  const [lx, ly] = ljus, d = Math.hypot(lx - cx, ly - cy) || 1, ux = (lx - cx) / d, uy = (ly - cy) / d;
  const gx = cx + ux * r * 0.48, gy = cy + uy * r * 0.48, g = bump(0, 0.35, fr(t / (2.6 + 1.4 * h(i, 31)) + h(i, 32)) * (2.6 + 1.4 * h(i, 31)));
  const a0 = Math.atan2(uy, ux) - 0.9, a1 = a0 + 1.8, sw = Math.max(1.5, r * 0.12);
  return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${fyll}" stroke="#fff" stroke-width="${f1(Math.max(1.2, r * 0.07))}"/>
    <path d="M${f1(cx + r * 0.8 * Math.cos(a0 + 3.14))} ${f1(cy + r * 0.8 * Math.sin(a0 + 3.14))} A${f1(r * 0.8)} ${f1(r * 0.8)} 0 0 1 ${f1(cx + r * 0.8 * Math.cos(a1 + 3.14))} ${f1(cy + r * 0.8 * Math.sin(a1 + 3.14))}" fill="none" stroke="url(#djup-iris)" stroke-width="${f1(sw)}" stroke-linecap="round" opacity="${irisO}"/>
    <ellipse cx="${f1(gx)}" cy="${f1(gy)}" rx="${f1(r * 0.2)}" ry="${f1(r * 0.13)}" transform="rotate(${f1(Math.atan2(uy, ux) * 57.3 + 90)} ${f1(gx)} ${f1(gy)})" fill="#fff"/>
    ${glimt(gx + ux * r * 0.15, gy + uy * r * 0.15, Math.max(7, r * 0.55) * g, g)}`;
}
// skum: en hög med bubblor längs [x, y] (y = skummets fot) och bredden w; ljus = [x, y] var ljuset kommer ifrån
function skum({ x, y, w = 320, hojd = 70, n = 22, rmin = 10, rmax = 26, ljus = [x - 400, y - 600], t = T, vard = 0, p = vard }) {
  const b = Array.from({ length: n }, (_, i) => { const u = h(i, 41), r = lerp(rmin, rmax, h(i, 42)) * (1 + 0.03 * Math.sin(t * 1.1 + 6.28 * h(i, 43)));
    return { i, r, cx: x + (u - 0.5) * w, cy: y - r * 0.6 - hojd * Math.sin(Math.PI * u) * h(i, 44) }; }).sort((a, c) => a.cy - c.cy);
  return `<g${relativ(p, vard)}>` + b.map(B => bubbla(B.cx, B.cy, B.r, ljus, t, B.i)).join('') + '</g>';
}
// tvålbubblor som svävar upp från [x, y] och tonas bort (spricker aldrig). Varje bubbla har sitt eget djup (lite fram eller bak).
function tvalbubblor({ x, y, n = 7, t = T, hojd = 520, bredd = 380, rmin = 16, rmax = 34, ljus = [x - 500, y - 700], vard = 0, fro = 0 }) {
  return Array.from({ length: n }, (_, i) => {
    const P = 6 + 2.5 * h(i, fro + 51), a = fr(t / P + h(i, fro + 52)), p = -0.12 + 0.3 * h(i, fro + 53), s = 1 + p;
    const r = lerp(rmin, rmax, h(i, fro + 54)) * s * mjuk(a / 0.12), o = kl(a / 0.1) * kl((1 - a) / 0.15);
    const bx = x + (h(i, fro + 55) - 0.5) * bredd * mjuk(a * 1.2) + 26 * Math.sin(t * 0.9 + 6.28 * h(i, fro + 56)) * a, by = y - hojd * a;
    return o < 0.02 || r < 1 ? '' : `<g${relativ(p, vard)} opacity="${f3(o)}">${bubbla(bx, by, r, ljus, t, i + fro, { fyll: '#FFFFFF" fill-opacity="0.12', irisO: 0.9 })}</g>`;
  }).join('');
}

// --- Vattenstråle -----------------------------------------------------------------------------------------------------------
// från kranens mun [x0, y0] ner till [x1, y1] (vattenytan eller händerna). pa 0–1: strålen faller ut när kranen öppnas
// och slutet faller av när den stängs (pa går 1 → 2). Vit klistermärkeskant, rinnande ljusa streck, stänk och ringar.
function strale({ x0, y0, x1, y1, bredd = 22, t = T, pa = 1, zoom = 1, vard = 0, p = vard, ringar = true }) {
  if (pa <= 0 || pa >= 2) return '';
  const topp = pa > 1 ? mjuk(pa - 1) : 0, botten = Math.min(1, pa), L = y1 - y0;
  const ya = y0 + L * topp ** 2, yb = y0 + L * botten ** 2, steg = 14, kant = (3 + 0.01 * Math.abs(yb - ya) * zoom) / zoom;
  const xAt = y => lerp(x0, x1, ((y - y0) / L) ** 1.6), bAt = y => bredd * (1 - 0.25 * (y - y0) / L) + 1.2 * Math.sin(y * 0.06 - t * 14);
  const ys = []; for (let y = ya; y < yb; y += steg) ys.push(y); ys.push(yb);
  const v = ys.map(y => [xAt(y) - bAt(y) / 2, y]), hg = ys.map(y => [xAt(y) + bAt(y) / 2, y]).reverse();
  const d = 'M' + [...v, ...hg].map(([a, b]) => `${f1(a)} ${f1(b)}`).join('L') + 'Z', mitt = 'M' + ys.map(y => `${f1(xAt(y) - bAt(y) * 0.18)} ${f1(y)}`).join('L');
  let ut = `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="${f1(2 * kant)}" stroke-linejoin="round"/>
    <g filter="url(#djup-boil)"><path d="${d}" fill="url(#djup-vatten)" opacity="0.95"/>
    <path d="${mitt}" fill="none" stroke="#fff" stroke-width="${f1(bredd * 0.16)}" stroke-linecap="round" stroke-dasharray="${f1(bredd * 1.2)} ${f1(bredd * 2.2)}" stroke-dashoffset="${f1(-t * 260)}" opacity="0.85"/></g>`;
  if (botten >= 1 && topp < 1 && ringar) {   // stänk och ringar där strålen landar
    ut += [0, 1].map(j => { const a = fr(t / 1.1 + j / 2); return `<ellipse cx="${f1(x1)}" cy="${f1(y1 + 4)}" rx="${f1(bredd * (0.8 + 2.4 * a))}" ry="${f1(bredd * (0.25 + 0.6 * a))}" fill="none" stroke="#fff" stroke-width="3" opacity="${f3(0.7 * (1 - a))}"/>`; }).join('')
      + Array.from({ length: 6 }, (_, i) => { const a = fr(t / 0.7 + h(i, 61)), s = (h(i, 62) - 0.5) * 2, dx = s * bredd * 2.2 * a, dy = -bredd * (1.6 + h(i, 63)) * 4 * a * (1 - a);
        return `<circle cx="${f1(x1 + dx)}" cy="${f1(y1 + dy)}" r="${f1(3.5 * (1 - 0.5 * a))}" fill="#E4F4FF" stroke="#fff" stroke-width="1.5" opacity="${f3(1 - a)}"/>`; }).join('');
  }
  return `<g${relativ(p, vard)}>${ut}</g>`;
}

// --- Studs och rull med riktig fysik -----------------------------------------------------------------------------------------
// En sak (r = halva höjden) släpps eller kastas från fran = [x, y] vid t0 med fart [vx, vy] (px/s, vy minus = uppåt) och landar på golv.
// Studsarna tappar fart (e), och när de är små rullar den (rund) eller glider och tippar till rätt sida (kloss) och stannar,
// vid till om det är givet. Svar: { x, y, rot, sx, sy, hojd, traffar } – y är sakens mitt, traffar = [[tid, styrka 0–1]] för dunsljud.
function studs({ t = T, t0 = 0, fran: [x0, y0], fart: [vx0, vy0] = [0, 0], golv, r, e = 0.32, g = 2600, form = 'rund', till = null, broms = 500, vmin = 140 }) {
  const yg = golv - r, tf = Math.max(0, t - t0);
  // flygningar: första fallet, sedan studsar tills studsfarten är under vmin
  const fl = []; let ts = 0, y = y0, vy = vy0, vx = vx0, x = x0;
  const forsta = (-vy + Math.sqrt(vy * vy + 2 * g * Math.max(0, yg - y))) / g;
  fl.push({ ts, d: forsta, x, y, vx, vy }); ts += forsta; x += vx * forsta;
  let v = (vy + g * forsta) * e; const traffar = [[t0 + ts, kl((vy + g * forsta) / 1600)]];
  while (v > vmin && fl.length < 6) { vx *= 0.8; const d = 2 * v / g; fl.push({ ts, d, x, y: yg, vx, vy: -v }); traffar.push([t0 + ts + d, kl(v / 1600)]); ts += d; x += vx * d; v *= e; }
  vx *= 0.8;
  const rull0 = ts, xr = x, a = till != null && Math.abs(till - xr) > 1 ? vx * vx / (2 * Math.abs(till - xr)) : broms, trull = Math.abs(vx) / a, xslut = xr + Math.sign(vx) * vx * vx / (2 * a);
  let X, Y;
  if (tf < rull0) { const f = fl.findLast(f => tf >= f.ts) || fl[0], u = tf - f.ts; X = f.x + f.vx * u; Y = f.y + f.vy * u + g * u * u / 2; }
  else { const u = Math.min(tf - rull0, trull); X = xr + vx * u - Math.sign(vx) * a * u * u / 2; Y = yg; }
  if (t < t0) { X = x0; Y = y0; }
  // squash vid kontakt: kort och liten (lugnt), trycks ihop mot golvet
  let sq = 0; for (const [tt, k] of traffar) sq = Math.max(sq, 0.12 * k * bump(tt - 0.03, tt + 0.09, t));
  const vag = X - x0, rot = form === 'rund' ? vag / r * 57.2958 : (() => { const slut = (xslut - x0) / r * 57.2958 * 0.6, mal = 90 * Math.round(slut / 90), pr = Math.abs(xslut - x0) > 1 ? kl(vag / (xslut - x0)) : 1;
    return vag / r * 57.2958 * 0.6 + (mal - slut) * mjuk(pr); })();
  return { x: X, y: Y, rot, sx: 1 + sq, sy: 1 - sq, hojd: Math.max(0, yg - Y), traffar, stannar: t0 + rull0 + trull };
}
// kontaktskugga på golvet under en sak: mindre och ljusare ju högre den är
function skugga({ x, golv, hojd = 0, r, o = 0.26, vard = 0, p = vard }) {
  const k = kl(hojd / (4 * r)), rx = r * 1.05 * (1 - 0.45 * k);
  return `<g${relativ(p, vard)}><ellipse cx="${f1(x + 4)}" cy="${f1(golv + 2)}" rx="${f1(rx)}" ry="${f1(rx * 0.2)}" fill="#5a3e2a" opacity="${f3(o * (1 - 0.6 * k))}" filter="url(#djup-skugga)"/></g>`;
}
// en sak (bild eller SVG-text) placerad efter studs(): vrids kring mitten, squash mot golvet
const sak = (s, inne, r) => `<g transform="translate(${f1(s.x)} ${f1(s.y + r)}) scale(${f3(s.sx)} ${f3(s.sy)}) translate(0 ${f1(-r)}) rotate(${f1(s.rot)})">${inne}</g>`;

window.djup = { init, skott, kamera, rorelse, centrum, lagerTr, ram, ramp, regn, sno, lampsken, anga, skum, tvalbubblor, bubbla, strale, studs, skugga, sak, glimt,
  get skottLista() { return SK; } };
})();
