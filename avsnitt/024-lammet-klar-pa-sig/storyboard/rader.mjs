// Storyboardens rader för 024 Lammet klär på sig: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d), ritar
// stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden]].
//
// Malins repliker: assets/ljud/roster/lammet-klar-pa-sig/<namn>.m4a (../rost.txt). Tredje värdet är den uppmätta längden
// (../rost-langder.txt, normaliserat till −3 dBFS, 2026-11-11). Raderna räknar sina tider från L(n), så de flyttar med en ny tagning.
// Utan tredje värde uppskattas längden ur texten (0,075 s per tecken, minst 0,9 s).
export const ROST = [
  ['01-kritan-ritar', 'Kritan ritar …', 1.83],
  ['02-vad-blir-det', 'Hm … vad blir det nu?', 1.69],
  ['03-lamm', 'Oj! Ett lamm!', 1.96],
  ['04-hej-lammet-hej', 'Hej, lammet! Hej, hej!', 1.80],
  ['05-ga-ut-leka', 'Ska du gå ut och leka?', 1.60],
  ['06-val-kla-dig', 'Då ska du väl klä på dig?', 1.51],
  ['07-lammet-vill-visst', 'Oj då. Lammet vill visst inte klä på sig.', 3.02],
  ['08-vad-gor', 'Hm … vad gör vi nu?', 2.02],
  ['09-titta-kritan-ritar', 'Titta! Kritan ritar något.', 2.40],
  ['10-mossa-varsagod-lammet', 'En mössa! Varsågod, lammet.', 2.76],
  ['11-saga-tack', 'Ska vi säga tack?', 0.87],
  ['12-tack', 'Tack!', 0.70],
  ['13-mossan', 'Mössan på!', 1.95],
  ['14-var-ar-lammet', 'Oj! Var är lammet?', 2.84],
  ['15-tittut', 'Tittut!', 1.37],
  ['16-var-ar-lammet', 'Var är lammet?', 1.05],
  ['17-tittut', 'Tittut!', 1.51],
  ['18-kla-dig', 'Ska du klä på dig nu?', 1.39],
  ['19-forst-ena-strumpan', 'Först ena strumpan. Dra, dra … på!', 4.75],
  ['20-andra-strumpan-dra', 'Och andra strumpan. Dra, dra … på!', 4.07],
  ['21-stovlarna-lammet-vet', 'Oj, stövlarna då? Lammet vet inte var.', 4.03],
  ['22-hjalpa-lammet-se', 'Kan du hjälpa lammet? Kan du se var stövlarna är?', 3.77],
  ['23-dar-bakom-pallen', 'Ja, där! Ja, bakom pallen!', 3.14],
  ['24-dra-dra', 'Dra, dra … på!', 2.21],
  ['25-ar-fardig-stampa', 'Nu är du färdig! Kan du stampa med fötterna?', 3.35],
  ['26-stamp-stamp-stamp', 'Stamp, stamp, stamp!', 2.57],
  ['27-hej-lammet-hej', 'Hej då, lammet! Hej då, mössan!', 2.54],
  ['28-hej-ses-snart', 'Hej då! Vi ses snart!', 2.39]];

const r2 = x => Math.round(x * 100) / 100;
export const UPPSKATTAD = n => ROST[n - 1][2] == null;
export const L = n => ROST[n - 1][2] ?? r2(Math.max(0.9, 0.075 * ROST[n - 1][1].length));
// var "på!" börjar i replikerna 19, 20 och 24 (silencedetect −35 dB, tagning 2026-11-11); plagget sitter exakt där. Mät om om tagningen byts.
const PA_TID = { 19: 3.85, 20: 3.51, 24: 1.73 };
export const PA = n => PA_TID[n];
// och de två "dra" före (samma mätning): plagget glider en bit på för varje dra
const DRA_TID = { 19: [2.17, 2.96], 20: [1.88, 2.68], 24: [0.05, 0.88] };
export const DRA = n => DRA_TID[n];

// Lammets ljud: ba-gullig, en känsla per nummer (format/bilderbok.md, assets/ljud/effekter/README.md): 1 hej, 2 förtjust, 3 fniss,
// 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande, 8 hej då. Varje känsla har två tagningar (N och Nb); scenen växlar mellan dem.
const BAG = n => `ba-gullig/ba-gullig-${n}`;
const BA = { glad: BAG(1), fortjust: BAG(2), trumpen: BAG(6), nyfiken: BAG(5), fragande: BAG(7), liten: BAG(4), hejda: BAG(8),
  fniss: BAG(3), fnissLang: BAG(3), fnissKort: BAG(3) };

// Malin efter handlingen (Sanna 2026-11-11: "malin needs some delay when actions are animated"): rörelsen börjar först,
// repliken 0,4–0,8 s in i den eller när den landar; frågor och uppmaningar kommer fortfarande före.
export const RADER = [
  { id: '00', d: 1.0, plats: 'Intro', bild: 'Lilla Kritans logotyp i 1 s. Ingen jingel, inget titelkort. Storyboarden visar ett textkort', ljudtext: 'tyst', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 3.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar lammets kontur i ett lugnt drag (ca 7 s totalt), halvvägs här', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och svävar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Det riktiga lammet fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 1.6 + L(4) + 1.4, plats: 'Hallen, helbild', malin: [[4, 1.6]], ljud: [['smasteg/smasteg-1', 0.2], [BA.glad, 1.9 + L(4)]],
    bild: 'Lammet trippar in från vänster (riggens gång), stannar och vinkar: armen bakom kroppen, snett ut förbi kanten', ljudtext: 'små steg, glatt `ba`', ansikte: 'glad' },
  { id: '2', d: 0.3 + L(5) + 1.6, plats: 'Hallen, halvbild', malin: [[5, 0.3]], ljud: [[BA.fortjust, 0.5 + L(5)]],
    bild: 'Lammet tittar mot dörren (till vänster i hallen, riktning vänster), öronen vippar', ljudtext: 'förtjust `ba`', ansikte: 'jätteglad' },
  { id: '3', d: 0.3 + L(6) + 2.2, plats: 'Hallen, helbild', malin: [[6, 0.3]], ljud: [[BA.trumpen, 0.6 + L(6)]],
    bild: 'Strumporna ligger på golvet. Lammet skakar på huvudet: hela ägget lutar ±6° tre gånger', ljudtext: 'trumpet `ba`', ansikte: 'ledsen (trumpen)' },
  { id: '4', d: 0.9 + L(7) + 1.0 + L(8) + 1.3, plats: 'Hallen, närbild', malin: [[7, 0.9], [8, 1.9 + L(7)]], ljud: [[BA.trumpen, 2.1 + L(7) + L(8)]],
    bild: 'Lammet vänder bort huvudet (riktning vänster), öronen faller. Paus 1 s mellan replikerna', ljudtext: 'trumpet `ba`', ansikte: 'ledsen, tittar bort' },
  { id: '5a', d: 1.3 + L(9) + 0.8, plats: 'Hallen, helbild', malin: [[9, 1.3]],
    bild: 'Kritan kommer in uppifrån höger och stannar i luften framför lammet', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '5b', d: 7.0, plats: 'Hallen, helbild (gissningen i helbild)', ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.0]],
    bild: 'Kritan ritar mössans kontur i luften i ett lugnt drag (4 s), sedan gisspaus 3 s: kritan svävar bredvid', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5c', d: 0.5 + L(10) + 0.5,   // Sanna: "make tack scene a bit faster" (1,2 → 0,5 s efter repliken)
    plats: 'Hallen, halvbild', malin: [[10, 0.5]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga mössan fylls i inifrån och svävar framför lammet. Kritan flyger iväg', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6a', d: 0.3 + L(11) + 1.8,   // pausen 4 → 2,5 s (1,8 + GLES 0,7)
    plats: 'Hallen, halvbild', malin: [[11, 0.3]], ljud: [[BA.nyfiken, 0.6 + L(11)]],
    bild: 'Lammet tittar på mössan, öronen reser sig. Paus 2,5 s: barnet säger tack', ljudtext: 'nyfiket `ba`, sedan tyst', ansikte: 'nyfiken' },
  { id: '6b', d: L(12) + 1.0, plats: 'Samma', malin: [[12, 0.0]], ljud: [[BA.fortjust, L(12) + 0.3]],
    bild: 'Lammet nickar precis på *"Tack!"* (ägget trycks ihop och sträcks en gång)', ljudtext: 'förtjust `ba`', ansikte: 'jätteglad' },
  { id: '7', d: 0.7 + L(13) + 1.8, plats: 'Hallen, halvbild', malin: [[13, 0.7]], ljud: [['prassel-tyg/prassel-tyg-1', 0.2], [BA.fnissKort, 1.0 + L(13)]],
    bild: 'Mössan glider ner uppifrån och stannar på huvudet. Öronen sticker ut under kanten', ljudtext: '`prassel-tyg`, fniss', ansikte: 'glad' },
  { id: '8', d: 0.7 + L(14) + 4.0, plats: 'Hallen, närbild (klipp)', malin: [[14, 0.7]], ljud: [['prassel-tyg/prassel-tyg-1', 0.0], [BA.liten, 2.7 + L(14)]],
    bild: 'Mössan glider ner över ögonen. Paus 4 s: bara nosen, munnen och öronen syns', ljudtext: 'tyst, ett litet `ba` under mössan', ansikte: '– (ögonen dolda), ler' },
  { id: '9', d: 0.3 + L(15) + 1.8, plats: 'Samma', malin: [[15, 0.3]], ljud: [[BA.fniss, L(15) + 0.4]],
    bild: 'Mössan glider upp på *"Tittut!"*, lammet tittar fram', ljudtext: '`ba-gullig-3` (fniss)', ansikte: 'jätteglad' },
  { id: '10', d: 0.6 + L(16) + 2.25 + L(17) + 1.8, plats: 'Samma', malin: [[16, 0.6], [17, 2.85 + L(16)]], ljud: [[BA.fnissLang, 2.95 + L(16) + L(17)]],
    bild: 'En gång till, kortare: mössan ner (paus 2 s) och upp igen på *"Tittut!"*', ljudtext: 'det långa `ba-gullig-3` (fniss)', ansikte: 'dolda → fnissig' },
  { id: '11', d: 0.3 + L(18) + 2.0, plats: 'Hallen, helbild', malin: [[18, 0.3]], ljud: [[BA.fortjust, 0.6 + L(18)]],
    bild: 'Lammet sätter sig på golvet bredvid strumporna (posen `sitter`), benen ut', ljudtext: 'förtjust `ba`', ansikte: 'glad' },
  { id: '12', d: 0.7 + L(19) + 1.4, plats: 'Hallen, närbild benen', malin: [[19, 0.7]], ljud: [['strumpa/strumpa-1', 0.7 + PA(19)]],
    bild: 'Lammet lyfter ena benet. Strumpan glider från golvet upp på benet och sitter på *"på!"*. **Shorten: 8–9 och 12–18**', ljudtext: '`strumpa`', ansikte: 'glad' },
  { id: '13', d: 0.7 + L(20) + 1.8, plats: 'Samma', malin: [[20, 0.7]], ljud: [['strumpa/strumpa-2', 0.7 + PA(20)], [BA.fnissKort, 1.1 + L(20)]],
    bild: 'Samma, andra benet', ljudtext: '`strumpa`, fniss', ansikte: 'fnissig' },
  { id: '14', d: 0.3 + L(21) + 2.2, plats: 'Hallen, halvbild', malin: [[21, 0.3]], ljud: [[BA.fragande, 0.6 + L(21)]],
    bild: 'Lammet tittar åt vänster, sedan åt höger (ögonen och ansiktet, huvudet vänds inte)', ljudtext: 'frågande `ba`', ansikte: 'nyfiken' },
  { id: '15', d: 0.3 + L(22) + 5.0, plats: 'Hallen, närbild pallen (klipp)', malin: [[22, 0.3]], ljud: [['glimt/glimt-1', 3.3 + L(22)]],
    bild: 'Två gula tår sticker fram bakom pallen. Paus 5 s; efter 3 s skimrar de svagt', ljudtext: 'tyst, ett svagt `tindra`', ansikte: '–' },
  { id: '16', d: 0.4 + L(23) + 1.4, plats: 'Samma', malin: [[23, 0.4]], ljud: [['glimt/glimt-2', 0.0], [BA.fortjust, L(23) + 0.6]],
    bild: 'Stövlarna skimrar tydligt', ljudtext: '`tindra`, förtjust `ba`', ansikte: '–' },
  { id: '17', d: 1.0 + L(24) + 1.6, plats: 'Hallen, helbild', malin: [[24, 1.0]], ljud: [['strumpa/strumpa-3', 1.0 + PA(24)], ['duns/duns-1', 1.3 + L(24)]],
    bild: 'Stövlarna glider fram från pallen över golvet och upp på benen, på plats på *"på!"*', ljudtext: '`strumpa`, `duns`', ansikte: 'jätteglad' },
  { id: '18', d: 0.6 + L(25) + 4.0 + L(26) + 1.8, plats: 'Hallen, helbild', malin: [[25, 0.6], [26, 4.6 + L(25)]],
    ljud: [['steg/steg-1', 4.6 + L(25)], ['steg/steg-2', 4.6 + L(25) + L(26) / 3], ['steg/steg-3', 4.6 + L(25) + 2 * L(26) / 3], [BA.fniss, 4.8 + L(25) + L(26)]],
    bild: 'Lammet står med mössa, strumpor och stövlar. Paus 4 s, sedan stampar det tre gånger, lugnt: ett ben i taget lyfts 20 px. Små streck vid foten', ljudtext: '`steg` ×3, `ba-gullig-3` (fniss)', ansikte: 'stolt → jätteglad' },
  { id: '19', d: 0.6 + L(27) + 1.6, plats: 'Hallen, halvbild', malin: [[27, 0.6]], ljud: [[BA.hejda, 0.8 + L(27)]],
    bild: 'Lammet vinkar (armen bakom kroppen, snett ut förbi kanten)', ljudtext: 'hej då-`ba`', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(28) + 1.6, plats: 'Samma', malin: [[28, 0.3]], ljud: [[BA.fnissKort, 0.5 + L(28)]],
    bild: 'Lammet vinkar klart, armen sjunker', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '21', d: 2.5, plats: 'Hallen → kritirisen', bild: 'Kritirisen drar ihop sig runt lammet', ljudtext: 'mattan klingar ut', ansikte: 'glad' },
];

export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (receptet), utom ritintrots två fasta rader
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
for (const r of RADER) r.d = r2(r.d);

// Extra provbilder (inte i filmen): bygg.mjs tar dem till frames/ men de räknas inte i tiden.
export const PROV = ['prov-strumpa', 'prov-strumpa-fram', 'prov-stovlar', 'prov-stovlar-fram', 'prov-mossa', 'prov-mossa-ogon'];
