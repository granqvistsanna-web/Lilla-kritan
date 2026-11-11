# Dinon Disa

**Art:** dinosaurie · **Favoritsak:** dinosaurie 🦕 · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-09):** gjord som Kanel ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`), lite mjukare kritstruktur och lite mer djup än Kanel (Sannas önskan): ljusare lila upptill, djupare lila nedtill och på svans, taggar och ben. Disa står på två ben och är en **stor figur: SKALA 0,5** (kroppen ca 712 px från fötterna till äggets topp, ryggtaggarna oräknade), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/dinon-disa/premium/`](../assets/karaktarer/dinon-disa/premium/): kropp (med mage och ryggtaggar), armar (`-fram`-kopior för armar framför kroppen), ben och svans i `cut/`, vridpunkter i `disa-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/dinon-disa/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna, blundar och lägger sig på sidan och sover; svansen viftar). Öron, svans och ben har lång rot i egen färg (`verktyg/langre_rot.py`, originalen i `cut/v1/`).
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): `premium/original/disa-forsta-a.jpg` (gamla Disa som figurreferens, Kanels platta v2 som stilreferens) → `disa-djup.jpg` (mindre kritstruktur, mer djup, **vald**) → `disa-faceless.jpg` och `disa-body-flow.jpg`. Armarna i konsten var tunna kilar och är omritade med `verktyg/rita-lemmar.py … 280,460,376,556 --bara arm --armlangd 0.55` (originalen i `cut/v1/`).
>
> **Ansiktet i kod** (mätt med `ansikte_matt.py`): ögon (418, 403) och (603, 402) rx 19 ry 27, kinder (383, 455) och (639, 454) rx 28 ry 17, munnen ett leende `M477 459 Q514 484 551 459`, öppen mun en ellips på (514, 470). Ingen nos- eller magfläck: magen sitter i kroppen. Uttryck- och posesidan (`uttryck.html`) kom 2026-11-11, se nedan.
>
> **Uttryck, poser, rörelser och tandmun (v2, 2026-11-11, för 033 Borsta, borsta dinosaurier):** [`premium/uttryck.html`](../assets/karaktarer/dinon-disa/premium/uttryck.html) finns nu, med samma API och namn som blå dinons och Pims (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=ga|hoppa|klappa|dansa|skaka|nicka|borsta`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(34)`). **Utseendet är orört:** samma delar och vridpunkter som förut (`cut/`, `disa-rigg.json`), magen och ryggtaggarna sitter kvar i kroppen. Det enda nya i `cut/` är `disa-arm-l-klapp.png` och `-r-klapp.png` (`verktyg/klapparm.py … disa 0.85`, bara handen, för klappen framför bröstet). Inga öron, så `oron` används inte. Svansen gungar lugnt, ±6° i gången och dansen. Poserna `sover` och `liggMage` finns inte i sidan (`rigg-test.html` har kvar sin liggande sömn). I 033 heter figuren **"lila dinon"**.
>
> **Tandmunnen och borstposen:** ur `verktyg/rigg-motor.js`, samma namn som de andras (`gapar`, `flinar`, `tand`, `tunga`, `tander: [8]`, `glimt`, posen `borstar`, `ROR.borsta`). **Små runda pärltänder:** alla åtta runda (`tandmun(id, '#b8545e')`, ingen `form`). Gapet 136 × 77 px (`mun: [68, 53, 0.55, 472]` med `MY` 6: y 454–531), samma storlek mot ansiktet som pandans, under leendet, mellan kinderna och strax ovanför magfläcken (540). Tandleendet `mun: [64, 32, 1, 456]`. Borstarmen `BORSTARM = { axel: 130, L: 88, lut: -20 }`: armen är kort, så dess vridpunkt glider in till borstens grepp. Klappen: `KLAPPNY = { kontakt: [-144, 216], oppen: [-126, 176], y: -45, spets: 23 }`. Provbilder: `avsnitt/033-borsta-borsta-dinosaurier/provbild/lila-dinon-…`.

## Utseende
- Form: en rund, lite sned päronformad klump där huvud och kropp är en form, en kort tjock svans och en kort rundad hals som knappt syns.
- Färger: mjukt lila (`#B9A2E0`) med en rad runda rygg-taggar i mörkare lila (`#8E72C9`), ljus lila mage.
- Kännetecken: de runda taggarna längs ryggen som små bullar, och stora platta fötter som stampar.

## Armar, ben och väst i kod (006)
- Armarna och benen är ritade i kod sedan 006 (`verktyg/rita-lemmar-dino.py`, riggen `assets/karaktarer/dinon-disa/dinon-disa-rigg-lemmar.json`): korta pinnar med runda tassar och tre små klor, och stora platta fötter med tånaglar i mörklila `#8E72C9`. 005:s rigg (`dinon-disa-rigg.json`) är orörd.
- Flytvästen i båten är ritad i kod (`väst()` i `avsnitt/006-orange-baten/storyboard/bygg.py`): öppen, två framstycken i mörkare orange `#D65414` över axlarna och ner längs sidorna, ett vitt reflexband, magen fri.

## Personlighet
- Glad, lite klumpig och älskar att dansa. Stampar i takt så att det dunsar.
- Är aldrig läskig: rundad, mjuk och liten, ungefär lika stor som grodan.

## Röst och repliker
- Röst: mjuk och lite hes, skrattar gärna.
- Återkommande replik: *"Rawr! Dunk, dunk!"* (ett snällt litet rawr, inget vrål)
- Ljud: dunk när fötterna stampar.

## Cut out-delar
```delar
round pear-shaped body with head, tail, front arm, back arm, front leg, back leg, eyes closed, mouth open
```

## Prompt
```prompt
Disa the little dinosaur, one round slightly lopsided pear-shaped blob where head and body are one shape, soft lilac (#B9A2E0) with a light lilac belly, a row of small round darker lilac (#8E72C9) bumps along the back like little buns, a short thick tail, tiny stubby arms and short legs with big flat round feet, small black dot eyes and a big friendly smile, cute and gentle, not scary at all.
```
