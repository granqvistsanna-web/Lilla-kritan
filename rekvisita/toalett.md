# Toaletten

En låg, knubbig toalett sedd rakt framifrån i ögonhöjd, i art direction v2: en kort rundad cistern baktill med en stor rund spolknapp ovanpå (`#B8C6D4`), locket uppfällt som en mjuk oval mot cisternen, en rund skål framtill som smalnar till en kort fot. Varmt mjukvit (`#F8F6F1`) med svag blågrå kritkant (`#C9D3DE`) på varje form så att den syns mot det vita golvet. Insidan syns aldrig. Inget ansikte. Ren fyllning med svagt kritkorn och vit klistermärkeskant.

**I 060:** står i badrummet mellan handfatet och pottan. Kaninen tömmer pottan i den: pottan lyfts över skålens kant och tippas stelt ca 35° bort från kameran, så att öppningen aldrig syns, och går över kanten, aldrig genom den. Kaninen sträcker upp en tass och trycker på knappen, som sjunker 6 px (rita knappen som eget lager i kod ovanpå, eller flytta en utklippt bit av den).

**Storlek i bild:** bilden är högre än kaninen. Skålens kant ska ligga ungefär i höjd med kaninens mage så att den når upp till knappen med en sträckt tass (`upp`). Skalan sätts i scenen.

**Mått i urklippet `assets/rekvisita/toalett/cut/toalett.png` (534 × 829 px):**
- Vit kant 8 px (ca 1 % av höjden). **Inte `tunn_kant.py` rakt av:** den gör vita ytor inne i saken blågrå och tappade skålen (konturen har en lucka till höger). Fyllningen togs i stället från siluetten i det tjocka klippet minus dess inbakade kant (ca 18 px), färgerna orörda, och den nya kanten räknades som i `tunn_kant.py`.
- Spolknappen sitter överst i mitten (ca x 205–330, y 25–100 i urklippet).

Används i: 060 Kaninen går på pottan.

**Bilder (2026-11-27, Google Flow, Nano Banana 2.1, 1:1, 0 krediter, stilreferens handfatet och pottan v3):** fyra tagningar i `assets/rekvisita/toalett/original/toalett-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`. **Vald nr 2 (Sanna 2026-11-27).** Kopierad till `toalett.jpeg`, utklippt med `verktyg/egen_kant.py` (det tjocka klippet i `original/toalett-cut-tjock-kant.png`), kanten 8 px som ovan.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE low, chubby, friendly toilet seen exactly straight from the front at eye level, so the inside of the bowl is NOT visible at all, only the outside: very simple and childish. A short rounded cistern tank at the back with one big round flush button on its flat top, a soft rounded bowl in front that narrows to a short sturdy foot at the bottom, and the seat lid folded UP, standing upright against the tank as a soft rounded oval. All in warm soft white (#F8F6F1) with a faint pale blue-grey crayon edge (#C9D3DE) on every shape so it stands out on a white floor, and the round flush button in pale blue-grey (#B8C6D4). The top edge of the bowl is a clean simple line with no opening and no inside showing. No water, no pipes, no paper, no face, no text, no pattern, no 3D, no shine, no shading, no outline. A thick, clean, even white sticker border all around. Centered, the toilet fills about 65 percent of the frame height, plain pure solid white background, no shadow, no ground.
```
