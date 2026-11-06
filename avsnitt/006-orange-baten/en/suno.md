# Suno – Avsnitt 006 The Orange Song (engelsk version)

Samma stil som den svenska tagningen (glad barnreggae, `../suno.md`), men engelsk sång och engelsk text från [sang.md](sang.md). Klistra in stilen i **Style**, raden under "Exclude" i **Exclude styles** och resten i **Lyrics**. Ladda ner som **m4a** och spara som `en/sang.m4a`. Sången klipps inte; bilden tajmas om efter tagningen (`en/rader.txt`).

Ändrat mot den svenska prompten: engelsk diktion i stället för svensk, "oransch"-instruktionen borttagen, "english pronunciation" borttaget ur Exclude.

```
Title: The Orange Song

Style: happy toddler reggae, slow relaxed 84 bpm, never rushed, sunny laid-back one drop groove, warm round reggae bass, offbeat skank guitar, bubbling organ, soft steel drum, light rimshot drums, handclaps on every "Orange!", soft horn stabs on "toot, toot", tiny flute chirps on "tweet, tweet, tweet", call and echo with a small happy kids choir answering in the parentheses, friendly childlike female lead vocal, warm and smiling, clear American English diction, short shoutable hook "Orange!" repeated many times, sing-along, small instrumental gaps, gentle dynamics, the groove thins out once in verse 2 and comes back happy, slow soft keys-only intro

Exclude: distortion, rock, heavy drums, dub effects, echo delay on vocals, loud drops, sudden loud parts, screaming, autotune, rap, toasting, tempo changes, fast tempo, double time, long solo, long intro

Lyrics:
[Intro - slow and soft, only keys and voice]
The crayon draws …
what can it be?
What can it be?
[Instrumental Break - 2 bars, very soft held chord, no groove]
A boat! An orange boat!
Toot-toot, off we go!

[Instrumental Break - the slow reggae groove starts, 2 bars]

[Verse 1]
The dino sails her orange boat,
toot, toot, toot – on the waves!
The dino looks for orange now,
come and look – you and me!

[Chorus - call and echo, handclaps]
Orange! (Orange!)
Orange! (Orange!)
Orange is the best color!
Orange! (Orange!)
Orange! (Orange!)
Like a juicy orange!
Toot, toot, toot, toot –
what's orange? Let's find out!

[Hook - call and echo]
What's orange? (What's orange?)
Look right there! (Look right there!)
The fish is orange –
splash, splash, splash!
[Break - 1 bar]

[Hook - call and echo, tiny flute chirps]
What's orange? (What's orange?)
Look right there! (Look right there!)
The bird is orange –
tweet, tweet, tweet!
[Break - 1 bar]

[Bridge - soft, asking]
What else is orange?
Can you see?
[Instrumental Break - 2 bars, very soft, no vocals]
The vest is orange – and the flag too!
Thump, thump, thump!

[Chorus - call and echo, handclaps]
Orange! (Orange!)
Orange! (Orange!)
Orange is the best color!
Orange! (Orange!)
Orange! (Orange!)
Like a juicy orange!
Toot, toot, toot, toot –
what's orange? Let's find out!

[Hook - call and echo]
What's orange? (What's orange?)
Look right there! (Look right there!)
The orange is orange –
round, round, round!

[Instrumental Break - 4 bars, soft reggae groove, no vocals]

[Verse 2 - the groove drops to soft bass and organ, a little worried]
Uh-oh, splash! (Splash!)
There it floats away!
Further, further, further away … (Oh no!)
The dino is sad – sniff, sniff, sniff.

[Build up - soft drum roll, the choir asks]
Who can help? (Who can help?)
[Instrumental Break - 1 bar, held chord, silence on the last beat]

[Verse 3 - the full groove comes back, happy and bouncy, same slow tempo]
The duck! (The duck!) The duck jumps in – splash!
The duck swims, quack, quack, quack!
Bring the orange here – here, here, here!
Half for me and half for you!
Yum, yum, yum – hooray, hooray!

[Dance Break - shouted, music stops for one beat]
Dance break! (Dance break!)

[Instrumental Break - easy reggae dance groove, same slow tempo, handclaps, 2 bars]

[Dance Break - slow and easy for toddlers, same tempo, call and echo, a short instrumental gap after each echo]
Hop, hop, hop! (Hop, hop, hop!)
Spin around! (Spin around!)
Clap, clap, clap! (Clap, clap, clap!)
Everybody's dancing – orange dance! (Orange dance!)

[Instrumental Break - easy reggae dance groove, 2 bars]

[Final Chorus - happy, big sing-along, call and echo, same slow tempo]
The fish – orange! (Orange!)
The bird – orange! (Orange!)
Vest and orange and boat – orange! (Orange!)
Orange is the best color,
like a juicy orange!
Bye-bye, bye-bye – toot, toot!

[Outro - short soft instrumental ending]
[End]
```

## Görs i redigeringen, inte i Suno

- Gissningspausen och frågepausen ska vara 3–5 s. Den svenska tagningen blev ca 104 bpm fast prompten bad om 84; mät tempot (librosa) och skriv det i `en/rader.txt`.
- Ekot ska sjungas av en barnkör. Annars generera igen.
- Luckan före vers 2 behöver ca 10 s för de engelska replikerna ("Hi, duck!" …). Repliken spelas in för sig.
