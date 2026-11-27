// Storyboardens rader för 059 Räven plockar blåbär: en stillbild per bild, reaktionsslagen som egna bilder (som 056).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, s in]].
// Förlagor: 056 (samma räv, takten), manus.md (uppslagen). Ordtiderna (bilden på orden) ur ../rost-ordtider.txt.
// Rad 16 "Ska vi säga tack?" används inte (Sanna 2026-11-27: Malin säger tack direkt, ingen fråga och ingen paus).
//
// Malins repliker, uppmätta (ffprobe, −3 dBFS, tagning 1 2026-11-27). Text ur ../rost.txt, längder ur ../rost-langder.txt.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-kritan-ritar', 1.58, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.76, 'Hm … vad blir det nu?'],
  ['03-en-blabarsbuske', 1.98, 'Oj! En blåbärsbuske!'],
  ['04-hej-raven', 1.52, 'Hej, räven! Hej, hej!'],
  ['05-vad-ska-du-gora', 1.66, 'Vad ska du göra i skogen i dag?'],
  ['06-plocka-blabar', 2.78, 'Jaså, plocka blåbär! Vad kul!'],
  ['07-sa-manga-blabar', 2.53, 'Titta, så många blåbär på busken!'],
  ['08-plockar-med-tassarna', 1.99, 'Räven plockar blåbär med tassarna.'],
  ['09-tassarna-ar-fulla', 3.46, 'Oj! Tassarna är fulla. Ett blåbär rullar iväg!'],
  ['10-ett-till-rullar', 2.85, 'Oj då. Ett blåbär till rullar iväg.'],
  ['11-far-inte-plats', 2.21, 'Blåbären får inte plats i tassarna, va?'],
  ['12-for-manga', 2.03, 'Nej, det är för många blåbär.'],
  ['13-var-ska-raven-lagga', 2.56, 'Hm … var ska räven lägga blåbären?'],
  ['14-kritan-ritar-nagot', 1.82, 'Titta! Kritan ritar något.'],
  ['15-en-korg', 2.09, 'En korg! Varsågod, räven.'],
  ['16-ska-vi-saga-tack', 0.84, 'Ska vi säga tack?'],
  ['17-tack', 0.61, 'Tack!'],
  ['18-lagger-i-korgen', 2.98, 'Räven lägger blåbären i korgen. Plopp, plopp!'],
  ['19-ska-du-smaka', 1.41, 'Ska du smaka på ett blåbär?'],
  ['20-mums', 0.87, 'Mums!'],
  ['21-vad-gott', 2.07, 'Mm, vad gott blåbäret var!'],
  ['22-bla-tunga', 2.88, 'Ha ha! Räven har blå tunga!'],
  ['23-plocka-fler', 1.85, 'Ska du plocka fler blåbär i korgen?'],
  ['24-ja-bra-ide', 1.37, 'Ja, bra idé!'],
  ['25-lilla-busken', 3.51, 'Först den lilla busken. Plocka, plocka … i korgen!'],
  ['26-sitter-hogt', 3.47, 'Oj! Blåbären sitter högt uppe på den stora busken.'],
  ['27-nar-du-inte', 1.71, 'Når du inte blåbären, räven?'],
  ['28-for-hogt', 2.07, 'Nej, blåbären sitter för högt.'],
  ['29-kritan-ritar-igen', 1.99, 'Titta! Kritan ritar igen.'],
  ['30-en-pall', 2.02, 'En pall! Varsågod, räven.'],
  ['31-tack-kritan', 1.00, 'Tack, kritan!'],
  ['32-upp-pa-pallen', 3.41, 'Räven kliver upp på pallen. Ett steg … två steg.'],
  ['33-stora-busken', 3.38, 'Och den stora busken. Plocka, plocka … i korgen!'],
  ['34-sa-manga-i-korgen', 2.40, 'Titta, så många blåbär i korgen!'],
  ['35-finns-det-fler', 2.79, 'Finns det fler blåbär? Räven vet inte var.'],
  ['36-ser-du-fler-blabar', 2.62, 'Kan du hjälpa räven? Ser du fler blåbär?'],
  ['37-ja-dar', 2.10, 'Ja, där! Bakom stubben!'],
  ['38-sista-busken', 3.40, 'Och den sista busken. Plocka, plocka … i korgen!'],
  ['39-korgen-ar-full', 2.06, 'Nu är korgen full av blåbär!'],
  ['40-smakar-pa-blabaren', 3.02, 'Räven smakar på blåbären. Mums, mums!'],
  ['41-bla-nos', 3.35, 'Ha ha! Blå nos … och blå tunga!'],
  ['42-borsta-tanderna', 1.95, 'Sedan får du borsta tänderna, räven.'],
  ['43-hej-da-raven', 2.04, 'Hej då, räven! Hej då, korgen!'],
  ['44-vi-ses-snart', 1.68, 'Hej då! Vi ses snart!'],];
export const L = n => ROST[n - 1][1];

// Rävens röst (055/056, grind 4 2026-11-25): rav-gullig-N[b–d], N = 1 hej, 2 förtjust, 3 kort fniss, 4 mysig suck, 5 nyfiken,
// 6 trumpen, 7 pratar, 8 hej då. Långt fniss: rav-fniss-1 och -3. Aldrig samma tagning två bilder i rad.
const RAV = (n, o) => ['rav-gullig/rav-gullig-' + n, o];
const FNISS = (n, o) => ['rav-fniss/rav-fniss-' + n, o];
// Bären som landar: plupp-2 och -3 (de starka; 1, 4 och 5 är för svaga), växlar. Sanna väljer slutligt ljud i grind 4.
let pi = 0; const PLUPP = o => ['plupp/plupp-' + (2 + (pi++ % 2)), o];
const RULL = o => ['rull/rull-1', o], NOM = o => ['nom/nom-2', o], PRASSEL = o => ['prassel-buske/prassel-buske-1', o];
const KORG = o => ['landa-mjuk/landa-mjuk-1', o];   // korg-1 är tyst (topp −42 dB)
const TASS = (n, o) => ['tass/tass-' + n, o];
const SVAR = 1.6;       // rävens svar i pausen mellan Malins fråga och reaktion (som 056)
const R = 0.8;          // reaktionsslaget i närbild (0,6–1 s)

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', ansikte: '–' },

  // --- Ritintrot: kritan ritar blåbärsbusken (en sak, inte räven) ---
  { id: '01a', d: 3.2, plats: 'Papperet, helbild', malin: [[1, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2], ['skogsljud/skogsljud-1', 0.0]],
    bild: 'Kritan ritar buskens bulliga ytterkant i ett drag (ca 2,8 s), sedan tre bär med kronor och två blad', ljudtext: 'kritan ritar, skogsljud', ansikte: '–' },
  { id: '01b', d: L(2) + 3.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar (knackar aldrig): gisspaus 3 s', ljudtext: 'skogsljud', ansikte: '–' },
  { id: '01c', d: 0.5 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.5]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Den riktiga busken fylls i inifrån, bären sist, krit-gnistor. Sista 0,8 s: zoom in i teckningen, in i skogen (busken blir lilla busken)', ljudtext: 'glitter', ansikte: '–' },

  // --- Hej, blåbär ---
  { id: '1', d: 1.6 + L(4) + 0.8, plats: 'Gröna skogen, helbild', malin: [[4, 1.8]], ljud: [TASS(1, 0.2), TASS(2, 0.8), RAV(1, 1.9 + L(4))],
    bild: 'Lilla busken, stubben (en kvist med ett bär sticker fram vid sidan), stora busken. Räven går in från vänster, stannar vid lilla busken och vinkar (armen bakom kroppen)', ljudtext: 'tass, rav-gullig-1 (hej)', ansikte: 'glad' },
  { id: '1b', d: 0.3 + L(5) + SVAR + L(6) + 0.6, plats: 'Närbild ansiktet', malin: [[5, 0.3], [6, 0.3 + L(5) + SVAR]], ljud: [RAV(7, 0.5 + L(5))],
    bild: 'Räven tittar på oss, sedan mot busken, öronen vippar och "pratar" i pausen', ljudtext: 'rav-gullig-7 (pratar)', ansikte: 'nyfiken → glad' },
  { id: '2', d: 0.3 + L(7) + 0.3, plats: 'Närbild lilla busken', malin: [[7, 0.3]], ljud: [['glimt/glimt-1', 0.3 + 1.0]],
    bild: 'Sex blå bär på lilla busken, ett glimmar på *blåbär*', ljudtext: 'glimt', ansikte: '–' },
  { id: '2r', d: R, plats: 'Närbild ansiktet', ljud: [RAV(2, 0.1)],
    bild: '**Reaktion:** kawaii-ögon, öronen upp', ljudtext: 'rav-gullig-2 (förtjust)', ansikte: 'kawaii' },
  { id: '3', d: 1.4 + L(8) + 0.5, plats: 'Halvbild vid lilla busken', malin: [[8, 1.4]], ljud: [PRASSEL(0.2), RAV('4', 1.5 + L(8))],
    bild: 'Rörelsen först: tassen når ett bär, tar det, och så två till. Tre bär ligger på tassarna framför magen (posen magen)', ljudtext: 'prassel, rav-gullig-4 (mysig suck)', ansikte: 'glad' },
  { id: '4', d: 1.0 + L(9) + 0.3, plats: 'Närbild tassarna', malin: [[9, 1.0]], ljud: [PLUPP(0.5), RULL(0.6)],
    bild: 'Räven tar ett fjärde bär: ett bär tippar över tassens kant, faller i en kort båge till gräset och rullar ut åt vänster. Bäret rullar först, sedan Malin', ljudtext: 'plupp, rull', ansikte: '–' },
  { id: '4r', d: R, plats: 'Närbild ansiktet', ljud: [RAV(5, 0.1)],
    bild: '**Reaktion:** förvånad (0,3 s stilla), öronen rakt upp', ljudtext: 'rav-gullig-5 (nyfiken)', ansikte: 'förvånad' },
  { id: '5', d: 1.0 + L(10) + 1.0, plats: 'Halvbild', malin: [[10, 1.0]], ljud: [PLUPP(0.4), RULL(0.5)],
    bild: 'Ett bär till rullar iväg. Räven tittar efter det (ögonen följer), öronen faller 12°, svansen sjunker', ljudtext: 'plupp, rull', ansikte: 'ledsen' },
  { id: '5b', d: 0.3 + L(11) + SVAR + L(12) + 1.0 + L(13) + 0.5, plats: 'Närbild ansiktet', malin: [[11, 0.3], [12, 0.3 + L(11) + SVAR], [13, 0.3 + L(11) + SVAR + L(12) + 1.0]], ljud: [RAV(6, 0.5 + L(11))],
    bild: 'Räven tittar ner på tassarna, sedan på oss, skakar på huvudet och svarar trumpet i pausen', ljudtext: 'rav-gullig-6 (trumpen, mjuk)', ansikte: 'ledsen → tänker' },

  // --- Kritan ritar korgen ---
  { id: '6a', d: 0.3 + L(14) + 0.8, plats: 'Halvbild', malin: [[14, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3]],
    bild: 'Kritan flyger in uppe till höger och ritar korgen i gräset framför räven: kroppen, öppningens oval, handtaget, två flätstreck', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '6b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s: konturen klar, kritan svävar och svajar (knackar aldrig)', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '6c', d: 0.2 + L(15) + 0.4, plats: 'Halvbild', malin: [[15, 0.2]], ljud: [['glitter/glitter-2', 0.0]],
    bild: 'Korgen fylls i inifrån, krit-gnistor. *Varsågod*', ljudtext: 'glitter', ansikte: 'nyfiken' },
  { id: '6r', d: R, plats: 'Närbild ansiktet', ljud: [RAV('2b', 0.1)],
    bild: '**Reaktion:** kawaii-ögon, öronen reser sig', ljudtext: 'rav-gullig-2b (förtjust)', ansikte: 'kawaii' },
  { id: '7', d: 0.3 + L(17) + 0.8, plats: 'Halvbild', malin: [[17, 0.3]], ljud: [RAV('5b', 0.4 + L(17))],
    bild: 'Malin säger tack direkt, räven nickar på *Tack!* (posen stolt)', ljudtext: 'rav-gullig-5b', ansikte: 'jätteglad' },
  { id: '8', d: 0.6 + L(18) + 0.6, plats: 'Närbild korgen', malin: [[18, 0.6]], ljud: [PLUPP(0.6 + 2.16), PLUPP(0.6 + 2.36), RAV('7b', 0.8 + L(18))],
    bild: 'Bären faller ur tassarna över korgens kant och ner, ett per *plopp* (korgens framkant framför bären)', ljudtext: 'plupp ×2 på orden, rav-gullig-7b (pratar)', ansikte: '–' },
  { id: '9', d: 0.3 + L(19) + SVAR, plats: 'Halvbild', malin: [[19, 0.3]], ljud: [RAV('2c', 0.5 + L(19))],
    bild: 'Räven tar ett bär ur korgen och tittar på det, nickar i pausen', ljudtext: 'rav-gullig-2c (förtjust)', ansikte: 'nyfiken → glad' },
  { id: '9b', d: 0.3 + L(20) + SVAR + L(21) + 0.5, plats: 'Närbild ansiktet', malin: [[20, 0.3], [21, 0.3 + L(20) + SVAR]], ljud: [NOM(0.3), RAV('4b', 0.6 + L(20))],
    bild: 'Bäret är borta på *Mums!*, räven blundar nöjt (raden ber om stängda ögon)', ljudtext: 'nom, rav-gullig-4b (mysig suck)', ansikte: 'mums' },
  { id: '9c', d: 0.8 + L(22) + 0.5, plats: 'Närbild ansiktet', malin: [[22, 0.8]], ljud: [FNISS(1, 0.2)],
    bild: 'Tungan först: räven räcker ut tungan, den är blå. Fnissar', ljudtext: 'rav-fniss-1', ansikte: 'fnissig, blå tunga' },

  // --- Plocka, plocka … i korgen (lilla busken) ---
  { id: '10', d: 0.3 + L(23) + SVAR + L(24) + 0.5, plats: 'Halvbild', malin: [[23, 0.3], [24, 0.3 + L(23) + SVAR]], ljud: [RAV('7c', 0.5 + L(23))],
    bild: 'Räven tittar på busken och på korgen, "pratar" och nickar i pausen', ljudtext: 'rav-gullig-7c (pratar)', ansikte: 'glad' },
  { id: '11', d: 0.3 + L(25) + 0.6, plats: 'Halvnära vid lilla busken', malin: [[25, 0.3]], ljud: [PRASSEL(0.3 + 1.4), PLUPP(0.3 + 2.0), PLUPP(0.3 + 2.5), PLUPP(0.3 + 3.3), RAV(2, 0.6 + L(25))],
    bild: 'Korgen under bären. Ett bär faller i korgen på varje *plocka*, det tredje landar på *i korgen!*', ljudtext: 'prassel, plupp ×3, rav-gullig-2 (förtjust)', ansikte: 'glad' },

  // --- Stora busken: för högt, kritan ritar pallen ---
  { id: '12a', d: 2.6, plats: 'Gröna skogen, helbild', ljud: [TASS(3, 0.3), TASS(4, 0.9), TASS(5, 1.5), KORG(2.2)],
    bild: 'Räven bär korgen (handtaget över tasspetsen) förbi stubben till stora busken och ställer ner den', ljudtext: 'tass, korgen ställs ner', ansikte: 'glad' },
  { id: '12b', d: 0.2 + L(26) + 0.5, plats: 'Närbild toppen av stora busken', malin: [[26, 0.2]], ljud: [RAV('5c', 0.4 + L(26))],
    bild: 'Bären sitter högst upp. Klipp hit på *högt uppe*', ljudtext: 'rav-gullig-5c (nyfiken)', ansikte: '–' },
  { id: '13', d: 1.4 + L(27) + SVAR + L(28) + 0.8, plats: 'Halvbild vid stora busken', malin: [[27, 1.4], [28, 1.4 + L(27) + SVAR]], ljud: [RAV('6b', 1.6 + L(27))],
    bild: 'Räven sträcker på sig (posen strack), tassen når inte. En gång till. Sjunker ihop, öronen ner', ljudtext: 'rav-gullig-6b (trumpen)', ansikte: 'tänker → ledsen' },
  { id: '14a', d: 0.3 + L(29) + 0.8, plats: 'Halvbild', malin: [[29, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.3]],
    bild: 'Kritan kommer in igen och ritar en pall på marken vid busken: stegen i ett drag, sedan stegytorna', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '14b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s, kritan svävar', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '14c', d: 0.2 + L(30) + 0.4, plats: 'Halvbild', malin: [[30, 0.2]], ljud: [['glitter/glitter-3', 0.0]],
    bild: 'Pallen fylls i. *Varsågod*', ljudtext: 'glitter', ansikte: 'nyfiken' },
  { id: '14r', d: 0.3 + L(31) + 0.5, plats: 'Närbild ansiktet', malin: [[31, 0.3]], ljud: [RAV('2d', 0.4 + L(31))],
    bild: '**Reaktion:** räven strålar och nickar. Malin: *Tack, kritan!*', ljudtext: 'rav-gullig-2d (förtjust)', ansikte: 'jätteglad' },
  { id: '15', d: 0.4 + L(32) + 0.6, plats: 'Helbild', malin: [[32, 0.4]], ljud: [TASS(1, 0.4 + 2.1), TASS(2, 0.4 + 3.0), RAV('3b', 0.6 + L(32))],
    bild: 'Räven kliver upp på pallen: ett lugnt skutt per steg, landar på *ett steg* och *två steg*', ljudtext: 'tass ×2, rav-gullig-3b (kort fniss)', ansikte: 'glad' },
  { id: '16', d: 0.3 + L(33) + 0.6, plats: 'Halvnära, räven på pallen', malin: [[33, 0.3]], ljud: [PRASSEL(0.3 + 1.3), PLUPP(0.3 + 1.9), PLUPP(0.3 + 2.4), PLUPP(0.3 + 3.1)],
    bild: 'Korgen i gräset bredvid pallen. Ett bär faller i korgen på varje *plocka*, det tredje på *i korgen!*', ljudtext: 'prassel, plupp ×3', ansikte: 'glad' },
  { id: '17a', d: 0.9, plats: 'Halvbild', ljud: [TASS(3, 0.5)], bild: 'Räven kliver ner från pallen', ljudtext: 'tass', ansikte: 'glad' },
  { id: '17', d: 0.3 + L(34) + 0.3, plats: 'Närbild korgen', malin: [[34, 0.3]], ljud: [['tindra/tindra-3', 0.3 + 1.6]],
    bild: 'Många bär i korgen, plats kvar överst. Närbild på *korgen*', ljudtext: 'tindra', ansikte: '–' },
  { id: '17r', d: R, plats: 'Närbild ansiktet', ljud: [RAV('4c', 0.1)], bild: '**Reaktion:** stolt, hakan upp', ljudtext: 'rav-gullig-4c (mysig suck)', ansikte: 'stolt' },

  // --- Var finns fler? Barnet hittar busken bakom stubben ---
  { id: '18', d: 0.4 + L(35) + 0.6, plats: 'Halvbild', malin: [[35, 0.4]], ljud: [RAV(5, 0.2)],
    bild: 'Räven tittar ner i korgen, sedan åt vänster och åt höger (ögonen följer, huvudet vänds inte)', ljudtext: 'rav-gullig-5 (nyfiken)', ansikte: 'nyfiken' },
  { id: '19a', d: 0.3 + L(36) + 1.2, plats: 'Gröna skogen, helbild', malin: [[36, 0.3]],
    bild: 'Bred bild för frågan: räven vid stora busken, stubben i mitten', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '19b', d: 4.0, plats: 'Närbild stubben (klipp)', ljud: [['glimt/glimt-1', 2.0]],
    bild: 'Kvisten med två blad och ett blått bär sticker fram vid stubbens sida. Skimrar svagt efter 3 s. Närbilden glider sakta inåt. Pausen ca 5 s', ljudtext: 'glimt svagt', ansikte: '–' },
  { id: '20', d: 0.2 + L(37) + 0.3, plats: 'Närbild stubben', malin: [[37, 0.2]], ljud: [['tindra/tindra-4', 0.1]],
    bild: 'Bäret skimrar tydligt på *Ja, där!*', ljudtext: 'tindra', ansikte: '–' },
  { id: '20r', d: R, plats: 'Närbild ansiktet', ljud: [RAV('2b', 0.1)], bild: '**Reaktion:** jätteglad, ett litet glatt skutt (20 px, inget studs)', ljudtext: 'rav-gullig-2b (förtjust)', ansikte: 'jätteglad' },
  { id: '21', d: 1.4 + L(38) + 0.6, plats: 'Halvnära vid stubben', malin: [[38, 1.4]], ljud: [PRASSEL(1.4 + 1.3), PLUPP(1.4 + 1.9), PLUPP(1.4 + 2.4), PLUPP(1.4 + 3.1)],
    bild: 'Korgen står redan bredvid stubben (kodscenen). Räven vänder sig mot stubben och sträcker sig. Första bäret är det på kvisten, de två andra kommer upp bakom stubben. Det tredje landar på *i korgen!*', ljudtext: 'prassel, plupp ×3', ansikte: 'glad' },
  { id: '22', d: 0.3 + L(39) + 0.3, plats: 'Närbild korgen', malin: [[39, 0.3]], ljud: [['tindra/tindra-3', 0.3]],
    bild: 'En hög av blåbär över kanten, glimt', ljudtext: 'tindra', ansikte: '–' },
  { id: '22r', d: R, plats: 'Närbild ansiktet', ljud: [RAV('7d', 0.1)], bild: '**Reaktion:** stolt, svansen viftar', ljudtext: 'rav-gullig-7d (pratar)', ansikte: 'stolt' },

  // --- Smakar, blå nos, hej då ---
  { id: '23', d: 0.6 + L(40) + 0.5, plats: 'Halvbild', malin: [[40, 0.6]], ljud: [NOM(0.6 + 1.88), NOM(0.6 + 2.31)],
    bild: 'Räven lutar sig fram och sänker nosen bakom korgens framkant (går inte genom korgen), smaskar på *Mums, mums!*', ljudtext: 'nom ×2 på orden', ansikte: 'mums' },
  { id: '23b', d: 0.8 + L(41) + 0.5, plats: 'Närbild ansiktet', malin: [[41, 0.8]], ljud: [FNISS(3, 0.2)],
    bild: 'Nosen först: räven kommer upp, nosen är blå. Räcker ut tungan: blå. Skrattar', ljudtext: 'rav-fniss-3', ansikte: 'skrattar, blå nos och tunga' },
  { id: '24', d: 0.4 + L(42) + 0.6, plats: 'Närbild ansiktet', malin: [[42, 0.4]], ljud: [RAV('4d', 0.6 + L(42))],
    bild: 'Räven ler stort (flinar): små blå fläckar på tänderna (som 055)', ljudtext: 'rav-gullig-4d (mysig suck)', ansikte: 'flinar' },
  { id: '25', d: 0.6 + L(43) + 0.8, plats: 'Halvbild', malin: [[43, 0.6]], ljud: [RAV(8, 0.8 + L(43))],
    bild: 'Räven vinkar (armen bakom kroppen), korgen bredvid, nosen fortfarande blå. **Hej då med vinkning**', ljudtext: 'rav-gullig-8 (hej då)', ansikte: 'glad' },
  { id: '26', d: 0.4 + L(44) + 1.2, plats: 'Halvbild', malin: [[44, 0.4]], ljud: [RAV('8b', 0.6 + L(44))],
    bild: 'Räven vinkar klart och sänker armen', ljudtext: 'rav-gullig-8b', ansikte: 'glad' },
  { id: '27', d: 2.0, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt räven och korgen, 0,6 s svart', ljudtext: '–', ansikte: 'glad' },
];

// Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in; frågor före. Takten som 056 (Sanna 2026-11-25): 0,4 s extra luft
// på varje rad med en replik, slutet (25–26) lugnare 0,9 s. Pauserna för barnet (01b, 6b, 14b 3 s, 19b ca 5 s) står i raderna.
export const GLES = 0.4, GLES_SLUT = 0.9;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += ['25', '26'].includes(r.id) ? GLES_SLUT : GLES;
