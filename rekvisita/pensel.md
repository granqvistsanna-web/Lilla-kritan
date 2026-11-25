# Penseln

En kort, knubbig barnpensel som ligger vågrätt, sedd från sidan: ett tjockt rundat skaft i ljust trä (`#E8B97E`, som pallen) med rundad ände till vänster, en kort ljust silvergrå hylsa (`#C9D2DA`, som kranen) i mitten, och en fyllig rund tofs som slutar i en mjuk spets till höger, doppad i klarröd färg (`#E8483B`). Ingen färg som droppar, inga stänk, inget ansikte.

**I 057 (Katten tvättar händerna):** ritintrot. Kritan ritar penseln i stället för katten (Sanna 2026-11-25): skaftet (två långa streck och den rundade änden), hylsan (en liten ring), sedan tofsen som ett eget drag. Den riktiga penseln fylls i inifrån, och den röda tofsen visar att någon har målat. Penseln används inte i scenen efter zoomen in.

**Konturen** mäts ur bildens kant när en tagning är vald (`verktyg/kontur.py`, skillen `kritan-ritar`), så att teckningen har samma form som bilden (se *Teckningen som bilden*).

**Urklippet:** `assets/rekvisita/pensel/cut/pensel.png` (1244 × 309), kanten tunnad till 3 px (ca 1 % av höjden, `tunn_kant.py 3`); det tjocka klippet ligger i `original/pensel-cut-tjock-kant.png`. Färgytan x 24–1220, y 24–285. Skaftet x 24–660 (rundad ände till vänster), **hylsan x 659–868, y 72–238**, tofsen x 859–1216, y 27–281, spetsen uppe till höger vid ca (1216, 95).

**Konturen:** `cut/pensel-kontur.json` (`verktyg/kontur.py --start vanster`, 59 punkter, en sluten bana runt hela penseln, start vid skaftets vänstra ände). Lägg till två korta egna drag vid hylsans kanter (x ≈ 662 och x ≈ 866, lodräta, inom konturen) så att skaft, hylsa och tofs går att läsa som pensel innan den fylls i (lärdomen *kännetecknen som egna drag*).

**Bild (2026-11-25, Google Flow, Nano Banana 2.1, 0 krediter):** stilreferenser `assets/rekvisita/handfatet/cut/handfatet.png` och `assets/rekvisita/pall/cut/pall-tunn.png`, 16:9. Tagning 3 av 4 vald (Sanna). Tagningarna och `jamforelse.jpg` i `assets/rekvisita/pensel/original/`, den valda kopierad till `assets/rekvisita/pensel/pensel.jpeg`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE short chunky children's paintbrush lying flat and horizontal, seen exactly from the side, very simple and childish: on the left a thick, rounded, slightly tapering handle in warm light wood (#E8B97E) with a rounded end, in the middle a short plain light silver grey metal band (#C9D2DA), and on the right a plump rounded bristle tuft that ends in a soft point, the tuft dipped in bright red paint (#E8483B) all over. The whole brush is about five times longer than it is tall. No drips, no paint splashes, no letters, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole brush. Centered, the brush fills about 70 percent of the frame width, plain pure solid white background, no shadow, no ground, no text.
```

Används i: 057 Katten tvättar händerna (ritintrot).
