"""Klipper ut sakerna som glider förbi i körscenerna ur de färdiga bakgrunderna (samma maskning som storyboarden).

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I klipp.py   (från den här mappen)
Skriver klipp/tradet.png, klipp/dammen.png, klipp/blommor.png i plattornas egna 1376×768-pixlar.
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
A = HAR.parents[3] / "assets" / "bakgrunder"
CREAM = [247, 243, 231]


def plate(slug):
    return np.array(Image.open(A / slug / f"{slug}.png").convert("RGB")).astype(int)


def spara(a, keep, box, namn):
    rgba = np.dstack([a, keep * 255]).astype("uint8")
    Image.fromarray(rgba).crop(box).save(HAR / "klipp" / f"{namn}.png")


def stora(keep, minst, hog=0):
    lab, _ = ndimage.label(keep)
    big = np.bincount(lab.ravel())
    big[0] = 0
    ok = [i + 1 for i, s in enumerate(ndimage.find_objects(lab)) if s[0].stop - s[0].start > hog and big[i + 1] > minst]
    return np.isin(lab, ok)


# äppelträdet: allt som inte är orange vägg eller krämvitt golv, till höger om x 1050
a = plate("appeltradet")
keep = ndimage.binary_opening((np.abs(a - [236, 116, 34]).sum(2) >= 120) & (np.abs(a - CREAM).sum(2) >= 40), iterations=2)
keep = ndimage.binary_fill_holes(stora(keep, 400))   # äpplena är nästan orange, så de fylls i efteråt
keep[:, :1050] = False
# trädet skärs av bildkanten: spegla vänstra halvan (till stammens mitt, x 1265) så att kronan blir hel
a, keep = a[:, :1266], keep[:, :1266]
a, keep = np.hstack([a, a[:, ::-1]]), np.hstack([keep, keep[:, ::-1]])
spara(a, keep, (1050, 60, 1482, 650), "tradet")


def bit(slug, box, wall, namn):
    a = plate(slug)
    keep = (np.abs(a - wall).sum(2) > 110) & (np.abs(a - CREAM).sum(2) > 22)
    keep = ndimage.binary_opening(keep, iterations=1)
    keep = ndimage.binary_fill_holes(ndimage.binary_closing(keep, iterations=3))
    keep = stora(keep, 300, 24)                       # inte väggkanten
    return a, keep


a, keep = bit("dammen", None, [44, 190, 160], "dammen")
keep[410:590, 950:1230] = False                      # väggkanten ovanför dammen, vänster om vassen
gron = lambda a: (a[..., 1] > a[..., 2] + 20) | (a[..., 0] > a[..., 1] + 60)   # strån, blad och röda blommor
keep[540:595] &= gron(a[540:595])                    # väggkanten bredvid vassen
STAende = np.ones((9, 1), bool)                      # tunna liggande streck (väggkanten) bort, stående strån kvar
keep[540:600] = ndimage.binary_opening(keep[540:600], STAende)
spara(a, keep, (950, 410, a.shape[1], 740), "dammen")
a, keep = bit("angen", None, [75, 170, 225], "blommor")
keep[595:640] &= gron(a[595:640])                    # väggkanten bakom blommorna
keep[595:640] = ndimage.binary_opening(keep[595:640], STAende)
keep &= ~((a[..., 2] > a[..., 0] + 40) & (a[..., 2] > a[..., 1]))   # inga blå blommor, bara himmel
spara(a, keep, (20, 480, 270, 680), "blommor")
