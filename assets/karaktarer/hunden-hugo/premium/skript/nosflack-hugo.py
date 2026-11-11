# Hugo: lyfter ut den ljusa nosfläcken ur kroppen, så att den följer ansiktet (riktningsposen, skaka, nicka) i stället
# för att stå kvar. verktyg/flackar.py går inte på Hugo: den ljusa orange kroppen räknas som en enda fläck.
# Fläcken är den mindre av kroppens två gräddvita ytor (blått > 150; kroppen är orange). cut/hugo-nos.png = fläcken med
# mjuk kant, cut/hugo-body-tom.png = kroppen med kroppsfärgen jämnt ifylld där fläcken satt (bröstfläcken är kvar).
# Kör från premium/:   ~/.claude/skills/ai-video/.venv/bin/python -I skript/nosflack-hugo.py
import numpy as np
from PIL import Image
from scipy import ndimage

a = np.asarray(Image.open("cut/hugo-body.png").convert("RGBA")).copy()
rgb = a[..., :3].astype(float)
inne = ndimage.binary_erosion(a[..., 3] > 200, iterations=20)
lab, n = ndimage.label(ndimage.binary_opening(inne & (rgb[..., 2] > 150), iterations=3))
storlek = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
flack = ndimage.binary_fill_holes(lab == np.argsort(storlek)[::-1][1] + 1)   # näst störst: nosfläcken (störst är bröstet)
d = ndimage.distance_transform_edt(~flack)

nos = a.copy(); nos[..., 3] = (np.clip(1 - (d - 2) / 4, 0, 1) * 255).astype("uint8")   # 2 px hel, sedan 4 px mjuk kant
Image.fromarray(nos).save("cut/hugo-nos.png", optimize=True)

# under fläcken: kroppens färg runt om, utjämnad inåt (kroppen är slät där, med en mjuk skuggning)
hal = d <= 10
kand = (~hal).astype(float)
fyll = np.stack([ndimage.gaussian_filter(rgb[..., c] * kand, 18) for c in range(3)], -1) / ndimage.gaussian_filter(kand, 18)[..., None]
tom = rgb.copy(); tom[hal] = fyll[hal]
for _ in range(300):   # jämna ut skarven: varje pixel i hålet blir medelvärdet av sina grannar
    tom[hal] = np.stack([ndimage.uniform_filter(tom[..., c], 5) for c in range(3)], -1)[hal]
a[..., :3] = np.clip(tom, 0, 255).astype("uint8")
Image.fromarray(a).save("cut/hugo-body-tom.png", optimize=True)
ys, xs = np.nonzero(flack)
print("nos mitt", int(xs.mean()), int(ys.mean()), "bredd", xs.max() - xs.min(), "höjd", ys.max() - ys.min())
