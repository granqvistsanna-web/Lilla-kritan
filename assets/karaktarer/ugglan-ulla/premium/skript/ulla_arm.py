# Ullas vingar (armarna): ritade runda vingstumpar i ett stycke (som Ruts och Elsas armar), brunorange krita ur pannan
# (470, 215) med konstens mörkare bruna kontur (170, 101, 53). Rot r 24 inne i kroppen, hand r 33, 90 px från vridpunkten
# (12 px innanför kroppens kant), 50° under vågrätt. Konstens vingar låg tätt mot kroppen, så de ritas om här.
# Skriver arm-l/-r och -fram (konturen och den vita kanten tonade mot roten, så att vingen växer ur kroppen när den
# ligger framför). Kör tunn_kant.py 10 på arm-l/-r efteråt (inte -fram, där görs kanten här). Kör i premium/.
import json, sys
import numpy as np
from PIL import Image
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
rigg = json.load(open('ulla-rigg.json'))
fl = np.asarray(Image.open('cut/ulla-body.png').convert('RGB')).astype(float)
def kakel(x, y, s=64):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 2, 1024 // (2 * s) + 2, 1))[:1024, :1024]
brun = kakel(470, 215)
KONTUR = np.array([170., 101., 53.])
R0, R1, L, V = 24, 33, 90, 50
yy, xx = np.mgrid[:1024, :1024]
for n, sx, p in [('arm-l', -1, (241, 570)), ('arm-r', 1, (776, 570))]:
    p = np.array(p, float)
    rigg['delar'][n] = {'fil': f'cut/ulla-{n}.png', 'vridpunkt': [int(p[0]), int(p[1])]}
    v = np.radians(V); u = np.array([sx * np.cos(v), np.sin(v)])
    b = p + u * L
    for fram in (0, 1):
        a = p.copy() if fram else p - u * 45      # -fram börjar vid vridpunkten, annars sticker axeln ut förbi kanten
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (L + R1)   # 0 vid vridpunkten, 1 vid spetsen
        rad = R0 + (R1 - R0) * np.clip(tl * (L + R1) / L, 0, 1)
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        kant = dist > rad - 6
        k = np.clip((tl - 0.04) / 0.14, 0, 1)[..., None] if fram else 1
        rgb = np.where(kant[..., None], brun * (1 - k) + KONTUR * k, brun)
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
        namn = f'cut/ulla-{n}{"-fram" if fram else ""}.png'
        if fram:
            c, al = tunn_kant.ny_alfa(img, 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            img = np.dstack([c, (al * 255).astype(np.uint8)])
        Image.fromarray(img).save(namn)
    print(n, 'klar', p)
json.dump(rigg, open('ulla-rigg.json', 'w'), indent=2, ensure_ascii=False)
