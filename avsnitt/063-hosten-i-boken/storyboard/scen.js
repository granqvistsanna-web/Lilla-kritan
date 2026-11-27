// 063 Hösten i boken: stillbilderna till storyboarden, i samma three.js-bok som 062 (förlagan, storyboard/scen.js).
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Räven är ett platt kort (rut.png, riggens glada
// uttryck): riggen på kortet kommer i scenen (grind 6), så vinka, darra och lukta syns bara i bildtexten.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { halsduk, halsdukPa } from '../prov/halsduk/halsduk.js';

const W = 1920, H = 1080;
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const lad = src => new THREE.TextureLoader().loadAsync(src).then(t => tex(trim(t.image)));
const [GRAN, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, EK_KAL, EK_HOST, TRAD, LOVHOG, SVAMP, EKOLLON, STUBBE, EKORRE, RAV,
  LOV_O, LOV_R, LOV_G, LOV_B] = await Promise.all([
  B + 'skogen-gron-saker/gran.png',
  ...['himmel', 'kulle-bak-host', 'kulle-fram-host', 'moln-stor', 'moln-mellan', 'moln-liten', 'ek-kal', 'ek-host', 'trad-gult', 'lovhog', 'svamp', 'ekollon'].map(n => P + n + '.png'),
  RQ + 'stubbe/cut/stubbe.png', RQ + 'ekorre-orange/cut/ekorre-orange.png', P + 'rut.png',
  ...['orange', 'rott', 'gult', 'brunt'].map(n => `${RQ}lov/cut/lov-${n}.png`)].map(lad));
const HALSDUK = tex(trim(await halsduk()));
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått (genomskinlig bakgrund)
async function teckning(bildfil, konturfil) {
  const j = await (await fetch(konturfil)).json(), bild = await new THREE.ImageLoader().loadAsync(bildfil);
  const c = duk(bild.width, bild.height), x = c.getContext('2d');
  x.strokeStyle = '#3a2a20'; x.lineWidth = bild.height / 70; x.lineCap = x.lineJoin = 'round';
  for (const d of [j.d, ...(j.detaljer || [])]) x.stroke(new Path2D(d));
  return tex(trim(c));
}
const [LOV_KONTUR, HALSDUK_KONTUR] = await Promise.all([
  teckning(RQ + 'lov/cut/lov-orange.png', RQ + 'lov/cut/lov-orange-kontur.json'),
  teckning(RQ + 'halsduk/cut/halsduk-bok.png', RQ + 'halsduk/cut/halsduk-kontur.json')]);
function bredare(map, bredd) {
  const i = map.image, h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return tex(c);
}
// nedre delen av en bild (lövhögens främre halva, som räven sjunker ner bakom)
function nedre(map, andel) {
  const i = map.image, h = Math.round(i.height * andel), c = duk(i.width, h);
  c.getContext('2d').drawImage(i, 0, i.height - h, i.width, h, 0, 0, i.width, h); return tex(c);
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
const { insida, satt } = await skapaBok(scen, { farg: '#8A5A34', figur: LOV_O.image, doodles: true, oppna: [0.5, 1.4] });

// ---- uppslaget: höstkullarna, granarna, eken mitt i–vänster, det gula trädet bak, stubben och lövhögen till höger ----
const flik = mat(null, { color: '#9A7A3A' }), KORT = [];
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, y: m.position.y, hog: 0.004 + 0.0004 * KORT.length, w }; KORT.push(k);
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); k.flik = f; }
  return k;
}
// upp: 1 uppe, 0 nedfällt (framåt, baksidan upp), mellan: halvt uppfällt
const fall = (k, upp) => { upp = +upp; k.m.rotation.x = (1 - upp) * Math.PI / 2; k.m.position.y = k.y + (upp ? 0 : k.hog); };
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
const BAK = [kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47)];
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height, farg) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(map, { alphaTest: 0.5, alphaToCoverage: true, ...(farg && { color: farg }) })));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3, '#E4EAEC');   // höstljus: svalare och lite blekare
const MOLN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y]) => pa(m, h, x, y));
const SKOG = [[-1.0, -0.36, 0.5], [-0.8, -0.42, 0.6], [0.88, -0.38, 0.56], [1.02, -0.32, 0.44]].map(([x, z, h]) => kort(GRAN, h, x, z));
const TRADET = kort(TRAD, 0.62, 0.42, -0.4);
// eken: den kala och den höstiga står på samma fot (bildlistan), så stammarna ligger på varandra
const EK = { x: -0.42, z: -0.2, h: 1.0 };
const EKHOST = kort(EK_HOST, EK.h, EK.x, EK.z), EKKAL = kort(EK_KAL, EK.h * EK_KAL.image.height / EK_HOST.image.height, EK.x, EK.z + 0.002, { flik: false });
const LOVPOS = v3(EK.x + 0.2, SIDA + 0.7, EK.z + 0.02), LOVH = 0.15;   // kritans löv på en gren
const LOVET = kort(LOV_O, LOVH, LOVPOS.x, LOVPOS.z, { y: LOVPOS.y, flik: false }), LOVKONTUR = kort(LOV_KONTUR, LOVH, LOVPOS.x, LOVPOS.z + 0.001, { y: LOVPOS.y, flik: false });
{   // marken: höstgräs, ockrabrunt med gröna fläckar
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#B99A45', '#CDB264', '#8F8A3A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
const STUBBEN = kort(STUBBE, 0.17, 0.78, -0.08);
const SVAMPEN = kort(SVAMP, 0.13, 0.66, 0.16, { flik: false });
const HOG = { x: 0.34, z: 0.34 }, HOGBAK = kort(LOVHOG, 0.26, HOG.x, HOG.z), HOGFRAM = kort(nedre(LOVHOG, 0.5), 0.13, HOG.x, HOG.z + 0.06, { flik: false });
const EKOLLON_POS = [[-0.5, 0.06], [-0.38, 0.1], [-0.26, 0.05]], EKOLLONEN = EKOLLON_POS.map(([x, z]) => kort(EKOLLON, 0.05, x, z, { flik: false }));
const EKORREN = kort(EKORRE, 0.15, EK.x + 0.13, EK.z - 0.04, { flik: false });
// tre löv på marken, platta: det röda vid eken, det gula mitt fram, det bruna vid stubben
const MARKLOV = [[LOV_R, -0.66, 0.24], [LOV_G, 0.22, 0.52], [LOV_B, 0.78, 0.22]].map(([m, x, z]) => platt(m, 0.07, x, z, undefined, SIDA + 0.0015));
// räven och halsduken
const RAVPLATS = { mitt: [0.08, 0.2], hog: [HOG.x, HOG.z + 0.02], 'framfor-hog': [0.14, 0.42], ekollon: [-0.18, 0.14], svamp: [0.5, 0.06] };   // bakom och till vänster om svampen, så att svampen syns
const RAVKORT = kort(RAV, 0.34, 0, 0, { flik: false }), rav = RAVKORT.m;
const HDPOS = [-0.2, 0.36], HDW = 0.2;
const HALSDUKKORT = kort(HALSDUK, HDW * HALSDUK.image.height / HALSDUK.image.width, ...HDPOS);
const HDKONTUR = platt(HALSDUK_KONTUR, HDW, HDPOS[0], HDPOS[1] - 0.03, undefined, SIDA + 0.002);
// halsduken på räven: ritad i kod efter rävens kontur (halsdukPa), samma mått som kortet, ett lager framför det
const HALSEN = (() => { const g = rav.geometry, t = tex(halsdukPa(RAV.image, { yc: 430, tjock: 72, dip: 30, ande: -0.36 }));
  const m = new THREE.Mesh(g, urklipp(t)); m.position.z = 0.004; m.customDepthMaterial = djup(t); rav.add(m); return m; })();
// löv i luften (fallande, lövyran, på huvudet): små kort ur löven, i kod i scenen
const LOVSORT = [LOV_O, LOV_R, LOV_G, LOV_B];
const smalov = (n, s) => Array.from({ length: n }, (_, i) => { const map = LOVSORT[i % 4], m = new THREE.Mesh(new THREE.PlaneGeometry(s * map.image.width / map.image.height, s), urklipp(map));
  m.castShadow = true; m.customDepthMaterial = djup(map); scen.add(m); return m; });
const FALLER = smalov(6, 0.045), YRA = smalov(10, 0.04), HUVUD = smalov(3, 0.035); HUVUD.forEach(m => m.castShadow = false);
const FALLPOS = [[-0.3, 0.55, -0.1, 0.4], [-0.55, 0.38, 0.0, -0.6], [-0.1, 0.3, 0.1, 1.2], [0.25, 0.45, 0.0, -1.0], [0.45, 0.28, 0.15, 0.7], [-0.7, 0.2, 0.1, 2.0]];
// vinden: öppna krumelurer i vit krita, på en genomskinlig skiva framför uppslaget
const VIND = (() => { const c = duk(2048, 700), x = c.getContext('2d'); x.strokeStyle = '#FFFFFF'; x.lineCap = 'round'; x.lineWidth = 14;
  for (const [cx, cy, s] of [[300, 220, 1], [900, 420, 0.8], [1450, 180, 1.1], [1800, 480, 0.7]]) {
    x.beginPath(); x.moveTo(cx - 220 * s, cy + 30 * s); x.bezierCurveTo(cx - 80 * s, cy - 40 * s, cx + 60 * s, cy + 40 * s, cx + 120 * s, cy);
    x.arc(cx + 120 * s, cy - 40 * s, 40 * s, Math.PI / 2, -Math.PI, true); x.stroke(); }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.68), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, opacity: 0.85, depthWrite: false }));
  m.position.set(0, SIDA + 0.42, 0.15); scen.add(m); return m; })();
const PUFF = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 12), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.85 })); scen.add(PUFF);
// glimten: en liten fyruddig stjärna i gult, som 062:s glimt
const GLIMT_TEX = (() => { const c = duk(128, 128), x = c.getContext('2d'); x.fillStyle = '#FFF3B0';
  x.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? 12 : 60; x.lineTo(64 + Math.cos(a) * r, 64 + Math.sin(a) * r); } x.fill(); return tex(c); })();
const glimtar = Array.from({ length: 3 }, () => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLIMT_TEX, depthWrite: false })); m.scale.setScalar(0.05); scen.add(m); return m; });

// kritan: en liten krita utan ansikte (seriens kritan ritar i 2D; här bara som markering i stillbilden)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.09, 20), mat(null, { color: '#8A5A34' })); papper.position.y = 0.01;
  kritan.add(kropp, spets, papper); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }

scen.add(new THREE.HemisphereLight('#FFF8EC', '#D8B892', 2.2));
const ljus = new THREE.DirectionalLight('#FFE8CC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;   // lite lägre och varmare höstsol
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
const komp = new EffectComposer(R); komp.addPass(new RenderPass(scen, cam)); komp.addPass(new OutputPass());

// ---- kamerorna: [var kameran står, vart den tittar, fov] (g = rävens fot) ----
function v3(...a) { return new THREE.Vector3(...a); }
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  ek: () => [v3(EK.x + 0.25, 0.62, 1.55), v3(EK.x + 0.12, 0.5, EK.z), 32],
  gren: () => [LOVPOS.clone().add(v3(0.05, 0.0, 0.78)), LOVPOS.clone().add(v3(0, 0.0, 0)), 30],
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.27, 0.6)), g.clone().add(v3(0, 0.22, 0)), 28],
  bred: () => [v3(0, 0.6, 1.8), v3(0, 0.34, -0.2), 32],
  halsduk: g => [v3(-0.08, 0.42, 0.95), v3(-0.07, 0.12, 0.28), 30],
  hog: () => [v3(HOG.x - 0.1, 0.42, HOG.z + 0.82), v3(HOG.x - 0.1, 0.17, HOG.z - 0.02), 30],
  uppslag: () => [v3(0, 1.05, 2.1), v3(0, 0.15, 0.05), 32],
  ekmark: () => [v3(-0.3, 0.42, 0.95), v3(-0.33, 0.13, 0.02), 30],
  ekollon: () => [v3(-0.38, 0.22, 0.42), v3(-0.38, 0.1, 0.06), 28],
  stam: () => [v3(-0.5, 0.4, 0.9), v3(-0.5, 0.16, -0.04), 30],
  stubbe: () => [v3(0.6, 0.36, 0.82), v3(0.66, 0.1, 0.0), 30],
  'rav-svamp': g => [v3(0.62, 0.42, 1.05), v3(0.6, 0.16, 0.1), 30],
  hejda: g => [g.clone().add(v3(0.18, 0.34, 0.95)), g.clone().add(v3(-0.18, 0.2, -0.3)), 32],
};
VY.logga = VY.bord;

window.rad = s => {
  satt(s.parm ? 2 : 0);
  for (const k of [...BAK, ...SKOG, TRADET, EKHOST, EKKAL, STUBBEN, HOGBAK, HOGFRAM, ...EKOLLONEN]) fall(k, s.kort);
  EKHOST.m.visible = s.ek === 'host'; EKKAL.m.visible = s.ek === 'kal';
  LOVET.m.visible = s.lov === 'ja' && s.ek === 'kal'; LOVKONTUR.m.visible = s.lov === 'kontur';   // i den höstiga kronan ligger lövet i bilden
  for (const m of MARKLOV) m.visible = !!s.kort;
  // räven
  const [rx, rz] = RAVPLATS[s.plats]; rav.position.set(rx, SIDA + (s.plats === 'hog' ? -0.17 : 0), rz); fall(RAVKORT, s.kort && s.rav === 'uppe');
  if (!s.kort || s.rav === 'nere') rav.position.set(...RAVPLATS.mitt.slice(0, 1), SIDA, RAVPLATS.mitt[1]);
  const g = rav.position.clone(); g.y = SIDA;
  // halsduken
  HALSDUKKORT.m.visible = HALSDUKKORT.flik.visible = s.halsduk === 'kort'; fall(HALSDUKKORT, s.halsduk === 'kort');
  HDKONTUR.visible = s.halsduk === 'kontur';
  HALSEN.visible = s.halsduk === 'pa' && s.rav === 'uppe';   // under kindbandet, över magen
  // ekorren, svampen
  EKORREN.m.visible = s.ekorre !== 'nere' && !!s.kort; fall(EKORREN, s.ekorre !== 'nere');
  EKORREN.m.position.set(s.ekorre === 'uppe' ? EK.x - 0.2 : EK.x - 0.17, SIDA, s.ekorre === 'uppe' ? EK.z + 0.18 : EK.z - 0.05);   // svansen tittar fram till vänster om stammen
  fall(SVAMPEN, !s.kort ? 0 : { nere: 0, halv: 0.45, uppe: 1 }[s.svamp]);
  // löven i luften, lövyran, löven på huvudet
  FALLER.forEach((m, i) => { m.visible = i < s.falla; const [x, y, z, r] = FALLPOS[i]; m.position.set(x, SIDA + y, z); m.rotation.set(0.2, 0.3 * r, r); });
  YRA.forEach((m, i) => { m.visible = s.yra; const a = i / 10 * Math.PI * 2; m.position.set(HOG.x + Math.cos(a) * 0.13, SIDA + 0.22 + 0.08 * ((i * 7) % 5) / 5, HOG.z + 0.04 + Math.sin(a) * 0.03); m.rotation.set(0.2, 0, a * 1.7); });
  HUVUD.forEach((m, i) => { m.visible = s.huvudlov && s.rav === 'uppe'; m.position.set(rav.position.x - 0.05 + i * 0.05, rav.position.y + 0.3 - (i === 1 ? 0.01 : 0), rav.position.z + 0.03); m.rotation.set(0, 0, (i - 1) * 0.8); });
  VIND.visible = s.vind; PUFF.visible = s.puff; PUFF.position.set(rav.position.x + 0.03, rav.position.y + 0.2, rav.position.z + 0.06);
  // glimten på det Malin nämner
  const MAL = { lov: MARKLOV.map(m => m.position), ekollon: EKOLLONEN.map(k => k.m.position) }[s.glimt] || [];
  glimtar.forEach((gl, i) => { gl.visible = !!MAL[i]; if (MAL[i]) gl.position.copy(MAL[i]).add(v3(0.03, s.glimt === 'ekollon' ? 0.07 : 0.04, 0.02)); });
  // kritan
  kritan.visible = s.kritan;
  if (s.lov === 'kontur') { kritan.position.copy(LOVPOS).add(v3(0.09, 0.08, 0.06)); kritan.rotation.set(0, 0, -0.6); }
  if (s.halsduk === 'kontur') { kritan.position.set(HDPOS[0] + 0.12, SIDA + 0.1, HDPOS[1] - 0.04); kritan.rotation.set(0.3, 0, -0.6); }
  const [pos, mal, fov] = VY[s.vy](g);
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); komp.render();
};
window.klar = true;
