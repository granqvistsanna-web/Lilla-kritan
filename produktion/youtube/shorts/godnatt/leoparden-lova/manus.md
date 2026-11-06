# Godnattsagan: Leoparden Lova

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen. Mallen är [Lejonet Lage](../lejonet-lage/manus.md).

- **Figur:** Leoparden Lova (✅ referensark, bilderna i `assets/karaktarer/leoparden-lova/`)
- **Plats:** [Skogen på natten](../../../../../bakgrunder/skogen-natt.md): `assets/bakgrunder/skogen-natt/skogen-natt.png` (9:16). Det stora trädet till vänster och lövhögen till höger finns i bilden; månen läggs på i kod (`assets/bakgrunder/nattkullen-saker/mane.png`). Lövet som singlar ner är ett löst löv ur `assets/bakgrunder/skogen-saker/lovhog.png`.
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min

Lova är snabbast av alla och vill springa en gång till. Men nu är det kväll i skogen. Hon säger godnatt till månen, trädet och lövhögen, gäspar, lägger sig i de mjuka löven och andas lugnt tills alla har somnat. Sagan talar till barnet: är du också sömnig, gäspa med, andas med, godnatt, du.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Leoparden", inte "Lova". Varje sida läses lite långsammare och mjukare än den förra: hastighet ca 0,9 på sida 1, ner till ca 0,75 på sida 10.

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll i skogen.<br>Leoparden är sömnig.<br>Är du också sömnig? | Leoparden står vid lövhögen och andas. En lång, sömnig blinkning | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, leopardens ansikte nederst. Månen lyser upp och vaknar, leopardens mun rör sig med repliken | `glimt`, sedan godnatt-ljudet |
| 3 | Godnatt, träd. | Delad bild: kameran glider till trädkronan. Trädet vaknar och gungar sakta från stammens fot | `swoosh`, lågt, sedan godnatt-ljudet |
| 4 | Godnatt, lövhög. | Delad bild: kameran glider till lövhögen. Den vaknar och prasslar mjukt. Sedan helbild igen | lövprassel (`produktion/sfx/new/leaves-3.mp3`), sedan godnatt-ljudet |
| 5 | Vips! …<br>Nej, inte nu.<br>Leoparden gäspar. Gääsp.<br>Kan du också gäspa? | En liten ansats mot oss (lite större, lite upp) som stannar direkt. Sedan den stora gäspningen: munnen blir ett stort O och ögonen kniper ihop. Hon vänds aldrig | (rösten) |
| 6 | Leoparden kryper ner<br>i de mjuka löven.<br>Tassarna blir tunga. Så tunga. | Den stående bilden tonas över i den liggande, bredvid lövhögen. På "tunga" sjunker hon några px till | lövprassel |
| 7 | Löven är mjuka.<br>Skogen är tyst.<br>Allt är så mjukt. | Ett löv singlar sakta ner från trädkronan och lägger sig på marken bredvid henne | – |
| 8 | Leoparden andas in … och ut.<br>In … och ut.<br>Kan du också? | Huvudrörelsen: två djupa, synliga andetag, ca 5 s vardera, inandning först | – |
| 9 | Månen blundar.<br>Trädet blundar.<br>Lövhögen blundar. | Månen, trädet och lövhögen sluter ögonen, en i taget, i den ordning de nämns | – |
| 10 | Leoparden blundar.<br>Nu sover leoparden.<br>Godnatt, leopard.<br>Godnatt, du. | Leoparden sluter ögonen (första tredjedelen av sidan), sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: leoparden andas, månen gungar lite, trädet gungar svagt, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, trädkronan och lövhögen ritas i kod (prickögon och ett litet leende). Lovas ansikte ritas i kod:

- **Stående** (`cut/leoparden-lova-faceless.png`): ögonen (413, 398) och (604, 396), munnen (512, 497, samma som i 014:s `kit.js`), fötterna (520, 912) i 1024-rutan.
- **Liggande** (`ligger/leoparden-lova-ligger.png`): ögonen (370, 600) och (542, 600), 1,35 gånger större eftersom huvudet är stort, munnen (456, 738), fötterna (465, 862). Ögonen sitter på den släta pannan ovanför nosen, där det inte finns några prickar.

**Godnatt-ljudet (tillfälligt):** efter varje "Godnatt, …" på sida 2–4 ska Lova säga godnatt med ett eget mjukt spinn. Det finns inget spinn i `assets/ljud/effekter/` än, så Lages `bobo` (1, 2, 4) används som platshållare. När spinnet finns: lägg det som `assets/ljud/effekter/spinn/spinn-N.m4a`, byt `effekt('bobo', k)` mot `effekt('spinn', k)` och `MUN['bobo-' …]` i `index.html`, och byt `GODNATT` i `mun.py`. Ett spinn är tyst med munnen: munnen kan få vara stängd (ta då bort `bo` ur munnen).

**Trädet och lövhögen rör sig** fast de finns i bakgrunden: koden lägger en bit av nattbilden ovanpå (`BIT` i `index.html`) och vrider eller vickar den lite från foten, bara på sida 3 och 4. Annars ligger biten exakt på bilden. Trädets närbild stannar vid bildens vänsterkant och slutar ovanför Lovas öron.

`mun.json` räknas fram ur `sida-N.m4a` och godnatt-ljudet med `python3 produktion/youtube/shorts/godnatt/leoparden-lova/mun.py` (i repots rot). Kör den igen när inläsningen eller ljudet är klart.

## Att tänka på

- Leoparden vänds aldrig och snurrar inte. Hon är vänd mot tittaren hela filmen.
- "Vips!" är bara en ansats: hon kommer knappt iväg innan "Nej, inte nu." Inget hopp, inget spring.
- Gäspningen och andningen är till för att barnet ska göra med. Malin gäspar på riktigt och andas hörbart in och ut, lugnt.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-10.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s (sida 9–10: plus 5 s), så tiderna i `SIDOR` är bara ungefärliga.
- När inläsningen finns, lyssna och flytta i `index.html`: gäspningen (42–90 % av sida 5) ska hamna på "Gääsp", sjunkandet på "tunga" (72–95 % av sida 6), andetagen på sida 8 (5 s per andetag) på "in … och ut", och blundandet på sida 9 (`SOMNAR`) på "Månen", "Trädet" och "Lövhögen".
- Texten har en mörk kant så att den syns mot himlen.
- Rad ett på sida 8 och rad tre på sida 6 är långa. De får plats men nästan kant i kant.
- Nedre fjärdedelen av bilden är tom mark, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Lova 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, byggd på Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/leoparden-lova/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/leoparden-lova --staende` → `leoparden-lova-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 7 14 24 33 46 58 70 81 101 111` → `stills-staende/sheet.jpg`.
