# Skogen grön

**Väggfärg:** gräsgrön `#5DB85C` · **Används till:** Tittut i art direction v2 (Kaninen Kanel i skogen, omgjord)

Skogen i art direction v2 (`stil/art-direction-v2.md`): en kraftig grön vägg med kornig oljepastell och några ljusa kritstreck, och ett vitt golv. Bakom scenen står två rader bleka träd (v2-trädet, inbakade i plattan) så att det känns som en skog. Gömställena är **egna urklipp**, så att Kanel kan ligga bakom dem och sticka fram. Förgrunden är bara två grästuvor.

Spara bakgrunden i `assets/bakgrunder/skogen-gron/` och gömställena i `assets/bakgrunder/skogen-gron-saker/`.

```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top two thirds is one flat, bold, saturated grass green wall (#5DB85C) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture: fine speckled paper grain plus a few loose, light, thin diagonal scratchy crayon streaks and scribbles in a slightly lighter green, like hand-coloured paper. The bottom third is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 68% of the image height. Nothing else. Bold, simple, flat, cheerful, lots of empty space. No characters, no animals, no shadows, no text, no letters.
```

**Bilder (2026-11-07):**

| Fil | Vad |
|---|---|
| `assets/bakgrunder/skogen-gron/skogen-gron.png` | plattan, 2752×1536, med två trädrader bakom (Sanna 2026-11-07, upplägg B) |
| `assets/bakgrunder/skogen-gron/skogen-gron-tom.png` | plattan utan träd (= `assets/stiltest-premium/skogen-gron-utan-trad-a.png`) |
| `assets/bakgrunder/skogen-gron/skogen-gron-forgrund.png` | förgrunden, samma mått, genomskinlig: två grästuvor nere i hörnen, den högra speglad |
| `assets/arkiv/bakgrunder/skogen-gron-saker/buske.png` | busken (`stiltest-premium/cut/egen/buske.png`), kant 7,3 px i filen |
| `assets/bakgrunder/skogen-gron-saker/sten.png`, `stock.png` | stenen och stocken (B-tagningarna, `original/sten-b.png`, `stock-b.png`), kant 24 och 25 px i filen |
| `assets/bakgrunder/skogen-gron-saker/svamp.png` | jättesvampen (`original/svamp-rod-a.png`), kant 10,9 px i filen (940 px hög i bild) |
| `assets/bakgrunder/skogen-gron/test-plats.jpg` | provbild: platta, förgrund, busken och rutor för de andra sakerna och Kanel |

- **Golvlinjen** ligger på y ≈ 816 i 1920×1080 (1160 av 1536 i plattan, ca 75 %). Fotpunkterna ska ligga under den.
- **Grästuvorna** är 180 px höga i 1920×1080, fötterna vid x 105 och 1815, y 1078. De ligger under alla gömställen och skymmer dem aldrig. Kanten sattes med `tunn_kant.py 15.5` på `gras.png` (5 px i scenen).
- **Busken** visas 345 px hög (ca 540 bred). Kanten är `tunn_kant.py 7.3`, alltså ca 5 px i scenen. Den täcker Kanel utan öron (300 px). Öronen sticker upp ovanför och döljs av motorn när hon sjunker in bakom.

**Trädraderna** (inbakade i plattan, från `stiltest-premium/cut/egen/trad.png`): bakre raden 360–440 px hög, tonad 62 % mot ljusgrönt; främre raden 520–580 px, tonad 45 % mot mörkgrönt, varannan speglad. Fötterna på golvlinjen. Plattan utan träd finns kvar som `skogen-gron-tom.png`.

**Jättesvampen** (Nano Banana 2, image2image, bild 1 = v1 `kanel.png` som stilreferens):

```prompt
Image 1 is a STYLE reference only: copy its wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading), not its subject. Draw ONE very simple, friendly, giant toddler-cartoon mushroom: a big round dome cap in flat warm red crayon (#E0533D) with five or six soft round cream-white spots, on a very thick, chunky, straight cream stem (#F3E6CC) that is wide and a little wider at the bottom, like a cosy little tower. The stem is wide enough for a small animal to hide fully behind it. Cap about as wide as the whole picture, stem about half the cap width. Only a very faint slightly darker crayon edge under the cap. No gills, no frills, no grass, no shading, no highlights, nothing creepy. Flat like a child's drawing. A thick clean white sticker border all around the whole mushroom, slightly hand-cut. Centered, fills the frame top to bottom, pure solid white background, no ground, no shadow, no text.
```

Svampen visas 940 px hög, så att foten (ca 420 px bred) döljer Kanel med armarna (ca 407 px). Hatten går lite ut ovanför bilden. Den räknas som hög sak: hon går in från sidan och tittar fram vid foten.

Fotpunkter för Tittut, upplägg B (1920×1080): stenen längre bak, svampen hög i mitten, stocken nära kameran framför gången.

```js
start: [1770, 1000],
saker: {
  sten:  [330, 860, { h: 330, farg: '#A8A39B' }],
  svamp: [820, 895, { h: 940, farg: '#E0533D' }],
  stock: [1270, 1050, { h: 330, farg: '#A85A2A' }],
},
```

Busken ligger kvar i `skogen-gron-saker/` men används inte i upplägg B.

**Blåbärsbusken** (lammets Tittut, 2026-11-07; saknas än): den färggranna saken i lammets skog, låg och bred så att lammet tittar upp över den och den kan skaka. Spara som `assets/bakgrunder/skogen-gron-saker/barbuske.png`. Nano Banana 2, image2image: bild 1 = v1 `kanel.png`, bild 2 = `skogen-gron-saker/svamp.png`, bild 3 = `skogen-gron-saker/buske.png` (stilreferenser).

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE very simple, friendly, round toddler-cartoon blueberry bush: a low, wide, puffy cloud-like bush made of a few big round lumps in flat deep green crayon (#3E8E4A), a little wider than it is tall, covered with many plump round blueberries in bright blue-violet crayon (#4A5FC8), each berry with a tiny lighter blue dot, in little clusters of two and three all over the bush. Bold, cheerful and a bit odd, the berries clearly visible from far away. No leaves drawn one by one, no stems, no grass, no shading, no highlights. Flat like a child's drawing. A thick clean white sticker border all around the whole bush, slightly hand-cut. Centered, fills the frame side to side, pure solid white background, no ground, no shadow, no text.
```

Hallonbusken i stället (samma prompt, byt mitten): `a low, wide, puffy cloud-like bush made of a few big round lumps in flat fresh green crayon (#4FA44A), covered with many plump round raspberries in bright raspberry pink-red crayon (#E2456A), each berry drawn as a small bumpy cluster of tiny round dots`.

**Hallonbusken, hög med djup** (Sanna 2026-11-07, vald framför den låga blåbärsbusken): putsad och hög, så att den räknas som hög sak som granen. Samma referensbilder.

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE friendly, polished toddler-cartoon raspberry bush, taller than it is wide (about 1.3 times as tall as wide), shaped like a soft rounded hill of big puffy leaf clumps stacked in three layers for depth: the back clumps at the top in a deeper, slightly cooler green crayon (#2F7A45), the middle clumps in fresh green (#4FA44A), and the front clumps at the bottom in a lighter, warmer leaf green (#7BC25A), each clump overlapping the one behind it so the bush feels round and full, with a gentle darker crayon edge where a front clump sits over a back one. Scattered across all three layers, many plump raspberries in bright raspberry pink-red crayon (#E2456A), each drawn as a small round cluster of tiny bumps with one tiny light pink highlight dot; berries on the back layer a little smaller and a touch darker, berries on the front layer bigger and brighter, so the bush has depth. A few small rounded leaf shapes with one soft vein line peek out at the edges. The base is wide, solid and flat at the bottom, with no gaps, dense enough for a small animal to hide fully behind it. No thorns, no stems, no grass, no ground, no cast shadow, no smooth digital gradients. Clean, bold, cheerful, simple enough for a toddler but carefully finished. A thick clean white sticker border all around the whole bush, slightly hand-cut. Centered, fills the frame top to bottom, pure solid white background, no text.
```

Visas ca 560 px hög (ca 430 bred): döljer hela lammet, som tittar fram vid sidan. Den låga blåbärsbusken ovan visas ca 380 px hög (ca 560 bred). Kanten ska bli ca 5 px i scenen (`tunn_kant.py`, som busken).

**Granen** (lammets Tittut, 2026-11-07; saknas än): den höga saken. V2-trädet i trädraderna har för smal stam för att lammet ska få plats bakom den, så granen har en tjock stam, som svampens fot. Spara som `assets/bakgrunder/skogen-gron-saker/gran.png`. Samma metod och referensbilder som bärbusken.

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE very simple, friendly, tall toddler-cartoon pine tree: three or four stacked soft rounded triangle tiers in flat deep pine green crayon (#2F7A4F), each tier with gently rounded tips, the lowest tier widest, and under it a very thick, chunky, straight warm brown trunk (#8A5A34) that is wide like a little tower, about a third as wide as the lowest tier and clearly visible below the branches for the bottom quarter of the tree, a little wider at the foot. The trunk is wide enough for a small animal to hide fully behind it. No needles drawn one by one, no cones, no grass, no shading, no highlights. Flat like a child's drawing. A thick clean white sticker border all around the whole tree, slightly hand-cut. Centered, fills the frame top to bottom, tall portrait shape, pure solid white background, no ground, no shadow, no text.
```

Visas ca 1150 px hög (toppen går ut ovanför bilden), så att stammen (ca 420 px bred i bild) döljer lammet med armarna. Den räknas som hög sak: lammet går in från sidan och tittar fram vid stammen.
