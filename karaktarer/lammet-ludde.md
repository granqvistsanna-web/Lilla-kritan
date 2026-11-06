# Lammet Ludde

**Art:** lamm · **Status:** ✅ Referensark klart

## Utseende
- Form: en slät, lite sned äggform (huvud och kropp i ett), samma form som Hästen Hulda och Musen Mille. Två små hängande öron, små armstumpar och korta ben med mörka klövar.
- Färger: mjukt vitkrämig vaxkrita med några svaga ullkrusningar ritade i kritan, ljust rosabeige öron, gråbruna ben.
- Ansiktet sitter direkt på kroppen utan ansiktslapp: ögon och mun ritas i kod, och den rosa nosen finns i bilden. Väldigt minimal.
- Den förra versionen (ullklump med bågad kant och ullfritt ansikte) ligger i `v1/`.

## Personlighet
- Lugn och mysig. Gillar att vila, gosa och sjunga godnattsånger. Lite sömnig.

## Röst och repliker
- Röst: mjuk och långsam.
- Återkommande replik: *"Bä-ä-ä, vad mysigt!"*
- Ljud: bä-ä-ä, plingande bjällra.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/lammet-ludde/`](../assets/karaktarer/lammet-ludde/): framifrån, utan ansikte och kropp utan lemmar, utklippta i `cut/`. Vridpunkter i `ludde-rigg.json`. Ögonen sitter på ungefär (418, 402) och (606, 401) med radie 26, och munnen på (511, 466), ungefär 60 px bred. `ludde-sover.png` är den sovande posen i kraftigare krita med krulliga ullslingor, med slutna ögon och mun i bilden (den släta versionen ligger i `v2/`). Han är nästan vit, så klipp ut honom med stor hålfyllnad (`cutout.py in.png ut.png 8 999999999`), annars blir ullen genomskinlig. `verktyg/delar.py` gör det automatiskt.

Godnattsagan ([`produktion/youtube/shorts/godnatt/lammet-ludde/`](../produktion/youtube/shorts/godnatt/lammet-ludde/manus.md)) använder `cut/ludde-faceless.png` stående och `cut/ludde-sover.png` liggande. I den liggande ritas öppna ögon på en ullfläck (#efe6d3) över bildens slutna ögon, (420, 697) och (606, 697), och tonas bort när han blundar.

## Prompt
```prompt
Image 1 (a horse) and Image 2 (a mouse) are STYLE and SHAPE references. A little lamb in that same style: ONE smooth, slightly lopsided egg-shaped body (head and body in one), soft white-cream wax crayon with grainy streaky texture, paper grain and a few faint loopy curl marks for wool, no black outline, a thin uneven white rim. Two small droopy pale pink-beige ears at the sides, tiny arm nubs, two short soft grey-brown legs with small dark hooves. Face directly on the body, no face patch: two round white eyes ringed in black with small black pupils, a tiny pink nose, a small happy smile. Very minimal.
```
