# Blå dinon

**Art:** dinosaurie · **Favoritsak:** dinosaurie 🦕 · **Status:** ⏳ Bilden vald av Sanna, riggen klar men inte godkänd än

Har inget eget namn: i det som sägs och sjungs heter den **"blå dinon"** (033 Borsta, borsta). `dinon-bla` är bara filnamnet.

> **Art direction v2 (2026-11-11, för 033 Borsta, borsta dinosaurier):** gjord som Pim ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Står på två ben, **SKALA 0,5** som de andra tvåbenta (700 px från fötterna till äggets topp i 1024-rutan, kammen sticker upp 126 px ovanför). Riggen ligger i [`assets/karaktarer/dinon-bla/premium/`](../assets/karaktarer/dinon-bla/premium/): kropp, magfläck, kam, armar, ben och svans i `cut/`, vridpunkter i `dinon-bla-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): Sanna valde `premium/original/dinon-bla-1.jpeg` (`-2` till `-4` är bortvalda, `jamforelse.jpg` visar alla). Ur valet, projekt `lk-dinon-bla-v2`: `dinon-bla-faceless.jpg` (ögon, kinder och mun borta, pixeljusterad) och `dinon-bla-body-flow.jpg` (bara ägget med magfläcken). Andra tagningarna ligger kvar som `-b`. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/dinon-bla/premium/prompter.md).
>
> **Delar** (`premium/skript/bla_delar.py`, sedan `verktyg/klapparm.py … dinon-bla 0.85`): alla delar har **6 px vit kant** (1 % av kroppens höjd, räknad om från färgytan; scenens `verktyg/kant.js` lägger på resten). **Kammen** (`ear-l`, så att den följer motorns öron) är konstens mörkblå krita och ligger **framför kroppen** med roten på hjässan, som i bilden; den har vit kant bara där den sticker ut utanför kroppen. **Svansen** är konstens mörkblå krita utanför kroppen med lång rundad rot (80 px in under kroppen mot dess mitt). **Benen** är konstens ben med lång rot rakt upp i benets egen krita. **Armarna är ritade**: konstens armar är tunna fenor, så de är runda stumpar i ett stycke i kroppens ljusblå krita (rot r 23, hand r 30, 85 px, vridpunkten 12 px innanför kroppens kant), med `-fram`-kopior (kanten tonad mot roten) och `-klapp`-kopior (bara handen, 15 % mörkare). **Magfläcken** är lyft ur kroppen till `cut/dinon-bla-mage.png` och följer ansiktet till 40 %; kroppen under (`body-tom`) är fylld med kroppens krita.
>
> **Vridpunkter:** kam (500, 263), svans (649, 797), armar (275, 580) och (712, 580), ben (428, 809) och (578, 800).
>
> **Ansikte, i kod** (mätt med `ansikte_matt.py`): ögon (409, 405) och (567, 405), rx 19, ry 26, nästan svarta `#2a1d1a` med vit glans; kinder (379, 454) och (598, 453), rx 28, ry 16, `#f3a0b4`; munnen ett litet mörkblått U kring (488, 453), 58 px brett. Ansiktets mitt är x 488 (ägget lutar lite).
>
> **Uttryck, poser och rörelser:** [`premium/uttryck.html`](../assets/karaktarer/dinon-bla/premium/uttryck.html) har samma API och namn som Pims (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=ga|hoppa|klappa|dansa|skaka|nicka|borsta`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(33)`). Armar i ett stycke som glider in och ut bakom kroppen, inga snurr, lugna hopp. **Kammen** släpar mjukt (±8° i hoppet, följer ansiktet 18 px i riktningsposen). **Svansen** är lång och rör sig lite: gungar ±3°, ±4° i gången och dansen, och släpar efter i höjdled i hoppet och dansen (högst 6°, `slap()` i sidan). `?film=1` är en 35,6 s testfilm (går in, vinkar, väntar, lyssnar, sträcker sig, hurra, klappar, hoppar, dansar, vinkar, går ut); `rigg-test.html` pekar dit. Stillbilder: `premium/dinon-bla-stills.jpg`. `ryck.mjs dinon-bla` ger inga ryck.
>
> **Sover inte än:** poserna `sover` och `liggMage` och sovbilden saknas (en sovande figur ska ligga ner, och det kräver en egen bild som Pims).
>
> **Tandmunnen och borstposen (för borstasången):** samma namn och parametrar som kattens, kaninens och pandans, ur `verktyg/rigg-motor.js`: uttrycken `gapar` och `flinar`, `tand`, `tunga`, `tander: [8]` (0 matt … 1 vit), `glimt`, posen `borstar` (`borste`, `borstV`, `borstX`, `borstY`, `borstNer`, `skum`) och `ROR.borsta` (hela slingan eller en del: `'upp'`, `'skrubba'`, `'uppe'`, `'nere'`, `'klar'`). **Egna tänder:** de två mittersta i övre raden är mjukt spetsiga (`tandmun(id, '#b8545e', { spetsiga: [1, 2] })`), resten runda. **Mått:** gapet 118 × 73 px (`mun: [59, 50, 0.55, 470]` med `MY` −8: y 439–512), samma storlek mot ansiktet som pandans (118 px på 158 px mellan ögonen mot 136 på 182), under leendet, mellan kinderna och 27 px ovanför magfläcken. Tandleendet `mun: [56, 29, 1, 456]`, bara övre raden. Borstarmen: `BORSTARM = { axel: 130, L: 121, lut: -20 }`. Borstens bild är tills vidare den turkosa (`rekvisita/tandborsten`); den gröna finns inte än. Provbilder: `avsnitt/033-borsta-borsta-dinosaurier/provbild/`.

## Utseende
- Form: en hög, lite sned äggform (huvud och kropp i ett) med en rund kam som böjer sig bakåt från hjässan, korta armstumpar, två ben med runda fötter och en lång svans som svänger ut åt höger.
- Färger: klarblå (`#89C9EC`, djupare nedtill `#4496C5`), ljusblå magfläck (`#C0E5F8`), kam och svans i mörkare blå (`#4984BC`), rosa kinder.
- Kännetecken: kammen på huvudet, den långa mörkblå svansen och den runda ljusa magen.

## Personlighet
- Glad och nyfiken. Lugn i rörelserna.

## Röst och repliker
- Röst: ingen (säger inget i 033).
- Återkommande replik: –
- Ljud: ett kort, mjukt, glatt "rar" (finns inte i ljudbanken än, se 033:s README).

## Cut out-delar
```delar
egg-shaped body with tummy patch, crest, left arm, right arm, left leg, right leg, tail (eyes, cheeks and mouth are drawn in code)
```

## Prompt
```prompt
A little blue dinosaur, ONE tall, smooth, slightly lopsided egg-shaped body (head and body in one), clear bright blue with a round pale light blue tummy patch, soft wax crayon with fine paper grain, slightly lighter at the top and deeper at the bottom, no dark outline, a clean white sticker border. On the top of the head one long soft rounded crest in a deeper blue that curves up and back to the right like a smooth tuft. A long slim tail in the same deeper blue curving out at the lower right with a rounded curled tip. Two short rounded blue arm nubs at the sides, two short blue legs with big round feet. Face directly on the body: two black oval eyes with one tiny white shine dot each, soft pink round blush cheeks and a small happy smile. Friendly, soft and gentle, nothing sharp. Very minimal.
```
