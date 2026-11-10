# Ugglan Ulla

**Art:** uggla · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-10, på Sannas önskan):** ny figur, gjord som Rut och Elsa ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Hon har inga v1-bilder: allt ligger i [`assets/karaktarer/ugglan-ulla/premium/`](../assets/karaktarer/ugglan-ulla/premium/). Ulla står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 746 px från fötterna till äggets topp i 1024-rutan, tofsarna räknas inte), alla delar med 10 px vit kant. Kropp, ögonskivor (`ulla-nos.png`), mage, örontofsar, vingar och ben i `cut/`, vridpunkter i `ulla-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-ulla-v2`, pixeljusterad mot A): Sanna valde `premium/original/ulla-forsta-a.jpg` (`-b` är den bortvalda tagningen). Ur A: `ulla-faceless.jpg` (ögon, kinder och näbben borta, ögonskivorna kvar; `-b` är andra tagningen) och `ulla-body-flow.jpg` (bara kroppen med ögonskivor och mage; `-b` är andra tagningen). Inget plattare steg och ingen ny tagning med vingarna utåt: vingarna ritas ändå. Prompterna står i [`premium/prompter.md`](../assets/karaktarer/ugglan-ulla/premium/prompter.md), skripten i `premium/skript/`.
>
> **Delar:** `delar.py` gav öron (tofsarna), armar och ben med rätt namn. **Örontofsarna** är konstens tofsar utanför kroppen med en rundad rot i tofsens egen krita som börjar 15 px innanför leden och går 80 px in mot kroppens mitt (`ulla_tofs.py`; `langre_rot.py` lade rotens runda ände vid leden så att den stack ut som en bula, och rensningen rundade spetsen). Leder (335, 229) och (683, 229); de rör sig 60 % så mycket som de andras öron (`ORA = 0,6`) och släpar mjukt efter som öron. **Vingarna är armarna:** ritade runda vingstumpar i ett stycke (`ulla_arm.py`, brunorange krita med konstens mörkare kontur, rot r 24, ände r 33, 90 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt) med `-fram`-kopior för klappen och magen. Konstens vingar låg tätt intill kroppen, därför ritas de. **Benen:** ett ritat brunt lår (kapsel r 30 med 80 px rot upp under kroppen) ovanpå konstens orange ben och fot med tre tår (`ulla_ben.py`; ur konsten blev låret ett hack vid äggkanten med vita rester mellan lår och fot), leder (431, 838) och (602, 838). **Ögonskivorna och magen** är lyfta ur kroppen (`ulla_flackar.py`): ögonskivorna följer ansiktet som en nosfläck, magen 40 %, och kroppen under (`ulla-body-tom.png`) är fylld med brunorange krita. Ansiktet maskas med kroppens fyllning (`cut/ulla-kropp-mask.png`), så skivorna aldrig sticker ut över kanten i riktningsposen. Ingen `baka-nasor`-post: näbben är ritad i kod och det finns ingen `cut/ulla-nos.png` med kodritade delar i.
>
> **Ansikte (v2), i kod, inne i ögonskivorna:** ögon (418, 402) och (601, 401), rx 17, ry 25; kinder (381, 448) och (638, 446), rx 27, ry 18, `#f6abb0`. **Näbben** ritas i kod som Pips (vald framför en ansiktsföljande bild: den följer ansiktet ändå, kan öppnas i två halvor på "hoo" och behöver ingen bakning), efter konsten: övre halva med rundad överkant och undre halva med spetsen i (511, 472), 483–539 × 410–472, `#feb944` med konstens mörkgula kontur `#cc952f` och en liten glans. Leendet är ett streck i skarven mellan halvorna; öppen mun = undre halvan glider ner över en mörk mun `#7a2a1c`. Blinkningen ur `verktyg/blinka.js` (`skapaBlinka(20)`).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/ugglan-ulla/premium/uttryck.html) har samma API och namn som Ruts och Elsas (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`). Ugglan har ingen svans (`svans` finns kvar i `POSE0` för samma API men gör inget). **Armar flyger inte:** samma `GOM` och `UT` som Rut, så en vinge syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel; vinkvingen bakom kroppen, ut förbi kanten; klappen med korta stumpar mot magens kanter. Kontroll: `premium/ulla-armar-overgangar.jpg` visar varje armövergång i filmen i sju steg. `?film=1` är 41,8 s, SKALA 0,5 och zoom 2. Renderad: `premium/ulla-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/ulla-stills.jpg`.
>
> **Somnar (C), som Ruts och Elsas:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över; hon landar lågt och runt på magen med en mjuk studs, andas, zzz flyter upp till vänster om huvudet, och hon vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, 0 krediter, 2026-11-10): två tagningar med prompten i `prompter.md` och A som bild 1. Tagning 2 är vald (`premium/original/ulla-sover-flow.jpg`, har satt sig ner lågt och runt på magen, vingarna intill kroppen, tårna instoppade under, blundar); tagning 1 (`ulla-sover-flow-b.jpg`) är också låg men med tårna utsträckta framåt, mer sittande, och används inte. `premium/original/ulla-sover-jamforelse.jpg` visar båda bredvid A. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/ulla-sover.png`, `tunn_kant.py 10`. Flow ritade huvudet, ögonskivorna och magen på exakt samma ställe som stående, så `SOV = { fil: 'cut/ulla-sover.png', cx: 512, botten: 848, skala: 1.0 }` gör henne lika stor som stående och kanten 10 px som riggen.
>
> Utseendet nedan är beskrivningen från början.

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), vingar i stället för armar, två korta ben med orange fötter och två små örontofsar på huvudet.
- Färger: varm brunorange (`#C9803F`) med en krämfärgad (`#F3E2C3`) oval mage med små krittecknade V-fjädrar, orange fötter.
- Kännetecken: de två örontofsarna på toppen, de stora runda krämfärgade ögonskivorna och den lilla gulorange näbben.

## Personlighet
- Lugn och vis. Gäspar lite om dagen och är vaken när det blir mörkt. Tycker om att svara på frågor.

## Röst och repliker
- Röst: mjuk, stillsam och viskande lugn.
- Återkommande replik: *"Hm, låt mig tänka..."*
- Ljud: hoo-hoo.

## Cut out-delar
```delar
body without wings and legs, left wing, right wing, left leg, right leg, left ear tuft, right ear tuft (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Ulla the owl, ONE smooth, slightly lopsided egg-shaped body (head and body in one), warm brown-orange (#C9803F) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. A cream (#F3E2C3) oval tummy with small crayon V feathers, two little ear tufts on top, big round cream eye discs, a small yellow-orange beak, wings as the arms, orange feet, two short stubby legs. Face directly on the body between the eye discs: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
