# Leoparden Lova

**Art:** leopard · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-07):** gjord som Kanel, Ludde, Bulle och Mille ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/leoparden-lova/premium/`](../assets/karaktarer/leoparden-lova/premium/): kropp (tom), mage, nosfläck, öron, armar, ben och svans i `cut/`, vridpunkter i `lova-rigg.json`, och `uttryck.html` (uttryck, `?ark=poser`, `?film=1` testfilm, `lova-testfilm.mp4`). Godkänd konst i `premium/original/`: `lova-forsta.jpg` (redan platt nog, inget plattare steg), `lova-faceless.jpg` och `lova-body.jpg`, gjorda i Google Flow (Nano Banana, image2image, 0 krediter) med `leoparden-lova.png` som bild 1. Få, stora och mjuka fläckar som ligger på kroppen och följer med; inga fläckar på armar och ben. Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`). Armarna är korta kapslar i kroppens krita (axel (245, 575) och (776, 572)); armarna framför kroppen (`-fram`) är varmt mörkare mot kroppens kantfärg, annars blir gult olivgrönt. Öronen är hela runda skivor bakom huvudet. Magen och nosfläcken lyftes ut med strängare gränser än `flackar.py`, eftersom den sandgula kroppen annars räknas som ljus fläck. Sover som Ludde v2: uttrycket `sover` (slutna u-bågar) och posen `liggMage` (ligger på magen med tassarna under hakan: armar −160°, klapp 55, svansen 10° uppe bakom), andas lugnt i `ROR.ligga` (4 s per andetag). Vald av Sanna 2026-11-07, ersätter den sittande sömnen. I testfilmen somnar hon med övergång C (Sannas val 2026-11-08): sömnig och gäspar, ett litet hopp, och i toppen byts riggen mot den ritade sovbilden `cut/lova-sover.png` (ur `original/lova-sover-flow.jpg` med `sovbild.py`, skala 0,86) som landar med en mjuk studs, andas och zzz flyter upp. Hon vaknar med ett litet hopp tillbaka till riggen. Kawaii-ögonen är ett uttryck (`ansikte('kawaii')`, stora ögon med två glanspunkter) för glädje och förundran, aldrig standardansiktet. Utseendet nedan är v1.

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

Bilderna ligger i [`assets/karaktarer/leoparden-lova/`](../assets/karaktarer/leoparden-lova/): `leoparden-lova.png` (vald variant v1, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `leoparden-lova-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `leoparden-lova-v*.jpeg`. `leoparden-lova-body.png` (utan armar och ben, Google Flow, 0 krediter, 2026-11-05), riggen `leoparden-lova-rigg.json` (`verktyg/delar.py`) och ritade armar och ben i `lemmar/` (`verktyg/rita-lemmar.py`, `leoparden-lova-rigg-lemmar.json`). Sitter i traktorn: `i-traktorn/`.

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
