# Bildlista – Avsnitt 005

Det fasta (intro, outro, papper, kritsvep, ljud) finns redan i `assets/format/` och listas inte här. Det som redan fanns före avsnittet står inom parentes.

| # | Typ | Vad | Ny? | Klar |
|---|---|---|---|---|
| 1 | Titelkort | Avsnitt 5 · Rosa sången (stillbilden i storyboarden: `intro/stills/7.0.jpg`) | ny text | ☑ |
| 2 | Bakgrund | (Vägen, `assets/bakgrunder/vagen/`) | finns | ☑ |
| 3 | Bakgrund | (Glasskiosken, `assets/bakgrunder/glasskiosken/`), spegelvänd i kod så att kiosken står till höger. Väggen omfärgas i kod från rosa till himmelsblå `#8FCBEB` (kritstrukturen kvar), så att den rosa bilen och glassen syns; ingen ny bild | finns | ☑ |
| 4 | Lager | Buske med rosa blommor (`assets/bakgrunder/vagen-saker/buske-rosa.png`) | ny | ☑ |
| 5 | Lager | Rosa ballong (`assets/bakgrunder/vagen-saker/ballong-rosa.png`) | ny | ☑ |
| 6 | Figur | Musen Mille som klot med rosett: referensark, delar och rigg (`assets/karaktarer/musen-mille/`). Armar och ben ritas i kod (`verktyg/rita-lemmar-mus.py`), ansiktet i kod (`verktyg/ansikten.py`) | ny | ☑ |
| 7 | Figur | (Grodan Gurra, `assets/karaktarer/grodan-gurra/`), ansiktet i kod som i 004 | finns | ☑ |
| 8 | Sak | **Rosa bilen**, den enkla i husstil: öppen, utan ansikte, kaross, kant och hjul (`assets/rekvisita/rosa-bilen/`, rigg i `rosa-bilen-rigg.json`). Ingen ratt: riggens `ratt.png` används inte, tassarna vilar på bilens kant | ny | ☑ |
| 9 | Sak | **Jordgubbsglass**, rosa kula i en strut (`assets/rekvisita/jordgubbsglass.png`). Glassberget med två rosa kulor är en egen bild (`assets/rekvisita/cut/jordgubbsglass-glassberg.png`). Den tomma struten, kulan i golvet och den gula och den gröna glassen görs i kod av den vanliga glassen | ny | ☑ |
| 10 | Pose | Musen sitter i bilen (`assets/karaktarer/musen-mille/i-bilen/`, i bilens 1024-rutnät) | ny | ☑ |
| 11 | Pose | Grodan i kioskfönstret: grodans vanliga utklipp bakom diskens främre lager, i kod | ny i kod | ☑ |
| 12 | Statister | (Kaninen Kanel, Humlan Humle, `assets/karaktarer/`), i danspausen: befintliga utklipp och riggar, ansiktena i kod som i 004. Humlans vingar ur riggen bakom kroppen | finns | ☑ |
| 13 | Statist | **Dinon Disa**, ny lila dino (`karaktarer/dinon-disa.md`, `assets/karaktarer/dinon-disa/` med rigg). Ansiktet i kod, ögon och mun uppmätta | ny | ☑ |
| 13b | Bakgrund | **Discot** (`assets/bakgrunder/danspaus/danspaus.png`, kulan i `cut/discokula.png`): enfärgad ljusrosa med en rosa discokula i mitten upptill. Blommorna i humlans solobild klipps ur `buske-rosa.png`, ballongen i kaninens är `ballong-rosa.png` | ny | ☑ |
| 14 | Pose | Musen står på golvet vid kioskens disk och i discot på sina egna ben (lemmarna i kod, samma som referensarket); grodan med benen ur riggen | finns i kod | ☑ |
| 14b | Bakgrund | Refrängens rosa blixt: discots plåt omfärgad i kod till klarrosa `#F06EAA` och ljusrosa `#F7B6D2`; bilen får en mörkrosa kritkontur `#C2457F` i blixten | i kod | ☑ |
| 14c | Bakgrund | **Glassberget** (`assets/bakgrunder/glassberget/glassberget.png`, toppen som eget lager i `cut/glassberget-topp.png`): ett jättestort berg av jordgubbsglass mot ljusblå himmel, till refrängens rad 6 (05d, 09d, 15e). Se `bakgrunder/glassberget.md` | ny | ☑ |
| 14d | Sak | **Rosa flagga** på en trästång (`assets/rekvisita/flagga-rosa.png`, utklippet i `cut/flagga-rosa.png`), som musen sätter ner på toppen av glassberget. Fladdret görs i kod (en lätt skjuvning av utklippet) | ny | ☑ |
| 14e | Mönster | Musen blir fler i refrängens rad 4–5 (05c/c2, 09c/c2): samma bil och mus renderade en gång och kopierade, ingen ny bild | i kod | ☑ |
| 15 | Saknas | Grodans blå fluga finns inte i utklippen (se `karaktarer/grodan-gurra.md`). Storyboarden visar grodan utan den | ny bild om flugan ska synas | ☐ |

Sakerna finns i [`rekvisita/rosa-bilen.md`](../../rekvisita/rosa-bilen.md) och [`rekvisita/jordgubbsglass.md`](../../rekvisita/jordgubbsglass.md).

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild
3. Närbild musen i bilen
4. Glasskiosken · helbild (glider upp till den stora struten i 11a, platsens enda panorering). Tvåbilden i vers 2 (13a–14e) är ett närmare utsnitt av samma helbild, ingen ny inställning
5. Närbild grodan i kioskfönstret
6. Dansbild · refrängen på vägen och danspausen i discot
