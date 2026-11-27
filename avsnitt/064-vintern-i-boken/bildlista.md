# Bildlista – Avsnitt 064 Vintern i boken

Till grind 2. Det fasta (logotypen, skrivbordet, boken, kritan, prenumerera, outro) finns redan och listas inte. Sanna gör landskapskorten i Flow (Nano Banana, 0 krediter), och de hamnar i `produktion/three-rum/popupbok/bilder/` med originalen i `bilder/original/`, som 062:s.

## Nya landskapskort (Sanna i Flow)

Sanna 2026-11-27: *"consider what can be drawn in code"*. Bara det som är stort, har kritstruktur och inte kan mätas fram ur en bild som redan finns görs i Flow. Resten står under *Ritas i kod*.

| # | Fil | Vad | Referensbild i Flow | Klar |
|---|---|---|---|---|
| 2 | `gran-sno-bok.png` | 062:s gran med snö på grenarna, samma form (snökuddarna följer granens våningar, svårt att rita snyggt i kod) | bild 1 = `assets/bakgrunder/skogen-gron-saker/gran.png` | ☐ |
| 3 | `trad-kalt.png` | ett litet kalt lövträd utan löv och utan snö, tre tydliga vågräta grenar där fåglarna sitter | bild 1 = `gran.png`, bild 2 = `kullar-a.jpg` (bara stilen) | ☐ |

Efter Flow: urklipp med vit kant, kanten tunnad till ca 1 % (`verktyg/tunn_kant.py`, minnet *Vita kanter för tjocka*). Granen med snö ska ligga exakt på granen utan snö (samma storlek, samma kontur) så att den kan tonas över. Om Flow ändrar formen: gör om redigeringen, eller lägg snön på granen i kod som på trädet. Prompterna för kullarna och trädet med snö och för vinterhimlen ligger kvar längst ner som **reserv** om koden inte räcker.

## Ritas i kod

Allt i kod ska se ut som Lilla Kritan v2: kritkorn (`kritYta` i `produktion/three-rum/popupbok/bok-parm.js` ger ytan med papperskorn, samma som pärmen och marken i 062), svag line boil 2,5 px i bild (delad med kameraavståndet som grodans kort i 062), vit kant (`verktyg/kant.js`, skillen `vita-kanter`: 3 px + 1 % av sakens höjd i bild) där saken är ett eget urklipp, och kontaktskugga (`KSKUGGA`, mjuk rund skugga vid foten) där något står på marken. Snön lägger sig **på** sidan och går aldrig igenom den.

| Vad | Hur | Hur det rör sig | Återanvänder |
|---|---|---|---|
| **Snöfallet** | små platta vita krit-flingor (`THREE.Points` med en mjuk rund prick, flera storlekar, några större nära kameran och suddiga) | faller långsamt (en sidhöjd på ca 8 s) och vajar; varje flinga stannar på marken, en kortöverkant eller kaninens öron och tonas bort där inom 1 s, så att den smälter in i snötäcket. Tätare i 05–05b, glesare resten av avsnittet | julkalender-introts snö i `produktion/three-rum/julkalender-intro/rum.js` (tre djup, samma flingor varje gång, inte där figuren står) och 062:s droppar |
| **Marken blir vit** | markarket i `kritYta` får två dukar, frostgrön och snövit (`#F7F9FC`, ljusblå skugga `#BFD3EA` mot kanterna), som blandas nerifrån och upp med en mjuk, lite ojämn kant | ca 5 s i 05b | 062:s markark |
| **Snön på kullarna** | en snövit kritduk maskad med kullkortets egen alfa (samma form, samma vita kant), ljusblå längs nederkanten och i dalarna | snön växer in **uppifrån och ner** över kullen på ca 4 s i 05b; den gröna syns under tills den är täckt | 062:s `kulle-bak.png`, `kulle-fram.png` (ersätter Flow-bilderna `kulle-*-sno`) |
| **Snön på det kala trädet** | tre mjuka snökuddar i kritvitt med ljusblå undersida, en per gren, ritade längs grenarnas ovankant (mäts ur `trad-kalt.png` när Sanna valt tagning), och små tussar på kvistarna | kuddarna växer upp ur grenen under snöfallet; fåglarna sitter ovanpå snön, aldrig i den | ersätter Flow-bilden `trad-kalt-sno` |
| **Vinterhimlen** | 062:s `himmel.png` färgad kallare och blekare i kod (lägre mättnad, lite grått) | – | 062:s himmel (ersätter `himmel-vinter`) |
| **Snöbollarna** | `assets/rekvisita/snoboll/cut/snoboll.png`, vriden och skalad i kod | rullar framför kaninen (vrids, den är rund) och växer från liten till sin storlek; stannar på *"snöboll"*. Stor, mellan, liten | 044:s `boll(x, y, r, v)` och rullningen i rad 6–8 (`avsnitt/044-katten-gor-en-snogubbe/scener/bjorkdungen/index.html`), där katten skjuter med båda tassarna |
| **Spåret efter bollen** | ett mjukt, lite blåare band i snön bakom bollen (bollens bredd), ritat på markarket | växer bakom bollen medan den rullar och ligger kvar | – |
| **Fotspåren** | par av små ovala tassavtryck (ljusblå, mjuk kant) på markarket | ett par per steg på `knarr-sno` i 06c och när kaninen går till granen och trädet | julkalender-introts tassavtryck (`rum.js`, rad 354–363) |
| **Snöpuffar vid fötterna** | 4–6 små vita krit-prickar | puffar upp och faller tillbaka på varje skutt och steg | – |
| **Andedräkten** | ett litet vitt moln (2–3 mjuka cirklar) vid nosen | växer och tonas bort var 2:a s medan kaninen fryser (07–12), slutar när öronen är varma | 045:s ånga (`avsnitt/045-lammet-bakar-pepparkakor/scener/julkoket/index.html`, rad 109) |
| **Frosten på öronen** | ljusblå kritfärg (`#BFD3EA`) över öronspetsarna i riggens SVG, maskad med öronens form | tonas in i 07, bort i 13 | v2-riggens öron |
| **Flingorna på öronen** | 3–4 av snöfallets flingor som stannar på öronspetsarna | ligger kvar 07–11, faller av när pannbandet glider ner | – |
| **Fåglarnas vinge, näbb, ben och öga** | `fagel-kropp-rod|bla|gul-kod.png` + 043:s `fagel.js` (vingen, näbben som öppnas på pip, benen, ögat som blinkar) | sitter på sina grenar, lyfter vingen och piper på sitt färgord | 043 och 044 (bara kropparna är bilder) |
| **Snötussen från granen** | `assets/rekvisita/snotuss/cut/snotuss.png` | glider av grenen, landar ovanpå kaninens huvud, faller ner bredvid | finns |
| **Snögubben** | `assets/rekvisita/snogubbe/cut/snogubbe.png` | fälls upp på *"snögubbe"* | finns. 044 bygger i stället snögubben av tre `snoboll.png` med stenar i kod, om vi vill att bollarna blir gubben (manus Öppet 2) |
| **Pannbandet på huvudet** | `pannband_kod()` som i 039 (rakt stickat band, egen vit kant 7 px) | glider ner över öronen, öronen ploppar upp | 039 (`avsnitt/039-kaninen-aker-pulka/provbild-klader.py`) |
| **Skimret, glimtarna, krit-gnistorna** | som 062 | på orden | 062 |

**Nyckelpigan:** finns inte i 064. Hon hör till vårens uppslag (065), där en liten nyckelpiga på en blomma passar bra i kod (röd halvcirkel med kritkorn, svart huvud, sex prickar, en mittlinje som öppnas när hon flyger).

## Flow-prompter

### 2. Granen med snö (Flow)

```prompt
Edit this image. Keep the fir tree sticker EXACTLY the same: same outline, same size, same position, same trunk, same white sticker border, same plain white background. Only add snow: a soft thick layer of fresh snow lying on top of every layer of branches, like little white pillows that follow the branch tiers, and a small cap of snow on the very top. The snow is warm white wax crayon (#F7F9FC) with fine speckled paper grain and soft mottled crayon strokes, with gentle pale icy-blue shading (#BFD3EA) underneath each snow pillow. The green under the snow stays the same colour. Flat, even crayon fill like the original, no dark outline, no snowflakes in the air, no ground, no text, no 3D, no shine.
```

### 3. Det kala trädet (Flow)

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE small bare winter tree with no leaves, very simple and childish like a toddler picture-book drawing: a short, sturdy, slightly curved warm brown trunk (#8A5A34) and exactly three thick, rounded, almost horizontal branches spread out at different heights (one low to the left, one in the middle to the right, one high to the left), each branch long and flat enough on top for a small round bird to sit on, plus a few short stubby twigs at the branch tips. The branches are thick and soft like crayon strokes, not thin or spiky. No leaves, no snow, no birds, no face, no grass, no ground, no text, no 3D, no shine. A thick, clean, even white sticker border all around the whole tree. Centered, the tree fills about 80 percent of the frame height, plain pure solid white background, no shadow.
```

## Reserv: Flow-prompter om koden inte räcker

### Reserv: kullarna med snö

```prompt
Edit this image. Keep both hill stickers EXACTLY the same: same outline, same size, same position, same white sticker border, same plain white background. Only change the colour: cover both hills completely with thick soft fresh snow, like a winter picture-book drawing. The snow is warm white wax crayon (#F7F9FC) with fine speckled paper grain and soft mottled crayon strokes, with gentle pale icy-blue shading (#BFD3EA) along the lower part of each hill and in the dips between the bumps, and a faint slightly darker blue-grey crayon edge. The top hill is a touch whiter, the bottom hill a touch bluer, so the two still read as two layers. A few tiny hints of the original green may peek through at the very bottom edge. No trees, no animals, no snowflakes in the air, no text, no 3D, no shine, no dark outline.
```

### Reserv: det kala trädet med snö

```prompt
Edit this image. Keep the bare tree sticker EXACTLY the same: same outline, same size, same position, same trunk and branches, same white sticker border, same plain white background. Only add snow: a soft rounded line of fresh snow lying on top of each of the three branches and on the twig tips, like thin white pillows, thicker in the middle of each branch. The snow is warm white wax crayon (#F7F9FC) with fine speckled paper grain and soft mottled crayon strokes, with gentle pale icy-blue shading (#BFD3EA) on its underside. The brown trunk and branches stay the same colour. Flat, even crayon fill like the original, no dark outline, no birds, no snowflakes in the air, no ground, no text, no 3D, no shine.
```

### Reserv: vinterhimlen

```prompt
Edit this image. Keep the sky card EXACTLY the same: same shape, same size, same crayon texture, same white sticker border, same plain white background. Only change the colour into a calm winter sky: a pale, soft, slightly cool light blue (#BCD6EC) that turns almost white-blue near the bottom (#E6EFF7), with a faint hint of grey, gentle and light, not dark or stormy. Flat, even wax-crayon fill with fine speckled paper grain and soft mottled strokes, no sun, no clouds, no snowflakes, no text, no 3D, no shine, no dark outline.
```

## Kritans två teckningar (grind 2)

Båda urklippen finns redan. Det som behövs är konturerna som `verktyg/kritan-ritar.js` ritar (kontur + 2–6 detaljstreck, skillen `kritan-ritar`).

| # | Teckning | Urklipp | Kontur | Detaljstreck (förslag) | Klar |
|---|---|---|---|---|---|
| 1 | **Snöflingan** på himlen (också pärmens siluett) | `assets/rekvisita/snoflinga/cut/snoflinga.png` | ✅ **ny skarpare kontur** `snoflinga-kontur-skarp.json` (2026-11-27, `kontur.py --slat 3 --steg 10 --krymp 9 --mitt`). Den gamla `snoflinga-kontur.json` (041) var så slätad att V-grenarnas skåror bara gick halvvägs in; den ligger kvar orörd för 041 | sexkanten i mitten (1 streck: konturen har redan alla sex armar och tolv V-grenar) | ✅ |
| 2 | **Pannbandet** på snön bredvid kaninen (Sanna 2026-11-27, i stället för mössan) | `assets/rekvisita/pannband/cut/pannband.png` (894 × 636, bågen, tagning 1) | ✅ `pannband-kontur.json` (2026-11-27, `kontur.py --krymp 9 --mitt`, avvikelse medel 0,7 px). Fyllningen börjar i bågens topp (`mitt` 447, 95) | den ljusa randen + fem korta ribbor tvärs över ytterhalvan, så att det läses som stickat | ✅ (tagning 1 vald av Sanna 2026-11-27) |

Kontrollbild: [`grind2/konturer.jpg`](grind2/konturer.jpg), teckningen till vänster och bilden till höger. Pannbandets urklipp är tagning 1, vald av Sanna 2026-11-27.

På huvudet ritas pannbandet i kod som i 039 (`pannband_kod()` i `avsnitt/039-kaninen-aker-pulka/provbild-klader.py`). Bågen i teckningen och det raka bandet på huvudet ska ha samma färger och ribbor.

## Saker som finns och används som de är

`snoboll` (tre storlekar), `snotuss`, `snogubbe`, `smafaglar` (kropparna `-kod.png` + 043:s `fagel.js`), `popupbok/bilder/` himmel, moln och `kanel.png` (platt kort till animatiken). Inga nya saker i `rekvisita/`.
