"""Bygger bildstoryboarden för avsnitt 017 (Mors lilla Olle) av utklippen i assets/ och Skogen 1.
Hjälpfunktionerna (kritfyll, vit kant, place, papperskorn, kritiris) är kopierade ur 016:s bygg.py; ansiktena ritas med verktyg/ansikten.py.
Olle, mor och björnen sätts ihop av sina riggar (kropp, armar och ben i cut/), så armarna kan vinka och hålla korgen.
Blåbären ritas i kod (rekvisita/blabar.md har ingen bild än).

Kör: python3 bygg.py   (från den här mappen, med en Python som har PIL och numpy)
Skriver frames/*.jpg, frames/tider.txt och index.html. Kostar inga krediter. ../storyboard.md skrivs inte över.
Tiderna (sångtid) är samma som i ../storyboard.md och ../rader.txt; avsnittstid = sångtid + 11 s.
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
SÅNG_SLUT = 135.0

# --- Kritstruktur (ur 014) -------------------------------------------------------------------------------------
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
    """Klistrar in med underkanten på `ground` och höjden h. sy < 1 trycker ihop (sitter). Returnerar (skala, x0, y0)."""
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



GUL = (246, 231, 168)   # kritirisens krita, samma som 016


def kritiris(c, cx, cy, r):
    """Kritirisen: en vinglig cirkel, svart utanför."""
    m, d = ritmask(c)
    pts = [(cx + r * (1 + 0.03 * math.sin(5 * v)) * math.cos(v), cy + r * (1 + 0.03 * math.sin(5 * v)) * math.sin(v))
           for v in np.linspace(0, 2 * math.pi, 120)]
    d.rectangle((0, 0, W, H), fill=255)
    d.polygon(pts, fill=0)
    c.paste((10, 10, 14), mask=m)
    m, d = ritmask(c)
    d.line(pts + pts[:1], fill=255, width=9)
    kritfyll(c, m, GUL, vick=0.2, oskarp=1.2)



# --- Bilderna ur assets/ --------------------------------------------------------------------------------------
PLÅT = Image.open(A / "bakgrunder/skogen/skogen.png").convert("RGBA").resize((W, H), Image.LANCZOS)
SAK = A / "bakgrunder/skogen-saker"
BUSKE, STEN = rgba("bakgrunder/skogen-saker/buske.png"), rgba("bakgrunder/skogen-saker/sten.png")
KORG = rgba("rekvisita/korg/cut/korg-v2.png")
BÄR = (58, 79, 184)   # #3A4FB8, blåbären (rekvisita/blabar.md)

G = 650                        # figurernas fötter (golvlinjen i plattan ligger vid ca y 460)
BUSK_X, BUSK_Y, BUSK_H = 1030, 650, 320
STEN_X, STEN_Y, STEN_H = 250, 645, 215
OLLE_H, MOR_H, BJÖRN_H = 270, 370, 370   # mor ca 1,4 gånger Olle; björnen störst


def blåbär(c, x, y, r):
    m, d = ritmask(c)
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    kritfyll(c, m, BÄR, vick=0.1, oskarp=1)
    m, d = ritmask(c)
    d.regular_polygon((x, y - r * .62, r * .3), 5, fill=255)
    kritfyll(c, m, (30, 40, 90), vick=0.05, oskarp=0.6)
    m, d = ritmask(c)
    d.ellipse((x - r * .55, y - r * .5, x - r * .15, y - r * .1), fill=255)
    kritfyll(c, m, (150, 170, 240), alpha=0.7, vick=0.05, oskarp=0.6)


BUSK_BÄR = [(-.32, -.62), (-.05, -.78), (.25, -.6), (.36, -.32), (-.4, -.3), (.05, -.42), (-.18, -.18), (.18, -.15)]


def buske(c, bär=True):
    place(c, BUSKE, BUSK_X, BUSK_Y, BUSK_H)
    if bär:
        for dx, dy in BUSK_BÄR:
            blåbär(c, BUSK_X + dx * BUSK_H * 1.35, BUSK_Y + dy * BUSK_H, 11)


def korg(c, x, y, h, bär=3, rot=0):
    """Korgen med underkanten mitt på (x, y). bär = antal bär som sticker upp över kanten."""
    lag = Image.new("RGBA", c.size)
    for i in range(bär):
        dx = (i - (bär - 1) / 2) * h * .2
        blåbär(lag, x + dx, y - h * .5 - (6 if i % 2 else 0), h * .1)
    place(lag, KORG, x, y, h)
    if rot:
        lag = lag.rotate(rot, resample=Image.BICUBIC, center=(x, y))
    c.alpha_composite(lag)


# --- Riggarna: kropp, armar och ben ur cut/, ansiktet i kod ---------------------------------------------------
def läs_rigg(mapp):
    r = json.loads(next((A / mapp).glob("*-rigg.json")).read_text())
    return {k: (rgba(f"{mapp}/{d['fil']}"), tuple(d["vridpunkt"])) for k, d in r["delar"].items()}, rgba(f"{mapp}/{r['kropp']}")


RIGG = {"olle": läs_rigg("karaktarer/pojken-olle"), "mor": läs_rigg("karaktarer/mamma-mor"), "björn": läs_rigg("karaktarer/bjornen-bulle")}
ANS = {"olle": dict(ogon=[(414, 401), (604, 398)], mun=(511, 466), munskala=1.1),
       "mor": dict(ogon=[(414, 401), (605, 398)], mun=(510, 451), munskala=1.1),
       "björn": dict(ogon=[(414, 400), (604, 398)], mun=(512, 480), munskala=1.0)}
HAND = {"olle": 60, "mor": 60, "björn": 70}   # handens avstånd från vridpunkten, ungefär


def vrid(p, piv, v):
    a = math.radians(v)
    dx, dy = p[0] - piv[0], p[1] - piv[1]
    return piv[0] + dx * math.cos(a) + dy * math.sin(a), piv[1] - dx * math.sin(a) + dy * math.cos(a)


def figurbild(vem, mood="glad", titt=(0, 0), arm_l=0, arm_r=0, håll=None, blå_mun=False, blå_nos=False):
    """Hela figuren i sin 1024-ruta. arm_l/arm_r: vinkel i grader (positiv = moturs i bild; höger arm upp = +, vänster arm upp = −).
    håll = (bär i korgen,) lägger korgen vid höger hand."""
    delar, kropp = RIGG[vem]
    c = Image.new("RGBA", (1024, 1024))
    for k, (im, piv) in delar.items():
        v = arm_l if k == "arm-l" else arm_r if k == "arm-r" else 0
        c.alpha_composite(im.rotate(v, resample=Image.BICUBIC, center=piv) if v else im)
    c.alpha_composite(kropp)
    if blå_mun:
        x, y = ANS[vem]["mun"]
        m, d = ritmask(c)
        d.ellipse((x - 34, y - 14, x + 34, y + 18), fill=255)
        kritfyll(c, m, (110, 100, 190), alpha=0.55, vick=0.2, oskarp=3)
    if blå_nos:
        for dx, dy in ((-40, 70), (30, 80), (60, 50), (-10, 105)):
            m, d = ritmask(c)
            d.ellipse((512 + dx - 9, 400 + dy - 9, 512 + dx + 9, 400 + dy + 9), fill=255)
            kritfyll(c, m, BÄR, alpha=0.8, vick=0.1, oskarp=1)
    ansikten.rita(c, mood, titt, **ANS[vem])
    if håll is not None:
        im, piv = delar["arm-r"]
        hx, hy = vrid((piv[0] + HAND[vem], piv[1] + HAND[vem] * .8), piv, arm_r)
        korg(c, hx + 10, hy + 120, 170, bär=håll)
    return c


def figur(c, vem, x, fot=G, flip=False, rot=0, klipp_y=None, **kw):
    """Figuren med fötterna på `fot`. klipp_y: allt under den raden tas bort (figuren står bakom en sak)."""
    im = vit_kant(figurbild(vem, **kw), 11)
    bb = im.getbbox()
    h = {"olle": OLLE_H, "mor": MOR_H, "björn": BJÖRN_H}[vem]
    lag = Image.new("RGBA", c.size)
    place(lag, im, x, fot, h * (bb[3] - bb[1]) / (figurbild(vem).getbbox()[3] - figurbild(vem).getbbox()[1] + 22), flip=flip, rot=rot)
    if klipp_y is not None:
        a = np.asarray(lag.getchannel("A")).copy()
        a[int(klipp_y):] = 0
        lag.putalpha(Image.fromarray(a))
    c.alpha_composite(lag)


def skog(sten=True, bär=True):
    c = PLÅT.copy()
    if sten:
        place(c, STEN, STEN_X, STEN_Y, STEN_H)
    return c


def bakom_busken(c, upp=0.0):
    """Björnen bakom busken: upp = 0 bara öronen, 1 hela huvudet."""
    topp = BUSK_Y - BUSK_H - 48 - 90 * upp
    figur(c, "björn", BUSK_X - 10, fot=topp + BJÖRN_H, klipp_y=BUSK_Y - 40, mood="glad")


def tvåbild(c, x=820, y=450, w=760):
    return crop_zoom(c, x, y, w)


def närbild(c, x, y, w=470):
    return crop_zoom(c, x, y, w)


def skak(c, x, y, r=150):
    """Busken prasslar: två korta bågar på var sida (en enkel form, inga fartstreck)."""
    for s in (-1, 1):
        arrow(c, [(x + s * r, y - 30), (x + s * (r + 30), y - 10), (x + s * r, y + 10)])


frames = {}

# 00 Intro: platshållare (renderas från 014:s intro/index.html med nytt nummer och titel)
c = skog()
d = ImageDraw.Draw(c)
for t, y, f in (("Avsnitt 17", 300, font(48)), ("Mors lilla Olle", 400, font(70))):
    d.text((W / 2, y), t, font=f, fill=(255, 255, 255), anchor="mm", stroke_width=6, stroke_fill=(60, 110, 80))
frames["00"] = c

# 01 Kritan (blå) ritar ett blåbär, halvvägs
c = Image.new("RGBA", (W, H), PAPER + (255,))
lag = Image.new("RGBA", (W, H))
blåbär(lag, W / 2, H / 2 + 20, 170)
m = Image.new("L", (W, H))
ImageDraw.Draw(m).pieslice((W / 2 - 300, H / 2 - 280, W / 2 + 300, H / 2 + 320), -90, 135, fill=255)
lag.putalpha(ImageChops.multiply(lag.getchannel("A"), m))
c.alpha_composite(lag)
m, d = ritmask(c)
kx, ky = W / 2 - 120, H / 2 + 140   # spetsen där linjen just nu ritas (135°)
d.polygon([(kx, ky), (kx - 26, ky + 22), (kx - 190, ky + 200), (kx - 160, ky + 222)], fill=255)
kritfyll(c, m, (70, 90, 190), vick=0.1, oskarp=0.8)
frames["01"] = c

# 02 Zoom in: blåbäret klart, kameran åker in
c = Image.new("RGBA", (W, H), PAPER + (255,))
blåbär(c, W / 2, H / 2 + 20, 170)
for (x, y), (x2, y2) in (((70, 70), (190, 160)), ((W - 70, 70), (W - 190, 160)), ((70, H - 70), (190, H - 160)), ((W - 70, H - 70), (W - 190, H - 160))):
    arrow(c, [(x, y), (x2, y2)], col=INK)
frames["02"] = c

# 03 Olle går in från vänster med korgen
c = skog(); buske(c)
figur(c, "olle", 470, mood="glad", titt=(1, 0), arm_r=20, håll=0)
arrow(c, [(560, 330), (720, 330)])
frames["03"] = c

# 04 Olle plockar ett bär och lägger det i korgen
c = skog(); buske(c)
korg(c, 690, G, 95, bär=1)
figur(c, "olle", 790, mood="glad", titt=(1, -0.3), arm_r=70)
frames["04"] = c

# 05 Närbild Olle: ler mot tittaren, munnen blå
c = skog(); buske(c)
korg(c, 690, G, 95, bär=2)
figur(c, "olle", 790, mood="skrattar", blå_mun=True)
frames["05"] = närbild(c, 790, 470, 470)

# 06 Olle ensam, tittar åt sidan
c = skog(); buske(c)
korg(c, 690, G, 95, bär=3)
figur(c, "olle", 790, mood="ledsen", titt=(-1, 0))
frames["06"] = c


def olle_vid_busken(c, **kw):
    korg(c, 690, G, 95, bär=3)
    figur(c, "olle", 790, **kw)


# 07 Busken prasslar, öronen tittar upp
c = skog(); bakom_busken(c, 0.15); buske(c)
olle_vid_busken(c, mood="forvanad", titt=(1, -0.3))
skak(c, BUSK_X, BUSK_Y - 140)
frames["07"] = c

# 08 Tvåbild: busken gungar, bara öronen syns, Olle lutar huvudet
c = skog(); bakom_busken(c, 0.3); buske(c)
olle_vid_busken(c, mood="nyfiken", titt=(1, -0.5), rot=-6)
skak(c, BUSK_X, BUSK_Y - 140)
frames["08"] = tvåbild(c, 880, 470, 760)

# 09 Björnen kliver fram, rund och mjuk
c = skog(); buske(c)
olle_vid_busken(c, mood="skrattar", titt=(1, -0.5))
figur(c, "björn", 1110, mood="glad", titt=(-1, 0))
frames["09"] = c

# 10 Tvåbild: Olle vinkar, björnen vinkar tillbaka (god dag)
c = skog(); buske(c)
olle_vid_busken(c, mood="glad", titt=(1, -0.3), arm_r=120)
figur(c, "björn", 1110, mood="glad", titt=(-1, 0), arm_l=-120)
frames["10"] = tvåbild(c, 940, 450, 820)

# 11 Björnen skuttar bakom stenen, Olle håller för ögonen
c = skog(sten=False); buske(c)
figur(c, "björn", STEN_X + 30, fot=STEN_Y + 40, klipp_y=STEN_Y - 30, mood="skrattar")
place(c, STEN, STEN_X, STEN_Y, STEN_H)
olle_vid_busken(c, mood="njuter", arm_l=-150, arm_r=150)
arrow(c, [(1050, 300), (700, 220), (380, 330)])
frames["11"] = c

# 12 Närbild Olle: tar bort händerna, tittar på tittaren och väntar (Var är björnen?)
c = skog(); buske(c)
olle_vid_busken(c, mood="nyfiken", titt=(0, 0))
frames["12"] = närbild(c, 790, 470, 470)

# 13 Björnen tittar fram vid sidan av stenen
c = skog(sten=False); buske(c)
figur(c, "björn", STEN_X + 150, fot=G, mood="skrattar", titt=(1, 0), rot=12)
place(c, STEN, STEN_X, STEN_Y, STEN_H)
olle_vid_busken(c, mood="skrattar", titt=(-1, 0), arm_r=100)
frames["13"] = c

# 14 De plockar blåbär i korgen tillsammans
c = skog(); buske(c)
korg(c, 900, G, 95, bär=3)
figur(c, "olle", 780, mood="glad", titt=(1, -0.3), arm_r=60)
figur(c, "björn", 1090, mood="glad", titt=(-1, -0.3), arm_l=-60)
frames["14"] = c


def tillsammans(c, olle={}, björn={}, korg_bär=None):
    if korg_bär is not None:
        korg(c, 900, G, 95, bär=korg_bär)
    figur(c, "olle", 780, **({"mood": "glad", "titt": (1, -0.3)} | olle))
    figur(c, "björn", 1050, **({"mood": "glad", "titt": (-1, -0.3)} | björn))


# 15 Närbild björnen: luktar på korgen och slickar sig om nosen
c = skog(); buske(c)
korg(c, 900, G, 95, bär=3)
figur(c, "björn", 1050, mood="slickar", titt=(-1, 0.5))
frames["15"] = närbild(c, 1000, 480, 520)

# 16 Olle klappar björnen försiktigt på magen
c = skog(); buske(c)
tillsammans(c, olle={"arm_r": 75}, björn={"mood": "skrattar"})
frames["16"] = tvåbild(c, 900, 450, 720)

# 17 Olle räcker fram korgen
c = skog(); buske(c)
tillsammans(c, olle={"arm_r": 60, "håll": 3}, björn={"titt": (-1, 0.4)})
frames["17"] = tvåbild(c, 900, 450, 720)

# 18 Närbild björnen äter ur korgen, blå prickar på nosen
c = skog(); buske(c)
figur(c, "björn", 1050, mood="skrattar", blå_nos=True, arm_l=-40)
korg(c, 1000, G - 40, 120, bär=2, rot=-8)
frames["18"] = närbild(c, 1030, 480, 520)

# 19 Olle skrattar, björnen klappar sig på magen
c = skog(); buske(c)
tillsammans(c, olle={"mood": "skrattar"}, björn={"mood": "skrattar", "arm_l": 30, "blå_nos": True}, korg_bär=0)
frames["19"] = tvåbild(c, 900, 450, 720)

# 20 Korgen är tom (Oj! Tomt!)
c = skog(); buske(c)
tillsammans(c, olle={"mood": "forvanad", "titt": (1, 1)}, björn={"blå_nos": True}, korg_bär=0)
frames["20"] = tvåbild(c, 900, 450, 720)

# 21 Mor kommer gående från vänster och ropar
c = skog(); buske(c)
tillsammans(c, björn={"blå_nos": True}, korg_bär=0)
figur(c, "mor", 430, mood="ropar", titt=(1, 0), arm_r=40)
arrow(c, [(220, 280), (380, 280)])
frames["21"] = c

# 22 Mor ser björnen och stannar med händerna upp, björnen blir också förvånad
c = skog(); buske(c)
tillsammans(c, olle={"titt": (-1, -0.3)}, björn={"mood": "forvanad", "titt": (-1, 0), "blå_nos": True}, korg_bär=0)
figur(c, "mor", 500, mood="forvanad", titt=(1, 0), arm_l=-130, arm_r=130)
frames["22"] = c

# 23 Björnen skuttar lugnt bakom busken och gömmer sig
c = skog(); bakom_busken(c, 0.15); buske(c)
korg(c, 900, G, 95, bär=0)
figur(c, "olle", 780, mood="forvanad", titt=(1, -0.3))
figur(c, "mor", 500, mood="forvanad", titt=(1, 0))
arrow(c, [(1180, 330), (1110, 270), (1050, 330)])
skak(c, BUSK_X, BUSK_Y - 140)
frames["23"] = c

# 24 Närbild Olle: tittar på busken, sedan upp på mor
c = skog(); buske(c)
figur(c, "olle", 780, mood="ledsen", titt=(-1, -0.6))
frames["24"] = närbild(c, 760, 470, 470)

# 25 Tvåbild Olle och mor: mor böjer sig ner och ler
c = skog(); buske(c)
figur(c, "mor", 620, mood="glad", titt=(1, 0.6), rot=-10)
figur(c, "olle", 780, mood="ledsen", titt=(-1, -0.6))
frames["25"] = tvåbild(c, 700, 450, 720)

# 26 Mor vinkar mot busken, björnens öron tittar upp
c = skog(); bakom_busken(c, 0.2); buske(c)
figur(c, "mor", 620, mood="glad", titt=(1, 0), arm_r=120)
figur(c, "olle", 780, mood="nyfiken", titt=(1, -0.3))
frames["26"] = c

# 27 Björnen kliver fram, mor räcker fram en näve blåbär (Varsågod! – Tack!)
c = skog(); buske(c)
figur(c, "olle", 640, mood="skrattar")
figur(c, "mor", 790, mood="glad", titt=(1, 0), arm_r=75)
figur(c, "björn", 1090, mood="glad", titt=(-1, 0.3))
for dx, dy in ((0, 0), (22, -8), (10, 16)):
    blåbär(c, 905 + dx, 470 + dy, 12)
frames["27"] = tvåbild(c, 940, 450, 760)

# 28 Alla tre äter blåbär vid busken, kritirisen sluter sig
c = skog(); buske(c)
figur(c, "mor", 640, mood="skrattar")
figur(c, "olle", 790, mood="skrattar", blå_mun=True)
figur(c, "björn", 1060, mood="skrattar", blå_nos=True)
kritiris(c, 860, 440, 300)
frames["28"] = c

# --- Text till varje bild (ur ../storyboard.md) ---------------------------------------------------------------
I, F, V1, V2, M1, V3, M2, V4, S = "Intro", "Förspel", "Vers 1", "Vers 2", "Mellanspel 1", "Vers 3", "Mellanspel 2", "Vers 4", "Svans"
SHOTS = [  # (id, sångtid start, del, kamera, vad, sjungs, sägs)
    ("00", -11.0, I, "fast", "Introt ”Kort i himlen” med Avsnitt 17 · Mors lilla Olle. Platshållare: renderas från 014:s intro/.", "", ""),
    ("01", 0.0, F, "kritan ritar · papper", "Ritintrot: kritan (blå) ritar konturen av ett blåbär med krona i ett drag, väntar medan barnet gissar, och blåbäret fylls i inifrån.", "", "BERÄTTAREN: Titta! … Något runt. … (paus) … Ett blåbär!"),
    ("02", 12.8, F, "zoom in", "Zoom in genom ett hål i papperet, och blåbäret hamnar på busken i skogen.", "", ""),
    ("03", 14.3, F, "helbild", "Olle går in från vänster med korgen och stannar vid busken med blåbär.", "", ""),
    ("04", 17.0, V1, "helbild", "Olle plockar ett blåbär och lägger det i korgen.", "Mors lilla Olle i skogen gick,", ""),
    ("05", 21.3, V1, "närbild Olle", "Olle ler mot tittaren med röda kinder och äter ett bär. Munnen blir blå.", "rosor på kind och solsken i blick. / Läpparna små utav bären blå.", ""),
    ("06", 29.9, V1, "helbild", "Olle står ensam och tittar åt båda hållen.", "”Bara jag slapp att så ensam gå!”", ""),
    ("07", 34.5, V2, "helbild", "Busken prasslar, två runda bruna öron tittar upp ovanför den.", "Brumm, brumm, vem lufsar där?", ""),
    ("08", 39.2, V2, "tvåbild", "Busken gungar, bara öronen syns. Olle lutar huvudet.", "Buskarna knaka, en hund visst det är.", ""),
    ("09", 43.2, V2, "helbild", "Björnen reser sig och kliver fram, rund och mjuk.", "Lurvig är pälsen, och Olle blir glad:", ""),
    ("10", 47.6, V2, "tvåbild", "Olle vinkar, björnen vinkar tillbaka.", "”Å, en kamrat, det var bra, god dag!”", ""),
    ("11", 52.0, M1, "helbild", "Björnen skuttar lugnt bakom stenen och gömmer sig. Olle håller för ögonen.", "", "BJÖRNEN: brum"),
    ("12", 58.0, M1, "närbild Olle", "Olle tar bort händerna, tittar på tittaren och väntar.", "", "BERÄTTAREN: Var är björnen? … (paus 4,5 s)"),
    ("13", 64.0, M1, "helbild", "Björnen tittar fram vid sidan av stenen.", "", "OLLE: glatt skrik, fniss"),
    ("14", 68.0, M1, "helbild", "De plockar blåbär i korgen tillsammans, björnen med sin stora tass.", "", "BERÄTTAREN: Ett … två … tre blåbär!"),
    ("15", 74.0, M1, "närbild björnen", "Björnen luktar på korgen och slickar sig om nosen.", "", "BJÖRNEN: mmm, mums"),
    ("16", 78.5, V3, "tvåbild", "Olle klappar björnen försiktigt på magen.", "Klappade björnen med händerna små,", ""),
    ("17", 82.4, V3, "tvåbild", "Olle räcker fram korgen.", "räckte fram korgen: ”Se här, smaka på!”", ""),
    ("18", 86.7, V3, "närbild björnen", "Björnen äter ur korgen, mums. Blå prickar på nosen.", "Nalle han slukade mest vad där var.", ""),
    ("19", 91.2, V3, "tvåbild", "Olle skrattar, björnen klappar sig på magen.", "”Hör du, jag tror att du tycker om bär!”", ""),
    ("20", 96.0, M2, "tvåbild", "Olle tittar i korgen: tom.", "", "OLLE: förvånat oj, fniss"),
    ("21", 99.0, M2, "helbild", "Mor kommer gående från vänster och ropar.", "", "MOR: ropar utan ord, hu-huu"),
    ("22", 104.2, V4, "helbild", "Mor ser björnen och stannar med händerna upp. Björnen blir också förvånad.", "Mor fick nu se dem, hon gav till ett skri.", ""),
    ("23", 108.5, V4, "helbild", "Björnen skuttar lugnt bakom busken och gömmer sig. Busken gungar.", "Björnen sprang bort, nu är leken förbi.", ""),
    ("24", 112.9, V4, "närbild Olle", "Olle tittar på busken, sedan upp på mor.", "”Å, varför skrämde du undan min vän?", ""),
    ("25", 117.3, V4, "tvåbild", "Mor böjer sig ner till Olle och ler.", "Mor, lilla mor, be'n att komma igen!”", ""),
    ("26", 122.0, S, "helbild", "Mor vinkar mot busken. Björnens öron tittar upp.", "", "MOR: lockande mm?"),
    ("27", 125.0, S, "tvåbild", "Björnen kliver fram. Mor räcker fram en näve blåbär.", "", "BERÄTTAREN: Varsågod! · BJÖRNEN: Tack!"),
    ("28", 129.0, S, "helbild → kritiris", "Alla tre äter blåbär vid busken. Kritirisen sluter sig runt dem, svart.", "", ""),
]
UNGEFÄR = {"04", "07", "16", "22"}   # versernas första rad är räknad bakåt från rad 2, se ../rader.txt
FÄRG = {I: "#c9c3b5", F: "#bfe6c8", V1: "#f4b6a8", V2: "#e8a07f", M1: "#a9c9e8", V3: "#d9a0c8", M2: "#a9c9e8", V4: "#f2d48a", S: "#9fd3b0"}


def mmss(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"


START = [INTRO + s[1] for s in SHOTS]
SLUT = INTRO + SÅNG_SLUT
SPANN = list(zip(START, START[1:] + [SLUT]))

assert sorted(frames) == sorted(s[0] for s in SHOTS), set(frames) ^ set(s[0] for s in SHOTS)
(HÄR / "frames").mkdir(exist_ok=True)
for k, v in frames.items():
    papperskorn(v.convert("RGB")).save(HÄR / "frames" / f"{k}.jpg", quality=88)
# avsnittstid per bild (id start slut, sekunder), för grovklippet ../film/satt-ihop.sh
(HÄR / "frames" / "tider.txt").write_text("".join(f"{s[0]} {a:.2f} {b:.2f}\n" for s, (a, b) in zip(SHOTS, SPANN)), encoding="utf-8")

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
<title>Mors lilla Olle: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --acc:#3c7a52;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#9fd3b0; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#9fd3b0; color-scheme:dark }}
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
.song {{ border-left:3px solid #e8c95a; padding-left:10px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Mors lilla Olle <span>storyboard</span></h1>
<p class="lede">Avsnitt 017, första utkast. Bilderna är byggda av utklippen i <code>assets/</code> i Skogen 1, med riggarna för Olle, mor och björnen och ansiktena ritade i kod. Pilarna visar rörelsen. Avsnittstid = sångtid + 11 s.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>1</b><span>plats</span></div><div><b>3</b><span>figurer</span></div><div><b>0</b><span>nya saker</span></div><div><b>5</b><span>kamerainställningar</span></div><div><b>≈{mmss(SLUT)}</b><span>längd</span></div></div>
<div class="tl">{tl}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Repliker och berättarröst bara i förspelet, mellanspelen och svansen. Vers 1 och 2 sjungs i ett svep.</li>
<li><b>Platshållare:</b> introt (00), blåbären och den blå munnen (ritade i kod, <code>rekvisita/blabar.md</code> har ingen bild än), och mors böjning (25), som här är den stående figuren lutad.</li>
<li><b>Riggarna:</b> armarna vrids runt vridpunkterna i <code>*-rigg.json</code>, så vinkningar och korgen i handen är riktiga poser, inte målade.</li>
<li><b>Björnen bakom busken och stenen</b> klipps av nertill, så att bara öronen eller sidan syns (tittut).</li>
<li><b>≈</b> på 04, 07, 16 och 22: versens första rad är räknad bakåt från rad 2, lyssna på sang.mp3.</li>
<li><b>Byggs om</b> med <code>python3 bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")
print(f"{len(frames)} bilder, längd ≈{mmss(SLUT)}, index.html klar")
