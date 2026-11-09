# Lyfter ut Zebbes gråbeige mule (ur faceless) till cut/zebbe-nos.png, UTAN näsborrar: de målade näsborrarna fylls med
# mulens egen krita från mulens mitt (speglad bit bredvid), och näsborrarna ritas i kod (class="nasa" i uttryck.html).
# Mulen med de målade näsborrarna sparas som original/zebbe-nos-med-nasa.png. Kroppen under (cut/zebbe-body-tom.png)
# fylls med magens krämkrita. Körs i varm-färg (se varm.py), före tunn_kant och varm.py -1.
import numpy as np
from PIL import Image
from scipy import ndimage
k = np.asarray(Image.open('cut/zebbe-body.png').convert('RGBA')).astype(float)
fl = np.asarray(Image.open('cut/zebbe-faceless.png').convert('RGBA')).astype(float)
rgb = fl[..., :3]
gra = (rgb[..., 0] > 185) & (rgb[..., 0] < 236) & (rgb[..., 0] - rgb[..., 2] < 60) & (rgb[..., 1] > 170)
gra[:400] = False; gra[600:] = False
lab, n = ndimage.label(gra); s = ndimage.sum(gra, lab, range(1, n + 1))
mule = ndimage.binary_fill_holes(lab == 1 + s.argmax())
mule = ndimage.binary_opening(mule, iterations=2)
ys, xs = np.nonzero(mule); print('mule', xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', xs.mean().round(), ys.mean().round())
al = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=2).astype(float), 1.2)
def spara(rg, namn):
    nos = np.zeros_like(fl); nos[..., :3] = rg
    _, (iy, ix) = ndimage.distance_transform_edt(~ndimage.binary_erosion(mule, iterations=3), return_indices=True)
    ring = ~ndimage.binary_erosion(mule, iterations=3)
    nos[ring, :3] = rg[iy[ring], ix[ring]]
    nos[..., 3] = al * 255
    Image.fromarray(nos.clip(0, 255).astype(np.uint8)).save(namn)
spara(rgb, 'original/zebbe-nos-med-nasa.png')
# näsborrarna: mörkare fläckar i mulen, vidgade lite, fylls med mulens krita 45 px in mot mitten (spegelvänd), mjuk skarv
nasa = mule & (rgb[..., 0] < 200)
lab, n = ndimage.label(nasa); s = ndimage.sum(nasa, lab, range(1, n + 1))
nasa = np.isin(lab, 1 + np.nonzero(s > 100)[0])
fyll = ndimage.binary_dilation(nasa, iterations=5)
ren = rgb.copy()
yy, xx = np.nonzero(fyll)
for y, x in zip(yy, xx):
    sx = 1 if x < 507 else -1
    ren[y, x] = rgb[y, x + sx * 45]
mjuk = ndimage.gaussian_filter(fyll.astype(float), 2)[..., None]
ren = rgb * (1 - mjuk) + ren * mjuk
print('näsborrar', [(int(np.nonzero(lab == i)[1].mean()), int(np.nonzero(lab == i)[0].mean())) for i in range(1, n + 1) if s[i - 1] > 100])
spara(ren, 'cut/zebbe-nos.png')
r = fl[610:706, 464:560, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
f = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=8).astype(float), 2)[..., None]
k[..., :3] = k[..., :3] * (1 - f) + krita * f
Image.fromarray(k.clip(0, 255).astype(np.uint8)).save('cut/zebbe-body-tom.png')
