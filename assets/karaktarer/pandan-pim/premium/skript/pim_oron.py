# Putsade öron (Sanna 2026-11-27, "polish panda ears"). Kör i premium/ efter pim_delar.py.
# - Formen: örats svarta yta + roten mjukas (gauss 6 px, tröskel 0,5), så att den knöliga kanten blir en jämn rund lob.
# - Kritan: konstens egna svarta pixlar (cut/v1) där de finns; resten (roten under kroppen) en kakel ur örats mitt
#   som bara flyttas, aldrig speglas (pim_delar.py speglade kaklet, det gav ett X-mönster i örat).
# - Kanten: tunn_kant.py 10 i cut/ och 6,5 i cut-tunn/, som resten av riggen.
import shutil, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant

for d in ['ear-l', 'ear-r']:
    nu = np.asarray(Image.open(f'cut/pim-{d}.png').convert('RGBA'))
    v1 = np.asarray(Image.open(f'cut/v1/pim-{d}.png').convert('RGBA'))
    form = tunn_kant.fyllning(nu)
    # loben (och 30 px in under kroppen, så att inget hack syns när örat vrids ±12°) blir konvex; roten står kvar
    kropp = ndimage.binary_erosion(tunn_kant.fyllning(np.asarray(Image.open('cut/pim-body.png').convert('RGBA'))), iterations=30)
    ys, xs = np.nonzero(form & ~kropp)
    yy, xx = np.mgrid[:1024, :1024]
    hull = np.ones((1024, 1024), bool)
    from scipy.spatial import ConvexHull
    pts = np.c_[xs, ys]; H = ConvexHull(pts)
    for nx, ny, c in H.equations: hull &= nx * xx + ny * yy + c <= 0.5
    form = form | hull
    mjuk = ndimage.gaussian_filter(form.astype(float), 5)
    alfa = np.clip((mjuk - 0.5) * 6 + 0.5, 0, 1)           # jämn kant, 1–2 px mjuk övergång
    konst = (v1[..., 3] > 128) & (v1[..., :3].max(2) < 110)
    konst = ndimage.binary_erosion(konst, iterations=2)       # inte konstens grå kantpixlar
    # kakel ur den största helt svarta biten, upprepad med förskjutning (ingen spegling)
    dt = ndimage.distance_transform_edt(konst)
    my, mx = np.unravel_index(dt.argmax(), dt.shape); s = int(min(56, dt.max() * 1.3))
    k = v1[my - s // 2:my - s // 2 + s, mx - s // 2:mx - s // 2 + s, :3]
    rader = [np.roll(np.tile(k, (1, 1024 // s + 2, 1)), -(i * s // 3), 1) for i in range(1024 // s + 2)]
    kakel = np.concatenate(rader, 0)[:1024, :1024]
    rgb = np.where(konst[..., None], v1[..., :3], kakel)
    img = np.dstack([rgb, (alfa * 255).round()]).astype(np.uint8)
    for mapp, n in [('cut', 10), ('cut-tunn', 6.5)]:
        Image.fromarray(img).save(f'{mapp}/pim-{d}.png')
        tunn_kant.kor(f'{mapp}/pim-{d}.png', n)
    print(d, 'kakel', s, 'px vid', (mx, my))
