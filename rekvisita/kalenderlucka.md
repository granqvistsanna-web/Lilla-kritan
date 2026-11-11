# Kalenderluckan

En stängd lucka till julkalendern, sedd rakt framifrån: en varmt röd kritdörr (`#E23422`) som fyller hela bilden kant i kant, en lite mörkare röd panellinje (`#BF1F12`) med rundade hörn och en liten rund gul knopp (`#F6BE28`) till höger. Ingen siffra och ingen text: siffran ritas av koden i gräddvitt mitt på dörren. Ingen vit kant, ingen genomskinlig marginal, ingen skugga, inget perspektiv, eftersom kameran slutar med att luckan fyller hela 1920 × 1080-rutan och 24 små kopior ligger sida vid sida på [kalendertavlan](kalendertavla.md). Kornet är jämnt över hela ytan, utan stora kritstreck, så att kopiorna inte ser upprepade ut.

**I julkalendern (`produktion/youtube/julkalender-plan.md`):** koden (`produktion/youtube/shorts/jul/lucka.js`) lägger ut samma bild 24 gånger, ritar siffrorna och öppnar luckan genom att trycka ihop bilden i sidled.

**Mått i `assets/rekvisita/kalenderlucka/kalenderlucka.jpeg` (2720 × 1530 px, exakt 16:9; skala 0,7059 ger 1920 × 1080):**
- Panellinjen, ca 21 px tjock: överkant y 118–139, underkant y 1398–1417, vänster x 125–146, höger x 2573–2595. Hörnen är rundade: den övre linjen är rak mellan x 221 och 2505 (radie ca 95 px).
- Knoppen: mitt (2356, 768), alltså 86,6 % av bredden och 50,2 % av höjden, diameter 215 px (14 % av höjden). I en 1920 × 1080-ruta: mitt (1663, 542), diameter 152 px.
- Fri yta för siffran mellan panellinjens vänsterkant och knoppen: x 146–2249.
- Rött i alla fyra kanter, ingen ram att beskära.

Används i: julkalendern 2026, alla 24 luckor.

**Bild (2026-11-11, Google Flow, Nano Banana Pro, 16:9, uppskalad 2K, 0 krediter, godkänd av Sanna):** en tagning, `assets/rekvisita/kalenderlucka/original/kalenderlucka-1.jpeg` (2752 × 1536, som är 43:24). Beskuren till exakt 16:9 (16 px bort på var sida, 3 px uppe och nere) och sparad som `kalenderlucka.jpeg` (kvalitet 95, 4:4:4). Bild 1 = `assets/bakgrunder/skogen-gron/skogen-gron-tom.png` (kritytan), bild 2 = `assets/rekvisita/vaggskap/original/vaggskap-1.jpeg` (dörr och knopp). Inget urklipp behövs: bilden är en hel rektangel.

```prompt
Image 1 is a STYLE reference for the surface only: copy the dense, grainy wax-crayon and oil-pastel texture of its green wall (ignore its white floor and its colour). Image 2 is a STYLE reference for how a door's panel line and round knob are drawn in this picture-book look (soft, flat, no dark outline). Draw a flat, full-frame picture, wide 16:9, where the ENTIRE image from edge to edge is the front of ONE closed door seen exactly straight on: one flat, warm, bright red crayon surface (#E5302A) with an even, fine grainy wax-crayon texture running off all four edges of the image. There is no background, no wall, no door frame, no margin, no white border and no sticker border: only the red door surface. On the door, ONE inset panel line: a single rounded rectangle drawn as a soft crayon line in slightly darker red (#B5241E), about as thick as 2 percent of the image height, running parallel to the image edges at a distance of about 6 percent of the image height from each edge, with softly rounded corners. At the right, vertically centred, at about 89 percent of the image width, inside the panel line: ONE small round flat golden yellow knob (#F6C531) with a slightly darker golden crayon edge, about 10 percent of the image height across. The whole middle of the door is completely empty plain red. The texture is even all over, with no big streaks or scribbles. No number, no letters, no text, no keyhole, no hinges, no wreath, no window, no planks, no second panel, no shadow, no shine, no highlight, no 3D, no perspective, no vignette.
```
