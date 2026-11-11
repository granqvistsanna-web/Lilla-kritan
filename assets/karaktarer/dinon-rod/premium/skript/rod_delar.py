# Röda dinons delar (kör i premium/): python3 skript/rod_delar.py
# Ur original/dinon-rod-faceless.jpg (sköld, svans, ben; pixeljusterad mot Sannas val), original/dinon-rod-vald.jpeg (de tre
# hornen, så att de sitter exakt som i den valda bilden) och original/dinon-rod-body-flow.jpg (kroppen).
# Vit kant KANT px (1 % av kroppens höjd, vita-kanter) runt varje del, räknad om från färgytan (verktyg/tunn_kant.py).
# - Kroppen: Flow-kroppen, skalad och flyttad så att den ligger pixeljusterad mot faceless. Magfläcken lyfts ut till
#   cut/dinon-rod-mage.png (mjuk kant), kroppen under (body-tom) fylls med kroppens röda krita.
# - Skölden (ear-l): konstens mörkröda båge med prickar bakom huvudet + en fyllning i samma krita in under kroppens övre del,
#   så att ingen glipa syns när den vrids lite. Ligger BAKOM kroppen.
# - Pannhornen (ear-r, en bild med båda) och noshornet (nos): konstens gräddvita horn ur den valda bilden, mjuk kant utan vitt.
#   De ligger FRAMFÖR kroppen; noshornet hör till ansiktet.
# - Svansen: konstens mörkröda krita utanför kroppen + lång rundad rot (80 px in under kroppen mot dess mitt) i samma krita.
# - Benen: konstens ben utanför kroppen + lång rot rakt upp under kroppen i benets egen krita.
# - Armarna: ritade runda stumpar i ett stycke i kroppens krita (som blå dinons och Pims), med -fram-kopior.
#   Sedan från repots rot: python3 verktyg/klapparm.py assets/karaktarer/dinon-rod/premium dinon-rod 0.85
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, str(Path(__file__).resolve().parents[5] / 'verktyg')); import tunn_kant
N, KANT, L = 'dinon-rod', 6, 80
las = lambda f: np.asarray(Image.open(f).convert('RGB').resize((1024, 1024), Image.LANCZOS)).astype(float)
fa, bo0, val = las('original/dinon-rod-faceless.jpg'), las('original/dinon-rod-body-flow.jpg'), las('original/dinon-rod-vald.jpeg')
yy, xx = np.mgrid[:1024, :1024]
farg = lambda a: ndimage.binary_opening(~((a.min(2) > 228) & (a.max(2) - a.min(2) < 22)), iterations=2)   # allt som inte är vitt
lum = fa.mean(2)

# Kroppen: justera Flow-kroppen mot faceless på äggets vänstra och högra kant (y 330–520, ovanför armarna) och botten mellan benen
def kanter(a):
    m = farg(a); x = [np.nonzero(m[y])[0] for y in range(640, 760, 10)]
    return np.mean([v.min() for v in x]), np.mean([v[v < 760].max() for v in x])
(fl, fr), (bl, br) = kanter(fa), kanter(bo0)
SK = (fr - fl) / (br - bl)                      # Flow ritade kroppen lite större: skala den till faceless bredd, kring bildens mitt
n = int(round(1024 * SK)); o = (1024 - n) // 2
stor = np.full((1024, 1024, 3), 255.0); liten = np.asarray(Image.fromarray(bo0.astype(np.uint8)).resize((n, n), Image.LANCZOS)).astype(float)
if n <= 1024: stor[o:o + n, o:o + n] = liten
else: stor = liten[-o:-o + 1024, -o:-o + 1024]
bo0 = stor; bl, br = kanter(bo0)
DX = int(round((fl + fr - bl - br) / 2))
bott = lambda a, x: np.nonzero(farg(a)[:, x])[0].max()
DY = int(round(np.mean([bott(fa, x) - bott(bo0, x - DX) for x in (490, 500, 510, 520, 530)])))   # äggets botten mellan benen
bo = ndimage.shift(bo0, (DY, DX, 0), order=1, mode='nearest')
print('kroppen skalad', round(SK, 3), 'flyttad', DX, DY, 'bredd faceless', round(fr - fl), 'kropp', round(br - bl))
B = ndimage.binary_fill_holes(farg(bo))
lab, n = ndimage.label(B); B = lab == 1 + np.argmax(ndimage.sum(B, lab, range(1, n + 1)))
by, bx = np.nonzero(B); mitt = np.array([bx.mean(), by.mean()])
print('kroppens yta x', bx.min(), bx.max(), 'y', by.min(), by.max(), 'mitt', mitt.round())

def kakel(rgb, m, s=64):       # speglad ruta ur mitten av den största rena biten av masken m
    dt = ndimage.distance_transform_edt(m); cy, cx = np.unravel_index(dt.argmax(), dt.shape); s = int(min(s, dt.max() * 0.9))
    r = rgb[cy - s // 2:cy + s // 2, cx - s // 2:cx + s // 2]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // r.shape[0] + 2, 1024 // r.shape[1] + 2, 1))[:1024, :1024]
def spara(rgb, m, namn, kant=KANT, kantmask=None):
    img = np.dstack([np.where(m[..., None], rgb, 255), np.where(m, 255, 0)]).clip(0, 255).astype(np.uint8)
    c, al = tunn_kant.ny_alfa(img, kant)
    if kantmask is not None: al = np.where(m, al, al * kantmask)
    Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(f'cut/{N}-{namn}.png', optimize=True)
def storst(m, k=1):
    lab, n = ndimage.label(m); s = ndimage.sum(m, lab, range(1, n + 1)); return np.isin(lab, 1 + np.argsort(s)[::-1][:k])
def kapsel(a, b, ra, rb):
    a, b = np.array(a, float), np.array(b, float); d = b - a
    t = np.clip(((xx - a[0]) * d[0] + (yy - a[1]) * d[1]) / (d @ d), 0, 1)
    return np.hypot(xx - (a[0] + t * d[0]), yy - (a[1] + t * d[1])) <= ra + (rb - ra) * t

Path('cut').mkdir(exist_ok=True)
D = {}
spara(fa, ndimage.binary_fill_holes(farg(fa)), 'faceless')
spara(bo, B, 'body')

# Magfläcken: den ljusa runda fläcken i kroppen
ljus = ndimage.binary_erosion(B, iterations=12) & (bo[..., 1] > 185) & (yy > 480)
mage = ndimage.binary_fill_holes(ndimage.binary_closing(storst(ndimage.binary_opening(ljus, iterations=3)), iterations=4))
my_, mx_ = np.nonzero(mage); print('magfläck x', mx_.min(), mx_.max(), 'y', my_.min(), my_.max())
d = ndimage.distance_transform_edt(~mage)
Image.fromarray(np.dstack([bo, np.clip(1 - (d - 1) / 3, 0, 1) * 255]).clip(0, 255).astype(np.uint8)).save(f'cut/{N}-mage.png', optimize=True)
ren = ndimage.binary_erosion(B, iterations=25) & ~ndimage.binary_dilation(mage, iterations=12) & (yy > 300) & (yy < 520)
bla = kakel(bo, ren, 96)
# under fläcken: kroppens krita, tonad som kroppen runt om (ljusare upptill, djupare nedtill) genom en suddig kopia av kroppen utan fläck
utan = np.where((ndimage.binary_dilation(mage, iterations=20) | ~ndimage.binary_erosion(B, iterations=6))[..., None], np.nan, bo)
vikt = ndimage.gaussian_filter((~np.isnan(utan[..., 0])).astype(float), 40) + 1e-6
ton = np.dstack([ndimage.gaussian_filter(np.nan_to_num(utan[..., c]), 40) / vikt for c in range(3)])
fyll = ndimage.gaussian_filter(ndimage.binary_dilation(mage, iterations=14).astype(float), 5)[..., None]
tom = bo * (1 - fyll) + (ton + bla - bla.mean((0, 1))) * fyll
spara(tom, B, 'body-tom')

ute = farg(fa) & ~ndimage.binary_dilation(B, iterations=2)
mork = fa[..., 0] < 215                                                # sköldens och svansens mörkröda (kroppen och armarna är ljusare)
# Skölden: mörkröd båge bakom huvudet (prickarna fylls i som hål) + fyllning in under kroppens övre del
skold = ndimage.binary_fill_holes(storst(ndimage.binary_opening(ute & (yy < 520) & (mork | (fa[..., 1] > 150)) & ~((fa[..., 1] > 200) & (fa[..., 2] > 180) & (yy < 330) & (np.abs(xx - 512) > 90) & (np.abs(xx - 512) < 200)), iterations=3)))
stex = kakel(fa, ndimage.binary_erosion(skold & mork, iterations=6))
hornen = ndimage.binary_dilation((fa[..., 1] > 190) & (fa[..., 2] > 150) & (yy < 340), iterations=8)      # pannhornen i faceless: byts mot sköldens krita, så att inga hornkanter ligger kvar i skölden
under = ndimage.binary_erosion(B, iterations=6) & (yy < 430)
m = ndimage.binary_fill_holes(ndimage.binary_closing(skold | under, iterations=6))
spara(np.where((skold & ~hornen)[..., None], fa, stex), m, 'ear-l')
sy_, sx_ = np.nonzero(skold); D['ear-l'] = {'fil': f'cut/{N}-ear-l.png', 'vridpunkt': [int((sx_.min() + sx_.max()) / 2), int(sy_.max()) - 60]}
print('sköld x', sx_.min(), sx_.max(), 'y', sy_.min(), sy_.max(), 'vridpunkt', D['ear-l']['vridpunkt'])

# Hornen: gräddvita ur den valda bilden (pannhornen i en bild, noshornet för sig), mjuk kant, ingen vit kant
gradde = (val[..., 0] > 205) & (val[..., 1] > 185) & (val[..., 2] > 130) & (val[..., 1] - val[..., 2] > 12) & (val.min(2) < 236) & (yy < 470) & (np.hypot(xx - 505, yy - 172) > 30)
gradde = ndimage.binary_opening(gradde, iterations=2)
lab, n = ndimage.label(gradde); st = ndimage.sum(gradde, lab, range(1, n + 1)); tre = 1 + np.argsort(st)[::-1][:3]
def hornbild(mask, namn):
    mask = ndimage.binary_dilation(ndimage.binary_fill_holes(mask), iterations=4)          # ta med hornets tunna mörkare kontur
    d = ndimage.distance_transform_edt(~mask)
    Image.fromarray(np.dstack([val, np.clip(1 - (d - 0.5) / 2, 0, 1) * 255]).clip(0, 255).astype(np.uint8)).save(f'cut/{N}-{namn}.png', optimize=True)
    y, x = np.nonzero(mask); print(namn, 'x', x.min(), x.max(), 'y', y.min(), y.max()); return x, y
nos_i = max(tre, key=lambda i: np.nonzero(lab == i)[0].mean())
hornbild(lab == nos_i, 'nos')
hx, hy = hornbild(np.isin(lab, [i for i in tre if i != nos_i]), 'ear-r')
D['ear-r'] = {'fil': f'cut/{N}-ear-r.png', 'vridpunkt': [int((hx.min() + hx.max()) / 2), int(hy.max())]}

# Svansen: mörkröd krita till höger, utanför kroppen, + lång rot
svans = ndimage.binary_fill_holes(ndimage.binary_closing(storst(ndimage.binary_opening(ute & mork & (xx > 650) & (yy > 540), iterations=2)), iterations=3))
sy_, sx_ = np.nonzero(svans & (xx < np.nonzero(svans)[1].min() + 40)); p = np.array([sx_.mean() + 6, sy_.mean()])
u = mitt - p; u /= np.linalg.norm(u)
stex = kakel(fa, ndimage.binary_erosion(svans, iterations=4))
m = svans | kapsel(p + u * 25, p + u * L, 26, 24)          # roten börjar en bit in, annars sticker den ut under kroppens kant
spara(np.where(svans[..., None], fa, stex), m, 'tail')
D['tail'] = {'fil': f'cut/{N}-tail.png', 'vridpunkt': [int(p[0]), int(p[1])]}
print('svans vridpunkt', p.round())

# Benen: konstens ben under kroppen (inte svansen) + lång rot rakt upp i benets krita
ben = ndimage.binary_opening(ute & ~ndimage.binary_dilation(svans, iterations=3) & (yy > by.max() - 30), iterations=3)
lab, n = ndimage.label(ben); s = ndimage.sum(ben, lab, range(1, n + 1)); ordn = sorted(1 + np.argsort(s)[::-1][:2], key=lambda i: np.nonzero(lab == i)[1].mean())
for namn, i in zip(['leg-l', 'leg-r'], ordn):
    b = ndimage.binary_fill_holes(lab == i); yb, xb = np.nonzero(b)
    ov = xb[(yb > yb.min() + 22) & (yb < yb.min() + 36)]; cx, py = int((ov.min() + ov.max()) / 2), int(yb.min() + 6); r = (ov.max() - ov.min()) / 2   # benets bredd strax under kroppen
    tex = kakel(fa, ndimage.binary_erosion(b, iterations=6))
    m = b | kapsel([cx, py + 14], [cx, py - L], r, r - 3)
    spara(np.where(b[..., None], fa, tex), m, namn)
    D[namn] = {'fil': f'cut/{N}-{namn}.png', 'vridpunkt': [cx, py]}
    print(namn, 'vridpunkt', cx, py, 'r', round(r), 'fot till y', yb.max())

# Armarna: ritade stumpar, vridpunkten 12 px innanför kroppens kant på höjden AY
AY = 590
for namn, sx in [('arm-l', -1), ('arm-r', 1)]:
    rad = np.nonzero(B[AY])[0]
    p = np.array([rad.min() + 12 if sx < 0 else rad.max() - 12, AY], float)
    D[namn] = {'fil': f'cut/{N}-{namn}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    for fram in (0, 1):
        f = kapsel(p if fram else p - u * 45, p + u * 85, 23, 30)      # -fram börjar vid vridpunkten, annars sticker axeln ut förbi kanten
        img = np.dstack([np.where(f[..., None], bla, 255), np.where(f, 255, 0)]).clip(0, 255).astype(np.uint8)
        c, al = tunn_kant.ny_alfa(img, KANT)
        if fram:
            tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (85 + 30)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
        Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(f'cut/{N}-{namn}{"-fram" if fram else ""}.png', optimize=True)
    print(namn, 'vridpunkt', p)

json.dump({'storlek': 1024, 'kropp': f'cut/{N}-body.png', 'delar': D}, open(f'{N}-rigg.json', 'w'), indent=2, ensure_ascii=False)
