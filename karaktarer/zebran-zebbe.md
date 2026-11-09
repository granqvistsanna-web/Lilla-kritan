# Zebran Zebbe

**Art:** zebra · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-09, på Sannas önskan, v1-låset hävt för det här):** gjord som Kajsa och Nicke ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Zebbe står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 743 px från fötterna till äggets topp i 1024-rutan, manen sticker upp ovanför), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/zebran-zebbe/premium/`](../assets/karaktarer/zebran-zebbe/premium/): kropp (med man och ränder), mule (`zebbe-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `zebbe-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-zebbe-v2`, pixeljusterad): Sanna valde `premium/original/zebbe-forsta-a.jpg` (`-b` är den bortvalda tagningen, `premium/zebbe-a-b-hulda.jpg` jämför dem med Hulda). Ur A: `zebbe-platt.jpg` (armarna hållna en bit ut från kroppen med en glipa), `zebbe-faceless.jpg` och `zebbe-body-flow.jpg` (bara kroppen, med man, mule och ränder). Prompterna står i [`premium/prompter.md`](../assets/karaktarer/zebran-zebbe/premium/prompter.md). Flow ritade Zebbe på samma mall som Kajsa: ögon, kinder, mule, näsborrar och mun har samma mått.
>
> **Den gräddvita kritan** räknas som vitt av `tunn_kant.py` och `egen_kant.py` (som Kajsas), så krämen värms före klippningen och kyls tillbaka efteråt (`premium/skript/varm.py`). Skripten ligger i `premium/skript/` (`varm.py`, `zebbe_rot.py`, `zebbe_arm.py`, `zebbe_ben.py`, `zebbe_nos.py`, `zebbe_kropp_linje.py`).
>
> **Delar:** öron och svans är ur konsten med **lång rot** (80 px in under kroppen, kroppens krämkrita med konstens grå kontur längs sidorna). **Benen och armarna är ritade:** kroppsbilden från Flow går längre ner än konstens ägg, så det som syntes av konstens ben blev korta stumpar med smal rot. Benen är krämkrita med grå kontur, två svarta randkilar och svart hov nedtill, roten 80 px upp under kroppen. Armarna är runda stumpar som Kajsas (rot r 22, hand r 29 med svart hov, 85 px från vridpunkten i kroppens kant, 50° under vågrätt), med `-fram`-kopior för klappen och magen. Flow-kroppen hade en tunn grå linje under äggets kant där benen satt; den är vitad (`zebbe_kropp_linje.py`) innan kanten gjordes om. **Mulen** är lyft ur kroppen till `zebbe-nos.png` och följer ansiktet; kroppen under (`zebbe-body-tom.png`) är fylld med magens krämkrita. **Näsborrarna ritas i kod** som Kajsas: de målade är bortretuscherade ur mulen (fyllda med mulens egen krita, originalet i `premium/original/zebbe-nos-med-nasa.png`) och ritas som två `<ellipse class="nasa">` i samma grupp som mulen, (461, 488) och (552, 487), rx 10, ry 12, `#a69084`. `node verktyg/baka-nasor.mjs` bakar in dem i `cut/zebbe-nos.png` (avsnitten laddar bara bilden); mulen utan näsborrar ligger kvar som `cut/zebbe-nos-utan-nasa.png`. Manen och ränderna sitter kvar på kroppen.
>
> **Armar flyger inte** (som Kajsas och Nickes): samma `GOM` och `UT`, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel. **Klappen** är kantklappen med korta stumpar mot magens kanter. Kontroll: `premium/zebbe-armar-overgangar.jpg` visar varje övergång i filmen i sju steg.
>
> **Ansikte (v2), i kod:** ögon (419, 402) och (601, 401), rx 18, ry 26; kinder (381, 453) och (639, 451), rx 27, ry 17, `#f4a7ad`; ett litet leende på mulens nederdel (489–531, botten i 541), mörkbrunt `#4f342e`, inget nosstreck. Öppen mun `#7a2e2a`. Ögonen tonas aldrig (kläms ihop och byts mot bågen, som Kajsas).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/zebran-zebbe/premium/uttryck.html) har samma API och namn som Kajsas och Nickes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(15)`). `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2. Renderad: `premium/zebbe-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/zebbe-stills.jpg`.
>
> **Somnar (C), som Kajsas:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Han landar liggande på magen med en mjuk studs, andas, zzz flyter upp, och han vaknar med ett hopp tillbaka (`premium/zebbe-sov-strip.jpg`, var 0,1 s). **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-09): två tagningar med prompten nedan och A som bild 1. Tagning 2 är vald (`premium/original/zebbe-sover-flow.jpg`, ligger på magen med hovarna under hakan, blundar); tagning 1 (`zebbe-sover-flow-b.jpg`) sitter upp och används inte. `premium/original/zebbe-sover-jamforelse.jpg` visar båda. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/zebbe-sover.png`, `tunn_kant.py 11,6` (krämen värmd före). I filmen `SOV = { fil: 'cut/zebbe-sover.png', cx: 512, botten: 838, skala: 0.86 }`: samma yta i förhållande till den stående figuren som Kajsas sovbild, och kanten 11,6 × 0,86 = 10 px som riggen. Prompt (bild 1 = `premium/original/zebbe-forsta-a.jpg`):
> *Edit Image 1. The same little zebra, same flat wax-crayon style, same creamy white body with the same thick black crayon stripes wrapping around the sides, same short black upright mane, same small pointed cream ears, same rounded light grey-beige muzzle with two nostrils, same thin tail with a black tuft, same thick clean white sticker border, now lying down on his tummy, seen from the front, sleeping peacefully: body low and wide like a soft round loaf, the head resting forward, his two little front hooves folded under his chin, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile on the muzzle, ears relaxed and drooping a little, back hooves peeking out behind, the tail curled around the side. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.*
>
> Utseendet nedan är v1.

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
