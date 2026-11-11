// Storyboardens rader för 029 Leoparden plockar äpplen: en rad per uppslag i ../manus.md (01 och 5 delade, för att bilden byts mitt
// i uppslaget). Förlaga: 028 och 023. Läses av bygg.mjs (stillbilder ur kodscenen, storyboard.md, animatiken) och av kodscenen
// ../scener/appeltradet/index.html (tiderna och ljuden).
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden, vol]]. SP(känsla, o) = leopardens spinn-gullig (finns den inte än: spinn-fniss som stand-in, se SPINN).
//
// Malins repliker: filnamn och text ur ../rost.txt. UPPSKATTAD = true: längderna är gissade (0,35 s + 0,072 s per tecken) tills
// tagningen finns i assets/ljud/roster/leoparden-plockar-applen/; mät då om (ffprobe) och sätt MATT (silencedetect).
export const UPPSKATTAD = false;
export const SPINN = true;    // true när assets/ljud/effekter/spinn-gullig/spinn-gullig-1…8.m4a finns
// uppmätta längder (ffprobe) ur ../rost-langder.txt, tagning a
const LANGDER = Object.fromEntries([
['01-kritan-ritar', 1.74],
['02-vad-blir-det', 1.80],
['03-leopard', 1.96],
['04-hej-leoparden-hej', 1.91],
['05-sa-manga-applen', 1.83],
['06-applet-rullar', 2.77],
['07-applena-rullar-visst', 1.77],
['08-vad-gor', 1.81],
['09-titta-kritan-ritar', 2.44],
['10-korg-varsagod-leoparden', 3.04],
['11-saga-tack', 1.17],
['12-tack', 0.63],
['13-apple-pa-huvudet', 2.38],
['14-och-i-korgen', 1.75],
['15-plocka-applen-nu', 1.45],
['16-forst-ett-apple', 3.37],
['17-och-ett-till', 3.08],
['18-apple-kvar-vet', 4.26],
['19-hjalpa-leoparden-se', 3.70],
['20-dar-bakom-tradet', 2.83],
['21-vips-i-korgen', 1.71],
['22-korgen-full', 1.53],
['23-klattrar-upp', 3.12],
['24-var-ar-leoparden', 1.32],
['25-tittut', 0.87],
['26-var-ar-leoparden', 2.11],
['27-tittut', 1.38],
['28-hej-da-leoparden-korgen', 2.68],
['29-hej-ses-snart', 2.34],
]);
const g = t => +(0.35 + 0.072 * t.length).toFixed(2);
export const ROST = [
  ['01-kritan-ritar', 'Kritan ritar …'],
  ['02-vad-blir-det', 'Hm … vad blir det nu?'],
  ['03-leopard', 'Oj! En leopard!'],
  ['04-hej-leoparden-hej', 'Hej, leoparden! Hej, hej!'],
  ['05-sa-manga-applen', 'Titta, så många äpplen!'],
  ['06-applet-rullar', 'Oj då. Äpplet rullar iväg!'],
  ['07-applena-rullar-visst', 'Äpplena rullar visst iväg.'],
  ['08-vad-gor', 'Hm … vad gör vi nu?'],
  ['09-titta-kritan-ritar', 'Titta! Kritan ritar något.'],
  ['10-korg-varsagod-leoparden', 'En korg! Varsågod, leoparden.'],
  ['11-saga-tack', 'Ska vi säga tack?'],
  ['12-tack', 'Tack!'],
  ['13-apple-pa-huvudet', 'Oj! Ett äpple på huvudet …'],
  ['14-och-i-korgen', '… och i korgen! Ha ha!'],
  ['15-plocka-applen-nu', 'Ska du plocka äpplen nu?'],
  ['16-forst-ett-apple', 'Först ett äpple. Vips … i korgen!'],
  ['17-och-ett-till', 'Och ett till. Vips … i korgen!'],
  ['18-apple-kvar-vet', 'Oj, ett äpple är kvar. Leoparden vet inte var.'],
  ['19-hjalpa-leoparden-se', 'Kan du hjälpa leoparden? Kan du se var äpplet är?'],
  ['20-dar-bakom-tradet', 'Ja, där! Ja, bakom trädet!'],
  ['21-vips-i-korgen', 'Vips … i korgen!'],
  ['22-korgen-full', 'Nu är korgen full!'],
  ['23-klattrar-upp', 'Oj! Nu klättrar leoparden upp i trädet!'],
  ['24-var-ar-leoparden', 'Var är leoparden?'],
  ['25-tittut', 'Tittut!'],
  ['26-var-ar-leoparden', 'Var är leoparden?'],
  ['27-tittut', 'Tittut!'],
  ['28-hej-da-leoparden-korgen', 'Hej då, leoparden! Hej då, korgen!'],
  ['29-hej-ses-snart', 'Hej då! Vi ses snart!'],
].map(([f, t]) => [f, LANGDER[f] ?? g(t), t]);
export const L = n => ROST[n - 1][1];
// var ett ord börjar i en replik (s). Uppmätt (silencedetect) står i MATT; annars gissat ur var ordet står i texten.
const MATT = { '14 korgen 0': 0.63, '16 vips 0': 1.80, '16 korgen 0': 2.62, '17 vips 0': 1.43, '17 korgen 0': 2.29, '21 vips 0': 0.05, '21 korgen 0': 0.88 };   // tagning a, whisper + silencedetect
export const ORD = (n, ord, nr = 0) => { const k = `${n} ${ord} ${nr}`; if (k in MATT) return MATT[k];
  const t = ROST[n - 1][2].toLowerCase(); let i = -1; for (let j = 0; j <= nr; j++) i = t.indexOf(ord, i + 1);
  return +(0.15 + (L(n) - 0.3) * i / t.length).toFixed(2); };

export const KANSLA = { hej: 1, 'förtjust': 2, fniss: 3, 'mysig suck': 4, nyfiken: 5, trumpen: 6, pratar: 7, 'hej då': 8 };
const SP = (k, o) => ['spinn ' + k, o];
const FNISS = o => ['spinn-fniss/spinn-fniss-6', o, 1.4];   // det långa fnisset finns
// "Vips … i korgen!" i replik n: [vips, korgen]
export const VIPS = n => [ORD(n, 'vips'), ORD(n, 'korgen')];
const vips = (n, o) => { const [a, b] = VIPS(n).map(x => x + o);
  return [['swoosh/swoosh-2', a, 0.6], ['apple-studs/apple-studs-1', b + 0.1, 1.2], ['korg/korg-1', b + 0.12, 0.5], FNISS(b + 0.6)]; };

export const RADER = [
  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]],
    bild: 'Rent papper (efter bilderbok-introt). Kritan kommer in och ritar leopardens kontur i lugna drag, halvvägs här', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, fläckarna sist), kritan väntar bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga leoparden fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 2.6 + L(4) + 1.5, plats: 'Äppelträdet, helbild', malin: [[4, 2.4]], ljud: [SP('hej', 2.6 + L(4))],
    bild: 'Leoparden trippar in från vänster (riggens gång), stannar till vänster om stammen och vinkar. **Hej med vinkning**', ljudtext: 'små steg, glatt spinn', ansikte: 'jätteglad' },
  { id: '2', d: 0.6 + L(5) + 1.6, plats: 'Halvbild', malin: [[5, 0.6]], ljud: [['prassel-lov/prassel-lov-1', 0.2, 0.5], SP('förtjust', 0.8 + L(5))],
    bild: 'Leoparden tittar upp i kronan full av röda äpplen, öronen vippar', ljudtext: 'förtjust spinn', ansikte: 'nyfiken → glad' },
  { id: '3', d: 1.3 + L(6) + 1.4, plats: 'Helbild', malin: [[6, 1.3]], ljud: [['apple-studs/apple-studs-2', 1.0, 1.2], ['rull/rull-1', 1.1, 0.8], SP('nyfiken', 1.5 + L(6))],
    bild: 'Ett äpple lossnar, landar i gräset med en liten studs och rullar ut ur bild åt vänster', ljudtext: '`apple-studs`, `rull`, frågande spinn', ansikte: 'förvånad' },
  { id: '4', d: 0.6 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild, leoparden', malin: [[7, 0.6], [8, 1.6 + L(7)]], ljud: [['rull/rull-1', 0.1, 0.8], SP('trumpen', 0.8 + L(7)), SP('trumpen', 1.8 + L(7) + L(8))],
    bild: 'Ett äpple till rullar förbi i gräset, leoparden tittar efter det, öronen faller. Paus 1 s mellan replikerna', ljudtext: '`rull`, trumpet spinn', ansikte: 'trumpen' },
  { id: '5a', d: 0.6 + L(9) + 4.0 + 3.0, plats: 'Helbild → närbild där korgen ritas', malin: [[9, 0.3]], ljud: [['glitter/glitter-2', 0.1, 0.6]],
    bild: 'Kritan kommer in och ritar korgens kontur i gräset framför leoparden (4 s, nära bild), sedan halvbild medan kritan väntar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', d: 0.1 + L(10) + 0.5, plats: 'Samma → halvbild', malin: [[10, 0.1]], ljud: [['glitter/glitter-1', 0.0, 0.9]],
    bild: 'Den riktiga korgen fylls i inifrån, kritan flyger iväg. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.3 + L(11) + 2.5 + L(12) + 1.2, plats: 'Halvbild', malin: [[11, 0.3], [12, 0.3 + L(11) + 2.5]],
    ljud: [SP('nyfiken', 0.6 + L(11)), SP('förtjust', 0.4 + L(11) + 2.5 + L(12))],
    bild: 'Leoparden tittar på korgen, öronen reser sig. Paus 2,5 s: barnet säger tack. På *Tack!* nickar leoparden', ljudtext: 'nyfiket spinn, sedan förtjust spinn', ansikte: 'nyfiken → jätteglad' },
  { id: '7', d: 1.4 + L(13) + 0.8, plats: 'Halvbild', malin: [[13, 1.4]], ljud: [['apple-studs/apple-studs-3', 1.0, 1.0], FNISS(1.4 + L(13))],
    bild: 'Ett äpple lossnar och landar mjukt på huvudet. Leoparden blundar och fnissar. **Leken (äpplet på huvudet)**', ljudtext: '`apple-studs`, fniss', ansikte: 'förvånad → fnissig (blundar)' },
  { id: '8', d: 0.2 + L(14) + 1.6, plats: 'Samma', malin: [[14, 0.2]], ljud: [['apple-studs/apple-studs-1', 0.3 + ORD(14, 'korgen'), 1.0], ['korg/korg-1', 0.3 + ORD(14, 'korgen'), 0.6], FNISS(0.5 + L(14))],
    bild: 'Äpplet studsar från huvudet ner i korgen på *"korgen"*', ljudtext: '`korg`, `spinn-fniss`', ansikte: 'fnissig' },
  { id: '9', d: 0.3 + L(15) + 1.5, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [SP('förtjust', 0.5 + L(15))],
    bild: 'Leoparden tittar upp i kronan och nickar. **Shorten börjar här**', ljudtext: 'förtjust spinn', ansikte: 'glad' },
  { id: '10', d: 0.6 + L(16) + 1.4, plats: 'Halvbild', malin: [[16, 0.6]], ljud: vips(16, 0.6),
    bild: 'Leoparden sträcker på sig. På *"Vips"* lossnar ett äpple och glider i en mjuk båge, på *"i korgen!"* landar det i korgen', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'glad → fnissig' },
  { id: '11', d: 0.6 + L(17) + 1.4, plats: 'Samma', malin: [[17, 0.6]], ljud: vips(17, 0.6),
    bild: 'Samma, ett äpple till', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'fnissig' },
  { id: '12', d: 0.3 + L(18) + 1.8, plats: 'Halvbild', malin: [[18, 0.3]], ljud: [SP('nyfiken', 0.5 + L(18))],
    bild: 'Leoparden tittar åt vänster, sedan åt höger (ögonen och ansiktet)', ljudtext: 'frågande spinn', ansikte: 'nyfiken' },
  { id: '13', d: 0.3 + L(19) + 5.0, plats: 'Närbild stammen (klipp)', malin: [[19, 0.3]],
    bild: 'En röd kant sticker fram bakom stammen, nere i gräset. Paus 5 s; efter ca 3 s skimrar den svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '14', d: L(20) + 1.4, plats: 'Samma', malin: [[20, 0.0]], ljud: [['tindra/tindra-1', 0.2, 0.9], SP('förtjust', 0.3 + L(20))],
    bild: 'Äpplet skimrar tydligt', ljudtext: 'förtjust spinn, `tindra`', ansikte: 'jätteglad' },
  { id: '15', d: 0.3 + L(21) + 1.4, plats: 'Halvbild', malin: [[21, 0.3]], ljud: vips(21, 0.3),
    bild: 'Äpplet glider fram bakom stammen på *"Vips"* och landar i korgen på *"korgen"*', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'jätteglad' },
  { id: '16', d: 0.3 + L(22) + 1.5, plats: 'Halvbild', malin: [[22, 0.3]], ljud: [['tindra/tindra-2', 0.3, 0.8], SP('förtjust', 0.5 + L(22))],
    bild: 'Korgen full av äpplen, den skimrar. Leoparden stolt', ljudtext: '`tindra`, förtjust spinn', ansikte: 'stolt' },
  { id: '17', d: 0.3 + L(23) + 1.6, plats: 'Helbild', malin: [[23, 0.3]], ljud: [['prassel-lov/prassel-lov-1', 0.9, 0.8], ['prassel-lov/prassel-lov-1', 2.2, 0.8], FNISS(0.3 + L(23) + 0.4)],
    bild: 'Leoparden klättrar upp bakom stammen med lugna skutt och försvinner bakom kronan', ljudtext: '`prassel-lov`, `spinn-fniss`', ansikte: 'jätteglad' },
  { id: '18', d: 0.3 + L(24) + 4.0, plats: 'Närbild kronan', malin: [[24, 0.3]], ljud: [['prassel-buske/prassel-buske-1', 0.2, 0.9], ['prassel-buske/prassel-buske-1', 0.3 + L(24) + 1.5, 0.6]],
    bild: 'Kronan prasslar och gungar lite. Paus 4 s: barnet letar', ljudtext: '`prassel-buske`, tyst', ansikte: '–' },
  { id: '19', d: 0.2 + L(25) + 1.6, plats: 'Samma', malin: [[25, 0.2]], ljud: [FNISS(0.4 + L(25) - 0.2)],
    bild: 'På *"Tittut!"* kommer huvudet och öronen fram vid kronans vänstra kant. **Leken (tittut i trädet)**', ljudtext: 'långt fniss', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(26) + 2.0 + L(27) + 1.6, plats: 'Samma', malin: [[26, 0.3], [27, 0.3 + L(26) + 2.0]],
    ljud: [['prassel-buske/prassel-buske-1', 0.3 + L(26) + 0.3, 0.9], FNISS(0.3 + L(26) + 2.0 + L(27))],
    bild: 'Huvudet gömmer sig, kronan prasslar. På *"Tittut!"* kommer huvudet fram på andra sidan. **Shorten slutar här**', ljudtext: '`prassel-buske`, `spinn-fniss`', ansikte: 'jätteglad' },
  { id: '21', d: 1.9 + L(28) + 1.5, plats: 'Helbild', malin: [[28, 1.9]], ljud: [['prassel-lov/prassel-lov-1', 0.2, 0.7], ['landa-mjuk/landa-mjuk-5', 1.55, 1.2], SP('hej då', 2.1 + L(28))],
    bild: 'Leoparden klättrar ner bakom stammen, landar bakom korgen och vinkar (armen bakom kroppen). **Hej då med vinkning**', ljudtext: 'hej då-spinn', ansikte: 'jätteglad' },
  { id: '22', d: 0.3 + L(29) + 1.6, plats: 'Samma', malin: [[29, 0.3]], ljud: [FNISS(0.5 + L(29))],
    bild: 'Leoparden vinkar klart, armen sjunker', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '23', d: 2.5, plats: 'Äppelträdet → kritirisen', bild: 'Kritirisen drar ihop sig runt leoparden och korgen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5)
for (const r of RADER) if (r.malin && !['01a', '01b', '5b'].includes(r.id)) r.d += GLES;
