# Godnattsagan: Leoparden Lova

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Texterna och inläsningen: [`../inlasning.md`](../inlasning.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen. Mallen är [Lejonet Lage](../lejonet-lage/manus.md).

- **Figur:** Leoparden Lova (✅ referensark, bilderna i `assets/karaktarer/leoparden-lova/`)
- **Plats:** [Skogen på natten](../../../../../bakgrunder/skogen-natt.md): `assets/bakgrunder/skogen-natt/skogen-natt.png` (9:16). Det stora trädet till vänster och lövhögen till höger finns i bilden; månen läggs på i kod (`assets/bakgrunder/nattkullen-saker/mane.png`). Lövet som singlar ner är ett löst löv ur `assets/bakgrunder/skogen-saker/lovhog.png`.
- **Saker:** mjölkglas, potta, kudde (**tillfälliga** former i kod tills bilderna från Google Flow finns) och [nallen](../../../../../rekvisita/nalle.md) (`assets/rekvisita/nalle/cut/nalle-v10.png`, sedd från sidan; **tillfällig** tills den framåtvända nallen finns).
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min 20 s

Godnatt-rutinen i skogen: leoparden dricker mjölk, går på pottan, säger godnatt till månen, trädet och lövhögen, gäspar, kryper ner på kudden med nallen bredvid, blir tung och mjuk, andas lugnt, och alla somnar en i taget. Sagan talar till barnet: är du också sömnig, gäspa med, andas med, godnatt, du.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, Eleven v3, taggarna i `inlasning.md`), ordagrant. Hon säger "Leoparden", inte "Lova". I bild står högst två rader åt gången; `//` i tabellen betyder att nästa par tonas in när Malin kommer dit.

| # | Text i bild | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll i skogen.<br>Leoparden är sömnig. // Är du också sömnig? | Leoparden står vid lövhögen och andas. En lång, sömnig blinkning | – |
| 2 | Leoparden dricker sin mjölk.<br>Mmm, god mjölk. | Mjölkglaset glider fram till munnen och lutar, mjölken sjunker, munnen tar små klunkar. Sedan glider glaset bort | – |
| 3 | Sen pottan.<br>Sådär, bra! | Pottan glider in framför underkroppen och hon sjunker lite, så att hon sitter på den. Efter "Sådär, bra!" reser hon sig och pottan glider bort | – |
| 4 | Godnatt, måne. | **Delad bild:** närbild på månen överst, leopardens ansikte nederst. Månen lyser upp och vaknar | `glimt`, sedan godnatt-ljudet |
| 5 | Godnatt, träd. | Delad bild: kameran glider till trädkronan. Trädet vaknar och gungar sakta från stammens fot | `swoosh`, lågt, sedan godnatt-ljudet |
| 6 | Godnatt, lövhög. | Delad bild: kameran glider till lövhögen. Den vaknar och prasslar mjukt. Sedan helbild igen | lövprassel (`produktion/sfx/new/leaves-3.mp3`), sedan godnatt-ljudet |
| 7 | Vips! …<br>Nej, inte nu. // Leoparden gäspar. Gääsp.<br>Kan du också gäspa? | En liten ansats mot oss (lite större, lite upp) som stannar direkt. Sedan den stora gäspningen: munnen blir ett stort O och ögonen kniper ihop. Hon vänds aldrig | (rösten) |
| 8 | Leoparden kryper ner på kudden.<br>Nallen får sova bredvid. | Kudden kommer, den stående bilden tonas över i den liggande på kudden, och nallen glider in bredvid henne | lövprassel |
| 9 | Tassarna blir tunga. Så tunga.<br>Löven är mjuka. // Allt är så mjukt. | Hon sjunker lite till på "tunga", och ett löv singlar sakta ner från trädkronan till marken bredvid henne | – |
| 10 | Leoparden andas in … och ut.<br>In … och ut. // Kan du också? | Huvudrörelsen: två djupa, synliga andetag, ca 5 s vardera, inandning först | – |
| 11 | Månen blundar.<br>Trädet blundar. // Lövhögen blundar.<br>Nallen blundar. | Månen, trädet, lövhögen och nallen sluter ögonen, en i taget, i den ordning de nämns | – |
| 12 | Leoparden blundar.<br>Nu sover leoparden. // Godnatt, leopard.<br>Godnatt, du. | Leoparden sluter ögonen (första tredjedelen av sidan), sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: leoparden andas, månen gungar lite, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, trädkronan och lövhögen ritas i kod (prickögon och ett litet leende), nallens öga också. Lovas ansikte ritas i kod:

- **Stående** (`cut/leoparden-lova-faceless.png`): ögonen (413, 398) och (604, 396), munnen (512, 497, samma som i 014:s `kit.js`), fötterna (520, 912) i 1024-rutan.
- **Liggande** (`ligger/leoparden-lova-ligger.png`): ögonen (370, 600) och (542, 600), 1,35 gånger större eftersom huvudet är stort, munnen (456, 738), fötterna (465, 862). Ögonen sitter på den släta pannan ovanför nosen, där det inte finns några prickar.

**Texten i bild:** högst två rader åt gången, radavstånd 1,5 × textens storlek. Sidor med fler rader visas i par: första paret tonas ut och nästa tonas in. Tills inläsningen finns byts paret efter andelen tecken; när `sida-N.m4a` finns räknas samma andel på inläsningens längd. Texten har en mörk kant så att den syns mot himlen.

**Delad bild (sida 4–6):** överst det leoparden säger godnatt till, nederst hennes ansikte. Närbilden på leoparden har zoom 1,2 och ansiktet mitt i nedre halvan, så att hela huvudet med öronen syns och munnen går att läsa (Sanna 2026-11-07: 3,6 och 2,0 var för tätt). Skarven är en jämn krämvit linje. Trädets närbild stannar vid bildens vänsterkant och slutar ovanför Lovas öron.

**Trädet och lövhögen rör sig** fast de finns i bakgrunden: koden lägger en bit av nattbilden ovanpå (`BIT` i `index.html`) och vrider eller vickar den lite från foten, bara på sida 5 och 6. Annars ligger biten exakt på bilden.

**Vita kanter:** alla urklipp (leoparden stående och liggande, månen, nallen, lövet och de tillfälliga sakerna) får kanten från `verktyg/kant.js` (skillen vita-kanter: 3 px + 1 % av höjden i bild). PNG:erna har redan sin 1 % inbakad; de ritade sakerna får hela regeln. Världen visas genom `<use>`, så scenen sätter kantens storlek själv efter zoomen varje bildruta, med kant.js egna filter. Bakgrundens träd och lövhög får ingen kant.

**Godnatt-ljudet (tillfälligt):** efter varje "Godnatt, …" på sida 4–6 ska Lova säga godnatt med ett eget mjukt spinn. Det finns inget spinn i `assets/ljud/effekter/` än, så Lages `bobo` (1, 2, 4) används som platshållare. När spinnet finns: lägg det som `assets/ljud/effekter/spinn/spinn-N.m4a`, byt `effekt('bobo', k)` mot `effekt('spinn', k)` och `MUN['bobo-' …]` i `index.html`, och byt `GODNATT` i `mun.py`.

**Sakerna (tillfälliga):** mjölkglaset, pottan och kudden är enkla former i kod (`FARG` och kommentarerna `TILLFÄLLIG` i `index.html`). När bilderna finns: byt formerna mot `<image>` i samma grupper (`glas`, `potta`, `kudde`), sätt `andel` till 0 i `KANT` (bilderna har sin kant inbakad) och justera platserna. Den framåtvända nallen byter `NALLE.fil` och ögonen.

`mun.json` räknas fram ur `sida-N.m4a` och godnatt-ljudet med `python3 produktion/youtube/shorts/godnatt/leoparden-lova/mun.py` (i repots rot). Kör den igen när inläsningen eller ljudet är klart.

## Att tänka på

- Leoparden vänds aldrig och snurrar inte. Hon är vänd mot tittaren hela filmen.
- "Vips!" är bara en ansats: hon kommer knappt iväg innan "Nej, inte nu." Inget hopp, inget spring.
- Gäspningen och andningen är till för att barnet ska göra med. Malin gäspar på riktigt och andas hörbart in och ut, lugnt.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-12.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s (sida 11–12: plus 5 s), så tiderna i `SIDOR` är bara ungefärliga.
- När inläsningen finns, lyssna och flytta i `index.html`: klunkarna på sida 2, pottan på sida 3 ("Sådär, bra!" vid 78 %), gäspningen (42–90 % av sida 7) på "Gääsp", nallen (55–85 % av sida 8) på "Nallen", sjunkandet på "tunga" (15–40 % av sida 9), andetagen på sida 10 (5 s per andetag) på "in … och ut", och blundandet på sida 11 (`SOMNAR`) på "Månen", "Trädet", "Lövhögen" och "Nallen".
- Nedre fjärdedelen av bilden är mest tom mark, så inget viktigt hamnar under 75 % av höjden. I den delade bilden ligger leopardens mun strax under 75 %, enligt Sannas önskan att ansiktet ska vara mitt i nedre halvan.

## YouTube

- **Titel:** Godnatt, leopard 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, byggd på Lages (2026-11-06, tolv sidor 2026-11-07). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/leoparden-lova/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/leoparden-lova --staende` → `leoparden-lova-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 3 8 17 28 36 45 54 67 80 92 103 126` → `stills-staende/sheet.jpg`.
