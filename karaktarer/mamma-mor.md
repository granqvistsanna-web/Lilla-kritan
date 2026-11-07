# Mamma Mor

**Art:** mamma (människa) · **Favoritsak:** – · **Status:** ✅ Referensark klart (valt 2026-11-07)

## Utseende
- Form: en högre och smalare, lite sned äggform (huvud och kropp i ett), ungefär 1,4 gånger så hög som Olle. Små armstumpar och korta ben.
- Färger: ljust persikofärgad krita upptill, en enkel senapsgul klänning (`#F4D252`) nedtill, små bruna skor.
- Kännetecken: mörkbrunt hår med en rund knut på toppen och runda rosa kinder som Olle.

## Personlighet
- Varm och lugn. Blir lätt förvånad, men ställer alltid till rätta.

## Röst och repliker
- Röst: mjuk och varm vuxenröst.
- Återkommande replik: *"Varsågod!"*
- Ljud: –

Olles mamma. Sången kallar henne "mor". Första avsnittet: 017.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg, right leg (eyes and mouth are drawn in code, the rosy cheeks stay in the art)
```

Bilderna ligger i [`assets/karaktarer/mamma-mor/`](../assets/karaktarer/mamma-mor/): `mor.png` (framifrån, med ansikte), `mor-faceless.png` (utan ögon och mun, kinderna kvar) och `mor-body.png` (utan armar och ben), utklippta i `cut/`. Vridpunkter i `mor-rigg.json`. Ögonen sitter på ungefär (414, 401) och (605, 398) med radie 26, och munnen på (510, 451), ungefär 57 px bred (uppmätt mot den ansiktslösa bilden). Hon är lika stor som Olle i bilden: skala henne till ca 1,4 gånger Olles höjd i scenerna.

**Armar och ben är ritade i kod** (`ritadeDelar`): kroppen klipps fram ur den ansiktslösa bilden och lemmarna ritas med `verktyg/rita-lemmar-manniska.py` (ärm i tröjans/klänningens färg med rund hand, ben med sko, färgerna tagna ur bilden). Kör om den om bilden byts:
`~/.claude/skills/ai-video/.venv/bin/python -I verktyg/rita-lemmar-manniska.py assets/karaktarer/mamma-mor mor`. Förhandsvisning: `assets/karaktarer/olle-mor-rigg.jpg`. De andra utkasten ligger i `utkast/`.

## Prompt
```prompt
A kind mother in the house crayon style: ONE tall, slightly lopsided egg-shaped blob (head and body in one), a bit taller and narrower than a toddler, no black outline, the upper part warm light peach skin wax crayon and the lower part a simple mustard-yellow dress (#F4D252), mottled grainy streaky texture with paper grain and a thin uneven white rim. Dark brown hair with one round bun on top, two round rosy pink cheeks, two round white eyes ringed in black with small black pupils, a small warm smile. Tiny stubby yellow arm nubs, two short peach legs with small brown shoe tips. No jewellery, no apron.
```
