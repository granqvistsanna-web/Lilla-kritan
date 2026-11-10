# Apan Alfons

**Art:** apa · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-10, på Sannas önskan):** ny figur, gjord som Rut och Elsa ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Han har inga v1-bilder: allt ligger i [`assets/karaktarer/apan-alfons/premium/`](../assets/karaktarer/apan-alfons/premium/). Alfons står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 729 px från fötterna till äggets topp i 1024-rutan, öronen räknas inte), alla delar med 10 px vit kant. Kropp, ansiktsfläck (`alfons-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `alfons-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-alfons-v2`, pixeljusterad mot B, förskjutning 0): Sanna valde `premium/original/alfons-forsta-b.jpg` (`-a` är den bortvalda tagningen). Ur B: `alfons-faceless.jpg` (ögon, kinder, mun och näsborrar borta, den tan ansiktsfläcken kvar; `-b` är andra tagningen) och `alfons-body-flow.jpg` (bara kroppen med ansiktsfläcken; `-b` är andra tagningen). Inget plattare steg: armarna ritas ändå. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/apan-alfons/premium/prompter.md). Skripten ligger i `premium/skript/` (`alfons_rot.py`, `alfons_ben.py`, `alfons_arm.py`, `alfons_flackar.py`, krit-rutan i `ruta.json`).
>
> **Delar:** `delar.py` slog ihop höger arm och svansen (de nuddar via den vita kanten), så öronen och svansen klipps om i `alfons_rot.py`. **Öronen** är konstens runda öron med tan insida och en bred rot i brun krita längs kontaktkanten mot huvudet (glipan mellan örat och huvudet fylld med krita), men inte längre upp eller ner än kontakten. De vrids kring en led 40 px in i huvudet, (295, 385) och (719, 381), hälften så mycket som små öron (`ORA = 0,5`). **Svansen** är konstens långa lockiga svans med en lång rot 80 px in mot kroppens mitt (lite tjockare än svansen vid kanten). **Benen** är konstens bruna ben med tan fot och en rot med benets hela bredd 80 px upp under kroppen (`alfons_ben.py`; `langre_rot.py` gav en för smal rot, originalen i `cut/v1/`). **Armarna är ritade** runda bruna stumpar i ett stycke (rot r 23, hand r 30, 85 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt) med konstens mörkare bruna kontur och `-fram`-kopior för klappen och magen (`alfons_arm.py`): konstens armar var kilar längs kroppens sida. **Ansiktsfläcken** är lyft ur kroppen (`alfons_flackar.py`, tan-gränser) och följer ansiktet; kroppen under (`alfons-body-tom.png`) är fylld med brun krita. Fläcken ligger ca 95 px innanför kroppens kant, så ansiktet behöver ingen mask (Ruts kindband behövde en). Ingen mage-fläck. **Näsborrarna ritas i kod:** två sneda rundade streck, `<path class="nasa">` (489–499 × 429–438 och 521–531 × 429–438, `#5e3530`), i ansiktsgruppen. `node verktyg/baka-nasor.mjs` bakar in dem i `cut/alfons-nos.png` (avsnitten laddar bara bilden); fläcken utan näsborrar ligger kvar som `cut/alfons-nos-utan-nasa.png`.
>
> **Ansikte (v2), i kod:** ögon (418, 401) och (601, 400), rx 18, ry 26; kinder (381, 452) och (639, 451), rx 30, ry 18, `#f3a29e`; munnen en enkel båge från (472, 468) till (548, 464) med botten i (510, 490), `#5e3530`, 6 px. Öppen mun `#7a2a1c`, 22 px under uttryckens tal (`MY`). Ögonen tonas aldrig (kläms ihop och byts mot bågen, som Ruts). Blinkningen ur `verktyg/blinka.js` (`skapaBlinka(19)`).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/apan-alfons/premium/uttryck.html) har samma API och namn som Ruts och Elsas (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`). **Armar flyger inte:** samma `GOM` och `UT` som Rut, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel; vinkarmen bakom kroppen, ut förbi kanten; klappen med korta stumpar mot magens kanter. Den lockiga svansen viftar mjukt som Ruts: en lugn gungning och en långsam viftning (±8°) i 0,6 s var 4,5:e sekund. Kontroll: `premium/alfons-armar-overgangar.jpg` visar varje armövergång i filmen i sju steg. `?film=1` är 41,8 s, SKALA 0,5 och zoom 2. Renderad: `premium/alfons-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/alfons-stills.jpg`.
>
> **Somnar (C), som Ruts och Elsas:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över; han landar liggande på magen, andas, zzz flyter upp snett ovanför huvudet, och han vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, 0 krediter, 2026-11-10): två tagningar med prompten i `prompter.md` och B som bild 1. Tagning 1 är vald (`premium/original/alfons-sover-flow.jpg`, ligger på magen som en rund limpa med händerna framför sig, blundar, framifrån, svansen lockad åt sidan); tagning 2 (`alfons-sover-flow-b.jpg`) sitter upp och används inte. `premium/original/alfons-sover-jamforelse.jpg` visar båda bredvid B. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/alfons-sover.png`, `tunn_kant.py 10`. I filmen `SOV = { fil: 'cut/alfons-sover.png', cx: 512, botten: 835, skala: 1.0 }`: Flow ritade huvudet och ansiktsfläcken lika stora som stående (fläcken 320–700 px i båda), så skala 1,0 i stället för 0,86 gör honom lika stor som stående, och kanten blir 10 px som riggen.
>
> Utseendet nedan är beskrivningen från början.

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), två små armstumpar, två korta ben och en lång lockig svans.
- Färger: varmt brun (`#8B5A3C`) med en ljus tan (`#E8C39E`) ansiktsfläck formad som en jordnöt runt ögonen och nosen, runda tan-öron åt sidorna.
- Kännetecken: den jordnötsformade ansiktsfläcken, de runda öronen som sticker ut åt sidorna och den långa lockiga svansen.

## Personlighet
- Nästan alltid i farten. Älskar att klättra och hoppa i träden. Kan inte motstå bananer.

## Röst och repliker
- Röst: kvick, upprymd och lekfull.
- Återkommande replik: *"Titta, en banan!"*
- Ljud: ooh-ooh-ah-ah.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, tail, left ear, right ear (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Alfons the monkey, ONE smooth, slightly lopsided egg-shaped body (head and body in one), warm brown (#8B5A3C) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. A light tan (#E8C39E) face patch shaped like a peanut around the eyes and muzzle, two round tan ears sticking out at the sides, a long curly tail, tiny arm nubs, two short stubby legs. Face directly on the body inside the tan patch: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
