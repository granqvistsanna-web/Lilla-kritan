# Godnattsagan: Zebran Zebbe

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Inläsningen görs i ElevenLabs. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Zebran Zebbe](../../../../../karaktarer/zebran-zebbe.md) (✅ referensark), stående `cut/zebran-zebbe-faceless.png` och liggande `ligger/zebran-zebbe-ligger.png` i `assets/karaktarer/zebran-zebbe/`
- **Plats:** [Dammen på natten](../../../../../bakgrunder/dammen-natt.md): `assets/bakgrunder/dammen-natt/dammen-natt.png` (9:16, Google Flow), med månen som urklipp (`assets/bakgrunder/nattkullen-saker/mane.png`) högt upp på himlen
- **Godnatt-målen:** månen, näckrosen och vassen
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min (10 sidor)

Zebbe är glad och sprallig, men i kväll är han sömnig. Han säger godnatt till månen, näckrosen och vassen, räknar sina ränder, gäspar, lägger sig vid dammen, andas lugnt och somnar. Sagan pratar direkt till barnet och blir lite långsammare för varje sida, så att barnet kan gäspa, andas och blunda med.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Zebran", inte "Zebbe".

**Inläsningen blir långsammare och mjukare för varje sida:** ElevenLabs-hastighet ca 0,9 på sida 1, ner till ca 0,75 på sida 10 (ungefär 0,9 · 0,88 · 0,86 · 0,85 · 0,83 · 0,81 · 0,8 · 0,78 · 0,76 · 0,75). Pauserna vid "…" ska höras.

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll vid dammen.<br>Zebran är sömnig.<br>Är du också sömnig? | Zebran andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, zebrans ansikte nederst. Månen lyser upp och vaknar, zebrans mun rör sig med repliken | `glimt`, sedan zebrans godnattljud |
| 3 | Godnatt, näckros. | Delad bild: kameran glider till näckrosen. Den vaknar och sluter sakta sina kronblad (de förblir slutna, ansiktet i mitten syns) | `glimt` lågt, sedan godnattljudet |
| 4 | Godnatt, vass. | Delad bild: kameran glider till vassen. Den vaknar och gungar sakta, sedan lite hela tiden. Sedan helbild igen | `swoosh`, lågt, sedan godnattljudet |
| 5 | Zebran räknar sina ränder.<br>En … två … tre …<br>Zebran gäspar. Gääsp.<br>Kan du också gäspa? | Gäspningen, som Lages: munnen blir ett stort O och ögonen kniper ihop på "Gääsp" | (rösten) |
| 6 | Zebran lägger sig vid dammen.<br>Benen blir tunga.<br>Så tunga. | Zebran lägger sig: den stående bilden tonas över i den liggande. På "tunga" sjunker kroppen 10 px till och ligger kvar så | lövprassel (`produktion/sfx/new/leaves-3.mp3`) tills han ligger |
| 7 | Vattnet är stilla.<br>Gräset är mjukt.<br>Allt är så mjukt. | Den mjuka sidan: en enda ring breder sakta ut sig på dammen och tonar bort | ett litet `plask`, mycket lågt |
| 8 | Zebran andas in … och ut.<br>In … och ut.<br>Kan du också? | Två synligt djupa andetag, ca 5 s vart: kroppen sväller på "in" och sjunker på "ut" | – |
| 9 | Månen blundar.<br>Näckrosen blundar.<br>Vassen blundar. | Månen, näckrosen och vassen blundar **en i taget**, i den ordning de sägs | – |
| 10 | Zebran blundar.<br>Nu sover zebran.<br>Godnatt, zebra.<br>Godnatt, du. | Zebran sluter ögonen, sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: zebran andas (5 s per andetag), månen gungar lite, vassen gungar lite, och alla som är vakna blinkar var 5,5 s.

Ansiktena ritas i kod. Månen, näckrosen och vassen har prickögon och ett litet leende, som månen hos Lage (näckrosen på den gula mitten, vassen på den största kolven). Zebrans ansikte: stående ögonen (414, 401) och (603, 400), radie 25, och munnen (505, 530) i nedre delen av mulen, uppmätta mot `zebran-zebbe.png`; liggande ögonen (428, 505) och (598, 505) och munnen (512, 735), uppmätta i `zebran-zebbe-ligger.png`. Munnen är ett litet leende som öppnas med mörk insida och tunga. Närbilden på zebrans ansikte har zoom 3,6.

**Näckrosen och vassen ritas i kod** ovanpå bildens egna, eftersom de måste kunna röra sig (kronbladen sluts, vassen gungar). Bildens näckros täcks av en fläck i dammens färg; bildens vass syns lite bakom kodens när den gungar. Bäst vore urklipp som månen (näckrosen öppen och sluten, vassen), om Sanna vill göra dem.

### Att tajma efter inläsningen

Värdena i början av `index.html` styr när rörelserna kommer, och ska flyttas när inläsningen finns:

- `GASP`: när munnen öppnas på "Gääsp" och stängs igen (sida 5, andel av sidans rörelse).
- `TUNGA`: när kroppen sjunker på "tunga" (sida 6).
- `ANDAS_FAS`: sekunder att flytta andningen (5 s per andetag) så att zebran sväller på "in" och sjunker på "ut" (sida 8). Andningen har samma takt hela filmen, bara djupet ändras, så den hoppar aldrig.
- `BLUNDA`: när månen, näckrosen och vassen blundar (sida 9).

### Platsen i koden

`DAMM` i `index.html` har bilden och punkterna uppmätta i den (dammens mitt, näckrosen, vassens rot, dammens färg). Zebran står och ligger till vänster på gräset (`ZEBBE.fot` (270, 1440)), precis vid dammens vänstra kant. Närbilderna (`NARA`): mitt x ska ligga mellan 540/zoom och 1080 − 540/zoom så att kameran inte visar utanför bilden. Vassens närbild är vald så att näckrosen hamnar under skarven och texten inte går över stråna.

### Godnattljudet (sida 2–4)

Förslag: ett **mjukt, lågt frustande**, läpparna som fladdrar (som en häst som slappnar av), kort, ca 0,6–0,8 s. Inget gnägg (för högt och sprallig) och inget som låter som ett bää. Det finns inget sådant ljud i `assets/ljud/effekter/` än, så **tills vidare lånar zebran lejonets `bobo`** (`GODNATT_LJUD` i `index.html`, märkt TILLFÄLLIGT). Förslag till ElevenLabs SFX:

```
a soft, gentle, sleepy horse lip flutter snort, low and relaxed, very short, close and quiet, no neigh, no whinny
```

Läggs det in som `assets/ljud/effekter/frust/frust-1.m4a` … : sätt `GODNATT_LJUD = 'frust'` och `BOBO` till de tagningar som ska användas, och `LJUD = 'frust'` i `mun.py`.

## Att tänka på

- Zebran vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, och lägger sig på samma ställe. Inga hopp och ingen galopp, fast han är sprallig annars.
- Ränderna räknas inte i bild (ingen pekar, inga siffror tänds). Barnet får räkna med rösten.
- Gäspningen är mjuk och smittande. Barnet får gäspa med.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-10.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, och på sida 9–10 plus 5 s, så tiderna i `SIDOR` är bara ungefärliga.
- Texten står runt y 760, mellan månen och zebran. Inget viktigt under 75 % av höjden: dammen och zebran ligger ovanför.

## YouTube

- **Titel:** Godnatt, zebra 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (2026-11-06, byggd från Lages). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), sida 9–10 + 5 s.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/zebran-zebbe/`. Sidor utan inläsning läses av talsyntesen.
- Munnen: `python3 produktion/youtube/shorts/godnatt/zebran-zebbe/mun.py` i repots rot, efter nya `sida-N.m4a` eller nytt godnattljud. Skriver `mun.json`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/zebran-zebbe --staende` → `zebran-zebbe-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 5 14.5 26 36 49 64 76 105 118` → `stills-staende/sheet.jpg` (tiderna gäller utan inläsning).

## Kvar att göra

- [ ] Inläsningen `sida-1.m4a` … `sida-10.m4a` (Malin, långsammare för varje sida), sedan `mun.py`, `GASP`, `TUNGA`, `ANDAS_FAS` och `BLUNDA`.
- [ ] Godnattljudet (frustet), se ovan.
- [ ] Gärna: näckrosen och vassen som urklipp i stället för i kod.
