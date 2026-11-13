# 035 Katten hittar julklappar – storyboard (plan)

Planerad storyboard i text, **innan** röst och bilder finns. Tiderna är uppskattade (scentid, 0 = kritan börjar rita) och räknas om i `storyboard/rader.mjs` när Malins repliker är inspelade och uppmätta (grind 3). Därtill kommer `GLES` (+0,7 s per rad med replik, ca +21 s) och introt (ca 3,3 s). **Väntad längd: ca 3:55–4:05**, inom receptets 3:45–4:15.

Plattan: **Snögården**, ny (`assets/bakgrunder/snogarden/`, görs i Flow, se [behov.md](behov.md)). Stugan med dörr, trappa och tänt fönster till vänster, granen till höger, mitten tom. Fötterna på ca 80 % av höjden. Katten är en stor figur (`SKALA 0,5`).

## Kamerautsnitt

`[zoom, cx, cy]` i 1920 × 1080. Hårda klipp vid radbytet, ingen zoom inne i scenen utom ritintrots zoom in i teckningen.

| Utsnitt | Ungefär | Används till |
|---|---|---|
| `K_HEL` | 1,0, mitten | kommer in, paketen i snön, pulkan, kritirisen |
| `K_HALV` | 1,6 på katten | snön, fryser, tack, frågorna, god jul, hej då |
| `K_NARA` | 2,4 på kattens huvud | vill gå in, mysigt, snö på nosen |
| `K_SPAR` | 2,6 på tassavtrycken | *"tassar i snön"* |
| `K_LUVA` | 2,4 på snön bredvid katten | kritan ritar luvan |
| `K_VANSTER` / `K_HOGER` | 2,2 vid trappan / under granen | hörnen och grävningen |
| `K_ROSETT` | 3,0 bakom katten, rosetten och svansen | gisspausen |
| `K_PULKA` | 2,0 på snön framför katten | kritan ritar pulkan |

## Uppslagen

| # | Start (s) | Längd (s) | Utsnitt | Bild | Malin | Ljud |
|---|---|---|---|---|---|---|
| 01 | 0 | 16 | papper → zoom in | kritan ritar katten, väntar, fylls i | 01, 02, 03 | `krita-ritar`, matta |
| 1 | 16 | 8 | `K_HEL` | trippar in, tassavtryck, vinkar | 04 | snösteg, hej-mjau |
| 2 | 24 | 5 | `K_HALV` | tittar upp på snön, litet skutt | 05 | förtjust mjau |
| 3 | 29 | 5,5 | `K_SPAR` → `K_HALV` | tassavtrycken, sedan katten | 06 | nyfiket mjau |
| 4 | 34 | 5 | `K_HALV` | darrar | 07 | `brr` / `huttra` |
| 5 | 40 | 5 | `K_HEL` | skakar på huvudet | 08 | trumpet mjau |
| 6 | 44 | 8 | `K_NARA` | `rikt −1` mot dörren, ett steg dit | 09, 10 | trumpet mjau |
| 7 | 52 | 15 | `K_LUVA` | kritan ritar tomteluvan, gisspaus, fylls i | 11, 12 | `krita-ritar`, `glitter` |
| 8 | 68 | 3 | `K_HALV` | luvan glider upp på huvudet | – | `swoosh`, förtjust mjau |
| 9 | 70 | 5 | `K_HALV` | tittar upp mot luvan | 13 + 2,5 s | nyfiket mjau |
| 10 | 76 | 3 | `K_HALV` | nickar | 14 | förtjust mjau |
| 11 | 78 | 5 | `K_NARA` | blundar nöjt | 15 | mysig suck |
| 12 | 84 | 7 | `K_HALV` | fångar snöflingor med tassen | 16 | förtjust mjau |
| 13 | 90 | 6 | `K_NARA` | flingan på nosen, litet nys | 17 | fniss |
| 14 | 96 | 6 | `K_HEL` → `K_VANSTER` | rött hörn vid stugans trappa | 18 | nyfiket mjau, `pling` (svagt) |
| 15 | 102 | 4 | `K_HALV` | tittar mot hörnet | 19 | förtjust mjau |
| 15b | 106 | 3,5 | `K_HEL` | går dit | – | snösteg |
| 16 | 110 | 7 | `K_VANSTER` | gräver, paket 1 | 20 | snöpuff × 2, `pling` |
| 16b | 117 | 4 | `K_HEL` | nytt hörn under granen, går dit | – | snösteg |
| 17 | 121 | 6,5 | `K_HOGER` | gräver, paket 2 | 21 | snöpuff × 2, `pling` |
| 18 | 128 | 6 | `K_HALV` | tittar vänster, höger | 22 | frågande mjau |
| 19 | 134 | 10 | `K_HALV` → `K_ROSETT` | frågan, sedan bara rosetten; skimrar efter 3 s | 23 + 5 s | skimmer (`glimt` svagt) |
| 20 | 144 | 4 | `K_ROSETT` | skimrar tydligt, katten tittar bakåt | 24 | förtjust mjau, `glimt` |
| 21 | 148 | 6 | `K_HALV` | gräver, paket 3 med rosett, skutt | 25 | `puff`, `pling`, fniss |
| 22 | 154 | 7 | `K_HEL` | tre paket, tittar från det ena till det andra | 26, 10 | frågande mjau |
| 23 | 160 | 15 | `K_PULKA` | kritan ritar pulkan, gisspaus, fylls i | 27, 28 | `krita-ritar`, `glitter` |
| 24 | 176 | 3,5 | `K_HALV` | nickar, kritan flyger ut | 29 | förtjust mjau, `pling` |
| 25 | 179 | 6 | `K_HEL` | paketen hoppar upp på pulkan, ett per ord | 30 | `duns` × 3 |
| 26 | 185 | 6,5 | `K_HEL` | drar pulkan tre steg | 31 | snösteg, förtjust mjau |
| 27 | 192 | 9 | `K_HALV` | tittar på oss, mjauar tre gånger i pausen | 32 + 4 s | pratar-mjau |
| 28 | 200 | 3 | `K_HALV` | litet skutt | 33 | förtjust mjau |
| 29 | 204 | 5 | `K_HALV` | vinkar, pulkan bredvid | 34 | hej då-mjau |
| 30 | 208 | 4,5 | `K_HALV` | vinkar klart | 35 | fniss |
| 31 | 213 | 3,1 | `K_HEL` | kritirisen, 0,6 s svart | – | – |

Inget utsnitt står under 3 s utom klippen inne i en rad (`kamMix`), och inget går mer än ca 3 s utan klipp eller synlig rörelse: snön faller hela tiden, och i gisspauserna blinkar och andas katten och svansen rör sig.

## Short

Uppslag 14–21: något rött i snön, gräva fram två paket, barnet hittar det sista bakom katten. Ca 55 s.
