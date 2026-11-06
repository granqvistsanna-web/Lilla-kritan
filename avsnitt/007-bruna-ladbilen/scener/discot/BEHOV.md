# discot: behov i kitet

## Öppet (2026-11-06, grovklipp tagning 5 #14)

Sanna vill ha discot som 005:s och 006:s, i en brun version. Kitet har gått åt ett annat håll: `lager/disco-prickar.png` är mörk
choklad (`lila_discot()` i bygg.py), och `discoljus.js` har calypsofärgade käglor, rutor och fläckar och ett extra vaxbrus (`#discokorn`).
Det skedde när lastbilen stod i discot, och den gör inte det längre.

Lokalt i `discot/` just nu:
- Plåten är `discot/disco-beige.png`, som `discot/gor-plat.py` gör: 006:s plåt med den första `bruna_discot()`.
- Efter `discoljus.ny()` tas brusrektangeln bort. Käglorna får 006:s `#FFF6DC` (0,55 → 0), rutorna `#FFEFC4` och fläckarna 006:s pastellfärger på 0,35.

Det som är kvar är att rutorna tänds var fjärde (0,55) i stället för var sjunde (0,45), eftersom det sitter i `rita()`.

Förslag till kitet: låt `bruna_discot()` göra `lager/disco-prickar.png` igen och ta tillbaka 006:s färger i `discoljus.js`.
Då kan de lokala raderna (markerade "BEHOV.md" i index.html) och `disco-beige.png` tas bort. `slutet/` använder inte discot längre.
