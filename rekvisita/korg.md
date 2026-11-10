# Korgen

Luddes picknickkorg, full av kanelbullar. Ljust halmgul, inte brun, så att bullarna syns mot den. Bullarna (`kanelbulle`, flera kopior) läggs i kod ovanpå korgens öppning, så att de sticker upp i en hög.

Används i: 007 Bruna sången, 016 Blinka lilla stjärna (Lage bär upp filten och nallen i den, `korg-v3-natt.png`).

```prompt
A small open picnic basket seen from the front, a simple rounded tub shape with one curved handle over the top, in light straw yellow wax crayon with a few simple woven crayon lines, empty, very minimal and flat, no shading, no outline, only a thin chalky white rim, on a plain white background.
```

**Korgen i art direction v2 (2026-11-08, Sanna: "new korg too for picnic scene"; saknas än):** ersätter `korg-v1.png` i `angen`. Samma form och samma 1024-ruta (öppningen är en bred oval runt y 470, handtaget över), så att bullarna och framkantsklippet (`korgfram` i `angen/index.html`) passar. Spara som `assets/rekvisita/korg/korg-v2.png`, klipp med `verktyg/egen_kant.py`. Nano Banana 2, image2image, 2K: bild 1 = `cut/korg-v1.png` (formen), bild 2 = `assets/rekvisita/kola/cut/kola-karamell-v2.png` och bild 3 = `assets/bakgrunder/skogen-gron-saker/svamp.png` (v2-stilen).

```prompt
Image 1 is the design reference: the same small open picnic basket seen from the front, same rounded tub shape, same wide oval opening and the same single curved handle arching over the top. Images 2 and 3 are the STYLE references: copy their premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, bold flat colours, NO dark outlines, and a clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker. Redraw the basket in that style: light golden straw yellow with a simple, tidy woven pattern of soft crayon strokes, a slightly lighter rim around the opening, and the inside of the opening a soft darker straw tone, empty. Very simple, chunky shapes for 2-year-olds, friendly, no cloth, no food. Fills the frame, centered, on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Vald v2 (2026-11-08):** Flow-tagning a → `assets/rekvisita/korg/cut/korg-v3.png` (i v1-korgens 1024-ruta: höjd 836, botten 928), används i ängen.

**Natt-versionen (2026-11-09):** `korg-v3-natt.png` = `korg-v3.png` med det vita hålet under handtaget urklippt, färgen varmare och mättare (honungsgul) och en ny jämn, tjock vit kant (30 px i 1024-rutan, mjukad) i stället för den ojämna (Sanna: "basket looks a bit jagged and old"). Behövs mot mörk eller färgad bakgrund. Ingen kant.js ovanpå.
