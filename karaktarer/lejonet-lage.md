# Lejonet Lage

**Art:** lejon · **Status:** ✅ Referensark klart

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett) med en stor yvig man runt hela huvudet, små runda öron som sticker upp ur manen, korta ben och en tunn svans med en tofs.
- Färger: varmt solgul (`#F2B544`) med en orangebrun (`#C4692E`) krafsig man och svanstofs, ljust gräddgul nos.
- Kännetecken: den stora manen i kritstreck. Inga prickar (det är leopardens).

## Personlighet
- Stor, snäll och lite sömnig. Ryter gärna, men det låter mer som ett mysigt gäsp.

## Röst och repliker
- Röst: djup och varm.
- Återkommande replik: *"Rrroar! … Oj, det blev visst en gäspning."*
- Ljud: ett mjukt, inte läskigt rrroar, gäsp.

## Cut out-delar
```delar
body without arms and legs, mane, left arm, right arm, left leg, right leg, tail (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/lejonet-lage/`](../assets/karaktarer/lejonet-lage/): `lejonet-lage.png` (vald variant v2, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `lejonet-lage-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `lejonet-lage-v*.jpeg`. Kropp utan lemmar och rigg görs med `verktyg/delar.py` när figuren ska animeras.

## Prompt
```prompt
Lage the lion, ONE smooth, slightly lopsided egg-shaped body (head and body in one), warm sunny yellow (#F2B544) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. A big scribbly orange-brown (#C4692E) crayon mane all around the head, two small round ears peeking out of the mane, a light cream muzzle with a small dark brown nose, tiny arm nubs, two short stubby legs, a thin tail with an orange-brown tuft. No spots. Face directly on the body: two round white eyes ringed in black with small black pupils and a small sleepy happy smile. Friendly, not scary. Very minimal.
```

## Pose: i helikoptern (011, förslag)
Lage sitter i gula helikopterns låga, breda öppna sits (`rekvisita/helikopter-gul.md`), syns från midjan och upp, tassarna fria över kanten (peka, vinka, fläkta, armarna upp). Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Troligen behövs ingen ny bild.** Gör som Lova i gröna traktorn i 014 (`assets/karaktarer/leoparden-lova/i-traktorn/`): kroppen och de ritade armarna ur `lejonet-lage-rigg-lemmar.json` läggs i helikopterns ruta mellan ryggstödet och framdelen, benen döljs bakom karossen och ansiktet ritas i kod. Svansen är ett eget lager som hänger ut över sitsens bakkant och kan vifta (frågan, 06b–06d). Manen ska ligga som en orangebrun ram mot den citrongula karossen. En `i-helikoptern/`-mapp med samma sorts json räcker.

Bara om det ihopsatta inte ser bra ut: generera posen med image2image, Image 1 = `lejonet-lage-faceless.png`, Image 2 = helikopterns valda bild.

```prompt
Image 1 is Lage the lion: keep him EXACTLY the same, same lopsided egg-shaped body, same warm sunny yellow (#F2B544) wax crayon with grainy streaky texture, same big scribbly orange-brown (#C4692E) mane, same small round ears, same light cream muzzle with the small dark brown nose, same thin uneven white rim, and keep him faceless: no eyes, no mouth. Image 2 is the lemon yellow toy helicopter, seen from the side facing right: keep it exactly the same. ONLY change: Lage sits in the helicopter's low wide open seat, facing the viewer, showing from the waist up above the low front edge, his two tiny arm nubs resting on the edge, his legs hidden inside the body, his thin tail with the orange-brown tuft hanging out over the back edge of the seat. No rotor blades, no helmet, no new details, no shadow, no text. Pure solid white background.
```

## Pose: ligger och sover (Godnattsagan)
Lage ligger på magen som en låg, rund limpa, framifrån, med framtassarna under hakan och svansen runt sidan. Utan ansikte: ögonen (410, 476) och (600, 476), radie 26, och munnen (505, 628) ritas i kod, så att han kan blunda och somna. Fötterna står på (540, 845) i 1024-rutan. Ändrar inte figuren.

Bilden: `assets/karaktarer/lejonet-lage/ligger/lejonet-lage-ligger.png` (Google Flow, Nano Banana, 0 krediter, 2026-11-06, variant 2; kanten gjord om till en jämn vit klistermärkskant). Bild 1 = `lejonet-lage-faceless.png`, bild 2 = `lammet-ludde/ludde-sover.png` (bara posen).

```prompt
Image 1 is Lage the lion: keep him EXACTLY the same character and drawing style: the same lopsided round body, the same warm sunny yellow (#F2B544) wax crayon with grainy streaky texture and paper grain, the same big scribbly orange-brown (#C4692E) crayon mane, the same small round ears, the same light cream muzzle with the small dark brown nose, the same thin tail with an orange-brown tuft, no black outline, a thin uneven white rim around him. Keep him faceless: NO eyes, NO mouth, only the muzzle and nose. Image 2 is a POSE reference only (do not copy the lamb): ONLY change the pose: Lage lies down on his tummy on the ground, seen from the front, body flattened into a low wide round loaf, head resting low on top with the mane around it, two short front paws stretched forward under his chin with dark paw tips, two back paws peeking out at the sides, the tail curled around the side. Cosy, sleepy, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```
