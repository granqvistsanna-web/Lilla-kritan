# klistra.py in.jpeg ut.png [troskel=235] [krymp=4]: urklipp av en Flow-bild som redan har vit klistermärkskant med tunn grå ytterlinje.
# Masken = allt som inte är rent vitt, hål fyllda, krympt förbi den grå linjen; mjuk kant.
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
src, dst = sys.argv[1], sys.argv[2]; tr = int(sys.argv[3]) if len(sys.argv) > 3 else 235; kr = int(sys.argv[4]) if len(sys.argv) > 4 else 4
im = np.array(Image.open(src).convert('RGB')).astype(int)
ink = im.min(2) < tr
lab, n = ndimage.label(ink); st = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
ink = np.isin(lab, 1 + np.flatnonzero(st > 3000))           # bara stora delar (inga prickar)
m = ndimage.binary_fill_holes(ndimage.binary_closing(ink, iterations=3))
m = ndimage.binary_erosion(m, iterations=kr)
out = np.array(Image.open(src).convert('RGB'))
ring = m & ~ndimage.binary_erosion(m, iterations=kr + 6)      # ytterkanten blir ren vit (ingen grå linje)
out[ring & (im.min(2) > 150)] = 255
a = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
o = Image.fromarray(out.astype(np.uint8)).convert('RGBA'); o.putalpha(a); o.save(dst)
ys, xs = np.nonzero(m); print(dst, xs.min(), xs.max(), ys.min(), ys.max())
