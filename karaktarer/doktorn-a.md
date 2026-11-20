# Doktorn A

**Art:** doktor (människa) · **Favoritsak:** – · **Status:** ✅ Vald för 046 av Sanna 2026-11-20, rigg klar

> **Besöket** ([`format/besoket.md`](../format/besoket.md)): den tysta doktorn, först i 046 *Kaninen går till doktorn*. Mer mänskliga proportioner än Mor (Sanna 2026-11-20): ett runt huvud på kort hals, kropp i rock, långa raka armar och ben. Sanna valde A för 046 (2026-11-20); B sparas till BVC eller tandläkaren.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, gjord av Sanna): `premium/original/doktorn-a-forsta.jpg` (med ansikte), `-faceless.jpg` och `-utan-lemmar.jpg`, pixeljusterade. Prompterna i [`avsnitt/046-kaninen-gar-till-doktorn/doktorn-prompter.md`](../avsnitt/046-kaninen-gar-till-doktorn/doktorn-prompter.md).
>
> **Delar:** `python3 verktyg/doktor_delar.py assets/karaktarer/doktorn-a/premium doktorn-a`, sedan `python3 verktyg/klapparm.py assets/karaktarer/doktorn-a/premium doktorn-a`. Armar och ben är skillnaden mellan faceless och utan-lemmar, med lång rot in bakom rocken. **Huvudet är en egen del** som vrids runt halsen (nicka, luta); halsen fortsätter 60 px upp under huvudet och huvudets underkant tonas. SKALA 0,544 (som Mor, 1,4 gånger Olle), vit kant 9 px i filerna. Vridpunkter i `doktorn-a-rigg.json`: arm-l (376, 447), arm-r (646, 447), ben (431, 772) och (594, 772), halsen (511, 360), fötterna 975.
>
> **Armar med armbåge i kod** (Sanna 2026-11-20: urklippsarmarna var stela och rötterna syntes; armbågsarmarna "much better"): överärm och underarm i rockens egen krita (`cut/doktorn-a-rock-tile.png`), grå kant, manschettstreck och en rund hand, ritade av `armRita()` i `uttryck.html` (provet: `premium/armar-test.html`). Axelleden är rund och sitter strax innanför rockens kant (398, 462) och (626, 462), så ingen rot syns i någon vinkel. `armar` lyfter armen och armbågen böjs uppåt ju högre den lyfts (vinka, hurra); `armbage` böjer underarmen extra (håller fram, sträcker sig). `fram` lägger armen framför rocken utan vit kant vid axeln (magen, stetoskopet, klappen). Klappen är egen (`ROR.klappa`). Urklippsarmarna i `cut/` används inte längre. Kontroll: `premium/doktorn-a-poser.png`, testfilmen `premium/doktorn-a-testfilm.mp4` (git-ignorerad).
>
> **Vit kant (Sanna 2026-11-20: "polish dr white rim"):** EN jämn kant runt hela figuren, filtret `#dkant` på `.figuren` i `uttryck.html` (alfan suddas och skärs av, ca 12 enheter ≈ 10 px i bild på SKALA 0,8, lite kritkorn). Delarnas inbakade kanter var olika tjocka och gav vita bulor vid fållen, så sidan använder kantlösa kopior `cut/doktorn-a-{body,head,leg-l,leg-r}-nk.png` (den vita kanten, det bleka brynet och lösa kritsmulor bortplockade). Armar bakom rocken har ingen egen kant; armar framför rocken har en smal vit skiljelinje mot rocken.
>
> **Ansikte i kod** (Mors kod, skalad 0,66 runt huvudet): ögon (435, 399) och (588, 399), kinder (406, 443) och (618, 443), leendet y 480.
>
> **Uttryck, poser och testfilm:** [`premium/uttryck.html`](../assets/karaktarer/doktorn-a/premium/uttryck.html), samma API som Mor (`ansikte`, `pose`, `rorelse`, `?ark=poser`, `?film=1`). Riktningsposerna vänder bara huvudet, armarna stannar på var sin sida. Klappen möts lågt på rocken. **Sitta, sova och ligga ser konstiga ut med de långa benen**, men doktorn står alltid still (receptet).

## Utseende
- Form: människa, ca 4,5 huvuden hög, runt huvud på kort hals.
- Färger: vit rock (ljust varmgrå krita med grå kant), turkos tröja och byxor `#3BB4A8`, bruna skor, ljust persikofärgad hy.
- Kännetecken: kort, lockigt, varmt rödbrunt hår `#B5562F`, stetoskop runt halsen. Vit rock och röda lockar.

## Personlighet
- Snäll, lugn och leende. Nickar och vinkar.

## Röst och repliker
- Röst: ingen, doktorn är tyst (Malin berättar).
- Återkommande replik: –
- Ljud: –

## Cut out-delar
```delar
head (turns at the neck), body with neck, left arm, right arm, left leg, right leg (face drawn in code)
```

## Prompt
```prompt
A kind, friendly grown-up doctor for a toddler picture book, drawn in EXACTLY the drawing technique of Image 1 (STYLE reference only, not its body shape): soft wax crayon and oil pastel, flat even colour with fine paper grain, no dark outline, a thick clean even white sticker border all around the whole silhouette like a die-cut vinyl sticker, no 3D shading. MORE HUMAN PROPORTIONS than Image 1: a round head on a short neck, clearly separate from the body, about four and a half heads tall in total, a simple rounded torso, longer arms and legs. BUILT FOR CUT-OUT ANIMATION: both arms hang straight and slightly out from the body at about 20 degrees with a clear gap of white background between arm and body all along, ending in simple rounded mitten hands (no fingers); the two legs are straight, separate and slightly apart with a clear gap, small rounded shoes; nothing overlaps the torso. Clothes: a white doctor's coat to the knees with long sleeves, drawn in very light warm grey-white crayon with a soft grey crayon edge so it reads against the white sticker border, open at the front in a narrow V over a calm turquoise #3BB4A8 top, one breast pocket with a pen, turquoise trousers. A simple stethoscope around the neck: a soft dark grey tube in a U over the coat with a small round silver chest piece. Hair: short soft curly warm auburn #B5562F hair as one smooth cap, not covering the face. Light peach skin. CUTE FACE: two medium black oval eyes with one tiny white shine dot each, soft pink round cheeks, a tiny nose, a warm gentle smile. Standing, facing the viewer, centered, full body with space around, pure solid white background, no shadow, no ground, no text.
```
