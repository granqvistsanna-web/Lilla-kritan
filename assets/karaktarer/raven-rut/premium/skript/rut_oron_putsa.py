# Rävens öron putsade (Sanna 2026-11-28, "polish räven ears"): rut_oron.py fyllde ut de gamla delarna till ett hölje,
# så öronen fick kantiga hörn, en vit glansrand på utsidan och inre örat avklippt mot den gamla äggkanten.
# Här görs öronen om direkt ur original/rut-faceless.jpg (samma pixlar som riggen): det synliga örat ovanför huvudet tas rakt
# ur konsten, roten nedanför (bakom kroppen) fylls med ren orange krita ur huvudets mitt, formen rundas mjukt, sedan samma vita kant runt.
#   python3 skript/rut_oron_putsa.py [kant px: 6.5 för cut-tunn, 10 för cut] <utmapp>
import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd
from scipy.spatial import ConvexHull
from PIL import ImageDraw
N, ut = float(sys.argv[1]), sys.argv[2]
rgb = np.asarray(Image.open('original/rut-faceless.jpg').convert('RGB')).astype(float)
kropp = np.asarray(Image.open('cut-tunn/rut-body-tom.png').convert('RGBA'))[..., 3] > 128
huvud = nd.binary_erosion(kropp, iterations=7)                       # kroppens fyllning utan vit kant
sat = rgb.max(2) - rgb.min(2)
krita = (sat > 90) | (rgb.sum(2) < 400)                              # orange eller mörkbrun, inte vitt eller grå skugga
for sida, (x0, x1) in {'l': (230, 470), 'r': (550, 790)}.items():
    box = np.zeros_like(krita); box[60:315, x0:x1] = True                       # under 315 möter örat huvudet
    V = nd.binary_opening(krita & ~huvud & box, iterations=2)
    lab, n = nd.label(V); V = lab == (np.argmax(nd.sum(V, lab, range(1, n + 1))) + 1)
    V = nd.binary_fill_holes(V)
    # roten: höljet av örat och samma öra 70 px längre ner (bakom kroppen), rundat
    ys, xs = np.nonzero(V); p = np.r_[np.c_[xs, ys], np.c_[xs, ys + 70]]
    h = ConvexHull(p); m = Image.new('L', (1024, 1024), 0)
    ImageDraw.Draw(m).polygon([tuple(map(int, p[v])) for v in h.vertices], fill=255)
    G = (np.asarray(m) > 0) & (V | huvud)                            # utanför huvudet följer formen konsten exakt
    G = nd.gaussian_filter(G.astype(float), 3) > 0.5                 # mjuka hörn
    # källa: örats rena krita (inte den ljusa kanten mot vitt, inte huvudets kontur)
    ljus = rgb.min(2) > 200
    S = V & ~ljus & ~nd.binary_dilation(huvud, iterations=8)
    _, (iy, ix) = nd.distance_transform_edt(~S, return_indices=True)
    out = np.zeros((1024, 1024, 4))
    out[..., :3] = rgb[iy, ix]                                       # närmast kroppskanten: närmaste kritfärg
    # djupt bakom kroppen: ren orange krita ur huvudets mitt (200 px in mot mitten), inte utsmetad kantfärg
    djup = G & (nd.binary_erosion(huvud, iterations=14) | (np.arange(1024)[:, None] >= 318))
    dx = 200 if sida == 'l' else -200
    out[djup, :3] = np.roll(rgb, -dx, 1)[djup]
    out[S, :3] = rgb[S]
    dOut = nd.distance_transform_edt(~G)
    out[..., 3] = 255 * np.clip(N + 0.5 - dOut, 0, 1); out[G, 3] = 255
    kant = ~G & (dOut <= N + 0.5)
    out[kant, :3] = [255, 253, 246]
    f = f'{ut}/rut-ear-{sida}.png'
    Image.fromarray(out.astype(np.uint8)).save(f); print(f, 'källa', int(S.sum()), 'form', int(G.sum()))
