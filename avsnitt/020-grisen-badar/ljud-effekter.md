# Ljudeffekter för 020 Grisen badar (ElevenLabs)

De fyra ljud som saknas på Openverse. Samma regler som [`produktion/youtube/tittut/ljud-hugo.md`](../../produktion/youtube/tittut/ljud-hugo.md): filerna i `assets/ljud/effekter/<namn>/<namn>-N.m4a`, numrerade utan luckor, tystnaden bortklippt, m4a, rådatan i `produktion/ljud-original/effekter/<familj>/`.

ElevenLabs Sound Effects, **prompt influence 0,55**, längden inställd för hand (inte auto). Gör 4 per rad och välj den mjukaste. Inget läskigt, inga skarpa toppar.

Finns redan och återanvänds: `plask` (8 hoppar i, 12 grisen sjunker), `plopp` (18 bubblan spricker), `skrrrrt`/`krita-ritar` (5 kritan ritar ankan). `pip` är ett kycklingpip, inte en badanka, så ankan får en egen familj.

| Familj | Tagningar | Längd | När (uppslag) |
|---|---|---|---|
| `badanka-pip` | 4 | 0,4 s | ankans svar: 5 (ankan är ritad), 10 (nöff–pip–nöff–pip), 12 (ankan landar), 19 (hej då) |
| `skrubb` | 3 | 1,2 s | "Skrubba, skrubba …" i 14, 15 och 17, under skumtussen |
| `bubbel` | 2 | 1,5 s | "Fff …" i 18, innan `plopp`; mjukt också när grisen sjunker i 12 |
| `kran` | 1 | 3 s | kranen rinner i början av 8, stängs av när grisen hoppar i (klipp av, tona ut 0,2 s) |

```
badanka-pip-1: A single soft squeeze of a small yellow rubber bath duck, short cute squeaky "pip", gentle and friendly, close dry recording, no water, no music, no background
badanka-pip-2: Two quick soft squeaks of a small rubber bath duck, "pip-pip", sweet and playful, close dry recording, no water, no music, no background
badanka-pip-3: One gentle rubber duck squeak rising slightly in pitch like a happy question, soft and cute, close dry recording, no music, no background
badanka-pip-4: Soft rubber bath duck squeak slowly falling in pitch, a tiny goodbye, gentle, close dry recording, no music, no background
skrubb-1: Gentle soft sponge scrubbing with foamy soap bubbles, quick little back-and-forth rubs, light and cosy bathtime sound, close recording, no voice, no music
skrubb-2: Soft soapy washcloth rubbing on skin, playful quick scrub-scrub rhythm with a light foamy fizz, gentle, close recording, no voice, no music
skrubb-3: Tiny foamy bubble-bath scrub, soft squishy soap foam being rubbed, light and bubbly, close recording, no voice, no music
bubbel-1: Someone gently blowing bubbles through bathwater with a straw-like soft "blub-blub-blub", small cute bubbles, calm and playful, close recording, no voice, no music
bubbel-2: Soft gentle underwater bubbles rising to the surface of a bathtub, small and cute, calm, close recording, no voice, no music
kran-1: A bathtub tap running warm water into a half-full bath, soft steady gentle stream, cosy and calm, no splashing, close recording, no voice, no music
```

## Söta grisljud (Sanna 2026-11-10: "such as cute pig")

De riktiga grisljuden (JarredGibb) är vuxna grisar, och tonhöjdshöjda (`noff-sot`) blir inte riktigt gulliga. En egen familj med en liten tecknad kultinggris: `noff-gullig`. Gör 4 per rad, välj de gulligaste, normalisera som `noff-glad`. Inga ord, inget skrik, inget argt.

| Familj | Tagningar | Längd | När (uppslag) |
|---|---|---|---|
| `noff-gullig` | 8 | 0,5–1,5 s | 1 hej, 2 belåten, 6–7 ser ankan och tack, 9 och 11 nöjd, 10 pratar med ankan, 12 fniss, 18 bubblan, 19 hej då |

```
noff-gullig-1: Tiny cute cartoon piglet saying a happy little hello oink, a short bright "oink!" rising in pitch, sweet squeaky baby voice, close dry recording, no music, no background
noff-gullig-2: Tiny cute cartoon piglet very excited and delighted, two quick happy squeaky oinks and a tiny squeal of joy, sweet and gentle, not loud, close dry recording, no music, no background
noff-gullig-3: Tiny cute cartoon piglet giggling, soft snorty little "hnk-hnk-hnk" giggle through its snout, playful and sweet, close dry recording, no music, no background
noff-gullig-4: Tiny cute cartoon piglet content and cosy in a warm bath, a soft long happy "mmm-oink" sigh, relaxed and sweet, close dry recording, no music, no background
noff-gullig-5: Tiny cute cartoon piglet curious, two small sniffy snorts and a tiny questioning oink rising at the end, sweet, close dry recording, no music, no background
noff-gullig-6: Tiny cute cartoon piglet grumpy but cute, a short low pouty "hmph" snort through the snout, sweet not scary, close dry recording, no music, no background
noff-gullig-7: Tiny cute cartoon piglet chatting happily, three short squeaky oinks in a sing-song rhythm like talking, sweet baby voice, close dry recording, no music, no background
noff-gullig-8: Tiny cute cartoon piglet saying goodbye, a soft sweet "oink-oink" gently falling in pitch, warm and happy, close dry recording, no music, no background
```

## Fnissgris (Sanna 2026-11-11: "hee hee hoo hoo dodo")

En lekfull, sjungande fnissfamilj: `noff-fniss`. Ersätter `noff-gullig-3` där grisen fnissar och leker. Gör 4 per rad, 1,5–2 s, prompt influence 0,55.

```
noff-fniss-1: Tiny cute cartoon piglet giggling in a playful sing-song, "hee-hee, hoo-hoo" with a little snorty snout giggle, sweet baby voice, happy and silly, close dry recording, no words, no music, no background
noff-fniss-2: Tiny cute cartoon piglet happily babbling "doo-doo, hee-hee" like a silly little tune through its snout, bouncy and sweet, close dry recording, no words, no music, no background
noff-fniss-3: Tiny cute cartoon piglet splashing joy, a bright "hee-hee-hee" giggle ending in a soft happy "hoo!", sweet and gentle, not loud, close dry recording, no words, no music, no background
```
