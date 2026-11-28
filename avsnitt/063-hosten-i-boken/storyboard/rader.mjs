// Storyboardens rader för 063 Hösten i boken: en stillbild per uppslag i manus.md (förlaga: 062 rader.mjs).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna i three.js-boken (scen.html + scen.js), skriver tabellen i
// storyboard.md, index.html och animatiken.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ (utan .m4a), s in, volym?]].
// s = bildens läge i boken (scen.js läser det).
//
// Malins repliker, uppmätta (ffprobe, filernas längd ur dela-tagning.py). Tagning 1 + omtagningen av 07, 08, 11, 28, 30 (grind 3 godkänd 2026-11-27).
export const UPPSKATTAD = false;
export const ROST = [
  ['01-titta-en-bok', 1.78, 'Titta! En bok.'],
  ['02-host-i-boken', 2.27, 'Oj! Det är höst i boken!'],
  ['03-titta-tradet', 1.48, 'Titta, trädet.'],   // feedback 27/11: eken är grön från början, "Men var är löven?" klippt bort (originalet 03-var-ar-loven ligger kvar)
  ['04-kritan-ritar', 1.44, 'Kritan ritar …'],
  ['05-vad-blir-det', 0.86, 'Vad blir det nu?'],
  ['06-oj-ett-lov', 1.65, 'Oj! Ett löv!'],
  ['07-sa-manga-lov', 1.84, 'Så många löv.'],
  ['08-roda-och-gula', 2.68, 'På hösten blir löven röda och gula.'],
  ['09-faller-ner', 3.75, 'Och sedan faller de ner … sakta, sakta.'],
  ['10-hej-raven', 2.03, 'Hej, räven! Hej, hej!'],
  ['11-nu-ar-det-host', 1.79, 'Räven, nu är det höst.'],
  ['12-nu-blaser-det', 1.93, 'Oj! Nu blåser det!'],
  ['13-brr-fryser', 2.39, 'Brr. Räven fryser.'],
  ['14-vad-gor-vi-nu', 1.98, 'Hm … vad gör vi nu?'],
  ['15-kritan-ritar-varmt', 2.87, 'Titta, kritan ritar något varmt …'],
  ['16-vad-blir-det-2', 0.77, 'Vad blir det?'],
  ['17-en-halsduk-varsagod', 3.19, 'En halsduk! Varsågod, räven.'],
  ['18-tack-kritan', 1.14, 'Tack, kritan!'],
  ['19-tar-pa-halsduken', 3.05, 'Räven tar på sig halsduken. Så där.'],
  ['20-mjuk-och-varm', 2.01, 'Är halsduken mjuk och varm?'],
  ['21-kall-och-varm', 4.37, 'Mmm. Vinden är kall, men halsduken är varm.'],
  ['22-en-lovhog', 2.51, 'Titta, en stor lövhög.'],
  ['23-hoppa-i-loven', 1.50, 'Ska du hoppa i löven?'],
  ['24-bra-ide', 1.52, 'Ja, bra idé!'],
  ['25-hopp', 0.67, 'Hopp!'],
  ['26-en-gang-till', 2.33, 'En gång till … hopp!'],
  ['27-lov-pa-huvudet', 2.57, 'Ha ha, löv på huvudet.'],
  ['28-vad-mer-finns', 1.48, 'Vad mer finns på hösten?'],
  ['29-ser-du-lov', 1.89, 'Ser du några löv på marken?'],
  ['30-ett-rott-lov', 1.04, 'Ett rött löv.'],
  ['31-ett-gult-lov', 1.26, 'Ett gult löv.'],
  ['32-ett-brunt-lov', 1.33, 'Och ett brunt löv.'],
  ['33-ser-du-ekollonen', 1.40, 'Och ser du ekollonen?'],
  ['34-vi-raknar-snabb', 5.47, 'Där är ekollonen. Vi räknar. Ett … två … tre.'],
  ['35-vad-fina-ekollon', 1.61, 'Vad fina ekollon.'],
  ['36-luktar-skog', 2.29, 'Mmm … de luktar skog.'],
  ['37-ekorren-samlar', 4.17, 'Ekorren tycker om ekollon. Den samlar dem till vintern.'],
  ['38-hej-ekorren', 4.49, 'Titta, där är den ju! Hej, ekorren! Hej, hej!'],
  ['39-vad-vaxer-dar', 3.15, 'Titta, vid stubben. Vad växer där?'],
  ['40-en-svamp', 4.16, 'En svamp! En röd svamp med vita prickar.'],
  ['41-giftig', 2.92, 'Den är giftig. Den ska man inte äta.'],
  ['42-titta-pa-den', 1.72, 'Men man kan titta på den.'],
  ['43-fin-hostdag', 2.03, 'Var det en fin höstdag, räven?'],
  ['44-hej-da-raven', 1.08, 'Hej då, räven!'],
  ['45-hej-da-ekorren', 1.25, 'Hej då, ekorren!'],
  ['46-hej-da-loven', 1.23, 'Hej då, löven!'],
  ['47-hej-da-lovhogen', 1.47, 'Hej då, lövhögen!'],
  ['48-hej-da-svampen', 1.46, 'Hej då, svampen!'],
  ['49-vi-ses-snart', 3.07, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];

// Rävens röst (grind 4): familjen rav-gullig 1–8 med b–d-varianter och rav-fniss, valen i manus.md (aldrig samma två gånger i rad)
const R = (v, o) => ['rav-gullig/rav-gullig-' + v, o];
const SVAR = 1.6;   // rävens svar i pausen mellan Malins fråga och hennes reaktion (som 062)
const GISS = 3.0;   // gisspausen och tittpausen (manus: alltid 3 s)

// Lägena. Varje rad ändrar bara det som är nytt, resten ärvs från raden före.
// ek: kal | host. lov: nej | kontur | ja (kritans löv på grenen). rav: nere | uppe; plats: mitt | hog (i lövhögen) | framfor-hog | ekollon.
// halsduk: nej | kontur | kort | pa. ekorre: nere | svans | uppe. svamp: nere | halv | uppe. falla: löv i luften. yra: lövyran ur högen.
const START = { vy: 'bord', parm: 0, kort: 0, ek: 'kal', lov: 'nej', rav: 'nere', plats: 'mitt', halsduk: 'nej', ekorre: 'nere', svamp: 'nere',
  kritan: false, falla: 0, vind: false, puff: false, yra: false, huvudlov: false, glimt: null };

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', s: { ...START, vy: 'logga' } },

  // --- Boken öppnas, trädet är kalt ---
  { id: '01a', d: 0.3 + L(1) + 0.3, plats: 'Skrivbordet, helbild', malin: [[1, 0.3]], ljud: [['skogsljud/skogsljud-1', 0, 0.25], ['glimt/glimt-1', 0.2]],
    bild: 'Den stängda bruna boken med det orange lövets siluett, kameran driver mot den', ljudtext: 'skogsljud lågt, glimt', s: { ...START } },
  { id: '01b', d: 0.5 + L(2) + 0.4, plats: 'Skrivbordet, kameran börjar glida in', malin: [[2, 0.5]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6]],
    bild: 'Pärmen slås upp med den svala höst-himlen, korten fälls upp. **Eken är grön (sommar).** Räven, ekorren och svampen ligger kvar nedfällda', ljudtext: 'prassel-tyg, pop mjukt', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '02', d: 0.4 + L(3) + 1.0, plats: 'Eken, halvbild', malin: [[3, 0.2]],
    bild: 'Kameran har glidit in mot den gröna eken och stannar. Molnen glider', ljudtext: '–', s: { vy: 'ek' } },
  { id: '03', d: 0.4 + L(4) + 0.6 + L(5) + GISS, plats: 'Ekens gren, närbild', malin: [[4, 0.4], [5, 0.4 + L(4) + 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar det orange lövets kontur på en gren, sedan skaftet och nerverna. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'gren', lov: 'kontur', kritan: true } },
  { id: '04', d: 0.5 + L(6) + 0.8, plats: 'Ekens gren, närbild', malin: [[6, 0.5]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Lövet fylls i inifrån och glimtar', ljudtext: 'glitter', s: { lov: 'ja', kritan: false } },
  { id: '05', d: 0.4 + L(7) + 0.3 + L(8) + 0.6, plats: 'Eken, kameran glider ut till halvbild', malin: [[7, 0.4], [8, 0.4 + L(7) + 0.3]], ljud: [['tindra/tindra-2', 0.4 + 0.9]],
    bild: 'På *"Så många löv"* växer kronan ut från det ritade lövet: eken fylls av orange, röda och gula löv', ljudtext: 'tindra mjukt på "löv"', s: { vy: 'ek', ek: 'host' } },
  { id: '06', d: 0.3 + L(9) + 0.8, plats: 'Eken, halvbild', malin: [[9, 0.3]], ljud: [['prassel-lov/prassel-lov-1', 0.4, 0.4]],
    bild: 'Ett löv lossnar ur kronan och singlar sakta ner till marken, sedan ett till', ljudtext: 'prassel-lov svagt', s: { falla: 2 } },

  // --- Hej, räven ---
  { id: '07', d: 0.7 + L(10) + 1.2, plats: 'Rävens plats, halvbild', malin: [[10, 0.7]], ljud: [['pop/pop-2', 0.2], R(1, 0.7 + L(10) + 0.2)],
    bild: 'Rävens kort fälls upp mitt fram med en liten efterstudsning. Räven vinkar, svansen viftar', ljudtext: 'pop, rav-gullig-1 (hej)', s: { vy: 'halv', rav: 'uppe', falla: 1 } },
  { id: '07b', d: 0.2 + L(11) + SVAR, plats: 'Rävens plats, halvbild', malin: [[11, 0.2]], ljud: [R('2', 0.2 + L(11) + 0.2)],
    bild: 'Räven tittar upp på ett fallande löv och följer det med blicken ner till marken. Pausen: förtjust', ljudtext: 'rav-gullig-2 (förtjust)', s: {} },

  // --- Det blåser, räven fryser ---
  { id: '08', d: 0.3 + L(12) + 1.0, plats: 'Uppslaget, bred', malin: [[12, 0.3]], ljud: [['vind-host/vind-host-1', 0.3, 0.4], ['prassel-lov/prassel-lov-1', 0.9, 0.5]],
    bild: 'På *"blåser"*: vita vindkrumelurer över bilden, fler löv i luften, molnen fortare. Rävens öron fladdrar bakåt, den blundar och lutar sig bakåt', ljudtext: 'vind-host, prassel-lov', s: { vy: 'bred', vind: true, falla: 5 } },
  { id: '09', d: 0.4 + L(13) + 1.4, plats: 'Räven, närbild', malin: [[13, 0.4]], ljud: [R('6', 0.4 + L(13) + 0.2)],
    bild: 'Räven darrar lätt, armarna in mot magen, svansen runt benen, en liten andningspuff vid nosen. Besvärad, inte ledsen', ljudtext: 'rav-gullig-6 (frusen)', s: { vy: 'nara', vind: false, falla: 1, puff: true } },
  { id: '09b', d: 0.3 + L(14) + 1.2, plats: 'Räven, närbild', malin: [[14, 0.3]], ljud: [R('5', 0.3 + L(14) + 0.2)],
    bild: 'Räven tittar på oss', ljudtext: 'rav-gullig-5 (nyfiken)', s: { puff: false } },
  { id: '10', d: 0.4 + L(15) + 0.6 + L(16) + GISS, plats: 'Gräset bredvid räven, nära', malin: [[15, 0.4], [16, 0.4 + L(15) + 0.6]], ljud: [['krita-ritar/krita-ritar-2', 0.2]],
    bild: 'Kritan ritar halsdukens kontur på gräset bredvid räven, sedan ränderna och tofsarna. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'halsduk', halsduk: 'kontur', kritan: true } },
  { id: '11', d: 0.6 + L(17) + 1.2, plats: 'Gräset bredvid räven, nära', malin: [[17, 0.6]], ljud: [['glitter/glitter-2', 0.1], ['pop/pop-3', 0.85], R('2b', 0.6 + L(17) + 0.2)],
    bild: 'Halsduken fylls i, grön och gul, kortet fälls upp. Räven ser den, stora glada ögon', ljudtext: 'glitter, pop, rav-gullig-2b', s: { halsduk: 'kort', kritan: false } },
  { id: '12', d: 0.3 + L(18) + 1.2, plats: 'Räven, närbild', malin: [[18, 0.3]], ljud: [R('7', 0.3 + L(18) + 0.2)],
    bild: 'Räven nickar', ljudtext: 'rav-gullig-7 (pratar)', s: { vy: 'nara' } },
  { id: '13', d: 0.6 + L(19) + 0.8, plats: 'Rävens plats, halvbild', malin: [[19, 0.6]], ljud: [['swoosh/swoosh-1', 0.1], ['prassel-tyg/prassel-tyg-1', 0.6 + 2.4, 0.5]],
    bild: 'Halsduken glider sakta i en båge till räven och lägger sig runt halsen. Darrandet slutar på *"Så där"*', ljudtext: 'swoosh mjukt, prassel-tyg', s: { vy: 'halv', halsduk: 'pa' } },
  { id: '13b', d: 0.2 + L(20) + SVAR + L(21) + 0.8, plats: 'Räven, närbild', malin: [[20, 0.2], [21, 0.2 + L(20) + SVAR]], ljud: [R('4', 0.2 + L(20) + 0.2), ['vind-host/vind-host-1', 0.2 + L(20) + SVAR + 0.8, 0.25]],
    bild: 'Räven trycker nosen ner i halsduken och blundar. Pausen: mysig suck. En svag vindkrumelur glider förbi, räven sitter kvar varm', ljudtext: 'rav-gullig-4 (mysig), vind svagt', s: { vy: 'nara' } },

  // --- Lövhögen ---
  { id: '15', d: 0.4 + L(22) + 0.8, plats: 'Lövhögen, halvbild', malin: [[22, 0.4]],
    bild: 'Räven vänder sig mot den stora lövhögen', ljudtext: '–', s: { vy: 'hog' } },
  { id: '15b', d: 0.2 + L(23) + SVAR + L(24) + 0.8, plats: 'Lövhögen, halvbild', malin: [[23, 0.2], [24, 0.2 + L(23) + SVAR]], ljud: [R('2c', 0.2 + L(23) + 0.2)],
    bild: 'Räven tittar på oss. Pausen: förtjust, nick', ljudtext: 'rav-gullig-2c', s: {} },
  { id: '16', d: 0.5 + L(25) + 1.2, plats: 'Lövhögen, halvbild', malin: [[25, 0.5]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.1], ['hostlov/lovhog.mp3', 0.5, 0.6]],
    bild: 'Räven hukar och hoppar lugnt in i lövhögen. På *"Hopp!"* sjunker den ner mellan högens två halvor, bara huvudet och öronen syns, löven yr upp', ljudtext: 'hopp-mjuk, hostlov', s: { plats: 'hog', yra: true } },
  { id: '16b', d: 0.6 + L(26) + 1.2, plats: 'Lövhögen, halvbild', malin: [[26, 0.6]], ljud: [['hopp-mjuk/hopp-mjuk-3', 0.6 + 0.55], ['hostlov/lovhog.mp3', 0.6 + 1.0, 0.6]],
    bild: 'En lugn paus, sedan upp ur högen och ner igen på *"hopp"*, löven yr', ljudtext: 'hopp-mjuk, hostlov', s: {} },
  { id: '17', d: 0.5 + L(27) + 1.2, plats: 'Räven vid högen, närbild', malin: [[27, 0.5]], ljud: [['rav-fniss/rav-fniss-1', 0.5 + L(27) + 0.2]],
    bild: 'Räven kliver ut ur högen med tre små löv på huvudet. Den tittar upp mot dem, skakar lugnt, ett faller av', ljudtext: 'rav-fniss', s: { vy: 'nara', plats: 'framfor-hog', yra: false, huvudlov: true } },

  // --- Löven och ekollonen ---
  { id: '18', d: 0.3 + L(28) + 1.2, plats: 'Räven, halvbild', malin: [[28, 0.3]], ljud: [R('5b', 0.3 + L(28) + 0.2)],
    bild: 'Räven tittar runt. Vid stubben syns svampens röda hatt lite över gräset', ljudtext: 'rav-gullig-5b', s: { vy: 'halv', svamp: 'halv' } },
  { id: '19', d: 0.3 + L(29) + GISS, plats: 'Hela uppslaget', malin: [[29, 0.3]],
    bild: 'Hela uppslaget. Barnet tittar (3 s): tre löv ligger på marken, ett vid eken, ett mitt fram, ett vid stubben', ljudtext: 'tyst', s: { vy: 'uppslag' } },
  { id: '19b', d: 0.4 + L(30) + 0.5 + L(31) + 0.5 + L(32) + 0.6 + 0.5, plats: 'Hela uppslaget', malin: [[30, 0.4], [31, 0.4 + L(30) + 0.5], [32, 0.4 + L(30) + 0.5 + L(31) + 0.5]],
    ljud: [['glimt/glimt-1', 0.4], ['glimt/glimt-2', 0.4 + L(30) + 0.5], ['glimt/glimt-1', 0.4 + L(30) + 0.5 + L(31) + 0.5 + 0.3]],
    bild: 'Varje löv studsar lugnt och glimtar på sitt färgord: det röda, det gula, det bruna', ljudtext: 'glimt per löv', s: { glimt: 'lov' } },
  { id: '20', d: 0.3 + L(33) + GISS, plats: 'Under eken, halvbild', malin: [[33, 0.3]],
    bild: 'Halvbild mot eken. Tre ekollon i gräset under den. Barnet tittar (3 s)', ljudtext: 'tyst', s: { vy: 'ekmark', glimt: null } },
  { id: '20b', d: 0.4 + L(34) + 0.6 + 0.5, plats: 'Ekollonen, närbild', malin: [[34, 0.4]], ljud: [['glimt/glimt-1', 0.4 + 3.15], ['glimt/glimt-2', 0.4 + 4.08], ['glimt/glimt-1', 0.4 + 5.0]],
    bild: 'Ekollonen glimtar ett i taget på *"Ett … två … tre"*', ljudtext: 'glimt per ekollon', s: { vy: 'ekollon', glimt: 'ekollon' } },
  { id: '21', d: 2.0 + L(35) + 1.0, plats: 'Under eken, halvbild', malin: [[35, 2.0]], ljud: [R('4b', 2.0 + L(35) + 0.2)],
    bild: 'Räven går långsamt till ekollonen (riktningsposen, speglas aldrig) och tittar på dem', ljudtext: 'rav-gullig-4b', s: { vy: 'ekmark', plats: 'ekollon', glimt: null } },
  { id: '21b', d: 0.4 + L(36) + 1.2, plats: 'Räven och ekollonen, närbild', malin: [[36, 0.4]], ljud: [['nos/nos-1', 0.2], R('4c', 0.4 + L(36) + 0.2)],
    bild: 'Räven luktar på ekollonen, nosen ner, blundar. Räven hel och ekollonen vid fötterna i bild', ljudtext: 'nos, mysig suck', s: { vy: 'nos' } },
  { id: '21c', d: 0.4 + L(37) + 0.8, plats: 'Ekens stam, halvbild', malin: [[37, 0.4]],
    bild: 'Halvbild mot ekollonen och stammen. Ekorrens svans syns lite bakom stammen', ljudtext: '–', s: { vy: 'stam', ekorre: 'svans' } },
  { id: '21d', d: 0.3 + L(38) + 1.0, plats: 'Ekens stam, halvbild', malin: [[38, 0.3]], ljud: [['pop/pop-1', 0.35], ['hopp-mjuk/hopp-mjuk-4', 0.3 + 0.8, 0.6], ['hopp-mjuk/hopp-mjuk-5', 0.3 + 1.3, 0.6], R('1b', 0.3 + 3.2)],
    bild: 'På *"Titta"* fälls ekorrens kort upp bredvid stammen, två små skutt fram till ekollonen, den tar ett och skuttar tillbaka. Räven vinkar på *"Hej, ekorren"*', ljudtext: 'pop, hopp-mjuk litet ×2, rav-gullig-1b', s: { ekorre: 'uppe' } },

  // --- Svampen ---
  { id: '22', d: 0.3 + L(39) + GISS, plats: 'Stubben, halvbild', malin: [[39, 0.3]], ljud: [['pop/pop-2', 0.3 + 0.5]],
    bild: 'Halvbild mot stubben. Svampens röda hatt syns lite över gräset. Barnet gissar (3 s)', ljudtext: 'tyst', s: { vy: 'stubbe' } },
  { id: '22b', d: 0.4 + L(40) + 0.8, plats: 'Stubben, halvbild', malin: [[40, 0.4]], ljud: [['glimt/glimt-2', 0.4 + 0.5]],
    bild: 'Svampens kort fälls upp helt på *"svamp"* och studsar lite. Räven går lugnt dit och tittar', ljudtext: 'pop på "svamp"', s: { svamp: 'uppe', plats: 'svamp' } },
  { id: '22c', d: 0.4 + L(41) + 0.4 + L(42) + 1.0, plats: 'Räven och svampen, halvbild', malin: [[41, 0.4], [42, 0.4 + L(41) + 0.4]], ljud: [R('7b', 0.4 + L(41) + 0.4 + L(42) + 0.2)],
    bild: 'Räven skakar lugnt på huvudet, sedan lutar den sig fram och tittar på svampen med stora ögon. Ingen rädd min', ljudtext: 'rav-gullig-7b', s: { vy: 'rav-svamp' } },

  // --- Hej då ---
  { id: '23', d: 0.2 + L(43) + SVAR, plats: 'Räven, närbild', malin: [[43, 0.2]], ljud: [R('2d', 0.2 + L(43) + 0.2)],
    bild: 'Räven tittar på oss. Pausen: förtjust, nick', ljudtext: 'rav-gullig-2d', s: { vy: 'nara' } },
  { id: '24', d: 0.5 + L(44) + 1.2, plats: 'Uppslaget, närmare halvbild', malin: [[44, 0.5]], ljud: [R('8', 0.5 + L(44) + 0.2)],
    bild: 'Räven vinkar lugnt (armen ut förbi kanten)', ljudtext: 'rav-gullig-8 (hej då)', s: { vy: 'hejda' } },
  { id: '24b', d: 0.3 + L(45) + 0.6, plats: 'Ekens stam, halvbild', malin: [[45, 0.3]], ljud: [['hopp-mjuk/hopp-mjuk-4', 0.4, 0.6], ['glimt/glimt-1', 0.5]],
    bild: 'Ekorren gör ett glatt skutt', ljudtext: 'hopp-mjuk, glimt', s: { vy: 'stam' } },
  { id: '24c', d: 0.3 + L(46) + 0.6, plats: 'Eken, halvbild', malin: [[46, 0.3]], ljud: [['glimt/glimt-2', 0.5]],
    bild: 'Löven i kronan och på marken glimtar', ljudtext: 'glimt', s: { vy: 'ek' } },
  { id: '24d', d: 0.3 + L(47) + 0.6, plats: 'Lövhögen, halvbild', malin: [[47, 0.3]], ljud: [['prassel-lov/prassel-lov-1', 0.3, 0.5]],
    bild: 'Lövhögen prasslar lite, ett par löv lyfter och lägger sig', ljudtext: 'prassel-lov', s: { vy: 'hog' } },
  { id: '24e', d: 0.3 + L(48) + 0.6, plats: 'Stubben, halvbild', malin: [[48, 0.3]], ljud: [['glimt/glimt-1', 0.5]],
    bild: 'Svampen studsar', ljudtext: 'glimt', s: { vy: 'stubbe' } },
  { id: '25', d: 0.3 + L(49) + 1.4, plats: 'Uppslaget, halvbild', malin: [[49, 0.3]], ljud: [R('8b', 0.3 + L(49) + 0.2)],
    bild: 'Räven vinkar klart', ljudtext: 'rav-gullig-8b', s: { vy: 'hejda' } },
  { id: '26', d: 3.6, plats: 'Skrivbordet, kameran glider ut', ljud: [['prassel-tyg/prassel-tyg-1', 0.3], ['landa-mjuk/landa-mjuk-1', 2.15]],
    bild: 'Kameran glider ut ur boken (1,5 s). Korten fälls ner framifrån, ekorren och räven sist, pärmen slås igen (1,5–2,2 s) och lövets siluett syns, kameran skjuter långsamt in mot den stängda boken', ljudtext: 'prassel-tyg, landa-mjuk', s: { vy: 'bord', parm: 0, kort: 0, rav: 'nere', ekorre: 'nere', svamp: 'nere', huvudlov: false } },
];
RADER.reduce((f, r) => (r.s = { ...f, ...r.s }), START);
// Lugnt tempo (manus: GLES 1,1 s, reaktionsslaget i slutet av varje rad; öppningen och slutet utan)
export const GLES = 1.1;
for (const r of RADER) if (!['00', '01a', '01b', '02', '26'].includes(r.id)) r.d += GLES;
