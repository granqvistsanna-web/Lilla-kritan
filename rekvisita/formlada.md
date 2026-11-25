# Formlådan

En låg, bred formlåda i varmt honungsträ (`#D9A35F` ungefär), sedd framifrån och lite uppifrån, så att locket syns som en ljusare yta (`#EBC07E`). I locket finns tre hål i rad: ett runt, ett fyrkantigt och ett trekantigt, mörkt varmbruna inuti (`#5A3A24`). Framsidan har några svaga ådror i kritan. Ingen mörk kontur, vit klistermärkeskant.

**I 053:** kritan ritar den på golvet bredvid leoparden (*"En låda! Med tre hål."*). Klossarna glider upp över sina hål och sjunker rakt ner i dem. Klossen klipps vid hålets form och lockets framkant, så att den aldrig går genom lådans sida. Lådan står still. Den vickar bara när den skramlar (±3°).

**Urklippet:** `assets/rekvisita/formlada/cut/formlada.png` (1131 × 815). Den ritade kanten var ca 21 px (2,6 %) och är tunnad till 8 px med `tunn_kant.py 8`, ca 1 % av höjden. Den tjocka kanten finns i `original/formlada-tjock-kant.png`. Kontrollerad mot mörk bakgrund.

**Mått i urklippet (px):** lådan x 14–1116, y 13–799. Hålen (mörka ytan):
- runt hål x 200–385, y 89–174
- fyrkantigt hål x 471–662, y 87–173
- trekantigt hål x 764–931, y 89–170

Lockets ljusa yta går ned till ungefär y 255, och där börjar framsidan. Mät exakt när masken görs.

**Kontur för kritan:** görs vid bygget med `verktyg/kontur.py` (ytterformen). Lockets kant och de tre hålen läggs till som egna drag, så att lådan går att gissa innan den fylls i (skillen `kritan-ritar`).

Används i: 053 Leoparden städar.

**Bild (2026-11-25, Google Flow, Nano Banana 2.1, 0 krediter, 4:3, stilreferenser `korg/cut/korg-v3.png` och `sangen/cut/sangen.png`):** fyra tagningar i `assets/rekvisita/formlada/original/formlada-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`. Sanna valde nr 2.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE simple children's wooden shape-sorter box standing on the floor, seen straight from the front: a low, wide box with softly rounded corners in warm honey wood (#D9A35F), about one and a half times wider than tall. The lid is seen a little from above as one flat, slightly lighter honey band (#EBC07E) along the top, and in the lid there are exactly THREE holes in one neat row, evenly spaced and clearly separate: on the left a round CIRCLE hole, in the middle a SQUARE hole, on the right a TRIANGLE hole pointing up. Each hole is filled with flat dark warm brown (#5A3A24) so it reads as an opening. The front of the box is plain with one or two faint wood-grain crayon lines. No toys, no blocks, no letters, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole box. Centered with space around, the box fills about 70 percent of the frame width, plain pure solid white background, no shadow, no ground, no text.
```
