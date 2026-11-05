# Storyboard – Avsnitt 014 · Gröna sången

**Kort utkast före sången.** Bild för bild som i 006 och 007, men utan tider: de kommer ur `rader.txt` när `sang.m4a` finns, och då byggs den riktiga storyboarden med `storyboard/bygg.py` (kopierad från 007). Avsnittstid = sångtid + 11 s (introt före). Mål ≈ 3:00–3:30.

**En bild per handling**, högst ett klipp per sjungen rad, **ingen text i bilderna**, **ingen säger det som sjungs**: Lova gör radens rörelse i bild. Närbilder 1,5–2,5 s, i snitt minst 3 s per bild.

**Slutet som i 005–007 (17), med ett eget slutögonblick:** sista raden i vers 3 är trafikljuset vid övergångsstället som slår om till grönt, *"Grönt! Nu kör vi!"* (14g). Över *"Hej då, hej då"* i sista refrängen tuffar traktorn ut ur bild från busshållplatsen (16d), och kritirisen sluter sig runt Pip som vinkar (17). Ingen kram. Ingen zoom ut och inget fast outro, samma avvikelse från `format/intro-outro.md` som förut.

| Grön sak | Sjungs | Lova i bild |
|---|---|---|
| Grodan (06) | *hopp, hopp, hopp!* | Gurra hoppar över vägen framför traktorn, Lova studsar i sätet per hopp |
| Trafikljuset (07a–c) | *Vänta, vänta … kör, kör, kör!* | lampan lyser rött i bild (sjungs inte), tassen upp och sitter stilla, pumpar armarna när det blir grönt |
| Jackan och flaggan (08a–c) | *Zipp, zipp, zipp!* | drar upp dragkedjan, pekar på flaggan |
| Ärtorna (11b, 14d–f) | *en, två, tre!* | räknar på tassen; en ärta var och mums |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (traktorn på vänstra tredjedelen, vägen glider, ljusblå vägg)
3. Närbild Lova i traktorn (huvud, jacka och armar, traktorns kant längst ner)
4. Busshållplatsen · helbild (tvåbilden är ett närmare utsnitt; 13c–14b ett lågt utsnitt vid bänken)
5. Närbild Pip på bänken med ärtskidan
6. **Dansbild** · refrängen (på vägen, som i 006) och danspausen (i discot, mint)

## Uttryck

Ansiktena ritas i kod med humören i `verktyg/ansikten.py` (`HUMÖR`) och scenernas `ansikten.js`. Kolumnen **Uttryck** har ett humör per figur i bild, i takt: `→` betyder att uttrycket byter på nästa slag eller rad. Stora och tydliga uttryck: `forvanad` (stora ögon, O-mun) när en grön sak dyker upp, `nyfiken` när någon letar, `ropar` på ekot och refrängens rop, `skrattar` i dansen, `slickar`/`njuter` när de äter, `ledsen` (en liten tår) bara på snyftraden, `karleksfull` när de tackar och delar. `glad` bara där inget annat passar. Kompisen och statisterna reagerar alltid. Inget läskigt, inga arga ansikten.

**Refrängdansen (05a–h, 09a–h, 16b–c), samma varje gång:**

| Rad | Lova |
|---|---|
| Grönt! *(Grönt!)* ×2 | `ropar` på rösten → `skrattar` på ekot |
| Grönt betyder kör! | `ropar` och pekar framåt |
| Grönt! *(Grönt!)* ×2 | `ropar` → `skrattar` |
| Grön som en liten ärta! | `forvanad` när bubblan poppar → `karleksfull` när hon ritar cirkeln (ärtan i bubblan `blinkar`) |
| Putt, putt, tut, tut – | `skelogd` på "putt, putt" → `ropar` på "tut, tut" |
| vad är grönt? Titta ut! | `nyfiken` åt ena hållet → `nyfiken` åt andra (blicken följer tassen) |

## Bild för bild

| # | Plats · kamera | Bild | Uttryck | Ljud / repliker | Sång |
|---|---|---|---|---|---|
| 01 | Intro | logotypen, kritsvep, titelkortet (lila vägg, en liten grön traktor) | – | introjingeln | – |
| 02 | Papper | kritan ritar ett stort grönt hjul | – | skrrrrt | Kritan ritar … |
| 02b | Papper | litet hjul, rund kropp, avgasrör som puffar | – | skrrt | vad kan det vara? (paus) |
| 02c | Papper | traktorn skumpar till | – (traktorn har inget ansikte) | tut-tut | En traktor! … nu kör vi! |
| 03 | Zoom in → Vägen · helbild | traktorn kör in från vänster, Pella långt bort på himlen | Lova `skrattar` → `glad` när vägen börjar glida | putt, putt | Vers 1 |
| 04 | Närbild Lova | Lova vinkar till tittaren, den gröna jackan syns | Lova `blinkar` mot tittaren → `nyfiken` på "letar grönt" → `ropar` på "jag och du!" | | leta med – jag och du! |
| 05a–h | Dansbild | refrängdansen, ärtbubblan på "Grön som en liten ärta", grön lampa i hörnet på "kör" | se Refrängdansen ovan | tut, tut | Refräng |
| 06 | Vägen · helbild | Gurra hoppar över vägen, tre hopp, traktorn bromsar mjukt | Lova `nyfiken` på "Titta där!" → `forvanad` när Gurra hoppar fram → `skrattar` per hopp · Gurra `skrattar` i luften, `skelogd` när han landar på sista hoppet | hopp ×3 | Grodan är grön |
| 07a | Vägen · helbild | trafikljuset glider in och lyser rött (bara i bild); traktorn stannar | Lova `nyfiken` på "Titta där!" → `forvanad` när lampan syns | gnissel | Vad är grönt? Titta där! |
| 07b | Närbild Lova | tassen upp, sitter stilla, tittar upp på den röda lampan | Lova `nyfiken` (blicken upp mot lampan), håller still; på andra "vänta" en liten `blinkar` mot tittaren | (tyst takt) | Vänta, vänta … |
| 07c | Vägen · helbild | pling, grönt; traktorn kör, Lova pumpar armarna | Lova `forvanad` på pling → `ropar` på varje "kör" | pling, putt | Lampan är grön – kör, kör, kör! |
| 08a | Närbild Lova | Lova tittar ner på jackan (ledtråd), kameran åker in | Lova `nyfiken` mot tittaren på frågan → `nyfiken` ner mot jackan i pausen | | Vad mer är grönt? Kan du se? (paus 4–5 s) |
| 08b | Närbild Lova | pekar på jackan, sedan på flaggan | Lova `forvanad` på "Jackan" → `skrattar` på "flaggan med!" | | Jackan är grön … |
| 08c | Närbild Lova | drar upp dragkedjan i tre ryck | Lova `njuter` (stolt, ögonen stängda) per ryck → `blinkar` på sista "zipp" | zipp ×3 | Zipp, zipp, zipp! |
| 09a–h | Dansbild | refrängdansen igen, likadan | se Refrängdansen ovan | | Refräng |
| 10 | Kritsvep (lila) → Busshållplatsen · helbild | traktorn kör in och stannar vid bänken. Pip och Gurra sitter på bänken (Gurra har hoppat i förväg). Vid övergångsstället står **samma trafikljus** och lyser rött; det syns i bakgrunden i alla bilder här | Lova `glad` → `forvanad` när hon ser Pip och Gurra · Pip `nyfiken` → `skrattar` och vinkar · Gurra `blinkar` | putt … tut | – |
| 11a | Busshållplatsen | kameran glider in mot Pips enda ärtskida | Lova `nyfiken` · Pip `blinkar` · Gurra `nyfiken` | | Vad är grönt? Titta där! |
| 11b | Tvåbild (Gurra i kanten) | Pip öppnar skidan: precis tre ärtor; hon pekar en per takt på Lova, sig själv och Gurra | Pip `ropar` på "en", "två", "tre" · Lova `forvanad` när skidan öppnas → `skrattar` · Gurra `forvanad` på "tre" | | Ärtorna är gröna – en, två, tre! |
| 11c | Närbild Pip | "Pip, pip! Hej, Lova! Jag har tre ärtor – en till var och en!" | Pip `ropar` på "Pip, pip!" → `karleksfull` på "en till var och en" | | (lucka) |
| 11d | Tvåbild (Gurra i kanten) | "Hej, Pip!" "Varsågod!" "Tack!" Pip ger Lova en ärta, Gurra får sin | Lova `glad` på "Hej" → `karleksfull` på "Tack" · Pip `karleksfull` på "Varsågod" · Gurra `skrattar` | pling | (lucka) |
| 13a | Tvåbild | Lovas ärta hoppar ur tassen och studsar på golvet | Lova `forvanad` · Pip `forvanad` · Gurra `forvanad` | boing | Oj, oj! Ärtan hoppar! |
| 13b | Lågt utsnitt | ärtan rullar in under bänken, ett skutt per "rull" | (ärtan har inget ansikte) Lova `nyfiken` efter ärtan, kant i bild · Pip `skelogd` när den försvinner under bänken | rull ×3 | Rull, rull, rull … in under bänken |
| 13b2 | Tvåbild | Pip och Gurra håller upp sina två ärtor, Lova har tom tass | Pip `nyfiken` på "en, två" → `forvanad` på "vi är tre" · Gurra `forvanad` · Lova `forvanad` på sin tomma tass | | En, två – men vi är tre! |
| 13c | Närbild Lova | ledsen, en liten tår | Lova `ledsen` (en liten tår), den enda ledsna bilden | snyft | Leoparden är ledsen |
| 13d | Närbild Lova | Lova tittar på tittaren | Lova `nyfiken` mot tittaren → `forvanad` i den tysta takten (väntar på svaret) | | Vem kan hjälpa? (tyst takt) |
| 14a | Lågt utsnitt | Pip hoppar ner och trillar mjukt på rumpan, lugnt | Pip `ropar` på "Kycklingen!" → `forvanad` när hon trillar (O-mun, "oj!") · Lova `forvanad` | duns | Kycklingen! Hoppar ner – oj, hon trillar! |
| 14b | Lågt utsnitt | Pip reser sig själv och pickar direkt fram ärtan under bänken | Pip `skrattar` när hon är uppe → `nyfiken` per pick → `forvanad` när ärtan kommer fram | pick ×3 | Upp igen – pick, pick, pick! |
| 14c | Tvåbild | Pip ger ärtan till Lova, Lova vinkar tack | Lova `karleksfull` per "tack" · Pip `karleksfull` | | Här är ärtan – tack, tack, tack! |
| 14d | Tvåbild (Gurra i kanten) | alla tre håller upp sin ärta: nu räcker det igen | Lova, Pip och Gurra `karleksfull` → `skrattar` på "alla tre!" | | En ärta var – till alla tre! |
| 14e–f | Tvåbild | alla tre äter | alla `slickar` på "mums" ×3 → `njuter` på "hurra" (Pip `skrattar`) | mums | Mums, mums, mums – hurra! |
| 14g | Busshållplatsen · helbild | Lova i traktorn vid övergångsstället; trafikljuset som stått rött i bakgrunden sedan 10 slår om till grönt, alla pekar framåt | slutögonblicket: alla `forvanad` på pling → alla `ropar` "Grönt! Nu kör vi!" med stora munnar | pling | Grönt! Nu kör vi! |
| 15a–e | Disco (mint) | alla dansar; Gurra hoppar, Kajsa vickar (skällan), Fia flyger runt | alla `skrattar` på "Danspaus!" · Gurra `ropar` på "Hoppa" → `skrattar` · Kajsa `skelogd` när skällan plingar → `skrattar` · Fia `njuter` när hon flyger runt · alla `ropar` på "grön dans!" | pling | Danspaus |
| 16a | Disco | grodan, lampan, ärtorna, traktorn på vita kritskivor, flyger upp i raden runt kulan | Lova `forvanad` per sak som flyger upp → `ropar` på varje "grön!" (Gurra på skivan `blinkar`) | | Grodan – grön! … |
| 16b–c | Disco | refrängdansen med alla, Lova i traktorn i mitten, ärtbubblan | se Refrängdansen ovan; Pip och Gurra `skrattar` bredvid | | Grönt betyder kör, grön som en liten ärta! |
| 16d | Kritsvep (lila) → Busshållplatsen · helbild | traktorn tuffar ut ur bild åt höger med vita puffar, Pip och Gurra vinkar | Lova `karleksfull` och vinkar bakåt när hon kör ut · Pip `skrattar` → `karleksfull` · Gurra `blinkar` | putt, putt | Hej då, hej då – putt, putt! |
| 17 | Kritiris | cirkeln sluter sig runt Pip som vinkar | Pip `karleksfull` → `blinkar` precis innan cirkeln stängs | outrot tonas ut | – |

## Att kontrollera när sången finns
- Gissningspausen efter "vad kan det vara?" och frågepausen efter "Kan du se?" ska vara 4–5 s; läggs annars in som instrumentala takter i klippet (som i 006 och 007).
- Luckan för repliken vid bänken (ca 7 s) efter "en, två, tre!".
- Den tysta takten efter "Vem kan hjälpa?" så att barnet hinner ropa.
