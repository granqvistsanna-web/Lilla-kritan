// Mall för Kritans bok: uppslaget, byggt en gång. Storyboarden (scen.js) och scenen (../scener/boken/boken.js) läser samma bok,
// kort, koordinater och vyer här, så att de inte glider isär. Motorn ligger i produktion/three-rum/popupbok/uppslag.js.
// Byt per tema (format/kritans-bok.md): pärmens färg och siluett, markens färg, bilderna, huvudsaken (kritans första teckning),
// hjälpsaken (den andra), sakerna barnet hittar, figurens platser och vyerna.
import { tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { v3, bild, lad, ruta, bredare, mark, kortmotor, PARM } from '/produktion/three-rum/popupbok/uppslag.js';

export const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
export const BOK = 1.3;   // bokens storlek: uppslaget fyller bilden, kanterna syns bara i öppningen och stängningen
export const HUVUDSAK = RQ + 'sol-gul/cut/sol-gul', HJALPSAK = RQ + 'glass-rosa/cut/glass-rosa';   // BYT: urklipp (.png) med kontur (-kontur.json, verktyg/kontur.py)
export const SAKPOS = [-0.42, 0.42], SAKH = 0.24;   // hjälpsaken: där kritan ritar den, och kortets höjd
export const FH = 0.34, PLATS = { mitt: [0.05, 0.22] };   // figuren: höjden i världen (topp till fot) och platserna

export async function byggUppslaget(scen) {
  const [GRAN, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, BLOM1, BLOM2] = await Promise.all([B + 'skogen-gron-saker/gran.png',
    ...['himmel', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten'].map(n => P + n + '.png'),
    RQ + 'blomma-rod/cut/blomma-rod.png', RQ + 'blomma-rosa/cut/blomma-rosa.png'].map(lad));
  const [SOL_I, SAK_I] = await Promise.all([bild(HUVUDSAK + '.png'), bild(HJALPSAK + '.png')]);
  // skrivbordet och boken: pärmens färg, och temats huvudsak som siluett på pärmen
  skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
  const { insida, satt } = await skapaBok(scen, { farg: '#E8683A', figur: SOL_I, doodles: true, oppna: PARM, storlek: BOK });
  // kskugga: kontaktskuggans färg (markens, mörkare). paSkuggsida: molnen och huvudsaken kastar skugga på himlen
  const { kort, platt, pa } = kortmotor(scen, insida, { kskugga: ['28,52,18', 0.42, 0.16], paSkuggsida: true });
  // längst bak: kullarna. På pärmens insida: himlen, molnen och huvudsaken (syns när kritan har ritat den)
  const BAK = [kort(bredare(KULLE_BAK, 5.2 * BOK), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2 * BOK), 1.95 / 6.2, 0.05, -0.47)];
  pa(bredare(HIMMEL, 1.5), 2.03, 0, 0.07 + 2.03 / 2, 0.004, 2.3 * BOK);
  const SOLEN = pa(tex(trim(SOL_I)), 0.5, 0.12, 0.9), SOL_R = ruta(SOL_I);
  const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
  const SKOG = [[-0.98, -0.36, 0.5], [-0.72, -0.4, 0.62], [0.38, -0.38, 0.56], [0.94, -0.4, 0.6], [-1.24, -0.42, 0.56], [1.22, -0.36, 0.52]].map(([x, z, h]) => kort(GRAN, h, x, z));
  platt(tex(mark('#6CC04A', '#8ED46A', '#56A83A')), 2.26 * BOK, 0, 0.0, 1.5 * BOK, SIDA + 0.0004);   // marken: [färg, ljus, mörk]
  // sakerna barnet hittar: synliga hela tiden, utspridda
  const BLOMMOR = [[BLOM1, 0.18, 0.5, 0.47], [BLOM2, 0.17, 0.78, 0.2]].map(([m, h, x, z]) => kort(m, h, x, z));
  // hjälpsaken: kortet ligger platt (bildsidan upp) där kritan ritar det och reser sig sedan
  const SAKKORT = kort(tex(trim(SAK_I)), SAKH, ...SAKPOS, { y: SIDA + 0.003 }), SAK_R = ruta(SAK_I);

  // ---- vyerna: [kamerans plats, målet, fov], g = figurens plats. bord (den stängda boken) och slut finns i modulen ----
  const VY = {
    in: () => [v3(0, 0.7, 1.8), v3(0, 0.34, -0.25), 32],
    himmel: () => { scen.updateMatrixWorld(true); const s = SOLEN.getWorldPosition(v3()); return [v3(s.x - 0.05, s.y - 0.12, s.z + 1.25), s, 30]; },
    halv: g => [g.clone().add(v3(0.06, 0.32, 0.9)), g.clone().add(v3(0, 0.17, 0)), 30],
    sak: () => [v3(SAKPOS[0] + 0.22, 0.6, SAKPOS[1] + 0.85), v3(SAKPOS[0] + 0.2, 0.14, SAKPOS[1] - 0.12), 30],   // teckningen och figuren i samma bild
    uppslag: () => [v3(0.12, 0.84, 1.62), v3(0.12, 0.18, -0.02), 32],
    hejda: g => [g.clone().add(v3(-0.1, 0.36, 0.82)), g.clone().add(v3(0.02, 0.2, -0.2)), 32],
  };
  return { satt, kort, platt, BAK, SOLEN, SOL_R, MOLNEN, SKOG, BLOMMOR, SAKKORT, SAK_R, VY };
}
