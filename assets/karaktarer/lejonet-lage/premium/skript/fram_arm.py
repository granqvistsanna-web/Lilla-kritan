# -fram-armar för ritade armar (rita-lemmar.py) som saknar dem: samma arm, men den vita kanten tonas bort mot roten
# (alfa × clip((t − 0,45) / 0,35), t = 0 vid vridpunkten, 1 vid spetsen, lk-figur "Arms in front of the body") och den dolda
# roten bakom vridpunkten tas bort. Indata till verktyg/klapparm.py (den riktiga klappen). Riggen själv använder dem inte.
# python3 skript/fram_arm.py <premium-mapp> <namn>   (Lage: . lage, Kanel: ../../kaninen-kanel/premium kanel)
import json, sys
import numpy as np
from PIL import Image, ImageFilter
mapp, namn = sys.argv[1], sys.argv[2]
rigg = json.load(open(f'{mapp}/{namn}-rigg.json'))
yy, xx = np.mgrid[:1024, :1024]
for s in 'lr':
    p = np.array(rigg['delar'][f'arm-{s}']['vridpunkt'], float)
    img = np.array(Image.open(f'{mapp}/cut/{namn}-arm-{s}.png').convert('RGBA')).astype(float)
    ys, xs = np.nonzero(img[..., 3] > 128)
    d = np.hypot(xs - p[0], ys - p[1]); far = d > d.max() * 0.6
    u = np.array([(xs[far] - p[0]).mean(), (ys[far] - p[1]).mean()]); u /= np.hypot(*u)
    t = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / d.max()
    vit = np.clip((img[..., :3].min(2) - 190) / 45, 0, 1)            # den vita kanten (1) och dess övergång
    inne = np.array(Image.fromarray(img[..., 3].astype(np.uint8)).filter(ImageFilter.MinFilter(31))) > 128
    vit[inne] = 0                     # inte de vita kritkornen inne i armen (mer än 15 px från konturen)
    k = np.clip((t - 0.45) / 0.35, 0, 1)
    img[..., 3] *= (1 - vit * (1 - k)) * (t >= 0)
    Image.fromarray(img.round().astype(np.uint8)).save(f'{mapp}/cut/{namn}-arm-{s}-fram.png')
    print(namn, s, 'L', round(d.max()), 'vinkel', round(np.degrees(np.arctan2(u[1], u[0])), 1))
