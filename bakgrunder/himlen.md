# Himlen

**Väggfärg:** sky blue `#4FB3E8` (hela bilden, inget golv) · **Används till:** flygplan, fjäril och humla i luften

Bland molnen där Flygplanet Pella flyger. Den enda platsen utan golv.

```prompt
The whole picture is a flat sky blue (#4FB3E8) with grainy oil pastel texture, no floor. A few big fluffy white crayon clouds of different sizes and a small yellow sun. Plenty of open sky for something flying.
```

## Art direction v2 (011, 2026-11-08, saknas än)

**✅ Klar 2026-11-10:** plattan `assets/bakgrunder/himlen/himlen-v2.png` (2752×1536), arket i `himlen/original/moln-ark.png`, urklippen i `assets/bakgrunder/himlen-saker/` (`moln-stort`, `moln-mellan`, `moln-litet`, `moln-langt`). Molnen ligger på grått, så de klipptes mot bakgrundsfärgen i stället för med `egen_kant.py`.

Hela bilden är himmel, men molnen och solen är egna urklipp (som träden i Skogen grön), så att de kan glida förbi när helikoptern flyger. Nano Banana 2, 2K.

**Plattan** (text2image, 16:9) → `assets/bakgrunder/himlen/himlen-v2.png`:
```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The whole picture is one flat, bold, saturated sky blue (#4FB3E8) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture: fine speckled paper grain plus a few loose, light, thin diagonal scratchy crayon streaks in a slightly lighter blue, like hand-coloured paper. No floor, no horizon, no clouds, no sun. Nothing else. Bold, simple, flat, cheerful. No characters, no shadows, no text, no letters.
```

**Molnen** (image2image, 1:1, bild 1 = `assets/bakgrunder/skogen-gron-saker/svamp.png` som STILREFERENS) → ett ark, klipps med `verktyg/egen_kant.py ark.png utmapp --ark moln-stort moln-mellan moln-litet moln-langt`:
```prompt
Image 1 is a STYLE reference only: copy its premium toddler picture-book look exactly (neat soft wax crayon and oil pastel, fine paper grain, no dark outline, no shading), not its subject. A sheet with four separate simple fluffy clouds in a 2x2 grid, each made of three to five round puffs with a flat-ish bottom, filled with a soft very light grey-white crayon (#F4F7FA) with faint light blue-grey crayon strokes so it shows on white, each with its own thick clean, even white sticker border and lots of space between them: one big, one medium, one small, one long and low. Flat like a child's drawing. Pure solid light grey background (#D9DEE3) so the white clouds and borders can be cut out, no shadow, no text.
```
