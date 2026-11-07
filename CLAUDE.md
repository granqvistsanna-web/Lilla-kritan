# Lilla Kritan – instruktioner för AI-assistenter

Repot innehåller allt material för YouTube-kanalen *Lilla Kritan*: tecknade cut out-filmer med sånger och berättelser för små barn (ca 1–4 år).

**Lilla Kritan är världen, inte en figur.** Det finns ingen programledare. I ramen ritar en krita utan ansikte och en berättarröst (BERÄTTAREN i manus) pratar till tittaren.

## Konventioner
- **Format först:** varje avsnitt följer `format/` – fast intro (logotyp, avsnittsnummer, titel) och outro, max 3 figurer och 2 platser, övergångarna zoom in, kritsvep och zoom ut (plus molnövergången och kritirisen, se `format/regler.md`). Föreslå aldrig manus som bryter mot `format/regler.md` utan att säga det.
- **Stil:** nya och omgjorda figurer, platser och saker följer **Lilla Kritan art direction v2** (`stil/art-direction-v2.md`). `stil/stilguide.md` är v1 och gäller det som inte gjorts om än.
- **Rekvisita** skapas tillsammans med användaren. Lägg inte till saker i `rekvisita/` på eget initiativ.
- **Assets** (bilder, ljud) levererar användaren. Skapa inte bilder utan att bli ombedd.
- **Språk:** allt innehåll (manus, sånger, dokumentation) skrivs på svenska. Bildprompter (```` ```prompt ````- och ```` ```delar ````-block) skrivs på engelska.
- **Upphovsrätt:** nämn aldrig befintliga serier, figurer eller varumärken i prompter, manus eller sånger. Beskriv stilens egenskaper istället (se `stil/stilguide.md`). Sångerna ska vara egna, inte nya texter till kända melodier.
- **Figurer är låsta:** ändra inte utseende eller prompt för en figur vars status är `✅ Referensark klart`, om användaren inte uttryckligen ber om det.
- **Nya figurer, platser och saker** följer formatet i `karaktarer/_mall.md`, `bakgrunder/*.md` och `rekvisita/*.md` så att `verktyg/prompt.py` kan läsa dem. Lägg också till dem i respektive README.
- **Nya avsnitt** skapas som `avsnitt/NNN-kort-namn/` utifrån `avsnitt/_mall/`. Uppdatera `harriets-favoriter.md` med avsnittsnumret.
- **Inga djurnamn i det som sägs eller sjungs.** Djur kallas alltid vad de är: kaninen, lammet, kon, leoparden, lejonet (på engelska "the bunny", "the lamb"). Det gäller repliker, berättarröst, röstbanken (t.ex. *"Hej kaninen!"*, *"Var är lammet?"*, filnamn `kanin-hej`), sångtexter, Suno-prompter och YouTube-texter. Namnen i `karaktarer/` (Kanel, Ludde …) är bara interna filnamn.
- **Innehåll för små barn:** korta meningar, upprepning, pauser för interaktion, inget läskigt. Problem löses med hjälp av kompisar.
- Filnamn: små bokstäver, bindestreck, inga å/ä/ö.

- **Produktion:** `produktion/` är arbetsflödet från piloten Lilla Kvack. Skripten använder relativa sökvägar, så flytta inte mapparna inuti. Skills för arbetet finns i `.claude/skills/` (`ai-video`, `crayon-cutout`). Nya figurer i art direction v2 görs och riggas med skillen `lk-figur`.

## Kontroll
`python3 verktyg/prompt.py --lista` ska lista alla figurer, platser och saker utan fel.
