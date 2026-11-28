// 064 Vintern i boken, grind 6: hela scenen i Kritans bok. Uppslaget som storyboarden (storyboard/scen.js, grind 5 godkänd),
// motorn som 063 (avsnitt/063-hosten-i-boken/scener/boken/boken.js): korten, kritan, kaninens v2-rigg på ett kort, kameran som vyer.
// Snön i kod: kullarna, granarna och trädet har en snöfri och en snöig bild (kod/vinter.js, prov/trad/trad.js), och snön växer in
// uppifrån (marken nerifrån) i rad 05b. Fåglarna är 043:s fagel.js. Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/064-vintern-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { kameraplan } from '/verktyg/kamera3d.mjs';
import { duk, kritYta, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { kaltTrad, sittplats, W as TW, H as TH } from '/avsnitt/064-vintern-i-boken/prov/trad/trad.js';
import { granSno, kulleSno, frost } from '/avsnitt/064-vintern-i-boken/kod/vinter.js';

const $ = id => document.getElementById(id);
const kl = (a, b, x) => Math.min(b, Math.max(a, x)), k01 = x => kl(0, 1, x), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = k01(k), k * k * (3 - 2 * k));
const bump = (a, b, t, r = 0.3) => mjuk((t - a) / r) * mjuk((b - t) / r);   // 0 → 1 → 0
const reser = k => { k = k01(k); const s = 0.9; return 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2; };   // fälls upp med en liten efterstudsning
const v3 = (...a) => new THREE.Vector3(...a);

// ---- raderna ----
const { RADER, ROST, GLES, MATTA } = await import('/avsnitt/064-vintern-i-boken/storyboard/rader.mjs'); let acc = 0;
const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, st: r.s, s }; });
const RR = Object.fromEntries(RAD.map(r => [r.id, r])), S = id => RR[id].s, LN = n => ROST[n - 1][1];
const DURATION = acc, rad = t => RAD[Math.max(0, RAD.findLastIndex(r => r.s <= t))];
const MAL = (id, n) => S(id) + RR[id].malin.find(m => m[0] === n)[1];   // när Malins replik n börjar
const SVAR = (id, n) => MAL(id, n) + LN(n) + 0.2;                        // kaninens svar: 0,2 s efter repliken
const ORD = { snoflinga: 0.37, knarr1: 0.06, knarr2: 0.73, plopp1: 0.05, plopp2: 0.15, snoboll: 1.2, stor: 0.22, mellan: 1.11, liten: 2.4,
  en: 0.06, tva: 0.72, tre: 1.15, rod: 0.26, bla: 0.27, gul: 0.49, snogubbe: 0.75 };   // samma som rader.mjs (whisper)

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
const [HIMMEL, MOLN1, MOLN2, MOLN3, SNOBOLL, GUBBE, TUSS] = await Promise.all([
  ...['himmel', 'moln-stor', 'moln-mellan', 'moln-liten'].map(n => P + n + '.png'),
  RQ + 'snoboll/cut/snoboll.png', RQ + 'snogubbe/cut/snogubbe.png', RQ + 'snotuss/cut/snotuss.png'].map(lad));
const PB_SRC = '/avsnitt/039-kaninen-aker-pulka/klader-lager/pannband.png';   // bandet på huvudet (039): kritans teckning, kortet och bandet är samma bild
const [GRAN_I, KBAK_I, KFRAM_I, FLINGA_I, PB_I] = await Promise.all([B + 'skogen-gron-saker/gran.png', P + 'kulle-bak.png', P + 'kulle-fram.png',
  RQ + 'snoflinga/cut/snoflinga.png', PB_SRC].map(bild));
const FLINGA = tex(trim(FLINGA_I)), PANNBAND = tex(trim(PB_I));
function ruta(i) {   // bildens synliga ruta (som trim): konturen (bildens egna px) läggs på den beskurna bilden
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, u); x1 = Math.max(x1, u); }
  return { ox: x0 - 1, oy: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3, W: i.width, H: i.height };
}
const KONTUR = Object.fromEntries(await Promise.all([['flinga', 'snoflinga-kontur.json'], ['pannband', 'pannband-kontur.json']].map(async ([n, f]) => {   // kod/: konturerna med detaljstreck (2026-11-28)
  const j = await (await fetch('/avsnitt/064-vintern-i-boken/kod/' + f)).json(); return [n, [j.d, ...(j.detaljer || [])]]; })));
const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
const FLINGA_URL = await dataUrl(RQ + 'snoflinga/cut/snoflinga.png'), PB_URL = await dataUrl(PB_SRC);

// ---- snön på korten: en snöfri bild (A) och en snöig (B) i samma ruta; snön växer in uppifrån (marken: nerifrån) ----
function union(A, Bc) {   // beskär båda till det som syns i någon av dem
  let y0 = A.height, y1 = 0, x0 = A.width, x1 = 0;
  for (const c of [A, Bc]) { const a = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (u < x0) x0 = u; if (u > x1) x1 = u; } }
  return [A, Bc].map(c => { const ut = duk(x1 - x0 + 3, y1 - y0 + 3); ut.getContext('2d').drawImage(c, x0 - 1, y0 - 1, ut.width, ut.height, 0, 0, ut.width, ut.height); return ut; });
}
function bredareC(i, bredd) {
  const h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return c;
}
function snoBild(A, Bc, nerifran = false) {
  const c = duk(A.width, A.height), x = c.getContext('2d'), tmp = duk(A.width, A.height), y = tmp.getContext('2d'), T = tex(c); let kk = -1;
  const satt = k => { k = Math.round(k01(k) * 90) / 90; if (k === kk) return; kk = k; const Hh = A.height, mj = 0.35;   // mjuk kant: snön lägger sig, inget svep
    x.clearRect(0, 0, c.width, c.height); x.drawImage(A, 0, 0);
    if (k >= 1) x.drawImage(Bc, 0, 0);
    else if (k > 0) { y.globalCompositeOperation = 'source-over'; y.clearRect(0, 0, c.width, c.height); y.drawImage(Bc, 0, 0);
      const e = k * (1 + mj), g = y.createLinearGradient(0, 0, 0, Hh);
      const s0 = k01(e - mj), s1 = k01(e); if (nerifran) { g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(Math.min(0.999, 1 - s1 + 1e-4), 'rgba(0,0,0,0)'); g.addColorStop(Math.min(1, 1 - s0), '#000'); g.addColorStop(1, '#000'); }
      else { g.addColorStop(0, '#000'); g.addColorStop(s0, '#000'); g.addColorStop(Math.min(1, Math.max(s0 + 1e-4, s1)), 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0)'); }
      y.globalCompositeOperation = 'destination-in'; y.fillStyle = g; y.fillRect(0, 0, c.width, c.height); x.drawImage(tmp, 0, 0); }
    T.needsUpdate = true; };
  satt(0); return { T, satt };
}
const GRAN_S = snoBild(...union(granSno(GRAN_I, 0), granSno(GRAN_I, 1)));
const KBAK_S = snoBild(bredareC(kulleSno(KBAK_I, 0), 5.2), bredareC(kulleSno(KBAK_I, 1), 5.2));
const KFRAM_S = snoBild(bredareC(kulleSno(KFRAM_I, 0), 6.2), bredareC(kulleSno(KFRAM_I, 1), 6.2));
const TRAD_S = snoBild(kaltTrad({ sno: 0 }), kaltTrad({ sno: 1 }));   // otrimmat, så att sittplats() stämmer
const mark = (f, l, m) => { const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, f, l, m, 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); x.restore(); return c; };
const MARK_S = snoBild(mark('#9DB39A', '#B2C4AE', '#879E86'), mark('#F7F9FC', '#FFFFFF', '#DCE6F2'), true);

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
const { insida, satt } = await skapaBok(scen, { farg: '#3F7FC4', figur: FLINGA.image, doodles: true, oppna: [PARM0, PARM1] });

// ---- uppslaget (som storyboarden) ----
const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
  g.addColorStop(0, 'rgba(40,50,70,0.36)'); g.addColorStop(0.55, 'rgba(40,50,70,0.14)'); g.addColorStop(1, 'rgba(40,50,70,0)');
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
// kortet byter inte bild när snön växer: snoBild ritar om samma canvas (texturen), djupmaterialet följer med
const BAK = [kort(KBAK_S.T, 2.15 / 5.2, 0, -0.6), kort(KFRAM_S.T, 1.95 / 6.2, 0.05, -0.47)];
BAK.forEach(k => k.m.receiveShadow = false);   // annars blev granarnas och trädets skuggor grå spökträd på de snöiga kullarna
const VHIMMEL = (() => { const c = frost(HIMMEL.image), x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.35; x.fillStyle = '#F2F6FA'; x.fillRect(0, 0, c.width, c.height); return tex(bredareC(c, 1.5)); })();
pa(VHIMMEL, 1.53, 0, 0.01 + 1.53 / 2, 0.004, 2.3);   // vinterhimmel: blekare, kallare
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.36, 1.08], [MOLN3, 0.13, 0.66, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
const FL = { x: 0.12, upp: 1.12, h: 0.26 };   // snöflingan på himlen (kritans första teckning)
const FLINGAN = pa(FLINGA, FL.h, FL.x, FL.upp, 0.012);
const GRANAR = [[-0.7, -0.2, 0.62], [-0.93, -0.3, 0.5]].map(([x, z, h]) => kort(GRAN_S.T, h, x, z));
const TR = { x: 0.4, z: -0.16, h: 0.8 }, TRADET = kort(TRAD_S.T, TR.h, TR.x, TR.z, { vaj: 1 }), TS = TR.h / TH;
const MARKEN = platt(MARK_S.T, 2.26, 0, 0.0, 1.5, SIDA + 0.0004);

// ---- fåglarna (043:s fagel.js) på trädets grenar: barn till trädkortet, så att de fälls upp och ner med det ----
const FB = { x: -150, y: -330, w: 1100, h: 1050 }, FE = 0.07 / 689, FAGEL_F = ['rod', 'bla', 'gul'];
const FAGEL_URL = await Promise.all(FAGEL_F.map(f => dataUrl(`${RQ}smafaglar/cut/fagel-kropp-${f}-kod.png`)));
const FAGLAR = FAGEL_F.map((f, i) => {
  const c = duk(440, 420), T = tex(c), g = new THREE.PlaneGeometry(FB.w * FE, FB.h * FE);
  g.translate((FB.x + FB.w / 2 - 400) * FE, (689 - (FB.y + FB.h / 2)) * FE, 0);   // origo i fötterna
  const m = new THREE.Mesh(g, mat(T, { alphaTest: 0.5, side: THREE.DoubleSide })); m.castShadow = true;
  m.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: T, alphaTest: 0.5 });
  TRADET.m.add(m); return { f, i, c, T, m, nyckel: '', img: new Image() };
});
async function ritaFagel(F, o) {   // ritar om bara när läget ändras
  const q = { flax: +o.flax.toFixed(2), oppen: +o.oppen.toFixed(2), blink: +o.blink.toFixed(1), t: o.flax > 0.01 ? +o.t.toFixed(3) : 0 }, n = JSON.stringify(q);
  if (n === F.nyckel) return; F.nyckel = n;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FB.x} ${FB.y} ${FB.w} ${FB.h}" width="440" height="420">${window.fagelSvg(F.f, { ...q, href: FAGEL_URL[F.i] })}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); F.img.src = url; await F.img.decode(); URL.revokeObjectURL(url);
  const x = F.c.getContext('2d'); x.clearRect(0, 0, 440, 420); x.drawImage(F.img, 0, 0, 440, 420); F.T.needsUpdate = true;
}
const tradLokal = p => v3((p.x - TW / 2) * TS, (TH - p.y) * TS, 0.004);   // trädets px → trädkortets egna koordinater

// ---- kaninen: v2-riggen på ett kort ----
const VB = { x: -150, y: -200, w: 1324, h: 1200 }, NS = 'http://www.w3.org/2000/svg';
const L = await v2rigg('kaninen-kanel'), FOT = L.FOTTER || 947, TOPP = 31, G = L.figur(512, FOT, 1, $('figurer'));
G.querySelector('.skugga')?.setAttribute('display', 'none');
// öronen i egna grupper (som 039), så att frosten och snöflingorna på spetsarna följer örat
const SPETS = { l: [316, 36], r: [706, 36] };
G.querySelectorAll('image.ear-l, image.ear-r').forEach(img => {
  const klass = img.getAttribute('class'), s = klass.at(-1), yttre = document.createElementNS(NS, 'g'), grupp = document.createElementNS(NS, 'g');
  // yttre: riggens vridning; grupp (inre): örat dras ner under bandet (gom), med frosten och flingorna
  yttre.setAttribute('class', klass); grupp.setAttribute('class', 'ora-in ora-in-' + s); img.setAttribute('class', 'ora-bild'); img.replaceWith(yttre); yttre.appendChild(grupp); grupp.appendChild(img);
  const [x, y] = SPETS[s];
  $('defs').insertAdjacentHTML('beforeend', `<mask id="oramask-${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><image href="${img.getAttribute('href')}" width="1024" height="1024" filter="url(#oraform)"/></mask>`);
  grupp.insertAdjacentHTML('beforeend', `<radialGradient id="frostg-${s}" gradientUnits="userSpaceOnUse" cx="${x}" cy="${y}" r="150"><stop offset="0" stop-color="#C4DAF4"/><stop offset="0.55" stop-color="#C4DAF4" stop-opacity="0.6"/><stop offset="1" stop-color="#C4DAF4" stop-opacity="0"/></radialGradient>
    <rect class="frost" x="${x - 160}" y="${y - 20}" width="320" height="200" fill="url(#frostg-${s})" opacity="0" mask="url(#oramask-${s})"/>
    <g class="oronsno">${[[-14, 6, 15], [12, 2, 13], [0, -10, 12]].map(([dx, dy, r], i) => `<g class="flk" data-i="${i}" data-x="${x + dx}" data-y="${y + dy}">
      <circle r="${r + 6}" fill="#fff"/><circle cy="3" r="${r}" fill="#C9DAEE"/><circle cy="-1" r="${r - 2}" fill="#F7F9FC"/></g>`).join('')}</g>`);
});
// pannbandet på huvudet (039:s kodband, klader-lager/pannband.png: bandet x 304–714, y 209–324), i kroppen efter magen så att det följer huvudet
G.querySelector('.mage').insertAdjacentHTML('afterend', `<g id="band" display="none"><image href="/avsnitt/039-kaninen-aker-pulka/klader-lager/pannband.png" width="1024" height="1024"/></g>`);
await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
window.kant.lagg(G); const kantF = $('defs').lastElementChild;
const BL = skapaBlinka(62);
L.rita(G, L.NEUTRAL, L.POSE0);
const ENHET = 0.34 / (FOT - TOPP);   // lika hög som kanel.png-kortet i storyboarden (0,34)
const kortCanvas = duk(VB.w, VB.h), kortCtx = kortCanvas.getContext('2d'), kortTex = tex(kortCanvas);
const gg = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
gg.translate((VB.x + VB.w / 2 - 512) * ENHET, (FOT - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna
const kanin = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), alphaTest: 0.5, side: THREE.FrontSide }));
kanin.add(new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, color: 0x000000, emissive: '#F4ECDD', alphaTest: 0.5, side: THREE.BackSide })));
kanin.castShadow = kanin.receiveShadow = true;
kanin.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
scen.add(kanin);
const KANKORT = { m: kanin, y: SIDA + 0.004, hog: 0.001, z: 0 };
const fig2varld = ([x, y], pos = kanin.position) => v3(pos.x + (x - 512) * ENHET, pos.y + (FOT - y) * ENHET, pos.z + 0.01);
const stillBild = new Image();

// ---- pannbandets kort, snöbollarna, snögubben, snötussen ----
const PBPOS = [-0.17, 0.37], PBW = 402 * ENHET, PB_STOR = 1.8;   // lika bred som bandet på huvudet (bildens x 308–710): inget byte när kortet når fram
const PBKORT = kort(PANNBAND, PBW * PANNBAND.image.height / PANNBAND.image.width, ...PBPOS, { y: SIDA + 0.003 });
// den stora rullas längst bort (mot granarna), de mindre stannar före den: ingen boll rullar genom en annan
const BOLLPOS = [[-0.4, 0.2, 0.15], [-0.26, 0.2, 0.115], [-0.15, 0.2, 0.085]];
const BOLLTEX = BOLLPOS.map(() => { const T = SNOBOLL.clone(); T.center.set(0.5, 0.5); T.needsUpdate = true; return T; });   // egen textur per boll, så att den kan rulla
const BOLLAR = BOLLPOS.map(([x, z, h], i) => kort(BOLLTEX[i], h, x, z, { flik: false }));
BOLLAR.forEach((k, i) => { k.m.material.color.set('#E2EAF6'); k.m.material.emissiveMap = BOLLTEX[i]; });   // lite blåare än snön, så att bollarna syns mot den
const SNOGUBBEN = kort(GUBBE, 0.36, -0.28, 0.17);
const TUSSEN = kort(TUSS, 0.06, 0, 0, { flik: false });
Object.assign(TUSSEN.m.material, { emissiveMap: TUSS, emissive: new THREE.Color(0.32, 0.32, 0.34) });   // vitare snö, inte en grå mössa
// spåren: fotspåren (rad 06c) och bollarnas rullspår (rad 15–15c), ljusblå i snön
const SPAR_TEX = (() => { const c = duk(64, 96), x = c.getContext('2d'); x.fillStyle = 'rgba(122,156,200,0.95)'; x.beginPath(); x.ellipse(32, 48, 22, 34, 0, 0, Math.PI * 2); x.fill(); return tex(c); })();
const sparMat = () => new THREE.MeshBasicMaterial({ map: SPAR_TEX, transparent: true, depthWrite: false, opacity: 0 });
const PLATS = { mitt: [-0.08, 0.2], steg: [0.06, 0.24], bollar: [0.04, 0.26], gran: [-0.6, 0.0], trad: [0.16, 0.1], 'vid-bollar': [0.14, 0.3], 'mot-trad': [-0.2, 0.1] };
const SPAR = [0.2, 0.45, 0.7].flatMap((u, i) => [-1, 1].map(s => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.03), sparMat());
  m.rotation.x = -Math.PI / 2; m.rotation.z = Math.PI / 2; m.position.set(lerp(PLATS.mitt[0], PLATS.steg[0], u) + s * 0.012, SIDA + 0.0016, lerp(PLATS.mitt[1], PLATS.steg[1], u) + 0.01 + s * 0.012);
  m.userData.u = u + (s > 0 ? 0.08 : 0); scen.add(m); return m; }));
const RULLSPAR = BOLLPOS.map(([x, z, h]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: '#B4CBE6', transparent: true, opacity: 0, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.y = SIDA + 0.0014; scen.add(m); return m; });

// snöfallet: platta kritflingor (små vita sprites med mjuk kant) som faller lugnt och vajar; de som når marken börjar om uppe
const FLINGA_TEX = (() => { const c = duk(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 4, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.6, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return tex(c); })();
let fro = 11; const sl = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
const SNOFALL = Array.from({ length: 150 }, () => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLINGA_TEX, depthWrite: false, transparent: true }));
  m.userData = { x: -1.1 + 2.2 * sl(), z: -0.45 + 0.95 * sl(), fas: sl(), fart: 0.07 + 0.05 * sl(), s: 0.008 + 0.01 * sl(), v: sl() * 6 }; m.visible = false; scen.add(m); return m; });
// små vita moln: andedräkten vid nosen (rad 07, 07b) och snöpuffar vid fötterna (skutten rad 06b, bollarna)
const puff = () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0, depthWrite: false })); m.visible = false; scen.add(m); return m; };
const ANDE = [0, 1, 2].map(() => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLINGA_TEX, depthWrite: false, transparent: true, opacity: 0 })); m.visible = false; scen.add(m); return m; });
const FOTPUFF = Array.from({ length: 6 }, puff);

// ---- ljuset: blekt vinterljus ----
scen.add(new THREE.HemisphereLight('#F4F8FF', '#C8D2DC', 2.3));
const ljus = new THREE.DirectionalLight('#FFF6EA', 2.0); ljus.position.set(-2.2, 4.4, 3); ljus.castShadow = true;
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

// ---- tiderna ----
const OPPNA = S('01b'), STANG = S('26');
const SNO = [S('05b') - 0.4, S('05b') + RR['05b'].d - 1.0];   // snön växer in (ca 4,3 s), klar 1 s före klippet: ett reaktionsslag på den vita världen
const KANIN_UPP = S('06') + 0.2;
const FL_KLAR = S('04') + 0.6;                                // snöflingan på himlen är ifylld
const PB_KLAR = S('09') + 0.6, PB_UPP = S('09') + 0.85;       // pannbandet ifyllt, kortet reser sig (pop 0,85)
const PB_GLID = [S('11') + 0.15, S('11') + 1.15], PB_PA = PB_GLID[1] + 0.45;   // glider till huvudet, bandet glider ner över öronen
const PLOPP = [MAL('12', 20) + ORD.plopp1, MAL('12b', 21) + ORD.plopp2];
const ORONSNO = [S('07') + 0.2, PB_GLID[1] + 0.1];            // flingorna på öronspetsarna: landar, faller av när bandet kommer
const FROST = [S('07') + 1.0, S('13') + 0.4];                 // spetsarna frostblå
const DARR = [S('07') + 1.3, S('08') + 0.2];                  // huttrar
const ANDAS = [S('07') + 0.8, S('08')];                       // andedräkten
const ROLL = ['15', '15b', '15c'].map((id, i) => ({ i, a: S(id) + 0.15, b: MAL(id, 26) + ORD.snoboll }));   // bollen stannar på "snöboll"
const GUBBE_UPP = MAL('22', 37) + ORD.snogubbe;
const KLAPP0 = MAL('22', 37) + LN(37) + 0.15 - 1.0;   // klappen börjar; första klappen 1,0 s in
const TU = { a: S('17') + 0.15, land: S('17') + 0.7, skak: MAL('17', 29) + LN(29) + 0.5, ner: MAL('17', 29) + LN(29) + 1.3 };
const VINK = (id, n, d = 1.8) => [MAL(id, n) + 0.3, d];

// ---- kaninens platser och rörelser ----
const GA = [   // går lugnt: [start, slut, från, till, skutt]
  [S('06c') + 0.15, S('06c') + 2.6, PLATS.mitt, PLATS.steg, false],
  [S('15') - 0.9, S('15') + 0.05, PLATS.steg, PLATS.bollar, false],
  [S('17') - 0.002, S('17'), PLATS.bollar, PLATS.gran, false],   // på klippet: vägen till granen går genom bollarna
  [S('19b') + 0.5, S('19b') + 1.0, PLATS.gran, PLATS['mot-trad'], false],   // utanför bild (trädet i närbild)
  [S('20') + 0.05, S('20') + 1.1, PLATS['mot-trad'], PLATS.trad, true],
  [S('21') - 0.002, S('21'), PLATS.trad, PLATS['vid-bollar'], false],   // på klippet (förut syntes den glida i trädets vy)
];
const GAR = t => GA.find(([a, b]) => b - a > 0.3 && t > a && t < b);   // de riktiga gångerna (inte flytten på klippen)
const SKUTT = [SVAR('06b', 10) + 0.25, SVAR('06b', 10) + 0.85];   // två små skutt på stället
function kaninPos(t) {
  let [x, z] = PLATS.mitt, y = 0;
  for (const [a, b, f, g, sk] of GA) { if (t >= b) [x, z] = g; else if (t >= a) { const u = (t - a) / (b - a), m = mjuk(u);
    x = lerp(f[0], g[0], m); z = lerp(f[1], g[1], m); y = sk ? 0.03 * Math.abs(Math.sin(Math.PI * 2 * u)) : 0.006 * Math.abs(Math.sin(Math.PI * 5 * u)); } }
  for (const s of SKUTT) if (t > s && t < s + 0.4) y = 0.06 * Math.sin(Math.PI * (t - s) / 0.4);
  return [x, y, z];
}
const gaRikt = t => { for (const [a, b, f, g] of GA) if (b - a > 0.3 && Math.abs(g[0] - f[0]) > 0.1 && t > a - 0.3 && t < b + 0.3) return Math.sign(g[0] - f[0]) * 0.8 * bump(a - 0.3, b + 0.3, t, 0.3); return 0; };
function vink(f, p, tl, d, stor = false) {   // armen bakom kroppen, snett upp och ut förbi kanten (som 062, 063)
  if (tl < 0 || tl > d) return [f, p];
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * (stor ? 1.5 : 1.3) * tl), [a, b] = stor ? [80, 24] : [55, 14];
  return [f, { ...p, armar: [p.armar[0] + upp * (a + b * s), p.armar[1]], fram: [0, p.fram?.[1] || 0], luta: (p.luta || 0) + upp * (1.5 + 1.2 * s) }];
}
const nick = (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p];
// öronen ploppar ut ur bandet (039): ihoptryckta −14 → ut med en liten efterstudsning
const plopp = (t, a) => t < a ? -14 : t < a + 0.25 ? lerp(-14, 5, mjuk((t - a) / 0.25)) : 5 * Math.exp(-(t - a - 0.25) * 7) * Math.cos((t - a - 0.25) * 14);
const REAKTION = { '06': 'jatteglad', '06b': 'kawaii', '06c': 'glad', '07b': 'nyfiken', '09': 'kawaii', '10': 'jatteglad', '11': 'forvanad',
  '12b': 'skrattar', '13': 'kawaii', '14': 'jatteglad', '15': 'ivrig', '15b': 'jatteglad', '15c': 'skrattar', '16': 'kawaii', '16b': 'jatteglad',
  '17': 'fnissig', '18': 'nyfiken', '20': 'jatteglad', '21': 'nyfiken', '22': 'skrattar', '23': 'kawaii' };
function kaninen(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  switch (id) {
    case '06': { const [a, d] = VINK('06', 9, 2.2); [f, p] = vink(f, p, t - a, d); break; }
    case '06b': { const s = SVAR('06b', 10); f = { ...B('nyfiken'), titt: [14 * Math.sin(tl * 1.6) * (1 - mjuk((t - s + 0.6) / 0.5)), 6 * (1 - mjuk((t - s + 0.6) / 0.5))] };
      p.rikt = 0.35 * Math.sin(tl * 1.6) * (1 - mjuk((t - s + 0.6) / 0.5)); f = L.blanda(f, 'jatteglad', bump(s, s + 1.6, t)); break; }
    case '06c': f = { ...B('glad'), titt: [10, 4] }; break;
    case '07': case '07b': { const k = mjuk((t - S('07') - 0.8) / 0.8); f = L.blanda(f, { ...B('nyfiken'), titt: [0, -12] }, 0.5 * bump(S('07') + 0.3, S('07') + 2.0, t));   // tittar upp på flingorna
      f = L.blanda(f, 'ledsen', 0.3 * k); p.oron = [10 * k, 10 * k]; p = L.blandaPose(p, 'magen', 0.7 * k);
      if (id === '07b') { f = L.blanda(f, { ...B('nyfiken'), titt: [0, 0] }, 0.5); [f, p] = nick(f, p, t - SVAR('07b', 14));
        f = L.blanda(f, B('nyfiken'), mjuk((t - MAL('07b', 15) - LN(15)) / 0.3)); } break; }
    case '08': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-12, 8]; p.rikt = -0.35; p.oron = [8, 8]; break;
    case '09': f = L.blanda(L.blanda(B('nyfiken'), 'kawaii', mjuk((t - PB_KLAR) / 0.4)), 'jatteglad', bump(PB_UPP, PB_UPP + 1.4, t)); f.titt = [-12, 6]; p.rikt = -0.35; p.oron = [8 * (1 - mjuk((t - PB_UPP) / 0.5)), 8 * (1 - mjuk((t - PB_UPP) / 0.5))]; break;
    case '10': [f, p] = nick({ ...f, titt: [0, 0] }, p, t - SVAR('10', 18)); break;
    case '11': { const u = k01((t - PB_GLID[0]) / (PB_GLID[1] - PB_GLID[0])); f = { ...B('nyfiken'), titt: [lerp(-12, 0, mjuk(u)), lerp(6, -14, mjuk(u))] };
      p.upp = 0.4 * mjuk(u) * (1 - mjuk((t - PB_PA - 0.2) / 0.4)); f = L.blanda(f, 'forvanad', mjuk((t - PB_PA + 0.1) / 0.3)); break; }
    case '12': { f = L.blanda(B('forvanad'), { ...B('nyfiken'), titt: [-12, -14] }, mjuk((t - PLOPP[0] - 0.1) / 0.4)); p.luta = 4 * mjuk((t - PLOPP[0] - 0.2) / 0.5); p.upp = 0.35 * mjuk((t - PLOPP[0] - 0.1) / 0.4); break; }
    case '12b': f = L.blanda({ ...B('nyfiken'), titt: [-12, -14] }, 'fnissig', mjuk((t - PLOPP[1] - 0.2) / 0.3)); p.upp = 0.35 * (1 - mjuk((t - PLOPP[1]) / 0.4)); break;
    case '13': { const k = bump(SVAR('13', 22) - 0.1, MAL('13', 23) + 0.3, t, 0.4); f = L.blanda(f, { ...B('glad'), glad: [1, 1], streck: 0 }, k); p.luta = (p.luta || 0) + 3 * k;
      p.oron = [-8 * mjuk((t - S('13') - 0.3) / 0.8), -8 * mjuk((t - S('13') - 0.3) / 0.8)]; break; }
    case '14': f = { ...B('nyfiken'), titt: [-12, 4] }; p.rikt = -0.4 * (1 - mjuk((t - MAL('14', 24) - LN(24) + 0.1) / 0.4)); [f, p] = nick(f, p, t - SVAR('14', 24)); break;
    case '15': case '15b': case '15c': { const R0 = ROLL[['15', '15b', '15c'].indexOf(id)], k = bump(R0.a - 0.2, R0.b + 0.15, t, 0.3);
      p = L.blandaPose(p, 'vanster', k); p.armar = [p.armar[0] + 18 * k, p.armar[1] + 18 * k]; p.luta = (p.luta || 0) - 3 * k; f = { ...B('glad'), titt: [-14, 6] };
      f = L.blanda(f, 'jatteglad', bump(R0.b, R0.b + 1.2, t)); break; }
    case '16': case '16b': f = { ...B('glad'), titt: [-14, 6] }; p.rikt = -0.4; break;
    case '17': { const land = mjuk((t - TU.land) / 0.2), sk = TU.skak;
      f = L.blanda(B('glad'), { ...B('forvanad'), titt: [0, -16] }, land * (1 - mjuk((t - sk - 0.2) / 0.3))); p.upp = 0.4 * land * (1 - mjuk((t - sk) / 0.3));
      if (t > sk && t < sk + 1.2) [f, p] = L.skakaHuvud(f, p, t - sk, 1.2, 1.0);
      f = L.blanda(f, 'fnissig', mjuk((t - sk - 1.0) / 0.3)); break; }
    // 19: lyssnarposen från 18 tonar ut medan kameran glider till trädet
    case '18': case '19': { const k = id === '18' ? mjuk((tl - 0.3) / 0.4) : 1 - mjuk(tl / 0.5); f = { ...B('nyfiken'), titt: [12 * k, -6 * k] }; p.rikt = 0.35 * k; p.oron = [-6 * k, 14 * k]; p.luta = 2 * k; break; }
    case '20': { f = { ...B('glad'), titt: [12, -14] }; p.upp = 0.45 * mjuk((tl - 1.1) / 0.4); p.rikt = 0.3;
      const a = SVAR('20', 35) - 0.1; [f, p] = vink(f, p, t - a, 2.0); f = L.blanda(f, 'jatteglad', bump(a, a + 2.0, t)); break; }
    case '21': f = { ...B('nyfiken'), titt: [-14, 6] }; p.rikt = -0.45; break;
    case '22': { const k0 = KLAPP0; f = L.blanda({ ...B('nyfiken'), titt: [-14, 0] }, 'jatteglad', mjuk((t - GUBBE_UPP) / 0.3)); p.rikt = -0.45 * (1 - mjuk((t - k0) / 0.4));
      if (t > k0 && t < k0 + 3) p = L.blandaPose(p, L.ROR.klappa(t - k0)[1], 1); break; }   // riggens klapp: händerna möts på k0 + 1,0, 1,5 och 2,0 s (klappljuden i rader.mjs)
    case '23': [f, p] = nick({ ...f, titt: [0, 0] }, p, t - SVAR('23', 38)); break;
  }
  if (id === '24' || id === '25') { const n = id === '24' ? 39 : 43; [f, p] = vink({ ...B('jatteglad') }, p, t - MAL(id, n), r.d - 0.4, true); }
  // öronen: ihoptryckta under bandet tills de ploppar ut ett i taget (bildens vänstra först)
  if (t >= PB_PA - 0.35 && t < S('13')) { const k = mjuk((t - PB_PA + 0.35) / 0.35); p.oron = [lerp(p.oron[0], plopp(t, PLOPP[0]), k), lerp(p.oron[1], plopp(t, PLOPP[1]), k)]; }
  // fryser: darrar lätt
  const darr = bump(DARR[0], DARR[1], t, 0.3); if (darr > 0) { p.luta = (p.luta || 0) + darr * 1.2 * Math.sin(2 * Math.PI * 7 * t); p.strack = (p.strack || 0) - 0.02 * darr; }
  { const w = GAR(t); if (w && !w[4]) { const [a, b, fr, ti] = w, rk = Math.abs(ti[0] - fr[0]) > 0.1 ? 0.8 * Math.sign(ti[0] - fr[0]) : 0;   // riktiga steg (motorns gångcykel), inte bara glidning
    p = L.blandaPose(p, L.steg(t - a, 1, rk)[1], bump(a, b, t, 0.25)); } }
  const gr = gaRikt(t); if (gr) { p.rikt = gr; f = { ...f, titt: [12 * Math.sign(gr), 2] }; }   // går i riktningsposen, speglas aldrig
  for (const s of SKUTT) { p = L.blandaPose(p, 'huka', bump(s - 0.25, s + 0.02, t, 0.12) + 0.6 * bump(s + 0.38, s + 0.6, t, 0.1)); }
  // reaktionsslaget tonar ut 0,35 s in i nästa rad (förut slutade det tvärt på radgränsen, och det syntes där kameran glider i stället för att klippa)
  const reak = (rr, x) => { const RE = REAKTION[rr.id], k = RE ? bump(rr.d - GLES - 0.15, rr.d + 0.35, x, 0.3) : 0; if (k > 0) { f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(rr) % 2 ? 2.5 : -2.5) * k; } };
  const fo = RAD[RAD.indexOf(r) - 1]; reak(r, tl); if (fo && tl < 0.4) reak(fo, tl + fo.d);
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

async function ritaKanin(t) {
  const [f, p] = kaninen(t); L.rita(G, f, p);
  // bandet: glider ner över öronen (150 px på 0,45 s), sitter kvar till slutet
  const band = t >= PB_GLID[1]; $('band').setAttribute('display', band ? 'inline' : 'none');
  if (band) $('band').setAttribute('transform', `translate(0 ${(-150 * (1 - mjuk((t - PB_GLID[1]) / 0.45))).toFixed(1)})`);
  // öronen trycks ner under bandet när det glider på (180 px ner, 30° inåt: helt dolda bakom huvudet och bandet) och ploppar upp ett i taget
  [['l', 350, 300, 1], ['r', 675, 305, -1]].forEach(([s, px, py, v], i) => {
    const g = mjuk((t - PB_GLID[1]) / 0.45) * (1 - reser((t - PLOPP[i]) / 0.25));
    G.querySelector('.ora-in-' + s).setAttribute('transform', Math.abs(g) < 1e-3 ? '' : `translate(0 ${(180 * g).toFixed(1)}) rotate(${(30 * v * g).toFixed(2)} ${px} ${py})`); });
  // frosten och flingorna på öronspetsarna
  const fr = 0.85 * mjuk((t - FROST[0]) / 1.2) * (1 - mjuk((t - FROST[1]) / 1.0));
  G.querySelectorAll('.frost').forEach(e => e.setAttribute('opacity', fr.toFixed(3)));
  G.querySelectorAll('.flk').forEach(e => { const i = +e.dataset.i, x0 = +e.dataset.x, y0 = +e.dataset.y, a = ORONSNO[0] + i * 0.45, u = k01((t - a) / 0.9), av = k01((t - ORONSNO[1] - i * 0.05) / 0.6);
    const vis = t > a && av < 1; e.setAttribute('display', vis ? 'inline' : 'none'); if (!vis) return;
    e.setAttribute('transform', `translate(${(x0 + 30 * Math.sin(u * 5 + i) * (1 - u) + 40 * av).toFixed(1)} ${(y0 - 160 * (1 - mjuk(u)) + 220 * av * av).toFixed(1)}) scale(${(0.6 + 0.4 * mjuk(u)).toFixed(2)})`);
    e.setAttribute('opacity', (1 - av).toFixed(2)); });
  // boil 2,5 px i bild och vit kant 3 px i bild, räknat mot kamerans skala
  const mitt = kanin.position.clone().add(v3(0, 0.17, 0)), d = mitt.clone().sub(cam.position).dot(cam.getWorldDirection(v3())) || 3;
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
const ORDNING = [...BAK, ...GRANAR, TRADET].sort((a, b) => a.z - b.z);
ORDNING.forEach((k, i, a) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); });
KANKORT.upp = KANIN_UPP; SNOGUBBEN.upp = GUBBE_UPP;
KANKORT.z = PLATS['vid-bollar'][1];   // där kaninen står när boken stängs
const NER = [...ORDNING, KANKORT, SNOGUBBEN].sort((a, b) => b.z - a.z);
NER.forEach((k, i, a) => k.ner = STANG + 0.3 + i * 0.5 / (a.length - 1));
const SLUT_GLID = 1.5;   // kameran glider ut till slut (1,5 s) innan pärmen börjar fällas
const PARM_NER = [STANG + 0.1 + SLUT_GLID, STANG + 2.3];

// ---- kritan ritar (som 062, 063) ----
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
{ const a = S('03'), b = S('04'), c = S('08'), d = S('09'), va = MAL('03', 5) + 0.3, vc = MAL('08', 16) + LN(16) - 0.2;
  teckning('flinga', FLINGA_URL, ruta(FLINGA_I), () => FLINGAN,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, va - 0.2], vanta: [va, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, FL_KLAR], [240, 40]);
  teckning('pannband', PB_URL, ruta(PB_I), () => PBKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, vc - 0.2], vanta: [vc, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, PB_KLAR], [-280, -170]); }   // väntar uppe till vänster, inte på kaninens mage

// ---- en bildruta ----
const glimt = (t, t0, p, r = 90, n = 4) => { if (t < t0 || t > t0 + 1.2) return ''; const [x, y] = skarm(p); return gnistor(x, y, r, t - t0, n); };
const nivaSnofall = t => { const r = rad(t), n = [0, 60, 150][r.st.snofall], f = RAD[RAD.indexOf(r) - 1], n0 = f ? [0, 60, 150][f.st.snofall] : 0; return lerp(n0, n, mjuk((t - r.s) / 1.5)); };
const FAGEL_ORD = [MAL('19b', 32) + ORD.rod, MAL('19b', 33) + ORD.bla, MAL('19b', 34) + ORD.gul];
const FAGEL_PIP = [[S('18') + 0.1, 1], [S('18') + 0.7, 2], [S('18') + 1.4 + LN(30) + 1.8, 0], ...FAGEL_ORD.map((t, i) => [t - (i === 1 ? 0.35 : 0.05), i]),   // den blåa piper före "blå" (pipet dolde ordet)
  ...[0.7, 1.0, 1.3].map((o, i) => [MAL('20', 35) + LN(35) + o, i]), [MAL('24c', 41) + 0.3, 0], [MAL('24c', 41) + 0.45, 1], [MAL('24c', 41) + 0.6, 2]];
const FAGEL_LYFT = [[S('19') + 0.5, 0], [S('19') + 0.65, 1], [S('19') + 0.8, 2], ...FAGEL_ORD.map((t, i) => [t, i]), [MAL('24c', 41) + 0.25, 0], [MAL('24c', 41) + 0.4, 1], [MAL('24c', 41) + 0.55, 2]];
async function bildruta(t) {
  const oppen = t < STANG ? k01((t - OPPNA) / 0.9) : 1 - mjuk((t - PARM_NER[0]) / (PARM_NER[1] - PARM_NER[0]));
  satt(PARM0 + (PARM1 - PARM0) * oppen);
  { const [x, y, z] = kaninPos(t); kanin.position.set(x, KANKORT.y + y, z); }   // först: tussen och pannbandet räknar mot kaninen
  for (const k of [...ORDNING, SNOGUBBEN]) {
    let e = k.upp != null ? reser((t - k.upp) / 0.45) : 0;
    if (k.ner != null) e *= 1 - mjuk((t - k.ner) / 0.35);
    vik(k, e); if (k.flik) k.flik.visible = e > 0.6;
    if (k.vaj !== undefined) k.m.rotation.z = 0.015 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  SNOGUBBEN.m.visible = t >= GUBBE_UPP;
  if (t < STANG) SNOGUBBEN.m.rotation.x *= -1;   // reser sig från bakåtliggande: bildsidan uppåt, inga grå skuggsidor, bakom bollarna
  SNOGUBBEN.m.scale.setScalar(1 + 0.04 * bump(MAL('24d', 42) + 0.3, MAL('24d', 42) + 0.9, t, 0.15) * Math.abs(Math.sin((t - MAL('24d', 42)) * 10)));
  // snön växer in: kullarna, granarna och trädet uppifrån, marken nerifrån
  const sk = k01((t - SNO[0]) / (SNO[1] - SNO[0])), kort1 = mjuk(k01((sk - 0.25) / 0.75));
  MARK_S.satt(mjuk(k01(sk / 0.7))); KBAK_S.satt(kort1); KFRAM_S.satt(kort1); GRAN_S.satt(kort1); TRAD_S.satt(kort1);
  // snöflingan på himlen
  FLINGAN.visible = t >= FL_KLAR - 0.05; FLINGAN.rotation.y = 0.05 * Math.sin((t - FL_KLAR) * 1.2) * k01((t - FL_KLAR) / 0.8);
  FLINGAN.scale.setScalar(1 + 0.06 * bump(MAL('24b', 40) + 0.3, MAL('24b', 40) + 1.0, t, 0.2));
  for (const k of MOLNEN) k.m.position.x = k.x + 0.01 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // fåglarna: sitter på sina grenar (ovanpå snön), lyfter vingen, piper, studsar
  for (const F of FAGLAR) {
    const p = sittplats(F.i, kort1), lyft = FAGEL_LYFT.filter(([a, i]) => i === F.i).reduce((m, [a]) => Math.max(m, bump(a, a + 0.7, t, 0.15)), 0);
    const pip = FAGEL_PIP.filter(([a, i]) => i === F.i).reduce((m, [a]) => Math.max(m, bump(a, a + 0.3, t, 0.08)), 0);
    const st = FAGEL_ORD[F.i], hopp = Math.max(bump(st, st + 0.45, t, 0.12), 0.6 * bump(MAL('24c', 41) + 0.25 + 0.15 * F.i, MAL('24c', 41) + 0.7 + 0.15 * F.i, t, 0.1));
    F.m.position.copy(tradLokal(p)).add(v3(0, -0.006 + 0.025 * hopp, 0));
    F.m.scale.set(1, 1 + 0.06 * hopp, 1);
    await ritaFagel(F, { t, flax: 0.55 * lyft, oppen: pip, blink: ((t + F.i * 1.1) % 3.4) < 0.12 ? 1 : 0 });
  }
  // snöfallet
  const nf = nivaSnofall(t);
  SNOFALL.forEach((m, i) => { const u = m.userData; m.visible = i < nf; if (!m.visible) return;
    const hojd = 1.1, y = hojd - ((t * u.fart + u.fas * hojd) % hojd);
    m.position.set(u.x + 0.03 * Math.sin(t * 0.9 + u.v), SIDA + 0.01 + y, u.z + 0.02 * Math.sin(t * 0.7 + u.v)); m.scale.setScalar(u.s);
    m.material.opacity = k01((i + 1 - nf) * -1 + 1) * k01(y / 0.05); });
  // pannbandet: ligger (bildsidan upp) där kritan ritar det, reser sig, glider i en båge till huvudet
  { const K = PBKORT; K.m.visible = t >= PB_KLAR - 0.05 && t < PB_GLID[1]; K.flik.visible = K.m.visible && t > PB_UPP + 0.3 && t < PB_GLID[0];
    K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - PB_UPP) / 0.45)); K.m.position.set(K.x, K.y, K.z); K.m.scale.setScalar(PB_STOR);   // större när kritan ritar (bandet är smalt: platt på snön blev det en svart remsa)
    if (t >= PB_GLID[0] && t < PB_GLID[1]) { const u = mjuk((t - PB_GLID[0]) / (PB_GLID[1] - PB_GLID[0])), mal = fig2varld([509, 324 - 150]);
      K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y, u) + 0.04 * Math.sin(Math.PI * u), lerp(K.z, mal.z + 0.004, u)); K.m.scale.setScalar(lerp(PB_STOR, 1, u)); }
    K.m.castShadow = t < PB_GLID[0]; }   // ingen skugga över ansiktet när det flyger
  // snöbollarna: rullas från kaninens tassar åt vänster, växer och stannar på "snöboll"; studsar på "En, två, tre"
  const R16 = [MAL('16b', 28) + ORD.en, MAL('16b', 28) + ORD.tva, MAL('16b', 28) + ORD.tre];
  BOLLAR.forEach((k, i) => { const Q = ROLL[i], [bx, bz, bh] = BOLLPOS[i], ut = t >= GUBBE_UPP - 0.3;
    const u = mjuk((t - Q.a) / (Q.b - Q.a)), x0 = PLATS.bollar[0] - 0.09, x = lerp(x0, bx, u), s = lerp(0.25, 1, u);
    k.m.visible = t >= Q.a;   // borta när de ligger platt (baksidan syntes som en ljus remsa)
    k.m.position.set(x, SIDA + 0.03 * bump(R16[i], R16[i] + 0.45, t, 0.12), bz + 0.0005 * i);
    k.m.scale.setScalar(s * (1 + 0.012 * Math.sin(t * 9) * (u > 0 && u < 1)));
    BOLLTEX[i].rotation = (x0 - x) / (bh * lerp(0.25, 1, u * 0.5) / 2);   // rullar: rund, vrids moturs när den rullar åt vänster
    // fälls framåt medan snögubben reser sig bakom dem (bakåtliggande, så att inget går genom något); krymper in i glittret och
    // göms vid 63°, innan baksidan syns; ljusare medan de fälls (förut grå stenar och en beige klump)
    const fall = ut ? mjuk((t - GUBBE_UPP + 0.05) / 0.3) : 0; k.m.rotation.x = Math.PI / 2 * fall; if (fall > 0.7) k.m.visible = false;
    k.m.scale.multiplyScalar(1 - k01(fall / 0.7)); k.m.material.emissive.setScalar(0.4 * fall);
    const sp = RULLSPAR[i]; sp.material.opacity = t >= Q.a && t < STANG + 0.3 ? 0.55 : 0;
    const xs = Math.min(x0, x), xe = Math.max(x0, x); sp.scale.set(Math.max(0.001, xe - xs), 0.022 + 0.04 * s, 1); sp.position.set((xs + xe) / 2, SIDA + 0.0014, bz + 0.008); });
  // snötussen: glider av granens gren, landar på huvudet, faller ner bredvid när kaninen skakar på huvudet
  { const K = TUSSEN, start = v3(-0.56, SIDA + 0.42, -0.14); K.m.visible = t >= TU.a && t < STANG;
    const huvud = fig2varld([512, 214]).add(v3(0, -0.02, 0.012)), mark2 = v3(kanin.position.x + 0.16, SIDA + 0.001, kanin.position.z + 0.04);
    if (t < TU.land) { const u = mjuk((t - TU.a) / (TU.land - TU.a)); K.m.position.set(lerp(start.x, huvud.x, u), lerp(start.y, huvud.y, u) + 0.05 * Math.sin(Math.PI * u), lerp(start.z, huvud.z, u)); K.m.rotation.z = 0.6 * (1 - u); }
    else if (t < TU.skak + 0.3) { K.m.position.copy(huvud); K.m.rotation.z = t > TU.skak ? 0.25 * Math.sin((t - TU.skak) * 18) : 0; }
    else { const u = k01((t - TU.skak - 0.3) / 0.5); K.m.position.set(lerp(huvud.x, mark2.x, mjuk(u / 0.45)), lerp(huvud.y, mark2.y, u * u), lerp(huvud.z, mark2.z, u)); K.m.rotation.z = -0.8 * u; }   // först åt sidan, sedan ner
    K.m.scale.setScalar(1 - 0.4 * mjuk((t - TU.ner - 0.5) / 1.5)); }
  // fotspåren (rad 06c) syns när kaninen gått förbi, kvar till slutet
  const [ga0, ga1] = GA[0]; SPAR.forEach(m => m.material.opacity = 0.8 * k01((((t - ga0) / (ga1 - ga0)) - m.userData.u) / 0.1) * (1 - mjuk((t - STANG - 0.2) / 0.3)));
  // andedräkten vid nosen och snöpuffar vid fötterna
  ANDE.forEach((m, j) => { const t0 = ANDAS[0] + 0.2 * j, pu = ((t - t0) % 2.2) / 1.2; m.visible = t > t0 && t < ANDAS[1] && pu < 1; if (!m.visible) return;   // ett andetag var 2,2 s: tre små moln
    const n = fig2varld([560, 480]); m.position.set(n.x + 0.16 * Math.sqrt(pu) + 0.006 * j, n.y + 0.02 * pu + 0.004 * j, n.z + 0.03);   // syns först utanför kinden
    m.scale.setScalar(0.012 + 0.03 * pu); m.material.opacity = 0.7 * mjuk((pu - 0.3) / 0.2) * (1 - mjuk((pu - 0.65) / 0.35)); });
  const PUFFAR = [...SKUTT.map(s => s + 0.4), ...ROLL.map(q => q.b)];
  FOTPUFF.forEach((m, i) => { const a = PUFFAR[i], u = (t - a) / 0.6; m.visible = a != null && u > 0 && u < 1; if (!m.visible) return;
    const p = i < 2 ? v3(kanin.position.x + (i ? 0.05 : -0.05), SIDA + 0.012, kanin.position.z + 0.02) : v3(BOLLPOS[i - 2][0] + 0.06, SIDA + 0.012, BOLLPOS[i - 2][1] + 0.02);
    m.position.copy(p).add(v3(0, 0.02 * u, 0)); m.scale.setScalar(0.6 + 1.6 * u); m.material.opacity = 0.8 * (1 - u); });
  TRADET.m.updateMatrixWorld(true);
  vik(KANKORT, reser((t - KANIN_UPP) / 0.45) * (1 - mjuk((t - KANKORT.ner) / 0.35))); kanin.visible = t >= KANIN_UPP;
  await ritaKanin(t);
  const v = VYER[Math.max(0, VYER.findLastIndex(w => w.t <= t))];
  bokeh.uniforms.focus.value = cam.position.distanceTo(v.mal); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002;
  scen.updateMatrixWorld(true);
  // kritan och glimtarna i #ov
  let ov = ritaKritan(t);
  const flp = FLINGAN.getWorldPosition(v3());
  ov += glimt(t, MAL('04', 6) + ORD.snoflinga, flp, 160, 5) + glimt(t, MAL('24b', 40) + 0.3, flp, 160, 5) + glimt(t, S('01a') + 0.2, v3(0, SIDA + 0.1, 0.2), 120, 4);
  const bollTopp = i => BOLLAR[i].m.position.clone().add(v3(0.02, BOLLPOS[i][2] * 0.85, 0.02));
  [MAL('16', 27) + ORD.stor, MAL('16', 27) + ORD.mellan, MAL('16', 27) + ORD.liten].forEach((a, i) => ov += glimt(t, a, bollTopp(i), 70, 4));
  R16.forEach((a, i) => ov += glimt(t, a, bollTopp(i), 50, 3));
  const giss21 = MAL('21', 36) + LN(36) + 1.6; [0, 1, 2].forEach(i => ov += glimt(t, giss21 + 0.3 * i, bollTopp(i), 45, 3));
  FAGLAR.forEach(F => { const w = F.m.getWorldPosition(v3()).add(v3(0, 0.06, 0.01)); ov += glimt(t, FAGEL_ORD[F.i] + 0.1, w, 60, 4) + glimt(t, S('19') + 0.5 + 0.15 * F.i, w, 50, 3); });
  ov += glimt(t, MAL('24d', 42) + 0.3, SNOGUBBEN.m.position.clone().add(v3(0.04, 0.36, 0.02)), 110, 5) + glimt(t, GUBBE_UPP, SNOGUBBEN.m.position.clone().add(v3(0, 0.2, 0.02)), 160, 5);
  $('ov').innerHTML = ov;
  komp.render();
}

// ---- kameran: vyerna ur storyboarden, en svag glidning i varje ----
satt(PARM1); scen.updateMatrixWorld(true);
const FLW = FLINGAN.getWorldPosition(v3());
const VY = {
  bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32],
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  himmel: () => [v3(0, 0.62, 1.12), v3(0, 0.62, -0.6), 34],   // närmare: bokens kanter och skrivbordet utanför bild
  flinga: () => [FLW.clone().add(v3(0.04, -0.12, 0.95)), FLW.clone(), 28],
  'flinga-hej': () => [FLW.clone().add(v3(0.06, -0.3, 1.5)), FLW.clone().add(v3(0, -0.15, 0)), 32],
  bred: () => [v3(0, 0.52, 1.32), v3(0, 0.33, -0.2), 31],
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.3, 0.62)), g.clone().add(v3(0, 0.245, 0)), 28],   // öronspetsarna (snön, frosten, ploppet) med även efter pushen
  pannband: () => [v3(-0.05, 0.8, 1.15), v3(-0.07, 0.15, 0.27), 30],   // högre och längre bak: hela öronen med, teckningen på snön syns uppifrån
  bollar: () => [v3(-0.13, 0.46, 1.3), v3(-0.16, 0.15, 0.22), 32],     // bollarna och hela kaninen
  trad: () => [v3(0.36, 0.6, 1.0), v3(0.28, 0.48, -0.1), 27],   // vriden lite åt vänster: himmelskortets högerkant och pärmen utanför bild, också efter pushen
  tradnara: () => [v3(0.4, 0.6, 0.82), v3(0.3, 0.52, -0.16), 30],   // vriden lite åt vänster: himmelskortets högerkant utanför bild, också efter pushen
  tradkanin: () => [v3(0.24, 0.52, 1.15), v3(0.28, 0.42, 0.0), 27],   // rad 20: kaninen (halvbild) och alla tre fåglarna
  tradhej: () => [v3(0.44, 0.66, 0.85), v3(0.32, 0.57, -0.16), 30],   // 24c: lite högre, kaninens öra vid bollarna kommer inte med; vriden åt vänster så att himmelskortets kant är utanför bild
  gubbe: () => [v3(-0.37, 0.42, 1.08), v3(-0.38, 0.2, 0.17), 28],   // hela snögubben, kaninens arm utanför
  hejda: g => [g.clone().add(v3(0.06, 0.34, 0.95)), g.clone().add(v3(-0.1, 0.2, -0.3)), 30],   // rakare och smalare: skrivbordet utanför bild
  slut: () => [v3(-0.2, 2.1, 3.5), v3(0, 0.12, -0.1), 32],   // ute vid skrivbordet: hela den stängda boken i mitten (även efter pushen)   // ute vid skrivbordet: hela den stängda boken i mitten
};
const lage = (pos, mal, P) => [Math.atan2(pos.x - P[0], pos.z - P[2]) * 180 / Math.PI, Math.hypot(pos.x - P[0], pos.z - P[2]), pos.y - P[1], mal.x - P[0], mal.y - P[1]];
const fran3 = (l, P) => { const a = l[0] * Math.PI / 180; return [v3(P[0] + l[1] * Math.sin(a), P[1] + l[2], P[2] + l[1] * Math.cos(a)), v3(P[0] + l[3], P[1] + l[4], P[2])]; };
const skjut = l => [l[0] + 1.2, l[1] * 0.965, l[2] * 0.985, l[3], l[4]];
// gemensam rättning A (062–065): planeraren tittar alltid på platsen + [x, y, 0]. Innan förra vyns blickpunkt skrivs om mot en ny
// plats flyttas den längs blicklinjen till den nya platsens z-plan, så att kameran tittar åt samma håll i glidningens första ruta.
const paZ = (p, m, z) => { const k = (z - p.z) / (m.z - p.z); return k > 0 && isFinite(k) ? p.clone().lerp(m, k) : m; };
// tillägg till A: planeraren byter fov på en gång när glidningen börjar (28 → 27 gav ett hopp på 4 %). Startläget flyttas längs blicklinjen
// så att bilden är lika stor med nya fov, och glidningen tar sedan bort skillnaden mjukt.
const fovPa = (p, m, fo, fn) => fo === fn ? p : m.clone().add(p.clone().sub(m).multiplyScalar(Math.tan(fo * Math.PI / 360) / Math.tan(fn * Math.PI / 360)));
const platser = {}, VYER = [];
const blurFor = n => /nara|flinga$/.test(n) ? 0.008 : /halv|pannband|bollar|gubbe|tradnara/.test(n) ? 0.006 : 0.003;
function vy(t, namn, g, o = {}) {
  const [pos, mal, fov] = VY[namn](g), P = o.P || [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  const fran = o.fran || lage(pos, mal, P);
  VYER.push({ t, mot: key, fran, till: o.till || skjut(fran), fov, mal: o.mal || mal, blur: blurFor(namn) });
}
function glid(t0, d, namn, g) {   // kameran glider från förra vyns läge till nästa vy
  const f = VYER.at(-1), [p00, m0] = fran3(f.till ?? f.fran, platser[f.mot]), [pos, mal, fov] = VY[namn](g), p0 = fovPa(p00, m0, f.fov, fov);
  const P = [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
  VYER.push({ t: t0, mot: key, fran: lage(p0, paZ(p0, m0, P[2]), P), till: lage(pos, mal, P), fov, mal, blur: blurFor(namn), rorelse: 'glid' });
  vy(t0 + d, namn, g);
}
const GLID = { '02': [0, 1.6], '06c': [0.15, 2.45], '19': [0, 1.3] };   // in mot himlen; följer kaninen när den går; från kaninen vid granen till trädet
const P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0), inL = lage(...VY.in().slice(0, 2), P0);
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'logga' ? 'bord' : r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (VY[namn].length ? r.st.plats : '');
  if (r.id === '01a') { vy(r.s, 'bord', g, { P: P0, fran: [bordL[0] - 7, bordL[1] * 1.07, bordL[2] * 1.05, bordL[3], bordL[4]], till: bordL, mal: v3(0, 0.25, -0.1) }); forra = 'bord'; continue; }
  if (r.id === '01b') { VYER.at(-1).till = bordL; vy(r.s + 0.9, 'in', g, { P: P0, fran: bordL, till: inL, mal: v3(0, 0.32, -0.2) }); forra = 'in'; continue; }
  if (r.id === '26') {   // gemensam rättning B: kameran är ute (slut) innan pärmen fälls, sedan en långsam push mot den stängda boken
    const f = VYER.at(-1), [pos0, mal] = fran3(f.till, platser[f.mot]), [sp, sm, sf] = VY.slut(), slutL = lage(sp, sm, P0), pos = fovPa(pos0, mal, f.fov, sf); platser.pBord = P0;
    VYER.push({ t: r.s + 0.1, mot: 'pBord', fran: lage(pos, paZ(pos, mal, P0[2]), P0), till: slutL, fov: sf, mal: sm, blur: 0.003, rorelse: 'glid' });
    VYER.push({ t: r.s + 0.1 + SLUT_GLID, mot: 'pBord', fran: slutL, till: [slutL[0] - 1.5, slutL[1] * 0.94, slutL[2] * 0.94, slutL[3], slutL[4]], fov: sf, mal: sm, blur: 0.003, rorelse: 'glid' }); continue; }
  if (r.id === '24c') { vy(r.s, 'tradhej', g); forra = 'tradhej'; continue; }   // närbild: kaninen vid bollarna kommer inte med i bild
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
VYER.sort((a, b) => a.t - b.t);
const plan = kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd: DURATION });

// ---- ljudet: Malin, kaninen och effekterna ur raderna, kritans ritljud som slinga, vinterljudet lågt under allt ----
const EF = 'assets/ljud/effekter/';
// kaninens ljud: varje fil får sin egen volym så att den ligger 3 dB under Malin (största momentana ljudstyrkan, ebur128 M, mätt 2026-11-28;
// Malins repliker: median −14,4 LUFS × 2,5 = −6,4). Förut 2,0 på alla: de starkaste låg 9 dB över henne.
const KANIN_M = { 'gullig-2': -11.6, 'gullig-3': -12.6, 'gullig-5': -14.7, 'gullig-7': -11.0, 'hej-4': -9.0, 'hejda-2': -10.0, 'hejda-3': -9.7, 'ny-brr-1': -15.6, 'ny-fniss-1': -14.7, 'ny-fniss-2': -13.4, 'ny-fortjust-1': -12.0, 'ny-fortjust-2': -11.0, 'ny-fragande-1': -9.5, 'ny-fragande-2': -10.2, 'ny-hej-2': -11.6, 'ny-ja-1': -8.6, 'ny-jippi-1': -9.8, 'ny-jippi-2': -10.6, 'ny-mmm-1': -7.4, 'tack-1': -14.6 };
const kaninVol = f => { const m = KANIN_M[f.match(/kanin-([\w-]+?)(\.m4a)?$/)[1]]; return m == null ? 1.2 : Math.min(3, 10 ** ((-6.4 - 3 - m) / 20)); };
const VOL = f => /kanin-/.test(f) ? kaninVol(f) : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|landa-mjuk)/.test(f) ? 0.7 : 1.0;
const LJUD = [];
for (const r of RAD) {
  for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `assets/ljud/roster/vintern-i-boken/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
  for (const [f, o, v] of r.ljud || []) if (!/^(krita-ritar|vinterljud)\//.test(f)) LJUD.push({ t: r.s + o, fil: EF + f + (/\.\w+$/.test(f) ? '' : '.m4a'), vol: VOL(f) * (v != null ? v / 0.7 : 1) });
}
for (const [i, D] of RIT.entries()) LJUD.push({ t: D.T.rit[0], fil: EF + `krita-ritar/krita-ritar-${i + 1}.m4a`, vol: 1.2, langd: D.T.rit[1] - D.T.rit[0] + 0.3, loop: true, fade: 0.4 });
LJUD.push({ t: 0, fil: EF + MATTA[0] + '.m4a', vol: MATTA[1], langd: DURATION, loop: true, fadeIn: 1.0, fade: 2.0 });
LJUD.push(...plan.ljud);
window.LJUD = LJUD.filter(c => c.t < DURATION).sort((a, b) => a.t - b.t);
window.DURATION = DURATION;
window.TIDER = Object.fromEntries(RAD.map(r => [r.id, +r.s.toFixed(2)]));
window.seek = t => plan.rita(t, () => bildruta(t));
window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
