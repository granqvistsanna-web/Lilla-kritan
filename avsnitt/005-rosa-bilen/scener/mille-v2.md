# Mille i v2: skottlista (2026-11-08)

Milles spel i 005 följer hennes v2-ark (`assets/karaktarer/musen-mille/premium/uttryck.html`) och rörelsestilen i `lk-figur`.
Scenerna anger fortfarande `humor`, `titt`, `m`, `arm_r` … som förut; `bilen.js` (`spel` i `musKropp`) gör om dem till v2:

- **Uttryck:** humöret blir ett uttryck ur arket (`HUMOR_M`): glad → glad, skrattar/ropar → jätteglad (+ munnen `m`),
  förvånad → förvånad, nyfiken → nyfiken, blinkar → blinkar, slickar/mums → fnissig, happy → stolt, kärleksfull → kawaii,
  njuter → slutna ögon och leende (sover-ögonen + glad), skelögd → egen blandning (stora ögon, liten o-mun) med ögonen inåt mot nosen.
- **Kroppen:** `kropp: 'upp' | ['upp', k]` lägger på en pose ur arket (luta, upp, sträck, öron, svans), utan armarna.
- **Mjuka byten:** uttryck (0,14 s), blick (0,07 s), mun öppen/stängd (0,06 s), kroppspose (0,18 s) och lutningen i bilen (0,15 s)
  glider i stället för att byta på en bildruta. Tillståndet bärs mellan bildrutorna; `kit.seek` värmer upp 0,6 s före en stillbild.
- **Sekundärrörelser:** öronen släpar efter hopp, gupp och studs (arkets `clamp(vy × 0,9, ±25)`) och fladdrar lite (fartvind i bilen),
  svansen vilar (`sin(t·3)·3`) och viftar 0,6 s var 4,5 s när hon står, hon andas (i bilen också), och blinkar själv var 3,1 s (3,3 i bilen).
- **Prat** (kiosken): munnen rör sig, ögonen behåller uttrycket (`musTal`), i stället för att växla glad/skrattar per stavelse.

## Skott för skott (scentid)

| Scen | Tid | Förut | v2 nu |
|---|---|---|---|
| kritan-ritar | hela | ingen Mille (bara den ritade bilen) | – |
| vagen-1 03a | 0–2,9 | vinkar, `blinkar`, armen snäppte från ratten | blinkar (arkets blink-uttryck); armen lyfts mjukt från ratten på 0,45 s och sänks före klippet; kroppen gungar 2° med vinken |
| vagen-1 04 "Vad är rosa?" | 4,1–6,5 | nyfiken, blick och lutning ±4 bytte direkt | nyfiken + `lyssnar` (öronen); blick och lutning glider |
| vagen-1 "Leta med!" | 6,5–9,7 | följer fjärilen med blicken | + `upp` efter hur högt fjärilen är |
| vagen-1 "Jag och du / kom och se", tut | 9,7– | glad → skrattar; blink = sleep-ögon | glad → jätteglad; blink = ögonlocket |
| vagen-2 06a "Blommorna!" | 3,3 | förvånad → glad, pekar | förvånad → glad (glider) + `strack` medan hon pekar |
| vagen-2 06b sniff, mmm | 6,1–8 | nyfiken → njuter → kärleksfull | nyfiken → slutna ögon → kawaii; nosen upp (`upp`) på varje sniff |
| vagen-2 07, 07a, 07b ballongen | 9–17 | glad/förvånad, pekar upp | + `upp` mot ballongen; på "upp, upp, upp" öppnas munnen (inget ögonbyte) |
| vagen-2 08 frågan | 21–24 | nyfiken, tittar runt | nyfiken; `upp` rätas ut när kameran glider ner |
| vagen-2 08a pausen | 24–26 | skelögd = glad (fanns inte i v2) | skelögd: stora ögon inåt mot nosen, o-mun; nosfläcken nosar (v2-bilden, förut v1-ritningen som inte fanns) |
| vagen-2 08b Nosen!/Öronen! | 26–28 | skrattar | jätteglad, glider in; `upp` mot öronen |
| vagen-2 08c vick | 28– | glad | glad (oförändrat, huvudvickningen kvar) |
| refrängerna (05, 09) | – | ropar/skrattar, kärleksfull, spanar | jätteglad + mun; kawaii på hjärtat; spanar med `upp`; lutningen glider |
| kiosken 11 | ut ur bilen | skrattar, huk | jätteglad + `huka` före hoppet; öronen släpar i hoppet |
| kiosken 11a "Glassen!" | | förvånad → skrattar | + `upp` mot den stora struten |
| kiosken 11b mums | | skrattar + tuggmun | jätteglad + tuggmun |
| kiosken 11d, 11e, 12 prat | | glad/skrattar växlade per stavelse | glad resp. jätteglad, bara munnen pratar |
| kiosken 12a, 14c slickar | | skrattar/mums | jätteglad ↔ fnissig (glider); 14c `strack` (stolt) |
| kiosken 13a kulan ramlar | | glad → förvånad | förvånad + `ner` mot kulan på golvet |
| kiosken 13d nya kulor | | förvånad → skrattar | samma, glider |
| kiosken 14e hurra | | skrattar, armar upp | jätteglad + `hurra` |
| discot dans | | ropar/skrattar/glad/happy/kärleksfull | jätteglad/glad/stolt/kawaii; `hurra` på "upp" och "hoppa", `lyssnar` när hon tittar på de andra |
| discot glassberget | | skrattar, armar upp, vinkar | jätteglad + `hurra` när hon jublar och dansar |

## Inte mappat / kvar
- Armarna styrs som förut av scenernas vinklar (v1-vinklar via `v2Punkt`); arkets armposer (`hurra`, `magen`, `nar`) används bara för kroppen.
- Svansviftningens ljud (puff) är inte med: scenernas ljud läggs i förväg, inte per bildruta.
- Skelögd finns inte i arket; det är en egen blandning i `HUMOR_M` plus ögonen inåt i `bilen.js`.
