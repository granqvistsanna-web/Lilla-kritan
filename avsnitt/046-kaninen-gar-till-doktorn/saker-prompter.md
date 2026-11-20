# 046 – stetoskopet och öronlampan: Flow-prompter (grind 2, utkast)

> **Används inte** (Sanna 2026-11-20: *"stetoskop kod"*, *"öronlampa kod"*). Båda ritas i kod i [`verktyg/doktor-saker.js`](../../verktyg/doktor-saker.js). Bara redigeringen *Doktorn A utan stetoskop* nedan är gjord (`doktorn-a-utan-stetoskop.jpg`). Prompterna sparas om en bild behövs senare.

Grind 2 för sakerna. Doktorn A och mottagningen v2 är klara. Nu görs de två nya sakerna och doktorn utan stetoskop (se nedan). Google Flow, Nano Banana Pro, 1:1, 0 krediter, **4 tagningar per sak**. Lägg tagningarna i `assets/rekvisita/<sak>/original/<sak>-1…4.jpg`, sedan gör Claude `original/jamforelse.jpg`, och Sanna väljer. Först efter valet skrivs `rekvisita/stetoskop.md` och `rekvisita/oronlampa.md` och raderna i `rekvisita/README.md`.

**Stilreferenser (samma för båda):**

- Bild 1 = `assets/karaktarer/doktorn-a/premium/original/doktorn-a-forsta.jpg`: tekniken och stetoskopet runt doktorns hals (mörkgrå slang, liten silverrund bröstdel), så att sakerna hör ihop med doktorn.
- Bild 2 = `assets/bakgrunder/mottagningen/mottagningen-v2.jpg`: undersökningslampans vita och ljusgrå, och den korallröda britsen.

## Förslag: doktorns hand i närbilderna görs i kod

Receptet säger ett urklipp per sak (rockärm, hand, sak). Doktorn A har nu **armbågsarmar i kod** (`armRita()` i `uttryck.html`: rockens krita, grå kant, manschettstreck, rund hand). Samma funktion kan rita ärmen och handen i närbilderna, i större skala, och saken läggs i handen. Då behövs **inga hand-urklipp i Flow**, ärmen ser exakt ut som doktorns, och samma hand fungerar för stetoskopet, lampan och senare sprutan. Bara själva sakerna görs som bilder.

- **Stetoskopet:** bröstdelen med en kort bit slang klipps ur den valda bilden (`cut/stetoskop-brostdel.png`). Resten av slangen ritas i kod som en mjuk mörkgrå kritkurva från bröstdelen ut ur bild uppåt höger (mot doktorns hals). Hela stetoskopet (`cut/stetoskop.png`) finns kvar för uppslag 11 om en tydligare "titta, ett stetoskop" behövs.
- **Öronlampan:** hela lampan i handen, spetsen pekar åt vänster mot örat (handen kommer in från höger). Ljuset är en mjuk gul cirkel i kod.

## Stetoskopet

Ska kännas igen direkt: Y-formad slang, två små öronproppar, en rund bröstdel. Samma färger som stetoskopet runt doktorns hals.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), and match the stethoscope around the doctor's neck in Image 1, not the subjects. Draw ONE simple toy-like doctor's stethoscope lying flat, seen from straight above, very simple and childish: a soft chunky dark grey tube (#5E6670) in a relaxed Y shape, the two short upper arms ending in two small round light grey ear tips, the single lower tube curving gently down and to the right to one round chest piece. The chest piece is a flat round disc in light silver grey (#C9D2DA) with a slightly darker grey rim and a small flat round centre, about as wide as three tube widths. Big simple shapes, few parts, no metal shine, no reflections, no screws, no text, no face, no shading, no 3D, no outline. A thick, clean, even white sticker border all around the whole stethoscope as one piece. Centered with space around, plain pure solid white background, no shadow, no ground, no hand.
```

## Öronlampan

En liten handlampa för öronen: kraftigt handtag, rundat huvud, kort trubbig spets. Ingen vass spets, inget som ser ut som ett verktyg som sticker. Handtaget i doktorns turkos så att den syns mot både den blå väggen och kaninens ljusa öra.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE simple toy-like doctor's ear light, lying sideways and seen exactly from the side, very simple and childish: a short chunky rounded handle in soft turquoise (#3BB4A8) on the RIGHT, with one small round light grey button on top, joined to a rounded white head (#F4F4F2) with a soft light grey rim, and from the head a short, wide, BLUNT, rounded light grey cone tip (#C9D2DA) pointing to the LEFT. The tip is soft and round at the end, never sharp. The whole light is about three times as long as it is tall. Big simple shapes, few parts, no light beam, no glow, no metal shine, no reflections, no text, no face, no shading, no 3D, no outline. A thick, clean, even white sticker border all around the whole light as one piece. Centered with space around, plain pure solid white background, no shadow, no ground, no hand.
```

## Doktorn A utan stetoskop (redigering)

Sanna 2026-11-20: **när doktorn lyssnar ska stetoskopet sitta i doktorns öron.** Stetoskopet är inbakat i doktorns kropp (runt halsen), så det kan inte flyttas. Därför görs kroppen om utan stetoskop, och hela stetoskopet ritas i kod: runt halsen som nu, eller med öronpropparna i öronen (öronen syns under håret vid ca x 385 och 640, y 265 i 1024-rutan) och slangen ner till bröstdelen i handen. Det här är en redigering av en låst figur, gjord på Sannas begäran.

Bild 1 = `assets/karaktarer/doktorn-a/premium/original/doktorn-a-utan-lemmar.jpg`. 2 tagningar räcker. Bara kroppen klipps om (`cut/doktorn-a-body-nk.png`); huvud, armar och ben är oförändrade.

```prompt
Edit Image 1. Keep the doctor EXACTLY the same: same blank face, hair, ears, neck, white coat with its lapels, pocket and shoulder seams, turquoise top, colours, position and size in the frame, same flat crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove the stethoscope completely, both the dark grey tube around the neck and the round silver chest piece. Fill those areas with the same white coat, lapels and turquoise top that would be underneath, continuing the existing shapes and texture seamlessly. Nothing else changes.
```

## Efter valet

1. `verktyg/egen_kant.py` klipper ut, kanten tunnas till skillen `vita-kanter` (3 px + 1 % av höjden i bild).
2. Stetoskopets bröstdel klipps loss med en kort slangstump (`cut/stetoskop-brostdel.png`), och slangens färg mäts för kodkurvan.
3. `rekvisita/stetoskop.md` och `rekvisita/oronlampa.md` i samma form som `rekvisita/handfatet.md`, och raderna i `rekvisita/README.md`. `python3 verktyg/prompt.py --lista` ska gå igenom.
4. Ett instick-prov: kodhanden med bröstdelen och med lampan, mot kaninens mage och öra, så att Sanna kan se storleken innan grind 3.

## Nytt gosedjur (Sanna 2026-11-20: "a new teddy animal that's yellow or pink, maybe a leo small")

Bild 1 = `assets/rekvisita/nalle/cut/nalle-v2-ljus-tunn.png` (stil, form och storlek, inte färgen). Inget ansikte i bilden: ansiktet ritas i kod som nallen v2. Google Flow, Nano Banana Pro, 1:1, 4 tagningar per alternativ, i `assets/rekvisita/<sak>/original/`.

**Obs:** blir det en leopard säger Malin *"nallen"* i ca 16 repliker. Då måste de spelas in igen (*"leoparden"*, eller *"gosedjuret"*). En rosa eller gul **nalle** behåller alla repliker.

**A – rosa nalle**

```prompt
Image 1 is the STYLE and SHAPE reference: copy its drawing technique exactly (soft wax crayon with fine visible strokes, flat colour, a thick clean even white sticker border, no dark outline, no 3D shading), its sitting pose seen from the front, its proportions and its size in the frame. Draw the SAME soft toy teddy bear, ONLY change its colours: the body, head, arms and legs in a soft warm candy pink (#F29BB5) with slightly darker pink crayon strokes, the round tummy patch, the inner ears and the foot pads in light cream (#FBEBD8). No face at all: no eyes, no nose, no mouth, no snout patch. Plain pure white background, no shadow, no text.
```

**B – gul nalle**

```prompt
Image 1 is the STYLE and SHAPE reference: copy its drawing technique exactly (soft wax crayon with fine visible strokes, flat colour, a thick clean even white sticker border, no dark outline, no 3D shading), its sitting pose seen from the front, its proportions and its size in the frame. Draw the SAME soft toy teddy bear, ONLY change its colours: the body, head, arms and legs in a warm sunny butter yellow (#F6C945) with slightly darker golden crayon strokes, the round tummy patch, the inner ears and the foot pads in light cream (#FBEBD8). No face at all: no eyes, no nose, no mouth, no snout patch. Plain pure white background, no shadow, no text.
```

**C – liten gosedjursleopard**

```prompt
Image 1 is the STYLE and SHAPE reference: copy its drawing technique exactly (soft wax crayon with fine visible strokes, flat colour, a thick clean even white sticker border, no dark outline, no 3D shading), its chunky sitting pose seen from the front, its soft rounded toy proportions and its size in the frame. Draw a small soft toy LEOPARD instead of a bear, sitting the same way: a round head with two small round ears, a chunky body, short stubby arms and legs, a short thick tail curling around one foot. Warm golden yellow (#F2C14E) with a few simple, widely spaced, soft brown spots (#8A5A2B) drawn as small open rings, the tummy patch, inner ears and foot pads light cream (#FBEBD8). Cute, plush and soft, not realistic, no claws, no teeth. No face at all: no eyes, no nose, no mouth, no snout patch. Plain pure white background, no shadow, no text.
```

## Hjärtslag (ElevenLabs Sound Effects)

```prompt
Two soft, gentle, slow heartbeats heard through a doctor's stethoscope, warm and muffled lub-dub, lub-dub, calm and cozy, low volume, for a toddler cartoon, not scary, no music, no voice.
```
Längd 2 s, prompt influence ca 0,4. 4 tagningar, filerna i `assets/ljud/effekter/hjartslag/hjartslag-1…4.m4a`.

## Doktorns ljud (Sanna 2026-11-20: "make sound effects for the doctor such as aaa ooo hmm hej")

Doktorn säger fortfarande inga meningar (Malin berättar), men gör små vänliga ljud. ElevenLabs **Sound Effects**, 4 tagningar per ljud, prompt influence ca 0,5. Filerna i `assets/ljud/effekter/doktor-<ljud>/doktor-<ljud>-1…4.m4a`. Samma röst i alla: en varm, vänlig, lugn kvinnlig vuxen.

| Ljud | Längd | Var i 046 |
|---|---|---|
| `doktor-hej` | 1 s | rad 2 (doktorn vinkar), rad 36 (hej då, samma ljud) |
| `doktor-hmm` | 1,5 s | rad 12–13 (lyssnar), rad 17 (tittar i örat) |
| `doktor-ooo` | 1 s | rad 18 (*"Vilka långa öron!"*), rad 13 (efter hjärtslagen) |
| `doktor-aaa` | 1,2 s | rad 24 (visar hur man gapar, före kaninen) |

```prompt
A warm, friendly adult woman doctor says a short cheerful "Hej!" (Swedish for hi), soft and kind, smiling voice, for a toddler cartoon, close and clean, no music, no background.
```

```prompt
A warm, friendly adult woman doctor makes a soft, calm, thoughtful "Hmm…" while listening carefully, gentle and reassuring, smiling, for a toddler cartoon, close and clean, no words, no music.
```

```prompt
A warm, friendly adult woman doctor makes a delighted, impressed "Ooo!" with a smile, soft and playful, for a toddler cartoon, close and clean, no words, no music.
```

```prompt
A warm, friendly adult woman doctor opens her mouth wide and says a short, clear, gentle "Aaa" to show a child how to open wide, playful and calm, for a toddler cartoon, close and clean, no words, no music.
```
