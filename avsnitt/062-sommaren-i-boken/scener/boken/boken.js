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
// Stillbildsprov runda 4 (Sanna 27/11): ?prov=s mindre saker och bredare bild ("bigger scene and smaller objects"), t lövträd
// bland granarna, f enskilda blommor som syns hela tiden; ?bad=2|3 andra bad (rad 15–16, "needs lots of polish")
const Q = new URLSearchParams(location.search), PROV = Q.get('prov') || '', BAD = +(Q.get('bad') || 4);   // bad 4 vald (Sanna 27/11 "Yes, use bad 4"), förut bad 3
// lövträden och de enskilda blommorna gäller nu (Sanna 27/11 "more individual flower assets", "new trees too"); prov=g visar de gamla
const STOR = PROV.includes('s') ? 0.72 : 1, TRAD = !PROV.includes('g'), BLOM = !PROV.includes('g');

// ---- raderna ----
// rader.mjs direkt (läget per rad, st, finns inte i rader.json; rader.json skrivs för qa-verktygen)
const { RADER, ROST, GLES, UPPSKATTAD } = await import('/avsnitt/062-sommaren-i-boken/storyboard/rader.mjs'); let acc = 0;
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
const [TRAD1, APPEL, EK, ...BLOMS] = await Promise.all([B + 'skogen-saker/trad.png', B + 'lekplatsen-saker/appeltrad.png', RQ + 'ek/cut/ek.png',
  ...['blomma-rod/cut/blomma-rod', 'blommor-gula/cut/blomma-gul-2', 'blomma-rosa/cut/blomma-lila', 'blomma-rosa/cut/blomma-rosa'].map(n => RQ + n + '.png'), B + 'vagen-saker/blomma-vit.png'].map(lad));
const [SOL_I, GLASS_I] = await Promise.all([bild(RQ + 'sol-gul/cut/sol-gul.png'), bild(RQ + 'glass-rosa/cut/glass-rosa.png')]);
// solen med ansikte (Sanna 27/11 runda 4 "bigger sun with face"): ögon med glans, rosiga kinder och ett leende på skivan (r ca 260 px)
const SOL_C = (() => { const c = duk(SOL_I.width, SOL_I.height), x = c.getContext('2d'), cx = 433, cy = 434; x.drawImage(SOL_I, 0, 0);
  x.fillStyle = 'rgba(244,120,110,0.45)'; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * 128, cy + 50, 42, 28, 0, 0, 7); x.fill(); }
  x.fillStyle = '#3A2414'; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * 78, cy - 30, 24, 32, 0, 0, 7); x.fill(); }
  x.fillStyle = '#FFF'; for (const s of [-1, 1]) { x.beginPath(); x.arc(cx + s * 78 + 8, cy - 42, 9, 0, 7); x.fill(); }
  x.strokeStyle = '#3A2414'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.arc(cx, cy + 22, 62, 0.22 * Math.PI, 0.78 * Math.PI); x.stroke();
  return c; })();
const SOL = tex(trim(SOL_C)), GLASS = tex(trim(GLASS_I)), SOL_URL = SOL_C.toDataURL();
const KONTUR = Object.fromEntries(await Promise.all(['sol-gul', 'glass-rosa'].map(async s => { const j = await (await fetch(`${RQ}${s}/cut/${s}-kontur.json`)).json(); return [s, [j.d, ...(j.detaljer || [])]]; })));
// runda 5 (Sanna 27/11 "better sun drawing so it matches movement of kritan"): strålarna ritas som bildens tjocka, rundade strålar
// (mätta i sol-gul.png: 12 st, r 268–414 från mitten 434/435, ca 80 px breda), ut längs ena sidan, runt toppen och in längs den andra,
// medurs från toppen, så att kritan går runt solen i en jämn rörelse och teckningen blir bilden
KONTUR['sol-gul'] = [KONTUR['sol-gul'][0], ...Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, u = [Math.sin(a), -Math.cos(a)], v = [Math.cos(a), Math.sin(a)];
  const P = (r, w) => `${(434 + r * u[0] + w * v[0]).toFixed(1)} ${(435 + r * u[1] + w * v[1]).toFixed(1)}`;
  return `M${P(276, -14)} L${P(310, -26)} L${P(372, -26)} A26 26 0 0 1 ${P(372, 26)} L${P(310, 26)} L${P(276, 14)}`; })];
// den tomma struten: glassen utan kulan (kulan slutar ca y 200 i bilden)
const KON_C = duk(GLASS_I.width, GLASS_I.height); { const x = KON_C.getContext('2d'); x.drawImage(GLASS_I, 0, 0); x.clearRect(0, 0, KON_C.width, 196); }
const KON = tex(trim(KON_C));
const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
const GLASS_URL = await dataUrl(RQ + 'glass-rosa/cut/glass-rosa.png'), KON_URL = KON_C.toDataURL();
// utkast B (Sanna 27/11 "frog build sand castle"): hinken utan spade, spaden för sig och sandslottet i delar (sandhögen, två torn och
// mitten), urklippta ur Sannas hink.png och sand.png i bilder/delat/. Otrimmade, så att bildens px går rakt in på kortet.
const DEL = P + 'delat/';
const [HINK_TOM_I, SPADEK_I, SAND_I, ...SLOTT_I] = await Promise.all(['delat/hink-tom', 'delat/spade-kort', 'sand', 'delat/slott-hog', 'delat/slott-torn-1', 'delat/slott-torn-2', 'delat/slott-mitt'].map(n => bild(P + n + '.png')));
const helTex = i => { const c = duk(i.width, i.height); c.getContext('2d').drawImage(i, 0, 0); return tex(c); };
const SPADE_URL = await dataUrl(DEL + 'spade.png');

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

// runda 5 (Sanna 27/11 "can the book scene be bigger?"): boken 1,3 gånger större, sakerna lika stora, mer uppslag runt dem
const BOK = 1.3;
skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
const PARM0 = 0.5, PARM1 = 1.4;
const { insida, satt } = await skapaBok(scen, { farg: '#E8683A', figur: SOL_I, doodles: true, oppna: [PARM0, PARM1], storlek: BOK });

// ---- uppslaget (som storyboarden) ----
// Kontaktskuggan vid kortets fot: en mjuk, rund skugga i stället för den gröna vikfliken, som såg ut som en fyrkantig skugga (Sanna 27/11)
const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(28,52,18,0.42)'); g.addColorStop(0.55, 'rgba(28,52,18,0.16)'); g.addColorStop(1, 'rgba(28,52,18,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
const KORT = [];
function kort(map, h, x, z, o = {}) {
  if (o.skala !== false) h *= STOR;
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
const BAK = [kort(bredare(KULLE_BAK, 5.2 * BOK), 2.15 / 5.2, 0, -0.6, { skala: false }), kort(bredare(KULLE_FRAM, 6.2 * BOK), 1.95 / 6.2, 0.05, -0.47, { skala: false })];
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(HIMMEL, 1.5), 2.03, 0, 0.07 + 2.03 / 2, 0.004, 2.3 * BOK);   // himlen upp till pärmens kant (större bok)
const SOLEN = pa(SOL, 0.5, 0.12, 0.9);   // större (runda 4)
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
// runda 5: fler träd ut mot de större sidornas kanter
const SKOG = [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [-0.46, -0.34, 0.44], [0.38, -0.38, 0.56], [0.66, -0.33, 0.46], [0.94, -0.4, 0.6],
  [-1.24, -0.42, 0.56], [1.22, -0.36, 0.52], [-1.42, -0.16, 0.44], [1.42, -0.2, 0.46]].map(([x, z, h], i) => TRAD && i % 2 ? kort([TRAD1, APPEL, EK][((i - 1) / 2) % 3], h * 0.95, x, z) : kort(GRAN, h, x, z));
// Blommorna bakom busken (Sanna 27/11: "dont hide flowers as much"): högre och bredare än i storyboarden, ungefär halva blomhuvudena syns
// Runda 3 (Sanna 27/11 "place flowers more clearly"): ännu högre och lite åt sidan, så att blomhuvudena syns tydligt över busken
const BLOMMOR_BAK = kort(BLOMMOR, 0.52, 1.07, -0.22, { flik: false }); BLOMMOR_BAK.m.scale.x = 0.85; BLOMMOR_BAK.m.visible = !BLOM;
// enskilda blommor (runda 5, Sanna 27/11 "make flowers smaller": 0,72 av förut): röd, gul, lila, rosa i en sned rad bakom stranden vid blad 3, så att alla fyra syns, uppe hela tiden, en i taget när färgerna sägs
const BLOMS_K = BLOM ? [[0, 0.18, 0.64, 0.47], [1, 0.17, 0.9, 0.36], [2, 0.18, 0.8, 0.16], [3, 0.165, 0.94, -0.02]].map(([i, h, x, z]) => kort(BLOMS[i], h, x, z)) : [];
const BUSKAR = [kort(BUSKE, 0.3, -0.12, -0.3), kort(BUSKE, 0.26, 1.02, -0.14)];
{
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, '#6CC04A', '#8ED46A', '#56A83A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26 * BOK, 0, 0.0, 1.5 * BOK, SIDA + 0.0004);
}
platt(DAMM, 1.45, -0.02, 0.06, 0.7);
const BLADPOS = { 1: [-0.24, 0.08], 2: [0.45, -0.07], 3: BLOM ? [0.68, -0.2] : [0.79, 0.04], bad: [0.1, 0.0], sand: [-0.36, 0.62] };   // sand: bredvid hinken (utkast B)   // 3 = stranden vid blommorna, bad = mitt i dammen
platt(BLAD, 0.3, ...BLADPOS[1], undefined, SIDA + 0.003); platt(BLAD, 0.3, ...BLADPOS[2], undefined, SIDA + 0.003);
const SMATT = [kort(NACKROS, 0.1, 0.12, 0.3, { y: SIDA + 0.004, flik: false }), kort(VASS, 0.46, -0.84, 0.2, { vaj: 0 }), kort(VASS, 0.34, 0.62, -0.25, { vaj: 2 })];
// hinken och sandslottet i ett sandhörn till vänster (runda 5, Sanna 27/11 "place hink and sandcastle to the left"), bort från blommorna
// utkast B: hinken lite mindre och sandhögen större, så att hinken kan forma tornen (tornet ur bilden är litet)
const HINKEN = kort(helTex(HINK_TOM_I), 0.22, -0.58, 0.76), SLOTTET = kort(helTex(SLOTT_I[0]), 0.36, -0.92, 0.58), BLOMMOR_UPPE = kort(BLOMMOR, 0.26, 0.98, 0.2);
const GLASSKORT = kort(GLASS, 0.24, -0.5, 0.44, { y: SIDA + 0.003 }), KONKORT = kort(KON, 0.1, 0, 0, { flik: false });
const GLASS_R = ruta(GLASS_I), SOL_R = ruta(SOL_I);
// sandfläcken under sandslottet (runda 4, Sanna 27/11 "sand patch under the sandslott"): en ojämn kritfläck som växer fram med kortet
const SANDFLACK = (() => { const w = 768, h = 320, c = duk(w, h), x = c.getContext('2d'), form = () => { x.beginPath();
    for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, r = 1 + 0.06 * Math.sin(a * 3 + 1) + 0.04 * Math.sin(a * 7);
      x[i ? 'lineTo' : 'moveTo'](w / 2 + Math.cos(a) * (w / 2 - 20) * r * 0.92, h / 2 + Math.sin(a) * (h / 2 - 20) * r * 0.9); } x.closePath(); };
  x.fillStyle = '#FFF'; x.lineWidth = 14; x.strokeStyle = '#FFF'; form(); x.fill(); x.stroke();
  const g = duk(w, h); kritYta(g.getContext('2d'), w, h, '#E9C877', '#F4DC9C', '#D2AA5A', 0.7);
  x.save(); form(); x.clip(); x.drawImage(g, 0, 0); x.restore();
  return platt(tex(c), 0.69, SLOTTET.x, SLOTTET.z + 0.01, 0.285, SIDA + 0.0012); })();
// slottets delar på sandhögens kort (barn till kortet, så att de fälls med det): torn 1, torn 2 och mitten, med origo i slottets fot
// (bildens rad 150). Tornen står under hinken när den landar och syns när den lyfts; mitten reser sig på "sandslott". När allt står
// byts sandhögen till hela sand.png (inga skarvar).
const SLOTT_H = SLOTTET.h, SLOTT_W = SLOTT_H * 439 / 320, SLOTT_HEL = helTex(SAND_I), SLOTT_HOG = SLOTTET.m.material.map;
const TORN = SLOTT_I.slice(1).map((i, n) => { const g = new THREE.PlaneGeometry(SLOTT_W, SLOTT_H); g.translate(0, SLOTT_H * (150 / 320 - 0.5), 0);
  const map = helTex(i), m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.position.set(0, SLOTT_H * 170 / 320, 0.0015 + n * 0.0004); m.visible = false; SLOTTET.m.add(m); return m; });
const TORN_X = [174, 271].map(px => SLOTTET.x + (px / 439 - 0.5) * SLOTT_W), KULLE_Y = SIDA + SLOTT_H * (320 - 142) / 320;   // tornens mitt, sandhögens topp
// spaden i hinken (kort, barn till hinken) och sanden som fylls i hinken (en kulle över öppningen, växer med skoporna)
const HH = HINKEN.h, HW = HH * 290 / 404, hpx = (px, py) => v3((px / 290 - 0.5) * HW, (1 - py / 404) * HH, 0);
const SPADEKORT = (() => { const g = new THREE.PlaneGeometry(170 * HH / 404, 179 * HH / 404), map = helTex(SPADEK_I);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map); m.position.copy(hpx(198, 96.5)).setZ(0.003); HINKEN.m.add(m); return m; })();
const SPADE_VILA = SPADEKORT.position.clone();
const SANDKULLE = (() => { const w = 220, h = 90, c = duk(w, h), x = c.getContext('2d'), form = r => { x.beginPath(); x.ellipse(110, 70, 100 - r, 62 - r, 0, Math.PI, 0); x.ellipse(110, 70, 100 - r, 14 - r, 0, 0, Math.PI); };
  x.fillStyle = '#9A7436'; form(0); x.fill();
  const g = duk(w, h); kritYta(g.getContext('2d'), w, h, '#E9C877', '#F4DC9C', '#D2AA5A', 0.7);
  x.save(); form(4); x.clip(); x.drawImage(g, 0, 0); x.restore();
  const gg = new THREE.PlaneGeometry(w * HH / 404, h * HH / 404); gg.translate(0, h * HH / 404 * (0.5 - 70 / 90), 0);
  const m = new THREE.Mesh(gg, urklipp(tex(c))); m.receiveShadow = true; m.position.copy(hpx(145, 160)).setZ(0.002); m.visible = false; HINKEN.m.add(m); return m; })();
const SANDKORN = new THREE.Group(); for (let i = 0; i < 10; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.006 + 0.003 * (i % 3), 8, 6), mat(null, { color: '#E9C877' }));
  d.userData = { dx: 0.05 * Math.sin(i * 2.3), d0: (i % 5) * 0.06 }; SANDKORN.add(d); } SANDKORN.visible = false; scen.add(SANDKORN);
// Grodan badar (Sanna 27/11, "have frog bada in dammen"): ett vågkort i kod fälls upp framför henne på "plask", så att bara
// överkroppen syns, som i en pop-up-bok. Hon står på sidan bakom vågorna, inget går genom sidan.
const VAG = (() => { const w = 1024, h = 300, c = duk(w, h), x = c.getContext('2d'), N = BAD === 2 ? 9 : 7, TOP = BAD === 2 ? 70 : 30;
  const form = () => { x.beginPath(); x.moveTo(14, h - 14); x.lineTo(14, 120);
    for (let i = 0; i < N; i++) { const a = 14 + i * (w - 28) / N, b = a + (w - 28) / N; x.bezierCurveTo(a + 30, TOP, b - 60, TOP, b - 10, 120); }
    x.lineTo(w - 14, h - 14); x.closePath(); };
  x.strokeStyle = x.fillStyle = '#FFF'; x.lineWidth = BAD === 2 ? 16 : 26; x.lineJoin = 'round'; form(); x.fill(); x.stroke();
  const g = duk(w, h); kritYta(g.getContext('2d'), w, h, ...(BAD === 2 ? ['#78A8D2', '#9CC4E4', '#5E8FBE'] : ['#5FAEDD', '#93D0F2', '#3F8DC4']), 0.7);
  x.save(); form(); x.clip(); x.drawImage(g, 0, 0);
  x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 10; x.lineCap = 'round';
  for (let i = 0; i < N; i++) { const a = 14 + i * (w - 28) / N; x.beginPath(); x.moveTo(a + 40, 110); x.quadraticCurveTo(a + 70, 70, a + 105, 92); x.stroke(); }
  x.restore(); return tex(c); })();
const VAGKORT = kort(VAG, BAD === 2 ? 0.13 : 0.17, BLADPOS.bad[0], BLADPOS.bad[1] + 0.07, { flik: false });
// bad 3: inget vågkort, grodan landar på ett tredje blad mitt i dammen och vattnet ringar sig runt bladet
if (BAD === 3) platt(BLAD, 0.3, ...BLADPOS.bad, undefined, SIDA + 0.003);
// vattenringarna (runda 4, Sanna 27/11 "slight rings at water on jump", "polish the rings, a bit calmer, dont go over leafs"):
// tunna, lugna ringar som ligger mellan dammen och bladen, så att bladen täcker dem; en ring per händelse, ca 2,2 s
const RINGAR = [0, 1, 2, 3, 4, 5].map(() => { const m = new THREE.Mesh(new THREE.RingGeometry(0.94, 1, 72), new THREE.MeshBasicMaterial({ color: '#EAF6FF', transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.visible = false; scen.add(m); return m; });
function ringar(t) {
  const E = SKUTT.map(K => [...BLADPOS[1], K.t0 + K.d - 0.03, 0.45]);   // glädjeskutten på bladet (rad 05b)
  E.push([...BLADPOS[2], HOPP[1].t1, 0.55]);   // upp på bladet ur badet
  for (let tt = PLASK, i = 0; tt < UPPUR; tt += SIM[0] < tt && tt < SIM[1] ? 0.8 : 1.4, i++) { const [x, , z] = grodPos(tt); E.push([x, z, tt, i ? 0.35 : 0.6]); }   // följer henne när hon simmar
  for (const a of PLASK3) { const [x, , z] = grodPos(a); E.push([x, z, a, 0.4]); }
  E.push([...BLADPOS[2], HOPP[3].t1, 0.4], [...BLADPOS[1], HOPP[4].t1, 0.4]);   // hoppen till sandhörnet (utkast B)
  E.push([...BLADPOS.bad, S('24d') + 0.4, 0.45], [...BLADPOS[1], S('24d') + 0.9, 0.4], [...BLADPOS[2], S('24d') + 1.3, 0.4]);   // hej då, dammen
  const nu = E.filter(([, , t0]) => t >= t0 && t < t0 + 2.2);
  RINGAR.forEach((m, i) => { const e = nu[i]; m.visible = !!e; if (!e) return;
    const u = (t - e[2]) / 2.2, r = 0.15 + 0.2 * (1 - (1 - u) ** 2);
    m.position.set(e[0], SIDA + 0.0018, e[1]); m.scale.set(r, r * 0.6, 1); m.material.opacity = e[3] * (1 - u) ** 1.5 * Math.min(1, u * 6); });
}
const STANK = new THREE.Group(); for (let i = 0; i < 16; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.011 + 0.006 * (i % 3), 10, 8), mat(null, { color: '#CFEFFF', emissive: '#4b8fb8', emissiveIntensity: 0.3 }));
  d.userData = { a: i / 16 * Math.PI * 2 + 0.3 * Math.sin(i * 7), v: 0.7 + 0.3 * ((i * 5) % 4) / 3 }; STANK.add(d); } scen.add(STANK);

// ---- grodan: v2-riggen på ett kort ----
// HAND finns inte i grodans uttryck.html (Gurra har inget referensark än): händerna mätta ur gurra-arm-l/-r.png (yttersta klumpen),
// munnen ur ansiktets mått (MUNX 514, munbågen kring y 384). Bara i den här scenen, riggen ändras inte.
window.HAND = { l: [180, 668], r: [838, 665], kant: 8, mun: [514, 392] };
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, FOT = 926;
const L = await v2rigg('grodan-gurra'), G = L.figur(512, FOT, 1, $('figurer'));
G.querySelector('.skugga')?.setAttribute('display', 'none');
const SAK = L.sakBild(GLASS_URL, GLASS_I.width, GLASS_I.height, { grepp: [126, 300], fot: [126, 414], skala: 0.5, folj: 0, kant: 4, mat: true, mun: [118, 40], bett: [[172, 40, 50], [92, 48, 58], [140, 96, 66], [70, 132, 62], [188, 138, 62], [126, 176, 72], [56, 196, 44], [126, 100, 148],   // sista slicket tar resten av kulan (inga vita kantbitar kvar)
  // struten (runda 4, Sanna 27/11 "should be eaten up"): tuggorna 9–16, två och två
  [126, 236, 70], [70, 262, 50], [182, 262, 50], [126, 300, 64], [90, 340, 52], [162, 340, 52], [126, 372, 60], [126, 320, 175]] });   // sista tuggan tar resten
L.sakIn(G, SAK);
// spaden (utkast B): greppet i handtagets ögla, bladet nedåt; skalan så att den är lika stor som spaden i hinken
const SPADE_SAK = L.sakBild(SPADE_URL, 146, 155, { grepp: [100, 22], fot: [15, 150], skala: HINKEN.h / 404 / (0.36 * (STOR < 1 ? 0.8 : 1) / (FOT - 168)), folj: 1, kant: 0 });
await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
window.kant.lagg(G); const kantF = $('defs').lastElementChild;
const BL = skapaBlinka(62);
// droppar ritade i riggens ruta (de får figurens vita kant): glassdroppen (faller, och på nosen i .drag som följer huvudet) och vattendroppar
const NOS = [514, 318];
G.insertAdjacentHTML('beforeend', '<g id="dropparG"></g>');
(G.querySelector('.drag') || G).insertAdjacentHTML('beforeend', `<circle id="nosDroppe" cx="${NOS[0]}" cy="${NOS[1]}" r="17" fill="#FF6FAE" stroke="#fff" stroke-width="5" display="none"/><g id="huvudG"></g>`);
// huvudG följer huvudet (nick, skak): svetten, värmestrecken, tungan och vattendropparna på huvudet
// grodans höjd (ögonen till fötterna) styr kortets skala: lika hög som gurra.png-kortet i storyboarden (0,36)
L.rita(G, L.NEUTRAL, L.POSE0);
const TOPP = 168, ENHET = 0.36 * (STOR < 1 ? 0.8 : 1) / (FOT - TOPP);   // kroppens överkant (ögonen) i gurra-body.png
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
// runda 5 (Sanna 27/11 "flip up all", "flip up frog too"): allt fälls upp när boken öppnas, också sandslottet och grodan
const ORDNING = [...BAK, ...SKOG, ...BUSKAR, ...(BLOM ? BLOMS_K : [BLOMMOR_BAK]), ...SMATT, HINKEN, SLOTTET].sort((a, b) => a.z - b.z);
ORDNING.forEach((k, i, a) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); });
const NER = [BLOMMOR_UPPE, ...ORDNING].sort((a, b) => b.z - a.z);
NER.forEach((k, i, a) => k.ner = STANG + 0.3 + i * 0.5 / (a.length - 1));   // snabbare (Sanna 27/11 "faster close book")
const UPP_SLOTT = SVAR('22g', 36) - 0.2 - LN(36) + 1.0, UPP_BLOMMOR = S('19') + 0.1;   // sandslottet studsar på ordet "sandslott", blommorna på "Ja, där"
BLOMMOR_UPPE.upp = UPP_BLOMMOR;
// grodans kort reser sig med de andra, i sin plats i ordningen (bladet z 0,08)
const GROD_UPP = (ORDNING.find(k => k.z > BLADPOS[1][1]) ?? ORDNING.at(-1)).upp;
const PARM_NER = [STANG + 1.05, STANG + 1.75];

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
const KS = KRITAN.SKALA_SCEN * 1.25;   // kritan i närbild (större, Sanna 27/11 "bigger crayon")
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
  teckning('sol-gul', SOL_URL, SOL_R, () => SOLEN,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, a + 5.0], vanta: [a + 5.1, a + 5.8], ut: [b + 0.1, b + 0.9] }, [b, b + 0.8], [440, -40]);   // lugnare (strålarna är längre streck), väntar längre från strålarna
  teckning('glass-rosa', RQ + 'glass-rosa/cut/glass-rosa.png', GLASS_R, () => GLASSKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, c + 2.8], vanta: [c + 2.9, c + 3.6], ut: [d, d + 0.8] }, [d, d + 0.5], [280, 60]); }   // väntar till höger om glassen, under grodan (glassen flyttad, runda 5)
const SOL_KLAR = S('04') + 0.8, GLASS_KLAR = S('09') + 0.5, GLASS_UPP = S('09') + 0.75;   // fyllningens slut

// ---- grodans rörelser ----
const HOPP = [
  { t0: S('15') + 0.55, t1: S('15') + 1.4, fran: BLADPOS[1], till: BLADPOS.bad, h: 0.14 },   // ut i dammen, landar på "plask"
  { t0: S('17') - 1.15, t1: S('17') - 0.45, fran: BLADPOS.bad, till: BLADPOS[2], h: 0.2 },   // upp på bladet (högt över vågkortet)
  { t0: S('20') + 0.25, t1: S('20') + 0.9, fran: BLADPOS[2], till: BLADPOS[3], h: 0.1 },
  // utkast B: över bladen till sandhörnet (rad 22)
  { t0: S('22') + 0.1, t1: S('22') + 0.6, fran: BLADPOS[3], till: BLADPOS[2], h: 0.1 },
  { t0: S('22') + 0.75, t1: S('22') + 1.45, fran: BLADPOS[2], till: BLADPOS[1], h: 0.16 },
  { t0: S('22') + 1.6, t1: S('22') + 2.3, fran: BLADPOS[1], till: BLADPOS.sand, h: 0.14 },
];
// utkast A: grodan simmar ett varv i dammen (rad 15c) och plaskar med händerna (rad 15d, på "Plask, plask, plask!")
const SIM = [S('15c') + 0.3, S('15c') + 0.3 + 0.4 + LN(47) + 1.4], PLASK3 = [0, 1, 2].map(i => S('15d') + RR['15d'].malin[1][1] + 0.1 + i * LN(49) / 3);
const simU = t => k01((t - SIM[0]) / (SIM[1] - SIM[0]));
function grodPos(t) {
  let [x, z] = BLADPOS[1], y = 0;
  for (const H of HOPP) { if (t >= H.t1) [x, z] = H.till; else if (t >= H.t0) { const u = (t - H.t0) / (H.t1 - H.t0), m = mjuk(u);
    x = lerp(H.fran[0], H.till[0], m); z = lerp(H.fran[1], H.till[1], m); y = H.h * Math.sin(Math.PI * u); } }
  for (const K of SKUTT) { const u = (t - K.t0) / K.d; if (u > 0 && u < 1) y += K.h * Math.sin(Math.PI * u); }
  { const u = mjuk(simU(t)) * 2 * Math.PI; x += 0.13 * Math.sin(u); z -= 0.06 * (1 - Math.cos(u)); }   // ett varv, tillbaka där hon började
  const bad = BAD === 4 ? 0 : k01((t - HOPP[0].t1) / 0.5) * (1 - k01((t - HOPP[1].t0 + 0.4) / 0.3));   // bad 4 guppar i kortet (sjunk) i stället   // guppar lugnt i vattnet (aldrig under sidan)
  return [x, y + 0.006 * bad * (1 + Math.sin(t * 2.2)), z];
}
// glädjehopp på stället (Sanna 27/11 "happy jump"): två små skutt när grodan svarar glatt på "Hur är det, grodan?"
const SKUTT = [{ t0: SVAR('05b', 8) + 0.05, d: 0.5, h: 0.05 }, { t0: SVAR('05b', 8) + 0.6, d: 0.42, h: 0.032 }];
const PLASK = HOPP[0].t1, UPPUR = HOPP[1].t1;
// grodan sjunker ner i dammen (Sanna 27/11 "cant frog sink in to the damm?"): figuren glider nedåt i sitt kort och det som är
// under vattenlinjen ritas inte (#vatten), så att bara huvudet syns ovanför vågkortet. Upp igen före hoppet upp på bladet.
// bad 4 (Sanna 27/11 "make bad 4"): inget vågkort, grodan sjunker till axlarna mitt i dammen; vattenlinjen ligger i kortets fot,
// så att det som syns slutar där kortet möter dammen, och en vattenkant (#vattenYta) i dammens färg täcker snittet
const SJUNK = BAD === 4 ? 300 : BAD === 3 ? 0 : BAD === 2 ? 170 : 250, VATTEN = BAD === 4 ? 0.004 : 0.12 * STOR * (BAD === 2 ? 0.8 : 1);   // px i riggen, vattenlinjen i världens höjd över fötterna (vågkortet döljer den)
const sjunk = t => (SJUNK + (BAD === 4 ? 10 * Math.sin(t * 2.2) : 0)) * mjuk((t - PLASK - 0.05) / 0.7) * (1 - (BAD === 4 ? mjuk((t - HOPP[1].t0 + 0.2) / 0.4) : mjuk((t - (HOPP[1].t0 - 0.75)) / 0.45)));   // bad 4: upp ur vattnet i själva hoppet, aldrig stående på vattnet
const GLIDA = [S('11') + 0.1, S('11') + 0.9], MUMS = S('11') + 0.6 + 2.1, KON_UT = S('13') + 3.5;   // KON_UT: allt är uppätet, handen tom   // glassen till handen, tuggan på "Mums", struten släpps
const KLAPP = SVAR('22g', 36) - 0.2 + 0.1 - 1.0;   // riggens klapp möts vid 1, 1,5 och 2 s
// utkast B: spaden ur hinken till handen, skoporna, hinken som vänds över sandhögen och lyfts på "lyft!"
const SPADE_TA = [S('22c') + 0.1, S('22c') + 0.8];
const SKOPA = [[S('22c') + 0.9, 0.9], [S('22c') + 2.0, 0.9], [S('22f') + 0.05, 0.7]];   // [start, längd]: armen upp över hinken, sanden faller i
const HINKFLYG = [S('22d') + 0.25, S('22f') + 0.8].map((f0, i) => { const id = ['22d', '22f'][i], n = [54, 56][i], land = f0 + 0.9;
  const lyft = Math.max(land + 0.35, S(id) + RR[id].malin[0][1] + LN(n) - 0.25); return { f0, land, lyft, tx: TORN_X[i], ut: lyft + 0.45, hem: lyft + 1.35 }; });
const klar = i => SKOPA[i][0] + 0.75 * SKOPA[i][1];   // sanden har fallit i hinken
const sandFyll = t => t < HINKFLYG[0].land ? (t > klar(0)) * 0.55 + (t > klar(1)) * 0.45 : t < HINKFLYG[1].land ? (t > klar(2)) * 1 : 0;
function vink(f, p, tl, d, stor = false) {   // armen bakom kroppen, snett upp och ut förbi kanten (som grodans testfilm, lugnare takt)
  if (tl < 0 || tl > d) return [f, p];
  // hej då (stor): armen högre och tydligare vift, så att vinkningen syns i halvbilden (Sanna 27/11 "wave good bye")
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * (stor ? 1.5 : 1.3) * tl), [a, b] = stor ? [80, 24] : [55, 14];
  // hej då med armen på bildens vänstra sida: den andra skyms av blomkortet i hejda-vyn
  if (stor) return [f, { ...p, armar: [p.armar[0] + upp * (a + b * s), p.armar[1]], fram: [0, p.fram?.[1] || 0], luta: (p.luta || 0) + upp * (1.5 + 1.2 * s) }];
  return [f, { ...p, armar: [p.armar[0], p.armar[1] + upp * (a + b * s)], fram: [p.fram?.[0] || 0, 0], luta: (p.luta || 0) - upp * (1.5 + 1.2 * s) }];
}
const HEJDA = () => [S('24') + 0.3, STANG + 0.25];   // vinkar hela hej då-delen, tills kortet fälls ner
// grodan är varm (Sanna 27/11 "show signs of heat"): svettdroppar som rinner ner från pannan och värmestreck som stiger över huvudet
const VARM = () => [S('06') + 1.0, S('08') - 0.2];
function varmTecken(t) {
  const [a, b] = VARM(), k = mjuk((t - a) / 0.6) * (1 - mjuk((t - b + 0.5) / 0.5)); if (k <= 0) return '';
  let h = '';
  for (const [i, x] of [205, 250, 775, 820].entries()) { const u = ((t - a) * 0.55 + i * 0.27) % 1, y = 400 - 150 * u, op = k * Math.sin(Math.PI * u) * 0.9;
    const w = 14 * Math.sin(t * 4 + i);
    h += `<path d="M${x + w} ${y} q 18 -22 0 -44 q -18 -22 0 -44" fill="none" stroke="#F49A4E" stroke-width="10" stroke-linecap="round" opacity="${op.toFixed(2)}"/>`; }
  for (const [i, [x, y0]] of [[300, 280], [728, 262]].entries()) { const u = ((t - a) * 0.6 + i * 0.5) % 1, y = y0 + 120 * mjuk(u), op = k * Math.min(1, u * 5, (1 - u) * 4);
    h += `<path d="M${x} ${y - 30} Q${x + 17} ${y} ${x} ${y + 12} Q${x - 17} ${y} ${x} ${y - 30}Z" fill="#9FD8F5" stroke="#fff" stroke-width="5" opacity="${op.toFixed(2)}"/>`; }
  return h;
}
// grodan slickar glassen med tungan (Sanna 27/11 "better animation of eating glass"): tungan sträcks ut till kulan och in igen
const ATER = () => [S('13') + 0.3, S('13') + 1.0, S('13') + 1.7];
const BIT = () => [S('13') + 2.5, S('13') + 3.1];   // struten äts upp i två tuggor (sakBett 8 → 12 → 16)   // grodan slickar upp det sista (Sanna 27/11 "frog eating up last of icecream")
const SLICK = () => [MUMS - 0.3, MUMS + 0.2, S('12') + 0.05, ...ATER()];
const tunga = t => Math.max(0, ...SLICK().map(a => { const u = (t - a) / 0.45; return u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0; }));
// vattendropparna efter plasket (rad 15b): stänket faller tillbaka på huvudet, delar sig och rinner ner; rad 16: några pärlor glittrar
const HUVUDTOPP = [[392, 212], [512, 236], [632, 212], [452, 224]];
function vattenDroppar(t) {
  let h = ''; const t0 = S('15b'), dr = (x, y, s, op = 1) => `<path d="M${x} ${y - 24 * s} Q${x + 14 * s} ${y} ${x} ${y + 9 * s} Q${x - 14 * s} ${y} ${x} ${y - 24 * s}Z" fill="#9FD8F5" stroke="#fff" stroke-width="5" opacity="${op.toFixed(2)}"/>`;
  if (t >= t0 && t < S('16') + 0.6) for (const [i, [x, y]] of HUVUDTOPP.entries()) {
    const ta = t0 + 0.2 + i * 0.4, u = (t - ta + 0.35) / 0.35;   // faller 0,35 s, landar vid ta
    if (u > 0 && u < 1) h += dr(x, lerp(-200, y, u * u), 1);
    const v = (t - ta) / 0.3;   // två små stänk åt sidorna
    if (v > 0 && v < 1) for (const sd of [-1, 1]) h += `<circle cx="${(x + sd * 50 * v).toFixed(1)}" cy="${(y - 40 * Math.sin(Math.PI * v)).toFixed(1)}" r="${(7 * (1 - v * 0.5)).toFixed(1)}" fill="#BDE7FA" stroke="#fff" stroke-width="3"/>`;
    const w = (t - ta) / 1.4;   // pärlan rinner ner längs huvudet
    if (w > 0 && w < 1) h += dr(x + (x - 512) * 0.35 * mjuk(w), y + 170 * mjuk(w), 0.8, Math.min(1, (1 - w) * 4));
  }
  if (t >= S('16') && t < S('17')) { const k = mjuk((t - S('16')) / 0.4) * (1 - mjuk((t - S('17') + 0.4) / 0.4));
    for (const [i, [x, y]] of [[300, 300], [726, 292], [512, 262]].entries()) { const g = 0.5 + 0.5 * Math.sin(t * 5 + i * 2.1);
      h += `<g opacity="${k.toFixed(2)}">${dr(x, y, 0.75)}<path d="M${x + 14} ${y - 34} l0 ${-14 * g} M${x + 7 - 7 * g} ${y - 41} l${14 * g} 0" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>`; } }
  return h;
}
const REAKTION2 = { '15c': 'jatteglad', '15d': 'fnissig', '22b': 'kawaii', '22c': 'nyfiken', '22d': 'jatteglad', '22e': 'kawaii', '22f': 'stolt', '22g': 'skrattar' };
const nick = (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p];
const blicka = (tl, nycklar) => { let v = nycklar[0][1]; for (let i = 1; i < nycklar.length; i++) v = lerp(v, nycklar[i][1], mjuk((tl - nycklar[i][0]) / 0.5)); return v; };
let droppar = '';
const REAKTION = { '05': 'jatteglad', '05b': 'kawaii', '06': 'stolt', '07b': 'tanker', '08': 'nyfiken', '09': 'kawaii', '10': 'blinkar',
  '11': 'mums', '11b': 'fnissig', '12': 'forvanad', '12b': 'skrattar', '13': 'tanker', '14': 'jatteglad', '15': 'skrattar', '15b': 'fnissig',
  '16': 'stolt', '17': 'nyfiken', '18': 'nyfiken', '19': 'jatteglad', '19b': 'kawaii', '20': 'kawaii', '21': 'blinkar', '22': 'skrattar', '23': 'kawaii' };
// smakar: armen med glassen lyfts snett upp mot ansiktet och grodan lutar sig dit (riggens sakMun lade glassen bakom huvudet)
const smaka = (p, k) => { p.armar = [p.armar[0] + 62 * k, p.armar[1]]; p.luta = (p.luta || 0) + 3 * k; };
function grodan(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] }, nos = false; droppar = '';
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };   // liv när hon står: blicken, tyngden
  const halla = t >= GLIDA[1] && t < KON_UT;
  if (halla) p.hall = [1, 0];
  if (t >= MUMS + 0.1) p.sakBett = k01((t - MUMS - 0.1) / 0.3);   // tuggan är borta när tungan har slickat
  ATER().forEach((a, i) => { if (t >= a + 0.25) p.sakBett = Math.max(p.sakBett || 0, lerp(1 + i * 7 / 3, 1 + (i + 1) * 7 / 3, k01((t - a - 0.25) / 0.3))); });
  BIT().forEach((a, i) => { if (t >= a) p.sakBett = Math.max(p.sakBett || 0, lerp(8 + 4 * i, 12 + 4 * i, k01((t - a) / 0.2))); });
  switch (id) {
    case '05': [f, p] = vink(f, p, tl - 0.6, r.d - 0.8); break;
    case '05b': { const sv = SVAR('05b', 8) - r.s; f = { ...f, titt: [tl < sv ? 10 * Math.sin(tl * 2.2) : 0, 0] };
      f = L.blanda(f, 'jatteglad', bump(sv, sv + 1.3, tl)); p.rikt = tl < sv ? 0.3 * Math.sin(tl * 2.2) : 0; break; }
    case '06': f = { ...f, titt: [0, -6 * mjuk(tl / 0.5)] }; break;   // tittar upp mot solen (posen 'upp' gav sura bryn)
    case '07': case '07b': { f = L.blanda({ ...f, kind: 1.25, titt: [0, 3] }, 'ledsen', 0.5); f.kind = 1.3;   // varm och lite besvärad (Sanna 27/11 "look a bit distressed"), rosiga kinder
      const ts = id === '07' ? 0.5 + LN(11) + 0.2 : -9; p.strack = -0.035 * bump(ts, ts + 1.3, tl, 0.4); p.armar = [-6, -6];
      // fläktar sig med handen efter sucken (rad 07) och i början av 07b
      const fl = id === '07' ? bump(ts + 1.1, r.d + 0.6, tl, 0.35) : bump(-0.6, 1.6, tl, 0.35);
      p.armar = [p.armar[0], p.armar[1] + fl * (62 + 16 * Math.sin(2 * Math.PI * 2.6 * t))];
      if (id === '07b') { f = { ...f, titt: [0, 0] }; [f, p] = nick(f, p, tl - 0.2); }   // svarar ja med en nick (Sanna 27/11 "nod head")
      break; }
    case '08': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-10, 5]; p.rikt = -0.35; break;
    case '09': f = L.blanda(B('nyfiken'), 'kawaii', mjuk((tl - 0.5) / 0.4)); f.titt = [-10, 5]; p.rikt = -0.35 * (1 - mjuk((tl - 2) / 0.6)); break;
    case '10': [f, p] = nick(f, p, tl - 0.3); break;
    case '11': { const munK = mjuk((t - (MUMS - 0.9)) / 0.6) * (1 - mjuk((t - (MUMS + 0.75)) / 0.6));
      smaka(p, munK); f = L.blanda(f, { ...B('nyfiken'), titt: [-12, 4] }, munK * (1 - mjuk((t - MUMS - 0.65) / 0.3)));
      f = L.blanda(f, 'jatteglad', Math.min(1, 2 * tunga(t)) + bump(MUMS + 0.6, MUMS + 1.6, t, 0.2)); break; }
    case '11b': f = B('jatteglad'); break;   // munnen syns (Sanna 27/11 "show mouth"; 'mums' hade ingen mun)
    case '12': { // glassen når nosen när grodan slickar (armarna är för korta för att hålla den ovanför nosen), en rosa prick blir kvar
      smaka(p, bump(-0.3, 0.75, tl, 0.3)); f = L.blanda(f, 'jatteglad', Math.min(1, 2 * tunga(t)));
      nos = tl > 0.45; f = L.blanda(f, { ...B('forvanad'), titt: [0, -12] }, mjuk((tl - 0.45) / 0.25)); break; }
    case '12b': { [f, p] = L.skakaHuvud(L.blanda(f, 'fnissig', mjuk((tl - 0.9) / 0.3)), p, tl - 0.05, 1.6, 1.5);
      const u = tl / 0.45; if (u < 1) droppar += `<circle cx="${(NOS[0] + 30 * u).toFixed(1)}" cy="${lerp(NOS[1], FOT + 20, u * u).toFixed(1)}" r="17" fill="#FF6FAE" stroke="#fff" stroke-width="5"/>`; break; }
    case '13': { const a = ATER(), b = BIT(), munK = bump(a[0] - 0.4 - r.s, b[1] + 0.35 - r.s, tl, 0.35);
      smaka(p, munK); f = L.blanda(L.blanda(f, { ...B('nyfiken'), titt: [-12, 4] }, munK), 'jatteglad', Math.min(1, 2 * tunga(t)));
      f = L.blanda(f, 'mums', Math.max(...b.map(x => bump(x - 0.1 - r.s, x + 0.35 - r.s, tl, 0.1))));   // tuggar
      f = L.blanda(f, 'jatteglad', bump(b[1] + 0.4 - r.s, b[1] + 1.4 - r.s, tl, 0.25));
      const ut = mjuk((tl - 4.2) / 0.6); f = L.blanda(f, { ...f, titt: [9, 5] }, ut); p.rikt = 0.3 * ut; break; }
    case '14': f = { ...f, titt: [7, 8] }; [f, p] = nick(f, p, tl - (SVAR('14', 23) - r.s + 0.3)); break;
    case '15': f = L.blanda(f, 'jatteglad', bump(PLASK - r.s, PLASK - r.s + 1.4, tl)); break;
    case '15b': f = L.blanda(B('jatteglad'), 'blinkar', 0.3); break;
    case '16': f = L.blanda(f, 'kawaii', 0.5); break;
    case '17': f = B('nyfiken'); p.rikt = 0.5 * Math.sin(tl * 1.2); f.titt = [10 * Math.sin(tl * 1.2), -2]; break;
    case '18': f = B('nyfiken'); break;
    case '19': f = L.blanda(B('glad'), 'kawaii', 0.8); p.rikt = 0.6 * mjuk((tl - 0.3) / 0.5); f.titt = [10, 0]; break;
    case '19b': f = L.blanda(B('glad'), 'kawaii', 0.6); p.rikt = 0.6; f.titt = [10, 0]; break;
    case '20': p.rikt = 0.6 * mjuk((tl - 1.0) / 0.5); f.titt = [10, 0]; break;
    case '21': { const ts = 0.5 + LN(34) + 0.2; f = { ...B('glad'), glad: [1, 1], kind: 1.1 }; p.rikt = 0.6; p.luta = -5 * mjuk(tl / 0.8);
      p.strack = -0.025 * bump(ts, ts + 1.2, tl, 0.4); break; }
    case '15c': { const u = simU(t), sv = Math.sin(2 * Math.PI * 1.1 * t), on = bump(SIM[0] - 0.2, SIM[1] + 0.2, t, 0.3);   // simmar: armarna paddlar växelvis, tittar dit hon simmar
      p.armar = [p.armar[0] + on * (18 + 18 * sv), p.armar[1] + on * (18 - 18 * sv)]; p.rikt = 0.45 * Math.cos(2 * Math.PI * mjuk(u)) * on;
      f = L.blanda(f, 'jatteglad', 0.5 * on); break; }
    case '15d': { const k = Math.max(...PLASK3.map(a => bump(a - 0.15, a + 0.15, t, 0.12)));   // plaskar: båda händerna upp och ner i vattnet
      p.armar = [p.armar[0] + 95 * k, p.armar[1] + 95 * k]; f = L.blanda(f, 'fnissig', mjuk((t - PLASK3[0] + 0.3) / 0.3)); break; }
    case '22': { const land = HOPP.at(-1).t1; f = L.blanda(B('glad'), 'nyfiken', mjuk((t - land) / 0.4)); p.rikt = -0.4 * mjuk((t - land - 0.2) / 0.5); break; }   // tittar på hinken
    case '22b': f = { ...f, titt: [0, 0] }; [f, p] = nick(f, p, tl - (SVAR('22b', 51) - r.s + 0.2)); break;
    case '22c': case '22d': case '22e': case '22f': {
      p.rikt = -0.35;
      const ta = bump(SPADE_TA[0], SPADE_TA[1] + 0.1, t, 0.25); p.armar = [p.armar[0] + 30 * ta, p.armar[1]];   // tar spaden ur hinken
      for (const [a, d] of SKOPA) { const u = (t - a) / d; if (u > 0 && u < 1) { p.armar = [p.armar[0] + 42 * Math.sin(Math.PI * u), p.armar[1]]; p.luta = (p.luta || 0) - 3 * Math.sin(Math.PI * u); } }
      for (const F of HINKFLYG) { const k = bump(F.f0, F.land, t, 0.3) + bump(F.lyft - 0.1, F.ut + 0.1, t, 0.15);   // lyfter med i luften
        p.armar = [p.armar[0] + 30 * k, p.armar[1] + 30 * k]; f = L.blanda(f, 'jatteglad', mjuk((t - F.lyft) / 0.3) * (1 - mjuk((t - F.hem) / 0.5))); }
      if (id === '22e') p.rikt = -0.5;
      break; }
    case '22g': { f = L.blanda(B('glad'), 'jatteglad', mjuk((t - UPP_SLOTT) / 0.4)); p.rikt = -0.4 * mjuk((t - UPP_SLOTT + 0.3) / 0.5);
      if (t > KLAPP && t < KLAPP + 2.8) { const [, p2] = L.ROR.klappa(t - KLAPP); p = { ...p2, rikt: p.rikt * 0.5 }; } break; }
    case '23': [f, p] = nick(f, p, tl - (SVAR('23', 37) - r.s)); break;
  }
  { const [a, b] = HEJDA(); [f, p] = vink(f, p, t - a, b - a, true); }
  // hoppen: hukar före, sträcker sig i luften, landar mjukt
  const sakP = { hall: p.hall, sakBett: p.sakBett };   // blandaPose bygger en ny pose utan saken i handen
  for (const K of SKUTT) p = L.blandaPose(p, 'huka', 0.6 * bump(K.t0 - 0.2, K.t0 + 0.03, t, 0.12) + 0.4 * bump(K.t0 + K.d - 0.02, K.t0 + K.d + 0.2, t, 0.1));
  for (const H of HOPP) { p = L.blandaPose(p, 'huka', bump(H.t0 - 0.35, H.t0 + 0.05, t, 0.2) + 0.7 * bump(H.t1 - 0.02, H.t1 + 0.35, t, 0.15));
    if (t > H.t0 && t < H.t1) { p.strack = 0.03; p.armar = [p.armar[0] + 20, p.armar[1] + 20]; } }
  if (sakP.hall) p.hall = sakP.hall; if (sakP.sakBett) p.sakBett = sakP.sakBett;
  if (t >= SPADE_TA[1]) p.hall = [1, 0];   // spaden i vänster hand från rad 22c (också i klappen och vinkningen)
  // reaktionsslaget i radens slut (GLES): ett uttryck som passar raden och en liten huvudlutning (Sanna 27/11: "more expressions")
  const RE = REAKTION[id] ?? REAKTION2[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  $('nosDroppe').setAttribute('display', nos ? 'inline' : 'none');
  return [BL(f, t), p];
}

// ---- utkast B: spaden, sanden, hinken som vänds och slottet som byggs ----
const GLIMT = [S('22g') + 0.45, S('22g') + 0.4 + LN(57) * 0.5];   // tornen glimtar på "ett" och "två"
function bygge(t) {
  const hel = t >= UPP_SLOTT + 0.5;   // hela slottet står: sandhögen blir hela sand.png, delarna göms
  SLOTTET.m.material.map = SLOTTET.m.customDepthMaterial.map = hel ? SLOTT_HEL : SLOTT_HOG;
  TORN.forEach((m, i) => { const up = i < 2 ? +(t >= HINKFLYG[i].land) : reser((t - UPP_SLOTT) / 0.45), g = i < 2 ? bump(GLIMT[i], GLIMT[i] + 0.5, t, 0.15) : 0;
    m.visible = !hel && up > 0.01; m.scale.set(1 + 0.08 * g, Math.max(0.01, up) * (1 + 0.08 * g), 1); m.material.emissive.setScalar(0.04 * g); });
  // hinken: lyfts i en båge (först i sidled, sedan bakåt, så att den aldrig går genom grodan eller sandhögen), vänds upp och ner och
  // landar med öppningen på sandhögens topp framför tornets plats; lyfts rakt upp på "lyft!" och flyger tillbaka
  const hm = HINKEN.m, F = HINKFLYG.find(F => t >= F.f0 && t < F.hem), C0 = v3(HINKEN.x, SIDA + HH / 2, HINKEN.z), yr = HH * (404 - 150) / 404;
  if (!F) { hm.rotation.z = 0; hm.position.x = HINKEN.x; hm.position.z = HINKEN.z; }
  else {
    const C1 = v3(F.tx, KULLE_Y + yr - HH / 2, SLOTTET.z + 0.012), A = C1.clone().setY(C1.y + 0.14); let C, th;
    if (t < F.land) { const u = (t - F.f0) / (F.land - F.f0); th = Math.PI * mjuk(u);
      C = v3(lerp(C0.x, C1.x, mjuk(u / 0.7)), lerp(C0.y, C1.y, mjuk(u)) + 0.16 * Math.sin(Math.PI * u), lerp(C0.z, C1.z, mjuk((u - 0.3) / 0.7))); }
    else if (t < F.ut) { C = C1.clone().lerp(A, mjuk((t - F.lyft) / (F.ut - F.lyft))); th = Math.PI; }
    else { const u = (t - F.ut) / (F.hem - F.ut); th = Math.PI * (1 - mjuk(u));
      C = v3(lerp(A.x, C0.x, mjuk((u - 0.3) / 0.7)), lerp(A.y, C0.y, mjuk(u)) + 0.08 * Math.sin(Math.PI * u), lerp(A.z, C0.z, mjuk(u / 0.7))); }
    hm.rotation.x = 0; hm.rotation.z = th; hm.position.set(C.x + Math.sin(th) * HH / 2, C.y - Math.cos(th) * HH / 2, C.z);
  }
  if (HINKEN.flik && F) HINKEN.flik.visible = false;
  // spaden: upp ur hinken först (över kanten), sedan bakåt till grodans hand; riggens spade tar över i handen
  SPADEKORT.visible = t < SPADE_TA[1]; SPADEKORT.position.copy(SPADE_VILA);
  if (t >= SPADE_TA[0] && t < SPADE_TA[1]) { const u = (t - SPADE_TA[0]) / (SPADE_TA[1] - SPADE_TA[0]), k = HH / 404, [gx, gy, gz] = grodPos(t);
    const hand = fig2varld(window.HAND.l, v3(gx, GRODKORT.y + gy, gz)); hand.x -= 27 * k; hand.y -= 55.5 * k;
    hm.updateMatrixWorld(true); const mal = hm.worldToLocal(hand);
    SPADEKORT.position.set(lerp(SPADE_VILA.x, mal.x, mjuk(u)), lerp(SPADE_VILA.y, mal.y, mjuk(u)) + 0.12 * Math.sin(Math.PI * u), lerp(SPADE_VILA.z, mal.z, mjuk((u - 0.4) / 0.6))); }
  // sanden i hinken och kornen som faller från spaden
  const fy = sandFyll(t); SANDKULLE.visible = fy > 0 && !F; SANDKULLE.scale.y = 0.35 + 0.65 * fy;
  const sk = SKOPA.find(([a, d]) => t > a + 0.45 * d && t < a + d + 0.1); SANDKORN.visible = !!sk && !F;
  if (sk && !F) { hm.updateMatrixWorld(true); const o = hm.localToWorld(hpx(145, 150)), u = (t - sk[0] - 0.45 * sk[1]) / (0.55 * sk[1] + 0.1);
    SANDKORN.children.forEach(d => { const v = k01(u * 1.3 - d.userData.d0); d.position.set(o.x + d.userData.dx * (1 - v) + 0.03, o.y + 0.07 * (1 - v * v), o.z + 0.01); d.visible = v > 0 && v < 1; }); }
}

// ---- en bildruta ----
const V = { e: 0 };
async function ritaGroda(t) {
  const [x, y, z] = grodPos(t); groda.position.set(x, GRODKORT.y + y, z);
  const [f, p] = grodan(t);
  const sak = t >= SPADE_TA[1] ? SPADE_SAK : SAK; if (G.sak !== sak) L.sakIn(G, sak);   // glassen, sedan spaden (utkast B)
  L.rita(G, f, p); L.sakRita(G, p);   // grodans uttryck.html ritar ingen sak själv (inget referensark än)
  $('dropparG').innerHTML = droppar;
  // sjunka i dammen: figuren nedåt i kortet, vattenlinjen (lätt vågig) klipper det som är under
  const sj = sjunk(t); $('figurer').setAttribute('transform', `translate(0 ${sj.toFixed(1)})`);
  if (sj > 0.5) { const yw = FOT - VATTEN / ENHET; let d = `M-400 -400H1600V${yw}`;
    for (let x = 1600; x > -400; x -= 100) d += `Q${x - 50} ${(yw + 9 * Math.sin(x * 0.03 + t * 2)).toFixed(1)} ${x - 100} ${yw}`;
    $('vattenKant').setAttribute('d', d + 'Z');
    // bad 4: vattenkanten framför kroppen, lite bredare än grodan, med vita vågstreck (som dammens kritvatten)
    if (BAD === 4) { const k = mjuk((sj - 40) / 120), x0 = 512 - 330, x1 = 512 + 330, n = 6, w = (x1 - x0) / n; let v = `M${x0} ${yw + 40}L${x0} ${yw}`, h = '';
      for (let i = 0; i < n; i++) { const a = x0 + i * w, dy = 3 * Math.sin(t * 2 + i); v += `Q${a + w / 2} ${(yw - 22 + dy).toFixed(1)} ${a + w} ${yw}`;
        h += `<path d="M${a + w * 0.25} ${yw - 4}Q${a + w / 2} ${(yw - 18 + dy).toFixed(1)} ${a + w * 0.75} ${yw - 4}" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="7" stroke-linecap="round"/>`; }
      $('vattenYta').innerHTML = `<path d="${v}L${x1} ${yw + 40}Z" fill="#7FB2CF" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>` + h; $('vattenYta').setAttribute('opacity', k.toFixed(2)); }
  } else { $('vattenKant').setAttribute('d', 'M-400 -400H1600V2000H-400Z'); $('vattenYta').innerHTML = ''; }
  // huvudet: värmetecknen, vattendropparna och tungan som slickar glassen (mot kulan, räknat ur det sakRita just ritade)
  let hu = varmTecken(t) + vattenDroppar(t); const e = tunga(t);
  const ting = G.querySelector('.sak-plats[display="inline"] .sak-ting');
  if (e > 0 && ting) { const hg = $('huvudG'), M = DOMMatrix.fromMatrix(hg.getCTM()).inverse().multiply(DOMMatrix.fromMatrix(ting.getCTM()));
    const T = M.transformPoint(new DOMPoint(150, 95)), [mx, my] = window.HAND.mun, x = lerp(mx, T.x, e), y = lerp(my, T.y, e);
    const cx = (mx + x) / 2, cy = Math.min(my, y) - 40 * e;
    hu += `<path d="M${mx} ${my} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="#E2607F" stroke-width="26" stroke-linecap="round"/>`
      + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" fill="#F48FA8"/>`; }
  $('huvudG').innerHTML = hu;
  // struten ur handen (rad 13): riggens sak döljs när 3D-struten tar över
  G.querySelectorAll('.sak-plats image').forEach(im => { im.setAttribute('opacity', G.sak === SPADE_SAK || (t >= GLIDA[1] && t < KON_UT) ? 1 : 0); });
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
  for (const k of [...ORDNING, BLOMMOR_UPPE]) {
    let e = k.upp != null ? reser((t - k.upp) / 0.45) : 0;
    if (k.ner != null) e *= 1 - mjuk((t - k.ner) / 0.35);
    vik(k, e); if (k.flik) k.flik.visible = e > 0.6;   // kontaktskuggan bara när kortet står
    if (k.vaj !== undefined) k.m.rotation.z = 0.025 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  { const e = 1 - SLOTTET.m.rotation.x / (Math.PI / 2); SANDFLACK.visible = e > 0.02; SANDFLACK.scale.setScalar(Math.max(0.02, Math.min(1, e))); }
  // hej då (rad 24b, 24c): blommorna och sandslottet studsar lite på sitt "hej då"
  { const hs = Math.max(bump(S('24c') + 0.35, S('24c') + 1.0, t, 0.2), 0);   // på "sandslott" reser sig mitten i stället (bygge)
    SLOTTET.m.scale.setScalar(1 + 0.1 * hs); SLOTTET.m.position.y += 0.015 * hs; }
  // hej då, solen (rad 24): solen glimtar
  SOLEN.scale.setScalar(1 + 0.08 * bump(S('24') + 1.55, S('24') + 2.4, t, 0.2));
  BLOMMOR_UPPE.m.visible = t >= S('19') && !BLOM; BLOMMOR_UPPE.flik.visible &&= t >= S('19');
  // blommorna skimrar: svagt 3 s in i letandet (rad 18), tydligt när de hittas
  // blommorna studsar på sina färgord (rad 19b: röd, gul, lila, rosa) och alla lite på "Ja, där är blommorna!"
  { const m = S('19b') + 0.4, a = m + LN(41) + 0.4, b = a + LN(42) + 0.4, ORD = [m + 0.15, a + 0.15, b + 0.55, b + 1.55];
    BLOMS_K.forEach((k, i) => { const h = Math.max(bump(ORD[i] ?? -9, (ORD[i] ?? -9) + 0.5, t, 0.2), 0.5 * bump(S('19') + 0.2, S('19') + 0.75, t, 0.2),
      0.8 * bump(S('24b') + 0.3 + i * 0.12, S('24b') + 0.9 + i * 0.12, t, 0.2));   // hej då, blommorna
      k.m.position.y += 0.025 * h; k.m.scale.setScalar(1 + 0.12 * h); k.m.material.emissive.setScalar(0.015 * h); }); }   // svagt: emissive räknas linjärt och bleker färgen snabbt
  const sk0 = S('18') + 0.3 + LN(40) + 2.0, skim = t < S('19') ? 0.35 * k01((t - sk0) / 0.6) * (0.6 + 0.4 * Math.sin((t - sk0) * 5)) : bump(S('19') - 0.1, S('19') + 1.2, t, 0.3);
  for (const m of [BLOMMOR_BAK.m.material, BLOMMOR_UPPE.m.material]) m.emissive.setScalar(0.22 * skim);
  if (t < S('19b')) for (const k of BLOMS_K) k.m.material.emissive.setScalar(Math.max(k.m.material.emissive.r, 0.02 * skim));   // studsen satte värdet nyss
  // grodans kort: upp med de andra när boken öppnas, ner först när boken stängs
  vik(GRODKORT, reser((t - GROD_UPP) / 0.45) * (1 - mjuk((t - STANG - 0.25) / 0.35)));
  // solen: syns när fyllningen är klar
  SOLEN.visible = t >= SOL_KLAR - 0.05; SOLEN.rotation.z = 0.035 * Math.sin((t - SOL_KLAR) * 0.7) * k01((t - SOL_KLAR) / 1.5);   // gungar lugnt ±2° (runda 5, Sanna 27/11 "sun face tilt too much": den snurrade förut hela tiden)
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // varmare ljus när solen kommer (rad 04) och ännu varmare när den skiner (rad 06)
  const varm = 0.55 * mjuk((t - SOL_KLAR + 0.3) / 1.2) + 0.45 * mjuk((t - S('06') - 0.2) / 1.5);
  ljus.color.copy(LJUS0).lerp(LJUS1, varm); ljus.intensity = 2.2 + 0.25 * varm; hemi.color.copy(HEMI0).lerp(HEMI1, varm);
  // glassen: ligger (bildsidan upp) där kritan ritade den, reser sig, glider till grodans hand
  const G0 = GLASSKORT;
  G0.m.visible = t >= GLASS_KLAR - 0.05 && t < GLIDA[1]; G0.flik.visible = G0.m.visible && t < GLIDA[0] && t > GLASS_UPP + 0.25;
  G0.m.rotation.x = -Math.PI / 2 * (1 - reser((t - GLASS_UPP) / 0.45)); G0.m.position.set(G0.x, G0.y, G0.z); G0.m.scale.setScalar(1);
  if (t >= GLIDA[0] && t < GLIDA[1]) {
    const u = mjuk((t - GLIDA[0]) / (GLIDA[1] - GLIDA[0])), mal = fig2varld(window.HAND.l), sk = lerp(1, 0.5 * GLASS_I.height * ENHET / G0.h, u);
    mal.y -= (414 - 300) * 0.5 * ENHET;   // greppet i handen, foten under
    G0.m.position.set(lerp(G0.x, mal.x, u), lerp(G0.y, mal.y, u) + 0.12 * Math.sin(Math.PI * u), lerp(G0.z, mal.z, u)); G0.m.scale.setScalar(sk);
  }
  // struten släpps (rad 13): glider ner på gräset och fälls ner
  const K = KONKORT; K.m.visible = false;   // struten släpps inte längre, den äts upp if (K.flik) K.flik.visible = false;
  if (K.m.visible) { const fran = fig2varld(window.HAND.l), u = mjuk((t - KON_UT) / 0.8), mal = v3(-0.46, SIDA + 0.002, 0.3);
    fran.y -= (414 - 300) * 0.5 * ENHET;
    K.m.position.set(lerp(fran.x, mal.x, u), lerp(fran.y, mal.y, u) + 0.05 * Math.sin(Math.PI * u), lerp(fran.z, mal.z, u));
    K.m.rotation.x = Math.PI / 2 * mjuk((t - KON_UT - 0.8) / 0.4); }
  // vågkortet: upp på "plask", ner när grodan hoppat upp på bladet
  ringar(t);
  bygge(t);
  VAGKORT.m.visible = BAD <= 2 && t >= PLASK - 0.05 && t < UPPUR + 0.8; vik(VAGKORT, reser((t - PLASK + 0.05) / 0.45) * (1 - mjuk((t - UPPUR - 0.1) / 0.45)));
  // stänket: droppar i en båge runt grodan på "plask" (och ett litet när hon hoppar upp)
  const st = [[PLASK, 1], [HOPP[1].t0 + 0.05, 0.5], ...PLASK3.map(a => [a, 0.4])].findLast(([t0]) => t >= t0 && t < t0 + 1.1);
  STANK.visible = !!st;
  if (st) { const u = (t - st[0]) / 1.1, [bx, , bz] = grodPos(st[0]);
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
  const blomMitt = BLOM ? BLOMS_K[2].m : BLOMMOR_BAK.m;
  if (t > sk0 && t < S('19')) ov += gn(sk0, blomMitt);
  if (t >= S('19') && t < S('19') + 2.5) ov += gn(S('19'), BLOM ? blomMitt : BLOMMOR_UPPE.m);
  $('ov').innerHTML = ov;
  komp.render();
}

// ---- kameran: vyerna ur storyboarden (rader.mjs s.vy), en vy per utsnitt, en svag glidning i varje ----
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  bred: () => [v3(0, 0.66, 1.75), v3(0, 0.36, -0.25), 32],
  himmel: () => { scen.updateMatrixWorld(true); const s = SOLEN.getWorldPosition(v3()); return [v3(s.x - 0.05, s.y - 0.12, s.z + 1.25), s, 30]; },
  // runda 3 (Sanna 27/11 "move camera up a bit, zoom out a bit"): halvbilden högre och längre bort; halv, halv-sol och nära har
  // samma fov, så att kameran kan glida mellan dem utan att bilden hoppar
  halv: g => [g.clone().add(v3(0.06, 0.34, 0.98)), g.clone().add(v3(0, 0.17, 0)), 30],
  'halv-sol': g => [g.clone().add(v3(0.15, 0.14, 0.8)), g.clone().add(v3(0.06, 0.32, -0.4)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.3, 0.61)), g.clone().add(v3(0, 0.25, 0)), 30],
  glass: () => [v3(-0.42, 0.75, 1.15), v3(-0.45, 0.16, 0.24), 30],   // glassteckningen och grodan i samma bild
  damm: () => [v3(0.12, 0.85, 1.55), v3(0.12, 0.06, 0.02), 32],
  hopp: () => [v3(-0.1, 0.72, 1.15), v3(-0.06, 0.12, 0.02), 34],   // högre, så att hinken inte skymmer
  buske: () => [v3(0.98, 0.5, 1.04), v3(0.6, 0.17, -0.04), 32],   // snett från höger, så att uppslaget är bakgrunden (runda 5)
  'buske-nara': () => [v3(0.95, 0.3, 0.55), v3(1.02, 0.22, -0.14), 28],
  bygge: () => [v3(-0.6, 0.62, 1.9), v3(-0.66, 0.2, 0.62), 30],   // utkast B: grodan, hinken och sandhögen i samma bild
  torn: () => [v3(-0.9, 0.42, 1.12), v3(-0.95, 0.25, 0.58), 28],   // närbild på torn 1
  helhet: () => [v3(0.12, 0.78, 1.62), v3(0.12, 0.18, -0.02), 32],   // närmare (runda 4, Sanna 27/11 "dont see the edges outside book")   // barnet letar blommorna: hela uppslaget i bild (Sanna 27/11 "show full scene")
  slut: () => [v3(-0.15, 1.45, 2.45), v3(0, 0.2, -0.1), 32],   // boken stängs närmare (Sanna 27/11 "closer close book")
  // blommorna ses snett från höger, så att uppslaget (inte bordet) är bakgrunden
  blommor: () => BLOM ? [v3(0.95, 0.46, 1.12), v3(0.62, 0.16, 0.1), 30] : [v3(0.6, 0.4, 1.05), v3(0.82, 0.19, 0.08), 30],
  'bad-nara': g => BAD === 1 ? [g.clone().add(v3(0.03, 0.3, 0.82)), g.clone().add(v3(0, 0.22, 0)), 28] : [g.clone().add(v3(0.05, 0.36, 1.05)), g.clone().add(v3(0, 0.14, 0)), 30],   // i badet: vågorna nederst i bild
  'blommor-nara': () => BLOM ? [v3(0.92, 0.36, 0.95), v3(0.66, 0.15, 0.2), 30] : [v3(0.64, 0.42, 1.0), v3(0.86, 0.24, 0.1), 28],
  sand: () => [v3(-0.36, 0.7, 1.75), v3(-0.32, 0.13, 0.2), 42],   // sandhörnet till vänster, grodan på stranden till höger (runda 5)
  hejda: g => [g.clone().add(v3(-0.1, 0.3, 0.82)), g.clone().add(v3(0.02, 0.2, -0.2)), 32],   // närmare, så att vinkningen syns
};
if (STOR < 1) for (const [n, f] of Object.entries(VY)) if (!['bord', 'slut', 'himmel'].includes(n)) VY[n] = g => { const [pos, mal, fov] = f(g); return [mal.clone().add(pos.clone().sub(mal).multiplyScalar(1.12)), mal, fov]; };
const ALIAS = { halv2: 'halv', nara2: 'nara', nara3: 'nara', logga: 'bord', 'buske-nara': 'helhet' };
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
// mjuka byten (Sanna 27/11 "more smooth camera shots"): i stället för ett klipp glider kameran från förra vyns läge till nästa vy
const GLID = { '06': [0, 1.0], '07': [0, 1.1] };   // 05: klipp från solen till grodan (glidningen svängde ut förbi den större pärmen, runda 5)   // [start rel. radens början, längd]
function glid(t0, d, namn, g) {
  const f = VYER.at(-1), [p0, m0] = fran3(f.till ?? f.fran, platser[f.mot]), [pos, mal, fov] = VY[namn](g); pos.y += 0.09;
  const P = [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  VYER.push({ t: t0, mot: key, fran: lage(p0, m0, P), till: lage(pos, mal, P), fov, mal, blur: blurFor(namn), rorelse: 'glid' });
  vy(t0 + d, namn, g);
}
const P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0), bredL = lage(...VY.bred().slice(0, 2), P0);
let forra = '';
for (const r of RAD) {
  let namn = r.id === '15' ? 'hopp' : ALIAS[r.st.vy] || r.st.vy; if (namn === 'nara' && r.st.blad === 'bad') namn = 'bad-nara';
  const bp = BLADPOS[r.st.blad], g = v3(bp[0], SIDA, bp[1]), key = namn + r.st.blad;
  // introt: kameran driver lugnt runt och in mot boken redan medan den är stängd (Sanna 27/11 "slight camera movement, faster intro")
  if (r.id === '01a') { vy(r.s, 'bord', g, { P: P0, fran: [bordL[0] - 7, bordL[1] * 1.07, bordL[2] * 1.05, bordL[3], bordL[4]], till: bordL, mal: v3(0, 0.25, -0.1) }); forra = 'bord'; continue; }
  if (r.id === '01b') { const t0 = r.s + 0.9;   // en lång lugn glidning in i boken (ca 4 s), sedan står kameran och andas
    VYER.at(-1).till = bordL; vy(t0, 'bred', g, { P: P0, fran: bordL, till: bredL, mal: v3(0, 0.36, -0.25) });
    vy(S('02') + 1.0, 'bred', g, { P: P0, fran: bredL, till: skjut(bredL), mal: v3(0, 0.36, -0.25) }); forra = 'bred1'; continue; }
  if (r.id === '02') continue;
  if (r.id === '26') {   // ut ur boken: från förra vyns slut till bordet, medan korten fälls ner och pärmen slås igen
    const f = VYER.at(-1), [pos, mal] = fran3(f.till, platser[f.mot]);
    VYER.push({ t: r.s + 0.1, mot: 'pBord', fran: lage(pos, mal, P0), till: lage(...VY.slut().slice(0, 2), P0), fov: 32, mal: v3(0, 0.2, -0.1), blur: 0.003, rorelse: 'glid' }); platser.pBord = P0; continue; }
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
vy(HOPP[1].t0 - 0.05, 'damm', v3(...BLADPOS.bad));
vy(S('24') + 0.5 + 1.0, 'himmel', v3());   // "Hej då, solen!": solen i bild (runda 4, Sanna 27/11 "show solen on mention")   // klipp till dammen när grodan hoppar upp ur vattnet (0,4 s senare än runda 3, så att grodans kvak inte klipps av)
VYER.sort((a, b) => a.t - b.t);
const plan = kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd: DURATION });

// ---- ljudet: Malin, grodan och effekterna ur rader.json, kritans ritljud som slinga, skogen lågt under allt ----
const EF = 'assets/ljud/effekter/';
const VOL = f => /groda-/.test(f) ? 2.8 : /kvak|suck|fniss|oj-oj|hejda/.test(f) ? 1.4 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel-tyg/.test(f) ? 0.9 : /(pop|swoosh|hopp-mjuk|landa-mjuk)/.test(f) ? 0.7 : /plask-[234]|grav|sand-/.test(f) ? 0.5 : 1.0;
const LJUD = [];
for (const r of RAD) {
  for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `${UPPSKATTAD && n >= 47 ? 'avsnitt/062-sommaren-i-boken/ljud/platshallare' : 'assets/ljud/roster/sommaren-i-boken'}/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
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
