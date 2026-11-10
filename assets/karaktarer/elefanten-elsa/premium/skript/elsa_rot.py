# Elsas öron och svans ur konsten (cut/elsa-faceless.png), med lång rot i delens egen gråblå krita.
# delar.py slog ihop svansen med höger arm (de sitter nära varandra), så delarna klipps om här:
#   öron:  konstens öronpixlar utanför kroppen + en bred rot: kroppens yta inom 70 px från örat, fylld med gråblå krita
#          (de stora öronen ligger mot huvudet längs en lång kant, så roten följer hela kanten, inte en kapsel). Ett lutat
#          öra visar då gråblå krita vid huvudet, aldrig en rak skuren kant.
#   svans: konstens svanspixlar (nedre högra hörnet, under armen) + kapsel 80 px in mot kroppens mitt, gråblå krita med
#          konstens kontur längs sidorna (som Zebbes).
# Skriver cut/elsa-ear-l/-r.png, cut/elsa-tail.png och vridpunkterna i elsa-rigg.json. Kör tunn_kant 10 efteråt.
#   python3 skript/elsa_rot.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rf = f'{mapp}/elsa-rigg.json'; rigg = json.load(open(rf))
B = np.asarray(Image.open(f'{mapp}/cut/elsa-body.png').convert('RGBA'))[..., 3] > 128
fl = np.asarray(Image.open(f'{mapp}/cut/elsa-faceless.png').convert('RGBA'))
rgb = fl[..., :3].astype(int)
yy, xx = np.mgrid[:1024, :1024]
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
r = fl[y0:y0 + 96, x0:x0 + 96, :3]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
KONTUR = np.array([131, 144, 159])
vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
farg = (fl[..., 3] > 128) & ~vit
utanfor = farg & ~ndimage.binary_dilation(B, iterations=10)    # body.png har 10 px vit kant runt färgen
by, bx = np.nonzero(B); mitt = np.array([bx.mean(), by.mean()])

def storsta(m):
    lab, n = ndimage.label(m)
    return lab == 1 + np.argmax(ndimage.sum(m, lab, range(1, n + 1)))

def spara(namn, behall, rot, kant=None):
    ut = np.zeros((1024, 1024, 4), np.uint8)
    ut[..., :3] = krita        # genomskinliga pixlar får också kritans färg: tunn_kant stänger små glipor, och de ska inte bli svarta
    rot = rot & ~behall
    if kant is not None: ut[kant & rot, :3] = KONTUR
    ut[behall, :3] = fl[behall, :3]
    ut[rot | behall, 3] = 255
    Image.fromarray(ut).save(f'{mapp}/cut/elsa-{namn}.png')

# Öronen: vänster/höger om kroppen, ovanför armarna (y < 560)
for n, sida in [('ear-l', xx < 512), ('ear-r', xx >= 512)]:
    ora = storsta(utanfor & sida & (yy < 560))
    # plus konstens öra i bandet under kroppens vita kant (annars blir det en glipa mellan örat och huvudet)
    band = B & ~ndimage.binary_erosion(B, iterations=12)
    ora |= farg & band & ndimage.binary_dilation(ora, iterations=16)
    rot = B & ndimage.binary_dilation(ora, iterations=70)
    # roten får inte gå längre upp eller ner än örats kontakt med huvudet (minus 15 px): då vrids den ut förbi kroppens
    # kant under örat och syns som en stump (hoppet, första försöket). Rundad med en öppning.
    kontakt = ndimage.binary_dilation(ora, iterations=14) & B
    ky = np.nonzero(kontakt)[0]
    rot &= (yy > ky.min() + 15) & (yy < ky.max() - 15)
    rot = ndimage.binary_opening(rot, iterations=14)
    spara(n, ora, rot)
    # vridpunkt: mitten av kontaktkanten, 40 px in mot kroppens mitt
    kontakt = ndimage.binary_dilation(ora, iterations=14) & B
    ky, kx = np.nonzero(kontakt); p = np.array([kx.mean(), ky.mean()])
    u = mitt - p; u /= np.linalg.norm(u); p = p + 40 * u
    rigg['delar'][n] = {'fil': f'cut/elsa-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    print(n, 'vridpunkt', p.round(), 'öra', ora.sum(), 'rot', rot.sum())

# Svansen: nedre högra hörnet, under armen
sv = storsta(utanfor & (xx > 740) & (yy > 660))
kontakt = ndimage.binary_dilation(sv, iterations=14) & B
ky, kx = np.nonzero(kontakt); p = np.array([kx.mean(), ky.mean()])
u = mitt - p; u /= np.linalg.norm(u)
nara = sv & (np.hypot(xx - p[0], yy - p[1]) < 60)
rr = max(10.0, ndimage.distance_transform_edt(sv)[nara].max() if nara.any() else 14)
a, b = p - u * rr, p + u * 80
t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
rad = rr * (1 - 0.1 * t)
spara('tail', sv, dist <= rad, dist > rad - 6)
rigg['delar']['tail'] = {'fil': 'cut/elsa-tail.png', 'vridpunkt': [int(p[0]), int(p[1])]}
print('tail vridpunkt', p.round(), 'rot r', rr)
json.dump(rigg, open(rf, 'w'), indent=2, ensure_ascii=False)
