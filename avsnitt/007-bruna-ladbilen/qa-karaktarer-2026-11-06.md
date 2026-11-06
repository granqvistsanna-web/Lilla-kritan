# QA karaktärer – avsnitt 007 · Bruna sången, tagning 5 (2026-11-06)

**Omdöme: revise** (nästan pass). Alla fem figurer är on-model, ingen snurrar eller vänds, ingen är avskuren av ramen, lejonet är borta och de teckenändringar i `feedback-2026-11-06.md` som rör figurerna är gjorda. Kvar är en lagerbugg i klättringen, en lastbilsskala som hoppar, armar som ser lösa ut, en nalle som inte syns blinka och Bulle som döljs halvvägs av sandkanten.

Granskat: `film/avsnitt-007-grovklipp.mp4` (3:38,6, --snabb 960×540, byggt 13:53) var 2,5:e sekund, plus tätare serier vid humlan och kotten (1:25–1:34), klättringen ur bilen (2:14–2:18) och nallen (1:35–1:40). Det är stillbilder ur en förhandsvisning; ljud och rörelse mellan bilderna är inte bedömda. Tidsangivelserna är avsnittstid.

## Anteckningarna i feedbackfilen som rör figurerna

| # | Anteckning | Resultat |
|---|---|---|
| 2 | Nallen blinkar, andas, lutar, tittar åt Bulle | **Delvis.** Nallen (mörkbrun med grön fluga) sitter på flaket, huvudet lutar och kroppen guppar (95–100 s), och den tittar mot Bulle. **Blinkning syns inte:** i 24 prov med 0,25 s mellanrum (1:35–1:41) har den ögonen öppna hela tiden. Antingen är blinkningen kortare än 0,25 s eller så saknas den. Kontrollera i `lastbilen.js` att blinken är minst 0,15 s och att den slår till var 3–5:e sekund |
| 6 | Ingen humla 0:53 | **Klart.** Ingen humla vid 0:52,7 |
| 7 | Rutschkanan i tankemolnet | **Klart.** Hela rutschkanan och Bulle uppe på den syns i molnet (0:57–1:03), inget avskuret |
| 8 | Närbild på kolan på nosen | **Klart.** 1:17,7–1:20,2 och 2:07,7–2:10,2: Bulles ansikte fyller bilden, kolan på nosen syns tydligt |
| 9 | Kotten och humlan, en sak i taget | **Klart, med en kvarvarande oro.** Kotten hänger i granen (1:25,8), humlan kommer (1:26,6), kotten faller och studsar på vägen, humlan flyger ut (borta 1:30,6). Men vid 1:28,2 blir kotten plötsligt nästan dubbelt så stor medan den studsar (kan: studsen ser ut som att den växer). Inget annat rör sig samtidigt |
| 10 | Ingen humla 1:40 | **Klart.** Ingen humla vid 1:40,2 |
| 12 | Utstigningen vid 2:17 | **Klart.** 2:16,0 sitter han vid ratten, 2:16,5 hoppar han ur med armarna uppe, 2:17,0 landar han vid lastbilen och står. Ingen vridning. Ratten blir kvar i hytten. Se skalfyndet nedan |
| 14 | Lejonet ut ur discot | **Klart.** Gurra, Ludde, Bulle, Igge och Mille håller hand (3:02–3:05), inget lejon |
| 15 | Outrot stannar på kolastranden | **Klart.** Efter 3:05 är det bara stranden med rutschkanan, irisen sluter sig på Bulle (3:35–3:38) |

## Fynd

| Scen | Tid | Figur | Problem | Åtgärd | Allvar |
|---|---|---|---|---|---|
| angen | 2:16,5–2:18 | Bulle | Hoppar ur hytten och blir plötsligt större än fönstret han satt i (sittande ca 0,65–0,75 × stående). Flaket ser litet ut bredvid honom | Skala stående Bulle ner något, eller förstora lastbilen i ängen | bör |
| vagen-2 (kotten) | 1:28,2 | Kotten | Kotten växer till nästan dubbel storlek mitt i studsen | Studsa den lodrätt utan skalning, eller bara på vägen | kan |
| vagen-1, vagen-2 | 0:30, 1:28–1:34, 1:50 | Bulle (uppsträckta armar) | Armarna är lösa bruna korvar som sticker upp ur fönsterkanten på sidorna om huvudet, utan axel (1:28,2 en arm pekar ut ur fönstret) | Låt armen börja inne i hytten bakom fönsterbrädan, eller rita en kort axel | bör |
| vagen-1, vagen-2 | 0:30–1:50 | Nallen | Blinkar inte (se ovan) | Lägg in blinkar | bör |
| vagen-2 | 1:38,2–1:39,3 | Nallen | Vita stjärnor flyger över nallen och skymmer den en stund, medan den vickar på huvudet | Ta bort eller flytta stjärnorna från nallen | kan |
| angen | 2:00–2:02, 3:10–3:12, 3:30–3:35 | Bulle | Bulles underkropp är gömd bakom sandkanten (han står "halvt nedsjunken") vid foten av stranden och rutschkanan | Lyft Bulle ur sandkanten eller lägg sandkanten bakom honom | kan |
| angen | 2:30 | Nallen | Nallens huvud ligger i bildens övre vänsterkant i närbilden på Bulle | Flytta in 30 px eller ta bort | kan |
| angen | 2:35–2:40 | Igge | Igges taggar och arm tangerar högerkanten i ledtrådsbilden med blommorna | Flytta in 20 px | kan |
| discot | 2:50–3:05 | Alla | Pass: ansikten och poser läsbara, inga lösa lemmar, Mille och Gurra inte avskurna. Iggess armstubbar har mjuka kanter och är rimliga | – | pass |

## Kontroll av kravlistan

- **Bulle:** on-model (rund brun kropp, grön keps, kodansikte). Ratten syns i alla lastbilsbilder, också med armarna uppe (0:50, 1:28, 1:32). Ansikten och humör passar raderna (glad 0:30, orolig 1:35, sluten 1:42, ledsen med tår 2:30).
- **Nallen:** mörkbrun med grön fluga, på flaket i alla lastbilsbilder, inte avskuren. Blinkning se ovan.
- **Humlan:** gul-svart, hel, flyger ur bild (1:30,6). I ängen ritar den en brun spiral (2:20–2:23), en sak i taget.
- **Ludde:** sitter på filten, on-model, glada och förvånade ögon, inga lösa delar.
- **Igge:** stubbarmarna är mjuka och fästa, vinkar i ängen (2:35–2:37), hand i hand i discot. Bollen i 2:40 och 2:55 gungar bara, ingen vridning.
- **Gurra och Mille** i discot: on-model, hela i bild, pass.
- **Snurrar/vänds:** ingen figur vänds eller snurrar. Bullen som rullar behåller sin riktning (2:30–2:37).
- **Avskurna figurer:** inga i helbilderna. Små tangeringar listade ovan.

**Inte gjort:** ljud och effekter, full rendering (bara --snabb), tät provtittning av 0:00–0:25 och 1:55–2:14 (övergångar granskas i huvudsessionen).

## Bevis

- Humlan och kotten: `/private/tmp/claude-501/-Users-sannagranqvist-Documents-Lilla-kritan/a0283a95-71bd-4c8f-b7bc-3b341c360b74/scratchpad/e/bee.jpg`
- Utstigningen: `.../scratchpad/e/exit.jpg`
- Nallens ögon 95–100 s: `.../scratchpad/e/ted.jpg`
- Översiktsark var 2,5:e sekund: `.../scratchpad/v3/sheet00.jpg` … `sheet09.jpg`
