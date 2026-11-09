# Godnattsagan: Lammet Ludde

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Texterna och inläsningen: [`../inlasning.md`](../inlasning.md). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen (utan taggarna).

- **Figur:** [Lammet Ludde](../../../../../karaktarer/lammet-ludde.md) (✅ referensark, bilderna i `assets/karaktarer/lammet-ludde/`)
- **Plats:** [Bondgården på natten](../../../../../bakgrunder/bondgarden-natt.md): `assets/bakgrunder/bondgarden-natt/bondgarden-natt.png`, med ladugårdsdörren och höet. Månen är urklippet `assets/bakgrunder/nattkullen-saker/mane.png`, högt på himlen.
- **Saker:** [mjölkglaset](../../../../../rekvisita/mjolkglas.md), [pottan](../../../../../rekvisita/potta.md), [kudden](../../../../../rekvisita/kudde.md) och [nallen framifrån](../../../../../rekvisita/nalle.md), urklippta i `assets/rekvisita/<sak>/cut/` (se Sakerna nedan).
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min 20 s (12 sidor)

Godnattrutinen: Ludde dricker sin mjölk, går på pottan, säger godnatt till månen, ladan och höet, nickar till så att bjällran plingar, gäspar, kryper ner på kudden med nallen bredvid, blir tung och mjuk, andas lugnt och somnar. Sagan blir långsammare för varje sida: barnet får gäspa, andas och blunda med lammet, och berättaren pratar direkt till barnet.

## Sidorna

Malin (ElevenLabs, Eleven v3) läser texten i `../inlasning.md`, en tagning per sida. Hon säger "Lammet", inte "Ludde". I bild står högst **två rader åt gången** (radavstånd 1,5 × teckenstorleken). `//` i tabellen betyder att det första radparet tonas ut och nästa tonas in när Malin kommer dit: efter andelen tecken tills inläsningen finns, sedan efter inläsningens längd.

| # | Text i bild | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll på bondgården. / Lammet är sömnigt. // Är du också sömnig? | Lammet andas. Ladugårdsdörren står halvöppen, månen, ladan och höet sover än | – |
| 2 | Lammet dricker sin mjölk. / Mmm, god mjölk. | Mjölkglaset glider in till munnen, mjölken sjunker medan munnen rör sig, glaset glider ut | `slurp`, lågt |
| 3 | Sen pottan. / Sådär, bra! | Pottan glider in framför den nedre halvan och lammet sjunker lite, så att det ser ut som att det sitter. Sedan reser det sig och pottan glider ut | `swoosh`, lågt |
| 4 | Godnatt, måne. | **Delad bild:** närbild på månen överst, lammet nederst. Månen lyser upp och vaknar, lammets mun rör sig med repliken. Efter repliken nickar lammet lite och bjällran plingar | `glimt`, sedan bjällran (`ding`) |
| 5 | Godnatt, lada. | Delad bild: kameran glider till dörren. Ladan vaknar (ansiktet sitter på dörren), och dörren glider sakta igen. Bjällran efter repliken | `swoosh`, lågt, sedan bjällran |
| 6 | Godnatt, hö. | Delad bild: kameran glider till höet. Höet vaknar, pöser upp lite och sjunker mjukt tillbaka. Bjällran efter repliken. Sedan helbild igen | prassel (`produktion/sfx/new/leaves-3.mp3`), lågt, sedan bjällran |
| 7 | Lammet nickar till. / Pling, säger bjällran. // Lammet gäspar. Gääsp. / Kan du också gäspa? | Lammet nickar till en gång, långsamt, ögonen faller nästan ihop, och bjällran plingar mjukt. Sedan den stora gäspningen: munnen blir ett stort O och ögonen kniper ihop | `ding`, mjukt, en gång |
| 8 | Lammet kryper ner på kudden. / Nallen får sova bredvid. | Kudden glider fram, lammet trycks ihop och lägger sig på den (den stående bilden tonas över i den liggande). Sedan kommer nallen och sätter sig bredvid | prassel (`leaves-3.mp3`) |
| 9 | Huvudet blir tungt. Så tungt. / Höet är mjukt. // Allt är så mjukt. | På "tungt" sjunker lammet några pixlar till. På "Höet är mjukt" dalar några höstrån sakta ner | – |
| 10 | Lammet andas in … och ut. / In … och ut. // Kan du också? | Huvudrörelsen: lammet andas tydligt djupare, två andetag, ca 5 s per andetag. Det sväller på "in" och sjunker på "ut" | – |
| 11 | Månen blundar. / Ladan blundar. // Höet blundar. / Nallen blundar. | Månen, ladan, höet och nallen sluter ögonen, en i taget, i den ordning de nämns | – |
| 12 | Lammet blundar. / Nu sover lammet. // Godnatt, lamm. / Godnatt, du. | Lammet sluter ögonen. Sedan mörknar bilden till svart | musiken tonas ut (ingen snarkning och inget bä) |

Hela tiden, lugnt: lammet andas, månen gungar lite, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, dörren, höet och nallen ritas i kod (prickögon; nallens på små ljusa fläckar så att de syns på den mörkbruna pälsen). De sover tills de får godnatt. Närbilden på lammet (nedre halvan) har zoom 2,2 med ögonen och munnen i mitten, så att hela huvudet med öronen och lite av kroppen syns, och ansiktet ligger på y 1360 så att munnen hamnar ovanför YouTube-zonen (`NARA.lamm` och `LAMM_Y`). Munnen öppnas med mörk insida och tunga. Munnen på sida 2 och 4–6 följer `mun.json`, som räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/lammet-ludde/mun.py`. Spelas sidorna in på nytt ska den köras igen. Munnen står still på bjällrans pling: det är bjällran som låter, inte lammet.

**Stående:** `cut/ludde-faceless.png`, ögonen (418, 402) och (606, 401), munnen (511, 466) och fötterna (519, 915) i 1024-rutan, som i figurens fil. Ögon och mun ritas i kod.

**Liggande:** `cut/ludde-sover.png` (finns sedan tidigare). Den har slutna ögon och en liten mun i bilden. Därför ritas öppna ögon på en liten ullfläck (#efe6d3, uppmätt) över de slutna ögonen (420, 697) och (606, 697), och fläcken tonas bort när han blundar: på sida 12 och i varje blinkning syns bildens egna slutna ögon. Ingen mun i kod på den liggande. Fötterna (512, 845).

**Bjällran** syns inte i bild: Ludde har ingen bjällra i referensarket, och den ska inte ritas till utan att Sanna vill det. Ljudet är `ding` (en liten klocka). Det finns ingen egen bjällra bland effekterna. Vill Sanna ha en riktig bjällra: lägg den i `assets/ljud/effekter/bjallra/` och byt `effekt('ding', …)` mot `effekt('bjallra', …)` i `index.html` (bjällran på sida 4–6 och sida 7). Ladugårdsdörren har inget eget ljud heller: den glider med ett lågt `swoosh`.

Sidan står inläsningen + 4 s, minst 8 s. Sida 11 och 12 får stå längre: inläsningen + 5 s.

## Vita kanter

Enligt `vita-kanter`: kanten = 3 px + 1 % av sakens höjd i bild, via `verktyg/kant.js` på varje urklipp (stående och liggande lammet, månen, nallen, glaset, pottan och kudden).
- Sakerna är urklippta utan inbakad kant och får hela regeln (`andel: 0.01`).

- Den stående bilden har redan en jämn inbakad kant (8 px, ca 1 %) och får bara grundkanten ovanpå.
- `ludde-sover.png` har bara en tunn kant och lösa vita streck runt sig. Strecken tas bort i kod (filtret `rensa`) och hela kanten läggs med kant.js. Bildfilen är orörd.
- Dörren och höet är bitar ur bakgrunden och får ingen kant. Skarven i den delade bilden är en jämn vit linje, 8 px.

## Platsen

Nattbilden (768×1376) fyller bredden (skala 1,40625) och är flyttad 100 px uppåt, så att marken börjar strax ovanför 75 %-linjen och lammet står på marken (fötterna på y 1450). Under bildens nederkant fylls marken på med samma beige. Texten står på himlen, under månen (`TEXT_Y`), med en mörk kant så att den syns även i närbilderna. Himlen är mörkare än de andra nattplatserna och lyfts lite med nattblått ovanpå (`#ljusare`).

Dörren och höet är målade i bilden. För att de ska kunna röra sig ritas de en gång till som bitar ur samma bild (`PLATS` i `index.html`), utan nya bildfiler:

- **Dörren** (x 0–206, y 630–1090 i bilden) står halvöppen med en mörk dörröppning bakom. På sida 5 glider den igen.
- **Höet** klipps efter sin uppmätta kontur. Det kan inte bli mindre än i bilden (då syns det målade höet under), så det "sjunker mjukt ihop" genom att först pösa upp lite och sedan sjunka tillbaka.

## Sakerna

Urklippta ur rekvisitans bilder (vit bakgrund bort, ingen inbakad kant), i `assets/rekvisita/<sak>/cut/`. Storlek och plats står överst i `index.html` (`GLASET`, `POTTAN`, `KUDDEN`, `NALLE`).

- **Mjölkglaset** (`mjolkglas-v1.jpeg`) är delat i tre: `glas-v1.png` (väggarna, insidan genomskinlig), `mjolk-v1.png` (bara mjölken) och `insida-v1.png` (glasets insida, som konturen `GLASET.insida` är uppmätt ur). Mjölken klipps efter insidan och flyttas nedåt när lammet dricker, så att ytan behåller sin vågiga kant. Insidan har ett svagt blått glas (#bcd3e0, 50 %), annars syns inte mjölken mot ullen. Glaset är 125 px högt med kanten vid munnen.
- **Pottan** (`potta-v1.png`) är 280 px bred och står framför den nedre halvan med botten strax under fötterna.
- **Kudden** (`kudde-v1.png`) är 620 px bred och tryckt till 55 % på höjden, så att den ligger ner (sedd snett framifrån) bakom det liggande lammet.
- **Nallen framifrån** (`nalle-framifran-v1.png`, 250 px hög) sitter bredvid kudden. Ögonen ritas i kod, uppmätta i urklippet (270, 172) och (390, 172), på små ljusa fläckar så att de syns på den mörkbruna pälsen. Den blundar fjärde på sida 11.

## Att tänka på

- Lammet vänds aldrig och snurrar inte. Det står still, vänt mot tittaren, hela filmen. Nicken är bara ett litet dopp rakt ner, inga hopp.
- Inget bä någonstans, inte heller som godnatt-ljud: där är det bjällran.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-12.m4a` i den här mappen, sedan `mun.py`. Sidans tid blir inläsningen plus ca 4 s (sida 11–12: + 5 s), så tiderna här är bara ungefärliga.
- Tiderna för rörelserna står överst i `index.html` och ska stämmas av mot inläsningen när den finns (andel av sidans rörelse, som går från 1 s in till 1 s före slutet): `MJOLK`, `POTTA`, `NICK`, `GASP`, `KUDDE`, `TUNGT`, `STRA`, `ANDETAG` (5 s per andetag) och `SOMNAR` (när månen, ladan, höet och nallen blundar).
- Ingen befintlig bok eller serie nämns någonstans, varken i texten, filerna eller YouTube-texten.
- Inget viktigt under 75 % av höjden: lammets fötter står på y 1450, strax under linjen, och marken under är tom.

## YouTube

- **Titel:** Godnatt, Ludde 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, byggd på Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`, i radpar) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/lammet-ludde/`. Sidor utan inläsning läses av talsyntesen.
- Stillbilder: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/lammet-ludde --staende 3 8 15 26 34 42 64 74 80 90 96 107 118 125 137` → `stills-staende/sheet.jpg`. Hela filmen byggs i huvudsessionen.
