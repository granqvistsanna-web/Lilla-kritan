// Mall för Kritans bok: storyboardens rader, en stillbild per uppslag i manus.md. Byt allt som är märkt BYT.
// bygg.mjs räknar starttiderna (summan av d), ritar stillbilderna (scen.html + scen.js), skriver tabellen i storyboard.md,
// index.html och animatiken. Scenen (../scener/boken/boken.js) läser samma rader.
// d = bildens längd i s. malin = [[replikens nr i ROST, sekunder in i bilden]]. ljud = [[fil under assets/ljud/effekter/ utan .m4a, s in]].
// s = bildens läge i boken (scen.js läser det). Varje rad ändrar bara det som är nytt, resten ärvs från raden före.
export const TITEL = 'Sommaren i boken';     // BYT
export const ROSTMAPP = 'mall-i-boken';      // BYT: mappen i assets/ljud/roster/
export const MATTA = ['skogsljud/skogsljud-1', 0.3];   // BYT: mattan under hela scenen, [fil, volym]
// Malins repliker: [fil, längd i s, text]. UPPSKATTAD = true tills rösten är inspelad och uppmätt (0,075 s per tecken).
export const UPPSKATTAD = true;
export const ROST = [
  ['01-titta-en-bok', 1.4, 'Titta! En bok.'],
  ['02-sommar-i-boken', 2.3, 'Oj! Det är sommar i boken!'],
  ['03-var-ar-solen', 3.0, 'Himlen är blå. Men var är solen?'],
  ['04-dar-ar-solen', 1.4, 'Där är solen!'],
  ['05-hej-kaninen', 1.2, 'Hej kaninen!'],
  ['06-kritan-ritar', 2.2, 'Titta, kritan ritar något.'],
  ['07-varsagod', 2.4, 'Varsågod, kaninen. En glass!'],
  ['08-tack-kritan', 1.3, 'Tack, kritan!'],
  ['09-ser-du-blommor', 2.0, 'Ser du några blommor?'],
  ['10-en-rod-en-rosa', 3.2, 'En röd blomma! En rosa blomma!'],
  ['11-hej-da-kaninen', 1.6, 'Hej då, kaninen!'],
  ['12-vi-ses-snart', 2.4, 'Hej då! Vi ses snart!'],
];
export const L = n => ROST[n - 1][1];
export const GLES = 1.0;   // luft i varje rads slut, där figuren byter uttryck (reaktionsslaget)

// Lägena: sol/sak 'nej' | 'kontur' (kritan ritar) | 'ja' · figur 'nere' | 'uppe' · plats: figurens plats (PLATS i uppslaget.js)
const START = { vy: 'bord', parm: 0, kort: 0, sol: 'nej', sak: 'nej', figur: 'nere', plats: 'mitt', kritan: false };
export const RADER = [
  { id: '00', d: 1.0, plats: 'Logga', bild: 'Lilla Kritans logotyp, 1 s', ljudtext: '–', s: { ...START } },
  { id: '01', d: 0.3 + L(1) + 0.3, plats: 'Skrivbordet, helbild', malin: [[1, 0.3]], ljud: [['glimt/glimt-1', 0.2]],
    bild: 'Den stängda boken med temats huvudsak på pärmen', ljudtext: 'glimt', s: { ...START } },
  { id: '02', d: 0.5 + L(2) + 2.0, plats: 'Kameran glider in i boken', malin: [[2, 0.5]], ljud: [['prassel-tyg/prassel-tyg-1', 0], ['pop/pop-1', 0.6]],
    bild: 'Pärmen slås upp, korten fälls upp bakifrån och fram', ljudtext: 'prassel-tyg, pop', s: { vy: 'in', parm: 1, kort: 1 } },
  { id: '03', d: 0.3 + L(3) + 4.0, plats: 'Himlen', malin: [[3, 0.3]],
    bild: 'Något saknas. Kritan ritar temats huvudsak på pärmens insida', ljudtext: 'krita-ritar', s: { vy: 'himmel', sol: 'kontur', kritan: true } },
  { id: '04', d: 0.8 + L(4) + GLES, plats: 'Himlen', malin: [[4, 0.8]], ljud: [['glitter/glitter-1', 0.1]],
    bild: 'Teckningen fylls i inifrån', ljudtext: 'glitter', s: { sol: 'ja', kritan: false } },
  { id: '05', d: 0.6 + L(5) + 2.0 + GLES, plats: 'Figuren, halvbild', malin: [[5, 0.6]], ljud: [['pop/pop-1', 0.2]],
    bild: 'Figurens kort fälls upp sist. Figuren vinkar', ljudtext: 'pop', s: { vy: 'halv', figur: 'uppe' } },
  { id: '06', d: 0.3 + L(6) + 3.5, plats: 'Hjälpsaken, närbild', malin: [[6, 0.3]],
    bild: 'Kritan ritar hjälpsaken på sidan', ljudtext: 'krita-ritar', s: { vy: 'sak', sak: 'kontur', kritan: true } },
  { id: '07', d: 1.0 + L(7) + 1.6 + L(8) + GLES, plats: 'Hjälpsaken, närbild', malin: [[7, 1.0], [8, 1.0 + L(7) + 1.6]], ljud: [['glitter/glitter-1', 0.1], ['pop/pop-1', 0.85]],
    bild: 'Teckningen fylls i och kortet reser sig. Figuren nickar', ljudtext: 'glitter, pop', s: { sak: 'ja', kritan: false } },
  { id: '08', d: 0.3 + L(9) + 3.0 + L(10) + GLES, plats: 'Hela uppslaget', malin: [[9, 0.3], [10, 0.3 + L(9) + 3.0]],
    bild: 'Barnet tittar efter sakerna (3 s), sedan studsar och glimtar de på sina ord', ljudtext: 'glimt', s: { vy: 'uppslag' } },
  { id: '09', d: 0.3 + L(11) + 2.0 + L(12) + 0.6, plats: 'Figuren, halvbild', malin: [[11, 0.3], [12, 0.3 + L(11) + 2.0]],
    bild: 'Figuren vinkar hej då', ljudtext: '–', s: { vy: 'hejda' } },
  { id: '10', d: 2.4, plats: 'Skrivbordet', ljud: [['prassel-tyg/prassel-tyg-1', 1.0], ['landa-mjuk/landa-mjuk-1', 1.7]],
    bild: 'Kameran glider ut, korten fälls ner (figuren först), pärmen slås igen', ljudtext: 'prassel-tyg, landa-mjuk', s: { vy: 'bord', parm: 0, kort: 0, figur: 'nere' } },
];
// läget ärvs från raden före
{ let s = {}; for (const r of RADER) r.s = s = { ...s, ...r.s }; }
