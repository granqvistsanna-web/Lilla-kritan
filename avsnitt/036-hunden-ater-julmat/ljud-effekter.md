# 036 – ljud

## Malin (grind 3)

Två tagningar 2026-11-14 (ElevenLabs, Malin, Eleven v3, stability 0,5), båda 1:55, i `produktion/ljud-original/roster/hunden-ater-julmat/malin-tagning-1a.mp3` och `-1b.mp3`. Delade med `verktyg/dela-tagning.py` till `delad-a/` och `delad-b/` där.

**Vald: tagning b för alla 37.** I tagning a hamnade gränserna fel vid *"En pepparkaka!"* / *"Och ett glas mjölk!"* (15–16) och *"Oj! Oj, oj, oj!"* / *"Plask!"* (26–27); i b blev alla rader rätt. Normaliserade till −3 dBFS i `assets/ljud/roster/hunden-ater-julmat/`, längderna i `rost-langder.txt`. Provlyssna: [`ljud/provlyssna-malin.m4a`](ljud/provlyssna-malin.m4a) (alla 37 i rad, 1:29).

Lyssna särskilt på:
- **13** *"Sniff, sniff!"*: whisper hör bara *"Mmm, vad gott det luktar!"* (i båda tagningarna). Början (0,36 s) kan vara ett nosljud i stället för orden.
- **32** *"Ha ha!"*: skrattet finns med (whisper hör *"Haha, en mjöl…"*).

(`dela-tagning.py` fick en rättning: när whisper tappar ett ord, som *"Tack!"* direkt efter *"tack?"*, läggs gränsen i den längsta pausen mellan grannarna i stället för att två repliker får samma gräns.)

## Hundens röst (grind 4)

Familjen **`vov-gullig`** med receptets nummer per känsla (`format/bilderbok.md`, "En röst per figur"). Hej, förtjust, fniss, pratar och hej då finns redan (`vov-hej`, `vov-ja`, `vov-fniss`, `vov-babbel`, `vov-hejda`), så bara 4–6 gjordes. ElevenLabs Sound Effects v3, prompt influence 55 %, längden för hand, 4 tagningar per rad (6 t2 kom aldrig ner). Ca 52 krediter.

| Nr | Känsla | Längd | Rader i 036 | Prompt |
|---|---|---|---|---|
| 4 | mysig suck | 2,0 s | 22 (mätt) | Tiny cute cartoon puppy making a cosy contented sigh, a soft happy "mmm-hnn" breath out ending in a tiny sleepy whimper, warm and full, sweet baby voice, close dry recording, no music, no background |
| 5 | nyfiken, frågande | 1,0 s | 6, 17 (vet inte var) | Tiny cute cartoon puppy making a curious questioning little "wuff?" whine, short and rising at the end like a question, head-tilt sound, sweet baby voice, close dry recording, no music, no background |
| 6 | ledsen, trumpen | 1,0 s | 4 (tomt bord), 19b (mjölken skvätte) | Tiny cute cartoon puppy making a small sad little whimper, a soft falling "aww-wuu" sigh, a bit disappointed but sweet, not crying, not hurt, sweet baby voice, close dry recording, no music, no background |

Rådata: `produktion/ljud-original/effekter/vov-gullig/vov-gullig-N-tK.wav`. Där ligger också äldre `vov-gullig-4_tagning1–4.opus` och `vov-gullig-8_tagning1–4.opus` från en tidigare omgång, inte genomlyssnade här.

Provlyssna: [`ljud/provlyssna-vov.m4a`](ljud/provlyssna-vov.m4a), trimmade och normaliserade (−3 dBFS), tiderna i [`ljud/provlyssna-vov.txt`](ljud/provlyssna-vov.txt). Sanna: *"you pick"*. Claude valde efter tonhöjd, tonhöjdens riktning och brus (mätt, inte lyssnat), och de ligger i `assets/ljud/effekter/vov-gullig/vov-gullig-N.m4a`.

**Claudes val (2026-11-14):**
- **4 mysig suck: tagning 4.** Längst (1,3 s ljud), sjunker mjukt (800 → 590 Hz) och har minst brus (−80 dB). Tagning 2 är lika lugn men låter lägre och mindre valpig; 1 brusar mer och 3 är bara 0,6 s.
- **5 nyfiken: tagning 2.** Den enda som både stiger tydligt som en fråga (340 → 640 Hz) och är ren (−78 dB). Tagning 1 stiger lika mycket men brusar (−52 dB).
- **6 ledsen: tagning 4.** Sjunker mest (800 → 615 Hz). Tagning 1 stiger i stället och brusar kraftigt (−27 dB); 3 är nästan platt.

## Effekter

Nya, från Openverse (CC0, ingen kreditrad behövs): `knaster` 1–2 (pepparkakan), `slick-1` (tungan), `kurr-1` (magen). Se `assets/ljud/effekter/README.md`. Mjölken som skvätter: `vick`, `glas-klirr`, `plask` (lågt) och `skrubb` för handduken, alla fanns.
