// Mall för Kritans bok, grind 6: hela scenen. Motorn (korten, figuren på sitt kort, kritan på en 3D-yta, kameran, skärpedjupet,
// ljudet) ligger i produktion/three-rum/popupbok/uppslag.js, uppslaget i ../../storyboard/uppslaget.js (samma som storyboarden).
// Här ligger det som är avsnittets eget: tiderna, figurens rörelser per rad, det som händer i bildrutan, vyerna per rad och volymerna.
// Scenens t = 0 är rad 01 (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken --snabb        (eller tider för stillbilder: 3 12 40)
import { SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { $, bump, reser, v3, rader, scenen, kontur, vik, stall, PARM, fallning, figurKort, vink, kritan, ljuset, djupskarpa, kamera,
  starta } from '/produktion/three-rum/popupbok/uppslag.js';
import { HUVUDSAK, HJALPSAK, FH, PLATS, byggUppslaget } from '../../storyboard/uppslaget.js';

const RD = rader(await import('../../storyboard/rader.mjs')), { RAD, S, MAL, SVAR, DURATION, rad, GLES, MATTA, ROSTMAPP } = RD;
const SC = scenen(), { scen, cam } = SC;
const { satt, BAK, SOLEN, SOL_R, MOLNEN, SKOG, BLOMMOR, SAKKORT, SAK_R, VY } = await byggUppslaget(scen);

// ---- figuren: v2-riggen på ett kort (BYT: riggens mapp; TOPP = figurens översta px i riggen, fot = L.FOTTER) ----
// Lägg in avsnittets eget i G (saker i handen, kläder) före figurKort, så att bilderna blir data-url:er och får den vita kanten.
const L = await v2rigg('kaninen-kanel'), FOT = L.FOTTER || 947, TOPP = 31, G = L.figur(512, FOT, 1, $('figurer'));
const FIGKORT = await figurKort(scen, cam, L, G, { fot: FOT, topp: TOPP, hojd: FH }), { m: figur, BL, nick } = FIGKORT;
L.rita(G, L.NEUTRAL, L.POSE0);
ljuset(scen);   // temats ljus: ljuset(scen, { himmel: [himmel, mark, styrka], sol: [färg, styrka] })
const DOF = djupskarpa(SC);

// ---- tiderna ----
const OPPNA = S('02'), STANG = S('10'), FALL = fallning(satt, OPPNA, STANG);
const ORDNING = FALL.upp([...BAK, ...SKOG, ...BLOMMOR]);   // upp bakifrån och fram när pärmen slås upp
FIGKORT.upp = S('05') + 0.2; FIGKORT.z = PLATS.mitt[1];    // figuren upp sist, på pop
FALL.ner([...ORDNING, FIGKORT, SAKKORT]);                  // ner framifrån när boken stängs
const SOL_KLAR = S('04') + 0.6, SAK_KLAR = S('07') + 0.6, SAK_UPP = S('07') + 0.85;   // fyllningarna klara, hjälpsakens kort reser sig
const ORD = [0.3, 1.9].map(s => MAL('08', 10) + s);   // sakernas ord i replik 10 (mät i röstfilen)

// ---- kritan ritar: huvudsaken på pärmens insida, hjälpsaken på sidan ----
const KR = kritan(cam), { glimt } = KR;
{ const a = S('03'), b = S('04'), c = S('06'), d = S('07');
  KR.teckning('huvudsak', HUVUDSAK + '.png', await kontur(HUVUDSAK + '-kontur.json'), SOL_R, SOLEN,
    { in: [a + 0.3, a + 0.7], rit: [a + 0.8, b - 0.9], vanta: [b - 0.8, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, SOL_KLAR], [440, -40]);
  KR.teckning('hjalpsak', HJALPSAK + '.png', await kontur(HJALPSAK + '-kontur.json'), SAK_R, SAKKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, d - 0.9], vanta: [d - 0.8, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, SAK_KLAR], [280, 60]); }

// ---- figurens rörelser per rad ----
const REAKTION = { '05': 'jatteglad', '07': 'kawaii', '08': 'nyfiken' };   // uttrycket i radens slut (reaktionsslaget)
function figuren(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  switch (id) {
    case '05': [f, p] = vink(f, p, t - MAL('05', 5) - 0.3, 2.2); break;
    case '06': f = { ...B('nyfiken'), titt: [-12, 8] }; p.rikt = -0.35; break;   // tittar på kritan som ritar
    case '07': f = { ...f, titt: [-12, 6] }; [f, p] = nick(f, p, t - SVAR('07', 7)); break;
    case '09': [f, p] = vink(B('jatteglad'), p, t - MAL('09', 11), r.d - 0.4, true); break;
  }
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

// ---- en bildruta ----
async function bildruta(t) {
  FALL.parm(t);
  for (const k of ORDNING) stall(k, FALL.e(k, t));
  SOLEN.visible = t >= SOL_KLAR - 0.05;
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // hjälpsaken: ligger platt (bildsidan upp) där kritan ritade den, reser sig med en efterstudsning, fälls ner med de andra
  { const K = SAKKORT; K.m.visible = t >= SAK_KLAR - 0.05; K.flik.visible = t > SAK_UPP + 0.3 && t < K.ner + 0.1;
    if (t < STANG) { K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - SAK_UPP) / 0.45)); K.m.position.y = K.y; } else vik(K, FALL.e(K, t, 1)); }
  // sakerna barnet hittar studsar på sina ord
  BLOMMOR.forEach((k, i) => k.m.scale.setScalar(1 + 0.12 * bump(ORD[i], ORD[i] + 0.6, t, 0.2)));
  // figuren: kortet upp och ner, riggen ritad i #kort och lagd som textur
  figur.position.set(PLATS.mitt[0], FIGKORT.y, PLATS.mitt[1]); vik(FIGKORT, FALL.e(FIGKORT, t)); figur.visible = t >= FIGKORT.upp;
  L.rita(G, ...figuren(t)); await FIGKORT.textur(t);
  DOF.fokus(KAM.aktiv(t));
  scen.updateMatrixWorld(true);
  // kritan och glimtarna i #ov
  let ov = KR.rita(t);
  BLOMMOR.forEach((k, i) => ov += glimt(t, ORD[i], k.m.position.clone().add(v3(0, 0.14, 0.02))));
  $('ov').innerHTML = ov;
  DOF.komp.render();
}

// ---- kameran: radernas vyer (rader.mjs s.vy), glid mellan närliggande vyer, klipp när platsen byts ----
satt(PARM[1]); scen.updateMatrixWorld(true);   // vyerna mäts med pärmen uppe
const KAM = kamera(cam, VY, { blur: n => /nara|sak/.test(n) ? 0.008 : /halv|hejda/.test(n) ? 0.006 : 0.003 }), { vy, glid } = KAM;
const GLID = { '03': [0, 1.4], '09': [0, 1.0] };   // [start in i raden, längd]
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (KAM.VY[namn].length ? r.st.plats : '');
  if (r.id === '01') { KAM.oppning(r.s, S('02') + 0.9, 'in'); forra = 'in'; continue; }   // driver mot den stängda boken, glider in när pärmen slås upp
  if (r.id === '02') continue;
  if (r.id === '10') { KAM.stangning(r.s + 0.1); continue; }
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}

// ---- ljudet: Malin och effekterna ur raderna, kritans ritljud som slinga, mattan lågt under allt ----
const VOL = f => /kanin-/.test(f) ? 2.0 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|landa-mjuk)/.test(f) ? 0.7 : 1.0;
starta(RD, KAM.plan(DURATION), bildruta, { rost: ROSTMAPP, vol: VOL, matta: MATTA, RIT: KR.RIT });
