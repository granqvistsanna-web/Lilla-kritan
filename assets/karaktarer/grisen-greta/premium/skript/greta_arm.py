# Gretas armar: ritade runda stumpar i EN bit (som Zebbes och Ruts), rosa krita med kroppens mörkare rosa kontur och en
# mörkare rosa klöv i spetsen (kritan tonad till klövens färg, så kornet blir kvar). Rot r 22 inne i kroppen, hand r 29,
# 75 px från vridpunkten, 55° under vågrätt (konstens armar hänger brantare än Zebbes). Skriver arm-l/-r och -fram (konturen och den vita kanten tonade mot roten,
# så att armen växer ur magen när den ligger framför kroppen). Kör i premium/, sedan tunn_kant 10 på arm-l/-r.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
rigg = json.load(open('greta-rigg.json'))
fl = np.asarray(Image.open('cut/greta-faceless.png').convert('RGB')).astype(float)
r = fl[250:346, 464:560]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
ROSA, KLOV = np.array([249., 190., 194.]), np.array([220., 128., 142.])
KONTUR, KLOVKONTUR = np.array([208., 148., 156.]), np.array([180., 92., 105.])
klovkrita = krita * (KLOV / ROSA)
yy, xx = np.mgrid[:1024, :1024]
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    v = np.radians(55); u = np.array([sx * np.cos(v), np.sin(v)])
    for fram in (False, True):
        a, b = (p.copy() if fram else p - u * 45), p + u * 75
        t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
        rad = 22 + 7 * t
        dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
        f = dist <= rad
        tl = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (75 + 29)     # 0 vid vridpunkten, 1 vid handens spets
        klov = tl > 0.72
        kant = dist > rad - 6
        rgb = np.where(klov[..., None], klovkrita, krita)
        if fram:   # konturen tonas in från roten, så att den rosa armen syns mot den rosa magen men roten smälter in
            k = np.clip((tl - 0.04) / 0.14, 0, 1)[..., None]
            rgb = np.where(kant[..., None], rgb * (1 - k) + KONTUR * k, rgb)
        else:
            rgb[kant] = KONTUR
        rgb[kant & klov] = KLOVKONTUR
        img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
        namn = f'cut/greta-{n}{"-fram" if fram else ""}.png'
        Image.fromarray(img).save(namn)
        if fram:   # den vita kanten bara på de yttre två tredjedelarna, tonad på en kort sträcka
            c, al = tunn_kant.ny_alfa(np.asarray(Image.open(namn).convert('RGBA')), 10)
            al = np.where((al > 0) & ~f, al * np.clip((tl - 0.28) / 0.12, 0, 1), al)
            Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(namn)
    print(n, 'klar', p)
