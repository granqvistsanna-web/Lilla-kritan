# Avsnitt 037 – Kaninen städar

**Status (2026-11-14):** 🎬 omgjord efter Sannas feedback (*"start with walking cycle for bunny walking -> for a loop with a filled basket. add face to teddy."*), ny film för granskning (`film/avsnitt-037.mp4`).

En enkel loopvideo till en städsång (Sannas egen tagning, `sang.m4a`, 5:00). Kaninen går in från vänster med den fulla korgen
(nallen, bollen, bilen, hinken och båten i den) och fortsätter gå hela sången: den står kvar mitt i bild och tar jämna steg
medan bakgrunden glider förbi (tre kopior, den mittersta speglad, så att inga skarvar syns). Farten tas över mjukt från kaninen
till bakgrunden, så att stegen följer marken hela tiden. När sången tar slut saktar den in och ställer ner korgen.
Nallen har ansiktet i kod (`produktion/youtube/shorts/godnatt/nalle-v2.js`, samma som i 016 och sov gott).
Den förra versionen (leksakerna poppar fram och plockas upp, 6 varv) finns i git före 2026-11-14.

| | |
|---|---|
| **Figur** | Kaninen Kanel (v2-rigg) |
| **Plats** | Riggtestets bakgrund (`assets/stiltest-premium/skogen-monster-mild-a.png`, utan trädet), Sanna: "use one of our existing bg like the one for test rigs vid" |
| **Intro** | det gemensamma bilderbok-introt (3,3 s) |
| **Slut** | efter sången: kaninen vinkar vid den fulla korgen, Malin: *"Vad kul det var att städa, kaninen! Hejdå!"* (`assets/ljud/roster/kaninen-stadar/slut-kul-att-stada-1.m4a`, ElevenLabs 2026-11-14; tagning 2 ligger bredvid), kritirisen |

Avsteg från `format/regler.md`: längre än 3–4 min (sångens längd) och utan titelkort, avsiktligt för en loopvideo.

## Filer

- `scener/stada/index.html` – hela scenen i kod. Stillbilder: `node render.mjs stada 3 9 15` (från `scener/`).
- `film/satt-ihop.sh` – intro + scen, mastrad.
- Rendera: `node verktyg/render-delat.mjs avsnitt/037-kaninen-stadar/scener/stada`, sedan `bash avsnitt/037-kaninen-stadar/film/satt-ihop.sh`.

## Feedback 2026-11-14 (andra omgången)
- **Krittimer** uppe till höger: gul krittårta som töms under hela sången, stor siffra = minuter kvar och "5 min" under; intro "städtid 5 minuter!".
- **Leksaker på golvet:** kaninen går förbi en leksak (bil, nalle, boll, hink, båt) var 3:e sekund, plockar upp den och kastar den i korgen (Sanna ville ca var 2:a; 3 s för att hålla det lugnt, inga nya saker, bok/kloss/anka finns inte som rekvisita).
- **Korgens leksaker** omplacerade så att alla fem syns tydligt utan att täcka varandra.
