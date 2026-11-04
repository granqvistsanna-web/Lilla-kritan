# Granskning av avsnitt 005 · Rosa bilen

Granskat 2026-11-04 med nya ögon: `manus.md`, `sang.md`, `suno.md`, `storyboard.md`, `bildlista.md`, `storyboard/bygg.py` och alla 61 bilderna i `storyboard/frames/`, mot `format/regler.md`, `format/overgangar-och-maner.md`, `stil/stilguide.md` och besluten i 004. Sången finns inte som `sang.m4a` än, så tiderna är fortfarande preliminära.

**Kort sagt:** berättelsen håller och är fin för en 2-åring. Den har en händelse (vi letar rosa), ett litet problem (kulan ramlar ner), en lösning med en kompis (grodan ger två nya kulor), en fråga med paus och svar, och ett tack. Felen var bildfel: två av de rosa sakerna syntes inte när de sjöngs, en närbild klippte huvudet, kulan i golvet försvann, och bildlistan beskrev ett äldre avsnitt. Allt det är rättat, och Sanna har godkänt tre av de öppna frågorna (1, 2 och 6), som också är gjorda. Avsnittet har nu 58 bilder och följer tagningen (3:17, se längst ned).

## Fel (rättade)

| Problem | Varför | Ändring | Status |
|---|---|---|---|
| **11a: den rosa glasskulan syns inte.** Den stora struten ovanför kiosken var avskuren i bildens överkant, så bara struten syntes, inte kulan. | Sången sjunger "Titta där! Glassen är rosa" just här. Det sjungna ska synas, och det rosa var det enda som saknades. | Kameran glider långsamt upp efter musens pekfinger tills hela struten med den rosa kulan syns (`tilt_upp` i bygg.py). Det är platsens enda panorering och ingen ny kamerainställning. | ✅ bygg.py, manus, storyboard |
| **07b: ballongen syns inte på "upp, upp, upp".** I närbilden låg ballongen utanför bilden, bara en rosa flik i kanten. | Barnet ska se vad musen pekar på. | Ballongen har stigit och glidit närmare, och syns snett ovanför henne i närbilden. | ✅ bygg.py, storyboard |
| **06b: vänstra örat klipptes av** i sniff-närbilden. | Inget viktigt ska klippas. Huvudet är bildens fokus. | Inramningen flyttad så att hela huvudet syns, och busken står lite närmare i närbilden så att blommorna och doften fortfarande är med. | ✅ bygg.py |
| **Kulan i golvet försvann** efter 14a. I 14d, sista refrängen och 16 var golvet tomt. | Kontinuitet: barnet har just sett plupp, och "där föll den ner" pekar på kulan. | Kulan ligger kvar i alla helbilder till slutet. | ✅ bygg.py, manus, storyboard |
| **Zoomen ut (17) beskrev glassberget**, som redan är uppätet i sista refrängen. | Texten stämde inte med bilden. | "kiosken med grodan och den rosa bilen". | ✅ manus, storyboard |
| **`bildlista.md` var gammal**: kycklingen Pip i stället för grodan, 5 kamerainställningar i stället för 6, och den breda musen och den detaljerade bilen. | Dokumenten ska stämma med varandra och med bilderna. | Omskriven efter det som finns nu: blob-Mille med lemmar och ansikte i kod, Grodan Gurra, den enkla bilen med rigg, glassdelarna i kod och de 6 inställningarna. Grodans blå fluga är listad som saknad bild. | ✅ bildlista.md |
| **`suno.md`: tabellen över delarna hade gamla bildnummer** och sa "Pip pip! Brum-brum, nu kör vi!" efter zoomen, fast manus stryker det talade "Brum-brum". | Samma sak: dokumenten ska stämma. | Bildnumren rättade (03–03b, 05h, 07b, 08c, 09a–h, 11–11b, 11c–13e, 14a–16) och "Brum-brum" struket. Promptblocket är orört. | ✅ suno.md |

## Förbättringar (gjorda)

| Problem | Varför | Ändring | Status |
|---|---|---|---|
| **11e: musen pekade på den gula glassen.** Den rosa stod längst bort, och musens korta arm nådde bara den närmaste. | Färgövningen: det barnet ser ska vara det som sägs ("Rosa, tack!"). | Ordningen på disken är rosa, grön, gul, med den rosa närmast musen. Pekfingret når den och grodan räcker fram den med sin närmaste hand i 12. | ✅ bygg.py, manus, sang.md (lucktexten), storyboard |
| **Grodan hälsar inte tillbaka.** Musen säger "Hej, grodan!" och grodan svarar direkt "Vilken glass vill du ha?" | Att hälsa tillbaka är vardagshandlingen, och det är en talad replik, inte sjungen. | GRODAN: "Kväk! Hej, musen! Vilken glass vill du ha?" | ✅ manus, sang.md (lucktexten), storyboard |
| **14b och 14d: grodan "hoppar med armarna upp"**, men armarna hängde utåt. | Bilden ska visa det som står och sjungs ("hurra"). | Grodan har samma armar upp som i dansen. | ✅ bygg.py |
| **15c: musens småbild var en fyrkant** (den icke utklippta bilden) bland runda, och raden låg mot den stora struten och strålarna mot bildkanten. | Sammanfattningen ska vara en lugn, jämn rad. | Musens huvud ur utklippet, raden lite lägre och längre åt vänster. | ✅ bygg.py |
| **02b–02c: de ritade hjulen hade gula nav**, men bilen har rosa. | Teckningen ska bli just den bil som zoomas in. | Rosa nav. | ✅ bygg.py |
| **Refrängens klipp är 2,3 s** utan att storyboarden sa att det är en medveten avvikelse, och checklistan sa "närbilderna 2–3 s" mot regelns 1,5–2,5 s. | Samma avvikelse som 004 skrev ut. | Avvikelsen stod först under refrängdansen. Den är borta nu, eftersom refrängen har 6 klipp på 8 rader (öppen fråga 1). Checklistan säger att närbilderna kortas till högst 2,5 s när tiderna sätts efter `rader.txt`, med frågan och pausen (08–08a) som enda undantag. | ✅ storyboard.md |

Alla bilder och `kontaktark.jpg` är byggda om (`bygg.py`, 0 krediter), och tabellen i `storyboard.md` är skriven om av skriptet.

## Det här fungerar

- **Berättelsen** följer reglerna: 2 figurer, 2 platser, 2 nya saker, 1 ny pose per figur, 6 kamerainställningar. Inget är läskigt, det ledsna är 1 s, och problemet löses av en kompis. "Rosa, tack!" "Varsågod!" "Tack!" är ett fint vardagsögonblick, och glassberget betalar refrängens "rosa som ett glassberg".
- **Mönstret** "Vad är rosa? (Vad är rosa?) Titta där! (Titta där!)" kommer tre gånger med samma bildrytm: glider in, stannar och pekar, närbild med rörelsen. En 2-åring förstår det redan andra gången.
- **Frågan** har syfte, liv i pausen (skelögd mot nosen) och svar (fingret på nosen, vick med öronen). Barnet kan också leta rosa i sitt eget rum.
- **Ingen säger det som sjungs**: sniff, upp, vick och mums görs i bild.
- **Sången** är sjungbar: korta rader, ekot på rätt ställen, raderna "Musen kör sin rosa bil" och "Musen letar rosa nu" har samma antal stavelser, och sista refrängen sammanfattar med småbilderna. Suno-taggarna är rimliga och funkstilen är Sannas val.
- **Bilen mot kioskens rosa vägg** syns tydligt i kontaktarket tack vare den ljusare rosan och den tjockare vita kanten. Bilen kör åt höger hela avsnittet, rosetten sitter vid höger öra i varje bild, och musen och grodan är lika stora i fönstret.
- **Husstilen** håller: klotformer utan kontur, vit klistermärkeskant, ansikten i kod och kritkorn över allt.

## Öppna frågor till Sanna

1. ✅ **Gjort (Sanna, 2026-11-04): två ekorader per klipp.** Refrängen har 6 klipp i stället för 8, likadant i 05a–f och 09a–f. I sista refrängen är 15a–c en dansbild och 15d–e en närbild. `RADER`, `REFRÄNG_TEXT`, `REFRÄNG_TID` och `REF` i bygg.py, och storyboard.md och manus.md, är ändrade. Förslaget var: Nu byts bilden var 2,3 s, 8 gånger per refräng och tre gånger i avsnittet. Ett lugnare mönster: dansbild på rad 1–2, närbild på rad 3 (hjärtat), dansbild på rad 4–5, närbild på rad 6 (glasstoppen), dansbild på rad 7 (tuta), närbild på rad 8 (titta ut). Det ger 6 klipp i stället för 8, närbilderna blir känslorna, barnet ser hela dansen längre, och det tar bort 4 bilder ur 05 och 09. Dansen är densamma. Säg till så gör jag det i `RADER` i bygg.py.
2. ✅ **Gjort, och ändrat igen (Sanna, 2026-11-04): nosen sitter 10 px högre, är lite mindre (25 × 17) och mörkare rosa (`#D6568A` med kant `#80284E`)**, jämförelse i `nosen-fore-efter.jpg`. Först blev den större (30 × 21) och tydligt rosa (`#F27BA8`), i både `verktyg/ansikten.py` och `scener/ansikten.js`, med samma API. I kontaktarket syns den nu som en rosa prick i 08a–08c. Det var: Svaret "Nosen är rosa" vilar på en liten rosa prick i 08a–08c. Den kunde vara lite större och rosare i hela avsnittet, men det är `verktyg/ansikten.py` (Milles ansikte), som jag inte rört.
3. **Längden.** Med de preliminära tiderna är avsnittet 3:08, precis över regelns 3 min. Blir `sang.m4a` kortare finns förslaget i storyboarden kvar: en tredje rosa sak på vägen, med samma mönster.
4. **"Musen letar rosa nu"** är lite talspråk; "letar efter rosa" vore korrekt, men en stavelse för mycket i takten. Låt det vara om inte Suno sjunger det konstigt.
5. **Introts paus i Suno** är `[Instrumental Break - 4 bars]`, vilket blir ca 9 s i 104 bpm, mot manus 4–5 s. Antagligen med flit, eftersom Suno brukar korta pauser. Kortas den i redigeringen behövs ingen ny tagning.
6. ✅ **Gjort: ny bild 14e.** På "hurra, hurra" stoppar musen sista biten av struten i munnen och sträcker armarna upp med grodan, i samma helbild utan klipp. Det var: glassberget försvann mellan 14d och 15a (uppätet på 2 s), så att händerna blev fria för dansen. Det går bra för små barn, men vill du kan musen äta sista biten på "hurra" i 14d.
7. **Grodans blå fluga** saknas i utklippen och storyboarden. Det behöver en ny bild om den ska vara med (står i `bildlista.md`).

## Efter granskningen: ratten och tassarna (Sanna, 2026-11-04)

✅ (Ändrat igen: bara en tass på ratten, se nedan.) Ratten var en tunn svart ring som syntes nästan från sidan, delvis bakom magen eller bilens kant, och höger arm sträckte sig bakåt över vindrutan. Nu ritas ratten i kod (`RATT_C`, `RATT_RX`, `RATT_RY`, `GREPP` i bygg.py). Den är en mörkgrå kritring med ekrar och rosa tutknapp, lutad mot oss framför bröstet, och ritas efter bilens kant så att den aldrig skyms. Tassarna ligger på klockan 10 och 2 med lätt böjda armar framför kroppen (`nå()`). När hon svänger följer tassarna ringen. När hon tutar ligger ena tassen på knappen. Gör ena armen något annat, håller den andra kvar ratten. Jämförelse: `ratten-armar.jpg` (04, 05b, 05e, 08).

## Efter granskningen: danspausen (Sanna, 2026-11-04)

✅ Ny del mellan vers 2 och sista refrängen, bild 14f–14m i kioskens helbild utan klipp. Musen hoppar ur bilen och står på sina egna ben, grodan hoppar ut över disken, och tre statister kommer in en per rad med något rosa: ankan Agda med ballongen (hoppa), kycklingen Pip med en blomma ur busken (snurra) och kaninen Kanel (klappa). Sist står alla fem i en rad med musen i mitten. Sista refrängen dansas sedan av alla fem på golvet, med samma rörelser och klippmönster, och i 16 hoppar musen in i bilen och kör iväg medan de andra vinkar. Statisterna står i `manus.md` och `bildlista.md`. Inga nya bilder behövdes: kaninen har redan en ansiktslös kropp.

**Längden med danspausen (före sången):** ca 3:38 (var 3:08), inom regelns 3–4 min men över målet 3:25–3:30. Danspausen blir ca 30 s, inte 20, eftersom texten har två groovepartier på 4 takter (ca 9 s var i 104 bpm) plus "Danspaus!" och fyra rader med eko. Kortas sista groovet (14m) till 2 takter blir det ca 3:33; kortas båda blir det ca 3:28. Det avgörs i Suno-prompten eller i redigeringen. Öppen fråga 3 (för kort avsnitt) är därmed inte längre aktuell.

## Efter granskningen: tiderna efter sången (2026-11-04)

✅ Storyboarden följer nu tagningen `sang.m4a` (3:10.8) och `rader.txt`, utan förlängda pauser. **Avsnittet är 3:17** med outrot kortat till 4 s. Ändringar där tagningen inte stämde med planen:
- **Gissningspausen** är ca 1 s, så hjulen och ratten ritas medan "vad kan det vara?" sjungs (02a–02b), som i 004.
- **Frågepausen** är ca 3 s; ledtråden (skelögd mot nosen) ryms i den (08a).
- **Kioskluckan** är ca 6,5 s. Replikerna är kortade ("Hej, grodan!" "Kväk! Vilken glass vill du ha?" "Rosa, tack!" "Varsågod!" "Tack!") på tre bilder (11d, 11e, 12). 11c (musen vinkar) utgår.
- **Missödet ligger på vers 2**, så att bilden visar det som sjungs: plupp (13a), grodan hjälper (13d), glassberget (14c), mums och hurra (14d–e). "Oj!" och "Ingen fara!" är strukna. 13, 13b, 13c, 13e, 14a och 14b utgår.
- **Danspausen** har ingen groove före "Hoppa": musen landar på "Danspaus!" (14f) och grodan på ekot (14g). 14h utgår. "Rosa dans!" upprepas fem gånger på 14l–14m.

Bildlängder som bryter mot reglerna står i kontrollen i `storyboard.md`: 05d 1,4 s, frågans närbild 08–08c och 15d 3,4 s, och körscenen 04 på 24 s.

## Efter granskningen: discot, en tass på ratten, nosen och glassberget (Sanna, 2026-11-04)

✅ **Danspausen** ligger nu i ett disco i stället för vid kiosken: en ljusrosa bakgrund med en rosa discokula (`assets/bakgrunder/danspaus/`). Ankan och kycklingen (med ballongen och blomman i händerna) är borta. Statisterna är Kaninen Kanel (hoppar), Humlan Humle (snurrar och surrar) och den nya Dinon Disa (stampar och klappar; armarna är för korta för att nå ihop, så klappet syns i strecken), med en solobild var på sin rad och alla fem i en rad på "Alla dansar". Sista refrängen dansas i discot med en solobild per sak (humlan, kaninen, musen) och alla fem på "favoritfärg". På "Hej då" klipper det tillbaka till kiosken, där musen kör iväg och grodan vinkar. **Två avvikelser från reglerna:** discot är en tredje bakgrund med raka klipp dit och tillbaka (inte kritsvep), och Dinon Disa är en ny figur som statist. Båda står i kontrollen i `storyboard.md`.
✅ **Ratten:** bara tassen närmast rattens mitt (höger) håller ratten; den andra är fri. Gör höger tass något annat tar vänster ratten (`RATT_TASS`). Jämförelse: `ratten-armar.jpg`.
✅ **Nosen:** högre, mindre och mörkare rosa i `verktyg/ansikten.py` och `scener/ansikten.js` (se fråga 2).
✅ **Glassberget** är bilden `assets/rekvisita/cut/jordgubbsglass-glassberg.png` i 13d–14d och i småbilden.

## Efter granskningen: ingen ratt, kiosken, rosa blixt, discot och titeln (Sanna, 2026-11-04)

✅ **Titeln** är *Rosa sången*. Bild 01 är stillbilden `intro/stills/7.0.jpg`. Mappen heter fortfarande `005-rosa-bilen`.
✅ **Ingen ratt.** Ratten och tutknappen är borta ur alla bilder och ur `bygg.py`. Tassarna vilar på bilens kant, och kritans tredje ledtråd är en framlykta. Refrängens "Brum, brum, tut, tut" görs som styrning i luften med knytnävarna och två knytnävspumpar. Se `kanten-tassar.jpg`.
✅ **Kiosken.** Musen hoppar ur bilen efter "Tack!" (12a, boing) och äter stående vid disken, med den tomma bilen bakom sig. Vers 2 (13a–14e) är en tvåbild, ett närmare utsnitt av helbilden. Danspausen börjar med musen redan ute.
❌ **Klistermärken** i refrängerna: struket (Sanna). I stället en **rosa blixt**: på varje "Rosa!" i rad 1–2 och 4–5 klipps bakgrunden till klarrosa på rösten och ljusrosa på ekot, med vägen igen mellan raderna, i 05 och 09. Det är ett medvetet undantag från en sak i taget.
✅ **Kontrasten i ekot:** bilen får en mörkrosa kritkontur (`#C2457F`, ca 7 px) innanför den vita kanten i alla blixtar, så karossen skiljer sig från den ljusrosa bakgrunden.
✅ **Discot.** Det har ljusprickar, glimtar i kulan och stjärnregn bara på den som gör radens rörelse. Solobilderna är 58 % av bildhöjden. Gruppen står i ett svagt V. Småbilderna sitter i en båge. Slutet (16) är i discot, och 17 zoomar ut därifrån.
✅ **Gruppen** är nu i Sannas mått: musen 50 %, grodan och kaninen 45 %, humlan och dinon 42 % av bildhöjden, i ett svagt V över 88 % av bredden. ⚠️ Vid de storlekarna går de omlott (ca 115 px var) i stället för att ha luckor; ingen beskärs, och musen står främst.
⚠️ **Disas klapp:** armarna är för korta för att nå ihop, så klappet visas med armarna upp och streck.

✅ **Kioskens vägg** är blå (Sanna): plåten omfärgas i kod från rosa till himmelsblå `#8FCBEB` i hela scen B (11–14e) och i kritsvepet. Markisen, struten, disken och golvet är som förut. Grodan och den mintgröna disken syns tydligt mot det blå. Se `kiosk-bla.jpg`.

## Sångtexten: ändringar som kräver ny Suno-tagning

Danspausen är ny text (lagd i `sang.md` och `suno.md` av en annan session), så den kräver en ny Suno-tagning. Inga andra ändringar: bara de talade replikerna i lucktexten i `sang.md` ändrades ("Hej, musen!" och ordningen på glassarna), och de sjungs inte.
