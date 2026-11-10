# Elefanten Elsa

**Art:** elefant · **Favoritsak:** – · **Status:** ✅ Referensark klart

> **Art direction v2 (2026-11-09, på Sannas önskan):** ny figur, gjord som Zebbe och Kajsa ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Hon har inga v1-bilder: allt ligger i [`assets/karaktarer/elefanten-elsa/premium/`](../assets/karaktarer/elefanten-elsa/premium/). Elsa står på två ben och är en **stor figur: SKALA 0,5** som de andra tvåbenta (kroppen 738 px från fötterna till äggets topp i 1024-rutan, öronen räknas inte), alla delar med 10 px vit kant. Kropp, snabel (`elsa-nos.png`), öron, armar, ben och svans i `cut/`, vridpunkter i `elsa-rigg.json`.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter, projekt `lk-elsa-v2`): Sanna valde `premium/original/elsa-forsta-b.jpg` (`-a` är den bortvalda tagningen). B höll redan armarna en bit ut med en glipa, så inget platt steg behövdes. Ur B: `elsa-faceless.jpg` (snabeln kvar) och `elsa-body-flow.jpg` (bara kroppen med snabeln). Båda låg pixelexakt på B (förskjutning 0 i alla delar). Prompterna står i [`premium/prompter.md`](../assets/karaktarer/elefanten-elsa/premium/prompter.md). Skripten ligger i `premium/skript/` (`elsa_rot.py`, `elsa_arm.py`, `elsa_ben.py`, `elsa_nos.py`, krit-rutan i `ruta.json`).
>
> **Delar:** `delar.py` slog ihop svansen med höger arm, så öronen och svansen klipps om i `elsa_rot.py`. **Öronen** är konstens öron (med rosa insida) och en bred rot i gråblå krita längs hela kontaktkanten mot huvudet, men inte längre upp eller ner än kontakten (annars vrids roten ut under örat som en stump). De vrids kring en led 40 px in i huvudet, (323, 375) och (697, 376), och rör sig 40 % så mycket som de andra figurernas öron (`ORA = 0,4`), plus en lugn fläkt ±2° i otakt i filmen. **Svansen** är konstens tunna svans med tofs, lång rot 80 px in mot kroppens mitt. **Armarna och benen är ritade:** armarna runda stumpar i ett stycke (rot r 24, hand r 31, 88 px från vridpunkten i kroppens kant, 50° under vågrätt) med tre ljusa tånaglar och `-fram`-kopior för klappen och magen; benen raka gråblå med kontur, tre tånaglar och 80 px rot upp under kroppen. **Snabeln** är kritlinjer på ansiktet, inne i siluetten. Den sitter kvar i ansiktet men är lyft ur kroppen till `elsa-nos.png` (bara linjerna, mjuk alfa) så att den följer ansiktet i riktningsposen och när hon tittar upp eller ner; under den är kroppen (`elsa-body-tom.png`) fylld med kroppens krita. Ingen nos i kod: snabeln är nosen.
>
> **Ansikte (v2), i kod:** ögon (420, 402) och (601, 401), rx 18, ry 26; kinder (380, 454) och (639, 451), rx 26, ry 17, `#f4a7ad`; ett litet snett leende till höger om snabelns topp (från ungefär (558, 503) till (598, 480), vridet −30°) med en liten grop uppåt i högra änden, mörkbrunt `#4f342e`. Öppen mun `#7a2e2a`, 0,75 av Zebbes och lite längre ut från snabeln. Blinkningen ur `verktyg/blinka.js` (`skapaBlinka(17)`).
>
> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/elefanten-elsa/premium/uttryck.html) har samma API och namn som Zebbes och Kajsas (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?ark=kawaii`, `?rorelse=`, `?film=1`). **Armar flyger inte:** samma `GOM` och `UT` som Zebbe, så en arm syns bara i vila eller uppe och glider annars in bakom kroppen i samma vinkel; vinkarmen bakom kroppen, ut förbi kanten; klappen med korta stumpar mot magens kanter. Kontroll: `premium/elsa-armar-overgangar.jpg` visar varje armövergång i filmen i sju steg. `?film=1` är 41,8 s, SKALA 0,5 och zoom 2. Renderad: `premium/elsa-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`), stillbilder i `premium/elsa-stills.jpg`.
>
> **Somnar (C), som Zebbes:** sömnig och gäspar, ett litet hopp, och i hoppets topp tar den ritade sovbilden över; hon landar liggande på magen, andas, zzz flyter upp, och hon vaknar med ett hopp tillbaka. **Sovbilden** (Google Flow, 0 krediter, 2026-11-09): två tagningar med prompten i `prompter.md` och B som bild 1. Tagning 2 är vald (`premium/original/elsa-sover-flow.jpg`, ligger på magen med framfötterna under hakan, blundar, lite snett framifrån); tagning 1 (`elsa-sover-flow-b.jpg`) sitter upp och används inte. `premium/original/elsa-sover-jamforelse.jpg` visar båda. Klippt med `.claude/skills/lk-figur/scripts/sovbild.py` till `cut/elsa-sover.png`, `tunn_kant.py 10`. I filmen `SOV = { fil: 'cut/elsa-sover.png', cx: 511, botten: 797, skala: 1.0 }`: Flow ritade den liggande Elsa mindre (huvudet ungefär hälften så stort som stående), så skala 1,0 i stället för 0,86 gör henne lika bred som stående med öronen, och kanten blir 10 px som riggen.
>
> Utseendet nedan är beskrivningen från början.

## Utseende
- Form: en rund, lite sned äggform (huvud och kropp i ett), två små armstumpar, två korta ben och en kort böjd snabel.
- Färger: mjuk gråblå (`#9FB3C8`) med två stora runda öron i rosa (`#F2B8C0`) på insidan.
- Kännetecken: de stora fladdriga öronen med rosa insidor och den korta böjda snabeln mitt i ansiktet.

## Personlighet
- Snäll och försiktig. Tänker på alla andra. Älskar att spruta vatten med snabeln.

## Röst och repliker
- Röst: mjuk, lugn och omtänksam.
- Återkommande replik: *"Varsamt, varsamt!"*
- Ljud: ett glatt litet trumpetande.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg, left ear, right ear, trunk (eyes and mouth are drawn in code)
```

## Prompt
```prompt
Elsa the elephant, ONE smooth, slightly lopsided egg-shaped body (head and body in one), soft grey-blue (#9FB3C8) wax crayon with grainy streaky texture and paper grain, no black outline, a thin uneven white rim. Two big round flappy ears at the sides with pink (#F2B8C0) insides, a short curved trunk from the middle of the face, tiny arm nubs, two short stubby legs. Face directly on the body: two round white eyes ringed in black with small black pupils and a big happy smile. Very minimal.
```
