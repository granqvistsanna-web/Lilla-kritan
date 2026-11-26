// Storyboardens rader för 043 Grisen matar fåglarna: en stillbild per uppslag. bygg.mjs räknar starttiderna (summan av d),
// ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 040 storyboard/rader.mjs.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt ("namn längd" per rad, mätt när tagningen delades 2026-11-18).
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries(readFileSync(HAR + '../rost-langder.txt', 'utf8').trim().split('\n').map(l => l.split(' ')).map(([n, s]) => [n, +s]));
export const ROST = rader.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Grisens röst (noff-gullig från 020): 1 hej, 2 förtjust, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då; fniss = noff-fniss.
const N = n => `noff-gullig/noff-gullig-${n}`, FNISS = n => `noff-fniss/noff-fniss-${n}`;
// Sanna 2026-11-20 (J16 0:38 "new pig sounds more cute … oo aa"): nya ElevenLabs-ljud som Sanna gjort. OOO = förundrat "ooo"
// (ersätter nyfiken 5 där grisen förundras), AAH = förtjust "aah" (ersätter förtjust 2, tagning 1 och 2 växelvis), KOLLA = "titta!" vid påsen
const OOO = n => `noff-ooo/noff-ooo-${n}`, AAH = n => `noff-aah/noff-aah-${n}`, KOLLA = 'noff-kolla/noff-kolla-1';
// Fåglarna (Sanna 2026-11-18): pip 1 hej, pip 5 glad, pip 3 frågande; vingflax 3; frö-prassel 1. Pick: höns-picket (finns).
const PIP = 'fagel-pip/fagel-pip-1', PIP_GLAD = 'fagel-pip/fagel-pip-5', PIP_FRAGA = 'fagel-pip/fagel-pip-3';
const FLAX = 'vingflax/vingflax-3', PRASSEL = 'fro-prassel/fro-prassel-1', PICK = 'pick/pick-1';
const STEG = n => `knarr-sno/knarr-sno-${n}`, DUNS = 'sno-duns/sno-duns-1';
// "… pick!" sist i repliken: picket läggs 0,35 s före replikens slut (mäts om med whisper i grind 6, som BORTA i 020)
const PICKORD = n => L(n) - 0.35;

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar (papperet): den lilla blå fågeln ---
  { id: '01a', d: 7.6, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar den lilla blå fågelns kontur i lugna drag: kroppen, huvudet, vingen, näbben, stjärten och benen, och prickar dit ögat', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [['glitter/glitter-1', 0.1], [PIP, 0.8 + L(3)], [FLAX, 1.2 + L(3)]],
    bild: 'Fågeln fylls i inifrån, pipar. Zoom in i teckningen, till snögården, och fågeln flyger iväg in i granen', ljudtext: '`glitter`, pip, flax', ansikte: '–' },

  // --- Snögården ---
  { id: '1', d: 2.0 + L(4) + 1.4, plats: 'Snögården, helbild', malin: [[4, 2.0]], ljud: [[AAH(1), 2.3 + L(4)]],   // Sanna 2026-11-21 (J16 0:31): snöknarret bort, Sannas eget aah i stället för noff hej
    bild: 'Grisen med tomteluvan trippar in i snön från vänster med fröpåsen och vinkar (armen bakom kroppen). Fotspår i snön', ljudtext: 'förtjust aah', ansikte: 'jätteglad' },
  // Sanna 2026-11-20: oinket efter frågan (noff 5, sedan noff-visa) avvisat två gånger; nytt ljud noff-titta ("titta!", riktiga grymt uppväxlade som noff-sot)
  { id: '2', d: 0.8 + L(5) + 1.6, plats: 'Närbild, påsen', malin: [[5, 0.8]], ljud: [[PRASSEL, 0.2], [KOLLA, 1.0 + L(5)]],
    bild: 'Grisen skakar påsen, det rasslar. Frågan efter skakningen', ljudtext: 'prassel, nyfiken (5)', ansikte: 'nyfiken' },
  { id: '3', d: 0.6 + L(6) + 2.0, plats: 'Halvbild', malin: [[6, 0.6]], ljud: [[PRASSEL, 0.1], [AAH(1), 0.9 + L(6)]],
    bild: 'Påsen tippar, fröna faller i en båge och lägger sig på snön', ljudtext: 'prassel, förtjust (2)', ansikte: 'glad' },
  // Sanna 2026-11-20 (J16 0:53): närbild på fåglarna vid holken och lugnare tempo: pip och repliken i närbild, klipp på flaxet
  // Sanna 2026-11-20 (J16 0:49 "a bit slower pace"): repliken senare, fågeln sitter kvar 1 s efter den och flyger långsammare
  { id: '4', d: 1.3 + L(7) + 1.0 + 3.0, plats: 'Närbild, holkens tak → fröna', malin: [[7, 1.3]], ljud: [[PIP, 0.4], [FLAX, 1.3 + L(7) + 1.0 - 0.1]],
    bild: 'Närbild: den röda fågeln på holkens tak pipar och tittar ner. Den lyfter, klipp: den flyger i en båge ner till fröna', ljudtext: 'pip, flax', ansikte: '–' },
  { id: '5', d: 1.3 + L(8) + 1.0 + 3.0, plats: 'Närbild, holkens tak → halvbild', malin: [[8, 1.3]], ljud: [[PIP, 0.4], [FLAX, 1.3 + L(8) + 1.0 - 0.1], [PIP, 1.3 + L(8) + 1.0 + 2.2]],
    bild: 'Närbild: den gula fågeln på taket pipar. Den lyfter, klipp: den landar bredvid den röda', ljudtext: 'pip, flax, pip', ansikte: 'glad' },
  // Sanna 2026-11-20: fler pick och fröna försvinner långsammare: sex pick till efter "Mums!", ett frö per pick
  { id: '6', d: 0.4 + L(9) + 3.8, plats: 'Halvbild, fåglarna och grisen', malin: [[9, 0.4]], ljud: [[PICK, 0.4], [PICK, 0.4 + L(9) * 0.35], [PICK, 0.4 + L(9) * 0.6],
    ...[0.45, 0.85, 1.25, 1.65, 2.05, 2.45].map(t => [PICK, 0.4 + L(9) + t]), [N(4), 0.4 + L(9) + 2.9]],
    bild: 'Fåglarna pickar på *"pick, pick, pick"*, grisen tittar på', ljudtext: '`pick` ×3, mysig suck (4)', ansikte: 'nöjd' },
  { id: '7', d: 1.0 + L(10) + 1.2, plats: 'Närbild, påsen', malin: [[10, 1.0]], ljud: [[PRASSEL, 0.2], [N(5), 1.2 + L(10)]],
    bild: 'Grisen tippar påsen upp och ner och skakar den: inget kommer', ljudtext: 'kort prassel, nyfiken (5)', ansikte: 'förvånad' },
  { id: '8', d: 1.2 + L(11) + 1.0, plats: 'Granen → fröna', malin: [[11, 1.2]], ljud: [[FLAX, 0.2], [PIP, 1.0]],
    bild: 'Den lilla blå fågeln från ritintrot flyger ut ur granen och landar bredvid de andra', ljudtext: 'flax, litet pip', ansikte: '–' },
  { id: '9', d: 0.6 + L(12) + 1.2, plats: 'Närbild, den lilla fågeln', malin: [[12, 0.6]], ljud: [[PIP_FRAGA, 0.2]],
    bild: 'Den blå fågeln lutar huvudet, inga frön kvar framför den', ljudtext: 'frågande pip', ansikte: '–' },
  { id: '10', d: 0.4 + L(13) + 1.4, plats: 'Ansiktsbild', malin: [[13, 0.4]], ljud: [[N(6), 0.6 + L(13)]],
    bild: 'Grisen tittar på den lilla fågeln, öronen sjunker lite', ljudtext: 'trumpen (6)', ansikte: 'ledsen' },

  { id: '11a', d: 0.3 + L(14) + 4.5, plats: 'Snögården, helbild', malin: [[14, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3 + L(14)]],
    bild: 'Kritan kommer in och ritar julkärvens kontur i snön: stången, axen, rosetten', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '11b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s: konturen klar, kritan svajar bredvid', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '11c', d: 0.4 + L(15) + 1.0, plats: 'Närbild, kärven', malin: [[15, 0.4]], ljud: [['glitter/glitter-2', 0.0]],
    bild: 'Kärven fylls i inifrån', ljudtext: '`glitter`', ansikte: '–' },
  { id: '12', d: 0.4 + L(16) + 1.0, plats: 'Närbild, kärven', malin: [[16, 0.4]], ljud: [['tindra/tindra-3', 0.2]],
    bild: 'Kornen glimmar', ljudtext: '`tindra`', ansikte: '–' },
  { id: '13', d: 0.3 + L(17) + 2.5, plats: 'Halvbild', malin: [[17, 0.3]], ljud: [[OOO(1), 0.5 + L(17)]],
    bild: 'Grisen tittar på kärven, öronen reser sig. Paus 2,5 s', ljudtext: 'nyfiken (5)', ansikte: 'kawaii' },
  { id: '14', d: 0.2 + L(18) + 1.2, plats: 'Halvbild', malin: [[18, 0.2]], ljud: [[AAH(2), 0.4 + L(18)]],
    bild: 'Grisen **nickar** direkt på *"Tack!"*', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '15', d: 0.6 + L(19) + 1.0, plats: 'Snögården, helbild', malin: [[19, 0.6]], ljud: [[FLAX, 0.6], [PIP, 0.9], [FLAX, 0.6 + L(19) * 0.4], [PIP, 0.9 + L(19) * 0.4], [FLAX, 0.6 + L(19) * 0.75], [PIP, 0.9 + L(19) * 0.75]],
    bild: 'Fåglarna flyger upp till kärven, en i taget på *"en … två … tre"*', ljudtext: 'flax, pip ×3', ansikte: 'glad' },
  { id: '16', d: 0.4 + L(20) + 1.2, plats: 'Närbild, kärven', malin: [[20, 0.4]], ljud: [[PICK, 0.3], [AAH(1), 0.6 + L(20)]],
    bild: 'Den lilla fågeln pickar i kärven', ljudtext: '`pick`, förtjust (2)', ansikte: '–' },
  // Sanna 2026-11-20: grisen går ända fram till kärven och smakar innan Malin säger nej
  { id: '17', d: 2.8 + L(21) + 1.9, plats: 'Halvbild', malin: [[21, 2.8]], ljud: [[N(5), 1.6], [FNISS(1), 3.0 + L(21)], ['noff-mums/noff-mums-1', 1.75]],   // mums: grisen smakar på kornen
    bild: 'Grisen sniffar och sticker fram trynet mot kornen. På *"nej, nej"* backar den och fnissar, öronen fladdrar', ljudtext: 'nyfiken (5), fniss', ansikte: 'nyfiken → fnissig' },
  // Sanna 2026-11-20: mer luft, först pratar de (noff, pip, noff, pip), sedan repliken
  { id: '18', d: 2.7 + L(22) + 1.6, plats: 'Halvbild, grisen och fåglarna', malin: [[22, 2.7]], ljud: [[N(7), 0.0], [PIP, 0.7], [N(7), 1.4], [PIP, 2.0], [PIP_GLAD, 2.9 + L(22)]],
    bild: 'Grisen noffar, fåglarna pipar tillbaka', ljudtext: 'pratar (7), pip – pip', ansikte: 'glad' },
  { id: '19', d: 0.3 + L(23) + 1.5, plats: 'Ansiktsbild', malin: [[23, 0.3]],
    bild: 'Grisen tittar på fåglarna och tar sats. Paus 1,5 s', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '20', d: 0.2 + 0.9 + L(24) + 1.0, plats: 'Halvbild', malin: [[24, 1.1]], ljud: [['noff-pip/noff-pip-1', 0.0], [PIP, 0.9 + L(24)], [PIP_GLAD, 1.3 + L(24)]],   // grisen försöker pipa, det blir ett noff (Sanna 2026-11-20)
    bild: 'Ett stort noff. Fåglarna lutar sig bakåt och blinkar', ljudtext: 'stort noff, pip pip', ansikte: 'stolt' },
  { id: '21', d: 2.4 + L(25) + 1.8, plats: 'Närbild, grisens ansikte och luvan', malin: [[25, 2.4]], ljud: [[FLAX, 0.0], [OOO(2), 1.0], [FNISS(2), 2.2 + L(25)]],
    bild: 'Den lilla fågeln flyger och landar på grisens tomteluva. Grisen tittar upp med stora ögon', ljudtext: 'flax, nyfiken (5), fniss', ansikte: 'förvånad → fnissig' },
  { id: '22', d: 0.4 + L(26) + 0.8, plats: 'Halvbild', malin: [[26, 0.4]], ljud: [[PIP, 0.3], [FLAX, 0.5]],
    bild: 'Fågeln hoppar tillbaka till kärven på *"Hopp!"*', ljudtext: 'pip, flax', ansikte: 'glad' },

  { id: '23', d: 1.0 + L(27) + 1.6, plats: 'Snögården, helbild', malin: [[27, 1.0]], ljud: [['vind-hatt/vind-hatt-1', 0.0], [FLAX, 1.2 + L(27)]],
    bild: 'Snön börjar falla, tätare. Snön lägger sig på kärven. Fåglarna flyger upp i granen', ljudtext: 'vind-sus lågt, flax', ansikte: 'nyfiken, tittar upp' },
  { id: '24', d: 0.4 + L(28) + 1.4, plats: 'Närbild, kärven', malin: [[28, 0.4]], ljud: [[PIP_FRAGA, 0.6 + L(28)]],
    bild: 'Kärven vit av snö, inga korn syns', ljudtext: 'frågande pip från granen', ansikte: '–' },
  { id: '25', d: 0.4 + L(29) + 1.6, plats: 'Snögården, helbild', malin: [[29, 0.4]], ljud: [[AAH(2), 0.6 + L(29)], [STEG(3), 1.0 + L(29)]],
    bild: 'Grisen går fram till kärven', ljudtext: 'förtjust (2), `knarr-sno`', ansikte: 'glad' },
  { id: '26', d: 0.3 + L(30) + 1.0, plats: 'Halvbild, grisen och kärven', malin: [[30, 0.3]], ljud: [[DUNS, 0.3], [FLAX, 0.3 + L(30) - 1.0], [PICK, 0.3 + PICKORD(30)]],
    bild: 'Grisen knuffar stången, kärven vickar, snön puffar av. Den röda fågeln flyger ner och pickar på *"pick!"*', ljudtext: '`sno-duns`, flax, `pick`', ansikte: 'glad' },
  { id: '27', d: 0.3 + L(31) + 1.0, plats: 'Halvbild, grisen och kärven', malin: [[31, 0.3]], ljud: [['sno-duns/sno-duns-2', 0.3], [FLAX, 0.3 + L(31) - 1.0], [PICK, 0.3 + PICKORD(31)]],
    bild: 'Samma igen. Den gula fågeln flyger ner och pickar', ljudtext: '`sno-duns`, flax, `pick`', ansikte: 'glad' },
  { id: '28', d: 1.4 + L(32) + 1.4, plats: 'Halvbild', malin: [[32, 1.4]], ljud: [[DUNS, 0.2], [N(5), 1.6 + L(32)]],
    bild: 'Grisen skakar en tredje gång. Ingen fågel kommer. Grisen tittar åt vänster, sedan åt höger', ljudtext: '`sno-duns`, nyfiken (5)', ansikte: 'nyfiken' },
  { id: '29a', d: 0.3 + L(33) + 1.2, plats: 'Snögården, helbild', malin: [[33, 0.3]],
    bild: 'Helbild för frågan', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '29b', d: 4.0, plats: 'Närbild, granen', ljud: [['tindra/tindra-3', 2.6]],
    bild: 'Klipp till granen: en blå stjärt sticker ut mellan grenarna. Efter 3 s skimrar den svagt', ljudtext: 'tyst, svagt `tindra`', ansikte: '–' },
  { id: '30', d: 0.3 + L(34) + 1.2, plats: 'Närbild, granen', malin: [[34, 0.3]], ljud: [['tindra/tindra-4', 0.2], [PIP_GLAD, 0.5 + L(34)]],
    bild: 'Stjärten skimrar tydligt, fågeln tittar fram', ljudtext: '`tindra`, glatt pip', ansikte: '–' },
  { id: '31', d: 0.3 + L(35) + 1.0, plats: 'Halvbild, grisen och kärven', malin: [[35, 0.3]], ljud: [[DUNS, 0.3], [FLAX, 0.3 + L(35) - 1.0], [PICK, 0.3 + PICKORD(35)], [AAH(1), 0.6 + L(35)]],
    bild: 'Grisen skakar, den lilla fågeln flyger ner till kärven och pickar på *"pick!"*', ljudtext: '`sno-duns`, flax, `pick`, förtjust (2)', ansikte: 'jätteglad' },
  { id: '32', d: 0.4 + L(36) + 1.6, plats: 'Halvbild, alla vid kärven', malin: [[36, 0.4]], ljud: [[PICK, 0.2], [N(4), 0.6 + L(36)]],
    bild: 'Alla tre pickar i kärven. Grisen ser glad ut', ljudtext: '`pick`, mysig suck (4)', ansikte: 'nöjd' },

  { id: '33', d: 1.0 + L(37) + 1.0, plats: 'Snögården, helbild', malin: [[37, 1.0]], ljud: [['vind-hatt/vind-hatt-2', 0.0], [N(5), 1.2 + L(37)]],
    bild: 'Snön faller igen och lägger sig på kärven. Grisen tittar upp', ljudtext: 'vind-sus, nyfiken (5)', ansikte: 'nyfiken, tittar upp' },
  { id: '34a', d: 0.3 + L(38) + 3.0, plats: 'Halvbild, kärven', malin: [[38, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.3 + L(38)]],
    bild: 'Kritan ritar ett litet tak över kärven: konturen (3 s)', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '34b', d: 3.0, plats: 'Samma', bild: 'Gisspaus 3 s: konturen klar, kritan svajar bredvid', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '34c', d: 0.4 + L(39) + 1.0, plats: 'Halvbild, kärven', malin: [[39, 0.4]], ljud: [['glitter/glitter-3', 0.0]],
    bild: 'Taket fylls i. Snön lägger sig på taket i stället', ljudtext: '`glitter`', ansikte: '–' },
  { id: '35', d: 0.2 + L(40) + 1.2, plats: 'Halvbild', malin: [[40, 0.2]], ljud: [[AAH(2), 0.4 + L(40)]],
    bild: 'Grisen **nickar**', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '36', d: 0.4 + L(41) + 1.2, plats: 'Halvbild, fåglarna framför grisen', malin: [[41, 0.4]], ljud: [[PIP, 0.4 + L(41) * 0.55], [PIP_GLAD, 0.4 + L(41) * 0.72], [PIP, 0.4 + L(41) * 0.88], [N(2), 0.6 + L(41)]],
    bild: 'Fåglarna hoppar fram till grisen och pipar, en i taget på *"pip, pip, pip"*', ljudtext: 'pip ×3, förtjust (2)', ansikte: 'kawaii' },
  { id: '37', d: 0.4 + L(42) + 1.6, plats: 'Halvbild', malin: [[42, 0.4]], ljud: [[FLAX, 0.4], [PIP, 0.7], [FLAX, 0.4 + L(42) * 0.25], [PIP, 0.7 + L(42) * 0.25], [FLAX, 0.4 + L(42) * 0.45], [PIP, 0.7 + L(42) * 0.45], [FNISS(3), 0.6 + L(42)]],
    bild: 'Fåglarna flyger upp och sätter sig på grisens rygg, en i taget på *"en … två … tre"*', ljudtext: 'flax, pip ×3, fniss', ansikte: 'jätteglad' },
  { id: '38', d: 2.4 + L(43) + 1.0, plats: 'Ansiktsbild', malin: [[43, 2.4]], ljud: [[OOO(1), 1.1]],
    bild: 'En snöflinga glider ner och lägger sig på trynet. Grisen tittar på den', ljudtext: 'förvånad (5)', ansikte: 'förvånad' },
  { id: '39', d: 0.3 + L(44) + 4.0 + L(45) + 1.2, plats: 'Ansiktsbild', malin: [[44, 0.3], [45, 0.3 + L(44) + 4.0]], ljud: [['swoosh/swoosh-1', 0.3 + L(44) + 4.0 + 0.1], [FNISS(1), 0.5 + L(44) + 4.0 + L(45)]],
    bild: 'Paus 4 s: barnet blåser. Flingan blåses bort i en liten båge på *"Fff!"*', ljudtext: 'mjukt sus, fniss', ansikte: 'fnissig' },
  { id: '40', d: 0.5 + L(46) + 1.2, plats: 'Snögården, helbild', malin: [[46, 0.5]], ljud: [[FLAX, 0.0], [N(8), 0.7 + L(46)], [PIP, 1.0 + L(46)]],
    bild: 'Fåglarna flyger upp till kärven. Grisen vinkar (armen bakom kroppen)', ljudtext: 'flax, hej då (8), pip', ansikte: 'jätteglad' },
  { id: '41', d: 0.3 + L(47) + 1.4, plats: 'Snögården, helbild', malin: [[47, 0.3]], ljud: [[PIP_GLAD, 0.5 + L(47)]],
    bild: 'Grisen vinkar klart, fåglarna i kärven', ljudtext: 'glatt pip', ansikte: 'glad' },
  { id: '42', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt grisen och kärven', ljudtext: 'fågelkvittret klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
