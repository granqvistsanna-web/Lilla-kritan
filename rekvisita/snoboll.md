# Snöbollen

En enkel snöboll sedd rakt framifrån: en perfekt rund boll i varmvit krita (`#F7F9FC`) med fint papperskorn och mjuk ljusblå skugga (`#BFD3EA`) längs nedre högra delen, bara en svag blågrå kant. Samma stil som [snötussen](snotuss.md). Inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 8 (hunden rullar snöbollar till en snögubbe): bollen rullar (vrid den i kod, den är rund) och växer när den rullas. Fotstegen och spåret ritas i kod.

**Mått i urklippet `assets/rekvisita/snoboll/cut/snoboll.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 126–897, y 126–897 (772 × 772 px). Färgytan: x 134–889, y 134–889 (756 × 756 px).
- **Mitten: (512, 512), radie 378 px** (färgytan; alfat 386 px). Rotera runt mitten när den rullar. Skuggan ligger nedre höger i bilden och följer med när bilden vrids; håll vridningen liten, eller rulla den utan rotation.
- Bollen är vit mot vit: den syns tack vare den blågrå kanten och skuggan, och bäst mot ett färgat papper.
- Vit kant 8 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/snoboll/cut/snoboll-kontur.json`, `{ "d": "M… Z", "bbox": [126, 126, 772, 772] }`. En sluten bana i urklippets egna pixlar, 56 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (498, 134,1). Den följer färgytans ytterkant (alfat krympt 8 px, alltså innanför den vita kanten).

Används i: julkalendern 2026, lucka 8.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/snoboll/original/snoboll-1.png` (1024 × 1024). Urklippt med en vit kant på 8 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund. Klipptes med kanten runt den blågrå kritlinjen.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE plain snowball, seen exactly straight on, completely flat, very simple and childish: a perfectly round ball in warm soft white crayon (#F7F9FC) with fine paper grain and a very soft pale blue (#BFD3EA) crayon shade along the lower right part of the ball, only a faint slightly darker blue-grey crayon edge. NO face, no eyes, no sparkles, no snowflakes, no footprints, no highlights, no shiny shading, no 3D, no text. A thick, clean, even white sticker border all around the whole ball. Centered, the ball fills about 65 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
