# Skogen

**Väggfärg:** pale mint `#BFE6C8` · **Används till:** Tittut (första filmen: Kaninen Kanel), lek i skogen

Platsen för Tittut. Själva bakgrunden är nästan tom: mintgrön vägg, vitt golv och några bleka träd långt bort ute vid kanterna. Gömställena görs som **egna urklipp** (nedan), så att Kanel kan ligga bakom dem och sticka fram. Mintgrönt valdes för att Kanels bruna öron och fötter ska synas tydligt mot väggen och golvet.

Spara bakgrunden i `assets/bakgrunder/skogen/` och gömställena i `assets/bakgrunder/skogen-saker/`. För gömställena är bild 1 ett godkänt urklipp för stilen, till exempel palmen eller de vita blommorna i `assets/bakgrunder/vagen-saker/`.

```prompt
Two-zone picture: a flat pale mint green wall (#BFE6C8) with grainy oil pastel texture filling the top two thirds, a straight horizon line, and a plain off-white floor (#FAF8F2) below. On the wall, only at the far left and far right edges: two or three simple soft round-crowned trees far away, painted flat in a slightly darker muted green, low contrast, like a quiet distant forest. On the floor: a few small tufts of green grass at the edges. The whole centre is completely empty, plenty of empty white floor for characters and props. No characters, no animals, no shadows, no text.
```

**Bilder (2026-11-06, OpenArt Nano Banana 2, image2image).** Först gjordes allt med `kolavarld-v2` och `hink-bla` som stilreferens (v1/v2). Sedan gjordes de valda om med **`kanel-ny` och `duckling-crayon` som stilreferens** (`-krita`), för att få grövre vaxkrita, ingen mörk kontur och tydligare vit kant. Grisen (`gris-rosa`) är ingen bra stilreferens och ska inte användas.

Två bilder från samma skog, med **tre gömställen i varje**:

| Bild | Bakgrund | Gömställen |
|---|---|---|
| Skogen 1 | `assets/bakgrunder/skogen/skogen.png` (= `skogen-krita.png`) | busken, stenen, stocken |
| Skogen 2, längre in i skogen, med stig | `assets/bakgrunder/skogen-2/skogen-2.png` (= `skogen-2-v2.png`) | lövhögen, trädet, stubben |

- Båda är 2752×1536, och golvlinjen ligger på ca 66 % av höjden. Äldre tagningar ligger kvar i mapparna (`skogen-v1` är den släta versionen).
- Gömställena är urklippta med `cutout.py … 14` (bredare vit kant än standardens 8 px): `assets/bakgrunder/skogen-saker/buske.png`, `sten.png`, `stock.png`, `lovhog.png`, `trad.png`, `stubbe.png`. Alla tagningar ligger i `skogen-saker/original/`.
- Den ihåliga stocken är öppen i båda ändarna, så Kanel kan titta ut ur vilken ände som helst.
- `skogen/test-tre-saker.jpg` och `skogen-2/test-tre-saker.jpg` visar varje bild med sina tre saker.
- **Trädet har bred stam** (`trad-bred-v1`, gjord om från `trad-krita`). Lägg det stort, ca 1150 px högt i 1920×1080, så att kronan går ut ur bild upptill. Då är stammen bredare än Kanel, hon försvinner helt bakom den (se `skogen-2/test-tre-saker.jpg`, där Kanel står bakom). Det gamla smala trädet ligger kvar som `original/trad-krita.png`.

## Gömställena

Sex saker, tre per bild. Alla ska kännas trygga och mjuka, som saker ett barn ser på promenaden. Inget mörkt hål och ingenting som ser vasst ut. Storlekarna gäller i bilden 1920×1080, där Kanel är ungefär 450 px hög med öronen och 300 px utan.

| Sak | Storlek i bild | Hon kommer fram (Tittut) | Varför den |
|---|---|---|---|
| Busken (skogen 1) | ca 520 × 360 | `upp`: upp ovanför busken | rund och mjuk, hon försvinner helt bakom den |
| Stenen (skogen 1) | ca 480 × 330 | `sida`: ut vid sidan | enkel form med tydlig kant att titta fram bakom |
| Trädet (skogen 2) | ca 1150 px högt, kronan går ut ur bild | `sida`: ut vid sidan av stammen | det enda höga, och stammen är bredare än Kanel |
| Stocken (skogen 1) | ca 620 × 260 | `ur`: huvudet ut ur ena änden | roligt att krypa in i |
| Lövhögen (skogen 2) | ca 560 × 480 | `upp`: upp ur högen, löv yr upp | löven som flyger upp är dekoration i kod |
| Stubben (skogen 2) | ca 520 × 300 | `upp`: upp ovanför | låg och bred, med en platt topp |

**Busken:**
```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: ONE big round friendly bush seen from the front, wider than tall, made of three or four soft overlapping round lumps like a cloud, with a flat bottom that sits on the ground. Bright fresh grass green crayon (#5DB04E) with a few lighter green crayon curls for leaves and two or three tiny white flowers on it. No branches sticking out, nothing pointy. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame left to right, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Stenen:**
```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: ONE big smooth round boulder seen from the side, wider than tall, like a soft lopsided pebble with a flat bottom that sits on the ground. Soft warm light grey crayon (#B9B4AC) with a few slightly darker grey crayon speckles, one white crayon highlight stroke on top and a small tuft of green moss on one side. No cracks, no sharp edges. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame left to right, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Trädet:**
```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: ONE tall friendly tree seen from the front. A thick, straight, slightly wobbly trunk in warm medium brown crayon with a few darker brown crayon lines, a little wider at the foot. On top a big round fluffy crown made of soft round lumps like a cloud, in leafy green crayon (#4FA34A) with lighter green crayon curls. No hole in the trunk, no fruit, no birds. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame top to bottom, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Stocken:**
```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: ONE fat round hollow log lying on its side on the ground, seen from the side and a little from the front, much wider than tall. Warm caramel brown bark crayon with a few darker brown crayon lines along it. The right end is open and shows a round light tan cut face with soft crayon rings and a round opening in the middle filled with warm dark brown, not black. A small green leaf sprouting on top. Nothing pointy. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame left to right, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

**Lövhögen:**
```prompt
Image 1 is a STYLE reference only: copy its soft wax-crayon technique exactly (mottled grainy streaky crayon fill, visible paper grain, NO black outlines, thin uneven white rims), not its subject. Draw a single prop for a toddler cartoon: ONE big soft round pile of autumn leaves on the ground, like a dome, about as tall as it is wide, with a flat bottom. Made of many simple rounded leaf shapes overlapping, in warm orange (#F28D3C), yellow (#F4D252) and soft red crayon, with a few single leaves lying loose at the foot of the pile. Very simple, bold, flat colors, for 2-year-olds, like a cut-out sticker with a thin uneven white rim all around. Fills the frame left to right, centered on a pure solid white background, no ground, no shadow, no characters, no text.
```

Klipp ut varje sak med `cutout.py` (skill `crayon-cutout`). Den runda öppningen i stocken är mörkbrun och inte vit, så den blir inte genomskinlig. Det är rätt, för Kanels huvud läggs ovanpå den.
