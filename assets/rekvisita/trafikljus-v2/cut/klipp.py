#!/usr/bin/env python3
"""Klipper trafikljuset v2 (original/trafikljus-v2.jpg, Sannas Flow-bild 2026-11-26) som traktorn: fyllningen ur bilden,
kantfärg inifrån och en jämn vit kant KANT px. Mäter lamporna (mitt, radie) och foten till trafikljus-v2-rigg.json."""
import json, os
import numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi
HER = os.path.dirname(os.path.abspath(__file__))
KANT = 13   # 3 + 1 % av ca 470 px i bild = 7,7 px, delat med skalan 0,59
rgb = np.asarray(Image.open(os.path.join(HER, '..', 'original', 'trafikljus-v2.jpg')).convert('RGB')).astype(np.float32)
H, W = rgb.shape[:2]; mn, mx = rgb.min(2), rgb.max(2); sat = mx - mn
F = ndi.binary_opening((mn < 215) | (sat > 24), iterations=1)
lab, n = ndi.label(F); s = ndi.sum(F, lab, range(1, n + 1)); F = np.isin(lab, 1 + np.nonzero(s > 0.01 * s.max())[0])
F = ndi.binary_fill_holes(F)
kärna = ndi.distance_transform_edt(F) > 2.5
idx = ndi.distance_transform_edt(~kärna, return_distances=False, return_indices=True)
färg = rgb.copy(); k = F & ~kärna; färg[k] = rgb[idx[0][k], idx[1][k]]
d = cv2.GaussianBlur(ndi.distance_transform_edt(~F).astype(np.float32), (0, 0), 2.2)
alfa = np.maximum(np.clip(KANT + 0.5 - d, 0, 1), F.astype(np.float32))
Fa = cv2.GaussianBlur(F.astype(np.float32), (0, 0), 0.7)
col = färg * Fa[..., None] + 255 * (1 - Fa[..., None])
Image.fromarray(np.dstack([col, alfa * 255]).clip(0, 255).astype(np.uint8)).save(os.path.join(HER, 'trafikljus-v2.png'))
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
def lampa(m):
    m = ndi.binary_opening(m, iterations=3); l, n = ndi.label(m); s = ndi.sum(m, l, range(1, n + 1)); m = l == 1 + np.argmax(s)
    ys, xs = np.nonzero(m); return [round(float(xs.mean()), 1), round(float(ys.mean()), 1), round(float(np.sqrt(m.sum() / np.pi)), 1)]
ys, xs = np.nonzero(alfa > 0.5)
json.dump(dict(canvas=[W, H], kant_px=KANT, bbox=[int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())], fot=[round(float(np.nonzero(F[ys.max() - 20])[0].mean()), 1), int(np.nonzero(F.any(1))[0].max())],
  rod=lampa((r > g + 40) & (r > b + 40) & F), gron=lampa((g > r + 25) & (g > b + 10) & F)),
  open(os.path.join(HER, '..', 'trafikljus-v2-rigg.json'), 'w'), indent=2)
