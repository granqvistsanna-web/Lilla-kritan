# Kon Kajsa

**Art:** ko · **Status:** ✅ Referensark klart

> **Art direction v2 (Sanna, 2026-11-08: "we need new cow"; saknas än):** kon görs om i v2 som Lage, med skillen `lk-figur`. Prompterna (första tagningen, plattare, utan ansikte, bara kroppen) står i [`assets/karaktarer/kon-kajsa/premium/prompter.md`](../assets/karaktarer/kon-kajsa/premium/prompter.md): bild 1 = v1-kon, bild 2 = Lage v2 som form och stil. Hornen, mulen och koskällan hör till kroppen, mulen lyfts ut som nosfläck. v1-bilderna är orörda och utseendet nedan är v1 tills v2 är godkänd.

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), samma form som Hästen Hulda, två små öron åt sidorna, två korta rundade horn, korta ben och en tunn svans med en tofs.
- Färger: gräddvit (`#FAF6EE`) med några stora mjuka svarta (`#1E1A18`) fläckar, ljusrosa (`#F4B6B0`) mule, gula horn.
- Kännetecken: den stora rosa mulen och en liten koskälla i ett rött band runt halsen.

## Personlighet
- Lugn, snäll och lite långsam. Tuggar gräs och tycker om att lyssna när de andra sjunger.

## Röst och repliker
- Röst: djup, mjuk och mysig.
- Återkommande replik: *"Muu! Vad mysigt!"*
- Ljud: muu, plingande koskälla.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, tail, cowbell (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/kon-kajsa/`](../assets/karaktarer/kon-kajsa/): `kon-kajsa.png` (vald variant v2, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `kon-kajsa-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `kon-kajsa-v*.jpeg`. Kropp utan lemmar och rigg görs med `verktyg/delar.py` när figuren ska animeras.

## Prompt
```prompt
Kajsa the cow, ONE smooth, slightly lopsided egg-shaped body (head and body in one), creamy white (#FAF6EE) wax crayon with grainy streaky texture and paper grain, a few big soft black (#1E1A18) patches, no black outline, a thin uneven white rim. Two small ears sticking out at the sides, two short rounded yellow horns on top, a big light pink (#F4B6B0) muzzle with two small nostrils, a little golden cowbell on a red band, tiny arm nubs, two short stubby legs with dark hooves, a thin tail with a black tuft. Face directly on the body above the muzzle: two round white eyes ringed in black with small black pupils and a gentle happy smile. Very minimal.
```

## Pose: med solhatten och bananen (011, förslag)
Kajsa står vid dammen med gula solhatten (`rekvisita/solhatt-gul.md`) och korgen full av bananer, och i vers 3 skalar hon en banan och delar den i tre bitar. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Ingen ny bild behövs.** Allt läggs ihop i kod när rigg finns (`verktyg/delar.py`, se 011 README "Behöver skapas"):
- **Hatten** sitter mitt på huvudet mellan hornen, hornen ligger bakom brättet och öronen sticker ut under. Utan hatten (när den har blåst iväg) syns hornen som vanligt.
- **Korgen** (`rekvisita/korg.md`) står på golvet bredvid henne med bananer (`rekvisita/banan.md`) i.
- **Skala bananen:** en banan i den ena tassen; skalet som fälls ner i tre flikar och de tre bitarna ritas i kod.
