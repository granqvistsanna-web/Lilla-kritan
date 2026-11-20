// Storyboardens rader för 046 Kaninen går till doktorn: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 045 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt (tagning 1 delad 2026-11-20, replik 49 egen tagning).
// Sannas val 2026-11-20: kritan ritar stetoskopet (rad 11a–11b, replik 10 återanvänds + 49), rad 35 behålls, hjärtslagen = `dunk`,
// kaninens gap = bara Malins "aaa". Replik 16 används inte. Gosedjuret är en liten leopard (Sanna 2026-11-20): repliker
// 50–60 ersätter 11, 14, 17, 23, 30, 34, 35, 36, 38, 42 och 47 ("nallen" → "leoparden"); inspelade 2026-11-20 (malin-tagning-leoparden.mp3).
import { readFileSync, existsSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const las = f => existsSync(HAR + f) ? readFileSync(HAR + f, 'utf8').trim().split('\n').map(l => l.split(/\s+/)).map(([n, s]) => [n, +s]) : [];
const matt = Object.fromEntries([...las('../rost-langder-uppskattade.txt'), ...las('../rost-langder.txt')]);   // uppmätta vinner
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];

// Kaninens röst: kanin-gullig (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande, 8 hej då) och kanin-ny.
const K = n => `kanin-gullig/kanin-gullig-${n}`, KN = (n, i = 1) => `kanin-ny/kanin-ny-${n}-${i}`;
const HEJ = 'kanin-gullig/kanin-hej-1', HEJDA = 'kanin-gullig/kanin-hejda-1';
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = 'glitter/glitter-1', TINDRA = 'tindra/tindra-3', POP = n => `pop/pop-${n}`;
const STEG = 'smasteg/smasteg-1', HOPP = n => `hopp-mjuk/hopp-mjuk-${n}`, KLAPP = 'klapp/klapp-1', KLICK = 'lampa-klick/lampa-klick-1';
const DUNK = n => `dunk/dunk-${n}`;   // hjärtslagen (Sanna 2026-11-20: befintliga dunk), lågt
const G = 0.9;   // glest tempo: extra luft på varje rad med en replik (receptets GLES)
// "dunk, dunk" i repliken: slagen på de två sista ordens plats (ca 72 % och 90 % in i repliken)
const dunkar = (o, n) => [[DUNK(1), o + L(n) * 0.72], [DUNK(2), o + L(n) * 0.9]];

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar kaninen (papperet) ---
  { id: '01a', d: 8.5, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]],
    bild: 'Kritan ritar kaninens kontur i lugna drag (7 s): kroppen, de långa öronen och armarna som egna drag', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Kaninen fylls i inifrån. Zoom in i teckningen, in i mottagningen', ljudtext: '`glitter`', ansikte: '–' },

  // --- Mottagningen: hej, osäker ---
  { id: '1', d: 3.4 + L(4) + G + 1.0, plats: 'Mottagningen, helbild', malin: [[4, 3.4]], ljud: [[STEG, 0.5], [HEJ, 3.7 + L(4)]],
    bild: 'Kaninen trippar in från vänster, stannar framför pallen och vinkar (armen bakom kroppen). Doktorn står vid britsens högra ände', ljudtext: 'småsteg, hej', ansikte: 'jätteglad' },
  { id: '2', d: 0.8 + L(5) + G, plats: 'Halvbild: doktorn', malin: [[5, 0.8]],
    bild: 'Doktorn vinkar och ler (stetoskopet runt halsen)', ljudtext: '–', ansikte: 'doktorn glad' },
  { id: '3', d: 0.4 + L(6) + G + 1.0, plats: 'Närbild: kaninen', malin: [[6, 0.4]], ljud: [[KN('fragande'), 0.6 + L(6)]],
    bild: 'Öronen faller lite, blicken ner', ljudtext: 'frågande', ansikte: 'nyfiken → lite osäker' },
  { id: '4', d: 1.2 + L(7) + G + 1.0, plats: 'Närbild: kaninen', malin: [[7, 1.2]], ljud: [[KN('trumpen'), 1.4 + L(7)]],
    bild: 'Kaninen tittar upp mot doktorn och ner igen. Malin efter blicken', ljudtext: 'trumpen (mjuk)', ansikte: 'lite osäker' },
  { id: '5', d: 0.6 + L(8) + 1.0 + L(9) + G, plats: 'Mottagningen, helbild', malin: [[8, 0.6], [9, 1.6 + L(8)]],
    bild: 'Doktorn nickar lugnt. Paus 1 s, sedan *"Hm … vad gör vi nu?"*', ljudtext: '–', ansikte: 'lite osäker' },

  // --- Kritan ritar nallen ---
  { id: '6a', d: 0.3 + L(10) + 3.0, plats: 'Halvbild: kaninen', malin: [[10, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan kommer in och ritar nallens kontur bredvid kaninen (4 s). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '6b', d: 0.6 + L(50) + G, plats: 'Halvbild: kaninen', malin: [[50, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Nallen fylls i inifrån', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '7', d: 0.3 + L(12) + 2.5, plats: 'Halvbild: kaninen', malin: [[12, 0.3]], ljud: [[K(5), 0.6 + L(12)]],
    bild: 'Kaninen tittar på nallen, öronen reser sig. Paus 2,5 s', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '8', d: 0.5 + L(13) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[13, 0.5]], ljud: [[KN('fortjust'), 0.7 + L(13)]],
    bild: 'Kaninen nickar direkt och kramar nallen', ljudtext: 'förtjust', ansikte: 'glad' },
  { id: '9', d: 0.4 + L(51) + G + 1.2, plats: 'Närbild: kaninen med nallen', malin: [[51, 0.4]], ljud: [[K(4), 0.6 + L(51)]],
    bild: 'Nallen i famnen, huvudet lutar mot nallen', ljudtext: 'mysig suck (4)', ansikte: 'blundar nöjt' },
  { id: '10', d: 0.3 + L(15) + G + 1.0, plats: 'Mottagningen, helbild', malin: [[15, 0.3]], ljud: [[HOPP(1), 0.3 + L(15) * 0.55], [HOPP(2), 0.3 + L(15) * 0.95]],
    bild: 'Kaninen skuttar upp på pallen (*"hopp"*), sedan på britsen (*"och hopp!"*), och sätter sig med nallen i famnen', ljudtext: 'hopp × 2', ansikte: 'glad' },

  // --- Kritan ritar stetoskopet (Sanna 2026-11-20), lyssna på magen ---
  { id: '11a', d: 0.3 + L(10) + 3.0, plats: 'Halvbild: doktorn och kaninen', malin: [[10, 0.3]], ljud: [[RITA(3), 0.4]],
    bild: 'Kritan ritar stetoskopet i luften framför doktorn: slangen och bröstdelen streck för streck (3 s). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '11b', d: 0.6 + L(49) + G + 0.8, plats: 'Halvbild: doktorn och kaninen', malin: [[49, 0.6]], ljud: [[GLITTER, 0.1], [KN('fragande'), 0.8 + L(49)]],
    bild: 'Stetoskopet fylls i, doktorn tar det', ljudtext: '`glitter`, frågande', ansikte: 'nyfiken' },
  { id: '11c', d: 1.6, plats: 'Halvbild: doktorn', bild: 'Doktorn sätter propparna i öronen och sträcker bröstdelen mot britsen', ljudtext: '–', ansikte: 'doktorn glad' },
  { id: '12', d: 0.4 + L(52) + G, plats: 'Närbild: nallens mage', malin: [[52, 0.4]], ljud: dunkar(0.4, 17),
    bild: 'Bröstdelen mot nallens mage, två små ringar på *"dunk, dunk"*. Doktorn i bild', ljudtext: '`dunk` × 2 (lågt)', ansikte: '–' },
  { id: '13', d: 0.4 + L(18) + G + 0.8, plats: 'Närbild: kaninens mage', malin: [[18, 0.4]], ljud: [...dunkar(0.4, 18), [KN('fniss'), 0.6 + L(18)]],
    bild: 'Bröstdelen mot kaninens mage, två små ringar. Doktorn i bild (Sanna: "place dr in frame")', ljudtext: '`dunk` × 2, fniss', ansikte: 'fnissig' },
  { id: '14', d: 0.4 + L(19) + G + 0.8, plats: 'Halvbild: doktorn', malin: [[19, 0.4]], ljud: [[KN('ja'), 0.6 + L(19)]],
    bild: 'Doktorn med stetoskopet i öronen nickar och ler', ljudtext: 'ja', ansikte: 'doktorn glad' },
  { id: '15', d: 0.3 + L(20) + 4.0 + L(21) + G, plats: 'Halvbild: kaninen', malin: [[20, 0.3], [21, 4.3 + L(20)]], ljud: [[KLAPP, 4.1 + L(20)]],
    bild: 'Paus 4 s: barnet visar magen. Kaninen klappar sig på magen, *"Där!"*', ljudtext: '`klapp`', ansikte: 'glad' },

  // --- Öronen: först barnets öron (Sanna 2026-11-20: "Var är dina öron?" före undersökningen), sedan lampan ---
  { id: '21', d: 0.3 + L(27) + 4.0 + L(28) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[27, 0.3], [28, 4.3 + L(27)]], ljud: [[K(3), 4.5 + L(27) + L(28)]],
    bild: 'Paus 4 s: barnet visar öronen. Kaninen vickar på öronen', ljudtext: 'fniss (3)', ansikte: 'fnissig' },

  // --- Gapa ---
  { id: '16', d: 0.4 + L(22) + G, plats: 'Halvbild: doktorn', malin: [[22, 0.4]], ljud: [[KLICK, 0.4 + L(22) * 0.4]],
    bild: 'Doktorn håller upp öronlampan, ljuset tänds', ljudtext: '`lampa-klick`', ansikte: 'doktorn nyfiken' },
  { id: '17', d: 0.4 + L(53) + G, plats: 'Närbild: nallens öra', malin: [[53, 0.4]], ljud: [[TINDRA, 0.4 + L(53) * 0.8]],
    bild: 'Lampan lyser på nallens öra. Doktorn i bild', ljudtext: '`tindra`', ansikte: '–' },
  { id: '18', d: 0.4 + L(24) + G + 0.8, plats: 'Närbild: kaninens öra', malin: [[24, 0.4]], ljud: [[K(2), 0.6 + L(24)]],
    bild: 'Lampan lyser på kaninens långa öra, örat glöder. Doktorn i bild', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '19', d: 0.8 + L(25) + G + 0.6, plats: 'Närbild: kaninens öra', malin: [[25, 0.8]], ljud: [[KN('fniss', 2), 1.0 + L(25)]],
    bild: 'Kaninens öra ramlar ner framför ögat (0,5 s). Malin efter', ljudtext: 'fniss', ansikte: 'fnissig' },
  { id: '20', d: 0.8 + L(26) + G + 0.6, plats: 'Närbild: kaninen', malin: [[26, 0.8]], ljud: [[KN('ja', 2), 1.0 + L(26)]],
    bild: 'Kaninen lyfter upp örat med tassen', ljudtext: 'ja', ansikte: 'glad' },
  { id: '22', d: 0.4 + L(29) + G, plats: 'Mottagningen, helbild', malin: [[29, 0.4]],
    bild: 'Doktorn nickar', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '23', d: 0.4 + L(54) + G + 0.6, plats: 'Närbild: nallen', malin: [[54, 0.4]], ljud: [[KN('fniss', 3), 0.6 + L(54)]],
    bild: 'Lampan framför nallens mun. Nallen gapar inte', ljudtext: 'fniss', ansikte: 'fnissig' },
  { id: '24', d: 0.4 + L(31) + G, plats: 'Närbild: kaninen', malin: [[31, 0.4]],
    bild: 'Lampan framför kaninens mun, kaninen gapar stort (O-munnen) på *"aaa"* (bara Malins aaa)', ljudtext: '–', ansikte: 'gapar' },
  { id: '25', d: 0.4 + L(32) + 4.0 + L(33) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[32, 0.4], [33, 4.4 + L(32)]], ljud: [[KN('jippi'), 0.6 + L(32) + 4.0 + L(33)]],
    bild: 'Kaninen stänger munnen och ser stolt ut. Paus 4 s: barnet gapar', ljudtext: 'jippi', ansikte: 'stolt' },

  // --- Var är nallen? ---
  { id: '26', d: 2.3 + L(55) + G + 0.6, plats: 'Mottagningen, helbild', malin: [[55, 2.3]], ljud: [[KLAPP, 0.3], ['duns/duns-1', 1.5], [KN('fragande', 2), 2.5 + L(55)]],
    bild: 'Kaninen klappar händerna och släpper taget: leoparden glider ur knät, ramlar ner från britsen, studsar mjukt (duns) och rullar in bakom pallen', ljudtext: '`klapp`, `duns`, frågande', ansikte: 'förvånad' },
  { id: '27', d: 0.3 + L(56) + G + 1.0, plats: 'Halvbild: kaninen', malin: [[56, 0.3]], ljud: [[K(7), 0.5 + L(56)]],
    bild: 'Kaninen tittar åt vänster, sedan åt höger, öronen faller lite', ljudtext: 'frågande (7)', ansikte: 'nyfiken → osäker' },
  { id: '28', d: 0.3 + L(57) + 5.0, plats: 'Helbild → närbild på pallen', malin: [[57, 0.3]], ljud: [[TINDRA, 0.3 + L(57) + 3.0]],
    bild: 'Bred bild för frågan, efter 3 s klipp till närbild: nallens öra tittar fram över pallens kant och skimrar', ljudtext: 'tyst, sedan `tindra`', ansikte: 'nyfiken' },
  { id: '29', d: 0.3 + L(37) + G + 0.8, plats: 'Närbild: pallen', malin: [[37, 0.3]], ljud: [[KN('jippi', 2), 0.5 + L(37)]],
    bild: 'Örat skimrar tydligt', ljudtext: 'jippi', ansikte: 'jätteglad' },
  { id: '30', d: 1.2 + L(58) + G + 0.8, plats: 'Mottagningen, helbild', malin: [[58, 1.2]], ljud: [[HOPP(3), 0.3], [K('4b'), 1.4 + L(58)]],
    bild: 'Kaninen skuttar ner, tar nallen och kramar den. Malin efter kramen', ljudtext: 'hopp, mysig suck (4b)', ansikte: 'blundar nöjt' },

  // --- Kritan ritar stjärnan ---
  { id: '31a', d: 0.3 + L(39) + 3.0, plats: 'Halvbild: kaninen', malin: [[39, 0.3]], ljud: [[RITA(4), 0.4]],
    bild: 'Kritan ritar en stjärna i luften (konturen 2 s). Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '31b', d: 0.6 + L(40) + G, plats: 'Halvbild: kaninen', malin: [[40, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Stjärnan fylls i gul', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '32', d: 1.0 + L(41) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[41, 1.0]], ljud: [[POP(1), 0.9], [K(2), 1.2 + L(41)]],
    bild: 'Stjärnan glider till kaninens mage och klistras fast (`pop`). Malin efter', ljudtext: '`pop`, förtjust (2)', ansikte: 'glad' },
  { id: '33', d: 1.0 + L(59) + G + 0.6, plats: 'Halvbild: kaninen', malin: [[59, 1.0]], ljud: [[POP(2), 0.9], [KN('fniss', 4), 1.2 + L(59)]],
    bild: 'En liten stjärna glider till nallen', ljudtext: '`pop`, fniss', ansikte: 'fnissig' },
  { id: '34', d: 0.8 + L(43) + G + 0.8, plats: 'Halvbild: kaninen', malin: [[43, 0.8]], ljud: [[KN('jippi'), 1.0 + L(43)]],
    bild: 'Kaninen tittar ner på stjärnan, glatt skutt', ljudtext: 'jippi', ansikte: 'stolt' },

  // --- Tack och hej då ---
  { id: '35', d: 0.6 + L(44) + 2.5 + L(45) + G, plats: 'Mottagningen, helbild', malin: [[44, 0.6], [45, 3.1 + L(44)]], ljud: [[KN('ja', 3), 0.3]],
    bild: 'Kaninen vänder sig mot doktorn och nickar, doktorn nickar tillbaka. Paus 2,5 s', ljudtext: 'ja', ansikte: 'glad' },
  { id: '36', d: 0.6 + L(46) + G, plats: 'Halvbild: doktorn', malin: [[46, 0.6]],
    bild: 'Doktorn vinkar', ljudtext: '–', ansikte: 'doktorn glad' },
  { id: '37', d: 0.6 + L(60) + G + 1.4, plats: 'Halvbild: kaninen', malin: [[60, 0.6]], ljud: [[HEJDA, 0.8 + L(60)]],
    bild: 'Kaninen vinkar med nallen i andra tassen (armen bakom kroppen)', ljudtext: 'hej då', ansikte: 'jätteglad' },
  { id: '38', d: 0.3 + L(48) + 1.2, plats: 'Halvbild: kaninen', malin: [[48, 0.3]],
    bild: 'Samma, kaninen vinkar klart', ljudtext: '–', ansikte: 'glad' },
  { id: '39', d: 3.0, plats: 'Kritirisen', bild: 'Kritirisen runt kaninen och nallen, 0,6 s svart', ljudtext: '–', ansikte: '–' },
];
