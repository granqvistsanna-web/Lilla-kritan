# Godnattsagan: Lammet Ludde

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Lammet Ludde](../../../../../karaktarer/lammet-ludde.md) (✅ referensark, bilderna i `assets/karaktarer/lammet-ludde/`)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 95 s

Ludde är lugn och lite sömnig. Han nickar till så att bjällran plingar, gäspar, lägger sig, andas lugnt och somnar. Sagan blir långsammare för varje sida: barnet får gäspa, andas och blunda med lammet, och berättaren pratar direkt till barnet.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Lammet", inte "Ludde". Hon läser varje sida lite långsammare och mjukare än den förra: hastighet (speed) ca 0,9 på sida 1, sedan ner till ca 0,75 på sida 8 (ungefär 0,9 · 0,88 · 0,86 · 0,84 · 0,82 · 0,8 · 0,77 · 0,75).

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Lammet är sömnigt.<br>Är du också sömnig? | Lammet andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, lammets ansikte nederst. Månen lyser upp och vaknar, lammets mun rör sig med repliken. Efter repliken nickar lammet lite och bjällran plingar | `glimt`, sedan bjällran (`ding`) |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget. Bjällran efter repliken | `ding`, ett per stjärna, sedan bjällran |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Bjällran efter repliken. Sedan helbild igen | `swoosh`, lågt, sedan bjällran |
| 5 | Lammet nickar till.<br>Pling, säger bjällran.<br>Lammet gäspar. Gääsp.<br>Kan du också gäspa? | Lammet nickar till en gång, långsamt: sjunker lite och lyfter igen, ögonen faller nästan ihop, och bjällran plingar mjukt. Sedan den stora gäspningen: munnen blir ett stort O och ögonen kniper ihop | `ding`, mjukt, en gång |
| 6 | Lammet kryper ner<br>i det mjuka gräset.<br>Huvudet blir tungt. Så tungt. | Lammet trycks ihop och lägger sig: den stående bilden tonas över i den liggande. På "tungt" sjunker han några pixlar till | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Lammet andas in …<br>och ut.<br>In … och ut.<br>Kan du också? | Huvudrörelsen: lammet andas tydligt djupare, ett andetag per 4 s. Han sväller på "in" och sjunker på "ut" | – |
| 8 | Lammet blundar.<br>Nu sover lammet.<br>Godnatt, lamm.<br>Godnatt, du. | Lammet, månen, stjärnorna och molnet sluter ögonen. Sedan mörknar bilden till svart | musiken tonas ut (ingen snarkning och inget bä) |

Hela tiden, lugnt: lammet andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Närbilden på lammets ansikte är tät (zoom 3,6) så att munnen syns: den öppnas med mörk insida och tunga. Munnen på sida 2–4 följer `mun.json`, som räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/lammet-ludde/mun.py`. Spelas sidorna in på nytt ska den köras igen. Munnen står still på bjällrans pling: det är bjällran som låter, inte lammet.

**Stående:** `cut/ludde-faceless.png`, ögonen (418, 402) och (606, 401), munnen (511, 466) och fötterna (519, 915) i 1024-rutan, som i figurens fil. Ögon och mun ritas i kod.

**Liggande:** `cut/ludde-sover.png` (finns sedan tidigare). Den har slutna ögon och en liten mun i bilden. Därför ritas öppna ögon på en liten ullfläck (#efe6d3, uppmätt) över de slutna ögonen (420, 697) och (606, 697), och fläcken tonas bort när han blundar: på sida 8 och i varje blinkning syns bildens egna slutna ögon. Ingen mun i kod på den liggande. Fötterna (512, 845).

**Bjällran** syns inte i bild: Ludde har ingen bjällra i referensarket, och den ska inte ritas till utan att Sanna vill det. Ljudet är `ding` (en liten klocka), samma ljud som stjärnorna på sida 3. Det finns ingen egen bjällra bland effekterna. Vill Sanna ha en riktig bjällra: lägg den i `assets/ljud/effekter/bjallra/` och byt `effekt('ding', …)` mot `effekt('bjallra', …)` i `index.html` (bjällran på sida 2–4 och sida 5).

Sidan står inläsningen + 4 s, minst 8 s. Sida 7 och 8 får stå längre: inläsningen + 5 s.

## Att tänka på

- Lammet vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, hela filmen. Nicken är bara ett litet dopp rakt ner, inga hopp.
- Inget bä någonstans, inte heller som godnatt-ljud: där är det bjällran.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen, sedan `mun.py`. Sidans tid blir inläsningen plus ca 4 s, så tiderna i tabellen är bara ungefärliga.
- Tiderna för rörelserna står överst i `index.html` och ska stämmas av mot inläsningen när den finns (andel av sidans rörelse, som går från 1 s in till 1 s före slutet):
  - `NICK` (0,12): sida 5, nicken och bjällrans pling, gärna strax efter Malins "Pling".
  - `GASP`: sida 5, när munnen öppnas och stängs, så att gäspningen sitter på "Gääsp".
  - `TUNGT`: sida 6, när han sjunker på "tungt".
  - `ANDETAG` (4 s): sida 7, "in" börjar när inläsningen börjar. Läs in sidan i den takten (ca 2 s "in …", 2 s "och ut") eller ändra värdet.
- Ingen befintlig bok eller serie nämns någonstans, varken i texten, filerna eller YouTube-texten.
- Gräskullen täcker nedre delen av bilden på sida 6–8, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Ludde 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen ovan; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/lammet-ludde/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/lammet-ludde --staende` → `lammet-ludde-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 12 39 56 65` → `stills-staende/sheet.jpg`.
