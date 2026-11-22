#!/usr/bin/env python3
"""Lyfter ut zebrans grå mule (med näsborrarna) ur kroppen, som flackar.py gör för ljusa fläckar.
Zebrans kropp är ljusare än mulen, så flackar.py hittar den inte: här är mulen den största gråbeige
ytan inne i kroppen. Under fylls kroppen med en speglad ren kritbit (430, 640, 96 px).
  python3 skript/nos-zebbe.py   -> cut/zebbe-body-tom.png, cut/zebbe-nos.png
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

cut = Path(__file__).resolve().parent.parent / "cut"
a = np.asarray(Image.open(cut / "zebbe-body.png").convert("RGBA")).copy()
rgb = a[..., :3].astype(int)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
gra = inne & (rgb.max(2) < 228) & (rgb.mean(2) > 160) & (rgb.mean(2) < 222)   # mulen ca (210, 198, 184), kroppen (250, 234, 221)
lab, n = ndimage.label(ndimage.binary_closing(gra, iterations=4))
mule = lab == 1 + np.argmax(ndimage.sum(gra, lab, range(1, n + 1)))
mule = ndimage.binary_dilation(ndimage.binary_fill_holes(mule), iterations=3)   # med näsborrar och kantens övergång
ys, xs = np.nonzero(mule); print("mulen", xs.min(), xs.max(), ys.min(), ys.max(), "mitt", int(xs.mean()), int(ys.mean()))
# kritbit som täcker hålet
bit = a[640:736, 430:526, :3]
tex = np.zeros((1024, 1024, 3), np.uint8)
for y in range(0, 1024, 96):
    for x in range(0, 1024, 96):
        b = bit if (x // 96 + y // 96) % 2 == 0 else bit[:, ::-1]
        tex[y:y + 96, x:x + 96] = b[:min(96, 1024 - y), :min(96, 1024 - x)]
tom = a.copy(); tom[mule, :3] = tex[mule]
Image.fromarray(tom).save(cut / "zebbe-body-tom.png")
nos = a.copy(); nos[..., 3] = 0
alfa = Image.fromarray((ndimage.binary_erosion(mule, iterations=2) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))
nos[..., 3] = np.asarray(alfa)
Image.fromarray(nos).save(cut / "zebbe-nos.png")
