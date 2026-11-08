# Lejonets delar som delar.py inte hittar: öronen (inne i manen, läggs framför kroppen), svansen (skild från högerarmen),
# och armarnas vridpunkter (armarna ritas sedan med rita-lemmar.py). Benen kommer från delar.py.
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage

d = sys.argv[1]
fl = np.asarray(Image.open(f"{d}/cut/lage-faceless.png")).copy()
A, B = fl[..., 3] > 128, np.asarray(Image.open(f"{d}/cut/lage-body.png"))[..., 3] > 128
F = fl[..., :3].astype(int)
rigg = json.load(open(f"{d}/lage-rigg.json"))
yy, xx = np.mgrid[:1024, :1024]


def spara(namn, ytan, vrid):
    bild = fl.copy(); bild[~ytan, 3] = 0
    Image.fromarray(bild).save(f"{d}/cut/lage-{namn}.png")
    rigg["delar"][namn] = {"fil": f"cut/lage-{namn}.png", "vridpunkt": vrid}


# öron: den gula fläcken i manen, med sin mörkare kritlinje
gul = (F[..., 0] > 225) & (F[..., 1] > 160) & (F[..., 2] < 150) & (F[..., 0] - F[..., 1] < 80)
for namn, (x0, x1, y0, y1), vrid in [("ear-l", (300, 380, 205, 292), [360, 282]), ("ear-r", (640, 722, 200, 290), [664, 280])]:
    ruta = (xx >= x0) & (xx <= x1) & (yy >= y0) & (yy <= y1)
    lab, n = ndimage.label(gul & ruta)
    s = ndimage.sum(gul & ruta, lab, range(1, n + 1))
    ora = ndimage.binary_fill_holes(lab == 1 + np.argmax(s))
    spara(namn, ndimage.binary_dilation(ora, iterations=7) & A, vrid)

# svans: det som sticker ut till höger nedanför armen, plus en bit kropp runt roten (göms bakom kroppen)
# bara kritfyllningen (inte den vita ytan mellan svansen och kroppen), kanten görs om med tunn_kant.py
farg = F.min(2) < 228
ut = A & farg & ~ndimage.binary_dilation(B, iterations=6) & (xx > 680) & ((yy > 640) | (xx > 850))
lab, n = ndimage.label(ut); s = ndimage.sum(ut, lab, range(1, n + 1))
svans = lab == 1 + np.argmax(s)
led = svans & ndimage.binary_dilation(B, iterations=20)
py, px = np.nonzero(led)
spara("tail", (ndimage.binary_dilation(svans, iterations=12) & A) | (ndimage.binary_dilation(svans, iterations=40) & B & farg),
      [int(px.mean()), int(py.mean())])

rigg["delar"]["arm-l"]["vridpunkt"] = [236, 574]
rigg["delar"]["arm-r"]["vridpunkt"] = [786, 572]
json.dump(rigg, open(f"{d}/lage-rigg.json", "w"), indent=2, ensure_ascii=False)
print(json.dumps({k: v["vridpunkt"] for k, v in rigg["delar"].items()}))
