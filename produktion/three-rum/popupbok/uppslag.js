// Kritans bok: det som är gemensamt för bokavsnittens scener (062–065), se format/kritans-bok.md avsnitt 5.
// Kortmotorn, ordningen upp och ner, figuren på sitt kort, kritan på en 3D-yta, kameran som vyer, skärpedjupet, ljuset och ljudet.
// Avsnittets boken.js har kvar det som är temat: bilderna, uppslagets koordinater, vyerna, rörelserna per rad och effekterna.
// Här ligger bara det som minst två avsnitt gör likadant. Mallen: avsnitt/_mall-kritans-bok/.
// Sidan behöver (index.html): canvas#bild, svg#kort med defs#defs, #brus, #boilStyrka och g#figurer, svg#ov, och skripten
// blinka.js, kant.js, kritan-ritar.js och v2-rigg.js före modulen.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { kameraplan } from '/verktyg/kamera3d.mjs';
import { duk, kritYta, tex, trim, SIDA } from './bok-parm.js';

export const $ = id => document.getElementById(id);
export const kl = (a, b, x) => Math.min(b, Math.max(a, x)), k01 = x => kl(0, 1, x), lerp = (a, b, k) => a + (b - a) * k;
export const mjuk = k => (k = k01(k), k * k * (3 - 2 * k));
export const bump = (a, b, t, r = 0.3) => mjuk((t - a) / r) * mjuk((b - t) / r);   // 0 → 1 → 0
export const reser = k => { k = k01(k); const s = 0.9; return 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2; };   // fälls upp med en liten efterstudsning
export const v3 = (...a) => new THREE.Vector3(...a);

// ---- raderna: rader.mjs → tider. Scenens t = 0 är första raden efter loggan (rad 00 läggs på i sammansättningen) ----
export function rader({ RADER, ROST, ...ovrigt }) {
  let acc = 0;
  const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, st: r.s, s }; });
  const RR = Object.fromEntries(RAD.map(r => [r.id, r])), S = id => RR[id].s, LN = n => ROST[n - 1][1];
  const MAL = (id, n) => S(id) + RR[id].malin.find(m => m[0] === n)[1];   // när Malins replik n börjar
  return { ...ovrigt, RAD, ROST, RR, S, LN, MAL, DURATION: acc, rad: t => RAD[Math.max(0, RAD.findLastIndex(r => r.s <= t))],
    SVAR: (id, n) => MAL(id, n) + LN(n) + 0.2 };   // figurens svar: 0,2 s efter repliken
}

// ---- renderaren, scenen och kameran ----
export function scenen() {
  const SNABB = location.search.includes('snabb'), W = SNABB ? 960 : 1920, H = SNABB ? 540 : 1080, PR = SNABB ? 1 : 1.5;
  const R = new THREE.WebGLRenderer({ canvas: $('bild'), antialias: true, preserveDrawingBuffer: true });
  R.setPixelRatio(PR); R.setSize(W, H, false);
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
  const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
  return { SNABB, W, H, PR, R, scen, cam: new THREE.PerspectiveCamera(30, W / H, 0.05, 40) };
}

// ---- bilderna ----
export const bild = src => new THREE.ImageLoader().loadAsync(src);
export const lad = src => bild(src).then(i => tex(trim(i)));
export function ruta(i) {   // bildens synliga ruta (som trim): kritans kontur (bildens egna px) läggs på den beskurna bilden
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, u); x1 = Math.max(x1, u); }
  return { ox: x0 - 1, oy: y0 - 1, w: x1 - x0 + 3, h: y1 - y0 + 3, W: i.width, H: i.height };
}
export const dataUrl = async src => { const b = await (await fetch(src)).blob(); return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); };
export const kontur = async src => { const j = await (await fetch(src)).json(); return [j.d, ...(j.detaljer || [])]; };   // kontur.json → konturen + detaljstrecken
export function bredareC(i, bredd) {   // drar ut mitten av en bild (kullar, himmel) till bredd × höjden, kanterna orörda
  const h = i.height, w = Math.round(h * bredd), s = Math.round(i.width * 0.3), c = duk(w, h), x = c.getContext('2d');
  x.drawImage(i, 0, 0, s, h, 0, 0, s, h); x.drawImage(i, i.width - s, 0, s, h, w - s, 0, s, h);
  x.drawImage(i, s, 0, i.width - 2 * s, h, s, 0, w - 2 * s, h); return c;
}
export const bredare = (map, bredd) => tex(bredareC(map.image, bredd));
export const mat = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });
export const urklipp = map => mat(map, { alphaTest: 0.5, alphaToCoverage: true, shadowSide: THREE.DoubleSide });
export function baksida(map) {   // kortets baksida: vitt papper i bildens form
  const i = map.image, c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = '#F4ECDD'; x.fillRect(0, 0, c.width, c.height);
  return mat(tex(c), { alphaTest: 0.5, alphaToCoverage: true, side: THREE.BackSide });
}
export const djup = map => new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, blending: THREE.NoBlending, map, alphaTest: 0.5, side: THREE.DoubleSide });
export const skugga = m => { m.castShadow = m.receiveShadow = true; return m; };
// markarket: ett kritark med rundade hörn och vit kant. rita(x, Wc, D) ritar temats eget ovanpå kritan (065:s prickblommor)
export function mark(farg, ljus, mork, rita) {
  const Wc = 2048, D = 1440, c = duk(Wc, D), x = c.getContext('2d'), form = (p, r) => { x.beginPath(); x.roundRect(p, p, Wc - 2 * p, D - 2 * p, r); };
  x.fillStyle = '#FFF'; form(8, 90); x.fill();
  const g = duk(Wc, D); kritYta(g.getContext('2d'), Wc, D, farg, ljus, mork, 0.7);
  x.save(); form(30, 70); x.clip(); x.drawImage(g, 0, 0); rita?.(x, Wc, D); x.restore(); return c;
}

// ---- kortmotorn ----
// kskugga: kontaktskuggans färg och täckning vid kortets fot, ['28,52,18', 0,42, 0,16] (mitten, 55 % ut).
// paSkuggsida: true ger korten på pärmen (pa) samma material som de stående korten, så att de kastar skugga på himlen (062, 065);
// utan den kastar de ingen, och pa kan ta en färgton (063, 064).
export const vik = (k, e) => { k.m.rotation.x = Math.PI / 2 * (1 - e); k.m.position.y = k.y + k.hog * (1 - k01(e * 4)); };   // e 0 = nedfälld framåt, 1 = står
export const stall = (k, e) => { vik(k, e); if (k.flik) k.flik.visible = e > 0.6; };   // kontaktskuggan bara när kortet står
export function kortmotor(scen, insida, { kskugga: [rgb, a0, a1], paSkuggsida = false }) {
  const KSKUGGA = (() => { const c = duk(256, 64), x = c.getContext('2d'), g = x.createRadialGradient(128, 32, 0, 128, 32, 128);
    g.addColorStop(0, `rgba(${rgb},${a0})`); g.addColorStop(0.55, `rgba(${rgb},${a1})`); g.addColorStop(1, `rgba(${rgb},0)`);
    x.fillStyle = g; x.fillRect(0, 0, 256, 64); return new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); })();
  // kort: står på sidan med foten i (x, z). o: y, flik: false (ingen kontaktskugga), vaj (vajar, fas), dx (flyttar bilden i sidled)
  function kort(map, h, x, z, o = {}) {
    const w = h * map.image.width / map.image.height, g = new THREE.PlaneGeometry(w, h); g.translate(o.dx ?? 0, h / 2, 0);
    const m = skugga(new THREE.Mesh(g, urklipp(map))); m.customDepthMaterial = djup(map);
    m.add(new THREE.Mesh(g, baksida(map)));
    m.position.set(x, o.y ?? SIDA, z); scen.add(m);
    const k = { m, x, y: m.position.y, z, h, w, hog: 0.002, vaj: o.vaj };
    if (o.flik !== false) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, 0.07), KSKUGGA); f.rotation.x = -Math.PI / 2;
      f.position.set(x, SIDA + 0.0009, z + 0.012); f.renderOrder = 1; scen.add(f); k.flik = f; }
    return k;
  }
  function platt(map, w, x, z, d = w * map.image.height / map.image.width, y = SIDA + 0.001) {   // ligger på sidan
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), urklipp(map)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; scen.add(m); return m;
  }
  function pa(map, h, x, upp, ut = 0.01, w = h * map.image.width / map.image.height, farg) {   // på pärmens insida (himlen, molnen)
    const m = skugga(new THREE.Mesh(new THREE.PlaneGeometry(w, h), paSkuggsida ? urklipp(map) : mat(map, { alphaTest: 0.5, alphaToCoverage: true, ...(farg && { color: farg }) })));
    m.customDepthMaterial = djup(map); m.rotation.x = Math.PI / 2; m.position.set(x, -ut, upp); insida.add(m); return m;
  }
  return { kort, platt, pa };
}

// ---- ordningen: korten upp bakifrån och fram när pärmen slås upp, ner framifrån när boken stängs ----
export const PARM = [0.5, 1.4];   // pärmens vinkel stängd och öppen (skapaBok oppna)
export function fallning(satt, OPPNA, STANG) {
  const PARM_NER = [STANG + 1.05, STANG + 1.75];
  return {
    upp(korten) { const a = [...korten].sort((p, q) => p.z - q.z); a.forEach((k, i) => { k.upp = OPPNA + 0.6 + i * 0.8 / (a.length - 1); k.hog = 0.004 + 0.001 * (a.length - i); }); return a; },
    ner(korten) { const a = [...korten].sort((p, q) => q.z - p.z); a.forEach((k, i) => k.ner = STANG + 0.3 + i * 0.5 / (a.length - 1)); return a; },
    // hur uppfällt kortet är vid t (0–1 med efterstudsning); upp = egen uppfällning i stället för k.upp
    e(k, t, upp = k.upp != null ? reser((t - k.upp) / 0.45) : 0) { return k.ner != null ? upp * (1 - mjuk((t - k.ner) / 0.35)) : upp; },
    parm(t) { satt(PARM[0] + (PARM[1] - PARM[0]) * (t < STANG ? k01((t - OPPNA) / 0.9) : 1 - mjuk((t - PARM_NER[0]) / (PARM_NER[1] - PARM_NER[0])))); },
  };
}

// ---- figuren: v2-riggen ritad i #kort varje bildruta och lagd som textur på ett kort ----
// Avsnittet skapar riggen (L = await v2rigg(…), G = L.figur(512, fot, 1, $('figurer'))), lägger in sitt eget i G (saker i handen,
// kläder, masker) och anropar sedan figurKort. hojd: figurens höjd i världen från topp till fot (riggens px). Efteråt: L.rita(G, …).
export const VB = { x: -150, y: -200, w: 1324, h: 1200 };   // #kort:s viewBox
export async function figurKort(scen, cam, L, G, { fot, topp, hojd, blink = 62, hog = 0.001, mitt = hojd / 2 }) {
  G.querySelector('.skugga')?.setAttribute('display', 'none');
  await Promise.all([...$('kort').querySelectorAll('image')].map(async im => { const h = im.getAttribute('href'); if (!h.startsWith('data:')) im.setAttribute('href', await dataUrl(h)); }));
  window.kant.lagg(G); const kantF = $('defs').lastElementChild;
  const BL = skapaBlinka(blink), ENHET = hojd / (fot - topp);
  const kortCanvas = duk(VB.w, VB.h), kortCtx = kortCanvas.getContext('2d'), kortTex = tex(kortCanvas);
  const gg = new THREE.PlaneGeometry(VB.w * ENHET, VB.h * ENHET);
  gg.translate((VB.x + VB.w / 2 - 512) * ENHET, (fot - (VB.y + VB.h / 2)) * ENHET, 0);   // origo i fötterna
  const m = new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, emissiveMap: kortTex, emissive: new THREE.Color(0.3, 0.3, 0.3), alphaTest: 0.5, side: THREE.FrontSide }));
  m.add(new THREE.Mesh(gg, new THREE.MeshLambertMaterial({ map: kortTex, color: 0x000000, emissive: '#F4ECDD', alphaTest: 0.5, side: THREE.BackSide })));   // baksidan: vitt papper
  m.castShadow = m.receiveShadow = true;
  m.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: kortTex, alphaTest: 0.5 });
  scen.add(m);
  const stillBild = new Image();
  return { m, y: SIDA + 0.004, hog, ENHET, BL,
    fig2varld: ([x, y], pos = m.position) => v3(pos.x + (x - 512) * ENHET, pos.y + (fot - y) * ENHET, pos.z + 0.01),   // riggens px → världen
    nick: (f, p, tl) => tl >= 0 && tl < 2 ? L.nicka(f, p, tl) : [f, p],
    // #kort → kortets textur. Boil 2,5 px och vit kant 3 px i bild, räknat mot kamerans avstånd; ny brusbild 6 gånger/s
    async textur(t) {
      const d = m.position.clone().add(v3(0, mitt, 0)).sub(cam.position).dot(cam.getWorldDirection(v3())) || 3;
      const s = 540 / (d * Math.tan(cam.fov * Math.PI / 360)) * ENHET;
      $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1); $('boilStyrka').setAttribute('scale', (2.5 / s).toFixed(2));
      const ru = 3 / s;
      kantF.querySelector('feMorphology[result="d"]')?.setAttribute('radius', ru.toFixed(3));
      kantF.querySelector('feDisplacementMap')?.setAttribute('scale', (0.35 * ru).toFixed(3));
      const tu = kantF.querySelectorAll('feTurbulence'); tu[0]?.setAttribute('baseFrequency', (0.05 * s).toFixed(5)); tu[1]?.setAttribute('baseFrequency', (0.35 * s).toFixed(5));
      const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString($('kort'))], { type: 'image/svg+xml' }));
      stillBild.src = url; await stillBild.decode(); URL.revokeObjectURL(url);
      kortCtx.clearRect(0, 0, VB.w, VB.h); kortCtx.drawImage(stillBild, 0, 0, VB.w, VB.h); kortTex.needsUpdate = true;
    } };
}
// vinkar: armen bakom kroppen, snett upp och ut förbi kanten; stor = hej då, högre och tydligare (063, 064)
export function vink(f, p, tl, d, stor = false) {
  if (tl < 0 || tl > d) return [f, p];
  const upp = mjuk(Math.min(tl / 0.4, (d - tl) / 0.4)), s = Math.sin(2 * Math.PI * (stor ? 1.5 : 1.3) * tl), [a, b] = stor ? [80, 24] : [55, 14];
  return [f, { ...p, armar: [p.armar[0] + upp * (a + b * s), p.armar[1]], fram: [0, p.fram?.[1] || 0], luta: (p.luta || 0) + upp * (1.5 + 1.2 * s) }];
}
// går i riktningsposen (speglas aldrig): GA = [[start, slut, från [x, z], till [x, z]], …] → rikt −1…1, 0 när figuren står
export const gaRikt = (GA, t, styrka = 1) => { for (const [a, b, f, g] of GA) if (Math.abs(g[0] - f[0]) > 0.1 && t > a - 0.3 && t < b + 0.3) return Math.sign(g[0] - f[0]) * styrka * bump(a - 0.3, b + 0.3, t, 0.3); return 0; };

// ---- kritan ritar på en 3D-yta (verktyg/kritan-ritar.js): konturen läggs på ytan med en affin avbildning ur kamerans projektion ----
export function kritan(cam) {
  const skarm = p => { const q = p.clone().project(cam); return [(q.x + 1) * 960, (1 - q.y) * 540]; };   // världen → #ov (1920 × 1080)
  function affin(mesh, r) {   // bildens px (hela png:n) → skärmen
    mesh.updateMatrixWorld(true); const g = mesh.geometry; g.computeBoundingBox(); const b = g.boundingBox;
    const varld = (ix, iy) => mesh.localToWorld(v3(lerp(b.min.x, b.max.x, (ix - r.ox) / r.w), lerp(b.max.y, b.min.y, (iy - r.oy) / r.h), 0));
    const cx = r.W / 2, cy = r.H / 2, d = r.W / 4, [x0, y0] = skarm(varld(cx, cy)), [x1, y1] = skarm(varld(cx + d, cy)), [x2, y2] = skarm(varld(cx, cy + d));
    const a = (x1 - x0) / d, b2 = (y1 - y0) / d, c = (x2 - x0) / d, e = (y2 - y0) / d;
    return { m: [a, b2, c, e, x0 - a * cx - c * cy, y0 - b2 * cx - e * cy], p: ([x, y]) => [a * x + c * y + x0 - a * cx - c * cy, b2 * x + e * y + y0 - b2 * cx - e * cy] };
  }
  const RIT = [], KS = KRITAN.SKALA_SCEN * 1.25;   // kritan i närbild
  // drag: konturen ur kontur(); r: ruta(bilden); mesh: ytan (eller t => ytan); T: { in, rit, vanta, ut }; fyll: [start, slut]; vanta: [dx, dy] i bild
  const teckning = (namn, href, drag, r, mesh, T, fyll, vanta) => RIT.push({ namn, href, drag, r, mesh, T, fyll, vanta });
  function rita(t) {
    let h = '';
    for (const D of RIT) {
      const { T, fyll: [f0, f1], r } = D;
      if (t < T.in[0] || t > Math.max(T.ut[1], f1 + 0.5)) continue;
      const A = affin(typeof D.mesh === 'function' ? D.mesh(t) : D.mesh, r), f = k01((t - f0) / (f1 - f0)), k = ritfart((t - T.rit[0]) / (T.rit[1] - T.rit[0]));
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
  // krit-gnistor vid en punkt i världen, 1,2 s från t0 (saker som studsar och glimtar på sitt ord)
  const glimt = (t, t0, p, r = 90, n = 4) => { if (t < t0 || t > t0 + 1.2) return ''; const [x, y] = skarm(p); return gnistor(x, y, r, t - t0, n); };
  return { skarm, affin, teckning, rita, glimt, RIT };
}

// ---- ljuset ----
export function ljuset(scen, { himmel = ['#FFFAF0', '#D8B892', 2.3], sol = ['#FFF0DC', 2.2], hojd = 4 } = {}) {
  const hemi = new THREE.HemisphereLight(...himmel); scen.add(hemi);
  const ljus = new THREE.DirectionalLight(...sol); ljus.position.set(-2.2, hojd, 3); ljus.castShadow = true;
  Object.assign(ljus.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 12 });
  ljus.shadow.mapSize.set(4096, 4096); ljus.shadow.bias = -0.0004; ljus.shadow.normalBias = 0.01; ljus.shadow.radius = 4; scen.add(ljus);
  return { hemi, ljus };
}

// ---- skärpedjupet: BokehPass med kortens egna djupmaterial (urklippen har hål) ----
export function djupskarpa({ R, scen, cam, W, H, PR }) {
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
  // fokus på vyns mål, mer oskärpa i närbilder (vyns blur)
  const fokus = v => { bokeh.uniforms.focus.value = cam.position.distanceTo(v.mal); bokeh.uniforms.maxblur.value = v.blur; bokeh.uniforms.aperture.value = v.blur > 0.003 ? 0.012 : 0.002; };
  return { komp, fokus };
}

// ---- kameran: vyer till verktyg/kamera3d.mjs ----
// VY: { namn: g => [kamerans plats, målet, fov] } (g = figurens plats). blur: namn → oskärpa (0,008 närbild, 0,006 halvbild, 0,003 helbild).
// lyft: (namn, glid) → hur mycket högre kameran står än vyns plats. Vyerna bord (den stängda boken) och slut läggs till här.
export const lage = (pos, mal, P) => [Math.atan2(pos.x - P[0], pos.z - P[2]) * 180 / Math.PI, Math.hypot(pos.x - P[0], pos.z - P[2]), pos.y - P[1], mal.x - P[0], mal.y - P[1]];
export const fran3 = (l, P) => { const a = l[0] * Math.PI / 180; return [v3(P[0] + l[1] * Math.sin(a), P[1] + l[2], P[2] + l[1] * Math.cos(a)), v3(P[0] + l[3], P[1] + l[4], P[2])]; };
export const skjut = l => [l[0] + 1.2, l[1] * 0.965, l[2] * 0.985, l[3], l[4]];   // svag push in i varje vy
export const BOKVYER = { bord: () => [v3(-0.3, 2.55, 4.1), v3(0, 0.25, -0.1), 32], slut: () => [v3(-0.15, 1.45, 2.45), v3(0, 0.2, -0.1), 32] };   // den stängda boken; boken stängs
export function kamera(cam, vyerna, { blur, lyft = () => 0 }) {
  const VY = { ...BOKVYER, ...vyerna };
  const platser = {}, VYER = [], P0 = [0, 0, -0.2], bordL = lage(...VY.bord().slice(0, 2), P0);
  function vy(t, namn, g, o = {}) {   // klipp till en vy; o: P (punkten kameran går runt), fran, till, mal
    const [pos, mal, fov] = VY[namn](g), P = o.P || [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
    if (!o.fran) pos.y += lyft(namn, false);
    const fran = o.fran || lage(pos, mal, P);
    VYER.push({ t, mot: key, fran, till: o.till || skjut(fran), fov, mal: o.mal || mal, blur: blur(namn) });
  }
  function glid(t0, d, namn, g) {   // kameran glider från förra vyns läge till nästa vy
    const f = VYER.at(-1), [p0, m0] = fran3(f.till ?? f.fran, platser[f.mot]), [pos, mal, fov] = VY[namn](g); pos.y += lyft(namn, true);
    const P = [mal.x, 0, mal.z], key = 'p' + VYER.length; platser[key] = P;
    VYER.push({ t: t0, mot: key, fran: lage(p0, m0, P), till: lage(pos, mal, P), fov, mal, blur: blur(namn), rorelse: 'glid' });
    vy(t0 + d, namn, g);
  }
  return { VY, VYER, platser, vy, glid, P0,
    aktiv: t => VYER[Math.max(0, VYER.findLastIndex(w => w.t <= t))],   // vyn som gäller vid t (till skärpedjupets fokus)
    // öppningen: kameran driver lugnt mot den stängda boken från t0 och glider in i boken (vyn namn) från t1; ger vyns läge
    oppning(t0, t1, namn) {
      const [pos, mal] = VY[namn](), inL = lage(pos, mal, P0);
      vy(t0, 'bord', null, { P: P0, fran: [bordL[0] - 7, bordL[1] * 1.07, bordL[2] * 1.05, bordL[3], bordL[4]], till: bordL, mal: VY.bord()[1] });
      vy(t1, namn, null, { P: P0, fran: bordL, till: inL, mal }); return inL;
    },
    // stängningen: ut ur boken från förra vyns slut, medan korten fälls ner och pärmen slås igen
    stangning(t) {
      const f = VYER.at(-1), [pos, mal] = fran3(f.till, platser[f.mot]), [p1, m1, fov] = VY.slut();
      VYER.push({ t, mot: 'pBord', fran: lage(pos, mal, P0), till: lage(p1, m1, P0), fov, mal: m1, blur: 0.003, rorelse: 'glid' }); platser.pBord = P0;
    },
    plan(langd) { VYER.sort((a, b) => a.t - b.t); return kameraplan({ cam, canvas: $('bild'), platser, vyer: VYER, langd }); } };
}

// ---- ljudet och sidans gränssnitt mot render.mjs (window.seek, LJUD, DURATION, TIDER, ready) ----
// rost: mappen i assets/ljud/roster/ (eller n => hela mappen). vol: fil → volym. matta: [fil, volym] under hela scenen.
// RIT: kritans teckningar (ritljudet som slinga). extra: avsnittets egna ljud. Radernas ljud: [fil, tid, volym] (volym 0,7 = vol(fil)).
const EF = 'assets/ljud/effekter/';
export function starta({ RAD, ROST, DURATION }, plan, bildruta, { rost, vol, matta, RIT, extra = [] }) {
  const LJUD = [], hoppa = new RegExp(`^(krita-ritar|${matta[0].split('/')[0]})/`);   // ritljudet och mattan läggs på här, inte ur raderna
  for (const r of RAD) {
    for (const [n, o] of r.malin || []) LJUD.push({ t: r.s + o, fil: `${typeof rost === 'function' ? rost(n) : 'assets/ljud/roster/' + rost}/${ROST[n - 1][0]}.m4a`, vol: 2.5 });
    for (const [f, o, v] of r.ljud || []) if (!hoppa.test(f)) LJUD.push({ t: r.s + o, fil: EF + f + (/\.\w+$/.test(f) ? '' : '.m4a'), vol: vol(f) * (v != null ? v / 0.7 : 1) });
  }
  for (const [i, D] of RIT.entries()) LJUD.push({ t: D.T.rit[0], fil: EF + `krita-ritar/krita-ritar-${i + 1}.m4a`, vol: 1.2, langd: D.T.rit[1] - D.T.rit[0] + 0.3, loop: true, fade: 0.4 });
  LJUD.push({ t: 0, fil: EF + matta[0] + '.m4a', vol: matta[1], langd: DURATION, loop: true, fadeIn: 1.0, fade: 2.0 });
  LJUD.push(...extra, ...plan.ljud);
  window.LJUD = LJUD.filter(c => c.t < DURATION).sort((a, b) => a.t - b.t);
  window.DURATION = DURATION;
  window.TIDER = Object.fromEntries(RAD.map(r => [r.id, +r.s.toFixed(2)]));
  window.seek = t => plan.rita(t, () => bildruta(t));
  window.ready = window.seek(+(new URLSearchParams(location.search).get('t') || 0)).then(() => true);
}
