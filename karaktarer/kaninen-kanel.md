# Kaninen Kanel

**Art:** kanin · **Favoritsak:** kanin 🐰 · **Status:** ✅ Referensark klart

## Utseende
- Form: en enda sned, rund kritklump (huvud och kropp i ett), två långa öron: vänster står upp, höger hänger ner. Små armstumpar, korta ben och stora ovala fötter.
- Färger: klarrosa (`#F25C9A`) i kraftig vaxkrita, ljusrosa (`#F9A8C8`) inuti öronen, liten rosa svans.
- Kännetecken: hängörat. Väldigt minimal: inga hårstrån, ingen halsduk, inget på magen.

## Personlighet
- Glad och hoppig. Älskar äpplen och morötter.
- Är bra på att hitta saker och räknar gärna: *"Ett, två, tre – hopp!"*

## Röst och repliker
- Röst: glad och lite fnissig.
- Återkommande replik: *"Ett, två, tre – hopp!"*
- Ljud: mjuka duns när hon hoppar.

## Cut out-delar
```delar
body without arms and legs, left arm, right arm, left leg with foot, right leg with foot (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/kaninen-kanel/`](../assets/karaktarer/kaninen-kanel/): framifrån, utan ansikte, kropp utan lemmar, trekvart, sida, bakifrån och på alla fyra, utklippta i `cut/`. Vridpunkter för armar och ben finns i `kanel-rigg.json`, ögonen sitter på (413, 401) och (604, 398) med radie 26. `rigg-test.html` visar henne vinka, gå, hoppa och blinka. Delarna görs med `verktyg/delar.py`.

## Prompt
```prompt
Kanel the rabbit: one big slightly lopsided round blob (body and head in one), bright bubblegum pink (#F25C9A) heavy wax crayon with streaky strokes and paper grain, no outline, a thin uneven white rim, two long ears (left one up, right one flopping over) with light pink (#F9A8C8) insides, two round white eyes ringed in black with small black pupils, a tiny pink nose, two tiny arm nubs, two short legs with big oval feet. Very minimal: no hair, no clothes, no marks.
```
