# Kon Kajsa

**Art:** ko · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-09, Sannas önskan "we need new cow", v1-låset hävt för det här):** gjord som Mille och Nicke ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Kajsa står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 748 px från fötterna till äggets topp i 1024-rutan, hornen sticker upp ovanför), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/kon-kajsa/premium/`](../assets/karaktarer/kon-kajsa/premium/): kropp (med horn, band och koskälla), mule (`kajsa-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `kajsa-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, pixeljusterad): Sanna valde `premium/original/kajsa-forsta-a.jpg` (`-b` är den bortvalda tagningen). Ur A: `kajsa-platt.jpg` (armarna rundade och hållna en bit ut från kroppen), `kajsa-faceless.jpg` och `kajsa-body-flow.jpg` (bara kroppen, med horn, mule, band och koskälla). Prompterna står i [`premium/prompter.md`](../assets/karaktarer/kon-kajsa/premium/prompter.md).
>
> **Den gräddvita kritan** (min-kanal ca 230) räknas som vitt av `tunn_kant.py` och `egen_kant.py`. Därför värms krämen (blått −14, grönt −4 där R − B > 6) före klippningen och kyls tillbaka efteråt, så att färgen i `cut/` är konstens. Skripten för det, rötterna, de ritade armarna och benen och mulen ligger i `premium/skript/` (`varm.py`, `kajsa_rot.py`, `kajsa_arm.py`, `kajsa_ben.py`, `kajsa_nos.py`).
>
> **Delar:** öron och svans är ur konsten med **lång rot** (80 px in under kroppen, kroppens krämkrita med konstens grå kontur längs sidorna). **Benen och armarna är ritade:** konstens ben hade grå skuggkilar och prickar. Benen är krämkrita med grå kontur och mörk klöv nedtill, roten 80 px upp under kroppen. Armarna är runda stumpar som Nickes (rot r 22, hand r 29 med klöv, 85 px från vridpunkten i kroppens kant, 50° under vågrätt); `-fram`-armarna har den vita kanten och den grå konturen tonade mot roten. **Mulen** (rosa, med näsborrarna) är lyft ur kroppen till `kajsa-nos.png` och följer ansiktet; kroppen under (`kajsa-body-tom.png`) är fylld med pannans krämkrita. Bandet och koskällan sitter kvar på kroppen.
>
> **Armar flyger inte** (som Nickes): samma `GOM` och `UT` (en arm syns bara i vila under ca 26° eller uppe över ca 80°, däremellan glider den in bakom kroppen), lyfta poser höga, riktningsposen utan extra lyft. **Klappen** är Milles och Nickes kantklapp, men klövarna klappar vågrätt på krämen strax under bandet (`KLAPP`: vinkel −135 + 26·c, 30 − 18·c px in, 16 px upp): på de nedre svarta fläckarna syntes de inte. `magen` likadant (−125°). Kontroll: `premium/kajsa-armar-overgangar.jpg` visar varje övergång i filmen i sju steg.
>
> **Ansikte (v2), i kod:** ögon (419, 402) och (601, 401), rx 18, ry 26; kinder (380, 453) och (639, 450), rx 27, ry 18, `#f2a3a8`; ett litet leende på mulens nederdel (491–529, ändarna i 531 och botten i 541), plommonfärgat `#53323a`, inget nosstreck. Öppen mun `#7a2a34` på mulen. Kawaii är ett uttryck som hos de andra (W = 519 px).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/kon-kajsa/premium/uttryck.html) har samma API och namn som Milles och Nickes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(14)`). Öronen hänger åt sidorna och vrids kring leden (`oron` + = hänger). Svansen (`svans`, som Milles) gungar lugnt, vickar 10° var 4,5:e sekund och i takt med stegen. `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2. Renderad: `premium/kajsa-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/kajsa-stills.jpg`.
>
> **Somnar (C), som Nickes:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Hon landar liggande på magen med en mjuk studs, andas, zzz flyter upp, och hon vaknar med ett hopp tillbaka (`premium/kajsa-sov-strip.jpg`, var 0,1 s). **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-09): två tagningar med prompten nedan och A som bild 1. Tagning 1 är vald (`premium/original/kajsa-sover-flow.jpg`, ligger på magen med klövarna under hakan); tagning 2 (`kajsa-sover-flow-b.jpg`) sitter upp och används inte. `kajsa-sover-jamforelse.jpg` visar båda. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/kajsa-sover.png`, `tunn_kant.py 10,4`. I filmen `SOV = { fil: 'cut/kajsa-sover.png', cx: 512, botten: 809, skala: 0.96 }`: liggande yta 0,92 av den stående kroppens (Milles 0,98, Nickes 0,96), och kanten 10,4 × 0,96 = 10 px som riggen. Prompt (bild 1 = `premium/original/kajsa-forsta-a.jpg`):
> *Edit Image 1. The same little cow, same flat wax-crayon style, same creamy white body with the same big soft black patches, same yellow horns, same small cream ears, same big light pink muzzle with two nostrils, same red band with the golden cowbell, same thin tail with a black tuft, same thick clean white sticker border, now lying down on her tummy, seen from the front, sleeping peacefully: body low and wide, the head resting forward, her two little front hooves folded under her chin, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile under the muzzle, ears relaxed and drooping a little, back hooves peeking out behind. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.*
>
> Utseendet nedan är v1.

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
