// Storyboardens rader för 053 Leoparden städar (förlaga: 057 och 027): en stillbild per utsnitt i ../manus.md (SOVRUMMET).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html
// och animatiken. d = radens längd i s. malin = [[replikens nr i ROST, s in i raden]]. ljud = [[fil under
// assets/ljud/effekter/ utan .m4a, s in i raden, volym (valfri, 0,7)]].
// Malins repliker och längder läses ur ../rost.txt och ../rost-langder.txt (tagning 1a, 16 tydligare ur 2b, −3 dBFS).
// Tempot efter Sannas feedback 2026-11-25: reaktionsslag 0,6–1 s i närbild, korta stillbilder, barnets pauser orörda.
import { readFileSync } from 'node:fs';
const HÄR = new URL('./', import.meta.url).pathname;
const langd = Object.fromEntries(readFileSync(HÄR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const UPPSKATTAD = false;
export const TITEL = 'Leoparden städar', ROSTMAPP = 'leoparden-stadar';
export const ROST = readFileSync(HÄR + '../rost.txt', 'utf8').trim().split('\n').map(l => { const [n, ...r] = l.split(/\s+/);
  return [n, langd[n], r.join(' ').replace(/^\[[^\]]+\]\s*/, '')]; });
export const L = n => ROST[n - 1][1];

const S = (n, o, v) => [`spinn-gullig/spinn-gullig-${n}`, o, v];   // 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då
const FN = (n, o, v) => [`spinn-fniss/spinn-fniss-${n}`, o, v];
const E = (n, k, o, v) => [`${n}/${n}-${k}`, o, v];
const PLOPP = o => [E('plopp', 1, o), E('klonk', 1, o - 0.04, 0.35), E('glitter', 2, o + 0.05, 0.5)];

export const RADER = [
  { id: '00', d: 3.3, plats: 'Intro', bild: 'Seriens intro *Djuren hittar på!* (`produktion/youtube/bilderbok-intro/`, 3,3 s)', ljudtext: 'introts jingel och röst', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, H', malin: [[1, 3.0]], ljud: [E('skogsljud', 1, 0, 0.35), E('krita-ritar', 1, 0.3)],
    bild: 'Kritan ritar trekantens kontur i ett lugnt drag (ca 2,8 s)', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: 0.3 + L(2) + 3.4, plats: 'Papperet, H', malin: [[2, 0.3]], ljud: [E('skogsljud', 1, 0, 0.35)],
    bild: 'Konturen är klar, kritan väntar och vajar: gisspaus 3 s', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [E('glitter', 1, 0)],
    bild: 'Den gröna trekanten fylls i inifrån. Sista 0,8 s: zoom in', ljudtext: '`glitter`', ansikte: '–' },

  { id: '1', d: 1.4 + L(4) + 0.8, plats: 'Sovrummet, H', malin: [[4, 1.4]], ljud: [E('smasteg', 1, 0.1), S(1, 1.5 + L(4))],
    bild: 'Klossarna på golvet, korgen full vid väggen. Leoparden går in från vänster (1,2 s), stannar och vinkar', ljudtext: '`smasteg`, spinn hej', ansikte: 'glad' },
  { id: '1b', d: 0.3 + L(5) + 1.4 + L(6) + 0.8, plats: 'N', malin: [[5, 0.3], [6, 0.3 + L(5) + 1.4]], ljud: [S(7, 0.5 + L(5)), S(2, 0.4 + L(5) + 1.4 + L(6))],
    bild: 'Leoparden tittar på klossarna, sedan på oss. **Pausen:** pratande spinn', ljudtext: 'spinn 7 i pausen, spinn 2 efter', ansikte: 'nyfiken → jätteglad' },
  { id: '2', d: 0.3 + L(7) + 1.0, plats: 'D golvet → N', malin: [[7, 0.3]], ljud: [FN(1, 0.4 + L(7))],
    bild: 'Klossarna på golvet, sedan leopardens fniss', ljudtext: 'fniss 1', ansikte: 'fnissig' },
  { id: '3a', d: 0.2 + L(8) + 0.2, plats: 'D cirkeln', malin: [[8, 0.2]], ljud: [E('glimt', 1, 0.1, 0.4)], bild: 'Cirkeln glimtar', ljudtext: '`glimt`', ansikte: '–' },
  { id: '3b', d: 0.1 + L(9) + 0.2, plats: 'D fyrkanten', malin: [[9, 0.1]], ljud: [E('glimt', 2, 0.1, 0.4)], bild: 'Fyrkanten glimtar', ljudtext: '`glimt`', ansikte: '–' },
  { id: '3c', d: 0.1 + L(10) + 0.5, plats: 'D trekanten', malin: [[10, 0.1]], ljud: [E('glimt', 1, 0.1, 0.4)], bild: 'Trekanten glimtar', ljudtext: '`glimt`', ansikte: '–' },
  { id: '4', d: 0.3 + L(11) + 1.3 + L(12) + 0.8, plats: 'N', malin: [[11, 0.3], [12, 0.3 + L(11) + 1.3]], ljud: [S('2b', 0.5 + L(11)), S(3, 0.4 + L(11) + 1.3 + L(12))],
    bild: 'Leoparden nickar två gånger, öronen reser sig, svansen vippar', ljudtext: 'spinn 2b i pausen, 3 efter', ansikte: 'ivrig' },
  { id: '5a', d: 0.9, plats: 'D tassen', ljud: [E('tass', 1, 0.2)], bild: 'Tassen puffar cirkeln mot korgen', ljudtext: '`tass`', ansikte: '–' },
  { id: '5b', d: 1.9, plats: 'HB korgen', ljud: [E('vick', 1, 0.6, 0.6), E('duns', 1, 1.5, 0.5)], bild: 'Cirkeln glider upp på leksakshögen, vickar och glider ner framför korgen', ljudtext: '`vick`, `duns` lågt', ansikte: 'nyfiken' },
  { id: '5c', d: 0.4 + L(13) + 0.8, plats: 'N', malin: [[13, 0.4]], ljud: [S('5b', 0.5 + L(13))], bild: 'Öronen upp, 0,3 s stilla', ljudtext: 'spinn 5b', ansikte: 'förvånad' },
  { id: '6', d: 0.4 + L(14) + 0.7, plats: 'D korgen → N', malin: [[14, 0.4]], bild: 'Nallen, bollen, bilen, hinken och båten i en hög. Leoparden lutar huvudet', ljudtext: 'tyst', ansikte: 'tänker' },
  { id: '7a', d: 0.8, plats: 'D tassen', ljud: [E('tass', 2, 0.2)], bild: 'Tassen puffar fyrkanten', ljudtext: '`tass`', ansikte: '–' },
  { id: '7b', d: 0.3 + L(15) + 0.6, plats: 'HB korgen', malin: [[15, 0.3]], ljud: [E('vick', 1, 0.4, 0.6), E('duns', 2, 1.4, 0.5)], bild: 'Fyrkanten upp, vickar, ner igen', ljudtext: '`vick`, `duns` lågt', ansikte: 'nyfiken' },
  { id: '8', d: 0.9 + L(16) + 0.6, plats: 'N', malin: [[16, 0.9]], ljud: [S(6, 0.1)], bild: 'Öronen faller, huvudet lutar, svansen hänger', ljudtext: 'spinn 6 (trumpen) före', ansikte: 'ledsen' },
  { id: '9', d: 0.3 + L(17) + 1.0, plats: 'N', malin: [[17, 0.3]], bild: 'Leoparden tittar på oss', ljudtext: 'tyst', ansikte: 'tänker' },
  { id: '10a', d: 0.3 + L(18) + 0.3 + 4.0, plats: 'HB golvet', malin: [[18, 0.3]], ljud: [E('krita-ritar', 1, 0.6 + L(18))], bild: 'Kritan ritar lådans kontur bredvid leoparden (4 s)', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '10b', d: 3.0, plats: 'HB golvet', bild: 'Konturen klar, kritan vajar: gisspaus 3 s', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '10c', d: 0.4 + L(19) + 0.5, plats: 'HB golvet', malin: [[19, 0.4]], ljud: [E('glitter', 1, 0)], bild: 'Lådan fylls i inifrån, kritan flyger ut', ljudtext: '`glitter`', ansikte: 'förvånad' },
  { id: '11', d: 0.3 + L(20) + 0.9, plats: 'N', malin: [[20, 0.3]], ljud: [S(2, 0.4 + L(20))], bild: 'Kawaii-ögon, öronen reser sig, svansen vippar', ljudtext: 'spinn 2', ansikte: 'kawaii' },
  { id: '11b', d: 0.3 + L(21) + 1.4 + L(22) + 0.7, plats: 'D hålen → N', malin: [[21, 0.3], [22, 0.3 + L(21) + 1.4]], ljud: [S('7b', 0.5 + L(21))], bild: 'De tre hålen, sedan leoparden. **Pausen:** pratande spinn', ljudtext: 'spinn 7b i pausen', ansikte: 'nyfiken → glad' },
  { id: '12', d: 0.2 + L(23) + 2.5, plats: 'N', malin: [[23, 0.2]], ljud: [S(5, 0.4 + L(23))], bild: 'Tittar på lådan, sedan på oss. Paus 2,5 s: barnet säger tack', ljudtext: 'spinn 5', ansikte: 'nyfiken' },
  { id: '13', d: L(24) + 1.0, plats: 'HB', malin: [[24, 0]], ljud: [S('2b', 0.2 + L(24))], bild: 'Leoparden nickar direkt, kritan flyger ut', ljudtext: 'spinn 2b', ansikte: 'jätteglad' },
  { id: '14', d: 0.3 + L(25) + 1.4, plats: 'D tassen', malin: [[25, 0.3]], ljud: [S('5b', 0.5 + L(25))], bild: 'Tassen sänks mot trekanten. **Pausen:** nyfiket spinn', ljudtext: 'spinn 5b i pausen', ansikte: '–' },
  { id: '15', d: 0.9 + L(26) + 0.9, plats: 'HB → N', malin: [[26, 0.9]], ljud: [E('pop', 1, 0.7, 0.5), FN(2, 1.0 + L(26))], bild: 'Trekanten upp på huvudet som en hatt', ljudtext: '`pop` lågt, fniss 2', ansikte: 'skrattar' },
  { id: '16', d: 0.3 + L(27) + 1.0, plats: 'N', malin: [[27, 0.3]], ljud: [S(4, 0.4 + L(27))], bild: 'Leoparden med hatten blinkar, öronen vippar', ljudtext: 'spinn 4 (mysig suck)', ansikte: 'stolt' },
  { id: '17', d: 1.6 + L(28) + 0.9, plats: 'H → N', malin: [[28, 1.6]], ljud: [E('glid', 1, 0.5), FN(3, 1.7 + L(28))], bild: 'Glatt skutt, hatten glider av och in under sängen, ett grönt hörn syns. Leoparden ser det inte', ljudtext: '`glid`, fniss 3', ansikte: 'fnissig' },
  { id: '18', d: 0.3 + L(29) + 0.7, plats: 'HB', malin: [[29, 0.3]], ljud: [S(2, 0.4 + L(29))], bild: 'Leoparden vänder sig mot lådan (riktningsposen)', ljudtext: 'spinn 2', ansikte: 'ivrig' },
  { id: '19', d: 0.9 + L(30) + 0.8, plats: 'D lådan → N', malin: [[30, 0.9]], ljud: [E('tass', 3, 0.1), E('vick', 1, 0.6, 0.6), S(5, 1.0 + L(30))], bild: 'Cirkeln stannar på det trekantiga hålet och vickar. Leoparden lutar huvudet', ljudtext: '`tass`, `vick`, spinn 5', ansikte: 'tänker' },
  { id: '20', d: 0.4 + L(31) + 0.3, plats: 'D lådan', malin: [[31, 0.4]], ljud: PLOPP(0.4 + L(31) - 0.45), bild: 'Cirkeln glider till det runda hålet och sjunker ner på *plopp*', ljudtext: '`plopp`, `klonk`, `glitter`', ansikte: '–' },
  { id: '20b', d: 0.6 + L(32) + 0.6, plats: 'N', malin: [[32, 0.6]], ljud: [S('2b', 0.1)], bild: 'Ett litet glatt skutt, svansen vippar', ljudtext: 'spinn 2b före', ansikte: 'stolt' },
  { id: '21', d: 0.3 + L(33) + 1.0, plats: 'D fyrkanten → D tassen', malin: [[33, 0.3]], ljud: [E('glimt', 2, 0.1, 0.4), E('tass', 1, 0.4 + L(33))], bild: 'Fyrkanten glimtar, tassen puffar, fyrkanten glider rakt till sitt hål', ljudtext: '`glimt`, `tass`', ansikte: '–' },
  { id: '22', d: 0.4 + L(34) + 0.9, plats: 'D lådan → N', malin: [[34, 0.4]], ljud: [...PLOPP(0.4 + L(34) - 0.45), S(3, 0.5 + L(34))], bild: 'Fyrkanten sjunker ner, sedan leoparden', ljudtext: '`plopp`, `klonk`, spinn 3', ansikte: 'jätteglad' },
  { id: '23', d: 0.6 + L(35) + 0.6, plats: 'D tomma hålet → N', malin: [[35, 0.6]], ljud: [S('5b', 0.7 + L(35))], bild: 'Det trekantiga hålet är tomt. Tassen till huvudet: hatten är borta', ljudtext: 'spinn 5b', ansikte: 'förvånad' },
  { id: '24', d: 0.3 + L(36) + 1.0, plats: 'N', malin: [[36, 0.3]], ljud: [S(7, 0.4 + L(36))], bild: 'Leoparden tittar åt vänster, sedan åt höger', ljudtext: 'spinn 7', ansikte: 'tänker' },
  { id: '25a', d: 2.0, plats: 'H', malin: [[37, 0.3]], bild: '*Kan du hjälpa leoparden?* Klipp efter 2 s', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '25b', d: 0.3 + L(37) - 2.0 + 5.0, plats: 'D under sängen', ljud: [E('glimt', 2, 0.3 + L(37) - 2.0 + 3.0, 0.3)], bild: 'Det gröna hörnet under sängen. Paus 5 s, efter 3 s skimrar det svagt', ljudtext: 'tyst, `glimt` svagt', ansikte: '–' },
  { id: '26', d: 0.3 + L(38) + 0.8, plats: 'D hörnet → N', malin: [[38, 0.3]], ljud: [E('tindra', 1, 0.1), S(2, 0.4 + L(38))], bild: 'Hörnet skimrar tydligt, sedan leoparden', ljudtext: '`tindra`, spinn 2', ansikte: 'ivrig' },
  { id: '27a', d: 1.6, plats: 'HB', ljud: [E('glid', 1, 0.2, 0.5)], bild: 'Leoparden sträcker tassen, trekanten glider fram och i en båge mot lådan', ljudtext: '`glid` lågt', ansikte: 'ivrig' },
  { id: '27b', d: 0.3 + L(39) + 0.2, plats: 'D lådan', malin: [[39, 0.3]], ljud: PLOPP(0.3 + L(39) - 0.45), bild: 'Trekanten sjunker ner på *plopp*', ljudtext: '`plopp`, `klonk`, `glitter`', ansikte: '–' },
  { id: '27c', d: 1.0, plats: 'N', ljud: [S('3b', 0.1)], bild: 'Öronen upp, svansen vippar', ljudtext: 'spinn 3b', ansikte: 'jätteglad' },
  { id: '28', d: 0.4 + L(40) + 0.7, plats: 'H', malin: [[40, 0.4]], ljud: [S('2b', 0.5 + L(40))], bild: 'Golvet är tomt, lådan står med alla klossar. Glatt skutt', ljudtext: 'spinn 2b', ansikte: 'glad' },
  { id: '29', d: 0.3 + L(41) + 0.8, plats: 'D lådan → N', malin: [[41, 0.3]], ljud: [E('glimt', 1, 0.6, 0.4), E('glimt', 2, 1.5, 0.4), E('glimt', 1, 2.4, 0.4), S('4b', 0.4 + L(41))], bild: 'De tre hålen glimtar ett i taget, sedan leoparden', ljudtext: '`glimt` ×3, spinn 4b', ansikte: 'stolt' },
  { id: '30', d: 1.5 + L(42) + 0.9, plats: 'D tassen → N', malin: [[42, 1.5]], ljud: [E('skrammel', 1, 0.2), E('skrammel', 2, 0.8), FN(4, 1.6 + L(42))], bild: 'Tassen puffar lådan två gånger, den skramlar', ljudtext: '`skrammel` ×2, fniss 4', ansikte: 'fnissig' },
  { id: '30b', d: 0.3 + L(43) + 1.4 + L(44) + 0.7, plats: 'N', malin: [[43, 0.3], [44, 0.3 + L(43) + 1.4]], ljud: [S(4, 0.5 + L(43)), S(2, 0.4 + L(43) + 1.4 + L(44))], bild: 'Leoparden tittar på oss och nickar', ljudtext: 'spinn 4 i pausen, 2 efter', ansikte: 'glad' },
  { id: '31', d: 0.4 + L(45) + 0.8, plats: 'HB', malin: [[45, 0.4]], ljud: [S(8, 0.5 + L(45))], bild: 'Leoparden vinkar', ljudtext: 'spinn 8 (hej då)', ansikte: 'glad' },
  { id: '32', d: 0.3 + L(46) + 1.2, plats: 'N', malin: [[46, 0.3]], ljud: [S('8b', 0.4 + L(46))], bild: 'Leoparden vinkar klart', ljudtext: 'spinn 8b', ansikte: 'kawaii' },
  { id: '33', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen runt leoparden och lådan (sedan prenumerera-kortet och outrot)', ljudtext: '–', ansikte: 'glad' },
];
export const GLES = 0.15;   // luft efter varje replik (som 057 efter Sannas feedback "a bit faster pace")
for (const r of RADER) if (r.malin && !['01a', '01b', '25a'].includes(r.id)) r.d += GLES;
