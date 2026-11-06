# Zebran Zebbe

**Art:** zebra · **Status:** ✅ Referensark klart

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), samma form som Hästen Hulda, två små spetsiga öron, en kort upprätt man, korta ben och en tunn svans med en svart tofs.
- Färger: gräddvit (`#FAF6EE`) med tjocka svarta (`#1E1A18`) krafsiga ränder, svart man och svarta hovar, ljust gråbeige mule.
- Kännetecken: ränderna. Ränderna går runt kroppen, inte rakt över ansiktet, så att ögonen syns.

## Personlighet
- Glad och sprallig. Galopperar gärna i cirklar och räknar sina ränder.

## Röst och repliker
- Röst: ljus och pigg.
- Återkommande replik: *"Ränder, ränder, ränder – titta på mig!"*
- Ljud: klippetiklopp, ett glatt frustande gnägg.

## Cut out-delar
```delar
body without arms and legs, mane, left arm, right arm, left leg, right leg, tail (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/zebran-zebbe/`](../assets/karaktarer/zebran-zebbe/): `zebran-zebbe.png` (vald variant v1, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `zebran-zebbe-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `zebran-zebbe-v*.jpeg`. Kropp utan lemmar och rigg görs med `verktyg/delar.py` när figuren ska animeras.

## Prompt
```prompt
Zebbe the zebra, ONE smooth, slightly lopsided egg-shaped body (head and body in one), creamy white (#FAF6EE) wax crayon with grainy streaky texture and paper grain, thick scribbly black (#1E1A18) crayon stripes wrapping around the body but leaving the face clear, no black outline, a thin uneven white rim. Two small pointed ears, a short black upright mane on top, a light grey-beige muzzle with two small nostrils, tiny arm nubs, two short stubby legs with black hooves, a thin tail with a black tuft. Face directly on the body: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```

## Pose: ligger och sover (Godnattsagan)
Zebbe ligger på magen som en låg, rund limpa, framifrån, med frambenen under hakan och svansen runt sidan. Utan ansikte: ögonen (428, 505) och (598, 505), radie 25, och munnen (512, 735) ritas i kod, så att han kan blunda och somna. Punkten mellan hovarna är (512, 862) i 1024-rutan. Ändrar inte figuren.

Bilden: `assets/karaktarer/zebran-zebbe/ligger/zebran-zebbe-ligger.png` (Google Flow, Nano Banana, 0 krediter, 2026-11-06, variant 2; den vita bakgrunden bortklippt och kanten gjord om till en jämn vit klistermärkskant, 1 % av höjden). Originalen ligger i `ligger/original/`. Bild 1 = `zebran-zebbe-faceless.png`, bild 2 = `lammet-ludde/ludde-sover.png` (bara posen).

```prompt
Image 1 is Zebbe the zebra: keep him EXACTLY the same character and drawing style: the same smooth, slightly lopsided egg-shaped body, the same creamy white (#FAF6EE) wax crayon with grainy streaky texture and paper grain, the same thick scribbly black (#1E1A18) crayon stripes wrapping around the body but leaving the face clear, the same two small pointed ears, the same short black upright mane, the same light grey-beige muzzle with two small nostrils, the same black hooves, the same thin tail with a black tuft, no black outline, a thin uneven white rim around him. Keep him faceless: NO eyes, NO mouth, only the muzzle and nostrils. Image 2 is a POSE reference only (do not copy the lamb): ONLY change the pose: Zebbe lies down on his tummy on the ground, seen from the front, body flattened into a low wide round loaf, head resting low on top with the mane and ears, two short front legs stretched forward under his chin with black hooves, two back legs peeking out at the sides, the tail curled around the side. Cosy, sleepy, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```
