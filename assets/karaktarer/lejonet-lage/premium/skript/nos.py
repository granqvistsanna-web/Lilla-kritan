# Nosfläcken (gräddvit nos med mörk nos och ljus rand ovanför) lyfts ut ur lejonets kropp. flackar.py tar hela den ljusgula
# kroppen, så här används gräddvitt (mycket blått för att vara gult) + mörkt inom ansiktsrutan. Fyllning under: som flackar.py.
import sys
import numpy as np
from PIL import Image
from scipy import ndimage
d = sys.argv[1]
a = np.asarray(Image.open(f"{d}/cut/lage-body.png").convert("RGBA")).copy()
rgb = a[..., :3].astype(int)
yy, xx = np.mgrid[:1024, :1024]
ruta = (xx > 380) & (xx < 640) & (yy > 360) & (yy < 600)
gradd = (rgb[..., 2] > 150) & (rgb[..., 0] > 225) & (rgb[..., 1] > 200)
mork = rgb.max(2) < 120
f = ndimage.binary_fill_holes(ndimage.binary_closing((gradd | mork) & ruta, iterations=4))
lab, n = ndimage.label(f); f = lab == 1 + np.argmax(ndimage.sum(f, lab, range(1, n + 1)))
dist = ndimage.distance_transform_edt(~f)
ut = a.copy(); ut[..., 3] = (np.clip(1 - (dist - 2) / 4, 0, 1) * 255).astype("uint8")
Image.fromarray(ut).save(f"{d}/cut/lage-nos.png", optimize=True)
bx, by = 420, 690
p = a[by:by + 96, bx:bx + 96, :3]
p = np.concatenate([p, p[:, ::-1]], 1); p = np.concatenate([p, p[::-1]], 0)
tex = np.tile(p, (6, 6, 1))[:1024, :1024]
tom = a.copy(); under = dist <= 8; tom[under, :3] = tex[under]
Image.fromarray(tom).save(f"{d}/cut/lage-body-tom.png", optimize=True)
ys, xs = np.nonzero(f); print("nos mitt", int(xs.mean()), int(ys.mean()), "ruta", xs.min(), xs.max(), ys.min(), ys.max())
