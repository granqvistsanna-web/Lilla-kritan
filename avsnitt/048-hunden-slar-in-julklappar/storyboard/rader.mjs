// Storyboardens rader för 048 Hunden slår in julklappar: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 042 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. musik: true = julkarolen ligger lågt under raden.
// Längderna: ../rost-langder.txt när Malin är inspelad. Innan dess uppskattas de ur texten (UPPSKATTAT), så tiderna är preliminära.
import { readFileSync, existsSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const MATT = HAR + '../rost-langder.txt';
const matt = existsSync(MATT) ? Object.fromEntries(readFileSync(MATT, 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s])) : {};
// ponytail: grov uppskattning (ca 13 tecken/s + 0,4 s per "…"), ersätts av de uppmätta längderna
const gissa = text => +(0.3 + text.length / 13 + 0.4 * (text.match(/…/g) || []).length).toFixed(2);
export const UPPSKATTAT = rader.some(([namn]) => !(namn in matt));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn] ?? gissa(text)]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Hundens röst (021, 036, 042): hej, ja, fniss, pip (frågande), hej då. Siffran = tagningen.
const HEJ = n => `vov-hej/vov-hej-${n}`, JA = n => `vov-ja/vov-ja-${n}`, FNISS = n => `vov-fniss/vov-fniss-${n}`, PIP = n => `vov-pip/vov-pip-${n}`;
const HEJDA = n => `vov-hejda/vov-hejda-${n}`, NOS = n => `nos/nos-${n}`, SVANS = n => `svansvift/svansvift-${n}`;
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = n => `glitter/glitter-${n}`, TINDRA = 'tindra/tindra-3', TASS = n => `tass/tass-${n}`;
const BOING = n => `boing/boing-${n}`, BJALL = 'bjallror/bjallror-1', HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`, DUNS = n => `duns/duns-${n}`;
const PRASSEL = 'prassel-tyg/prassel-tyg-1', RITSCH = 'ritsch/ritsch-1';   // ponytail: tygprassel tills ett pappersprassel finns
const G = 0.9;   // glest tempo: extra luft på varje rad med en replik (som 042)
// "Vik … vik … tejp! Klart!" på orden: flikarna, tejpen och glittret vid ungefär 0, 30, 60 och 80 % av repliken
const vik = (r, n) => [[PRASSEL, r], [PRASSEL, r + L(n) * 0.3], [RITSCH, r + L(n) * 0.6], [GLITTER(2), r + L(n) * 0.8]];

export const RADER = [
  // --- Kritan ritar ett paket (papperet). Julkalenderns ram (lucka 20) läggs utanpå av lucka.js ---
  { id: '01a', d: 8.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]], musik: true,
    bild: 'Kritan ritar paketets kontur (paket-rund) i ett lugnt drag', ljudtext: 'kritan ritar, karolen lågt', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]], musik: true,
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst, karolen lågt', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER(1), 0.1]], musik: true,
    bild: 'Paketet fylls i inifrån ("Ett paket!"). Zoom in i papperet, in i brasrummet', ljudtext: '`glitter`', ansikte: '–' },

  // --- Hej, och sakerna under granen ---
  { id: '1', d: 3.4 + L(4) + G + 1.0, plats: 'Brasrummet, helbild', malin: [[4, 3.4]], musik: true,
    ljud: [[TASS(1), 0.5], [TASS(2), 1.2], [TASS(3), 1.9], [TASS(4), 2.6], [HEJ(1), 3.6 + L(4)], [SVANS(1), 3.8 + L(4)]],
    bild: 'Hunden med tomteluvan trippar in från vänster till mitten och vinkar (armen bakom kroppen). ', ljudtext: 'tassar, vov hej, svansvift', ansikte: 'jätteglad' },
  { id: '2', d: 0.8 + L(5) + G + 0.6, plats: 'Helbild', malin: [[5, 0.8]], ljud: [[HOPP(1), 0.2], [BJALL, 0.4], [JA(1), 1.0 + L(5)]], musik: true,
    bild: 'Glatt skutt (20 px), bjällran på luvan pinglar. Malin när den landat', ljudtext: '`hopp-mjuk`, `bjallror`, vov ja', ansikte: 'jätteglad' },
  { id: '3', d: 0.8 + L(6) + G + 1.0, plats: 'Helbild', malin: [[6, 0.8]], ljud: [[PIP(1), 1.0 + L(6)]], musik: true,
    bild: 'Hunden tittar ner mot granens fot: bollen, nallen och bilen ligger där', ljudtext: 'frågande pip', ansikte: 'nyfiken' },
  { id: '4', d: 0.3 + L(7) + G + 0.8, plats: 'Halvbild: sakerna under granen', malin: [[7, 0.3]], musik: true,
    ljud: [[BOING(1), 0.3 + L(7) * 0.1], [BOING(2), 0.3 + L(7) * 0.45], [BOING(3), 0.3 + L(7) * 0.85], [FNISS(1), 0.5 + L(7)]],
    bild: 'Sakerna hoppar en i taget på sina ord (12 px, ingen snurr): bollen, nallen, bilen', ljudtext: '`boing` × 3, fniss', ansikte: '–' },
  { id: '5', d: 1.2 + L(8) + G + 1.0, plats: 'Helbild', malin: [[8, 1.2]], ljud: [[NOS(1), 0.2], [JA(2), 1.4 + L(8)], [SVANS(2), 1.5 + L(8)]], musik: true,
    bild: 'Hunden puffar fram sakerna med nosen till mitten av golvet, tittar på oss och nickar, svansen viftar', ljudtext: '`nos`, vov ja, svansvift', ansikte: 'glad' },
  { id: '6', d: 0.6 + L(9) + G + 1.0, plats: 'Närbild', malin: [[9, 0.6]], ljud: [[PIP(2), 0.8 + L(9)]], musik: true,
    bild: 'Hunden tittar på sakerna, sedan åt vänster och höger, öronen sjunker', ljudtext: 'pip', ansikte: 'nyfiken, lite ledsen' },
  { id: '7', d: 0.4 + L(10) + G + 1.0, plats: 'Närbild', malin: [[10, 0.4]], ljud: [[PIP(3), 0.6 + L(10)]], musik: true,
    bild: 'Hunden tittar upp på oss', ljudtext: 'frågande pip', ansikte: 'nyfiken' },

  // --- Kritan ritar julklappspapper och en rosett ---
  { id: '8a', d: 0.3 + L(11) + 3.0, plats: 'Halvbild: golvet bredvid hunden', malin: [[11, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan kommer in och ritar papperets kontur på golvet i ett drag. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '8b', d: 0.3 + L(12) + G, plats: 'Halvbild', malin: [[12, 0.3]], ljud: [[GLITTER(1), 0.0], [RITA(3), 0.3 + L(12) * 0.4], [GLITTER(3), 0.3 + L(12) * 0.7]],
    bild: 'Papperet fylls i inifrån. På "Och en rosett!" ritar kritan rosetten i papperets hörn', ljudtext: '`glitter`, kritan ritar', ansikte: 'glittriga ögon' },
  { id: '9', d: 0.3 + L(13) + 2.5 + L(14) + G + 0.6, plats: 'Halvbild', malin: [[13, 0.3], [14, 2.8 + L(13)]], ljud: [[JA(3), 3.0 + L(13) + L(14)]],
    bild: 'Hunden tittar på papperet, öronen reser sig. Paus 2,5 s för barnet, "Tack!", hunden nickar', ljudtext: 'vov ja', ansikte: 'glad' },

  // --- Leken: tittut under papperet ---
  { id: '10', d: 1.4 + L(15) + 3.0, plats: 'Helbild', malin: [[15, 1.4]], ljud: [[NOS(2), 0.1], [PRASSEL, 0.5], [FNISS(2), 1.6 + L(15) + 1.2]],
    bild: 'Hunden nosar på papperet. Papperet lyfts i en mjuk båge över hunden: bara luvan, öronspetsarna och svansen syns. Rosetten följer med. Paus 3 s', ljudtext: '`prassel`, fniss under papperet', ansikte: '–' },
  { id: '11', d: 0.5 + L(16) + G + 1.0, plats: 'Helbild', malin: [[16, 0.5]], ljud: [[PRASSEL, 0.0], [FNISS(3), 0.7 + L(16)], [SVANS(3), 0.9 + L(16)]],
    bild: 'Papperet glider tillbaka till golvet. Hunden står där, och rosetten sitter kvar på svansspetsen (ingen säger något)', ljudtext: '`prassel`, fniss, svansvift', ansikte: 'jätteglad' },

  // --- Inslagningen, tre gånger ---
  { id: '12', d: 0.3 + L(17) + G + 0.6, plats: 'Halvbild', malin: [[17, 0.3]], ljud: [[JA(4), 0.5 + L(17)]],
    bild: 'Hunden tittar på bollen', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '13', d: 0.9 + L(18) + G, plats: 'Halvbild', malin: [[18, 0.9]], ljud: [[DUNS(1), 0.7]],
    bild: 'Bollen gör en lugn båge (0,7 s) och landar mitt på papperet. Malin när den landat', ljudtext: '`duns`', ansikte: 'glad' },
  { id: '14', d: 0.3 + L(19) + G + 0.4, plats: 'Halvbild: papperet', malin: [[19, 0.3]], ljud: vik(0.3, 19),
    bild: 'Vänster flik reser sig över bollen, sedan höger. Hunden trycker rak tass på mitten, tejpen poppar fram. Glitterpuff', ljudtext: '`prassel` × 2, `ritsch`, `glitter`', ansikte: 'koncentrerad → glad' },
  { id: '15', d: 0.5 + L(20) + G + 0.6, plats: 'Halvbild', malin: [[20, 0.5]], ljud: [[HOPP(2), 0.1], [FNISS(4), 0.7 + L(20)]],
    bild: 'Det runda paketet guppar. Hunden gör ett glatt skutt', ljudtext: '`hopp-mjuk`, fniss', ansikte: 'jätteglad' },
  { id: '16', d: 0.9 + L(21) + G + 0.4, plats: 'Halvbild', malin: [[21, 0.9]], ljud: [[DUNS(2), 0.7], [JA(1), 1.1 + L(21)]],
    bild: 'Det runda paketet står bredvid. Ett nytt ark ligger på golvet, nallen gör en båge upp på det', ljudtext: '`duns`, vov ja', ansikte: 'glad' },
  { id: '17', d: 0.3 + L(22) + G + 0.4, plats: 'Halvbild: papperet', malin: [[22, 0.3]], ljud: vik(0.3, 22),
    bild: 'Samma som 14, med nallen', ljudtext: '`prassel` × 2, `ritsch`, `glitter`', ansikte: 'koncentrerad → glad' },
  { id: '18', d: 0.5 + L(23) + G + 0.6, plats: 'Halvbild', malin: [[23, 0.5]], ljud: [[FNISS(5), 0.7 + L(23)]],
    bild: 'Det höga paketet guppar', ljudtext: 'fniss', ansikte: 'jätteglad' },
  { id: '19', d: 1.0 + L(24) + G + 0.4, plats: 'Halvbild', malin: [[24, 1.0]], ljud: [[JA(2), 1.2 + L(24)]],
    bild: 'Ett nytt ark. Bilen rullar upp på det (hjulen snurrar). Malin när den stannat', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '20', d: 0.3 + L(25) + G + 0.4, plats: 'Halvbild: papperet', malin: [[25, 0.3]], ljud: vik(0.3, 25),
    bild: 'Samma som 14, med bilen. Paketet blir paket-prickar, utan rosett', ljudtext: '`prassel` × 2, `ritsch`, `glitter`', ansikte: 'koncentrerad → glad' },

  // --- Barnet hjälper: rosetten på svansen ---
  { id: '21', d: 0.6 + L(26) + G + 0.8, plats: 'Halvbild', malin: [[26, 0.6]], ljud: [[PIP(1), 0.8 + L(26)]],
    bild: 'Paketet står där utan rosett. Hunden tittar på det, öronen sjunker lite', ljudtext: 'pip', ansikte: 'förvånad' },
  { id: '22', d: 0.8 + L(27) + G + 1.0, plats: 'Halvbild', malin: [[27, 0.8]], ljud: [[PIP(2), 1.0 + L(27)], [SVANS(4), 0.3]],
    bild: 'Hunden tittar åt vänster och åt höger. Svansen viftar med rosetten', ljudtext: 'frågande pip, svansvift', ansikte: 'nyfiken' },
  { id: '23', d: 0.3 + L(28) + 5.0, plats: 'Helbild, svansen tydlig', malin: [[28, 0.3]], ljud: [[TINDRA, 0.3 + L(28) + 3.0]],
    bild: 'Hunden lite snett så att svansen syns. Svansen viftar sakta. Paus 5 s: efter 3 s skimrar rosetten svagt', ljudtext: 'tyst, svagt tindra', ansikte: 'nyfiken' },
  { id: '24', d: 0.2 + L(29) + G + 0.8, plats: 'Närbild: svansen', malin: [[29, 0.2]], ljud: [[TINDRA, 0.0], [FNISS(6), 0.4 + L(29)]],
    bild: 'Rosetten på svansspetsen skimrar tydligt, hunden tittar bakåt på den', ljudtext: '`tindra`, fniss', ansikte: 'förvånad → fnissig' },
  { id: '25', d: 1.2 + L(30) + G + 0.6, plats: 'Halvbild', malin: [[30, 1.2]], ljud: [[GLITTER(4), 1.0], [HOPP(3), 1.4 + L(30)], [JA(3), 1.6 + L(30)]],
    bild: 'Rosetten seglar från svansen upp på paketet (1,0 s). Malin när den sitter. Glatt skutt', ljudtext: '`glitter`, `hopp-mjuk`, vov ja', ansikte: 'jätteglad' },

  // --- Lek och hej då ---
  { id: '26', d: 0.3 + L(31) + G + 0.6, plats: 'Helbild', malin: [[31, 0.3]], musik: true,
    ljud: [[DUNS(1), 0.3 + L(31) * 0.45], [DUNS(2), 0.3 + L(31) * 0.7], [DUNS(3), 0.3 + L(31) * 0.95]],
    bild: 'Paketen glider in under granen, ett i taget på "Ett … två … tre!"', ljudtext: '`duns` × 3', ansikte: 'glad' },
  { id: '27', d: 0.4 + L(32) + G + 0.8, plats: 'Helbild', malin: [[32, 0.4]], ljud: [[FNISS(1), 0.6 + L(32)], [BJALL, 0.8 + L(32)]], musik: true,
    bild: 'Hunden står stolt vid granen, svansen viftar', ljudtext: 'fniss, `bjallror`', ansikte: 'jätteglad' },
  { id: '28', d: 1.4 + L(33) + G, plats: 'Halvbild → paketet växer', malin: [[33, 1.4]], ljud: [[NOS(3), 0.2], [GLITTER(2), 1.0]], musik: true,
    bild: 'Hunden puffar det runda paketet mot kameran: det glider ner i bild och växer (skala 1 → 1,6)', ljudtext: '`nos`, `glitter`', ansikte: 'glad' },
  { id: '29', d: 0.3 + L(34) + G + 0.8, plats: 'Halvbild', malin: [[34, 0.3]], ljud: [[JA(4), 0.5 + L(34)]], musik: true,
    bild: 'Hunden tittar fram bakom paketet', ljudtext: 'vov ja', ansikte: 'jätteglad' },
  { id: '30', d: 4.0 + L(35) + G + 2.0, plats: 'Helbild', malin: [[35, 4.0]], ljud: [[HOPP(4), 1.0], [HOPP(5), 3.0], [HOPP(6), 5.0 + L(35)]], musik: true,
    bild: 'Karolen kommer upp, brasan sprakar. Hunden vickar vid granen, ett skutt per fras', ljudtext: 'karolen, `hopp-mjuk`, brasan sprakar', ansikte: 'jätteglad' },
  { id: '31', d: 0.4 + L(36) + G + 0.6, plats: 'Halvbild', malin: [[36, 0.4]], ljud: [[HEJDA(1), 0.6 + L(36)]], musik: true,
    bild: 'Hunden vinkar (armen bakom kroppen)', ljudtext: 'vov hej då', ansikte: 'jätteglad' },
  { id: '32', d: 0.3 + L(37) + G + 0.8, plats: 'Halvbild', malin: [[37, 0.3]], ljud: [[HEJDA(2), 0.5 + L(37)]], musik: true,
    bild: 'Hunden vinkar klart', ljudtext: 'vov hej då', ansikte: 'glad' },
  { id: '33', d: 2.4, plats: 'Kritirisen', musik: true,
    bild: 'Kritirisen runt hunden och granen, karolen tonar ut', ljudtext: 'karolen tonar ut', ansikte: 'glad' },
];
