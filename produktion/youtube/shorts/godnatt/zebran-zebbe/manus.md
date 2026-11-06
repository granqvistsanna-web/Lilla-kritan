# Godnattsagan: Zebran Zebbe

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Inläsningen görs i ElevenLabs. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Zebran Zebbe](../../../../../karaktarer/zebran-zebbe.md) (✅ referensark), stående `cut/zebran-zebbe-faceless.png` och liggande `ligger/zebran-zebbe-ligger.png` i `assets/karaktarer/zebran-zebbe/`
- **Plats:** [Dammen på natten](../../../../../bakgrunder/dammen-natt.md): `assets/bakgrunder/dammen-natt/dammen-natt.png` (9:16, Google Flow), med månen som urklipp (`assets/bakgrunder/nattkullen-saker/mane.png`) högt upp på himlen
- **Godnatt-målen:** månen, näckrosen och vassen
- **Saker:** mjölkglaset, pottan, kudden och [nallen](../../../../../rekvisita/nalle.md). **Tillfälligt:** glaset, pottan och kudden är enkla former i kod i kritfärger, och nallen är `assets/rekvisita/nalle/cut/nalle-v10.png` (från sidan, ögat i kod), tills bilderna från Google Flow finns (nallen framifrån)
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2,5 min (12 sidor)

Zebbe är glad och sprallig, men i kväll är han sömnig. Han dricker sin mjölk, går på pottan, säger godnatt till månen, näckrosen och vassen, räknar sina ränder, gäspar, kryper ner på kudden med nallen bredvid, andas lugnt och somnar. Sagan pratar direkt till barnet och blir lite långsammare för varje sida, så att barnet kan gäspa, andas och blunda med.

## Sidorna

Texten och inläsningen står i [`../inlasning.md`](../inlasning.md) (Eleven v3 med taggar, en tagning per sida). Texten i bild är samma ord utan taggarna. Malin säger "zebran", aldrig ett namn.

**I bild högst två rader åt gången**, med radavståndet 1,5 × textstorleken. `//` i tabellen betyder att det första paret tonas ut och nästa in: ungefär när rösten kommer dit (andelen tecken), och när inläsningen finns mitt i närmaste paus i den.

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll vid dammen. / Zebran är sömnig. // Är du också sömnig? | Zebran andas | – |
| 2 | Zebran dricker sin mjölk. / Mmm, god mjölk. | Mjölkglaset glider fram till munnen, mjölken sjunker och munnen rör sig när han dricker, sedan glider glaset tillbaka | `slurp`, lågt |
| 3 | Sen pottan. / Sådär, bra! | Pottan glider in framför underkroppen så att det ser ut som att han sitter (han sjunker lite), sedan ut igen | `ding`, lågt, på "Sådär, bra!" |
| 4 | Godnatt, måne. | **Delad bild:** närbild på månen överst, zebrans ansikte nederst. Månen lyser upp och vaknar, zebrans mun rör sig med repliken | `glimt`, sedan zebrans godnattljud |
| 5 | Godnatt, näckros. | Delad bild: kameran glider till näckrosen. Den vaknar och sluter sakta sina kronblad (de förblir slutna, ansiktet i mitten syns) | `glimt` lågt, sedan godnattljudet |
| 6 | Godnatt, vass. | Delad bild: kameran glider till vassen. Den vaknar och gungar sakta, sedan lite hela tiden. Sedan helbild igen | `swoosh`, lågt, sedan godnattljudet |
| 7 | Zebran räknar sina ränder. / En … två … tre … // Zebran gäspar. Gääsp. / Kan du också gäspa? | Gäspningen, som Lages: munnen blir ett stort O och ögonen kniper ihop på "Gääsp" | (rösten) |
| 8 | Zebran kryper ner på kudden. / Nallen får sova bredvid. | Kudden kommer, zebran lägger sig på den (den stående bilden tonas över i den liggande), sedan kommer nallen bredvid | lövprassel (`produktion/sfx/new/leaves-3.mp3`) när han lägger sig |
| 9 | Benen blir tunga. Så tunga. / Vattnet är stilla. // Allt är så mjukt. | Tungt: kroppen sjunker 10 px på "tunga". Mjukt: en enda ring breder sakta ut sig på dammen och tonar bort | ett litet `plask`, mycket lågt |
| 10 | Zebran andas in … och ut. / In … och ut. // Kan du också? | Två synligt djupa andetag, ca 5 s vart: kroppen sväller på "in" och sjunker på "ut" | – |
| 11 | Månen blundar. / Näckrosen blundar. // Vassen blundar. / Nallen blundar. | Månen, näckrosen, vassen och nallen blundar **en i taget**, i den ordning de sägs | – |
| 12 | Zebran blundar. / Nu sover zebran. // Godnatt, zebra. / Godnatt, du. | Zebran sluter ögonen, sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: zebran andas (5 s per andetag), månen gungar lite, vassen gungar lite, och alla som är vakna blinkar var 5,5 s.

Ansiktena ritas i kod. Månen, näckrosen och vassen har prickögon och ett litet leende, som månen hos Lage (näckrosen på den gula mitten, vassen på den största kolven). Zebrans ansikte: stående ögonen (414, 401) och (603, 400), radie 25, och munnen (505, 530) i nedre delen av mulen, uppmätta mot `zebran-zebbe.png`; liggande ögonen (428, 505) och (598, 505) och munnen (512, 735), uppmätta i `zebran-zebbe-ligger.png`. Munnen är ett litet leende som öppnas med mörk insida och tunga. Närbilden på zebrans ansikte (sida 4–6) har zoom 2,1 och ansiktet mitt i nedre halvan (y 1420), så att hela huvudet med öronen och lite kropp syns och ansiktet är i fokus (Sanna 2026-11-06: 3,6 var för tätt).

**Vita kanter** enligt `vita-kanter`: varje urklipp och sak (zebran i båda poserna, månen, näckrosen, vassen, nallen, glaset, pottan, kudden) får kanten från `verktyg/kant.js`, 3 px + 1 % av höjden i bild. Bilderna har redan 1 % inbakat, sakerna i kod får hela regeln. Världen visas i olika zoom (hel bild och närbilderna), så kantens bredd räknas om varje bildruta efter zoomen i den bild saken syns i (`kanter()` i `index.html`). Skarven i den delade bilden är en jämn rak linje.

**Näckrosen och vassen ritas i kod** ovanpå bildens egna, eftersom de måste kunna röra sig (kronbladen sluts, vassen gungar). Bildens näckros täcks av en fläck i dammens färg; bildens vass syns lite bakom kodens när den gungar. Bäst vore urklipp som månen (näckrosen öppen och sluten, vassen), om Sanna vill göra dem.

### Att tajma efter inläsningen

Värdena i början av `index.html` styr när rörelserna kommer, och ska flyttas när inläsningen finns:

- `GASP`: när munnen öppnas på "Gääsp" och stängs igen (sida 7, andel av sidans rörelse).
- `TUNGA` och `RING`: när kroppen sjunker på "tunga" och när ringen på vattnet börjar (sida 9).
- `ANDAS_FAS`: sekunder att flytta andningen (5 s per andetag) så att zebran sväller på "in" och sjunker på "ut" (sida 10). Andningen har samma takt hela filmen, bara djupet ändras, så den hoppar aldrig.
- `BLUNDA`: när månen, näckrosen, vassen och nallen blundar (sida 11).
- Radparens byte räknas fram av sig självt (`mun.json` behövs för pauserna, så kör `mun.py` efter inläsningen).

### Sakerna i koden

Glaset glider från (430, 1300) till munnens högra sida, pottan står framför underkroppen (y 1392), kudden ligger under den liggande zebran (y 1405) och nallen sitter till höger om honom (fötterna på (505, 1448)). När bilderna finns: byt formerna i `index.html` (`glas`, `potta`, `kudde`) mot bilderna på samma ställen, och nallen framifrån mot `NALLE` (fil, skala, fötterna och ögonen uppmätta i bilden; två ögon i stället för ett).

### Platsen i koden

`DAMM` i `index.html` har bilden och punkterna uppmätta i den (dammens mitt, näckrosen, vassens rot, dammens färg). Zebran står och ligger till vänster på gräset (`ZEBBE.fot` (270, 1440)), precis vid dammens vänstra kant. Närbilderna (`NARA`): mitt x ska ligga mellan 540/zoom och 1080 − 540/zoom så att kameran inte visar utanför bilden. Vassens närbild är vald så att näckrosen hamnar under skarven och texten inte går över stråna.

### Godnattljudet (sida 4–6)

Förslag: ett **mjukt, lågt frustande**, läpparna som fladdrar (som en häst som slappnar av), kort, ca 0,6–0,8 s. Inget gnägg (för högt och sprallig) och inget som låter som ett bää. Det finns inget sådant ljud i `assets/ljud/effekter/` än, så **tills vidare lånar zebran lejonets `bobo`** (`GODNATT_LJUD` i `index.html`, märkt TILLFÄLLIGT). Förslag till ElevenLabs SFX:

```
a soft, gentle, sleepy horse lip flutter snort, low and relaxed, very short, close and quiet, no neigh, no whinny
```

Läggs det in som `assets/ljud/effekter/frust/frust-1.m4a` … : sätt `GODNATT_LJUD = 'frust'` och `BOBO` till de tagningar som ska användas, och `LJUD = 'frust'` i `mun.py`.

## Att tänka på

- Zebran vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, och lägger sig på samma ställe. Inga hopp och ingen galopp, fast han är sprallig annars.
- Ränderna räknas inte i bild (ingen pekar, inga siffror tänds). Barnet får räkna med rösten.
- Gäspningen är mjuk och smittande. Barnet får gäspa med.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-12.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, och på sida 11–12 plus 5 s, så tiderna i `SIDOR` är bara ungefärliga. Sida 4, "Godnatt, måne.", är samma i alla sagor.
- Texten står runt y 760, mellan månen och zebran, högst två rader. Inget viktigt under 75 % av höjden: dammen och zebran ligger ovanför.

## YouTube

- **Titel:** Godnatt, zebra 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (2026-11-06, byggd från Lages). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), sida 11–12 + 5 s.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/zebran-zebbe/`. Sidor utan inläsning läses av talsyntesen.
- Munnen: `python3 produktion/youtube/shorts/godnatt/zebran-zebbe/mun.py` i repots rot, efter nya `sida-N.m4a` eller nytt godnattljud. Skriver `mun.json`.
- Rendering: huvudsessionen bygger filmen. Här görs bara stillbilder.
- Stillbilder: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/zebran-zebbe --staende 4 9 15.5 26 34 48 72 82 87 98 110 122 131 140` → `stills-staende/sheet.jpg` (tiderna gäller utan inläsning).

## Kvar att göra

- [ ] Inläsningen `sida-1.m4a` … `sida-12.m4a` (se `../inlasning.md`), sedan `mun.py`, `GASP`, `TUNGA`, `RING`, `ANDAS_FAS` och `BLUNDA`.
- [ ] Bilderna på mjölkglaset, pottan, kudden och nallen framifrån (Google Flow), in i stället för formerna i kod.
- [ ] Godnattljudet (frustet), se ovan.
- [ ] Gärna: näckrosen och vassen som urklipp i stället för i kod.
