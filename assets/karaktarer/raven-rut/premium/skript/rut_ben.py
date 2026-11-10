# Ruts ben: ritade (som Zebbes), eftersom Flow-kroppen går längre ner än det ansiktslösa ägget och konstens ben då fick
# hack vid den gamla äggkanten. Mörkbrun krita (en speglad ruta ur konstens vänstra ben), en rak kapsel från roten 80 px upp
# under kroppen till fotleden, och en oval fot som pekar lite utåt, som i konsten (benet 434/603, foten till y 918).
# Skriver cut/rut-leg-l/-r.png och vridpunkterna i rut-rigg.json. Kör tunn_kant.py 10 efteråt.
import json
import numpy as np
from PIL import Image
fl = np.asarray(Image.open('cut/rut-faceless.png').convert('RGB')).astype(float)
r = fl[830:862, 412:444]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
brun = np.tile(r, (17, 17, 1))[:1024, :1024]
rigg = json.load(open('rut-rigg.json'))
yy, xx = np.mgrid[:1024, :1024].astype(float)
for n, cx, py, s in [('leg-l', 434, 840, -1), ('leg-r', 603, 830, 1)]:
    top, bot, rad = py - 80, 880, 33
    t = np.clip((yy - top) / (bot - top), 0, 1)
    ben = np.hypot(xx - cx, yy - (top + t * (bot - top))) <= rad
    fot = ((xx - (cx + s * 16)) / 46) ** 2 + ((yy - 897) / 21) ** 2 <= 1
    m = ben | fot
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = brun.clip(0, 255); img[m, 3] = 255
    Image.fromarray(img).save(f'cut/rut-{n}.png')
    rigg['delar'][n] = {'fil': f'cut/rut-{n}.png', 'vridpunkt': [cx, py]}
    print(n, cx, py)
json.dump(rigg, open('rut-rigg.json', 'w'), indent=2, ensure_ascii=False)
