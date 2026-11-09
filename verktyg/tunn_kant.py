#!/usr/bin/env python3
"""Gör den vita klistermärkeskanten lika tjock på alla urklipp (art direction v2).

Bildmodellen ritar kanten olika tjock från bild till bild, och en sak som visas mindre i scenen
får relativt tjockare kant. Här räknas kanten om från färgytan: allt som inte är vitt är fyllning,
och kanten blir exakt N px runt den (rund, mjukad). Vita skåror som går in i fyllningen
(t.ex. i armspetsar) fylls med närmaste kritfärg.

  python3 verktyg/tunn_kant.py N fil.png [fil2.png ...]     # skriver över filerna
  python3 verktyg/tunn_kant.py N --skugga fil.png           # bilden har en grå skugga under kanten (013:s äpple):
                                                            # ljusgrått blir vitt först, annars får skuggan egen kant
Välj N = önskad kant i scenen (5 px vid zoom 1) / skalan saken visas i.
"""
import sys
import numpy as np
from PIL import Image
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
    """(rgb, alfa) med kanten n px runt fyllningen, lika bred överallt och kantutjämnad.

    Omgjord 2026-11-08 (Fia, Sanna: "kanten är ojämn och taggig"): förr följde kanten varje kritfrans och
    vit prick längs fyllningens kant, och gränsen färg/vitt var hel pixel. Nu:
    1. vita skåror inne i fyllningen och ljusa kritfransar längs kanten får närmaste kritfärg inifrån
       (mörkare kritkanter behålls),
    2. konturen slätas (ca 2 px), så att kanten inte hackar,
    3. både färgkanten och kantens ytterkant räknas i 4x (2x för stora bilder) och skalas ner, alltså mjuka.
    """
    f = fyllning(rgba)
    rgb = rgba[..., :3].astype(float)
    lum = rgb.min(2)
    inre = ndimage.binary_erosion(f, iterations=12)
    ref = inre & (lum < 228)
    if ref.any():
        _, (iy, ix) = ndimage.distance_transform_edt(~ref, return_indices=True)
        nara = rgb[iy, ix]                                      # närmaste kritfärg inifrån
        ljus = f & ~inre & (rgb.mean(2) > nara.mean(2) + 9)    # ljusa fransar och vita prickar i ytterkanten
        byt = (f & (lum > 228)) | ljus
        rgb[byt] = nara[byt]
    ok = f & (rgb.min(2) < 236)
    if ok.any():                                                # färgen utanför fyllningen (för kantutjämningen)
        _, (iy, ix) = ndimage.distance_transform_edt(~ok, return_indices=True)
        rgb = rgb[iy, ix]
    h, w = f.shape
    k = 4 if max(h, w) <= 1100 else 2
    jamn = ndimage.gaussian_filter(f.astype(float), 2.5)
    stor = np.asarray(Image.fromarray((jamn * 255).astype(np.uint8)).resize((w * k, h * k), Image.BILINEAR)) > 127
    d = ndimage.distance_transform_edt(~stor) / k
    ner = lambda m: m.reshape(h, k, w, k).mean((1, 3))
    farg, alfa = ner(stor), ner(d <= n)
    rgb = (rgb * farg[..., None] + 255 * (alfa - farg)[..., None]) / np.maximum(alfa, 1e-3)[..., None]
    return rgb.clip(0, 255).astype(np.uint8), alfa


def kor(fil, n, skugga=False):
    rgba = np.asarray(Image.open(fil).convert("RGBA"))
    if skugga:   # Sanna 2026-11-09 "apples have some extra white rim on bottom part": den grå skuggan räknades som fyllning
        rgba = rgba.copy(); c = rgba[..., :3].astype(int)
        rgba[((c.max(2) - c.min(2)) < 26) & (c.min(2) > 110) & (rgba[..., 3] > 0), :3] = 255
    rgb, alfa = ny_alfa(rgba, n)
    Image.fromarray(np.dstack([rgb, (alfa * 255).astype("uint8")])).save(fil, optimize=True)


if __name__ == "__main__":
    n, filer = float(sys.argv[1]), sys.argv[2:]
    skugga = "--skugga" in filer
    for fil in [f for f in filer if f != "--skugga"]:
        kor(fil, n, skugga)
        print(fil)
