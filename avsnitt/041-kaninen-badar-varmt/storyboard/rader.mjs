// Storyboardens rader för 041 Kaninen badar varmt: en stillbild per uppslag (manus.md). bygg.mjs räknar starttiderna
// (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/
// utan .m4a, sekunder in i raden]].
// Replikerna har nummer med luckor (10, 26, 27 och 37 ströks, 48 är "Tack, kritan!" efter båten), så L(n) slår upp numret,
// inte radens plats i rost.txt. Längderna mäts med ffprobe på assets/ljud/roster/kaninen-badar-varmt/<namn>.m4a.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HAR = new URL('./', import.meta.url).pathname, ROSTER = new URL('../../../assets/ljud/roster/kaninen-badar-varmt/', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+)$/).slice(1));
const langd = namn => +(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ROSTER + namn + '.m4a'])).toFixed(2);
export const ROST = rader.map(([namn, text]) => [namn, text, langd(namn)]);   // [namn, text, längd]
const NR = Object.fromEntries(ROST.map((r, i) => [+r[0].slice(0, 2), i]));
export const R = n => ROST[NR[n]];   // repliken med nummer n
export const L = n => R(n)[2];

// Kaninens röst (kanin-gullig, 022): 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande. b = andra tagningen.
const K = (n, b = '') => `kanin-gullig/kanin-gullig-${n}${b}`, HEJDA = 'kanin-gullig/kanin-hejda-2';
export const BORTA_T = { 16: 3.22, 17: 2.29, 21: 1.70 };   // där "borta!" börjar i repliken (whisper, ordtider, 2026-11-18)
const BORTA = n => BORTA_T[n];

export const RADER = [
  { id: '00', d: 3.3, plats: 'Intro (fast)', bild: 'Det gemensamma introt *Djuren hittar på!* (`produktion/youtube/bilderbok-intro/`). Platshållare i storyboarden', ljudtext: 'introts eget', ansikte: '–' },

  // --- Kritan ritar (papperet): snöflingan ---
  { id: '01a', d: 8.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar snöflingans kontur i lugna drag: mitten, sedan en arm i taget med sina V-grenar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga snöflingan fylls i inifrån och börjar rotera sakta. Sista 0,8 s: zoom in i teckningen, vitt över', ljudtext: '`glitter`', ansikte: '–' },

  // --- Badrummet: kall ---
  { id: '1', d: 1.6 + L(4) + 1.8, plats: 'Badrummet, helbild', malin: [[4, 1.6]],
    ljud: [['knarr-sno/knarr-sno-1', 0.1], ['tass/tass-1', 0.7], ['tass/tass-2', 1.2], ['kanin-gullig/kanin-hej-4', 1.8 + L(4)]],
    bild: 'Snön faller i fönstret. Kaninen skuttar in från dörren med snö på öronen, nosen och huvudet, stannar och vinkar', ljudtext: '`knarr-sno`, `tass`, `kanin-hej`', ansikte: 'glad' },
  { id: '2', d: 0.6 + L(5) + 1.8, plats: 'Närbild kaninen', malin: [[5, 0.6]], ljud: [['huttra/huttra-1', 0.1], ['brr/brr-1', 0.8 + L(5)]],
    bild: 'Kaninen huttrar (små skak i sidled), öronen hänger', ljudtext: '`huttra`, `brr`', ansikte: 'lite ledsen' },
  { id: '3', d: 0.3 + L(6) + 1.6, plats: 'Närbild snön på örat (1,5 s) → kaninen', malin: [[6, 0.3]], ljud: [['ja-babbel/ja-babbel-1', 0.5 + L(6)]],
    bild: 'Klipp till snön på örat, sedan tillbaka. Kaninen nickar', ljudtext: '`ja-babbel`', ansikte: 'glad' },

  // --- Vattnet sätts på, väntan ---
  { id: '4', d: 0.6 + L(7) + 1.5, plats: 'Närbild kranen', malin: [[7, 0.6]], ljud: [['kran/kran-1', 0.3], [K(2), 0.8 + L(7)]],
    bild: 'Kranen sätts på, vattnet rinner ner i karet, lite ånga', ljudtext: '`kran`, förtjust (2)', ansikte: 'glad' },
  { id: '5', d: 1.6 + L(8) + 1.0 + L(9) + 1.2, plats: 'Badrummet, helbild', malin: [[8, 1.6], [9, 1.6 + L(8) + 1.0]],
    ljud: [['tass/tass-3', 0.2], [K(5), 1.7 + L(8)], [K(6), 1.7 + L(8) + 1.0 + L(9)]],
    bild: 'Kaninen skuttar fram till karet och sträcker på sig för att titta över kanten. Lite skum', ljudtext: 'nyfiken (5), trumpen (6)', ansikte: 'nyfiken → trumpen' },
  { id: '6', d: 4.5, plats: 'Badrummet, helbild', ljud: [['kran/kran-1', 0.0], ['huttra/huttra-2', 1.2]],
    bild: 'Väntan utan replik: kaninen huttrar, tittar på kranen, tittar ut mot barnet, blinkar. Skummet stiger', ljudtext: '`kran`, `huttra`', ansikte: 'nyfiken' },
  { id: '7', d: 1.0 + L(11) + 1.0 + L(12) + 1.4, plats: 'Badrummet, helbild', malin: [[11, 1.0], [12, 1.0 + L(11) + 1.0]],
    ljud: [[K(2, 'b'), 1.2 + L(11) + 1.0 + L(12)]],
    bild: 'Kaninen sträcker på sig igen. Skummet står högt, ångan ringlar. Kranen stängs', ljudtext: 'förtjust (2b)', ansikte: 'jätteglad' },
  { id: '8', d: 0.4 + L(13) + 1.2, plats: 'Badrummet, helbild', malin: [[13, 0.4]],
    ljud: [['tass/tass-4', 0.66], ['tass/tass-5', 1.36], ['plask/plask-1', 1.96]],   // landningarna på orden (whisper: skutt 0,28, två skutt 0,99, plask 1,58 s in i repliken)
    bild: 'Ett skutt upp på pallens nedre steg ("skutt"), ett på det övre ("två skutt"), ett ner i karet ("plask")', ljudtext: '`tass`, `tass`, `plask`', ansikte: 'jätteglad' },
  { id: '9', d: 0.6 + L(14) + 1.8, plats: 'Badet', malin: [[14, 0.6]], ljud: [[K(4), 0.8 + L(14)]],
    bild: 'Bara huvudet ovanför kanten, ångan ringlar, kaninen blundar', ljudtext: 'mysig suck (4)', ansikte: 'sömnig, blundar' },

  // --- Snön smälter tre gånger ---
  { id: '10', d: 0.3 + L(15) + 0.4 + L(16) + 1.2, plats: 'Närbild öronen', malin: [[15, 0.3], [16, 0.3 + L(15) + 0.4]],
    ljud: [['droppar/droppar-1', 1.4 + L(15)], ['droppar/droppar-1', 2.0 + L(15)], ['tindra/tindra-3', 0.7 + L(15) + BORTA(16)]],
    bild: 'Snön på öronen blir droppar som rinner ner och är borta på "borta!". Öronen vippar', ljudtext: '`droppar`, `tindra`', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(17) + 1.6, plats: 'Närbild nosen', malin: [[17, 0.3]],
    ljud: [['droppar/droppar-1', 1.2], ['tindra/tindra-4', 0.3 + BORTA(17)], [K(3), 0.5 + L(17)]],
    bild: 'Samma på nosen, nosen rycker', ljudtext: '`droppar`, `tindra`, fniss (3)', ansikte: 'fnissig' },
  { id: '12', d: 0.3 + L(18) + 1.5, plats: 'Badet', malin: [[18, 0.3]], ljud: [[K(7), 0.5 + L(18)]],
    bild: 'Kaninen tittar åt vänster, sedan åt höger', ljudtext: 'frågande (7)', ansikte: 'nyfiken' },
  { id: '13a', d: 0.3 + L(19) + 0.2, plats: 'Badet, bred', malin: [[19, 0.3]],
    bild: 'Frågan till barnet', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '13b', d: 5.0, plats: 'Närbild snön mellan öronen', ljud: [['glimt/glimt-1', 3.0]],
    bild: 'Paus 5 s, bara snötussen mellan öronen. Den skimrar efter ca 3 s', ljudtext: 'tyst, `lysmask`', ansikte: 'nyfiken' },
  { id: '14', d: L(20) + 0.8 + L(21) + 1.4, plats: 'Närbild huvudet', malin: [[20, 0.0], [21, L(20) + 0.8]],
    ljud: [['droppar/droppar-1', L(20) + 1.3], ['tindra/tindra-3', L(20) + 0.8 + BORTA(21)], [K(2), L(20) + 1.0 + L(21)]],
    bild: 'Snötussen skimrar tydligt, smälter till droppar, borta', ljudtext: '`droppar`, `tindra`, förtjust (2)', ansikte: 'jätteglad' },
  { id: '15', d: 0.3 + L(22) + 0.8 + L(23) + 1.0, plats: 'Badet', malin: [[22, 0.3], [23, 0.3 + L(22) + 0.8]], ljud: [['ja-babbel/ja-babbel-2', 0.4 + L(22)]],
    bild: 'Kaninen ler, öronen vippar', ljudtext: '`ja-babbel`', ansikte: 'glad' },

  // --- Kritan ritar båten ---
  { id: '16a', d: 0.3 + L(24) + 0.3, plats: 'Badet', malin: [[24, 0.3]],
    bild: 'Kritan kommer in uppifrån till höger, mot vattnet', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '16b', d: 7.0, plats: 'Båtens utsnitt', ljud: [['krita-ritar/krita-ritar-2', 0.0]],
    bild: 'Kritan ritar båtens kontur på vattnet (ca 4 s), väntar och svävar ca 3 s: barnet gissar', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '16c', d: 0.4 + L(25) + 0.8, plats: 'Båtens utsnitt → badet', malin: [[25, 0.4]], ljud: [['glitter/glitter-2', 0.1]],
    bild: 'Den riktiga båten fylls i och landar på vattnet', ljudtext: '`glitter`', ansikte: 'jätteglad' },
  { id: '17', d: 0.6 + L(48) + 1.4, plats: 'Badet', malin: [[48, 0.6]], ljud: [[K(5), 0.1], [K(2), 0.8 + L(48)]],
    bild: 'Kaninen tittar på båten, öronen reser sig, och nickar mot kritan', ljudtext: 'nyfiken (5), förtjust (2b)', ansikte: 'nyfiken → glad' },

  // --- Båtleken ---
  { id: '19', d: 2.0 + L(28) + 1.0, plats: 'Badet', malin: [[28, 2.0]], ljud: [['bat-tut/bat-tut-1', 1.4 + L(28)], ['ja-babbel/ja-babbel-1', 2.2 + L(28)]],
    bild: 'Båten glider lugnt fram och tillbaka och guppar, kaninen följer den med blicken', ljudtext: '`bat-tut`, `ja-babbel`', ansikte: 'glad' },
  { id: '20a', d: 3.0, plats: 'Badet', ljud: [['plask/plask-2', 0.3]],
    bild: 'Kaninen sjunker ner i skummet, båten glider dit', ljudtext: '`plask`', ansikte: '– (under skummet)' },
  { id: '20b', d: 1.0 + L(29) + 1.6, plats: 'Badet', malin: [[29, 1.0]], ljud: [['plask/plask-3', 0.2], [K(3, 'b'), 1.2 + L(29)]],
    bild: 'Kaninen kommer upp under båten, som sitter kvar på huvudet', ljudtext: '`plask`, fniss (3b)', ansikte: 'förvånad → fnissig' },
  { id: '21', d: 2.5, plats: 'Badet', ljud: [['plask/plask-4', 0.6], ['bat-tut/bat-tut-1', 1.4]],
    bild: 'Öronen vippar, båten glider ner på vattnet igen', ljudtext: '`plask`, `bat-tut`', ansikte: 'glad' },

  // --- Vill inte gå upp ---
  { id: '22', d: 0.3 + L(30) + 1.8, plats: 'Badrummet, helbild', malin: [[30, 0.3]], ljud: [[K(6), 0.6 + L(30)]],
    bild: 'Kaninen skakar på huvudet och sjunker ner så att bara öronen syns', ljudtext: 'trumpen (6)', ansikte: 'trumpen' },
  { id: '23', d: 0.3 + L(31) + 1.0 + L(32) + 1.0, plats: 'Närbild öronen och ögonen', malin: [[31, 0.3], [32, 0.3 + L(31) + 1.0]], ljud: [[K(6, 'b'), 0.4 + L(31)]],
    bild: 'Bara öronen och ögonen ovanför skummet', ljudtext: 'trumpen (6b)', ansikte: 'trumpen' },

  // --- Kritan ritar fläkten ---
  { id: '24a', d: 0.3 + L(33) + 0.3, plats: 'Badrummet, helbild', malin: [[33, 0.3]],
    bild: 'Kritan kommer in mot dörröppningen till vänster', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '24b', d: 7.0, plats: 'Fläktens utsnitt', ljud: [['krita-ritar/krita-ritar-3', 0.0]],
    bild: 'Kritan ritar fläkten vid dörren: foten, halsen, ringen, bladen (ca 4 s), väntar ca 3 s', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '24c', d: 0.4 + L(34) + 0.8, plats: 'Fläktens utsnitt', malin: [[34, 0.4]], ljud: [['glitter/glitter-3', 0.1]],
    bild: 'Den riktiga fläkten fylls i', ljudtext: '`glitter`', ansikte: '–' },
  { id: '25', d: 0.3 + L(35) + 1.4, plats: 'Badrummet, helbild', malin: [[35, 0.3]], ljud: [[K(5, 'b'), 0.5 + L(35)]],
    bild: 'Kaninen kommer upp till nosen och tittar på fläkten', ljudtext: 'nyfiken (5b)', ansikte: 'nyfiken' },

  // --- Doften ---
  { id: '26', d: 1.5 + L(36) + 2.0, plats: 'Badrummet, helbild', malin: [[36, 1.5]], ljud: [['flakt/flakt-1', 0.2]],
    bild: 'Bladen snurrar. Fläkten drar in varma virvlar genom dörren och blåser dem mot karet. Båten glider åt höger i vinden', ljudtext: '`flakt` lågt (går till rad 33)', ansikte: 'nyfiken' },
  { id: '27', d: 0.6 + L(38) + 3.0 + L(39) + 1.0, plats: 'Närbild nosen', malin: [[38, 0.6], [39, 0.6 + L(38) + 3.0]], ljud: [['nos/nos-1', 0.8 + L(38) + 3.0 + L(39)]],
    bild: 'Virvlarna når nosen. Nosen rycker, öronen lyfts ett i taget. Luktpaus 3 s', ljudtext: '`nos`', ansikte: 'nyfiken' },
  { id: '28', d: 0.8 + L(40) + 1.8, plats: 'Närbild virvlarna → kaninen', malin: [[40, 0.8]], ljud: [['glimt/glimt-1', 0.3], [K(2), 1.0 + L(40)]],
    bild: 'Små pepparkakor (ett hjärta, en stjärna) svävar i virvlarna, sedan kaninen med stora glada ögon', ljudtext: '`glimt`, förtjust (2) (jippi-1 lät som "Nej!", QA 18/11)', ansikte: 'jätteglad' },

  // --- Upp ur badet ---
  { id: '29', d: 2.8 + L(41) + 0.6 + L(42) + 1.0, plats: 'Badrummet, helbild', malin: [[41, 2.8], [42, 2.8 + L(41) + 0.6]],
    ljud: [['plask/plask-1', 0.2], ['tass/tass-6', 0.95], ['tass/tass-1', 1.75], ['tass/tass-2', 2.5], ['huttra/huttra-1', 2.8 + L(41) + 0.4]],
    bild: 'Kaninen skuttar ur karet upp på pallens övre steg, ner på det nedre och ner på golvet, sedan repliken. Den huttrar lite', ljudtext: '`plask`, `tass`, `huttra`', ansikte: 'glad → lite kall' },
  // Sanna 19/11 "make bunny add towel back after drying": torkar sig (gnuggar), lyfter av handduken och hänger tillbaka den på kroken
  { id: '30', d: 1.6 + L(43) + 1.6 + 2.4, plats: 'Badrummet', malin: [[43, 1.6]], ljud: [['prassel-tyg/prassel-tyg-1', 1.0], [K(4, 'b'), 1.8 + L(43)], ['prassel-tyg/prassel-tyg-1', 1.6 + L(43) + 0.35], ['klad-sus/klad-sus-1', 1.6 + L(43) + 2.0]],
    bild: 'Handduken glider från kroken ner över axlarna (ritad i kod). Kaninen torkar sig, lyfter av handduken och hänger tillbaka den på kroken', ljudtext: '`prassel-tyg`, mysig suck (4b), `klad-sus`', ansikte: 'mysig' },
  { id: '31', d: 0.6 + L(44) + 1.2, plats: 'Badrummet', malin: [[44, 0.6]], ljud: [['mmm/mmm-1', 0.7 + L(44)]],
    bild: 'Kaninen vänder sig mot dörren (riktningsposen), nosen rycker mot doften', ljudtext: '`mmm`', ansikte: 'glad' },
  { id: '32', d: 0.6 + L(45) + 1.6, plats: 'Badrummet, helbild', malin: [[45, 0.6]], ljud: [[HEJDA, 0.8 + L(45)], ['bat-tut/bat-tut-1', 1.6 + L(45)]],
    bild: 'Kaninen vinkar, båten guppar, fläkten snurrar', ljudtext: '`kanin-hejda`, `bat-tut`', ansikte: 'jätteglad' },
  { id: '33', d: 0.3 + L(46) + 1.4, plats: 'Badrummet, helbild', malin: [[46, 0.3]], ljud: [['tass/tass-3', 1.05], ['tass/tass-1', 1.85]],
    bild: 'Kaninen skuttar bakom fläkten ut genom dörren (Sanna 19/11). Fläkten stannar', ljudtext: '`tass`', ansikte: 'glad' },
  { id: '34', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt dörröppningen', ljudtext: 'mattan klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
