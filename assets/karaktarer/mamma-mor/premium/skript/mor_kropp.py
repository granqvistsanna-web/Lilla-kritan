# Mors kropp utan armar och ben, lokalt ur den ansiktslösa bilden (pixeljusterad mot den, till skillnad från en ny Flow-bild).
# Kroppen = klänningens senapsgula yta + ansiktets persika (största persikobiten) + håret (största bruna biten).
# Armarna (persikostumpar utanför ärmarna) och benen (persika med bruna skor under fållen) blir över och tas bort.
# Kör från premium/:  python3 skript/mor_kropp.py   -> mor-faceless.png och mor-body.png (1024², vit bakgrund)
import numpy as np
from PIL import Image
from scipy import ndimage
im = np.asarray(Image.open('original/mor-faceless.jpg').convert('RGB'))
Image.fromarray(im).save('mor-faceless.png')
c = im.astype(int); r, g, b = c[..., 0], c[..., 1], c[..., 2]
fyll = c.min(2) < 215
brun = fyll & (r < 150) & (r > g)
senap = fyll & (r > 170) & (g > 130) & (b < 120) & (r - b > 90)
persika = fyll & ~brun & ~senap
def storsta(m):
    lab, n = ndimage.label(m); s = ndimage.sum(m, lab, range(1, n + 1)); return lab == 1 + np.argmax(s)
kropp = ndimage.binary_closing(senap, iterations=3) | storsta(ndimage.binary_opening(persika, iterations=2)) | storsta(brun)
kropp = storsta(ndimage.binary_fill_holes(ndimage.binary_closing(kropp, iterations=4)))
kropp = ndimage.binary_opening(kropp, iterations=3)
# samma vita kant runt kroppen som konsten har (24 px, lite bredare än konstens ca 16, så att delar.py inte får med en kantring), ljusgrå 244 så att egen_kant.py tar med den; tunn_kant.py gör om den sedan
ring = ndimage.distance_transform_edt(~kropp) <= 24
ut = np.full_like(im, 255); ut[ring] = 244; ut[kropp] = im[kropp]
Image.fromarray(ut).save('mor-body.png')
ys, xs = np.nonzero(kropp); print('kropp x', xs.min(), xs.max(), 'y', ys.min(), ys.max())
