# Julborsten

Samma tandborste som [tandborsten](tandborsten.md) (sidovy, liggande, huvudet till vänster), men som en polkagris: skaftet i diagonala ränder i julrött (`#C8372D`) och varmvitt (`#F4EFE6`), halsen röd, borsten vit med ljusblå topp (`#BFE3F2`), och ett litet grönt granris med två röda bär och en röd rosett knuten vid halsen. Ren fyllning med svagt kritkorn och vit klistermärkeskant.

**I julborstasången (038):** alla tre borstarna är samma bild, där färgen byts i kod (Sanna 2026-11-14: "xmas version of toothbrushes"): katten röd, kaninen grön (röd och grön kanal byter plats i filtret `#gron`, så granrisets färger byts också) och pandan blå (`hue-rotate(205deg)`). Borsten används överallt där 030 använder `tandborsten/cut/tandborsten.png`. Samma mått (877 × 238) så att scenens kod är orörd.

**Bild (2026-11-14, Google Flow, Nano Banana Pro, 0 krediter, stilreferenser `assets/rekvisita/tandborsten/cut/tandborsten.png` och `assets/rekvisita/tomteluva/cut/tomteluva.png`):** tre tagningar i `assets/rekvisita/tandborste-jul/original/`. Vald nr 1 (Claudes val). Utklippt med `verktyg/egen_kant.py` och en ny vit kant på ca 5 px lagd om fyllningen (`cut/tandborste-jul.png`, 880 × 227 på en 877 × 238 duk). **Kör inte `tunn_kant.py` på den:** de gräddvita ränderna och de vita borsten räknas då som kant och försvinner.

```prompt
Image 1 is the EXACT toothbrush to redraw: keep its shape, proportions, side view lying horizontally with the bristle head on the left, the same chunky rounded shaft, the same flat wax-crayon technique with fine crayon grain, no dark outline, and the same thick clean white sticker border. Image 2 is a style reference only (crayon technique and white sticker border). Change ONLY the colours and add one tiny detail to make it a Christmas candy-cane toothbrush: the shaft is painted with bold diagonal stripes in Christmas red (#C8372D) and warm white (#F4EFE6) like a candy cane, the neck is red, the bristles stay white with a light blue top (#BFE3F2), and a tiny green fir sprig with two small red berries is tied to the neck with a small red bow. Nothing else. No text, no shading, no 3D, no shine. Centered, the brush fills about 85 percent of the frame width, plain pure solid white background, no shadow.
```

Används i: 038 Borsta, borsta (jul).
