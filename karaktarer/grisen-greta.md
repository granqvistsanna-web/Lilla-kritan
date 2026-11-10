# Grisen Greta

**Art:** gris · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-10, på Sannas önskan):** gjord som Zebbe, Kajsa och Rut ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Greta står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 740 px från fötterna till äggets topp i 1024-rutan, öronen räknas inte), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/grisen-greta/premium/`](../assets/karaktarer/grisen-greta/premium/): kropp, tryne (`greta-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `greta-rigg.json`. Hon har inga v1-bilder.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-greta-v2`, pixeljusterad): Sanna valde `premium/original/greta-forsta-b.jpg` (`-a` är den bortvalda tagningen). Ur B: `greta-faceless.jpg` (ögon, kinder och mun borta, trynet med näsborrarna kvar; `-b` är andra tagningen, nästan likadan) och `greta-body-flow.jpg` (bara kroppen med trynet; `-b` är andra tagningen). Inget plattare steg: armarna och benen ritas ändå. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/grisen-greta/premium/prompter.md). Flow ritade ögonen på samma mall som Kajsas och Zebbes.
>
> **Delar** (skripten i `premium/skript/`): `delar.py` gav alla sju delarna. **Hängöronen** ligger med fliken framför huvudet (som Hugos), så `greta_oron.py` tar hela örat ur skillnaden mellan faceless och kroppsbilden, också fliken över huvudet, med 10 px vit kant bara på utsidan; öronen sitter inne i `#kropp` framför huvudet och vrids kring roten inne i huvudet, (386, 232) och (627, 230), halva utslaget och högst ±12°, så de släpar mjukt efter. **Den lockiga svansen** är ur konsten med en smal lång rot (r 9, 80 px in mot kroppens mitt) i svansens egen rosa krita, och de vita gliporna mellan öglorna är kvar som klistermärke (`greta_svans.py`; `langre_rot.py` gav en för bred rot och `tunn_kant.py` fyllde gliporna). **Benen och armarna är ritade** (som Zebbes och Ruts): benen rosa krita med kroppens mörkare rosa kontur och en rund mörkare rosa klöv med klyfta, lite utåt, roten 80 px upp under kroppen (`greta_ben.py`); armarna runda rosa stumpar i en bit med mörkare rosa klöv (rot r 22, hand r 29, 75 px från vridpunkten 12 px innanför kroppens kant, 55° under vågrätt: konstens armar hänger brantare än Zebbes), med `-fram`-kopior för klappen och magen (`greta_arm.py`). Klövarna är kritan tonad till klövens färg, så kornet blir kvar. **Trynet** är lyft ur kroppen till `greta-nos.png` och följer ansiktet; kroppen under (`greta-body-tom.png`) är fylld med pannans rosa krita (`greta_nos.py`). **Näsborrarna ritas i kod** som Kajsas och Zebbes: de målade är bortretuscherade ur trynet (fyllda med trynets egen krita en bit bredvid, originalet i `premium/original/greta-nos-med-nasa.png`) och ritas som två `<ellipse class="nasa">` i samma grupp som trynet, (476, 465) och (541, 464), rx 10,5, ry 15,5, `#ad5567`. `node verktyg/baka-nasor.mjs` bakar in dem i `cut/greta-nos.png` (avsnitten laddar bara bilden); trynet utan näsborrar ligger kvar som `cut/greta-nos-utan-nasa.png`.
>
> **Armar flyger inte** (som Zebbes och Ruts): samma `GOM` och `UT`, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel. **Klappen** är kantklappen med korta stumpar mot magens kanter. Kontroll: `premium/greta-armar-overgangar.jpg` visar varje övergång i filmen i sju steg (också insomnandet och uppvaknandet).
>
> **Ansikte (v2), i kod:** ögon (419, 402) och (602, 401), rx 18, ry 26; kinder (371, 451) och (647, 450), rx 30, ry 19, `#f0909c`; ett litet leende under trynet (487–535, ändarna i 535, botten i 547), mörkbrunt `#3a2a22`. Öppen mun `#7a2a1c`. Ögonen tonas aldrig (kläms ihop och byts mot bågen, som Zebbes).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/grisen-greta/premium/uttryck.html) har samma API och namn som Zebbes och Ruts (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(21)`). Den lockiga svansen gungar lugnt och vickar snabbt (±14°) i 0,6 s var 3,2:e sekund, också i klappen, hoppet och dansen. `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2, utan fel i konsolen. Renderad: `premium/greta-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/greta-stills.jpg`.
>
> **Somnar (C), som Zebbes och Ruts:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Hon landar liggande på magen med en mjuk studs, andas, zzz flyter upp ovanför huvudet, och hon vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-10): två tagningar med prompten nedan och B som bild 1. Båda ligger; tagning 1 är vald (`premium/original/greta-sover-flow.jpg`, ligger på magen med hakan på framklövarna, öronen avslappnade, blundar), tagning 2 (`greta-sover-flow-b.jpg`) ligger också men är mindre och huvudet lyfter. `premium/original/greta-sover-jamforelse.jpg` visar båda bredvid B. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/greta-sover.png`, `tunn_kant.py 11,4`. I filmen `SOV = { fil: 'cut/greta-sover.png', cx: 512, botten: 794, skala: 0.88 }`: den liggande ytan blir 0,71 av den stående figurens (Kajsas 0,72), och kanten 11,4 × 0,88 = 10 px som riggen. Prompt (bild 1 = `premium/original/greta-forsta-b.jpg`):
> *Edit Image 1. The same little pig, same flat wax-crayon style, same pink egg-shaped body, same big round darker pink snout with two nostrils, same floppy triangle ears, same small curly tail, same darker pink hooves, same thick clean white sticker border, now LYING DOWN flat on her tummy, seen from the front, sleeping peacefully: body long and low, stretched out on the ground, chin resting on her two front hooves tucked under the chin, the floppy ears relaxed and hanging down, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile. Not sitting, not standing: lying down. As big in the frame as Image 1, filling the width. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.*

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), två små armstumpar, två korta ben, en liten lockig svans och två små vikta triangelöron.
- Färger: rosa (`#F4A7B9`) med ett runt mörkare rosa (`#E38AA0`) tryne med två näsborrar och mörkare rosa hovar.
- Kännetecken: det runda trynet med två näsborrar, de små vikta triangelöronen och den lockiga svansen.

## Personlighet
- Glad och pigg. Älskar lerpölar och att hoppa högt. Skrattar ofta.

## Röst och repliker
- Röst: glad, klingande och bubblig.
- Återkommande replik: *"Hoppla, vilken pöl!"*
- Ljud: nöff-nöff.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, tail, left ear, right ear, snout (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Greta the pig, ONE smooth, slightly lopsided egg-shaped body (head and body in one), pink (#F4A7B9) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. A round darker pink (#E38AA0) snout with two nostrils in the middle of the face, two small floppy triangle ears, a curly tail, darker pink hooves, tiny arm nubs, two short stubby legs. Face directly on the body: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
