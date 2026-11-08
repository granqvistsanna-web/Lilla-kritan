# Bygger lage-body.png: body-a (öron och svans borta, samma form som faceless), benen klipps vid äggets ritade
# underkant (kurva ur faceless) och armarna vid body-b:s slutna sidor (armhöjd).
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

d = sys.argv[1]
L = lambda f: np.asarray(Image.open(f).convert("RGB").resize((1024, 1024), Image.LANCZOS)).astype(int)
F, A, B = L(f"{d}/lage-faceless.png"), L(f"{d}/original/body-a.png"), L(f"{d}/original/body-b.png")
fyll = lambda X: ndimage.binary_fill_holes(ndimage.binary_closing(X.min(2) < 228, iterations=4))
ff, af, bf = F.min(2) < 228, fyll(A), fyll(B)
lum = F.sum(2)
pts = []
for x in range(260, 780, 2):
    ok = ff[740:860, x]
    if ok.sum() < 10:
        continue
    y = 740 + int(np.argmin(np.where(ok, lum[740:860, x], 9999)))
    if y < 845:
        pts.append((x, y))
x, y = np.array(pts).T
c = np.polyfit(x, y, 4)
for _ in range(3):  # släng avvikare (benens lodräta kanter)
    r = y - np.polyval(c, x); k = np.abs(r) < 3 * np.std(r) + 1
    x, y = x[k], y[k]; c = np.polyfit(x, y, 4)
yy, xx = np.mgrid[:1024, :1024]
under = np.polyval(c, np.clip(xx, x.min(), x.max())) + 3
armband = (yy > 460) & (yy < 640) & ((xx < 300) | (xx > 720))
fill = af & ((yy <= under) | (yy < 700)) & (~armband | bf)
fill = ndimage.binary_opening(fill, iterations=3)
lab, n = ndimage.label(fill); s = ndimage.sum(fill, lab, range(1, n + 1)); fill = lab == 1 + np.argmax(s)
fill = ndimage.binary_fill_holes(fill)
dist = ndimage.distance_transform_edt(~fill)
ut = np.full_like(A, 255)
ut[fill] = A[fill]
ut[(dist > 15) & (dist <= 17)] = 200  # grå klipplinje runt kanten, som i konsten (egen_kant.py klipper där)
Image.fromarray(ut.astype("uint8")).save(f"{d}/lage-body.png")
print("botten", int(np.polyval(c, 512)), "punkter", len(x))
