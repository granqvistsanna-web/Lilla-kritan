// 063 halsduken i kod (Sanna 2026-11-27 "code scarf", färg B "green-yellow"): 038:s halsduk-bok.png ger formen, den vita kanten
// och kritans skuggning, så halsduk-kontur.json och detaljstrecken gäller. Ränderna fylls med kritYta: mossgrönt och ljust senapsgult.
//   const c = await halsduk();   // canvas 1024×1024, samma ruta som halsduk-bok.png
import { duk, kritYta } from '/produktion/three-rum/popupbok/bok-parm.js';

// [rand A (038:s röda ränder), rand B (de vita ränderna och tofsarna)]: [färg, ljus, mörk]
export const FARGER = {
  b: [['#5E8C3A', '#7DA852', '#46702A'], ['#F7D466', '#FBE290', '#E2B13E']],   // vald: mossgrön och ljust senapsgul
  a: [['#E9772E', '#F59A4E', '#C85A1C'], ['#F7D466', '#FBE290', '#E2B13E']],   // orange och senapsgul (valdes inte)
  c: [['#8A5A34', '#A8774C', '#6C4224'], ['#F0A43A', '#F7C068', '#D2852A']],   // brun och ljusorange (valdes inte)
};

const RADIE = 6;   // px: skuggningen mjukas ut, så att 038:s fläckiga skugga vid vecket inte blir mörka prickar
let form;
async function las() {
  const bild = await new Promise((r, f) => { const i = new Image(); i.onload = () => r(i); i.onerror = f; i.src = '/assets/rekvisita/halsduk/cut/halsduk-bok.png'; });
  const W = bild.width, H = bild.height, x = duk(W, H).getContext('2d'); x.drawImage(bild, 0, 0); const O = x.getImageData(0, 0, W, H).data;
  // varje pixel: 0 tom, 1 vit kant, 2 rand A, 3 rand B; L = ljusheten
  const klass = new Uint8Array(W * H), L = new Float32Array(W * H), rod = new Float32Array(W * H);   // rod: 0 rand B … 1 rand A, mjuk i kanten
  for (let i = 0; i < W * H; i++) {
    const r = O[i * 4], g = O[i * 4 + 1], b = O[i * 4 + 2];
    klass[i] = O[i * 4 + 3] < 20 ? 0 : (r > 248 && g > 248 && b > 248) ? 1 : (r - b > 50) ? 2 : 3;
    L[i] = r * 0.3 + g * 0.59 + b * 0.11; rod[i] = Math.min(1, Math.max(0, (r - b - 25) / 70));
  }
  // m = ljusheten mot snittet i samma klass, utjämnad inom klassen (lådfilter två gånger, vågrätt och lodrätt)
  const sum = [0, 0, 0, 0], n = [0, 0, 0, 0];
  for (let i = 0; i < W * H; i++) { sum[klass[i]] += L[i]; n[klass[i]]++; }
  let m = Float32Array.from(L, (l, i) => klass[i] > 1 ? l / (sum[klass[i]] / n[klass[i]]) : 1);
  const lada = (src, dx, dy) => { const ut = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let u = 0; u < W; u++) { const i = y * W + u, k = klass[i]; if (k < 2) { ut[i] = 1; continue; }
      let s = 0, c = 0; for (let d = -RADIE; d <= RADIE; d++) { const uu = u + d * dx, yy = y + d * dy;
        if (uu < 0 || yy < 0 || uu >= W || yy >= H) continue; const j = yy * W + uu; if (klass[j] === k) { s += src[j]; c++; } }
      ut[i] = s / c; }
    return ut; };
  for (let v = 0; v < 2; v++) m = lada(lada(m, 1, 0), 0, 1);
  form = { W, H, O, klass, m, rod };
}

export async function halsduk(val = 'b') {
  if (!form) await las();
  const { W, H, O, klass, m, rod } = form, [A, B] = FARGER[val], c = duk(W, H), x = c.getContext('2d');
  const ya = duk(W, H).getContext('2d'), yb = duk(W, H).getContext('2d');
  kritYta(ya, W, H, ...A, 1.4); kritYta(yb, W, H, ...B, 1.4);
  const DA = ya.getImageData(0, 0, W, H).data, DB = yb.getImageData(0, 0, W, H).data, ut = x.createImageData(W, H), U = ut.data;
  for (let i = 0; i < W * H; i++) {
    const k = klass[i]; if (!k) continue; U[i * 4 + 3] = O[i * 4 + 3];
    if (k === 1) { U[i * 4] = U[i * 4 + 1] = U[i * 4 + 2] = 255; continue; }
    const t = rod[i], f = Math.min(1.08, Math.max(0.78, m[i]));   // t blandar ränderna i kanten; f: kritans mörkare kant och vecket, mjukt
    for (let j = 0; j < 3; j++) U[i * 4 + j] = Math.min(255, (DA[i * 4 + j] * t + DB[i * 4 + j] * (1 - t)) * f);
  }
  x.putImageData(ut, 0, 0); return c;
}

// Halsduken PÅ figuren (Sanna 2026-11-27 "consider code halsduk to make it fit better"): ritas i kod efter figurens egen kontur,
// så att den sluter om den runda kroppen. Ett band i figurens halshöjd som följer kroppens kant (och sticker ut lite förbi den), svänger
// lite nedåt i mitten som en riktig halsduk runt halsen, ränder tvärs över, och en hängande ände med tofsar på sidan mot oss.
// Kanvasen har figurbildens mått, så den läggs rakt ovanpå figurkortet.
//   halsdukPa(bild, { yc: 440, tjock: 62, dip: 16, ande: -0.32 })   yc, tjock, dip i bildens px; ande: änden i delar av halva bredden (− = vänster)
export function halsdukPa(bild, { yc, tjock, dip = 16, ande = -0.32, val = 'b' } = {}) {
  const W = bild.width, H = bild.height, c = duk(W, H), x = c.getContext('2d');
  const a = (() => { const y = duk(W, H).getContext('2d'); y.drawImage(bild, 0, 0); return y.getImageData(0, 0, W, H).data; })();
  // kroppens kanter strax ovanför bandet (där armarna inte sitter), och kroppens mitt
  const y0 = Math.round(yc - tjock * 0.9); let l = Math.round(W / 2), r = l;
  while (l > 0 && a[(y0 * W + l) * 4 + 3] > 128) l--; while (r < W - 1 && a[(y0 * W + r) * 4 + 3] > 128) r++;
  const cx = (l + r) / 2, hw = (r - l) / 2, PAD = 3;   // slutar vid kroppens kant, så att den ser ut att gå runt
  const halv = y => hw + Math.max(0, y - y0) * 0.12 + PAD;   // kroppen blir lite bredare nedåt
  const kurva = (u, sida) => yc + sida * tjock / 2 * (1 - 0.25 * u * u) + dip * (1 - u * u);   // smalare ut mot sidorna, där den går runt
  const band = y => { const N = 40, hu = halv(yc), p = new Path2D();
    for (let i = 0; i <= N; i++) { const u = -1 + 2 * i / N; p.lineTo(cx + u * hu, kurva(u, -1)); }
    for (let i = N; i >= 0; i--) { const u = -1 + 2 * i / N; p.lineTo(cx + u * hu, kurva(u, 1)); }
    p.closePath(); return p; };   // raka ändar vid kroppens kant, rundade av den vita kanten
  const B = band(), ex = cx + ande * hw, ew = hw * 0.3, ey = kurva(ande, 0), el = tjock * 1.9;
  const anden = (() => { const p = new Path2D(); p.roundRect(ex - ew / 2, ey, ew, el, [4, 4, ew * 0.18, ew * 0.18]); return p; })();
  const tofsar = [-0.3, 0, 0.3].map(f => { const p = new Path2D(); p.roundRect(ex + f * ew - ew * 0.09, ey + el - 4, ew * 0.18, tjock * 0.42, ew * 0.09); return p; });
  const [A, Bf] = FARGER[val], kA = duk(W, H), kB = duk(W, H);
  kritYta(kA.getContext('2d'), W, H, ...A, 1.4); kritYta(kB.getContext('2d'), W, H, ...Bf, 1.4);
  // skuggan under halsduken på kroppen, bara inne i figuren
  { const s = duk(W, H), y = s.getContext('2d'); y.filter = 'blur(6px)'; y.fillStyle = 'rgba(70,30,10,0.32)';
    y.translate(0, tjock * 0.18); y.fill(B); y.fill(anden); y.setTransform(1, 0, 0, 1, 0, 0);
    y.globalCompositeOperation = 'destination-in'; y.filter = 'none'; y.drawImage(bild, 0, 0); x.drawImage(s, 0, 0); }
  // vit kant runt det som sticker ut (3 px + 1 % av halsdukens höjd, i figurens px)
  const KANT = 3 + 0.01 * (el + tjock);
  x.save(); x.fillStyle = x.strokeStyle = '#FFF'; x.lineJoin = 'round'; x.lineWidth = KANT * 2;
  for (const p of [B, anden, ...tofsar]) { x.fill(p); x.stroke(p); } x.restore();
  // fyllningen: gula grunden, gröna ränder tvärs över bandet och längs änden
  const lager = (p, f) => { const m = duk(W, H), y = m.getContext('2d'); y.drawImage(kB, 0, 0);
    y.globalCompositeOperation = 'source-over'; y.save(); y.clip(p); f(y); y.restore();
    y.globalCompositeOperation = 'destination-in'; y.fill(p); x.drawImage(m, 0, 0); };
  const gron = y => { y.save(); y.globalCompositeOperation = 'source-atop'; y.drawImage(kA, 0, 0); y.restore(); };
  const RAND = hw * 0.2;
  lager(B, y => { for (let s = cx - halv(yc) - tjock; s < cx + halv(yc) + tjock; s += RAND * 2) {
    const p = new Path2D(); p.rect(s, 0, RAND, H); y.save(); y.clip(p); gron(y); y.restore(); } });
  for (const t of tofsar) lager(t, () => {});
  lager(anden, y => { for (let s = ey + el * 0.12; s < ey + el; s += el * 0.36) { const p = new Path2D(); p.rect(0, s, W, el * 0.18); y.save(); y.clip(p); gron(y); y.restore(); } });
  // lite skugga i bandets nederkant och där änden går in under bandet
  x.save(); x.clip(B); x.strokeStyle = 'rgba(40,40,10,0.18)'; x.lineWidth = tjock * 0.22; x.filter = 'blur(4px)';
  const kant = new Path2D(); for (let i = 0; i <= 40; i++) { const u = -1 + i / 20; kant.lineTo(cx + u * halv(yc), kurva(u, 1)); } x.stroke(kant); x.restore();
  x.save(); x.clip(anden); x.fillStyle = 'rgba(40,40,10,0.2)'; x.filter = 'blur(5px)'; x.fillRect(ex - ew, ey, ew * 2, tjock * 0.5); x.restore();
  return c;
}
