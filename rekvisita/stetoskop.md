# Stetoskopet

Doktorns stetoskop i 046 Kaninen går till doktorn, **ritat i kod** (Sanna 2026-11-20: "i think these should be done with code"), ingen Flow-bild. Samma färger som stetoskopet som redan hänger runt doktorns hals i bilden: en grå slang (`#5f646b`), en silverfärgad öronbåge med två grå öronproppar och ett runt silverfärgat bröststycke (`#c6ccd2`) med en ljusare mitt. Platt färg med kritkorn och lite darr i kanten (filtret `#ds-korn`), ingen mörk kontur, vit klistermärkeskant. Inget kors, ingen text.

**Kod:** `assets/rekvisita/doktorssaker/doktorssaker.js`
- `DS.stetoskop({ led, bit, vinkel, slak, bitVinkel })`: hela stetoskopet. Öronbågen sitter vid `led`, slangen hänger i en mjuk båge (`slak` åt sidan) ner till bröststycket vid `bit`. Flytta `bit` med handen, så följer slangen.
- `DS.brostbit(x, y, vinkel)`: bara bröststycket (r 34), det handen håller mot magen.
- Enheterna är doktorns 1024-ruta (handen har r 35). I riggen läggs saken i `.figuren` och får doktorns `#dkant`; själv i en närbild får den `kant.lagg(g, { andel: 0.01 })`.
- `DS.defs` läggs i sidans `<defs>` en gång.

**I 046:** rad 11 (närbild: handen glider in med bröststycket, *"Titta, ett stetoskop"*) och när doktorn lyssnar på magen.

Provark: `assets/rekvisita/doktorssaker/doktorssaker.html` (`?narbild=stetoskop` = närbilden med ärm och hand).
