# Småfåglarna

Tre små, runda vinterfåglar sedda från sidan med näbben åt höger: en röd, en gul och en mindre blå (den lilla fågeln). Kort stjärt till vänster, grå näbb och tunna grå ben, en mörkare vinge. Inget ansikte i bilden, ögat ritas i kod (svart prick med vit glans, blinkar). De är **saker, inte figurer** (Sanna 2026-11-18): ingen rigg, de säger bara *pip*.

**Delarna** (`assets/rekvisita/smafaglar/cut/`): kroppen utan vinge `fagel-kropp-rod|gul|bla.png` (800 × 689) och den lösa vingen `fagel-vinge-rod|gul|bla.png` (675 × 606). Den gula och den blå är den röda med flyttad nyans (gul: +0,095, mättnad ×1,05, ljus ×1,35; blå: +0,58, ×0,8, ×1,05), så alla tre har exakt samma form. Hela röda fågeln med målad vinge: `fagel-rod-hel.png`.

**Vinge, näbb och ben i kod (Sanna 2026-11-19: "consider claude code beak + wing", "gör fågel utan näbb", "legs code too"):** kroppen utan näbb och ben är `fagel-kropp-rod|gul|bla-kod.png` (bara urklippets färgade pixlar, ny vit kant; Flow svarade inte). Vingen (rundad vante med tre spetsar), näbben (övre och undre käke, öppnas på pip och pick) och benen (raka på marken, indragna i flykten) ritas av `avsnitt/043-grisen-matar-faglarna/fagel.js`. Prov: `avsnitt/043-grisen-matar-faglarna/prov/flyg-kod/`.

**Vingen som bild (första provet, ersatt):** roten (150, 140) i vingens bild sitter på (310, 230) i kroppens ruta, skala 0,42. Vila 0°, slaget går från +20° (ner under magen) till −115° (upp över ryggen), 4 Hz, uppslaget långsammare än nedslaget, och vingen trycks ihop lite i höjdled i nedslaget. Ögat: (632, 237) i kroppens ruta, 44 px. Flygprovet: `avsnitt/043-grisen-matar-faglarna/prov/flyg/` (`flyg-nara/` är samma i närbild).

**Bild (2026-11-18, Google Flow, Nano Banana Pro, 0 krediter):** stilreferenser `tomteluva-1.jpeg` och `julgran-1.jpeg`. Tagning 2 vald (Sanna). Kroppen utan vinge är Flows redigering av tagning 2 (tagning 2 av 2), vingen är en egen bild med tagning 2 som referens (tagning 1 av 4). Allt i `original/`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE tiny, chubby, round little winter songbird seen exactly from the side, facing right, very simple and childish like a toddler picture-book drawing: an almost round body like a soft ball with a short neat tail at the left, a soft warm red breast and belly (#D9483B) and a slightly darker warm red-brown back, a small pointed dark grey beak at the right, two short thin dark grey legs with tiny feet standing straight down. One small rounded wing in a darker crayon tone lies flat on the side of the body, clearly separate in colour so it can be cut out. No eyes, no face, no mouth, no pattern, no text, no 3D, no shine. A thick, clean, even white sticker border all around the whole bird. Centered, the bird fills about 55 percent of the frame width, plain pure solid white background, no shadow.
```

Används i: 043 Grisen matar fåglarna.
