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
