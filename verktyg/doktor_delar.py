#!/usr/bin/env python3
"""Delar till en människofigur med eget huvud på hals (doktorerna i Besöket, 046).

Konsten är tre pixeljusterade Flow-bilder: <namn>-faceless.jpg, <namn>-utan-lemmar.jpg (samma utan armar och ben)
och <namn>-forsta.jpg (med ansikte, för mätningen). Armarna och benen är det som skiljer faceless från utan-lemmar.
Huvudet klipps loss vid halsens smalaste rad, så att det kan nicka och luta. Halsen följer kroppen och fortsätter
HALS px upp under huvudet, så att ingen glipa syns när huvudet rör sig. Huvudets underkant tonas mot halsen.

  python3 verktyg/doktor_delar.py assets/karaktarer/doktorn-a/premium doktorn-a
Skriver cut/<namn>-{body,head,arm-l,arm-r,leg-l,leg-r}.png (1024², egen vit kant) och <namn>-rigg.json.
Lång rot och vit kant görs här. Kör sedan klapparm.py (se karaktarer/doktorn-*.md).
"""
import json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, str(Path(__file__).parent)); from egen_kant import kant_mask

mapp, namn = Path(sys.argv[1]), sys.argv[2]
HALS, TONA = 60, 14
SKALA = 0.544                    # vuxen som Mor: kroppen 905 px × 0,544 = 492 px = 1,4 × Olle
RING = round(5 / SKALA)          # vita kanten 5 px i scenen (art-direction-v2), 9 px i filerna
las = lambda s: np.asarray(Image.open(mapp / 'original' / f'{namn}-{s}.jpg').convert('RGB')).astype(int)
F, U = las('faceless'), las('utan-lemmar')
mF, mU = kant_mask(F.astype(np.uint8)), kant_mask(U.astype(np.uint8))
krita = lambda a: a.min(2) < 236                     # färg, inte den vita kanten
yy, xx = np.mgrid[:1024, :1024]

# Lemmarna: kritfärg i faceless där utan-lemmar är bakgrund eller ser annorlunda ut.
lem0 = krita(F) & ((np.abs(F - U).max(2) > 12) | ~mU)
# Rocken är lite bredare med armarna (Flow ritar om den): de smala remsorna längs rockens sidor kopplar ihop armar
# och ben. En kraftig öppning bryter dem, sedan växer delarna tillbaka inom lem0.
lem = ndimage.binary_opening(lem0, iterations=9)
lem = ndimage.binary_dilation(lem, iterations=9) & lem0
lab, n = ndimage.label(lem)
storlek = ndimage.sum(lem, lab, range(1, n + 1))
fyra = 1 + np.argsort(storlek)[::-1][:4]
delar = {}
fall = np.nonzero(mU.any(1))[0].max()                  # rockens fåll
for k in fyra:
    m = ndimage.binary_fill_holes(lab == k); ys, xs = np.nonzero(m)
    cy, cx = ys.mean(), xs.mean()
    sort = ('leg-' if cy > 780 else 'arm-') + ('l' if cx < 512 else 'r')
    if sort.startswith('leg'):
        # Benen: hela silhuetten under fållen på den sidan (vita skor försvinner annars med den vita kanten).
        sida = (xx < 512) if sort == 'leg-l' else (xx >= 512)
        m = mF & sida & (yy > fall - 30) & ~ndimage.binary_dilation(mU, iterations=3)
        m = ndimage.binary_opening(m, iterations=3)
        l2, n2 = ndimage.label(m); m = l2 == 1 + np.argmax(ndimage.sum(m, l2, range(1, n2 + 1)))
    delar[sort] = m
assert sorted(delar) == ['arm-l', 'arm-r', 'leg-l', 'leg-r'], sorted(delar)

kropp = krita(U) & mU
kropp = ndimage.binary_fill_holes(ndimage.binary_closing(kropp, iterations=2))
# Halsen: smalaste raden mellan hakan och axlarna (mitten av kroppen, y 280–420).
bredd = kropp[:, 380:644].sum(1)
rader = np.arange(300, 420)
hals_y = int(rader[np.argmin(bredd[rader])])
hx = np.nonzero(kropp[hals_y, 380:644])[0] + 380
hals_x0, hals_x1 = int(hx.min()), int(hx.max())
huvud = kropp & (yy < hals_y + TONA)
huvud = ndimage.binary_opening(huvud, iterations=2)
lab, n = ndimage.label(huvud); huvud = lab == 1 + np.argmax(ndimage.sum(huvud, lab, range(1, n + 1)))
# Kroppen: allt under halsraden, plus halsen förlängd HALS px uppåt i halsens egen färg.
hals_rgb = np.median(U[hals_y + 4:hals_y + 12, hals_x0 + 6:hals_x1 - 5].reshape(-1, 3), 0)
kropp_d = kropp & (yy >= hals_y)
lab, n = ndimage.label(kropp_d)                         # hårtopparna under halsraden (B:s page) hör till huvudet
kropp_d = lab == 1 + np.argmax(ndimage.sum(kropp_d, lab, range(1, n + 1)))
forl = (yy >= hals_y - HALS) & (yy < hals_y) & (xx >= hals_x0) & (xx <= hals_x1)

def spara(fil, rgb, mask, alfa=None):
    ring = ndimage.distance_transform_edt(~mask) <= RING
    img = np.zeros((1024, 1024, 4), np.uint8)
    img[ring, :3] = 255; img[ring, 3] = 255
    img[mask, :3] = rgb[mask].clip(0, 255); img[mask, 3] = 255
    if alfa is not None: img[..., 3] = (img[..., 3] * alfa).astype(np.uint8)
    Image.fromarray(img).save(mapp / 'cut' / f'{namn}-{fil}.png')

(mapp / 'cut').mkdir(exist_ok=True)

def axel(m):
    ys, xs = np.nonzero(m); c = np.array([xs.mean(), ys.mean()])
    v = np.linalg.svd(np.c_[xs - c[0], ys - c[1]], full_matrices=False)[2][0]
    return c, v

def rot(m, rgb, p, u, L=80):
    """Lång rot (som langre_rot.py, men vita skor och ärmar får vara kvar): en kapsel från leden L px in bakom
    kroppen längs u, i delens egen färg (närmaste pixel en bit in i delen)."""
    r = max(14.0, ndimage.distance_transform_edt(m)[np.hypot(xx - p[0], yy - p[1]) < 50].max())
    a, b = p - u * r, p + u * L
    t = np.clip(((xx - a[0]) * (b - a)[0] + (yy - a[1]) * (b - a)[1]) / ((b - a) @ (b - a)), 0, 1)
    kapsel = np.hypot(xx - (a[0] + t * (b - a)[0]), yy - (a[1] + t * (b - a)[1])) <= r * (1 - 0.1 * t)
    kalla = ndimage.binary_erosion(m, iterations=6); kalla = kalla if kalla.sum() > 200 else m
    _, (iy, ix) = ndimage.distance_transform_edt(~kalla, return_indices=True)
    kapsel &= ndimage.binary_erosion(kropp_d | forl, iterations=4)   # roten bara där kroppen täcker den i vila
    ny = m | kapsel; ut = rgb.copy(); ut[kapsel & ~m] = rgb[iy, ix][kapsel & ~m]
    return ny, ut

leder = {}
for d, m in list(delar.items()):
    if d.startswith('arm'):
        c, v = axel(m); kropp_c = np.array([512, 600])
        u = v if v @ (kropp_c - c) > 0 else -v          # längs armen, in mot kroppen
        ys, xs = np.nonzero(m); proj = (xs - c[0]) * u[0] + (ys - c[1]) * u[1]
        p = c + u * (proj.max() - 30)                   # leden: 30 px in från armens ände vid axeln
        u = np.array([512.0, 600.0]) - p; u /= np.hypot(*u)   # roten in mot bröstet, inte längs armen (då sticker den upp över axeln)
    else:
        ys, xs = np.nonzero(m); p = np.array([xs.mean(), ys.min() + 12.0]); u = np.array([0.0, -1.0])
    leder[d] = [int(p[0]), int(p[1])]
    if d.startswith('arm'):
        # -fram: armen framför kroppen (klappen, händerna på magen): ingen dold rot, och kanten och roten närmast leden tonas,
        # så att armen växer ut ur rocken i stället för att sväva framför den (som Mors). klapparm.py gör -klapp av den.
        ys, xs = np.nonzero(m); L = np.hypot(xs - p[0], ys - p[1]).max()
        w = c - p; w /= np.hypot(*w)                   # längs armen, ut från leden
        t = ((xx - p[0]) * w[0] + (yy - p[1]) * w[1]) / L
        img = np.zeros((1024, 1024, 4), np.uint8); ring = (ndimage.distance_transform_edt(~m) <= RING)
        img[ring, :3] = 255; img[ring, 3] = 255; img[m, :3] = F[m]; img[m, 3] = 255
        img[..., 3] = (img[..., 3] * np.clip((t - 0.1) / 0.25, 0, 1)).astype(np.uint8)
        Image.fromarray(img).save(mapp / 'cut' / f'{namn}-{d}-fram.png')
    delar[d] = rot(m, F, p, u)
rgbK = U.copy(); rgbK[forl] = hals_rgb
# Kroppens kant bara där den inte ligger under huvudet (överkanten av den förlängda halsen döljs av huvudet ändå).
spara('body', rgbK, kropp_d | forl)
ton = np.clip((hals_y + TONA - yy) / TONA, 0, 1)        # huvudets underkant tonas mot halsen
ton[yy < hals_y] = 1
hm = huvud.copy()
img = np.zeros((1024, 1024, 4), np.uint8)
ring = (ndimage.distance_transform_edt(~hm) <= RING) & ~kropp            # ingen vit kant runt hakan över halsen
img[ring, :3] = 255; img[ring, 3] = 255
img[hm, :3] = U[hm]; img[hm, 3] = 255
img[..., 3] = (img[..., 3] * ton).astype(np.uint8)
Image.fromarray(img).save(mapp / 'cut' / f'{namn}-head.png')
for d, (m, rgb) in delar.items(): spara(d, rgb, m)

# Vridpunkter: armen vid axeln (armens översta punkt mot kroppen), benet vid fållen mitt i benet.
rigg = {'storlek': 1024, 'kropp': f'cut/{namn}-body.png', 'hals': [int((hals_x0 + hals_x1) / 2), hals_y], 'delar': {}}
for d in delar: rigg['delar'][d] = {'fil': f'cut/{namn}-{d}.png', 'vridpunkt': leder[d]}
rigg['delar']['head'] = {'fil': f'cut/{namn}-head.png', 'vridpunkt': rigg['hals']}
ys = np.nonzero(mF.any(1))[0]; rigg['fotter'] = int(np.nonzero(krita(F).any(1))[0].max())
json.dump(rigg, open(mapp / f'{namn}-rigg.json', 'w'), indent=2)
print(json.dumps(rigg))
