// Storyboardens rader för 020 Grisen badar: en stillbild per rad. bygg.mjs räknar starttiderna (summan av d), ritar
// stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/
// utan .m4a, sekunder in i raden]]; null som fil = ljudet saknas än (står i texten med ⚠, tystnad i animatiken).
// Längderna är uppmätta (ffprobe) och står i ROST; pauserna är manusets.
export const ROST = [
  ['01-kritan-ritar', 1.78], ['02-vad-blir-det', 2.07], ['03-en-gris', 2.91], ['04-hej-grisen', 1.10], ['05-smutsig', 2.76],
  ['06-bada', 1.44], ['07-vill-inte-bada', 3.15], ['08-vad-gor-vi', 2.09], ['09-kritan-ritar-nagot', 2.59], ['10-badanka', 3.40],
  ['11-vad-sager-man', 0.91], ['12-tack', 0.64], ['13-hoppar-i', 3.08], ['14-inte-dumt', 2.50], ['15-pratar', 1.98],
  ['16-skont', 2.54], ['17-ankan-sitter', 2.54], ['18-tvatta', 1.93], ['19-trynet', 3.92], ['20-oronen', 3.77],
  ['21-lera-kvar', 3.21], ['22-kinden', 5.50], ['23-ren-bubbla', 3.74], ['24-plopp', 2.16], ['25-hej-da', 3.28],
  // tagning 2 (Sanna 2026-11-10)
  ['26-lerfotter', 4.56], ['27-ritar-mer', 1.68], ['28-en-bat', 0.66], ['29-bubblor', 2.09], ['30-pallen', 4.18], ['31-hej-da-baten', 1.25],
  // tagning 3 (Sanna 2026-11-10, manus.md "Tagning 3" och "Lek innan hej då"). Mät om allt med node storyboard/mat-rost.mjs
  ['32-vet-inte-var', 4.53], ['33-kan-du-hjalpa', 3.84], ['34-ja-pa-kinden', 3.09], ['35-skrubba-kinden', 2.49], ['36-leker', 4.34]];

export const L = n => ROST[n - 1][1];
// var "borta!" börjar i replikerna (silencedetect −35 dB, tagning 4); leran försvinner exakt där. Mät om om tagningen byts.
export const BORTA = { 19: 3.41, 20: 3.23, 35: 1.88 };   // replikens längd: raderna i tagning 3 räknar sina tider från den

const PIP = 'pip/pip-1';   // ⚠ kycklingpipet står in för badanka-pip tills den finns (ljud-effekter.md)

export const RADER = [
  { id: '00', d: 8.0, plats: 'Intro (fast)', bild: 'Formatets intro: logotypen ritas, kritsvep, titelkortet *Avsnitt 20 · Grisen badar*. ⚠ Introt är inte byggt för 020 än: bilden är en platshållare', ljudtext: 'introjingeln', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar grisens kontur i ett lugnt drag (ca 7 s totalt), halvvägs här', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: 7.5, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (ca 7 s), sedan väntar kritan bredvid i ca 4 s, vickar och knackar två gånger: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.6]],
    bild: 'Den riktiga grisen fylls i inifrån, lerfläckarna kommer sist (trynet, öronen, kinden). Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 5.0, plats: 'Badrummet, helbild', malin: [[4, 1.6]], ljud: [['smasteg/smasteg-1', 0.2], ['noff-glad/noff-glad-2', 3.4]],
    bild: 'Grisen trippar in från vänster (rigg-motorns gång) och stannar bredvid badkaret, öronen vippar', ljudtext: 'små steg, glatt nöff (`noff-glad-2`)', ansikte: 'glad' },
  { id: '2', d: 4.8, plats: 'Badrummet, närbild huvudet', malin: [[5, 0.4]], ljud: [['fnys/fnys-1', 3.3], ['noff/noff-2', 3.9]],
    bild: 'Lerfläckarna syns: trynet, båda öronen, högra kinden. Trynet puffar efter repliken', ljudtext: 'belåtet nöff (`fnys-1` + `noff-2`)', ansikte: 'stolt' },
  { id: '2b', d: 0.3 + L(26) + 0.5, plats: 'Badrummet, närbild golvet', malin: [[26, 0.3]],
    bild: 'Lerfotspåren på golvet; grisen tittar ner på fötterna', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '3', d: 4.3, plats: 'Badrummet, helbild', malin: [[6, 0.3]], ljud: [[null, 1.6, 'kran'], ['fnys/fnys-4', 3.0]],
    bild: 'Kranen på väggen börjar rinna ner i badkaret. Grisen skakar på huvudet (ägget lutar åt sidorna)', ljudtext: '⚠ `kran` saknas, sedan surt nöff (`fnys-4`)', ansikte: 'ledsen (surt)' },
  { id: '4', d: 1.3 + L(7) + L(8) + 1.3, plats: 'Badrummet, närbild', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [['fnys/fnys-2', 1.4 + L(7) + L(8)]],
    bild: 'Grisen vänder bort trynet (riktningsposen åt vänster), öronen faller ner. Paus 1 s mellan replikerna', ljudtext: 'surt men gulligt nöff (`fnys-2`)', ansikte: 'ledsen, tittar bort' },
  { id: '5a', d: 3.2, plats: 'Badrummet, helbild', malin: [[9, 0.3]],
    bild: 'Kritan kommer in i bild uppifrån höger, mot vattnet i badkaret', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '5b', d: 7.8, plats: 'Badrummet, helbild', ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.0]],
    bild: 'Kritan ritar badankans kontur på vattnet i ett lugnt drag (ca 4,5 s), väntar sedan ca 3 s bredvid och knackar: barnet gissar', ljudtext: 'skrrrrt', ansikte: 'nyfiken' },
  { id: '5c', d: 5.2, plats: 'Badrummet, helbild', malin: [[10, 0.1]], ljud: [[PIP, 4.4]],
    bild: 'Den riktiga ankan fylls i inifrån och guppar på vattnet; ögat ritas i kod', ljudtext: 'pip (⚠ `badanka-pip` saknas, kycklingpipet i animatiken)', ansikte: 'förvånad' },
  { id: '5d', d: 7.5, plats: 'Badrummet, helbild', malin: [[27, 0.2]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 0.8]],
    bild: 'Kritan ritar en båt på vattnet (kontur ca 4 s), väntar sedan bredvid: barnet gissar', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5e', d: 4.6, plats: 'Badrummet, helbild', malin: [[28, 0.1]],
    bild: 'Den riktiga båten fylls i och landar mjukt på vattnet', ljudtext: 'glitter, litet plask', ansikte: 'jätteglad' },
  { id: '5f', d: 5.0, plats: 'Badrummet, helbild', malin: [[29, 0.2]],
    bild: 'Kritan ritar tre bubblor som flyger långsamt uppåt och spricker mjukt, sedan flyger kritan iväg', ljudtext: 'kritan ritar, tre mjuka pop', ansikte: 'jätteglad' },
  { id: '6', d: 0.3 + L(11) + 1.8, plats: 'Badrummet, halvbild grisen och badkaret', malin: [[11, 0.3]], ljud: [['fnys/fnys-3', 1.5]],
    bild: 'Grisen tittar på ankan (riktning höger), öronen reser sig. Paus 4 s: barnet säger tack', ljudtext: 'nyfiket nöff (`fnys-3`), sedan tyst', ansikte: 'nyfiken' },
  { id: '7', d: 3.4, plats: 'Samma', malin: [[12, 0.0]], ljud: [['noff-glad/noff-glad-1', 1.0]],
    bild: 'Grisen nickar (ägget trycks ihop och sträcks en gång)', ljudtext: 'glatt nöff (`noff-glad-1`)', ansikte: 'jätteglad' },
  { id: '7b', d: 4.8, plats: 'Badrummet, helbild', malin: [[30, 0.2]],
    bild: 'Upp på pallen: ett skutt per "steg", först låga steget, sedan det höga', ljudtext: 'två mjuka steg', ansikte: 'jätteglad' },
  { id: '8', d: 4.6, plats: 'Badrummet, helbild', malin: [[13, 0.3]], ljud: [['hopp-mjuk/hopp-mjuk-1', 0.9], ['plask/plask-1', 2.2], [PIP, 3.9]],
    bild: 'Ett hopp från översta steget på pallen in bakom badkarskanten. Kranen slutar rinna när grisen landar', ljudtext: 'hopp, plask, pip', ansikte: 'jätteglad' },
  { id: '9', d: Math.max(4.8, 2.9 + L(14)), plats: 'Badkaret, helbild (lite inzoomad)', malin: [[14, 2.6]], ljud: [['noff-djup/noff-djup-1', 0.4]],
    bild: 'Bara huvudet ovanför kanten, skummet växer, ankan guppar bredvid, grisen ler', ljudtext: 'nöjt nöff-nöff (`noff-djup-1`) före repliken', ansikte: 'glad' },
  { id: '10', d: 6.3, plats: 'Badkaret, helbild', malin: [[15, 3.9]], ljud: [['noff/noff-2', 0.3], [PIP, 1.5], ['noff/noff-3', 2.1], [PIP, 3.3]],
    bild: 'Trynet puffar till, ankan glider en bit åt sidan och guppar tillbaka. Utbytet först, repliken efter', ljudtext: 'nöff – pip – nöff – pip (`noff-2`, `noff-3`)', ansikte: 'fnissig' },
  { id: '11', d: Math.max(4.6, 3.1 + L(16)), plats: 'Badkaret, närbild huvudet', malin: [[16, 2.8]], ljud: [[null, 0.2, 'bubbel'], ['noff-djup/noff-djup-1', 0.6]],
    bild: 'Grisen blundar, öronen hänger avslappnat', ljudtext: '⚠ `bubbel` saknas, mmm-nöff (`noff-djup-1`)', ansikte: 'sömnig, blundar' },
  { id: '12a', d: 3.0, plats: 'Badkaret, helbild', ljud: [['plask/plask-2', 0.4], [null, 0.6, 'bubbel']],
    bild: 'Grisen sjunker långsamt rakt ner i skummet så att bara öronen syns. Ankan glider dit', ljudtext: 'blubb (`plask-2`, ⚠ `bubbel` saknas)', ansikte: '– (under skummet)' },
  { id: '12b', d: 5.7, plats: 'Badkaret, helbild', malin: [[17, 1.7]], ljud: [[PIP, 1.3], ['noff-glad/noff-glad-2', 4.5]],
    bild: 'Grisen kommer upp rakt under ankan, som sitter kvar mellan öronen', ljudtext: 'pip, fnissigt nöff (`noff-glad-2`)', ansikte: 'förvånad → fnissig' },
  { id: '13', d: 5.5, plats: 'Badkaret, helbild', malin: [[18, 0.3]], ljud: [[PIP, 2.5], ['noff-glad/noff-glad-1', 3.2]],
    bild: 'Öronen vippar, ankan glider ner på vattnet igen. **Shorten börjar här**', ljudtext: 'pip, glatt nöff (`noff-glad-1`)', ansikte: 'glad' },
  { id: '14', d: 6.5, plats: 'Badkaret, närbild huvudet', malin: [[19, 0.3]], ljud: [[null, 1.4, 'skrubb'], ['noff-glad/noff-glad-2', 5.1]],
    bild: 'En skumtuss snurrar över trynet, fläcken bleknar och är borta på "borta!", trynet rycker', ljudtext: '⚠ `skrubb` saknas, fnissigt nöff (`noff-glad-2`)', ansikte: 'fnissig' },
  { id: '15', d: 5.4, plats: 'Badkaret, närbild huvudet', malin: [[20, 0.3]], ljud: [[null, 1.4, 'skrubb']],
    bild: 'Samma på öronen, ett i taget (här det vänstra, det högra redan rent); de vippar efteråt', ljudtext: '⚠ `skrubb` saknas', ansikte: 'glad, blundar mot skummet' },
  { id: '16a', d: 0.3 + L(32) + 1.8 + L(33) + 0.1, plats: 'Badkaret, närbild (klipp)', malin: [[32, 0.3], [33, 0.3 + L(32) + 1.8]],
    bild: 'Ser rent ut, men en liten lerfläck är kvar på kinden. Grisen vet inte var: tittar åt vänster, sedan åt höger (ögon och tryne, huvudet vänds inte), frågande nöff', ljudtext: '`noff-gullig-5`', ansikte: 'nyfiken' },
  { id: '16b', d: 5.0, plats: 'Badkaret, närbild kinden (klipp)', bild: 'Paus 5 s. Efter ca 3 s skimrar fläcken svagt', ljudtext: 'tyst, ett svagt `lysmask`', ansikte: 'nyfiken' },
  { id: '17', d: L(34) + 1.2 + L(35) + 0.6, plats: 'Badkaret, närbild huvudet', malin: [[34, 0.0], [35, L(34) + 1.2]], ljud: [[null, 2.2, 'skrubb']],
    bild: 'Fläcken skimrar tydligt, skumtussen snurrar över kinden, borta', ljudtext: '⚠ `skrubb` saknas', ansikte: 'fnissig' },
  { id: '18a', d: 8.8, plats: 'Badkaret, närbild huvudet', malin: [[23, 0.3]],
    bild: 'Alldeles ren. Efter frågan: paus 4 s, munnen blir ett O och en liten bubbla börjar', ljudtext: 'tyst i pausen', ansikte: 'stolt → munnen O' },
  { id: '18b', d: 1.6, plats: 'Samma', malin: [[24, 0.35]], ljud: [[null, 0.0, 'bubbel']],
    bild: 'Fff …: bubblan växer stor framför trynet', ljudtext: 'blås (⚠ `bubbel` saknas, Malins "Fff" bär)', ansikte: 'munnen O' },
  { id: '18c', d: 2.4, plats: 'Samma', ljud: [['plopp/plopp-1', 0.1], ['noff-glad/noff-glad-2', 1.4]],
    bild: '… plopp! Bubblan spricker i små droppar. **Shorten slutar här**', ljudtext: 'plopp, fnissigt nöff (`noff-glad-2`)', ansikte: 'jätteglad' },
  { id: '18d', d: 1.3 + L(36) + 5.2, plats: 'Badkaret, helbild', malin: [[36, 1.3]],
    bild: 'Leken: grisen guppar lugnt upp och ner så att det plaskar, ankan och båten guppar på vågorna, grisen fnissar', ljudtext: '2–3 mjuka `plask`, `noff-fniss-3` efter repliken', ansikte: 'fnissig' },
  { id: '19', d: 1.3 + L(25) + L(31) + 2.1, plats: 'Badkaret, helbild', malin: [[25, 0.3], [31, 1.3 + L(25)]], ljud: [['noff-glad/noff-glad-2', 1.45 + L(25) + L(31)], [PIP, 2.05 + L(25) + L(31)]],
    bild: 'Huvudet ovanför kanten och ankan bredvid, öronen vippar', ljudtext: 'glatt nöff, pip', ansikte: 'jätteglad' },
  { id: '20', d: 2.5, plats: 'Badkaret → kritirisen', bild: 'Kritirisen drar ihop sig runt grisen och ankan', ljudtext: 'mattan klingar ut', ansikte: 'glad' },
  { id: '21', d: 10.0, plats: 'Outro (fast)', bild: 'Formatets outro. ⚠ Platshållare', ljudtext: 'outrojingeln', ansikte: '–' },
];

export const GLES = 1.7;   // runda 7: "make scenes a bit longer" (+1 s); var 0.7   // runda 5: "malin narration a bit more spaced out, slower pace in video"
for (const r of RADER) if (r.malin && !['01a', '01b', '18b'].includes(r.id)) r.d += GLES;
for (const r of RADER) if (['5b', '12a', '16b', '18c'].includes(r.id)) r.d += 1;   // runda 7: raderna utan repliker också lite längre

