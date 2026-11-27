# Putsad svans (Sanna 2026-11-27, "polish racoon tail"). Kör i premium/ efter tilda_delar.py.
# - Formen: små utskott (kroken som stack ut under kroppen) tas bort med en öppning, skåran mellan roten och svansen
#   fylls med en stängning, och konturen mjukas (gauss, tröskel 0,5). Svansens böj och ränder står kvar.
# - Färgen: konstens pixlar; där formen vuxit tas närmaste färg inifrån.
# - Kanten: tunn_kant.py 10 i cut/ och 6,5 i cut-tunn/, som resten av riggen.
import sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant

OPPNA, STANG, MJUK = 14, 16, 4
skiva = lambda r: np.hypot(*np.mgrid[-r:r + 1, -r:r + 1]) <= r

nu = np.asarray(Image.open('cut/tilda-tail.png').convert('RGBA'))
form = tunn_kant.fyllning(nu)
ren = ndimage.binary_opening(form, skiva(OPPNA))
lab, n = ndimage.label(ren); ren = lab == 1 + np.argmax(ndimage.sum(ren, lab, range(1, n + 1)))
ren = ndimage.binary_closing(np.pad(ren, STANG), skiva(STANG))[STANG:-STANG, STANG:-STANG]
alfa = np.clip((ndimage.gaussian_filter(ren.astype(float), MJUK) - 0.5) * 6 + 0.5, 0, 1)
inre = ndimage.binary_erosion(form, iterations=2)
_, (iy, ix) = ndimage.distance_transform_edt(~inre, return_indices=True)
rgb = np.where(inre[..., None], nu[..., :3], nu[iy, ix, :3])
img = np.dstack([rgb, (alfa * 255).round()]).astype(np.uint8)
for mapp, k in [('cut', 10), ('cut-tunn', 6.5)]:
    Image.fromarray(img).save(f'{mapp}/tilda-tail.png')
    tunn_kant.kor(f'{mapp}/tilda-tail.png', k)
print('svans klar, yta', int(form.sum()), '→', int((alfa > 0.5).sum()))
