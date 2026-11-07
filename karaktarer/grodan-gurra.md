# Grodan Gurra

**Art:** groda · **Favoritsak:** groda 🐸 · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-07):** gjord som Kanel och Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/grodan-gurra/premium/`](../assets/karaktarer/grodan-gurra/premium/): kropp (`gurra-body-tom.png`), magfläck (`gurra-mage.png`, följer ansiktet 40 %), armar och ben i `cut/`, vridpunkter i `gurra-rigg.json`. Godkänd konst i `premium/original/`: `gurra-forsta.jpg` (startbild), `gurra-platt.png` (med ansikte), `gurra-faceless.png` och `gurra-body.png`, gjorda i Google Flow. Grodan har inga öron och ingen svans: ögonkuporna hör till kroppen. Alla delar har 10 px vit kant vid SKALA 0,5 (`verktyg/tunn_kant.py`). Armarna är omritade av en ren kritbit (bit 612,378,708,474) som korta stumpar (kapsel från vridpunkten −34/−14 till +16/+60, radie 30 → 26), eftersom konstens armar var tunna kilar. `-fram`-armarna har ingen kant vid roten. Magfläckens gröna skåra nertill är igenfylld.

> **Ansikte (v2), allt i kod:** ögon (341, 260) och (683, 260), rx 26, ry 37 (Kanels öga × 1,45), kinder (373, 366) och (650, 364), rx 38, ry 22. Munnen är en enda bred båge kring (514, 384), 106 px bred, ingen nos. Öppen mun är 2,2 gånger så bred som Luddes. Ögonen stannar i kuporna: i riktningsposen glider kinder och mun 36 px men ögonen bara 12 px.

> **Uttryck, poser, rörelser och testfilm (v2):** [`premium/uttryck.html`](../assets/karaktarer/grodan-gurra/premium/uttryck.html) har samma API och namn som Kanels och Luddes (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`). Armarna är korta, så klappen och `magen` klappar vid magens kanter som Luddes. **Sover (vald 2026-11-07, som Luddes):** posen `liggMage`, där han ligger på magen med händerna under hakan och benen indragna (strack −0,3, bred 0,18, sank 30, upp −0,9, armar −95 framför kroppen). Grodans huvud är stort, så armarna lyfts 40 px (`armY`) och skjuts 200 px in (`klapp`). Uttrycket `sover` (parametern `sov`: sluten u-båge i kupan) och rörelsen `ligga` (ett andetag var 4:e s; `?rorelse=ligga`). I filmen: sitter och blir sömnig, lägger sig på 1 s, andas, sträcker på sig och vinkar. Den sittande sovposen är borttagen. **Kawaii (uttryck):** `ansikte('kawaii', k)` ger stora glittriga ögon (rx 28, ry 44, 19 px lägre, en stor och en liten glans) för förtjusning och förundran, blandbart som de andra; vanliga ögon är standard. Samma mått som musen och björnen räknat på huvudets bredd, men ögonen ligger kvar i kuporna. `?ark=kawaii` visar 0, 0,5 och 1. I filmen bara en gång, när han sträcker sig efter något. `-fram`-armarna (framför magen) har ingen vit kant alls: de är lite mörkare än kroppen, med en mörkare kritkant som tonar ut mot roten. `?film=1` är Luddes testfilm med sömnen, 39,9 s. Renderad: `premium/gurra-testfilm.mp4` (git-ignorerad, gör om den med `film.mjs`). Utseendet nedan är v1.

## Utseende
- Form: bred och platt, som en grön bönpåse. Stora runda ögon ovanpå huvudet.
- Färger: grodgrön (`#6DBE45`) med ljusgul mage och mörkare gröna prickar på ryggen.
- Kännetecken: stor bred mun och en liten blå fluga (rosett) vid halsen.

## Personlighet
- Skojig och lite tokig. Gillar att plaska och hoppa i vattenpölar.
- Sjunger gärna, men lite falskt.

## Röst och repliker
- Röst: kraxig och skrattig.
- Återkommande replik: *"Kvack-kvack, plask!"*
- Ljud: plask och boing.

## Cut out-delar
```delar
head and body, front arm, back arm, folded back leg, stretched back leg, bow tie, eyes closed, wide mouth open
```

## Prompt
```prompt
Gurra the frog, a wide flat friendly frog shaped like a green bean bag (#6DBE45), pale yellow belly, darker green spots on his back, two big round eyes sitting on top of his head with small black dots, a very wide smiling mouth, a little blue bow tie at his neck, long folded back legs.
```
