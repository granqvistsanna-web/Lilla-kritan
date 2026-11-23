// Storyboardens rader för 051 Leoparden vaknar på julafton: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 048 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. musik: true = jul-julafton ligger lågt under raden.
// Längderna: ../rost-langder.txt (Malins tagning 1a, 2026-11-22).
import { readFileSync, existsSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const MATT = HAR + '../rost-langder.txt';
const matt = existsSync(MATT) ? Object.fromEntries(readFileSync(MATT, 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s])) : {};
const gissa = text => +(0.3 + text.length / 13 + 0.4 * (text.match(/…/g) || []).length).toFixed(2);
export const UPPSKATTAT = rader.some(([namn]) => !(namn in matt));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn] ?? gissa(text)]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Leopardens röst (023): brum-gullig 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande, 8 hej då (+ b-tagningar)
// Leoparden (Sanna 2026-11-22 "change bear to leo"): spinn-gullig i samma numrering; hej 1 → 1c, hej då 8/8b → 8c/8d, glad → 2/2b
const SPINN = { '1': '1c', '8': '8c', '8b': '8d' };
const B = n => `spinn-gullig/spinn-gullig-${SPINN[n] ?? n}`, GLAD = n => `spinn-gullig/spinn-gullig-${n % 2 ? '2' : '2b'}`, FNISS = n => `spinn-fniss/spinn-fniss-${n}`;
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = n => `glitter/glitter-${n}`, TINDRA = n => `tindra/tindra-${n}`;
const RING = 'ringklocka/ringklocka-1', GASP = 'gaspning/gaspning-1', BJALL = 'bjallror/bjallror-1', PRASSEL = 'prassel-tyg/prassel-tyg-1';
const HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`, NOS = n => `nos/nos-${n}`;
const SNARK = n => `snark-pip/snark-pip-${n}`, PLING = n => `pling/pling-${n}`, STEG = n => `smasteg/smasteg-${n}`, SUS = n => `klad-sus/klad-sus-${n}`;
const STRUMPA = n => `strumpa/strumpa-${n}`, SWOOSH = n => `swoosh/swoosh-${n}`, POP = n => `pop/pop-${n}`, LANDA = n => `landa-mjuk/landa-mjuk-${n}`;
const VICK = 'vick/vick-1', TICK = 'tick/tick-1', GLID = 'glid/glid-1', NALLE = 'nalle-hopp/nalle-hopp-1';
const G = 0.7;   // GLES: extra luft på varje rad med en replik (receptet)

export const RADER = [
  // --- Kritan ritar leoparden som sover. Julkalenderns ram (lucka 24) läggs utanpå ---
  { id: '01a', d: 8.5, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]],
    bild: 'Kritan ritar en blå strumpa: konturen i ett lugnt drag, sedan mudden, hälen och tån (ca 7 s)', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(46) + 1.6, plats: 'Papperet → zoom in', malin: [[46, 0.6]], ljud: [[GLITTER(1), 0.1]],
    bild: 'Strumpan fylls i inifrån. Zoom in i papperet, in i julsovrummet', ljudtext: '`glitter`. Ny replik 46 "En strumpa!" (ej inspelad, tyst)', ansikte: '–' },

  // --- Leoparden vill sova lite till ---
  { id: '1', d: 1.2 + L(4) + G + 1.0, plats: 'Julsovrummet, helbild', malin: [[4, 1.2]], ljud: [[SNARK(1), 0.1], [B('4'), 0.4 + L(4) + 1.2]],
    bild: 'Morgon. Snön faller i fönstret, leoparden sover i sängen och andas lugnt', ljudtext: 'andning, mysig suck', ansikte: 'sover' },
  { id: '2', d: 0.4 + L(5) + G + 0.6, plats: 'Närbild på ansiktet', malin: [[5, 0.4]], ljud: [[VICK, 0.4 + L(5) - 0.3]],
    bild: 'Ett öra vickar', ljudtext: 'tyst', ansikte: 'sover' },
  { id: '3', d: 0.3 + L(6) + G + 1.0, plats: 'Halvbild på sängen', malin: [[6, 0.3]], ljud: [[SNARK(2), 0.0], [B('6'), 0.5 + L(6)]],
    bild: 'Leoparden sover vidare', ljudtext: 'trumpet brum', ansikte: 'sover' },
  { id: '4', d: 1.0 + L(7) + G + 0.6, plats: 'Halvbild på sängen', malin: [[7, 1.0]], ljud: [[PRASSEL, 0.1], [B('6b'), 0.7]],
    bild: 'Täcket glider upp, bara öronen syns', ljudtext: '`prassel-tyg`, litet trumpet brum', ansikte: '–' },
  { id: '5', d: 0.3 + L(8) + G, plats: 'Halvbild, stilla', malin: [[8, 0.3]], ljud: [[SNARK(3), 0.3 + L(8) - 0.2]],
    bild: 'Sängen är stilla', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar en väckarklocka ---
  { id: '6a', d: 0.3 + L(9) + 3.0, plats: 'Halvbild: golvet vid huvudänden', malin: [[9, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan kommer in och ritar väckarklockans kontur på golvet vid sängens huvudände. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '6b', d: 0.3 + L(10) + G, plats: 'Halvbild', malin: [[10, 0.3]], ljud: [[GLITTER(2), 0.0], [TICK, 0.6]],
    bild: 'Klockan fylls i inifrån, visarna sist', ljudtext: '`glitter`', ansikte: '–' },
  { id: '7', d: 0.2 + L(11) + G + 0.8, plats: 'Närbild på klockan', malin: [[11, 0.4]], ljud: [[RING, 0.0]],
    bild: 'Klockan ringer och skakar ±4° (1,5 s)', ljudtext: '`ringklocka`', ansikte: '–' },
  { id: '8', d: 1.6 + L(12) + G + 0.6, plats: 'Halvbild på sängen', malin: [[12, 1.6]], ljud: [['moln-puff/moln-puff-1', 0.5], [PRASSEL, 0.75], [HOPP(3), 0.85], [LANDA(1), 1.5], [STEG(1), 1.85], [B('2'), 1.8 + L(12)]],
    bild: 'Leoparden öppnar ögonen och kliver ur sängen, ställer sig framför den', ljudtext: '`prassel-tyg`, `landa-mjuk`, `smasteg`, förtjust brum', ansikte: 'sömnig → glad' },
  { id: '9', d: 0.3 + L(13) + G + 0.8, plats: 'Halvbild', malin: [[13, 0.3]], ljud: [[SWOOSH(1), 0.2], [B('1'), 0.5 + L(13)]],
    bild: 'Leoparden vinkar (armen bakom kroppen)', ljudtext: 'hej-brum', ansikte: 'jätteglad' },
  { id: '10', d: 0.5 + L(14) + G + 0.8, plats: 'Halvbild', malin: [[14, 0.5]], ljud: [[GLAD(1), 0.7 + L(14)]],
    bild: 'Leoparden tittar på klockan och kritan och nickar. Klockan tystnar', ljudtext: 'glatt brum', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(15) + 4.0, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [[GASP, 0.0]],
    bild: 'Leoparden gäspar stort och sträcker på sig. Paus 4 s: kan du också gäspa?', ljudtext: '`gaspning`, armarna upp', ansikte: 'gäspar' },
  { id: '12', d: 0.4 + L(16) + G + 0.6, plats: 'Halvbild', malin: [[16, 0.4]], ljud: [[HOPP(1), 0.4 + L(16) - 0.5], [B('2b'), 0.6 + L(16)]],
    bild: 'Leoparden tittar mot fönstret, öronen reser sig, glatt skutt på "Hurra!"', ljudtext: '`hopp-mjuk`, förtjust brum', ansikte: 'jätteglad' },

  // --- Tittut under täcket ---
  // J24-feedback 1:20 och 1:23: Malin frågar först om leoparden vill leka, sedan skuttet, "Oj, haha! Leoparden vill leka.", "Leoparden är borta!"
  { id: '13a', d: 0.8 + L(48) + 1.5, plats: 'Halvbild', malin: [[48, 0.8]], ljud: [[FNISS(2), 0.9 + L(48)]],
    bild: 'Leoparden tittar busigt mot sängen och mot oss, nickar och hukar sig för ett skutt', ljudtext: 'busigt fniss', ansikte: 'fnissig' },
  { id: '13', d: 1.0 + L(47) + 0.5 + L(49) + 3.0, plats: 'Halvbild', malin: [[47, 1.0], [49, 1.0 + L(47) + 0.5]], ljud: [[HOPP(4), 0.1], [PRASSEL, 0.8], [LANDA(2), 0.85], [FNISS(4), 1.0 + L(47) + 0.5 + L(49) + 1.4]],
    bild: 'Leoparden skuttar in bakom sängen och dyker ner. "Oj, haha! Leoparden vill leka." Öronspetsarna tittar upp: "Leoparden är borta! Var är leoparden?" Paus 3 s', ljudtext: '`prassel-tyg`, fniss bakom sängen', ansikte: '–' },
  { id: '14', d: 0.5 + L(18) + G + 1.6, plats: 'Halvbild', malin: [[18, 0.5]], ljud: [[POP(1), 0.0], [B('3b'), 0.7 + L(18)], [HOPP(5), 0.5 + L(18) + G + 0.6], [LANDA(1), 0.5 + L(18) + G + 1.25]],
    bild: 'Leoparden tittar upp bakom sängen, skrattar och hoppar tillbaka fram', ljudtext: '`prassel-tyg`, fniss', ansikte: 'skrattar' },

  // --- Kläderna på väggen, tre gånger "Dra, dra … på!" ---
  { id: '15', d: 0.6 + L(19) + G + 0.6, plats: 'Helbild', malin: [[19, 0.6]], ljud: [[STEG(2), 0.1], [B('2'), 0.8 + L(19)]],
    bild: 'Leoparden står bredvid sängen', ljudtext: 'förtjust brum', ansikte: 'glad' },
  { id: '16', d: 0.4 + L(20) + G + 0.6, plats: 'Halvbild: klädhängaren', malin: [[20, 0.4]], ljud: [[PLING(1), 0.4 + L(20) + 0.1]],
    bild: 'Klädhängaren på väggen: strumporna och halsduken på var sin knopp, den tredje tom. Luvans tofs sticker upp bakom krukan', ljudtext: '–', ansikte: '–' },
  { id: '17', d: 0.3 + L(21) + G, plats: 'Närbild: strumporna', malin: [[21, 0.3]], ljud: [[PLING(2), 0.2]],
    bild: 'Strumporna på knoppen', ljudtext: '–', ansikte: '–' },
  // J24-feedback 1:50 "a bit slower pace and more varied sounds": en replik per strumpa, strumpan landar på "på!", leoparden reagerar varje gång
  { id: '18', d: 0.3 + L(51) + 1.6 + L(52) + 1.7, plats: 'Halvbild', malin: [[51, 0.3], [52, 0.3 + L(51) + 1.6]],
    ljud: [[STRUMPA(1), 0.7], [GLITTER(3), 1.95], [FNISS(3), 2.35], [HOPP(2), 2.6], [STRUMPA(2), 0.3 + L(51) + 1.6 + 0.45], [GLITTER(2), 0.3 + L(51) + 1.6 + 1.75], [B('3b'), 0.3 + L(51) + 1.6 + 2.15], [HOPP(6), 0.3 + L(51) + 1.6 + 2.4]],
    bild: 'Strumporna glider från knoppen till fötterna, en i taget, var och en landar på "på!" och leoparden fnissar och skuttar', ljudtext: '`prassel-tyg` × 2, `glitter`, glatt brum', ansikte: 'koncentrerad → glad' },
  { id: '19', d: 0.3 + L(50) + G + 0.9, plats: 'Halvbild', malin: [[50, 0.3]], ljud: [[FNISS(5), 0.5 + L(50)]],   // röda strumpor (J24-feedback 2:36)
    bild: 'Leoparden vickar på fötterna och tittar ner', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '20', d: 0.3 + L(24) + G, plats: 'Närbild: halsduken', malin: [[24, 0.3]], ljud: [[PLING(3), 0.2]],
    bild: 'Halsduken på knoppen', ljudtext: '–', ansikte: '–' },
  { id: '21', d: 0.3 + L(25) + G + 0.4, plats: 'Halvbild', malin: [[25, 0.3]], ljud: [[SUS(1), 0.2], [GLITTER(4), 0.3 + L(25) - 0.2], [GLAD(3), 0.5 + L(25)]],
    bild: 'Halsduken glider på, lågt på halsen', ljudtext: '`prassel-tyg`, `glitter`, glatt brum', ansikte: 'glad' },
  { id: '22', d: 0.4 + L(26) + G + 0.6, plats: 'Halvbild', malin: [[26, 0.4]], ljud: [[HOPP(2), 0.1], [B('4b'), 0.6 + L(26)]],
    bild: 'Leoparden tittar ner på halsduken, glatt skutt', ljudtext: '`hopp-mjuk`, mysig suck', ansikte: 'drömmer' },

  // --- Var är luvan? Barnet hjälper ---
  { id: '23', d: 0.4 + L(27) + G + 0.8, plats: 'Klädhängaren → halvbild', malin: [[27, 0.4]], ljud: [[B('5'), 0.6 + L(27)]],
    bild: 'Den tomma knoppen, sedan leoparden som känner på huvudet med tassen', ljudtext: 'nyfiket brum', ansikte: 'förvånad' },
  { id: '24', d: 0.6 + L(28) + G + 0.8, plats: 'Halvbild', malin: [[28, 0.6]], ljud: [[VICK, 0.5], [B('7'), 0.8 + L(28)]],
    bild: 'Leoparden tittar åt vänster, sedan åt höger', ljudtext: 'frågande brum', ansikte: 'nyfiken' },
  { id: '25', d: 0.3 + L(29) + 5.0, plats: 'Helbild → närbild på krukan', malin: [[29, 0.3]], ljud: [[BJALL, 0.3 + L(29) + 3.0]],
    bild: 'Tofsen tittar fram bakom krukan. Paus 5 s: efter 3 s skimrar den svagt', ljudtext: 'tyst, bjällran plingar svagt', ansikte: 'nyfiken' },
  { id: '26', d: 0.2 + L(30) + G + 0.6, plats: 'Närbild: krukan', malin: [[30, 0.2]], ljud: [[TINDRA(3), 0.0], [B('2'), 0.4 + L(30)]],
    bild: 'Tofsen skimrar tydligt', ljudtext: '`tindra`, förtjust brum', ansikte: '–' },
  { id: '27', d: 1.0 + L(31) + G + 0.4, plats: 'Halvbild', malin: [[31, 1.0]], ljud: [[SWOOSH(2), 0.0], [BJALL, 0.9], [GLITTER(1), 1.0 + L(31) - 0.2]],
    bild: 'Luvan seglar från krukan upp på huvudet (1,0 s). Malin när den sitter', ljudtext: '`bjallror`, `glitter`', ansikte: 'jätteglad' },
  { id: '28', d: 0.4 + L(32) + G + 0.8, plats: 'Helbild', malin: [[32, 0.4]], ljud: [[HOPP(3), 0.1], [GLAD(4), 0.6 + L(32)]],
    bild: 'Leoparden står fin med strumpor, halsduk och luva, glatt skutt', ljudtext: 'glatt brum', ansikte: 'stolt' },

  // --- Paketet och elefanten ---
  { id: '29a', d: 0.3 + L(33) + 3.0, plats: 'Halvbild: golvet framför leoparden', malin: [[33, 0.3]], ljud: [[RITA(3), 0.4]],
    bild: 'Kritan kommer in och ritar paketets kontur på golvet. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '29b', d: 0.3 + L(34) + G, plats: 'Halvbild', malin: [[34, 0.3]], ljud: [[GLITTER(2), 0.0], [POP(1), 0.5]],
    bild: 'Paketet fylls i, rosetten sist', ljudtext: '`glitter`', ansikte: 'kawaii' },
  { id: '30', d: 0.3 + L(35) + G + 0.8, plats: 'Halvbild', malin: [[35, 0.3]], ljud: [[B('5b'), 0.5 + L(35)]],
    bild: 'Leoparden tittar på paketet, sedan mot kameran', ljudtext: 'nyfiket brum', ansikte: 'nyfiken' },
  { id: '31', d: 0.8 + L(36) + G + 0.6, plats: 'Halvbild', malin: [[36, 0.8]], ljud: [[GLID, 0.2], [B('2'), 1.0 + L(36)], [GLITTER(3), 0.6]],
    bild: 'Paketet glider fram till leopardens fötter', ljudtext: 'förtjust brum, `glitter`', ansikte: 'jätteglad' },
  // J24-feedback 2:55: locket lyfts på "Leoparden öppnar …", elefanten poppar upp på "En elefant!" (2,63 s in i repliken)
  { id: '32', d: 1.2 + L(37) + G + 0.9, plats: 'Halvbild', malin: [[37, 1.2]], ljud: [[PRASSEL, 2.1], [POP(2), 1.2 + 2.45], [NALLE, 1.2 + 2.55], [GLITTER(4), 1.2 + 3.1], [B('2b'), 1.5 + L(37)]],
    bild: 'Rosetten lyfter av, locket glider upp och elefanten stiger upp ur paketet', ljudtext: '`prassel-tyg`, `glitter`, förtjust brum', ansikte: 'förvånad → jätteglad' },
  { id: '33', d: 1.0 + L(38) + G + 1.0, plats: 'Närbild', malin: [[38, 1.0]], ljud: [[B('4b'), 1.2 + L(38)]],
    bild: 'Elefanten glider in framför leopardens mage, de raka armarna in framför den, ögonen blundar glatt', ljudtext: 'mysig suck', ansikte: 'drömmer' },

  // --- God jul och hej då ---
  { id: '34', d: 1.0 + L(39) + G + 0.8, plats: 'Helbild', malin: [[39, 1.0]], ljud: [[TINDRA(1), 0.2], [PLING(4), 0.4], [PLING(1), 0.7], [B('2'), 1.2 + L(39)]], musik: true,
    bild: 'Ljusslingan i fönstret tänds, en lampa i taget', ljudtext: '`tindra`, förtjust brum', ansikte: 'jätteglad' },
  { id: '35', d: 4.0 + L(40) + G + 1.5, plats: 'Helbild', malin: [[40, 4.0]], ljud: [[HOPP(4), 1.0], [BJALL, 2.5], [HOPP(5), 3.0]], musik: true,
    bild: 'Musiken kommer upp. Leoparden vickar vid fönstret med elefanten, snön faller', ljudtext: '`jul-julafton` upp, `bjallror`', ansikte: 'jätteglad' },
  { id: '36', d: 0.4 + L(41) + G + 0.8, plats: 'Halvbild', malin: [[41, 0.4]], ljud: [[HOPP(2), 0.4 + 1.34], [B('8'), 0.6 + L(41)]], musik: true,
    bild: 'Leoparden vinkar, ett litet skutt på "God jul!"', ljudtext: 'hej då-brum', ansikte: 'jätteglad' },
  { id: '37', d: 0.3 + L(42) + G + 0.8, plats: 'Halvbild', malin: [[42, 0.3]], ljud: [[B('8b'), 0.5 + L(42)]], musik: true,
    bild: 'Leoparden vinkar klart och blinkar mot oss på "Vi ses snart!"', ljudtext: 'hej då-brum', ansikte: 'glad' },

  // --- Kalenderns avsked ---
  // J24-feedback 3:26: ingen stjärna. Rummet tonas till väggens turkos med snö, kameran in på leoparden, en rörelse per replik
  { id: '39', d: 2.4 + L(43) + G + 0.4, plats: 'Helbild → halvbild, turkos bakgrund', malin: [[43, 2.4]], ljud: [[TINDRA(2), 0.3], [B('4'), 2.6 + L(43)]], musik: true,
    bild: 'Rummet tonas bort till turkos med lugn snö, kameran glider in på leoparden med elefanten. "Tack …": en djup nick med glada ögon', ljudtext: '`tindra`, mysig suck', ansikte: 'glad → jätteglad' },
  { id: '40', d: 0.3 + L(44) + G + 0.5, plats: 'Halvbild, turkos', malin: [[44, 0.3]], ljud: [[SWOOSH(1), 0.6], [HOPP(6), 2.0], [B('2'), 0.6 + L(44)]], musik: true,
    bild: 'Kritan flyger in på "Lilla Kritan" och svajar bredvid leoparden, som tittar upp på den och skuttar på "alla djuren"', ljudtext: 'swoosh, förtjust spinn', ansikte: 'jätteglad' },
  { id: '41', d: 0.3 + L(45) + G + 0.6, plats: 'Halvbild, turkos', malin: [[45, 0.3]], ljud: [[BJALL, 0.4 + L(45)], ['spinn-gullig/spinn-gullig-8e', 0.7 + L(45)]], musik: true,
    bild: 'Leoparden vinkar mot oss, kritan svajar', ljudtext: '`bjallror`, hej då-spinn', ansikte: 'jätteglad' },
  { id: '42', d: 2.4, plats: 'Kritirisen', musik: true,
    bild: 'Kritan flyger ut, kritirisen sluter sig om leoparden, musiken tonar ut', ljudtext: 'musiken tonar ut', ansikte: 'glad' },
];
// musiken: ingen medan leoparden sover, lågt från uppvaknandet (rad 8), uppe i sista leken (manus)
{ const fran = RADER.findIndex(r => r.id === '8'); RADER.forEach((r, i) => { if (i >= fran) r.musik = true; }); }
