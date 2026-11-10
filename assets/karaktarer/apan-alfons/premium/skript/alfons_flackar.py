# Lyfter ut den tan jordnötsformade ansiktsfläcken ur kroppen (som Ruts rut_flackar.py) till cut/alfons-nos.png, så att den
# följer ansiktet. flackar.py räknar den bruna kritan fel, så tan-gränser här. Kroppen under fylls med brun krita ur rutan
# i skript/ruta.json -> cut/alfons-body-tom.png. Alfons har ingen mage-fläck.
# Fläcken (322–700 × 293–558) ligger ca 95 px innanför kroppens kant, så ansiktet behöver ingen mask (som Ruts kindband).
#   python3 skript/alfons_flackar.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
a = np.asarray(Image.open(f'{mapp}/cut/alfons-body.png').convert('RGBA')).copy()
rgb = a[..., :3].astype(int)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
tan = inne & (rgb[..., 0] > 205) & (rgb[..., 1] > 150) & (rgb[..., 2] > 100) & (rgb[..., 2] < 205)
lab, n = ndimage.label(ndimage.binary_closing(tan, iterations=3))
i = 1 + np.argmax(ndimage.sum(tan, lab, range(1, n + 1)))
f = ndimage.binary_fill_holes(lab == i)
d = ndimage.distance_transform_edt(~f)
ut = a.copy(); ut[..., 3] = (np.clip(1 - (d - 2) / 4, 0, 1) * 255).astype('uint8')
Image.fromarray(ut).save(f'{mapp}/cut/alfons-nos.png', optimize=True)
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
p = a[y0:y0 + 96, x0:x0 + 96, :3]; p = np.concatenate([p, p[:, ::-1]], 1); p = np.concatenate([p, p[::-1]], 0)
tex = np.tile(p, (6, 6, 1))[:1024, :1024]
tom = a.copy(); tom[d <= 8, :3] = tex[d <= 8]
Image.fromarray(tom).save(f'{mapp}/cut/alfons-body-tom.png', optimize=True)
ys, xs = np.nonzero(f); print('nos', xs.min(), xs.max(), ys.min(), ys.max(), 'mitt', int(xs.mean()), int(ys.mean()))
