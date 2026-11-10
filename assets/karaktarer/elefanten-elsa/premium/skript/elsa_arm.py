# Elsas armar: ritade runda stumpar i ett stycke (som Zebbes och Kajsas), gråblå krita med konstens mörkare gråblå kontur
# och tre ljusa tånaglar i spetsen (som konsten). Rot r 24 inne i kroppen, hand r 31, 88 px från vridpunkten, 50° under vågrätt.
# Skriver arm-l/-r och -fram (konturen och den vita kanten tonade mot roten, så att armen växer ur magen när den ligger framför
# kroppen). Kör tunn_kant 10 efteråt på arm-l/-r (inte -fram, där görs kanten här).
#   python3 skript/elsa_arm.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rigg = json.load(open(f'{mapp}/elsa-rigg.json'))
fl = np.asarray(Image.open(f'{mapp}/cut/elsa-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
gra = kakel(*json.load(open(f'{mapp}/skript/ruta.json'))['krita'])
KONTUR = np.array([131., 144., 159.]); NAGEL = np.array([250., 238., 222.])
R0, R1, L, V = 24, 31, 88, 50
yy, xx = np.mgrid[:1024, :1024]
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    v = np.radians(V); u = np.array([sx * np.cos(v), np.sin(v)]); w = np.array([-u[1], u[0]])
    b = p + u * L
    # tånaglar: tre ovaler längs handens runda ände, inne i konturen
    nagel = np.zeros((1024, 1024), bool)
    for vin in (-40, 0, 40):
        r = np.radians(vin); d = u * np.cos(r) + w * np.sin(r)
        c = b + d * (R1 - 12)
        lx = (xx - c[0]) * d[0] + (yy - c[1]) * d[1]; ly = (xx - c[0]) * -d[1] + (yy - c[1]) * d[0]
        nagel |= (lx / 8) ** 2 + (ly / 9.5) ** 2 <= 1
    for fram in (False, True):
        a = p.copy() if fram else p - u * 45
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (L + R1)    # 0 vid vridpunkten, 1 vid handens spets
        rad = R0 + (R1 - R0) * np.clip(tl * (L + R1) / L, 0, 1)
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        kant = dist > rad - 7
        k = np.clip((tl - 0.04) / 0.14, 0, 1)[..., None] if fram else 1
        rgb = np.where(kant[..., None], gra * (1 - k) + KONTUR * k, gra)
        rgb[nagel & f] = NAGEL
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
        namn = f'{mapp}/cut/elsa-{n}{"-fram" if fram else ""}.png'
        Image.fromarray(img).save(namn)
        if fram:
            c, al = tunn_kant.ny_alfa(np.asarray(Image.open(namn).convert('RGBA')), 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(namn)
    print(n, 'klar', p)
