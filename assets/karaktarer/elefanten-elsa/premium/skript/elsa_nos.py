# Lyfter ut Elsas snabel ur kroppen (cut/elsa-body.png) till cut/elsa-nos.png, så att den följer ansiktet (som Zebbes mule).
# Snabeln är bara kritlinjer på ansiktet, inne i siluetten, så nosbilden är linjerna med mjuk alfa (ingen egen yta): den
# glider över samma gråblå krita och syns aldrig som en fläck. Kroppen under (cut/elsa-body-tom.png) får linjerna
# bortfyllda med kroppens krita (kaklad ren ruta, mjuk skarv). Kör efter tunn_kant.
#   python3 skript/elsa_nos.py <premium-mapp>
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
k = np.asarray(Image.open(f'{mapp}/cut/elsa-body.png').convert('RGBA')).astype(float)
rgb = k[..., :3]
x0, y0 = json.load(open(f'{mapp}/skript/ruta.json'))['krita']
r = rgb[y0:y0 + 96, x0:x0 + 96]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
krita = np.tile(r, (6, 6, 1))[:1024, :1024]
# linjerna: mörkare än kritan, i snabbens ruta
lum = ndimage.gaussian_filter(rgb.sum(2), 1.2)
ruta = np.zeros((1024, 1024), bool); ruta[420:660, 420:690] = True
linje = ruta & (lum < 520)
lab, n = ndimage.label(linje); s = ndimage.sum(linje, lab, range(1, n + 1))
linje = np.isin(lab, 1 + np.nonzero(s > 40)[0])
ys, xs = np.nonzero(linje); print('snabel', xs.min(), xs.max(), ys.min(), ys.max())
# nosbilden: linjernas pixlar (lite vidgade) med mjuk alfa
mask = ndimage.binary_dilation(linje, iterations=3)
al = ndimage.gaussian_filter(mask.astype(float), 1.0)
nos = np.zeros_like(k); nos[..., :3] = rgb; nos[..., 3] = al * 255
Image.fromarray(nos.clip(0, 255).astype(np.uint8)).save(f'{mapp}/cut/elsa-nos.png')
# kroppen utan linjer
f = ndimage.gaussian_filter(ndimage.binary_dilation(linje, iterations=6).astype(float), 1.5)[..., None]
k[..., :3] = rgb * (1 - f) + krita * f
Image.fromarray(k.clip(0, 255).astype(np.uint8)).save(f'{mapp}/cut/elsa-body-tom.png')
