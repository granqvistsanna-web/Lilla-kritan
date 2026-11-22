// Storyboardens rader för 035 Katten hittar julklappar: ett uppslag per rad (manus.md). Som 024:s rader.mjs.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, sekunder in i raden]].
// Malins repliker: assets/ljud/roster/katten-hittar-julklappar/<namn>.m4a (../rost.txt), längderna ur ../rost-langder.txt (2026-11-13).
export const ROST = [
  ['01-kritan-ritar', 'Kritan ritar …', 2.09],
  ['02-vad-blir-det', 'Hm … vad blir det nu?', 1.91],
  ['03b-ett-paket', '… ett paket!', 1.19],   // 2026-11-22 (J06 "draw julklapp istället för katt"): slutet av 25-grav-grav, 2,52 s →
  ['04-hej-katten', 'Hej, katten! Hej, hej!', 2.75],
  ['05-mycket-sno', 'Oj, vad mycket snö!', 1.50],
  ['06-tassar-i-snon', 'Titta, tassar i snön!', 2.92],
  ['07-fryser', 'Brr! Katten fryser visst.', 2.55],
  ['08-leka-i-snon', 'Ska vi leka i snön?', 1.32],
  ['09-vill-ga-in', 'Oj då. Katten vill visst gå in.', 2.53],
  ['10-vad-gor-vi', 'Hm … vad gör vi nu?', 2.18],
  ['11-kritan-ritar-nagot', 'Titta! Kritan ritar något.', 2.46],
  ['12-en-tomteluva', 'En tomteluva! Varsågod, katten.', 3.26],
  ['13-saga-tack', 'Ska vi säga tack?', 1.19],
  ['14-tack', 'Tack!', 1.15],
  ['15-varmt-och-skont', 'Mmm … varmt och skönt.', 3.10],
  ['16-fangar-snoflingor', 'Oj! Katten fångar snöflingor!', 2.94],
  ['17-sno-pa-nosen', 'Ha ha! Snö på nosen!', 2.39],
  ['18-nagot-rott', 'Titta! Något rött i snön.', 2.34],
  ['19-grava-fram', 'Ska du gräva fram det?', 1.31],
  ['20-forst-har', 'Först här. Gräv, gräv … ett paket!', 5.01],
  ['21-och-har', 'Och här. Gräv, gräv … ett paket!', 5.13],
  ['22-ett-ar-kvar', 'Oj, ett paket är kvar. Katten vet inte var.', 4.27],
  ['23-kan-du-hjalpa', 'Kan du hjälpa katten? Kan du se var paketet är?', 3.80],
  ['24-ja-dar', 'Ja, där! Ja, bakom katten!', 3.26],
  ['25-grav-grav', 'Gräv, gräv … ett paket!', 3.71],
  ['26-sa-manga', 'Oj, så många paket!', 1.99],
  ['27-kritan-ritar-igen', 'Titta! Kritan ritar igen.', 2.33],
  ['28-en-pulka', 'En pulka! Varsågod, katten.', 4.24],
  ['29-tack-kritan', 'Tack, kritan!', 1.25],
  ['30-ett-tva-tre', 'Ett paket … två paket … tre paket!', 4.86],
  ['31-dra-hem', 'Nu kan katten dra hem paketen.', 2.11],
  ['32b-saga-god-jul', 'Kan du säga god jul?', 1.78],
  ['33-god-jul', 'God jul!', 1.09],
  ['34-hej-da-katten', 'Hej då, katten! Hej då, paketen!', 2.81],
  ['35-vi-ses-snart', 'Hej då! Vi ses snart!', 2.56]];

const r2 = x => Math.round(x * 100) / 100;
export const L = n => ROST[n - 1][2];
// Ordtider inne i replikerna (silencedetect −35 dB, 2026-11-13): de två "gräv" och "ett paket", och "paket" ×3 i replik 30.
export const GRAV = { 20: [1.42, 2.57], 21: [1.24, 2.57], 25: [0.0, 1.24] };
export const PAKET = { 20: 3.85, 21: 3.92, 25: 2.57 };
export const TRE = [0.5, 2.2, 4.0];

// Kattens röst: mjau-gullig, en känsla per nummer (format/bilderbok.md): 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken,
// 6 trumpen, 7 pratar, 8 hej då.
const M = n => `mjau-gullig/mjau-gullig-${n}`;
export const MJ = { hej: M(1), fortjust: M(2), fniss: M(3), mysig: M(4), nyfiken: M(5), trumpen: M(6), pratar: M(7), hejda: M(8) };

// Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in; frågor kommer före.
// 2026-11-22 (feedback J06 "more new cute animal sounds"): blandat med 044:s kattunge (mjau-trill, -ooo, -oj, -spinn, -puttar)
// och Sannas nya tagningar 22/11 (mjau-aah, -fraga, -glad, -prat). mjau-gullig är kvar för tack, trumpen och hej då.
export const RADER = [
  { id: '01a', d: 6.0, plats: 'Papperet', malin: [[1, 3.0]], bild: 'Kritan ritar paketets kontur, halvvägs', ljudtext: 'kritan ritar, vintermatta' },
  { id: '01b', d: 7.5, plats: 'Papperet', malin: [[2, 0.0]], bild: 'Konturen klar, kritan väntar: barnet gissar', ljudtext: 'kritan ritar' },
  { id: '01c', d: 0.4 + L(3) + 0.9 + 1.8, plats: 'Papperet → hålet', malin: [[3, 0.4]], ljud: [['pling/pling-1', 0.0], ['swoosh/swoosh-1', 0.4 + L(3) + 0.9]], bild: 'Paketet fylls i, gnistor, kritan flyger ut; hål i papperet in mot björkdungen (1,8 s)', ljudtext: 'pling, swoosh' },

  { id: '1', d: 2.8 + L(4) + 1.4, plats: 'Helbild', malin: [[4, 2.8]], ljud: [['mjau-glad/mjau-glad-3', 3.1 + L(4)]], bild: 'Katten trippar in från höger, tassavtryck, vinkar', ljudtext: 'tass, hej-mjau' },
  { id: '2', d: 0.5 + L(5) + 1.6, plats: 'Halvbild', malin: [[5, 0.5]], ljud: [['mjau-trill/mjau-trill-2', 0.8 + L(5)]], bild: 'Tittar upp på flingorna, litet skutt', ljudtext: 'förtjust mjau' },
  { id: '3', d: 0.4 + L(6) + 1.8, plats: 'Närbild tassavtrycken', malin: [[6, 0.4]], ljud: [['mjau-oj/mjau-oj-1', 0.8 + L(6)]], bild: 'Tassavtrycken i snön', ljudtext: 'nyfiket mjau' },
  { id: '4', d: 0.6 + L(7) + 1.6, plats: 'Halvbild', malin: [[7, 0.8]], ljud: [['huttra/huttra-1', 0.2], ['mjau-oj/mjau-oj-2', 1.6]], bild: 'Katten darrar tre gånger', ljudtext: 'huttra' },
  { id: '5', d: 0.3 + L(8) + 2.2, plats: 'Helbild', malin: [[8, 0.3]], ljud: [[MJ.trumpen, 0.6 + L(8)]], bild: 'Skakar på huvudet', ljudtext: 'trumpet mjau' },
  { id: '6', d: 0.9 + L(9) + 1.0 + L(10) + 1.3, plats: 'Närbild', malin: [[9, 0.9], [10, 1.9 + L(9)]], bild: 'Huttrar (brr), tittar bort åt vänster', ljudtext: 'brr' },
  { id: '7a', d: 1.3 + L(11) + 0.8, plats: 'Helbild', malin: [[11, 1.3]], bild: 'Kritan kommer in', ljudtext: '–' },
  { id: '7b', d: 6.8, plats: 'Närbild snön', bild: 'Kritan ritar tomteluvan på snön (3,5 s), gisspaus', ljudtext: 'kritan ritar' },
  { id: '7c', d: 0.6 + L(12) + 0.6, plats: 'Närbild snön', malin: [[12, 0.6]], ljud: [['glitter/glitter-1', 0.0]], bild: 'Luvan fylls i, kritan flyger iväg', ljudtext: 'glitter' },
  { id: '8', d: 2.8, plats: 'Halvbild', ljud: [['swoosh/swoosh-1', 0.2], ['mjau-aah/mjau-aah-2', 1.9]], bild: 'Luvan glider upp på huvudet', ljudtext: 'swoosh, förtjust mjau' },
  { id: '9', d: 0.3 + L(13) + 1.8, plats: 'Halvbild', malin: [[13, 0.3]], ljud: [['mjau-fraga/mjau-fraga-3', 0.6 + L(13)]], bild: 'Tittar upp mot luvan. Paus 2,5 s', ljudtext: 'nyfiket mjau' },
  { id: '10', d: L(14) + 1.0, plats: 'Halvbild', malin: [[14, 0.0]], ljud: [[MJ.fortjust, L(14) + 0.2]], bild: 'Nickar på Tack!', ljudtext: 'förtjust mjau' },
  { id: '11', d: 0.6 + L(15) + 1.8, plats: 'Närbild', malin: [[15, 0.6]], ljud: [['mjau-spinn/mjau-spinn-1', 0.8 + L(15)]], bild: 'Blundar nöjt, svansen viftar', ljudtext: 'spinn' },
  { id: '12', d: 1.4 + L(16) + 2.6, plats: 'Halvbild', malin: [[16, 1.4]], ljud: [['mjau-trill/mjau-trill-1', 1.7 + L(16)]], bild: 'Flingor singlar ner, tassen upp mot dem', ljudtext: 'förtjust mjau' },
  { id: '13', d: 1.6 + L(17) + 1.8, plats: 'Närbild', malin: [[17, 1.6]], ljud: [['mjau-glad/mjau-glad-2', 1.9 + L(17)]], bild: 'Flingan landar på nosen, litet nys', ljudtext: 'fniss' },
  { id: '14', d: 1.2 + L(18) + 2.0, plats: 'Helbild → närbild hörnet', malin: [[18, 1.2]], ljud: [['glimt/glimt-1', 0.5]], bild: 'Ett rött hörn vid trappan', ljudtext: 'glimt' },
  { id: '15', d: 0.3 + L(19) + 1.6, plats: 'Halvbild', malin: [[19, 0.3]], ljud: [['mjau-ooo/mjau-ooo-2', 0.6 + L(19)]], bild: 'Tittar mot hörnet, öronen upp', ljudtext: 'förtjust mjau' },
  { id: '15b', d: 3.0, plats: 'Helbild', bild: 'Katten går till trappan', ljudtext: 'tass' },
  { id: '16', d: 0.7 + L(20) + 1.6, plats: 'Närbild trappan', malin: [[20, 0.7]], ljud: [['pling/pling-1', 0.7 + PAKET[20] + 0.3]], bild: 'Gräver, paketet kommer upp', ljudtext: 'puff ×2, pling' },
  { id: '16b', d: 3.8, plats: 'Helbild', ljud: [['glimt/glimt-2', 0.3]], bild: 'Ett rött hörn under granen, katten går dit', ljudtext: 'tass, glimt' },
  { id: '17', d: 0.7 + L(21) + 1.6, plats: 'Närbild granen', malin: [[21, 0.7]], ljud: [['pling/pling-2', 0.7 + PAKET[21] + 0.3]], bild: 'Gräver, paketet kommer upp', ljudtext: 'puff ×2, pling' },
  { id: '18', d: 2.6 + L(22) + 2.0, plats: 'Helbild → halvbild', malin: [[22, 2.6]], ljud: [['mjau-oj/mjau-oj-2', 2.9 + L(22)]], bild: 'Går tillbaka till mitten, tittar åt sidorna', ljudtext: 'tass, nyfiket mjau' },
  { id: '19', d: 0.3 + L(23) + 5.0, plats: 'Helbild → närbild rosetten', malin: [[23, 0.3]], ljud: [['glimt/glimt-1', 3.6 + L(23)]], bild: 'Rosetten bakom katten, svansen viftar. Paus 5 s', ljudtext: 'tyst, glimt' },
  { id: '20', d: 0.4 + L(24) + 1.4, plats: 'Närbild rosetten', malin: [[24, 0.4]], ljud: [['glimt/glimt-2', 0.0], ['mjau-aah/mjau-aah-3', 0.6 + L(24)]], bild: 'Rosetten skimrar, katten tittar bakåt', ljudtext: 'glimt, förtjust mjau' },
  { id: '21', d: 1.4 + L(25) + 1.8, plats: 'Halvbild', malin: [[25, 1.4]], ljud: [['pling/pling-3', 1.4 + PAKET[25] + 0.3], ['mjau-glad/mjau-glad-4', 1.9 + L(25)]], bild: 'Ett steg, gräver, det sista paketet kommer upp', ljudtext: 'puff, pling, fniss' },
  { id: '22', d: 0.3 + L(26) + 1.0 + L(10) + 1.3, plats: 'Helbild', malin: [[26, 0.3], [10, 1.3 + L(26)]], ljud: [['mjau-fraga/mjau-fraga-1', 0.6 + L(26)]], bild: 'Tre paket på snön', ljudtext: 'nyfiket mjau' },
  { id: '23a', d: 1.3 + L(27) + 0.8, plats: 'Helbild', malin: [[27, 1.3]], bild: 'Kritan kommer in igen', ljudtext: '–' },
  { id: '23b', d: 7.0, plats: 'Närbild snön', bild: 'Kritan ritar pulkan (4 s), gisspaus 3 s', ljudtext: 'kritan ritar' },
  { id: '23c', d: 0.6 + L(28) + 0.6, plats: 'Närbild snön', malin: [[28, 0.6]], ljud: [['glitter/glitter-2', 0.0]], bild: 'Pulkan fylls i', ljudtext: 'glitter' },
  { id: '24', d: 0.3 + L(29) + 1.6, plats: 'Halvbild', malin: [[29, 0.3]], ljud: [['mjau-aah/mjau-aah-1', 0.6 + L(29)]], bild: 'Katten nickar, kritan flyger ut', ljudtext: 'förtjust mjau' },
  { id: '25', d: 0.6 + L(30) + 1.6, plats: 'Helbild', malin: [[30, 0.6]], ljud: TRE.map((t, i) => ['duns/duns-' + (i + 1), 0.6 + t + 0.1]), bild: 'Paketen hoppar upp på pulkan, ett i taget på orden', ljudtext: 'duns ×3' },
  { id: '26', d: 0.6 + L(31) + 2.6, plats: 'Helbild', malin: [[31, 0.6]], ljud: [['mjau-puttar/mjau-puttar-1', 0.9 + L(31)], ['fagel-pip/fagel-pip-2', 0.6 + L(31) + 1.55]], bild: 'Katten drar pulkan tre steg åt höger, fågeln flyger ner på paketen', ljudtext: 'tass, förtjust mjau' },
  { id: '27', d: 0.6 + L(32) + 4.0, plats: 'Halvbild', malin: [[32, 0.6]], ljud: [['mjau-prat/mjau-prat-1', 2.6 + L(32)]], bild: 'Tittar på oss, mjauar som om hon säger god jul', ljudtext: 'pratar-mjau' },
  { id: '28', d: L(33) + 1.4, plats: 'Halvbild', malin: [[33, 0.0]], ljud: [['mjau-trill/mjau-trill-2', L(33) + 0.2]], bild: 'Litet glatt skutt', ljudtext: 'förtjust mjau' },
  { id: '29', d: 0.6 + L(34) + 1.6, plats: 'Halvbild', malin: [[34, 0.6]], ljud: [[MJ.hejda, 0.9 + L(34)]], bild: 'Vinkar, pulkan bredvid', ljudtext: 'hej då-mjau' },
  { id: '30', d: 0.3 + L(35) + 1.6, plats: 'Halvbild', malin: [[35, 0.3]], ljud: [['mjau-spinn/mjau-spinn-2', 0.5 + L(35)]], bild: 'Vinkar klart', ljudtext: 'fniss' },
  { id: '31', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen runt katten och pulkan', ljudtext: 'mattan klingar ut' },
];

export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
for (const r of RADER) r.d = r2(r.d);
