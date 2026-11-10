# Ullas ben: konstens orange fot (tre tår) och smala orange ben ur cut/ulla-faceless.png (y >= 852), plus ett ritat brunt
# lår i ett stycke ovanpå: en rak kapsel (r 30) från roten 80 px upp under kroppen ner till y 822, brunorange krita ur
# pannan med konstens mörkare kontur, som konstens runda lår. Ur konsten blev låret ett hack vid den gamla äggkanten med
# vita rester mellan lår och fot, därför ritas det. Skriver cut/ulla-leg-l/-r.png och vridpunkterna (låret mot kroppen)
# i ulla-rigg.json. Kör tunn_kant.py 10 efteråt. Kör i premium/.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
fl = np.asarray(Image.open('cut/ulla-faceless.png').convert('RGBA'))
F = tunn_kant.fyllning(fl)
kr = np.asarray(Image.open('cut/ulla-body.png').convert('RGB')).astype(float)
r = kr[215:279, 470:534]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
brun = np.tile(r, (9, 9, 1))[:1024, :1024]
KONTUR = np.array([170., 101., 53.])
rigg = json.load(open('ulla-rigg.json'))
yy, xx = np.mgrid[:1024, :1024].astype(float)
for n, cx, x0, x1 in [('leg-l', 431, 360, 480), ('leg-r', 602, 550, 680)]:
    py = 838
    fot = F & (yy >= 852) & (xx >= x0) & (xx < x1)
    lab, k = ndimage.label(fot); fot = lab == 1 + np.argmax(ndimage.sum(fot, lab, range(1, k + 1)))
    fot = ndimage.binary_fill_holes(fot)
    top, bot, rad = py - 80, 822, 30
    t = np.clip((yy - top) / (bot - top), 0, 1)
    d = np.hypot(xx - cx, yy - (top + t * (bot - top)))
    lar = d <= rad
    img = np.zeros((1024, 1024, 4), np.uint8)
    img[fot, :3] = fl[fot, :3]
    rgb = np.where((d > rad - 6)[..., None], KONTUR, brun)
    img[lar, :3] = rgb[lar].clip(0, 255)
    img[fot | lar, 3] = 255
    _, (iy, ix) = ndimage.distance_transform_edt(~(fot | lar), return_indices=True)   # tomma pixlar får närmaste färg (inga svarta hörn)
    img[..., :3] = img[iy, ix, :3]
    Image.fromarray(img).save(f'cut/ulla-{n}.png')
    rigg['delar'][n] = {'fil': f'cut/ulla-{n}.png', 'vridpunkt': [cx, py]}
    print(n, cx, py, int(fot.sum()))
json.dump(rigg, open('ulla-rigg.json', 'w'), indent=2, ensure_ascii=False)
