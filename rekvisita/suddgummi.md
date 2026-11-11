# Suddgummit

Ett enkelt suddgummi i art direction v2: en rundad kloss som är rosa (`#EB91AA`) i vänstra änden och blå (`#5892CD`) i den högra, liggande lite på sned (10°, högra änden högst). Kornig vaxkrita med lite mörkare kritkant och vit klistermärkeskant. Klossen är ritad med en smal kortsida till vänster och en smal undersida, så att den läses tydligt som ett suddgummi. Inget ansikte, ingen text, ingen logga, ingen penna.

**I julkalendern (`produktion/youtube/julkalender-plan.md`), lucka 1:** kritan ritar konturen i ett drag, sedan fylls bilden i inifrån (`format/ritintro.md`). Suddgummit gnuggar bort molnet så att stjärnan blir fri. Det är en sak, inte en figur: inget ansikte, och det vänds aldrig.

**Mått i urklippet `assets/rekvisita/suddgummi/cut/suddgummi.png` (1024 × 1024 px):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 117, y 252, bredd 790, höjd 521.
- Färgytan: x 125–898, y 259–765. Mitt (513, 513).
- Klossen är 753 × 412 px och lutar 10° (högra änden högst). Vrid bilden 10° medurs runt (513, 513) för att få den att ligga rakt.
- Rosa delen: x 125–643, 64 % av ytan, mitt (384, 536). Blå delen: x 578–898, 35 %, mitt (744, 469). Skarven lutar lite.
- Vit kant 8 px i filen, samma som [stjärnan](stjarna-gul.md). Visas suddgummit mycket mindre än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan).

**Konturen:** `assets/rekvisita/suddgummi/cut/suddgummi-kontur.json`, `{ "d": "M… Z", "bbox": [117, 252, 790, 521] }`. En sluten bana i urklippets egna pixlar, 56 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs med start och slut längst till vänster (126, 466). Den följer färgytans ytterkant (alfat krympt 8 px) och avviker i snitt 0,7 px från den, som mest 1,6 px. Bara ytterformen: klossens inre linjer ingår inte.

Används i: julkalendern 2026, lucka 1.

**Bilder (2026-11-11, Google Flow, Nano Banana Pro, 1:1, 1024 × 1024, 0 krediter):** tre tagningar i `assets/rekvisita/suddgummi/original/suddgummi-1…3.jpeg`. Nr 1 (prompten nedan, bild 1 = `assets/rekvisita/badanka/badanka.jpeg`, bild 2 = `assets/karaktarer/kaninen-kanel/premium/kanel-faceless.png`, båda som stilreferens) blev en kloss med synliga sidor, fast prompten bad om en helt platt. Nr 2 är nr 1 gjord platt (den tappade lutningen) och nr 3 är platt, lutar och har sned skarv. **Sanna valde nr 1 (2026-11-11)**, klossen. Urklippt med `cutout.py` och kanten satt med `tunn_kant.py 8`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE simple rubber eraser for school drawing, seen exactly straight on from the front, completely flat, very simple and childish like a toddler's crayon drawing: one chunky rounded rectangle block with soft round corners, about twice as wide as it is tall, lying slightly tilted, its right end a little higher than its left end (about 10 degrees). The left part of the block, a bit more than half, is soft bubblegum pink crayon (#F29CB7). The right part is clear medium blue crayon (#4F8FD9). The two colours meet at one straight, slightly slanted line across the block, with no gap and no band between them. Both colours are flat mottled grainy wax crayon with fine paper grain and only a faint slightly darker crayon edge along the outline. Only the flat front face is visible: no top side, no end side, no thickness, no bevel. NO face, no eyes, no mouth, no text, no letters, no logo, no brand mark, no paper sleeve, no stripes, no pencil, no eraser crumbs, no shading, no highlights, no shine, no 3D. A thick, clean, even white sticker border all around the whole eraser. Centered, filling about two thirds of the frame width with space around, plain pure solid white background, no shadow, no ground, no text.
```
