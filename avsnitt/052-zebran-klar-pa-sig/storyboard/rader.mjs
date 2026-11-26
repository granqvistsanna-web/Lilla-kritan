// Raderna för 052 Zebran klär på sig: ett uppslag per rad (manus.md). Scenen läser rader.json, som den här filen skriver:
//   node avsnitt/052-zebran-klar-pa-sig/storyboard/rader.mjs     -> ../scener/sovrummet/rader.json
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden]]. Längderna mäts med ffprobe på assets/ljud/roster/zebran-klar-pa-sig/<namn>.m4a. Tills rösten är inspelad
// (grind 3) uppskattas de ur texten (UPPSKATTAD), så en ny tagning räknar om tiderna av sig själv.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HAR = new URL('./', import.meta.url).pathname, ROSTER = new URL('../../../assets/ljud/roster/zebran-klar-pa-sig/', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+)$/).slice(1));
// ponytail: uppskattning ca 14 tecken/s + 0,4 s per "…", byts mot ffprobe så fort filen finns
const gissa = text => +(0.35 + text.length / 14 + 0.4 * (text.match(/…/g) || []).length).toFixed(2);
const UPPSKATTAD = [];
const langd = (namn, text) => existsSync(ROSTER + namn + '.m4a')
  ? +(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ROSTER + namn + '.m4a'])).toFixed(2)
  : (UPPSKATTAD.push(namn), gissa(text));
export const ROST = rader.map(([namn, text]) => [namn, text, langd(namn, text)]);
const L = n => ROST[n - 1][2];
const PA_MATT = { 11: 1.99, 30: 1.86, 33: 1.97, 39: 1.97, 49: 1.55, 52: 1.43 };   // 49, 52: tagning 4 (2026-11-26)
// nya repliker (49, 52) innan de mätts: uppskattat ur texten fram till "…"
const PA = n => PA_MATT[n] ?? +(0.35 + ROST[n - 1][1].split('…')[0].length / 14 + 0.4).toFixed(2);   // "på foten / på huvudet / runt halsen" börjar här i tagning 2 (tystnaden efter "…" slutar, mätt 2026-11-25)

// Zebrans röst: gnagg-mjuk (027, Sannas mjukare tagningar), hej/hej då på svenska ur gnagg-gullig, nej ur gnagg-nej.
const Z = (k, b = '') => `gnagg-mjuk/gnagg-mjuk-${k}${b ? '-' + b : ''}`;
const HEJ = 'gnagg-gullig/gnagg-gullig-1c', HEJDA = 'gnagg-gullig/gnagg-gullig-8c', NEJ = 'gnagg-nej/gnagg-nej-3';
const SVAR = 1.0;   // pausen där zebran svarar innan Malin reagerar
export const VANTA = 4.0, HJALP = 5.0, TACK = 2.5;   // gisspausen i ritintrot, frågan till barnet, "Ska vi säga tack?"

export const RADER = [
  // --- Kritan ritar halsduken på papperet ---
  { id: '01a', d: 3.6, malin: [[1, 0.5]], ljud: [['krita-ritar/krita-ritar-1', 0.3]], bild: 'kritan ritar halsdukens kontur, maskorna och tofsarna' },
  { id: '01b', d: 1.0 + L(2) + VANTA, malin: [[2, 1.0]], bild: 'konturen står, kritan svajar: barnet gissar' },
  { id: '01c', d: 0.9 + L(3) + 1.0, malin: [[3, 0.9]], ljud: [['glitter/glitter-1', 0.1]], bild: 'den riktiga halsduken fylls i, zoom in' },

  // --- Sovrummet: hej, snön ---
  { id: '1', d: 2.6 + L(4) + 1.0, malin: [[4, 2.6]], ljud: [['trav/trav-1', 0.2], [HEJ, 2.8 + L(4)]], bild: 'helbild, zebran trippar in och vinkar' },
  { id: '1b', d: 0.3 + L(5) + SVAR + L(6) + 0.6, malin: [[5, 0.3], [6, 0.3 + L(5) + SVAR]], ljud: [['gnagg-gullig/gnagg-gullig-7', 0.4 + L(5)]], bild: 'halvnära, nickar i pausen' },
  { id: '2', d: 0.6 + L(7) + 0.3 + SVAR + L(8) + 0.6, malin: [[7, 0.6], [8, 0.6 + L(7) + 0.3 + SVAR]], ljud: [['glimt/glimt-1', 0.3], [Z('fortjust'), 0.8 + L(7) + 0.3]], bild: 'närbild fönstret med snön, klipp till zebran' },
  { id: '3', d: 0.3 + L(9) + 0.9, malin: [[9, 0.3]], ljud: [[Z('fniss'), 0.3 + L(9) - 0.6]], bild: 'halvnära, nickar, glatt skutt på "Ja, vad kul!"' },
  { id: '4', d: 0.4 + L(10) + 0.6, malin: [[10, 0.4]], ljud: [[Z('nyfiken'), 2.4], ['gnagg-gullig/gnagg-gullig-7b', 0.4 + 7.3]], bild: 'helbild → närbild kroken → den blå strumpan' },   // replik 10 har 2 s paus efter "… först?" (7,0 s in i filen): zebran svarar där

  // --- Strumpan, och den andra är borta ---
  { id: '5', d: 1.2 + L(11) + 2.0, malin: [[11, 1.2]], ljud: [['strumpa/strumpa-1', 1.2 + PA(11) - 0.3], ['tindra/tindra-3', 1.2 + PA(11) + 0.1], [Z('fortjust', 'b'), 1.4 + L(11)]], bild: 'närbild benen, strumpan glider på' },
  { id: '6', d: 1.3 + L(12) + 1.2, malin: [[12, 1.3]], ljud: [['pling/pling-1', 1.0], [Z('nyfiken', 'b'), 1.5 + L(12)]], bild: 'lyfter andra benet: ingen strumpa, förvånad' },
  { id: '7', d: 0.3 + L(13) + 1.2 + L(14) + 0.8, malin: [[13, 0.3], [14, 0.3 + L(13) + 1.2]], ljud: [[NEJ, 0.5 + L(13) + 1.2 + L(14)]], bild: 'närbild under pallen: bara golv' },
  { id: '8', d: 0.3 + L(15) + 1.2 + L(16) + 0.8, malin: [[15, 0.3], [16, 0.3 + L(15) + 1.2]], ljud: [[Z('nej'), 0.5 + L(15) + 1.2 + L(16)]], bild: 'närbild i korgen: tom' },
  { id: '9', d: 1.6 + L(17) + SVAR + L(18) + 0.8, malin: [[17, 1.6], [18, 1.6 + L(17) + SVAR]], ljud: [[Z('trumpen'), 1.7 + L(17)]], bild: 'närbild, öronen faller, lite ledsen' },

  // --- Barnet hittar strumpan direkt (Sanna 2026-11-25: "put on sock first and find it too not at the end") ---
  { id: '22a', d: 0.3 + L(37) + 2.0, malin: [[37, 0.3]], bild: 'bred bild mot dörren, stövlarna och pallen' },
  { id: '22b', d: 1.6, ljud: [['glimt/glimt-1', 0.2]], bild: 'närbild stöveln, strumpan skimrar direkt (Sanna 2026-11-25: "find sock earlier when they are looking")' },
  { id: '23', d: 0.5 + L(38) + 1.0, malin: [[38, 0.5]], ljud: [['tindra/tindra-4', 0.5], [Z('fortjust'), 0.7 + L(38)]], bild: 'strumpan i stöveln skimrar tydligt, zebran skuttar' },
  { id: '24', d: 1.6 + L(39) + SVAR + 0.7 + L(40) + 0.8, malin: [[39, 1.6], [40, 1.6 + L(39) + SVAR + 0.7]], ljud: [['strumpa/strumpa-2', 1.6 + PA(39) - 0.3], ['tindra/tindra-3', 1.6 + PA(39) + 0.1], [Z('mysig-suck', 'c'), 1.7 + L(39)]],
    bild: 'kudden lutar, strumpan glider fram och på hoven' },

  // --- Kritan ritar mössan, för liten, för stor, lagom ---
  { id: '10', d: 0.3 + L(19) + 0.5, malin: [[19, 0.3]], ljud: [['swoosh/swoosh-1', 0.1]], bild: 'halvnära, kritan flyger in' },
  { id: '11', d: 0.3 + L(20) + 3.0 + 3.0 + L(21) + 0.6, malin: [[20, 0.3], [21, 0.3 + L(20) + 6.0]], ljud: [['krita-ritar/krita-ritar-2', 0.3 + L(20)], ['glitter/glitter-2', 0.3 + L(20) + 6.0], [Z('fortjust'), 0.5 + L(20) + 6.0 + L(21)]],
    bild: 'kritan ritar en mössa i luften, gisspaus, den fylls i pytteliten' },
  { id: '12', d: 1.4 + L(22) + 1.0, malin: [[22, 1.4]], ljud: [['prassel-tyg/prassel-tyg-1', 0.3], ['pop/pop-1', 1.3], [Z('fniss'), 1.6 + L(22)]], bild: 'den lilla mössan sitter på örat' },
  // rad 13: långa fnisset (2,8 s) hörs klart före klippet
  { id: '13', d: 0.3 + L(23) + 2.4 + L(24) + 0.8 + L(25) + SVAR + 1.5, malin: [[23, 0.3], [24, 0.3 + L(23) + 2.4], [25, 0.3 + L(23) + 2.4 + L(24) + 0.8]],
    ljud: [['krita-ritar/krita-ritar-3', 0.3 + L(23)], ['prassel-tyg/prassel-tyg-1', 0.3 + L(23) + 2.0], ['landa-mjuk/landa-mjuk-1', 0.3 + L(23) + 3.1], [Z('langt-fniss'), 0.4 + L(23) + 2.4 + L(24) + 0.8 + L(25)]],
    bild: 'kritan ritar en jättestor, den glider ner över ögonen; "där inne": kanten lyfts' },
  { id: '14', d: 0.3 + L(26) + 3.0 + L(27) + 0.9, malin: [[26, 0.3], [27, 0.3 + L(26) + 3.0]],
    ljud: [['swoosh/swoosh-2', 0.2], ['krita-ritar/krita-ritar-4', 0.3 + L(26)], ['glitter/glitter-3', 0.3 + L(26) + 2.9], [Z('fortjust'), 0.5 + L(26) + 3.0 + L(27)]],
    bild: 'den stora glider av, kritan ritar en tredje, lagom, fylls i' },
  { id: '15', d: 0.3 + L(28) + TACK, malin: [[28, 0.3]], ljud: [[Z('hej', 'b'), 0.5 + L(28)]], bild: 'zebran tittar på mössan, öronen reser sig' },
  { id: '16', d: 0.2 + L(29) + 0.8, malin: [[29, 0.2]], ljud: [[Z('fortjust', 'b'), 0.4 + L(29)]], bild: 'nickar' },
  { id: '17', d: 1.0 + L(30) + SVAR + 0.4 + L(31) + 0.7, malin: [[30, 1.0], [31, 1.0 + L(30) + SVAR + 0.4]], ljud: [['prassel-tyg/prassel-tyg-1', 1.0 + PA(30) - 0.6], ['pop/pop-2', 1.0 + PA(30)], [Z('fniss', 'b'), 1.1 + L(30)]],
    bild: 'mössan glider ner på huvudet, kritan flyger ut' },

  // --- Halsduken ---
  { id: '18', d: 0.8 + L(32) + 0.8, malin: [[32, 0.8]], ljud: [['glimt/glimt-2', 0.4]], bild: 'närbild halsduken på kroken, den glimtar' },
  { id: '19', d: 1.2 + L(33) + 1.4, malin: [[33, 1.2]], ljud: [['prassel-tyg/prassel-tyg-1', 1.2 + PA(33) - 0.8], ['tindra/tindra-4', 1.2 + PA(33) + 0.2], [Z('fortjust'), 1.2 + L(33) + 0.2]], bild: 'halsduken glider från kroken runt halsen, glad närbild' },
  { id: '20', d: 0.5 + L(34) + SVAR + 0.9, malin: [[34, 0.5]],   // "Mm, du tycker om halsduken." (35) borttagen (Sanna 2026-11-26)
    ljud: [[Z('mysig-suck'), 0.6 + L(34)]], bild: 'närbild, gosar in mulen i halsduken' },

  // --- Jackan (grön, ritad i kod som strumporna) och stövlarna (Sanna 2026-11-25: "zebra need shoes and jacket too") ---
  { id: 'J1', d: 0.8 + L(48) + 0.8, malin: [[48, 0.8]], ljud: [['glimt/glimt-1', 0.4]], bild: 'närbild jackan på andra knoppen, den glimtar' },
  { id: 'J2', d: 1.2 + L(49) + 1.6, malin: [[49, 1.2]], ljud: [['prassel-tyg/prassel-tyg-1', 1.2 + PA(49) - 0.8], ['tindra/tindra-4', 1.2 + PA(49) + 0.1], [Z('mysig-suck'), 1.2 + L(49) + 0.3]], bild: 'jackan glider från knoppen in på kroppen, ärmarna kommer, mysig närbild' },
  { id: 'S1', d: 0.3 + L(50) + HJALP, malin: [[50, 0.3]], ljud: [[Z('nyfiken', 'b'), 0.6 + L(50)], ['glimt/glimt-1', 0.3 + L(50) + 1.2]], bild: 'zebran tittar på hovarna, klipp till stövlarna vid dörren som skimrar: barnet svarar' },
  { id: 'S2', d: 0.3 + L(51) + SVAR, malin: [[51, 0.3]], ljud: [[Z('fortjust'), 0.5 + L(51)]], bild: 'halvnära, zebran nickar och skuttar' },
  { id: 'S3', d: 1.4 + L(52) + 1.6, malin: [[52, 1.4]], ljud: [['swoosh/swoosh-1', 1.2], ['landa-mjuk/landa-mjuk-1', 1.4 + PA(52)], ['tindra/tindra-3', 1.4 + PA(52) + 0.15], [Z('fniss'), 1.4 + PA(52) + 1.3]], bild: 'stövlarna hoppar från dörren till hovarna, glad närbild på benen' },

  // --- Färdig, hej då ---
  { id: '25', d: 0.6 + L(53) + 0.3 + L(42) + 1.0, malin: [[53, 0.6], [42, 0.6 + L(53) + 0.3]], ljud: [0.05, 0.25, 0.45, 0.62, 0.9].map((k, i) => [`glimt/glimt-${1 + i % 2}`, 0.6 + L(53) * k]).concat([[Z('fortjust', 'b'), 1.2 + L(53) + 0.3 + L(42)]]),
    bild: 'halvbild, allt på, varje plagg glimtar när det nämns, stolt' },
  { id: '26', d: 0.4 + L(43) + SVAR + L(44) + 1.2, malin: [[43, 0.4], [44, 0.4 + L(43) + SVAR]], ljud: [[Z('hej'), 0.5 + L(43)], [Z('langt-fniss', 'b'), 0.5 + L(43) + SVAR + L(44)]], bild: 'tittar mot snön, nickar' },
  { id: '27', d: 0.6 + L(45) + SVAR + L(46) + 0.6, malin: [[45, 0.6], [46, 0.6 + L(45) + SVAR]], ljud: [[HEJDA, 0.7 + L(45)]], bild: 'vinkar' },
  { id: '28', d: 0.3 + L(47) + 1.6, malin: [[47, 0.3]], ljud: [[Z('hejda'), 0.5 + L(47)]], bild: 'vinkar klart' },
  { id: '29', d: 2.5 + 0.6, bild: 'kritirisen runt zebran' },
];

// Receptets luft: 0,3 s extra (0,7 före Sannas "a bit faster pace" 2026-11-25) på varje rad med en replik (inte under ritintrots kontur och gisspaus).
// Reaktionsslagen (Sanna 2026-11-25, "strong reactions and expressions"): rad 5, 6, 17 och 24 har en närbild på zebrans känsla efter händelsen.
export const GLES = 0.3;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
for (const r of RADER) r.d = +r.d.toFixed(2);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  writeFileSync(HAR + '../scener/sovrummet/rader.json', JSON.stringify({ RADER, ROST: ROST.map(([n, t, l]) => [n, l, t]), PA: Object.fromEntries([11, 30, 33, 39, 49, 52].map(n => [n, +PA(n).toFixed(2)])), UPPSKATTAD }, null, 1));
  const tot = RADER.reduce((a, r) => a + r.d, 0);
  console.log(`${RADER.length} rader, ${tot.toFixed(1)} s (${Math.floor(tot / 60)}:${String(Math.round(tot % 60)).padStart(2, '0')})${UPPSKATTAD.length ? `, ${UPPSKATTAD.length} repliker uppskattade` : ''}`);
}
