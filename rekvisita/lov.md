# Löven

Fyra enkla höstlöv i krita, platta urklipp med tunn vit kant och utan ansikte:

- **Det orange lövet** (`#F28C28`): stort, med fem rundade flikar som ett enkelt lönnlöv, ett kort brunt skaft och en mörkare orange mittnerv med tre korta sidonerver på varje sida. Det är kritans första teckning i 063 och siluetten på bokens bruna pärm.
- **Det röda lövet** (`#D2402F`): ovalt med spetsig topp och svagt vågig kant.
- **Det gula lövet** (`#F5C23A`): runt, med några mjuka rundade flikar.
- **Det bruna lövet** (`#9A6235`): ett ekblad med rundade vågiga flikar.

Alla har ett kort brunt skaft och en mittnerv i sin egen färg, lite mörkare. De har samma storlek och samma stil som det orange lövet.

Används i: 063 Hösten i boken. Kritan ritar det orange lövet på den kala eken, och trädet fylls av höstlöv. Det röda, gula och bruna lövet ligger på marken (barnet säger färgerna). Små kopior av alla fyra singlar ner som fallande löv och sitter på rävens huvud.

**Filer (grind 2, väntar på Flow-bilderna):**

- `assets/rekvisita/lov/original/`: Flow-tagningarna.
- `assets/rekvisita/lov/cut/lov-orange.png`: urklippt med `verktyg/egen_kant.py`, kanten tunnad till ca 1 % med `verktyg/tunn_kant.py`.
- `cut/lov-orange-kontur.json`: kritans teckning, gjord med `verktyg/kontur.py --mitt`. `detaljer` blir skaftet, mittnerven och två–fyra sidonerver, mätta ur bilden.
- `cut/lov-rott.png`, `lov-gult.png` och `lov-brunt.png`: urklippta ur arket med `egen_kant.py ark.png cut --ark lov-rott lov-gult lov-brunt`, med samma kant.

Google Flow (Nano Banana, 0 krediter). Det orange lövet görs först i 1:1. Bild 1 är `assets/rekvisita/sol-gul/cut/sol-gul.png` och bild 2 är `assets/bakgrunder/skogen-gron-saker/svamp.png`, båda som stilreferenser.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE big single autumn leaf as a flat paper cut-out, very simple and childish like a toddler picture-book drawing: a bold warm orange (#F28C28) leaf with five soft, rounded points like a simple maple leaf, a short brown stalk (#8A5A34) at the bottom, and a slightly deeper orange-red (#E06A1E) crayon midrib with three short side veins on each side. The colour stays strong and solid. NO face, no other leaves, no branch, no text, no 3D, no shine, no gradients. A thick, clean, even white sticker border all around the whole leaf including the stalk. Centered, upright with the stalk at the bottom, fills about 75 percent of the frame, square 1:1, plain pure solid white background, no shadow.
```

Arket med tre löv görs i 16:9. Bild 1 och 2 är samma stilreferenser, och bild 3 är det orange lövet.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Image 3 is the leaf these must match in size, style and simplicity. Draw THREE separate single autumn leaves in one row, evenly spaced with plenty of white space between them so they never touch, each a flat paper cut-out, very simple and childish like a toddler picture-book drawing. Left: a bright red (#D2402F) leaf, a simple oval with a pointed tip and a softly wavy edge. Middle: a sunny yellow (#F5C23A) round leaf with a few soft rounded points. Right: a warm brown (#9A6235) oak-style leaf with rounded wavy lobes. Each leaf has a short brown stalk at the bottom and a slightly darker crayon midrib with two or three short side veins in its own colour. All three upright, about the same size. NO faces, no branch, no text, no 3D, no shine, no gradients. A thick, clean, even white sticker border around each leaf. Plain pure solid white background, no shadow.
```
