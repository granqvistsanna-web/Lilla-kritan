# Pims delar efter delar.py (kör i premium/): allt utom kroppen är svart krita, så delarna byggs här.
# - Öron och svans: delens svarta pixlar utanför kroppen (inte kroppens grå kontur eller vita kant, som delar.py tog med)
#   + en lång rundad rot (80 px in under kroppen, mot kroppens mitt) i samma svarta krita. delar.py hittade inte svansen
#   (för liten, < 1500 px), så den tas ur pim-faceless.png. Originalen från delar.py ligger i cut/v1/.
# - Ben: ritade (som Ruts), svart kapsel från roten 80 px upp under kroppen ner till konstens runda fot (y 918).
# - Armar: ritade runda svarta stumpar i ett stycke (som Zebbes och Ruts): rot r 23 inne i kroppen, hand r 30, 85 px från
#   vridpunkten 12 px innanför kroppens kant, 50° under vågrätt, och -fram-kopior (vita kanten tonad mot roten).
# - Ögonfläckarna: ur pim-faceless.png (konstens gråsvarta; Flow-kroppen gjorde dem nästan svarta) till cut/pim-nos.png,
#   som följer ansiktet. Kroppen under (cut/pim-body-tom.png) fylls med krämkrita där fläckarna satt.
# Efteråt (Zebbes krämtrick, ../../zebran-zebbe/premium/skript/varm.py): varm.py 1 på body/body-tom, tunn_kant.py 10 på body,
# body-tom, öron, svans, ben och arm-l/-r (inte nos och -fram), varm.py -1 på body/body-tom. Kör om från en färsk delar.py.
import json, shutil, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
L = 80
rigg = json.load(open('pim-rigg.json'))
D = rigg['delar']
fa = np.asarray(Image.open('cut/pim-faceless.png').convert('RGBA'))
bo = np.asarray(Image.open('cut/pim-body.png').convert('RGBA'))
B = bo[..., 3] > 128
yy, xx = np.mgrid[:1024, :1024]
def kakel(rgb, x, y, s=96):
    r = rgb[y:y + s, x:x + s].astype(float); r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 2, 1024 // (2 * s) + 2, 1))[:1024, :1024]
SVART = (fa[..., :3].max(2) < 110) & (fa[..., 3] > 128)
_dt = ndimage.distance_transform_edt(ndimage.binary_opening(SVART, iterations=2))
_my, _mx = np.unravel_index(_dt.argmax(), _dt.shape); _s = int(min(64, _dt.max() * 1.3))
svart = kakel(fa[..., :3], _mx - _s // 2, _my - _s // 2, _s)   # mitten av den största helt svarta biten (örat)
krem = kakel(bo[..., :3], 464, 600)            # ren krämkrita på magen
Bf = tunn_kant.fyllning(np.dstack([bo[..., :3] - [0, 4, 14], bo[..., 3:]]).clip(0, 255).astype(np.uint8))  # kroppens färgyta (värmd, annars räknas krämen som vit)
by, bx = np.nonzero(Bf); mitt = np.array([bx.mean(), by.mean()])
print('kroppens yta', bx.min(), bx.max(), by.min(), by.max(), 'mitt', mitt.round())
Path('cut/v1').mkdir(exist_ok=True)

def spara(m, namn):
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = svart.clip(0, 255); img[m, 3] = 255
    Image.fromarray(img).save(f'cut/pim-{namn}.png')

# öron och svans
utanfor = ~ndimage.binary_dilation(Bf, iterations=3)
svans = SVART & utanfor & (xx > 680) & (yy > 690) & (yy < 800)
ys, xs = np.nonzero(svans); D['tail'] = {'fil': 'cut/pim-tail.png', 'vridpunkt': [int(xs.min()) + 2, int(ys.mean())]}
for d in ['ear-l', 'ear-r', 'tail']:
    if d != 'tail' and not Path(f'cut/v1/pim-{d}.png').exists(): shutil.copy(f'cut/pim-{d}.png', f'cut/v1/pim-{d}.png')
    if d == 'tail': farg = svans
    else:
        v1 = np.asarray(Image.open(f'cut/v1/pim-{d}.png').convert('RGBA'))
        farg = (v1[..., 3] > 128) & (v1[..., :3].max(2) < 110) & utanfor
    lab, n = ndimage.label(farg); farg = lab == 1 + np.argmax(ndimage.sum(farg, lab, range(1, n + 1)))
    farg = ndimage.binary_fill_holes(ndimage.binary_closing(farg, iterations=3))
    p = np.array(D[d]['vridpunkt'], float)
    u = mitt - p; u /= np.linalg.norm(u)
    r = 28 if d == 'tail' else 40
    a, b = p - u * 6, p + u * L
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    kapsel = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= r * (1 - 0.15 * t)
    spara(farg | kapsel, d)
    print(d, 'vridpunkt', p, 'rot r', r)

# ben: kapsel från roten ner till den runda foten (konstens ben 395–467 och 569–643, fötterna slutar vid 918)
for n, cx, py in [('leg-l', 431, 839), ('leg-r', 606, 832)]:
    if not Path(f'cut/v1/pim-{n}.png').exists(): shutil.copy(f'cut/pim-{n}.png', f'cut/v1/pim-{n}.png')
    top, rb = py - L, 33
    bot = 918 - rb
    t = np.clip((yy - top) / (bot - top), 0, 1)
    rad = 36 - 3 * t
    spara(np.hypot(xx - cx, yy - (top + t * (bot - top))) <= rad, n)
    D[n] = {'fil': f'cut/pim-{n}.png', 'vridpunkt': [cx, py]}
    print(n, cx, py)

# armar: vridpunkten 12 px innanför kroppens kant på höjden 575
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    if not Path(f'cut/v1/pim-{n}.png').exists(): shutil.copy(f'cut/pim-{n}.png', f'cut/v1/pim-{n}.png')
    rad_x = np.nonzero(Bf[575])[0]
    p = np.array([rad_x.min() + 12 if sx < 0 else rad_x.max() - 12, 575], float)
    D[n] = {'fil': f'cut/pim-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    for fram in (0, 1):
        a = p.copy() if fram else p - u * 45      # -fram börjar vid vridpunkten, annars sticker axeln ut förbi kanten
        b = p + u * 85
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        f = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= 23 + 7 * t
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = svart.clip(0, 255); img[f, 3] = 255
        if fram:
            tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (85 + 30)
            c, al = tunn_kant.ny_alfa(img, 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            img = np.dstack([c, (al * 255).astype(np.uint8)])
        Image.fromarray(img).save(f'cut/pim-{n}{"-fram" if fram else ""}.png')
    print(n, 'vridpunkt', p)

# ögonfläckarna (ur faceless) -> cut/pim-nos.png; kroppen under fylls med kräm
gra = (fa[..., :3].max(2) < 150) & (yy > 300) & (yy < 520) & (xx > 250) & (xx < 780)
lab, n = ndimage.label(ndimage.binary_closing(gra, iterations=2)); s = ndimage.sum(gra, lab, range(1, n + 1))
flack = ndimage.binary_fill_holes(np.isin(lab, 1 + np.argsort(s)[-2:]))
d = ndimage.distance_transform_edt(~flack)
nos = fa.copy(); nos[..., 3] = (np.clip(1 - (d - 1) / 3, 0, 1) * 255).astype(np.uint8)
_, (iy, ix) = ndimage.distance_transform_edt(~ndimage.binary_erosion(flack, iterations=2), return_indices=True)
ring = ~ndimage.binary_erosion(flack, iterations=2)
nos[ring, :3] = fa[iy[ring], ix[ring], :3]          # fläckens egen färg ut i den mjuka kanten (inte krämen)
Image.fromarray(nos).save('cut/pim-nos.png', optimize=True)
ys, xs = np.nonzero(flack); print('fläckar', xs.min(), xs.max(), ys.min(), ys.max())
morkt = (bo[..., :3].max(2) < 150) & (yy > 300) & (yy < 520) & Bf
fyll = ndimage.gaussian_filter(ndimage.binary_dilation(morkt | flack, iterations=8).astype(float), 2)[..., None]
tom = bo.astype(float); tom[..., :3] = tom[..., :3] * (1 - fyll) + krem * fyll
Image.fromarray(tom.clip(0, 255).astype(np.uint8)).save('cut/pim-body-tom.png', optimize=True)
json.dump(rigg, open('pim-rigg.json', 'w'), indent=2, ensure_ascii=False)
