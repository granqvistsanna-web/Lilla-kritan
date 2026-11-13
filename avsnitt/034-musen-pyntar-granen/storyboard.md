# 034 Musen pyntar granen – storyboard (plan)

Grov storyboard före grind 1. Tiderna är **uppskattade** (ca 2,4 ord/s för Malin, plus pauserna och `GLES` 0,7 s per rad med replik). De riktiga tiderna räknas i `storyboard/rader.mjs` ur de inspelade replikernas längd efter grind 3, och då byggs stillbilderna och animatiken med `bygg.mjs --animatik` (grind 5). **Scentid** 0 = kritan börjar rita; filmtid = scentid + introts längd (ca 3,3 s).

## Uppställningen (förslag, 1920 × 1080)

```
 ┌──────────────────────────────────────────────────────────────┐
 │  vägg (vardagsrummet), gardiner på var sida om fönstret      │
 │     ┌──┬──┐                             ★ (toppen, tom)     │
 │     │❄ │ ❄│  stort fönster,              ▲                   │
 │     ├──┼──┤  snö faller ute (kod)       ▲▲▲                  │
 │     └──┴──┘                            ▲▲▲▲▲   ← kulorna på   │
 │ fåtölj               MUSEN             ▲▲▲▲▲▲▲   de två nedre │
 │                      (STA)            ▲▲▲▲▲▲▲▲▲   våningarna  │
 │                                          ▐█▌                  │
 │ (matta) ──────────── golv ─────── ●●●  ╘═╤═╛ julgransfot ─────│
 │                              kulorna på golvet                │
 └──────────────────────────────────────────────────────────────┘
```

- **Granen** till höger (x ca 1300), i julgransfoten, ca 620 px hög (`julgran.png` i skala ca 0,72, foten `julgransfot-tunn.png`). Musens uppsträckta hand når de två nedre våningarna men inte toppen, så stjärnan behöver barnets hjälp.
- **Musen** står till vänster om granen (`STA` ca x 900), SKALA 0,5 som de andra tvåbenta figurerna, ungefär halva granens höjd.
- **Kulorna** ligger på golvet mellan musen och granen, i skala ca 0,12 (radie ca 40 px). Gul och blå är den röda tonad i kod.
- **Fönstret** till vänster om mitten med snö som faller lugnt utanför (i kod). Fåtöljen med filten och mattan längst till vänster är inbakade i plattan.
- Lagren bakifrån: platta (fönstrets insida tom) → kvällshimlen och snön bakom fönstret, som en mask → kritans konturer → granen → kulorna i granen → musen → kulorna på golvet → julgransfoten (framför den gömda kulan) → kritan → ram (iris).

## Utsnitten

| Namn | Ungefär | Till |
|---|---|---|
| `K_HEL` | zoom 1 | musen kommer in, kulan rullar iväg, den pyntade granen |
| `K_STA` | 1,4, musen och granens nedre halva | hej, tack, hänga upp |
| `K_NARA` | 2,6, musens ansikte | problemet, kawaii, "upp!" |
| `K_GRAN` | 1,6, hela granen | granen är tom, toppen är tom |
| `K_GOLV` | 2,4, kulorna på golvet | kritan ritar kulorna |
| `K_SPEGEL` | 3,4, den röda kulan | musens ansikte i kulan, tittut |
| `K_FOT` | 3,2, julgransfoten | frågans närbild, den blå kanten |
| `K_TOPP` | 2,4, toppen | stjärnan landar |

Hårda klipp vid radbytet, inga zoomar inne i scenen. Den enda zoomen är från papperet in i rummet.

I ljudkolumnen är `mus-pip-N` **känslans nummer** i receptets tabell (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då), inte filnamnet. Vilka filer det blir avgörs vid grind 4.

## Uppslagen

| # | ca s | Utsnitt | Bild | Malin | Ljud |
|---|---|---|---|---|---|
| 01 | 0–16 | papper | kritan ritar musens kontur (7 s), väntar, musen fylls i, zoom in | 01, 02, 03 | krita-ritar, skogsljud |
| 1 | 16–23 | `K_HEL` | snö faller utanför fönstret, musen trippar in och vinkar | 04 | steg, mus-pip-1 |
| 2 | 23–27 | `K_STA` | musen ser granen, litet skutt | 05 | mus-pip-2 |
| 3 | 27–38 | `K_GRAN` → `K_NARA` | tom gran; öronen faller | 06, 07 | mus-pip-6 |
| 4 | 38–50 | `K_GOLV` → `K_STA` | kritan ritar den röda kulan, gisspaus, fylls i | 08, 09 | krita-ritar, glitter |
| 5 | 50–55 | `K_NARA` | kawaii-ögon | 10 + paus 2,5 s | mus-pip-5 |
| 6 | 55–57 | `K_NARA` | nickar | 11 | mus-pip-2 |
| 7 | 57–65 | `K_GOLV` | gul kula ritas | 12, 13 | krita-ritar, glitter |
| 8 | 65–70 | `K_GOLV` | blå kula ritas, kritan ut | 14 | krita-ritar, glitter |
| 9 | 70–75 | `K_STA` | tre kulor, musen tittar på en i taget | 15 | mus-pip-2 |
| 10 | 75–80 | `K_STA` → `K_SPEGEL` | böjer sig ner, ansiktet i kulan | 16 | mus-pip-3 |
| 11 | 80–87 | `K_SPEGEL` | borta (paus 2 s), tillbaka | 17 | mus-fniss |
| 12 | 87–95 | `K_HEL` | tittut igen; den blå rullar bakom foten | – | rull, mus-pip-2 |
| 13 | 95–99 | `K_STA` | musen tittar på granen | 18 | mus-pip-2 |
| 14 | 99–107 | `K_STA` | röd kula upp i granen | 19 | ding, glimt |
| 15 | 107–114 | `K_STA` | gul kula upp | 20 | ding, mus-pip-2 |
| 16 | 114–121 | `K_STA` | tittar ner, vänster, höger | 21 | mus-pip-5 |
| 17 | 121–131 | `K_STA` → `K_FOT` | frågan, sedan bara foten och den blå kanten; skimmer efter 3 s | 22 + paus 5 s | – |
| 18 | 131–135 | `K_FOT` | skimrar tydligt, musen jätteglad (in i bild) | 23 | mus-pip-2, tindra-4 |
| 19 | 135–142 | `K_STA` | blå kula upp | 24 | ding |
| 20 | 142–150 | `K_HEL` → `K_GRAN` | tre kulor; toppen tom | 25, 26 | mus-pip-5 |
| 21 | 150–162 | `K_TOPP` → `K_STA` | kritan ritar stjärnan, den glider ner till handen | 27, 28 | krita-ritar, glitter |
| 22 | 162–165 | `K_NARA` | kawaii-ögon | 29 | mus-pip-2 |
| 23 | 165–171 | `K_STA` | håller upp stjärnan, skutt, når inte | 30 | mus-pip-5 |
| 24 | 171–180 | `K_NARA` | musen med stjärnan, tittar mot tittaren | 31 + paus 4 s | – |
| 25 | 180–188 | `K_TOPP` | stjärnan glider upp och landar | 32, 33 | swoosh, tindra-3 |
| 26 | 188–197 | `K_HEL` | pyntad gran, snö, musen blundar nöjt och klappar | 34 | mus-pip-4, tass-klapp-tre |
| 27 | 197–203 | `K_STA` | vinkar | 35 | mus-pip-8 |
| 28 | 203–210 | `K_STA` | vinkar klart | 36 | mus-fniss |
| 29 | 210–213 | `K_STA` | kritirisen, 0,6 s svart | – | – |

**Summa ca 213 s scentid + 3,3 s intro ≈ 3:36.** Det är lite under receptets 3:45–4:15. Det fylls på naturligt i `rader.mjs`: längre ifyllnad efter kritans teckningar, 0,3–0,5 s stillhet efter varje handling och leken i uppslag 12. Lägg inte till repliker för att nå längden.

## Prov före grind 5

1. **Spegelbilden i kulan** (uppslag 10–11): en stillbild där musens ansikte ritas litet inne i den röda kulan. Läses det som "musen ser sig själv"? Annars blir leken att kulan hamnar på musens öra (fråga 4 i README).
2. **Armen upp med kulan** vid granen: kulan i handens spets, armen bakom kroppen förbi kanten, kulan på grenen. En stillbild per våning.
3. **Den gömda kulan:** bara en bit vid sidan av julgransfoten i `K_FOT`, kolla att den syns i mobilstorlek.
