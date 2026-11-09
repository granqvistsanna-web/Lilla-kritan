# Hugo: delar.py kan inte skilja hängöronen från armarna (de nuddar varandra utanför kroppen).
# Öronen tas ur färgen (brunt, hela örat, även där det ligger över huvudet) och läggs framför kroppen.
# Armar och svans är de andra färgytorna utanför kroppen; vita kantpixlar går till närmaste del.
# Kör från premium/ efter delar.py (som gav cut/hugo-faceless.png, hugo-body.png och benen):
#   ~/.claude/skills/ai-video/.venv/bin/python -I skript/delar-hugo.py
import json
import numpy as np
from PIL import Image
from scipy import ndimage

hel = np.asarray(Image.open("cut/hugo-faceless.png").convert("RGBA"))
A = hel[..., 3] > 128
B = np.asarray(Image.open("cut/hugo-body.png").convert("RGBA"))[..., 3] > 128
rgb = hel[..., :3].astype(int)
vit = (rgb.min(-1) > 225) & (np.ptp(rgb, -1) < 22)
brun = A & (rgb[..., 0] < 175) & (rgb[..., 1] < 125)
brun = ndimage.binary_opening(brun, iterations=2)
ute = A & ~ndimage.binary_dilation(B, iterations=6)
farg = ute & ~vit & ~brun
farg = ndimage.binary_opening(farg, iterations=2)

delar = {}
lab, n = ndimage.label(brun)
for i in range(1, n + 1):
    m = lab == i
    if m.sum() > 3000:
        delar["ear-" + ("l" if np.nonzero(m)[1].mean() < 512 else "r")] = m
lab, n = ndimage.label(farg)
for i in range(1, n + 1):
    m = lab == i
    if m.sum() < 800:
        continue
    ys, xs = np.nonzero(m)
    if ys.mean() > 780:
        continue  # benen: behåll delar.py:s
    if xs.mean() > 700 and ys.mean() > 600:
        delar["tail"] = m
    else:
        delar["arm-" + ("l" if xs.mean() < 512 else "r")] = m

# Vita kantpixlar utanför kroppen går till närmaste färgdel.
namn = list(delar)
etikett = np.zeros(A.shape, int)
for k, m in enumerate(namn, 1):
    etikett[delar[m]] = k
_, (iy, ix) = ndimage.distance_transform_edt(etikett == 0, return_indices=True)
narmast = etikett[iy, ix]
kant = A & vit & ~B
rigg = json.load(open("hugo-rigg.json"))
nara_kropp = ndimage.binary_dilation(B, iterations=20)
for k, d in enumerate(namn, 1):
    m = delar[d] | (kant & (narmast == k) & ndimage.binary_dilation(delar[d], iterations=24))
    if d.startswith("ear"):
        ys, xs = np.nonzero(delar[d])
        topp = ys.min()
        rad = delar[d][topp:topp + 40]
        vrid = [int(np.nonzero(rad)[1].mean()), int(topp + 30)]  # i örats rot, inne i huvudet
    else:
        led = delar[d] & nara_kropp
        py, px = np.nonzero(led)
        vrid = [int(px.mean()), int(py.mean())]
        # rot under kroppen så att delen kan vridas utan glipa (döljs bakom kroppen)
        m = m | (ndimage.binary_dilation(delar[d], iterations=30) & A & B)
    ut = hel.copy()
    ut[..., 3] = np.where(m, hel[..., 3], 0)
    Image.fromarray(ut).save(f"cut/hugo-{d}.png")
    rigg["delar"][d] = {"fil": f"cut/hugo-{d}.png", "vridpunkt": vrid}
    print(d, vrid, int(m.sum()))
json.dump(rigg, open("hugo-rigg.json", "w"), indent=2, ensure_ascii=False)
