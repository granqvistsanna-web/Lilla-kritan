# Rekvisita

Saker som figurerna håller i eller använder. De tas fram tillsammans allteftersom avsnitten behöver dem (högst 2 nya per avsnitt, se `format/regler.md`).

## Lägga till en sak

Skapa `rekvisita/<sak>.md` med det här formatet:

````markdown
# Glass

Kort beskrivning, varianter och vilka avsnitt saken används i.

```prompt
A single ..., simple crayon drawing, on a plain white background.
```
````

Generera: `python3 verktyg/prompt.py --sak <sak>`. Spara bilden i `assets/rekvisita/<sak>.png` och lägg till saken i tabellen nedan.

| Sak | Fil | Första avsnitt |
|---|---|---|
| Rosa bilen | [rosa-bilen.md](rosa-bilen.md) | 005 |
| Jordgubbsglass | [jordgubbsglass.md](jordgubbsglass.md) | 005 |
| Rosa flagga | [flagga-rosa.md](flagga-rosa.md) | 005 |
| Rosa luftballong | [luftballong-rosa.md](luftballong-rosa.md) | 005 |
