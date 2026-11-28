# 063 Hösten i boken – djup QA

Granskad 2026-11-27 (Opus, bara granskning: ingen kod, inget ljud, ingen rendering ändrad).

**Film:** `scener/boken/boken.mp4` (renderad 27/11 20:16, 3:47,0, `--snabb` 960×540 15 fps, scenen utan intro, prenumerera och outro – `film/` finns inte än).
**Koden är nyare än filmen.** Filmen motsvarar `boken.js` i commit `96687ff5`. Commit `76160deb` (22:11) har redan Sannas feedback från 27/11: grön ek som byter färg mjukt (i stället för kal ek som "poppar"), repliken "Men var är löven?" utbytt, mindre darr, alla tre löven faller av huvudet, kritsiffror 1 2 3 över ekollonen, mindre glimtar, svampen helt uppe på "Titta, vid stubben", snabbare räkning och glimt när kronan är klar. De fynden räknas inte nedan. **Inget annat fynd i rapporten är rättat i 76160deb** (vyerna, platserna, halsduken, puffen, hoppet, lövhögen, ljudet är oförändrade).
Radnummer nedan gäller `scener/boken/boken.js@96687ff5` om inget annat står (i dagens fil ligger raderna efter ca 130 ungefär 20 rader längre ner). Tider är scenens tider i `boken.mp4`.

**Sett** = sett i bildrutor (kontaktark 6 bilder/s över hela filmen, plus täta 15 bilder/s runt ca 15 rörelser). **Härlett** = läst ur koden eller mätt i ljudet, inte sett.

## Omdöme

1. Berättelsen, rösten och tajmingen på orden håller (räkningen och svampen sitter på ordet), men bildutsnitten är det stora felet: bokens kant och skrivbordet syns i fem vyer, och rävens huvud skärs av eller räven står halvt utanför bild i tre.
2. Ljudmattan försvinner: `render.mjs` loopar inte, så skogsljudet tar slut efter 60 s och från ca 2:45 är pauserna helt tysta (−91 dB). Samma fel finns i 062 och i alla Kritans bok-filmer som använder samma `render.mjs`.
3. Halsduken, hoppet ut ur högen och lövhögens framkant har synliga skarvar. Det barnet ska hitta (fallande löv, löven på marken) är för smått för att läsas.

## Fel (måste rättas)

### F1. Bokens kant och skrivbordet syns inne i boken
- **Sett:**
  - `ek` 0:06,0–0:09,7, 0:21,8–0:34,0 och 3:28–3:31: ca 15 % till vänster är beige vägg och skrivbord, och sidans vita kant syns nere till vänster.
  - `stubbe` 2:54,5–3:15,8 och `rav-svamp` 3:34,8–3:38,2: sidans vita kant och bordet syns uppe till höger.
  - `uppslag` 2:02–2:15: vita kilar i båda kanterna.
  - `stam` 2:41–2:54: sidans vita kant i vänsterkanten.
  - `bred` 0:44–0:48: kanterna syns.
- **Varför:** bryter `format/kritans-bok.md:140` ("Boken fyller bilden", Sannas runda 5 i 062). Illusionen av en värld i boken spricker, och det är den första regeln Sanna gav om boken.
- **Orsak (härlett):** vykoordinaterna i `VY`. Kameran står för långt ut eller tittar för långt åt sidan för bokens storlek: `ek` :486, `bred` :490, `uppslag` :493 (kommentaren säger "bokens kant syns inte", men den syns), `stam` :496, `stubbe` :497, `rav-svamp` :498.
- **Förslag:** för varje vy, flytta kameran närmare eller minska fov (32 → 28) tills sidan fyller bilden i både början och slutet av glidningen och push-rörelsen (`skjut`). Gör boken större i `skapaBok` om vyerna inte räcker. Kontrollera med en stillbild per vy (grind 6a i receptet) före renderingen. **Storlek:** liten ändring i koden (6 vyer), men alla rader med dessa vyer måste renderas om.

### F2. Rävens huvud skärs av upptill
- **Sett:**
  - `halsduk` 0:58,0–1:06,7 (8,7 s, rad 10–11, kritan ritar halsduken): räven syns från ögonen och nedåt. Pannan och öronen är utanför bild, och barnet ser inte att räven tittar på halsduken.
  - `stubbe` med räven vid svampen 3:04–3:08,4 och `rav-svamp` 3:34,8–3:38,2: huvudet är avskuret i överkanten.
- **Varför:** bryter `format/bildutsnitt.md` (huvudet skärs aldrig i helbild eller halvnära). Rävens min är det enda sättet räven "svarar" på, och här syns den inte.
- **Orsak (härlett):** `VY.halsduk` :491 tittar mot y 0,12 (marken) från y 0,42, så räven på `PLATS.mitt` :219 (kortet 0,34 högt, `ENHET` :186) hamnar för högt. `VY.stubbe` :497 är byggd för stubben (0,17) och svampen (0,13), inte för räven som går dit i rad 22c.
- **Förslag:** `halsduk`: höj målpunkten till ca y 0,22 och backa kameran (z 0,95 → ca 1,15) så att halsduken på marken och hela räven ryms. Ett annat sätt är att klippa till `halv` på räven när kritan är klar. För rad 22c och 25, byt till en egen vy som rymmer räven och svampen (`rav-svamp` med högre mål och bredare fov). **Storlek:** liten (2–3 vyer).

### F3. Räven står halvt utanför bild i högerkanten
- **Sett:** `stam` 2:41,2–2:54,4 (13 s, rad 21c–21d): halva räven och halva ansiktet är utanför bild, så vinkningen 2:49,8 syns knappt. Ekorrens svans syns knappt i början.
- **Varför:** `bildutsnitt.md`: ingen figur halvt ute vid kanten (minst 5 % luft). Det här är också ekorrens första stund i bild, och då ska både ekorren och räven synas.
- **Orsak (härlett):** `VY.stam` :496 (x −0,5) mot `PLATS.ekollon` [−0,11, 0,15] :219. Kommentaren på :219 flyttade räven för att det tredje ekollonet skulle synas, men vyn följde inte med.
- **Förslag:** flytta vyns x till ca −0,38 och backa lite, eller flytta räven till x ca −0,2. Kontrollera att ekorren (`EKORREN` :150) och räven båda har luft. **Storlek:** liten.

### F4. Halsduken: spökarmar och ett hopp när kortet byts mot riggens halsduk
- **Sett:**
  - 1:17,53–1:18,27: halvgenomskinliga armar syns på magen medan halsduken glider in.
  - Halsdukskortet flyger över ansiktet och landar mindre och lägre än riggens halsduk, och vid 1:18,47 byts det tvärt mot den bredare halsduken i riggen.
- **Varför:** en dubbel arm och ett hopp i storlek på det viktigaste ögonblicket i berättelsen (hjälpsaken kommer på plats).
- **Orsak (härlett):**
  - Spökarmarna: på :278 tonas posen `magen` (0,8 → 0) under `HD_PA` + 0,5 s. Under övertoningen ritas båda armlägena halvt.
  - Hoppet: på :463–464 glider kortet till `fig2varld([512, 640])` med skala 0,6, men riggens halsduk (`halsdukPa(…yc:588…)`, ca :190) sitter högre och är bredare. Bytet sker på `HD_PA` :247/:461 utan övertoning.
- **Förslag:**
  - Byt posen hårt (inte tona) i ett ögonblick då armarna ändå är skymda, eller låt armarna ligga kvar på magen tills halsduken sitter.
  - Mät riggens halsduk (mitt och bredd i 1024-riggen) och låt kortet landa exakt där i exakt den storleken. Tona sedan över under 2 bildrutor.
  - Låt kortet glida in under hakan i stället för över ansiktet (lägre båge, `0.12 * sin` → ca 0,04).
  - **Storlek:** liten–medel.

### F5. Lövhögen har en rak, vågrät kant tvärs över rävens ansikte
- **Sett:** 1:44,57–1:51,8 och 1:52,3–1:52,6: när räven sitter i högen skär en rak linje (högens främre halva) tvärs över ansiktet.
- **Varför:** högen ser ut som två papper med en rak klippkant, inte som löv. Räven ser avklippt ut.
- **Orsak (härlett):** `HOGFRAM = kort(nedre(LOVHOG, 0.5), …)` :148 med `nedre()` :77 klipper bilden rakt vid 50 %.
- **Förslag:** klipp med en ojämn kant som följer löven (en lövformad mask, eller några fristående lövkort framför kanten), eller sänk räven så att kanten hamnar under hakan. **Storlek:** medel.

### F6. Hoppet ut ur högen sker över ett klipp
- **Sett:** närbilden i rad 17 börjar 1:52,43 medan räven är mitt i hoppet. Räven flyger in delvis avskuren i överkanten till 1:53,2.
- **Varför:** handlingen hackas sönder. Barnet ser inte hoppet, bara en räv som dyker upp.
- **Orsak (härlett):** `HOPP[2]` :224 börjar på `S('17') + 0.15`, samma ögonblick som rad 17:s vy klipper in.
- **Förslag:** låt hoppet ske i högens vy (flytta det till slutet av rad 16b), eller klipp till närbilden först när räven landat (`S('17') + 0.9`). **Storlek:** liten.

### F7. Andningspuffen är en vit klump över högra ögat
- **Sett:** 0:49,0–0:52,3: en vit, rund klump växer och tonas bort över ögat, inte vid nosen.
- **Varför:** den läses som ett fel i bilden, inte som andedräkt i kylan.
- **Orsak (härlett):** `PUFF` :169 är en vit sfär (0,014) och placeras på `fig2varld([510, 470])` :412, som är vid ögat i riggen.
- **Förslag:** mät nosspetsen i riggen och placera puffen framför den, en bit ut åt sidan rävens nos pekar. Gör den till ett litet krit-moln (tre små cirklar, halvgenomskinligt) som i stilen. **Storlek:** liten.

### F8. Kronan växer bakom de kala grenarna och poppar
- **Sett:** 0:23,4–0:23,73 krymper och försvinner kritans löv, och 0:23,80 byts den kala eken på en bildruta mot den höstiga med en annan stam.
- **Orsak (härlett):** `EKKAL.m.visible = t < KRONA[1]` :443, `LOVET` :444.
- **Status:** **rättat i 76160deb** (grön ek, mjuk övergång, lövet ritas in i kronan). Ta med i nästa förhandsvisning och kontrollera att den gröna och den höstiga bilden ligger exakt på varandra.

## Rörelse och flyt

Bra (sett):
- Öppningen och stängningen av boken är lugna och i takt.
- Kritans ritande är mjukt och i samma stil som 062.
- Räknar-glimtarna sitter på orden: 2:25,3 "Ett", 2:26,2 "två", 2:27,3 "tre" (orden ligger 2:25,24/2:26,13/2:27,26).
- Svampen kommer upp på "svamp" (3:02,85 mot ordet 3:02,80).

Att rätta:

1. **De fallande löven läses inte.**
   - **Sett:** 0:28–0:33 ("faller ner … sakta, sakta") är löven ca 10 px stora prickar, orange mot den orange kronan. Nästan osynliga. Också i 07b (0:39–0:43) är lövet räven tittar på pyttelitet och faller bakom räven, så blicken läses inte.
   - **Orsak (härlett):** `FALLER = smalov(9, 0.045)` :161.
   - **Förslag:** färre och större löv (ca 0,08–0,1), som faller framför himlen eller framför räven och inte mot kronan, gärna i kontrastfärg (brunt och rött mot det gula). I 07b ska ett enda stort löv falla nära rävens nos. **Storlek:** liten.
2. **Långa stillastående bilder.**
   - **Sett:** 0:18,3–0:21,2 (lövet), 0:23,8–0:34,0 (eken med nästan osynliga löv, ca 10 s), 1:36,9–1:43,7 (framför högen), 2:15,3–2:21,1 (pausen vid ekens fot), 2:21,2–2:25,2 (ekollonen före räkningen) och 2:41–2:47,5 (stammen och halva räven).
   - Gisspauserna är avsiktliga. Men utan mattan (se Ljud) och med lite rörelse känns de döda.
   - **Förslag:** en liten händelse i varje lång paus, i den lugna takten (receptets "lugnt"): ett löv som singlar, räven som vänder huvudet eller blinkar, ekollonet som gungar. Eller korta pausen med 0,5–1 s där ingen gissning väntas. **Storlek:** liten per paus.
3. **Hårt klipp från eken till grenen, 0:09,74.** Det är samma träd, och receptet säger att kameran glider mellan närliggande vyer. `GLID` :518 har bara rad 02 och 05. **Förslag:** lägg till `'03': [0, 1.2]`. **Storlek:** liten.
4. **Räven fälls upp på 2 bildrutor, 0:34,3.** `reser((t - RAV_UPP) / 0.45)` :466. Med efterstudsen ser det ut som ett hopp. **Förslag:** 0,6–0,7 s, som korten i öppningen. **Storlek:** liten.
5. **Vindkrumeluren i närbild, 1:26,6–1:28**, läses som en blek fläck över överkanten. `VIND` :163 ligger på `SIDA + 0,42` och skalas inte efter vyn. **Förslag:** i närbild en mindre krumelur som går över bilden framför räven, eller lövyran ensam. **Storlek:** liten.
6. **Ekorren skuttar åt fel håll.** **Sett:** ca 2:48,6 är första skuttet åt vänster medan ekorren tittar åt höger. **Förslag:** spegla ekorren eller vänd skuttet. **Storlek:** liten.
7. **Stängningen går för fort, 3:44–3:47.** **Sett:** högen fälls ner före räven, och sista bilden är en beskuren pärm (samma som 062). **Härlett:** `RAVKORT.z = PLATS.svamp[1]` :341 sorteras in efter högen i `NER` :342–343. **Förslag:** fäll räven och ekorren sist (de är huvudpersonerna, hej då-känslan), och låt sista bilden visa hela pärmen. **Storlek:** liten.

## Förbättringar (rangordnade)

1. **Löven på marken (rad 19–19b, 2:01–2:15) syns inte som något att hitta.** **Sett:** tre platta löv på 0,07 i en vid bild, och glimten är liten. I 062 är blommorna stora stående kort. **Härlett:** `MARKLOV` :152 (`platt(m, 0.07, …)`). **Förslag:** stående lövkort ca 0,12, eller en närbild per löv när Malin säger färgen (30/31/32). Det är barnets "hittar"-stund. **Storlek:** medel.
2. **Kritans teckning är för liten, ca 17 % av bildhöjden** (lövet 0:10–0:18 och halsduken 0:58–1:06). I 062 är solen ca 50 %, och regeln för detaljbilder är 40–60 %. **Förslag:** en närmare `gren`-vy (:487, z 0,78 → ca 0,45) och en närmare `halsduk`-vy (fast se F2). **Storlek:** liten.
3. **"En stor lövhög" är mindre än räven.** `HOGBAK` 0,26 :148 mot räven 0,34. **Förslag:** högen ca 0,36–0,4, så att räven kan försvinna i den. Kombinera med F5. **Storlek:** medel.
4. **Räven "luktar" på ekollon som inte syns i bild (rad 21b, 2:36–2:41).** **Förslag:** ett ekollon i bild nära nosen, eller en vy som har med båda. **Storlek:** liten.
5. **Svampen är liten och delvis skymd av rävens svans i 22c (3:08–3:15).** `SVAMPEN` 0,13 :147. **Förslag:** större (0,16–0,18) eller räven en bit åt sidan. **Storlek:** liten.
6. **Hoppen på "hopp" är olika.** I rad 16 landar räven på "Hopp!" (`HOPP[0]` :222). I 16b börjar hoppet först när ordet tar slut (1:49,3 mot ordet 1:48,6–1:49,4). **Förslag:** lägg `HOPP[1]` så att landningen sitter på ordet, som i rad 16. **Storlek:** liten.
7. **Längden.** Scenen är 3:47, och med logga, prenumerera och outro blir det över 4 min. Receptet säger nu 3:15–4:00 (062: 3:33), och Sanna godkände 3:48 i grind 5. Kortare pauser enligt Rörelse 2 ger 10–20 s utan att stryka något. **Storlek:** liten.

## Ljud och röst

**Mätt (`qa-film.sh`):**
- Integrerad ljudstyrka −17,9 LUFS, topp −1,9 dBFS. Scenen är inte mastrad, det görs i `film/satt-ihop.sh` (−14). 062:s scen ligger på −18,9, så nivån är som väntat.
- Ingen svart bild och inga frysta bilder över 3 s.
- Tystnad över 3 s: 2:57,87 i 4,55 s.

**L1. Ljudmattan tar slut, och pauserna blir helt tysta (fel).**
- **Mätt i pauserna:** 0:14 −43 dB, 1:03 −40, 2:04 −47, 2:17 −50, 2:30 −53. Från ca 2:45 är det −91 dB, alltså digital tystnad (2:58–3:02, 3:19–3:21, 3:33–3:35).
- **Härlett:**
  - `scener/render.mjs` (rad 40–56) blandar varje ljud med `adelay` och `volume`, men läser aldrig `loop`, `langd`, `fade` eller `fadeIn`.
  - `skogsljud-1.m4a` (60 s, `loop: true, langd: DURATION` på :542) spelas därför bara 0:00–1:00.
  - Det enda som fyller pauserna efter det är vinden. `vind-host-1` är 68 s lång och startar två gånger (`scener/boken/rader.json`: rad 08 0:44,1 och rad 13b 1:26,7). Den ligger alltså 0:44–2:35, dubbel och starkare 1:27–1:52, och slutar tvärt utan fade.
  - Rävens kalla vind blåser därför fortfarande genom halsduken, lövhögen och räkningen, och sedan blir det helt tyst.
- **Samma fel i 062:** 062:s film har tysta partier från 1:10,6 och framåt (`silencedetect` −60 dB). `render.mjs` i 063 är en kopia av 062:s. Troligen gäller det också 064 och 065. Receptet (`kritans-bok.md:136`) säger "kritans ritljud som slinga, mattan lågt under allt".
- **Förslag:** i `render.mjs`, för ljud med `loop`, lägg `-stream_loop -1` före `-i`, och `atrim=duration=<langd>` plus `afade=t=in` och `afade=t=out:st=<langd-fade>:d=<fade>` i kedjan. Korta vinden till själva vindstöten i rad 08 och 13b (t.ex. 6–8 s med fade). Det är delad kod för alla bokavsnitt, så det bör rättas en gång för alla. Ljudet kan mixas om utan att bilden renderas om, om `render.mjs` delar upp stegen. **Storlek:** liten kodändring, stor effekt.

**L2. Kritans ritljud går ca 2 s efter att lövet är klart (rad 03).**
- **Härlett:** `rit` = 0:10,34–0:12,28 (1,9 s, :377–379), men `krita-ritar-1` är 4 s och spelas hela, eftersom `langd` och `fade` ignoreras.
- **Mätt:** diskanten (över 2,5 kHz) faller först 0:13,0–0:14,2, under Malins "Vad blir det nu?".
- Rad 10 (halsduken, 4,1 s) täcks ungefär av 4 s-filen.
- Rättas av samma ändring som L1.

**Röst (stickprov med ordtider ur whisper):**
- "Ett/två/tre" i 34 sitter på ekollonens glimtar (se Rörelse).
- "svamp" i 40 sitter på svampens pop.
- Halsduken sitter på (1:18,45) före "Så där" (1:19,55).
- Kronan växer på "löv" i 07 (0:22,48).
- Rävens läten ligger 0,2 s efter replikerna enligt koden (`SVAR` :27). Stickprov i rad 07 stämmer.
- Malins röst hörs tydligt över mattan och effekterna i det som lyssnats på.
- Repliken "Den är giftig. Den ska man inte äta." (41) är en rimlig säkerhetsmening. Den är inte läskig, och Malin följer upp med "Men man kan titta på den".

## Regelkontroll

**Skripten:**

| Kontroll | Resultat |
|---|---|
| `qa-film.sh` svart | tomt |
| `qa-film.sh` fryst över 3 s | tomt |
| `qa-film.sh` tyst över 3 s | **2:57,87 i 4,55 s** (gisspausen före svampen, helt tyst, se L1) |
| boil kod / krita kod | tomt |
| röst rader / röst filer / röst tvärt vid klipp (20 klipp) | tomt |
| boil film | inte mätt, filmen är 15 bilder/s (`--snabb`) |
| `qa-scen.py` på 063 | tomt. Röstkontrollen läste `rader.json` i arbetskopian (76160deb), inte filmens version. Den ändrade raden gäller replik 03 |

**För hand:**
- **Inga djurnamn:** ok ("räven", "ekorren" i alla 49 repliker).
- **Max 3 figurer, 2 platser:** ok (räven och ekorren, boken).
- **Boken fyller bilden:** **nej** (F1).
- **Huvudet skärs aldrig, 5 % luft:** **nej** (F2, F3).
- **Inget går genom något:** halsdukskortet passerar framför ansiktet (F4). Lövhögens raka kant läses som att räven är avklippt (F5). Inget går genom sidan eller väggen i det som setts.
- **Det barnet hittar syns hela tiden:** löven på marken syns men är för små (Förbättring 1).
- **Malin efter handlingen:** i stort ok. Svampen kom på ordet i stället för före (rättat i 76160deb).
- **Mattan under allt:** **nej** (L1).
- **Prenumerera-kort:** kan inte kontrolleras, `film/satt-ihop.sh` finns inte än.

## Jämfört med 062

- **Bokens kanter:** 062 visar också kanter på några ställen (bordet uppe till vänster i sandvyn och en vit kil i slutet), men mycket mindre än 063.
- **Figuren:** i 062 står grodan alltid hel i bild och ofta stor. 063:s räv är mindre i bild och oftare avskuren.
- **Kritans teckning:** 062:s sol är ca 50 % av bilden, 063:s löv ca 17 %.
- **Det barnet hittar:** 062:s blommor är stående kort, 063:s löv är platta och små.
- **Ljudet:** båda har samma fel med mattan (L1).
- **Sista bilden:** båda slutar på en beskuren pärm.

## Inte kontrollerat

- Koden i 76160deb är inte renderad. De rättade sakerna (kronan, siffrorna, svampen, darret, löven från huvudet) är inte sedda i bild.
- Hela filmen med bilderbok-introt, prenumerera-kortet och outrot, eftersom den inte finns än. Inte heller slutrenderingen i 1080p/30 bilder/s.
- Boil i filmen (kräver slutrendering) och "inget går genom något" med 6 bilder/s runt varje kontakt. Jag tittade på 6 bilder/s hela vägen och 15 bilder/s runt ca 15 rörelser, inte runt varje kontakt.
- Alla rävens läten mot Malins repliker, bara stickprov.
- Hur det ser ut på en liten mobilskärm, YouTube-text och miniatyr.
- 064 och 065, som troligen har samma ljudfel (L1).
