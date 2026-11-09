# Kaj: svansen ringlar runt högerarmens tass, så delar.py ger dem som en del (arm-r, ingen svans).
# Här delas de på färg (svart/gräddvit utanför kroppen): den stora ytan till höger är svansen,
# den lilla vid kroppens kant är armen. Vita kantpixlar går till närmaste del.
# Kör från premium/ efter delar.py:  ~/.claude/skills/ai-video/.venv/bin/python -I skript/delar-kaj.py
import json
import numpy as np
from PIL import Image
from scipy import ndimage

hel = np.asarray(Image.open("cut/kaj-faceless.png").convert("RGBA"))
A = hel[..., 3] > 128
B = np.asarray(Image.open("cut/kaj-body.png").convert("RGBA"))[..., 3] > 128
rgb = hel[..., :3].astype(int)
vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
farg = ndimage.binary_opening(A & ~ndimage.binary_dilation(B, iterations=6) & ~vit, iterations=2)
lab, n = ndimage.label(farg)
delar = {}
for i in range(1, n + 1):
    m = lab == i
    ys, xs = np.nonzero(m)
    if m.sum() < 800 or xs.mean() < 700 or ys.mean() > 780:
        continue  # öron, vänster arm och ben: behåll delar.py:s
    delar["tail" if m.sum() > 10000 else "arm-r"] = m

namn = list(delar)
etikett = np.zeros(A.shape, int)
for k, d in enumerate(namn, 1):
    etikett[delar[d]] = k
_, (iy, ix) = ndimage.distance_transform_edt(etikett == 0, return_indices=True)
narmast = etikett[iy, ix]
kant = A & vit & ~B
rigg = json.load(open("kaj-rigg.json"))
nara_kropp = ndimage.binary_dilation(B, iterations=20)
for k, d in enumerate(namn, 1):
    m = delar[d] | (kant & (narmast == k) & ndimage.binary_dilation(delar[d], iterations=24))
    led = delar[d] & nara_kropp
    py, px = np.nonzero(led)
    vrid = [int(px.mean()), int(py.mean())]
    m = m | (ndimage.binary_dilation(delar[d], iterations=30) & A & B)  # rot under kroppen
    ut = hel.copy()
    ut[..., 3] = np.where(m, hel[..., 3], 0)
    Image.fromarray(ut).save(f"cut/kaj-{d}.png")
    rigg["delar"][d] = {"fil": f"cut/kaj-{d}.png", "vridpunkt": vrid}
    print(d, vrid, int(m.sum()))
json.dump(rigg, open("kaj-rigg.json", "w"), indent=2, ensure_ascii=False)
