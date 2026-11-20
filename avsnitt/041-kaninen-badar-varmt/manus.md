# Avsnitt 041 – Kaninen badar varmt (plan)

**Status:** ✅ **Klart, godkänt av Sanna 2026-11-20 ("final approved")**: `scener/badet/badet.mp4` och julkalenderns lucka 9 (`produktion/youtube/shorts/jul/09-kaninen-badar-varmt/`, 236,6 s, −16,0 LUFS). Historik: 2026-11-18: grind 1 (manus v3) godkänd. Grind 2 klar: fläkten tagning 1 (`rekvisita/flakt.md`). Grind 3: tagning 1 delad (42 av 46 repliker, normaliserade till −3 dBFS i `assets/ljud/roster/kaninen-badar-varmt/`). ElevenLabs hoppade över 10, 26, 27 och 37, slog ihop 36, och lade till egna rader efter 29 (bortklippta). Rad 10, 26, 27 och 37 ströks (Sanna), rad 36 är bara "Fläkten blåser.", och tagningens extra "Tack, kritan!" efter båten blev rad 48. Rösten klar. Grind 4 klar: alla kaninljud fanns, nya `droppar-1` och `flakt-1`. Nästa: grind 5, animatiken.

**Ändrat i v3 (Kimis granskning, Sanna 2026-11-18):** fläkten står vid dörröppningen och drar in doften från köket · rad 29: skutten först, sedan repliken · luktpausen 3 s.

**Ändrat i v2 (Sanna 2026-11-18):** kritan ritar en snöflinga i ritintrot · vattnet sätts på och fyller karet, det tar tid och kaninen måste vänta · kaninen leker med en båt i badkaret, och kritan ritar båten.

Bilderbok i serien *Djuren hittar på!* (`format/bilderbok.md`, förlagan är 020 Grisen badar). Malin pratar med kaninen, och kaninen svarar bara med ljud, öron, nos och ögon. Samma badrum och badkar som 020. Det är vinter: kaninen kommer in kall från snön, väntar på att karet ska fyllas, blir varm i badet och leker med en båt. Sedan vill den inte gå upp. Kritan ritar en fläkt som blåser in doften av pepparkakor från köket, och då vill kaninen gå upp.

| | |
|---|---|
| **Titelkort** | Avsnitt 41 · Kaninen badar varmt |
| **Figurer (1)** | **Kaninen Kanel** (v2, riggad, `assets/karaktarer/kaninen-kanel/`) |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`, från 018/020), med ett fönster där snön faller (kod). Inget platsbyte. Köket syns aldrig: doften kommer in genom dörröppningen i vänster kant |
| **Kritan ritar (3)** | **snöflingan** (ritintrot, `rekvisita/snoflinga.md`, finns) · **badbåten** (`rekvisita/badbat.md`, finns från 020) · **fläkten** (ny, görs med Sanna i grind 2) |
| **Saker som finns** | badkaret, pallen (020), handduken på kroken (`rekvisita/handduk.md`), pepparkakshjärtat och pepparkaksstjärnan (små, i doften) |
| **I kod, inga nya bilder** | snötussar på öronen, nosen och huvudet som smälter till droppar · kranstrålen · skummet som stiger i omgångar medan karet fylls · ånga · doften: mjuka varma virvlar · snöfallet i fönstret · bubblor |
| **Kärna** | Kaninen fryser efter leken i snön. Vattnet sätts på, och kaninen får vänta tills karet är fullt. I det varma badet smälter snön tre gånger, och barnet hittar den sista. Kritan ritar en båt: "Varsågod!" – "Tack!" Kaninen leker med båten. Nu vill kaninen inte gå upp. Kritan ritar en fläkt, som blåser in doften av pepparkakor, och kaninen vill gå upp. Hej då! |
| **Barnet övar på** | vänta · peka på öronen, nosen och huvudet · hitta den sista snön · blåsa som fläkten · lukta · säga tack |
| **Favoriter** | 🐰 kanin · ❄️ snö · ⛵ båt · 🍪 pepparkakor |

**Kärnans ordning.** Problemet (kall) → vänta på badet → lösningen tre gånger (snön) → hjälpsaken (båten) → tack → leken → nytt problem (vill inte gå upp) → kritan ritar igen (fläkten) → hej då. Det nya mot 020 är att kaninen gärna badar, och att problemet "vill inte" kommer efteråt.

**Längd:** ca 4:15–4:30 med 0,7 s extra luft per replik (`GLES`). Väntan och båtleken gör den längre än 020.

**Short:** uppslag 10–14 (snön smälter, frågan om den sista snön), ca 45 s.

---

## INTRO *(gemensamt, ca 1 s)*
Lilla Kritan-logotypen, 1 s. Ingen jingel, inget titelkort.

## KRITAN RITAR (ca 16 s) – papper
*Kritan ritar en snöflinga: konturen i lugna drag (ca 7 s), mitten, sedan en arm i taget med sina små V-grenar. Konturen står kvar några sekunder. Sedan fylls den riktiga snöflingan i inifrån (`snoflinga`), och den börjar rotera sakta.*
> **MALIN:** Kritan ritar …
> **MALIN:** Hm … vad blir det nu?
> *(gisspaus ca 4 s, kritan svävar och vickar bredvid)*
> **MALIN:** Oj! En snöflinga!

**→ Zoom in i teckningen** (den enda zoomen). Vitt över, och i första bilden faller snöflingor utanför badrummets fönster.

## BADRUMMET

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 1 | Helbild, badrummet. Snön faller i fönstret. Kaninen skuttar in från vänster med snö på öronen, nosen och huvudet, stannar och vinkar | Hej, kaninen! Hej, hej! | `knarr-sno` på första skuttet, sedan `tass`; `hej-babbel` |
| 2 | Närbild, kaninen huttrar (små skak i sidled), öronen hänger | Oj, oj, oj! Du är ju alldeles kall! | `huttra`, `brr` |
| 3 | Klipp till närbild på snön på örat i 1,5 s, sedan tillbaka. Kaninen nickar | Har du lekt i snön? | `ja-babbel` |
| 4 | Klipp till närbild på kranen. Den sätts på, vattnet börjar rinna ner i karet, lite ånga | Nu sätter vi på vattnet. | `kran` i loop från nu till rad 7 |
| 5 | Helbild. Kaninen skuttar fram till karet och sträcker på sig (`strack`) för att titta över kanten. Bara lite skum syns | *(efter tittandet)* Är det fullt nu? *(paus 1 s)* Nej, inte än. Vi får vänta lite. | nyfiken `kanin-gullig-5`, sedan trumpen `kanin-gullig-6` |
| 6 | Kaninen står och väntar, ca 4 s utan replik: huttrar, tittar på kranen, tittar ut mot barnet, blinkar. Skummet stiger en bit över kanten | – | `kran`, `huttra` |
| 7 | Kaninen sträcker på sig igen. Skummet står högt och ångan ringlar. Kranen stängs | Är det fullt nu? *(paus 1 s)* Ja! Nu är det fullt! | förtjust `kanin-gullig-2`, öronen reser sig; `kran` slutar |
| 8 | Kaninen skuttar upp på pallen och lugnt ner bakom karets kant | Ett skutt … två skutt … plask! | `tass`, `tass`, `plask` |
| 9 | Bara huvudet ovanför kanten, ångan ringlar, kaninen blundar en stund | Mmm … varmt och skönt. | mysig suck `kanin-gullig-4` |
| 10 | Närbild öronen. Snön blir droppar som rinner ner och försvinner på *"borta!"* | Titta, snön smälter! Först öronen. Smälter, smälter … borta! | `droppar`, `tindra`; öronen vippar |
| 11 | Närbild nosen, samma sak, nosen rycker | Och nosen. Smälter, smälter … borta! | `tindra`, kort fniss `kanin-gullig-3` |
| 12 | Huvudet i karet. Kaninen tittar åt vänster, sedan åt höger | Oj, lite snö är kvar. Kaninen vet inte var. | frågande `kanin-gullig-7` |
| 13 | Bred bild för frågan, sedan klipp till närbild på snötussen mellan öronen. Den skimrar efter ca 3 s | Kan du hjälpa kaninen? Kan du se var snön är? *(paus 5 s)* | tyst, `lysmask` på skimret |
| 14 | Snötussen skimrar tydligt, smälter till droppar | Ja, där! Ja, på huvudet! Smälter, smälter … borta! | `tindra`, förtjust `kanin-gullig-2` |
| 15 | Kaninen ler, öronen vippar | Nu är du varm! *(paus 1 s)* Hm … vad ska vi leka? | nöjd `ja-babbel` |
| 16 | Kritan kommer in och ritar en båt på vattnet: konturen i ett drag (ca 4 s), väntar och svävar, sedan fylls den riktiga båten i | Titta! Kritan ritar något. *(gisspaus 3 s)* En båt! Varsågod, kaninen. | `krita-ritar`, `glitter` |
| 17 | Kaninen tittar på båten, öronen reser sig, och nickar mot kritan | Tack, kritan! | nyfiken `kanin-gullig-5`, sedan förtjust `kanin-gullig-2` |
| 19 | Båten glider lugnt fram och tillbaka framför kaninen och guppar. Kaninen följer den med blicken | *(efter en stund)* Båten åker. Tut, tut! | `bat-tut`, `ja-babbel` |
| 20 | Kaninen sjunker ner i skummet. Båten glider dit. Kaninen kommer upp, och båten sitter på huvudet | *(när kaninen kommer upp)* Oj! Där är ju båten! | `blubb`, `plask`, fniss `kanin-gullig-3b` |
| 21 | Öronen vippar, båten glider ner på vattnet igen | – | `plask`, `bat-tut` |
| 22 | Helbild. Malin föreslår, kaninen skakar på huvudet och sjunker ner så att bara öronen syns | Nu ska du väl gå upp? | trumpen `kanin-gullig-6` |
| 23 | Närbild, bara öronen och ögonen ovanför skummet | *(roat)* Oj då. Kaninen vill visst inte gå upp. *(paus 1 s)* Hm … vad gör vi nu? | trumpen `kanin-gullig-6b` |
| 24 | Kritan ritar en fläkt vid dörröppningen i vänster kant, vänd mot karet: konturen (foten, ringen, bladen), väntar, sedan fylls den i | Titta! Kritan ritar igen. *(gisspaus 3 s)* En fläkt! | `krita-ritar`, `glitter` |
| 25 | Kaninen kommer upp till nosen och tittar på fläkten | Tack, kritan! | nyfiken `kanin-gullig-5` |
| 26 | Fläktens blad börjar snurra lugnt. Fläkten drar in mjuka varma virvlar genom dörröppningen från köket och blåser dem mot karet: de syns först bakom fläkten och kommer ut framför den. Båten glider sakta åt höger i vinden | Fläkten blåser. | `flakt-1` lågt i loop under fläkten |
| 27 | Närbild, virvlarna når nosen. Nosen rycker, öronen lyfts ett i taget | Vad är det som luktar? *(paus 3 s, barnet sniffar med)* Sniff, sniff … | `nos` |
| 28 | Klipp till närbild på virvlarna, där små pepparkakor (ett hjärta, en stjärna) svävar förbi, sedan tillbaka till kaninen med stora glada ögon | Pepparkakor! Från köket! | `glimt`, `jippi` |
| 29 | Helbild. Kaninen skuttar upp på pallen och ner på golvet. Den huttrar lite | *(när kaninen landat på golvet)* Nu vill kaninen gå upp! *(när den huttrar)* Brr … lite kallt. | `plask`, `tass`, `huttra` |
| 30 | Kaninen skuttar till kroken. Handduken glider ner och lägger sig över axlarna och ryggen, öppen fram (ritad i kod) | Handduken! Varm och mjuk. | `prassel-tyg`, mysig suck `kanin-gullig-4` |
| 31 | Kaninen vänder sig mot vänster (riktningsposen), nosen rycker mot doften | Nu ska kaninen äta pepparkakor. Mums! | `mmm` |
| 32 | Helbild, kaninen vinkar med handduken på, båten guppar, fläkten snurrar långsamt | Hej då, kaninen! Hej då, båten! | hej då `kanin-gullig-8`, `bat-tut` |
| 33 | Kaninen skuttar mot vänster kant och stannar i kanten. Fläkten stannar | Hej då! Vi ses snart! | `tass` |
| 34 | Kritirisen runt kaninen, 0,6 s svart | – | – |

**Frågor till barnet (paus):** *"Kan du se var snön är?"* (5 s), väntan på badet (ca 4 s utan replik) och en luktpaus på *"Vad är det som luktar?"* (3 s). *"Kan du vänta med kaninen?"*, *"Ska vi säga tack?"*, *"Tack!"*, *"Kan du blåsa som fläkten?"* och *"Fff …"* ströks (Sanna 2026-11-18: hoppa över dem i stället för en ny tagning).

**Fniss:** tre (11, 20, och `ja-babbel` i 19), aldrig två rader i följd.

## Så rör det sig (inom riggens gränser)

Kaninens kropp är en del. Öronen, armarna, benen och svansen har egna rötter. Inget snurrar, inget böjs, och hoppen är lugna (`karaktarer/kaninen-kanel.md`, skillen `lk-figur`).

| Rörelse | Hur |
|---|---|
| Skuttar in, fram till karet, upp på pallen, i och ur karet | riggens skutt, ett lugnt skutt per steg som i 020, huk före och tryck vid landningen |
| Huttrar | hela figuren skakar ±3 px i sidled, 6 Hz, i 0,8 s. Öronen hänger (`ledsen` lätt). Ingen vridning |
| Tittar över kanten | posen `strack` (sträcker på sig), ögonen tittar ner i karet, tillbaka till stående |
| Karet fylls | kranstrålen rinner hela tiden från rad 4 till 7. Karet syns från sidan utan öppning, så fyllningen syns som skummet som stiger över kanten i tre steg (lite i 5, halvt i 6, högt i 7) och ångan som blir mer. Vattenljudet går hela väntan |
| Väntar | kaninen står still men lever: huttrar, blinkar, tittar på kranen och sedan ut mot barnet. Bilden står aldrig helt still |
| Snön | vita snötussar i kod (som `rekvisita/snotuss.md`) på öronen, nosen och mellan öronen. De följer riggen som lerfläckarna i 020. På *"smälter"* krymper tussen och 3–4 droppar rinner nedåt. Tussen är borta exakt på *"borta!"* (`BORTA` i `rader.mjs`) med `tindra` |
| Ånga | 3–4 mjuka vita band som ringlar sakta uppåt från vattnet och tonar bort. Från rad 4 till rad 15 |
| Båten | guppar och glider på vattnet som i 020 (`gupp`), hoppar aldrig och vänds aldrig. Hamnar på huvudet för att kaninen kommer upp under den, glider av när öronen vippar. Fläktens vind för den sakta åt höger |
| Sjunker, kommer upp | hela figuren rakt ner bakom kanten och rakt upp, som i 020 |
| Vill inte | skakar på huvudet (hela kroppen lutar ±6° tre gånger), sjunker ner till ögonen |
| Fläkten | står vid dörröppningen i vänster kant, vänd mot karet. Ett urklipp som står still. Bara bladen (eget lager eller ett kodritat hjul över urklippet) snurrar, lugnt och jämnt |
| Doften | 3–4 mjuka varma virvlar (ljusbrun, nästan genomskinlig krita) som fläkten drar in genom dörröppningen och blåser mot nosen på ca 3 s. Inga virvlar innan fläkten snurrar, så att barnet ser att det är fläkten som tar in doften. I rad 28 svävar två små pepparkakor med |
| Nosen luktar | nosen rycker 3 gånger (`puff` som trynet i 020), öronen lyfts ett i taget |
| Handduken | hänger på kroken från början (urklippet `handduk`). När den glider ner byts den mot en **handduk ritad i kod** som följer riggen, som kaninens vinterkläder i 039 (urklipp var svåra att passa på kroppen): en mjuk cape över axlarna och ryggen, öppen fram som en öppen badrock så att magen och armarna syns. Samma färg och ränder som urklippet. Ingen ärm, inget som ska passa runt armarna |
| Vinkar | armen bakom kroppen, snett ut förbi kanten. Hela armen syns |
| Ansiktet | glada uttryck med öppna ögon. Blundar bara i rad 9 (*"varmt och skönt"*) |

## Kameran

Hårda klipp mellan stillastående utsnitt, som 020: helbild för förflyttningar (1, 5–8, 22, 29, 32–33), närbild på det som nämns (snön på örat 3, kranen 4, öronen 10, nosen 11, snön mellan öronen 13–14, pepparkakorna 28), sakens utsnitt medan kritan ritar (16, 24). Varje utsnitt står minst 3 s.

## Ljudet

- **Kaninens röst:** `kanin-gullig` 1–8 (+`b`), `hej-babbel`, `ja-babbel`, från 022. Allt finns.
- **Kyla:** `huttra` 1–2, `brr` 1–4, `knarr-sno` (första skuttet in). Finns.
- **Badet:** `kran`, `plask`, `blubb`, `bat-tut`, `tindra`, `glitter`, `krita-ritar`. Finns.
- **Nya (Openverse, CC0, Sanna valde 2026-11-18):** `droppar-1` (en vattendroppe) och `flakt-1` (bordsfläktens surr, i loop).
- **Platsmatta:** `badrumsljud-2`, lågt. **Ingen ny musik.**

---

## Malins repliker (ElevenLabs, en tagning)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En snöflinga!
[happy] Hej, kaninen! Hej, hej!
[surprised] Oj, oj, oj! Du är ju alldeles kall!
[warmly] Har du lekt i snön?
[cheerfully] Nu sätter vi på vattnet.
[curious] Är det fullt nu?
[warmly] Nej, inte än. Vi får vänta lite.
[curious] Är det fullt nu?
[excited] Ja! Nu är det fullt!
[cheerfully] Ett skutt … två skutt … plask!
[happy sigh] Mmm … varmt och skönt.
[excited] Titta, snön smälter!
[happy] Först öronen. Smälter, smälter … borta!
[happy] Och nosen. Smälter, smälter … borta!
[curious] Oj, lite snö är kvar. Kaninen vet inte var.
[warmly] Kan du hjälpa kaninen? Kan du se var snön är?
[excited] Ja, där! Ja, på huvudet!
[happy] Smälter, smälter … borta!
[happy] Nu är du varm!
[curious] Hm … vad ska vi leka?
[excited] Titta! Kritan ritar något.
[happy] En båt! Varsågod, kaninen.
[happy] Tack, kritan!
[playfully] Båten åker. Tut, tut!
[laughs] Oj! Där är ju båten!
[cheerfully] Nu ska du väl gå upp?
[chuckles] Oj då. Kaninen vill visst inte gå upp.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar igen.
[happy] En fläkt!
[happy] Tack, kritan!
[warmly] Fläkten blåser.
[curious] Vad är det som luktar?
[playfully] Sniff, sniff …
[excited] Pepparkakor! Från köket!
[excited] Nu vill kaninen gå upp!
[playfully] Brr … lite kallt.
[happy] Handduken! Varm och mjuk.
[cheerfully] Nu ska kaninen äta pepparkakor. Mums!
[happy] Hej då, kaninen! Hej då, båten!
[happy] Hej då! Vi ses snart!
```

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte, inget kritsvep i berättelsen. Zoom bara in i teckningen
- [x] Inga djurnamn: *"kaninen"*, *"båten"*, *"fläkten"*
- [x] Inget *"Vad kan det vara?"*, inget *"Vad säger man?"*, inga utdragna ord
- [x] Varsågod (båten) och *"Tack, kritan!"* två gånger (båten, fläkten)
- [ ] **Färre frågor än receptets tre:** snön (5 s) och luktpausen (3 s), plus väntan utan replik. Tack-frågan och blåsfrågan ströks
- [x] Kritan ritar två gånger i scenen: båten, sedan fläkten. Handduken hänger redan på kroken
- [x] Inget läskigt: kylan är mild (huttra, *"brr"*), ingen gråt
- [x] Ingen ny musik
- [ ] **Avsteg som receptet redan har:** ingen sång, fler än 6 utsnitt
- [ ] **Nytt avsteg:** problemet *"vill inte"* kommer sent (kaninen vill gärna bada). Se Kärnans ordning ovan

## Öppet (för Sanna)

1. **Titeln:** *Kaninen badar varmt*, eller *Kaninen fryser*, *Kaninen blir varm*?
2. **Julkalendern:** pepparkakor och snö passar som lucka. Ska 041 bli en julbilderbok (julhandduken `handduk-jul`, något pynt i badrummet), eller ett vanligt vinteravsnitt?
3. **Just nu görs bara två avsnitt åt gången** (039 och J07, `produktion/youtube/julkalender-parkerade.md`). Ska 041 vänta efter manuset, eller ta en av platserna?
