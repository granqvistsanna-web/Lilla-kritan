# Julkalendern: Mureka-prompter (2026-11-12)

Sanna har slut på Suno-krediter men kan använda Mureka några dagar till. Det här är musiken som julkalendern fortfarande behöver, förutsedd nu så att den kan göras medan Mureka finns.

**Vad som redan finns** (Suno, `assets/ljud/musik/jul/`): en bädd, en öppnings- och en avslutsjingel, en julafton-fanfar och sången "Vi tänder ett ljus". Det räcker för ramen, men 15 luckor på ungefär 3 minuter med samma bädd på 58 s blir enformigt, och två luckor saknar musik.

| # | Vad | Lucka | Varför |
|---|---|---|---|
| 1 | Dagbädd 2 | varannan djur- och ritlucka | Omväxling: bädd 1 och 2 turas om, så att samma slinga inte hörs 24 dagar i rad |
| 2 | Kvällsbädd | 1, 6, 13, 20, 24 (kväll och natt) | Lugnare och varmare för ljus och natthimmel, och tydligt annorlunda än dagen |
| 3 | Luciasång | 13 | Lammet knackar på dörren och sjunger för grisen. Det behövs en egen kort sång med egen melodi |

**Inte med:** ingen ny jingel eller sång till julafton, eftersom fanfaren och "Vi tänder ett ljus" (som slutar med "God jul") räcker. Det blir inte heller någon dansmusik, för bädden klarar danserna.

**Familjen:** allt i **D-dur**, så att det går ihop med jinglarna. Om Mureka låter dig ladda upp en referenslåt, använd `jul-badd.m4a` för bäddarna. Gör två tagningar av varje, så klipper jag dem på taktslag som Suno-tagningarna. Spara dem i Hämtade filer.

## 1. Dagbädd 2

Title: `Julkalendern – bädd 2`
Instrumental: på

Style:
```
Instrumental cozy children's Christmas background music, D major, 100 BPM, 4/4. Soft marimba and pizzicato strings play a simple, friendly, bouncy 8-bar melody that repeats, a gentle wooden flute answers now and then, over soft sleigh bells on the beat, warm upright bass and light brushed snare. Even and steady from start to end, no build-ups, no breaks, no solos, no key change, no tempo change, quiet enough for a narrator to speak over. Toddler TV, playful and warm.
```
Exclude: `vocals, choir, heavy drums, electric guitar, synth, big ending, fade out`

Lyrics:
```
[Instrumental]
[Intro]
[Main Theme]
[Main Theme]
[Main Theme]
[Main Theme]
[Outro]
```

## 2. Kvällsbädd

Title: `Julkalendern – kvällsbädd`
Instrumental: på

Style:
```
Instrumental gentle evening Christmas background music for toddlers, D major, 80 BPM, 4/4. Celesta and a soft music box play a slow, simple, tender 8-bar melody that repeats, over a warm felt piano, soft warm strings and a few very soft sleigh bells. Calm, cozy, candlelight and snowy night feeling, even and steady from start to end, no drums, no build-ups, no breaks, no key change, no tempo change, quiet enough for a narrator to speak over.
```
Exclude: `vocals, choir, drums, percussion, electric guitar, synth, dramatic, sad, big ending, fade out`

Lyrics:
```
[Instrumental]
[Intro]
[Main Theme]
[Main Theme]
[Main Theme]
[Main Theme]
[Outro]
```

## 3. Luciasång: God morgon

Title: `God morgon (Lucia)`
Instrumental: av

Style:
```
Short gentle Swedish children's Lucia morning song for toddlers, D major, 76 BPM, 4/4, simple original melody, not a traditional song. One warm, soft, clear Swedish female voice sings slowly and tenderly, like a kind preschool teacher singing someone awake in the early morning. Celesta, music box, soft warm strings and very soft sleigh bells. Quiet, candlelit, cozy and happy, the chorus a little brighter, ends cleanly on the home chord. About one minute long.
```
Exclude: `choir, rap, autotune, drums, electric guitar, English lyrics, spoken word, sound effects, key change, tempo change, fade out`

Lyrics:
```
[Intro]

[Verse]
Det var en lång och mörk, mörk natt,
nu kommer ljuset, se så glatt!
Med ljus i kronan, ett, två, tre,
nu ska du vakna, kom och se!

[Chorus]
God morgon, god morgon,
nu lyser ljuset klart.
God morgon, god morgon,
snart är det jul, så snart!

[Chorus]
God morgon, god morgon,
nu lyser ljuset klart.
God morgon, god morgon,
snart är det jul, så snart!

[Outro]
God morgon!

[End]
```

Sången följer reglerna: inga djurnamn och inga ljudord, en egen melodi (inte Sankta Lucia), och den kallas aldrig lugn i YouTube-texten. I lucka 13 sjunger lammet den medan kronans ljus blinkar i takt, och grisen vaknar. Den används hel och oklippt.

## Inspelat 2026-11-12

Från Mureka kom tio **vaggvisor**, alla instrumentala. Det är fem sorter med två tagningar var: speldosa, piano, sovpiano, lugnt piano samt gitarr och kalimba, 4 min var, cirka 62–72 BPM. Originalen ligger i iCloud `Lilla Kritan/Ljud/sanger/vaggvisor/vaggvisa-<sort>-<a|b>.wav`. Dagbädd 2 och Luciasången kom inte. De fyra jinglarna `julkalender-*-A/B.wav` som låg bredvid var bara de första sekunderna av Suno-tagningarna och kastades.

Kvällsbädden kommer ur vaggvisorna. Varje tagning klipptes på taktslag, i en slinga på 75–110 s där fogen liknar starten mest. Alla fogar blev bra (0,93–0,96, att jämföra med Suno-bäddens 0,90). Slingorna har samma ljudstyrka som `jul-badd.m4a` (−12,5 LUFS).

| Fil | Tagning | Slinga | Varför |
|---|---|---|---|
| `jul-kvall.m4a` = `jul-kvall-a.m4a` | speldosa-a, 15,88–102,66 s | 86,8 s | Speldosan är kvällsljudet i prompten, och G-dur är samma tonart som öppnings- och avslutsjingeln |
| `jul-kvall-b.m4a` | gitarr och kalimba-b, 39,89–120,74 s | 80,9 s | Reserv: D-dur, jämnast nivå (1,9 dB spridning), bästa fogen (0,960) |

Inkopplat: `lucka.js` tar `jul-kvall` när `kvall: true` (luckorna 6, 13, 20, 24) och annars `{ badd: 'jul-kvall' }`. Lucka 1 (natthimlen) får den via `rita.js` (`badd: 'jul-kvall'`). `K.baddLangd` ger slingans längd. De andra vaggvisorna passar godnattsagorna.
