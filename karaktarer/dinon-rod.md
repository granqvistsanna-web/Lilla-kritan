# Röda dinon

**Art:** dinosaurie (trehornad) · **Favoritsak:** dinosaurie 🦕 · **Status:** ⏳ Bilden vald av Sanna, riggen klar men inte godkänd än

Har inget eget namn: i det som sägs och sjungs heter den **"röda dinon"** (033 Borsta, borsta). `dinon-rod` är bara filnamnet. Den är den stora i filmen (ca 1,3 gånger lila dinon) och den med de stora tänderna.

> **Art direction v2 (2026-11-11, för 033 Borsta, borsta dinosaurier):** gjord som blå dinon ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Står på två ben; kroppen 212–822 och fötterna till 918 i 1024-rutan (706 px hög utan skölden, som sticker upp 88 px ovanför hjässan). I riggen samma SKALA 0,5 som de andra; i 033 ritas den 1,3 gånger så stor. Riggen ligger i [`assets/karaktarer/dinon-rod/premium/`](../assets/karaktarer/dinon-rod/premium/): delar i `cut/`, vridpunkter i `dinon-rod-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): Sanna valde `premium/original/dinon-rod-vald.jpeg` (tagning 2 av de tre korallröda, `dinon-rod-1…3.jpeg`). Ur valet, projekt `lk-dinon-rod-v2`: `dinon-rod-faceless.jpg` (ögon, kinder och mun borta, pixeljusterad) och `dinon-rod-body-flow.jpg` (bara ägget med magfläcken). Andra tagningarna ligger kvar som `-b`. Alla prompter står i [`premium/prompter.md`](../assets/karaktarer/dinon-rod/premium/prompter.md).
>
> **Delar** (`premium/skript/rod_delar.py`, sedan `verktyg/klapparm.py … dinon-rod 0.85`): 6 px vit kant (1 % av kroppens höjd; scenens `verktyg/kant.js` lägger på resten). **Skölden** (`ear-l`) är konstens mörkröda båge med tre prickar och ligger **bakom kroppen**, fylld med samma krita in under kroppens övre del; den vickar bara lite. Flow ritade äggets topp högre och bredare än i konsten, så kroppen är klippt där skölden och dess prickar syns i den valda bilden. **Pannhornen** (`ear-r`, en bild med båda) och **noshornet** (`nos`) är konstens gräddvita horn ur den valda bilden, med mjuk kant utan vitt. De ligger **framför kroppen**: pannhornen följer ansiktet 18 px åt sidan som öron, noshornet hör till ansiktet och ligger ovanpå munnen. **Svansen** är konstens mörkröda krita med lång rundad rot in under kroppen. **Benen** är konstens ben med lång rot rakt upp i egen krita. **Armarna är ritade** stumpar i ett stycke i kroppens krita (som blå dinons), med `-fram`- och `-klapp`-kopior. **Magfläcken** är lyft ur kroppen till `cut/dinon-rod-mage.png` och följer ansiktet till 40 %.
>
> **Vridpunkter:** sköld (505, 426), pannhorn (504, 314), svans (688, 794), armar (249, 590) och (779, 590), ben (416, 799) och (618, 799).
>
> **Ansikte, i kod** (mätt med `ansikte_matt.py`): ögon (417, 402) och (602, 401), rx 20, ry 29, nästan svarta `#2a1d1a` med vit glans; kinder (385, 456) och (641, 455), rx 29, ry 17, `#f6a7b7`; munnen ett brett leende 435–589 × 458–508, mörkbrunt `#3a2420`. Noshornet 472–543 × 360–454.
>
> **Uttryck, poser och rörelser:** [`premium/uttryck.html`](../assets/karaktarer/dinon-rod/premium/uttryck.html) har samma API och namn som blå dinons och Pims (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=ga|hoppa|klappa|dansa|skaka|nicka|borsta`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(35)`). Armar i ett stycke som glider in och ut bakom kroppen, inga snurr, lugna hopp. Skölden vickar en fjärdedel av vad öron gör. Svansen är kort och tjock: gungar ±3°, ±6° i gången och dansen, och släpar lite efter i höjdled (`slap()` i sidan). `rigg-test.html` pekar på `?film=1`.
>
> **Sover inte än:** poserna `sover` och `liggMage` och sovbilden saknas (en sovande figur ska ligga ner, och det kräver en egen bild).
>
> **Tandmunnen och borstposen (för borstasången):** samma namn och parametrar som de andras, ur `verktyg/rigg-motor.js`. **De stora tänderna:** gapet är 170 × 91 px (`mun: [85, 63, 0.55, 466]` med `MY` 21: y 459–550) mot de andras 118–136 px, så varje tand är ca 36 × 22 px. Alla fyra i övre raden har en mjuk, trubbig spets (`tandmun(id, '#a8434d', { mjuka: [0, 1, 2, 3] })`), de fyra nere är runda. Formen `mjuka` är ny i `verktyg/rigg-motor.js` (tre rader): kattens `spetsiga` såg vassa ut i den här storleken. Gapets överkant ligger 5 px under noshornets spets (454) och underkanten går 12 px in över magfläckens överkant (538); kinderna ligger precis utanför mungiporna. Tandleendet `mun: [80, 36, 1, 446]`, bara övre raden. Borstarmen: `BORSTARM = { axel: 130, L: 121, lut: -20 }`. Borstens bild är tills vidare den turkosa (`rekvisita/tandborsten`); den gröna och den stora finns inte än. Provbilder: `avsnitt/033-borsta-borsta-dinosaurier/provbild/roda-dinon-…`.

## Utseende
- Form: en bred, rund, lite sned äggform (huvud och kropp i ett) med en låg bågformad sköld bakom hjässan, tre runda horn, korta armstumpar, två ben med platta fötter och en kort tjock svans åt höger.
- Färger: korallröd (`#F4927C` upptill, `#E35E4F` nedtill), ljust rosa mage (`#F7DACF`), sköld och svans i djupare rött (`#C04740`) med tre ljusa prickar på skölden, gräddvita horn (`#F7E7D0`), rosa kinder.
- Kännetecken: skölden med prickar, de tre gräddvita hornen (två i pannan, ett litet mitt i ansiktet) och den stora munnen.

## Personlighet
- Snäll, lugn och lite förvånad. Störst av dinosaurierna men aldrig läskig.

## Röst och repliker
- Röst: ingen (säger inget i 033).
- Återkommande replik: –
- Ljud: ett kort, mjukt, mörkt "rar", mer brum än ryt (finns inte i ljudbanken än, se 033:s README).

## Cut out-delar
```delar
egg-shaped body with tummy patch, dotted shield behind the head, two forehead horns, nose horn, left arm, right arm, left leg, right leg, tail (eyes, cheeks and mouth are drawn in code)
```

## Prompt
```prompt
A little coral red three-horned dinosaur, ONE wide, round, slightly lopsided egg-shaped body (head and body in one), soft coral red with a round pale pink-cream tummy patch, soft wax crayon with fine paper grain, slightly lighter at the top and deeper at the bottom, no dark outline, a clean white sticker border. Behind the very top of the head a low smooth crescent-shaped shield in a deeper red with three pale round dots on it. Three short, chunky, rounded horns in creamy white like soft cones with round tips: one small one in the middle of the face above the mouth, and two a little longer on the forehead pointing up and slightly outwards. A short thick tail in the deeper red at the lower right. Two short rounded red arm nubs at the sides, two short red legs with big flat feet. Face directly on the body: two black oval eyes set wide apart with one tiny white shine dot each, soft pink round blush cheeks and a wide gentle smile below the small horn. Friendly, soft and gentle, nothing sharp, every tip is round. Very minimal.
```
