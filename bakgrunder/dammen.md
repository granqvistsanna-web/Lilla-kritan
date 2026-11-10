# Dammen

**Väggfärg:** turquoise `#2BB7A6` · **Används till:** groda, vatten, vattenpölar, regn

Grodan Gurras hem. Här plaskar man.

```prompt
Two-zone picture: a flat turquoise wall (#2BB7A6) with grainy oil pastel texture filling the top two thirds, a straight horizon line, and a plain off-white floor (#FAF8F2) below. On the floor: a flat blue oval pond with two round green lily pads and one pink water lily, a few tall reeds at the edge, drawn like a child's drawing. Plenty of empty white floor in the middle for characters to stand on.
```

## Art direction v2 (011, 2026-11-08, saknas än)

**✅ Klar 2026-11-10:** plattan `assets/bakgrunder/dammen/dammen-v2.png` (2752×1536), arket i `dammen/original/dammen-saker-ark.png`, urklippen i `assets/bakgrunder/dammen-saker/` (`damm`, `blad`, `nackros`, `vass`). Arket har papperskorn, så det gjordes vitt först (min > 238 och grått → 255) innan `egen_kant.py --ark`, annars blev allt en bit.

Som Skogen grön i v2: plattan är bara vägg och golv, dammen och vassen är egna urklipp. Då kan näckrosbladen bli egna lager (Gurra hoppar på tre blad, hatten flyter på det tredje). Nano Banana 2, 2K.

**Plattan** (text2image, 16:9) → `assets/bakgrunder/dammen/dammen-v2.png`:
```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top two thirds is one flat, bold, saturated turquoise wall (#2BB7A6) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture: fine speckled paper grain plus a few loose, light, thin diagonal scratchy crayon streaks and scribbles in a slightly lighter turquoise, like hand-coloured paper. The bottom third is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 68% of the image height. Nothing else. Bold, simple, flat, cheerful, lots of empty space. No characters, no animals, no shadows, no text, no letters.
```

**Dammen, bladen och vassen** (image2image, 1:1, bild 1 = `assets/bakgrunder/skogen-gron-saker/svamp.png` som STILREFERENS) → ett ark, klipps med `verktyg/egen_kant.py ark.png utmapp --ark damm blad nackros vass`:
```prompt
Image 1 is a STYLE reference only: copy its premium toddler picture-book look exactly (neat soft wax crayon and oil pastel, fine paper grain, bold flat colours, no dark outline, no shading), not its subject. A sheet with four separate simple things in a 2x2 grid, each with its own thick clean, even white sticker border and lots of white space between them: top left, a wide, low, flat blue pond (#5AA9E6) seen straight from the front as one long soft oval, a few lighter blue crayon streaks, nothing on it; top right, one round flat green lily pad (#4FA34A) with a small wedge-shaped notch, a little lighter green vein; bottom left, one simple pink water lily with pointed petals and a yellow centre; bottom right, a small clump of five tall thin green reeds with two brown cattail tips, flat bottom. Flat like a child's drawing, chunky shapes for 2-year-olds. Pure solid white background, no ground, no shadow, no text.
```
