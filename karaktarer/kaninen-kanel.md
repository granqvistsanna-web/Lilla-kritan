# Kaninen Kanel

**Art:** kanin · **Favoritsak:** kanin 🐰 · **Status:** ✅ Referensark klart

## Utseende
- Form: en enda sned, rund kritklump (huvud och kropp i ett), två långa öron som båda står rakt upp. Små armstumpar, korta ben och stora ovala fötter.
- Färger: varmt brun vaxkrita, gräddvit mage och gräddvit nosfläck med liten rosa nos, ljust rosabeige inuti öronen.
- Kännetecken: de raka öronen och den vita magen. Väldigt minimal.
- Den rosa versionen med hängöra ligger i `v2/` (och den ännu äldre i `v2/cut/v1/`). Trekvart, sida och bakifrån (`kanel-34`, `kanel-side`, `kanel-back`) är fortfarande rosa och behöver göras om innan de används.

## Personlighet
- Glad och hoppig. Älskar äpplen och morötter.
- Är bra på att hitta saker och räknar gärna: *"Ett, två, tre – hopp!"*

## Röst och repliker
- Röst: glad och lite fnissig.
- Återkommande replik: *"Ett, två, tre – hopp!"*
- Ljud: mjuka duns när hon hoppar.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg with foot, right leg with foot (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/kaninen-kanel/`](../assets/karaktarer/kaninen-kanel/): framifrån, utan ansikte, kropp utan lemmar, trekvart, sida och bakifrån, utklippta i `cut/`. Vridpunkter för armar och ben finns i `kanel-rigg.json`, ögonen sitter på (412, 396) och (605, 401) med radie 26, och munnen på nosfläcken (510, 458). Lemmarna är ritade med `verktyg/rita-lemmar.py assets/karaktarer/kaninen-kanel assets/karaktarer/kaninen-kanel/cut 290,450,370,530 0.1`. `rigg-test.html` visar henne vinka, gå, hoppa och blinka. Delarna görs med `verktyg/delar.py`.

## Prompt
```prompt
Kanel the rabbit: one big slightly lopsided round blob (body and head in one), warm soft brown heavy wax crayon with streaky strokes and paper grain, a creamy white tummy patch and a creamy white muzzle patch, no outline, a thin uneven white rim, two long ears both standing straight up with pale pink-beige insides, two round white eyes ringed in black with small black pupils, a tiny pink nose, two tiny arm nubs, two short legs with big oval feet. Very minimal: no hair, no clothes, no marks.
```

## Pose: på mopeden (012, förslag)
Kanel sitter på blå mopedens sadel (`rekvisita/moped-bla.md`), vänd mot tittaren, med tassarna på styret. Kåpan döljer benen. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Troligen behövs ingen ny bild.** Gör som Lova i gröna traktorn i 014 (`assets/karaktarer/leoparden-lova/i-traktorn/`): `kanel-body.png` och armarna ur `kanel-rigg.json` läggs i mopedens ruta mellan bakdelen (sadel, korg) och framdelen (kåpa, styre), benen döljs bakom kåpan och ansiktet ritas i kod. Den högra armen vilar på styrets handtag, den vänstra kan vinka, peka och visa "litet". Öronen sticker fritt uppåt (de svänger som klockor och viftar som flaggan). Ställ mopeden på den tomma golvytan, inte framför äppelträdets stam (brun mot brun). `kanel-side.png` är rosa och gammal (se ovan) och används inte. En `pa-mopeden/`-mapp med samma sorts json räcker.

Bara om det ihopsatta inte ser bra ut: generera posen med image2image, Image 1 = `kanel-faceless.png`, Image 2 = mopedens valda bild.

```prompt
Image 1 is Kanel the rabbit: keep her EXACTLY the same, same slightly lopsided round blob body, same warm soft brown wax crayon with streaky strokes, same creamy white tummy and muzzle patches, same tiny pink nose, same two long ears standing straight up with pale pink-beige insides, same thin uneven white rim, and keep her faceless: no eyes, no mouth. Image 2 is the blue toy moped, seen from the side facing right: keep it exactly the same. ONLY change: Kanel sits on the moped's low seat, facing the viewer, her legs hidden behind the blue leg shield, one tiny arm nub resting on the handlebar, the other arm nub free at her side. No helmet, no new details, no shadow, no text. Pure solid white background.
```

## Pose: ligger och sover (Godnattsagan)
Kanel ligger på magen som en låg, rund limpa, framifrån, med tassarna under hakan och de långa öronen bakåtlagda längs ryggen. Utan ansikte: ögonen och munnen ritas i kod, så att hon kan blunda och somna. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

Bilden saknas än. Den ska heta `assets/karaktarer/kaninen-kanel/ligger/kanel-ligger.png` (originalen i `ligger/original/`), och ögon, mun och fötter mäts i den när den finns (se `produktion/youtube/shorts/godnatt/kaninen-kanel/manus.md`). Bild 1 = `cut/kanel-faceless.png` (den bruna), bild 2 = `lammet-ludde/ludde-sover.png` (bara posen).

```prompt
Image 1 is Kanel the rabbit: keep her EXACTLY the same character and drawing style: the same slightly lopsided round blob body, the same warm soft brown heavy wax crayon with streaky strokes and paper grain, the same creamy white tummy patch and creamy white muzzle patch, the same tiny pink nose, the same two long ears with pale pink-beige insides, no black outline, a thin uneven white rim around her. Keep her faceless: NO eyes, NO mouth, only the muzzle patch and the nose. Image 2 is a POSE reference only (do not copy the lamb): ONLY change the pose: Kanel lies down on her tummy on the ground, seen from the front, body flattened into a low wide round loaf, head resting low on top, both long ears folded back and lying flat along her back, two tiny front paws tucked forward under her chin, two big oval feet peeking out at the sides. Cosy, sleepy, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```
