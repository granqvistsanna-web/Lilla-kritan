# Rävens svans putsad (Sanna 2026-11-28, "polish räven's tail the same way you did the ears"), som rut_oron_putsa.py:
# den gamla svansen hade ett hack och en liten spets i överkanten mot kroppen och en utsmetad, randig rot.
# Svansen görs om direkt ur original/rut-faceless.jpg (samma pixlar som riggen): det synliga ovanför/utanför kroppen rakt ur
# konsten (med den vita spetsen), roten bakom kroppen (in till vridpunkten) i ren orange krita, formen rundad, vit kant runt.
#   python3 skript/rut_svans_putsa.py [kant px: 6.5 för cut-tunn, 10 för cut] <utmapp>
import sys, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as nd
from scipy.spatial import ConvexHull
N, ut = float(sys.argv[1]), sys.argv[2]
rgb = np.asarray(Image.open('original/rut-faceless.jpg').convert('RGB')).astype(float)
kropp = np.asarray(Image.open('cut-tunn/rut-body-tom.png').convert('RGBA'))[..., 3] > 128
huvud = nd.binary_erosion(kropp, iterations=7)                       # kroppens fyllning utan vit kant
sat = rgb.max(2) - rgb.min(2)
kram = (rgb[..., 0] - rgb[..., 2] > 15) & (rgb.min(2) > 190)          # svansspetsens kräm (inte den vita kanten)
krita = (sat > 90) | (rgb.sum(2) < 400) | kram
box = np.zeros_like(krita); box[612:900, 640:980] = True             # under armstumpen
V = nd.binary_opening(krita & ~huvud & box, iterations=2)
lab, n = nd.label(V); V = nd.binary_fill_holes(lab == (np.argmax(nd.sum(V, lab, range(1, n + 1))) + 1))
# roten: höljet av svansen och en rund klump kring vridpunkten (bakom kroppen), rundat
ys, xs = np.nonzero(V); v = np.linspace(0, 2 * np.pi, 48)
p = np.r_[np.c_[xs, ys], np.c_[761 + 45 * np.cos(v), 717 + 45 * np.sin(v)]]   # rot in till vridpunkten (761, 717), syns aldrig när svansen lyfts 40°
h = ConvexHull(p); m = Image.new('L', (1024, 1024), 0)
ImageDraw.Draw(m).polygon([tuple(map(int, p[v])) for v in h.vertices], fill=255)
G = (np.asarray(m) > 0) & (V | huvud)                                # utanför kroppen följer formen konsten exakt
G = nd.gaussian_filter(G.astype(float), 3) > 0.5                     # mjuka hörn
vit = (rgb.min(2) > 200) & ~kram
S = V & ~vit & ~nd.binary_dilation(huvud, iterations=8)
_, (iy, ix) = nd.distance_transform_edt(~S, return_indices=True)
out = np.zeros((1024, 1024, 4))
out[..., :3] = rgb[iy, ix]                                           # närmast kroppskanten: närmaste kritfärg
djup = G & ~S & nd.binary_erosion(huvud, iterations=3)                 # djupt bakom kroppen: kroppens egen orange krita (rut-body-tom, utan mage)
out[djup, :3] = np.asarray(Image.open('cut-tunn/rut-body-tom.png').convert('RGB')).astype(float)[djup]
out[S, :3] = rgb[S]
dOut = nd.distance_transform_edt(~G)
out[..., 3] = 255 * np.clip(N + 0.5 - dOut, 0, 1); out[G, 3] = 255
out[~G & (dOut <= N + 0.5), :3] = [255, 253, 246]                    # vit kant
f = f'{ut}/rut-tail.png'
Image.fromarray(out.astype(np.uint8)).save(f); print(f, 'källa', int(S.sum()), 'form', int(G.sum()))
