# Dansglassarna för 019 (Sanna 2026-11-09: "create new icecream assets", "a tiny bit more glossy still subtle crayon", "redo the ice creams",
# "add space for happy faces on the icecream (animated in claude code)").
# Ur original/dans/*.jpg (Google Flow, andra omgången: glans i bilden, slät yta mitt på kulan för ansiktet som ritas i scenen).
# Klipps ut med verktyg/egen_kant.py; vit kant i kod där Flow inte ritade någon. Första omgången ligger i original/dans/forsta/.
# Kör: ~/.claude/skills/ai-video/.venv/bin/python -I gor-dans.py
import subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
ROT = HAR.parents[2]
GLASS = ['jordgubb', 'hallon', 'korsbar', 'hjarta']
KANT = {'jordgubb': 16}   # px vit kant i kod (Flow ritade ingen)

def kant(im, px):
    P = px + 2
    c = Image.new('RGBA', (im.width + 2 * P, im.height + 2 * P)); c.alpha_composite(im, (P, P))
    a = np.asarray(c)[..., 3] > 128
    w = np.zeros((*a.shape, 4), np.uint8); w[ndimage.binary_dilation(a, iterations=px)] = 255
    ut = Image.fromarray(w); ut.alpha_composite(c); return ut

for n in GLASS:
    src, ut = HAR / f'original/dans/glass-{n}.jpg', HAR / f'cut/glass-{n}.png'
    if not src.exists(): print('saknas', src.name); continue
    subprocess.run([sys.executable, '-I', str(ROT / 'verktyg/egen_kant.py'), str(src), str(ut)], check=True)
    if n in KANT: kant(Image.open(ut).convert('RGBA'), KANT[n]).save(ut)
    print(n, Image.open(ut).size)
