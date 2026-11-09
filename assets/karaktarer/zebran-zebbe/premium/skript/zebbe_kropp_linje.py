# Flow-kroppen (zebbe-body-flow.jpg) har kvar en tunn grå linje under äggets vita kant (konstens klipplinje där benen satt).
# tunn_kant räknar den som fyllning, så den fick en egen kant. Här blir den vit: allt i fyllningen som inte hör till den
# stora kroppen efter en öppning (tunna linjer försvinner). Kör i varm-färg, sedan tunn_kant 10 och varm.py -1.
import sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
for f in sys.argv[1:]:
    a = np.asarray(Image.open(f).convert('RGBA')).copy()
    F = tunn_kant.fyllning(a)
    o = ndimage.binary_opening(F, iterations=4)
    lab, n = ndimage.label(o); s = ndimage.sum(o, lab, range(1, n + 1))
    kropp = ndimage.binary_dilation(lab == 1 + s.argmax(), iterations=4) & F
    bort = F & ~kropp
    a[bort, :3] = 255
    Image.fromarray(a).save(f); print(f, 'vita px', int(bort.sum()))
