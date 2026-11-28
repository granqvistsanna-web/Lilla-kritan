// 063 Hösten i boken, grind 6: hela scenen i Kritans bok. Uppslaget som storyboarden (storyboard/scen.js, grind 5 godkänd),
// motorn som 062 (avsnitt/062-sommaren-i-boken/scener/boken/boken.js): korten, kritan, rävens v2-rigg på ett kort, kameran som vyer.
// Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/063-hosten-i-boken/scener/render.mjs avsnitt/063-hosten-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { kameraplan } from '/verktyg/kamera3d.mjs';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { halsduk, halsdukPa } from '/avsnitt/063-hosten-i-boken/prov/halsduk/halsduk.js';

const $ = id => document.getElementById(id);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), k01 = x => kl(0, 1, x), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = k01(k), k * k * (3 - 2 * k));
const bump = (a, b, t, r = 0.3) => mjuk((t - a) / r) * mjuk((b - t) / r);   // 0 → 1 → 0
const reser = k => { k = k01(k); const s = 0.9; return 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2; };   // fälls upp med en liten efterstudsning
const v3 = (...a) => new THREE.Vector3(...a);

// ---- raderna ----
const { RADER, ROST, GLES } = await import('/avsnitt/063-hosten-i-boken/storyboard/rader.mjs'); let acc = 0;
const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, st: r.s, s }; });
const RR = Object.fromEntries(RAD.map(r => [r.id, r])), S = id => RR[id].s, LN = n => ROST[n - 1][1];
const DURATION = acc, rad = t => RAD[Math.max(0, RAD.findLastIndex(r => r.s <= t))];
const MAL = (id, n) => S(id) + RR[id].malin.find(m => m[0] === n)[1];   // när Malins replik n börjar
const SVAR = (id, n) => MAL(id, n) + LN(n) + 0.2;                        // rävens svar: 0,2 s efter repliken

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
const [GRAN, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, EK_GRON, EK_HOST, TRAD, LOVHOG, SVAMP, EKOLLON, STUBBE,
  LOV_R, LOV_G, LOV_B] = await Promise.all([
  B + 'skogen-gron-saker/gran.png',
  ...['himmel', 'kulle-bak-host', 'kulle-fram-host', 'moln-stor', 'moln-mellan', 'moln-liten', 'ek-gron', 'ek-host', 'trad-gult', 'lovhog', 'svamp', 'ekollon'].map(n => P + n + '.png'),
  RQ + 'stubbe/cut/stubbe.png', ...['rott', 'gult', 'brunt'].map(n => `${RQ}lov/cut/lov-${n}.png`)].map(lad));
const [LOV_I, EKORRE_I] = await Promise.all([bild(RQ + 'lov/cut/lov-orange.png'), bild(RQ + 'ekorre-orange/cut/ekorre-orange.png')]);
const LOV_O = tex(trim(LOV_I));
const HD_C = await halsduk();   // halsduken i kod, färg B (samma ruta som halsduk-bok.png, så att konturen passar)
const HALSDUK = tex(trim(HD_C));
// lövets och halsdukens rutor: konturen (bildens egna px) läggs på den beskurna bilden
function ruta(i) {
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, u); x1 = Math.max(x1, u); }
  return { ox: x0 - 1, oy: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3, W: i.width, H: i.height };
}
const KONTUR = Object.fromEntries(await Promise.all([['lov', 'lov/cut/lov-orange-kontur.json'], ['halsduk', 'halsduk/cut/halsduk-kontur.json']].map(async ([n, f]) => {
  const j = await (await fetch(RQ + f)).json(); return [n, [j.d, ...(j.detaljer || [])]]; })));
const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
const LOV_URL = await dataUrl(RQ + 'lov/cut/lov-orange.png'), HD_URL = HD_C.toDataURL();
const LOVSMA_URL = await Promise.all(['rott', 'gult', 'brunt'].map(n => dataUrl(`${RQ}lov/cut/lov-${n}.png`)));
// ekorren får ett öga (Sanna 27/11 "eyes on squirrel"): bilden har inget, riggfilen anger ögat (819, 420, r 26). Ett mörkt öga med
// glans, som solens i 062, och en blinkning (ögat stängt = en böjd linje)
const ekorre = blund => { const c = duk(EKORRE_I.width, EKORRE_I.height), x = c.getContext('2d'), [ex, ey] = [812, 418]; x.drawImage(EKORRE_I, 0, 0);
  x.fillStyle = 'rgba(232,110,90,0.35)'; x.beginPath(); x.ellipse(ex + 14, ey + 46, 24, 15, 0, 0, 7); x.fill();
  if (blund) { x.strokeStyle = '#3A2414'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.arc(ex, ey - 4, 15, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke(); }
  else { x.fillStyle = '#3A2414'; x.beginPath(); x.ellipse(ex, ey, 14, 19, 0, 0, 7); x.fill();
    x.fillStyle = '#FFF'; x.beginPath(); x.arc(ex - 4, ey - 7, 5.5, 0, 7); x.fill(); }
  return tex(trim(c)); };
const EKORRE = ekorre(false), EKORRE_BLUND = ekorre(true);

function bredare(map, bredd) {
  const i = map.image, h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return tex(c);
}
const NEDRE_KANT = 0.07;   // lövkantens höjd (andel av bilden) ovanför den nedre halvan
function nedre(map, andel) {   // lövhögens främre halva, som räven sjunker ner bakom, med en ojämn lövkant upptill (en rak klippkant syntes tvärs över rävens ansikte)
  const i = map.image, W = i.width, h = Math.round(i.height * andel), a = Math.round(i.height * NEDRE_KANT), c = duk(W, h + a), x = c.getContext('2d'), n = 11;
  x.beginPath(); x.moveTo(0, h + a); x.lineTo(0, a * 0.8);
  for (let k = 0; k < n; k++) { const x0 = W * k / n, x1 = W * (k + 1) / n, topp = a * [0.05, 0.3, 0.15][k % 3] - a * 0.6;
    x.quadraticCurveTo((x0 + x1) / 2, topp, x1, a * [0.75, 0.9, 0.7][(k * 2) % 3]); }
  x.lineTo(W, h + a); x.closePath(); x.clip(); x.drawImage(i, 0, i.height - h - a, W, h + a, 0, 0, W, h + a); return tex(c);
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

skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
const PARM0 = 0.5, PARM1 = 1.4;
const { insida, satt } = await skapaBok(scen, { farg: '#8A5A34', figur: LOV_I, doodles: true, oppna: [PARM0, PARM1] });

// ---- uppslaget (som storyboarden) ----
const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(52,40,14,0.42)'); g.addColorStop(0.55, 'rgba(52,40,14,0.16)'); g.addColorStop(1, 'rgba(52,40,14,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, x, y: m.position.y, z, h, w, hog: 0.002, vaj: o.vaj };
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.07), KSKUGGA); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0009, z + 0.012); f.renderOrder = 1; scen.add(f); k.flik = f; }
  return k;
}
const vik = (k, e) => { k.m.rotation.x = Math.PI / 2 * (1 - e); k.m.position.y = k.y + k.hog * (1 - k01(e * 4)); };   // e 0 = nedfälld framåt, 1 = står
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height, farg) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(map, { alphaTest: 0.5, alphaToCoverage: true, ...(farg && { color: farg }) })));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
const BAK = [kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47)];
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3, '#E4EAEC');   // höstljus: svalare och lite blekare
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
const SKOG = [[-1.0, -0.36, 0.5], [-0.8, -0.42, 0.6], [0.88, -0.38, 0.56], [1.02, -0.32, 0.44]].map(([x, z, h]) => kort(GRAN, h, x, z));
const TRADET = kort(TRAD, 0.62, 0.42, -0.4, { vaj: 1 });
// eken: grön från början (Sanna 27/11: "a green tree changed to autumn colors"). ek-gron.png är ek.png nedskalad till ek-host.png:s
// ruta med samma tunna kant, så att de ligger exakt på varandra. Höstfärgen breder ut sig från kritans löv (rad 05) i en växande
// cirkel med mjuk kant, ritad på kortets egen bild, och lövet ritas in i kronan när den är klar
const EK = { x: -0.42, z: -0.2, h: 1.0 };
const EKHOST_C = duk(EK_HOST.image.width, EK_HOST.image.height), EKHOST_T = tex(EKHOST_C);
const EKHOST = kort(EKHOST_T, EK.h, EK.x, EK.z), EKFARG_C = duk(EKHOST_C.width, EKHOST_C.height);
const LOVPOS = v3(EK.x + 0.2, SIDA + 0.7, EK.z + 0.006), LOVH = 0.15;   // kritans löv på en gren
const LOVET = kort(LOV_O, LOVH, LOVPOS.x, LOVPOS.z, { y: LOVPOS.y, flik: false });
const LOVRUTA = ruta(LOV_I), HD_R = ruta(HD_C);
let kronaK = -1;
function krona(k) {   // 0 = grön, 1 = hela kronan höstfärgad (med kritans löv inritat)
  k = k01(Math.round(k * 90) / 90); if (k === kronaK) return; kronaK = k;
  const x = EKHOST_C.getContext('2d'), iw = EKHOST_C.width, ih = EKHOST_C.height, w = EK.h * iw / ih;
  const cx = ((LOVPOS.x - EK.x) / w + 0.5) * iw, cy = (1 - (LOVPOS.y - SIDA + LOVH / 2) / EK.h) * ih;
  x.clearRect(0, 0, iw, ih); x.drawImage(EK_GRON.image, 0, 0, iw, ih);
  if (k > 0) { const F = 140, R1 = (Math.hypot(iw, ih) + F) * mjuk(k), y = EKFARG_C.getContext('2d'), g = y.createRadialGradient(cx, cy, Math.max(0, R1 - F), cx, cy, R1);
    g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    y.globalCompositeOperation = 'source-over'; y.clearRect(0, 0, iw, ih); y.drawImage(EK_HOST.image, 0, 0);
    y.globalCompositeOperation = 'destination-in'; y.fillStyle = g; y.fillRect(0, 0, iw, ih); x.drawImage(EKFARG_C, 0, 0); }
  if (k >= 1) { const lh = LOVH / EK.h * ih, lw = lh * LOV_O.image.width / LOV_O.image.height;   // kritans löv sitter kvar i kronan
    x.drawImage(LOV_O.image, cx - lw / 2, cy - lh / 2, lw, lh); }
  EKHOST_T.needsUpdate = true;
}
{   // marken: höstgräs, ockrabrunt med gröna fläckar
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#B99A45', '#CDB264', '#8F8A3A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
const STUBBEN = kort(STUBBE, 0.17, 0.78, -0.08);
const SVAMPEN = kort(SVAMP, 0.17, 0.66, 0.16, { flik: false });   // 0,13 skymdes av svansen (QA förbättring 5)
const HOG = { x: 0.37, z: 0.34 }, HOGH = 0.32;   // "en stor lövhög": nästan lika hög som räven (0,26 var mindre än räven), fri från svampen och räven på mitten
const HOGBAK = kort(LOVHOG, HOGH, HOG.x, HOG.z), HOGFRAM = kort(nedre(LOVHOG, 0.5), HOGH * (0.5 + NEDRE_KANT), HOG.x, HOG.z + 0.06, { flik: false });
const EKOLLON_POS = [[-0.5, 0.06], [-0.38, 0.1], [-0.26, 0.05]], EKOLLONEN = EKOLLON_POS.map(([x, z]) => kort(EKOLLON, 0.05, x, z, { flik: false }));
const EKORREN = kort(EKORRE, 0.15, EK.x - 0.1, EK.z - 0.06, { flik: false });
// tre löv på marken, stående kort (0,07 platta syntes inte, QA förbättring 1): det röda vid eken, det gula mitt fram, det bruna vid stubben
const MARKLOV = [[LOV_R, -0.66, 0.24], [LOV_G, 0.22, 0.52], [LOV_B, 0.78, 0.22]].map(([m, x, z], i) => kort(m, 0.12, x, z, { flik: false, vaj: i * 2.1 }));
// halsduken: ligger (bildsidan upp) där kritan ritar den, reser sig, glider till räven
const HDPOS = [-0.17, 0.36], HDW = 0.26;   // större teckning (0,2 var för liten för att läsas i bilden)
const HALSDUKKORT = kort(HALSDUK, HDW * HALSDUK.image.height / HALSDUK.image.width, ...HDPOS, { y: SIDA + 0.003 });
Object.assign(HALSDUKKORT.m.material, { emissiveMap: HALSDUK, emissive: new THREE.Color(0.3, 0.3, 0.3) });   // samma ljus som rävens kort: ingen färgskiftning när kortet byts mot riggens halsduk

// löv i luften (fallande, lövyran): små kort ur löven
const LOVSORT = [LOV_O, LOV_R, LOV_G, LOV_B];
const smalov = (n, s) => Array.from({ length: n }, (_, i) => { const map = LOVSORT[i % 4], m = new THREE.Mesh(new THREE.PlaneGeometry(s * map.image.width / map.image.height, s), urklipp(map));
  m.castShadow = true; m.customDepthMaterial = djup(map); m.visible = false; scen.add(m); return m; });
const FALLER = smalov(9, 0.085), YRA = smalov(10, 0.06), SINGEL = smalov(2, 0.085);   // större löv, så att de syns i helbild (0,045 försvann)
// vinden: öppna krumelurer i vit krita på en genomskinlig skiva
const VIND = (() => { const c = duk(2048, 700), x = c.getContext('2d'); x.strokeStyle = '#FFFFFF'; x.lineCap = 'round'; x.lineWidth = 14;
  for (const [cx, cy, s] of [[300, 220, 1], [900, 420, 0.8], [1450, 180, 1.1], [1800, 480, 0.7]]) {
    x.beginPath(); x.moveTo(cx - 220 * s, cy + 30 * s); x.bezierCurveTo(cx - 80 * s, cy - 40 * s, cx + 60 * s, cy + 40 * s, cx + 120 * s, cy);
    x.arc(cx + 120 * s, cy - 40 * s, 40 * s, Math.PI / 2, -Math.PI, true); x.stroke(); }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.68), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, opacity: 0, depthWrite: false }));
  m.position.set(0, SIDA + 0.42, 0.15); m.visible = false; scen.add(m); return m; })();
// andningspuffen: ett litet krit-moln (tre runda klickar) i stället för en vit kula
const PUFF = (() => { const c = duk(256, 160), x = c.getContext('2d');
  kritYta(x, 256, 160, '#D3E3F0', '#B4CDE2', '#EEF4FA', 0.4); x.globalCompositeOperation = 'destination-in'; x.beginPath();
  for (const [cx, cy, r] of [[78, 96, 44], [140, 70, 52], [190, 102, 40]]) { x.moveTo(cx + r, cy); x.arc(cx, cy, r, 0, 7); }
  x.fill();   // en enda bana: varje egen fyllning med destination-in skulle bara lämna klickarnas överlapp
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.025), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, opacity: 0, depthWrite: false, depthTest: false }));
  m.renderOrder = 10; m.visible = false; scen.add(m); return m; })();   // alltid framför räven (kortet ligger närmare kameran än nosens punkt)
let NOS = [510, 459];   // nosens mitt i riggens px, läses ur riggen varje bildruta (ansiktet glider med blicken)

// ---- räven: v2-riggen på ett kort ----
const VB = { x: -150, y: -200, w: 1324, h: 1200 };
const L = await v2rigg('raven-rut'), FOT = L.FOTTER || 925, TOPP = 80, G = L.figur(512, FOT, 1, $('figurer'));
G.querySelector('.skugga')?.setAttribute('display', 'none');
// halsduken på räven: ritad i kod efter kroppens kontur (halsdukPa), i kroppen under kindbandet, så att den följer kroppen
const KROPP_I = await bild('/assets/karaktarer/raven-rut/premium/cut-tunn/rut-body-tom.png');
const HALSEN_URL = halsdukPa(KROPP_I, { yc: 588, tjock: 84, dip: 34, ande: -0.36 }).toDataURL();
const HD_MAL = { x: 507, y: 625, bpx: 607, hpx: 230 };   // halsdukPa:s ruta i riggens px (uppmätt: x 204–811, y 551–813), lagt så att kortets band hamnar på riggens band
G.querySelector('.mage').insertAdjacentHTML('afterend', `<image id="halsen" href="${HALSEN_URL}" width="1024" height="1024" display="none"/>`);
// löven på huvudet (rad 17): i kroppen, efter ansiktet (ansiktet har en mask)
G.querySelector('.kropp').insertAdjacentHTML('beforeend', `<g id="huvudLov">${[[440, 196, -35], [516, 178, 10], [594, 198, 38]].map(([x, y, r], i) =>
  `<image class="hlov" href="${LOVSMA_URL[i]}" x="-48" y="-48" width="96" height="96" transform="translate(${x} ${y}) rotate(${r})" data-x="${x}" data-y="${y}" data-r="${r}"/>`).join('')}</g>`);
await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
window.kant.lagg(G); const kantF = $('defs').lastElementChild;
const BL = skapaBlinka(62);
L.rita(G, L.NEUTRAL, L.POSE0);
const ENHET = 0.34 / (FOT - TOPP);   // lika hög som rut.png-kortet i storyboarden (0,34)
HD_MAL.b = HD_MAL.bpx * ENHET; HD_MAL.h = HD_MAL.hpx * ENHET;
const kortCanvas = duk(VB.w, VB.h), kortCtx = kortCanvas.getContext('2d'), kortTex = tex(kortCanvas);
const gg = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
gg.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna
const rav = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), alphaTest: 0.5, side: THREE.FrontSide }));
rav.add(new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, color: 0x000000, emissive: '#F4ECDD', alphaTest: 0.5, side: THREE.BackSide })));
rav.castShadow = rav.receiveShadow = true;
rav.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
scen.add(rav);
const RAVKORT = { m: rav, y: SIDA + 0.004, hog: 0.001, z: 0 };
const fig2varld = ([x, y], pos = rav.position) => v3(pos.x + (x - 512) * ENHET, pos.y + (FOT - y) * ENHET, pos.z + 0.01);
const stillBild = new Image();

// ---- ljuset: lite lägre och varmare höstsol ----
scen.add(new THREE.HemisphereLight('#FFF8EC', '#D8B892', 2.2));
const ljus = new THREE.DirectionalLight('#FFE8CC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
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

// ---- rävens platser och rörelser ----
const PLATS = { mitt: [0.08, 0.2], 'fore-hog': [0.06, 0.48], hog: [HOG.x, HOG.z + 0.02], 'framfor-hog': [0.14, 0.42], ekollon: [-0.11, 0.15], svamp: [0.5, 0.06] };   // ekollon: så att det tredje ekollonet syns bredvid räven
// hopp: xz flyttas inom [xz0, xz1] av hoppet (in i högen: först fram, sedan rakt ner; ut ur högen: först upp, sedan fram)
const HOPP = [
  { t0: S('16') + 0.1, t1: S('16') + 0.55 + 0.25, fran: PLATS['fore-hog'], till: PLATS.hog, h: 0.22, xz: [0.15, 0.75] },   // in i högen över främre halvan, landar på "Hopp!"
  { t0: MAL('16b', 26) + 0.55, t1: MAL('16b', 26) + 1.05, fran: PLATS.hog, till: PLATS.hog, h: 0.16, xz: [0, 1] },   // en gång till … hopp! landar på "hopp" (ordet 0,80–1,64 s in), som rad 16
  { t0: S('17') - 0.8, t1: S('17') - 0.1, fran: PLATS.hog, till: PLATS['framfor-hog'], h: 0.24, xz: [0.35, 1] },   // ut ur högen, över främre halvan, i högens vy: landar före klippet till närbilden
];
const GA = [   // går lugnt: [start, slut, från, till]
  [S('15') + 0.5, S('15') + 1.7, PLATS.mitt, PLATS['fore-hog']],   // fram till högen (hoppar in framifrån, över den låga främre halvan)
  [S('21') + 0.2, S('21') + 1.9, PLATS['framfor-hog'], PLATS.ekollon],
  [S('22b') + 1.0, S('22b') + 2.6, PLATS.ekollon, PLATS.svamp],
];
function ravPos(t) {   // hoppen och gångerna i tidsordning
  const E = [...HOPP.map(H => ({ a: H.t0, b: H.t1, f: H.fran, g: H.till, y: u => H.h * Math.sin(Math.PI * u), m: u => mjuk((u - H.xz[0]) / (H.xz[1] - H.xz[0])) })),
    ...GA.map(([a, b, f, g]) => ({ a, b, f, g, y: u => 0.008 * Math.abs(Math.sin(Math.PI * 4 * u)), m: mjuk }))].sort((p, q) => p.a - q.a);
  let [x, z] = PLATS.mitt, y = 0;
  for (const e of E) { if (t >= e.b) [x, z] = e.g; else if (t >= e.a) { const u = (t - e.a) / (e.b - e.a), m = e.m(u);
    x = lerp(e.f[0], e.g[0], m); z = lerp(e.f[1], e.g[1], m); y = e.y(u); } }
  return [x, y, z];
}
const gaRikt = t => { for (const [a, b, f, g] of GA) if (Math.abs(g[0] - f[0]) > 0.1 && t > a - 0.3 && t < b + 0.3) return Math.sign(g[0] - f[0]) * bump(a - 0.3, b + 0.3, t, 0.3); return 0; };
// i lövhögen: figuren sjunker i sitt kort (allt under kortets fot klipps bort), högens främre halva döljer kanten; bara huvudet syns
const SJUNK = 30;   // så långt räven sjunker i högen (riggens px): ögonen ovanför lövkanten
const iHogen = t => { const [a, b, c] = HOPP;
  return t < a.t1 - 0.3 ? 0 : t < b.t0 ? mjuk((t - a.t1 + 0.3) / 0.35) * (1 - 0.75 * bump(MAL('16b', 26) + 0.1, b.t0 + 0.1, t, 0.4))   // reser sig lite under "En gång till"
    : t < c.t0 ? Math.max(1 - mjuk((t - b.t0 + 0.05) / 0.2), mjuk((t - b.t1 + 0.3) / 0.35)) : 1 - mjuk((t - c.t0 + 0.05) / 0.2); };
const YR = [HOPP[0].t1, HOPP[1].t1];   // lövyran
// halsduken: kritan ritar den (rad 10), kortet reser sig (rad 11), glider till halsen (rad 13)
const HD_KLAR = S('11') + 0.6, HD_UPP = S('11') + 0.8, HD_GLID = [S('13') + 0.3, S('13') + 1.9], HD_PA = HD_GLID[1];
const DARR = [S('09') - 0.2, MAL('13', 19) + 2.4];   // fryser: från "Brr" till "Så där"
const HUVUDLOV = [S('17') - 0.75, S('26') + 0.3], LOV_AV = MAL('17', 27) + LN(27) + 0.4;   // ett löv faller av när räven skakar
const LOV_AV_ALLA = [S('21b') + 0.55, LOV_AV, S('21b') + 0.85];   // de två andra glider av när räven luktar på ekollonen (Sanna 27/11 "have leaves fall off head")
const VINK = (id, n, d = 1.8) => [MAL(id, n) + 0.3, d];
function vink(f, p, tl, d, stor = false) {   // armen bakom kroppen, snett upp och ut förbi kanten (som 062)
  if (tl < 0 || tl > d) return [f, p];
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * (stor ? 1.5 : 1.3) * tl), [a, b] = stor ? [80, 24] : [55, 14];
  return [f, { ...p, armar: [p.armar[0] + upp * (a + b * s), p.armar[1]], fram: [0, p.fram?.[1] || 0], luta: (p.luta || 0) + upp * (1.5 + 1.2 * s) }];
}
const nick = (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p];
const REAKTION = { '07': 'jatteglad', '07b': 'kawaii', '09': 'tanker', '09b': 'nyfiken', '11': 'kawaii', '12': 'jatteglad', '13': 'stolt', '13b': 'kawaii',
  '15': 'nyfiken', '15b': 'jatteglad', '16': 'skrattar', '16b': 'skrattar', '17': 'fnissig', '18': 'nyfiken', '19b': 'kawaii', '20': 'nyfiken',
  '20b': 'jatteglad', '21': 'nyfiken', '21b': 'kawaii', '21c': 'forvanad', '21d': 'jatteglad', '22': 'tanker', '22b': 'forvanad', '22c': 'kawaii',
  '23': 'jatteglad', '24': 'kawaii' };
const RAV_UPP = S('07') + 0.2;
function raven(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  switch (id) {
    case '07': { const [a, d] = VINK('07', 10, 2.2); [f, p] = vink(f, p, t - a, d); p.svans = 14 * Math.sin(t * 6) * bump(a, a + 3.2, t); break; }
    case '07b': { const u = k01((tl + 0.3) / 2.6); f = { ...f, titt: [-12, lerp(-14, 10, mjuk(u))] }; p.rikt = -0.25; f = L.blanda(f, 'kawaii', bump(SVAR('07b', 11) - r.s, r.d, tl)); break; }
    case '08': { const k = bump(MAL('08', 12) + 0.5, r.e ?? r.s + r.d + 0.3, t, 0.4);   // vinden: blundar, öronen fladdrar, lutar sig undan
      f = L.blanda(f, { ...B('glad'), sov: 1 }, k); p.oron = [k * (-10 + 6 * Math.sin(t * 13)), k * (-10 + 6 * Math.sin(t * 11 + 1))]; p.luta = (p.luta || 0) + 4 * k; break; }
    case '09': case '09b': { f = L.blanda({ ...f, kind: 1.2 }, 'ledsen', 0.35); if (id === '09b') f = L.blanda(f, { ...B('nyfiken'), titt: [0, 0] }, 0.6);
      p = L.blandaPose(p, 'magen', 0.8); break; }
    case '10': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-12, 8]; p.rikt = -0.35; break;
    case '11': f = L.blanda(L.blanda(B('nyfiken'), 'kawaii', mjuk((t - HD_KLAR) / 0.4)), 'jatteglad', bump(HD_UPP, HD_UPP + 1.4, t)); f.titt = [-12, 6]; p.rikt = -0.35 * (1 - mjuk((t - HD_UPP - 1.6) / 0.6));
      p.svans = 14 * Math.sin(t * 6) * bump(HD_UPP, HD_UPP + 2.5, t); break;
    case '12': [f, p] = nick(f, p, t - SVAR('12', 18)); break;
    case '13': { const u = k01((t - HD_GLID[0]) / (HD_GLID[1] - HD_GLID[0])); f = L.blanda(B('nyfiken'), 'kawaii', mjuk((t - HD_PA) / 0.4));
      f.titt = [lerp(-12, 0, mjuk(u)), lerp(4, 10, mjuk(u))]; p = L.blandaPose(p, 'magen', 0.8 * (1 - mjuk((t - HD_PA) / 0.5))); break; }
    case '13b': { const k = bump(MAL('13b', 20) + 0.6, MAL('13b', 21) + 0.3, t, 0.4);   // nosen ner i halsduken, blundar
      f = L.blanda(f, { ...B('kawaii'), sov: 1, titt: [0, 8] }, k); p.luta = (p.luta || 0) + 2 * k; p.strack = -0.02 * k; break; }
    case '15': p.rikt = 0.55 * mjuk((tl - 0.4) / 0.6); f = { ...B('nyfiken'), titt: [12, 2] }; break;
    case '15b': f = { ...f, titt: [0, 0] }; p.rikt = 0.25; [f, p] = nick(f, p, t - SVAR('15b', 23)); break;
    case '16': case '16b': f = L.blanda(f, 'jatteglad', bump(HOPP[0].t0, HOPP[1].t1 + 1.5, t, 0.3)); break;
    case '17': { const sk = LOV_AV - 0.5 - r.s; f = L.blanda(B('nyfiken'), 'fnissig', mjuk((tl - sk - 0.4) / 0.3)); f.titt = [0, -14 * (1 - mjuk((tl - sk) / 0.3))];
      if (tl > sk) [f, p] = L.skakaHuvud(f, p, tl - sk, 1.2, 1.0); break; }
    case '18': f = { ...B('nyfiken'), titt: [12 * Math.sin(tl * 1.3), 0] }; p.rikt = 0.45 * Math.sin(tl * 1.3); break;
    case '20': case '20b': f = { ...f, titt: [-12, 6] }; p.rikt = -0.3; break;
    case '21': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-10, 10]; p.rikt = -0.3 * mjuk((tl - 2.0) / 0.5); break;
    case '21b': { const k = bump(0.2, r.d - GLES, tl, 0.4); f = L.blanda(f, { ...B('kawaii'), sov: 1, titt: [-8, 12] }, k); p.rikt = -0.3; p.luta = (p.luta || 0) - 3 * k; p.strack = -0.02 * k; break; }
    case '21c': f = { ...B('nyfiken'), titt: [-14, -2] }; p.rikt = -0.45; break;
    case '21d': { f = { ...B('jatteglad'), titt: [-14, -2] }; p.rikt = -0.45; const a = MAL('21d', 38) + 2.0; [f, p] = vink(f, p, t - a, 2.2); break; }
    case '22': f = { ...B('nyfiken'), titt: [12, 4] }; p.rikt = 0.4; break;
    case '22b': f = L.blanda(B('nyfiken'), 'forvanad', bump(MAL('22b', 40) + 0.4, MAL('22b', 40) + 1.4, t)); f.titt = [12, 6]; break;
    case '22c': { const a = MAL('22c', 41) + 0.4; f = { ...B('glad'), titt: [10, 6] }; p.rikt = 0.35;
      if (t > a && t < a + 1.6) [f, p] = L.skakaHuvud(f, p, t - a, 1.6, 1.0);   // nej, den ska man inte äta
      const k = mjuk((t - MAL('22c', 42)) / 0.5); f = L.blanda(f, { ...B('kawaii'), titt: [12, 8] }, k); p.luta = (p.luta || 0) - 4 * k; break; }   // lutar sig fram och tittar
    case '23': f = { ...f, titt: [0, 0] }; [f, p] = nick(f, p, t - SVAR('23', 43)); break;
  }
  if (id === '24' || id === '25') { const n = id === '24' ? 44 : 49; [f, p] = vink(f, p, t - MAL(id, n), r.d - 0.4, true); }
  // fryser: darrar lätt, svansen tätt
  // Sanna 27/11 "less shaking": ett tydligt darr på "Brr", sedan bara små ryck då och då tills halsduken är på
  const darr = bump(DARR[0], DARR[1], t, 0.3); if (darr > 0) { const brr = bump(S('09') - 0.2, MAL('09', 13) + LN(13) + 0.4, t, 0.3), ryck = bump(0, 0.5, (t - S('09')) % 3.2, 0.12);
    p.luta = (p.luta || 0) + darr * Math.max(0.9 * brr, 0.4 * ryck) * Math.sin(2 * Math.PI * 7 * t); p.svans = (p.svans || 0) - 18 * darr; }
  const gr = gaRikt(t); if (gr) { p.rikt = gr; f = { ...f, titt: [12 * gr, 2] }; }   // går i riktningsposen, speglas aldrig
  // hoppen: hukar före, sträcker sig i luften
  for (const H of HOPP) { p = L.blandaPose(p, 'huka', bump(H.t0 - 0.35, H.t0 + 0.05, t, 0.2) + 0.6 * bump(H.t1 - 0.02, H.t1 + 0.3, t, 0.15));
    if (t > H.t0 && t < H.t1) { p.strack = 0.03; p.armar = [p.armar[0] + 20, p.armar[1] + 20]; } }
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

async function ritaRav(t) {
  const [x, y, z] = ravPos(t); rav.position.set(x, RAVKORT.y + y, z);
  const [f, p] = raven(t); L.rita(G, f, p);
  if (t > S('09') && t < S('09b')) { const e = G.querySelector('.nasa'), b = e.getBBox(), m = e.ownerSVGElement.getScreenCTM().inverse().multiply(e.getScreenCTM()), q = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(m); NOS = [q.x, q.y]; }
  $('halsen').setAttribute('display', t >= HD_PA ? 'inline' : 'none');
  // löven på huvudet: ett faller av när räven skakar, de andra sitter kvar
  $('huvudLov').setAttribute('display', t >= HUVUDLOV[0] && t < HUVUDLOV[1] ? 'inline' : 'none');
  $('huvudLov').querySelectorAll('.hlov').forEach((im, i) => { const a = LOV_AV_ALLA[i], u = k01((t - a) / 0.9), sid = i === 0 ? -1 : 1, [x0, y0, r0] = ['x', 'y', 'r'].map(k => +im.dataset[k]);
    im.setAttribute('transform', `translate(${x0 + sid * 70 * Math.sin(Math.PI * u)} ${lerp(y0, FOT - 30, u * u)}) rotate(${r0 + sid * 200 * u})`); im.setAttribute('opacity', (1 - k01((t - a - 1.0) / 0.4)).toFixed(2)); });
  // lövhögen: figuren nedåt i kortet, allt under kortets fot klipps bort
  const sj = SJUNK * iHogen(t); $('figurer').setAttribute('transform', `translate(0 ${sj.toFixed(1)})`);
  $('vattenKant').setAttribute('d', sj > 0.5 ? `M-400 -400H1600V${(FOT - 200 * iHogen(t)).toFixed(1)}H-400Z` : 'M-400 -400H1600V2000H-400Z'); $('vattenYta').innerHTML = '';
  // boil 2,5 px i bild och vit kant 3 px i bild, räknat mot kamerans skala
  const mitt = rav.position.clone().add(v3(0, 0.17, 0)), d = mitt.clone().sub(cam.position).dot(cam.getWorldDirection(v3())) || 3;
  const s = 540 / (d * Math.tan(cam.fov * Math.PI / 360)) * ENHET;
  $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1); $('boilStyrka').setAttribute('scale', (2.5 / s).toFixed(2));
  const ru = 3 / s;
  kantF.querySelector('feMorphology[result="d"]')?.setAttribute('radius', ru.toFixed(3));
  kantF.querySelector('feDisplacementMap')?.setAttribute('scale', (0.35 * ru).toFixed(3));
  const tu = kantF.querySelectorAll('feTurbulence'); tu[0]?.setAttribute('baseFrequency', (0.05 * s).toFixed(5)); tu[1]?.setAttribute('baseFrequency', (0.35 * s).toFixed(5));
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString($('kort'))], { type: 'image/svg+xml' }));
  stillBild.src = url; await stillBild.decode(); URL.revokeObjectURL(url);
  kortCtx.clearRect(0, 0, VB.w, VB.h); kortCtx.drawImage(stillBild, 0, 0, VB.w, VB.h); kortTex.needsUpdate = true;
}

// ---- korten: upp när boken öppnas, ner när den stängs (det främsta först, så att inget går genom något) ----
const OPPNA = S('01b'), STANG = S('26');
const ORDNING = [...BAK, ...SKOG, TRADET, EKHOST, STUBBEN, HOGBAK, HOGFRAM, ...EKOLLONEN, ...MARKLOV].sort((a, b) => a.z - b.z);
ORDNING.forEach((k, i, a) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); });
RAVKORT.upp = RAV_UPP; EKORREN.upp = S('21c') + 0.1; SVAMPEN.upp = S('18') + 0.2;
// ner: sakerna framifrån och bakåt, räven och ekorren sist (huvudpersonerna säger hej då längst), sedan pärmen
const NER = [...ORDNING, SVAMPEN].sort((a, b) => b.z - a.z);
NER.forEach((k, i, a) => k.ner = STANG + 0.3 + i * 0.5 / (a.length - 1));
EKORREN.ner = STANG + 0.9; RAVKORT.ner = STANG + 1.05; EKORREN.hog = RAVKORT.hog = 0.02;   // ligger överst när de fällts (över högen och svampen)
const PARM_NER = [STANG + 1.5, STANG + 2.2];
const SVAMP_UPP = MAL('22', 39) + 0.5, SVAMP_ORD = MAL('22b', 40) + 0.45;   // helt upp på "Titta, vid stubben" (Sanna 27/11), studsar på "svamp"

// ---- kritan ritar (som 062) ----
const skarm = p => { const q = p.clone().project(cam); return [(q.x + 1) * 960, (1 - q.y) * 540]; };
function affin(mesh, r) {   // bildens px (hela png:n) → skärmen (1920 × 1080)
  mesh.updateMatrixWorld(true); const g = mesh.geometry; g.computeBoundingBox(); const b = g.boundingBox;
  const varld = (ix, iy) => mesh.localToWorld(v3(lerp(b.min.x, b.max.x, (ix - r.ox) / r.w), lerp(b.max.y, b.min.y, (iy - r.oy) / r.h), 0));
  const cx = r.W / 2, cy = r.H / 2, d = r.W / 4, [x0, y0] = skarm(varld(cx, cy)), [x1, y1] = skarm(varld(cx + d, cy)), [x2, y2] = skarm(varld(cx, cy + d));
  const a = (x1 - x0) / d, b2 = (y1 - y0) / d, c = (x2 - x0) / d, e = (y2 - y0) / d;
  return { m: [a, b2, c, e, x0 - a * cx - c * cy, y0 - b2 * cx - e * cy], p: ([x, y]) => [a * x + c * y + x0 - a * cx - c * cy, b2 * x + e * y + y0 - b2 * cx - e * cy] };
}
const RIT = [];
function teckning(namn, href, r, mesh, T, fyll, vanta) { RIT.push({ namn, href, r, mesh, T, fyll, vanta, drag: KONTUR[namn] }); }
const KS = KRITAN.SKALA_SCEN * 1.25;
function ritaKritan(t) {
  let h = '';
  for (const D of RIT) {
    const { T, fyll: [f0, f1], r } = D;
    if (t < T.in[0] || t > Math.max(T.ut[1], f1 + 0.5)) continue;
    const A = affin(D.mesh(t), r), f = k01((t - f0) / (f1 - f0)), k = ritfart((t - T.rit[0]) / (T.rit[1] - T.rit[0]));
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
{ const a = S('03'), b = S('04'), c = S('10'), d = S('11'), va = MAL('03', 5) + 0.3, vc = MAL('10', 16) + 0.3;
  teckning('lov', LOV_URL, LOVRUTA, () => LOVET.m,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, va - 0.2], vanta: [va, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, b + 0.6], [230, -30]);
  teckning('halsduk', HD_URL, HD_R, () => HALSDUKKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, vc - 0.2], vanta: [vc, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, HD_KLAR], [260, 40]); }
const LOV_KLAR = S('04') + 0.6;
const KRONA = [S('05') + 0.9, S('05') + 3.6];   // höstfärgen breder ut sig från lövet, från "Så många löv" till "röda och gula"

// ---- löven som faller (rad 06–09), vinden (rad 08 och 13b) ----
// [start, längd, x0, y0 (över sidan), z, dx (vinden)]
const FALL = [[S('06') + 0.6, 3.2, -0.3, 0.6, -0.06, 0.06], [S('06') + 2.0, 3.0, -0.52, 0.55, -0.02, -0.05], [S('07') + 0.2, 3.0, -0.24, 0.62, 0.04, 0.05],
  [S('07b') - 0.4, 3.2, 0.07, 0.5, 0.33, 0.12],   // räven följer det med blicken: det bruna lövet seglar ner framför nosen
  ...[0, 1, 2, 3, 4].map(i => [MAL('08', 12) + 0.5 + i * 0.25, 2.4, -0.62 + i * 0.1, 0.55 + 0.05 * (i % 3), -0.08 + 0.03 * i, 0.6 + 0.08 * i])];
const FALL_UT = S('10');
// två löv som singlar ner i långa pauser (QA Rörelse 2): från högens topp när räven tittar på oss (15b), från eken medan barnet letar ekollon (20)
const SING = [[S('15b') + 3.0, 2.4, HOG.x - 0.08, 0.32, HOG.z + 0.14, -0.14, S('17')], [S('20') + 1.6, 3.0, -0.7, 0.62, 0.12, 0.08, S('22')]];   // borta när kritan ritar halsduken (de skulle annars räknas som markens löv i rad 19)
function lov(t) {
  FALLER.forEach((m, i) => { const F = FALL[i]; m.visible = !!F && t >= F[0] && t < FALL_UT; if (!m.visible) return;
    const [t0, d, x0, y0, z, dx] = F, u = k01((t - t0) / d), vind = dx > 0.3;
    if (u < 1) { m.position.set(x0 + dx * mjuk(u) + (vind ? 0.02 : 0.05) * Math.sin(2 * Math.PI * 1.3 * u + i), SIDA + 0.003 + y0 * (1 - u), z);
      m.rotation.set(0.3 * Math.sin(u * 7 + i), 0.5 * Math.sin(u * 5), (vind ? 6 : 2.5) * u + i); }
    else { m.position.set(x0 + dx, SIDA + 0.002 + i * 0.0002, z); m.rotation.set(-Math.PI / 2, 0, i * 1.3); } });
  SINGEL.forEach((m, i) => { const [t0, d, x0, y0, z, dx, ut] = SING[i], u = k01((t - t0) / d); m.visible = t >= t0 && t < ut; if (!m.visible) return;
    if (u < 1) { m.position.set(x0 + dx * mjuk(u) + 0.04 * Math.sin(2 * Math.PI * 1.1 * u + i), SIDA + 0.003 + y0 * (1 - u), z); m.rotation.set(0.3 * Math.sin(u * 6 + i), 0.5 * Math.sin(u * 4), 2.5 * u + i); }
    else { m.position.set(x0 + dx, SIDA + 0.002, z); m.rotation.set(-Math.PI / 2, 0, i * 1.3 + 0.4); } });
  // lövyran ur högen: upp i en båge och ner i högen igen (rad 16, 16b); två löv lyfter på "Hej då, lövhögen" (24d)
  const yr = YR.findLast(a => t >= a && t < a + 1.6), yh = MAL('24d', 47) + 0.2;
  YRA.forEach((m, i) => { const a = i / 10 * Math.PI * 2, v = 0.7 + 0.3 * ((i * 7) % 5) / 5;
    if (yr != null) { const u = (t - yr) / 1.6, y = 0.35 * v * Math.sin(Math.PI * Math.min(1, u * 1.1));
      m.visible = y > 0.02; m.position.set(HOG.x + Math.cos(a) * 0.14 * u * v, SIDA + 0.1 + y, HOG.z + 0.03 + Math.sin(a) * 0.03); m.rotation.set(0.2, 0, a * 1.7 + 5 * u); }
    else if (i < 2 && t >= yh && t < yh + 1.2) { const u = (t - yh) / 1.2; m.visible = true;
      m.position.set(HOG.x - 0.05 + i * 0.1, SIDA + 0.2 + 0.08 * Math.sin(Math.PI * u), HOG.z + 0.02); m.rotation.set(0.2, 0, i + 3 * u); }
    else m.visible = false; });
  // vinden
  const w8 = bump(MAL('08', 12) + 0.4, S('09') + 0.2, t, 0.4), w13 = bump(MAL('13b', 21) + 0.6, MAL('13b', 21) + 3.2, t, 0.5), w = Math.max(w8, 0.45 * w13);
  VIND.visible = w > 0.01; VIND.material.opacity = 0.85 * Math.max(w8, w13);
  VIND.material.depthTest = w8 >= w13; VIND.renderOrder = w8 >= w13 ? 0 : 10;   // i närbilden alltid framför rävens kort
  if (w8 >= w13) { VIND.scale.setScalar(1); VIND.position.set(-0.25 + 0.5 * k01(((t - MAL('08', 12)) % 4) / 4), SIDA + 0.42, 0.15); }
  else { const h = fig2varld([430, 700]), u = k01((t - MAL('13b', 21) - 0.6) / 2.6);   // rad 13b är en närbild: en mindre krumelur blåser förbi rävens halsduk
    VIND.scale.setScalar(0.32); VIND.position.set(h.x - 0.2 + 0.4 * u, h.y, h.z + 0.08); }
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3) + 0.06 * k01((t - MAL('08', 12)) / 3);
  TRADET.m.rotation.z = 0.025 * Math.sin(t * 1.1) + 0.03 * w * Math.sin(t * 4);
}
function puff(t) {   // andningspuffen vid nosen (rad 09): ut från nosen, fram och lite åt sidan, under ögonen
  const pu = ((t - S('09') - 0.6) % 1.4) / 1.0; PUFF.visible = t > S('09') + 0.6 && t < S('09b') && pu < 1;
  if (PUFF.visible) { const n = fig2varld(NOS); PUFF.position.set(n.x + 0.006 + 0.15 * pu, n.y + 0.012 - 0.01 * pu, n.z + 0.03 + 0.04 * pu); PUFF.scale.setScalar(0.8 + 1.4 * pu); PUFF.material.opacity = 0.95 * Math.sin(Math.PI * pu) ** 0.6; }
}

// ---- ekorren (rad 21c, 21d, 24b): tittar fram bakom stammen, skuttar till ekollonen, tar ett och skuttar tillbaka ----
// ekorren tittar åt höger och vänds aldrig: skutten går rakt fram mot kameran, inte baklänges åt vänster (QA Rörelse 6)
const EKP = { svans: [EK.x - 0.1, EK.z - 0.06], uppe: [EK.x - 0.11, EK.z + 0.14], mitt: [EK.x - 0.115, EK.z + 0.19], ekollon: [EKOLLON_POS[0][0] - 0.04, EKOLLON_POS[0][1] - 0.04] };
const E0 = MAL('21d', 38);
const SKUTT = [[E0 + 0.05, E0 + 0.45, 'svans', 'uppe', 0.05], [E0 + 0.8, E0 + 1.1, 'uppe', 'mitt', 0.04], [E0 + 1.3, E0 + 1.6, 'mitt', 'ekollon', 0.04],
  [E0 + 2.3, E0 + 2.8, 'ekollon', 'uppe', 0.06], [MAL('24b', 45) + 0.1, MAL('24b', 45) + 0.6, 'uppe', 'uppe', 0.06]];
const TAR = E0 + 1.9;
function ekorrPos(t) {
  let [x, z] = EKP.svans, y = 0;
  for (const [a, b, f, g, h] of SKUTT) { if (t >= b) [x, z] = EKP[g]; else if (t >= a) { const u = (t - a) / (b - a), m = mjuk(u);
    x = lerp(EKP[f][0], EKP[g][0], m); z = lerp(EKP[f][1], EKP[g][1], m); y = h * Math.sin(Math.PI * u); } }
  return [x, y, z];
}

// ---- siffrorna 1, 2, 3 i krita över ekollonen när Malin räknar (Sanna 27/11 "show numbers too"; samma siffror som 065) ----
const SIFFRA_D = [['M30 38 L56 14 L56 128'], ['M20 46 C20 6 88 4 86 46 C84 78 40 96 18 128 L90 128'],
  ['M22 26 C44 4 90 12 82 44 C77 64 52 68 44 68 C62 68 92 76 86 102 C80 136 30 136 16 112']];
function siffror(t, ord) {
  const slut = S('21') + 0.6; if (t > slut + 0.1) return ''; let h = '';
  EKOLLONEN.forEach((k, i) => { const t0 = ord[i]; if (t < t0) return;
    const p = k.m.position.clone().add(v3(0, 0.078, 0)), [x, y] = skarm(p), [, y2] = skarm(p.clone().add(v3(0, 0.045, 0))), s = Math.abs(y - y2) / 140;
    const kk = ritfart((t - t0) / 0.4), op = k01((slut - t) / 0.3);
    h += `<g transform="translate(${(x - 50 * s).toFixed(1)} ${(y - 70 * s).toFixed(1)}) scale(${s.toFixed(4)})" opacity="${op.toFixed(2)}">`
      + ritBana(SIFFRA_D[i], kk, { attr: `fill="none" stroke="#FFF" stroke-width="${(KRITAN.BRED * 2.4 / s).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"` }).html
      + ritBana(SIFFRA_D[i], kk, { attr: `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${(KRITAN.BRED / s).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"` }).html + '</g>'; });
  return h;
}

// ---- en bildruta ----
// glimtarnas gnistor i 60 % storlek (Sanna 27/11 "smaller sparkles"); kritans gnistor när en teckning fylls är kvar som förut
const glimt = (t, t0, p, r = 90, n = 4, s = 0.6) => { if (t < t0 || t > t0 + 1.2) return ''; const [x, y] = skarm(p);
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s}) translate(${(-x).toFixed(1)} ${(-y).toFixed(1)})">${gnistor(x, y, r / s * 0.8, t - t0, n)}</g>`; };
async function bildruta(t) {
  const vi = Math.max(0, VYER.findLastIndex(w => w.t <= t)), v = VYER[vi];
  if (v.fov0 != null && v.fov0 !== v.fov) {   // fov glider med (kamera3d byter fov tvärt per vy), samma kurva som glid
    const e = 0.5 - 0.5 * Math.cos(Math.PI * k01((t - v.t) / ((VYER[vi + 1]?.t ?? DURATION) - v.t)));
    cam.fov = lerp(v.fov0, v.fov, e); cam.updateProjectionMatrix(); cam.updateMatrixWorld(); }
  const oppen = t < STANG ? k01((t - OPPNA) / 0.9) : 1 - k01((t - PARM_NER[0]) / (PARM_NER[1] - PARM_NER[0]));   // satt() mjukar själv (slaUpp); mjuk här gav ett slag på 0,2 s
  satt(PARM0 + (PARM1 - PARM0) * oppen);
  for (const k of [...ORDNING, EKORREN, SVAMPEN]) {
    let e = k.upp != null ? reser((t - k.upp) / 0.45) : 0;
    if (k === SVAMPEN) e = t < SVAMP_UPP ? 0.45 * mjuk((t - k.upp) / 0.5) : 0.45 + 0.55 * reser((t - SVAMP_UPP) / 0.35);   // hatten tittar fram, sedan helt upp
    if (k.ner != null) e *= 1 - mjuk((t - k.ner) / 0.35);
    vik(k, e); if (k.flik) k.flik.visible = e > 0.6;
    if (k.vaj !== undefined) k.m.rotation.z = 0.02 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  EKORREN.m.visible = t >= EKORREN.upp; SVAMPEN.m.visible = t >= SVAMPEN.upp;
  // eken: kal, kritans löv, kronan som växer ut från lövet
  krona(t < KRONA[0] ? 0 : (t - KRONA[0]) / (KRONA[1] - KRONA[0]));
  // kritans löv vajar lite på grenen och lugnar sig medan kronan byter färg; när den är klar sitter lövet inritat i kronan
  LOVET.m.visible = t >= LOV_KLAR - 0.05 && t < KRONA[1];
  LOVET.m.rotation.z = 0.06 * Math.sin((t - LOV_KLAR) * 1.6) * k01((t - LOV_KLAR) / 0.8) * (1 - mjuk((t - KRONA[0]) / (KRONA[1] - KRONA[0])));
  EKHOST.m.scale.setScalar(1 + 0.025 * bump(MAL('24c', 46) + 0.3, MAL('24c', 46) + 1.0, t, 0.2) + 0.015 * bump(KRONA[1] - 0.5, KRONA[1] + 0.5, t, 0.3));
  // svampen studsar (rad 24e), stubben och svampen glimtar
  SVAMPEN.m.scale.setScalar(1 + 0.12 * Math.max(bump(SVAMP_UPP, SVAMP_UPP + 0.5, t, 0.15), bump(SVAMP_ORD, SVAMP_ORD + 0.5, t, 0.15), bump(MAL('24e', 48) + 0.2, MAL('24e', 48) + 0.8, t, 0.2)));
  HOGBAK.m.scale.set(1 + 0.03 * bump(MAL('24d', 47) + 0.1, MAL('24d', 47) + 1.2, t, 0.3) * Math.sin(t * 14), 1, 1);
  // markens löv studsar på sina färgord (rad 19b)
  const ORD = [30, 31, 32].map(n => MAL('19b', n) + 0.25), hejLov = MAL('24c', 46) + 0.3;
  MARKLOV.forEach((k, i) => { const h = Math.max(bump(ORD[i], ORD[i] + 0.6, t, 0.2), 0.7 * bump(hejLov + i * 0.12, hejLov + 0.6 + i * 0.12, t, 0.2));
    k.m.position.y += 0.03 * h; k.m.scale.setScalar(1 + 0.2 * h); });
  // ekorren
  { const [x, y, z] = ekorrPos(t); EKORREN.m.position.set(x, SIDA + y, z);
    const bl = ((t + 1.3) % 3.6) < 0.14; EKORREN.m.material.map = EKORREN.m.customDepthMaterial.map = bl ? EKORRE_BLUND : EKORRE; }
  // ekollonet ekorren tar: följer med i famnen, ligger kvar hos den
  { const k = EKOLLONEN[0]; if (t >= TAR) { const [x, y, z] = ekorrPos(t); k.m.position.set(x + 0.045, SIDA + y + 0.035 * k01((t - TAR) / 0.25), z + 0.012); }
    else k.m.position.set(k.x, k.y, k.z); }
  // halsduken: ligger där kritan ritade den, reser sig, glider i en båge till rävens hals
  { const K = HALSDUKKORT; K.m.visible = t >= HD_KLAR - 0.05 && t < HD_PA; K.flik.visible = K.m.visible && t > HD_UPP + 0.3 && t < HD_GLID[0];
    K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - HD_UPP) / 0.45)); K.m.position.set(K.x, K.y, K.z); K.m.scale.setScalar(1);
    // landar exakt där riggens halsduk sitter och lika stor (inget hopp vid bytet), i en låg båge under hakan; ingen skugga på räven under glidningen
    K.m.castShadow = t < HD_GLID[0];
    if (t >= HD_GLID[0] && t < HD_PA) { const u = mjuk((t - HD_GLID[0]) / (HD_GLID[1] - HD_GLID[0])), mal = fig2varld([HD_MAL.x, HD_MAL.y]), sx = lerp(1, HD_MAL.b / K.w, u), sy = lerp(1, HD_MAL.h / K.h, u);
      K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y - K.h * sy / 2, u) + 0.025 * Math.sin(Math.PI * u), lerp(K.z, mal.z + 0.02, u)); K.m.scale.set(sx, sy, 1); } }
  lov(t);
  vik(RAVKORT, reser((t - RAV_UPP) / 0.65) * (1 - mjuk((t - RAVKORT.ner) / 0.35))); rav.visible = t >= RAV_UPP;
  await ritaRav(t); puff(t);
  bokeh.uniforms.focus.value = cam.position.distanceTo(v.mal); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002;
  scen.updateMatrixWorld(true);
  // kritan och glimtarna i #ov
  let ov = ritaKritan(t);
  MARKLOV.forEach((k, i) => { const p = k.m.position.clone().add(v3(0, 0.07, 0)); ov += glimt(t, ORD[i], p); ov += glimt(t, hejLov + i * 0.12, p, 70, 3); });
  const ORD3 = [3.08, 4.01, 4.94].map(s => MAL('20b', 34) + s);   // "Ett … två … tre" (34-vi-raknar-snabb, pauserna kortade)
  ov += siffror(t, ORD3);
  EKOLLONEN.forEach((k, i) => { const h = bump(ORD3[i], ORD3[i] + 0.5, t, 0.15); k.m.scale.setScalar(1 + 0.25 * h); ov += glimt(t, ORD3[i], k.m.position.clone().add(v3(0, 0.03, 0)), 60, 3); });
  ov += glimt(t, KRONA[1] - 0.4, v3(EK.x + 0.05, SIDA + 0.72, EK.z), 150, 5);   // kronan är klar
  ov += glimt(t, SVAMP_ORD, SVAMPEN.m.position.clone().add(v3(0, 0.1, 0)), 80, 4);
  ov += glimt(t, hejLov, v3(EK.x, SIDA + 0.75, EK.z), 160, 5) + glimt(t, MAL('24e', 48) + 0.2, SVAMPEN.m.position.clone().add(v3(0, 0.1, 0)), 80, 4)
    + glimt(t, MAL('24b', 45) + 0.3, EKORREN.m.position.clone().add(v3(0, 0.12, 0)), 70, 3) + glimt(t, S('01a') + 0.2, v3(0, SIDA + 0.1, 0.2), 120, 4);
  $('ov').innerHTML = ov;
  komp.render();
}

// ---- kameran: vyerna ur storyboarden, en svag glidning i varje ----
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  ek: () => [v3(EK.x + 0.28, 0.66, 2.6), v3(EK.x + 0.38, 0.52, EK.z), 21],   // längre bort och smalare: hela kronan, men himlens kanter och bordet syns inte
  gren: () => [LOVPOS.clone().add(v3(0.04, LOVH / 2, 0.58)), LOVPOS.clone().add(v3(0, LOVH / 2, 0)), 32],   // lövet ca 45 % av bildhöjden, samma fov som ek (glidningarna)
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.26, 0.64)), g.clone().add(v3(0, 0.21, 0)), 28],   // öronen med
  nos: g => [g.clone().add(v3(-0.07, 0.22, 0.8)), g.clone().add(v3(-0.07, 0.17, 0)), 28],   // räven hel och ekollonen vid fötterna (21b: räven luktar på dem, QA förbättring 4)
  bred: () => [v3(0, 0.6, 1.8), v3(0, 0.34, -0.2), 28],
  halsduk: () => [v3(-0.06, 0.36, 1.12), v3(-0.06, 0.17, 0.26), 30],   // hela räven och halsduken på marken
  hog: () => [v3(HOG.x - 0.14, 0.5, HOG.z + 1.08), v3(HOG.x - 0.14, 0.25, HOG.z + 0.02), 30],   // vidare än storyboarden: hoppet syns helt
  uppslag: () => [v3(0, 0.98, 1.8), v3(0, 0.12, 0.0), 28],   // fov 28: bokens kant syns inte
  ekmark: () => [v3(-0.3, 0.42, 0.95), v3(-0.33, 0.13, 0.02), 30],
  ekollon: () => [v3(-0.38, 0.22, 0.42), v3(-0.38, 0.1, 0.06), 28],
  stam: () => [v3(-0.3, 0.42, 0.95), v3(-0.3, 0.2, -0.04), 30],   // ekorren vid stammen och hela räven vid ekollonen
  stubbe: () => [v3(0.72, 0.4, 1.1), v3(0.48, 0.2, 0.0), 28],   // tittar lite åt vänster (sidans högra kant syns inte); räven ryms vid svampen (22b, 24e)
  'rav-svamp': () => [v3(0.68, 0.42, 1.0), v3(0.5, 0.2, 0.08), 30],
  hejda: g => [g.clone().add(v3(0.18, 0.34, 0.95)), g.clone().add(v3(-0.18, 0.2, -0.3)), 32],
  slut: () => [v3(-0.1, 2.3, 2.9), v3(0, 0.1, 0.05), 32],   // den stängda boken hel och i mitten, också efter pushen (062:s läge skar pärmens främre hörn)
};
const SLUT_GLID = 1.5;   // ute vid slut innan pärmen börjar fällas (PARM_NER[0])
// planeraren tittar alltid på platsen + [x, y, 0]: blickpunkten flyttas längs blicken till platsens z, annars rycker blicken när en glidning börjar
const paZ = (p, m, z) => { const k = (z - p.z) / (m.z - p.z); return k > 0 && isFinite(k) ? p.clone().lerp(m, k) : m; };
const lage = (pos, mal, P) => [Math.atan2(pos.x - P[0], pos.z - P[2]) * 180 / Math.PI, Math.hypot(pos.x - P[0], pos.z - P[2]), pos.y - P[1], mal.x - P[0], mal.y - P[1]];
const fran3 = (l, P) => { const a = l[0] * Math.PI / 180; return [v3(P[0] + l[1] * Math.sin(a), P[1] + l[2], P[2] + l[1] * Math.cos(a)), v3(P[0] + l[3], P[1] + l[4], P[2])]; };
const skjut = l => [l[0] + 1.2, l[1] * 0.965, l[2] * 0.985, l[3], l[4]];
satt(PARM1); scen.updateMatrixWorld(true);
const platser = {}, VYER = [];
const blurFor = n => /nara|ekollon|gren/.test(n) ? 0.008 : /halv|halsduk|hog|stam|stubbe|svamp|ekmark/.test(n) ? 0.006 : 0.003;
function vy(t, namn, g, o = {}) {
  const [pos, mal, fov] = VY[namn](g), P = o.P || [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  const fran = o.fran || lage(pos, mal, P);
  VYER.push({ t, mot: key, fran, till: o.till || skjut(fran), fov, mal: o.mal || mal, blur: blurFor(namn) });
}
function glid(t0, d, namn, g) {   // kameran glider från förra vyns läge till nästa vy
  const f = VYER.at(-1), [p0, m0] = fran3(f.till ?? f.fran, platser[f.mot]), [pos, mal, fov] = VY[namn](g);
  const P = [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  VYER.push({ t: t0, mot: key, fran: lage(p0, paZ(p0, m0, P[2]), P), till: lage(pos, mal, P), fov, fov0: f.fov, mal, blur: blurFor(namn), rorelse: 'glid' });
  vy(t0 + d, namn, g);
}
const GLID = { '02': [0, 1.6], '03': [0, 1.2], '05': [0.1, 1.3], '21c': [0, 1.2] };   // in mot eken; in mot grenen (samma träd: glid, inte klipp); ut från grenen till eken; från räven och ekollonen till stammen (21c)
const P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0), inL = lage(...VY.in().slice(0, 2), P0);
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'logga' ? 'bord' : r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (VY[namn].length ? r.st.plats : '');
  if (r.id === '01a') { vy(r.s, 'bord', g, { P: P0, fran: [bordL[0] - 7, bordL[1] * 1.07, bordL[2] * 1.05, bordL[3], bordL[4]], till: bordL, mal: v3(0, 0.25, -0.1) }); forra = 'bord'; continue; }
  if (r.id === '01b') { VYER.at(-1).till = bordL; vy(r.s + 0.9, 'in', g, { P: P0, fran: bordL, till: inL, mal: v3(0, 0.32, -0.2) }); forra = 'in'; continue; }
  if (r.id === '26') {   // ut ur boken: glider ut till slut-läget innan pärmen fälls (den får aldrig gå genom blicken), sedan en långsam push mot den stängda boken
    const f = VYER.at(-1), [pos, mal] = fran3(f.till, platser[f.mot]), [sp, sm] = VY.slut(), sl = lage(sp, paZ(sp, sm, P0[2]), P0); platser.pBord = P0;
    VYER.push({ t: r.s, mot: 'pBord', fran: lage(pos, paZ(pos, mal, P0[2]), P0), till: sl, fov: 32, mal: sm, blur: 0.003, rorelse: 'glid' });
    VYER.push({ t: r.s + SLUT_GLID, mot: 'pBord', fran: sl, till: [sl[0], sl[1] * 0.95, sl[2] * 0.95, sl[3], sl[4]], fov: 32, mal: sm, blur: 0.003, rorelse: 'glid' }); continue; }
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
VYER.sort((a, b) => a.t - b.t);
const plan = kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd: DURATION });

// ---- ljudet: Malin, räven och effekterna ur raderna, kritans ritljud som slinga, skogen lågt under allt ----
const EF = 'assets/ljud/effekter/';
const VOL = f => /rav-/.test(f) ? 1.5 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|hopp-mjuk|landa-mjuk)/.test(f) ? 0.7 : 1.0;
const LJUD = [];
for (const r of RAD) {
  for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `assets/ljud/roster/hosten-i-boken/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
  for (const [f, o, v] of r.ljud || []) if (!/^(krita-ritar|skogsljud)\//.test(f)) LJUD.push({ t: r.s + o, fil: EF + f + (/\.\w+$/.test(f) ? '' : '.m4a'), vol: VOL(f) * (v != null ? v / 0.7 : 1) });
}
for (const [i, D] of RIT.entries()) LJUD.push({ t: D.T.rit[0], fil: EF + `krita-ritar/krita-ritar-${i + 1}.m4a`, vol: 1.2, langd: D.T.rit[1] - D.T.rit[0] + 0.3, loop: true, fade: 0.4 });
LJUD.push({ t: 0, fil: EF + 'skogsljud/skogsljud-1.m4a', vol: 0.25, langd: DURATION, loop: true, fadeIn: 1.0, fade: 2.0 });
LJUD.push(...plan.ljud);
window.LJUD = LJUD.filter(c => c.t < DURATION).sort((a, b) => a.t - b.t);
window.DURATION = DURATION; window.VYER = VYER;
window.TIDER = Object.fromEntries(RAD.map(r => [r.id, +r.s.toFixed(2)]));
window.seek = t => plan.rita(t, () => bildruta(t));
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
