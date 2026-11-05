# Storyboard – Avsnitt 006 · Orangea sången

Bild för bild, som 005. **Tiderna kommer ur sången**, tagning 2 (`sang.m4a`, 4:00, 2026-11-05, ca 104 bpm uppmätt med librosa: ett slag ≈ 0,576 s; tagning 1 ligger i `sang-v1.m4a` och `rader-v1.txt`), via `rader.txt` (Whisper), genom klippet nedan. **Avsnittstid = klipptid + 11 s** (introt före), där klipptid är tiden i `sang-klippt.m4a`.

**Klippet** (`film/klipp-sang.sh` gör `sang-klippt.m4a` ur `sang.m4a`). Inga stammar än, så pauserna ändras på hela mixen, i hela takter (4 slag) och i samma fas i takten, så att takten går jämnt över skarvarna. Takterna som läggs in är grooven före vers 1 (sångtid 0:24.78–0:29.39), utan röst. Skarvarna har 15 ms övertoning.

| # | Sångtid | Klipp | Paus före → efter | Avsnittstid |
|---|---|---|---|---|
| 1 | 1:30.0 | Frågepausen: 2 takter in, mellan "Kan du se?" och "Västen" (Suno sjöng ihop dem) | ca 0 → **4,6 s** | 1:41.0–1:45.6 |
| 2 | 2:01.6–2:03.9 | Bryggan: 1 takt bort | ca 9,5 s → **7,2 s** | skarv 2:16.2 |
| 3 | 3:37.1 | Outrot: 7,4 s efter sista "Hej då!" (3 s i 16f, 4,4 s under kritirisen i 17), tonas ut de sista 2 s som i 005; resten (ca 23 s) bort | | 3:48.4–3:50.4 |

Gissningspausen (ca 4,2 s) och pausen efter "Vem kan hjälpa?" (en hållen takt, ca 2,3 s) är som Suno sjöng dem. Refrängernas tider är satta på slagen (24 slag var). Sångens rader i avsnittstid: sångtid + 11 s till 1:30.0, + 15,61 s till 2:01.6, + 13,31 s därefter.

**Bildstoryboard:** [storyboard/index.html](storyboard/index.html), byggd av utklippen och bakgrunderna med `storyboard/bygg.py` (0 krediter). Kontaktark: [kontaktark.jpg](kontaktark.jpg).

**Platser:** Sjön (en körscen på vatten, två stopp vid orange saker) · Refrängerna (dansbilden på sjön med mjuk glöd i himlen, bubblan) · Bryggan (samma himmel och vatten, träbryggan från höger, Agda på kanten) · Discot (ljusorange) i danspausen och sista refrängen.
**Längd: 3:50.4** (230,4 s): intro 11 s, den klippta sången 3:39,4 (till 3:50.4), där de sista 4,4 s är slutet (17). Under regelns 4 min med 9,6 s marginal.

**Slutet som i 005 (17):** ingen zoom ut och inget fast outro. Kvar i discot vinkar Disa i båten, och Lilla Kvacks kritiris (en vinglig cirkel med nio bucklor, svart utanför, krämvit kant) sluter sig runt hennes ansikte, håller, stängs och slutar svart med en stjärnglimt. Sångens outro går under och tonas ut. Scenen är `scener/slutet/`. **Avvikelse från formatet** (`format/intro-outro.md`: zoom ut och ett fast outro på 10 s), samma som i 005, där Sanna bad om irisen.

**En bild per handling**, högst ett klipp per sjungen rad, **ingen text i bilderna** (ljud, repliker och sångrader står under bilden), **ingen säger det som sjungs**: Disa gör radens rörelse i bild.

| Orange sak | Sjungs | Disa i bild |
|---|---|---|
| Fisken (06b) | *plask, plask, plask!* | fisken hoppar tre gånger i en båge bredvid båten, Disa klappar en gång per plask |
| Fågeln (07b) | *pip, pip, pip!* | flaxar med armarna som vingar, en gång per "pip" |
| Västen och flaggan (08b, 08c) | *Dunk, dunk, dunk!* | klappar på västen och pekar på flaggan (08b), stampar så att båten gungar (08c) |
| Apelsinen (11b, 14e–f) | *rund, rund, rund!* | ritar en cirkel i luften (11b); en halva var och mums (14e–f) |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (båten på vänstra tredjedelen och kör in i bilden, vattnet glider)
3. Närbild Disa i båten (bröstbild med västen, båtens kant längst ner)
4. Bryggan · helbild (i 11a glider kameran långsamt in mot korgen: platsens enda kamerarörelse). **Tvåbilden** i vers 2 och 3 (13a–14g, utom närbilderna 13d och 13e) är ett närmare utsnitt av helbilden (`TVÅ_*` i bygg.py)
5. Närbild Agda på bryggkanten med korgen
6. **Dansbild** · refrängen och danspausen (samma inställning på sjön och i discot)

## Huvudbilden: Disa i båten
Båten är öppen och lägre än Disa, så att hon syns från midjan och upp med hela ansiktet och flytvästen. Båten har inget ansikte; den har en rund ventil, en mörkare rand, en liten grå motor i aktern och en orange flagga på en pinne. Lagren är: bortre relingen, flaggan och motorn → Disa (utan armar) → skrovet → Disas armar (`båten()` i bygg.py). Båten **gungar på vågorna** i stället för att hjulen snurrar: pilar upp och ner vid fören, kölvatten bakom, och vatten med vita vågkammar framför skrovets nederkant så att båten ligger i vattnet. I discot står den på en skugga.

**Disas armar** ur riggen är korta stumpar i samma lila som kroppen och syns inte mot kroppen när de lyfts. I storyboarden är ledbiten maskad (som i kit.js), armen förlängd 1,4× runt leden och har en vit klistermärkeskant (`armbild()`). **Antagande:** det räcker för utkastet; ritade lemmar som musens (`verktyg/rita-lemmar.py`) är ett senare steg i `assets/`.

**Flytvästen** är ritad i kod (`väst()`): två orange framstycken `#F77822` över bröstet och magen, klippta efter kroppens siluett, med en lucka i mitten där den ljuslila magen syns, två vita spännen och en vit kant. Samma i alla bilder, också i discot.

**Agda** sitter på bryggkanten: kroppen mot bryggans framkant och fötterna hängande ner mot vattnet. Hennes näbb är lappen ur `cut/ankan-agda-nabb.png` (som i kit.js), så hennes mun syns inte; hon "pratar" med näbben i animationen. I 14a står hon upp på bryggan (samma utklipp med benen), i 14b dyker hon (utklippet vridet, huvudet före), i 14c–d simmar hon: bara huvudet över vattnet, ringar efter henne, och i 14d knuffar hon apelsinen med näbben.

## Refrängdansen (likadan båda gångerna: 05a–f och 09a–f; sista refrängen 16 är en sammanfattning)
Lugn för småbarn (Sanna, 2026-11-05: blixten och mönstret var för hetsiga och blinkiga): **ett enda klipp på åtta rader.** Rad 1–7 är en och samma dansbild på sjön, och bara "Titta ut!" är närbild. En rörelse per rad att härma, och gungen går i halvtakt (en gång per två slag). Sex bilder i storyboarden, en per rörelse.

| Rad | Bild | Rörelse |
|---|---|---|
| Orange! *(Orange!)* Orange! *(Orange!)* | Dansbild (6), 05a | Båda armarna upp, båten gungar mjukt upp på rösten och ner på ekot. Himlen glöder persikoorange uppifrån i samma andetag |
| Orange är bästa färgen! | Samma dansbild, 05b | Händerna på magen (på västen), gunga långsamt åt sidorna |
| Orange! *(Orange!)* Orange! *(Orange!)* | Samma dansbild, 05c | Som rad 1–2 |
| Som en fin apelsin! | Samma dansbild, 05d | En bubbla med apelsinen poppar upp till höger (plopp); Disa pekar på den och ritar en cirkel runt den |
| Tut, tut, tut, tut – | Samma dansbild, 05e | Båten gungar två gånger på de första "tut, tut", två knytnävspumpar på de sista (båtens mistlur) |
| vad är orange? Titta ut! | Närbild Disa (3), 05f | Pekar ut åt ena hållet och tittar dit, sedan med andra armen åt andra hållet. (De korta armarna når inte upp över ögonen, så "handen över ögonen" blev pekar och tittar.) |

**Glöden:** på "Orange! (Orange!)" glöder himlen mjukt persikoorange `#FFD6AA` uppifrån (`glöd()` i bygg.py, en gradient i refrang.js) och bleknar igen, ett andetag på två slag. Vattnet och Disa ändras inte. Inga blixtplåtar, inga hårda klipp på slagen och inget mönster av dinos.

**Bubblorna** (rad 6, 05d, 09d): som bubblorna i 005:s refräng, vita och halvgenomskinliga, med apelsinen i (samma bild som i sången). Jättepumpan är struken (Sanna, 2026-11-05: för slumpmässig, och en pumpa i vattnet likaså). Sista refrängen (16e) stannar i discot.

## Bryggan (10–14g)
Kritsvep i himlens ljusblå. Båten puttrar in från vänster och lägger till nedanför Agda. **Antagande:** Disa stannar i båten hela tiden vid bryggan (hon kan inte stå på vattnet, och bryggan är för hög); apelsinen räcks ner från bryggkanten. **Vers 2 (problemet, 13a–13f):** apelsinen glider ur hennes tassar (plask), flyter bort åt höger och blir mindre för varje "längre" (13c: spökringar där den var, Disa sträcker sig över relingen och båten lutar), Disa är ledsen med en liten tår bara på snyftraden (13d, ca 3 s sjungen rad, inget mer, inget läskigt), frågar tittaren (13e) och i den hållna pausen tittar Agda ut mot apelsinen som ledtråd (13f). **Vers 3 (lösningen, 14a–14g):** Agda ställer sig upp, dyker i (plask), simmar ut, knuffar apelsinen tillbaka med näbben ("hit, hit, hit"), och sedan delar de: en halva var, mums och hurra. Halvorna är ritade i kod (`halva()`). Apelsinen långt bort ligger på `APELSIN_BORT` i bygg.py, innanför tvåbildens högerkant.

## Danspausen och sista refrängen i discot (15a–16f)
005:s disco omfärgat till ljusorange med kulan omfärgad till orange (inga nya bilder). **Antagande:** Disa har klivit ur båten vid bryggan utanför bild och dansar på egna ben, som musen i 005. Statisterna är Gurra (hoppar), Fia (snurrar i luften) och Mille (klappar), solobilder 58 % av bildhöjden, och alla fem i ett svagt V: Fia, Gurra, Disa (i mitten, störst), Agda, Mille. Sista refrängen: grodan med fisken (16a), musen med fågeln (16b), Disa (16c) medan fisken, fågeln, västen, apelsinen och båten poppar upp i en båge. På "Hej då" sitter Disa i båten på ett litet stycke blått vatten och puttrar iväg.

## Bilderna (Google Flow, 2026-11-05)

Alla platshållare är bytta mot riktiga bilder, gjorda i Google Flow (Nano Banana 2.1, 0 krediter) med 005:s bilder som stilreferens. Översikt: [assets-kontaktark.jpg](assets-kontaktark.jpg).

- **Båten:** `rekvisita/orange-baten/cut/orange-baten-skrov.png` är hela båten i bygg.py:s 1024-ruta. `…-insida.png` är bortre relingen i kod med skrovets kritkorn, och den orange flaggan (005:s rosa flagga omfärgad, `rekvisita/cut/flagga-orange.png`).
- **Plåtarna:** sjön (kanterna överblandade så att den går att upprepa sömlöst), bryggan (däcket vid y 463, BRYGG_Y är 470) (jättepumpan är struken; den låg kvar med toppen vid PUMP_TOPP, toppen som eget lager i `cut/jattepumpan-topp.png`).
- **Sakerna:** apelsinen, fisken, fågeln (ögat ritat i kod) och äpplet och bananen i Agdas korg (korgen själv är kvar i kod).
- **Klyftor:** Agda skalar apelsinen och delar den i klyftor. Halvorna i 14e–14f är `rekvisita/apelsin-klyftor-vanster.png`.

Scenerna (`scener/lager/`) har inte byggts om med bilderna än: kör `scener/lager/gor-lager.py` och rendera om.

## Bild för bild

Tabellen skrivs av `storyboard/bygg.py` (avsnittstid, ur sången genom klippet). Ändra `SHOTS` eller `KARTA` i bygg.py och kör om, inte tabellen.

<!-- tabell: skrivs av storyboard/bygg.py -->
| # | Tid (uppsk.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |
|---|---|---|---|---|---|
| 01 | 0:00–0:11 | Intro · fast | Samma intro som 003–005 med nytt nummer och ny titel: Avsnitt 6 · Orangea sången. Ljusblå vägg och en liten orange båt på kortet. (Bilden här är ritad i bygg.py; introt renderas som 005:s när det görs.) | (titeln syns, ingen röst) |  |
| 02 | 0:11.0–0:17.8 | Kritan ritar · 1 papper | ”Kritan ritar, orange, lång …”: kritan ritar ett orange, rundat skrov, långsamt. Bara skrovet. | (skrrrrt) | **Intro – kritan ritar**<br>♪ *Kritan ritar …* |
| 02a | 0:17.8–0:24.2 | Kritan ritar · 1 papper | ”vad kan det vara?”: en liten pinne med en orange flagga och en vågig blå linje under skrovet, medan det sjungs. | (skrrt, skrrt) | **Intro – kritan ritar**<br>♪ *vad kan det vara?* |
| 02b | 0:24.2–0:30.1 | Kritan ritar · 1 papper | ”Vad kan det vara?” och pausen: kritan ritar ett runt litet fönster (ventil), den sista ledtråden. | (skrrt) | **Intro – kritan ritar**<br>♪ *Vad kan det vara?*<br>⏸ paus; flaggan, vågorna och fönstret ritas redan under "vad kan det vara?" |
| 02c | 0:30.1–0:35.2 | Kritan ritar · 1 papper | ”En båt! En orange båt! Tut-tut, nu kör vi!”: båten gungar till på vågen och kritan lyfter. | (tut-tut) | **Intro – kritan ritar**<br>♪ *En båt! En orange båt!*<br>♪ *Tut-tut, nu kör vi!* |
| 03 | 0:35.2–0:37.2 | A · Sjön · zoom in | Zoom in i den ritade båten: den blir Disas båt på sjön. Disa sitter redan i båten med flytvästen på. Mellanspelet börjar. | (swoosh) |  |
| 03a | 0:37.2–0:39.4 | A · Sjön · 3 närbild Disa | Disa vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Tut-tut, nu kör vi!”: det sjöngs nyss. | DISA: Hej hej! |  |
| 03b | 0:39.4–0:41.3 | A · Sjön · 3 närbild Disa | Hon lägger tassarna på båtens kant och tittar framåt. |  |  |
| 04 | 0:41.3–0:53.2 | A · Sjön · 2 körscen | Mellanspel och vers 1 rad 1–2. Sjön glider, båten gungar på vågorna med kölvatten bakom. Fjärilen Fia fladdrar förbi högt uppe, den enda rörelsen i bakgrunden. | (putt, putt) | **Vers 1**<br>♪ *Dinon kör sin orange båt,*<br>♪ *tut, tut, tut – på vågorna!* |
| 04a | 0:53.2–1:03.3 | A · Sjön · 2 körscen | ”Dinon letar orange nu, leta med – jag och du!”: samma körscen, Disa sätter handen över ögonen och spanar framåt. |  | **Vers 1**<br>♪ *Dinon letar orange nu,*<br>♪ *leta med – jag och du!* |
| 05a | 1:03.3–1:05.6 | Refräng · 6 dansbild | Refrängdansen, likadan båda gångerna (se sang.md) och lugn: en enda dansbild på sjön för rad 1–7, utan klipp på slagen. Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: Disa sträcker båda armarna rakt upp och båten gungar mjukt upp på en våg och ner igen, en gång per ”Orange! (Orange!)”. Himlen glöder mjukt persikoorange uppifrån (#FFD6AA) och bleknar igen i samma andetag. |  | **Refräng**<br>♪ *Orange! (Orange!)*<br>♪ *Orange! (Orange!)* |
| 05b | 1:05.6–1:08.0 | Refräng · 6 dansbild | Rad 3 ”Orange är bästa färgen!”: samma bild, inget klipp. Händerna på magen (på flytvästen), hon gungar långsamt åt sidorna i halvtakt. Himlen är blå igen. |  | **Refräng**<br>♪ *Orange är bästa färgen!* |
| 05c | 1:08.0–1:10.3 | Refräng · 6 dansbild | Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma bild, armarna upp igen och samma mjuka gung och glöd som rad 1–2. |  | **Refräng**<br>♪ *Orange! (Orange!)*<br>♪ *Orange! (Orange!)* |
| 05d | 1:10.3–1:12.6 | Refräng · 6 dansbild | Rad 6 ”Som en fin apelsin!”: samma bild. En bubbla med apelsinen poppar upp i himlen till höger om Disa (plopp), som bubblorna i 005:s refräng. Den guppar sakta i takt, Disa pekar på den och ritar en cirkel runt den med tassen och skrattar. | (plopp) | **Refräng**<br>♪ *Som en fin apelsin!* |
| 05e | 1:12.6–1:14.9 | Refräng · 6 dansbild | Rad 7 ”Tut, tut, tut, tut”: samma bild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur. | (tut, tut: mistluren) | **Refräng**<br>♪ *Tut, tut, tut, tut –* |
| 05f | 1:14.9–1:17.3 | Refräng · 3 närbild Disa | Rad 8 ”vad är orange? Titta ut!”, refrängens enda klipp: närbild. Disa pekar ut åt höger med ena armen och tittar dit, och sedan med den andra armen åt vänster och tittar dit (de korta armarna når inte upp över ögonen). |  | **Refräng**<br>♪ *vad är orange? Titta ut!* |
| 06 | 1:17.3–1:19.5 | A · Sjön · 2 körscen | ”Vad är orange?”: en orange fisk hoppar upp ur vattnet framför båten i en båge. Disa blir förvånad och tittar dit. | (plask) | **Orange sak 1 – fisken**<br>♪ *Vad är orange? (Vad är orange?)* |
| 06a | 1:19.5–1:22.9 | A · Sjön · 2 körscen | ”Titta där! Fisken är orange”: sjön stannar och Disa pekar på fisken. |  | **Orange sak 1 – fisken**<br>♪ *Titta där! (Titta där!)*<br>♪ *Fisken är orange –* |
| 06b | 1:22.9–1:24.7 | A · Sjön · 3 närbild Disa | ”plask, plask, plask”: närbild, fisken hoppar tre gånger i en båge bredvid båten, och Disa klappar en gång per plask. | (plask, plask, plask) | **Orange sak 1 – fisken**<br>♪ *plask, plask, plask!* |
| 07 | 1:24.7–1:28.8 | A · Sjön · 2 körscen | ”Vad är orange?”: sjön glider igen, fisken är borta, en liten orange fågel flyger in från höger över vattnet. |  | **Orange sak 2 – fågeln**<br>♪ *Vad är orange? (Vad är orange?)* |
| 07a | 1:28.8–1:32.0 | A · Sjön · 2 körscen | ”Titta där! Fågeln är orange”: sjön stannar, fågeln fladdrar på stället bredvid båten och Disa pekar på den. |  | **Orange sak 2 – fågeln**<br>♪ *Titta där! (Titta där!)*<br>♪ *Fågeln är orange –* |
| 07b | 1:32.0–1:34.3 | A · Sjön · 3 närbild Disa | ”pip, pip, pip”: närbild, Disa flaxar med armarna som vingar, en gång per ”pip”. Fågeln fladdrar bredvid henne. |  | **Orange sak 2 – fågeln**<br>♪ *pip, pip, pip!* |
| 08 | 1:34.3–1:41.0 | A · Sjön · 3 närbild Disa | ”Vad mer är orange? Kan du se?”: frågan till tittaren. Disa tittar ut mot tittaren med frågande min. |  | **Frågan till tittaren**<br>♪ *Vad mer är orange?*<br>♪ *Kan du se?* |
| 08a | 1:41.0–1:45.6 | A · Sjön · 3 närbild Disa, inåkning | Pausen, ca 4,6 s (två inlagda takter, se Klippet). Ledtråd: Disa tittar ner på sin mage, och kameran åker in långsamt och mjukt till ca 1,5× mot den orange flytvästen. Inåkningen är det enda som rör sig. Bilden visar slutläget; pilarna visar inåkningen. |  | **Frågan till tittaren**<br>⏸ paus ca 3–4 s; ledtråd: Disa tittar ner på sin mage, kameran åker in mot flytvästen |
| 08b | 1:45.6–1:49.6 | A · Sjön · 3 närbild Disa | ”Västen är orange – och flaggan med!”: Disa klappar på västen och pekar bakåt på båtens orange flagga. |  | **Frågan till tittaren**<br>♪ *Västen är orange – och flaggan med!* |
| 08c | 1:49.6–1:51.6 | A · Sjön · 3 närbild Disa | ”Dunk, dunk, dunk!”: hon stampar tre gånger så att båten gungar. | (dunk, dunk, dunk) | **Frågan till tittaren**<br>♪ *Dunk, dunk, dunk!* |
| 09a | 1:51.6–1:53.9 | Refräng · 6 dansbild | Refrängdansen, likadan båda gångerna (se sang.md) och lugn: en enda dansbild på sjön för rad 1–7, utan klipp på slagen. Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: Disa sträcker båda armarna rakt upp och båten gungar mjukt upp på en våg och ner igen, en gång per ”Orange! (Orange!)”. Himlen glöder mjukt persikoorange uppifrån (#FFD6AA) och bleknar igen i samma andetag. |  | **Refräng**<br>♪ *Orange! (Orange!)*<br>♪ *Orange! (Orange!)* |
| 09b | 1:53.9–1:56.2 | Refräng · 6 dansbild | Rad 3 ”Orange är bästa färgen!”: samma bild, inget klipp. Händerna på magen (på flytvästen), hon gungar långsamt åt sidorna i halvtakt. Himlen är blå igen. |  | **Refräng**<br>♪ *Orange är bästa färgen!* |
| 09c | 1:56.2–1:58.6 | Refräng · 6 dansbild | Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma bild, armarna upp igen och samma mjuka gung och glöd som rad 1–2. |  | **Refräng**<br>♪ *Orange! (Orange!)*<br>♪ *Orange! (Orange!)* |
| 09d | 1:58.6–2:00.9 | Refräng · 6 dansbild | Rad 6 ”Som en fin apelsin!”: samma bild. En bubbla med apelsinen poppar upp i himlen till höger om Disa (plopp), som bubblorna i 005:s refräng. Den guppar sakta i takt, Disa pekar på den och ritar en cirkel runt den med tassen och skrattar. | (plopp) | **Refräng**<br>♪ *Som en fin apelsin!* |
| 09e | 2:00.9–2:03.2 | Refräng · 6 dansbild | Rad 7 ”Tut, tut, tut, tut”: samma bild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur. | (tut, tut: mistluren) | **Refräng**<br>♪ *Tut, tut, tut, tut –* |
| 09f | 2:03.2–2:05.6 | Refräng · 3 närbild Disa | Rad 8 ”vad är orange? Titta ut!”, refrängens enda klipp: närbild. Disa pekar ut åt höger med ena armen och tittar dit, och sedan med den andra armen åt vänster och tittar dit (de korta armarna når inte upp över ögonen). |  | **Refräng**<br>♪ *vad är orange? Titta ut!* |
| 10 | 2:05.6–2:06.2 | Kritsvep · kritsvep | Kritsvep i bryggans ljusblå (#A8DCF2), från vänster till höger, precis innan ”Vad är orange?”. | (skrrrrt) |  |
| 11 | 2:06.2–2:08.2 | B · Bryggan · 4 helbild | ”Vad är orange?”: Agda sitter på bryggkanten med fruktkorgen bredvid sig. Båten puttrar in från vänster. | (putt, putt) | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *Vad är orange? (Vad är orange?)* |
| 11a | 2:08.2–2:12.1 | B · Bryggan · 4 helbild | ”Titta där! Apelsinen är orange”: båten har lagt till nedanför Agda och Disa pekar på apelsinen i korgen. Kameran glider långsamt in mot korgen (platsens enda kamerarörelse); bilden visar slutläget. |  | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *Titta där! (Titta där!)*<br>♪ *Apelsinen är orange –* |
| 11b | 2:12.1–2:15.1 | B · Bryggan · 3 närbild Disa | ”rund, rund, rund”: närbild, Disa ritar en cirkel i luften med tassen. |  | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *rund, rund, rund!* |
| 11d | 2:15.1–2:18.5 | B · Bryggan · 5 närbild Agda | Lucka i sången, ca 7,2 s (en takt bort, se Klippet), grooven fortsätter under. Närbild Agda med korgen: apelsinen (närmast Disa), det gröna äpplet och den gula bananen. Färgövningen: tre färger, Disa väljer. | DISA: Hej, ankan! · AGDA: Kvack! Hej, Disa! Vad vill du ha? | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ lucka: "Hej, ankan!" "Kvack! Hej, Disa! Vad vill du ha?" Agdas korg: en apelsin, ett grönt äpple, en gul banan. Disa pekar: "Apelsin, tack!" "Varsågod!" "Tack!" |
| 11e | 2:18.5–2:20.2 | B · Bryggan · 4 helbild | Disa pekar på apelsinen. | DISA: Apelsin, tack! | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ forts. |
| 12 | 2:20.2–2:22.3 | B · Bryggan · 4 helbild | Agda räcker ner apelsinen från bryggan och Disa tar emot den. Äpplet och bananen ligger kvar i korgen. | AGDA: Varsågod! · DISA: Tack! (pling) | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ forts. |
| 13a | 2:22.3–2:24.6 | B · Bryggan · 4 tvåbild (helbilden närmare) | Vers 2, grooven tunnas ut. ”Oj, oj, plask! (Plask!)”: tvåbild, ett närmare utsnitt av helbilden. Apelsinen glider ur Disas tassar och plaskar i vattnet bredvid båten, kören ropar ”Plask!”. Båda blir förvånade. | (plask!) | **Vers 2 – problemet**<br>♪ *Oj, oj, plask! (Plask!)* |
| 13b | 2:24.6–2:27.0 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Där flöt den bort!”: samma tvåbild, apelsinen guppar bort åt höger på vågorna. |  | **Vers 2 – problemet**<br>♪ *Där flöt den bort!* |
| 13c | 2:27.0–2:31.4 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Längre, längre, längre bort …”: apelsinen blir mindre för varje ”längre” (spökringarna visar var den var), långt ut till höger. Disa sträcker sig över relingen men når inte, båten lutar lite. Kören: ”Åh nej!”. | (Åh nej!) | **Vers 2 – problemet**<br>♪ *Längre, längre, längre bort … (Åh nej!)* |
| 13d | 2:31.4–2:36.2 | B · Bryggan · 3 närbild Disa | ”Dinon är ledsen – snyft, snyft, snyft”: närbild, Disa ledsen med en liten tår, en snyft per ord. Bara raden ut (ca 2 s ledsen), inget mer. | (snyft, snyft, snyft) | **Vers 2 – problemet**<br>♪ *Dinon är ledsen – snyft, snyft, snyft.* |
| 13e | 2:36.2–2:38.6 | B · Bryggan · 3 närbild Disa | ”Vem kan hjälpa? (Vem kan hjälpa?)”: närbild, Disa tittar ut mot tittaren med tassarna uppåt, frågande, inte ledsen längre. |  | **Vers 2 – problemet**<br>♪ *Vem kan hjälpa? (Vem kan hjälpa?)* |
| 13f | 2:38.6–2:41.0 | B · Bryggan · 4 tvåbild (helbilden närmare) | Den hållna pausen, ca 2,3 s: barnet hinner ropa ”Ankan!”. Tvåbild: Agda på bryggkanten tittar ut mot apelsinen (ledtråden), Disa tittar på tittaren. |  | **Vers 2 – problemet**<br>⏸ en takt hållen ton, tyst på sista slaget: barnet hinner ropa "Ankan!" |
| 14a | 2:41.0–2:42.7 | B · Bryggan · 4 tvåbild (helbilden närmare) | Vers 3, hela grooven tillbaka. ”Ankan! (Ankan!)”: Agda ställer sig upp på bryggkanten med vingarna bakåt, redo att hoppa. Disa ser henne och blir glad. |  | **Vers 3 – lösningen**<br>♪ *Ankan! (Ankan!) Ankan hoppar i – plask!* |
| 14b | 2:42.7–2:44.3 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Ankan hoppar i – plask!”: Agda dyker med huvudet före från bryggan, ett stort plask. | (plask!) | **Vers 3 – lösningen**<br>⏸ forts. |
| 14c | 2:44.3–2:46.4 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Ankan simmar, kvack, kvack, kvack!”: Agda simmar ut mot apelsinen, bara huvudet över vattnet, ringar efter henne. | (kvack, kvack, kvack) | **Vers 3 – lösningen**<br>♪ *Ankan simmar, kvack, kvack, kvack!* |
| 14d | 2:46.4–2:48.8 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Hit med apelsinen – hit, hit, hit!”: Agda knuffar apelsinen med näbben tillbaka till båten, en knuff per ”hit”. Disa sträcker tassen mot den och skrattar. |  | **Vers 3 – lösningen**<br>♪ *Hit med apelsinen – hit, hit, hit!* |
| 14e | 2:48.8–2:49.9 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”En halva var –”: Disa kliver ur den tomma båten upp på bryggan, ett litet hopp med armarna upp. Agda sitter på kanten igen med apelsinen hon hämtade. |  | **Vers 3 – lösningen**<br>♪ *En halva var – till dig och mig!* |
| 14e2 | 2:49.9–2:51.1 | B · Bryggan · 4 tvåbild (bryggan) | ”– till dig och mig!”: på bryggan, båten är ur bild. Agda har delat apelsinen, hon håller en halva och ger Disa den andra: en halva var. |  | **Vers 3 – lösningen**<br>⏸ forts. |
| 14f | 2:51.1–2:52.6 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Mums, mums, mums”: båda på bryggan äter sin halva, en tugga per ”mums”. |  | **Vers 3 – lösningen**<br>♪ *Mums, mums, mums – hurra, hurra!* |
| 14g | 2:52.6–2:54.9 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”– hurra, hurra!”: båda sträcker armarna upp. Apelsinen är slut, så händerna är fria till dansen. |  | **Vers 3 – lösningen**<br>⏸ forts. |
| 15a | 2:54.9–2:56.1 | Danspaus · discot · 6 dansbild (discot) | ”Danspaus!”: klipp till discot, ljusorange med en orange discokula som snurrar sakta och kastar ljusprickar. Disa har klivit ur båten vid bryggan och dansar stor mitt i bild med armarna upp, med ett litet stjärnregn runt sig. | (boing!) | **Danspaus**<br>♪ *Danspaus! (Danspaus!)* |
| 15b | 2:56.1–3:04.5 | Danspaus · discot · 6 dansbild (discot) | ”(Danspaus!)”, ekot: Agda hoppar in och landar bredvid henne, båda lite mindre (samma bild utan klipp). | (boing!) | **Danspaus**<br>⏸ forts. |
| 15c | 3:04.5–3:06.9 | Danspaus · discot · 6 dansbild (discot) | ”Hoppa, hoppa!”: solobild, grodan Gurra ensam och stor mitt i bild, hoppar, stjärnregn runt honom. |  | **Danspaus**<br>♪ *Hoppa, hoppa! (Hoppa, hoppa!) – Grodan Gurra* |
| 15d | 3:06.9–3:09.2 | Danspaus · discot · 6 dansbild (discot) | ”Snurra runt!”: solobild, fjärilen Fia snurrar i luften, stjärnregn runt henne. | (fladder) | **Danspaus**<br>♪ *Snurra runt! (Snurra runt!) – Fjärilen Fia* |
| 15e | 3:09.2–3:11.6 | Danspaus · discot · 6 dansbild (discot) | ”Klappa, klappa!”: solobild, musen Mille klappar med armarna upp, stjärnregn runt henne. | (klapp, klapp) | **Danspaus**<br>♪ *Klappa, klappa! (Klappa, klappa!) – Musen Mille* |
| 15f | 3:11.6–3:14.0 | Danspaus · discot · 6 dansbild (discot) | ”Alla dansar – orange dans!”: alla fem i ett svagt V, Disa i mitten lite större och ett steg fram, Gurra och Agda bredvid, Fia och Mille ytterst. Disa och Agda har armarna upp, statisterna gör sin rörelse. |  | **Danspaus**<br>♪ *Alla dansar – orange dans! (Orange dans!)* |
| 15g | 3:14.0–3:23.3 | Danspaus · discot · 6 dansbild (discot) | ”(Orange dans!)”, ekot, och grooven före sista refrängen (kortad till ca 4 s, se Klippet): samma rad, Disa och Agda gungar med händerna på magen. |  | **Danspaus**<br>⏸ forts. |
| 16a | 3:23.3–3:24.8 | Danspaus · discot · 6 dansbild (discot) | Sista refrängen i discot, en snabb solobild per sak. ”Fisken – orange!”: grodan hoppar och fisken hoppar bredvid honom; fisken poppar upp som första småbild i bågen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Fisken – orange! (Orange!)* |
| 16b | 3:24.8–3:27.1 | Danspaus · discot · 6 dansbild (discot) | ”Fågeln – orange!”: solobild, musen klappar och fågeln fladdrar bredvid henne. Fågeln poppar upp i bågen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Fågeln – orange! (Orange!)* |
| 16c | 3:27.1–3:32.2 | Danspaus · discot · 6 dansbild (discot) | ”Väst och apelsin och båt – orange!”: solobild, Disa hoppar med armarna upp. Västen, apelsinen och båten poppar upp i bågen, en per ord. | (pop, pop, pop) | **Sista refrängen – sammanfattning**<br>♪ *Väst och apelsin och båt – orange! (Orange!)* |
| 16d | 3:32.2–3:34.2 | Danspaus · discot · 6 dansbild (discot) | ”Orange är bästa färgen”: alla fem igen i raden, Disa och Agda med händerna på magen. |  | **Sista refrängen – sammanfattning**<br>♪ *Orange är bästa färgen,* |
| 16e | 3:34.2–3:36.8 | Danspaus · discot · 6 dansbild (discot) | ”som en fin apelsin!”: kvar i discot, alla fem i raden. Apelsinen i bågen gungar extra. |  | **Sista refrängen – sammanfattning**<br>♪ *som en fin apelsin!* |
| 16f | 3:36.8–3:46.0 | Danspaus · discot · 6 dansbild (discot) | ”Hej då, hej då – tut, tut!”: kvar i discot, under bågen med småbilderna. Disa sitter i båten på ett litet stycke blått vatten och puttrar iväg åt höger och vinkar; tutet är båtens mistlur. De andra har dansat ut ur bild. Sångens outro är kortat till 3 s och tonas ut i slutet av bilden. | (tut, tut) | **Sista refrängen – sammanfattning**<br>♪ *Hej då, hej då – tut, tut!* |
| 17 | 3:46.0–3:50.4 | Avslutning · kritiris | Slutet, som 005: kvar i discot. Disa i båten vinkar, och en kritiris (en vinglig cirkel med nio bucklor och krämvit kant) sluter sig runt hennes ansikte på 1,6 s, håller på henne 1,2 s, stängs på 0,8 s, en stjärnglimt i det svarta och slutar svart. Sångens outro fortsätter under och tonas ut de sista 2 s. Inget fast outro efter. | (swoosh) |  |
<!-- /tabell -->

## Kontroll mot `format/regler.md`
- [x] 2 figurer (Disa, Agda) och 3 statister (Gurra, Fia, Mille), alla befintliga, inga repliker, en rörelse var
- [ ] 2 platser (sjön, bryggan), ett platsbyte med kritsvep. **Avvikelse som i 005:** discot (danspausen) är en egen bakgrund, räknade som dansbildens inställning; klippen till och från discot är raka
- [ ] 2 nya saker (båten, apelsinen). **Avvikelse:** fisken, fågeln och fruktkorgen är nya lager på sjön och bryggan (bakgrund, som busken och ballongen i 005). Flaggan, västen och halvorna är kod
- [x] 1 ny pose per figur (Disa sitter i båten, Agda på bryggkanten). Agda som står (14a), dyker (14b) och simmar (14c–d) är samma utklipp: med benen, vridet och med vatten framför, ingen ny pose
- [ ] Zoom in efter kritan ritar. **Avvikelse som i 005:** slutet är kritirisen (17), ingen zoom ut och inget fast outro
- [ ] En fråga till tittaren med paus och svar (08–08c). **Avvikelse:** pausen är 3,0 s, inte 4 s: en inlagd takt ger 3,0 s och två ger 5,4 s, och med två takter blir avsnittet 4:00.7. Den andra pausen till barnet ("Vem kan hjälpa?", 13f) är 5,7 s
- [x] Upprepning: "Vad är orange? Titta där!" tre gånger, refrängen två gånger med samma bilder, sammanfattningen sist
- [x] Ingen säger det som sjungs; ingen säger "Hej då!" i 16f
- [x] 6 kamerainställningar, regelns max
- [x] Vardagshandling och tack ("Apelsin, tack!" "Varsågod!" "Tack!"), dela (en halva var), hjälpa (Agda dyker i och hämtar apelsinen när Disa frågar efter hjälp), flytväst i båten. Det ledsna är en sjungen rad med en liten tår, aldrig läskigt
- [x] En sak i taget: bara Fia i bakgrunden i 04; sedan står sjön still när en orange sak dyker upp. Refrängen är en lugn dansbild utan blixt
- [ ] **Tempo:** de flesta bilder är 1,2–5,7 s. Refrängens bilder är 2,3–2,4 s men rad 1–7 är ett och samma klipp (ca 11,6 s); 13b och 06b är 1,3 och 1,7 s; 04 och 04a är 11 s var (körscen, mellanspel och vers 1); 10 (kritsvepet) är 0,7 s
- [x] **Längd** 3:50.4, under 4 min (gissningspausen 4,2 s, frågepausen 4,6 s, bryggluckan 7,2 s, pausen efter "Vem kan hjälpa?" 2,3 s, outrot 3 s + 4,4 s under irisen)
- [x] Short: 05a–08c (refrängen, fisken, fågeln, frågan) blir ca 51 s (1:05.9–1:57.2), eller ca 60 s med refräng 2
- [ ] **Intro (01)** är ritat i bygg.py; det riktiga introt (`intro/` som i 005: logotypen, titelkortet, jingeln) är inte renderat för 006

- [ ] **Uppskattade tider (≈ i rader.txt):** "Tut-tut, nu kör vi!", refräng 1:s "Tut, tut" och "Titta ut!" (flyttad till 2,7 s efter "Tut, tut" som i refräng 2), "hoppar i – plask" (1,6 s efter "Ankan!"), "hurra, hurra" (2,2 s efter "Mums"), ekot "(Danspaus!)", danspausens rader och "Fisken – orange!". Rättas när stammarna finns