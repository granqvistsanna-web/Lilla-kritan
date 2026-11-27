// 065 stillbildsprov: fjärilen och nyckelpigan ritade i kod (vänster) mot D2:s Flow-urklipp (höger), i Kritans bok.
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/065-varen-i-boken/prov/insekter 0 1 1.5 2 3 3.5
// t 0–1 halvbild över båda, 1–2 närbild kod, 2–3 närbild Flow, 3–4 kod i rörelse (vingarna fälls, benen kryper)
import * as THREE from 'three';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';

const v3 = (...a) => new THREE.Vector3(...a), B = 'bilder/';
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
const SNABB = location.search.includes('snabb'), W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080;
R.setPixelRatio(SNABB ? 1 : 1.5); R.setSize(W, H, false); R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);
scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const ljus = new THREE.DirectionalLight('#FFF0DC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);

skrivbord(scen);
const bild = src => new THREE.ImageLoader().loadAsync(src);
const [TG, TR, FJ, NY, GULA] = await Promise.all([B + 'tulpan-gul.png', B + 'tulpan-rod.png', B + 'fjaril-flow.png', B + 'nyckelpiga-flow.png',
  '/assets/rekvisita/blommor-gula/cut/blomma-gul-2.png'].map(bild));
const { satt } = await skapaBok(scen, { farg: '#5DAA4A', figur: trim(TG), storlek: 1.3 }); satt(99);

// marken: vårgrönt kritark
{ const c = duk(1600, 1000); kritYta(c.getContext('2d'), 1600, 1000, '#7CC657', '#9AD877', '#62AE42', 0.7);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.6), new THREE.MeshLambertMaterial({ map: tex(c) }));
  m.rotation.x = -Math.PI / 2; m.position.set(0, SIDA + 0.0005, 0.1); m.receiveShadow = true; scen.add(m); }

const mat = map => new THREE.MeshLambertMaterial({ map, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide });
const djup = map => new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map, alphaTest: 0.5 });
const KSK = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(28,52,18,0.42)'); g.addColorStop(0.55, 'rgba(28,52,18,0.16)'); g.addColorStop(1, 'rgba(28,52,18,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
// ett stående kort med foten i (x, z), som 062:s kort(), med kontaktskugga
function kort(map, h, x, z, y = SIDA) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = new THREE.Mesh(g, mat(map)); m.castShadow = m.receiveShadow = true; m.customDepthMaterial = djup(map); m.position.set(x, y, z); scen.add(m);
  if (y === SIDA) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.07), KSK); f.rotation.x = -Math.PI / 2; f.position.set(x, SIDA + 0.0009, z + 0.012); scen.add(f); }
  return m;
}
const T = i => tex(trim(i));
// två par: tulpan + gula blommor till vänster (kod) och till höger (Flow)
const PAR = [-0.32, 0.32];
for (const x of PAR) { kort(T(TG), 0.3, x, 0.05); kort(T(TR), 0.28, x - 0.13, 0.0); kort(T(GULA), 0.13, x + 0.12, 0.16); }

// ---- kritritning i kod ----
// boil: varje kontur är en polygon med lite brus i radien, nytt brus 6 gånger/s; amplituden ger ca 2,5 px i bild i närbild
const KANT = 14, BOIL = 3;   // px i texturen (texturen visas ca 0,2–0,3 px per textur-px i närbild)
let fas = 0; const brus = (i, k) => Math.sin(i * 12.9898 + k * 78.233 + fas * 37.719) * 43758.5453 % 1;
function blob(x, cx, cy, rx, ry, rot = 0, n = 48) {
  x.beginPath();
  for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, j = 1 + BOIL / Math.max(rx, ry) * brus(i % n, cx + cy);
    const px = Math.cos(a) * rx * j, py = Math.sin(a) * ry * j;
    x.lineTo(cx + px * Math.cos(rot) - py * Math.sin(rot), cy + px * Math.sin(rot) + py * Math.cos(rot)); }
  x.closePath();
}
const streck = (x, pts, w, farg) => { x.strokeStyle = farg; x.lineWidth = w; x.lineCap = x.lineJoin = 'round'; x.beginPath();
  pts.forEach(([a, b], i) => x[i ? 'lineTo' : 'moveTo'](a + BOIL * 0.5 * brus(i, a), b + BOIL * 0.5 * brus(i + 7, b))); x.stroke(); };
// fyll formen (ritad av f) med kritYta i färgen, klippt till formen
function krit(x, f, farg, ljus, mork) {   // f bygger formen (och får fylla delar själv) på en mask
  const W = x.canvas.width, H = x.canvas.height, m = duk(W, H), mx = m.getContext('2d'); mx.fillStyle = '#000'; f(mx); mx.fill();
  const c = duk(W, H), y = c.getContext('2d'); kritYta(y, W, H, farg, ljus, mork, 1.4);
  y.globalCompositeOperation = 'destination-in'; y.drawImage(m, 0, 0); x.drawImage(c, 0, 0);
}
// vit kant: formen fylld vit och strukit vitt KANT px brett, under allt
const vit = (x, f) => { f(x); x.fillStyle = '#FFF'; x.fill(); x.strokeStyle = '#FFF'; x.lineWidth = KANT * 2; x.lineJoin = 'round'; x.stroke(); };

function nyckelpiga(steg) {   // uppifrån, huvudet uppåt; steg 0/1 växlar benen
  const c = duk(300, 340), x = c.getContext('2d'), cx = 150, cy = 195;
  const ben = [-1, 1].flatMap(s => [-50, 0, 50].map((dy, i) => { const v = (i - 1) * 0.35 + ((i + steg) % 2 ? 0.18 : -0.18) * s;
    return [[cx + s * 70, cy + dy], [cx + s * (70 + 38 * Math.cos(v)), cy + dy + 38 * Math.sin(v) * s]]; }));
  const ant = [-1, 1].map(s => [[cx + s * 18, 92], [cx + s * 34, 62], [cx + s * 48, 58]]);
  const kropp = y => blob(y, cx, cy, 92, 100), huvud = y => blob(y, cx, 104, 44, 34);
  // kanten: kropp, huvud, ben och antenner tillsammans
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

// kodkorten: texturerna ritas om när brusfasen byts (6 gånger/s)
const KOD = { ny: new THREE.CanvasTexture(duk(2, 2)), vl: null, vr: null, kr: null };
const kodTex = (c, t) => { if (!t) { t = tex(c); } else { t.image = c; t.needsUpdate = true; } return t; };
function ritaKod(t) {
  fas = Math.floor(t * 6);
  KOD.nyT = kodTex(nyckelpiga(Math.floor(t * 4) % 2), KOD.nyT); KOD.vlT = kodTex(vinge(-1), KOD.vlT); KOD.vrT = kodTex(vinge(1), KOD.vrT); KOD.krT = kodTex(fjarilKropp(), KOD.krT);
}
ritaKod(0);
const plan = (map, w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(map)); m.castShadow = true; m.customDepthMaterial = djup(map); return m; };
// nyckelpigan på de gula blommorna, lite lutad mot kameran; fjärilen på den gula tulpanen (vingarna kring kroppen)
const NH = 0.05, FH = 0.075;
function placera(o, x, y, z, rx = -0.5) { o.position.set(x, y, z); o.rotation.x = rx; scen.add(o); return o; }
const nyKod = placera(plan(KOD.nyT, NH * 300 / 340, NH), PAR[0] + 0.12, SIDA + 0.115, 0.175);
const fjKod = new THREE.Group(), vl = plan(KOD.vlT, FH * 230 / 300, FH), vr = plan(KOD.vrT, FH * 230 / 300, FH), kr = plan(KOD.krT, FH * 120 / 340, FH);
vl.geometry.translate(-FH * 230 / 300 / 2, 0, 0); vr.geometry.translate(FH * 230 / 300 / 2, 0, 0); kr.position.z = 0.001;
const VL = new THREE.Group(), VR = new THREE.Group(); VL.add(vl); VR.add(vr); fjKod.add(VL, VR, kr);
placera(fjKod, PAR[0] + 0.005, SIDA + 0.33, 0.065, -0.25);
// Flow-urklippen på samma ställen
placera(plan(T(NY), NH * NY.width / NY.height, NH), PAR[1] + 0.12, SIDA + 0.115, 0.175);
placera(plan(T(FJ), FH * 1.05 * FJ.width / FJ.height, FH * 1.05), PAR[1] + 0.005, SIDA + 0.33, 0.065, -0.25);

const VY = [
  [v3(0, 0.5, 1.25), v3(0, 0.2, 0.05), 30],
  [v3(PAR[0] + 0.06, 0.4, 0.82), v3(PAR[0] + 0.06, 0.27, 0.1), 30],
  [v3(PAR[1] + 0.06, 0.4, 0.82), v3(PAR[1] + 0.06, 0.27, 0.1), 30],
  [v3(PAR[0] + 0.06, 0.4, 0.82), v3(PAR[0] + 0.06, 0.27, 0.1), 30],
];
window.DURATION = 4; window.LJUD = [];
window.seek = async t => {
  const [p, m, fov] = VY[Math.min(3, Math.floor(t))], f = t % 1, rorelse = t >= 3;
  ritaKod(t);
  const flaxa = rorelse ? 0.25 + 0.55 * (0.5 - 0.5 * Math.cos(f * Math.PI * 6)) : 0.25;   // halvöppna vingar när den sitter
  VL.rotation.y = -flaxa; VR.rotation.y = flaxa;
  nyKod.position.x = PAR[0] + 0.12 + (rorelse ? f * 0.03 : 0);
  cam.position.copy(p); cam.lookAt(m); cam.fov = fov; cam.updateProjectionMatrix();
  R.render(scen, cam);
};
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
