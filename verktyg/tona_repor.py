"""Tona ner ljusa kritrepor i himlen: ljusa, långsträckta fläckar ovanför horisonten
som ligger nära himlens färg ersätts med omgivningens median. Prickar (kornet) lämnas."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

src, dst, horisont = sys.argv[1], sys.argv[2], float(sys.argv[3])
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
h, w, _ = im.shape
hy = int(h * horisont) - 6

lum = im.mean(2)
med = np.stack([nd.median_filter(im[..., c], size=25) for c in range(3)], 2)
medlum = med.mean(2)
# himmel = nära den vanliga himmelsfärgen (inte stuga, gran, snö)
sky = np.median(im[:hy].reshape(-1, 3), 0)
nara = np.abs(med - sky).max(2) < 40
ljus = (lum - medlum) > 6
mask = ljus & nara
mask[hy:] = False
lab, n = nd.label(nd.binary_dilation(mask, iterations=2))
storlek = nd.sum(np.ones_like(lum), lab, range(1, n + 1))
sl = nd.find_objects(lab)
behall = np.zeros(n + 1, bool)
for i, s in enumerate(sl):
    hh, ww = s[0].stop - s[0].start, s[1].stop - s[1].start
    if max(hh, ww) > 40:  # långsträckt = repa, inte korn
        behall[i + 1] = True
repor = behall[lab] & nd.binary_dilation(mask, iterations=3)
repor = nd.gaussian_filter(repor.astype(np.float32), 1.5)[..., None]
ut = im * (1 - repor) + med * repor
Image.fromarray(ut.clip(0, 255).astype(np.uint8)).save(dst, quality=95)
print(f"{n} fläckar, {behall.sum()} repor tonade")
