# Mamma Mor

**Art:** mamma (människa) · **Favoritsak:** – · **Status:** ✅ Referensark klart (valt 2026-11-07)

> **Art direction v2 (2026-11-09, på Sannas önskan, v1-låset hävt för det här):** samma Mor, omgjord i v2-stilen som Olle och Zebbe ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). v1-filerna i `assets/karaktarer/mamma-mor/` är orörda. Hon är den vuxna: **SKALA 0,675**, så att kroppen (fötterna till äggets topp, utan hårknuten, 729 px i 1024-rutan) blir 1,4 gånger Olles (705 px på SKALA 0,5). Alla delar har 7,4 px vit kant (5 / 0,675). Kontroll: `premium/mor-olle-storlek.jpg` (hon och Olle på samma golv). Riggen ligger i [`assets/karaktarer/mamma-mor/premium/`](../assets/karaktarer/mamma-mor/premium/): kropp (med håret, knuten och klänningens korta ärmar), armar (med `-fram`-kopior) och ben i `cut/`, vridpunkter i `mor-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-mor-v2`): Sanna valde `premium/original/mor-forsta-a.jpg` (`-b` är den bortvalda tagningen, `premium/mor-a-b-olle.jpg` jämför dem med Olle). Ur A: `mor-platt.jpg` (armarna hållna ut med en glipa; `mor-platt-b.jpg` bortvald) och `mor-faceless.jpg` (`mor-faceless-b.jpg` bortvald). Bara kroppen gjordes lokalt ur den ansiktslösa bilden (`premium/skript/mor_kropp.py`: klänningen + ansiktets persika + håret), så den är pixeljusterad. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/mamma-mor/premium/prompter.md).
>
> **Delar:** armarna och benen är ritade i konstens mått (`premium/skript/mor_lemmar.py`), för att konstens lemmar blev tjocka pinnar med vita sömmar efter `langre_rot.py`. Armen är **en rund stump i ett stycke** (smal persikofärgad underarm, rund hand), vridpunkten där den kommer ut under ärmen och roten 60 px in bakom ärmen; `-fram`-kopiorna (klappen, magen) tonar bara roten närmast leden. Benen är persika med en brun sko och **lång rot** 80 px upp under klänningen. Inga böjda kodarmar och ingen släp/efterstudsning i armarna.
>
> **Armar flyger inte** (som Zebbes): samma `GOM` och `UT`, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel; en arm som vrids nedåt bakom kroppen (på väg in i klappen) glider också in, och handen kommer fram vid magens kant. **Klappen** är kantklappen: korta runda händer mot magens kanter. Vinkande arm: uppe, bakom kroppen och ut förbi kanten. Kontroll: `premium/mor-armar-overgangar.jpg` (varje övergång i filmen i sju steg).
>
> **Ansikte (v2), i kod:** ögon (420, 400) och (605, 398), rx 19, ry 26, glansen uppe till höger som i A, en frans vid varje ögas yttre övre kant (den följer locket ner, och de slutna sovbågarna har fransen under); kinder (386, 450) och (642, 449), rx 34, ry 20, `#f3a2a0`; den lilla näsbågen i kod som Olles, `M498 420 Q510.5 404 523 420`, laxrosa `#e39a88`; leendet 477–546 (ändarna 438, botten 457), `#6b3a2a`. Öppen mun `#7a2e2a`, 1,3 gånger Zebbes bredd.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/mamma-mor/premium/uttryck.html) har samma API och namn som Zebbes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?ark=storlek`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(16)`). Olle har ingen `uttryck.html` än, så Zebbes är förlagan. `?film=1` är en 41,8 s testfilm, SKALA 0,675 och zoom 1,48. Renderad: `premium/mor-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/mor-stills.jpg`. Hoppen är lite lägre än barnens (160 px).
>
> **Somnar (C), som Zebbes:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Hon landar **liggande på sidan** (huvudet åt vänster, kinden på händerna, blundar), andas, zzz flyter upp från huvudet, och hon vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-09): två tagningar med bild 1 = `mor-forsta-a.jpg`. Tagning 2 är vald (`premium/original/mor-sover-flow.jpg`, ligger platt); tagning 1 (`mor-sover-flow-b.jpg`) lutar och ser ut att sväva. `premium/original/mor-sover-jamforelse.jpg` visar båda. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/mor-sover.png`, `tunn_kant.py 7,8`. I filmen `SOV = { fil: 'cut/mor-sover.png', cx: 512, botten: 756, skala: 0.95 }`: liggande lika lång (knut till skor) som hon står hög, och kanten 7,8 × 0,95 = 7,4 px som riggen.
>
> Utseendet nedan är v1.

## Utseende
- Form: en högre och smalare, lite sned äggform (huvud och kropp i ett), ungefär 1,4 gånger så hög som Olle. Små armstumpar och korta ben.
- Färger: ljust persikofärgad krita upptill, en enkel senapsgul klänning (`#F4D252`) nedtill, små bruna skor.
- Kännetecken: mörkbrunt hår med en rund knut på toppen och runda rosa kinder som Olle.

## Personlighet
- Varm och lugn. Blir lätt förvånad, men ställer alltid till rätta.

## Röst och repliker
- Röst: mjuk och varm vuxenröst.
- Återkommande replik: *"Varsågod!"*
- Ljud: –

Olles mamma. Sången kallar henne "mor". Första avsnittet: 017.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg (eyes and mouth are drawn in code, the rosy cheeks stay in the art)
```

Bilderna ligger i [`assets/karaktarer/mamma-mor/`](../assets/karaktarer/mamma-mor/): `mor.png` (framifrån, med ansikte), `mor-faceless.png` (utan ögon och mun, kinderna kvar) och `mor-body.png` (utan armar och ben), utklippta i `cut/`. Vridpunkter i `mor-rigg.json`. Ögonen sitter på ungefär (414, 401) och (605, 398) med radie 26, och munnen på (510, 451), ungefär 57 px bred (uppmätt mot den ansiktslösa bilden). Hon är lika stor som Olle i bilden: skala henne till ca 1,4 gånger Olles höjd i scenerna.

**Armar och ben är ritade i kod** (`ritadeDelar`): kroppen klipps fram ur den ansiktslösa bilden och lemmarna ritas med `verktyg/rita-lemmar-manniska.py` (ärm i tröjans/klänningens färg med rund hand, ben med sko, färgerna tagna ur bilden). Kör om den om bilden byts:
`~/.claude/skills/ai-video/.venv/bin/python -I verktyg/rita-lemmar-manniska.py assets/karaktarer/mamma-mor mor`. Förhandsvisning: `assets/karaktarer/olle-mor-rigg.jpg`. De andra utkasten ligger i `utkast/`.

## Prompt
```prompt
A kind mother in the house crayon style: ONE tall, slightly lopsided egg-shaped blob (head and body in one), a bit taller and narrower than a toddler, no black outline, the upper part warm light peach skin wax crayon and the lower part a simple mustard-yellow dress (#F4D252), mottled grainy streaky texture with paper grain and a thin uneven white rim. Dark brown hair with one round bun on top, two round rosy pink cheeks, two round white eyes ringed in black with small black pupils, a small warm smile. Tiny stubby yellow arm nubs, two short peach legs with small brown shoe tips. No jewellery, no apron.
```
