// Storyboardens rader för 028 Leoparden bygger i sanden: en rad per uppslag i ../manus.md (01, 5 och 17 delade i två–tre bilder,
// för att bilden byts mitt i uppslaget). Förlaga: 023. Läses av bygg.mjs (stillbilder ur kodscenen, storyboard.md, animatiken) och
// av kodscenen ../scener/stranden/index.html (tiderna och ljuden).
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden, vol]]. SP(känsla, o) = leopardens spinn-gullig (finns den inte än: spinn-fniss som stand-in, se SPINN).
//
// Malins repliker: filnamn och text ur ../rost.txt. UPPSKATTAD = true: längderna är gissade (0,35 s + 0,072 s per tecken) tills
// tagningen finns i assets/ljud/roster/leoparden-bygger-i-sanden/; mät då om (ffprobe) och sätt ORD (silencedetect).
export const UPPSKATTAD = true;
export const SPINN = true;    // true när assets/ljud/effekter/spinn-gullig/spinn-gullig-1…8.m4a finns
const g = t => +(0.35 + 0.072 * t.length).toFixed(2);
export const ROST = [
  ['01-kritan-ritar', 'Kritan ritar …'],
  ['02-vad-blir-det', 'Hm … vad blir det nu?'],
  ['03-leopard', 'Oj! En leopard!'],
  ['04-hej-leoparden-hej', 'Hej, leoparden! Hej, hej!'],
  ['05-bygga-i-sanden', 'Ska du bygga i sanden?'],
  ['06-sanden-rasar', 'Oj då. Sanden rasar!'],
  ['07-sanden-vill-visst', 'Sanden vill visst inte stå.'],
  ['08-vad-gor', 'Hm … vad gör vi nu?'],
  ['09-titta-kritan-ritar', 'Titta! Kritan ritar något.'],
  ['10-hink-varsagod-leoparden', 'En hink! Varsågod, leoparden.'],
  ['11-saga-tack', 'Ska vi säga tack?'],
  ['12-tack', 'Tack!'],
  ['13-hinken-pa-huvudet', 'Oj! Hinken på huvudet!'],
  ['14-en-hinkhatt', 'Ha ha! En hinkhatt!'],
  ['15-bygga-nu', 'Ska vi bygga nu?'],
  ['16-forst-en-sandkaka', 'Först en sandkaka. Klapp, klapp … sandkaka!'],
  ['17-och-en-till', 'Och en till. Klapp, klapp … sandkaka!'],
  ['18-spaden-leoparden-vet', 'Oj, spaden då? Leoparden vet inte var.'],
  ['19-hjalpa-leoparden-se', 'Kan du hjälpa leoparden? Kan du se var spaden är?'],
  ['20-dar-bakom-hinken', 'Ja, där! Ja, bakom hinken!'],
  ['21-klapp-sandkaka', 'Klapp, klapp … sandkaka!'],
  ['22-tre-sandkakor', 'Oj! Tre sandkakor!'],
  ['23-sma-vagor-hopp', 'Titta, små vågor! Hopp!'],
  ['24-kan-du-hoppa', 'Kan du också hoppa?'],
  ['25-hopp', 'Hopp!'],
  ['26-hej-da-leoparden-hinken', 'Hej då, leoparden! Hej då, hinken!'],
  ['27-hej-ses-snart', 'Hej då! Vi ses snart!'],
].map(([f, t]) => [f, g(t), t]);
export const L = n => ROST[n - 1][1];
// var ett ord börjar i en replik (s). Uppmätt (silencedetect) står i MATT; annars gissat ur var ordet står i texten.
const MATT = {};
export const ORD = (n, ord, nr = 0) => { const k = `${n} ${ord} ${nr}`; if (k in MATT) return MATT[k];
  const t = ROST[n - 1][2].toLowerCase(); let i = -1; for (let j = 0; j <= nr; j++) i = t.indexOf(ord, i + 1);
  return +(0.15 + (L(n) - 0.3) * i / t.length).toFixed(2); };

// spinn-gullig, 8 känslor i receptets ordning
export const KANSLA = { hej: 1, 'förtjust': 2, fniss: 3, 'mysig suck': 4, nyfiken: 5, trumpen: 6, pratar: 7, 'hej då': 8 };
const SP = (k, o) => ['spinn ' + k, o];
const FNISS = o => ['spinn-fniss/spinn-fniss-6', o, 1.4];   // det långa fnisset finns

// "klapp, klapp … sandkaka!" i replik n: [klapp 1, klapp 2, sandkaka]
export const KLAPP = n => [ORD(n, 'klapp', 0), ORD(n, 'klapp', 1), ORD(n, 'sandkaka', n === 21 ? 0 : 1)];
export const FYLL = 2.6;   // spaden fyller hinken två gånger och hinken tippar (före första klappen)

const kaka = (n, fore) => { const [a, b, c] = KLAPP(n).map(x => x + fore);
  return [['sand/sand-1', 0.35, 1.0], ['sand/sand-3', 1.05, 1.0], ['swoosh/swoosh-2', 1.75, 0.6], ['landa-mjuk/landa-mjuk-2', 2.35, 1.2],
    ['klapp/klapp-1', a, 1.4], ['klapp/klapp-1', b, 1.4], ['plupp/plupp-2', c + 0.05, 1.0], FNISS(c + 0.7)]; };
const fore = n => Math.max(0.3, FYLL + 0.2 - KLAPP(n)[0]);   // Malin börjar så att första "klapp" kommer efter att hinken landat

export const RADER = [
  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]],
    bild: 'Rent papper (efter bilderbok-introt). Kritan kommer in och ritar leopardens kontur i lugna drag, halvvägs här', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, fläckarna sist), kritan väntar bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga leoparden fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 2.6 + L(4) + 1.5, plats: 'Stranden, helbild', malin: [[4, 2.4]], ljud: [SP('hej', 2.6 + L(4))],
    bild: 'Leoparden trippar in från vänster (riggens gång) till sandvallen, stannar och vinkar. **Hej med vinkning**', ljudtext: 'små steg, glatt spinn', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(5) + 1.8, plats: 'Stranden, halvbild', malin: [[5, 0.6]], ljud: [['sand/sand-2', 0.3, 0.5], SP('förtjust', 0.8 + L(5))],
    bild: 'Leoparden sätter sig bakom sandvallen (bara överkroppen syns). Spaden står i sanden bredvid. Öronen vippar', ljudtext: 'förtjust spinn', ansikte: 'glad' },
  { id: '3', d: 2.0 + L(6) + 1.4, plats: 'Närbild, sanden', malin: [[6, 1.8]], ljud: [['sand/sand-1', 0.4, 1.0], ['sand/sand-2', 1.1, 1.0], ['sand/sand-4', 1.9 + ORD(6, 'rasar'), 0.8], SP('nyfiken', 2.2 + L(6))],
    bild: 'Spaden glider och lägger sand i en hög (två gånger). På *"rasar"* sjunker högen mjukt ihop och blir platt', ljudtext: '`sand`, frågande spinn', ansikte: 'nyfiken' },
  { id: '4', d: 0.3 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild, leoparden', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [SP('trumpen', 0.5 + L(7)), SP('trumpen', 1.5 + L(7) + L(8))],
    bild: 'Leoparden tittar ner på den platta sanden, öronen faller (riktningspose åt vänster). Paus 1 s mellan replikerna', ljudtext: 'trumpet spinn', ansikte: 'trumpen' },
  { id: '5a', d: 0.6 + L(9) + 4.0 + 3.0, plats: 'Stranden → närbild där hinken ritas', malin: [[9, 0.3]], ljud: [['glitter/glitter-2', 0.1, 0.6]],
    bild: 'Kritan kommer in och ritar hinkens kontur i sanden (4 s, nära bild), väntar sedan bredvid och vajar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', d: 0.2 + L(10) + 1.2, plats: 'Samma → halvbild', malin: [[10, 0.2]], ljud: [['glitter/glitter-1', 0.0, 0.9]],
    bild: 'Den riktiga gula hinken fylls i inifrån, kritan flyger iväg. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.3 + L(11) + 4.0 + L(12) + 1.6, plats: 'Stranden, halvbild', malin: [[11, 0.3], [12, 0.3 + L(11) + 4.0]],
    ljud: [SP('nyfiken', 0.6 + L(11)), SP('förtjust', 0.5 + L(11) + 4.0 + L(12))],
    bild: 'Leoparden tittar på hinken, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar leoparden', ljudtext: 'nyfiket spinn, sedan förtjust spinn', ansikte: 'nyfiken → jätteglad' },
  { id: '7', d: 1.0 + L(13) + 1.4, plats: 'Stranden, halvbild', malin: [[13, 1.0]], ljud: [['swoosh/swoosh-1', 0.15, 0.7], ['landa-mjuk/landa-mjuk-1', 1.15, 1.2], FNISS(1.2 + L(13))],
    bild: 'Hinken glider upp i en mjuk båge och landar upp och ner på huvudet, öronen sticker ut under kanten. **Leken (hinkhatten)**', ljudtext: '`swoosh`, fniss', ansikte: 'förvånad → fnissig' },
  { id: '8', d: 1.0 + L(14) + 1.6, plats: 'Samma', malin: [[14, 1.0]], ljud: [['swoosh/swoosh-3', 0.1, 0.5], ['hink-dunk/hink-dunk-1', 0.85, 0.9], FNISS(1.2 + L(14))],
    bild: 'Hinken glider ner i sanden igen och står rätt', ljudtext: '`hink-dunk`, långt fniss', ansikte: 'fnissig' },
  { id: '9', d: 0.3 + L(15) + 1.5, plats: 'Samma', malin: [[15, 0.3]], ljud: [SP('förtjust', 0.5 + L(15))],
    bild: 'Leoparden och hinken. **Shorten börjar här**', ljudtext: 'förtjust spinn', ansikte: 'glad' },
  { id: '10', d: fore(16) + L(16) + 1.6, plats: 'Närbild, bygget', malin: [[16, fore(16)]], ljud: kaka(16, fore(16)),
    bild: 'Spaden fyller hinken två gånger, hinken tippar i en lugn båge och landar upp och ner. Två klapp (riggens klapp), hinken guppar på varje. På *"sandkaka!"* lyfts hinken och sandkakan står kvar', ljudtext: '`sand`, `klapp` ×2, `plupp`, fniss', ansikte: 'glad → fnissig' },
  { id: '11', d: fore(17) + L(17) + 1.6, plats: 'Samma', malin: [[17, fore(17)]], ljud: kaka(17, fore(17)),
    bild: 'Samma, sandkaka nummer två bredvid. Efteråt glider hinken tillbaka och spaden blir kvar bakom den', ljudtext: '`sand`, `klapp` ×2, `plupp`, fniss', ansikte: 'fnissig' },
  { id: '12', d: 0.3 + L(18) + 1.8, plats: 'Stranden, halvbild', malin: [[18, 0.3]], ljud: [SP('nyfiken', 0.5 + L(18))],
    bild: 'Leoparden tittar åt vänster, sedan åt höger (ögonen och ansiktet). Spaden är borta', ljudtext: 'frågande spinn', ansikte: 'nyfiken' },
  { id: '13', d: 0.3 + L(19) + 5.0, plats: 'Närbild hinken (klipp)', malin: [[19, 0.3]],
    bild: 'Spadens gula skaft sticker upp bakom hinken. Paus 5 s; efter ca 3 s skimrar skaftet svagt', ljudtext: 'tyst', ansikte: '–' },
  { id: '14', d: L(20) + 1.6, plats: 'Samma → halvbild', malin: [[20, 0.0]], ljud: [['tindra/tindra-1', 0.2, 0.9], SP('förtjust', 0.3 + L(20))],
    bild: 'Skaftet skimrar tydligt och spaden glider fram på *"där"*', ljudtext: 'förtjust spinn, `tindra`', ansikte: 'jätteglad' },
  { id: '15', d: fore(21) + L(21) + 1.6, plats: 'Närbild, bygget', malin: [[21, fore(21)]], ljud: kaka(21, fore(21)),
    bild: 'Spaden fyller, hinken tippar, två klapp, hinken lyfts: sandkaka nummer tre', ljudtext: '`sand`, `klapp` ×2, `plupp`, fniss', ansikte: 'fnissig' },
  { id: '16', d: 0.3 + L(22) + 1.5, plats: 'Stranden, halvbild', malin: [[22, 0.3]], ljud: [['tindra/tindra-2', 0.3, 0.8], SP('förtjust', 0.5 + L(22))],
    bild: 'Tre sandkakor i rad, de skimrar till en i taget. Leoparden stolt', ljudtext: '`tindra`, förtjust spinn', ansikte: 'stolt' },
  { id: '17a', d: 3.4, plats: 'Stranden, helbild',
    bild: 'Leoparden reser sig och trippar ner till strandkanten (riggens gång åt höger)', ljudtext: 'små steg', ansikte: 'glad' },
  { id: '17b', d: 0.5 + L(23) + 1.8, plats: 'Strandkanten, halvbild', malin: [[23, 0.5]],
    ljud: [['vagor/vagor-2', 0.0, 0.7], ['landa-mjuk/landa-mjuk-3', 0.5 + ORD(23, 'hopp') + 0.55, 1.2], FNISS(0.5 + L(23) + 0.2)],
    bild: 'En liten våg glider upp på sanden. På *"Hopp!"* ett lugnt skutt, och vågen glider tillbaka under leoparden. **Leken (hoppa över vågorna)**', ljudtext: '`vagor`, `landa-mjuk`, fniss', ansikte: 'jätteglad' },
  { id: '18', d: 0.3 + L(24) + 4.0 + L(25) + 1.8, plats: 'Samma', malin: [[24, 0.3], [25, 0.3 + L(24) + 4.0]],
    ljud: [['vagor/vagor-4', 0.3 + L(24) + 1.6, 0.7], ['landa-mjuk/landa-mjuk-4', 0.3 + L(24) + 4.0 + ORD(25, 'hopp') + 0.55, 1.2], FNISS(0.3 + L(24) + 4.0 + L(25) + 0.2)],
    bild: 'En våg till. Paus 4 s: barnet hoppar. På *"Hopp!"* hoppar leoparden. **Shorten slutar här**', ljudtext: '`vagor`, `landa-mjuk`, långt fniss', ansikte: 'jätteglad' },
  { id: '19', d: 0.3 + L(26) + 1.5, plats: 'Strandkanten, halvbild', malin: [[26, 0.3]], ljud: [SP('hej då', 0.5 + L(26))],
    bild: 'Leoparden vinkar (armen bakom kroppen, snett ut förbi kanten), sandkakorna och hinken bredvid. **Hej då med vinkning**', ljudtext: 'hej då-spinn', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(27) + 1.6, plats: 'Samma', malin: [[27, 0.3]], ljud: [FNISS(0.5 + L(27))],
    bild: 'Leoparden vinkar klart, armen sjunker', ljudtext: 'fniss', ansikte: 'glad' },
  { id: '21', d: 2.5, plats: 'Stranden → kritirisen', bild: 'Kritirisen drar ihop sig runt leoparden', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.7;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5)
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
