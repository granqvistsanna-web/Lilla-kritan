// Storyboardens rader för 021 Hunden leker: en stillbild per rad. bygg.mjs räknar starttiderna (summan av d), ritar
// stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/
// utan .m4a, sekunder in i raden]]; null som fil = ljudet saknas än (står i texten med ⚠, tystnad i animatiken).
//
// Längderna i ROST är uppmätta (ffprobe) på Malins tagning i assets/ljud/roster/hunden-leker/ (rost.txt, 2026-11-11).
// Byts en fil med samma namn: node avsnitt/021-hunden-leker/storyboard/mat-rost.mjs (raderna räknar sina tider ur L(n)).
export const ROST = [
  ['01-kritan-ritar', 1.70], ['02-vad-blir-det', 2.71], ['03-hund', 1.93], ['04-hej-hunden-hej', 2.03], ['05-hunden-har-visst', 3.15],
  ['06-vad-gor', 2.03], ['07-titta-kritan-ritar', 2.34], ['08-boll-varsagod-hunden', 2.88], ['09-saga-tack', 0.86], ['10-tack', 1.71],
  ['11-puffar-hunden-bollen', 2.88], ['12-ni-pratar-visst', 2.17], ['13-bollen-hoppade-ner', 2.94], ['14-bollen-rulla', 1.48], ['15-rulla-rulla-dar', 4.63],
  ['16-rulla-rulla-dar', 4.00], ['17-ar-bollen-borta', 4.21], ['18-hjalpa-hunden-se', 3.64], ['19-dar-bakom-rutschkanan', 3.15], ['20-rulla-rulla-dar', 2.61],
  ['21-ar-hunden-glad', 1.75], ['22-kittla-hunden-magen', 2.08], ['23-kittel-kittel-kittel', 1.22], ['24-leker-hunden-hopp', 4.39], ['25-hej-hunden-hej', 2.59],   // 22–23 används inte (kittla struket, Sanna 2026-11-11)
  ['26-hej-ses-snart', 3.00],
  // Stegen (Sanna 2026-11-11 "kritan can draw something else … ladder"); uppmätta (bildsessionen, rost-langder.txt). Ett tredje fält 'saknas' = tyst ståndin
  ['stege-1-pa-taket', 3.15], ['stege-2-hur-na', 2.81], ['stege-3-ritar-igen', 2.23], ['stege-4-en-stege', 3.09],
  ['stege-5-tack-kritan', 1.09], ['stege-6-kliv', 3.89], ['stege-7-ner-med-den', 2.40], ['stege-8-ner-igen', 1.95]];
export const UPPSKATTAD = false;   // uppmätta (rost-langder.txt, 2026-11-11)

// Replikerna som i manus.md (utan v3-taggar), för tabellen.
export const TEXT = ['Kritan ritar …', 'Hm … vad blir det nu?', 'Oj! En hund!', 'Hej, hunden! Hej, hej!',
  'Oj då. Hunden har visst inget att leka med.', 'Hm … vad gör vi nu?', 'Titta! Kritan ritar något.', 'En boll! Varsågod, hunden.',
  'Ska vi säga tack?', 'Tack!', 'Oj! Nu puffar hunden på bollen!', 'Ni pratar visst med varandra.', 'Oj! Bollen hoppade ner i hinken!',
  'Ska bollen rulla nu?', 'Rulla, rulla … där! Bakom stöveln.', 'Rulla, rulla … där! Bakom lekstugan.',
  'Oj, nu är bollen borta. Hunden vet inte var.', 'Kan du hjälpa hunden? Kan du se var bollen är?', 'Ja, där! Ja, bakom rutschkanan!',
  'Rulla, rulla … där!', 'Nu är hunden glad!', 'Kan du kittla hunden på magen?', 'Kittel, kittel, kittel!', 'Nu leker hunden! Hopp, hopp!',
  'Hej då, hunden! Hej då, bollen!', 'Hej då! Vi ses snart!',
  'Oj! Bollen hamnade på taket!', 'Hm … hur ska hunden nå den?', 'Titta! Kritan ritar igen.', 'En stege! Varsågod, hunden.',
  'Tack, kritan!', 'Kliv … kliv … kliv!', 'Där är bollen! Ner med den!', 'Och ner igen. Hopp!'];

export const L = n => ROST[n - 1][1];
// var "där!" börjar i "Rulla, rulla … där!" (silencedetect −35 dB på tagningen); bollen stannar och vov-ja hörs där
const DAR = { 15: 2.83, 16: 1.80, 20: 2.01 };
const HOPP = [3.14, 3.71], LEK = 6.0;
export const KLIV = [0.02, 1.47, 3.09];   // var orden börjar i "Kliv … kliv … kliv!" (uppmätt på ljudstyrkan, bildsessionen 2026-11-11)   // LEK: hunden leker själv innan Malin säger "Nu leker hunden" (Sanna 2026-11-11)   // "Hopp," och "hopp!" i replik 24 (whisper ord för ord): skutten landar på orden

export const RADER = [
  { id: '00', d: 1.0, plats: 'Intro', bild: 'Lilla Kritans logotyp i 1 s. Ingen jingel, inget titelkort (Sanna 2026-11-11)', ljudtext: '–', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 3.0]],   // "Kritan ritar" 0,5 s efter att den börjat rita (INN 2,5), Malin efter handlingen ljud: [['krita-ritar/krita-ritar-1', 0.3]],   // skogsljudet (60 s) läggs i scenen, inte i animatiken
    bild: 'Kritan ritar hundens kontur i lugna drag (ca 7 s totalt), halvvägs här', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]], ljud: [['krita-ritar/krita-ritar-2', 0.0]],
    bild: 'Konturen ritas klar, sedan väntar kritan bredvid och vickar lugnt (ingen knackning): barnet gissar', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga hunden fylls i inifrån. Sista 0,8 s: zoom in i teckningen (avsnittets enda zoom)', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 1.6 + L(4) + 1.6, plats: 'Lekplatsen, helbild', malin: [[4, 1.6]],
    ljud: [['smasteg/smasteg-1', 0.0], ['hopp-mjuk/hopp-mjuk-1', 2.45], ['vov-babbel/vov-babbel-1', 1.9 + L(4)], ['svansvift/svansvift-2', 2.3 + L(4)]],
    bild: 'Hunden trippar in från vänster, stannar mitt på gången, gör ett glatt skutt (öronen upp, svansen viftar) och vinkar (höger arm, bakom kroppen). Hinken står bredvid', ljudtext: 'små steg, `vov-babbel`, svansen viftar', ansikte: 'glad → jätteglad' },
  { id: '2', d: 3.8, plats: 'Lekplatsen, halvbild', ljud: [['vov-pip/vov-pip-1', 2.4]],
    bild: 'Hunden tittar åt vänster, sedan åt höger (ögonen och `rikt ±0,3`, huvudet vänds inte). Inget att leka med i närheten. Tyst 3 s', ljudtext: 'frågande `vov-pip`', ansikte: 'nyfiken' },
  { id: '3', d: 0.4 + L(5) + 1.0 + L(6) + 1.4, plats: 'Lekplatsen, närbild hunden', malin: [[5, 0.4], [6, 1.4 + L(5)]],
    ljud: [[null, 0.0, 'suck'], ['vov-pip/vov-pip-3', 1.7 + L(5) + L(6)]],
    bild: 'Öronen faller (12°), kroppen sjunker lite (`strack −0,04`). Paus 1 s mellan replikerna', ljudtext: '⚠ `suck` saknas, sedan `vov-pip`', ansikte: 'lite ledsen' },

  { id: '4a', d: 1.0 + L(7) + 0.6, plats: 'Lekplatsen, helbild', malin: [[7, 1.0]],
    bild: 'Kritan kommer in uppifrån till vänster (hunden står till höger om bollens plats), mot marken framför hunden', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '4b', d: 4.0 + 3.0, plats: 'Lekplatsen, bollens utsnitt (klipp)', ljud: [['krita-ritar/krita-ritar-3', 0.0]],
    bild: 'Kritan ritar bollens kontur i ett drag (4 s), väntar sedan bredvid och vickar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '4c', d: 0.4 + L(8) + 0.4, plats: 'Lekplatsen, bollens utsnitt → helbild (klipp mitt i)', malin: [[8, 0.4]], ljud: [['glitter/glitter-2', 0.1]],
    bild: 'Den riktiga bollen fylls i inifrån och guppar en gång på marken. Kritan flyger ut uppe till höger', ljudtext: 'glitter', ansikte: 'förvånad' },

  { id: '5', d: 0.3 + L(9) + 1.8, plats: 'Lekplatsen, halvbild hunden och bollen', malin: [[9, 0.3]], ljud: [['vov-ja/vov-ja-1', 0.3 + L(9) + 1.3]],
    bild: 'Hunden tittar på bollen (riktning höger), öronen reser sig. Paus 2,5 s (1,8 + GLES 0,7): barnet säger tack (Sanna 2026-11-11 "make tack scene a bit faster")', ljudtext: 'nyfiket `vov-ja` sent i pausen', ansikte: 'nyfiken' },
  { id: '6', d: L(10) + 0.9, plats: 'Samma', malin: [[10, 0.0]], ljud: [['vov-ja/vov-ja-3', L(10) + 0.1], ['svansvift/svansvift-1', L(10) + 0.45]],
    bild: 'Hunden nickar direkt på "Tack!" (trycks ihop och sträcks en gång), svansen viftar', ljudtext: '`vov-ja`, svansen viftar', ansikte: 'jätteglad' },

  { id: '7', d: 1.3 + L(11) + 1.0, plats: 'Lekplatsen, helbild', malin: [[11, 1.3]], ljud: [['nos/nos-1', 0.35], ['boing/boing-1', 1.15], ['svansvift/svansvift-1', 1.5]],
    bild: 'Hunden hukar och lutar sig mot bollen, puffar den med nosen: bollen far upp i en liten båge och landar framför hunden, studsar två gånger. Hunden följer den med blicken och viftar på svansen', ljudtext: '`nos`, mjukt `boing` när den landar, svansen viftar', ansikte: 'fnissig' },
  { id: '8', d: 3.6 + L(12) + 1.0, plats: 'Samma', malin: [[12, 3.6]],
    ljud: [['vov-babbel/vov-babbel-2', 0.3], ['boing/boing-2', 1.2], ['vov-babbel/vov-babbel-3', 2.0], ['boing/boing-3', 2.8]],
    bild: 'Utbytet: hunden svarar, bollen guppar, hunden svarar, bollen guppar. En sak rör sig i taget. Repliken efter', ljudtext: 'vov – boing – vov – boing (`vov-babbel`)', ansikte: 'fnissig' },
  { id: '9', d: 1.8 + L(13) + 1.4, plats: 'Samma', malin: [[13, 1.8]],
    ljud: [['nos/nos-2', 0.2], ['hink-dunk/hink-dunk-1', 1.0], ['vov-fniss/vov-fniss-2', 1.9 + L(13)]],
    bild: 'Hunden puffar en gång till, bollen gör en båge och landar mjukt i den större hinken (övre halvan av bollen syns i öppningen)', ljudtext: '`hink-dunk`, `vov-fniss`', ansikte: 'förvånad → fnissig' },
  { id: '10', d: 0.3 + L(14) + 1.8, plats: 'Lekplatsen, helbild', malin: [[14, 0.3]], ljud: [['vov-ja/vov-ja-2', 0.7 + L(14)]],
    bild: 'Bollen ligger framför hunden igen (klipp: ingen visar hur den kom upp ur hinken)', ljudtext: '`vov-ja`', ansikte: 'glad' },

  { id: '11', d: 0.7 + L(15) + 2.0, plats: 'Lekplatsen, helbild', malin: [[15, 0.7]],
    ljud: [['rull/rull-1', 0.2], ['vov-ja/vov-ja-4', 0.75 + L(15)], ['trav/trav-1', 1.0 + L(15)]],
    bild: 'Bollen rullar åt höger och stannar bakom stöveln, en röd skiva syns bredvid skaftet. Hunden travar dit efter repliken', ljudtext: '`rull`, `vov-ja` direkt efter repliken (inte på Malin), trav', ansikte: 'glad' },
  { id: '12', d: 0.7 + L(16) + 2.0, plats: 'Lekplatsen, helbild', malin: [[16, 0.7]],
    ljud: [['rull/rull-1', 0.2], ['vov-ja/vov-ja-1', 0.75 + L(16)], ['trav/trav-1', 1.0 + L(16)]],
    bild: 'Bollen rullar hela vägen åt vänster och stannar bakom lekstugan, en röd bit syns vid hörnet. Hunden travar dit', ljudtext: '`rull`, `vov-ja` direkt efter repliken (inte på Malin), trav', ansikte: 'glad' },
  { id: '13', d: 1.9 + L(17) + 1.6, plats: 'Lekplatsen, halvbild hunden', malin: [[17, 1.9]],
    ljud: [['rull/rull-1', 0.0], ['gasp/gasp-1', 1.35, 1.2], ['vov-pip/vov-pip-1', 2.2 + L(17)]],
    bild: 'Bollen rullar ut ur bild åt höger, ögonen följer den. Hunden blir tydligt förvånad (1,35 s: stora ögon, o-mun, öronen upp, fryser 0,3 s), sedan tittar den åt vänster, sedan åt höger (ögonen, huvudet vänds inte). Kullen syns inte i utsnittet', ljudtext: '`rull`, frågande `vov-pip`', ansikte: 'nyfiken' },
  { id: '14a', d: 0.3 + L(18) + 0.2, plats: 'Lekplatsen, närbild hunden', malin: [[18, 0.3]],
    bild: 'Frågan till barnet. Hunden tittar ut mot tittaren, öronen lyssnar', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '14b', d: 5.0, plats: 'Lekplatsen, helbild (klipp): hela lekplatsen och alla gömställen syns; efter 3 s klipp till närbild på kullen och rutschkanan', ljud: [['lysmask/lysmask-1', 3.0]],
    bild: 'Paus 5 s, hela lekplatsen syns medan barnet letar. En röd kant av bollen sticker fram vid kullens fot. Efter 3 s skimrar den svagt', ljudtext: 'tyst, ett svagt `lysmask`', ansikte: '– (hunden utanför bild)' },
  { id: '15', d: 0.5 + L(19) + 1.6, plats: 'Närbild kullen och rutschkanan', malin: [[19, 0.5]], ljud: [['tindra/tindra-1', 0.1], ['vov-ja/vov-ja-3', 0.8 + L(19)]],
    bild: 'Bollen skimrar tydligt (stjärnor runt kanten)', ljudtext: '`tindra`, `vov-ja` (hunden utanför bild)', ansikte: '–' },
  { id: '16', d: 1.0 + L(20) + 1.4, plats: 'Lekplatsen, helbild', malin: [[20, 1.0]],
    ljud: [['trav/trav-1', 0.0], ['rull/rull-1', 0.6], ['hopp-mjuk/hopp-mjuk-2', 1.05 + DAR[20]], ['vov-fniss/vov-fniss-3', 1.2 + L(20)]],
    bild: 'Hunden har travat fram till kullen, bollen rullar fram bakom kullen och stannar framför hunden', ljudtext: 'trav, `rull`, `vov-fniss`', ansikte: 'jätteglad' },
  { id: '17', d: 0.7 + L(21) + 1.8, plats: 'Lekplatsen, halvbild', malin: [[21, 0.7]],
    ljud: [['hopp-mjuk/hopp-mjuk-1', 0.35], ['hopp-mjuk/hopp-mjuk-2', 0.95], ['svansvift/svansvift-2', 0.6], ['flamt-valp/flamt-valp-1', 0.9 + L(21)]],
    bild: 'Hunden gör två små glada skutt med bollen bredvid, öronen upp, svansen viftar (±14° kring roten)', ljudtext: '`flamt-valp`, `svansvift`', ansikte: 'jätteglad' },
  { id: '19a', d: 2.35 + 1.45, plats: 'Lekplatsen, helbild',
    ljud: [['nos/nos-2', 0.45], ['landa-mjuk/landa-mjuk-1', 1.15], ['landa-mjuk/landa-mjuk-2', 1.75], ['landa-mjuk/landa-mjuk-3', 2.35], ['svansvift/svansvift-2', 1.3], ['swoosh/swoosh-1', 2.4]],
    bild: 'Hunden puffar upp bollen med nosen och studsar den två gånger på huvudet (ögonen följer). Tredje studsen skickar bollen i en hög båge upp på lekstugans tak', ljudtext: 'nos, mjuka studsar, swoosh', ansikte: 'jätteglad' },
  { id: 'st1', d: 0.7 + L(27) + 0.6, plats: 'Samma helbild', malin: [[27, 0.7]], ljud: [['landa-mjuk/landa-mjuk-5', 0.0], ['gasp/gasp-2', 0.15, 1.2]],
    bild: 'Bollen landar på taket, studsar lite och vickar sig till ro i toppen. Hunden blir förvånad (stora ögon, o-mun, öronen upp)', ljudtext: 'mjuk duns, gasp', ansikte: 'förvånad' },
  { id: 'st2', d: 3.9 + L(28) + 1.0, plats: 'Lekstugan (utsnitt med hela taket)', malin: [[28, 3.9]], ljud: [['trav/trav-1', 0.1], ['hopp-mjuk/hopp-mjuk-1', 3.0], ['landa-mjuk/landa-mjuk-6', 3.5]],
    bild: 'Hunden travar till lekstugan, tittar upp, skuttar en gång men når inte. Öronen sjunker. Malin frågar efter försöket', ljudtext: 'trav, skutt', ansikte: 'nyfiken → lite ledsen' },
  { id: 'st3', d: 1.0 + L(29) + 0.6, plats: 'Samma', malin: [[29, 1.0]], ljud: [['swoosh/swoosh-2', 0.3]],
    bild: 'Kritan flyger in och väntar vid lekstugans vägg', ljudtext: 'swoosh', ansikte: 'nyfiken' },
  { id: 'st4', d: 5.6 + L(30) + 0.6, plats: 'Samma', malin: [[30, 5.6]], ljud: [['pling/pling-1', 4.6], ['glitter/glitter-2', 4.65]],
    bild: 'Kritan ritar stegen (två skenor, fyra pinnar, 3,5 s), konturen står 0,8 s (barnet gissar), sedan fylls den riktiga stegen i med gnistor. Kritan flyger ut', ljudtext: 'kritan ritar, pling, glitter', ansikte: 'nyfiken → jätteglad' },
  { id: 'st5', d: 0.2 + L(31) + 0.6, plats: 'Samma', malin: [[31, 0.2]], ljud: [['vov-ja/vov-ja-1', 0.25 + L(31)]],
    bild: 'Tack: hunden nickar', ljudtext: '`vov-ja` efter repliken', ansikte: 'jätteglad' },
  { id: 'st6', d: 1.1 + L(32) + 0.8, plats: 'Samma', malin: [[32, 1.1]],
    ljud: [['tass/tass-1', 0.3], ['tass/tass-2', 0.65], ['landa-mjuk/landa-mjuk-7', 1.15 + KLIV[0]], ['landa-mjuk/landa-mjuk-2', 1.15 + KLIV[1]], ['landa-mjuk/landa-mjuk-3', 1.15 + KLIV[2]]],
    bild: 'Hunden kliver fram framför stegen och skuttar uppför pinnarna, ett lugnt skutt per "kliv" (tryck och landning, ingen gripning)', ljudtext: 'tassar, mjuka landningar', ansikte: 'jätteglad' },
  { id: 'st7', d: Math.max(3.6, 0.9 + L(33) + 0.6), plats: 'Samma', malin: [[33, 0.9]], ljud: [['nos/nos-1', 0.35], ['rull/rull-1', 0.45], ['landa-mjuk/landa-mjuk-8', 1.4], ['landa-mjuk/landa-mjuk-4', 1.78]],
    bild: 'Uppe: hunden knuffar bollen med huvudet, bollen rullar nerför taket, ramlar ner, studsar och rullar ut åt höger', ljudtext: 'nos, rull, mjuka studsar', ansikte: 'jätteglad' },
  { id: 'st8', d: 2.3 + L(34) + 0.8, plats: 'Samma', malin: [[34, 2.3]],
    ljud: [['landa-mjuk/landa-mjuk-1', 0.65], ['landa-mjuk/landa-mjuk-2', 1.25], ['landa-mjuk/landa-mjuk-6', 1.85], ['hopp-mjuk/hopp-mjuk-2', 2.3 + L(34) - 0.55], ['vov-ja/vov-ja-4', 2.45 + L(34)]],
    bild: 'Hunden skuttar ner för pinnarna och landar mjukt, sedan ett glatt skutt på "Hopp!"', ljudtext: 'mjuka landningar, skutt, `vov-ja`', ansikte: 'jätteglad' },
  { id: '19b', d: LEK + L(24) + 1.6, plats: 'Lekplatsen, helbild', malin: [[24, LEK]],
    ljud: [['trav/trav-1', 0.1], ['smasteg/smasteg-1', 3.1, 2.7],
      ['hopp-mjuk/hopp-mjuk-1', LEK + HOPP[0]], ['hopp-mjuk/hopp-mjuk-2', LEK + HOPP[1]], ['vov-fniss/vov-fniss-5', LEK + 0.3 + L(24)]],
    bild: 'Bild före ord: hunden travar tillbaka till kullen och springer ett glatt varv (platt oval, riktningsposen, aldrig vänd, dammtussar). Sedan repliken och två lugna skutt på "Hopp, hopp!"', ljudtext: 'trav, småsteg, `hopp-mjuk` ×2, `vov-fniss`', ansikte: 'jätteglad' },
  { id: '20', d: 0.3 + L(25) + 1.4, plats: 'Lekplatsen, halvbild', malin: [[25, 0.3]], ljud: [['hopp-mjuk/hopp-mjuk-1', 0.15], ['vov-hejda/vov-hejda-2', 0.5 + L(25)]],
    bild: 'Hunden gör ett glatt skutt och vinkar (höger arm bakom kroppen, snett ut), bollen bredvid', ljudtext: '`vov-hejda`', ansikte: 'jätteglad' },
  { id: '21', d: 0.2 + L(26) + 1.6, plats: 'Samma', malin: [[26, 0.2]], ljud: [['vov-hejda/vov-hejda-1', 0.5 + L(26)]],
    bild: 'Hunden vinkar klart, armen sjunker', ljudtext: '`vov-hejda` (låter som "hej då")', ansikte: 'glad' },
  { id: '22', d: 2.5, plats: 'Lekplatsen → kritirisen', bild: 'Kritirisen drar ihop sig runt hunden och bollen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.7;   // 020 runda 5: "malin narration a bit more spaced out, slower pace in video"
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
