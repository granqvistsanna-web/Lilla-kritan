#!/usr/bin/env python3
"""Mottagningen i delar (046, Sanna 2026-11-20: "make bunny larger and room bigger bench lower, need to work more on composition").

Ur assets/bakgrunder/mottagningen/mottagningen-v2.jpg (1376×768):
  mottagningen-tom.png   rummet utan brits, pall och lampa, och STÖRRE: väggen och golvet förlängs åt alla håll (upprepas),
                         så att kameran ser mer av rummet och figurerna blir större i förhållande till det.
  cut/brits.png          britsen med lampan och pallen (de hänger ihop i bilden), öppningen under britsen genomskinlig
Väggen, golvlisten och golvet är släta, så det tomma rummet fylls rad för rad med samma rads tomma högra del
(x 900–1376), mjukt ihopblandat i kanterna. Måtten skrivs till mottagningen-delar.json.

  python3 verktyg/mottagning_delar.py
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

MAPP = Path(__file__).resolve().parent.parent / 'assets/bakgrunder/mottagningen'
src = np.asarray(Image.open(MAPP / 'mottagningen-v2.jpg').convert('RGB')).astype(float)
H, W, _ = src.shape

# 1. Det tomma rummet: rektangeln med sakerna ersätts av samma rader ur den tomma högra delen (tiling i x).
X0, X1, Y0, Y1, TOM = 140, 905, 120, 700, 900
tom = src.copy()
bredd = W - TOM
for x in range(X0, X1):
    sx = TOM + (x - X0) % bredd
    tom[Y0:Y1, x] = src[Y0:Y1, sx]
# mjuk kant (12 px) mot originalet runt rektangeln
mask = np.zeros((H, W)); mask[Y0:Y1, X0:X1] = 1
mask = ndimage.gaussian_filter(mask, 6)
tom = src * (1 - mask[..., None]) + tom * mask[..., None]

# 2. Sakerna: det som skiljer originalet från det tomma rummet. Britsen (med lampan) och pallen är de två största bitarna.
diff = np.abs(src - tom).max(2) > 28
diff[:, :X0 - 4] = diff[:, X1 + 4:] = False
diff = ndimage.binary_closing(diff, iterations=3)
# bara små hål fylls (i dynan och pallen); öppningen under britsen är vägg och ska vara genomskinlig
hal = ndimage.binary_fill_holes(diff) & ~diff
hl, hn = ndimage.label(hal)
if hn: diff |= np.isin(hl, 1 + np.nonzero(ndimage.sum(hal, hl, range(1, hn + 1)) < 1500)[0])
diff = ndimage.binary_opening(diff, iterations=1)
# Under dynan (golvlisten och golvet, y ≥ 505) bara benen och pallen, inte skuggan och golvlistens skarvar.
ben = np.nonzero(diff[465:500].mean(0) > 0.6)[0]                 # benen syns som grå streck mot väggen
benkol = np.zeros(W, bool)
for x in ben: benkol[max(0, x - 2):x + 3] = True
PALL = (slice(530, 672), slice(228, 440))                      # pallen (britsen.png: x 80–275, y 405–536 + utklippets hörn)
pall = np.zeros((H, W), bool); pall[PALL] = ndimage.binary_fill_holes(ndimage.binary_closing(np.abs(src - tom).max(2)[PALL] > 14, iterations=4))
pall = ndimage.binary_opening(pall, iterations=2)
under = np.zeros((H, W), bool); under[505:] = True
stark = np.abs(src - tom).max(2) > 35
diff = (diff & ~under) | (stark & under & ndimage.binary_dilation(benkol[None, :] & stark, iterations=2)) | pall
lab, n = ndimage.label(diff)
storlek = ndimage.sum(diff, lab, range(1, n + 1))
bitar = sorted((1 + np.argsort(storlek)[::-1][:2]).tolist(), key=lambda k: np.nonzero(lab == k)[0].min())   # britsen (högst upp) först
(MAPP / 'cut').mkdir(exist_ok=True)
matt = {}
for namn, k in zip(['brits'], bitar):   # britsen, lampan och pallen hänger ihop: en bit
    m = lab == k
    ys, xs = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    img = np.zeros((y1 - y0, x1 - x0, 4), np.uint8)
    img[..., :3] = src[y0:y1, x0:x1].clip(0, 255)
    a = ndimage.gaussian_filter(m[y0:y1, x0:x1].astype(float), 0.8)
    img[..., 3] = (a.clip(0, 1) * 255).astype(np.uint8)
    bla = (img[..., 2] > 170) & (img[..., 0] < 120)            # väggens blå i kanten runt benen och ramen
    img[bla, 3] = 0
    Image.fromarray(img).save(MAPP / 'cut' / f'{namn}.png')
    matt[namn] = {'x': int(x0), 'y': int(y0), 'w': int(x1 - x0), 'h': int(y1 - y0)}

# 3. Större rum: väggen och golvet upprepas (förskjutna, inte speglade: spegling ger synliga kalejdoskopmönster i kornet).
UPP, NER, SID = 140, 150, 250
# Varje utfyllnad är en förskjuten kopia av bildens egen kant, och skarven tonas över T px.
T = 60
def forlang(a, ut, axel, fore):
    n = a.shape[axel]; kopia = np.take(a, range(0, ut + T) if fore else range(n - ut - T, n), axis=axel)
    vikt = np.linspace(0, 1, T); vikt = vikt if fore else vikt[::-1]
    form = [1, 1, 1]; form[axel] = T; vikt = vikt.reshape(form)
    if fore:   # kopian ligger före bilden; dess sista T rader tonas in i bildens första T
        mitt = np.take(kopia, range(ut, ut + T), axis=axel) * (1 - vikt) + np.take(a, range(T), axis=axel) * vikt
        return np.concatenate([np.take(kopia, range(ut), axis=axel), mitt, np.take(a, range(T, n), axis=axel)], axis=axel)
    mitt = np.take(a, range(n - T, n), axis=axel) * vikt + np.take(kopia, range(T), axis=axel) * (1 - vikt)
    return np.concatenate([np.take(a, range(n - T), axis=axel), mitt, np.take(kopia, range(T, ut + T), axis=axel)], axis=axel)
stor = forlang(forlang(tom, SID, 1, True), SID, 1, False)
stor = forlang(forlang(stor, UPP, 0, True), NER, 0, False)
Image.fromarray(stor.clip(0, 255).astype(np.uint8)).save(MAPP / 'mottagningen-tom.png')
matt['tom'] = {'w': stor.shape[1], 'h': stor.shape[0], 'utfyllnad': {'upp': UPP, 'ner': NER, 'sida': SID},
               'golvlist': [520 + UPP, 545 + UPP]}
(MAPP / 'mottagningen-delar.json').write_text(json.dumps(matt, indent=2, ensure_ascii=False) + '\n')
print(json.dumps(matt, ensure_ascii=False))
