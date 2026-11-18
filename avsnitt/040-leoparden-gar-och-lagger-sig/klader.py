# Pyjamasskjortan på leopardens rigg (040), som 039:s overall på kaninen. Kör från repots rot:
#   python3 avsnitt/040-leoparden-gar-och-lagger-sig/klader.py            -> klader-lager/*.png + provbild-klader.jpg
# Alla lager i riggens 1024-ruta (cut-tunn), så de läggs rakt på sin riggdel och vrids kring samma vridpunkt.
#   skjorta-kropp.png        över kropp och mage, under ansiktet (halsringningen under nosfläcken)
#   skjorta-<armbild>.png    ärmen på varje armbild (arm-l, arm-l-fram, arm-l-klapp, arm-r …), övre halvan av armen
import os
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
from scipy import ndimage

HAR = os.path.dirname(os.path.abspath(__file__))
B = 'assets/karaktarer/leoparden-lova/premium/cut-tunn/lova-'
SKJ = 'assets/rekvisita/pyjamasskjorta/cut/pyjamasskjorta.png'
UT = os.path.join(HAR, 'klader-lager')
RIGG = {'arm-l': (245, 575), 'arm-r': (776, 572)}
HALS = lambda x: 566 - 0.0011 * (x - 512) ** 2   # halsringningen: lägst mitt under nosfläcken (y 541), stiger mot axlarna
MUDD, PUFF, ARM_DEL = 20, 4, 0.52                # muddens bredd, hur långt skjortan går ut i den vita kanten, ärmens längd (andel av armen)
Y, X = np.mgrid[:1024, :1024]

skj = np.array(Image.open(SKJ).convert('RGBA'))
BLA = np.median(skj[300:500, 300:550, :3].reshape(-1, 3), 0)          # skjortans midnattsblå
LJUS = np.median(skj[660:690, 250:600, :3].reshape(-1, 3), 0)         # muddens ljusare blå (nederkanten)
MORK = BLA * 0.72                                                     # kritkanten
# Bålens mönster är skjortans eget urklipp (samma stjärnor, samma storlek, Sanna 2026-11-18: lika många stjärnor som skjortan):
# framsidan under halsen, x 140-735 och y 250-606 i urklippet, skalad lika i båda led (0,94) till kroppens bredd under halsen.
_b = Image.fromarray(skj[250:606, 140:735, :3]).resize((789 - 230, 822 - 487), Image.LANCZOS)
_t = Image.new('RGB', (1024, 1024), tuple(int(c) for c in BLA)); _t.paste(_b, (230, 487))
TEX = np.array(_t).astype(float)
STJ_FARG = np.array([246, 246, 250])


def stjarnor(omr, steg=68, r=18, fro=4):
    """Mask med små femuddiga stjärnor i ett förskjutet rutnät (Sanna 2026-11-18: fler stjärnor), bara där omr finns med marginal."""
    rng = np.random.default_rng(fro); K = 4
    big = Image.new('L', (1024 * K, 1024 * K)); d = ImageDraw.Draw(big)
    inne = ndimage.binary_erosion(omr, iterations=r + 3)
    for j, y in enumerate(range(steg // 2, 1024, steg)):
        for x in range(steg // 2 + (steg // 2) * (j % 2), 1024, steg):
            x2, y2 = x + rng.uniform(-17, 17), y + rng.uniform(-15, 15)   # lite oregelbundet, som ritat för hand
            if not inne[int(min(y2, 1023)), int(min(x2, 1023))]: continue
            v0 = rng.uniform(-0.6, 0.6); rr = r
            pts = [(K * (x2 + (rr if i % 2 == 0 else rr * 0.45) * np.sin(v0 + i * np.pi / 5)),
                    K * (y2 - (rr if i % 2 == 0 else rr * 0.45) * np.cos(v0 + i * np.pi / 5))) for i in range(10)]
            d.polygon(pts, fill=255)
    return np.array(big.resize((1024, 1024), Image.LANCZOS)).astype(float) / 255


def fyllning(n):
    a = np.array(Image.open(B + n + '.png').convert('RGBA'))
    return (a[..., 3] > 100) & ~(a[..., :3].min(2) > 225), a[..., 3] > 100


def lager(omr, mudd=None, rgb=TEX, utan_kant=None, stj=None):
    """RGBA-lager: skjortans färg i omr, stjärnorna, mjuk kant, en mörkare kritkant och muddens ljusare band."""
    a = np.array(Image.fromarray((omr * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(1.1))).astype(float)
    c = rgb.copy()
    if stj is not None: c = c * (1 - stj[..., None] * 0.95) + STJ_FARG * stj[..., None] * 0.95
    if mudd is not None: c[mudd] = c[mudd] * 0.08 + LJUS * 0.92
    kant = omr & ~ndimage.binary_erosion(omr, iterations=5)
    if utan_kant is not None: kant &= ~utan_kant
    c[kant] = c[kant] * 0.45 + MORK * 0.55
    return Image.fromarray(np.dstack([c.clip(0, 255), a]).astype('uint8'))


def kropp():
    f, _ = fyllning('body-tom')
    omr = ndimage.binary_dilation(f, iterations=PUFF) & (Y > HALS(X))
    mudd = omr & (Y < HALS(X) + MUDD)
    return lager(omr, mudd)


def arm(n):
    f, al = fyllning(n)
    px, py = RIGG['arm-' + n.split('-')[1]]
    ys, xs = np.nonzero(f)
    d = np.hypot(xs - px, ys - py); tx, ty = xs[d.argmax()], ys[d.argmax()]   # armspetsen: längst från vridpunkten
    u = np.array([tx - px, ty - py], float); L = np.linalg.norm(u); u /= L
    proj = (X - px) * u[0] + (Y - py) * u[1]
    omr = ndimage.binary_dilation(f, iterations=PUFF) & al & (proj < ARM_DEL * L)
    mudd = omr & (proj > ARM_DEL * L - MUDD * 0.8)
    stj = stjarnor(omr & ~ndimage.binary_dilation(mudd, iterations=4), steg=110, r=16, fro=7)   # glest, som urklippet
    rgb = np.empty((1024, 1024, 3)); rgb[:] = BLA
    return lager(omr, mudd, rgb, utan_kant=proj < 0.3 * L, stj=stj)   # ingen kritkant vid roten, där ärmen möter kroppen


def kor():
    os.makedirs(UT, exist_ok=True)
    kropp().save(f'{UT}/skjorta-kropp.png', optimize=True)
    for s in 'lr':
        for v in ('', '-fram', '-klapp'):
            # klappbilden visar bara tassen framför magen: ärmen ligger då dold under bålen, så lagret är tomt
            (Image.new('RGBA', (1024, 1024)) if v == '-klapp' else arm(f'arm-{s}{v}')).save(f'{UT}/skjorta-arm-{s}{v}.png', optimize=True)
    # provbild: stående framifrån, armarna bakom kroppen och framför (vänster bild) och med armarna framför (höger)
    bg = Image.new('RGBA', (2048, 1024), (238, 111, 160, 255))
    for i, armar in enumerate((('arm-l', 'arm-r'), ('arm-l-fram', 'arm-r-fram'))):
        c = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
        for n in ('ear-l', 'ear-r', 'tail', 'leg-l', 'leg-r'): c.alpha_composite(Image.open(B + n + '.png').convert('RGBA'))
        if i == 0:
            for a in armar: c.alpha_composite(Image.open(B + a + '.png').convert('RGBA')); c.alpha_composite(Image.open(f'{UT}/skjorta-{a}.png'))
        for n in ('body-tom', 'mage'): c.alpha_composite(Image.open(B + n + '.png').convert('RGBA'))
        c.alpha_composite(Image.open(f'{UT}/skjorta-kropp.png'))
        c.alpha_composite(Image.open(B + 'nos.png').convert('RGBA'))
        if i == 1:
            for a in armar: c.alpha_composite(Image.open(B + a + '.png').convert('RGBA')); c.alpha_composite(Image.open(f'{UT}/skjorta-{a}.png'))
        bg.alpha_composite(c, (i * 1024, 0))
    bg.convert('RGB').save(os.path.join(HAR, 'provbild-klader.jpg'), quality=88)


if __name__ == '__main__':
    kor()
