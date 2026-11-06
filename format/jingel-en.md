# Engelsk introjingel (tiny crayon tv)

Samma roll som den svenska jingeln (*"Rita, rita, ett, två, tre – lilla kritan! Kom och se!"*, se `intro-outro.md`): egen text och melodi, sjungs över introts kort i himlen. Används i de engelska filmerna (Tiny Crayon TV).

```
Wiggle, scribble, one, two, three –
Tiny Crayon TV! Come and see!
```

Samma meter som den svenska raden. Fia, kritan och djuren nämns inte.

**Tagningen (6 nov 2026, "den korta"):** `jingel-en.m4a` är tagning 3 (orörd: `jingel-en-tagning3.m4a`) med tystnad före, så att *"Wiggle"* kommer på 1,4 s som i den svenska. Den sjunger bara första halvan, utan *"Come and see!"*: *"Wiggle, scribble, one, two, three"* 1,4–4,6 s (medan bokstäverna poppar fram), *"Tiny"* ca 4,9 s, *"TV!"* ca 6,3 s, musiken borta ca 7,2 s och sedan tyst. Kortet hoppar därför på *"TV!"* i det engelska introt (`T.kom` 6,2 s, hoppet toppar ca 6,4; 4,95 s i det svenska). Den längre tagningen med *"Come and see!"* på 7,3 s ligger kvar som `jingel-en-tagning1.m4a` (med den: `kom` 7,3).

## Suno-prompt

```
Title: Tiny Crayon TV
```

```
Style: bright toddler jingle, very short, ukulele, glockenspiel, handclaps, happy female vocal, 98 bpm, catchy, cheerful, short instrumental tail
```

```
Exclude styles: drums, electric guitar, autotune, rap, long intro, male vocal
```

```
Lyrics:
[Intro]
Wiggle, scribble, one, two, three –
Tiny Crayon TV! Come and see!
[Instrumental]
[End]
```

## Från tagning till intro

1. Välj den bästa tagningen och klipp den så att första sjungna ordet kommer ca 1,4 s in, som i den svenska `jingel.m4a` (98 bpm, 9,9 s). Minst 9,9 s; skriptet kapar vid 9,9 s och tonar ut sista 0,4 s.
2. Spara den som `format/jingel-en.m4a`.
3. Bygg om de engelska filmerna (introt med jingeln görs om av sig självt):

```bash
avsnitt/005-rosa-bilen/film/satt-ihop.sh en && avsnitt/007-bruna-ladbilen/film/satt-ihop.sh en
```

Finns ingen `jingel-en.m4a` ligger lågt fågelkvitter i jingelns plats i `intro/intro-med-jingel-en.mp4`. Byts tagningen ut och orden hamnar på andra tider: flytta `kom` i `T` i `intro/index.html` och rendera om introt (`node scener/render.mjs intro --en`).

## Introts bild

`intro/index.html?en` (`node scener/render.mjs intro --en` → `intro/intro-en.mp4`) i 005 och 007: ordmärket *tiny crayon tv* med samma krit-bokstäver som kanalbannern, *Episode 5 · The Pink Song* och *Episode 7 · The Brown Song*. Utan `?en` är introt det svenska, oförändrat.
