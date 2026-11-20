# 046 Kaninen går till doktorn – QA (grind 6, 2026-11-20)

Djup QA av kodscenen (`scener/mottagningen/`) efter Sannas feedback på förhandsvisning 1–2. Två stillbilder per rad (start + 0,35 s och slut − 0,3 s), 45 rader, plus kontroll i kod av rader, röster och effekter.

## Ljud och tider (kontroll i kod)

- Längd 4:03.9 (G = 1,3, lugnare tempo).
- Alla röstfiler och effekter finns; ingen replik går ut över sin rad; inga överlappande repliker; inga kaninljud mitt i Malins repliker.
- Oanvända repliker (väntat): 3 (*"Oj! En kanin!"*, ritintrot är stetoskopet) och 11, 14, 17, 23, 30, 34, 35, 36, 38, 42, 47 (gamla *"nallen"*, ersatta av 50–60).
- Inga djurnamn i det som sägs. 9 frågor till barnet med paus, fniss på 4 rader (13, 19, 23, 33), inom receptets 3–4.
- Hjärtslagen: ElevenLabs-tagningarna `hjartslag-2` (leoparden) och `hjartslag-3` (kaninen), strax före *"dunk, dunk"*.

## Bild – hittat och rättat

| Rad | Fel | Rättning |
|---|---|---|
| 12 | Bröstdelen syntes inte: leoparden låg ovanpå doktorns hand | Leoparden i famnen ligger i ett eget lager mellan kaninen och doktorn |
| 6b, 7 | Närbilden skar av leoparden (det kaninen tittar på) | Ny kamera `kaninLeo`: kaninens ansikte och leoparden i samma bild |
| 6a | Kritan kom in över kaninens kind | Kritan kommer in lågt från höger |
| 31a, 31b | Stjärnan i luften skars av i överkanten | Stjärnan lägre (vid örats höjd), 31b i halvbild |
| 24 | Lampans sken skymde kaninens gap | Lampan bredvid munnen, skenet svagare; munnen öppnas och stängs mjukt |
| 2:27, 2:33 (23, 24) | För långt ifrån | Närbild på leopardens mun och kaninens mun |
| Doktorns närbilder | Huvudet inte i mitten | Centrerad på huvudet (`doktorNar`) |

## Kvar att titta på i rörelse

- 01c: zoomen in i teckningen slutar i en grå, oskarp bild innan den vita övergången (0,3 s).
- Kaninens vinkning (1, 37, 38): armen går ut åt sidan mer än upp.
- Leopardens fall (26) och skutten (10, 30) behöver ses i full fart.
- Ljudnivåerna (kritans ritljud, skutten) är inte finjusterade.

## QA 2: flöde mellan klippen och poserna (2026-11-20)

Bild precis före och efter varje klipp (44 klipp) och mitt i varje rad, plus kodgenomgång av alla ställen där ett ansikte, en pose eller en arm byttes på en bildruta (`tl > x ? A : B`). Allt rättat i `scener/mottagningen/index.html`; `rader.json` och tiderna är orörda. Tiderna nedan är scenens tid (utan logotypen, lägg till 1 s för hela filmen).

### Hoppklipp (nästan samma bild på båda sidor)

| Rader | Tid | Fel | Rättning |
|---|---|---|---|
| 6a → 6b → 7 → 8 | 0:54–1:12 | Fyra klipp mellan `kanin` och `kaninLeo` som var nästan samma bild, och ansiktet bytte på klippen | En enda bild (`kaninLeo`) från kritans teckning till kramen; ansiktet glider nyfiken → kawaii → nyfiken → glad |
| 3 → 4 | 0:37 | Samma bild, men öronen och ansiktet hoppade | Rad 4 börjar där rad 3 slutar och glider till sin pose (0,5 s), blicken glider upp och ner |
| 19 → 20 | 2:31 | Samma bild, fnissig → glad på en ruta | Glider på 0,5 s |
| 15 → 21 | 1:58 | Samma bild (`kanin`), och öronen skars av | Rad 21 har en egen bild, `kaninOron` (Sanna: "lite upp och till vänster"): ×2,4, lite till vänster och högre, hela öronen i bild. Ansiktet glider från jätteglad |
| 31a → 31b → 32 → 33 | 3:37–3:52 | Samma bild, ansiktet bytte på varje klipp | Ansiktena glider (nyfiken → kawaii → jätteglad → fnissig) |
| 37 → 38 | 4:19 | Samma bild: ansiktet bytte och vinkningen hoppade i takten | Rad 38 fortsätter vinkningen i takt, är jätteglad och sänker armen före kritirisen |

### Kontinuitet

| Rader | Tid | Fel | Rättning |
|---|---|---|---|
| 13 → 14 | 1:44 | Leoparden låg i knät igen direkt efter att kaninen flyttat den åt sidan | I rad 14 ligger den kvar vid sidan, och kaninen tar tillbaka den i slutet av raden (syns i kanten) |
| 2, 36 | 0:27, 4:09 | Doktorns vinkande arm var uppe redan på första bildrutan och uppe vid klippet | Armen lyfts på 0,5 s och sänks före klippet |
| 37 | 4:12 | Kaninens arm stod uppe på första bildrutan och bakre armen stack ut åt sidan | Armen lämnar kramen och lyfts mjukt; i slutet av 38 går den tillbaka till kramen, så rad 39 matchar |
| 1 | 0:23 | Vinkningen: armen hoppade upp och ansiktet bytte efter gången | Armen lyfts på 0,5 s, ansiktet glider |
| 8 | 1:08 | Kaninen höll armarna i kram innan leoparden kom | Armarna sluter sig när leoparden kommer (0,9–1,4 s) |
| 30 | 3:31 | Pose och ansikte bytte på en ruta när leoparden flög upp i famnen | Glider (0,85–1,2 s) |
| 33 | 3:51 | Andra stjärnan poppade upp i luften | Den växer fram (0,3 s) innan den flyger till leoparden |

### Ansikten och små rörelser som bytte på en bildruta (nu mjuka, 0,25–0,5 s)

Rad 4 (blicken), 9 (sover), 13 (fnissig), 15 (klappen), 18 (jätteglad), 19 (fnissig), 21 (fnissig, öronen börjar vicka mjukt), 23 (fnissig efter gapet), 26 (förvånad), 27 (blicken vänster–höger), 34 (blicken).

Doktorns ljud: nicken på *mm-hm*/*hmm* började med ett ryck (startade mitt i nicken) och slutade tvärt; nu börjar och slutar den i vila. Klappen på *bra* klipptes av med armarna ute; nu går hela klappen tillbaka till vila (rad 10, 25, 32).

### Kameran

| Kamera | Rader | Fel | Rättning |
|---|---|---|---|
| `kaninNar` | 3, 4, 9, 19, 20, 25, 27, 34 | Öronen skars av i överkanten | Lite högre (−30 i stället för +10) |
| `nalleOra` | 17 (2:11) | Kaninens ansikte skars av vid ögonen | ×2,6 och högre: kaninens ansikte, leopardens öra och lampan i bild |
| `nalleMun` | 23 (2:40) | Samma | ×2,4 och högre |
| `kaninOron` (ny) | 21 (1:58) | Se ovan | Sannas önskan om kameran vid 2:00 |

### Kvar för Sannas ögon

- **11c (1:29):** stetoskopet hoppar från halsen till öronen på en bildruta medan armen sträcks ut (riggen har ingen övergång). Syns i närbilden.
- **Rad 2 och 36 (`doktorVinkar`):** kaninens öra och ena öga syns i vänsterkanten. Det ger sammanhang men kan se avskuret ut.
- **6a–8** är nu en lång bild (ca 17 s) utan klipp. Vill Sanna ha fler närbilder där kan rad 7 eller 9 få en egen vinkel.
- **33 → 34** (`kanin` ×2,2 → `kaninNar` ×2,8) är ett litet zoomhopp. Rätta om det stör.
- Lampan: doktorn håller den inte i rad 19, 20 och 22 (mellan undersökningarna). Det syns knappt, men lampan finns inte i handen där.

## QA 3: klipp, luft ovanför huvudet, kritan och ljudet (2026-11-20)

Bild precis före och efter alla 44 klipp (t − 0,05 / t + 0,05), en bild mitt i varje närbild, 2–3 bildrutor i rad (1/15 s) runt rad 13, 15, 26, 27, 29–30 och kritans fasbyten i 6a och 31a. Ljudet kontrollerat i kod med ffprobe-längder mot `rader.json`. Tiderna är scenens tid (utan logotypen). `rader.mjs` och `rader.json` är orörda; allt rättat i `scener/mottagningen/index.html` (märkt `// QA 3:`).

### Ljud (kontroll i kod)

- Alla röst- och effektfiler finns, `rader.json` stämmer med `rader.mjs`, längd 4:37,0 + 0,6 s svart.
- Inga repliker eller kaninens och doktorns ljud ovanpå varandra; ingen replik går ut över sin rad. Minsta mellanrum 0,05 s (rad 26: kaninens *jippi* → doktorns *oj*), annars 0,10 s.
- Effekter under röster (avsiktligt): `glitter` under svaren (01c, 6b, 31b), `pop` under 32/33, hjärtslagen under *"dunk, dunk"*, `duns` mellan *jippi* och *oj* (26), `tindra` slutar 0,2 s in i doktorns *hmm* (17).
- Inga djurnamn i det som sägs (raderna 1–63 som används).

### Rättat

| Rad | Tid | Fel | Rättning |
|---|---|---|---|
| Alla närbilder på kaninen (3, 4, 6a–9, 13, 15, 17, 19, 20, 23–25, 27, 31a–34, 37, 38) | – | **Öronspetsarna skars av i överkanten**, i 6a–8 (`kaninLeo`) och 17/23 (`nalleOra`/`nalleMun`) nästan halva örat. Mätt: spetsarna ligger 230–250 px (scenens mått) ovanför `huvud` | `kaninNar`/`kaninOraNer` − 68 (var − 30); `kanin` ×2,0 och + 5 (var ×2,2, + 60, fötterna är kvar i bild); `kaninLeo` ×2,0, huvud + 20; `nalleOra`/`nalleMun` ×2,2, huvud − 15; `mun` − 52 (var − 20); `mage` (rad 13) högre, nu syns kaninens öron och doktorns hår |
| 6a | 0:54,1 | Kritan gled in till en punkt bredvid konturen och hoppade sedan till linjens början | Glider in till konturens början |
| 6a | 0:58,1 | När konturen var klar hoppade kritan från linjens slut till väntplatsen | Glider i en båge (0,8 s) till väntplatsen och svajar |
| 6a → 6b, 31a → 31b | 0:59,1, 3:53,1 | Kritan vreds från 140° till 125° på klippet (samma bild) | Ut-flygningen börjar med samma svaj och vinkel |
| 31a–31b | 3:47,7–3:53,6 | Stjärnan ritades som en streckad kontur som avslöjades från vänster, kritan bredvid (inte på linjen), väntplatsen låg i överkanten (kritan halvt utanför bild) och hoppade dit | Som kritan-ritar: mörk kritlinje med kritans spets i linjens ände, in uppifrån höger, båge till en väntplats nedanför till höger om stjärnan, fylls i inifrån med en växande cirkel och linjen tonas bort |
| 13 | 1:40–1:42 | Kaninen fnissade redan efter *"dunk, dunk"*, före *brr* och före *"det kittlas"* | Glad fram till *brr*, kall, sedan fnissig på *"Och det kittlas!"* |
| 26 | 3:19,5 | Halva leoparden försvann bakom pallen på en bildruta (lagret byttes när den redan låg över pallen) | Lagret byts innan leoparden når pallen (0,8 i stället för 0,9) |
| 26–29 | 3:20–3:42 | Leoparden "bakom pallen" syntes tydligt med halva huvudet över pallen redan när Malin frågar var den är | Ligger 26 px lägre: bara öronspetsarna syns (en liten ledtråd), och kiket i 28–29 blir tydligare |
| Sakbilderna 11, 16 | – | Linjekoket (Sannas svagare boil) blev 1,4 px där, 2,5 px i alla andra bilder; i 12 och 24 blev det 3,6 px (zoomen saknades i `KZ`) | `KZ` = 1 i sakbilderna; `mun`, `mage`, `nalleMage` i tabellen; `kanin`, `kaninLeo`, `nalleOra`, `nalleMun` följer de nya zoomerna |

Linjekoket svagare (Sanna 2026-11-21, ändrat av huvudsessionen och med i samma commit): `feDisplacementMap` 2,5 i stället för 5, delat med kamerazoomen (`2.5 / KZ`) så att koket är 2,5 px i bild i varje kamera, och ny brusbild 6 gånger/s i stället för 10.

### Kvar (efter hur mycket det syns)

1. **Rad 30 (3:43,5):** leoparden flyger från pallen till famnen på 0,3 s, och byter lager (bakom pallen → framför kaninen) mitt i flygningen. Det är snabbt och lite ryckigt. Förslag: kaninen böjer sig ner och tar den, eller leoparden skuttar upp över pallens kant på 0,5–0,6 s.
2. **Rad 12 (1:30–1:36, `nalleMage`):** närbilden på leopardens mage skär av kaninens och doktorns huvuden vid ögonen. Det är en detaljbild, men Sanna vill aldrig klippa huvuden. Att gå ut till ×1,9 ger nästan samma bild som rad 13 (hoppklipp); bättre att låta 12 vara en ren detaljbild eller ta samma bild som 13 och flytta stetoskopet.
3. **Rad 9 och 34 (`kaninNar`):** med luften ovanför öronen syns leopardens ansikte bara upptill i nederkanten. Rad 9 (*"Leoparden är med"*) kan få ×2,4 om leoparden ska synas mer.
4. **Rad 13 (1:41–1:43):** huttrandet är 9 skakningar/s; i förhandsvisningen (15 fps) blir det ett flimmer på ca 6 Hz. Ser bättre ut i 30 fps, men 5–6/s vore lugnare.
5. **Rad 15 (2:06,7):** under klappen byter armarna lager (`fram`) på en bildruta; armen rör sig fort så det syns knappt. Leoparden står kvar i luften vid sidan utan hand under klappen.
6. **Kritgnistor** saknas när leoparden (6b) och stjärnan (31b) fylls i (kritan-ritar fas 5). Lätt att lägga till med `gnistor()`.
7. Kvar från QA 2: 11c stetoskopet hoppar från halsen till öronen; kaninens öra i vänsterkanten i `doktorVinkar` (2, 36); lampan saknas i doktorns hand i 19, 20, 22.
8. Ritintrots zoom (01c) går upp till ca ×2,9 med koket i papperets mått, så koket blir ca 7 px den sista sekunden innan det vita. Kort och bakom vitt, men syns om man fryser bilden.
