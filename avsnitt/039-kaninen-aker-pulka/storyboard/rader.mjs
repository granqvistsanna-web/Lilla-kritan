// Storyboardens rader för 039 Kaninen ska åka pulka: en stillbild per uppslag (manus.md). bygg.mjs räknar starttiderna
// (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken.
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/
// utan .m4a, sekunder in i raden]]; null som fil = ljudet saknas än (⚠ i texten, tystnad i animatiken).
//
// Längderna: ../rost-langder.txt (skrivs av huvudsessionen när tagningen är delad och normaliserad), annars ffprobe på
// assets/ljud/roster/kaninen-aker-pulka/<namn>.m4a, annars en uppskattning ur texten (0,075 s per tecken, minst 0,9 s).
// Raderna räknar sina tider ur L(n), så de flyttar med en ny tagning: kör bygg.mjs igen.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HAR = new URL('./', import.meta.url).pathname, ROSTER = new URL('../../../assets/ljud/roster/kaninen-aker-pulka/', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+)$/).slice(1));
const matt = existsSync(HAR + '../rost-langder.txt')
  ? Object.fromEntries([...readFileSync(HAR + '../rost-langder.txt', 'utf8').matchAll(/\['([^']+)',\s*([\d.]+)\]/g)].map(m => [m[1], +m[2]])) : {};
const langd = (namn, text) => {
  if (matt[namn]) return [matt[namn], 'rost-langder'];
  try { return [+(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', ROSTER + namn + '.m4a'])).toFixed(2), 'ffprobe']; }
  catch { return [Math.max(0.9, +(text.length * 0.075).toFixed(2)), 'uppskattad']; }
};
export const ROST = rader.map(([namn, text]) => [namn, text, ...langd(namn, text)]);   // [namn, text, längd, källa]
export const L = n => ROST[n - 1][2];
// Ordtider i "Dra, dra … på!" (silencedetect −35 dB, tagningarna 2026-11-17): plagget glider en bit på för varje dra och sitter på "på!".
// 15: "En stövel" slutar, "två stövlar" slutar. Mät om om en tagning byts.
export const ORD = { 10: { dra: [2.34, 3.35], pa: 4.51 }, 11: { dra: [1.86, 2.85], pa: 4.10 }, 13: { dra: [0.05, 1.13], pa: 2.52 },
  31: { dra: [2.91, 3.91], pa: 5.25 }, 36: { dra: [0.05, 0.96], pa: 2.05 }, 15: { en: 0.85, tva: 2.75 } };

// Kaninens röst (kanin-gullig, 022): 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 frågande. b = andra tagningen,
// så att samma pip aldrig kommer två gånger i rad.
const K = (n, b = '') => `kanin-gullig/kanin-gullig-${n}${b}`, HEJ = 'kanin-gullig/kanin-hej-4', HEJDA = 'kanin-gullig/kanin-hejda-2';

export const RADER = [
  { id: '00', d: 3.3, plats: 'Intro (fast)', bild: 'Det gemensamma introt *Djuren hittar på!* (`produktion/youtube/bilderbok-intro/`). Platshållare i storyboarden', ljudtext: 'introts eget', ansikte: '–' },

  // --- Kritan ritar (papperet): de gråa vantarna ---
  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 1.0]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan ritar vantarnas kontur i lugna drag, tummen och muddkanten som egna drag. Halvvägs här', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar (ingen knackning): barnet gissar', ljudtext: 'kritan ritar klart, sedan tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 0.8, plats: 'Papperet → zoom in', malin: [[3, 0.6]],
    bild: 'De gråa vantarna fylls i inifrån. Sista 0,8 s: zoom in i teckningen, som blir vantarna på hängaren', ljudtext: '`glitter`', ansikte: '–' },

  // --- Julhallen ---
  { id: '1', d: 2.0 + L(4) + 1.4, plats: 'Julhallen, helbild', malin: [[4, 2.0]], ljud: [['hopp-mjuk/hopp-mjuk-1', 0.75], ['hopp-mjuk/hopp-mjuk-2', 1.55], [HEJ, 2.3 + L(4)]],
    bild: 'Kaninen hoppar in från höger med två lugna hopp, stannar mitt i bild och vinkar (armen bakom kroppen). De gråa vantarna hänger på hängaren', ljudtext: 'två mjuka hopp, `kanin-hej`', ansikte: 'jätteglad' },
  { id: '2', d: 0.4 + L(5) + 1.6, plats: 'Julhallen, halvbild', malin: [[5, 0.4]], ljud: [[K(2), 0.7 + L(5)]],
    bild: 'Kaninen tittar mot dörren och hoppar ett litet steg mot den. **Nickar** efter frågan', ljudtext: 'förtjust pip (2)', ansikte: 'nyfiken → glad' },
  { id: '3', d: 0.3 + L(6) + 1.6, plats: 'Samma', malin: [[6, 0.3]], ljud: [[K(2, 'b'), 0.6 + L(6)]],
    bild: 'Öronen reser sig. **Nickar**, öronen vippar', ljudtext: 'förtjust pip (2b)', ansikte: 'jätteglad' },
  { id: '4', d: 0.4 + L(7) + 1.4, plats: 'Julhallen, helbild', malin: [[7, 0.4]], ljud: [[K(5), 0.6 + L(7)]],
    bild: 'Kaninen tittar mot hängaren (riktningen åt höger, ögonen upp)', ljudtext: 'nyfiket pip (5)', ansikte: 'nyfiken' },
  { id: '5', d: 0.5 + L(8) + 1.2, plats: 'Närbild, hängaren', malin: [[8, 0.5]],
    bild: 'Hängaren: strumporna, overallen, pannbandet och de gråa vantarna på var sin krok, korgen under', ljudtext: '–', ansikte: '–' },
  { id: '6', d: 0.8 + L(9) + 1.6, plats: 'Julhallen, helbild', malin: [[9, 0.8]], ljud: [[K(2), 1.1 + L(9)]],
    bild: 'Kaninen sätter sig på golvet med benen fram. **Nickar**', ljudtext: 'förtjust pip (2)', ansikte: 'glad' },
  { id: '7', d: 0.3 + L(10) + 0.8, plats: 'Närbild, benen', malin: [[10, 0.3]], ljud: [['strumpa/strumpa-1', 0.3 + ORD[10].pa]],
    bild: 'Strumpan glider från kroken till vänstra foten, benet lyfts, sitter på *"på!"*', ljudtext: '`strumpa`', ansikte: 'glad' },
  { id: '8', d: 0.3 + L(11) + 0.8, plats: 'Samma', malin: [[11, 0.3]], ljud: [['strumpa/strumpa-2', 0.3 + ORD[11].pa]],
    bild: 'Samma med högra foten', ljudtext: '`strumpa`', ansikte: 'fnissig' },
  { id: '9', d: 0.6 + L(12) + 1.4, plats: 'Julhallen, helbild', malin: [[12, 0.6]], ljud: [[K(5, 'b'), 0.9 + L(12)]],
    bild: 'Kaninen ställer sig upp, overallen lyfter från kroken', ljudtext: 'nyfiket pip (5b)', ansikte: 'nyfiken' },
  { id: '10', d: 0.3 + L(13) + 0.8, plats: 'Halvbild', malin: [[13, 0.3]], ljud: [['prassel-tyg/prassel-tyg-1', 0.3 + ORD[13].pa - 0.1]],
    bild: 'Byxbenen glider på först, sedan bålen och ärmarna, sitter på *"på!"*', ljudtext: '`prassel-tyg`', ansikte: 'glad' },
  { id: '11', d: 2.4, plats: 'Närbild, magen', ljud: [['zipp/zipp-1', 0.3], [K(2), 1.3]],
    bild: 'Dragkedjan: en kritlinje växer från magen upp till kragen (0,6 s). Malin säger inget', ljudtext: '`zipp`, förtjust pip (2)', ansikte: 'jätteglad' },
  { id: '12', d: 0.4 + L(14) + 1.0, plats: 'Halvbild', malin: [[14, 0.4]],
    bild: 'Kaninen tittar på stövlarna vid dörren', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '13', d: 0.3 + L(15) + 1.0, plats: 'Julhallen, helbild', malin: [[15, 0.3]], ljud: [['duns/duns-1', 0.3 + ORD[15].en], ['duns/duns-2', 0.3 + ORD[15].tva]],
    bild: 'Stövlarna glider fram från dörren och upp på fötterna, en i taget', ljudtext: '`duns` ×2', ansikte: 'glad' },
  { id: '14', d: 0.4 + L(16) + 1.0 + L(17) + 1.2, plats: 'Halvbild', malin: [[16, 0.4], [17, 0.4 + L(16) + 1.0]], ljud: [['prassel-tyg/prassel-tyg-1', 0.2], [K(7), 0.6 + L(16) + 1.0 + L(17)]],
    bild: 'Pannbandet glider från kroken ner över öronen, som trycks ihop. Paus 1 s mellan replikerna', ljudtext: '`prassel-tyg`, frågande pip (7)', ansikte: 'förvånad' },
  { id: '15', d: 0.3 + L(18) + 1.6, plats: 'Närbild, huvudet', malin: [[18, 0.3]], ljud: [['plopp/plopp-1', 0.35], ['plopp/plopp-1', 0.3 + 0.65 * L(18)], [K(3), 0.5 + L(18)]],
    bild: 'Bandet sitter, öronen ploppar ut ett i taget på *"Plopp!"*', ljudtext: '`plopp` ×2, fniss (3)', ansikte: 'fnissig' },
  { id: '16', d: 0.4 + L(19) + 1.8, plats: 'Samma', malin: [[19, 0.4]], ljud: [[K(4), 0.6 + L(19)]],
    bild: 'Öronen vickar växelvis', ljudtext: 'mysig suck (4)', ansikte: 'nöjd' },
  { id: '17', d: 0.3 + L(20) + 2.4, plats: 'Halvbild', malin: [[20, 0.3]], ljud: [[K(6), 0.9 + L(20)]],
    bild: 'En grå vante glider mot kaninen. Kaninen skakar på huvudet, armarna ner, vanten glider tillbaka till kroken', ljudtext: 'trumpet pip (6)', ansikte: 'trumpen' },
  { id: '18', d: 0.3 + L(21) + 1.2 + L(22) + 0.8, plats: 'Närbild', malin: [[21, 0.3], [22, 0.3 + L(21) + 1.2]], ljud: [[K(6, 'b'), 0.5 + L(21)]],
    bild: 'Kaninen tittar bort, öronen sjunker åt sidorna', ljudtext: 'trumpet pip (6b)', ansikte: 'ledsen, tittar bort' },
  { id: '19a', d: 0.3 + L(23) + 4.0, plats: 'Halvbild', malin: [[23, 0.3]], ljud: [['krita-ritar/krita-ritar-2', 0.3 + L(23)]],
    bild: 'Kritan (liten, ingen min) ritar två tumvantar i luften: tummen och muddkanten som egna drag. Halvvägs här', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '19b', d: 3.0, plats: 'Samma', bild: 'Gisspaus: konturen klar, kritan svajar bredvid', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '19c', d: 0.1 + L(24) + 0.6, plats: 'Samma', malin: [[24, 0.1]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Tumvantarna fylls i med rosa inifrån och glimtar', ljudtext: '`glitter`', ansikte: 'förvånad' },
  { id: '20', d: 0.6 + L(25) + 1.2, plats: 'Närbild', malin: [[25, 0.6]], ljud: [[K(2), 0.3]],
    bild: 'Kawaii-ögon, öronen reser sig, ett lugnt skutt', ljudtext: 'förtjust pip (2)', ansikte: 'jätteglad (glitter i ögonen)' },
  { id: '21', d: 0.3 + L(26) + 2.5 + L(27) + 1.4, plats: 'Samma', malin: [[26, 0.3], [27, 0.3 + L(26) + 2.5]], ljud: [[K(5), 0.6 + L(26)], [K(2, 'b'), 0.4 + L(26) + 2.5 + L(27)]],
    bild: 'Paus 2,5 s: barnet säger tack. **Nickar** direkt på *"Tack!"*', ljudtext: 'nyfiket pip (5), förtjust pip (2b)', ansikte: 'glad' },
  { id: '22', d: 0.4 + L(28) + 1.6, plats: 'Julhallen, helbild', malin: [[28, 0.4]], ljud: [[K(2), 0.7 + L(28)]],
    bild: 'Kaninen sträcker ut armen mot vantarna. **Nickar**', ljudtext: 'förtjust pip (2)', ansikte: 'jätteglad' },
  { id: '23', d: 0.3 + L(29) + 0.6, plats: 'Halvbild', malin: [[29, 0.3]],
    bild: 'Den första vanten glider mot armen …', ljudtext: '–', ansikte: 'glad' },
  { id: '24', d: 0.6 + L(30) + 1.6, plats: 'Halvbild', malin: [[30, 0.6]], ljud: [['plopp/plopp-1', 0.35], [K(3), 0.8 + L(30)]],
    bild: '… och landar på högra örats spets. Kaninen tittar upp, förvånad', ljudtext: '`plopp`, fniss (3)', ansikte: 'förvånad → fnissig' },
  { id: '25', d: 0.3 + L(31) + 1.4, plats: 'Halvbild', malin: [[31, 0.3]], ljud: [['prassel-tyg/prassel-tyg-1', 0.3 + ORD[31].pa - 0.1], [K(2, 'b'), 0.5 + L(31)]],
    bild: 'Vanten glider ner från örat till tassen, sitter på *"på!"*', ljudtext: '`prassel-tyg`, förtjust pip (2b)', ansikte: 'glad' },
  { id: '26', d: 1.0 + L(32) + 1.4, plats: 'Julhallen, helbild', malin: [[32, 1.0]], ljud: [[K(7), 1.2 + L(32)]],
    bild: 'Den andra vanten faller lugnt, glider åt höger över golvet och försvinner bakom korgen. Barnet ser det hända', ljudtext: 'frågande pip (7)', ansikte: 'förvånad' },
  { id: '27', d: 0.3 + L(33) + 1.6, plats: 'Halvbild', malin: [[33, 0.3]], ljud: [[K(7, 'b'), 0.6 + L(33)]],
    bild: 'Kaninen tittar åt vänster, sedan åt höger (ögonen, huvudet vänds inte)', ljudtext: 'frågande pip (7b)', ansikte: 'nyfiken' },
  { id: '28a', d: 0.3 + L(34) + 0.4, plats: 'Julhallen, helbild', malin: [[34, 0.3]],
    bild: 'Bred bild på frågan: kaninen, hängaren och korgen', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '28b', d: 4.0, plats: 'Närbild, korgen (klipp)', ljud: [['tindra/tindra-1', 1.9]],
    bild: 'Paus 5 s: tummen sticker fram vid korgens högra kant. Efter 3 s skimrar den svagt', ljudtext: 'tyst, ett svagt `tindra`', ansikte: '–' },
  { id: '29', d: L(35) + 1.4, plats: 'Halvbild', malin: [[35, 0.0]], ljud: [['tindra/tindra-2', 0.0], [K(2), 0.2 + L(35)]],
    bild: 'Vanten skimrar tydligt, kaninen gör ett lugnt skutt', ljudtext: '`tindra`, förtjust pip (2)', ansikte: 'jätteglad' },
  { id: '30', d: 0.3 + L(36) + 0.8, plats: 'Halvbild', malin: [[36, 0.3]], ljud: [['prassel-tyg/prassel-tyg-1', 0.3 + ORD[36].pa - 0.1]],
    bild: 'Vanten glider fram ur gömstället och upp på andra tassen', ljudtext: '`prassel-tyg`', ansikte: 'glad' },
  { id: '31', d: 0.4 + L(37) + 1.6, plats: 'Julhallen, helbild', malin: [[37, 0.4]], ljud: [[K(4), 0.6 + L(37)]],
    bild: 'Allt på: pannband, overall, stövlar, rosa vantar. Ett lugnt skutt', ljudtext: 'mysig suck (4)', ansikte: 'nöjd' },
  { id: '32', d: 0.6 + L(38) + 2.0, plats: 'Julhallen, helbild → kritsvep', malin: [[38, 0.6]], ljud: [['steg/steg-1', 0.3], ['steg/steg-2', 0.9], ['steg/steg-3', 1.5], ['swoosh/swoosh-1', 0.6 + L(38) + 0.4]],
    bild: 'Tre lugna hopp till dörren, dörren öppnas (en vit ljus springa), kritsvep', ljudtext: '`steg` ×3, kritsvep', ansikte: 'jätteglad' },

  // --- Pulkabacken ---
  { id: '33', d: 0.6 + L(39) + 1.4, plats: 'Pulkabacken, helbild', malin: [[39, 0.6]], ljud: [['knarr-sno/knarr-sno-3', 0.2], [K(7), 0.8 + L(39)]],
    bild: 'Snöflingor. Kaninen står nedanför backen och tittar upp mot krönet', ljudtext: '`knarr-sno`, frågande pip (7)', ansikte: 'nyfiken' },
  { id: '34a', d: 0.3 + L(40) + 3.0, plats: 'Samma', malin: [[40, 0.3]], ljud: [['krita-ritar/krita-ritar-3', 0.3 + L(40)]],
    bild: 'Kritan ritar pulkans kontur på krönet (`pulka-kontur.json`), kort väntan', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '34b', d: 0.1 + L(41) + 0.8, plats: 'Samma', malin: [[41, 0.1]], ljud: [['glitter/glitter-2', 0.0]],
    bild: 'Pulkan fylls i', ljudtext: '`glitter`', ansikte: 'jätteglad' },
  { id: '35', d: 0.4 + L(42) + 1.2, plats: 'Krönet, halvbild (klipp)', malin: [[42, 0.4]], ljud: [[K(2), 0.6 + L(42)]],
    bild: 'Kaninen sitter på pulkan högst upp', ljudtext: 'förtjust pip (2)', ansikte: 'jätteglad' },
  { id: '36', d: 0.3 + L(43) + 4.0, plats: 'Samma', malin: [[43, 0.3]],
    bild: 'Paus 4 s: kaninen gungar lite fram på varje tal barnet räknar', ljudtext: 'tyst', ansikte: 'glad' },
  { id: '37', d: 0.2 + L(44) + 0.3, plats: 'Samma', malin: [[44, 0.2]],
    bild: 'Malin räknar, kaninen gungar på varje tal', ljudtext: '–', ansikte: 'glad' },
  { id: '38', d: 3.6, plats: 'Pulkabacken, helbild', malin: [[45, 0.0]], ljud: [['wiii/wiii-1', 0.0], ['swoosh/swoosh-2', 0.1], ['pulka-glid/pulka-glid-2', 0.15], [K(3), 2.6]],
    bild: 'Pulkan glider nedför backen i en bana (2,2 s), snöpuffar bakom medarna', ljudtext: '`wiii`, `swoosh`, fniss (3)', ansikte: 'jätteglad' },
  { id: '39', d: 0.3 + L(46) + 1.6, plats: 'Pulkabacken, helbild (klipp till krönet)', malin: [[46, 0.3]], ljud: [['swoosh/swoosh-3', 0.3 + Math.max(0, L(46) - 0.8)], ['pulka-glid/pulka-glid-2', 0.35 + Math.max(0, L(46) - 0.8)]],
    bild: 'Högst upp igen, en tur till, kortare', ljudtext: '`swoosh`', ansikte: 'jätteglad' },
  { id: '40', d: 0.4 + L(47) + 1.6, plats: 'Halvbild', malin: [[47, 0.4]], ljud: [[HEJDA, 0.6 + L(47)]],
    bild: 'Kaninen på pulkan vinkar (armen bakom kroppen), vanten följer med', ljudtext: '`kanin-hejda`', ansikte: 'jätteglad' },
  { id: '41', d: 0.3 + L(48) + 1.4, plats: 'Samma', malin: [[48, 0.3]], ljud: [[K(4, 'b'), 0.5 + L(48)]],
    bild: 'Kaninen vinkar klart', ljudtext: 'mysig suck (4b)', ansikte: 'glad' },
  { id: '42', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt kaninen på pulkan', ljudtext: 'mattan klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
