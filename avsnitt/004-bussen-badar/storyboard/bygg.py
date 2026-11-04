"""Bygger storyboarden för avsnitt 004 av de färdiga utklippen och bakgrunderna.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter.
Samma grepp som avsnitt 003:s bygg.py: figurerna är de ansiktslösa utklippen med ansiktet ritat som i kit.js.
"""
import html
import math
import random
import re
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
random.seed(4)


def cut(fig, namn):
    return Image.open(A / "karaktarer" / fig / "cut" / f"{namn}.png").convert("RGBA")


def plate(slug):
    return Image.open(A / "bakgrunder" / slug / f"{slug}.png").convert("RGB").resize((W, H))


# Ansiktena, i figurernas egna 1024-koordinater (samma värden som FIGURER i 003/scener/kit.js)
DJUROGON = [(414, 401), (605, 399)]
ANSIKTE = {
    "buss": dict(ogon=[(851, 614), (931, 607)], skala=0.8, mun=(891, 661), munSkala=0.75),
    "grodan": dict(ogon=[(337, 262), (686, 260)], skala=1.45, mun=(512, 392), munSkala=1.4, bredd=2.6),
    "ankan": dict(ogon=DJUROGON, skala=1.0, mun=(508, 466), munSkala=1.3),
}
# Bussen med två stora fönster (0 bakre, 1 vid dörren) och dörren, som i kit.js
WIN = [(148, 364, 236, 141), (414, 361, 234, 139)]
DOOR = (681, 368, 112, 273)


def face(im, vem, mood="open"):
    """Ritar ögon och mun på en ansiktslös figur, som koden gör i filmen. mood: open, happy, sad."""
    im = im.copy()
    d = ImageDraw.Draw(im)
    f = ANSIKTE[vem]
    k = f["skala"]
    for x, y in f["ogon"]:
        r = 26 * k * (1.3 if mood == "big" else 1)
        if mood == "happy":
            d.arc((x - r, y - r * 0.4, x + r, y + r), 200, 340, fill=INK, width=round(8 * k))
        else:
            d.ellipse((x - r, y - r, x + r, y + r), fill="white", outline=INK, width=round(6 * k))
            d.ellipse((x - 10 * k, y - 10 * k, x + 10 * k, y + 10 * k), fill=INK)
            if mood == "sad":  # hängande ögonbryn
                d.line((x - r, y - r * 1.5, x + r, y - r * 1.2), fill=INK, width=round(5 * k))
    if vem == "ankan":
        im.alpha_composite(NABB)
        return im
    mx, my = f["mun"]
    m, b = 18 * f["munSkala"], f.get("bredd", 1)
    if mood == "big":  # förvånad: ett litet o
        d.ellipse((mx - m * 0.7, my - m * 0.5, mx + m * 0.7, my + m), fill=(90, 36, 24))
    elif mood == "sad":
        d.arc((mx - m * b, my, mx + m * b, my + m * 1.4), 200, 340, fill=INK, width=round(6 * f["munSkala"]))
    else:
        d.arc((mx - m * b, my - m, mx + m * b, my + m * 0.8), 20, 160, fill=INK, width=round(6 * f["munSkala"]))
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


def in_window(canvas, bus, win, vem, mood="happy", lift=0):
    """Figurens huvud tittar ut genom ett av bussens fönster (beskuret i kod, ingen ny bild). lift = studs uppåt."""
    s, bx, by = bus
    wx, wy, ww, wh = WIN[win]
    head = face(KROPP[vem], vem, mood)
    k = min(ww, wh * 1.1) * 0.5 / 190 * 0.75 * s
    head = head.resize((round(1024 * k), round(1024 * k)), Image.LANCZOS)
    ogonY = ANSIKTE[vem]["ogon"][0][1]
    cx, cy = bx + (wx + ww / 2) * s, by + (wy + wh * 0.62) * s - lift
    layer = Image.new("RGBA", canvas.size)
    layer.paste(head, (round(cx - 510 * k), round(cy - ogonY * k)), head)
    rect = (bx + wx * s, by + wy * s, bx + (wx + ww) * s, by + (wy + wh) * s)
    mask = Image.new("L", canvas.size)
    ImageDraw.Draw(mask).rounded_rectangle(rect, radius=14 * s, fill=255)
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", canvas.size), mask))
    ImageDraw.Draw(canvas).rounded_rectangle(rect, radius=14 * s, fill=(62, 74, 99))
    canvas.paste(layer, (0, 0), layer)


def door(canvas, bus):
    """Öppen dörr: en mörk öppning där dörren sitter."""
    s, bx, by = bus
    x, y, w, h = DOOR
    ImageDraw.Draw(canvas).rounded_rectangle(
        (bx + x * s, by + y * s, bx + (x + w) * s, by + (y + h) * s), radius=8 * s, fill=(96, 40, 34))


def door_x(bus):
    s, bx, _ = bus
    return bx + (DOOR[0] + DOOR[2] / 2) * s


def win_xy(bus, win):
    s, bx, by = bus
    wx, wy, ww, wh = WIN[win]
    return bx + (wx + ww / 2) * s, by + (wy + wh / 2) * s


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


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


def crayon_text(canvas, xy, text, size, col=INK):
    ImageDraw.Draw(canvas).text(xy, text, font=font(size), fill=col, anchor="mm", stroke_width=5, stroke_fill=(255, 255, 255))


def paper():
    return Image.new("RGB", (W, H), PAPER)


def sun(canvas, cx, cy, r):
    """Solen som kritan ritar: gul cirkel med strålar och ett leende."""
    d = ImageDraw.Draw(canvas)
    for i in range(12):
        a = i * math.pi / 6
        d.line((cx + r * 1.2 * math.cos(a), cy + r * 1.2 * math.sin(a), cx + r * 1.65 * math.cos(a), cy + r * 1.65 * math.sin(a)),
               fill=(240, 176, 20), width=max(4, round(r / 9)))
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(250, 204, 40))
    for _ in range(int(r * 2)):  # kritkorn
        x, y = random.uniform(-r, r), random.uniform(-r, r)
        if x * x + y * y < r * r * 0.9:
            d.line((cx + x, cy + y, cx + x + r / 8, cy + y - r / 18), fill=(236, 184, 26), width=2)


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def plate_piece(slug, box, wall, biggest=False):
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
    piece = Image.fromarray(rgba).crop(box)
    if biggest:  # bara skylten: väggkantens kritstreck hänger ihop med stolpen, så ta bort väggfärgen och behåll största biten
        px = np.array(piece.convert("RGB")).astype(int)
        al = (np.array(piece.getchannel("A")) > 0) & (np.abs(px - wall).sum(2) > 160)
        lab, n = ndimage.label(ndimage.binary_opening(al, iterations=2))
        sizes = np.bincount(lab.ravel())[1:]
        piece.putalpha(Image.fromarray(((lab == sizes.argmax() + 1) * 255).astype("uint8")))
    return piece.crop(piece.getbbox())


# --- Figurer och lager ----------------------------------------------------
BUS = cut("bussen-tva-fonster", "bussen-tva-fonster-faceless")
def anka():
    """Ankan som i kit.js: kroppen med de ritade lemmarna (ben och vänster vinge bakom, höger vinge framför)."""
    c = Image.new("RGBA", (1024, 1024))
    for namn in ("leg-l", "leg-r", "arm-l", "body", "arm-r"):
        c.alpha_composite(cut("ankan-agda", f"ankan-agda-{namn}"))
    return c


KROPP = {"grodan": cut("grodan-gurra", "grodan-gurra-faceless"), "ankan": anka()}
NABB = cut("ankan-agda", "ankan-agda-nabb")  # näbben är ankans mun
FIA = cut("fjarilen-fia", "fia")
PELLA = cut("flygplanet-pella", "flygplanet-pella")
SKYLT = plate_piece("busshallplatsen", (0, 300, 140, 700), [108, 41, 168], biggest=True)  # bara skylten, inte bänken
for _x0, _x1 in ((0, 40), (63, SKYLT.width)):  # väggkanten som korsar stolpen, strax ovanför foten
    SKYLT.paste((0, 0, 0, 0), (_x0, 234, _x1, 250))
VASS = plate_piece("dammen", (1250, 300, W, 610), [44, 190, 160])           # vasstråna ovanför dammen

BUS_H, FIG_H = 330, 240


def bus(c, x, ground, mood="open", alpha=1.0, rot=0):
    return place(c, face(BUS, "buss", mood), x, ground, BUS_H, alpha=alpha, rot=rot)


def fig(c, vem, x, ground, mood="happy", h=FIG_H, **kw):
    return place(c, face(KROPP[vem], vem, mood), x, ground, h, **kw)


def towel(c, x, ground):
    """Grodans lilla handduk över axeln, ritad i kod (randig, ingen ny sak)."""
    d = ImageDraw.Draw(c)
    top = ground - FIG_H * 0.62
    d.polygon([(x + 30, top), (x + 92, top + 6), (x + 86, top + 120), (x + 50, top + 112)], fill=(255, 255, 255))
    d.polygon([(x + 36, top + 6), (x + 86, top + 12), (x + 80, top + 112), (x + 54, top + 106)], fill=(232, 80, 142))
    for i in range(3):
        y = top + 30 + i * 28
        d.line((x + 42, y, x + 84, y + 4), fill=(255, 255, 255), width=6)


# Körscen: bussen står still i mitten, vägen och sakerna glider förbi från höger
GV = 700   # hjulen på vägen
GF = 572   # väggens nederkant på vägen
BUS_X = W / 2 - 60


def road(sky=None):
    c = plate("vagen")
    sun(c, 150, 120, 46)  # solen från kritans teckning står kvar på himlen
    if sky:
        sky(c)
    return c


def speed(c):
    for y in (470, 530, 590):
        ImageDraw.Draw(c).line((250, y, 340, y), fill=(255, 255, 255), width=7)


def stop_sign(c, x):
    c.paste(SKYLT, (round(x - SKYLT.width / 2), GF + 70 - SKYLT.height), SKYLT)


def puddle(c, cx, cy):
    d = ImageDraw.Draw(c)
    d.ellipse((cx - 150, cy - 34, cx + 150, cy + 34), fill=(255, 255, 255))
    d.ellipse((cx - 142, cy - 27, cx + 142, cy + 27), fill=(138, 210, 242))
    for dx in (-60, 40):
        d.arc((cx + dx - 20, cy - 10, cx + dx + 20, cy + 10), 200, 340, fill=(255, 255, 255), width=4)


def splash(c, x, y, k=1.0, col=(255, 255, 255)):
    """Små stänk: droppar som flyger upp i en solfjäder."""
    d = ImageDraw.Draw(c)
    for a in (-60, -30, 0, 30, 60):
        r = math.radians(a - 90)
        px, py = x + 70 * k * math.cos(r), y + 70 * k * math.sin(r)
        d.ellipse((px - 11 * k, py - 15 * k, px + 11 * k, py + 15 * k), fill=(138, 210, 242), outline=col, width=3)


# Lager från bakgrunder/vagen-saker (klippta ur två ark): träd, stuga, staket, brevlåda
def lager(namn):
    return Image.open(A / "bakgrunder" / "vagen-saker" / f"{namn}.png").convert("RGBA")


BJORK, STUGA = (lager(n) for n in ("bjork", "stuga"))

# Badplatsen v2: horisonten y ≈ 447, en stor sjö till höger (x 691–1376, y 474–656), sand till vänster om den,
# vägen (streckad linje) y ≈ 680 framför allt
BAD = plate("badplatsen")
BAD.paste(BAD.crop((520, 290, 660, 470)), (375, 290))  # mittenträdet bort (täcks med väggen bredvid)
place(BAD, BJORK, 600, 458, 175)
SOL = (1180, 110)
sun(BAD, *SOL, 46)  # samma sol som på vägen; regnmolnet glider över den
GB = 705  # bussens hjul på vägen
VATTEN = np.zeros((H, W), bool)
_a = np.array(BAD).astype(int)
VATTEN[460:] = np.abs(_a[460:] - [130, 203, 235]).sum(2) < 70
VATTEN = ndimage.binary_closing(VATTEN, iterations=4)


def in_water(c, below):
    """Lägger tillbaka vattnet framför figurerna nedanför `below`, så att de står i vattnet."""
    m = VATTEN.copy()
    m[:below] = False
    c.paste(BAD, (0, 0), Image.fromarray((m * 255).astype("uint8")))


# Lager från avsnitt 003 till körscenerna (inga nya bilder)
TUFF = cut("traktorn-tuff", "traktorn-tuff")


def tree():
    """Äppelträdet klipps ur Äppelträdets bakgrund (som i 003)."""
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
    return Image.fromarray(rgba).crop((1050, 60, W, 650))


def field(canvas, x0, x1):
    """En plöjd åkerremsa längs väggens nederkant (kritränder i kod, som i 003)."""
    d = ImageDraw.Draw(canvas, "RGBA")
    d.rounded_rectangle((x0, GF - 95, x1, GF + 6), 30, fill=(150, 96, 56))
    for y in range(GF - 80, GF, 16):
        for _ in range(int((x1 - x0) / 10)):
            x = random.uniform(x0 + 10, x1 - 30)
            d.line((x, y + random.uniform(-2, 2), x + 26, y + random.uniform(-2, 2)), fill=(110, 66, 36, 160), width=4)


TREE = tree()
POND = plate_piece("dammen", (950, 410, W, 740), [44, 190, 160])
FLOWERS = plate_piece("angen", (20, 480, 270, 680), [75, 170, 225])


def drive(stuff=None, grodan=False, ankan=False, mood="happy", lift=(0, 0)):
    """Körscen: bussen i mitten, vägen glider, `stuff` glider förbi bakom bussen."""
    c = road()
    if stuff:
        stuff(c)
    speed(c)
    b = bus(c, BUS_X, GV, mood, rot=-1)
    if grodan:
        in_window(c, b, 0, "grodan", lift=lift[0])
    if ankan:
        in_window(c, b, 1, "ankan", lift=lift[1])
    return c, b


def beach(bus_x=330, mood="open", fjaril=True):
    c = BAD.copy()
    if fjaril:
        place(c, FIA, 860, 220, 90, rot=8)  # en fjäril över sanden, den enda som rör sig i bakgrunden
    b = bus(c, bus_x, GB, mood) if bus_x is not None else None
    return c, b


def bathers(c, mood="happy"):
    fig(c, "grodan", 1080, 620, mood, h=210)
    fig(c, "ankan", 1240, 626, mood, h=215)
    in_water(c, 585)


frames = {}
REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size):
    f = font(size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=f) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=f, fill=REGNBÅGE[i % len(REGNBÅGE)],
               anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
        x += d.textlength(ch, font=f)


# 01 Intro: samma intro som avsnitt 3 ("Kort i himlen"), med ny titel. Stillbilden renderas ur intro-skiss.html.
frames["01"] = Image.open(HÄR / "intro-01.png").convert("RGB").resize((W, H), Image.LANCZOS)

# 02 Kritan ritar en sol
c = paper()
sun(c, W / 2, H / 2, 150)
ImageDraw.Draw(c).polygon([(1000, 250), (1100, 150), (1130, 180), (1030, 280)], fill=(242, 140, 124))
frames["02"] = c

# 03 Zoom in: solen blir solen på himlen, bussen står redan på vägen
c = road()
bus(c, BUS_X, GV, "happy")
d = ImageDraw.Draw(c)
for r in (90, 130):
    d.ellipse((150 - r, 120 - r, 150 + r, 120 + r), outline=(255, 255, 255), width=5)
frames["03"] = c

# 04 Körscen 1, vers 1: en fjäril fladdrar förbi inom 2 s
c, b = drive(lambda c: (place(c, FIA, 1000, 260, 100, rot=8), arrow(c, [(1120, 200), (900, 280)], INK)))
frames["04"] = c

# 05 Körscen 1: ett äppelträd glider förbi
c, b = drive(lambda c: (c.paste(TREE, (W - TREE.width + 40, GF + 40 - TREE.height), TREE), arrow(c, [(1180, 120), (980, 120)], INK)))
frames["05"] = c

# 06 Körscen 1: traktorn plöjer på åkern och tutar
c, b = drive(lambda c: (field(c, 820, W + 40), place(c, TUFF, 1120, GF - 20, 190), arrow(c, [(1240, 120), (1040, 120)], INK)))
frames["06"] = c

# 07 Stopp 1: skylten och vassen glider in, grodan väntar med handduk
def stopp1(c, grodan=True, mood="happy"):
    stop_sign(c, 1080)
    c.paste(VASS, (1240, GF + 40 - VASS.height), VASS)
    if grodan:
        fig(c, "grodan", 1180, GF + 140, mood)
        towel(c, 1180, GF + 140)

c = road()
stopp1(c, mood="open")
bus(c, BUS_X, GV)
frames["07"] = c

# 08 Närbild grodan
c = road()
stopp1(c)
frames["08"] = crop_zoom(c, 1170, 560, 560)

# 09 Grodan hoppar in själv
c = road()
stopp1(c, grodan=False)
b = bus(c, BUS_X, GV)
door(c, b)
fig(c, "grodan", 1180, GF + 140, alpha=0.3)
dx = door_x(b)
fig(c, "grodan", dx + 90, GV - 90)
arrow(c, arc_pts((1150, 470), (dx + 60, 470), 120), INK)
frames["09"] = c

# 10 Vers 2: vägen glider igen, grodan i bakre fönstret
c, b = drive(grodan=True, lift=(18, 0))
frames["10"] = c

# 11 Körscen 2: en damm med en näckros glider förbi
c, b = drive(lambda c: (c.paste(POND, (W - POND.width + 60, GF + 70 - POND.height), POND), arrow(c, [(1180, 120), (980, 120)], INK)), grodan=True)
frames["11"] = c

# 12 Körscen 2: blommor från ängen glider förbi
c, b = drive(lambda c: [c.paste(FLOWERS, (x, GF + 30 - FLOWERS.height), FLOWERS) for x in (880, 1150)], grodan=True)
arrow(c, [(1240, 120), (1040, 120)], INK)
frames["12"] = c

# 13 Stopp 2: pölen och skylten, ankan plaskar
def stopp2(c, ankan=True, mood="happy"):
    place(c, STUGA, 1330, GF + 10, 200)
    stop_sign(c, 1050)
    puddle(c, 1210, GF + 110)
    if ankan:
        fig(c, "ankan", 1210, GF + 118, mood)
        splash(c, 1060, GF + 100, 0.8)
        splash(c, 1360, GF + 100, 0.8)

c = road()
stopp2(c, mood="open")
b = bus(c, BUS_X, GV)
in_window(c, b, 0, "grodan")
frames["13"] = c

# 14 Närbild ankan
c = road()
stopp2(c)
frames["14"] = crop_zoom(c, 1200, 540, 560)

# 15 Ankan hoppar in
c = road()
stopp2(c, ankan=False)
b = bus(c, BUS_X, GV)
door(c, b)
in_window(c, b, 0, "grodan")
fig(c, "ankan", 1210, GF + 118, alpha=0.3)
dx = door_x(b)
fig(c, "ankan", dx + 90, GV - 90)
arrow(c, arc_pts((1180, 470), (dx + 60, 470), 120), INK)
frames["15"] = c

# 16 Vers 3: hur många kompisar? Under pausen räknar grodan och ankan på fingrarna (ledtråd),
# sedan svaret: En (grodan studsar), två (ankan studsar)
def finger(c, x, y, n, col):
    """En liten hand som håller upp n fingrar (grodans hand, ankans vingspets), ritad i kod."""
    d = ImageDraw.Draw(c)
    for k, ring in ((8, (255, 255, 255)), (0, col)):
        d.ellipse((x - 30 - k, y - 26 - k, x + 30 + k, y + 30 + k), fill=ring)
        for i in range(n):
            fx = x - 12 * (n - 1) + 24 * i
            d.rounded_rectangle((fx - 9 - k, y - 74 - k, fx + 9 + k, y - 10 + k), 9 + k, fill=ring)


c, b = drive(grodan=True, ankan=True, lift=(18, 0))
for i, col in enumerate(((110, 178, 72), (250, 214, 92))):
    x, y = win_xy(b, i)
    finger(c, x + 80, y + 40, i + 1, col)
for i, n in enumerate(("1", "2")):
    x, y = win_xy(b, i)
    crayon_text(c, (x, y - 150), n, 90, REGNBÅGE[i * 4])
frames["16"] = c


# 17 Körscen 3, platt bit: flygplanet glider högt uppe, inget annat rör sig (före backen)
c, b = drive(lambda c: (place(c, PELLA, 1000, 230, 150, rot=4), arrow(c, [(1180, 110), (930, 110)], INK)), grodan=True, ankan=True)
frames["17"] = c

# Den stora backen från 003 (korscen-0/branta.js), samma profiler i kod, 1920×1080 skalat till bilden. Inga nya bilder.
K3 = W / 1920
BACKE3 = lambda x: 1000 - 540 * math.exp(-(((x - 960) / (430 if x < 960 else 370)) ** 2))
BORT3 = lambda x: 610 - 110 * math.sin(2 * math.pi * (x + 200) / 900) - 45 * math.sin(2 * math.pi * x / 410)
MITT3 = lambda x: 760 - 150 * math.sin(2 * math.pi * (x - 100) / 1300)


def grader3(x):
    return math.degrees(math.atan((BACKE3(x + 6) - BACKE3(x - 6)) / 12))


_v = np.array(plate("vagen").convert("L")).astype(float)
KORN = _v - ndimage.gaussian_filter(_v, 6)  # vägplattans kritkorn, läggs på backen så att den ser ritad ut


def moln(d, cx, cy, s):
    for k, col in ((10, (255, 255, 255)), (0, (251, 250, 244))):
        for dx, dy, r in ((-70, 10, 46), (0, -14, 62), (72, 8, 44)):
            d.ellipse((cx + (dx - r - k) * s, cy + (dy - r - k) * s, cx + (dx + r + k) * s, cy + (dy + r + k) * s), fill=col)


def hill():
    c = Image.new("RGB", (W, H), (177, 224, 238))
    d = ImageDraw.Draw(c)
    xs = range(-140, 2061, 16)
    moln(d, 380 * K3, 170 * K3, 0.75)
    moln(d, 1260 * K3, 120 * K3, 0.6)
    for f, col in ((BORT3, (207, 232, 164)), (MITT3, (169, 215, 122)), (lambda x: BACKE3(x) - 18, (140, 195, 95))):
        pts = [(x * K3, f(x) * K3) for x in xs]
        d.polygon(pts + [(2060 * K3, H + 20), (-140 * K3, H + 20)], fill=col)
        d.line(pts, fill=(255, 255, 255), width=10, joint="curve")
    vag = [(x * K3, BACKE3(x) * K3) for x in range(-140, 2061, 8)]
    d.line(vag, fill=(255, 255, 255), width=37, joint="curve")
    d.line(vag, fill=(232, 228, 218), width=29, joint="curve")
    for n in range(0, len(vag) - 1, 6):  # streckad mittlinje
        d.line(vag[n:n + 4], fill=(142, 142, 138), width=4)
    a = np.array(c).astype(float) + KORN[..., None] * 1.4
    c = Image.fromarray(np.clip(a, 0, 255).astype("uint8"))
    sun(c, 150, 120, 46)  # samma sol som på vägen
    return c


def hill_bus(c, x, mood="happy", h=200):
    """Bussen med kompisarna i fönstren på backen vid x (003-koordinater), lutad efter vägen (grader i 003)."""
    tmp = Image.new("RGBA", (W, H))
    b = bus(tmp, W / 2, H - 10, mood)
    in_window(tmp, b, 0, "grodan", "big" if mood == "big" else "happy")
    in_window(tmp, b, 1, "ankan", "big" if mood == "big" else "happy")
    x0, y0, x1, y1 = tmp.getbbox()
    m = x1 - x0  # luft runt bussen så att hörnen inte klipps när den vrids
    tmp = tmp.crop((x0 - m, y0 - m, x1 + m, y1 + m))
    place(c, tmp, x * K3, (BACKE3(x) + 14) * K3, h, rot=max(-24, min(24, -grader3(x))))  # lutar lugnt


# 17a Uppför den stora backen: lugnt, lutar med vägen, inget gupp på vägen upp
c = hill()
hill_bus(c, 760, h=200, mood="open")
arrow(c, arc_pts((640, 300), (740, 230), 20), INK)
frames["17a"] = c

# 17b På toppen: vägen stannar. Grodan och ankan tittar ut: Titta, där är badplatsen! Rakt klipp till 18.
c = hill()
hill_bus(c, 960, mood="big")
crayon_text(c, (960 * K3, 120), "Titta!", 52, REGNBÅGE[0])
arrow(c, [(860, 210), (1080, 210)], INK)
frames["17b"] = c

# 18 Badplatsen: bussen är redan halvvägs inne vid klippet, stannar, dörren öppnas
c, _ = beach(bus_x=None)
bus(c, 60, GB, alpha=0.3)
b = bus(c, 330, GB, "happy")
door(c, b)
in_window(c, b, 0, "grodan")
in_window(c, b, 1, "ankan")
arrow(c, [(-20, 740), (250, 740)], INK)
frames["18"] = c

# Problemet: vattnet är kallt. Ankan visar först, grodan gör likadant (en sak rör sig i taget).
KANT = 740  # sanden vid sjöns vänstra kant; vattnet börjar vid x ≈ 790 längst ner


def ripple(c, x, y):
    """Plipp: en liten vattenring där en tå doppas."""
    d = ImageDraw.Draw(c)
    for r in (16, 30):
        d.ellipse((x - r * 1.6, y - r * 0.5, x + r * 1.6, y + r * 0.5), outline=(255, 255, 255), width=4)


def shiver(c, x, top, h):
    """Huttrar: korta streck på båda sidor om figuren."""
    d = ImageDraw.Draw(c)
    for side in (-1, 1):
        for i in range(3):
            y = top + h * (0.3 + i * 0.15)
            x0 = x + side * (h * 0.48 + 6 * i)
            d.line((x0, y, x0 + side * 22, y - 8), fill=INK, width=5)


# 18a Grodan doppar en tå vid vattenbrynet: Brr! Kallt!
c, b = beach(mood="happy")
fig(c, "grodan", KANT, 640, "big", h=210)
ripple(c, KANT + 80, 628)
shiver(c, KANT, 640 - 210, 210)
crayon_text(c, (KANT, 330), "Brr!", 56, REGNBÅGE[1])
frames["18a"] = c

# 18b Närbild grodan, förvånad (kamera 2 igen)
frames["18b"] = crop_zoom(c, KANT, 520, 560)

# 18c Först tårna: ankan doppar först, grodan gör likadant
c, b = beach(mood="happy")
fig(c, "grodan", KANT - 60, 650, h=210, alpha=0.9)
fig(c, "ankan", KANT + 90, 640, h=215)
ripple(c, KANT + 160, 630)
crayon_text(c, (KANT + 60, 330), "först tårna …", 44, REGNBÅGE[3])
frames["18c"] = c

# 18d … sen fötterna: båda står i vattnet med fötterna
c, b = beach(mood="happy")
fig(c, "grodan", 950, 632, h=210)
fig(c, "ankan", 1100, 640, h=215)
in_water(c, 608)
ripple(c, 950, 630)
ripple(c, 1100, 638)
crayon_text(c, (1030, 330), "… sen fötterna", 44, REGNBÅGE[4])
frames["18d"] = c

# 18e Ett, två, tre – hopp! Båda hoppar i: Det är skönt!
c, b = beach(mood="happy")
fig(c, "grodan", 1000, 510, h=210)
fig(c, "ankan", 1160, 516, h=215)
splash(c, 1000, 615, 0.9)
splash(c, 1160, 622, 0.9)
crayon_text(c, (1080, 140), "hopp!", 56, REGNBÅGE[0])
frames["18e"] = c

# 19 Vers 4: grodan och ankan hoppar i vattnet och plaskar
c, b = beach()
bathers(c)
splash(c, 1010, 612, 0.8)
splash(c, 1310, 618, 0.8)
arrow(c, arc_pts((800, 520), (1060, 520), 110), INK)
frames["19"] = c

# 20 Närbild bussen: glad, tutar i takt
c, b = beach(mood="happy")
s, bx, by = b
crayon_text(c, (bx + 900 * s, by + 470 * s), "tut!", 44, REGNBÅGE[0])
frames["20"] = crop_zoom(c, bx + 860 * s, by + 600 * s, 520)

# 21 Tack för skjutsen! Varsågod! Alla vinkar
c, b = beach(mood="happy")
fig(c, "grodan", 1080, 620, h=210, rot=-6)
fig(c, "ankan", 1240, 626, h=215, rot=6)
in_water(c, 585)
frames["21"] = c

# Regnet under sista refrängen (manus SCEN B "Regnet"): molnet i kod som i 003, väggen mörknar lite,
# dropparna är det enda som rör sig i bakgrunden. Inget åska.
HORISONT = 447


def cloud(c, cx, cy, s=1.0):
    d = ImageDraw.Draw(c)
    for k, col in ((10, (255, 255, 255)), (0, (178, 184, 196))):
        for dx, dy, r in ((-70, 10, 46), (0, -14, 62), (72, 8, 44)):
            d.ellipse((cx + (dx - r - k) * s, cy + (dy - r - k) * s, cx + (dx + r + k) * s, cy + (dy + r + k) * s), fill=col)


def rain(c, dark=0.82):
    """Mörkare vägg ovanför horisonten och droppar som faller (vita kanter, ljusblå)."""
    wall = c.crop((0, 0, W, HORISONT)).point(lambda v: int(v * dark))
    c.paste(wall, (0, 0))
    d = ImageDraw.Draw(c)
    rnd = random.Random(7)
    for _ in range(22):
        x, y = rnd.uniform(620, W - 40), rnd.uniform(190, 430)
        d.ellipse((x - 9, y - 15, x + 9, y + 15), fill=(255, 255, 255))
        d.ellipse((x - 6, y - 11, x + 6, y + 11), fill=(138, 210, 242))


def regn_bad(sky=True, mood="happy", rot=(0, 0)):
    c, b = beach(mood=mood, fjaril=not sky)
    if sky:
        cloud(c, SOL[0] + 10, SOL[1] + 10, 1.1)
        rain(c)
    global GRODMUN
    fs, fx, fy = fig(c, "grodan", 1080, 620, mood, h=210, rot=rot[0])
    GRODMUN = (fx + 512 * fs, fy + 392 * fs)
    fig(c, "ankan", 1240, 626, mood, h=215, rot=rot[1])
    in_water(c, 585)
    return c, b


# 21a Molnet glider över solen, några droppar: Kväk! Det regnar! Kvack-kvack! Vi är ju redan blöta!
c, b = beach(mood="open", fjaril=False)
cloud(c, SOL[0] + 10, SOL[1] + 10, 1.1)
rain(c)
fig(c, "grodan", 1080, 620, "big", h=210)
fig(c, "ankan", 1240, 626, "happy", h=215)
in_water(c, 585)
arrow(c, [(1460, 70), (1300, 70)], INK)
crayon_text(c, (1080, 340), "plitt-platt", 40, REGNBÅGE[1])
frames["21a"] = c

# 21b Sista refrängen i regnet: de plaskar vidare, grodan fångar en droppe på tungan
c, b = regn_bad()
splash(c, 1010, 612, 0.8)
splash(c, 1310, 618, 0.8)
d = ImageDraw.Draw(c)
mx, my = GRODMUN
d.rounded_rectangle((mx - 14, my - 46, mx + 14, my + 4), 14, fill=(255, 255, 255))
d.rounded_rectangle((mx - 10, my - 42, mx + 10, my), 10, fill=(232, 110, 140))  # tungan ut mot droppen
d.ellipse((mx - 12, my - 96, mx + 12, my - 60), fill=(255, 255, 255))
d.ellipse((mx - 9, my - 92, mx + 9, my - 64), fill=(138, 210, 242))
frames["21b"] = c

# 21c Närbild bussen i regnet, blank: Tuta-tut! Nu badar jag också!
c, b = regn_bad(mood="happy")
s, bx, by = b
d = ImageDraw.Draw(c)
for x0, y0 in ((200, 470), (260, 500), (440, 460), (520, 505)):  # blanka streck på lacken
    d.line((bx + x0 * s * 2.2, by + y0 * s * 1.0, bx + (x0 + 40) * s * 2.2, by + (y0 - 30) * s), fill=(255, 255, 255), width=7)
crayon_text(c, (bx + 900 * s, by + 470 * s), "tut!", 44, REGNBÅGE[0])
for x, y in ((bx + 640 * s, by + 300 * s), (bx + 760 * s, by + 380 * s), (bx + 980 * s, by + 330 * s), (bx + 1040 * s, by + 560 * s)):
    d.ellipse((x - 9, y - 15, x + 9, y + 15), fill=(255, 255, 255))
    d.ellipse((x - 6, y - 11, x + 6, y + 11), fill=(138, 210, 242))
frames["21c"] = crop_zoom(c, bx + 860 * s, by + 600 * s, 520)

# 21d Molnet glider bort, solen kommer tillbaka, alla vinkar
c, b = beach(mood="happy")
cloud(c, W - 40, SOL[1] + 10, 1.1)
arrow(c, [(1240, 70), (1400, 70)], INK)
fig(c, "grodan", 1080, 620, h=210, rot=-6)
fig(c, "ankan", 1240, 626, h=215, rot=6)
in_water(c, 585)
frames["21d"] = c

# 22 Zoom ut till papperet
small = frames["21d"].resize((W * 6 // 10, H * 6 // 10), Image.LANCZOS)
c = paper()
c.paste(small, ((W - small.width) // 2, (H - small.height) // 2))
arrow(c, [(250, 120), (150, 60)], INK)
arrow(c, [(1126, 648), (1226, 708)], INK)
frames["22"] = c

# 23 Outro
c = paper()
color_text(c, H * 0.45, "lilla kritan", 110)
fig(c, "grodan", 520, 700, h=170)
fig(c, "ankan", 860, 700, h=180)
frames["23"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for f in out.glob("*.jpg"):
    f.unlink()
for k, im in frames.items():
    im.resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------
# (id, tid, scen, replik eller sångrad, vad som händer, kamera)
SHOTS = [
    ("01", "0:00–0:11", "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som avsnitt 3: kortet i himlen, fjärilen och solen. Bara numret och titeln är nya: Avsnitt 4 · Vi ska bada!", "fast"),
    ("02", "0:11–0:28", "Kritan ritar", "♪ Kritan ritar, runt och gult, vad kan det vara? (paus 4–5 s) … En sol!", "Kritan ritar en gul cirkel och strålar. Pausen är 4–5 s, sedan ler solen.", "papper"),
    ("03", "0:28–0:30", "A · Vägen", "(swoosh)", "Zoom in: solen blir solen på himlen. Bussen står redan på vägen när zoomen landar.", "zoom in"),
    ("04", "0:30–0:52", "A · Vägen", "BUSSEN: Tuta-tut! Idag är det varmt. Vi ska bada! · ♪ Vers 1 + refräng", "Körscen 1. Bussen gungar i takt, hjulen snurrar, vägen glider. En fjäril fladdrar förbi inom första sekunden.", "1 körscen"),
    ("05", "0:52–0:58", "A · Vägen", "♪ Körvers 1", "Ett äppelträd glider in från höger och förbi (klippt ur Äppelträdets bakgrund).", "1 körscen"),
    ("06", "0:58–1:05", "A · Vägen", "♪ Körvers 1 · (tuff-tuff)", "Åkern glider in, traktorn plöjer och tutar, bussen tutar tillbaka.", "1 körscen"),
    ("07", "1:05–1:13", "A · Vägen", "BUSSEN: Tuta-tut!", "Skylten och vassen glider in, vägen stannar. Grodan väntar med en randig handduk över axeln (kod).", "1 körscen"),
    ("08", "1:13–1:15", "A · Vägen", "GRODAN: Kväk-kväk! Bussen! Jag vill bada!", "Närbild på grodan, glad. 2 s.", "2 närbild"),
    ("09", "1:15–1:27", "A · Vägen", "BUSSEN: Hej, grodan! Kliv på! · GRODAN: Ett, två, tre – hopp!", "Dörren öppnas (pschhh). Grodan hoppar in själv. Dörren stängs.", "1 körscen"),
    ("10", "1:27–1:50", "A · Vägen", "♪ Vers 2 + refräng: … hopp, hopp, hopp! In i bussen, hej, hej, hej!", "Vägen glider. Grodan i det bakre fönstret studsar på ”hopp” och vinkar på ”hej”.", "1 körscen · fönsterpose"),
    ("11", "1:50–1:57", "A · Vägen", "♪ Körvers 2", "Körscen 2: en damm med en näckros glider förbi (klippt ur Dammens bakgrund). Grodan tittar.", "1 körscen"),
    ("12", "1:57–2:04", "A · Vägen", "♪ Körvers 2", "Blommor från ängen glider förbi (klippta ur Ängens bakgrund).", "1 körscen"),
    ("13", "2:04–2:12", "A · Vägen", "BUSSEN: Tuta-tut!", "Pölen, skylten och ankans röda stuga med staket glider in, vägen stannar. Ankan plaskar i pölen.", "1 körscen"),
    ("14", "2:12–2:14", "A · Vägen", "ANKAN: Kvack-kvack! Ska ni bada? Vänta på mig!", "Närbild på ankan, glad. 2 s.", "3 närbild"),
    ("15", "2:14–2:26", "A · Vägen", "BUSSEN: Hej, ankan! Kliv på! · ANKAN och GRODAN: Ett, två, tre – hopp!", "Dörren öppnas. Ankan hoppar in själv. Grodan ser på från sitt fönster.", "1 körscen"),
    ("16", "2:26–2:44", "A · Vägen", "♪ Vers 3: Kompisar i bussen nu, hur många kan du se? (paus 4–5 s) En – och två!", "Pausen har en ledtråd: grodan håller upp ett finger, sedan ankan två med vingen, så att barnet kan räkna med på sina fingrar. Svaret kommer efter pausen: grodan studsar på ”en”, ankan på ”två” (siffrorna bara i storyboarden).", "1 körscen · fönsterpose"),
    ("17", "2:44–2:50", "A · Vägen", "", "Körscen 3, platt bit: flygplanet glider högt uppe, inget annat rör sig. Sedan börjar backen.", "1 körscen"),
    ("17a", "2:50–2:57", "A · Backen", "BUSSEN: Oj, vilken backe! Brum … brum …", "Den stora backen från 003 (branta.js, i kod). Bussen kör lugnt uppför och lutar med vägen, inget gupp. Inget annat rör sig.", "6 helbild backen"),
    ("17b", "2:57–3:04", "A · Backen", "GRODAN och ANKAN: Titta, där är badplatsen!", "På toppen stannar vägen. Grodan och ankan tittar ut genom fönstren med stora ögon. Rakt klipp till 18.", "6 helbild backen"),
    ("18", "3:04–3:16", "B · Badplatsen", "BUSSEN: Tuta-tut! Nu är vi framme! (pschhh)", "Rakt klipp. Helbild. Bussen är redan halvvägs inne från vänster och stannar vid sanden. Dörren öppnas. En fjäril.", "4 helbild"),
    ("18a", "3:16–3:20", "B · Badplatsen", "GRODAN: Brr! Kallt!", "Problemet. Grodan står vid vattenbrynet, doppar en tå (plipp), drar tillbaka den och huttrar. Förvånad, inte rädd.", "4 helbild"),
    ("18b", "3:20–3:22", "B · Badplatsen", "(grodan huttrar)", "Närbild på grodan, förvånad. 2 s.", "2 närbild"),
    ("18c", "3:22–3:26", "B · Badplatsen", "ANKAN: Kvack! Gör som jag. Först tårna …", "Ankan doppar tårna först (plipp), sedan gör grodan likadant. En i taget.", "4 helbild"),
    ("18d", "3:26–3:30", "B · Badplatsen", "ANKAN: … sen fötterna …", "Ankan kliver i med fötterna, grodan gör likadant (plipp, plipp). Vattnet ligger framför fötterna.", "4 helbild"),
    ("18e", "3:30–3:35", "B · Badplatsen", "ALLA: Ett, två, tre – hopp! · GRODAN: Kväk-kväk! Det är skönt!", "Båda hoppar i (plask) och ler.", "4 helbild"),
    ("19", "3:35–3:53", "B · Badplatsen", "GRODAN: Plask! · ANKAN: Plask! · ♪ Vers 4 + refräng", "Grodan och ankan hoppar ut och i vattnet och plaskar på varje ”plask”.", "4 helbild"),
    ("20", "3:53–3:56", "B · Badplatsen", "BUSSEN: Tuta-tut!", "Närbild på bussen, glad, tutar i takt med plasket. 2,5 s.", "5 närbild"),
    ("21", "3:56–4:00", "B · Badplatsen", "BUSSEN: Tuta-tut! Ha det så roligt! · GRODAN och ANKAN: Tack, bussen!", "Helbild. Grodan och ankan i vattnet, bussen tutar.", "4 helbild"),
    ("21a", "4:00–4:04", "B · Badplatsen", "GRODAN: Kväk! Det regnar! · ANKAN: Kvack-kvack! Vi är ju redan blöta!", "Ett mjukt grått moln (kod, som i 003) glider in över solen, väggen mörknar lite, några droppar faller (plitt … plitt-platt). Fjärilen är borta. Inget åska.", "4 helbild"),
    ("21b", "4:04–4:10", "B · Badplatsen", "", "Sista refrängen i regnet: de plaskar vidare i takt. Grodan fångar en droppe på tungan. Dropparna är det enda som rör sig i bakgrunden.", "4 helbild"),
    ("21c", "4:10–4:12", "B · Badplatsen", "BUSSEN: Tuta-tut! Nu badar jag också!", "Närbild på bussen i regnet, blank och glad. 2 s.", "5 närbild"),
    ("21d", "4:12–4:15", "B · Badplatsen", "", "Molnet glider bort, solen kommer tillbaka, väggen ljusnar. Alla vinkar.", "4 helbild"),
    ("22", "4:15–4:18", "Avslutning", "", "Zoom ut till papperet i solsken. Grodan hoppar, ankan plaskar, alla vinkar.", "zoom ut"),
    ("23", "4:18–4:28", "Outro", "♪ Outrojingeln (ingen röst)", "Fast outro: figurerna tittar fram och vinkar.", "fast"),
]

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", "A · Vägen": "#A6D86B", "A · Backen": "#5C9E3A", "B · Badplatsen": "#3A6FD8",
        "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + int(s)


# Sångraderna läses ur sang.md, så att storyboarden följer med när sången ändras.
# Varje avsnitt "## Namn (bild 05–06)" hör till de bilderna; ett avsnitt utan bildnummer (Refräng) hör till det förra.
IDS = [r[0] for r in SHOTS]


def nr(i):
    return re.match(r"\d+", i).group()


def bilder(spec):
    efter = spec.startswith("efter ")
    spec = spec.removeprefix("efter ").replace("bild ", "").strip()
    a, _, b = spec.partition("–")
    if efter:
        return [i for i in IDS if nr(i) == a and i != a]
    if not b:
        return [i for i in IDS if nr(i) == a] if a.isdigit() else [a]
    first = next(n for n, i in enumerate(IDS) if i == a or nr(i) == a)
    last = max(n for n, i in enumerate(IDS) if i == b or (b.isdigit() and nr(i) == b))
    return IDS[first:last + 1]


SÅNG = {i: [] for i in IDS}
mål = None
for rad in (HÄR.parent / "sang.md").read_text(encoding="utf-8").splitlines():
    rad = rad.strip()
    if rad.startswith("## "):
        m = re.search(r"\(((?:efter )?bild [^)]+)\)", rad)
        namn = re.sub(r"\s*\(.*\)", "", rad[3:]).strip()
        if m:
            mål = bilder(m.group(1))
        if mål:
            SÅNG[mål[0]].append(("rubrik", namn))
            for i in mål[1:]:
                SÅNG[i].append(("forts", namn))
        continue
    if rad.startswith("---"):
        mål = None
    if not mål or not rad or rad.startswith(("-", "**", "#")):
        continue
    ins = re.match(r"\*\(instrumental paus, bild ([^:]+): (.+)\)\*$", rad)
    if ins:
        spec = ins.group(1).strip()
        for n, i in enumerate([spec] if spec.isdigit() else bilder(spec)):
            SÅNG[i].append(("instr", ins.group(2) if n == 0 else "forts."))
    elif rad.startswith("*("):
        if "paus" in rad:
            SÅNG[mål[0]].append(("paus", rad.strip("*()")))
    elif not rad.startswith("*"):
        SÅNG[mål[0]].append(("sjungs", rad))


def sång_html(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        t = html.escape(text)
        if typ == "rubrik":
            ut.append(f'<div class="sh">♪ {t}</div>')
        elif typ == "forts":
            ut.append(f'<div class="sh">♪ {t} (forts.)</div>')
        elif typ == "sjungs":
            ut.append(f'<div class="sung">{t}</div>')
        elif typ == "paus":
            ut.append(f'<div class="pause">{t}</div>')
        else:
            ut.append(f'<div class="pause">instrumental paus: {t}</div>')
    return f'<div class="song">{"".join(ut)}</div>' if ut else ""


def repliker(rad):
    """Bara det som sägs; sångens delar (♪) visas för sig ur sang.md."""
    return " · ".join(d for d in rad.split(" · ") if d and not d.startswith("♪"))


rows, scen = [], None
for sid, tid, sc, rad, vad, kamera in SHOTS:
    if sc != scen:
        if scen:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[sc]}"></span>{html.escape(sc)}</h3><div class="frames">')
        scen = sc
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="960" height="536" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {tid} (preliminärt)</div>'
        + (f'<p class="line">{html.escape(repliker(rad))}</p>' if repliker(rad) else "")
        + sång_html(sid) + f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(kamera)}</span></figcaption></figure>')
rows.append("</div>")

slut = SHOTS[-1][1].split("–")[1]
tl, total = [], sek(slut)
for sid, tid, sc, *_ in SHOTS:
    a, _, b = tid.partition("–")
    a, b = sek(a), sek(b or a) + (0 if b else 1)
    tl.append(f'<div style="left:{a / total * 100:.2f}%;width:{(b - a) / total * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {tid}">{sid}</div>')

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vi ska bada: storyboard</title>
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
.line {{ font-weight:700; margin:0 }}
.song {{ border-left:3px solid #3A6FD8; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Vi ska bada! <span>storyboard</span></h1>
<p class="lede">Avsnitt 004. Bilderna är byggda av de färdiga utklippen och bakgrunderna i <code>assets/</code>, med ansiktena ritade som i <code>kit.js</code>. Halvgenomskinliga kopior visar var en figur var innan, och pilarna visar rörelsen. Alla tider är preliminära: sången låser dem.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>3</b><span>figurer</span></div><div><b>3</b><span>körscener</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>~{slut}</b><span>längd, preliminärt</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Introt</b> är avsnitt 3:s intro med nytt nummer och ny titel. Bild 01 är en stillbild ur <code>intro-skiss.html</code> vid 8,5 s.</li>
<li><b>Körscenerna</b> återanvänder lagren från 003: äppelträdet, traktorn på åkern, dammen, blommorna och flygplanet. En sak i taget glider förbi.</li>
<li><b>Problemet:</b> vattnet är kallt (18a–18e). Ankan visar först och grodan gör likadant, ett steg i taget: tårna, fötterna, hopp. Texten i bilderna finns bara i storyboarden.</li>
<li><b>Fönstren:</b> grodan går på först och sätter sig längst bak, ankan vid dörren. Då räknar barnet från vänster till höger: en, två.</li>
<li><b>Ankan</b> har näbben som mun (som i kit.js) och de nya ritade lemmarna: orange ben med simfötter och små vingar.</li>
<li><b>Utan nya bilder:</b> skylten (ur Busshållplatsen), vassen (ur Dammen), pölen, handduken och stänken i kod.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")
print(f"{len(frames)} bilder, index.html klar")
