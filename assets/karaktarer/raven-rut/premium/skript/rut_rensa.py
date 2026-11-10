# Rensar öron och svans efter langre_rot.py: Flow-kroppen är lite större än det ansiktslösa ägget, så delarna fick
# små spetsar och hack där konstens äggkant gick (synliga när delen vrids). Fyllningen stängs (hack fylls med närmaste
# kritfärg) och öppnas (spetsar bort). --hull x0,y0,x1,y1: fyll också det konvexa höljet av delen inom rutan (svansens
# nedre vänstra hörn, där höger ben skars bort). Kör före tunn_kant.py 10.
import sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from scipy.spatial import ConvexHull
args = sys.argv[1:]
hull = None
if '--hull' in args:
    i = args.index('--hull'); hull = [int(v) for v in args[i + 1].split(',')]; del args[i:i + 2]
yy, xx = np.mgrid[:1024, :1024]
for f in args:
    a = np.asarray(Image.open(f).convert('RGBA')).copy()
    rgb = a[..., :3].astype(int)
    F = (a[..., 3] > 128) & ~((rgb.min(2) > 228) & (np.ptp(rgb, 2) < 22)) & (rgb.max(2) > 30)
    G = ndimage.binary_fill_holes(ndimage.binary_closing(np.pad(F, 20), iterations=14))[20:-20, 20:-20]
    if hull:
        x0, y0, x1, y1 = hull
        ys, xs = np.nonzero(F & (xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1))
        p = np.c_[xs, ys]; h = ConvexHull(p)
        m = Image.new('L', (1024, 1024), 0); ImageDraw.Draw(m).polygon([tuple(map(int, p[v])) for v in h.vertices], fill=255)
        G |= np.asarray(m) > 0
    G = ndimage.binary_opening(G, iterations=7) | (F & ndimage.binary_opening(F, iterations=7))
    _, (iy, ix) = ndimage.distance_transform_edt(~F, return_indices=True)
    nya = G & ~F
    a[nya, :3] = a[iy[nya], ix[nya], :3]
    a[..., 3] = np.where(G, 255, 0)
    Image.fromarray(a).save(f); print(f, 'nya', int(nya.sum()), 'bort', int((F & ~G).sum()))
