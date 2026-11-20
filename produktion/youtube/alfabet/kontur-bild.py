"""Konturen som kritan ritar i Kritans ABC (recept 3), spårad ur färgytan i en bild med vit klistermärkskant:
  python3 produktion/youtube/alfabet/kontur-bild.py <bild.png|jpg> <ut-kontur.json> [--max 60]
Bilden får ha genomskinlig eller vit bakgrund. Det vita (kanten och bakgrunden) räknas bort, så att linjen följer färgytans
kant, och sedan gör verktyg/kontur.py banan (ett drag, medurs från toppen, i bildens egna pixlar)."""
import sys, subprocess, tempfile, os
import numpy as np
from PIL import Image
src, ut, *mer = sys.argv[1:]
a = np.array(Image.open(src).convert('RGBA')).astype(int)
farg = (a[..., 3] > 128) & (a[..., :3].min(axis=2) < 236)   # inte genomskinligt och inte vitt
tmp = os.path.join(tempfile.mkdtemp(), 'yta.png')
Image.fromarray(np.dstack([a[..., :3], farg * 255]).astype('uint8'), 'RGBA').save(tmp)
subprocess.run(['python3', 'verktyg/kontur.py', tmp, ut, '--krymp', '3', *mer], check=True)
