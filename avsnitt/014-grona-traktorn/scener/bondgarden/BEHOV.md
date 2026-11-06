# bondgarden: behov i kitet

## 1. `traktorn.js`: var Lovas tass är
Ärtan ligger i Lovas tass (11c–14e), men `traktorn.ny` lämnar inte ut armarnas figur eller tassens punkt.
**Förslag:** `b.tass('r' | 'l')` → tassens punkt i bild efter `pose` (vridpunkt + spets vriden med `peka` och sträckt med `armSk`).
**Här tills vidare:** scenen har en kopia av `PIV`/`SPETS` ur traktorn.js och räknar tassen själv (`handLova`), via `b.punkt`.

## 2. Pips och Gurras vingar/armar
Pips vingspets (835, 612)/(190, 614) är uppskattad (riggen har ingen spets), Gurras är bygg.py:s `SPETS`. Bra att ha i kit.js som `SPETS` per figur, så att `discot/` och `slutet/` inte behöver egna kopior.

## 3. ~~`lager/matt.json`: 14h saknas~~ (klart)
matt.json har nu 14h (2:50.7–2:52.5). Scenen slutar på 14h:s slut, 2:52.5. 14h börjar fortfarande på andra "Grönt! Nu kör vi!" i rader.txt (samma tid).

## 4. Stående Lova
`traktorn.lova()` döljer benen. **Här tills vidare:** scenen visar benen igen (hela jackan och ärmarna som i traktorn). Hör hemma i traktorn.js som `lova(…, { star: true })` om fler scener behöver henne stående.

## 5. Mjuka rörelser: `mjukaposer.js` borde in i `kit.js`
`scener/mjukaposer.js` (2026-11-06, Sannas "make animations smooth") läser figurernas poser var 1/60 s och låter knäpp (en arm som byter läge, en figur som flyttas) glida bort på 0,25 s, utan att ändra pågående rörelser; bondgarden, discot och slutet laddar den. `mjukaPoser.hopp` är `kit.hopp` med halva huken och sträckningen: i `kit.hopp` slutar huken helt hopsjunken och hoppet sträcker direkt (ett ryck på 13 % i en bild på stora figurer). Båda hör hemma i `kit.js` när den är fri.
