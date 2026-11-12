# Pulkan

En röd träpulka sedd rakt från sidan, vänd åt höger: en lång, låg röd sitsplanka (`#D9382E`) på två korta bruna stolpar över två kraftiga bruna medar (`#A8703B`) som kröker sig uppåt i en mjuk rund båge längst fram till höger, och ett guldgult (`#E8B730`) dragrep som ligger i en lös ögla framför. Plats för en gris på sitsen. Mellanrummen mellan stolparna är genomskinliga. Ingen gris, ingen snö.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 5 (grisen åker pulka): grisen sitter på sitsen och pulkan glider nedför backen (`backe` i `djur.js`). Den vänds aldrig; pulkan pekar åt höger.

**Mått i urklippet `assets/rekvisita/pulka/cut/pulka.png` (1024 × 572 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 95–957, y 175–488 (863 × 314 px). Färgytan: x 101–951, y 181–482 (851 × 302 px).
- **Sitsen: x 114–728, y 241–281 (615 × 41 px). Sitsens översida, där grisens botten vilar, ligger på y 241, mitt (421,5, 241).** Sitsen är 615 px lång.
- Framkrokens topp: (741, 181). Repet: ungefär x 591–730, y 457–480 (140 × 24 px) (den längsta delen) och ligger framför pulkans främre ände; det är med i bilden men inte i konturen, eftersom det är för tunt.
- Genomskinliga luckor mellan stolparna och under sitsen: x 282–573, y 288–313 (292 × 26 px) och x 605–742, y 438–466 (138 × 29 px).
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/pulka/cut/pulka-kontur.json`, `{ "d": "M… Z", "bbox": [95, 175, 863, 314] }`. En sluten bana i urklippets egna pixlar, 88 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (731, 183,1). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten). Repet är för tunt för konturen och ingår inte: kritan ritar pulkans kropp i ett drag.

Används i: julkalendern 2026, lucka 5.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/pulka/original/pulka-1.png` (1376 × 768, 16:9). Sitsen är ganska tunn men lång; ritad lite uppifrån så att medarna syns. Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE child's wooden sled seen exactly from the side, pointing to the RIGHT, completely flat, very simple and childish: a long, low, flat seat board in warm bright red (#D9382E), about three times as long as it is tall, with plenty of flat room on top for an animal to sit, standing on two chunky curved wooden runners in warm brown (#A8703B) that curl up in a soft round curve at the right (front) end, joined to the seat by two short thick posts. A gold-yellow (#E8B730) pull rope is attached at the front right and lies curled in a loose loop in front of the sled. Mottled grainy wax crayon with fine paper grain, only a faint slightly darker crayon edge. NO person, no animal, no snow, no face, no text, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole sled and rope. Centered, the sled spans about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
