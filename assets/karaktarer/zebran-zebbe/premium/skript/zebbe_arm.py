# Zebbes armar: ritade runda stumpar (som Nickes), krämkrita med konstens grå kontur och en mörk klöv i spetsen.
# Kör med den värmda faceless-bilden som argument 2 (se varm.py), sedan tunn_kant 10 på arm-l/-r och varm.py -1 på alla fyra.
# Rot r 22 inne i kroppen, hand r 29, 85 px från vridpunkten, 50° under vågrätt. Skriver arm-l/-r och -fram (kanten och
# konturen tonade mot roten, så att armen växer ur magen när den ligger framför kroppen). Kör tunn_kant 10 efteråt
# på de vanliga (inte -fram, där görs kanten här).
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
mapp = sys.argv[1]
rigg = json.load(open(f'{mapp}/zebbe-rigg.json'))
fl = np.asarray(Image.open(sys.argv[2] if len(sys.argv) > 2 else f'{mapp}/cut/zebbe-faceless.png').convert('RGB')).astype(float)
def kakel(x, y, s=96):
    r = fl[y:y + s, x:x + s]; r = np.concatenate([r, r[::-1]], 0); r = np.concatenate([r, r[:, ::-1]], 1)
    return np.tile(r, (1024 // (2 * s) + 1, 1024 // (2 * s) + 1, 1))[:1024, :1024]
# svart ruta: mitten av den största helt svarta biten
mork = (fl.max(2) < 90)
d = ndimage.distance_transform_edt(ndimage.binary_opening(mork, iterations=2))
my, mx = np.unravel_index(d.argmax(), d.shape); s = int(min(64, d.max() * 1.3))
svart = kakel(mx - s // 2, my - s // 2, s)
gradde = kakel(464, 610)
KONTUR = np.array([197., 178., 160.])
yy, xx = np.mgrid[:1024, :1024]
for n, sx in [('arm-l', -1), ('arm-r', 1)]:
    p = np.array(rigg['delar'][n]['vridpunkt'], float)
    v = np.radians(50); u = np.array([sx * np.cos(v), np.sin(v)])
    a, b = p - u * 45, p + u * 85
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    rad = 22 + 7 * t
    dist = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1]))
    f = dist <= rad
    # längs armen räknat från roten (0) till handens spets (1), för klöven och tonningen
    tl = ((xx - a[0]) * u[0] + (yy - a[1]) * u[1]) / (130 + 29)
    rgb = gradde.copy()
    kant = dist > rad - 7
    rgb[kant] = KONTUR
    klov = tl > 0.80
    rgb[klov] = svart[klov]
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = rgb.clip(0, 255); img[f, 3] = 255
    Image.fromarray(img).save(f'{mapp}/cut/zebbe-{n}.png')
    # -fram (framför kroppen, klappen och magen): börjar vid vridpunkten, utan dold rot bakom den, annars sticker axeln ut
    # förbi kroppens kant när armen pekar ner-in. Konturen och den vita kanten tonas på en kort sträcka (en lång tonad kant
    # gav grå ränder över de svarta fläckarna, Sanna 2026-11-09): konturen längs hela stumpen utom närmast roten (annars syns krämarmen inte mot krämmagen), vit kant på de yttre två tredjedelarna.
    a2 = p.copy()
    t2 = np.clip(((xx - a2[0]) * (b - a2)[0] + (yy - a2[1]) * (b - a2)[1]) / ((b - a2) @ (b - a2)), 0, 1)
    rad2 = 22 + 7 * t2
    dist2 = np.hypot(xx - (a2[0] + t2 * (b - a2)[0]), yy - (a2[1] + t2 * (b - a2)[1]))
    f2 = dist2 <= rad2
    tf = ((xx - a2[0]) * u[0] + (yy - a2[1]) * u[1]) / (85 + 29)    # 0 vid vridpunkten, 1 vid handens spets
    k = np.clip((tf - 0.04) / 0.14, 0, 1)
    ut = gradde.copy()
    kant2 = dist2 > rad2 - 7
    ut = np.where(kant2[..., None], gradde * (1 - k[..., None]) + KONTUR * k[..., None], ut)
    ut[klov] = svart[klov]
    img = np.zeros((1024, 1024, 4), np.uint8); img[..., :3] = ut.clip(0, 255); img[f2, 3] = 255
    namn = f'{mapp}/cut/zebbe-{n}-fram.png'
    Image.fromarray(img).save(namn)
    sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
    c, al = tunn_kant.ny_alfa(np.asarray(Image.open(namn).convert('RGBA')), 10)
    al = np.where((al > 0) & ~f2, al * np.clip((tf - 0.28) / 0.12, 0, 1), al)
    Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(namn)
    print(n, 'klar', p)
