# Gretas lockiga svans, i stället för langre_rot.py + tunn_kant.py: langre_rot gav en bred rot (r 19) som täckte den
# första öglan, och tunn_kant fyllde de vita gliporna mellan öglorna med rosa (öglorna flöt ihop). Här:
# svansen ur konsten (cut/v1/greta-tail.png från delar.py), bara pixlarna utanför kroppen, plus en smal lång rot
# (r 9, 80 px in mot kroppens mitt) i svansens egen rosa krita; kanten 10 px vit runt fyllningen, och gliporna
# mellan öglorna blir vita och ogenomskinliga som klistermärket. Kör i premium/ efter delar.py.
import json
import numpy as np
from PIL import Image
from scipy import ndimage
v1 = np.asarray(Image.open('cut/v1/greta-tail.png').convert('RGBA')).copy()
rgb = v1[..., :3].astype(int)
B = np.asarray(Image.open('cut/greta-body.png').convert('RGBA'))[..., 3] > 128
farg = (v1[..., 3] > 128) & ~((rgb.min(2) > 222) & (np.ptp(rgb, 2) < 30)) & ~ndimage.binary_dilation(B, iterations=8)
lab, n = ndimage.label(farg); farg = lab == 1 + np.argmax(ndimage.sum(farg, lab, range(1, n + 1)))
p = np.array(json.load(open('greta-rigg.json'))['delar']['tail']['vridpunkt'], float)
by, bx = np.nonzero(B); u = np.array([bx.mean(), by.mean()]) - p; u /= np.linalg.norm(u)
yy, xx = np.mgrid[:1024, :1024]
a, b = p - u * 6, p + u * 80
t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
rot = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= 9
ljus = farg & (rgb.sum(2) > np.percentile(rgb[farg].sum(1), 40))       # svansens fyllning, inte dess mörka kontur
fyll = np.median(rgb[ljus], 0)
f = np.asarray(Image.open('cut/greta-faceless.png').convert('RGB')).astype(float)
r = f[250:346, 464:560]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024] * (fyll / np.array([249., 190., 194.]))
F = farg | rot
ut = np.zeros_like(v1); ut[..., :3] = 255
ut[rot & ~farg, :3] = krita[rot & ~farg].clip(0, 255)
ut[farg, :3] = v1[farg, :3]
d = ndimage.distance_transform_edt(~F)
al = np.clip(10.5 - d, 0, 1)
al = np.maximum(al, ndimage.binary_fill_holes(al > 0.5))
ut[..., 3] = (al * 255).astype(np.uint8)
Image.fromarray(ut).save('cut/greta-tail.png')
ys, xs = np.nonzero(farg); print('svans', xs.min(), xs.max(), ys.min(), ys.max(), 'fyllning', fyll.astype(int), 'rot mot', u.round(2))
