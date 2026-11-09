# Zebbes ben: ritade som Kajsas (kroppens Flow-bild går längre ner än konstens, så det som syntes av konstens ben blev
# en kort stump med smal rot). Krämkrita med grå kontur, två svarta randkilar (som konstens ben), svart hov nedtill,
# lång rot 80 px upp under kroppen. Skriver i varm-färg (kör tunn_kant 10, sedan varm.py -1).
import json
import numpy as np
from PIL import Image
from scipy import ndimage
fa = np.asarray(Image.open('cut/zebbe-faceless.png').convert('RGBA')).astype(float)
fl = fa[..., :3]
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
mork = (fl.max(2) < 90) & (fa[..., 3] > 128)   # genomskinligt runt figuren är svart i rgb
d = ndimage.distance_transform_edt(ndimage.binary_opening(mork, iterations=2))
my, mx = np.unravel_index(d.argmax(), d.shape); s = int(min(64, d.max() * 1.3))
svart, gradde = kakel(mx - s // 2, my - s // 2, s), kakel(464, 610)
KONTUR = np.array([197., 178., 160.])
rigg = json.load(open('zebbe-rigg.json'))['delar']
yy, xx = np.mgrid[:1024, :1024].astype(float)
for n, ut in [('leg-l', -1), ('leg-r', 1)]:
    cx, py = rigg[n]['vridpunkt']
    top, bot, rc = py - 80, 918, 15
    w = 31 - 3 * np.clip((yy - 840) / 78, 0, 1)
    ax = np.abs(xx - cx)
    dx = np.maximum(ax - (w - rc), 0); dy = yy - (bot - rc)
    inne = np.where(dy <= 0, ax <= w, np.hypot(dx, dy) <= rc) & (yy >= top + 31)
    inne |= np.hypot(xx - cx, yy - (top + 31)) <= 31
    dist = ndimage.distance_transform_edt(inne)
    rgb = gradde.copy()
    rgb[dist <= 7] = KONTUR
    # randkilar: en från yttersidan, en från innersidan, lite sneda och spetsiga inåt (som konstens)
    u = (xx - cx) * ut / 31                                  # −1 innersidan … 1 yttersidan
    for yc, fran in [(853, 1), (872, -1)]:
        k = (u * fran + 1) / 2                               # 1 vid kilens bas, 0 vid motsatt kant
        halv = 9 * np.clip((k - 0.2) / 0.6, 0, 1)        # kilen smalnar inåt och slutar en bit från andra kanten
        rand = inne & (np.abs(yy - (yc - 4 * fran * u)) < halv)
        rgb[rand] = svart[rand]
    rgb[(yy > 886) & inne] = svart[(yy > 886) & inne]
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[inne, 3] = 255
    Image.fromarray(img).save(f'cut/zebbe-{n}.png')
    print(n, 'klar', cx, py)
