"""Ger plattan för scen B jämna vita klistermärkeskanter runt de tre lövträden (plattan har bara en fläckig ljus kant).

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I kant.py   (från den här mappen). Skriver badplatsen-kant.png.
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
a = np.array(Image.open(HAR.parents[3] / "assets" / "bakgrunder" / "badplatsen" / "badplatsen.png").convert("RGB"))
px = a.astype(int)
HORISONT = 440                                                    # himlen slutar (svarta strecket ligger på 445)
trad = np.zeros(a.shape[:2], bool)
trad[:HORISONT] = (px[:HORISONT, :, 2] - px[:HORISONT, :, 1]) < 10   # allt som inte är blå himmel: kronan, stammen, den ljusa kanten
trad = ndimage.binary_opening(trad, iterations=1)
lab, _ = ndimage.label(trad)
storlek = np.bincount(lab.ravel()); storlek[0] = 0
trad = ndimage.binary_fill_holes(np.isin(lab, np.nonzero(storlek > 400)[0]))
ring = ndimage.gaussian_filter(ndimage.binary_dilation(trad, iterations=4).astype(float), 0.8)   # mjuk ytterkant, som kor.kant
ring = np.maximum(ring, ndimage.binary_dilation(trad, iterations=2))                                  # men tät inåt mot trädet
ring[trad] = 0
ring[HORISONT:] = 0
a[:] = (a * (1 - ring[..., None]) + 255 * ring[..., None]).round()
Image.fromarray(a).save(HAR / "badplatsen-kant.png")
print("ringpixlar", int((ring > 0.5).sum()))
