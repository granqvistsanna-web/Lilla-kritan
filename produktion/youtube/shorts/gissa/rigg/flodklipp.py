# flodklipp.py in.png out.png [rim=8]: för vita saker på vitt. Bakgrund = det rent vita som hänger ihop med kanten
# (flood fill), allt annat är saken; sedan samma vita kant och fyllda hål som cutout.py.
import sys, numpy as np
from PIL import Image
from scipy import ndimage
src, dst = sys.argv[1], sys.argv[2]; rim = int(sys.argv[3]) if len(sys.argv) > 3 else 8
img = np.array(Image.open(src).convert('RGBA'))
vitt = img[..., :3].min(2) >= 247
lab, n = ndimage.label(vitt); kant = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
bg = np.isin(lab, list(kant))
sak = ndimage.binary_opening(~bg, iterations=2)
lab2, n2 = ndimage.label(sak); stor = ndimage.sum(sak, lab2, range(1, n2 + 1))
sak = np.isin(lab2, 1 + np.flatnonzero(stor > 400))   # bort med små prickar
mask = ndimage.binary_fill_holes(ndimage.binary_dilation(sak, iterations=rim))
img[..., :3][mask & ~sak] = 255   # den vita kanten
img[..., 3] = (ndimage.gaussian_filter(mask.astype(float), 1) * 255).astype(np.uint8)
Image.fromarray(img).save(dst)
