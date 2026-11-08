# Äppelbacken

**Väggfärg:** teal `#2A8C7A` · **Golv:** backen gräsgrön `#4FA34A`, ett vitt golv `#FAF8F2` längst ner · **Används till:** refrängen i 013 Röda sången, rallyt "Upp på äppelbacken – sicksack mellan träden – studsa på äpplena – nerför backen"

Plats B i 013, i **art direction v2** ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md)), omgjord 2026-11-08. Den förra versionen (ljusblå himmel och en röd rutschkana) utgår. Refrängen är ett lugnt rally, och backen är banan: brandbilen kör alltid åt höger, så backen **stiger mjukt från vänster, har en lång platt topp i mitten och sluttar ner till höger**. Uppför, sicksack på toppen, nerför. Teal-väggen gör att de röda äpplena och den röda brandbilen lyser.

**Plattan och träden är var för sig.** Plattan har bara en blek rad små äppelträd långt bak, inbakade, så att det känns som en hel äppelbacke. De träd som brandbilen svänger mellan och som lutar sig i sicksacken är **egna urklipp** (äppelträdet nedan). Jätteäpplena att studsa på är `applet-rott` (`assets/rekvisita/applet-rott/cut/`), stort i en närbild.

Spara plattan i `assets/bakgrunder/appelbacken/appelbacken.png` och trädet i `assets/bakgrunder/appelbacken-saker/appeltrad.png`. Generera i 2K: närbilden på marken zoomar in.

**Klart 2026-11-08:** plattan är `appelbacken.png` (1920×1080, beskuren ur `original/appelbacken-a.jpg`, där den vita papperskanten runt väggen är bortklippt). `appelbacken-b.jpg` och den stående `appelbacken-staende.jpg` ligger kvar i `original/` som reserver. Träden finns i tre varianter i `appelbacken-saker/cut/`: **`appeltrad-mork.png` används** (mörkgrön krona, syns bäst mot den gröna backen), och `appeltrad.png` och `appeltrad-gulgron.png` är reserver.

Backens kant i 1920×1080 (x:y): 0:805 · 160:702 · 320:623 · 480:574 · 640:550 · 800:539 · 960:534 · 1120:538 · 1280:545 · 1440:557 · 1600:597 · 1760:671. Det vita golvet börjar på y ca 972.

I kod: brandbilens lutning uppför och nerför (följer backens kant), trädens lutning, de vita puffarna, mållinjen, klistermärkena och den röda glöden på kroken.

Används i: 013 Röda sången (refrängen, inte sista refrängen som står i discot).

```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top part is one flat, bold, saturated teal wall (#2A8C7A) filled edge to edge with a fine grainy wax-crayon texture: speckled paper grain and only a few very faint, thin, sparse diagonal crayon strokes in a teal just barely lighter than the wall, subtle, almost invisible from a distance. In front of the wall, one big soft grass green hill (#4FA34A) drawn in flat crayon with fine grain and a few faint lighter green strokes: it rises gently from the bottom left corner, has a long, wide, almost flat round top across the middle of the image at about 55% of the image height, and slopes gently down again to the bottom right, like a long low loaf. Along the very back of the hilltop, a single row of eight small, pale, simple apple trees, each a round light green crayon treetop (#8FC77E) with a few small soft red dots (#E2553A) on a short thin light brown trunk, evenly spaced, small and faded so they read as far away. A thin strip of plain white floor (#FAF8F2) along the very bottom edge. Slightly rough hand-drawn edges. Nothing else. Bold, simple, flat, cheerful, lots of empty grass for driving on. No big trees in front, no path, no road, no fence, no characters, no vehicles, no sun, no clouds, no shadows, no text.
```

**Äppelträdet** (urklipp, flera i bild, lutar sig i sicksacken). Nano Banana 2, image2image med bild 1 = `assets/stiltest-premium/cut/egen/trad.png` (v2-trädet) som stil- och formreferens:

```prompt
Image 1 is the reference for STYLE and SHAPE: keep the same simple toddler-cartoon tree, the same single round lollipop crown, the same straight brown crayon trunk a little wider at the bottom, the same flat wax-crayon technique (one even crayon fill with fine paper grain and soft scratchy crayon strokes, no shading, no dark outline) and the same thick clean even white sticker border. ONLY change: turn it into an APPLE TREE full of apples. Add seven or eight plump round red apples (#E2553A) spread evenly over the green crown, each a simple round red crayon ball with a tiny brown stem and one small green leaf, clearly visible from far away, none hanging below the crown. No apples on the ground, no grass, no shading, no highlights. Flat like a child's drawing. Centered, fills the frame top to bottom, pure solid white background, no ground, no shadow, no text.
```
