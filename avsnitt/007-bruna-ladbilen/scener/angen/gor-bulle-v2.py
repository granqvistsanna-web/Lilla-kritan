# Kanelbullen i art direction v2 (Sanna 2026-11-08): lägger cut/kanelbulle-v3.png (egen kant) i v1-bullens 1024-ruta
# (samma mitt och höjd, så att BC/BH i index.html gäller) och skär ur den tre bitar med sicksackkanter och vit kant
# (bilder/bit-0/1/2.png, ersätter bitarna ur kanelbulle-bitar-v1.png). Skriver ut bitarnas mitt (BITC).
#   ~/.claude/skills/ai-video/.venv/bin/python -I angen/gor-bulle-v2.py
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
A = HAR.parents[3] / 'assets/rekvisita/kanelbulle/cut'
bulle = Image.open(A / 'kanelbulle-v3.png').convert('RGBA')
s = 784 / bulle.height                                  # v1-bullens höjd i rutan (bbox 129–913), mitt (510, 521)
bulle = bulle.resize((round(bulle.width * s), round(bulle.height * s)), Image.LANCZOS)
ruta = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
ruta.paste(bulle, (510 - bulle.width // 2, 521 - bulle.height // 2), bulle)
ruta.save(A / 'kanelbulle-v3-ruta.png')

px = np.array(ruta)
alfa = px[..., 3] > 128
ys, xs = np.mgrid[0:1024, 0:1024]
sick = lambda y, fas: 22 * np.abs(((y + fas) / 46) % 2 - 1)   # sicksack, 46 px per tand
grans = [394 + sick(ys, 0), 628 + sick(ys, 23)]
delar = [xs < grans[0], (xs >= grans[0]) & (xs < grans[1]), xs >= grans[1]]
KANT = 9
for i, d in enumerate(delar):
    m = alfa & ndimage.binary_erosion(d, iterations=4)          # en smal springa mellan bitarna
    vit = ndimage.binary_dilation(m, iterations=KANT) & ~m & ndimage.binary_dilation(alfa, iterations=2)
    ut = np.zeros_like(px)
    ut[vit] = [255, 255, 255, 255]
    ut[m] = px[m]
    ut[m, 3] = 255
    Image.fromarray(ut).save(HAR / f'bilder/bit-{i}.png')
    cy, cx = ndimage.center_of_mass(m)
    print(f'bit-{i}: mitt [{cx:.0f}, {cy:.0f}]')
