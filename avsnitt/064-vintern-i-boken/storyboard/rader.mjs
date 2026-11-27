// Storyboardens rader för 064 Vintern i boken: en stillbild per uppslag i manus.md (förlaga: 063 rader.mjs).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna i three.js-boken (scen.html + scen.js), skriver tabellen i
// storyboard.md, index.html och animatiken.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ (utan .m4a), s in, volym?]].
// s = bildens läge i boken (scen.js läser det).
//
// Malins repliker, uppmätta (filernas längd efter normalisering). Tagning 1, grind 3 godkänd 2026-11-27.
// Orden som bilden träffar är mätta med whisper (ord för ord) 2026-11-27 och står vid raderna (ORD).
export const UPPSKATTAD = false;
export const ROST = [
  ['01-titta-en-bok', 1.43, 'Titta! En bok.'],
  ['02-vinter-i-boken', 1.97, 'Oj, det är vinter i boken.'],
  ['03-var-ar-snon', 2.34, 'Det är kallt. Men var är snön?'],
  ['04-kritan-ritar', 1.62, 'Kritan ritar …'],
  ['05-vad-blir-det', 1.95, 'Hm … vad blir det nu?'],
  ['06-en-snoflinga', 1.24, 'En snöflinga.'],
  ['07-det-snoar', 1.73, 'Titta, det snöar.'],
  ['08-vit-och-kall', 2.13, 'Snön är vit och kall.'],
  ['09-hej-kaninen', 2.27, 'Hej, kaninen! Hej, hej!'],
  ['10-tycker-om-snon', 1.65, 'Tycker du om snön, kaninen?'],
  ['11-leka-i-snon', 1.99, 'Jaså, du vill leka i snön.'],
  ['12-snon-knarrar', 3.75, 'Knarr, knarr. Snön knarrar när du går.'],
  ['13-landar-pa-oronen', 1.72, 'Snön landar på öronen.'],
  ['14-fryser-du', 1.38, 'Fryser du om öronen?'],
  ['15-vad-gor-vi-nu', 1.64, 'Hm … vad gör vi nu?'],
  ['16-kritan-ritar-nagot', 2.40, 'Titta, kritan ritar något.'],
  ['17-ett-pannband-varsagod', 2.92, 'Ett pannband! Varsågod, kaninen.'],
  ['18-tack-kritan', 1.09, 'Tack, kritan!'],
  ['19-tar-pa-pannbandet', 1.85, 'Kaninen tar på sig pannbandet.'],
  ['20-bara-ett-ora', 2.61, 'Plopp! … Oj, bara ett öra.'],
  ['21-dar-kom-det', 2.51, 'Plopp! Där kom det.'],
  ['22-skont-med-pannbandet', 1.95, 'Är det skönt med pannbandet?'],
  ['23-oronen-varma', 3.39, 'Mmm, nu är öronen varma igen.'],
  ['24-gora-snogubbe', 1.53, 'Ska du göra en snögubbe?'],
  ['25-ja-en-stor', 1.59, 'Ja, en stor!'],
  ['26-rulla-snoboll', 2.67, 'Rulla, rulla … snöboll!'],
  ['27-stor-mellan-liten', 2.79, 'En stor, en mellan och en liten.'],
  ['28-en-tva-tre', 2.74, 'En, två, tre snöbollar.'],
  ['29-sno-pa-huvudet', 2.71, 'Hoppsan! Snö på huvudet.'],
  ['30-vem-piper', 1.21, 'Vem är det som piper?'],
  ['31-det-ar-faglarna', 2.78, 'Det är fåglarna! De sitter i trädet.'],
  ['32-en-rod-fagel', 1.32, 'En röd fågel.'],
  ['33-en-bla-fagel', 1.30, 'En blå fågel.'],
  ['34-och-en-gul', 1.33, 'Och en gul fågel.'],
  ['35-faglarna-sager-hej', 2.45, 'Fåglarna säger hej till dig, kaninen.'],
  ['36-vad-ska-det-bli', 2.82, 'Tre snöbollar … vad ska det bli av dem?'],
  ['37-ja-en-snogubbe', 1.76, 'Ja, en snögubbe!'],
  ['38-roligt-i-snon', 1.72, 'Var det roligt i snön, kaninen?'],
  ['39-hej-da-kaninen', 1.14, 'Hej då, kaninen!'],
  ['40-hej-da-snoflingan', 1.30, 'Hej då, snöflingan!'],
  ['41-hej-da-faglarna', 1.12, 'Hej då, fåglarna!'],
  ['42-hej-da-snogubben', 1.29, 'Hej då, snögubben!'],
  ['43-vi-ses-snart', 2.49, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];
// ordens tider i sina filer (whisper, s)
const ORD = { snoflinga: 0.37, knarr1: 0.06, knarr2: 0.73, plopp1: 0.05, plopp2: 0.15, snoboll: 1.2, stor: 0.22, mellan: 1.11, liten: 2.4,
  en: 0.06, tva: 0.72, tre: 1.15, rod: 0.26, bla: 0.27, gul: 0.49, snogubbe: 0.75 };

// Kaninens röst (grind 4, ljud-effekter.md): kanin-gullig, kanin-ny, kanin-tack; aldrig samma två rader i följd
const K = (fil, o) => [(fil.startsWith('kanin-ny') ? 'kanin-ny/' : fil.startsWith('kanin-tack') ? 'kanin-tack/' : 'kanin-gullig/') + fil, o];
const SVAR = 1.6;   // kaninens svar i pausen mellan Malins fråga och hennes reaktion (som 062 och 063)
const GISS = 3.0;   // gisspausen (manus: alltid 3 s)
export const MATTA = ['vinterljud/vinterljud-2', 0.25];   // mattan under hela scenen (bygg.mjs slingar den)

// Lägena. Varje rad ändrar bara det som är nytt, resten ärvs från raden före.
// sno: 0 frostigt | 1 vitt. snofall: 0 | 1 glest | 2 tätare. flinga: nej | kontur | ja. kanin: nere | uppe; plats: mitt | steg | bollar | gran | trad | vid-bollar.
// pannband: nej | kontur | kort | pa. bollar: 0–3. gubbe: snögubben uppe. oronsno, puff, tuss, spar (fotspåren). glimt: null | bollar | faglar | flinga | gubbe.
const START = { vy: 'bord', parm: 0, kort: 0, sno: 0, snofall: 0, flinga: 'nej', kanin: 'nere', plats: 'mitt', pannband: 'nej', bollar: 0, gubbe: false,
  kritan: false, oronsno: false, puff: false, tuss: false, spar: false, glimt: null };

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', s: { ...START, vy: 'logga' } },

  // --- Boken öppnas, det är vinter men ingen snö ---
  { id: '01a', d: 0.3 + L(1) + 0.3, plats: 'Skrivbordet, helbild', malin: [[1, 0.3]], ljud: [['glimt/glimt-1', 0.2]],
    bild: 'Den stängda blå boken med snöflingans siluett, kameran driver lugnt mot den', ljudtext: 'vinterljud lågt (hela scenen), glimt', s: { ...START } },
  { id: '01b', d: 0.5 + L(2) + 0.4, plats: 'Skrivbordet, kameran börjar glida in', malin: [[2, 0.5]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6, 0.5]],
    bild: 'Pärmen slås upp med den bleka vinterhimlen, korten fälls upp. Kullarna är frostigt grågröna, granarna och det kala trädet utan snö, fåglarna sitter i trädet. Kaninens kort ligger kvar nedfällt', ljudtext: 'prassel-tyg, pop mjukt', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '02', d: 0.2 + L(3) + 0.6, plats: 'Himlen och kullarna, halvbild', malin: [[3, 0.2]],
    bild: 'Kameran har glidit in mot himlen och kullarna. Allt är frostigt och kalt, molnen glider', ljudtext: '–', s: { vy: 'himmel' } },
  { id: '03', d: 0.4 + L(4) + 0.6 + L(5) + GISS, plats: 'Himlen, närbild', malin: [[4, 0.4], [5, 0.4 + L(4) + 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: '**Gissa 1.** Kritan ritar snöflingans kontur på himlen: mitten och de sex armarna, sidogrenarna som detaljstreck. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'flinga', flinga: 'kontur', kritan: true } },
  { id: '04', d: 0.5 + L(6) + 0.8, plats: 'Himlen, närbild', malin: [[6, 0.5]], ljud: [['glitter/glitter-1', 0.1], ['tindra/tindra-1', 0.5 + ORD.snoflinga]],
    bild: 'Snöflingan fylls i inifrån och glimtar på *"snöflinga"*', ljudtext: 'glitter, tindra', s: { flinga: 'ja', kritan: false } },
  { id: '05', d: 0.3 + L(7) + 1.0, plats: 'Uppslaget, bred', malin: [[7, 0.3]],
    bild: 'Snön börjar falla, långsamt och glest: små platta vita kritflingor som vajar', ljudtext: 'vinterljud', s: { vy: 'bred', snofall: 1 } },
  { id: '05b', d: 0.3 + L(8) + 1.5, plats: 'Uppslaget, bred', malin: [[8, 0.3]], ljud: [['tindra/tindra-2', 0.3, 0.4]],
    bild: 'Marken blir vit nerifrån och upp, snön växer in på kullarna, granarna och trädet uppifrån och ner (ca 5 s, lugnt). Fåglarna sitter ovanpå snön', ljudtext: 'tindra svagt', s: { sno: 1, snofall: 2 } },

  // --- Hej, kaninen ---
  { id: '06', d: 0.7 + L(9) + 1.2, plats: 'Kaninens plats, halvbild', malin: [[9, 0.7]], ljud: [['pop/pop-1', 0.2], K('kanin-hej-4', 0.7 + L(9) + 0.2)],
    bild: 'Kaninens kort fälls upp mitt i snön med en liten efterstudsning. Kaninen vinkar (armen bakom kroppen, snett ut förbi kanten)', ljudtext: 'pop, kanin-hej-4', s: { vy: 'halv', kanin: 'uppe', snofall: 1 } },
  { id: '06b', d: 0.2 + L(10) + SVAR + L(11) + 0.8, plats: 'Kaninens plats, halvbild', malin: [[10, 0.2], [11, 0.2 + L(10) + SVAR]],
    ljud: [K('kanin-ny-fortjust-1', 0.2 + L(10) + 0.2), ['knarr-sno/knarr-sno-1', 0.2 + L(10) + 0.8, 0.5]],
    bild: 'Kaninen tittar runt på snön och sedan på oss. Pausen: förtjust pip, två små skutt med snöpuffar vid fötterna', ljudtext: 'kanin-ny-fortjust-1, knarr-sno', s: {} },
  { id: '06c', d: 0.8 + L(12) + 0.8, plats: 'Kaninens plats, halvbild', malin: [[12, 0.8]],
    ljud: [['knarr-sno/knarr-sno-2', 0.1, 0.6], ['knarr-sno/knarr-sno-3', 0.8 + ORD.knarr1, 0.6], ['knarr-sno/knarr-sno-4', 0.8 + ORD.knarr2, 0.6]],
    bild: 'Kaninen går några lugna steg åt höger, små fotspår syns i snön. Ett knarr per steg, två av dem på Malins *"Knarr, knarr"*', ljudtext: 'knarr-sno per steg', s: { plats: 'steg', spar: true } },
  { id: '07', d: 0.6 + L(13) + 1.4, plats: 'Kaninen, närbild', malin: [[13, 0.6]], ljud: [K('kanin-ny-brr-1', 0.6 + L(13) + 0.2)],
    bild: 'Flingor landar långsamt på öronspetsarna och ligger kvar. Öronen sjunker lite, spetsarna blir frostblå, en liten huttring, andedräkten blir ett litet vitt moln', ljudtext: 'kanin-ny-brr-1', s: { vy: 'nara', oronsno: true, puff: true } },
  { id: '07b', d: 0.2 + L(14) + SVAR + L(15) + 1.2, plats: 'Kaninen, närbild', malin: [[14, 0.2], [15, 0.2 + L(14) + SVAR]], ljud: [K('kanin-ny-fragande-1', 0.2 + L(14) + SVAR + L(15) + 0.2)],
    bild: 'Kaninen huttrar lite och tittar på oss. Pausen: en liten nick. Efter *"vad gör vi nu?"*: frågande pip', ljudtext: 'kanin-ny-fragande-1', s: {} },

  // --- Pannbandet ---
  { id: '08', d: 0.4 + L(16) + GISS, plats: 'Snön bredvid kaninen, nära', malin: [[16, 0.4]], ljud: [['krita-ritar/krita-ritar-2', 0.2]],
    bild: '**Gissa 2.** Kritan ritar pannbandets båge på snön bredvid kaninen, sedan randen och ribborna. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'pannband', pannband: 'kontur', kritan: true, puff: false } },
  { id: '09', d: 0.6 + L(17) + 1.2, plats: 'Snön bredvid kaninen, nära', malin: [[17, 0.6]], ljud: [['glitter/glitter-2', 0.1], ['pop/pop-2', 0.85], K('kanin-gullig-2', 0.6 + L(17) + 0.2)],
    bild: 'Pannbandet fylls i, kortet fälls upp. Kaninen ser det, stora glada ögon', ljudtext: 'glitter, pop, kanin-gullig-2', s: { pannband: 'kort', kritan: false } },
  { id: '10', d: 0.3 + L(18) + 1.2, plats: 'Kaninen, närbild', malin: [[18, 0.3]], ljud: [K('kanin-tack-1', 0.3 + L(18) + 0.2)],
    bild: 'Kaninen nickar', ljudtext: 'kanin-tack-1', s: { vy: 'nara' } },
  { id: '11', d: 0.6 + L(19) + 0.8, plats: 'Kaninens plats, halvbild', malin: [[19, 0.6]], ljud: [['swoosh/swoosh-1', 0.1, 0.5]],
    bild: 'Pannbandet glider lugnt i en båge ner över öronen (ca 1 s), öronen trycks ihop under bandet, flingorna faller av', ljudtext: 'swoosh mjukt', s: { vy: 'halv', pannband: 'pa', oronsno: false } },
  { id: '12', d: 0.4 + L(20) + 1.2, plats: 'Kaninen, närbild', malin: [[20, 0.4]], ljud: [['pop/pop-3', 0.4 + ORD.plopp1, 0.5], K('kanin-ny-fragande-2', 0.4 + L(20) + 0.2)],
    bild: 'På *"Plopp!"* kommer vänster öra upp ur bandet, det högra stannar under. Kaninen tittar upp mot det och vickar lite på huvudet', ljudtext: 'pop litet, kanin-ny-fragande-2', s: { vy: 'nara' } },
  { id: '12b', d: 0.4 + L(21) + 1.2, plats: 'Kaninen, närbild', malin: [[21, 0.4]], ljud: [['pop/pop-4', 0.4 + ORD.plopp2, 0.5], K('kanin-ny-fniss-1', 0.4 + L(21) + 0.2)],
    bild: 'På *"Plopp!"* kommer det högra örat upp. Kaninen fnissar', ljudtext: 'pop litet, kanin-ny-fniss-1', s: {} },
  { id: '13', d: 0.2 + L(22) + SVAR + L(23) + 1.0, plats: 'Kaninen, närbild', malin: [[22, 0.2], [23, 0.2 + L(22) + SVAR]], ljud: [K('kanin-ny-mmm-1', 0.2 + L(22) + 0.2)],
    bild: 'Frosten på spetsarna tonas bort, öronen reser sig. Pausen: mysig suck, kaninen blundar glatt', ljudtext: 'kanin-ny-mmm-1', s: {} },

  // --- Snöbollarna ---
  { id: '14', d: 0.2 + L(24) + SVAR + L(25) + 1.0, plats: 'Snöfältet, halvbild', malin: [[24, 0.2], [25, 0.2 + L(24) + SVAR]], ljud: [K('kanin-ny-fortjust-2', 0.2 + L(24) + 0.2)],
    bild: 'Kaninen tittar ut över snön. Pausen: förtjust pip, nick', ljudtext: 'kanin-ny-fortjust-2', s: { vy: 'halv', snofall: 1 } },
  { id: '15', d: 0.4 + L(26) + 0.8, plats: 'Snöbollarna, halvbild', malin: [[26, 0.4]],
    ljud: [['rull/rull-1', 0.0, 0.6], ['knarr-sno/knarr-sno-1', 0.3, 0.4], ['sno-duns/sno-duns-1', 0.4 + ORD.snoboll]],
    bild: 'Kaninen (riktningsposen, raka armar framåt) rullar en boll åt vänster, den växer till den stora och stannar på *"snöboll"*. Ett mjukt spår i snön', ljudtext: 'rull, knarr-sno, sno-duns på "snöboll"', s: { vy: 'bollar', plats: 'bollar', bollar: 1 } },
  { id: '15b', d: 0.4 + L(26) + 1.0, plats: 'Snöbollarna, halvbild', malin: [[26, 0.4]],
    ljud: [['rull/rull-1', 0.0, 0.6], ['sno-duns/sno-duns-2', 0.4 + ORD.snoboll], K('kanin-ny-ja-1', 0.4 + L(26) + 0.2)],
    bild: 'En mellanstor boll rullas fram och stannar bredvid på *"snöboll"*', ljudtext: 'rull, sno-duns, kanin-ny-ja-1', s: { bollar: 2 } },
  { id: '15c', d: 0.4 + L(26) + 1.0, plats: 'Snöbollarna, halvbild', malin: [[26, 0.4]],
    ljud: [['rull/rull-1', 0.0, 0.6], ['sno-duns/sno-duns-1', 0.4 + ORD.snoboll], K('kanin-ny-jippi-1', 0.4 + L(26) + 0.2)],
    bild: 'En liten boll rullas fram och stannar på *"snöboll"*', ljudtext: 'rull, sno-duns, kanin-ny-jippi-1', s: { bollar: 3 } },
  { id: '16', d: 0.4 + L(27) + 0.8, plats: 'Snöbollarna, halvbild', malin: [[27, 0.4]],
    ljud: [['glimt/glimt-1', 0.4 + ORD.stor], ['glimt/glimt-2', 0.4 + ORD.mellan], ['glimt/glimt-1', 0.4 + ORD.liten]],
    bild: 'De tre bollarna på rad. Varje boll glimtar på sitt ord: *"stor"*, *"mellan"*, *"liten"*', ljudtext: 'glimt per boll', s: { glimt: 'bollar' } },
  { id: '16b', d: 0.4 + L(28) + 0.8, plats: 'Snöbollarna, halvbild', malin: [[28, 0.4]],
    ljud: [['glimt/glimt-2', 0.4 + ORD.en], ['glimt/glimt-2', 0.4 + ORD.tva], ['glimt/glimt-2', 0.4 + ORD.tre]],
    bild: 'Varje boll studsar lite på sitt räkneord: *"En, två, tre"*', ljudtext: 'glimt per boll', s: {} },

  // --- Snö på huvudet, det piper ---
  { id: '17', d: 0.5 + L(29) + 1.2, plats: 'Kaninen vid granen, närbild', malin: [[29, 0.5]], ljud: [['sno-duns/sno-duns-2', 0.2, 0.5], K('kanin-gullig-3', 0.5 + L(29) + 0.2)],
    bild: 'Kaninen står vid granen. En snötuss glider av grenen och landar ovanpå huvudet mellan öronen. Kaninen tittar i kors upp, skakar lugnt på huvudet, tussen faller ner bredvid', ljudtext: 'sno-duns, kanin-gullig-3 (fniss)', s: { vy: 'nara', plats: 'gran', tuss: true, glimt: null } },
  { id: '18', d: 1.4 + L(30) + GISS, plats: 'Kaninen vid granen, närbild', malin: [[30, 1.4]],
    ljud: [['fagel-pip/fagel-pip-1', 0.1], ['fagel-pip/fagel-pip-2', 0.7], K('kanin-gullig-7', 1.4 + L(30) + 0.4), ['fagel-pip/fagel-pip-3', 1.4 + L(30) + 1.8]],
    bild: '**Gissa 3.** Samma närbild, trädet syns inte. Det piper två gånger, kaninen vänder öronen mot ljudet. Gisspaus 3 s med ett pip till mitt i', ljudtext: 'fagel-pip ×3, kanin-gullig-7 (frågande)', s: { tuss: false } },
  { id: '19', d: 0.8 + L(31) + 1.0, plats: 'Trädet, halvbild', malin: [[31, 0.8]], ljud: [['glimt/glimt-1', 0.5], K('kanin-ny-fortjust-1', 0.8 + L(31) + 0.2)],
    bild: 'Kameran glider till trädet: fåglarna sitter där de suttit hela tiden och lyfter vingarna', ljudtext: 'glimt, kanin-ny-fortjust-1', s: { vy: 'trad' } },
  { id: '19b', d: 0.4 + L(32) + 0.5 + L(33) + 0.5 + L(34) + 0.8, plats: 'Trädet, närbild',
    malin: [[32, 0.4], [33, 0.4 + L(32) + 0.5], [34, 0.4 + L(32) + 0.5 + L(33) + 0.5]],
    ljud: [['fagel-pip/fagel-pip-4', 0.4 + ORD.rod], ['glimt/glimt-1', 0.4 + ORD.rod + 0.1], ['fagel-pip/fagel-pip-5', 0.4 + L(32) + 0.5 + ORD.bla], ['glimt/glimt-2', 0.4 + L(32) + 0.5 + ORD.bla + 0.1],
      ['fagel-pip/fagel-pip-6', 0.4 + L(32) + 0.5 + L(33) + 0.5 + ORD.gul], ['glimt/glimt-1', 0.4 + L(32) + 0.5 + L(33) + 0.5 + ORD.gul + 0.1]],
    bild: 'Varje fågel lyfter vingen, piper, studsar och glimtar på sitt färgord: den röda, den blå, den gula', ljudtext: 'fagel-pip + glimt per fågel', s: { vy: 'tradnara', glimt: 'faglar' } },
  { id: '20', d: 1.2 + L(35) + 1.6, plats: 'Trädet, halvbild', malin: [[35, 1.2]],
    ljud: [['knarr-sno/knarr-sno-2', 0.2, 0.5], ['knarr-sno/knarr-sno-3', 0.7, 0.5], K('kanin-ny-hej-2', 1.2 + L(35) + 0.1),
      ['fagel-pip/fagel-pip-1', 1.2 + L(35) + 0.7], ['fagel-pip/fagel-pip-3', 1.2 + L(35) + 1.0], ['fagel-pip/fagel-pip-5', 1.2 + L(35) + 1.3]],
    bild: 'Kaninen skuttar lugnt till trädet och vinkar upp mot fåglarna. De piper i tur och ordning', ljudtext: 'knarr-sno, kanin-ny-hej-2, fagel-pip ×3', s: { vy: 'halv', plats: 'trad', glimt: null } },

  // --- Snögubben ---
  { id: '21', d: 0.3 + L(36) + GISS, plats: 'Snöbollarna, halvbild', malin: [[36, 0.3]], ljud: [K('kanin-gullig-5', 0.3 + L(36) + 0.4)],
    bild: '**Gissa 4.** Halvbild mot de tre snöbollarna, kaninen står bredvid och tittar på dem. Gisspaus 3 s, bollarna glimtar svagt', ljudtext: 'kanin-gullig-5 (nyfiken)', s: { vy: 'bollar', plats: 'vid-bollar', glimt: 'bollar' } },
  { id: '22', d: 0.4 + L(37) + 1.2, plats: 'Snöbollarna, halvbild', malin: [[37, 0.4]],
    ljud: [['pop/pop-1', 0.4 + ORD.snogubbe], ['glitter/glitter-3', 0.4 + ORD.snogubbe + 0.05], ['klapp/klapp-1', 0.4 + L(37) + 0.1], K('kanin-ny-fniss-2', 0.4 + L(37) + 0.6)],
    bild: 'På *"snögubbe"* fälls bollarnas kort ner och snögubbens kort fälls upp på samma plats. Kaninen klappar', ljudtext: 'pop, glitter, klapp, kanin-ny-fniss-2', s: { bollar: 0, gubbe: true, glimt: null } },

  // --- Hej då ---
  { id: '23', d: 0.2 + L(38) + SVAR, plats: 'Kaninen, närbild', malin: [[38, 0.2]], ljud: [K('kanin-ny-jippi-2', 0.2 + L(38) + 0.2)],
    bild: 'Kaninen tittar på oss. Pausen: förtjust pip, nick', ljudtext: 'kanin-ny-jippi-2', s: { vy: 'nara' } },
  { id: '24', d: 0.5 + L(39) + 1.2, plats: 'Uppslaget, närmare halvbild', malin: [[39, 0.5]], ljud: [K('kanin-hejda-2', 0.5 + L(39) + 0.2)],
    bild: 'Kaninen vinkar (armen högre, tydligt vift)', ljudtext: 'kanin-hejda-2', s: { vy: 'hejda' } },
  { id: '24b', d: 0.3 + L(40) + 0.6, plats: 'Himlen, halvbild', malin: [[40, 0.3]], ljud: [['glimt/glimt-1', 0.5]],
    bild: 'Snöflingan på himlen glimtar', ljudtext: 'glimt', s: { vy: 'flinga-hej', glimt: 'flinga' } },
  { id: '24c', d: 0.3 + L(41) + 0.6, plats: 'Trädet, halvbild', malin: [[41, 0.3]], ljud: [['fagel-pip/fagel-pip-2', 0.4]],
    bild: 'Fåglarna lyfter vingarna och piper', ljudtext: 'fagel-pip', s: { vy: 'trad', glimt: null } },
  { id: '24d', d: 0.3 + L(42) + 0.6, plats: 'Snögubben, halvbild', malin: [[42, 0.3]], ljud: [['glimt/glimt-2', 0.5]],
    bild: 'Snögubben studsar lite och glimtar', ljudtext: 'glimt', s: { vy: 'gubbe', glimt: 'gubbe' } },
  { id: '25', d: 0.3 + L(43) + 1.4, plats: 'Uppslaget, halvbild', malin: [[43, 0.3]], ljud: [K('kanin-hejda-3', 0.3 + L(43) + 0.2)],
    bild: 'Kaninen vinkar klart, snön faller lätt', ljudtext: 'kanin-hejda-3', s: { vy: 'hejda', glimt: null } },
  { id: '26', d: 2.9, plats: 'Skrivbordet, kameran glider ut', ljud: [['prassel-tyg/prassel-tyg-1', 0.3], ['landa-mjuk/landa-mjuk-1', 1.7]],
    bild: 'Kameran glider ut ur boken. Korten fälls ner, kaninen först, pärmen slås igen och snöflingans siluett syns', ljudtext: 'prassel-tyg, landa-mjuk',
    s: { vy: 'bord', parm: 0, kort: 0, kanin: 'nere', gubbe: false, snofall: 0, spar: false } },
];
RADER.reduce((f, r) => (r.s = { ...f, ...r.s }), START);
// Lugnt tempo (manus: GLES 1,0 s, reaktionsslaget i slutet av varje rad; öppningen och slutet utan)
export const GLES = 1.0;
for (const r of RADER) if (!['00', '01a', '01b', '02', '26'].includes(r.id)) r.d += GLES;
