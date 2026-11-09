# Lammet Ludde

**Art:** lamm · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-07):** gjord som Kanel ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/lammet-ludde/premium/`](../assets/karaktarer/lammet-ludde/premium/): kropp, öron, armar, ben och svans i `cut/`, vridpunkter i `ludde-rigg.json`, `rigg-test.html` (närbild, `?vy=hela` för brett). Godkänd konst: `premium/original/ludde-platt.png`, gjord med v1-lammet som figurreferens och `kanel-platt.png` som stilreferens. Den behövde inget plattare steg. Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`), och konstens kritkorn är tillbakalagda innanför kanten. Armarna är ritade om av en ren kritbit (`rita-lemmar.py --bara arm`, bit 440,520,536,616), och klövarna är mörkade på spetsen: konstens armar var tunna kilar över kroppskanten. Hängöronen sitter vid sidorna, så `delar.py` räknar nu delar i kroppens översta tredjedel som öron. Utseendet nedan är v1.
>
> **Sover (v2, 2026-11-08):** sovövergång C i testfilmen (`premium/uttryck.html?film=1`, `somna(d)`): sömnig och gäspar, ett litet hopp, och i toppen tar den ritade sovbilden `premium/cut/ludde-sover.png` över, landar liggande med en mjuk studs, andas och zzz flyter upp, och han vaknar med ett hopp tillbaka. Bilden (`original/ludde-sover-flow.jpg`) har ingen vit kant och en grå kritskugga under, så den är klippt med en hårdare färggräns (skuggan bort) och får kanten i scenen med `kant.lagg(g, { andel: 0.01 })`. Posen `liggMage` finns kvar.

> **Ansikte (v2), allt i kod:** ögon (420, 402) och (601, 401), rx 17,5, ry 26; kinder (384, 453) och (637, 452), rx 28, ry 17; nosen är en rundad rosa triangel (mitt 510, 430, 40 × 21 px, `#f99bb8`) och följer ansiktet i riktningsposen, eftersom lammet inte har någon nosfläck. Munnen har ett streck från nosen (441) ner till 461 och två bågar ut till ±32 px som slutar på 451.

> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/lammet-ludde/premium/uttryck.html) har samma API och samma namn som Kanels (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`). `?film=1` är samma 35 s testfilm som Kanels. Gången åt sidan (variant B), armar som glider in och ut och armar som inte flyger följer reglerna i `stil/art-direction-v2.md`, samma som Kanel. Renderad: `premium/ludde-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`). Lammet är mindre än kaninen i 1024-rutan (759 mot 925 px), så det syns mindre på samma zoom.

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

Godnattsagan ([`produktion/youtube/shorts/godnatt/lammet-ludde/`](../produktion/youtube/shorts/godnatt/lammet-ludde/manus.md)) använder `cut/ludde-faceless.png` stående och `cut/ludde-sover.png` liggande. I den liggande ritas öppna ögon på en ullfläck (#efe6d3) över bildens slutna ögon, (420, 697) och (606, 697), och tonas bort när han blundar (sista sidan och varje blinkning). De lösa vita strecken runt den liggande bilden tas bort i kod innan kant.js lägger en jämn kant; bildfilen är orörd.

## Prompt
```prompt
Image 1 (a horse) and Image 2 (a mouse) are STYLE and SHAPE references. A little lamb in that same style: ONE smooth, slightly lopsided egg-shaped body (head and body in one), soft white-cream wax crayon with grainy streaky texture, paper grain and a few faint loopy curl marks for wool, no black outline, a thin uneven white rim. Two small droopy pale pink-beige ears at the sides, tiny arm nubs, two short soft grey-brown legs with small dark hooves. Face directly on the body, no face patch: two round white eyes ringed in black with small black pupils, a tiny pink nose, a small happy smile. Very minimal.
```
