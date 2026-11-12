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
  ['04-hej-zebran', 1.06, 'Hej, zebran!'],   // Sanna 2026-11-12: ett "hej" räcker (04-hej-zebran-hej.m4a klippt efter "zebran",
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
  // rond 2026-11-12 (Sanna: korgen först, zebran vill inte, kritan ritar musik, "Hittar du inte …?"): uppskattade längder tills tagningarna finns
  ['29-kritan-ritar-igen', 2.27, 'Titta! Kritan ritar igen.'],
  ['30-radio-lyssna', 3.13, 'En radio! Vi kan lyssna på en låt!'],
  ['31-hittar-du-inte', 3.06, 'Oj, bollen då? Hittar du inte bollen?'],
  // Sanna 2026-11-12: zebran bär sakerna till korgen, så 16 och 17 är delade i pauserna (samma tagningar): räkneordet när saken landar
  ['32-forst-bilen-ankan', 2.45, 'Först bilen och ankan.'],
  ['33-ett', 0.95, 'Ett,'],
  ['34-tva-i-korgen', 2.26, 'två … i korgen!'],
  ['35-och-baten-hinken', 2.3, 'Och båten och hinken.'],
  ['36-ett', 1.05, 'Ett,'],
  ['37-tva-i-korgen', 2.52, 'två … i korgen!'],
];
export const UPPSKATTAD = ROST.some(r => r[1] == null);
export const L = n => ROST[n - 1][1] ?? Math.max(0.7, 0.075 * ROST[n - 1][2].length);
// var ett ord börjar i repliken (s): uppmätt när tagningen finns (ORD), annars räknat på tecknen
export const ORD = { 16: { 'Ett': 3.03, 'två': 4.12, 'i korgen': 5.25, 'korgen': 5.40 }, 17: { 'Ett': 2.90, 'två': 4.03, 'i korgen': 5.35, 'korgen': 5.45 }, 21: { 'Rulla': 2.01, 'dig': 3.65 }, 23: { 'Rulla': 0.05, 'zebran': 1.66 }, 24: { 'och': 1.33, 'tillbaka': 1.55 }, 25: { 'Ett': 2.58, 'två': 3.70, 'i korgen': 4.89, 'korgen': 5.00 }, 34: { 'två': 0.12, 'i korgen': 1.25 }, 37: { 'två': 0.13, 'i korgen': 1.45 } };   // uppmätt 2026-11-11 (whisper-cli + silencedetect, tagning b)
export const ord = (n, w) => ORD[n]?.[w] ?? L(n) * ROST[n - 1][2].indexOf(w) / ROST[n - 1][2].length;

// Sanna 2026-11-12: zebran bär sakerna till korgen (riggens plocka). En sak: gå dit (GA), plocka upp (PL), gå till korgen (GA),
// lägga i (PL; saken landar 0,54 × PL in). Malins räkneord 0,5 s efter landningen. Tiderna räknas från bärandets början.
export const BAR = { GA: 2.0, PL: 2.2 };
export const barStart = n => n * (2 * BAR.GA + 2 * BAR.PL);
export const barLanda = n => barStart(n) + 2 * BAR.GA + BAR.PL + 0.54 * BAR.PL;
export const B0 = n => 0.3 + L(n) + 0.2;   // bärandet börjar efter "Först bilen och ankan." / "Och båten och hinken."

const GN = (kansla, o) => [null, o, 'gnagg-gullig: ' + kansla];   // zebrans ljudfamilj (026 manus.md "Zebrans röst")

// Introt: det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro/intro.mp4, 3,31 s) före scenen
export const RADER = [
  { id: '00', d: 3.31, plats: 'Intro', bild: 'Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen', ljudtext: 'introts jingel', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 2.9]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 8.6, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, benen, svansen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.9 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.9]],
    bild: 'Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },
  { id: '1', d: 1.6 + L(4) + 1.5, plats: 'Sovrummet på dagen, helbild', malin: [[4, 1.6]], ljud: [['trav/trav-1', 0.2], GN('hej', 1.9 + L(4))],
    bild: 'Zebran går in från höger bakom sängen (riggens gång), stannar mitt bakom sängen och vinkar. Leksakerna ligger på golvet. **Hej med vinkning**', ljudtext: '`trav`, glatt gnägg', ansikte: 'jätteglad' },
  { id: '2', nara: [[5, 'leksaker', 'LEKSAKER', 2.0]], still: 0.9, d: 1.8 + L(5) + 1.5, plats: 'Golvet, helbild', malin: [[5, 1.8]], ljud: [['badanka-pip/badanka-pip-1', 0.75], GN('nyfiken', 2.0 + L(5))],
    bild: 'Zebran leker först: lutar sig ner och knuffar ankan, som piper och vaggar (granskningen 2026-11-12). Sedan: nallen, bilen, ankan, båten och hinken ligger huller om buller framför sängen', ljudtext: 'nyfiket gnägg', ansikte: 'fnissig' },
  { id: '5a', still: 6.5, d: 1.0 + 4.0 + 4.0, plats: 'Halvbild → närbild golvet bredvid sängen', malin: [[9, 1.4]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 1.0]],
    bild: 'Kritan kommer in och ritar korgens kontur på golvet till vänster om sängen (4 s), väntar sedan bredvid och vajar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', nara: [[10, 'korg', 'KORG', 2.0]], still: 0.5, d: 1.3 + L(10) + 0.5, plats: 'Samma → golvet och korgen', malin: [[10, 1.3]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga korgen fylls i inifrån. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.2 + L(11) + 2.5 + L(12) + 1.2, plats: 'Golvet och korgen', malin: [[11, 0.2], [12, 0.2 + L(11) + 2.5]], ljud: [GN('nyfiken', 0.4 + L(11)), GN('förtjust', 0.3 + L(11) + 2.5 + L(12))],
    bild: 'Zebran tittar på korgen, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran', ljudtext: 'nyfiket gnägg, sedan förtjust gnägg', ansikte: 'nyfiken → jätteglad' },
  { id: '3', d: 0.3 + L(6) + 2.6, plats: 'Halvbild', malin: [[6, 0.3]], ljud: [['puff/puff-1', 0.6 + L(6)], GN('nej', 0.5 + L(6))],
    bild: 'Korgen står tom. Zebran skakar på huvudet: ägget lutar ±6° tre gånger', ljudtext: 'trumpet frust', ansikte: 'trumpen' },
  { id: '4', d: 0.3 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild zebran', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [GN('trumpen', 1.5 + L(7) + L(8))],
    bild: 'Zebran vänder bort huvudet och sätter näsan i vädret (riktningsposen åt vänster, huvudet upp), öronen faller, lugnt. Korgen står tom. Paus 1 s mellan replikerna', ljudtext: 'trumpet frust', ansikte: 'trumpen, tittar bort' },
  // Sanna 2026-11-12: zebran vill inte städa, sedan ritar kritan musik (radion) och "vi kan lyssna på en låt"
  { id: '4b', still: 5.4, d: 1.0 + 4.0 + 1.6, plats: 'Halvbild → närbild sängens fotände', malin: [[29, 0.6]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 1.0]],
    bild: 'Kritan kommer in och ritar radions kontur på sängens fotände: lådan med handtaget, högtalaren, skalfönstret, två rattar och tre noter ovanför (4 s). Konturen står kvar 1,6 s medan kritan vajar', ljudtext: '`krita-ritar`', ansikte: 'trumpen → nyfiken' },
  { id: '4c', nara: [[30, 'radio', 'RADIO', 2.0]], still: 0.5, d: 1.3 + L(30) + 0.4, plats: 'Samma → halvbild', malin: [[30, 1.3]], ljud: [['glitter/glitter-1', 0.0], ['pling/pling-3', 1.3]],
    bild: 'Den riktiga radion fylls i inifrån (1,6 s), skimrar. Närbild på radion på *"radio"*', ljudtext: '`glitter`, `pling`', ansikte: 'förvånad → glad' },
  { id: '4d', d: 5.6, plats: 'Halvbild', ljud: [GN('förtjust', 1.2)],
    bild: 'Klick: radion spelar (stada-radion), noter stiger. Zebran piggnar till (öronen upp, jätteglad) och gungar i takten', ljudtext: 'klick, radions musik, förtjust gnägg', ansikte: 'jätteglad' },
  { id: '7', still: 1.0, d: 1.4 + L(13) + 1.4, plats: 'Golvet och korgen', malin: [[13, 1.4]], ljud: [['nalle-hopp/nalle-hopp-1', 0.3], ['dunk/dunk-2', 1.1, 0.8], GN('förtjust', 1.6 + L(13))],
    bild: 'Nallen gör ett lugnt skutt från golvet ner i korgen', ljudtext: '`nalle-hopp`, förtjust gnägg', ansikte: 'förvånad → fnissig' },
  { id: '8', d: 0.8 + L(14) + 3.8, plats: 'Närbild korgen', malin: [[14, 0.8]], ljud: [GN('långt fniss', 1.1 + L(14))],
    bild: 'Nallen tittar upp över korgens kant (ögonen i kod)', ljudtext: 'långt fniss', ansikte: '–' },
  { id: '9', d: 0.3 + L(15) + 2.6, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [GN('förtjust', 0.6 + L(15))],
    bild: 'Zebran tittar på leksakerna och nickar i takten', ljudtext: 'förtjust gnägg, radions musik', ansikte: 'jätteglad' },
  { id: '10', nara: [[32, 'bilen', 'BIL_ANKA', 2.0]], d: B0(32) + barLanda(1) + 0.5 + L(34) + 1.0, plats: 'Golvet och korgen', malin: [[32, 0.3], [33, B0(32) + barLanda(0) + 0.5], [34, B0(32) + barLanda(1) + 0.5]],
    ljud: [['dunk/dunk-1', B0(32) + barLanda(0) - 0.03], ['badanka-pip/badanka-pip-1', B0(32) + barStart(1) + BAR.GA + 0.46 * BAR.PL], ['dunk/dunk-3', B0(32) + barLanda(1) - 0.03], GN('förtjust', B0(32) + barLanda(1) + 0.9 + L(34))],
    bild: 'Zebran går till bilen, plockar upp den (riggens plocka), bär den till korgen och lägger i den: *"Ett"*. Sedan ankan: *"två … i korgen!"*. **Shorten börjar här**', ljudtext: '`dunk` när sakerna landar, `badanka-pip`, förtjust gnägg', ansikte: 'nyfiken → ivrig' },
  { id: '11', nara: [[35, 'båten', 'BAT_HINK', 1.8]], d: B0(35) + barLanda(1) + 0.5 + L(37) + 0.6 + BAR.GA + 0.4, plats: 'Samma', malin: [[35, 0.3], [36, B0(35) + barLanda(0) + 0.5], [37, B0(35) + barLanda(1) + 0.5]],
    ljud: [['dunk/dunk-2', B0(35) + barLanda(0) - 0.03], ['dunk/dunk-4', B0(35) + barLanda(1) - 0.03], GN('förtjust', B0(35) + barLanda(1) + 0.9 + L(37)), ['trav/trav-1', B0(35) + barLanda(1) + 0.5 + L(37) + 0.6, 0.8]],
    bild: 'Samma med båten och hinken; sist går zebran tillbaka till sin plats', ljudtext: '`dunk` när sakerna landar, förtjust gnägg, trav', ansikte: 'glad → kawaii' },
  // "Hittar du inte bollen?" → zebran svarar nej (gnagg-nej, låter som svenskt "nej"), blir förvånad och tittar sig omkring
  { id: '12', d: 0.3 + L(31) + 0.4 + 0.8 + 3.4, plats: 'Halvbild', malin: [[31, 0.3]], ljud: [GN('nej', 0.3 + L(31) + 0.4)],
    bild: 'Efter frågan: zebran svarar nej, blir förvånad (stora ögon, liten rund mun, öronen upp, stilla 0,3 s), tittar åt vänster och sedan åt höger', ljudtext: 'gnagg-nej', ansikte: 'förvånad → nyfiken' },
  { id: '13', d: 0.3 + L(19) + 6.0, plats: 'Närbild under sängen (klipp)', malin: [[19, 0.3]],
    bild: 'En röd bit med gul rand mellan sängbenen. Paus 5 s; efter ca 3 s skimrar den svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '14', d: 0.3 + L(20) + 2.2 + 1.5, plats: 'Samma', malin: [[20, 0.3]], ljud: [['tindra/tindra-3', 0.2], GN('förtjust', 0.5 + L(20)), ['rull/rull-1', L(20) + 0.5, 0.9]],
    bild: 'Bollen skimrar tydligt och rullar fram ur sängen', ljudtext: 'förtjust gnägg, `tindra`, `rull`', ansikte: '–' },
  { id: '15', d: 0.3 + L(21) + 1.4, plats: 'Sovrummet, helbild', malin: [[21, 0.3]], ljud: [['rull/rull-1', 0.3 + ord(21, 'Rulla') - 0.4, 0.9], GN('fniss', 0.6 + L(21))],
    bild: 'Bollen rullar mot tittaren, växer och åker ut nedtill i bild. Kameran står still. **Leken (rulla bollen)**', ljudtext: '`rull`, fniss', ansikte: 'jätteglad' },
  { id: '16', d: 0.3 + L(22) + 4.0 + L(23) + 1.4, plats: 'Samma, tomt golv', malin: [[22, 0.3], [23, 0.3 + L(22) + 4.0]], ljud: [['rull/rull-1', 0.3 + L(22) + 4.0, 0.9]],
    bild: 'Paus 4 s: barnet rullar tillbaka. Bollen rullar in nedifrån, blir mindre och stannar framför zebran', ljudtext: '`rull`', ansikte: 'nyfiken → fnissig' },
  { id: '17', d: 0.8 + L(24) + 3.8, plats: 'Samma', malin: [[24, 0.8]], ljud: [['rull/rull-1', 0.3, 0.9], GN('förtjust', 1.1 + L(24))],
    bild: 'En gång till: ut och in igen', ljudtext: '`rull`, långt fniss', ansikte: 'jätteglad' },
  { id: '18', nara: [[25, 'bollen', 'BOLL', 1.7]], d: 0.3 + L(25) + 1.4, plats: 'Golvet och korgen', malin: [[25, 0.3]], ljud: [['studs/studs-1', 0.3 + ord(25, 'Ett') + 0.25], ['studs/studs-2', 0.3 + ord(25, 'två') + 0.5, 0.7], ['boing/boing-1', 0.3 + ord(25, 'två') + 0.85, 0.35], ['dunk/dunk-4', 0.3 + ord(25, 'i korgen') + 0.8]],
    bild: 'Bollen studsar på golvet på *"ett"*, upp på zebrans huvud på *"två"* (ett litet studs där) och ner i korgen på *"i korgen!"*, lugnt, snurrar inte. **Shorten slutar här**', ljudtext: '`studs` ×2, `boing`, `dunk`', ansikte: 'förvånad → ivrig' },
  { id: '19', d: 0.4 + L(26) + 1.8 + 2.6, plats: 'Sovrummet, helbild', malin: [[26, 1.4]], ljud: [GN('förtjust', 1.6 + L(26))],
    bild: 'Städat golv, korgen full. Zebran klappar tre lugna klapp (riggens klapp), sedan dansar han lite till radion (lutar i takten)', ljudtext: 'tre `tass-klapp`, förtjust gnägg', ansikte: 'jätteglad' },
  { id: '20', nara: [[27, 'korgen', 'KORG', 1.8]], d: 0.7 + L(27) + 1.5, plats: 'Zebran och korgen', malin: [[27, 0.7]], ljud: [GN('hej då', 0.9 + L(27))],
    bild: 'Zebran vinkar (armen bakom kroppen, snett ut förbi kanten), korgen bredvid. **Hej då med vinkning**', ljudtext: 'hej då-gnägg', ansikte: 'jätteglad' },
  { id: '21', d: 0.3 + L(28) + 1.6, plats: 'Samma', malin: [[28, 0.3]], ljud: [],
    bild: 'Zebran vinkar klart, armen sjunker', ljudtext: '–', ansikte: 'glad' },
  { id: '22', still: 1.7, d: 2.5, plats: 'Sovrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt zebran och korgen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 1.2;   // extra luft på varje rad med en replik (0,7 som 020 runda 5; 1,2 sedan Sanna 2026-11-12 "longer clips overall")
// nara: [[replik, ord, kamera, s]] = klipp till närbild på saken när Malin säger ordet, kvar s sekunder, sedan tillbaka till zebrans
// reaktion (Sanna 2026-11-12: "more cuts zoom close crops on thing on mention"); raden får 1 s extra för reaktionen efter klippet
export const NARA_EXTRA = 1.0;
for (const r of RADER) { if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES; if (r.nara) r.d += NARA_EXTRA; }
