# Ljud för Hugo i Tittut

Hugos egna ljud i `lekplatsen/hunden-hugo/` (Sanna 2026-11-10). Samma regler som [`ljud-v2-kanel.md`](ljud-v2-kanel.md): filerna i `assets/ljud/effekter/<namn>/<namn>-N.m4a`, numrerade utan luckor, normaliserade som `fniss` 4–8 (topp ca −9 dBFS), klipp bort tystnaden före och efter, m4a. Motorn hoppar över en familj som saknas.

**Klart 2026-11-10:** alla familjer ligger i `assets/ljud/effekter/` och hörs i filmen. Av de 4 versionerna per rad valdes den som mätte ljusast röst (minst bas), för `smyg` den med ett enda anslag och för `svansvift` den mest brusiga. Rådatan (alla 4 versionerna) ligger i `produktion/ljud-original/effekter/<familj>/`. `smyg-4` (tassen på trägolv) blev tyst i alla 4 versionerna och togs bort, så gamla smyg-5 och -6 heter nu 4 och 5.

ElevenLabs Sound Effects, **prompt influence 0,55**, längden inställd för hand (inte auto). Gör 4 per rad och välj den gladaste. Inga riktiga ord, inga namn, aldrig skällande eller argt: en liten glad valp.

| Familj | Tagningar | Längd | När (data) |
|---|---|---|---|
| `vov-babbel` | 6 | 1,2 s | hej, varannan tittut och hej då (`ljud`) |
| `vov-fniss` | 6 | 0,8 s | före gömningen, i retningen och efter hoppet (`fniss`) |
| `vov-ja` | 4 | 0,7 s | när han nickar på frågorna (`ja`) |
| `smyg` | 7 | 0,25 s | varje steg (6–7 är tassar på trägolv) när han smyger på tå till gömstället (`smyg`) |
| `svansvift` | 4 | 0,8 s | strax efter varje tittut, när svansen viftar (`glad`) |

```
vov-babbel-1: Tiny cute cartoon puppy happily babbling hello with soft little "arf-arf!" yips, high sweet toddler-like voice, bright and friendly, no barking, no growl, no real words, close dry recording, no music, no background
vov-babbel-2: Tiny cute cartoon puppy excited greeting, a few soft squeaky "ruff-ruff" yips and a happy pant, sweet and playful, no loud bark, no real words, close dry recording, no music, no background
vov-babbel-3: Small cute cartoon puppy cheerful babble "woo-woo, arf!" rising in pitch, squeaky toddler-like voice, nonsense sounds only, close dry recording, no music, no background
vov-babbel-4: Small cute cartoon puppy shy gentle hello, a tiny "mm-arf" and a little happy huff, soft squeaky voice, close dry recording, no music, no background
vov-babbel-5: Small cute cartoon puppy waving goodbye with a soft happy "arf-arf" gently falling in pitch, sweet squeaky voice, no barking, close dry recording, no music, no background
vov-babbel-6: Small cute cartoon puppy happy goodbye, two soft yips ending in a tiny giggly pant, warm and sweet, close dry recording, no music, no background
vov-fniss-1: Tiny cute cartoon puppy giggling, quick happy little panting huffs "heh-heh-heh" with a tiny squeak, mischievous and sweet, close dry recording, no music, no background
vov-fniss-2: Tiny cute cartoon puppy muffled giggle while hiding, soft snorty little huffs, playful, close dry recording, no music, no background
vov-fniss-3: Small cute cartoon puppy cheeky giggle ending in one tiny squeaky yip, sweet toddler-like voice, close dry recording, no music, no background
vov-fniss-4: Small cute cartoon puppy happy excited panting giggle, light and fast, no barking, close dry recording, no music, no background
vov-fniss-5: Small cute cartoon puppy tiny suppressed snicker through the nose, playful and sneaky, close dry recording, no music, no background
vov-fniss-6: Small cute cartoon puppy short bubbly giggle "hee-hee" with a little wiggle in it, sweet squeaky voice, close dry recording, no music, no background
vov-ja-1: Tiny cute cartoon puppy happily answering yes with a short bright "mm-arf!" rising in pitch, high sweet voice, no real words, close dry recording, no music, no background
vov-ja-2: Tiny cute cartoon puppy eager short "yip-yip!" agreeing sound, squeaky and cheerful, close dry recording, no music, no background
vov-ja-3: Small cute cartoon puppy happy "uh-huh!" with a tiny pant at the end, soft squeaky voice, nonsense sounds only, close dry recording, no music, no background
vov-ja-4: Small cute cartoon puppy quick happy "arf!" yes sound, tiny and sweet, no loud bark, close dry recording, no music, no background
smyg-1: One single soft cartoon tiptoe step, a tiny light plucked pizzicato string note, sneaky and playful, very short, close dry recording, no music bed, no background
smyg-2: One single tiny cartoon sneaky tiptoe footstep, a soft high "tip" pluck, light and quiet, very short, close dry recording, no background
smyg-3: One single soft cartoon tiptoe step, a gentle low pizzicato pluck, sneaky, very short, close dry recording, no background
smyg-4: One small soft paw tiptoeing on a wooden floor, a single light tap, sneaky and gentle, very short, close dry recording, no background
smyg-5: One single cartoon sneaking step, a tiny muted xylophone tap, playful and quiet, very short, close dry recording, no background
smyg-6: One single soft cartoon tiptoe step, a light high pizzicato pluck slightly different in pitch, very short, close dry recording, no background
svansvift-1: Cartoon happy puppy tail wagging fast, quick soft swish-swish-swish whooshes, light and playful, close dry recording, no voice, no music, no background
svansvift-2: Fast little fluffy tail wag, soft rhythmic flutter swishes, cheerful cartoon sound, close dry recording, no voice, no music, no background
svansvift-3: Cartoon wagging tail, three quick soft whoosh flicks with a tiny sparkle at the end, playful, close dry recording, no voice, no music, no background
svansvift-4: Happy puppy tail thumping and swishing quickly, soft and fluffy, cartoon style, close dry recording, no voice, no music, no background
```

## Fler hundljud (2026-11-10)

Sanna: "add some dog sounds". Samma inställningar men längden på Auto; klippt till 1,3–1,4 s med uttoning. `nos-1` blev tyst i alla 4 versionerna, så `nos` har en tagning (ur `nos-2`). Den nya flåsningen heter `flamt-valp`, eftersom `flamt` redan är 004:s flämtning.

| Familj | Tagningar | Längd | När (data) |
|---|---|---|---|
| `nos` | 3 | 1,3 s | när han kommit fram till gömstället (`smyg`) |
| `flamt-valp` | 3 | 1,4 s | efter glädjehoppet (`glad`) |
| `vov-pip` | 3 | 0,15–0,5 s | vid varannan tittut, när babblet inte hörs (`glad`) |

**Påfyllning (Sanna 2026-11-10, kväll):** nya körningar av `nos-2`, `flamt-valp-2` och `vov-pip-1` gav `nos-2`, `nos-3` (två bitar ur samma 4 s-tagning, rådatan var tyst, −34 dB, och höjdes 25 dB), `flamt-valp-3` och `vov-pip-3`. Tassen på trägolv (gamla `smyg-4`) gjordes om med prompten nedan och gav en rad tassteg; två enstaka steg klipptes ut som `smyg-6` och `smyg-7`. Rådatan i `produktion/ljud-original/effekter/<familj>/` (`*-original-*b.mp3`, `smyg-original-tass-tra-a/b.mp3`).

```
smyg-6/7: Small cartoon puppy padding along a wooden floor, two clear soft paw-tap footsteps, tippy-tappy little claws, playful, clearly audible, close dry recording, no music, no background
```

```
nos-1 (tyst): Small cute cartoon puppy sniffing curiously, three quick soft sniffs through the nose, playful, close dry recording, no voice, no music, no background
nos-2: Small cute cartoon puppy sniffing the ground, quick soft sniff-sniff-sniff through a tiny nose, curious and sneaky, close dry recording, no music, no background
flamt-valp-1: Small cute cartoon puppy happily panting after a jump, light fast hah-hah-hah breaths, sweet and playful, no barking, close dry recording, no music, no background
flamt-valp-2: Small cute cartoon puppy excited little panting with a tiny happy squeak at the end, quick soft breaths, sweet, no barking, close dry recording, no music, no background
vov-pip-1: Small cute cartoon puppy, one single tiny happy woof, short high soft wuf, sweet and friendly, not loud, no growl, close dry recording, no music, no background
vov-pip-2: Small cute cartoon puppy, one single bright playful yip, short and squeaky, sweet toddler-like, not a loud bark, close dry recording, no music, no background
```
