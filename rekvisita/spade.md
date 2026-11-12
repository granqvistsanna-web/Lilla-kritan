# Spaden

En liten snöskyffel för barn, ritad rakt upp och ner och sedd framifrån: ett långt rakt brunt trähandtag (`#A8703B`) med ett litet D-format grepp överst (med genomskinligt hål) och ett brett, plant, rundat rektangulärt blad i klar röd krita (`#D9382E`) längst ner. Platt krita med fint korn och vit kant. Ingen snö, ingen hand, inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 7 (lammet städar upp efter kulan): spaden skottar bort snön eller skärvorna. Den vänds aldrig; den kan lutas lite i kod.

**Mått i urklippet `assets/rekvisita/spade/cut/spade.png` (1024 × 1371 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 328–695, y 93–1271 (368 × 1179 px). Färgytan: x 340–683, y 105–1259 (344 × 1155 px).
- **Greppets hål: mitt (511,5, 187,6)**, x 466–556, y 164–219 (91 × 56 px). Skaftet ligger mitt på x 511.
- **Bladet: x 343–681, y 862–1257 (339 × 396 px)**, mitt (512,5, 1060). Bladets nedre kant ligger på y 1257 (det är den som skottar).
- Hela spaden är 1155 px hög och 344 px bred: visa den i ca 0,3 skala för ett lamm.
- Vit kant 12 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/spade/cut/spade-kontur.json`, `{ "d": "M… Z", "bbox": [328, 93, 368, 1179] }`. En sluten bana i urklippets egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (486, 105). Den följer färgytans ytterkant (alfat krympt 12 px, alltså innanför den vita kanten). Greppets hål ingår inte.

Används i: julkalendern 2026, lucka 7.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/spade/original/spade-1.png` (896 × 1200, 3:4, skalad till 1024 × 1371). Urklippt med en vit kant på 12 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE small children's snow shovel, drawn perfectly straight and upright, seen exactly straight on from the front, completely flat, very simple and childish: a long straight chunky wooden handle in warm brown (#A8703B) with a small rounded D-shaped grip at the top, and at the bottom a broad, flat, slightly rounded-rectangle shovel blade in bright warm red (#D9382E), about as wide as one third of the shovel's total height, the blade ending in a gently rounded straight edge at the bottom. Mottled grainy wax crayon with fine paper grain, only a faint slightly darker crayon edge. NO snow, no hand, no face, no text, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole shovel, also around the inside of the grip hole. Centered, the shovel fills about 85 percent of the frame height with empty white space around, plain pure solid white background, no shadow, no ground.
```
