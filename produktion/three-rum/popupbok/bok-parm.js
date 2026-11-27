// Kritans bok (2026-11-27): pärmarna, tygryggen och bladbunten. Varje berättelse använder samma bok, bara med egen färg och figur:
//   const bok = await skapaBok(scen, { farg: '#E8683A', figur: 'bilder/gurra.png' });          // siluett i medaljongen
//   const bok = await skapaBok(scen, { farg: '#4FA845', figur: '…/kanel.png', fargbild: true }); // figuren som klistermärke
// Fler val: figur: 'kritan' (Lilla Kritans krita i stället för ett djur), doodles och ram av med false.
// Returnerar { bok, parmen, insida, ryggen, satt(t) }. Saker på pärmens insida (himlen, solen …) läggs i `insida`,
// y < 0 är ut från papperet och z uppåt från gångjärnet. satt(t) slår upp pärmen mellan oppna[0] och oppna[1] sekunder.
// Allt ritas i kod: kritYta med papperskorn, siluetten ur urklippets alfa (urklippet ändras inte), ingen text.
import * as THREE from 'three';

// ---- krita på papper (fast frö, samma bild varje rendering) ----
let fro = 7;
export const slump = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
// willReadFrequently: ritas i processorn. Chromes GPU-canvas blandade ihop filter (blur) med bilden under och gjorde omslaget blekt.
export const duk = (w, h) => { const c = Object.assign(document.createElement('canvas'), { width: w, height: h }); c.getContext('2d', { willReadFrequently: true }); return c; };
export function kritYta(x, w, h, farg, ljus, mork, streck = 1) {
  x.fillStyle = farg; x.fillRect(0, 0, w, h);
  x.lineCap = 'round';
  for (let i = 0; i < 260 * streck * w * h / 1e6; i++) {   // lösa diagonala kritstreck, ljusa och mörka
    const sx = slump() * w, sy = slump() * h, l = (0.03 + slump() * 0.08) * Math.max(w, h), v = -0.9 + slump() * 0.3;
    x.strokeStyle = slump() < 0.55 ? ljus : mork; x.globalAlpha = 0.18 + slump() * 0.2; x.lineWidth = 1.5 + slump() * 3;
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + Math.cos(v) * l, sy + Math.sin(v) * l); x.stroke();
  }
  x.globalAlpha = 1;
  const d = x.getImageData(0, 0, w, h), p = d.data;   // papperskorn
  for (let i = 0; i < p.length; i += 4) { const n = (slump() - 0.5) * 26; p[i] += n; p[i + 1] += n; p[i + 2] += n; }
  x.putImageData(d, 0, 0);
}
const kritDuk = (w, h, farg, streck) => { const c = duk(w, h); kritYta(c.getContext('2d'), w, h, farg, ton(farg, 0.07), ton(farg, -0.07), streck); return c; };
export const tex = c => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
// beskär en bild till det som syns (alfa > 128), med en pixels marginal
export function trim(i) {
  const c = duk(i.width, i.height), x = c.getContext('2d'); x.drawImage(i, 0, 0);
  const a = x.getImageData(0, 0, c.width, c.height).data; let y0 = c.height, y1 = 0, x0 = c.width, x1 = 0;
  for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (u < x0) x0 = u; if (u > x1) x1 = u; }
  const ut = duk(x1 - x0 + 3, y1 - y0 + 3); ut.getContext('2d').drawImage(c, x0 - 1, y0 - 1, ut.width, ut.height, 0, 0, ut.width, ut.height);
  return ut;
}
// en ton av färgen: ljusare (dl > 0) eller mörkare, räknad i sRGB som färgen skrivs
const kl = (a, b, x) => Math.min(b, Math.max(a, x));
export function ton(farg, dl, ds = 0) {
  const c = new THREE.Color(farg), h = {}; c.getHSL(h, THREE.SRGBColorSpace);
  return '#' + c.setHSL(h.h, kl(0, 1, h.s + ds), kl(0, 1, h.l + dl), THREE.SRGBColorSpace).getHexString();
}
const mat = (map, o = {}) => new THREE.MeshLambertMaterial({ map, ...o });
const skugga = m => { m.castShadow = m.receiveShadow = true; return m; };

// ---- skrivbordet och kritorna ----
export function skrivbord(scen, kritor = [['#E2563F', 1.75, 0.55, 0.5], ['#F2C23A', 1.95, 0.75, 0.35], ['#3F8FD2', -1.85, 0.9, -0.25]]) {
  const c = duk(1024, 1024), x = c.getContext('2d'); kritYta(x, 1024, 1024, '#C8925E', '#DDAE7C', '#A9744A', 0.6);
  x.globalAlpha = 0.22; x.strokeStyle = '#8E5E38';   // ådring
  for (let i = 0; i < 26; i++) { const y0 = slump() * 1024; x.lineWidth = 2 + slump() * 4; x.beginPath(); x.moveTo(0, y0);
    for (let u = 0; u <= 1024; u += 64) x.lineTo(u, y0 + Math.sin(u / 180 + i) * 8); x.stroke(); }
  const t = tex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3);
  const bord = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), mat(t)); bord.rotation.x = -Math.PI / 2; bord.receiveShadow = true; scen.add(bord);
  for (const [farg, x, z, v] of kritor) {
    const g = new THREE.Group(), r = 0.032;
    const kropp = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.34, 24), mat(null, { color: farg }));
    const papper = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.002, r + 0.002, 0.22, 24), mat(null, { color: new THREE.Color(farg).lerp(new THREE.Color('#fff'), 0.45) }));
    const spets = new THREE.Mesh(new THREE.ConeGeometry(r, 0.06, 24), mat(null, { color: farg })); spets.position.y = 0.2;
    g.add(kropp, papper, spets); g.children.forEach(skugga);
    g.rotation.set(0, v, Math.PI / 2); g.position.set(x, r, z); scen.add(g);
  }
}

// ---- mått (1 enhet ≈ 10 cm) ----
export const SIDA = 0.075;                    // sidornas ovansida, där uppslaget ligger
export const PARM_H = 0.12; export let PARM_Z = -0.835;   // PARM_Z följer bokens storlek (skapaBok storlek)  // gångjärnets höjd (över de nedfällda korten) och bakkant
let BR = 2.46, DJ = 1.67; const T = 0.03, FAS = 0.003, HORN = 0.035;   // pärmen sticker ut ca 3 mm förbi sidorna (2,40 × 1,62)
const KRAM = '#F6EAD0', PAPPER = '#FBF6EA';

function rundRekt(w, d, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + d - r);
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d); s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}
// en hård pärm med rundade hörn och svag fas; ovan- och undersidan får egna bilder (ut = uppåt, inne = nedåt)
function skiva(farg, ut, inne) {
  const w = BR - 2 * FAS, d = DJ - 2 * FAS, form = rundRekt(w, d, HORN), g = new THREE.Group();
  const kropp = new THREE.ExtrudeGeometry(form, { depth: T - 2 * FAS, bevelEnabled: true, bevelThickness: FAS, bevelSize: FAS, bevelSegments: 2, curveSegments: 6 });
  kropp.rotateX(-Math.PI / 2); kropp.translate(0, FAS, 0);
  g.add(skugga(new THREE.Mesh(kropp, mat(null, { color: farg }))));
  for (const [bild, upp] of [[ut, true], [inne, false]]) {
    if (!bild) continue;
    const yta = new THREE.ShapeGeometry(form, 6), uv = yta.attributes.uv, p = yta.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / d + 0.5);
    yta.rotateX(upp ? -Math.PI / 2 : Math.PI / 2); yta.translate(0, upp ? T + 0.0004 : -0.0004, 0);
    const m = new THREE.Mesh(yta, mat(tex(bild))); m.receiveShadow = true; g.add(m);
  }
  return g;
}

// präglad form: mörk kant upptill och ljus kant nedtill inuti formen, som om den är intryckt i pärmen
function pragla(x, mask, d, mork = 'rgba(70,35,15,0.42)', ljus = 'rgba(255,250,235,0.6)') {
  for (const [dy, farg] of [[d, mork], [-d, ljus]]) {
    const k = duk(mask.width, mask.height), kx = k.getContext('2d');
    kx.drawImage(mask, 0, 0); kx.globalCompositeOperation = 'source-in'; kx.fillStyle = farg; kx.fillRect(0, 0, k.width, k.height);
    kx.globalCompositeOperation = 'destination-out'; kx.drawImage(mask, 0, dy);
    x.save(); x.filter = `blur(${Math.max(1, d / 3)}px)`; x.drawImage(k, 0, 0); x.restore();
  }
}
// en mjuk kritlinje: tre tunna drag ovanpå varandra, lite ostadiga
function kritLinje(x, pts, farg, bredd, stang = false) {
  x.lineCap = x.lineJoin = 'round'; x.strokeStyle = farg;
  for (let n = 0; n < 3; n++) {
    x.globalAlpha = 0.45 + 0.15 * n; x.lineWidth = bredd * (0.6 + 0.2 * n); x.beginPath();
    pts.forEach(([a, b], i) => { const j = () => (slump() - 0.5) * bredd * 0.3; i ? x.lineTo(a + j(), b + j()) : x.moveTo(a + j(), b + j()); });
    if (stang) x.closePath(); x.stroke();
  }
  x.globalAlpha = 1;
}
const varv = (n, f) => Array.from({ length: n + 1 }, (_, i) => f(i / n * Math.PI * 2));
function doodles(x, cx, cy, s, farg) {
  const b = s * 0.16;
  kritLinje(x, varv(28, v => [cx - 2.6 * s + Math.cos(v) * s * 0.42, cy + Math.sin(v) * s * 0.42]), farg, b, true);   // sol
  for (let i = 0; i < 8; i++) { const v = i / 8 * Math.PI * 2, c = Math.cos(v), n = Math.sin(v);
    kritLinje(x, [[cx - 2.6 * s + c * s * 0.66, cy + n * s * 0.66], [cx - 2.6 * s + c * s * 0.92, cy + n * s * 0.92]], farg, b); }
  kritLinje(x, varv(40, v => [cx + 16 * Math.sin(v) ** 3 * s / 17, cy - (13 * Math.cos(v) - 5 * Math.cos(2 * v) - 2 * Math.cos(3 * v) - Math.cos(4 * v)) * s / 17]), farg, b, true);   // hjärta
  kritLinje(x, Array.from({ length: 10 }, (_, i) => { const v = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? s * 0.38 : s * 0.9; return [cx + 2.6 * s + Math.cos(v) * r, cy + 0.08 * s + Math.sin(v) * r]; }), farg, b, true);   // stjärna
}

// tygets väv: tunna ljusa och mörka trådar, syns bara nära
function vav(x, w, h, a) {
  x.fillStyle = `rgba(40,20,5,${a})`; for (let y = 0; y < h; y += 4) x.fillRect(0, y, w, 1);
  x.fillStyle = `rgba(255,250,240,${a})`; for (let u = 0; u < w; u += 4) x.fillRect(u, 0, 1, h);
}
const fyll = (mask, bild) => { const c = duk(mask.width, mask.height), x = c.getContext('2d'); x.drawImage(mask, 0, 0); x.globalCompositeOperation = 'source-in'; x.drawImage(bild, 0, 0); return c; };
const rundRam = (x0, y0, x1, y1, rr) => [[x1 - rr, y1 - rr, 0], [x0 + rr, y1 - rr, 0.5], [x0 + rr, y0 + rr, 1], [x1 - rr, y0 + rr, 1.5]]
  .flatMap(([hx, hy, v0]) => Array.from({ length: 9 }, (_, i) => { const v = (v0 + i / 16) * Math.PI; return [hx + Math.cos(v) * rr, hy + Math.sin(v) * rr]; }));

// omslagets utsida ("Medaljong", Sannas val 27/11): tyg i pärmens färg, tygryggen vid gångjärnet (bildens överkant) med sydda stygn,
// en dubbel kritram, medaljongen med en krans av prickar och figuren, och tre doodles.
function omslag(o, fig) {
  const W = 2048, H = Math.round(W * DJ / BR), c = kritDuk(W, H, o.farg, 0.3), x = c.getContext('2d');
  const BAND = Math.round(H * 0.095);
  vav(x, W, H, 0.05);
  const glans = x.createRadialGradient(W * 0.42, H * 0.36, 0, W * 0.5, H * 0.5, W * 0.62);   // mjukt ljus mitt på, mörkare ut mot kanterna
  glans.addColorStop(0, 'rgba(255,245,225,0.13)'); glans.addColorStop(0.55, 'rgba(255,245,225,0)'); glans.addColorStop(1, 'rgba(50,20,5,0.13)');
  x.fillStyle = glans; x.fillRect(0, 0, W, H);
  // tygryggen
  const band = kritDuk(W, BAND, o.rygg, 0.6); vav(band.getContext('2d'), W, BAND, 0.09); x.drawImage(band, 0, 0);
  x.fillStyle = 'rgba(40,15,5,0.26)'; x.fillRect(0, BAND, W, 6); x.fillStyle = 'rgba(255,245,230,0.14)'; x.fillRect(0, BAND + 6, W, 3);   // där tyget slutar
  x.fillStyle = 'rgba(40,15,5,0.16)'; x.fillRect(0, BAND + 46, W, 7); x.fillStyle = 'rgba(255,245,230,0.16)'; x.fillRect(0, BAND + 53, W, 5);   // fogen där pärmen viks
  for (let u = 70; u < W - 90; u += 46) kritLinje(x, [[u, BAND - 20], [u + 26, BAND - 20]], KRAM, 6);   // stygnen
  // den dubbla ramen
  if (o.ram) {
    kritLinje(x, rundRam(58, BAND + 92, W - 58, H - 54, 50), KRAM, 10, true);
    kritLinje(x, rundRam(84, BAND + 118, W - 84, H - 80, 30), KRAM, 4.5, true);
  }
  // medaljongen: krämpapper i en lite ojämn, handritad cirkel, intryckt i tyget, med en krans av prickar runt
  const cx = W / 2, cy = BAND + (H - BAND) * (o.doodles ? 0.455 : 0.52), r = (H - BAND) * 0.285;
  const rund = varv(140, v => { const rr = r * (1 + 0.007 * Math.sin(3 * v + 1) + 0.005 * Math.sin(5 * v + 2)); return [cx + Math.cos(v) * rr, cy + Math.sin(v) * rr]; });
  const mask = duk(W, H), mx = mask.getContext('2d'); mx.beginPath(); rund.forEach(([a, b], i) => i ? mx.lineTo(a, b) : mx.moveTo(a, b)); mx.fill();
  x.fillStyle = 'rgba(50,20,5,0.10)'; x.beginPath(); x.arc(cx, cy + 6, r + 9, 0, Math.PI * 2); x.fill();   // tyget sjunker lite mot medaljongen
  x.drawImage(fyll(mask, kritDuk(W, H, KRAM, 0.25)), 0, 0);
  const djup = x.createRadialGradient(cx, cy, r * 0.55, cx, cy, r); djup.addColorStop(0, 'rgba(120,80,30,0)'); djup.addColorStop(1, 'rgba(120,80,30,0.10)');
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip(); x.fillStyle = djup; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore();
  pragla(x, mask, 11);
  kritLinje(x, rund, ton(KRAM, -0.13, -0.1), 9, true);
  x.fillStyle = KRAM; for (let i = 0; i < 40; i++) { const v = i / 40 * Math.PI * 2, rr = r + 36 + (slump() - 0.5) * 3;
    x.globalAlpha = 0.8 + slump() * 0.2; x.beginPath(); x.arc(cx + Math.cos(v) * rr, cy + Math.sin(v) * rr, 6.5 + slump() * 1.5, 0, Math.PI * 2); x.fill(); }
  x.globalAlpha = 1;
  // figuren, lika stor i varje bok: ryms i 1,32 r
  const sk = 1.32 * r / Math.max(fig.width, fig.height), fw = fig.width * sk, fh = fig.height * sk, fx = cx - fw / 2, fy = cy - fh / 2 + r * 0.02;
  if (o.fargbild) {   // klistermärke: v2-urklippen har redan sin vita kant, här läggs bara ca 1 % till, och en mjuk skugga
    const kant = Math.round(fh * 0.012), m = duk(Math.ceil(fw + 2 * kant), Math.ceil(fh + 2 * kant)), kx = m.getContext('2d');
    for (let i = 0; i < 24; i++) kx.drawImage(fig, kant + Math.cos(i / 24 * Math.PI * 2) * kant, kant + Math.sin(i / 24 * Math.PI * 2) * kant, fw, fh);
    kx.globalCompositeOperation = 'source-in'; kx.fillStyle = '#FFFDF8'; kx.fillRect(0, 0, m.width, m.height);
    kx.globalCompositeOperation = 'source-over'; kx.drawImage(fig, kant, kant, fw, fh);
    const sk2 = duk(m.width, m.height), s2 = sk2.getContext('2d'); s2.drawImage(m, 0, 0);
    s2.globalCompositeOperation = 'source-in'; s2.fillStyle = 'rgba(60,30,10,0.28)'; s2.fillRect(0, 0, m.width, m.height);
    x.save(); x.filter = 'blur(7px)'; x.drawImage(sk2, fx - kant, fy - kant + 8); x.restore();
    x.drawImage(m, fx - kant, fy - kant);
  } else {            // siluett ur urklippets alfa, i pärmens mörka ton, präglad
    const sil = duk(W, H), sx = sil.getContext('2d'); sx.drawImage(fig, fx, fy, fw, fh);
    x.drawImage(fyll(sil, kritDuk(W, H, o.siluett, 0.5)), 0, 0); pragla(x, sil, 6);
  }
  if (o.doodles) {   // sol, hjärta och stjärna mellan två korta streck
    const dy = (cy + r + 36 + H - 80) / 2 + 2, s = (H - BAND) * 0.05;
    doodles(x, cx, dy, s, KRAM);
    for (const k of [-1, 1]) kritLinje(x, [[cx + k * 4.4 * s, dy], [cx + k * 6.6 * s, dy]], KRAM, s * 0.16);
  }
  return c;
}
// pärmens insida: krämpapper (försättsblad) med en smal kant av tyget som viks in runt om
function insidan(o) {
  const W = 1024, H = Math.round(W * DJ / BR), m = Math.round(W * 0.02), c = kritDuk(W, H, o.farg, 0.4), x = c.getContext('2d');
  x.drawImage(kritDuk(W - 2 * m, H - 2 * m, PAPPER, 0.3), m, m);
  x.strokeStyle = 'rgba(80,50,20,0.12)'; x.lineWidth = 3; x.strokeRect(m + 1.5, m + 1.5, W - 2 * m - 3, H - 2 * m - 3);
  return c;
}
// bladbuntens kanter: krämvitt med tunna sidlinjer
function sidkanter() {
  const c = duk(128, 128), x = c.getContext('2d'); x.fillStyle = '#F7F0E2'; x.fillRect(0, 0, 128, 128);
  for (let y = 1; y < 128; y += 3 + Math.round(slump())) { x.strokeStyle = `rgba(150,125,90,${0.18 + slump() * 0.2})`; x.lineWidth = 0.8; x.beginPath(); x.moveTo(0, y); x.lineTo(128, y); x.stroke(); }
  return c;
}

// Lilla Kritans symbol (som kanalens avatar): en röd krita utan ansikte, snett uppåt, med en krumelurslinga under.
// Pappersomslagets ränder är smala glipor, så att de syns också i siluetten.
function kritSymbol(slinga = true) {
  const S = 900, c = duk(S, S), x = c.getContext('2d'), L = 560, B = 150;
  x.save(); x.translate(S / 2, S * 0.4); x.rotate(-0.5);
  x.beginPath(); x.roundRect(-L / 2, -B / 2, L * 0.8, B, 26); x.moveTo(L * 0.3 - 4, -B / 2);   // kroppen och spetsen
  x.lineTo(L * 0.42, -B * 0.36); x.quadraticCurveTo(L / 2 + 6, -B * 0.2, L / 2 + 8, 0); x.quadraticCurveTo(L / 2 + 6, B * 0.2, L * 0.42, B * 0.36); x.lineTo(L * 0.3 - 4, B / 2); x.closePath();
  x.fillStyle = '#D9412E'; x.fill();
  x.fillStyle = '#F7E9BC'; x.fillRect(-L * 0.22, -B / 2, L * 0.4, B);   // pappersomslaget
  x.globalCompositeOperation = 'destination-out';
  for (const u of [-L * 0.22, -L * 0.16, L * 0.12, L * 0.18]) x.fillRect(u - 5, -B / 2 - 2, 10, B + 4);
  x.restore(); x.globalCompositeOperation = 'source-over';
  if (!slinga) return c;
  const yb = S * 0.8, pts = [];   // slingan: fyra öglor i rad
  for (let i = 0; i <= 160; i++) { const v = i / 160 * 4 * Math.PI * 2; pts.push([S * 0.2 + i / 160 * S * 0.6 - Math.sin(v) * 40, yb + Math.cos(v) * -38]); }
  kritLinje(x, pts, '#D9412E', 26);
  return c;
}

const slaUpp = k => (k = kl(0, 1, k), k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2);
export async function skapaBok(scen, { farg = '#E8683A', figur = 'kritan', doodles: med = true, ram = true, fargbild = false, oppna = [0.5, 1.4], vinkel = 0.53 * Math.PI, storlek = 1 } = {}) {
  // storlek: hela boken (pärmarna, bladbunten, ryggen) större, så att uppslaget får plats med mer runt sig (062 runda 5: 1,3)
  BR = 2.46 * storlek; DJ = 1.67 * storlek; PARM_Z = -0.835 * storlek;
  const bild = figur === 'kritan' ? kritSymbol() : typeof figur === 'string' ? (await new THREE.TextureLoader().loadAsync(figur)).image : figur;
  const o = { farg, doodles: med, ram, fargbild, rygg: ton(farg, -0.13, -0.05), siluett: ton(farg, -0.17) };
  const bok = new THREE.Group(); scen.add(bok);
  // bakpärmen (samma färg) och bladbunten
  const bak = skiva(farg); bok.add(bak);
  const kant = mat(tex(sidkanter())), yta = mat(tex(kritDuk(512, 512, PAPPER, 0.3)));
  for (const s of [-1, 1]) {
    const blad = skugga(new THREE.Mesh(new THREE.BoxGeometry(1.2 * storlek, 0.045, 1.62 * storlek), [kant, kant, yta, kant, kant, kant]));
    blad.position.set(s * 0.602 * storlek, T + 0.0225, 0); bok.add(blad);
  }
  // tygryggen: en rundad rygg i pärmens mörka ton, från bakpärmens undersida till framärmens ovansida
  const HY = PARM_H + T, rygg = new THREE.Shape(); rygg.moveTo(0, 0); rygg.absellipse(0, HY / 2, 0.05, HY / 2, -Math.PI / 2, Math.PI / 2, false); rygg.lineTo(0, 0);
  const rg = new THREE.ExtrudeGeometry(rygg, { depth: BR - 2 * HORN, bevelEnabled: false, curveSegments: 16 });
  rg.rotateY(Math.PI / 2); rg.translate(-(BR - 2 * HORN) / 2, 0, PARM_Z);
  const ryggen = skugga(new THREE.Mesh(rg, mat(tex(kritDuk(64, 64, o.rygg, 0.5))))); bok.add(ryggen);
  // framärmen med gångjärn i bakkanten
  const parmen = new THREE.Group(); parmen.position.set(0, PARM_H, PARM_Z); bok.add(parmen);
  const fram = skiva(farg, omslag(o, trim(bild)), insidan(o)); fram.position.z = DJ / 2; parmen.add(fram);
  const insida = new THREE.Group(); insida.position.y = -0.0006; parmen.add(insida);
  const satt = t => { parmen.rotation.x = -vinkel * slaUpp((t - oppna[0]) / (oppna[1] - oppna[0])); };
  satt(0);
  return { bok, parmen, insida, ryggen, satt };
}
