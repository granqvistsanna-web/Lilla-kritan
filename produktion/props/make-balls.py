# Make new crayon balls from the approved ones: recolour the crayon coverage, optionally paint stripes.
#   balls.py <props_dir>
import subprocess, sys
import numpy as np
from scipy import ndimage

D = sys.argv[1]

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(1024, 1024, 3).astype(float)

def save(img, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '1024x1024', '-i', '-', path],
                   input=np.clip(img, 0, 255).astype(np.uint8).tobytes(), check=True)

def hexrgb(h):
    return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], float)

def coverage(img, ch, base):
    # how much crayon is on the paper, 0 = white paper, 1 = full fill; read from the channel the colour absorbs most
    return np.clip((255 - img[..., ch]) / (255 - base), 0, 1.15)

def paint(a, colour):
    return 255 - a[..., None] * (255 - hexrgb(colour))

def stripes(a, n, colour2=None, seed=1):
    rng = np.random.default_rng(seed)
    ink = ndimage.binary_opening(a > 0.25, iterations=2)
    ys, xs = np.nonzero(ink)
    cy, cx, r = ys.mean(), xs.mean(), np.sqrt(ink.sum() / np.pi)
    Y, X = np.mgrid[0:1024, 0:1024].astype(float)
    inside = np.hypot(Y - cy, X - cx) < r * 0.9
    shut = ndimage.grey_closing(a, size=35)
    arc = ndimage.binary_dilation(inside & (a < shut * 0.55), iterations=2)
    a = np.where(arc, shut * rng.uniform(0.75, 1, a.shape), a)                   # paint over the old white arc only
    wobble = ndimage.gaussian_filter(rng.normal(size=(1024, 1024)), 30) * 160   # hand-drawn edge wobble
    v = (Y - cy) + 0.22 * (X - cx) ** 2 / r + wobble + rng.normal(size=(1024, 1024)) * 2.5  # bands bow like on a sphere, grainy edge
    band = (np.sin(2 * np.pi * v / (2 * r / n) + 0.6) > 0.35)
    band = ndimage.gaussian_filter(band.astype(float), 0.8)
    band *= np.clip((r * 0.93 - np.hypot(Y - cy, X - cx)) / 6, 0, 1)            # leave the rim alone
    grain = rng.random((1024, 1024))
    if colour2 is None:  # white crayon stripe: paper shows through with a few colour specks
        keep = 1 - band * (0.88 + 0.12 * (grain > 0.9))
        return a * keep, None
    return a * (1 - band), a * band

pink = load(f'{D}/ball-pink-dots.png'); a_dots = coverage(pink, 1, 60)
red = load(f'{D}/../characters/ball-red-crayon.png'); a_red = coverage(red, 1, 52)

for name, col in [('green-dots', '#4cae4c'), ('blue-dots', '#3a7bd5'), ('yellow-dots', '#f2c230'), ('purple-dots', '#8e55c9')]:
    save(paint(a_dots, col), f'{D}/ball-{name}.png')

for name, col, n, col2, seed in [('blue-stripes', '#3a7bd5', 4, None, 2), ('orange-stripes', '#f28d3c', 4, None, 3),
                                 ('green-stripes', '#4cae4c', 5, None, 4), ('red-yellow-stripes', '#df342f', 4, '#f4d252', 5)]:
    a1, a2 = stripes(a_red, n, col2, seed)
    img = paint(a1, col)
    if a2 is not None:
        img = img - (255 - paint(a2, col2))
    save(img, f'{D}/ball-{name}.png')
