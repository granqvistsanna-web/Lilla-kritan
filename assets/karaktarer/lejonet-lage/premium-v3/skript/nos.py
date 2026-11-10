# premium-v3 (slät): nosfläcken (gräddvit nos, ljus rand ovanför och den mörka nosen) lyfts ut ur lejonets kropp, som
# premium/skript/nos.py, så att nosen följer ansiktet i riktningsposen. Den mörka nosen följer med i fläcken (ingen nos i kod).
# Under: ansiktets släta gula färg, utjämnad in från kanten (inte en kritbit som i premium/).
# python3 skript/nos.py <premium-v3-mappen>
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
# utfyllnad inifrån kanten (upprepad utjämning där bara hålet ändras), så att ansiktets svaga färgskiftning fortsätter
under = dist <= 8
ring = (dist > 8) & (dist < 30)
farg = rgb.astype(float); farg[under] = np.median(rgb[ring], 0)
for _ in range(400):
    farg[under] = ndimage.uniform_filter(farg, (9, 9, 1))[under]
tom = a.copy(); tom[under, :3] = farg[under].round().astype("uint8")
Image.fromarray(tom).save(f"{d}/cut/lage-body-tom.png", optimize=True)
ys, xs = np.nonzero(f); print("nos mitt", int(xs.mean()), int(ys.mean()), "ruta", xs.min(), xs.max(), ys.min(), ys.max())
