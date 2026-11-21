# 034 Musen pyntar granen – djup QA (2026-11-21)

Djup QA av kodscenen (`scener/vardagsrummet/`) efter dagens ändringar: julpyntlådan, musen som lyfter kulorna, inget klockljud och julintrot. Två stillbilder per rad (start + 0,35 s och slut − 0,3 s), 35 rader. Bilden precis före och efter vart och ett av klippen. En genomgång i kod av alla bildrutor (1/30 s) för ansikten, poser och lägen som byts på en bildruta. Ljudet är kontrollerat i kod mot `storyboard/rader.mjs` med ffprobe-längder. Tiderna nedan är scenens tid, utan julintrot (lägg till 3,3 s för hela filmen).

## Ljud och tider (kontroll i kod)

- Alla 36 röstfiler och alla effektfiler finns. Alla repliker används. Längden är 3:46,2 plus 0,6 s svart (var 3:47,0).
- Ingen replik går ut över sin rad och inga repliker överlappar varandra.
- Inga djurnamn i det som sägs. Musen kallas "musen" i replikerna 4, 9, 16, 22, 28, 30 och 35.
- Klockljudet är borta (`hemmaljud-1` hade en tickande klocka). Brasan är rummets enda bakgrundsljud.
- Frågor till barnet: *"Ska vi säga tack?"* har 2,5 s (tackpausen, som 046), *"Kan du se var den blå kulan är?"* 5,0 s och *"Säg: upp!"* 4,4 s. Frågorna *"Hm … vad gör vi nu?"*, *"Ska vi pynta granen nu?"* och *"Var tog den vägen?"* (2,4–3,0 s) är retoriska och följs direkt av handlingen. *"Vad blir det nu?"* är gissningen under ritintrot (7,3 s medan kritan ritar).

### Rättat i ljudet

| Rad | Fel | Rättning |
|---|---|---|
| 14, 15, 19 | **"pling!" låg ca 0,6 s för tidigt** i `ORD` (whisper gav början på pausen före ordet). Kulan satte sig och dinget hördes innan Malin sa "pling". I rad 15 låg även "Upp" 0,6 s för tidigt | Uppmätt om ur ljudets energi: pling 4,10 / 5,28 / 2,30 s in i replikerna 19, 20 och 24, Upp 2,90 i 20. Kulan, dinget och glimten följer med |
| 3 | Musens trumpna pip låg 0,3 s in i *"Hm … vad gör vi nu?"* | Repliken 0,4 s senare, raden 0,4 s längre |
| 15 | Det förtjusta pipet låg 0,8 s in i *"pling!"* | Pipet kommer efter repliken (0,15 s efter) |
| 25 | Det förtjusta pipet låg 0,13 s in i *"Stjärnan sitter i toppen!"* | Pipet 0,25 s tidigare, när stjärnan landar |
| 17 | Pausen efter hjälpfrågan var 6,2 s | 5,0 s. Skimret bakom foten kommer fortfarande efter 3 s |

## Bild – hittat och rättat

| Rad | Tid | Fel | Rättning |
|---|---|---|---|
| 4a–8b (`K.GOLV`) | 0:41–1:20 | **Musens öron skars av i överkanten** när kritan ritade kulorna i lådan (×1,65) | ×1,3, hela musen och lådan i bild |
| 21a–21b (`K.GOLV2`) | 2:43–2:57 | Samma: huvudet skars av när kritan ritade stjärnan | ×1,3, hela musen i bild |
| 8b → 9, 9 → 10 | 1:20, 1:27 | Med den nya lådbilden blev halvbilden (`K.STA`) nästan samma bild, alltså ett hoppklipp | Rad 9 och början av 10 stannar i lådbilden. Nästa klipp är till kulnärbilden (spegeln) |
| 1 | 0:22,4 | Ansiktet bytte från gången till jätteglad på en bildruta | Glider på 0,4 s |
| 9 | 1:21–1:23 | Blicken hoppade röd → gul → blå | Glider på 0,3 s |
| 16 | 2:07–2:09 | Blicken och riktningen hoppade (ner → vänster → höger) | Glider på 0,35–0,4 s |
| 17 | 2:16 | Blicken hoppade vänster → höger | Glider på 0,4 s |
| 26 | 3:28 | Ögonen öppnades på en bildruta när klappen började | Glider på 0,35 s |

Kvar i koden efter rättningen: tre små hopp i rad 26 som hör till riggens klapp (handkopian och gnistan). De syns inte.

## Klippen (21 st)

Alla klipp går mellan olika bilder. Inga hoppklipp finns kvar. Bilderna före och efter stämmer (kulorna, stjärnan i handen, den blå bakom foten). 01c → 1 går från teckningen till det tomma rummet, och musen trippar in.

## Kvar för Sannas ögon

- **Kulnärbilden (10–11, 1:28–1:41):** lådan står nu precis bredvid musen, så musens grå kropp syns i vänstra kanten av närbilden på spegelbilden. Det ger sammanhang (musen lutar sig över lådan). Säg till om närbilden ska vara tätare.
- **Bytet till jätteglad** efter varje "pling!" (14, 15, 19) och i 21b: riggens blandning ger ett kisande ansikte i ca 0,15 s.
- **Granen:** kulorna hänger där musens hand når, i en båge på granens vänstra halva. Toppen och högra sidan är tomma tills slingan tänds.
- Förhandsvisningen är `--snabb` (960 × 540, 15 fps). Slutrenderingen är inte gjord.
