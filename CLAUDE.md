# Lilla Kritan – instruktioner för AI-assistenter

Repot innehåller allt material för YouTube-kanalen *Lilla Kritan*: tecknade cut out-filmer med sånger och berättelser för små barn (ca 1–4 år).

**Lilla Kritan är världen, inte en figur.** Det finns ingen programledare. I ramen ritar en krita utan ansikte och en berättarröst (BERÄTTAREN i manus) pratar till tittaren.

## Konventioner
- **Format först:** varje avsnitt följer `format/` – fast intro (logotyp, avsnittsnummer, titel) och outro, max 3 figurer och 2 platser, övergångarna zoom in, kritsvep och zoom ut (plus molnövergången och kritirisen, se `format/regler.md`). Föreslå aldrig manus som bryter mot `format/regler.md` utan att säga det.
- **Stil:** nya och omgjorda figurer, platser och saker följer **Lilla Kritan art direction v2** (`stil/art-direction-v2.md`). `stil/stilguide.md` är v1 och gäller det som inte gjorts om än.
- **Rekvisita** skapas tillsammans med användaren. Lägg inte till saker i `rekvisita/` på eget initiativ.
- **Assets** (bilder, ljud) levererar användaren. Skapa inte bilder utan att bli ombedd.
- **Språk:** allt innehåll (manus, sånger, dokumentation) skrivs på svenska. Bildprompter (```` ```prompt ````- och ```` ```delar ````-block) skrivs på engelska.
- **Upphovsrätt:** nämn aldrig befintliga serier, figurer eller varumärken i prompter, manus eller sånger. Beskriv stilens egenskaper istället (se `stil/stilguide.md`). Sångerna ska vara egna, inte nya texter till kända melodier.
- **Figurer är låsta:** ändra inte utseende eller prompt för en figur vars status är `✅ Referensark klart`, om användaren inte uttryckligen ber om det.
- **Nya figurer, platser och saker** följer formatet i `karaktarer/_mall.md`, `bakgrunder/*.md` och `rekvisita/*.md` så att `verktyg/prompt.py` kan läsa dem. Lägg också till dem i respektive README.
- **Nya avsnitt** skapas som `avsnitt/NNN-kort-namn/` utifrån `avsnitt/_mall/`. Uppdatera `harriets-favoriter.md` med avsnittsnumret.
- **Inga djurnamn i det som sägs eller sjungs.** Djur kallas alltid vad de är: kaninen, lammet, kon, leoparden, lejonet (på engelska "the bunny", "the lamb"). Det gäller repliker, berättarröst, röstbanken (t.ex. *"Hej kaninen!"*, *"Var är lammet?"*, filnamn `kanin-hej`), sångtexter, Suno-prompter och YouTube-texter. Namnen i `karaktarer/` (Kanel, Ludde …) är bara interna filnamn.
- **Innehåll för små barn:** korta meningar, upprepning, pauser för interaktion, inget läskigt. Problem löses med hjälp av kompisar.
- Filnamn: små bokstäver, bindestreck, inga å/ä/ö.

- **Produktion:** `produktion/` är arbetsflödet från piloten Lilla Kvack. Skripten använder relativa sökvägar, så flytta inte mapparna inuti. Skills för arbetet finns i `.claude/skills/` (`ai-video`, `crayon-cutout`). Nya figurer i art direction v2 görs och riggas med skillen `lk-figur`. När kritan ritar något (ritintrot, saker i en scen, shorts) följs skillen `kritan-ritar` och den delade koden `verktyg/kritan-ritar.js`, så att det alltid ser likadant ut. Avsnitt utan sång (en figur, Malin berättar, som 020 Grisen badar) görs med skillen `bilderbok` och receptet `format/bilderbok.md`.

- **Bildutsnitt:** nya scener följer `format/bildutsnitt.md` (helbild 40 %, halvnära 60 %, närbild, detalj; kroppshöjd 430 px i plattan, alla djur lika stora). Kameran räknas med `verktyg/utsnitt.js`. I 3D-scenerna (`produktion/three-rum/`) skrivs kameran som vyer med `verktyg/kamera3d.mjs` (platser, glid/push/settle/hold, klipp, dissolve, kritsvep, moln, zoom in/ut); provet med alla övergångar ligger i `produktion/three-rum/kamera-prov/`.
- **Line boil** (`#boil`, kanterna som darrar) ska vara svag: 2,5 px i bild i alla bilder, alltså `feDisplacementMap` 2,5 delat med kamerazoomen och satt varje bildruta, och ny brusbild 6 gånger/s. En fast skala i en zoomad kamera blir för stark i närbilder (Sanna 2026-11-21).
- **Delad rendering:** `node verktyg/render-delat.mjs <scenmapp> [--bitar 4] [--samtidigt 2] [--snabb …]` renderar en scen i bitar med avsnittets egen `render.mjs`, i en egen tillfällig mapp per körning (krockar aldrig), kontrollerar antalet bildrutor och flyttar den gamla filmen till `aldre/`. Använd den i stället för att skriva nya `rendera.sh` med fasta bitnamn.
- **Lagring i iCloud:** material utanför repot ligger i iCloud Drive/Lilla Kritan (`~/Library/Mobile Documents/com~apple~CloudDocs/Lilla Kritan/`). Färdiga, publicerade mixar ligger i `Mixar/` och `produktion/youtube/mix/mix-N/mix-N.mp4` är länkar dit (iCloud hämtar filen när den öppnas). `produktion/videos` är en länk till `Kvack-produktion/videos`. Flytta inte länkarna. Nya färdiga mixar flyttas till `Mixar/` med en länk tillbaka. Äldre färdiga filmer (`avsnitt/*/film/*.mp4` och `produktion/youtube/shorts/**/*.mp4`, orörda i 3 dagar) ligger i `Repo-filmer/` med samma sökväg som i repot, och repot har länkar dit. Vill du ändra en sådan film, skriv över länken (`rm` länken först) så hamnar den nya filmen lokalt. Flytta klara filmer dit när disken blir full.
- **Gamla versioner:** `aldre/`, `gamla*/` och `*-fore-*.mp4`/`*-forra.mp4` är kasserade versioner, inte original. De städades bort 2026-11-13 (31 GB). Spara bara den senaste gamla versionen tills den nya är godkänd, och föreslå städning när disken är full.
- **Molnrendering:** `bash verktyg/molnrender.sh <scenmapp> [--bitar 8] [--en …]` renderar samma sak på GitHub Actions, en maskin per bit, och lägger in filmen på samma sätt. Committa och pusha scenen först, annars stoppar skriptet. Använd molnet för slutrenderingar när datorn är upptagen och för många scener på en gång. Förhandsvisningar (`--snabb`) görs lokalt. Kör den i bakgrunden och vänta på aviseringen. Se `produktion/molnrendering-plan.md`.
- **Modellval:** mekaniska steg (rendering, klippning, ljudmixning, sortering och filflytt, YouTube-filer) lämnas till en Sonnet-subagent (`general-purpose`, `model: "sonnet"`) med en tydlig brief. Sonnet hade 100 % användbarhet på 82 anrop (nov 2026). Manus, design, bildval och granskning stannar på Opus.

## Kontroll
`python3 verktyg/prompt.py --lista` ska lista alla figurer, platser och saker utan fel.

`bash verktyg/qa-film.sh <film.mp4>` i QA-passet. Den kör också `verktyg/qa-scen.py`, som flaggar för stark line boil (i scenkoden: `#boil` fast, över 2,5 eller inte delad med zoom; i filmen: bara hoppet när brusbilden byts 6 gånger/s, så snö och andning räknas inte, mot gränser kalibrerade på 051, 035 och 045) och avklippt röst (Malins repliker i `rader.json` som går in i nästa replik, och tal som tar slut tvärt vid ett bildklipp). Raderna ska vara tomma efter kolon. `python3 verktyg/qa-scen.py --alla` går igenom koden i alla scener, `--pussel` Malins tider i `pussel-prov.py`.
