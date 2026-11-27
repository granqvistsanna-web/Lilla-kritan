# Bildlista – Avsnitt 065 Våren i boken

Det fasta (boken, skrivbordet, himlen, molnen, kullarna, solen, granarna, kritan) finns redan, se *Uppslaget* i [`manus.md`](manus.md). Här står bara det som är **nytt**. Grind 2 (2026-11-27): 4 tagningar per ark i Flow ligger i `bilder/original/`, sida vid sida i `bilder/jamforelse.jpg`. Fjärilen och nyckelpigan ritas i kod i stället (se *Ritas i kod*), så av ark D används bara boet.

| # | Typ | Vad | Vem | Hamnar i | Klar |
|---|---|---|---|---|---|
| 1 | Kritans teckning 1 | **gula tulpanen**, utslagen (också pärmens siluett som knopp, ark C) | grind 2 (rekvisita, 4 tagningar) | `rekvisita/tulpan-gul.md`, `assets/rekvisita/tulpan-gul/` | ☐ |
| 2 | Kritans teckning 2 | **vattenkannan** | grind 2 (rekvisita, 4 tagningar) | `rekvisita/vattenkanna.md`, `assets/rekvisita/vattenkanna/` | ☐ |
| 3 | Landskapskort | röda och lila tulpanen, utslagna (ark A, samma ark som 1 och 2) | Sanna i Flow | `produktion/three-rum/popupbok/bilder/` | ☐ |
| 4 | Landskapskort | röda, gula och lila tulpanen, hängande (ark B, edit av ark A) | Sanna i Flow | `popupbok/bilder/` | ☐ |
| 5 | Landskapskort | röda, gula och lila tulpanen, slutna knoppar (ark C, edit av ark A) | Sanna i Flow | `popupbok/bilder/` | ☐ |
| 6 | Landskapskort | fågelboet med tre ägg (ark D) | Sanna i Flow | `popupbok/bilder/` | ☐ |
| 7 | Statist | fjärilen: **ritas i kod** (ark D bara som förlaga för form och färg) | kod | `scener/boken/` | ✅ prov |
| 8 | Statist | nyckelpigan: **ritas i kod** (ark D bara som förlaga) | kod | `scener/boken/` | ✅ prov |

Urklipp med tunn vit kant (ca 1 % av höjden, `verktyg/tunn_kant.py`) och platt fot så att korten kan stå. Varje tulpan i sina tre lägen ska ha samma fotpunkt och samma bredd på stjälken, så att bildbytet inte hoppar.

## Ritas i kod

Små, enkla former som läses bra i liten storlek och som ska röra sig. De ritas i `scener/boken/` med samma verktyg som 062 och ska se ut som Lilla Kritan v2: vaxkorn med `kritYta` ur `produktion/three-rum/popupbok/bok-parm.js` (samma kritstreck och papperskorn som marken och pärmen), vit kant 3 px i bild (som riggen på kortet, skillen `vita-kanter`), line boil 2,5 px i bild delat med kamerazoomen och ny brusbild 6 gånger/s, och en mjuk kontaktskugga (`KSKUGGA`). Färgerna tas ur ark D, så att de passar boet och tulpanerna.

| Sak | Hur | Hur den rör sig | Återanvänder |
|---|---|---|---|
| **Nyckelpigan** | en liten canvas-textur på ett platt kort som ligger på de gula blommorna: oval rygg i `kritYta` röd (#E8322E), mittlinje, sex svarta prickar, svart halvrunt huvud, sex korta ben och två antenner som mörka kritstreck. Vit kant ur kortets alfa | kryper sakta några cm på bladet (benen växlar mellan två lägen, 4 gånger/s), stannar. Glimtar på *"nyckelpiga"* och *"Hej då, nyckelpigan!"* | `kritYta`, 062:s `kort()` och kontaktskugga |
| **Fjärilen** | kroppen ett mörkbrunt kritstreck med två krullade antenner, och vingarna som **två egna kort** (vänster och höger) i `kritYta` orange (#FF8A1F) med en gul (#FFC61A) prick var, vit kant | vingarna fälls som en bok kring kroppen (riktig 3D-vickning i three.js, långsamt när den sitter, 3 gånger/s när den flyger). Flyger i en lugn båge till musens huvud (rad 23) och tillbaka | `kritYta`, 062:s `vik()` för vingarna, banan som 062:s glass i en båge |
| Vattendropparna ur kannan och på fötterna | små blå droppar i riggens ruta med vit kant | redan i kod, som 062:s glassdroppe och vattendroppar (`dropparG`) | 062 `boken.js` |
| Siffrorna 1, 2, 3 | kritan-linjer via `verktyg/kritan-ritar.js` (bara linjen, ingen krita i bild) | ritas på ordet, tonas bort efter rad 20 | `kritan-ritar.js` |
| Glimten på boet, äggen, blommorna och djuren | skimret som i 062 | – | 062 |
| Små vita prickblommor i gräset | prickar i markens `kritYta` | står still | 062:s mark |

Det som stannar i Flow: tulpanerna (stora, med kritkorn, tre lägen som måste ha samma fot), vattenkannan och den gula tulpanen (kritans teckningar behöver bilden för konturen), boet (kvistarna är textur). Knopparna som öppnar sig görs som bildbyte mellan ark C och ark A med en mjuk skala, inte som kodade kronblad.

**Stillbildsprov gjort 2026-11-27:** `prov/insekter/` (`prov.js`, stillbilder i `prov/insekter/stills/`, närbilderna sida vid sida i `prov/insekter/jamforelse-nara.jpg`: kod, Flow, kod med vingarna på väg att fällas). Kodversionerna har samma färger, kritkorn och vita kant som Flow-urklippen och läses lika tydligt. Fjärilens vingar fälls i 3D och nyckelpigans ben växlar. ✅ **Sanna valde kod 2026-11-27.** Koden i `prov/insekter/prov.js` (`nyckelpiga()`, `vinge()`, `fjarilKropp()`, `krit()`, boil 6 gånger/s) flyttas in i scenen i grind 6. Bakgrunden i provet är bara marken, inte hela uppslaget.

**Osäkert:** om nyckelpigan och fjärilen ser lika bra ut i kod som Flow-korten bredvid. Gör ett snabbt **stillbildsprov** i three.js-boken först: nyckelpigan och fjärilen i kod bredvid ark D2:s urklipp, på en tulpan i halvbild och närbild, och låt Sanna välja innan scenen byggs.

## Prompterna (Google Flow, Nano Banana)

Bild 1 = `produktion/three-rum/popupbok/bilder/glass.png` som stilreferens (popupbokens kort). Bild 2 = `blommor.png` från samma mapp, så att tulpanerna får samma gröna stjälkar som sommarblommorna.

### Ark A – tulpanerna och vattenkannan (1:1)

```prompt
Image 1 and image 2 are STYLE references for the crayon feel and the sticker look, not their subjects. A sheet of FOUR separate simple toddler-cartoon spring things in a 2x2 grid with lots of white space between them, each with its own thick clean white sticker border, slightly hand-cut, and a flat bottom so it can stand: top left, one tall upright tulip with a bold red (#E8322E) cup-shaped flower head of three rounded petals, a straight bright green (#4CB944) stem and two long green leaves at the bottom; top right, the exact same tulip shape but bold sunny yellow (#FFC61A); bottom left, the exact same tulip shape but bold purple (#9B5BD4); bottom right, a small round watering can in bold sky blue (#3B9BE8) with a short straight spout pointing up to the right, a round sprinkler head on the spout with a few dots, and a curved handle on top. All three tulips are the same size, same stem and same leaves, only the colour of the flower changes. The colours stay strong and solid, with a light wax-crayon texture on top: visible fine paper grain and a few soft, slightly lighter crayon strokes. No shading, no highlights, no gradients, no dark outline, no faces. Strong, clear, cheerful colours with high contrast, no pastel. Pure solid white background, no shadow, no text.
```

### Ark B – tulpanerna hänger (Flow edit av ark A)

Gör det som en **edit** av den valda ark A-bilden, så att formen, färgerna och kornet blir desamma.

```prompt
Keep everything exactly the same style, colours, crayon texture, white sticker borders and size. Change only this: each of the three tulips now droops because it is thirsty. The stem bends over in one soft curve from halfway up, so the flower head hangs down to the side, pointing towards the ground, and the two leaves droop a little. The flower heads keep their shape and colour, not wilted, not brown, not broken. The stem bottom stays in exactly the same place with the same flat bottom. Remove the watering can and leave plain white there. Pure solid white background, no shadow, no text.
```

### Ark C – knopparna (Flow edit av ark A)

```prompt
Keep everything exactly the same style, colours, crayon texture, white sticker borders and size. Change only this: each of the three tulips is now a closed bud. The flower head is a slim closed oval bud in bright green (#4CB944) with only a thin stripe of its colour (red, yellow, purple) showing at the very tip. Same straight stem and the same two leaves, same height, and the stem bottom stays in exactly the same place with the same flat bottom. Remove the watering can and leave plain white there. Pure solid white background, no shadow, no text.
```

Den gula knoppen blir också pärmens siluett (`skapaBok(scen, { farg: grön, figur: <gula knoppen> })`).

### Ark D – fågelboet, fjärilen och nyckelpigan (16:9)

```prompt
Image 1 and image 2 are STYLE references for the crayon feel and the sticker look, not their subjects. A sheet of THREE separate simple toddler-cartoon spring things in one row with lots of white space between them, each with its own thick clean white sticker border, slightly hand-cut: left, a round bird's nest seen from the side and a little from above, woven from warm brown (#A0662F) twigs in a few simple crayon strokes, with three small round pale sky-blue eggs (#9FD3F0) peeking over the rim, flat bottom so it can sit on a branch; middle, a small butterfly seen straight from above with its four wings spread open, bold orange (#FF8A1F) wings with one round yellow (#FFC61A) dot on each, a slim dark brown body and two short curled antennae; right, a small ladybug seen straight from above, a round bold red (#E8322E) shell with six round black dots and a line down the middle, a small black head and six tiny black legs. Real ordinary little animals, simple and round, no faces, no eyes drawn on. The colours stay strong and solid, with a light wax-crayon texture on top: visible fine paper grain and a few soft, slightly lighter crayon strokes. No shading, no highlights, no gradients, no dark outline. Strong, clear, cheerful colours with high contrast, no pastel. Pure solid white background, no shadow, no text.
```

## Kritans två teckningar (grind 2)

Kritan ritar dem via `verktyg/kritan-ritar.js`. Konturen ur `verktyg/kontur.py` (`<sak>-kontur.json` bredvid `cut/<sak>.png`), mätt ur den valda bilden, så att teckningen har samma form och delar som bilden den blir.

| Teckning | Kontur (ett drag) | Detaljstreck (2–6) | Var den ritas |
|---|---|---|---|
| **Gula tulpanen** | hela tulpanens ytterform: kronan med de tre kronbladen, stjälken och bladen | skarvarna mellan de tre kronbladen (2), stjälken från kronan ner till bladen (1), bladens mittnerv (2) | på sidan mitt i rabatten, mellan de två knopparna. Kortet fälls upp med `pop` när den fyllts i |
| **Vattenkannan** | kannans kropp med handtaget och pipen | strilmunstycket som en cirkel (1), två–tre prickar i munstycket, skarven mellan pipen och kroppen (1) | på gräset bredvid musen. Kortet fälls ner när kannan glider till handen |

Kannan ska vara liten nog att ligga i musens hand (ungefär lika hög som kroppen) och läsas som en vattenkanna i siluett: pipen och munstycket är det som avslöjar den i gisspausen.
