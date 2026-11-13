# 034 – platsen: vardagsrummet (jul)

Sanna 2026-11-13: *"ej säng i rummet, mysig snö som faller utanför fönster, mysig inredning"*. Därför blir det inte sovrummet utan en **ny platta, vardagsrummet**, som kan återanvändas i fler bilderböcker och nästa jul. När den är vald skrivs den in som `bakgrunder/vardagsrummet.md` och läggs i `bakgrunder/README.md`.

## Uppställningen

- **Väggen** i en kraftig, varm färg med kornig oljepastell (art direction v2), och ett vitt golv på ca 75 % av höjden, som sovrummet, köket och hallen, så att figurernas skala och `GOLV` blir desamma.
- **Ett stort fönster** till vänster om mitten i övre halvan: en mjuk krämvit ram med ett spröjskors (fyra rutor). **Insidan är tom och vit**, så att kvällshimlen och **snön som faller utanför** läggs i kod bakom ramen (som sovrummets fönster). Snön: lugna, runda flingor i olika storlek som dalar sakta och vickar lite i sidled, några som landar på fönsterbläcket. Det ger rummet liv hela tiden, också i gisspauserna.
- **Gardiner** i varmt rött på var sida av fönstret, uppknutna.
- **Mysig inredning, längst till vänster:** en knubbig rund fåtölj med en stickad filt över armstödet, och en liten rund matta på golvet framför den. Inget mer, så att bilden inte blir rörig (receptet: en eller två saker som ger liv).
- **Högra halvan tom:** där står granen och julgransfoten, som läggs i kod. Musen står mellan mattan och granen.
- Ingen säng, ingen brasa (Sanna avvisade brasan i julkalendern).

## Färger att prova

Två färger, två tagningar var (4 bilder, Google Flow, Nano Banana, bild 1 = sovrummet `sovrummet-v1.jpeg`, bild 2 = hallen `hallen-v1.jpeg`, som stil- och layoutreferens):

| | Vägg | Varför |
|---|---|---|
| A | djup kvällsblå `#2F4F7F` | kväll och snö, och den röda kulan, den gula stjärnan och den gröna granen syns tydligt mot den |
| B | varm dov terrakotta `#C9785A` | varmt och mysigt; den gröna granen och den blå kulan syns tydligt |

## Prompt

```prompt
Images 1 and 2 are STYLE and LAYOUT references only: copy their flat crayon technique, their straight-on composition, their floor line and the way the window, the bedside table and the door are drawn as simple flat crayon shapes, not their colours. Background plate for a cosy toddler cartoon living room in winter, wide 16:9, completely flat, static straight-on view, no perspective. The top part is one flat, calm, deep evening-blue wall (#2F4F7F) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture and a few loose, light, thin diagonal scratchy crayon streaks in a slightly lighter blue. On the wall, a little left of centre and in the upper half, one big simple rectangular window with softly rounded corners: a thick soft cream-white crayon frame with one cross bar making four panes, a small cream window sill, and the inside of the window left completely EMPTY as plain flat pure white (#FFFFFF), no sky, no snow, no moon, no stars, no glass lines. On each side of the window a soft warm red curtain, gathered and tied back, drawn flat. At the far left, standing on the floor, one chubby round cosy armchair in soft mustard-yellow crayon with a cream knitted blanket hanging over its arm, and in front of it one small round rug in soft warm red and cream stripes lying flat on the floor. The bottom part is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 75% of the image height. The whole right half of the picture is empty wall and floor, with lots of space for a Christmas tree that is added later. No tree, no bed, no fireplace, no toys, no pictures, no lamps, no characters, no animals, no shadows, no glow, no text, no letters.
```

Färg B: byt `deep evening-blue wall (#2F4F7F)` mot `warm muted terracotta wall (#C9785A)` och "lighter blue" mot "lighter terracotta".

Filerna: `assets/bakgrunder/vardagsrummet/original/vardagsrummet-<bla|terrakotta>-1|2.jpeg`, sida vid sida i `original/jamforelse.jpg`, den valda som `assets/bakgrunder/vardagsrummet/vardagsrummet-v1.jpeg`.
