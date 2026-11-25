// Storyboardens rader för 056 Räven går och lägger sig: en stillbild per bild, med reaktionsslagen som egna bilder
// (Sanna 2026-11-25: fler reaktioner, närmare, snabbare). bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna ur scen.html,
// skriver tabellen i storyboard.md, index.html och animatiken. Förlaga: 055 Räven borstar tänderna (samma räv) och 026 (sovrummet).
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, s in]].
//
// Malins repliker, uppmätta (ffprobe, −3 dBFS; tagning 1a + de 15 tydligare 2026-11-25, grind 3 godkänd). Text ur ../rost.txt, längder ur ../rost-langder.txt.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-kritan-ritar', 1.92, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.97, 'Hm … vad blir det nu?'],
  ['03-en-nalle', 1.83, 'Oj! En nalle!'],
  ['04-hej-raven', 1.78, 'Hej, räven! Hej, hej!'],
  ['05-borstat-tanderna', 1.18, 'Har du borstat tänderna?'],
  ['06-ja-vad-bra', 0.83, 'Ja, vad bra!'],
  ['07-det-ar-kvall', 2.94, 'Det är kväll nu. Snart ska räven sova.'],
  ['08-dar-ar-nallen', 1.37, 'Och där är nallen!'],
  ['09-ska-nallen-sova', 1.60, 'Ska nallen också sova?'],
  ['10-ja-sa-klart', 1.41, 'Ja, så klart!'],
  ['11-upp-i-sangen', 1.78, 'Räven hoppar upp i sängen!'],
  ['12-kramar-nallen', 3.48, 'Mmm … räven kramar nallen.'],
  ['13-vad-mjuk', 2.14, 'Åh, vad mjuk nallen är!'],
  ['14-slacker-lampan', 1.49, 'Nu släcker vi lampan.'],
  ['15-sa-morkt', 5.28, 'Oj! Så mörkt! Räven ser ingenting.'],
  ['16-tycker-inte-om', 3.30, 'Räven tycker inte om när det är så mörkt.'],
  ['17-det-forstar-jag', 1.82, 'Nej, det förstår jag.'],
  ['18-vad-gor-vi-nu', 2.84, 'Hm … räven vill ha lite ljus.'],
  ['19-kritan-ritar-nagot', 2.87, 'Titta! Kritan ritar något.'],
  ['20-en-lampa', 0.98, 'En lampa!'],
  ['21-for-liten', 3.25, 'Klick … oj, lampan är för liten!'],
  ['22-ritar-igen', 2.23, 'Kritan ritar en ny lampa.'],
  ['23-for-stor', 4.66, 'Klick … oj, lampan är för stor! Så ljust!'],
  ['24-bort-med-den', 2.19, 'Kritan suddar bort den stora lampan.'],
  ['25-en-gang-till', 1.70, 'Kritan ritar en lampa till …'],
  ['26-lagom', 2.55, 'Klick … nu är lampan lagom!'],
  ['27-varsagod', 1.31, 'Varsågod, räven.'],
  ['28-sa-fint', 3.09, 'Oj, vad fint lampan lyser!'],
  ['29-ska-vi-saga-tack', 1.22, 'Ska vi säga tack?'],
  ['30-tack', 0.69, 'Tack!'],
  ['31-titta-pa-vaggen', 3.08, 'Oj! Titta, en skugga på väggen!'],
  ['32-stor-rav', 2.33, 'En stor räv på väggen!'],
  ['33-liten-rav', 2.00, 'Och en liten räv på väggen!'],
  ['34-tycker-du', 4.11, 'Jaså, tycker du att skuggan är rolig? Mm, jag också.'],
  ['35-var-ar-nallen', 4.80, 'Oj, var är nallen? Räven vet inte var.'],
  ['36-ser-du-nallen', 3.38, 'Kan du hjälpa räven? Ser du nallen?'],
  ['37-ja-dar', 2.43, 'Ja, där! Under täcket!'],
  ['38-dar-ar-nallen-igen', 1.32, 'Där är nallen!'],
  ['39-lilla-lampan', 3.00, 'Och den lilla lampan … den får nallen!'],
  ['40-lysa-hela-natten', 2.44, 'Lampan får lysa hela natten.'],
  ['41-ar-du-somnig', 1.16, 'Är du sömnig nu?'],
  ['42-det-horde-jag', 3.49, 'Ja, räven gäspar! Det hörde jag!'],
  ['43-hej-da-raven', 3.10, 'Hej då, räven! Hej då, nallen!'],
  ['44-vi-ses-snart', 3.68, 'Hej då! Vi ses snart!'],];
export const L = n => ROST[n - 1][1];

// Rävens röst (grind 4, Sanna 2026-11-25 "Pick the first takes"): rav-gullig-N, N = 1 hej, 2 förtjust, 3 kort fniss, 4 mysig suck,
// 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då. Långt fniss: rav-fniss-1 och -3. Aldrig samma rävljud två bilder i rad.
const RAV = (n, o) => ['rav-gullig/rav-gullig-' + n, o];
const FNISS = (n, o) => ['rav-fniss/rav-fniss-' + n, o];
const KLICK = o => ['lampa-klick/lampa-klick-1', o];
const SVAR = 1.6;       // rävens svar i pausen mellan Malins fråga och reaktion (snabbare: 2,0 → 1,6)
const R = 0.8;          // reaktionsslaget i närbild (0,6–1 s)

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s (bilderbokens intro sedan 021)', ljudtext: '–', ansikte: '–' },

  // --- Ritintrot: kritan ritar nallen (en sak, inte räven) ---
  { id: '01a', d: 3.2, plats: 'Papperet, helbild', malin: [[1, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2], ['skogsljud/skogsljud-1', 0.0]],
    bild: 'Kritan ritar nallens kontur i ett lugnt drag (ca 2,8 s): huvudet, öronen, kroppen, armarna, fötterna', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: L(2) + 2.6, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.5 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.5]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga nallen fylls i inifrån, krit-gnistor. Sista 0,8 s: zoom in i teckningen, in i sovrummet', ljudtext: 'glitter', ansikte: '–' },

  // --- Hej, kväll, nallen ---
  { id: '1', d: 1.6 + L(4) + 0.8, plats: 'Sovrummet, helbild', malin: [[4, 1.8]], ljud: [['tass/tass-1', 0.2], ['tass/tass-2', 0.8], RAV(1, 1.9 + L(4))],
    bild: 'Kvällsljus, rumslampan lyser. Räven går in från vänster, stannar på golvet framför huvudgaveln och vinkar (armen bakom kroppen). Nallen sitter på sängens fotände', ljudtext: 'tass, rav-gullig-1 (hej)', ansikte: 'glad' },
  { id: '1b', d: 0.3 + L(5) + SVAR + L(6) + 0.6, plats: 'Närbild ansiktet', malin: [[5, 0.3], [6, 0.3 + L(5) + SVAR]], ljud: [RAV(2, 0.5 + L(5))],
    bild: 'Räven visar tänderna i ett stort leende i pausen, sedan stolt (hakan upp)', ljudtext: 'rav-gullig-2 (förtjust)', ansikte: 'visar tänderna → stolt' },
  { id: '2', d: 0.4 + L(7) + 0.6, plats: 'Närbild fönstret', malin: [[7, 0.4]], ljud: [RAV(5, 0.6 + L(7))],
    bild: 'Kvällshimlen i fönstret, små stjärnor tänds', ljudtext: 'rav-gullig-5 (nyfiken)', ansikte: '–' },
  { id: '3', d: 0.4 + L(8) + 0.3, plats: 'Detalj nallen på fotänden', malin: [[8, 0.4]], ljud: [['glimt/glimt-1', 0.1]],
    bild: 'Nallen på sängens fotände, ett litet skimmer på ordet *nallen*', ljudtext: 'glimt', ansikte: '–' },
  { id: '3r', d: R, plats: 'Närbild ansiktet', ljud: [RAV(3, 0.1)],
    bild: '**Reaktion:** räven ser nallen, jätteglad, öronen upp, svansen viftar', ljudtext: 'rav-gullig-3 (kort fniss)', ansikte: 'jätteglad' },
  { id: '3b', d: 0.3 + L(9) + SVAR + L(10) + 0.6, plats: 'Halvbild', malin: [[9, 0.3], [10, 0.3 + L(9) + SVAR]], ljud: [RAV(7, 0.5 + L(9))],
    bild: 'Räven tittar på nallen och sedan på sängen, öronen vippar, "pratar" i pausen', ljudtext: 'rav-gullig-7 (pratar)', ansikte: 'nyfiken → glad' },
  { id: '4', d: 0.9 + L(11) + 0.4, plats: 'Halvbild sängen', malin: [[11, 0.9]], ljud: [['hopp-mjuk/hopp-mjuk-1', 0.0], ['puff/puff-1', 0.7], ['nalle-hopp/nalle-hopp-1', 0.8]],
    bild: 'Räven hoppar upp (0,7 s) över madrasskanten och landar bakom den, nallen glider upp bredvid kudden. Rörelsen först, sedan Malin', ljudtext: 'hopp, puff, nalle-hopp', ansikte: 'glad' },
  { id: '5', d: 0.6 + L(12) + SVAR + L(13) + 0.6, plats: 'Närbild ansiktet och nallen', malin: [[12, 0.6], [13, 0.6 + L(12) + SVAR]], ljud: [['prassel-tyg/prassel-tyg-1', 0.1], RAV(4, 0.8 + L(12))],
    bild: 'Räven lutar sig mot nallen och sluter ögonen, myser. Täcket ligger över magen', ljudtext: 'prassel, rav-gullig-4 (mysig suck)', ansikte: 'kawaii, blundar' },

  // --- Mörkt ---
  { id: '6', d: 0.3 + L(14) + 0.3, plats: 'Närbild rumslampan', malin: [[14, 0.3]], ljud: [KLICK(0.3 + L(14) - 0.4)],
    bild: 'Rumslampan på nattduksbordet: skenet släcks på *lampan* (0,4 s), rummet blir kvällsblått', ljudtext: 'lampa-klick', ansikte: '–' },
  { id: '7', d: 0.6 + L(15) + 0.5, plats: 'Närbild ansiktet, mörkt', malin: [[15, 0.6]], ljud: [RAV(5, 0.2)],
    bild: '**Reaktion:** stora ögon (förvånad, 0,3 s stilla), sedan lite rädd: öronen bakåt, svansen tätt intill, ögonen åt sidorna. Varmt kvällsblått, aldrig svart', ljudtext: 'rav-gullig-5', ansikte: 'förvånad → lite rädd' },
  { id: '8', d: 0.4 + L(16) + SVAR + L(17) + 0.6 + L(18) + 0.5, plats: 'Närbild ansiktet', malin: [[16, 0.4], [17, 0.4 + L(16) + SVAR], [18, 0.4 + L(16) + SVAR + L(17) + 0.6]], ljud: [RAV(6, 0.6 + L(16))],
    bild: 'Öronen faller 12°, trynet sjunker, svansen sjunker. Räven svarar trumpet i pausen', ljudtext: 'rav-gullig-6 (trumpen)', ansikte: 'lite ledsen' },

  // --- Kritan ritar nattlampan tre gånger ---
  { id: '9a', d: 0.3 + L(19) + 0.8, plats: 'Detalj golvet vid huvudgaveln', malin: [[19, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3]],
    bild: 'Kritan flyger in och ritar en liten lampa på golvet (skärmens rundel, foten, sladden)', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '9b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s: konturen klar, kritan svävar och svajar (knackar aldrig)', ljudtext: 'tyst', ansikte: '–' },
  { id: '10', d: 0.2 + L(20) + 0.2 + L(21) + 0.3, plats: 'Detalj den lilla lampan', malin: [[20, 0.2], [21, 0.4 + L(20)]], ljud: [['glitter/glitter-2', 0.0], KLICK(0.4 + L(20) + 0.1)],
    bild: 'Den lilla lampan fylls i, tänds på *Klick*: en pytteliten prick av ljus', ljudtext: 'glitter, klick', ansikte: '–' },
  { id: '10r', d: R, plats: 'Närbild ansiktet', ljud: [RAV(5, 0.1)],
    bild: '**Reaktion:** räven tittar ner på den lilla lampan, tänker, ett öra vickar', ljudtext: 'rav-gullig-5', ansikte: 'tänker' },
  { id: '11', d: 0.3 + L(22) + 1.6, plats: 'Sovrummet, helbild', malin: [[22, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.2], ['glitter/glitter-3', 0.3 + L(22) + 1.0]],
    bild: 'Kritan ritar en jättestor lampa på samma ställe, högre än fönstret, och den fylls i', ljudtext: 'kritan ritar, glitter', ansikte: 'nyfiken, tittar upp' },
  { id: '12', d: 0.2 + L(23) + 0.3, plats: 'Sovrummet, helbild', malin: [[23, 0.2]], ljud: [KLICK(0.25)],
    bild: 'Klick: hela rummet blir alldeles ljust', ljudtext: 'klick', ansikte: 'kniper ihop ögonen' },
  { id: '12r', d: 1.4, plats: 'Närbild ansiktet', ljud: [FNISS(1, 0.0)],
    bild: '**Reaktion:** räven kniper ihop ögonen (bågögon) och fnissar, öronen bakåt, svansen viftar', ljudtext: 'rav-fniss-1', ansikte: 'fnissig' },
  { id: '13', d: 0.4 + L(24) + 0.6, plats: 'Sovrummet, helbild', malin: [[24, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.4], ['glimt/glimt-2', 0.4 + L(24)]],
    bild: 'Kritan suddar den stora lampan (linjen baklänges), det blir mörkt igen. Den lilla lampan glider till fotänden', ljudtext: 'kritan baklänges, glimt', ansikte: 'nyfiken' },
  { id: '14', d: 0.3 + L(25) + 1.2, plats: 'Halvbild', malin: [[25, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3], ['glitter/glitter-1', 0.3 + L(25) + 0.6]],
    bild: 'Kritan ritar en lagom lampa, lika hög som huvudgaveln, och den fylls i', ljudtext: 'kritan ritar, glitter', ansikte: 'nyfiken' },
  { id: '15', d: 0.2 + L(26) + 0.3 + L(27) + SVAR + L(28) + 0.5, plats: 'Halvbild', malin: [[26, 0.2], [27, 0.5 + L(26)], [28, 0.5 + L(26) + L(27) + SVAR]], ljud: [KLICK(0.25), ['tindra/tindra-1', 0.6], RAV(4, 0.7 + L(26) + L(27))],
    bild: 'Klick: ett mjukt varmt sken över sängen och räven, resten av rummet kvällsblått. *Varsågod*', ljudtext: 'klick, tindra, rav-gullig-4 (lättad suck)', ansikte: 'lättad → kawaii' },
  { id: '15r', d: R, plats: 'Närbild ansiktet', bild: '**Reaktion:** lättad, kawaii-ögon i lampans sken, öronen reser sig', ljudtext: 'tyst', ansikte: 'kawaii' },
  { id: '16', d: 0.2 + L(29) + 2.5 + L(30) + 0.6, plats: 'Halvbild', malin: [[29, 0.2], [30, 0.2 + L(29) + 2.5]], ljud: [RAV(2, 0.3 + L(29) + 2.5 + L(30))],
    bild: 'Paus 2,5 s: barnet säger tack. Räven nickar direkt på *Tack!*, stolt', ljudtext: 'rav-gullig-2 (förtjust)', ansikte: 'nyfiken → stolt' },

  // --- Leken: skuggan stor och liten ---
  { id: '17', d: 0.4 + L(31) + 0.3, plats: 'Sovrummet, helbild', malin: [[31, 0.4]], ljud: [RAV(5, 0.5 + L(31))],
    bild: 'Rävens mjuka, ljust lila skugga syns på väggen bakom den', ljudtext: 'rav-gullig-5', ansikte: 'förvånad' },
  { id: '18', d: 0.7 + L(32) + 0.3, plats: 'Sovrummet, helbild', malin: [[32, 0.7]], ljud: [['glimt/glimt-1', 0.0], RAV(7, 0.8 + L(32))],
    bild: 'Den lagom lampan glider närmare (0,6 s): skuggan växer nästan till taket. Rörelsen först', ljudtext: 'glimt, rav-gullig-7 (pratar)', ansikte: 'glad' },
  { id: '19', d: 0.7 + L(33) + 0.2, plats: 'Sovrummet, helbild', malin: [[33, 0.7]], ljud: [['glimt/glimt-2', 0.0], FNISS(3, 0.7 + L(33) - 0.4)],
    bild: 'Lampan glider tillbaka: skuggan blir liten. Räven vickar på öronen, skuggan vickar med', ljudtext: 'glimt, rav-fniss-3', ansikte: 'skrattar' },
  { id: '19b', d: SVAR + L(34) + 0.6, plats: 'Närbild ansiktet', malin: [[34, SVAR]], ljud: [RAV(7, 0.2)],
    bild: 'Räven tittar på oss och "pratar" om skuggorna, öronen vippar', ljudtext: 'rav-gullig-7 (pratar)', ansikte: 'glad' },

  // --- Var är nallen? ---
  { id: '20', d: 0.6 + L(35) + 0.6, plats: 'Halvbild', malin: [[35, 0.6]], ljud: [RAV(5, 0.2)],
    bild: 'Nallens plats bredvid räven är tom. Räven tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte)', ljudtext: 'rav-gullig-5', ansikte: 'förvånad → lite ledsen' },
  { id: '21', d: 0.3 + L(36) + 5.0, plats: 'Halvnära → detalj täcket (klipp)', malin: [[36, 0.3]], ljud: [['lysmask/lysmask-1', 0.3 + L(36) + 3.0]],
    bild: 'Frågan över sängen, efter 1 s klipp till detalj på täcket: en bula och ett öra som sticker fram. Örat skimrar svagt efter 3 s. Paus 5,5 s (med GLES)', ljudtext: 'lysmask lågt efter 3 s', ansikte: '–' },
  { id: '22', d: 0.3 + L(37) + 0.3, plats: 'Detalj täcket', malin: [[37, 0.3]], ljud: [['tindra/tindra-2', 0.1], RAV(3, 0.4 + L(37))],
    bild: 'Örat skimrar tydligt', ljudtext: 'tindra, rav-gullig-3 (kort fniss)', ansikte: '–' },
  { id: '23', d: 0.9 + L(38) + 0.3, plats: 'Halvbild', malin: [[38, 0.9]], ljud: [['prassel-tyg/prassel-tyg-1', 0.0], ['nalle-hopp/nalle-hopp-2', 0.6]],
    bild: 'Nallen glider upp ur täcket och sätter sig bredvid räven. Rörelsen först', ljudtext: 'prassel, nalle-hopp', ansikte: 'lättad' },
  { id: '23r', d: R, plats: 'Närbild ansiktet', ljud: [RAV(2, 0.1)],
    bild: '**Reaktion:** jätteglad, armarna lugnt upp (hurra, inget hopp), svansen viftar', ljudtext: 'rav-gullig-2 (förtjust)', ansikte: 'jätteglad' },
  { id: '24', d: 0.8 + L(39) + 0.4, plats: 'Detalj den lilla lampan och nallen', malin: [[39, 0.8]], ljud: [['glimt/glimt-1', 0.1], RAV(7, 0.9 + L(39))],
    bild: 'Den lilla lampan glider upp på sängkanten bredvid nallen, dess lilla sken lyser runt nallen', ljudtext: 'glimt, rav-gullig-7', ansikte: 'stolt' },

  // --- Sömnig, hej då, somnar (lugnare) ---
  { id: '25', d: 0.6 + L(40) + 1.0, plats: 'Halvbild', malin: [[40, 0.6]], ljud: [RAV(4, 0.8 + L(40))],
    bild: 'Räven tittar på den lagom lampan, mysigt', ljudtext: 'rav-gullig-4 (mysig suck)', ansikte: 'sömnig' },
  { id: '25b', d: 0.3 + L(41) + 2.0 + L(42) + 0.8, plats: 'Närbild ansiktet', malin: [[41, 0.3], [42, 0.3 + L(41) + 2.0]], ljud: [['gaspning/gaspning-1', 0.5 + L(41)]],
    bild: 'Räven gäspar stort i pausen (O-mun, ögonen kniper ihop), öronen sjunker', ljudtext: 'gäspning', ansikte: 'gapar → sömnig' },
  { id: '26', d: 0.8 + L(43) + 1.0, plats: 'Halvbild', malin: [[43, 0.8]], ljud: [RAV(8, 1.0 + L(43))],
    bild: 'Räven vinkar sömnigt, långsamt (armen bakom kroppen). **Hej då med vinkning**', ljudtext: 'rav-gullig-8 (hej då)', ansikte: 'sömnig, glad' },
  { id: '27', d: 1.6 + L(44) + 2.2, plats: 'Halvbild sängen', malin: [[44, 1.6]], ljud: [['prassel-tyg/prassel-tyg-1', 0.6], ['snark-pip/snark-pip-1', 1.8 + L(44)], ['godnatt-pling/godnatt-pling-1', 2.8 + L(44)]],
    bild: 'Räven sluter ögonen och lägger sig på sidan med huvudet på kudden (sovbilden tar över i det mörkaste), täcket upp till hakan, nallen bredvid, båda lamporna lyser, zzz', ljudtext: 'prassel, snark-pip, godnatt-pling', ansikte: 'sover' },
  { id: '28', d: 2.0, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt räven, nallen och den lagom lampan, 0,6 s svart', ljudtext: '–', ansikte: 'sover' },
];

// Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in; frågor före. Snabbare tempo (Sanna 2026-11-25): 0,4 s extra luft,
// slutet (25–27) lugnare 0,9 s. Pauserna för barnet (9b 3 s, 16 2,5 s, 21 5,5 s) står i raderna.
export const GLES = 0.4, GLES_SLUT = 0.9;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += ['25', '25b', '26', '27'].includes(r.id) ? GLES_SLUT : GLES;
