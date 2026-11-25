# Rävens öron utan hack (Sanna 2026-11-25, 056: "fox ears need work"): fyllningen (utan vit kant) fylls ut till sitt konvexa hölje,
# så trappsteget på örats utsida (gamla äggkanten) försvinner och roten blir jämn i örats egen kritfärg. Sedan samma vita kant runt.
#   python3 skript/rut_oron.py <in.png> <ut.png> [kant px: 6.5 för cut-tunn, 10 för cut]
import sys, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd
from scipy.spatial import ConvexHull
src, dst, N = sys.argv[1], sys.argv[2], float(sys.argv[3]) if len(sys.argv) > 3 else 6.5
a = np.asarray(Image.open(src).convert('RGBA')).astype(float)
rgb = a[..., :3]; al = a[..., 3] > 128
vit = (rgb.min(2) > 228) & (np.ptp(rgb, 2) < 22)
F = nd.binary_fill_holes(nd.binary_opening(al & ~vit, iterations=2))
ys, xs = np.nonzero(F); p = np.c_[xs, ys]; h = ConvexHull(p)
m = Image.new('L', (1024, 1024), 0); ImageDraw.Draw(m).polygon([tuple(map(int, p[v])) for v in h.vertices], fill=255)
G = np.asarray(m) > 0
G = nd.binary_opening(G, iterations=3)
Fk = nd.binary_erosion(F, iterations=4)   # källan för nya pixlar: bara ren krita, inte den ljusa kanten mot den vita
_, (iy, ix) = nd.distance_transform_edt(~Fk, return_indices=True)
nya = G & ~Fk
out = np.zeros_like(a)
out[..., :3] = np.where(G[..., None], rgb, 255)
out[nya, :3] = rgb[iy[nya], ix[nya]]
# mjuk fyllkant
dIn = nd.distance_transform_edt(G); dOut = nd.distance_transform_edt(~G)
out[..., 3] = 255 * np.clip(N + 0.5 - dOut, 0, 1)
out[G, 3] = 255
# vit kant
kant = ~G & (dOut <= N + 0.5)
out[kant, :3] = [255, 253, 246]
Image.fromarray(out.astype(np.uint8)).save(dst); print(dst, 'nya', int(nya.sum()))
