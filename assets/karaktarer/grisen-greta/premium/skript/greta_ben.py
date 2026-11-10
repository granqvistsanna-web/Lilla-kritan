# Gretas ben: ritade (som Zebbes och Ruts), rosa krita med kroppens mörkare rosa kontur och en mörkare rosa klöv
# nedtill, lite bredare och rund (som konstens). Lång rot 80 px upp under kroppen. Kör i premium/, sedan tunn_kant 10.
# Argument: benets halva bredd, klövens halva bredd, botten (y) och x-mitt för vänster/höger ben om de ska flyttas.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
W, WK, BOT = 34, 46, int(sys.argv[1]) if len(sys.argv) > 1 else 930
fl = np.asarray(Image.open('cut/greta-faceless.png').convert('RGB')).astype(float)
r = fl[250:346, 464:560]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
ROSA, KLOV = np.array([249., 190., 194.]), np.array([220., 128., 142.])
KONTUR, KLOVKONTUR = np.array([208., 148., 156.]), np.array([180., 92., 105.])
klovkrita = krita * (KLOV / ROSA)
rigg = json.load(open('greta-rigg.json'))['delar']
yy, xx = np.mgrid[:1024, :1024].astype(float)
for n in ['leg-l', 'leg-r']:
    cx, py = rigg[n]['vridpunkt']
    top = py - 80
    ben = (np.abs(xx - cx) <= W) & (yy >= top + W) & (yy <= BOT - 20)
    ben |= np.hypot(xx - cx, yy - (top + W)) <= W
    # klöven: en rund oval, platt botten
    ky, kx = BOT - 22, cx + (-8 if n == 'leg-l' else 8)       # klöven lite utåt, som konstens: en rund oval, lite avplattad nedtill
    klov = (((xx - kx) / WK) ** 2 + ((yy - ky) / 30) ** 2 <= 1) & (yy <= BOT)
    inne = ndimage.binary_closing(ben | klov, iterations=3)
    dist = ndimage.distance_transform_edt(inne)
    ik = klov & (yy > ky - 18)
    rgb = np.where(ik[..., None], klovkrita, krita)
    kant = dist <= 6
    rgb[kant] = KONTUR
    rgb[kant & ik] = KLOVKONTUR
    # klövens övre kant som en mjuk mörkare linje
    linje = ik & ~ndimage.binary_erosion(ik, iterations=5) & (yy < ky) & ~kant
    rgb[linje] = KLOVKONTUR
    rgb[(np.abs(xx - kx) <= 1.5) & (yy > BOT - 16) & inne] = KLOVKONTUR     # klövens klyfta
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[inne, 3] = 255
    Image.fromarray(img).save(f'cut/greta-{n}.png')
    print(n, 'klar', cx, py, 'botten', BOT)
