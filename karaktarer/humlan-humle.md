# Humlan Humle

**Art:** humla · **Favoritsak:** humla 🐝 · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-08):** gjord som Pip ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`), först i 005:s disco. Riggen ligger i [`assets/karaktarer/humlan-humle/premium/`](../assets/karaktarer/humlan-humle/premium/): kropp, antenner, vingar, armar och ben i `cut/`, vridpunkter i `humle-rigg.json`, uttryck och poser i `uttryck.html` (`?ark=poser`, `?rorelse=surra`). Konsten är gjord i Flow med v1-humlan som bild 1 och `pip-platt.png` som stilreferens: `premium/original/humle-platt.png` (med ansikte), `humle-faceless.png` och `humle-body.png` (896 × 1200, utfyllda till kvadrat och 1024). Delarna klipptes ur ansiktslösa bilden med delar.py-logiken men egna namn (antenn, wing, arm, leg). Armarna är korta ritade stumpar i kroppens gula krita (rot (240, 566) och (784, 566)), antennernas och vingarnas vita kantremsa mot kroppen är bytt mot en rot i deras egen färg inne i kroppen, så att inget vitt streck syns när de lutar. Alla delar har 10 px vit kant (`tunn_kant.py`). Antennerna rör sig som öron (`oron`, halva vinkeln), vingarna surrar med posens `vinge` (grader). Utseendet nedan är v1.
>
> **Ansikte (v2), allt i kod:** ögon (411, 403) och (612, 403), rx 20, ry 28; kinder (361, 459) och (662, 459), rx 34, ry 21; leendet 487–539 vid y 438. Öppen mun: en mörk ellips (448) som tar över leendet. FOTTER 925.

## Utseende
- Form: rund som en boll, nästan för stor för sina små vingar.
- Färger: solgul (`#FFD23F`) med tre tjocka mörkbruna ränder, genomskinligt ljusblå vingar.
- Kännetecken: luddig kant (kritstreck runt om) och en liten ryggsäck fylld med pollen.

## Personlighet
- Flitig, snäll och lite klumpig. Krockar ibland med blommor.
- Bästa vän med Fjärilen Fia.

## Röst och repliker
- Röst: djup, mullrande och gosig.
- Återkommande replik: *"Bzzz! Nu ska jag hjälpa till!"*
- Ljud: surrande bzzz som blir starkare när han flyger fort.

## Cut out-delar
```delar
round striped body with head, front wing, back wing, pollen backpack, front leg, back leg, eyes closed, mouth open
```

## Prompt
```prompt
Humle the bumblebee, a very round fuzzy bumblebee shaped almost like a ball, sunshine yellow (#FFD23F) with three thick dark brown stripes, fuzzy crayon-scribble edge all around, two small pale blue see-through wings that look a bit too small for him, a tiny orange pollen backpack, small black dot eyes and a big friendly smile.
```

## Art direction v2 (011, 2026-11-08, saknas än)

Görs som Pip (`lk-figur`), men Humle är ett litet djur och visas på SKALA 0,2: kanten blir ca 25 px i filen. Nano Banana 2, image2image, 2K, 1:1. Bild 1 = `assets/karaktarer/humlan-humle/humlan-humle.png` (v1), bild 2 = `assets/karaktarer/kycklingen-pip/premium/original/pip-forsta.jpg` (v2-stilen). Spara i `assets/karaktarer/humlan-humle/premium/original/`, därefter utan ansikte och bara kroppen som Agdas steg 3–4 (vingar, ben och ryggsäck bort).

```prompt
Image 1 is the character reference: the same little bumblebee (same design, colours and proportions: a round ball-shaped sunny yellow #FFD23F body with three thick dark brown stripes, small light blue see-through wings, a tiny pollen backpack). Image 2 is a STYLE reference only: copy its premium toddler picture-book wax-crayon technique, flat even colour and thick white sticker border, not its subject. Redraw the bumblebee in that style, neat and controlled, flat even crayon colour with fine paper grain, no 3D shading. ONE round ball body, slightly lopsided, the stripes as soft flat crayon bands. NO dark outline: a THICK, clean, even, smooth white sticker border all around. CUTE FACE: two medium black oval eyes each with one tiny white shine dot, soft pink round blush cheeks and a small happy smile, on the top yellow part. Two short antennae with round tips. BUILT FOR CUT-OUT ANIMATION: two small rounded pale blue wings on the back, held up and clearly apart from each other and from the body outline at the top, two tiny stubby arms with a gap, two tiny stubby legs apart, a small round tan pollen backpack peeking out at one side. Facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```
