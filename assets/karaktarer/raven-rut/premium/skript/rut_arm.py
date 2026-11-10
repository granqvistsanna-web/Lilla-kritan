# Ruts armar: ritade runda stumpar (som Zebbes): orange krita ur pannan med konstens mörkare orange kontur och en
# mörkbrun spets (som konstens armar). Rot r 23 inne i kroppen, hand r 30, 85 px från vridpunkten (12 px innanför
# kroppens kant), 50° under vågrätt. Skriver arm-l/-r och -fram (konturen och den vita kanten tonade mot roten, så att
# armen växer ur kroppen när den ligger framför). Kör tunn_kant.py 10 på arm-l/-r efteråt (inte -fram, där görs kanten här).
import json, sys
import numpy as np
from PIL import Image
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
rigg = json.load(open('rut-rigg.json'))
fl = np.asarray(Image.open('cut/rut-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 2, 1024 // (2 * s) + 2, 1))[:1024, :1024]
orange, brun = kakel(470, 240), kakel(412, 830, 32)
KONTUR = np.array([196., 88., 30.])
yy, xx = np.mgrid[:1024, :1024]
for n, sx, p in [('arm-l', -1, (240, 575)), ('arm-r', 1, (776, 575))]:
    p = np.array(p, float)
    rigg['delar'][n] = {'fil': f'cut/rut-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    for fram in (0, 1):
        a = p.copy() if fram else p - u * 45      # -fram börjar vid vridpunkten, annars sticker axeln ut förbi kanten
        b = p + u * 85
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        rad = 23 + 7 * t
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (85 + 30)   # 0 vid vridpunkten, 1 vid handens spets
        kant = dist > rad - 5
        k = np.clip((tl - 0.04) / 0.14, 0, 1) if fram else np.ones_like(tl)
        rgb = np.where(kant[..., None], orange * (1 - k[..., None]) + KONTUR * k[..., None], orange)
        spets = tl > 0.62
        rgb[spets] = brun[spets]
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
        namn = f'cut/rut-{n}{"-fram" if fram else ""}.png'
        if fram:
            c, al = tunn_kant.ny_alfa(img, 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            img = np.dstack([c, (al * 255).astype(np.uint8)])
        Image.fromarray(img).save(namn)
    print(n, 'klar', p)
json.dump(rigg, open('rut-rigg.json', 'w'), indent=2, ensure_ascii=False)
