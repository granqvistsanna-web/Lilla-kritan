# Lammet Ludde

**Art:** lamm · **Status:** ✅ Referensark klart

## Utseende
- Form: en enda rund ullklump (huvud och kropp i ett) med mjuka bubblor i kanten, ett ullfritt ansikte, två små hängande öron, små armstumpar och korta ben med klövar.
- Färger: varm gräddvit ull (`#EFDDB4`) i kraftig vaxkrita, ljust persikofärgat ansikte (`#F2D2BE`), kakaobruna öron, armar och ben (`#8C6A5A`).
- Kännetecken: ansiktet som tittar fram ur ullen. Väldigt minimal: ingen bjällra, inga krullar.

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

Bilderna ligger i [`assets/karaktarer/lammet-ludde/`](../assets/karaktarer/lammet-ludde/): framifrån, utan ansikte och kropp utan lemmar, utklippta i `cut/`. Vridpunkter i `ludde-rigg.json`. Ögonen sitter på (413, 401) och (604, 398) med radie 26, samma som Kanel. Han är nästan vit, så klipp ut honom med stor hålfyllnad (`cutout.py in.png ut.png 8 999999999`), annars blir ullen genomskinlig. `verktyg/delar.py` gör det automatiskt.

## Prompt
```prompt
Ludde the lamb: one big slightly lopsided round woolly blob (body and head in one) with a gently scalloped edge of soft round bumps, warm cream (#EFDDB4) heavy streaky wax crayon with paper grain, a smooth pale peach (#F2D2BE) wool-free oval face framed by the wool, two round white eyes ringed in black with small black pupils, a tiny pink nose, two small droopy cocoa-brown (#8C6A5A) ears, tiny cocoa arm nubs, two short cocoa legs with small hooves, no outline, a thin uneven white rim. Very minimal: no bell, no curls, no marks.
```
