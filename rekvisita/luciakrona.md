# Luciakronan

En luciakrona sedd framifrån: en tjock, platt oval krans av överlappande gröna granblad i djup grön krita (`#2F7D4F`), med en stor oval öppning i mitten som visar bakgrunden (så att ett huvud kan synas igenom), och fyra små, korta, vita ljus (`#F7F9FC` med svag grå kant) som står på kransens övre del, vart och ett med en liten gulorange låga med klargult i mitten. Ringen är ca 1,8 gånger så bred som hög (hela kronan med ljusen ca 1,3). Kransen är ritad lite snett uppifrån, så den läses som en krans och inte som en platt ring. Inga bär, ingen rosett, inget ansikte.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 13 (Lucia): kronan sitter på huvudet och ljusen tänds. Öppningen är där huvudet (kaninens eller lammets) syns; lägg kronan så att öppningens mitt hamnar ovanför pannan.

**Mått i urklippet `assets/rekvisita/luciakrona/cut/luciakrona.png` (1024 × 765 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 134–889, y 83–678 (756 × 596 px). Färgytan: x 140–883, y 89–672 (744 × 584 px).
- **Öppningens mitt: (511,6, 423,7)**, öppningen x 290–733, y 328–520 (444 × 193 px), alltså halvaxlar ca 222 × 96,5 px. Den är genomskinlig i klippet.
- Fyra ljus (vita kroppar, mitt): (268,9, 261,2), (420,9, 210,4), (602,1, 210,5), (754,1, 261,2). Lågornas mitt: (269,2, 172,8), (421,4, 122,3), (601,6, 122,1), (753,9, 172,8).
- Ljusen är en del av bilden (inga separata lågor). Vill en lucka tända dem en i taget läggs [lågan](laga.md) över dem i skala ca 0,12.
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/luciakrona/cut/luciakrona-kontur.json`, `{ "d": "M… Z", "bbox": [134, 83, 756, 596] }`. En sluten bana i urklippets egna pixlar, 60 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (601,8, 91,8). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten). Bara ytterformen: öppningen ingår inte.

Används i: julkalendern 2026, lucka 13.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/luciakrona/original/luciakrona-1.png` (1200 × 896, 4:3, skalad till 1024 × 765). Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), and for the green copy the deep fir green of image 1, not its subject. Draw ONE Lucia crown, a wreath, seen exactly straight on from the front, completely flat, very simple and childish: a thick flat oval ring of overlapping green spruce leaves in deep fir green (#2F7D4F), about 1.8 times as wide as it is tall, perfectly left-right symmetric, with a large oval hole in the middle that shows the plain white background (so a head can show through). On the top half of the ring stand FOUR small, short, chunky white candles (#F7F9FC with a faint pale grey crayon edge), evenly spaced, each with a small yellow-orange (#F7A93B) teardrop flame with a smaller bright yellow centre on top. No berries, no ribbon, no bow, no baubles, no face, no text, no shading, no highlights, no shine, no 3D. A thick, clean, even white sticker border all around the whole crown, also around the inside of the oval hole. Centered, the crown fills about 80 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
