# Djurens känsloljud – gemensam uppsättning

Varje djur svarar med samma åtta känslor, så att ett nytt avsnitt kan plocka ljud direkt i stället för att göra nya. Finns djurets eget ljud tar man det; saknas det tar man **kompisljudet** i sista raden, som passar alla små djur (ljud utan ord, inte bundna till ett djurläte).

Känslorna och numren följer `format/bilderbok.md` (`<djur>-gullig-N`: 1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar/frågande, 8 hej då). Namnen är filnamn utan `.m4a`; filen ligger i mappen med det längsta matchande namnet (`kanin-ny-hej-1` i `kanin-ny/`, `kanin-hej-1` i `kanin-gullig/`). Lyssna och sök i [ljudkartan](../../../verktyg/ljudkarta.html) (`python3 verktyg/ljudkarta.py` bygger om den).

| Djur | hej | hej då | hmm (nyfiken) | hehe (fniss) | oj / ooo | mums | glad (förtjust) | ledsen / trumpen |
|---|---|---|---|---|---|---|---|---|
| kaninen | `kanin-gullig-1`, `kanin-hej-1..4`, `kanin-ny-hej-1..4` | `kanin-gullig-8`, `kanin-hejda-1..4` | `kanin-gullig-7`, `kanin-ny-fragande-1..2` | `kanin-gullig-3`, `kanin-ny-fniss-1..4` | **saknas** | `kanin-ny-mmm-1..3` | `kanin-gullig-2`, `kanin-ny-fortjust-1..2`, `kanin-ny-jippi-1..2`, `kanin-tack` | `kanin-gullig-6`, `kanin-ny-trumpen-1..4` |
| lammet | `ba-gullig-1` | `ba-gullig-8` | `ba-gullig-5`, `ba-gullig-7` | `lamm-hihi` (015 säger: lamm fnissar inte, använd ett glatt `ba`) | `lamm-ooo` | **saknas** | `ba-gullig-2`, `lamm-jippi`, `lamm-aah` | `ba-gullig-6`, `lamm-grat` |
| björnen | `brum-gullig-1`, `brum-glad` | `brum-gullig-8` | `brum-gullig-5`, `brum-gullig-7` | `brum-gullig-3`, `brum-fniss`, `hoho` | **saknas** | **saknas** (`nom` är tuggande) | `brum-gullig-2` | `brum-gullig-6` |
| björnungen (Olle) | **saknas** | **saknas** | **saknas** | `olle-fniss-4` | `olle-oj-4` | **saknas** | `olle-glad-2` | `olle-ledsen-4` |
| zebran | `gnagg-mjuk-hej`, `gnagg-gullig-1` | `gnagg-mjuk-hejda`, `gnagg-gullig-8` | `gnagg-mjuk-nyfiken`, `gnagg-gullig-5` | `gnagg-mjuk-fniss`, `gnagg-fniss` | **saknas** | **saknas** | `gnagg-mjuk-fortjust`, `gnagg-gullig-2` | `gnagg-mjuk-trumpen`, `gnagg-nej` |
| leoparden | `spinn-gullig-1` | `spinn-gullig-8` | `spinn-gullig-5` | `spinn-gullig-3`, `spinn-fniss` | **saknas** | **saknas** | `spinn-gullig-2` | `spinn-gullig-6` |
| katten | `mjau-gullig-1`, `mjau-glad-3` | `mjau-gullig-8` | `mjau-gullig-5`, `mjau-fraga` | `mjau-gullig-3`, `mjau-glad-2`, `mjau-glad-4` | `mjau-oj`, `mjau-ooo` | **saknas** | `mjau-gullig-2`, `mjau-aah`, `mjau-trill` | `mjau-gullig-6` |
| musen | `mus-hej` | `mus-hejda` | `mus-nyfiken-3` | `mus-fniss-kort-1`, `mus-fniss` | **saknas** | **saknas** | `mus-fortjust-3` | `mus-trumpen` |
| grisen | `noff-gullig-1` | `noff-gullig-8` | `noff-gullig-5`, `noff-kolla` | `noff-fniss`, `noff-gullig-3` | `noff-ooo` | `noff-mums` | `noff-aah`, `noff-glad` | `noff-gullig-6` |
| hunden (valpen) | `vov-hej` | `vov-hejda` | `vov-gullig-5` | `vov-fniss` | **saknas** | **saknas** | `vov-pip`, `flamt-valp`, `vov-ja` | `vov-gullig-6` |
| ankan | `kvack` | **saknas** | **saknas** | `fniss-anka` | `ooh`, `oj-oj` (från ankpiloten) | `mmm` (från ankpiloten) | `kvack-glad` | `kvack-ledsen` |
| doktorn (046, 049) | `doktor-hej` | `doktor-hejda` | `doktor-hmm`, `doktor-mhm` | `doktor-fniss` | `doktor-ooo` | – | `doktor-bra` | **saknas** |
| **kompisljud (alla)** | `hej-babbel` | `hej-babbel` (mjukare tagning) | `doktor-hmm` | `olle-fniss-4` | `ooh`, `oj-oj`, `ohoh` (något går fel) | `mmm`, `nom` | `jippi` | `ledsen`, `snyft` |

Kompisljuden är förslag: lyssna i ljudkartan innan de används för ett nytt djur. `noff-gullig` är numrerad i nedladdningsordning (ungefär känsloordningen), så lyssna på 5–8 innan de används.

## Luckor och förslag till ElevenLabs-prompter

**Inget av detta är gjort.** ElevenLabs kostar krediter; Sanna säger till innan något görs. Samma inställningar som tidigare djurröster: Sound Effects, influence 0,55, ca 1 s, tystnaden bortklippt och topp −3 dBFS efteråt. Mappnamnen följer `<ljud>-<känsla>`.

| Lucka | Ny mapp | Prompt |
|---|---|---|
| kaninen oj | `kanin-oj` | Tiny cute cartoon baby bunny giving a short surprised little "oh!" squeak with a quick upward pitch, soft warm voice-like sound, curious not scared, no words, close dry recording, no music, no background |
| lammet mums | `ba-mums` | Tiny cute cartoon baby lamb happily munching and giving a soft contented "mmm-meh", sweet and warm, no words, close dry recording, no music, no background |
| björnen oj | `brum-oj` | Tiny cute cartoon baby bear giving a short surprised low "oh!" hum, warm and round, curious not scared, no words, close dry recording, no music, no background |
| björnen mums | `brum-mums` | Tiny cute cartoon baby bear happily munching honey, a soft deep contented "mmm-mm", warm and cozy, no words, close dry recording, no music, no background |
| Olle hej / hej då / hmm | `olle-hej`, `olle-hejda`, `olle-hmm` | Tiny cute cartoon bear cub saying a cheerful greeting sound shaped like "hey!" / a soft two-note goodbye sound, first note higher / a curious rising "hmm?", warm child-like voice, no real words, close dry recording, no music, no background |
| zebran oj | `gnagg-oj` | Tiny cute cartoon baby zebra foal giving a short surprised soft whinny "oh!", gentle and sweet, curious not scared, no words, close dry recording, no music, no background |
| zebran mums | `gnagg-mums` | Tiny cute cartoon baby zebra foal munching grass with a soft happy lip-flutter "mmm", sweet, no words, close dry recording, no music, no background |
| leoparden oj | `spinn-oj` | Tiny cute cartoon leopard cub giving a short surprised chirpy "mrrp?" with an upward pitch, soft, no growl, no words, close dry recording, no music, no background |
| leoparden mums | `spinn-mums` | Tiny cute cartoon leopard cub happily eating with a soft purring "mmm-mrr", cozy, no growl, no words, close dry recording, no music, no background |
| katten mums | `mjau-mums` | Tiny cute cartoon kitten happily eating with a soft purring "mmm-mew", cozy and sweet, no words, close dry recording, no music, no background |
| musen oj | `mus-oj` | Tiny cute cartoon baby mouse giving a short surprised "oh!" squeak with a quick upward pitch, soft warm voice-like sound like a tiny child's voice, not a bird, no whistle, no words, close dry recording, no music, no background |
| musen mums | `mus-mums` | Tiny cute cartoon baby mouse nibbling cheese with a happy little "mmm!" squeak, soft warm voice-like sound, not a bird, no whistle, no words, close dry recording, no music, no background |
| hunden oj | `vov-oj` | Tiny cute cartoon puppy giving a short surprised little "wuh?" yip with an upward pitch, curious not scared, no words, close dry recording, no music, no background |
| hunden mums | `vov-mums` | Tiny cute cartoon puppy happily eating with soft little snuffles and a contented "mmm" whine, sweet, no words, close dry recording, no music, no background |
| ankan hej då / hmm | `kvack-hejda`, `kvack-hmm` | Tiny cute cartoon duckling giving a soft two-note goodbye quack, first note higher / a curious rising little "hmm?" quack, sweet, no words, close dry recording, no music, no background |
| doktorn ledsen | `doktor-aww` | Kind cartoon animal doctor giving a soft sympathetic "awww", warm and gentle, no words, close dry recording, no music, no background |

Billigast först: `oj` och `mums` saknas för de flesta djuren, men kompisljuden `ooh`, `oj-oj`, `mmm` och `nom` täcker dem tills vidare.
