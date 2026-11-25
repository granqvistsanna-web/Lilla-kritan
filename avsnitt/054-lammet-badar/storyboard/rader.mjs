// Storyboardens rader för 054 Lammet badar: en stillbild per uppslag (manus.md). bygg.mjs räknar starttiderna
// (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/
// utan .m4a, sekunder in i raden]]. Längderna mäts med ffprobe på assets/ljud/roster/lammet-badar/<namn>.m4a, så en ny
// tagning av en replik räknar om tiderna av sig själv.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HAR = new URL('./', import.meta.url).pathname, ROSTER = new URL('../../../assets/ljud/roster/lammet-badar/', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+)$/).slice(1));
const langd = namn => +(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ROSTER + namn + '.m4a'])).toFixed(2);
export const ROST = rader.map(([namn, text]) => [namn, text, langd(namn)]);   // [namn, text, längd]
const NR = Object.fromEntries(ROST.map((r, i) => [+r[0].slice(0, 2), i]));
export const R = n => ROST[NR[n]];   // repliken med nummer n
export const L = n => R(n)[2];

// Lammets röst (ba-gullig, 024): 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande/pratar, 8 hej då.
// b = andra tagningen. Det långa fnisset är ba-fniss. Ankan: badanka-pip 1 frågande, 2 mjukt sjunkande.
const B = (n, b = '') => `ba-gullig/ba-gullig-${n}${b}`, FNISS = n => `ba-fniss/ba-fniss-${n}`, PIP = n => `badanka-pip/badanka-pip-${n}`;
// Ordtider inne i replikerna (whisper ord för ord, 2026-11-25): där "torrt!" börjar, och skutten i 8 och 16.
export const BORTA_T = { 27: 5.96, 28: 6.15, 29: 5.58 };   // omgång 3 (tydligare repliker, 25/11)
const TORRT = n => BORTA_T[n];
const SKUTT = { 8: [1.55, 2.53, 3.29], 16: [0.30, 1.25, 1.92] };
const SVAR = 0.9;   // pausen där lammet svarar innan Malin reagerar

export const RADER = [
  { id: '00', d: 1.0, plats: 'Intro (fast)', bild: 'Lilla Kritan-logotypen, 1 s. Platshållare i storyboarden', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar (papperet): badankan ---
  { id: '01a', d: 3.6, plats: 'Papperet, helbild', malin: [[1, 0.5]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar badankans kontur i ett drag (ca 2,8 s): kroppen, huvudet, näbben som eget drag, stjärten', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: 1.0 + L(2) + 3.2, plats: 'Papperet, helbild', malin: [[2, 1.0]],
    bild: 'Konturen står kvar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.8 + L(3) + 1.0, plats: 'Papperet → zoom in', malin: [[3, 0.8]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga badankan fylls i inifrån, ögat blinkar. Sista 0,8 s: zoom in i teckningen, vitt över', ljudtext: '`glitter`', ansikte: '–' },

  // --- Badrummet: hej, badet ---
  { id: '1', d: 2.1 + L(4) + 0.9, plats: 'Badrummet, helbild', malin: [[4, 2.1]],
    ljud: [['tass/tass-1', 0.45], ['tass/tass-2', 0.9], ['tass/tass-3', 1.3], ['tass/tass-4', 1.7], [B(1), 2.2 + L(4)]],
    bild: 'Ankan guppar i karet, borsten ligger på skumhögen vid kranen. Lammet går in från vänster (gångcykel, kameran följer), stannar och vinkar', ljudtext: '`tass`, hej (1)', ansikte: 'glad' },
  { id: '1b', d: 0.3 + L(5) + SVAR + L(6) + 0.6, plats: 'Halvnära lammet', malin: [[5, 0.3], [6, 0.3 + L(5) + SVAR]], ljud: [[B(2), 0.4 + L(5)]],
    bild: 'Lammet tittar mot karet och tillbaka, nickar i pausen, öronen vippar', ljudtext: 'förtjust (2) i pausen', ansikte: 'nyfiken → jätteglad' },
  { id: '2', d: 1.8 + L(7) + 1.1, plats: 'Närbild ankan (1,8 s) → lammet', malin: [[7, 1.8]], ljud: [[PIP(1), 0.5], [B(1, 'b'), 2.0 + L(7)]],
    bild: 'Klipp till ankan i karet, den piper. Tillbaka till lammet: stora glada ögon, öronen reser sig', ljudtext: '`badanka-pip`, förtjust (2b)', ansikte: 'jätteglad' },
  { id: '3', d: 0.4 + L(8) + 0.8, plats: 'Badrummet, helbild', malin: [[8, 0.4]],
    ljud: [['tass/tass-4', 0.4 + SKUTT[8][0] + 0.2], ['glid/glid-1', 0.4 + SKUTT[8][0] + 0.3], ['tass/tass-5', 0.4 + SKUTT[8][1] + 0.2], ['plask/plask-1', 0.4 + SKUTT[8][2] + 0.2], ['stank/stank-1', 0.4 + SKUTT[8][2] + 0.25]],
    bild: 'Ett skutt upp på pallens nedre steg ("skutt"), ett på det övre ("två skutt"), ett tydligt hopp ner i karet med huk och skumstänk ("plask"). När lammet landar på nedre steget glider borsten på golvet in bakom pallen, bara skaftet sticker fram', ljudtext: '`tass`, `glid`, `tass`, `plask`', ansikte: 'jätteglad' },
  { id: '4', d: 0.5 + L(9) + SVAR + L(10) + 1.2, plats: 'Badet', malin: [[9, 0.5], [10, 0.5 + L(9) + SVAR]], ljud: [[B(4), 0.6 + L(9)]],
    bild: 'Bara huvudet ovanför kanten, skummet runt om. I pausen blundar lammet en stund', ljudtext: 'mysig suck (4) i pausen', ansikte: 'blundar' },
  // omgång 3 (Sanna 26/11 "0:45 a bit too stressed"): ankan glider lugnare, lammet och ankan pratar med luft emellan, Malin väntar in dem
  { id: '5', d: 2.8 + L(11) + 1.0 + L(12) + SVAR + 0.5 + L(13) + 1.2, plats: 'Badet',
    malin: [[11, 2.8], [12, 2.8 + L(11) + 1.0], [13, 2.8 + L(11) + 1.0 + L(12) + SVAR + 0.5]],
    ljud: [[B(7), 0.3], [PIP(1), 1.2], [B(7, 'b'), 2.0], [PIP(2), 3.0 + L(11) + 1.0 + L(12)]],
    bild: 'Ankan glider lugnt fram till lammet. De "pratar" i tur och ordning, med paus emellan. På "Vad säger ankan?" piper ankan och lammet tittar på Malin', ljudtext: 'pratar (7) – pip – pratar (7b) – pip', ansikte: 'glad' },
  { id: '6a', d: 2.2, plats: 'Badet', ljud: [['blubb/blubb-1', 0.3]],
    bild: 'Lammet sjunker rakt ner i skummet. Ankan guppar', ljudtext: '`blubb`', ansikte: '– (under skummet)' },
  { id: '6b', d: 1.4 + L(14) + 1.3, plats: 'Badet', malin: [[14, 1.4]], ljud: [['plask/plask-3', 0.2], ['plopp/plopp-1', 0.55], [FNISS(1), 1.5 + L(14)]],
    bild: 'Lammet kommer upp med en stor skumtuss mellan öronen: skumhatten', ljudtext: '`plask`, fniss 1 (`ba-fniss`)', ansikte: 'förvånad → fnissig' },
  { id: '7', d: 0.9 + L(15) + 0.9, plats: 'Halvnära badet', malin: [[15, 0.9]], ljud: [['plask/plask-4', 0.3], ['glid/glid-1', 1.1], [B(3), 1.0 + L(15)]],
    bild: 'Öronen vippar och skumhatten glider av åt sidan. Lammet nickar', ljudtext: '`plask`, förtjust (2b)', ansikte: 'glad' },

  // --- Kritan ritar en båt (omgång 2) ---
  { id: 'b1', d: 0.3 + L(22) + 0.3, plats: 'Halvnära badet', malin: [[22, 0.3]],
    bild: 'Kritan kommer in uppe till höger, över badet. Lammet tittar upp', ljudtext: '–', ansikte: 'nyfiken' },
  { id: 'b2', d: 3.0 + L(2) + 2.0, plats: 'Badet', malin: [[2, 3.0]], ljud: [['krita-ritar/krita-ritar-3', 0.0]],
    bild: 'Kritan ritar en liten båt på skummet (ca 2,8 s). Konturen står kvar, kritan svävar: barnet gissar', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: 'b3', d: 1.0 + L(43) + 0.8, plats: 'Badet → närbild lammet', malin: [[43, 1.0]], ljud: [['glitter/glitter-3', 0.1], [B(2), 1.1 + L(43)]],
    bild: 'Båten fylls i inifrån och guppar. Kritan flyger ut. Närbild: lammet förvånat, sedan stora glada ögon', ljudtext: '`glitter`, förtjust (2)', ansikte: 'förvånad → jätteglad' },
  // omgång 3 (Sanna 26/11 "have malin say bath is over after boat play"): andra halvan av tagning 15 (52) efter båtleken
  { id: 'b4', d: 1.2 + L(44) + 1.6 + L(52) + 0.9, plats: 'Badet', malin: [[44, 1.2], [52, 1.2 + L(44) + 1.6]],
    ljud: [['bat-tut/bat-tut-1', 0.3], [PIP(1), 3.9], [FNISS(3), 4.2], ['vagor/vagor-2', 4.1]],
    bild: 'Lammet knuffar båten med nosen, båten glider till ankan och tillbaka', ljudtext: '`bat-tut`, `badanka-pip`', ansikte: 'glad' },
  { id: '8', d: 1.0 + L(16) + 1.1, plats: 'Badrummet, helbild', malin: [[16, 1.0]],
    ljud: [['plask/plask-1', 0.3], ['tass/tass-6', 1.0 + SKUTT[16][0] + 0.2], ['tass/tass-1', 1.0 + SKUTT[16][1] + 0.2], ['tass/tass-2', 1.0 + SKUTT[16][2] + 0.2], ['droppar/droppar-1', 1.4 + L(16)]],
    bild: 'Lammet stiger upp bakom kanten, skuttar till pallens övre steg, nedre och ner på golvet. Ankan och båten guppar kvar i badet', ljudtext: '`plask`, `tass` × 3, `droppar`', ansikte: 'glad' },

  // --- Problemet: blöt och platt ull, fryser ---
  { id: '9', d: 1.3 + L(17) + 1.0, plats: 'Närbild lammet', malin: [[17, 1.3]],
    ljud: [['droppar/droppar-1', 0.4], ['droppar/droppar-1', 1.1], ['droppar/droppar-1', 1.7 + L(17)], [B(5), 1.5 + L(17)]],
    bild: 'Ullen är platt och blöt (mörkare, slät), öronen hänger, droppar faller från öronen och magen. Lammet tittar ner på sig själv', ljudtext: '`droppar`, förvånad (5)', ansikte: 'förvånad' },
  { id: '10', d: 0.4 + L(18) + 0.7 + L(19) + SVAR + L(20) + 0.8, plats: 'Närbild lammet',
    malin: [[18, 0.4], [19, 0.4 + L(18) + 0.7], [20, 0.4 + L(18) + 0.7 + L(19) + SVAR]],
    ljud: [['huttra/huttra-1', 0.4 + L(18) + 0.2], [B(6), 0.5 + L(18) + 0.7 + L(19)], ['droppar/droppar-1', 1.0]],
    bild: 'Lammet huttrar (små skak i sidled), nickar i pausen. En liten pöl växer under fötterna', ljudtext: '`huttra`, trumpen (6) i pausen', ansikte: 'lite ledsen' },
  { id: '11', d: 1.8 + L(21) + 1.0, plats: 'Närbild kroken (1,6 s) → lammet', malin: [[21, 1.8]], ljud: [[B(7), 2.0 + L(21)]],
    bild: 'Lammet tittar åt vänster mot väggen. Klipp till kroken: den är tom. Tillbaka till lammet', ljudtext: 'frågande (7)', ansikte: 'nyfiken' },

  // --- Kritan ritar handduken ---
  { id: '12a', d: 0.3 + L(22) + 0.3, plats: 'Badrummet', malin: [[22, 0.3]],
    bild: 'Kritan kommer in uppe till höger, mot kroken', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '12b', d: 5.5, plats: 'Krokens utsnitt', ljud: [['krita-ritar/krita-ritar-2', 0.0]],
    bild: 'Kritan ritar en stor handduk på kroken: hängöglan, kanterna, rutorna (ca 3 s). Konturen står kvar, kritan svävar: barnet gissar (2,5 s)', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '13', d: 1.0 + L(23) + 0.9, plats: 'Krokens utsnitt', malin: [[23, 1.0]], ljud: [['glitter/glitter-2', 0.1], [B(2), 1.2 + L(23)]],
    bild: 'Den riktiga handduken fylls i inifrån. Kritan flyger ut uppe till höger', ljudtext: '`glitter`, förtjust (2)', ansikte: 'jätteglad' },
  { id: '14', d: 0.3 + L(24) + 2.0, plats: 'Halvnära lammet och handduken', malin: [[24, 0.3]], ljud: [[B(5, 'b'), 0.5 + L(24)]],
    bild: 'Lammet tittar på handduken, öronen reser sig lite. Paus 2 s', ljudtext: 'nyfiken (5b)', ansikte: 'nyfiken' },
  { id: '15', d: 0.2 + L(25) + 0.9, plats: 'Halvnära', malin: [[25, 0.2]], ljud: [[B(1), 0.4 + L(25)]],
    bild: 'Lammet nickar direkt', ljudtext: 'förtjust (2b)', ansikte: 'jätteglad' },

  // --- Torka tre gånger ---
  { id: '16', d: 1.7 + L(26) + 0.3 + L(27) + 0.6, plats: 'Badrummet, helbild', malin: [[26, 1.7], [27, 1.7 + L(26) + 0.3]],
    ljud: [['prassel-tyg/prassel-tyg-1', 0.6], ['handduk-gnugg/handduk-gnugg-4', 1.7 + L(26) + 0.3 + 2.8], ['puff/puff-1', 1.7 + L(26) + 0.3 + TORRT(27)], ['tindra/tindra-3', 1.7 + L(26) + 0.3 + TORRT(27) + 0.1]],
    bild: 'Handduken glider ner från kroken och lägger sig tvärs över lammets hjässa och öron (ansiktet syns). Den torkar med en lugn gungning. På "torrt!" lyfts den: öronen är fluffiga', ljudtext: '`prassel-tyg` när den glider, `handduk-gnugg`, `puff` + `tindra` på "torrt!"', ansikte: 'blundar nöjt → glad' },
  { id: '17', d: 1.6, plats: 'Närbild öronen', ljud: [['tindra/tindra-1', 0.2], [B(2, 'b'), 0.6]],
    bild: 'Reaktion: lammet tittar upp på sina fluffiga öron, blinkar och ler', ljudtext: 'förtjust (2)', ansikte: 'jätteglad' },
  { id: '18', d: 0.8 + L(28) + 0.6, plats: 'Halvnära', malin: [[28, 0.8]],
    ljud: [['prassel-tyg/prassel-tyg-1', 0.2], ['handduk-gnugg/handduk-gnugg-4', 0.8 + 2.7], ['puff/puff-2', 0.8 + TORRT(28)], ['tindra/tindra-4', 0.8 + TORRT(28) + 0.1]],
    bild: 'Handduken glider ner framför magen och torkar med en lugn gungning. På "torrt!" glider den undan: magen är fluffig', ljudtext: '`prassel-tyg`, `handduk-gnugg`, `puff` + `tindra`', ansikte: 'glad' },
  { id: '19', d: 1.0 + L(29) + 0.7, plats: 'Badrummet, helbild', malin: [[29, 1.0]],
    ljud: [['prassel-tyg/prassel-tyg-1', 0.3], ['handduk-gnugg/handduk-gnugg-4', 1.0 + 2.3], ['tindra/tindra-3', 1.0 + TORRT(29)]],
    bild: 'Handduken lägger sig framför hela lammet, från huvudet till golvet. Öronen och sidorna tittar fram. Den torkar med en lugn gungning. På "torrt!" lyfts den och glider tillbaka till kroken', ljudtext: '`prassel-tyg`, `handduk-gnugg`, `tindra`', ansikte: '– (under handduken)' },
  { id: '20', d: 1.25 + L(30) + 1.3, plats: 'Halvnära', malin: [[30, 1.25]],
    ljud: [['puff/puff-1', 0.1], ['puff/puff-3', 0.45], ['puff/puff-2', 0.8], [FNISS(2), 1.45 + L(30)]],
    bild: 'Lammet är ett runt fluffigt ullmoln, ansiktet mitt i. Det blinkar förvånat (0,3 s stilla), sedan stora glada ögon', ljudtext: '`puff` × 3, fniss 2 (`ba-fniss`)', ansikte: 'förvånad → jätteglad' },
  { id: '21', d: 1.2 + L(31) + SVAR + L(32) + 0.8, plats: 'Halvnära', malin: [[31, 1.2], [32, 1.2 + L(31) + SVAR]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.3], ['puff/puff-3', 0.6], [B(4, 'b'), 1.3 + L(31)]],
    bild: 'Lammet gör ett lugnt glatt skutt, ullen gungar mjukt efter. Mysig suck i pausen', ljudtext: '`puff`, mysig suck (4b)', ansikte: 'mysig' },

  // --- Borsten är borta (omgång 2) ---
  { id: '22', d: 0.5 + L(45) + 0.8, plats: 'Närbild lammet', malin: [[45, 0.5]], ljud: [['moln-puff/moln-puff-1', 0.1], [FNISS(4), 0.6 + L(45)]],
    bild: 'Ullmolnet är jättefluffigt, ullen står åt alla håll. Lammet fnissar', ljudtext: 'fniss (3)', ansikte: 'fnissig' },
  { id: '23a', d: 0.4 + L(46) + 0.9, plats: 'Närbild lammet', malin: [[46, 0.4]], ljud: [[B(7, 'b'), 0.9 + L(46)]],
    bild: 'Lammet tittar ner på golvet där borsten låg, sedan åt andra hållet, frågande', ljudtext: 'frågande (7b)', ansikte: 'nyfiken' },
  { id: '23b', d: 0.3 + L(47) + 1.6, plats: 'Badrummet, bred', malin: [[47, 0.3]],
    bild: 'Frågan till barnet, och de första sekunderna av pausen i den breda bilden', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '23c', d: 3.0, plats: 'Närbild pallens fot', ljud: [['glimt/glimt-1', 1.4]],
    bild: 'Pallens fot. Skaftet sticker fram bakom pallen och skimrar efter ca 1,4 s', ljudtext: 'tyst, `glimt`', ansikte: '–' },
  { id: '24', d: 1.0 + L(35) + 1.0, plats: 'Närbild skaftet → lammet', malin: [[35, 1.0]], ljud: [[B(2), 1.2 + L(35)]],
    bild: 'Skaftet skimrar. Klipp till lammet: stora glada ögon', ljudtext: 'förtjust (2)', ansikte: 'jätteglad' },
  { id: '25', d: 3.9, plats: 'Halvnära',
    ljud: [['glid/glid-1', 0.4], ['swoosh/swoosh-1', 1.25], [B(1, 'b'), 2.7]],
    bild: 'Lammet sträcker sig mot pallen. Borsten glider ut bakom pallen, hoppar upp och glider i en båge till lammets tass (som handduken)', ljudtext: '`glid`, `swoosh`, förtjust (2b)', ansikte: 'nyfiken → jätteglad' },
  { id: '26a', d: 0.6 + L(49) + 0.8, plats: 'Halvnära', malin: [[49, 0.6]], ljud: [['borsta/borsta-1', 0.6 + 1.92], [B(4), 0.7 + L(49)]],
    bild: 'Borsten går lugnt över öronen, ulltussarna blir släta och runda', ljudtext: '`borsta`', ansikte: 'blundar nöjt' },
  { id: '26b', d: 0.6 + L(50) + 0.8, plats: 'Närbild magen → ansiktet', malin: [[50, 0.6]], ljud: [['borsta/borsta-2', 0.6 + 2.14], [FNISS(5), 0.8 + L(50)]],
    bild: 'Borsten går över magen, ullen blir slät. Närbild på det nöjda ansiktet', ljudtext: '`borsta`, mysig suck (4)', ansikte: 'mysig' },
  { id: '26c', d: 0.6 + L(51) + 1.2, plats: 'Halvnära', malin: [[51, 0.6]], ljud: [['borsta/borsta-3', 0.6 + 3.01], ['tindra/tindra-3', 0.6 + L(51) - 0.3], [B(2), 0.7 + L(51)]],
    bild: 'Borsten går runt hela lammet: ullmolnet blir slätt, runt och fint. Krit-gnistor', ljudtext: '`borsta`, `tindra`', ansikte: 'jätteglad' },
  { id: '26d', d: 0.3 + L(38) + 0.6 + L(39) + SVAR + L(40) + 0.7, plats: 'Halvnära → närbild', malin: [[38, 0.3], [39, 0.3 + L(38) + 0.6], [40, 0.3 + L(38) + 0.6 + L(39) + SVAR]],
    ljud: [[B(3, 'b'), 0.5 + L(38) + 0.6 + L(39)]],
    bild: 'Lammet lägger borsten på kanten, tittar på Malin och nickar i pausen', ljudtext: 'förtjust (2b) i pausen', ansikte: 'jätteglad' },

  // --- Hej då ---
  { id: '27', d: 1.0 + L(41) + 1.4, plats: 'Badrummet, helbild', malin: [[41, 1.0]], ljud: [[B(8), 1.2 + L(41)], [PIP(2), 2.4 + L(41)]],
    bild: 'Lammet vinkar (armen bakom kroppen, hela armen syns), ankan och båten guppar', ljudtext: 'hej då (8), `badanka-pip`', ansikte: 'jätteglad' },
  { id: '28', d: 0.3 + L(42) + 1.6, plats: 'Badrummet, helbild', malin: [[42, 0.3]], ljud: [[B(8, 'b'), 0.5 + L(42)]],
    bild: 'Lammet vinkar lugnt vidare', ljudtext: 'hej då (8b)', ansikte: 'glad' },
  { id: '29', d: 2.5 + 0.6, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt lammet och ankan, 0,6 s svart', ljudtext: 'mattan klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.15;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
