# premium-v3 (slät, 2026-11-10), kopia av premium/skript/delar-lejon.py utan öronen. Lejonets delar som delar.py inte hittar: öronen (inne i manen, läggs framför kroppen), svansen (skild från högerarmen),
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


# öronen sitter kvar i kroppen (premium-v3: släta, rör sig inte)

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
