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
  // tagning 2 (ElevenLabs v3, Natural, 2026-11-27): blomscenen utan gömda blommor, färgerna sägs (Sanna 27/11)
  ['40-ser-du-blommor', 1.36, 'Ser du några blommor?'],
  ['41-en-rod-blomma', 1.20, 'En röd blomma!'],
  ['42-en-gul-blomma', 1.19, 'En gul blomma!'],
  ['43-lila-och-rosa', 2.63, 'Och en lila och en rosa!'],
  // tagning 3 (ElevenLabs v3, Natural, 2026-11-27): hej då till sakerna (Sanna 27/11 "say hejdå to blommor and sandslott and dammen also")
  ['44-hej-da-blommorna', 1.37, 'Hej då, blommorna!'],
  ['45-hej-da-sandslottet', 1.71, 'Hej då, sandslottet!'],
  ['46-hej-da-dammen', 1.30, 'Hej då, dammen!'],
  // tagning 4 (ElevenLabs v3, Natural, 2026-11-27, malin-tagning-4.mp3): utkast A "kan grodan bada?" och B "frog build sand castle" (Sanna 27/11 "Både A och B")
  ['47-grodan-badar', 1.55, 'Grodan badar!'],
  ['48-ar-vattnet-svalt', 1.66, 'Är vattnet svalt, grodan?'],
  ['49-plask-plask', 1.55, 'Plask, plask, plask!'],
  ['50-hink-och-spade', 2.20, 'Titta! En hink och en spade!'],
  ['51-bygga-sandslott', 1.86, 'Ska du bygga ett sandslott, grodan?'],
  ['52-ja-vad-kul', 1.45, 'Ja, vad kul!'],
  ['53-fyller-hinken', 2.02, 'Grodan fyller hinken med sand.'],
  ['54-vand-pa-hinken', 2.25, 'Vänd på hinken … och lyft!'],
  ['55-ett-torn', 1.02, 'Ett torn!'],
  ['56-en-gang-till', 1.91, 'En gång till … och lyft!'],
  ['57-ett-tva-torn', 1.52, 'Ett, två torn!'],
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
  { id: '01a', d: 0.3 + L(1) + 0.3, plats: 'Skrivbordet, helbild', malin: [[1, 0.3]], ljud: [['skogsljud/skogsljud-1', 0], ['glimt/glimt-1', 0.2]],
    bild: 'Den stängda boken med grodans siluett, ljuset glimtar över pärmen', ljudtext: 'skogsljud lågt, glimt', s: { ...START } },
  { id: '01b', d: 0.5 + L(2) + 0.4, plats: 'Skrivbordet, kameran börjar glida in', malin: [[2, 0.5]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6]],
    bild: 'Pärmen slås upp till stående med himlen på insidan, alla kort fälls upp, också grodan och sandslottet (Sanna 27/11 runda 5 "flip up all")', ljudtext: 'prassel-tyg, pop mjukt', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '02', d: 0.2 + L(3) + 0.6, plats: 'Inne i boken, bred', malin: [[3, 0.2]],
    bild: 'Kameran har glidit in och stannar. Himlen är tom, molnen glider', ljudtext: '–', s: { vy: 'bred' } },
  { id: '03', d: 0.4 + L(4) + 0.6 + L(5) + 3.0, plats: 'Himlen, nära', malin: [[4, 0.4], [5, 0.4 + L(4) + 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar solens kontur på himlen: skivan, sedan tolv strålar. Gisspaus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'himmel', sol: 'kontur', kritan: true } },
  { id: '04', d: 0.5 + L(6) + 0.8, plats: 'Himlen, nära', malin: [[6, 0.5]], ljud: [['glitter/glitter-1', 0.1], ['tindra/tindra-2', 0.3]],
    bild: 'Solen fylls i inifrån och glimtar, ljuset blir varmare', ljudtext: 'glitter, tindra', s: { sol: 'ja', kritan: false } },

  // --- Hej, grodan ---
  { id: '05', d: 0.7 + L(7) + 1.2, plats: 'Grodans blad, halvbild', malin: [[7, 0.7]], ljud: [G('groda-hej-2', 0.7 + L(7) + 0.2)],
    bild: 'Grodan står på bladet (kortet fälldes upp med boken). Grodan vinkar', ljudtext: 'pop, kvak (hej)', s: { vy: 'halv', groda: 'uppe', vink: true } },
  { id: '05b', d: 0.2 + L(8) + SVAR + L(9) + 0.8, plats: 'Grodans blad, halvbild', malin: [[8, 0.2], [9, 0.2 + L(8) + SVAR]], ljud: [G('groda-fortjust-1', 0.2 + L(8) + 0.2)],
    bild: 'Grodan tittar runt och sedan på oss. Pausen: glatt kvak', ljudtext: 'kvak-dubbel (förtjust)', s: { vink: false } },
  { id: '06', d: 2.0, plats: 'Grodans blad, halvbild', ljud: [['tindra/tindra-2', 0.2]],   // utan "Solen skiner. Det blir varmt!" (Sanna 27/11 "vo a bit too repetative")
    bild: 'Grodan tittar upp mot solen, ljuset blir ännu varmare', ljudtext: 'tindra svagt', s: { vy: 'halv-sol' } },
  { id: '07', d: 0.5 + L(11) + 1.4, plats: 'Grodan, närbild', malin: [[11, 0.5]], ljud: [G('groda-mysig-suck-2', 0.5 + L(11) + 0.2)],
    bild: 'Grodan suckar, rosiga kinder, axlarna ner', ljudtext: 'gran-suck (puh)', s: { vy: 'nara' } },
  { id: '07b', d: 0.3 + SVAR + L(13) + 0.8, plats: 'Grodan, närbild', malin: [[13, 0.3 + SVAR]], ljud: [G('groda-nyfiken-1', 0.3)],   // utan "Är du varm, grodan?"
    bild: 'Grodan tittar på oss. Pausen: trött kvak', ljudtext: 'kvak (frågande)', s: {} },

  // --- Glassen ---
  { id: '08', d: 0.4 + L(14) + 3.0, plats: 'Gräset vid dammen, nära', malin: [[14, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar en glass på gräset bredvid grodan: konturen, skarven, två våffelstreck. Gisspaus 3 s', ljudtext: 'kritan ritar', s: { vy: 'glass', glass: 'kontur', kritan: true } },
  { id: '09', d: 0.6 + L(15) + 1.2, plats: 'Gräset vid dammen, nära', malin: [[15, 0.6]], ljud: [['glitter/glitter-1', 0.1], ['pop/pop-2', 0.85], G('groda-fortjust-2', 0.6 + L(15) + 0.2)],
    bild: 'Glassen fylls i, kortet fälls upp. Grodan ser den, stora glada ögon', ljudtext: 'glitter, pop, kvak-dubbel (förtjust)', s: { glass: 'kort', kritan: false } },
  { id: '10', d: 0.3 + L(16) + 1.2, plats: 'Grodan, närbild', malin: [[16, 0.3]], ljud: [G('groda-prat-1', 0.3 + L(16) + 0.2)],
    bild: 'Grodan nickar', ljudtext: 'kvak (glad)', s: { vy: 'nara' } },
  { id: '11', d: 0.6 + L(17) + 0.8, plats: 'Grodans blad, halvbild', malin: [[17, 0.6]], ljud: [['swoosh/swoosh-1', 0.1], ['slick/slick-1', 0.6 + 2.1]],
    bild: 'Glassen glider till grodans hand. Grodan smakar, en bit av kulan är borta på "Mums"', ljudtext: 'swoosh mjukt, slick på "Mums"', s: { vy: 'halv', glass: 'hand' } },
  { id: '11b', d: 0.2 + L(18) + SVAR + L(19) + 0.8, plats: 'Grodan, närbild', malin: [[18, 0.2], [19, 0.2 + L(18) + SVAR]], ljud: [G('groda-mysig-suck-3', 0.2 + L(18) + 0.2)],
    bild: 'Grodan blundar glatt. Pausen: mysig suck', ljudtext: 'mus-suck (mysig)', s: { vy: 'nara' } },
  { id: '12', d: 0.6 + L(20) + 1.0, plats: 'Grodan, närbild', malin: [[20, 0.6]], ljud: [['plupp/plupp-2', 0.2], G('oj-oj-1', 0.6 + L(20) + 0.2)],
    bild: 'En rosa droppe faller från kulan och landar på grodans näsa. Grodan tittar i kors upp mot den', ljudtext: 'plupp, oj-oj (förvånad)', s: { droppe: true } },
  { id: '12b', d: 0.5 + L(21) + 1.2, plats: 'Grodan, närbild', malin: [[21, 0.5]], ljud: [['plupp/plupp-2', 0.2], G('groda-fniss-1', 0.5 + L(21) + 0.2)],
    bild: 'Grodan skakar lugnt på huvudet, droppen faller ner i dammen', ljudtext: 'plupp, olle-fniss', s: { droppe: false } },
  { id: '13', d: 3.7 + L(22) + 0.8, plats: 'Grodans blad, halvbild', malin: [[22, 3.7]], ljud: [['slick/slick-1', 0.45], ['slick/slick-1', 1.15], ['slick/slick-1', 1.85], ['nom/nom-1', 2.5], ['nom/nom-2', 3.1]],   // struten äts upp i två tuggor (Sanna 27/11 "should be eaten up")
    bild: 'Grodan slickar upp det sista av glassen (tre slick, kulan är borta), sedan äter hon upp struten i två tuggor. Grodan tittar ut över dammen', ljudtext: '–', s: { vy: 'halv', glass: 'nej' } },

  // --- Dammen ---
  { id: '14', d: 0.2 + L(23) + SVAR + L(24) + 0.8, plats: 'Dammen, bred', malin: [[23, 0.2], [24, 0.2 + L(23) + SVAR]], ljud: [['vagor/vagor-1', 0], G('groda-fortjust-1', 0.2 + L(23) + 0.2)],
    bild: 'Bred bild över dammen med två näckrosblad. Grodan tittar på vattnet, nickar', ljudtext: 'vågor svagt, kvak-dubbel (förtjust)', s: { vy: 'damm' } },
  { id: '15', d: 0.5 + L(25) + 0.9, plats: 'Dammen, halvbild', malin: [[25, 0.5]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.4], ['plask/plask-1', 1.4], ['droppar/droppar-1', 1.5]],
    bild: 'Grodan hoppar ut i dammen (helbild) och landar mitt i vattnet på "plask": hon sjunker ner till axlarna (bad 4, inget vågkort), vattnet stänker och ringar sig', ljudtext: 'hopp-mjuk, plask, droppar', s: { vy: 'halv2', blad: 'bad', stank: true } },
  { id: '15b', d: 0.4 + L(26) + 1.1, plats: 'Grodan, närbild', malin: [[26, 0.4]], ljud: [G('groda-prat-2', 0.4 + L(26) + 0.2)],
    bild: 'Droppar faller på grodan, hon blundar glatt. Hon har sjunkit ner till bröstet i vattnet', ljudtext: 'kvak (glad)', s: { vy: 'nara2', stank: false } },
  // grodan badar på riktigt (utkast A, Sanna 27/11 "kan grodan bada?"): hon simmar ett varv och plaskar med händerna
  { id: '15c', d: 0.4 + L(47) + 1.8, plats: 'Dammen, halvbild', malin: [[47, 0.4]], ljud: [['simma/simma-1', 0.2], ['vagor/vagor-2', 0.3], ['simma/simma-2', 1.6]],
    bild: 'Grodan simmar lugnt ett varv i dammen (helbild), simtagen syns över ytan, vattenringar följer henne', ljudtext: 'simma, vågor', s: { vy: 'halv2' } },
  { id: '15d', d: 0.2 + L(48) + SVAR + L(49) + 0.8, plats: 'Grodan i vattnet, närbild', malin: [[48, 0.2], [49, 0.2 + L(48) + SVAR]],
    ljud: [G('groda-fniss-3', 0.2 + L(48) + 0.2), ...[0, 1, 2].map(i => ['plask/plask-' + (2 + i), 0.2 + L(48) + SVAR + 0.1 + i * L(49) / 3])],
    bild: 'Grodan plaskar med händerna, tre plask på "Plask, plask, plask!". Pausen: fniss-kvak', ljudtext: 'fniss-kvak, plask ×3 lågt', s: { vy: 'nara2' } },
  { id: '16', d: 0.3 + L(27) + 1.4, plats: 'Grodan, närbild', malin: [[27, 0.3]], ljud: [G('groda-prat-1', 0.3 + L(27) + 0.2)],
    bild: 'Grodan sval och glad, dropparna glittrar', ljudtext: 'kvak (glad)', s: {} },

  // --- Blommorna ---
  // Blommorna (runda 4, Sanna 27/11 "flowers dont need to hide, just ask viewer if they see any flowers … then we can name colors"):
  // fem blommor står synliga vid dammen från början, Malin frågar om barnet ser några, sedan sägs färgerna och blomman studsar på sitt ord
  { id: '17', d: 0.3 + L(28) + 1.2, plats: 'Dammen och blommorna, halvbild', malin: [[28, 0.3]], ljud: [G('groda-nyfiken-2', 0.3 + L(28) + 0.2)],
    bild: 'Grodan tittar runt. Blommorna står vid stranden', ljudtext: 'kvak (frågande)', s: { vy: 'buske', blommor: 'uppe', blad: 2 } },
  { id: '18', d: 0.3 + L(40) + 3.0, plats: 'Hela uppslaget', malin: [[40, 0.3]], ljud: [['glimt/glimt-2', 0.3 + L(40) + 2.0]],
    bild: 'Hela uppslaget med blommorna. Barnet tittar (3 s), blommorna skimrar svagt efter 2 s', ljudtext: 'tyst, glimt svagt när skimret börjar', s: { vy: 'buske-nara' } },
  { id: '19', d: 0.2 + L(32) + 1.0, plats: 'Blommorna, nära', malin: [[32, 0.2]], ljud: [['glimt/glimt-1', 0], G('groda-fortjust-3', 0.2 + L(32) + 0.2)],
    bild: 'Blommorna skimrar tydligt och studsar lite. Grodan glad', ljudtext: 'glimt, kvak-dubbel (förtjust)', s: { vy: 'blommor-nara' } },
  { id: '19b', d: 0.4 + L(41) + 0.4 + L(42) + 0.4 + L(43) + 0.6, plats: 'Blommorna, nära',
    malin: [[41, 0.4], [42, 0.4 + L(41) + 0.4], [43, 0.4 + L(41) + 0.4 + L(42) + 0.4]],
    ljud: [['glimt/glimt-1', 0.3], ['glimt/glimt-2', 0.4 + L(41) + 0.3], ['tindra/tindra-2', 0.4 + L(41) + 0.4 + L(42) + 0.4]],
    bild: 'Malin säger färgerna. Röda, gula, lila och rosa blomman studsar och glimtar var och en på sitt ord', ljudtext: 'glimt per blomma', s: {} },
  { id: '20', d: 0.9 + L(33) + 1.1, plats: 'Stranden vid blommorna, halvbild', malin: [[33, 0.9]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.2], G('groda-prat-2', 0.9 + L(33) + 0.2)],
    bild: 'Grodan hoppar till stranden bredvid blommorna och tittar på dem', ljudtext: 'hopp-mjuk, kvak (glad)', s: { vy: 'blommor', blad: 3 } },
  { id: '21', d: 0.5 + L(34) + 1.4, plats: 'Grodan och blommorna, närbild', malin: [[34, 0.5]], ljud: [G('groda-mysig-suck-3', 0.5 + L(34) + 0.2)],
    bild: 'Grodan lutar sig mot blommorna, blundar och luktar', ljudtext: 'mus-suck (mysig)', s: { vy: 'blommor-nara', luktar: true } },

  // --- Sanden och hej då ---
  // grodan bygger sandslottet (utkast B, Sanna 27/11 "maybe add scene where frog build sand castle"): sandhögen och hinken står uppe
  // från början, slottet är inte byggt. Två torn med hinken, sedan reser sig hela slottet på "sandslott".
  { id: '22', d: 2.5 + L(35) + 0.4 + L(50) + 0.8, plats: 'Sandhörnet, bred', malin: [[35, 2.5], [50, 2.5 + L(35) + 0.4]],
    ljud: [['hopp-mjuk/hopp-mjuk-1', 0.1], ['hopp-mjuk/hopp-mjuk-2', 0.75], ['hopp-mjuk/hopp-mjuk-1', 1.6], ['landa-mjuk/landa-mjuk-2', 2.3], G('groda-nyfiken-3', 2.5 + L(35) + 0.4 + L(50) + 0.2)],
    bild: 'Hela uppslaget medan grodan hoppar över bladen, kameran glider med till sandhörnet när hon landar bredvid hinken. Sandhögen utan slott, hinken med spaden', ljudtext: 'hopp ×3, landa-mjuk, nyfiket kvak', s: { vy: 'bygge', blad: 'sand', luktar: false } },
  { id: '22b', d: 0.2 + L(51) + SVAR + L(52) + 0.8, plats: 'Sandhörnet, halvbild', malin: [[51, 0.2], [52, 0.2 + L(51) + SVAR]], ljud: [G('groda-fortjust-3', 0.2 + L(51) + 0.2)],
    bild: 'Grodan tittar på oss. Pausen: glatt kvak, nick', ljudtext: 'kvak-dubbel (förtjust)', s: {} },
  { id: '22c', d: 0.9 + L(53) + 1.3, plats: 'Sandhörnet, halvbild', malin: [[53, 0.9]], ljud: [['swoosh/swoosh-1', 0.1], ['grav/grav-1', 1.25], ['sand/sand-1', 1.55], ['grav/grav-1', 2.35], ['sand/sand-2', 2.65]],
    bild: 'Grodan tar spaden ur hinken och fyller hinken med sand, två skopor. Sanden syns i hinken', ljudtext: 'swoosh, gräv + sand ×2', s: {} },
  { id: '22d', d: 0.4 + L(54) + 1.0, plats: 'Sandhörnet, halvbild', malin: [[54, 0.4]], ljud: [['swoosh/swoosh-1', 0.15], ['hink-dunk/hink-dunk-1', 1.15], ['pop/pop-1', 0.4 + L(54) - 0.2]],
    bild: 'Hinken lyfts upp och vänds över sandhögen (dunk). På "lyft!" lyfts den, och ett torn står kvar', ljudtext: 'swoosh, hink-dunk, pop på "lyft"', s: {} },
  { id: '22e', d: 0.5 + L(55) + 1.2, plats: 'Tornet, närbild', malin: [[55, 0.5]], ljud: [['glimt/glimt-1', 0.5], G('groda-fortjust-1', 0.5 + L(55) + 0.2)],
    bild: 'Närbild på tornet, som glimtar. Hinken flyger tillbaka bakom bilden', ljudtext: 'glimt, kvak-dubbel (förtjust)', s: { vy: 'torn' } },
  { id: '22f', d: 0.4 + L(56) + 1.0, plats: 'Sandhörnet, halvbild', malin: [[56, 0.4]], ljud: [['grav/grav-1', 0.25], ['sand/sand-3', 0.5], ['swoosh/swoosh-1', 0.8], ['hink-dunk/hink-dunk-1', 1.7], ['pop/pop-2', 0.4 + L(56) - 0.2]],
    bild: 'En skopa till, hinken vänds på andra sidan om mitten, och på "lyft!" står torn två kvar', ljudtext: 'gräv, sand, swoosh, hink-dunk, pop', s: { vy: 'bygge' } },
  { id: '22g', d: 0.4 + L(57) + 0.4 + L(36) + 1.6, plats: 'Sandhörnet, halvbild', malin: [[57, 0.4], [36, 0.4 + L(57) + 0.4]],
    ljud: [['glimt/glimt-1', 0.45], ['glimt/glimt-2', 0.4 + L(57) * 0.5], ['pop/pop-3', 0.4 + L(57) + 0.4 + 1.0], ['tindra/tindra-2', 0.4 + L(57) + 0.4 + 1.2],
      ['swoosh/swoosh-1', 0.4 + L(57) + 0.4 + 1.45], ['klapp/klapp-1', 0.4 + L(57) + 0.4 + 2.6], G('groda-fniss-2', 0.4 + L(57) + 0.4 + 3.2)],   // spaden i hinken, sedan klappen (QA 28/11 F5)
    bild: 'Tornen glimtar på "ett" och "två". Hela slottet reser sig på "sandslott", sedan lägger grodan spaden i hinken (swoosh) och klappar', ljudtext: 'glimt ×2, pop och tindra på "sandslott", klapp, olle-fniss', s: { slott: true } },
  { id: '23', d: 0.2 + L(37) + 1.4, plats: 'Grodan, närbild', malin: [[37, 0.2]], ljud: [G('groda-fortjust-2', 0.2 + L(37) + 0.2)],
    bild: 'Grodan tittar på oss. Pausen: glatt kvak, nick', ljudtext: 'kvak-dubbel (förtjust)', s: { vy: 'nara3' } },
  { id: '24', d: 0.5 + L(38) + 1.4, plats: 'Uppslaget, halvbild', malin: [[38, 0.5]], ljud: [['glimt/glimt-2', 0.5 + 1.2], G('groda-hejda-1', 0.5 + L(38) + 0.2)],
    bild: 'Grodan vinkar (armen bakom kroppen). På "Hej då, solen!" klipp till solen, som glimtar, blinkar två gånger och skuttar lite; tillbaka till grodan på hennes hej då-kvak', ljudtext: 'mus-hejda, glimt', s: { vy: 'hejda', vink: true } },
  // hej då till sakerna (Sanna 27/11): en bild per sak, saken studsar och glimtar på sitt ord
  { id: '24b', d: 0.3 + L(44) + 0.6, plats: 'Blommorna, halvbild', malin: [[44, 0.3]], ljud: [['glimt/glimt-1', 0.5]],
    bild: 'Blommorna studsar och glimtar', ljudtext: 'glimt', s: { vy: 'blommor' } },
  { id: '24c', d: 0.3 + L(45) + 0.6, plats: 'Sanden, halvbild', malin: [[45, 0.3]], ljud: [['glimt/glimt-2', 0.5]],
    bild: 'Sandslottet studsar och glimtar', ljudtext: 'glimt', s: { vy: 'sand' } },
  { id: '24d', d: 0.3 + L(46) + 0.6, plats: 'Dammen, bred', malin: [[46, 0.3]], ljud: [['vagor/vagor-1', 0], ['plupp/plupp-2', 0.5]],
    bild: 'Vattnet ringar sig lugnt runt bladen', ljudtext: 'vågor, plupp', s: { vy: 'damm' } },
  { id: '25', d: 0.3 + L(39) + 1.4, plats: 'Uppslaget, halvbild', malin: [[39, 0.3]], ljud: [G('groda-hejda-2', 0.3 + L(39) + 0.2)],
    bild: 'Grodan vinkar klart', ljudtext: 'mus-hejda', s: { vy: 'hejda' } },
  { id: '26', d: 3.6, plats: 'Skrivbordet, kameran glider ut en bit', ljud: [['prassel-tyg/prassel-tyg-1', 0.3], ['landa-mjuk/landa-mjuk-1', 2.15]],   // landar när pärmen landar (QA 28/11)
    bild: 'Kameran glider ut ur boken (1,5 s) medan korten fälls ner, grodan först. Sedan slås pärmen igen och den stängda boken står kvar ca 1 s', ljudtext: 'prassel-tyg, landa-mjuk', s: { vy: 'bord', parm: 0, kort: 0, groda: 'nere', vink: false } },
];
// varje rad ärver läget från raden före
RADER.reduce((f, r) => (r.s = { ...f, ...r.s }), START);
// Lugnare tempo (Sanna 27/11, grind 6: "a bit slower pace and more expressions"): varje rad får GLES s luft i slutet, där grodan
// reagerar (reaktionsslaget, Reaktionstid för små barn), i stället för att rörelserna blir segare.
export const GLES = 0.9;
// snabbare intro (Sanna 27/11 "we need a faster intro"): öppningen får ingen extra luft
for (const r of RADER) if (!['00', '01a', '01b', '02', '26'].includes(r.id)) r.d += GLES;
