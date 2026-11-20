# Busshållplatsen

**Väggfärg:** purple `#8E44C9` · **Används till:** buss, bil, vänta på sin tur, resa · vinterversionen: 047 Katten åker buss

En hållplats där Bussen Bettan stannar.

```prompt
Two-zone picture: a flat purple wall (#8E44C9) with grainy oil pastel texture filling the top two thirds, a straight horizon line, and a plain off-white floor (#FAF8F2) below. To one side: a round bus stop sign on a pole and a small simple bench on the floor, drawn with loose black crayon lines. A few white zebra-crossing stripes on the floor. Plenty of empty white floor in the middle for characters to stand on.
```

## Vinter, v2 (047)

Minimal och färgstark som mottagningen (Sanna 2026-11-20): kraftig blå himmel med kornig oljepastell, vit snö, en grå väg tvärs över, en gul hållplatsskylt med en vit buss och snö på toppen, en röd bänk med snö. Inget annat.

**Bild som används: `assets/bakgrunder/busshallplatsen/vinter/busshallplatsen-vinter-v1.jpg`** (1376×768, tagning B2, vald 2026-11-20). **Ingen målad snö i himlen** (Sanna: snöfallet animeras i kod), så flingorna är bortretuscherade lokalt (`cv2.inpaint`). Horisonten ca y 520, vägen ca y 588–648 (bussen kör där), trottoaren nedanför för katten, farmor och farfar. Samma platta i början och i slutet. Tagningar: `original/jamforelse.jpg` och `original/jamforelse-b.jpg`.

```prompt
Image 1 is a STYLE reference only: copy its bold, flat, minimal look exactly (one strong saturated colour filled edge to edge with dense grainy oil-pastel texture, very few objects, clean simple shapes, plain light ground), not its subject or colours. Background plate: a winter bus stop, wide 16:9, completely flat, static straight-on side view, no perspective, very minimal. The top part is one BOLD, saturated deep sky blue winter sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture. The bottom part, from about 62% of the image height, is plain flat bright white snow (#F7F8FA) with only the faintest grain, meeting the sky at one straight horizontal line. Across the snow, from about 66% to 76% of the image height, runs one plain flat grey road stripe (#9AA6B2) edge to edge. On the left, standing on the snow in front of the road, one round bold yellow (#F6C230) bus stop sign with a simple white bus shape on it, on a thin grey pole with a small snow cap, and next to it one small simple red (#E0412F) bench with a little snow on it. Nothing else. The whole middle and right of the picture is empty, with space for characters and a bus added later. No trees, no houses, no lanterns, no characters, no people, no animals, no vehicles, no text, no letters, no numbers, no shadows.
```
