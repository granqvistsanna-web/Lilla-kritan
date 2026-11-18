# Fläkten

En liten bordsfläkt som en badleksak, sedd rakt framifrån: ett stort runt huvud med en tjock ring i smörgult (`#F6C945`), en kort tjock hals och en bred rund fot i samma gula. Bakom gallret tre breda, mjukt rundade blad i gräddvitt (`#FFF4E2`) kring ett litet runt nav i solig orange (`#F6A83B`). Ren fyllning med svagt kritkorn och vit klistermärkeskant. Inget ansikte, ingen sladd, inga vindlinjer.

**I 041:** kritan ritar den vid dörröppningen i vänster kant, vänd mot karet (*"Titta! Kritan ritar igen. … En fläkt!"*). Konturen: foten, halsen, ringen, sedan bladen. Bladen snurrar lugnt och jämnt när den blåser in doften av pepparkakor från köket. Själva fläkten står still och vänds aldrig.

**Två urklipp:**
- `assets/rekvisita/flakt/cut/flakt.png`: hela fläkten som bilden, med gräddvit fyllning inne i gallret. Till ritintrots ifyllnad och stillbilder.
- `assets/rekvisita/flakt/cut/flakt-ram.png`: bara ringen, halsen och foten. Insidan av ringen är genomskinlig (mitt `[381, 380]`, innerradie 309 px i urklippets 761 × 923). **Bladen, korset och navet ritas i kod** bakom och i ringen, så att bladen kan snurra: tre gräddvita rundade blad (radie ca 110, 150 px från mitten), ett smörgult kors (12 px) ovanpå bladen och det orange navet (radie 60) överst.

Kanten är tunnad till 9 px (1 % av höjden) med `tunn_kant.py 9`. Den tjocka kanten ligger kvar i `original/flakt-tjock-kant.png`.

Används i: 041 Kaninen badar varmt.

**Bilder (2026-11-18, Google Flow, Nano Banana 2.1, 0 krediter, stilreferens badbåten och pallen):** fyra tagningar i `assets/rekvisita/flakt/original/flakt-1…4.jpeg`, sida vid sida i `jamforelse.jpg`. Vald nr 1 (Sanna 2026-11-18), utklippt till `cut/flakt.png`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE small toy-like electric desk fan seen exactly straight from the front, very simple and childish: a big round fan head with a simple round cage made of a few thick soft rings and spokes in warm butter yellow (#F6C945), behind it three wide, soft, rounded fan blades in cream white (#FFF4E2) around a small round sunny orange hub (#F6A83B), a short thick neck and a wide round flat foot in the same butter yellow. Chunky friendly shapes like a bath toy, the round head about twice as wide as the foot. No face, no buttons, no cable, no wind lines, no text, no numbers, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole fan. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```
