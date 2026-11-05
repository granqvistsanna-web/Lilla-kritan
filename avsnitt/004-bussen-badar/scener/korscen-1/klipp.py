"""Klipper ut stoppens saker ur de färdiga bakgrunderna (samma maskning som storyboarden, bygg.py plate_piece).

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I klipp.py   (från den här mappen)
Skriver klipp/skylt.png (ur Busshållplatsen), klipp/vass.png (ur Dammen) och klipp/sjo.png (ur Badplatsen),
i plattornas egna 1376×768-pixlar. Träden, dammen och blommorna tas från 003 (korscen-1/klipp/).
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
A = HAR.parents[3] / "assets" / "bakgrunder"
CREAM = [247, 243, 231]


def bit(slug, box, wall, biggest=False):
    a = np.array(Image.open(A / slug / f"{slug}.png").convert("RGB")).astype(int)
    keep = (np.abs(a - wall).sum(2) > 110) & (np.abs(a - CREAM).sum(2) > 22)
    keep = ndimage.binary_opening(keep, iterations=1)
    keep = ndimage.binary_fill_holes(ndimage.binary_closing(keep, iterations=3))
    lab, _ = ndimage.label(keep)
    big = np.bincount(lab.ravel())
    big[0] = 0
    tall = [i + 1 for i, s in enumerate(ndimage.find_objects(lab)) if s[0].stop - s[0].start > 24]   # inte väggkanten
    keep = np.isin(lab, [i for i in tall if big[i] > 300])
    piece = Image.fromarray(np.dstack([a, keep * 255]).astype("uint8")).crop(box)
    if biggest:   # väggkantens kritstreck hänger ihop med stolpen: ta bort väggfärgen och behåll största biten
        px = np.array(piece.convert("RGB")).astype(int)
        al = (np.array(piece.getchannel("A")) > 0) & (np.abs(px - wall).sum(2) > 160)
        lab, _ = ndimage.label(ndimage.binary_opening(al, iterations=2))
        sizes = np.bincount(lab.ravel())[1:]
        piece.putalpha(Image.fromarray(((lab == sizes.argmax() + 1) * 255).astype("uint8")))
    return piece.crop(piece.getbbox())


(HAR / "klipp").mkdir(exist_ok=True)
skylt = bit("busshallplatsen", (0, 300, 140, 700), [108, 41, 168], biggest=True)   # bara skylten, inte bänken
for x0, x1 in ((0, 40), (63, skylt.width)):                                      # väggkanten som korsar stolpen
    skylt.paste((0, 0, 0, 0), (x0, 234, x1, 250))
skylt.save(HAR / "klipp" / "skylt.png")
vass = bit("dammen", (1250, 300, 1376, 610), [44, 190, 160])
px = np.array(vass).astype(int)
gron = (px[..., 1] > px[..., 2] + 20) | (px[..., 0] > px[..., 1] + 60)          # bara strån och blad, inte väggkanten och vattnet
gron &= px[..., 2] < px[..., 0] + 45                                             # inte det turkosa vattnet runt stråna och vattenlinjen
px[..., 3] *= gron
nere = px.shape[0] // 2                                                           # vattenlinjen: tunna vågräta streck nertill bort, stråna står kvar
px[nere:, :, 3] *= ndimage.binary_opening(px[nere:, :, 3] > 0, structure=np.ones((5, 1)))
lab, _= ndimage.label(px[..., 3] > 0)                                            # smulor av vatten och väggkant bort (de får annars egen vit kant)
storlek = np.bincount(lab.ravel()); storlek[0] = 0
px[..., 3] *= np.isin(lab, np.nonzero(storlek > 150)[0])
vass = Image.fromarray(px.astype("uint8"))
vass.crop(vass.getbbox()).save(HAR / "klipp" / "vass.png")
sjo = bit("badplatsen", (600, 455, 1376, 672), [247, 245, 241], biggest=True)
sjo.putalpha(Image.fromarray((ndimage.binary_fill_holes(np.array(sjo.getchannel("A")) > 0) * 255).astype("uint8")))   # vågorna
sjo.save(HAR / "klipp" / "sjo.png")
for n in ("skylt", "vass", "sjo"):
    print(n, Image.open(HAR / "klipp" / f"{n}.png").size)
