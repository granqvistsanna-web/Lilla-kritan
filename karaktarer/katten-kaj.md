# Katten Kaj

**Art:** katt · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-09):** gjord som Disa, Hugo och Hulda (`dinon-disa/premium/original/disa-djup.jpg` som stilreferens), skillen `lk-figur`. Kaj står på två ben och är en **stor figur: SKALA 0,5** (kroppen ca 694 px från fötterna till äggets topp), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/katten-kaj/premium/`](../assets/karaktarer/katten-kaj/premium/): kropp, öron, armar (`-fram`-kopior), ben och svans i `cut/`, vridpunkter i `kaj-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/katten-kaj/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna, blundar och lägger sig på sidan och sover; svansen viftar). Öron, svans och ben har lång rot i egen färg (`verktyg/langre_rot.py`, originalen i `cut/v1/`). Morrhåren är borta i v2 (de skulle klippas som egna delar); rita dem i kod om de behövs.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): `premium/original/kaj-forsta-a.jpg` och `-b` (**vald**) → `kaj-djup.jpg` (mattare päls) → `kaj-faceless.jpg`. `kaj-body-flow.jpg` tappade skuggningen, så den används bara som form: kroppen är fasladens pixlar innanför den formen, med en ny 17 px kant innan delningen.
>
> **Gräddvita tassar:** tassarna och svanstippen är nästan vita, och `tunn_kant.py` äter vitt. De är därför värmda en aning (× 0,975 / 0,955 / 0,9) i `kaj-faceless.png` innan delningen. **Svansen** ringlar runt högerarmens tass, så `premium/skript/delar-kaj.py` (körs efter `delar.py`) delar dem på färg. Öronen ligger bakom huvudet inne i `#kropp` och gungar högst ±15°. Armarna ritade med `rita-lemmar.py … 548,588,644,684 --bara arm --armlangd 0.55`, spetsen (t > 0,84) gräddvit (originalen i `cut/v1/`).
>
> **Ansiktet i kod**, ljust på svart päls: gräddvita ögonfläckar (411, 399) och (610, 399) rx 44 ry 47 med pupill rx 19 ry 27 (lite inåt), blinkar som en helhet; glada bågar och mun i gräddvitt `#efe6d2`; rosa nos och kinder (383, 455) och (639, 454) rx 28 ry 16. FOTTER 923.
>
> **Uttryck och poser (2026-11-11, för 025):** [`uttryck.html`](../assets/karaktarer/katten-kaj/premium/uttryck.html), byggd från lejonets sida på motorn `verktyg/rigg-motor.js`. Uttryck: neutral, glad, jätteglad, förvånad, nyfiken, tänker, lite ledsen, trumpen, sömnig, fnissig (morrhåren vickar), blinkar, stolt, och för tandborstningen `gapar` (gapet ca 90 × 64 px, mörkröd insida, rosa tunga, 4 + 4 tänder), `flinar` (brett leende med tänderna) och `gurglar` (litet O, `puff` rundar kinderna). Varje tand är matt (gräddgul) eller blank (vit med glansprick): `{ ...param('gapar'), tander: [8 värden 0–1] }`, övre raden först. Tre morrhår per sida i kod (`morr` = vinkel). Pose `borstar`: vänstra tassen (bara handen, `-klapp`-kopian) framför bröstet med tandborsten mot munnen, `borstV` gnuggar. `?prov=borsta&zoom=1|1.6|2.8|4` är provbilden i badrummet bakom handfatet.

> **Tandmunnen och borstningen (2026-11-11, för 030 Borsta, borsta; Sanna godkände):** kattens sida använder nu samma kod som kaninens och pandans (`verktyg/rigg-motor.js`: `tandmun`, `tandmunRita`, `borsteBild`, `borsteRita`, `borstArm`, `provBorsta`, `borsta`); den egna kopian är borta. **Gapet är större:** 128 × 76 px (`mun: [64, 42, 0.2, 487]`, y 453–529; förut 90 × 60), ca 22 % av kroppens bredd som på de andra två, varje tand ca 27 × 27 px. Det ligger under nosen (442) och ögonfläckarna (446), mellan kinderna (411 och 611). Tandleendet 124 × 24 px (y 458–482). Morrhåren flyttar ut med gapet och börjar vid mungipan. Utseendet i övrigt är orört. **Borstningen:** borsten leds av munnen och vänstra armen följer i ett stycke, rakt upp framför kroppen, bara tassen syns (`-klapp`-kopian). Posen bär `borstX`, `borstY`, `borstNer`, `skum`, ansiktet `glimt` (glansstjärnan). `rorelse('borsta', t)` är hela borstningen (13 s); filmen tar delarna med `ROR.borsta('upp' | 'skrubba' | 'uppe' | 'nere' | 'klar', tl, d)`. **025:** `?prov=borsta` finns kvar med samma zoomvärden, men bilderna blir andra än i `avsnitt/025-katten-borstar-tanderna/provbild/` (större gap, borsten i mungipan, armen rakt upp, zoom 4 mitt på munnen); de bilderna är inte omrenderade. Nytt utsnitt `&zoom=mun`: gapet fyller en tredjedel av bildens bredd (zoom 10,0). Prov: `avsnitt/030-borsta-borsta-gulliga-djur/provbild/katt-*.jpg` och `provbild/borsta-rorelse/`.

> **Gulligare tandmun (2026-11-11, Sanna: tänderna såg arga ut, "cuter and happier", "some bubble and closed eyes"):** gapet är nu ett glatt gap med platt överkant och rund botten (`mun: [64, 52, 0.55, 477]`, samma ytterkanter som förut), små runda tänder med luft emellan (höjd 24 % av gapet), varmt rosaröd mun medan tänderna syns, större tunga och inga höjda bryn. Tandleendet `flinar` är `mun: [60, 32, 1, 456]` och visar bara övre raden (`tandNere: 0`) över tungan. Medan figuren borstar blundar den glatt och små bubblor stiger från borsten (posens `bubblor: { k, t }`, sätts av `ROR.borsta`). Jämförelse: `avsnitt/030-borsta-borsta-gulliga-djur/provbild/borsta-rorelse/5-gulligare-mun-alla-tre.jpg`.

> **Runda 2 (2026-11-11, Sanna efter grovklippet):** katten har små rundade spetsar på de två yttre tänderna i övre raden (`{ spetsiga: [0, 3] }`), vänliga, inte vassa. Munnens kant är en mjuk mörkröd linje (`#a33b45`) i stället för mörkbrun på de andra två; katten har ingen kant alls. Koden: `tandmun(id, kant, form)` i `verktyg/rigg-motor.js`.

> **Runda 4 (2026-11-11):** öronen är ett matchande par: högra örat är det vänstra urklippet speglat kring x 507 (de två urklippen var olika ritade och såg ojämna ut, Sanna). `cut/kaj-ear-r.png` används inte längre av `uttryck.html`. Leendets linje försvinner när munnen öppnas, och tänderna tonar in först när gapet är minst 80 px brett.

> **Runda 5 (2026-11-11):** öronen ritas i kod i `uttryck.html` (`ORA`: urklippets form, rundade hörn, jämn vit kant, rosa inneröra; urklippen hade små ljusa streck och hårda hörn), högra örat speglat. Ögonvitorna är ren varm vit (`#FBF8F0`); morrhår, mun och svanstipp är orörda.

## Utseende
- Form: rund kropp, trekantiga öron, lång svans som slutar i en krok.
- Färger: svart (`#1E1A18`) med vita tassar och en vit svanstipp. Vita cirklar runt ögonen syns tydligt.
- Kännetecken: den vita svanstippen och tre långa morrhår på varje sida.

## Personlighet
- Nyfiken och lite busig. Smyger, klättrar och vill alltid se vad som händer.

## Röst och repliker
- Röst: len och lite lurig.
- Återkommande replik: *"Mjau! Vad är det där?"*
- Ljud: mjau, spinn (purr).

## Cut out-delar
```delar
head-and-body, front ear, back ear, tail (2 positions), front leg, back leg, eyes closed, mouth open, whiskers
```

## Prompt
```prompt
Kaj the cat, a round soft black cat (#1E1A18) with a thin chalky light edge, two triangle ears, white paws and a white tip on his long curled tail, three long white whiskers on each side, small black dot eyes in clear white circles and a curious little smile, short stubby legs.
```

## Pose: sitter med blåbärshinken (012, förslag)
Kaj sitter under äppelträdet med blåbärshinken (`rekvisita/blabar.md`) framför magen, och i stoppet ställer han den i mopedens korg. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Ingen ny bild behövs.** `katten-kaj-body.png` och delarna i `cut/` (`katten-kaj-rigg.json`) läggs ihop i kod: hinken som eget lager framför magen, tassarna ovanpå hinkens kant, svansen med den vita tippen fri bakom. Den ljusgrå hinken syns tydligt mot den svarta pälsen.

> **Bakifrån (2026-11-20, för 047 Katten åker buss):** `assets/karaktarer/katten-kaj/premium/cut/kaj-bakifran.png` (481×630) är katten sedd rakt bakifrån, ett enda ägg med öronen på toppen, raka ben och vita tassar, ingen svans och inga armar. Används som kattens huvud bakifrån i bilderna ut genom bussfönstret. Google Flow (Nano Banana 2.1, `kaj-djup.jpg` som referens), tagning 1 vald av Sanna; alla tagningar i `premium/original/bakifran/` (`jamforelse-agg.jpg`; de första med huvud på kropp, `jamforelse.jpg`, avvisades: *"thats not cat shape"*). Urklippet har ingen vit kant, `kant.js` lägger på den i scenen. Svansen kan läggas till från riggen.

**Trekvart bakifrån (2026-11-20, 047):** katten tittar över axeln mot ett fönster till höger, så att reaktionerna syns i fönsterbilderna. Den första ansiktslösa versionen avvisades (Sanna: *"angle dont look right"*); en vridning läses bara om en bit av ansiktet syns. Ny omgång med ansikte i bilden: fyra tagningar `assets/karaktarer/katten-kaj/premium/original/trekvart/kaj-axel-1…4.jpg` (`jamforelse-axel.jpg`), **vald nr 3 av Sanna**, utklippt till `premium/cut/kaj-trekvart.png` (655×672, ingen inbakad vit kant). Ögat, kinden och nosspetsen sitter i bilden vid högerkanten; reaktionerna målas över i kod. Morrhårsspetsarna utanför kroppen försvann i urklippet och ritas i kod.

**Mer mot tittaren:** samma tagning 3 vriden lite mer mot tittaren med Flows redigering (två ögon, det bortre delvis dolt av huvudets rundning; första försöket fick tre öron och rättades). `original/trekvart/kaj-axel-3-mer-2oron.jpg`, utklipp `premium/cut/kaj-trekvart-mer.png` (655×656). Jämförelse `original/trekvart/jamforelse-3-och-mer.jpg`.

Google Flow, Nano Banana 2.1, 0 krediter, referens `kaj-djup.jpg`.

```prompt
Image 1 is the cat character: keep EXACTLY its look, same soft hand-drawn wax-crayon technique, mottled grainy charcoal-black crayon, ONE smooth egg shape for head and body together (no neck), same pointy ears with small muted pink insides, same white-tipped tail, same short black legs with white paws, same simple face style (round white eyes with black pupils, small pink nose, pink blush cheeks, thin white whiskers), same thin clean white sticker rim. ONLY change the viewing angle: an OVER-THE-SHOULDER view. The cat stands with its back mostly toward us and turns its whole egg about 60 degrees to the RIGHT, looking curiously out of a window on the right side of the picture. We see its back and tail on the left, and on the right side of the egg we see the cat's face in clear profile-ish three-quarter: ONE eye clearly visible near the right edge looking right, the pink nose tip and blush cheek on the right edge, the whiskers sticking out past the right edge. The far eye is hidden. Both ears are seen at an angle, the right ear slightly more from the side. Calm, gentle, happy curious look. Centered with space around, plain pure solid white background, no shadow, no ground, no window, no text.
```

**Riggar för trekvartsvyn (2026-11-20, 047):** Sanna lämnade två egna bilder (Flow), katten över axeln mot ett fönster till höger: `premium/original/trekvart/sanna-ut.jpg` (tittar ut, ett öga) och `sanna-vand.jpg` (vänd mot tittaren, två ögon), och bad om *"code face"* och *"new rigs for this angle"*. Båda riggades enligt lk-figur: ansiktslös bild och bara kroppen gjordes med Flows redigering av hennes bilder, delarna klipptes ut för hand (delar.py kan inte se öra och arm som ligger PÅ kroppen), långa rötter (langre_rot.py), svansens vita spets återställd, armens rot tonad, kroppens inbakade vita kant borttagen (kant.js lägger kanten).
- `premium/trekvart/` = **kaj34** (vänd mot tittaren): `cut/kaj34-{body,ear-r,ear-m,tail,arm,leg-l,leg-r}.png`, `kaj34-rigg.json` (vridpunkter, lagerordning, ansiktskarta: närmre öga (722, 425) rx 38 ry 40, bortre öga (826, 411) rx 16 ry 36, nos (805, 453), mun (801, 487), kinder (693, 488) och (842, 466)).
- `premium/trekvart/ut/` = **kaj34ut** (tittar ut): `cut/kaj34ut-{body,ear-l,ear-r,tail,arm,leg-l,leg-r}.png`, `kaj34ut-rigg.json` (öga (759, 408) rx 24 ry 40, nos (817, 438), kind (746, 468), mun ca (812, 468)).
- Rörelse: öron ±5°, svans ±3–5°, armen 0 till −80° (mot rutan), ansiktet i kod. Byte mellan kaj34ut och kaj34 = huvudvridning mot tittaren (byt på en blinkning).
