# Rosa bilen

Musens bil, öppen utan tak. En enda rosa klump med en grop där föraren sitter, en hallonrosa rand nertill, en ljusblå vindruta och stora svarta hjul med rosa nav. Inget ansikte och inga konturer. Den är ljusare rosa än glasskioskens vägg (`#F06EAA`), så att den syns mot den. Bussen och traktorn användes som stilreferens.

Bilen är delad i kaross, kant, ratt, framhjul och bakhjul (se `assets/rekvisita/rosa-bilen/rosa-bilen-rigg.json`). Hjulen snurrar i kod. Kanten ligger framför föraren, så att hon sitter i bilen, och ratten sitter tätt bakom vindrutan.

Avgasröret är ritat i kod (`avsnitt/005-rosa-bilen/scener/bilen.js`), inte i bilden: ett kort grått kritrör längst bak, under karossen. Ur det kommer vita kritpuffar när bilen brummar och medan den kör (`bil.puffa(t, tider)`). Bilen har ingen ratt i 005 (se storyboarden).

Används i: 005 Rosa bilen.

```prompt
A small open-top pink car seen from the side, facing right, very minimal and childish like a toddler's crayon drawing. One short, round, chunky blob body in light bubblegum pink crayon (lighter than #F06EAA), with a low dip in the top where the driver sits. In front of the dip, one small light blue rounded window block as the windscreen. One simple raspberry pink crayon stripe along the bottom of the body. Two big plain black round wheels with a small pale pink centre. No face, no eyes, no mouth, no door lines, no heart, no lights, no outline, only a thin chalky white rim around the edge.
```

```delar
car body without wheels, front wheel, back wheel, front seat edge (in front of the driver), steering wheel
```
