// Storyboardens rader för 027 Zebran plockar undan: en rad per uppslag i manus.md (01 och 5 är delade, för att bilden byts
// mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), tar stillbilderna ur scenen (../scener/sovrummet), skriver
// tabellen i storyboard.md, index.html och animatiken. Scenen läser samma rader.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]; null som fil = zebrans gnagg-gullig (finns inte än: tystnad tills filen finns).
//
// Malins repliker: filnamn och text ur ../rost.txt. Längden (andra värdet) är null tills tagningen är delad och uppmätt;
// då räknas den som 0,075 s per tecken (UPPSKATTAD). Mät med ffprobe och skriv in sekunderna.
export const TITEL = 'Zebran plockar undan', ROSTMAPP = 'zebran-plockar-undan';
export const ROST = [
  ['01-kritan-ritar', 1.75, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.97, 'Hm … vad blir det nu?'],
  ['03-zebra', 2.27, 'Oj! En zebra!'],
  ['04-hej-zebran-hej', 1.83, 'Hej, zebran! Hej, hej!'],
  ['05-mycket-leksaker', 3.25, 'Oj, oj, oj! Vad mycket leksaker!'],
  ['06-val-plocka-undan', 1.9, 'Nu ska du väl plocka undan?'],
  ['07-zebran-vill-visst', 3.62, 'Oj då. Zebran vill visst inte plocka undan.'],
  ['08-vad-gor', 2.11, 'Hm … vad gör vi nu?'],
  ['09-titta-kritan-ritar', 2.68, 'Titta! Kritan ritar något.'],
  ['10-korg-varsagod-zebran', 3.25, 'En korg! Varsågod, zebran.'],
  ['11-saga-tack', 1.29, 'Ska vi säga tack?'],
  ['12-tack', 0.94, 'Tack!'],
  ['13-nallen-hoppade', 2.68, 'Oj! Nallen hoppade i korgen!'],
  ['14-nallen-hjalpa', 2.85, 'Ha ha! Nallen vill också hjälpa till.'],
  ['15-plocka-undan-nu', 1.46, 'Ska du plocka undan nu?'],
  ['16-forst-bilen-ankan', 6.26, 'Först bilen och ankan. Ett, två … i korgen!'],
  ['17-och-baten-hinken', 6.42, 'Och båten och hinken. Ett, två … i korgen!'],
  ['18-bollen-zebran-vet', 3.99, 'Oj, bollen då? Zebran vet inte var.'],
  ['19-hjalpa-zebran-se', 4.06, 'Kan du hjälpa zebran? Kan du se var bollen är?'],
  ['20-dar-under-sangen', 3.0, 'Ja, där! Ja, under sängen!'],
  ['21-rulla-till-dig', 4.56, 'Ska vi leka lite? Rulla, rulla … till dig!'],
  ['22-rulla-tillbaka', 1.39, 'Kan du rulla tillbaka?'],
  ['23-rulla-till-zebran', 2.93, 'Rulla, rulla … till zebran!'],
  ['24-till-dig-tillbaka', 2.39, 'Till dig … och tillbaka!'],
  ['25-nu-bollen', 5.98, 'Nu bollen. Ett, två … i korgen!'],
  ['26-stadat', 2.44, 'Nu är det alldeles städat!'],
  ['27-hej-da-zebran-korgen', 2.69, 'Hej då, zebran! Hej då, korgen!'],
  ['28-hej-ses-snart', 3.19, 'Hej då! Vi ses snart!'],
];
export const UPPSKATTAD = ROST.some(r => r[1] == null);
export const L = n => ROST[n - 1][1] ?? Math.max(0.7, 0.075 * ROST[n - 1][2].length);
// var ett ord börjar i repliken (s): uppmätt när tagningen finns (ORD), annars räknat på tecknen
export const ORD = { 16: { 'Ett': 3.03, 'två': 4.12, 'i korgen': 5.25, 'korgen': 5.40 }, 17: { 'Ett': 2.90, 'två': 4.03, 'i korgen': 5.35, 'korgen': 5.45 }, 21: { 'Rulla': 2.01, 'dig': 3.65 }, 23: { 'Rulla': 0.05, 'zebran': 1.66 }, 24: { 'och': 1.33, 'tillbaka': 1.55 }, 25: { 'Ett': 2.58, 'två': 3.70, 'i korgen': 4.89, 'korgen': 5.00 } };   // uppmätt 2026-11-11 (whisper-cli + silencedetect, tagning b)
export const ord = (n, w) => ORD[n]?.[w] ?? L(n) * ROST[n - 1][2].indexOf(w) / ROST[n - 1][2].length;

const GN = (kansla, o) => [null, o, 'gnagg-gullig: ' + kansla];   // zebrans ljudfamilj (026 manus.md "Zebrans röst")

// Introt: det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro/intro.mp4, 3,31 s) före scenen
export const RADER = [
  { id: '00', d: 3.31, plats: 'Intro', bild: 'Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen', ljudtext: 'introts jingel', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, benen, svansen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 1.6 + L(4) + 1.5, plats: 'Sovrummet på dagen, helbild', malin: [[4, 1.6]], ljud: [['trav/trav-1', 0.2], GN('hej', 1.9 + L(4))],
    bild: 'Zebran går in från höger bakom sängen (riggens gång), stannar mitt bakom sängen och vinkar. Leksakerna ligger på golvet. **Hej med vinkning**', ljudtext: '`trav`, glatt gnägg', ansikte: 'jätteglad' },
  { id: '2', still: 1.8, d: 0.3 + L(5) + 1.5, plats: 'Golvet, helbild', malin: [[5, 0.3]], ljud: [GN('fniss', 0.5 + L(5))],
    bild: 'Nallen, bilen, ankan, båten och hinken ligger huller om buller framför sängen. Zebran tittar ner på dem', ljudtext: 'fniss', ansikte: 'fnissig' },
  { id: '3', d: 0.3 + L(6) + 2.6, plats: 'Halvbild', malin: [[6, 0.3]], ljud: [['puff/puff-1', 0.6 + L(6)], GN('trumpen', 0.5 + L(6))],
    bild: 'Zebran skakar på huvudet: ägget lutar ±6° tre gånger', ljudtext: 'trumpet frust', ansikte: 'trumpen' },
  { id: '4', d: 0.3 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild zebran', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [GN('trumpen', 1.5 + L(7) + L(8))],
    bild: 'Zebran vänder bort huvudet (riktningsposen åt vänster), öronen faller. Paus 1 s mellan replikerna', ljudtext: 'trumpet frust', ansikte: 'trumpen, tittar bort' },
  { id: '5a', still: 6.5, d: 0.3 + L(9) + 0.3 + 4.0 + 3.0, plats: 'Halvbild → närbild golvet bredvid sängen', malin: [[9, 0.3]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.6 + L(9)]],
    bild: 'Kritan kommer in och ritar korgens kontur på golvet till vänster om sängen (4 s), väntar sedan bredvid och vajar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', still: 0.5, d: 0.2 + L(10) + 1.2, plats: 'Samma → golvet och korgen', malin: [[10, 0.2]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga korgen fylls i inifrån. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.3 + L(11) + 4.0 + L(12) + 1.6, plats: 'Golvet och korgen', malin: [[11, 0.3], [12, 0.3 + L(11) + 4.0]], ljud: [GN('nyfiken', 0.6 + L(11)), GN('förtjust', 0.6 + L(11) + 4.0 + L(12))],
    bild: 'Zebran tittar på korgen, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran', ljudtext: 'nyfiket gnägg, sedan förtjust gnägg', ansikte: 'nyfiken → jätteglad' },
  { id: '7', still: 1.0, d: 1.4 + L(13) + 1.4, plats: 'Golvet och korgen', malin: [[13, 1.4]], ljud: [['nalle-hopp/nalle-hopp-1', 0.3], ['dunk/dunk-2', 1.1, 0.8], GN('fniss', 1.6 + L(13))],
    bild: 'Nallen gör ett lugnt skutt från golvet ner i korgen', ljudtext: '`nalle-hopp`, fniss', ansikte: 'förvånad → fnissig' },
  { id: '8', d: 0.3 + L(14) + 3.8, plats: 'Närbild korgen', malin: [[14, 0.3]], ljud: [GN('långt fniss', 0.6 + L(14))],
    bild: 'Nallen tittar upp över korgens kant (ögonen i kod)', ljudtext: 'långt fniss', ansikte: '–' },
  { id: '9', d: 0.3 + L(15) + 1.6, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [GN('förtjust', 0.6 + L(15))],
    bild: 'Zebran tittar på leksakerna och nickar', ljudtext: 'förtjust gnägg', ansikte: 'jätteglad' },
  { id: '10', d: 0.3 + L(16) + 1.6, plats: 'Golvet och korgen', malin: [[16, 0.3]], ljud: [['badanka-pip/badanka-pip-1', 0.3 + ord(16, 'två')], ['dunk/dunk-1', 0.3 + ord(16, 'korgen') + 0.55], GN('fniss', 0.8 + L(16))],
    bild: 'Bilen lyfter på *"ett"*, ankan på *"två"*, båda glider i en mjuk båge och landar i korgen på *"i korgen!"*. **Shorten börjar här**', ljudtext: '`badanka-pip`, `dunk`, fniss', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(17) + 1.6, plats: 'Samma', malin: [[17, 0.3]], ljud: [['dunk/dunk-3', 0.3 + ord(17, 'korgen') + 0.55], GN('fniss', 0.8 + L(17))],
    bild: 'Samma med båten och hinken', ljudtext: '`dunk`, fniss', ansikte: 'glad' },
  { id: '12', d: 0.3 + L(18) + 1.8, plats: 'Halvbild', malin: [[18, 0.3]], ljud: [GN('nyfiken', 0.5 + L(18))],
    bild: 'Zebran tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte)', ljudtext: 'frågande gnägg', ansikte: 'nyfiken' },
  { id: '13', d: 0.3 + L(19) + 5.0, plats: 'Närbild under sängen (klipp)', malin: [[19, 0.3]],
    bild: 'En röd bit med gul rand mellan sängbenen. Paus 5 s; efter ca 3 s skimrar den svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '14', d: L(20) + 2.2, plats: 'Samma', malin: [[20, 0.0]], ljud: [['tindra/tindra-1', 0.2], GN('förtjust', 0.2 + L(20)), ['rull/rull-1', L(20) + 0.2, 0.9]],
    bild: 'Bollen skimrar tydligt och rullar fram ur sängen', ljudtext: 'förtjust gnägg, `tindra`, `rull`', ansikte: '–' },
  { id: '15', d: 0.3 + L(21) + 1.4, plats: 'Sovrummet, helbild', malin: [[21, 0.3]], ljud: [['rull/rull-1', 0.3 + ord(21, 'Rulla'), 0.9], GN('förtjust', 0.6 + L(21))],
    bild: 'Bollen rullar mot tittaren, växer och åker ut nedtill i bild. Kameran står still. **Leken (rulla bollen)**', ljudtext: '`rull`, förtjust gnägg', ansikte: 'jätteglad' },
  { id: '16', d: 0.3 + L(22) + 4.0 + L(23) + 1.4, plats: 'Samma, tomt golv', malin: [[22, 0.3], [23, 0.3 + L(22) + 4.0]], ljud: [['rull/rull-1', 0.3 + L(22) + 4.0, 0.9], GN('fniss', 0.6 + L(22) + 4.0 + L(23))],
    bild: 'Paus 4 s: barnet rullar tillbaka. Bollen rullar in nedifrån, blir mindre och stannar framför zebran', ljudtext: '`rull`, fniss', ansikte: 'nyfiken → fnissig' },
  { id: '17', d: 0.3 + L(24) + 3.8, plats: 'Samma', malin: [[24, 0.3]], ljud: [['rull/rull-1', 0.3, 0.9], GN('långt fniss', 0.6 + L(24))],
    bild: 'En gång till: ut och in igen', ljudtext: '`rull`, långt fniss', ansikte: 'jätteglad' },
  { id: '18', d: 0.3 + L(25) + 1.4, plats: 'Golvet och korgen', malin: [[25, 0.3]], ljud: [['studs/studs-1', 0.3 + ord(25, 'Ett') + 0.25], ['studs/studs-2', 0.3 + ord(25, 'två') + 0.25], ['dunk/dunk-4', 0.3 + ord(25, 'korgen') + 0.55]],
    bild: 'Bollen studsar två gånger (*"ett, två"*) och landar i korgen på *"i korgen!"*. **Shorten slutar här**', ljudtext: '`studs` ×2, `dunk`', ansikte: 'glad' },
  { id: '19', d: 0.4 + L(26) + 1.8, plats: 'Sovrummet, helbild', malin: [[26, 1.4]], ljud: [GN('förtjust', 1.6 + L(26))],
    bild: 'Städat golv, korgen full. Zebran klappar tre lugna klapp (riggens klapp)', ljudtext: 'tre `tass-klapp`, förtjust gnägg', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(27) + 1.5, plats: 'Zebran och korgen', malin: [[27, 0.3]], ljud: [GN('hej då', 0.5 + L(27))],
    bild: 'Zebran vinkar (armen bakom kroppen, snett ut förbi kanten), korgen bredvid. **Hej då med vinkning**', ljudtext: 'hej då-gnägg', ansikte: 'jätteglad' },
  { id: '21', d: 0.3 + L(28) + 1.6, plats: 'Samma', malin: [[28, 0.3]], ljud: [GN('fniss', 0.5 + L(28))],
    bild: 'Zebran vinkar klart, armen sjunker', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '22', still: 1.7, d: 2.5, plats: 'Sovrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt zebran och korgen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
