// 065 Våren i boken: stillbilderna till storyboarden, i samma three.js-bok som 062 (förlaga: 062 storyboard/scen.js).
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Musen är det platta kortet (musen-mille.png):
// riggen på kortet kommer i scenen (grind 6), så vinka, nicka, klappa och öronen syns bara i bildtexten.
// Fjärilen och nyckelpigan är Flow-förlagorna som platta kort här; i scenen ritas de i kod (bildlista.md).
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

const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/', PROV = '/avsnitt/065-varen-i-boken/prov/insekter/bilder/';
const lad = src => new THREE.TextureLoader().loadAsync(src).then(t => tex(trim(t.image)));
const BILD = Object.fromEntries(await Promise.all(Object.entries({
  gran: B + 'skogen-gron-saker/gran.png', buske: B + 'skogen-saker/buske.png', trad: B + 'skogen-saker/trad.png',
  appeltrad: B + 'lekplatsen-saker/appeltrad.png', ek: RQ + 'ek/cut/ek.png',
  himmel: P + 'himmel.png', sol: P + 'sol.png', kulleBak: P + 'kulle-bak.png', kulleFram: P + 'kulle-fram.png',
  moln1: P + 'moln-stor.png', moln2: P + 'moln-mellan.png', moln3: P + 'moln-liten.png', bo: P + 'fagelbo.png',
  rodKnopp: P + 'tulpan-rod-knopp.png', rodUppe: P + 'tulpan-rod.png', rodHanger: P + 'tulpan-rod-hanger.png',
  gulKnopp: P + 'tulpan-gul-knopp.png', gulUppe: RQ + 'tulpan-gul/cut/tulpan-gul.png', gulHanger: P + 'tulpan-gul-hanger.png',
  lilaKnopp: P + 'tulpan-lila-knopp.png', lilaUppe: P + 'tulpan-lila.png', lilaHanger: P + 'tulpan-lila-hanger.png',
  kanna: RQ + 'vattenkanna/cut/vattenkanna.png', rosa: RQ + 'blomma-rosa/cut/blomma-rosa.png', gula: RQ + 'blommor-gula/cut/blomma-gul-1.png',
  fjaril: PROV + 'fjaril-flow.png', nyckelpiga: PROV + 'nyckelpiga-flow.png', mus: '/assets/karaktarer/musen-mille/cut/musen-mille.png',
}).map(async ([k, v]) => [k, await lad(v)])));
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått (genomskinlig bakgrund)
async function teckning(sak) {
  const j = await (await fetch(`${RQ}${sak}/cut/${sak}-kontur.json`)).json(), bild = await new THREE.ImageLoader().loadAsync(`${RQ}${sak}/cut/${sak}.png`);
  const c = duk(bild.width, bild.height), x = c.getContext('2d');
  x.strokeStyle = '#3a2a20'; x.lineWidth = bild.height / 70; x.lineCap = x.lineJoin = 'round';
  for (const d of [j.d, ...(j.detaljer || [])]) x.stroke(new Path2D(d));
  return tex(trim(c));
}
const [TULPAN_KONTUR, KANNA_KONTUR] = await Promise.all([teckning('tulpan-gul'), teckning('vattenkanna')]);
// siffrorna 1, 2, 3 i krita (mörk linje, vit kant)
function siffra(n) {
  const c = duk(220, 260), x = c.getContext('2d'); x.font = 'bold 220px "Fredoka", "Comic Sans MS", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineJoin = 'round'; x.strokeStyle = '#FFF'; x.lineWidth = 26; x.strokeText(n, 110, 140); x.fillStyle = '#3a2a20'; x.fillText(n, 110, 140); return tex(c);
}
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
const { insida, satt } = await skapaBok(scen, { farg: '#4FA845', figur: BILD.gulKnopp.image, doodles: true, oppna: [0.5, 1.4] });

// ---- uppslaget ----
const flik = mat(null, { color: '#4E9E3A' }), KORT = [];
// kort: står upp på sidan med foten i (x, z). dx flyttar bilden i sidled (för bilder där foten inte sitter mitt i).
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(o.dx ?? 0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, y: m.position.y, hog: 0.004 + 0.0004 * KORT.length }; KORT.push(k);
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w, h) * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); k.flik = f; }
  return k;
}
const fall = (k, upp) => { k.m.rotation.x = upp ? 0 : Math.PI / 2; k.m.position.y = k.y + (upp ? 0 : k.hog); };   // nedfällt: framåt, baksidan upp
const syns = (k, ja) => { k.m.visible = ja; if (k.flik) k.flik.visible = ja; };
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
const BAK = [kort(bredare(BILD.kulleBak, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(BILD.kulleFram, 6.2), 1.95 / 6.2, 0.05, -0.47)];
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(BILD.himmel, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);
const SOLEN = pa(BILD.sol, 0.22, 0.62, 1.22);
[[BILD.moln1, 0.22, -0.66, 0.9], [BILD.moln2, 0.16, -0.22, 1.08], [BILD.moln3, 0.13, 0.28, 0.98]].forEach(([m, h, x, y]) => pa(m, h, x, y));
const SKOG = [[-1.0, -0.4, 0.5], [-0.52, -0.43, 0.46], [0.28, -0.42, 0.5], [0.82, -0.37, 0.56], [1.0, -0.43, 0.46]].map(([x, z, h]) => kort(BILD.gran, h, x, z));
const TRAD = [kort(BILD.appeltrad, 0.5, 0.56, -0.33), kort(BILD.ek, 0.46, -0.3, -0.38)];
const TRADET = [-0.68, -0.24], BOPOS = [TRADET[0] + 0.05, SIDA + 0.4, TRADET[1] + 0.03];
const LOVTRAD = kort(BILD.trad, 0.78, ...TRADET);
const BOET = kort(BILD.bo, 0.085, BOPOS[0], BOPOS[2], { y: BOPOS[1], flik: false });
const BUSKE = kort(BILD.buske, 0.26, 1.0, -0.12);
{
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#7CCB4E', '#A2DE72', '#5DB040', 0.7);   // vårgrönt
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0);
  x.fillStyle = '#FFFDF4'; for (let i = 0; i < 160; i++) { const px = 60 + ((i * 733) % (Wc - 120)), py = 60 + ((i * 397) % (D - 120)); x.beginPath(); x.arc(px, py, 5 + (i % 3) * 2, 0, 7); x.fill(); }   // små vita prickblommor
  x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
// rabatten: tre tulpaner i tre lägen på samma fot (den hängande bilden är bredare, foten sitter till vänster om mitten)
const TH = 0.38, TPOS = { rod: [-0.42, 0.0], gul: [0.0, -0.02], lila: [0.42, 0.06] };
const TULPAN = {};
for (const f of ['rod', 'gul', 'lila']) {
  const [x, z] = TPOS[f], hb = BILD[f + 'Hanger'];
  TULPAN[f] = { knopp: kort(BILD[f + 'Knopp'], TH, x, z), uppe: kort(BILD[f + 'Uppe'], TH, x, z, { flik: false }),
    hanger: kort(hb, TH * hb.image.height / 461, x, z, { flik: false, dx: TH * hb.image.width / 461 * 0.06 }) };
}
const TKONTUR = platt(TULPAN_KONTUR, TH * TULPAN_KONTUR.image.width / TULPAN_KONTUR.image.height, TPOS.gul[0], TPOS.gul[1] + 0.2, TH * 0.9, SIDA + 0.002);
// de små blommorna med djuren, utspridda framför till höger
const ROSA = [0.82, 0.14], GULA = [0.62, 0.46];
const SMATT = [kort(BILD.rosa, 0.18, ...ROSA), kort(BILD.gula, 0.14, ...GULA)];
const FJARIL = kort(BILD.fjaril, 0.07, ROSA[0], ROSA[1] + 0.005, { y: SIDA + 0.135, flik: false });
const NYCKELPIGA = kort(BILD.nyckelpiga, 0.04, GULA[0] + 0.01, GULA[1] + 0.005, { y: SIDA + 0.105, flik: false });
// kannan: kritans teckning i gräset bredvid musen, sedan i handen
const KANNAPOS = [-0.02, 0.38];
const KANNA = kort(BILD.kanna, 0.13, ...KANNAPOS);
const KKONTUR = platt(KANNA_KONTUR, 0.13 * KANNA_KONTUR.image.width / KANNA_KONTUR.image.height, KANNAPOS[0], KANNAPOS[1] - 0.02, 0.13, SIDA + 0.002);
const HANDKANNA = kort(BILD.kanna, 0.1, 0, 0, { flik: false });   // pipen åt höger, mot blomman
// musen: framför rabatten, till vänster om blomman den vattnar (den hängande kronan hänger åt höger), kannan i höger hand
const MH = 0.26, MUSPOS = { start: [0.2, 0.26], rod: [-0.66, 0.22], gul: [-0.22, 0.2], lila: [0.2, 0.26], blommor: [0.66, 0.32] };
const MUSKORT = kort(BILD.mus, MH, ...MUSPOS.start, { y: SIDA + 0.004, flik: false }), mus = MUSKORT.m;
const SIFFROR = ['1', '2', '3'].map((n, i) => { const [x, z] = TPOS[['rod', 'gul', 'lila'][i]]; return kort(siffra(n), 0.09, x + 0.14, z + 0.03, { y: SIDA + 0.3, flik: false }); });

// kritan: en liten krita utan ansikte (seriens kritan ritar i 2D; här bara som markering i stillbilden)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.09, 20), mat(null, { color: '#4FA845' })); papper.position.y = 0.01;
  kritan.add(kropp, spets, papper); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }
// vattendropparna: en båge ur pipen ner mot målet
const DROPPAR = new THREE.Group();
for (let i = 0; i < 9; i++) DROPPAR.add(new THREE.Mesh(new THREE.SphereGeometry(0.006 + 0.002 * (i % 2), 12, 10), mat(null, { color: '#BFE6FF', emissive: '#3f86c0', emissiveIntensity: 0.35 })));
scen.add(DROPPAR);
function bage(fran, till) {   // dropparna i en båge ur pipen ner mot målet
  DROPPAR.children.forEach((d, i) => { const t = (i + 0.5) / 9; d.position.lerpVectors(fran, till, t); d.position.y += 0.05 * Math.sin(Math.PI * t); d.position.z += 0.006 * Math.sin(i * 2.3); });
}

scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const ljus = new THREE.DirectionalLight('#FFF0DC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
const komp = new EffectComposer(R); komp.addPass(new RenderPass(scen, cam)); komp.addPass(new OutputPass());

// ---- kamerorna: [var kameran står, vart den tittar, fov] (relativt musen där det står 'g') ----
const v3 = (...a) => new THREE.Vector3(...a);
const tulpanNara = f => () => { const [x, z] = TPOS[f]; return [v3(x - 0.1, 0.33, z + 0.9), v3(x - 0.1, 0.16, z + 0.08), 30]; };
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  rabatt: () => [v3(0.04, 0.45, 1.2), v3(0.02, 0.17, 0.05), 30],
  'rabatt-hel': () => [v3(0.06, 0.55, 1.5), v3(0.06, 0.15, 0.08), 32],
  'gul-rita': () => [v3(0.04, 0.55, 0.78), v3(0.0, 0.06, 0.14), 30],
  'gul-nara': tulpanNara('gul'), 'rod-nara': tulpanNara('rod'), 'lila-nara': tulpanNara('lila'),
  halv: g => [g.clone().add(v3(0.14, 0.26, 0.82)), g.clone().add(v3(0.1, 0.15, -0.05)), 30],
  'halv-sol': () => [v3(0.0, 0.3, 1.4), v3(0.22, 0.52, -0.4), 34],
  nara: g => [g.clone().add(v3(0.02, 0.26, 0.6)), g.clone().add(v3(0, 0.19, 0)), 28],
  kanna: () => [v3(KANNAPOS[0] + 0.08, 0.5, KANNAPOS[1] + 0.62), v3(KANNAPOS[0] + 0.08, 0.1, KANNAPOS[1] - 0.04), 30],
  uppslag: () => [v3(0, 0.85, 1.9), v3(0, 0.22, -0.05), 32],
  fjaril: () => [v3(ROSA[0] + 0.03, 0.27, ROSA[1] + 0.42), v3(ROSA[0], 0.17, ROSA[1]), 26],
  nyckelpiga: () => [v3(GULA[0] + 0.02, 0.22, GULA[1] + 0.36), v3(GULA[0], 0.13, GULA[1]), 24],
  insekter: () => [v3(0.72, 0.38, 1.05), v3(0.72, 0.13, 0.3), 30],
  trad: () => [v3(-0.3, 0.72, 0.85), v3(-0.56, 0.42, -0.22), 32],
  bo: () => [v3(BOPOS[0] + 0.12, BOPOS[1] + 0.06, BOPOS[2] + 0.55), v3(...BOPOS).add(v3(0, 0.03, 0)), 26],
  'bo-nara': () => [v3(BOPOS[0] + 0.05, BOPOS[1] + 0.06, BOPOS[2] + 0.32), v3(...BOPOS).add(v3(0, 0.04, 0)), 22],
  hejda: g => [g.clone().add(v3(0.18, 0.32, 0.95)), g.clone().add(v3(-0.12, 0.18, -0.25)), 32],
};
VY.logga = VY.bord;

window.rad = s => {
  satt(s.parm ? 2 : 0);
  for (const k of [...BAK, ...SKOG, ...TRAD, LOVTRAD, BUSKE, ...SMATT, NYCKELPIGA]) fall(k, s.kort);
  for (const f of ['rod', 'gul', 'lila']) for (const l of ['knopp', 'uppe', 'hanger']) { syns(TULPAN[f][l], s[f] === l); fall(TULPAN[f][l], s.kort); }
  TKONTUR.visible = s.gul === 'kontur';
  syns(KANNA, s.kanna === 'gras'); KKONTUR.visible = s.kanna === 'kontur';
  const [mx, mz] = MUSPOS[s.pos]; mus.position.set(mx, SIDA + 0.004, mz); fall(MUSKORT, s.kort && s.mus === 'uppe');
  syns(HANDKANNA, s.kanna === 'hand'); fall(HANDKANNA, true); HANDKANNA.m.position.set(mx + 0.14, SIDA + 0.05, mz + 0.02);
  fall(BOET, s.kort);
  const fp = s.fjaril === 'huvud' ? [mx, SIDA + 0.245, mz + 0.012] : [ROSA[0], SIDA + 0.135, ROSA[1] + 0.005];
  fall(FJARIL, s.kort); FJARIL.m.position.set(...fp);
  SIFFROR.forEach((k, i) => { syns(k, s.siffra === '123' || s.siffra === String(i + 1)); fall(k, true); });
  DROPPAR.visible = !!s.droppar;
  const pip = v3(mx + 0.2, SIDA + 0.085, mz + 0.03);
  if (s.droppar === 'fotter') bage(pip, v3(mx + 0.05, SIDA + 0.012, mz + 0.03));
  else if (s.droppar) { const [x, z] = TPOS[s.droppar]; bage(pip, v3(x - 0.04, SIDA + 0.2, z + 0.03)); }
  kritan.visible = s.kritan;
  if (s.gul === 'kontur') { kritan.position.set(TPOS.gul[0] + 0.06, SIDA + 0.1, TPOS.gul[1] + 0.12); kritan.rotation.set(0.3, 0, -0.6); }
  if (s.kanna === 'kontur') { kritan.position.set(KANNAPOS[0] + 0.07, SIDA + 0.1, KANNAPOS[1] - 0.05); kritan.rotation.set(0.3, 0, -0.6); }
  const g = mus.position.clone(); g.y = SIDA;
  const [pos, mal, fov] = VY[s.vy](g);
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); komp.render();
};
window.klar = true;
