# Alfons ben: konstens ben och tan fot under kroppen (y >= 834, kroppsfyllningens nederkant) ur cut/v1/alfons-leg-*.png,
# plus en lång rot 80 px upp under kroppen med benets hela bredd (rak kapsel, rund topp) i brun krita med konstens mörkare
# kontur längs sidorna. langre_rot.py gav en för smal rot (33 px mot benets 68). Skriver cut/alfons-leg-l/-r.png och
# vridpunkterna. Kör tunn_kant 10 efteråt.
#   python3 skript/alfons_ben.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rf = f'{mapp}/alfons-rigg.json'; rigg = json.load(open(rf))
fl = np.asarray(Image.open(f'{mapp}/cut/alfons-faceless.png').convert('RGBA'))
rgb = fl[..., :3].astype(int)
farg = (fl[..., 3] > 128) & ~((rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22))
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
r = fl[y0:y0 + 96, x0:x0 + 96, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
KONTUR = np.array([135, 76, 50])
yy, xx = np.mgrid[:1024, :1024]
TOPP = 834          # kroppsfyllningens nederkant
for n, (xa, xb) in [('leg-l', (397, 467)), ('leg-r', (571, 643))]:
    ben = farg & (yy >= TOPP) & (xx >= xa - 70) & (xx <= xb + 70)
    lab, k = ndimage.label(ben); ben = lab == 1 + np.argmax(ndimage.sum(ben, lab, range(1, k + 1)))
    cx, w = (xa + xb) / 2, (xb - xa) / 2
    top = TOPP - 80
    rot = (np.abs(xx - cx) <= w) & (yy >= top + w) & (yy <= TOPP + 6)
    rot |= np.hypot(xx - cx, yy - (top + w)) <= w
    rot &= ~ben
    d = ndimage.distance_transform_edt(rot | ben)
    ut = np.zeros((1024, 1024, 4), np.uint8); ut[..., :3] = krita
    ut[rot & (d <= 6), :3] = KONTUR
    ut[ben, :3] = fl[ben, :3]
    ut[ben | rot, 3] = 255
    Image.fromarray(ut).save(f'{mapp}/cut/alfons-{n}.png')
    rigg['delar'][n] = {'fil': f'cut/alfons-{n}.png', 'vridpunkt': [int(cx), TOPP + 6]}
    print(n, 'vridpunkt', int(cx), TOPP + 6)
json.dump(rigg, open(rf, 'w'), indent=2, ensure_ascii=False)
