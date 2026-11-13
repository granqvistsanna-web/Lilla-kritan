# Julskogen

**Väggfärg:** ljus vinterhimmel `#CFE3F0` · **Golv:** snö, gräddvit `#FAF8F2` · **Används till:** Tittut i julskogen, björnen och grisen (`produktion/youtube/shorts/jul/plan-tittut-bjornen.md`), december 2026

En snöig glänta i art direction v2 ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md)). Det är samma sorts vinter som [Vinterkullen](vinterkullen.md), men platt som [Skogen grön](skogen-gron.md): ljus himmel med kritskraffering och en plan vit snömark. Två rader bleka snögranar står bakom gläntan och är inbakade i plattan. Mitten är fri. Gömställena är **egna urklipp**, och samma tre används i båda filmerna: **julgranen, pakethögen och pepparkakshuset**.

Bilderna sparas i `assets/bakgrunder/julskogen/` (plattan) och `assets/bakgrunder/julskogen-saker/` (gömställena, med original i `original/`). Allt görs i Google Flow med Nano Banana Pro, 16:9 eller 1:1, uppskalat, 0 krediter.

## Plattan

Bild 1 = `assets/bakgrunder/vinterkullen/vinterkullen.jpeg` (vinterstilen), bild 2 = `assets/bakgrunder/skogen-gron/skogen-gron.png` (den platta tittut-uppställningen med trädrader).

```prompt
Images 1 and 2 are STYLE references only: copy their premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, soft even colour fields, NO dark outlines – not their subjects. Image 2 shows the layout to follow: a flat backdrop with a straight, level ground line and rows of trees standing on it. Draw an empty, calm snowy forest glade in soft winter daylight as a backdrop for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top three quarters is a pale, soft winter sky in light icy blue (#CFE3F0) with gentle, even crayon hatching. The bottom quarter is flat, level snowy ground in clean creamy white (#FAF8F2) with only the faintest paper grain and a thin, soft pale blue crayon line along its straight, level top edge at about 75 percent of the image height, from the left edge to the right edge. Standing on that ground line behind the glade: two loose rows of simple, chunky spruce trees in soft muted green crayon (#4E9270) with rounded white snow caps on their branches; the back row small and faded toward the sky colour, the front row a little bigger and a little stronger, the tallest tree no more than 40 percent of the image height, the trees evenly spread across the whole width. Everything is quiet and even. No sun, no clouds, no falling snow, no snowflakes, no stars, no animals, no people, no houses, no presents, no Christmas decorations, no snowman, no footprints, no tracks, no objects in front of the trees, no shadows, no text.
```

- **Golvlinjen** ska ligga på ca 75 % av höjden (y ≈ 810 i 1920 × 1080). Fotpunkterna ligger under den.
- Den uppskalade bilden är 2752 × 1536 (43:24). Tittut-motorn fyller rutan med `slice` och beskär 7 px per sida.

## Gömställena

Alla tre har vit klisterkant. Kanten mäts och tunnas med `verktyg/tunn_kant.py` till ca 1 % av höjden i bild (se skillen `vita-kanter`).

### Julgranen (hög)

Den klädda granen från lucka 1 återanvänds: `assets/rekvisita/julgran/cut/julgran-kladd.png` (mått och kontur i [`rekvisita/julgran.md`](../rekvisita/julgran.md)). En kopia med kanten tunnad till 5 px ligger som `julskogen-saker/gran.png`. Ingen ny bild behövs. Den ritas ca 900 px hög i bild, så att den nedersta våningen (ca 640 px bred i filen, ca 670 px i bild) döljer björnen och grisen. Den räknas som hög sak: figuren går in från sidan och tittar fram vid grenarna.

### Pakethögen (låg)

Bild 1 = `assets/rekvisita/paket/cut/paket.png`, bild 2 = `assets/rekvisita/rosett/cut/rosett.png`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), and match image 1's gift box and image 2's bow exactly in style and colour. Draw ONE big, chubby pile of Christmas presents seen exactly straight on from the front, completely flat, very simple and childish like a toddler picture-book drawing: at the bottom one wide gift box in warm bright red (#D9382E) with a gold-yellow (#E8B730) ribbon cross; standing on it, slightly to the left, a smaller gift box in fresh green (#4FA44A) with a white ribbon cross; and on top of that, slightly to the right, a small gift box in soft blue (#5B8ED6) with a gold-yellow ribbon cross and one plump gold-yellow bow on its top like image 2. The boxes are simple rounded rectangles with soft round corners and flat straight tops, stacked neatly so the pile looks steady, wider at the bottom, about as wide as it is tall. No face, no eyes, no text, no gift tags, no snow, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole pile as one shape. Centered, the pile fills about 70 percent of the frame height with empty white space around, plain pure solid white background, no shadow, no ground.
```

Pakethögen visas ca 420 px hög i bild, så att björnen (ca 400 px) och grisen döljs helt när de har sjunkit ner. Den kan skaka (`skakar`). Figuren kommer upp ovanför den.

### Pepparkakshuset (mellan)

Bild 1 = `assets/rekvisita/pepparkakshjarta/cut/pepparkakshjarta.png`, bild 2 = `assets/rekvisita/pepparkaksstjarna/cut/pepparkaksstjarna.png`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), and match their gingerbread colour and white icing dots exactly. Draw ONE big, chubby gingerbread house seen exactly straight on from the front, completely flat, very simple and childish like a toddler picture-book drawing: a wide house wall with softly rounded corners, a little wider than tall, in warm gingerbread brown (#B5743B) mottled grainy wax crayon, under a big simple triangular roof with a softly rounded top, the roof also gingerbread brown with a thick wavy band of white icing along its two sloping edges and small rounded icing drips hanging down. In the middle of the wall one rounded arched door in dark warm brown crayon (#5A3524), and one small square window on each side of the door with a white icing cross. A few round candy buttons in red (#D9382E) and green (#4FA44A) along the roof edge and beside the door. A row of small round white icing dots along the bottom of the wall. Perfectly left-right symmetric. NO face, no eyes, no text, no chimney, no smoke, no snow on the ground, no shading, no highlights, no shine, no 3D, no perspective. A thick, clean, even white sticker border all around the whole house. Centered, the house fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```

Huset visas ca 460 px högt i bild. Figuren gömmer sig bakom huset och tittar upp över taket (`ur`: huvudet kommer upp en bit, sedan hela vägen).

## Fotpunkter (björnens film, provade i stillbilder 2026-11-13)

```js
start: [1100, 1060],           // hej och hej då: fri snö mellan granen och pepparkakshuset (björnen, hojd 370)
saker: {
  sack:          [250, 935, { h: 440 }],    // säcken med paket, framför granens nedersta gren
  gran:          [540, 890, { h: 1100 }],   // stor, toppen utanför bild
  pepparkakshus: [1590, 940, { h: 460 }],   // lite större och lägre. Inte framför gången och inte högre: figuren hoppar över takets topp för att gömma sig, och då blev hoppet jättestort
},
nara: [                                   // snö i förgrunden (parallax), utanför figurens väg
  { fil: 'assets/bakgrunder/julskogen-saker/snodriva.png',  x: 120,  y: 1095, h: 250 },
  { fil: 'assets/bakgrunder/julskogen-saker/snobuskar.png', x: 1960, y: 1095, h: 230 },
],
```

**Förgrundssakerna (2026-11-13, Sanna: "add some fg assets"):** `snodriva.png` (en snödriva utan träd; versionen med en liten gran lades bort, "too much with the gran i snö") och `snobuskar.png` (två snöiga buskar med röda bär och en sten). Gjorda i Flow (Nano Banana Pro, 0 krediter) med `rekvisita/snotuss` och `skogen-saker/buske.png` som stilreferenser. Original i `julskogen-saker/original/` (`snodriva-2*.jpeg`, `snobuskar-*.jpeg`). Utklippta genom att fylla bakgrunden från kanterna (den grå kritkanten stoppar), med bildens egen vita kant kvar: ca 5 px i bild.


## Ändringar 2026-11-13 (Sannas granskning av björnens film)

- **Varmare:** `julskogen.png` är omfärgad i kod. Himlen går från ljust blågrå överst till varm aprikos vid trädraderna, och snön är gräddvarm. Den kalla plattan från Flow ligger i `original/julskogen-kall.png`.
- **Säcken med paket** (`julskogen-saker/sack.png`) ersätter pakethögen ("paket kanske kan ligga i stor säck?"). Det är rekvisitans [`sack-paket`](../rekvisita/sack-paket.md) med kanten tunnad till 9 px. `pakethog.png` ligger kvar.
- **Granen är större**, h 960 i stället för 820. Toppen klipps lite i närbilderna.
- **Snöfall** (`sno: 60` i tittut.js): lätta flingor bakom sakerna och figuren.

## Platsljud

`assets/ljud/effekter/vinterljud/vinterljud-2.m4a`: mjuk, jämn vind, 60 s som går runt. Från klangfabrik på freesound (*winter wind 01c*), CC0, så ingen kredit behövs. Den första slingan (`vinterljud-1`, klankbeeld, CC BY) var mest bas och hördes knappt (Sanna 2026-11-13: "add subtle bg noise, winter outdoors loop").
