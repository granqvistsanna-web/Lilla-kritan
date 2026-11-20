// Storyboardens rader för 045 Lammet bakar pepparkakor: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 044 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt (mätt när tagning 1 delades 2026-11-19; rad 10 är uppskattad, 2,2 s,
// tills tagning 2 finns).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries(readFileSync(HAR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Lammets röst (ba-gullig från 024): 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar/frågar, 8 hej då; b = andra tagningen.
const B = n => `ba-gullig/ba-gullig-${n}`, FNISS = 'ba-fniss/ba-fniss-1';
const RITA = n => `krita-ritar/krita-ritar-${n}`, GLITTER = 'glitter/glitter-1', TINDRA = 'tindra/tindra-3', POP = n => `pop/pop-${n}`, PLING = 'pling/pling-1';
const TRYCK = 'sno-duns/sno-duns-1', KLADD = 'deg-kladd/deg-kladd-1', TICK = 'tick/tick-1', RING = 'ringklocka/ringklocka-1';
const TASS = n => `tass/tass-${n}`, KNASTER = 'knaster/knaster-1', MUMS = 'mums/mums-5';
const G = 0.9;   // glest tempo: extra luft på varje rad med en replik (receptets GLES, 044 hade 1,1)
const ticka = (fran, till, steg = 1.0) => Array.from({ length: Math.max(0, Math.floor((till - fran) / steg)) }, (_, i) => [TICK, fran + i * steg]);

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar (papperet): pepparkaksstjärnan, idén ---
  { id: '01a', d: 10.5, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITA(1), 0.3]],
    bild: 'Kritan ritar pepparkaksgubben detaljerat (Sanna 2026-11-19 kväll): konturen i ett lugnt drag, glasyrprickarna runt kanten, tre knappar, ögonen och leendet', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Pepparkaksgubben fylls i inifrån. Zoom in i papperet, in i julköket: bordet med degen, formarna, plåten och grytlapparna', ljudtext: '`glitter`', ansikte: '–' },

  // --- Julköket: vad ska du göra? ---
  { id: '1', d: 4.0 + L(4) + G + 1.0, plats: 'Julköket, helbild', malin: [[4, 4.0]], ljud: [[TASS(1), 0.6], [TASS(2), 1.4], [TASS(3), 2.2], [TASS(4), 3.0], [B(1), 4.3 + L(4)]],
    bild: 'Snön faller i fönstret. Lammet trippar in från vänster, ställer sig bakom bordet och vinkar (armen bakom kroppen)', ljudtext: 'tassar, bä hej (1)', ansikte: 'jätteglad' },
  { id: '2', d: 0.3 + L(5) + G + 1.4, plats: 'Halvbild', malin: [[5, 0.3]], ljud: [[B(7), 0.6 + L(5)]],
    bild: 'Lammet tittar ner på degen och upp igen och svarar med ett pratande bä', ljudtext: 'bä pratar (7)', ansikte: 'nyfiken → glad' },
  { id: '2b', d: 0.4 + L(6) + G, plats: 'Närbild uppifrån: degen', malin: [[6, 0.4]],
    bild: 'Degen uppifrån, utkavlad, en brun yta med kritkorn och dukens rutor runt kanten', ljudtext: '–', ansikte: '–' },
  { id: '3', d: 0.3 + L(7) + G + 1.2, plats: 'Halvbild', malin: [[7, 0.3]], ljud: [[B(2), 0.5 + L(7)]],
    bild: 'Glatt skutt (20 px), öronen upp, efter frågan', ljudtext: 'förtjust (2)', ansikte: 'jätteglad' },
  { id: '3b', d: 0.8 + L(8) + G, plats: 'Halvbild', malin: [[8, 0.8]],
    bild: 'Lammet nickar två gånger. Malin efter nicken', ljudtext: '–', ansikte: 'glad' },
  // --- Har du allt? (Sanna 2026-11-19 kväll): lammet visar degen, formarna och plåten. Ersätter rad 4 ("Deg har du …") ---
  { id: '3c', d: 0.3 + L(48) + G + 1.0, plats: 'Halvbild', malin: [[48, 0.3]], ljud: [[B(7), 0.5 + L(48)]],
    bild: 'Lammet tittar ner på bordet och sedan upp på oss', ljudtext: 'pratar (7)', ansikte: 'nyfiken' },
  { id: '3d', d: 0.9 + L(49) + G + 0.4, plats: 'Närbild: degen', malin: [[49, 0.9]], ljud: [[TRYCK, 0.45], [B(2), 1.0 + L(49)]],
    bild: 'Vänster tass klappar på degen, degen glimtar. Malin efter klappen', ljudtext: 'duns, förtjust (2)', ansikte: 'glad' },
  { id: '3e', d: 0.3 + L(50) + G + 0.3, plats: 'Närbild: formarna', malin: [[50, 0.3]], ljud: [[PLING, 0.3 + L(50) * 0.45], [PLING, 0.3 + L(50) * 0.85]],
    bild: 'Stjärnformen glimtar på *"stjärna"*, hjärtformen på *"hjärta"*', ljudtext: '`pling` × 2 lågt', ansikte: '–' },
  { id: '3f', d: 0.9 + L(51) + G + 0.4, plats: 'Närbild: plåten', malin: [[51, 0.9]], ljud: [[TASS(1), 0.45], [B('2b'), 1.0 + L(51)]],
    bild: 'Höger tass klappar på plåten, plåten glimtar', ljudtext: 'tass, förtjust (2b)', ansikte: 'glad' },
  { id: '3g', d: 0.3 + L(52) + G + 0.8, plats: 'Halvbild', malin: [[52, 0.3]], ljud: [[B(3), 0.5 + L(52)]],
    bild: 'Glatt skutt, öronen upp', ljudtext: 'fniss (3)', ansikte: 'jätteglad' },
  { id: '4b', d: 0.3 + L(10) + G + 0.4, plats: 'Närbild: degen och formarna', malin: [[10, 0.3]], ljud: [[PLING, 0.3 + L(10) * 0.45]],
    bild: 'Degen, sedan glimtar stjärnformen bredvid (på *"form"*), och formen gör en liten nick nedåt på *"tryck"*', ljudtext: '`pling` lågt', ansikte: '–' },
  { id: '5', d: 0.9 + L(11) + G, plats: 'Halvbild', malin: [[11, 0.9]], ljud: [[TRYCK, 0.5]],
    bild: 'Lammet struntar i formen och trycker tassen rakt ner i degen (armen bakom bordskanten, kroppen lutar fram)', ljudtext: '`sno-duns` (tryck)', ansikte: 'busig' },
  { id: '6', d: 0.8 + L(12) + G + 1.6, plats: 'Närbild framifrån: tassen', malin: [[12, 0.8]], ljud: [[KLADD, 0.3], [B(6), 1.0 + L(12)]],
    bild: 'Tassen lyfts med en brun degklick på spetsen. Lammet tittar på den, skakar armen två gånger, klicken faller ner. Öronen faller', ljudtext: '`deg-kladd`, trumpen (6)', ansikte: 'förvånad → trumpen' },

  // --- Formarna: stjärnan, en till, en till, hjärtat ---
  { id: '7', d: 0.3 + L(13) + G + 3.0, plats: 'Halvbild', malin: [[13, 0.3]], ljud: [[B(5), 0.6 + L(13) + 1.4]],
    bild: 'Lammet tittar på stjärnformen, sedan på hjärtformen. Paus 3 s: barnet väljer', ljudtext: 'nyfiken (5)', ansikte: 'nyfiken' },
  { id: '8', d: 0.4 + L(14) + G, plats: 'Närbild: stjärnformen', malin: [[14, 0.4]], ljud: [[PLING, 0.1], [B('2b'), 0.6 + L(14)]],
    bild: 'Stjärnformen glimtar', ljudtext: '`pling`, förtjust (2b)', ansikte: '–' },
  { id: '9', d: 0.4 + L(15) + G + 0.4, plats: 'Närbild uppifrån: degen', malin: [[15, 0.4]], ljud: [[TRYCK, 0.5], [TRYCK, 1.1], [POP(1), 0.4 + L(15)]],
    bild: 'Stjärnformen ställer sig på degen, tassen kommer in uppifrån och trycker två gånger, formen lyfts: en rå stjärna i degen', ljudtext: 'tryck × 2, `pop`', ansikte: '–' },
  { id: '10', d: 1.0 + L(16) + G, plats: 'Halvbild', malin: [[16, 1.0]], ljud: [[TASS(5), 0.9]],
    bild: 'Den råa stjärnan lyfter i en båge och landar på plåten. Malin när den landat', ljudtext: '`tass` lågt', ansikte: 'glad' },
  { id: '11', d: 0.4 + L(17) + G + 0.6, plats: 'Halvbild', malin: [[17, 0.4]], ljud: [[TRYCK, 0.5], [POP(2), 0.9], [TRYCK, 1.6], [POP(3), 2.0]],
    bild: 'Två stjärnor till trycks snabbt och landar på plåten', ljudtext: 'tryck, `pop` × 2', ansikte: 'glad' },
  { id: '12', d: 0.4 + L(18) + G + 0.8, plats: 'Närbild uppifrån: degen', malin: [[18, 0.4]], ljud: [[TRYCK, 0.5], [TRYCK, 1.1], [POP(4), 0.4 + L(18)]],
    bild: 'Hjärtformen på degen, två tryck, ett rått hjärta. Det lyfter och landar på plåten', ljudtext: 'tryck × 2, `pop`', ansikte: '–' },
  { id: '13', d: 0.6 + L(19) + G + 1.2, plats: 'Halvbild', malin: [[19, 0.6]], ljud: [[B(3), 0.8 + L(19)]],
    bild: 'Lammet blir glad, öronen vippar', ljudtext: 'fniss (3)', ansikte: 'fnissig' },

  // --- In i ugnen, ingen klocka ---
  { id: '14', d: 0.4 + L(20) + G + 0.6, plats: 'Närbild: plåten', malin: [[20, 0.4]], ljud: [[B(1), 0.6 + L(20)]],
    bild: 'Plåten med fyra råa kakor (tre stjärnor, ett hjärta) som står upp som små klistermärken', ljudtext: 'bä ja (1)', ansikte: '–' },
  { id: '15', d: 0.7 + L(21) + G, plats: 'Halvbild', malin: [[21, 0.7]],
    bild: 'Glatt skutt. Malin efter skuttet', ljudtext: '–', ansikte: 'jätteglad' },
  // Sanna 20/11 (3:18): lammet går själv bort med plåten till ugnen och hämtar den, plåten flyger inte. Repliken delas i två:
  // [n, tid, ss, längd]: "Ska de in i ugnen?" före, "Sådär!" när lammet är borta vid ugnen (utanför bild).
  { id: '16', d: 6.8, plats: 'Halvbild → helbild → halvbild', malin: [[22, 0.3, 0, 1.1], [22, 3.4, 1.2]],
    ljud: [[TASS(1), 1.3], [TASS(2), 1.9], [TASS(3), 2.5], [TASS(4), 4.3], [TASS(1), 4.9], [TASS(2), 5.5]],
    bild: 'Lammet lyfter plåten med båda tassarna och går med den ut till höger (till ugnen, som aldrig syns). Sådär! Lammet kommer tillbaka utan plåten', ljudtext: 'tassar', ansikte: 'glad' },
  { id: '17', d: 0.3 + L(23) + G, plats: 'Halvbild', malin: [[23, 0.3]],
    bild: 'Lammet tittar på oss', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '18', d: 0.6 + L(24) + G + 1.2, plats: 'Halvbild', malin: [[24, 0.6]], ljud: [[B('7b'), 0.8 + L(24)]],
    bild: 'Lammet tittar åt vänster och höger, öronen faller', ljudtext: 'frågande (7b)', ansikte: 'nyfiken → osäker' },
  { id: '19', d: 0.3 + L(25) + G + 1.2, plats: 'Halvbild', malin: [[25, 0.3]], ljud: [[B('6b'), 0.5 + L(25)]],
    bild: 'Lammet skakar lite på huvudet (lutar ±6° två gånger)', ljudtext: 'trumpen (6b)', ansikte: 'trumpen' },
  { id: '20', d: 0.3 + L(26) + G, plats: 'Halvbild', malin: [[26, 0.3]],
    bild: 'Lammet tittar ner på bordet', ljudtext: '–', ansikte: 'nyfiken' },

  // --- Kritan ritar ringklockan ---
  { id: '21a', d: 0.3 + L(27) + 3.0, plats: 'Julköket, helbild', malin: [[27, 0.3]], ljud: [[RITA(2), 0.4]],
    bild: 'Kritan flyger in och ritar ringklockans kontur på bordet, rakt framför grytlapparna. Gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '21b', d: 0.8 + L(28) + G, plats: 'Halvbild', malin: [[28, 0.8]], ljud: [[GLITTER, 0.1]],
    bild: 'Ringklockan fylls i inifrån. Bara en rutig grön kant syns vid klockans sida (grytlapparna bakom)', ljudtext: '`glitter`', ansikte: 'glittriga ögon' },
  { id: '22', d: 0.3 + L(29) + 2.5, plats: 'Halvbild', malin: [[29, 0.3]], ljud: [[B('5b'), 0.6 + L(29)]],
    bild: 'Lammet tittar på klockan, öronen upp. Paus 2,5 s', ljudtext: 'nyfiken (5b)', ansikte: 'glittriga ögon' },
  { id: '23', d: 0.2 + L(30) + G + 0.6, plats: 'Halvbild', malin: [[30, 0.2]], ljud: [[B(2), 0.4 + L(30)]],
    bild: 'Lammet nickar direkt', ljudtext: 'förtjust (2)', ansikte: 'glad' },

  // --- Vänta, doften, klockan ringer ---
  { id: '24', d: 0.6 + L(31) + G + 1.4, plats: 'Närbild: klockan', malin: [[31, 0.6]], ljud: ticka(0.2, 0.6 + L(31) + G + 1.4),
    bild: 'Klockans visare börjar gå, tick i takt', ljudtext: '`tick`', ansikte: '–' },
  { id: '25', d: 1.2 + L(32) + G + 1.6, plats: 'Halvbild', malin: [[32, 1.2]], ljud: [...ticka(0.0, 1.2 + L(32) + G + 1.6), [B(4), 1.4 + L(32)]],
    bild: 'Lammet blundar och lyfter nosen. Tre vågiga gula doftstreck kommer in från höger, där ugnen är. Snön faller', ljudtext: '`tick`, mysig suck (4)', ansikte: 'blundar nöjt' },
  { id: '26', d: 0.4 + L(33) + G, plats: 'Närbild: klockan', malin: [[33, 0.4]], ljud: [[RING, 0.0]],
    bild: 'Klockan skakar ±4° och ringer (ingen förflyttning), två små streck vid klockorna', ljudtext: '`ringklocka`', ansikte: '–' },
  { id: '27', d: 0.6 + L(34) + G + 0.6, plats: 'Halvbild', malin: [[34, 0.6]], ljud: [[B('2b'), 0.8 + L(34)]],
    bild: 'Lammet öppnar ögonen, öronen upp', ljudtext: 'förtjust (2b)', ansikte: 'glad' },

  // --- Grytlapparna: barnet hittar dem ---
  { id: '27b', d: 1.0 + L(53) + G + 1.2, plats: 'Halvbild', malin: [[53, 1.0]], ljud: [[B(7), 1.2 + L(53)]],
    bild: 'Lammet tittar åt vänster, Malin efter, sedan åt höger', ljudtext: 'frågande (7)', ansikte: 'nyfiken' },
  { id: '27c', d: 0.3 + L(54) + 5.0, plats: 'Helbild → närbild på klockan', malin: [[54, 0.3]],
    bild: 'Bred bild för frågan, sedan klipp till närbild på klockan: en rutig grön kant sticker fram vid sidan. Efter 3 s skimrar den', ljudtext: 'tyst, lammet blinkar', ansikte: 'nyfiken' },
  { id: '27d', d: 0.5 + L(55) + G + 1.0, plats: 'Närbild: klockan', malin: [[55, 0.5]], ljud: [[TINDRA, 0.2], [B(2), 0.7 + L(55)]],
    bild: 'Kanten skimrar tydligt, grytlapparna glider fram bakom klockan', ljudtext: '`tindra`, förtjust (2)', ansikte: 'jätteglad' },
  { id: '28', d: 0.8 + L(56) + G, plats: 'Närbild: tassarna', malin: [[56, 0.8]], ljud: [[TASS(6), 0.7]],
    bild: 'Grytlapparna glider upp från bordet och sätter sig på tasspetsarna på *"på!"*', ljudtext: '`tass` lågt', ansikte: '–' },
  // Sanna 20/11 (3:18): lammet går med grytvantarna till ugnen och bär tillbaka plåten. "Ta ut kakorna …" när lammet går, "sådär!" när plåten står på bordet.
  { id: '29', d: 6.6, plats: 'Helbild', malin: [[39, 0.4, 0, 1.05], [39, 5.75, 1.1]],
    ljud: [[TASS(3), 0.9], [TASS(4), 1.5], [TASS(1), 2.1], [TASS(2), 3.5], [TASS(3), 4.1], [TASS(4), 4.7], [TASS(5), 5.6]],
    bild: 'Lammet går med grytvantarna ut till höger och kommer tillbaka med den varma plåten: bruna glansiga kakor och tre ångstreck. Plåten ställs på bordet', ljudtext: 'tassar', ansikte: 'glad' },

  // --- Varma, blåsa, mums ---
  { id: '30', d: 0.4 + L(40) + G, plats: 'Närbild: kakorna', malin: [[40, 0.4]],
    bild: 'Kakorna med ångan', ljudtext: '–', ansikte: '–' },
  { id: '31', d: 0.3 + L(41) + 4.0, plats: 'Helbild', malin: [[41, 0.3]],
    bild: 'Lammet tittar ut mot oss. Paus 4 s: ångstrecken försvinner ett i taget', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '32', d: 0.3 + L(42) + G, plats: 'Närbild: kakorna', malin: [[42, 0.3]], ljud: [[TINDRA, 0.6]],
    bild: 'Sista ångstrecket borta', ljudtext: '`tindra`', ansikte: '–' },
  { id: '33', d: 1.0 + L(43) + G + 0.6, plats: 'Närbild: lammet och stjärnkakan', malin: [[43, 1.0]], ljud: [[KNASTER, 1.3], [MUMS, 1.0 + L(43)]],
    bild: 'Grytlapparna är av. Lammet böjer sig fram mot stjärnkakan, en bit borta på *"tugga"*, resten på *"mums!"*', ljudtext: '`knaster`, `mums`', ansikte: 'glad' },
  { id: '34', d: 0.6 + L(44) + G + 2.8, plats: 'Närbild', malin: [[44, 0.6]], ljud: [[FNISS, 0.8 + L(44)]],
    bild: 'Lammet reser sig med smulor på nosen och fnissar', ljudtext: '`ba-fniss` (långt)', ansikte: 'fnissig' },
  { id: '35', d: 0.6 + L(45) + G + 1.4, plats: 'Julköket, helbild med fönstret', malin: [[45, 0.6]], ljud: [[B('4b'), 0.8 + L(45)]],
    bild: 'Lammet blundar nöjt bakom bordet med kakorna, snön faller', ljudtext: 'mysig suck (4b)', ansikte: 'blundar nöjt' },
  { id: '36', d: 0.6 + L(46) + G + 1.6, plats: 'Helbild', malin: [[46, 0.6]], ljud: [[B(8), 0.8 + L(46)]],
    bild: 'Lammet vinkar (armen bakom kroppen)', ljudtext: 'hej då (8)', ansikte: 'jätteglad' },
  { id: '37', d: 0.3 + L(47) + 1.2, plats: 'Helbild', malin: [[47, 0.3]],
    bild: 'Samma, vinkar klart', ljudtext: '–', ansikte: 'glad' },
  { id: '38', d: 3.0, plats: 'Kritirisen', bild: 'Kritirisen runt lammet, 0,6 s svart', ljudtext: '–', ansikte: '–' },
];
