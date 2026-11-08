# Fjärilen Fia

**Art:** fjäril · **Favoritsak:** fjäril 🦋 · **Status:** ✅ Referensark klart

## Utseende
- Form: liten. En plommonbrun kropp som en böna, fyra rundade vingar och två korta antenner med prickar i topparna.
- Färger: lavendellila vingar (`#B9A3E3`) i kraftig vaxkrita med några gula prickar (`#F6C21C`), plommonbrun kropp (`#5A3A4A`).
- Kännetecken: **stora ögon** som täcker nästan hela huvudet. Väldigt minimal, inget annat på kroppen.

## Personlighet
- Drömmande och glad. Älskar blommor och färger.
- Hittar alltid de vackraste blommorna åt sina kompisar.

## Röst och repliker
- Röst: ljus och mjuk, lite viskande.
- Återkommande replik: *"Flaxa, flaxa, fladder!"*
- Ljud: ett lätt pling när hon landar.

## Cut out-delar
```delar
body without wings, left wing pair, right wing pair (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/fjarilen-fia/`](../assets/karaktarer/fjarilen-fia/): framifrån, utan ansikte och kropp utan vingar, utklippta i `cut/`. Varje sidas vingpar är en egen bild som flaxar runt vridpunkten i `fia-rigg.json`. Ögonen sitter på (444, 410) och (579, 407) med radie 50. Delarna görs med `python3 verktyg/delar.py assets/karaktarer/fjarilen-fia fia --vingar`.

## Prompt
```prompt
Fia the butterfly: small, a plum-brown (#5A3A4A) bean-shaped body with two BIG round white eyes ringed in black with big black pupils, four rounded lavender (#B9A3E3) wings in heavy streaky wax crayon with a few round yellow (#F6C21C) dots, two short antennae with dot tips, no outline, a thin uneven white rim. Very minimal: no legs, no patterns, no marks.
```

## Art direction v2 (2026-11-08)

Gjord för kotte-scenen i 007 (vägen 2, bild 06–06b), som Bulle och Igge ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Designen är densamma (lavendellila vingar med gula prickar, plommonbrun bönkropp, korta antenner med prickar), bara i v2-utseendet: platt krita, vit klistermärkeskant och v2-ansiktet (små ovala ögon med glans, rosa kinder, ett litet leende) i stället för v1:s stora ögon. Riggen ligger i [`assets/karaktarer/fjarilen-fia/premium/`](../assets/karaktarer/fjarilen-fia/premium/).

- **Tagningar:** första `premium/original/fia-premium-a.png` (2048). Sanna 2026-11-08: "lite mindre kritstruktur och lite mer djup" → förfining i Google Flow (`original/fia-refine-1/2/3.jpg`), tagning 2 vald. Sedan: "för airbrushad, mer kritstruktur och lite plattare" → v3 (Flow gav bara fel den gången, så v3 gjordes lokalt: take 2:s färger plattade till färgfält, airbrush-glansen bort, och kritdrag ur första tagningen ovanpå; `original/fia-refine-v3-1/2/3.png`). **Vald: v3-3** (mest krita) = `fia-platt.png`. Kroppens kritkorn är en speglad bit ur första tagningens kropp, så att inga gamla ansiktsdrag syns. Tidigare riggar ligger i `original/a-cut/` (första tagningen) och `original/b-cut/` (tagning 2).
- **Utan ansikte och bara kroppen:** `fia-faceless.png` = samma v3-steg på tagning 2:s ansiktslösa bild, så den är pixeljusterad mot v3-3. Kroppen = den plommonbruna ytan med antennerna (`fia-body.png`).
- **Delar** (`premium/cut/`, **16 px vit kant**, samma bredd som konstens egen vita kant (Sanna: ingen tjock extra kant). Vid `h` 140 i 007 blir den ca 3,5 px i scenen, lite tunnare än 5 px-regeln. Kanten görs med `verktyg/tunn_kant.py`, som gjordes om 2026-11-08 efter "taggiga kanter, ojämn kant": konturen slätas, kanten räknas kantutjämnad i 4x och ljusa kritfransar i ytterkanten får närmaste kritfärg, så kanten är lika bred och mjuk runt om): `fia-body` (kroppen med antennerna; den vita kanten är borttagen där kroppen ligger över vingarna, som i konsten), `fia-wing-l` och `fia-wing-r` (övre och nedre vingen på var sida i ett stycke). `delar.py --vingar` såg båda vingarna som en del (kanten ovanför huvudet binder ihop dem), så vingarna klipptes för sig: vingens kritfyllning på var sida, förlängd in under kroppen till vridlinjen och fylld med närmaste vingfärg, så att en ihoptryckt vinge aldrig visar en glipa. Vridpunkter i `fia-rigg.json`: wing-l (440, 558), wing-r (584, 551), 24 px in i halsen. FOTTER 800 (vingarnas underkant), kroppen trycks ihop kring sin botten (753).
- **Ansiktet i kod** (uppmätt med `ansikte_matt.py`): ögon rx 16, ry 22 på (457, 411) och (566, 410), kinder rx 24, ry 15 på (436, 453) och (587, 452), munnen en båge med mitten (514, 448), 48 px bred, ingen nos.
- **Vingslag:** vingarna trycks ihop mot vridlinjen (`vinge` 0 öppen … 1 kanten mot tittaren) och lyfts (`vingar` grader). `slag(t, hz, amp)` ger ett slag: ihop och upp på uppslaget, kroppen guppar upp på nedslaget. I riktningsposen trycks den bortre vingen ihop lite och ansiktet glider 18 px åt hållet. Hon vänds aldrig.
- **Uttryck, poser, rörelser och testfilm:** [`premium/uttryck.html`](../assets/karaktarer/fjarilen-fia/premium/uttryck.html), samma API och uttrycksnamn som Bulles (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`, `?film=1`). Poser: `neutral lutaV lutaH vanster hoger upp ner oppen stangd hurra blyg vilar`. Rörelser (`ROR`): `flaxa` (svävar på stället, 3 slag/s), `flyga` (fram och tillbaka på 8 s), `vila` (sitter och fäller vingarna sakta), `dansa`. Testfilmen `premium/fia-testfilm.mp4` (lokal, mp4 ignoreras av git): flyger in, svävar, blir nyfiken och glad, landar, fnissar, lyfter och flyger ut.
- **I 007:** `fjarilen-fia` finns i `avsnitt/007-bruna-ladbilen/scener/gor-v2.py` och därmed i `v2-riggar.js`: `v2.figur('fjarilen-fia', parent, { h })` med t.ex. `f.pose({ x, y, rorelse: ['flaxa', t] })`. Hon har inga armar eller ben, så `r`, `l`, `delar` och `ben` i `v2.js` gör ingenting. `opt.h` sätter höjden (vingarnas bbox), ca 40 % av en tvåbent figur.
