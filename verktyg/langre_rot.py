#!/usr/bin/env python3
"""Ger öron, svans och ben en längre rot i delens egen färg, så att roten inte syns när delen vrids.

delar.py ger varje del en bit av KROPPEN runt leden (kroppsfärg, platt kant mot kroppens kontur).
När delen vrids glider den biten ut bakom kroppen och syns som en stump. Här tas den bort:
delen blir bara sina egna pixlar utanför kroppen, plus en rundad rot (kapsel) som fortsätter
L px in bakom kroppen i delens egen färg. Kör tunn_kant.py efteråt så att kanten blir lika runt allt.
Originalen sparas i cut/v1/ (om de inte redan finns där).

  python3 verktyg/langre_rot.py assets/karaktarer/hasten-hulda/premium hulda ear-l ear-r tail leg-l leg-r [--langd 80]
"""
import json, shutil, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

mapp, namn = Path(sys.argv[1]), sys.argv[2]
delar = [a for a in sys.argv[3:] if not a.startswith("--") and not a.replace(".", "").isdigit()]
L = float(sys.argv[sys.argv.index("--langd") + 1]) if "--langd" in sys.argv else 80
rigg = json.load(open(mapp / f"{namn}-rigg.json"))["delar"]
B = np.asarray(Image.open(mapp / "cut" / f"{namn}-body.png").convert("RGBA"))[..., 3] > 128
yy, xx = np.mgrid[:1024, :1024]
(mapp / "cut" / "v1").mkdir(exist_ok=True)

for d in delar:
    fil = mapp / "cut" / f"{namn}-{d}.png"
    if not (mapp / "cut" / "v1" / fil.name).exists():
        shutil.copy(fil, mapp / "cut" / "v1" / fil.name)
    im = np.asarray(Image.open(fil).convert("RGBA")).copy()
    rgb = im[..., :3].astype(int)
    vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
    farg = (im[..., 3] > 128) & ~B & ~vit
    lab, n = ndimage.label(farg)
    farg = lab == 1 + np.argmax(ndimage.sum(farg, lab, range(1, n + 1)))  # största biten = själva delen
    p = np.array(rigg[d]["vridpunkt"], float)
    by, bx = np.nonzero(B)
    u = np.array([bx.mean(), by.mean()]) - p
    u /= np.linalg.norm(u)    # från leden in mot kroppens mitt, så att roten aldrig sticker ut under kroppen (Kajs S-svans)
    nara = farg & (np.hypot(xx - p[0], yy - p[1]) < 60)
    r = max(12.0, ndimage.distance_transform_edt(farg)[nara].max() if nara.any() else 20)
    # kapsel från en bit ute i delen (så att den möter delens sidor) till L px in bakom kroppen
    a, b = p - u * r, p + u * L
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    kapsel = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= r * (1 - 0.1 * t)
    ny = farg | kapsel
    # rotens färg: närmaste färgpixel en bit in i delen (inte kritkanten längst ut)
    kalla = ndimage.binary_erosion(farg, iterations=6)
    kalla = kalla if kalla.sum() > 200 else farg
    _, (iy, ix) = ndimage.distance_transform_edt(~kalla, return_indices=True)
    ut = np.zeros_like(im)
    ut[ny, :3] = im[iy[ny], ix[ny], :3]
    ut[farg, :3] = im[farg, :3]
    ut[ny, 3] = 255
    Image.fromarray(ut).save(fil)
    print(d, "rot", int(r), "px bred,", int(L), "px in")
