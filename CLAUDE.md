# Lilla Kritan – instruktioner för AI-assistenter

Repot innehåller allt material för YouTube-kanalen *Lilla Kritan*: tecknade cut out-filmer med sånger och berättelser för små barn (ca 1–4 år).

## Konventioner
- **Språk:** allt innehåll (manus, sånger, dokumentation) skrivs på svenska. Bildprompter (```` ```prompt ````- och ```` ```delar ````-block) skrivs på engelska.
- **Upphovsrätt:** nämn aldrig befintliga serier, figurer eller varumärken i prompter, manus eller sånger. Beskriv stilens egenskaper istället (se `stil/stilguide.md`). Sångerna ska vara egna, inte nya texter till kända melodier.
- **Figurer är låsta:** ändra inte utseende eller prompt för en figur vars status är `✅ Referensark klart`, om användaren inte uttryckligen ber om det.
- **Nya figurer, platser och saker** följer formatet i `karaktarer/_mall.md`, `bakgrunder/*.md` och `rekvisita/*.md` så att `verktyg/prompt.py` kan läsa dem. Lägg också till dem i respektive README.
- **Nya avsnitt** skapas som `avsnitt/NNN-kort-namn/` utifrån `avsnitt/_mall/`. Uppdatera `harriets-favoriter.md` med avsnittsnumret.
- **Innehåll för små barn:** korta meningar, upprepning, pauser för interaktion, inget läskigt. Problem löses med hjälp av kompisar.
- Filnamn: små bokstäver, bindestreck, inga å/ä/ö.

## Kontroll
`python3 verktyg/prompt.py --lista` ska lista alla figurer, platser och saker utan fel.
