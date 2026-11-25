# Avsnitt 054 – Lammet badar (plan)

**Status:** grind 1 (manus) **godkänd av Sanna 2026-11-25**. Öppet 1–3 obesvarat, så tills vidare gäller: den rutiga handduken från 023 i större skala, rad 26 kvar, titeln *Lammet badar*. `rost.txt` skriven. **Samtalsrepliker tillagda 2026-11-25 (11 nya, 3 ändrade), godkända av Sanna samma dag.** **Grind 2 (handduken och kroken) godkänd av Sanna 2026-11-25** (se Rekvisita). **Grind 3 (rösten) godkänd av Sanna 2026-11-25:** två tagningar (1a, 1b) i ElevenLabs, båda delade i 42 repliker. 1b ligger normaliserad i `assets/ljud/roster/lammet-badar/` (längderna i `rost-langder.txt`). Provlyssning rad för rad, först A sedan B: `ljud/provlyssna-rost-a-b.m4a`. **Grind 4 (ljuden) klar och grind 5 (animatiken, `storyboard/animatik.mp4`) byggd 2026-11-25, väntar på Sanna.**

Bilderbok i serien *Djuren hittar på!* ([`format/bilderbok.md`](../../format/bilderbok.md), skillen `bilderbok`). Förlagor: 020 Grisen badar och 041 Kaninen badar varmt. Malin pratar med lammet, och lammet svarar bara med ljud, öron och ansikte. Samma badrum och badkar som 020 och 041.

**Det nya mot 020 och 041:** lammet vill gärna bada, och problemet kommer **efter** badet: ullen blir platt och blöt och lammet fryser. Kritan ritar en stor handduk, och det som görs tre gånger är att torka (*"Blött … blött … torrt!"*). Överraskningen är att lammet blir ett fluffigt ullmoln. Barnet letar efter badankan, som har gömt sig i skummet med näbben framme. Ingen skrubbning, ingen lera, ingen kyla före badet, ingen "vill inte".

| | |
|---|---|
| **Titel** | Lammet badar (avsnitt 54). Inget titelkort: introt är 1 s logotyp |
| **Figurer (1)** | **Lammet Ludde** (v2, riggad, `assets/karaktarer/lammet-ludde/premium/`, `✅ Referensark klart`, ändras inte) |
| **Platser (1)** | **Badrummet** (`bakgrunder/badrummet.md`, från 020/041). Kroken på väggen till vänster är **tom** från början. Inget platsbyte |
| **Kritan ritar (2)** | **badankan** i ritintrot (`rekvisita/badanka.md`, finns, konturen från 020) · **den stora handduken** på kroken i scenen (se Rekvisita nedan) |
| **Saker som finns** | badkaret, pallen, badankan, handduken (rutig rosa, `handduk-rutig`) |
| **I kod, inga nya bilder** | skummet längs kanten och skumtussen där ankan gömmer sig · skumhatten · den blöta ullen (mörkare, slätare, droppar, en liten pöl) · ulltussarna som växer ut (öronen, magen, hela lammet) · skimret · droppar på ankan |
| **Kärna** | Lammet badar med badankan. Badet är skönt, men när lammet kliver upp är ullen platt och blöt, och lammet fryser. Kritan ritar en stor handduk: *"Varsågod!"* – *"Ska vi säga tack?"* – *"Tack!"* Handduken torkar öronen, magen och till sist hela lammet: *"Blött … blött … torrt!"* Under handduken har lammet blivit ett fluffigt ullmoln. Men var är ankan? Barnet hittar näbben i skummet. Ankan är blöt, och lammet är torrt. Hej då! |
| **Barnet gör** | gissar vad kritan ritar (två gånger) · säger tack · letar efter ankan i skummet |
| **Tema, subtilt** | **blött och torrt.** Bara i upprepningen *"Blött … blött … torrt!"* (tre gånger) och i en sista jämförelse (*"Ankan är blöt … och lammet är torrt!"*). Ingen förklaring, ingen lektion |
| **Favoriter** | 🐑 lamm · 🦆 badanka · ☁️ ullmoln |

**Kärnans ordning:** lek i badet (ankan, skumhatten) → problemet (blöt, platt, fryser) → kritan ritar handduken → tack → torka tre gånger → överraskningen (ullmolnet) → ankan är borta → barnet hittar den → hej då. Ankan glider in i skummet medan lammet kliver upp (rad 7), utan att Malin säger något, så att ett barn som tittar noga redan har sett vart den tog vägen.

**Längd:** ca 4:00–4:15 (efter samtalsreplikerna) med 0,7 s extra luft per replik (`GLES`). Längden kommer ur reaktionsslag (rad 2, 10, 16, 20) och närbilder, inte segare rörelser.

**Short:** uppslag 15–19 (torka tre gånger, ullmolnet), ca 45 s.

---

## INTRO *(gemensamt, ca 1 s)*
Lilla Kritan-logotypen, 1 s. Ingen jingel, inget titelkort.

## KRITAN RITAR (ca 14 s) – papper
*Kritan ritar **badankan**, inte lammet: konturen i ett drag (ca 2,8 s) i badankans mörkare gula ton: den runda kroppen, huvudet, näbben som ett eget litet drag, den uppåtsvängda stjärten. Konturen står kvar medan barnet gissar (kritan svävar och vickar bredvid, knackar aldrig). Sedan fylls den riktiga badankan i inifrån med `glitter`, och ögat blinkar en gång.*
> **MALIN:** Kritan ritar …
> **MALIN:** Hm … vad blir det nu?
> *(gisspaus ca 4 s)*
> **MALIN:** Oj! En badanka!

**→ Zoom in i teckningen** (den enda zoomen). Vitt över, och i första bilden guppar ankan i karet bland skummet.

## BADRUMMET

| # | Bild (en rörelse) | Malin säger | Lammet svarar, ljud |
|---|---|---|---|
| 1 | Helbild. Ankan guppar i karet. Lammet trippar in från vänster, stannar på sin plats och vinkar | Hej, lammet! Hej, hej! | `tass` per steg, `ba-gullig-1` |
| 1b | Halvnära. Lammet tittar mot karet och tillbaka. I pausen nickar det och öronen vippar | 🆕 Vill du bada? *(paus, lammet svarar)* 🆕 Ja, vad kul! | förtjust `ba-gullig-2` i pausen |
| 2 | Klipp till närbild på ankan i karet, den piper (1,5 s). Tillbaka till lammet: stora glada ögon, öronen reser sig (reaktionsslag) | Titta! Ankan är redan i badet. | `badanka-pip-1`, förtjust `ba-gullig-2` |
| 3 | Helbild. Lammet skuttar upp på pallen, ett skutt per steg, och ner bakom karets kant | *(efter första skuttet)* Ett skutt … två skutt … plask! | `tass`, `tass`, `plask` |
| 4 | Bara huvudet ovanför kanten, skummet runt om, lammet blundar en stund | 🆕 Är det varmt? *(paus, lammet svarar)* ✏️ Mm … varmt och skönt. | mysig suck `ba-gullig-4` i pausen |
| 5 | Ankan glider fram till lammet. Lammet och ankan "pratar" i tur och ordning | *(efter första utbytet)* Ni pratar visst med varandra. 🆕 Vad säger ankan? *(paus: pip, lammet tittar på Malin)* 🆕 Jaså, det tycker ankan! | `ba-gullig-7` – `badanka-pip-1` – `ba-gullig-7b`, sedan `badanka-pip-2` i pausen |
| 6 | Lammet sjunker ner i skummet och kommer upp med en stor skumtuss på huvudet, mellan öronen | *(när lammet är uppe)* Oj! En skumhatt! | `blubb`, `plask`, `ba-fniss` (fniss 1) |
| 7 | Halvnära. Skumhatten glider av när öronen vippar. Lammet nickar | Nu är du ren! Nu går vi upp. | `plask`, nöjt `ba-gullig-2b` |
| 8 | Helbild. Lammet kommer upp bakom kanten, skuttar till pallens översta steg och ner på golvet. **Samtidigt, utan replik:** ankan guppar sakta bort till karets bortre ände och glider in i den stora skumtussen där. Bara den orange näbben sticker fram | *(när lammet landat)* Ett skutt … två skutt … ner! | `tass`, `tass`, `droppar` |
| 9 | Närbild. Ullen är platt och blöt (mörkare, slät), öronen hänger, droppar faller från öronen och magen. Lammet tittar ner på sig själv | *(efter två droppar)* Oj, oj, oj! Ullen är alldeles blöt! | `droppar` per droppe, förvånat `ba-gullig-5` |
| 10 | Lammet huttrar (små skak i sidled), en liten pöl växer under fötterna | Och platt. *(paus 1 s)* ✏️ Brr … fryser du? *(paus, lammet nickar och huttrar)* 🆕 Åh, lilla vän. | `huttra`, trumpet `ba-gullig-6` i pausen |
| 11 | Lammet tittar åt vänster mot väggen. Klipp till kroken: den är tom. Tillbaka till lammet | Hm … vad gör vi nu? | frågande `ba-gullig-7` |
| 12 | Utsnittet kring kroken. Kritan kommer in uppe till höger och ritar en stor handduk på kroken: hängöglan, kanterna, rutorna (ca 3 s). Väntar och svävar | Titta! Kritan ritar något. *(gisspaus 3 s)* | `krita-ritar` |
| 13 | Den riktiga handduken fylls i inifrån. Kritan flyger ut | En handduk! En stor handduk! Varsågod, lammet. | `glitter`, förtjust `ba-gullig-2` |
| 14 | Lammet tittar på handduken, öronen reser sig lite | Ska vi säga tack? *(paus 2,5 s)* | nyfiket `ba-gullig-5b` |
| 15 | Lammet nickar direkt | Tack! | förtjust `ba-gullig-2b` |
| 16 | Helbild. Handduken glider lugnt ner från kroken och lägger sig över lammets huvud och öron. Den gnuggar i små cirklar. På *"torrt!"* lyfts den, och öronen är fluffiga: små runda ulltussar växer ut, öronen vippar | *(när handduken ligger på, lammet blundar nöjt en kort stund)* 🆕 Åh, vad mjuk! Först öronen. Blött … blött … torrt! | `prassel-tyg` medan den gnuggar, `puff` + `tindra-3` på *"torrt!"* |
| 17 | Närbild på de fluffiga öronen. Lammet tittar upp på dem, blinkar, ler (reaktionsslag, ingen replik, ca 2,5 s) | – | förtjust `ba-gullig-2` |
| 18 | Halvnära. Handduken glider ner framför magen och gnuggar. På *"torrt!"* glider den undan: magen är fluffig | Och magen. Blött … blött … torrt! | `prassel-tyg`, `puff` + `tindra-4` |
| 19 | Helbild. Handduken lyfter och lägger sig framför **hela** lammet, från huvudet ner till golvet (nederkanten slutar 4 px ovanför golvet). Öronen och ullen på sidorna tittar fram. Den gnuggar. På *"torrt!"* lyfts den rakt upp och glider tillbaka till kroken | Och sist … hela lammet! Blött … blött … torrt! | `prassel-tyg`, `tindra-3` |
| 20 | Halvnära. Lammet är ett runt, fluffigt **ullmoln**: tussarna har växt ut runt hela kroppen, ansiktet syns mitt i. Lammet blinkar förvånat (0,3 s stilla), sedan stora glada ögon | *(efter förvåningen)* Oj! Ett ullmoln! | `puff` på var tredje tuss, `ba-fniss` (fniss 2) |
| 21 | Lammet gör ett lugnt glatt skutt, ullen gungar mjukt efter | 🆕 Är det skönt nu? *(paus, lammet svarar)* ✏️ Mm, så mjukt och varmt! | mysig suck `ba-gullig-4b` i pausen |
| 22 | Lammet vänder sig mot karet och tittar åt vänster, sedan åt höger. Bred bild på karet: näbben sticker fram ur skumtussen i bortre änden | Men … var är ankan? | frågande `ba-gullig-7b` |
| 23 | Bred bild de första 2 s, sedan klipp till närbild på skumtussen med näbben. Efter ca 3 s skimrar näbben svagt. Skummet andas lite | Kan du hjälpa lammet? Ser du ankan? *(paus 5 s)* | tyst, `glimt` på skimret |
| 24 | Kvar i närbilden: ankan glider fram ur skummet och piper | *(när ankan är framme)* Ja, där! I skummet! | `badanka-pip-1`, förtjust `ba-gullig-2` |
| 25 | Närbild på ankan med droppar, sedan (mitt i raden) klipp till det fluffiga lammet | Ankan är blöt … och lammet är torrt! | `badanka-pip-2`, nöjt `ba-gullig-1b` |
| 26 | Halvnära. Lammet skakar lite på sig, och en liten ulltuss flyger i en båge och landar på ankans huvud | *(när tussen landat)* Nu har ankan också en hatt! *(ankan piper, lammet fnissar)* 🆕 Oj, så fint! | `puff`, `badanka-pip-1`, fniss `ba-gullig-3` (fniss 3) |
| 26b | Halvnära. Lammet tittar på Malin, ankan guppar bredvid. I pausen nickar lammet | 🆕 Var det ett roligt bad? *(paus, lammet svarar)* 🆕 Ja, vad bra! | förtjust `ba-gullig-2b` i pausen |
| 27 | Helbild. Lammet vinkar (armen bakom kroppen, hela armen syns), ankan guppar med ullhatten | Hej då, lammet! Hej då, ankan! | hej då `ba-gullig-8`, `badanka-pip-2` |
| 28 | Lammet vinkar lugnt vidare | Hej då! Vi ses snart! | `ba-gullig-8b` |
| 29 | Kritirisen runt lammet och ankan, 0,6 s svart | – | – |

**Frågor till barnet (paus):** gissa ritintrot (ca 4 s), gissa handduken (3 s), *"Ska vi säga tack?"* (2,5 s), *"Ser du ankan?"* (5 s). Inga uppmaningar att göra något med kroppen.

**Fniss:** tre (6, 20, 26), aldrig två rader i följd, aldrig över Malin.

**Samtal (Sanna 2026-11-25, mönstret från 052):** Malin frågar lammet, lammet svarar med sitt ljud i pausen (ca 1,2 s), och Malin reagerar kort som om hon förstått. Lammets svar och nick kommer alltid före reaktionen. 🆕 = ny replik, ✏️ = ändrad replik.

## Så rör det sig (inom riggens gränser)

Lammets kropp är en del. Öronen, armarna, benen och svansen har egna rötter. Inget snurrar, inget speglas, inget böjs, hoppen är lugna (`karaktarer/lammet-ludde.md`, skillen `lk-figur`).

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång från vänster, stannar före repliken |
| Skuttar upp, i och ur karet | ett lugnt skutt per steg som i 020, huk före och tryck vid landningen. Ur karet: lammet stiger först rakt upp bakom kanten tills fötterna är ovanför den, sedan skuttet till pallen. Inget går genom kanten |
| I karet | riggen bakom karet som i 020 (`ikar`): bara huvudet och en skymt av axlarna syns |
| Pratar med ankan | lammet lutar huvudet lätt mot ankan på sitt ljud, ankan guppar på sitt pip |
| Skumhatten | lammet sjunker rakt ner bakom skummet och rakt upp. En stor skumtuss (kod) ligger mellan öronen och glider av åt sidan när öronen vippar i rad 7 |
| Ankan gömmer sig | ankan guppar (`gupp`) och glider sidledes bort till bortre änden och in **bakom** den stora skumtussen (tussen ligger i lagret framför). Bara näbben syns vid tussens kant. Den hoppar aldrig och vänds aldrig |
| Blöt ull | i kod över kroppen, maskat med kroppens form: en svag gråblå ton (ca 30 %) som gör ullen mörkare och dämpar krullarna, riggens `bred −0,03`. Öronen hänger (`ledsen` lätt). Droppar faller lugnt från örontopparna och magen, en i taget (ca var 0,8 s), och landar i en liten ljusblå pöl som växer under fötterna. Inga droppar i ögonen, ingen gråt |
| Huttrar | hela figuren skakar ±3 px i sidled, 6 Hz, 0,8 s. Ingen vridning |
| Kroken | en liten grå krok på väggen till vänster om pallen, tom tills kritan ritar. Lammet står under den efter rad 8 |
| Handduken torkar | handduken är en **stel urklippt bild**: den flyttas och vrids lite, men skalas eller skevas aldrig. Den ligger alltid **framför** lammet, ovanpå det den torkar. Gnuggandet är små cirklar (±8 px, ±3°, 1,4 s). Den lyfts precis på *"torrt!"* (ordets tid mäts med whisper och läggs i `BORTA`, som i 020) |
| Ulltussarna | vita runda tussar i kod (varmvit, svagt kritkorn, svag gräddvit skugga i nederkanten), som växer ut en i taget på 0,1 s var: tre per öra (rad 16), fem på magen (rad 18), sedan 14–16 runt hela kroppens kant (rad 20). Ansiktet hålls fritt. Den blöta tonen och dropparna försvinner med tussarna |
| Ullmolnet | tussarna gungar mjukt (±2 px, olika perioder) efter skuttet i rad 21. Inget studsar |
| Ulltussen till ankan | en tuss lossnar i en lugn båge (0,9 s) och landar mellan ankans huvud och stjärt, guppar sedan med ankan |
| Vinkar | armen bakom kroppen, snett ut förbi kanten (ca 60°), hela armen syns, glider upp på 0,6 s |
| Ansiktet | glada uttryck med öppna ögon. Blundar bara i rad 4 (*"varmt och skönt"*) |

## Kameran

Hårda klipp mellan stillastående utsnitt (`format/bildutsnitt.md`, `verktyg/utsnitt.js`): helbild för förflyttningar och nya saker (1, 3, 8, 16, 19, 27), närbild på det som nämns (ankan 2, ullen 9, kroken 11, öronen 17, ankan 24–25), kritans utsnitt kring kroken (12–13), frågans närbild på skumtussen (23). Varje utsnitt står minst 3 s. Bilden står aldrig helt still: blinkningar, andning, gupp, droppar, skimret.

## Ljudet

- **Lammets röst:** `ba-gullig` 1–8 (+`b`) och `ba-fniss`, från 024. Allt finns.
- **Ankans röst:** `badanka-pip` 1–2, från 020. Finns.
- **Badet:** `plask`, `blubb`, `droppar`, `tass`, `huttra`, `puff`, `prassel-tyg`, `glitter`, `glimt`, `tindra-3`/`4`, `krita-ritar`. Finns. Kolla vid grind 4 om `prassel-tyg` låter som en handduk som gnuggar; annars söks ett mjukt handduksljud på Openverse.
- **Platsmatta:** `badrumsljud-2`, lågt. **Ingen ny musik.**

---

## Ljudet (grind 4, 2026-11-25)

Alla ljud finns, inga krediter. `plask` 1–4, `droppar-1`, `tass` 1–6, `huttra-1`, `puff` 1–3, `prassel-tyg-1` (handduken glider), **`handduk-gnugg-4`** (handduken torkar, ElevenLabs via ljudkarta-sessionen, 1,4 s per torkning), **`blubb-1`** (lammet sjunker i skummet, nytt likaså), `glitter` 1–2, `glimt-1`, `tindra` 3–4, `krita-ritar` 1–2, lammets `ba-gullig`/`ba-fniss` och ankans `badanka-pip`. Mattor: `skogsljud-1` under ritintrot, sedan `badrumsljud-2` lågt. Ingen ny musik.

## Storyboard och animatik (grind 5, väntar på Sanna)

`storyboard/` (byggd 2026-11-25 med tagning 1b, rad 33 och 39 ur 1a): 38 stillbilder ur `storyboard/scen.html`, tabellen i `storyboard/storyboard.md`, `storyboard/index.html` och **`storyboard/animatik.mp4` (3:50)** med Malins repliker, lammets och ankans ljud, effekterna och mattorna på sina tider. Tiderna räknas i `storyboard/rader.mjs` ur replikernas längder, så byts en replik byggs allt om med `node avsnitt/054-lammet-badar/storyboard/bygg.mjs --animatik`. `scener/badet/rader.json` är skriven för scenen.

- Handduken hänger på kroken (434 px, utan knopp) och läggs framför hela lammet; öron och ull på sidorna syns.
- Blöt ull: lammet blir gråblått och platt, utan streck. Ullmolnet är en krans av tussar runt kroppen.
- Ankan gömmer sig bakom skumtussen vid kranen med näbben framme (närbilderna 23a–24).
- **Scenen (grind 6, snabb förhandsvisning) byggs först när animatiken är godkänd.**

## Omgång 2: förslag (Sanna 2026-11-25, väntar på ja)

Sannas feedback på förhandsvisningen: *"maybe needs a brush to make ull flat. dont throw hatt on anka. needs some polish and faster pace"*, *"something a bit more engaging maybe something getting lost in bathtub"* (valde: **borsten försvinner i badet**), *"maybe play with boat toy in bath and kritan ritar"*, *"better rigs walking in and jumping in bath more reactions, close crops and face expressions"*.

**Ny gång** (det som står kvar är godkänt och redan inspelat; 🆕 = ny replik, ♻️ = befintlig fil):

| Del | Vad händer | Malin |
|---|---|---|
| Ritintro, hej, badet, skumhatten | Som förut. **Borsten ligger på karets kant** från början, så att barnet har sett den. Lammet **går in** med riggens gång (inte små skutt) och **hoppar ner i badet** med en tydlig huk, ett plask och en närbild på det glada ansiktet | ♻️ 1–15 |
| **Kritan ritar en båt** (ny, mitt i badet) | Kritan kommer in över badet och ritar båten (041:s `badbat`, kontur finns). Lammet tittar förvånat (närbild), sedan stora glada ögon. Lammet knuffar båten med nosen, båten glider bort till ankan och tillbaka. Vågen från båten får **borsten att glida ner i skummet**, *plopp*, ingen märker det (barnet kanske) | ♻️ 22 *"Titta! Kritan ritar något."* ♻️ 2 *"Hm … vad blir det nu?"* 🆕 *"En båt! En liten båt i badet!"* 🆕 *"Tut, tut! Båten åker till ankan."* |
| Upp ur badet, blött, handduken ×3, ullmolnet | Som förut, snabbare | ♻️ 15–32 |
| **Borsten är borta** (ersätter ankans gömlek och hatten) | Ullmolnet är jättefluffigt, ullen står åt alla håll (närbild). Lammet tittar på kanten där borsten låg: tom (närbild). Paus 4–5 s på badet: **skaftet sticker upp ur skummet** och skimrar efter 3 s | 🆕 *"Oj, vad fluffigt! Nu behöver vi borsten."* 🆕 *"Men … var är borsten?"* 🆕 *"Kan du hjälpa lammet? Ser du borsten?"* ♻️ 35 *"Ja, där! I skummet!"* |
| Ankan hjälper | Ankan glider fram och knuffar borsten till kanten, lammet tar den (tassen framför skaftet) | 🆕 *"Ankan hjälper till! Tack, ankan!"* |
| **Borsta tre gånger** | Borsten går lugnt över öronen, magen, hela lammet; ullen blir slät och fin för varje drag (närbild på ansiktet efter varje gång) | 🆕 *"Borsta … borsta … så fint!"* (×3, en tagning per gång) |
| Hej då | Som förut | ♻️ 38 *"Oj, så fint!"*, 39–42 |

Stryks: replik 33, 34, 36, 37 (ankan gömmer sig, hatten på ankan).

**Tempo och puts (gäller hela filmen):** kortare luft (0,7 → 0,35 s per rad), lammets svarspaus 1,3 → 1,0 s, kortare väntan i ritintrot och handdukens gisspaus; fler reaktionsslag med närbild på ansiktet (förvånad, glad, frusen, stolt) och tydligare uttryck i öronen. Krit-gnistor som klistermärken, små såpbubblor som stiger ur skummet.

**Kameran (Sanna: *"maybe some traveling camera from learnings?"*):** i stället för stillastående utsnitt får varje vy en rörelse som i 3D-scenerna (`verktyg/kamera3d.mjs`): **glid** (mjuk start och stopp), **push** (långsam inåkning på reaktioner, t.ex. 1,7 → 1,9 på ansiktet), **settle** (kommer in och landar efter ett klipp), högst 3 s **hold**. Kameran **följer** lammet när det går in och hoppar upp på pallen, och **parallax**: förgrunden (skummet, karets kant) rör sig ca 12 % mer än kameran när den åker, golvplattan står still. Klippen mellan vyerna är kvar (zoomar mellan platser blir inte långa åkningar).

**Rörelsen (Sanna: *"better rigs walking in and jumping in bath"*):** lammet går in med riggens gångcykel (`lk-figur`), hoppar upp på pallen och ner i badet med tydlig huk, uppskjut och landning (plask och skumstänk), lugnt men tydligt.

**Behövs:** borsten (ny sak, 4 bilder i Flow som du väljer bland, gratis) och ca 7 nya repliker i en kort ElevenLabs-tagning (krediter). Båten finns redan.

## Lösningar från förlagorna (020, 023, 041), 2026-11-25

Gått igenom scenkoden, `rader.mjs`, manusens anteckningar och `git log` för 020 Grisen badar, 023 (handduken) och 041 Kaninen badar varmt. Feedbacksidan har inga poster för dem.

| Det som var svårt | Hur det löstes där | I 054 |
|---|---|---|
| Kliva upp på pallen och ner i karet (041, Sanna 18/11 *"improve stepping on stairs"*) | Ett skutt per steg som landar på orden, `skuttar()` med huk, armar upp i luften; stegen räknas ur `pall.png` (`STEG1`, `STEG2`) | Kopierat: `skuttar`, `skutt`, `hoppVag`, `STEG1/2`. Landar på *"skutt"*, *"två skutt"*, *"plask"* (ordtider i `SKUTT`) |
| Inget går genom karets kant | Figuren i `figurerFram` på pallen, byter till bakom karet (`ikar`) först när den är över kanten; ben, armar, skugga döljs i karet | Samma lager och tider i rad 3 och 8 (`framfor`, `ikar`), ut ur karet som 041 rad 29 |
| Hur djupt figuren sitter, skum framför | `IKAR(sjunk)`, skumtussar längs kanten i lagret framför figuren | `BADKANT` 520 så att ögonen syns, skummet andas, sjunk 520 = helt under |
| Sak på huvudet (020 runda 8: ankan *"flög upp"* på huvudet, avvisat) | Figuren dyker under och kommer upp **under** saken | Skumhatten: lammet sjunker och kommer upp med hatten på; ingen flygtur. Den glider av åt sidan ner i skummet |
| Badankan/båten | Guppar och glider sidledes, hoppar aldrig själv | `gupp()`; ankan glider bakom skumtussen (bakom skummet, inte genom), och fram igen |
| Handduken (023 `handdukFlyg`, 041 `handdukGlid`/`handdukTillbaka`) | Lyfts från kroken i en båge, tillbaka till kroken; kritan ritar den på kroken (023 rad 18d–18e) | Samma båge och väg tillbaka till kroken; kritan ritar konturen och rutorna genom `verktyg/kritan-ritar.js` |
| **Torkningen (041, Sanna 19/11 *"simplyfy"*: ingen gnuggning, inga lyfta armar)** | En lugn gungning åt varje håll (1,9 s), armarna stilla | **Ändrat i scenen:** handduken gnuggade snabbt (2,2 Hz) i storyboarden; nu gungar den lugnt med lammet (`gungLuta`, `torkar`) |
| Munnen ska synas under handduken (023 QA 11/11) | Handduken lades lägre/högre så ansiktet syns | **Ändrat:** handduken över huvudet ligger högre (riggens y 210), över öronen och hjässan; ögon och mun syns |
| Vinkningen | Armen bakom kroppen, snett ut förbi kanten | Armen 100° så att den syns utanför ullmolnet (molnet ligger längst bak i riggen) |
| Kodarmar (020, avvisade flera gånger) | Riggens egna målade armar | Inga kodarmar |
| Ljudnivåer (023: badrumsmattan för stark) | `badrumsljud-2` lågt | 0,45 som 041 |

**Inget går genom något:** kontrolleras i förhandsvisningen med täta bilder runt skutten, handduken och ulltussen som flyger till ankan.

**Handduksljudet:** Openverse-klippet var tyst. Ljudkarta-sessionen gjorde nya tagningar i ElevenLabs (`handduk-gnugg-1…4`); nr 4 (jämnast, ca −29 dB RMS, topp −9,8 dBFS) används för alla tre torkningar, kortat till 1,4 s, vol 1,3.

## Kontroll mot regler (052–057, Sanna 2026-11-25)

| Punkt | Ok | Rättat |
|---|---|---|
| 1. Rigg | Lammets senaste v2-rigg (`v2rigg('lammet-ludde')`) med dess uttryck, poser, nick och blinkningar. Inga kodarmar, ingen figur snurrar, ingen sover. Glada ansikten har öppna ögon (`F()`) | Vinkningen: armen 100° bakom kroppen så att den syns utanför ullmolnet (150 hamnade bakom huvudet). Ullmolnet ligger längst bak i riggen, så att armarna syns framför det |
| 2. Effekter | Line boil 2,5/zoom varje bildruta, ny brusbild 6 gånger/s. Vita kanter via `kant.js`. Kritan via `kritan-ritar.js` (`qa-scen`: tomt). Krit-gnistor på ankan och handduken. Varm ton 0,07, vinjett 0,14. Lammets markskugga ur riggen, papperskornet på ritpapperet | Parallax används inte: alla utsnitt står stilla (hårda klipp), så det finns ingen kameraåkning att ge djup |
| 3. Regler | 1 figur, 1 plats. Inga djurnamn. *"Ska vi säga tack?"*, aldrig *"Vad kan det vara?"*. Ritintrot ritar badankan, inte lammet. Barnet letar efter ankan. Inget går genom något: kontrollerat med täta bilder (6/s) vid skutten in och ut, handduken och ulltussen | **Malin efter handlingen:** ulltussen till ankans huvud landade efter *"Nu har ankan också en hatt!"*. Nu skakar lammet först, tussen landar 1,1 s in och repliken kommer 0,4 s efter |
| 4. Starka reaktioner | Reaktionsslag med närbild: skumhatten (6b, 7), den blöta ullen (9), handduken (13), öronen (17), ullmolnet (20), ankan i skummet (24) | **Ny närbild** på ankan med ullhatten medan Malin säger repliken och ankan piper (rad 26). Förvånade ansikten har större ögon (6b, 9, 20). **Felet `LN()`** (läste fel fält i `rader.json`) gjorde att nickar, uttrycksbyten och klipp som räknas från replikernas längd inte kom i förra förhandsvisningen; rättat |
| 5. Lärdomar | Se *Lösningar från förlagorna*: skutt per steg, lager vid karets kant, saker på huvudet utan flygtur, handduken i båge från och till kroken | Torkningen är en lugn gungning (041), handduken över hjässan så att ansiktet syns (023) |

`python3 verktyg/qa-scen.py`: boil, krit-kod och röst tomma.

## Malins repliker (ElevenLabs, en tagning)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En badanka!
[happy] Hej, lammet! Hej, hej!
[cheerfully] Vill du bada?
[happy] Ja, vad kul!
[happy] Titta! Ankan är redan i badet.
[cheerfully] Ett skutt … två skutt … plask!
[curious] Är det varmt?
[happy sigh] Mm … varmt och skönt.
[giggles] Ni pratar visst med varandra.
[curious] Vad säger ankan?
[chuckles] Jaså, det tycker ankan!
[laughs] Oj! En skumhatt!
[cheerfully] Nu är du ren! Nu går vi upp.
[cheerfully] Ett skutt … två skutt … ner!
[surprised] Oj, oj, oj! Ullen är alldeles blöt!
[gently] Och platt.
[gently] Brr … fryser du?
[warmly] Åh, lilla vän.
[curious] Hm … vad gör vi nu?
[happy] Titta! Kritan ritar något.
[happy] En handduk! En stor handduk! Varsågod, lammet.
[warmly] Ska vi säga tack?
[happy] Tack!
[happy sigh] Åh, vad mjuk!
[warmly] Först öronen. Blött … blött … torrt!
[warmly] Och magen. Blött … blött … torrt!
[playfully] Och sist … hela lammet! Blött … blött … torrt!
[surprised] Oj! Ett ullmoln!
[warmly] Är det skönt nu?
[happy sigh] Mm, så mjukt och varmt!
[curious] Men … var är ankan?
[warmly] Kan du hjälpa lammet? Ser du ankan?
[happy] Ja, där! I skummet!
[playfully] Ankan är blöt … och lammet är torrt!
[laughs] Nu har ankan också en hatt!
[happy] Oj, så fint!
[warmly] Var det ett roligt bad?
[happy] Ja, vad bra!
[happy] Hej då, lammet! Hej då, ankan!
[warmly] Hej då! Vi ses snart!
```

42 repliker (31 + 11 samtalsrepliker, 2026-11-25). `rost.txt` har samma ordning.

## Rekvisita

| Sak | Finns? | Var | Anmärkning |
|---|---|---|---|
| Badankan | ✅ finns | `rekvisita/badanka.md`, `assets/rekvisita/badanka/cut/badanka.png` | ritintrot ritar den. Konturen från 020 kan återanvändas (kolla mot `kritan-ritar`, näbben som eget drag) |
| Badkaret | ✅ finns | `rekvisita/badkar.md` | samma kar som 020/041 |
| Pallen | ✅ finns | `rekvisita/pall.md` | |
| Handduken, stor och rutig | ✅ finns | `rekvisita/handduk.md`, `cut/handduk-rutig-tunn.png` | kritan ritade den på kroken i 023. Här större, ca 1,1 × lammets höjd, så att den täcker hela lammet i rad 19. Kanten mäts om i den skalan (`vita-kanter`) |
| Kroken | ✅ finns | i `handduk-krok`/`handduk-rutig` | behöver kroken **ensam** (tom krok på väggen). Klipps ur den befintliga bilden eller ritas i kod, ingen ny Flow-bild |
| Skum, skumtussen, skumhatten | i kod | som 020 | |
| Blöt ull, droppar, pöl, ulltussar, skimmer | i kod | | |

**Nya saker: inga** om Sanna godkänner den rutiga handduken. Vill du ha en riktigt stor, utvikt badhandduk i stället (en egen bild), blir den den enda nya saken och görs i grind 2.

### Grind 2 (2026-11-25): handduken och kroken, godkänd av Sanna samma dag

Jämförelsebilden: [`grind2-handduk.jpg`](grind2-handduk.jpg) (1 tom krok, 2 handduken på kroken, 3 handduken över lammet, allt i plattans mått med lammet i 430 px).

- **Handduken:** `assets/rekvisita/handduk/cut/handduk-rutig-tunn.png` (538 × 1033), samma som 023, i **434 px höjd** (skala 0,42, 226 px bred), alltså lika hög som lammet och 1,45 gånger 023:s handduk (300 px). Större går inte: den skulle gå genom golvet när den ligger över lammet.
- **Kanten:** inbakad 10 px i filen, alltså 4,2 px i bild, plus 3 px från `kant.js`, ca 7 px. Regeln i `vita-kanter` ger 3 + 1 % av 434 = 7,3 px. Stämmer, ingen ny kantning.
- **Utan knopp (ny fil):** bilden har krokens knopp inbakad överst. När handduken lyfts av kroken skulle knoppen följa med, så `cut/handduk-rutig-utan-knopp-tunn.png` är samma bild med knoppen borttagen och spetsen omkantad (10 px). Den används från att handduken lämnar kroken. På kroken används den vanliga.
- **Kroken:** ingen bild. Den tomma kroken ritas i kod med 023:s knopp (`knopp` i `badrum()`, `#a9b7c2`/`#c9d5dd` med en glansprick), skalad med handduken (k = 434/1033). Den syns från första bilden.
- **Kritans kontur:** 023:s `HD_KONTUR` och `HD_RUTOR` skalade med 434/300 = 1,45.
- **Placering:** kroken måste sitta så långt till vänster om lammets plats att handduken inte hänger över lammet (i bild 2 är de för nära). Bestäms i animatiken.
- Utan-knopp-filen står i `rekvisita/handduk.md`.

## Rösten (grind 3, godkänd 2026-11-25)

ElevenLabs, Malin – Professional Swedish Narration, Eleven v3, stability Natural (0,5), svenska. Hela `rost.txt` i en tagning, två generationer (ca 1 400 tecken var).

- **Original:** `produktion/ljud-original/roster/054-lammet-badar/malin-tagning-1a.mp3` (124,3 s) och `-1b.mp3` (127,4 s).
- **Delade** med `verktyg/dela-tagning.py`: alla 42 repliker finns i båda, i rätt ordning, ingen saknas eller slås ihop.
- **Vald tills vidare: 1b, utom rad 33 och 39 ur 1a** (whisper hör B som *"Men vad är ankan?"* och *"Var ett roligt bad"*), normaliserad till −3 dBFS i `assets/ljud/roster/lammet-badar/NN-namn.m4a`, längderna i `rost-langder.txt`.
- **Provlyssning:** `ljud/provlyssna-rost-a-b.m4a` (4:24): varje replik först i tagning A, kort tystnad, sedan B. Säg vilka rader som ska tas från A eller göras om.
- **Whisper-noter (lyssna på dessa):**
  - rad 27–29: whisper hör *"blätt"* för *"blött"* i båda tagningarna (*"blöt"* i rad 17 och 36 hörs rätt). Kan vara whisper, men lyssna att det låter som blött.
  - rad 22: A säger *"nåt"*, B *"något"* (manus). B vald.
  - rad 15: A hörs som *"Nu är det ren"*, B *"Nu är du ren"*. B vald.
  - rad 33 och 39: tagna ur A (B tappade "det" och sa "vad").
- **Ordtiderna** för *"torrt!"* i rad 27–29 är mätta med whisper (`BORTA_T` i `rader.mjs`).

## Regelkoll

- [x] 1 figur, 1 plats, inget platsbyte, inget kritsvep i berättelsen. Zoom bara in i teckningen
- [x] Ritintrot ritar en sak (badankan), inte lammet. Lammet kommer in efter
- [x] Inga djurnamn: *"lammet"*, *"ankan"*
- [x] Inget *"Vad kan det vara?"*, inget *"Vad säger man?"* (*"Ska vi säga tack?"*), inga utdragna ord
- [x] Inga uppmaningar att göra något med kroppen. Barnet letar efter ankan och gissar kritans teckningar
- [x] Ny sorts problem: blöt och platt ull, lammet fryser (inte "vill inte")
- [x] Tema blött/torrt bara i upprepningen, ingen lektion
- [x] Varsågod (handduken) och *"Tack!"*
- [x] Tydligt hej och hej då, högst 3 fniss, aldrig `[excited]`
- [x] Inget läskigt: kylan är mild (huttra, *"brr"*), ingen gråt, inga droppar i ögonen
- [x] Inget går genom något: lammet stiger över karets kant, handduken ligger framför, ankan gömmer sig bakom skumtussen
- [x] Ingen ny musik
- [ ] **Avsteg som receptet redan har:** ingen sång, fler än 6 utsnitt
- [ ] **Avsteg från kärnan:** kritan ritar bara en sak i scenen (receptets lärdomar föreslår två). Den sista torkningen görs utan barnets hjälp, eftersom barnets letande är ankan i stället

## Öppet (för Sanna)

1. **Handduken:** den rutiga rosa från 023 i större skala (inga nya saker), eller en ny stor utvikt badhandduk?
2. **Rad 26, ulltussen som hatt på ankan:** en liten återkoppling till skumhatten i rad 6. Behåll, eller stryk för en kortare slutet?
3. **Titeln:** *Lammet badar*, eller *Lammet blir ett ullmoln*?
