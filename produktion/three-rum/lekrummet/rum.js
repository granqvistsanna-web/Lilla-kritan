// Lekrummet i 3D, runda 2 (2026-11-23). Rummet är enkla, lite ojämna block i three.js med färgerna och kritkornet ur plattan
// assets/bakgrunder/lekrummet/lekrummet-v2.jpeg och kodscenen produktion/rum/lekrummet. Kanel är ett platt kort som vrider sig
// mot kameran (bara kring y), belyst av rummet: en svagt mörkare sida bort från solen, en varm inre kant på solsidan, en riktig
// mjuk skugga på golvet och en kontaktskugga under fötterna.
// Scenen (18 s): Kanel plockar upp den röda bollen från golvet och lägger den i leksakslådan, Malin: "Hurra, bra jobbat!",
// ett klipp till halvnära, hon vinkar och Malin säger hej då.
// Allt räknas ur t: window.seek(t) ritar en bildruta (ingen requestAnimationFrame-tid), så filmen blir likadan varje gång.
// Teknik lånad från mromidev/claude-animated-shorts (MIT): kort som bara vrids kring y, kortets ljustoning och inre kant
// (cardshade.ts), kontaktskugga med multiply, tunn lins-oskärpa, lätt bloom och gradering.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { tunnaArmar } from './tunna-armar.js';
// Runda 3: ?armar=bild (Kanels målade armar, som runda 2), a (tunna kritarmar 5 % av huvudets bredd, standard) eller b (7 %)
const ARMAR = new URLSearchParams(location.search).get('armar') || 'c', BREDD = { a: 24, b: 34, c: 60 }[ARMAR];

const SNABB = location.search.includes('snabb');
const W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080, DURATION = 18;
const $ = id => document.getElementById(id);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => { k = kl(0, 1, k); return k * k * (3 - 2 * k); };
const lugn = k => 0.5 - 0.5 * Math.cos(Math.PI * kl(0, 1, k));   // in och ut som en sinus: kameran startar och stannar mjukt

// ---------- renderare ----------
const R = new THREE.WebGLRenderer({ canvas: $('bild'), antialias: false, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false);
R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.NoToneMapping;   // ingen tonkurva: kritfärgerna ska bli som i plattan
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFShadowMap;
const scen = new THREE.Scene();
scen.background = new THREE.Color('#05a167');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 40);

// ---------- texturer ----------
const bild = src => new Promise((ok, fel) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fel; i.src = src; });
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const tex = (c, rep = [1, 1]) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); t.anisotropy = 8; return t; };
let fro = 1;
const slump = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;   // fast frö: samma rum varje rendering
// Kritkorn: papper-textur.png (grå kring 128) blir en ljus multiplikator 0,86–1,0, som läggs på allt i rummet.
let KORNC;
async function korn() {
  const i = await bild('/verktyg/papper-textur.png'), c = canvas(1024, 1024), x = c.getContext('2d');
  x.drawImage(i, 0, 0, 1024, 1024); const d = x.getImageData(0, 0, 1024, 1024);
  for (let j = 0; j < d.data.length; j += 4) { const v = 255 * kl(0.86, 1, 0.95 + (d.data[j] - 128) / 255 * 0.5); d.data[j] = d.data[j + 1] = d.data[j + 2] = v; }
  x.putImageData(d, 0, 0); return c;
}
const kornPa = (x, w, h, ruta = 256) => { x.globalCompositeOperation = 'multiply';
  for (let i = 0; i < w; i += ruta) for (let j = 0; j < h; j += ruta) x.drawImage(KORNC, i, j, ruta, ruta); x.globalCompositeOperation = 'source-over'; };
// Ett kritstreck: flera tunna, lite skakiga linjer med låg täckning ovanpå varandra (som vaxkrita på papper).
function krita(x, pts, farg, bredd, alfa = 0.5, n = 4) {
  x.lineCap = 'round'; x.lineJoin = 'round';
  for (let k = 0; k < n; k++) { x.strokeStyle = farg; x.globalAlpha = alfa * (0.6 + 0.4 * slump()); x.lineWidth = bredd * (0.55 + 0.5 * slump());
    const o = (k - (n - 1) / 2) * bredd * 0.22; x.beginPath();
    pts.forEach(([px, py], i) => { const j = bredd * 0.12; const q = [px + o + (slump() - 0.5) * j, py + o * 0.5 + (slump() - 0.5) * j]; i ? x.lineTo(...q) : x.moveTo(...q); });
    x.stroke(); }
  x.globalAlpha = 1;
}
// en linje från a till b uppdelad i små bitar som vickar lite: handritad, inte linjal
const skakig = ([ax, ay], [bx, by], d = 2, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n;
  return [ax + (bx - ax) * u + (slump() - 0.5) * d * (i % n ? 1 : 0.3), ay + (by - ay) * u + (slump() - 0.5) * d * (i % n ? 1 : 0.3)]; });

// Väggen: plattans gröna (#05a167) med kritkorn och långa, snea kritsvep (ljusgröna och turkosa, som i plattan), lite starkare
// än i runda 1. En egen bild per vägg (ingen upprepning), så att svepen inte speglas till mönster.
function vaggBit(w, h) {
  const c = canvas(w, h), x = c.getContext('2d');
  x.fillStyle = '#05a167'; x.fillRect(0, 0, w, h); kornPa(x, w, h, 512);
  for (let n = 0; n < w / 200; n++) {
    const turkos = slump() < 0.35, x0 = slump() * w, y0 = h * (0.15 + 0.85 * slump()), l = (turkos ? 120 : 260) + slump() * (turkos ? 180 : 600), a = -(0.55 + 0.25 * slump());
    const b = [x0 + l * Math.cos(a), y0 + l * Math.sin(a)];
    krita(x, skakig([x0, y0], b, 3, 16), turkos ? 'rgb(70,200,185)' : 'rgb(135,220,95)', 4 + 3 * slump(), 0.17 + 0.07 * slump(), 6);
    if (turkos && slump() < 0.6) krita(x, skakig([x0 + 20, y0 + 30], [b[0] + 30, b[1] + 40], 3, 10), 'rgb(70,200,185)', 4, 0.15, 4);   // dubbla svep, som plattans krumelurer
  }
  return c;
}
// Golvet: varmt ljust golv, kritkorn och plankstreck som vickar lite.
function golvBit() {
  const c = canvas(1024, 1024), x = c.getContext('2d');
  x.fillStyle = '#f2dfc6'; x.fillRect(0, 0, 1024, 1024); kornPa(x, 1024, 1024);
  for (let k = 0; k < 4; k++) { const y = 128 + k * 256; krita(x, skakig([-10, y], [1034, y + 4], 3, 30), 'rgb(185,135,90)', 5, 0.16, 3); }
  return c;
}
// Mattan: kodscenens fyra ringar (blå, gul, blå, gul), ojämn kritkant och korn.
function mattBit() {
  const c = canvas(1024, 1024), x = c.getContext('2d'), r = [370, 308, 246, 180], f = ['#3d7bd9', '#f2b33d', '#3d7bd9', '#f2b33d'];
  x.fillStyle = '#ffffff'; x.beginPath(); x.arc(512, 512, 506, 0, 2 * Math.PI); x.fill();   // vit klistermärkeskant som i kodscenen
  r.forEach((q, i) => { x.fillStyle = f[i]; x.beginPath(); for (let a = 0; a <= 2 * Math.PI + 0.01; a += 0.02) { const rr = q / 370 * 492 + Math.sin(a * 7 + i) * 2.5 + Math.sin(a * 23) * 1.2;
    x.lineTo(512 + rr * Math.cos(a), 512 + rr * Math.sin(a)); } x.fill(); });
  kornPa(x, 1024, 1024); x.globalCompositeOperation = 'destination-in';
  x.beginPath(); x.arc(512, 512, 506, 0, 2 * Math.PI); x.fill(); return c;
}
// Kontaktskugga: mjuk rund fläck, varm mörkbrun (multiply).
function klickBit() {
  const c = canvas(256, 256), x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgb(150,120,105)'); g.addColorStop(0.45, 'rgb(200,180,165)'); g.addColorStop(1, 'rgb(255,255,255)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256); return c;
}
// Teckningar på väggen: ett papper med en kritteckning, fasttejpat (en sol över gräs, ett hus, ett hjärta)
function teckning(typ) {
  const c = canvas(420, 340), x = c.getContext('2d');
  x.fillStyle = '#fffaf0'; x.fillRect(0, 0, 420, 340); kornPa(x, 420, 340);
  if (typ === 'sol') {
    krita(x, skakig([0, 270], [420, 262], 4), '#3da35a', 26, 0.7, 5);
    x.fillStyle = '#f7c531'; x.beginPath(); x.arc(150, 130, 52, 0, 7); x.fill();
    for (let i = 0; i < 9; i++) { const a = i / 9 * 2 * Math.PI; krita(x, [[150 + 66 * Math.cos(a), 130 + 66 * Math.sin(a)], [150 + 100 * Math.cos(a), 130 + 100 * Math.sin(a)]], '#f2a929', 10, 0.8, 3); }
    krita(x, skakig([300, 90], [370, 80], 3), '#7cc4ee', 18, 0.6, 3);
  } else if (typ === 'hus') {
    x.fillStyle = '#e8574e'; x.fillRect(120, 150, 180, 140);
    krita(x, [[100, 155], [210, 60], [320, 155]], '#7a4a32', 16, 0.85, 4);
    x.fillStyle = '#ffc93c'; x.fillRect(150, 185, 45, 45); x.fillStyle = '#fae7c4'; x.fillRect(225, 205, 45, 85);
  } else {
    x.fillStyle = '#e86fa8'; x.beginPath(); x.moveTo(210, 270); x.bezierCurveTo(60, 170, 110, 60, 210, 120); x.bezierCurveTo(310, 60, 360, 170, 210, 270); x.fill();
  }
  kornPa(x, 420, 340);
  x.fillStyle = 'rgba(255,250,225,0.75)'; x.save(); x.translate(210, 12); x.rotate(-0.06); x.fillRect(-45, -14, 90, 28); x.restore();   // tejp
  return c;
}

// ---------- material och former ----------
const mat = (farg, o = {}) => new THREE.MeshLambertMaterial({ color: farg, ...o });
// Varje sida av en låda får en egen bild i rätt proportion: färgen, kritkornet och skakiga mörkare kritstreck längs kanterna
// (som klossarna i plattan). Lådorna har rundade hörn och vickar lite (ojamn), så att de ser ritade ut och inte maskingjorda.
const PXM = 420;
function sidBild(b, h, farg, linje) {
  const w = Math.max(24, Math.round(b * PXM)), hh = Math.max(24, Math.round(h * PXM)), c = canvas(w, hh), x = c.getContext('2d');
  x.fillStyle = farg; x.fillRect(0, 0, w, hh); kornPa(x, w, hh);
  if (linje) { const k = 0.022 * PXM, o = k * 0.75, P = [[o, o], [w - o, o], [w - o, hh - o], [o, hh - o]];
    for (let i = 0; i < 4; i++) krita(x, skakig(P[i], P[(i + 1) % 4], k * 0.25, 10), linje, k, 0.5, 4); }
  const t = tex(c); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return t;
}
function ojamn(g, amp, f = 0) {   // mjuk, lågfrekvent vickning av hörnen (samma läge → samma förflyttning, så inga glipor)
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    p.setXYZ(i, x + amp * Math.sin(7.1 * y + 3.3 * z + f), y + amp * Math.sin(6.3 * x + 5.7 * z + 2 * f), z + amp * Math.sin(5.9 * x + 4.1 * y + 3 * f)); }
  return g;
}
const lada = (b, h, d, farg, linje, pos, o = {}) => {
  const r = Math.min(o.r ?? 0.025, b / 2.2, h / 2.2, d / 2.2);
  const g = ojamn(new RoundedBoxGeometry(b, h, d, 3, r), o.vick ?? 0.004, pos[0] * 3 + pos[2]);
  const sidor = [[d, h], [d, h], [b, d], [b, d], [b, h], [b, h]].map(([u, v]) => new THREE.MeshLambertMaterial({ map: sidBild(u, v, farg, linje) }));
  const m = new THREE.Mesh(g, sidor); m.position.set(...pos); if (o.rot) m.rotation.set(...o.rot);
  m.castShadow = m.receiveShadow = true; scen.add(m); return m; };
const klot = (r, farg, pos, sk = [1, 1, 1], vick = 0.02) => {
  const c = canvas(512, 256), x = c.getContext('2d'); x.fillStyle = farg; x.fillRect(0, 0, 512, 256); kornPa(x, 512, 256);
  const m = new THREE.Mesh(ojamn(new THREE.SphereGeometry(r, 40, 28), r * vick, pos[0]), new THREE.MeshLambertMaterial({ map: tex(c) }));
  m.position.set(...pos); m.scale.set(...sk); m.castShadow = m.receiveShadow = true; scen.add(m); return m; };

// ---------- rummet ----------
// Mått i meter, Kanel 1,0 m hög. Plattan (430 px kropp): dörren 1,55 × 0,8, hyllan 1,2 m upp, mattan 1,7 m bred.
const BAK = -1.7, SIDA = 3.1, TAK = 2.7;
const KANEL = new THREE.Vector3(0.05, 0, 0.1);
const LADA = { x: KANEL.x - 0.57, z: KANEL.z - 0.26, b: 0.44, d: 0.32, h: 0.22 };   // leksakslådan bakom Kanel till vänster (bollen läggs i den)
async function byggRum() {
  KORNC = await korn();
  // bakvägg och sidoväggar (ca 330 px per meter); lite eget ljus: en stark vägg, som i plattan
  const vm = b => { const t = tex(vaggBit(Math.round(b * 330), Math.round(TAK * 330)));
    return new THREE.MeshLambertMaterial({ map: t, emissiveMap: t, emissive: new THREE.Color(0.14, 0.14, 0.14) }); };
  const bak = new THREE.Mesh(new THREE.PlaneGeometry(2 * SIDA, TAK), vm(2 * SIDA)); bak.position.set(0, TAK / 2, BAK); bak.receiveShadow = true; scen.add(bak);
  for (const s of [-1, 1]) { const v = new THREE.Mesh(new THREE.PlaneGeometry(6, TAK), vm(6)); v.rotation.y = -s * Math.PI / 2;
    v.position.set(s * SIDA, TAK / 2, BAK + 3); v.receiveShadow = true; scen.add(v); }
  const tak = new THREE.Mesh(new THREE.PlaneGeometry(2 * SIDA, 6), mat('#f6efe3')); tak.rotation.x = Math.PI / 2; tak.position.set(0, TAK, BAK + 3); scen.add(tak);
  const golv = new THREE.Mesh(new THREE.PlaneGeometry(2 * SIDA, 6), new THREE.MeshLambertMaterial({ map: tex(golvBit(), [3, 3]) }));
  golv.rotation.x = -Math.PI / 2; golv.position.set(0, 0, BAK + 3); golv.receiveShadow = true; scen.add(golv);
  // golvlist: plattans mörkgröna kritkant där väggen möter golvet
  lada(2 * SIDA, 0.05, 0.03, '#1f7a52', null, [0, 0.025, BAK + 0.015], { r: 0.01, vick: 0.003 });
  for (const s of [-1, 1]) lada(0.03, 0.05, 6, '#1f7a52', null, [s * (SIDA - 0.015), 0.025, BAK + 3], { r: 0.01, vick: 0.003 });

  // dörren: gräddvit med rosa kritram och gul knopp (plattan: #fae7c4, #e757b2)
  const DX = -1.85, DB = 0.8, DH = 1.55;
  const dorrForm = (b, h) => { const s = new THREE.Shape(); s.moveTo(-b / 2, 0); s.lineTo(-b / 2, h - b / 2); s.absarc(0, h - b / 2, b / 2, Math.PI, 0, true); s.lineTo(b / 2, 0); s.lineTo(-b / 2, 0); return s; };
  const dorr = (b, h, d, farg) => { const c = canvas(256, 256), x = c.getContext('2d'); x.fillStyle = farg; x.fillRect(0, 0, 256, 256); kornPa(x, 256, 256);
    const t = tex(c, [3, 3]); const m = new THREE.Mesh(new THREE.ExtrudeGeometry(dorrForm(b, h), { depth: d, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 2, curveSegments: 24 }),
      new THREE.MeshLambertMaterial({ map: t })); m.position.set(DX, 0, BAK); m.castShadow = m.receiveShadow = true; scen.add(m); return m; };
  dorr(DB + 0.08, DH + 0.04, 0.035, '#e757b2'); dorr(DB - 0.03, DH - 0.02, 0.05, '#fae7c4');
  klot(0.035, '#f2c230', [DX + DB * 0.33, DH * 0.48, BAK + 0.085], [1, 1, 1], 0.05);

  // hyllan med klossarna (plattan: #f2a929, blå #376fce, röd #f73f46), plus en liten gul kloss
  const HX = 1.65, HY = 1.22;
  lada(1.05, 0.09, 0.2, '#f2a929', '#b8740f', [HX, HY, BAK + 0.1], { r: 0.02 });
  lada(0.24, 0.24, 0.2, '#376fce', '#1f4a95', [HX - 0.24, HY + 0.165, BAK + 0.11], { rot: [0, 0.06, 0] });
  lada(0.24, 0.24, 0.2, '#f73f46', '#b52230', [HX + 0.06, HY + 0.165, BAK + 0.11], { rot: [0, -0.05, 0] });
  lada(0.14, 0.14, 0.14, '#f2b33d', '#b98216', [HX + 0.33, HY + 0.115, BAK + 0.11], { rot: [0, 0.25, 0] });

  // teckningar på väggen (barnens kritteckningar, tejpade), lite snett
  for (const [typ, x, y, b, v] of [['sol', -0.85, 1.45, 0.46, -0.05], ['hus', 0.62, 1.62, 0.4, 0.04], ['hjarta', 2.45, 0.95, 0.32, -0.07]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(b, b * 340 / 420), new THREE.MeshLambertMaterial({ map: tex(teckning(typ)) }));
    m.position.set(x, y, BAK + 0.006); m.rotation.z = v; m.receiveShadow = true; scen.add(m); }

  // mattan (platt på golvet)
  const matta = new THREE.Mesh(new THREE.CircleGeometry(1, 96), new THREE.MeshLambertMaterial({ map: tex(mattBit()), transparent: true }));
  matta.rotation.x = -Math.PI / 2; matta.scale.set(0.95, 0.62, 1); matta.position.set(-0.05, 0.004, 0.25); matta.receiveShadow = true; scen.add(matta);

  // leksakslådan (ljusblå) med en kloss som sticker upp; bollen läggs i den
  const { x: lx, z: lz, b: lb, d: ld, h: lh } = LADA, t = 0.03, KF = '#6fb7e8', KL = '#2f6fa8';
  lada(lb, 0.03, ld, KF, KL, [lx, 0.015, lz], { r: 0.01 });
  lada(lb, lh, t, KF, KL, [lx, lh / 2, lz + ld / 2 - t / 2], { r: 0.012 }); lada(lb, lh, t, KF, KL, [lx, lh / 2, lz - ld / 2 + t / 2], { r: 0.012 });
  lada(t, lh, ld - 2 * t, KF, KL, [lx - lb / 2 + t / 2, lh / 2, lz], { r: 0.012 }); lada(t, lh, ld - 2 * t, KF, KL, [lx + lb / 2 - t / 2, lh / 2, lz], { r: 0.012 });
  lada(0.13, 0.13, 0.13, '#f2b33d', '#b98216', [lx + 0.09, 0.16, lz - 0.05], { rot: [0.35, 0.5, 0.2] });

  // klossar på golvet till höger, en liten tornhög
  lada(0.2, 0.2, 0.2, '#f2b33d', '#b98216', [1.05, 0.1, 0.55], { rot: [0, 0.35, 0] });
  lada(0.18, 0.18, 0.18, '#3d7bd9', '#1f4a95', [1.08, 0.29, 0.53], { rot: [0, -0.2, 0] });
  lada(0.16, 0.16, 0.16, '#d9443a', '#a12a24', [1.36, 0.08, 0.78], { rot: [0, 0.6, 0] });
  // en rund rosa golvkudde längst fram till vänster (förgrund, blir mjukt suddig)
  klot(0.24, '#e86fa8', [-1.3, 0.1, 1.0], [1, 0.42, 0.9], 0.03);
  // en liten krukväxt i hörnet till höger
  const kruka = new THREE.Mesh(ojamn(new THREE.CylinderGeometry(0.13, 0.1, 0.24, 28), 0.004), new THREE.MeshLambertMaterial({ map: sidBild(0.8, 0.24, '#d8784a', '#9b4a26') }));
  kruka.position.set(2.45, 0.12, -1.25); kruka.castShadow = kruka.receiveShadow = true; scen.add(kruka);
  klot(0.2, '#3da35a', [2.45, 0.42, -1.25], [1, 0.9, 1], 0.08); klot(0.14, '#4cb866', [2.36, 0.6, -1.2], [1, 1, 1], 0.08); klot(0.12, '#2e8b57', [2.58, 0.55, -1.3], [1, 1, 1], 0.08);

  // papperskedjan högt upp på bakväggen (kodscenens färger), två slingor; varannan länk vriden
  const FARGER = ['#D9443A', '#F2B33D', '#FFF6E8', '#E86FA8', '#3D7BD9'], ring = new THREE.TorusGeometry(0.05, 0.013, 8, 24);
  const kedja = (x0, x1, y0, sack) => { const n = Math.round((x1 - x0) / 0.085);
    for (let i = 0; i <= n; i++) { const u = i / n, x = lerp(x0, x1, u), y = y0 - sack * 4 * u * (1 - u), dy = -sack * 4 * (1 - 2 * u) / (x1 - x0);
      const m = new THREE.Mesh(ring, mat(FARGER[i % 5])); m.scale.set(1, 0.62, 1); m.position.set(x, y, BAK + 0.08);
      m.rotation.set(i % 2 ? Math.PI / 2 : 0, 0, Math.atan(dy)); m.castShadow = true; scen.add(m); } };
  kedja(-SIDA + 0.1, 0, 2.2, 0.28); kedja(0, SIDA - 0.1, 2.2, 0.28);
}

// ---------- ljus: varmt och mjukt, ljusare än det mörka referensljuset ----------
scen.add(new THREE.HemisphereLight('#fffaf3', '#efe4d4', 2.1));
const sol = new THREE.DirectionalLight('#fff0dc', 1.6);
sol.position.set(-3.5, 4.2, 2.6); sol.target.position.set(0, 0, -0.3);
sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.radius = 7; sol.shadow.bias = -0.0006; sol.shadow.normalBias = 0.01;
Object.assign(sol.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 14 });
scen.add(sol, sol.target);
const SOLRIKT = new THREE.Vector3().subVectors(sol.position, sol.target.position).normalize();   // mot solen

// ---------- Kanel som kort ----------
// SVG:ns ruta: x −150…1174, y −200…1000 (riggens enheter, fötterna på y 947). 947 enheter = 1,0 m.
const BOLLS = 0.26;   // bollens skala i riggen (Kanels uttryck.html har 0,18; större så att den syns i helbild)
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, FOT = 947, ENHET = 1 / FOT, LYFT = 0.014;
let TA, L, G, BL, kortCanvas, kortCtx, kortTex, kort, kantF, SAK, bollKort;
// Kortets ljustoning (som referensens cardShade, förenklad): en svag lavendelskugga på sidan bort från solen och en varm inre kant
// på solsidan. Kanten ligger INNANFÖR den vita klistermärkeskanten: pixeln får ljuset om den inte själv är vit och bilden tar slut
// (genomskinligt) inom kantbredd + 3 px i bild åt solens håll. Ingen förskjuten kopia utanför figuren.
const KU = { uSol: { value: new THREE.Vector2(-1, 0) }, uSida: { value: 0.0 }, uFigC: { value: (512 - VB.x) / VB.w }, uHalv: { value: 330 / VB.w },
  uEnhUv: { value: new THREE.Vector2(1 / VB.w, 1 / VB.h) }, uSteg: { value: 1.5 }, uVit: { value: 12 }, uBand: { value: 5 }, uKant: { value: 0.0 } };
function kortSkugga(m) {
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, KU);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      uniform vec2 uSol, uEnhUv; uniform float uSida, uFigC, uHalv, uSteg, uVit, uBand, uKant;`)
      .replace('#include <envmap_fragment>', `#ifdef USE_MAP
      { float t = clamp((vMapUv.x - uFigC) / uHalv, -1.0, 1.0) * sign(uSol.x) * smoothstep(0.0, 0.35, abs(uSol.x));   // +1 = kanten mot solen
        float mork = smoothstep(-0.15, 0.95, -t);
        outgoingLight *= mix(vec3(1.0), vec3(0.89, 0.875, 0.97), mork * uSida);
        vec4 c0 = texture2D(map, vMapUv); float vit = step(0.8, min(c0.r, min(c0.g, c0.b)));
        float d = 99.0;
        for (int i = 1; i <= 18; i++) { float u = float(i) * uSteg; if (texture2D(map, vMapUv + uSol * uEnhUv * u).a < 0.5) { d = u; break; } }
        float kant = (1.0 - vit) * step(0.5, c0.a) * (1.0 - smoothstep(uVit, uVit + uBand, d)) * step(d, 98.0);
        outgoingLight += vec3(0.95, 0.56, 0.22) * kant * uKant; }
      #endif
      #include <envmap_fragment>`);
  };
  m.customProgramCacheKey = () => 'lk-kort1';
  return m;
}
async function byggKanel() {
  L = await v2rigg('kaninen-kanel');
  G = L.figur(512, FOT, 1, $('figurer'));
  G.querySelector('.skugga')?.setAttribute('display', 'none');   // den platta skuggan behövs inte: rummet ger en riktig
  // röda bollen (rekvisita), samma mått som i Kanels uttryck.html: handen ovanpå bollen, nära toppen
  SAK = L.sakBild('/assets/rekvisita/boll-rod/cut/boll-rod.png', 1024, 1024, { grepp: [540, 300], fot: [511, 858], skala: BOLLS, folj: 0, kant: 10 });
  L.sakIn(G, SAK);
  if (BREDD) TA = tunnaArmar(G, L, { bredd: BREDD });   // en kopia av Kanel med tunna armar, bara i den här sidan
  // bilderna blir data-URL:er, så att SVG:n kan ritas som en bild (en SVG i <img> hämtar inga egna filer)
  await Promise.all([...$('kort').querySelectorAll('image')].map(async im => {
    const b = await (await fetch(im.getAttribute('href'))).blob();
    im.setAttribute('href', await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }));
  }));
  window.kant.lagg(G); kantF = $('defs').lastElementChild;   // den vita klistermärkeskanten (verktyg/kant.js); bredden sätts per bildruta
  BL = skapaBlinka(50);
  kortCanvas = canvas(VB.w, VB.h); kortCtx = kortCanvas.getContext('2d');
  kortTex = new THREE.CanvasTexture(kortCanvas); kortTex.colorSpace = THREE.SRGBColorSpace; kortTex.anisotropy = 8;
  // Kortet lyser lite själv (emissiveMap = samma bild) så att figurens färger blir som i avsnitten, resten kommer från rummets ljus.
  const km = kortSkugga(new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), transparent: true, alphaTest: 0.02, side: THREE.DoubleSide }));
  const g = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
  g.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna (512, 947)
  kort = new THREE.Mesh(g, km); kort.castShadow = true; kort.receiveShadow = true;
  kort.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
  kort.position.copy(KANEL); kort.position.y = LYFT; scen.add(kort);   // 14 mm upp: kanten och boilen under fötterna går annars ner i golvet
  const klick = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex(klickBit()), depthWrite: false,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
    polygonOffset: true, polygonOffsetFactor: -4 }));
  klick.rotation.x = -Math.PI / 2; klick.scale.set(0.95, 0.42, 1); klick.position.set(KANEL.x, 0.006, KANEL.z + 0.02); klick.renderOrder = 1; scen.add(klick);
  // Bollen när den släpps: ett eget litet kort (samma bild och vita kant), som faller ner i lådan bakom lådans framkant
  const bi = await bild('/assets/rekvisita/boll-rod/cut/boll-rod.png'), bc = canvas(1024, 1024), bx = bc.getContext('2d'), rk = (6 - 10 * BOLLS) / BOLLS;   // kanten som i riggen: HAND.kant 6 − inbakad 1,8 (bollens px)
  for (let a = 0; a < 2 * Math.PI; a += Math.PI / 12) bx.drawImage(bi, rk * Math.cos(a), rk * Math.sin(a));
  bx.globalCompositeOperation = 'source-in'; bx.fillStyle = '#fff'; bx.fillRect(0, 0, 1024, 1024); bx.globalCompositeOperation = 'source-over'; bx.drawImage(bi, 0, 0);
  const bt = tex(bc), bs = 1024 * BOLLS * ENHET;
  bollKort = new THREE.Mesh(new THREE.PlaneGeometry(bs, bs).translate(0, (858 - 512) / 1024 * bs, 0),   // origo i bollens fot
    new THREE.MeshLambertMaterial({ map: bt, emissiveMap: bt, emissive: new THREE.Color(0.3, 0.3, 0.3), transparent: true, alphaTest: 0.02 }));
  bollKort.castShadow = true; bollKort.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: bt, alphaTest: 0.5 });
  bollKort.visible = false; scen.add(bollKort);
}

// ---------- scenen ----------
// 0–1,3 står och tittar på bollen · 1,3–3,5 plockar upp den (riggens plockaDel, golvet bredvid vänster fot) · 3,5–4,8 håller den
// och tittar glatt på den · 4,8–7,0 lägger den i lådan (samma väg baklänges, släpper den över lådan) · bollen faller ner ·
// Malin "Hurra, bra jobbat!" 0,6 s efter att den landat · glad, tittar på oss · KLIPP 11,0 till halvnära · vinkar 11,7–14,9,
// Malin "Hej då" mitt i vinkningen · glad och stilla till 18.
const D = 2.2, T_UPP = 1.3, T_NER = 4.8, KLIPP = 11.0, T_VINK = 11.7, D_VINK = 3.2;
const GOLV_O = () => ({ fri: [175, FOT, 0], boj: L.HAND.golv, hand: 0 });
const LADA_O = () => ({ fri: [95, 722, 0], boj: { luta: -2, boj: -2.5, strack: -0.02, bred: 0.01, armar: -8 }, hand: 0 });
const SLAPP = T_NER + D - 0.46 * D - 0.075;   // då hall går under 0,5 i plockaDel('ner') (kontakt = 0,46 d, hall över 0,15 s)
const FALL = 0.42, LANDAR = SLAPP + FALL;
const P = o => ({ ...L.POSE0, ...o });
const liv = (p, t) => { const a = (1 - Math.cos(2 * Math.PI * t / 3.6)) / 2;   // andning, som 050
  return { ...p, strack: (p.strack || 0) + 0.014 * a, bred: (p.bred || 0) + 0.007 * a, oron: (p.oron || [0, 0]).map((o, i) => o - 2 * a + (i ? -1 : 1) * 1.5 * Math.sin(t * 1.3 + 2 * i)) }; };
const GLAD = () => ({ ...L.blanda('neutral', 'glad', 1), glad: [0, 0] });
function kanel(t) {
  let f, p;
  if (t < T_UPP) {   // tittar på bollen bredvid sig
    [f, p] = L.plockaDel('upp', 0, D, GOLV_O()); const k = mjuk((t - 0.3) / 0.6);
    f = { ...f, titt: [-9 * k, 9 * k] }; p = { ...p, luta: 1.5 * k };
  } else if (t < T_UPP + D) [f, p] = L.plockaDel('upp', t - T_UPP, D, GOLV_O());
  else if (t < T_NER) { [f, p] = L.plockaDel('upp', D, D, GOLV_O()); const h = Math.sin(Math.PI * (t - T_UPP - D) / (T_NER - T_UPP - D));
    f = { ...f, titt: (f.titt || [0, 0]).map((v, i) => v + [-7, 5][i] * h) }; p = { ...p, boj: (p.boj || 0) - 1.5 * h }; }
  else if (t < T_NER + D) [f, p] = L.plockaDel('ner', t - T_NER, D, LADA_O());
  else { [f, p] = L.plockaDel('ner', D, D, LADA_O()); const k = mjuk((t - T_NER - D) / 0.6);
    f = L.blanda(f, GLAD(), Math.max(k, 0)); f = { ...f, glad: [0, 0], titt: [0, 0] }; p = { ...p, hall: [0, 0], rack: [0, 0] }; }
  if (t >= T_NER + D && t < KLIPP) {   // glad efter "bra jobbat": en liten nick när Malin säger det
    const u = (t - (LANDAR + 0.7)) / 0.5; if (u > 0 && u < 2) p = { ...p, nick: [1.1 * Math.sin(Math.PI * (u % 1)), 1.1 * Math.sin(Math.PI * ((u + 0.15) % 1))] };
  }
  let vk = 0;
  if (t >= KLIPP) { f = GLAD(); p = P({}); vk = L.ARMROR.inUt(t - T_VINK, D_VINK); if (t > T_VINK && t < T_VINK + D_VINK) [f, p] = L.ARMROR.vinka(f, p, t - T_VINK, vk); }
  // tunna armar: vinkningen har ett eget mål för högra handen, uppe och ute från axeln; armbågen böjs av IK:n (ner och ut)
  // vila: armarna hänger ner och lite ut, med en mjuk böj i armbågen. Vänstra handen följer riggens hand (till bollen) från strax före
  // upplockningen tills bollen är släppt; vinkningen blandas in från vilan med riggens in/ut-kurva.
  const VILA = { l: [-92, 122], r: [92, 122] }, sv = Math.sin(2 * Math.PI * 1.3 * (t - T_VINK));
  const kl_ = kl(0, 1, 1 - mjuk((t - T_UPP + 0.15) / 0.45) + mjuk((t - SLAPP - 0.35) / 0.6));
  const malR = [lerp(VILA.r[0], 118 + 26 * sv, vk), lerp(VILA.r[1], -100 + 8 * Math.abs(sv), vk)];
  // bollen: i figuren (på golvet, i handen, över lådan) tills den släpps; sedan det egna kortet som faller i lådan
  const iFig = t < SLAPP;
  if (iFig && !G.sak) L.sakIn(G, SAK); if (!iFig && G.sak) L.sakIn(G, null);
  L.rita(G, BL(f, t), liv(p, t));
  TA?.rita({ mal: { l: VILA.l, r: malR }, k: { l: kl_, r: 1 } });
  return iFig;
}
function bollen(t) {
  if (t < SLAPP) { bollKort.visible = false; return; }
  bollKort.visible = true;
  const [fx, fy] = LADA_O().fri, start = kort.localToWorld(new THREE.Vector3((fx - 512) * ENHET, (FOT - fy) * ENHET, 0));
  const slut = new THREE.Vector3(LADA.x - 0.06, 0.03, LADA.z + 0.02), u = kl(0, 1, (t - SLAPP) / FALL);
  bollKort.position.set(lerp(start.x, slut.x, u), lerp(start.y, slut.y, u * u), lerp(start.z, slut.z, u));   // faller: snabbare nedåt (u²)
  bollKort.rotation.y = Math.atan2(cam.position.x - bollKort.position.x, cam.position.z - bollKort.position.z);
}

// ---------- kamera: två lugna åkningar och ett klipp ----------
function kamera(t) {
  let v, r, y, mx, my;
  if (t < KLIPP) { const u = lugn(t / KLIPP);   // helbild: glider in och lite runt, Kanel och lådan i bild
    v = (-20 + 14 * u) * Math.PI / 180; r = lerp(4.0, 3.25, u); y = lerp(0.85, 0.74, u); mx = lerp(-0.18, -0.12, u); my = lerp(0.55, 0.5, u);
  } else { const u = lugn((t - KLIPP) / (DURATION - KLIPP));   // halvnära: kroppen fyller bilden, en långsam glidning in
    v = (10 + 5 * u) * Math.PI / 180; r = lerp(2.05, 1.85, u); y = 0.66; mx = 0.02; my = 0.56; }
  cam.position.set(KANEL.x + r * Math.sin(v), y, KANEL.z + r * Math.cos(v));
  cam.lookAt(KANEL.x + mx, my, KANEL.z);
  cam.updateMatrixWorld();
}

// ---------- efterbehandling ----------
// Tunn lins-oskärpa i ett pass: 64 prov i en Vogel-skiva. Oskärperadien (px i en 1080 hög bild) = cInf · |1 − fokus / avstånd|.
// Ett prov räknas bara om dess egen skiva når hit, och ett prov längre bort får aldrig breda ut sig mer än den här punktens egen
// skiva, så Kanel (i fokus) får en ren kant och bakgrunden läcker inte över henne.
class Linsoskarpa extends Pass {
  constructor() { super();
    this.u = { tBild: { value: null }, tDjup: { value: null }, nara: { value: 0.1 }, fjarran: { value: 40 }, fokus: { value: 3 }, cInf: { value: 13 },
      maxC: { value: 9 }, skala: { value: H / 1080 }, texel: { value: new THREE.Vector2(1 / W, 1 / H) } };
    this.q = new FullScreenQuad(new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `#include <packing>
        uniform sampler2D tBild, tDjup; uniform float nara, fjarran, fokus, cInf, maxC, skala; uniform vec2 texel; varying vec2 vUv;
        float avst(vec2 uv) { return -perspectiveDepthToViewZ(texture2D(tDjup, uv).x, nara, fjarran); }
        float coc(float d) { float c = cInf * (1.0 - fokus / max(d, 1e-3)); if (c < 0.0) c *= 1.3; return clamp(abs(c), 0.0, maxC) * skala; }
        void main() { vec4 c0 = texture2D(tBild, vUv); float d0 = avst(vUv), R = coc(d0);
          vec3 acc = c0.rgb; float w = 1.0;
          if (R > 0.4) for (int i = 0; i < 64; i++) { float rr = sqrt((float(i) + 0.5) / 64.0) * R, a = float(i) * 2.39996323;
            vec2 s = vUv + vec2(cos(a), sin(a)) * rr * texel; float ds = avst(s), rs = coc(ds); if (ds > d0) rs = min(rs, R);
            float k = clamp(rs - rr + 0.5, 0.0, 1.0); acc += texture2D(tBild, s).rgb * k; w += k; }
          gl_FragColor = vec4(acc / w, c0.a); }` }));
  }
  render(r, skriv, las) { this.u.tBild.value = las.texture; this.u.tDjup.value = las.depthTexture;
    r.setRenderTarget(this.renderToScreen ? null : skriv); this.q.render(r); }
}
// Gradering: en varm ton, lite lyft i skuggorna och en svag vinjett (högst 0,12, regeln säger 0,14), i linjärt ljus före sRGB.
class Gradering extends Pass {
  constructor() { super(); this.u = { tBild: { value: null } };
    this.q = new FullScreenQuad(new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `uniform sampler2D tBild; varying vec2 vUv;
        void main() { vec3 c = texture2D(tBild, vUv).rgb;
          c *= vec3(1.015, 1.0, 0.975);
          c = c + 0.012 * (1.0 - c);
          vec2 q = vUv - 0.5; q.x *= 1.25; float v = smoothstep(0.42, 0.85, length(q)); c *= 1.0 - 0.12 * v;
          gl_FragColor = vec4(c, 1.0); }` })); }
  render(r, skriv, las) { this.u.tBild.value = las.texture; r.setRenderTarget(this.renderToScreen ? null : skriv); this.q.render(r); }
}
const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
const komp = new EffectComposer(R, rt);
for (const r of [komp.renderTarget1, komp.renderTarget2]) { r.depthTexture = new THREE.DepthTexture(W, H); r.depthTexture.type = THREE.UnsignedIntType; }
const lins = new Linsoskarpa();
komp.addPass(new RenderPass(scen, cam));
komp.addPass(lins);
komp.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.16, 0.55, 0.93));
komp.addPass(new Gradering());
komp.addPass(new OutputPass());

// ---------- en bildruta ----------
const stillBild = new Image();
async function seek(t) {
  kamera(t);
  kort.rotation.y = Math.atan2(cam.position.x - KANEL.x, cam.position.z - KANEL.z);   // kortet mot kameran, bara kring y
  kort.updateMatrixWorld();
  const d = new THREE.Vector3().subVectors(KANEL, cam.position).dot(cam.getWorldDirection(new THREE.Vector3())) || 3;
  const s = 540 / (d * Math.tan(cam.fov * Math.PI / 360)) * ENHET;   // px i en 1920 bred bild per riggenhet
  kanel(t);
  bollen(t);
  // line boil 2,5 px i bild, ny brusbild 6 gånger/s (CLAUDE.md)
  $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1);
  $('boilStyrka').setAttribute('scale', (2.5 / s).toFixed(2));
  // vit kant: 3 px i bild (figurens png har redan sin inbakade kant), samma räkning som kant.uppdatera() men mot 3D-kamerans skala
  const ru = 3 / s;
  kantF.querySelector('feMorphology[result="d"]').setAttribute('radius', ru.toFixed(3));
  kantF.querySelector('feDisplacementMap').setAttribute('scale', (0.35 * ru).toFixed(3));
  const tu = kantF.querySelectorAll('feTurbulence'); tu[0].setAttribute('baseFrequency', (0.05 * s).toFixed(5)); tu[1].setAttribute('baseFrequency', (0.35 * s).toFixed(5));
  // kortets ljus: solens riktning i kortets plan (x åt höger på kortet, y upp); sidan tonas mest, toppen lite
  const hoger = new THREE.Vector3(Math.cos(kort.rotation.y), 0, -Math.sin(kort.rotation.y));
  KU.uSol.value.set(SOLRIKT.dot(hoger), SOLRIKT.y * 0.45).normalize();
  KU.uSida.value = 1.5; KU.uKant.value = 0.45;
  KU.uVit.value = 7 + ru + 2.5 / s;   // inbakad kant (ca 7 enheter) + kant.js-kanten + boilen
  KU.uBand.value = 3 / s;             // den varma kanten: ca 3 px i bild
  KU.uSteg.value = (KU.uVit.value + KU.uBand.value) / 16;
  // riggen → bild → textur
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString($('kort'))], { type: 'image/svg+xml' }));
  stillBild.src = url; await stillBild.decode(); URL.revokeObjectURL(url);
  kortCtx.clearRect(0, 0, VB.w, VB.h); kortCtx.drawImage(stillBild, 0, 0, VB.w, VB.h); kortTex.needsUpdate = true;
  lins.u.fokus.value = d;
  komp.render();
}

// Ljudet: Malins repliker ur röstbanken (037:s "Hurra, bra jobbat!" och tittut "hej då") och ett mjukt duns när bollen landar.
// Malin kommer 0,6 s efter att bollen landat, och hej då mitt i vinkningen (som 037). Ingen ny musik eller nya röster.
const RB = 'assets/ljud/roster/';
window.LJUD = [
  { t: LANDAR - 0.02, fil: 'assets/ljud/effekter/duns/duns-1.m4a', vol: 0.5 },
  { t: LANDAR + 0.6, fil: RB + 'kaninen-stadar/hurra-bra-jobbat.m4a', vol: 2.5 },
  { t: T_VINK + 1.0, fil: RB + 'tittut/kanin-hejda.m4a', vol: 2.5 },
];
window.DURATION = DURATION;
window.ready = (async () => {
  await byggRum(); await byggKanel();
  await seek(+(new URLSearchParams(location.search).get('t') || 0));
  window.seek = seek;
  return true;
})();
