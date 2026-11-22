// Storyboardens rader för 034 Musen pyntar granen: en rad per uppslag i ../storyboard.md (4, 7, 8 och 21 är delade i a/b: kritan
// ritar konturen, sedan fylls saken i). Scenen (../scener/vardagsrummet) läser samma rader; scenens t = 0 är rad 01a.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden, vol]]; MUS(känsla, s) = musens röst (filen väljs i MUS_FIL nedan).
//
// Malins tagning: A (malin-tagning-1a), utom 11, 15, 18 och 19 som är B (Claude 2026-11-13 efter whisper: B säger "Röd" och "Upp"
// tydligt och är stramare; A-filerna ligger kvar i produktion/ljud-original/roster/musen-pyntar-granen/tagning-1a/). Längderna uppmätta.
export const TITEL = 'Musen pyntar granen', ROSTMAPP = 'musen-pyntar-granen';
export const ROST = [
  ['01-kritan-ritar', 2.05, 'Kritan ritar …'],
  ['02-vad-blir-det', 2.23, 'Hm … vad blir det nu?'],
  ['03-mus', 1.84, 'Oj! En mus!'],
  ['04-hej-musen-hej', 1.98, 'Hej, musen! Hej, hej!'],
  ['05-en-julgran', 2.50, 'Titta! En julgran!'],
  ['06-granen-ar-tom', 2.85, 'Oj då. Granen är visst alldeles tom.'],
  ['07-vad-gor', 1.76, 'Hm … vad gör vi nu?'],
  ['08-titta-kritan-ritar', 2.85, 'Titta! Kritan ritar något.'],
  ['09-julkula-varsagod-musen', 3.56, 'En julkula! Varsågod, musen.'],
  ['10-saga-tack', 0.86, 'Ska vi säga tack?'],
  ['11-tack', 1.15, 'Tack!'],                                  // B
  ['12-kritan-ritar-mer', 1.94, 'Kritan ritar mer …'],
  ['13-en-gul-kula', 1.52, 'En gul kula!'],
  ['14-och-en-bla', 1.02, 'Och en blå!'],
  ['15-rod-gul-bla', 3.81, 'Röd, gul och blå. Oj, så fint!'],    // B
  ['16-musen-i-kulan', 2.96, 'Oj! Musen är i kulan!'],
  ['17-tittut', 1.19, 'Tittut!'],
  ['18-ska-vi-pynta', 1.58, 'Ska vi pynta granen nu?'],          // B
  ['19-forst-den-roda', 4.61, 'Först den röda. Upp, upp … pling!'], // B
  ['20-och-den-gula', 6.08, 'Och den gula. Upp, upp … pling!'],
  ['21-var-tog-bla', 4.12, 'Oj, den blå kulan! Var tog den vägen?'],
  ['22-kan-du-hjalpa-musen', 4.55, 'Kan du hjälpa musen? Kan du se var den blå kulan är?'],
  ['23-ja-dar-under-granen', 2.49, 'Ja, där! Under granen!'],
  ['24-upp-upp-pling', 3.24, 'Upp, upp … pling!'],
  ['25-oj-vad-fint', 1.09, 'Oj, vad fint!'],
  ['26-toppen-ar-tom', 2.17, 'Hm … toppen är tom.'],
  ['27-kritan-ritar-igen', 3.15, 'Titta! Kritan ritar igen.'],
  ['28-stjarna-varsagod-musen', 3.23, 'En stjärna! Varsågod, musen.'],
  ['29-tack-kritan', 1.07, 'Tack, kritan!'],
  ['30-nar-inte-upp', 3.12, 'Oj! Musen når inte upp.'],
  ['31-sag-upp', 3.63, 'Ska vi hjälpa till? Säg: upp!'],
  ['32-upp', 0.67, 'Upp!'],
  ['33-stjarnan-i-toppen', 2.03, 'Stjärnan sitter i toppen!'],
  ['34-nu-ar-det-jul', 2.48, 'Mmm … nu är det jul.'],
  ['35-hej-da-musen-granen', 2.92, 'Hej då, musen! Hej då, granen!'],
  ['36-hej-da-god-jul', 4.33, 'Hej då! God jul! Vi ses snart!'],
  // feedback 2026-11-21 kväll: 37 klippt ur 09 (ritintrot är en julkula), 38 och 39 nya (ElevenLabs v3, Malin, tagning 1, rådata i produktion/ljud-original/034/)
  ['37-en-julkula', 1.78, 'En julkula!'],
  ['38-vi-ska-dekorera', 4.84, 'Vi ska dekorera granen med julpyntet i lådan. Hurra, vad kul!'],
  ['39-en-pall', 2.14, 'En pall! Varsågod, musen.'],
  // feedback 2026-11-22 (0:53 "polish manus"): 38 ersatt av 40–42 (ElevenLabs v3, Malin, tagning 1 av 2, rådata produktion/ljud-original/034/titta-lada-*.mp3)
  ['40-titta-en-lada', 3.55, 'Titta, musen! En låda med julpynt.'],
  ['41-vill-du-dekorera', 2.38, 'Vill du dekorera granen tillsammans?'],
  ['42-ja-vad-kul', 1.42, 'Ja! Vad kul!'],
];
export const L = n => ROST[n - 1][1];
// var ordet börjar i repliken (s), uppmätt med whisper-cli 2026-11-13 (pling: där kulan sätter sig)
// QA 2026-11-21: pling uppmätt om ur ljudets energi (whisper gav början på pausen före ordet, ca 0,6 s för tidigt); Upp i 20 likaså
// upp2 = andra "upp" (musen kliver upp på pallens höga steg), uppmätt ur ljudets energi 2026-11-21 kväll
export const ORD = { 19: { Upp: 2.10, upp2: 2.95, pling: 4.10 }, 20: { Upp: 2.90, upp2: 4.07, pling: 5.28 }, 24: { Upp: 0.0, upp2: 1.10, pling: 2.30 }, 38: { Hurra: 3.55 } };
export const ord = (n, w) => ORD[n]?.[w] ?? L(n) * ROST[n - 1][2].indexOf(w) / ROST[n - 1][2].length;

// Musens röst (Claude 2026-11-13, se ../ljud-effekter.md): känsla → fil under assets/ljud/effekter/
export const MUS_FIL = { hej: 'mus-hej/mus-hej-1', 'förtjust': 'mus-pip/mus-pip-4', fniss: 'mus-pip/mus-pip-7', 'mysig suck': 'mus-suck/mus-suck-1',
  nyfiken: 'mus-pip/mus-pip-6', trumpen: 'mus-trumpen/mus-trumpen-1', pratar: 'mus-pip/mus-pip-8', 'hej då': 'mus-hejda/mus-hejda-1', 'långt fniss': 'mus-fniss/mus-fniss-4',
  // feedback 2026-11-22 (2:23 "more mouse sound effects … jippi, hej, mhmm"): fler befintliga tagningar, så att det inte låter likadant varje gång
  jippi: 'mus-hej/mus-hej-3', mhm: 'mus-suck/mus-suck-2', jippi2: 'mus-hej/mus-hej-2', pip: 'mus-pip/mus-pip-5' };
const MUS = (kansla, o) => [null, o, kansla];

// Introt: det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro/intro.mp4, 3,31 s) före scenen
// rad 3:s tider (s in i raden): 40, 41, nicken, 42, radens längd
const R3 = (() => { const a = 0.3 + L(6) + 1.4, b = a + L(40) + 0.5, nick = b + L(41) + 0.5, c = nick + 1.3; return { a, b, nick, c, slut: c + L(42) + 1.4 }; })();
export { R3 };
export const RADER = [
  { id: '00', d: 3.31, plats: 'Intro', bild: 'Julintrot Djuren hittar på! (bilderbok-intro-jul)', ljudtext: 'introts jingel', ansikte: '–' },

  // Sanna 2026-11-21 kväll: "måla inte musen måla en julkula" – ritintrot är en röd julkula
  { id: '01a', d: 6.0, plats: 'Papperet', malin: [[1, 2.9]], bild: 'Kritan kommer in och ritar julkulans kontur i ett lugnt drag', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: 10.9,   /* +2,3 s för kulans detaljer (2026-11-22) */ plats: 'Papperet', malin: [[2, 0.0]], bild: 'Konturen ritas klar (kulan, sedan öglan), kritan väntar och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.9 + L(37) + 0.5, plats: 'Papperet → zoom in', malin: [[37, 0.9]], ljud: [['glitter/glitter-1', 0.0, 0.9]], bild: 'Den riktiga röda julkulan fylls i inifrån och skimrar. Sista 0,8 s: zoom in', ljudtext: 'glitter', ansikte: '–' },

  { id: '1', d: 3.6 + L(4) + 1.6, plats: 'Vardagsrummet, helbild', malin: [[3, 1.2], [4, 3.6]], ljud: [['tass/tass-1', 0.4, 0.4], ['tass/tass-2', 1.1, 0.4], ['tass/tass-3', 1.8, 0.4], ['tass/tass-4', 2.5, 0.4], ['tass/tass-5', 3.1, 0.35], MUS('hej', 3.8 + L(4))],
    bild: '*"Oj! En mus!"* medan musen trippar in. Musen trippar lugnt in från vänster (3,6 s, Sanna 2026-11-15: långsammare), stannar framför granen och vinkar. **Hej med vinkning**', ljudtext: 'tass, hej-pip', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(5) + 1.8, plats: 'Halvbild', malin: [[5, 0.4]], ljud: [MUS('förtjust', 0.6 + L(5))],
    bild: 'Musen vänder sig mot granen, ögonen följer, öronen reser sig, ett litet glatt skutt', ljudtext: 'förtjust pip', ansikte: 'förvånad → glad' },
  // Sanna 2026-11-22 (0:53): "Titta, musen! En låda med julpynt. Vill du dekorera granen tillsammans?" musen nickar (förtjust pip), "Ja! Vad kul!"
  // (ersätter 38 "Vi ska dekorera granen med julpyntet i lådan. Hurra, vad kul!")
  { id: '3', d: R3.slut, plats: 'Granen → närbild musen → lådan → musen', malin: [[6, 0.3], [40, R3.a], [41, R3.b], [42, R3.c]],
    ljud: [MUS('trumpen', 0.5 + L(6)), MUS('mhm', R3.nick + 0.1), MUS('förtjust', R3.c + L(42) + 0.15)],
    bild: 'Närbild på den tomma granen; klipp till musen: öronen faller. *"Titta, musen!"* musen tittar ner, klipp till lådan på *"En låda med julpynt"*. Klipp till musen på frågan, musen nickar (pip), jätteglad och reser öronen på *"Ja! Vad kul!"*', ljudtext: 'trumpet pip, mhm (nick), förtjust pip', ansikte: 'lite ledsen → nyfiken → jätteglad' },
  { id: '4a', d: 1.4 + L(8) + 3.6, plats: 'Golvet framför musen', malin: [[8, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.8, 1.0]],
    bild: 'Kritan kommer in och ritar den röda kulans kontur på golvet (3,4 s), väntar och vajar: gisspaus', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '4b', d: 1.3 + L(9) + 0.6, plats: 'Samma', malin: [[9, 1.3]], ljud: [['glitter/glitter-1', 0.0, 0.9]],
    bild: 'Den riktiga röda kulan fylls i inifrån och skimrar. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '5', d: 0.2 + L(10) + 2.5 + L(11) + 1.2, plats: 'Närbild musen', malin: [[10, 0.2], [11, 0.2 + L(10) + 2.5]], ljud: [MUS('nyfiken', 0.4 + L(10)), MUS('förtjust', 0.5 + L(10) + 2.5 + L(11))],
    bild: 'Musen tittar på kulan med kawaii-ögon. Paus 2,5 s: barnet säger tack. Nickar på *Tack!*', ljudtext: 'nyfiket pip, förtjust pip', ansikte: 'kawaii → jätteglad' },
  { id: '7a', d: 1.4 + L(12) + 2.4, plats: 'Golvet', malin: [[12, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.8, 1.0]],
    bild: 'Kritan ritar en kula till bredvid den röda', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '7b', d: 1.0 + L(13) + 0.6, plats: 'Samma', malin: [[13, 1.0]], ljud: [['glitter/glitter-2', 0.0, 0.9]], bild: 'Den gula kulan fylls i', ljudtext: 'glitter', ansikte: 'glad' },
  { id: '8a', d: 2.8, plats: 'Golvet', ljud: [['krita-ritar/krita-ritar-4', 0.3, 1.0]], bild: 'Kritan ritar en tredje kula', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '8b', d: 1.0 + L(14) + 1.0, plats: 'Samma', malin: [[14, 1.0]], ljud: [['glitter/glitter-3', 0.0, 0.9]], bild: 'Den blå kulan fylls i, kritan flyger ut', ljudtext: 'glitter', ansikte: 'glad' },
  { id: '9', d: 0.3 + L(15) + 1.4, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [MUS('förtjust', 0.5 + L(15))],
    bild: 'Tre kulor på golvet, musen tittar på en i taget (röd, gul, blå)', ljudtext: 'förtjust pip', ansikte: 'glad' },
  { id: '10', d: 1.4 + L(16) + 1.6, plats: 'Halvbild → närbild kulan', malin: [[16, 1.4]], ljud: [MUS('fniss', 1.6 + L(16))],
    bild: 'Musen böjer sig ner mot den röda kulan. Närbild: musens ansikte syns i kulan', ljudtext: 'kort fniss', ansikte: 'nyfiken → glad' },
  { id: '11', d: 2.8 + L(17) + 3.2, plats: 'Närbild kulan', malin: [[17, 2.8]], ljud: [MUS('långt fniss', 2.9 + L(17))],
    bild: 'Musen reser sig: ansiktet är borta ur kulan (2 s). Böjer sig ner igen på *"Tittut!"*: tillbaka. **Leken (tittut)**', ljudtext: 'långt fniss', ansikte: 'glad, skrattar' },
  { id: '12', d: 4.2, plats: 'Helbild', ljud: [['rull/rull-1', 0.6, 0.5], MUS('förtjust', 3.4)],
    bild: 'Musen tittar ner i kulan en gång till. Den blå kulan rullar sakta (2,5 s) bakom julgransfoten; musen ser det inte', ljudtext: 'rull lågt', ansikte: 'glad' },
  { id: '13', d: 0.4 + L(18) + 1.2, plats: 'Halvbild', malin: [[18, 0.4]], ljud: [MUS('förtjust', 0.6 + L(18))], bild: 'Musen reser sig och tittar på granen', ljudtext: 'förtjust pip', ansikte: 'glad' },
  // Sanna 2026-11-21 kväll: "en liten pall så musen kan hänga kulor högre i granen". Musen backar två små steg, kritan ritar pallen
  // mellan musen och lådan, "En pall! Varsågod, musen." Musen kliver upp på pallen på "Upp, upp" och hänger kulorna högre.
  { id: '13b', d: 2.0 + 3.0 + 0.6 + 1.3 + L(39) + 1.0, plats: 'Halvbild', malin: [[8, 0.3], [39, 2.0 + 3.0 + 0.6 + 1.3]], ljud: [['glitter/glitter-2', 5.6, 0.9], MUS('förtjust', 2.0 + 3.0 + 0.6 + 1.5 + L(39))],
    bild: 'Musen backar två små steg. Kritan ritar pallen bredvid musen (3 s), väntar, pallen fylls i och skimrar. *Varsågod*', ljudtext: 'kritan ritar, glitter, förtjust pip', ansikte: 'nyfiken → glad' },
  { id: '14', d: 0.3 + L(19) + 1.8, plats: 'Halvbild', malin: [[19, 0.3]], ljud: [['ding/ding-1', 0.3 + ord(19, 'pling'), 0.6], ['glimt/glimt-1', 0.4 + ord(19, 'pling'), 0.6], MUS('mhm', 1.45), MUS('jippi', 0.75 + ord(19, 'pling'))],
    bild: 'Musen tar den röda kulan ur lådan, kliver upp på pallen på *"Upp, upp"* (lågt steg, högt steg) och hänger kulan högt i granen på *"pling!"*, kliver ner', ljudtext: 'ding, glimt', ansikte: 'glad' },
  { id: '15', d: 0.3 + L(20) + 1.8, plats: 'Halvbild', malin: [[20, 0.3]], ljud: [['ding/ding-2', 0.3 + ord(20, 'pling'), 0.6], MUS('pip', 1.55), MUS('jippi2', 0.75 + ord(20, 'pling'))],
    bild: 'Samma med den gula, högre upp', ljudtext: 'ding, förtjust pip', ansikte: 'glad' },
  { id: '16', d: 0.4 + L(21) + 1.8, plats: 'Halvbild', malin: [[21, 0.4]], ljud: [MUS('nyfiken', 0.6 + L(21))],
    bild: 'Musen tittar ner, åt vänster, åt höger: den blå kulan är borta', ljudtext: 'frågande pip', ansikte: 'nyfiken' },
  { id: '17', d: 0.3 + L(22) + 3.8, plats: 'Halvbild → närbild julgransfoten', malin: [[22, 0.3]],
    bild: 'Frågan; sedan närbild på julgransfoten där en bit av den blå kulan tittar fram. Paus 5 s, skimrar efter 3 s', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '18', d: 0.3 + L(23) + 2.0, plats: 'Närbild foten → halvbild', malin: [[23, 0.3]], ljud: [['tindra/tindra-4', 0.1, 0.8], MUS('förtjust', 0.5 + L(23)), MUS('mhm', 0.3 + 3.9)],
    bild: 'Kulan skimrar tydligt och rullar fram till musen, som blir jätteglad', ljudtext: 'tindra, förtjust pip', ansikte: 'jätteglad' },
  { id: '19', d: 0.3 + L(24) + 1.8, plats: 'Halvbild', malin: [[24, 0.3]], ljud: [['ding/ding-3', 0.3 + ord(24, 'pling'), 0.6], ['glimt/glimt-2', 0.4 + ord(24, 'pling'), 0.6], MUS('jippi', 0.75 + ord(24, 'pling'))],
    bild: 'Den blå kulan upp i granen på *"pling!"*', ljudtext: 'ding, glimt', ansikte: 'glad' },
  { id: '20', d: 0.4 + L(25) + 1.0 + L(26) + 1.6, plats: 'Helbild → granen', malin: [[25, 0.4], [26, 1.4 + L(25)]], ljud: [MUS('förtjust', 0.6 + L(25)), MUS('nyfiken', 1.6 + L(25) + L(26))],
    bild: 'Den pyntade granen med tre kulor; klipp till granen: toppen är tom', ljudtext: 'förtjust pip, frågande pip', ansikte: 'glad → nyfiken' },
  { id: '21a', d: 1.4 + L(27) + 3.4, plats: 'Golvet', malin: [[27, 0.3]], ljud: [['krita-ritar/krita-ritar-5', 0.8, 1.0]],
    bild: 'Kritan ritar en stjärna på golvet framför musen, väntar och vajar: gisspaus', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '21b', d: 1.3 + L(28) + 0.6, plats: 'Samma', malin: [[28, 1.3]], ljud: [['glitter/glitter-4', 0.0, 0.9], ['pling/pling-3', 1.3, 0.6]], bild: 'Den riktiga stjärnan fylls i. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '22', d: 0.3 + L(29) + 1.4, plats: 'Närbild musen', malin: [[29, 0.3]], ljud: [MUS('förtjust', 0.5 + L(29))], bild: 'Musen med kawaii-ögon', ljudtext: 'förtjust pip', ansikte: 'kawaii' },
  { id: '23', d: 4.8 + L(30) + 1.4, plats: 'Helbild', malin: [[30, 4.8]], ljud: [['tass/tass-1', 1.3, 0.35], ['tass/tass-2', 1.8, 0.35], MUS('pratar', 2.25), ['hopp-mjuk/hopp-mjuk-1', 4.1, 0.3], MUS('trumpen', 5.0 + L(30))],
    bild: 'Stjärnan glider upp i musens hand, musen går till pallen och kliver upp på låga och höga steget (feedback 2026-11-22 3:35), sträcker sig mot toppen och gör ett litet skutt: når ändå inte. Öronen faller', ljudtext: 'trumpet pip', ansikte: 'nyfiken → lite ledsen' },
  { id: '24', d: 0.3 + L(31) + 3.5, plats: 'Närbild musen', malin: [[31, 0.3]], bild: 'Musen med stjärnan tittar på barnet. Paus 4,4 s med GLES (QA 2026-11-15): barnet säger upp', ljudtext: 'tyst', ansikte: 'hoppfull' },
  { id: '25', d: L(32) + 2.0 + L(33) + 1.4, plats: 'Helbild', malin: [[32, 0.0], [33, L(32) + 2.0]], ljud: [['swoosh/swoosh-1', 0.3, 0.5], ['tindra/tindra-3', 1.7, 0.9], MUS('förtjust', 1.75)],
    bild: 'Stjärnan glider i en mjuk båge från handen upp till toppen (1,4 s) och sätter sig; kulorna glimtar', ljudtext: 'swoosh, tindra, förtjust pip', ansikte: 'jätteglad' },
  // Sanna 2026-11-21 kväll (3:26): "och sen släng upp det sista så kommer lamporna"
  { id: '25b', d: 6.4, plats: 'Helbild', ljud: [['swoosh/swoosh-1', 2.3, 0.6], ['glitter/glitter-3', 3.1, 0.8], ['tindra/tindra-3', 3.9, 0.9], MUS('förtjust', 4.5)],
    bild: 'Musen går till lådan, tar upp det sista pyntet (glittergirlangen) och slänger upp det i granen. Girlangen lägger sig i bågar. Sedan tänds lamporna, en i taget. Musen går tillbaka', ljudtext: 'swoosh, glitter, tindra, förtjust pip', ansikte: 'glad → jätteglad' },
  { id: '26', d: 0.4 + L(34) + 3.0, plats: 'Helbild', malin: [[34, 0.4]], ljud: [MUS('mysig suck', 0.6 + L(34)), ['tass-klapp-tre/tass-klapp-tre-1', 1.8 + L(34), 0.7]],
    bild: 'Den pyntade granen, snön faller. Musen blundar nöjt och klappar tre gånger', ljudtext: 'mysig suck, klapp', ansikte: 'blundar nöjt' },
  { id: '27', d: 0.6 + L(35) + 1.4, plats: 'Halvbild', malin: [[35, 0.6]], ljud: [MUS('hej då', 0.8 + L(35))], bild: 'Musen vinkar. **Hej då med vinkning**', ljudtext: 'hej då-pip', ansikte: 'jätteglad' },
  { id: '28', d: 0.4 + L(36) + 1.4, plats: 'Halvbild', malin: [[36, 0.4]], ljud: [MUS('fniss', 0.6 + L(36))], bild: 'Musen vinkar klart, armen sänks', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '29', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt musen och granen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.9;   // extra luft på varje rad med en replik (som 026)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
