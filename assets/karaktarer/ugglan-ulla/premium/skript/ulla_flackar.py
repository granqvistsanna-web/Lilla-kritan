# Som Ruts rut_flackar.py: ögonskivorna (krämvita, y < 525) blir cut/ulla-nos.png (följer ansiktet), magen (y >= 525)
# cut/ulla-mage.png (följer 40 %). Kroppen under fylls med brunorange krita ur pannan (470, 215, 64 px) -> cut/ulla-body-tom.png.
# Ögonskivorna sitter nära kroppens kant, så ansiktet maskas med kroppens fyllning: cut/ulla-kropp-mask.png.
import sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
a = np.asarray(Image.open('cut/ulla-body.png').convert('RGBA')).copy()
rgb = a[..., :3].astype(int)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
krem = inne & (rgb[..., 0] > 228) & (rgb[..., 1] > 200) & (rgb[..., 2] > 150)
lab, n = ndimage.label(ndimage.binary_closing(krem, iterations=3))
s = ndimage.sum(krem, lab, range(1, n + 1))
p = a[215:279, 470:534, :3]; p = np.concatenate([p, p[:, ::-1]], 1); p = np.concatenate([p, p[::-1]], 0)
tex = np.tile(p, (9, 9, 1))[:1024, :1024]
tom = a.copy()
for nm, villkor in [('nos', lambda y: y < 525), ('mage', lambda y: y >= 525)]:
    kand = [i for i in range(1, n + 1) if s[i - 1] > 3000 and villkor(np.nonzero(lab == i)[0].mean())]
    f = ndimage.binary_fill_holes(np.isin(lab, kand))
    d = ndimage.distance_transform_edt(~f)
    ut = a.copy(); ut[..., 3] = (np.clip(1 - (d - 2) / 4, 0, 1) * 255).astype('uint8')
    Image.fromarray(ut).save(f'cut/ulla-{nm}.png', optimize=True)
    tom[d <= 8, :3] = tex[d <= 8]
    ys, xs = np.nonzero(f); print(nm, len(kand), xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', int(xs.mean()), int(ys.mean()))
Image.fromarray(tom).save('cut/ulla-body-tom.png', optimize=True)
F = ndimage.binary_erosion(tunn_kant.fyllning(a), iterations=2)
m = np.zeros((1024, 1024, 4), np.uint8); m[..., :3] = 255; m[..., 3] = (ndimage.gaussian_filter(F.astype(float), 1) * 255).astype('uint8')
Image.fromarray(m).save('cut/ulla-kropp-mask.png', optimize=True)
