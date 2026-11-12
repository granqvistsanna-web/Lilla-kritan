# Julkalendern: Suno-prompter (2026-11-12, granskade samma dag)

Sanna bad om prompter. Spara i `assets/ljud/musik/jul/`.

**Familjen:** alla fem i **D-dur, 100 BPM** (en takt = 2,4 s), med samma instrument (speldosa, klockspel, mjuka bjällror), så att jinglarna låter som en del av bädden och sången. Sången ligger i D-dur eftersom det är bekvämt för en kvinnoröst och för små barn som sjunger med.

**Granskning, ändrat från första versionen:**
- Suno gör nästan aldrig klipp på 5–10 s. Därför står det korta strukturtaggar i Lyrics (`[Intro]`, `[End]`) för att hålla låten kort, och vi klipper ut de första sekunderna och lägger en kort `afade`.
- Bädden ska kunna gå runt, så den har inget slutackord. Klipp ut **24 takter = 57,6 s** från en jämn del mitt i låten (börja på en etta, efter introt), så går den runt utan hack.
- Kyrkklockorna i fanfaren är borta, eftersom de kan låta för starkt och skrämma små barn. Rörklockor och klockspel finns kvar.
- Sången är omskriven: varje rad har 8 stavelser, raderna rimmar parvis (gran/fram, ljus/hus, blå/på, där/här) och omvänd ordföljd är borta. Den nya titeln är kroken: *Ett ljus, två ljus*. Andra versen slutar med paketet under granen, alltså lucka 9.

| # | Fil | Längd | Används |
|---|---|---|---|
| 1 | `jul-badd.m4a` | 57,6 s (24 takter), går runt | under hela sagan (ersätter `gissa-bad`, som bara är 61 s) |
| 2 | `jul-oppning.m4a` | ca 6 s | kalenderns intro, när dagens lucka tänds |
| 3 | `jul-avslut.m4a` | ca 5 s | luckan stängs, före "Vi ses i morgon!" |
| 4 | `jul-julafton.m4a` | ca 10 s | lucka 24 och slutet av hela julkalendern |
| 5 | `jul-sang.m4a` | ca 1:30 | valfri sång, för en lucka med sång |

## 1. Bädd

Title: `Julkalendern – bädd`

Style:
```
Instrumental cozy children's Christmas background music, D major, 100 BPM, 4/4. Music box and glockenspiel play a simple, friendly 8-bar melody that repeats, over soft sleigh bells on the beat, gentle ukulele strum, warm upright bass and light brushed snare. Even and steady from start to end, no build-ups, no breaks, no solos, quiet enough for a narrator to speak over.
```
Exclude styles: `vocals, choir, heavy drums, electric guitar, synth, tempo change, key change, ritardando, fade out, big ending`

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

## 2. Öppningsjingel

Title: `Julkalendern – öppningsjingel`

Style:
```
Instrumental very short Christmas jingle, D major, 100 BPM. Starts immediately with a cheerful rising music box and glockenspiel arpeggio over soft sleigh bells, like a little door opening, then lands on one bright, warm D major chord that rings out. Magical, happy, gentle.
```
Exclude styles: `vocals, choir, drums, bass, guitar, long intro, tempo change, key change, fade out`

Lyrics:
```
[Instrumental]
[Intro]
[End]
```

## 3. Avslutsjingel

Title: `Julkalendern – avslutsjingel`

Style:
```
Instrumental very short Christmas jingle, D major, 100 BPM. Starts immediately with a gentle falling music box and glockenspiel phrase and a few soft sleigh bells, like a little door closing and saying goodnight, landing on one calm D major chord that rings out. Warm and cozy.
```
Exclude styles: `vocals, choir, drums, bass, guitar, long intro, tempo change, key change, fade out`

Lyrics:
```
[Instrumental]
[Intro]
[End]
```

## 4. Julafton-fanfar

Title: `Julkalendern – julafton`

Style:
```
Instrumental short festive children's Christmas fanfare, D major, 100 BPM. Starts immediately: tubular bells and glockenspiel ring a joyful rising phrase, celesta sparkles and sleigh bells join, warm soft strings swell underneath, and it ends on one big, warm, ringing D major chord. Happy and magical, never loud or harsh.
```
Exclude styles: `vocals, choir, church bells, drums, timpani, brass, electric guitar, synth, tempo change, key change, fade out`

Lyrics:
```
[Instrumental]
[Intro]
[Big Finish]
[End]
```

## 5. Sång: Ett ljus, två ljus

Title: `Ett ljus, två ljus`

Style:
```
Swedish children's Christmas sing-along for toddlers, D major, 100 BPM, 4/4. A warm, gentle Swedish female voice sings slowly and very clearly, like a kind preschool teacher singing to small children, simple original melody with lots of repetition, easy to sing along. Ukulele, music box, glockenspiel, soft sleigh bells, brushed snare, upright bass. Cozy and happy, the chorus a little brighter than the verses, ends cleanly on the home chord.
```
Exclude styles: `rap, screaming, autotune, heavy drums, electric guitar, English lyrics, choir, spoken word, sound effects, tempo change, key change, fade out`

Lyrics:
```
[Intro]

[Verse 1]
Det snöar vitt på tak och gran,
och alla flingor dansar fram.
Vi tänder ljuset, ett litet ljus,
det lyser varmt i vårat hus.

[Chorus]
Ett ljus, två ljus, tre och fyra,
nu lyser alla ljusen här.
Ett ljus, två ljus, tre och fyra,
snart så är det jul, hurra!

[Verse 2]
Vi hänger kulor, röda, blå,
och högst upp sitter stjärnan på.
Och under granen, titta där,
ett litet paket väntar här.

[Chorus]
Ett ljus, två ljus, tre och fyra,
nu lyser alla ljusen här.
Ett ljus, två ljus, tre och fyra,
snart så är det jul, hurra!

[Outro]
God jul, god jul, god jul till dig!
God jul, god jul, god jul till dig!

[End]
```

Sången följer reglerna: inga läten eller ljudord i texten, inga djurnamn, egen melodi, och den kallas aldrig lugn i YouTube-texten.

## Inspelat 2026-11-12

Sanna gjorde två tagningar av varje (a och b). Originalen ligger i iCloud: `Lilla Kritan/Ljud/sanger/julkalender/jul-*-a.wav` och `-b.wav`. Suno gjorde hela låtar på ungefär 3 minuter också av jinglarna, så de är klippta på taktslag med `verktyg/klipp_takt.py` (librosa, 99,4 BPM):

| Fil i `assets/ljud/musik/jul/` | Klipp |
|---|---|
| `jul-oppning-a/b.m4a` | 0 till 3 takter (ca 8,9 s), uttoning 1,4 s |
| `jul-avslut-a/b.m4a` | 0 till 2 takter (ca 6,2–6,8 s), uttoning 1,6 s |
| `jul-julafton-a/b.m4a` | 0 till 4 takter (ca 10,8–11,7 s), uttoning 2 s |
| `jul-badd-a/b.m4a` | 96 slag (24 takter, ca 58 s) från slaget närmast 30 s, och den går runt |
| `jul-sang-a/b.m4a` | hela sången, oförändrad (klipp aldrig sången) |

Sångens text är Sannas egen version, "Vi tänder ett ljus" ("Ett ljus, två ljus, tre ljus, fyra / Vi tänder alla ljusen här / … / Vi hänger kulor, röda, gula / En stjärna högst uppe i vår gran"), enligt Whisper. Den har inga djurnamn och inga ljudord. Sanna väljer a eller b för varje fil genom att lyssna.
