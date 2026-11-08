# Rosa bilen, art direction v2

Avsnitt 005 (Rosa sången). Gjord 2026-11-08 i Google Flow (Nano Banana 2.1, image2image) med den röda v2-bilen
`assets/stiltest-premium/bil/hel-b.png` som referens; Sanna valde take 2.

| Fil | Vad |
|---|---|
| `original/rosa-bil-v2-1..3.jpg` | De tre tagningarna (1200 × 896), `original/tagningar.jpg` = kontaktarket |
| `cut/rosa-bil-v2-med-ratt.png` | Take 2 urklippt med `verktyg/egen_kant.py`, ratten kvar, den ritade kanten (ca 19 px), fronten åt vänster |
| `cut/rosa-bil-v2.png` | **Den som används:** ratten borttagen (`utan_ratt.py`), spegelvänd (fronten åt höger som v1-bilen), kanten 7 px (`verktyg/tunn_kant.py 7`) |
| `kontroll-005.jpg` | Stillbilder ur vägen 1, vägen 2, kiosken och refrängen med bilen inkopplad |

Prompten (bild 1 = hel-b.png): *"Edit Image 1. Keep the toy car EXACTLY the same … ONLY change the colour of the car body from red to a
soft candy pink (#F3A2BD), with a slightly darker rose pink (#D9789C) for the faint crayon edge along the bottom and the light crayon strokes."*

## Mått i `cut/rosa-bil-v2.png` (1031 × 653, fronten åt höger)

- **Bbox** (kanten med): x 15–1015, y 87–637.
- **Hjulen:** bakhjul (267.5, 512), framhjul (758.5, 512), radie 117 (däckets kant; klipp 110 för en snurrande kopia).
- **Sätet** (gräddvita öppningen): x 87–734, y 120–200; nederkanten y ≈ 200 i mitten (186 vid x 680). Allt under y 200 och till höger om
  x 728 är bilens sida och front framför figuren.
- **Sittpunkt:** mitt i sätet ca (520, 200); ratten satt runt x 600–720 innan den togs bort, där kan en kodratt stå.
- **Avgasröret** finns i bilden, mynningen ca (30, 442).
- Kanten 7 px valdes så att den blir lika tjock som v2-Milles (ca 10 px × 0,62) när bilen visas på skala 0,891 i `bilen.js`.

`utan_ratt.py in.png ut.png` målar bort den grå ratten (radvis blandning mellan pixlarna till vänster och höger, så att sätets linjer
följer med), tar bort allt ovanför bilens överkant där ratten stack upp och spegelvänder. Kör `tunn_kant.py` efteråt.
