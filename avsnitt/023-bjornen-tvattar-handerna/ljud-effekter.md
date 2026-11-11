# Ljudeffekter – 023 Björnen tvättar händerna

Ljuden i kodscenen `scener/badet` (listan byggs av `ljud()` i `scener/badet/index.html` ur `storyboard/rader.mjs`).

## Björnens röst: `brum-gullig`

`assets/ljud/effekter/brum-gullig/` (ElevenLabs, 2026-11-11), receptets numrering: 1 hej, 2 förtjust, 3 fniss, 4 mysig suck,
5 nyfiken, 6 trumpen, 7 frågande, 8 hej då. Två tagningar per känsla (N och Nb) växlar. Vol 2,0, högst 1,8 s med uttoning,
och varje brum slutar minst 0,15 s före Malins nästa replik (`ljud()` i `scener/badet/index.html`).

Var de ligger (scentid; filmtid = scentid + introts längd, 3,31 s):

| Rad | Scentid (s) | Känsla | Fil |
|---|---|---|---|
| 1 | 21.4 | hej | `brum-gullig-1` |
| 2 | 26.8 | förtjust | `brum-gullig-2` |
| 3 | 32.2 | fniss | `brum-gullig-3` |
| 4 | 36.7 | trumpen | `brum-gullig-6` |
| 5 | 45.2 | trumpen | `brum-gullig-6b` |
| 7 | 63.7 | nyfiken | `brum-gullig-5` |
| 7 | 68.4 | förtjust | `brum-gullig-2b` |
| 8b | 77.5 | fniss | `brum-gullig-3b` |
| 9 | 83.6 | fniss | `brum-gullig-3` |
| 10 | 88.2 | förtjust | `brum-gullig-2` |
| 12 | 103.2 | fniss | `brum-gullig-3b` |
| 13 | 110.0 | nyfiken | `brum-gullig-5b` |
| 15 | 125.0 | förtjust | `brum-gullig-2b` |
| 16 | 130.4 | fniss | `brum-gullig-3` |
| 17 | 136.7 | fniss | `brum-gullig-3b` |
| 18b | 149.1 | fniss | `brum-gullig-3` |
| 19 | 155.4 | mysig suck | `brum-gullig-4` |
| 20 | 161.2 | hej då | `brum-gullig-8` |
| 21 | 166.4 | fniss | `brum-gullig-3b` |

## Övriga ljud (finns)

- Malins repliker: `assets/ljud/roster/bjornen-tvattar-handerna/` (28 filer, vol 2,5).
- Ritintrot: `krita-ritar-1` i 7 s från 2,5 s, `skogsljud-1` under.
- Rad 1: ett `tass`-steg per honungsavtryck (i stället för `smasteg`).
- Rad 4–13: `kran-1` i loop, tyst under Malin, slutar när tassarna är rena.
- Rad 6a: `krita-ritar-2` medan kritan ritar tvålen (i stället för `skrrrrt-kort`). 6b: `glitter-1`.
- Rad 8a: två mjuka `tass` när björnen landar på pallens steg.
- Rad 8b, 9: `plopp-1` när tvålen landar. Rad 11, 12, 16: `skrubb`, `tindra` exakt på "ren!".
- Rad 17: `krita-ritar-1` medan kritan ritar bubblorna, `pop` × 3 när de spricker.
- Rad 19: `prassel-tyg` när handduken lyfts, gnider och hängs tillbaka.
- Rad 18b: tre enstaka `tass-klapp` på Malins tre "klapp" (0,40 / 0,77 / 1,14 s in i raden), i stället för `tass-klapp-tre`
  (dess klapp ligger bara 0,28 s isär och hinner inte med Malin).
- Hela badrummet: `badrumsljud-2` under, vol 0,5 (−6 dB, Sanna 2026-11-11).
- Introt: det gemensamma bilderbok-introt (`produktion/youtube/bilderbok-intro`): Tittuts jingel, popp, glitter och "Bilderbok!".
