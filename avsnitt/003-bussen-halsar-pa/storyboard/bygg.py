"""Bygger storyboarden för avsnitt 003 av de färdiga utklippen och bakgrunderna.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter.
"""
import html
import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
random.seed(3)


def cut(fig, namn):
    return Image.open(A / "karaktarer" / fig / "cut" / f"{namn}.png").convert("RGBA")


def plate(slug):
    return Image.open(A / "bakgrunder" / slug / f"{slug}.png").convert("RGB").resize((W, H))


# Ögonen i figurernas egna 1024-koordinater (uppmätta: ansiktslös mot med ansikte)
EYES = [(414, 401), (605, 399)]
# Bussens fönster (x, y, b, h) och dörr, i 1024-koordinater
WIN = [(149, 379, 98, 109), (283, 378, 99, 108), (414, 375, 99, 109), (546, 374, 99, 109)]
DOOR = (681, 368, 112, 273)


def face(im, mood):
    """Ritar ögon på en ansiktslös figur, som koden gör i filmen."""
    im = im.copy()
    d = ImageDraw.Draw(im)
    for x, y in EYES:
        if mood == "sleep":
            d.arc((x - 24, y - 20, x + 24, y + 16), 20, 160, fill=INK, width=8)
        elif mood == "happy":
            d.arc((x - 24, y - 10, x + 24, y + 26), 200, 340, fill=INK, width=8)
        else:
            d.ellipse((x - 26, y - 26, x + 26, y + 26), fill="white", outline=INK, width=6)
            d.ellipse((x - 10, y - 10, x + 10, y + 10), fill=INK)
    return im


def place(canvas, im, cx, ground, h, alpha=1.0, rot=0, flip=False):
    """Klistrar in en figur med fötterna på `ground`. Returnerar (skala, x0, y0) för figurens 1024-koordinater."""
    box = im.getbbox()
    s = h / (box[3] - box[1])
    big = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    if flip:
        big = big.transpose(Image.FLIP_LEFT_RIGHT)
    if rot:
        big = big.rotate(rot, resample=Image.BICUBIC, center=(big.width / 2, box[3] * s))
    if alpha < 1:
        big.putalpha(big.getchannel("A").point(lambda v: int(v * alpha)))
    x0 = round(cx - (box[0] + box[2]) / 2 * s)
    y0 = round(ground - box[3] * s)
    canvas.paste(big, (x0, y0), big)
    return s, x0, y0


def in_window(canvas, bus, win, fig, namn, mood="open"):
    """Figurens huvud tittar ut genom ett av bussens fönster (beskuret i kod, ingen ny bild)."""
    s, bx, by = bus
    wx, wy, ww, wh = WIN[win]
    head = face(cut(fig, namn), mood)
    k = s * ww * 0.5 / 190 * 0.75  # huvudet är mindre än fönstret, så att det mörka syns runt det
    if fig == "kaninen-kanel":
        k *= 0.8  # kaninen är mindre än lammet
    head = head.resize((round(1024 * k), round(1024 * k)), Image.LANCZOS)
    ex, ey = 510 * k, 400 * k
    cx, cy = bx + (wx + ww / 2) * s, by + (wy + wh * 0.62) * s
    layer = Image.new("RGBA", canvas.size)
    layer.paste(head, (round(cx - ex), round(cy - ey)), head)
    mask = Image.new("L", canvas.size)
    r = 14 * s
    ImageDraw.Draw(mask).rounded_rectangle(
        (bx + wx * s, by + wy * s, bx + (wx + ww) * s, by + (wy + wh) * s), radius=r, fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", canvas.size), mask))
    ImageDraw.Draw(canvas).rounded_rectangle(  # mörkt fönster bakom passageraren, så att det ljusa lammet syns
        (bx + wx * s, by + wy * s, bx + (wx + ww) * s, by + (wy + wh) * s), radius=r, fill=(62, 74, 99))
    canvas.paste(layer, (0, 0), layer)


def door(canvas, bus):
    """Öppen dörr: en mörk öppning där dörren sitter."""
    s, bx, by = bus
    x, y, w, h = DOOR
    ImageDraw.Draw(canvas).rounded_rectangle(
        (bx + x * s, by + y * s, bx + (x + w) * s, by + (y + h) * s), radius=8 * s, fill=(96, 40, 34))


def arrow(canvas, pts, col=(255, 255, 255)):
    """Streckad rörelsepil, som i pilotens storyboard."""
    d = ImageDraw.Draw(canvas)
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        n = max(1, int(math.dist((x1, y1), (x2, y2)) / 22))
        for i in range(0, n, 2):
            a, b = i / n, min(1, (i + 1) / n)
            d.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=col, width=6)
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    ang = math.atan2(y2 - y1, x2 - x1)
    for da in (2.6, -2.6):
        d.line((x2, y2, x2 + 26 * math.cos(ang + da), y2 + 26 * math.sin(ang + da)), fill=col, width=6)


def arc_pts(p, q, lift, n=12):
    return [(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t - lift * math.sin(math.pi * t)) for t in (i / n for i in range(n + 1))]


def crayon_text(canvas, xy, text, size, col=INK):
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        font = ImageFont.load_default()
    ImageDraw.Draw(canvas).text(xy, text, font=font, fill=col, anchor="mm")


def crayon_ring(d, cx, cy, r, col, width):
    for _ in range(9):
        j = random.uniform(-5, 5)
        d.ellipse((cx - r + j, cy - r - j, cx + r - j, cy + r + j), outline=col, width=width // 3)


def paper():
    return Image.new("RGB", (W, H), PAPER)


def wheel(canvas, cx, cy, r):
    d = ImageDraw.Draw(canvas)
    crayon_ring(d, cx, cy, r, INK, 36)
    d.ellipse((cx - r * 0.75, cy - r * 0.75, cx + r * 0.75, cy + r * 0.75), fill=INK)
    d.ellipse((cx - r * 0.32, cy - r * 0.32, cx + r * 0.32, cy + r * 0.32), fill=(246, 194, 28))


def swipe(canvas, col):
    """Kritsvep: grova kritstreck i nästa plats väggfärg drar över bilden."""
    d = ImageDraw.Draw(canvas, "RGBA")
    for _ in range(900):
        x = random.uniform(W * 0.35, W * 1.1)
        y = random.uniform(-80, H + 80)
        d.line((x, y, x - 260, y + 120), fill=col + (random.randint(120, 220),), width=random.randint(10, 26))


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


# --- Figurerna -----------------------------------------------------------
BUS = cut("bussen-bettan", "bussen-bettan")
KANINEN = cut("kaninen-kanel", "kanel-faceless")
LAMMET = cut("lammet-ludde", "ludde-faceless")
TUFF = cut("traktorn-tuff", "traktorn-tuff")
PELLA = cut("flygplanet-pella", "flygplanet-pella")

GA, GB = 640, 576  # golvlinjen (+ fötterna lite under) på Busshållplatsen och Bondgården
BUS_H, FIG_H = 330, 250
KANIN_H = round(FIG_H * 0.8)  # kaninen är mindre än lammet
PELLA_H = round(BUS_H * 903 / 579 * 1.5 * 508 / 920)  # bussens bredd × 1,5, i planets proportioner
SOVER = cut("lammet-ludde", "ludde-sover")


def stop(bus_x=850, kanel=True, mood="open", pella=False):
    c = plate("busshallplatsen")
    if pella:  # flyger nära förbi: ca 1,5 gånger så bred som bussen
        place(c, PELLA, 760, 400, PELLA_H)
    if kanel:
        place(c, face(KANINEN, mood), 250, GA + 4, KANIN_H)
    b = place(c, BUS, bus_x, GA + 12, BUS_H) if bus_x is not None else None
    return c, b


def farm_plate():
    """Bondgården med bara en fjäril: de två målade fjärilarna täcks med väggen bredvid (biet blir kvar)."""
    c = plate("bondgarden").copy()
    c.paste(c.crop((950, 50, 1140, 180)), (1145, 50))
    return c


FARM = farm_plate()
FIA = cut("fjarilen-fia", "fia")  # vingarna finns som egna delar och flaxar i filmen


def farm(bus_x=560, ludde="sleep", tuff=True):
    c = FARM.copy()
    place(c, FIA, 1010, 200, 110, rot=8)
    if tuff:
        place(c, TUFF, 915, GB - 52, 145)
    if ludde == "sleep":
        place(c, SOVER, 1140, GB + 10, 212)  # ligger ner, lika stor som när han står
    elif ludde:
        place(c, face(LAMMET, ludde), 1110, GB + 10, FIG_H)
    b = place(c, BUS, bus_x, GB + 14, BUS_H) if bus_x is not None else None
    return c, b


frames = {}

# 1 Intro: färgglatt titelkort, varje bokstav i en egen kritfärg med vit kant
REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size):
    font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=font) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=font, fill=REGNBÅGE[i % len(REGNBÅGE)],
               anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
        x += d.textlength(ch, font=font)


def crayon_wall(col, floor=0.84, n=2600):
    """Vägg av vaxkritstreck på papper, som bakgrundsbilderna: korta snedstreck i ljusare och mörkare nyanser."""
    c = Image.new("RGB", (W, H), col)
    d = ImageDraw.Draw(c, "RGBA")
    fy = int(H * floor)
    for _ in range(n):
        x, y = random.uniform(-40, W), random.uniform(-20, fy)
        ton = random.choice([(-28, -40, -20), (10, 18, 50), (-12, -30, -10), (8, 22, 70)])
        rgb = tuple(max(0, min(255, v + dv)) for v, dv in zip(col, ton))
        L = random.uniform(30, 110)
        d.line((x, y, x + L, y - L * 0.45), fill=rgb + (random.randint(60, 140),), width=random.randint(2, 6))
    d.rectangle((0, fy, W, H), fill=(250, 248, 242))
    for x in range(0, W, 6):  # ojämn kritkant mellan vägg och golv
        d.line((x, fy + random.uniform(-3, 3), x + 6, fy + random.uniform(-3, 3)), fill=col + (255,), width=3)
    return c


def paper_grain(img, amount=14, specks=0.035):
    """Papperskorn över hela bilden: lite brus och små ljusa prickar där kritan inte fäst."""
    a = np.array(img).astype(int)
    rng = np.random.default_rng(3)
    a += rng.integers(-amount, amount + 1, a.shape[:2])[..., None]
    hole = rng.random(a.shape[:2]) < specks
    a[hole] = (a[hole] * 0.55 + 255 * 0.45).astype(int)
    return Image.fromarray(np.clip(a, 0, 255).astype("uint8"))


c = crayon_wall((246, 194, 28))
d = ImageDraw.Draw(c)
for i in range(18):
    x, y = random.uniform(30, W - 30), random.uniform(30, H * 0.8)
    if abs(x - W / 2) > 480 or y < 40:
        d.ellipse((x - 13, y - 11, x + 12, y + 13), fill=REGNBÅGE[i % len(REGNBÅGE)])
color_text(c, H * 0.22, "lilla kritan", 124)
crayon_text(c, (W / 2, H * 0.42), "Avsnitt 3", 50, INK)
color_text(c, H * 0.57, "Bussen hälsar på", 88)
wheel(c, W / 2, H * 0.75, 40)
c = paper_grain(c)
frames["01"] = c

# 2 Kritan ritar ett hjul
c = paper()
wheel(c, W / 2, H / 2, 170)
ImageDraw.Draw(c).polygon([(980, 300), (1080, 200), (1110, 230), (1010, 330)], fill=(242, 140, 124))
frames["02"] = c

# 3 bussen rullar in, flygplanet flyger förbi
c, b = stop(bus_x=None, pella=True)
place(c, BUS, 520, GA + 12, BUS_H, alpha=0.3)
b = place(c, BUS, 850, GA + 12, BUS_H)
arrow(c, [(380, 700), (760, 700)])
frames["03"] = c

# 4 Vers 1: Bussen gungar i takt
c, _ = stop(bus_x=None, mood="happy")
place(c, BUS, 850, GA + 12, BUS_H, alpha=0.3, rot=4)
place(c, BUS, 850, GA + 12, BUS_H, rot=-4)
frames["04"] = c

# 5 Närbild kaninen
c, _ = stop(mood="happy")
frames["05"] = crop_zoom(c, 300, 500, 620)

# 6 kaninen hoppar in
c, b = stop(kanel=False)
door(c, b)
place(c, face(KANINEN, "open"), 250, GA + 4, KANIN_H, alpha=0.3)
s, bx, by = b
dx = bx + (DOOR[0] + DOOR[2] / 2) * s
place(c, face(KANINEN, "happy"), dx - 110, GA + 4, KANIN_H)
arrow(c, arc_pts((300, 420), (dx - 120, 420), 140))
frames["06"] = c

# 7 Vers 2: Kaninen i fönstret
c, b = stop(kanel=False)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless", "happy")
frames["07"] = c

# 8 bussen kör vidare
c, b = stop(bus_x=None, kanel=False)
place(c, BUS, 850, GA + 12, BUS_H, alpha=0.3)
b = place(c, BUS, 1240, GA + 12, BUS_H)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless", "open")
arrow(c, [(900, 700), (1300, 700)])
frames["08"] = c

# 8a Kritsvep (grönt) till vägen
c, b = stop(bus_x=None, kanel=False)
swipe(c, (172, 222, 122))
frames["08a"] = c

# Körscen: bussen står still i mitten, vägen och sakerna glider förbi från höger
GV = 700  # hjulen på vägen
GF = 572  # åkerns och trädets fot vid väggens kant


def tree():
    """Äppelträdet klipps ur Äppelträdets bakgrund (ingen ny bild)."""
    a = np.array(plate("appeltradet").convert("RGB")).astype(int)
    orange = np.abs(a - [236, 116, 34]).sum(2) < 120
    cream = np.abs(a - [247, 243, 231]).sum(2) < 40
    keep = ndimage.binary_opening(~orange & ~cream, iterations=2)
    lab, _ = ndimage.label(keep)
    big = np.bincount(lab.ravel())
    big[0] = 0
    keep = np.isin(lab, np.nonzero(big > 400)[0])
    keep[:, :1050] = False
    rgba = np.dstack([a, keep * 255]).astype("uint8")
    return Image.fromarray(rgba, "RGBA").crop((1050, 60, W, 650))


def field(canvas, x0, x1):
    """En plöjd åkerremsa längs väggens nederkant (kritränder i kod)."""
    d = ImageDraw.Draw(canvas, "RGBA")
    d.rounded_rectangle((x0, GF - 95, x1, GF + 6), 30, fill=(150, 96, 56))
    for y in range(GF - 80, GF, 16):
        for _ in range(int((x1 - x0) / 10)):
            x = random.uniform(x0 + 10, x1 - 30)
            d.line((x, y + random.uniform(-2, 2), x + 26, y + random.uniform(-2, 2)), fill=(110, 66, 36, 160), width=4)


def drive(stuff):
    c = plate("vagen")
    stuff(c)
    for y in (470, 530, 590):
        ImageDraw.Draw(c).line((250, y, 340, y), fill=(255, 255, 255), width=7)
    b = place(c, BUS, W / 2 - 60, GV, BUS_H, rot=-1)
    in_window(c, b, 3, "kaninen-kanel", "kanel-faceless", "happy")
    return c, b


TREE = tree()


def plate_piece(slug, box, wall):
    """Klipper ut det som står på en bakgrund (allt som inte är vägg eller golv) inom box."""
    a = np.array(plate(slug).convert("RGB")).astype(int)
    keep = (np.abs(a - wall).sum(2) > 110) & (np.abs(a - [247, 243, 231]).sum(2) > 22)
    keep = ndimage.binary_opening(keep, iterations=1)
    keep = ndimage.binary_fill_holes(ndimage.binary_closing(keep, iterations=3))
    lab, _ = ndimage.label(keep)
    big = np.bincount(lab.ravel())
    big[0] = 0
    tall = [i + 1 for i, s in enumerate(ndimage.find_objects(lab)) if s[0].stop - s[0].start > 24]  # inte väggkanten
    keep = np.isin(lab, [i for i in tall if big[i] > 300])
    rgba = np.dstack([a, keep * 255]).astype("uint8")
    return Image.fromarray(rgba, "RGBA").crop(box)


POND = plate_piece("dammen", (950, 410, W, 740), [44, 190, 160])
POND.paste((0, 0, 0, 0), (0, 0, 280, 180))  # väggkanten ovanför dammen, vänster om vassen
FLOWERS = plate_piece("angen", (20, 480, 270, 680), [75, 170, 225])


def drive2(stuff):
    """Körscen med alla ombord: kaninen och lammet i fönstren."""
    c, b = drive(stuff)
    in_window(c, b, 2, "lammet-ludde", "ludde-faceless", "happy")
    return c, b

# 8b Körscen 1: ett äppelträd glider förbi
c, b = drive(lambda c: c.paste(TREE, (W - TREE.width + 40, GF + 40 - TREE.height), TREE))
arrow(c, [(1180, 120), (980, 120)], INK)
frames["08b"] = c

# 8c Körscen 2: traktorn plöjer på åkern
def akern(c):
    field(c, 820, W + 40)
    place(c, TUFF, 1120, GF - 20, 190)
c, b = drive(akern)
arrow(c, [(1240, 120), (1040, 120)], INK)
frames["08c"] = c

# 9 Kritsvep (gult)
c = plate("vagen")
swipe(c, (246, 194, 28))
frames["09"] = c

# 10 Bondgården: Bussen kommer, lammet sover
c, _ = farm(bus_x=None)
place(c, BUS, 200, GB + 14, BUS_H, alpha=0.3)
b = place(c, BUS, 560, GB + 14, BUS_H)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless")
arrow(c, [(80, 720), (470, 720)])
frames["10"] = c

# 11 Närbild lammet sover
c, _ = farm(tuff=False)
frames["11"] = crop_zoom(c, 1110, 420, 620)

# 12 Berättaren frågar: hur säger ett lamm?
c, b = farm()
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless")
frames["12"] = c

# 13 Vers 3: Lammet vaknar
c, _ = farm(ludde="happy", tuff=False)
frames["13"] = crop_zoom(c, 1110, 420, 620)

# 14 lammet kliver på
c, b = farm(ludde=None)
door(c, b)
place(c, face(LAMMET, "open"), 1110, GB + 10, FIG_H, alpha=0.3)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless")
in_window(c, b, 2, "lammet-ludde", "ludde-faceless", "happy")
arrow(c, arc_pts((1060, 420), (b[1] + 760 * b[0], 470), 100))
frames["14"] = c

# 15 Panorering: ett varv runt gården, vers 4
c, _ = farm(bus_x=None, ludde=None, tuff=False)
place(c, TUFF, 560, GB - 6, 200)
b = place(c, BUS, 960, GB + 14, BUS_H)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless", "happy")
in_window(c, b, 2, "lammet-ludde", "ludde-faceless", "happy")
for y in (430, 490, 550):
    ImageDraw.Draw(c).line((640, y, 700, y), fill=(255, 255, 255), width=7)
frames["15"] = c

# 16 Alla tutar
c, _ = farm(bus_x=None, ludde=None)
b = place(c, BUS, W / 2, GB + 14, BUS_H)
in_window(c, b, 3, "kaninen-kanel", "kanel-faceless", "happy")
in_window(c, b, 2, "lammet-ludde", "ludde-faceless", "happy")
frames["16"] = c

# 16a Kritsvep (grönt) ut på vägen igen
c, _ = farm(bus_x=None, ludde=None)
swipe(c, (172, 222, 122))
frames["16a"] = c

# 16b Körscen: en damm med en näckros glider förbi
c, b = drive2(lambda c: c.paste(POND, (W - POND.width + 60, GF + 70 - POND.height), POND))
arrow(c, [(1180, 120), (980, 120)], INK)
frames["16b"] = c

# 16c Körscen: blommor på ängen, flygplanet flyger över
def ängen(c):
    for x in (880, 1150):
        c.paste(FLOWERS, (x, GF + 30 - FLOWERS.height), FLOWERS)
    place(c, PELLA, 980, 300, round(PELLA_H * 0.8), rot=4)
c, b = drive2(ängen)
frames["16c"] = c

# 16d Körscen: traktorn vinkar från åkern
def vinkar(c):
    field(c, 820, W + 40)
    place(c, TUFF, 1120, GF - 20, 190, rot=-6)
c, b = drive2(vinkar)
arrow(c, [(1240, 120), (1040, 120)], INK)
frames["16d"] = c

# 16e Kritsvep (ljusblått) till Glasskiosken
c, _ = drive2(lambda c: None)
swipe(c, (120, 196, 228))
frames["16e"] = c

# Sista stoppet: Glasskiosken
GK = 652  # golvlinjen vid kiosken


def cone(canvas, x, y, scoop, k=1.0):
    """En glasstrut i kod: våffla och en kula, med vit kant."""
    d = ImageDraw.Draw(canvas)
    tri = [(x - 30 * k, y), (x + 30 * k, y), (x, y + 80 * k)]
    d.polygon([(a + (a - x) * 0.25, b - 6 * k if b == y else b + 9 * k) for a, b in tri], fill=(255, 255, 255))
    d.ellipse((x - 40 * k, y - 66 * k, x + 40 * k, y + 12 * k), fill=(255, 255, 255))
    d.polygon(tri, fill=(214, 156, 84))
    for i in range(-2, 3):
        d.line((x + i * 12 * k, y, x + i * 6 * k, y + 60 * k), fill=(170, 112, 52), width=3)
    d.ellipse((x - 34 * k, y - 60 * k, x + 34 * k, y + 6 * k), fill=scoop)


def blue_kiosk():
    """Glasskioskens rosa vägg blir ljusblå, så att den rosa kaninen syns (själva kiosken rörs inte)."""
    hsv = np.array(plate("glasskiosken").convert("RGB").convert("HSV")).astype(int)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    wall = (h > 215) & (h < 250) & (s > 90)
    lab, n = ndimage.label(ndimage.binary_closing(wall, iterations=2))
    for i, (cy, cx) in enumerate(ndimage.center_of_mass(wall, lab, range(1, n + 1)), 1):
        if cy < 260 and 200 < cx < 400:  # glasskulan på taket behåller sin färg
            wall[lab == i] = False
    edge = ndimage.binary_dilation(wall, iterations=4) & (h > 200) & (s > 40)
    wall |= edge
    hsv[..., 0] = np.where(wall, 140, h)
    hsv[..., 1] = np.where(wall, (s * 0.55).astype(int), s)
    hsv[..., 2] = np.where(wall, np.minimum(v * 1.0 + 10, 255).astype(int), v)
    return Image.fromarray(hsv.astype("uint8"), "HSV").convert("RGB")


KIOSK = blue_kiosk()


GRODAN = cut("grodan-gurra", "grodan-gurra")
DISK = (80, 512, 432, 690)  # kioskens disk, läggs över grodan så att hon står bakom den


def kiosk(bus_x=1110, folk=True, mood="happy"):
    c = KIOSK.copy()
    place(c, GRODAN, 256, 585, 230)
    c.paste(KIOSK.crop(DISK), DISK[:2])
    if folk:
        place(c, face(KANINEN, mood), 560, GK + 4, KANIN_H)
        place(c, face(LAMMET, mood), 790, GK + 8, FIG_H)
    b = place(c, BUS, bus_x, GK + 14, BUS_H) if bus_x is not None else None
    return c, b


# 16f Bussen stannar, alla går av
c, b = kiosk(folk=False)
door(c, b)
place(c, face(KANINEN, "happy"), 560, GK + 4, KANIN_H, alpha=0.35)
place(c, face(LAMMET, "happy"), 790, GK + 8, FIG_H, alpha=0.35)
arrow(c, arc_pts((b[1] + 760 * b[0], 470), (600, 420), 90), INK)
frames["16f"] = c

# 16g Glass till kaninen och lammet
c, b = kiosk()
cone(c, 655, 470, (250, 214, 226))
cone(c, 885, 480, (182, 228, 202))
frames["16g"] = c

# 17 Zoom ut till papperet
small = frames["16g"].resize((W * 6 // 10, H * 6 // 10), Image.LANCZOS)
c = paper()
c.paste(small, ((W - small.width) // 2, (H - small.height) // 2))
arrow(c, [(250, 120), (150, 60)], INK)
arrow(c, [(1126, 648), (1226, 708)], INK)
frames["17"] = c

# 18 Outro
c = paper()
color_text(c, H * 0.45, "lilla kritan", 110)
frames["18"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for k, im in frames.items():
    im.resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------
# (id, tid, scen, replik eller sångrad, vad som händer, bygg)
SHOTS = [
    ("01", "0:00–0:08", "Intro", "♪ Jingel (3–4 s): Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Fast intro: logotypen lilla kritan ritas i många kritfärger under jingeln, sedan titeln. Gul vägg av vaxkritstreck med papperskorn, kritbokstäver med vit kant som kokar (boil) i filmen, prickar i kanterna och ett litet hjul.", "fast"),
    ("02", "0:08–0:21", "Kritan ritar", "♪ Intro: Kritan ritar, runt, runt, runt, vad kan det vara? (paus 3 s) Ett hjul! Ett hjul som snurrar runt, nu åker vi i väg!", "Kritan ritar en svart cirkel med en gul prick. Paus 3 s för barnet. Zoom in i hjulet, som blir bussens framhjul.", "kod"),
    ("03", "0:21–0:30", "A · Busshållplatsen", "BUSSEN: Tuta-tut! Idag kör jag en tur och hälsar på mina kompisar.", "Kamera 1, helbild. Bussen rullar in från vänster och stannar, hjulen slutar snurra. Kaninen vid bänken. Flygplanet glider förbi långt bort.", "kod"),
    ("04", "0:30–0:59", "A · Busshållplatsen", "♪ Vers 1 + refräng: Här kommer bussen, rund och röd, tuta-tut, hon säger hej! …", "Bussen gungar i takt och tutar på varje ”tut-tut”. Kaninen ler (^ ^).", "kod"),
    ("05", "0:59–1:02", "A · Busshållplatsen", "KANINEN: Bussen! Där är du ju! Ett, två, tre – hopp!", "Kamera 2, närbild på kaninen, glad. Hoppar ner från bänken (duns).", "kod"),
    ("06", "1:02–1:05", "A · Busshållplatsen", "BUSSEN: Hej, kaninen! Vill du åka med? · KANINEN: Ja! Ett, två, tre – hopp!", "Kamera 1. Dörren öppnas (pschhh). Kaninen hoppar i en båge in genom dörren (duns).", "kod"),
    ("07", "1:05–1:21", "A · Busshållplatsen", "♪ Vers 2 + refräng: Ett, två, tre – hopp-hopp! In i bussen hoppar hon …", "Kaninen tittar ut genom fönstret närmast dörren och studsar på varje ”hopp-hopp”.", "kod: fönsterpose"),
    ("08", "1:21–1:25", "A · Busshållplatsen", "BUSSEN: Tuta-tut! Alla ombord! · KANINEN: Vart ska vi nu? · BUSSEN: Till bondgården!", "Dörren stängs (pschhh). Bussen rullar ut åt höger.", "kod"),
    ("08a", "1:25", "Kritsvep", "", "Grönt kritsvep (vägens väggfärg).", "fast"),
    ("08b", "1:25–1:30", "Körscen · Vägen", "♪ Körvers: Brum-brum, vi kör på vägen, förbi ett äppelträd.", "Bussen står still i mitten, gungar lite och hjulen snurrar. Vägen glider åt vänster, och ett äppelträd glider in från höger och förbi. Trädet klipps ur Äppelträdets bakgrund.", "kod"),
    ("08c", "1:30–1:35", "Körscen · Vägen", "♪ Körvers: Traktorn plöjer, tuff-tuff-tuff, och bussen tutar med!", "En åker glider in med traktorn som plöjer. Traktorn tutar och bussen tutar tillbaka. Åkerremsan ritas i kod.", "kod"),
    ("09", "1:35", "Kritsvep", "", "Gult kritsvep (Bondgårdens väggfärg) till Bondgården.", "fast"),
    ("10", "1:35–1:43", "B · Bondgården", "BUSSEN: Tuta-tut! Hej, lammet! · (tyst … snark … pip)", "Kamera 3, helbild. Bussen rullar in och stannar. Traktorn plöjer längst bak. Lammet sover stående vid höet och gungar sakta.", "kod"),
    ("11", "1:43–1:46", "B · Bondgården", "KANINEN: Shh … lammet sover! · BUSSEN: Oj. Han hör inte min tuta.", "Kamera 4, närbild på lammet med stängda ögon.", "kod"),
    ("12", "1:46–1:50", "B · Bondgården", "KANINEN: Vi sjunger för honom!", "Kamera 3. Kaninen tittar på lammet.", "kod"),
    ("13", "1:50–2:00", "B · Bondgården", "♪ Vers 3: Lammet sover vid höet … Hur säger lammet? Kan du det? (paus 3 s) Bä-bä! … god morgon, lilla lamm! · LAMMET: Bä-ä-ä, vad mysigt!", "Kamera 4. Lammet öppnar ett öga på ”ett öga tittar fram” och båda på ”god morgon, lilla lamm”, och ler.", "kod"),
    ("14", "2:00–2:04", "B · Bondgården", "BUSSEN: Tuta-tut! Alla ombord!", "Kamera 3. Dörren öppnas, lammet kliver sömnigt in och tittar ut bredvid kaninen. Dörren stängs.", "kod: fönsterpose"),
    ("15", "2:04–2:10", "B · Bondgården", "♪ Vers 4: Alla sitter i bussen nu, vi kör ett varv på gården …", "Kamera 5, långsam panorering. Bussen kör ett varv runt gården, kaninen och lammet vinkar, traktorn tutar (tuff-tuff).", "kod"),
    ("16", "2:10–2:11", "B · Bondgården", "BUSSEN: Tuta-tut! · KANINEN och LAMMET: Tuta-tut!", "Kamera 6, helbild. Bussen stannar mitt på bilden.", "kod"),
    ("16a", "2:11", "Kritsvep", "BUSSEN: Nu kör vi och köper glass!", "Grönt kritsvep ut på vägen igen.", "fast"),
    ("16b", "2:11–2:16", "Körscen · Vägen", "(musik: refrängen spelas igen i redigeringen, sången har ingen körvers 2)", "Alla ombord: kaninen och lammet i fönstren. En damm med en näckros glider förbi (klippt ur Dammens bakgrund).", "kod"),
    ("16c", "2:16–2:21", "Körscen · Vägen", "(musik: refrängen spelas igen i redigeringen, sången har ingen körvers 2)", "Blommor från ängen glider förbi (klippta ur Ängens bakgrund), och flygplanet flyger över bussen.", "kod"),
    ("16d", "2:21–2:26", "Körscen · Vägen", "(musik: refrängen spelas igen i redigeringen, sången har ingen körvers 2)", "Traktorn står på åkern och gungar som en vinkning när bussen kör förbi.", "kod"),
    ("16e", "2:26", "Kritsvep", "", "Ljusblått kritsvep (Glasskioskens väggfärg) till sista stoppet.", "fast"),
    ("16f", "2:26–2:31", "C · Glasskiosken", "BUSSEN: Sista stoppet! Alla går av! · KANINEN: Glass!", "Kamera 8, helbild. Bussen rullar in och stannar till höger. Dörren öppnas (pschhh), och kaninen och lammet hoppar av och går fram till kiosken.", "kod"),
    ("16g", "2:31–2:36", "C · Glasskiosken", "♪ Glassvers: Sista stopp, där står en kiosk, och grodan säger: glass! En till dig och en till mig, och en till lammet – mums! (grodan sjunger: en till kaninen, en till sig själv) · KANINEN och LAMMET: Mmm!", "Grodan står bakom disken och räcker fram glassen. Kaninen får en rosa glass och lammet en mintgrön. Bussen får ingen glass: den står glad bredvid och tutar.", "kod"),
    ("17", "2:36–2:47", "Avslutning", "♪ Sista refrängen: Tuta-tut, tuta-tut, vi har åkt en lång, lång tur! Lammet vaknade, alla fick glass, tuta-tut och hej, hej då!", "Zoom ut till papperet.", "kod"),
    ("18", "2:47–3:00", "Outro", "♪ Outrojingeln (ingen röst)", "Fast outro.", "fast"),
]

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", "A · Busshållplatsen": "#8E44C9", "Kritsvep": "#F6C21C",
        "B · Bondgården": "#F6C21C", "Körscen · Vägen": "#ACDE7A", "C · Glasskiosken": "#78C4E4", "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + int(s)


rows, scen = [], None
VÄG = {"kod": "Kod-väg · 0 krediter", "fast": "Fast format · görs en gång"}
for sid, tid, sc, rad, vad, bygg in SHOTS:
    if sc != scen:
        if scen:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[sc]}"></span>{html.escape(sc)}</h3><div class="frames">')
        scen = sc
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="960" height="536" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {tid}</div><p class="line">{html.escape(rad)}</p>'
        f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(VÄG.get(bygg.split(":")[0], bygg) + (" ·" + bygg.split(":", 1)[1] if ":" in bygg else ""))}</span></figcaption></figure>')
rows.append("</div>")

tl, total = [], sek("3:00")
for sid, tid, sc, *_ in SHOTS:
    a, _, b = tid.partition("–")
    a, b = sek(a), sek(b or a) + (0 if b else 1)
    tl.append(f'<div style="left:{a / total * 100:.2f}%;width:{(b - a) / total * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {tid}">{sid}</div>')

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bussen hälsar på: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#E5483B;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h2,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--red) }}
h3 {{ font-size:22px; margin:36px 0 12px; display:flex; align-items:center; gap:10px }}
.dot {{ width:14px; height:14px; border-radius:50% }}
.lede {{ color:var(--muted); max-width:70ch; margin:10px 0 0 }}
.stats {{ display:flex; flex-wrap:wrap; gap:12px 36px; margin-top:24px }} .stats div {{ display:grid }}
.stats b {{ font:800 28px var(--display) }} .stats span {{ color:var(--muted); font-size:14px }}
.tl {{ position:relative; height:34px; margin-top:28px; overflow:hidden; border-radius:8px }}
.tl div {{ position:absolute; top:0; bottom:0; border:2px solid var(--paper); border-radius:7px; font:600 11px var(--mono); color:#241f18; display:flex; align-items:center; justify-content:center; overflow:hidden }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }}
.t {{ font:500 12px var(--mono); color:var(--muted) }}
.line {{ font-style:italic; font-weight:700; margin:0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Bussen hälsar på: <span>storyboard</span></h1>
<p class="lede">Avsnitt 003. Bilderna är byggda av de färdiga utklippen och bakgrunderna i <code>assets/</code>, med ansiktet ritat som i koden. Halvgenomskinliga kopior visar var en figur var innan, och pilarna visar rörelsen. Tiderna är från manuset och ändras när sången är gjord.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>4</b><span>platser (regeln: 2)</span></div><div><b>3 + 2</b><span>figurer + statister</span></div><div><b>0</b><span>krediter för video</span></div><div><b>~40</b><span>krediter för bilder (glasstrut, åker)</span></div><div><b>~3:00</b><span>längd (sången 2:37 + jingel och outro)</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Fönsterposerna</b> (kaninen och lammet i bussfönstret) görs i kod: figuren klipps till fönstrets form, precis som här. Rad 5 och 6 i <code>bildlista.md</code> behöver alltså inga nya bilder.</li>
<li><b>Flygplanet på himlen</b> är dess utklipp, litet, och behöver ingen ny bakgrund. Fjärilarna finns redan målade på Bondgårdens vägg (rad 3 och 4 i bildlistan).</li>
<li><b>Lammet sover</b> med stängda ögon (bågar i kod) och vaknar ett öga i taget.</li>
<li><b>Tiderna</b> följer sången <code>sang.m4a</code> (2:37), plus 8 s jingel före. Radernas tider står i <code>rader.txt</code>. Sången har ingen körvers 2, så den andra körsträckan (16a–16e, 15 s) får refrängens musik en gång till i redigeringen.</li>
<li><b>Produktionsväg</b> (ai-video): varje bild görs med kod-vägen, alltså de godkända utklippen animerade i HTML med ansikten i kod, för 0 krediter. Rörelserna är scenrörelser (rulla in, hoppa, glida förbi, gunga), och det är just vad kod-vägen klarar. Ingen bild behöver AI-video. Om en bild ändå ska bli AI-video blir det <code>wan3-0</code> på 480p, 100 krediter för 5 s med bara referenser, eller 200 för 5 s med en pinnfigursguide. Fråga innan.</li>
<li><b>Nya bilder</b>: en glasstrut i kritstil (ca 20 krediter, nu ritad i kod) och, om den ska bli finare, åkerremsan (ca 20).</li>
<li><b>Glasskioskens vägg</b> är ljusblå här i stället för rosa. På rosa försvann den rosa kaninen. Väggen är omfärgad i kod och själva kiosken är orörd. Om den blå väggen ser bra ut ska bakgrundsbilden i <code>assets/</code> få samma färg.</li>
<li><b>Glass är en ny pose</b> för kaninen och lammet (de håller en strut). Båda har redan använt sin nya pose på fönstret, så det blir en andra pose. Struten kan också hållas framför kroppen i kod, utan ny bild.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")
print(f"{len(frames)} bilder, index.html klar")
