// Storyboardens rader för 047 Katten åker buss: en stillbild per uppslag (manus v3, rad 01–46). bygg.mjs räknar starttiderna
// (summan av d), ritar stillbilderna ur scen.html, skriver tabellen i storyboard.md, index.html och animatiken. (Förlaga: 044.)
// d = radens längd i s. malin = [[replikens nr i ../rost.txt, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]. Längderna ur ../rost-langder.txt (mätt när tagningen delades 2026-11-20).
// Bussljuden godkända av Sanna 2026-11-20 (grind 4): filerna utan siffra i effekter/buss/. Kattens, kaninens och fågelns ljud är befintliga.
import { readFileSync } from 'node:fs';

const HAR = new URL('./', import.meta.url).pathname;
const rader = readFileSync(HAR + '../rost.txt', 'utf8').trim().split('\n').map(l => l.match(/^(\S+)\s+(?:\[[^\]]*\]\s*)?(.+?)(?:\s*\[[^\]]*\])?$/).slice(1));
const matt = Object.fromEntries([...readFileSync(HAR + '../rost-langder.txt', 'utf8').matchAll(/'([^']+)':\s*([\d.]+)/g)].map(m => [m[1], +m[2]]));
// Repliknumren (malin, L) följer rost.txt utan tilläggen med bokstav (06b …): de läggs sist, så att de gamla numren står kvar.
// RN('06b') ger ett tilläggs nummer.
const ordning = [...rader.filter(([n]) => !/^\d+[a-z]-/.test(n)), ...rader.filter(([n]) => /^\d+[a-z]-/.test(n))];
export const ROST = ordning.map(([namn, text]) => [namn, text, matt[namn]]);   // [namn, text, längd]
export const RN = k => ROST.findIndex(([n]) => n.startsWith(k + '-')) + 1;
export const L = n => ROST[n - 1][2];
export const ORD = {};

// Kattens röst (mjau-gullig från 035/044): 1 hej, 2 förtjust, 3 fniss, 4 mysig, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då. Trill = jippi.
const M = n => `mjau-gullig/mjau-gullig-${n}`, OOO = 'mjau-ooo/mjau-ooo-1', TRILL = 'mjau-trill/mjau-trill-1', SPINN = 'mjau-spinn/mjau-spinn-1';
// Bussen (godkänd, grind 4): brum som matta (loopas med 1 s övertoning i bygg.mjs) i bygg.mjs, broms, dörren, kortläsaren, blinkers, plogen, stoppknappen, bron.
const BROMS = 'buss/buss-broms', DORR = 'buss/buss-dorr-pschhh', PIP = 'buss/kortlasare-pip', BLINK = 'buss/blinkers-tick',
  SKRAP = 'buss/snoplog-skrap', PLING = 'buss/stoppknapp-pling', BRO = 'buss/bro-dunk';
const STEG = n => `knarr-sno/knarr-sno-${n}`, HOPP = 'hopp-mjuk/hopp-mjuk-1', POP = 'pop/pop-1', TINDRA = 'tindra/tindra-1',
  GLITTER = 'glitter/glitter-1', RITAR = 'krita-ritar/krita-ritar-1', KNACK = 'knack/knack-1', KVITTER = 'fagelkvitter/fagelkvitter-2',
  FAGEL = 'fagel-pip/fagel-pip-1', KANIN = 'kanin-gullig/kanin-hej-1', DORRHUS = 'buss-dorr/buss-dorr-1';

const FRAGA = 4.0;
// stoppfrågorna: nästa rad börjar med sakens reaktionsslag (REAK) före svaret, så själva frågeraden kortas lika mycket (pausen blir ca 5 s)
const SVARREAK = 1.5;   // paus efter frågorna till barnet (Vad ser katten?, rita, trycka, knacka)

export const RADER = [
  { id: '00', d: 1.0, plats: 'Logotypen', bild: 'Lilla Kritans logotyp i 1 s, sedan papperet', ljudtext: '–', ansikte: '–' },

  // --- Kritan ritar (papperet): bussen ---
  { id: '01a', d: 7.0, plats: 'Papperet, helbild', malin: [[1, 0.6]], ljud: [[RITAR, 0.3]],
    bild: 'Kritan ritar bussens kontur i lugna drag: kroppen, fönstren, dörren och hjulen som egna drag', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01b', d: L(2) + 4.0, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen klar, kritan väntar bredvid och svajar: barnet gissar', ljudtext: 'tyst', ansikte: '–' },
  { id: '01c', d: 0.6 + L(3) + 1.6, plats: 'Papperet → zoom in', malin: [[3, 0.6]], ljud: [[GLITTER, 0.1]],
    bild: 'Bussen fylls i inifrån. Zoom in i teckningen, in på hållplatsen i snön', ljudtext: '`glitter`', ansikte: '–' },

  // --- Busshållplatsen ---
  { id: '1', d: 0.6 + L(4) + 1.4, plats: 'Hållplatsen, helbild', malin: [[4, 0.6]], ljud: [[M(1), 0.8 + L(4)]],
    bild: 'Katten står vid skylten i snön med nallen i famnen och vinkar (armen bakom kroppen)', ljudtext: 'mjau hej (1)', ansikte: 'jätteglad' },
  { id: '2', d: 0.3 + L(5) + 1.2, plats: 'Halvbild', malin: [[5, 0.3]], ljud: [[M(2), 0.5 + L(5)]],
    bild: 'Katten tittar bort längs vägen, öronen upp', ljudtext: 'förtjust (2)', ansikte: 'glad' },
  { id: '3', d: 0.8 + L(6) + 1.2, plats: 'Närbild', malin: [[6, 0.8]], ljud: [[SPINN, 0.1]],
    bild: 'Katten kramar nallen, huvudet lutar mot den. Malin efter kramen', ljudtext: 'mysig (spinn)', ansikte: 'mysig' },
  // rad 3b (06b ryggsäcken) borttagen (Sanna 2026-11-20)
  { id: '4', d: 0.3 + L(7) + 1.6, plats: 'Närbild', malin: [[7, 0.3]], ljud: [[STEG(1), 1.0], [STEG(2), 2.0], [STEG(3), 3.0]],
    bild: 'Katten gungar lite från fot till fot, svansen vickar', ljudtext: '`knarr-sno`', ansikte: 'nyfiken' },
  { id: '5', d: 1.2 + L(8) + 1.0, plats: 'Hållplatsen, helbild', malin: [[8, 1.2]], ljud: [[OOO, 0.6 + L(8)]],
    bild: 'Bussen hörs långt borta. Öronen reser sig. Malin efter öronen', ljudtext: 'brum långt bort (matta), mjau ooo', ansikte: 'förvånad → glad' },
  { id: '6', d: 2.4 + L(9) + 1.0, plats: 'Hållplatsen, helbild', malin: [[9, 2.4]], ljud: [[BROMS, 1.8]],
    bild: 'Bussen glider in och saktar in mjukt, stannar med dörren vid katten. Malin när den står still', ljudtext: 'broms (mjukt)', ansikte: 'jätteglad' },
  { id: '7', d: 0.3 + L(10) + 1.0, plats: 'Närbild på dörren', malin: [[10, 0.3]], ljud: [[DORR, 1.3]],
    bild: 'Bussdörren glider upp på *"pschhh"*', ljudtext: '`pschhh`', ansikte: '–' },
  { id: '8', d: 0.3 + L(11) + 1.8, plats: 'Hållplatsen, helbild', malin: [[11, 0.3]], ljud: [[HOPP, 0.3 + L(11) - 0.4]],
    bild: 'Vantehanden kommer in och håller kattens tass. Katten skuttar upp på trappsteget på *"hopp!"*', ljudtext: '`hopp-mjuk`', ansikte: 'glad' },

  // --- I bussen ---
  // rad 9 (12 blippa kortet) borttagen (Sanna 2026-11-20)
  { id: '10', d: 0.5 + L(13) + 1.2, plats: 'I bussen, kattens blick', malin: [[13, 0.5]], ljud: [[M(5), 0.7 + L(13)]],
    bild: 'Kattens huvud och öron bakifrån nere till vänster. Öronen vrids mot bänken och sedan mot stången', ljudtext: 'nyfiken (5)', ansikte: 'bakifrån' },
  { id: '11', d: 0.3 + L(14) + 1.2, plats: 'Närbild på knappen', malin: [[14, 0.3]], ljud: [[TINDRA, 0.0], [M(2), 0.5 + L(14)]],
    bild: 'Den röda knappen på stången skimrar', ljudtext: '`tindra`, förtjust (2)', ansikte: '–' },
  { id: '12', d: 0.3 + L(15) + 1.2, plats: 'Bild B, vid stången', malin: [[15, 0.3]], ljud: [[M(6), 2.2], [M(7), 0.5 + L(15)]],
    bild: 'Katten sträcker tassen mot knappen. Vantehanden håller lugnt tassen: *"Inte än"*', ljudtext: 'trumpen (6), sedan ja (7)', ansikte: 'nyfiken → trumpen → glad' },
  { id: '13', d: 1.4 + L(16) + 1.0, plats: 'Bild B, sätet', malin: [[16, 1.4]], ljud: [[HOPP, 0.4], [M(2), 0.4 + L(16) + 1.4]],
    bild: 'Katten skuttar upp på sätet vid fönstret och sätter sig med nallen. Malin när den sitter', ljudtext: '`hopp-mjuk`, glad (2)', ansikte: 'glad' },
  { id: '14', d: 1.0 + L(17) + 1.0, plats: 'Bild B, sätet', malin: [[17, 1.0]], ljud: [[DORR, 0.1]],
    bild: 'Dörren stängs (hörs), bussen gungar lite. Brummet börjar', ljudtext: '`pschhh`, brum (matta)', ansikte: 'glad' },
  { id: '15', d: 0.5 + L(18) + 1.0, plats: 'Bild A, ut genom fönstret', malin: [[18, 0.5]],
    bild: 'Fönstret fyller bilden. Kattens huvud och öron bakifrån nere i bild. Snö och granar glider förbi åt vänster', ljudtext: 'brum', ansikte: 'bakifrån' },
  { id: '16', reak: 'jatteglad', d: 0.8 + L(19) + 1.0, plats: 'Bild A', malin: [[19, 0.8]],
    bild: 'Röda hus med ljus i fönstren glider förbi', ljudtext: 'brum', ansikte: 'bakifrån, öronen mot husen' },
  { id: '17', reak: 'forvanad', d: 0.8 + L(20) + 1.0, plats: 'Bild A', malin: [[20, 0.8]], ljud: [[TINDRA, 1.0 + L(20) - 1.2]],
    bild: 'En frusen sjö glider förbi, isen blänker på *"Blank, blank!"*', ljudtext: 'brum, `tindra`', ansikte: 'bakifrån' },
  { id: '18', d: 0.8 + L(21) + 1.2, plats: 'Bild A', malin: [[21, 0.8]], ljud: [[OOO, 0.8 + L(21) + 0.2]],
    bild: 'En snöig backe glider in. Långt bort åker kaninen pulka nerför backen och vinkar', ljudtext: 'brum, mjau ooo', ansikte: 'bakifrån, öronen reser sig' },
  { id: '19', reak: 'kanin', d: 0.3 + L(22) + 3.0 + L(23) + 1.0, plats: 'Bild A', malin: [[22, 0.3], [23, 0.3 + L(22) + 3.0]], ljud: [[KANIN, 0.3 + L(22) + 3.0 + L(23) + 0.2]],
    bild: 'Bussen saktar lite, kaninen vinkar igen. Paus 3 s för barnet att vinka', ljudtext: 'kaninens hej (litet, långt bort)', ansikte: 'bakifrån' },
  { id: '20', d: 1.6 + L(24) + FRAGA - SVARREAK, plats: 'Bild A, stopp 1', malin: [[24, 1.6]], ljud: [[BROMS, 0.2]],
    bild: 'Landskapet saktar in och stannar. En snögubbe mitt i fönstret. Öronen reser sig. Paus 4 s', ljudtext: 'broms (mjukt), tyst', ansikte: 'bakifrån' },
  { id: '21', reak: 'fniss', d: 0.8 + L(25) + 1.2, plats: 'Bild A', malin: [[25, 0.8]], ljud: [[POP, 0.3], [M(2), 1.0 + L(25)]],
    bild: 'Snögubben poppar till', ljudtext: '`pop`, förtjust (2)', ansikte: 'bakifrån' },
  { id: '22', d: 0.3 + L(26) + 1.2, plats: 'Bild B', malin: [[26, 0.3]], ljud: [[M(1), 0.5 + L(26)]],
    bild: 'Katten vinkar mot fönstret (armen bakom kroppen)', ljudtext: 'hej (1)', ansikte: 'jätteglad' },
  { id: '23', reak: 'fniss', d: 1.2 + L(27) + 1.4, plats: 'Bild A', malin: [[27, 1.2]], ljud: [[FAGEL, 0.4], [KVITTER, 0.9], [M(3), 1.4 + L(27)]],
    bild: 'En liten blå fågel flyger in och landar på snögubbens hatt. Malin när den landat', ljudtext: 'pip, kvitter, fniss (3)', ansikte: 'bakifrån' },
  { id: '24', d: 0.5 + L(28) + 1.0, plats: 'Bild A', malin: [[28, 0.5]],
    bild: 'Landskapet börjar glida igen', ljudtext: 'brum', ansikte: 'bakifrån' },
  { id: '26', d: 1.6 + L(30) + FRAGA - SVARREAK, plats: 'Bild A, stopp 2', malin: [[30, 1.6]], ljud: [[BROMS, 0.2], [BLINK, 1.6 + L(30)]],
    bild: 'Landskapet saktar in. En gul snöplog står utanför, lampan blinkar. Paus 4 s', ljudtext: 'broms, blinkers tick-tick', ansikte: 'bakifrån' },
  { id: '27', reak: 'nyfiken', d: 0.8 + L(31) + 1.4, plats: 'Bild A', malin: [[31, 0.8]], ljud: [[SKRAP, 0.3]],
    bild: 'Snöplogen poppar till och skjuter lite snö åt sidan', ljudtext: '`pop`, snöplog-skrap', ansikte: 'bakifrån' },
  { id: '29', reak: 'forvanad', d: 0.5 + L(33) + 1.2, plats: 'Bild A', malin: [[33, 0.5]],
    bild: 'Landskapet glider igen. Fönstret immar sakta från kanterna tills det är vitt', ljudtext: 'brum', ansikte: 'bakifrån' },
  // 29b (Sanna 2026-11-20): Malin om imman efter rad 33; katten andas på det vita glaset och tittar på det
  { id: '29b', d: 0.45 + L(RN('33b')) + 0.8, plats: 'Bild A, imman', malin: [[RN('33b'), 0.45]],
    bild: 'Katten andas på det vita glaset och tittar på imman', ljudtext: '–', ansikte: 'nyfiken' },
  { id: '30', d: 0.3 + L(34) + 3.0 + L(35) + 1.2, plats: 'Bild A, imman', malin: [[34, 0.3], [35, 0.3 + L(34) + 3.0]], ljud: [[RITAR, 0.3 + L(34) + 0.5], [GLITTER, 0.3 + L(34) + 2.2]],
    bild: 'Kritan kommer in och ritar ett hjärta i imman. Gisspaus 3 s. Genom hjärtat syns det klart', ljudtext: 'kritan ritar, `glitter`', ansikte: 'bakifrån' },
  { id: '31', d: 0.3 + L(36) + FRAGA, plats: 'Bild B', malin: [[36, 0.3]], ljud: [[M(5), 0.3 + L(36) + 0.2]],
    bild: 'Katten tittar på hjärtat, stolt. Paus 4 s: barnet ritar med fingret', ljudtext: 'nyfiken (5)', ansikte: 'stolt' },
  { id: '32', d: 0.5 + L(37) + 1.2, plats: 'Bild A, genom hjärtat', malin: [[37, 0.5]],
    bild: 'Stan glider förbi genom hjärtat: hus och affärer med ljusslingor och stjärnor', ljudtext: 'brum', ansikte: 'bakifrån' },
  { id: '33', d: 1.6 + L(38) + FRAGA - SVARREAK, plats: 'Bild A, stopp 3', malin: [[38, 1.6]], ljud: [[BROMS, 0.2]],
    bild: 'Landskapet saktar in. En stor julgran med ljus på ett torg, genom hjärtat. Paus 4 s', ljudtext: 'broms, tyst', ansikte: 'bakifrån' },
  { id: '34', reak: 'jatteglad', d: 0.3 + L(39) + 1.4, plats: 'Bild A', malin: [[39, 0.3]], ljud: [[TINDRA, 0.2], [SPINN, 0.5 + L(39)]],
    bild: 'Julgranens ljus tindrar', ljudtext: '`tindra`, mysig (spinn)', ansikte: 'bakifrån' },
  { id: '35', d: 0.3 + L(40) + 1.2, plats: 'Bild B', malin: [[40, 0.3]], ljud: [[M(4), 0.5 + L(40)]],
    bild: 'Katten vaggar lite med nallen', ljudtext: 'mysig (4)', ansikte: 'mysig' },
  { id: '36', d: 0.6 + L(41) + 1.2, plats: 'Bild B', malin: [[41, 0.6]], ljud: [[TRILL, 0.6 + L(41) + 0.2]],
    bild: 'Katten tittar på knappen och sedan upp mot tittaren, öronen högt', ljudtext: 'jippi (trill)', ansikte: 'nyfiken → jätteglad' },
  { id: '37', d: 0.6 + L(42) + 0.6, plats: 'Närbild på knappen', malin: [[42, 0.6]],
    bild: 'Den röda stoppknappen. Kattens tass kommer in', ljudtext: '–', ansikte: '–' },
  { id: '38', d: 0.3 + L(43) + FRAGA + L(44) + 1.0, plats: 'Närbild på knappen', malin: [[43, 0.3], [44, 0.3 + L(43) + FRAGA + 0.15]], ljud: [[PLING, 0.3 + L(43) + FRAGA - 0.3]],
    bild: 'Paus 4 s, sedan trycker tassen, knappen lyser, *"Pling!"*', ljudtext: '`pling`', ansikte: '–' },
  { id: '39', d: 1.6 + L(45) + FRAGA - SVARREAK, plats: 'Bild A, framme', malin: [[45, 1.6]], ljud: [[BROMS, 0.2]],
    bild: 'Landskapet saktar in. Farmors röda hus med kransen glider in och stannar mitt i fönstret. Paus 4 s', ljudtext: 'broms, tyst', ansikte: 'bakifrån' },
  { id: '40', reak: 'jatteglad', d: 0.3 + L(46) + 1.4, plats: 'Bild A', malin: [[46, 0.3]], ljud: [[TRILL, 0.5 + L(46)]],
    bild: 'Öronen reser sig högt och vickar', ljudtext: 'jippi (trill)', ansikte: 'bakifrån, öronen högt' },

  // --- Farmors dörr ---
  { id: '41', d: 0.3 + L(47) + 1.2, plats: 'Farmors dörr, helbild', malin: [[47, 0.3]], ljud: [[DORR, 0.0], [STEG(1), 1.6], [STEG(2), 2.3], [STEG(3), 3.0], [STEG(4), 3.7]],
    bild: 'Katten trippar in från vänster med nallen och stannar framför dörren', ljudtext: '`pschhh` långt bort, `knarr-sno`', ansikte: 'glad' },
  { id: '42', d: 0.3 + L(48) + 0.4 + L(49) + FRAGA, plats: 'Farmors dörr, halvbild', malin: [[48, 0.3], [49, 0.3 + L(48) + 0.4]], ljud: [[KNACK, 0.3 + L(48) - 1.2]],
    bild: 'Katten knackar på dörren med tassen (rak arm). Paus 4 s: barnet knackar', ljudtext: 'knack ×2', ansikte: 'glad' },
  { id: '43', d: 1.4 + L(50) + 1.2, plats: 'Farmors dörr, helbild', malin: [[50, 1.4]], ljud: [[DORRHUS, 0.1], [TRILL, 1.4 + L(50) + 0.2]],
    bild: 'Dörren öppnas. Farmor står i dörren och ler. Malin när dörren är öppen', ljudtext: 'dörr (mjuk), jippi (trill)', ansikte: 'jätteglad' },
  { id: '44', d: 1.0 + L(51) + 1.4, plats: 'Farmors dörr, halvbild', malin: [[51, 1.0]], ljud: [[SPINN, 0.4]],
    bild: 'Farmor lutar sig lugnt mot katten, kram', ljudtext: 'mysig (spinn)', ansikte: 'mysig, ögonen öppna' },
  { id: '45', d: 0.3 + L(52) + 1.4, plats: 'Halvbild', malin: [[52, 0.3]], ljud: [[M(8), 0.5 + L(52)]],
    bild: 'Katten vinkar mot tittaren med nallen i andra tassen, farmor vinkar bakom', ljudtext: 'hej då (8)', ansikte: 'jätteglad' },
  { id: '46', d: 2.5, plats: 'Kritirisen', bild: 'Kritirisen drar ihop sig runt katten och farmor', ljudtext: 'vinterljudet klingar ut', ansikte: 'glad' },
];

// Receptets luft: 0,7 s extra på varje rad med en replik (inte under ritintrots kontur och gisspaus).
export const GLES = 0.7;
for (const r of RADER) if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES;
// Repliker aldrig närmare än 0,4 s efter ett klipp (Sanna 2026-11-20 "cut off VO"): börjar en replik tidigare flyttas den och
// allt som kommer efter den i raden, och raden blir lika mycket längre.
const skjut = (r, fran, dt) => { for (const e of r.malin || []) if (e[1] >= fran - 1e-6) e[1] += dt;
  for (const e of r.ljud || []) if (e[1] >= fran + 0.3) e[1] += dt; r.d += dt; };   // effekter vid radens början (saken syns) står kvar
for (const r of RADER) { const m = r.malin?.[0]; if (m && m[1] < 0.45 && !['01b'].includes(r.id)) skjut(r, m[1], 0.45 - m[1]); }
// Reaktionerna i fönsterbilden (runda 20:30): saken syns → 0,4–0,8 s → kattens ansikte reagerar i samma bild (minst 1,2 s) → Malin.
// Raden blir REAK längre och repliken (med det som följer) flyttas REAK senare. Rad 29 (imman) reagerar på "Oj!" i stället.
export const REAK = 1.3;
for (const r of RADER) if (r.reak && r.id !== '29') skjut(r, r.malin[0][1], REAK);

// Mattorna i animatiken: [fil, från rad, till rad (start), volym]. Brummet bara medan bussen syns eller hörs.
export const MATTOR = [
  ['vinterljud/vinterljud-1', '1', '10', 0.25],
  ['buss/buss-brum', '5', '10', 0.12],
  ['buss/buss-brum', '14', '41', 0.22],
  ['vinterljud/vinterljud-2', '41', null, 0.25],
];
