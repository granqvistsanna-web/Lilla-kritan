# Godnattsagan: Lammet Ludde

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Lammet Ludde](../../../../../karaktarer/lammet-ludde.md) (✅ referensark, bilderna i `assets/karaktarer/lammet-ludde/`)
- **Plats:** [Bondgården](../../../../../bakgrunder/bondgarden.md) på kvällen, med ladugårdsdörren och höet. Månen är urklippet `assets/bakgrunder/nattkullen-saker/mane.png`. **Tillfälligt** (se nedan) tills nattbilden av Bondgården finns.
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min (10 sidor)

Ludde är lugn och lite sömnig. Han säger godnatt till månen, ladan och höet, nickar till så att bjällran plingar, gäspar, kryper ner i höet, andas lugnt och somnar. Sagan blir långsammare för varje sida: barnet får gäspa, andas och blunda med lammet, och berättaren pratar direkt till barnet.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Lammet", inte "Ludde". Hon läser varje sida lite långsammare och mjukare än den förra: hastighet (speed) ca 0,9 på sida 1 och sedan ner till ca 0,75 på sida 10 (ungefär 0,9 · 0,88 · 0,86 · 0,84 · 0,82 · 0,81 · 0,8 · 0,78 · 0,77 · 0,75).

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll på bondgården.<br>Lammet är sömnigt.<br>Är du också sömnig? | Lammet andas. Ladugårdsdörren står halvöppen, månen, ladan och höet sover än | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, lammets ansikte nederst. Månen lyser upp och vaknar, lammets mun rör sig med repliken. Efter repliken nickar lammet lite och bjällran plingar | `glimt`, sedan bjällran (`ding`) |
| 3 | Godnatt, lada. | Delad bild: kameran glider till dörren. Ladan vaknar (ansiktet sitter på dörren), och dörren glider sakta igen. Bjällran efter repliken | `swoosh`, lågt, sedan bjällran |
| 4 | Godnatt, hö. | Delad bild: kameran glider till höet. Höet vaknar och sjunker mjukt ihop lite. Bjällran efter repliken. Sedan helbild igen | prassel (`produktion/sfx/new/leaves-3.mp3`), lågt, sedan bjällran |
| 5 | Lammet nickar till.<br>Pling, säger bjällran.<br>Lammet gäspar. Gääsp.<br>Kan du också gäspa? | Lammet nickar till en gång, långsamt: sjunker lite och lyfter igen, ögonen faller nästan ihop, och bjällran plingar mjukt. Sedan den stora gäspningen: munnen blir ett stort O och ögonen kniper ihop | `ding`, mjukt, en gång |
| 6 | Lammet kryper ner<br>i det mjuka höet.<br>Huvudet blir tungt. Så tungt. | Lammet trycks ihop och lägger sig bredvid höet: den stående bilden tonas över i den liggande. På "tungt" sjunker han några pixlar till | prassel (`leaves-3.mp3`) |
| 7 | Höet är mjukt.<br>Ullen är varm.<br>Allt är så mjukt. | Den mjuka sidan: några höstrån dalar sakta ner och vaggar lite | – |
| 8 | Lammet andas in … och ut.<br>In … och ut.<br>Kan du också? | Huvudrörelsen: lammet andas tydligt djupare, två andetag, ca 5 s per andetag. Han sväller på "in" och sjunker på "ut" | – |
| 9 | Månen blundar.<br>Ladan blundar.<br>Höet blundar. | Månen, ladan och höet sluter ögonen, en i taget, i den ordning de nämns | – |
| 10 | Lammet blundar.<br>Nu sover lammet.<br>Godnatt, lamm.<br>Godnatt, du. | Lammet sluter ögonen. Sedan mörknar bilden till svart | musiken tonas ut (ingen snarkning och inget bä) |

Hela tiden, lugnt: lammet andas, månen gungar lite, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, dörren och höet ritas i kod (prickögon och ett litet leende, ljust på den mörka dörren). De sover tills de får godnatt. Närbilden på lammets ansikte är tät (zoom 3,6) så att munnen syns: den öppnas med mörk insida och tunga. Munnen på sida 2–4 följer `mun.json`, som räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/lammet-ludde/mun.py`. Spelas sidorna in på nytt ska den köras igen. Munnen står still på bjällrans pling: det är bjällran som låter, inte lammet.

**Stående:** `cut/ludde-faceless.png`, ögonen (418, 402) och (606, 401), munnen (511, 466) och fötterna (519, 915) i 1024-rutan, som i figurens fil. Ögon och mun ritas i kod.

**Liggande:** `cut/ludde-sover.png` (finns sedan tidigare). Den har slutna ögon och en liten mun i bilden. Därför ritas öppna ögon på en liten ullfläck (#efe6d3, uppmätt) över de slutna ögonen (420, 697) och (606, 697), och fläcken tonas bort när han blundar: på sida 10 och i varje blinkning syns bildens egna slutna ögon. Ingen mun i kod på den liggande. Fötterna (512, 845).

**Bjällran** syns inte i bild: Ludde har ingen bjällra i referensarket, och den ska inte ritas till utan att Sanna vill det. Ljudet är `ding` (en liten klocka). Det finns ingen egen bjällra bland effekterna. Vill Sanna ha en riktig bjällra: lägg den i `assets/ljud/effekter/bjallra/` och byt `effekt('ding', …)` mot `effekt('bjallra', …)` i `index.html` (bjällran på sida 2–4 och sida 5). Ladugårdsdörren har inget eget ljud heller: den glider med ett lågt `swoosh`.

Sidan står inläsningen + 4 s, minst 8 s. Sida 9 och 10 får stå längre: inläsningen + 5 s.

## Den tillfälliga platsen

Tills nattbilden av Bondgården (9:16, Google Flow) finns byggs platsen ur det som redan finns, utan nya bildfiler (`PLATS` i `index.html`):

- Himlen överst är nattkullens nattpapper (`nattkullen.png`), med månen.
- Under den ligger dagbilden `bondgarden.png` (1376×768) som ett band, skala 1,6, mörkad med ett nattfilter: den gula väggen, ladugårdsdörren och golvet.
- Dörren är en bit av samma bild som glider åt sidan över en mörk dörröppning. Höet är också en bit av bilden, klippt efter sin uppmätta kontur och lagd bredvid lammet. Båda har ett ljusare "månljus"-filter så att de syns.

När nattbilden kommer: byt `PLATS.fil` och mät om dörren, höet och golvlinjen. Ligger dörren och höet målade i nattbilden behövs dörren som eget urklipp för att den ska kunna glida igen (eller så får ladan en annan rörelse), och höet som eget urklipp för att det ska kunna sjunka ihop.

## Att tänka på

- Lammet vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, hela filmen. Nicken är bara ett litet dopp rakt ner, inga hopp.
- Inget bä någonstans, inte heller som godnatt-ljud: där är det bjällran.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-10.m4a` i den här mappen, sedan `mun.py`. Sidans tid blir inläsningen plus ca 4 s (sida 9–10: + 5 s), så tiderna här är bara ungefärliga.
- Tiderna för rörelserna står överst i `index.html` och ska stämmas av mot inläsningen när den finns (andel av sidans rörelse, som går från 1 s in till 1 s före slutet):
  - `NICK` (0,12): sida 5, nicken och bjällrans pling, gärna strax efter Malins "Pling".
  - `GASP`: sida 5, när munnen öppnas och stängs, så att gäspningen sitter på "Gääsp".
  - `TUNGT`: sida 6, när han sjunker på "tungt".
  - `STRA`: sida 7, var och när höstråna börjar dala.
  - `ANDETAG` (5 s): sida 8, "in" börjar när inläsningen börjar. Läs in sidan i den takten (ca 2,5 s "in …", 2,5 s "och ut") eller ändra värdet.
  - `SOMNAR` (0,1 · 0,4 · 0,7): sida 9, när månen, ladan och höet blundar. Flytta dem till när Malin säger respektive ord.
- Ingen befintlig bok eller serie nämns någonstans, varken i texten, filerna eller YouTube-texten.
- Inget viktigt under 75 % av höjden: lammet står på y 1440, och golvet under är tomt.

## YouTube

- **Titel:** Godnatt, Ludde 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, byggd på Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/lammet-ludde/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/lammet-ludde --staende` → `lammet-ludde-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 5 23 33 48 70 101` → `stills-staende/sheet.jpg`.
