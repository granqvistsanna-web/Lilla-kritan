// Julkalenderns intro i 3D, prov (2026-11-24). Samma intro som lucka.js (liggande), med samma tider och repliker, men byggt i
// three.js med det vi lärt oss i lekrummet: tavlan står som ett tjockt pepparkakskort i snön, luckorna är riktiga dörrar på
// gångjärn (de tidigare dagarna står öppna), Kanel är det platta kortet mot kameran med volym, skugga och kontaktskugga, och
// snön faller i tre djup (den närmaste suddig framför kameran).
// Effekterna: bärens små ljus i girlangen tindrar, glitter i snön, dagens lucka får en lysande guldram, vickar två gånger och
// sprider krit-gnistor när kaninen pekar, och när den öppnas strömmar varmt ljus och gnistor ut medan kameran glider in.
// Sist fyller öppningen bilden exakt med innehållets första bild (forst.png), så att filmen kan klippas in där (skarva.sh).
//   ?lucka=24 (standard)  ?inne=<bild bakom luckan>
// Allt räknas ur t (window.seek), ingen requestAnimationFrame-tid.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const Q = new URLSearchParams(location.search), SNABB = Q.has('snabb');
const N = +(Q.get('lucka') || 24), INNE = Q.get('inne') || '/produktion/youtube/shorts/jul/24-bjornen-vaknar-pa-julafton/forst.png';
const W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080;
const $ = id => document.getElementById(id);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => { k = kl(0, 1, k); return k * k * (3 - 2 * k); };
const lugn = k => 0.5 - 0.5 * Math.cos(Math.PI * kl(0, 1, k));
const fas = ([a, b], t) => kl(0, 1, (t - a) / (b - a));
const slumpF = (i, n) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453 % 1 + 1) % 1;   // samma som lucka.js

// ---------- tiderna, exakt som lucka.js (liggande) ----------
const ROST = 'assets/ljud/roster/jul';
const langd = async (fil, reserv) => {   // m4a-längd ur mvhd, som lucka.js
  const r = await fetch('/' + fil).catch(() => null); if (!r?.ok) return reserv;
  const b = new DataView(await r.arrayBuffer());
  for (let i = 0; i < b.byteLength - 32; i++) if (b.getUint32(i) === 0x6d766864) {
    const v1 = b.getUint8(i + 4) === 1, o = i + (v1 ? 24 : 16);
    return (v1 ? Number(b.getBigUint64(o + 4)) : b.getUint32(o + 4)) / b.getUint32(o); }
  return reserv;
};
let VINK, LATE, FRAGA, PEK, Z0, OPP0, OPP1, OPPEN, dD;
async function tider() {
  const harJust = await langd(`${ROST}/just-det-${N}.m4a`, 0);
  const [dK, d2, dJ, dO] = await Promise.all([langd('assets/ljud/roster/tittut/kanin-hej.m4a', 1.4), langd(`${ROST}/vilken-dag.m4a`, 1.7),
    harJust || langd(`${ROST}/lucka-${N}.m4a`, 1.3), langd(`${ROST}/nu-oppnar-vi.m4a`, 2.7)]);
  dD = d2; VINK = 0.3; LATE = VINK + 0.4 + dK + 0.1; FRAGA = LATE + 0.85 + 0.45; PEK = FRAGA + dD + 1.5;
  Z0 = PEK + 0.5 + dJ + 0.3; OPP1 = Z0 + 0.4 + dO; OPP0 = OPP1 - 0.8;
  OPPEN = Math.ceil(OPP1 * 30) / 30;   // video.js: första helt öppna bildrutan, där innehållet klipps in
}

// ---------- renderare ----------
const R = new THREE.WebGLRenderer({ canvas: $('bild'), antialias: false, preserveDrawingBuffer: true });
R.setPixelRatio(1); R.setSize(W, H, false);
R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.NoToneMapping;
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene();
scen.background = new THREE.Color('#2468c9');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 60);

const bild = src => new Promise((ok, fel) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fel; i.src = src; });
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const tex = (c, rep = [1, 1]) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); t.anisotropy = 8; return t; };
let fro = 7;
const slump = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
let KORNC;
async function korn() {   // kritkorn ur papper-textur.png, som lekrummet
  const i = await bild('/verktyg/papper-textur.png'), c = canvas(1024, 1024), x = c.getContext('2d');
  x.drawImage(i, 0, 0, 1024, 1024); const d = x.getImageData(0, 0, 1024, 1024);
  for (let j = 0; j < d.data.length; j += 4) { const v = 255 * kl(0.86, 1, 0.95 + (d.data[j] - 128) / 255 * 0.5); d.data[j] = d.data[j + 1] = d.data[j + 2] = v; }
  x.putImageData(d, 0, 0); return c;
}
const kornPa = (x, w, h, ruta = 256) => { x.globalCompositeOperation = 'multiply';
  for (let i = 0; i < w; i += ruta) for (let j = 0; j < h; j += ruta) x.drawImage(KORNC, i, j, ruta, ruta); x.globalCompositeOperation = 'source-over'; };
const platt = (farg, o = {}) => { const c = canvas(256, 256), x = c.getContext('2d'); x.fillStyle = farg; x.fillRect(0, 0, 256, 256); kornPa(x, 256, 256);
  const t = tex(c, o.rep || [2, 2]); return new THREE.MeshLambertMaterial({ map: t, emissiveMap: t, emissive: new THREE.Color(o.egen ?? 0.4, o.egen ?? 0.4, o.egen ?? 0.4) }); };

// ---------- tavlan och luckorna (mått ur lucka.js, i tavlans bildpixlar) ----------
const TAVLA = '/assets/rekvisita/kalendertavla/cut/kalendertavla.png', LUCKA = '/assets/rekvisita/kalenderlucka/kalenderlucka.jpeg';
const BW = 2.37, PX = BW / 2501, BH = 1520 * PX, SANK = 0.04;   // tavlan 2,37 m bred (Kanel 1 m, som i 2D), 4 cm ner i snön
const MUR = { 1: [0, 0, 2], 2: [2, 0, 1], 3: [3, 0, 1], 4: [4, 0, 1], 5: [5, 0, 2], 6: [7, 0, 1], 7: [2, 1, 1], 8: [3, 1, 2], 9: [7, 1, 1],
  10: [0, 2, 1], 11: [1, 2, 2], 12: [5, 2, 1], 13: [6, 2, 2], 14: [0, 3, 1], 15: [3, 3, 1], 16: [4, 3, 2], 17: [0, 4, 2],
  18: [2, 4, 1], 19: [3, 4, 1], 20: [2, 5, 1], 21: [3, 5, 1], 22: [4, 5, 1], 23: [5, 5, 1], 24: [6, 4, 2] };
const MG = 21, MH = (918 - 60 - 5 * MG * 9 / 16) / 6, MW = MH * 16 / 9, MX = 142 + (2204 - 8 * MW - 7 * MG) / 2;
const varld = (px, py) => [(px - 2501 / 2) * PX, BH - SANK - py * PX];
const ruta = n => { const [k, r, s] = MUR[n], w = s * MW + (s - 1) * MG, x = MX + k * (MW + MG), y = 492 + r * (MH + MG * 9 / 16);
  const [x0, y1] = varld(x, y), [x1, y0] = varld(x + w, y + w * 9 / 16); return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }; };
const BAR = [[1791, 297], [1434, 310], [630, 316], [236, 338], [1002, 337], [2188, 343], [471, 383], [2029, 383], [1276, 387]];   // girlangens bär (mätta)
const ZF = 0.022, DT = 0.008, E = 0.006, OPPEN_V = 100 * Math.PI / 180;   // dörrens baksida 22 mm framför tavlan, 8 mm tjock, 6 mm över karmen; öppen 100°
const SIFFRA = ['M50 10 C15 10 10 60 10 80 C10 120 20 150 50 150 C80 150 90 120 90 80 C90 40 85 10 50 10 Z', 'M30 42 L60 10 L60 150',
  'M15 45 C15 0 85 0 85 45 C85 80 30 110 12 150 L90 150', 'M15 30 C30 0 85 5 82 42 C80 70 50 75 40 76 C60 76 90 85 88 115 C85 155 25 158 12 125',
  'M70 150 L70 10 L10 105 L92 105', 'M82 10 L25 10 L18 70 C40 55 88 60 88 105 C88 155 30 160 12 128',
  'M78 15 C40 20 12 60 12 105 C12 160 88 160 88 110 C88 65 30 65 14 100', 'M12 10 L88 10 L40 150',
  'M50 75 C10 60 15 10 50 10 C85 10 90 60 50 75 C5 92 8 150 50 150 C92 150 95 92 50 75 Z', 'M86 60 C80 100 14 95 14 52 C14 0 86 5 86 60 C88 100 75 140 30 150'];
function dorrBild(n, luckIm, CW) {   // som lucka.js dorrBild (liggande), i en canvas CW × CW·9/16
  const c = canvas(CW, CW * 9 / 16), x = c.getContext('2d'), k = CW / 1920;
  x.drawImage(luckIm, -6 * k, -3.4 * k, (1920 + 12) * k, (1080 + 6.8) * k);
  const s = String(n), sk = (n > 9 ? 3 : 3.3) * k;
  x.save(); x.translate(1920 * 0.44 * k, 1080 * 0.5 * k); x.scale(sk, sk); x.translate(-(s.length * 130 - 30) / 2, -80);
  x.strokeStyle = '#FBF7EE'; x.lineWidth = 28; x.lineCap = x.lineJoin = 'round';
  [...s].forEach((d, i) => { x.save(); x.translate(i * 130, 0); x.stroke(new Path2D(SIFFRA[d])); x.restore(); });
  x.restore(); return c;
}
function inreBild(w, h) {   // insidan bakom en öppnad lucka: papper med mjuk skugga mot kanterna
  const c = canvas(w, h), x = c.getContext('2d'); x.fillStyle = '#F1E7D2'; x.fillRect(0, 0, w, h); kornPa(x, w, h, 128);
  for (const [a, b, c2, d] of [[0, 0, 0, 1], [0, 0, 1, 0], [w, 0, -1, 0], [0, h, 0, -1]]) {
    const g = x.createLinearGradient(a, b, a + c2 * w * 0.18, b + d * h * 0.3); g.addColorStop(0, 'rgba(120,80,50,0.28)'); g.addColorStop(1, 'rgba(120,80,50,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h); }
  return c;
}
let tavla, DORR = {}, ramM, ramG, inneM, glodM, varmLjus, berM = [];
async function byggTavla() {
  const [tim, lim, iim] = await Promise.all([bild(TAVLA), bild(LUCKA), bild(INNE)]);
  // framsidan: tavlans bild, lite eget ljus så att färgerna blir som i plattan
  const tt = new THREE.Texture(tim); tt.colorSpace = THREE.SRGBColorSpace; tt.anisotropy = 8; tt.needsUpdate = true;
  const plan = new THREE.PlaneGeometry(BW, BH).translate(0, BH / 2 - SANK, 0);
  tavla = new THREE.Mesh(plan, new THREE.MeshLambertMaterial({ map: tt, emissiveMap: tt, emissive: new THREE.Color(0.2, 0.2, 0.2), alphaTest: 0.5 }));
  tavla.castShadow = tavla.receiveShadow = true;
  tavla.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: tt, alphaTest: 0.5 });
  scen.add(tavla);
  // tjockleken (Sanna 24/11: tavlan behöver tjocklek): en massiv pepparkaksplatta, 14 cm, med rundade kanter (1,8 cm), formad som
  // tavlans kontur (mätt i bilden: x 14–2475, botten 1514, nedre hörnen ca 190 px, de övre under snön). Bilden ligger på framsidan.
  const DJ = 0.16, RB = 0.02, [kx0, ky0] = varld(14, 120), [kx1, ky1] = varld(2475, 1514), rn = 190 * PX, ru = 110 * PX;
  const platta = new THREE.Shape(), a0 = kx0 + RB, a1 = kx1 - RB, b0 = ky1 + RB, b1 = ky0 - RB;
  platta.moveTo(a0 + rn, b0); platta.lineTo(a1 - rn, b0); platta.quadraticCurveTo(a1, b0, a1, b0 + rn); platta.lineTo(a1, b1 - ru);
  platta.quadraticCurveTo(a1, b1, a1 - ru, b1); platta.lineTo(a0 + ru, b1); platta.quadraticCurveTo(a0, b1, a0, b1 - ru); platta.lineTo(a0, b0 + rn); platta.quadraticCurveTo(a0, b0, a0 + rn, b0);
  const sidaC = canvas(512, 512), scx = sidaC.getContext('2d'); scx.fillStyle = '#b97440'; scx.fillRect(0, 0, 512, 512); kornPa(scx, 512, 512);
  const sidaT = tex(sidaC, [6, 6]);
  const kropp = new THREE.Mesh(new THREE.ExtrudeGeometry(platta, { depth: DJ - 2 * RB, bevelEnabled: true, bevelThickness: RB, bevelSize: RB, bevelSegments: 5, curveSegments: 16 }),
    new THREE.MeshLambertMaterial({ map: sidaT, emissiveMap: sidaT, emissive: new THREE.Color(0.2, 0.2, 0.2) }));
  kropp.position.z = -DJ + RB - 0.002; kropp.castShadow = kropp.receiveShadow = true; scen.add(kropp);
  snoTak(tim);
  // luckorna
  const sidaM = platt('#b3261a', { egen: 0.2 }), bakM = platt('#efe2c8', { egen: 0.2 }), karmM = platt('#e2c79c', { egen: 0.2 });   // dörrens baksida är kartong, som en riktig kalender
  for (let n = 1; n <= 24; n++) {
    const r = ruta(n), idag = n === N;
    // insidan och karmen (fyra smala lister runt öppningen, i springan mellan luckorna)
    const inne = new THREE.Mesh(new THREE.PlaneGeometry(r.w, r.h), idag
      ? (inneM = new THREE.MeshBasicMaterial({ map: Object.assign(new THREE.Texture(iim), { colorSpace: THREE.SRGBColorSpace, needsUpdate: true, anisotropy: 8 }), toneMapped: false }))
      : new THREE.MeshLambertMaterial({ map: tex(inreBild(256, 144)), emissive: new THREE.Color(0.12, 0.12, 0.12) }));
    inne.position.set(r.cx, r.cy, 0.003); inne.receiveShadow = !idag; scen.add(inne);
    for (const [bx, by, px, py] of [[r.w + 2 * E, E, r.cx, r.y1 + E / 2], [r.w + 2 * E, E, r.cx, r.y0 - E / 2], [E, r.h, r.x0 - E / 2, r.cy], [E, r.h, r.x1 + E / 2, r.cy]]) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(bx, by, ZF), karmM); m.position.set(px, py, ZF / 2); m.castShadow = m.receiveShadow = true; scen.add(m); }
    // dörren: gångjärnet i vänstra bakre kanten, öppnas mot kameran åt vänster
    const fram = tex(dorrBild(n, lim, idag ? 1920 : 768)); fram.wrapS = fram.wrapT = THREE.ClampToEdgeWrapping; fram.repeat.set(1, 1);
    const framM = new THREE.MeshLambertMaterial({ map: fram, emissiveMap: fram, emissive: new THREE.Color(0.2, 0.2, 0.2) });
    const g = new RoundedBoxGeometry(r.w + 2 * E, r.h + 2 * E, DT, 2, 0.0025).translate((r.w + 2 * E) / 2, 0, DT / 2);
    const m = new THREE.Mesh(g, [sidaM, sidaM, sidaM, sidaM, framM, bakM]); m.castShadow = m.receiveShadow = true;
    const ga = new THREE.Group(); ga.position.set(r.x0 - E, r.cy, ZF); ga.add(m); scen.add(ga);
    ga.rotation.y = n < N ? -OPPEN_V : 0;
    DORR[n] = { ga, r };
  }
  // guldramen kring dagens lucka (lyser, så att bloom tar den), lite framför dörren
  const r = ruta(N), b = 0.018, o = 0.012, rr = 0.02, form = (w, h, rad) => { const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + rad, y); s.lineTo(x + w - rad, y); s.quadraticCurveTo(x + w, y, x + w, y + rad); s.lineTo(x + w, y + h - rad); s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    s.lineTo(x + rad, y + h); s.quadraticCurveTo(x, y + h, x, y + h - rad); s.lineTo(x, y + rad); s.quadraticCurveTo(x, y, x + rad, y); return s; };
  const yt = form(r.w + 2 * (o + b), r.h + 2 * (o + b), rr + b); yt.holes.push(form(r.w + 2 * o, r.h + 2 * o, rr));
  ramM = new THREE.MeshBasicMaterial({ color: new THREE.Color('#F6C531').multiplyScalar(1.35), transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
  ramG = new THREE.Mesh(new THREE.ShapeGeometry(yt, 12), ramM); ramG.position.set(r.cx, r.cy, ZF + DT + 0.004); scen.add(ramG);
  // ljuset inifrån: en varm glöd framför öppningen (adderas) och ett punktljus som lyser på dörrens insida och tavlan
  glodM = new THREE.MeshBasicMaterial({ map: tex(glodBild()), color: new THREE.Color('#ffc46a'), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const glod = new THREE.Mesh(new THREE.PlaneGeometry(r.w * 2.2, r.h * 2.6), glodM); glod.position.set(r.cx, r.cy, 0.03); scen.add(glod);
  varmLjus = new THREE.PointLight('#ffc070', 0, 1.6, 1.6); varmLjus.position.set(r.cx, r.cy, 0.12); scen.add(varmLjus);
  // girlangens bär lyser och tindrar svagt
  const bt = tex(glodBild());
  for (const [bx, by] of BAR) { const [x, y] = varld(bx, by), mm = new THREE.SpriteMaterial({ map: bt, color: new THREE.Color('#ffc066').multiplyScalar(1.3), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false });
    const s = new THREE.Sprite(mm); s.position.set(x, y, 0.012); s.scale.set(0.13, 0.13, 1); scen.add(s); berM.push(mm); }
}
// Snötaket (Sanna 24/11: putsa snön och ge den tjocklek): bildens snö blir en pösig 3D-kudde ovanpå tavlan, som hänger ut lite
// fram och bak. Konturen mäts i bilden (de ljusa pixlarna överst i varje kolumn) och dras in med rundningen, så att den behåller
// bildens form.
function snoTak(tim) {
  const c = canvas(1250, 760), x = c.getContext('2d'); x.drawImage(tim, 0, 0, 1250, 760);
  const d = x.getImageData(0, 0, 1250, 760).data, ar = (i, j) => d[(j * 1250 + i) * 4 + 3], lj = (i, j) => { const k = (j * 1250 + i) * 4; return (d[k] + d[k + 1] + d[k + 2]) / 765; };
  const topp = [], botten = [], R2 = 0.022;
  for (let i = 4; i <= 1246; i += 6) { let j = 0; while (j < 300 && ar(i, j) < 128) j++; if (j >= 300) continue;
    let b = j; while (b < 380 && lj(i, b) > 0.8 && ar(i, b) > 128) b++;
    if (b - j < 8) continue;
    const [wx, wy0] = varld(i * 2, j * 2), [, wy1] = varld(i * 2, b * 2); topp.push([wx, wy0 - 0.004]); botten.push([wx, wy1 + R2]); }   // toppen täcker den målade snöns kant (rundningen sticker ut 2 cm)
  const jamn = A => A.map(([x], k) => [x, A.slice(Math.max(0, k - 4), k + 5).reduce((s, q) => s + q[1], 0) / (Math.min(A.length, k + 5) - Math.max(0, k - 4))]);   // mjuk kontur, inga taggar
  topp.splice(0, topp.length, ...jamn(topp)); botten.splice(0, botten.length, ...jamn(botten));
  const form = new THREE.Shape(); form.moveTo(...topp[0]);
  topp.forEach(q => form.lineTo(...q)); form.lineTo(topp.at(-1)[0], botten.at(-1)[1]);
  [...botten].reverse().forEach(q => form.lineTo(...q));
  const djup = 0.14, g = new THREE.ExtrudeGeometry(form, { depth: djup, bevelEnabled: true, bevelThickness: 0.032, bevelSize: R2, bevelSegments: 6, curveSegments: 8 });
  const t = tex(snoBild(512, 512, '#fbfaff'), [2, 1]); t.repeat.set(1.2, 1.2);
  const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: t, emissiveMap: t, emissive: new THREE.Color(0.3, 0.3, 0.32) }));
  m.position.z = -0.13;   // från bakom plattans baksida (−0,16) till ca 4 cm framför framsidan
  m.castShadow = m.receiveShadow = true; scen.add(m);
}
function glodBild() {
  const c = canvas(256, 256), x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256); return c;
}
function stjarnBild() {   // krit-gnista: en fyruddig stjärna, gul med vit mitt
  const c = canvas(128, 128), x = c.getContext('2d');
  x.translate(64, 64); x.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? 13 : 58; x.lineTo(rr * Math.cos(a), rr * Math.sin(a)); }
  x.closePath(); x.fillStyle = '#ffd34d'; x.fill(); x.scale(0.45, 0.45); x.fillStyle = '#fffbe8'; x.fill(); return c;
}

// ---------- snön, kullarna och himlen ----------
function snoBild(w, h, farg = '#fdfaf5') {
  const c = canvas(w, h), x = c.getContext('2d'); x.fillStyle = farg; x.fillRect(0, 0, w, h);
  x.lineCap = 'round';
  for (let n = 0; n < w * h / 220; n++) { const px = slump() * w, py = slump() * h, l = 10 + slump() * 18, a = -0.35 + (slump() - 0.5) * 0.5;
    x.strokeStyle = slump() < 0.5 ? 'rgba(170,180,230,0.05)' : 'rgba(255,255,255,0.08)'; x.lineWidth = 3 + slump() * 4;
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + l * Math.cos(a), py + l * Math.sin(a)); x.stroke(); }
  kornPa(x, w, h, 256); return c;
}
const snoM = (rep, farg) => { const t = tex(snoBild(512, 512, farg), rep); return new THREE.MeshLambertMaterial({ map: t, emissiveMap: t, emissive: new THREE.Color(0.26, 0.26, 0.26) }); };
const klot = (r, pos, sk, m) => { const k = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 24), m); k.position.set(...pos); k.scale.set(...sk); k.receiveShadow = true; scen.add(k); return k; };
let snoPunkter, glittPunkter;
const SNO_U = { t: { value: 0 }, fokus: { value: 4 }, alfa: { value: 1 }, skala: { value: H / 1080 } };
async function byggVarld() {
  KORNC = await korn();
  // himlen: Vinterkvällen utan stuga och gran (Sanna 2026-11-17), långt bak, olyst
  const him = await bild('/assets/bakgrunder/vinterkvallen-tom/vinterkvallen-tom.jpeg'), ht = new THREE.Texture(him); ht.colorSpace = THREE.SRGBColorSpace; ht.needsUpdate = true;
  const hm = new THREE.Mesh(new THREE.PlaneGeometry(34, 34 * 1116 / 2000), new THREE.MeshBasicMaterial({ map: ht, toneMapped: false }));
  hm.position.set(0, 34 * 1116 / 2000 * (0.5 - 0.76) + 0.9, -20); scen.add(hm);   // bildens snölinje (76 % ner) strax över marken
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), snoM([14, 10])); mark.rotation.x = -Math.PI / 2; mark.position.z = -0.5; mark.receiveShadow = true; scen.add(mark);
  // mjuka kullar bakom (parallax) och en driva längs tavlans fot
  const kulle = snoM([3, 2], '#eef0fb');   // kullarna lite lavendel, så att de syns mot marken
  klot(1, [-4.2, -1.4, -7.5], [4.2, 1.9, 2.4], kulle); klot(1, [4.6, -1.2, -9], [5, 1.85, 2.6], kulle); klot(1, [0.6, -2.2, -12], [7, 2.5, 2.5], kulle);
  klot(1, [0, -0.02, 0.06], [1.45, 0.09, 0.22], snoM([4, 1]));
  klot(1, [-2.0, -0.05, 2.0], [0.7, 0.3, 0.45], snoM([2, 1]));   // förgrunden till vänster, suddig
  // snön som faller: tre djup, samma flingor varje gång; inte där tavlan, luckorna och Kanel står (inget går genom något)
  const pos = [], fas_ = [], str = [];
  for (let i = 0; pos.length / 3 < 900 && i < 5000; i++) {
    const x = (slumpF(i, 1) - 0.5) * 12, z = 5 - slumpF(i, 2) * 13, y = slumpF(i, 3) * 4.2;
    if (Math.abs(x) < BW / 2 + 0.1 && z > -0.12 && z < 0.62) continue;
    if (x > 0.6 && x < 2.5 && z > 0.1 && z < 0.85) continue;
    pos.push(x, y, z); fas_.push(slumpF(i, 4) * 6.28, 0.25 + 0.2 * slumpF(i, 5)); str.push(0.012 + 0.014 * slumpF(i, 6)); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('fas', new THREE.Float32BufferAttribute(fas_, 2)); g.setAttribute('str', new THREE.Float32BufferAttribute(str, 1));
  snoPunkter = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms: SNO_U, transparent: true, depthWrite: false,
    vertexShader: `uniform float t, fokus, skala; attribute vec2 fas; attribute float str; varying float vA, vMjuk;
      void main() { vec3 p = position; p.y = mod(p.y - fas.y * t, 4.2); p.x += 0.12 * sin(t * 0.9 + fas.x); p.z += 0.08 * sin(t * 0.7 + 2.0 * fas.x);
        vec4 mv = modelViewMatrix * vec4(p, 1.0); float d = -mv.z, px = str * 1.0 / d * 1080.0 / (2.0 * 0.2679);
        float coc = 22.0 * abs(1.0 - fokus / max(d, 0.01));   // samma oskärpa som linsen, inbakad i flingan
        gl_PointSize = (px + min(coc, 40.0)) * skala; vMjuk = clamp(coc / (px + coc + 0.001), 0.0, 0.9);
        vA = smoothstep(0.0, 0.12, p.y) * smoothstep(0.3, 0.7, d) * mix(1.0, 0.35, vMjuk);
        gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float alfa; varying float vA, vMjuk;
      void main() { float r = length(gl_PointCoord - 0.5) * 2.0; float a = 1.0 - smoothstep(1.0 - max(vMjuk, 0.25), 1.0, r);
        gl_FragColor = vec4(1.0, 1.0, 1.0, a * vA * alfa * 0.92); }` }));
  snoPunkter.frustumCulled = false; scen.add(snoPunkter);
  // glitter i snön: små punkter på marken som blänker till en i taget
  const gp = [], gf = [];
  for (let i = 0; i < 260; i++) { const x = (slumpF(i, 11) - 0.5) * 9, z = 3.6 - slumpF(i, 12) * 6;
    if (Math.abs(x) < BW / 2 + 0.05 && z > -0.1 && z < 0.3) continue; gp.push(x, 0.004, z); gf.push(slumpF(i, 13) * 40, 0.6 + slumpF(i, 14)); }
  const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(gp, 3)); gg.setAttribute('fas', new THREE.Float32BufferAttribute(gf, 2));
  glittPunkter = new THREE.Points(gg, new THREE.ShaderMaterial({ uniforms: SNO_U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `uniform float t, skala; attribute vec2 fas; varying float vI;
      void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); float d = -mv.z;
        vI = pow(max(0.0, sin(t * fas.y * 2.2 + fas.x)), 24.0);
        gl_PointSize = (2.0 + 14.0 * vI) * skala * clamp(2.5 / d, 0.4, 1.6); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying float vI; void main() { vec2 q = abs(gl_PointCoord - 0.5) * 2.0; float a = max(1.0 - smoothstep(0.0, 0.2, q.y) - q.x, 1.0 - smoothstep(0.0, 0.2, q.x) - q.y);
      a = max(a, 1.0 - smoothstep(0.0, 0.35, length(q))); gl_FragColor = vec4(vec3(1.4, 1.35, 1.2) * a * vI, 1.0); }` }));
  glittPunkter.frustumCulled = false; scen.add(glittPunkter);
}

// ---------- ljuset ----------
// Mysigt (Sanna 24/11): låg, gyllene eftermiddagssol med långa varma skuggor, lavendel i skuggorna och ett varmt sken från
// girlangens lampor över tavlan.
scen.add(new THREE.HemisphereLight('#f8f6ff', '#c6c0ea', 1.2));
const sol = new THREE.DirectionalLight('#ffe0b4', 1.6);
sol.position.set(-4.2, 3.4, 3.6); sol.target.position.set(0.3, 0, 0);
sol.castShadow = true; sol.shadow.mapSize.set(4096, 4096); sol.shadow.radius = 5; sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.006;
Object.assign(sol.shadow.camera, { left: -3.2, right: 3.4, top: 3, bottom: -2.2, near: 0.5, far: 16 });
scen.add(sol, sol.target);
const mys = new THREE.PointLight('#ffb866', 0.9, 3.2, 1.5); mys.position.set(0.1, 1.45, 0.75); scen.add(mys);   // girlangens varma sken
const SOLRIKT = new THREE.Vector3().subVectors(sol.position, sol.target.position).normalize();

// ---------- Kanel som kort (som lekrummet) ----------
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, FOT = 947, ENHET = 1 / FOT, LYFT = 0.014;
const KANEL = new THREE.Vector3(1.45, 0, 0.42);
let L, G, BL, kortCanvas, kortCtx, kortTex, kort, kantF;
const KU = { uSol: { value: new THREE.Vector2(-1, 0) }, uSida: { value: 0.0 }, uFigC: { value: (512 - VB.x) / VB.w }, uHalv: { value: 330 / VB.w },
  uEnhUv: { value: new THREE.Vector2(1 / VB.w, 1 / VB.h) }, uSteg: { value: 1.5 }, uVit: { value: 12 }, uBand: { value: 5 }, uKant: { value: 0.0 }, uVol: { value: 1.0 }, uVolR: { value: 110 } };
function kortSkugga(m) {   // ljustoning och volym, oförändrad från lekrummet (runda 6)
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, KU);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      uniform vec2 uSol, uEnhUv; uniform float uSida, uFigC, uHalv, uSteg, uVit, uBand, uKant, uVol, uVolR;`)
      .replace('#include <envmap_fragment>', `#ifdef USE_MAP
      { float t = clamp((vMapUv.x - uFigC) / uHalv, -1.0, 1.0) * sign(uSol.x) * smoothstep(0.0, 0.35, abs(uSol.x));
        float mork = smoothstep(-0.15, 0.95, -t);
        outgoingLight *= mix(vec3(1.0), vec3(0.89, 0.875, 0.97), mork * uSida);
        vec4 c0 = texture2D(map, vMapUv); float vit = step(0.8, min(c0.r, min(c0.g, c0.b)));
        { vec2 g = vec2(0.0); float h = 0.0, n = 0.0;
          for (int r = 1; r <= 5; r++) for (int k = 0; k < 16; k++) { float a = float(k) * 0.3927 + float(r) * 0.71, rr = float(r) / 5.0;
            vec2 dir = vec2(cos(a), sin(a)); float al = texture2D(map, vMapUv + dir * rr * uVolR * uEnhUv).a;
            g += dir * al * rr; h += al; n += 1.0; }
          h /= n; vec3 N = normalize(vec3(-g * 0.06, 1.0)), Ls = normalize(vec3(uSol * 0.8, 0.6));
          float lam = dot(N, Ls) - Ls.z, ao = smoothstep(0.35, 0.85, h);
          float spec = pow(max(dot(reflect(-Ls, N), vec3(0.0, 0.0, 1.0)), 0.0), 18.0) * (1.0 - ao * 0.6);
          float ljus = smoothstep(0.62, 0.8, min(c0.r, min(c0.g, c0.b))), w = uVol * step(0.5, c0.a) * (1.0 - ljus);
          outgoingLight *= clamp(1.0 + w * (0.9 * lam - 0.14 * (1.0 - ao)), 0.84, 1.2);
          outgoingLight += vec3(1.0, 0.93, 0.82) * spec * w * 0.18; }
        float d = 99.0;
        for (int i = 1; i <= 18; i++) { float u = float(i) * uSteg; if (texture2D(map, vMapUv + uSol * uEnhUv * u).a < 0.5) { d = u; break; } }
        float kant = (1.0 - vit) * step(0.5, c0.a) * (1.0 - smoothstep(uVit, uVit + uBand, d)) * step(d, 98.0);
        outgoingLight += vec3(0.95, 0.56, 0.22) * kant * uKant; }
      #endif
      #include <envmap_fragment>`);
  };
  m.customProgramCacheKey = () => 'lk-kort2';
  return m;
}
function klickBit() {
  const c = canvas(256, 256), x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgb(150,150,180)'); g.addColorStop(0.45, 'rgb(205,205,225)'); g.addColorStop(1, 'rgb(255,255,255)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256); return c;
}
async function byggKanel() {
  L = await v2rigg('kaninen-kanel');
  G = L.figur(512, FOT, 1, $('figurer'));
  G.querySelector('.skugga')?.setAttribute('display', 'none');
  await Promise.all([...$('kort').querySelectorAll('image')].map(async im => {
    const b = await (await fetch(im.getAttribute('href'))).blob();
    im.setAttribute('href', await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }));
  }));
  window.kant.lagg(G); kantF = $('defs').lastElementChild;
  BL = skapaBlinka(5);
  kortCanvas = canvas(VB.w, VB.h); kortCtx = kortCanvas.getContext('2d');
  kortTex = new THREE.CanvasTexture(kortCanvas); kortTex.colorSpace = THREE.SRGBColorSpace; kortTex.anisotropy = 8;
  const km = kortSkugga(new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), transparent: true, alphaTest: 0.02, side: THREE.DoubleSide }));
  const g = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
  g.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);
  kort = new THREE.Mesh(g, km); kort.castShadow = true; kort.receiveShadow = true;
  kort.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
  kort.position.copy(KANEL); kort.position.y = LYFT; scen.add(kort);
  const klick = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex(klickBit()), depthWrite: false,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor, polygonOffset: true, polygonOffsetFactor: -4 }));
  klick.rotation.x = -Math.PI / 2; klick.scale.set(0.95, 0.42, 1); klick.position.set(KANEL.x, 0.006, KANEL.z + 0.02); klick.renderOrder = 1; scen.add(klick);
}
// I kortets plan, riggens enheter (y nedåt): vektorn från en punkt på Kanel (riggens x, y) till en punkt i världen
function iKortet(rx, ry, mal) {
  const fran = kort.localToWorld(new THREE.Vector3((rx - 512) * ENHET, (FOT - ry) * ENHET, 0)), d = new THREE.Vector3().subVectors(mal, fran);
  const hoger = new THREE.Vector3(Math.cos(kort.rotation.y), 0, -Math.sin(kort.rotation.y));
  return [d.dot(hoger) / ENHET, -d.y / ENHET];
}
// Kanel som i lucka.js: vinkar hej, söker längs tavlan medan barnet tänker, pekar på dagens lucka med ett litet skutt
function kanel(t) {
  const r = ruta(N), mitt = new THREE.Vector3(r.cx, r.cy, ZF + DT), [ax, ay] = L.RIGG['arm-l'];
  const mot = iKortet(ax, ay, mitt), vinkel = Math.atan2(mot[1], mot[0]) * 180 / Math.PI;
  const sikte = kl(20, 125, (vinkel + 360) % 360 - 115 - 16), blick = mot.map(v => 7 * v / Math.hypot(...mot));
  const pek = mjuk((t - PEK) / 0.4) * (1 - mjuk((t - Z0) / 0.3));
  const hej = mjuk(Math.min((t - VINK) / 0.35, (LATE + 0.85 - t) / 0.35)), v = hej, upp = Math.max(pek, v);
  const arm = mjuk((upp - 0.3) / 0.4) * (v > 0 ? 60 : sikte) + v * 14 * Math.sin(t * 2 * Math.PI / 1.2), gom = Math.sin(Math.PI * upp) * (upp < 1 ? 1 : 0);
  const par = x => hej > 0 ? [0, x] : [x, 0], s = -1, skutt = Math.sin(Math.PI * kl(0, 1, (t - PEK - 0.2) / 0.5)) * pek;
  const soker = mjuk((t - FRAGA - 0.3) / 0.4) * (1 - mjuk((t - PEK + 0.2) / 0.3)), u = mjuk((t - FRAGA - dD) / 1.5);
  const r1 = ruta(1), r24 = ruta(24), dit0 = iKortet(512, FOT - 355, new THREE.Vector3(lerp(r1.cx, r24.cx, u), lerp(r1.cy, r24.cy, u), 0));
  const dit = dit0.map(d => 7 * d / Math.hypot(...dit0));
  // Lärdomarna från lekrummet (runda 7–8): inget av riggens vila (den tittar sig omkring utan syfte), blicken flyttas bara mot
  // tavlan och luckan. Lutningen går genom riggens delar (boj från fötterna, huvudet lutar emot med skak), inte genom att hela
  // kortet vrids (luta). Uttryckens egna armar tas bort, och armarna hänger 22° lägre intill sidorna när de inte används.
  // Viktflytt i lugn takt (4,7 s): kroppen, huvudet 0,25 s efter, öronen 0,45 s efter, armarna 0,35 s efter.
  const f0 = { ...L.blanda('neutral', 'glad', Math.max(upp, soker)), armar: L.NEUTRAL.armar, titt: blick.map((b, j) => b * pek + dit[j] * soker) };
  const S = d => Math.sin(2 * Math.PI * (t - d) / 4.7), s0 = S(0), sH = S(0.25), sO = S(0.45), sA = S(0.35), ner = s0 ** 4, lugnK = 1 - 0.7 * upp;
  const aktiv = par(1), armar = par(arm).map((a, i) => a - 22 * (1 - aktiv[i] * mjuk(upp / 0.6)) + (i ? 2 : -2) * sA * lugnK);
  const lutar = s * (1.5 * pek + soker);   // förut luta (hela kortet): nu böjer kroppen sig och huvudet lutar
  const p0 = { ...L.POSE0, armar, gom: par(gom), rikt: 0.7 * s * soker,
    boj: s * (4 * pek + 2.5 * soker) + 0.8 * lutar + 2 * Math.sin(t * 7) * v + 2.2 * s0 * lugnK, luta: 0.3 * s0 * lugnK,
    skak: [0.12 * lutar - 0.12 * sH * lugnK, 0.1 * lutar - 0.12 * sO * lugnK], oron: [2.4 * sO * lugnK, -2.4 * sO * lugnK],
    strack: -0.008 * ner * lugnK, bred: 0.004 * ner * lugnK, lyft: -16 * skutt };   // skuttet lugnare (förut 26)
  // ingen blinkning ovanpå en ändring (inom 0,45 s från hej, frågan, pekandet och åkningen)
  const nara = [VINK, LATE + 0.85, FRAGA, PEK, Z0].some(c => Math.abs(t - c) < 0.45);
  L.rita(G, nara ? f0 : BL(f0, t), p0);
}

// ---------- dagens lucka: guldram, vick, gnistor, öppning och ljus ----------
let gnistor = [];
function byggGnistor() {
  const st = tex(stjarnBild()), r = ruta(N);
  // 10 vid guldramen (när kaninen pekar) och 14 som flyger ut med ljuset när luckan öppnas
  for (let i = 0; i < 24; i++) {
    const m = new THREE.SpriteMaterial({ map: st, transparent: true, depthWrite: false, opacity: 0, toneMapped: false, color: new THREE.Color(1.25, 1.2, 1.1) });
    const sp = new THREE.Sprite(m); scen.add(sp);
    const a = slumpF(i, 21) * 6.28, ut = i >= 10;
    gnistor.push({ sp, m, ut, a, t0: ut ? OPP0 + 0.02 + 0.15 * slumpF(i, 22) : PEK + 0.05 + 0.5 * slumpF(i, 22), sk: 0.03 + 0.025 * slumpF(i, 23), v: slumpF(i, 24),
      bas: ut ? new THREE.Vector3(r.cx + (slumpF(i, 25) - 0.5) * r.w * 0.7, r.cy + (slumpF(i, 26) - 0.5) * r.h * 0.7, 0.03)
        : new THREE.Vector3(r.cx + Math.cos(a) * (r.w / 2 + 0.05), r.cy + Math.sin(a) * (r.h / 2 + 0.05), ZF + 0.02) });
  }
}
function dagens(t) {
  const { ga } = DORR[N];
  const pek = mjuk((t - PEK) / 0.4) * (1 - mjuk((t - Z0) / 0.3));
  ramM.opacity = pek; ramG.scale.setScalar(1 + 0.012 * Math.sin(t * 5.2) * pek);
  // vicket: luckan vill öppnas (två små gläntningar på 4° och 3°) medan kaninen pekar
  const vk = [[PEK + 0.35, 4], [PEK + 0.95, 3]].reduce((s, [a, g]) => s + g * Math.sin(Math.PI * kl(0, 1, (t - a) / 0.42)) ** 2, 0);
  const opp = 1 - (1 - fas([OPP0, OPP1], t)) ** 2.5;   // snabbt först: dörren är förbi kamerans väg innan kameran kommer nära
  ga.rotation.y = -(vk * Math.PI / 180 + OPPEN_V * opp);
  // ljuset: tänds när luckan börjar öppnas, starkast i mitten av öppningen, borta när öppningen fyller bilden
  const lj = mjuk(fas([OPP0 - 0.05, OPP0 + 0.35], t)) * (1 - mjuk(fas([OPP1 - 0.35, OPP1 - 0.02], t)));
  glodM.opacity = 0.2 * lj; varmLjus.intensity = 1.1 * lj;   // varmt, men ingen vit blixt (små barn)
  for (const g of gnistor) {
    const u = (t - g.t0) / (g.ut ? 0.6 : 0.7);   // de som flyger ut är borta innan öppningen fyller bilden
    if (u <= 0 || u >= 1) { g.m.opacity = 0; g.sp.visible = false; continue; }
    g.sp.visible = true; const pop = Math.sin(Math.PI * kl(0, 1, u / 0.35)) * 0.25 + kl(0, 1, u / 0.2);
    g.m.opacity = Math.min(1, u / 0.15) * (1 - mjuk((u - 0.55) / 0.45));
    g.m.rotation = g.a + u * (g.v - 0.5) * 2;
    const s = g.sk * Math.min(pop, 1.15) * (1 - 0.4 * u); g.sp.scale.set(s, s, 1);
    if (g.ut) g.sp.position.copy(g.bas).add(new THREE.Vector3(Math.cos(g.a) * 0.22 * u, Math.sin(g.a) * 0.15 * u + 0.08 * u, 0.25 * u));
    else g.sp.position.copy(g.bas).add(new THREE.Vector3(Math.cos(g.a) * 0.05 * u, Math.sin(g.a) * 0.05 * u + 0.03 * u, 0));
  }
  berM.forEach((m, i) => { m.opacity = 0.55 + 0.45 * Math.pow(0.5 + 0.5 * Math.sin(t * (1.3 + 0.4 * slumpF(i, 31)) + slumpF(i, 32) * 6.28), 3); });
}

// ---------- kameran ----------
// Helbild som glider långsamt in, en liten knuff mot dagens lucka när kaninen pekar, och sist åker kameran rakt in i öppningen
// så att insidan fyller bilden precis när luckan är helt öppen (som lucka.js zoom). Kameran stannar framför dörrens svep.
function kamera(t) {
  const r = ruta(N), A = [new THREE.Vector3(-1.95, 1.12, 2.85), new THREE.Vector3(0.32, 0.7, 0)], B = [new THREE.Vector3(0.48, 0.92, 3.5), new THREE.Vector3(0.34, 0.68, 0)];   // närmare (Sanna 24/11)
  // A snett från vänster, så att plattans kant syns; glider runt till nästan rakt fram
  const dorr = new THREE.Vector3(r.cx, r.cy, 0.003), fyll = 0.985 * (r.h / 2) / Math.tan(cam.fov * Math.PI / 360);   // 1,5 % för nära: ingen karmkant i sista rutorna
  const C = [B[0].clone().lerp(new THREE.Vector3(r.cx, r.cy + 0.25, 2.6), 0.22), B[1].clone().lerp(dorr, 0.3)];
  const D = [dorr.clone().add(new THREE.Vector3(0, 0, fyll)), dorr], P = [dorr.clone().add(new THREE.Vector3(0, 0.02, fyll * 2.1)), dorr];
  let p, m;
  if (t < PEK) { const k = lugn(t / PEK); p = A[0].clone().lerp(B[0], k); m = A[1].clone().lerp(B[1], k); }
  else if (t < Z0) { const k = lugn((t - PEK) / (Z0 - PEK)); p = B[0].clone().lerp(C[0], k); m = B[1].clone().lerp(C[1], k); }
  else if (t < OPP0) { const k = fas([Z0, OPP0], t);   // medan repliken sägs: fram till luckan (den fyller halva bilden), blicken låser på den först
    p = C[0].clone().lerp(P[0], lugn(k)); m = C[1].clone().lerp(P[1], Math.min(1, 1 - (1 - k) ** 2.2)); }
  else { p = P[0].clone().lerp(D[0], lugn(fas([OPP0, OPP1], t))); m = dorr; }   // dörren slås upp först, sedan glider kameran in i ljuset
  cam.position.copy(p); cam.lookAt(m); cam.updateMatrixWorld();
  return dorr.distanceTo(p);
}

// ---------- efterbehandling (som lekrummet) ----------
class Linsoskarpa extends Pass {
  constructor() { super();
    this.u = { tBild: { value: null }, tDjup: { value: null }, nara: { value: 0.05 }, fjarran: { value: 60 }, fokus: { value: 3 }, cInf: { value: 11 },
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
class Gradering extends Pass {   // varm ton och vinjett 0,12; styrka 0 sist, så att sista bilden blir innehållets egen
  constructor() { super(); this.u = { tBild: { value: null }, styrka: { value: 1 } };
    this.q = new FullScreenQuad(new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `uniform sampler2D tBild; uniform float styrka; varying vec2 vUv;
        void main() { vec3 c0 = texture2D(tBild, vUv).rgb, c = c0;
          c *= vec3(1.025, 1.0, 0.965); c = c + 0.012 * (1.0 - c) * vec3(1.0, 0.9, 0.7);
          vec2 q = vUv - 0.5; q.x *= 1.25; float v = smoothstep(0.42, 0.85, length(q)); c *= 1.0 - 0.12 * v;
          gl_FragColor = vec4(mix(c0, c, styrka), 1.0); }` })); }
  render(r, skriv, las) { this.u.tBild.value = las.texture; r.setRenderTarget(this.renderToScreen ? null : skriv); this.q.render(r); }
}
const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples: 4 });
const komp = new EffectComposer(R, rt);
for (const r of [komp.renderTarget1, komp.renderTarget2]) { r.depthTexture = new THREE.DepthTexture(W, H); r.depthTexture.type = THREE.UnsignedIntType; }
const lins = new Linsoskarpa(), bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.3, 0.5, 1.0), grad = new Gradering();
komp.addPass(new RenderPass(scen, cam)); komp.addPass(lins); komp.addPass(bloom); komp.addPass(grad); komp.addPass(new OutputPass());

// ---------- en bildruta ----------
const stillBild = new Image();
async function seek(t) {
  const avst = kamera(t);
  kort.rotation.y = Math.atan2(cam.position.x - KANEL.x, cam.position.z - KANEL.z); kort.updateMatrixWorld();
  const d = new THREE.Vector3().subVectors(KANEL, cam.position).dot(cam.getWorldDirection(new THREE.Vector3())) || 3;
  const s = 540 / (d * Math.tan(cam.fov * Math.PI / 360)) * ENHET;
  kanel(t); dagens(t);
  $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1);
  $('boilStyrka').setAttribute('scale', (2.5 / s).toFixed(2));   // line boil 2,5 px i bild
  const ru = 3 / s;
  kantF.querySelector('feMorphology[result="d"]').setAttribute('radius', ru.toFixed(3));
  kantF.querySelector('feDisplacementMap').setAttribute('scale', (0.35 * ru).toFixed(3));
  const tu = kantF.querySelectorAll('feTurbulence'); tu[0].setAttribute('baseFrequency', (0.05 * s).toFixed(5)); tu[1].setAttribute('baseFrequency', (0.35 * s).toFixed(5));
  const hoger = new THREE.Vector3(Math.cos(kort.rotation.y), 0, -Math.sin(kort.rotation.y));
  KU.uSol.value.set(SOLRIKT.dot(hoger), SOLRIKT.y * 0.45).normalize();
  KU.uSida.value = 1.5; KU.uKant.value = 0.45; KU.uVit.value = 7 + ru + 2.5 / s; KU.uBand.value = 3 / s; KU.uSteg.value = (KU.uVit.value + KU.uBand.value) / 16;
  if (kort.visible = t < OPP1 - 0.3) {   // Kanel syns inte när kameran är inne vid luckan: hoppa över SVG-ritningen
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString($('kort'))], { type: 'image/svg+xml' }));
    stillBild.src = url; await stillBild.decode(); URL.revokeObjectURL(url);
    kortCtx.clearRect(0, 0, VB.w, VB.h); kortCtx.drawImage(stillBild, 0, 0, VB.w, VB.h); kortTex.needsUpdate = true; }
  // fokus: tavlan och Kanel i helbild, luckan när kameran åker in
  const fk = lerp(d, avst, mjuk(fas([Z0, Z0 + 0.8], t)));
  lins.u.fokus.value = SNO_U.fokus.value = fk;
  SNO_U.t.value = t; SNO_U.alfa.value = 1 - mjuk(fas([OPP1 - 0.5, OPP1 - 0.1], t));
  const slut = mjuk(fas([OPP1 - 0.4, OPP1 - 0.05], t));   // sista biten: ren bild, som innehållets första
  grad.u.styrka.value = 1 - slut; bloom.strength = 0.3 * (1 - slut); lins.u.cInf.value = 11 * (1 - slut);
  komp.render();
}

window.ready = (async () => {
  await tider(); await byggVarld(); await byggTavla(); await byggKanel(); byggGnistor();
  const S = 'assets/ljud/effekter/';
  // Bara kalenderns egna ljud. I den skarvade filmen (skarva.sh) ligger den gamla filmens ljud under (samma tider), och de nya
  // effekterna läggs ovanpå: tindra när guldramen tänds, glitter när ljuset strömmar ut.
  window.LJUD_NYA = [{ t: PEK + 0.05, fil: S + 'tindra/tindra-2.m4a', vol: 0.9 }, { t: OPP0 + 0.05, fil: S + 'glitter/glitter-1.m4a', vol: 0.8 }];
  window.LJUD = [
    { t: VINK + 0.4, fil: 'assets/ljud/roster/tittut/kanin-hej.m4a', vol: 2.5 }, { t: LATE, fil: S + 'kanin-ny/kanin-ny-hej-2.m4a', vol: 1.3 },
    { t: FRAGA, fil: `${ROST}/vilken-dag.m4a`, vol: 2.5 }, { t: PEK + 0.5, fil: `${ROST}/just-det-${N}.m4a`, vol: 2.5 },
    { t: Z0 + 0.4, fil: `${ROST}/nu-oppnar-vi.m4a`, vol: 2.5 }, { t: Z0, fil: S + 'swoosh/swoosh-1.m4a', vol: 1.5 }, { t: OPP0 + 0.1, fil: S + 'ding/ding-1.m4a', vol: 1.3 },
    { t: Z0, fil: 'assets/ljud/musik/jul/jul-oppning.m4a', vol: 0.7 }, ...window.LJUD_NYA];
  window.DURATION = OPPEN; window.OPPEN = OPPEN;
  window.TIDER = { VINK, LATE, FRAGA, PEK, Z0, OPP0, OPP1, OPPEN };
  // QA: kameran mot dörrens svep (inget går genom något): minsta avstånd från kameran till dagens dörr, var 1/120 s
  window.koll = () => { let min = 9; const { ga, r } = DORR[N];
    for (let t = Z0; t <= OPP1; t += 1 / 120) { kamera(t); dagens(t); ga.updateMatrixWorld();
      const lok = ga.worldToLocal(cam.position.clone()), x = kl(0, r.w + 2 * E, lok.x), y = kl(-r.h / 2 - E, r.h / 2 + E, lok.y), z = kl(0, DT, lok.z);
      min = Math.min(min, Math.hypot(lok.x - x, lok.y - y, lok.z - z)); }
    return min; };
  await seek(+(Q.get('t') || 0));
  window.seek = seek;
  return true;
})();
