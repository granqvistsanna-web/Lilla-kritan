# Igelkotten Igge

**Art:** igelkott · **Favoritsak:** – · **Status:** ⏳ Inget referensark ännu

Är oftast **statist** (se `format/regler.md`). Han går långsamt över vägen, tittar upp och vinkar.

## Utseende
- Form: liten halvklot med spetsig nos.
- Färger: gråbrun rygg med krafsade mörkbruna taggar i kritstreck och ljusbeige ansikte och mage.
- Kännetecken: svart prick i nostippen och små snabba fötter.

## Personlighet
- Försiktig och långsam. Tittar alltid åt båda hållen.

## Röst och repliker
- Röst: (statist – inga repliker) ett litet *snuff-snuff*.

## Cut out-delar
```delar
body with spiky back and face, front leg, back leg, waving front leg, eyes closed
```

## Prompt
```prompt
Igge the hedgehog, a small half-round hedgehog with a pointy nose, a grey-brown back covered with scribbled dark brown crayon spikes, a light beige face and tummy, a black dot at the tip of his nose, small black dot eyes in white circles, tiny stubby legs with black tips.
```

**Armar (2026-11-05):** rörliga armar ritade i kod ur magens kritstruktur (`lemmar/rita-armar.py`), framför magen. Riggen med armar: `igelkotten-igge-rigg-lemmar.json` (armar + de utklippta benen). Den gamla `igelkotten-igge-rigg.json` har bara ben.

## Art direction v2 (2026-11-08)

Sanna: "update igelkott". Gjord som Bulle och Ludde ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md), skillen `lk-figur`). Riggen ligger i [`assets/karaktarer/igelkotten-igge/premium/`](../assets/karaktarer/igelkotten-igge/premium/).

- **Vald tagning:** `premium/original/igge-forsta-b.png` (Sannas val av tre första tagningar, a–c, gjorda med prompten nedan). Den var redan platt nog, som Bulles.
- **Utan ansikte och bara kroppen:** Google Flow gav bara feltavlor den här dagen (även andra sessioner), så båda gjordes lokalt ur tagning B, och de är därför pixeljusterade mot den: `original/igge-faceless.png` (ögon, kinder och mun bortmålade med `cv2.inpaint` och kritkorn ur pannan, nosen kvar) och `original/igge-body.png` (benen bort, armstumparna övermålade med taggarnas krita). 1024-versionerna ligger i `premium/`. Vill Sanna ha Flow-versioner senare: faceless-prompten står nedan.
- **Delar** (`premium/cut/`, 10 px vit kant vid SKALA 0,5 med `tunn_kant.py`): `igge-body` (hela kroppen med taggarna), `igge-body-tom` (mage och nosfläck bortlyfta), `igge-skiva` (den beige framsidan som ellips, utan kant), `igge-mage`, `igge-nos` (nosfläcken med nosen), `igge-leg-l/-r` (med de svarta fötterna), `igge-arm-l/-r` (ritade ur en ren kritbit, `rita-lemmar.py --bara arm`, bit 285,585,381,681), `igge-arm-*-kant` och `igge-arm-*-fram`. Vridpunkter i `igge-rigg.json`: arm-l (252, 540), arm-r (772, 540), leg-l (430, 818), leg-r (610, 812). FOTTER 928.
- **Armarna ligger på taggarna,** som i konsten. Lagren är därför: ben → armkopior med vit kant → taggarna (`body-tom`) → armarna utan kant → `skiva` → mage → ansikte. Armarnas rötter göms under skivan, och kantkopian bakom kroppen syns bara där armen sticker ut utanför taggarna (den följer armen med en MutationObserver, så att den också följer när `v2.js` vrider armarna). Framför magen (`-fram`) tonar armens rot ut i kroppen och tassen har en mjuk mörkare kritkant, så att den läses som en tass. Armarna är korta, så `magen` klappar vid magens kanter (`armar [−95, −95], klapp 40`, lk-figur).
- **Inga öron och ingen svans:** `oron` och `svans` i uttrycken och poserna gör ingenting.
- **Ansikte i kod** (`ansikte_matt.py`, tagning B mot faceless): ögon (420, 402) och (601, 401), rx 17–18, ry 26; kinder (383, 452) och (636, 451), rx 29, ry 18; nosen sitter i bilden (510, 433); munnen ett streck från nosen (446) ner till 478 och två bågar ut till ±29 px som slutar 15 px högre. Kawaii-ögonen har samma mått som Bulles i förhållande till framsidans bredd (454 px vid ögonhöjd).
- **Uttryck, poser och testfilm:** [`premium/uttryck.html`](../assets/karaktarer/igelkotten-igge/premium/uttryck.html), samma API och namn som Bulles (`ansikte`, `pose`, `riktning`, `blanda`, `blandaPose`, `rorelse`; `?bara=`, `?pose=`, `?ark=poser`, `?rorelse=`, `?film=1`). Ingen ritad sovbild än: i testfilmen ligger han på magen och sover (`ROR.ligga`).
- **I 007:** `igelkotten-igge` finns i `avsnitt/007-bruna-ladbilen/scener/gor-v2.py` och därmed i `v2-riggar.js` (`v2.figur('igelkotten-igge', …)`).

Första tagningen (Nano Banana 2, image2image, 2K, bild 1 = `assets/karaktarer/igelkotten-igge/igelkotten-igge.png`):

```prompt
Image 1 is the character reference: the same little hedgehog (same design, colours and proportions). Redraw him as a premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. A round egg-shaped body with a light beige face and tummy in front, and around the top and sides a soft scalloped crown of rounded grey-brown spikes drawn with short dark-brown crayon strokes, like a fluffy round hood, all one smooth outer silhouette. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, a small pointed beige snout in the middle with a tiny round black nose dot at its tip, and a small happy smile. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded beige nubs held slightly out from the body with a clear gap, the two legs are separate and slightly apart with small oval feet, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

Utan ansikte (bild 1 = `premium/original/igge-forsta-b.png`; Flow gav feltavlor 2026-11-08, så den här är inte prövad):
```prompt
Edit Image 1. Keep the hedgehog EXACTLY the same: same shape, pose, position and size in the frame, same spiky grey-brown crown, same beige muzzle patch with the same small round black nose at its centre, same light tummy patch, same arm nubs, legs and feet, same thick clean white sticker border, same pure white background, same crayon texture. ONLY change: remove the eyes, the smile line and the pink blush cheeks, filling those spots with the surrounding beige crayon (and the muzzle patch's own light brown crayon under the nose) so the face is blank and seamless, only the nose stays. No other changes, no shadow, no text.
```
