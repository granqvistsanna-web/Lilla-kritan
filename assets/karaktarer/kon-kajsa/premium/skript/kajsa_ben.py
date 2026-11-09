# Kajsas ben: ritade (konstens ben hade grå skuggkilar och prickar). Krämkrita med grå kontur, mörk klöv nedtill,
# lång rot 80 px upp under kroppen. Skriver i varm-färg (kör tunn_kant 10, sedan varm.py -1).
import numpy as np
from PIL import Image
from scipy import ndimage
fl = np.asarray(Image.open('cut/kajsa-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
mork = fl.max(2) < 90
d = ndimage.distance_transform_edt(ndimage.binary_opening(mork, iterations=2))
my, mx = np.unravel_index(d.argmax(), d.shape); s = int(min(64, d.max() * 1.3))
svart, gradde = kakel(mx - s // 2, my - s // 2, s), kakel(422, 300)
KONTUR = np.array([197., 178., 160.])
yy, xx = np.mgrid[:1024, :1024].astype(float)
for n, cx, py in [('leg-l', 435, 839), ('leg-r', 605, 832)]:
    top, bot, rc = py - 80, 918, 15
    w = 31 - 3 * np.clip((yy - 840) / 78, 0, 1)
    ax = np.abs(xx - cx)
    dx = np.maximum(ax - (w - rc), 0); dy = yy - (bot - rc)
    inne = np.where(dy <= 0, ax <= w, np.hypot(dx, dy) <= rc) & (yy >= top + 31)
    inne |= np.hypot(xx - cx, yy - (top + 31)) <= 31
    dist = ndimage.distance_transform_edt(inne)
    rgb = gradde.copy()
    rgb[dist <= 7] = KONTUR
    rgb[(yy > 884) & inne] = svart[(yy > 884) & inne]
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[inne, 3] = 255
    Image.fromarray(img).save(f'cut/kajsa-{n}.png')
