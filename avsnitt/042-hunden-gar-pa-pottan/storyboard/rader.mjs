// Storyboardens rader för 042 Hunden går på pottan: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 045 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. musik: true = julkarolen ligger lågt under raden. Längderna ur ../rost-langder.txt (tagning 1, 2026-11-19).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries(readFileSync(HAR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Hundens röst (021, 036): hej, ja, fniss, pip (frågande), suck (mysig, 042), hej då. Siffran = tagningen.
const HEJ = n => `vov-hej/vov-hej-${n}`, JA = n => `vov-ja/vov-ja-${n}`, FNISS = n => `vov-fniss/vov-fniss-${n}`, PIP = n => `vov-pip/vov-pip-${n}`;
const HEJDA = n => `vov-hejda/vov-hejda-${n}`, SUCK = 'vov-suck/vov-suck-1', FLAMT = 'flamt-valp/flamt-valp-1', NOS = n => `nos/nos-${n}`, SVANS = 'svansvift/svansvift-1';
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = 'glitter/glitter-1', TINDRA = 'tindra/tindra-3', TASS = n => `tass/tass-${n}`, SVEP = 'swoosh/swoosh-1';
const KLUNK = n => `klunk/klunk-${n}`, BOING = n => `boing/boing-${n}`, BJALL = 'bjallror/bjallror-1', HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`;
const PORL = 'porl/porl-1', RULL = 'rull/rull-1', RITSCH = 'ritsch/ritsch-1', DUNS = 'duns/duns-1', KRAN = 'kran/kran-1', PLASK = n => `plask/plask-${n}`, KLAPP = n => `klapp/klapp-${n}`;
const G = 0.9;   // glest tempo: extra luft på varje rad med en replik (receptets GLES, som 045)
const klunk2 = (r, n) => [[KLUNK(1), r + L(n) * 0.12], [KLUNK(2), r + L(n) * 0.38]];   // "Klunk, klunk …" i början av repliken

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar hunden med tomteluvan (papperet) ---
  { id: '01a', d: 8.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]], musik: true,
    bild: 'Kritan ritar hunden med tomteluvan: konturen i ett lugnt drag (huvudet, öronen, luvan, kroppen, armarna)', ljudtext: 'kritan ritar, karolen lågt', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]], musik: true,
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst, karolen lågt', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER, 0.1]], musik: true,
    bild: 'Hunden fylls i inifrån. Zoom in i papperet, in i det julpyntade vardagsrummet', ljudtext: '`glitter`', ansikte: '–' },

  // --- Kaktusrummet (Sanna 2026-11-20, v1 förlängt åt höger): leka med bollen ---
  { id: '1', d: 4.0 + L(4) + G + 1.0, plats: 'Kaktusrummet, helbild', malin: [[4, 4.0]], musik: true,
    ljud: [[TASS(1), 0.6], [TASS(2), 1.3], [TASS(3), 2.0], [TASS(4), 2.7], [HEJ(1), 4.3 + L(4)], [SVANS, 4.5 + L(4)]],
    bild: 'Hunden med tomteluvan trippar in genom dörren och fram till mitten och vinkar (armen bakom kroppen)', ljudtext: 'tassar, vov hej, svansvift', ansikte: 'jätteglad' },
  { id: '2', d: 0.3 + L(5) + G + 1.0, plats: 'Närbild: huvudet och luvan', malin: [[5, 0.3]], ljud: [[BJALL, 0.3 + L(5)], [FNISS(1), 0.5 + L(5)]], musik: true,
    bild: 'Hunden vickar på huvudet så att luvan guppar', ljudtext: '`bjallror` lätt, fniss', ansikte: 'fnissig' },
  { id: '3', d: 0.9 + L(6) + G + 0.8, plats: 'Helbild', malin: [[6, 0.9]], ljud: [[NOS(1), 0.3], [BOING(1), 0.6], [FNISS(2), 1.1 + L(6)]], musik: true,
    bild: 'Hunden hukar och puffar bollen förbi paketet, bollen far upp i en liten båge och landar. Malin när den landat', ljudtext: '`nos`, `boing`, fniss', ansikte: 'glad' },
  { id: '4', d: 0.9 + L(7) + G + 0.8, plats: 'Helbild', malin: [[7, 0.9]], ljud: [[NOS(2), 0.3], [BOING(2), 0.6], [JA(1), 1.1 + L(7)]], musik: true,
    bild: 'Hunden puffar en gång till, bollen rullar in under pallen med kaktusen', ljudtext: '`nos`, `boing`, `bjallror`, vov ja', ansikte: 'glad' },
  { id: '5', d: 0.6 + L(8) + G + 1.4, plats: 'Närbild', malin: [[8, 0.6]], ljud: [[FLAMT, 0.0], [JA(2), 0.9 + L(8)]], musik: true,
    bild: 'Hunden flämtar med tungan ute, kroppen andas. Nickar efter frågan', ljudtext: '`flamt-valp`, vov ja', ansikte: 'glad, tungan ute' },

  // --- Vattnet: tre glas ---
  { id: '6', d: 1.9 + L(9) + G, plats: 'Halvbild', malin: [[9, 1.9]], ljud: klunk2(1.9 + L(9) * 0.45, 9),   // grind 6: 1,3 s mer före repliken, hunden hinner plocka upp glaset
    bild: 'Glaset med sugrör står på golvet. Hunden tar det (tassen på glasets kant) och dricker genom sugröret med glaset framför magen, vattnet sjunker i två steg', ljudtext: '`klunk` × 2', ansikte: 'glad' },
  { id: '7', d: 0.5 + L(10) + G + 1.0, plats: 'Halvbild', malin: [[10, 0.5]], ljud: [[JA(3), 0.7 + L(10)]],
    bild: 'Hunden tittar ner i det tomma glaset och sedan på oss. Nickar', ljudtext: 'vov ja', ansikte: 'nyfiken → glad' },
  { id: '8a', d: 0.3 + L(11) + 3.0, plats: 'Närbild: glaset', malin: [[11, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan svävar över glaset. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '8b', d: 0.2 + L(12) + G, plats: 'Närbild: glaset', malin: [[12, 0.2]], ljud: [[GLITTER, 0.0]],
    bild: 'Vattnet fylls i nerifrån och upp, litet glitter', ljudtext: '`glitter`', ansikte: '–' },
  { id: '9', d: 0.4 + L(13) + G, plats: 'Halvbild', malin: [[13, 0.4]], ljud: klunk2(0.4, 13),
    bild: 'Hunden dricker igen, magen lite rundare', ljudtext: '`klunk` × 2', ansikte: 'glad' },
  { id: '10', d: 0.3 + L(14) + G + 1.0, plats: 'Halvbild', malin: [[14, 0.3]], ljud: [[JA(4), 0.5 + L(14)]],
    bild: 'Hunden tittar på oss och nickar', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(15) + G + 0.6, plats: 'Närbild: glaset', malin: [[15, 0.3]], ljud: [[RITA(3), 0.3], [GLITTER, 0.3 + L(15)]],
    bild: 'Kritan fyller på en tredje gång', ljudtext: 'kritan ritar, `glitter`', ansikte: '–' },
  { id: '12', d: 0.4 + L(16) + 0.5 + L(17) + G + 0.8, plats: 'Halvbild', malin: [[16, 0.4], [17, 0.9 + L(16)]],
    ljud: [...klunk2(0.4, 16), [FNISS(3), 1.1 + L(16) + L(17)]],
    bild: 'Hunden dricker, magen rund. Sedan tittar den på magen', ljudtext: '`klunk` × 2, fniss', ansikte: 'glad → fnissig' },

  // --- Behöver du kissa? ---
  { id: '13', d: 0.8 + L(18) + G + 1.2, plats: 'Helbild', malin: [[18, 0.8]], ljud: [[PIP(1), 1.0 + L(18)]],
    bild: 'Hunden vickar lugnt från fot till fot, svansen rak och stilla, öronen upp. Malin efter vicket', ljudtext: 'frågande pip', ansikte: 'nyfiken, osäker' },
  { id: '14', d: 0.4 + L(19) + G + 0.8, plats: 'Närbild', malin: [[19, 0.4]], ljud: [[JA(1), 0.6 + L(19)]],
    bild: 'Hunden tittar upp på oss, vickar och nickar snabbt', ljudtext: 'vov ja', ansikte: 'nyfiken → glad' },
  { id: '15', d: 0.3 + L(20) + G + 0.6, plats: 'Helbild → kritsvep', malin: [[20, 0.3]], ljud: [[TASS(5), 0.6], [TASS(6), 1.0], [TASS(1), 1.4], [SVEP, 0.3 + L(20) + G]],
    bild: 'Hunden travar ut åt höger med små snabba steg, kritsvep till badrummet (1,6 s, vaxkorn som 006)', ljudtext: 'små steg, kritsvep', ansikte: 'glad' },

  // --- Badrummet: pottan ---
  { id: '16', d: 1.6 + L(21) + G + 1.0, plats: 'Badrummet, helbild', malin: [[21, 1.6]], ljud: [[TASS(2), 0.3], [TASS(3), 0.7], [PIP(2), 1.8 + L(21)]],
    bild: 'Hunden travar in, tittar åt vänster och åt höger. Handfatet står där, ingen potta. Hunden vickar', ljudtext: 'steg, frågande pip', ansikte: 'nyfiken' },
  { id: '17a', d: 0.3 + L(22) + 3.0, plats: 'Halvbild: golvet bredvid hunden', malin: [[22, 0.3]], ljud: [[RITA(4), 0.4]],
    bild: 'Kritan kommer in och ritar pottans kontur på golvet i ett drag. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '17b', d: 0.3 + L(23) + G, plats: 'Halvbild', malin: [[23, 0.3]], ljud: [[GLITTER, 0.0]],
    bild: 'Pottan fylls i inifrån', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '18', d: 0.2 + L(24) + G + 0.6, plats: 'Halvbild', malin: [[24, 0.2]], ljud: [[JA(2), 0.4 + L(24)]],
    bild: 'Hunden nickar direkt, vickar fortfarande', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '19', d: 0.3 + L(25) + G + 0.4, plats: 'Helbild', malin: [[25, 0.3]], ljud: [[TASS(4), 0.4], [TASS(5), 0.8]],
    bild: 'Hunden travar till pottan och sätter sig, pottan glider in framför nedre delen', ljudtext: 'små snabba steg', ansikte: 'glad' },
  { id: '20', d: 2.2 + L(26) + 0.4 + 1.4, plats: 'Halvbild: hunden på pottan', malin: [[26, 2.2]], ljud: [[PORL, 0.3], [SUCK, 2.6 + L(26)]],
    bild: 'Hunden sitter på pottan (bara framifrån). Paus 2 s med ett mycket tyst porl, sedan lättad: ögonen halvslutna, öronen sjunker', ljudtext: '`porl` tyst, mysig suck', ansikte: 'lättad, halvslutna ögon' },
  { id: '21', d: 0.4 + L(27) + G + 0.8, plats: 'Halvbild', malin: [[27, 0.4]], ljud: [[JA(3), 0.6 + L(27)], [SVANS, 0.8 + L(27)]],
    bild: 'Hunden öppnar ögonen och ser glad ut, svansen viftar', ljudtext: 'vov ja, svansvift', ansikte: 'jätteglad' },
  { id: '22', d: 0.3 + L(28) + G + 0.8, plats: 'Halvbild', malin: [[28, 0.3]], ljud: [[FNISS(4), 0.5 + L(28)]],
    bild: 'Samma, öronen upp', ljudtext: 'fniss', ansikte: 'fnissig' },

  // --- Inget papper: kritan ritar toarullen, den rullar iväg ---
  { id: '23', d: 0.6 + L(29) + G + 1.0, plats: 'Halvbild', malin: [[29, 0.6]], ljud: [[PIP(3), 0.8 + L(29)]],
    bild: 'Hunden tittar åt vänster och åt höger, öronen faller lite', ljudtext: 'frågande pip', ansikte: 'nyfiken → osäker' },
  { id: '24a', d: 0.3 + L(30) + 3.0, plats: 'Närbild: golvet bredvid pottan', malin: [[30, 0.3]], ljud: [[RITA(5), 0.4]],
    bild: 'Kritan ritar toarullens kontur bredvid pottan. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '24b', d: 0.3 + L(31) + G, plats: 'Närbild', malin: [[31, 0.3]], ljud: [[GLITTER, 0.0]],
    bild: 'Toarullen fylls i inifrån', ljudtext: '`glitter`', ansikte: '–' },
  { id: '25', d: 0.2 + L(32) + G + 0.6, plats: 'Halvbild', malin: [[32, 0.2]], ljud: [[JA(4), 0.4 + L(32)]],
    bild: 'Hunden nickar och tar rullen i tassen', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '26', d: 0.9 + L(33) + G + 0.6, plats: 'Helbild', malin: [[33, 0.9]], ljud: [[RULL, 0.4], [PIP(1), 1.1 + L(33)]],
    bild: 'Rullen glider ur tassen och rullar lugnt över golvet till bakom handfatet, en lång vit pappersslinga efter sig. Malin efter', ljudtext: '`rull`, pip', ansikte: 'förvånad' },
  { id: '27', d: 0.4 + L(34) + G + 0.6, plats: 'Halvbild', malin: [[34, 0.4]], ljud: [[PIP(2), 0.6 + L(34)]],
    bild: 'Hunden tittar åt vänster och åt höger', ljudtext: 'frågande pip', ansikte: 'nyfiken' },
  { id: '28', d: 0.3 + L(35) + 5.0, plats: 'Helbild', malin: [[35, 0.3]],
    bild: 'Slingan går över golvet och försvinner bakom handfatet. Efter 3 s skimrar slingans slut svagt', ljudtext: 'tyst, hunden blinkar', ansikte: 'nyfiken' },
  { id: '29', d: 0.4 + L(36) + G + 0.8, plats: 'Närbild: bakom handfatet', malin: [[36, 0.4]], ljud: [[TINDRA, 0.2], [JA(1), 0.6 + L(36)]],
    bild: 'Slingans slut och en bit av rullen skimrar tydligt bakom handfatets skåp', ljudtext: '`tindra`, vov ja', ansikte: 'jätteglad' },
  { id: '30', d: 0.6 + L(37) + G, plats: 'Närbild: hunden på pottan', malin: [[37, 0.6]], ljud: [[RITSCH, 0.3]],
    bild: 'Hunden river av en lapp från slingan vid pottan. Malin efter ritschet', ljudtext: '`ritsch`', ansikte: 'glad' },
  { id: '31', d: 0.6 + L(38) + G + 0.6, plats: 'Halvbild', malin: [[38, 0.6]], ljud: [[JA(2), 0.8 + L(38)]],
    bild: 'Tassen sänks ner bakom pottkanten och upp igen, en gång. Inget mer syns', ljudtext: 'vov ja', ansikte: 'glad' },
  { id: '32', d: 0.6 + L(39) + G + 0.8, plats: 'Halvbild', malin: [[39, 0.6]], ljud: [[DUNS, 0.4 + L(39)], [FNISS(5), 0.8 + L(39)]],
    bild: 'Hunden släpper lappen i pottan på *"Plopp!"* och reser sig', ljudtext: '`duns`, fniss', ansikte: 'fnissig' },

  // --- Tvätta händerna ---
  { id: '33', d: 0.3 + L(40) + 4.0 + L(41) + G + 0.6, plats: 'Helbild', malin: [[40, 0.3], [41, 0.3 + L(40) + 4.0]], ljud: [[JA(3), 0.5 + L(40) + 4.0 + L(41)]],
    bild: 'Hunden tittar mot handfatet. Paus 4 s: barnet svarar', ljudtext: 'vov ja', ansikte: 'nyfiken → glad' },
  { id: '34', d: 0.6 + L(42) + G + 0.6, plats: 'Halvbild: handfatet', malin: [[42, 0.6]], ljud: [[HOPP(1), 0.2], [KRAN, 0.6 + L(42) * 0.6]],
    bild: 'Hunden kliver upp på pallen bakom handfatet (syns från magen och upp). Kranen sätts på, strålen rinner', ljudtext: '`hopp-mjuk`, `kran`', ansikte: 'glad' },
  { id: '35', d: 0.6 + L(43) + G + 0.4, plats: 'Närbild: tassarna', malin: [[43, 0.6]], ljud: [[PLASK(1), 0.3], [FNISS(6), 0.8 + L(43)]],
    bild: 'Ena tassen under strålen och tvålen, skummet växer', ljudtext: '`plask`, fniss', ansikte: 'glad' },
  { id: '36', d: 0.6 + L(44) + G, plats: 'Närbild: tassarna', malin: [[44, 0.6]], ljud: [[PLASK(2), 0.3]],
    bild: 'Andra tassen, skummet växer', ljudtext: '`plask`', ansikte: 'glad' },
  { id: '37', d: 0.6 + L(45) + G + 0.8, plats: 'Närbild: ansiktet', malin: [[45, 0.6]], ljud: [[FNISS(1), 0.3], [PLASK(3), 0.6 + L(45) * 0.6]],
    bild: 'En skumklick på nosen, hunden blinkar. Gnuggar bort den', ljudtext: 'fniss, `plask`', ansikte: 'fnissig' },
  { id: '38', d: 0.4 + L(46) + G + 0.4, plats: 'Halvbild', malin: [[46, 0.4]],
    bild: 'Hunden trycker tassarna mot julhandduken till vänster (mot pottan), en gång per tass', ljudtext: '–', ansikte: 'glad' },
  { id: '39', d: 0.6 + L(47) + 4.0, plats: 'Helbild', malin: [[47, 0.6]], ljud: [[KLAPP(1), 0.6 + L(47) + 1.2], [KLAPP(2), 0.6 + L(47) + 1.8], [FNISS(2), 0.6 + L(47) + 2.6]],
    bild: 'Hunden står stolt vid handfatet. Paus 4 s: alla klappar händerna', ljudtext: '`klapp`, fniss', ansikte: 'jätteglad' },
  { id: '40', d: 0.6 + L(48) + G + 0.6, plats: 'Helbild → kritsvep', malin: [[48, 0.6]], ljud: [[HOPP(2), 0.2], [TASS(6), 0.7 + L(48)], [SVEP, 0.6 + L(48) + G]],
    bild: 'Hunden skuttar ner från pallen och travar ut åt vänster, kritsvep tillbaka till vardagsrummet', ljudtext: '`hopp-mjuk`, steg, kritsvep', ansikte: 'glad' },

  // --- Vardagsrummet igen: leka, snön, dansa, hej då ---
  { id: '41', d: 0.8 + L(49) + G + 0.6, plats: 'Kaktusrummet, helbild', malin: [[49, 0.8]], ljud: [[NOS(3), 0.3], [JA(4), 1.0 + L(49)]], musik: true,
    bild: 'Hunden puffar fram bollen under pallen', ljudtext: '`nos`, `bjallror`, vov ja', ansikte: 'glad' },
  { id: '42', d: 0.6 + L(50) + G + 0.8, plats: 'Helbild', malin: [[50, 0.6]], ljud: [[BOING(3), 0.4], [FNISS(3), 0.8 + L(50)]], musik: true,
    bild: 'Hunden puffar bollen, den landar på paketet och guppar', ljudtext: '`boing`, fniss', ansikte: 'fnissig' },
  // rad 44 (dansen) borttagen: Sanna 2026-11-20, feedback J17 3:55 "remove dans"
  { id: '45', d: 0.6 + L(53) + G + 1.0, plats: 'Halvbild', malin: [[53, 0.6]], ljud: [[HEJDA(1), 0.8 + L(53)]], musik: true,
    bild: 'Hunden vinkar (armen bakom kroppen)', ljudtext: 'vov hej då', ansikte: 'jätteglad' },
  { id: '46', d: 0.3 + L(54) + 1.4, plats: 'Halvbild', malin: [[54, 0.3]], ljud: [[HEJDA(2), 0.5 + L(54)]], musik: true,
    bild: 'Samma, vinkar klart', ljudtext: 'vov hej då', ansikte: 'glad' },
  { id: '47', d: 3.0, plats: 'Kritirisen', musik: true, bild: 'Kritirisen runt hunden, 0,6 s svart', ljudtext: 'karolen tonar ut', ansikte: '–' },
];
