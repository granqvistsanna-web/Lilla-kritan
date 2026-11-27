// Storyboardens rader för 049 Kaninen går till tandläkaren: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 046 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt (tagning 1 delad 2026-11-21, grind 3 godkänd).
// Grind 4 (2026-11-21): kanin-tack-4, stol-vvv-2 upp, stol-vvv-4 ner, borsta-1 (elefanten), borsta-2 (kaninen).
import { readFileSync, existsSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const las = f => existsSync(HAR + f) ? readFileSync(HAR + f, 'utf8').trim().split('\n').map(l => l.split(/\s+/)).map(([n, s]) => [n, +s]) : [];
const matt = Object.fromEntries(las('../rost-langder.txt'));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];

const K = n => `kanin-gullig/kanin-gullig-${n}`, KN = (n, i = 1) => `kanin-ny/kanin-ny-${n}-${i}`;
const HEJ = 'kanin-gullig/kanin-hej-1', HEJDA = 'kanin-gullig/kanin-hejda-1', TACK = 'kanin-tack/kanin-tack-4';
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = 'glitter/glitter-1', TINDRA = 'tindra/tindra-3', POP = n => `pop/pop-${n}`;
const STEG = 'smasteg/smasteg-1', HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`, KLICK = 'lampa-klick/lampa-klick-1';
const STOL_UPP = 'stol-vvv/stol-vvv-2', STOL_NER = 'stol-vvv/stol-vvv-4', BORSTA = n => `borsta/borsta-${n}`;
// Tandläkarens små ljud = doktorns (Sanna 2026-11-21: återanvänd doktor-*); tandläkaren säger inga meningar
const DV = { hej: 2, hmm: 2, ooo: 2, aaa: 4, mhm: 1, fniss: 5, oj: 2, bra: 1, hejda: 1 }, DOK = (n, i = DV[n]) => `doktor-${n}/doktor-${n}-${i}`;   // i: annan tagning (feedback 26/11: bra-1 och hmm-2 hördes för ofta)
const G = 1.6;   // glest tempo som 046: extra luft på varje rad med en replik

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar tandborsten (papperet) ---
  { id: '01a', d: 3.4, plats: 'Papperet, helbild', malin: [[1, 0.3]], ljud: [[RITA(1), 0.3]],
    bild: 'Kritan ritar tandborstens kontur i ett lugnt drag: skaftet, borsthuvudet, borststråna', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 1.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.2 + L(3) + 1.2, plats: 'Papperet → zoom in', malin: [[3, 0.2]], ljud: [[GLITTER, 0.2]],
    bild: 'Tandborsten fylls i inifrån, kritan flyger ut. Zoom in i teckningen, in i mottagningen', ljudtext: '`glitter`', ansikte: '–' },

  // --- Mottagningen: hej, den stora stolen ---
  { id: '1', d: 3.4 + L(4) + G + 1.0, plats: 'Mottagningen, helbild', malin: [[4, 3.4]], ljud: [[STEG, 0.5], [HEJ, 3.7 + L(4)]],
    bild: 'Kaninen trippar in från vänster, stannar framför stolen och vinkar (armen bakom kroppen). Tandläkaren står till höger om stolen', ljudtext: 'småsteg, hej', ansikte: 'jätteglad' },
  { id: '2', d: 0.8 + L(5) + G, plats: 'Närbild: tandläkaren', malin: [[5, 0.8]], ljud: [[DOK('hej'), 0.9 + L(5)]],
    bild: 'Tandläkaren vinkar och ler', ljudtext: '`doktor-hej`', ansikte: 'tandläkaren glad' },
  { id: '3', d: 0.4 + L(6) + G + 0.8, plats: 'Närbild: kaninen', malin: [[6, 0.4]], ljud: [[KN('fragande'), 0.6 + L(6)]],
    bild: 'Kaninen tittar nyfiket', ljudtext: 'frågande', ansikte: 'nyfiken' },
  { id: '4', d: 1.6 + L(51) + 2.1 + L(7) + 1.2, plats: 'Mottagningen, helbild', malin: [[51, 1.6], [7, 1.6 + L(51) + 2.1]],   // 51: Sannas tillägg (feedback 2026-11-21); före nervositeten (feedback 2026-11-25); 51 först, "Oj, en stor stol" efter kaninens reaktion (feedback 2026-11-27)
    ljud: [[KN('trumpen'), 1.6 + L(51) + 0.5]],
    bild: 'Tandläkaren pekar på stolen. Malin: du ska få sitta i den. Kaninen tittar nyfiket upp; efter repliken backar den ett litet steg, skakar på huvudet, öronen faller. Malin: Oj, det är en stor stol', ljudtext: 'trumpen (mjuk)', ansikte: 'orolig' },
  { id: '5', d: 0.4 + L(8) + 1.0 + L(9) + G, plats: 'Närbild: kaninen', malin: [[8, 0.4], [9, 1.4 + L(8)]],
    bild: 'Kaninen orolig: bryn snett upp, blicken ner, öronen nere', ljudtext: '–', ansikte: 'orolig' },

  // --- Kritan ritar elefanten ---
  { id: '6a', d: 7.0, plats: 'Halvbild: kaninen', malin: [[10, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan kommer in och ritar elefantens kontur bredvid kaninen (4 s): öronen, snabeln och armarna som egna drag. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '6b', d: 0.6 + L(11) + G, plats: 'Halvbild: kaninen', malin: [[11, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Elefanten fylls i inifrån', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '7', d: 0.6 + L(12) + G + 0.4, plats: 'Halvbild: kaninen', malin: [[12, 0.6]], ljud: [[TACK, 0.8 + L(12)]],
    bild: 'Kaninen tittar upp mot kritan och nickar. *"Tack, kritan!"*, sedan kaninens eget tack', ljudtext: '`kanin-tack`', ansikte: 'glad' },
  { id: '8', d: 2.2, plats: 'Halvbild: kaninen', ljud: [[KN('fortjust'), 0.4]],
    bild: 'Kaninen kramar elefanten, små hjärtan stiger bredvid ansiktet', ljudtext: 'förtjust', ansikte: 'glad' },
  { id: '9', d: 0.4 + L(13) + G + 1.0, plats: 'Närbild: kaninen med elefanten', malin: [[13, 0.4]], ljud: [[K(4), 0.6 + L(13)]],
    bild: 'Elefanten i famnen, huvudet lutar in. Öronen reser sig', ljudtext: 'mysig suck (4)', ansikte: 'blundar nöjt' },
  { id: '10', d: 0.3 + L(14) + G + 1.2, plats: 'Mottagningen, helbild', malin: [[14, 0.3]], ljud: [[HOPP(1), 0.3 + L(14) * 0.55], [HOPP(2), 0.3 + L(14) * 0.95], [DOK('bra'), 0.7 + L(14)]],
    bild: 'Kaninen skuttar upp på fotstödet (*"hopp"*), sedan i sätet (*"och hopp!"*), och sätter sig med elefanten i famnen', ljudtext: 'hopp × 2', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(15) + G + 0.8, plats: 'Mottagningen, helbild', malin: [[15, 0.3]], ljud: [[STOL_UPP, 0.2], [KN('fniss'), 0.6 + L(15)]],
    bild: 'Stolen åker lugnt upp 60 px på 2 s (*"upp … upp … upp!"*), stannar på *"Stopp!"*', ljudtext: '`stol-vvv`, fniss', ansikte: 'glad' },
  { id: '12', d: 0.3 + L(16) + G + 0.8, plats: 'Närbild: kaninen', malin: [[16, 0.3]], ljud: [[K(2), 0.5 + L(16)]],
    bild: 'Kaninen tittar ner och ler', ljudtext: 'förtjust (2)', ansikte: 'glad' },

  // --- Lampan ---
  { id: '13', d: 0.4 + L(17) + G, plats: 'Närbild: lampan', malin: [[17, 0.4]], ljud: [[KLICK, 0.4 + L(17) * 0.6]],
    bild: 'Lampan på stolens arm tänds på *"Klick"*', ljudtext: '`lampa-klick`', ansikte: '–' },
  { id: '14', d: 0.4 + L(18) + G, plats: 'Närbild: elefanten', malin: [[18, 0.4]], ljud: [[KLICK, 0.4 + L(18) * 0.55], [DOK('ooo'), 0.5 + L(18)]],
    bild: 'Ljuset lyser på elefanten', ljudtext: '`lampa-klick`', ansikte: '–' },
  { id: '15', d: 0.4 + L(19) + G + 0.6, plats: 'Närbild: kaninen', malin: [[19, 0.4]], ljud: [[KLICK, 0.4 + L(19) * 0.35], [KN('fniss', 2), 0.6 + L(19)]],
    bild: 'Ljuset på kaninens ansikte, kaninen blinkar och fnissar', ljudtext: 'klick, fniss', ansikte: 'fnissig' },

  // --- Kritan ritar spegeln, räkna tänderna ---
  { id: '16a', d: 0.3 + L(10) + 3.0, plats: 'Tandläkaren och kaninen', malin: [[10, 0.3]], ljud: [[RITA(3), 0.4]],
    bild: 'Kritan ritar spegeln i luften framför tandläkaren: skaftet och den runda glasbiten (3 s). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '16b', d: 0.6 + L(20) + G, plats: 'Sakbild: spegeln på rosa', malin: [[20, 0.6]], ljud: [[GLITTER, 0.1], [TINDRA, 0.6 + L(20)]],
    bild: 'Spegeln ensam mitt i bild på rosa botten med mjuka strålar, gnistor när den nämns. Sedan tar tandläkaren den', ljudtext: '`glitter`, `tindra`', ansikte: '–' },
  { id: '18', d: 0.4 + L(21) + G + 0.6, plats: 'Närbild: elefanten', malin: [[21, 0.4]], ljud: [[DOK('fniss'), 0.6 + L(21)]],
    bild: 'Spegeln framför elefantens snabel. Tandläkarens hand i bild', ljudtext: '`doktor-fniss`', ansikte: '–' },
  { id: '19', d: 0.3 + L(22) + 4.0 + L(23) + G, plats: 'Halvbild: kaninen', malin: [[22, 0.3], [23, 4.3 + L(22)]],
    bild: 'Kaninen visar: gapar själv först. Paus 4 s: barnet gapar', ljudtext: '–', ansikte: 'gapar' },
  { id: '20', d: 0.4 + L(24) + G, plats: 'Närbild: kaninens mun', malin: [[24, 0.4]], ljud: [[DOK('hmm', 1), 0.5 + L(24)]],
    bild: 'Kaninen gapar stort, spegeln framför munnen. Tänderna lyser upp en i taget på *"En, två, tre"*', ljudtext: '`doktor-hmm`', ansikte: 'gapar' },
  { id: '21', d: 0.4 + L(25) + G + 1.2, plats: 'Närbild: kaninens mun', malin: [[25, 0.4]], ljud: [[DOK('bra', 2), 0.5 + L(25)], [K(2), 1.5 + L(25)]],
    bild: 'De två stora framtänderna glittrar', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  // rad 22 ("Kan du visa dina tänder?" … "Där!") borttagen 26/11: avsnittet var 4:37, formatet 3:45–4:15

  // --- Var är tandborsten? ---
  { id: '23', d: 0.4 + L(28) + G + 0.6, plats: 'Närbild: tandläkaren', malin: [[28, 0.4]], ljud: [[DOK('oj'), 0.6 + L(28)]],
    bild: 'Tandläkaren tittar på sin tomma hand, förvånad (stora ögon, liten rund mun)', ljudtext: '`doktor-oj`', ansikte: 'tandläkaren förvånad' },
  { id: '23b', d: 0.3 + L(29) + G + 1.2, plats: 'Tandläkaren och kaninen', malin: [[29, 0.3]], ljud: [[DOK('hmm', 3), 0.5 + L(29)], [K(7), 1.6 + L(29)]],
    bild: 'Tandläkaren tittar vänster, höger, vänster (bara huvudet). Kaninen tittar också', ljudtext: '`doktor-hmm`, frågande (7)', ansikte: 'frågande' },
  { id: '23c', d: 0.3 + L(30) + 5.0, plats: 'Helbild → närbild på fickan', malin: [[30, 0.3]], ljud: [[TINDRA, 0.3 + L(30) + 3.0]],
    bild: 'Bred bild för frågan, efter 3 s klipp till närbild: tandborsten sticker upp ur bröstfickan och skimrar', ljudtext: 'tyst, sedan `tindra`', ansikte: '–' },
  { id: '23d', d: 0.3 + L(31) + G + 1.8, plats: 'Närbild: tandläkaren', malin: [[31, 0.3]], ljud: [[DOK('oj'), 0.5 + L(31)], [DOK('fniss'), 1.4 + L(31)]],
    bild: 'Tandläkaren tittar ner på fickan, förvånad, tar upp tandborsten och fnissar', ljudtext: '`doktor-oj`, `doktor-fniss`', ansikte: 'tandläkaren glad' },

  // --- Borsta ---
  { id: '24', d: 0.4 + L(32) + G, plats: 'Närbild: elefanten', malin: [[32, 0.4]], ljud: [[BORSTA(1), 0.4 + L(32) * 0.45], [KN('ja', 2), 0.6 + L(32)]],
    bild: 'Tandborsten borstar snabeln', ljudtext: '`borsta`, ja', ansikte: '–' },
  { id: '25', d: 0.4 + L(33) + G + 0.8, plats: 'Närbild: kaninens mun', malin: [[33, 0.4]], ljud: [[BORSTA(2), 0.4 + L(33) * 0.3], [TINDRA, 0.4 + L(33) * 0.9], [KN('jippi'), 1.0 + L(33)]],
    bild: 'Tandborsten över framtänderna, tre lugna drag, sedan glitter på *"blankt!"*', ljudtext: '`borsta`, `tindra`, jippi', ansikte: 'glad' },

  // --- Godis och tandborstning ---
  { id: '25b', d: 0.4 + L(34) + G, plats: 'Tandläkaren och kaninen', malin: [[34, 0.4]], ljud: [[DOK('hmm'), 0.2]],
    bild: 'Tandläkaren lutar huvudet. En liten tankebubbla med en godisbit bredvid kaninen', ljudtext: '`doktor-hmm`', ansikte: 'nyfiken' },
  { id: '25c', d: 0.4 + L(35) + G + 0.6, plats: 'Närbild: kaninen', malin: [[35, 0.4]], ljud: [[KN('ja', 3), 0.1], [DOK('bra', 3), 0.6 + L(35)]],
    bild: 'Kaninen nickar lite, en tass lyfts lite. Bubblan krymper', ljudtext: 'ja, `doktor-bra`', ansikte: 'glad' },
  { id: '25d', d: 0.4 + L(36) + G, plats: 'Tandläkaren och kaninen', malin: [[36, 0.4]], ljud: [[DOK('hmm', 4), 0.2]],
    bild: 'Ny bubbla: tandborsten med en liten sol och en måne', ljudtext: '`doktor-hmm`', ansikte: 'nyfiken' },
  { id: '25e', d: 0.8 + L(37) + G + 0.4, plats: 'Närbild: kaninen', malin: [[37, 0.8]], ljud: [[KN('jippi', 2), 0.1], [DOK('bra'), 0.9 + L(37)]],
    bild: 'Kaninen nickar stort, glatt skutt i sätet. Malin efter', ljudtext: 'jippi, `doktor-bra`', ansikte: 'jätteglad' },
  { id: '25f', d: 0.3 + L(38) + 4.0 + L(39) + G, plats: 'Halvbild: kaninen', malin: [[38, 0.3], [39, 4.3 + L(38)]],
    bild: 'Kaninen tittar på tittaren. Paus 4 s: barnet svarar', ljudtext: '–', ansikte: 'nyfiken → glad' },

  // --- Ner igen, kritan ritar klistermärket ---
  { id: '26', d: 0.3 + L(40) + G + 1.0, plats: 'Mottagningen, helbild', malin: [[40, 0.3]], ljud: [[STOL_NER, 0.2], [HOPP(3), 0.3 + L(40) * 0.85], [KN('jippi'), 0.8 + L(40)]],
    bild: 'Stolen åker lugnt ner. Kaninen skuttar ner på golvet med elefanten i famnen (*"Hopp!"*)', ljudtext: '`stol-vvv`, hopp, jippi', ansikte: 'glad' },
  { id: '31a', d: 0.3 + L(41) + 3.0, plats: 'Halvbild: kaninen', malin: [[41, 0.3]], ljud: [[RITA(4), 0.4]],
    bild: 'Kritan ritar en liten glad tand i luften (konturen 2 s). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '31b', d: 0.6 + L(42) + G, plats: 'Halvbild: kaninen', malin: [[42, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Tanden fylls i vit med ett leende', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '32', d: 1.0 + L(43) + G + 1.2, plats: 'Halvbild: kaninen', malin: [[43, 1.0]], ljud: [[POP(1), 0.9], [K(2), 1.2 + L(43)]],
    bild: 'Tanden glider till kaninens mage och klistras fast (`pop`). Malin efter', ljudtext: '`pop`, förtjust (2)', ansikte: 'glad' },
  { id: '33', d: 1.0 + L(44) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[44, 1.0]], ljud: [[POP(2), 0.9], [KN('fniss', 4), 1.2 + L(44)]],
    bild: 'En liten tand glider till elefanten', ljudtext: '`pop`, fniss', ansikte: 'fnissig' },
  { id: '34', d: 0.8 + L(45) + G + 0.8, plats: 'Närbild: kaninen', malin: [[45, 0.8]], ljud: [[KN('jippi'), 1.0 + L(45)]],
    bild: 'Kaninen tittar ner på klistermärket, glatt skutt', ljudtext: 'jippi', ansikte: 'stolt' },

  // --- Tack och hej då ---
  { id: '35', d: 0.6 + L(46) + 2.5 + L(47) + G, plats: 'Mottagningen, helbild', malin: [[46, 0.6], [47, 3.1 + L(46)]], ljud: [[KN('ja', 3), 0.9 + L(46)], [DOK('bra', 2), 3.3 + L(46) + L(47)]],
    bild: 'Kaninen vänder sig mot tandläkaren och nickar, tandläkaren nickar tillbaka. Paus 2,5 s', ljudtext: 'ja, `doktor-bra`', ansikte: 'glad' },
  { id: '36', d: 0.6 + L(48) + G, plats: 'Närbild: tandläkaren', malin: [[48, 0.6]], ljud: [[DOK('hejda'), 0.7 + L(48)]],
    bild: 'Tandläkaren vinkar', ljudtext: '`doktor-hejda`', ansikte: 'tandläkaren glad' },
  { id: '37', d: 0.6 + L(49) + G + 1.4, plats: 'Halvbild: kaninen', malin: [[49, 0.6]], ljud: [[HEJDA, 0.8 + L(49)]],
    bild: 'Kaninen vinkar med elefanten i andra tassen (armen bakom kroppen)', ljudtext: 'hej då', ansikte: 'jätteglad' },
  { id: '38', d: 0.3 + L(50) + 1.2, plats: 'Halvbild: kaninen', malin: [[50, 0.3]],
    bild: 'Samma, kaninen vinkar klart', ljudtext: '–', ansikte: 'glad' },
  { id: '39', d: 3.0, plats: 'Kritirisen', bild: 'Kritirisen runt kaninen och elefanten, 0,6 s svart', ljudtext: '–', ansikte: '–' },
];
