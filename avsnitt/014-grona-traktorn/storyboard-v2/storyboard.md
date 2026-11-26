# Storyboard – Avsnitt 014 · Gröna sången, art direction v2 (utkast 2026-11-26)

**Gröna sången omgjord i v2** (Sanna 2026-11-26: "green song v2, v2 leo and so on", görs om på plats och laddas upp som en ny video). Samma berättelse och **samma sång** som v1 ([`../storyboard.md`](../storyboard.md), som ligger kvar): `../sang.m4a`, tagning 1, 3:26.4, oklippt, ordtider i [`../rader.txt`](../rader.txt). Ingen ny musik. Byggs med 013:s maskineri enligt [`format/fargsang-v2.md`](../../../format/fargsang-v2.md): tabellen styr, `scen-kit.js` ritar storyboard och film, `scener/film.js` har rörelsen per bild.

## Tidsbaser

- **Avsnittstid = sångtid + 9,0 s** (formatets intro, 9,0 s, slutar med ett kritsvep in i ritandet). v1 hade + 11 s, så alla v1-tider flyttas **−2,0 s**.
- Ingen `KAP`: sången börjar redan i ritandet ("Kritan ritar …"), så väntan efter konturen kan inte kortas. **Filmtid = avsnittstid** hela vägen.
- **Längd:** 3:35.4 (9,0 + 3:26.4).

## Vad som byts mot v1

| v1 | v2 |
|---|---|
| Lova v1 i traktorn (`i-traktorn/`, `scener/lager/lova-arm-*.png`) | **Lova v2** (`assets/karaktarer/leoparden-lova/premium/`), sitter i karet som Kanel i v2-bilen, armarna fria mellan stolparna |
| Pip och Gurra v1 | **Pip v2 och Gurra v2** (`premium/`), alla djur lika stora (`format/bildutsnitt.md`) |
| `traktor-gron-oppen` (v1) | **`traktor-gron-v2`** (Sannas bild 2026-11-26), delar i `assets/rekvisita/traktor-gron-v2/cut/` |
| Lovas jacka (`lager/lova-jacka.png`) | Jackan ritas om i kod på v2-riggen: grön form över bröstet med dragkedja, följer kroppen |
| Vägen v1, väggen omfärgad till ljusblå | **v2-vägen** (`assets/stiltest-premium/vagen-teal.png` som i 013), väggen omfärgad till ljusblå `#A8DCF2` (teal är för nära grönt). **Inga gröna träd**: bara sakerna vi letar efter är gröna |
| Bondgården v1 (svarta kritlinjer) | **Bondgården v2**: gul vägg `#F6C21C` och vitt golv i kod, ladans röda dörr och höet som egna v2-urklipp (nya bilder, se nedan), ärtvalvet och bänken i kod |
| Ärtskidan v1 | **Ärtskidan v2** (ny bild ur v1 med image2image, se nedan), stängd, öppen med tre ärtor, tom |
| Humle, Fia v1 | **Humle v2, Fia v2** (`premium/`) |
| Pella långt bort på himlen | **struken** (ingen v2) |
| Discot mint (v1) | 013:s disco omfärgat till mint/ljusgrönt, kulan grön (som `disco-rod-rosa.png`) |
| Ansikten ur `ansikten.js` | v2-uttryck i kod: `neutral glad jatteglad forvanad nyfiken tanker ledsen somnig fnissig blinkar stolt skrattar mums ivrig kawaii` |
| Line boil v1 | 2,5 px i bild, delad med zoom, ny brusbild 6 gånger/s; kritan genom `verktyg/kritan-ritar.js` |

**Uttryck v1 → v2:** `ropar` → `jatteglad`, `skrattar` → `skrattar`, `karleksfull` → `glad` + `blinkar`, `skelogd` → `fnissig`, `slickar`/`njuter` → `mums`, `anstranger_sig` → `ivrig`. **Kawaii högst tre gånger:** 05e (ärtan på taket), 14c (tack), 16c (sista refrängen).

## Bild för bild

Allt som inte står i kolumnen **I bild (v2)** är som samma rad i v1-storyboarden. Raderna behåller v1:s nummer.

| # | Tid (avsnitt) | Plats · kamera | Sjungs | I bild (v2) | Ansikten |
|---|---|---|---|---|---|
| 00 | 0:00.0 | Intro (fast, 9,0 s) | – | Formatets intro, *Avsnitt 14 · Gröna sången*, titeln i grönt, slutar med ett **grönt kritsvep** rakt in i papperet | – |
| 01a | 0:09.0 | Papper · kritan ritar | Kritan ritar … | Kritan flyger in uppe till höger och ritar **traktorns kontur i ett drag** (0:10.2–0:13.0, ca 2,8 s): kropp, motorhuv, avgasrör, hjulen, stolparna och taket. Skogsljud under | – |
| 01b | 0:13.0 | Papper | vad kan det vara? Vad kan det vara? Tick, tack … tick, tack … | Konturen står, kritan väntar på väntplatsen och svajar, knackar på papperet på varje "tick, tack". Kameran glider långsamt in mot konturen (ingen still bild över 5 s). Gissningspausen 0:19.3–0:24.7 | – |
| 01c | 0:24.7 | Papper | En traktor! En grön traktor! Tut-tut, nu kör vi! | På "En traktor!" fylls bilden i inifrån (pling, gnistor), linjen tonas bort, traktorn hoppar till. "Tut-tut": en vit puff ur avgasröret. Kritan flyger ut uppe till höger | – |
| 03 | 0:30.0 | Zoom in → A · Vägen · helbild | (instrumentalt) | **Zoom in** (0:30.0–0:32.0): ett hål i papperet bakom traktorn öppnar sig mot vägen; Lova sitter redan i traktorn i sin gröna jacka. Vägen börjar glida | Lova: **jatteglad** → **glad** |
| 03a | 0:33.5 | Närbild Lova | (instrumentalt) | Lova vinkar till tittaren (armen bakom kroppen, snett ut förbi kanten), tittar framåt igen | **glad** → **blinkar** |
| 03b | 0:36.8 | Vägen · helbild | Leoparden kör sin gröna traktor, putt, putt, putt – på vägen här! | Traktorn skumpar en gång per "putt", vita puffar. Humle v2 flyger ett lugnt varv runt Lovas huvud | **glad** → **skrattar** |
| 04 | 0:42.2 | Närbild Lova | Leoparden letar grönt nu, leta med – jag och du! | Tittar sig om, ser jackan, litet skutt, pekar på tittaren | **nyfiken** → **forvanad** → **jatteglad** + **pekar** |
| 05a–g | 0:48.1 | Ärtresan | Refräng 1 | Som v1: åkern, en grodd per "Grönt!", trafikljuset lyser grönt, traktorn rusar ut; klipp till vägen, tre ärtor hoppar efter; ärtan på taket (05e) | **jatteglad** / **skrattar**, 05e **kawaii** |
| 06 | 1:02.5 | Vägen · helbild | Vad är grönt? … Grodan är grön – hopp, hopp, hopp! | Gurra v2 hoppar över vägen framför traktorn, tre hopp, landar på andra sidan (aldrig genom traktorn). Lova studsar i sätet per hopp | Lova **nyfiken** → **forvanad** → **skrattar** · Gurra **jatteglad** → **fnissig** |
| 07a | 1:10.4 | Vägen · helbild | Och vad är grönt? Titta där! Titta där! | Trafikljuset glider in och lyser rött, traktorn stannar mjukt | **nyfiken** → **forvanad** |
| 07b | 1:13.4 | Närbild Lova | Vänta, vänta … | Tassen upp, sitter stilla, tittar upp mot lampan | **nyfiken** → **blinkar** |
| 07c | 1:15.2 | Vägen · helbild | Pling! Lampan är grön – kör, kör, kör! | Grönt, en grön ring från lampan, traktorn far iväg, Lova pumpar armarna per "kör" | **forvanad** → **jatteglad** |
| 08a | 1:19.3 | Närbild Lova | Vad mer är grönt? Kan du se? Tick, tack … | Lova frågar tittaren och tittar ner mot jackan i pausen; kameran glider in mot jackan | **nyfiken** |
| 08b | 1:28.5 | Närbild Lova | Jackan är grön – och flaggan med! | Pekar på jackan (glitter), kameran åker ut till flaggan på traktorn (glitter) | **forvanad** → **skrattar** |
| 08c | 1:31.3 | Närbild Lova | Zipp, zipp, zipp! | Drar upp dragkedjan i tre ryck | **stolt** → **blinkar** |
| 09a–g | 1:33.0 | Ärtresan | Refräng 2 | Som 05 | som 05, utan kawaii |
| 10 | 1:46.0 | Kritsvep (gult) → B · Bondgården v2 · helbild | vad är grönt? Titta ut! Vad är grönt? | Traktorn med vagnen kör in och stannar framför höet. Pip och Gurra sitter på bänken under ärtvalvet framför ladans dörr. Lova kliver ner och går till bänken, **bakom bänken, inte genom den** (QA J13 25/11). Traktorn står kvar i vänsterkanten resten av scenen | Lova **glad** → **forvanad** · Pip **nyfiken** → **skrattar** · Gurra **blinkar** |
| 11a | 1:49.3 | Bondgården · kameran glider upp mot valvet | Titta där! | Små skidor i valvet, en mogen högst upp, Pip pekar | Lova **nyfiken** · Pip **blinkar** |
| 11b | 1:50.7 | Tvåbild vid bänken | Ärtorna är gröna – en, två, tre! | Pip plockar skidan (knäpp), den öppnas: tre ärtor, en per räkneord | Pip **jatteglad** · Lova **forvanad** → **skrattar** |
| 11b2 | 1:54.9 | Tvåbild | En, en, en … En till var och en! | Lova sätter sig, alla tre i rad; Pip ger var och en sin ärta | Pip **glad** + **blinkar** · alla **skrattar** |
| 11c–f | 1:59.0 | Närbild Lova / tvåbild | (mellanspel 16 s) | Som v1: ärtan på nosen, kasta runt, ärtan på Gurras huvud, Lovas höga kast | **fnissig**, **forvanad**, **skrattar** |
| 13a | 2:15.0 | Tvåbild | Oj, oj! Ärtan hoppar! | Ärtan studsar **på** bänkkanten och ner på golvet | alla **forvanad** |
| 13b | 2:18.9 | Lågt utsnitt | Rull, rull, rull – in under bänken | Ärtan rullar in under bänken mot väggen | Lova **nyfiken** · Pip **fnissig** |
| 13b2 | 2:21.8 | Lågt utsnitt | En, två – men vi är tre! | Lova hukar (pose `huka`) och sträcker tassen in **under** bänken, armen för kort. Pip och Gurra håller upp sina två ärtor | Lova **ivrig** → **forvanad** · Pip, Gurra **nyfiken** |
| 13c | 2:25.2 | Närbild Lova | Leoparden är ledsen – snyft, snyft. | En liten tår, sjunker ihop, axlarna rycker per snyft | **ledsen** (enda gången) |
| 13d | 2:27.7 | Närbild Lova | Vem kan hjälpa? Tick, tack … | Tittar på tittaren och väntar | **nyfiken** → **forvanad** |
| 14a | 2:33.2 | Närbild Pip | Kycklingen! | Ögonen stora, tofsen reser sig, vingarna upp | **forvanad** → **jatteglad** |
| 14a2 | 2:34.9 | Lågt utsnitt | Hoppar ner – oj, hon trillar! | Pip hoppar **över** bänkens framkant och trillar mjukt på rumpan | Pip **forvanad** |
| 14b | 2:36.9 | Lågt utsnitt | Upp igen – pick, pick, pick! | Pip reser sig, lägger sig platt på magen framför bänken (pose `liggMage`) och når in under den med näbben, pick per ord, och pickar fram ärtan | **skrattar** → **ivrig** → **forvanad** |
| 14c | 2:39.0 | Tvåbild | Här är ärtan – tack, tack, tack! | Pip ger ärtan till Lova, Lova tackar | Lova **kawaii** → **glad** + **blinkar** · Pip **glad** |
| 14d | 2:41.1 | Tvåbild | En ärta var – till alla tre! | Alla tre håller upp sin ärta | **glad** → **skrattar** |
| 14e–f | 2:42.7 | Tvåbild | Mums, mums, mums – hurra! | Alla äter | **mums** → **jatteglad** |
| 14g | 2:45.2 | Bondgården · helbild | Grönt! Nu kör vi! | Pip håller upp den tomma skidan, alla gungar, nya skidor poppar ut | **jatteglad** → **skrattar** |
| 14h | 2:48.7 | Samma helbild | Grönt! Nu kör vi! | Valvet fylls; ärtskidans övergång (`artovergang.js`) till discot | **jatteglad** |
| 15a–e | 2:50.5 | Discot (mint) | Danspaus! Hoppa … Vicka … Flyga runt! … grön dans! | Gurra hoppar, Pip vickar, Fia v2 flyger runt; rörelsesymbolerna i hörnet | **skrattar**, **jatteglad** |
| 16a | 2:59.6 | Discot | Grodan – grön! Lampan – grön! Jacka, ärtor, traktor – grönt! | Klistermärkena flyger upp i raden runt kulan, två och två balanserat; figurerna tittar upp mot varje | Lova **forvanad** → **jatteglad** |
| 16b–c | 3:07.5 | Discot | Grönt, grönt, grönt … grön som en liten ärta! | Refrängdansen med alla tre | **jatteglad**, 16c **kawaii** |
| 16d | 3:14.0 | Discot | Hej då, hej då – putt, putt! | Lova i traktorn kör fram bakifrån genom en lucka mellan Pip och Gurra (som i 013:s hejdå) och vinkar; vinkningarna börjar en i taget | Lova **glad** + **blinkar** · Pip, Gurra **skrattar** |
| 17 | 3:24.0 | Kritsvep (brunt) → åkern | (outro) | Lova kör över åkern, Pip och Gurra i vagnen vinkar, ärtplantor växer upp i fårorna | **skrattar** |
| 17b | 3:32.0 | Kritiris | (outro) | Irisen sluter sig runt Lova, stjärnglimt, svart (till 3:35.4) | **skrattar** → **blinkar** |

## Nya bilder som behövs (Sanna gör eller godkänner)

1. **Gröna traktorn v2** – klar (Sanna 2026-11-26), delas i `cut/`.
2. **Ärtskidan v2** – stängd, öppen med tre ärtor, tom. Image2image ur v1 (`assets/rekvisita/artskida/artskida.png` som bild 1 för formen, v2-traktorn som bild 2 för stilen).
3. **Ladans dörr v2** och **en liten höhög** för bondgården v2 – egna urklipp, väggen och golvet i kod.

Prompterna står i [`../bildlista.md`](../bildlista.md) under "v2".

## Öppet

- **"Vad kan det vara?"** sjungs i tagningen och kan inte klippas bort (regeln säger att repliken aldrig ska användas; sången klipps aldrig). Kvar om inget annat bestäms.
- **Julkalenderns lucka J13** visar v1 och väntar på Sannas godkännande av förhandsvisningen. Den står kvar tills v2 är klar.
- **Pip är lika stor som Lova i v2** (tvåbenta figurer är lika stora, `stil/art-direction-v2.md`), så hon får inte plats under bänken som i v1. Förslag i 14b: hon lägger sig platt på magen (`liggMage`, finns i riggen) och når ärtan med näbben, där Lovas tass var för kort.
