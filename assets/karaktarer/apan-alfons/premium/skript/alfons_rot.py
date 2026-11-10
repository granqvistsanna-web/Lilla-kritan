# Alfons öron och svans ur konsten (cut/alfons-faceless.png), med lång rot i delens egen bruna krita (som Elsas elsa_rot.py).
# delar.py slog ihop svansen med höger arm (de nuddar via den vita kanten), så öronen och svansen klipps om här:
#   öron:  konstens öronpixlar utanför kroppen + en bred rot: kroppens yta inom 70 px från örat, fylld med brun krita,
#          men inte längre upp eller ner än örats kontakt med huvudet (annars vrids roten ut under örat som en stump).
#   svans: konstens svanspixlar under höger arm (x > 700, y > 640) + kapsel 80 px in mot kroppens mitt, brun krita med
#          konstens mörkare kontur längs sidorna.
# Skriver cut/alfons-ear-l/-r.png, cut/alfons-tail.png och vridpunkterna i alfons-rigg.json. Kör tunn_kant 10 efteråt.
#   python3 skript/alfons_rot.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rf = f'{mapp}/alfons-rigg.json'; rigg = json.load(open(rf))
B = np.asarray(Image.open(f'{mapp}/cut/alfons-body.png').convert('RGBA'))[..., 3] > 128
fl = np.asarray(Image.open(f'{mapp}/cut/alfons-faceless.png').convert('RGBA'))
rgb = fl[..., :3].astype(int)
yy, xx = np.mgrid[:1024, :1024]
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
r = fl[y0:y0 + 96, x0:x0 + 96, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
KONTUR = np.array([135, 76, 50])
vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
farg = (fl[..., 3] > 128) & ~vit
utanfor = farg & ~ndimage.binary_dilation(B, iterations=10)    # body.png har ~10 px vit kant runt färgen
by, bx = np.nonzero(B); mitt = np.array([bx.mean(), by.mean()])

def storsta(m):
    lab, n = ndimage.label(m)
    return lab == 1 + np.argmax(ndimage.sum(m, lab, range(1, n + 1)))

def spara(namn, behall, rot, kant=None):
    ut = np.zeros((1024, 1024, 4), np.uint8)
    ut[..., :3] = krita
    rot = rot & ~behall
    if kant is not None: ut[kant & rot, :3] = KONTUR
    ut[behall, :3] = fl[behall, :3]
    ut[rot | behall, 3] = 255
    Image.fromarray(ut).save(f'{mapp}/cut/alfons-{namn}.png')

# Öronen: vänster/höger om kroppen, ovanför armarna (y < 480)
for n, sida in [('ear-l', xx < 512), ('ear-r', xx >= 512)]:
    ora = storsta(utanfor & sida & (yy < 480))
    rot = B & ndimage.binary_dilation(ora, iterations=70)
    kontakt = ndimage.binary_dilation(ora, iterations=14) & B
    ky = np.nonzero(kontakt)[0]
    rot &= (yy > ky.min() + 15) & (yy < ky.max() - 15)
    rot = ndimage.binary_opening(rot, iterations=14)
    # glipan mellan örat och kroppen (konstens kontur och vita kant) fylls med krita, så att örat och roten blir en bit
    hel = ndimage.binary_fill_holes(ndimage.binary_closing(np.pad(ora | rot, 30), iterations=16))[30:-30, 30:-30]
    rot = (rot | hel) & ~ora
    spara(n, ora, rot)
    ky, kx = np.nonzero(kontakt); p = np.array([kx.mean(), ky.mean()])
    u = mitt - p; u /= np.linalg.norm(u); p = p + 40 * u
    rigg['delar'][n] = {'fil': f'cut/alfons-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    print(n, 'vridpunkt', p.round(), 'öra', ora.sum(), 'rot', rot.sum())

# Svansen: nedre högra hörnet, under armen
sv = storsta(utanfor & (xx > 700) & (yy > 640))
kontakt = ndimage.binary_dilation(sv, iterations=14) & B
ky, kx = np.nonzero(kontakt); p = np.array([kx.mean(), ky.mean()])
u = mitt - p; u /= np.linalg.norm(u)
nara = sv & (np.hypot(xx - p[0], yy - p[1]) < 60)
rr = max(10.0, ndimage.distance_transform_edt(sv)[nara].max() if nara.any() else 14)
a, b = p - u * 1.3 * rr, p + u * 80
t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
rad = 1.3 * rr * (1 - 0.1 * t)     # lite tjockare än svansen vid kanten, så att inget steg syns när den viftar
spara('tail', sv, dist <= rad, dist > rad - 6)
rigg['delar']['tail'] = {'fil': 'cut/alfons-tail.png', 'vridpunkt': [int(p[0]), int(p[1])]}
print('tail vridpunkt', p.round(), 'rot r', rr)
json.dump(rigg, open(rf, 'w'), indent=2, ensure_ascii=False)
