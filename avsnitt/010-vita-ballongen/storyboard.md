# Storyboard – Avsnitt 010 · Vita sången

Kort plan innan sången är tagen. Tiderna sätts efter tagningen med `rader.txt` och `storyboard/bygg.py` (kopieras från 007 och byts: lastbilen → ballongen, Bulle → Lage, Ludde → Kajsa, kanelbullsberget → molnberget). **En bild per handling**, högst ett klipp per sjungen rad, ingen text i bilderna, ingen säger det som sjungs.

**Längd:** ca 3:25 (sången ca 3:10 med måsen och det lugna slutet + intro 11 s), under 4 min.

## Kamerainställningar (6, regelns max)
1. Kritan ritar · ljusblått papper
2. Flygscen i himlen · helbild (ballongen på vänstra tredjedelen, molnen glider sakta åt vänster bakom)
3. Närbild Lage i korgen (huvud, tassar och bröst ovanför korgkanten, repen syns uppåt)
4. Bondgården · helbild (tvåbilden och muggarna är närmare utsnitt)
5. Närbild Kajsa med muggen
6. Dansbild · molnberget i refrängen, discot (ljusblått) i danspausen och sista refrängen

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
| 03 | Himlen · zoom in, helbild | Ballongen svävar in från vänster, Pella långt bort | Lage `skrattar` (vinden i manen) | Lejonet flyger … i himlen här! |
| 03b | Närbild Lage | Lage pekar och tittar sig omkring över korgkanten | Lage `nyfiken`, tittar åt höger, sedan åt vänster | Lejonet letar efter vitt, leta med – jag och du! |
| 04 | Dansbild, himlen | Ballonggungningen, tre gungningar | Lage `ropar` på "Vit, vit, vit!", `skrattar` på ekot | Vit, vit, vit! (Vit, vit, vit!) |
| 04a | Molnberget · kritsvep | Ballongen lyfter ett steg per "fsss" | Lage `forvanad` (molnberget dyker upp), sedan `skrattar` | Ballong, ballong – (fsss, fsss!) |
| 04b | Molnberget | Upp längs molnets sida | Lage `nyfiken`, tittar uppåt mot toppen | Upp på stora molnet, (upp, upp!) |
| 04c | Molnberget | Lage hoppar i molnet och studsar tillbaka | Lage `ropar` i hoppet, `skrattar` när han studsar upp | hoppa i det mjuka – puff! |
| 04d | Molnberget | Snöflingor, Lage fångar en | Lage `skelogd` (tittar på flingan på nosen) | Snöflingor dansar – (virvel, virvel!) |
| 04e | Molnberget | Armarna upp | Lage `skrattar` | allt är vitt – hurra! |
| 04f | Molnberget | Fyra fsss | Lage `ropar`, en gång per "fsss" | Fsss, fsss, fsss, fsss – |
| 04g | Molnberget → zoom ut | Tittar ut åt ena hållet och sedan åt andra | Lage `nyfiken` | vad är vitt? Titta ut! |
| 05 | Himlen · helbild | Ballongen stannar vid ett moln | Lage `forvanad` (stora ögon, O-mun) | Vad är vitt? Titta där! |
| 05b | Närbild Lage | Lage blåser, molnet delar sig till tre små | Lage `blaser` (≈ `forvanad`) på varje "puff", `skrattar` när de tre små molnen svävar iväg | Molnet är vitt – puff, puff, puff! |
| 05c | Himlen · helbild | En vit mås glider in och flyger ett varv runt ballongen | Lage `forvanad`, följer måsen med blicken | Vad är vitt? Titta där! |
| 05d | Närbild Lage | Lage flaxar med armarna, måsen flaxar förbi | Lage `skrattar` | Måsen är vit – flax, flax, flax! |
| 06 | Närbild Lage | Lage tittar på tittaren (paus 4–5 s), tittar sedan uppåt och pekar; kameran åker sakta upp längs repen | Lage `nyfiken`, tittar i kameran och sedan uppåt; på slutet av pausen `blinkar` | Vad mer är vitt? Kan du se? |
| 06b | Ballongen · helbild från korgen och uppåt | Den stora vita ballongen, Lage klappar på korgen och den svajar tre gånger | Lage `forvanad` (stora ögon, O-mun) på "Ballongen är vit", `skrattar` på varje "svaj"; gosekaninen guppar | Ballongen är vit – så stor och rund! Svaj, svaj, svaj! |
| 07 | Dansbild + molnberget | Refrängen, likadan som 04–04g | samma uttryck som 04–04g | Refräng |
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
| 12a | Discot | Molnet, måsen, ballongen och mjölken stora på vita skivor och upp i raden runt kulan | Lage `ropar` på varje "vit", Kajsa `forvanad` när skivorna flyger upp | Molnet – vitt! Måsen – vit! Ballong och mjölk – vit, vit, vit! |
| 12b–c | Discot | Ballonggungningen med alla, ballongen poppar upp som femte skiva och hoppar i ett litet moln | alla `skrattar`, Lage `ropar` på "puff!" | Ballong, ballong – upp på stora molnet – puff! |
| 12d | Bondgården · kritsvep, helbild | Full energi: ballongen med Lage (och gosekaninen) i korgen landar mjukt i gräset bredvid Kajsa, båda vinkar hej då | Lage `skrattar`, Kajsa `ropar` | Hej då, hej då – fsss, fsss! |
| 12e | Tvåbilden | **Slutögonblicket** (instrumentalt, musiken tonar ut): Lage gör ett litet mjukt gäsp, tar gosekaninen i famnen, lutar huvudet mot Kajsa och somnar | Lage `gaspar` (litet, inga tänder) → `sover` (≈ `njuter`), Kajsa `karleksfull` och `blinkar` sakta | (ukulele och klockspel) |
| 13 | Kritirisen | Cirkeln sluts långsamt runt Lage som sover mot Kajsa med gosekaninen i famnen, koskällan plingar en gång | Lage `sover`, Kajsa `njuter` (ögonen sluts också) | (valsen tonar ut lugnt och tyst) |

**Strukturen är densamma som 005–007**; bara slutögonblicket skiljer sig: sista raden i vers 3 (de slickar bort mjölkmustascherna i stället för kram) och slutbilden. Danspausen och sista refrängen har full energi ända till och med "Hej då, hej då", där ballongen landar och de vinkar. Först i det instrumentala slutet gäspar Lage litet och somnar mot Kajsa, och musiken tonar ut. Ingen kram och ingen mjölk i slutet. Kritirisen sluts långsammare än vanligt, sedan det vanliga outrot. Ingen ny pose: Lage lutar sig (hela figuren lutas) och blundar (blinkningen hålls).

## Pedagogik
- **Fråga till tittaren:** "Vad mer är vitt?" med 4–5 s paus, sedan visar Lage svaret (ballongen, som syns hela tiden). Inga tänder: stilguiden räknar stora tänder som läskigt.
- **Trygghet:** när ballongen svävar iväg står Lage tryggt på marken; det är den tomma ballongen som flyger, som när ett barn tappar en ballong, och den är kvar i bild tills Kajsa hämtar den.
- **Vardagshandling:** dricka mjölk ur en mugg, "tack" och "varsågod".
- **Verklighetsnära:** ballongen fräser som en riktig gasbrännare, kon säger muu, mjölken kommer från kon. Fantasin (hoppa i molnet) finns bara i refrängen.
- **En sak i taget:** Pella glider förbi bara i 03, innan Lage letar. Molnen bakom står nästan still när molnet delar sig.
