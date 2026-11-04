# Suno – Avsnitt 004 Vi ska bada!

Egen melodi, på svenska. Klistra in stilen i **Style**, det som står under "Exclude" i **Exclude styles** och resten i **Lyrics**. Ladda ner som **m4a**: den har radernas tider inbakade, så att storyboarden kan tajmas exakt.

**Funk bara i det här avsnittet** (Sannas val, 2026-11-04): husstilen i `format/overgangar-och-maner.md` gäller fortfarande för andra avsnitt. Om en paus blir för livlig: generera igen eller sänk den i redigeringen.

Introjingeln är samma som i 003 (se `avsnitt/003-bussen-halsar-pa/suno.md`) och görs inte om.

Det finns ingen berättarröst. Sången berättar historien, och figurernas korta repliker läggs i de instrumentala pauserna. Två genereringar:
1. **Sången** för scen A, ca **2:50–3:00**. Den slutar på "stopp!" vid badplatsen.
2. **En lugn instrumental bädd** för scen B (badplatsen), ca **75–90 s**, utan sång.

Avsnittet blir ca 4:00 (preliminärt).

| Del | Bild | Vad som händer |
|---|---|---|
| Intro | 02 | Kritan ritar solen, paus för barnet |
| Instrumental | 03 | Zoom in, "Tuta-tut! Vi ska bada!" |
| Vers 1 + refräng | 04 | Bussen kör iväg, refrängen som musikvideo |
| Körvers 1 | 05–06 | Hus och träd, grodan glider in, stopp |
| Instrumental | 07–08 | Stopp 1: "Tuta-tut!" "Kväk-kväk! Jag vill bada!" |
| Vers 2 + refräng | 10 | "Hej, hej, grodan, kliv på du!", grodan hoppar in på "hopp" |
| Körvers 2 | 11–12 | Samma körvers, ankan glider in, stopp |
| Instrumental | 13–14 | Stopp 2, likadant: "Tuta-tut!" "Kvack-kvack! Jag vill bada!" |
| Vers 3 | 15 | "Hej, hej, ankan, kliv på du!", ankan hoppar in |
| Räknefrågan | 16 | Grodan och ankan vinkar en i taget, "En – och två!" |
| Refräng | 16a–16d | Refrängen som musikvideo |
| Körvers 3 | 17–17a | "Titta, där är badplatsen!", stopp, sången slutar |
| Scen B (bädden) | 18– | Ingen sång, lugn instrumental, ljudeffekter, "Hej då!" |

## 1. Sången (scen A)

```
Title: Vi ska bada!

Style: gentle funky toddler song, 100 bpm, groovy bouncy funk feel, soft round bass line, clean funky rhythm guitar, light tight drum groove with soft kick and rimshot, warm clavinet, soft brass stabs, friendly childlike female vocal, playful, warm, clear Swedish diction, quiet instrumental breaks

Exclude: distortion, rock, heavy drums, loud drops, sudden loud parts, shouting, autotune, rap, tempo changes, sound effects, long intro

Lyrics:
[Intro]
Kritan ritar, runt och gult,
vad kan det vara?
[Break]
En sol! En sol som skiner varm,
nu åker vi och badar!

[Instrumental Break]

[Verse 1]
Solen skiner, det är varmt,
vi ska åka och bada!
Lilla bussen kör iväg,
hämtar alla kompisar!

[Chorus]
Tuta-tut, tuta-tut,
lilla bussen kör så bra!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Verse 2]
Brum-brum, vi kör på vägen,
förbi hus och gröna träd.
Vem är det som väntar där?
Tuta-tut, vi stannar – stopp!

[Instrumental Break]

[Verse 3]
Hej, hej, grodan, kliv på du!
Kväk-kväk, kväk-kväk, med oss nu!
Ett, två, tre – hopp, hopp, hopp!
In i bussen, hej, hej, hej!

[Chorus]
Tuta-tut, tuta-tut,
lilla bussen kör så bra!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Verse 4]
Brum-brum, vi kör på vägen,
förbi hus och gröna träd.
Vem är det som väntar där?
Tuta-tut, vi stannar – stopp!

[Instrumental Break]

[Verse 5]
Hej, hej, ankan, kliv på du!
Kvack-kvack, kvack-kvack, med oss nu!
Ett, två, tre – hopp, hopp, hopp!
In i bussen, hej, hej, hej!

[Bridge - soft]
Kompisar i bussen nu,
hur många kan du se?
[Break]
En – och två! Två kompisar!
Grodan och ankan, hej!

[Chorus]
Tuta-tut, tuta-tut,
lilla bussen kör så bra!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Verse 6]
Brum-brum, vi kör på vägen,
förbi hus och gröna träd.
Titta, där är badplatsen!
Tuta-tut, vi stannar – stopp!

[Outro - short soft instrumental ending]
[End]
```

## 2. Instrumental bädd för badplatsen (scen B)

Gör den som en egen generering med **Instrumental** påslaget (ingen text). Den ska vara samma låt fast lugn: samma tonart och tempo, så att den låter som en fortsättning. Enklast är att göra en **Cover** eller **Extend** av den färdiga sången med stilen nedan, och sedan kontrollera att tonarten stämmer.

```
Title: Vi ska bada! (badplatsen)

Style: calm soft instrumental version of a gentle funky toddler song, 100 bpm, same key as the song, quiet and low, soft round bass line, light clean guitar, very soft brushed drum groove, warm clavinet, relaxed, sunny, no vocals, steady and even, about 90 seconds

Exclude: vocals, singing, humming, distortion, rock, heavy drums, loud drops, sudden loud parts, tempo changes, sound effects
```

Bädden ligger lågt under replikerna och ljudeffekterna (plask, regn, tut). Den får gärna loopas eller kortas i redigeringen. Alla säger "Hej då!" i slutet, och sedan kommer outrojingeln.

## Görs i redigeringen, inte i Suno

- **Marimbatonerna i räknepausen:** två mjuka toner, en när grodan vinkar ur sitt fönster och en när ankan vinkar ur sitt. De läggs som ljudeffekter i scenen med `kit.ljud`.
- **Stoppen:** pausen efter varje "stopp!" behöver **ca 6–8 s** för "Tuta-tut!" och "… Jag vill bada!" och för att dörren ska öppnas. I 003 blev Sunos `[Instrumental Break]` bara några sekunder, så räkna med att förlänga pauserna i redigeringen.

**Tips:** pauserna i introt och räknefrågan (`[Break]`) är frågorna till barnet och ska vara **4–5 s**. Suno gör dem oftast kortare: förläng dem i redigeringen innan scenernas DURATION låses, eller generera igen. Om Suno sjunger igenom `[Instrumental Break]`, generera igen.
