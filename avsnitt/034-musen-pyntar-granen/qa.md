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

## Feedback 2026-11-21 kväll (5 punkter)

| Punkt | Ändring |
|---|---|
| 0:20 "måla inte musen måla en julkula" | Ritintrot: kritan ritar en röd julkula i ett drag (7,1 s, julkulans kontur), väntar, kulan fylls i och skimrar med glitterljud. *"En julkula!"* (37, klippt ur 09). *"Oj! En mus!"* flyttad till rad 1, när musen trippar in. Musens kontur (`mille-kontur.json`) används inte längre |
| 0:41 ny replik | *"Vi ska dekorera granen med julpyntet i lådan. Hurra, vad kul!"* (38, ElevenLabs v3, Malin, tagning 1 av 2, rådata i `produktion/ljud-original/034/`) i stället för *"Hm … vad gör vi nu?"*. Musen tittar ner mot lådan och blir jätteglad med öronvipp på "Hurra", förtjust pip efter repliken |
| Pall | Ny rad 13b: musen backar två små steg till STA2 (790), kritan ritar pallen (`pall-tunn`, 0,42) mellan musen och lådan, *"Titta! Kritan ritar något."* (08) och *"En pall! Varsågod, musen."* (39, ny). I rad 14, 15 och 19 går musen till kulan, tar den, kliver upp på låga steget på "Upp" och höga på andra "upp" (uppmätt: 2,95 / 4,07 / 1,10 s in), hänger kulan på "pling!" (den glider 0,35 s till sin egen gren så att de tre sprids) och hoppar ner till STA2. Kulorna hänger nu i granens mitt, ca 150 px högre |
| 3:26 "släng upp det sista så kommer lamporna" | Ny rad 25b efter stjärnan: musen går till lådan, tar glittergirlangen, slänger upp den (swoosh), den lägger sig i två guldbågar, sedan tänds lamporna (tindra), musen blir jätteglad och går tillbaka. Lamporna tändes förut när stjärnan landade. Lådan är tom på glitter efteråt |
| 3:26 mer inredning | Tomtetavlan och regnbågstavlan på väggen, två ljus med lågor på spiselhyllan, ett litet bord (`ljusbord`) med ett ljus till höger om granen. Allt befintlig rekvisita |

Filmen är 4:06 + intro (förut 3:46). Förhandsvisning `--snabb`, slutrendering inte gjord.

## Feedback 2026-11-21 sent (3 punkter)

- 1:53 Byrån (`ljusbord`) och ljuset till höger om granen borta.
- 3:49 Ett ljus på spiselhyllan, i en mässingsstake ritad i kod; det andra ljuset borta. Regnbågstavlan visar nu vinterkullen (`bakgrunder/vinterkullen-v3`, inklippt i ramens fönster): snö, solnedgång och små röda hus.
- 3:56 En liten krans över spisen (`krans.png`, samma urklipp som lucka 7, kopierad till scenmappen).

## Feedback 2026-11-22 (11 punkter, lucka J22)

| Punkt | Ändring |
|---|---|
| hela: namnge i feedbacksidan | J22 heter *Lucka 22: Musen pyntar granen* på sidan |
| 0:22 kulan i mitten, fler detaljer | Ritintrot: hela kulan (öglan till botten) mitt i bild. Kulan har fått ett julmönster (två vita vågband med prickar) och teckningen ritar efter konturen lockets kant, öglans hål, banden, prickarna och glansfläckarna (KT 7,1 → 9,4 s, rad 01b +2,3 s). Samma mönster på alla kulor och i kritans kulteckningar |
| 0:35 tavlan med granar | Vintertavlan större än tomtetavlan (0,27 → 0,34) och fler detaljer: kvällshimmel, måne, en bakre kulle, röd stuga med gult fönster, fyra granar, snögubbe |
| 0:41 lockflikarna | Borta |
| 0:44 julsymbol på lådan | Järnek (två blad, tre röda bär) i stället för stjärnan |
| 0:53 manus | Replik 40–42 (ElevenLabs v3, Malin, tagning 1 av 2, rådata `produktion/ljud-original/034/titta-lada-*.mp3`), musen tittar ner, klipp till lådan på "En låda med julpynt", nickar två gånger med *mhm*, jätteglad på "Ja! Vad kul!" |
| 1:34 närbild på kulorna | Rad 9 i närbild på lådan (K.KULOR, zoom 3,4) |
| 1:43 kulorna bakom lådans innehåll | Glittret ligger nu bakom kulorna |
| 2:23 fler musljud | Befintliga tagningar: *mhm* (mus-suck-2) när musen tar kulan och när den nickar, *jippi* (mus-hej-3, mus-hej-2) efter varje "pling!", pip när den tar den gula, pratpip när den kliver upp på pallen. Inga nya ljud gjorda |
| 3:35 pallen och stjärnan | Rad 23: musen går till pallen, kliver upp på båda stegen, sträcker sig och skuttar, når ändå inte (raden +2,6 s). Rad 24 närbild på musen på pallen, rad 25 kliver ner efter att stjärnan satt sig |
| 4:02 julmusik | Pynta salen (instrumental slinga) lågt under hela filmen efter ritintrot, i scenens ljud så att luckan får den |

Filmen är 4:16 (förut 4:07). Förhandsvisning `--snabb`, slutrendering inte gjord.

## QA 2026-11-25 (julkalenderns djupa QA, lucka J22)

| Fel | Rättning |
|---|---|
| Rad 14, 15, 19 (lucka 2:26, 2:34, 3:03): öronen och huvudets topp kapades när musen stod på pallens höga steg (K.STA följde inte med) | Kameran glider från K.STA till K.PALL (×1,2, cy 580) under klivet upp och tillbaka när musen kliver ner. Hela musen med öronen i bild |
| Fötterna svävade över stegen, och riggens skugga hamnade på väggen | PALL_LAG/PALL_HOG 250/42 → 282/76 (riggens fötter slutar ca 10 px ovanför pos), skuggan ligger på stegets ovansida. Musen mitt på det höga steget (NAR.dx −8/−4/4, KT_UT kompenserat så att kulorna hänger på samma grenar); den blå lutar 5 i stället för 13, annars sjönk högra foten under kanten |
| Line boil 5/zoom, ny brusbild 10 ggr/s | 2,5/zoom, 6 ggr/s |

qa-film.sh på `--snabb`: boil i koden ok. "Röst tvärt vid klipp" 220,89 s är Malins *"Upp!"* (32), som börjar på klippet 24→25 och slutar på sitt p, alltså inte avklippt. Fryst bild 160–165,5 s är pausen på julgransfoten (rad 17, planerad). Täta bilder 6/s: 20,8–100,8 s och klivet i rad 14, 15 och 19.

Kvar för Sanna: musens fötter är bredare än pallens höga steg, så tårna sticker ut lite på båda sidorna. Närbilderna på lådan (rad 3 och 9) har musens kropp utan huvud i vänsterkanten.
