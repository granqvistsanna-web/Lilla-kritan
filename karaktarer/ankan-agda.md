# Ankan Agda

**Art:** anka · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-07):** gjord som Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/ankan-agda/premium/`](../assets/karaktarer/ankan-agda/premium/): kropp, vingar, ben och stjärtfjäder i `cut/`, vridpunkter i `agda-rigg.json`. Konsten gjordes i Flow med v1-ankan som bild 1 (prompterna i `premium/prompter.md`): `original/agda-forsta.jpg` (med ansikte, redan platt nog), `agda-faceless.jpg` (utan ögon, kinder och näbb) och `agda-body.jpg`. Alla delar har 10 px vit kant (`tunn_kant.py`). Vingarna är ritade om av en ren kritbit (`rita-lemmar.py --bara arm`, bit 440,600,560,720, axlar 234,566 och 784,566): konstens vingar var tunna kilar längs kroppskanten. Konstens vingar ligger kvar i `cut/konst/`. Höger vinge och stjärtfjädern rörde vid varandra och delades för hand vid y 630.
>
> **Ansikte (v2):** ögon (416, 402) och (600, 402), rx 18, ry 26; kinder (353, 452) och (664, 451). **Näbben är en egen del** som följer ansiktet, inte en del av kroppen: inbakad i kroppen skulle den bli kvar när ansiktet glider 36 px i riktningsposen och gången. Den är klippt ur `agda-platt.png` i två bitar längs munlinjen (y ≈ 472): `cut/agda-nabb-over.png` och `agda-nabb-under.png`. När hon pratar sänks undernäbben `mun[1] × 1,1` px och en mörk mun syns i glipan. Leendet sitter i näbbens konst, så `le`, `leBred` och `streck` gör inget på ankan.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/ankan-agda/premium/uttryck.html), samma API som Ludde. Ankan har inga öron. Gången vaggar mer (`luta 7·f` i stället för 4), och rörelsen `kvacka` (1,6 s, två snabba näbbslag med en liten studs) ligger i testfilmen efter vinkningen. Sovposen (vald 2026-11-07) är som Luddes: hon ligger på magen med vingarna under hakan, uttrycket `sover` (slutna u-bågar, `sov`), posen `liggMage` och rörelsen `ligga` (ett lugnt andetag per 4 s). Ankan är bredare än lammet, så vingarna sitter längre in och mer snett (`armar −125`, `klapp 140`) för att hamna under hakan utan att röra näbben. I testfilmen blir hon sömnig sittande, lägger sig, sover, vaknar, sträcker på sig och vinkar. Renderad: `premium/agda-testfilm.mp4`. `kawaii` (stora ögon, stängd näbb) är bara ett uttryck för förtjusning och förundran, aldrig standardansiktet; i testfilmen syns det en gång, när hon sträcker sig efter något. Stjärtfjädern har en liten rund rot inne i kroppen, och vingarnas framför-kopior (`-fram`) har en tunn mörkare kritkant i stället för vit kant. Utseendet nedan är v1.

## Utseende
- Form: rund droppform, liten rund huvud, platt bred näbb och stora platta fötter.
- Färger: smörgul (`#FAD966`) med orange (`#F26B1D`) näbb och fötter. Omfärgad från krämvit i kod 2026-11-04; originalen ligger i `assets/karaktarer/ankan-agda/kram/`.
- Kännetecken: en liten krullig fjäder i stjärten och en vagga när hon går.

## Personlighet
- Pratglad och lite bossig, men alltid snäll. Älskar vattenpölar och dammen.

## Röst och repliker
- Röst: snabb och kvackig.
- Återkommande replik: *"Kvack-kvack! Följ mig!"*
- Ljud: kvack, plask, flipp-flopp med fötterna.

## Cut out-delar
```delar
round body with head, beak closed, beak open, front wing, back wing, front foot, back foot, curly tail feather, eyes closed
```

## Prompt
```prompt
Agda the duck, a round soft butter-yellow (#FAD966) duck shaped like a soft teardrop, with a thin chalky light edge so she shows on white, a wide flat orange beak (#F26B1D), big flat orange feet, a little curly feather at her tail, small black dot eyes in white circles and a cheerful smile.
```
