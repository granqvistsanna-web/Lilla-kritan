# Armar för den riktiga klappen (händerna möts framför magen): -fram-kopian med HELA roten tonad i alfa
# (alfa × clip((t − T0) / (T1 − T0)), t = 0 vid vridpunkten, 1 vid spetsen), så att bara handen syns och armen
# växer ut ur kroppen också där den ligger över den ljusa magen eller ögonskivorna (som Olles -fram, art-direction-v2).
# Skriver cut/<namn>-arm-l-klapp.png och -arm-r-klapp.png. Generisk:
# Från repots rot: python3 verktyg/klapparm.py assets/karaktarer/<mapp>/premium <namn>
# (t.ex. python3 verktyg/klapparm.py assets/karaktarer/ugglan-ulla/premium ulla). Skriver ut armens längd L och axel.
# Valfritt tredje argument: mörkhet, t.ex. 0.78. Kritan i armen (inte den vita kanten) blir så mycket mörkare, så att
# händerna syns när armen har samma färg som kroppen (Sanna 2026-11-10: "darker tint").
import json, sys
import numpy as np
from PIL import Image
T0, T1 = (float(sys.argv[4]), float(sys.argv[5])) if len(sys.argv) > 5 else (0.12, 0.32)   # Olle: 0.62 0.8 (lång röd ärm mot röd tröja, bara handen ska synas)
mapp, namn = sys.argv[1], sys.argv[2]
MORK = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
rigg = json.load(open(f'{mapp}/{namn}-rigg.json'))
yy, xx = np.mgrid[:1024, :1024]
for s in 'lr':
    p = np.array(rigg['delar'][f'arm-{s}']['vridpunkt'], float)
    img = np.array(Image.open(f'{mapp}/cut/{namn}-arm-{s}-fram.png').convert('RGBA')).astype(float)
    ys, xs = np.nonzero(img[..., 3] > 128)
    d = np.hypot(xs - p[0], ys - p[1]); far = d > d.max() * 0.6
    u = np.array([(xs[far] - p[0]).mean(), (ys[far] - p[1]).mean()]); u /= np.hypot(*u)
    t = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / d.max()
    if MORK != 1.0:
        krita = img[..., :3].min(axis=2) < 225          # allt utom den vita kanten
        rgb = img[krita, :3]
        grå = rgb.mean(axis=1, keepdims=True)
        rgb = grå + (rgb - grå) * (1 + 1.6 * (1 - MORK))     # mättare, så att gult och rosa inte blir grått
        img[krita, :3] = np.clip(rgb * MORK, 0, 255)
    img[..., 3] *= np.clip((t - T0) / (T1 - T0), 0, 1)
    Image.fromarray(img.round().astype(np.uint8)).save(f'{mapp}/cut/{namn}-arm-{s}-klapp.png')
    print(namn, s, 'L', round(d.max()), 'axel', u.round(3))
