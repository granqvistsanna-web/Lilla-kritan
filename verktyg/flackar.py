#!/usr/bin/env python3
"""Lyfter ut ljusa fläckar (mage, nosfläck med nos) ur en v2-kropp, så att de kan flyttas i kod.

Kroppen under fylls med kroppens egen kritfärg (en speglad ruta ur en ren bit av kroppen),
och varje fläck blir en egen bild i samma 1024-ruta med en mjuk kant (inget vitt runt).
Fläckarna sorteras efter storlek: största först.

  python3 verktyg/flackar.py <cut-mapp> <namn> <kritbit x,y> mage nos
  -> <namn>-body-tom.png, <namn>-mage.png, <namn>-nos.png  (+ mitten på varje fläck)
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

mapp, namn, bit, *flackar = sys.argv[1:]
bx, by = map(int, bit.split(","))
kropp = Path(mapp) / f"{namn}-body.png"
a = np.asarray(Image.open(kropp).convert("RGBA")).copy()
rgb = a[..., :3].astype(int)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
ljus = inne & (rgb[..., 0] > 200) & (rgb[..., 1] > 175) & (rgb[..., 2] > 140)
rosa = inne & (rgb[..., 0] > 200) & (rgb[..., 0] - rgb[..., 1] > 40)
lab, n = ndimage.label(ndimage.binary_closing(ljus | rosa, iterations=3))
storlek = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
ordning = np.argsort(storlek)[::-1][:len(flackar)]

# kritfärgen under: speglad ruta (96 px) ur en ren bit av kroppen
p = a[by:by + 96, bx:bx + 96, :3]
p = np.concatenate([p, p[:, ::-1]], 1); p = np.concatenate([p, p[::-1]], 0)
tex = np.tile(p, (6, 6, 1))[:a.shape[0], :a.shape[1]]
tom = a.copy()
for nm, i in zip(flackar, ordning):
    f = ndimage.binary_fill_holes(lab == i + 1)
    d = ndimage.distance_transform_edt(~f)
    alfa = np.clip(1 - (d - 2) / 4, 0, 1)                 # 2 px hel, sedan 4 px mjuk övergång
    ut = a.copy(); ut[..., 3] = (alfa * 255).astype("uint8")
    Image.fromarray(ut).save(Path(mapp) / f"{namn}-{nm}.png", optimize=True)
    under = d <= 8
    tom[under, :3] = tex[under]
    ys, xs = np.nonzero(f)
    print(nm, "mitt", int(xs.mean()), int(ys.mean()))
Image.fromarray(tom).save(Path(mapp) / f"{namn}-body-tom.png", optimize=True)
print(f"{namn}-body-tom.png")
