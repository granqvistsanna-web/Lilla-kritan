#!/usr/bin/env python3
"""Mäter ansiktet för koden: jämför konsten MED ansikte mot samma konst UTAN, i 1024-rutan.

  python3 .claude/skills/lk-figur/scripts/ansikte_matt.py original/<namn>-platt.png original/faceless-a.png
-> varje fläck som skiljer: sort (mörk = öga/mun, rosa = kind), mitt (x, y), halva bredd/höjd (rx, ry).
Båda bilderna skalas till 1024. Kräver att faceless-bilden är pixeljusterad mot originalet (image2image-redigeringen).
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

med, utan = (np.asarray(Image.open(f).convert("RGB").resize((1024, 1024), Image.LANCZOS)).astype(int) for f in sys.argv[1:3])
diff = np.abs(med - utan).sum(2) > 90
lab, n = ndimage.label(ndimage.binary_opening(diff, iterations=2))
for i, sl in enumerate(ndimage.find_objects(lab), 1):
    m = lab[sl] == i
    if m.sum() < 60:
        continue
    r, g, b = (med[sl][..., c][m].mean() for c in range(3))
    sort = "mörk" if max(r, g, b) < 110 else "rosa" if r - g > 40 else "annat"
    ys, xs = np.nonzero(lab == i)
    print(f"{sort:5} mitt ({xs.mean():.0f}, {ys.mean():.0f})  rx {(xs.max() - xs.min()) / 2:.0f}  ry {(ys.max() - ys.min()) / 2:.0f}  px {m.sum()}")
