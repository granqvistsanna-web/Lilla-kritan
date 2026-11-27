// 064 vinterns kod-snö på korten (Sanna 2026-11-27 "Snö i kod"): granen får en snökudde per våning och en mössa på toppen,
// kullarna blir vita med ljusblå skugga nertill. Allt i kritYta, så det ser ut som resten av boken. Det kala trädet: ../prov/trad/trad.js.
//   granSno(bild, sno)   bild = gran.png (896 × 1200, oförändrad), sno 0–1 (kuddarna växer) -> canvas i bildens mått
//   kulleSno(bild, sno)  bild = kulle-bak.png / kulle-fram.png, sno 0–1 (vitt uppifrån och ner) -> canvas i bildens mått
//   frost(bild)          kullen frostigt grågrön (innan snön)
import { duk, kritYta } from '/produktion/three-rum/popupbok/bok-parm.js';

const SNO = ['#F7F9FC', '#FFFFFF', '#E4ECF6'], SKUGGA = ['#BFD3EA', '#D2E0F0', '#A9C2DE'];
const krita = (w, h, farg) => { const c = duk(w, h); kritYta(c.getContext('2d'), w, h, ...farg, 1.2); return c; };
const lager = (x, yta, rita) => { const m = duk(x.canvas.width, x.canvas.height), y = m.getContext('2d'); rita(y);
  y.globalCompositeOperation = 'source-in'; y.drawImage(yta, 0, 0); x.drawImage(m, 0, 0); };
const skivor = (x, lista, dx = 0, dy = 0, dr = 0) => { for (const s of lista) if (s.r + dr > 0.5) { x.beginPath(); x.arc(s.x + dx, s.y + dy, s.r + dr, 0, Math.PI * 2); x.fill(); } };

// granens våningar, mätta ur gran.png (bredast rad i varje våning): nederkant y, vänster och höger kant
const VANINGAR = [[318, 268, 620], [500, 211, 675], [695, 166, 724], [870, 116, 776]];
export function granSno(bild, sno = 1) {
  const W = bild.width, H = bild.height, c = duk(W, H), x = c.getContext('2d'); x.drawImage(bild, 0, 0);
  if (sno <= 0) return c;
  const K = [];
  VANINGAR.forEach(([yb, xl, xr], v) => { const w = xr - xl, r0 = (20 + v * 3) * sno;
    for (let u = xl + w * 0.06; u <= xr - w * 0.06; u += 13) { const k = (u - xl) / w; K.push({ x: u, y: yb - 12 + 5 * Math.sin(k * 19 + v), r: r0 * (0.85 + 0.15 * Math.sin(k * 31 + v)) }); }
    for (let u = xl + w * 0.22; u <= xr - w * 0.22; u += 14) K.push({ x: u, y: yb - 44 - v * 2, r: (22 + v * 2) * sno });   // lite högre upp mot mitten
  });
  for (const [u, y, r] of [[447, 96, 24], [432, 124, 26], [462, 124, 26]]) K.push({ x: u, y, r: r * sno });   // mössan på toppen
  x.fillStyle = '#FFF'; skivor(x, K, 0, 0, 3 + 0.01 * H);                  // vit kant runt snön
  lager(x, krita(W, H, SKUGGA), y => skivor(y, K, 0, 5 * sno));           // ljusblå undersida
  lager(x, krita(W, H, SNO), y => skivor(y, K, 0, -2 * sno, -3 * sno));   // kritvit snö
  return c;
}

export function frost(bild) {
  const c = duk(bild.width, bild.height), x = c.getContext('2d'); x.drawImage(bild, 0, 0);
  x.globalCompositeOperation = 'saturation'; x.fillStyle = 'hsl(0, 0%, 50%)'; x.globalAlpha = 0.55; x.fillRect(0, 0, c.width, c.height);   // mindre mättat
  x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.22; x.fillStyle = '#DCE6EC'; x.fillRect(0, 0, c.width, c.height);       // kallt och ljust
  return c;
}

export function kulleSno(bild, sno = 1) {
  const W = bild.width, H = bild.height, c = duk(W, H), x = c.getContext('2d'); x.drawImage(frost(bild), 0, 0);
  if (sno <= 0) return c;
  const vit = krita(W, H, SNO), y = vit.getContext('2d'), g = y.createLinearGradient(0, 0, 0, H);   // ljusblått nertill och i dalarna
  g.addColorStop(0, 'rgba(191,211,234,0.25)'); g.addColorStop(0.5, 'rgba(176,200,228,0.45)'); g.addColorStop(1, 'rgba(150,180,215,0.75)');   // tydligt blått, så att kullarna syns mot snöfältet
  y.fillStyle = g; y.fillRect(0, 0, W, H);
  x.save(); x.beginPath(); x.rect(0, 0, W, H * sno); x.clip(); x.globalCompositeOperation = 'source-atop'; x.drawImage(vit, 0, 0); x.restore();
  return c;
}
