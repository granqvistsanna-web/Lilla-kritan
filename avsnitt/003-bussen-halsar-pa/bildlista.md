# Bildlista – Avsnitt 003 Bussen hälsar på

Det fasta (intro, outro, papper, kritsvep, ljud) finns i `assets/format/`. Bussen, kaninen, lammet, Busshållplatsen och Bondgården finns redan i `assets/`.

| # | Typ | Vad | Kommando | Klar |
|---|---|---|---|---|
| 1 | Titelkort | Avsnitt 3 · Bussen hälsar på + litet hjul, färgglatt: gul vägg, bokstäver i mörka kritfärger med vit kant | text i redigeringen | ☐ |
| 2 | Teckning | Hjulet som kritan ritar | skapas tillsammans | ☐ |
| 3 | Bakgrund | (Busshållplatsen) + flygplanet långt bort på himlen | `python3 verktyg/prompt.py --plats busshallplatsen --scen "a tiny plane far away in the sky"` | ☐ |
| 4 | Bakgrund | (Bondgården) + två fjärilar | `python3 verktyg/prompt.py --plats bondgarden --scen "two small butterflies near the hay"` | ☐ |
| 5 | Ny pose | Kaninen i bussfönstret (huvud och axlar) | `python3 verktyg/prompt.py kaninen-kanel --scen "only head and shoulders, looking out of a round bus window, happy"` | ☐ |
| 6 | Ny pose | Lammet i bussfönstret (huvud och axlar) | `python3 verktyg/prompt.py lammet-ludde --scen "only head and shoulders, looking out of a round bus window, happy"` | ☐ |
| 7 | Statist | Traktorn plöjer längst bak på gården och på åkern i körscenen (nu blå, så att den inte krockar med den röda bussen) | återanvänd, omfärgad i kod | ☑ |
| 8 | Bakgrund | Vägen (körscen) | finns redan: `assets/bakgrunder/vagen/` | ☑ |
| 9 | Sak | Äppelträd som glider förbi | klipps ur `assets/bakgrunder/appeltradet/` i kod | ☑ |
| 10 | Sak | Plöjd åkerremsa | ritas i kod i storyboarden; ny kritbild om den ska bli finare (ca 20 krediter) | ☐ |
| 11 | Bakgrund | Glasskiosken, sista stoppet (väggen ljusblå i stället för rosa, så att kaninen syns) | finns redan: `assets/bakgrunder/glasskiosken/`, omfärgas | ☐ |
| 12 | Sak | Glasstrut (rosa, mint och vanilj kula) | ritas i kod i storyboarden; kritbild ca 20 krediter | ☐ |

## Kamerainställningar (8, två över regeln)
1. Busshållplatsen, helbild: Bussen rullar in, kaninen hoppar in
2. Närbild på kaninen: glad, "Ett, två, tre – hopp!"
3. Bondgården, helbild: Lammet sover vid höet
4. Närbild på lammet: sover, vaknar under sången
5. Långsam panorering: Bussen kör ett varv runt gården
6. Bondgården, helbild: Bussen stannar, alla tutar
7. Körscen på vägen: äppelträdet och åkern med traktorn glider förbi
8. Glasskiosken, helbild: alla går av och äter glass
