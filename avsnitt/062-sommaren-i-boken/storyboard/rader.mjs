// Storyboardens rader för 062 Sommaren i boken: en stillbild per uppslag i manus.md (förlaga: 059 rader.mjs).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna i three.js-boken (scen.html + scen.js), skriver tabellen i
// storyboard.md, index.html och animatiken.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, s in]].
// s = bildens läge i boken (scen.js läser det): vy, pärmen, korten, solen, glassen, blommorna, sandslottet, grodans plats.
//
// Malins repliker, uppmätta (ffprobe, −3 dBFS, Sannas tagning 1 2026-11-27). Text ur ../rost.txt.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-titta-en-bok', 1.69, 'Titta! En bok.'],
  ['02-sommar-i-boken', 2.25, 'Oj! Det är sommar i boken!'],
  ['03-var-ar-solen', 2.79, 'Himlen är blå. Men var är solen?'],
  ['04-kritan-ritar', 1.46, 'Kritan ritar …'],
  ['05-vad-blir-det', 1.69, 'Vad blir det nu?'],
  ['06-oj-en-sol', 1.49, 'Oj! En sol!'],
  ['07-hej-grodan', 1.62, 'Hej, grodan! Hej, hej!'],
  ['08-hur-ar-det', 1.01, 'Hur är det, grodan?'],
  ['09-tycker-om-sommaren', 2.01, 'Jaså, du tycker om sommaren!'],
  ['10-solen-skiner', 2.32, 'Solen skiner. Det blir varmt!'],
  ['11-puh-varm', 2.34, 'Puh! Grodan är så varm.'],
  ['12-ar-du-varm', 1.21, 'Är du varm, grodan?'],
  ['13-vad-gor-vi-nu', 1.50, 'Hm … vad gör vi nu?'],
  ['14-kritan-ritar-nagot', 2.09, 'Titta! Kritan ritar något.'],
  ['15-en-glass-varsagod', 2.23, 'En glass! Varsågod, grodan.'],
  ['16-tack-kritan', 1.00, 'Tack, kritan!'],
  ['17-smakar-mums', 2.73, 'Grodan smakar på glassen. Mums!'],
  ['18-kall-och-god', 1.53, 'Är glassen kall och god?'],
  ['19-kall-glass', 2.66, 'Mmm, kall glass när det är varmt!'],
  ['20-glass-pa-nasan', 1.98, 'Oj! Glass på näsan!'],
  ['21-hoppsan', 1.44, 'Ha ha, hoppsan!'],
  ['22-glassen-slut', 2.83, 'Nu är glassen slut. Det är fortfarande varmt.'],
  ['23-svalka-dig', 1.42, 'Ska du svalka dig i dammen?'],
  ['24-bra-ide', 1.31, 'Ja, bra idé!'],
  ['25-hopp-plask', 1.27, 'Hopp … plask!'],
  ['26-vad-skont', 1.49, 'Ah, vad skönt!'],
  ['27-sval-och-glad', 1.59, 'Nu är du sval och glad!'],
  ['28-vad-mer-finns', 1.41, 'Vad mer finns på sommaren?'],
  ['29-blommor', 0.83, 'Blommor!'],
  ['30-var-ar-blommorna', 0.83, 'Var är blommorna?'],
  ['31-kan-du-hjalpa', 1.86, 'Kan du hjälpa grodan att hitta blommor?'],
  ['32-ja-dar-blommorna', 1.29, 'Ja, där är blommorna!'],
  ['33-vad-fina', 0.93, 'Vad fina!'],
  ['34-luktar-gott', 2.05, 'Mmm … vad gott de luktar.'],
  ['35-och-sand', 0.82, 'Och sand!'],
  ['36-sandslott', 1.70, 'Titta, ett sandslott!'],
  ['37-fin-sommardag', 1.83, 'Var det en fin sommardag, grodan?'],
  ['38-hej-da-grodan', 2.14, 'Hej då, grodan! Hej då, solen!'],
  ['39-vi-ses-snart', 2.51, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];

// Grodans röst (grind 4, Sanna 2026-11-27): befintliga ljud, valen i ../ljud-effekter.md.
const G = (f, o) => [f.replace(/-\d+$/, '') + '/' + f, o];
const SVAR = 1.6;   // grodans svar i pausen mellan Malins fråga och hennes reaktion (som 056 och 059)

// Lägena. Varje rad ändrar bara det som är nytt, resten ärvs från raden före (bygg.mjs slår ihop dem).
const START = { vy: 'bord', parm: 0, kort: 0, sol: 'nej', glass: 'nej', blommor: 'gomda', slott: false, groda: 'nere', blad: 1, kritan: false, droppe: false, stank: false, vink: false, luktar: false };

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', s: { ...START, vy: 'logga' } },

  // --- Boken öppnas ---
  { id: '01a', d: 0.6 + L(1) + 0.8, plats: 'Skrivbordet, helbild', malin: [[1, 0.6]], ljud: [['skogsljud/skogsljud-1', 0], ['glimt/glimt-1', 0.2]],
    bild: 'Den stängda boken med grodans siluett, ljuset glimtar över pärmen', ljudtext: 'skogsljud lågt, glimt', s: { ...START } },
  { id: '01b', d: 0.8 + L(2) + 0.8, plats: 'Skrivbordet, kameran börjar glida in', malin: [[2, 0.8]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6]],
    bild: 'Pärmen slås upp till stående med himlen på insidan, korten fälls upp (grodan ligger kvar nedfälld)', ljudtext: 'prassel-tyg, pop mjukt', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '02', d: 0.3 + L(3) + 0.8, plats: 'Inne i boken, bred', malin: [[3, 0.3]],
    bild: 'Kameran har glidit in och stannar. Himlen är tom, molnen glider', ljudtext: '–', s: { vy: 'bred' } },
  { id: '03', d: 0.4 + L(4) + 0.6 + L(5) + 3.0, plats: 'Himlen, nära', malin: [[4, 0.4], [5, 0.4 + L(4) + 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar solens kontur på himlen: skivan, sedan tolv strålar. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'himmel', sol: 'kontur', kritan: true } },
  { id: '04', d: 0.5 + L(6) + 0.8, plats: 'Himlen, nära', malin: [[6, 0.5]], ljud: [['glitter/glitter-1', 0.1], ['tindra/tindra-2', 0.3]],
    bild: 'Solen fylls i inifrån och glimtar, ljuset blir varmare', ljudtext: 'glitter, tindra', s: { sol: 'ja', kritan: false } },

  // --- Hej, grodan ---
  { id: '05', d: 0.7 + L(7) + 1.2, plats: 'Grodans blad, halvbild', malin: [[7, 0.7]], ljud: [['pop/pop-2', 0.2], G('kvak-4', 0.7 + L(7) + 0.2)],
    bild: 'Grodans kort fälls upp på bladet. Grodan vinkar', ljudtext: 'pop, kvak (hej)', s: { vy: 'halv', groda: 'uppe', vink: true } },
  { id: '05b', d: 0.2 + L(8) + SVAR + L(9) + 0.8, plats: 'Grodans blad, halvbild', malin: [[8, 0.2], [9, 0.2 + L(8) + SVAR]], ljud: [G('kvak-dubbel-1', 0.2 + L(8) + 0.2)],
    bild: 'Grodan tittar runt och sedan på oss. Pausen: glatt kvak', ljudtext: 'kvak-dubbel (förtjust)', s: { vink: false } },
  { id: '06', d: 0.6 + L(10) + 0.8, plats: 'Grodans blad, halvbild', malin: [[10, 0.6]], ljud: [['tindra/tindra-2', 0.2]],
    bild: 'Grodan tittar upp mot solen, ljuset blir ännu varmare', ljudtext: 'tindra svagt', s: { vy: 'halv-sol' } },
  { id: '07', d: 0.5 + L(11) + 1.4, plats: 'Grodan, närbild', malin: [[11, 0.5]], ljud: [G('gran-suck-4', 0.5 + L(11) + 0.2)],
    bild: 'Grodan suckar, rosiga kinder, axlarna ner', ljudtext: 'gran-suck (puh)', s: { vy: 'nara' } },
  { id: '07b', d: 0.2 + L(12) + SVAR + L(13) + 0.8, plats: 'Grodan, närbild', malin: [[12, 0.2], [13, 0.2 + L(12) + SVAR]], ljud: [G('kvak-2', 0.2 + L(12) + 0.2)],
    bild: 'Grodan tittar på oss. Pausen: trött kvak', ljudtext: 'kvak (frågande)', s: {} },

  // --- Glassen ---
  { id: '08', d: 0.4 + L(14) + 3.0, plats: 'Gräset vid dammen, nära', malin: [[14, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar en glass på gräset bredvid grodan: konturen, skarven, två våffelstreck. Gisspaus 3 s', ljudtext: 'kritan ritar', s: { vy: 'glass', glass: 'kontur', kritan: true } },
  { id: '09', d: 0.6 + L(15) + 1.2, plats: 'Gräset vid dammen, nära', malin: [[15, 0.6]], ljud: [['glitter/glitter-1', 0.1], ['pop/pop-2', 0.85], G('kvak-dubbel-1', 0.6 + L(15) + 0.2)],
    bild: 'Glassen fylls i, kortet fälls upp. Grodan ser den, stora glada ögon', ljudtext: 'glitter, pop, kvak-dubbel (förtjust)', s: { glass: 'kort', kritan: false } },
  { id: '10', d: 0.3 + L(16) + 1.2, plats: 'Grodan, närbild', malin: [[16, 0.3]], ljud: [G('kvak-1', 0.3 + L(16) + 0.2)],
    bild: 'Grodan nickar', ljudtext: 'kvak (glad)', s: { vy: 'nara' } },
  { id: '11', d: 0.6 + L(17) + 0.8, plats: 'Grodans blad, halvbild', malin: [[17, 0.6]], ljud: [['swoosh/swoosh-1', 0.1], ['slick/slick-1', 0.6 + 2.1]],
    bild: 'Glassen glider till grodans hand. Grodan smakar, en bit av kulan är borta på "Mums"', ljudtext: 'swoosh mjukt, slick på "Mums"', s: { vy: 'halv', glass: 'hand' } },
  { id: '11b', d: 0.2 + L(18) + SVAR + L(19) + 0.8, plats: 'Grodan, närbild', malin: [[18, 0.2], [19, 0.2 + L(18) + SVAR]], ljud: [G('mus-suck-1', 0.2 + L(18) + 0.2)],
    bild: 'Grodan blundar glatt. Pausen: mysig suck', ljudtext: 'mus-suck (mysig)', s: { vy: 'nara' } },
  { id: '12', d: 0.6 + L(20) + 1.0, plats: 'Grodan, närbild', malin: [[20, 0.6]], ljud: [['plupp/plupp-2', 0.2], G('oj-oj-1', 0.6 + L(20) + 0.2)],
    bild: 'En rosa droppe faller från kulan och landar på grodans näsa. Grodan tittar i kors upp mot den', ljudtext: 'plupp, oj-oj (förvånad)', s: { droppe: true } },
  { id: '12b', d: 0.5 + L(21) + 1.2, plats: 'Grodan, närbild', malin: [[21, 0.5]], ljud: [['plupp/plupp-2', 0.2], G('olle-fniss-4', 0.5 + L(21) + 0.2)],
    bild: 'Grodan skakar lugnt på huvudet, droppen faller ner i dammen', ljudtext: 'plupp, olle-fniss', s: { droppe: false } },
  { id: '13', d: 0.6 + L(22) + 0.8, plats: 'Grodans blad, halvbild', malin: [[22, 0.6]],
    bild: 'Struten är tom, den glider ner på gräset och kortet fälls ner. Grodan tittar ut över dammen', ljudtext: '–', s: { vy: 'halv', glass: 'nej' } },

  // --- Dammen ---
  { id: '14', d: 0.2 + L(23) + SVAR + L(24) + 0.8, plats: 'Dammen, bred', malin: [[23, 0.2], [24, 0.2 + L(23) + SVAR]], ljud: [['vagor/vagor-1', 0], G('kvak-dubbel-1', 0.2 + L(23) + 0.2)],
    bild: 'Bred bild över dammen med två näckrosblad. Grodan tittar på vattnet, nickar', ljudtext: 'vågor svagt, kvak-dubbel (förtjust)', s: { vy: 'damm' } },
  { id: '15', d: 0.5 + L(25) + 0.9, plats: 'Dammen, halvbild', malin: [[25, 0.5]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.4], ['plask/plask-1', 1.4], ['droppar/droppar-1', 1.5]],
    bild: 'Grodan hoppar ut i dammen och badar: vågkortet fälls upp framför henne på "plask", vattnet stänker', ljudtext: 'hopp-mjuk, plask, droppar', s: { vy: 'halv2', blad: 'bad', stank: true } },
  { id: '15b', d: 0.4 + L(26) + 1.1, plats: 'Grodan, närbild', malin: [[26, 0.4]], ljud: [G('kvak-3', 0.4 + L(26) + 0.2)],
    bild: 'Droppar faller på grodan, hon blundar glatt', ljudtext: 'kvak (glad)', s: { vy: 'nara2', stank: false } },
  { id: '16', d: 0.3 + L(27) + 1.1, plats: 'Grodan, närbild', malin: [[27, 0.3]], ljud: [G('kvak-1', 0.3 + L(27) + 0.2)],
    bild: 'Grodan sval och glad, dropparna glittrar', ljudtext: 'kvak (glad)', s: {} },

  // --- Blommorna ---
  { id: '17', d: 0.3 + L(28) + 0.4 + L(29) + 1.2, plats: 'Dammen och busken, halvbild', malin: [[28, 0.3], [29, 0.3 + L(28) + 0.4]], ljud: [G('kvak-2', 0.3 + L(28) + 0.4 + L(29) + 0.2)],
    bild: 'Grodan tittar runt. Bakom busken sticker blommornas toppar fram, bara lite', ljudtext: 'kvak (frågande)', s: { vy: 'buske', blommor: 'toppar', blad: 2 } },
  { id: '17b', d: 0.2 + L(30) + 2.1, plats: 'Dammen och busken, halvbild', malin: [[30, 0.2]], ljud: [G('kvak-prat-1', 0.2 + L(30) + 0.2)],
    bild: 'Grodan tittar framåt, sedan åt vänster och höger', ljudtext: 'kvak-prat (frågande)', s: {} },
  { id: '18', d: 0.3 + L(31) + 5.0, plats: 'Busken, närbild', malin: [[31, 0.3]], ljud: [['glimt/glimt-2', 0.3 + L(31) + 3.0]],
    bild: 'Närbild på busken: blommornas toppar sticker fram. Skimrar svagt efter 3 s. Barnet letar (5 s)', ljudtext: 'tyst, glimt svagt när skimret börjar', s: { vy: 'buske-nara' } },
  { id: '19', d: 0.2 + L(32) + 1.3, plats: 'Busken, halvbild', malin: [[32, 0.2]], ljud: [['glimt/glimt-1', 0], ['pop/pop-2', 0.1], G('kvak-dubbel-1', 0.2 + L(32) + 0.2)],
    bild: 'Topparna skimrar tydligt, och blommornas kort fälls upp framför busken. Grodan glad', ljudtext: 'glimt, pop, kvak-dubbel (förtjust)', s: { vy: 'buske', blommor: 'uppe' } },
  { id: '20', d: 0.9 + L(33) + 1.1, plats: 'Stranden vid blommorna, halvbild', malin: [[33, 0.9]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.2], G('kvak-3', 0.9 + L(33) + 0.2)],
    bild: 'Grodan hoppar till stranden bredvid blommorna och tittar på dem', ljudtext: 'hopp-mjuk, kvak (glad)', s: { vy: 'blommor', blad: 3 } },
  { id: '21', d: 0.5 + L(34) + 1.4, plats: 'Grodan och blommorna, närbild', malin: [[34, 0.5]], ljud: [G('mus-suck-1', 0.5 + L(34) + 0.2)],
    bild: 'Grodan lutar sig mot blommorna, blundar och luktar', ljudtext: 'mus-suck (mysig)', s: { vy: 'blommor-nara', luktar: true } },

  // --- Sanden och hej då ---
  { id: '22', d: 0.3 + L(35) + 0.4 + L(36) + 1.4, plats: 'Sanden, halvbild', malin: [[35, 0.3], [36, 0.3 + L(35) + 0.4]],
    ljud: [['pop/pop-2', 0.3 + L(35) + 0.4 + 1.0], ['klapp/klapp-1', 0.3 + L(35) + 0.4 + L(36) + 0.1], G('olle-fniss-4', 0.3 + L(35) + 0.4 + L(36) + 0.5)],
    bild: 'Sandslottets kort fälls upp på "sandslott", hinken bredvid. Grodan klappar glatt', ljudtext: 'pop på "sandslott", klapp, olle-fniss', s: { vy: 'sand', slott: true, luktar: false } },
  { id: '23', d: 0.2 + L(37) + 1.4, plats: 'Grodan, närbild', malin: [[37, 0.2]], ljud: [G('kvak-dubbel-1', 0.2 + L(37) + 0.2)],
    bild: 'Grodan tittar på oss. Pausen: glatt kvak, nick', ljudtext: 'kvak-dubbel (förtjust)', s: { vy: 'nara3' } },
  { id: '24', d: 0.5 + L(38) + 1.4, plats: 'Uppslaget, halvbild', malin: [[38, 0.5]], ljud: [G('mus-hejda-1', 0.5 + L(38) + 0.2)],
    bild: 'Grodan vinkar (armen bakom kroppen), solen glimtar', ljudtext: 'mus-hejda', s: { vy: 'hejda', vink: true } },
  { id: '25', d: 0.3 + L(39) + 1.4, plats: 'Uppslaget, halvbild', malin: [[39, 0.3]], ljud: [G('mus-hejda-3', 0.3 + L(39) + 0.2)],
    bild: 'Grodan vinkar klart', ljudtext: 'mus-hejda', s: {} },
  { id: '26', d: 4.0, plats: 'Skrivbordet, kameran glider ut', ljud: [['prassel-tyg/prassel-tyg-1', 0.5], ['landa-mjuk/landa-mjuk-1', 3.2]],
    bild: 'Kameran glider ut ur boken. Korten fälls ner, grodan sist, pärmen slås igen', ljudtext: 'prassel-tyg, landa-mjuk', s: { vy: 'bord', parm: 0, kort: 0, groda: 'nere', vink: false } },
];
// varje rad ärver läget från raden före
RADER.reduce((f, r) => (r.s = { ...f, ...r.s }), START);
// Lugnare tempo (Sanna 27/11, grind 6: "a bit slower pace and more expressions"): varje rad får GLES s luft i slutet, där grodan
// reagerar (reaktionsslaget, Reaktionstid för små barn), i stället för att rörelserna blir segare.
export const GLES = 0.9;
for (const r of RADER) if (r.id !== '00' && r.id !== '26') r.d += GLES;
