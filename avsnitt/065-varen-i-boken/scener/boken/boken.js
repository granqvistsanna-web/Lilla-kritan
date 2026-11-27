// 065 Våren i boken, grind 6: hela scenen i Kritans bok. Förlaga: 062 scener/boken/boken.js (kortmotorn, kontaktskuggan, figuren
// på kortet, kritan på en 3D-yta, kameran, skärpedjupet, ljudet). Uppslaget och vyerna som storyboarden (storyboard/scen.js),
// rörelserna som manus.md "Så rör det sig". Scenens t = 0 är rad 01 (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/065-varen-i-boken/scener/render.mjs avsnitt/065-varen-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { kameraplan } from '/verktyg/kamera3d.mjs';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';

const $ = id => document.getElementById(id);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), k01 = x => kl(0, 1, x), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = k01(k), k * k * (3 - 2 * k));
const bump = (a, b, t, r = 0.3) => mjuk((t - a) / r) * mjuk((b - t) / r);   // 0 → 1 → 0
const reser = k => { k = k01(k); const s = 0.9; return 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2; };   // fälls upp med en liten efterstudsning
const v3 = (...a) => new THREE.Vector3(...a);

// ---- raderna ----
const { RADER, ROST, GLES } = await import('/avsnitt/065-varen-i-boken/storyboard/rader.mjs'); let acc = 0;
const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, st: r.s, s }; });
const RR = Object.fromEntries(RAD.map(r => [r.id, r])), S = id => RR[id].s, LN = n => ROST[n - 1][1];
const DURATION = acc, rad = t => RAD[Math.max(0, RAD.findLastIndex(r => r.s <= t))];
const SVAR = (id, n) => S(id) + RR[id].malin.find(m => m[0] === n)[1] + LN(n) + 0.2;   // musens svar: 0,2 s efter Malins replik n
const ORD = (id, n, s) => S(id) + RR[id].malin.find(m => m[0] === n)[1] + s;   // ett ord i replik n, s in i röstfilen

// Orden, uppmätta 2026-11-27 (whisper-cli large-v3-turbo + ljudets energi, sekunder in i röstfilen)
const UPP = { rod: ORD('14', 22, 2.35), gul: ORD('15', 24, 2.48), lila: ORD('19', 29, 2.39) };   // "upp": blomman reser sig
const SIFFRA_T = [ORD('14b', 23, 1.64), ORD('15b', 25, 1.54), ORD('19b', 30, 1.45)];   // "En!", "Två!", "Tre!"
const RAKNA = [0.07, 1.10, 2.20].map(s => ORD('20', 31, s));   // "En, två, tre." (rad 20)
const AGG = [0.05, 0.98, 1.97].map(s => ORD('24c', 40, s));     // "Ett, två, tre små ägg."
const ORD_FJARIL = ORD('22', 34, 0.24), ORD_PIGA = ORD('22b', 35, 0.59), ORD_BO = ORD('24b', 39, 0.35);
const HEJ_BLOMMOR = ORD('26b', 45, 0.3), HEJ_FJARIL = ORD('26c', 46, 0.45), HEJ_PIGA = ORD('26c', 46, 2.8), HEJ_BO = ORD('26d', 47, 0.45);

// ---- renderaren ----
const SNABB = location.search.includes('snabb'), W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080, PR = SNABB ? 1 : 1.5;
const R = new THREE.WebGLRenderer({ canvas: $('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(PR); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

// ---- bilderna ----
const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const bild = src => new THREE.ImageLoader().loadAsync(src);
const lad = src => bild(src).then(i => tex(trim(i)));
const [GRAN, BUSKE, TRAD1, APPEL, EK, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, SOL, BO, ROSA_B, GULA_B] = await Promise.all([
  B + 'skogen-gron-saker/gran.png', B + 'skogen-saker/buske.png', B + 'skogen-saker/trad.png', B + 'lekplatsen-saker/appeltrad.png', RQ + 'ek/cut/ek.png',
  ...['himmel', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten', 'sol', 'fagelbo'].map(n => P + n + '.png'),
  RQ + 'blomma-rosa/cut/blomma-rosa.png', RQ + 'blommor-gula/cut/blomma-gul-1.png'].map(lad));
const TB = {};   // tulpanerna: knopp, uppe, hanger per färg (den gula utslagna är kritans teckning ur rekvisita)
await Promise.all(['rod', 'gul', 'lila'].flatMap(f => [['knopp', `${P}tulpan-${f}-knopp.png`], ['uppe', f === 'gul' ? `${RQ}tulpan-gul/cut/tulpan-gul.png` : `${P}tulpan-${f}.png`],
  ['hanger', `${P}tulpan-${f}-hanger.png`]].map(async ([l, src]) => { const i = await bild(src); (TB[f] ??= {})[l] = { i, map: tex(trim(i)) }; })));
const KANNA_I = await bild(RQ + 'vattenkanna/cut/vattenkanna.png'), KANNA = tex(trim(KANNA_I));
// kritans teckningar: konturen (bildens egna px) läggs på den beskurna bilden, ruta = beskärningen
function ruta(i) {
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, u); x1 = Math.max(x1, u); }
  return { ox: x0 - 1, oy: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3, W: i.width, H: i.height };
}
const KONTUR = Object.fromEntries(await Promise.all(['tulpan-gul', 'vattenkanna'].map(async s => { const j = await (await fetch(`${RQ}${s}/cut/${s}-kontur.json`)).json(); return [s, [j.d, ...(j.detaljer || [])]]; })));
const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
const KANNA_URL = await dataUrl(RQ + 'vattenkanna/cut/vattenkanna.png');

function bredare(map, bredd) {
  const i = map.image, h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return tex(c);
}
const mat = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });
const urklipp = map => mat(map, { alphaTest: 0.5, alphaToCoverage: true, shadowSide: THREE.DoubleSide });
function baksida(map) {
  const i = map.image, c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = '#F4ECDD'; x.fillRect(0, 0, c.width, c.height);
  return mat(tex(c), { alphaTest: 0.5, alphaToCoverage: true, side: THREE.BackSide });
}
const djup = map => new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending, map, alphaTest: 0.5, side: THREE.DoubleSide });
const skugga = m => { m.castShadow = m.receiveShadow = true; return m; };

// boken lika stor som 062 runda 5 (1,3), grön pärm med den gula tulpanen i knopp
const BOK = 1.3;
skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
const PARM0 = 0.5, PARM1 = 1.4;
const { insida, satt } = await skapaBok(scen, { farg: '#4FA845', figur: TB.gul.knopp.i, doodles: true, oppna: [PARM0, PARM1], storlek: BOK });

// ---- uppslaget ----
const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(28,52,18,0.42)'); g.addColorStop(0.55, 'rgba(28,52,18,0.16)'); g.addColorStop(1, 'rgba(28,52,18,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
const KORT = [];
// kort: står på sidan med foten i (x, z). dx flyttar bilden i sidled (den hängande tulpanens fot sitter inte mitt i bilden).
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(o.dx ?? 0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, x, y: m.position.y, z, h, w, hog: 0.002 };
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.07), KSKUGGA); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0009, z + 0.012); f.renderOrder = 1; scen.add(f); k.flik = f; }
  KORT.push(k); return k;
}
const vik = (k, e) => { k.m.rotation.x = Math.PI / 2 * (1 - e); k.m.position.y = k.y + k.hog * (1 - k01(e * 4)); };   // e 0 = nedfälld framåt, 1 = står
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
const BAK = [kort(bredare(KULLE_BAK, 5.2 * BOK), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2 * BOK), 1.95 / 6.2, 0.05, -0.47)];
pa(bredare(HIMMEL, 1.5), 2.03, 0, 0.07 + 2.03 / 2, 0.004, 2.3 * BOK);
// solen: liten, högt upp till höger, utan ansikte (huvudsaken är tulpanen)
const SOLEN = pa(SOL, 0.24, 0.18, 1.15);
const MOLNEN = [[MOLN1, 0.22, -0.7, 1.0], [MOLN2, 0.16, -0.2, 1.22], [MOLN3, 0.13, 0.3, 1.08]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
// granarna och två lövträd ut mot kanterna; lövträdet med boet står till vänster (storyboarden)
const SKOG = [[-1.0, -0.4, 0.5, GRAN], [-1.24, -0.42, 0.56, GRAN], [-1.42, -0.16, 0.44, GRAN], [-0.36, -0.42, 0.44, EK], [0.28, -0.42, 0.5, GRAN],
  [0.56, -0.36, 0.48, APPEL], [0.82, -0.38, 0.56, GRAN], [1.06, -0.42, 0.46, EK], [1.24, -0.36, 0.52, GRAN], [1.42, -0.2, 0.46, GRAN]].map(([x, z, h, m]) => kort(m, h, x, z));
const TRADET = [-0.68, -0.24], LOVTRAD = kort(TRAD1, 0.78, ...TRADET);
const BUSKE_K = kort(BUSKE, 0.26, 1.06, -0.12);
// marken: vårgrönt kritark med små vita prickblommor
{
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#7CCB4E', '#A2DE72', '#5DB040', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0);
  x.fillStyle = '#FFFDF4'; for (let i = 0; i < 200; i++) { const px = 60 + ((i * 733) % (Wc - 120)), py = 60 + ((i * 397) % (D - 120)); x.beginPath(); x.arc(px, py, 4 + (i % 3) * 2, 0, 7); x.fill();
    if (i % 4 === 0) { x.fillStyle = '#F6D24A'; x.beginPath(); x.arc(px, py, 2.5, 0, 7); x.fill(); x.fillStyle = '#FFFDF4'; } }
  x.restore();
  platt(tex(c), 2.26 * BOK, 0, 0.0, 1.5 * BOK, SIDA + 0.0004);
}
// rabatten: tre tulpaner i tre lägen på samma fot. Den hängande bilden är bredare med foten vid 0,39–0,40 av bredden (bildlista.md):
// dx flyttar den så att foten hamnar på samma punkt, höjden i samma px-skala som den stående.
const TH = 0.38, TPOS = { rod: [-0.42, 0.0], gul: [0.0, -0.02], lila: [0.42, 0.06] }, FOTFR = { rod: 0.396, gul: 0.388, lila: 0.404 };
const TULPAN = {};
for (const f of ['rod', 'gul', 'lila']) {
  const [x, z] = TPOS[f], hb = TB[f].hanger.map, hh = TH * hb.image.height / TB[f].uppe.map.image.height, hw = hh * hb.image.width / hb.image.height;
  const knopp = kort(TB[f].knopp.map, TH, x, z), uppe = kort(TB[f].uppe.map, TH, x, z, { flik: false }), hanger = kort(hb, hh, x, z, { flik: false, dx: (0.5 - FOTFR[f]) * hw });
  TULPAN[f] = { knopp, uppe, hanger, x, z, krona: v3(x + (f === 'gul' ? 0 : 0), SIDA + TH * 0.78, z + 0.01), kronaH: v3(x + 0.33 * hw, SIDA + hh * 0.5, z + 0.01) };
}
// den gula ritas av kritan: kortet ligger platt bakåt från foten (bildsidan upp) tills det fälls upp (som 062:s glass)
const GUL_R = ruta(TB.gul.uppe.i);
// de små blommorna med djuren, utspridda framför till höger (inte framför musen)
const ROSA = [0.9, 0.18], GULA = [0.8, 0.5];
const ROSA_K = kort(ROSA_B, 0.18, ...ROSA), GULA_K = kort(GULA_B, 0.14, ...GULA);
// kannan: kritans teckning i gräset till höger om musen, sedan i handen, sedan tillbaka i gräset (rad 20)
const KANNAPOS = [0.42, 0.42], KH = 0.097;
const KANNA_K = kort(KANNA, KH, ...KANNAPOS);
const KANNA_R = ruta(KANNA_I);
// fågelboet i lövträdets grenklyka (storyboarden), fälls med trädet
const BO_OFF = v3(0.05, 0.4, 0.03), BOET = kort(BO, 0.085, 0, 0, { flik: false });

// ---- fjärilen och nyckelpigan: ritade i kod (prov/insekter/prov.js, Sanna valde kod 2026-11-27) ----
// Vaxkorn med kritYta, vit kant 3 px i bild och line boil 2,5 px i bild (räknat mot kamerans avstånd), ny brusbild 6 gånger/s.
let KANT = 14, BOIL = 3, fas = 0;
const brus = (i, k) => Math.sin(i * 12.9898 + k * 78.233 + fas * 37.719) * 43758.5453 % 1;
function blob(x, cx, cy, rx, ry, rot = 0, n = 48) {
  x.beginPath();
  for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, j = 1 + BOIL / Math.max(rx, ry) * brus(i % n, cx + cy);
    const px = Math.cos(a) * rx * j, py = Math.sin(a) * ry * j;
    x.lineTo(cx + px * Math.cos(rot) - py * Math.sin(rot), cy + px * Math.sin(rot) + py * Math.cos(rot)); }
  x.closePath();
}
const streck = (x, pts, w, farg) => { x.strokeStyle = farg; x.lineWidth = w; x.lineCap = x.lineJoin = 'round'; x.beginPath();
  pts.forEach(([a, b], i) => x[i ? 'lineTo' : 'moveTo'](a + BOIL * 0.5 * brus(i, a), b + BOIL * 0.5 * brus(i + 7, b))); x.stroke(); };
function krit(x, f, farg, ljus, mork) {
  const W = x.canvas.width, H = x.canvas.height, m = duk(W, H), mx = m.getContext('2d'); mx.fillStyle = '#000'; f(mx); mx.fill();
  const c = duk(W, H), y = c.getContext('2d'); kritYta(y, W, H, farg, ljus, mork, 1.4);
  y.globalCompositeOperation = 'destination-in'; y.drawImage(m, 0, 0); x.drawImage(c, 0, 0);
}
const vit = (x, f) => { f(x); x.fillStyle = '#FFF'; x.fill(); x.strokeStyle = '#FFF'; x.lineWidth = KANT * 2; x.lineJoin = 'round'; x.stroke(); };
function nyckelpiga(steg) {   // uppifrån, huvudet uppåt; steg 0/1 växlar benen
  const c = duk(300, 340), x = c.getContext('2d'), cx = 150, cy = 195;
  const ben = [-1, 1].flatMap(s => [-50, 0, 50].map((dy, i) => { const v = (i - 1) * 0.35 + ((i + steg) % 2 ? 0.18 : -0.18) * s;
    return [[cx + s * 70, cy + dy], [cx + s * (70 + 38 * Math.cos(v)), cy + dy + 38 * Math.sin(v) * s]]; }));
  const ant = [-1, 1].map(s => [[cx + s * 18, 92], [cx + s * 34, 62], [cx + s * 48, 58]]);
  const kropp = y => blob(y, cx, cy, 92, 100), huvud = y => blob(y, cx, 104, 44, 34);
  x.save(); x.strokeStyle = '#FFF'; x.lineCap = 'round'; x.lineWidth = 12 + KANT * 2; for (const p of [...ben, ...ant]) { x.beginPath(); x.moveTo(...p[0]); p.slice(1).forEach(q => x.lineTo(...q)); x.stroke(); }
  vit(x, kropp); vit(x, huvud); x.restore();
  for (const p of [...ben, ...ant]) streck(x, p, 10, '#231A16');
  krit(x, huvud, '#231A16', '#3A302A', '#120C0A');
  krit(x, kropp, '#E8322E', '#F25A4A', '#C42420');
  streck(x, [[cx, 102], [cx, 292]], 7, '#231A16');
  for (const [dx, dy, r] of [[-48, -42, 15], [48, -42, 15], [-58, 10, 16], [58, 10, 16], [-42, 58, 14], [42, 58, 14]]) krit(x, y => blob(y, cx + dx, cy + dy, r, r, 0, 20), '#231A16', '#3A302A', '#120C0A');
  return c;
}
function vinge(s) {   // en vinge (s = -1 vänster, 1 höger), roten vid x = 0 för höger, x = W för vänster
  const c = duk(230, 300), x = c.getContext('2d'), r = s > 0 ? 18 : 212, u = (dx, dy) => [r + s * dx, dy];
  const over = y => blob(y, ...u(100, 100), 96, 84, s * -0.35), under = y => blob(y, ...u(78, 222), 66, 62, s * 0.3);
  vit(x, over); vit(x, under);
  krit(x, y => { over(y); y.fill(); under(y); }, '#FF8A1F', '#FFA64A', '#E8700E');
  krit(x, y => blob(y, ...u(128, 88), 22, 22, 0, 20), '#FFC61A', '#FFD958', '#F0B000');
  krit(x, y => blob(y, ...u(88, 232), 17, 17, 0, 20), '#FFC61A', '#FFD958', '#F0B000');
  return c;
}
function fjarilKropp() {
  const c = duk(120, 340), x = c.getContext('2d'), k = [[60, 92], [60, 300]], a = [-1, 1].map(s => [[60, 92], [60 + s * 22, 40], [60 + s * 38, 26], [60 + s * 30, 16]]);
  x.strokeStyle = '#FFF'; x.lineCap = 'round'; for (const p of [k, ...a]) { x.lineWidth = (p === k ? 26 : 8) + KANT * 2; x.beginPath(); x.moveTo(...p[0]); p.slice(1).forEach(q => x.lineTo(...q)); x.stroke(); }
  for (const p of a) streck(x, p, 8, '#4A2A18'); streck(x, k, 26, '#5A341E');
  return c;
}
const insMat = map => new THREE.MeshLambertMaterial({ map, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide });
const plan = (c, w, h) => { const map = tex(c), m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), insMat(map)); m.castShadow = true; m.customDepthMaterial = djup(map); return m; };
const byt = (m, c) => { m.material.map.image = c; m.material.map.needsUpdate = true; m.customDepthMaterial.map = m.material.map; };
const NH = 0.05, FH = 0.075;
const NYCKELPIGA = plan(nyckelpiga(0), NH * 300 / 340, NH); scen.add(NYCKELPIGA);
const FJARIL = new THREE.Group(), VL = new THREE.Group(), VR = new THREE.Group();
const vl = plan(vinge(-1), FH * 230 / 300, FH), vr = plan(vinge(1), FH * 230 / 300, FH), kr = plan(fjarilKropp(), FH * 120 / 340, FH);
vl.geometry.translate(-FH * 230 / 300 / 2, 0, 0); vr.geometry.translate(FH * 230 / 300 / 2, 0, 0); kr.position.z = 0.001;
VL.add(vl); VR.add(vr); FJARIL.add(VL, VR, kr); scen.add(FJARIL);
let insFas = -1;
function ritaInsekter(t, steg) {   // ny brusbild 6 gånger/s, kanten och boilen i texturens px räknade mot kamerans avstånd
  const f = Math.floor(t * 6), k = `${f}-${steg}`; if (k === insFas) return; insFas = k; fas = f;
  const pxPerTex = m => { const d = m.getWorldPosition(v3()).sub(cam.position).dot(cam.getWorldDirection(v3())) || 1; return 540 / (d * Math.tan(cam.fov * Math.PI / 360)) * (NH / 340); };
  let s = pxPerTex(NYCKELPIGA); BOIL = kl(1, 12, 2.5 / s); KANT = kl(6, 30, 3 / s); byt(NYCKELPIGA, nyckelpiga(steg));
  s = pxPerTex(FJARIL) * FH / NH; BOIL = kl(1, 12, 2.5 / s); KANT = kl(6, 30, 3 / s); byt(vl, vinge(-1)); byt(vr, vinge(1)); byt(kr, fjarilKropp());
}

// ---- musen: v2-riggen på ett kort ----
// HAND finns inte i musens uttryck.html: händerna mätta ur mille-arm-l/-r.png (punkten längst från axeln, en bit in), munnen ur
// munbågen (y ca 460). Bara i den här scenen, riggen ändras inte.
window.HAND = { l: [172, 624], r: [851, 623], kant: 8, mun: [511, 460] };
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, FOT = 924, TOPP = 103;   // TOPP: öronens topp (mille-ear-r.png)
const L = await v2rigg('musen-mille'), G = L.figur(512, FOT, 1, $('figurer'));
G.querySelector('.skugga')?.setAttribute('display', 'none');
// kannan i höger hand: greppet mitt på handtagets ovankant, upprätt (folj 0), pipen åt höger mot blommorna
const PIP = [368, 78], KSKALA = KH / (0.26 / (FOT - TOPP)) / 339;
const SAK = L.sakBild(KANNA_URL, 388, 339, { grepp: [144, 36], fot: [194, 323], skala: KSKALA, folj: 0, kant: 4 });
L.sakIn(G, SAK);
await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
window.kant.lagg(G); const kantF = $('defs').lastElementChild;
const BL = skapaBlinka(31);
G.insertAdjacentHTML('beforeend', '<g id="dropparG"></g>');
L.rita(G, L.NEUTRAL, L.POSE0);
const MH = 0.26, ENHET = MH / (FOT - TOPP);   // musens höjd (öronen till fötterna) som storyboardens kort
const kortCanvas = duk(VB.w, VB.h), kortCtx = kortCanvas.getContext('2d'), kortTex = tex(kortCanvas);
const gg = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
gg.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna
const mus = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), alphaTest: 0.5, side: THREE.FrontSide }));
mus.add(new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, color: 0x000000, emissive: '#F4ECDD', alphaTest: 0.5, side: THREE.BackSide })));
mus.castShadow = mus.receiveShadow = true;
mus.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
scen.add(mus);
const MUSKORT = { m: mus, y: SIDA + 0.004, hog: 0.008 };
const fig2varld = ([x, y], pos = mus.position) => v3(pos.x + (x - 512) * ENHET, pos.y + (FOT - y) * ENHET, pos.z + 0.01);
const stillBild = new Image();

// ---- ljuset ----
scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const ljus = new THREE.DirectionalLight('#FFF0DC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);

// ---- skärpedjup (som 062) ----
const rt = new THREE.WebGLRenderTarget(W * PR, H * PR, { samples: 4, type: THREE.HalfFloatType });
const komp = new EffectComposer(R, rt); komp.setPixelRatio(PR); komp.setSize(W, H);
const bokeh = new BokehPass(scen, cam, { focus: 2, aperture: 0.002, maxblur: 0.006 });
bokeh.materialDepth = null;
const DJUP0 = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending }), bokehRender = bokeh.render.bind(bokeh);
bokeh.render = (...a) => {
  const byt = []; scen.traverse(o => { if (o.isMesh) { byt.push([o, o.material]); o.material = o.customDepthMaterial ?? DJUP0; } });
  const bg = scen.background; scen.background = null; bokehRender(...a); scen.background = bg;
  for (const [o, m] of byt) o.material = m;
};
komp.addPass(new RenderPass(scen, cam)); komp.addPass(bokeh); komp.addPass(new OutputPass());

// ---- tiderna ----
const OPPNA = S('02'), STANG = S('28');
// korten upp bakifrån och fram när pärmen slås upp; ner framifrån när boken stängs (musen först)
const SLOT = f => TULPAN[f].knopp;
const ORDNING = [...BAK, ...SKOG, LOVTRAD, BUSKE_K, ...['rod', 'gul', 'lila'].map(SLOT), ROSA_K, GULA_K].sort((a, b) => a.z - b.z);
ORDNING.forEach((k, i, a) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); });
const NER = [...ORDNING, KANNA_K].sort((a, b) => b.z - a.z);
NER.forEach((k, i, a) => k.ner = STANG + 0.3 + i * 0.5 / (a.length - 1));
const PARM_NER = [STANG + 1.05, STANG + 1.75];
const MUS_UPP = S('06') + 0.2;   // musens kort sist, på pop
// den gula: knoppen fälls ner när kritan kommer (rad 04), teckningen ligger på sidan, fylls i och fälls upp (rad 05)
const GUL_NER = S('04') + 0.05, GUL_KLAR = S('05') + 0.7, GUL_UPP = S('05') + 0.85;
// knopparna slår ut (rad 05b), blommorna hänger (rad 07b), reser sig på "upp"
const SLAR_UT = { rod: S('05b') + 0.3, lila: S('05b') + 1.3 }, HANGER = { rod: S('07b') + 0.1, gul: S('07b') + 1.1, lila: S('07b') + 2.1 };
// kannan: ritas (09), fylls och fälls upp (10), glider till handen (12), ställs tillbaka i gräset (20)
const KANNA_KLAR = S('10') + 0.55, KANNA_UPP = S('10') + 0.75, GLIDA = [S('12') + 0.1, S('12') + 0.9], SATT_NER = [S('20') + 0.1, S('20') + 0.9];
const FOTLUT = [S('12') + 0.85, S('12') + 1.55];   // lutar kannan för tidigt
const FOTDROPPAR = [1.0, 1.15, 1.3].map(s => S('12') + s - 0.3);   // landar på fötterna med droppljuden
// vattna: kannan lutas, dropparna faller i en båge på blomman, den reser sig på "upp"
const VATTNA = { rod: [S('14') + 0.1, UPP.rod], gul: [S('15') + 1.0, UPP.gul], lila: [S('19') + 1.0, UPP.lila] };
// musens platser och promenader (storyboardens MUSPOS): till vänster om blomman den vattnar, kannan i höger hand
const MUSPOS = { start: [0.2, 0.26], rod: [-0.66, 0.22], gul: [-0.22, 0.2], lila: [0.2, 0.26], blommor: [0.56, 0.28] };
const GA = [[S('13') + 3.0, S('14') - 0.05, 'start', 'rod'], [S('15') - 0.7, S('15') + 0.9, 'rod', 'gul'], [S('19') - 0.7, S('19') + 0.9, 'gul', 'lila'],
  [S('21') + 2.6, S('21') + 4.8, 'lila', 'blommor'], [S('26b') + 0.1, S('26b') + 1.8, 'blommor', 'start']];
const SKUTT = [{ t0: S('12b') + 0.15, d: 0.38, h: 0.03 }, { t0: S('12b') + 0.6, d: 0.34, h: 0.022 }];   // två små glädjeskutt
function musPos(t) {
  let [x, z] = MUSPOS.start, y = 0;
  for (const [a, b, f, g] of GA) { if (t >= b) [x, z] = MUSPOS[g]; else if (t >= a) { const u = (t - a) / (b - a), m = 0.12 * u + 0.88 * mjuk(u);
    x = lerp(MUSPOS[f][0], MUSPOS[g][0], m); z = lerp(MUSPOS[f][1], MUSPOS[g][1], m); } }
  for (const K of SKUTT) { const u = (t - K.t0) / K.d; if (u > 0 && u < 1) y += K.h * Math.sin(Math.PI * u); }
  return [x, y, z];
}
const gar = t => { for (const [a, b, f, g] of GA) if (t > a - 0.25 && t < b + 0.25) return { k: bump(a, b, t, 0.25), dir: Math.sign(MUSPOS[g][0] - MUSPOS[f][0]) }; return null; };
// fjärilen: flyger till huvudet (rad 23) och tillbaka (rad 23b)
const FLYG = [[S('23') + 0.2, S('23') + 1.4], [S('23b') + 2.4, S('23b') + 3.4]];
const HUVUD = [512, 212];   // mellan öronen, huvudets topp
const KLAPP = S('20') + 0.3 + LN(31) + 0.1 - 1.0;   // riggens klapp möts vid 1, 1,5 och 2 s
const HEJ = [[S('06') + 0.6, S('06b') - 0.4, 1, false], [S('26') + 0.3, S('26b') - 0.1, 0, true], [S('27') + 0.2, STANG + 0.25, 0, true]];

// ---- kritan ritar (som 062: konturen läggs på 3D-ytan med en affin avbildning ur kamerans projektion) ----
const skarm = p => { const q = p.clone().project(cam); return [(q.x + 1) * 960, (1 - q.y) * 540]; };
function affin(mesh, r) {
  mesh.updateMatrixWorld(true); const g = mesh.geometry; g.computeBoundingBox(); const b = g.boundingBox;
  const varld = (ix, iy) => mesh.localToWorld(v3(lerp(b.min.x, b.max.x, (ix - r.ox) / r.w), lerp(b.max.y, b.min.y, (iy - r.oy) / r.h), 0));
  const cx = r.W / 2, cy = r.H / 2, d = r.W / 4, [x0, y0] = skarm(varld(cx, cy)), [x1, y1] = skarm(varld(cx + d, cy)), [x2, y2] = skarm(varld(cx, cy + d));
  const a = (x1 - x0) / d, b2 = (y1 - y0) / d, c = (x2 - x0) / d, e = (y2 - y0) / d;
  return { m: [a, b2, c, e, x0 - a * cx - c * cy, y0 - b2 * cx - e * cy], p: ([x, y]) => [a * x + c * y + x0 - a * cx - c * cy, b2 * x + e * y + y0 - b2 * cx - e * cy] };
}
const RIT = [];
function teckning(namn, href, r, mesh, T, fyll, vanta) { RIT.push({ namn, href, r, mesh, T, fyll, vanta, drag: KONTUR[namn] }); }
const KS = KRITAN.SKALA_SCEN * 1.25;   // kritan i närbild (062 runda 4)
function ritaKritan(t) {
  let h = '';
  for (const D of RIT) {
    const { T, fyll: [f0, f1], r } = D;
    if (t < T.in[0] || t > Math.max(T.ut[1], f1 + 0.5)) continue;
    const A = affin(D.mesh, r), f = k01((t - f0) / (f1 - f0)), k = ritfart((t - T.rit[0]) / (T.rit[1] - T.rit[0]));
    const Rb = ritBana(D.drag, k, { attr: `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${KRITAN.BRED}" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" opacity="${linjeOpacitet(f).toFixed(2)}"` });
    const cx = r.W / 2, cy = r.H / 2, op = 1 - k01((t - f1) / 0.2);
    h += `<g transform="matrix(${A.m.map(x => x.toFixed(4)).join(' ')})">`;
    if (f > 0 && op > 0) h += fyllMask('fy' + D.namn, cx, cy, Math.hypot(r.W, r.H) / 2, f) + `<image href="${D.href}" width="${r.W}" height="${r.H}" opacity="${op.toFixed(3)}" ${f < 1 ? `clip-path="url(#fy${D.namn})"` : ''}/>`;
    if (k > 0 && f < 1) h += Rb.html;
    h += '</g>';
    const [sx, sy] = A.p([cx, cy]), kr = kritaFas(t, T, { start: A.p(Rb.start), spets: A.p(Rb.spets), slut: A.p(Rb.slut), vanta: [sx + D.vanta[0], sy + D.vanta[1]], s: KS });
    if (kr) h += kritaBild(kr.x, kr.y, kr);
    if (f > 0) h += gnistor(sx, sy, Math.hypot(...A.p([r.W, cy]).map((v, i) => v - [sx, sy][i])) * 1.1, t - f0);
  }
  return h;
}
{ const a = S('04'), b = S('05'), c = S('09'), d = S('10');
  teckning('tulpan-gul', RQ + 'tulpan-gul/cut/tulpan-gul.png', GUL_R, TULPAN.gul.uppe.m,
    { in: [a + 0.5, a + 0.9], rit: [a + 1.0, a + 4.3], vanta: [a + 4.4, a + 5.1], ut: [b + 0.1, b + 0.9] }, [b + 0.1, b + 0.7], [330, -60]);
  teckning('vattenkanna', RQ + 'vattenkanna/cut/vattenkanna.png', KANNA_R, KANNA_K.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, c + 3.2], vanta: [c + 3.3, c + 4.0], ut: [d + 0.1, d + 0.9] }, [d + 0.05, d + 0.55], [300, 20]); }
// siffrorna 1, 2, 3 i krita: bara linjen (ritBana ur kritan-ritar.js), ritas på ordet vid blomman, i en 100 × 140-ruta
const SIFFRA_D = [['M30 38 L56 14 L56 128'], ['M20 46 C20 6 88 4 86 46 C84 78 40 96 18 128 L90 128'],
  ['M22 26 C44 4 90 12 82 44 C77 64 52 68 44 68 C62 68 92 76 86 102 C80 136 30 136 16 112']];
function siffror(t) {
  const r = rad(t), id = r.id; let h = '';
  const visa = (i, t0, t1) => { if (t < t0 || t > t1) return; const f = ['rod', 'gul', 'lila'][i], T = TULPAN[f];
    const p = v3(T.x + 0.16, SIDA + 0.2, T.z + 0.03), [x, y] = skarm(p), [, y2] = skarm(p.clone().add(v3(0, 0.08, 0))), s = Math.abs(y - y2) / 140;
    const k = ritfart((t - t0) / 0.4), op = Math.min(1, (t1 - t) / 0.3);
    h += `<g transform="translate(${(x - 50 * s).toFixed(1)} ${(y - 70 * s).toFixed(1)}) scale(${s.toFixed(4)})" opacity="${op.toFixed(2)}">`
      + ritBana(SIFFRA_D[i], k, { attr: `fill="none" stroke="#FFF" stroke-width="${(KRITAN.BRED * 2.4).toFixed(1)}" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"` }).html
      + ritBana(SIFFRA_D[i], k, { attr: `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${KRITAN.BRED}" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"` }).html + '</g>';
    if (t - t0 < 1) h += gnistor(x, y, 70 * s * 2, t - t0 - 0.3, 4); };
  visa(0, SIFFRA_T[0], S('15') + 0.3); visa(1, SIFFRA_T[1], S('16') + 0.3); visa(2, SIFFRA_T[2], S('20'));
  const slut = S('20') + RR['20'].d - 0.7; RAKNA.forEach((a, i) => visa(i, a, slut));
  return h;
}

// ---- musens rörelser per rad ----
const BU = n => L.blanda('neutral', n, 1);
const OPPEN = { ...L.param('jatteglad'), glad: [0, 0] };   // glad med öppna ögon och munnen synlig (Sannas regel)
const nick = (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p];
// vinkar: armen bakom kroppen, snett upp och ut förbi kanten (som 034:s mus, 86° ± 12°); hej då lite högre och tydligare
function vink(f, p, tl, d, i, stor) {   // armens hela vinkel (uttrycket + posen) blir 70° ± 14°: snett upp och ut förbi kroppens kant
  if (tl < 0 || tl > d) return [f, p];
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * 1.2 * tl), [a, b] = stor ? [76, 16] : [70, 14];
  const f2 = L.blanda(f, OPPEN, upp * 0.8); f2.armar = f.armar.map(v => lerp(v, 8, upp));   // den andra armen vilar
  const armar = [...p.armar], fram = [...(p.fram || [0, 0])]; armar[i] = lerp(armar[i], a + b * s - f2.armar[i], upp); armar[1 - i] *= 1 - upp; fram[i] = 0;
  return [f2, { ...p, armar, fram, luta: (p.luta || 0) + (i ? -1 : 1) * upp * (1.5 + 1.0 * s) }];
}
const REAKTION = { '06b': 'kawaii', '07': 'nyfiken', '07b': 'ledsen', '08b': 'tanker', '09': 'nyfiken', '10': 'kawaii', '11': OPPEN, '12': 'forvanad',
  '12b': OPPEN, '13': 'stolt', '14': OPPEN, '14b': 'kawaii', '15': OPPEN, '15b': 'kawaii', '16': 'nyfiken', '17': 'tanker', '18': 'kawaii', '19': OPPEN,
  '19b': 'stolt', '20': 'kawaii', '20b': OPPEN, '21': 'nyfiken', '22': 'kawaii', '22b': 'nyfiken', '23': 'forvanad', '23b': OPPEN, '24': 'nyfiken',
  '24b': 'kawaii', '24c': 'kawaii', '24d': OPPEN, '25': OPPEN };
let fotDroppar = '', handIDetta = false;
function musen(t) {
  const r = rad(t), tl = t - r.s, id = r.id;
  let f = BU('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  handIDetta = t >= GLIDA[1] && t < SATT_NER[0];
  if (handIDetta) p.hall = [0, 1];
  // lutar kannan: för tidigt (rad 12) och när den vattnar
  let lut = bump(FOTLUT[0], FOTLUT[1], t, 0.2);
  for (const [a, b] of Object.values(VATTNA)) lut = Math.max(lut, bump(a, b + 0.45, t, 0.35));
  p.sakV = 34 * lut; p.armar = [p.armar[0], p.armar[1] + 14 * lut];
  switch (id) {
    case '06b': { const sv = SVAR('06b', 9) - r.s; f = { ...f, titt: tl < 1.4 ? [-9, -9] : [0, 0] }; p.rikt = tl < 1.4 ? -0.3 * mjuk(tl / 0.4) : 0;
      f = L.blanda(f, 'kawaii', bump(sv, sv + 1.4, tl)); [f, p] = nick(f, p, tl - sv); break; }
    case '07': f = { ...f, titt: [9, -11] }; p.rikt = 0.25; break;   // tittar upp mot solen
    case '07b': { f = L.blanda({ ...f, titt: [-6, -4] }, 'nyfiken', 0.5); const k = mjuk((tl - 1.4) / 1.2); f = L.blanda(f, 'ledsen', 0.35 * k); p.oron = [12 * k, 12 * k]; break; }
    case '08': f = L.blanda(BU('nyfiken'), 'ledsen', 0.4); f.titt = [-6, 6]; p.luta = 5 * mjuk(tl / 0.6); p.oron = [16, 16]; break;   // huvudet på sned, öronen sjunker
    case '08b': f = L.blanda(BU('nyfiken'), 'ledsen', 0.2); p.oron = [10, 10]; break;
    case '09': f = BU('nyfiken'); f.titt = [10, 8]; p.rikt = 0.4 * mjuk(tl / 0.6); break;   // tittar på kritan som ritar
    case '10': f = L.blanda(BU('nyfiken'), 'kawaii', mjuk((tl - 0.7) / 0.4)); f.titt = [8, 6]; p.rikt = 0.35 * (1 - mjuk((tl - 2.5) / 0.6)); break;
    case '11': f = OPPEN; [f, p] = nick(f, p, tl - 1.3); break;
    case '12': { const ner = mjuk((t - FOTLUT[0] - 0.35) / 0.3); f = L.blanda({ ...BU('glad'), titt: [8, 6] }, { ...BU('forvanad'), titt: [2, 14] }, ner); p.upp = -0.5 * ner; break; }
    case '12b': { f = L.blanda(BU('forvanad'), OPPEN, mjuk(tl / 0.4)); f.titt = [0, 8]; const sk = bump(1.0, 2.2, tl, 0.2);   // skakar foten lite
      p.benY = [0, -22 * sk * Math.max(0, Math.sin(2 * Math.PI * 3 * tl))]; p.ben = [0, 8 * sk]; break; }
    case '13': { const sv = SVAR('13', 20) - r.s; f = { ...f, titt: [-6, -2] }; [f, p] = nick(f, p, tl - sv); f = L.blanda(f, OPPEN, bump(sv, sv + 1.2, tl)); break; }
    case '14': case '15': case '19': { const fl = id === '14' ? 'rod' : id === '15' ? 'gul' : 'lila'; f = { ...BU('glad'), titt: [9, 4] }; p.rikt = 0.35;
      f = L.blanda(f, OPPEN, mjuk((t - UPP[fl] - 0.1) / 0.3)); break; }
    case '14b': case '15b': case '19b': f = L.blanda(BU('glad'), 'stolt', 0.5); break;
    case '16': p.rikt = 0.5 * Math.sin(tl * 1.4); f = BU('nyfiken'); f.titt = [10 * Math.sin(tl * 1.4), -2]; break;
    case '17': p.rikt = 0.4 * Math.sin(tl * 0.9); f = BU('nyfiken'); f.titt = [9 * Math.sin(tl * 0.9), -3]; break;
    case '18': { const sv = SVAR('18', 28) - r.s; f = L.blanda({ ...BU('nyfiken'), titt: [10, -2] }, 'kawaii', bump(sv, sv + 1.2, tl)); p.rikt = 0.5; break; }
    case '20': if (t > KLAPP && t < KLAPP + 2.8) { [f, p] = L.ROR.klappa(t - KLAPP); f = L.blanda(f, OPPEN, 0.6); } break;
    case '20b': f = { ...f, titt: [7, -10] }; break;
    case '21': f = { ...f, titt: [9, 2] }; break;
    case '22': f = L.blanda(BU('nyfiken'), 'kawaii', mjuk((t - ORD_FJARIL) / 0.4)); f.titt = [12, -4]; p.rikt = 0.5; break;
    case '22b': f = BU('nyfiken'); f.titt = [10, 8]; p.rikt = 0.4; break;
    case '23': { const land = FLYG[0][1]; f = { ...BU('glad'), titt: [10, -6] }; p.rikt = 0.4 * (1 - mjuk((t - land + 0.4) / 0.5));
      const up = mjuk((t - land + 0.1) / 0.4); f = L.blanda(f, { ...BU('forvanad'), titt: [0, -15], ogonS: [1.05, 1.1] }, up); p.upp = 0.35 * up; break; }
    case '23b': { f = L.blanda({ ...BU('forvanad'), titt: [0, -15] }, OPPEN, mjuk(tl / 0.4)); const w = bump(0, 1.4, tl, 0.2) * Math.sin(2 * Math.PI * 3 * tl);   // öronen vickar
      p.oron = [12 * w, -12 * w]; const ut = mjuk((t - FLYG[1][0]) / 0.5); f.titt = [12 * ut, -15 * (1 - ut)]; p.rikt = 0.4 * ut; break; }
    case '24': f = BU('nyfiken'); f.titt = [-12, -12]; p.rikt = -0.5 * mjuk(tl / 0.6); break;   // upp mot trädet
    case '24b': case '24c': case '24d': f = L.blanda(BU('glad'), 'kawaii', id === '24d' ? 0.4 : 0.9); f.titt = [-12, -10]; p.rikt = -0.5; break;
    case '25': { const sv = SVAR('25', 42) - r.s; [f, p] = nick(f, p, tl - sv); f = L.blanda(f, OPPEN, bump(sv, sv + 1.4, tl)); break; }
  }
  for (const [a, b, i, stor] of HEJ) [f, p] = vink(f, p, t - a, b - a, i, stor);
  // gången: lugna små steg, svansen vickar i takt
  const g = gar(t);
  if (g && g.k > 0) { const [, ps] = L.steg(t, 0.55 * g.k, g.dir * g.k);
    p = { ...p, ...ps, armar: p.armar.map((v, i) => lerp(v, ps.armar[i], g.k)), hall: p.hall, sakV: p.sakV, svans: 14 * g.k * Math.sin(2 * Math.PI * 1.2 * t) };
    f = { ...f, titt: [6 * g.dir * g.k, 2] }; }
  // glädjeskutten: hukar före, landar mjukt
  for (const K of SKUTT) p = L.blandaPose(p, 'huka', 0.5 * bump(K.t0 - 0.18, K.t0 + 0.03, t, 0.1) + 0.35 * bump(K.t0 + K.d - 0.02, K.t0 + K.d + 0.18, t, 0.08));
  if (handIDetta) p.hall = [0, 1];
  p.sakV = 34 * lut;
  // reaktionsslaget i radens slut (GLES)
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.85 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas

  return [BL(f, t), p];
}

// ---- en bildruta ----
let PIPV = null;   // pipens spets i världen (räknas efter att riggen ritats)
const pipPunkt = () => { const ting = G.querySelector('.sak-plats[display="inline"] .sak-ting'); if (!ting) return null;
  const M = DOMMatrix.fromMatrix($('figurer').getCTM()).inverse().multiply(DOMMatrix.fromMatrix(ting.getCTM())); const q = M.transformPoint(new DOMPoint(...PIP)); return [q.x, q.y]; };
async function ritaMus(t) {
  const [x, y, z] = musPos(t); mus.position.set(x, MUSKORT.y + y, z);
  const [f, p] = musen(t);
  L.rita(G, f, p); L.sakRita(G, p);
  G.querySelectorAll('.sak-plats image').forEach(im => im.setAttribute('opacity', handIDetta ? 1 : 0));
  const pp = handIDetta ? pipPunkt() : null; PIPV = pp ? fig2varld(pp) : null;
  // dropparna på fötterna (rad 12): ur pipen i en båge ner på högra foten, delar sig och rinner av
  let d = '';
  const dr = (x, y, s, op = 1) => `<path d="M${x.toFixed(1)} ${(y - 24 * s).toFixed(1)} Q${(x + 14 * s).toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${(y + 9 * s).toFixed(1)} Q${(x - 14 * s).toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${(y - 24 * s).toFixed(1)}Z" fill="#9FD8F5" stroke="#fff" stroke-width="5" opacity="${op.toFixed(2)}"/>`;
  if (pp) FOTDROPPAR.forEach((a, i) => { const u = (t - a) / 0.35, mal = [[575, 884], [628, 888], [600, 880]][i];
    if (u > 0 && u < 1) d += dr(lerp(pp[0], mal[0], u), lerp(pp[1], mal[1], u * u) - 90 * Math.sin(Math.PI * u) * (1 - u), 2.0);
    const v = (t - a - 0.35) / 0.3; if (v > 0 && v < 1) for (const sd of [-1, 1]) d += `<circle cx="${(mal[0] + sd * 60 * v).toFixed(1)}" cy="${(mal[1] - 40 * Math.sin(Math.PI * v)).toFixed(1)}" r="${(13 * (1 - v * 0.5)).toFixed(1)}" fill="#BDE7FA" stroke="#fff" stroke-width="5"/>`; });
  for (const [i, a] of FOTDROPPAR.entries()) { const w = (t - a - 0.35) / 1.2, mal = [[575, 884], [628, 888], [600, 880]][i];   // pärlan rinner av foten
    if (w > 0 && w < 1) d += dr(mal[0] + 12 * mjuk(w), mal[1] + 30 * mjuk(w), 1.3, Math.min(1, (1 - w) * 4)); }
  $('dropparG').innerHTML = d;
  // boil 2,5 px i bild och vit kant 3 px i bild, räknat mot 3D-kamerans skala
  const mitt = mus.position.clone().add(v3(0, 0.13, 0)), dd = mitt.clone().sub(cam.position).dot(cam.getWorldDirection(v3())) || 3;
  const s = 540 / (dd * Math.tan(cam.fov * Math.PI / 360)) * ENHET;
  $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1); $('boilStyrka').setAttribute('scale', (2.5 / s).toFixed(2));
  const ru = 3 / s;
  kantF.querySelector('feMorphology[result="d"]')?.setAttribute('radius', ru.toFixed(3));
  kantF.querySelector('feDisplacementMap')?.setAttribute('scale', (0.35 * ru).toFixed(3));
  const tu = kantF.querySelectorAll('feTurbulence'); tu[0]?.setAttribute('baseFrequency', (0.05 * s).toFixed(5)); tu[1]?.setAttribute('baseFrequency', (0.35 * s).toFixed(5));
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString($('kort'))], { type: 'image/svg+xml' }));
  stillBild.src = url; await stillBild.decode(); URL.revokeObjectURL(url);
  kortCtx.clearRect(0, 0, VB.w, VB.h); kortCtx.drawImage(stillBild, 0, 0, VB.w, VB.h); kortTex.needsUpdate = true;
}

// vattnet ur kannan: små droppar i en båge från pipen ner på bladen vid stjälkens fot, framför kortet
const DROPPAR = new THREE.Group();
for (let i = 0; i < 12; i++) DROPPAR.add(new THREE.Mesh(new THREE.SphereGeometry(0.0065 + 0.002 * (i % 2), 12, 10), mat(null, { color: '#BFE6FF', emissive: '#3f86c0', emissiveIntensity: 0.35 })));
scen.add(DROPPAR);
function vattna(t) {
  DROPPAR.visible = false; if (!PIPV) return;
  const e = Object.entries(VATTNA).find(([, [a, b]]) => t > a + 0.3 && t < b + 0.35); if (!e) return;
  const [fl, [a, b]] = e, T = TULPAN[fl], mal = v3(T.x - 0.03, SIDA + 0.055, T.z + 0.02);
  DROPPAR.visible = true;
  DROPPAR.children.forEach((d, i) => { const t0 = a + 0.3 + i * 0.09, u = ((t - t0) * 1.6) % 1;   // en droppe i taget, 0,6 s i luften
    d.visible = t >= t0 && t - (t - t0) % 0.625 < b - 0.05; if (!d.visible) return;
    d.position.set(lerp(PIPV.x, mal.x, u) + 0.004 * Math.sin(i * 2.3), lerp(PIPV.y, mal.y, u * u) + 0.03 * Math.sin(Math.PI * u) * (1 - u), lerp(PIPV.z, mal.z, u)); });
}

const glimt = (t, a, d = 0.6) => bump(a, a + d, t, 0.2);
async function bildruta(t) {
  const oppen = t < STANG ? k01((t - OPPNA) / 0.9) : 1 - mjuk((t - PARM_NER[0]) / (PARM_NER[1] - PARM_NER[0]));
  satt(PARM0 + (PARM1 - PARM0) * oppen);
  const fallE = k => { let e = k.upp != null ? reser((t - k.upp) / 0.45) : 0; if (k.ner != null) e *= 1 - mjuk((t - k.ner) / 0.35); return e; };
  for (const k of ORDNING) { const e = fallE(k); vik(k, e); if (k.flik) k.flik.visible = e > 0.6; k.m.rotation.z = 0; k.m.scale.setScalar(1); }
  // tulpanerna: samma fällning för alla tre lägen, bildbyte mellan dem
  const svaj = t >= S('20') && t < S('21') || t >= S('26b') && t < S('26c') ? 1 : 0;
  ['rod', 'gul', 'lila'].forEach((fl, i) => {
    const T = TULPAN[fl], e = fallE(T.knopp);
    let lage = 'knopp';
    if (fl === 'gul') lage = t < GUL_NER ? 'knopp' : t < HANGER.gul ? 'uppe' : t < UPP.gul ? 'hanger' : 'uppe';
    else lage = t < SLAR_UT[fl] ? 'knopp' : t < HANGER[fl] ? 'uppe' : t < UPP[fl] ? 'hanger' : 'uppe';
    for (const l of ['knopp', 'uppe', 'hanger']) { const k = T[l]; k.m.visible = l === lage; vik(k, e); k.m.rotation.z = 0; k.m.scale.setScalar(1); k.m.material.emissive.setScalar(0); }
    if (fl === 'gul') {   // knoppen fälls ner, teckningen ligger platt bakåt, fylls i och fälls upp
      const kn = T.knopp; if (t >= GUL_NER && t < GUL_NER + 0.4) { kn.m.visible = true; vik(kn, 1 - mjuk((t - GUL_NER) / 0.4)); kn.m.position.y += 0.006; }
      if (t >= GUL_NER && t < GUL_UPP + 0.5) { const u = T.uppe.m, up = reser((t - GUL_UPP) / 0.45);
        u.visible = t >= GUL_KLAR - 0.05; u.rotation.x = -Math.PI / 2 * (1 - up); u.position.y = SIDA + 0.0025 * (1 - up); }
      if (T.knopp.flik) T.knopp.flik.visible = t < GUL_NER || t > GUL_UPP + 0.25 ? T.knopp.flik.visible : false;
    }
    const k = T[lage].m;
    // pop när knoppen slår ut (0,9 → 1,0), långsam vickning när den hänger, liten vickning när den reser sig
    if (SLAR_UT[fl] && t >= SLAR_UT[fl] && t < SLAR_UT[fl] + 0.6) k.scale.setScalar(0.9 + 0.1 * reser((t - SLAR_UT[fl]) / 0.45));
    if (lage === 'hanger') { const u = t - HANGER[fl]; k.rotation.z = -0.07 * Math.exp(-u * 2.5) * Math.sin(u * 7) ; }
    if (lage === 'uppe' && t >= UPP[fl]) { const u = t - UPP[fl]; k.rotation.z += 0.06 * Math.exp(-u * 3) * Math.sin(u * 9); k.scale.setScalar(1 + 0.06 * bump(UPP[fl], UPP[fl] + 0.6, t, 0.2)); }
    if (svaj && lage === 'uppe') k.rotation.z += 0.03 * Math.sin(t * 1.6 + i * 2.1);
    if (t >= HEJ_BLOMMOR - 0.2 && t < HEJ_BLOMMOR + 1.2) k.scale.setScalar(1 + 0.07 * glimt(t, HEJ_BLOMMOR + i * 0.12));
  });
  // den lila skimrar (rad 17 svagt efter 2 s, rad 18 tydligt)
  const sk0 = S('17') + 0.2 + LN(27) + 2.0, skim = t < S('18') ? 0.35 * k01((t - sk0) / 0.6) * (0.6 + 0.4 * Math.sin((t - sk0) * 5)) : t < S('19') ? 0.7 + 0.3 * Math.sin((t - S('18')) * 5) : 0;
  TULPAN.lila.hanger.m.material.emissive.setScalar(0.12 * skim);
  // musens kort: fälls upp sist (rad 06) med en efterstudsning, ner först när boken stängs
  vik(MUSKORT, reser((t - MUS_UPP) / 0.5) * (1 - mjuk((t - STANG - 0.25) / 0.35)));
  // solen glimtar (rad 07, 20b)
  SOLEN.scale.setScalar(1 + 0.1 * Math.max(glimt(t, S('07') + 0.3, 0.8), glimt(t, S('20b') + 0.2, 0.8)));
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // kannan: ligger platt där kritan ritade den, reser sig, glider till handen; ställs tillbaka i gräset (rad 20)
  const K = KANNA_K, ke = fallE(K);
  K.m.scale.setScalar(1); K.m.position.set(K.x, K.y, K.z); K.m.visible = t >= KANNA_KLAR - 0.05 && (t < GLIDA[1] || t >= SATT_NER[1] - 0.02);
  if (t < GLIDA[1]) { K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - KANNA_UPP) / 0.45)); K.m.position.y = SIDA + 0.0025 * (t < KANNA_UPP ? 1 : 0); }
  else vik(K, t >= STANG ? ke : 1);
  K.flik.visible = K.m.visible && (t > KANNA_UPP + 0.3 && t < GLIDA[0] || t >= SATT_NER[1]) && t < K.ner + 0.1;
  const hand = () => { const h = fig2varld(window.HAND.r); h.y -= (323 - 36) * KSKALA * ENHET; h.x += (194 - 144) * KSKALA * ENHET; return h; };   // kannans fot under greppet
  if (t >= GLIDA[0] && t < GLIDA[1]) { const u = mjuk((t - GLIDA[0]) / (GLIDA[1] - GLIDA[0])), mal = hand();
    K.m.visible = true; K.m.rotation.x = 0; K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y, u) + 0.08 * Math.sin(Math.PI * u), lerp(K.z, mal.z, u)); }
  if (t >= SATT_NER[0] && t < SATT_NER[1]) { const u = mjuk((t - SATT_NER[0]) / (SATT_NER[1] - SATT_NER[0])), fr = hand();
    K.m.visible = true; K.m.rotation.x = 0; K.m.position.set(lerp(fr.x, K.x, u), lerp(fr.y, K.y, u) + 0.06 * Math.sin(Math.PI * u), lerp(fr.z, K.z, u)); }
  // boet i lövträdets grenklyka, fälls med trädet; glimtar på "fågelbo" och "Hej då, fågelboet!"
  LOVTRAD.m.updateMatrixWorld(true);
  { const p = LOVTRAD.m.localToWorld(BO_OFF.clone()); BOET.m.position.copy(p); BOET.m.rotation.x = LOVTRAD.m.rotation.x;
    BOET.m.scale.setScalar(1 + 0.12 * Math.max(glimt(t, ORD_BO, 0.7), glimt(t, HEJ_BO, 0.7))); BOET.m.visible = LOVTRAD.m.rotation.x < 1.5; }
  // fjärilen: på den rosa blomman (fälls med den), vingarna fälls sakta; flyger till huvudet och tillbaka
  ROSA_K.m.updateMatrixWorld(true); GULA_K.m.updateMatrixWorld(true);
  const paRosa = ROSA_K.m.localToWorld(v3(0, 0.12, 0.008)), paHuvud = fig2varld(HUVUD).add(v3(0, FH * 0.32, 0.012));
  const flyger = FLYG.find(([a, b]) => t >= a && t < b), paHuvudet = t >= FLYG[0][1] && t < FLYG[1][0];
  let fp = paHuvudet ? paHuvud : paRosa, flaxa = 0.12 + 0.32 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 0.35 * t));
  if (flyger) { const [a, b] = flyger, u = (t - a) / (b - a), [p0, p1] = flyger === FLYG[0] ? [paRosa, paHuvud] : [paHuvud, paRosa];
    fp = p0.clone().lerp(p1, mjuk(u)); fp.y += 0.12 * Math.sin(Math.PI * u); flaxa = 0.25 + 0.55 * (0.5 - 0.5 * Math.cos(2 * Math.PI * 3 * (t - a))); }
  FJARIL.position.copy(fp); FJARIL.rotation.set(paHuvudet || flyger ? -0.25 : ROSA_K.m.rotation.x - 0.25, 0, flyger ? 0.15 * Math.sin(t * 4) : 0);
  VL.rotation.y = -flaxa; VR.rotation.y = flaxa;
  FJARIL.scale.setScalar(1 + 0.15 * Math.max(glimt(t, ORD_FJARIL), glimt(t, HEJ_FJARIL)));
  FJARIL.visible = ROSA_K.m.rotation.x < 1.5 || paHuvudet || !!flyger;
  // nyckelpigan på de gula blommorna: kryper lite (benen växlar 4 gånger/s) på rad 22b och 26c
  const kryp = Math.max(bump(S('22b') + 0.2, S('22b') + 2.6, t, 0.3), bump(S('26c') + 0.2, S('26c') + 2.0, t, 0.3));
  const kx = 0.014 * Math.sin(Math.min(t - S('22b'), 9) * 0.9) * (t > S('22b') ? 1 : 0);
  NYCKELPIGA.position.copy(GULA_K.m.localToWorld(v3(kx, 0.1, 0.008))); NYCKELPIGA.rotation.set(GULA_K.m.rotation.x - 0.5, 0, 0);
  NYCKELPIGA.scale.setScalar(1 + 0.15 * Math.max(glimt(t, ORD_PIGA), glimt(t, HEJ_PIGA))); NYCKELPIGA.visible = GULA_K.m.rotation.x < 1.5;
  ritaInsekter(t, kryp > 0.1 ? Math.floor(t * 4) % 2 : 0);
  await ritaMus(t);
  vattna(t);
  // fokus på vyns mål
  const v = VYER[Math.max(0, VYER.findLastIndex(w => w.t <= t))];
  bokeh.uniforms.focus.value = cam.position.distanceTo(v.mal); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002;
  scen.updateMatrixWorld(true);
  // kritan, siffrorna och glimtarnas gnistor i #ov
  let ov = ritaKritan(t) + siffror(t);
  const gn = (t0, p, R = 90, n = 4) => { if (t < t0 || t > t0 + 1.2) return ''; const [x, y] = skarm(p); return gnistor(x, y, R, t - t0, n); };
  ov += gn(SLAR_UT.rod, TULPAN.rod.krona) + gn(SLAR_UT.lila, TULPAN.lila.krona);
  for (const fl of ['rod', 'gul', 'lila']) ov += gn(UPP[fl], TULPAN[fl].krona, 110, 5);
  SOLEN.updateMatrixWorld(true); const solp = SOLEN.getWorldPosition(v3());
  ov += gn(S('07') + 0.3, solp, 130, 5) + gn(S('20b') + 0.2, solp, 130, 5);
  if (t > sk0 && t < S('19')) { const [x, y] = skarm(TULPAN.lila.kronaH); ov += gnistor(x, y, 110, (t - sk0) % 1.2, 4); }
  ov += ['rod', 'gul', 'lila'].map((fl, i) => gn(S('20b') + 1.1 + i * 0.15, TULPAN[fl].krona) + gn(HEJ_BLOMMOR + i * 0.12, TULPAN[fl].krona)).join('');
  ov += gn(ORD_FJARIL, FJARIL.position, 70) + gn(HEJ_FJARIL, FJARIL.position, 70) + gn(ORD_PIGA, NYCKELPIGA.position, 60) + gn(HEJ_PIGA, NYCKELPIGA.position, 60);
  const bop = BOET.m.localToWorld(v3(0, 0.045, 0.005)); ov += gn(ORD_BO, bop, 110, 5) + gn(HEJ_BO, bop, 110, 5);
  // äggen glimtar ett i taget (rad 24c): ett mjukt ljus och små gnistor på varje ägg
  AGG.forEach((a, i) => { if (t < a || t > a + 1.0) return; const p = BOET.m.localToWorld(v3((-0.25 + 0.25 * i) * 0.085 * 404 / 293, 0.085 * 0.72, 0.006)), [x, y] = skarm(p), k = bump(a, a + 0.9, t, 0.25);
    ov += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(40 * k).toFixed(1)}" fill="#FFF" opacity="${(0.35 * k).toFixed(2)}"/>` + gnistor(x, y, 60, t - a, 3); });
  $('ov').innerHTML = ov;
  komp.render();
}

// ---- kameran: storyboardens vyer, glid mellan närliggande vyer, klipp när platsen byts ----
const BOPOS = [TRADET[0] + BO_OFF.x, SIDA + BO_OFF.y, TRADET[1] + BO_OFF.z];
const tulpanNara = f => () => { const [x, z] = TPOS[f]; return [v3(x - 0.1, 0.4, z + 1.0), v3(x - 0.1, 0.2, z + 0.08), 30]; };
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  bred: () => [v3(0, 0.7, 1.8), v3(0, 0.3, -0.2), 32],
  rabatt: () => [v3(0.04, 0.42, 1.22), v3(0.02, 0.15, 0.05), 30],
  'rabatt-hel': () => [v3(0.06, 0.52, 1.5), v3(0.06, 0.14, 0.08), 32],
  'gul-rita': () => [v3(0.02, 0.66, 0.5), v3(0.0, 0.02, -0.19), 30],   // teckningen ligger platt bakåt från foten
  'gul-nara': tulpanNara('gul'), 'rod-nara': tulpanNara('rod'), 'lila-nara': tulpanNara('lila'),
  halv: g => [g.clone().add(v3(0.12, 0.24, 0.84)), g.clone().add(v3(0.08, 0.14, -0.05)), 30],
  'halv-sol': () => { scen.updateMatrixWorld(true); const s = SOLEN.getWorldPosition(v3()), m = v3(0.1, 0.17, 0.05).lerp(s, 0.36); return [v3(m.x, 0.4, 1.3), m, 30]; },
  nara: g => [g.clone().add(v3(0.02, 0.24, 0.62)), g.clone().add(v3(0, 0.17, 0)), 30],
  kanna: () => [v3(KANNAPOS[0] - 0.1, 0.44, KANNAPOS[1] + 0.66), v3(KANNAPOS[0] - 0.1, 0.1, KANNAPOS[1] - 0.08), 30],
  uppslag: () => [v3(0, 0.8, 1.8), v3(0, 0.2, -0.05), 32],
  fjaril: () => [v3(ROSA[0] - 0.02, 0.3, ROSA[1] + 0.5), v3(ROSA[0] - 0.02, 0.14, ROSA[1]), 26],
  nyckelpiga: () => [v3(GULA[0] - 0.02, 0.24, GULA[1] + 0.4), v3(GULA[0], 0.12, GULA[1]), 24],
  insekter: () => [v3(0.84, 0.36, 1.08), v3(0.84, 0.12, 0.32), 30],
  trad: () => [v3(-0.3, 0.6, 0.82), v3(-0.48, 0.4, -0.22), 28],
  bo: () => [v3(BOPOS[0] + 0.1, BOPOS[1] + 0.06, BOPOS[2] + 0.55), v3(...BOPOS).add(v3(0, 0.03, 0)), 26],
  'bo-nara': () => [v3(BOPOS[0] + 0.04, BOPOS[1] + 0.06, BOPOS[2] + 0.34), v3(...BOPOS).add(v3(0, 0.04, 0)), 22],
  hejda: g => [g.clone().add(v3(-0.06, 0.28, 0.8)), g.clone().add(v3(-0.02, 0.15, -0.1)), 32],   // närmare, så att vinkningen syns
  slut: () => [v3(-0.15, 1.45, 2.45), v3(0, 0.2, -0.1), 32],
};
const lage = (pos, mal, P) => [Math.atan2(pos.x - P[0], pos.z - P[2]) * 180 / Math.PI, Math.hypot(pos.x - P[0], pos.z - P[2]), pos.y - P[1], mal.x - P[0], mal.y - P[1]];
const fran3 = (l, P) => { const a = l[0] * Math.PI / 180; return [v3(P[0] + l[1] * Math.sin(a), P[1] + l[2], P[2] + l[1] * Math.cos(a)), v3(P[0] + l[3], P[1] + l[4], P[2])]; };
const skjut = l => [l[0] + 1.2, l[1] * 0.965, l[2] * 0.985, l[3], l[4]];   // svag push in i varje vy
satt(PARM1); scen.updateMatrixWorld(true);
const platser = {}, VYER = [];
const blurFor = n => /nara|rita|nyckelpiga|fjaril/.test(n) ? 0.008 : /halv|kanna|bo|hejda|insekter/.test(n) ? 0.006 : 0.003;
function vy(t, namn, g, o = {}) {
  const [pos, mal, fov] = VY[namn](g), P = o.P || [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  if (!o.fran) pos.y += 0.06;
  const fran = o.fran || lage(pos, mal, P);
  VYER.push({ t, mot: key, fran, till: o.till || skjut(fran), fov, mal: o.mal || mal, blur: blurFor(namn) });
}
function glid(t0, d, namn, g) {
  const f = VYER.at(-1), [p0, m0] = fran3(f.till ?? f.fran, platser[f.mot]), [pos, mal, fov] = VY[namn](g); pos.y += 0.06;
  const P = [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  VYER.push({ t: t0, mot: key, fran: lage(p0, m0, P), till: lage(pos, mal, P), fov, mal, blur: blurFor(namn), rorelse: 'glid' });
  vy(t0 + d, namn, g);
}
// 05 klipps i stället för att glida: gul-rita tittar på z -0.19 och glidningen (bana runt den nya punkten) hoppade
const GLID = { '03': 1.4, '05b': 1.0, '06': 1.0, '07': 1.1, '07b': 1.0, '08': 0.9, '09': 0.9, '11': 0.8, '12': 0.8, '14': 0.8, '16': 0.9, '17': 1.0,
  '20': 1.0, '20b': 1.1, '21': 1.2, '24b': 0.8, '24c': 0.6, '26': 0.8 };
const gPos = n => v3(MUSPOS[n][0], SIDA, MUSPOS[n][1]);
const P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0), bredL = lage(...VY.bred().slice(0, 2), P0);
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'in' ? 'bred' : r.st.vy, g = gPos(r.st.pos), key = namn + r.st.pos;
  if (r.id === '01') { vy(r.s, 'bord', g, { P: P0, fran: [bordL[0] - 7, bordL[1] * 1.07, bordL[2] * 1.05, bordL[3], bordL[4]], till: bordL, mal: v3(0, 0.25, -0.1) }); forra = 'bord'; continue; }
  if (r.id === '02') { VYER.at(-1).till = bordL; vy(r.s + 0.9, 'bred', g, { P: P0, fran: bordL, till: bredL, mal: v3(0, 0.3, -0.2) }); forra = 'bred'; continue; }
  if (r.id === '28') {   // ut ur boken medan korten fälls ner och pärmen slås igen
    const f = VYER.at(-1), [pos, mal] = fran3(f.till, platser[f.mot]);
    VYER.push({ t: r.s + 0.1, mot: 'pBord', fran: lage(pos, mal, P0), till: lage(...VY.slut().slice(0, 2), P0), fov: 32, mal: v3(0, 0.2, -0.1), blur: 0.003, rorelse: 'glid' }); platser.pBord = P0; continue; }
  if (r.id === '13') { vy(r.s, 'halv', gPos('start')); glid(GA[0][0], GA[0][1] - GA[0][0], 'halv', gPos('rod')); forra = 'halvrod'; continue; }   // följer musen till den röda
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s, GLID[r.id], namn, g); else vy(r.s, namn, g);
}
VYER.sort((a, b) => a.t - b.t);

const planK = kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd: DURATION });

// ---- ljudet: Malin, musen och effekterna ur raderna, kritans ritljud som slinga, fågelkvitter lågt under allt ----
const EF = 'assets/ljud/effekter/';
const VOL = f => /mus-|oj-oj|ooh/.test(f) ? 1.5 : /(glitter|glimt)/.test(f) ? 0.85 : /tindra/.test(f) ? 0.6 : /prassel-tyg/.test(f) ? 0.9
  : /(pop|swoosh|hopp-mjuk|landa-mjuk)/.test(f) ? 0.7 : /regn-droppar|fagel-pip/.test(f) ? 0.5 : /droppar/.test(f) ? 0.8 : 1.0;
const LJUD = [];
for (const r of RAD) {
  for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `assets/ljud/roster/varen-i-boken/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
  for (const [f, o] of r.ljud || []) if (!/^(krita-ritar|fagelkvitter)\//.test(f)) LJUD.push({ t: r.s + o, fil: EF + f + '.m4a', vol: VOL(f) });
}
for (const [i, D] of RIT.entries()) LJUD.push({ t: D.T.rit[0], fil: EF + `krita-ritar/krita-ritar-${i + 1}.m4a`, vol: 1.2, langd: D.T.rit[1] - D.T.rit[0] + 0.3, loop: true, fade: 0.4 });
LJUD.push({ t: 0, fil: EF + 'fagelkvitter/fagelkvitter-1.m4a', vol: 0.3, langd: DURATION, loop: true, fadeIn: 1.0, fade: 2.0 });
LJUD.push(...[0.5, 1.0].map((k, i) => ({ t: KLAPP + 1.0 + k, fil: EF + `klapp/klapp-${2 - i}.m4a`, vol: 1.0 })));   // riggens andra och tredje klapp
LJUD.push(...planK.ljud);
window.LJUD = LJUD.filter(c => c.t < DURATION).sort((a, b) => a.t - b.t);
window.DURATION = DURATION;
window.TIDER = Object.fromEntries(RAD.map(r => [r.id, +r.s.toFixed(2)]));
window.seek = t => planK.rita(t, () => bildruta(t));
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
