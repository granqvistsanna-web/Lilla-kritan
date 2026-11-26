# Gröna traktorn v2

Lovas traktor i Gröna sången v2 (014 omgjord i **art direction v2**, [`stil/art-direction-v2.md`](../stil/art-direction-v2.md)). Ersätter `traktor-gron-oppen` (v1) i v2-versionen. En liten rund leksakstraktor från sidan, **vänd åt höger**: kort rundad motorhuv fram med ett mörkgrått avgasrör, ett öppet gräddvitt kar med ratt på stång, ett stort mörkgrått bakhjul och ett litet framhjul med ljusgrå nav, och ett platt grönt tak på två ljusgrå stolpar med öppna sidor. Gräsgrön (`#3FA34D`), inget ansikte, inga konturer, jämn vit klistermärkeskant.

Lova sitter i karet som Kanel i v2-bilen: syns från midjan och upp, armarna fria mellan stolparna.

Gjord av Sanna (2026-11-26). Bilden ligger i `assets/rekvisita/traktor-gron-v2/original/traktor-gron-v2.jpg` (1200 × 896, kopian från chatten; lägg gärna originalet i 2K bredvid). Delar klipps som v2-bilen: alla ur **en** bild, kanten läggs på hela traktorn innan den delas (baksida med ratt, framsida framför Lova, hjulen som cirklar, tak och främre stolpe framför Lova, bakre stolpe bakom).

Används i: 014 Gröna sången v2.

```prompt
Image 1 is the reference for STYLE, BUILD and SEAT: keep its flat wax-crayon technique EXACTLY (one even crayon fill with fine paper grain and visible soft scratchy crayon strokes, no shading, no dark outline), its thick even white sticker border, and its big open cream-coloured cockpit with low edges and the steering wheel on its column, so a driver sits inside showing from the waist up with free arms. Image 2 is the reference for SHAPE only: a small round toy tractor. Draw one small round toy TRACTOR seen exactly from the side, FACING RIGHT, that a two-year-old recognises at once: a short rounded bonnet at the front on the right with one short thin dark grey exhaust pipe sticking straight up, the open cream cockpit behind it, one VERY BIG round dark grey back wheel under the seat and one SMALL round dark grey front wheel under the bonnet, both with a round light grey hub. Over the cockpit a simple flat green roof held up by two thin straight light grey posts, one at the back of the seat and one at the front: no doors, no windows, no glass, completely open sides. Bright grass green body (#3FA34D). Very simple, bold and cute, like a premium toddler picture-book illustration. The cockpit is empty, no driver. No face, no eyes, no text, no numbers, no logos, no yellow rims. Centered with space around, pure solid white background, no shadow, no ground.
```

```delar
tractor body (back with steering wheel), front panel, roof with front post, back post, front wheel, back wheel
```

**Sätet är för trångt (2026-11-26, första provet i vägen):** leoparden får plats bara djupt nere mellan bakhjulet och motorhuven, så armarna syns aldrig (inte när hon vinkar eller hejar heller). Redigeringen nedan gör karet bredare och lägre, som v2-bilens, utan att ändra resten. Bild 1 = `original/traktor-gron-v2.jpg`, bild 2 = v2-bilen `assets/stiltest-premium/bil/hel-b.png` speglad (karets form).

```prompt
Edit image 1, keep everything else exactly the same: the same green crayon tractor facing right, the same roof on two posts, the same exhaust pipe, the same two wheels, the same colours, crayon texture and white sticker border. Only change the driver's area, using image 2 as the reference for its shape: make the open cream-coloured cockpit about TWICE as long and much lower, a wide low open tub like in image 2, starting right behind the big back wheel's top and ending well before the exhaust pipe, so the bonnet in front becomes shorter. The edge of the tub should be low, about level with the top of the big back wheel, so a driver sitting in it shows from the tummy up with both arms free over the edge. Keep the cockpit empty: no driver, no steering wheel. Move the front roof post forward so it stands at the front end of the longer cockpit. No face, no text, pure solid white background, no shadow, no ground.
```

**Löst 2026-11-26:** Sanna redigerade traktorn i Flow (brett, lågt krämvitt säte, ingen ratt, 1024 × 1024). Den nya bilden är `original/traktor-gron-v2.jpg`; den gamla ligger kvar som `original/traktor-gron-v2-trangt-sate.jpg`. Delarna (`cut/`: bak = sätet, stolparna och avgasröret; fram = karet under sätets kant, huven och taket; två hjul) görs med `cut/klipp-traktor.py`, måtten står i `traktor-gron-v2-rigg.json`. I 014 v2: traktorn i skala 1,0, Lova i skala 0,476 med fötterna i (497, 650); vinkande och hurra-armar syns.
