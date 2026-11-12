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
['30-applena-hogt-upp', 2.14],
['31-nar-inte', 1.26],
['32-kritan-ritar-igen', 2.15],
['33-pall-varsagod', 2.51],
['34-tack-kritan', 0.90],
['35-upp-pa-pallen-hopp', 2.01],
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
  // kritan ritar igen (bilderbok 9): pallen (rad 9b–9f), Sanna 2026-11-11
  ['30-applena-hogt-upp', 'Oj, äpplena sitter högt upp.'],
  ['31-nar-inte', 'Leoparden når inte.'],
  ['32-kritan-ritar-igen', 'Titta! Kritan ritar igen.'],
  ['33-pall-varsagod', 'En pall! Varsågod, leoparden.'],
  ['34-tack-kritan', 'Tack, kritan!'],
  ['35-upp-pa-pallen-hopp', 'Upp på pallen! Hopp, hopp!'],
].map(([f, t]) => [f, LANGDER[f] ?? g(t), t]);
export const L = n => ROST[n - 1][1];
export const SAKNAS = new Set(ROST.filter(r => !(r[0] in LANGDER)).map(r => r[0]));   // repliker utan tagning (stand-in-längd): hoppas över i ljudet
// var ett ord börjar i en replik (s). Uppmätt (silencedetect) står i MATT; annars gissat ur var ordet står i texten.
const MATT = { '14 korgen 0': 0.63, '16 vips 0': 1.80, '16 korgen 0': 2.62, '17 vips 0': 1.43, '17 korgen 0': 2.29, '21 vips 0': 0.05, '21 korgen 0': 0.88 };   // tagning a, whisper + silencedetect
export const ORD = (n, ord, nr = 0) => { const k = `${n} ${ord} ${nr}`; if (k in MATT) return MATT[k];
  const t = ROST[n - 1][2].toLowerCase(); let i = -1; for (let j = 0; j <= nr; j++) i = t.indexOf(ord, i + 1);
  return +(0.15 + (L(n) - 0.3) * i / t.length).toFixed(2); };

export const KANSLA = { hej: 1, 'förtjust': 2, fniss: 3, 'mysig suck': 4, nyfiken: 5, trumpen: 6, pratar: 7, 'hej då': 8 };
const SP = (k, o) => ['spinn ' + k, o];
let nf = 0;   // fnisset: spinn-fniss 1 och 2 växlar ("hee hee"; 6 lät som "No!", Sanna 2026-11-11)
const FNISS = o => [`spinn-fniss/spinn-fniss-${(nf++ % 2) + 1}`, o, 1.1];
const VIND = o => ['vind-hatt/vind-hatt-3', o, 0.9];   // vindpusten som skakar loss äpplena (Sanna: äpplen faller av en anledning)
// vindpustarna (s in i raden): [start, när äpplet lossnar, när det landar]
export const PUST = { '3': [0.0, 0.7, 1.4], '4': [0.0, 0.6, 1.3], '7': [0.0, 0.6, 1.4], '12': [0.0, 0.6, 1.5] };
// rad 9: två lugna skutt upp på pallen (s in i raden)
export const PALLHOPP = () => { const a = 0.4; return [a, a + 1.0]; };   // rad 9f: före Malin (Malin efter handlingen)
// rad 9b: två små sträck-hopp mot äpplena (s in i raden)
export const STRACK = () => [0.5, 1.9 + L(30)];
// rad 9c: kritan ritar pallen i RITP s efter repliken
export const RITP = 4.0;
// "Vips … i korgen!" i replik n: [vips, korgen]
export const VIPS = n => [ORD(n, 'vips'), ORD(n, 'korgen')];
const vips = (n, o) => { const [a, b] = VIPS(n).map(x => x + o);
  return [['swoosh/swoosh-2', a, 0.6], ['apple-studs/apple-studs-1', b + 0.1, 1.2], ['korg/korg-1', b + 0.12, 0.5], FNISS(Math.max(b + 0.6, o + L(n) + 0.2))]; };   // fnisset aldrig över Malin

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
  { id: '3', d: 1.8 + L(6) + 1.4, plats: 'Helbild', malin: [[6, 1.8]], ljud: [VIND(0.0), ['apple-studs/apple-studs-2', 1.4, 1.2], ['rull/rull-1', 1.5, 0.8], SP('nyfiken', 2.0 + L(6))],
    bild: 'En vindpust: kronan gungar, vindstreck far förbi. Ett äpple lossnar, landar i gräset med en liten studs och rullar ut ur bild åt vänster', ljudtext: '`apple-studs`, `rull`, frågande spinn', ansikte: 'förvånad' },
  { id: '4', d: 1.6 + L(7) + 1.0 + L(8) + 1.3, plats: 'Helbild → närbild, leoparden', malin: [[7, 1.6], [8, 2.6 + L(7)]], ljud: [VIND(0.0), ['apple-studs/apple-studs-3', 1.3, 1.0], ['rull/rull-1', 1.35, 0.8], SP('trumpen', 1.8 + L(7)), SP('trumpen', 2.8 + L(7) + L(8))],
    bild: 'En vindpust till, ett äpple till lossnar och rullar förbi i gräset; leoparden tittar efter det. Närbild på "vad gör vi nu": öronen faller. Paus 1 s mellan replikerna', ljudtext: '`rull`, trumpet spinn', ansikte: 'trumpen' },
  { id: '5a', d: 0.6 + L(9) + 4.0 + 3.0, plats: 'Helbild → närbild där korgen ritas', malin: [[9, 0.3]], ljud: [['glitter/glitter-2', 0.1, 0.6]],
    bild: 'Kritan kommer in och ritar korgens kontur i gräset framför leoparden (4 s, nära bild), sedan halvbild medan kritan väntar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', d: 0.5 + L(10) + 0.5, plats: 'Samma → halvbild', malin: [[10, 0.5]], ljud: [['glitter/glitter-1', 0.0, 0.9]],   // korgen fylls i först
    bild: 'Den riktiga korgen fylls i inifrån, kritan flyger iväg. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.3 + L(11) + 2.5 + L(12) + 1.2, plats: 'Halvbild', malin: [[11, 0.3], [12, 0.3 + L(11) + 2.5]],
    ljud: [SP('nyfiken', 0.6 + L(11)), SP('förtjust', 0.4 + L(11) + 2.5 + L(12))],
    bild: 'Leoparden tittar på korgen, öronen reser sig. Paus 2,5 s: barnet säger tack. På *Tack!* nickar leoparden', ljudtext: 'nyfiket spinn, sedan förtjust spinn', ansikte: 'nyfiken → jätteglad' },
  { id: '7', d: 1.8 + L(13) + 0.8, plats: 'Halvbild', malin: [[13, 1.8]], ljud: [VIND(0.0), ['apple-studs/apple-studs-3', 1.4, 1.0], FNISS(1.8 + L(13))],
    bild: 'En liten vindpust, ett äpple lossnar och landar mjukt på huvudet. Leoparden blundar och fnissar. **Leken (äpplet på huvudet)**', ljudtext: '`apple-studs`, fniss', ansikte: 'förvånad → fnissig (blundar)' },
  { id: '8', d: 0.5 + L(14) + 1.6, plats: 'Samma', malin: [[14, 0.5]], ljud: [['apple-studs/apple-studs-1', 0.5 + ORD(14, 'korgen'), 1.0], ['korg/korg-1', 0.5 + ORD(14, 'korgen'), 0.6], FNISS(0.7 + L(14))],   // äpplet far mot korgen innan Malin
    bild: 'Äpplet studsar från huvudet ner i korgen på *"korgen"*', ljudtext: '`korg`, `spinn-fniss`', ansikte: 'fnissig' },
  { id: '9', d: 0.3 + L(15) + 1.0, plats: 'Halvbild', malin: [[15, 0.3]], ljud: [SP('förtjust', 0.5 + L(15))],
    bild: 'Leoparden tittar upp i kronan och nickar. **Shorten börjar här**', ljudtext: 'förtjust spinn', ansikte: 'glad' },
  { id: '9b', d: STRACK()[1] + 1.2 + L(31) + 1.2, plats: 'Halvbild', malin: [[30, 1.2], [31, STRACK()[1] + 1.2]],
    ljud: [['landa-mjuk/landa-mjuk-2', STRACK()[0] + 0.55, 0.5], ['landa-mjuk/landa-mjuk-3', STRACK()[1] + 0.55, 0.5], SP('trumpen', STRACK()[1] + 1.4 + L(31))],
    bild: 'Leoparden sträcker armarna mot äpplena och gör ett litet hopp: når inte. Malin efter första hoppet. Ett hopp till, sedan sjunker öronen', ljudtext: 'små landningar, trumpet spinn', ansikte: 'glad → trumpen' },
  { id: '9c', d: 0.6 + L(32) + RITP + 3.0, plats: 'Halvbild → närbild där pallen ritas', malin: [[32, 0.3]], ljud: [['glitter/glitter-2', 0.1, 0.6]],
    bild: 'Kritan ritar igen: pallens kontur bredvid stammen (konturen i ett drag, sedan stegens två kanter), nära bild. Sedan halvbild medan kritan väntar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '9d', d: 0.5 + L(33) + 0.5, plats: 'Samma → halvbild', malin: [[33, 0.5]], ljud: [['glitter/glitter-1', 0.0, 0.9]],
    bild: 'Den riktiga pallen fylls i inifrån, kritan flyger iväg. Kawaii-ögon. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad → kawaii' },
  { id: '9e', d: 0.3 + L(34) + 1.0, plats: 'Halvbild', malin: [[34, 0.3]], ljud: [SP('förtjust', 0.5 + L(34))],
    bild: 'På *Tack, kritan!* nickar leoparden', ljudtext: 'förtjust spinn', ansikte: 'jätteglad' },
  { id: '9f', d: 0.8 + L(35) + 0.9, plats: 'Halvbild', malin: [[35, 0.8]], ljud: [['landa-mjuk/landa-mjuk-2', PALLHOPP()[0] + 0.55, 0.7], ['landa-mjuk/landa-mjuk-3', PALLHOPP()[1] + 0.55, 0.8], SP('förtjust', 0.8 + L(35) + 0.2)],
    bild: 'Två lugna skutt upp på pallen (lågt steg, högt steg); Malin börjar efter första skuttet', ljudtext: 'landningar, förtjust spinn', ansikte: 'glad' },
  { id: '10', d: 0.6 + L(16) + 1.4, plats: 'Halvbild', malin: [[16, 0.6]], ljud: vips(16, 0.6),
    bild: 'Leoparden sträcker på sig. På *"Vips"* lossnar ett äpple och glider i en mjuk båge, på *"i korgen!"* landar det i korgen', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'glad → fnissig' },
  { id: '11', d: 0.6 + L(17) + 1.4, plats: 'Samma', malin: [[17, 0.6]], ljud: vips(17, 0.6),
    bild: 'Samma, ett äpple till', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'fnissig' },
  { id: '12', d: 3.0 + L(18) + 1.8, plats: 'Halvbild', malin: [[18, 3.0]], ljud: [VIND(0.0), ['prassel-lov/prassel-lov-1', 3.0 + L(18) + 0.2, 0.4], ['apple-studs/apple-studs-2', 1.5, 1.0], ['rull/rull-1', 1.6, 0.7], SP('nyfiken', 3.2 + L(18))],
    bild: 'En vindpust: det sista äpplet faller från kronan, landar till höger om stammen med en mjuk studs och rullar in bakom stammen (en röd kant syns kvar). Leoparden tittar åt andra hållet, på korgen. Sedan tittar leoparden åt vänster och åt höger (ögonen och ansiktet)', ljudtext: '`vind-hatt`, `apple-studs`, `rull`, frågande spinn', ansikte: 'glad → nyfiken' },
  { id: '13', d: 0.3 + L(19) + 6.0, plats: 'Närbild stammen (klipp)', malin: [[19, 0.3]],
    bild: 'En röd kant sticker fram bakom stammen, nere i gräset. Paus 5 s; efter ca 3 s skimrar den svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '14', d: L(20) + 1.4, plats: 'Samma', malin: [[20, 0.0]], ljud: [['tindra/tindra-3', 0.2, 0.9], SP('förtjust', 0.3 + L(20))],
    bild: 'Äpplet skimrar tydligt', ljudtext: 'förtjust spinn, `tindra`', ansikte: 'jätteglad' },
  { id: '15', d: 0.3 + L(21) + 1.4, plats: 'Halvbild', malin: [[21, 0.3]], ljud: vips(21, 0.3),
    bild: 'Äpplet glider fram bakom stammen på *"Vips"* och landar i korgen på *"korgen"*', ljudtext: '`swoosh`, `apple-studs`, fniss', ansikte: 'jätteglad' },
  { id: '16', d: 0.8 + L(22) + 1.5, plats: 'Halvbild', malin: [[22, 0.8]], ljud: [['tindra/tindra-4', 0.3, 0.8], SP('förtjust', 1.0 + L(22))],
    bild: 'Korgen full av äpplen, den skimrar. Leoparden stolt', ljudtext: '`tindra`, förtjust spinn', ansikte: 'stolt' },
  { id: '17', d: 1.1 + L(23) + 1.6, plats: 'Helbild', malin: [[23, 1.1]], ljud: [['prassel-lov/prassel-lov-1', 0.9, 0.8], ['prassel-lov/prassel-lov-1', 2.2, 0.8], FNISS(1.1 + L(23) + 0.4)],   // första skuttet först
    bild: 'Leoparden skuttar från pallen ner till höger om trädet och sedan upp bakom kronan (två lugna skutt) och försvinner', ljudtext: '`prassel-lov`, `spinn-fniss`', ansikte: 'jätteglad' },
  { id: '18', d: 0.3 + L(24) + 5.0, plats: 'Närbild kronan', malin: [[24, 0.3]], ljud: [['prassel-buske/prassel-buske-1', 0.2, 0.9], ['prassel-buske/prassel-buske-1', 0.3 + L(24) + 1.5, 0.6]],
    bild: 'Kronan prasslar och gungar lite. Svansen sticker ut vid kronans högra kant och viftar. Paus 4 s: barnet letar', ljudtext: '`prassel-buske`, tyst', ansikte: '–' },
  { id: '19', d: 0.5 + L(25) + 1.6, plats: 'Samma', malin: [[25, 0.5]], ljud: [FNISS(0.5 + L(25) + 0.2)],   // huvudet är ute på "Tittut"
    bild: 'På *"Tittut!"* kommer huvudet och öronen fram vid kronans vänstra kant. **Leken (tittut i trädet)**', ljudtext: 'långt fniss', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(26) + 2.3 + L(27) + 1.6, plats: 'Samma', malin: [[26, 0.3], [27, 0.3 + L(26) + 2.3]],
    ljud: [['prassel-buske/prassel-buske-1', 0.3 + L(26) + 0.3, 0.9], FNISS(0.3 + L(26) + 2.3 + L(27))],
    bild: 'Huvudet gömmer sig, kronan prasslar, svansen viftar till vid högra kanten. På *"Tittut!"* kommer huvudet fram där. **Shorten slutar här**', ljudtext: '`prassel-buske`, `spinn-fniss`', ansikte: 'jätteglad' },
  { id: '21', d: 2.3 + L(28) + 1.5, plats: 'Helbild', malin: [[28, 2.3]], ljud: [['prassel-lov/prassel-lov-1', 0.2, 0.7], ['landa-mjuk/landa-mjuk-5', 1.55, 1.2], SP('hej då', 2.5 + L(28))],
    bild: 'Leoparden skuttar ner bakom kronan till höger om trädet, sedan upp på pallen och vinkar (armen bakom kroppen). **Hej då med vinkning**', ljudtext: 'hej då-spinn (svenskt "hej då", spinn-gullig-8c)', ansikte: 'jätteglad' },
  { id: '22', d: 0.3 + L(29) + 1.6, plats: 'Samma', malin: [[29, 0.3]],
    bild: 'Leoparden vinkar klart, armen sjunker', ljudtext: '–', ansikte: 'glad' },
  { id: '23', d: 2.5, plats: 'Äppelträdet → kritirisen', bild: 'Kritirisen drar ihop sig runt leoparden och korgen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 1.2;   // extra luft på varje rad med en replik: 0,7 (020) → 1,2 s (Sanna 2026-11-12: längre klipp, 0,3–0,5 s kvar efter varje handling)
for (const r of RADER) if (r.malin && !['01a', '01b', '5b', '9d'].includes(r.id)) r.d += GLES;
// fniss högst fyra gånger per film och aldrig två rader i rad (Sanna 2026-11-11: zebran skrattade alldeles för mycket).
// De andra fnissen blir ett förtjust spinn (litet glatt hopp), eller den känsla som står här; null = inget ljud (raden har redan ett spinn).
export const FNISS_RADER = ['8', '11', '15', '19'];
const FNISS_ERSATT = { '7': 'pratar', '20': 'pratar' };
for (const r of RADER) if (r.ljud && !FNISS_RADER.includes(r.id)) r.ljud = r.ljud.flatMap(l => !/spinn-fniss/.test(l[0]) ? [l]
  : FNISS_ERSATT[r.id] === null ? [] : [SP(FNISS_ERSATT[r.id] || 'förtjust', l[1])]);

// Närbild på det Malin nämner (Sanna 2026-11-12: "cuts, close crops on thing on mention"): på ordet klipper bilden till en närbild
// av saken, håller den h s och klipper sedan tillbaka till leoparden. Raden blir längre så att reaktionen hinns med.
// NARBILD[id] = [replikens nr, ordet, h]; NAR(id) = [start, slut] i raden. Kameran står i scenen (NARKAM).
export const NARBILD = { '2': [5, 'äpplen', 2.0], '5b': [10, 'korg', 1.8], '8': [14, 'korgen', 1.5], '9d': [33, 'pall', 1.8], '10': [16, 'korgen', 1.4], '11': [17, 'korgen', 1.4], '15': [21, 'korgen', 1.4], '16': [22, 'korgen', 2.0], '21': [28, 'korgen', 1.6] };
for (const r of RADER) if (NARBILD[r.id]) r.d += NARBILD[r.id][2] - 0.3 + (['5b', '9d', '18e'].includes(r.id) ? 0.5 : 0);   // + långsammare ifyllning
export const NAR = id => { const r = RADER.find(x => x.id === id), [n, ord, h] = NARBILD[id], m = r.malin.find(x => x[0] === n)[1], a = m + ORD(n, ord) - 0.15; return [a, a + h]; };
// rad 16: jubelhoppet (och dess spinn) kommer efter närbilden på korgen/sandkakorna
export const J16 = Math.max(1.0 + L(22), NAR('16')[1] + 0.2);
{ const r = RADER.find(x => x.id === '16'); r.ljud = r.ljud.map(l => l[0] === 'spinn förtjust' ? [l[0], J16 - 0.1] : l); }
