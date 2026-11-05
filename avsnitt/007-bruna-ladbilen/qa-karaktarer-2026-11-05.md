# QA karaktärer – avsnitt 007 · Bruna sången (2026-11-05)

**Omdöme: revise** (fixbart, inget fail). Granskat: 64 bilder i `storyboard/frames/`, grovklippet och introt. Inget ändrat i repot.

**Viktigt om versionerna:** bilderna byggdes om 19:31 (mitt under granskningen) och var stilla från 19:34. Allt nedan gäller **den nya versionen**. `film/avsnitt-007-grovklipp.mp4` är från 18:58, alltså **gammalt**: det visar fortfarande de äldre bilderna (Bulle med armar). Bygg om det innan det granskas igen.

## Vad som är bra
- Bulle sitter nu nere i sätets sänka i alla lastbilsbilder, kepsen är grön och på plats överallt, vit klistermärkeskant på figurer och lastbil (utom 14c–14f, se nedan).
- Ludde, Igge, Gurra och Mille är on-model mot referenserna, ansiktena är läsbara och passar raderna (13d ledsen med tår, 13e frågande O-mun, 13a förvånad).
- Inget snurrar eller vänds: lastbilen lutar uppför och nerför bullberget men kör alltid åt höger, Igges boll gungar bara (14a, 14b, 15d).
- Skalan mellan figurerna håller (Bulle ca 0,85–0,9 × Ludde i 14f, Gurra och Mille något mindre i 16b).
- Introt: 11,3 s, titelkortet fylls av papperet vid 10,9 s och klippet till 02 vid 11 s sitter. Inga svarta bilder utom irisens slut.

## Fynd

| Bild | Figur | Problem | Förslag | Allvar |
|---|---|---|---|---|
| 03a, 03b, 041, 04, 04a, 042, 05a–05h, 06–06b, 08–08c, 09a–09h, 11a–11b, 11e, 12, 13a–13e, 16c, 16d, 17 | Bulle | **Inga armar eller tassar syns alls** i lastbilen i nya bilderna. Gesterna går inte att läsa: vinkar (03a), tassar på kanten (03b), pekar åt vänster och höger (04a), knackar sig på huvudet (06b), klappar på magen och pekar på örat (08b, 08c; där syns bara mörka streckmarkeringar), sträcker armarna upp (05c, 05d, 09c, 09d), tutar (05g), "tassarna uppåt" (13e), vinkar i irisen (17) | Lägg tillbaka riggens armar över pucklarna med tassarna **på kanten eller inne i sätet**. De får inte hänga nedför utsidan av lastbilen, som i förra versionen (06b, 08b; det Sanna pekade på). Lagerordning: Bulle utan armar → karossen → armarna | måste |
| 13e | Bulle | En lös brun stump (en tass) sticker ut bakom vänstra pucklen, lösryckt från kroppen | Följer av raden ovan: rita tassen hel och fäst vid axeln, eller ta bort | måste |
| 16b | Gurra, Mille | Gurra är avskuren av vänsterkanten (vänster arm) och Mille av högerkanten (öra, arm och svans nästan i kanten). "Alla fem i ett svagt V" får inte plats | Dra ihop raden, ca 8–10 % mindre skala eller tätare avstånd, så att alla syns hela | bör |
| 14c–14f | Lastbilen | Lastbilen bakom Bulle är en platt brun klump utan hjul, flagga och vit kant och är avskuren av vänsterkanten. Ser ofärdig ut och krockar med Bulles bak | Dölj den, flytta den längre ut, eller visa hjul och kant som i 13f | bör |
| 14f | Bulle, Ludde, Igge | På "hurra!" har alla tre stora runda ögon (som "förvånad") och öppen mun. Ludde sträcker inte upp armarna, fast raden säger att alla gör det | Glada ögon (^ ^) på Bulle och Ludde. Ludde: armarna upp | bör |
| 13f | Igge | Ledtråden är nästan osynlig: bara en grå taggkant längst ner till höger, mest utanför bilden | Dra in nosen och taggarna ca 120 px, så att de syns bakom blommorna | bör |
| 11–13f (fler) | Ludde | Ludde **står** bredvid filten i stället för att sitta på den. De nya sittande bilderna (`ludde-sitter-v1/v2`) används inte än | Koppla in `ludde-sitter` i 11–13f (öppen fråga 7 i storyboarden) | bör |
| 05e, 05f, 09e, 09f | Lastbilen, Bulle | Lastbilens nos och lykta är avskuren av högerkanten vid kanelbullens fot | Flytta lastbilen ca 60 px åt vänster, så att hela nosen syns | bör |
| 05b, 05c, 09b, 09c | Lastbilen | Flaggan skärs av vänsterkanten (en grön flik syns utanför bilen i 05c och 09c) | Medvetet i 05b (rullar in). I 05c och 09c: flytta in lastbilen eller dölj fliken | kan |
| 16c, 16d, 17 | Bulle | Bulle i bilen har inga armar (se första raden), så "Hej då, vinkar" syns inte. I 17 sticker en mörk fläck (hjulkant) upp ur irisens nederkant | Armar (rad 1). Kapa fläcken i 17 | kan |
| 02–02c mot 03 | Lastbilen | Den ritade lastbilen i 02–02c har två små pucklar och en låg hytt, men i 03 har den en stor hytt. Zoomen "in i teckningen" byter alltså form | Rita om kodlastbilen efter lastbil-brun-v2 (en hytt) | kan |
| 15b | Igge | Stirrar med ringögon och rak mun medan alla dansar glatt | Lägg på leende och glada ögon | kan |
| 15a–16d | Bakgrunden (disco) | Discot är betydligt blekare och mer genomskinligt än i 005/006 (ljusa strålar, urtvättade färger). Figurerna får sämre kontrast | Mörkna bakgrunden till 005/006:s nivå | kan |
| `storyboard.md` | – | Tabellen anger 04 som "≈0:32.5–0:29.9" (slut före start) | Rätta tiden i `bygg.py` | kan |

## Grovklippet (obs: gammalt, 18:58)
- **Matchning mot `rader.txt`:** stickprov vid 12 tidpunkter (11 s, 41,5 s "Brun brun brun", 51,6 s "Upp på stora kullen", 72 s "Kotten är brun", 75 s "Vad mer är brunt", 84 s, 119 s, 125,6 s "snurr", 135,2 s "Oj oj" (+7,83 s), 151,3 s "Igelkotten", 164,2 s "Danspaus", 169,8 s och 172 s sista refrängen): **rätt bild på varje rad**, inget glapp, ingen svart bild. Slutirisen slutar svart som den ska.
- **Intro:** klippet vid 11 s sitter (frame 10,9 s är det fyllda papperet, 11,4 s är 02). Ljudet är tyst 9,0–11,0 s, det är jinglens slut.
- **Rörelse går inte att bedöma:** `freezedetect` visar stillbilder i 4–10 s (t.ex. 41,5–46 s, 184–194 s). Grovklippet är i praktiken ett bildspel. Det går alltså inte att se om något snurrar eller vänds i rörelse, bara på de stilla posen (de är ok).
- Grovklippet har storyboardens pilar och streckade rörelsemarkeringar i bilden (t.ex. 41,7 s och 135,5 s). De får inte följa med till det riktiga klippet.

## Bevis (bildsökvägar)
- Bulles armar saknas: `storyboard/frames/03a.jpg`, `06b.jpg`, `08b.jpg`, `08c.jpg`, `13e.jpg` (stumpen)
- 16b avskuret: `storyboard/frames/16b.jpg`
- 14f hurra och lastbilsklump: `storyboard/frames/14f.jpg`, `14c.jpg`
- Igges ledtråd: `storyboard/frames/13f.jpg`
- Lastbilen avskuren: `storyboard/frames/05e.jpg`, `09e.jpg`, `05c.jpg`
- Kontaktark (nya bilder, 6 per ark): `/private/tmp/claude-501/-Users-sannagranqvist-Documents-Lilla-kritan/a0283a95-71bd-4c8f-b7bc-3b341c360b74/scratchpad/sheets2/s00.jpg` … `s10.jpg`
- Kontaktark (förra versionen, med Bulles hängande armar i 06b och 08b): `/private/tmp/claude-501/-Users-sannagranqvist-Documents-Lilla-kritan/a0283a95-71bd-4c8f-b7bc-3b341c360b74/scratchpad/sheets/s00.jpg` … `s10.jpg`
- Grovklipp och intro, stickprov: `/private/tmp/claude-501/-Users-sannagranqvist-Documents-Lilla-kritan/a0283a95-71bd-4c8f-b7bc-3b341c360b74/scratchpad/gk/sheet0.jpg`, `sheet1.jpg` och `in/sheet.jpg`
