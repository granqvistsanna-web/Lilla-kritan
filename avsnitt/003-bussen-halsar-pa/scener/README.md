# Scener – avsnitt 003

Kodscener (HTML + SVG) som renderas till film. En mapp per scen med en `index.html` som läser in `../kit.js`.

| Scen | Mapp | Storyboard | Längd |
|---|---|---|---|
| A · Busshållplatsen | `a-busshallplatsen/` | 03–08 | bild 03 start → bild 08 slut (nu 0:26–1:25, 59 s, sången 18–77) |

## Rendera

```bash
node render.mjs a-busshallplatsen                 # hela scenen → a-busshallplatsen/a-busshallplatsen.mp4, med sångbiten
node render.mjs a-busshallplatsen 2 30 45         # stillbilder → stills/<t>.jpg + stills/sheet.jpg
node render.mjs a-busshallplatsen --fran 40 --till 50   # bara en bit, för snabbtest
```

1920×1080, 30 fps. Ljudet tas från `../sang.m4a` om scenen sätter `sang: [från, till]` (scenens t = 0 är sångens `från`, ljudet tonas ut vid `till` och följs av tystnad). Filmer och stills checkas inte in.
Förhandsvisa i webbläsaren via en server från repots rot (kit.js läser riggarnas json, och det går inte från `file://`):

```bash
python3 -m http.server 8000 -d ~/Documents/Lilla-kritan
```
Öppna sedan `http://localhost:8000/avsnitt/003-bussen-halsar-pa/scener/a-busshallplatsen/`.

## kit.js

```js
kit.duk('busshallplatsen');                         // plattan + lager.figurer (kokar) + lager.overst
const buss = await kit.figur('bussen-bettan');      // rigg, delar och kodögon; storlek från FIGURER (h i px)
const kanel = await kit.figur('kaninen-kanel', { h: 281 });
kanel.pose({ x, y, k, tilt, sx, sy, flip, delar: { 'arm-r': kit.vinka(t, 12.3), 'leg-l': [10, 0, -20] },
             ogon: 'open' | 'happy' | 'sleep' | 'big', blink, titt: -1..1, mun: 0..1, opacity, synlig });
const M = await kit.manus();                       // rader.txt + SHOTS: M.rad('Här kommer bussen').t, M.bild('05'), M.av
kit.kor(render, DURATION, { sang: [18, 77] });     // window.render/seek/DURATION/ready/SANG
```

- **Figurer:** `x, y` är fötternas punkt i bild (bboxens botten, mitt i x). Delar vrids runt vridpunkterna i `<namn>-rigg.json`; fordonens hjul är `del-1..n`. En del kan också få en egen transform: `'del-4': (px, py) => '…'` (propellern).
- **Storlek:** `FIGURER[slug].h` är höjden i helbild. Lammet 352, kaninen 281 (80 % av lammet), bussen 464, flygplanet 599 (stort). Övriga får 352 om inget anges.
- **Ögon och mun** ligger i figurens 1024-ruta och följer squash och tilt. Ögonen är uppmätta (med ansikte mot ansiktslös).
- **Regel: alla figurer har mun.** Varje figur i `FIGURER` har en kodmun under nosen: glatt leende som standard, `mun` 0..1 öppnar den, stora ögon (`ogon: 'big'`) ger ett litet "o". `munBredd` gör leendet bredare (grodan), `munFarg` ljusare på mörka kroppar (katten, fjärilen). Har en ansiktslös bild redan en ritad mun används den i stället (ingen har det nu). Ankan har sin riktiga näbb som lapp (`cut/ankan-agda-nabb.png`) i stället för kodleende; kycklingens näbb saknas i den ansiktslösa bilden, så leendet står där. En ny figur får sin mun uppmätt innan den används.
- **Bussen:** den ansiktslösa bilden saknar framruta, så den läggs tillbaka från originalet (`lapp`). `kit.dorr(buss, k)` öppnar dörren. `kit.iFonster(buss, figur, i)` sätter en figur i fönster `i` (0 bakerst, 3 närmast dörren) mot mörk ruta `#3E4A63` och ger grundposen: `f.pose({ ...bas, y: bas.y - studs })`.
- **Rörelse:** `kit.hopp(t, t0, t1, höjd)` (parabel, squash före och efter, `luft`, `ben` för indragna ben), `kit.vagga(fas, amp)` (gång), `kit.snurr(sträcka, radieIBild)` (hjul, i grader), `kit.blink(t, tider)`, `kit.prat(t, intervall)`, `kit.vinka(t, topp, sida)` (armen lyfts ~110°, fri från kroppen, sträcks 1,35× i toppen), `kit.benHopp(ben)` (fötterna dras upp och vinklas utåt i ett hopp; `ben` från `hopp()`). Delar tar `[grader, dx, dy, skala]`. Humlan har vingar som egna delar (`vinge-l`, `vinge-r`): flaxa med `Math.sin(t * 44) * 30`.
- **Kamera:** `kit.kamera(cx, cy, zoom)`, hålls inom plattan. Kokningen ligger utanför kameran, så den är lika stark i närbild.
- **Scenbyten:** raka klipp, inga kritsvep (Sanna, 2026-11-04). `../kritsvep.js` finns kvar men används inte. Scen A klipper från vägen till hållplatsen mitt i `SVEP`.
- **Plattor:** B:s vägg är turkos (`b-bondgarden/ny-vagg.py`, höet, dörren och golvet orörda), C:s ljusblå (`c-glasskiosken/bla-vagg.py`). C:s slut och outro ligger på det rena papperet `#FBF7EE` med introts `korn`, och logotypen är introts krit-bokstäver som poppar fram en i taget efter att figurerna tittat fram vid kanten och vinkat.
- **Backar:** `const b = kit.backar(kit.lager.plate)` ritar en bred bild med himmel, kritkullar (korn, vit kant) och vägen som böljande kritlinje. Fordon: `pose({ x, y: b.y(x) + 14, k: 0.36, tilt: b.grader(x) })`. Göm med `b.g.style.display`. Används i korscen-2 (öppningen).
- **Bussens vinklar:** bara sidvyn (`bussen-tva-fonster`) i scenerna (Sanna, 2026-11-04): bussen kör alltid in från sidan, även till hållplatsen och kiosken, och närbilder på ansiktet tas från sidan. Vinklarna framifrån och bakifrån (`bussen-fram`, `bussen-tre-kvart`, `kit.motKamera` …) finns kvar i kit men används inte. A slutar med att bussen kör ut åt höger på sista beaten (`UT_SLUT`), och körscen 1 börjar med att den kör in från vänster.
- **Närbilder:** 1,5–3 s, högst en per ~10 s, sedan tillbaka till helbild. Tider ur `M.rad(...)`. Som nu: kritan-ritar (kritspetsen väntar, "Vad kan det vara?"), A (bussens ansikte, fötterna, ansiktet, fönstret), korscen-1 (traktorn), B (snark/pip, "Hur säger lammet?" in i kameran, ögat öppnas, "God morgon"), korscen-2 (passagerarna tittar upp, traktorn vinkar), C (grodans mun på "glass", överräckningen, bussens ansikte från sidan).
- **Saker vid vägen:** `kit.vagsak(namn, parent, y, h)` lägger en stilla björk, gran, lövträd, stuga, staket eller brevlåda ur `assets/bakgrunder/vagen-saker/` bakom vägen (`s.pa(x)`). A blandar dem i trädraden (parallax 0,55), körscenerna låter dem glida förbi i vägens fart. Äppelträdet bara där sången säger det (körscen 1) och som ett av träden i A.
- **Boil** bara på figurerna: `kit.BOIL` (3,5 px förskjutning, ny seed var 4:e bild).
- **Bussens rörelse** är samma lugna värden i alla scener, i `kit.BUSS_RORELSE` (högst ~1,2° gung, ett gung per 4 beats, 1,5 px lyft). Använd `kit.bussGung(fas, amp)`, `kit.bussTut(t, tider, brum)`, `kit.bussStopp(t, stopp)`, `kit.bussStart(t, start)` och `kit.bussMotor(t)` i stället för egna hopp och gung. Alla börjar och slutar mjukt, inga ryck.

## Ljud

`kit.ljud(namn, t, { vol, variant, loop, langd, fade })` lägger en effekt på scentid `t` när scenen byggs (inte per bild); listan hamnar i `window.LJUD`. `render.mjs` mixar dem under sångbiten: sången på full nivå, effekterna −8 dB × `vol`, loopar kortade till `langd` med uttoning, en limiter sist. Varianterna (`<namn>-N.m4a` i `assets/ljud/effekter/`) väljs i tur och ordning. Ljud som inte finns än listas men är tysta.

| Scen | Effekter |
|---|---|
| kritan-ritar | skrrrrt-lang (kanten och spiralen), swoosh (gula kritan in), skrrrrt-kort (navet), pop + pling ("ta-da"), swoosh (zoomen) |
| A | brum, fågelkvitter, surr (humlan), propeller (planet), tuta-tut (ankan vinkar), tuta-tut, pschhh (dörren), boing + duns (hoppen), hjul-gnissel (stoppet), swoosh (matchklippets zoom), |
| korscen-1 | brum, fågelkvitter, fladder (Fia), tuff-tuff (traktorn), tuta-tut |
| B | fågelkvitter, brum, tuta-tut, pschhh, snark-pip, pling (ögat), ba (bä), boing + duns (hoppen), hjul-gnissel (stoppen) |
| korscen-2 | brum, fågelkvitter, propeller, fladder (Fia), tuff-tuff, tuta-tut |
| C | brum, hjul-gnissel, pling (kiosken syns), pschhh, kiosk-pling + boing ("glass"), plupp (glassen i tassen), mums, tuta-tut, swoosh (zoomen ut, teckningen bort), jubel, boing (figurerna tittar fram), pop (varje bokstav), pling (logotypen klar) |

Högst 2–3 effekter samtidigt. En ny effekt: lägg filerna i `assets/ljud/effekter/<namn>/<namn>-N.m4a` och antalet i `LJUDFILER` i kit.js. Varje hel rendering skriver också `<scen>-effekter.wav` (bara effekterna, exakt scenens längd); `--bara-ljud` skriver bara den. kritan-ritar använder inte kit, så den sätter `window.LJUD` själv i samma form.

## Matchklippet kritan-ritar → A

Kritan-ritars sista ruta och scen A:s första är samma bild: det ritade hjulet på papperet, på bussens framhjuls plats (x 1260, y 816,5, radie 157,5). Scen A visar `a-busshallplatsen/klipp/papper.png` och `hjul.png` (fångade ur kritan-ritars sista ruta med `node a-busshallplatsen/klipp/fanga.mjs`; kör om den om kritan-ritar ändras), hjulet snurrar vidare, papperet löses upp på 0,7 s, kameran drar sig bakåt på 1,5 s och det ritade hjulet tonar över i bussens eget framhjul med samma vinkel.

## Tider

Scenerna läser sina tider ur `../rader.txt` och SHOTS i `../storyboard/bygg.py` när sidan laddas (`kit.manus()`), så en ny sång eller en omtidsatt storyboard slår igenom vid nästa rendering. Var i en rad ett ord landar anges i beats från radens start (`kit.takt`, `kit.BEAT`, 96 bpm). I scen A står allt i `tider()` överst i filen: tut-tiderna, "hej"-vinkningen, hoppen och fönsterstudsarna. Replikerna (`BUSS_PRAT`, `KANIN_PRAT`) är gissade tills de är inspelade.
