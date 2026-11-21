# Doktorn B

**Art:** doktor (människa) · **Favoritsak:** – · **Status:** 🔧 Rigg klar 2026-11-20, **tandläkaren i 049** (Sanna 2026-11-21)

> **Besöket** ([`format/besoket.md`](../format/besoket.md)): den tysta doktorn, först i 046 *Kaninen går till doktorn*. Mer mänskliga proportioner än Mor (Sanna 2026-11-20): ett runt huvud på kort hals, kropp i rock, långa raka armar och ben. Doktorn A och B är två förslag; den som inte väljs kan bli sköterskan på BVC eller tandläkaren.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, gjord av Sanna): `premium/original/doktorn-b-forsta.jpg` (med ansikte), `-faceless.jpg` och `-utan-lemmar.jpg`, pixeljusterade. Prompterna i [`avsnitt/046-kaninen-gar-till-doktorn/doktorn-prompter.md`](../avsnitt/046-kaninen-gar-till-doktorn/doktorn-prompter.md).
>
> **Delar:** `python3 verktyg/doktor_delar.py assets/karaktarer/doktorn-b/premium doktorn-b`, sedan `python3 verktyg/klapparm.py assets/karaktarer/doktorn-b/premium doktorn-b`. Armar och ben är skillnaden mellan faceless och utan-lemmar, med lång rot in bakom rocken. **Huvudet är en egen del** som vrids runt halsen (nicka, luta); halsen fortsätter 60 px upp under huvudet och huvudets underkant tonas. SKALA 0,544 (som Mor, 1,4 gånger Olle), vit kant 9 px i filerna. Vridpunkter i `doktorn-b-rigg.json`: arm-l (368, 456), arm-r (655, 458), ben ca (433, 798) och (591, 797), halsen (512, 346), fötterna 970.
>
> **Ansikte i kod** (Mors kod, skalad 0,66 runt huvudet): ögon (436, 399) och (588, 399), kinder (410, 446) och (618, 446), leendet y 474.
>
> **Uttryck, poser och testfilm:** [`premium/uttryck.html`](../assets/karaktarer/doktorn-b/premium/uttryck.html), samma API som Mor (`ansikte`, `pose`, `rorelse`, `?ark=poser`, `?film=1`). Riktningsposerna vänder bara huvudet, armarna stannar på var sin sida. Klappen möts lågt på rocken. **Sitta, sova och ligga ser konstiga ut med de långa benen**, men doktorn står alltid still (receptet).

> **Armbågsarmar i kod och vit kant (som doktor A, 2026-11-21):** armarna ritas av `armRita()` i `uttryck.html` (överärm, underarm, manschettstreck och en rund hand) i rockens egen krita, `cut/doktorn-b-rock-tile.png` (128 × 128, provtagen ur den ljusblå rocken), med grå kant. Axellederna är runda och sitter strax innanför rockens kant, **(390, 471) och (635, 473)**, så ingen rot syns i någon vinkel. `armar` lyfter armen och armbågen böjs uppåt (vinka, hurra), `armbage` böjer underarmen extra (håller fram, når, pekar), `fram` lägger armen framför rocken (magen, klappen). Klappen är egen (`ROR.klappa`). Urklippsarmarna `cut/doktorn-b-arm-*.png` används inte längre (vridpunkterna i riggfilen gäller bara dem). **EN jämn vit kant** runt hela figuren: filtret `#dkant` på `.figuren`. Delarna är kantlösa kopior `cut/doktorn-b-{body,head,leg-l,leg-r}-nk.png` (inbakad vit kant, blekt bryn och lösa kritsmulor bortplockade; kroppen gjord av den nya kroppen utan stetoskop). Stetoskop- och lampkoden från doktor A är inte med. Kontroll: `premium/doktorn-b-poser.png`.

> **Utan stetoskop och penna (049, Sanna 2026-11-21):** Flow-redigering av `-utan-lemmar.jpg`, tagning 1 av 2 (`original/doktorn-b-utan-stetoskop-1.jpeg`, jämförelse `original/utan-stetoskop-jamforelse.jpg`), pixeljusterad. Bara stetoskopets och pennans pixlar bytta i `cut/doktorn-b-body.png` (det gamla i `-body-med-stetoskop.png`). Bröstfickan är tom, ca x 558–628, y 490–550 i 1024-riggen: där sticker tandborsten upp (ritas i kod) i 049. Tandläkarens saker (spegeln, lampan, tandborsten) ritas i kod som doktorns i 046.

## Utseende
- Form: människa, ca 4,5 huvuden hög, runt huvud på kort hals.
- Färger: ljusblå rock `#8EC8E8` med två vita knappar, mörkblå byxor, vita skor, ljust persikofärgad hy.
- Kännetecken: mörkbrun page, stetoskop runt halsen. Ljusblå rock och mörkbrun page.

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
A kind, friendly grown-up doctor for a toddler picture book, drawn in EXACTLY the drawing technique of Image 1 (STYLE reference only, not its body shape): soft wax crayon and oil pastel, flat even colour with fine paper grain, no dark outline, a thick clean even white sticker border all around the whole silhouette like a die-cut vinyl sticker, no 3D shading. MORE HUMAN PROPORTIONS than Image 1: a round head on a short neck, clearly separate from the body, about four and a half heads tall in total, a simple rounded torso, longer arms and legs. BUILT FOR CUT-OUT ANIMATION: both arms hang straight and slightly out from the body at about 20 degrees with a clear gap of white background between arm and body all along, ending in simple rounded mitten hands (no fingers); the two legs are straight, separate and slightly apart with a clear gap, small rounded white shoes; nothing overlaps the torso. Clothes: a soft light-blue #8EC8E8 doctor's coat to the knees with long sleeves, two small round white buttons and one breast pocket with a pen, darker blue trousers. A simple stethoscope around the neck: a soft dark grey tube in a U over the coat with a small round silver chest piece. Hair: short soft dark brown hair in a neat rounded bob, one smooth cap, not covering the face. Light peach skin. CUTE FACE: two medium black oval eyes with one tiny white shine dot each, soft pink round cheeks, a tiny nose, a warm gentle smile. Standing, facing the viewer, centered, full body with space around, pure solid white background, no shadow, no ground, no text.
```
