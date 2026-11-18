// Storyboardens rader för 040 Leoparden går och lägger sig: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 039 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt ("namn längd" per rad, skriven när tagningen delades 2026-11-18).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries(readFileSync(HAR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Leopardens röst (spinn-gullig, Sanna 2026-11-18 "Nr 1 överallt"): 1c hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 8c hej då
const S = n => `spinn-gullig/spinn-gullig-${n}`, HEJ = S('1c'), HEJDA = S('8c');

export const RADER = [
  { id: '00', d: 3.3, plats: 'Intro (fast)', bild: 'Julintrot *Djuren hittar på!* (`produktion/youtube/bilderbok-intro-jul/`). Platshållare i storyboarden', ljudtext: 'introts eget', ansikte: '–' },

  // --- Kritan ritar (papperet): adventsstjärnan ---
  { id: '01a', d: 7.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar adventsstjärnans kontur i lugna drag, uddarna ett i taget och snöret sist', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.0, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Stjärnan fylls i inifrån och tänds mjukt. Sista 0,8 s: zoom in i teckningen, till badrummet', ljudtext: '`glitter`', ansikte: '–' },

  // --- Badrummet ---
  { id: '1', d: 2.0 + L(4) + 0.4 + 1.0 + L(5) + 0.8, plats: 'Badrummet, helbild', malin: [[4, 2.0], [5, 2.0 + L(4) + 1.4]],
    ljud: [['tass/tass-1', 0.3], ['tass/tass-2', 0.9], ['tass/tass-3', 1.5], [HEJ, 2.3 + L(4)]],
    bild: 'Leoparden går in på golvet från vänster, stannar bredvid handfatet och vinkar (armen bakom kroppen). Julhandduken och tomtetavlan på väggen', ljudtext: '`tass` ×3, `spinn-hej`', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(6) + 0.6 + L(7) + 1.4, plats: 'Halvbild, tomtetavlan', malin: [[6, 0.4], [7, 1.0 + L(6)]], ljud: [['glimt/glimt-1', 0.6], [S(2), 1.2 + L(6) + L(7)]],
    bild: 'Tomtetavlan på väggen glimmar, leoparden tittar upp mot den', ljudtext: '`glimt`, förtjust (2)', ansikte: 'glad, tittar upp' },
  { id: '3', d: 0.3 + L(8) + 2.2, plats: 'Badrummet, helbild', malin: [[8, 0.3]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.6 + L(8)], ['puff/puff-1', 1.1 + L(8)]],
    bild: 'Leoparden **nickar** och kliver upp på pallen bakom handfatet (som björnen i 023), syns från magen och upp', ljudtext: '–', ansikte: 'glad' },
  { id: '4', d: 1.0 + L(9) + 1.0, plats: 'Närbild, tassarna under kranen', malin: [[9, 1.0]], ljud: [['kran/kran-1', 0.2], ['plask/plask-1', 1.0 + L(9) - 1.0], ['plask/plask-2', 1.0 + L(9) - 0.4]],
    bild: 'Vattnet rinner (i kod), tassarna framför kroppen under strålen, små stänk på *"Plask, plask!"*', ljudtext: '`kran`, `plask` ×2', ansikte: 'glad' },
  { id: '5', d: 0.6 + L(10) + 1.4, plats: 'Halvbild', malin: [[10, 0.6]], ljud: [['glimt/glimt-2', 0.4], [S(2), 0.9 + L(10)]],
    bild: 'Leoparden lyfter tassarna, en glimt på dem', ljudtext: '`glimt`, förtjust (2)', ansikte: 'jätteglad' },
  { id: '6', d: 0.4 + L(11) + 0.8, plats: 'Närbild, kroken', malin: [[11, 0.4]], ljud: [['prassel-tyg/prassel-tyg-1', 0.4 + L(11) - 0.4]],
    bild: 'Pyjamasskjortan hänger på kroken bredvid julhandduken och gungar lite', ljudtext: '`prassel-tyg`', ansikte: '–' },
  { id: '7', d: 2.6 + L(12) + 3.0, plats: 'Halvbild', malin: [[12, 2.6]], ljud: [['klad-sus/klad-sus-1', 0.3], ['puff/puff-1', 2.3]],
    bild: 'Skjortan lyfter i en båge upp över leoparden och faller ner över huvudet. Frågan när ansiktet är dolt, sedan paus 3 s (skjortan gungar)', ljudtext: '`klad-sus`, `puff`', ansikte: 'dolt' },
  { id: '8', d: 0.2 + L(13) + 1.2, plats: 'Halvbild', malin: [[13, 0.2]], ljud: [['hopp-mjuk/hopp-mjuk-1', 0.25], ['spinn-fniss/spinn-fniss-1', 0.4 + L(13)]],
    bild: 'Leoparden hoppar ur skjortan på *"Tittut!"*: bålen snäpper på plats, öronen ploppar upp, landar mjukt', ljudtext: '`hopp-mjuk`, `spinn-fniss`', ansikte: 'jätteglad' },
  { id: '9', d: 0.3 + L(14) + 0.8, plats: 'Halvbild', malin: [[14, 0.3]], ljud: [['klad-sus/klad-sus-2', 0.5], ['klad-sus/klad-sus-3', 0.3 + L(14) - 0.6]],
    bild: 'Ärmarna glider ner över armarna, en i taget på orden', ljudtext: '`klad-sus` ×2', ansikte: 'glad' },
  { id: '10', d: 0.4 + L(15) + 1.6, plats: 'Halvbild', malin: [[15, 0.4]], ljud: [[S(4), 0.6 + L(15)]],
    bild: 'Leoparden i pyjamas, svansen vippar', ljudtext: 'mysig suck (4)', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(16) + 0.8, plats: 'Närbild, bålen', malin: [[16, 0.3]], ljud: [1, 2, 3].map(i => ['glimt/glimt-' + (i % 2 + 1), 0.3 + L(16) * (0.35 + 0.22 * i)]),
    bild: 'Tre stjärnor på skjortan glimmar en i taget på *"En, två, tre!"*', ljudtext: '`glimt` ×3', ansikte: '–' },
  { id: '12', d: 0.3 + L(17) + 3.0, plats: 'Ansiktsbild', malin: [[17, 0.3]], ljud: [['spinn-fniss/spinn-fniss-2', 0.3 + L(17) + 1.6]],
    bild: 'Leoparden tittar ner på stjärnorna och sedan ut mot barnet. Paus 3 s: barnet svarar', ljudtext: '`spinn-fniss`', ansikte: 'glad' },
  { id: '13', d: 0.6 + L(18) + 0.8, plats: 'Närbild, borsten', malin: [[18, 0.6]], ljud: [['glimt/glimt-1', 0.6 + L(18) * 0.6]],
    bild: 'Julborsten glider från muggen till tassen, närbild på *"borstar"*', ljudtext: '`glimt`', ansikte: '–' },
  { id: '14', d: 0.8 + L(19) + 0.8, plats: 'Ansiktsbild', malin: [[19, 0.8]], ljud: [['plopp/plopp-1', 0.5]],
    bild: 'Leoparden gapar: båda tandraderna syns. Malin efter gapet', ljudtext: '`plopp` lågt', ansikte: 'gap' },
  { id: '15', d: 0.3 + L(20) + 0.8, plats: 'Närbild, munnen', malin: [[20, 0.3]], ljud: [['skrubb/skrubb-1', 0.3], ['glimt/glimt-2', 0.3 + L(20) - 0.3]],
    bild: 'Borsten uppe, tänderna uppe blir blanka på *"rent!"*', ljudtext: '`skrubb`, `glimt`', ansikte: 'gap' },
  { id: '16', d: 0.3 + L(21) + 0.9, plats: 'Närbild, munnen', malin: [[21, 0.3]], ljud: [['skrubb/skrubb-2', 0.3]],
    bild: 'Borsten börjar nere … och leoparden stänger munnen och tar ner borsten', ljudtext: '`skrubb`, tvärt slut', ansikte: 'gap → nöjd' },
  { id: '17', d: 0.3 + L(22) + 1.2, plats: 'Ansiktsbild', malin: [[22, 0.3]], ljud: [[S(2), 0.5 + L(22)]],
    bild: 'Leoparden ler nöjt med munnen stängd, borsten nere. **Nickar**', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '18', d: 0.3 + L(23) + 0.6, plats: 'Närbild, munnen', malin: [[23, 0.3]], ljud: [['skrubb/skrubb-1', 0.3 + L(23)]],
    bild: 'Gapar igen, de nedre tänderna matta, borsten nere', ljudtext: '`skrubb`', ansikte: 'gap' },
  { id: '19', d: 0.2 + L(24) + 0.8, plats: 'Närbild, munnen', malin: [[24, 0.2]], ljud: [['tindra/tindra-1', 0.3]],
    bild: 'De nedre tänderna blir blanka, en stor glimt', ljudtext: '`tindra`', ansikte: 'gap' },
  { id: '20', d: 0.3 + L(25) + 1.4, plats: 'Ansiktsbild', malin: [[25, 0.3]], ljud: [[S(3), 0.5 + L(25)]],
    bild: 'Tandleendet (`flinar`)', ljudtext: 'fniss (3)', ansikte: 'visar tänderna' },
  { id: '21', d: 0.4 + L(26) + 1.8, plats: 'Halvbild', malin: [[26, 0.4]], ljud: [['klunk/klunk-1', 0.6 + L(26)], ['klunk/klunk-2', 1.2 + L(26)]],
    bild: 'Muggen glider upp till munnen, två klunkar', ljudtext: '`klunk` ×2', ansikte: 'blundar nöjt' },
  { id: '22', d: 0.5 + L(27) + 1.4, plats: 'Halvbild', malin: [[27, 0.5]], ljud: [[S(4), 0.7 + L(27)]],
    bild: 'Muggen tillbaka, leoparden sluter ögonen nöjt', ljudtext: 'mysig suck (4)', ansikte: 'nöjd' },
  { id: '23', d: 1.4 + L(28) + 1.0, plats: 'Halvbild', malin: [[28, 1.4]], ljud: [['gaspning/gaspning-1', 0.2]],
    bild: 'Leoparden gäspar, Malin frågar efter gäspningen', ljudtext: '`gaspning`', ansikte: 'sömnig' },
  { id: '24', d: 0.3 + L(29) + 2.0, plats: 'Badrummet, helbild → kritsvep', malin: [[29, 0.3]], ljud: [['tass/tass-4', 0.5], ['tass/tass-5', 1.1], ['swoosh/swoosh-1', 0.3 + L(29) + 0.4]],
    bild: 'Leoparden går ut till höger, kritsvep', ljudtext: '`tass`, kritsvep', ansikte: 'glad' },

  // --- Julsovrummet ---
  { id: '25', d: 1.6 + L(30) + 1.2, plats: 'Julsovrummet, helbild → närbild nallen', malin: [[30, 1.6]], ljud: [['tass/tass-1', 0.2], ['tass/tass-2', 0.8], [S(2), 1.8 + L(30)]],
    bild: 'Kvällsljus: lampan lyser, ljusen i ljusstaken, snö i fönstret. Leoparden kommer in. Klipp till nallen med tomteluvan på *"nallen"*', ljudtext: '`tass`, förtjust (2)', ansikte: 'glad' },
  { id: '26', d: 0.5 + L(31) + 1.4, plats: 'Fönstret och leoparden', malin: [[31, 0.5]], ljud: [[S(5), 0.7 + L(31)]],
    bild: 'Leoparden tittar mot fönstret, snön faller tätare en stund', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '27', d: 0.3 + L(32) + 1.6, plats: 'Julsovrummet, helbild', malin: [[32, 0.3]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.3 + L(32)], ['puff/puff-2', 0.8 + L(32)], ['nalle-hopp/nalle-hopp-1', 1.2 + L(32)]],
    bild: 'Leoparden hoppar upp bakom sängen, nallen glider upp bredvid kudden', ljudtext: '`hopp-mjuk`, `puff`, `nalle-hopp`', ansikte: 'jätteglad' },
  { id: '28', d: 0.4 + L(33) + 1.4, plats: 'Halvbild', malin: [[33, 0.4]], ljud: [[S(4), 0.6 + L(33)]],
    bild: 'Leoparden lutar sig mot nallen och sluter ögonen', ljudtext: 'mysig suck (4)', ansikte: 'mysig, blundar' },
  { id: '29', d: 0.3 + L(34) + 0.6, plats: 'Närbild, lampan', malin: [[34, 0.3]],
    bild: 'Lampan på nattduksbordet, ljusstaken bredvid', ljudtext: '–', ansikte: '–' },
  { id: '30', d: 0.3 + L(35) + 1.0, plats: 'Halvbild', malin: [[35, 0.3]], ljud: [[S(6), 0.2]],
    bild: 'Leoparden **skakar på huvudet** och tittar mot ljusstaken', ljudtext: 'trumpen (6)', ansikte: 'trumpen' },
  { id: '31', d: 0.4 + L(36) + 0.8, plats: 'Närbild, ljusstaken', malin: [[36, 0.4]], ljud: [['glimt/glimt-1', 0.3]],
    bild: 'Fyra ljus i ljusstaken, lågorna fladdrar', ljudtext: '`glimt`', ansikte: '–' },
  { id: '32', d: 0.4 + L(37) + 1.0, plats: 'Ansiktsbild', malin: [[37, 0.4]], ljud: [[S(6), 0.6 + L(37)]],
    bild: 'Leoparden tittar ner, öronen faller', ljudtext: 'trumpen (6)', ansikte: 'ledsen' },
  { id: '33a', d: 0.3 + L(38) + 3.0, plats: 'Fönstret och leoparden', malin: [[38, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3 + L(38)]],
    bild: 'Kritan ritar stjärnans kontur i fönstret', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '33b', d: 4.0, plats: 'Samma', bild: 'Gisspaus 4 s: konturen klar, kritan svajar bredvid', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '34', d: 0.4 + L(39) + 0.8, plats: 'Närbild, stjärnan', malin: [[39, 0.4]], ljud: [['glitter/glitter-2', 0.0], ['pling/pling-1', 0.6]],
    bild: 'Stjärnan fylls i och tänds mjukt, ett varmt sken växer ut', ljudtext: '`glitter`, `pling`', ansikte: '–' },
  { id: '35', d: 0.6 + L(40) + 0.6 + L(41) + 1.0, plats: 'Halvbild', malin: [[40, 0.6], [41, 1.2 + L(40)]], ljud: [[S(2), 0.2]],
    bild: 'Leoparden ser stjärnan: kawaii-ögon, öronen reser sig, ett litet skutt', ljudtext: 'förtjust (2)', ansikte: 'kawaii' },
  { id: '36', d: 0.3 + L(42) + 1.2, plats: 'Halvbild', malin: [[42, 0.3]], ljud: [[S(2), 0.5 + L(42)]],
    bild: 'Leoparden **nickar** mot stjärnan', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '37', d: 0.3 + L(43) + 2.0, plats: 'Närbild, ljusstaken och leoparden', malin: [[43, 0.3]], ljud: [1, 2, 3, 4].map(i => ['puff/puff-' + (i % 3 + 1), 0.3 + L(43) - 0.3 + 0.45 * i]),
    bild: 'Leoparden lutar sig mot ljusstaken och blåser: lågorna slocknar en i taget med en liten rökpuff', ljudtext: '`puff` ×4', ansikte: 'blåser' },
  { id: '38', d: 0.3 + L(44) + 1.2, plats: 'Halvbild', malin: [[44, 0.3]], ljud: [['lampa-klick/lampa-klick-1', 0.3 + L(44) * 0.3]],
    bild: 'Lampan släcks på *"lampan"*, nallen blundar på *"nallen"*, snön faller lugnt. Rummet blir varmt blått', ljudtext: '`lampa-klick`', ansikte: 'sömnig' },
  { id: '39', d: 0.6 + L(45) + 1.4, plats: 'Halvbild, mörkt rum', malin: [[45, 0.6]], ljud: [['tindra/tindra-2', 0.3]],
    bild: 'Bara stjärnan lyser, skenet dämpas och växer', ljudtext: '`tindra`', ansikte: 'sömnig' },
  { id: '40', d: 1.2 + L(46) + 0.6, plats: 'Ansiktsbild', malin: [[46, 1.2]], ljud: [['gaspning/gaspning-1', 0.1]],
    bild: 'Leoparden gäspar stort', ljudtext: '`gaspning`', ansikte: 'sömnig, gäspar' },
  { id: '41', d: 0.4 + L(47) + 1.4, plats: 'Halvbild', malin: [[47, 0.4]], ljud: [[HEJDA, 0.6 + L(47)]],
    bild: 'Leoparden vinkar sömnigt (armen bakom kroppen)', ljudtext: '`spinn-hejda`', ansikte: 'sömnig' },
  { id: '42', d: 3.4 + L(48) + 1.6, plats: 'Halvbild', malin: [[48, 3.4]], ljud: [['hopp-mjuk/hopp-mjuk-3', 2.3], ['snark-pip/snark-pip-1', 3.6], ['godnatt-pling/godnatt-pling-1', 3.4 + L(48)]],
    bild: 'Somnar C: ett litet hopp och landar liggande i pyjamas med huvudet på kudden, nallen bredvid, zzz. Malin när den ligger', ljudtext: '`hopp-mjuk`, `snark-pip`, `godnatt-pling`', ansikte: 'sover' },
  { id: '43', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt leoparden och stjärnan', ljudtext: 'mattan klingar ut', ansikte: 'sover' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
