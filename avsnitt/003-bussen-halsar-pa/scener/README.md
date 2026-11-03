# Scener – avsnitt 003

Kodscener (HTML + SVG) som renderas till film. En mapp per scen med en `index.html` som läser in `../kit.js`.

| Scen | Mapp | Storyboard | Längd |
|---|---|---|---|
| A · Busshållplatsen | `a-busshallplatsen/` | 03–08 + grönt kritsvep | bild 03 start → bild 08 slut (nu 0:26–1:25, 59 s, sången 18–77) |

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
- **Ögon och mun** ligger i figurens 1024-ruta och följer squash och tilt. Ögonen är uppmätta (med ansikte mot ansiktslös) för alla figurer utom fjärilen. Mun i kod bara för fordonen och planet, eftersom djuren behåller sin mun i den ansiktslösa bilden.
- **Bussen:** den ansiktslösa bilden saknar framruta, så den läggs tillbaka från originalet (`lapp`). `kit.dorr(buss, k)` öppnar dörren. `kit.iFonster(buss, figur, i)` sätter en figur i fönster `i` (0 bakerst, 3 närmast dörren) mot mörk ruta `#3E4A63` och ger grundposen: `f.pose({ ...bas, y: bas.y - studs })`.
- **Rörelse:** `kit.hopp(t, t0, t1, höjd)` (parabel, squash före och efter, `luft`, `ben` för indragna ben), `kit.vagga(fas, amp)` (gång), `kit.snurr(sträcka, radieIBild)` (hjul, i grader), `kit.blink(t, tider)`, `kit.prat(t, intervall)`, `kit.vinka(t, topp, sida)`.
- **Kamera:** `kit.kamera(cx, cy, zoom)`, hålls inom plattan. Kokningen ligger utanför kameran, så den är lika stark i närbild.
- **Kritsvep:** `kit.kritsvep(k, färg)`. k 0→0,5 fyller bilden från vänster, 0,5→1 suddar bort åt höger. Scen A slutar på k = 0,5 i vägens grönt `#acde7a`, så nästa scen börjar med att sudda (k 0,5→1).
- **Boil** bara på figurerna, ny seed var 3:e bild.

## Tider

Scenerna läser sina tider ur `../rader.txt` och SHOTS i `../storyboard/bygg.py` när sidan laddas (`kit.manus()`), så en ny sång eller en omtidsatt storyboard slår igenom vid nästa rendering. Var i en rad ett ord landar anges i beats från radens start (`kit.takt`, `kit.BEAT`, 96 bpm). I scen A står allt i `tider()` överst i filen: tut-tiderna, "hej"-vinkningen, hoppen och fönsterstudsarna. Replikerna (`BUSS_PRAT`, `KANIN_PRAT`) är gissade tills de är inspelade.
