# Storyboard – Avsnitt 010 · Vita sången

Kort plan innan sången är tagen. Tiderna sätts efter tagningen med `rader.txt` och `storyboard/bygg.py` (kopieras från 007 och byts: lastbilen → ballongen, Bulle → Lage, Ludde → Kajsa, kolasåshavet → täckesmolnet, `refrang.js` efter [refrang-plan.md](refrang-plan.md)). **En bild per handling**, högst ett klipp per sjungen rad, ingen text i bilderna, ingen säger det som sjungs.

**Längd:** ca 3:25 (sången ca 3:10 med måsen och det lugna slutet + intro 11 s), under 4 min.

## Kamerainställningar (6, regelns max)
1. Kritan ritar · ljusblått papper
2. Flygscen i himlen · helbild (ballongen på vänstra tredjedelen, molnen glider sakta åt vänster bakom)
3. Närbild Lage i korgen (huvud, tassar och bröst ovanför korgkanten, repen syns uppåt)
4. Bondgården · helbild (tvåbilden och muggarna är närmare utsnitt)
5. Närbild Kajsa med muggen
6. Dansbild · täckesmolnet i refrängen (se [refrang-plan.md](refrang-plan.md)), discot (ljusblått) i danspausen och sista refrängen

## Huvudbilden: Lage i ballongen
Lagren bakifrån: ballongen och repen → Lage (huvud, man, tassar och bröst) och **gosekaninen** bredvid honom (`assets/rekvisita/gosekanin/cut/gosekanin-v4.png`, ansiktet i kod som i 007; den guppar bara med när korgen gungar, säger och gör inget) → korgens framkant. **Korgen är grund så att tassarna syns över kanten** (lärdomen från 007, där Bulles armar försvann i lastbilen). Brännarens lilla gula låga och "fsss" i kod på varje "fsss". Ballongen gungar lätt åt sidan i valstakten men vänds aldrig.

## Bild för bild

**Uttryck** står med namnet ur `HUMÖR` i `verktyg/ansikten.py` (samma namn i scenernas `ansikten.js`), ett per figur i bild, och byts på takten. *Gosekaninen* har sitt eget lilla ansikte i kod och ler alltid (den är pynt). Tre uttryck saknas och står under "Behöver skapas" i README: **gaspar** (ett litet, mjukt gäsp med munnen nästan stängd, inga tänder), **blaser** (runda kinder, liten rund mun) och **sover** (ögonen stängda, lugn andning). Tills de finns: gaspar ≈ `njuter` med en liten O-mun, blaser ≈ `forvanad`, sover ≈ `njuter`. Inga synliga tänder någonstans.

| # | Plats · kamera | Bild | Uttryck | Sång / repliker |
|---|---|---|---|---|
| 01 | Intro (fast) | Logotypen ritas, kritsvep, titelkortet *Avsnitt 10 · Vita sången* | – | – |
| 02 | Kritan ritar | En rund vit form på ljusblått papper | – | Kritan ritar … |
| 02b | Kritan ritar | Repen och korgen, sedan flaggan (paus 4–5 s) | – | vad kan det vara? Vad kan det vara? |
| 02c | Kritan ritar | Brännaren fräser, ballongen lyfter ur bilden | – | En ballong! En vit ballong! Fsss – nu flyger vi! |
| 03 | Himlen · zoom in, helbild | Ballongen svävar in från vänster, Pella långt bort, brännaren fräser två gånger | Lage `skrattar` (vinden i manen) | Lejonet flyger i sin vita ballong – (fsss, fsss!) |
| 03a | Närbild Lage | Lage gosar med kinden mot ballongens rep | Lage `njuter` på "mjukt", `blinkar` på "Mmm!" | Lejonet tycker vitt är mjukt! (Mmm!) |
| 03b | Närbild Lage | En vit kudde poppar upp som klistermärke, Lage klappar den mjukt två gånger | Lage `forvanad` när kudden kommer, `karleksfull` när han klappar | Kudden är vit – (mjuk, mjuk!) |
| 03c | Närbild Lage | En maskrosboll poppar upp bredvid kudden, Lage klappar den mjukt två gånger | Lage `forvanad` → `njuter` | Fjunet är vitt – (mjukt, mjukt!) |
| 03d | Närbild Lage | Lage pekar och tittar sig omkring över korgkanten | Lage `nyfiken`, tittar åt höger, sedan åt vänster | Lejonet letar efter vitt, leta med – jag och du! |
| 04 | Refrängen · himlen, halvbild | Ballonggungningen: Lage gungar åt ena sidan och sedan åt andra, ett vitt fjun virvlar förbi per "vit" (bild 1 i [refrang-plan.md](refrang-plan.md)) | Lage `ropar` på "Vit, vit!", `skrattar` på ekot; gosekaninen guppar | Vit, vit! (Vit, vit!) |
| 04a | Himlen · kameran följer | Brännaren fräser två gånger, ballongen stiger, molnen glider ihop under den (vit molnövergång) | Lage `forvanad` (täcket växer fram), sedan `nyfiken`, tittar ner | Ballong, ballong – (fsss, fsss!) |
| 04b | Täckesmolnet · helbild | Ballongen landar och sjunker in, två mjuka gungningar | Lage `njuter` | Landa på molnet – (mjukt, mjukt!) |
| 04c | Täckesmolnet · halvnära | **Det busiga:** Lage hoppar ur och sjunker ner tills bara öronen syns, puffar upp två gånger, luddtussar puffar runt honom; gosekaninen sjunker och puffar upp bredvid | Lage `forvanad` när han sjunker, `skrattar` på varje "puff" | Sjunka ner – (puff, puff!) |
| 04d | Täckesmolnet · kameran andas in | Lage blåser två gånger på en maskrosboll, fjunet yr runt och dalar | Lage `blaser` (≈ `forvanad`) på varje "fff", sedan `skelogd` (följer ett fjun som landar på nosen) | Fjunet flyger – (fff, fff!) |
| 04e | Täckesmolnet · närbild | Lage lägger kinden mot molnet två gånger | Lage `njuter` | Mjukt som ett täcke – (mmm, mmm!) |
| 04f | Täckesmolnet · halvnära | **Refrängens ögonblick:** kudden puffar upp ("Vit"), maskrosbollen landar ("mjukaste"), måsen glider in och landar ("färgen"); på "Mmm!" kramar Lage sig själv och små luddtussar stiger | Lage `forvanad` för varje sak som kommer, `karleksfull` på "Mmm!" (kramar sig själv) | Vit är den mjukaste färgen! (Mmm!) |
| 04g | Närbild brännaren | Lage tillbaka i korgen, lågan fräser två gånger, ekot två till, ballongen lyfter ur molnet | Lage `ropar` på "Fsss, fsss!", `skrattar` på ekot | Fsss, fsss! (Fsss, fsss!) |
| 04h | Helbild → kritsvep | Kameran drar ut, Lage spanar åt båda hållen med tassen över ögonen, kritsvep i himmelsblått hem till himlen | Lage `nyfiken` | Vad är vitt? Titta ut! |
| 05 | Himlen · helbild | Ballongen stannar vid ett moln | Lage `forvanad` (stora ögon, O-mun) | Vad är vitt? Titta där! |
| 05b | Närbild Lage | Lage blåser, molnet delar sig till tre små | Lage `blaser` (≈ `forvanad`) på varje "puff", `skrattar` när de tre små molnen svävar iväg | Molnet är vitt – puff, puff, puff! |
| 05c | Himlen · helbild | En vit mås glider in och flyger ett varv runt ballongen | Lage `forvanad`, följer måsen med blicken | Vad är vitt? Titta där! |
| 05d | Närbild Lage | Lage flaxar med armarna, måsen flaxar förbi | Lage `skrattar` | Måsen är vit – flax, flax, flax! |
| 06 | Närbild Lage | Lage tittar på tittaren (paus 4–5 s), tittar sedan uppåt och pekar; kameran åker sakta upp längs repen | Lage `nyfiken`, tittar i kameran och sedan uppåt; på slutet av pausen `blinkar` | Vad mer är vitt? Kan du se? |
| 06b | Ballongen · helbild från korgen och uppåt | Den stora vita ballongen, Lage klappar på korgen och den svajar tre gånger | Lage `forvanad` (stora ögon, O-mun) på "Ballongen är vit", `skrattar` på varje "svaj"; gosekaninen guppar | Ballongen är vit – så stor och rund! Svaj, svaj, svaj! |
| 07 | Himlen → täckesmolnet → kritsvep till bondgården | Refrängen, likadan som 04–04h (kritsvepet hem leder här vidare till bondgården) | samma uttryck som 04–04h | Refräng |
| 08 | Bondgården · kritsvep, helbild | Ballongen sjunker ner på gräset, Kajsa vid staketet | Lage `forvanad` (mjölken!), Kajsa `nyfiken` (tittar upp mot ballongen) | Vad är vitt? Titta där! |
| 08b | Närbild Kajsa | Kajsa håller fram den blå muggen | Kajsa `glad` → `ropar` på "Muu!" | Muu! Hej, Lage! Vill du ha mjölk? |
| 08c | Tvåbilden | Lage kliver ur korgen och ställer sig i gräset (gosekaninen bredvid honom), "Ja, tack!", "Varsågod!", "Tack!" | Lage `ropar` "Ja, tack!", Kajsa `karleksfull` "Varsågod!", Lage `karleksfull` "Tack!" | lucka med repliker |
| 08d | Närbild Lage | Dricker, en klunk per "glugg" | Lage `njuter` (ögonen stängda), `slickar` efter sista klunken | Mjölken är vit – glugg, glugg, glugg! |
| 09 | Helbild | Lage står i gräset med muggen. Den **tomma** ballongen lyfter, repet släpar (som när ett barn tappar sin ballong) | Lage `forvanad`, Kajsa `forvanad` | Oj, oj! Ballongen flyger! |
| 09b | Helbild | Ballongen stiger, mindre för varje "bort", kvar i bild | Lage och Kajsa `nyfiken`, tittar uppåt efter den | Repet glider … bort, bort, bort … |
| 09c | Närbild Lage | Tittar upp med muggen i tassen | Lage `ledsen` med en liten tår (bara här) | Lejonet är ledset – snyft, snyft, snyft. |
| 09d | Närbild Lage | Tittar på tittaren (tyst takt) | Lage `nyfiken`, tittar i kameran | Vem kan hjälpa? |
| 10 | Helbild | Kajsa kliver på repet, ballongen stannar och gungar | Kajsa `ropar` på "stopp!", Lage `forvanad` | Kon! Kajsa kliver på repet – stopp! |
| 10a | Närbild Kajsa | Kajsa muar, en gång per "muu" | Kajsa `skrattar` | Kajsa hjälper, muu, muu, muu! |
| 10b | Tvåbilden | Kajsa drar försiktigt i repet och ballongen sjunker tillbaka ner bredvid Lage; Lage vinkar tack (koskällan plingar) | Lage `karleksfull`, Kajsa `karleksfull` | Ballongen kommer hem – tack, tack, tack! |
| 10c | Tvåbilden | En mugg var, de dricker | Lage `njuter`, Kajsa `slickar` (mums) | En mugg var – till dig och mig! |
| 10d | Tvåbilden | Två vita mjölkmustascher som de slickar bort, en gång per "slick" | Lage `slickar`, Kajsa `slickar`, sedan båda `skrattar` | Vit mustasch – slick, slick, slick! |
| 11a | Discot (ljusblått) | Alla dansar | Lage `skrattar`, Kajsa `skrattar` | Danspaus! (Danspaus!) |
| 11b | Discot | Pip hoppar, de andra gungar | Pip `ropar`, Lage och Kajsa `skrattar` | Hoppa, hoppa! |
| 11c | Discot | Humle surrar ett varv | Humle `skrattar`, Lage `skelogd` (följer henne med blicken) | Surra runt! |
| 11d | Discot | Hulda stampar | Hulda `ropar`, Kajsa `skrattar` | Stampa, stampa! |
| 11e | Discot | Alla dansar | alla `skrattar` | Alla dansar – vita dansen! |
| 12a | Discot | Molnet, måsen och mjölken stora på vita skivor (på ljusblå väggen) och upp i raden runt kulan, en per ord | Lage `ropar` på varje sak, Kajsa `forvanad` när skivorna flyger upp | Molnet, måsen, mjölken – vita! (Vita!) |
| 12b | Discot | Alla kramar sig själva och gungar, små vita luddtussar stiger från golvet | alla `karleksfull`, Lage `ropar` på "Mmm!" | Vit är den mjukaste färgen! (Mmm!) |
| 12c | Discot | Ballonggungningen med alla, ballongen poppar upp som fjärde skiva, brännaren fräser två gånger per rad | alla `skrattar`, Pip och Humle `ropar` på "fsss" | Ballong, ballong – (fsss, fsss!) ×2 |
| 12d | Bondgården · kritsvep, helbild | Full energi: ballongen med Lage (och gosekaninen) i korgen landar mjukt i gräset bredvid Kajsa, båda vinkar hej då | Lage `skrattar`, Kajsa `ropar` | Hej då, hej då – fsss, fsss! |
| 12e | Tvåbilden | **Slutögonblicket** (instrumentalt, musiken tonar ut): Lage gör ett litet mjukt gäsp, tar gosekaninen i famnen, lutar huvudet mot Kajsa och somnar | Lage `gaspar` (litet, inga tänder) → `sover` (≈ `njuter`), Kajsa `karleksfull` och `blinkar` sakta | (ukulele och klockspel) |
| 13 | Kritirisen | Cirkeln sluts långsamt runt Lage som sover mot Kajsa med gosekaninen i famnen, koskällan plingar en gång | Lage `sover`, Kajsa `njuter` (ögonen sluts också) | (valsen tonar ut lugnt och tyst) |

**Strukturen är densamma som 005–007**; bara slutögonblicket skiljer sig: sista raden i vers 3 (de slickar bort mjölkmustascherna i stället för kram) och slutbilden. Danspausen och sista refrängen har full energi ända till och med "Hej då, hej då", där ballongen landar och de vinkar. Först i det instrumentala slutet gäspar Lage litet och somnar mot Kajsa, och musiken tonar ut. Ingen kram och ingen mjölk i slutet. Kritirisen sluts långsammare än vanligt, sedan det vanliga outrot. Ingen ny pose: Lage lutar sig (hela figuren lutas) och blundar (blinkningen hålls).

## Pedagogik
- **Fråga till tittaren:** "Vad mer är vitt?" med 4–5 s paus, sedan visar Lage svaret (ballongen, som syns hela tiden). Inga tänder: stilguiden räknar stora tänder som läskigt.
- **Trygghet:** när ballongen svävar iväg står Lage tryggt på marken; det är den tomma ballongen som flyger, som när ett barn tappar en ballong, och den är kvar i bild tills Kajsa hämtar den.
- **Vardagshandling:** dricka mjölk ur en mugg, "tack" och "varsågod".
- **Verklighetsnära:** ballongen fräser som en riktig gasbrännare, kon säger muu, mjölken kommer från kon. Fantasin (sjunka ner i täckesmolnet) finns bara i refrängen.
- **En sak i taget:** Pella glider förbi bara i 03, innan Lage letar. Molnen bakom står nästan still när molnet delar sig.
