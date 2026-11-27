// 064 det kala trädet i kod (Sanna 2026-11-27 "draw in code", i stället för Flow-bilden trad-kalt.png).
// Ett litet barnboksträd: kort stam som vidgar sig vid roten, tre tjocka nästan vågräta grenar (låg vänster, mitten höger,
// hög vänster) med plats för en fågel ovanpå, en kort kvist vid varje spets och en topp som böjer lite åt höger. Formen är runda skivor längs böjda linjer
// (smalare ut mot spetsen), fylld med kritYta i brunt, mörkare kritkant och vit kant, som 062:s kort.
// Snön (sno 0–1) lägger kritvita kuddar med ljusblå undersida ovanpå varje gren och tussar på kvistarna; de växer med sno.
//   const c = kaltTrad({ sno: 0 });     // canvas 800×1000, kortets ruta
//   sittplats(i, sno)                   // {x, y}: där fågel i (0 låg vänster, 1 höger, 2 hög vänster) sitter, ovanpå snön
import { duk, kritYta } from '/produktion/three-rum/popupbok/bok-parm.js';

export const W = 800, H = 1000;
const BRUN = ['#8A5A34', '#A8774C', '#6C4224'], KANT_BRUN = ['#6C4224', '#7E5030', '#55331A'];
const SNO = ['#F7F9FC', '#FFFFFF', '#E4ECF6'], SKUGGA = ['#BFD3EA', '#D2E0F0', '#A9C2DE'];
const VIT = 3 + 0.01 * H;   // vita kanten: 3 px + 1 % av höjden
const MORK = 7;             // den mörkare kritkanten innanför

// linjer: kvadratisk bezier [start, styr, slut] och radie från start till slut
const q = (a, b, c, u) => (1 - u) ** 2 * a + 2 * (1 - u) * u * b + u * u * c;
const STAM = { p: [[400, 985], [388, 640], [402, 300]], r: [74, 30] };
const TOPP = { p: [[402, 310], [404, 250], [428, 196]], r: [30, 13] };   // toppen smalnar av och böjer lite åt höger
const ROTTER = [{ p: [[384, 930], [340, 968], [286, 984]], r: [40, 16] }, { p: [[416, 930], [462, 968], [516, 984]], r: [40, 16] }];
export const GRENAR = [
  { p: [[390, 680], [240, 650], [96, 600]], r: [40, 22] },   // låg, vänster, spetsen böjer lite uppåt
  { p: [[404, 520], [560, 494], [708, 440]], r: [36, 20] },  // mitten, höger
  { p: [[398, 380], [290, 352], [178, 312]], r: [30, 17] },  // hög, vänster
];
const KVISTAR = [   // en kort kvist uppåt nära varje grenspets
  { p: [[148, 620], [140, 576], [118, 548]], r: [15, 10] },
  { p: [[650, 462], [664, 420], [690, 396]], r: [14, 9] },
  { p: [[222, 330], [214, 292], [196, 268]], r: [13, 9] },
];
export const punkt = (l, u) => ({ x: q(l.p[0][0], l.p[1][0], l.p[2][0], u), y: q(l.p[0][1], l.p[1][1], l.p[2][1], u), r: l.r[0] + (l.r[1] - l.r[0]) * u });

// formen som en mask: skivor längs varje linje, d = extra radie (vit kant +, kritkant −)
function form(x, d) {
  for (const l of [STAM, TOPP, ...ROTTER, ...GRENAR, ...KVISTAR]) for (let i = 0; i <= 80; i++) {
    const { x: px, y: py, r } = punkt(l, i / 80); x.beginPath(); x.arc(px, py, Math.max(1, r + d), 0, Math.PI * 2); x.fill();
  }
}
const krita = (farg) => { const c = duk(W, H); kritYta(c.getContext('2d'), W, H, ...farg, 1.4); return c; };
const lager = (x, yta, rita) => { const m = duk(W, H), y = m.getContext('2d'); rita(y); y.globalCompositeOperation = 'source-in'; y.drawImage(yta, 0, 0); x.drawImage(m, 0, 0); };

// snökuddarna: en rad skivor längs grenens ovankant, högst i mitten av grenen, tussar på kvistarna
function kuddar(sno) {
  const ut = [];
  GRENAR.forEach((g, gi) => { for (let i = 0; i <= 40; i++) { const u = 0.12 + 0.84 * i / 40, p = punkt(g, u), puckel = Math.sin(Math.PI * (u - 0.12) / 0.84);
    const h = (10 + 22 * puckel) * (0.85 + 0.15 * Math.sin(u * 37 + gi * 2)) * sno; ut.push({ x: p.x, y: p.y - p.r + h * 0.35, r: h }); } });
  for (const k of [...KVISTAR, TOPP]) { const p = punkt(k, 1); ut.push({ x: p.x, y: p.y - p.r * 0.5, r: 13 * sno }); }
  return ut;
}
const skivor = (x, lista, dx = 0, dy = 0, dr = 0) => { for (const s of lista) if (s.r + dr > 0.5) { x.beginPath(); x.arc(s.x + dx, s.y + dy, s.r + dr, 0, Math.PI * 2); x.fill(); } };

export function kaltTrad({ sno = 0 } = {}) {
  const c = duk(W, H), x = c.getContext('2d'), K = sno > 0 ? kuddar(sno) : [];
  x.fillStyle = '#FFF'; form(x, VIT); skivor(x, K, 0, 0, VIT);                         // vit kant runt trädet och snön
  lager(x, krita(KANT_BRUN), y => form(y, 0));                                           // mörkare kritkant
  lager(x, krita(BRUN), y => { y.filter = 'blur(2px)'; form(y, -MORK); });               // stammen och grenarna
  if (K.length) {
    lager(x, krita(SKUGGA), y => skivor(y, K));                                          // ljusblå undersida
    lager(x, krita(SNO), y => skivor(y, K, 0, -4 * sno, -3 * sno));                      // kritvit snö ovanpå
  }
  return c;
}

// fåglarna sitter på grenens ovankant (eller snöns) vid u = 0,6
export function sittplats(i, sno = 0) {
  const g = GRENAR[i], p = punkt(g, 0.6), puckel = Math.sin(Math.PI * (0.6 - 0.12) / 0.84), h = (10 + 22 * puckel) * sno;
  return { x: p.x, y: p.y - p.r - (sno ? h * 0.65 + 4 : 0) };
}
