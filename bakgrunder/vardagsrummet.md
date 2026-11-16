# Vardagsrummet

**Väggfärg:** djup kvällsblå `#2F4F7F` (uppmätt i bilden ca `#3E6E9F`) · **Används till:** 034 Musen pyntar granen, och fler bilderböcker inne (jul och vinter)

Vardagsrummet i art direction v2 (`stil/art-direction-v2.md`): en kraftig kvällsblå vägg med kornig oljepastell och några ljusa kritstreck, och ett varmt trägolv (inte helvitt). Inbakat i plattan: ett stort fönster med spröjskors och fönsterbleck och **tom vit insida** (himlen och snön som faller utanför läggs i kod bakom ramen), röda uppknutna gardiner på var sida, en knubbig senapsgul fåtölj med en stickad filt längst till vänster och en randig röd matta framför den. Högra halvan är tom: där står granen, eller något annat, som eget urklipp. Ingen säng (Sanna 2026-11-13: *"ej säng i rummet, mysig snö som faller utanför fönster, mysig inredning"*).

**Bild som används:** `assets/bakgrunder/vardagsrummet/vardagsrummet-v2.jpeg` (1376×768), blå 2 med varmt trägolv, vald till 034 2026-11-13. Prompten nedan gav v1 med vitt golv; v2 är samma rum med trägolv. Kontrollera golvlinjen i v2 innan måtten nedan används.

**Första bilden, v1 (2026-11-13, Google Flow, Nano Banana, 0 krediter, sovrummet och hallen som stil- och layoutreferens):** `assets/bakgrunder/vardagsrummet/vardagsrummet-v1.jpeg` (1376×768), vald av Sanna som blå nr 2. Tagningarna, också i terrakotta `#C9785A`, ligger i `original/` med `jamforelse.jpg`.

**Mått i bilden (1376×768):** golvlinjen på rad 581 (76 %, samma som köket och hallen). Fönstrets vita insida inklusive spröjsen: x 320–600, y 125–407 (gör en mask ur de vita pixlarna, min-kanal över 245). Fåtöljen och mattan: x 40–410, y 300–510.

```prompt
Images 1 and 2 are STYLE and LAYOUT references only: copy their flat crayon technique, their straight-on composition, their floor line and the way the window, the bedside table and the door are drawn as simple flat crayon shapes, not their colours. Background plate for a cosy toddler cartoon living room in winter, wide 16:9, completely flat, static straight-on view, no perspective. The top part is one flat, calm, deep evening-blue wall (#2F4F7F) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture and a few loose, light, thin diagonal scratchy crayon streaks in a slightly lighter blue. On the wall, a little left of centre and in the upper half, one big simple rectangular window with softly rounded corners: a thick soft cream-white crayon frame with one cross bar making four panes, a small cream window sill, and the inside of the window left completely EMPTY as plain flat pure white (#FFFFFF), no sky, no snow, no moon, no stars, no glass lines. On each side of the window a soft warm red curtain, gathered and tied back, drawn flat. At the far left, standing on the floor, one chubby round cosy armchair in soft mustard-yellow crayon with a cream knitted blanket hanging over its arm, and in front of it one small round rug in soft warm red and cream stripes lying flat on the floor. The bottom part is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 75% of the image height. The whole right half of the picture is empty wall and floor, with lots of space for a Christmas tree that is added later. No tree, no bed, no fireplace, no toys, no pictures, no lamps, no characters, no animals, no shadows, no glow, no text, no letters.
```


## Vardagsrummet v3: julpyntat (julkalendern)

`assets/bakgrunder/vardagsrummet/vardagsrummet-v3.jpeg` (2752 × 1536, tagning 2 av 2, båda i `original/vardagsrummet-v3-*.jpeg`). Samma rum som v2 (fönstret och golvlinjen ligger kvar) med en girlang av granris, röda rosetter och varma ljusslingor runt fönstret, en julbonad uppe till höger, en röd kudde i fåtöljen och ett varmt sken kring fönstret. Masken för fönstret är `fonster-mask-v3.png` (vitt där min-kanalen är över 240 inom fönstret). `djur.js` använder v3 för `plats: 'vardagsrummet'`.

Google Flow, Nano Banana Pro, image2image (Edit Image 1 = bilden ovan), 16:9, uppskalad 2K (2752 × 1536), 0 krediter, 2026-11-16. Sanna: *"kanske en mer fin vinterbakgrund överlag … många andra bakgrunderna är mer färgstarka"*.

```
Edit Image 1. Keep this living room EXACTLY the same in layout: same flat straight-on view, same flat crayon and grainy oil-pastel technique, the same window in exactly the same place and size with its cream frame, cross bar and sill, the same red tied-back curtains, the same mustard armchair with the knitted blanket, the same striped rug, the same warm wooden floor meeting the wall at exactly the same height. The inside of the window MUST stay completely EMPTY plain flat pure white (#FFFFFF): no sky, no snow, no star, no candles, nothing inside the glass. ONLY make the room cosy and Christmassy: the blue wall becomes a slightly warmer, rich deep blue with the same crayon texture. Above the window and along the curtain rod, one lush green spruce garland with small red bows and a string of small warm glowing yellow fairy lights, drawn in flat crayon. High up on the wall in the upper right, one small, simple Swedish-style red and cream Christmas wall hanging (a plain fabric banner with a simple heart and star pattern, no text). On the armchair, one small red cushion. A soft warm golden glow on the wall around the fairy lights. The whole lower right half of the room (floor and the wall above it up to the wall hanging) stays empty, with space for a Christmas tree added later. No tree, no presents, no fireplace, no candles, no lamps, no bed, no characters, no animals, no text, no letters, no white frame or border.
```


## Vardagsrummet v4: teal (julkalendern)

`assets/bakgrunder/vardagsrummet/vardagsrummet-v4.jpeg` är v3 med teal vägg (#1F9E96). Den är omfärgad i kod med en färgmatris som flyttar den blå väggen men behåller vitt, trä, rött, grönt och girlangens glöd, så fönstret, golvet och `fonster-mask-v3.png` passar som förut. Sanna 2026-11-16: starka färger i rummen, som i 022, 024 och 029. Används av julkalendern (`djur.js`).
