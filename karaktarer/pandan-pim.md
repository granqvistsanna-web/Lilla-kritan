# Pandan Pim

**Art:** panda · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-10, på Sannas önskan):** gjord som Zebbe och Rut ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Pim står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 728 px från fötterna till äggets topp i 1024-rutan, öronen sticker upp ovanför), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/pandan-pim/premium/`](../assets/karaktarer/pandan-pim/premium/): kropp, ögonfläckar (`pim-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `pim-rigg.json`. Han har inga v1-bilder.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-pim-v2`, pixeljusterad): Sanna valde `premium/original/pim-forsta-a.jpg` (`-b` är den bortvalda tagningen). Ur A: `pim-faceless.jpg` (ögon, kinder, mun och den lilla svarta nosen borta, ögonfläckarna kvar; `-b` är andra tagningen) och `pim-body-flow.jpg` (bara kroppen; `-b` är andra tagningen). Inget plattare steg: armarna ritas ändå. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/pandan-pim/premium/prompter.md).
>
> **Delar** (`premium/skript/pim_delar.py`, efter `delar.py --egen-kant --oron-svans`): allt utom kroppen är svart krita. **Öronen och svansen** är konstens svarta pixlar utanför kroppen med **lång rundad rot** (80 px in under kroppen mot dess mitt, i samma svarta krita), utan kroppens grå kontur och vita kant som `delar.py` tog med; `delar.py` hittade inte den lilla svansen, så den tas ur `pim-faceless.png`. **Benen och armarna är ritade** (som Ruts): benen svarta kapslar (r 36 → 33) från roten 80 px upp under kroppen ner till den runda foten (y 918); armarna runda svarta stumpar i ett stycke (rot r 23, hand r 30, 85 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt) med `-fram`-kopior för klappen och magen. **Ögonfläckarna** tas ur `pim-faceless.png` (Flow-kroppen gjorde dem nästan svarta; faceless har konstens gråsvarta) till `cut/pim-nos.png`, som följer ansiktet som en nosfläck; kroppen under (`pim-body-tom.png`) är fylld med krämkrita. Den krämvita kritan räknas som vit av `tunn_kant.py`, så kroppen värms före och kyls efter med Zebbes `skript/varm.py` (Zebbes krämtrick). **Nosen ritas i kod** som Ruts och Lovas: en mjuk kubisk form, `<path class="nasa">` 481–541 × 429–465, `#231816`, i ansiktsgruppen. `node verktyg/baka-nasor.mjs` bakar in den i `cut/pim-nos.png` (avsnitten laddar bara bilden); fläckarna utan nos ligger kvar som `cut/pim-nos-utan-nasa.png`.
>
> **Armar flyger inte** (som Zebbes och Ruts): samma `GOM` och `UT`, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel. **Klappen** är kantklappen med korta stumpar mot magens kanter. Vinkande arm bakom kroppen, inga snurr, lugna hopp. Kontroll: `premium/pim-armar-overgangar.jpg` visar varje övergång i filmen i sju steg.
>
> **Ansikte (v2), i kod:** ögon (419, 402) och (601, 400), rx 18, ry 26, nästan svarta `#1f1513` med vit glans och en svag ljusare ring (`#c9beb8`, 50 %) så att de syns tydligt i de gråsvarta fläckarna; kinder (353, 500) och (670, 500), rx 34, ry 22, `#f7adb2`; ett streck från nosen ner till ett U (476–548, ändarna y 478, botten 497), mörkbrunt `#2a1d1a`. Öppen mun `#7a2a1c`. Ögonen tonas aldrig (kläms ihop och byts mot bågen, som Zebbes).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/pandan-pim/premium/uttryck.html) har samma API och namn som Ruts och Zebbes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`), blinkningen ur `verktyg/blinka.js` (`skapaBlinka(22)`). Öronen släpar mjukt (±12° i hoppet, ±8° i gången). Den lilla svansen gungar lugnt och viftar lite (±6°) i 0,6 s var 4,5:e sekund. `?film=1` är en 41,8 s testfilm, SKALA 0,5 och zoom 2. Renderad: `premium/pim-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/pim-stills.jpg`.
>
> **Somnar (C), som Zebbes och Ruts:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över. Han landar liggande på magen med en mjuk studs, andas, zzz flyter upp ovanför huvudet, och han vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, Nano Banana Pro, 0 krediter, 2026-11-10): två tagningar med prompten i `prompter.md` och A som bild 1. Båda ligger på magen; tagning 1 är vald (`premium/original/pim-sover-flow.jpg`, rund limpa, tassarna under hakan, blundar), tagning 2 (`pim-sover-flow-b.jpg`) fick en svart axelrand som Pim inte har. `premium/original/pim-sover-jamforelse.jpg` visar båda bredvid A. Klippt med sovbild.py-stegen till `cut/pim-sover.png`, `tunn_kant.py 10,5` (krämen värmd före med `varm.py`). I filmen `SOV = { fil: 'cut/pim-sover.png', cx: 524, botten: 838, skala: 0.95 }`: det liggande huvudet är ritat mindre än det stående ägget, så han får vara lite bredare för att se lika stor ut, och kanten blir 10,5 × 0,95 = 10 px som riggen.

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), svarta armstumpar, svarta ben och två runda öron på toppen.
- Färger: vit (`#FAF8F4`) med svarta (`#1E1A18`) runda öron, svarta ovala ögonfläckar, svarta armar och ben och en liten svart näsa.
- Kännetecken: de svarta ögonfläckarna, de runda svarta öronen och de svarta armarna och benen mot den vita kroppen.

## Personlighet
- Snäll och långsam. Älskar bambu och att rulla runt i gräset. Tar alltid god tid på sig.

## Röst och repliker
- Röst: mjuk, långsam och gosig.
- Återkommande replik: *"Mmm, vad gott!"*
- Ljud: ett mjukt, glatt mumsande.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, left ear, right ear (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Pim the panda, ONE smooth, slightly lopsided egg-shaped body (head and body in one), white (#FAF8F4) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. Black (#1E1A18) round ears on top, black oval eye patches, black arm nubs, black short stubby legs, a small black nose. Face directly on the body inside the eye patches: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
