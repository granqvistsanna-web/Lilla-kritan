"""Bilderna som bara ängen behöver, ur assets/ (inget ritas nytt), till angen/bilder/:
- ludde-sitter.png: ludde-sitter-v1.png (platshållare tills Sanna valt v1 eller v2) utan det inbakade ansiktet och de inbakade
  tassarna, lagade med ullen från magen, så att ansiktet ritas i kod och riggens armar (ludde-arm-r/l.png) kan röra sig.
- bit-0/1/2.png: de tre bitarna i kanelbulle-bitar-v1.png, var för sig med originalets tunna urklippskant (vänster, mitten, höger).
Kör: ~/.claude/skills/ai-video/.venv/bin/python -I angen/gor-bilder.py   (från scener/)"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

HÄR = Path(__file__).resolve().parent
A = HÄR.parents[3] / "assets"
UT = HÄR / "bilder"
UT.mkdir(exist_ok=True)


def lappa(im, mål, källa_dx, källa_dy, mjuk=14):
    """Klonar ullen från (mål flyttat dx, dy) över målet (en ellips), med mjuk kant."""
    m = Image.new("L", im.size)
    ImageDraw.Draw(m).ellipse(mål, fill=255)
    m = m.filter(ImageFilter.GaussianBlur(mjuk))
    kopia = im.copy().transform(im.size, Image.AFFINE, (1, 0, källa_dx, 0, 1, källa_dy), Image.BICUBIC)
    ut = im.copy()
    ut.paste(kopia, (0, 0), m)
    ut.putalpha(im.getchannel("A"))   # siluetten är orörd
    return ut


ludde = Image.open(A / "karaktarer/lammet-ludde/cut/ludde-sitter-v1.png").convert("RGBA")
ludde = lappa(ludde, (335, 318, 685, 505), 0, 160)       # ögonen, nosen och munnen ← magen under
ludde = lappa(ludde, (236, 500, 330, 650), 130, 0)       # vänstra tassen och armstrecket ← inåt
ludde = lappa(ludde, (690, 450, 790, 650), -130, 0)      # högra
ludde.save(UT / "ludde-sitter.png")

bitar = Image.open(A / "rekvisita/kanelbulle/cut/kanelbulle-bitar-v1.png").convert("RGBA")
a = np.asarray(bitar).astype(int)
vit = (a[..., 0] > 225) & (a[..., 1] > 215) & (a[..., 2] > 200)
kropp = (a[..., 3] > 128) & ~vit
kropp = ndimage.binary_opening(kropp, iterations=2)
lab, n = ndimage.label(kropp)
storlek = ndimage.sum(kropp, lab, range(1, n + 1))
tre = sorted(np.argsort(storlek)[-3:] + 1, key=lambda i: ndimage.center_of_mass(kropp, lab, i)[1])
for nr, i in enumerate(tre):
    m = ndimage.binary_fill_holes(lab == i)
    kant = ndimage.binary_dilation(m, iterations=6) & (a[..., 3] > 0)   # bitens egen tunna urklippskant ur originalet; den vita kanten ger kant.js
    bit = np.zeros_like(a)
    bit[kant] = a[kant]
    im = Image.fromarray(bit.astype("uint8"))
    im.putalpha(im.getchannel("A").filter(ImageFilter.GaussianBlur(1)))
    im.save(UT / f"bit-{nr}.png")
print("ludde-sitter.png, bit-0..2.png →", UT)
