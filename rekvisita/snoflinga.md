# Snöflingan

En stor sexarmad snöflinga sedd rakt framifrån: sex tjocka raka armar i 60° från en liten rund sexkantig mitt, en arm rakt upp, varje arm med ett par korta V-formade sidogrenar och en rund spets. Varmvit krita (`#F7F9FC`) med en tydlig ljusblå kritkant (`#9FC0E4`) runt allt och lite ljusblå skugga kring mitten. Enkel och kraftig så att den läses både liten och stor. Inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 3 (hunden och snöflingorna): flingorna som faller kan vara den här bilden i olika storlekar. Den vänds aldrig; den kan rotera sakta.

**Mått i urklippet `assets/rekvisita/snoflinga/cut/snoflinga.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 121–902, y 75–948 (782 × 874 px). Färgytan: x 130–893, y 84–939 (764 × 856 px).
- **Mitten: (512, 512)**, radie till armspetsarna 437 px (alfat). Rotera runt mitten.
- Armarna pekar rakt upp och 60° därifrån. Flingan är vit mot vit: den syns tack vare den ljusblå kanten, och bäst mot mörkblå himmel.
- Vit kant 9 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/snoflinga/cut/snoflinga-kontur.json`, `{ "d": "M… Z", "bbox": [121, 75, 782, 874] }`. En sluten bana i urklippets egna pixlar, 96 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (511, 84). Den följer färgytans ytterkant (alfat krympt 9 px, alltså innanför den vita kanten). Snöflingan har många hörn, därför 96 punkter i stället för ca 60; den avviker som mest ca 15 px från kanten vid sidogrenarnas inskärningar.

Används i: julkalendern 2026, lucka 3.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/snoflinga/original/snoflinga-1.png` (1024 × 1024). Urklippt med en vit kant på 9 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund. Eftersom saken är vit klipptes den med kanten runt den blå kritlinjen (inte med `tunn_kant.py`, som inte kan skilja vitt från kanten).

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE large snowflake seen exactly straight on, completely flat, very simple, bold and chunky so that it reads even when small: six thick straight arms radiating from a small round hexagonal centre at exactly 60 degrees from each other, one arm pointing straight up, each arm with one pair of short thick V-shaped side branches in the outer half and a small rounded tip. The whole snowflake is soft warm white crayon (#F7F9FC) with fine paper grain and a clear, pale blue (#9FC0E4) crayon edge along every outline and a soft pale blue shade near the centre, perfectly symmetric. NO face, no sparkles, no glow, no highlights, no text, no shading, no 3D. A thick, clean, even white sticker border all around the whole snowflake. Centered, the snowflake fills about 75 percent of the frame with empty white space around, plain pure solid white background, no shadow, no ground.
```
