# Moroten

En enkel morot som ligger vågrätt och pekar åt höger: en knubbig, avsmalnande morot i orange krita (`#F28A2E`) med två tre svaga mörkare orange tvärstreck och en liten tuss av tre rundade gröna blad (`#3E9A5A`) vid den tjocka vänstra änden. Platt krita med fint korn och vit kant. Inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 8 (hunden bygger en snögubbe): moroten blir snögubbens nässa. Den är ritad stor (731 px lång): sätt in den i skala ca 0,2 så att den blir lika stor som snögubbens morotsnäsa (148 px bred i [snögubbens](snogubbe.md) bild).

**Mått i urklippet `assets/rekvisita/morot/cut/morot.png` (1024 × 572 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 69–954, y 132–440 (886 × 309 px). Färgytan: x 75–948, y 138–434 (874 × 297 px).
- **Moroten: x 212–942, y 143–432 (731 × 290 px), spetsen i (942, 284,4), tjocka änden (där bladen sitter) i (212, 293,2).** Pekar åt höger och ligger nästan vågrätt.
- Bladen: x 75–215, y 197–374 (141 × 178 px), mitt (145,5, 286). Som nässa kan bladen döljas bakom snögubbens ansikte (rotpunkten är den tjocka änden).
- Vill en lucka ha moroten utan blast: klipp bort allt till vänster om x 212.
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/morot/cut/morot-kontur.json`, `{ "d": "M… Z", "bbox": [69, 132, 886, 309] }`. En sluten bana i urklippets egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (377, 138). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten). Bladen är med i konturen.

Används i: julkalendern 2026, lucka 8.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/morot/original/morot-1.png` (1376 × 768, 16:9, skalad till 1024 × 572). Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE plain carrot lying horizontally, pointing to the RIGHT, seen straight on, completely flat, very simple and childish: a chunky, plump, tapering orange (#F28A2E) carrot, about 3.5 times as long as it is tall at its thick end, the thick end on the left and a softly rounded point on the right, with two or three faint short slightly darker orange crayon lines across it. At the thick left end a short tuft of three small rounded green (#3E9A5A) leaves sticks out to the left. Mottled grainy wax crayon with fine paper grain, only a faint slightly darker crayon edge. NO face, no hand, no snow, no text, no shading, no highlights, no shine, no 3D. A thick, clean, even white sticker border all around the whole carrot including the leaves. Centered, the carrot spans about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
