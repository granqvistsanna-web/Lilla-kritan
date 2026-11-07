#!/usr/bin/env python3
"""Gör den vita klistermärkeskanten lika tjock på alla urklipp (art direction v2).

Bildmodellen ritar kanten olika tjock från bild till bild, och en sak som visas mindre i scenen
får relativt tjockare kant. Här räknas kanten om från färgytan: allt som inte är vitt är fyllning,
och kanten blir exakt N px runt den (rund, mjukad). Vita skåror som går in i fyllningen
(t.ex. i armspetsar) fylls med närmaste kritfärg.

  python3 verktyg/tunn_kant.py N fil.png [fil2.png ...]     # skriver över filerna
Välj N = önskad kant i scenen (5 px vid zoom 1) / skalan saken visas i.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def fyllning(rgba):
    rgb, al = rgba[..., :3].astype(int), rgba[..., 3] > 128
    vit = (rgb.min(2) > 228) & ((rgb.max(2) - rgb.min(2)) < 22)
    f = al & ~vit
    f = ndimage.binary_opening(f, iterations=1)
    lab, n = ndimage.label(f)
    if n:
        s = ndimage.sum(f, lab, range(1, n + 1))
        f = np.isin(lab, 1 + np.nonzero(s > 0.01 * s.max())[0])
    # stäng skåror och hål, men bara små (stängningen ska inte bygga broar mellan delar)
    return ndimage.binary_fill_holes(ndimage.binary_closing(f, iterations=6)) | f


def ny_alfa(rgba, n):
    """(rgb, alfa) med kanten n px runt fyllningen och skårorna ifyllda."""
    f = fyllning(rgba)
    rgb = rgba[..., :3].copy()
    vit_i = f & ((rgb.astype(int).min(2) > 228))
    if vit_i.any():                        # vita skåror inne i fyllningen -> närmaste kritfärg
        _, (iy, ix) = ndimage.distance_transform_edt(vit_i, return_indices=True)
        rgb[vit_i] = rgb[iy[vit_i], ix[vit_i]]
    d = ndimage.distance_transform_edt(~f)
    alfa = np.clip(n + 0.5 - d, 0, 1)      # mjuk ytterkant
    kant = (d > 0) & (d <= n + 1)
    rgb[kant] = 255                        # kanten helt vit
    return rgb, alfa


def kor(fil, n):
    rgba = np.asarray(Image.open(fil).convert("RGBA"))
    rgb, alfa = ny_alfa(rgba, n)
    ut = Image.fromarray(np.dstack([rgb, (alfa * 255).astype("uint8")]))
    ut.putalpha(ut.getchannel("A").filter(ImageFilter.GaussianBlur(0.6)))
    ut.save(fil, optimize=True)


if __name__ == "__main__":
    n = float(sys.argv[1])
    for fil in sys.argv[2:]:
        kor(fil, n)
        print(fil)
