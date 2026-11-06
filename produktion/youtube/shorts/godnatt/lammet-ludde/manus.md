# Godnattsagan: Lammet Ludde

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Lammet Ludde](../../../../../karaktarer/lammet-ludde.md) (✅ referensark, bilderna i `assets/karaktarer/lammet-ludde/`)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80 s

Ludde är lugn och lite sömnig, och han har en liten bjällra som plingar när han nickar till. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Lammet", inte "Ludde".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Lammet är sömnigt. | Lammet andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, lammets ansikte nederst. Månen lyser upp och vaknar, lammets mun rör sig med repliken. Efter repliken nickar lammet lite och bjällran plingar | `glimt`, sedan bjällran (`ding`) |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget. Bjällran efter repliken | `ding`, ett per stjärna, sedan bjällran |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Bjällran efter repliken. Sedan helbild igen | `swoosh`, lågt, sedan bjällran |
| 5 | Lammet nickar till.<br>Pling, säger bjällran.<br>Pling … pling. | Lammet nickar till tre gånger, långsamt: sjunker lite och lyfter igen, ögonen faller nästan ihop. Bjällran plingar när han är som längst ner, lite tystare för varje gång | `ding` × 3 |
| 6 | Lammet kryper ner<br>i det mjuka gräset. | Lammet trycks ihop och lägger sig: den stående bilden tonas över i den liggande | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Lammet blundar.<br>Kan du också blunda? | Lammet, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, lamm! | Lammet andas djupt, bilden mörknar till svart | musiken tonas ut (ingen snarkning och inget bä) |

Hela tiden, lugnt: lammet andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Närbilden på lammets ansikte är tät (zoom 3,6) så att munnen syns: den öppnas med mörk insida och tunga. Munnen på sida 2–4 följer `mun.json`, som räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/lammet-ludde/mun.py`. Spelas sidorna in på nytt ska den köras igen. Munnen står still på bjällrans pling: det är bjällran som låter, inte lammet.

**Stående:** `cut/ludde-faceless.png`, ögonen (418, 402) och (606, 401), munnen (511, 466) och fötterna (519, 915) i 1024-rutan, som i figurens fil. Ögon och mun ritas i kod.

**Liggande:** `cut/ludde-sover.png` (finns sedan tidigare). Den har slutna ögon och en liten mun i bilden. Därför ritas öppna ögon på en liten ullfläck (#efe6d3, uppmätt) över de slutna ögonen (420, 697) och (606, 697), och fläcken tonas bort när han blundar: på sida 7 och i varje blinkning syns bildens egna slutna ögon. Ingen mun i kod på den liggande. Fötterna (512, 845).

**Bjällran** syns inte i bild: Ludde har ingen bjällra i referensarket, och den ska inte ritas till utan att Sanna vill det. Ljudet är `ding` (en liten klocka), samma ljud som stjärnorna på sida 3. Det finns ingen egen bjällra bland effekterna. Vill Sanna ha en riktig bjällra: lägg den i `assets/ljud/effekter/bjallra/` och byt `effekt('ding', …)` mot `effekt('bjallra', …)` i `BJALLRA` och `NICK` i `index.html`.

Sidan står inläsningen + 4 s, minst 8 s.

## Att tänka på

- Lammet vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, hela filmen. Nicken är bara ett litet dopp rakt ner, inga hopp.
- Inget bä någonstans, inte heller som godnatt-ljud: där är det bjällran.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen, sedan `mun.py`. Sidans tid blir inläsningen plus ca 4 s, så tiderna i tabellen är bara ungefärliga.
- Sida 5: Malin säger "Pling" tre gånger, och bjällran plingar vid 20, 50 och 80 % av sidan (`NICK` i `index.html`). När inläsningen finns: lyssna och flytta `NICK` så att plingen inte krockar med hennes "pling", gärna strax efter vart och ett.
- Gräskullen täcker nedre delen av bilden på sida 6–8, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Ludde 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen ovan; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/lammet-ludde/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/lammet-ludde --staende` → `lammet-ludde-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 12 39 56 65` → `stills-staende/sheet.jpg`.
