# Julkulan

En rund julgranskula av glas som hänger rakt, sedd framifrån: en perfekt rund boll i klar varmröd krita (`#D9382E`), en kort guldgul (`#E8B730`) kapsyl överst och ovanför den en liten rund guldgul ögla med öppet hål, samt två små mjuka vita glansprickar uppe till vänster. Ingen tråd, inget mönster, inget ansikte. En röd bild räcker: andra färger tonas i kod.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 7 (lammet och julkulan): kulan hänger i granen, ramlar och går sönder; kan tonas till guld eller blått i kod. Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/julkula/cut/julkula.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 178–845, y 77–947 (668 × 871 px). Färgytan: x 187–836, y 86–938 (650 × 853 px).
- **Upphängningspunkten, ögleläget: hålets mitt (510,8, 159,7)**, öglans topp (510,8, 91). Låt en tråd eller en grangren gå genom hålet.
- Bollen: mitt (512,5, 612,5), radie 321,5 px. Kapsylen: x 424–601, y 226–299 (178 × 74 px).
- Glansen: en större fläck och en liten prick uppe till vänster om bollens mitt.
- Vit kant 9 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/julkula/cut/julkula-kontur.json`, `{ "d": "M… Z", "bbox": [178, 77, 668, 871] }`. En sluten bana i urklippets egna pixlar, 58 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (510, 87). Den följer färgytans ytterkant (alfat krympt 9 px, alltså innanför den vita kanten). Öglans hål ingår inte.

Används i: julkalendern 2026, lucka 7.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/julkula/original/julkula-1.png` (1024 × 1024). Glansen är två fläckar, inte en. Urklippt med en vit kant på 9 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE round glass Christmas bauble hanging straight, seen exactly straight on, completely flat, very simple and childish: a perfectly round ball in bright warm red (#D9382E) mottled grainy wax crayon with fine paper grain, a short flat gold-yellow (#E8B730) cap on top of the ball, and above the cap a small round gold-yellow loop (a ring with an open hole showing the white background). One small soft white highlight spot on the upper left of the ball. Perfectly symmetric apart from the highlight. NO string, no ribbon, no pattern, no stripes, no glitter, no face, no text, no other shading, no 3D. A thick, clean, even white sticker border all around the whole bauble, also around the inside of the loop. Centered, the whole thing including the loop fills about 75 percent of the frame height with empty white space around, plain pure solid white background, no shadow, no ground.
```
