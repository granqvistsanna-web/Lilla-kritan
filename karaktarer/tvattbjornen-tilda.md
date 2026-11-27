# Tvättbjörnen Tilda

**Art:** tvättbjörn · **Favoritsak:** – · **Status:** ⏳ Bilden vald av Sanna (B, 2026-11-27), riggen klar men inte godkänd än

> **Art direction v2 (2026-11-27, för 061 Tvättbjörnen bygger i sanden):** gjord som Pim och Rut ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Tvåbent, **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen ca 745 px från fötterna till äggets topp i 1024-rutan, öronen sticker upp ovanför), alla delar med 10 px vit kant i `cut/` och 6,5 px i `cut-tunn/` (som `uttryck.html` använder). Riggen ligger i [`assets/karaktarer/tvattbjornen-tilda/premium/`](../assets/karaktarer/tvattbjornen-tilda/premium/): kropp, ansiktsfläck (`tilda-nos.png`), mage, öron, armar, ben och svans i `cut/`, vridpunkter i `tilda-rigg.json`. Hon har inga v1-bilder.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-27): tre provbilder ur första tagningen (`premium/original/tilda-forsta-a/-b/-c.jpg`, jämförelse i `tilda-forsta-jamforelse.jpg`). **Sanna valde B**: masken i två rundade svarta fläckar med vita ögon, så att ögonen syns mot det svarta. Ur B: `tilda-faceless.jpg` (ögon, kinder, mun och nosen borta, masken jämnt svart; pixeljusterad, 0,85 % skiljer; `-b` är andra tagningen), `tilda-body-flow.jpg` (bara kroppen med mask, krämpartier och mage; `-b` gjorde om masken och används inte) och `tilda-sover-flow.jpg` (ihoprullad framifrån med den randiga svansen som filt, blundar; `-b` ligger på sidan och används inte). Prompterna står i [`premium/prompter.md`](../assets/karaktarer/tvattbjornen-tilda/premium/prompter.md). De tre bilderna från 2026-11-25 visade ett hjul och ligger i `premium/aldre/`.
>
> **Delar** (`premium/skript/tilda_delar.py`, efter `delar.py --egen-kant --oron-svans`, som slog ihop höger arm, svansen och höger ben): **öronen och svansen** är konstens pixlar utanför kroppen (grått, svart, krämen i örat) med **lång rundad rot** (80 px in under kroppen mot dess mitt, grå krita). **Benen och armarna är ritade** (som Ruts): benen svarta kapslar från roten 80 px upp under kroppen med en oval fot som pekar lite utåt; armarna grå stumpar i ett stycke med konstens mörkare grå kontur och svart spets (rot r 23, hand r 30, 85 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt), med `-fram`- och `-klapp`-kopior (`klapparm.py`). Den svarta kritan är tagen mitt i masken (konstens ben gav synliga skarvar). **Masken, krämranden ovanför och krämnosen** tas ur faceless till `cut/tilda-nos.png` och följer ansiktet; **magen** till `cut/tilda-mage.png` och följer 40 %; kroppen under (`tilda-body-tom.png`) är fylld med grå krita. Masken går ut till kroppens kant, så ansiktet maskas med kroppens fyllning (`cut/tilda-kropp-mask.png`, som Ruts kindband).
>
> **Ansikte (v2), i kod:** ögonen vita (`#fbf8f2`, rx 27, ry 30) i (410, 399) och (608, 399) med nästan svart pupill (rx 19, ry 22) och vit glans; kinderna (380, 453) och (639, 452), rx 32, ry 20, rosa på masken; nosen en mjuk svart form 486–536 × 442–468; munnen ett kort streck från nosen till ett ω 474–548 (ändarna y 478, mitten 480, bågarnas botten 494). På den svarta masken syns mörka linjer inte, så **glada bågar, slutna ögon och brynen är krämvita** (`#f6f0e6`), och brynen sitter lägre än Pims (44 px över ögat) så att de stannar på masken. Öppen mun `#7a2a1c`, `MY` 24.
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/tvattbjornen-tilda/premium/uttryck.html) är Pims sida med tvättbjörnens mått: samma API och namn (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(31)`). Den randiga svansen gungar lugnt och viftar mjukt (±8°) i 0,6 s var 4,5:e sekund. Klappen: händerna möts på det grå bandet mellan krämnosen och magen (`KLAPPNY.y` 10). `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2, med sovbilden (`SOV = { fil: 'cut-tunn/tilda-sover.png', cx: 548, botten: 886, skala: 0.85 }`). Renderad: `premium/tilda-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`).
>
> **Inte gjort än:** posen `borstar` (tandborsten) är Pims mått och inte anpassad. Ljudfamiljen (8 känslor) görs i 061:s grind 4.

## Utseende
- Form: en rund äggform (huvud och kropp i ett), två små armstumpar, två korta ben, två runda öron och en tjock randig svans.
- Färger: varmt grå (`#9A949C`) med en svart (`#2A2426`) mask i två rundade fläckar runt ögonen, en krämvit (`#F6F0E6`) rand ovanför masken, krämvit nos och mage, svarta strumpor och armspetsar, svansen randig grå och svart.
- Kännetecken: den svarta masken med de vita ögonen, den randiga svansen och de små svarta händerna.

## Personlighet
- Pysslig och nyfiken. Tvättar gärna saker (och tassarna) i vattnet. Gillar att hitta och samla små skatter.

## Röst och repliker
- Röst: pigg, lite kvittrig och glad.
- Återkommande replik: *"Titta vad jag hittade!"*
- Ljud: ett litet glatt kvitter.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, left ear, right ear, tail (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Tilda the raccoon, ONE smooth, slightly lopsided egg-shaped body (head and body in one), warm grey (#9A949C) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. A raccoon mask of two soft rounded black (#2A2426) patches around the eyes joined over the nose, a cream-white (#F6F0E6) stripe above the mask, a cream-white muzzle and tummy, two small round grey ears with cream insides, a thick tail with grey and black rings, black socks on the legs and black-tipped arm nubs, a small black nose. Face directly on the body: two round white eyes with big black pupils and a shine dot inside the mask, pink cheeks on the mask and a small happy smile. Very minimal.
```
