# Julklappspapperet

Ett platt ark julklappspapper sett rakt ovanifrån, som ett klistermärke: en rundad rektangel, ca 1,2 gånger så bred som hög, i varmt rött (`#D9382E`, samma som [paketen](paket.md)) med små krämvita kritprickar utspridda över hela arket. Inga veck, ingen rulle, inget band, inget ansikte. Platt krita med fint korn och vit klistermärkeskant.

**I 048:** kritan ritar arket på golvet framför granen (konturen ca 4 s, gisspaus, arket fylls i), och [rosetten](rosett.md) sist i övre högra hörnet. Arket glider över hunden i tittut-leken. Vid inslagningen ligger saken mitt på arket, och två flikar i kod (samma bild, beskuren) viks över från vänster och höger innan det inslagna tonar över till paketbilden. Prickarna och den röda färgen matchar `paket-rund`, så övergången syns knappt. Vänds aldrig.

**Mått i urklippet `assets/rekvisita/julklappspapper/cut/julklappspapper.png` (799 × 641 px):**
- Hela bilden med vit kant: x 12–786, y 12–627. Vit kant 8 px.
- **Mitten, där saken landar: (399, 320).**

**Konturen:** `assets/rekvisita/julklappspapper/cut/julklappspapper-kontur.json` (`verktyg/kontur.py … --krymp 8`), en sluten bana, 57 stödpunkter, bbox [12, 12, 775, 616]. Kritan ritar konturen, sedan fylls bilden i (`rita.js`).

Används i: 048 Hunden slår in julklappar.

**Bilder (2026-11-21, Google Flow, Nano Banana Pro, 0 krediter):** bild 1 = `assets/rekvisita/paket/cut/paket-rund.png`, bild 2 = `assets/rekvisita/stjarna-gul/original/stjarna-gul-2.jpeg`, båda som stilreferens. Fyra tagningar i `assets/rekvisita/julklappspapper/original/julklappspapper-1…4.jpeg`, sida vid sida med `paket-rund` i `original/jamforelse.jpg`. **Vald nr 4** (Sanna 2026-11-21): mörkast röd och prickarna närmast `paket-rund`. Kopierad till `assets/rekvisita/julklappspapper/julklappspapper.jpeg`, utklippt med `verktyg/egen_kant.py` och kanten satt till 8 px med `verktyg/tunn_kant.py`. Kontrollerad mot mörkblå bakgrund (`original/kontroll-mork.jpg`).

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon and oil-pastel fill with fine speckled paper grain and soft mottled crayon strokes, only a faint slightly darker crayon edge, no dark outline, no smooth digital shading, clean white sticker border), not their subjects. Copy the red colour and the light dot pattern of the gift wrap in image 1. Draw ONE flat sheet of gift wrapping paper seen exactly straight on from above, completely flat like a sticker, very simple and childish like a toddler picture-book drawing: one single rectangle with softly rounded corners, about 1.5 times as wide as it is tall, in warm bright red (#D9382E) mottled grainy wax crayon, with small round light cream dots scattered evenly all over it, about 30 dots, each dot a small soft crayon blob. The sheet lies perfectly flat: no folds, no curl, no rolled edge, no creases, no shadow, no perspective, no 3D. NO ribbon, no bow, no tape, no box, no gift, no text, no face. A thick, clean, even white sticker border all around the whole sheet. Centered, the sheet fills about 70 percent of the frame width with empty white space around, plain pure solid white background, no shadow, no ground.
```
