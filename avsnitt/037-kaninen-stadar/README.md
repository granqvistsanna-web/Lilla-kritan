# Avsnitt 037 – Kaninen städar

**Status (2026-11-13):** 🎬 första hela filmen för Sannas granskning (`film/avsnitt-037.mp4`).

En enkel loopvideo till en städsång (Sannas egen tagning, `sang.m4a`, 5:00). Ingen berättelse: kaninen går in med en tom korg,
ställer ner den, och en leksak i taget poppar fram på golvet (nallen, bollen, bilen, hinken, båten). Kaninen plockar upp dem och
lägger dem i korgen, hoppar av glädje, lyfter den fulla korgen och går ut till höger. Nästa varv kommer den in från vänster igen,
så att loopen går ihop utanför bilden (ca 44 s per varv, 6 hela varv + ett sista som stannar vid glädjehoppen).

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
