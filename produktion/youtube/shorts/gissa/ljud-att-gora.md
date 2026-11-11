# Gissa teckningen – ljud och musik som saknas

Allt som Shortsen pekar på men som inte finns än. Renderingen lämnar dem tysta tills filen finns; rendera om efteråt. Inställningar och regler: skillen `gissa-teckningen`.

**Används inte sedan 2026-11-07:** `intro-2`, `intro-3`, `intro-4` (säger att kritan ritar innan den har börjat, eller stela), `vad-kan-det-vara-4` och `hej-da-4` (stela, och "Soon the crayon will draw something new" är dålig engelska). Gör inga nya sådana.

**Sedan 2026-11-07 sägs namnet bara en gång** ("En ko!"). Raderna `namn.m4a` ("Det är en ko.", "It's a cow.") nedan används inte längre och behöver inte spelas in för nya Shorts.

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
| `assets/ljud/roster/vad-blir-det-1.m4a` | `Vad blir det?` |

Hmm finns i fem varianter, så att Shortsen inte låter likadant efter varandra. Varje Short får alltid samma nummer (valt efter mappens namn). Hmm kommer en tredjedel in i ritandet, frågan strax före det som avgör. **Frågan är på svenska alltid `vad-blir-det-1` ("Vad blir det?").** "Vad kan det vara?" och dess varianter används aldrig sedan 2026-11-08 – de låter stela (Sanna). Engelskan behåller sina `roster/en/vad-kan-det-vara-N`. Hmm-ljuden görs bäst med Eleven v3 och ljudtaggen inom hakparentes.

| Fil | Text |
|---|---|
| `assets/ljud/roster/hmm-1.m4a` | `[thoughtful] Hmm…` |
| `assets/ljud/roster/hmm-2.m4a` | `[curious] Hmmm… vad blir det här?` |
| `assets/ljud/roster/hmm-3.m4a` | `[surprised] Oj! Titta…` |
| `assets/ljud/roster/hmm-4.m4a` | `[thoughtful] Mmm… jag undrar…` |
| `assets/ljud/roster/hmm-5.m4a` | `[curious] Hmm, vad ritar kritan nu?` |

Intro och hej då, också i fem varianter med samma nummer som hmm och frågan. Introt sägs medan kritan poppar fram (ritandet börjar när det är sagt), hej då medan saken försvinner i slutet. Saknas en intro-variant används `gissa-teckningen.m4a`.

| Fil | Text |
|---|---|
| `assets/ljud/roster/intro-1.m4a` | `[excited] Gissa teckningen!` |
| `assets/ljud/roster/intro-2.m4a` | `[excited] Hej! Nu ska vi gissa teckningen!` |
| `assets/ljud/roster/intro-3.m4a` | `[excited] Gissa teckningen! Kritan ritar.` |
| `assets/ljud/roster/intro-4.m4a` | `[curious] Titta, kritan ritar! Gissa teckningen!` |
| `assets/ljud/roster/intro-5.m4a` | `[excited] Hej hej! Gissa teckningen!` |
| `assets/ljud/roster/hej-da-1.m4a` | `[warm] Hej då!` |
| `assets/ljud/roster/hej-da-2.m4a` | `[warm] Hej då! Vi ses snart.` |
| `assets/ljud/roster/hej-da-3.m4a` | `[warm] Tack för att du gissade! Hej då!` |
| `assets/ljud/roster/hej-da-4.m4a` | `[warm] Hej då! Snart ritar kritan något nytt.` |
| `assets/ljud/roster/hej-da-5.m4a` | `[warm] Hej hej! Vi ritar mer en annan gång.` |
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
| `bondgarden/hona/` | `En höna!` | `Det är en höna.` | `Hönan säger kakaka.` |
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

### Skogen (2026-11-11, bara svar och saga)

Malin, v3, samma inställningar. Spara som `svar.m4a` och `saga.m4a` i mappen. Lätena finns redan (`kvak`, `mus-pip`, `uggla`, `surr`, `nos`; ekorren har `prassel-lov` tills ett eget läte finns).

| Mapp | svar | saga |
|---|---|---|
| `skogen/groda/` | `[excited] En groda!` | `[playful] Grodan säger kvack.` |
| `skogen/mus/` | `[excited] En mus!` | `[playful] Musen säger pip.` |
| `skogen/uggla/` | `[excited] En uggla!` | `[playful] Ugglan säger hoho.` |
| `skogen/bi/` | `[excited] Ett bi!` | `[playful] Biet surrar.` |
| `skogen/igelkott/` | `[excited] En igelkott!` | `[playful] Igelkotten nosar.` |
| `skogen/ekorre/` | `[excited] En ekorre!` | `[playful] Ekorren hoppar.` |

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

## Engelsk version (Guess the Drawing)

Samma inställningar och ljudtaggar som de svenska raderna, men en varm engelsk berättarröst (samma i alla). Amerikansk engelska (sandbox, airplane, fire truck); för brittisk: *sandpit*, *aeroplane*, *fire engine … nee-naw*. Filerna heter som de svenska, i en `en/`-mapp: `assets/ljud/roster/en/intro-1.m4a` och `<short>/en/svar.m4a`. Motorn läser dem med `?en` i adressen (rendera med `render.mjs <short> --staende --en`, ger `<ord>-staende-en.mp4`); texterna står i varje Shorts `index.html` under `en:`. Samlingen: `bondgarden/samling/en/var-ar-kon.m4a` (`Where is the cow?`) och `en/dar-ar-kon.m4a` (`There's the cow!`).

| # | intro | hmm | vad-kan-det-vara | hej-da |
|---|---|---|---|---|
| 1 | `[excited] Guess the drawing!` | `[thoughtful] Hmm…` | `What can it be?` | `[warm] Bye-bye!` |
| 2 | `[excited] Hi! Let's guess the drawing!` | `[curious] Hmmm… what's this going to be?` | `Hmm… what can it be?` | `[warm] Bye-bye! See you soon.` |
| 3 | `[excited] Guess the drawing! The crayon is drawing.` | `[surprised] Oh! Look…` | `What do you think it is?` | `[warm] Thank you for guessing! Bye-bye!` |
| 4 | `[curious] Look, the crayon is drawing! Guess the drawing!` | `[thoughtful] Mmm… I wonder…` | `Do you know what it is?` | `[warm] Bye-bye! Soon the crayon will draw something new.` |
| 5 | `[excited] Hello, hello! Guess the drawing!` | `[curious] Hmm, what is the crayon drawing now?` | `What could the crayon have drawn?` | `[warm] Bye-bye! We'll draw more another time.` |

| Mapp | svar | namn | saga |
|---|---|---|---|
| `bondgarden/ko/` | `A cow!` | `It's a cow.` | `The cow says moo.` |
| `bondgarden/gris/` | `A pig!` | `It's a pig.` | `The pig says oink.` |
| `bondgarden/far/` | `A sheep!` | `It's a sheep.` | `The sheep says baa.` |
| `bondgarden/hast/` | `A horse!` | `It's a horse.` | `The horse says neigh.` |
| `bondgarden/hona/` | `A hen!` | `It's a hen.` | `The hen says cluck cluck.` |
| `bondgarden/anka/` | `A duck!` | `It's a duck.` | `The duck says quack.` |
| `bondgarden/katt/` | `A cat!` | `It's a cat.` | `The cat says meow.` |
| `bondgarden/hund/` | `A dog!` | `It's a dog.` | `The dog says woof.` |
| `bondgarden/traktor/` | `A tractor!` | `It's a tractor.` | `The tractor goes chug chug.` |
| `fordon/bil/` | `A car!` | `It's a car.` | `The car goes beep beep.` |
| `fordon/buss/` | `A bus!` | `It's a bus.` | `The bus drives.` |
| `fordon/brandbil/` | `A fire truck!` | `It's a fire truck.` | `The fire truck goes wee-oo wee-oo.` |
| `fordon/tag/` | `A train!` | `It's a train.` | `The train goes choo choo.` |
| `fordon/bat/` | `A boat!` | `It's a boat.` | `The boat bobs.` |
| `fordon/flygplan/` | `An airplane!` | `It's an airplane.` | `The airplane flies.` |
| `fordon/cykel/` | `A bike!` | `It's a bike.` | `The bike goes ring ring.` |
| `lekplatsen/boll/` | `A ball!` | `It's a ball.` | `The ball bounces.` |
| `lekplatsen/gunga/` | `A swing!` | `It's a swing.` | `The swing swings.` |
| `lekplatsen/gungbrada/` | `A seesaw!` | `It's a seesaw.` | `The seesaw goes up and down.` |
| `lekplatsen/hink/` | `A bucket!` | `It's a bucket.` | `The bucket pours.` |
| `lekplatsen/rutschkana/` | `A slide!` | `It's a slide.` | `Wheee, down the slide!` |
| `lekplatsen/sandlada/` | `A sandbox!` | `It's a sandbox.` | `The sand flies up.` |
| `lekplatsen/spade/` | `A shovel!` | `It's a shovel.` | `The shovel digs.` |

## Engelska repliker, varmare röst (2026-11-07)

Allt engelskt tal i Gissa görs om med en varmare röst. Ett manus i ett svep (Eleven v3), raderna i den här ordningen; de delas sedan vid pauserna och sätts på plats med whisper:
`roster/en/` intro-1…5, hmm-1…5, vad-kan-det-vara-1…5, hej-da-1…5, `samling/en/` var-ar-kon, dar-ar-kon, och sedan per Short `en/` svar, namn, saga (ko, gris, far, hast, hona, anka, katt, hund, traktor, bil, buss, brandbil, tag, bat, flygplan, cykel, gunga, rutschkana, sandlada, spade, hink, boll, gungbrada).

### Hello (engelska, före introt)

`assets/ljud/roster/en/hello-1…5.m4a`, en per Short (samma nummer som introt). Spelas bara i `?en`; finns filen inte blir det som förut. Shorts med intro-2 och intro-5 (som redan hälsar) får intro-1 när hello finns. Samlingen har ingen hello.
1. `[warmly] Hello!`
2. `[warmly] Hello there!`
3. `[warmly] Hi there!`
4. `[warmly] Hello, little friend!`
5. `[warmly] Hi, hello!`

## Julkalendern (2026-11-11, piloterna lucka 1 och 2)

Luckorna ligger i `produktion/youtube/shorts/jul/`. Kalendern (`jul/lucka.js`) har egna repliker i stället för "Gissa teckningen!" och "Hej då!". Eleven v3, samma inställningar som ovan. Saknas en fil är den tyst i renderingen.

| Fil | Text |
|---|---|
| `assets/ljud/roster/jul/lucka-1.m4a` | `[excited] Idag öppnar vi lucka ett!` |
| `assets/ljud/roster/jul/lucka-2.m4a` | `[excited] Idag öppnar vi lucka två!` |
| `assets/ljud/roster/jul/vi-ses-i-morgon.m4a` | `[warm] Vi ses i morgon!` (delas av lucka 1–23) |
| `jul/01-stjarna/svar.m4a` | `[excited] En stjärna!` |
| `jul/01-stjarna/saga.m4a` | `[warm] Stjärnan blinkar.` |

Lucka 2 (lammet leker tittut) använder tittut-seriens repliker i `assets/ljud/roster/tittut/`, inga nya.

Ljudeffekter som redan finns och används: `swoosh` (in i och ut ur luckan), `ding` (luckan öppnas), `glimt` och `glitter` (stjärnan), `ba` och `ba-fniss` (lammet). Musiken är Gissas bädd, `assets/ljud/musik/gissa-bad.m4a`: ingen ny musik.
