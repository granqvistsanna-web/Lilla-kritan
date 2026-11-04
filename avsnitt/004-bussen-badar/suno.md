# Suno – Avsnitt 004 Vi ska bada!

Egen melodi, på svenska. Klistra in stilen i **Style**, det som står under "Exclude" i **Exclude styles** och resten i **Lyrics**. Ladda ner som **m4a**: den har radernas tider inbakade, så att storyboarden kan tajmas exakt.

**Funk bara i det här avsnittet** (Sannas val, 2026-11-04): husstilen i `format/overgangar-och-maner.md` gäller fortfarande för andra avsnitt. Om en paus blir för livlig: generera igen eller sänk den i redigeringen.

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
| Körvers 3 | 17 | Platt väg, flygplanet, badplatsen syns, stopp |
| Instrumental | 18 | Framme vid badplatsen, "Brr! Kallt!" |
| Vers (kallt vatten) | 18–19 | Ankan visar: tårna, fötterna, hopp |
| Vers 4 + refräng | 19–20 | Grodan och ankan badar, bussen tutar i takt |
| Instrumental (ca 8–10 s) | 20–21 | "Jag är för stor för att bada … Tuta-tut! Ha det så roligt!" "Tack, bussen!" |
| Sista refrängen | 21b–22 | Det regnar ända till slutet, kort avbrott (ca 2 s) för "Nu badar jag också!", alla plaskar och vinkar |

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
Grodan plaskar – plask, plask!
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
[Break]
Plaska, hoppa, vinka nu!
Plask i regnet – hej, hej då!
[End]
```

**Körscenerna:** alla tre körverser slutar på "stopp!", och vägen slutar glida där. Pausen efter varje stopp (grodan, ankan, framme) behöver **ca 8–12 s** för replikerna. I 003 blev Sunos `[Instrumental Break]` bara några sekunder, så räkna med att förlänga pauserna i redigeringen.

**Görs i redigeringen, inte i Suno:**
- **Marimbatonerna i räknepausen:** två mjuka toner, en när grodan håller upp ett finger och en när ankan håller upp två. De läggs som ljudeffekter i scenen med `kit.ljud`.

**Tips:** pauserna i introt, räknefrågan och sista refrängen (`[Break]`). Den i sista refrängen är bara ca 2 s, för bussens "Nu badar jag också!". De andra två är frågorna till barnet och ska vara **4–5 s**. Suno gör dem oftast kortare: förläng dem i redigeringen innan scenernas DURATION låses, eller generera igen. Om Suno sjunger igenom `[Instrumental Break]`, generera igen.
