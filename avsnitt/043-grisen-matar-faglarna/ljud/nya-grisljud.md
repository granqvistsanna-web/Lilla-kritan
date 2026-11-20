# 043 – nya grisljud (Sanna 2026-11-20)

Feedback J16: 0:24 *"new gris ljud here, remove this oink"* och 2:00 *"give me prompts for new pig sound effects"*.
Sanna gjorde alla tre 2026-11-20 (en tagning var). De ligger i `assets/ljud/effekter/` och är inlagda i `storyboard/rader.mjs` (rad 2, 17 och 20).

ElevenLabs Sound Effects, **prompt influence 0,55**, längden inställd för hand. Gör 4 per rad och välj den mjukaste.
Samma lilla tecknade kultinggris som `noff-gullig` (020). Inga ord, inget skrik, inget argt. Tystnaden klipps bort, topp −3 dBFS,
originalen i `produktion/ljud-original/effekter/<mapp>/`, raden i `assets/ljud/effekter/README.md`.

| Mapp | Längd | Var | Vad |
|---|---|---|---|
| ~~`noff-visa`~~ | 1,0 s | rad 2 (0:24), efter *"Vad har du i påsen?"* | grisen håller fram påsen: "titta här!" |
| `noff-pip` | 1,2 s | rad 20 (2:00), *"Det blev ett noff!"* | grisen försöker säga pip, men det blir ett noff (ersätter `noff-gullig-1`) |
| `noff-mums` | 1,5 s | rad 17 (1:48), grisen smakar på kärven | små snusande smaskljud vid kornen (läggs på 1,7 s in i raden) |

```prompt
noff-visa: Tiny cute cartoon piglet proudly showing off a little bag, a bright bouncy "hm-hm!" grunt followed by one short happy squeaky oink, like saying "look what I have!", sweet baby voice, close dry recording, no music, no background
```

```prompt
noff-pip: Tiny cute cartoon piglet trying very hard to chirp like a little bird, a thin high squeaky "pee-" that breaks into a funny soft snort through the snout, comical and sweet, not loud, close dry recording, no music, no background
```

```prompt
noff-mums: Tiny cute cartoon piglet sniffing and nibbling grain, quick soft snuffly sniffs through the snout and tiny happy munching smacks, gentle and sweet, close dry recording, no music, no background
```

**2026-11-20, efter J16-feedbacken "still bad sound effects for pig":** `noff-visa` avvisad. Rad 2 har nu `noff-titta-1` (riktiga CC0-grisgrymt, 3,5 halvtoner upp som `noff-sot`, se `assets/ljud/effekter/README.md`). Take 2 och 3 finns att byta till.

## Runda 3: gulligare grisljud och "ooo"/"aah" (J16 0:38, 2026-11-20)

Sanna: *"i want new pig sounds more cute, also consider other animal sounds for like oo aa"*. Openverse har bara riktiga grisgrymt
(de har avvisats två gånger), så de här görs i ElevenLabs som lammets `lamm-ooo`/`lamm-aah` och kattens `mjau-ooo`.
Prompt influence 0,55, 4 tagningar per ljud, välj den mjukaste. Tystnaden klipps bort, topp −3 dBFS.

| Mapp | Längd | Var (rad i `storyboard/rader.mjs`) | Ersätter |
|---|---|---|---|
| `noff-ooo` | 1,0 s | 13 (grisen ser kärven), 21 (fågeln landar på luvan), 38 (snöflingan på trynet) | `noff-gullig-5` |
| `noff-aah` | 1,2 s | 3, 14, 16, 25, 31, 35 (förtjust) | `noff-gullig-2` |
| `noff-kolla` | 1,0 s | 2 (håller fram påsen) | `noff-titta-1` |

```prompt
noff-ooo: Tiny cute cartoon piglet making a soft rising "ooooh" of wonder and amazement, round and sweet, a tiny snout snuffle at the start, high baby voice, gentle, no words, close dry recording, no music, no background
```

```prompt
noff-aah: Tiny cute cartoon piglet making a happy delighted "aaah!" that bounces up, warm and giggly with one tiny squeaky oink at the end, high baby voice, sweet, no words, close dry recording, no music, no background
```

```prompt
noff-kolla: Tiny cute cartoon piglet proudly saying "hm-hm!" in a bright bouncy little voice, like "look!", two tiny squeaky snout grunts, high baby voice, sweet and playful, no words, close dry recording, no music, no background
```

Sanna gör dem själv (2026-11-20). Längd: `noff-ooo` 1,0 s, `noff-aah` 1,2 s, `noff-kolla` 1,0 s. Alla tagningar oklippta i
`produktion/ljud-original/effekter/<mapp>/`, sedan klipps de och läggs in i `assets/ljud/effekter/<mapp>/` och `storyboard/rader.mjs`.
