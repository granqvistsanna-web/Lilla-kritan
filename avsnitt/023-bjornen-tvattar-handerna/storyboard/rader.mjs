// Storyboardens rader för 023 Björnen tvättar händerna: en stillbild per uppslag i manus.md (01, 6, 8 och 18 är delade i
// två–tre bilder, för att bilden byts mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna ur
// scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]; null som fil = ljudet saknas än (står i texten med ⚠, tystnad i animatiken).
//
// Malins repliker, uppmätta (ffprobe, normaliserade till −3 dBFS, tagningen 2026-11-11). Filnamn och text ur ../rost.txt,
// längderna ur ../rost-langder.txt. Mät om dem om tagningen byts. Pauserna är manusets.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-kritan-ritar', 1.52, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.79, 'Hm … vad blir det nu?'],
  ['03-bjorn', 1.96, 'Oj! En björn!'],
  ['04-hej-bjornen-hej', 2.23, 'Hej, björnen! Hej, hej!'],
  ['05-vad-kladdig-ar', 2.79, 'Oj, oj, oj! Vad kladdig du är!'],
  ['06-titta-honung-golvet', 2.71, 'Titta, honung på golvet också!'],
  ['07-val-tvatta-handerna', 1.88, 'Nu ska du väl tvätta händerna?'],
  ['08-bjornen-gommer-visst', 2.87, 'Oj då. Björnen gömmer visst tassarna.'],
  ['09-vad-gor', 1.93, 'Hm … vad gör vi nu?'],
  ['10-titta-kritan-ritar', 2.58, 'Titta! Kritan ritar något.'],
  ['11-tval-varsagod-bjornen', 3.20, 'En tvål! Varsågod, björnen.'],
  ['12-saga-tack', 1.14, 'Ska vi säga tack?'],
  ['13-tack', 0.70, 'Tack!'],
  ['14-tvalen-ar-hal', 2.28, 'Oj! Tvålen är hal!'],
  ['15-gang-till', 2.03, 'Ha ha! En gång till!'],
  ['16-tvatta-bort-all', 2.24, 'Ska du tvätta bort all honung nu?'],
  ['17-forst-ena-tassen', 4.94, 'Först ena tassen. Gnugga, gnugga … ren!'],
  ['18-andra-tassen-gnugga', 5.30, 'Och andra tassen. Gnugga, gnugga … ren!'],
  ['19-lite-honung-ar', 4.36, 'Oj, lite honung är kvar. Björnen vet inte var.'],
  ['20-hjalpa-bjornen-se', 4.27, 'Kan du hjälpa björnen? Kan du se var honungen är?'],
  ['21-dar-nosen', 2.44, 'Ja, där! Ja, på nosen!'],
  ['22-gnugga-gnugga-ren', 2.91, 'Gnugga, gnugga … ren!'],
  ['23-bubblor', 1.84, 'Oj! Bubblor!'],
  ['24-ar-alldeles-ren', 3.91, 'Nu är du alldeles ren! Kan du klappa händerna?'],
  ['25-klapp-klapp-klapp', 1.70, 'Klapp, klapp, klapp!'],
  ['26-mmm-mjuk-handduk', 3.77, 'Mmm … mjuk handduk.'],
  ['27-hej-bjornen-hej', 3.17, 'Hej då, björnen! Hej då, tvålen!'],
  ['28-hej-ses-snart', 2.72, 'Hej då! Vi ses snart!'],
];

export const L = n => ROST[n - 1][1];
// var "ren!" börjar i replikerna (silencedetect −35 dB, tagningen 2026-11-11): kladdet är borta exakt där. Mät om om tagningen byts.
export const REN = { 17: 4.32, 18: 4.62, 22: 2.19 };

const BRUM = (kansla, o) => [null, o, 'brum-gullig: ' + kansla];   // ⚠ björnens ljudfamilj brum-gullig finns inte än (manus.md "Björnens röst")
const FNISS = o => [null, o, 'brum-gullig: fniss'];

export const RADER = [
  { id: '00', d: 1.0, plats: 'Intro', bild: 'Lilla Kritans logotyp i 1 s, ingen jingel, inget titelkort. ⚠ Platshållare: logotypbilden läggs in i filmen', ljudtext: 'tyst', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 3.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar björnens kontur i lugna drag (ca 7 s totalt), halvvägs här', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och vajar lugnt: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga björnen fylls i inifrån, honungskladdet kommer sist (tassarna, nosen). Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 2.5 + L(4) + 1.5, plats: 'Badrummet, helbild', malin: [[4, 2.5]], ljud: [['smasteg/smasteg-1', 0.2], BRUM('hej', 2.8 + L(4))],
    bild: 'Björnen trippar in från vänster (riggens gång), ett kladdigt gult tassavtryck per steg, stannar och vinkar. **Hej med vinkning**', ljudtext: 'små steg, glatt brum (⚠ `brum-gullig` saknas)', ansikte: 'glad' },
  { id: '2', d: 0.4 + L(5) + 1.8, plats: 'Badrummet, närbild', malin: [[5, 0.4]], ljud: [BRUM('förtjust', 0.7 + L(5))],
    bild: 'Björnen håller upp tassarna åt sidorna: gul honung på båda, och en klick på nosen. Efter repliken slickar den sig om nosen', ljudtext: 'belåtet brum (⚠), slick', ansikte: 'stolt, tungan ute' },
  { id: '3', d: 0.8 + L(6) + 1.2, plats: 'Badrummet, helbild', malin: [[6, 0.8]], ljud: [FNISS(1.0 + L(6))],
    bild: 'De kladdiga tassavtrycken på golvet skimrar till ett i taget; björnen tittar ner på dem', ljudtext: 'fniss (⚠)', ansikte: 'nyfiken, tittar ner' },
  { id: '4', d: 0.6 + L(7) + 1.8, plats: 'Badrummet, halvbild björnen och handfatet', malin: [[7, 0.6]], ljud: [['kran/kran-1', 0.1], BRUM('trumpen', 0.9 + L(7))],
    bild: 'Kranen börjar rinna i handfatet. Björnen skakar på huvudet (ägget lutar åt sidorna)', ljudtext: '`kran`, trumpet brum (⚠)', ansikte: 'lite ledsen (trumpen)' },
  { id: '5', d: 0.8 + L(8) + 1.0 + L(9) + 1.3, plats: 'Badrummet, närbild', malin: [[8, 0.8], [9, 1.8 + L(8)]], ljud: [['swoosh/swoosh-2', 0.2, 1.0], BRUM('trumpen', 2.0 + L(8) + L(9))],
    bild: 'Björnen gömmer tassarna bakom ryggen (armarna glider in bakom kroppen) och tittar bort åt vänster. Paus 1 s mellan replikerna', ljudtext: 'trumpet brum (⚠)', ansikte: 'trumpen, tittar bort' },
  { id: '6a', d: 0.3 + L(10) + 0.3 + 3.0 + 3.0, plats: 'Badrummet, halvbild', malin: [[10, 1.5]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.6 + L(10)]],
    bild: 'Kritan ritar tvålens kontur på handfatets kant (3 s), väntar sedan bredvid och vajar: gisspaus 3 s. Björnen kikar dit', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '6b', d: 0.55 + L(11) + 0.5,   // Sanna 2026-11-11 "make tack scene a bit faster": mindre luft kring Varsågod
    plats: 'Samma', malin: [[11, 0.6]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga tvålen fylls i inifrån. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '7', d: 0.2 + L(12) + 2.5 + L(13) + 1.0, plats: 'Samma', malin: [[12, 0.2], [13, 0.2 + L(12) + 2.5]], ljud: [['swoosh/swoosh-3', 0.3, 1.8], BRUM('nyfiken', 0.5 + L(12)), BRUM('förtjust', 0.3 + L(12) + 2.5 + L(13))],   // paus 2,5 s (var 4)
    bild: 'Björnen tittar på tvålen och tassarna kommer fram igen. Paus 2,5 s: barnet säger tack. På *Tack!* nickar björnen', ljudtext: 'nyfiket brum, sedan förtjust brum (⚠)', ansikte: 'nyfiken → jätteglad' },
  { id: '8a', d: 3.0, plats: 'Badrummet, helbild', ljud: [['smasteg/smasteg-2', 0.4]],
    bild: 'Upp på pallen: ett lugnt skutt per steg, sedan står björnen bakom handfatet, synlig från magen och upp', ljudtext: 'två mjuka steg', ansikte: 'glad' },
  { id: '8b', d: 1.6 + L(14) + 1.4, plats: 'Badrummet, halvbild', malin: [[14, 1.6]], ljud: [['plopp/plopp-1', 1.4], BRUM('frågande', 1.8 + L(14))],
    bild: 'Björnen tar tvålen mellan tassarna. Den glider upp ur tassarna i en mjuk båge och landar i handfatet. Ögonen följer den', ljudtext: '`plopp`, fniss (⚠)', ansikte: 'förvånad' },
  { id: '9', d: 2.0 + L(15) + 1.4, plats: 'Samma', malin: [[15, 2.0]], ljud: [['plopp/plopp-1', 1.6], FNISS(2.2 + L(15))],
    bild: 'En gång till: tvålen glider upp och landar. **Leken (den hala tvålen)**', ljudtext: '`plopp`, långt fniss (⚠)', ansikte: 'fnissig' },
  { id: '10', d: 0.3 + L(16) + 1.5, plats: 'Samma', malin: [[16, 0.3]], ljud: [BRUM('förtjust', 0.5 + L(16))],
    bild: 'Björnen håller tvålen mellan tassarna (klappen framför magen). **Shorten börjar här**', ljudtext: 'förtjust brum (⚠)', ansikte: 'glad' },
  { id: '11', d: 0.8 + L(17) + 1.2, plats: 'Handfatet, närbild tassarna', malin: [[17, 0.8]], ljud: [['skrubb/skrubb-1', 2.8], ['glimt/glimt-1', 0.8 + REN[17], 4.8]],
    bild: 'Skumtussen snurrar mellan tassarna och växer. Kladdet på vänstra tassen bleknar och är borta på *"ren!"*', ljudtext: '`skrubb`, `glimt` på "ren"', ansikte: 'glad' },
  { id: '12', d: 0.7 + L(18) + 1.5, plats: 'Samma', malin: [[18, 0.7]], ljud: [['skrubb/skrubb-2', 2.6], ['glimt/glimt-2', 0.7 + REN[18], 2.7], FNISS(0.9 + L(18))],
    bild: 'Samma på andra tassen (den vänstra redan ren)', ljudtext: '`skrubb`, `glimt`, fniss (⚠)', ansikte: 'fnissig' },
  { id: '13', d: 0.3 + L(19) + 1.6, plats: 'Badrummet, halvbild', malin: [[19, 0.3]], ljud: [BRUM('nyfiken', 0.5 + L(19))],
    bild: 'Rena tassar, men en gul klick är kvar på nosen. Björnen tittar på tassarna, sedan åt vänster och höger (ögonen, huvudet vänds inte)', ljudtext: 'frågande brum (⚠)', ansikte: 'nyfiken' },
  { id: '14', d: 0.3 + L(20) + 3.9,   /* + GLES 0,7 + rad 15:s 0,4 = paus 5,0 s (QA 2026-11-11) */ plats: 'Närbild ansiktet (klipp)', malin: [[20, 0.3]],
    bild: 'Den gula klicken på nosen. Paus 5 s; efter ca 3 s skimrar klicken svagt', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '15', d: 0.4 + L(21) + 1.4, plats: 'Samma', malin: [[21, 0.4]], ljud: [['glimt/glimt-1', 0.2, 4.8], BRUM('förtjust', 0.6 + L(21))],
    bild: 'Klicken skimrar tydligt', ljudtext: 'förtjust brum (⚠), `glimt`', ansikte: 'jätteglad' },
  { id: '16', d: 0.7 + L(22) + 1.5, plats: 'Samma', malin: [[22, 0.7]], ljud: [['skrubb/skrubb-1', 0.4], ['glimt/glimt-2', 0.7 + REN[22], 2.7], BRUM('mysig suck', 0.9 + L(22))],
    bild: 'Skumtussen snurrar över nosen (armen når inte dit), björnen blundar. Klicken är borta på *"ren!"*', ljudtext: '`skrubb`, fniss (⚠)', ansikte: 'blundar, ler' },
  { id: '17', d: 5.0, plats: 'Badrummet, halvbild', malin: [[23, 1.4]], ljud: [['skrrrrt-kort/skrrrrt-kort-2', 0.1], ['pop/pop-1', 3.0], ['pop/pop-2', 3.5], ['pop/pop-3', 4.0], BRUM('förtjust', 4.3)],
    bild: 'Kritan ritar tre bubblor som flyger långsamt upp och spricker mjukt, en i taget', ljudtext: '`pop` × 3, fniss (⚠)', ansikte: 'förvånad → jätteglad' },
  { id: '18a', d: 0.3 + L(24) + 4.0, plats: 'Samma', malin: [[24, 0.3]],
    bild: 'Alldeles rena tassar, björnen visar dem. Efter frågan: paus 4 s', ljudtext: 'tyst i pausen', ansikte: 'stolt' },
  { id: '18b', d: Math.max(2.0, L(25)) + 1.4, plats: 'Samma', malin: [[25, 0.0]], ljud: [['tass-klapp-tre/tass-klapp-tre-1', 0.1], FNISS(2.1)],
    bild: 'Björnen klappar tre lugna klapp (riggens klapp), ett kritstreck-gnistrande per klapp. **Leken (klappa händerna). Shorten slutar här**', ljudtext: '`tass-klapp-tre`, fniss (⚠)', ansikte: 'jätteglad' },
  { id: '19', d: 0.4 + L(26) + 1.6, plats: 'Samma', malin: [[26, 0.4]], ljud: [BRUM('mysig suck', 0.6 + L(26))],
    bild: 'Handduken glider upp framför tassarna och ner igen', ljudtext: 'mysig suck (⚠)', ansikte: 'blundar, ler' },
  { id: '20', d: 0.7 + L(27) + 1.5, plats: 'Samma', malin: [[27, 0.7]], ljud: [BRUM('hej då', 0.9 + L(27))],
    bild: 'Björnen vinkar (armen bakom kroppen, snett ut förbi kanten), tvålen ligger på handfatets kant. **Hej då med vinkning**', ljudtext: 'hej då-brum (⚠)', ansikte: 'jätteglad' },
  { id: '21', d: 0.3 + L(28) + 1.6, plats: 'Samma', malin: [[28, 0.3]], ljud: [BRUM('förtjust', 0.5 + L(28))],
    bild: 'Björnen vinkar klart, armen sjunker', ljudtext: 'fniss (⚠)', ansikte: 'glad' },
  { id: '22', d: 2.5, plats: 'Badrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt björnen och tvålen', ljudtext: '–', ansikte: 'glad' },
];

// Malin efter handlingen (Sanna 2026-11-11): rörelsen börjar först, repliken 0,4–0,8 s in eller när det landar; frågor före.
// fniss bara på rad 3, 9, 12 och 18b (polish 2026-11-11: högst 3–4, aldrig på rader i följd)
export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
