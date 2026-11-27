# Tvättbjörnens delar efter delar.py (kör i premium/). delar.py slog ihop höger arm, svansen och höger ben, och
# hittade varken svansen eller höger ben som egna delar, så allt utom kroppen byggs här (som Pims och Ruts):
# - Öron och svans: konstens pixlar utanför kroppen ur tilda-faceless.png (grått, svart, krämen inne i örat), utan
#   den vita kanten, + en lång rundad rot (80 px in under kroppen, mot kroppens mitt) i delens egen grå krita.
# - Ben: ritade svarta kapslar från roten 80 px upp under kroppen, med en oval fot som pekar lite utåt (som Ruts).
# - Armar: ritade runda stumpar i ett stycke (som Ruts): grå krita med konstens mörkare grå kontur och svart spets,
#   rot r 23, hand r 30, 85 px från vridpunkten 12 px innanför kroppens kant, 50° under vågrätt, och -fram-kopior.
# - Ansiktsfläcken: masken, krämranden ovanför och krämnosen ur tilda-faceless.png -> cut/tilda-nos.png (följer
#   ansiktet). Magen -> cut/tilda-mage.png (följer 40 %). Kroppen under (cut/tilda-body-tom.png) fylls med grå krita.
#   Masken går ut till kroppens kant, så ansiktet maskas med kroppens fyllning (cut/tilda-kropp-mask.png, som Ruts).
# Efteråt: tunn_kant.py 10 på body, body-tom, öron, svans, ben och arm-l/-r (inte nos, mage och -fram).
import json, shutil, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
L = 80
rigg = json.load(open('tilda-rigg.json'))
D = rigg['delar']
Path('cut/v1').mkdir(exist_ok=True)
for f in Path('cut').glob('tilda-*.png'):
    if not (Path('cut/v1') / f.name).exists(): shutil.copy(f, Path('cut/v1') / f.name)
fa = np.asarray(Image.open('tilda-faceless.png').convert('RGBA')).astype(int)
bo = np.asarray(Image.open('cut/v1/tilda-body.png').convert('RGBA'))
yy, xx = np.mgrid[:1024, :1024]
def kakel(rgb, x, y, s=64):
    r = rgb[y:y + s, x:x + s].astype(float); r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 2, 1024 // (2 * s) + 2, 1))[:1024, :1024]
gra = kakel(fa[..., :3], 300, 620)           # ren grå krita (vänster sida av magen)
svart = kakel(fa[..., :3], 330, 400, 64)     # ren svart krita mitt i vänstra masken
Bf = tunn_kant.fyllning(bo)                  # kroppens färgyta (utan vit kant)
by, bx = np.nonzero(Bf); mitt = np.array([bx.mean(), by.mean()])
print('kroppens yta', bx.min(), bx.max(), by.min(), by.max(), 'mitt', mitt.round())
rgb = fa[..., :3]
vit = (rgb.min(2) > 238) & (np.ptp(rgb, 2) < 14)
farg = ~vit & (fa[..., 3] > 128)
mork = rgb.max(2) < 200                       # grått och svart
utanfor = ~ndimage.binary_dilation(Bf, iterations=3)

def kapsel(p, u, r, l=L):
    a, b = p - u * 6, p + u * l
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    return np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= r * (1 - 0.15 * t)

def spara(m, fargbild, namn):
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = fargbild.clip(0, 255); img[m, 3] = 255
    Image.fromarray(img).save(f'cut/tilda-{namn}.png')

def storsta(m):
    lab, n = ndimage.label(m)
    return lab == 1 + np.argmax(ndimage.sum(m, lab, range(1, n + 1))) if n else m

# öron: grå ring + krämen inuti (sluten mot kroppen), konstens egna färger, grå rot
for d, sida in [('ear-l', xx < 512), ('ear-r', xx >= 512)]:
    ring = mork & utanfor & sida & (yy < 340)
    del_ = storsta(ndimage.binary_fill_holes(ring | Bf) & ~Bf & farg & sida & (yy < 340))
    del_ = ndimage.binary_fill_holes(ndimage.binary_closing(del_, iterations=3))
    ys, xs = np.nonzero(del_ & ndimage.binary_dilation(Bf, iterations=6))
    p = np.array([xs.mean(), ys.mean()]); u = mitt - p; u /= np.linalg.norm(u)
    rot = kapsel(p, u, 40) & ~del_
    bild = np.where(rot[..., None], gra, rgb.astype(float))
    spara(del_ | rot, bild, d); D[d] = {'fil': f'cut/tilda-{d}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    print(d, 'vridpunkt', p.round())

# svans: konstens svans utanför kroppen, nedre högra hörnet, utan höger arm och höger ben
sv = farg & utanfor & (xx > 640) & (yy > 585) & ~((xx < 880) & (yy < 640)) & ~((xx < 680) & (yy > 790))
sv = storsta(ndimage.binary_opening(sv, iterations=2))
sv = ndimage.binary_fill_holes(ndimage.binary_closing(sv, iterations=3))
ys, xs = np.nonzero(sv & ndimage.binary_dilation(Bf, iterations=6))
p = np.array([xs.mean(), ys.mean()]); u = mitt - p; u /= np.linalg.norm(u)
rot = kapsel(p, u, 34) & ~sv
spara(sv | rot, np.where(rot[..., None], gra, rgb.astype(float)), 'tail')
D['tail'] = {'fil': 'cut/tilda-tail.png', 'vridpunkt': [int(p[0]), int(p[1])]}
print('tail vridpunkt', p.round())

# ben: svart kapsel från roten ner till fotleden + oval fot (konstens ben ca 395–470 och 568–642, fötterna till y 918)
for n, cx, py, s in [('leg-l', 433, 838, -1), ('leg-r', 604, 836, 1)]:
    top, bot, rad = py - L, 880, 34
    t = np.clip((yy - top) / (bot - top), 0, 1)
    ben = np.hypot(xx - cx, yy - (top + t * (bot - top))) <= rad
    fot = ((xx - (cx + s * 14)) / 48) ** 2 + ((yy - 896) / 22) ** 2 <= 1
    spara(ben | fot, svart, n); D[n] = {'fil': f'cut/tilda-{n}.png', 'vridpunkt': [cx, py]}
    print(n, cx, py)

# armar: grå stump med mörkare grå kontur och svart spets
KONTUR = np.array([118., 106., 112.])
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    rad_x = np.nonzero(Bf[575])[0]
    p = np.array([rad_x.min() + 12 if sx < 0 else rad_x.max() - 12, 575], float)
    D[n] = {'fil': f'cut/tilda-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    for fram in (0, 1):
        a = p.copy() if fram else p - u * 45
        b = p + u * 85
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        rad = 23 + 7 * t
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (85 + 30)
        kant = dist > rad - 5
        k = np.clip((tl - 0.04) / 0.14, 0, 1) if fram else np.ones_like(tl, float)
        bild = np.where(kant[..., None], gra * (1 - k[..., None]) + KONTUR * k[..., None], gra)
        spets = tl > 0.6
        bild[spets] = svart[spets]
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = bild.clip(0, 255); img[f, 3] = 255
        if fram:
            c, al = tunn_kant.ny_alfa(img, 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            img = np.dstack([c, (al * 255).astype(np.uint8)])
        Image.fromarray(img).save(f'cut/tilda-{n}{"-fram" if fram else ""}.png')
    print(n, 'vridpunkt', p)

# ansiktsfläcken och magen ur faceless (inte grått), kroppen under fylls med grå krita
inne = ndimage.binary_erosion(Bf, iterations=4)
icke_gra = inne & ((rgb.max(2) < 95) | ((rgb.min(2) > 200) & (rgb[..., 0] - rgb[..., 2] > 12)))
icke_gra = ndimage.binary_opening(icke_gra, iterations=2)
lab, n = ndimage.label(ndimage.binary_closing(icke_gra, iterations=2))
s = ndimage.sum(icke_gra, lab, range(1, n + 1))
my = ndimage.mean(yy, lab, range(1, n + 1))
stora = [i + 1 for i in range(n) if s[i] > 800]
nos = ndimage.binary_fill_holes(np.isin(lab, [i for i in stora if my[i - 1] < 580]))
mage = ndimage.binary_fill_holes(np.isin(lab, [i for i in stora if my[i - 1] >= 580]))
for m, nm in [(nos, 'nos'), (mage, 'mage')]:
    d = ndimage.distance_transform_edt(~m)
    ut = fa.astype(np.uint8).copy(); ut[..., 3] = (np.clip(1 - (d - 1) / 3, 0, 1) * 255).astype(np.uint8)
    _, (iy, ix) = ndimage.distance_transform_edt(~ndimage.binary_erosion(m, iterations=2), return_indices=True)
    ring = ~ndimage.binary_erosion(m, iterations=2)
    ut[ring, :3] = fa[iy[ring], ix[ring], :3]
    Image.fromarray(ut).save(f'cut/tilda-{nm}.png', optimize=True)
    ys, xs = np.nonzero(m); print(nm, xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', int(xs.mean()), int(ys.mean()))
bor = bo[..., :3].astype(int)
icke_gra_b = Bf & ((bor.max(2) < 95) | ((bor.min(2) > 200) & (bor[..., 0] - bor[..., 2] > 12)))
fyll = ndimage.gaussian_filter(ndimage.binary_dilation(icke_gra_b | nos | mage, iterations=8).astype(float), 2)[..., None]
fyll = fyll * ndimage.binary_erosion(Bf, iterations=3)[..., None]
tom = bo.astype(float); tom[..., :3] = tom[..., :3] * (1 - fyll) + gra * fyll
Image.fromarray(tom.clip(0, 255).astype(np.uint8)).save('cut/tilda-body-tom.png', optimize=True)
F = ndimage.binary_erosion(Bf, iterations=2)
mk = np.zeros((1024, 1024, 4), np.uint8); mk[..., :3] = 255; mk[..., 3] = (ndimage.gaussian_filter(F.astype(float), 1) * 255).astype('uint8')
Image.fromarray(mk).save('cut/tilda-kropp-mask.png', optimize=True)
json.dump(rigg, open('tilda-rigg.json', 'w'), indent=2, ensure_ascii=False)
