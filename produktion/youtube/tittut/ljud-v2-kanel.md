# Ljud för v2-Kanel i Tittut

Steg, hopp, landning och babbel för kaninen i art direction v2 (`skogen-gron/kaninen-kanel/`). Gjort 2026-11-07. Filerna ligger i `assets/ljud/effekter/<namn>/<namn>-N.m4a`, numrerade utan luckor, och motorn tar tagningarna i tur och ordning.

## Vilka familjer

| Händelse | Familj | Tagningar | Längd | Vol (fniss = 1,0) | Läggs |
|---|---|---|---|---|---|
| tassteg när kaninen skuttar och går | `tass` | 6 | 0,18 s | **0,2** (0,15–0,3) | på varje fot i marken |
| sats, när fötterna lämnar marken | `hopp-mjuk` | 6 | 0,08–0,1 s | **0,25** | 0,05 s före lyftet, ljudet slutar i själva lyftet |
| landning | `landa-mjuk` | 8 | 0,26 s | **0,35** (0,3–0,45) | 0,02 s före fötterna når marken |
| hej och hej då | `hej-babbel` | 6 (saknas än) | 0,8–1,5 s | **1,0–1,2** | där kaninen säger hej och vinkar hej då |

Volymerna är räknade mot `fniss` 4–8 (topp-RMS ca −21 dB på 50 ms). De nya tagningarna har toppen på −6 dBFS och topp-RMS −19 till −25 dB, så med volymerna ovan ligger tass ca 12 dB under fnisset, sats ca 11 dB och landningen ca 9 dB under. Tassen ska höras som små steg under skogsljudet, inte som slag.

`hopp-mjuk` är byggd, inte inspelad: ett kuddslag baklänges och lite högre i tonen, ett kort mjukt "fwupp". **Lyssna på den först.** Låter den fel går `hupp` (en röst) på 0,25 eller ingen sats alls.

## De gamla familjerna, uppmätta

| Familj | Längd | Nivå | Passar en liten kanin i gräs? |
|---|---|---|---|
| `steg` | 0,43–0,51 s | topp −30 till −41 dBFS, RMS −48 till −59 dB | **Nej, för tyst.** 30 dB under resten; på vol 0,3 (som i `tittut.js` nu) hörs de knappt alls. Mörka och dova (tyngdpunkt runt 1,2 kHz), mer sko än tass. Byt mot `tass`. |
| `hupp` | 0,32–0,36 s | topp −4 till −6, RMS −15 dB | En röst ("hupp") från ankan i Lilla Kvack, högst av alla. Går på 0,25–0,3 men låter som en annan figur bredvid babblet. Byt mot `hopp-mjuk`. |
| `duns` | 1,0 s | topp −4,6 till −17, RMS −18 till −28 dB | **För hård och för lång** för en liten kanin, och ojämn: 2 och 3 är 8 dB svagare än 1 och 4. Byt mot `landa-mjuk`. |
| `studs` | 0,45 s | topp −9 till −13, RMS −26 dB, jämn | Mjuk och jämn men låter som en boll. Går som landning för en lekfull studs, inte för tassar. |
| `boing` | 2,0 s | topp −1,5 till −9, RMS −17 till −20 dB | För lång och för stark för varje hopp. Bara för ett stort, roligt hopp ("En gång till!"), på 0,3–0,5. |

## ElevenLabs: babblet

Sound Effects, **duration 1,2 s** (ställ in själv, inte auto), **prompt influence 0,6**, gör 4 och välj den gladaste. Inga riktiga ord, inga namn. Klipp bort tystnaden före och efter, exportera m4a och lägg filerna i:

`assets/ljud/effekter/hej-babbel/hej-babbel-1.m4a` … `hej-babbel-6.m4a`

Normalisera som `fniss` 4–8 (topp ca −9 dBFS), så stämmer volymen 1,0–1,2. Tagning 1–4 är hej, 5–6 är hej då. Motorn tar tagningarna i tur och ordning, så ska hej då alltid få ett hej då-babbel behöver 5–6 bli en egen familj (`hejda-babbel`) när `tittut.js` får plats för det.

```
hej-babbel-1: Tiny cute cartoon bunny happily babbling hello in nonsense syllables "he-he, ho-ho!", high squeaky toddler-like voice, bright and friendly, no real words, close dry recording, no music, no background
hej-babbel-2: Tiny cute cartoon bunny giggling and babbling "hee-hee, ba-ba!", soft squeaky toddler-like voice, playful and sweet, no real words, close dry recording, no music, no background
hej-babbel-3: Small cute cartoon bunny excited cheerful greeting babble "ho-ho, ba-ba!" rising in pitch, sweet squeaky voice, nonsense syllables only, no real words, close dry recording, no music
hej-babbel-4: Small cute cartoon bunny shy and gentle greeting babble "mm, he-he!", tiny soft squeaky voice, sweet and happy, nonsense syllables only, close dry recording, no music
hej-babbel-5: Small cute cartoon bunny waving goodbye with a soft happy babble "ba-ba, bo-bo!" gently falling in pitch, sweet squeaky toddler-like voice, no real words, close dry recording, no music
hej-babbel-6: Small cute cartoon bunny happy goodbye babble "bah-bah, he-he" ending in a tiny giggle, warm and sweet, tiny squeaky voice, no real words, close dry recording, no music
```

I `tittut.js` är babblet figurens eget ljud: `ljud: 'hej-babbel'` i filmens `tittut({...})` gör att det spelas vid hej, varannan tittut och vid hej då (vol 1,4 där; sänk till ca 1,1 om det tar över berättaren).

## Källor och licenser

Allt nytt är CC0, inget behöver stå i YouTube-texten. Hittat på Openverse 2026-11-07.

| Familj | Källa | Upphovsperson | Licens |
|---|---|---|---|
| `tass` 1–6 | [6 footsteps grass](https://freesound.org/people/whothefuckisjojo/sounds/673305) | whothefuckisjojo | CC0 |
| `landa-mjuk` 1–7, `hopp-mjuk` 1–6 | [Cushion Impacts.wav](https://freesound.org/people/mincedbeats/sounds/593948) | mincedbeats | CC0 |
| `landa-mjuk` 8 | [Medium Pillow Hit.wav](https://freesound.org/people/saturdaysoundguy/sounds/388031) | saturdaysoundguy | CC0 |

Bearbetning (ffmpeg): `tass` ett steg i taget, 1,15 gånger högre i tonen (mindre fot), highpass 150 Hz, lowpass 6 kHz. `landa-mjuk` highpass 60 Hz, lowpass 3,2 kHz. `hopp-mjuk` lowpass 5 kHz, komprimerad så att svansen hörs, baklänges, 1,25 gånger högre. Alla: 4 ms intoning, 12–60 ms uttoning, toppen på −6 dBFS, AAC 160 kbit/s.

Annat som provades och valdes bort: [Grassy Footstep](https://freesound.org/people/OwlStorm/sounds/151230) (OwlStorm, CC0) och [Walking on dry moss](https://freesound.org/people/soundskeep/sounds/419552) (soundskeep, CC0) är vuxna steg med mycket brus; [Footstep Grass Leaf](https://freesound.org/people/EminYILDIRIM/sounds/535467) (CC0) för svag.

## ElevenLabs: ja-babbel

Kaninen svarar "ja!" när den nickar på berättarens frågor ("Ska vi leka tittut?", "Var ska du gömma dig?"). Sound Effects, **duration 0,8 s**, **prompt influence 0,6**. Filerna i `assets/ljud/effekter/ja-babbel/ja-babbel-1.m4a` … `-4.m4a`, normaliserade som hej-babbel (topp ca −9 dBFS). Filmen tar dem med `ja: 'ja-babbel'`.

```
ja-babbel-1: Tiny cute cartoon bunny happily answering yes with a short bright "mm-hm!" rising in pitch, high squeaky toddler-like voice, no real words, close dry recording, no music, no background
ja-babbel-2: Tiny cute cartoon bunny excited short "ja-ja!" nonsense yes sound, squeaky sweet toddler-like voice, bouncy and cheerful, close dry recording, no music, no background
ja-babbel-3: Small cute cartoon bunny eager little "uh-huh!" with a tiny giggle at the end, soft squeaky voice, nonsense syllables only, close dry recording, no music
ja-babbel-4: Small cute cartoon bunny quick happy "yip-yip!" agreeing sound, tiny squeaky voice, playful and sweet, no real words, close dry recording, no music
```
