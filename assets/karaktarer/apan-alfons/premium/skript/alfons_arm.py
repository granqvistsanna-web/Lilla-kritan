# Alfons armar: ritade runda stumpar i ett stycke (som Ruts och Elsas): brun krita ur kroppen med konstens mörkare bruna
# kontur. Rot r 23 inne i kroppen, hand r 30, 85 px från vridpunkten (12 px innanför kroppens kant), 50° under vågrätt.
# Konstens armar är kilar som hänger längs kroppens sida, så de ritas om (annars syns en rak rot när de vrids).
# Skriver arm-l/-r och -fram (konturen och den vita kanten tonade mot roten, så att armen växer ur magen när den ligger
# framför kroppen). Kör tunn_kant 10 efteråt på arm-l/-r (inte -fram, där görs kanten här).
#   python3 skript/alfons_arm.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
mapp = sys.argv[1]
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
rf = f'{mapp}/alfons-rigg.json'; rigg = json.load(open(rf))
fl = np.asarray(Image.open(f'{mapp}/cut/alfons-faceless.png').convert('RGB')).astype(float)
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
r = fl[y0:y0 + 96, x0:x0 + 96]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
brun = np.tile(r, (6, 6, 1))[:1024, :1024]
KONTUR = np.array([135., 76., 50.])
R0, R1, L, V = 23, 30, 85, 50
yy, xx = np.mgrid[:1024, :1024]
for n, sx, p in [('arm-l', -1, (240, 575)), ('arm-r', 1, (775, 575))]:
    p = np.array(p, float)
    rigg['delar'][n] = {'fil': f'cut/alfons-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(V); u = np.array([sx * np.cos(v), np.sin(v)])
    b = p + u * L
    for fram in (0, 1):
        a = p.copy() if fram else p - u * 45      # -fram börjar vid vridpunkten, annars sticker axeln ut förbi kanten
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (L + R1)    # 0 vid vridpunkten, 1 vid handens spets
        rad = R0 + (R1 - R0) * np.clip(tl * (L + R1) / L, 0, 1)
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        kant = dist > rad - 6
        k = np.clip((tl - 0.04) / 0.14, 0, 1)[..., None] if fram else 1
        rgb = np.where(kant[..., None], brun * (1 - k) + KONTUR * k, brun)
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
        namn = f'{mapp}/cut/alfons-{n}{"-fram" if fram else ""}.png'
        if fram:
            c, al = tunn_kant.ny_alfa(img, 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            img = np.dstack([c, (al * 255).astype(np.uint8)])
        Image.fromarray(img).save(namn)
    print(n, 'klar', p)
json.dump(rigg, open(rf, 'w'), indent=2, ensure_ascii=False)
