# Blå dinons delar (kör i premium/): python3 skript/bla_delar.py
# Ur original/dinon-bla-faceless.jpg (kam, svans, ben; pixeljusterad mot Sannas val) och original/dinon-bla-body-flow.jpg (kroppen).
# Vit kant KANT px (1 % av kroppens höjd, vita-kanter) runt varje del, räknad om från färgytan (verktyg/tunn_kant.py).
# - Kroppen: Flow-kroppen, skalad och flyttad så att den ligger pixeljusterad mot faceless. Magfläcken lyfts ut till
#   cut/dinon-bla-mage.png (mjuk kant), kroppen under (body-tom) fylls med kroppens blå krita.
# - Kammen (ear-l): konstens mörkblå krita på hjässan. Den ligger FRAMFÖR kroppen, så den har vit kant bara där den sticker
#   ut utanför kroppen. Vridpunkten mitt i roten.
# - Svansen: konstens mörkblå krita utanför kroppen + lång rundad rot (80 px in under kroppen mot dess mitt) i samma krita.
# - Benen: konstens ben utanför kroppen + lång rot rakt upp under kroppen i benets egen krita.
# - Armarna: ritade runda stumpar i ett stycke i kroppens krita (som Pims; konstens armar är tunna fenor), med -fram-kopior.
#   Sedan från repots rot: python3 verktyg/klapparm.py assets/karaktarer/dinon-bla/premium dinon-bla 0.85
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, str(Path(__file__).resolve().parents[5] / 'verktyg')); import tunn_kant
N, KANT, L = 'dinon-bla', 6, 80
las = lambda f: np.asarray(Image.open(f).convert('RGB').resize((1024, 1024), Image.LANCZOS)).astype(float)
fa, bo0 = las('original/dinon-bla-faceless.jpg'), las('original/dinon-bla-body-flow.jpg')
yy, xx = np.mgrid[:1024, :1024]
farg = lambda a: ndimage.binary_opening(~((a.min(2) > 228) & (a.max(2) - a.min(2) < 22)), iterations=2)   # allt som inte är vitt
lum = fa.mean(2)

# Kroppen: justera Flow-kroppen mot faceless på äggets vänstra och högra kant (y 330–520, ovanför armarna) och botten mellan benen
def kanter(a):
    m = farg(a); x = [np.nonzero(m[y])[0] for y in range(330, 520, 10)]
    return np.mean([v.min() for v in x]), np.mean([v.max() for v in x])
(fl, fr), (bl, br) = kanter(fa), kanter(bo0)
SK = (fr - fl) / (br - bl)                      # Flow ritade kroppen lite större: skala den till faceless bredd, kring bildens mitt
n = int(round(1024 * SK)); o = (1024 - n) // 2
stor = np.full((1024, 1024, 3), 255.0); liten = np.asarray(Image.fromarray(bo0.astype(np.uint8)).resize((n, n), Image.LANCZOS)).astype(float)
if n <= 1024: stor[o:o + n, o:o + n] = liten
else: stor = liten[-o:-o + 1024, -o:-o + 1024]
bo0 = stor; bl, br = kanter(bo0)
DX = int(round((fl + fr - bl - br) / 2))
topp = lambda a, x: np.nonzero(farg(a)[:, x])[0].min()
DY = int(round(np.mean([topp(fa, x) - topp(bo0, x - DX) for x in (290, 300, 310, 320, 330, 340)])))   # äggets vänstra axel, vid sidan om kammen
bo = ndimage.shift(bo0, (DY, DX, 0), order=1, mode='nearest')
print('kroppen skalad', round(SK, 3), 'flyttad', DX, DY, 'bredd faceless', round(fr - fl), 'kropp', round(br - bl))
B = ndimage.binary_fill_holes(farg(bo))
lab, n = ndimage.label(B); B = lab == 1 + np.argmax(ndimage.sum(B, lab, range(1, n + 1)))
by, bx = np.nonzero(B); mitt = np.array([bx.mean(), by.mean()])
print('kroppens yta x', bx.min(), bx.max(), 'y', by.min(), by.max(), 'mitt', mitt.round())

def kakel(rgb, m, s=64):       # speglad ruta ur mitten av den största rena biten av masken m
    dt = ndimage.distance_transform_edt(m); cy, cx = np.unravel_index(dt.argmax(), dt.shape); s = int(min(s, dt.max() * 1.3))
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
ljus = ndimage.binary_erosion(B, iterations=12) & (bo[..., 0] > 170) & (bo[..., 1] > 215)
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

# Kammen: mörkblå krita i övre delen av bilden (framför kroppen)
# Kammen: allt färgat utanför kroppen upptill + den mörkblå roten som ligger över hjässan (framför kroppen)
ute = farg(fa) & ~ndimage.binary_dilation(B, iterations=2)
rot_i = ndimage.binary_opening(B & (lum < 150) & (yy < 330), iterations=4)          # öppningen tar bort kroppens tunna mörka kontur
kam = ndimage.binary_fill_holes(storst(ndimage.binary_closing((ute & (yy < 330) & (xx > 400) & (xx < 730)) | rot_i, iterations=5)))
kam = ndimage.gaussian_filter(ndimage.binary_closing(kam, iterations=8).astype(float), 6) > 0.5                                          # slätar hacken där roten möter kroppens kant
# Små ljusblå uddar där roten möter kroppen kom med i masken (QA 2026-11-12: "bump at crest base"): under y 245 får bara kammens egen mörkblå krita vara med
kam = kam & ~((yy > 245) & (fa[..., 0] > 78)); kam = ndimage.binary_opening(kam, iterations=3)
kam = storst(ndimage.gaussian_filter(kam.astype(float), 3) > 0.5)
ky, kx = np.nonzero(kam & (yy > by.min() + 15)); rot = [int(kx.mean()), int(ky.mean())]
utanfor = np.clip(ndimage.distance_transform_edt(~ndimage.binary_erosion(B, iterations=3)) / 4, 0, 1)   # vit kant bara utanför kroppen
spara(fa, kam, 'ear-l', kantmask=utanfor)
D['ear-l'] = {'fil': f'cut/{N}-ear-l.png', 'vridpunkt': rot}
print('kam x', np.nonzero(kam)[1].min(), np.nonzero(kam)[1].max(), 'y', np.nonzero(kam)[0].min(), np.nonzero(kam)[0].max(), 'vridpunkt', rot)

# Svansen: mörkblå krita nere till höger, utanför kroppen, + lång rot
# (svansen och högra benet ligger intill varandra: de skiljs åt med en sned linje mellan dem, x = 622 + 1,15 · (y − 800))
grans = 622 + 1.15 * (yy - 800)
svans = ndimage.binary_fill_holes(ndimage.binary_closing(storst(ndimage.binary_opening(ute & (xx > grans) & (yy > 650), iterations=2)), iterations=3))
sy_, sx_ = np.nonzero(svans & (xx < np.nonzero(svans)[1].min() + 40)); p = np.array([sx_.mean() + 6, sy_.mean()])
u = mitt - p; u /= np.linalg.norm(u)
stex = kakel(fa, ndimage.binary_erosion(svans, iterations=4))
m = svans | kapsel(p - u * 8, p + u * L, 30, 24)
spara(np.where(svans[..., None], fa, stex), m, 'tail')
D['tail'] = {'fil': f'cut/{N}-tail.png', 'vridpunkt': [int(p[0]), int(p[1])]}
print('svans vridpunkt', p.round())

# Benen: konstens ben under kroppen (inte svansen) + lång rot rakt upp i benets krita
ben = ndimage.binary_opening(ute & (xx < grans) & (yy > by.max() - 30), iterations=3)
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
AY = 580
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
