#!/usr/bin/env python3
"""Tonar ner kritstrecken på en rumsplattas vägg (Sanna 2026-11-17: "more faint crayon scratches").

Väggens jämna färg räknas fram med ett medianfilter (de tunna strecken försvinner i det) och
de pixlar som skiljer sig tydligt från den tonas mot den. Kornet i väggen är för svagt för att
räknas, så det ligger kvar. Golvet och rutor som ska vara orörda (dörrar, möbler, krans) lämnas.

  python3 verktyg/lugna_streck.py in.jpeg ut.jpeg GOLV_Y [--styrka 0.85] [--skydda x0,y0,x1,y1 ...]
Alla mått i plattans egna pixlar. GOLV_Y = golvlinjen (allt under den lämnas).
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

args = sys.argv[1:]
inn, ut, golv = args[0], args[1], int(args[2])
styrka = float(args[args.index('--styrka') + 1]) if '--styrka' in args else 0.6
rutor = [tuple(map(int, r.split(','))) for r in args[args.index('--skydda') + 1:]] if '--skydda' in args else []

a = np.asarray(Image.open(inn).convert('RGB')).astype(float)
H, W, _ = a.shape
# medianen på en fjärdedel av storleken (snabbt), sedan uppskalad: väggens jämna färg
liten = np.asarray(Image.fromarray(a.astype(np.uint8)).resize((W // 4, H // 4), Image.BILINEAR)).astype(float)
bas = np.stack([ndimage.median_filter(liten[..., c], size=9) for c in range(3)], -1)
bas = np.asarray(Image.fromarray(bas.clip(0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)).astype(float)

m = np.abs(a - bas).sum(-1) > 36
m[golv - 12:] = False
for x0, y0, x1, y1 in rutor:
    m[y0:y1, x0:x1] = False
# skarp mask (ingen mjukning): bara strecket självt blir svagare, kornet runt det rörs inte, så det inte blir suddigt
m = ndimage.binary_dilation(m, iterations=1)
w = m[..., None] * styrka
Image.fromarray((a * (1 - w) + bas * w).clip(0, 255).astype(np.uint8)).save(ut, quality=93)
print(ut)
