# Kycklingen Pip

**Art:** kyckling · **Favoritsak:** kyckling 🐥 · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-07):** gjord som Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/kycklingen-pip/premium/`](../assets/karaktarer/kycklingen-pip/premium/): kropp, tofs, vingar och ben i `cut/`, vridpunkter i `pip-rigg.json`. Konsten är gjord i Flow med v1-kycklingen som bild 1: `premium/original/pip-forsta.jpg` (med ansikte), `pip-faceless.jpg` (utan ansikte och utan näbb) och `pip-body.jpg` (bara kroppen), 16:9 och beskurna till 1024-kvadrat (x 604–2140). Det plattare steget hoppades över, så botten har kvar en svag skugga. Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`). Tofsen (tre fjädrar) är en del med en rund rot inne i huvudet, vridpunkt (515, 205). Vingarna är ritade om av en ren kritbit (`rita-lemmar.py`, bit 440,600,536,696, kortare kapsel som hänger nära kroppen, vridpunkter (212, 540) och (812, 533)). Konstens vingar var tunna halvmånar över kroppskanten. Vingarna framför kroppen (`pip-arm-*-fram.png`) har en tunn mörkgul kritlinje i stället för vit kant, annars syns bara kanten mot den gula magen. Utseendet nedan är v1.
>
> **Ansikte (v2), allt i kod:** ögon (405, 401) och (624, 401), rx 21, ry 30; kinder (353, 458) och (675, 458), rx 34, ry 21. Näbben (`#f98d46`) är ritad efter konsten i två halvor, bred rundad överkant 461–568 och spetsen i (516, 477), och leendet är ett streck på näbben (474–555, som i konsten). Öppen mun: undre halvan glider ner (`mun[1]`) över en mörk mun.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/kycklingen-pip/premium/uttryck.html), samma API och namn som Luddes. Tofsen styrs av uttryckens `oron`: medel gör den kortare (hänger) eller längre (reser sig), skillnaden lutar den, och den följer huvudet i riktningsposen. Sover (som Ludde, vald 2026-11-07): ligger på magen med vingarna under hakan (pose `liggMage`, fram-vingarna så att ingen vit kant syns vid roten, näbben fri), slutna u-bågar som ögon, ett andetag var 4:e sekund (`rorelse('ligga', t)`). Den sittande `sover`/`sova` finns kvar. `kawaii` är ett uttryck med stora glittriga ögon (större glans plus en till, parametern `glans`) för förtjusning och förundran, aldrig standardansiktet. **Somnar i filmen (övergång C, vald 2026-11-08):** den ritade sovbilden `premium/original/pip-sover.jpg` (Pip sitter ihopsjunken, utan zzz), urklippt med `sovbild.py` till `cut/pip-sover.png` (kant 12 px, skala 0,82, botten y 895). Pip blir sömnig och gäspar, hukar och gör ett litet hopp, i toppen byts riggen mot sovbilden som landar och studsar in, andas från botten med tre zzz i kod, och hoppar upp igen när den vaknar. `?film=1`: … dansar → somnar och vaknar (9,4 s) → sträcker på sig → vinkar och går ut. Renderad: `premium/pip-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`).

## Utseende
- Form: en nästan perfekt cirkel med pyttesmå vingar och tunna orange ben.
- Färger: solgul (`#FFD23F`), orange näbb och fötter.
- Kännetecken: tre fjädrar som står rakt upp på huvudet som en liten tofs.

## Personlighet
- Den minsta i gänget. Nyfiken och studsig, hoppar hellre än går.
- Blir lätt förvånad: *"Oj!"*

## Röst och repliker
- Röst: hög och pipig.
- Återkommande replik: *"Pip! Oj! Pip pip!"*
- Ljud: små hopp med *boing*.

## Cut out-delar
```delar
round body with head and tuft, beak closed, beak open, front wing, back wing, front leg, back leg, eyes closed
```

Sitter på bänken: `assets/karaktarer/kycklingen-pip/pa-banken/` (utsnitt ur riggen, inga nya bilder, 014).

## Prompt
```prompt
Pip the chick, a tiny fluffy baby chick shaped like an almost perfect circle, sunshine yellow (#FFD23F) with soft crayon scribble texture, three little feathers sticking straight up on top of the head like a tuft, a small orange triangle beak, tiny wings and thin orange legs, small black dot eye and pink blush cheek.
```
