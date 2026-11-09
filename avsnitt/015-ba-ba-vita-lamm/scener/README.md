# Kodscener – avsnitt 015 Bä, bä, vita lamm

> **Art direction v2 (2026-11-08):** lammen (Ludde, far, mor) är v2-Ludde (`assets/karaktarer/lammet-ludde/premium`, `kit.figur('lammet-ludde-v2')`, samma kit-post och v2-ansikte som Tittut). `lamm.js` mappar scenernas humör (`glad`, `ledsen`, `skrattar` …) till v2-ansiktet; `ledsen` har en egen nedåtböjd mun. Tussarna sitter runt v2-kroppens ellips, strumporna på v2-klövarna, sittposen är riggens `sitter` (kroppen sjunker 48, benen ut 40°) i stället för `lager/ludde-sitter.png`. kritan-ritar: kritan ritar först Luddes kontur i ett drag (`KONTUR`, spårad ur premium/cut-delarnas alfa, krympt 8 px), sedan fylls bilden i inifrån med en vaxig cirkel och linjen tonas bort (Sanna 2026-11-08); papperet ligger över förgrunden. **Platsen är Skogen grön** (Sanna 2026-11-08, i stället för ängen): `kit.duk('skogen-gron')` laddar `assets/bakgrunder/skogen-gron/skogen-gron.png` (golvlinjen y ≈ 580) och lägger till förgrunden (två grästuvor) och rosa blommor framför (`lager.forgrund`, `lager.blommor`; inga buskar, inga blommor i kritan-ritar). **Strumporna** målas i benets och armens egen form (kritfärg innanför den vita kanten, mudd i mörkare ton) så att de alltid sitter på klövarna; de lösa strumporna landar vid klöven (`strumpStart`) och den målade dras på. **Plaggen:** rocken har v-ringning, slag, knappar, fickor och ärmar på armarna; kjolen är en utsvängd a-linje med linning, prickar och bågad fåll som går ut över kroppen. Provbänk: `_test/strumpor` (närbilder).

> **Nytt intro och ritintro (2026-11-09, lärdomarna från 013):** introt är 013/014:s nya (9,0 s, LILLA KRITAN i vit krita, titeln på en vit kritfläck; förra: `intro/intro-forra-kort.mp4`). Kritan ritar konturen lugnt (ca 7 s) med skogsljud under, berättaren säger "Titta!" (titta-1) när kritan börjar, kort väntan, och bilden fylls i på "Ett lamm!". Berättaren (Malin, 2026-11-09): "Hmm, ett litet lamm." när konturen är klar och "Nu sjunger vi." (sångtid 0:09.8) före första raden. Sången börjar 4,5 s in i ritandet: `INTRO` = 13,5 (bygg.py `FORE`), så **avsnittstid = sångtid + 13,5** och kritan-ritars scentid = sångtid + 4,5. Övergången från introt är ett grönt kritsvep (som 013, ingen papperszoom): introt slutar helt grönt och kritan-ritar börjar med att det gröna glider undan (`svepUt`). Blommorna i förgrunden växer fram när hålet i papperet öppnas, så att de redan står där när angen-1 tar över. Luddes ben har långa rötter (`verktyg/langre_rot.py`, originalen i `premium/cut/v1/`).

> **Finputs (2026-11-08):** mjuka skuggor på marken under lammen och säcken (stannar på GOLV, mindre och ljusare i hoppen), tussarna har en varm grå undersida, rocken och kjolen har mörkare krita längs nederkanten och kjolen gungar lite runt midjan. Gnistorna (`lamm.gnista`) och hjärtana (`lamm.hjarta`) är krit-klistermärken med vit kant. Djup: förgrunden rör sig 12 % mer än kameran och skogen blir lite mjuk när kameran går nära. Över hela bilden ligger en svag varm ton och en mjuk vinjett (`kit.duk`).

Samma upplägg som 014: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna och måtten kommer ur `../storyboard/bygg.py`; `lager/gor-lager.py` skriver dem till `lager/matt.json`, som `kit.manus()` och `lamm.js` läser.
Sången (`../sang.m4a`, 1:15.7) klipps aldrig: **avsnittstid = sångtid + 11 s** (introt), hela vägen. Scenens tid 0 = sångtiden `sang[0]` i `kit.kor()`.

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `kritan-ritar/` | 01–02 (kritan ritar Luddes kontur i ett drag, sedan fylls hans riktiga bild i inifrån och linjen tonas bort; ögonen poppar fram på "Ett lamm!"; 01b glada ögon och bä; 02 zoom in, papperet tonas bort och ängen syns runt Ludde, tussarna poppar fram, sista bilden = 03) | 0:11.0–0:20.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `angen-1/` | 03–08 (helbild, Fia; far och mor lutar sig fram; tussarna i säcken; rocken och kjolen; två par strumpor i högen) | 0:20.0–0:44.4 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `angen-2/` | 10–11b (kameran glider från 08:s `fotter` in i närbilden; Ludde huttrar och tittar ner, `ledsen`; frågan, `nyfiken` mot tittaren; mjuk glidning ut till helbilden, tyst paus; på "Strumporna!" lutar sig mor och pekar, högen blänker, Ludde tittar dit och sätter sig, sista bilden = sittande vid högen) | 0:44.4–0:55.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `angen-3/` | 12–15 (strumporna på fötterna, på händerna, far och mor visar plaggen, Ludde vickar) | 0:55.0–1:16.4 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `slutet/` | 16–18 (Ludde skuttar till 715, far och mor vaggar fram (mor bakom Ludde till hans högra sida), tack/tack/varsågod med munnar; kramen, tre hjärtan, mysigt; ullen växer ut i två puffar till tussar 11; kritirisen runt Ludde, stängs på pling, stjärna, svart) | 1:16.4–1:27.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |

(Avsnittstiderna är storyboardens SHOTS 2026-11-07; läs alltid `M.bild('06')` i scenerna i stället för att skriva in dem. Sångtid = avsnittstid − `M.av`.)

## Filer
- `kit.js`: 014:s kit bantat (ingen traktor, väg, buss, refräng eller backar). Kvar: `duk`, `kamera`, `figur`, `hopp`, `vagga`, `blink`,
  `prat`, `vinka`, `benHopp`, `manus`, `takt`, `ljud`, `kor`, `mjukaKlipp`, engelska (`?en`). Nytt: `kit.utsnitt([cx, cy, w])` = kameran som
  `crop_zoom()` i bygg.py (`M.matt.KAMERA.hel / tva / nar / halv / fotter`). `FIGURER` har bara `lammet-ludde` och `fjarilen-fia`.
  Takten ca 89 bpm (`BEAT 0.672`, `BEAT0 0.28`); `kit.takt(sångtid)` fäster på uppmätta slag (`matt.json SLAG`).
  `LJUDFILER` har alla ljud i `../ljud.md`, med `puff` (3) och `strumpa` (4).
- `render.mjs`, `ansikten.js`: kopior av 014:s.
- `lamm.js`: alla tre lammen, säcken, strumphögen och lösa ulltussar (API nedan).
- **Vita kanter:** ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter kit.js (skill `vita-kanter`). Lammen får kanten via
  kit.figur, sakerna i `lamm.sak/sack` via `kant.lagg`. Tussarna har en egen vit kant inritad (som i bygg.py) och får ingen kant.js.
- `lager/gor-lager.py` → `lager/matt.json` (tider, mått, kameror, färger, slag), `lager/ludde-sitter.png` (ludde-sitter-v2 utan det inbakade
  ansiktet, nosen och armarna kvar), `lager/korn.png`. Ängen är `assets/bakgrunder/angen/angen.png` rakt av (`kit.duk('angen')`).
- `_test/lamm/`: provbänk för lamm.js, bara stillbilder (8 sidor: helbild, plaggen, strumporna, sittposen, halvvägs, närbild, humören, hopp).

### matt.json (ur bygg.py)
`GOLV` 690 (fötternas linje), `LH/FH/MH` 230/310/276 (Ludde, far 135 %, mor 120 %), `FAR_X/MOR_X/LUDDE_X/SACK_X/HOG_X` 330/545/820/1020/735,
`SACK_TOM/SACK_FULL/HOG` = [mitt x, underkant y, höjd], `KAMERA` (se ovan), `bilder` (avsnittstid per bild), `SLAG`, `FARG` (ROCK, KJOL, ROSETT …),
`LUDDE_ANS`, `FOT`, `HAND`, `TUSSAR`.

## lamm.js
```js
const M = await kit.manus(), m = M.matt, L = kit.duk('angen');
const far = await lamm.ny('far', { forelder: L.figurer });      // Luddes rigg, 135 %, gråare ton
const mor = await lamm.ny('mor', { forelder: L.figurer });      // 120 %, rosa rosett vid vänstra örat
const sack = lamm.sack(L.figurer);
const ludde = await lamm.ny('ludde', { forelder: L.figurer });  // { h } byter höjden
// varje bildruta:
ludde.pose({ x: m.LUDDE_X, y: m.GOLV + hopp.y, sx, sy, tilt,      // y standard GOLV; kit.hopp() för lugna skutt
  humor: 'glad', titt: -0.3, tittY: 0, m: 0,                       // ansikten.js; blink sköts av sig själv (var 3–4:e s), blink: 0..1 tar över
  armL: -60, armR: 60,                                             // samma vinklar som arm_l/arm_r i bygg.py (−60/60 = armarna upp)
  tussar: 11,                                                      // 0..11; bråkdel = nästa tuss växer fram med pop
  rock: 1, kjol: 1,                                                // 0..1, plagget torkas fram nerifrån
  strumpFot: 2, strumpHand: 2,                                     // 0..2 (vänster först); bråkdel = strumpan glider på (sträcks, sätter sig)
  sitter: true,                                                    // sittposen (armarna inbakade; inga plagg eller tussar i den)
  delar: kit.benHopp(h.ben) });                                    // råa riggvinklar om det behövs
sack.pose({ x: m.SACK_X, y: m.GOLV + 4, k: 0 });                   // k 0 tom och platt, > 0 full (70 % → 100 % höjd vid k 1)
const [ox, oy] = sack.oppning();                                    // mynningen, dit tussarna flyger
const [tx, ty] = ludde.tussPunkt(10);                               // tuss nr i (de försvinner bakifrån: 10, 9, 8 …)
const t = lamm.tuss(L.figurer); t.pose({ x, y, r: 17 });            // en lös tuss (r = radien i bild, samma som på Ludde)
const hog = lamm.sak(lamm.HOG, L.figurer); hog.pose({ x: m.HOG_X, y: m.GOLV + 45, h: 42 });
// en enskild strumpa på marken: lamm.sak(lamm.STRUMPA['rosa-1'], …); ludde.fot('l'), ludde.hand('r'), ludde.punkt([x, y]) = var de är
// lamm.SITT_FOT / lamm.SITT_H: sittstrumpornas mitt, vridning och glidriktning i sittbilden (för en lös strumpa som ska landa exakt där)
kit.utsnitt(m.KAMERA.hel);
```
Lammen snurrar och vänds aldrig (platta urklipp): bara lugna hopp, gung och lutning. Ordningen i `forelder` styr vem som står framför (lägg Ludde sist).

## Kvar och skavanker (2026-11-07)
- **kritan-ritar, övergången (2026-11-07, användaren: "make drawing better"):** teckningen ritas större (papperskameran ZD 1,4, Ludde ca 320 px). På bä får den sin vita kant (den blir ett klistermärke). I 02 åker kameran in mot Ludde och ett hål med vaxig kant växer ut i papperet bakom honom; papperet och ängen har samma kamera, så teckningen byts mot den riktiga Ludde utan hopp. 02 slutar på E = [LUDDE_X+40, GOLV−150, 760] (Ludde, mor, säcken); angen-1 åker ut därifrån till helbilden på 1,5 s i början av 03 och far syns. E står i båda scenerna.
- **angen-1, glimmer:** på rocken och kjolen när de är klara (0:25.6, 0:28.2), tre gnistor och `glimt` i stället för `pling`.
- **Berättarrösten** finns inte än: *"Vad kan det vara?"* (0:00.3) och *"Ett lamm!"* (0:05.4) är tysta i kritan-ritar; ögonen poppar fram på 0:05.4.
- **Sista bilden i kritan-ritar = 03:** far och mor `glad` titt 0.6, Ludde `glad` titt −0.3 med `tussar: 11`, säcken tom, kameran `hel`. angen-1 ska börja så.
- **Ludde med tussar** är lite större än i storyboarden (bygg.py mäter höjden med tussarna, lamm.js utan), så storleken är densamma i alla bilder.
- **Sittposen** (v2) är riggens `sitter`; strumporna på fötterna följer benen. Posen där han tar foten (avsnittets nya pose) finns inte än.
- **`ba`** har 9 filer i biblioteket men README:n där listar 4 (3 s); `LJUDFILER` använder 1–4. ba-5…9 (ca 1 s) ser ut att vara nya korta.
- `_test/lamm` sida 6 visar alla humör på små Luddar.

### angen-1 (2026-11-07)
- **Första bilden** = kritan-ritars sista (jämförd mot `kritan-ritar/stills/8.99.jpg`, samma bild): helbild, far och mor `glad` titt 0.6, Ludde `glad` titt −0.3, `tussar: 11`, säcken tom.
- **Kameradrift och andning i sångtid:** kit räknar båda i scentid (`kit.nu`), så de hoppar i varje skarv. angen-1 räknar om dem lokalt (`drift`, `andas`).
  **Kit-förslag:** låt `kor()` räkna `nu` i sångtid (`nu = tSv(t) + opt.sang[0]`, render får fortfarande scentid), då passar alla skarvar och angen-1:s omräkning tas bort.
- **06, tussarna:** alla elva extra tussarna flyger ner i säcken i fyra vågor (3, 3, 3, 2), en `puff` per våg på 0:19.6, 0:20.3, 0:21.0, 0:21.7, så att Ludde slutar på `tussar: 0` som angen-2 börjar.
  Säcken poppar upp ur den platta på första puffen och växer med de tre andra.
- **07:** tussen flyger ur säcken (utanför tvåbilden till höger) till magen; kritklotter i plaggets färg inom kroppens siluett, plagget torkas fram, `pling` 0,5 s efter `skrrrrt-kort` när plagget är klart, sedan ett litet skutt.
- **08:** högen (`lamm.HOG`) i två halvor: det rosa paret poppar på "två" (0:28.8), det blå på "strumpor" (0:29.7). Glidet till 08 är 0,4 s (första ploppet kommer 0,4 s in).
- **Sista bilden** (sång 0:33.4): kameran `fotter`, Ludde `forvanad` titt 0.2 tittY 1, `tussar: 0`, stilla; hela strumphögen vid `HOG_X`; säcken full (`k: 1`); far i rocken, mor i kjolen (utanför bild).
- Fia (h 95) glider vänster → höger över himlen 0:10.5–0:16.0. Berättaren *"Säg bä, bä med lammet!"* (0:09.6) har ingen inspelning (tyst).

### angen-2 (2026-11-07)
- **Första bilden** = 08 som den ritas i bygg.py: kameran `fotter`, Ludde `forvanad` titt 0.2/1 utan tussar, högen vid `HOG_X`, säcken full, far i rocken, mor i kjolen.
  angen-1 fanns inte på disken när angen-2 byggdes: stäm av mot dess sista bild. **Sista bilden:** helbild, Ludde `sitter: true` `glad` titt −0.6/1 vid högen
  (strumporna inte på), mor lutar 4° åt högen med `armR` ca 95 → angen-3 börjar här.
- **Berättaren tyst** (ingen inspelning): "Brrr! Lammet fryser om fötterna." sång 0:33.6, "Vad kan lammet ta på sig?" 0:36.2–0:37.8, "Strumporna!" 0:42.5. Ingen mun rör sig.
- **`kit.utsnitt` + `kit.mjukaKlipp` glider inte:** utsnitt anropar kit.js egen `kamera()`, inte `window.kit.kamera`, så mjukaKlipp varken fångar eller glider den
  (bilden hoppar). angen-2 har en lokal `utsnitt` som går via `window.kit.kamera`. Rättas bäst i kit.js (rad 173: `window.kit.kamera(...)`).

### angen-3 (2026-11-07)
- **Första bilden** = angen-2:s sista: helbild, Ludde `sitter` `glad` titt −0.6/1 vid `LUDDE_X`, högen vid `HOG_X`, mor `armR` 95 och lutar 4,2°, far titt 0.9/0.9.
  Mor sänker armen och båda glider till titt 1 under första 0,9 s, medan kameran glider ner till `fotter`.
- **Strumporna 1-2-3-4** (putsade 2026-11-07): högen byts direkt mot fyra lösa strumpor på exakt samma ställen (uppmätta i strumpor.png, tårna åt vänster),
  så skarven mot angen-2 syns inte. Varje strumpa hukar lite, lyfter i en båge 0,5 s före sitt `strumpa`-ljud, vrids till fotens/handens vinkel och
  lämnar över till strumpan på Ludde i exakt samma läge (ingen toning). Där glider den på över hoven på 0,5 s, sträcks lite, sätter sig med en
  liten studs och sitter still (`glid` i lamm.js). Ludde lutar sig mot den och `anstranger_sig`, sedan ett litet glatt skutt.
  **Sittposen** används rakt av (posen där han tar foten finns inte): strumpan flyger själv till foten.
- **13:** Ludde ställer sig med ett skutt i början av bilden. Halvbilden ligger 40 px åt vänster och 45 px lägre än `KAMERA.halv` ([1030, 520, 700]), annars hamnar Luddes vänstra hand och de blå strumporna i raden utanför bild.
- **QA-fixar (2026-11-07):** handstrumporna ligger längs armen med klöven i strumpans fot (`HAND_STR` i lamm.js, i armgruppen); `m: 0` ger humörets egen mun
  (lamm.js skickar bara `m` > 0 vidare, så `skrattar` har öppen mun överallt); Ludde tittar på foten (titt ±0.9, tittY 1) medan strumpan kommer och glider på.
  **Armarna:** riggens vridpunkt för armarna sitter vid klöven, så `armL/armR` flyttar knappt klöven och armen stannar bakom kroppen. I 14 vrids fars och mors
  armar i stället runt axeln (`axelArmar` i scenen, ±100 / ±80). Luddes egna armar i 13–15 går fortfarande via lamm.js (samma som slutet).
- **Glans på plaggen (14):** på "far" (0:57.1) och "mor" (0:59.7) poppar tre fyruddiga gnistor fram på rocken och kjolen (som angen-2:s blänk: #FFFBE6, kant #F6D86B), blinkar och tonas bort på ca 0,8 s; `glimt` vol 0.5.
- **14:** far skuttar och lyfter armarna (±55) på "far", mor gungar från sida till sida med armarna ut (±45) på "mor", ingen snurr. Riggens armar är korta, så det syns mest på skuttet och gunget.
- **Sista bilden** = slutets första: helbild, Ludde `skrattar` titt 0, armarna ±70, fyra strumpor, `tussar: 0`, stilla (vickandet tonas ut sista 0,9 s);
  far `glad` i rocken och mor `glad` i kjolen, titt 1, raka; säcken full; kameran `hel`.
- `fagelkvitter` loopas lågt (vol 0.35) genom hela scenen. Kameran går via `kit.kamera` direkt (se angen-2 om `kit.utsnitt`).
- **Kamerans drift** (kit.kamera svävar några px) räknas i scentid, så den hoppar i varje skarv. angen-1 och angen-3 räknar om den till sångtid;
  angen-2 gör det inte än, så skarvarna 08→10 och 11b→12 rycker några px. Bäst rättat i kit.js (driften i sångtid för alla scener).

### slutet (2026-11-07)
- **Första bilden = 15** som storyboarden ritar den (angen-3 fanns inte än): Ludde vid `LUDDE_X` `skrattar`, armarna ut (±70), fyra strumpor, `tussar: 0`; far `glad` i rocken, mor `glad` i kjolen, titt 1; säcken full (`k: 1`); kameran `hel`. Stäm av mot angen-3:s sista bild.
- **Repliker utan inspelning** (munnarna rör sig med `kit.prat`, sångtid): FAR *"Tack!"* 1:06.8 · MOR *"Tack!"* 1:07.4 · LUDDE *"Varsågod!"* 1:07.9 · LUDDE *"Bä-ä-ä, vad mysigt!"* 1:09.0.
- **Kameran åker in på kramen** (från 17:s start, 1,7 s, `NARA = [715, 478, 820]` i scenen, med `kit.kamera`), och kritirisen (r 250) sluts runt Ludde i den närmare bilden.
- Ullen växer ut till `tussar: 11` (extra luddig, som i början); storyboarden 17/18 ritar 6. Kramen: Ludde i mitten med armarna ut, fars högerarm och mors vänsterarm bakom honom.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I -W ignore lager/gor-lager.py   # ca 40 s; kör om när bygg.py eller assets/ ändras
node render.mjs _test/lamm 0.5 1.5 2.5 3.5 4.5 5.5 6.5 7.5   # provbänken → _test/lamm/stills/sheet.jpg
node render.mjs kritan-ritar 1 3.5 5.8 6.3 8.3 8.99          # stillbilder vid de tiderna → kritan-ritar/stills/
node render.mjs kritan-ritar --snabb                         # förhandsvisning: 960 × 540, 15 bilder/s
node render.mjs kritan-ritar                                 # hela scenen, en gång när Sanna har godkänt den
```
Förhandsvisa med `--snabb` och stillbilder. Bara huvudsessionen bygger grovklippet, och högst två sessioner renderar samtidigt.

## QA 2026-11-07 (huvudsessionen, efter alla fem scenerna)
Grovklippet `../film/avsnitt-015-grovklipp.mp4` (`../film/satt-ihop.sh [--snabb]`, 1:27) är byggt med alla fem scenerna. Rättat:
- `kit.utsnitt` går via `window.kit.kamera`, så att `mjukaKlipp` fångar den (lokala omvägar i angen-1/2/3 fungerar fortfarande).
- angen-2: `fagelkvitter` saknades (fåglarna tystnade i mellanspelet); nu loopas det lågt som i 03–18.
- slutet: Luddes blick hoppade i första rutan (omvänt intervall i `titt`); nu glider den från 0.
- satt-ihop.sh: varje scens sista ruta hålls 0,2 s (`tpad`), så att storyboardbilden inte syns en ruta i skarvarna.
Rättat efter QA:n: 10 och 11 är två närbilder med ett hårt klipp (10 med fötterna, 11 tätare på ansiktet); mor pekar snett ner mot högen och Ludde tittar dit på "Strumporna!"; storyboard 15 säger "skuttar till". Kvar: inga röster än (berättaren, Tack, Varsågod, Bä-ä-ä).

**Ritade armar (2026-11-07).** Originalets armar var små gråbruna stumpar bakom kroppen som knappt syntes. Nu har alla tre lammen ritade armar
(`assets/karaktarer/lammet-ludde/lemmar/rita-armar.py` → `lemmar/ludde-arm-*.png` och `ludde-rigg-lemmar.json`, samma metod som lejonets i 007):
benens gråbruna krita, mörk klöv, vit kant, framför kroppen från axeln (252/772, 540) till spetsen (212/812, 712). Benen och sittbilden är
orörda, och originalriggen och andra avsnitt påverkas inte. `kit.js` väljer riggen för `lammet-ludde`; `ritadeDelar` kan nu vara en lista
(armarna utan ledmask, benen med). Handstrumporna (`HAND_STR` i lamm.js) och `HAND` i matt.json följer de nya klövarna. Mors pekning i 11b är 28°.
