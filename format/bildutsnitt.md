# Bildutsnitt och storlek

Sanna 2026-11-22: figurernas storlek och kompositionen i bild ska vara mer konsekvent. Samma utsnitt ska se likadant ut i alla avsnitt, vilken figur det än är. Reglerna gäller nya scener i 16:9 (1920 × 1080). Shorts längst ner.

Det som skavde i 020, 046 och 047: huvudet kapat i överkant i en helbild, doktorn avskuren på mitten vid bildkanten, katten som hoppar mellan halva och hela bildhöjden i samma scen, och farmor katt mindre än katten.

## Mått

- **Kroppshöjd** = från fötterna till toppen av huvudet, utan öron, horn och svans. Det är den som mäts, så att kaninen med sina långa öron och grisen får samma storlek.
- **H** = bildens höjd (1080 px). Alla mått nedan är andelar av H, mätt i färdig bild, alltså efter kamerans zoom.
- **Golvlinjen** = var fötterna står, räknat uppifrån.

## Fyra utsnitt

| Utsnitt | Kroppshöjd | Fötterna | Används till |
|---|---|---|---|
| **Helbild** | 40 % (430 px) | 84 % ner | figuren kommer in, går, en ny sak dyker upp, hela platsen |
| **Halvnära** | 60 % (650 px) | 95 % ner, fötterna precis med | figuren och saken den gör något med, två figurer pratar |
| **Närbild** | 115 % (1240 px) | under bilden, huvudet 6 % från överkanten | känslor: glad, förvånad, ledsen, hej och hej då |
| **Detalj** | – | – | saken eller stället fyller 40–60 % av H, i mitten: kritan ritar, frågans paus |

- Håll dig till de här fyra. Ett mellanting ser ut som ett misstag.
- Toleransen är ±5 procentenheter. Större avvikelse betyder ett annat utsnitt.
- Samma utsnitt i två klipp efter varandra ska ha samma storlek. Hoppar figuren i storlek ska det vara ett riktigt byte: helbild → närbild, inte 40 % → 50 %.

## Luft och kanter

- **Huvudet kapas aldrig** i helbild och halvnära. Med måtten ovan blir det 44 % luft ovanför huvudet i helbild och 35 % i halvnära; öronen ska vara helt med (minst 4 % luft ovanför dem).
- I närbild får öronen gå ut i överkant, men aldrig toppen av huvudet. Ögonen ligger på övre tredjedelen, 33–38 % ner.
- **Ingen figur halvt i bild vid kanten.** En figur är antingen helt med (minst 5 % luft till sidokanten) eller kommer in i bild. En andra figur i närbild syns med hela ansiktet, annars inte alls.
- Saker som figuren håller i är alltid helt i bild.

## Placering

- **Huvudfiguren står på en tredjedelslinje** (x 33 % eller 67 %) och tittar in mot mitten, med mer luft framför sig än bakom.
- **Mitten** bara i närbild av ansiktet och när figuren pratar till barnet (hej, hej då, frågan).
- Saken figuren ska använda står på den andra tredjedelen, på samma golvlinje.

## Flera figurer

- **Alla djur har samma kroppshöjd** (minnet *reaktionstid*, 2026-11-16). En vuxen människa (doktorn) får vara högst 1,3 gånger djuren, och en vuxen av samma djur (farmor) är lika stor eller lite större, aldrig mindre.
- Samma golvlinje för alla som står på golvet.
- En figur på varje tredjedelslinje, med minst en halv kroppsbredd emellan. De överlappar inte varandra.
- I halvnära med två figurer räknas kroppshöjden på den minsta.

## Saker

| Sak | Höjd |
|---|---|
| Liten sak i tassen (sked, borste, kula) | 25–35 % av kroppshöjden |
| Gosedjur, boll, paket | 35–45 % |
| Möbler och fordon | som i verkligheten mot ett litet barn: badkaret räcker figuren till bröstet, en bussdörr är dubbelt så hög |

## Kameran i kod

`verktyg/utsnitt.js` räknar ut `[zoom, cx, cy]` (samma form som 020:s `K_HEL` m.fl.) ur figurens plats och kroppshöjd i plattan, så att måtten ovan blir rätt utan att prova sig fram:

```js
utsnitt('hel', { x: 640, golv: 905, kropp: 430 })            // figuren på vänster tredjedel
utsnitt('nara', { x: 640, golv: 905, kropp: 430 }, 0.5)      // närbild i mitten
```

**Ställ figurens skala i plattan så att kroppshöjden är 430 px vid zoom 1.** Då är helbilden hela plattan, och alla figurer i alla avsnitt blir lika stora utan att räkna. Testat: helbild zoom 1, halvnära 1,51, närbild 2,89 för en figur med fötterna på y 905.

Kameran hålls alltid innanför plattan. Går det inte (figuren står för nära plattans kant) flyttas figuren, inte reglerna.

## Shorts (9:16)

Samma utsnitt men helbild 30 % och halvnära 45 %, närbild som ovan. Figuren står i mitten i sidled.

## Kontroll

Titta på kontaktarket från `verktyg/qa-film.sh` innan filmen visas för Sanna: samma utsnitt ska ha samma storlek i alla rutor, inga kapade huvuden, inga halva figurer vid kanten och alla djur lika stora.
