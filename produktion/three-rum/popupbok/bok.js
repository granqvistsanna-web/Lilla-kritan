// Kritans bok, prov 1 (2026-11-27): stillbilder av en uppfällbar bok på ett skrivbord. Steg 1 av planen: bara stillbilder, ingen rörelse än.
// Ett uppslag: himmel och kullar som egna papperslager (ritade i kod med krita och vit kant), granar och buskar som kort,
// dammen platt på sidan, grodan som ett platt kort på ett näckrosblad. Allt är befintliga urklipp, inget nytt är genererat.
// window.seek(t): t 0 = helbild på bordet, 1 = inne i boken, 2 = närbild på grodan. Rendera: node ../render.mjs popupbok 0 1 2
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const SNABB = location.search.includes('snabb'), W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080, PR = SNABB ? 1 : 1.5;
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(PR); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

// ---- krita på papper (fast frö, samma bild varje rendering) ----
let fro = 7; const slump = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
const duk = (w, h) => Object.assign(document.createElement('canvas'), { width: w, height: h });
function kritYta(x, w, h, farg, ljus, mork, streck = 1) {
  x.fillStyle = farg; x.fillRect(0, 0, w, h);
  x.lineCap = 'round';
  for (let i = 0; i < 260 * streck * w * h / 1e6; i++) {   // lösa diagonala kritstreck, ljusa och mörka
    const sx = slump() * w, sy = slump() * h, l = (0.03 + slump() * 0.08) * Math.max(w, h), v = -0.9 + slump() * 0.3;
    x.strokeStyle = slump() < 0.55 ? ljus : mork; x.globalAlpha = 0.18 + slump() * 0.2; x.lineWidth = 1.5 + slump() * 3;
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + Math.cos(v) * l, sy + Math.sin(v) * l); x.stroke();
  }
  x.globalAlpha = 1;
  const d = x.getImageData(0, 0, w, h), p = d.data;   // papperskorn
  for (let i = 0; i < p.length; i += 4) { const n = (slump() - 0.5) * 26; p[i] += n; p[i + 1] += n; p[i + 2] += n; }
  x.putImageData(d, 0, 0);
}
const tex = c => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

// ett papperslager: formen fylls med krita, vit klistermärkeskant runt (3 px + 1 % av höjden i bildens mått)
function lager(w, h, form, farg, ljus, mork, extra) {
  const c = duk(w, h), x = c.getContext('2d'), kant = 6 + 0.012 * h;
  form(x); x.strokeStyle = '#fff'; x.lineWidth = kant * 2; x.lineJoin = 'round'; x.stroke(); x.fillStyle = '#fff'; x.fill();
  const f = duk(w, h), fx = f.getContext('2d'); kritYta(fx, w, h, farg, ljus, mork); extra?.(fx);
  fx.globalCompositeOperation = 'destination-in'; form(fx); fx.fill();
  x.drawImage(f, 0, 0); return tex(c);
}
const himmel = () => lager(2048, 1000, x => { x.beginPath(); x.roundRect(30, 30, 1988, 1000, [260, 260, 0, 0]); },
  '#A8D8EC', '#D3EDF7', '#86C3DE', x => {
    x.fillStyle = '#FFD84A'; x.beginPath(); x.arc(1640, 250, 105, 0, 7); x.fill();   // solen med strålar
    x.strokeStyle = '#FFC93A'; x.lineWidth = 16; x.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const a = i * 0.7; x.beginPath(); x.moveTo(1640 + Math.cos(a) * 140, 250 + Math.sin(a) * 140); x.lineTo(1640 + Math.cos(a) * 190, 250 + Math.sin(a) * 190); x.stroke(); }
    x.fillStyle = '#FFFDF6';   // två moln
    for (const [mx, my, s] of [[420, 260, 1], [980, 170, 0.75]]) for (const [dx, dy, r] of [[0, 0, 70], [70, -30, 85], [150, 0, 70], [75, 25, 70]]) { x.beginPath(); x.arc(mx + dx * s, my + dy * s, r * s, 0, 7); x.fill(); }
  });
const kullar = (topp, farg, ljus, mork, fas) => lager(2048, 520, x => {
  x.beginPath(); x.moveTo(30, 520);
  for (let i = 0; i <= 40; i++) { const u = i / 40; x.lineTo(30 + u * 1988, 520 - topp * (0.62 + 0.24 * Math.sin(u * 7 + fas) + 0.14 * Math.sin(u * 15 + fas * 2))); }
  x.lineTo(2018, 520); x.closePath();
}, farg, ljus, mork);

// ---- bilder ----
const lad = src => new THREE.TextureLoader().loadAsync(src).then(t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; });
const B = '/assets/bakgrunder/';
const [GRAN, BUSKE, DAMM, BLAD, NACKROS, VASS, STEN, SVAMP, GRODA] = await Promise.all([
  B + 'skogen-gron-saker/gran.png', B + 'skogen-gron-saker/barbuske.png', B + 'dammen-saker/damm.png', B + 'dammen-saker/blad.png',
  B + 'dammen-saker/nackros.png', B + 'dammen-saker/vass.png', B + 'skogen-gron-saker/sten.png', B + 'skogen-gron-saker/svamp.png',
  'bilder/gurra.png'].map(lad));

const mat = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });
const urklipp = map => mat(map, { alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide });
const djup = map => new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending, map, alphaTest: 0.5 });
const skugga = m => { m.castShadow = m.receiveShadow = true; return m; };

// ---- bordet, kritorna och boken ----
const SIDA = 0.075;   // sidornas ovansida
{
  const c = duk(1024, 1024), x = c.getContext('2d'); kritYta(x, 1024, 1024, '#C8925E', '#DDAE7C', '#A9744A', 0.6);
  x.globalAlpha = 0.22; x.strokeStyle = '#8E5E38';   // ådring
  for (let i = 0; i < 26; i++) { const y0 = slump() * 1024; x.lineWidth = 2 + slump() * 4; x.beginPath(); x.moveTo(0, y0);
    for (let u = 0; u <= 1024; u += 64) x.lineTo(u, y0 + Math.sin(u / 180 + i) * 8); x.stroke(); }
  const t = tex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3);
  const bord = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), mat(t)); bord.rotation.x = -Math.PI / 2; bord.receiveShadow = true; scen.add(bord);
}
for (const [farg, x, z, v] of [['#E2563F', 1.75, 0.55, 0.5], ['#F2C23A', 1.95, 0.75, 0.35], ['#3F8FD2', -1.85, 0.9, -0.25]]) {   // tre kritor på bordet
  const g = new THREE.Group(), r = 0.032;
  const kropp = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.34, 24), mat(null, { color: farg }));
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.002, r + 0.002, 0.22, 24), mat(null, { color: new THREE.Color(farg).lerp(new THREE.Color('#fff'), 0.45) }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(r, 0.06, 24), mat(null, { color: farg })); spets.position.y = 0.2;
  g.add(kropp, papper, spets); g.children.forEach(skugga);
  g.rotation.set(0, v, Math.PI / 2); g.position.set(x, r, z); scen.add(g);
}
{
  const parm = new THREE.Mesh(new THREE.BoxGeometry(2.56, 0.03, 1.72), mat(null, { color: '#E9785A' })); parm.position.y = 0.015; skugga(parm); scen.add(parm);
  const c = duk(512, 512), x = c.getContext('2d'); kritYta(x, 512, 512, '#FBF6EA', '#FFFFFF', '#EFE6D4', 0.3);
  const kantc = duk(64, 64), kx = kantc.getContext('2d'); kx.fillStyle = '#F7F0E2'; kx.fillRect(0, 0, 64, 64);   // sidkanterna: tunna linjer
  kx.strokeStyle = '#DCCFB8'; for (let y = 2; y < 64; y += 5) { kx.beginPath(); kx.moveTo(0, y); kx.lineTo(64, y); kx.stroke(); }
  const ytan = mat(tex(c)), kanten = mat(tex(kantc));
  for (const s of [-1, 1]) {
    const blad = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.045, 1.62), [kanten, kanten, ytan, kanten, kanten, kanten]);
    blad.position.set(s * 0.602, 0.03 + 0.0225, 0); skugga(blad); scen.add(blad);
  }
}

// ---- uppslaget ----
// ett stående kort med en liten vikflik vid foten, som i en riktig uppfällbar bok
const flik = mat(null, { color: '#F4ECDD' });
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.position.set(x, o.y ?? SIDA, z); m.rotation.y = o.vrid ?? 0; scen.add(m);
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); }
  return m;
}
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}

kort(himmel(), 1.08, 0, -0.72, { flik: false });
kort(kullar(330, '#A3CF90', '#C4E3B2', '#86B874', 1.2), 0.5, 0, -0.6);
kort(kullar(250, '#86C062', '#A6D684', '#6CA84E', 3.1), 0.38, 0, -0.47);
for (const [x, z, h] of [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [-0.46, -0.34, 0.44], [0.38, -0.38, 0.56], [0.66, -0.33, 0.46], [0.94, -0.4, 0.6]]) kort(GRAN, h, x, z);
kort(BUSKE, 0.3, -0.12, -0.3); kort(BUSKE, 0.26, 1.02, -0.14);
platt(DAMM, 1.45, -0.02, 0.06, 0.7);
platt(BLAD, 0.24, 0.3, 0.12, undefined, SIDA + 0.003); platt(BLAD, 0.2, 0.45, -0.07, undefined, SIDA + 0.003);
const NAR = platt(BLAD, 0.3, -0.24, 0.08, undefined, SIDA + 0.003);   // grodans blad
kort(NACKROS, 0.1, 0.3, 0.13, { y: SIDA + 0.004, flik: false });
const groda = kort(GRODA, 0.36, -0.24, 0.08, { y: SIDA + 0.004, flik: false });
kort(VASS, 0.46, -0.84, 0.2); kort(VASS, 0.34, 0.7, 0.06);
kort(STEN, 0.15, 0.62, 0.42); kort(SVAMP, 0.17, 0.92, 0.5); kort(BUSKE, 0.24, -1.0, 0.45);

// ---- ljus ----
scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const sol = new THREE.DirectionalLight('#FFF0DC', 2.2); sol.position.set(-2.2, 4, 3); sol.castShadow = true;
Object.assign(sol.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
sol.shadow.mapSize.set(4096, 4096); sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.01; sol.shadow.radius = 4; scen.add(sol);

// ---- efterbehandling: skärpedjup ----
const rt = new THREE.WebGLRenderTarget(W * PR, H * PR, { samples: 4, type: THREE.HalfFloatType });
const komp = new EffectComposer(R, rt); komp.setPixelRatio(PR); komp.setSize(W, H);
const bokeh = new BokehPass(scen, cam, { focus: 2, aperture: 0.002, maxblur: 0.006 });
// BokehPass ritar djupet med ett enda material, så urklippen blev hela rektanglar i skärpan. Här får varje kort sitt eget
// djupmaterial med urklippets form (samma som skuggan använder).
bokeh.materialDepth = null;
const DJUP0 = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending }), bokehRender = bokeh.render.bind(bokeh);
bokeh.render = (...a) => {
  const byt = []; scen.traverse(o => { if (o.isMesh) { byt.push([o, o.material]); o.material = o.customDepthMaterial ?? DJUP0; } });
  const bg = scen.background; scen.background = null; bokehRender(...a); scen.background = bg;
  for (const [o, m] of byt) o.material = m;
};
komp.addPass(new RenderPass(scen, cam)); komp.addPass(bokeh); komp.addPass(new OutputPass());

// ---- vyerna ----
const MAL = groda.position.clone().add(new THREE.Vector3(0, 0.18, 0));
const VYER = [
  { pos: [0.15, 2.7, 4.4], mot: [0, 0.3, -0.1], fov: 30, fokus: null, blur: 0.002 },
  { pos: [0.1, 0.42, 1.6], mot: [0, 0.26, -0.15], fov: 34, fokus: MAL, blur: 0.005 },
  { pos: [-0.1, 0.34, 1.12], mot: [-0.23, 0.2, 0.05], fov: 28, fokus: MAL, blur: 0.008 },
];
window.DURATION = VYER.length;
window.seek = async t => {
  const v = VYER[Math.min(VYER.length - 1, Math.floor(t))];
  cam.position.set(...v.pos); cam.fov = v.fov; cam.updateProjectionMatrix(); cam.lookAt(...v.mot); cam.updateMatrixWorld();
  const f = v.fokus ?? new THREE.Vector3(...v.mot);
  bokeh.uniforms.focus.value = cam.position.distanceTo(f); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.fokus ? 0.012 : 0.002;
  komp.render();
};
window.ready = window.seek(0);
