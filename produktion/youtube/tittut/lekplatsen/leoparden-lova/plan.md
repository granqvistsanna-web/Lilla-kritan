# Tittut – leoparden på lekplatsen (plan)

**Status:** plan, inget byggt. Skriven 2026-11-08. Byggs som v2-filmerna i skogen-gron ([kaninen](../../skogen-gron/kaninen-kanel/index.html), [lammet](../../skogen-gron/lammet-ludde/index.html)), efter [`format/tittut.md`](../../../../../format/tittut.md). Ersätter planen från 2026-11-06 (v1-Lova, rutschkana, sandlåda och tassar för ögonen), som finns kvar i git.

## Figuren: Leoparden Lova (v2)

Lova är klar i art direction v2 och låst (✅): rigg, ansikte i kod, uttryck, gång och testfilm i [`assets/karaktarer/leoparden-lova/premium/`](../../../../../assets/karaktarer/leoparden-lova/premium/) (vald av Sanna 2026-11-08). Hon är snabb och glad, och passar en lekplats.

- **Hennes andra Tittut.** Den första (ängen, `angen/leoparden-lova/`) är i v1. Den här är hennes första i v2, som kaninens och lammets omgjorda filmer.
- **Sandgul** (`#EFCB7A`) med bruna prickar: väggen blir blå, rutschkanan lila och sanden ljus och kall, så att hon aldrig smälter in.

## Platsen: lekplatsen (v2)

En ny platta i v2: en kraftig vägg och ett vitt golv, som skogen-gron. **Väggen himmelsblå** (`#4FA3D9`): det är dag och sol, och det är långt från skogens gröna. Bakom scenen står några bleka saker inbakade i plattan, som trädraderna i skogen: ett staket och en avlägsen gunga, med låg kontrast. Förgrunden är två grästuvor, samma som i skogen-gron (`skogen-gron-forgrund.png` kan lånas).

Platsljudet finns redan: `lekplatsljud` (lugn park, fåglar, inga barnröster). `gung-knarr` kan ligga svagt ett par gånger, långt bort.

## Gömställena

Tre saker, färgglada och tydliga för ettåringar. Alla är egna urklipp i v2 med 5 px vit kant i bild (`tunn_kant.py`). Lova visas ca 375 px hög (skala 0,5, som lammet).

| Sak | Typ | Hon kommer fram | Varför |
|---|---|---|---|
| **den stora röda bollen** | låg och rund, ca 420 px | `sida`, och `upp` över toppen | Det barnen känner igen bäst. Den får **gunga lite** när hon är där (skakar), en ärlig ledtråd. |
| **rutschkanekullen** | hög, en grön kulle med en lila rutschkana nerför | `sida` vid kullens kant | Den gula rutschkanan i `rekvisita/` är öppen, och hon skulle synas igenom den. En kulle är tät och trygg (den gamla planens favorit). Lila, inte gul, så att den inte går ihop med Lova. |
| **sandlådan** | låg, nära kameran | `ur`, huvudet upp ur sanden | Roligast till sist: hon sjunker ner och kommer upp med lite sand som yr (`sand`-ljudet finns). Klipplinjen är plankans överkant (`klipp` i data). |

Sanden görs ljus och lite kall (nästan vit, inte gul), så att den sandgula leoparden syns i den.

**Rundorna** (fem, `varv: 2`, som de andra):

```js
rundor: [
  ['boll', 'upp'],
  ['kulle', 'sida'],
  ['sandlada', 'ur'],
  ['boll', 'sida'],
  ['kulle', 'sida', 'sandlada'],   // överraskningen: gömmer sig bakom kullen, kommer upp ur sanden
],
skakar: ['boll'],
```

Ordningen går från vänster till höger: bollen, kullen, sandlådan närmast kameran (som stocken i skogen). Hej och hej då på fri mark mellan bollen och kullen.

## Data (utkast)

```js
tittut({
  plats: 'lekplatsen',
  figur: 'leoparden-lova-v2',
  ljud: 'hej-babbel',             // samma babbel som kaninen och lammet (Sanna 2026-11-08)
  fniss: 'spinn-fniss',           // leopardens busiga småljud
  ja: 'ja-babbel',                // samma "mm-hm!" som kaninen och lammet (Sanna 2026-11-08)
  munTid: 1.3,
  hojd: 375,
  start: [700, 990],
  kant: 1,
  saker: {
    boll:     [280, 900, { h: 420, farg: '#E0533D' }],
    kulle:    [1100, 895, { h: 700, farg: '#5DB85C' }],
    sandlada: [1460, 1050, { h: 300, farg: '#C98A4B', klipp: … }],   // klipplinjen mäts i bilden
  },
  retas: 'huvud', ben: 0.4, gang: true, mjukaSteg: true,
  varv: 2,
  rost: 'leopard-lekplats',
  rundor: [ … ],
  skakar: ['boll'],
  kort: [0],
});
```

## Att göra

**Kod (Claude, när bilderna finns)**
- [ ] `leoparden-lova-v2` i `scener/kit.js`, som `lammet-ludde-v2`: ögon (420, 402) och (601, 401), kinder (383, 452) och (637, 452), fötterna 922, munnens läge enligt `MY = 41` i `premium/uttryck.html`. Mage och nosfläck är egna lappar i `cut/`, som hos kaninen. Den gamla `leoparden-lova` (v1, ängen) lämnas som den är.
- [ ] `'leoparden-lova-v2': 'leopard'` i `DJUR` i `tittut.js` (`leopard: 'leoparden'` finns redan).
- [ ] Bollen gungar i stället för att skaka (en mjuk vickning kring fotpunkten).
- [ ] Sand som yr i `ur`-rundan (prickar i kod, som löven i skogen 2).

**Bilder (Sanna, prompter nedan)**
- [x] `assets/bakgrunder/lekplatsen/lekplatsen.png`: plattan, och `bakgrunder/lekplatsen.md` (2026-11-08).
- [x] `boll.png` och `kulle.png` i `assets/bakgrunder/lekplatsen-saker/` (2026-11-08).
- [ ] `sandlada.png` (Flow vägrade, prompten nedan).

**Ljud (ElevenLabs, prompter nedan)**
- [x] babbel och ja: `hej-babbel` och `ja-babbel`, samma som kaninen och lammet.
- [x] `spinn-fniss` 1–5 (ElevenLabs 2026-11-08, originalen i `produktion/ljud-original/effekter/spinn-fniss/`).

**Röster (Malin)**
- [x] `roster/tittut/leopard-hej.m4a` finns redan (*"Hej leoparden!"*).
- [ ] `roster/tittut/leopard-lekplats/`: replikerna nedan, en fil per rad.

## Prompter: bilderna

Nano Banana, med samma tre referensbilder som hallonbusken och granen (`~/Downloads/lk-barbuske-gran-ref/`: v1-kaninen, svampen, busken).

**Plattan** (16:9):

```prompt
Background plate for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective. The top two thirds is one flat, bold, saturated sky blue wall (#4FA3D9) filled edge to edge with a dense grainy oil-pastel and wax-crayon texture: fine speckled paper grain plus a few loose, light, thin diagonal scratchy crayon streaks in a slightly lighter blue, like hand-coloured paper. Standing on the horizon line, pale and low in contrast, a simple low wooden picket fence running across the whole width and, far off to the right, one small simple swing frame, both washed out toward the blue like they are far away. The bottom third is a plain flat white floor (#FAF8F2) with only the faintest grain, meeting the wall at one straight horizontal line with a slightly rough hand-drawn crayon edge, at about 75% of the image height. Bold, simple, flat, cheerful, lots of empty space in the middle. No characters, no animals, no shadows, no text, no letters.
```

**Bollen** (1:1):

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE big, friendly, perfectly round toddler-cartoon play ball in flat bright red crayon (#E0533D) with one wide soft cream-white band (#F6EBD9) around its middle and three small round cream-white dots on the top half. A gentle slightly darker red crayon edge along the bottom only. No shine, no highlights, no shading. Flat like a child's drawing. A thick clean white sticker border all around the ball, slightly hand-cut. Centered, fills the frame, pure solid white background, no ground, no shadow, no text.
```

**Rutschkanekullen** (4:3):

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE friendly toddler-cartoon playground hill with a slide: a big round soft dome-shaped grassy hill in flat fresh green crayon (#5DB85C), a little wider than it is tall, with a few tiny lighter green crayon tufts on it, and a wide bright lilac-purple slide (#8E6CC8) with low rounded sides curving down the front of the hill from the top to the ground on the right, wide and chunky like a toy. The hill is solid and dense, with a flat bottom, big enough for a small animal to hide fully behind it. No ladder, no railings with gaps, no people, no grass around it, no shading, no highlights. Flat like a child's drawing. A thick clean white sticker border all around the whole hill and slide, slightly hand-cut. Centered, fills the frame side to side, pure solid white background, no ground, no shadow, no text.
```

**Sandlådan** (16:9):

```prompt
Images 1, 2 and 3 are STYLE references only: copy their wax-crayon technique exactly (dense grainy oil-pastel fill with visible paper grain and streaky scratchy crayon strokes, no dark outline, no smooth digital shading) and match images 2 and 3 as props from the same set, not their subjects. Draw ONE friendly toddler-cartoon sandbox seen straight from the front: a low, wide, chunky box made of thick rounded wooden planks in warm orange-brown crayon (#C98A4B), with a front plank that is tall and solid, and above it a soft rounded heap of pale, cool, almost white sand (#EFE6D2) with a few tiny darker sand speckles, the sand heap rising a little above the front plank. A small red toy spade stuck upright in the sand at one side. No people, no buckets, no grass, no shading, no highlights. Flat like a child's drawing. A thick clean white sticker border all around the whole sandbox, slightly hand-cut. Centered, fills the frame side to side, pure solid white background, no ground, no shadow, no text.
```

## Prompter: ljuden

ElevenLabs Sound Effects, prompt influence 0,6, gör 4 av varje och välj de gladaste. Inga riktiga ord. Klipp tystnaden, toppen på −9 dBFS, som `hej-babbel` (`ljud-v2-kanel.md`).

```
leopard-babbel (1,2 s): Small cute cartoon leopard cub happily babbling hello in soft nonsense syllables "ma-ma, hee-hee!" with a tiny friendly purr at the end, sweet small toddler-like voice, no growl, nothing scary, no real words, close dry recording, no music, no background
spinn-fniss (0,8 s): Small cute cartoon leopard cub giggling mischievously, a soft little "hee-hee" that rolls into a tiny happy purr, playful and hiding, no growl, no real words, close dry recording, no music, no background
leopard-ja (0,6 s): Small cute cartoon leopard cub saying a short happy "mm-hm!" like yes with a tiny purr, sweet small voice, no growl, no real words, close dry recording, no music, no background
```

## Röstmanus (Malin, `roster/tittut/leopard-lekplats/`)

```
hej-hej-1        [excited] Hej hej!
lek-1            [playful] Ska vi leka tittut på lekplatsen?
gomma-1          [curious] Var gömmer du dig nu?
kul-1            [happy] Okej! Vad roligt!
borta-1          [whispers] Bakom bollen… borta!
tittut-1         [laughs] Tittut! Över bollen!
borta-igen-1     [whispers] Bakom kullen… borta!
tittut-2         [excited] Titt… ut! Vid rutschkanan!
dar-ar-du-1      [happy] Där är du!
borta-igen-2     [mischievously] Ner i sanden nu…
tittut-3         [giggles] Titt-ut! Ur sanden!
busig-1          [laughs] Vilken busig leopard!
igen-1           [excited] Igen! Igen!
borta-2          [playful] Bollen gungar… borta!
jag-sag-nagot-1  [whispers] Jag ser några prickar…
tittut-4         [excited] Tittut!
borta-igen-3     [mischievously] Bakom kullen igen…
tittut-5         [surprised] Oj! Tittut! Ur sanden!
dar-ar-du-2      [excited] Där är du ju!
slut-1           [warm] Nu är leken slut.
hej-da-1         [giggles] Tittut! Vi ses snart!
```

## Frågor till Sanna

1. **Himmelsblå vägg?** Den skiljer sig mest från Lovas sandgula.
2. **Lila rutschkana?** En gul skulle gå ihop med henne.
3. **Bollen gungar** i stället för att skaka. Okej som ledtråd, eller ska den stå helt stilla?
4. **Svansen** är lång med en krok. En svansspets som syns i pausen vore en söt ledtråd, men formatet säger att hon är helt borta. Prova i någon runda?
