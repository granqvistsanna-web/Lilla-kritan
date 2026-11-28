// Storyboardens rader för 065 Våren i boken: en stillbild per uppslag i manus.md (förlaga: 062 rader.mjs).
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna i three.js-boken (scen.html + scen.js), skriver tabellen i
// storyboard.md, index.html och animatiken.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, s in]].
// s = bildens läge i boken (scen.js läser det).
//
// Malins repliker, uppmätta (ffprobe, −3 dBFS, Sannas tagning 1 2026-11-27, grind 3). Text ur ../rost.txt.
export const UPPSKATTAD = false;
export const ROST = [
  ['01-titta-en-bok', 1.43, 'Titta! En bok.'],
  ['02-var-i-boken', 2.16, 'Det är vår i boken.'],
  ['03-var-ar-blommorna', 3.07, 'Gräset är grönt. Men var är blommorna?'],
  ['04-kritan-ritar', 1.07, 'Kritan ritar …'],
  ['05-vad-blir-det', 3.18, 'Hm … vad blir det nu?'],
  ['06-en-gul-tulpan', 1.58, 'En gul tulpan!'],
  ['07-knopparna-blir-blommor', 2.51, 'Titta. Knopparna blir blommor.'],
  ['08-hej-musen', 1.91, 'Hej, musen! Hej, hej!'],
  ['09-tycker-du-om-blommorna', 1.32, 'Tycker du om blommorna?'],
  ['10-nu-ar-det-var', 1.49, 'Ja, nu är det vår!'],
  ['11-solen-skiner', 2.25, 'Solen skiner.'],
  ['12-blommorna-hanger-ner', 1.54, 'Men blommorna hänger ner.'],
  ['13-behover-vatten', 3.18, 'De är törstiga. Blommor behöver vatten.'],
  ['14-vad-gor-vi-nu', 1.84, 'Hm … vad gör vi nu?'],
  ['15-kritan-ritar-nagot', 2.50, 'Titta. Kritan ritar något.'],
  ['16-vattenkanna-varsagod', 3.46, 'En vattenkanna! Varsågod, musen.'],
  ['17-tack-kritan', 1.04, 'Tack, kritan!'],
  ['18-vatten-pa-fotterna', 2.38, 'Oj! Vatten på fötterna!'],
  ['19-blota-fotter', 2.79, 'Ha ha, blöta fötter!'],
  ['20-ska-du-vattna', 1.40, 'Ska du vattna blommorna?'],
  ['21-vi-hjalper-dem', 1.33, 'Kom, vi hjälper dem!'],
  ['22-vattna-upp-1', 3.01, 'Vattna, vattna … upp!'],
  ['23-den-roda-en', 2.23, 'Den röda står upp. En!'],
  ['24-vattna-upp-2', 3.11, 'Vattna, vattna … upp!'],
  ['25-den-gula-tva', 2.14, 'Den gula. Två!'],
  ['26-hanger-fortfarande', 2.11, 'En blomma hänger fortfarande ner.'],
  ['27-vilken-ar-torstig', 1.65, 'Vilken blomma är törstig?'],
  ['28-ja-den-lila', 1.54, 'Ja, den lila!'],
  ['29-vattna-upp-3', 3.10, 'Vattna, vattna … upp!'],
  ['30-den-lila-tre', 2.06, 'Den lila. Tre!'],
  ['31-en-tva-tre', 5.44, 'En, två, tre. Nu står alla blommorna upp.'],
  ['32-vatten-och-sol', 2.97, 'Vatten och sol. Så växer blommorna.'],
  ['33-sma-djur', 2.14, 'Ser du några små djur på blommorna?'],
  ['34-en-fjaril', 1.07, 'En fjäril!'],
  ['35-en-nyckelpiga', 3.81, 'Och en nyckelpiga. Röd med svarta prickar.'],
  ['36-fjarilen-pa-huvudet', 2.29, 'Fjärilen sitter på huvudet!'],
  ['37-det-kittlas', 2.03, 'Ha ha, det kittlas!'],
  ['38-vad-finns-i-tradet', 2.79, 'Titta upp i trädet. Vad finns där?'],
  ['39-ett-fagelbo', 1.27, 'Ett fågelbo!'],
  ['40-tre-sma-agg', 3.06, 'Ett, två, tre små ägg.'],
  ['41-fagler-lagger-agg', 1.98, 'På våren lägger fåglarna ägg.'],
  ['42-fin-vardag', 2.04, 'Var det en fin vårdag, musen?'],
  ['43-det-tycker-jag', 1.38, 'Ja, det tycker jag!'],
  ['44-hej-da-musen', 1.13, 'Hej då, musen!'],
  ['45-hej-da-blommorna', 1.14, 'Hej då, blommorna!'],
  ['46-hej-da-fjarilen', 3.67, 'Hej då, fjärilen! Hej då, nyckelpigan!'],
  ['47-hej-da-fagelboet', 1.56, 'Hej då, fågelboet!'],
  ['48-vi-ses-snart', 3.90, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];

// Musens röst (grind 4, Sanna 2026-11-27 "Ta dina förslag"): befintliga ljud, valen i ../ljud-effekter.md.
const M = (f, o) => [f.replace(/-\d+$/, '') + '/' + f, o];
const SVAR = 1.6;   // musens svar i pausen mellan Malins fråga och hennes reaktion (som 062)
const VATTEN = 'regn-droppar/regn-droppar-1-stark';   // kopia +26 dB (originalet −52 LUFS hördes inte)

// Lägena. Varje rad ändrar bara det som är nytt, resten ärvs från raden före.
// rod/gul/lila: 'knopp' | 'uppe' | 'hanger' | 'kontur' (bara gul: kritans teckning) · kanna: 'nej' | 'kontur' | 'gras' | 'hand'
// droppar: false | 'fotter' | 'rod' | 'gul' | 'lila' · fjaril: 'blomma' | 'huvud' · siffra: '' | '1' | '2' | '3' | '123'
const START = { vy: 'bord', parm: 0, kort: 0, rod: 'knopp', gul: 'knopp', lila: 'knopp', mus: 'nere', pos: 'start', kanna: 'nej',
  droppar: false, fjaril: 'blomma', siffra: '', kritan: false };

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', s: { ...START, vy: 'logga' } },

  // --- Boken öppnas ---
  { id: '01', d: 0.3 + L(1) + 0.3, plats: 'Skrivbordet, helbild', malin: [[1, 0.3]], ljud: [['fagelkvitter/fagelkvitter-1', 0], ['glimt/glimt-1', 0.2]],
    bild: 'Den stängda gröna boken med tulpanknoppen, ljuset glimtar långsamt över pärmen', ljudtext: 'fågelkvitter mjukt, glimt', s: { ...START } },
  { id: '02', d: 0.5 + L(2) + 0.4, plats: 'Skrivbordet, kameran börjar glida in', malin: [[2, 0.5]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6]],
    bild: 'Pärmen slås upp, korten fälls upp bakifrån och fram. Tulpanerna står som gröna knoppar, musens kort ligger kvar nedfällt', ljudtext: 'prassel-tyg, pop mjukt', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '03', d: 0.2 + L(3) + 0.6, plats: 'Rabatten, halvbild', malin: [[3, 0.2]],
    bild: 'Kameran glider in och stannar vid rabatten. Tre gröna knoppar, gräset, himlen', ljudtext: '–', s: { vy: 'rabatt' } },
  { id: '04', d: 0.4 + L(4) + 0.6 + L(5) + 3.0, plats: 'Rabattens mitt, nära', malin: [[4, 0.4], [5, 0.4 + L(4) + 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar tulpanens kontur mitt i rabatten (där den mittersta knoppen stod): kronan, sedan stjälken och två blad. Gissning 1: paus 3 s, kritan svajar', ljudtext: 'kritan ritar', s: { vy: 'gul-rita', gul: 'kontur', kritan: true } },
  { id: '05', d: 0.5 + L(6) + 0.8, plats: 'Rabattens mitt, nära', malin: [[6, 0.5]], ljud: [['glitter/glitter-1', 0.1], ['pop/pop-2', 0.85]],
    bild: 'Tulpanen fylls i inifrån och kortet fälls upp: en gul tulpan', ljudtext: 'glitter, pop mjukt', s: { vy: 'gul-nara', gul: 'uppe', kritan: false } },
  { id: '05b', d: 1.6 + L(7) + 0.6, plats: 'Rabatten, halvbild', malin: [[7, 1.6]], ljud: [['glimt/glimt-1', 0.3], ['glimt/glimt-2', 1.3]],
    bild: 'Den röda och den lila knoppen slår ut, en i taget (1 s mellan), med en liten pop-skala', ljudtext: 'glimt ×2', s: { vy: 'rabatt', rod: 'uppe', lila: 'uppe' } },

  // --- Hej, musen ---
  { id: '06', d: 0.7 + L(8) + 1.2, plats: 'Musen framför rabatten, halvbild', malin: [[8, 0.7]], ljud: [['pop/pop-1', 0.2], M('mus-hej-1', 0.7 + L(8) + 0.2)],
    bild: 'Musens kort fälls upp i gräset framför rabatten, med en liten efterstudsning. Musen vinkar (armen bakom kroppen)', ljudtext: 'pop, mus-hej', s: { vy: 'halv', mus: 'uppe' } },
  { id: '06b', d: 0.2 + L(9) + SVAR + L(10) + 0.8, plats: 'Musen, halvbild', malin: [[9, 0.2], [10, 0.2 + L(9) + SVAR]], ljud: [M('mus-fortjust-3', 0.2 + L(9) + 0.2)],
    bild: 'Musen tittar på blommorna och sedan på oss. Pausen: förtjust pip, nick', ljudtext: 'mus-fortjust', s: {} },
  { id: '07', d: 1.0 + L(11) + 0.6, plats: 'Solen och rabatten, halvbild', malin: [[11, 1.0]], ljud: [['tindra/tindra-2', 0.3]],
    bild: 'Solen glimtar högt uppe till höger, paus 1 s', ljudtext: 'tindra svagt', s: { vy: 'halv-sol' } },
  { id: '07b', d: 1.2 + L(12) + 1.2, plats: 'Rabatten, halvbild', malin: [[12, 1.2]],
    bild: 'Tulpanerna hänger sakta ner, en i taget (röd, gul, lila, 1 s mellan), med en långsam vickning', ljudtext: '–', s: { vy: 'rabatt', rod: 'hanger', gul: 'hanger', lila: 'hanger' } },
  { id: '08', d: 0.4 + L(13) + 1.2, plats: 'Musen, närbild', malin: [[13, 0.4]], ljud: [M('mus-nyfiken-3', 0.4 + L(13) + 0.2)],
    bild: 'Musen lutar huvudet, öronen sjunker lite', ljudtext: 'mus-nyfiken', s: { vy: 'nara' } },
  { id: '08b', d: 0.2 + L(14) + SVAR + 0.4, plats: 'Musen, halvbild', malin: [[14, 0.2]], ljud: [M('mus-pratar-3', 0.2 + L(14) + 0.2)],
    bild: 'Musen tittar på oss. Pausen: nyfiket pip', ljudtext: 'mus-pratar', s: { vy: 'halv' } },

  // --- Vattenkannan ---
  { id: '09', d: 0.4 + L(15) + 3.0, plats: 'Gräset bredvid musen, nära', malin: [[15, 0.4]], ljud: [['krita-ritar/krita-ritar-1', 0.2]],
    bild: 'Kritan ritar en vattenkanna i gräset bredvid musen och svajar. Gissning 2: paus 3 s', ljudtext: 'kritan ritar', s: { vy: 'kanna', kanna: 'kontur', kritan: true } },
  { id: '10', d: 0.6 + L(16) + 1.2, plats: 'Gräset bredvid musen, nära', malin: [[16, 0.6]], ljud: [['glitter/glitter-1', 0.1], ['pop/pop-2', 0.85], M('mus-fortjust-1', 0.6 + L(16) + 0.2)],
    bild: 'Kannan fylls i och kortet fälls upp. Musen ser den och får stora glada ögon (kawaii)', ljudtext: 'glitter, pop, mus-fortjust', s: { kanna: 'gras', kritan: false } },
  { id: '11', d: 0.3 + L(17) + 1.2, plats: 'Musen, närbild', malin: [[17, 0.3]], ljud: [M('mus-hej-3', 0.3 + L(17) + 0.2)],
    bild: 'Musen nickar', ljudtext: 'glatt pip (mus-hej)', s: { vy: 'nara' } },
  { id: '12', d: 1.6 + L(18) + 1.2, plats: 'Musen, halvbild', malin: [[18, 1.6]],
    ljud: [['swoosh/swoosh-1', 0.1], ['droppar/droppar-1', 1.35], ['droppar/droppar-1', 1.5], ['droppar/droppar-1', 1.65], M('oj-oj-1', 1.6 + L(18) + 0.2)],
    bild: 'Kannan glider i en båge till musens hand. Musen lutar den för tidigt: några droppar ur pipen landar på fötterna', ljudtext: 'swoosh mjukt, droppar ×3, oj-oj (förvånad)', s: { vy: 'halv', kanna: 'hand', droppar: 'fotter' } },
  { id: '12b', d: 0.5 + L(19) + 2.6, plats: 'Musen, halvbild', malin: [[19, 0.5]],
    ljud: [['hopp-mjuk/hopp-mjuk-1', 0.15], ['hopp-mjuk/hopp-mjuk-2', 0.55], M('mus-fniss-4', 0.5 + L(19) + 0.1)],
    bild: 'Musen tittar ner på fötterna, skakar en fot lite och gör två små skutt', ljudtext: 'hopp-mjuk ×2, mus-fniss (långt)', s: { droppar: false } },

  // --- Vattna, vattna … upp! ---
  { id: '13', d: 0.2 + L(20) + SVAR + L(21) + 0.6, plats: 'Musen och den röda, halvbild', malin: [[20, 0.2], [21, 0.2 + L(20) + SVAR]], ljud: [M('mus-fortjust-2', 0.2 + L(20) + 0.2)],
    bild: 'Musen har gått till den röda tulpanen och tittar på den. Pausen: glatt pip, nick', ljudtext: 'mus-fortjust (glatt pip)', s: { pos: 'rod' } },
  { id: '14', d: 0.4 + L(22) + 0.5, plats: 'Den röda, närbild', malin: [[22, 0.4]], ljud: [[VATTEN, 0.4], ['glimt/glimt-1', 0.4 + L(22) - 0.3]],
    bild: 'Dropparna faller i en båge ur kannan på blomman. På "upp" reser den sig (bildbyte till den utslagna, en liten vickning)', ljudtext: 'regn-droppar lågt, glimt på "upp"', s: { vy: 'rod-nara', droppar: 'rod' } },
  { id: '14b', d: 0.3 + L(23) + 0.6, plats: 'Den röda, närbild', malin: [[23, 0.3]], ljud: [['tindra/tindra-2', 0.3 + L(23) - 0.5]],
    bild: 'Den röda står upp. En liten 1:a i krita glimtar vid blomman på "En!"', ljudtext: 'tindra svagt', s: { rod: 'uppe', droppar: false, siffra: '1' } },
  { id: '15', d: 0.9 + L(24) + 0.5, plats: 'Den gula, närbild', malin: [[24, 0.9]], ljud: [['hopp-mjuk/hopp-mjuk-3', 0.1], [VATTEN, 0.9], ['glimt/glimt-2', 0.9 + L(24) - 0.3]],
    bild: 'Musen går lugnt till den gula (svansen vickar), vattnar, och den reser sig på "upp"', ljudtext: 'steg, regn-droppar lågt, glimt på "upp"', s: { vy: 'gul-nara', pos: 'gul', droppar: 'gul', siffra: '' } },
  { id: '15b', d: 0.3 + L(25) + 1.2, plats: 'Den gula, närbild', malin: [[25, 0.3]], ljud: [['tindra/tindra-2', 0.3 + L(25) - 0.5], M('mus-hej-2', 0.3 + L(25) + 0.2)],
    bild: 'En 2:a glimtar vid den gula', ljudtext: 'tindra svagt, glatt pip (mus-hej)', s: { gul: 'uppe', droppar: false, siffra: '2' } },
  { id: '16', d: 0.3 + L(26) + 1.0, plats: 'Rabatten, halvbild', malin: [[26, 0.3]], ljud: [M('mus-nyfiken-1', 0.3 + L(26) + 0.2)],
    bild: 'Musen tittar runt. Den lila hänger fortfarande, i bild när den nämns', ljudtext: 'frågande pip (mus-nyfiken)', s: { vy: 'rabatt', siffra: '' } },
  { id: '17', d: 0.2 + L(27) + 4.0, plats: 'Hela rabatten', malin: [[27, 0.2]], ljud: [['glimt/glimt-2', 0.2 + L(27) + 2.0]],
    bild: 'Hela rabatten. Barnet tittar (4 s). Den lila hänger fortfarande och skimrar svagt efter 2 s', ljudtext: 'tyst, glimt svagt när skimret börjar', s: { vy: 'rabatt-hel' } },
  { id: '18', d: 0.3 + L(28) + 1.0, plats: 'Den lila, närbild', malin: [[28, 0.3]], ljud: [['glimt/glimt-1', 0.1], M('mus-fortjust-3', 0.3 + L(28) + 0.2)],
    bild: 'Den lila skimrar tydligt. Musen tittar dit', ljudtext: 'glimt, mus-fortjust', s: { vy: 'lila-nara' } },
  { id: '19', d: 0.9 + L(29) + 0.5, plats: 'Den lila, närbild', malin: [[29, 0.9]], ljud: [['hopp-mjuk/hopp-mjuk-3', 0.1], [VATTEN, 0.9], ['glimt/glimt-1', 0.9 + L(29) - 0.3]],
    bild: 'Musen går dit och vattnar, den lila reser sig på "upp"', ljudtext: 'steg, regn-droppar lågt, glimt på "upp"', s: { pos: 'lila', droppar: 'lila' } },
  { id: '19b', d: 0.3 + L(30) + 0.6, plats: 'Den lila, närbild', malin: [[30, 0.3]], ljud: [['tindra/tindra-2', 0.3 + L(30) - 0.5]],
    bild: 'En 3:a glimtar vid den lila', ljudtext: 'tindra svagt', s: { lila: 'uppe', droppar: false, siffra: '3' } },
  { id: '20', d: 0.3 + L(31) + 1.4, plats: 'Hela rabatten', malin: [[31, 0.3]],
    ljud: [['glimt/glimt-1', 0.35], ['glimt/glimt-2', 0.85], ['glimt/glimt-1', 1.35], ['klapp/klapp-1', 0.3 + L(31) + 0.1], M('mus-fortjust-4', 0.3 + L(31) + 0.4)],
    bild: 'Alla tre tulpanerna vajar sakta i otakt. Siffrorna 1, 2, 3 glimtar en i taget på orden och tonas bort. Musen klappar', ljudtext: 'glimt ×3, klapp mjukt, mus-fortjust', s: { vy: 'rabatt-hel', siffra: '123' } },
  { id: '20b', d: 0.6 + L(32) + 1.6, plats: 'Solen och rabatten, halvbild', malin: [[32, 0.6]], ljud: [['tindra/tindra-2', 0.2], M('mus-suck-2', 0.6 + L(32) + 0.2)],
    bild: 'Solen glimtar, sedan blommorna', ljudtext: 'tindra svagt, mysigt pip (mus-suck)', s: { vy: 'halv-sol', siffra: '' } },

  // --- Fjärilen och nyckelpigan ---
  { id: '21', d: 0.2 + L(33) + 3.0, plats: 'Hela uppslaget', malin: [[33, 0.2]],
    bild: 'Hela uppslaget. Barnet tittar (3 s). Fjärilen sitter på den rosa blomman och nyckelpigan på den gula, synliga hela tiden', ljudtext: 'tyst', s: { vy: 'uppslag' } },
  { id: '22', d: 0.4 + L(34) + 1.0, plats: 'Fjärilen, närbild', malin: [[34, 0.4]], ljud: [['glimt/glimt-1', 0.4], M('mus-nyfiken-3', 0.4 + L(34) + 0.2)],
    bild: 'Fjärilen fäller vingarna sakta och glimtar på sitt ord', ljudtext: 'glimt, mus-nyfiken', s: { vy: 'fjaril', pos: 'blommor' } },
  { id: '22b', d: 0.3 + L(35) + 0.6, plats: 'Nyckelpigan, närbild', malin: [[35, 0.3]], ljud: [['glimt/glimt-2', 0.3]],
    bild: 'Nyckelpigan kryper lite på blomman och glimtar på sitt ord', ljudtext: 'glimt', s: { vy: 'nyckelpiga' } },
  { id: '23', d: 1.6 + L(36) + 1.4, plats: 'Musen vid blommorna, halvbild', malin: [[36, 1.6]], ljud: [['swoosh/swoosh-1', 0.2], M('ooh-1', 1.6 + L(36) + 0.2)],
    bild: 'Fjärilen flyger upp i en långsam båge och landar mellan musens öron. Musen tittar i kors upp mot den', ljudtext: 'swoosh mjukt, ooh (förvånad)', s: { vy: 'halv', fjaril: 'huvud' } },
  { id: '23b', d: 0.3 + L(37) + 1.0, plats: 'Musen vid blommorna, halvbild', malin: [[37, 0.3]], ljud: [M('mus-fniss-kort-1', 0.3 + L(37) + 0.1)],
    bild: 'Öronen vickar, fjärilen flyger tillbaka till sin blomma', ljudtext: 'mus-fniss-kort', s: { fjaril: 'blomma' } },

  // --- Fågelboet ---
  { id: '24', d: 0.8 + L(38) + 3.0, plats: 'Lövträdet, halvbild', malin: [[38, 0.8]], ljud: [['fagel-pip/fagel-pip-1', 0.4]],
    bild: 'Halvbilden står kvar: musen tittar upp mot trädet på "Titta upp i trädet". Klipp till lövträdet före "Vad finns där?". Boet ligger i grenen (har stått där hela tiden). En fågel piper svagt. Gissning 3: paus 3 s', ljudtext: 'fågel-pip svagt', s: { vy: 'trad' } },
  { id: '24b', d: 0.3 + L(39) + 1.0, plats: 'Boet, nära', malin: [[39, 0.3]], ljud: [['glimt/glimt-1', 0.3], M('mus-fortjust-1', 0.3 + L(39) + 0.2)],
    bild: 'Boet glimtar på sitt ord. Musen får kawaii-ögon', ljudtext: 'glimt, mus-fortjust', s: { vy: 'bo' } },
  { id: '24c', d: 0.3 + L(40) + 0.6, plats: 'Boet, närbild', malin: [[40, 0.3]], ljud: [['glimt/glimt-1', 0.4], ['glimt/glimt-2', 0.9], ['glimt/glimt-1', 1.4]],
    bild: 'Äggen glimtar ett i taget på "ett, två, tre"', ljudtext: 'glimt ×3 svagt', s: { vy: 'bo-nara' } },
  { id: '24d', d: 0.5 + L(41) + 1.2, plats: 'Boet, närbild', malin: [[41, 0.5]], ljud: [['fagel-pip/fagel-pip-1', 0.1], M('mus-pratar-1', 0.5 + L(41) + 0.2)],
    bild: 'En fågel piper svagt i trädet', ljudtext: 'fågel-pip svagt, mus-pratar (mysigt)', s: {} },

  // --- Hej då ---
  { id: '25', d: 0.2 + L(42) + SVAR + L(43) + 0.8, plats: 'Musen, närbild', malin: [[42, 0.2], [43, 0.2 + L(42) + SVAR]], ljud: [M('mus-suck-1', 0.2 + L(42) + 0.2)],
    bild: 'Musen tittar på oss. Pausen: glatt pip, nick', ljudtext: 'mus-suck (mysig)', s: { vy: 'nara' } },
  { id: '26', d: 0.5 + L(44) + 1.2, plats: 'Musen, halvbild', malin: [[44, 0.5]], ljud: [M('mus-hejda-1', 0.5 + L(44) + 0.2)],
    bild: 'Musen vinkar (armen bakom kroppen, på den sida som inte skyms av en tulpan)', ljudtext: 'mus-hejda', s: { vy: 'hejda' } },
  { id: '26b', d: 0.3 + L(45) + 0.6, plats: 'Rabatten, halvbild', malin: [[45, 0.3]], ljud: [['glimt/glimt-1', 0.5]],
    bild: 'Tulpanerna vajar och glimtar. Musen står hel vid blommorna och går tillbaka efter repliken', ljudtext: 'glimt', s: { vy: 'rabatt-hej' } },
  { id: '26c', d: 0.3 + L(46) + 0.6, plats: 'Fjärilen och nyckelpigan, nära', malin: [[46, 0.3]], ljud: [['glimt/glimt-1', 0.5], ['glimt/glimt-2', 0.3 + L(46) * 0.55]],
    bild: 'Fjärilen och nyckelpigan glimtar, var och en på sitt ord', ljudtext: 'glimt ×2', s: { vy: 'insekter' } },
  { id: '26d', d: 0.3 + L(47) + 0.8, plats: 'Lövträdet, halvbild', malin: [[47, 0.3]], ljud: [['glimt/glimt-2', 0.5], ['fagel-pip/fagel-pip-1', 0.3 + L(47) + 0.1]],
    bild: 'Boet glimtar', ljudtext: 'glimt, fågel-pip svagt', s: { vy: 'trad' } },
  { id: '27', d: 0.3 + L(48) + 1.2, plats: 'Musen, halvbild', malin: [[48, 0.3]], ljud: [M('mus-hejda-3', 0.3 + L(48) + 0.1)],
    bild: 'Musen vinkar klart', ljudtext: 'mus-hejda', s: { vy: 'hejda', pos: 'start' } },
  { id: '28', d: 3.6, plats: 'Skrivbordet, kameran glider ut', ljud: [['prassel-tyg/prassel-tyg-1', 1.15], ['landa-mjuk/landa-mjuk-1', 2.45]],
    bild: 'Kameran glider ut ur boken (1,4 s). Sedan fälls korten ner, musen först, och pärmen slås igen. Den stängda boken står 1,1 s, tulpanknoppen på pärmen', ljudtext: 'prassel-tyg, landa-mjuk', s: { vy: 'bord', parm: 0, kort: 0, mus: 'nere' } },
];
// varje rad ärver läget från raden före
RADER.reduce((f, r) => (r.s = { ...f, ...r.s }), START);
// Lugnt tempo (manus, Sanna 2026-11-27): varje rad får GLES s luft i slutet, där musen reagerar (reaktionsslaget).
// Öppningen och stängningen får ingen extra luft (062: "we need a faster intro").
export const GLES = 1.0;
for (const r of RADER) if (!['00', '01', '02', '28'].includes(r.id)) r.d += GLES;
