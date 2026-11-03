# Lilla Kvack — Suno prompts (episode 2 structure)

Title theme → long story scenes on soft piano → goodnight outro.
All three are in C major at 96 BPM, so they cut together cleanly (one sung line ≈ one bar ≈ 2.5 s).

**Keeping the voice and melody:** in Suno, make a **Persona** from `audio/Lilla Kvack v2.m4a` and use it for songs 1 and 3, so the voice matches the first episode. For the outro, try **Cover** on your chosen intro take with the outro lyrics pasted in. That reuses the intro melody, which is the surest way to bookend the episode.

**Download as m4a** (not mp3). Suno's m4a embeds the lyrics with per-line timestamps:
`ffmpeg -i song.m4a -map 0:s:0 lyrics.srt`

---

## 1. Intro theme jingle (~19 s, fits the intro + chorus animation)

```
STYLE:
Swedish TV jingle for a toddler cartoon, bouncy title jingle, cheerful warm female vocal with a small group of kids singing along, playful wooden marimba and toy piano intro with bouncy rising notes, plucky ukulele, pizzicato strings, light hand claps, C major, 96 BPM, steady tempo, no tempo changes, one bar per sung line, short punchy syllables, catchy sing-along hook, last word held long and bright, ends with a button chord and a single marimba note

EXCLUDE:
drums kit, glockenspiel, bells, electric guitar, synth bass, bass drop, autotune, rap, male vocal, adult choir, tempo changes, key change, verses, bridge, long instrumental, fade-out, English lyrics

LYRICS:
[Intro]
[Marimba and toy piano, three bars, bouncy rising notes]

[Chorus]
Lilla Kvack går hopp hopp hopp
Upp och ner och runt och opp
Gul och rund och alltid glad
Kom och lek med oss, hurra!

[Soft held chord]
[End]
```

Target about 19 s, 96 BPM. The video is already animated, so the song has to land on it:

| Video (episode time) | What Kvack does | Song should have |
|---|---|---|
| 0–7.2 s | Title letters drop in one by one, Kvack waddles in, looks at us, waves, little hop | Instrumental only, ~3 bars of bouncy marimba and toy piano. Singing starts at ~7.2 s |
| line 1 | Three hops at the end of the line | "hopp hopp hopp" as three short, separate notes |
| line 2 | Big jump, squat, spin, big jump | "Upp" … "ner" … "runt" … "opp" each on a beat |
| line 3 | Sways side to side | Smooth, legato line |
| line 4 | Small hops, then a big jump and a wave | "hurra!" held for about 1 s |
| ~17.5–19 s | Waving, then the wipe to the garden | Button chord, then quiet by ~19 s |

Pick the take whose vocals start **after about 3 bars** of intro (check in an audio editor: first sung syllable near 7.2 s) and that ends right after "hurra!" A take whose vocals start early can still work: trim the start so the first syllable sits at 7.2 s. Lines 1, 2 and 4 keep the words of the moves Kvack already does, so the hops and the spin match what's sung.

---

## 2. Background music (2–3 min, loopable)

```
STYLE:
instrumental, soft solo piano with a little music box and celesta, gentle and playful toddler cartoon underscore, sparse, mid-to-low register, simple repeating motif, C major, 96 BPM, steady tempo, no tempo changes, even dynamics, quiet and warm, background music for children's story scenes

EXCLUDE:
vocals, humming, choir, drums, percussion, bass, strings swell, crescendo, build-up, drop, key change, tempo changes, fade-out, high piercing notes

LYRICS:
[Instrumental]
[Intro: soft piano, two bars]
[Theme A: simple piano motif, sparse]
[Theme B: gentle variation, same volume]
[Theme A: simple piano motif, sparse]
[Theme B: gentle variation, same volume]
[Theme A: simple piano motif, sparse]
[End: same motif, no ritardando]
```

Target 2–3 min, 96 BPM (one bar = 2.5 s). Pick the take that stays **level and sparse** the whole way: no swell, no busy right hand, nothing above the middle of the keyboard that would mask a "boing" or "kvack" sound effect. Listen at low volume under a sound effect; if it still pokes out, take the other one. If it comes out short, use Suno **Extend** from a bar near the end with the same style.

**Seamless loop:** run `librosa.beat.beat_track` on it, then cut the file to a whole number of bars (at 96 BPM, 48 bars = 120 s), starting on a downbeat where Theme A begins and ending on the downbeat just before Theme A comes back. Where it repeats, use a one-bar crossfade (`ffmpeg … acrossfade=d=2.5`). That hides any change in piano tone.

---

## 3. Outro song (~25–30 s)

```
STYLE:
Swedish children's lullaby for toddlers, goodnight and see-you-next-time song, warm gentle female vocal, soft piano and music box, quiet marimba, C major, 96 BPM, steady tempo, no tempo changes, same melody as the Lilla Kvack title jingle but slow-feeling and soft as a lullaby, calm and cosy, ends softly on a held note with music box

EXCLUDE:
drums, hand claps, electric guitar, synth bass, bass drop, autotune, rap, male vocal, choir, tempo changes, key change, big ending, English lyrics

LYRICS:
[Intro]
[Music box, one bar]

[Verse]
Månen tittar stilla fram
Nalle åkte bussen hem

[Chorus]
Lilla Kvack, hej Lilla Kvack
Tack för dagen, tack tack tack
Vinka, vinka, hej hej då
Blunda, sov och vila så

[Outro]
Lilla Kvack, god natt, god natt
Snart så ses vi, kvack kvack kvack

[Music box, soft ending]
[End]
```

Target 25–30 s, 96 BPM. Pick the take whose chorus sounds most like the intro hook (sing "Lilla Kvack, hej Lilla Kvack" from both one after the other), with the softest last 4–5 s and no claps or drums sneaking in. A gentle music box tail is fine; fade it in the edit.

---

## 3b. Outro song v2: the dream (2026-11-03)

Same shape as the outro now in the episode: 10 sung lines of 7 syllables each, about 4.5 s per line, with vocals starting after about 10 s of music box. That way each line lands on the bedtime scene's beats (walk, milk, yawn, sleep, then the dream: ball, Nalle, bee, the big crayon letter, the bubble floating up to a star). The B words are sung but the letter itself is never named.

```
STYLE:
Swedish children's song for toddlers, calm and warm goodnight song with a gentle bounce, not a lullaby, bright friendly female vocal, soft ukulele and marimba, light piano, music box and celesta sparkles, C major, steady relaxed pace, two bars per sung line, no tempo changes, same melody as the Lilla Kvack title jingle, cosy and a little magical, playful light bounce in the dream part, ends softly on a held note with music box

EXCLUDE:
drums, hand claps, electric guitar, synth bass, bass drop, autotune, rap, male vocal, choir, lullaby, sleepy, whispery, slow ballad, tempo changes, key change, big ending, spoken words, English lyrics

LYRICS:
[Intro]
[Music box, four bars]

[Verse]
Natten kommer, månen ler
Kvack får mjölk och dricker mer
Gäspar stort på kudden sin
Blundar, drömmer, somnar in

[Chorus]
Bubbla, bubbla, studsa boll
Björnen Nalle, hej hallå
Bi som surrar, bzz bzz bzz
Boll och björn och bi, hurra!

[Outro]
Bubblan svävar upp så lätt
God natt, Kvack, sov sött, god natt

[Music box, soft ending]
[End]
```

Pick the take whose vocals start at about 10 s and run about 4.5 s per line, so the lines land near the scene times 1.5, 6.2, 11.0, 15.3, 19.5, 24.0, 28.5, 33.0, 37.6 and 42.1. Re-extract the srt, then update `SUNG` in `code-shot/bedtime/index.html` and the dream times in `dream.js` to the new line starts.

---

## 3c. Outro song v3: sleepy funky goodnight (2026-11-03)

Fits the bedtime scene as it is now, so nothing needs retiming. It's a slow sway at 54 BPM with one bar per line, which gives 4.5 s per line. A 2-bar intro of about 9 s comes first, then 10 lines. The groove is soft and funky with a lullaby feel, and no music box.

```
STYLE:
Swedish children's TV goodnight song for toddlers, a sleepy lullaby with a soft funky groove, slow gentle sway, 54 BPM, one bar per sung line, steady tempo, no tempo changes, warm round mellow bass, dreamy Rhodes piano, muted soft wah guitar, brushed drums and quiet finger snaps, tiny playful synth boops, warm cosy hushed female vocal, short simple syllables, smiling and sleepy, kids softly humming on the last words, C major, two-bar groove intro, gets even softer and slower-feeling in the last two lines, ends on one soft held chord

EXCLUDE:
music box, celesta, glockenspiel, bells, choir, male vocal, rap, autotune, loud drums, disco beat, distorted guitar, guitar solo, bridge, key change, tempo changes, long outro, fade-out, English lyrics

LYRICS:
[Intro]
[Soft funky groove, two bars, bass and Rhodes]

[Verse]
Natten kommer, månen ler
Kvack får mjölk och vill ha mer
Gäspar stort och blir så trött
Sover gott och drömmer sött

[Chorus]
Bollen studsar, hopp hopp hopp
Nalle hoppar upp i topp
Biet surrar, bzz bzz bzz
Blåbär, boll och bi, hurra!

[Outro]
[Very soft, sleepy]
Bubblan svävar upp så lätt
Sov nu, Kvack, god natt, god natt

[Soft held chord]
[End]
```

Pick a take where the vocals start at about 9 s and the lines are evenly spaced, about 4.5 s apart, with no extra intro bars or repeated chorus. Download it as **m4a**.

---

## 3d. Outro v4: short, timed (2026-11-03)

v3 (Godnatt_Kvack…140039) came out at 112 s, with a 17 s intro and the chorus sung twice. v4 asks for a single pass of about 55 s: a 4-bar intro (about 9 s), 10 lines of 2 bars each at 107 BPM (4.5 s per line), and one short chord.

```
STYLE:
Short Swedish goodnight song for toddlers, about 55 seconds, sung once through with no repeats, sleepy lullaby with a soft funky groove, 107 BPM in a relaxed half-time sway, two bars per sung line, steady tempo, no tempo changes, warm round mellow bass, dreamy Rhodes piano, muted soft wah guitar, brushed drums and quiet finger snaps, tiny playful synth boops, warm cosy hushed female vocal, short simple syllables, C major, four-bar intro only, ends right after the last line on one short soft chord

EXCLUDE:
music box, celesta, glockenspiel, choir, male vocal, rap, autotune, loud drums, guitar solo, bridge, second verse, repeated chorus, instrumental break, long intro, long outro, fade-out, key change, tempo changes, English lyrics

LYRICS:
[Intro: 4 bars, bass and Rhodes]

[Verse]
Natten kommer, månen ler
Kvack får mjölk och vill ha mer
Gäspar stort och blir så trött
Sover gott och drömmer sött

[Chorus]
Bollen studsar, hopp hopp hopp
Nalle hoppar upp i topp
Biet surrar, bzz bzz bzz
Blåbär, boll och bi, hurra!

[Outro]
Bubblan svävar upp så lätt
Sov nu, Kvack, god natt, god natt

[Short soft chord]
[End]
```
