// Storyboardens rader för 044 Katten gör en snögubbe: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 043 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt (mätt när tagningarna delades 2026-11-19).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries(readFileSync(HAR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Kattens röst (mjau-gullig från 035): 1 hej, 2 förtjust, 3 fniss, 4 mysig suck med spinn, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då.
const M = n => `mjau-gullig/mjau-gullig-${n}`;
// Nya kattljud (ElevenLabs SFX, Sanna 2026-11-19): "ooo" när katten blir förtjust, förvånat mjau. Malin väntar 0,7 s så att ljudet hörs först.
const OOO = n => `mjau-ooo/mjau-ooo-${n}`;
const OJ = n => `mjau-oj/mjau-oj-${n}`;
// Puttar bollen (ett ansträngt litet grymt), glad trill när kvisten kommer och efter klappen, nöjt spinn-mjau när snögubben ler och sist.
const PUTT = 'mjau-puttar/mjau-puttar-1';
const TRILL = n => `mjau-trill/mjau-trill-${n}`;
const SPINN = n => `mjau-spinn/mjau-spinn-${n}`;
// Fågeln som i 043: pip 1 hej, pip 5 glad (CC BY, kredit), pip 3 frågande; vingflax 3; frö-prassel 1.
const PIP = 'fagel-pip/fagel-pip-1', PIP_GLAD = 'fagel-pip/fagel-pip-5', PIP_FRAGA = 'fagel-pip/fagel-pip-3';
const FLAX = 'vingflax/vingflax-3', PRASSEL = 'fro-prassel/fro-prassel-1', PICK = 'pick/pick-1';
const KLAPP = 'klapp/klapp-1';   // katten klappar i tassarna (rad 35, Sanna 2026-11-19)
const STEG = n => `knarr-sno/knarr-sno-${n}`, DUNS = 'sno-duns/sno-duns-1', POP = 'pop/pop-1', GLIMT = n => `glimt/glimt-${n}`;

// BAK: katten går tillbaka till nästa lilla boll innan den skjuter den (Sanna 2026-11-19: rulla bollen med armarna)
const BAK = 1.8;
// HOLKN: närbild på fågeln som tittar ut ur holken innan den flyger (Sanna 2026-11-19)
const HOLKN = 1.6;

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar (papperet): snögubben, idén ---
  { id: '01a', d: 7.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar snögubbens kontur i lugna drag: underbollen, mellanbollen, huvudet, ögonen, näsan och halsduken', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Snögubben fylls i inifrån (med näsa och halsduk: idén). Zoom in i papperet, in i den tomma björkdungen', ljudtext: '`glitter`', ansikte: '–' },

  // --- Björkdungen: bygga ---
  { id: '1', d: 2.8 + L(4) + 1.4, plats: 'Björkdungen, helbild → närbild', malin: [[4, 2.8]], ljud: [[STEG(1), 0.5], [STEG(2), 1.3], [STEG(3), 2.0], [M(1), 3.1 + L(4)]],
    bild: 'Snön faller. Katten med tomteluvan trippar in från vänster och vinkar (armen bakom kroppen). Fotspår i snön', ljudtext: '`knarr-sno`, mjau hej (1)', ansikte: 'jätteglad' },
  { id: '2', d: 0.3 + L(5) + 2.0, plats: 'Halvbild', malin: [[5, 0.3]], ljud: [[M(7), 0.6 + L(5)]],
    bild: 'Katten står still och tittar på oss. Svarar med tre mjau, svansen vippar', ljudtext: 'mjau pratar (7)', ansikte: 'nyfiken → glad' },
  { id: '3', d: 1.3 + L(6) + 1.0, plats: 'Halvbild', malin: [[6, 1.3]], ljud: [[M(2), 0.0]],   // QA 19/11: Malin efter mjauet (1,15 s)
    bild: 'Glatt skutt (20 px), öronen upp. Malin efter skuttet', ljudtext: 'förtjust (2)', ansikte: 'jätteglad' },
  { id: '4', d: 0.3 + L(7) + 1.2, plats: 'Halvbild', malin: [[7, 0.3]], ljud: [[M(5), 0.5 + L(7)]],
    bild: 'Katten tittar ner på snön och lutar huvudet', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '5', d: 1.0 + L(8) + 0.8, plats: 'Halvbild', malin: [[8, 1.0]], ljud: [[OOO(1), 0.1]],
    bild: 'En liten snöboll ligger vid tassen. Katten tittar på den', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '6', d: 1.5 + L(9) + 1.0, plats: 'Björkdungen, helbild', malin: [[9, 1.5]], ljud: [[PUTT, 0.45], [DUNS, 1.3 + L(9)]],   // QA 19/11: puttljudet före Malin
    bild: 'Katten knuffar bollen med tassen. Den rullar till mitten och växer, ett blekt spår efter. *"Rulla, rulla …"* medan den rullar, *"… en stor boll!"* när den stannar', ljudtext: '`sno-duns`', ansikte: 'glad' },
  { id: '7', d: BAK + 0.8 + L(10) + 1.0, plats: 'Björkdungen, helbild', malin: [[10, BAK + 0.8]], ljud: [[STEG(3), 0.3], [STEG(4), 1.0], [DUNS, BAK + 0.6 + L(10)], [M(5), BAK + 0.8 + L(10)]],
    bild: 'Ny boll, knuff, den rullar, lyfter i en mjuk båge och landar på den stora', ljudtext: '`sno-duns`, nyfiken (5)', ansikte: 'glad' },
  { id: '8', d: BAK + 1.5 + L(11) + 1.0, plats: 'Björkdungen, helbild', malin: [[11, BAK + 1.5]], ljud: [[STEG(1), 0.3], [STEG(2), 1.0], [PUTT, BAK + 0.45], [DUNS, BAK + 1.3 + L(11)]],   // QA 19/11
    bild: 'En liten boll, knuff, den lyfter och landar överst', ljudtext: '`sno-duns`', ansikte: 'glad' },
  { id: '9', d: 0.6 + L(12) + 1.4, plats: 'Björkdungen, helbild', malin: [[12, 0.6]], ljud: [[M(2), 0.8 + L(12)]],
    bild: 'Tre bollar, inget ansikte. Katten tar ett steg bakåt, glatt skutt', ljudtext: 'förtjust (2)', ansikte: 'jätteglad' },

  // --- Stenarna ---
  { id: '10', d: 0.3 + L(13) + 3.0, plats: 'Närbild, huvudbollen', malin: [[13, 0.3]],
    bild: 'Huvudbollen utan ansikte. Paus 3 s: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '11', d: 0.3 + L(14) + 0.8, plats: 'Halvbild, katten och stenarna', malin: [[14, 0.3]], ljud: [[GLIMT(1), 0.1]],
    bild: 'Tio små gråa stenar i snön vid kattens fötter glimmar till', ljudtext: '`glimt`', ansikte: 'förvånad' },
  { id: '12', d: 1.0 + L(15) + 1.0, plats: 'Halvbild, katten och stenarna', malin: [[15, 1.0]], ljud: [[OOO(2), 0.05], [M(2), 1.2 + L(15)]],
    bild: 'Katten tittar ner på stenarna', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '13', d: 0.5 + L(16) + 1.0, plats: 'Närbild, huvudbollen', malin: [[16, 0.5]], ljud: [[POP, 0.7], [POP, 0.5 + L(16) * 0.6]],
    bild: 'En sten i taget lyfter från snön och sätter sig: *"ett öga … två ögon"*', ljudtext: '`pop` ×2', ansikte: '–' },
  { id: '14', d: 0.3 + L(17) + 1.0, plats: 'Närbild, huvudbollen', malin: [[17, 0.3]], ljud: [[POP, 0.3 + L(17) - 0.3]],
    bild: 'Fem små stenar lyfter tillsammans och lägger sig i en rak rad under ögonen', ljudtext: '`pop`', ansikte: '–' },
  { id: '15', d: 0.4 + L(18) + 1.0, plats: 'Närbild, mellanbollen', malin: [[18, 0.4]], ljud: [[POP, 0.4 + L(18) * 0.5], [POP, 0.4 + L(18) * 0.7], [POP, 0.4 + L(18) * 0.88], [M(2), 0.6 + L(18)]],
    bild: 'Tre stenar lyfter en i taget och sätter sig i en rad: *"en … två … tre"*', ljudtext: '`pop` ×3, förtjust (2)', ansikte: '–' },
  { id: '16', d: 0.3 + L(19) + 1.2, plats: 'Närbild, huvudbollen och katten', malin: [[19, 0.3]], ljud: [[M(5), 0.5 + L(19)]],
    bild: 'Snögubben har ögon och mun men ingen näsa. Katten lutar huvudet', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '17', d: 0.3 + L(20) + 1.2, plats: 'Björkdungen, helbild', malin: [[20, 0.3]], ljud: [[M(6), 0.5 + L(20)]],
    bild: 'Katten tittar på snögubben, sedan på oss, öronen ner', ljudtext: 'trumpen (6)', ansikte: 'trumpen' },

  // --- Kritan ritar moroten ---
  { id: '18a', d: 0.3 + L(21) + 4.5, plats: 'Björkdungen, helbild', malin: [[21, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3 + L(21)]],
    bild: 'Kritan kommer in och ritar morotens kontur i snön bredvid katten', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '18b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s: konturen klar, kritan svajar bredvid', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '18c', d: 1.1 + L(22) + 1.0, plats: 'Halvbild, moroten', malin: [[22, 1.1]], ljud: [['glitter/glitter-2', 0.0], [OOO(1), 0.25], [M(2), 1.3 + L(22)]],
    bild: 'Moroten fylls i inifrån, glimt', ljudtext: '`glitter`, förtjust (2)', ansikte: 'glad' },
  { id: '19', d: 0.3 + L(23) + 1.2, plats: 'Halvbild', malin: [[23, 0.3]], ljud: [[M(2), 0.5 + L(23)]],   // QA 19/11: mjauet efter repliken
    bild: 'Katten **nickar** mot kritan, svansen vippar', ljudtext: 'glatt mjau (2)', ansikte: 'glad' },
  { id: '20', d: 1.9 + L(24) + 1.4, plats: 'Björkdungen, helbild', malin: [[24, 1.9]], ljud: [[POP, 1.1], [OJ(1), 1.25], [M(3), 2.1 + L(24)]],
    bild: 'Moroten glider i en båge och landar på mellanbollen (fel!), vickar', ljudtext: '`pop`, fniss (3)', ansikte: 'fnissig' },
  { id: '21', d: 0.3 + L(25) + 0.8, plats: 'Närbild, huvudbollen', malin: [[25, 0.3]], ljud: [[POP, 0.5]],
    bild: 'Moroten hoppar upp till näsan på *"Hopp!"*', ljudtext: '`pop`', ansikte: '–' },
  { id: '22', d: 0.6 + L(26) + 1.4, plats: 'Närbild, snögubben', malin: [[26, 0.6]], ljud: [[SPINN(1), 0.8 + L(26)]],
    bild: 'Stenmunnen böjs från rak till ett leende', ljudtext: 'mysig suck (4)', ansikte: 'nöjd' },

  // --- Kvistarna ---
  { id: '23', d: 0.3 + L(27) + 1.2, plats: 'Björkdungen, helbild', malin: [[27, 0.3]], ljud: [[M(5), 0.5 + L(27)]],
    bild: 'Katten tittar på snögubbens sidor', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '24', d: 2.0 + L(28) + 1.0 + 2.0, plats: 'Björkdungen, helbild', malin: [[28, 2.0]], ljud: [[STEG(3), 0.3], [STEG(4), 1.0], [POP, 2.0 + L(28) - 0.3], [TRILL(1), 2.2 + L(28)], [STEG(1), 2.9 + L(28)], [STEG(2), 3.6 + L(28)]],
    bild: 'Katten går till björkarna och lutar sig ner. Kvisten poppar upp ur snön på *"en kvist!"* och flyger till snögubbens vänstra sida', ljudtext: '`knarr-sno`, `pop`, förtjust (2)', ansikte: 'glad' },
  { id: '25', d: 0.4 + L(29) + 1.4, plats: 'Björkdungen, helbild', malin: [[29, 0.4]], ljud: [[M(5), 0.6 + L(29)]],
    bild: 'Snögubben med en arm. Katten tittar åt vänster, sedan åt höger', ljudtext: 'frågande mjau (5)', ansikte: 'nyfiken' },
  { id: '26a', d: 0.3 + L(30) + 1.0, plats: 'Björkdungen, helbild', malin: [[30, 0.3]],
    bild: 'Helbild för frågan', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '26b', d: 4.0, plats: 'Närbild, fågelholkens stolpe', ljud: [[GLIMT(2), 2.0]],
    bild: 'Klipp till stolpen: en kvistspets sticker upp ur snön. Efter 3 s av pausen skimrar den svagt', ljudtext: 'tyst, svagt `glimt`', ansikte: '–' },
  { id: '27', d: 0.3 + L(31) + 1.0, plats: 'Närbild, fågelholkens stolpe', malin: [[31, 0.3]], ljud: [[GLIMT(1), 0.2], [M(2), 0.5 + L(31)]],
    bild: 'Skimret blir tydligt', ljudtext: '`glimt`, förtjust (2)', ansikte: '–' },
  { id: '28', d: 3.2 + L(32) + 1.0, plats: 'Björkdungen, helbild', malin: [[32, 3.2]], ljud: [[STEG(1), 0.4], [STEG(2), 1.1], [STEG(3), 1.8], [STEG(4), 2.5], [POP, 3.2 + L(32) - 0.3], [TRILL(2), 3.4 + L(32)]],
    bild: 'Katten går dit. Kvisten poppar upp på *"en kvist!"* och flyger till snögubbens högra sida', ljudtext: '`knarr-sno`, `pop`', ansikte: 'glad' },
  { id: '29', d: 2.6 + L(33) + 1.4, plats: 'Björkdungen, helbild', malin: [[33, 2.6]], ljud: [[STEG(1), 0.3], [STEG(2), 1.0], [STEG(3), 1.7], [M(3), 2.8 + L(33)]],
    bild: 'Kvistarmarna vickar en gång, som en vinkning. Katten fnissar', ljudtext: 'fniss (3)', ansikte: 'fnissig' },

  // --- Fågeln ---
  { id: '30', d: HOLKN + 1.3 + L(34) + 1.0, plats: 'Närbild holken → helbild', malin: [[34, HOLKN + 1.3]], ljud: [[PIP, 0.5], [FLAX, HOLKN + 0.4], [OJ(2), HOLKN + 0.5], [M(5), HOLKN + 1.5 + L(34)]],
    bild: 'Den lilla blå fågeln tittar ut ur holken och flyger i en båge mot snögubben', ljudtext: 'pip, flax, nyfiken (5)', ansikte: 'förvånad' },
  { id: '31', d: 0.6 + L(35) + 1.4, plats: 'Halvbild, snögubben och katten', malin: [[35, 0.6]], ljud: [[FLAX, 0.0], [PIP_GLAD, 0.8 + L(35)], [M(2), 1.2 + L(35)]],
    bild: 'Fågeln landar överst på snögubbens huvud, en snötuss puffar upp', ljudtext: 'flax, glatt pip, förtjust (2)', ansikte: 'jätteglad' },
  { id: '32', d: 0.3 + L(36) + 1.4, plats: 'Närbild, fågeln', malin: [[36, 0.3]], ljud: [[PIP_FRAGA, 0.5 + L(36)]],
    bild: 'Fågeln lutar huvudet och tittar ner på snön', ljudtext: 'frågande pip', ansikte: '–' },
  { id: '33a', d: 0.3 + L(37) + 2.0, plats: 'Björkdungen, helbild', malin: [[37, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.2]],
    bild: 'Kritan ritar påsens kontur bredvid katten (*"Kritan ritar igen!"*), påsen fylls i på *"En påse med frön."*', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '33b', d: 1.2, plats: 'Halvbild, påsen', ljud: [['glitter/glitter-3', 0.0]],
    bild: 'Påsen klar, glimt', ljudtext: '`glitter`', ansikte: 'glad' },
  { id: '34', d: 0.8 + L(38) + 1.0, plats: 'Halvbild', malin: [[38, 0.8]], ljud: [[PRASSEL, 0.2], [M(2), 1.0 + L(38)]],
    bild: 'Katten håller påsen, tippar den, fröna faller i en båge på snön', ljudtext: 'prassel, förtjust (2)', ansikte: 'glad' },
  // QA 19/11: fågeln hoppar ner redan 0,6 s före klippet (flaxet med den) och landar före Malin; picken på orden (whisper: 0,04/0,35/0,53 s)
  { id: '35', d: 1.2 + L(39) + 4.2, plats: 'Halvbild, fågeln vid fröna', malin: [[39, 1.2]], ljud: [[FLAX, -0.6], [PICK, 1.25], [PICK, 1.55], [PICK, 1.75], [KLAPP, 1.2 + L(39) + 1.4], [KLAPP, 1.2 + L(39) + 1.9], [KLAPP, 1.2 + L(39) + 2.4], [TRILL(1), 1.2 + L(39) + 2.9]],
    bild: 'Fågeln hoppar ner och pickar på *"pick, pick, pick"*', ljudtext: 'flax, `pick` ×3', ansikte: 'glad' },
  { id: '36', d: 0.6 + L(40) + 1.0, plats: 'Halvbild, snögubben och katten', malin: [[40, 0.6]], ljud: [[FLAX, 0.0], [PIP_GLAD, 0.8 + L(40)]],
    bild: 'Fågeln flyger tillbaka upp på snögubbens huvud', ljudtext: 'flax, glatt pip', ansikte: 'glad' },
  { id: '37', d: 0.3 + L(41) + 2.5, plats: 'Halvbild', malin: [[41, 0.3]],
    bild: 'Katten tittar på oss. Paus 4 s: barnet piper', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '38', d: 1.1 + L(42) + 1.0, plats: 'Halvbild', malin: [[42, 1.1]], ljud: [[M(1), 0.0], [PIP, 1.3 + L(42)]],
    bild: 'Katten svarar med ett mjau, fågeln piper efter', ljudtext: 'mjau (1), pip', ansikte: 'stolt' },
  { id: '39', d: 0.4 + L(43) + 1.4, plats: 'Björkdungen, helbild', malin: [[43, 0.4]], ljud: [[SPINN(2), 0.6 + L(43)]],
    bild: 'Katten, snögubben och fågeln', ljudtext: 'mysig suck (4)', ansikte: 'nöjd' },
  { id: '40', d: 0.5 + L(44) + 1.2, plats: 'Björkdungen, helbild', malin: [[44, 0.5]], ljud: [[M(8), 0.7 + L(44)], [PIP, 1.0 + L(44)]],
    bild: 'Katten vinkar (armen bakom kroppen), fågeln piper, kvistarmarna vickar', ljudtext: 'hej då (8), pip', ansikte: 'jätteglad' },
  { id: '41', d: 0.3 + L(45) + 1.4, plats: 'Björkdungen, helbild', malin: [[45, 0.3]], ljud: [[PIP_GLAD, 0.5 + L(45)]],
    bild: 'Katten vinkar klart', ljudtext: 'glatt pip', ansikte: 'glad' },
  { id: '42', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt katten och snögubben', ljudtext: 'fågelkvittret klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 1.1;   // 0,7 → 1,1: lite lugnare takt (Sanna 2026-11-19)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
