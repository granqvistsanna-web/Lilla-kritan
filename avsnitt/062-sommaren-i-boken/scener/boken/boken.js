// 062 Sommaren i boken, grind 6: hela scenen i Kritans bok. Boken och uppslaget som storyboarden (storyboard/scen.js), rörelserna
// som prov 2 (produktion/three-rum/popupbok/bok.js), kameran som vyer (verktyg/kamera3d.mjs), raderna ur rader.json.
// Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/062-sommaren-i-boken/scener/boken --snabb
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
// rader.mjs direkt (läget per rad, st, finns inte i rader.json; rader.json skrivs för qa-verktygen)
const { RADER, ROST, GLES } = await import('/avsnitt/062-sommaren-i-boken/storyboard/rader.mjs'); let acc = 0;
const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, st: r.s, s }; });
const RR = Object.fromEntries(RAD.map(r => [r.id, r])), S = id => RR[id].s, LN = n => ROST[n - 1][1];
const DURATION = acc, rad = t => RAD[Math.max(0, RAD.findLastIndex(r => r.s <= t))];
const SVAR = (id, n) => S(id) + RR[id].malin.find(m => m[0] === n)[1] + LN(n) + 0.2;   // grodans svar: 0,2 s efter Malins replik n

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
const [GRAN, BUSKE, DAMM, BLAD, NACKROS, VASS, GRODA, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, HINK, BLOMMOR, SAND] = await Promise.all([
  B + 'skogen-gron-saker/gran.png', B + 'skogen-gron-saker/barbuske.png', B + 'dammen-saker/damm.png', B + 'dammen-saker/blad.png',
  B + 'dammen-saker/nackros.png', B + 'dammen-saker/vass.png', P + 'gurra.png',
  ...['himmel', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten', 'hink', 'blommor', 'sand'].map(n => P + n + '.png')].map(lad));
// solen och glassen: kritan ritar dem, så konturen (bildens egna px) måste kunna läggas på den beskurna bilden: ruta = beskärningen
function ruta(i) {
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, u); x1 = Math.max(x1, u); }
  return { ox: x0 - 1, oy: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3, W: i.width, H: i.height };
}
const [SOL_I, GLASS_I] = await Promise.all([bild(RQ + 'sol-gul/cut/sol-gul.png'), bild(RQ + 'glass-rosa/cut/glass-rosa.png')]);
const SOL = tex(trim(SOL_I)), GLASS = tex(trim(GLASS_I));
const KONTUR = Object.fromEntries(await Promise.all(['sol-gul', 'glass-rosa'].map(async s => { const j = await (await fetch(`${RQ}${s}/cut/${s}-kontur.json`)).json(); return [s, [j.d, ...(j.detaljer || [])]]; })));
// den tomma struten: glassen utan kulan (kulan slutar ca y 200 i bilden)
const KON_C = duk(GLASS_I.width, GLASS_I.height); { const x = KON_C.getContext('2d'); x.drawImage(GLASS_I, 0, 0); x.clearRect(0, 0, KON_C.width, 196); }
const KON = tex(trim(KON_C));
const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
const GLASS_URL = await dataUrl(RQ + 'glass-rosa/cut/glass-rosa.png'), KON_URL = KON_C.toDataURL();

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
const PARM0 = 0.5, PARM1 = 1.4;
const { insida, satt } = await skapaBok(scen, { farg: '#E8683A', figur: GRODA.image, doodles: true, oppna: [PARM0, PARM1] });

// ---- uppslaget (som storyboarden) ----
// Kontaktskuggan vid kortets fot: en mjuk, rund skugga i stället för den gröna vikfliken, som såg ut som en fyrkantig skugga (Sanna 27/11)
const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(28,52,18,0.42)'); g.addColorStop(0.55, 'rgba(28,52,18,0.16)'); g.addColorStop(1, 'rgba(28,52,18,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
const KORT = [];
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); scen.add(m);
  const k = { m, x, y: m.position.y, z, h, hog: 0.002, vaj: o.vaj };
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.07), KSKUGGA); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0009, z + 0.012); f.renderOrder = 1; scen.add(f); k.flik = f; }
  KORT.push(k); return k;
}
const vik = (k, e) => { k.m.rotation.x = Math.PI / 2 * (1 - e); k.m.position.y = k.y + k.hog * (1 - k01(e * 4)); };   // e 0 = nedfälld framåt, 1 = står
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}
const BAK = [kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47)];
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);
const SOLEN = pa(SOL, 0.34, 0.12, 0.82);
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
const SKOG = [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [-0.46, -0.34, 0.44], [0.38, -0.38, 0.56], [0.66, -0.33, 0.46], [0.94, -0.4, 0.6]].map(([x, z, h]) => kort(GRAN, h, x, z));
// Blommorna bakom busken (Sanna 27/11: "dont hide flowers as much"): högre och bredare än i storyboarden, ungefär halva blomhuvudena syns
const BLOMMOR_BAK = kort(BLOMMOR, 0.42, 1.03, -0.22, { flik: false }); BLOMMOR_BAK.m.scale.x = 0.8;
const BUSKAR = [kort(BUSKE, 0.3, -0.12, -0.3), kort(BUSKE, 0.26, 1.02, -0.14)];
{
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#6CC04A', '#8ED46A', '#56A83A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
platt(DAMM, 1.45, -0.02, 0.06, 0.7);
const BLADPOS = { 1: [-0.24, 0.08], 2: [0.45, -0.07], 3: [0.79, 0.04], bad: [0.1, 0.0] };   // 3 = stranden vid blommorna, bad = mitt i dammen
platt(BLAD, 0.3, ...BLADPOS[1], undefined, SIDA + 0.003); platt(BLAD, 0.3, ...BLADPOS[2], undefined, SIDA + 0.003);
const SMATT = [kort(NACKROS, 0.1, 0.12, 0.3, { y: SIDA + 0.004, flik: false }), kort(VASS, 0.46, -0.84, 0.2, { vaj: 0 }), kort(VASS, 0.34, 0.62, -0.25, { vaj: 2 })];
const HINKEN = kort(HINK, 0.27, 0.36, 0.6), SLOTTET = kort(SAND, 0.24, 0.62, 0.62), BLOMMOR_UPPE = kort(BLOMMOR, 0.26, 0.98, 0.2);
const GLASSKORT = kort(GLASS, 0.24, -0.6, 0.48, { y: SIDA + 0.003 }), KONKORT = kort(KON, 0.1, 0, 0, { flik: false });
const GLASS_R = ruta(GLASS_I), SOL_R = ruta(SOL_I);
// Grodan badar (Sanna 27/11, "have frog bada in dammen"): ett vågkort i kod fälls upp framför henne på "plask", så att bara
// överkroppen syns, som i en pop-up-bok. Hon står på sidan bakom vågorna, inget går genom sidan.
const VAG = (() => { const w = 1024, h = 300, c = duk(w, h), x = c.getContext('2d'), N = 7;
  const form = () => { x.beginPath(); x.moveTo(14, h - 14); x.lineTo(14, 120);
    for (let i = 0; i < N; i++) { const a = 14 + i * (w - 28) / N, b = a + (w - 28) / N; x.bezierCurveTo(a + 30, 30, b - 60, 30, b - 10, 120); }
    x.lineTo(w - 14, h - 14); x.closePath(); };
  x.strokeStyle = x.fillStyle = '#FFF'; x.lineWidth = 26; x.lineJoin = 'round'; form(); x.fill(); x.stroke();
  const g = duk(w, h); kritYta(g.getContext('2d'), w, h, '#5FAEDD', '#93D0F2', '#3F8DC4', 0.7);
  x.save(); form(); x.clip(); x.drawImage(g, 0, 0);
  x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 10; x.lineCap = 'round';
  for (let i = 0; i < N; i++) { const a = 14 + i * (w - 28) / N; x.beginPath(); x.moveTo(a + 40, 110); x.quadraticCurveTo(a + 70, 70, a + 105, 92); x.stroke(); }
  x.restore(); return tex(c); })();
const VAGKORT = kort(VAG, 0.17, BLADPOS.bad[0], BLADPOS.bad[1] + 0.07, { flik: false });
const STANK = new THREE.Group(); for (let i = 0; i < 16; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.011 + 0.006 * (i % 3), 10, 8), mat(null, { color: '#CFEFFF', emissive: '#4b8fb8', emissiveIntensity: 0.3 }));
  d.userData = { a: i / 16 * Math.PI * 2 + 0.3 * Math.sin(i * 7), v: 0.7 + 0.3 * ((i * 5) % 4) / 3 }; STANK.add(d); } scen.add(STANK);

// ---- grodan: v2-riggen på ett kort ----
// HAND finns inte i grodans uttryck.html (Gurra har inget referensark än): händerna mätta ur gurra-arm-l/-r.png (yttersta klumpen),
// munnen ur ansiktets mått (MUNX 514, munbågen kring y 384). Bara i den här scenen, riggen ändras inte.
window.HAND = { l: [180, 668], r: [838, 665], kant: 8, mun: [514, 392] };
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, FOT = 926;
const L = await v2rigg('grodan-gurra'), G = L.figur(512, FOT, 1, $('figurer'));
G.querySelector('.skugga')?.setAttribute('display', 'none');
const SAK = L.sakBild(GLASS_URL, GLASS_I.width, GLASS_I.height, { grepp: [126, 300], fot: [126, 414], skala: 0.5, folj: 0, kant: 4, mat: true, mun: [118, 40], bett: [[172, 40, 50]] });
L.sakIn(G, SAK);
await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
window.kant.lagg(G); const kantF = $('defs').lastElementChild;
const BL = skapaBlinka(62);
// droppar ritade i riggens ruta (de får figurens vita kant): glassdroppen (faller, och på nosen i .drag som följer huvudet) och vattendroppar
const NOS = [514, 318];
G.insertAdjacentHTML('beforeend', '<g id="dropparG"></g>');
(G.querySelector('.drag') || G).insertAdjacentHTML('beforeend', `<circle id="nosDroppe" cx="${NOS[0]}" cy="${NOS[1]}" r="17" fill="#FF6FAE" stroke="#fff" stroke-width="5" display="none"/>`);
// grodans höjd (ögonen till fötterna) styr kortets skala: lika hög som gurra.png-kortet i storyboarden (0,36)
L.rita(G, L.NEUTRAL, L.POSE0);
const TOPP = 168, ENHET = 0.36 / (FOT - TOPP);   // kroppens överkant (ögonen) i gurra-body.png
const kortCanvas = duk(VB.w, VB.h), kortCtx = kortCanvas.getContext('2d'), kortTex = tex(kortCanvas);
const gg = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
gg.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna
const groda = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), alphaTest: 0.5, side: THREE.FrontSide }));
groda.add(new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, color: 0x000000, emissive: '#F4ECDD', alphaTest: 0.5, side: THREE.BackSide })));   // kortets baksida: vitt papper
groda.castShadow = groda.receiveShadow = true;
groda.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
scen.add(groda);
const GRODKORT = { m: groda, y: SIDA + 0.004, hog: 0.001 };
const fig2varld = ([x, y], pos = groda.position) => v3(pos.x + (x - 512) * ENHET, pos.y + (FOT - y) * ENHET, pos.z + 0.01);
const stillBild = new Image();

// ---- ljuset ----
const hemi = new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3); scen.add(hemi);
const ljus = new THREE.DirectionalLight('#FFF0DC', 2.2); ljus.position.set(-2.2, 4, 3); ljus.castShadow = true;
Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
const LJUS0 = new THREE.Color('#FFF0DC'), LJUS1 = new THREE.Color('#FFD9A8'), HEMI0 = new THREE.Color('#FFFAF0'), HEMI1 = new THREE.Color('#FFEFD6');

// ---- skärpedjup (som bok.js) ----
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

// ---- korten: upp när boken öppnas, ner när den stängs ----
// Det kort som reser sig först ligger överst i högen; när boken stängs fälls de ner i omvänd ordning (det främsta först),
// så att inget kort går genom ett annat. Grodan reser sig sist (rad 05) och fälls därför ner först.
const OPPNA = S('01b'), STANG = S('26');
const ORDNING = [...BAK, ...SKOG, ...BUSKAR, BLOMMOR_BAK, ...SMATT, HINKEN].sort((a, b) => a.z - b.z);
ORDNING.forEach((k, i, a) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); });
const NER = [SLOTTET, BLOMMOR_UPPE, ...ORDNING].sort((a, b) => b.z - a.z);
NER.forEach((k, i, a) => k.ner = STANG + 0.8 + i * 1.0 / (a.length - 1));
const UPP_SLOTT = SVAR('22', 36) - 0.2 - LN(36) + 1.0, UPP_BLOMMOR = S('19') + 0.1;   // sandslottet på ordet "sandslott", blommorna på "Ja, där"
SLOTTET.upp = UPP_SLOTT; BLOMMOR_UPPE.upp = UPP_BLOMMOR;
const PARM_NER = [STANG + 2.15, STANG + 3.05];

// ---- kritan ritar ----
// Konturen (kontur.json, bildens egna px) ritas i #ov, lagd på den riktiga ytan (solen på himlen, glassen på gräset) med en affin
// avbildning ur kamerans projektion varje bildruta. Bilden fylls i inifrån i #ov och tonas över till 3D-ytan.
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
const KS = KRITAN.SKALA_SCEN * 0.7;   // kritan i närbild
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
{ const a = S('03'), b = S('04'), c = S('08'), d = S('09');
  teckning('sol-gul', RQ + 'sol-gul/cut/sol-gul.png', SOL_R, () => SOLEN,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, a + 3.6], vanta: [a + 3.7, a + 4.5], ut: [b + 0.1, b + 0.9] }, [b, b + 0.8], [330, -170]);
  teckning('glass-rosa', RQ + 'glass-rosa/cut/glass-rosa.png', GLASS_R, () => GLASSKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, c + 2.8], vanta: [c + 2.9, c + 3.6], ut: [d, d + 0.8] }, [d, d + 0.5], [300, -230]); }
const SOL_KLAR = S('04') + 0.8, GLASS_KLAR = S('09') + 0.5, GLASS_UPP = S('09') + 0.75;   // fyllningens slut

// ---- grodans rörelser ----
const HOPP = [
  { t0: S('15') + 0.55, t1: S('15') + 1.4, fran: BLADPOS[1], till: BLADPOS.bad, h: 0.14 },   // ut i dammen, landar på "plask"
  { t0: S('17') - 1.15, t1: S('17') - 0.45, fran: BLADPOS.bad, till: BLADPOS[2], h: 0.2 },   // upp på bladet (högt över vågkortet)
  { t0: S('20') + 0.25, t1: S('20') + 0.9, fran: BLADPOS[2], till: BLADPOS[3], h: 0.1 },
];
function grodPos(t) {
  let [x, z] = BLADPOS[1], y = 0;
  for (const H of HOPP) { if (t >= H.t1) [x, z] = H.till; else if (t >= H.t0) { const u = (t - H.t0) / (H.t1 - H.t0), m = mjuk(u);
    x = lerp(H.fran[0], H.till[0], m); z = lerp(H.fran[1], H.till[1], m); y = H.h * Math.sin(Math.PI * u); } }
  const bad = k01((t - HOPP[0].t1) / 0.5) * (1 - k01((t - HOPP[1].t0 + 0.4) / 0.3));   // guppar lugnt i vattnet (aldrig under sidan)
  return [x, y + 0.006 * bad * (1 + Math.sin(t * 2.2)), z];
}
const PLASK = HOPP[0].t1, UPPUR = HOPP[1].t1;
const GLIDA = [S('11') + 0.1, S('11') + 0.9], MUMS = S('11') + 0.6 + 2.1, KON_UT = S('13') + 0.8;   // glassen till handen, tuggan på "Mums", struten släpps
const KLAPP = SVAR('22', 36) - 0.2 + 0.1 - 1.0;   // riggens klapp möts vid 1, 1,5 och 2 s
function vink(f, p, tl, d) {   // armen bakom kroppen, snett upp och ut förbi kanten (som grodans testfilm, lugnare takt)
  if (tl < 0 || tl > d) return [f, p];
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * 1.3 * tl);
  return [f, { ...p, armar: [p.armar[0], p.armar[1] + upp * (55 + 14 * s)], fram: [p.fram?.[0] || 0, 0], luta: (p.luta || 0) - upp * (1.5 + 1.2 * s) }];
}
const nick = (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p];
const blicka = (tl, nycklar) => { let v = nycklar[0][1]; for (let i = 1; i < nycklar.length; i++) v = lerp(v, nycklar[i][1], mjuk((tl - nycklar[i][0]) / 0.5)); return v; };
let droppar = '';
const REAKTION = { '05': 'jatteglad', '05b': 'kawaii', '06': 'stolt', '07b': 'tanker', '08': 'nyfiken', '09': 'kawaii', '10': 'blinkar',
  '11': 'mums', '11b': 'fnissig', '12': 'forvanad', '12b': 'skrattar', '13': 'tanker', '14': 'jatteglad', '15': 'skrattar', '15b': 'fnissig',
  '16': 'stolt', '17': 'nyfiken', '17b': 'tanker', '19': 'jatteglad', '20': 'kawaii', '21': 'blinkar', '22': 'skrattar', '23': 'kawaii' };
// smakar: armen med glassen lyfts snett upp mot ansiktet och grodan lutar sig dit (riggens sakMun lade glassen bakom huvudet)
const smaka = (p, k) => { p.armar = [p.armar[0] + 62 * k, p.armar[1]]; p.luta = (p.luta || 0) + 3 * k; };
function grodan(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] }, nos = false; droppar = '';
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };   // liv när hon står: blicken, tyngden
  const halla = t >= GLIDA[1] && t < KON_UT;
  if (halla) p.hall = [1, 0];
  if (t >= MUMS + 0.05) p.sakBett = 1;
  switch (id) {
    case '05': [f, p] = vink(f, p, tl - 0.6, r.d - 0.8); break;
    case '05b': { const sv = SVAR('05b', 8) - r.s; f = { ...f, titt: [tl < sv ? 10 * Math.sin(tl * 2.2) : 0, 0] };
      f = L.blanda(f, 'jatteglad', bump(sv, sv + 1.3, tl)); p.rikt = tl < sv ? 0.3 * Math.sin(tl * 2.2) : 0; break; }
    case '06': f = { ...f, titt: [0, -6 * mjuk(tl / 0.5)] }; break;   // tittar upp mot solen (posen 'upp' gav sura bryn)
    case '07': case '07b': { f = { ...f, kind: 1.25, titt: [0, 3] };   // varm: rosiga kinder och en suck, inget surt eller sömnigt
      const ts = id === '07' ? 0.5 + LN(11) + 0.2 : -9; p.strack = -0.035 * bump(ts, ts + 1.3, tl, 0.4); p.armar = [-6, -6];
      if (id === '07b') f = { ...f, titt: [0, 0] }; break; }
    case '08': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-10, 5]; p.rikt = -0.35; break;
    case '09': f = L.blanda(B('nyfiken'), 'kawaii', mjuk((tl - 0.5) / 0.4)); f.titt = [-10, 5]; p.rikt = -0.35 * (1 - mjuk((tl - 2) / 0.6)); break;
    case '10': [f, p] = nick(f, p, tl - 0.3); break;
    case '11': { const munK = mjuk((t - (MUMS - 0.9)) / 0.6) * (1 - mjuk((t - (MUMS + 0.35)) / 0.6));
      smaka(p, munK); f = L.blanda(f, 'mums', bump(MUMS - 0.1, MUMS + 0.9, t, 0.2)); break; }
    case '11b': f = { ...B('mums'), tungan: [0, 0, 0], mun: L.param('glad').mun }; break;
    case '12': { // glassen når nosen när grodan slickar (armarna är för korta för att hålla den ovanför nosen), en rosa prick blir kvar
      smaka(p, bump(0.0, 0.7, tl, 0.3)); nos = tl > 0.35; f = L.blanda(f, { ...B('forvanad'), titt: [0, -12] }, mjuk((tl - 0.35) / 0.25)); break; }
    case '12b': { [f, p] = L.skakaHuvud(L.blanda(f, 'fnissig', mjuk((tl - 0.9) / 0.3)), p, tl - 0.05, 1.6, 1.5);
      const u = tl / 0.45; if (u < 1) droppar += `<circle cx="${(NOS[0] + 30 * u).toFixed(1)}" cy="${lerp(NOS[1], FOT + 20, u * u).toFixed(1)}" r="17" fill="#FF6FAE" stroke="#fff" stroke-width="5"/>`; break; }
    case '13': f = { ...f, titt: [9, 5] }; p.rikt = 0.3 * mjuk(tl / 0.6); break;
    case '14': f = { ...f, titt: [7, 8] }; [f, p] = nick(f, p, tl - (SVAR('14', 23) - r.s + 0.3)); break;
    case '15': f = L.blanda(f, 'jatteglad', bump(PLASK - r.s, PLASK - r.s + 1.4, tl)); break;
    case '15b': f = B('jatteglad');
      for (let i = 0; i < 6; i++) { const u = ((tl * 0.9 + i * 0.37) % 1.1) / 1.1, x = 300 + ((i * 137) % 430), y = lerp(80, 760, u);
        if (tl > i * 0.15) droppar += `<path d="M${x} ${y - 22} Q${x + 13} ${y} ${x} ${y + 10} Q${x - 13} ${y} ${x} ${y - 22}Z" fill="#9FD8F5" stroke="#fff" stroke-width="5" opacity="${(1 - u * 0.3).toFixed(2)}"/>`; }
      break;
    case '16': f = L.blanda(f, 'kawaii', 0.5);
      for (const [x, y, i] of [[300, 420, 0], [700, 380, 1], [600, 640, 2]]) { const g = 0.5 + 0.5 * Math.sin(t * 5 + i * 2.1);
        droppar += `<circle cx="${x}" cy="${y}" r="${(10 + 4 * g).toFixed(1)}" fill="#BDE7FA" stroke="#fff" stroke-width="4"/><circle cx="${x - 3}" cy="${y - 4}" r="${(3 + 3 * g).toFixed(1)}" fill="#fff"/>`; }
      break;
    case '17': f = B('nyfiken'); p.rikt = 0.5 * Math.sin(tl * 1.2); f.titt = [10 * Math.sin(tl * 1.2), -2]; break;
    case '17b': { f = B('nyfiken'); const rk = blicka(tl, [[0, 0], [0.9, -0.6], [1.9, 0.6], [2.9, 0]]); p.rikt = rk; f.titt = [12 * rk, 0]; break; }
    case '18': f = B('nyfiken'); break;
    case '19': f = L.blanda(B('glad'), 'kawaii', 0.8); p.rikt = 0.6 * mjuk((tl - 0.3) / 0.5); f.titt = [10, 0]; break;
    case '20': p.rikt = 0.6 * mjuk((tl - 1.0) / 0.5); f.titt = [10, 0]; break;
    case '21': { const ts = 0.5 + LN(34) + 0.2; f = { ...B('glad'), glad: [1, 1], kind: 1.1 }; p.rikt = 0.6; p.luta = -5 * mjuk(tl / 0.8);
      p.strack = -0.025 * bump(ts, ts + 1.2, tl, 0.4); break; }
    case '22': { f = L.blanda(B('glad'), 'jatteglad', mjuk((t - UPP_SLOTT) / 0.4)); p.rikt = -0.4 * mjuk((t - UPP_SLOTT + 0.3) / 0.5);
      if (t > KLAPP && t < KLAPP + 2.8) { const [, p2] = L.ROR.klappa(t - KLAPP); p = { ...p2, rikt: p.rikt * 0.5 }; } break; }
    case '23': [f, p] = nick(f, p, tl - (SVAR('23', 37) - r.s)); break;
    case '24': [f, p] = vink(f, p, tl - 0.3, r.d + 5); break;
    case '25': [f, p] = vink(f, p, tl + RR['24'].d - 0.3, RR['24'].d - 0.3 + r.d - 0.3); break;
  }
  // hoppen: hukar före, sträcker sig i luften, landar mjukt
  const sakP = { hall: p.hall, sakBett: p.sakBett };   // blandaPose bygger en ny pose utan saken i handen
  for (const H of HOPP) { p = L.blandaPose(p, 'huka', bump(H.t0 - 0.35, H.t0 + 0.05, t, 0.2) + 0.7 * bump(H.t1 - 0.02, H.t1 + 0.35, t, 0.15));
    if (t > H.t0 && t < H.t1) { p.strack = 0.03; p.armar = [p.armar[0] + 20, p.armar[1] + 20]; } }
  if (sakP.hall) p.hall = sakP.hall; if (sakP.sakBett) p.sakBett = sakP.sakBett;
  // reaktionsslaget i radens slut (GLES): ett uttryck som passar raden och en liten huvudlutning (Sanna 27/11: "more expressions")
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  $('nosDroppe').setAttribute('display', nos ? 'inline' : 'none');
  return [BL(f, t), p];
}

// ---- en bildruta ----
const V = { e: 0 };
async function ritaGroda(t) {
  const [x, y, z] = grodPos(t); groda.position.set(x, GRODKORT.y + y, z);
  const [f, p] = grodan(t);
  L.rita(G, f, p); L.sakRita(G, p);   // grodans uttryck.html ritar ingen sak själv (inget referensark än)
  $('dropparG').innerHTML = droppar;
  // struten ur handen (rad 13): riggens sak döljs när 3D-struten tar över
  const kon = t >= S('13') + 0.3;
  G.querySelectorAll('.sak-plats image').forEach(im => { im.setAttribute('href', kon ? KON_URL : GLASS_URL); im.setAttribute('opacity', t < GLIDA[1] || t >= KON_UT ? 0 : 1); });
  // boil 2,5 px i bild och vit kant 3 px i bild, räknat mot 3D-kamerans skala (som lekrummet)
  const mitt = groda.position.clone().add(v3(0, 0.18, 0)), d = mitt.clone().sub(cam.position).dot(cam.getWorldDirection(v3())) || 3;
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

async function bildruta(t) {
  // pärmen och korten
  const oppen = t < STANG ? k01((t - OPPNA) / 0.9) : 1 - mjuk((t - PARM_NER[0]) / (PARM_NER[1] - PARM_NER[0]));
  satt(PARM0 + (PARM1 - PARM0) * oppen);
  for (const k of [...ORDNING, SLOTTET, BLOMMOR_UPPE]) {
    let e = k.upp != null ? reser((t - k.upp) / 0.45) : 0;
    if (k.ner != null) e *= 1 - mjuk((t - k.ner) / 0.45);
    vik(k, e); if (k.flik) k.flik.visible = e > 0.6;   // kontaktskuggan bara när kortet står
    if (k.vaj !== undefined) k.m.rotation.z = 0.025 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  BLOMMOR_UPPE.m.visible = t >= S('19'); BLOMMOR_UPPE.flik.visible &&= t >= S('19');
  // blommorna skimrar: svagt 3 s in i letandet (rad 18), tydligt när de hittas
  const sk0 = SVAR('18', 31) - 0.2 + 3.0, skim = t < S('19') ? 0.35 * k01((t - sk0) / 0.6) * (0.6 + 0.4 * Math.sin((t - sk0) * 5)) : bump(S('19') - 0.1, S('19') + 1.2, t, 0.3);
  for (const m of [BLOMMOR_BAK.m.material, BLOMMOR_UPPE.m.material]) m.emissive.setScalar(0.22 * skim);
  // grodans kort: upp på rad 05 (pop 0,2 s in), ner först när boken stängs
  vik(GRODKORT, reser((t - S('05') - 0.05) / 0.45) * (1 - mjuk((t - STANG - 0.3) / 0.45)));
  // solen: syns när fyllningen är klar, vrider sig sakta
  SOLEN.visible = t >= SOL_KLAR - 0.05; SOLEN.rotation.z = -0.15 * Math.max(0, t - SOL_KLAR);
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // varmare ljus när solen kommer (rad 04) och ännu varmare när den skiner (rad 06)
  const varm = 0.55 * mjuk((t - SOL_KLAR + 0.3) / 1.2) + 0.45 * mjuk((t - S('06') - 0.2) / 1.5);
  ljus.color.copy(LJUS0).lerp(LJUS1, varm); ljus.intensity = 2.2 + 0.25 * varm; hemi.color.copy(HEMI0).lerp(HEMI1, varm);
  // glassen: ligger (bildsidan upp) där kritan ritade den, reser sig, glider till grodans hand
  const G0 = GLASSKORT;
  G0.m.visible = t >= GLASS_KLAR - 0.05 && t < GLIDA[1]; G0.flik.visible = G0.m.visible && t < GLIDA[0] && t > GLASS_UPP + 0.25;
  G0.m.rotation.x = -Math.PI / 2 * (1 - reser((t - GLASS_UPP) / 0.45)); G0.m.position.set(G0.x, G0.y, G0.z); G0.m.scale.setScalar(1);
  if (t >= GLIDA[0] && t < GLIDA[1]) {
    const u = mjuk((t - GLIDA[0]) / (GLIDA[1] - GLIDA[0])), mal = fig2varld(window.HAND.l), sk = lerp(1, 0.5 * GLASS_I.height * ENHET / 0.24, u);
    mal.y -= (414 - 300) * 0.5 * ENHET;   // greppet i handen, foten under
    G0.m.position.set(lerp(G0.x, mal.x, u), lerp(G0.y, mal.y, u) + 0.12 * Math.sin(Math.PI * u), lerp(G0.z, mal.z, u)); G0.m.scale.setScalar(sk);
  }
  // struten släpps (rad 13): glider ner på gräset och fälls ner
  const K = KONKORT; K.m.visible = t >= KON_UT && t < S('14'); if (K.flik) K.flik.visible = false;
  if (K.m.visible) { const fran = fig2varld(window.HAND.l), u = mjuk((t - KON_UT) / 0.8), mal = v3(-0.46, SIDA + 0.002, 0.3);
    fran.y -= (414 - 300) * 0.5 * ENHET;
    K.m.position.set(lerp(fran.x, mal.x, u), lerp(fran.y, mal.y, u) + 0.05 * Math.sin(Math.PI * u), lerp(fran.z, mal.z, u));
    K.m.rotation.x = Math.PI / 2 * mjuk((t - KON_UT - 0.8) / 0.4); }
  // vågkortet: upp på "plask", ner när grodan hoppat upp på bladet
  VAGKORT.m.visible = t >= PLASK - 0.05 && t < UPPUR + 0.8; vik(VAGKORT, reser((t - PLASK + 0.05) / 0.45) * (1 - mjuk((t - UPPUR - 0.1) / 0.45)));
  // stänket: droppar i en båge runt grodan på "plask" (och ett litet när hon hoppar upp)
  const st = [[PLASK, 1], [HOPP[1].t0 + 0.05, 0.5]].find(([t0]) => t >= t0 && t < t0 + 1.1);
  STANK.visible = !!st;
  if (st) { const u = (t - st[0]) / 1.1, [bx, bz] = BLADPOS.bad;
    for (const d of STANK.children) { const { a, v } = d.userData, y = st[1] * (0.42 * v * u - 0.5 * u * u);
      d.position.set(bx + Math.cos(a) * 0.2 * v * u * st[1], SIDA + Math.max(0, y), bz + 0.05 + Math.sin(a) * 0.1 * v * u * st[1]); d.visible = y > 0; } }
  await ritaGroda(t);
  // fokus på vyns mål
  const v = VYER[Math.max(0, VYER.findLastIndex(w => w.t <= t))];
  bokeh.uniforms.focus.value = cam.position.distanceTo(v.mal); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002;
  scen.updateMatrixWorld(true);
  // kritan och skimrets gnistor i #ov
  let ov = ritaKritan(t);
  const gn = (t0, mesh) => { const b = mesh.getWorldPosition(v3()); b.y += 0.36; const [x, y] = skarm(b); return gnistor(x, y, 120, t - t0, 4); };
  if (t > sk0 && t < S('19')) ov += gn(sk0, BLOMMOR_BAK.m);
  if (t >= S('19') && t < S('19') + 2.5) ov += gn(S('19'), BLOMMOR_UPPE.m);
  $('ov').innerHTML = ov;
  komp.render();
}

// ---- kameran: vyerna ur storyboarden (rader.mjs s.vy), en vy per utsnitt, en svag glidning i varje ----
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  bred: () => [v3(0, 0.66, 1.75), v3(0, 0.36, -0.25), 32],
  himmel: () => { scen.updateMatrixWorld(true); const s = SOLEN.getWorldPosition(v3()); return [v3(s.x - 0.05, s.y - 0.12, s.z + 1.25), s, 30]; },
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  'halv-sol': g => [g.clone().add(v3(0.15, 0.12, 0.72)), g.clone().add(v3(0.06, 0.32, -0.4)), 32],
  nara: g => [g.clone().add(v3(0.03, 0.3, 0.66)), g.clone().add(v3(0, 0.25, 0)), 28],
  glass: () => [v3(-0.42, 0.75, 1.15), v3(-0.45, 0.16, 0.24), 30],   // glassteckningen och grodan i samma bild
  damm: () => [v3(0.12, 0.85, 1.55), v3(0.12, 0.06, 0.02), 32],
  hopp: () => [v3(-0.1, 0.72, 1.15), v3(-0.06, 0.12, 0.02), 34],   // högre, så att hinken inte skymmer
  buske: () => [v3(0.55, 0.45, 0.98), v3(0.74, 0.12, -0.08), 32],
  'buske-nara': () => [v3(0.95, 0.3, 0.55), v3(1.02, 0.22, -0.14), 28],
  blommor: () => [v3(0.6, 0.4, 1.05), v3(0.82, 0.19, 0.08), 30],
  'bad-nara': g => [g.clone().add(v3(0.03, 0.3, 0.82)), g.clone().add(v3(0, 0.22, 0)), 28],   // i badet: vågorna nederst i bild
  'blommor-nara': () => [v3(0.64, 0.42, 1.0), v3(0.86, 0.24, 0.1), 28],
  sand: () => [v3(0.45, 0.6, 1.6), v3(0.62, 0.16, 0.3), 32],
  hejda: g => [g.clone().add(v3(0.22, 0.34, 0.95)), g.clone().add(v3(-0.2, 0.2, -0.3)), 32],
};
const ALIAS = { halv2: 'halv', nara2: 'nara', nara3: 'nara', logga: 'bord' };
const lage = (pos, mal, P) => [Math.atan2(pos.x - P[0], pos.z - P[2]) * 180 / Math.PI, Math.hypot(pos.x - P[0], pos.z - P[2]), pos.y - P[1], mal.x - P[0], mal.y - P[1]];
const fran3 = (l, P) => { const a = l[0] * Math.PI / 180; return [v3(P[0] + l[1] * Math.sin(a), P[1] + l[2], P[2] + l[1] * Math.cos(a)), v3(P[0] + l[3], P[1] + l[4], P[2])]; };
const skjut = l => [l[0] + 1.2, l[1] * 0.965, l[2] * 0.985, l[3], l[4]];   // svag push in i varje vy
satt(PARM1); scen.updateMatrixWorld(true);   // himlens vy mäts med pärmen uppe
const platser = {}, VYER = [];
const blurFor = n => /nara/.test(n) ? 0.008 : /halv|glass|blommor/.test(n) ? 0.006 : 0.003;
function vy(t, namn, g, o = {}) {
  const [pos, mal, fov] = VY[namn](g), P = o.P || [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  if (!o.fran && namn !== 'himmel') pos.y += 0.09;   // kameran lite högre (Sanna 27/11)
  const fran = o.fran || lage(pos, mal, P);
  VYER.push({ t, mot: key, fran, till: o.till || skjut(fran), fov, mal: o.mal || mal, blur: blurFor(namn) });
}
const P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0), bredL = lage(...VY.bred().slice(0, 2), P0);
let forra = '';
for (const r of RAD) {
  let namn = r.id === '15' ? 'hopp' : ALIAS[r.st.vy] || r.st.vy; if (namn === 'nara' && r.st.blad === 'bad') namn = 'bad-nara';
  const bp = BLADPOS[r.st.blad], g = v3(bp[0], SIDA, bp[1]), key = namn + r.st.blad;
  if (r.id === '01a') { vy(r.s, 'bord', g, { P: P0, fran: bordL, till: skjut(bordL), mal: v3(0, 0.25, -0.1) }); forra = 'bord'; continue; }
  if (r.id === '01b') { const t0 = r.s + 0.9;   // en lång lugn glidning in i boken (ca 4 s), sedan står kameran och andas
    VYER.at(-1).till = bordL; vy(t0, 'bred', g, { P: P0, fran: bordL, till: bredL, mal: v3(0, 0.36, -0.25) });
    vy(S('02') + 1.0, 'bred', g, { P: P0, fran: bredL, till: skjut(bredL), mal: v3(0, 0.36, -0.25) }); forra = 'bred1'; continue; }
  if (r.id === '02') continue;
  if (r.id === '26') {   // ut ur boken: från förra vyns slut till bordet, medan korten fälls ner och pärmen slås igen
    const f = VYER.at(-1), [pos, mal] = fran3(f.till, platser[f.mot]);
    VYER.push({ t: r.s + 0.2, mot: 'pBord', fran: lage(pos, mal, P0), till: bordL, fov: 32, mal: v3(0, 0.25, -0.1), blur: 0.003, rorelse: 'glid' }); platser.pBord = P0; continue; }
  if (key === forra) continue; forra = key;
  vy(r.s, namn, g);
}
vy(HOPP[1].t0 - 0.45, 'damm', v3(...BLADPOS.bad));   // klipp till dammen när grodan hoppar upp ur vattnet
VYER.sort((a, b) => a.t - b.t);
const plan = kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd: DURATION });

// ---- ljudet: Malin, grodan och effekterna ur rader.json, kritans ritljud som slinga, skogen lågt under allt ----
const EF = 'assets/ljud/effekter/';
const VOL = f => /kvak|suck|fniss|oj-oj|hejda/.test(f) ? 1.4 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel-tyg/.test(f) ? 0.9 : /(pop|swoosh|hopp-mjuk|landa-mjuk)/.test(f) ? 0.7 : 1.0;
const LJUD = [];
for (const r of RAD) {
  for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `assets/ljud/roster/sommaren-i-boken/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
  for (const [f, o] of r.ljud || []) if (!/^(krita-ritar|skogsljud)\//.test(f)) LJUD.push({ t: r.s + o, fil: EF + f + '.m4a', vol: VOL(f) });
}
for (const [i, D] of RIT.entries()) LJUD.push({ t: D.T.rit[0], fil: EF + `krita-ritar/krita-ritar-${i + 1}.m4a`, vol: 1.2, langd: D.T.rit[1] - D.T.rit[0] + 0.3, loop: true, fade: 0.4 });
LJUD.push({ t: 0, fil: EF + 'skogsljud/skogsljud-1.m4a', vol: 0.3, langd: DURATION, loop: true, fadeIn: 1.0, fade: 2.0 });
LJUD.push(...[0.5, 1.0].map((k, i) => ({ t: KLAPP + 1.0 + k, fil: EF + `klapp/klapp-${2 - i}.m4a`, vol: 1.0 })));   // riggens andra och tredje klapp
LJUD.push(...plan.ljud);
window.LJUD = LJUD.filter(c => c.t < DURATION).sort((a, b) => a.t - b.t);
window.DURATION = DURATION;
window.TIDER = Object.fromEntries(RAD.map(r => [r.id, +r.s.toFixed(2)]));
window.seek = t => plan.rita(t, () => bildruta(t));
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
