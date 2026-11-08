# Lastbilen i art direction v2 (Sanna 2026-11-08, skiss): assets/rekvisita/lastbil-brun/cut/lastbil-brun-v6.png (v6b urklippt med
# egen_kant.py, kanten finns i bilden) i samma 1024-ruta som gamla lastbil.png (nu lager/lastbil-v1.png): hjulens underkant y 824,
# mitt x 515, bredd 1150 (sticker ut utanför rutan i x, det gör inget i svg:n). Konstens lilla ratt tas bort (Bulle har kodratten framför bröstet).
#   ~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lastbil-v2.py
from pathlib import Path
import numpy as np
from PIL import Image
HAR = Path(__file__).resolve().parent
im = Image.open(HAR.parents[3] / 'assets/rekvisita/lastbil-brun/cut/lastbil-brun-v6.png').convert('RGBA')
a = np.array(im)
yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]
a[..., 3][(xx > 478) & (xx < 600) & (yy < 150 - (xx - 478) * 0.42)] = 0   # ratten och ratstången ovanför huven
X0, X1, BOTTEN, W = 2, 778, 484, 1150   # Sanna: "make truck large"
k = W / (X1 - X0)
im = Image.fromarray(a).resize((round(a.shape[1] * k), round(a.shape[0] * k)), Image.LANCZOS)
OX = 150   # duken är 150 px bredare på var sida (lastbilen.js: LASTBIL_OX)
ut = Image.new("RGBA", (1024 + 2 * OX, 1024)); ut.alpha_composite(im, (OX + round(515 - (X0 + X1) / 2 * k), round(824 - BOTTEN * k)))
ut.save(HAR / 'lastbil.png')
P = lambda X, Y: [round(515 + (X - (X0 + X1) / 2) * k, 1), round(824 + (Y - BOTTEN) * k, 1)]
print('k', round(k, 3), 'hjul', P(183.5, 395), P(582.5, 395), 'R', round(89.5 * k, 1), 'sate', P(470, 175), 'panel', P(0, 185), 'huv x', P(548, 0), 'flak', P(20, 120), P(330, 180), 'topp', P(0, 5))
