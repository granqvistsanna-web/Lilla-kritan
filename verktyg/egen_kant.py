#!/usr/bin/env python3
"""Klipper ut konst som redan har en egen vit klistermärkeskant (premiumstilen).

Kanten behålls precis som den är ritad, ingen ny läggs till. Bara den mjuka grå
klipplinjen runt kanten tas bort, så att ingen skarv syns mot bakgrunden.
Flera saker på samma ark blir egna filer med --ark (ut = mapp, namn i läsordning).

  python3 verktyg/egen_kant.py in.png ut.png
  python3 verktyg/egen_kant.py ark.png utmapp --ark gras buske blommor-vita blommor-rosa
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def kant_mask(a, linje=12):
    """Allt innanför den ritade klipplinjen, minus den grå linjen själv."""
    mn, gra = a.min(2), (a.max(2) - a.min(2)) < 14
    m = ndimage.binary_fill_holes(ndimage.binary_closing(mn < 246, iterations=3))
    # den grå linjen: omättade, lite mörkare pixlar längst ut i kanten
    yttre = m & ~ndimage.binary_erosion(m, iterations=linje)
    m &= ~(yttre & gra & (mn < 252))
    m = ndimage.binary_opening(m, iterations=2)
    lab, n = ndimage.label(m)
    if n:
        s = ndimage.sum(m, lab, range(1, n + 1))
        m = np.isin(lab, 1 + np.nonzero(s > 0.02 * s.max())[0])
    return ndimage.binary_fill_holes(m)


def spara(im, m, ut, beskar=False):
    rgba = np.asarray(im.convert("RGBA")).copy()
    rgba[m & ((rgba[..., :3].min(2) > 200) & ((rgba[..., :3].max(2) - rgba[..., :3].min(2)) < 14)), :3] = 255
    bild = Image.fromarray(rgba)
    bild.putalpha(Image.fromarray((m * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.7)))
    (bild.crop(bild.getbbox()) if beskar else bild).save(ut)


def klipp(src, dst, beskar=False):
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(int)
    spara(im, kant_mask(a, max(6, round(im.width / 85))), dst, beskar)


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    if "--ark" not in sys.argv:
        klipp(src, dst, beskar=True)
        sys.exit()
    namn = sys.argv[sys.argv.index("--ark") + 1:]
    im = Image.open(src).convert("RGB"); a = np.asarray(im).astype(int)
    m = kant_mask(a, max(6, round(im.width / 85)))
    lab, n = ndimage.label(m)
    delar = sorted((lab == i for i in range(1, n + 1)), key=lambda d: d.sum(), reverse=True)[:len(namn)]
    # läsordning: rad för rad (halva bildhöjden som radgräns), sedan vänster till höger
    delar.sort(key=lambda d: (np.nonzero(d)[0].mean() > im.height / 2, np.nonzero(d)[1].mean()))
    Path(dst).mkdir(parents=True, exist_ok=True)
    for nm, d in zip(namn, delar):
        spara(im, d, Path(dst) / f"{nm}.png", beskar=True)
        print(nm)
