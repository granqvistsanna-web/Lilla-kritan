// 064 Vintern i boken: stillbilderna till storyboarden, i samma three.js-bok som 062 och 063 (förlagan, 063 storyboard/scen.js).
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Kaninen är ett platt kort (kanel.png):
// riggen kommer i scenen (grind 6), så vinka, huttra, öronen som ploppar upp och skutten står bara i bildtexten.
// Snöfallet, andedräkten och flingorna på öronen är enkla markeringar för det som ritas i kod i scenen (Ritas i kod i bildlista.md).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { kaltTrad, sittplats, W as TW, H as TH } from '../prov/trad/trad.js';
import { granSno, kulleSno, frost } from '../kod/vinter.js';

const W = 1920, H = 1080;
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const bild = src => new THREE.ImageLoader().loadAsync(src);
const lad = src => bild(src).then(i => tex(trim(i)));
const [HIMMEL, MOLN1, MOLN2, MOLN3, KANEL, FLINGA, PANNBAND, SNOBOLL, GUBBE, TUSS, FAGEL_R, FAGEL_B, FAGEL_G] = await Promise.all([
  ...['himmel', 'moln-stor', 'moln-mellan', 'moln-liten', 'kanel'].map(n => P + n + '.png'),
  RQ + 'snoflinga/cut/snoflinga.png', RQ + 'pannband/cut/pannband.png', RQ + 'snoboll/cut/snoboll.png', RQ + 'snogubbe/cut/snogubbe.png',
  RQ + 'snotuss/cut/snotuss.png', ...['rod', 'bla', 'gul'].map(f => `${RQ}smafaglar/cut/fagel-kropp-${f}-kod.png`)].map(lad));
const [GRAN_I, KBAK_I, KFRAM_I] = await Promise.all([B + 'skogen-gron-saker/gran.png', P + 'kulle-bak.png', P + 'kulle-fram.png'].map(bild));
// korten utan och med snö (kod): samma mått, så att de ligger exakt på varandra
const par = (i, f) => [tex(trim(f(i, 0))), tex(trim(f(i, 1)))];
const GRAN = par(GRAN_I, granSno), KBAK = par(KBAK_I, kulleSno), KFRAM = par(KFRAM_I, kulleSno);
const TRAD = [tex(kaltTrad({ sno: 0 })), tex(kaltTrad({ sno: 1 }))];   // otrimmat, så att sittplats() stämmer
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått (genomskinlig bakgrund)
async function teckning(bildfil, konturfil) {
  const j = await (await fetch(konturfil)).json(), b = await bild(bildfil);
  const c = duk(b.width, b.height), x = c.getContext('2d');
  x.strokeStyle = '#3a2a20'; x.lineWidth = b.height / 70; x.lineCap = x.lineJoin = 'round';
  for (const d of [j.d, ...(j.detaljer || [])]) x.stroke(new Path2D(d));
  return tex(trim(c));
}
const [FLINGA_KONTUR, PANNBAND_KONTUR] = await Promise.all([
  teckning(RQ + 'snoflinga/cut/snoflinga.png', RQ + 'snoflinga/cut/snoflinga-kontur-skarp.json'),
  teckning(RQ + 'pannband/cut/pannband.png', RQ + 'pannband/cut/pannband-kontur.json')]);
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
const { insida, satt } = await skapaBok(scen, { farg: '#3F7FC4', figur: FLINGA.image, doodles: true, oppna: [0.5, 1.4] });

// ---- uppslaget: kullarna, två granar till vänster, det kala trädet med fåglarna till höger, snöfältet i mitten ----
const flik = mat(null, { color: '#B8C4CC' }), KORT = [];
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, y: m.position.y, hog: 0.004 + 0.0004 * KORT.length, w, h }; KORT.push(k);
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); k.flik = f; }
  return k;
}
const fall = (k, upp) => { upp = +upp; k.m.rotation.x = (1 - upp) * Math.PI / 2; k.m.position.y = k.y + (upp ? 0 : k.hog); };
const byt = (k, map) => { k.m.material.map = map; k.m.customDepthMaterial.map = map; k.m.material.needsUpdate = true; };
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
const KBAKW = [bredare(KBAK[0], 5.2), bredare(KBAK[1], 5.2)], KFRAMW = [bredare(KFRAM[0], 6.2), bredare(KFRAM[1], 6.2)];
const BAK = kort(KBAKW[0], 2.15 / 5.2, 0, -0.6), FRAM = kort(KFRAMW[0], 1.95 / 6.2, 0.05, -0.47);
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height, farg) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(map, { alphaTest: 0.5, alphaToCoverage: true, ...(farg && { color: farg }) })));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
const VHIMMEL = (() => { const c = frost(HIMMEL.image), x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.35; x.fillStyle = '#F2F6FA'; x.fillRect(0, 0, c.width, c.height); return tex(c); })();
pa(bredare(VHIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);   // vinterhimmel: blekare, kallare (frost + ljust)
[[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.36, 1.08], [MOLN3, 0.13, 0.66, 1.0]].forEach(([m, h, x, y]) => pa(m, h, x, y));
const FL = { x: 0.12, upp: 1.12, h: 0.26 };   // snöflingan på himlen (kritans första teckning)
const FLINGAN = pa(FLINGA, FL.h, FL.x, FL.upp, 0.012), FLKONTUR = pa(FLINGA_KONTUR, FL.h * 0.92, FL.x, FL.upp, 0.013);
const GRANAR = [[-0.7, -0.2, 0.62], [-0.93, -0.3, 0.5]].map(([x, z, h]) => kort(GRAN[0], h, x, z));
const TR = { x: 0.4, z: -0.16, h: 0.8 }, TRADET = kort(TRAD[0], TR.h, TR.x, TR.z), TS = TR.h / TH;
const tradpunkt = p => new THREE.Vector3(TR.x + (p.x - TW / 2) * TS, SIDA + (TH - p.y) * TS, TR.z + 0.004);
const FAGLAR = [FAGEL_R, FAGEL_B, FAGEL_G].map(m => kort(m, 0.07, 0, 0, { flik: false }));
// marken: frostgrön eller snövit
const mark = (f, l, m) => { const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, f, l, m, 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore(); return tex(c); };
const MARK = [mark('#9DB39A', '#B2C4AE', '#879E86'), mark('#F7F9FC', '#FFFFFF', '#DCE6F2')];
const MARKEN = platt(MARK[0], 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
// kaninen
const PLATS = { mitt: [-0.08, 0.2], steg: [0.06, 0.24], bollar: [0.04, 0.26], gran: [-0.48, 0.06], trad: [0.16, 0.1], 'vid-bollar': [0.06, 0.3] };
const KANIN = kort(KANEL, 0.34, 0, 0, { flik: false }), kanin = KANIN.m, KS = 0.34 / KANEL.image.height;
const pakanin = (map, px, py, w) => { const h = w * map.image.height / map.image.width, g = new THREE.PlaneGeometry(w, h);   // ett lager framför kaninen, (px, py) i kanel.png
  const m = new THREE.Mesh(g, urklipp(map)); m.position.set((px - KANEL.image.width / 2) * KS, (KANEL.image.height - py) * KS, 0.004); kanin.add(m); return m; };
// pannbandet på huvudet: rakt stickat band över öronens rötter (som 039 pannband_kod), grönt med kräm-röd-kräm rand
const PB_HUVUD = (() => { const c = duk(420, 90), x = c.getContext('2d');
  x.fillStyle = '#FFF'; x.beginPath(); x.roundRect(0, 0, 420, 90, 40); x.fill();
  const g = duk(420, 90); kritYta(g.getContext('2d'), 420, 90, '#2F7D46', '#3E9358', '#24653A', 1.4);
  const y = g.getContext('2d'); for (const [o, w, f] of [[-17, 4, '#FFF4E2'], [17, 4, '#FFF4E2'], [0, 6, '#D63A30']]) { y.fillStyle = f; y.fillRect(0, 45 + o - w, 420, 2 * w); }
  x.save(); x.beginPath(); x.roundRect(7, 7, 406, 76, 34); x.clip(); x.drawImage(g, 0, 0); x.restore(); return tex(c); })();
const PANNBANDET = pakanin(PB_HUVUD, 345, 240, 0.15);
const TUSSEN = pakanin(TUSS, 345, 125, 0.11);   // ovanpå huvudet mellan öronen
const ORONSNO = [[150, 30], [175, 22], [535, 30], [555, 24]].map(([px, py]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.006, 10, 8), new THREE.MeshBasicMaterial({ color: '#FFFFFF' }));
  m.position.set((px - KANEL.image.width / 2) * KS, (KANEL.image.height - py) * KS, 0.006); kanin.add(m); return m; });
const PUFF = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 12), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.85 })); scen.add(PUFF);
// pannbandets kort och kritans kontur på snön bredvid kaninen
const PBPOS = [-0.18, 0.36], PBW = 0.16;
const PBKORT = kort(PANNBAND, PBW * PANNBAND.image.height / PANNBAND.image.width, ...PBPOS);
const PBKONTUR = platt(PANNBAND_KONTUR, PBW, PBPOS[0], PBPOS[1] - 0.03, undefined, SIDA + 0.002);
// snöbollarna (stor, mellan, liten) på rad mot granarna, och snögubben där de ligger
const BOLLPOS = [[-0.2, 0.2, 0.15], [-0.34, 0.2, 0.115], [-0.45, 0.2, 0.085]];
const BOLLAR = BOLLPOS.map(([x, z, h]) => kort(SNOBOLL, h, x, z, { flik: false }));
const SNOGUBBEN = kort(GUBBE, 0.36, -0.32, 0.17);
// fotspåren: små ljusblå ovaler i par mellan mitt och steg
const SPAR_TEX = (() => { const c = duk(64, 96), x = c.getContext('2d'); x.fillStyle = 'rgba(160,188,220,0.9)'; x.beginPath(); x.ellipse(32, 48, 22, 34, 0, 0, Math.PI * 2); x.fill(); return tex(c); })();
const SPAR = [0.0, 0.07, 0.14].flatMap((d, i) => [-1, 1].map(s => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.033), new THREE.MeshBasicMaterial({ map: SPAR_TEX, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.set(PLATS.mitt[0] + 0.02 + d, SIDA + 0.0016, PLATS.mitt[1] + 0.01 + s * 0.018 + i * 0.006); scen.add(m); return m; }));
// snöfallet: små vita prickar (markering; i scenen platta kritflingor som faller och lägger sig)
const FLINGA_TEX = (() => { const c = duk(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 4, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.6, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return tex(c); })();
let fro = 11; const sl = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
const SNOFALL = Array.from({ length: 150 }, () => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLINGA_TEX, depthWrite: false }));
  m.position.set(-1.1 + 2.2 * sl(), SIDA + 0.04 + 1.0 * sl(), -0.45 + 0.95 * sl()); m.scale.setScalar(0.008 + 0.01 * sl()); scen.add(m); return m; });
// glimten: en liten fyruddig stjärna i gult, som 062:s glimt
const GLIMT_TEX = (() => { const c = duk(128, 128), x = c.getContext('2d'); x.fillStyle = '#FFF3B0';
  x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? 12 : 60; x.lineTo(64 + Math.cos(a) * r, 64 + Math.sin(a) * r); } x.fill(); return tex(c); })();
const glimtar = Array.from({ length: 3 }, () => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLIMT_TEX, depthWrite: false })); m.scale.setScalar(0.05); scen.add(m); return m; });

// kritan: en liten krita utan ansikte (markering i stillbilden)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.09, 20), mat(null, { color: '#3F7FC4' })); papper.position.y = 0.01;
  kritan.add(kropp, spets, papper); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }

scen.add(new THREE.HemisphereLight('#F4F8FF', '#C8D2DC', 2.3));
const ljus = new THREE.DirectionalLight('#FFF6EA', 2.0); ljus.position.set(-2.2, 4.4, 3); ljus.castShadow = true;   // blekt vinterljus
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
const komp = new EffectComposer(R); komp.addPass(new RenderPass(scen, cam)); komp.addPass(new OutputPass());

// ---- kamerorna: [var kameran står, vart den tittar, fov] (g = kaninens fot, f = snöflingans plats i världen) ----
function v3(...a) { return new THREE.Vector3(...a); }
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  himmel: () => [v3(0, 0.62, 1.75), v3(0, 0.62, -0.6), 34],
  flinga: (g, f) => [f.clone().add(v3(0.04, -0.12, 0.95)), f.clone(), 28],
  'flinga-hej': (g, f) => [f.clone().add(v3(0.06, -0.3, 1.5)), f.clone().add(v3(0, -0.15, 0)), 32],
  bred: () => [v3(0, 0.55, 1.55), v3(0, 0.34, -0.2), 31],
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.27, 0.6)), g.clone().add(v3(0, 0.22, 0)), 28],
  pannband: () => [v3(-0.02, 0.45, 1.05), v3(-0.04, 0.16, 0.28), 30],
  bollar: () => [v3(-0.16, 0.4, 1.1), v3(-0.2, 0.13, 0.22), 32],
  trad: () => [v3(0.32, 0.55, 1.2), v3(0.34, 0.42, -0.1), 28],
  tradnara: () => [v3(0.36, 0.6, 0.85), v3(0.38, 0.52, -0.16), 30],
  gubbe: () => [v3(-0.28, 0.36, 0.95), v3(-0.32, 0.18, 0.17), 30],
  hejda: g => [g.clone().add(v3(0.18, 0.34, 0.95)), g.clone().add(v3(-0.18, 0.2, -0.3)), 32],
};
VY.logga = VY.bord;

window.rad = s => {
  satt(s.parm ? 2 : 0);
  const sno = +!!s.sno;
  byt(BAK, KBAKW[sno]); byt(FRAM, KFRAMW[sno]); GRANAR.forEach(k => byt(k, GRAN[sno])); byt(TRADET, TRAD[sno]); MARKEN.material.map = MARK[sno]; MARKEN.material.needsUpdate = true;
  for (const k of [BAK, FRAM, ...GRANAR, TRADET, ...FAGLAR]) fall(k, s.kort);
  // fåglarna på sina grenar, ovanpå snön
  FAGLAR.forEach((k, i) => { const p = tradpunkt(sittplats(i, sno)); k.y = p.y - 0.006; k.m.position.set(p.x, k.y, p.z); fall(k, s.kort); });
  FLINGAN.visible = s.flinga === 'ja'; FLKONTUR.visible = s.flinga === 'kontur';
  // kaninen
  const [kx, kz] = PLATS[s.plats]; kanin.position.set(kx, SIDA, kz); fall(KANIN, s.kort && s.kanin === 'uppe');
  if (!s.kort || s.kanin === 'nere') kanin.position.set(PLATS.mitt[0], SIDA, PLATS.mitt[1]);
  const g = kanin.position.clone(); g.y = SIDA;
  PANNBANDET.visible = s.pannband === 'pa'; TUSSEN.visible = s.tuss; ORONSNO.forEach(m => m.visible = s.oronsno);
  PUFF.visible = s.puff; PUFF.position.set(kanin.position.x + 0.085, SIDA + 0.165, kanin.position.z + 0.05);   // bredvid nosen, inte över ögat
  PBKORT.m.visible = PBKORT.flik.visible = s.pannband === 'kort'; fall(PBKORT, s.pannband === 'kort'); PBKONTUR.visible = s.pannband === 'kontur';
  BOLLAR.forEach((k, i) => { k.m.visible = i < s.bollar; fall(k, i < s.bollar); });
  SNOGUBBEN.m.visible = SNOGUBBEN.flik.visible = s.gubbe; fall(SNOGUBBEN, s.gubbe);
  SPAR.forEach(m => m.visible = s.spar && !!s.kort);
  SNOFALL.forEach((m, i) => m.visible = i < [0, 60, 150][s.snofall]);
  // glimten på det Malin nämner
  scen.updateMatrixWorld(true);
  const f = FLINGAN.getWorldPosition(v3());
  const MAL = { bollar: BOLLAR.map((k, i) => k.m.position.clone().add(v3(0.03, BOLLPOS[i][2] * 0.9, 0.02))),
    faglar: FAGLAR.map(k => k.m.position.clone().add(v3(0.03, 0.08, 0.02))), flinga: [f.clone().add(v3(0.1, 0.08, 0.03))],
    gubbe: [SNOGUBBEN.m.position.clone().add(v3(0.06, 0.38, 0.02))] }[s.glimt] || [];
  glimtar.forEach((gl, i) => { gl.visible = !!MAL[i]; if (MAL[i]) gl.position.copy(MAL[i]); });
  // kritan
  kritan.visible = s.kritan;
  if (s.flinga === 'kontur') { kritan.position.copy(f).add(v3(0.1, 0.06, 0.07)); kritan.rotation.set(0, 0, -0.6); }
  if (s.pannband === 'kontur') { kritan.position.set(PBPOS[0] + 0.11, SIDA + 0.1, PBPOS[1] - 0.04); kritan.rotation.set(0.3, 0, -0.6); }
  const [pos, mal, fov] = VY[s.vy](g, f);
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); komp.render();
};
window.klar = true;
