# Lyfter ut Gretas tryne (ur faceless) till cut/greta-nos.png, UTAN näsborrar: de målade näsborrarna fylls med trynets
# egen krita 32 px in mot trynets mitt (en bit bredvid, mjuk skarv), och näsborrarna ritas i kod (class="nasa" i
# uttryck.html, bakas in med node verktyg/baka-nasor.mjs). Trynet med de målade näsborrarna sparas som
# original/greta-nos-med-nasa.png. Kroppen under (cut/greta-body-tom.png) fylls med pannans rosa krita.
# Kör i premium/ efter delar.py (som Zebbes zebbe_nos.py, men rosa: trynet är mörkare rosa än kroppen, G < 165).
import numpy as np
from PIL import Image
from scipy import ndimage
k = np.asarray(Image.open('cut/greta-body.png').convert('RGBA')).astype(float)
fl = np.asarray(Image.open('cut/greta-faceless.png').convert('RGBA')).astype(float)
rgb = fl[..., :3]
tr = (rgb[..., 1] < 165) & (rgb[..., 0] > 170) & (fl[..., 3] > 128)
tr[:360] = False; tr[640:] = False; tr[:, :360] = False; tr[:, 664:] = False
lab, n = ndimage.label(tr); s = ndimage.sum(tr, lab, range(1, n + 1))
mule = ndimage.binary_fill_holes(ndimage.binary_closing(lab == 1 + s.argmax(), iterations=3))
mule = ndimage.binary_opening(mule, iterations=2)
ys, xs = np.nonzero(mule); mx = xs.mean()
print('tryne', xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', round(mx), round(ys.mean()))
al = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=2).astype(float), 1.2)
def spara(rg, namn):
    nos = np.zeros_like(fl); nos[..., :3] = rg
    ring = ~ndimage.binary_erosion(mule, iterations=3)
    _, (iy, ix) = ndimage.distance_transform_edt(ring, return_indices=True)
    nos[ring, :3] = rg[iy[ring], ix[ring]]
    nos[..., 3] = al * 255
    Image.fromarray(nos.clip(0, 255).astype(np.uint8)).save(namn)
spara(rgb, 'original/greta-nos-med-nasa.png')
# näsborrarna: de mörka fläckarna inne i trynet (inte konturen längs kanten)
inre = ndimage.binary_erosion(mule, iterations=12)
nasa = inre & (rgb[..., 1] < 115)
lab, n = ndimage.label(nasa); s = ndimage.sum(nasa, lab, range(1, n + 1))
nasa = np.isin(lab, 1 + np.nonzero(s > 80)[0])
for i in range(1, n + 1):
    if s[i - 1] > 80:
        y, x = np.nonzero(lab == i)
        print('näsborre', int(x.mean()), int(y.mean()), 'bredd', x.max() - x.min() + 1, 'höjd', y.max() - y.min() + 1,
              'färg', np.median(rgb[lab == i], 0).astype(int))
fyll = ndimage.binary_dilation(nasa, iterations=5)
ren = rgb.copy()
yy, xx = np.nonzero(fyll)
for y, x in zip(yy, xx):
    ren[y, x] = rgb[y, x + (32 if x < mx else -32)]
m = ndimage.gaussian_filter(fyll.astype(float), 2)[..., None]
ren = rgb * (1 - m) + ren * m
spara(ren, 'cut/greta-nos.png')
r = fl[250:346, 464:560, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
f = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=8).astype(float), 2)[..., None]
k[..., :3] = k[..., :3] * (1 - f) + krita * f
Image.fromarray(k.clip(0, 255).astype(np.uint8)).save('cut/greta-body-tom.png')
