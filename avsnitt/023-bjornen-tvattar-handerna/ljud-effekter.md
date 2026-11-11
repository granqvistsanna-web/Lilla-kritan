# Ljudeffekter – 023 Björnen tvättar händerna

Ljuden i kodscenen `scener/badet` (listan byggs av `ljud()` i `scener/badet/index.html` ur `storyboard/rader.mjs`).

## Björnens röst: `brum-gullig`

`assets/ljud/effekter/brum-gullig/` (ElevenLabs, 2026-11-11), receptets numrering: 1 hej, 2 förtjust, 3 fniss, 4 mysig suck,
5 nyfiken, 6 trumpen, 7 frågande, 8 hej då. Två tagningar per känsla (N och Nb) växlar. Varje tagning jämnas till −13,7 LUFS i mixen, 3,5 dB under Malin (QA 2026-11-11), högst 1,8 s med uttoning, fniss bara på rad 3, 9, 12 och 18b,
och varje brum slutar minst 0,15 s före Malins nästa replik (`ljud()` i `scener/badet/index.html`).

Var de ligger (scentid; filmtid = scentid + introts längd, 3,31 s):

| Rad | Scentid (s) | Känsla | Fil |
|---|---|---|---|
| 1 | 22.3 | hej | `brum-gullig-1c` (1 och 1b lät som "hello") |
| 2 | 27.7 | förtjust | `brum-gullig-2` |
| 3 | 33.6 | fniss | `brum-gullig-3` |
| 4 | 38.1 | trumpen | `brum-gullig-6` |
| 5 | 47.1 | trumpen | `brum-gullig-6b` |
| 7 | 65.3 | nyfiken | `brum-gullig-5` |
| 7 | 68.3 | förtjust | `brum-gullig-2b` |
| 8b | 77.0 | frågande | `brum-gullig-7` |
| 9 | 83.2 | fniss | `brum-gullig-3b` |
| 10 | 87.8 | förtjust | `brum-gullig-2` |
| 12 | 103.6 | fniss | `brum-gullig-3` |
| 13 | 110.5 | nyfiken | `brum-gullig-5b` |
| 15 | 124.8 | förtjust | `brum-gullig-2b` |
| 16 | 130.5 | mysig suck | `brum-gullig-4` |
| 17 | 136.8 | förtjust | `brum-gullig-2` |
| 18b | 149.2 | fniss | `brum-gullig-3b` |
| 19 | 155.6 | mysig suck | `brum-gullig-4b` |
| 20 | 161.8 | hej då | `brum-gullig-8` |
| 21 | 167.0 | förtjust | `brum-gullig-2b` |

## Övriga ljud (finns)

- Malins repliker: `assets/ljud/roster/bjornen-tvattar-handerna/` (28 filer, vol 2,5).
- Ritintrot: `krita-ritar-1` i 7 s från 2,5 s, `skogsljud-1` under.
- Rad 1: ett `tass`-steg per honungsavtryck (i stället för `smasteg`).
- Rad 11–12: `kran-1` bara medan tassarna tvättas (sätts på i början av rad 11, stängs i slutet av rad 12, sedan tre droppar).
- Rad 6a: `krita-ritar-2` medan kritan ritar tvålen (i stället för `skrrrrt-kort`). 6b: `glitter-1`.
- Rad 8a: två mjuka `tass` när björnen landar på pallens steg.
- Rad 8b, 9: `plopp-1` när tvålen landar. Rad 11, 12, 16: `skrubb`, `glimt` exakt på "ren!".
- Rad 17: `krita-ritar-1` medan kritan ritar bubblorna, `pop` × 3 när de spricker.
- Rad 19: `prassel-tyg` när handduken lyfts, gnider och hängs tillbaka.
- Rad 18b: tre enstaka `tass-klapp` på Malins tre "klapp" (0,40 / 0,77 / 1,14 s in i raden), i stället för `tass-klapp-tre`
  (dess klapp ligger bara 0,28 s isär och hinner inte med Malin).
- Hela badrummet: `badrumsljud-2` under, vol 0,5 (−6 dB, Sanna 2026-11-11).
- Introt: det gemensamma bilderbok-introt (`produktion/youtube/bilderbok-intro`): Tittuts jingel, popp, glitter och "Bilderbok!".
