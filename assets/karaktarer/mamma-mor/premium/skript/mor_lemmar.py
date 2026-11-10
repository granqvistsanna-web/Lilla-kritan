# Mors armar och ben, ritade (som Zebbes): konstens lemmar blev efter langre_rot.py tjocka pinnar med vita sömmar,
# så de ritas om i konstens mått med persikokrita ur ansiktet och brun krita ur håret.
#  - armen: EN rund stump i ett stycke (Sanna: inga böjda kodarmar), smal underarm r 17 som börjar 60 px in bakom
#    ärmen och en rund hand r 29, 56 px från vridpunkten, 46° under vågrätt (som konsten)
#  - benet: persika, 48 → 44 px brett, rot 80 px upp under klänningen, en brun sko (ellips) som pekar lite utåt
#  - arm-*-fram: samma arm utan den dolda roten, den vita kanten och roten tonas mot vridpunkten (Olle: hela roten
#    tonas, annars syns den som ett ljusare band på magen)
# Kör från premium/:  python3 skript/mor_lemmar.py   (sedan tunn_kant.py på arm-l/-r och leg-l/-r, inte -fram)
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '../../../../verktyg'); import tunn_kant
KANT = float(sys.argv[1]) if len(sys.argv) > 1 else 7.4
fl = np.asarray(Image.open('original/mor-faceless.jpg').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
persika = kakel(464, 330)          # ren bit mitt i det tomma ansiktet
# skon: konstens skofärg med persikans kritkorn (håret gav ett mönster av hårstrån)
sko_rgb = fl[905:928, 415:455].reshape(-1, 3); sko_rgb = sko_rgb[sko_rgb.max(1) < 150].mean(0)
brun = sko_rgb + (persika - persika.mean((0, 1))) * 0.6
rigg = json.load(open('mor-rigg.json'))
yy, xx = np.mgrid[:1024, :1024].astype(float)
def spara(namn, rgb, mask):
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[mask, 3] = 255
    Image.fromarray(img).save(f'cut/mor-{namn}.png')
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    v = np.radians(46); u = np.array([sx * np.cos(v), np.sin(v)])
    hand = p + u * 56
    def stump(a):
        t = np.clip(((xx - a[0]) * (hand - a)[0] + (yy - a[1]) * (hand - a)[1]) / ((hand - a) @ (hand - a)), 0, 1)
        d = np.hypot(xx - (a[0] + t * (hand - a)[0]), yy - (a[1] + t * (hand - a)[1]))
        return (d <= 17) | (np.hypot(xx - hand[0], yy - hand[1]) <= 29)
    spara(n, persika, stump(p - u * 60))
    # framför kroppen: börjar vid vridpunkten; kant och rot tonas (alfa × clip((t − 0.1) / 0.25), t 0 vid leden, 1 vid handens spets)
    f2 = stump(p)
    spara(n + '-fram', persika, f2)
    namn = f'cut/mor-{n}-fram.png'
    c, al = tunn_kant.ny_alfa(np.asarray(Image.open(namn).convert('RGBA')), KANT)
    tf = ((xx - p[0]) * u[0] + (yy - p[1]) * u[1]) / (56 + 29)
    al = al * np.clip((tf - 0.1) / 0.25, 0, 1)   # korta armar: bara roten närmast leden tonas (Olles 0,3 åt upp hela underarmen)
    Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(namn)
    print(n, 'vridpunkt', p.tolist(), 'hand', hand.round().tolist())
for n, ut in [('leg-l', -1), ('leg-r', 1)]:
    cx, py = rigg['delar'][n]['vridpunkt']
    top, bot = py - 80, 912
    w = 24 - 2 * np.clip((yy - top) / (bot - top), 0, 1)
    ben = (np.abs(xx - cx) <= w) & (yy >= top + 24) & (yy <= bot)
    ben |= np.hypot(xx - cx, yy - (top + 24)) <= 24
    sko = ((xx - (cx + 7 * ut)) / 34) ** 2 + ((yy - 917) / 18) ** 2 <= 1
    sko &= yy >= 897                                   # platt ovansida mot benet, som konstens sko
    sko |= ((xx - (cx + 7 * ut)) / 34) ** 2 + ((yy - 917) / 18) ** 2 <= 1
    rgb = persika.copy(); rgb[sko] = brun[sko]
    spara(n, rgb, ben | sko)
    print(n, 'vridpunkt', [cx, py], 'sko botten', 935)
