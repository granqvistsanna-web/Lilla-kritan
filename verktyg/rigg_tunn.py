#!/usr/bin/env python3
# Tunna kopior av en v2-riggs delar: vita kanten blir 1 % av kroppens höjd (Sanna 2026-11-11, Kanel och Bulle).
# Lägger aldrig till kant där det inte fanns (armarnas -fram-rötter), bara kortar den som finns.
#   python3 verktyg/rigg_tunn.py <premium/cut> <premium/cut-tunn> [andel, standard 0.01]   sedan href="cut/ → href="cut-tunn/ i uttryck.html
import sys, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
body = np.array(Image.open(f'{src}/'+[f for f in os.listdir(src) if f.endswith('body-tom.png')][0]))[...,3] > 128
ys = np.nonzero(body.any(1))[0]; N = float(sys.argv[3]) * (ys[-1]-ys[0]) if len(sys.argv) > 3 else 0.01 * (ys[-1]-ys[0])
print('body h', ys[-1]-ys[0], 'N', round(N,1))
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    a = np.array(Image.open(f'{src}/{f}').convert('RGBA')).astype(float)
    rgb = a[...,:3]; al = a[...,3] > 128
    vit = (rgb.min(2) > 228) & ((rgb.max(2)-rgb.min(2)) < 22)
    f0 = nd.binary_opening(al & ~vit, iterations=2)
    lab, n = nd.label(f0)
    if n:
        sz = nd.sum(f0, lab, range(1, n+1)); f0 = np.isin(lab, 1 + np.nonzero(sz > 0.01*sz.max())[0])
    fill = nd.binary_fill_holes(nd.binary_closing(f0, iterations=3)) & al
    d = nd.distance_transform_edt(~fill)
    keep = np.clip(N + 0.5 - d, 0, 1)
    rim = al & ~fill
    old = d[rim].max() if rim.any() else 0
    a[...,3] = np.where(fill, a[...,3], a[...,3] * keep)
    Image.fromarray(a.astype(np.uint8)).save(f'{dst}/{f}')
    print(f, 'old rim max', round(old,1))
