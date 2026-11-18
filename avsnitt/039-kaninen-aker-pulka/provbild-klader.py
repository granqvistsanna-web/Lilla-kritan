# Provbild: kaninen med kläderna på (039). Kör från repots rot: python3 avsnitt/039-kaninen-aker-pulka/provbild-klader.py /tmp/liten.png
# Skriver avsnitt/039-kaninen-aker-pulka/provbild-klader.jpg. Alla mått i riggens 1024-ruta (OY = luft ovanför).
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import numpy as np

D = 'assets/karaktarer/kaninen-kanel/premium/cut-tunn/'
R = 'assets/rekvisita/'
OY = 260
W, H = 1024, 1024 + OY + 60
S_H, HAT_BOTTOM = 0.44, 345          # hat scale, brim bottom (rig px)
BOOT, BOOT_DROP = 0.12, 42           # boot scale, how far the boot sole sits below the foot
MIT = 0.2
LEG_W = 96   # trouser leg width
TUCK_W = 70  # trouser width at the boot top: as wide as the shaft, so it hides the whole opening
ARM_DOWN = 22   # arms turned this many degrees down towards the body
EARS_BEHIND = True   # ears behind the body, as in the rig (the hat versions turn this off)
EAR_ROT = {'kanel-ear-l': -14, 'kanel-ear-r': 14}   # PIL: + = counter-clockwise
BOOT_TOP_HIDE = 22  # with boots on, the foot below the boot top is hidden


def L(n):
    im = Image.open(D + n + '.png').convert('RGBA')
    big = Image.new('RGBA', (W, H), (0, 0, 0, 0)); big.alpha_composite(im, (0, OY)); return big


def prep(f, s, rot=0, flip=False):
    im = Image.open(f).convert('RGBA')
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    if flip: im = ImageOps.mirror(im)
    return im.rotate(rot, expand=True, resample=Image.BICUBIC) if rot else im


def at(im, cx, cy):
    big = Image.new('RGBA', (W, H), (0, 0, 0, 0)); big.alpha_composite(im, (int(cx - im.width / 2), int(cy - im.height / 2 + OY))); return big


tex = Image.open(R + 'overall/cut/overall.png').convert('RGBA').crop((200, 300, 600, 600)).resize((W, H), Image.LANCZOS)
Y, X = np.mgrid[:H, :W]


def klad(part, mask=None, kant=True):
    a = np.array(part)[..., 3].copy()
    if mask is not None: a = (a * mask).astype('uint8')
    t = tex.copy(); t.putalpha(Image.fromarray(a))
    if kant:
        e = Image.fromarray(a).filter(ImageFilter.MinFilter(9))
        ring = np.clip(a.astype(int) - np.array(e).astype(int), 0, 255)
        k = Image.new('RGBA', (W, H), (150, 32, 26, 0)); k.putalpha(Image.fromarray((ring * 0.7).astype('uint8'))); t.alpha_composite(k)
    return t


PUFF_BODY, PUFF_ARM = 16, 8   # how far the padded overall bulges past the body / arm (px)


def puffig(part, mask, puff, quilt=True):
    """Overall over a body part, padded: grown past the part's own outline, with its own white sticker rim and quilting."""
    from scipy import ndimage
    a = np.array(part)[..., 3] > 100
    if mask is not None: a &= mask
    grown = ndimage.binary_dilation(a, iterations=puff)
    if mask is not None: grown &= a | ((Y - OY) < 790)
    if mask is not None: grown &= mask | ~ndimage.binary_dilation(mask, iterations=0)
    if mask is not None: grown &= (Y - OY) > 515 - 0.0011 * (X - 506) ** 2 - 4
    soft = lambda m, r=1.2: np.array(Image.fromarray((m * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(r)))
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    rim = Image.new('RGBA', (W, H), (255, 255, 255, 255)); rim.putalpha(Image.fromarray(soft(ndimage.binary_dilation(grown, iterations=7))))
    out.alpha_composite(rim)
    out.alpha_composite(klad(Image.fromarray(np.dstack([np.zeros((H, W, 3), 'uint8'), soft(grown)])), kant=True))
    if quilt:  # two soft quilting seams, curved like the body
        d = ImageDraw.Draw(out)
        for yy in (640, 735):
            pts = [(x, yy + OY + 0.0009 * (x - 506) ** 2) for x in range(200, 820, 8)]
            pts = [(x, y) for x, y in pts if 0 <= y < H and grown[int(y), int(x)] and grown[int(y), max(int(x) - 14, 0)] and grown[int(y), min(int(x) + 14, W - 1)]]
            if len(pts) > 2: d.line(pts, fill=(176, 40, 32, 150), width=5)
    return out


# collar: lowest in the middle under the muzzle, rising to the sides so the shoulders are covered
krage = (Y - OY) > 515 - 0.0011 * (X - 506) ** 2

# hat and its holes in canvas px
hat = prep(R + 'mossa-oronhal/cut/mossa-oronhal.png', S_H)
hx, hy = 506 - hat.width // 2, HAT_BOTTOM - hat.height
HAT = Image.new('RGBA', (W, H), (0, 0, 0, 0)); HAT.alpha_composite(hat, (hx, hy + OY))
hat_a = np.array(HAT)[..., 3] > 100
holes = []
for x0, x1 in ((152, 307), (629, 783)):
    holes.append(((hx + (x0 + x1) / 2 * S_H), (hy + (305 + 486) / 2 * S_H + OY), (x1 - x0) / 2 * S_H, (486 - 305) / 2 * S_H))
from scipy import ndimage
hole_mask = ndimage.binary_fill_holes(hat_a) & ~hat_a   # the real see-through holes
hole_top = min(cy - ry for cx, cy, rx, ry in holes)


def ear(n, hole):
    """Move the ear so its lower centre sits in the hole, then keep only what shows through the hole or above the hat."""
    piv = {'kanel-ear-l': (379, 225 + OY), 'kanel-ear-r': (641, 230 + OY)}[n]
    e = np.array(L(n).rotate(EAR_ROT[n], center=piv, resample=Image.BICUBIC))
    a = e[..., 3] > 128
    ys, xs = np.where(a)
    bottom = ys.max()
    low = a & (Y > bottom - 60)
    cx_low = np.where(low)[1].mean()
    cx, cy, rx, ry = hole
    dx, dy = cx - cx_low, (cy + ry + 8) - bottom
    im = Image.fromarray(e).transform((W, H), Image.AFFINE, (1, 0, -dx, 0, 1, -dy), resample=Image.BICUBIC)
    m = hole_mask | (~hat_a & (Y < hole_top + 6))
    arr = np.array(im); arr[..., 3] = (arr[..., 3] * m).astype('uint8')
    return Image.fromarray(arr)


BEN = ((True, 374, 950), (False, 668, 941))   # (mirrored, foot centre x, foot bottom y) for leg-l, leg-r
ARMAR = (('kanel-arm-l', (212, 567), (113, 657), 132, R + 'tumvantar-rosa/cut/tumvante-rosa-1.png'),
         ('kanel-arm-r', (799, 566), (898, 655), -132, R + 'tumvantar-rosa/cut/tumvante-rosa-2.png'))


def byxa(flip, cx, bot):
    """Straight padded trouser leg from under the body down into the boot shaft (the rig's foot is hidden)."""
    shaft = cx + (18 if flip else -18) * BOOT / 0.12      # boot shaft centre (the shaft is the heel side of the boot)
    top = bot + BOOT_DROP - 1081 * BOOT + 14              # a little into the boot
    k = np.clip(((Y - OY) - 760) / max(top - 760, 1), 0, 1)
    w = LEG_W / 2 * (1 - k) + TUCK_W / 2 * k              # tapers so it goes down INTO the shaft
    m = (np.abs(X - shaft) < w) & ((Y - OY) > 760) & ((Y - OY) < top + 30)
    return puffig(Image.fromarray(np.dstack([np.zeros((H, W, 3), 'uint8'), (m * 255).astype('uint8')])), None, 6, quilt=False)


def stovel(c, flip, cx, bot, by):
    """Boot on the foot, then the trouser again over the boot opening down to its front lip (tucked in), and a fold."""
    b = prep(R + 'stovlar-gula/cut/stovel-gul-kort-1.png', BOOT, flip=flip)
    c.alpha_composite(at(b, cx, bot + BOOT_DROP - b.height / 2))
    # Lip in the boot cut: y 145 in the middle, 100 at the sides.
    x0, y0 = int(cx - b.width / 2), int(bot + BOOT_DROP - b.height / 2 + OY)
    bxx = (X - x0) / BOOT; bxx = 1152 - bxx if flip else bxx
    lip = y0 + (145 - 45 * ((bxx - 440) / 360) ** 2) * BOOT
    over = np.array(by); over[..., 3] = (over[..., 3] * ((Y < lip) & (Y > y0 - 4))).astype('uint8')
    c.alpha_composite(Image.fromarray(over))
    shaft = cx + (18 if flip else -18) * BOOT / 0.12; top = bot + BOOT_DROP - 1081 * BOOT + OY
    d = ImageDraw.Draw(c)
    for i, dy in enumerate((-22, -10)):
        ww = TUCK_W / 2 + 6 - i * 3
        d.arc([shaft - ww, top + dy - 8, shaft + ww, top + dy + 8], 20, 160, fill=(165, 35, 28, 255), width=3)


def arm_klader(c, n, piv, tip, rot, f, ned, arm=True, vante=True):
    """Sleeve over the arm and the mitten at its tip, the arm turned ned degrees down towards the body."""
    sgn = 1 if rot > 0 else -1; t = np.radians(sgn * ned)
    if arm: c.alpha_composite(puffig(L(n).rotate(sgn * ned, center=(piv[0], piv[1] + OY), resample=Image.BICUBIC), None, PUFF_ARM, quilt=False))
    if not vante: return
    vx, vy = tip[0] - piv[0], tip[1] - piv[1]
    tip = (piv[0] + vx * np.cos(t) + vy * np.sin(t), piv[1] - vx * np.sin(t) + vy * np.cos(t))   # same turn as the arm
    u = np.array(tip, float) - piv; u /= np.linalg.norm(u)
    m = prep(f, MIT, rot=rot + sgn * ned, flip=True); Lm = 680 * MIT   # thumb on the inner side, towards the body
    cx, cy = np.array(tip) + u * (Lm / 2 - 30)
    c.alpha_composite(at(m, cx, cy))


def kropp_klader(c):
    """The overall over the body (collar, zip, pull) and the headband."""
    c.alpha_composite(puffig(L('kanel-body'), krage, PUFF_BODY))
    d = ImageDraw.Draw(c)
    d.line([(506, 548 + OY), (506, 820 + OY)], fill=(150, 30, 25, 255), width=6)
    d.ellipse([495, 540 + OY, 517, 566 + OY], fill=(232, 183, 48, 255))
    c.alpha_composite(pannband_kod())


def bild():
    c = Image.new('RGBA', (W, H), (19, 86, 201, 255))
    c.alpha_composite(L('kanel-tail'))
    if EARS_BEHIND: c.alpha_composite(L('kanel-ear-l')); c.alpha_composite(L('kanel-ear-r'))
    byxor = [byxa(*b) for b in BEN]
    for by in byxor: c.alpha_composite(by)
    c.alpha_composite(L('kanel-body'))
    kropp_klader(c)
    d = ImageDraw.Draw(c)
    c.alpha_composite(L('kanel-nos'))
    for x, y in [(408, 418), (613, 417)]:
        d.ellipse([x - 17, y - 24 + OY, x + 17, y + 24 + OY], fill=(40, 28, 24, 255))
    for n, piv, tip, rot, f in ARMAR:
        sgn = 1 if rot > 0 else -1
        c.alpha_composite(L(n).rotate(sgn * ARM_DOWN, center=(piv[0], piv[1] + OY), resample=Image.BICUBIC))
        arm_klader(c, n, piv, tip, rot, f, ARM_DOWN)
    for b, by in zip(BEN, byxor): stovel(c, *b, by)
    return c


def lager(ut):
    """Clothing layers in the rig's 1024 frame for the motion test: kropp, arm-l/r (unturned arm), leg-l/r."""
    import os; os.makedirs(ut, exist_ok=True)
    tom = lambda: Image.new('RGBA', (W, H), (0, 0, 0, 0))
    spara = lambda c, n: c.crop((0, OY, 1024, OY + 1024)).save(f'{ut}/{n}.png')
    c = tom(); kropp_klader(c); spara(c, 'kropp')
    for n, piv, tip, rot, f in ARMAR:
        c = tom(); arm_klader(c, n, piv, tip, rot, f, 0); spara(c, n.replace('kanel-', ''))
    for b, n in zip(BEN, ('leg-l', 'leg-r')):
        c = tom(); by = byxa(*b); c.alpha_composite(by); stovel(c, *b, by); spara(c, n)
    # one layer per garment, so each can slide on by itself in the scene (039 storyboard and scene)
    c = tom(); c.alpha_composite(puffig(L('kanel-body'), krage, PUFF_BODY)); spara(c, 'overall-kropp')
    c = tom(); c.alpha_composite(pannband_kod()); spara(c, 'pannband')
    for n, piv, tip, rot, f in ARMAR:
        sida = n[-1]
        c = tom(); arm_klader(c, n, piv, tip, rot, f, 0, vante=False); spara(c, 'overall-arm-' + sida)
        c = tom(); arm_klader(c, n, piv, tip, rot, f, 0, arm=False); spara(c, 'vante-' + sida)
    for b, sida in zip(BEN, 'lr'):
        by = byxa(*b)
        c = tom(); c.alpha_composite(by); spara(c, 'byxa-' + sida)
        c = tom(); stovel(c, *b, by); spara(c, 'stovel-' + sida)


bild_utan_hatt = bild


# ---- v2: holes drawn in code, sized to the ears ----
from scipy import ndimage
GREEN = np.array([47, 120, 70])
def hat_filled():
    """The hat with its generated holes painted shut in the hat's own green (with grain)."""
    a = np.array(HAT).astype(float)
    fill = ndimage.binary_dilation(hole_mask, iterations=10) & hat_a | hole_mask
    ring = ndimage.binary_dilation(fill, iterations=10) & ~fill & hat_a
    col = a[ring][:, :3].mean(0)
    noise = np.random.default_rng(1).normal(0, 6, (H, W, 1))
    a[fill, :3] = np.clip(col + noise[fill], 0, 255)
    a[fill, 3] = 255
    out = Image.fromarray(a.astype('uint8'))
    soft = out.filter(ImageFilter.GaussianBlur(3)); m = Image.fromarray((ndimage.binary_dilation(fill, iterations=3) * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(2))
    out.paste(soft, (0, 0), m); return out

TILT = {'kanel-ear-l': 18, 'kanel-ear-r': -18}
HOLE_UP = 55
HOLE = {'kanel-ear-l': (416, 140), 'kanel-ear-r': (596, 140)}   # hole tilt (deg, follows the dome)

def ear_in_hole(c, n, hole):
    cx, cy = hole[0], hole[1]
    piv = {'kanel-ear-l': (379, 225 + OY), 'kanel-ear-r': (641, 230 + OY)}[n]
    e = np.array(L(n).rotate(EAR_ROT[n], center=piv, resample=Image.BICUBIC))
    a = e[..., 3] > 128
    ys, xs = np.where(a); bottom = ys.max()
    # ear width ~70 px above its bottom = where it leaves the hole
    row = bottom - HOLE_UP
    xr = np.where(a[row])[0]; mid, half = xr.mean(), (xr.max() - xr.min()) / 2
    cx, cy = HOLE[n][0], HOLE[n][1] + OY   # hole on the upper dome; the ear is moved so its base sits in it
    dx, dy = cx - mid, cy - row
    e = np.array(Image.fromarray(e).transform((W, H), Image.AFFINE, (1, 0, -dx, 0, 1, -dy), resample=Image.BICUBIC))
    rx, ry = half + 6, (half + 6) * 0.42
    t = np.radians(TILT[n])
    u = (X - cx) * np.cos(t) + (Y - cy) * np.sin(t)
    v = -(X - cx) * np.sin(t) + (Y - cy) * np.cos(t)
    inside = ((u / rx) ** 2 + (v / ry) ** 2 < 1) & hat_a
    # dark inside of the hole
    ins = Image.new('RGBA', (W, H), (24, 66, 38, 255)); ins.putalpha(Image.fromarray((inside * 255).astype('uint8')))
    c.alpha_composite(ins)
    # the ear: hidden where hat material is in front of it (below the hole's long axis, outside the hole)
    keep = (v < 0) | inside
    keep &= ~(v > ry * 0.15)          # the ear base ends a little below the hole centre
    e[..., 3] = (e[..., 3] * keep).astype('uint8')
    c.alpha_composite(Image.fromarray(e))
    # front lip of the hole over the ear base: lower half-ring in hat green with a dark knit edge
    ring = ((u / (rx + 9)) ** 2 + (v / (ry + 9)) ** 2 < 1) & ~inside & (v > -ry * 0.2) & hat_a
    lip = Image.new('RGBA', (W, H), tuple(GREEN) + (255,)); lip.putalpha(Image.fromarray((ring * 255).astype('uint8')))
    c.alpha_composite(lip)
    edge = ((u / rx) ** 2 + (v / ry) ** 2 < 1.12) & ((u / rx) ** 2 + (v / ry) ** 2 > 0.9) & (v > -ry * 0.2) & hat_a
    ed = Image.new('RGBA', (W, H), (24, 66, 38, 255)); ed.putalpha(Image.fromarray((edge * 255).astype('uint8')))
    c.alpha_composite(ed)


def bild2():
    c = bild_utan_hatt()
    c.alpha_composite(hat_filled())
    ear_in_hole(c, 'kanel-ear-l', holes[0])
    ear_in_hole(c, 'kanel-ear-r', holes[1])
    # pompom back on top of the ears: the cream part of the hat above the dome
    h = np.array(HAT); rgb = h[..., :3].astype(int)
    cream = (h[..., 3] > 100) & (rgb.min(2) > 200) & (rgb.max(2) - rgb.min(2) > 14) & (Y < hy + OY + 0.30 * hat.height)
    cream = ndimage.binary_dilation(ndimage.binary_fill_holes(ndimage.binary_closing(cream, iterations=3)), iterations=10) & (h[..., 3] > 0) & ~((rgb[..., 1] > rgb[..., 0] + 25) & (rgb.min(2) < 190)) & (Y < hy + OY + 0.30 * hat.height)
    core = ndimage.binary_fill_holes((h[..., 3] > 100) & (rgb.min(2) > 200) & (rgb.max(2) - rgb.min(2) > 14) & (Y < hy + OY + 0.30 * hat.height))
    lab, nl = ndimage.label(core); big = lab == (np.argmax(ndimage.sum(core, lab, range(1, nl + 1))) + 1)
    yy, xx = np.where(big); pr = max(xx.max() - xx.min(), yy.max() - yy.min()) / 2 + 11
    cream &= (X - xx.mean()) ** 2 + (Y - yy.mean()) ** 2 < pr ** 2
    h[..., 3] = (h[..., 3] * cream).astype('uint8')
    c.alpha_composite(Image.fromarray(h))
    return c


BAND_W, BAND_H, BAND_TOP = 470, 215, 178   # headband size and top edge (rig px), set once when it is cut, never changed in motion


def bild3():
    """Headband instead of the hat: ears in their own place, the band in front of their roots."""
    c = bild_utan_hatt()
    c.alpha_composite(L('kanel-ear-l')); c.alpha_composite(L('kanel-ear-r'))
    band = Image.open(R + 'pannband/cut/pannband.png').convert('RGBA').resize((BAND_W, BAND_H), Image.LANCZOS)
    c.alpha_composite(band, (int(506 - band.width / 2), int(BAND_TOP + OY)))
    return c


BAND_Y0, BAND_Y1, BAND_PUFF = 232, 300, 8   # straight fluffy headband: top and bottom edge (rig px), how far it sticks out past the head


def pannband_kod():
    """A straight, fluffy knitted band across the head, drawn in code over the head's own outline."""
    from scipy import ndimage
    head = np.array(L('kanel-body'))[..., 3] > 100
    head = ndimage.binary_dilation(head, iterations=BAND_PUFF)
    y = Y - OY
    band = head & (y > BAND_Y0) & (y < BAND_Y1)
    # fluffy edges: a row of soft bumps along the top and bottom edge
    rng = np.random.default_rng(3)
    for yy in (BAND_Y0, BAND_Y1):
        for x in range(150, 880, 17):
            r = 12 + rng.uniform(-1.5, 2)
            band |= head & (((X - x - rng.uniform(-3, 3)) ** 2 + (y - yy) ** 2) < r * r)
    lab, nl = ndimage.label(band)   # drop stray bits
    if nl > 1:
        sz = ndimage.sum(band, lab, range(1, nl + 1)); band = lab == (np.argmax(sz) + 1)
    soft = lambda m, r=1.3: Image.fromarray((m * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(r))
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    rim = Image.new('RGBA', (W, H), (255, 255, 255, 255)); rim.putalpha(soft(ndimage.binary_dilation(band, iterations=7))); out.alpha_composite(rim)
    g = np.random.default_rng(5).normal(0, 7, (H, W))[..., None]
    knit = np.clip(np.array([47, 125, 70])[None, None] + g, 0, 255)
    rib = ((X % 15) < 3) & ((y % 26) > 4)                        # short vertical knit ribs
    knit[rib] = knit[rib] * 0.82
    mid = (BAND_Y0 + BAND_Y1) / 2
    for off, w, col in ((-17, 4, (255, 244, 226)), (17, 4, (255, 244, 226)), (0, 6, (214, 58, 48))):   # cream, red, cream stripes
        stripe = np.abs(y - mid - off) < w
        knit[stripe] = np.array(col) + g[stripe] * 0.4
    knit = Image.fromarray(np.dstack([np.clip(knit, 0, 255).astype('uint8'), np.array(soft(band, 0.8))]))
    out.alpha_composite(knit)
    # soft fluffy shading: lighter fuzz along the edges
    edge = band & ~ndimage.binary_erosion(band, iterations=6)
    fz = Image.new('RGBA', (W, H), (120, 180, 130, 0)); fz.putalpha(soft(edge, 1).point(lambda v: int(v * 0.35))); out.alpha_composite(fz)
    return out


def bild4():
    c = bild_utan_hatt()
    c.alpha_composite(pannband_kod())
    return c


if sys.argv[1] == '--lager': lager(sys.argv[2]); sys.exit()
c = bild4()
c.convert('RGB').save('avsnitt/039-kaninen-aker-pulka/provbild-klader.jpg', quality=88)
c.convert('RGB').resize((W // 2, H // 2)).save(sys.argv[1])
c.convert('RGB').crop((200, 150, 820, 760)).save(sys.argv[1].replace('.png', '-hatt.png'))
