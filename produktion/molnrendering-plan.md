# Molnrendering som komplement – plan

**Mål:** slutrenderingar och stora omgångar kan köras på GitHub Actions när datorn är full, utan att ändra hur scenerna görs. Datorn är fortfarande förstahandsvalet för allt snabbt.

## När vilken

| Jobb | Var | Varför |
|---|---|---|
| Förhandsvisning (`--snabb`), stillbilder, korta tester | Lokalt | Snabbast att iterera, ingen push behövs |
| Slutrendering av en scen | Lokalt om datorn är ledig, annars moln | Molnet kör 8–16 bitar samtidigt på egna maskiner |
| Många scener på en gång (julkalendern, engelska versioner, omrendering efter riggändring) | Moln | Det är här datorn kör fast (last 250+ på 10 kärnor) |
| Sammanslagning (`satt-ihop.sh`), ljud, QA | Lokalt | Snabbt, och ljudet (Suno, röster) ligger lokalt |

Molnet renderar **bara bilden** (som `rendera.sh`, `-an`). Ljudet läggs som förut i `satt-ihop.sh`.

## Läget (2026-11-12)

- Repot `granqvistsanna-web/Lilla-kritan` är **redan publikt**, 3,15 GB historik, 795 MB filer.
- Scenerna hämtar allt från repot. Inget i `avsnitt/*/scener`, `verktyg/` eller riggarna pekar till iCloud. 030 använder ca 14 MB filer.
- `render.mjs` hämtar Playwright 1.49.1 från `~/.claude/skills/launch-video/...`, som inte finns i molnet.
- `verktyg/render-delat.mjs` finns redan: bitar, kontroll av bildrutor och `aldre/`. Alla `render.mjs` har `--langd` och `--ut`.
- Två körningar av samma scen blir nästan men inte helt lika (SSIM 0,994). Det är troligen boil eller blink. Bitar från olika körningar ska därför inte blandas.

## Beslut

1. **Repot förblir publikt** (Sanna, 2026-11-12). Actions är gratis utan minutgräns. Allt i repot syns för alla.
2. **Pilotscen:** `avsnitt/004-bussen-badar/scener/korscen-1` (63 s). Den finns redan renderad lokalt med det nya skriptet för jämförelse.

## Fas 1 – flyttbar rendering ✅ klar 2026-11-12

- Alla 20 `render.mjs` läser Playwright från `process.env.PLAYWRIGHT_MJS` först, annars från dagens sökväg.
- 003–005 loggar nu också `saknas:` för filer som inte finns (de nyare avsnitten gjorde det redan).
- **Ren kopia (git worktree av HEAD, utan något lokalt):** pilotscenen 004 korscen-1, 030 badet, 028 stranden och 013 renderar med exakt samma saknade filer som lokalt. Det betyder inga för 030, 028 och 013. 004 korscen-1 saknar `assets/bakgrunder/vagen-saker/bjork.png`, `lovtrad.png` och `stuga.png`, både lokalt och i kopian. Scenen ritar redan utan dem.
- **Lärdom: en fillista per scen håller inte.** Scener hämtar filer från andra avsnitt (004 läser `003…/vag.js`), och riggarna laddas en i taget, så kartläggningen tog sex rundor för en enda scen. Molnet hämtar därför **hela repot utan historik**.
- **Storlek:** hela repot utan historik är 3,1 GB, varav 2,3 GB png. Ljudet (m4a, wav, mp3, ca 350 MB) måste med, eftersom `render.mjs` lägger sången under varje bit.
- Senare optimering, bara om checkout visar sig ta lång tid: en partiell klon (`--filter=blob:none`) där servern i `render.mjs` hämtar en saknad fil med `git show HEAD:<fil>` när den efterfrågas.

## Fas 2 – workflow och pilot

`.github/workflows/render.yml`, bara manuell start (`workflow_dispatch`), aldrig vid push:

- **Indata:** `scen` (scenmapp), `bitar` (standard 8), `flaggor` (t.ex. `--en`), `ref` (gren).
- **Jobb 1, längd:** checkout med `fetch-depth: 1` av hela repot (se fas 1). Mät hur lång tid det tar. Installera Playwright 1.49.1 med Chromium och ffmpeg. Kör `render.mjs --langd` och räkna ut bitgränserna i hela bildrutor.
- **Jobb 2, matris (en maskin per bit):** `render.mjs <scen> --fran --till --ut del-N.mp4`. Jobbet misslyckas vid `sidfel:`. `saknas:`-raderna sparas i en fil som laddas upp med biten, eftersom vissa scener saknar filer även lokalt (004 korscen-1).
- `molnrender.sh` jämför sedan molnets `saknas:`-lista med datorn. Finns en saknad fil lokalt har den inte pushats, och då stoppar skriptet innan den nya filmen läggs in.
- **Jobb 3, ihop:** ladda ner bitarna, kör `ffmpeg concat -an -c copy`, kontrollera antalet bildrutor och ladda upp `<scen>.mp4`. Artefakter sparas 3 dagar.

Piloten mäter:
- tid per bit och total tid, inklusive checkout
- SSIM mot den lokala renderingen, hela filmen och skarvarna bildruta för bildruta
- om Chromium på Linux ritar annorlunda: färg, kantutjämning, de vita kanterna (`kant.js`)

**Klart när:** SSIM mot lokal rendering är minst 0,98, inga skarvar syns och tiden är kortare än lokalt med en upptagen dator.

### Pilotresultat ✅ 2026-11-12 ([run 43177051542](https://github.com/granqvistsanna-web/Lilla-kritan/actions/runs/43177051542))

004 korscen-1, 63,3 s, full kvalitet (1920×1080, 30 fps), 8 bitar:

- **Tid: 5 min 37 s totalt.** Per bit tog checkout ca 75 s, Chromium och ffmpeg ca 40 s och renderingen 1,5–2,7 min (ca 0,5 s per bildruta, alltså långsammare per maskin än datorn). Ihopsättningen tog 35 s. Lokalt tog samma scen ca 7 min med datorn upptagen (last 250+).
- **Bild:** 1900 av 1900 bildrutor. SSIM mot lokal rendering är 0,990 i snitt, och lägsta bildrutan 0,986. Ingen bildruta ligger under 0,98. Två lokala körningar ger 0,994 mot varandra, så Linux ritar en aning annorlunda, men ingen skillnad syns vid jämförelse sida vid sida.
- **Skarvar:** bildrutorna vid alla 7 skarvar ligger på samma nivå som sina grannar. Inga hopp.
- **Saknade filer:** exakt samma tre som lokalt.
- **Skalning:** fasta väntan är ca 2 min (checkout, installation, ihopsättning). Resten delas med antalet bitar. En 165 s scen med 16 bitar borde ta ca 5 min. Möjliga optimeringar om det behövs: cacha Chromium (ca 30 s) och partiell klon (checkout).

**Fynd i piloten (inte molnets fel):** `assets/bakgrunder/vagen-saker/stuga.png`, `bjork.png`, `lovtrad.png` och `gran.png` raderades i commit `181b3be9` (8 nov). Nya renderingar av 004 visar en trasig bildikon där stugan stod i filmen från 5 nov. Kitet i 003–007, 013 och 014 använder dessa bilder.

## Fas 3 – ett kommando lokalt

`verktyg/molnrender.sh <scenmapp> [bitar] [flaggor]`:

1. Stoppa om scenens filer har ocommittade ändringar eller inte är pushade. Molnet ser bara det som är pushat, och det ska aldrig rendera fel version tyst.
2. `gh workflow run render.yml …`, och sedan `gh run watch`.
3. `gh run download`. Flytta den gamla filmen till `aldre/`, lägg in den nya och kör `--bara-ljud` lokalt för effekt-wav:en.

Lägg till en rad i `CLAUDE.md` under *Delad rendering*: när molnet ska användas och att man pushar först.

**Klart när:** en riktig slutrendering (t.ex. 030 badet, 164,8 s) har gjorts med ett kommando och gått igenom `satt-ihop.sh` och `qa-film.sh`.

## Fas 4 – omgångar (först när fas 3 fungerar)

- `scen` kan vara en lista, så att en start renderar flera scener eller avsnitt (julkalendern, alla `--en`).
- Minns att gratiskontot kör högst 20 jobb samtidigt. Matrisen får köa resten.

## Färre tokens vid rendering (gäller lokalt också)

Själva renderingen kostar inga tokens, men sättet sessionerna väntar på, läser och granskar den gör det. Ungefärliga storlekar: en scen-`index.html` är 60–70 KB (ca 20 000 tokens att läsa hel), `verktyg/rigg-motor.js` 100 KB (ca 28 000) och en granskad bild i full storlek ca 1 500 tokens.

**Vänta utan att titta**
- Kör renderingar med `run_in_background`, och vänta på aviseringen. Aldrig `sleep`-loopar eller "är den klar?"-kontroller.
- Skripten skriver en rad när de är klara (`render-delat.mjs` gör det redan). Hela loggen går till en fil, och bara `tail` läses vid fel.
- I molnet: `gh run watch --exit-status > /dev/null`. Utdatat ger bara klart eller fel.

**Granska med siffror före bilder**
- Kontrollera bildrutor, längd, upplösning, LUFS och SSIM med skript (`qa-film.sh`, ffprobe). Det kostar några rader text i stället för bilder.
- Titta på bilder bara där siffrorna inte räcker: ett kontaktark (`stills/sheet.jpg`, 3×N i 640×360) i stället för många helbilder. Läs det i halv storlek när detaljer inte behövs.
- Titta på skarvar och nya rörelser, inte hela filmen igen.

**Läs mindre**
- Läs aldrig en scen-`index.html` eller `rigg-motor.js` hel. Använd `grep -n` för att hitta stället och läs sedan bara de raderna med `offset`/`limit`.
- Undvik kommandon som dumpar mycket. `pgrep -fl` skrev ut 60 KB miljövariabler den här gången. Använd `pgrep -f mönster | wc -l` eller `ps -o pid,command | cut -c1-120`.
- Loggar och exporter över ca 300 rader sammanfattas av Gemini eller Haiku enligt delegeringsreglerna.

**Rätt modell för rätt del**
- Att starta en rendering, vänta och köra QA är mekaniskt och kan göras av en Haiku-subagent som rapporterar en rad. Ändringar i scener med tydlig spec går till Sonnet. Opus behövs för rörelse, tajming och bildbedömning.
- En session per avsnitt med kort brief. Sessioner som ändrar en scen bygger inte storyboard eller grovklipp själva (befintlig regel).

**Färre omrenderingar**
- `--snabb` och `--fran/--till` runt det som ändrats, inte hela scenen. Slutrendering en gång, när scenen är godkänd.
- Fråga först när något är oklart (befintlig regel). En gissning kostade två hela renderingar förra gången.

**En kö i stället för samordning** (förslag)
- Ett gemensamt lås i `render-delat.mjs` (t.ex. högst 2 renderingar på hela datorn) gör att sessioner inte behöver bevaka varandra med `pgrep`-loopar och meddelanden. Körningen väntar själv på sin tur och meddelar när den är klar.

## Risker

| Risk | Motåtgärd |
|---|---|
| Molnet renderar en gammal version (inte pushad) | `molnrender.sh` stoppar vid ocommittat eller opushat |
| Saknade assets ger tomma figurer utan fel | `molnrender.sh` jämför molnets `saknas:` med datorn och stoppar om en fil finns lokalt men inte är pushad |
| Linux ritar annorlunda än Mac | SSIM-jämförelse i piloten innan något används på riktigt |
| Ett publikt repo visar opublicerat material | Beslut: publikt (Sanna, 2026-11-12) |
| Checkout av 3,1 GB per jobb är långsam | Mäts i piloten. Bitarna checkar ut samtidigt, så det blir en fast väntan, inte en per bit. Optimering i fas 1 vid behov |
| Parallella sessioner committar varandras filer | Gäller redan idag. Committa scenen i egen commit med `git commit -- <sökvägar>` före molnrender |
