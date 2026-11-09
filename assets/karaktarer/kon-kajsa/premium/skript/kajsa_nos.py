# Lyfter ut Kajsas rosa mule (med näsborrarna, ur faceless) till cut/kajsa-nos.png, och fyller kroppen under med
# pannans krämkrita (speglad ruta) till cut/kajsa-body-tom.png. (flackar.py tar hela den gräddvita kroppen som fläck.)
import numpy as np
from PIL import Image
from scipy import ndimage
k = np.asarray(Image.open('cut/kajsa-body.png').convert('RGBA')).astype(float)
fl = np.asarray(Image.open('cut/kajsa-faceless.png').convert('RGBA')).astype(float)
rgb = fl[..., :3]
rosa = (rgb[..., 0] - rgb[..., 1] > 30) & (rgb[..., 0] > 190)
lab, n = ndimage.label(rosa); s = ndimage.sum(rosa, lab, range(1, n + 1))
mule = ndimage.binary_fill_holes(lab == 1 + s.argmax())
mule = ndimage.binary_opening(mule, iterations=2)
ys, xs = np.nonzero(mule); print('mule', xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', xs.mean().round(), ys.mean().round())
al = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=2).astype(float), 1.2)
nos = np.zeros_like(fl); nos[..., :3] = rgb
# kanten: närmaste rosa färg ut, så att mjukningen inte drar in kräm
_, (iy, ix) = ndimage.distance_transform_edt(~ndimage.binary_erosion(mule, iterations=3), return_indices=True)
ring = ~ndimage.binary_erosion(mule, iterations=3)
nos[ring, :3] = rgb[iy[ring], ix[ring]]
nos[..., 3] = al * 255
Image.fromarray(nos.clip(0, 255).astype(np.uint8)).save('cut/kajsa-nos.png')
r = fl[300:396, 422:518, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
fyll = ndimage.gaussian_filter(ndimage.binary_dilation(mule, iterations=8).astype(float), 2)[..., None]
k[..., :3] = k[..., :3] * (1 - fyll) + krita * fyll
Image.fromarray(k.clip(0, 255).astype(np.uint8)).save('cut/kajsa-body-tom.png')
