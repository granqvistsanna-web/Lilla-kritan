// Storyboardens rader för 026 Zebran går och lägger sig: en rad per uppslag i manus.md (01 och 5 är delade, för att bilden
// byts mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), tar stillbilderna ur scenen (../scener/sovrummet),
// skriver tabellen i storyboard.md, index.html och animatiken. Scenen läser samma rader.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]; null som fil = zebrans gnagg-gullig (finns inte än: tystnad tills filen finns).
//
// Malins repliker: filnamn och text ur ../rost.txt. Längden (andra värdet) är null tills tagningen är delad och uppmätt;
// då räknas den som 0,075 s per tecken (UPPSKATTAD). Mät med ffprobe och skriv in sekunderna.
export const TITEL = 'Zebran går och lägger sig', ROSTMAPP = 'zebran-gar-och-lagger-sig';
export const ROST = [
  ['01-kritan-ritar', 2.17, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.93, 'Hm … vad blir det nu?'],
  ['03-zebra', 2.53, 'Oj! En zebra!'],
  ['04-hej-zebran-hej', 2.07, 'Hej, zebran! Hej, hej!'],
  ['05-kvall-manen', 3.4, 'Det är kväll nu. Titta, månen!'],
  ['06-val-lagga-dig', 1.56, 'Nu ska du väl gå och lägga dig?'],
  ['07-zebran-vill-visst', 3.02, 'Oj då. Zebran vill visst inte lägga sig.'],
  ['08-vad-gor', 2.03, 'Hm … vad gör vi nu?'],
  ['09-titta-kritan-ritar', 2.56, 'Titta! Kritan ritar något.'],
  ['10-kudde-varsagod-zebran', 3.1, 'En kudde! Varsågod, zebran.'],
  ['11-saga-tack', 1.17, 'Ska vi säga tack?'],
  ['12-tack', 0.72, 'Tack!'],
  ['13-mjuk-kudde', 3.55, 'Mmm … vilken mjuk kudde!'],
  ['14-var-ar-zebran', 2.03, 'Oj! Var är zebran?'],
  ['15-tittut', 0.85, 'Tittut!'],
  ['16-var-ar-zebran', 1.69, 'Var är zebran?'],
  ['17-tittut', 1.57, 'Tittut!'],
  ['18-gaspning-trott', 3.74, 'Oj, en gäspning! Är du trött nu?'],
  ['19-forst-lampan', 5.09, 'Först lampan. Gäsp … god natt!'],
  ['20-och-manen', 4.78, 'Och månen. Gäsp … god natt!'],
  ['21-nallen-zebran-vet', 4.02, 'Oj, nallen då? Zebran vet inte var.'],
  ['22-hjalpa-zebran-se', 4.11, 'Kan du hjälpa zebran? Kan du se var nallen är?'],
  ['23-dar-bakom-kudden', 3.59, 'Ja, där! Ja, bakom kudden!'],
  ['24-gasp-god-natt', 3.77, 'Gäsp … god natt!'],
  ['25-ocksa-gaspa', 1.33, 'Kan du också gäspa?'],
  ['26-gaasp', 1.47, 'Gääsp …'],
  ['27-hej-da-zebran-kudden', 3.28, 'Hej då, zebran! Hej då, kudden!'],
  ['28-hej-ses-snart', 2.6, 'Hej då! Vi ses snart!'],
];
export const UPPSKATTAD = ROST.some(r => r[1] == null);
export const L = n => ROST[n - 1][1] ?? Math.max(0.7, 0.075 * ROST[n - 1][2].length);
// var ett ord börjar i repliken (s): uppmätt när tagningen finns (ORD), annars räknat på tecknen
export const ORD = { 19: { 'Gäsp': 2.40, 'natt': 4.60 }, 20: { 'Gäsp': 1.92, 'natt': 4.30 }, 24: { 'Gäsp': 0.86, 'natt': 3.15 } };   // uppmätt 2026-11-11 (whisper-cli + silencedetect, tagning b)
export const ord = (n, w) => ORD[n]?.[w] ?? L(n) * ROST[n - 1][2].indexOf(w) / ROST[n - 1][2].length;

const GN = (kansla, o) => [null, o, 'gnagg-gullig: ' + kansla];   // zebrans ljudfamilj (manus.md "Zebrans röst")

// Introt: det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro/intro.mp4, 3,31 s) före scenen
export const RADER = [
  { id: '00', d: 3.31, plats: 'Intro', bild: 'Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen', ljudtext: 'introts jingel', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, benen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 1.6 + L(4) + 1.5, plats: 'Sovrummet, helbild, kvällsljus', malin: [[4, 1.6]], ljud: [['trav/trav-1', 0.2], GN('hej', 1.9 + L(4))],
    bild: 'Lampan lyser. Zebran går in från höger bakom sängen (riggens gång), stannar mitt bakom sängen och vinkar. **Hej med vinkning**', ljudtext: '`trav`, glatt gnägg', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(5) + 1.6, plats: 'Fönstret och zebran', malin: [[5, 0.4]], ljud: [GN('förtjust', 0.6 + L(5))],
    bild: 'Månen i fönstret. Zebran tittar dit, öronen vippar', ljudtext: 'förtjust gnägg', ansikte: 'nyfiken → glad' },
  { id: '3', d: 0.3 + L(6) + 2.6, plats: 'Sovrummet, helbild', malin: [[6, 0.3]], ljud: [['puff/puff-1', 0.6 + L(6)], GN('trumpen', 0.5 + L(6))],
    bild: 'Sängen. Zebran skakar på huvudet: ägget lutar ±6° tre gånger', ljudtext: 'trumpet frust', ansikte: 'trumpen' },
  { id: '4', d: 0.3 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild zebran', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [GN('trumpen', 1.5 + L(7) + L(8))],
    bild: 'Zebran vänder bort huvudet (riktningsposen åt vänster), öronen faller. Paus 1 s mellan replikerna', ljudtext: 'trumpet frust', ansikte: 'trumpen, tittar bort' },
  { id: '5a', still: 6.5, d: 0.3 + L(9) + 0.3 + 4.0 + 3.0, plats: 'Halvbild → närbild sängens huvudända', malin: [[9, 0.3]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.6 + L(9)]],
    bild: 'Kritan kommer in och ritar kuddens kontur på sängens vänstra ände (4 s), väntar sedan bredvid och vajar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', still: 0.5, d: 0.2 + L(10) + 1.2, plats: 'Samma → halvbild', malin: [[10, 0.2]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga kudden fylls i inifrån. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.3 + L(11) + 4.0 + L(12) + 1.6, plats: 'Halvbild', malin: [[11, 0.3], [12, 0.3 + L(11) + 4.0]], ljud: [GN('nyfiken', 0.6 + L(11)), GN('förtjust', 0.6 + L(11) + 4.0 + L(12))],
    bild: 'Zebran tittar på kudden, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran', ljudtext: 'nyfiket gnägg, sedan förtjust gnägg', ansikte: 'nyfiken → jätteglad' },
  { id: '7', still: 1.6, d: 0.4 + L(13) + 2.2, plats: 'Halvbild', malin: [[13, 1.0]], ljud: [['puff/puff-2', 0.9], GN('mysig suck', 1.2 + L(13))],
    bild: 'Kudden glider upp till zebrans kind, zebran blundar och myser, och kudden glider tillbaka', ljudtext: '`puff`, mysig suck', ansikte: 'blundar, ler' },
  { id: '8', still: 2.0, d: 1.0 + L(14) + 4.0, plats: 'Närbild zebran', malin: [[14, 1.0]], ljud: [['prassel-tyg/prassel-tyg-1', 0.2], GN('fniss', 1.2 + L(14) + 2.0)],
    bild: 'Täcket glider upp framför ansiktet så att ögonen täcks. Paus 4 s', ljudtext: '`prassel-tyg`, ett litet gnägg under täcket', ansikte: '(under täcket)' },
  { id: '9', still: 1.2, d: L(15) + 1.4, plats: 'Samma', malin: [[15, 0.0]], ljud: [GN('fniss', 0.3)],
    bild: 'Täcket glider ner på *"Tittut!"*, zebran tittar fram', ljudtext: 'fniss', ansikte: 'fnissig' },
  { id: '10', still: 1.5, d: 0.9 + L(16) + 2.0 + L(17) + 3.8, plats: 'Samma', malin: [[16, 0.9], [17, 0.9 + L(16) + 2.0]], ljud: [['prassel-tyg/prassel-tyg-1', 0.1], GN('långt fniss', 1.2 + L(16) + 2.0 + L(17))],
    bild: 'En gång till, kortare: upp, paus 2 s, ner på *"Tittut!"*. **Leken (tittut)**', ljudtext: '`prassel-tyg`, långt fniss', ansikte: 'fnissig' },
  { id: '11', still: 0.9, d: 1.4 + L(18) + 1.5, plats: 'Halvbild', malin: [[18, 1.3]], ljud: [['gaspning/gaspning-1', 0.2], GN('pratar', 1.5 + L(18))],
    bild: 'Zebran gäspar (munnen ett stort O, ögonen kniper ihop). **Shorten börjar här**', ljudtext: '`gaspning`, sömnigt gnägg', ansikte: 'sömnig, gäspar' },
  { id: '12', d: 0.4 + L(19) + 1.6, plats: 'Lampan och zebran', malin: [[19, 0.4]], ljud: [['lampa-klick/lampa-klick-1', 0.4 + ord(19, 'natt')]],
    bild: 'Zebran gäspar på *"Gäsp"*, lampan släcks på *"natt"*: skenet tonas bort på 0,4 s, rummet blir lite mörkare och varmt blått', ljudtext: '`lampa-klick`', ansikte: 'sömnig' },
  { id: '13', d: 0.4 + L(20) + 1.6, plats: 'Fönstret och zebran', malin: [[20, 0.4]], ljud: [['glimt/glimt-1', 0.4 + ord(20, 'natt')]],
    bild: 'Zebran gäspar på *"Gäsp"*, månen lyser upp mjukt på *"natt"*', ljudtext: '`glimt`', ansikte: 'sömnig' },
  { id: '14', d: 0.3 + L(21) + 1.8, plats: 'Halvbild', malin: [[21, 0.3]], ljud: [GN('nyfiken', 0.5 + L(21))],
    bild: 'Zebran tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte)', ljudtext: 'frågande gnägg', ansikte: 'nyfiken' },
  { id: '15', d: 0.3 + L(22) + 5.0, plats: 'Närbild kudden (klipp)', malin: [[22, 0.3]],
    bild: 'Två bruna öron sticker upp bakom kudden. Paus 5 s; efter ca 3 s skimrar de svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '16', d: L(23) + 1.4, plats: 'Samma', malin: [[23, 0.0]], ljud: [['tindra/tindra-1', 0.2], GN('förtjust', 0.2 + L(23))],
    bild: 'Öronen skimrar tydligt', ljudtext: 'förtjust gnägg, `tindra`', ansikte: '–' },
  { id: '17', d: 2.2 + L(24) + 1.6, plats: 'Halvbild', malin: [[24, 2.2]], ljud: [['nalle-hopp/nalle-hopp-1', 0.3], GN('mysig suck', 2.4 + L(24))],
    bild: 'Nallen glider fram bakom kudden och sätter sig bredvid zebran. Zebran gäspar på *"Gäsp"*', ljudtext: '`nalle-hopp`, mysig suck', ansikte: 'sömnig, gäspar' },
  { id: '18a', d: 0.3 + L(25) + 4.0, plats: 'Halvbild', malin: [[25, 0.3]],
    bild: 'Zebran tittar på barnet. Paus 4 s: barnet gäspar', ljudtext: 'tyst i pausen', ansikte: 'sömnig' },
  { id: '18b', d: L(26) + 1.6, plats: 'Samma', malin: [[26, 0.0]], ljud: [['gaspning/gaspning-1', 0.05], GN('fniss', 0.3 + L(26))],
    bild: 'Zebran gäspar en gång till på *"Gääsp"*. **Leken (gäspa med). Shorten slutar här**', ljudtext: '`gaspning`, fniss', ansikte: 'gäspar → fnissig' },
  { id: '19', d: 0.3 + L(27) + 1.5, plats: 'Halvbild', malin: [[27, 0.3]], ljud: [GN('hej då', 0.5 + L(27))],
    bild: 'Zebran vinkar sömnigt (armen bakom kroppen, snett ut förbi kanten). **Hej då med vinkning**', ljudtext: 'mjukt hej då-gnägg', ansikte: 'sömnig, glad' },
  { id: '20', still: 4.2, d: 2.6 + L(28) + 2.4, plats: 'Halvbild', malin: [[28, 2.6]], ljud: [['snark-pip/snark-pip-1', 2.0 + L(28) + 0.9], ['godnatt-pling/godnatt-pling-1', 2.6 + L(28) + 0.6]],
    bild: 'Zebran somnar (Somnar C): litet hopp, landar liggande på magen på kudden, täcket glider upp till hakan, zzz', ljudtext: '`snark-pip`, `godnatt-pling`', ansikte: 'sover' },
  { id: '21', still: 1.7, d: 2.5, plats: 'Sovrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt zebran och nallen', ljudtext: '–', ansikte: 'sover' },
];

export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
