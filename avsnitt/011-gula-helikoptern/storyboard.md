# Storyboard – Avsnitt 011 · Gula sången

Kort första utkast, bild för bild, innan sången finns. Tiderna sätts när `sang.m4a` och `rader.txt` finns (som i 007, med `storyboard/bygg.py`). Räkna med **≈3:10–3:20** med introt (11 s), under 4 min.

**En bild per handling**, högst ett klipp per sjungen rad, närbilder 1,5–2,5 s, **ingen text i bilderna**, **ingen säger det som sjungs**: Lage gör radens rörelse i bild. Högst en sak rör sig i bakgrunden åt gången. Helikoptern flyger alltid åt höger och vänds aldrig; bara rotorn snurrar.

## Kamerainställningar (6)
1. Kritan ritar · papper
2. Himlen · helbild (helikoptern på vänstra tredjedelen, molnen glider åt vänster)
3. Närbild Lage i helikoptern (huvud, man och armar över kanten)
4. Dammen · helbild (tvåbilden och näckrosbladen som utsnitt)
5. Närbild Kajsa med hatten
6. Dansbild · refrängen (första raden på himlen, sedan jättesolrosen) och danspausen (discot)

## Bild för bild

**Ansikten** ritas i kod med humören i `verktyg/ansikten.py` (`HUMÖR`) och scenernas `ansikten.js`. Kolumnen *Ansikten* ger ett humör per figur i bild, och det byter på takten (`→` = byte mitt i bilden). Stora och tydliga: **forvanad** när en gul sak dyker upp, **nyfiken** när någon letar, **ropar** på ekot och refrängens rop, **skrattar** i dansen, **slickar/njuter** när de äter, **ledsen** (med en liten tår) bara på snyftraden, **karleksfull** när de tackar och delar. Helikoptern har inget ansikte. Två humör saknas och står under "Behöver skapas" i README (*gaspar*, *anstranger*); tills de finns används det som står inom parentes.

| # | Plats · kamera | Bild | Ansikten | Sång / replik |
|---|---|---|---|---|
| 01 | Intro | Logotyp, kritsvep, titelkort *Avsnitt 11 · Gula sången* (citronljus vägg, liten gul helikopter) | – | – |
| 02 | Papper | Kritan ritar en gul rund bubbla, sedan svansen | – | Kritan ritar … vad kan det vara? |
| 02b | Papper | Pausen 4–5 s: medarna, sist rotorn | – | *(paus)* |
| 02c | Papper → zoom in | Rotorn börjar snurra, helikoptern lyfter; Lage dyker upp i sitsen | Lage: forvanad → skrattar | En helikopter! … Flapp-flapp, nu flyger vi! |
| 03 | Himlen · helbild | Helikoptern flyger in, molnen glider; Pella pyttelitet långt bort | Lage: njuter (vinden i manen) | Lejonet flyger sin gula helikopter |
| 03b | Närbild Lage | Lage tittar ut åt sidorna, tassen över ögonen | Lage: nyfiken (tittar vänster → höger) → blinkar mot tittaren på "jag och du" | Lejonet letar efter gult, leta med |
| 04 | Himlen · dansbild | Solstrålen: Lage sträcker ut tassarna tre gånger, helikoptern gungar | Lage: ropar (på varje "gul") | Gul, gul, gul! *(Gul, gul, gul!)* |
| 04a | Jättesolrosen | Kritsvep; helikoptern flyger in vid stjälken | Lage: skrattar | Helikopter – *(flapp, flapp!)* |
| 04b | Jättesolrosen | Stiger längs stjälken, ett lyft per "upp" | Lage: forvanad (tittar upp mot blomman) | Upp till stora blomman, *(upp, upp!)* |
| 04c | Jättesolrosen | Båge över blomman, glider ner på "vii" | Lage: skrattar → ropar på "vii" | runt och runt och runt – vii! |
| 04d | Jättesolrosen | Kritan ritar tre kronblad | Lage: nyfiken (följer kritan) → forvanad på "tre" | Kritan ritar blad – *(ett, två, tre!)* |
| 04e | Jättesolrosen | Himlen glöder citronljus, armarna upp | Lage: ropar | allt är gult – hurra! |
| 04f | Jättesolrosen | Rotorn fyra varv | Lage: skrattar | Snurr, snurr, snurr, snurr – |
| 04g | Jättesolrosen → zoom ut | Pekar åt ena hållet, sedan det andra | Lage: nyfiken | vad är gult? Titta ut! |
| 05 | Himlen · helbild | Solen glider fram bakom ett moln | Lage: nyfiken → forvanad när solen syns | Vad är gult? Titta där! |
| 05b | Närbild Lage | Blundar mot solen och fläktar sig, en gång per "varm" | Lage: njuter | Solen är gul – varm, varm, varm! |
| 05c | Himlen · helbild | Ett surr hörs, Humle tittar fram bakom ett moln | Lage: nyfiken (lyssnar, tittar mot molnet) → forvanad · Humle: blinkar (titt fram) | Vad är gult? Titta där! |
| 05d | Himlen · helbild | Humle surrar förbi i en lugn båge, Lage vinkar | Lage: skrattar · Humle: skrattar, vinkar tillbaka | Humlan är gul – surr, surr, surr! |
| 06 | Närbild Lage | Lage tittar in i kameran, pekar ut mot tittaren | Lage: nyfiken | Vad mer är gult? Kan du se? |
| 06b | Närbild Lage | Pausen 4–5 s: svansen med den bruna tofsen guppar upp bakom sitsen, kameran åker in mot Lage | Lage: nyfiken (tittar ner på sig själv) → skelogd (kisar mot tofsen) | *(paus)* |
| 06c | Närbild Lage | Lage pekar på sin gula mage, svansen syns över bakkanten | Lage: forvanad → skrattar | Lejonet är gult – och svansen med! |
| 06d | Himlen · helbild | Svansen viftar tre gånger över helikopterns bakkant, en per "vifta"; Lage vänds inte | Lage: skrattar → blinkar mot tittaren | Vifta, vifta, vifta! |
| 07 | Himlen / jättesolrosen | Refrängen, samma bilder och ansikten som 04–04g | som 04–04g | refrängen |
| 08 | Kritsvep (turkos) → Dammen · helbild | Fia fladdrar förbi över dammen; sedan sänker sig helikoptern uppe till höger | Fia: glad · Lage: nyfiken (tittar ner) · Kajsa: nyfiken (tittar upp) | Vad är gult? Titta där! |
| 08b | Närbild Kajsa | Kajsa i solhatten vinkar upp mot helikoptern | Kajsa: skrattar | Hatten är gul – vinka, vinka! |
| 08c | Dammen · tvåbild | Helikoptern svävar lågt, motorn går; Kajsa håller fram korgen | Lage: ropar på "Rrroar" → (gaspar, tills vidare: njuter) → skrattar · Kajsa: skrattar → karleksfull på "Varsågod" · Lage: karleksfull på "Tack" | LAGE: Rrroar! Hej, Kajsa! KAJSA: Muu! Hej, Lage! Vill du ha en banan? LAGE: Ja, tack! KAJSA: Varsågod! LAGE: Tack! |
| 09 | Dammen · tvåbild | Vita vindvirvlar under rotorn, hatten lyfter från Kajsas huvud | Kajsa: forvanad · Lage: forvanad | Oj, oj! Det blåser! *(Åh nej!)* |
| 09b | Dammen · helbild | Hatten seglar ut över vattnet i en båge | Kajsa: forvanad (följer hatten med blicken) · Lage: skelogd (förvirrad, tittar efter hatten) | Hatten flyger – vind, vind, vind |
| 09c | Dammen · utsnitt | Hatten landar på ett näckrosblad, liten plopp-ring i vattnet | (inga ansikten i bild) | ut i dammen – plopp! |
| 09d | Närbild Kajsa | Kajsa ledsen, en liten tår | Kajsa: ledsen | Kossan är ledsen – snyft, snyft. |
| 09e | Närbild Lage | Lage trycker på knappen, rotorn snurrar långsamt till stopp | Lage: ledsen → forvanad när rotorn stannar | Lejonet stänger av – stopp! |
| 09f | Dammen · helbild | Lage och Kajsa tittar ut mot hatten; i den tysta takten tittar Gurras ögon upp ur vattnet vid kanten (ledtråd) | Lage: nyfiken · Kajsa: nyfiken · Gurra: blinkar | Vem kan hjälpa? *(tyst takt)* |
| 10 | Dammen · utsnitt | Gurra hoppar upp på första bladet | Gurra: ropar · (i kanten) Kajsa: forvanad | Grodan! *(Grodan!)* |
| 10b | Dammen · utsnitt | Blad till blad, ett hopp per "hoppa" | Gurra: skrattar | Hoppa, hoppa – blad till blad |
| 10c | Dammen · tvåbild | Gurra knuffar bladet med hatten till kanten, Kajsa sätter på sig hatten; KAJSA: Tack, Gurra! | Gurra: (anstranger, tills vidare: skelogd) på knuffen → skrattar · Kajsa: forvanad → karleksfull på "tack" · Lage: karleksfull | hämtar hatten – tack, tack, tack! |
| 10d | Dammen · tvåbild | Kajsa skalar bananen och delar i tre bitar, alla äter; Lage slickar sig om munnen med tungan (slurp) | Kajsa: karleksfull (delar) → njuter · Lage: slickar · Gurra: njuter | Kossan skalar – en bit var! |
| 10e | Dammen · helbild | Solen glider fram; alla tre sida vid sida framifrån, tre lugna hopp i takt, skuggorna krymper när de lyfter, armarna upp på "jippi"; ingen snurrar eller vänder sig | Alla tre: skrattar på hoppen → ropar på "jippi" (slutögonblicket för berättelsen) | Hopp, hopp, hopp i solen – jippi! |
| 11 | Discot (ljusgult, gul kula) | Alla dansar | Alla: skrattar | Danspaus! |
| 11b | Discot | Humle surrar runt (de andra gungar i takt) | Humle: ropar · de andra: skrattar | Surra runt! |
| 11c | Discot | Gurra hoppar | Gurra: skelogd (tokig) · de andra: skrattar | Hoppa, hoppa! |
| 11d | Discot | Pip pickar (ingen vänds runt) | Pip: ropar · de andra: skrattar | Picka, picka! |
| 12 | Discot | Solen, humlan, hatten stora på var sin vit kritskiva, flyger upp i raden runt kulan | (inga figurer) | Solen, humlan, hatten – gul! |
| 12b | Discot | Solstrålen med alla | Alla: ropar | Gul, gul, gul! |
| 12c | Discot | Lage i helikoptern gungar per "flapp", helikoptern poppar upp som fjärde småbild | Lage: skrattar | Helikopter – flapp, flapp! |
| 12d | Discot | Lage i mitten vinkar | Lage: blinkar mot tittaren → karleksfull | Hej då, hej då – flapp, flapp! |
| 13 | Kritirisen | Vinglig cirkel sluts runt Lage, sedan outrot | Lage: karleksfull (slutögonblicket) | – |

## Kontroll mot `format/regler.md`
- [x] 3 figurer (Lage, Kajsa, Gurra), 2 platser (Himlen, Dammen); jättesolrosen och discot är dansvärldar som i 005–007
- [x] 2 nya saker (helikoptern, solhatten); bananen, korgen och solen finns
- [x] 1 ny pose per figur (Lage i helikoptern, Kajsa skalar)
- [x] 2 statister (Humle, Pip), båda finns
- [x] Kritsvep vid platsbytet, zoom in efter kritan ritar
- [x] En fråga till tittaren med paus 4–5 s, och ledtråd i pausen
- [x] Vardagshandling (stänga av motorn, skala bananen) och tack/varsågod
- [x] Sången går att klippa ut som Short (refrängen eller intro + vers 1 + refräng, ca 45 s)
- [ ] `harriets-favoriter.md` uppdateras av huvudsessionen (se [att-lagga-till.md](att-lagga-till.md))
- Avvikelse som i 005–007: slutet är kritirisen i discot, inte zoom ut.
