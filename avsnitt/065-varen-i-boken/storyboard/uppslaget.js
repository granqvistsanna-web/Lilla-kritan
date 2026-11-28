// 065 Våren i boken: uppslaget, byggt en gång. Storyboarden (scen.js) och scenen (../scener/boken/boken.js) läser samma kort,
// koordinater och vyer här, så att de inte glider isär. Det som bara finns i den ena (musens rigg, insekterna i kod, kritan och
// rörelserna i scenen; det platta muskortet och lägena per rad i storyboarden) ligger kvar där.
import { tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { v3, bild, lad, ruta, bredare, mark, kortmotor, PARM } from '/produktion/three-rum/popupbok/uppslag.js';

export const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
// boken lika stor som 062 runda 5 (1,3), grön pärm med den gula tulpanen i knopp
export const BOK = 1.3;
// rabatten: tre tulpaner i tre lägen på samma fot. Den hängande bilden är bredare med foten vid 0,39–0,40 av bredden (bildlista.md):
// dx flyttar den så att foten hamnar på samma punkt, höjden i samma px-skala som den stående.
export const TH = 0.38, TPOS = { rod: [-0.42, 0.0], gul: [0.0, -0.02], lila: [0.42, 0.06] }, FOTFR = { rod: 0.396, gul: 0.388, lila: 0.404 };
// de små blommorna med djuren, utspridda framför till höger (inte framför musen)
export const ROSA = [0.9, 0.18], GULA = [0.8, 0.5];
// kannan: kritans teckning i gräset till höger om musen, sedan i handen, sedan tillbaka i gräset (rad 20)
export const KANNAPOS = [0.42, 0.42], KH = 0.097;
// lövträdet med fågelboet i grenklykan (BO_OFF: boets plats på trädkortet)
export const TRADET = [-0.68, -0.24], BO_OFF = v3(0.05, 0.4, 0.03), BOPOS = [TRADET[0] + BO_OFF.x, SIDA + BO_OFF.y, TRADET[1] + BO_OFF.z];
// musen: höjden (öronen till fötterna) och platserna, till vänster om blomman den vattnar, kannan i höger hand
export const MH = 0.26, MUSPOS = { start: [0.27, 0.27], rod: [-0.66, 0.22], gul: [-0.22, 0.2], lila: [0.2, 0.26], blommor: [0.56, 0.28] };

export async function byggUppslaget(scen) {
  const [GRAN, BUSKE, TRAD1, APPEL, EK, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, SOL, BO, ROSA_B, GULA_B] = await Promise.all([
    B + 'skogen-gron-saker/gran.png', B + 'skogen-saker/buske.png', B + 'skogen-saker/trad.png', B + 'lekplatsen-saker/appeltrad.png', RQ + 'ek/cut/ek.png',
    ...['himmel', 'kulle-bak', 'kulle-fram', 'moln-stor', 'moln-mellan', 'moln-liten', 'sol', 'fagelbo'].map(n => P + n + '.png'),
    RQ + 'blomma-rosa/cut/blomma-rosa.png', RQ + 'blommor-gula/cut/blomma-gul-1.png'].map(lad));
  const TB = {};   // tulpanerna: knopp, uppe, hanger per färg (den gula utslagna är kritans teckning ur rekvisita)
  await Promise.all(['rod', 'gul', 'lila'].flatMap(f => [['knopp', `${P}tulpan-${f}-knopp.png`], ['uppe', f === 'gul' ? `${RQ}tulpan-gul/cut/tulpan-gul.png` : `${P}tulpan-${f}.png`],
    ['hanger', `${P}tulpan-${f}-hanger.png`]].map(async ([l, src]) => { const i = await bild(src); (TB[f] ??= {})[l] = { i, map: tex(trim(i)) }; })));
  const KANNA_I = await bild(RQ + 'vattenkanna/cut/vattenkanna.png'), KANNA = tex(trim(KANNA_I));
  skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
  const { insida, satt } = await skapaBok(scen, { farg: '#4FA845', figur: TB.gul.knopp.i, doodles: true, oppna: PARM, storlek: BOK });
  // molnen och solen kastar skugga på himlen (paSkuggsida, som 062). dx i kort() flyttar bilden i sidled (den hängande tulpanens fot
  // sitter inte mitt i bilden).
  const { kort, platt, pa } = kortmotor(scen, insida, { kskugga: ['28,52,18', 0.42, 0.16], paSkuggsida: true });
  const BAK = [kort(bredare(KULLE_BAK, 5.2 * BOK), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2 * BOK), 1.95 / 6.2, 0.05, -0.47)];
  pa(bredare(HIMMEL, 1.5), 2.03, 0, 0.07 + 2.03 / 2, 0.004, 2.3 * BOK);
  // solen: liten, högt upp till höger, utan ansikte (huvudsaken är tulpanen)
  const SOLEN = pa(SOL, 0.24, 0.18, 1.15);
  const MOLNEN = [[MOLN1, 0.22, -0.7, 1.0], [MOLN2, 0.16, -0.2, 1.22], [MOLN3, 0.13, 0.3, 1.08]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
  // granarna och två lövträd ut mot kanterna; lövträdet med boet står till vänster (storyboarden)
  const SKOG = [[-1.0, -0.4, 0.5, GRAN], [-1.24, -0.42, 0.56, GRAN], [-1.42, -0.16, 0.44, GRAN], [-0.36, -0.42, 0.44, EK], [0.28, -0.42, 0.5, GRAN],
    [0.56, -0.36, 0.48, APPEL], [0.82, -0.38, 0.56, GRAN], [1.06, -0.42, 0.46, EK], [1.24, -0.36, 0.52, GRAN], [1.42, -0.2, 0.46, GRAN]].map(([x, z, h, m]) => kort(m, h, x, z));
  const LOVTRAD = kort(TRAD1, 0.78, ...TRADET);
  const BUSKE_K = kort(BUSKE, 0.26, 1.06, -0.12);
  // marken: vårgrönt kritark med små vita prickblommor
  platt(tex(mark('#7CCB4E', '#A2DE72', '#5DB040', (x, Wc, D) => {
    x.fillStyle = '#FFFDF4'; for (let i = 0; i < 200; i++) { const px = 60 + ((i * 733) % (Wc - 120)), py = 60 + ((i * 397) % (D - 120)); x.beginPath(); x.arc(px, py, 4 + (i % 3) * 2, 0, 7); x.fill();
      if (i % 4 === 0) { x.fillStyle = '#F6D24A'; x.beginPath(); x.arc(px, py, 2.5, 0, 7); x.fill(); x.fillStyle = '#FFFDF4'; } } })), 2.26 * BOK, 0, 0.0, 1.5 * BOK, SIDA + 0.0004);
  const TULPAN = {};
  for (const f of ['rod', 'gul', 'lila']) {
    const [x, z] = TPOS[f], hb = TB[f].hanger.map, hh = TH * hb.image.height / TB[f].uppe.map.image.height, hw = hh * hb.image.width / hb.image.height;
    const knopp = kort(TB[f].knopp.map, TH, x, z), uppe = kort(TB[f].uppe.map, TH, x, z, { flik: false }), hanger = kort(hb, hh, x, z, { flik: false, dx: (0.5 - FOTFR[f]) * hw });
    TULPAN[f] = { knopp, uppe, hanger, x, z, krona: v3(x + (f === 'gul' ? 0 : 0), SIDA + TH * 0.78, z + 0.01), kronaH: v3(x + 0.33 * hw, SIDA + hh * 0.5, z + 0.01) };
  }
  // den gula ritas av kritan: kortet ligger platt bakåt från foten (bildsidan upp) tills det fälls upp (som 062:s glass)
  const GUL_R = ruta(TB.gul.uppe.i);
  const ROSA_K = kort(ROSA_B, 0.18, ...ROSA), GULA_K = kort(GULA_B, 0.14, ...GULA);
  const KANNA_K = kort(KANNA, KH, ...KANNAPOS);
  const KANNA_R = ruta(KANNA_I);
  // fågelboet: följer lövträdet (scenen och storyboarden lägger det på LOVTRAD.m.localToWorld(BO_OFF))
  const BOET = kort(BO, 0.085, 0, 0, { flik: false });

  // ---- vyerna: [kamerans plats, målet, fov], g = musens plats ----
  const tulpanNara = (f, dx = -0.1) => () => { const [x, z] = TPOS[f]; return [v3(x + dx, 0.4, z + 1.0), v3(x + dx, 0.2, z + 0.08), 30]; };
  const VY = {
    bred: () => [v3(0, 0.7, 1.8), v3(0, 0.3, -0.2), 32],
    rabatt: () => [v3(0.07, 0.42, 1.3), v3(0.06, 0.15, 0.05), 30],   // den lila hela, också när den hänger åt höger
    'rabatt-hej': () => [v3(0.1, 0.42, 1.3), v3(0.1, 0.15, 0.05), 35],   // rad 26b: hela rabatten och musen vid blommorna (före gången)
    'rabatt-hel': () => [v3(0.04, 0.42, 1.38), v3(0.04, 0.2, 0.04), 32],
    'gul-rita': () => [v3(0.02, 0.66, 0.5), v3(0.0, 0.02, -0.19), 30],   // teckningen ligger platt bakåt från foten
    'gul-nara': tulpanNara('gul'), 'rod-nara': tulpanNara('rod'), 'lila-nara': tulpanNara('lila', 0.03),   // musen vid den gula och kannan i handen hamnar utanför, inte halvt i kanten
    halv: g => [g.clone().add(v3(0.12, 0.24, 0.84)), g.clone().add(v3(0.08, 0.14, -0.05)), 30],
    'halv-sol': () => { scen.updateMatrixWorld(true); const s = SOLEN.getWorldPosition(v3()), m = v3(0.1, 0.17, 0.05).lerp(s, 0.5); return [v3(m.x, 0.52, 1.3), m, 30]; },   // solen hel, tulpanerna nedtill, musen utanför (inte halva huvudet)
    nara: g => [g.clone().add(v3(0.05, 0.2, 0.52)), g.clone().add(v3(0.03, 0.15, 0)), 30],   // musen ca 85 % av bildhöjden (062)
    kanna: () => [v3(KANNAPOS[0] - 0.07, 0.33, KANNAPOS[1] + 0.64), v3(KANNAPOS[0] - 0.07, 0.15, KANNAPOS[1] - 0.06), 30],   // lägre och närmare: kannan större, musens öron med
    uppslag: () => [v3(0.55, 0.5, 1.45), v3(0.55, 0.15, 0.25), 32],   // rad 21: lila, musen och båda blommorna med djuren
    fjaril: () => [v3(ROSA[0] - 0.02, 0.3, ROSA[1] + 0.5), v3(ROSA[0] - 0.02, 0.14, ROSA[1]), 26],
    nyckelpiga: () => [v3(GULA[0] - 0.12, 0.26, GULA[1] + 0.36), v3(GULA[0] + 0.01, 0.13, GULA[1]), 20],   // snett från vänster: musen (bakom till vänster) hamnar utanför bild
    insekter: () => [v3(0.86, 0.3, 0.86), v3(0.85, 0.12, 0.32), 30],
    trad: () => [v3(-0.98, 0.5, 0.5), v3(-0.64, 0.42, -0.2), 30],   // snett från vänster: boet större, den röda tulpanen utanför bild
    bo: () => [v3(BOPOS[0] + 0.1, BOPOS[1] + 0.06, BOPOS[2] + 0.55), v3(...BOPOS).add(v3(0, 0.03, 0)), 26],
    'bo-nara': () => [v3(BOPOS[0] + 0.04, BOPOS[1] + 0.06, BOPOS[2] + 0.34), v3(...BOPOS).add(v3(0, 0.04, 0)), 22],
    hejda: g => [g.clone().add(v3(-0.06, 0.28, 0.8)), g.clone().add(v3(-0.02, 0.15, -0.1)), 32],   // närmare, så att vinkningen syns
    slut: () => [v3(0, 2.55, 4.05), v3(0, 0.12, -0.12), 32],   // hela den stängda boken, centrerad (bordets höjd)
  };
  return { insida, satt, kort, platt, pa, TB, KANNA_I, KANNA, BAK, SOLEN, MOLNEN, SKOG, LOVTRAD, BUSKE_K, TULPAN, GUL_R, ROSA_K, GULA_K, KANNA_K, KANNA_R, BOET, VY };
}
