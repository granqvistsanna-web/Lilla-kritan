"""Bygger bildstoryboarden för avsnitt 015 (Bä, bä, vita lamm) av utklippen och Ängen.
Hjälpfunktionerna (kritfyll, vit kant, place, papperskorn, kritiris, sidan) är kopierade ur 016:s bygg.py, som har dem ur 014.
Ludde byggs ur sin rigg (kropp, ben, armar) med ansiktet ur verktyg/ansikten.py. Far och mor är samma rigg i kod:
far 135 % och gråare, mor 120 % med en rosa rosett. Rocken, kjolen, ulltussarna och hjärtana ritas i kod.

Kör: python3 bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter. ../storyboard.md skrivs inte över.
Tiderna (sångtid) är samma som i ../storyboard.md och ../rader.txt (tagning 2, 1:15.7); avsnittstid = sångtid + 11 s.
"""
import html
import json
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
sys.path.insert(0, str(ROT / "verktyg"))
import ansikten  # noqa: E402

W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
INTRO = 11.0
SÅNG_SLUT = 76.0   # sången är 75.7 s; kritirisen håller en stund

# --- Kritstruktur (ur 014/016) ---------------------------------------------------------------------------------
KRITA = "--platt" not in sys.argv
ansikten.KRITA = KRITA
_g = Image.open(A / "bakgrunder/glasskiosken/glasskiosken.png").convert("L").crop((480, 0, 1376, 560)).resize((W, H))
_d = np.asarray(_g, float) - np.asarray(_g.filter(ImageFilter.GaussianBlur(12)), float)
KORN = np.clip(0.5 + _d / (4 * _d.std()), 0, 1)
_rng = np.random.default_rng(6)
BRUS = sum(np.asarray(Image.fromarray((_rng.random((H // k, W // k)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), float)
           for k in (6, 16)) / 255 - 1


def kritfyll(c, mask, col, alpha=1.0, vick=0.25, oskarp=2.0):
    if not KRITA:
        c.paste(col[:3], mask=mask.point(lambda v: int(v * alpha)))
        return
    w, h = mask.size
    kx = np.tile(KORN, (h // H + 1, w // W + 1))[:h, :w]
    ky = np.tile(BRUS, (h // H + 1, w // W + 1))[:h, :w]
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(oskarp)), float) / 255
    m = np.clip((m - 0.5 + vick * ky) * 4 + 0.5, 0, 1) * np.clip(0.35 + 0.9 * kx, 0, 1) * alpha
    färg = np.clip(np.array(col[:3], float) * (0.9 + 0.2 * kx[..., None]), 0, 255).astype(np.uint8)
    lag = Image.fromarray(färg)
    if c.mode == "RGBA":
        lag = lag.convert("RGBA")
        lag.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
        c.alpha_composite(lag)
    else:
        c.paste(lag, mask=Image.fromarray((m * 255).astype(np.uint8)))


def ritmask(c):
    m = Image.new("L", c.size)
    return m, ImageDraw.Draw(m)


def papperskorn(im):
    if not KRITA:
        return im
    a = np.asarray(im.convert("RGB"), float) * (1 - 0.12 * (1 - KORN[..., None]))
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def vit_kant(im, r=15):
    under = Image.new("RGBA", im.size, (255, 255, 255, 0))
    under.putalpha(im.getchannel("A").filter(ImageFilter.MaxFilter(r)))
    under.alpha_composite(im)
    return under


def place(canvas, im, cx, ground, h, rot=0, flip=False, sy=1.0):
    """Klistrar in med underkanten på `ground` och höjden h. Returnerar (skala, x0, y0)."""
    box = im.getbbox()
    s = h / (box[3] - box[1])
    big = im.resize((round(im.width * s), round(im.height * s * sy)), Image.LANCZOS)
    if flip:
        big = big.transpose(Image.FLIP_LEFT_RIGHT)
    if rot:
        big = big.rotate(rot, resample=Image.BICUBIC, center=(big.width / 2, box[3] * s * sy))
    x0 = round(cx - (box[0] + box[2]) / 2 * s)
    y0 = round(ground - box[3] * s * sy)
    lag = Image.new("RGBA", canvas.size)
    lag.paste(big, (x0, y0), big)
    canvas.alpha_composite(lag)
    return s, x0, y0


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def arrow(canvas, pts, col=(255, 255, 255)):
    m, d = ritmask(canvas)
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        n = max(1, int(math.dist((x1, y1), (x2, y2)) / 22))
        for i in range(0, n, 2):
            a, b = i / n, min(1, (i + 1) / n)
            d.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a, x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=255, width=7)
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    ang = math.atan2(y2 - y1, x2 - x1)
    for da in (2.6, -2.6):
        d.line((x2, y2, x2 + 26 * math.cos(ang + da), y2 + 26 * math.sin(ang + da)), fill=255, width=7)
    kritfyll(canvas, m, col, alpha=0.85, vick=0.2, oskarp=1.2)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


def rgba(p):
    return Image.open(A / p).convert("RGBA")


def kritiris(c, cx, cy, r, col=(250, 248, 242)):
    """Kritirisen: en vinglig cirkel, svart utanför."""
    m, d = ritmask(c)
    pts = [(cx + r * (1 + 0.03 * math.sin(5 * v)) * math.cos(v), cy + r * (1 + 0.03 * math.sin(5 * v)) * math.sin(v))
           for v in np.linspace(0, 2 * math.pi, 120)]
    d.rectangle((0, 0, W, H), fill=255)
    d.polygon(pts, fill=0)
    c.paste((10, 10, 14), mask=m)
    m, d = ritmask(c)
    d.line(pts + pts[:1], fill=255, width=9)
    kritfyll(c, m, col, vick=0.2, oskarp=1.2)


# --- Bilderna ur assets/ --------------------------------------------------------------------------------------
PLÅT = rgba("bakgrunder/angen/angen.png")
GOLV = 690            # fötternas linje (horisonten ligger på y 618, golvet är benvitt nedanför)
SÄCK_FULL = rgba("rekvisita/ullsack/cut/ullsack.png")
SÄCK_TOM = rgba("rekvisita/ullsack/cut/ullsack-tom.png")
STRUMPA = {n: rgba(f"rekvisita/strumpor/cut/strumpa-{n}.png") for n in ("rosa-1", "rosa-2", "bla-1", "bla-2")}
STRUMPHÖG = rgba("rekvisita/strumpor/cut/strumpor.png")
FIA = rgba("karaktarer/fjarilen-fia/cut/fia-faceless.png")

# Ludde: riggen i 1024-rutan. Kroppen (186–838, 180–833), fötterna nere på y 929. Ögon och mun som i 007.
LUDDE = A / "karaktarer/lammet-ludde"
RIG = json.loads((LUDDE / "ludde-rigg.json").read_text())
LUDDE_ANS = dict(ogon=[(413, 401), (604, 398)], mun=(511, 466), munskala=1.0)
FOT = {"leg-l": (439, 929), "leg-r": (600, 927)}          # där strumporna sitter
HAND = {"arm-l": (205, 630), "arm-r": (818, 625)}          # armspetsen (de mörka klövarna) i viloläge
TUSSAR = [(-160, 1.02), (-138, 1.04), (-116, 1.05), (-90, 1.06), (-64, 1.05), (-42, 1.04), (-20, 1.02),
          (180, 0.98), (0, 0.98), (150, 1.0), (30, 1.0)]   # vinkel (grader) och avstånd runt kroppen
KROPP_C, KROPP_R = (512, 506), 326

ROCK = (58, 86, 148)       # fars helgdagsrock: mörkblå, syns mot himlen och golvet
KJOL = (224, 94, 96)       # mors söndagskjol: korallröd
ROSETT = (236, 140, 170)
VIT_ULL = (252, 250, 244)
GRÅ_LINJE = (178, 172, 162)


def tuss(c, x, y, r):
    """En ulltuss: tre runda klickar i vit krita med en tunn grå krull."""
    m, d = ritmask(c)
    for dx, dy, k in ((-0.55, 0.15, 0.8), (0.55, 0.15, 0.8), (0, -0.2, 1.0)):
        d.ellipse((x + dx * r - k * r, y + dy * r - k * r, x + dx * r + k * r, y + dy * r + k * r), fill=255)
    kritfyll(c, m.filter(ImageFilter.MaxFilter(9)), (255, 255, 255), vick=0.1, oskarp=1.0)   # vit kant
    kritfyll(c, m, VIT_ULL, vick=0.15, oskarp=1.2)
    m, d = ritmask(c)
    d.arc((x - r * 0.45, y - r * 0.35, x + r * 0.15, y + r * 0.35), 200, 520, fill=255, width=5)
    kritfyll(c, m, GRÅ_LINJE, alpha=0.8, vick=0.1, oskarp=0.6)


def hjärta(c, x, y, s, col=(236, 120, 150)):
    m, d = ritmask(c)
    d.ellipse((x - s, y - s * 0.6, x, y + s * 0.4), fill=255)
    d.ellipse((x, y - s * 0.6, x + s, y + s * 0.4), fill=255)
    d.polygon([(x - s * 0.96, y), (x + s * 0.96, y), (x, y + s * 1.1)], fill=255)
    kritfyll(c, m.filter(ImageFilter.MaxFilter(7)), (255, 255, 255), vick=0.1, oskarp=0.8)
    kritfyll(c, m, col, vick=0.12, oskarp=0.8)


def armbild(d):
    return Image.open(LUDDE / RIG["delar"][d]["fil"]).convert("RGBA")


def lamm(mood="glad", titt=(0, 0), arm_l=0, arm_r=0, ton=0.0, rosett=False, rock=False, kjol=False,
         tussar=0, strumpor_fot=False, strumpor_hand=False):
    """Ett lamm ur Luddes rigg i 1024-rutan. ton: 0 = Ludde, > 0 gråare (far). tussar: antal extra ulltussar."""
    c = Image.new("RGBA", (1024, 1024))
    for d in ("leg-l", "leg-r"):
        c.alpha_composite(armbild(d))
    c.alpha_composite(rgba("karaktarer/lammet-ludde/cut/ludde-body.png"))
    alfa_kropp = rgba("karaktarer/lammet-ludde/cut/ludde-body.png").getchannel("A")
    if rock:   # rocken: nedre halvan av kroppen, två knappar
        m, d = ritmask(c)
        d.rectangle((0, 560, 1024, 1024), fill=255)
        kritfyll(c, ImageChops.multiply(m, alfa_kropp.point(lambda v: 255 if v > 200 else 0)), ROCK, vick=0.15, oskarp=1.2)
        m, d = ritmask(c)
        d.line((512, 575, 512, 820), fill=255, width=6)
        for y in (640, 720):
            d.ellipse((540 - 14, y - 14, 540 + 14, y + 14), fill=255)
        kritfyll(c, m, (240, 232, 214), vick=0.1, oskarp=0.8)
    if kjol:   # kjolen: ett brett band längst ner på kroppen, med en vågig fåll
        m, d = ritmask(c)
        d.polygon([(0, 640)] + [(x, 640 + 10 * math.sin(x / 40)) for x in range(0, 1025, 16)] + [(1024, 1024), (0, 1024)], fill=255)
        kritfyll(c, ImageChops.multiply(m, alfa_kropp.point(lambda v: 255 if v > 200 else 0)), KJOL, vick=0.15, oskarp=1.2)
    for i in range(tussar):
        v, k = TUSSAR[i % len(TUSSAR)]
        x = KROPP_C[0] + KROPP_R * k * math.cos(math.radians(v))
        y = KROPP_C[1] + KROPP_R * k * math.sin(math.radians(v))
        tuss(c, x, y, 56)
    ansikten.rita(c, mood, titt, **LUDDE_ANS)
    for d, v in (("arm-l", arm_l), ("arm-r", arm_r)):
        piv = tuple(RIG["delar"][d]["vridpunkt"])
        c.alpha_composite(armbild(d).rotate(v, resample=Image.BICUBIC, center=piv))
        if strumpor_hand:   # strumpan över armspetsen, med skaftet in mot axeln
            r = math.radians(v)
            px, py = HAND[d][0] - piv[0], HAND[d][1] - piv[1]
            hx, hy = piv[0] + px * math.cos(r) + py * math.sin(r), piv[1] - px * math.sin(r) + py * math.cos(r)
            riktning = math.degrees(math.atan2(hy - piv[1], hx - piv[0]))
            s = STRUMPA["bla-1" if d == "arm-l" else "bla-2"]
            s = s.crop(s.getbbox())
            s = s.resize((round(s.width * 130 / s.height), 130), Image.LANCZOS).rotate(90 - riktning, resample=Image.BICUBIC, expand=True)
            c.alpha_composite(s, (round(hx - s.width / 2), round(hy - s.height / 2)))
    if strumpor_fot:
        for d, n in (("leg-l", "rosa-1"), ("leg-r", "rosa-2")):
            place(c, STRUMPA[n], FOT[d][0], FOT[d][1] + 8, 165, flip=d == "leg-r")
    if ton:   # far: hela lammet lite gråare (ansiktet blir också lite gråare, det märks inte)
        a = np.asarray(c, float)
        a[..., :3] = a[..., :3] * (1 - ton) + np.array([196, 192, 186]) * ton
        c = Image.fromarray(a.astype(np.uint8))
    if rosett:   # mor: en liten rosa rosett vid vänstra örat
        m, d = ritmask(c)
        bx, by = 300, 238
        d.polygon([(bx, by), (bx - 52, by - 36), (bx - 52, by + 36)], fill=255)
        d.polygon([(bx, by), (bx + 52, by - 36), (bx + 52, by + 36)], fill=255)
        d.ellipse((bx - 16, by - 16, bx + 16, by + 16), fill=255)
        kritfyll(c, m.filter(ImageFilter.MaxFilter(9)), (255, 255, 255), vick=0.1, oskarp=0.8)
        kritfyll(c, m, ROSETT, vick=0.12, oskarp=0.8)
    return c


def ludde(mood="glad", titt=(0, 0), **kw):
    return lamm(mood, titt, **kw)


def far(mood="glad", titt=(0, 0), **kw):
    return lamm(mood, titt, ton=0.32, **kw)


def mor(mood="glad", titt=(0, 0), **kw):
    return lamm(mood, titt, rosett=True, **kw)


def figur(c, im, x, h, fot=GOLV, rot=0):
    place(c, vit_kant(im, 11), x, fot, h, rot=rot)


# Höjder: Ludde 230 px (30 % av bildhöjden), far 135 %, mor 120 %
LH, FH, MH = 230, 310, 276
FAR_X, MOR_X, LUDDE_X, SÄCK_X = 330, 545, 820, 1020
HÖG_X = 735   # strumphögen på marken framför, mellan mor och Ludde


def ängen(fia=None):
    c = PLÅT.copy()
    if fia:
        place(c, vit_kant(FIA, 9), fia[0], fia[1], 95, rot=-10)
    return c


def helbild(far_im, mor_im, ludde_im, säck="tom", fia=None, ludde_x=LUDDE_X, far_x=FAR_X, mor_x=MOR_X):
    c = ängen(fia)
    figur(c, far_im, far_x, FH)
    figur(c, mor_im, mor_x, MH)
    if säck == "tom":
        place(c, SÄCK_TOM, SÄCK_X, GOLV + 4, 80)
    elif säck == "full":
        place(c, SÄCK_FULL, SÄCK_X, GOLV + 4, 175)
    if ludde_im is not None:
        figur(c, ludde_im, ludde_x, LH)
    return c


def tvåbild_far_mor(c):
    return crop_zoom(c, (FAR_X + MOR_X) / 2, 520, 620)


def närbild_ludde(c, x=LUDDE_X + 60):
    return crop_zoom(c, x, 560, 520)


def fötterna(c):
    return crop_zoom(c, LUDDE_X + 40, 640, 430)


frames = {}

# 00 Intro: platshållare (introt renderas från 014:s intro/index.html med nytt nummer och titel)
c = ängen()
d = ImageDraw.Draw(c)
d.text((W / 2, 300), "Avsnitt 15", font=font(48), fill=(255, 255, 255), anchor="mm", stroke_width=5, stroke_fill=(40, 90, 140))
d.text((W / 2, 400), "Bä, bä, vita lamm", font=font(70), fill=(255, 255, 255), anchor="mm", stroke_width=5, stroke_fill=(40, 90, 140))
frames["00"] = c

# 01 Kritan ritar lammet: nosen, öronen och benen först, kroppen halvvägs
c = Image.new("RGBA", (W, H), PAPER + (255,))
lam = Image.new("RGBA", (W, H))
place(lam, rgba("karaktarer/lammet-ludde/cut/ludde-faceless.png"), W / 2, H / 2 + 230, 460)
m = Image.new("L", (W, H))
ImageDraw.Draw(m).pieslice((W / 2 - 500, H / 2 - 500, W / 2 + 500, H / 2 + 500), -90 - 230, -90 + 0, fill=255)
ImageDraw.Draw(m).rectangle((0, H / 2 + 120, W, H), fill=255)   # benen är redan ritade
lam.putalpha(ImageChops.multiply(lam.getchannel("A"), m))
c.alpha_composite(lam)
m, d = ritmask(c)
kx, ky = W / 2 + 200, H / 2 - 120
d.polygon([(kx, ky), (kx + 30, ky - 18), (kx + 170, ky - 230), (kx + 140, ky - 248)], fill=255)
kritfyll(c, m, (238, 230, 210), vick=0.1, oskarp=0.8)
frames["01"] = c

# 01b Teckningen blinkar och säger bä
c = Image.new("RGBA", (W, H), PAPER + (255,))
place(c, vit_kant(ludde("blinkar"), 11), W / 2, H / 2 + 230, 460)
frames["01b"] = c

# 02 Zoom in i teckningen
c = frames["01b"].copy()
for (x, y), (x2, y2) in (((70, 70), (190, 160)), ((W - 70, 70), (W - 190, 160)), ((70, H - 70), (190, H - 160)), ((W - 70, H - 70), (W - 190, H - 160))):
    arrow(c, [(x, y), (x2, y2)], col=INK)
frames["02"] = c

# 03 Ängen helbild: Ludde extra luddig, far och mor till vänster, säcken tom. Fia glider över himlen
c = helbild(far("glad", (0.6, 0)), mor("glad", (0.6, 0)), ludde("glad", (-0.3, 0), tussar=11), fia=(700, 250))
arrow(c, [(560, 250), (660, 230)])
frames["03"] = c

# 05 Far och mor lutar sig fram, Ludde vickar på "bä, bä"
c = ängen()
figur(c, far("nyfiken", (1, 0)), FAR_X + 20, FH, rot=-6)
figur(c, mor("nyfiken", (1, 0)), MOR_X + 20, MH, rot=-6)
place(c, SÄCK_TOM, SÄCK_X, GOLV + 4, 80)
figur(c, ludde("skrattar", (-0.5, 0), tussar=11), LUDDE_X, LH, rot=5)
frames["05"] = c

# 06 Närbild Ludde: nickar "ja, ja", skakar på sig, tussarna flyger ner i säcken som blir full
c = helbild(far(), mor(), ludde("forvanad", (0.8, 0.3), tussar=4), säck="full")
for x, y in ((905, 470), (960, 520)):
    tuss(c, x, y, 18)
arrow(c, [(880, 470), (990, 560)])
frames["06"] = närbild_ludde(c, LUDDE_X + 100)

# 07 Tvåbild far och mor: en tuss blir rocken på far, en blir kjolen på mor
c = helbild(far("glad", (0, 0), rock=True), mor("forvanad", (0, 0), kjol=True), ludde(tussar=4), säck="full")
m, d = ritmask(c)
for i in range(5):   # krit-klotter vid mors kjol
    d.arc((MOR_X - 90 + i * 30, GOLV - 120, MOR_X - 20 + i * 30, GOLV - 60), 200, 520, fill=255, width=5)
kritfyll(c, m, (255, 255, 255), alpha=0.8, vick=0.1, oskarp=0.8)
frames["07"] = tvåbild_far_mor(c)

# 08 Lågt utsnitt vid Luddes fötter: två tussar blir två par strumpor i en hög
c = helbild(far(rock=True), mor(kjol=True), ludde("forvanad", (0.2, 1), tussar=2), säck="full")
place(c, STRUMPHÖG, HÖG_X, GOLV + 45, 42)
frames["08"] = fötterna(c)

# 10 Närbild Ludde: mindre ull, huttrar och tittar ner på de bara fötterna
c = helbild(far(rock=True), mor(kjol=True), ludde("ledsen", (0, 1), arm_l=-12, arm_r=12), säck="full")
place(c, STRUMPHÖG, HÖG_X, GOLV + 45, 42)
m, d = ritmask(c)
for s in (-1, 1):   # huttra: två små vickstreck vid sidorna
    x = LUDDE_X + s * 150
    d.arc((x - 18, 520, x + 18, 560), 270 if s > 0 else 90, 450 if s > 0 else 270, fill=255, width=5)
kritfyll(c, m, (255, 255, 255), alpha=0.9, vick=0.1, oskarp=0.8)
frames["10"] = närbild_ludde(c)

# 11 Närbild Ludde tittar på tittaren och väntar, strumphögen i bild
c = helbild(far(rock=True), mor(kjol=True), ludde("nyfiken", (0, 0)), säck="full")
place(c, STRUMPHÖG, HÖG_X, GOLV + 45, 42)
frames["11"] = närbild_ludde(c)

# 12 Lågt utsnitt: Ludde sitter och tar på sig strumporna på fötterna själv
c = helbild(far(rock=True), mor(kjol=True), None, säck="full")
_, x0, y0 = place(c, vit_kant(rgba("karaktarer/lammet-ludde/cut/ludde-sitter-v2.png"), 11), LUDDE_X, GOLV + 6, 195)
place(c, STRUMPA["rosa-1"], LUDDE_X - 88, GOLV + 10, 50)
place(c, STRUMPA["rosa-2"], LUDDE_X + 88, GOLV + 10, 50, flip=True)
place(c, STRUMPA["bla-1"], LUDDE_X + 140, GOLV + 14, 40)
place(c, STRUMPA["bla-2"], LUDDE_X + 180, GOLV + 14, 40)
frames["12"] = fötterna(c)

# 13 Närbild Ludde: två strumpor kvar, på händerna! Han skrattar
c = helbild(far(rock=True), mor(kjol=True), ludde("skrattar", (0, 0), arm_l=-60, arm_r=60, strumpor_fot=True, strumpor_hand=True), säck="full")
frames["13"] = närbild_ludde(c)

# 14 Tvåbild: far visar rocken, mor kjolen, de skrattar åt Luddes händer
c = helbild(far("skrattar", (1, 0), rock=True, arm_r=35), mor("skrattar", (1, 0), kjol=True, arm_r=35),
            ludde("skrattar", arm_l=-60, arm_r=60, strumpor_fot=True, strumpor_hand=True), säck="full")
frames["14"] = tvåbild_far_mor(c)

# 15 Helbild: Ludde reser sig och vickar med alla fyra strumporna
c = helbild(far("glad", (1, 0), rock=True), mor("glad", (1, 0), kjol=True),
            ludde("skrattar", arm_l=-70, arm_r=70, strumpor_fot=True, strumpor_hand=True), säck="full")
arrow(c, [(LUDDE_X - 150, 380), (LUDDE_X - 100, 340)])
arrow(c, [(LUDDE_X + 150, 380), (LUDDE_X + 100, 340)])
frames["15"] = c

# 16 Helbild: far och mor går fram till Ludde (Tack! – Varsågod!)
c = helbild(far("glad", (1, 0), rock=True), mor("skrattar", (1, 0), kjol=True),
            ludde("glad", (-0.6, 0), strumpor_fot=True, strumpor_hand=True), säck="full", far_x=470, mor_x=640)
arrow(c, [(270, 420), (380, 420)])
frames["16"] = c

# 17 Alla tre kramas, hjärtan, ulltussarna växer ut igen
c = ängen()
place(c, SÄCK_FULL, SÄCK_X, GOLV + 4, 175)
figur(c, far("karleksfull", rock=True, arm_r=70), 560, FH, rot=-4)
figur(c, mor("karleksfull", kjol=True, arm_l=-60), 870, MH, rot=4)
figur(c, ludde("karleksfull", arm_l=-50, arm_r=50, tussar=6, strumpor_fot=True, strumpor_hand=True), 715, LH)
for x, y, s in ((640, 330, 26), (760, 290, 20), (840, 350, 16)):
    hjärta(c, x, y, s)
frames["17"] = c

# 18 Kritirisen sluter sig runt Ludde
c = frames["17"].copy()
kritiris(c, 715, 560, 170)
frames["18"] = c

# --- Text till varje bild (ur ../storyboard.md) ---------------------------------------------------------------
I, F, V1, M, V2, S = "Intro", "Förspel", "Vers 1", "Mellanspel", "Vers 2", "Svans"
SHOTS = [  # (id, sångtid start, del, kamera, vad, sjungs, sägs)
    ("00", -11.0, I, "fast", "Introt ”Kort i himlen” med Avsnitt 15 · Bä, bä, vita lamm. Platshållare: renderas från 014:s intro/.", "", ""),
    ("01", 0.0, F, "kritan ritar · papper", "Kritan (gräddvit) ritar nosen och öronen, sedan benen och sist den runda ullkroppen.", "",
     "BERÄTTAREN: Vad kan det vara? … (paus 3 s) … Ett lamm!"),
    ("01b", 6.0, F, "papper", "Teckningen blinkar och säger bä (riktigt lammbräkande).", "", ""),
    ("02", 7.5, F, "zoom in", "Kameran åker in i teckningen.", "", ""),
    ("03", 9.0, F, "helbild", "Ludde står extra luddig. Far (störst, gråare) och mor (rosetten) till vänster, säcken tom. Fia glider över himlen.", "", ""),
    ("05", 12.4, V1, "helbild", "Far och mor lutar sig fram, Ludde vickar på ”bä, bä”.", "Bä, bä, vita lamm, har du någon ull?", ""),
    ("06", 17.9, V1, "närbild Ludde", "Ludde nickar ”ja, ja” och skakar på sig: tussarna flyger ner i säcken, som blir full.", "Ja, ja, kära barn, jag har säcken full.", ""),
    ("07", 23.6, V1, "tvåbild far och mor", "En tuss blir fars rock, en blir mors kjol (krit-klotter, pling).", "Helgedagsrock åt far och söndagskjol åt mor,", ""),
    ("08", 27.8, V1, "lågt utsnitt fötterna", "Två tussar blir två par strumpor i en hög framför Ludde.", "och två par strumpor åt lille, lille bror.", ""),
    ("10", 33.4, M, "närbild Ludde", "Mindre ull nu. Ludde huttrar och tittar ner på sina bara fötter.", "", "BERÄTTAREN: Brrr! Lammet fryser om fötterna."),
    ("11", 36.0, M, "närbild Ludde", "Ludde tittar på tittaren och väntar, strumphögen i bild.", "",
     "BERÄTTAREN: Vad kan lammet ta på sig? … (paus 4,5 s) … Strumporna!"),
    ("12", 44.4, V2, "lågt utsnitt fötterna", "Ludde sitter och tar på sig en strumpa på varje fot, själv.", "Bä, bä, vita lamm, har du någon ull?", ""),
    ("13", 49.9, V2, "närbild Ludde", "Två strumpor kvar: på händerna! Ludde skrattar.", "Ja, ja, kära barn, jag har säcken full.", ""),
    ("14", 55.6, V2, "tvåbild far och mor", "Far visar rocken, mor kjolen. De skrattar åt Luddes händer.", "Helgedagsrock åt far och söndagskjol åt mor,", ""),
    ("15", 59.8, V2, "helbild", "Ludde reser sig och vickar med alla fyra strumporna, varm och glad.", "och två par strumpor åt lille, lille bror.", ""),
    ("16", 65.4, S, "helbild", "Far och mor går fram till Ludde.", "", "FAR: Tack! · MOR: Tack! · LUDDE: Varsågod!"),
    ("17", 68.5, S, "helbild", "Alla tre kramas, hjärtan flyger upp, ulltussarna växer ut igen.", "", "LUDDE: Bä-ä-ä, vad mysigt!"),
    ("18", 72.5, S, "helbild → kritiris", "Kritirisen sluter sig runt Ludde, håller över tystnaden, svart.", "", ""),
]
UNGEFÄR = {"08", "15"}   # strumpraderna börjar på en uppskattad tid (≈), se ../rader.txt
FÄRG = {I: "#c9c3b5", F: "#bfe3f4", V1: "#f4b6c8", M: "#a9d4f0", V2: "#f2c9a0", S: "#d9cfe8"}


def mmss(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"


START = [INTRO + s[1] for s in SHOTS]
SLUT = INTRO + SÅNG_SLUT
SPANN = list(zip(START, START[1:] + [SLUT]))

assert sorted(frames) == sorted(s[0] for s in SHOTS), set(frames) ^ set(s[0] for s in SHOTS)
(HÄR / "frames").mkdir(exist_ok=True)
for k, v in frames.items():
    papperskorn(v.convert("RGB")).save(HÄR / "frames" / f"{k}.jpg", quality=88)

rows, del_ = [], None
for (sid, _, dl, kam, vad, sjungs, sägs), (a, b) in zip(SHOTS, SPANN):
    if dl != del_:
        if del_:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[dl]}"></span>{html.escape(dl)}</h3><div class="frames">')
        del_ = dl
    tid = f"{'≈' if sid in UNGEFÄR else ''}{mmss(a)}–{mmss(b)}"
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="1376" height="768" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {tid}</div>'
        + (f'<p class="line">{html.escape(sägs)}</p>' if sägs else "")
        + (f'<div class="song"><div class="sung">{html.escape(sjungs)}</div></div>' if sjungs else "")
        + f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(kam)}</span></figcaption></figure>')
rows.append("</div>")
tl = "".join(f'<div style="left:{a / SLUT * 100:.2f}%;width:{(b - a) / SLUT * 100:.2f}%;background:{FÄRG[dl]}" title="{sid}">{sid}</div>'
             for (sid, _, dl, *_), (a, b) in zip(SHOTS, SPANN))

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bä, bä, vita lamm: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --acc:#3a7fb8;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#a9d4f0; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#a9d4f0; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 var(--body) }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1,h3 {{ font-family:var(--display); margin:0; line-height:1.1 }}
h1 {{ font-size:clamp(34px,6vw,56px); font-weight:800 }} h1 span {{ color:var(--acc) }}
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
.song {{ border-left:3px solid #f4b6c8; padding-left:10px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Bä, bä, vita lamm <span>storyboard</span></h1>
<p class="lede">Avsnitt 015, första utkast, tagning 2. Bilderna är byggda av utklippen i <code>assets/</code> på Ängen, med Luddes rigg för alla tre lammen och ansiktena ritade i kod. Pilarna visar rörelsen. Avsnittstid = sångtid + 11 s.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>1</b><span>plats</span></div><div><b>3</b><span>figurer</span></div><div><b>2</b><span>nya saker</span></div><div><b>5</b><span>kamerainställningar</span></div><div><b>≈{mmss(SLUT)}</b><span>längd</span></div></div>
<div class="tl">{tl}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Repliker och berättarröst bara i förspelet, mellanspelet och svansen.</li>
<li><b>Platshållare:</b> introt (00). Ludde sitter i 12 med den befintliga sittposen; posen där han tar foten är avsnittets nya pose.</li>
<li><b>Far och mor</b> är Luddes rigg: far 135 % och gråare, mor 120 % med rosetten. Rocken (mörkblå) och kjolen (korallröd) är förslag i kod.</li>
<li><b>Strumporna</b> har tårna åt vänster i bilden; den högra foten speglas.</li>
<li><b>≈</b> på 08 och 15: strumpradernas start är uppskattad, lyssna på sang.m4a.</li>
<li><b>Byggs om</b> med <code>python3 bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")
print(f"{len(frames)} bilder, längd ≈{mmss(SLUT)}, index.html klar")
