#!/usr/bin/env python3
"""Zebrans armar efter rita-lemmar.py (--armlangd 0.55): svarta hovar och -fram-kopior.

  python3 skript/armar-zebbe.py hovar   # före tunn_kant.py: armens yttersta del (t > 0,86 längs axeln) blir hovsvart
  python3 skript/armar-zebbe.py fram    # efter tunn_kant.py: cut/zebbe-arm-*-fram.png, kanten tonar bort mot roten
t = 0 vid roten, 1 vid spetsen, samma kapsel som rita-lemmar.py ritar.
"""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image

mapp = Path(__file__).resolve().parent.parent
rigg = json.load(open(mapp / "zebbe-rigg.json"))["delar"]
AL, HOV = 0.55, np.array([30, 26, 24])
yy, xx = np.mgrid[0:1024, 0:1024]
for s in "lr":
    p, sida = rigg[f"arm-{s}"]["vridpunkt"], 1 if s == "r" else -1
    a, b = np.array([p[0] - sida * 40, p[1] - 10]), np.array([p[0] + sida * 62 * AL, p[1] + 62 * AL])
    v = b - a
    t = ((xx - a[0]) * v[0] + (yy - a[1]) * v[1]) / (v @ v)
    f = mapp / "cut" / f"zebbe-arm-{s}.png"
    im = np.asarray(Image.open(f).convert("RGBA")).astype(float)
    if sys.argv[1] == "hovar":
        rgb = im[..., :3]
        fyllt = rgb.min(2) < 248            # kritan, inte den vita kanten
        k = np.clip((t - 0.80) / 0.06, 0, 1)[..., None] * fyllt[..., None]
        korn = rgb.mean(2, keepdims=True) / 240   # behåll kritkornet
        im[..., :3] = rgb * (1 - k) + np.clip(HOV * korn, 0, 255) * k
        Image.fromarray(im.astype(np.uint8)).save(f)
    else:
        im[..., 3] *= np.clip((t - 0.3) / 0.25, 0, 1)
        Image.fromarray(im.astype(np.uint8)).save(mapp / "cut" / f"zebbe-arm-{s}-fram.png")
