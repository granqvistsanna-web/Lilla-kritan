# Suno – Avsnitt 004 Vi ska bada!

Egen melodi, på svenska. Klistra in stilen i **Style**, det som står under "Exclude" i **Exclude styles** och resten i **Lyrics**. Ladda ner som **m4a**: den har radernas tider inbakade, så att storyboarden kan tajmas exakt.

Introjingeln är samma som i 003 (se `avsnitt/003-bussen-halsar-pa/suno.md`) och görs inte om.

Det finns ingen berättarröst. Sången berättar historien, och figurernas korta repliker läggs i de instrumentala pauserna. Sikta på **3:40–3:55**.

| Del | Bild | Vad som händer |
|---|---|---|
| Intro | 02 | Kritan ritar solen, paus för barnet |
| Instrumental | 03 | Zoom in, "Tuta-tut! Idag är det varmt …" |
| Vers 1 + refräng | 04 | Bussen kör, fjärilen fladdrar förbi |
| Körvers 1 | 05–06 | Äppelträdet, traktorn plöjer, stopp |
| Instrumental | 07–09 | Stopp 1, grodan hoppar in |
| Vers 2 + refräng | 10 | Grodan studsar och vinkar i fönstret |
| Körvers 2 | 11–12 | Dammen med näckros, blommor, stopp |
| Instrumental | 13–14 | Stopp 2, ankan |
| Vers 3 (räknefrågan) | 15–16 | Ankan hoppar in, vi räknar kompisarna |
| Körvers 3 | 17 | Uppför backen, flygplanet, badplatsen från toppen, stopp |
| Instrumental | 18 | Framme vid badplatsen, "Brr! Kallt!" |
| Vers (kallt vatten) | 18–19 | Ankan visar: tårna, fötterna, hopp |
| Vers 4 + refräng | 19–20 | Grodan och ankan badar, bussen tutar i takt |
| Instrumental | 21 | "Tack för skjutsen!" "Varsågod!" |
| Sista refrängen | 22 | Regnet, solen kommer tillbaka, alla vinkar |

```
Title: Vi ska bada!

Style: gentle sunny toddler song, 96 bpm, steady tempo, bouncy, ukulele, marimba plucks, soft pads, tiny shakers, friendly female vocal, playful, warm, clear Swedish diction

Exclude: heavy drums, electric guitar, autotune, rap, tempo changes, sound effects

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
lilla bussen kör iväg.
Vem står där vid vägens kant
och vill åka med i dag?

[Chorus]
Tuta-tut, tuta-tut,
vi ska åka och bada!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Verse 2]
Brum-brum, vi kör på vägen,
förbi ett äppelträd.
Traktorn plöjer, tuff-tuff-tuff,
tuta-tut, vi stannar – stopp!

[Instrumental Break]

[Verse 3]
Grodan väntar vid en skylt,
kväk-kväk, han vill bada med!
Ett, två, tre – hopp, hopp, hopp!
In i bussen, hej, hej, hej!

[Chorus]
Tuta-tut, tuta-tut,
vi ska åka och bada!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Verse 4]
Brum-brum, vi kör på vägen,
förbi en liten damm.
Näckros, blommor, gul och röd,
tuta-tut, vi stannar – stopp!

[Instrumental Break]

[Verse 5]
Ankan plaskar i en pöl,
kvack-kvack, vänta, jag vill med!
Ett, två, tre – hopp, hopp, hopp!
In i bussen, hej, hej, hej!

[Bridge - soft]
Kompisar i bussen nu,
hur många kan du se?
[Break]
En – och två! Två kompisar!
Grodan och ankan, hej!

[Verse 6]
Brum-brum, vi kör på vägen,
flygplanet flyger högt.
Titta, där är badplatsen,
tuta-tut, vi stannar – stopp!

[Instrumental Break]

[Verse 7]
Grodan doppar tån – brr, brr!
Vattnet är så kallt, oj då!
Först tårna, sen fötterna,
ett, två, tre – hopp, hopp, hopp!

[Instrumental Break]

[Verse 8]
Grodan hoppar i – plask, plask!
Ankan simmar runt – plask, plask!
Vattnet stänker högt och glatt,
alla badar – plask, plask, plask!

[Chorus]
Tuta-tut, tuta-tut,
vi ska åka och bada!
Tuta-tut, tuta-tut,
hjulen snurrar runt, runt, runt!

[Instrumental Break]

[Final Chorus]
Tuta-tut, tuta-tut,
det regnar – plask, plask, plask!
Plaska, hoppa, vinka nu!
Solen kommer – hej, hej då!
[End]
```

**Körscenerna:** alla tre körverser slutar på "stopp!", och vägen slutar glida där. Pausen efter varje stopp (grodan, ankan, framme) behöver **ca 8–12 s** för replikerna. I 003 blev Sunos `[Instrumental Break]` bara några sekunder, så räkna med att förlänga pauserna i redigeringen.

**Görs i redigeringen, inte i Suno:**
- **Andrum i backen:** förläng takten efter "flygplanet flyger högt" med ca 2 s (en långsammare ukulele) för bussens "Hjälp mig: brum … brum …". Gör det innan scenernas DURATION låses.
- **Marimbatonerna i räknepausen:** två mjuka toner, en när grodan håller upp ett finger och en när ankan håller upp två. De läggs som ljudeffekter i scenen med `kit.ljud`.

**Tips:** pauserna i introt och räknefrågan (`[Break]`) är frågorna till barnet och ska vara **4–5 s**. Suno gör dem oftast kortare: förläng dem i redigeringen innan scenernas DURATION låses, eller generera igen. Om Suno sjunger igenom `[Instrumental Break]`, generera igen.
