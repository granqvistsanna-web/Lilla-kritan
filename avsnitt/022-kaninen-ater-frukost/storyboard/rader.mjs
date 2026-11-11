// Storyboardens rader för 022 Kaninen äter frukost: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d), ritar
// stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a,
// sekunder in i raden, volym (valfri)]]; null som fil = ljudet saknas än ([null, s, 'namn'], står i texten med ⚠, tyst i animatiken).
// ROST = [filnamn i assets/ljud/roster/kaninen-ater-frukost/, uppmätt längd i s, text]. Längderna ur ../rost-langder.txt
// (normaliserade till −3 dBFS, 2026-11-11), texterna ur ../rost.txt. Byts en tagning: mät om och klistra in här.
export const ROST = [
  ['01-kritan-ritar', 1.95, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.91, 'Hm … vad blir det nu?'],
  ['03-kanin', 1.77, 'Oj! En kanin!'],
  ['04-hej-kaninen-hej', 2.87, 'Hej, kaninen! Hej, hej! God morgon!'],
  ['05-det-kurrar-magen', 2.23, 'Oj! Det kurrar i magen!'],
  ['06-bordet-ar-visst', 2.38, 'Oj då. Bordet är visst tomt.'],
  ['07-vad-gor', 2.01, 'Hm … vad gör vi nu?'],
  ['08-titta-kritan-ritar', 2.44, 'Titta! Kritan ritar något.'],
  ['09-banan-varsagod-kaninen', 3.30, 'En banan! Varsågod, kaninen.'],
  ['10-saga-tack', 1.21, 'Ska vi säga tack?'],
  ['11-tack', 0.75, 'Tack!'],
  ['12-kritan-ritar-mer', 1.68, 'Kritan ritar mer …'],
  ['13-smorgas', 1.30, 'En smörgås!'],
  ['14-glas-mjolk', 1.58, 'Och ett glas mjölk!'],
  // ⚠ runda 4: filerna 15–18 flyttades till gamla/ när glasrepliknarna kom in som 15–18; de här fyra används fortfarande
  ['gamla/15-sa-mycket-gott', 1.74, 'Oj, så mycket gott!'],
  ['gamla/16-var-ar-kaninen', 2.01, 'Oj! Var är kaninen?'],
  ['gamla/17-tittut', 0.57, 'Tittut!'],
  ['gamla/18-ata-frukost', 2.18, 'Ska du äta frukost nu?'],
  ['19-forst-bananen-tugga', 4.25, 'Först bananen. En tugga … mums!'],
  ['20-smorgasen-tugga-mums', 4.69, 'Och smörgåsen. En tugga … mums!'],
  // runda 4: letleken gäller glaset med mjölk, inte biten (tagningarna 2026-11-11 14:42, −3 dBFS, längderna i ../rost-langder.txt; Sanna godkände dem)
  ['15-glaset-var', 3.24, 'Oj, glaset med mjölk! Var tog det vägen?'],
  ['16-kan-du-hitta-glaset', 2.99, 'Kan du hjälpa kaninen? Kan du hitta glaset?'],
  ['17-dar-ar-glaset', 2.08, 'Ja, där! Där är glaset!'],   // runda 5, ny inspelning
  ['18-och-mjolken', 4.10, 'Och mjölken. En klunk … mums!'],
  ['25-dricker-kaninen-mjolk', 2.91, 'Oj! Nu dricker kaninen mjölk!'],
  ['26-mjolkmustasch', 2.84, 'Ha ha! En mjölkmustasch!'],
  ['27-mmm-matt-magen', 2.45, 'Mmm … mätt i magen.'],
  ['28-hej-kaninen', 1.22, 'Hej då, kaninen!'],
  ['29-hej-ses-snart', 2.83, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];
// var "tugga" och "mums!" ligger i replikerna (s in i repliken; silencedetect −35 dB, tagningen 2026-11-11). Tuggan (nom) på
// "tugga", biten är borta på "mums!". Mät om om tagningen byts.
// 24 (runda 4): "klunk" och "mums!" i 18-och-mjolken.
export const ORD = { 19: { tugga: 2.3, mums: 3.35 }, 20: { tugga: 2.2, mums: 3.27 }, 24: { tugga: 1.45, mums: 2.25 } };

export const RADER = [
  // runda 4: introt är det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro), det sätts före i film/satt-ihop.sh.
  // Scenen börjar på rent papper, inget kritsvep.

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['skogsljud/skogsljud-1', 0, 0.25], ['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar kaninens kontur i ett lugnt drag (ca 7 s totalt), halvvägs här', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]], ljud: [['skogsljud/skogsljud-1', 0, 0.25]],
    bild: 'Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och svajar (ingen knackning): barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga kaninen fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 5.8 + L(4) + 1.6, plats: 'Köket, helbild', malin: [[4, 5.8]],
    ljud: [['smasteg/smasteg-1', 0.2], ['tass/tass-2', 2.9, 0.5], ['tass/tass-5', 4.0, 0.5], ['landa-mjuk/landa-mjuk-1', 5.3, 0.6], ['hej-babbel/hej-babbel-1', 6.1 + L(4)]],
    bild: 'Kaninen trippar in på golvet från vänster, kliver upp på pallen (två lugna skutt: låga steget, höga steget), skuttar över till stolen bakom bordet och vinkar på "Hej" (armen bakom kroppen, snett ut)', ljudtext: 'små steg, två tass, mjuk landning, `hej-babbel-1`', ansikte: 'glad' },
  { id: '2', d: 1.2 + L(5) + 1.2, plats: 'Köket, halvbild', malin: [[5, 1.2]], ljud: [[null, 0.2, 'magkurr'], [null, 1.6 + L(5), 'förvånat babbel']],
    bild: 'Magen kurrar: kroppen breddas lite två gånger (bred +0,03), kaninen tittar ner. Kurret före repliken', ljudtext: '⚠ `magkurr` saknas (Openverse först), ⚠ förvånat babbel ej valt', ansikte: 'förvånad, tittar ner' },
  { id: '3', d: 0.3 + L(6) + 1.0 + L(7) + 1.3, plats: 'Köket, närbild bordet', malin: [[6, 0.3], [7, 1.3 + L(6)]], ljud: [[null, 1.6 + L(6) + L(7), 'ledset babbel']],
    bild: 'Bordet är tomt. Öronen faller. Paus 1 s mellan replikerna', ljudtext: '⚠ litet ledset babbel ej valt', ansikte: 'lite ledsen' },

  { id: '4a', d: 0.3 + L(8) + 0.6, plats: 'Köket, helbild', malin: [[8, 0.3]],
    bild: 'Kritan kommer in i bild uppifrån höger, mot bordet', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '4b', d: 7.5, plats: 'Köket, helbild', ljud: [['krita-ritar/krita-ritar-2', 0.0]],
    bild: 'Kritan ritar bananens kontur på bordet (ca 4 s), väntar sedan ca 3 s bredvid och svajar: gisspaus', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '4c', d: 0.2 + L(9) + 0.4,   // "make tack scene a bit faster": mindre tomrum efter "Varsågod"
    plats: 'Köket, helbild', malin: [[9, 0.2]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga bananen fylls i inifrån', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '5', d: 0.5 + L(10) + 2.5, plats: 'Köket, halvbild', malin: [[10, 0.5]], ljud: [[null, 0.2, 'nyfiket babbel']],
    bild: 'Kaninen tittar på bananen, öronen reser sig. Paus 2,5 s: barnet säger tack', ljudtext: '⚠ nyfiket babbel ej valt, sedan tyst', ansikte: 'nyfiken' },
  { id: '6', d: L(11) + 1.3, plats: 'Samma', malin: [[11, 0.0]], ljud: [['ja-babbel/ja-babbel-1', 0.3]],
    bild: 'Kaninen nickar direkt på "Tack!" (kroppen trycks ihop och sträcks en gång)', ljudtext: '`ja-babbel-1`', ansikte: 'jätteglad' },
  { id: '7a', d: 0.3 + L(12) + 2.3, plats: 'Köket, helbild', malin: [[12, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.4 + L(12)]],
    bild: 'Kritan ritar smörgåsens kontur mitt på bordet. Paus 2 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '7b', d: 0.2 + L(13) + 0.8, plats: 'Köket, helbild', malin: [[13, 0.2]], ljud: [['glitter/glitter-2', 0.0]],
    bild: 'Smörgåsen fylls i', ljudtext: 'glitter', ansikte: 'glad' },
  { id: '8a', d: 3.0, plats: 'Köket, helbild', ljud: [['krita-ritar/krita-ritar-4', 0.0]],
    bild: 'Kritan ritar glasets kontur till höger på bordet', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '8b', d: 0.2 + L(14) + 1.0, plats: 'Köket, helbild', malin: [[14, 0.2]], ljud: [['glitter/glitter-3', 0.0]],
    bild: 'Glaset med mjölk fylls i, kritan flyger ut uppåt höger', ljudtext: 'glitter', ansikte: 'glad' },
  { id: '9', d: 1.0 + L(15) + 1.2, plats: 'Köket, halvbild', malin: [[15, 1.0]], ljud: [['ja-babbel/ja-babbel-2', 0.2], ['fniss/fniss-1', 1.3 + L(15)]],
    bild: 'Kaninen ser all mat, öronen vippar', ljudtext: '`ja-babbel-2`, fniss', ansikte: 'jätteglad' },

  { id: '10', d: 1.2 + L(16) + 4.0, plats: 'Köket, helbild', malin: [[16, 1.2]], ljud: [['fniss/fniss-2', 1.2 + L(16) + 2.0, 0.5]],
    bild: 'Kaninen sjunker rakt ner bakom bordet tills bara öronen syns. Paus 4 s: barnet letar', ljudtext: 'tyst, ett litet fniss efter 2 s', ansikte: '– (bakom bordet)' },
  { id: '11', d: L(17) + 2.0, plats: 'Köket, helbild', malin: [[17, 0.0]], ljud: [['ja-babbel/ja-babbel-3', 0.3 + L(17)], ['fniss/fniss-3', 1.2 + L(17)]],
    bild: 'Kaninen kommer rakt upp på "Tittut!"', ljudtext: '`ja-babbel-3`, fniss', ansikte: 'jätteglad' },
  { id: '12', d: 0.3 + L(18) + 1.8, plats: 'Köket, halvbild', malin: [[18, 0.3]], ljud: [['ja-babbel/ja-babbel-4', 0.7 + L(18)]],
    bild: 'Kaninen bakom maten. **Shorten börjar här**', ljudtext: '`ja-babbel-4`', ansikte: 'glad' },
  { id: '13', d: 0.3 + L(19) + 1.6, plats: 'Köket, närbild bordet', malin: [[19, 0.3]], ljud: [['nom/nom-1', 0.3 + ORD[19].tugga], ['mums/mums-1', 0.6 + L(19)]],
    bild: 'Kaninen sjunker och lutar sig mot bananen, munnen öppen: en bit klipps bort på "tugga", resten är borta på "mums!". Kinderna rör sig två gånger', ljudtext: '`nom`, `mums`', ansikte: 'munnen öppen' },
  { id: '14', d: 0.3 + L(20) + 1.6, plats: 'Köket, närbild bordet', malin: [[20, 0.3]], ljud: [['nom/nom-2', 0.3 + ORD[20].tugga], ['mums/mums-2', 0.6 + L(20)]],
    bild: 'Samma med smörgåsen: rakt ner mot den, en bit borta och smulor på "tugga"', ljudtext: '`nom`, `mums`', ansikte: 'munnen öppen' },
  { id: '15', d: 0.3 + L(21) + 1.5, plats: 'Köket, halvbild', malin: [[21, 0.3]], ljud: [[null, 0.5 + L(21), 'frågande babbel']],
    bild: 'Glaset står kvar på sin plats, mitt framför ögonen. Kaninen tittar åt vänster, sedan åt höger (ögon och nos, huvudet vänds inte), ser det inte', ljudtext: '⚠ frågande babbel ej valt', ansikte: 'nyfiken' },
  { id: '16a', d: 0.3 + L(22) + 0.2, plats: 'Köket, halvbild', malin: [[22, 0.3]],
    bild: 'Kaninen letar: tittar upp, åt vänster, under sig. Glaset står kvar till höger', ljudtext: '–', ansikte: '–' },
  { id: '16b', d: 5.0, plats: 'Samma', ljud: [['lysmask/lysmask-1', 3.0, 0.5]],
    bild: 'Paus 5 s: barnet pekar. Kaninen tittar åt fel håll, lyfter på öronen; efter ca 3 s skimrar glaset svagt', ljudtext: 'tyst, ett svagt `lysmask`', ansikte: '–' },
  { id: '17', d: L(23) + 1.8, plats: 'Köket, helbild', malin: [[23, 0.0]], ljud: [['tindra/tindra-1', 0.2], ['ja-babbel/ja-babbel-5', 0.3 + L(23)]],
    bild: 'Glaset skimrar tydligt, kaninen vänder sig mot det och blir jätteglad', ljudtext: '`tindra`, `ja-babbel-5`', ansikte: 'jätteglad' },
  { id: '18', d: 0.3 + L(24) + 1.5, plats: 'Köket, närbild bordet', malin: [[24, 0.3]], ljud: [['kluck/kluck-1', 0.3 + ORD[24].tugga, 0.7], ['mums/mums-3', 0.5 + L(24)]],
    bild: 'Glaset lyfter sig (ingen hand) och glider upp till kaninens mun: en klunk på "klunk" (mjölken sjunker lite), ner igen, glad på "mums!"', ljudtext: '`kluck`, `mums`', ansikte: 'munnen öppen' },
  { id: '19', d: 0.3 + L(25) + 2.0, plats: 'Köket, närbild bordet', malin: [[25, 0.3]], ljud: [['slurp/slurp-1', 0.5 + L(25)]],
    bild: 'Glaset lyfter sig upp till kaninens mun igen, kaninen blundar och dricker, mjölken sjunker; glaset glider ner', ljudtext: '`slurp`', ansikte: 'blundar' },
  { id: '20', d: 0.6 + L(26) + 1.6, plats: 'Köket, närbild kaninen', malin: [[26, 0.6]], ljud: [['fniss/fniss-4', 0.9 + L(26)]],
    bild: 'Kaninen reser sig med en vit mjölkmustasch. **Shorten slutar här**', ljudtext: 'fniss', ansikte: 'fnissig' },
  { id: '21', d: 0.3 + L(27) + 2.2, plats: 'Köket, halvbild', malin: [[27, 0.3]], ljud: [['mmm/mmm-1', 0.6 + L(27)], [null, 1.6 + L(27), 'mysig suck']],
    bild: 'Kaninen blundar nöjt, öronen hänger (posen magen syns inte bakom bordet)', ljudtext: '`mmm`, ⚠ mysig suck saknas', ansikte: 'nöjd, blundar' },
  { id: '22', d: 0.3 + L(28) + 1.8, plats: 'Köket, helbild', malin: [[28, 0.3]], ljud: [['hej-babbel/hej-babbel-2', 0.6 + L(28)]],
    bild: 'Kaninen vinkar (armen bakom kroppen, snett ut)', ljudtext: '`hej-babbel-2` (⚠ ett eget hej då-ljud saknas)', ansikte: 'glad' },
  { id: '23', d: L(29) + 1.6, plats: 'Samma', malin: [[29, 0.0]], ljud: [['fniss/fniss-5', 0.3 + L(29)]],
    bild: 'Kaninen vinkar klart, armen sänks', ljudtext: 'fniss', ansikte: 'jätteglad' },
  { id: '24', d: 2.5, plats: 'Köket → kritirisen', bild: 'Kritirisen drar ihop sig runt kaninen', ljudtext: '–', ansikte: 'glad' },
];

export const GLES = 0.7;   // 020 runda 5: "malin narration a bit more spaced out, slower pace in video"
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
