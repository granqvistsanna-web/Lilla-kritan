// Storyboardens rader för 055 Räven borstar tänderna: en stillbild per uppslag i manus.md (01 och 7 är delade i två–tre
// bilder, för att bilden byts mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna ur scen.html,
// skriver tabellen i storyboard.md, index.html och animatiken. Förlaga: 023 Björnen tvättar händerna.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Filer som inte finns än (rävens rav-gullig) står med och är tysta i animatiken.
//
// Malins repliker, uppmätta (ffprobe, −3 dBFS, tagning 1 2026-11-25, grind 3 godkänd). Filnamn och text ur ../rost.txt,
// längderna ur ../rost-langder.txt. Mät om dem om tagningen byts. Pauserna är manusets.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-kritan-ritar', 1.83, 'Kritan ritar …'],
  ['02-vad-blir-det', 2.09, 'Hm … vad blir det nu?'],
  ['03-en-tandborste', 2.18, 'Oj! En tandborste!'],
  ['04-hej-raven', 1.89, 'Hej, räven! Hej, hej!'],
  ['05-hur-mar-du', 1.06, 'Hur mår du i dag?'],
  ['06-vad-roligt', 1.85, 'Bra? Vad roligt!'],
  ['07-bla-bar', 3.27, 'Oj, oj, oj! Blåbär på tänderna!'],
  ['08-atit-blabar', 1.25, 'Har du ätit blåbär?'],
  ['09-vad-gott', 1.69, 'Mm, vad gott!'],
  ['10-ska-vi-borsta', 2.02, 'Ska du borsta tänderna med tandborsten?'],
  ['11-bra-ide', 1.36, 'Ja, bra idé!'],
  ['12-for-liten', 3.28, 'Oj! Tandborsten är för liten!'],
  ['13-sa-manga-tander', 3.44, 'Så liten … och så många tänder.'],
  ['14-gar-inte-bra', 2.14, 'Tandborsten når inte alla tänderna, va?'],
  ['15-nej-det-gor', 1.66, 'Nej, den är för liten.'],
  ['16-vad-gor-vi', 3.13, 'Hm … hur ska räven borsta alla tänderna?'],
  ['17-kritan-ritar-nagot', 2.66, 'Titta! Kritan ritar något.'],
  ['18-stor-tandborste', 3.76, 'En stor tandborste! Varsågod, räven.'],
  ['19-saga-tack', 1.15, 'Ska vi säga tack?'],
  ['20-tack', 0.80, 'Tack!'],
  ['21-lagom-nu', 2.06, 'Är den stora tandborsten lagom nu?'],
  ['22-ja-lagom', 1.96, 'Ja, den når alla tänderna!'],
  ['23-liten-och-stor', 2.86, 'En liten tandborste … och en stor.'],
  ['24-kittlar', 3.0, 'Ha ha! Tandborsten kittlar på nosen!'],
  ['25-behovs-tandkram', 2.14, 'Nu ska vi ha tandkräm på tandborsten.'],
  ['26-var-ar-tandkramen', 2.24, 'Oj! Var är tandkrämen?'],
  ['27-vet-inte-var', 1.56, 'Räven vet inte var.'],
  ['28-kan-du-hjalpa', 3.22, 'Kan du hjälpa räven? Ser du tandkrämen?'],
  ['29-ja-dar', 2.55, 'Ja, där! Bakom muggen!'],
  ['30-plutt', 3.38, 'Lite tandkräm på tandborsten … plutt!'],
  ['31-forst-uppe', 5.81, 'Först tänderna uppe. Borsta, borsta … ett, två, tre!'],
  ['32-och-nere', 5.78, 'Och tänderna nere. Borsta, borsta … ett, två, tre!'],
  ['33-langst-fram', 6.2, 'Och tänderna längst fram. Borsta, borsta … ett, två, tre!'],
  ['34-blanka-tander', 2.69, 'Titta! Blanka tänder!'],
  ['35-hur-kanns', 1.4, 'Hur känns tänderna nu?'],
  ['36-rena-tander', 3.03, 'Åh, så rena tänder!'],
  ['37-far-inte-plats', 3.92, 'Oj! Den stora tandborsten får inte plats i muggen!'],
  ['38-bredvid', 2.86, 'Där. Den stora ligger bredvid muggen.'],
  ['39-ga-och-leka', 1.34, 'Ska du gå och leka nu?'],
  ['40-vad-kul', 1.29, 'Ja, vad kul!'],
  ['41-hej-da-raven', 3.41, 'Hej då, räven! Hej då, stora tandborsten!'],
  ['42-vi-ses-snart', 1.90, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];
// var räkneorden börjar i replikerna (whisper ord för ord, ../manus.md grind 3): ett borstdrag per ord, blåbären borta på "tre".
// 32:s "två" var osäkert hos whisper (3,73); här mitt emellan. Mät om om tagningen byts.
export const RAKNA = { 31: [3.73, 4.47, 5.32], 32: [3.49, 4.32, 5.25], 33: [3.96, 4.77, 5.66] };   // "ett, två, tre" i tagningen 2026-11-25 (pauser + whisper)
export const PLUTT = 2.66;   // "plutt!" i 30-plutt: klicken växer där

// Rävens röst: rav-gullig (känsla 1 hej, 2 förtjust, 3 kort fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då;
// N, Nb, Nc, Nd = fyra tagningar; 1 och 8 säger "Hej!"/"Hej då!") och rav-fniss (långt, 1 = "hahaha"). Gjorda av
// ljudkarta-sessionen 2026-11-25, ännu ej lyssnade av Sanna. Tagningarna växlas så att samma ljud inte hörs två gånger i rad.
const RAV = (n, o) => ['rav-gullig/rav-gullig-' + n, o];
const RAVFNISS = o => ['rav-fniss/rav-fniss-1', o];
const SVAR = 1.6;            // rävens svar i pausen mellan Malins fråga och reaktion (samtalsrundan 2026-11-25)
const borsta = n => RAKNA[n].map((o, i) => ['borsta/borsta-' + (1 + (i + n) % 4), 0.5 + o - 0.15, 0.6]).concat([['skrubb/skrubb-' + (1 + n % 2), 0.4, 0.25], ['tindra/tindra-3', 0.5 + RAKNA[n][2]]]);

export const RADER = [
  { id: '00', d: 3.3, plats: 'Intro', bild: 'Det gemensamma introt *Djuren hittar på!* (produktion/youtube/bilderbok-intro/, ca 3,3 s). Platshållare i storyboarden', ljudtext: 'introts jingel och röst', ansikte: '–' },

  // --- Kritan ritar den lilla tandborsten (inte räven) ---
  { id: '01a', d: 3.4, plats: 'Papperet, helbild', malin: [[1, 0.5]], ljud: [['krita-ritar/krita-ritar-1', 0.2], ['skogsljud/skogsljud-1', 0.0]],
    bild: 'Kritan ritar en tandborstes kontur i ett lugnt drag (ca 2,8 s): skaftet, halsen, borstblocket', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: L(2) + 3.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar lugnt (ingen knackning): barnet gissar', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga turkosa tandborsten fylls i inifrån. Sista 0,8 s: zoom in i teckningen, in i badrummet', ljudtext: 'glitter', ansikte: '–' },

  // --- Hej och samtal ---
  { id: '1', d: 3.0 + L(4) + 1.4, plats: 'Badrummet, helbild', malin: [[4, 3.0]], ljud: [['smasteg/smasteg-1', 0.2], ['tass/tass-2', 2.2], RAV('1', 3.2 + L(4))],
    bild: 'Räven trippar in från vänster, kliver upp på pallen bakom handfatet och vinkar. På kanten: den lilla tandborsten i muggen och tandkrämen bredvid. **Hej med vinkning**', ljudtext: 'små steg, rav-gullig-1 (hej)', ansikte: 'jätteglad' },
  { id: '1b', d: 0.3 + L(5) + SVAR + L(6) + 0.8, plats: 'Badrummet, halvbild', malin: [[5, 0.3], [6, 0.3 + L(5) + SVAR]], ljud: [RAV('2', 0.6 + L(5))],
    bild: 'Räven tittar på oss, öronen vippar. Svarar i pausen, Malin reagerar', ljudtext: 'rav-gullig-2 i pausen', ansikte: 'glad' },
  { id: '2', d: 0.6 + L(7) + 1.8, plats: 'Närbild ansiktet', malin: [[7, 0.6]], ljud: [['slick/slick-1', 0.8 + L(7), 0.6], RAV('4', 1.4 + L(7))],
    bild: 'Räven ler stort med tänderna synliga: blå blåbärsfläckar på tänderna. Efter repliken slickar den sig om nosen', ljudtext: 'slick, rav-gullig-4 (belåtet)', ansikte: 'visar tänderna, blåbär' },
  { id: '2b', d: 0.3 + L(8) + SVAR + L(9) + 0.8, plats: 'Samma', malin: [[8, 0.3], [9, 0.3 + L(8) + SVAR]], ljud: [RAV('7', 0.6 + L(8))],
    bild: 'Räven nickar och "pratar" i pausen', ljudtext: 'rav-gullig-7 (pratar)', ansikte: 'glad' },
  { id: '3', d: 0.3 + L(10) + SVAR + L(11) + 0.8, plats: 'Badrummet, halvbild', malin: [[10, 0.3], [11, 0.3 + L(10) + SVAR]], ljud: [RAV('2b', 0.6 + L(10))],
    bild: 'Räven tittar på tandborsten i muggen, nickar', ljudtext: 'rav-gullig-2b', ansikte: 'glad, tittar på muggen' },

  // --- Problemet: tandborsten är för liten ---
  { id: '4', d: 1.2 + L(12) + 1.5, plats: 'Badrummet, halvbild', malin: [[12, 1.2]], ljud: [['swoosh/swoosh-2', 0.2, 0.8], RAV('5', 1.5 + L(12))],
    bild: 'Räven tar den lilla tandborsten ur muggen och håller upp den: pytteliten i tassen. Rörelsen först, sedan Malin', ljudtext: 'swoosh, rav-gullig-5 (frågande)', ansikte: 'förvånad' },
  { id: '5', d: 0.8 + L(13) + 1.1, plats: 'Närbild munnen', malin: [[13, 0.8]], ljud: [['borsta/borsta-1', 0.2, 0.5], RAV('5b', 1.0 + L(13))],
    bild: 'Den lilla borsten mot den långa raden tänder: den når bara två. Ett försiktigt drag, blåbären sitter kvar', ljudtext: 'litet borstljud, rav-gullig-5b', ansikte: 'gapar, förvånad' },
  { id: '5b', d: 0.3 + L(14) + SVAR + L(15) + 0.8, plats: 'Närbild ansiktet', malin: [[14, 0.3], [15, 0.3 + L(14) + SVAR]], ljud: [RAV('6', 0.6 + L(14))],
    bild: 'Räven tittar på oss, öronen sjunker lite, skakar lugnt på huvudet', ljudtext: 'rav-gullig-6 (trumpen, mjuk)', ansikte: 'lite ledsen' },
  { id: '6', d: 0.8 + L(16) + 1.2, plats: 'Badrummet, halvbild → närbild ansiktet', malin: [[16, 0.8]], ljud: [['glas-klirr/glas-klirr-1', 0.85, 0.35], RAV('7c', 1.0 + L(16))],
    bild: 'Räven lägger tillbaka den lilla borsten i muggen (bakom muggens framsida) och tittar på oss', ljudtext: 'tyst, blinkar', ansikte: 'nyfiken' },

  // --- Kritan ritar en stor tandborste ---
  { id: '7a', d: 0.3 + L(17) + 0.3 + 3.0 + 3.0, plats: 'Saken som ritas (nära)', malin: [[17, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.6 + L(17)]],
    bild: 'Kritan flyger in och ritar en stor tandborste i luften bredvid räven: skaftet, halsen, borstblocket (3 s). Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', ansikte: 'nyfiken, tittar dit' },
  { id: '7b', d: 0.6 + L(18) + 1.0, plats: 'Samma', malin: [[18, 0.6]], ljud: [['glitter/glitter-2', 0.0], RAV('3b', 0.9 + L(18))],
    bild: 'Den lila borsten fylls i inifrån och sjunker lugnt till rävens tass. *Varsågod*', ljudtext: 'glitter, rav-gullig-2c', ansikte: 'kawaii-ögon' },
  { id: '8', d: 0.2 + L(19) + 2.5 + L(20) + 0.9, plats: 'Badrummet, halvbild', malin: [[19, 0.2], [20, 0.2 + L(19) + 2.5]], ljud: [RAV('2d', 0.4 + L(19) + 2.5 + L(20))],
    bild: 'Räven med den stora borsten. Paus 2,5 s: barnet säger tack. Nickar direkt på *Tack!*', ljudtext: 'rav-gullig-2d (förtjust)', ansikte: 'nyfiken → jätteglad' },
  { id: '8b', d: 0.6 + L(21) + SVAR + L(22) + 0.8, plats: 'Närbild ansiktet', malin: [[21, 0.6], [22, 0.6 + L(21) + SVAR]], ljud: [RAV('7c', 0.9 + L(21))],
    bild: 'Räven håller den stora borsten framför nosen: den räcker över hela raden tänder', ljudtext: 'rav-gullig-2, nickar', ansikte: 'glad' },

  // --- Leken: liten och stor, borsten kittlar, tandkrämen rullar bort ---
  { id: '9', d: 0.6 + L(23) + 1.5, plats: 'Badrummet, halvbild → närbild ansiktet', malin: [[23, 0.6]], ljud: [RAV('4d', 0.9 + L(23))],
    bild: 'Den stora borsten bredvid muggen med den lilla', ljudtext: 'rav-gullig-7b (pratar)', ansikte: 'glad' },
  { id: '10', d: 3.0 + L(24) + 1.2, plats: 'Närbild ansiktet → halvbild → närbild', malin: [[24, 3.0]], ljud: [RAVFNISS(0.3), ['rull/rull-1', 1.6, 0.5], RAV('3c', 2.8)],
    bild: 'Borsten kittlar på nosen två gånger, räven blundar och fnissar. Skaftet stöter till tuben, som rullar bakom muggen: korken sticker fram. Fnisset först (blundar, öronen bakåt, svansen viftar lugnt), sedan Malin. **Shorten börjar här**', ljudtext: 'rav-fniss (långt), rull lågt', ansikte: 'fnissig, blundar' },
  { id: '11', d: 0.3 + L(25) + 1.0 + L(26) + 1.2, plats: 'Halvbild → närbild ansiktet (klipp)', malin: [[25, 0.3], [26, 0.3 + L(25) + 1.0]], ljud: [RAV('5c', 0.6 + L(25) + 1.0 + L(26))],
    bild: 'Räven tittar ner på kanten där tuben stod: tomt (halvbild). Klipp till närbild på reaktionen: förvånad min (stora ögon, liten rund mun, öronen rakt upp, svansen stilla)', ljudtext: 'rav-gullig-5c', ansikte: 'förvånad' },
  { id: '12', d: 0.6 + L(27) + 1.6, plats: 'Närbild ansiktet', malin: [[27, 0.6]], ljud: [RAV('5d', 0.9 + L(27))],
    bild: 'Räven tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte)', ljudtext: 'rav-gullig-5d (frågande)', ansikte: 'nyfiken' },
  { id: '13', d: 0.3 + L(28) + 3.9,   /* + GLES 0,7 + rad 14:s 0,4 = paus 5,0 s */ plats: 'Bred → närbild muggen (klipp)', malin: [[28, 0.3]], ljud: [['tindra/tindra-4', 0.3 + L(28) + 3.0, 0.4]],
    bild: 'Frågan i bred bild, efter 1,5 s klipp till närbild på muggen: korken sticker fram vid sidan. Efter 3 s skimrar den svagt. Paus 5 s', ljudtext: 'tyst, svagt skimmer efter 3 s', ansikte: 'nyfiken' },
  { id: '14', d: 0.4 + L(29) + 1.3, plats: 'Närbild muggen → halvbild', malin: [[29, 0.4]], ljud: [['glimt/glimt-1', 0.2], RAV('2b', 0.7 + L(29))],
    bild: 'Korken skimrar tydligt. Klipp ut: räven tar fram tuben (glider ut bakom muggen), ett litet glatt skutt. Reaktionen i närbild ansiktet 0,8 s (jätteglad, öronen upp, svansen viftar)', ljudtext: 'glimt, rav-gullig-2b', ansikte: 'jätteglad' },

  // --- Borsta: ett, två, tre ---
  { id: '15', d: 0.3 + L(30) + 0.8, plats: 'Närbild borsthuvudet', malin: [[30, 0.3]], ljud: [['plupp/plupp-1', 0.3 + PLUTT]],
    bild: 'Tätt på borsthuvudet (som 030:s K_KLAM): tuben lutar och kläms, en rand tandkräm (PASTA, som 031) växer på borsten på *"plutt!"*. Sedan läggs tuben ner i muggen', ljudtext: 'plupp på ordet', ansikte: '–' },
  { id: '16', d: 1.6, plats: 'Badrummet, halvbild', ljud: [RAV('4b', 0.4)],
    bild: 'Räven gapar med den stora borsten vid munnen (ingen säger åt den)', ljudtext: 'rav-gullig-4b (mysigt)', ansikte: 'gapar' },
  { id: '17', d: 0.5 + L(31) + 0.8, plats: 'Munnen uppe', malin: [[31, 0.5]], ljud: borsta(31),
    bild: 'Bara överraden och borsthuvudet. Ett drag per räkneord, blåbären borta på *"tre"*', ljudtext: 'borsta per drag, tindra på "tre"', ansikte: 'gapar, blundar glatt' },
  { id: '18', d: 0.5 + L(32) + 0.8, plats: 'Munnen nere', malin: [[32, 0.5]], ljud: borsta(32),
    bild: 'Underraden, samma', ljudtext: 'borsta, tindra', ansikte: 'gapar' },
  { id: '19', d: 0.5 + L(33) + 0.8, plats: 'Munnen längst fram', malin: [[33, 0.5]], ljud: borsta(33),
    bild: 'Framtänderna, de sista blåbären', ljudtext: 'borsta, tindra', ansikte: 'gapar' },
  { id: '20', d: 0.4 + L(34) + 1.2, plats: 'Närbild munnen → ansiktet', malin: [[34, 0.4]], ljud: [['tindra/tindra-4', 0.2], ['glimt/glimt-2', 0.5, 0.6], RAV('2c', 0.7 + L(34))],
    bild: 'Stort leende, glansen sveper över de vita tänderna. **Shorten slutar här**', ljudtext: 'tindra, rav-gullig-2c', ansikte: 'visar tänderna' },
  { id: '20b', d: 0.3 + L(35) + SVAR + L(36) + 0.8, plats: 'Samma', malin: [[35, 0.3], [36, 0.3 + L(35) + SVAR]], ljud: [RAV('4c', 0.6 + L(35))],
    bild: 'Räven blundar nöjt och slickar sig om nosen', ljudtext: 'rav-gullig-4c (mysig suck)', ansikte: 'blundar, ler' },

  // --- Den stora får inte plats, hej då ---
  { id: '21', d: 1.2 + L(37) + 1.6 + L(38) + 0.8, plats: 'Närbild muggen → ansiktet → halvbild', malin: [[37, 1.2], [38, 1.2 + L(37) + 1.6]], ljud: [['plupp/plupp-2', 0.5, 0.5], ['vick/vick-1', 0.6, 0.5], RAV('3', 1.4 + L(37))],
    bild: 'Räven sätter den stora borsten i muggen: den vilar på kanten och vickar. Sedan lägger räven den på kanten bredvid muggen. Vicket först, klipp till närbild ansiktet på det korta fnisset (blundar, öronen vippar), sedan Malin', ljudtext: 'plupp när den vickar, rav-gullig-3 (kort fniss)', ansikte: 'fnissig → glad' },
  { id: '21b', d: 0.3 + L(39) + SVAR + L(40) + 0.9, plats: 'Samma', malin: [[39, 0.3], [40, 0.3 + L(39) + SVAR]], ljud: [RAV('2d', 0.6 + L(39))],
    bild: 'Räven tittar åt vänster mot dörren och tillbaka, öronen upp, ett lugnt glatt skutt', ljudtext: 'rav-gullig-2d', ansikte: 'jätteglad' },
  { id: '22', d: 0.7 + L(41) + 1.6, plats: 'Samma', malin: [[41, 0.7]], ljud: [RAV('8', 1.0 + L(41))],
    bild: 'Räven vinkar (armen bakom kroppen, snett ut förbi kanten), borstarna på kanten. **Hej då med vinkning**', ljudtext: 'rav-gullig-8 (hej då)', ansikte: 'jätteglad' },
  { id: '23', d: 0.3 + L(42) + 1.4, plats: 'Samma', malin: [[42, 0.3]], ljud: [RAV('8b', 0.6 + L(42))],
    bild: 'Räven vinkar klart, armen sjunker', ljudtext: 'rav-gullig-8b', ansikte: 'glad' },
  { id: '24', d: 2.5, plats: 'Badrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt räven och den stora tandborsten, 0,6 s svart', ljudtext: '–', ansikte: 'glad' },
];

// Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in; frågor före. Fniss bara på rad 10 och 21.
export const GLES = 0.4;   // 0,7 s extra luft på varje rad med en replik (som 020 runda 5), utom ritintrot
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
