# 062 – ljudeffekter

**Inga nya ljud (Sanna 2026-11-27: *"använd befintliga ljud"*, *"det finns så många känsloljud"*).** Alla effekter i manuset finns redan i `assets/ljud/effekter/`. Grodans röst byggs av `kvak` 1–4 (grodans eget kväk) och befintliga känsloljud, mest musens familj från 034 (`mus-*`), se [`kanslor.md`](../../assets/ljud/effekter/kanslor.md).

Kandidater per känsla i `ljud/provlyssna-kvak.m4a` (allt på −3 dBFS, 1 s tystnad emellan). `kvak-dubbel` (kvak 1 + 3) och `kvak-prat` (kvak 3, 1, 2) är sparade som `assets/ljud/effekter/kvak-dubbel/kvak-dubbel-1.m4a` och `kvak-prat/kvak-prat-1.m4a`:

```
  0.0 s  kvak  kvak-1
  1.5 s  kvak  kvak-2
  2.9 s  kvak  kvak-3
  4.3 s  kvak  kvak-4
  5.8 s  1 hej  mus-hej-1
  7.9 s  1 hej  mus-hej-2
  9.9 s  1 hej  mus-hej-3
 11.9 s  2 förtjust  kvak-dubbel.wav
 13.8 s  2 förtjust  mus-fortjust-1
 15.6 s  2 förtjust  mus-fortjust-2
 17.3 s  2 förtjust  mus-fortjust-3
 19.1 s  2 förtjust  mus-fortjust-4
 20.8 s  3 fniss  olle-fniss-4
 22.6 s  3 fniss  mus-fniss-kort-1
 24.3 s  3 fniss  mus-fniss-kort-2
 26.0 s  3 fniss  gran-fniss-1
 28.3 s  4 mysig suck  mus-suck-1
 30.7 s  4 mysig suck  vov-suck-1
 33.0 s  5 nyfiken  mus-nyfiken-1
 34.5 s  5 nyfiken  mus-nyfiken-2
 35.9 s  5 nyfiken  mus-nyfiken-3
 37.4 s  5 nyfiken  mus-nyfiken-4
 38.8 s  6 varm (puh)  gran-suck-4
 41.0 s  6 varm (puh)  gran-suck-1
 42.9 s  6 trumpen  mus-trumpen-1
 45.0 s  7 pratar  kvak-prat.wav
 47.5 s  7 pratar  mus-pratar-1
 49.4 s  7 pratar  mus-pratar-2
 51.1 s  8 hej då  mus-hejda-1
 53.0 s  8 hej då  mus-hejda-2
 55.0 s  8 hej då  mus-hejda-3
 57.0 s  8 hej då  mus-hejda-4
 59.0 s  förvånad (oj)  oj-oj-1
 60.6 s  förvånad (oj)  gran-oj-2
```

**Sannas val (2026-11-27, *"Ta dina förslag"*):**

| Känsla | Ljud |
|---|---|
| hej | `kvak-4` |
| förtjust | `kvak-dubbel-1` |
| glatt svar | `kvak-1`, `kvak-3` (varvas) |
| fniss | `olle-fniss-4` |
| mysig suck | `mus-suck-1` |
| nyfiken, frågande | `kvak-2`, `kvak-prat-1` |
| varm (*"Puh!"*) | `gran-suck-4` |
| förvånad | `oj-oj-1` |
| hej då | `mus-hejda-1`, `mus-hejda-3` |

**Per uppslag** (grodans svar i pausen efter Malin):

| Rad | Ljud |
|---|---|
| 05 | `kvak-4` |
| 05b | `kvak-dubbel-1` |
| 07 | `gran-suck-4` |
| 07b | `kvak-2` |
| 09 | `kvak-dubbel-1` |
| 10 | `kvak-1` |
| 11b | `mus-suck-1` |
| 12 | `oj-oj-1` |
| 12b | `olle-fniss-4` |
| 14 | `kvak-dubbel-1` |
| 15b | `kvak-3` |
| 16 | `kvak-1` |
| 17 | `kvak-2` |
| 17b | `kvak-prat-1` |
| 19 | `kvak-dubbel-1` |
| 20 | `kvak-3` |
| 21 | `mus-suck-1` |
| 22 | `olle-fniss-4` |
| 23 | `kvak-dubbel-1` |
| 24 | `mus-hejda-1` |
| 25 | `mus-hejda-3` |

Inget ljud kommer två rader i följd. Fnisset kommer två gånger (12b, 22).

## Nya grodljud i ElevenLabs (2026-11-27, ännu ej valda)

Sanna ville ha bättre, gulligare grodljud, och alla ord på svenska: *"Hej!"* och *"Hej då!"*, och *"Kvak"* i stället för engelska *"ribbit"*. ElevenLabs Sound Effects v3, influence 55 %, 1,2 s (prat och hej då 1,5 s), 4 tagningar per prompt, 12 generationer (ca 200 krediter). De 3 bästa per känsla (whisper och nivå, inte lyssnade) ligger i `assets/ljud/effekter/groda-<känsla>/groda-<känsla>-1..3.m4a`, tystnaden bortklippt, topp −9 dBFS. Alla 4 tagningar per prompt ligger i `produktion/ljud-original/effekter/groda/<grupp>/1..4.mp3`.

**Provlyssna:** [`ljud/provlyssna-groda-ny.m4a`](ljud/provlyssna-groda-ny.m4a), alla 24 i känsloordning med 0,6 s emellan:

| Tid | Fil | Tagning (original) | Whisper hör |
|---|---|---|---|
| 0,0 | `groda-hej-1` | `hej-sv/1` | Hej! |
| 1,1 | `groda-hej-2` | `hej-sv/3` | Hej! |
| 2,4 | `groda-hej-3` | `hej-sv/4` | Hej! |
| 3,6 | `groda-fortjust-1` | `fortjust-kvak/1` | Kvak, kvak |
| 5,2 | `groda-fortjust-2` | `fortjust-kvak/2` | Kvak, kvak |
| 6,9 | `groda-fortjust-3` | `fortjust-kvak/4` | Kvak, kvak! |
| 8,4 | `groda-fniss-1` | `fniss/2` | Hehehe |
| 10,0 | `groda-fniss-2` | `fniss/3` | (ljud) |
| 11,4 | `groda-fniss-3` | `fniss/4` | (ljud) |
| 12,9 | `groda-mysig-suck-1` | `suck/1` | Räää |
| 14,2 | `groda-mysig-suck-2` | `suck/3` | Waaa |
| 15,6 | `groda-mysig-suck-3` | `suck/4` | Mmh! |
| 17,0 | `groda-nyfiken-1` | `nyfiken-kvak/1` | Kvak? |
| 18,2 | `groda-nyfiken-2` | `nyfiken-kvak/2` | Kvak? |
| 19,5 | `groda-nyfiken-3` | `nyfiken-kvak/3` | Kvak? |
| 20,8 | `groda-sur-1` | `sur/2` | Nåh, nåh |
| 22,1 | `groda-sur-2` | `sur/3` | Kvick, kvick |
| 23,6 | `groda-sur-3` | `sur/4` | Nåh-åh |
| 24,8 | `groda-prat-1` | `prat/1` | (ljud) |
| 26,1 | `groda-prat-2` | `prat/2` | (ljud) |
| 27,5 | `groda-prat-3` | `prat/3` | (ljud) |
| 29,3 | `groda-hejda-1` | `hejda-sv/1` | Hej då! |
| 30,9 | `groda-hejda-2` | `hejda-sv/3` | Hej då! |
| 32,4 | `groda-hejda-3` | `hejda-sv/4` | Hej då! |

"(ljud)" = whisper hittar på text (*"Tack så mycket"*), vilket den gör på ljud utan tal. Bortvalda: `fniss/1` (whisper hör *"Hej hej hej hej"*, kan låta som ord), `suck/2`, `sur/1` (låter glatt, *"wack-wack"*), `prat/4` (tyst), `nyfiken/1–4` och `fortjust/1–4` (sa engelska *"ribbit"*, gjorda om med *"Kvak"*). Två första tagningar utan ord för hej och hej då (*"ribbit"*) laddades inte ner.

**Prompterna:**

- hej (1,2 s): *Tiny cute cartoon baby frog saying the Swedish word "Hej!" in a bright, cheerful, croaky little frog voice, sweet high child-like voice, soft and round, friendly and warm, close dry recording, no music, no background*
- förtjust (1,2 s): *Tiny cute cartoon baby frog, delighted and excited, two quick happy bouncy croaks saying the Swedish frog sound "Kvak! Kvak!" rising in pitch, soft round and bubbly, sweet high child-like voice, close dry recording, no music, no background*
- fniss (1,2 s): *Tiny cute cartoon baby frog giggling, a quick string of soft bubbly little croaks that sound like a giggle, "ke-ke-ke", sweet high voice, playful and warm, no words, no human voice, close dry recording, no music, no background*
- mysig suck (1,2 s): *Tiny cute cartoon baby frog, a cozy contented sigh ending in a soft low sleepy croak, warm, relaxed and happy, gentle and round, no words, no human voice, close dry recording, no music, no background*
- nyfiken (1,2 s): *Tiny cute cartoon baby frog, a curious questioning little croak saying the Swedish frog sound "Kvak?" with a rising pitch at the end, soft and round, sweet high child-like voice, wondering not worried, close dry recording, no music, no background*
- sur (1,2 s): *Tiny cute cartoon baby frog, mildly grumpy, a short low pouty "hmph" croak, soft and round, still sweet and cute, not angry, not scary, no words, no human voice, close dry recording, no music, no background*
- prat (1,5 s): *Tiny cute cartoon baby frog chatting, a little string of four or five soft varied croaks going up and down like happy babble, sweet high voice, bubbly and friendly, no words, no human voice, close dry recording, no music, no background*
- hej då (1,5 s): *Tiny cute cartoon baby frog saying the Swedish words "Hej då!" in a soft, warm, croaky little frog voice, sweet high child-like voice, gentle and a little sleepy, close dry recording, no music, no background*

**Lärdom:** ett engelskt läte inom citattecken (*"ribbit"*) blir ett engelskt ord. Skriv det svenska lätet (*"Kvak"*) och "the Swedish frog sound".

### Claudes val bland de nya (Sanna 2026-11-27: *"Take your picks"*, inte lyssnat)

Valda på whisper, längd och nivå, inte på gehör. Byt fritt om något låter fel i provlyssningen.

| Känsla | Huvudval | Varvas med |
|---|---|---|
| hej | `groda-hej-2` (längst, 0,7 s) | – |
| förtjust | `groda-fortjust-1` | `-2`, `-3` |
| fniss | `groda-fniss-1` (whisper hör "hehehe") | `-2` |
| mysig suck | `groda-mysig-suck-3` ("mmh") | `-2` |
| nyfiken | `groda-nyfiken-1` | `-2` |
| sur | `groda-sur-1` ("nåh, nåh") | – (ingen rad använder sur i dag) |
| prat | `groda-prat-3` (längst babbel, 1,2 s) | `-1`, `-2` som korta glada svar |
| hej då | `groda-hejda-1` | `-2` |

**Förslag per uppslag** (ersätter tabellen ovan; huvudsessionen byter in i `rader.mjs`/`rader.json`/`boken.js`):

| Rad | Förut | Nytt |
|---|---|---|
| 05 | `kvak-4` | `groda-hej-2` |
| 05b | `kvak-dubbel-1` | `groda-fortjust-1` |
| 07 | `gran-suck-4` | `groda-mysig-suck-2` (*"Puh!"*) |
| 07b | `kvak-2` | `groda-nyfiken-1` |
| 09 | `kvak-dubbel-1` | `groda-fortjust-2` |
| 10 | `kvak-1` | `groda-prat-1` |
| 11b | `mus-suck-1` | `groda-mysig-suck-3` |
| 12 | `oj-oj-1` | `oj-oj-1` (oförändrat, inget grod-oj) |
| 12b | `olle-fniss-4` | `groda-fniss-1` |
| 14 | `kvak-dubbel-1` | `groda-fortjust-1` |
| 15b | `kvak-3` | `groda-prat-2` |
| 16 | `kvak-1` | `groda-prat-1` |
| 17 | `kvak-2` | `groda-nyfiken-2` |
| 17b | `kvak-prat-1` | `groda-prat-3` |
| 19 | `kvak-dubbel-1` | `groda-fortjust-3` |
| 20 | `kvak-3` | `groda-prat-2` |
| 21 | `mus-suck-1` | `groda-mysig-suck-3` |
| 22 | `olle-fniss-4` | `groda-fniss-2` |
| 23 | `kvak-dubbel-1` | `groda-fortjust-2` |
| 24 | `mus-hejda-1` | `groda-hejda-1` |
| 25 | `mus-hejda-3` | `groda-hejda-2` |

Inget ljud kommer två rader i följd. De nya filerna toppar på −9 dBFS (de gamla på −3), så volymen i scenen kan behöva höjas ca 6 dB jämfört med förut.
