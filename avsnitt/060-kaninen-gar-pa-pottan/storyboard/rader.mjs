// Storyboardens rader för 060 Kaninen går på pottan (förlaga: 059 för takten, 042 för pottan och toarullen): en stillbild per
// uppslag i ../manus.md (delade där bilden klipps mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), ritar
// stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ROST, s in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// s in i raden, volym (valfri, 0,7), längd (valfri, tonas ut sista 0,4 s)]].
//
// Malins repliker, tagningen 2026-11-27, normaliserade till −3 dBFS och tystnaden klippt. Filnamn och text ur ../rost.txt,
// längderna ur ../rost-langder.txt. Mät om om tagningen byts. Pauserna är manusets.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-kritan-ritar', 1.53, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.75, 'Hm … vad blir det nu?'],
  ['03-oj-en-toarulle', 1.87, 'Oj! En toarulle!'],
  ['04-hej-kaninen', 1.90, 'Hej, kaninen! Hej, hej!'],
  ['05-vad-gor-du', 1.25, 'Vad gör du, kaninen?'],
  ['06-leker-med-bollen', 1.98, 'Jaså, du leker med bollen!'],
  ['07-behover-du-kissa', 3.28, 'Oj! Du vickar på dig. Behöver du kissa?'],
  ['08-leka-mer', 2.78, 'Nähä? Du vill leka mer med bollen.'],
  ['09-vickar-annu-mer', 2.48, 'Oj, oj. Nu vickar du ännu mer!'],
  ['10-du-behover-kissa', 3.63, 'Jaha, du behöver kissa! Då går vi till pottan.'],
  ['11-bollen-kan-vanta', 3.03, 'Lägg bollen bredvid pottan. Den kan vänta på dig.'],
  ['12-satta-dig-pa-pottan', 1.67, 'Ska du sätta dig på pottan nu?'],
  ['13-ja-vad-bra', 1.23, 'Ja, vad bra!'],
  ['14-nu-sitter-du', 1.52, 'Nu sitter du på pottan.'],
  ['15-vanta-inget-an-1', 2.09, 'Vänta, vänta … inget än.'],
  ['16-svart-att-sitta-still', 2.93, 'Hm. Det är svårt att sitta still och vänta.'],
  ['17-kritan-ritar-nagot', 3.01, 'Titta! Kritan ritar något vid pottan.'],
  ['18-en-bok', 4.42, 'En bok! En bilderbok! Varsågod, kaninen.'],
  ['19-tack-kritan-1', 1.09, 'Tack, kritan!'],
  ['20-en-morot', 4.40, 'Du tittar i boken. Oj! En morot!'],
  ['21-tycker-du-om-morotter', 1.49, 'Tycker du om morötter?'],
  ['22-morotter-ar-goda', 2.43, 'Ja, morötter är goda!'],
  ['23-vanta-inget-an-2', 1.94, 'Vänta, vänta … inget än.'],
  ['24-kanin-pa-potta', 4.55, 'Du vänder blad. Titta! En liten kanin på en potta.'],
  ['25-precis-som-du', 1.12, 'Precis som du!'],
  ['26-vanta-3', 1.02, 'Vänta, vänta …'],
  ['27-kissade-i-pottan', 2.61, 'Ja! Du kissade i pottan!'],
  ['28-sa-bra', 1.38, 'Så bra, kaninen!'],
  ['29-var-ar-toarullen', 4.50, 'Nu behöver du papper. Men … var är toarullen?'],
  ['30-kan-du-hjalpa', 3.37, 'Kan du hjälpa kaninen? Var är toarullen?'],
  ['31-ja-dar-bakom-badkaret', 2.79, 'Ja, där! Bakom badkaret!'],
  ['32-hamtar-toarullen', 3.12, 'Du hämtar toarullen. Hopp, hopp!'],
  ['33-torka-klart', 5.50, 'Nu torkar du dig med papperet. Torka, torka … klart!'],
  ['34-tommer-pottan', 2.08, 'Nu tömmer du pottan i toaletten.'],
  ['35-spolar', 2.68, 'Och så spolar du. Schhh!'],
  ['36-hej-da-kisset', 1.28, 'Hej då, kisset!'],
  ['37-tvattar-tassarna', 4.82, 'Nu tvättar du tassarna med tvål och vatten. Tvätta, tvätta!'],
  ['38-torkar-tassarna', 3.32, 'Och torkar tassarna på handduken. Så!'],
  ['39-kritan-ritar-igen', 2.29, 'Titta! Kritan ritar igen.'],
  ['40-en-stjarna', 3.45, 'En stjärna! Ett klistermärke till dig.'],
  ['41-var-vill-du-satta', 1.66, 'Var vill du sätta stjärnan?'],
  ['42-pa-pottan', 2.30, 'På pottan! Bra idé!'],
  ['43-tack-kritan-2', 1.14, 'Tack, kritan!'],
  ['44-leka-igen', 1.67, 'Vill du leka med bollen igen?'],
  ['45-bollen-har-vantat', 2.33, 'Ja, bollen har väntat på dig!'],
  ['46-hej-da-kaninen', 2.66, 'Hej då, kaninen! Hej då, pottan!'],
  ['47-vi-ses-snart', 2.93, 'Hej då! Vi ses snart! [giggles]'],
];
export const L = n => ROST[n - 1][1];
// ordtider (silencedetect −35 dB, tagningen 2026-11-27): nicken på "klart", spolningen på "Schhh"
export const KLART = 4.85, SCHHH = 1.69;

// Kaninens ljud (grind 4, manus "Kaninens röst och ljuden"). Aldrig samma tagning två bilder i rad.
const NY = (n, o, v) => ['kanin-ny/kanin-ny-' + n, o, v];
const GU = (n, o, v) => ['kanin-gullig/kanin-' + n, o, v];        // kanin-gullig-N, kanin-hej-4, kanin-hejda-N
const TACK = (n, o) => ['kanin-tack/kanin-tack-' + n, o];
const TASS = (n, o, v = 0.5) => ['tass/tass-' + n, o, v], HOPP = (n, o) => ['hopp-mjuk/hopp-mjuk-' + n, o, 0.4], LANDA = (n, o) => ['landa-mjuk/landa-mjuk-' + n, o, 0.5];
const RULL = (o, langd) => ['rull/rull-1', o, 0.6, langd];
const BLAD = o => ['prassel-tyg/prassel-tyg-1', o, 0.6, 0.6];      // blad = prassel-tyg-1, de första 0,6 s
const PLINK = o => ['droppar/droppar-1', o, 0.8];                  // plink = droppar-1
const KLICK = o => ['lampa-klick/lampa-klick-4', o, 0.6];          // klick = lampa-klick-4
const SPOL = o => ['kran/kran-1', o, 0.45, 2.5];                   // spol = kran-1 2,5 s (lågpass i scenen), porl-1 ovanpå
const BADRUM = ['badrumsljud/badrumsljud-2', 0, 0.25, 160];
const SVAR = 1.6;       // kaninens svar i pausen mellan Malins fråga och reaktion (som 059)
const R = 0.8;          // reaktionsslaget i närbild

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', ansikte: '–' },

  // --- Ritintrot: kritan ritar toarullen (en sak, inte kaninen) ---
  { id: '01a', d: 3.2, plats: 'Papperet, helbild', malin: [[1, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2], ['skogsljud/skogsljud-1', 0.0, 0.35, 12]],
    bild: 'Kritan ritar toarullens kontur i ett drag (ca 2,8 s), sedan fliken och hålet i mitten', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: L(2) + 3.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar (knackar aldrig): gisspaus 3 s', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.5 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.5]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga toarullen fylls i inifrån, krit-gnistor. Sista 0,8 s: zoom in i teckningen och in i badrummet, där rullen står på golvet på samma plats i bilden', ljudtext: '`glitter`', ansikte: '–' },

  // --- Hej, kaninen: leken och vickandet ---
  { id: '1', d: 1.6 + L(4) + 0.8, plats: 'Badrummet, helbild', malin: [[4, 1.8]], ljud: [BADRUM, TASS(1, 0.2), HOPP(1, 0.5), TASS(2, 0.9), GU('hej-4', 1.9 + L(4))],
    bild: 'Kaninen skuttar in från vänster till bollen, stannar och vinkar. Toarullen står på golvet, badkaret längst till höger. **Hej med vinkning**', ljudtext: '`tass`, `kanin-hej-4`', ansikte: 'jätteglad' },
  { id: '1b', d: 0.4 + L(5) + SVAR + L(6) + 0.6, plats: 'Halvnära', malin: [[5, 0.4], [6, 0.4 + L(5) + SVAR]], ljud: [HOPP(2, 0.6 + L(5)), NY('jippi-1', 0.9 + L(5))],
    bild: 'Kaninen tittar på oss. **Pausen:** puffar bollen med nosen, den rullar en bit', ljudtext: '`hopp-mjuk`, `kanin-ny-jippi-1`', ansikte: 'nyfiken → glad' },
  { id: '1r', d: R, plats: 'Närbild (reaktionsslag)', bild: 'Det glada ansiktet, öronen vippar', ljudtext: '–', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(7) + SVAR, plats: 'Närbild', malin: [[7, 0.4]], ljud: [TASS(3, 0.1, 0.3), TASS(4, 0.5, 0.3), TASS(5, 0.9, 0.3), NY('trumpen-1', 0.6 + L(7), 0.6)],
    bild: 'Kaninen stannar mitt i leken och vickar från fot till fot, öronen spetsade. **Pausen:** tittar på bollen, skakar lite på huvudet', ljudtext: '`tass` mjukt per vick, `kanin-ny-trumpen-1` (kort)', ansikte: 'nyfiken → trumpen' },
  { id: '3a', d: 0.8 + L(8) + 1.0, plats: 'Badrummet, helbild', malin: [[8, 0.8]], ljud: [HOPP(3, 0.2), RULL(0.4, 1.0), NY('fniss-1', 0.9 + L(8))],
    bild: 'Kaninen puffar bollen igen (handlingen först). Bollen stöter till toarullen', ljudtext: '`hopp-mjuk`, `rull`, `kanin-ny-fniss-1`', ansikte: 'fnissig' },
  { id: '3b', d: 1.6, plats: 'Närbild toarullen (klipp)', ljud: [RULL(0.0, 1.6)],
    bild: 'Toarullen rullar lugnt över golvet, studsar mjukt mot badkaret och stannar bakom det: bara fliken sticker fram. Ingen replik', ljudtext: '`rull` 1,6 s', ansikte: '–' },
  { id: '4', d: 0.4 + L(9) + 1.4, plats: 'Närbild', malin: [[9, 0.4]], ljud: [TASS(1, 0.1, 0.3), TASS(2, 0.35, 0.3), TASS(3, 0.6, 0.3), TASS(4, 0.85, 0.3), NY('fragande-1', 0.6 + L(9))],
    bild: 'Kaninen vickar igen, snabbare, och tittar upp på oss med stora ögon. Fliken syns svagt bakom badkaret', ljudtext: '`tass` per vick, `kanin-ny-fragande-1`', ansikte: 'stora ögon' },
  { id: '4b', d: 0.8 + L(10) + 0.6, plats: 'Halvnära', malin: [[10, 0.8]], ljud: [NY('ja-1', 0.1)],
    bild: 'Kaninen nickar snabbt, öronen vippar, tittar mot pottan och skuttar runt bollen till dess högra sida (inte genom den)', ljudtext: '`kanin-ny-ja-1`', ansikte: 'glad' },
  { id: '5', d: 1.6 + L(11) + 1.2, plats: 'Halvbild → närbild bollen vid pottan', malin: [[11, 1.6]], ljud: [RULL(0.3, 1.1), GU('gullig-5', 1.8 + L(11))],
    bild: 'Kaninen puffar bollen med foten, den rullar och stannar tätt intill pottan. Närbild på bollen vid pottan', ljudtext: '`rull` kort, `kanin-gullig-5`', ansikte: 'nyfiken' },
  { id: '6', d: 0.3 + L(12) + SVAR + L(13) + 0.6, plats: 'Halvnära', malin: [[12, 0.3], [13, 0.3 + L(12) + SVAR]], ljud: [NY('ja-2', 0.6 + L(12))],
    bild: 'Kaninen tittar på bollen, sedan på pottan. **Pausen:** nickar, öronen vippar', ljudtext: '`kanin-ny-ja-2`', ansikte: 'nyfiken → glad' },
  { id: '7', d: 1.4 + L(14) + 0.6, plats: 'Badrummet, helbild', malin: [[14, 1.4]], ljud: [HOPP(4, 0.2), LANDA(1, 1.0)],
    bild: 'Kaninen skuttar upp och sätter sig på pottan (posen `sitter`, pottan framför benen)', ljudtext: '`hopp-mjuk`, `landa-mjuk`', ansikte: 'glad' },

  // --- Vänta, vänta: första gången och kritan ritar boken ---
  { id: '8', d: 0.8 + L(15) + 1.0, plats: 'Halvnära', malin: [[15, 0.8]],
    bild: 'Kaninen sitter, tittar ner, tittar upp, öronen lyssnar. På *"inget än"* sjunker öronen', ljudtext: 'tyst', ansikte: 'lyssnar → öronen ner' },
  { id: '8r', d: R + 0.6, plats: 'Närbild (reaktionsslag)', ljud: [GU('gullig-7', 0.2)],
    bild: 'Kaninen tittar frågande på oss', ljudtext: '`kanin-gullig-7` (*hm-hm?*)', ansikte: 'frågande' },
  { id: '9', d: 0.6 + L(16) + 1.4, plats: 'Halvnära', malin: [[16, 0.6]], ljud: [NY('trumpen-2', 0.8 + L(16), 0.6)],
    bild: 'Kaninen tittar mot bollen, lyfter sig lite från pottan och sätter sig igen, öronen på sned', ljudtext: '`kanin-ny-trumpen-2` (kort)', ansikte: 'trumpen' },
  { id: '10', d: 0.8 + L(17) + 3.0, plats: 'Utsnittet vid pottan', malin: [[17, 0.8]], ljud: [['krita-ritar/krita-ritar-2', 0.9], NY('sniff-1', 1.0 + L(17))],
    bild: 'Kritan kommer in uppe till höger och ritar en bok bredvid kaninen: pärmen, ryggen, moroten på framsidan. Väntar och svävar: gisspaus 3 s', ljudtext: 'kritan ritar, `kanin-ny-sniff-1`', ansikte: 'nyfiken' },
  { id: '11', d: 0.6 + L(18) + 1.2, plats: 'Samma → närbild ögonen', malin: [[18, 0.6]], ljud: [['glitter/glitter-2', 0.0], NY('fortjust-1', 0.8 + L(18))],
    bild: 'Boken fylls i inifrån, glimt. Kritan flyger ut. Kaninens ögon glittrar, öronen rakt upp. *Varsågod*', ljudtext: '`glitter`, `kanin-ny-fortjust-1`', ansikte: 'förtjust' },
  { id: '12', d: 0.5 + L(19) + 1.3, plats: 'Halvnära', malin: [[19, 0.5]], ljud: [TACK(1, 0.7 + L(19))],
    bild: 'Kaninen tittar på boken, sedan upp dit kritan flög ut. Nickar på *"Tack, kritan!"*', ljudtext: '`kanin-tack-1` efter repliken', ansikte: 'glad' },
  { id: '13', d: 0.8 + L(20) + 1.3, plats: 'Halvnära → närbild uppslaget', malin: [[20, 0.8]], ljud: [BLAD(0.3), NY('mmm-1', 1.0 + L(20))],
    bild: 'Kaninen tar boken och öppnar den. Klipp till närbild på uppslaget: en stor morot', ljudtext: '`blad`, `kanin-ny-mmm-1`', ansikte: 'glad' },
  { id: '13b', d: 0.3 + L(21) + SVAR + L(22) + 0.6, plats: 'Närbild kaninen bakom boken', malin: [[21, 0.3], [22, 0.3 + L(21) + SVAR]], ljud: [NY('ja-3', 0.6 + L(21))],
    bild: '**Pausen:** kaninen nickar två gånger, nosen puffar', ljudtext: '`kanin-ny-ja-3`', ansikte: 'glad' },

  // --- Vänta, vänta: andra och tredje gången ---
  { id: '14', d: 0.8 + L(23) + 1.6, plats: 'Halvnära', malin: [[23, 0.8]],
    bild: 'Kaninen sänker boken lite, sitter stilla, öronen lyssnar. På *"inget än"* sjunker öronen, kaninen rycker på axlarna och tittar i boken igen', ljudtext: 'tyst, bara badrumsljudet', ansikte: 'lyssnar → öronen ner' },
  { id: '15', d: 0.9 + L(24) + 1.2, plats: 'Närbild boken', malin: [[24, 0.9]], ljud: [BLAD(0.2), GU('gullig-2', 1.1 + L(24))],
    bild: 'Sidan vänds. Nytt uppslag: en liten kanin som sitter på en röd potta', ljudtext: '`blad`, `kanin-gullig-2`', ansikte: 'förtjust' },
  { id: '15b', d: 0.4 + L(25) + 1.4, plats: 'Närbild', malin: [[25, 0.4]], ljud: [NY('fniss-2', 0.6 + L(25))],
    bild: 'Kaninen tittar på bilden, sedan ner på sin egen potta, sedan på oss. Fnissar', ljudtext: '`kanin-ny-fniss-2`', ansikte: 'fnissig' },
  { id: '16', d: 1.2 + L(26) + 1.0 + 0.6, plats: 'Halvnära → push in mot närbild', malin: [[26, 1.2]], ljud: [PLINK(1.2 + L(26) + 1.0)],
    bild: '**Annorlunda än 8 och 14:** kaninen lägger ner boken och sitter helt stilla, kameran glider långsamt in. Öronen reser sig sakta, ögonen blir stora. Badrumsljudet tonas ner. Efter repliken 1 s tyst, sedan *plink*: förvånat ansikte, öronen rakt upp', ljudtext: 'nästan tyst, `plink` (`droppar-1`) efter pausen', ansikte: 'stilla → förvånad' },
  { id: '16b', d: 2.0, plats: 'Närbild (reaktionsslag)', ljud: [GU('gullig-4', 0.3)],
    bild: 'Ögonen halvslutna, öronen sjunker, mysig suck. Sedan öppna jätteglada ögon', ljudtext: '`kanin-gullig-4` (mysig suck)', ansikte: 'lättad → jätteglad' },
  { id: '17', d: 0.4 + L(27) + 1.4, plats: 'Halvnära', malin: [[27, 0.4]], ljud: [['tindra/tindra-3', 0.3, 0.5], NY('jippi-2', 0.6 + L(27))],
    bild: 'Kaninen ler stort, öronen vippar', ljudtext: '`kanin-ny-jippi-2`, `tindra-3`', ansikte: 'jätteglad' },
  { id: '17b', d: 0.4 + L(28) + 1.2, plats: 'Närbild', malin: [[28, 0.4]], ljud: [NY('ja-1', 0.6 + L(28))],
    bild: 'Kaninen sträcker på sig, stolt, ett litet lugnt skutt på pottan', ljudtext: '`kanin-ny-ja-1`', ansikte: 'stolt' },

  // --- Toarullen är borta: barnet hittar den ---
  { id: '18', d: 0.6 + L(29) + 1.4, plats: 'Halvbild', malin: [[29, 0.6]], ljud: [NY('fragande-2', 0.8 + L(29))],
    bild: 'Kaninen lägger boken bredvid sig och tittar på golvet där rullen stod: tomt. Tittar åt vänster, sedan åt höger', ljudtext: '`kanin-ny-fragande-2`', ansikte: 'frågande' },
  { id: '19a', d: 2.0, plats: 'Badrummet, helbild', malin: [[30, 0.3]],
    bild: '*Kan du hjälpa kaninen?* Klipp efter 2 s', ljudtext: 'tyst', ansikte: 'frågande' },
  { id: '19b', d: 0.3 + L(30) - 2.0 + 5.0, plats: 'Närbild badkarets ände (klipp)', ljud: [['glimt/glimt-2', 0.3 + L(30) - 2.0 + 3.0, 0.35]],
    bild: 'Pappersfliken och en skymt av rullen bakom badkaret. Paus 5 s; efter 3 s skimrar fliken svagt', ljudtext: 'tyst, `glimt-2` svagt', ansikte: '–' },
  { id: '20', d: 0.4 + L(31) + 1.2, plats: 'Samma → klipp till kaninen', malin: [[31, 0.4]], ljud: [['glimt/glimt-1', 0.2, 0.6], NY('fortjust-2', 0.6 + L(31))],
    bild: 'Fliken skimrar tydligt. Klipp till kaninen: öronen upp, glad', ljudtext: '`glimt-1`, `kanin-ny-fortjust-2`', ansikte: 'förtjust' },
  { id: '21', d: 1.2 + L(32) + 0.8, plats: 'Badrummet, helbild', malin: [[32, 1.2]], ljud: [HOPP(1, 0.1), TASS(2, 0.6), HOPP(3, 1.2), RULL(1.6, 0.6), TASS(4, 2.4)],
    bild: 'Kaninen kliver av pottan, skuttar till badkaret, rullen glider fram och upp i tassen, kaninen skuttar tillbaka', ljudtext: '`tass`, `hopp-mjuk`, `rull` kort', ansikte: 'glad' },

  // --- Torka, tömma, spola, tvätta ---
  { id: '22', d: 0.6 + L(33) + 1.0, plats: 'Halvnära, från magen och upp', malin: [[33, 0.6]], ljud: [['ritsch/ritsch-1', 0.2, 0.6], NY('ja-2', 0.6 + KLART + 0.3)],
    bild: 'Kaninen river av en lapp, tassen går ner ur bild och upp igen. **På *"klart"*:** kaninen nickar', ljudtext: '`ritsch`, `kanin-ny-ja-2`', ansikte: 'glad' },
  { id: '23', d: 1.0 + L(34) + 0.8, plats: 'Badrummet, helbild', malin: [[34, 1.0]], ljud: [HOPP(2, 0.2), ['porl/porl-1', 1.1, 0.5], LANDA(2, 1.0 + L(34) + 0.2)],
    bild: 'Kaninen lyfter pottan, skuttar till toaletten och tippar pottan över kanten. Ställer tillbaka den', ljudtext: '`hopp-mjuk`, `porl` (kort, tyst), `landa-mjuk`', ansikte: 'glad' },
  { id: '24', d: 0.7 + L(35) + 1.2, plats: 'Halvnära vid toaletten', malin: [[35, 0.7]], ljud: [KLICK(0.2), SPOL(0.3), ['porl/porl-1', 1.8, 0.35], NY('fniss-3', 0.9 + L(35))],
    bild: 'Kaninen trycker på knappen. Rycker till av ljudet, öronen upp. Närbild: fnissar', ljudtext: '`klick` (`lampa-klick-4`), `spol` (`kran-1` lågpassad), `kanin-ny-fniss-3`', ansikte: 'förvånad → fnissig' },
  { id: '24b', d: 0.3 + L(36) + 1.0, plats: 'Samma', malin: [[36, 0.3]],
    bild: 'Kaninen vinkar kort åt toaletten', ljudtext: '–', ansikte: 'glad' },
  { id: '25', d: 1.0 + L(37) + 0.8, plats: 'Halvnära vid handfatet', malin: [[37, 1.0]], ljud: [TASS(5, 0.1), ['kran/kran-1', 0.4, 0.4, 4.5], ['skrubb/skrubb-1', 1.2]],
    bild: 'Kaninen på pallen bakom handfatet, kranen rinner, tvålen mellan tassarna, skumtussen växer', ljudtext: '`tass`, `kran`, `skrubb`', ansikte: 'glad' },
  { id: '26', d: 1.0 + L(38) + 1.4, plats: 'Samma → närbild tassarna', malin: [[38, 1.0]], ljud: [['droppar/droppar-1', 0.1, 0.5], ['droppar/droppar-1', 0.4, 0.5], ['droppar/droppar-1', 0.7, 0.5], ['handduk-gnugg/handduk-gnugg-1', 0.9, 0.5], GU('gullig-4b', 1.2 + L(38))],
    bild: 'Kranen stängs, tre droppar. Handduken glider från kroken till tassarna, gnider och tillbaka. Närbild: rena tassar, kaninen myser', ljudtext: '`droppar` ×3, `handduk-gnugg`, `kanin-gullig-4b`', ansikte: 'myser' },

  // --- Stjärnan ---
  { id: '27', d: 1.0 + L(39) + 3.0, plats: 'Badrummet, helbild → pottan', malin: [[39, 1.0]], ljud: [HOPP(4, 0.1), ['krita-ritar/krita-ritar-3', 1.2], NY('sniff-2', 1.2 + L(39))],
    bild: 'Kaninen skuttar ner till pottan. Kritan flyger in och ritar en stjärna ovanför pottan: fem uddar i ett drag. Väntar och svävar: gisspaus 3 s', ljudtext: 'kritan ritar, `kanin-ny-sniff-2`', ansikte: 'nyfiken' },
  { id: '28', d: 0.6 + L(40) + 1.2, plats: 'Samma → närbild', malin: [[40, 0.6]], ljud: [['glitter/glitter-3', 0.0], ['tindra/tindra-4', 0.3, 0.5], NY('fortjust-1', 0.8 + L(40))],
    bild: 'Stjärnan fylls i gul, krit-gnistor. Den glider ner i kaninens tass. Kaninens ögon glittrar', ljudtext: '`glitter`, `tindra-4`, `kanin-ny-fortjust-1`', ansikte: 'förtjust' },
  { id: '28b', d: 0.3 + L(41) + SVAR + L(42) + 1.2, plats: 'Halvnära → närbild stjärnan på pottan', malin: [[41, 0.3], [42, 0.3 + L(41) + SVAR]], ljud: [NY('ja-3', 0.6 + L(41)), ['klistra/klistra-1', 0.5 + L(41) + SVAR + L(42), 0.6], ['glimt/glimt-1', 0.9 + L(41) + SVAR + L(42), 0.5]],
    bild: '**Pausen:** kaninen tittar på stjärnan, sedan på pottan, och pekar mot den. Efter repliken trycker kaninen fast stjärnan på pottans framsida. Glimt', ljudtext: '`kanin-ny-ja-3`, `klistra`, `glimt-1`', ansikte: 'glad' },
  { id: '28c', d: 0.6 + L(43) + 1.3, plats: 'Halvnära', malin: [[43, 0.6]], ljud: [TACK(2, 0.8 + L(43))],
    bild: 'Kaninen tittar upp mot kritan, som flyger ut uppe till höger', ljudtext: '`kanin-tack-2`', ansikte: 'glad' },

  // --- Bollen igen, hej då ---
  { id: '29', d: 0.3 + L(44) + SVAR + L(45) + 2.0, plats: 'Badrummet, helbild', malin: [[44, 0.3], [45, 0.3 + L(44) + SVAR]], ljud: [NY('jippi-1', 0.6 + L(44)), HOPP(5, 0.6 + L(44) + SVAR + L(45)), NY('fniss-4', 1.2 + L(44) + SVAR + L(45))],
    bild: 'Kaninen tittar på bollen bredvid pottan. **Pausen:** glatt ja. Efter Malins reaktion puffar kaninen bollen och gör ett lugnt glatt skutt (leker 2 s)', ljudtext: '`kanin-ny-jippi-1`, `hopp-mjuk`, `kanin-ny-fniss-4`', ansikte: 'jätteglad' },
  { id: '30', d: 0.4 + L(46) + 1.0, plats: 'Halvbild', malin: [[46, 0.4]], ljud: [GU('hejda-2', 0.6 + L(46))],
    bild: 'Kaninen vinkar (armen bakom kroppen, snett ut förbi kanten), pottan med stjärnan och bollen bredvid. **Hej då med vinkning**', ljudtext: '`kanin-hejda-2`', ansikte: 'jätteglad' },
  { id: '31', d: 0.4 + L(47) + 1.2, plats: 'Halvbild', malin: [[47, 0.4]], ljud: [GU('hejda-1', 0.6 + L(47))],
    bild: 'Kaninen vinkar klart och sänker armen', ljudtext: '`kanin-hejda-1`', ansikte: 'glad' },
  { id: '32', d: 2.0, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt kaninen, pottan med stjärnan och bollen. 0,6 s svart', ljudtext: '–', ansikte: 'glad' },
];

// Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in; frågor före. Takten som 059: 0,4 s extra luft på varje rad med
// en replik, slutet (30–31) lugnare 0,9 s. Pauserna för barnet (01b, 10, 27 3 s, 19b 5 s) står i raderna.
export const GLES = 0.4, GLES_SLUT = 0.9;
for (const r of RADER) if (r.malin && !['01a', '01b', '19a'].includes(r.id)) r.d += ['30', '31'].includes(r.id) ? GLES_SLUT : GLES;
