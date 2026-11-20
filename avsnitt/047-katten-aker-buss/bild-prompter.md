# 047 – bildprompter till grind 2

Google Flow, Nano Banana (0 krediter), 4 tagningar var. **Bild 1 (stilreferens):** `assets/bakgrunder/snogarden/snogarden.jpeg`. Flow-projektets mapp: `lk-047-buss`. Flow-MCP:n fastnade 2026-11-20 (hittade inte knappen "Agent"), så bilderna gjordes i Sannas Chrome i Flow-projektet "nov. 20 - 16:11". Tagningarna ligger i `original/` med `jamforelse.jpg`.

**Sanna 2026-11-20:** plattorna ska vara **minimala och färgstarka** som mottagningen (*"more minimal and bold"*), så andra omgången (`-b1…b4`, `jamforelse-b.jpg`) har `assets/bakgrunder/mottagningen/mottagningen-v2.jpg` som stilreferens. Insidan har samma upplägg men starkare färger (gul vägg, röd bänk, blå stång). **Ingen målad snö i himlen:** snöfallet animeras i kod, så snöflingorna i den valda hållplatsen tas bort.

Farmor och farfar görs inte i Flow: de är Kaj omfärgad lokalt. Prov: `provbild/farmor-farfar-gra.jpg` (Kaj, farmor ljusgrå, farfar varmgrå). Glasögon, sjal, keps och halsduk ritas i kod.

## 1. I bussen (platta, 16:9)

Fönstret är en enda platt ljusblå yta, så att den kan maskas bort och landskapet läggas bakom i kod.

```prompt
Image 1 is a STYLE reference only: copy its soft premium toddler picture-book crayon technique, gentle grain, warm light and colours, not its subject. Background plate: the inside of a friendly, clean city bus, seen exactly side-on and straight-on, wide 16:9, completely flat, static view, no perspective. One big wide rounded-corner bus window fills most of the upper half of the picture, from about 12% to 88% of the width, with a thin grey rubber frame. Through the window there is NOTHING: the glass shows only one completely flat, even, pale sky blue (#CFE6F5) with no clouds, no trees, no snow, no buildings. Below the window, one long bus seat in warm cherry red (#D9443A) with a soft rounded backrest, seen from the front, its top edge just under the window, on a simple grey base. At the far right, one vertical sunny yellow (#F4C542) grab pole from floor to ceiling, and on it at about seat height one round red stop button on a small yellow box. The wall around the window is a soft warm cream (#F3EBDD) with a fine crayon grain; the floor at the bottom is a soft grey-blue (#B9C6D0) with fine speckle. No characters, no people, no animals, no text, no letters, no numbers, no signs, no advertisements.
```

## 2. Busshållplatsen i vinter (platta, 16:9)

```prompt
Image 1 is a STYLE reference only: copy its soft premium toddler picture-book crayon technique, pale wintry sky with crayon hatching, soft white snow, warm light, not its house or fence. Background plate: a quiet snowy bus stop in a small town in winter, wide 16:9, completely flat, static straight-on side view, no perspective. Pale blue winter sky in the top half with soft crayon hatching. In the middle distance a low row of soft snowy rounded hills and two or three small snowy fir trees. Across the picture at about 70% of the image height runs a calm, straight, snow-edged grey road seen from the side, empty, where a bus will drive in later. In front of the road a wide strip of soft white snowy pavement along the bottom of the picture. On the left, one round blue-and-yellow bus stop sign on a thin pole with a little snow cap, no text, and next to it one small simple wooden bench with snow on it and one small old-fashioned street lantern with a warm glowing light. The whole middle and right of the picture is empty road and snow, with space for characters and a bus added later. No characters, no people, no animals, no vehicles, no text, no letters, no numbers.
```

## 3. Bussen (urklipp)

```prompt
Image 1 is a STYLE reference only: copy its soft premium toddler picture-book crayon technique and gentle grain, not its subject. Draw ONE short, round, friendly city bus seen exactly from the side, facing right, in warm cherry red (#D9443A) with one sunny yellow (#F4C542) stripe along the side, a row of four big rounded windows showing only plain pale blue glass, one closed two-part folding door near the front with a vertical line in the middle, two black wheels with grey hubcaps, a little snow on the roof. A plain bus, NO face, no eyes, no mouth, no characters, no people, no driver, no text, no letters, no numbers, no logos. No shading, no 3D, no shine, no outline. A thin clean even white sticker border all around. Centered with space around, plain pure solid white background, no shadow, no ground.
```

## 4. Snöplogen (urklipp)

```prompt
Image 1 is a STYLE reference only: copy its soft premium toddler picture-book crayon technique and gentle grain, not its subject. Draw ONE small, friendly, chunky snow plough truck seen exactly from the side, facing left, sunny yellow (#F4C542) with a big rounded grey-blue plough blade at the front, round black wheels, one small round orange light on the roof, a little white snow pushed up in front of the blade. A plain truck, NO face, no eyes, no mouth, no people, no driver visible, no text, no letters, no numbers, no logos. No shading, no 3D, no shine, no outline. A thin clean even white sticker border all around. Centered with space around, plain pure solid white background, no shadow, no ground.
```

Snögubben (044) och julgranen med ljus (snögården) finns redan och återanvänds i fönstret.

## Omgång 3: utsikten genom fönstret (rad 16a, 16b, 20a, 26a)

Flow (Sannas Chrome, projektet "nov. 20 - 16:11"), Nano Banana 2.1, 16:9, x4, 0 krediter, 2026-11-20. **Utsikten:** stilreferens `assets/bakgrunder/busshallplatsen/vinter/busshallplatsen-vinter-v1.jpg`, tagningar i `assets/bakgrunder/utsikt-buss/original/` (`hus-`, `sjo-`, `skog-bro-`, `stan-1…4.jpg`, `jamforelse-<motiv>.jpg`). Promptens 60 % följdes inte: Flow lade horisonten där referensen har den, **67,6 %** av höjden, i 14 av 16 tagningar (inte `sjo-1` 59 %, `sjo-4` 50 %). Det gör remsorna kompatibla med hållplatsen; i fönstret (y 70–356) får de flyttas upp i kod. **Gången (avvisad 2026-11-20):** perspektivplattan avvisades av Sanna; rad 13a använder `i-bussen-v1.jpg`. De fyra kasserade tagningarna ligger kvar i `assets/bakgrunder/bussens-gang/original/`.

## 5. Utsikt: röda hus (rad 16a)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line at exactly 60% of the image height across the whole width; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges so the picture can be tiled side by side with similar strips. All objects stand on the horizon line in the middle band, between about 30% and 60% of the image height, with a little empty snow at both side edges. Subject: a row of four small simple red cottages (#C8372D) side by side with gaps between them, each with a thick white snowy roof, a small white door and two square windows glowing warm yellow (#F6C945). No snowflakes, no falling snow, no clouds, no sun, no road, no trees, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 6. Utsikt: frusen sjö (rad 16b)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line at exactly 60% of the image height across the whole width; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges so the picture can be tiled side by side with similar strips. All objects stand on the horizon line in the middle band, between about 30% and 60% of the image height, with a little empty snow at both side edges. Subject: one small frozen lake seen from the side as a long thin flat band of shiny pale ice blue (#BFE3F5) lying just on and below the horizon line in the middle of the picture, with two or three simple white shine streaks on the ice, low soft snowbanks at its ends, and three small rounded grey rocks with white snow caps along its edge. No snowflakes, no falling snow, no clouds, no sun, no road, no trees, no houses, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 7. Utsikt: granar och bro (rad 20a)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line at exactly 60% of the image height across the whole width; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges so the picture can be tiled side by side with similar strips. All objects stand on the horizon line in the middle band, between about 25% and 60% of the image height, with a little empty snow at both side edges. Subject: on the left half, five tall simple dark green fir trees (#2E6B3F) standing close together, each a plain stacked triangle shape with white snow on its branches; on the right half, one simple low flat wooden bridge in warm brown (#9A6A3C) with a plain railing, seen exactly from the side, crossing a narrow strip of icy pale blue stream (#BFE3F5) that lies just below the horizon line. No snowflakes, no falling snow, no clouds, no sun, no road, no houses, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 8. Utsikt: stan med ljus (rad 26a)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line at exactly 60% of the image height across the whole width; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges so the picture can be tiled side by side with similar strips. All objects stand on the horizon line in the middle band, between about 30% and 60% of the image height, with a little empty snow at both side edges. Subject: a small cosy town street seen exactly from the side: a row of five simple flat house and shop fronts side by side in a few bold colours (cherry red #C8372D, sunny yellow #F4C542, soft green #4F9A5E, warm orange #E8833A), each with a thick white snowy roof, big square windows glowing warm yellow, a few with a simple plain awning, a string of small round warm yellow lights hanging in gentle loops along the fronts, and a simple glowing yellow star shape in some windows. Plain shop fronts with NO signs and NO lettering. No snowflakes, no falling snow, no clouds, no sun, no road, no cars, no trees, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 9. Bussens gång (rad 13a, platta) – avvisad 2026-11-20

```prompt
Image 1 is a STYLE and COLOUR reference only: copy exactly its bold, flat, minimal look and its colours: the strong saturated sunny yellow walls (#F2B81C) with dense grainy oil-pastel texture, the cherry red (#D9443A) seats, the blue (#2F7FD0) grab poles, the white window frames with pale blue glass, the light grey floor, thin dark outlines. Background plate: the inside of an empty, clean, friendly city bus seen from just inside the front door, looking straight along the middle aisle towards the back of the bus, wide 16:9, simple gentle one-point perspective, the only perspective allowed. Light grey floor (#D6DCE2) as a wide aisle running down the middle into the distance. On both sides, rows of simple rounded cherry red seats one behind the other, getting smaller towards the back. Above the seats on both sides, simple rounded windows with white frames showing only flat pale blue glass (#CFE6F5), nothing outside. Yellow walls and a plain yellow ceiling. A few vertical blue grab poles from floor to ceiling along the aisle; on the nearest pole, in the right foreground, at about middle height, one small white box with one round red stop button. Very few objects, minimal, bold, flat colours, lots of calm empty space in the lower middle of the picture. Empty bus, no driver, no steering wheel, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs, no screens, no advertisements.
```

## Omgång 4: det som v3 behöver (2026-11-20)

Flow i Sannas Chrome, Nano Banana, 16:9, x4. Remsorna har hållplatsen i vinter som stilreferens (horisonten hamnar då på 67,6 %, som de andra remsorna). Dörrplattan har mottagningen som stilreferens. Kaninen i pulkan och fågeln läggs på i kod, de finns inte i bilderna.

## 10. Utsikt: pulkabacken (rad 21–23)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line across the whole width at the same height as in image 1; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges so the picture can be tiled side by side with similar strips. Subject: one big smooth rounded snow hill in the middle of the picture, a soft white dome rising from the horizon to about 30% of the image height, with a long gentle empty slope down to the right that is clear and smooth for sledding, a soft pale blue shadow along its left side, and two small simple dark green fir trees (#2E6B3F) with snow on them standing on its top. No snowflakes, no falling snow, no clouds, no sun, no road, no sled, no tracks, no houses, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 11. Utsikt: farmors och farfars hus (rad 45–46)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look: the same strong saturated blue sky (#3E8FE0) filled edge to edge with dense grainy oil-pastel texture, the same clean flat white snow ground, crisp simple shapes, very few objects. Do not copy its bus stop sign, bench or road. Background strip for a view seen through a bus window, wide 16:9, completely flat, straight-on side view, no perspective, no depth. The horizon is one perfectly straight horizontal line across the whole width at the same height as in image 1; above it only flat bold blue sky, below it only flat white snow. Sky and snow continue unbroken to the left and right edges. Subject: one single cosy red cottage (#C8372D) standing alone in the middle of the picture, bigger than a normal background house, with a thick white snowy roof, a small chimney, two square windows glowing warm yellow (#F6C945), a white front door in the middle with a round green Christmas wreath with a red bow on it, a small lantern glowing beside the door, and a low white picket fence on each side. No snowflakes, no falling snow, no clouds, no sun, no road, no trees, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

## 12. Farmors dörr (platta, rad 47–52)

```prompt
Image 1 is a STYLE reference only: copy exactly its bold, flat, minimal look, its strong saturated colours, dense grainy oil-pastel texture and crisp simple shapes, with very few objects. Do not copy its room or furniture. Background plate, wide 16:9, completely flat, straight-on front view, no perspective. Close view of the front of a cosy red wooden cottage (#C8372D) filling the whole picture: in the middle a big simple white front door, closed, with a round green Christmas wreath with a red bow on it, a round brass door handle, a small flat stone step in front of it, a lantern glowing warm yellow on the wall beside the door, and one square window glowing warm yellow (#F6C945) on each side of the door. The bottom 20% of the picture is flat clean white snow ground in front of the house. The door and step must be big and clear, the door about 55% of the picture height, so a small character can stand on the step. No snowflakes, no falling snow, no snow in the air, no sky, no characters, no people, no animals, no faces, no text, no letters, no numbers, no signs.
```

Den öppna dörren görs som en redigering av den valda tagningen (samma bild, dörren öppen inåt, varmt gult ljus inifrån och tom dörröppning där farmor ställs i kod).

**Valda 2026-11-20** (Claude på Sannas uppdrag *"Use your picks"*): hus 1, sjö 3, pulkabacke 1, skog och bro 2, stan 3, farmors hus 1 (alla med horisonten på y 521) → `assets/bakgrunder/utsikt-buss/*.jpg`, se `bakgrunder/utsikt-buss.md`. Farmors dörr tagning 1 → `farmors-dorr-v1.jpg`; den öppna dörren är Flows redigering av den, men bara dörröppningen inklistrad i den stängda plattan (`farmors-dorr-oppen-v1.jpg`), se `bakgrunder/farmors-dorr.md`.
