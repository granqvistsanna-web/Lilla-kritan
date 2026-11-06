# Godnattsagan: Lejonet Lage

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** Lejonet Lage (✅ referensark, bilderna i `assets/karaktarer/lejonet-lage/`)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80 s

Lage är stor, snäll och lite sömnig, och hans ryt blir alltid en gäspning. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration", 2026-11-06), ordagrant. Hon säger "Lejonet", inte "Lage".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Lejonet är trött. | Lejonet andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, lejonets ansikte nederst. Månen lyser upp och vaknar, lejonets mun rör sig med repliken | `glimt` |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget | `ding`, ett per stjärna |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Sedan helbild igen | `swoosh`, lågt |
| 5 | Lejonet ska ryta. Rrroar …<br>Nej, det blev visst<br>en gäspning. Gääsp. | Munnen blir ett stort O, ögonen kniper ihop | (rösten) |
| 6 | Lejonet kryper ner<br>i det mjuka gräset. | Lejonet trycks ihop och lägger sig: den stående bilden tonas över i den liggande | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Lejonet blundar.<br>Kan du också blunda? | Lejonet, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, lejon! | Lejonet andas djupt, bilden mörknar till svart | musiken tonas ut (ingen snarkning, den lät som ett bää) |

Hela tiden, lugnt: lejonet andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Närbilden på lejonets ansikte är tät (zoom 3,6) så att munnen syns: den öppnas med mörk insida och tunga. Lejonets mun på sida 2–4 följer `mun.json`, som räknas fram ur `sida-N.m4a` (ljudstyrkan, 30 värden per sekund); spelas sidorna in på nytt ska den räknas om.

Den liggande posen: `assets/karaktarer/lejonet-lage/ligger/lejonet-lage-ligger.png` (Google Flow, Nano Banana, 0 krediter, 2026-11-06, bild 1 = `lejonet-lage-faceless.png`, bild 2 = `ludde-sover.png` för posen). Utan ansikte: ögonen (410, 476) och (600, 476) och munnen (505, 628) ritas i kod. Originalen ligger i `ligger/original/`.

Sidan står inläsningen + 4 s, minst 8 s. Musiken är `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt med en mjuk överton).

## Att tänka på

- Lejonet vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, hela filmen.
- Ryt och gäsp läses in mjukt, inte läskigt: ett litet rrroar som glider över i en gäspning. Barnet får gäspa med.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Sidans tid blir inläsningen plus ca 3 s, så tiderna i tabellen är bara ungefärliga.
- Gräskullen täcker nedre delen av bilden på sida 6–8, så inget viktigt hamnar under 75 % av höjden.
- Sida 5 har flest ord. Den får stå längst.

## YouTube

- **Titel:** Godnatt, Lage 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen ovan; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/lejonet-lage/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/lejonet-lage --staende` → `lejonet-lage-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 15 34 58` → `stills-staende/sheet.jpg`.
- Lage kryper ner bakom kullens kant (uppmätt i `nattkullen.png`). Texten ligger runt y 760, mellan molnet och Lage.
