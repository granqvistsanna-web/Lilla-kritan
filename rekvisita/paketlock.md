# Paketlocket

Locket till en presentask sett rakt framifrån: ett lågt, brett, rundat rektangulärt lock i samma röda krita som [paketet](paket.md) (`#D9382E`), ca 2,4 gånger så brett som högt, med en lite bredare kant som hänger ut över asken och ett guldgult (`#E8B730`) lodrätt band över mitten. Ingen rosett, inget ansikte. Locket visar också asken lite under kanten, så det läses som ett lock på en ask.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 24 (julafton): locket poppar av paketet och nallen tittar upp. Den vänds aldrig; locket flyger upp och faller ner i kod.

**Mått i urklippet `assets/rekvisita/paketlock/cut/paketlock.png` (1024 × 572 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 93–930, y 109–463 (838 × 355 px). Färgytan: x 99–924, y 115–457 (826 × 343 px).
- **Överkantens mitt: (512, 115)**, framsidans mitt (512, 286,5). Det lodräta bandet ligger på x 474–549 (ca 75 px bredd), mitt x 511,5.
- Locket är 826 px brett mot [paketets](paket.md) 780 px: lägg det i skala 0,95 ovanpå paketet, med bandet på paketets lodräta band (x 467–556), och dess nederkant på paketets övre del.
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/paketlock/cut/paketlock-kontur.json`, `{ "d": "M… Z", "bbox": [93, 109, 838, 355] }`. En sluten bana i urklippets egna pixlar, 56 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (497, 115,1). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten).

Används i: julkalendern 2026, lucka 24.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/paketlock/original/paketlock-1.png` (1376 × 768, 16:9, skalad till 1024 × 572). Locket har en rejäl kant och en liten skärning av asken under den. Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE gift box lid, seen exactly straight on from the front, completely flat, very simple and childish: a low, wide, rounded rectangle about 3 times as wide as it is tall, with soft round corners, in warm bright red (#D9382E) mottled grainy wax crayon with fine paper grain. ONE flat gold-yellow (#E8B730) ribbon band runs vertically over it exactly in the middle from the top edge to the bottom edge, about one eighth of the lid's width, the band simply ends at the lid's edges. The lid is perfectly left-right symmetric. NO bow, no knot, no box below it, no gift tag, no face, no text, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole lid. Centered, the lid fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
