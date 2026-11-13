// Storyboardens rader för 026 Zebran går och lägger sig: en rad per uppslag i manus.md (01 och 5 är delade, för att bilden
// byts mitt i uppslaget). bygg.mjs räknar starttiderna (summan av d), tar stillbilderna ur scenen (../scener/sovrummet),
// skriver tabellen i storyboard.md, index.html och animatiken. Scenen läser samma rader.
// d = radens längd i s. malin = [[replikens nr i ROST, sekunder in i raden]]. ljud = [[fil under assets/ljud/effekter/ utan
// .m4a, sekunder in i raden]]; null som fil = zebrans gnagg-gullig (finns inte än: tystnad tills filen finns).
//
// Malins repliker: filnamn och text ur ../rost.txt. Längden (andra värdet) är null tills tagningen är delad och uppmätt;
// då räknas den som 0,075 s per tecken (UPPSKATTAD). Mät med ffprobe och skriv in sekunderna.
export const TITEL = 'Zebran går och lägger sig', ROSTMAPP = 'zebran-gar-och-lagger-sig';
export const ROST = [
  ['01-kritan-ritar', 2.17, 'Kritan ritar …'],
  ['02-vad-blir-det', 1.93, 'Hm … vad blir det nu?'],
  ['03-zebra', 2.53, 'Oj! En zebra!'],
  ['04-hej-zebran', 0.86, 'Hej, zebran!'],   // Sanna 2026-11-12: ett "hej" räcker (04-hej-zebran-hej.m4a klippt efter "zebran",
  ['05-kvall-manen', 3.4, 'Det är kväll nu. Titta, månen!'],
  ['06-val-lagga-dig', 1.56, 'Nu ska du väl gå och lägga dig?'],
  ['07-zebran-vill-visst', 3.02, 'Oj då. Zebran vill visst inte lägga sig.'],
  ['08-vad-gor', 2.03, 'Hm … vad gör vi nu?'],
  ['09-titta-kritan-ritar', 2.56, 'Titta! Kritan ritar något.'],
  ['10-kudde-varsagod-zebran', 3.1, 'En kudde! Varsågod, zebran.'],
  ['11-saga-tack', 1.17, 'Ska vi säga tack?'],
  ['12-tack', 0.72, 'Tack!'],
  ['13-mjuk-kudde', 3.55, 'Mmm … vilken mjuk kudde!'],
  ['14-var-ar-zebran', 2.03, 'Oj! Var är zebran?'],
  ['15-tittut', 0.85, 'Tittut!'],
  ['16-var-ar-zebran', 1.69, 'Var är zebran?'],
  ['17-tittut', 1.57, 'Tittut!'],
  ['18-gaspning-trott', 3.74, 'Oj, en gäspning! Är du trött nu?'],
  ['19-forst-lampan', 5.09, 'Först lampan. Gäsp … god natt!'],
  ['20-och-manen', 4.78, 'Och månen. Gäsp … god natt!'],
  ['21-nallen-zebran-vet', 4.02, 'Oj, nallen då? Zebran vet inte var.'],
  ['22-hjalpa-zebran-se', 4.11, 'Kan du hjälpa zebran? Kan du se var nallen är?'],
  ['23-dar-bakom-kudden', 3.59, 'Ja, där! Ja, bakom kudden!'],
  ['24-gasp-god-natt', 3.77, 'Gäsp … god natt!'],
  ['25-ocksa-gaspa', 1.33, 'Kan du också gäspa?'],
  ['26-gaasp', 1.47, 'Gääsp …'],
  ['27-hej-da-zebran-kudden', 3.28, 'Hej då, zebran! Hej då, kudden!'],
  ['28-hej-ses-snart', 2.6, 'Hej då! Vi ses snart!'],
  // rond 2026-11-11 kväll (Sanna: kritan ritar täcket): uppskattade längder tills tagningarna finns
  ['29-inget-tacke', 2.68, 'Oj. Zebran har inget täcke.'],
  ['30-kritan-ritar-igen', 2.25, 'Titta! Kritan ritar igen.'],
  ['31-tacke-varsagod', 2.39, 'Ett täcke! Varsågod, zebran.'],
  // rond 2026-11-12 (Sanna: vattenglaset på nattbordet, nya nallepartiet): uppskattade längder tills tagningarna finns
  ['32-vatten-vill-du', 0.98, 'Vill du ha lite vatten?'],
  ['33-gott-vatten', 1.72, 'Mmm. Gott med vatten!'],
  ['34-vad-letar-du', 1.16, 'Vad letar du efter?'],
  ['35-jaha-nallen', 1.14, 'Jaha, nallen!'],
  ['36-hittar-inte-hjalpa', 3.19, 'Men du hittar den inte. Kan du hjälpa?'],
  ['37-dar-ar-nallen', 1.79, 'Ja, där! Där är nallen!'],
  // Sanna 2026-11-13 "add VO var är nallen? kan du se?" (ElevenLabs v3, [curious], tagning a av två)
  ['38-var-ar-nallen-kan-du-se', 2.31, 'Var är nallen? Kan du se?'],
];
export const UPPSKATTAD = ROST.some(r => r[1] == null);
export const L = n => ROST[n - 1][1] ?? Math.max(0.7, 0.075 * ROST[n - 1][2].length);
// var ett ord börjar i repliken (s): uppmätt när tagningen finns (ORD), annars räknat på tecknen
export const ORD = { 19: { 'Gäsp': 2.40, 'natt': 4.60 }, 20: { 'Gäsp': 1.92, 'natt': 4.30 }, 24: { 'Gäsp': 0.86, 'natt': 3.15 } };   // uppmätt 2026-11-11 (whisper-cli + silencedetect, tagning b)
export const ord = (n, w) => ORD[n]?.[w] ?? L(n) * ROST[n - 1][2].indexOf(w) / ROST[n - 1][2].length;

const GN = (kansla, o) => [null, o, 'gnagg-gullig: ' + kansla];   // zebrans ljudfamilj (manus.md "Zebrans röst")

// Introt: det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro/intro.mp4, 3,31 s) före scenen
export const RADER = [
  { id: '00', d: 3.31, plats: 'Intro', bild: 'Det gemensamma bilderbok-introt ("bilderbok!" på papperskortet), tonar till samma papper som scenen', ljudtext: 'introts jingel', ansikte: '–' },

  { id: '01a', d: 6.0, plats: 'Papperet, helbild', malin: [[1, 2.9]], ljud: [['krita-ritar/krita-ritar-1', 0.3]],
    bild: 'Kritan kommer in och ritar zebrans kontur i lugna drag (7 s): kroppen med manen, öronen, mulen', ljudtext: 'kritan ritar, skogsljud under', ansikte: '–' },
  { id: '01b', d: 8.6, plats: 'Papperet, helbild', malin: [[2, 0.0]],
    bild: 'Konturen ritas klar (armarna ett drag var, benen, leendet, ränderna sist), sedan väntar kritan bredvid och vajar: barnet gissar', ljudtext: 'kritan ritar', ansikte: '–' },
  { id: '01c', d: 0.9 + L(3) + 0.5, plats: 'Papperet, helbild → zoom in', malin: [[3, 0.9]],
    bild: 'Den riktiga zebran fylls i inifrån. Sista 0,8 s: zoom in i teckningen', ljudtext: '–', ansikte: 'glad' },

  { id: '1', d: 1.6 + L(4) + 1.5, plats: 'Sovrummet, helbild, kvällsljus', malin: [[4, 1.6]], ljud: [['trav/trav-1', 0.2], GN('hej', 1.9 + L(4))],
    bild: 'Lampan lyser. Zebran går in från höger på golvet framför sängen (riggens gång), stannar till höger framför sängen och vinkar. **Hej med vinkning**', ljudtext: '`trav`, glatt gnägg', ansikte: 'jätteglad' },
  { id: '2', nara: [[5, 'månen', 'MANE', 2.2]], d: 0.4 + L(5) + 1.6 + 2.4, plats: 'Fönstret och zebran', malin: [[5, 0.4]], ljud: [['ooh/ooh-1', 0.6 + L(5), 0.8]],
    bild: 'Närbild på månen på *"månen"*, sedan zebran som tittar dit, öronen vippar, och vinkar till månen', ljudtext: '`ooh`', ansikte: 'nyfiken → glad' },
  { id: '3', d: 0.3 + L(6) + 2.6, plats: 'Sovrummet, helbild', malin: [[6, 0.3]], ljud: [['puff/puff-1', 0.6 + L(6)], GN('trumpen', 0.5 + L(6))],
    bild: 'Sängen. Zebran skakar på huvudet: ägget lutar ±6° tre gånger', ljudtext: 'trumpet frust', ansikte: 'trumpen' },
  { id: '4', d: 0.3 + L(7) + 1.0 + L(8) + 1.3, plats: 'Närbild zebran', malin: [[7, 0.3], [8, 1.3 + L(7)]], ljud: [GN('trumpen', 1.5 + L(7) + L(8))],
    bild: 'Zebran vänder bort huvudet (riktningsposen åt vänster), öronen faller. Paus 1 s mellan replikerna', ljudtext: 'trumpet frust', ansikte: 'trumpen, tittar bort' },
  { id: '5a', still: 6.5, d: 1.0 + 4.0 + 4.0, plats: 'Halvbild → närbild sängens huvudända', malin: [[9, 1.4]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 1.0]],
    bild: 'Kritan kommer in och ritar kuddens kontur på sängens vänstra ände (4 s), väntar sedan bredvid och vajar: gisspaus 3 s', ljudtext: 'kritan ritar', ansikte: 'nyfiken' },
  { id: '5b', nara: [[10, 'kudde', 'KUDDE', 2.0]], still: 0.5, d: 1.3 + L(10) + 0.5, plats: 'Samma → halvbild', malin: [[10, 1.3]], ljud: [['glitter/glitter-1', 0.0]],
    bild: 'Den riktiga kudden fylls i inifrån. *Varsågod*', ljudtext: 'glitter', ansikte: 'förvånad' },
  { id: '6', d: 0.2 + L(11) + 2.5 + L(12) + 1.2, plats: 'Halvbild', malin: [[11, 0.2], [12, 0.2 + L(11) + 2.5]], ljud: [GN('nyfiken', 0.4 + L(11))],
    bild: 'Zebran tittar på kudden, öronen reser sig. Paus 4 s: barnet säger tack. Efter *Tack!* nickar zebran', ljudtext: 'nyfiket gnägg', ansikte: 'nyfiken → jätteglad' },
  // Sanna 2026-11-12: ett litet nattbord vid sängen med ett glas vatten; zebran dricker innan han lägger sig (riggens plocka och dricka)
  { id: '6v', d: 0.3 + L(32) + 0.8 + 1.8 + 2.2 + 4.4, plats: 'Halvbild, nattbordet', malin: [[32, 0.3]], ljud: [['trav/trav-1', 0.3 + L(32) + 0.8, 0.8], ['slurp/slurp-3', 0.3 + L(32) + 0.8 + 1.8 + 2.2 + 1.45, 0.9], ['mmm/mmm-2', 0.3 + L(32) + 0.8 + 1.8 + 2.2 + 3.3, 0.8]],
    bild: 'Zebran nickar, går till nattbordet bredvid sängen, tar glaset med vatten (riggens plocka) och dricker två små klunkar (riggens dricka)', ljudtext: 'trav, slurp, mmm', ansikte: 'glad → blundar och dricker → jätteglad' },
  { id: '6w', d: 2.2 + 0.4 + 1.8 + 0.8, plats: 'Samma', malin: [[33, 0.6]], ljud: [['ding/ding-1', 1.05, 0.25], ['trav/trav-1', 2.6, 0.8]],
    bild: 'Zebran ställer tillbaka glaset på nattbordet och går tillbaka till sängen. *Mmm. Gott med vatten!*', ljudtext: 'ding (glaset på plats), trav', ansikte: 'glad' },
  { id: '7', nara: [[13, 'kudde', 'KUDDE_KIND', 1.8]], still: 2.6, d: 1.4 + L(13) + 2.2, plats: 'Halvbild', malin: [[13, 2.0]], ljud: [['hopp-mjuk/hopp-mjuk-2', 0.2, 0.3], ['puff/puff-1', 0.92, 0.6], ['puff/puff-2', 1.9], GN('mysig suck', 2.2 + L(13))],
    bild: 'Zebran hoppar lugnt upp i sängen (0,9 s). Kudden glider upp till zebrans kind, zebran blundar och myser, och kudden glider tillbaka', ljudtext: '`hopp-mjuk`, `puff` (landar), `puff`, mysig suck', ansikte: 'blundar, ler' },
  { id: '8', still: 2.0, d: 1.0 + L(14) + 4.0, plats: 'Närbild zebran', malin: [[14, 1.0]], ljud: [['prassel-tyg/prassel-tyg-1', 0.2]],
    bild: 'Zebran lyfter kudden framför ansiktet med båda händerna, så att ögonen täcks. Paus 4 s', ljudtext: '`prassel-tyg`, ett litet gnägg bakom kudden', ansikte: '(bakom kudden)' },
  { id: '9', still: 1.2, d: 0.3 + L(15) + 1.9, plats: 'Samma', malin: [[15, 0.3]], 
    bild: 'Kudden glider ner på *"Tittut!"*, zebran tittar fram', ljudtext: 'tyst', ansikte: 'glad' },
  { id: '10', still: 1.5, d: 1.2 + L(16) + 2.0 + L(17) + 3.8, plats: 'Samma', malin: [[16, 0.9], [17, 1.2 + L(16) + 2.0]], ljud: [['prassel-tyg/prassel-tyg-1', 0.1], GN('förtjust', 1.5 + L(16) + 2.0 + L(17))],
    bild: 'En gång till, kortare: upp, paus 2 s, ner på *"Tittut!"*. **Leken (tittut)**', ljudtext: '`prassel-tyg`, ett förtjust gnägg', ansikte: 'glad' },
  { id: '11', still: 0.9, d: 1.4 + L(18) + 1.6, plats: 'Halvbild', malin: [[18, 1.3]], ljud: [['gaspning/gaspning-1', 0.2], GN('pratar', 1.5 + L(18))],
    bild: 'Zebran gäspar (munnen ett stort O, ögonen kniper ihop). **Shorten börjar här**', ljudtext: '`gaspning`, sömnigt gnägg', ansikte: 'sömnig, gäspar' },
  { id: '12', nara: [[19, 'lampan', 'LAMPA', 1.4], [19, 'natt', 'LAMPA', 2.0]], d: 0.4 + L(19) + 2.2, plats: 'Lampan och zebran', malin: [[19, 0.4]], ljud: [['lampa-klick/lampa-klick-1', 0.4 + ord(19, 'natt'), 2.2]],
    bild: 'Zebran gäspar på *"Gäsp"*, lampan släcks på *"natt"*: skenet tonas bort på 0,4 s, rummet blir lite mörkare och varmt blått', ljudtext: '`lampa-klick`', ansikte: 'sömnig' },
  { id: '13', nara: [[20, 'månen', 'MANE', 1.4]], d: 0.4 + L(20) + 1.6, plats: 'Fönstret och zebran', malin: [[20, 0.4]], ljud: [['glimt/glimt-1', 0.4 + ord(20, 'natt')]],
    bild: 'Zebran gäspar på *"Gäsp"*, månen lyser upp mjukt på *"natt"*', ljudtext: '`glimt`', ansikte: 'sömnig' },
  // Sanna 2026-11-12: nytt nalleparti. Nallen sitter på golvet vid sängens huvudände och syns hela tiden (barnet kan peka)
  { id: '14', d: 1.6 + L(34) + 1.2, plats: 'Halvbild', malin: [[34, 1.6]], ljud: [GN('nyfiken', 0.4)],
    bild: 'Zebran tittar sig omkring (åt höger, upp), sedan *Vad letar du efter?*', ljudtext: 'frågande gnägg', ansikte: 'nyfiken' },
  { id: '14b', d: 1.2 + L(35) + 0.8, plats: 'Närbild zebran', malin: [[35, 1.2]], ljud: [GN('pratar', 0.2)],
    bild: 'Zebran berättar (pratar-gnägg), Malin förstår: *Jaha, nallen!*', ljudtext: 'pratande gnägg', ansikte: 'nyfiken → ledsen' },
  { id: '15', d: 0.3 + L(36) + 0.6 + L(38) + 6.0, plats: 'Sovrummet, helbild', malin: [[36, 0.3], [38, 0.3 + L(36) + 0.6]],
    bild: 'Zebran tittar på fel ställen (åt höger, upp, under sig), nallen sitter synlig på golvet vid huvudänden. Paus 6 s; efter ca 3 s skimrar nallen svagt', ljudtext: 'tyst', ansikte: 'nyfiken' },
  { id: '16', nara: [[37, 'nallen', 'NALLE', 1.8]], d: 0.3 + L(37) + 1.6, plats: 'Närbild nallen → halvbild', malin: [[37, 0.3]], ljud: [['tindra/tindra-3', 0.2], ['gasp/gasp-1', 0.6 + L(37), 0.7]],
    bild: 'Nallen skimrar tydligt, zebran ser den och blir jätteglad', ljudtext: '`tindra`, `gasp`', ansikte: 'jätteglad' },
  { id: '17', d: 2.4 + L(24) + 1.6 + 1.8, plats: 'Halvbild', malin: [[24, 2.4]], ljud: [['nalle-hopp/nalle-hopp-1', 0.3], ['puff/puff-2', 1.75, 0.6], GN('mysig suck', 2.4 + L(24))],
    bild: 'Nallen gör ett lugnt skutt från golvet upp i sängen och sätter sig bredvid zebran. Zebran gäspar på *"Gäsp"*', ljudtext: '`nalle-hopp`, mysig suck', ansikte: 'sömnig, gäspar' },
  { id: '18a', d: 0.3 + L(25) + 4.0, plats: 'Halvbild', malin: [[25, 0.3]],
    bild: 'Zebran tittar på barnet. Paus 4 s: barnet gäspar', ljudtext: 'tyst i pausen', ansikte: 'sömnig' },
  { id: '18b', d: L(26) + 1.6, plats: 'Samma', malin: [[26, 0.0]], ljud: [['gaspning/gaspning-1', 0.05], GN('mysig suck', 0.3 + L(26))],
    bild: 'Zebran gäspar en gång till på *"Gääsp"*. **Leken (gäspa med). Shorten slutar här**', ljudtext: '`gaspning`, mysig suck', ansikte: 'gäspar → sömnig' },
  // Sanna 2026-11-11 kväll: zebran behöver ett täcke när han sover, kritan ritar det (andra teckningen)
  { id: '18c', nara: [[29, 'täcke', 'SANG', 1.6]], d: 0.3 + 1.4 + L(29) + 0.8, plats: 'Halvbild', malin: [[29, 1.7]], ljud: [GN('trumpen', 0.5)],
    bild: 'Zebran tittar ner på den tomma sängen och huttrar lite (små snabba skak i 1 s), öronen faller', ljudtext: 'litet trumpet gnägg', ansikte: 'sömnig, lite ledsen' },
  { id: '18d', still: 5.4, d: 1.0 + 4.0 + 1.2, plats: 'Halvbild → närbild golvet framför sängen', malin: [[30, 0.6]], ljud: [['skrrrrt-kort/skrrrrt-kort-1', 1.0]],
    bild: 'Kritan kommer in och ritar täckets kontur på golvet framför sängen: kanten med bågarna, vecket och tre sömmar (4 s). Konturen står kvar 1,2 s medan kritan vajar', ljudtext: '`krita-ritar`', ansikte: 'nyfiken' },
  { id: '18e', nara: [[31, 'täcke', 'TACKE', 2.0]], still: 0.5, d: 1.3 + L(31) + 0.6, plats: 'Samma → halvbild', malin: [[31, 1.3]], ljud: [['glitter/glitter-1', 0.0], ['pling/pling-3', 1.3]],
    bild: 'Det riktiga täcket fylls i inifrån, skimrar. *Varsågod*', ljudtext: '`glitter`, `pling`', ansikte: 'förvånad → glad' },
  { id: '18f', d: 0.2 + L(11) + 2.5 + L(12) + 1.2, plats: 'Halvbild', malin: [[11, 0.2], [12, 0.2 + L(11) + 2.5]], ljud: [GN('nyfiken', 0.4 + L(11))],
    bild: 'Zebran tittar på täcket. Paus 2,5 s: barnet säger tack. Zebran nickar direkt på *Tack!*', ljudtext: 'nyfiket gnägg', ansikte: 'nyfiken → jätteglad' },
  { id: '19', nara: [[27, 'kudden', 'KUDDE', 1.6]], d: 0.7 + L(27) + 1.5, plats: 'Halvbild', malin: [[27, 0.7]], ljud: [GN('hej då', 0.9 + L(27))],
    bild: 'Zebran vinkar sömnigt (armen bakom kroppen, snett ut förbi kanten). **Hej då med vinkning**', ljudtext: 'mjukt hej då-gnägg', ansikte: 'sömnig, glad' },
  { id: '20', still: 4.0, d: 4.8 + L(28) + 2.6, plats: 'Halvbild', malin: [[28, 4.8]], ljud: [['gaspning/gaspning-1', 0.2, 0.9], ['glitter/glitter-1', 1.3, 1.0], ['snark-pip/snark-pip-1', 3.6, 0.8], ['snark-pip/snark-pip-1', 4.8 + L(28) + 0.8, 0.8], ['godnatt-pling/godnatt-pling-1', 4.8 + L(28) + 1.4]],
    bild: 'Zebran gäspar en sista gång, glitter virvlar runt honom, och när glittret lägger sig ligger han och sover på magen med huvudet på kudden, täcket över sig och nallen bredvid. Han andas lugnt, zzz', ljudtext: '`gaspning`, `glitter`, `snark-pip`, `godnatt-pling`, vaggvisan', ansikte: 'sover' },
  { id: '21', still: 1.7, d: 2.5, plats: 'Sovrummet → kritirisen', bild: 'Kritirisen drar ihop sig runt zebran och nallen', ljudtext: '–', ansikte: 'sover' },
];

export const GLES = 0.9;   // extra luft på varje rad med en replik (0,7 som 020 runda 5; 1,2 efter Sanna 2026-11-12 "longer clips overall"; 0,9 efter QA samma kväll, "not too slow")
// nara: [[replik, ord, kamera, s]] = klipp till närbild på saken när Malin säger ordet, kvar s sekunder, sedan tillbaka till zebrans
// reaktion (Sanna 2026-11-12: "more cuts zoom close crops on thing on mention"); raden får 1 s extra för reaktionen efter klippet
export const NARA_EXTRA = 1.0;
for (const r of RADER) { if (r.malin && !['01a', '01b'].includes(r.id)) r.d += GLES; if (r.nara) r.d += NARA_EXTRA; }
