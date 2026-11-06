# Gissa teckningen – ljud och musik som saknas

Allt som Shortsen pekar på men som inte finns än. Renderingen lämnar dem tysta tills filen finns; rendera om efteråt. Inställningar och regler: skillen `gissa-teckningen`.

## Musik (en gång, delas av alla)

**`assets/ljud/musik/gissa-bad.m4a`** – Suno, Instrumental på. Byggd efter Shortens delar: 100 BPM ger 2,4 s per takt, så 18 takter är ca 43 s, längre än den längsta Shorten (ca 33 s); musiken tonas ut när saken har lämnat bilden. Ett kortare stycke (25 s) blev för kort. Suno håller inte längden exakt; välj en tagning som har intro, tyst paus och ett rent slut, så anpassas livet (slutet) efter sista ackordet i stället för att klippa musiken.

| Takt | Tid | Del i Shorten |
|---|---|---|
| 1 | 0–2,4 s | intro: kritan poppar fram, *"Gissa teckningen!"* |
| 2–5 | 2,4–12 s | ritandet |
| 6–7 | 12–16,8 s | gissningspausen, nästan tyst |
| 8–17 | 16,8–40,8 s | namnet, sagan, lätet och livet |
| 18 | 40,8–43 s | outro: rent slut (hörs bara om Shorten är lång) |

Ett fält (max 500 tecken):
```
Instrumental classic whimsical children's TV drawing music, light and curious, 100 BPM, 4/4, major key. A 45 second cue: 1-bar ukulele and toy piano intro, 4 bars of clarinet and bassoon trading little phrases, 2 almost silent bars with one soft toy piano chord, a bright xylophone flourish, 10 bouncy bars with ukulele and upright bass, then a clean ending on the home chord. Soft brushed snare, cozy storybook feel. No vocals, no glockenspiel, no tempo or key change, no fade.
```

## Röst (ElevenLabs)

Samma berättarröst i alla. Multilingual v2, stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9. Varm, lugn och långsam. Tre tagningar, välj en, klipp bort tystnaden, exportera m4a.

| Fil | Text |
|---|---|
| `assets/ljud/roster/gissa-teckningen.m4a` | `Gissa teckningen!` (introt, glatt och inbjudande) |
| `assets/ljud/roster/vad-kan-det-vara.m4a` | `Vad kan det vara?` |

Hmm och frågan finns i fem varianter var, så att Shortsen inte låter likadant efter varandra. Varje Short får alltid samma nummer (valt efter mappens namn). Hmm kommer en tredjedel in i ritandet, frågan strax före det som avgör. Saknas en variant används `vad-kan-det-vara.m4a`. Hmm-ljuden görs bäst med Eleven v3 och ljudtaggen inom hakparentes.

| Fil | Text |
|---|---|
| `assets/ljud/roster/hmm-1.m4a` | `[thoughtful] Hmm…` |
| `assets/ljud/roster/hmm-2.m4a` | `[curious] Hmmm… vad blir det här?` |
| `assets/ljud/roster/hmm-3.m4a` | `[surprised] Oj! Titta…` |
| `assets/ljud/roster/hmm-4.m4a` | `[thoughtful] Mmm… jag undrar…` |
| `assets/ljud/roster/hmm-5.m4a` | `[curious] Hmm, vad ritar kritan nu?` |
| `assets/ljud/roster/vad-kan-det-vara-1.m4a` | `Vad kan det vara?` |
| `assets/ljud/roster/vad-kan-det-vara-2.m4a` | `Hmm… vad kan det vara?` |
| `assets/ljud/roster/vad-kan-det-vara-3.m4a` | `Vad tror du att det är?` |
| `assets/ljud/roster/vad-kan-det-vara-4.m4a` | `Vet du vad det är?` |
| `assets/ljud/roster/vad-kan-det-vara-5.m4a` | `Vad kan kritan ha ritat?` |
| `bondgarden/ko/svar.m4a` | `En ko!` |
| `bondgarden/ko/namn.m4a` | `Det är en ko.` |
| `bondgarden/ko/saga.m4a` | `Kon säger muu.` |
| `bondgarden/anka/svar.m4a` | `En anka!` |
| `bondgarden/anka/namn.m4a` | `Det är en anka.` |
| `bondgarden/anka/saga.m4a` | `Ankan säger kvack.` |
| `bondgarden/traktor/svar.m4a` | `En traktor!` |
| `bondgarden/traktor/namn.m4a` | `Det är en traktor.` |
| `bondgarden/traktor/saga.m4a` | `Traktorn säger tuff tuff.` |
| `bondgarden/far/svar.m4a` | `Ett får!` |
| `bondgarden/far/namn.m4a` | `Det är ett får.` |
| `bondgarden/far/saga.m4a` | `Fåret säger bä.` |
| `fordon/bil/svar.m4a` | `En bil!` |
| `fordon/bil/namn.m4a` | `Det är en bil.` |
| `fordon/bil/saga.m4a` | `Bilen säger tut tut.` |
| `lekplatsen/boll/svar.m4a` | `En boll!` |
| `lekplatsen/boll/namn.m4a` | `Det är en boll.` |
| `lekplatsen/boll/saga.m4a` | `Bollen studsar.` |
| `lekplatsen/hink/svar.m4a` | `En hink!` |
| `lekplatsen/hink/namn.m4a` | `Det är en hink.` |
| `lekplatsen/hink/saga.m4a` | `Hinken häller.` |
| `lekplatsen/gunga/svar.m4a` | `En gunga!` |
| `lekplatsen/gunga/namn.m4a` | `Det är en gunga.` |
| `lekplatsen/gunga/saga.m4a` | `Gungan gungar.` |

`svar` ljust och lite förvånat, `namn` lugnt med fallande ton, `saga` lugnt och lite lekfullt (djuren *säger*, sakerna *gör*). 26 filer i allt. Sökvägarna ovan är under `produktion/youtube/shorts/gissa/`.

## Ljudeffekter (ElevenLabs SFX, 1,5–2 s)

Spara som `assets/ljud/effekter/<namn>/<namn>-1.m4a` och lägg till en rad i effekternas README.

| Namn | Short | Prompt |
|---|---|---|
| `mu` | ko | `a real dairy cow mooing once, close, calm farm, no music, no voice` |
| `studs` | boll | `a real rubber playground ball bouncing once on asphalt, close, no music, no voice` |
| `hink-dunk` | hink | `a small plastic toy bucket set down on dry sand, one soft thud, close, no music, no voice` |
| `gung-knarr` | gunga | `a playground swing chain creaking once as the swing moves, close, outdoors, no music, no voice` |

Finns redan: `kvack`, `ba`, `tuff-tuff`, `tuta-tut`, `brum`, `steg`, `dunk`, `duns`, `hjul-gnissel`, `pop`, `pling`, `skrrrrt-lang`.

## Kommande Shorts (röst, samma inställningar)

Spelas in i förväg, i den här ordningen (svar, namn, saga per sak), så kan filerna läggas på plats direkt. Mapparna skapas när Shorten görs.

| Mapp | svar | namn | saga |
|---|---|---|---|
| `bondgarden/gris/` | `En gris!` | `Det är en gris.` | `Grisen säger nöff.` |
| `bondgarden/hast/` | `En häst!` | `Det är en häst.` | `Hästen säger gnägg.` |
| `bondgarden/hona/` | `En höna!` | `Det är en höna.` | `Hönan säger kluck kluck.` |
| `bondgarden/katt/` | `En katt!` | `Det är en katt.` | `Katten säger mjau.` |
| `bondgarden/hund/` | `En hund!` | `Det är en hund.` | `Hunden säger vov.` |
| `fordon/buss/` | `En buss!` | `Det är en buss.` | `Bussen kör.` |
| `fordon/brandbil/` | `En brandbil!` | `Det är en brandbil.` | `Brandbilen säger ijo ijo.` |
| `fordon/tag/` | `Ett tåg!` | `Det är ett tåg.` | `Tåget säger tjoff tjoff.` |
| `fordon/bat/` | `En båt!` | `Det är en båt.` | `Båten guppar.` |
| `fordon/flygplan/` | `Ett flygplan!` | `Det är ett flygplan.` | `Flygplanet flyger.` |
| `fordon/cykel/` | `En cykel!` | `Det är en cykel.` | `Cykeln säger pling pling.` |
| `lekplatsen/rutschkana/` | `En rutschkana!` | `Det är en rutschkana.` | `Wiii, ner för rutschkanan!` |
| `lekplatsen/sandlada/` | `En sandlåda!` | `Det är en sandlåda.` | `Sanden yr.` |
| `lekplatsen/spade/` | `En spade!` | `Det är en spade.` | `Spaden gräver.` |
| `lekplatsen/gungbrada/` | `En gungbräda!` | `Det är en gungbräda.` | `Gungbrädan går upp och ner.` |

## Kommande Shorts (ljudeffekter, ElevenLabs SFX, 1,5–2 s)

Samma regler som ovan: `assets/ljud/effekter/<namn>/<namn>-1.m4a` och en rad i effekternas README.

| Namn | Short | Prompt |
|---|---|---|
| `noff` | gris | `a real pig grunting twice, friendly, close, calm farm, no music, no voice` |
| `gnagg` | häst | `a real horse neighing once, gentle, close, calm farm, no music, no voice` |
| `trav` | häst | `a horse trotting slowly on soft ground, a few steps, close, no music, no voice` |
| `kluck` | höna | `a real hen clucking softly a few times, close, calm farm, no music, no voice` |
| `pick` | höna | `a hen pecking the ground twice, soft taps on dry soil, close, no music, no voice` |
| `mjau` | katt | `a real kitten meowing once, sweet and soft, close, no music, no voice` |
| `vov` | hund | `a real small friendly dog barking twice, happy, close, no music, no voice` |
| `buss-dorr` | buss | `a city bus door opening with a soft hiss and closing again, close, no music, no voice` |
| `siren` | brandbil | `a toy fire truck siren, two-tone, soft and friendly, short, no music, no voice` |
| `tag-tjoff` | tåg | `a small steam train chugging and one soft whistle, gentle, close, no music, no voice` |
| `bat-tut` | båt | `a small boat horn tooting once, warm and soft, over gentle water, no music, no voice` |
| `vagor` | båt | `gentle small water waves lapping, calm lake, close, no music, no voice` |
| `flygplan` | flygplan | `a small propeller plane taking off and flying away, soft, not loud, no music, no voice` |
| `cykelklocka` | cykel | `a bicycle bell ringing twice, bright and friendly, close, no music, no voice` |
| `glid` | rutschkana | `sliding down a plastic playground slide, a soft whoosh, close, no music, no voice` |
| `sand` | sandlåda, spade | `dry sand trickling and settling, soft, close, no music, no voice` |
| `grav` | spade | `a small toy shovel digging into sand twice, soft scrapes, close, no music, no voice` |
| `vick` | gungbräda | `a wooden playground seesaw creaking up and down once, close, outdoors, no music, no voice` |
