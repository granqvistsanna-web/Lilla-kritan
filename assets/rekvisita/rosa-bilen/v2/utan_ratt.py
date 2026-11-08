import sys, numpy as np
from PIL import Image
from scipy import ndimage
src, dst = sys.argv[1:3]
a = np.array(Image.open(src).convert('RGBA'))
rgb = a[..., :3].astype(int); H, W_ = a.shape[:2]
yy, xx = np.mgrid[:H, :W_]
box = (xx > 290) & (xx < 470) & (yy < 205)
gra = box & ((rgb.max(2) - rgb.min(2)) < 22) & (rgb.min(2) < 200)
gra = ndimage.binary_dilation(gra, iterations=4) & box
# bilens överkant (där rosa börjar) i rutan: ca y 99 vid x 300 till 94 vid x 470
top = 99 - (xx - 300) * 5 / 170
ovan = box & (yy < top)
a[ovan, 3] = 0
inne = gra & ~ovan
ok = ~gra & (a[..., 3] > 128) & (rgb.min(2) < 228)
# radvis: blanda linjärt mellan närmaste bra pixel till vänster och höger (bevarar de nästan vågräta linjerna)
rng = np.random.default_rng(3)
for y in np.nonzero(inne.any(1))[0]:
    xs = np.nonzero(inne[y])[0]
    for run in np.split(xs, np.nonzero(np.diff(xs) > 1)[0] + 1):
        l, r = run[0] - 1, run[-1] + 1
        while l > 0 and not ok[y, l]: l -= 1
        while r < W_ - 1 and not ok[y, r]: r += 1
        for x in run:
            t = (x - l) / max(1, r - l)
            # korn: ta färgen ur en slumpad granne nära l resp. r så att kritstrukturen följer med
            cl = a[y, max(0, l - rng.integers(0, 6)), :3].astype(int); cr = a[y, min(W_ - 1, r + rng.integers(0, 6)), :3].astype(int)
            a[y, x, :3] = np.clip((1 - t) * cl + t * cr, 0, 255)
Image.fromarray(a[:, ::-1]).save(dst)
