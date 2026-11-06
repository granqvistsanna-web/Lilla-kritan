# Byter en ojämn eller för tjock inbakad vit kant mot en jämn på 1 % av sakens höjd (regeln i skill vita-kanter;
# de 3 px som är kvar lägger verktyg/kant.js på i kod). Tar också bort lösa kritsmulor: bara den största biten behålls.
# Fungerar också på en jpeg med vit bakgrund (då klipps den ut).
#   python3 ny-kant.py <in.png> <ut.png> [--genomskinlig]   (--genomskinlig: vitt inne i saken blir genomskinligt, t.ex. glasets tomma topp)
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

im = Image.open(sys.argv[1]).convert('RGBA')
a = np.array(im)
vit = (a[..., :3].min(-1) > 225) & (a[..., :3].max(-1) - a[..., :3].min(-1) < 30)
sak = (a[..., 3] > 128) & ~vit                      # saken utan den vita kanten

# fyll hål (vita fläckar inne i saken, t.ex. rosetten): allt som inte nås utifrån hör till saken
m = Image.fromarray(np.pad(sak, 1).astype(np.uint8) * 255).copy()   # copy: floodfill fungerar inte på en bild som delar minne med numpy
ImageDraw.floodfill(m, (0, 0), 128)
sak = (np.array(m) != 128)[1:-1, 1:-1]

# största biten: fyll från en punkt långt inne i saken
mitt = np.array(Image.fromarray(sak.astype(np.uint8) * 255).filter(ImageFilter.MinFilter(15))) > 0
ys, xs = np.nonzero(mitt if mitt.any() else sak)
m = Image.fromarray(sak.astype(np.uint8) * 255).copy()   # copy: floodfill fungerar inte på en bild som delar minne med numpy
ImageDraw.floodfill(m, (int(xs[len(xs) // 2]), int(ys[len(ys) // 2])), 128)
bit = np.array(m) == 128

form = Image.fromarray(bit.astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(1.5)).point(lambda v: 255 if v > 128 else 0)
ys, _ = np.nonzero(np.array(form))
r = max(1, round(0.01 * (ys.max() - ys.min())))
kant = form
for _ in range(r):   # en px i taget, rund
    kant = kant.filter(ImageFilter.GaussianBlur(0.8)).point(lambda v: 255 if v > 40 else 0)
kant = kant.filter(ImageFilter.GaussianBlur(0.7))

ut = Image.new('RGBA', im.size, (252, 251, 248, 255))
ut.paste(im.convert('RGB'), (0, 0), form.filter(ImageFilter.GaussianBlur(0.6)))
if '--genomskinlig' in sys.argv:   # vitt inne i saken (inte kanten) släpper igenom, med en svag vit ton som glas
    kant = Image.fromarray(np.where(np.array(form) > 0, np.where(vit, 50, 255), np.array(kant)).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
ut.putalpha(kant)
ut.save(sys.argv[2])
print(sys.argv[2], 'höjd', ys.max() - ys.min(), 'kant', r, 'px')
