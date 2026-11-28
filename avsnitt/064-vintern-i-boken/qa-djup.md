# 064 Vintern i boken – djup QA (27/11)

Granskad film: `scener/boken/boken.mp4` (förhandsvisning `--snabb`, 960×540, 15 bilder/s, 199,6 s, renderad 21:23:32). `boken.js` sparades 34 s efter renderingen och committades som ny fil (b6d2322b), så någon diff mot filmen går inte att få fram. Felen nedan syns ändå i filmen precis som koden säger, så filmen och koden verkar stämma överens. Den färdiga filmen (`film/avsnitt-064.mp4`) finns inte än.

**Alla tider är scentid** (rad 01a = 0:00). I den färdiga filmen läggs logotypen från 020 före, så där kommer allt några sekunder senare.

## Status efter rättningen (28/11)

**Flyttat till den delade koden (28/11):** rättningarna är flyttade in i den omgjorda `scener/boken/boken.js`, som nu bygger på `produktion/three-rum/popupbok/uppslag.js`. Konfliktmarkörerna är borta, men sammanslagningen är inte committad.
- **Jämfört med Commit-sessionens referensbilder** (36 bilder från 3562070d): 30 är identiska. Sex skiljer, och alla av avsikt, på grund av de delade rättningarna:
  - **7,18 och 43,07:** glidningen behåller förra vyns fov (`iFov`), så utsnittet är lite annorlunda.
  - **197,98, 198,98, 199,98 och 200,68:** stängningens push är nu ×0,97 utan vridning, i stället för ×0,94 och −1,5°. Hela den stängda boken syns fortfarande, centrerad.
- **Lokalt i 064:** vakten mot korta flytt i `gaRikt` ligger kvar i 064 (`GA_LANG`). `uppslag.js` är orörd av den här sessionen.

**Gemensam rättning A (glidstart):** ligger i `uppslag.js` (065-sessionen) och är på som standard:
- `paZ` i `glid()` och `stangning()`.
- `iFov`: en glidning behåller förra vyns fov och flyttar kameran längs blicken så att målet ser lika stort ut. Det ersätter 064:s `fovPa`, som tog bort zoomrycket på 4 % på rad 19 (28 → 27).
- Kontrollerat: glidstarterna ger samma bild som referensen, utom det avsiktliga fov-utsnittet.

**Gemensam rättning B (stängningen):** 064 väljer den med
- `KAM.stangning(S26 + 0,1, { klar: S26 + 1,6 })`: glidning ut på 1,5 s, sedan en långsam push (×0,97 i `uppslag.js`).
- `fallning(…, { parm: [1,6, 2,3] })`: `PARM_NER = [STANG+1,6, STANG+2,3]`. Korten fälls som förut, `STANG+0,3…+0,8`.
- 064:s egen `VY.slut`: kameran i (−0,2, 2,1, 3,5) tittar mot (0, 0,12, −0,1). Fov 32 följer med från förra vyn via `iFov`.
- Rad 26 är 3,6 s lång, så den stängda boken står ca 1,3 s. `landa-mjuk` ligger på 2,3 s.
- Pärmen passerar aldrig genom kameran, och sista bildrutan visar hela boken, centrerad.

**Rörelse och flyt:**
- **Reaktionsslag:** rättat. Reaktionen från förra raden följer med 0,4 s in i nästa rad, med en liten huvudlutning åt växlande håll. Rad 19 tonar ut rad 18:s pose.
- **Gång med steg:** rättat. Promenader längre än 0,3 s får riggens gångsteg (`L.steg`).
- **Hoppen i 06b:** 0,035 → 0,06.
- **Fotspåren** och **frosten** på öronen är tydligare.
- **Spökträden:** borta. De bakre kullarna tar inte emot skugga.
- **Flingans kontur:** har sex V-formade detaljstreck för sidogrenarna (`kod/snoflinga-kontur.json`).
- **Kontrollerat i bild:** stegen i 06c (41,7–43,7 s), skuttet på rad 20 och hoppen i 06b. Hoppen är 0,06 höga och toppar vid 36,8 och 37,4 s.
- **Inte gjort:** kaninen trampar inte på stället medan den skjuter bollarna (manus: "kaninen går bakom").

**Ljud:**
- **Plopp:** `pop-1`/`pop-2` i stället för `pop-3`/`pop-4`.
- **Kaninens ljud:** egen volym per fil, 3 dB under Malin. Nivåerna är mätta med ebur128 M, och tabellen `KANIN_M` står i `boken.js`.
- **Fågelpipet** ligger 0,3 s före "blå", och den blå fågelns näbb öppnas före ordet.
- **Klappen:** tre stycken (`klapp-1`, `klapp-2`, `klapp-1`), 0,5 s isär, där händerna möts i `L.ROR.klappa`. Kontrollerat: händerna möts vid 172,37, 172,87 och 173,37.
- **Bädden**, som tystnar från 1:04, rättas av huvudsessionen i `render.mjs`.

**Förbättringar 1–10:**
- 1–5 och 7–10 är gjorda, se felen ovan.
- 6 är gjord, se Rörelse och flyt.

**`rader.json`:** synkad med `rader.mjs`. Raderna 04, 05b, 12, 12b, 17, 19b, 22 och 26 var gamla. `qa-scen.py`: alla rader tomma.

**Frågor till Sanna:**
1. Bollarnas ordning är bytt: den stora ligger längst bort och den lilla närmast kaninen, så att ingen rullar genom en annan. Går det bra?
2. Promenaden från bollarna till granen är nu ett klipp. Går det bra?
3. Snögubben reser sig bakifrån, bakom bollarna som fälls framåt. Går det bra?

---

## Dom i tre rader

1. Berättelsen och raderna håller, och Malin ligger fint i ljudet. Men tre rörelser som manus bygger på syns inte: bollarna rullar inte och studsar inte, "bara ett öra" syns inte, och andedräkten ser ut som en fläck.
2. Kaninen går genom snöbollarna (2:10), glider synligt ut ur bild (2:41,9), och bokens kant och skrivbordet syns i fem vyer.
3. Den kan inte slutrenderas som den är. De flesta felen är små kodändringar. Ett är en enda rad: rad 462, där en kodrad har hamnat inne i en kommentar.

---

## Fel (måste rättas)

Varje fel har fyra delar:
- **Sett:** det som syns i bildrutorna. Kontrollerat i kontaktark och i täta bilder, 15 bilder/s runt varje rörelse.
- **Orsak:** det som är slutsats ur koden.
- **Varför:** varför det spelar roll.
- **Förslag:** hur det kan rättas.

### F1. Snöbollarna rullar inte och studsar inte (1:46–2:09)

- **Status: rättat (28/11).** Raden är delad. Bollarna rullar in från vänster (texturen vrids i takt med farten) och studsar på räkningen. Nu ligger den stora bollen längst bort och den lilla närmast kaninen, så att ingen boll rullar genom en annan eller in i kaninen. Kontrollerat i bilder 1:46–2:09.

- **Sett:** Bollarna växer på stället där de ligger, med lite glitter. De rullar inte in från sidan och hoppar inte på "En, två, tre".
- **Orsak:** I `boken.js:462` står positionsraden efter en `//`-kommentar på samma rad:
  ```
  k.m.visible = t >= Q.a && t < GUBBE_UPP - 0.03;   // borta när de ligger platt (…) k.m.position.set(x, SIDA + 0.03 * bump(R16[i], …), bz + 0.0005 * i);
  ```
  Därför körs `position.set` aldrig. Bollarna står kvar där de skapades, och rullningen från x0 och studsen på räkningen försvinner båda.
- **Varför:** Manus ("rulla, rulla … snöboll" och räkningen) handlar om just den här rörelsen. Utan den sjunger Malin om något som inte händer (minnet "Bilden på orden").
- **Förslag:** Flytta `k.m.position.set(…)` till en egen rad. Det är en radbrytning. Titta sedan på täta bilder att bollarna inte rullar in i kaninen (se F3).

### F2. "Bara ett öra" syns inte (1:20–1:30)

- **Status: rättat.** Båda öronen glider ner bakom bandet när det landar. På varje "Plopp" kommer ett öra upp med en liten efterstuds (1:17,5 och 1:20,5). Ljudet är nu `pop-1`/`pop-2` i stället för `pop-3`/`pop-4`, så det första ploppet hörs.

- **Sett:** I närbilden står båda öronen helt uppe ovanför pannbandet, både före och efter varje "Plopp". Det enda som händer är att örat lutar ca 19° (kontrollerat i bilder 1:19,8–1:21,2 och 1:25,4–1:26,6). Ingenting ser instoppat ut.
- **Orsak:** `plopp()` (`boken.js:286`, används på rad 331) vrider bara örat, från −14° till +5°. Örat göms aldrig och kortas aldrig under bandet.
- **Ljud:** Första ploppet, `pop-3`, hörs knappt (topp −44,9 dBFS). `pop-4` är svagt (topp −13,5).
- **Varför:** Skämtet och barnets "titta!" bygger på att ett öra är borta och sedan ploppar fram.
- **Förslag:**
  - Låt båda öronen börja under bandet: skala örats höjd till ca 0,35 eller flytta det ner bakom bandet, med bandet framför i z.
  - På "Plopp" skjuts ett öra upp till full längd med en liten efterstuds. Det andra stannar kvar.
  - Byt `pop-3` mot en hörbar fil, eller höj den rejält.
  - Storlek: medel, ca 20–30 rader. Rigg-nära, så titta på kaninens öronrötter (minnet "Långa rötter").

### F3. Kaninen går genom snöbollarna (2:10,1–2:10,8)

- **Status: rättat, väntar på Sanna.** Flytten från bollarna till granen sker nu på klippet, så kaninen syns aldrig gå genom bollarna. Fråga: är det okej att den promenaden blir ett klipp?

- **Sett:** Kaninen går från platsen framför den stora och mellersta bollen till platsen bakom dem. Under tiden överlappar den bollarna, alltså går rakt igenom.
- **Orsak:** Promenaden `GA[2]` (bollar→gran, 1,6 s, `boken.js:262–269`) går från z 0,26 till z 0,06. Bollarna ligger på z ≈ 0,2. Det är en glidning utan steg.
- **Varför:** Regeln "Inget går genom något".
- **Förslag:**
  - Lägg en mellanpunkt så att kaninen går runt bollarna, framför dem och sedan in vid sidan.
  - Eller klipp till granen i stället för att gå.
  - Storlek: liten.

### F4. Kaninen glider synligt mot kameran före klippet (2:41,9–2:42,3)

- **Status: rättat.** Flytten från trädet till bollarna sker på klippet till rad 21.

- **Sett:** Strax före klippet till rad 21 glider kaninen ner och fram i bild, utan steg.
- **Orsak:** `GA[5]` (trad→vid-bollar, `S('21')-0.6 … S('21')-0.05`). Kommentaren säger "utanför bild", men det stämmer inte i vyn `trad`.
- **Varför:** Det ser ut som ett fel. Ögat följer en figur som åker.
- **Förslag:**
  - Lägg flytten efter klippet, när vyn redan är `bollar`.
  - Eller dölj kaninen under flytten.
  - Storlek: liten.

### F5. Kameran hoppar i början av glidningen till trädet (2:23,27→2:23,33)

- **Status: rättat (gemensam rättning A, nu i `uppslag.js`).** Före `lage` flyttas blickpunkten längs synlinjen till den nya platsens z (`paZ`). Vid glidstarten behåller kameran förra vyns fov (`iFov`). Det ersätter 064:s `fovPa`, som tog bort zoomrycket på 4 % på rad 19. Kontrollerat mot referensbilderna.

- **Sett:** Mellan två bildrutor i följd byter kameran blickpunkt med ett ryck. Sedan glider den vidare.
- **Orsak:** `lage()` och `fran3()` (`boken.js:523–524`, används på rad 536) tappar `mal.z`. Glidningen startar därför från en annan blickpunkt än den förra vyn hade.
- **Gäller också 062–065:** Samma hjälpkod finns troligen i 062–065, så kontrollera dem.
- **Förslag:**
  - Ta med `mal.z` i `lage`/`fran3`.
  - Storlek: liten, en eller två rader.

### F6. Hoppklipp vid 0:41,52 (rad 06c)

- **Status: rättat.** Rad 06c är nu en glidning (0,15 s in, 2,45 s lång) som följer kaninen, inget klipp.

- **Sett:** Ett litet hopp i bild, som ett klipp utan anledning, när rad 06c börjar.
- **Orsak:** Vynyckeln är `namn + plats` (`boken.js:543`). När platsen byter från `mitt` till `steg` blir `halv+steg` en ny vy, och då klipper kameran.
- **Förslag:**
  - Låt platsbyten inom samma vynamn glida, till exempel med `glid`, i stället för att ge en ny nyckel.
  - Eller låt kameran stå kvar på `halv+mitt`.
  - Storlek: liten.

### F7. Bokens kant och skrivbordet syns i bild

- **Status: rättat.** `himmel`, `bred`, `trad`, `tradnara`, `tradhej`, `hejda` och `gubbe` är justerade, och första och sista bildrutan är kontrollerade, också efter pushen. Trädvyerna är vridna lite åt vänster så att himmelskortets högerkant hamnar utanför bild. Närbilden vid granen (rad 17–19) visade en smal remsa skrivbord i vänsterkanten. Platsen `gran` är nu x −0,52 i stället för −0,6, och remsan är borta. Kaninen står kvar framför granen (kontrollerat 2:11–2:24).

Receptet säger att vi ska vara inne i boken.

| Tid | Vy | Vad som syns |
|---|---|---|
| 0:04,9–0:08,0 | `himmel` | Orange skrivbord och beige vägg på båda sidor, blå kant |
| 0:20–0:29 | `bred` | Vit pärmkant till vänster |
| 2:24–2:29 | `trad` | Blå kant och skrivbord till höger. Höger kant syns också i `tradnara` och 24c |
| 2:58–3:02 och 3:11–3:16 | `hejda` | Skrivbordet till vänster bakom granarna |

- **Orsak:** Vyerna i `VY` (`boken.js:506–522`) står för långt bort eller för brett i förhållande till sidan. Till exempel: `himmel` står på 1,75 med fov 34. I 062 står `himmel` på ca 1,25.
- **Förslag:**
  - Gå närmare eller minska fov per vy.
  - Kontrollera varje vy i första och sista bildrutan.
  - Storlek: liten per vy, fem vyer.

### F8. Kaninens öron klipps av i överkanten

- **Status: rättat.** `pannband` och `bollar` står högre och längre bort, och `vid-bollar` är flyttad. `nara` är höjd, så att öronspetsarna syns också efter pushen. Kontrollerat i första och sista bildrutan.

- **Sett:**
  - I vyn `pannband` (0:59,6–1:12,1) klipps öronen av i överkanten.
  - I vyn `bollar` (1:46–2:11 och 2:42–2:53,7) klipps öronen av, och kaninen klipps också vid högra kanten.
- **Varför:** Formatet `bildutsnitt.md` säger att halvnära ska få plats med hela figuren.
- **Förslag:**
  - Sänk blickpunkten eller backa kameran något i båda vyerna.
  - För `bollar`: flytta vyn lite åt höger, eller flytta platsen `vid-bollar` åt vänster.
  - Storlek: liten.

### F9. Pannbandets flygtur (1:16,2–1:17,0)

- **Status: rättat.** Bandet på huvudet är oförändrat (039-bandet). Kritans teckning är omgjord ur samma bild med `kontur.py` (`kod/pannband-kontur.json`, de två ljusa ränderna som detaljstreck). Det flygande kortet är samma bild, så teckningen, kortet och bandet är en och samma sak. Kortet kastar ingen skugga under flygningen. Det flyger nu uppåt först och sedan in över huvudet, så att det inte passerar framför ansiktet. Kortet ligger 4 cm längre åt höger, `PBPOS` x −0,13, så att det är helt i bild när rad 11 börjar (1:15,7).

- **Sett:**
  - Det ritade pannbandet, ett grönt valv med en vit rand, flyger i en båge som går ut ovanför bildens överkant.
  - Dess mörka skugga drar över kaninens ansikte.
  - Sedan byts det på en bildruta mot ett annat band: det randiga, raka stickade bandet från 039.
- **Orsak:** Kortets båge `+0.12` (`boken.js:454–457`) är för hög för vyn. Kortet och bandet på huvudet (`PB_GLID`, rad 331, 344–346) är två olika bilder.
- **Varför:** Det bryter mot minnet "Teckningen som bilden": kritan ritar en sak, och barnet ska se att det är samma sak som hamnar på huvudet.
- **Förslag:**
  - Gör bågen lägre, så att kortet stannar i bild.
  - Ta bort skuggan under flygningen, eller gör den mycket ljusare.
  - Byt antingen bandet på huvudet mot den ritade bilden, eller rita om konturen efter 039-bandet. Mät bilden först.
  - Storlek: medel. Kräver ett bildbeslut av Sanna.

### F10. Kritan väntar ovanpå kaninens mage (1:04–1:06,5)

- **Status: rättat.** Kritan väntar nu på `[-280, -170]`, uppe till vänster och bort från kaninen.

- **Sett:** Under gisspaus 2 svajar kritan ovanpå kaninens mage. Sedan flyger den ut tvärs över kroppen.
- **Orsak:** Väntplatsen `vanta [260,-60]` för pannbandet (`boken.js:406–410`).
- **Förslag:**
  - Flytta väntplatsen upp till höger, bort från figuren, som flingans `[240,40]`, och flyg ut därifrån.
  - Storlek: en rad.

### F11. "Fåglarna säger hej" när fåglarna inte syns (rad 20, 2:36–2:42)

- **Status: rättat.** Rad 20 har en ny vy, `tradkanin`: kaninen i halvbild och alla tre fåglarna.

- **Sett:**
  - Bara den röda fågeln syns, halvt bakom kaninens öra.
  - Kaninen vinkar mot något som inte syns.
- **Förslag:**
  - Byt vy så att alla tre fåglarna och kaninen syns, till exempel `trad` med lite mer bredd.
  - Eller flytta kaninen åt sidan.
  - Storlek: liten.

### F12. Kameran hamnar under pärmen när boken stängs (3:17,8–3:18,3)

- **Status: rättat (gemensam rättning B).** Kameran glider ut till `slut` på 1,5 s, och sedan kommer en långsam push. Pärmen fälls efter det. Pärmen passerar aldrig genom kameran, och sista bildrutan visar hela den stängda boken, centrerad. Siffrorna står under Status överst.

- **Sett:** När pärmen fälls ner ser kameran först himmelssidan underifrån och sedan utsidan ovanifrån. Pärmen passerar alltså genom kameran.
- **062 gör samma sak** (3:31,5–3:31,67). Det är ärvt, inte nytt i 064.
- **Förslag:**
  - Backa och höj kameran innan pärmen fälls. Samma rättning behövs i alla fyra.
  - Storlek: liten, men den ska göras på ett ställe och följa med i alla.

### F13. Snön hinner inte bli klar före klippet (0:25,7–0:29,1)

- **Status: rättat.** Snön är klar 1,0 s före klippet, så att den vita världen får ett reaktionsslag. Maskens kant är mjukare (0,1 → 0,35). Kontrollerat: vitt vid 0:28,7.

- **Sett:**
  - När marken blir vit syns det som ett vågrätt svep (0:25,7–0:26,5), inte som snö som lägger sig.
  - Under tillväxten (0:27–0:28,7) står en hård grön rand och en linje kvar vid kullarna.
  - Det finns ingen paus på den helvita världen före klippet.
- **Orsak:** `SNO = [S('05b')+0.5, S('05b')+5.0]` (`boken.js:246`) slutar 29,18, men klippet till rad 06 kommer redan 29,11.
- **Förslag:**
  - Låt snön sluta ca 1 s före klippet, för ett reaktionsslag på den vita världen (minnet "Reaktionstid för små barn").
  - Mjuka upp maskens kant.
  - Täck randen vid kullarna.
  - Storlek: liten till medel.

### F14. Andedräkten ser ut som en fläck (0:48,7–0:59,5)

- **Status: rättat.** Andedräkten är tre små snöflingetussar på en 2,2 s cykel. De startar vid munnen, glider ut förbi kinden och kroppens kant och tonas bort. De ligger i kortets skärpeplan, så de blir inte suddiga. Kontrollerat 0:48,75–0:59,5.

- **Sett:** En genomskinlig vit skiva på kinden bredvid ögat, som upprepas var 1,4 s. Den ser ut som en fläck på kinden, inte som andedräkt.
- **Orsak:** `ANDE` (`boken.js:477–478`) är en sfär vid `fig2varld([560,455])` med z+0,05. Den sitter alltså framför ansiktet, inte framför munnen och ut från den.
- **Förslag:**
  - Gör ett litet moln av 2–3 tussar som startar vid nosen och glider ut och uppåt medan de tonas bort.
  - Eller ta bort effekten, och låt frostsnön och huttrandet bära raden.
  - Storlek: liten till medel.

### F15. Malin säger "Hoppsan!" innan snötussen landar (rad 17, 2:11,8)

- **Status: rättat.** Tussen landar på S+0,7, mellan öronen och vit med glöd, och Malin börjar på S+1,15 (0,45 s efter). Tussen faller åt sidan, bort från ansiktet. Landningen är kontrollerad i bild. Fallet är inte kontrollerat i täta bilder.

- **Sett:**
  - Malin börjar på 131,79, men tussen landar först på 132,29, alltså 0,5 s för tidigt.
  - Tussen är en stor blek gråblå hög med låg kontrast och ser ut som en grå mössa.
  - När den faller av (2:15,3–2:15,7) glider den över ansiktet.
- **Orsak:** Malins replik startar på `S('17')+0.5`, men `TU.land` är `S('17')+1.0` (`boken.js:258`).
- **Varför:** Det bryter mot minnet "Malin efter handlingen": rörelsen först, repliken 0,4–0,8 s efter.
- **Förslag:**
  - Landa tussen på S+0,4 och låt Malin börja på S+0,9.
  - Ge tussen vitare snö med en mörkare skuggkant.
  - Låt den falla bakåt, bort från ansiktet.
  - Storlek: liten.

### F16. Bollarna blir snögubbe stökigt (2:50,37–2:50,63)

- **Status: rättat, väntar på Sanna.** Bollarna fälls framåt, krymper och blir ljusa, så att inga baksidor syns. Snögubben reser sig bakifrån, bakom dem. Kontrollerat vid 2:51,27. Fråga: går det bra att snögubben reser sig bakifrån?

- **Sett:** I ca 0,3 s:
  - Bollarna fälls platt till mörkgrå ovaler, som ser ut som stenar.
  - Sedan syns en beige klump, kortets baksida.
  - Sedan reser sig snögubben.
- **Orsak:** Bollarna är kort som viks ner (`vik`), och snögubben reser sig (`reser`) på samma ställe. Under vikningen syns kortens baksidor.
- **Förslag:**
  - Ett krit-gnistmoln som täcker bytet, och bollarna tonas bort i stället för att vikas.
  - Eller låt snögubben resa sig först när bollarna redan är borta.
  - Storlek: liten.

---

## Rörelse och flyt

- **Långa stillastående partier:**

  | Tid | Längd | Vad som händer |
  |---|---|---|
  | 0:10,8–0:16,6 | ca 6 s | Kritan väntar |
  | 0:47,9–0:59,6 | 11,7 s | Frysnärbild där bara andedräkten rör sig |
  | 1:12–1:39 | ca 27 s | Mest samma närbild på kaninen som står |
  | 1:46–2:10 | | Bollarna, kaninen står still |

  Receptet vill ha reaktionsslag och växlande uttryck (minnet "Fler reaktioner, snabbare"). Förslag: blinkningar, öronvickningar, huvudlutning och små tittar mot Malin i dessa partier, och en närbild på bollarna under räkningen.
- **Gången är glidning.** Kaninen guppar lite men tar inga steg (06c, alla `GA`). I 062 går grodan på samma sätt, så det är ärvt. Men 064 har fler och längre flytt, så det märks mer.
- **Hoppen i 06b är mycket små.** Barnet ser knappt att kaninen hoppar i snön. Dubbla gärna höjden.
- **Detta fungerar bra:**
  - Kritans spets sitter i linjens ände i båda teckningarna.
  - Flingans fyllning och glitter fungerar.
  - Fåglarna studsar och glittrar på sina färgord (2:29,6 röd, 2:31,5 gul, 2:33,5 blå) och lyfter vingarna på rad 19.
  - Glittret på stor, mellan och liten hamnar på rätt boll.
  - Vinkningarna i 06, 20, 24 och 25 syns.
- **Svagt men inte fel:**
  - Fotspåren finns men syns knappt.
  - Frosten på öronen syns knappt.
- **Spökträd:** Skuggorna från träd och granar syns som grå "spökträd" på de snöiga kullarna. Ljuset kommer framifrån vänster. Mjuka eller korta skuggorna på snön.
- **Låg kontrast:** Snöbollarna är vitt på vitt. En svag blå skuggsida skulle göra dem tydliga.
- **Flingans kontur matchar inte bilden.** Den är en klumpig ytterlinje med bara en prick som detalj (`snoflinga-kontur-skarp.json` har 1 detaljstreck). Manus säger att sidogrenarna ritas som detaljer, och minnet "Kritan ritar detaljerat och mjukt" säger 2–6 detaljstreck. Den fyllda flingan har tunna armar, så teckningen och bilden ser olika ut. Kör `verktyg/kontur.py` igen med fler detaljstreck. Pannbandets kontur har 6 och fungerar.

## Förbättringar (rangordnade)

| # | Förbättring | Storlek |
|---|---|---|
| 1 | Rätta rad 462 (F1), så att bollarna rullar och studsar. Störst effekt för minst arbete | 1 rad |
| 2 | Gör "bara ett öra" på riktigt (F2), med hörbar `pop-3` | Medel |
| 3 | Rätta vyerna: kant och skrivbord (F7), öron och höger kant (F8), fåglarna i bild (F11). Gör alla i samma pass och kontrollera första och sista bildrutan i varje vy | Liten ×7 |
| 4 | Ta bort genomgång och synlig glidning (F3, F4), och rätta kamerahoppen (F5, F6) | Liten ×4 |
| 5 | Pannbandet: samma bild hela vägen, båge i bild, ingen skugga över ansiktet (F9) | Medel, kräver bildbeslut |
| 6 | Reaktionsslag i de långa stillastående partierna (se Rörelse och flyt) | Medel |
| 7 | Snön klar före klippet, med en vit paus (F13). Ny andedräkt (F14). Tussen: tid och färg (F15) | Liten ×3 |
| 8 | Kritans väntplats (F10) och bytet från bollar till snögubbe (F16) | Liten ×2 |
| 9 | Ny flingkontur med detaljstreck | Liten, kör kontur.py igen |
| 10 | Stängningskameran (F12): rätta på ett ställe för 062–065 | Liten |

## Ljud och röst

- **Malin** ligger på median −19,1 LUFS (momentan) under sina repliker. Utanför repliken ligger bädden på median −35, alltså ca 16 dB under henne. Det är bra.
- **Kaninens ljud är för starka.** Ca −10 LUFS momentant vid 0:32,6, 0:58,9, 1:54,9, 2:00,0 och 3:15,2, alltså ca 9 dB över Malin.
  - 95:e percentilen av den momentana nivån är −13,4 i 064 och −15,0 i 062.
  - Orsak: `VOL` för kaninljuden är 2,0 (`boken.js:557`), på filer som redan är starka.
  - Förslag: sänk till ca 1,2–1,4, eller normalisera filerna, så att de ligger 2–4 dB under Malin.
  - 062 har 2,8 för grodfamiljen, men de filerna är svagare, så siffrorna kan inte jämföras rakt av.
- **Mastering:** Hela filmen ligger på I −17,0 LUFS, topp −4,0 dBFS. `satt-ihop.sh` normaliserar till −14 LUFS / −1,5 dBTP, så det rättas i bygget.
- **Ploppen:** `pop-3` hörs knappt (−44,9 dBFS topp) och `pop-4` är svagt (se F2).
- **Fåglarnas pip** ligger precis på färgorden. `fagel-pip-5` (medel −16,9) överlappar "blå" och kan dölja ordet. Flytta pipet 0,2–0,3 s före ordet, eller sänk det.
- **Klappet:** `klapp-1` är en enda klapp på 0,12 s under en klapprörelse på 1,2 s. Lägg 3–4 klapp i takt med händerna.
- **"Rulla, rulla … snöboll"** är samma fil tre gånger, som planerat. Det fungerar, men när bollarna faktiskt rullar (F1) bör tiderna stämmas av igen.
- **Pauser utan Malin** som är längre än 4 s finns bara vid de fyra gisspauserna (4,4–4,8 s). Det är avsiktligt.
- **Röstfiler:** Inga saknas.
- **Bädden:** Mattan `vinterljud-2` på 0,25 ligger lagom.

## Regelkontroll (vad skripten flaggade)

**`bash verktyg/qa-film.sh boken.mp4`** (kontaktarket lades i scratchpad, inte i repot):
- Längd 199,63 s. Det stämmer med `DURATION`.
- Svart: tomt.
- Fryst bild: tomt.
- Tystnad: tomt.
- Ljud I −17,0 LUFS, topp −4,0 dBFS.

**`qa-scen.py`:**
- `boil kod`: tomt.
- `krita kod`: tomt. Kritan går genom `kritan-ritar.js`.
- `röst rader`: tomt.
- `röst filer`: tomt.
- `röst tvärt vid klipp`: tomt (20 klipp kontrollerade).

**Line boil i filmen** mäts bara i 30 bilder/s, så den mättes inte. Filmen är en förhandsvisning i 15 bilder/s. Kör igen på slutrenderingen.

**Mot regler som skripten inte fångar:**
- *Inget går genom något*: F3, F9 (skuggan) och F12 bryter mot den. F16 är på gränsen.
- *Malin efter handlingen*: F15 bryter mot den.
- *Bilden på orden*: F1 och F11 bryter mot den.
- *Teckningen som bilden*: F9 och flingans kontur bryter mot den.
- *Bildutsnitt*: F7 och F8 bryter mot den.
- *Inga djurnamn*: OK. Det heter kaninen och fåglarna överallt i `rader.mjs`.
- *Max 3 figurer, 2 platser*: OK. Kaninen och fåglarna, boken och snölandet.

## Skillnader mot 062

| Område | 064 | 062 | Avsiktligt? |
|---|---|---|---|
| Ljudnivå för figurens ljud | `VOL` 2,0, högre topp | 2,8 men lägre topp (95:e percentil −15,0) | Troligen inte, se ovan |
| `GLES` (reaktionsslag) | 1,0 s | 0,9 s | Ja, troligen |
| Vy `himmel` | 1,75 bort, fov 34 | ca 1,25 runt solen | Inte avsiktligt, ger kant och skrivbord i bild |
| Stängning | Kameran under pärmen | Samma | Ärvt |
| Gång | Glidning | Glidning | Ärvt, men fler flytt i 064 |
| `render.mjs` | Identisk med 062:s utom sökvägen | | OK |
| `satt-ihop.sh` | Samma bygge: logotyp från 020, scen, prenumerera | Samma | OK |

## Inte kontrollerat

- **Slutrenderingen** i 30 bilder/s och 1920×1080. Line boil, kantskärpa och tunna linjer kan inte bedömas i 960×540.
- **Den färdiga filmen** med logotyp, prenumerera-kort och loudnorm, eftersom `film/avsnitt-064.mp4` inte finns. Ljudnivåerna ovan är scenens nivåer före mastering.
- **Koden mot filmen:** Om ändringen i `boken.js` 34 s efter renderingen ändrade något synligt. Ingen diff finns.
- **Vita kanter** mättes inte per urklipp (`vita-kanter`-skillen).
- **YouTube-text, miniatyr och titel** ingick inte i uppdraget.
- **Malins uttal och tonfall** lyssnades inte igenom rad för rad. Bara nivåer och tider kontrollerades.
