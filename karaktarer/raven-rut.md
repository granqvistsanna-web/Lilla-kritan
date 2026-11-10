# Räven Rut

**Art:** räv · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-09, på Sannas önskan):** gjord som Zebbe och Lova ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Rut står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 729 px från fötterna till äggets topp i 1024-rutan, öronen sticker upp ovanför), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/raven-rut/premium/`](../assets/karaktarer/raven-rut/premium/): kropp, kindband (`rut-nos.png`), mage, öron, armar, ben och svans i `cut/`, vridpunkter i `rut-rigg.json`. Han har inga v1-bilder.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-rut-v2`, pixeljusterad): Sanna valde `premium/original/rut-forsta-b.jpg` (`-a` är den bortvalda tagningen). Ur B: `rut-faceless.jpg` (ögon, kinder, mun och den svarta nosen borta, kindbandet kvar; `-b` är andra tagningen) och `rut-body-flow.jpg` (bara kroppen, med kindband och mage; `-b` är andra tagningen). Inget plattare steg: armarna ritas ändå. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/raven-rut/premium/prompter.md). Flow ritade ansiktet på samma mall som Kanels och Zebbes.
>
> **Delar** (skripten i `premium/skript/`): `delar.py` slog ihop höger arm, svansen och höger ben (de nuddar via den vita kanten), så `rut_delar.py` delar den biten efter läge. Öron och svans är ur konsten med **lång rot** (`langre_rot.py`, 80 px i delens egen färg) och rensade från små spetsar och hack vid den gamla äggkanten (`rut_rensa.py`; svansens nedre hörn, där benet skars bort, fylls med sitt konvexa hölje). **Benen och armarna är ritade** (som Zebbes), eftersom Flow-kroppen går längre ner än det ansiktslösa ägget: benen mörkbrun krita med oval fot som pekar lite utåt och roten 80 px upp under kroppen (`rut_ben.py`), armarna runda orange stumpar med mörkbrun spets och konstens mörkare orange kontur (rot r 23, hand r 30, 85 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt), med `-fram`-kopior för klappen och magen (`rut_arm.py`). **Kindbandet och magen** är lyfta ur kroppen (`rut_flackar.py`, krämgränser: `flackar.py` räknar den orange kritan som rosa): kindbandet följer ansiktet, magen 40 %, och kroppen under (`rut-body-tom.png`) är fylld med orange krita. Kindbandet går nästan ut till kroppens kant, så ansiktet maskas med kroppens fyllning (`cut/rut-kropp-mask.png`) och sticker aldrig ut när det glider åt sidan. **Nosen ritas i kod** som Lages och Lovas: en mjuk kubisk form, `<path class="nasa">` 485–535 × 444–474, `#2f2120`, i ansiktsgruppen. `node verktyg/baka-nasor.mjs` bakar in den i `cut/rut-nos.png` (avsnitten laddar bara bilden); kindbandet utan nos ligger kvar som `cut/rut-nos-utan-nasa.png`.
>
> **Armar flyger inte** (som Zebbes): samma `GOM` och `UT`, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel. **Klappen** är kantklappen med korta stumpar mot magens kanter. Kontroll: `premium/rut-armar-overgangar.jpg` visar varje övergång i filmen i sju steg.
>
> **Ansikte (v2), i kod:** ögon (419, 403) och (601, 402), rx 18, ry 26; kinder (382, 452) och (639, 453), rx 29, ry 18, `#f5a9ab`; ett streck från nosen ner till ett litet W (474–546, mitten i (510, 492)), mörkbrunt `#3a2a22`. Öppen mun `#7a2a1c`. Ögonen tonas aldrig (kläms ihop och byts mot bågen, som Zebbes).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/raven-rut/premium/uttryck.html) har samma API och namn som Zebbes och Lovas (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(18)`). Den yviga svansen viftar mjukt: en lugn gungning och en långsam viftning (±8°) i 0,6 s var 4,5:e sekund. `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2. Renderad: `premium/rut-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/rut-stills.jpg`.
>
> **Somnar (C), som Zebbes:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Han landar ihoprullad med en mjuk studs, andas, zzz flyter upp ovanför huvudet, och han vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-09): två tagningar med prompten nedan och B som bild 1. Tagning 2 är vald (`premium/original/rut-sover-flow.jpg`, ligger ihoprullad med svansen som en filt och huvudet vilande, blundar); tagning 1 (`rut-sover-flow-b.jpg`) sitter upp och används inte. `premium/original/rut-sover-jamforelse.jpg` visar båda bredvid B. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/rut-sover.png`, `tunn_kant.py 11,6` (krämen värmd före med Zebbes `skript/varm.py`, annars äts svansspetsen). I filmen `SOV = { fil: 'cut/rut-sover.png', cx: 512, botten: 850, skala: 0.86 }`, kanten 11,6 × 0,86 = 10 px som riggen. Prompt (bild 1 = `premium/original/rut-forsta-b.jpg`):
> *Edit Image 1. The same little fox, same flat wax-crayon style, same bright orange egg-shaped body, same cream cheek band across the face, same cream tummy, same pointed ears with dark brown tips, same small black nose, same dark brown legs, same big bushy orange tail with a white tip, same thick clean white sticker border, now curled up lying down, seen from the front, sleeping peacefully: body low and round like a soft curled-up ball, the head resting forward, the big bushy tail wrapped around the front of his body like a cosy blanket with the white tip near his cheek, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile, ears relaxed. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.*

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), två små armstumpar, två korta ben, en stor yvig svans och två spetsiga öron.
- Färger: knallorange (`#E8742C`) med krämvita (`#FBF3E6`) kinder och mage, mörkt bruna (`#4A2E22`) strumpor på benen och en svart näsa.
- Kännetecken: de spetsiga öronen med mörka toppar, den stora yviga svansen med vit spets och de mörka strumporna på benen.

## Personlighet
- Nyfiken på allt. Smyger och kikar fram bakom träd. Älskar kurragömma.

## Röst och repliker
- Röst: fnissig, kvick och smått hemlighetsfull.
- Återkommande replik: *"Hittar du mig?"*
- Ljud: ett litet glatt gläfs.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, left ear, right ear, tail (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Rut the fox, ONE smooth, slightly lopsided egg-shaped body (head and body in one), bright orange (#E8742C) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. Cream-white (#FBF3E6) cheeks and tummy, two pointed ears with dark tips, a big bushy tail with a white tip, dark brown (#4A2E22) socks on the legs, a small black nose, tiny arm nubs, two short stubby legs. Face directly on the body: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
