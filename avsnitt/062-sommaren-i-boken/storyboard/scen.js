// 062 Sommaren i boken: stillbilderna till storyboarden, i samma three.js-bok som produktion/three-rum/popupbok/bok.js.
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Grodan är det platta kortet (gurra.png):
// riggen på kortet kommer i scenen (grind 6), så vinka, nicka och lukta syns bara i bildtexten.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';

const W = 1920, H = 1080;
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const lad = src => new THREE.TextureLoader().loadAsync(src).then(t => tex(trim(t.image)));
const [GRAN, BUSKE, DAMM, BLAD, NACKROS, VASS, GRODA, HIMMEL, SOL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, HINK, BLOMMOR, SAND, GLASS] = await Promise.all([
  B + 'skogen-gron-saker/gran.png', B + 'skogen-gron-saker/barbuske.png', B + 'dammen-saker/damm.png', B + 'dammen-saker/blad.png',
  B + 'dammen-saker/nackros.png', B + 'dammen-saker/vass.png', P + 'gurra.png',
  ...['himmel', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten', 'hink', 'blommor', 'sand'].map(n => P + n + '.png'),
  RQ + 'glass-rosa/cut/glass-rosa.png'].map(lad).flatMap((p, i) => i === 7 ? [p, lad(RQ + 'sol-gul/cut/sol-gul.png')] : [p]));
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått (genomskinlig bakgrund)
async function teckning(sak) {
  const j = await (await fetch(`${RQ}${sak}/cut/${sak}-kontur.json`)).json(), bild = await new THREE.ImageLoader().loadAsync(`${RQ}${sak}/cut/${sak}.png`);
  const c = duk(bild.width, bild.height), x = c.getContext('2d');
  x.strokeStyle = '#3a2a20'; x.lineWidth = bild.height / 70; x.lineCap = x.lineJoin = 'round';
  for (const d of [j.d, ...(j.detaljer || [])]) x.stroke(new Path2D(d));
  return tex(trim(c));
}
const [SOL_KONTUR, GLASS_KONTUR] = await Promise.all([teckning('sol-gul'), teckning('glass-rosa')]);
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

skrivbord(scen);
const { insida, satt } = await skapaBok(scen, { farg: '#E8683A', figur: GRODA.image, doodles: true, oppna: [0.5, 1.4] });

// ---- uppslaget (som bok.js, med 062:s saker: glassen, blommorna bakom busken, sandslottet vid hinken) ----
const flik = mat(null, { color: '#4E9E3A' }), KORT = [];
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, y: m.position.y, hog: 0.004 + 0.0004 * KORT.length }; KORT.push(k);
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); k.flik = f; }
  return k;
}
const fall = (k, upp) => { k.m.rotation.x = upp ? 0 : Math.PI / 2; k.m.position.y = k.y + (upp ? 0 : k.hog); };   // nedfällt: framåt, baksidan upp
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
const BAK = [kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47)];
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);
const SOLEN = pa(SOL, 0.34, 0.12, 0.82), SOLKONTUR = pa(SOL_KONTUR, 0.34, 0.12, 0.82, 0.008);
[[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].forEach(([m, h, x, y]) => pa(m, h, x, y));
const SKOG = [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [-0.46, -0.34, 0.44], [0.38, -0.38, 0.56], [0.66, -0.33, 0.46], [0.94, -0.4, 0.6]].map(([x, z, h]) => kort(GRAN, h, x, z));
const BLOMMOR_BAK = kort(BLOMMOR, 0.36, 1.03, -0.22, { flik: false }); BLOMMOR_BAK.m.scale.x = 0.5;   // står bakom busken, bara topparna syns
const BUSKAR = [kort(BUSKE, 0.3, -0.12, -0.3), kort(BUSKE, 0.26, 1.02, -0.14)];
{
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#6CC04A', '#8ED46A', '#56A83A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
platt(DAMM, 1.45, -0.02, 0.06, 0.7);
const BLADPOS = { 1: [-0.24, 0.08], 2: [0.45, -0.07], 3: [0.79, 0.04] };   // 3 = stranden vid blommorna
platt(BLAD, 0.3, ...BLADPOS[1], undefined, SIDA + 0.003); platt(BLAD, 0.3, ...BLADPOS[2], undefined, SIDA + 0.003);
const SMATT = [kort(NACKROS, 0.1, 0.12, 0.3, { y: SIDA + 0.004, flik: false }), kort(VASS, 0.46, -0.84, 0.2), kort(VASS, 0.34, 0.62, -0.25)];
const HINKEN = kort(HINK, 0.27, 0.36, 0.6), SLOTTET = kort(SAND, 0.24, 0.62, 0.62), BLOMMOR_UPPE = kort(BLOMMOR, 0.26, 0.98, 0.2);
const GLASSKORT = kort(GLASS, 0.24, -0.6, 0.48);
const GLASSKONTUR = platt(GLASS_KONTUR, 0.24 * GLASS_KONTUR.image.width / GLASS_KONTUR.image.height, -0.6, 0.48 - 0.12, 0.24, SIDA + 0.002);
const HANDGLASS = kort(GLASS, 0.12, 0, 0, { flik: false });
const GRODKORT = kort(GRODA, 0.36, ...BLADPOS[1], { y: SIDA + 0.004, flik: false }), groda = GRODKORT.m;

// kritan: en liten krita utan ansikte (seriens kritan ritar i 2D; här bara som markering i stillbilden)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.09, 20), mat(null, { color: '#E8683A' })); papper.position.y = 0.01;
  kritan.add(kropp, spets, papper); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }
const DROPPE = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), mat(null, { color: '#FF5FA2' })); scen.add(DROPPE);
const STANK = new THREE.Group(); for (let i = 0; i < 14; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.006 + 0.004 * (i % 3), 10, 8), mat(null, { color: '#CFEFFF', emissive: '#4b8fb8', emissiveIntensity: 0.3 }));
  const a = i / 14 * Math.PI * 2; d.position.set(Math.cos(a) * 0.16, 0.03 + 0.07 * ((i * 7) % 5) / 5, Math.sin(a) * 0.08); STANK.add(d); } scen.add(STANK);

scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const ljus = new THREE.DirectionalLight('#FFF0DC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
const komp = new EffectComposer(R); komp.addPass(new RenderPass(scen, cam)); komp.addPass(new OutputPass());

// ---- kamerorna: [var kameran står, vart den tittar] (relativt grodan där det står 'g') ----
const v3 = (...a) => new THREE.Vector3(...a);
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  bred: () => [v3(0, 0.55, 1.75), v3(0, 0.36, -0.25), 32],
  himmel: () => { const s = SOLEN.getWorldPosition(v3()); return [v3(s.x - 0.05, s.y - 0.12, s.z + 1.25), s, 30]; },
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  'halv-sol': g => [g.clone().add(v3(0.15, 0.12, 0.72)), g.clone().add(v3(0.06, 0.32, -0.4)), 32],
  nara: g => [g.clone().add(v3(0.03, 0.3, 0.66)), g.clone().add(v3(0, 0.25, 0)), 28],
  glass: () => [v3(-0.5, 0.5, 0.98), v3(-0.44, 0.1, 0.32), 30],
  damm: () => [v3(0.12, 0.85, 1.55), v3(0.12, 0.06, 0.02), 32],
  buske: () => [v3(0.55, 0.45, 0.98), v3(0.74, 0.12, -0.08), 32],
  'buske-nara': () => [v3(0.95, 0.3, 0.55), v3(1.02, 0.22, -0.14), 28],
  blommor: () => [v3(0.6, 0.4, 1.05), v3(0.88, 0.19, 0.12), 30],
  'blommor-nara': () => [v3(0.7, 0.3, 0.66), v3(0.89, 0.17, 0.12), 28],
  sand: () => [v3(0.5, 0.55, 1.45), v3(0.66, 0.1, 0.42), 32],
  hejda: g => [g.clone().add(v3(0.22, 0.34, 0.95)), g.clone().add(v3(-0.2, 0.2, -0.3)), 32],
};
VY.logga = VY.bord; VY.halv2 = VY.halv; VY.nara2 = VY.nara; VY.nara3 = VY.nara;

window.rad = s => {
  satt(s.parm ? 2 : 0);
  for (const k of [...BAK, ...SKOG, ...BUSKAR, ...SMATT, HINKEN]) fall(k, s.kort);
  fall(SLOTTET, s.kort && s.slott);
  BOK_SOL(s.sol);
  BLOMMOR_BAK.m.visible = s.blommor === 'toppar'; fall(BLOMMOR_BAK, true);
  BLOMMOR_UPPE.m.visible = BLOMMOR_UPPE.flik.visible = s.blommor === 'uppe'; fall(BLOMMOR_UPPE, s.kort);
  GLASSKORT.m.visible = s.glass === 'kort'; fall(GLASSKORT, s.glass === 'kort'); if (GLASSKORT.flik) GLASSKORT.flik.visible = s.glass === 'kort';
  GLASSKONTUR.visible = s.glass === 'kontur';
  const [bx, bz] = BLADPOS[s.blad]; groda.position.set(bx, SIDA + 0.004, bz); fall(GRODKORT, s.kort && s.groda === 'uppe');
  if (!s.kort) groda.position.set(-0.24, SIDA + 0.004, 0.08);
  HANDGLASS.m.visible = s.glass === 'hand'; HANDGLASS.m.position.set(bx + 0.13, SIDA + 0.1, bz + 0.03);
  DROPPE.visible = s.droppe; DROPPE.position.set(bx, SIDA + 0.27, bz + 0.03);
  STANK.visible = s.stank; STANK.position.set(bx, SIDA, bz);
  kritan.visible = s.kritan;
  if (s.sol === 'kontur') { const p = SOLEN.getWorldPosition(v3()); kritan.position.set(p.x + 0.22, p.y - 0.04, p.z + 0.12); kritan.rotation.set(0, 0, -0.6); }
  if (s.glass === 'kontur') { kritan.position.set(-0.43, SIDA + 0.1, 0.4); kritan.rotation.set(0.3, 0, -0.6); }
  const g = groda.position.clone(); g.y = SIDA;
  const [pos, mal, fov] = VY[s.vy](g);
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); komp.render();
};
function BOK_SOL(sol) { SOLEN.visible = sol === 'ja'; SOLKONTUR.visible = sol === 'kontur'; }
window.klar = true;
