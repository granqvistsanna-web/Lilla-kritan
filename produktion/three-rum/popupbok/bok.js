// Kritans bok, prov 2 (2026-11-27): rörelseprov av en uppfällbar bok på ett skrivbord (prov 1 var tre stillbilder).
// 13,5 s (tempo som referensen 27/11): den stängda boken, pärmen slås upp till stående med himlen på insidan, och alla kort ligger nedfällda med vita baksidan upp, himlen fälls upp först och
// sedan resten bakifrån och fram, grodan sist med ett pop och ett kvak. Klipp till inne i boken (grodan hoppar på sitt blad),
// klipp till närbild (grodan kväker), zoom ut. Kameran är vyer med verktyg/kamera3d.mjs.
// Ett uppslag: himmel, sol, moln och kullar ur Sannas Flow-bilder (bilder/, 27/11), granar och buskar som kort,
// dammen platt på sidan, grodan som ett platt kort på ett näckrosblad. Allt är befintliga urklipp, inget nytt är genererat.
// Rendera: node produktion/three-rum/render.mjs produktion/three-rum/popupbok --snabb   (stillbilder: ... popupbok 1 4 6 9 12.5)
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { kameraplan } from '/verktyg/kamera3d.mjs';

const SNABB = location.search.includes('snabb'), W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080, PR = SNABB ? 1 : 1.5;
const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(PR); R.setSize(W, H, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 40);

import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from './bok-parm.js';

// ---- bilder ----
// urklippen beskärs till det som syns, så att tom luft under en stam inte får kortet att sväva över marken
const beskar = t => tex(trim(t.image));
const lad = src => new THREE.TextureLoader().loadAsync(src).then(beskar);
const B = '/assets/bakgrunder/';
const [GRAN, BUSKE, DAMM, BLAD, NACKROS, VASS, STEN, SVAMP, GRODA, HIMMEL, SOL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, HINK, BLOMMOR, SAND] = await Promise.all([
  B + 'skogen-gron-saker/gran.png', B + 'skogen-gron-saker/barbuske.png', B + 'dammen-saker/damm.png', B + 'dammen-saker/blad.png',
  B + 'dammen-saker/nackros.png', B + 'dammen-saker/vass.png', B + 'skogen-gron-saker/sten.png', B + 'skogen-gron-saker/svamp.png',
  'bilder/gurra.png', ...['himmel', 'sol', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten', 'hink', 'blommor', 'sand'].map(n => `bilder/${n}.png`)].map(lad));
// himlen är nästan 4:3 i bilden; den dras ut på bredden i mitten (de rundade hörnen och kanterna behåller sin form)
function bredare(map, bredd) {
  const i = map.image, h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return tex(c);
}

const mat = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });
const urklipp = map => mat(map, { alphaTest: 0.5, alphaToCoverage: true, shadowSide: THREE.DoubleSide });
// kortets baksida: vitt papper i urklippets form (syns när kortet ligger nedfällt)
function baksida(map) {
  const i = map.image, c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = '#F4ECDD'; x.fillRect(0, 0, c.width, c.height);
  return mat(tex(c), { alphaTest: 0.5, alphaToCoverage: true, side: THREE.BackSide });
}
const djup = map => new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending, map, alphaTest: 0.5, side: THREE.DoubleSide });
const skugga = m => { m.castShadow = m.receiveShadow = true; return m; };

// ---- bordet, kritorna och boken (bok-parm.js: samma bok i varje berättelse, egen färg och figur på omslaget) ----
skrivbord(scen);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), mjuk = k => k * k * (3 - 2 * k);
const PARM0 = 0.5, PARM1 = 1.4;   // pärmen slås upp till stående, lite lutad bakåt
const { insida, satt } = await skapaBok(scen, { farg: '#E8683A', figur: GRODA.image, doodles: true, oppna: [PARM0, PARM1] });

// ---- uppslaget ----
// ett stående kort med en liten vikflik vid foten, som i en riktig uppfällbar bok
const flik = mat(null, { color: '#4E9E3A' }), KORT = [];
function kort(map, h, x, z, o = {}) {
  const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(0, h / 2, 0);
  const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
  m.add(new THREE.Mesh(g, baksida(map)));
  m.position.set(x, o.y ?? SIDA, z); m.rotation.y = o.vrid ?? 0; scen.add(m);
  KORT.push({ m, y: m.position.y, z, vaj: o.vaj });
  if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, 0.035), flik); f.rotation.x = -Math.PI / 2;
    f.position.set(x, SIDA + 0.0008, z + 0.018); f.receiveShadow = true; scen.add(f); }
  return m;
}
function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
}

kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6);   // kullarna dras också ut, så att de blir låga och himlen syns
kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47);
// himlen, solen och molnen sitter på pärmens insida (y < 0 i pärmens mått, uppåt = bort från gångjärnet), så de följer med när den öppnas.
// Solen och molnen ligger en bit framför himlen och kastar en liten skugga på den.
function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height) {
  const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), urklipp(map)));
  m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
}
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);   // innanför tygkanten på insidan
const SOLEN = pa(SOL, 0.34, 0.12, 0.19), SOL_NERE = 0.19, SOL_UPPE = 0.82;   // väntar bakom den mittersta, högsta kullen
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
for (const [x, z, h] of [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [-0.46, -0.34, 0.44], [0.38, -0.38, 0.56], [0.66, -0.33, 0.46], [0.94, -0.4, 0.6]]) kort(GRAN, h, x, z);
kort(BUSKE, 0.3, -0.12, -0.3); kort(BUSKE, 0.26, 1.02, -0.14);
{ // marken: ett gräsark med vit klistermärkeskant över nästan hela uppslaget, bokens kräm syns bara som en smal marginal
  const W = 2048, D = 1440, c = duk(W, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, W - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(W, D); kritYta(g.getContext('2d'), W, D, '#6CC04A', '#8ED46A', '#56A83A', 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore();
  platt(tex(c), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);
}
platt(DAMM, 1.45, -0.02, 0.06, 0.7);
platt(BLAD, 0.24, 0.3, 0.12, undefined, SIDA + 0.003); platt(BLAD, 0.2, 0.45, -0.07, undefined, SIDA + 0.003);
const NAR = platt(BLAD, 0.3, -0.24, 0.08, undefined, SIDA + 0.003);   // grodans blad
kort(NACKROS, 0.1, 0.3, 0.13, { y: SIDA + 0.004, flik: false });
const groda = kort(GRODA, 0.36, -0.24, 0.08, { y: SIDA + 0.004, flik: false });
kort(VASS, 0.46, -0.84, 0.2, { vaj: 0 }); kort(VASS, 0.34, 0.7, 0.06, { vaj: 2 });
kort(HINK, 0.27, 0.6, 0.42); kort(BLOMMOR, 0.26, 0.95, 0.5); kort(SAND, 0.24, -0.95, 0.45);

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

// ---- uppfällningen: korten ligger framåtfällda (baksidan upp) och reser sig bakifrån och fram, grodan sist ----
// Det kort som reser sig först ligger överst i högen, så inget kort går genom ett annat på vägen upp.
const GRODKORT = KORT.find(k => k.m === groda), ORDNING = KORT.filter(k => k !== GRODKORT).sort((a, b) => a.z - b.z);
const UPP0 = 1.1, UPP1 = 1.9;   // alla kort reser sig medan pärmen öppnas klart, snabbt efter varandra
ORDNING.forEach((k, i) => { k.start = UPP0 + i * (UPP1 - UPP0) / (ORDNING.length - 1); k.langd = 0.45; });
Object.assign(GRODKORT, { start: 2.2, langd: 0.45 });
[...ORDNING, GRODKORT].forEach((k, i, a) => k.hog = 0.004 + 0.001 * (a.length - i));
const reser = k => { k = kl(0, 1, k); const s = 0.9; return 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2; };   // landar med en liten efterstudsning
const HOPP = [6.4, 10.8], SOL0 = 2.5, SOL1 = 3.6;   // solen glider upp bakom kullarna   // grodan hoppar (litet hopp på bladet)
function bildruta(t) {
  satt(t);
  for (const k of KORT) {
    const e = reser((t - k.start) / k.langd);
    k.m.rotation.x = Math.PI / 2 * (1 - e);
    k.m.position.y = k.y + k.hog * (1 - kl(0, 1, e * 4));
    if (k.vaj !== undefined) k.m.rotation.z = 0.025 * Math.sin(t * 1.1 + k.vaj) * kl(0, 1, (t - k.start - k.langd) / 0.5);   // vassen vajar svagt
  }
  SOLEN.visible = t >= ORDNING[0].start + ORDNING[0].langd;   // först när kullen framför står
  SOLEN.position.z = SOL_NERE + (SOL_UPPE - SOL_NERE) * mjuk(kl(0, 1, (t - SOL0) / (SOL1 - SOL0)));
  SOLEN.rotation.z = -0.15 * t;   // vrider sig sakta, bara solen
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);   // molnen glider några cm
  // grodan: andas, och små hopp på bladet (sätter sig, hoppar, landar mjukt)
  let lyft = 0, sy = 1 + 0.012 * Math.sin(t * 2.4);
  for (const h of HOPP) {
    const u = (t - h) / 0.7;
    if (u > -0.25 && u < 0) sy *= 1 - 0.07 * Math.sin(Math.PI * (u + 0.25) / 0.25);         // sätter sig före hoppet
    if (u >= 0 && u < 1) { lyft = 0.07 * Math.sin(Math.PI * u); sy *= 1 + 0.05 * Math.sin(Math.PI * u); }
    if (u >= 1 && u < 1.35) sy *= 1 - 0.06 * Math.sin(Math.PI * (u - 1) / 0.35);              // landar
  }
  groda.position.y = GRODKORT.y + lyft + (GRODKORT.hog * (1 - kl(0, 1, reser((t - GRODKORT.start) / GRODKORT.langd) * 4)));
  if (t > GRODKORT.start + GRODKORT.langd) groda.scale.set(1 / Math.sqrt(sy), sy, 1);
  const v = VYER[Math.max(0, VYER.findLastIndex(w => w.t <= t))];
  const f = v.mot === 'groda' || v.fokus ? MAL : new THREE.Vector3(...PLATSER.bok).add(new THREE.Vector3(0, 0.2, 0));
  bokeh.uniforms.focus.value = cam.position.distanceTo(f); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002;
  komp.render();
}

// ---- kameran (läge: [vinkel°, avstånd, höjd, titta x, titta y]) ----
const MAL = groda.position.clone().add(new THREE.Vector3(0, 0.18, 0));
const PLATSER = { bok: [0, 0.08, -0.1], groda: [groda.position.x, SIDA, groda.position.z] };
const VYER = [
  // en lång glidning från boken på bordet in i boken (som referensen), sedan halvnära och närbild på grodan
  { t: 0, mot: 'bok', fran: [-4, 4.3, 2.6, 0, 0.28], till: [0, 1.7, 0.42, 0, 0.3], fov: 32, blur: 0.003 },
  { t: 4.6, mot: 'groda', fran: [-9, 1.45, 0.36, 0.12, 0.17], till: [-5, 1.3, 0.34, 0.12, 0.17], fov: 32, blur: 0.006, fokus: true },
  { t: 9, mot: 'groda', fran: [10, 1.12, 0.27, 0.01, 0.13], till: [5, 0.98, 0.25, 0.01, 0.14], fov: 28, blur: 0.008, ut: 'zoomut' },
];
const plan = kameraplan({ cam, canvas: document.getElementById('bild'), platser: PLATSER, vyer: VYER, langd: 13.5 });
const E = 'assets/ljud/effekter/';
window.LJUD = [
  { t: 0, fil: E + 'skogsljud/skogsljud-1.m4a', vol: 0.35 },
  { t: PARM0, fil: E + 'prassel-tyg/prassel-tyg-1.m4a', vol: 0.6 },
  { t: UPP0, fil: E + 'prassel-tyg/prassel-tyg-1.m4a', vol: 0.4 },
  { t: SOL1 - 0.2, fil: E + 'tindra/tindra-2.m4a', vol: 0.6 },
  { t: GRODKORT.start + 0.35, fil: E + 'pop/pop-2.m4a', vol: 0.9 },
  { t: GRODKORT.start + 0.9, fil: E + 'kvak/kvak-1.m4a', vol: 1 },
  { t: HOPP[0], fil: E + 'hopp-mjuk/hopp-mjuk-2.m4a', vol: 0.8 },
  { t: HOPP[0] + 1.3, fil: E + 'kvak/kvak-2.m4a', vol: 1 },
  { t: HOPP[1], fil: E + 'hopp-mjuk/hopp-mjuk-4.m4a', vol: 0.8 },
  { t: HOPP[1] + 1.2, fil: E + 'kvak/kvak-3.m4a', vol: 1 },
  ...plan.ljud,
];
window.DURATION = 13.5;
window.seek = t => plan.rita(t, () => bildruta(t));
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0));
