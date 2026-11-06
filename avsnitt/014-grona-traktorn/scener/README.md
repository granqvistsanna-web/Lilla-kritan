# Kodscener – avsnitt 014 Gröna sången

Samma upplägg som 007: SVG-scener på en 1376 × 768-duk (storyboardens mått) som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna är `tider()` i `../storyboard/bygg.py` (SÅNGTID; sången klipps aldrig, INSATT är tom). `lager/gor-lager.py` skriver dem till `lager/matt.json`, som `kit.manus()` läser.
Avsnittstid = sångtid + 11 s (introt), hela vägen. render.mjs tar sångbiten ur `../sang-klippt.m4a` om den finns, annars `../sang.m4a` (samma sak: klipptid = sångtid).

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `kritan-ritar/` | 02–02c (gröna kritan ritar traktorn, taket i gissningspausen, en puff, zoom in) | 0:11.0–0:32.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `vagen-1/` | 03–05h (klipp ut till vägen, "Hej hej!", vers 1, refräng 1: Ärtresan) | 0:32.0–1:04.5 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `vagen-2/` | 06–09g (grodan, trafikljuset, frågepausen, dragkedjan, refräng 2: Ärtresan) | 1:04.5–1:48.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `bondgarden/` | 10–14h (kritsvep gult, traktorn parkerar vid ladan, Lova hoppar ner och står på egna ben resten av scenen, Pip plockar skidan från ärtplantan, mellanspelet med repliker i bild, ärtan rullar under bänken, Pip hoppar ner, trillar och pickar fram den, mums; i 14h står Lova kvar och ropar med armarna upp, Pip håller upp den tomma skidan som ett grönt ljus och traktorn står utanför bild) | 1:48.0–2:52.5 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `discot/` | 15a–16d (ingen traktor, Lova står och dansar på egna ben; danspausen i mint: alla, Gurra hoppar, Kajsa vickar med skällan, Fia flyger runt; småbilderna flyger upp i raden; sista refrängen med ärtbubblan; hej då) | 2:52.5–3:26.0 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |
| `slutet/` | 17 (Lova vinkar, kameran glider in, kritirisen runt hennes ansikte, stjärnglimt, svart) | 3:26.0–3:37.4 | 🟡 förhandsvisning (`--snabb`), väntar på Sanna |

(Avsnittstiderna är storyboardens `tider()` från 2026-11-06; läs alltid `M.bild()` i scenerna i stället för att skriva in dem.)

## Filer
- `kit.js`, `render.mjs`, `ansikten.js`, `kritsvep.js`, `kritsvep-korn.png`, `klistermarke.js`: kopior av 007:s. Ändrat i kit.js:
  - **Takten:** tagningen glider i tempo (Suno, ca 83–86 bpm, upp till ±0,3 s från ett rakt rutnät). `kit.takt(sångtid)` fäster därför
    på närmaste **uppmätta slag** (`matt.json` `SLAG`, librosa beat_track på slagverket i `gor-lager.py`) när `kit.manus()` har körts.
    `BEAT = 0.714, BEAT0 = 0.26` är ett rakt rutnät som stämmer i sångtid ca 20–80 s; använd det bara för gung i fas, inte för ord.
  - `FIGURER['leoparden-lova']`: riggen med ritade armar (`leoparden-lova-rigg-lemmar.json`), armarna framför kroppen, munnen som ANSIKTE i bygg.py.
  - `kit.vag(L.plate)` + `kit.duk(kit.VAG_PLATTA)`: vägen med väggen omfärgad till himmelsblått `#A8DCF2` (`vägen_plåt()` i bygg.py),
    rullande mittstreck och tre vita kritmoln som står still. Fem höstträd på horisonten (y 568, x 90/330/610/870/1150, 150–180 höga),
    lövträd och björk om vartannat ur `vagen-saker/`, kronan omfärgad i kod (filtret `host-i`: bara de gröna pixlarna får orange
    `#E88030`, gult `#F0BA3A` eller rost `#C66032`; stam, kontur och björkens bark är kvar), glider med halva vägens fart. Scenerna
    tonar bort träden efter kamerans zoom (borta i närbilderna). Plåten
    `lager/vagen.png` är `VÄG_TOM` (utan träd). **Inga träd eller buskar ur `vagen-saker/`** (allt där är grönt).
  - kornet ur 014:s `lager/korn.png`.
- **Vita kanter:** ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter kit.js i varje scen (skill `vita-kanter`).
  `kant.lagg(g)` på PNG-saker, `kant.lagg(g, { andel: 0.01 })` på det som ritas i kod. kit.figur får kanten av sig själv.
- `traktorn.js` (i stället för 007:s `lastbilen.js`): gröna traktorn (`assets/rekvisita/traktor-gron-oppen/`) åt höger med Lova i sätet,
  lagren ryggstöd → Lova (kropp, jacka, ansikte) → armarna → ratten → puffarna → framdelen (kaross, tak, främre stolpen) → hjulen,
  Lovas plats ur `leoparden-lova-i-traktorn.json` (skala 0,34, (512, 640) på (392, 430)). Armarna sitter inne i traktorn (bakom
  huven); när en arm gör något lyfts Lova `ARM_LYFT` (26 i traktorns ruta) så att tassarna syns över kanten, annars ligger de på ratten.
  En arm som pekar uppåt böjs i armbågen (överarmen ut åt sidan tätt intill kroppen, underarmen och tassen mot målet; ärmen klipps
  i två bitar), och ärmarna sträcks bara på längden, aldrig tjockare. Står hon (`sta`) släpper hon ratten.
  Tassarna på ratten (som musen i 005): axeln flyttad `INAT` inåt på bröstet, korta armar nedåt-inåt, aldrig sträckta. Bakom Lova
  fyller en mörkare grön bakvägg (`HYTT`, hålet i fram.png) hela hyttöppningen, så att ingen himmel syns bredvid eller under henne;
  hon sitter `SANK` lägre så att huven täcker henne från bröstet.
  Allt mellan poserna glider (`glatta`, tidskonstant 0,08 s efter `kit.nu`): armarnas vinklar, hur högt hon sitter och rattens
  synlighet, så att inget hoppar mellan två bildrutor. `fast: true` = en pose bara för att mäta (kameran), rör inte glidet.
  **Ratten** (som 005:s bilen.js): mörkgrå kritring `#4b4542` med ekrar och röd tutknapp `#D9452B` vid bröstet, nedre halvan bakom
  karossens kant (huvmasken); tassar utan `r`/`l` ligger på ratten (klockan 10 och 2) och Lova sitter då `RATT_LYFT` högre. En arm
  uppe släpper, båda uppe (eller `ratt: false`, när hon kliver ur) = ingen ratt. `tut` 0–1: högertassen trycker på knappen (squish).
  `b.pose({ x, y, h, tilt, dist, flagg, humor, titt, tittY, blink, m, r, l, armSk, rot, lyft, zipp, sta, ratt, tut, lova, synlig })`:
  x, y, h som `place()` i bygg.py (bboxen med flaggan), `dist` snurrar hjulen, `r`/`l` = punkt i Lovas 1024-ruta som armen pekar
  mot, `zipp` = dragkedjans handtag (1 uppe vid kragen = standard, 0 nere; vagen-1 och vagen-2 har 0 fram till "Zipp" i 08c),
  `lova: false` = traktorn utan Lova (ikonraden), `sta` 0–1 = Lova reser sig i sätet (framför taket, kroppen fortfarande bakom
  huven via en mask) så att bröstet och jackan syns mot himlen (vagen-2 08a–08c). `b.puffa(t, tider)` vita kritpuffar ur avgasröret på huven, `b.punkt([x, y])`
  (Lovas ruta → bild), `b.tpunkt([x, y])` (traktorns ruta → bild), `traktorn.ljud(gupp)` hjul-gnissel lågt.
  Jackan (`lager/lova-jacka.png`) och ärmarna (`lager/lova-arm-r/l.png`) är jacka() och armbild() i bygg.py men ljusare
  (`JACKA` (132, 208, 116) i gor-lager.py, mot traktorns (58, 147, 47)), med krage och ficka; dragkedjan (grå tänder och ett stort vitt
  handtag) ritas i kod och handtaget flyttas med `zipp`. Gröna flaggan `lager/flagga-gron.png` (`grön_flagga()`: mättnad 235, h 320) fladdrar och släpar efter (`flagg`).
  Körscenen: `M.matt.TR` = `{ x, gv, h }` (körscen() i bygg.py). Traktorn vänds och snurras aldrig.
- `trafikljus.js`: trafikljuset med den tända lampan i kod (glöd, kritcirkel, glans). `trafikljus.ny(parent).pose({ x, y, h, tand: 'rod' | 'gron' | null, k })`.
  Används i vagen-2, refrängen, bondgården och ikonraden.
- `refrang.js`: refrängen Ärtresan (README:s "Refrängen: Ärtresan"), samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`, sedan
  `r.bygg(L, bil)` efter `kit.vag` och `r.rita(t)`; `r.DANS` = körscenens pose, där refrängen börjar och slutar, `r.zipp` = handtagets läge).
  a/b vägen blir en brun åker (`#7A5234`, vågiga fåror `#5C3C26`) och en grön grodd (klistermärke) växer upp per "Grönt!" (fyra),
  Lova står upp lite (`sta` 0,6) med armarna uppe så att jackan syns; c det stora trafikljuset poppar upp och lyser grönt på "kör",
  åkern grönskar (sex större groddar), traktorn far iväg (inga fartstreck, inga strålar: formatet); d/e klipp in i den stora skidan, ritad i kod som i_skidan()
  i bygg.py (skal, mörk insida, tre ärtor med ansikten, traktorn inne i skidan bakom främre kanten med söm, mot skidans ljusa insida `#C8DE8E` (ärtorna mellangröna `#80C446`, som bygg.py), stjälkkrok), traktorn
  kör längs den och ärtorna hoppar en i taget (alla tre på sista ekot); f närbild,
  ärtan (med kodansikte) studsar upp på taket, Lova reser sig, fnissar, glimtar; g skidan lutar 10° som rutschkana, traktorn glider
  ovanpå (främre kanten bakom traktorn) med en puff per putt, högertassen tutar på rattens knapp och tre kodärtor med ansikten
  glider efter som ett tåg på tut (`tuta-tut`, gungar, snurrar aldrig); h (bara 05h) vid bild, skidan stänger sig (`artskida-stangd.png`
  tonas in), Lova spanar åt båda hållen och ett grönt kritsvep (`kritsvep.js`) tar oss hem till körscenen. Laddas efter trafikljus.js
  (och kritsvep.js i vagen-1). Ljud: `plupp` per grodd, `tuff-tuff` lågt på "putt, putt", `tuta-tut` på "tut, tut". Inga kamerazoomar.
- `discoljus.js`: 007:s disco omfärgat: kulan `lager/discokula-gron.png` med gröna rutor; `lager/disco.png` är discot i mint (`DISCO_BILD`).
- `ikonrad.js`: raden av småbilder grodan (Gurras huvud), lampan (grön), ärtskidan, traktorn (utan Lova). Laddas efter trafikljus.js och traktorn.js.
- `lager/`: PNG:er och `matt.json` som `lager/gor-lager.py` tar ut ur storyboarden (vägen, flaggan, jackan och ärmarna, den ritade
  traktorns masker `ritad-kropp/tak/stolpar.png`, discot och kulan, kornet) plus måtten (TR, LOVA_I, AVGAS, HJULEN, RB, HP för
  bondgården, DISCO) och sångens slag. Kör om när bygg.py eller `assets/` ändras. gor-lager.py skriver inte om storyboarden:
  den kör bygg.py fram till blocket som sparar `frames/`. Kör sedan `gor-vag.py` (vägen utan mittstreck ur `lager/vagen.png`, krumeluren i himlen vid x 1200 täckt).
- `_test/traktorn/`: provbänk för traktorn.js, trafikljus.js, refrang.js, discoljus.js och ikonrad.js, bara för stillbilder.

## Kvar och skavanker (första halvan, 2026-11-06)
- **"Hej hej!" (03a)** har ingen inspelad replik än: Lovas mun pratar i bild på vinkningen, inget ljud.
- **Ljudet `zipp`** finns inte i ljudbiblioteket, så de tre ryckningarna i 08c är tysta.
- **Refrängens ordtider** (röst och eko i a–h) är uppskattade ur raderna och ekotiderna i parentes, inte uppmätta per ord. "kör" i c
  (62 % in i raden) och "ärta" i f (1,3 s in) är gissade; i refräng 2 är c bara 1,3 s, så den gröna vägen och avfärden hinns på ca 0,5 s.
- **bondgarden/** ritar 09g med `refrang.js` under sitt gula kritsvep, så den får Ärtresans rutschkana av sig själv; inte kollad i bild.
- **Takten:** BEAT/BEAT0 är ett rakt rutnät och glider bort från sången före ca 20 s och efter ca 80 s; orden fästs på uppmätta slag (`kit.takt`), bara gunget går på rutnätet.
- **Ratten:** löst. När den tänds eller släcks glider Lova `RATT_LYFT` (14 i traktorns ruta) och ratten tonas på ca 0,25 s (`glatta()`), inget hopp.
  Tutar: refrängen ("tut, tut" i g), discot 16d ("putt, putt", två tut) och slutet (en tut hej då på första viskade "putt, putt").
  02c i kritan-ritar är en teckning utan Lova; bondgården sätter `tut` själv.
- **Gurra (06)** hoppar på gräskanten framför vägen, inte på vägen.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I -W ignore lager/gor-lager.py   # ca 3 min
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-vag.py                # vägplattan utan mittstreck och streckremsan (kit.vag)
node render.mjs kritan-ritar 1 5 9.5 12 15.5   # stillbilder vid de tiderna → kritan-ritar/stills/
node render.mjs kritan-ritar --snabb           # förhandsvisning: 960 × 540, 15 bilder/s
node render.mjs kritan-ritar                   # hela scenen, en gång när Sanna har godkänt den
```
Förhandsvisa med `--snabb` och stillbilder. Bara huvudsessionen bygger storyboarden och grovklippet, och högst två sessioner renderar samtidigt.
