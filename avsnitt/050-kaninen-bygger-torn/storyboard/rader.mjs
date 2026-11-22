// Storyboardens rader för 050 Kaninen bygger torn i snön: en stillbild per uppslag (manus.md, version 2). bygg.mjs räknar
// starttiderna (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// (Förlaga: 048 storyboard/rader.mjs.) d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]].
// ljud = [[fil under assets/ljud/effekter/ utan .m4a, sekunder in i raden]]. musik: true = julkarolen ligger lågt under raden.
// Längderna är uppmätta på Malins klippta filer (tagning 1, 2026-11-22, assets/ljud/roster/kaninen-bygger-torn/).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const MATT = [1.66, 1.72, 1.85, 1.77, 2.08, 2.08, 2.53, 1.42, 1.75, 1.51, 2.32, 2.79, 1.93, 2.27, 4.03, 0.97, 1.62, 1.55, 3.75, 0.93,
  0.72, 2.46, 1.49, 2.16, 2.63, 1.72, 3.38, 3.71, 2.47, 2.67, 2.49, 1.97, 3.05, 1.37, 1.11, 5.71, 1.36, 4.49, 1.14, 2.66];
export const UPPSKATTAT = false;
export const ROST = rader.map(([namn, text], i) => [namn, text, MATT[i]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Kaninens röst (kanin-ny, kanin-gullig) och ljuden. Siffran = tagningen.
const HEJ = 'kanin-gullig/kanin-hej-1', HEJDA = 'kanin-gullig/kanin-hejda-1', TACK = n => `kanin-tack/kanin-tack-${n}`;
const KN = (k, n) => `kanin-ny/kanin-ny-${k}-${n}`;
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = n => `glitter/glitter-${n}`, TINDRA = n => `tindra/tindra-${n}`, PLING = n => `pling/pling-${n}`;
const HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`, KLAPP = n => `klapp/klapp-${n}`, PUFF = n => `puff/puff-${n}`, DUNS = n => `sno-duns/sno-duns-${n}`;
const KNARR = n => `knarr-sno/knarr-sno-${n}`, BJALL = 'bjallror/bjallror-1';
const G = 0.7;   // GLES: extra luft på varje rad med en replik (receptet)
// "Fyll … klappa … vänd!" på orden: snöpuffen, klappen och dunsen vid ungefär 0, 40 och 85 % av repliken
const fkv = (r, n) => [[PUFF(1), r], [KLAPP(1), r + L(n) * 0.4], [DUNS(1), r + L(n) * 0.85]];

export const RADER = [
  // --- Kritan ritar en spade (papperet). Julkalenderns ram (lucka 23) läggs utanpå av lucka.js ---
  { id: '01a', d: 7.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]], musik: true,
    bild: 'Kritan ritar spadens kontur (ytterkonturen, sedan öglan) i ett lugnt drag', ljudtext: 'kritan ritar, karolen lågt', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]], musik: true,
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst, karolen lågt', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER(1), 0.1]], musik: true,
    bild: 'Spaden fylls i inifrån ("En spade!"). Zoom in i papperet, in i granstugans gård', ljudtext: '`glitter`', ansikte: '–' },

  // --- Hej, julafton i morgon ---
  { id: '1', d: 3.0 + L(4) + G + 1.0, plats: 'Granstugan, helbild', malin: [[4, 3.0]], musik: true,
    ljud: [...[1, 2, 3, 4, 5, 6, 7].map(n => [KNARR((n - 1) % 4 + 1), 0.3 + 0.347 * n]), [HEJ, 3.2 + L(4)]],   // feedback 22/11: går in (riggens gång), ett knarr per steg
    bild: 'Kaninen med halsduken går in från vänster, klipp till närbild, vinkar (armen bakom kroppen). Det snöar lätt', ljudtext: '`knarr-sno` per steg, kanin hej', ansikte: 'jätteglad' },
  { id: '2', d: 0.7 + L(5) + G + 0.4, plats: 'Helbild', malin: [[5, 0.7]], ljud: [[HOPP(4), 0.1], [KN('jippi', 1), 0.9 + L(5)]], musik: true,
    bild: 'Glatt skutt, öronen vippar. Malin när den landat', ljudtext: '`hopp-mjuk`, jippi', ansikte: 'jätteglad' },
  { id: '3', d: 0.4 + L(6) + G + 0.6, plats: 'Närbild', malin: [[6, 0.4]], ljud: [[KN('fortjust', 1), 0.6 + L(6)]], musik: true,
    bild: 'Kaninen tittar mot stugans tända fönster', ljudtext: 'förtjust', ansikte: 'glittriga ögon' },
  { id: '4', d: 0.3 + L(7) + G + 0.4, plats: 'Närbild', malin: [[7, 0.3]], ljud: [[KN('ja', 1), 0.1], [BJALL, 0.6]], musik: true,
    bild: 'Kaninen nickar två gånger', ljudtext: 'ja, `bjallror` lågt', ansikte: 'jätteglad' },
  { id: '5', d: 0.3 + L(8) + G + 1.0, plats: 'Halvbild', malin: [[8, 0.3]], ljud: [[KN('fragande', 1), 0.5 + L(8)]], musik: true,
    bild: 'Kaninen tittar på oss, öronen på sned', ljudtext: 'frågande', ansikte: 'nyfiken' },

  // --- Snö på nosen ---
  { id: '6', d: 0.5 + L(9) + G + 0.6, plats: 'Helbild', malin: [[9, 0.5]], ljud: [[KN('fortjust', 2), 0.7 + L(9)]],
    bild: 'Kaninen tittar upp mot flingorna', ljudtext: 'förtjust', ansikte: 'glad' },
  { id: '7', d: 1.4 + L(10) + G + 0.4, plats: 'Halvbild: kaninen och snöhögen', malin: [[10, 1.4]], ljud: [[KNARR(1), 0.2], [KNARR(2), 0.9], [KN('ja', 2), 1.6 + L(10)]],
    bild: 'Kaninen gräver i snöhögen med rak tass, två gånger. Malin efter första grävet', ljudtext: '`knarr-sno` × 2, ja', ansikte: 'koncentrerad' },
  { id: '8', d: 0.8 + L(11) + G + 0.6, plats: 'Halvbild', malin: [[11, 0.8]], ljud: [[PUFF(2), 0.1], [KN('fniss', 1), 1.0 + L(11)]],
    bild: 'En snöpuff yr rakt upp och landar som små vita prickar på nosen', ljudtext: '`puff`, fniss', ansikte: 'förvånad → fnissig' },
  { id: '9', d: 0.6 + L(12) + G + 0.6, plats: 'Närbild', malin: [[12, 0.6]], ljud: [[KN('trumpen', 1), 0.8 + L(12)]],
    bild: 'Kaninen blinkar, lutar huvudet lugnt, prickarna faller av en i taget', ljudtext: 'trumpen (kort)', ansikte: 'blinkar' },
  { id: '10', d: 0.3 + L(13) + G + 1.0, plats: 'Närbild', malin: [[13, 0.3]], ljud: [[KN('fragande', 2), 0.5 + L(13)]],
    bild: 'Kaninen tittar upp på oss', ljudtext: 'frågande', ansikte: 'nyfiken' },

  // --- Kritan ritar en hink och en spade ---
  { id: '11a', d: 0.3 + L(14) + 3.0, plats: 'Halvbild: snön bredvid kaninen', malin: [[14, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan kommer in och ritar hinkens kontur på snön (tre drag). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '11b', d: 0.3 + L(15) + G, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [[GLITTER(1), 0.0], [RITA(3), 0.3 + L(15) * 0.35], [GLITTER(3), 0.3 + L(15) * 0.6]],
    bild: 'Hinken fylls i inifrån. På "Och en spade!" ritar kritan spaden bredvid, den fylls i', ljudtext: '`glitter`, kritan ritar', ansikte: 'glittriga ögon' },
  { id: '12', d: 0.4 + L(16) + G + 0.4, plats: 'Halvbild', malin: [[16, 0.4]], ljud: [[TACK(1), 0.6 + L(16)]],
    bild: 'Kaninen tittar upp mot kritan när den flyger ut', ljudtext: 'kanin tack', ansikte: 'glad' },
  { id: '13', d: 0.3 + L(17) + G + 0.4, plats: 'Halvbild', malin: [[17, 0.3]], ljud: [[KN('fortjust', 1), 0.5 + L(17)]],
    bild: 'Kaninen nickar', ljudtext: 'förtjust', ansikte: 'jätteglad' },

  // --- Första och andra tornet ---
  { id: '14', d: 0.8 + L(18) + G + 0.4, plats: 'Halvbild', malin: [[18, 0.8]], ljud: [[KN('jippi', 2), 1.0 + L(18)]],
    bild: 'Spaden glider till kaninens tass och sitter i tasspetsen', ljudtext: 'jippi', ansikte: 'ivrig' },
  { id: '15', d: 0.3 + L(19) + 0.8, plats: 'Halvbild: tornbygget', malin: [[19, 0.3]], ljud: fkv(0.3, 19),
    bild: 'Fyll (snöpuff i hinken), klappa (rak tass), vänd (hinken vänder sig själv i en båge och landar)', ljudtext: '`puff`, `klapp`, `sno-duns`', ansikte: 'koncentrerad' },
  { id: '16', d: 0.3 + L(20) + G + 0.6, plats: 'Halvbild', malin: [[20, 0.3]], ljud: [[GLITTER(2), 0.1], [HOPP(5), 0.4 + L(20)], [KN('fniss', 2), 0.7 + L(20)]],
    bild: 'Hinken lyfts, tornet står kvar, glitter. Glatt skutt', ljudtext: '`glitter`, skutt, fniss', ansikte: 'jätteglad' },
  { id: '17', d: 0.6 + L(21) + G, plats: 'Halvbild', malin: [[21, 0.6]], ljud: [[KN('ja', 3), 0.8 + L(21)]],
    bild: 'Kaninen fyller hinken igen bredvid första tornet', ljudtext: 'ja', ansikte: 'glad' },
  { id: '18', d: 0.3 + L(22) + 0.4, plats: 'Halvbild', malin: [[22, 0.3]], ljud: [[PUFF(1), 0.3], [KLAPP(2), 0.3 + L(22) * 0.6]],
    bild: 'Fyll, klappa: hinken står full och stilla', ljudtext: '`puff`, `klapp`', ansikte: 'koncentrerad' },
  { id: '19', d: 0.3 + L(23) + 4.6, plats: 'Närbild', malin: [[23, 0.3]],
    bild: 'Kaninen tittar på oss, hinken gungar lite. Paus 4 s: barnet säger "vänd!"', ljudtext: 'tyst, kaninen blinkar och andas', ansikte: 'nyfiken' },
  { id: '20', d: 0.2 + L(24) + G + 1.4, plats: 'Halvbild', malin: [[24, 0.2]], ljud: [[DUNS(2), 1.0], [GLITTER(4), 1.6], [KN('jippi', 1), 2.7]],   // feedback 22/11: hinken vänder i en båge (0,1–1,0), lyfts av (1,35), tillbaka till kaninen
    bild: 'Hinken vänder sig på "Vänd!". Andra tornet tätt bredvid det första', ljudtext: '`sno-duns`, `glitter`, jippi', ansikte: 'jätteglad' },

  // --- Tittut ---
  { id: '21', d: 1.4 + L(25) + 3.0, plats: 'Helbild', malin: [[25, 1.4]], ljud: [[HOPP(6), 0.2]],
    bild: 'Kaninen hoppar bakom tornen, bara öronspetsarna syns i glipan. Paus 3 s, öronen vippar', ljudtext: '`hopp-mjuk`', ansikte: '–' },
  { id: '22', d: 0.5 + L(26) + G + 0.6, plats: 'Helbild', malin: [[26, 0.5]], ljud: [[HOPP(1), 0.0], [KN('fniss', 3), 0.7 + L(26)]],
    bild: 'Kaninen hoppar fram vid sidan', ljudtext: '`hopp-mjuk`, fniss', ansikte: 'jätteglad' },

  // --- Tredje tornet högst upp, julgransdrömmen, snölyktan ---
  { id: '23', d: 0.3 + L(27) + G + 0.6, plats: 'Halvbild', malin: [[27, 0.3]], ljud: [[KN('fragande', 1), 0.5 + L(27)]],
    bild: 'Kaninen tittar upp, ovanför tornen', ljudtext: 'frågande', ansikte: 'nyfiken' },
  { id: '24', d: 0.3 + L(28) + 1.0, plats: 'Halvbild', malin: [[28, 0.3]], ljud: fkv(0.3, 28),
    bild: 'Fyll, klappa, vänd: hinken vänder sig i en högre båge och landar ovanpå båda tornen', ljudtext: '`puff`, `klapp`, `sno-duns`', ansikte: 'koncentrerad' },
  { id: '25', d: 0.5 + L(29) + G + 0.4, plats: 'Helbild', malin: [[29, 0.5]], ljud: [[GLITTER(1), 0.2]],
    bild: 'Tre torn i en trekant, glipan mellan de två nedre under det översta', ljudtext: '`glitter`, förvånad min', ansikte: 'förvånad' },
  { id: '25b', d: 1.0 + L(30) + 2.6, plats: 'Närbild → helbild', malin: [[30, 1.6]], ljud: [[TINDRA(1), 0.3], [KN('mmm', 1), 1.8 + L(30)]],
    bild: 'Kaninens dröm: tornen tonar mjukt över i en stor pyntad julgran med drömsken, står kvar 2 s, tonar tillbaka', ljudtext: '`tindra`, mmm', ansikte: 'glittriga ögon' },
  { id: '26', d: 0.3 + L(31) + 1.4, plats: 'Halvbild: glipan', malin: [[31, 0.3]], ljud: [[RITA(4), 0.4]],
    bild: 'Kritan kommer in och ritar ljusets kontur i glipan mellan tornen', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '27', d: 0.3 + L(32) + 3.0, plats: 'Närbild: glipan', malin: [[32, 0.3]],
    bild: 'Konturen står klar, kaninen tittar in. Gisspaus 3 s', ljudtext: 'tyst, kaninen blinkar och andas', ansikte: 'nyfiken' },
  { id: '28', d: 0.6 + L(33) + G, plats: 'Närbild: glipan', malin: [[33, 0.6]], ljud: [[GLITTER(2), 0.0], [TINDRA(2), 0.3]],
    bild: 'Ljuset fylls i, lågan tänds, ett varmt gult sken sprider sig i snön', ljudtext: '`glitter`, `tindra`', ansikte: '–' },
  { id: '29', d: 0.6 + L(34) + G + 0.6, plats: 'Helbild', malin: [[34, 0.6]], ljud: [[HOPP(2), 0.0], [KN('jippi', 2), 0.8 + L(34)]],
    bild: 'Lyktan lyser, stugans fönster lyser bakom, kaninen gör ett glatt skutt', ljudtext: '`hopp-mjuk`, jippi', ansikte: 'jätteglad' },
  { id: '30', d: 0.4 + L(35) + G + 0.4, plats: 'Halvbild', malin: [[35, 0.4]], ljud: [[TACK(2), 0.6 + L(35)]],
    bild: 'Kaninen tittar upp mot kritan när den flyger ut', ljudtext: 'kanin tack', ansikte: 'glad' },
  { id: '31', d: 0.3 + L(36) + G + 0.4, plats: 'Helbild', malin: [[36, 0.3]],
    ljud: [[PLING(1), 0.3 + L(36) * 0.5], [PLING(2), 0.3 + L(36) * 0.72], [PLING(3), 0.3 + L(36) * 0.92]],
    bild: 'Ett torn i taget glimtar på "Ett … två … tre!"', ljudtext: '`pling` × 3', ansikte: 'glad' },
  { id: '32', d: 0.6 + L(37) + G + 1.0, plats: 'Närbild: lyktan och fönstret', malin: [[37, 0.6]], ljud: [[BJALL, 0.3]], musik: true,
    bild: 'Lyktan lyser, stugans tända fönster bakom', ljudtext: '`bjallror` lågt', ansikte: '–' },

  // --- Lek och hej då ---
  { id: '33', d: 2.6 + L(38) + G + 0.6, plats: 'Helbild', malin: [[38, 2.6]], ljud: [[HOPP(3), 0.3], [HOPP(4), 1.1], [HOPP(5), 1.9], [KN('fniss', 4), 2.8 + L(38)]], musik: true,
    bild: 'Karolen kommer upp. Kaninen hoppar bakom lyktan och fram på andra sidan', ljudtext: '`hopp-mjuk`, fniss', ansikte: 'jätteglad' },
  { id: '34', d: 0.4 + L(39) + G, plats: 'Halvbild', malin: [[39, 0.4]], ljud: [[HEJDA, 0.6 + L(39)]], musik: true,
    bild: 'Kaninen vinkar (armen bakom kroppen)', ljudtext: 'kanin hej då', ansikte: 'jätteglad' },
  { id: '35', d: 0.3 + L(40) + 1.0, plats: 'Halvbild', malin: [[40, 0.3]], musik: true,
    bild: 'Samma, vinkar klart', ljudtext: '–', ansikte: 'glad' },
  { id: '36', d: 2.5, plats: 'Helbild', musik: true,
    bild: 'Kritirisen runt kaninen och den lysande lyktan', ljudtext: 'karolen tonar ut', ansikte: 'glad' },
];
