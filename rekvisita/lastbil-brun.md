# Bruna lastbilen

Bulles lastbil: en liten leksakslastbil med en hög rundad hytt med tak och ett stort öppet fönster där Bulle syns, en kort motorhuv fram och ett långt plankflak bak (brum, brum). Sedd från sidan med fronten åt höger, som bilen i 005 och båten i 006. Ljust brun (`#C9935A`) med mörkare streck, ljusare än Bulle (`#A0673A`) så att han syns i den. Inget ansikte och inga konturer.

Bulle sitter i hytten och syns i fönstret med ratten; kroppen är bakom karossen. En arm som är uppe sticker ut genom fönstret framför karossen. Hjulen klipps ut var för sig så att de kan snurra i kod. Flaggan är `flagga-rosa` omfärgad till grön i kod. Kotten kan landa på flaket.

Används i: 007 Bruna sången.

**Vald bild (Sanna, 2026-11-06):** v5 (b), `assets/rekvisita/lastbil-brun/cut/lastbil-brun-v5.png` (8 px kant, fönstret genomskinligt; hjulen (330, 732,5) och (873, 733,5), fönstret x 535–812, y 164–471 i bilden). Gjord med image2image från en exakt layoutskiss i lastbilens 1024-ruta (hjulen på HJUL, fönstret runt Bulles huvud och ratten) och v2 som stilreferens, efter skiss 2 "Hytt med tak". v5a är reserv. Förra valet v2 (öppet säte mellan två pucklar) ligger kvar, liksom v1, v3 och v4.

```prompt
A small brown toy truck seen exactly from the side, facing right, very minimal and childish like a toddler's crayon drawing, in mottled light warm brown wax crayon (#C9935A) with two slightly darker horizontal lines. One soft rounded body: a short rounded hood at the front with one round pale yellow headlight, a low open driver's seat with no roof and no windows in the middle, and a low open cargo bed at the back. Two big round dark grey wheels with a light grey dot in the middle, one under the hood and one under the cargo bed. No driver, no steering wheel, no face, no text, no outline, only a thin chalky white rim around the edge. Plain pure white background.
```

```delar
body in front of the driver (hood and the front of the seat), seat back and cargo bed behind the driver, front wheel, back wheel
```

Prompt v5 (image2image, Image 1 = layoutskissen, Image 2 = lastbil-brun-v2):

```prompt
Image 1 is the exact LAYOUT: redraw this truck keeping every shape in exactly the same place and size in the frame — the tall rounded cab with a roof and one big open window hole in the middle (the window is EMPTY, pure white background shows through it, no glass, no driver, no seat), the long open flatbed at the back with two horizontal plank lines and a darker corner post at each end, the short rounded hood at the front with two little grille lines, the round pale yellow headlight, the small dark bumper, the thin dark chassis strip, and the two big round dark grey wheels with light grey hubs in exactly the same positions. Image 2 is a STYLE reference only: copy its soft toddler wax crayon technique exactly — mottled grainy streaky light warm brown crayon fill (#C9935A) with visible paper grain, two faint darker crayon lines, no black outline anywhere, only a thin uneven chalky white rim around the outside edge and around the window hole. Very simple, bold, cute, slightly wobbly hand-drawn edges, for 2-year-olds. Seen exactly from the side, facing right. No driver, no face, no text, no shadow. Plain pure white background.
```

**Lastbilen i art direction v2 (2026-11-08, saknas än):** öppen, utan tak, så att Bulle sitter fritt bakom ratten och nallen syns på flaket. Nano Banana 2, image2image, 2K, bild 1 = `assets/stiltest-premium/bil/bil-a.png` (v2-bilen). Ett första försök utan vit kant, med tre hjulpar och lampor på stolpar, ligger i `assets/rekvisita/lastbil-brun/lastbil-brun-artv2.jpg`, och `scener/lager/gor-lastbil-v2.py` klipper in den i lastbilens 1024-ruta.

```prompt
Image 1 is the reference for STYLE and BUILD: the same flat wax-crayon technique (one even crayon fill with fine paper grain and soft crayon strokes, no shading, no dark outline), the same thick clean even white sticker border around the whole silhouette, the same chunky rounded toy-car body with an open driver's seat (cream inside, low front edge) and the same steering wheel on a short column. Turn it into a small TOY TRUCK that a two-year-old instantly recognises, seen exactly from the side and FACING RIGHT (the front with the headlight is on the right). Light warm caramel brown body (#C9935A), all one colour. NO ROOF and NO CAB: the driver's seat is completely open, empty, no driver, with the steering wheel on its short column at the front of the seat, nothing above or around it. A short rounded hood in front of the seat, lower than the top of the steering wheel. Behind the seat a long, low, open cargo bed with a cream inside, its top edge at the same low height as the seat's front edge, empty. One wide cream-white stripe along the whole side of the body, a light grey front bumper, one round yellow headlight on the front of the hood. Two big round wheels, one under the hood and one under the cargo bed, dark crayon with a light grey hub. Very simple, bold and cute, like a premium toddler picture-book illustration. No driver, no figures, no face, no eyes, no lamps on posts, no mirrors, no ladder, no text, no numbers, no logos. Centered with space around, pure solid white background, no shadow, no ground.
```
