# Leoparden Lova

**Art:** leopard · **Status:** ✅ Referensark klart

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), två små runda öron, korta ben och en lång svans som slutar i en krok.
- Färger: ljust sandgul (`#EFCB7A`) med mörkbruna (`#5A3A22`) prickar, ljust gräddvit mage och nos.
- Kännetecken: prickarna och den långa svansen. Ingen man (det är lejonets).

## Personlighet
- Snabb och glad. Springer fortast av alla och klättrar gärna upp i träd.

## Röst och repliker
- Röst: ljus och pigg.
- Återkommande replik: *"Vips! Där var jag!"*
- Ljud: ett litet morrande spinn, vips (när hon springer).

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, tail (2 positions) (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/leoparden-lova/`](../assets/karaktarer/leoparden-lova/): `leoparden-lova.png` (vald variant v1, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `leoparden-lova-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `leoparden-lova-v*.jpeg`. Kropp utan lemmar och rigg görs med `verktyg/delar.py` när figuren ska animeras.

## Prompt
```prompt
Lova the leopard, ONE smooth, slightly lopsided egg-shaped body (head and body in one), light sandy yellow (#EFCB7A) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. Simple dark brown (#5A3A22) crayon spots all over, a light cream tummy and muzzle with a small dark nose, two small round ears, tiny arm nubs, two short stubby legs, a long tail curling up at the end with a few spots. No mane. Face directly on the body: two round white eyes ringed in black with small black pupils and a big happy smile. Friendly, not scary. Very minimal.
```

## Pose: i brandbilen (013, förslag)
Lova sitter i röda brandbilens grunda öppna säte (`rekvisita/brandbil-rod.md`), syns från midjan och upp, tassarna på kanten. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Troligen behövs ingen ny bild.** Gör som i gröna traktorn i 014 (`assets/karaktarer/leoparden-lova/i-traktorn/`): kroppen och de ritade armarna ur `leoparden-lova-rigg-lemmar.json` läggs i brandbilens ruta mellan ryggstödet och framdelen, benen döljs bakom karossen, ansiktet ritas i kod och hjälmen läggs på i kod. En `i-brandbilen/`-mapp med samma sorts json räcker.

Bara om det ihopsatta inte ser bra ut: generera posen med image2image, Image 1 = `leoparden-lova-faceless.png`, Image 2 = brandbilens vald bild (stilen och sätet).

```prompt
Image 1 is Lova the leopard: keep her EXACTLY the same, same lopsided egg-shaped body, same light sandy yellow (#EFCB7A) wax crayon with grainy streaky texture, same dark brown (#5A3A22) spots, same cream tummy and muzzle with the small dark nose, same small round ears, same thin uneven white rim, and keep her faceless: no eyes, no mouth. Image 2 is the red toy fire engine, seen from the side facing right: keep it exactly the same. ONLY change: Lova sits in the fire engine's low open seat, facing the viewer, showing from the waist up above the low front edge, her two tiny arm nubs resting on the edge, her legs hidden inside the body, the tip of her curled tail peeking up behind the seat. No helmet, no steering wheel, no new details, no shadow, no text. Pure solid white background.
```

## Pose: ligger och sover (Godnattsagan)
Lova ligger på magen som en låg, rund limpa, framifrån, med framtassarna under hakan och den långa svansen med kroken runt sidan. Utan ansikte: ögonen och munnen ritas i kod, så att hon kan blunda och somna. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

Bilden: `assets/karaktarer/leoparden-lova/ligger/leoparden-lova-ligger.png` (Google Flow, Nano Banana, 0 krediter, 2026-11-06, variant 1; urklippt med en jämn vit klistermärkskant på 10 px, hålet mellan svansen och kroppen genomskinligt). Bild 1 = `leoparden-lova-faceless.png`, bild 2 = `lammet-ludde/ludde-sover.png` (bara posen). Originalen ligger i `ligger/original/`. Utan ansikte: ögonen (370, 600) och (542, 600), 1,35 gånger större än på den stående, och munnen (456, 738) ritas i kod. Fötterna står på (465, 862) i 1024-rutan.

```prompt
Image 1 is Lova the leopard: keep her EXACTLY the same character and drawing style: the same lopsided egg-shaped body, the same light sandy yellow (#EFCB7A) wax crayon with grainy streaky texture and paper grain, the same simple dark brown (#5A3A22) crayon spots, the same light cream tummy and muzzle with the small dark nose, the same two small round ears, the same long spotted tail with a hook at the end, no mane, no black outline, a thin uneven white rim around her. Keep her faceless: NO eyes, NO mouth, only the muzzle and nose. Image 2 is a POSE reference only (do not copy the lamb): ONLY change the pose: Lova lies down on her tummy on the ground, seen from the front, body flattened into a low wide round loaf, head resting low on top, two short front paws stretched forward under her chin with dark paw tips, two back paws peeking out at the sides, the long spotted tail curled around the side of her body with the hooked tip resting in front. Cosy, sleepy, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```
