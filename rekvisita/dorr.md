# Dörren

En liten stugdörr sedd rakt framifrån. Dörren är röd och rundad upptill (`#B8432F`), med ett litet mässingshandtag till höger och en grön julkrans med röd rosett. Den sitter i en tjock varmvit karm och har ett grått trappsteg av sten. Det finns två bilder som ligger exakt på varandra: **stängd** (`dorr.png`) och **öppen** (`dorr-oppen.png`). I den öppna syns ett varmt, gyllene ljus inifrån (`#E9A54A`), och dörrbladet, kransen och handtaget är borta. Sanna ville ha den 2026-11-12 ("lucia kanske ska knacka på en dörr för att sjunga").

**I julkalendern:** lucka 13. Lammet (Lucia) knackar på grisens dörr, och dörren öppnas när grisen tittar ut. Byt från stängd till öppen bild med ett litet pop, så som paketlocket gör. Grisen står i öppningen, framför det gyllene ljuset. Dörren vänds aldrig.

**Urklippen:** `assets/rekvisita/dorr/cut/dorr.png` och `dorr-oppen.png`, 1024², med en vit kant på 12 px och samma kontur (överlapp 0,999). **Konturen:** `assets/rekvisita/dorr/cut/dorr-kontur.json` (bbox [221, 75, 582, 875]), gjord med `python3 verktyg/kontur.py --krymp 12`. `dorr-oppen-kontur.json` är en kopia av den. Öppningen i urklippets pixlar är x 304–719 och y 142–877, och trappsteget ligger på y 875–932. En figur som står i dörren har alltså fötterna vid ungefär y 880, mitt i x 512.

**Bild (2026-11-12, Google Flow, Nano Banana Pro, 0 krediter):** Den stängda dörren gjordes med bild 1 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg` och bild 2 = `assets/rekvisita/julgran/original/julgran-1.jpeg` som stilreferenser, och tagning 1 valdes. Den öppna är en redigering av den stängda tagningen 1, och där valdes också tagning 1. Båda är urklippta med `python3 verktyg/klistra.py` och har fått en ny vit kant på 12 px. Tagningarna ligger i `assets/rekvisita/dorr/original/`.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Draw ONE small front door of a cosy cottage, seen exactly straight on from the front, very simple and childish like a toddler picture-book drawing: a tall rounded-top wooden door in warm red (#B8432F) with a small round brass-yellow knob on the right, set in a simple thick off-white door frame, a little grey stone doorstep at the bottom, and a small green Christmas wreath with a red bow on the door. The door is CLOSED. Only the door, its frame and the step, no wall, no house, no windows, no snow, no plants, no people, no face, no text, no shading, no 3D. Each colour is one flat mottled grainy wax crayon fill. A thick, clean, even white sticker border all around the whole door shape. Centered, the door is about twice as tall as wide and fills about 75 percent of the frame height, plain pure solid white background, no shadow.
```

Den öppna (en redigering av den stängda tagningen 1):

```delar
Edit Image 1. Keep the off-white arched door frame, the grey stone doorstep, the thick clean white sticker border, the size, the position and the soft grainy wax-crayon technique EXACTLY the same. ONLY change this: the door is now wide OPEN, so the red door, the wreath and the knob are gone, and inside the arched frame we see the cosy warm inside of the house as one flat warm golden-orange crayon colour (#E9A54A), a little lighter in the middle like warm lamp light, with a few soft grainy crayon strokes. Nothing inside: no people, no furniture, no windows, no lamp, no door leaf, no face, no text, no shading, no 3D, no shadow. Plain pure solid white background outside the sticker border.
```

Används i: julkalendern 2026, lucka 13 (Lucia knackar på grisens dörr).
