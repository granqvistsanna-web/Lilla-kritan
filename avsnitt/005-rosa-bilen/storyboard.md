# Storyboard – Avsnitt 005 · Rosa bilen

Bild för bild. **Tiderna följer sången** (`sang.m4a`, 3:10.8, raderna i `rader.txt`, avsnittstid = sångtid + 11 s), som i 004. Tagningen används som den är ("keep original song"): inga pauser förlängs, bara outrot kortas (se nedan). Mest helbild; närbilder 1,5–2,5 s på den sjungna raden.

**Bildstoryboard:** [storyboard/index.html](storyboard/index.html), byggd av utklippen och bakgrunderna med `storyboard/bygg.py` (0 krediter).

**Platser:** Vägen `#A6D86B` (en körscen, två stopp vid rosa saker) · Refrängerna `#8cc35f` (refrängdansen i 05 och 09, dansbild och närbild) · Glasskiosken `#F06EAA` (rosa vägg, grodan i fönstret)
**Längd:** 3:17 inklusive intro och outro: intro 11 s, sången till 2:50.1 plus 4 s av outrot (3:05.1), zoom ut 2 s, outro 10 s. Danspausen är ca 18 s (2:23.3–2:41.2).

**Klippet i slutet:** sången har ca 20 s instrumentalt outro utan röst efter "tut, tut" (sångtid 2:50.1–3:10.8). Behåll de första ca 4 s (till sångtid 2:54.1, medan bilen kör ut i 16) och tona ut, sedan zoom ut (17) och det vanliga outrot (18).

**Pauser som kan förlängas senare** genom att loopa de instrumentala stammarna i `stammor/` utan `vocals.wav` och `backing-vocals.wav` (behövs inte nu, tagningen följs som den är): gissningspausen (sångtid 0:11.1–0:12.2, bara ca 1 s), frågepausen (1:24.4–1:27.5, ca 3 s, manus ville 4–5 s), kioskluckan (1:56.0–2:02.6, ca 6,5 s för fem repliker) och efter "Danspaus! (Danspaus!)" (2:15.0), där en takt groove skulle ge musen och grodan tid att hoppa ut.
**En bild per handling:** varje bild visar en sak som händer, så att historien går att läsa ur bilderna. Där en sjungen rad eller en replik har två handlingar finns två bilder (som 02–02c), men aldrig mer än ett klipp per sjungen rad.
**Ingen text i bilderna:** ljud, repliker och sångrader står bara under bilden.

**Huvudbilden:** bilen är öppen och lägre än musen, så att hon syns från midjan och upp med hela ansiktet. Hon vänder ansiktet mot tittaren, inte rakt framåt. Öronen fladdrar lite i fartvinden. Bilen har inget ansikte; framlyktorna är bara runda gula prickar. Bilen är ljusare rosa än kioskens vägg, så att den syns mot den i scen B.

**Ingen säger det som sjungs** (samma regel som 004). Ekot inom parentes sjungs av kören. Varje rosa sak har ett eget ljud och en rörelse i sången, och musen gör rörelsen i bild på den sjungna raden i stället för att säga en replik:

| Rosa sak | Sjungs | Musen i bild |
|---|---|---|
| Blommorna (06b) | *sniff, sniff, mmm!* | doften slingrar från busken fram till nosen och hon sniffar med nosen uppåt; på "mmm" lutar hon sig lite bakåt, blundar och njuter |
| Ballongen (07b) | *upp, upp, upp!* | lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per "upp" |
| Nosen och öronen (08b, 08c) | *Vick, vick, vick!* | fingret på nosen på "Nosen är rosa" (08b), sedan vickar hon på öronen, en gång per "vick" (08c) |
| Glassen (11b, 14d) | *mums, mums, mums!* | slickar sig om munnen (11b), slickar på glassberget i takt (14d) |

## Kamerainställningar (6, regelns max)
1. Kritan ritar · papper
2. Körscen · helbild (bilen på vänstra tredjedelen och kör in i bilden, vägen glider)
3. Närbild musen i bilen (bröstbild, ratten syns)
4. Glasskiosken · helbild (i 11a glider kameran långsamt upp till den stora struten och tillbaka: platsens enda panorering, ingen ny inställning)
5. Närbild grodan i kioskfönstret
6. **Dansbild** · refrängen på vägen och danspausen i discot (samma inställning på discots bakgrund): bilen i mitten och större, vägen och väggen står still (inget glider under dansen), bilen hoppar i takt och skuggan på golvet blir mindre för varje hopp. Inga nya effekter: skuggan och hoppet är formatets vanliga hopp.

Musens armar och ben är ritade i kod (`verktyg/rita-lemmar-mus.py`): korta raka pinnarmar som vrids runt axeln, så tassen når bara en bit från axeln. **Ratten** ritas i kod i `bygg.py` (`RATT_C`, `RATT_RX`, `RATT_RY`, `GREPP`): en mörkgrå kritring med tre ekrar och en rosa tutknapp, lite tillplattad och lutad mot oss, framför bröstet lite till höger om mitten, strax ovanför bilens kant. Lagren är kaross → musen → kant → ratt → armarna framför, så att ratten aldrig skyms. **En tass på ratten** (Sanna): tassen närmast rattens mitt (`RATT_TASS`, höger) ligger på klockan 2 med armen lite böjd framför kroppen (`nå()` i bygg.py). Den andra armen är fri för radens handling: vinka, peka eller hålla glass. Gör den högra tassen något annat tar den vänstra ratten på klockan 10, så att minst en tass alltid är på ratten när bilen kör. Bara i refrängdansen släpper hon ratten en kort stund (armarna upp, hjärtat, glasstoppen). När hon tutar ligger tassen på den rosa knappen (05e och 09e, 16). Armar som rör vid något framför henne (hjärtat, nosen, ögonen, munnen) ligger framför bilens kant, och glassen hålls i tassen (hel, tom strut efter plupp, sedan glassberget med två kulor ur `rekvisita/cut/jordgubbsglass-glassberg.png`; den tomma struten, kulan i golvet och den gula och den gröna glassen görs i kod ur den vanliga glassen). Ansiktena är humören i `verktyg/ansikten.py`: ropar på ”Rosa!”, kärleksfull på ”favoritfärg”, skrattar på glassberget och tutandet, nyfiken på ”Titta ut!”, förvånad när hon får syn på något, njuter (hela musen lutar bakåt) på sniff, slickar på mums, skelögd i 08a, skrattar i 08b och blinkar när hon vinkar i 03a; annars glad. Glasskiosken är spegelvänd och lite inzoomad i storyboarden (kiosken till höger, bilen fortsätter åt höger som på vägen, och musen och grodan når varandra över disken). Bilen har en tjockare vit kant mot kioskens rosa vägg.

Grodan Gurra är grön (`#6DBE45`) med ljusgul mage och en liten blå fluga (se `karaktarer/grodan-gurra.md`); flugan finns inte i utklippen än och är inte med i storyboarden. Grodan fyller kioskfönstret: huvudet under markisen och axlarna vid disken, så att armarna syns när grodan räcker fram något. Ansiktet är ritat som i 004 (`kit.js`: ögonen ovanpå huvudet, brett leende) med humören i `verktyg/ansikten.py`.

## Bildkomposition (samma mått i hela avsnittet, konstanter i `bygg.py`)
Varje bild har **en sak att titta på**: den som rör sig eller pratar. Den är störst, har mest kontrast och är skarp; allt annat är lugnare och mindre.
- **Körscenen:** bilen står på nedre tredjedelen med mitten vid vänstra tredjedelslinjen och kör in i bilden åt höger, med luft framför sig. Bilen och musen är ungefär en tredjedel av bildhöjden, så att ansiktet syns (`BIL_X`, `BIL_H`).
- **Det rosa som glider in** (busken, ballongen) landar på högra tredjedelen, ungefär lika tungt som bilen, och bilden står still där. Musens blick eller pekfinger går rakt dit (`BUSKE_*`, `BALLONG_*`).
- **Närbild musen:** ögonen 42 % uppifrån, luft ovanför öronen, och bilens kant och ratten i högst den nedersta fjärdedelen (`NÄR_H`, `NÄR_ÖGON`). Musen sitter lite högre i bilen än i riggens färdiga förarbild, så att mer av henne syns över kanten.
- **Dansbilden:** centrerad och symmetrisk med en tydlig siluett, inget annat i bilden.
- **Kioskens helbild:** bilen och fönstret är en grupp, fönstret i musens höjd, och ansiktena ligger nära varandra på samma höjd, med grodans ansikte minst lika stort som musens huvud: bilen är mindre här än på vägen (`KIOSK_BIL_*`, `GRODA_*`). Markisen och den stora struten är lite blekare så att de inte drar blicken, utom i 11a där struten är det musen pekar på och kameran glider upp tills den rosa kulan syns hel. Den rosa glassen står närmast musen på disken, så att pekfingret och grodans hand når den. Kulan som ramlar ner (13a) ligger kvar i golvet i alla helbilder till slutet. I bilderna om grodan är grodans ansikte störst.
- **Sammanfattningen (15):** småbilderna står i en jämn rad på discots vägg, under kulan (`IKON_*`, `IKON_DISCO_Y`), och samma rad på kioskens vägg i 16.

## Kritstruktur och boil
Allt ska se ritat ut med vaxkrita på papper. I storyboarden (`bygg.py`, på som standard; `--platt` stänger av):
- ett svagt papperskorn över hela bilden (multiplicera, samma struktur i varje bild, samplad ur kioskens kritvägg), så att utklippen blir en teckning;
- allt som ritas i kod (kritans rosa form och hjulen i 02, rörelsepilar och streck, doften, cirklarna bakom småbilderna, kritsvepet) fylls med kritkorn och får lite ojämna kanter;
- skuggan under bilen i dansen är kritklotter i stället för en slät oval;
- svaga kritstreck på det ljusa golvet;
- ansiktenas linjer och munnar är en lite ojämn kritlinje med korn (`verktyg/ansikten.py`, `KRITA = True`).

**Boil i animationen** (strukturen skiftar lite var 2–3:e bildruta, värdena i `crayon-cutout`): på figurerna, bilen och sakerna hela tiden, också när de står still (det är det som gör att bilden lever i 08a-pausen och när bilen står vid kiosken); på allt som ritas i kod (pilar, streck, doften, kritsvepet, kritans form i 02); inte på bakgrundsplattorna och inte på papperskornet, som ligger still så att bilden inte fladdrar.

## Refrängdansen (likadan alla tre gångerna: 05a–f, 09a–f och sista refrängen 15a–e)

Refrängen är en liten dans som barnet ska lära sig och dansa med. Rörelserna står i [sang.md](sang.md) under "Refrängdansen", en per sjungen rad. **Sex klipp på åtta rader** (Sanna, 2026-11-04): ekoraderna två och två i dansbilden, så att barnet ser hela dansen länge, och känslorna i närbild (hjärtat, glasstoppen, titta ut). Dansbilden först. 05 och 09 är exakt samma bilder.

Med tagningens tider står dansbilderna på rad 1–2 och 4–5 ca 2,3–3 s, närbilderna 1,4–2,3 s och rad 7 ca 2,4 s, i snitt ca 2,2 s per klipp. Rad 6 i första refrängen (05d, "Rosa som ett glassberg!") är bara 1,4 s, under regelns 1,5 s. Regeln om högst ett klipp per sjungen rad håller.

| Rad | Klipp | Rörelse |
|---|---|---|
| Rosa! *(Rosa!)* Rosa! *(Rosa!)* | Dansbild (6) | Båda armarna rakt upp, bilen hoppar i takt. Samma på ekot |
| Rosa är min favoritfärg! | Närbild musen (3) | Händerna på hjärtat, gunga åt sidorna |
| Rosa! *(Rosa!)* Rosa! *(Rosa!)* | Dansbild (6) | Armarna upp, bilen hoppar (samma bild som rad 1–2) |
| Rosa som ett glassberg! | Närbild musen (3) | Händerna ihop över huvudet som en glasstopp (i bild: armarna rakt upp bredvid öronen, musens korta armar når inte ihop) |
| Brum, brum, tut, tut – | Dansbild (6) | Svänga ratten två gånger, tuta två gånger |
| vad är rosa? Titta ut! | Närbild musen (3) | Handen över ögonen, titta åt ena hållet och sedan åt det andra |

## Danspausen och sista refrängen i discot (14f–15e)
Mellan vers 2 och "Hej då". På "Danspaus!" klipper det från kiosken till **discot**: en enfärgad ljusrosa bakgrund med en rosa discokula som hänger i mitten upptill och snurrar sakta (`assets/bakgrunder/danspaus/danspaus.png` och `cut/discokula.png`; pilen runt kulan visar att den snurrar). Det är dansbildens inställning (6) på en ny bakgrund, ingen ny kamerainställning. Musen hoppar in och landar på sina egna ben (14f) och grodan landar bredvid henne på ekot (14g).

Tre **statister** dansar med, var och en med en egen rörelse och inga repliker: **Kaninen Kanel** hoppar, **Humlan Humle** snurrar och surrar, och **Dinon Disa** (ny figur, `karaktarer/dinon-disa.md`) stampar och klappar. På "Hoppa", "Snurra runt" och "Klappa" får var och en en **solobild**: djuret ensamt mitt på golvet, lika stort som i gruppbilden (14i–14k). På "Alla dansar – rosa dans!" står alla fem i en rad med musen i mitten (14l–14m). I gruppbilderna gör musen och grodan dansens rörelse och statisterna sin egen.

**Sista refrängen** dansas också i discot: en snabb solobild per sak, med småbilden som poppar upp under kulan: "Blommor" humlan bland två rosa blommor (15a), "Ballong" kaninen med ballongen svävande bredvid (15b), "Nos och glass och bil" musen (15c). På "favoritfärg" och "glassberg" står alla fem i raden igen (15d–e, en bild utan klipp). På "Hej då" klipper det tillbaka till kioskens helbild (16): grodan vinkar från fönstret och musen kör iväg åt höger.

Storlekar: musen och grodan som i bilen och fönstret, kaninen och dinon lika stora, humlan lite mindre (`STÅ_H` i bygg.py), fötterna på samma golvlinje (`GOLV_FOT`). Dinons ögon och mun är uppmätta i hennes utklipp. Hennes armar är för korta för att nå ihop, så klappet visas med armarna upp och klappstreck ovanför huvudet, och stampet med dunkstreck vid fötterna.

| Rad | Klipp | Rörelse (samma som raden i refrängen) |
|---|---|---|
| Blommor – rosa! *(Rosa!)* | Solobild humlan i discot (15a) | Snurrar och surrar bland två rosa blommor. Busken poppar upp på väggen |
| Ballong – rosa! *(Rosa!)* | Solobild kaninen (15b) | Hoppar, ballongen svävar bredvid. Ballongen poppar upp |
| Nos och glass och bil – rosa! *(Rosa!)* | Solobild musen (15c) | Armarna upp och hopp (rad 1–2). Nosen, glassen och bilen poppar upp |
| Rosa är min favoritfärg, | Alla fem i raden (15d) | Musen och grodan: händerna på hjärtat (rad 3); statisterna sin rörelse |
| rosa som ett glassberg! | Samma bild (15e) | Musen och grodan: armarna rakt upp som en glasstopp (rad 6) |
| Hej då, hej då – tut, tut! | Kioskens helbild (16), klipp | Musen kör iväg, vinkar och tutar, grodan vinkar från fönstret |

## Bild för bild

Tabellen skrivs av `storyboard/bygg.py`: replikerna står för sig och sångraderna läses ur [sang.md](sang.md), så att den följer med när texten ändras. Ändra inte tabellen för hand; ändra `SHOTS` (bilderna) eller `KARTA` (vilken sångrad som hör till vilken bild) i bygg.py och kör om.

<!-- tabell: skrivs av storyboard/bygg.py -->
| # | Tid (prel.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |
|---|---|---|---|---|---|
| 01 | 0:00–0:11 | Intro · fast | Samma intro som 003 och 004 med nytt nummer och ny titel: Avsnitt 5 · Rosa bilen. Rosa vägg och en liten rosa bil på kortet. | (titeln syns, ingen röst) |  |
| 02 | 0:11.0–0:17.3 | Kritan ritar · 1 papper | Kritan ritar en rosa rundad form, långsamt. Bara formen, inga hjul. | (skrrrrt) | **Intro – kritan ritar**<br>♪ *Kritan ritar, rosa, runt …* |
| 02a | 0:17.3–0:20.7 | Kritan ritar · 1 papper | ”vad kan det vara?”: kritan ritar ett svart hjul och ett hjul till, ledtrådarna kommer medan det sjungs. | (skrrt, skrrt) | **Intro – kritan ritar**<br>♪ *vad kan det vara?* |
| 02b | 0:20.7–0:23.2 | Kritan ritar · 1 papper | ”Vad kan det vara?” och tagningens korta paus (ca 1 s): kritan ritar en rund framlykta, den sista ledtråden. | (skrrt) | **Intro – kritan ritar**<br>♪ *Vad kan det vara?*<br>⏸ paus ca 1 s i tagningen; hjul, hjul och ratt ritas redan under ”vad kan det vara?” |
| 02c | 0:23.2–0:28.4 | Kritan ritar · 1 papper | ”En bil! En rosa bil! Brum-brum, nu kör vi!”: bilen studsar en gång och kritan lyfter. |  | **Intro – kritan ritar**<br>♪ *En bil! En rosa bil!*<br>♪ *Brum-brum, nu kör vi!* |
| 03 | 0:28.4–0:30.4 | A · Vägen · zoom in | Zoom in i den ritade bilen: den blir musens bil på vägen. Musen sitter redan i bilen. Mellanspelet börjar (groove). | (swoosh) |  |
| 03a | 0:30.4–0:32.8 | A · Vägen · 3 närbild musen | Musen vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Brum-brum, nu kör vi!”: det sjöngs nyss. | MUSEN: Pip pip! |  |
| 03b | 0:32.8–0:34.5 | A · Vägen · 3 närbild musen | Hon lägger tassarna på bilens kant och tittar framåt. |  |  |
| 04 | 0:34.5–0:58.5 | A · Vägen · 2 körscen | Mellanspelet och vers 1 (från 0:49.7). Vägen glider, hjulen snurrar och bilen gungar i takt. En fjäril fladdrar förbi högt uppe, den enda rörelsen i bakgrunden. Leadstämman nynnar utan ord 0:40.8–0:48.8. Bilden är 24 s lång: se kontrollen i storyboard.md. |  | **Vers 1**<br>♪ *Musen kör sin rosa bil,*<br>♪ *brum, brum, brum – iväg, iväg!*<br>♪ *Musen letar rosa nu,*<br>♪ *leta med – jag och du!* |
| 05a | 0:58.5–1:01.5 | Refräng · 6 dansbild | Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Rosa! (Rosa!) Rosa! (Rosa!)”: dansbild, vägen står still. Musen sträcker båda armarna rakt upp och bilen hoppar i takt, skuggan krymper. Samma på ekot. |  | **Refräng**<br>♪ *Rosa! (Rosa!)*<br>♪ *Rosa! (Rosa!)* |
| 05b | 1:01.5–1:03.2 | Refräng · 3 närbild musen | Rad 3 ”Rosa är min favoritfärg!”: närbild, händerna på hjärtat, hon gungar åt sidorna. |  | **Refräng**<br>♪ *Rosa är min favoritfärg!* |
| 05c | 1:03.2–1:06.0 | Refräng · 6 dansbild | Rad 4–5 ”Rosa! (Rosa!) Rosa! (Rosa!)”: samma dansbild som rad 1–2, armarna upp och bilen hoppar. |  | **Refräng**<br>♪ *Rosa! (Rosa!)*<br>♪ *Rosa! (Rosa!)* |
| 05d | 1:06.0–1:07.4 | Refräng · 3 närbild musen | Rad 6 ”Rosa som ett glassberg!”: närbild, händerna ihop över huvudet som en glasstopp. |  | **Refräng**<br>♪ *Rosa som ett glassberg!* |
| 05e | 1:07.4–1:09.8 | Refräng · 6 dansbild | Rad 7 ”Brum, brum, tut, tut”: dansbild, på ”brum, brum” styr hon i luften (knytnävarna rullar framför bröstet), på ”tut, tut” två små knytnävspumpar uppåt. Tutet är bilens. |  | **Refräng**<br>♪ *Brum, brum, tut, tut –* |
| 05f | 1:09.8–1:11.6 | Refräng · 3 närbild musen | Rad 8 ”vad är rosa? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra. |  | **Refräng**<br>♪ *vad är rosa? Titta ut!* |
| 06 | 1:11.6–1:13.9 | A · Vägen · 2 körscen | ”Vad är rosa?”: busken med rosa blommor glider in från höger. Musen tittar dit. |  | **Rosa sak 1 – blommorna**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 06a | 1:13.9–1:17.4 | A · Vägen · 2 körscen | ”Titta där!”: vägen stannar mitt för busken och musen pekar på blommorna. |  | **Rosa sak 1 – blommorna**<br>♪ *Titta där! (Titta där!)*<br>♪ *Blommorna är rosa –* |
| 06b | 1:17.4–1:19.1 | A · Vägen · 3 närbild musen | ”sniff, sniff, mmm”: närbild, doften slingrar från blommorna fram till musens nos. Hon sniffar med nosen uppåt, lutar sig lite bakåt, blundar och njuter. På ”mmm” ler hon. |  | **Rosa sak 1 – blommorna**<br>♪ *sniff, sniff, mmm!* |
| 07 | 1:19.1–1:23.0 | A · Vägen · 2 körscen | ”Vad är rosa?”: vägen glider igen, busken åker ut till vänster och en rosa ballong svävar in högt uppe i mjuka vågor. |  | **Rosa sak 2 – ballongen**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 07a | 1:23.0–1:26.5 | A · Vägen · 2 körscen | ”Titta där!”: vägen stannar och musen pekar upp på ballongen. |  | **Rosa sak 2 – ballongen**<br>♪ *Titta där! (Titta där!)*<br>♪ *Ballongen är rosa –* |
| 07b | 1:26.5–1:28.7 | A · Vägen · 3 närbild musen | ”upp, upp, upp”: närbild, ballongen har stigit och syns snett ovanför henne. Musen lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per ”upp”. |  | **Rosa sak 2 – ballongen**<br>♪ *upp, upp, upp!* |
| 08 | 1:28.7–1:35.4 | A · Vägen · 3 närbild musen | ”Vad mer är rosa? Kan du se?”: frågan till tittaren. Musen tittar ut mot tittaren med frågande min. Raden sjungs långsamt (6,7 s). |  | **Frågan till tittaren**<br>♪ *Vad mer är rosa?*<br>♪ *Kan du se?* |
| 08a | 1:35.4–1:38.5 | A · Vägen · 3 närbild musen | Pausen i tagningen, ca 3 s. Ledtråd: musen blir lite skelögd och tittar på sin egen nos. Inget annat rör sig. |  | **Frågan till tittaren**<br>⏸ paus ca 3 s i tagningen |
| 08b | 1:38.5–1:43.8 | A · Vägen · 3 närbild musen | ”Nosen är rosa – och öronen med!”: musen sätter fingret på nosen och ler. |  | **Frågan till tittaren**<br>♪ *Nosen är rosa – och öronen med!* |
| 08c | 1:43.8–1:45.8 | A · Vägen · 3 närbild musen | ”Vick, vick, vick!”: hon vickar på öronen, en gång per ”vick”, så att det rosa inuti syns. |  | **Frågan till tittaren**<br>♪ *Vick, vick, vick!* |
| 09a | 1:45.8–1:48.6 | Refräng · 6 dansbild | Refrängdansen, likadan alla tre gångerna (se sang.md). Rad 1–2 ”Rosa! (Rosa!) Rosa! (Rosa!)”: dansbild, vägen står still. Musen sträcker båda armarna rakt upp och bilen hoppar i takt, skuggan krymper. Samma på ekot. |  | **Refräng**<br>♪ *Rosa! (Rosa!)*<br>♪ *Rosa! (Rosa!)* |
| 09b | 1:48.6–1:50.9 | Refräng · 3 närbild musen | Rad 3 ”Rosa är min favoritfärg!”: närbild, händerna på hjärtat, hon gungar åt sidorna. |  | **Refräng**<br>♪ *Rosa är min favoritfärg!* |
| 09c | 1:50.9–1:53.2 | Refräng · 6 dansbild | Rad 4–5 ”Rosa! (Rosa!) Rosa! (Rosa!)”: samma dansbild som rad 1–2, armarna upp och bilen hoppar. |  | **Refräng**<br>♪ *Rosa! (Rosa!)*<br>♪ *Rosa! (Rosa!)* |
| 09d | 1:53.2–1:55.1 | Refräng · 3 närbild musen | Rad 6 ”Rosa som ett glassberg!”: närbild, händerna ihop över huvudet som en glasstopp. |  | **Refräng**<br>♪ *Rosa som ett glassberg!* |
| 09e | 1:55.1–1:57.4 | Refräng · 6 dansbild | Rad 7 ”Brum, brum, tut, tut”: dansbild, på ”brum, brum” styr hon i luften (knytnävarna rullar framför bröstet), på ”tut, tut” två små knytnävspumpar uppåt. Tutet är bilens. |  | **Refräng**<br>♪ *Brum, brum, tut, tut –* |
| 09f | 1:57.4–1:59.0 | Refräng · 3 närbild musen | Rad 8 ”vad är rosa? Titta ut!”: närbild, handen över ögonen, hon tittar åt ena hållet och sedan åt det andra. |  | **Refräng**<br>♪ *vad är rosa? Titta ut!* |
| 10 | 1:59.0–1:59.6 | Kritsvep · kritsvep | Kritsvep i kioskens rosa (#F06EAA), från vänster till höger, precis innan ”Vad är rosa?”. | (skrrrrt) |  |
| 11 | 1:59.6–2:01.8 | B · Glasskiosken · 4 helbild | ”Vad är rosa?”: grodan står i kioskfönstret. Bilen kör in från vänster. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *Vad är rosa? (Vad är rosa?)* |
| 11a | 2:01.8–2:05.3 | B · Glasskiosken · 4 helbild | ”Titta där! Glassen är rosa”: bilen stannar vid kiosken och musen pekar på den stora glasstruten ovanför. Kameran glider långsamt upp efter pekfingret tills den rosa kulan på struten syns hel (platsens enda panorering), och tillbaka till helbilden i 11c. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *Titta där! (Titta där!)*<br>♪ *Glassen är rosa –* |
| 11b | 2:05.3–2:07.0 | B · Glasskiosken · 3 närbild musen | ”mums, mums, mums”: närbild, musen slickar sig om munnen. |  | **Rosa sak 3 – glassen (glasskiosken)**<br>♪ *mums, mums, mums!* |
| 11d | 2:07.0–2:09.5 | B · Glasskiosken · 5 närbild grodan | Kiosklucka i sången, ca 6,5 s, lugn musik under. Närbild grodan med tre glassar på disken: en rosa (närmast musen), en grön och en gul. Musen hälsar utanför bild. Färgövningen: barnet ser tre färger och musen väljer. | MUSEN: Hej, grodan! · GRODAN: Kväk! Vilken glass vill du ha? | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ lucka, ca 6,5 s i tagningen: "Hej, grodan!" "Kväk! Vilken glass vill du ha?" Grodan visar en rosa, en grön och en gul. Musen pekar: "Rosa, tack!" "Varsågod!" "Tack!" Att kulan ramlar ner och grodan hjälper visas på vers 2. |
| 11e | 2:09.5–2:11.3 | B · Glasskiosken · 4 helbild | Musen pekar på den rosa glassen. | MUSEN: Rosa, tack! | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 12 | 2:11.3–2:13.6 | B · Glasskiosken · 4 helbild | Grodan räcker fram den rosa glassen över disken med sin närmaste hand och musen tar emot den. Den gröna och den gula står kvar. | GRODAN: Varsågod! · MUSEN: Tack! (pling) | **Rosa sak 3 – glassen (glasskiosken)**<br>⏸ forts. |
| 13a | 2:13.6–2:15.6 | B · Glasskiosken · 4 helbild | Vers 2. ”Oj, oj, plupp – där föll den ner!”: musen slickar, kulan ramlar av struten och landar i golvet som en rosa kritklick. Musen håller kvar den tomma struten och tittar ner. Kulan ligger kvar ända till slutet. | (plupp!) | **Vers 2**<br>♪ *Oj, oj, plupp – där föll den ner!* |
| 13d | 2:15.6–2:17.9 | B · Glasskiosken · 4 helbild | ”Grodan hjälper, kväk, kväk, kväk!”: grodan sträcker sig ut och sätter två nya rosa kulor på struten. Musen blir förvånad och glad. Inget talat ”Oj!” eller ”Ingen fara!”: det sjungs. | (pling) | **Vers 2**<br>♪ *Grodan hjälper, kväk, kväk, kväk!* |
| 14c | 2:17.9–2:20.2 | B · Glasskiosken · 3 närbild musen | ”Två rosa kulor – ett glassberg!”: närbild musen, stolt, håller upp glassberget. |  | **Vers 2**<br>♪ *Två rosa kulor – ett glassberg!* |
| 14d | 2:20.2–2:21.9 | B · Glasskiosken · 4 helbild | ”Mums, mums, mums”: musen slickar på glassberget, en slick per ”mums”, grodan hoppar och jublar. |  | **Vers 2**<br>♪ *Mums, mums, mums – hurra, hurra!* |
| 14e | 2:21.9–2:23.3 | B · Glasskiosken · 4 helbild | ”– hurra, hurra!”: samma helbild utan klipp. Musen stoppar sista biten av struten i munnen, och på ”hurra” sträcker hon armarna upp med grodan. Glassen är slut, så händerna är fria till dansen. |  | **Vers 2**<br>⏸ forts. |
| 14f | 2:23.3–2:24.7 | Danspaus · discot · 6 dansbild (discot) | ”Danspaus!”: klipp till discot, en enfärgad ljusrosa bakgrund med en rosa discokula som hänger i mitten och snurrar sakta. Musen hoppar in och landar på golvet på sina egna ben. | (boing!) | **Danspaus**<br>♪ *Danspaus! (Danspaus!)* |
| 14g | 2:24.7–2:26.0 | Danspaus · discot · 6 dansbild (discot) | ”(Danspaus!)”, ekot: grodan hoppar in och landar bredvid henne. | (boing!) | **Danspaus**<br>⏸ forts. |
| 14i | 2:26.0–2:27.9 | Danspaus · discot · 6 dansbild (discot) | ”Hoppa, hoppa!”: solobild, kaninen Kanel ensam mitt på golvet, hoppar. |  | **Danspaus**<br>♪ *Hoppa, hoppa! (Hoppa, hoppa!)* |
| 14j | 2:27.9–2:31.0 | Danspaus · discot · 6 dansbild (discot) | ”Snurra runt!”: solobild, humlan Humle ensam mitt på golvet, snurrar och surrar. | (surr) | **Danspaus**<br>♪ *Snurra runt! (Snurra runt!)* |
| 14k | 2:31.0–2:32.8 | Danspaus · discot · 6 dansbild (discot) | ”Klappa, klappa!”: solobild, dinon Disa ensam mitt på golvet, stampar och klappar. | (dunk, dunk) | **Danspaus**<br>♪ *Klappa, klappa! (Klappa, klappa!)* |
| 14l | 2:32.8–2:36.0 | Danspaus · discot · 6 dansbild (discot) | ”Alla dansar – rosa dans!”: alla fem i en rad med musen i mitten. Musen och grodan har armarna upp, statisterna gör sin rörelse (kaninen hoppar, humlan snurrar, dinon stampar och klappar). |  | **Danspaus**<br>♪ *Alla dansar – rosa dans! (Rosa dans!)* |
| 14m | 2:36.0–2:41.2 | Danspaus · discot · 6 dansbild (discot) | ”Rosa dans!” upprepas, en kort groove före sista refrängen: samma rad, musen och grodan gungar med händerna på hjärtat. |  | **Danspaus**<br>⏸ Rosa dans! upprepas, alla dansar tillsammans |
| 15a | 2:41.2–2:44.9 | Danspaus · discot · 6 dansbild (discot) | Sista refrängen i discot, en snabb solobild per sak. ”Blommor – rosa!”: humlan bland två rosa blommor, och en liten bild av busken poppar upp högt på väggen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Blommor – rosa! (Rosa!)* |
| 15b | 2:44.9–2:47.2 | Danspaus · discot · 6 dansbild (discot) | ”Ballong – rosa!”: solobild, kaninen hoppar och den rosa ballongen svävar bredvid. Ballongen poppar upp på väggen. | (pop) | **Sista refrängen – sammanfattning**<br>♪ *Ballong – rosa! (Rosa!)* |
| 15c | 2:47.2–2:52.0 | Danspaus · discot · 6 dansbild (discot) | ”Nos och glass och bil – rosa!”: solobild, musen hoppar med armarna upp. Nosen, glassen och bilen poppar upp, en per ord. | (pop, pop, pop) | **Sista refrängen – sammanfattning**<br>♪ *Nos och glass och bil – rosa! (Rosa!)* |
| 15d | 2:52.0–2:55.4 | Danspaus · discot · 6 dansbild (discot) | ”Rosa är min favoritfärg”: alla fem igen i raden, musen och grodan med händerna på hjärtat, statisterna gör sin rörelse. |  | **Sista refrängen – sammanfattning**<br>♪ *Rosa är min favoritfärg,* |
| 15e | 2:55.4–2:57.3 | Danspaus · discot · 6 dansbild (discot) | ”rosa som ett glassberg”: samma bild utan klipp, musen och grodan sträcker armarna rakt upp som en glasstopp. |  | **Sista refrängen – sammanfattning**<br>♪ *rosa som ett glassberg!* |
| 16 | 2:57.3–3:05.1 | B · Glasskiosken · 4 helbild | ”Hej då, hej då – tut, tut!”: tillbaka vid kiosken (klipp). Grodan vinkar från fönstret, musen sitter i bilen och kör iväg åt höger, vinkar och tutar på ”tut, tut”. Ingen säger hej då: det sjungs. Outrot i sången (20 s) kortas till ca 4 s här, medan bilen kör ut. |  | **Sista refrängen – sammanfattning**<br>♪ *Hej då, hej då – tut, tut!* |
| 17 | 3:05.1–3:07.1 | Avslutning · zoom ut | Zoom ut: kiosken krymper till en teckning på papperet, med grodan och den rosa bilen. | (swoosh) |  |
| 18 | 3:07.1–3:17.1 | Outro · fast | Det vanliga outrot. Musen och grodan tittar fram vid kanten och vinkar. |  |  |
<!-- /tabell -->

## Kontroll mot `format/regler.md`
- [x] 2 figurer (musen Mille, grodan Gurra) och 3 statister i danspausen (Kaninen Kanel, Humlan Humle, Dinon Disa): inga repliker, en rörelse var. **Avvikelse:** Dinon Disa är en ny figur, inte en befintlig, och statister ska vara befintliga figurer
- [ ] 2 platser, ett platsbyte med kritsvep. **Avvikelse:** discot i danspausen är en tredje bakgrund, och dit och tillbaka till kiosken är raka klipp, inte kritsvep. Det är räknat som dansbildens inställning på en ny bakgrund (Sanna), men det är en tredje plats om man läser regeln strikt
- [x] 2 nya saker (rosa bilen, jordgubbsglassen)
- [x] 1 ny pose per figur (musen sitter i bilen, grodan i kioskfönstret); glassen hålls i kod
- [x] Zoom in efter kritan ritar, zoom ut i slutet
- [x] En fråga till tittaren med paus och svar (08–08c); pausen i tagningen är ca 3 s, inte 4–5 s
- [x] Upprepning: "Vad är rosa? Titta där!" tre gånger med samma bildmönster, refrängen två gånger med samma klipp, och sammanfattningen i sista refrängen
- [x] Ingen säger det som sjungs: musen gör rörelsen (sniff, upp, vick, mums) i bild, och ingen säger "Hej då!" i 16 eftersom det sjungs
- [x] 6 kamerainställningar, regelns max: dansbilden är den sjätte. Ingen fler får läggas till
- [x] Refrängdansen är exakt likadan i 05 och 09 och har samma rörelser och samma mönster (ekoraderna i dansbild, känslorna i närbild) i sista refrängen
- [x] Tempo: högst ett klipp per sjungen rad; i snitt ca 3,4 s per bild (58 bilder på 3:17), och klippen är färre än bilderna, eftersom flera bilder i rad är samma inställning utan klipp (02–02c, 06–06a, 08–08c, 13a–14e utom 14c, 14f–g, 14l–m, 15d–e). Refrängerna har 6 klipp på 8 rader. Fler bilder får inte läggas till utan att något annat slås ihop. Närbilderna ska vara 1,5–2,5 s när tiderna sätts efter `rader.txt`; de preliminära 3 s (05d, 08b, 14c och samma i 09) kortas då. Undantaget är frågan 08–08c, en enda närbild med syfte (fråga, ledtråd, svar)
- [x] Vardagshandling och tack: musen väljer rätt färg bland tre ("Rosa, tack!" "Varsågod!" "Tack!"), kulan ramlar ner (plupp) och grodan hjälper henne med ett glassberg (på vers 2, i bild). Problemet löses med hjälp av en kompis, och det ledsna är bara en kort stund
- [x] En sak i taget: bara fjärilen i bakgrunden i 04, sedan står allt still när en rosa sak glider in
- [x] Short: bild 05a–08c (refrängen, blommorna, ballongen, frågan) blir ca 50 s
- [x] **Längden är 3:17** med tagningens tider och outrot kortat till 4 s, inom regelns 3–4 min.
- [ ] **Bildlängder att se upp med:** 05d är 1,4 s (en sjungen rad, kan inte bli längre utan att flytta klippet från radens början). Närbilder över 2,5 s: frågan 08–08c (17 s i samma närbild, undantaget med syfte; raderna sjungs långsamt: 08 6,7 s, 08a 3,1 s, 08b 5,3 s) (15d är inte längre en närbild: alla fem i discot). 04 är en körscen på 24 s (mellanspelet med nynnande och vers 1), längre än förr; ett förslag är att låta fjärilen komma in först vid vers 1. 14e är 1,4 s (samma helbild som 14d, inget klipp); 14f är klippet till discot och står bara 1,4 s innan grodan landar i 14g (1,3 s, samma bild utan klipp), så discots första inställning står 2,7 s, och kritsvepet 10 är 0,6 s, precis före "Vad är rosa?".
