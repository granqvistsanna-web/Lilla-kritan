# 046 – stetoskopet och öronlampan: Flow-prompter (grind 2, utkast)

Grind 2 för sakerna. Doktorn A och mottagningen v2 är klara, så de två nya sakerna görs nu. Google Flow, Nano Banana Pro, 1:1, 0 krediter, **4 tagningar per sak**. Lägg tagningarna i `assets/rekvisita/<sak>/original/<sak>-1…4.jpg`, sedan gör Claude `original/jamforelse.jpg`, och Sanna väljer. Först efter valet skrivs `rekvisita/stetoskop.md` och `rekvisita/oronlampa.md` och raderna i `rekvisita/README.md`.

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

## Efter valet

1. `verktyg/egen_kant.py` klipper ut, kanten tunnas till skillen `vita-kanter` (3 px + 1 % av höjden i bild).
2. Stetoskopets bröstdel klipps loss med en kort slangstump (`cut/stetoskop-brostdel.png`), och slangens färg mäts för kodkurvan.
3. `rekvisita/stetoskop.md` och `rekvisita/oronlampa.md` i samma form som `rekvisita/handfatet.md`, och raderna i `rekvisita/README.md`. `python3 verktyg/prompt.py --lista` ska gå igenom.
4. Ett instick-prov: kodhanden med bröstdelen och med lampan, mot kaninens mage och öra, så att Sanna kan se storleken innan grind 3.
