#!/usr/bin/env python3
"""Klipper den gröna v2-traktorn i delar, på samma sätt som v2-bilen (assets/stiltest-premium/bil/cut/).

Allt klipps ur EN bild (original/traktor-gron-v2.jpg, 1024x1024). Kanten läggs på hela traktorn
innan den delas: delarna får färg och kant ur samma helbild och varje pixel hör till exakt en del,
så skarvarna får ingen kant. python3 klipp-traktor.py  (körs var som helst)
"""
import json, os
import numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi

HER = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HER, "..", "original", "traktor-gron-v2.jpg")
KANT = 11  # px i filen: 3 + 1 % av traktorns höjd i bild (ca 620 px) = 9 px, delat med scenskalan 0,85
TAK_Y = 225  # taket slutar här (y i filen)

rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)
H, W = rgb.shape[:2]
mn, mx = rgb.min(2), rgb.max(2)
sat = mx - mn
gron = (rgb[..., 1] > rgb[..., 0] + 25) & (rgb[..., 1] > rgb[..., 2] + 25)

# 1. fyllningen: allt som inte är vit bakgrund eller krämvit kant
F = (mn < 222) | (sat > 24)
F = ndi.binary_opening(F, iterations=1)
lab, n = ndi.label(F)
s = ndi.sum(F, lab, range(1, n + 1))
F = np.isin(lab, 1 + np.nonzero(s > 0.01 * s.max())[0])
# bara små hål fylls (inte öppningen mellan stolparna)
hål = ndi.binary_fill_holes(F) & ~F
lab, n = ndi.label(hål)
for i in range(1, n + 1):
    if (lab == i).sum() < 400:
        F |= lab == i

# 2. kantpixlar får färg inifrån (ingen grå/krämig fransning)
d_in = ndi.distance_transform_edt(F)
kärna = d_in > 2.5
idx = ndi.distance_transform_edt(~kärna, return_distances=False, return_indices=True)
färg = rgb.copy()
kant_in = F & ~kärna
färg[kant_in] = rgb[idx[0][kant_in], idx[1][kant_in]]

# 3. jämn vit kant, KANT px, rundad
d_ut, (iy, ix) = ndi.distance_transform_edt(~F, return_indices=True)
d_s = cv2.GaussianBlur(d_ut.astype(np.float32), (0, 0), 2.2)
alfa_ut = np.clip(KANT + 0.5 - d_s, 0, 1)
Fa = cv2.GaussianBlur(F.astype(np.float32), (0, 0), 0.7)
alfa = np.maximum(alfa_ut, F.astype(np.float32))
col = färg * Fa[..., None] + 255.0 * (1 - Fa[..., None])
col[~F & (alfa_ut == 0)] = 255
hel = np.dstack([col, alfa * 255]).clip(0, 255).astype(np.uint8)


def spara(a, namn):
    Image.fromarray(a).save(os.path.join(HER, namn))


spara(hel, "traktor-gron-v2.png")

# 4. hjul: cirklar ur de mörka däcken
mörk = (mx < 130) & (sat < 30)
mörk = ndi.binary_closing(mörk, iterations=2)
mörk = ndi.binary_fill_holes(mörk)
mörk = ndi.binary_opening(mörk, iterations=3)
lab, n = ndi.label(mörk)
s = ndi.sum(mörk, lab, range(1, n + 1))
stora = np.argsort(s)[::-1][:2] + 1
hjul = []
for l in stora:
    m = (lab == l).astype(np.uint8)
    cnt = max(cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=len)[:, 0, :].astype(float)
    # minsta kvadrat-cirkel
    A = np.c_[2 * cnt[:, 0], 2 * cnt[:, 1], np.ones(len(cnt))]
    b = (cnt ** 2).sum(1)
    cx, cy, c = np.linalg.lstsq(A, b, rcond=None)[0]
    r = np.sqrt(c + cx * cx + cy * cy)
    dist = np.hypot(cnt[:, 0] - cx, cnt[:, 1] - cy)
    hjul.append(dict(cx=float(cx), cy=float(cy), r=float(r), rmax=float(np.percentile(dist, 97))))
hjul.sort(key=lambda h: -h["r"])
bak_h, fram_h = hjul  # stort = bakhjul
yy, xx = np.mgrid[:H, :W]
def cirkel(h, extra=1.5):
    r = h["r"] + extra
    return np.clip(r + 0.5 - np.hypot(xx - h["cx"], yy - h["cy"]), 0, 1)

# 5. etiketter på fyllningen: 0 bak (sätet, stolparna, avgasröret), 1 fram (karet under sätets kant, huven, taket)
lab_f = np.zeros((H, W), np.uint8)
kräm = F & (rgb[..., 0] > 215) & (rgb[..., 1] > 205) & (rgb[..., 2] < 228) & (rgb[..., 0] - rgb[..., 2] > 20)
kräm = ndi.binary_opening(kräm, iterations=2)
kk, nk = ndi.label(kräm)
s = ndi.sum(kräm, kk, range(1, nk + 1)); kräm = np.isin(kk, 1 + np.nonzero(s == s.max())[0])
cols = np.nonzero(kräm.any(0))[0]
xl, xr = cols.min(), cols.max()
botten = np.full(W, -1)
for x in range(xl, xr + 1):
    ys = np.nonzero(kräm[:, x])[0]
    if len(ys): botten[x] = ys.max()
xs = np.arange(xl, xr + 1); ok = botten[xs] >= 0
botten[xs] = np.interp(xs, xs[ok], botten[xs][ok])
botten[xs] = ndi.uniform_filter1d(botten[xs].astype(float), 9, mode="nearest").astype(int)
karet = (xx >= xl) & (xx <= xr) & (yy > botten[np.clip(xx, 0, W - 1)] + 1)
bakdel = (xx < xl) & (yy > botten[xl] - 25)          # karets bakre del (vänster om sätet)
huv = (xx > xr) & (yy > botten[xr] - 30)              # huven; avgasröret och stolpen ovanför är bak
tak = yy < TAK_Y
fram_mask = karet | bakdel | huv | tak
lab_f[F & fram_mask] = 1

# 6. kantpixlar får samma del som närmaste fyllningspixel
lab_all = lab_f[iy, ix]

def deler(c, a, mask):
    return np.dstack([c, a * mask * 255]).clip(0, 255).astype(np.uint8)

spara(deler(col, alfa, (lab_all == 0).astype(np.float32)), "traktor-bak.png")
spara(deler(col, alfa, (lab_all == 1).astype(np.float32)), "traktor-fram.png")
for h, namn in ((bak_h, "hjul-bak.png"), (fram_h, "hjul-fram.png")):
    c = cirkel(h)
    spara(np.dstack([col, alfa * c * 255]).clip(0, 255).astype(np.uint8), namn)

# 8. mått till riggen
tak_under = int(np.median([np.nonzero(F[:TAK_Y, x])[0].max() for x in range(300, 600, 10)]))
avgas = F & (xx > xr) & (yy < botten[xr] - 40) & ~gron
ay, ax = np.nonzero(avgas)
topp = ay.min(); avgas_x = float(ax[ay < topp + 6].mean())
sx = int(xs[np.argmax(botten[xs])])  # sätets djupaste punkt
rigg = dict(
    _anm="Klippt ur traktor-gron-v2.jpg (1024x1024, Sannas Flow-redigering 2026-11-26 med brett lagt sate och ingen ratt).",
    canvas=dict(w=W, h=H),
    kant_px=KANT,
    lager=["traktor-bak", "figur", "traktor-fram", "hjul-bak", "hjul-fram"],
    filer=dict(hel="traktor-gron-v2.png", bak="traktor-bak.png", fram="traktor-fram.png", hjulBak="hjul-bak.png",
               hjulFram="hjul-fram.png"),
    hjulBak=dict(cx=round(bak_h["cx"], 1), cy=round(bak_h["cy"], 1), r=round(bak_h["r"] + 1.5, 1)),
    hjulFram=dict(cx=round(fram_h["cx"], 1), cy=round(fram_h["cy"], 1), r=round(fram_h["r"] + 1.5, 1)),
    sits=dict(x=sx, y=int(botten[sx]) - 10),
    karKantNederst=dict(xl=int(xl), xr=int(xr), y_vid_sits=int(botten[sx])),
    avgasToppen=dict(x=round(avgas_x, 1), y=int(topp)),
    takUndersidaY=tak_under,
    vankning="traktorn vetter at hoger (huv och avgasror at hoger)",
)
json.dump(rigg, open(os.path.join(HER, "..", "traktor-gron-v2-rigg.json"), "w"), indent=2, ensure_ascii=False)
