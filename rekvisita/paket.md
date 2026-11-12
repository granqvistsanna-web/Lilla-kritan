# Paketet

En knubbig presentask sedd rakt framifrån i art direction v2, samma platta krita som [gula stjärnan](stjarna-gul.md) och [julgranen](julgran.md): en rundad rektangel i varmt rött (`#D9382E`), ca 1,3 gånger så bred som hög, med en helt rak överkant och ett guldgult (`#E8B730`) band i kors, ett lodrätt och ett vågrätt, som tar slut vid askens kanter. **Ingen rosett, ingen knut och inget ansikte i bilden:** [rosetten](rosett.md) ritas som egen sak ovanpå, snön ligger som [snötuss](snotuss.md), och ansiktet ritas i kod.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** lucka 9 (paketet: kritan ritar lådan, bandet trasslar sig, rosetten kommer sist) och lucka 24 (julafton, samma paket under granen). Den vänds aldrig.

**Mått i urklippet `assets/rekvisita/paket/cut/paket.png` (1024 × 1024 px, genomskinligt runt om):**
- Hela bilden med vit kant (bbox för de täta pixlarna): x 116–907, y 193–830 (792 × 638 px). Färgytan: x 122–901, y 199–824 (780 × 626 px).
- **Överkantens mitt, där rosetten och snötussen fästs: (512, 199)** (färgytans överkant, den vita kantens överkant ligger på y 193). Överkanten är rak och 780 px bred.
- **Framsidans mitt: (512, 512)**, och där ligger bandkorsets mitt. Bandet: lodrätt x 467–556, vågrätt y 466–557 (ca 90 px tjocka).
- **Ansiktet ritas i kod i nedre halvans mitt, (512, 691)**, under det vågräta bandet (som i den gamla kodritade luckan, där ansiktet satt under korset). Den fria röda ytan där är ca 266 px hög (y 558–824) och korsar det lodräta bandet.
- Vit kant 6 px i filen. Visas saken i en annan skala än stjärnan: gör om kanten med `python3 verktyg/tunn_kant.py N` (N = 5 px delat med skalan; vita saker kräver en egen kantning, se `vita-kanter`).

**Konturen:** `assets/rekvisita/paket/cut/paket-kontur.json`, `{ "d": "M… Z", "bbox": [116, 193, 792, 638] }`. En sluten bana i urklippets egna pixlar, 57 stödpunkter som mjuka kurvor (kubiska Bezier-bitar), medurs, med start och slut överst vid (490, 199). Den följer färgytans ytterkant (alfat krympt 6 px, alltså innanför den vita kanten).

Används i: julkalendern 2026, lucka 9 och 24.

**Bild (2026-11-12, OpenArt, Nano Banana 2, bild-till-bild, 1K, 20 krediter per tagning, godkänd av Sanna 2026-11-12):** bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg`, båda som stilreferens. Google Flow låg nere, därför OpenArt (Sanna sa ja till kostnaden). En tagning, `assets/rekvisita/paket/original/paket-1.png` (1024 × 1024, på vit bakgrund). Rätt sak och rätt look på första försöket. Urklippt med en vit kant på 6 px (ca 1 % av höjden, skillen `vita-kanter`) och skalad till 1024 px bredd; kontrollerad på mörkblå och krämvit bakgrund.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE chubby gift box seen exactly straight on from the front, completely flat, very simple and childish like a toddler picture-book present: one single rounded rectangle with soft round corners, about 1.3 times as wide as it is tall, a perfectly flat straight top edge, in warm bright red (#D9382E) mottled grainy wax crayon with fine paper grain. A gold-yellow (#E8B730) ribbon crosses it as a flat cross: ONE vertical band running from the top edge to the bottom edge exactly in the middle, and ONE horizontal band running from the left edge to the right edge across the middle, each band about one eighth of the box width, flat and even, the bands simply end at the box edges. The box is symmetric left to right. NO bow, no knot, no loops, no tails, nothing sticking out above or beside the box, no lid line, no gift tag, no text, no face, no eyes, no snow, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole box. Centered, the box fills about 65 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
