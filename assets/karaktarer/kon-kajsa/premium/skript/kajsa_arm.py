# Kajsas armar: ritade runda stumpar (som Nickes), krämkrita med konstens grå kontur och en mörk klöv i spetsen.
# Rot r 22 inne i kroppen, hand r 29, 85 px från vridpunkten, 50° under vågrätt. Skriver arm-l/-r och -fram (kanten och
# konturen tonade mot roten, så att armen växer ur magen när den ligger framför kroppen). Kör tunn_kant 10 efteråt
# på de vanliga (inte -fram, där görs kanten här).
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rigg = json.load(open(f'{mapp}/kajsa-rigg.json'))
fl = np.asarray(Image.open(f'{mapp}/cut/kajsa-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
# svart ruta: mitten av den största helt svarta biten
mork = (fl.max(2) < 90)
d = ndimage.distance_transform_edt(ndimage.binary_opening(mork, iterations=2))
my, mx = np.unravel_index(d.argmax(), d.shape); s = int(min(64, d.max() * 1.3))
svart = kakel(mx - s // 2, my - s // 2, s)
gradde = kakel(422, 300)
KONTUR = np.array([197., 178., 160.])
yy, xx = np.mgrid[:1024, :1024]
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    a, b = p - u * 45, p + u * 85
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    rad = 22 + 7 * t
    dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
    f = dist <= rad
    # längs armen räknat från roten (0) till handens spets (1), för klöven och tonningen
    tl = ((xx - a[0]) * u[0] + (yy - a[1]) * u[1]) / (130 + 29)
    rgb = gradde.copy()
    kant = dist > rad - 7
    rgb[kant] = KONTUR
    klov = tl > 0.80
    rgb[klov] = svart[klov]
    for fram in (False, True):
        ut = rgb.copy()
        if fram:  # konturen tonas mot roten
            k = np.clip((tl - 0.45) / 0.35, 0, 1)[..., None]
            ut = np.where(kant[..., None] & ~klov[..., None], gradde * (1 - k) + KONTUR * k, ut)
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = ut.clip(0, 255); img[f, 3] = 255
        namn = f'{mapp}/cut/kajsa-{n}{"-fram" if fram else ""}.png'
        Image.fromarray(img).save(namn)
        if fram:
            sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
            rgba = np.asarray(Image.open(namn).convert('RGBA'))
            c, al = tunn_kant.ny_alfa(rgba, 10)
            fy = (al > 0) & ~f
            al = np.where(fy, al * np.clip((tl - 0.45) / 0.35, 0, 1), al)
            Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(namn)
    print(n, 'klar', p)
