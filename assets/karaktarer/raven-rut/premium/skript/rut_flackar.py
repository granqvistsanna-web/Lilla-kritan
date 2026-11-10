# Som verktyg/flackar.py, men med krämgränser: flackar.py räknar den orange kritan som "rosa" och tog hela kroppen.
# Kindbandet (y < 590) blir cut/rut-nos.png (följer ansiktet), magen (y > 590) cut/rut-mage.png (följer 40 %).
# Kroppen under fylls med orange krita ur pannan (470, 240) -> cut/rut-body-tom.png.
import numpy as np
from PIL import Image
from scipy import ndimage
a = np.asarray(Image.open('cut/rut-body.png').convert('RGBA')).copy()
rgb = a[..., :3].astype(int)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
krem = inne & (rgb[..., 0] > 225) & (rgb[..., 1] > 198) & (rgb[..., 2] > 165)
lab, n = ndimage.label(ndimage.binary_closing(krem, iterations=3))
s = ndimage.sum(krem, lab, range(1, n + 1))
p = a[240:336, 470:566, :3]; p = np.concatenate([p, p[:, ::-1]], 1); p = np.concatenate([p, p[::-1]], 0)
tex = np.tile(p, (6, 6, 1))[:1024, :1024]
tom = a.copy()
for nm, villkor in [('nos', lambda y: y < 590), ('mage', lambda y: y >= 590)]:
    kand = [i for i in range(1, n + 1) if villkor(np.nonzero(lab == i)[0].mean())]
    i = max(kand, key=lambda i: s[i - 1])
    f = ndimage.binary_fill_holes(lab == i)
    d = ndimage.distance_transform_edt(~f)
    ut = a.copy(); ut[..., 3] = (np.clip(1 - (d - 2) / 4, 0, 1) * 255).astype('uint8')
    Image.fromarray(ut).save(f'cut/rut-{nm}.png', optimize=True)
    tom[d <= 8, :3] = tex[d <= 8]
    ys, xs = np.nonzero(f); print(nm, xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', int(xs.mean()), int(ys.mean()))
Image.fromarray(tom).save('cut/rut-body-tom.png', optimize=True)
# Kindbandet går nästan ut till kroppens kant, så när ansiktet glider åt sidan (riktningsposen) skulle det sticka ut
# över kanten. uttryck.html maskar ansiktet med kroppens fyllning (utan den vita kanten): cut/rut-kropp-mask.png.
import sys
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
F = ndimage.binary_erosion(tunn_kant.fyllning(a), iterations=2)
m = np.zeros((1024, 1024, 4), np.uint8); m[..., :3] = 255; m[..., 3] = (ndimage.gaussian_filter(F.astype(float), 1) * 255).astype('uint8')
Image.fromarray(m).save('cut/rut-kropp-mask.png', optimize=True)
