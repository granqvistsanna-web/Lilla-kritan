# Elsas ben: ritade (som Kajsas och Zebbes), för att kroppsbilden från Flow inte slutar där konstens ben börjar.
# Gråblå krita med konstens mörkare gråblå kontur, tre ljusa tånaglar nedtill, lång rot 80 px upp under kroppen.
# Mått ur konsten (elsa-forsta-b.jpg i 1024): vänster ben x 370–470, höger 562–668, fotsulan i 930.
# Kör tunn_kant 10 efteråt.
#   python3 skript/elsa_ben.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rigg = json.load(open(f'{mapp}/elsa-rigg.json'))['delar']
fl = np.asarray(Image.open(f'{mapp}/cut/elsa-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
gra = kakel(*json.load(open(f'{mapp}/skript/ruta.json'))['krita'])
KONTUR = np.array([131., 144., 159.]); NAGEL = np.array([250., 238., 222.])
yy, xx = np.mgrid[:1024, :1024].astype(float)
BOT, W, RC = 930, 50, 22           # fotsulan, halva bredden, hörnens radie
for n in ('leg-l', 'leg-r'):
    px, py = rigg[n]['vridpunkt']
    cx, top = px, py - 80
    ax = np.abs(xx - cx)
    dx = np.maximum(ax - (W - RC), 0); dy = yy - (BOT - RC)
    inne = np.where(dy <= 0, ax <= W, np.hypot(dx, dy) <= RC) & (yy >= top + W)
    inne |= np.hypot(xx - cx, yy - (top + W)) <= W          # rund rot uppe under kroppen
    dist = ndimage.distance_transform_edt(inne)
    rgb = gra.copy()
    rgb[dist <= 7] = KONTUR
    nagel = np.zeros_like(inne)
    for ox in (-30, 0, 30):
        nagel |= ((xx - cx - ox) / 12.5) ** 2 + ((yy - (BOT - 17)) / 14) ** 2 <= 1
    nagel &= yy <= BOT - 7                                   # naglarna står på konturen, som i konsten
    rgb[nagel] = NAGEL
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[inne, 3] = 255
    Image.fromarray(img).save(f'{mapp}/cut/elsa-{n}.png')
    print(n, 'klar', (px, py))
