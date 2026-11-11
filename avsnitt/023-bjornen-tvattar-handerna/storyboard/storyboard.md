# 023 Björnen tvättar händerna – storyboard

**Status:** första storyboarden 2026-11-11, byggd ur `manus.md` (grind 1, replikerna är inte godkända rad för rad än).

**Längd:** 2:52.0 med 1 s logotyp-intro, utan outro (räknat av bygg.mjs ur raderna).

**Malins repliker är inspelade** (tagningen 2026-11-11, `../rost.txt`): längderna i `rader.mjs` (`ROST`) är uppmätta, och tiden för *"ren!"* (`REN`) är mätt med silencedetect. Tagningen har inget hörbart "Ha ha!" före "En gång till!" (replik 15), så rad 9 är lite kortare. Pauserna är manusets, och varje rad med en replik har 0,7 s extra luft (`GLES`). 

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/023-bjornen-tvattar-handerna/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/023-bjornen-tvattar-handerna/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg från receptet (Sanna 2026-11-11)

- **Introt är 1 s logotyp**, ingen jingel och inget titelkort. Filmens längd = scenernas längd + 1,0 s. Inget outro i storyboarden.
- **"Ska vi säga tack?"** i stället för "Vad säger man?".
- **Tydligt hej och hej då med vinkning** (rad 1 och 20–21) och en lek (den hala tvålen, rad 8b–9; klappa händerna, rad 18b).

## Platshållare som väntar på bilder och ljud

| Vad | Var i koden | Väntar på |
|---|---|---|
| ⚠ Logotypen (rad 00) | `kort()` i `scen.html` | läggs in i filmen, inte i storyboarden |
| Malins repliker | `ROST` i `rader.mjs` | klart: inspelade och uppmätta 2026-11-11 |
| ⚠ Björnens röst `brum-gullig` | `BRUM()` och `FNISS()` i `rader.mjs` | ljudfamiljen (8 känslor + långt fniss); tyst i animatiken |

## Granskning av stillbilderna (2026-11-11)

Tre testbilder, ärligt:

- **Tassarna gömda bakom ryggen (rad 5, 6a, 6b):** fungerar tekniskt, armarna är helt dolda bakom kroppen. Men bilden läses som *en björn utan armar*, inte som att den gömmer något. Det är rörelsen (armarna glider in) och blicken åt sidan som får bära det i filmen. Riggen har ingen sådan pose: armarna vrids rakt ner och skjuts 75 px in i `bjorn(… { gomda: true })`.
- **Klappen med skum ovanför handfatets kant (rad 10–12, 18b):** tassarna hamnar ovanför kanten, ca 35–60 px i scenen, så de skyms inte. Men **själva tassarna syns dåligt**: klapp-armarna är bruna som kroppen och saknar vit kant vid roten, så de är två mörka kilar på magen. Honungen (gul) gör dem tydliga så länge de är kladdiga; rena tassar (18b) bärs mest av kritstrecken och studsen. Skumtussen måste vara liten (r 15–19 px), annars täcker den munnen.
- **Honungsklicken på nosen (rad 14–16):** tydlig. Gult mot den mörkbruna nosen och den ljusa nospartiet syns direkt i närbilden, också utan skimmer. Den syns redan i helbild från rad 1, så barnet kan ha sett den innan frågan.

Det som inte gick att rita med riggen:

- **Gömda tassar** (ovan): egen kod, ingen pose.
- **Rynka nosen** (rad 16): finns inte i riggen. Björnen blundar (glada bågar) i stället.
- **Slicka sig om nosen** (rad 2): riggen har ingen tunga. En rosa tunga ritas i kod snett upp mot klicken; den är grov och behöver göras om i filmen.
- **Nosen tvättas utan tass:** armen når inte dit, så bara skumtussen snurrar över nosen (som manuset säger).
- **Vinkningen:** riggens pose `vinkar` (armen 118°) försvinner nästan helt bakom kroppen i stillbild. Storyboarden använder 86°, då sticker armen ut snett uppåt förbi kanten.
- **Pallen syns knappt:** björnen står på det höga steget bakom handfatet, så pallen skyms av skåpet och bara det låga steget syns till vänster om det. Klivet upp (rad 8a) är en pil, inte två synliga steg. Pallen är dessutom nedskalad till 0,40 (0,58 i 020) för att kanten ska hamna vid magen.
- **Torka** (rad 19): handduken är väggens handduk i liten skala som glider upp bakom kanten; kroken följer med. En egen liten handduk utan krok vore bättre.

## Handfatet (rekvisita/handfatet, 2026-11-11)

Det riktiga handfatet (`assets/rekvisita/handfatet/cut/handfatet.png`) är inlagt i skala 0,68 (`HK` i `scen.html`): 545 px brett, kanten 405 px över golvet, mitten på x 1180. Björnen står 65 px till vänster om mitten så att kranen inte hamnar framför bröstet, och tvålen ligger 205 px till vänster om mitten.

- **Från magen och upp:** stämmer på pallen; kanten ligger strax under magfläckens överkant.
- **Klappen med skum:** tassarna och skumtussen syns ovanför kanten i rad 10–12 och 18b.
- **Smalare än önskat:** bilden är nästan kvadratisk (802 × 775), så 0,68 ger 545 px, inte 620. Med 620 px skulle kanten hamna 459 px över golvet, högre än björnen.
- **Kranen nuddar höger arm:** i närbilderna 13–16 och vid vinkningen (20–21) ligger höger arm bakom kranen. Det läses som att björnen når mot kranen och stör inte, men vinkningen syns bättre med vänster arm om det behövs.
- **Golvraderna:** när björnen står på golvet (1–7) når kanten upp till ögonen, och skåpet är högre än björnen. Det passar berättelsen, eftersom björnen måste upp på pallen.

## Bilderna

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Björnen, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Intro | – | Lilla Kritans logotyp i 1 s, ingen jingel, inget titelkort. ⚠ Platshållare: logotypbilden läggs in i filmen | tyst | – |
| [01a](frames/01a.jpg) | 0:01.0 | 6.0 s | Papperet, helbild | *"Kritan ritar …"* (0:02.0) | Kritan ritar björnens kontur i lugna drag (ca 7 s totalt), halvvägs här | kritan ritar, skogsljud under | – |
| [01b](frames/01b.jpg) | 0:07.0 | 7.5 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:07.0) | Konturen ritas klar, sedan väntar kritan bredvid i ca 4 s och vajar lugnt: barnet gissar | kritan ritar | – |
| [01c](frames/01c.jpg) | 0:14.5 | 3.8 s | Papperet, helbild → zoom in | *"Oj! En björn!"* (0:15.1) | Den riktiga björnen fylls i inifrån, honungskladdet kommer sist (tassarna, nosen). Sista 0,8 s: zoom in i teckningen | – | glad |
| [1](frames/1.jpg) | 0:18.3 | 6.0 s | Badrummet, helbild | *"Hej, björnen! Hej, hej!"* (0:19.9) | Björnen trippar in från vänster (riggens gång), ett kladdigt gult tassavtryck per steg, stannar och vinkar. **Hej med vinkning** | små steg, glatt brum (⚠ `brum-gullig` saknas) | glad |
| [2](frames/2.jpg) | 0:24.3 | 5.7 s | Badrummet, närbild | *"Oj, oj, oj! Vad kladdig du är!"* (0:24.7) | Björnen håller upp tassarna åt sidorna: gul honung på båda, och en klick på nosen. Efter repliken slickar den sig om nosen | belåtet brum (⚠), slick | stolt, tungan ute |
| [3](frames/3.jpg) | 0:30.0 | 4.9 s | Badrummet, helbild | *"Titta, honung på golvet också!"* (0:30.3) | De kladdiga tassavtrycken på golvet skimrar till ett i taget; björnen tittar ner på dem | fniss (⚠) | nyfiken, tittar ner |
| [4](frames/4.jpg) | 0:34.9 | 5.0 s | Badrummet, halvbild björnen och handfatet | *"Nu ska du väl tvätta händerna?"* (0:35.5) | Kranen börjar rinna i handfatet. Björnen skakar på huvudet (ägget lutar åt sidorna) | `kran`, trumpet brum (⚠) | lite ledsen (trumpen) |
| [5](frames/5.jpg) | 0:39.9 | 8.1 s | Badrummet, närbild | *"Oj då. Björnen gömmer visst tassarna."* (0:40.2) … *"Hm … vad gör vi nu?"* (0:44.0) | Björnen gömmer tassarna bakom ryggen (armarna glider in bakom kroppen) och tittar bort åt vänster. Paus 1 s mellan replikerna | trumpet brum (⚠) | trumpen, tittar bort |
| [6a](frames/6a.jpg) | 0:48.0 | 9.9 s | Badrummet, halvbild | *"Titta! Kritan ritar något."* (0:48.3) | Kritan ritar tvålens kontur på handfatets kant (3 s), väntar sedan bredvid och vajar: gisspaus 3 s. Björnen kikar dit | kritan ritar | nyfiken |
| [6b](frames/6b.jpg) | 0:57.9 | 5.1 s | Samma | *"En tvål! Varsågod, björnen."* (0:58.1) | Den riktiga tvålen fylls i inifrån. *Varsågod* | glitter | förvånad |
| [7](frames/7.jpg) | 1:03.0 | 8.4 s | Samma | *"Ska vi säga tack?"* (1:03.3) … *"Tack!"* (1:08.4) | Björnen tittar på tvålen och tassarna kommer fram igen. Paus 4 s: barnet säger tack. Efter *Tack!* nickar björnen | nyfiket brum, sedan förtjust brum (⚠) | nyfiken → jätteglad |
| [8a](frames/8a.jpg) | 1:11.4 | 3.0 s | Badrummet, helbild | – | Upp på pallen: ett lugnt skutt per steg, sedan står björnen bakom handfatet, synlig från magen och upp | två mjuka steg | glad |
| [8b](frames/8b.jpg) | 1:14.4 | 6.0 s | Badrummet, halvbild | *"Oj! Tvålen är hal!"* (1:16.0) | Björnen tar tvålen mellan tassarna. Den glider upp ur tassarna i en mjuk båge och landar i handfatet. Ögonen följer den | `plopp`, fniss (⚠) | förvånad |
| [9](frames/9.jpg) | 1:20.4 | 6.1 s | Samma | *"Ha ha! En gång till!"* (1:22.4) | En gång till: tvålen glider upp och landar. **Leken (den hala tvålen)** | `plopp`, långt fniss (⚠) | fnissig |
| [10](frames/10.jpg) | 1:26.5 | 4.7 s | Samma | *"Ska du tvätta bort all honung nu?"* (1:26.8) | Björnen håller tvålen mellan tassarna (klappen framför magen). **Shorten börjar här** | förtjust brum (⚠) | glad |
| [11](frames/11.jpg) | 1:31.2 | 7.1 s | Handfatet, närbild tassarna | *"Först ena tassen. Gnugga, gnugga … ren!"* (1:31.5) | Skumtussen snurrar mellan tassarna och växer. Kladdet på vänstra tassen bleknar och är borta på *"ren!"* | `skrubb`, `tindra` på "ren" | glad |
| [12](frames/12.jpg) | 1:38.4 | 7.8 s | Samma | *"Och andra tassen. Gnugga, gnugga … ren!"* (1:38.7) | Samma på andra tassen (den vänstra redan ren) | `skrubb`, `tindra`, fniss (⚠) | fnissig |
| [13](frames/13.jpg) | 1:46.2 | 7.0 s | Badrummet, halvbild | *"Oj, lite honung är kvar. Björnen vet inte var."* (1:46.5) | Rena tassar, men en gul klick är kvar på nosen. Björnen tittar på tassarna, sedan åt vänster och höger (ögonen, huvudet vänds inte) | frågande brum (⚠) | nyfiken |
| [14](frames/14.jpg) | 1:53.1 | 10.3 s | Närbild ansiktet (klipp) | *"Kan du hjälpa björnen? Kan du se var honungen är?"* (1:53.4) | Den gula klicken på nosen. Paus 5 s; efter ca 3 s skimrar klicken svagt | tyst | nyfiken |
| [15](frames/15.jpg) | 2:03.4 | 4.5 s | Samma | *"Ja, där! Ja, på nosen!"* (2:03.4) | Klicken skimrar tydligt | förtjust brum (⚠), `tindra` | jätteglad |
| [16](frames/16.jpg) | 2:08.0 | 5.4 s | Samma | *"Gnugga, gnugga … ren!"* (2:08.3) | Skumtussen snurrar över nosen (armen når inte dit), björnen blundar. Klicken är borta på *"ren!"* | `skrubb`, fniss (⚠) | blundar, ler |
| [17](frames/17.jpg) | 2:13.4 | 5.7 s | Badrummet, halvbild | *"Oj! Bubblor!"* (2:14.8) | Kritan ritar tre bubblor som flyger långsamt upp och spricker mjukt, en i taget | `pop` × 3, fniss (⚠) | förvånad → jätteglad |
| [18a](frames/18a.jpg) | 2:19.1 | 8.9 s | Samma | *"Nu är du alldeles ren! Kan du klappa händerna?"* (2:19.4) | Alldeles rena tassar, björnen visar dem. Efter frågan: paus 4 s | tyst i pausen | stolt |
| [18b](frames/18b.jpg) | 2:28.0 | 4.1 s | Samma | *"Klapp, klapp, klapp!"* (2:28.0) | Björnen klappar tre lugna klapp (riggens klapp), ett kritstreck-gnistrande per klapp. **Leken (klappa händerna). Shorten slutar här** | `tass-klapp-tre`, fniss (⚠) | jätteglad |
| [19](frames/19.jpg) | 2:32.1 | 6.5 s | Samma | *"Mmm … mjuk handduk."* (2:32.5) | Handduken glider upp framför tassarna och ner igen | mysig suck (⚠) | blundar, ler |
| [20](frames/20.jpg) | 2:38.5 | 5.7 s | Samma | *"Hej då, björnen! Hej då, tvålen!"* (2:38.8) | Björnen vinkar (armen bakom kroppen, snett ut förbi kanten), tvålen ligger på handfatets kant. **Hej då med vinkning** | hej då-brum (⚠) | jätteglad |
| [21](frames/21.jpg) | 2:44.2 | 5.3 s | Samma | *"Hej då! Vi ses snart!"* (2:44.5) | Björnen vinkar klart, armen sjunker | fniss (⚠) | glad |
| [22](frames/22.jpg) | 2:49.5 | 2.5 s | Badrummet → kritirisen | – | Kritirisen drar ihop sig runt björnen och tvålen | – | glad |
<!-- /tabell -->
