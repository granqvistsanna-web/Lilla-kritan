# Suno – Avsnitt 005 Rosa bilen (Rosa sången)

Egen melodi, på svenska. Klistra in stilen i **Style**, det som står under "Exclude" i **Exclude styles** och resten i **Lyrics**. Ladda ner som **m4a**: den har radernas tider inbakade, så att storyboarden kan tajmas exakt.

**Funk igen** (Sannas val, 2026-11-04): funkig, studsig och så catchy som möjligt. Husstilen i `format/overgangar-och-maner.md` gäller fortfarande för andra avsnitt.

Introjingeln är samma som i 003 och görs inte om. En generering, ca **3:00–3:20** (tagning 2), som täcker både vägen och glasskiosken. Det finns ingen berättarröst: sången berättar och figurernas korta repliker läggs i luckorna.

| Del | Bild | Vad som händer |
|---|---|---|
| Intro | 02–02c | Kritan ritar bilen, paus för barnet |
| Instrumental | 03–03b | Zoom in, musen vinkar: "Pip pip!" ("Brum-brum, nu kör vi!" sjöngs nyss och sägs inte) |
| Vers 1 + refräng | 04–05f | Musen kör iväg |
| Vad är rosa? ×2 | 06–07b | Blommorna (sniff), ballongen (upp), kören ekar |
| Frågan | 08–08c | "Vad mer är rosa?" paus, nosen och öronen |
| Refräng | 09a–09f | Mot glasskiosken |
| Vad är rosa? ×1 | 11–11b | Glassen |
| Instrumental | 11c–13e | Musen hälsar och väljer rosa glass av tre färger, kulan ramlar ner (plupp), grodan ger henne två nya |
| Vers 2 | 14a–14d | Plupp, glassberget, mums |
| Danspaus | nya bilder efter 14d | "Danspaus!", ankan, kycklingen och kaninen kommer in en i taget med något rosa, alla dansar |
| Sista refrängen | 15– | Sammanfattning, hej då |

**Tagning 2 (Sanna 2026-11-08: "new song … no drawing singing, instrumental for problem section and longer dance scene"):** introt utan sång (kritan ritar till musik, berättarrösten läggs i redigeringen), problemet vid kiosken (kulan ramlar, grodan hjälper) är ett instrumentalt stycke på 8 takter, och danspausen är tre gånger så lång. Texten är enklare och tydligare (Sanna: "more simple lyrics, clear"): korta rader, ett ord att eka i taget. `sang.md` och refrängdansen uppdateras när tagningen är vald. "Snurra runt" är bytt mot "Gunga, gunga" (figurerna snurrar aldrig). Tagning 1:s prompt finns i git-historiken.

```
Title: Rosa sången

Style: super catchy funky toddler song, 104 bpm, major key, bouncy groovy funk, soft round slap-style bass, clean muted funky rhythm guitar, warm clavinet, tight light drums with soft kick and rimshot, handclaps on every "Rosa!", soft brass stabs on "tut, tut", warm smiling young female lead singer who sings very clearly and slowly, one word at a time, perfect Swedish diction, small happy kids choir echoes every line in the parentheses, very simple short lines, lots of repetition, sing-along. Starts with a soft curious instrumental intro with no vocals, groove kicks in for the verse, a playful instrumental middle section with plucky pizzicato, then a long funky dance break with handclaps and call and echo, big happy final chorus, short soft ending. Even dynamics.

Exclude: distortion, rock, heavy drums, loud drops, sudden loud parts, screaming, autotune, rap, fast singing, tempo changes, sound effects, long solo, vocals in the intro, humming in the intro

Lyrics:
[Intro - instrumental only, no vocals, soft keys, curious, 8 bars]
[Instrumental Break - very soft held chord, no groove, no vocals, 4 bars]
[Instrumental Break - the funk groove starts, no vocals, 2 bars]

[Verse 1]
Brum, brum! Nu kör vi!
Musen kör sin rosa bil.
Vad är rosa? Leta med!
Jag och du – kom och se!

[Chorus - call and echo, handclaps]
Rosa! (Rosa!)
Rosa! (Rosa!)
Rosa är min favoritfärg!
Rosa! (Rosa!)
Rosa! (Rosa!)
Tut, tut! Titta ut!

[Hook - call and echo]
Vad är rosa? (Vad är rosa?)
Blommorna! (Blommorna!)
Sniff, sniff, mmm!
[Break - 1 bar]

[Hook - call and echo]
Vad är rosa? (Vad är rosa?)
Ballongen! (Ballongen!)
Upp, upp, upp!
[Break - 1 bar]

[Bridge - soft, asking]
Vad mer är rosa?
Kan du se?
[Instrumental Break - 2 bars, very soft, no vocals]
Nosen! Öronen!
Vick, vick, vick!

[Chorus - call and echo, handclaps]
Rosa! (Rosa!)
Rosa! (Rosa!)
Rosa är min favoritfärg!
Rosa! (Rosa!)
Rosa! (Rosa!)
Tut, tut! Titta ut!

[Hook - call and echo]
Vad är rosa? (Vad är rosa?)
Glassen! (Glassen!)
Mums, mums, mums!

[Instrumental Break - playful soft groove, plucky pizzicato and clavinet, a little wobble then a happy lift, no vocals, 8 bars]

[Verse 2 - happy]
Två rosa kulor!
Hurra, hurra! (Hurra!)

[Dance Break - shouted, music stops for one beat]
Danspaus! (Danspaus!)

[Instrumental Break - funky dance groove, handclaps, 4 bars]

[Dance Break - call and echo, a short gap after each echo]
Hoppa! (Hoppa!)
Gunga! (Gunga!)
Klappa! (Klappa!)
Rosa dans! (Rosa dans!)

[Instrumental Break - funky dance groove, brass stabs, 4 bars]

[Dance Break - call and echo, a short gap after each echo]
Stampa! (Stampa!)
Armarna upp! (Armarna upp!)
Vinka! (Vinka!)
Rosa dans! (Rosa dans!)

[Instrumental Break - funky dance groove, handclaps, 4 bars]

[Dance Break - call and echo]
Hoppa! (Hoppa!) Gunga! (Gunga!)
Klappa! (Klappa!) Stampa! (Stampa!)
Rosa dans! (Rosa dans!)
Rosa dans! (Rosa dans!)

[Instrumental Break - funky dance groove, 2 bars]

[Final Chorus - happy, big sing-along, call and echo]
Blommor – rosa! (Rosa!)
Ballong – rosa! (Rosa!)
Nos och glass – rosa! (Rosa!)
Rosa är min favoritfärg!
Hej då, hej då! Tut, tut!

[Outro - short soft instrumental ending]
[End]
```

## Görs i redigeringen, inte i Suno

- **Gissningspausen i introt och frågepausen** ska vara **4–5 s**. Suno gör dem oftast kortare: förläng dem med en mjuk hållen ton innan scenernas tider låses, eller generera igen. Om Suno sjunger igenom `[Instrumental Break]`, generera igen.
- **Ekot:** om Suno inte sjunger parenteserna som en barnkör, generera igen. Ekot är det som gör låten catchy.
- **Pausen vid kiosken** (efter "glassen är rosa") behöver **ca 15 s** för köpet, plupp och glassberget (bild 11c–13e). Sunos break blir nästan säkert kortare: loopa grooven där i redigeringen, lågt under replikerna.
