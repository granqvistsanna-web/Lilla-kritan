# Snögubben

En hel, vänlig snögubbe sedd rakt framifrån: tre staplade runda bollar (störst längst ner), varmvit krita (`#F7F9FC`) med mjuk ljusblå skugga (`#BFD3EA`) nedtill till höger på varje boll och en svag blågrå kant, två små runda kolbitar till ögon, en kort orange morotsnäsa (`#F28A2E`) som pekar åt höger, en röd stickad halsduk (`#D9382E`) mellan huvud och mage med ena snibben hängande ner till höger, och tre kolknappar på mellanbollen. Ingen mun, ingen hatt, inga armar. Ögonen är med i bilden och står still: det är ingen figur som animeras.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 8 (hunden bygger en snögubbe): kritan ritar snögubben, och hunden rullar snöbollar ([snöbollen](snoboll.md)) och sätter på [moroten](morot.md). Bilden har redan en morotsnäsa: vill luckan sätta dit moroten själv behövs en version utan näsa (den går att göra på begäran).

**Mått i urklippet `assets/rekvisita/snogubbe/cut/snogubbe.png` (1024 × 1371 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 157–865, y 91–1280 (709 × 1190 px). Färgytan: x 169–853, y 103–1268 (685 × 1166 px).
- **Morotsnäsan: mitt (558,9, 342,7), roten (500, 341,6), spetsen (647, 346)** (x 500–647, y 310–368 (148 × 59 px)). Den pekar åt höger.
- Ögon (kolbitar): (423,8, 286) och (602,1, 281,9). Knappar: (512,8, 638,5), (513,1, 719,8), (512,6, 800,2). Halsduken: x 294–736, y 430–732 (443 × 303 px).
- Bollarna: huvudet överst, mellanbollen och underbollen ungefär 1,4 gånger huvudets bredd.
- Vit kant 12 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/snogubbe/cut/snogubbe-kontur.json`, `{ "d": "M… Z", "bbox": [157, 91, 709, 1190] }`. En sluten bana i urklippets egna pixlar, 58 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (510, 103,1). Den följer färgytans ytterkant (alfat krympt 12 px, alltså innanför den vita kanten).

Används i: julkalendern 2026, lucka 8.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/snogubbe/original/snogubbe-1.png` (896 × 1200, 3:4, skalad till 1024 × 1371). Urklippt med en vit kant på 12 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund. Eftersom saken är vit klipptes den med kanten runt den blågrå kritlinjen.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE complete, friendly snowman seen exactly straight on from the front, completely flat, very simple and childish: three stacked round snowballs, the bottom one biggest, the middle one smaller, the head smallest, perfectly left-right symmetric, in soft warm white crayon (#F7F9FC) with fine paper grain and a very soft pale blue (#BFD3EA) crayon shade along the lower right of each ball and where the balls meet, only a faint slightly darker blue-grey crayon edge. Two small round black coal eyes on the head, a short orange (#F28A2E) carrot nose pointing slightly to the right in the middle of the head, a bright red (#D9382E) knitted scarf wrapped around the neck between head and middle ball with one short end hanging down on the right, and three small round black coal buttons stacked down the middle ball. NO mouth, no hat, no arms, no twigs, no broom, no snow on the ground, no text, no highlights, no shiny shading, no 3D. A thick, clean, even white sticker border all around the whole snowman. Centered, the snowman fills about 80 percent of the frame height with empty white space around, plain pure solid white background, no shadow, no ground.
```
