# Bilderboken

En liten tjock pekbok, stängd och sedd rakt framifrån, i art direction v2: en rundad rektangel lite högre än bred med mjuka hörn, solgul pärm (`#F6C445`), en mörkare gyllene rygg längs vänsterkanten (`#E0A82E`) och krämvita tjocka sidkanter som syns till höger och nertill (`#F7F0E1`). Mitt på pärmen en liten platt morot med grön blast. Ingen text, inget ansikte. Ren fyllning med svagt kritkorn och vit klistermärkeskant.

**I 060:** kritan ritar boken bredvid kaninen på pottan (hjälpsaken, rad 10–11): konturen, ryggens streck och moroten, gisspaus, sedan fylls bilden i inifrån via `verktyg/kritan-ritar.js`. Kaninen håller den i tasspetsarna (posen `haller`). **Det öppna uppslaget ritas i kod:** två krämvita sidor med rundade hörn och en mittfåra, bilderna är urklipp som finns (moroten, pottan med kaninens riggbild liten ovanpå). Boken öppnas som två stela halvor, ett blad vänds genom att bredden krymper till ett streck och växer ut igen.

**Storlek i bild:** ungefär som kaninens huvud. Skalan sätts i scenen.

**Mått i urklippet `assets/rekvisita/bilderbok/cut/bilderbok.png` (636 × 735 px):**
- Vit kant 7 px (ca 1 % av höjden), satt med `tunn_kant.py 7`.
- Konturen: `cut/bilderbok-kontur.json` (`kontur.py --krymp 7 --mitt`), bbox [14, 13, 608, 708], mitt (317, 317), radie 297. Följer färgytans kant, i snitt 0,6 px avvikelse.
- Detaljstreck för kritan (mäts exakt när scenen byggs): ryggens kant lodrätt vid x ≈ 97 från y ≈ 25 till 665; moroten ca x 262–382, y 285–455; blasten ca x 329–409, y 219–294; sidkanten nertill längs y ≈ 668.

Används i: 060 Kaninen går på pottan.

**Bilder (2026-11-27, Google Flow, Nano Banana 2.1, 1:1, 0 krediter, stilreferens pottan v3 och toarullen):** fyra tagningar i `assets/rekvisita/bilderbok/original/bilderbok-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`. **Vald nr 4 (Sanna 2026-11-27).** Kopierad till `bilderbok.jpeg`, utklippt med `verktyg/egen_kant.py` (det tjocka klippet i `original/bilderbok-cut-tjock-kant.png`) och kanten tunnad till 7 px.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE small, chunky, closed children's board book seen exactly straight from the front, very simple and childish: a thick rounded rectangle a little taller than wide, with softly rounded corners. The cover is a warm sunny yellow (#F6C445). Along the left edge a slightly darker golden yellow spine strip (#E0A82E), about one eighth of the width. A thin cream-white (#F7F0E1) band of thick page edges peeks out along the right side and the bottom, showing the book is chunky. In the middle of the cover one small, simple picture of an orange carrot (#F08A2C) with a few green leaves (#5FA845) on top, drawn flat. No text, no letters, no title, no face, no pattern, no 3D, no shine, no shading, no outline. A thick, clean, even white sticker border all around. Centered, the book fills about 60 percent of the frame height, plain pure solid white background, no shadow, no ground.
```
