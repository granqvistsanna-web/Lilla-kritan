# Kajsas gräddvita krita (min-kanal ~230) räknas som "vitt" av tunn_kant/egen_kant. Värm den före (+1) och kyl tillbaka efter (-1).
# Bara krämfärgade pixlar (R-B > 6) ändras; vit kant och bakgrund (R≈B) lämnas.
import sys, numpy as np
from PIL import Image
riktn = float(sys.argv[1])
for f in sys.argv[2:]:
    im = Image.open(f); m = im.mode
    a = np.asarray(im.convert('RGBA')).astype(float)
    if riktn > 0:
        w = np.clip((a[..., 0] - a[..., 2] - 6) / 10, 0, 1)
    else:
        w = np.clip((a[..., 0] - a[..., 2] - 18) / 10, 0, 1)
    a[..., 2] -= riktn * 14 * w
    a[..., 1] -= riktn * 4 * w
    out = Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA')
    (out if m == 'RGBA' else out.convert('RGB')).save(f)
