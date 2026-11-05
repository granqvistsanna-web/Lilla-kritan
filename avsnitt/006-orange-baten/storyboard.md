# Storyboard – Avsnitt 006 · Orange sången (utkast)

Bild för bild, som 005. **Tiderna är uppskattade** – sången är inte tagen än. De är räknade på glad barnreggae i ca 88 bpm (en takt ≈ 2,73 s): en takt per refrängrad och ekorad, två takter per versrad, och pauserna som de är tänkta i `suno.md` (gissningen ca 1 takt, frågan ca 4 s, luckan vid bryggan ca 6,8 s). Avsnittstid = sångtid + 11 s (introt före), som i 005.

**När tagningen finns:** gör `rader.txt` ur `sang.m4a` som i 005 (Whisper på leadstämman, rättad efter `sang.md`), byt tiderna i `SHOTS` och `REFRÄNG_TID` i `storyboard/bygg.py` och kör om den. Kodscenerna läser tiderna ur samma ställen (`kit.manus()`), så de följer med. Tills dess är `rader.txt` en uppskattning med samma format.

**Bildstoryboard:** [storyboard/index.html](storyboard/index.html), byggd av utklippen och bakgrunderna med `storyboard/bygg.py` (0 krediter). Kontaktark: [kontaktark.jpg](kontaktark.jpg).

**Platser:** Sjön (en körscen på vatten, två stopp vid orange saker) · Refrängerna (dansbilden på sjön, orange blixt, jättepumpan) · Bryggan (samma himmel och vatten, träbryggan från höger, Agda på kanten) · Discot (ljusorange) i danspausen och sista refrängen.
**Längd:** ca 3:55 med de uppskattade tiderna: intro 11 s, sången till ca 3:39 (med ca 4 s av outrot), zoom ut 2 s, outro 10 s. Reggaen är långsammare än funken i 005, så avsnittet blir längre (README räknade med 3:30–3:45). Kortas i första hand i mellanspelet före vers 1 (04) och i danspausen (14m).

**En bild per handling**, högst ett klipp per sjungen rad, **ingen text i bilderna** (ljud, repliker och sångrader står under bilden), **ingen säger det som sjungs**: Disa gör radens rörelse i bild.

| Orange sak | Sjungs | Disa i bild |
|---|---|---|
| Fisken (06b) | *plask, plask, plask!* | fisken hoppar tre gånger i en båge bredvid båten, Disa klappar en gång per plask |
| Pumpan (07b) | *stor, stor, stor!* | sträcker ut armarna, lite bredare för varje "stor" |
| Västen och flaggan (08b, 08c) | *Dunk, dunk, dunk!* | klappar på västen och pekar på flaggan (08b), stampar så att båten gungar (08c) |
| Apelsinen (11b, 14c–d) | *rund, rund, rund!* | ritar en cirkel i luften (11b); en halva var och mums (14c–d) |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (båten på vänstra tredjedelen och kör in i bilden, vattnet glider)
3. Närbild Disa i båten (bröstbild med västen, båtens kant längst ner)
4. Bryggan · helbild (i 11a glider kameran långsamt in mot korgen: platsens enda kamerarörelse). **Tvåbilden** i vers 2 (13a–14e) är ett närmare utsnitt av helbilden (`TVÅ_*` i bygg.py)
5. Närbild Agda på bryggkanten med korgen
6. **Dansbild** · refrängen och danspausen (samma inställning på sjön, blixtplåtarna, jättepumpan och discot)

## Huvudbilden: Disa i båten
Båten är öppen och lägre än Disa, så att hon syns från midjan och upp med hela ansiktet och flytvästen. Båten har inget ansikte; den har en rund ventil, en mörkare rand, en liten grå motor i aktern och en orange flagga på en pinne. Lagren är: bortre relingen, flaggan och motorn → Disa (utan armar) → skrovet → Disas armar (`båten()` i bygg.py). Båten **gungar på vågorna** i stället för att hjulen snurrar: pilar upp och ner vid fören, kölvatten bakom, och vatten med vita vågkammar framför skrovets nederkant så att båten ligger i vattnet. I blixten och i discot står den på en skugga.

**Disas armar** ur riggen är korta stumpar i samma lila som kroppen och syns inte mot kroppen när de lyfts. I storyboarden är ledbiten maskad (som i kit.js), armen förlängd 1,4× runt leden och har en vit klistermärkeskant (`armbild()`). **Antagande:** det räcker för utkastet; ritade lemmar som musens (`verktyg/rita-lemmar.py`) är ett senare steg i `assets/`.

**Flytvästen** är ritad i kod (`väst()`): två orange framstycken `#F77822` över bröstet och magen, klippta efter kroppens siluett, med en lucka i mitten där den ljuslila magen syns, två vita spännen och en vit kant. Samma i alla bilder, också i discot.

**Agda** sitter på bryggkanten: kroppen mot bryggans framkant och fötterna hängande ner mot vattnet. Hennes näbb är lappen ur `cut/ankan-agda-nabb.png` (som i kit.js), så hennes mun syns inte; hon "pratar" med näbben i animationen. I 13d simmar hon: bara huvudet över vattnet, apelsinen på näbben, ringar efter henne.

## Refrängdansen (likadan alla tre gångerna: 05a–f, 09a–f och sista refrängen 15)
Samma form som 005: **sex klipp på åtta rader**, ekoraderna i dansbild och känslorna i närbild.

| Rad | Klipp | Rörelse |
|---|---|---|
| Orange! *(Orange!)* Orange! *(Orange!)* | Dansbild (6), orange blixt (05a/05a2) | Båda armarna upp, båten gungar upp på vågen i takt. Klarorange `#F26B1D` på rösten, ljusorange `#FAC48E` på ekot |
| Orange är bästa färgen! | Närbild Disa (3) | Händerna på magen (på västen), gunga åt sidorna i reggaetakten |
| Orange! *(Orange!)* Orange! *(Orange!)* | Dansbild (6), orange blixt (05c/05c2) | Disa blir fyra (2 × 2) på rösten och ett mönster av dinos i båtar (4 × 3) på ekot |
| Som apelsin och pumpa! | Jättepumpan, dansbildens inställning (6) | Disa på toppen sätter ner båtens orange flagga (plopp) och jublar |
| Tut, tut, tut, tut – | Dansbild (6) | Båten gungar två gånger på de första "tut, tut", två knytnävspumpar på de sista (båtens mistlur) |
| vad är orange? Titta ut! | Närbild Disa (3) | Handen över ögonen, titta åt ena hållet och sedan åt det andra |

**Orange blixt:** på varje "Orange!" i rad 1–2 och 4–5 byts bakgrunden med ett hårt klipp på slaget till discots kritiga plåt omfärgad (`färgad_plåt()`), och tillbaka till sjön mellan raderna. Vattnet och himlen syns inte under blixten, bara Disa, båten och skuggan. Båten har den tjocka vita kanten och innanför den en mörkorange kritkontur `#B0420C` runt skrovet (`KONTUR_OR`), så att den orange båten syns mot orange. **Medvetet undantag** från en sak i taget, som i 005.

**Jättepumpan** (rad 6, 05d, 09d, 15e): en jättestor pumpa mot ljusblå himmel, ca 2/3 av bildhöjden, med skåror och en grön stjälk. Disa står på toppen (ca 27 % av bildhöjden). Flaggan är 005:s rosa flagga omfärgad till orange i kod (`orange_flagga()`), så ingen ny bild behövs för den.

## Bryggan (10–14e)
Kritsvep i himlens ljusblå. Båten puttrar in från vänster och lägger till nedanför Agda. **Antagande:** Disa stannar i båten hela tiden vid bryggan (hon kan inte stå på vattnet, och bryggan är för hög); apelsinen räcks ner från bryggkanten. I vers 2 glider apelsinen ur hennes tassar (plask), flyter bort åt höger, Agda simmar efter den och kommer tillbaka med den på näbben, och sedan delar de: en halva var. Halvorna är ritade i kod (`halva()`).

## Danspausen och sista refrängen i discot (14f–16)
005:s disco omfärgat till ljusorange med kulan omfärgad till orange (inga nya bilder). **Antagande:** Disa har klivit ur båten vid bryggan utanför bild och dansar på egna ben, som musen i 005. Statisterna är Gurra (hoppar), Fia (snurrar i luften) och Mille (klappar), solobilder 58 % av bildhöjden, och alla fem i ett svagt V: Fia, Gurra, Disa (i mitten, störst), Agda, Mille. Sista refrängen: grodan med fisken (15a), musen bredvid pumpan (15b), Disa (15c) medan fisken, pumpan, västen, apelsinen och båten poppar upp i en båge. På "Hej då" sitter Disa i båten på ett litet stycke blått vatten och puttrar iväg mot en orange sol.

## Platshållare (byts när assets-sessionen levererar)
Allt som inte finns i `assets/` ritas i kod i rätt färg, och listas i index.html. Filnamnen som väntas står i `ASSET` överst i `storyboard/bygg.py` – byt där om bilderna får andra namn, och kör om `bygg.py` och `scener/lager/gor-lager.py`.

| Väntad fil | Platshållare i kod |
|---|---|
| `bakgrunder/sjon/sjon.png` | ljusblå himmel, låg grön strand, vatten med vita vågbågar |
| `bakgrunder/bryggan/bryggan.png` | sjön + en brun träbrygga från höger med stolpar |
| `bakgrunder/jattepumpan/jattepumpan.png` (+ `cut/jattepumpan-topp.png`) | tre orange ellipser med skåror och grön stjälk |
| `rekvisita/orange-baten/cut/orange-baten-skrov.png`, `…-insida.png` | orange skrov med ventil och rand; bortre reling, flagga och motor |
| `rekvisita/apelsin.png` | orange cirkel med prickar och ett grönt blad |
| `bakgrunder/sjon-saker/fisk-orange.png`, `pumpa.png`, `sol-orange.png`, `fruktkorg.png` | platta former i rätt färg |

## Bild för bild

Tabellen skrivs av `storyboard/bygg.py` (tiderna uppskattade). Ändra `SHOTS` eller `KARTA` i bygg.py och kör om, inte tabellen.

<!-- tabell: skrivs av storyboard/bygg.py -->
| # | Tid (uppsk.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |
|---|---|---|---|---|---|
| 01 | 0:00–0:11 | Intro · fast | Samma intro som 003–005 med nytt nummer och ny titel: Avsnitt 6 · Orange sången. Ljusblå vägg och en liten orange båt på kortet. (Bilden här är ritad i bygg.py; introt renderas som 005:s när det görs.) | (titeln syns, ingen röst) |  |
| 02 | 0:11.0–0:16.5 | Kritan ritar · 1 papper | ”Kritan ritar, orange, lång …”: kritan ritar ett orange, rundat skrov, långsamt. Bara skrovet. | (skrrrrt) | **Intro – kritan ritar**<br>♪ *Kritan ritar, orange, lång …* |
| 02a | 0:16.5–0:19.2 | Kritan ritar · 1 papper | ”vad kan det vara?”: en liten pinne med en orange flagga och en vågig blå linje under skrovet, medan det sjungs. | (skrrt, skrrt) | **Intro – kritan ritar**<br>♪ *vad kan det vara?* |
| 02b | 0:19.2–0:24.6 | Kritan ritar · 1 papper | ”Vad kan det vara?” och pausen: kritan ritar ett runt litet fönster (ventil), den sista ledtråden. | (skrrt) | **Intro – kritan ritar**<br>♪ *Vad kan det vara?*<br>⏸ paus; flaggan, vågorna och fönstret ritas redan under "vad kan det vara?" |
| 02c | 0:24.6–0:30.1 | Kritan ritar · 1 papper | ”En båt! En orange båt! Tut-tut, nu kör vi!”: båten gungar till på vågen och kritan lyfter. | (tut-tut) | **Intro – kritan ritar**<br>♪ *En båt! En orange båt!*<br>♪ *Tut-tut, nu kör vi!* |
| 03 | 0:30.1–0:32.1 | A · Sjön · zoom in | Zoom in i den ritade båten: den blir Disas båt på sjön. Disa sitter redan i båten med flytvästen på. Mellanspelet börjar. | (swoosh) |  |
| 03a | 0:32.1–0:34.9 | A · Sjön · 3 närbild Disa | Disa vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Tut-tut, nu kör vi!”: det sjöngs nyss. | DISA: Hej hej! |  |
| 03b | 0:34.9–0:36.9 | A · Sjön · 3 närbild Disa | Hon lägger tassarna på båtens kant och tittar framåt. |  |  |
| 04 | 0:36.9–0:50.5 | A · Sjön · 2 körscen | Mellanspel och vers 1 rad 1–2. Sjön glider, båten gungar på vågorna med kölvatten bakom, en orange sol långt bort. Fjärilen Fia fladdrar förbi högt uppe, den enda rörelsen i bakgrunden. | (putt, putt) | **Vers 1**<br>♪ *Dinon kör sin orange båt,*<br>♪ *tut, tut, tut – på vågorna!* |
| 04a | 0:50.5–1:01.5 | A · Sjön · 2 körscen | ”Dinon letar orange nu, leta med – jag och du!”: samma körscen, Disa sätter handen över ögonen och spanar framåt. |  | **Vers 1**<br>♪ *Dinon letar orange nu,*<br>♪ *leta med – jag och du!* |
| 05a | 1:01.5–1:04.2 | Refräng · 6 dansbild (orange blixt) | Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: dansbild. Disa sträcker båda armarna rakt upp och båten gungar upp på en våg i takt. Orange blixt: på rösten ”Orange!” byts bakgrunden med ett hårt klipp till klarorange (#F26B1D); vattnet och himlen försvinner och bara Disa, båten och skuggan står på orange. Båten har en mörkorange kontur. |  | **Refräng**<br>♪ *Orange! (Orange!)* |
| 05a2 | 1:04.2–1:06.9 | Refräng · 6 dansbild (orange blixt) | Ekot ”(Orange!)”: samma dans, bakgrunden blixtrar till ljusorange (#FAC48E). Mellan raderna är det sjön igen, så rad 1–2 blinkar rop, eko, rop, eko. |  | **Refräng**<br>♪ *Orange! (Orange!)* |
| 05b | 1:06.9–1:09.6 | Refräng · 3 närbild Disa | Rad 3 ”Orange är bästa färgen!”: närbild, händerna på magen (på flytvästen), hon gungar åt sidorna i reggaetakten. |  | **Refräng**<br>♪ *Orange är bästa färgen!* |
| 05c | 1:09.6–1:12.4 | Refräng · 6 dansbild (orange blixt) | Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma blixt, och nu blir Disa fler. På rösten, klarorange: Disa i båten poppar till fyra i ett rutnät 2 × 2, alla på en gång. Alla gungar i takt med armarna upp. | (pop: fyra) | **Refräng**<br>♪ *Orange! (Orange!)* |
| 05c2 | 1:12.4–1:15.1 | Refräng · 6 dansbild (orange blixt) | Ekot ”(Orange!)”, ljusorange: de poppar igen till ett helt mönster av dinos i båtar, 4 × 3 med varannan rad förskjuten ett halvt steg som ett tryck. Samma utklipp och ansikte i alla, renderade en gång. | (pop: mönstret) | **Refräng**<br>♪ *Orange! (Orange!)* |
| 05d | 1:15.1–1:17.8 | Refräng · 6 dansbild (jättepumpan) | Rad 6 ”Som apelsin och pumpa!”: en Disa igen. Klipp till jättepumpan mot ljusblå himmel, ca 2/3 av bildhöjden. Disa står på toppen (ca 27 % av bildhöjden), sätter ner båtens orange flagga (plopp), flaggan fladdrar och hon sträcker armarna upp och jublar. | (plopp) | **Refräng**<br>♪ *Som apelsin och pumpa!* |
| 05e | 1:17.8–1:20.5 | Refräng · 6 dansbild | Rad 7 ”Tut, tut, tut, tut”: dansbild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur. | (tut, tut: mistluren) | **Refräng**<br>♪ *Tut, tut, tut, tut –* |
| 05f | 1:20.5–1:23.3 | Refräng · 3 närbild Disa | Rad 8 ”vad är orange? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra. |  | **Refräng**<br>♪ *vad är orange? Titta ut!* |
| 06 | 1:23.3–1:26.0 | A · Sjön · 2 körscen | ”Vad är orange?”: en orange fisk hoppar upp ur vattnet framför båten i en båge. Disa blir förvånad och tittar dit. | (plask) | **Orange sak 1 – fisken**<br>♪ *Vad är orange? (Vad är orange?)* |
| 06a | 1:26.0–1:31.5 | A · Sjön · 2 körscen | ”Titta där! Fisken är orange”: sjön stannar och Disa pekar på fisken. |  | **Orange sak 1 – fisken**<br>♪ *Titta där! (Titta där!)*<br>♪ *Fisken är orange –* |
| 06b | 1:31.5–1:34.2 | A · Sjön · 3 närbild Disa | ”plask, plask, plask”: närbild, fisken hoppar tre gånger i en båge bredvid båten, och Disa klappar en gång per plask. | (plask, plask, plask) | **Orange sak 1 – fisken**<br>♪ *plask, plask, plask!* |
| 07 | 1:34.2–1:36.9 | A · Sjön · 2 körscen | ”Vad är orange?”: sjön glider igen, fisken är borta, en stor pumpa på stranden glider in från höger. |  | **Orange sak 2 – pumpan**<br>♪ *Vad är orange? (Vad är orange?)* |
| 07a | 1:36.9–1:42.4 | A · Sjön · 2 körscen | ”Titta där! Pumpan är orange”: sjön stannar och Disa pekar på pumpan. |  | **Orange sak 2 – pumpan**<br>♪ *Titta där! (Titta där!)*<br>♪ *Pumpan är orange –* |
| 07b | 1:42.4–1:45.1 | A · Sjön · 3 närbild Disa | ”stor, stor, stor”: närbild, Disa sträcker ut armarna, lite bredare för varje ”stor”. Pumpan syns bakom. |  | **Orange sak 2 – pumpan**<br>♪ *stor, stor, stor!* |
| 08 | 1:45.1–1:50.5 | A · Sjön · 3 närbild Disa | ”Vad mer är orange? Kan du se?”: frågan till tittaren. Disa tittar ut mot tittaren med frågande min. |  | **Frågan till tittaren**<br>♪ *Vad mer är orange?*<br>♪ *Kan du se?* |
| 08a | 1:50.5–1:54.6 | A · Sjön · 3 närbild Disa, inåkning | Pausen, ca 4 s. Ledtråd: Disa tittar ner på sin mage, och kameran åker in långsamt och mjukt till ca 1,5× mot den orange flytvästen. Inåkningen är det enda som rör sig. Bilden visar slutläget; pilarna visar inåkningen. |  | **Frågan till tittaren**<br>⏸ paus ca 3–4 s; ledtråd: Disa tittar ner på sin mage, kameran åker in mot flytvästen |
| 08b | 1:54.6–1:57.4 | A · Sjön · 3 närbild Disa | ”Västen är orange – och flaggan med!”: Disa klappar på västen och pekar bakåt på båtens orange flagga. |  | **Frågan till tittaren**<br>♪ *Västen är orange – och flaggan med!* |
| 08c | 1:57.4–2:00.1 | A · Sjön · 3 närbild Disa | ”Dunk, dunk, dunk!”: hon stampar tre gånger så att båten gungar. | (dunk, dunk, dunk) | **Frågan till tittaren**<br>♪ *Dunk, dunk, dunk!* |
| 09a | 2:00.1–2:02.8 | Refräng · 6 dansbild (orange blixt) | Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Orange! (Orange!) Orange! (Orange!)”: dansbild. Disa sträcker båda armarna rakt upp och båten gungar upp på en våg i takt. Orange blixt: på rösten ”Orange!” byts bakgrunden med ett hårt klipp till klarorange (#F26B1D); vattnet och himlen försvinner och bara Disa, båten och skuggan står på orange. Båten har en mörkorange kontur. |  | **Refräng**<br>♪ *Orange! (Orange!)* |
| 09a2 | 2:02.8–2:05.5 | Refräng · 6 dansbild (orange blixt) | Ekot ”(Orange!)”: samma dans, bakgrunden blixtrar till ljusorange (#FAC48E). Mellan raderna är det sjön igen, så rad 1–2 blinkar rop, eko, rop, eko. |  | **Refräng**<br>♪ *Orange! (Orange!)* |
| 09b | 2:05.5–2:08.3 | Refräng · 3 närbild Disa | Rad 3 ”Orange är bästa färgen!”: närbild, händerna på magen (på flytvästen), hon gungar åt sidorna i reggaetakten. |  | **Refräng**<br>♪ *Orange är bästa färgen!* |
| 09c | 2:08.3–2:11.0 | Refräng · 6 dansbild (orange blixt) | Rad 4–5 ”Orange! (Orange!) Orange! (Orange!)”: samma blixt, och nu blir Disa fler. På rösten, klarorange: Disa i båten poppar till fyra i ett rutnät 2 × 2, alla på en gång. Alla gungar i takt med armarna upp. | (pop: fyra) | **Refräng**<br>♪ *Orange! (Orange!)* |
| 09c2 | 2:11.0–2:13.7 | Refräng · 6 dansbild (orange blixt) | Ekot ”(Orange!)”, ljusorange: de poppar igen till ett helt mönster av dinos i båtar, 4 × 3 med varannan rad förskjuten ett halvt steg som ett tryck. Samma utklipp och ansikte i alla, renderade en gång. | (pop: mönstret) | **Refräng**<br>♪ *Orange! (Orange!)* |
| 09d | 2:13.7–2:16.5 | Refräng · 6 dansbild (jättepumpan) | Rad 6 ”Som apelsin och pumpa!”: en Disa igen. Klipp till jättepumpan mot ljusblå himmel, ca 2/3 av bildhöjden. Disa står på toppen (ca 27 % av bildhöjden), sätter ner båtens orange flagga (plopp), flaggan fladdrar och hon sträcker armarna upp och jublar. | (plopp) | **Refräng**<br>♪ *Som apelsin och pumpa!* |
| 09e | 2:16.5–2:19.2 | Refräng · 6 dansbild | Rad 7 ”Tut, tut, tut, tut”: dansbild, båten gungar två gånger på de första ”tut, tut”, och på de sista gör Disa två små knytnävspumpar. Tutet är båtens mistlur. | (tut, tut: mistluren) | **Refräng**<br>♪ *Tut, tut, tut, tut –* |
| 09f | 2:19.2–2:21.9 | Refräng · 3 närbild Disa | Rad 8 ”vad är orange? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra. |  | **Refräng**<br>♪ *vad är orange? Titta ut!* |
| 10 | 2:21.9–2:22.6 | Kritsvep · kritsvep | Kritsvep i bryggans ljusblå (#A8DCF2), från vänster till höger, precis innan ”Vad är orange?”. | (skrrrrt) |  |
| 11 | 2:22.6–2:25.3 | B · Bryggan · 4 helbild | ”Vad är orange?”: Agda sitter på bryggkanten med fruktkorgen bredvid sig. Båten puttrar in från vänster. | (putt, putt) | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *Vad är orange? (Vad är orange?)* |
| 11a | 2:25.3–2:30.8 | B · Bryggan · 4 helbild | ”Titta där! Apelsinen är orange”: båten har lagt till nedanför Agda och Disa pekar på apelsinen i korgen. Kameran glider långsamt in mot korgen (platsens enda kamerarörelse); bilden visar slutläget. |  | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *Titta där! (Titta där!)*<br>♪ *Apelsinen är orange –* |
| 11b | 2:30.8–2:33.5 | B · Bryggan · 3 närbild Disa | ”rund, rund, rund”: närbild, Disa ritar en cirkel i luften med tassen. |  | **Orange sak 3 – apelsinen (bryggan)**<br>♪ *rund, rund, rund!* |
| 11d | 2:33.5–2:36.2 | B · Bryggan · 5 närbild Agda | Lucka i sången, ca 6,8 s, grooven fortsätter under. Närbild Agda med korgen: apelsinen (närmast Disa), det gröna äpplet och den gula bananen. Färgövningen: tre färger, Disa väljer. | DISA: Hej, Agda! · AGDA: Kvack! Hej, Disa! Vad vill du ha? | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ lucka: "Hej, Agda!" "Kvack! Hej, Disa! Vad vill du ha?" Agdas korg: en apelsin, ett grönt äpple, en gul banan. Disa pekar: "Apelsin, tack!" "Varsågod!" "Tack!" |
| 11e | 2:36.2–2:38.3 | B · Bryggan · 4 helbild | Disa pekar på apelsinen. | DISA: Apelsin, tack! | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ forts. |
| 12 | 2:38.3–2:40.3 | B · Bryggan · 4 helbild | Agda räcker ner apelsinen från bryggan och Disa tar emot den. Äpplet och bananen ligger kvar i korgen. | AGDA: Varsågod! · DISA: Tack! (pling) | **Orange sak 3 – apelsinen (bryggan)**<br>⏸ forts. |
| 13a | 2:40.3–2:43.0 | B · Bryggan · 4 tvåbild (helbilden närmare) | Vers 2. ”Oj, oj, plask”: tvåbild, ett närmare utsnitt av helbilden. Apelsinen glider ur Disas tassar och plaskar i vattnet bredvid båten. Båda blir förvånade. | (plask!) | **Vers 2**<br>♪ *Oj, oj, plask – där flöt den bort!* |
| 13b | 2:43.0–2:45.8 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”– där flöt den bort!”: samma tvåbild, apelsinen guppar bort åt höger på vågorna. Disa blir lite ledsen, bara en kort stund. |  | **Vers 2**<br>⏸ forts. |
| 13d | 2:45.8–2:51.2 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Agda simmar, kvack, kvack, kvack!”: Agda har hoppat i och simmar tillbaka med apelsinen på näbben. Ringar på vattnet efter henne. | (plask, kvack, kvack, kvack) | **Vers 2**<br>♪ *Agda simmar, kvack, kvack, kvack!* |
| 14c | 2:51.2–2:56.7 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”En halva var – till dig och mig!”: Agda sitter på bryggan igen och har delat apelsinen. Hon håller en halva och Disa en: en halva var. |  | **Vers 2**<br>♪ *En halva var – till dig och mig!* |
| 14d | 2:56.7–2:59.4 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”Mums, mums, mums”: båda äter sin halva, en tugga per ”mums”. |  | **Vers 2**<br>♪ *Mums, mums, mums – hurra, hurra!* |
| 14e | 2:59.4–3:02.1 | B · Bryggan · 4 tvåbild (helbilden närmare) | ”– hurra, hurra!”: båda sträcker armarna upp. Apelsinen är slut, så händerna är fria till dansen. |  | **Vers 2**<br>⏸ forts. |
| 14f | 3:02.1–3:03.5 | Danspaus · discot · 6 dansbild (discot) | ”Danspaus!”: klipp till discot, ljusorange med en orange discokula som snurrar sakta och kastar ljusprickar. Disa är ute ur båten och dansar stor mitt i bild med armarna upp, med ett litet stjärnregn runt sig. | (boing!) | **Danspaus**<br>♪ *Danspaus! (Danspaus!)* |
| 14g | 3:03.5–3:04.9 | Danspaus · discot · 6 dansbild (discot) | ”(Danspaus!)”, ekot: Agda hoppar in och landar bredvid henne, båda lite mindre (samma bild utan klipp). | (boing!) | **Danspaus**<br>⏸ forts. |
| 14i | 3:04.9–3:07.6 | Danspaus · discot · 6 dansbild (discot) | ”Hoppa, hoppa!”: solobild, grodan Gurra ensam och stor mitt i bild, hoppar, stjärnregn runt honom. |  | **Danspaus**<br>♪ *Hoppa, hoppa! (Hoppa, hoppa!) – Grodan Gurra* |
| 14j | 3:07.6–3:10.3 | Danspaus · discot · 6 dansbild (discot) | ”Snurra runt!”: solobild, fjärilen Fia snurrar i luften, stjärnregn runt henne. | (fladder) | **Danspaus**<br>♪ *Snurra runt! (Snurra runt!) – Fjärilen Fia* |
| 14k | 3:10.3–3:13.0 | Danspaus · discot · 6 dansbild (discot) | ”Klappa, klappa!”: solobild, musen Mille klappar med armarna upp, stjärnregn runt henne. | (klapp, klapp) | **Danspaus**<br>♪ *Klappa, klappa! (Klappa, klappa!) – Musen Mille* |
| 14l | 3:13.0–3:18.5 | Danspaus · discot · 6 dansbild (discot) | ”Alla dansar – orange dans!”: alla fem i ett svagt V, Disa i mitten lite större och ett steg fram, Gurra och Agda bredvid, Fia och Mille ytterst. Disa och Agda har armarna upp, statisterna gör sin rörelse. |  | **Danspaus**<br>♪ *Alla dansar – orange dans! (Orange dans!)* |
| 14m | 3:18.5–3:21.2 | Danspaus · discot · 6 dansbild (discot) | ”Orange dans!” upprepas: samma rad, Disa och Agda gungar med händerna på magen. |  | **Danspaus**<br>⏸ forts. |
| 15a | 3:21.2–3:24.0 | Danspaus · discot · 6 dansbild (discot) | Sista refrängen i discot, en snabb solobild per sak. ”Fisken – orange!”: grodan hoppar och fisken hoppar bredvid honom; fisken poppar upp som första småbild i bågen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Fisken – orange! (Orange!)* |
| 15b | 3:24.0–3:26.7 | Danspaus · discot · 6 dansbild (discot) | ”Pumpan – orange!”: solobild, musen klappar bredvid pumpan. Pumpan poppar upp i bågen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Pumpan – orange! (Orange!)* |
| 15c | 3:26.7–3:30.8 | Danspaus · discot · 6 dansbild (discot) | ”Väst och apelsin och båt – orange!”: solobild, Disa hoppar med armarna upp. Västen, apelsinen och båten poppar upp i bågen, en per ord. | (pop, pop, pop) | **Sista refrängen – sammanfattning**<br>♪ *Väst och apelsin och båt – orange! (Orange!)* |
| 15d | 3:30.8–3:33.5 | Danspaus · discot · 6 dansbild (discot) | ”Orange är bästa färgen”: alla fem igen i raden, Disa och Agda med händerna på magen. |  | **Sista refrängen – sammanfattning**<br>♪ *Orange är bästa färgen,* |
| 15e | 3:33.5–3:36.2 | Danspaus · discot · 6 dansbild (jättepumpan) | ”som apelsin och pumpa!”: klipp till jättepumpan, samma bild som 05d och 09d. De andra fyra är inte med. | (plopp) | **Sista refrängen – sammanfattning**<br>♪ *som apelsin och pumpa!* |
| 16 | 3:36.2–3:43.0 | Danspaus · discot · 6 dansbild (discot) | ”Hej då, hej då – tut, tut!”: kvar i discot, under bågen med småbilderna. Disa sitter i båten på ett litet stycke blått vatten och puttrar iväg åt höger mot en orange sol och vinkar; tutet är båtens mistlur. De andra har dansat ut ur bild. Outrot i sången kortas till ca 4 s här. | (tut, tut) | **Sista refrängen – sammanfattning**<br>♪ *Hej då, hej då – tut, tut!* |
| 17 | 3:43.0–3:45.1 | Avslutning · zoom ut | Zoom ut: discot krymper till en teckning på papperet: Disa i den orange båten under den orange solen, med småbilderna i en båge ovanför. | (swoosh) |  |
| 18 | 3:45.1–3:55.1 | Outro · fast | Det vanliga outrot. Disa och Agda tittar fram vid kanten och vinkar. |  |  |
<!-- /tabell -->

## Kontroll mot `format/regler.md`
- [x] 2 figurer (Disa, Agda) och 3 statister (Gurra, Fia, Mille), alla befintliga, inga repliker, en rörelse var
- [ ] 2 platser (sjön, bryggan), ett platsbyte med kritsvep. **Avvikelse som i 005:** jättepumpan (rad 6) och discot (danspausen) är egna bakgrunder, räknade som dansbildens inställning; klippen till och från discot är raka
- [ ] 2 nya saker (båten, apelsinen). **Avvikelse:** fisken, pumpan, solen och fruktkorgen är nya lager på sjön och bryggan (bakgrund, som busken och ballongen i 005). Flaggan, västen och halvorna är kod
- [x] 1 ny pose per figur (Disa sitter i båten, Agda på bryggkanten); Agda som simmar (13d) är samma utklipp med vatten framför, ingen ny pose
- [x] Zoom in efter kritan ritar, zoom ut i slutet
- [x] En fråga till tittaren med paus (ca 4 s, inom 4–5 s om Suno håller den) och svar (08–08c)
- [x] Upprepning: "Vad är orange? Titta där!" tre gånger, refrängen två gånger med samma bilder, sammanfattningen sist
- [x] Ingen säger det som sjungs; ingen säger "Hej då!" i 16
- [x] 6 kamerainställningar, regelns max
- [x] Vardagshandling och tack ("Apelsin, tack!" "Varsågod!" "Tack!"), dela (en halva var), hjälpa (Agda simmar efter apelsinen), flytväst i båten
- [x] En sak i taget: bara Fia i bakgrunden i 04; sedan står sjön still när en orange sak dyker upp. **Medvetet undantag:** den orange blixten
- [ ] **Tempo:** refrängens närbilder (05b, 05f, 09b, 09f) är en takt = 2,7 s, lite över regelns 1,5–2,5 s; rättas när tiderna sätts efter `rader.txt`. 04 + 04a är 24,6 s körscen (mellanspel och vers 1, som 004 i 005); 10 (kritsvepet) är 0,7 s; 14f och 14g är 1,4 s var (samma bild utan klipp)
- [ ] **Längd** ca 3:55, inom 3–4 min men i överkant (se ovan)
- [x] Short: 05a–08c (refrängen, fisken, pumpan, frågan) blir ca 60 s
- [ ] **Intro (01)** är ritat i bygg.py; det riktiga introt (`intro/` som i 005: logotypen, titelkortet, jingeln) är inte renderat för 006
