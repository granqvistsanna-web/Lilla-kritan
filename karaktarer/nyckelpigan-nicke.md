# Nyckelpigan Nicke

**Art:** nyckelpiga · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-08, Sannas önskan, v1-låset hävt för det här):** gjord som Mille ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). **Nytt i v2: ett svart huvud** överst på ägget, som en riktig nyckelpiga (formen från den gamla sovbilden: svart mössa med en mjuk spets i mitten), och antennerna växer ur det. Ansiktet sitter på det röda under huvudet. Nicke står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 749 px från fötterna till huvudets topp i 1024-rutan), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/nyckelpigan-nicke/premium/`](../assets/karaktarer/nyckelpigan-nicke/premium/): kropp (med huvudet), antenner (`ear-l`, `ear-r`), armar och ben i `cut/`, vridpunkter i `nicke-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, pixeljusterad): Sanna valde `premium/original/nicke-forsta-c2.jpg`, gjord ur `nicke-forsta-a.jpg` med svart huvud och Milles kritstruktur som referens (`-c1` är systertagningen; `nicke-c-jamforelse.jpg` visar A, C1, C2 och Mille). Ur C2: `nicke-faceless.jpg` och `nicke-body-flow.jpg` (bara kroppen; Flow ritade två extra prickar där ögonen var, så kroppens insida är tagen ur faceless-bilden och bara kanten ur kroppsbilden). `nicke-forsta-b.jpg` och `nicke-b-*.jpg` är en tidigare tagning utan svart huvud, inte vald.
>
> **Delar:** ben och antenner är ombyggda: lemmens egen svarta krita utanför kroppen plus en rund svart rot (lika tjock som lemmen där den möter kroppen) in under kroppen, med vridpunkten i roten, så att ingen röd bit eller vit kantlinje syns när de vrids. **Armarna är ritade runda stumpar** (svart krita ur benet, rund rot r 17, rund hand r 24, 100 px från vridpunkten, 50° under vågrätt så att de hänger i vila): de urklippta armarna hade en rak sida längs kroppens kant som syntes så fort de lyftes. `-fram`-armarna har den vita kanten tonad mot roten. **Armar flyger inte** (Sanna 2026-11-09): en arm syns bara i vila (under ca 26°) eller uppe (över ca 80°). Mellan de lägena glider den 110 px in bakom kroppen och vrids där, gömd (`GOM` i sidan), och uppe glider den ut 36 px och upp 20 px (`UT`), så att roten alltid stannar innanför kroppens kant. Därför är alla lyfta poser höga: vinka 92 ± 12°, hurra 80, sträcker sig efter 92, sträcker på sig 95 (plus uttryckets 16–20). Alla andra poser och rörelser håller sig under 26°: hoppet 16·sin, dansen 8 ± 10, pekar 16, blinkar 22. I riktningsposen får en lyft arm inget extra lyft (roten stannar i kroppen), och kopian glider in bakom kroppen igen, så sträcker sig efter visar en enda arm uppe. Kontroll: `premium/nicke-armar-overgangar.jpg` visar varje övergång i filmen i sju steg, `premium/nicke-strack-sov-strip.jpg` sträcker sig efter, somnar och vaknar var 0,1 s. **Klappen är Milles:** stumparna når inte varandra, så de kommer fram från sidorna och klappar mot magen vid kroppens kanter (`KLAPP`: vinkel −105 + 30·c, 50 − 22·c px in, 10 px ner). Sanna valde bort långa klapparmar (2026-11-08), de såg ut som pinnar över magen.
>
> **Ansikte (v2), i kod på det röda:** ögon (418, 401) och (601, 400), rx 18, ry 26; kinder (378, 460) och (643, 457), rx 33, ry 24, ljusrosa `#f8acb8` som i konsten; ett enda leende 479–541, ändarna i 443 och botten i 465, inget nosstreck. Öppen mun `#4a1418`, mörkare än de andras så att den syns mot det röda. Huvudets underkant ligger vid y ca 303 ovanför ögonen (spetsen 353), så brynen hamnar på det röda.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/nyckelpigan-nicke/premium/uttryck.html) har samma API och namn som Milles (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`). Antennerna är figurens "öron": de släpar efter i hoppet och gungar som öron, följer ansiktet 18 px i riktningsposen, och posens `vick` (Milles svans) lutar dem båda: lugn gungning, en snabb vickning var 4,5:e sekund och i takt med stegen. Kawaii är ett uttryck som hos de andra (W = 520 px, ögon (399, 420) och (620, 419)). `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2. Renderad: `premium/nicke-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/nicke-stills.jpg`.
>
> **Somnar (C), som Milles:** i filmen blir han sömnig och gäspar, gör ett litet hopp (70 px), och i hoppets topp tar den ritade sovbilden över. Han landar liggande på magen med en mjuk studs, andas, zzz flyter upp, och han vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-09): två tagningar med prompten nedan och C2 som bild 1. Tagning 1 är vald (`premium/original/nicke-sover-flow.jpg`, störst och tydligast ansikte), tagning 2 ligger kvar som `nicke-sover-flow-b.jpg` och `nicke-sover-jamforelse.jpg` visar båda. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` (kör med systemets `python3`, den behöver OpenCV) till `cut/nicke-sover.png`, `tunn_kant.py 10`. I filmen `SOV = { fil: 'cut/nicke-sover.png', cx: 512, botten: 814, skala: 1 }`: Flow ritade klistermärket mindre i rutan än Milles, så skala 1 (inte Milles 0,86) ger samma yta som den stående kroppen, och kanten blir 10 px som på riggen. Den gamla `nyckelpigan-nicke-sover.png` är v1 och används inte. Prompt (bild 1 = `premium/original/nicke-forsta-c2.jpg`):
> *Edit Image 1. The same little red ladybird, same flat wax-crayon style, same black head with the soft point in the middle, same seven black spots, same black antennae with dot tips, same thick clean white sticker border, now lying down on his tummy, seen from the front, sleeping peacefully: body low and wide, the black head resting forward, his little black arms folded under his chin, eyes closed as two soft curved lines on the red below the black head, pink blush cheeks, a tiny content smile, antennae relaxed and drooping a little, black feet peeking out behind. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.*
>
> Utseendet nedan är v1.

## Utseende
- Form: en rund, lite sned äggform som står upprätt (huvud och kropp i ett), som de andra figurerna, två tunna svarta antenner med prickar i spetsen, små svarta armstumpar och två korta svarta ben.
- Färger: klarröd (`#E23B2E`) med sju stora svarta prickar runt sidorna och nertill, så att ansiktet är fritt.
- Kännetecken: de sju prickarna och antennerna. Ansiktet sitter direkt på den röda kroppen.
- Sovande pose: `nyckelpigan-nicke-sover.png` (urklipp i `cut/`, OpenArt Nano Banana 2 image2image från referensarket, 2026-11-07). Den ligger på magen med svart huvud med spets i mitten, slutna ögon och leende i bilden (ögon ca (404, 642) och (602, 642), fötterna y 790). I godnattsagan får den stående figuren ett likadant svart huvud i kod.
- Den första versionen (platt skalbagge ovanifrån med svart huvud) ligger kvar som `nyckelpigan-nicke-v1.jpeg` och `-v2.jpeg`.

## Personlighet
- Liten, glad och modig. Räknar gärna sina prickar, och landar på kompisarnas näsor.

## Röst och repliker
- Röst: liten och pipig.
- Återkommande replik: *"En, två, tre … sju prickar!"*
- Ljud: ett litet surr när han flyger, pling när han landar.

## Cut out-delar
```delar
body without arms and legs, antennae, left arm, right arm, left leg, right leg (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/nyckelpigan-nicke/`](../assets/karaktarer/nyckelpigan-nicke/): `nyckelpigan-nicke.png` (vald variant v3, gjord i Google Flow, Nano Banana 2.1, 0 krediter, 2026-11-05, med Hulda och Ludde som stilreferens), `nyckelpigan-nicke-faceless.png` (pixeljusterad, ögon och mun ritas i kod) och utklippen i `cut/`. Övriga varianter ligger kvar som `nyckelpigan-nicke-v*.jpeg`. Kropp utan lemmar och rigg görs med `verktyg/delar.py` när figuren ska animeras.

## Prompt
```prompt
Nicke the ladybird, ONE smooth, slightly lopsided egg-shaped body (head and body in one) standing upright and facing the viewer, bright red (#E23B2E) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. Exactly seven big round black crayon spots around the sides and lower body, leaving the face area clear. Two thin black antennae on top, each ending in a small round dot. Tiny black arm nubs, two short stubby black legs. Face directly on the red body: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
