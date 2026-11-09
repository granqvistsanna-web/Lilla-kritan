# Zebbes långa rötter: som langre_rot.py, men roten fylls med kroppens krämkrita (speglad ruta) och får konstens
# grå kontur längs sidorna, i stället för utdragna närmaste-pixel-ränder. Läser originalen i cut/v1/.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
L = 80
rigg = json.load(open(f'{mapp}/zebbe-rigg.json'))['delar']
B = np.asarray(Image.open(f'{mapp}/cut/zebbe-body.png').convert('RGBA'))[..., 3] > 128
yy, xx = np.mgrid[:1024, :1024]
fl = np.asarray(Image.open(f'{mapp}/cut/zebbe-faceless.png').convert('RGB')).astype(np.uint8)
ruta = fl[610:706, 464:560]                                    # ren krämkrita (magen)
rr = np.concatenate([ruta, ruta[::-1]], 0); rr = np.concatenate([rr, rr[:, ::-1]], 1)
krita = np.tile(rr, (6, 6, 1))[:1024, :1024]
KONTUR = np.array([197, 178, 160])
by, bx = np.nonzero(B); mitt = np.array([bx.mean(), by.mean()])
for d, kb in [('ear-l', 8), ('ear-r', 8), ('leg-l', 8), ('leg-r', 8), ('tail', 5)]:
    im = np.asarray(Image.open(f'{mapp}/cut/v1/zebbe-{d}.png').convert('RGBA')).copy()
    rgb = im[..., :3].astype(int)
    vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
    farg = (im[..., 3] > 128) & ~B & ~vit
    lab, n = ndimage.label(farg)
    farg = lab == 1 + np.argmax(ndimage.sum(farg, lab, range(1, n + 1)))
    p = np.array(rigg[d]['vridpunkt'], float)
    u = mitt - p; u /= np.linalg.norm(u)
    nara = farg & (np.hypot(xx - p[0], yy - p[1]) < 60)
    r = max(12.0, ndimage.distance_transform_edt(farg)[nara].max() if nara.any() else 20)
    a, b = p - u * r, p + u * L
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
    rad = r * (1 - 0.1 * t)
    kapsel = dist <= rad
    behall = farg & ~ndimage.binary_dilation(B, iterations=10)
    ut = np.zeros_like(im)
    rot = kapsel & ~behall
    ut[rot, :3] = krita[rot]
    kant = rot & (dist > rad - kb)
    ut[kant, :3] = KONTUR
    ut[behall, :3] = im[behall, :3]
    ut[kapsel | behall, 3] = 255
    Image.fromarray(ut).save(f'{mapp}/cut/zebbe-{d}.png')
    print(d, 'rot r', int(r))
