# Gröna traktorn, öppen

Lovas traktor i 014: samma gröna traktor som i Shorten (`traktor-gron`), men utan hytt, så att Lova syns från midjan och upp och armarna går fritt (i 007 nådde Bulles armar inte över lastbilens kant). En liten rund leksakstraktor från sidan, vänd åt höger: kort rundad motorhuv med ett grått avgasrör (putt, putt), ett lågt öppet säte bakom en liten puckel, ett stort bakhjul och ett litet framhjul med gula fälgar. Gräsgrön (`#3FA34D`), en ton mörkare än Gurra (`#6DBE45`). Inget ansikte och inga konturer, så den inte förväxlas med Traktorn Tuff (blå, med ansikte).

Över sätet en hytt som bara är ett grönt tak på två tunna stolpar, utan dörrar och fönster och med öppna sidor (Sanna, 2026-11-05): småbarn känner igen en traktor på hytten, och Lovas armar syns ändå genom de öppna sidorna. Kritan ritar taket som sista ledtråd. Lova sitter bakom karossen med tassarna fria ovanför puckeln. Hjulen klipps ut var för sig så att de kan snurra i kod. Flaggan är `flagga-rosa` omfärgad till grön i kod.

Gjord i Google Flow (Nano Banana, 0 krediter) med Shortens traktor och bruna lastbilen som stilreferens. Bilderna ligger i `assets/rekvisita/traktor-gron-oppen/`.

Används i: 014 Gröna sången.

**Vald bild (Sanna, 2026-11-05):** v1, med fälgarna omfärgade från gult till ljusgrått (grön traktor med gula fälgar är ett känt traktormärkes färger). Originalet med gula fälgar ligger kvar som `traktor-gron-oppen-v1-gula-faelgar.jpeg`, v2 är reserv.

Utklippen i `cut/` (vit kant 7 px, 1 % av höjden): `traktor-gron-oppen.png` (hel), `-ryggstod.png` och `-fram.png` (samma kaross delad bakom och framför Lova), `-bakhjul.png` och `-framhjul.png`. Lager, sätet, avgasröret och hjulens vridpunkter står i `traktor-gron-oppen-rigg.json`. Lova i sätet: `assets/karaktarer/leoparden-lova/i-traktorn/`.

**Med tak (Sanna, 2026-11-05):** v1 av redigeringen av den valda bilden (taket på två stolpar lades till, kaross och hjul är kvar på samma pixlar). Utan tak: `traktor-gron-oppen-utan-tak.png` (och `cut/`), reserv: `traktor-gron-oppen-tak-v2.jpeg`. Prompten ovan beskriver traktorn med tak från början. Bakre stolpen ligger i `-ryggstod.png` (bakom Lova), taket och främre stolpen i `-fram.png` (framför henne).

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly, not the vehicles. Draw a single small round toy tractor seen exactly from the side, facing right, very minimal and childish like a toddler's crayon drawing. NO black outline. One chunky rounded body in bright grass green wax crayon (#3FA34D): a short rounded bonnet at the front on the right with a short thin dark grey exhaust pipe sticking straight up from it, and behind it a low open driver's seat. Over the seat a simple cab that is only a flat green roof held up by two thin straight grey posts, one at the back of the seat and one at the front of the seat: no doors, no windows, no glass, completely open sides, so a driver sitting under the roof would show from the waist up with free arms. In front of the seat only a small low rounded bump. One very big round dark grey back wheel under the seat and one small round dark grey front wheel under the bonnet, both with a round light grey hub. Mottled, grainy, slightly streaky wax crayon texture with visible paper grain, only a thin uneven white rim around the edge. No driver, no steering wheel, no face, no eyes, no mouth, no text, no logos. Very simple, bold, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground.
```

```delar
tractor body, front wheel, back wheel
```
