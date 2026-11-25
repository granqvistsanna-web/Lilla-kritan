# Citronen Cilla

**Art:** frukt (citron) · **Favoritsak:** cykel 🚲 · **Status:** ⏳ Riggad i v2, inget referensark ännu

> **Art direction v2 (2026-11-25):** kompisen i Kritans ABC C (recept 3, `produktion/youtube/alfabet/abc-c-recept-3/`), i stället för clownen, så att C bara har s-ljudet (citron, cykel, cirkel). Sanna valde **citron utan armar**. Bilderna gjorde Sanna i Google Flow: citronen stående med två korta fötter, och samma bild utan fötter (`assets/karaktarer/citronen-cilla/premium/original/`, kopia i `assets/rekvisita/citron-kompis/`). Fötterna är klippta med `verktyg/delar_diff.py … citron 15 fot-l@440,800 fot-r@585,800` (lång rot in under kroppen), vit kant 11 px (`tunn_kant.py 11`).
>
> **Uttryck, poser och rörelser:** [`premium/uttryck.html`](../assets/karaktarer/citronen-cilla/premium/uttryck.html), clownens sida med samma API (`ansikte`, `pose`, `rorelse`, `?bara=`, `?pose=`, `?rorelse=`, `?film=1`), blinkfrö 37. Armfilerna pekar på en tom bild (`cut/cilla-tom.png`), så att scenkoden för de riggade kompisarna fungerar utan ändring; en vinkning syns bara som kroppens gung. Fötterna är benen: vridpunkter (442, 784) och (581, 780), `FOTTER` 828. **Ansiktet i kod:** ögon (446, 478) och (578, 478), kinder (404, 532) och (620, 532), ett litet leende kring y 540.
>
> Cilla är bara det interna filnamnet. I det som sägs heter figuren alltid **"citronen"**.

## Utseende
- Form: en knubbig, stående citron (bredast nedtill), en liten rundad topp med en kort brun stjälk och ett grönt blad. Två korta, runda fötter i mörkare gul. Inga armar.
- Färger: solgul (`#F7D33A`) med några små mörkare prickar, bladet grönt (`#4FA34A`), fötterna gulorange.
- Kännetecken: citronformen med bladet på toppen, de små fötterna och det runda, snälla ansiktet i kod.

## Personlighet
- Glad och nyfiken, studsar när den blir glad. Vill gärna cykla.

## Röst och repliker
- Röst: inga ord, bara glada ljud (fniss, babbel när den "viskar").
- Återkommande replik: –
- Ljud: fniss, studs.

## Cut out-delar
```delar
body, foot left, foot right, faceless whole figure
```

## Prompt
```prompt
A plump little lemon standing upright like a toddler picture-book friend: a round-bellied upright oval in sunny lemon-yellow (#F7D33A) with tiny darker dimple dots, a small rounded nub on top with a short brown stem and one small green leaf (#4FA34A), and two short, round, stubby feet in a slightly darker warm yellow-orange. No arms. Flat wax-crayon fill with paper grain, a faint slightly darker crayon edge, thick clean white sticker border, plain white background. No face in the image (the face is drawn in code).
```
