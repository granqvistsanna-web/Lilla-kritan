# Gissa teckningen – ljud och musik som saknas

Allt som Shortsen pekar på men som inte finns än. Renderingen lämnar dem tysta tills filen finns; rendera om efteråt. Inställningar och regler: skillen `gissa-teckningen`.

## Musik (en gång, delas av alla)

**`assets/ljud/musik/gissa-bad.m4a`** – Suno, Instrumental på.

Style:
```
gentle toddler children's music, playful and calm, 96 BPM, 4/4, major key, glockenspiel and soft marimba melody, light ukulele strums, soft brushed shaker, warm round upright bass, cozy and simple, steady even tempo, loop-friendly phrases of 4 bars, no key change
```
Exclude:
```
vocals, voice, choir, humming, whistling, heavy drums, electric guitar, synth lead, fast tempo, tempo change, key change, dramatic build, fade-in
```
Lyrics:
```
[Instrumental]
[Intro: soft ukulele, 2 bars]
[Theme: glockenspiel melody over ukulele, 8 bars]
[Quiet break: only soft ukulele and bass, very sparse, 4 bars]
[Theme: glockenspiel melody over ukulele, 8 bars]
[Quiet break: only soft ukulele and bass, very sparse, 4 bars]
[Theme, 8 bars]
[Outro: ends cleanly on the home chord]
```

## Röst (ElevenLabs)

Samma berättarröst i alla. Multilingual v2, stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9. Varm, lugn och långsam. Tre tagningar, välj en, klipp bort tystnaden, exportera m4a.

| Fil | Text |
|---|---|
| `assets/ljud/roster/vad-kan-det-vara.m4a` | `Vad kan det vara?` |
| `bondgarden/ko/svar.m4a` | `En ko!` |
| `bondgarden/ko/namn.m4a` | `Det är en ko.` |
| `bondgarden/anka/svar.m4a` | `En anka!` |
| `bondgarden/anka/namn.m4a` | `Det är en anka.` |
| `bondgarden/traktor/svar.m4a` | `En traktor!` |
| `bondgarden/traktor/namn.m4a` | `Det är en traktor.` |
| `bondgarden/far/svar.m4a` | `Ett får!` |
| `bondgarden/far/namn.m4a` | `Det är ett får.` |
| `fordon/bil/svar.m4a` | `En bil!` |
| `fordon/bil/namn.m4a` | `Det är en bil.` |
| `lekplatsen/boll/svar.m4a` | `En boll!` |
| `lekplatsen/boll/namn.m4a` | `Det är en boll.` |
| `lekplatsen/hink/svar.m4a` | `En hink!` |
| `lekplatsen/hink/namn.m4a` | `Det är en hink.` |
| `lekplatsen/gunga/svar.m4a` | `En gunga!` |
| `lekplatsen/gunga/namn.m4a` | `Det är en gunga.` |

`svar` ljust och lite förvånat, `namn` lugnt med fallande ton. Sökvägarna ovan är under `produktion/youtube/shorts/gissa/`.

## Ljudeffekter (ElevenLabs SFX, 1,5–2 s)

Spara som `assets/ljud/effekter/<namn>/<namn>-1.m4a` och lägg till en rad i effekternas README.

| Namn | Short | Prompt |
|---|---|---|
| `mu` | ko | `a real dairy cow mooing once, close, calm farm, no music, no voice` |
| `studs` | boll | `a real rubber playground ball bouncing once on asphalt, close, no music, no voice` |
| `hink-dunk` | hink | `a small plastic toy bucket set down on dry sand, one soft thud, close, no music, no voice` |
| `gung-knarr` | gunga | `a playground swing chain creaking once as the swing moves, close, outdoors, no music, no voice` |

Finns redan: `kvack`, `ba`, `tuff-tuff`, `tuta-tut`, `brum`, `steg`, `dunk`, `duns`, `hjul-gnissel`, `pop`, `pling`, `skrrrrt-lang`.
