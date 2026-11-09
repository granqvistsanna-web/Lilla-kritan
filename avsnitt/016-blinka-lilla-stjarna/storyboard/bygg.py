"""Bygger bildstoryboarden för avsnitt 016 (Blinka lilla stjärna) av utklippen och Nattkullen i 16:9.
Hjälpfunktionerna (kritfyll, vit kant, place, papperskorn) är kopierade ur 014:s bygg.py; ansiktena ritas med verktyg/ansikten.py.

Kör: python3 bygg.py   (från den här mappen)
Skriver frames/*.jpg och index.html. Kostar inga krediter. ../storyboard.md skrivs inte över.
Tiderna (sångtid) är samma som i ../storyboard.md och ../rader.txt; avsnittstid = sångtid + 9 s.
"""
import html
import math
import re
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
INTRO = 9.0   # det nya introt (som 013/015, 9,0 s; Sanna 2026-11-09 "new intro"); förut 11,0 (Kort i himlen)
SÅNG_SLUT = 150.0

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


# --- Bilderna ur assets/ --------------------------------------------------------------------------------------
PLÅT = Image.open(A / "bakgrunder/nattkullen/nattkullen-16x9.png").convert("RGBA")
SAK = A / "bakgrunder/nattkullen-saker"
STJÄRNA, MÅNE, MOLN = (vit_kant(Image.open(SAK / f).convert("RGBA"), 9) for f in ("stjarna.png", "mane.png", "moln-2.png"))
LILA = (150, 140, 200)   # filtens rutor, omfärgade från rött i kod (Sanna 2026-11-07): lugnt mot natten, Nicke är det enda röda


def lila_filt(im):
    """Picknickfilten med lila rutor i stället för röda. Det röda (r tydligt över g och b) byts mot LILA, ljusare där kritan
    är gles; det vita dämpas en aning så att det inte lyser mot natten. Bilden i assets/ ändras inte."""
    a = np.asarray(im).astype(float)
    r, g, b = (a[..., i] / 255 for i in range(3))
    röd = r - np.maximum(g, b)
    ut = a.copy()
    gles = (1 - röd.clip(0, 1))[..., None]
    ut[..., :3] = np.where((röd > 0.15)[..., None], np.array(LILA, float) * (0.85 + 0.3 * gles), a[..., :3] * 0.92)
    return Image.fromarray(ut.clip(0, 255).astype(np.uint8))


FILT = lila_filt(rgba("rekvisita/picknickfilt/cut/picknickfilt-v2.png"))
KUDDE = rgba("rekvisita/kudde/cut/kudde-v1.png")
NALLE = rgba("rekvisita/nalle/cut/nalle-framifran-v1.png")
GUL = (246, 231, 168)   # stjärnans blekgula #F6E7A8

KULLE_Y = lambda x: 523 + 152 * ((x - 700) / 690) ** 2   # kullens kant i 16:9-plattan (mätt: y 523 vid x 600–800, ca 675 vid kanterna)
STJ = (1085, 150, 92)    # stjärnan: x, y, höjd
MÅN = (215, 170, 190)

# Lejonet: rigg med armar (ritadeDelar), ansiktet i kod. Fötterna (546, 905) i 1024-rutan.
LAGE = A / "karaktarer/lejonet-lage"
LAGE_RIG = {"arm-r": ((734, 590), (734, 795)), "arm-l": ((290, 590), (290, 795))}
LAGE_ANS = dict(ogon=[(413, 401), (604, 398)], mun=(513, 522), munskala=1.2)
LAGE_LIGG_ANS = dict(ogon=[(410, 476), (600, 476)], mun=(505, 628), munskala=1.2)
NICKE_ANS = dict(ogon=[(413, 400), (605, 398)], mun=(508, 462), munskala=1.1)
NICKE_HUVUD = "M451 200 L429 210 L423 220 L394 230 L382 240 L369 250 L372 260 L363 270 L354 280 L347 290 L338 300 Q440 292 512 356 Q584 292 693 300 L683 290 L676 280 L668 270 L657 260 L648 250 L637 240 L627 230 L591 220 L592 210 L565 200 Q508 186 451 200 Z"


def svg_punkter(dstr):
    """M/L/Q-stigen ur godnattsagans index.html som punkter (Q delas upp i 12 steg)."""
    pts, tok = [], re.findall(r"[MLQZ]|-?\d+(?:\.\d+)?", dstr)
    i, cmd = 0, None
    while i < len(tok):
        if tok[i] in "MLQZ":
            cmd = tok[i]
            i += 1
            continue
        if cmd in "ML":
            pts.append((float(tok[i]), float(tok[i + 1])))
            i += 2
        elif cmd == "Q":
            (x0, y0), cx, cy, x1, y1 = pts[-1], *map(float, tok[i:i + 4])
            pts += [((1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1)
                    for t in (k / 12 for k in range(1, 13))]
            i += 4
    return pts


def vinkel_mot(piv, spets, mål):
    return math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]) - math.atan2(piv[1] - spets[1], spets[0] - piv[0]))


def lage(mood="glad", titt=(0, 0), peka_r=None):
    c = Image.new("RGBA", (1024, 1024))
    c.alpha_composite(rgba("karaktarer/lejonet-lage/cut/lejonet-lage-body.png"))
    ansikten.rita(c, mood, titt, **LAGE_ANS)
    for d in ("arm-l", "arm-r"):
        piv, spets = LAGE_RIG[d]
        arm = vit_kant(Image.open(LAGE / f"lemmar/lejonet-lage-{d}.png").convert("RGBA"), 9)
        v = vinkel_mot(piv, spets, peka_r) if (d == "arm-r" and peka_r) else (35 if d == "arm-r" else -35)
        c.alpha_composite(arm.rotate(v, resample=Image.BICUBIC, center=piv))
    return c


def lage_ligger(mood="glad", titt=(0, 0)):
    c = rgba("karaktarer/lejonet-lage/ligger/lejonet-lage-ligger.png")
    ansikten.rita(c, mood, titt, **LAGE_LIGG_ANS)
    return c


def nicke(mood="glad", titt=(0, 0)):
    c = rgba("karaktarer/nyckelpigan-nicke/cut/nyckelpigan-nicke-faceless.png")
    m, d = ritmask(c)
    d.polygon(svg_punkter(NICKE_HUVUD), fill=255)
    kritfyll(c, ImageChops.multiply(m, c.getchannel("A")), (24, 22, 22), vick=0.12, oskarp=1.0)
    ansikten.rita(c, mood, titt, **NICKE_ANS)
    return c


def nicke_sover():
    return rgba("karaktarer/nyckelpigan-nicke/cut/nyckelpigan-nicke-sover.png")


# --- Små saker i kod -------------------------------------------------------------------------------------------
def glimt(c, x, y, r, col=(255, 248, 214), a=1.0):
    """En fyruddig glimt (tindrande), kritfylld. Inte effektstreck: en liten form."""
    m, d = ritmask(c)
    pts = []
    for i in range(8):
        v = math.pi / 4 * i - math.pi / 2
        rr = r if i % 2 == 0 else r * 0.28
        pts.append((x + rr * math.cos(v), y + rr * math.sin(v)))
    d.polygon(pts, fill=255)
    kritfyll(c, m, col, alpha=a, vick=0.12, oskarp=0.8)


def sken(c, x, y, r, col=GUL, a=0.45):
    """Mjukt sken runt stjärnan eller månen."""
    lag = Image.new("RGBA", c.size)
    ImageDraw.Draw(lag).ellipse((x - r, y - r, x + r, y + r), fill=col + (int(255 * a),))
    c.alpha_composite(lag.filter(ImageFilter.GaussianBlur(r / 2.5)))


def småstjärnor(c, n=9):
    rng = np.random.default_rng(16)
    for _ in range(n):
        x, y = rng.uniform(60, W - 60), rng.uniform(40, 380)
        if math.dist((x, y), STJ[:2]) < 160 or math.dist((x, y), MÅN[:2]) < 150:
            continue
        place(c, STJÄRNA, x, y + 9, 18)


def himmel(stjärna=True, glans=0, måne_sken=0, moln_x=None, små=True):
    c = PLÅT.copy()
    if små:
        småstjärnor(c)
    if måne_sken:
        sken(c, MÅN[0], MÅN[1] - MÅN[2] / 2, 150, (248, 242, 221), måne_sken)
    place(c, MÅNE, MÅN[0], MÅN[1], MÅN[2], rot=-8)
    if stjärna:
        if glans:
            sken(c, STJ[0], STJ[1] - STJ[2] / 2, 110 * (0.8 + glans * 0.4), GUL, 0.35 + 0.25 * glans)
        place(c, STJÄRNA, STJ[0], STJ[1], STJ[2] * (1 + 0.12 * glans))
    if moln_x is not None:
        place(c, MOLN, moln_x, STJ[1] + 30, 135)
    return c


FILT_X, FILT_Y = 700, 548    # filten på kullens topp


def filt(c, k=1.25, kudde_x=None, nalle=False):
    """Filten är 1,25 gånger större än i första utkastet, så att båda får plats liggande i samma skala som stående."""
    place(c, FILT, FILT_X, FILT_Y + 16 * k, 120 * k)
    if kudde_x is not None:
        place(c, KUDDE, kudde_x, FILT_Y - 4, 80)
    if nalle:
        place(c, NALLE, FILT_X - 165 * k, FILT_Y - 2, 95)


# En skala per figur (px i bild per enhet i figurens 1024-ruta), samma stående och liggande, som i godnattsagorna:
# lejonet har en skala för båda (0.62 i Shorten), nyckelpigans sovbild är 0.45/0.48 av den stående (likaså).
LAGE_K = 230 / 841          # stående lejonet 230 px högt (kroppens höjd i rutan 841)
NICKE_K = 150 / 841         # stående nyckelpigan 150 px
NICKE_SOVER_K = NICKE_K * 0.45 / 0.48


def figur(c, im, x, fot, k, sy=1.0, rot=0):
    """Figuren i skala k (px per enhet i 1024-rutan), så att den har samma storlek oavsett pose."""
    im = vit_kant(im, 11)
    bb = im.getbbox()
    place(c, im, x, fot, (bb[3] - bb[1]) * k, sy=sy, rot=rot)


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


# --- Bilderna -------------------------------------------------------------------------------------------------
UPP = (1700, -900)     # en punkt uppe till höger i lejonets 1024-ruta (pekar mot stjärnan)


LIGG_LAGE_X, LIGG_NICKE_X = 650, 822   # liggande på filten: lejonet till vänster med kudden bakom huvudet, nyckelpigan till höger


def helbild(lage_im=None, nicke_im=None, lage_x=640, nicke_x=790, lage_ligger_=False, nicke_sover_=False, **kw):
    c = himmel(**kw)
    if lage_ligger_:
        lage_x = LIGG_LAGE_X
        nicke_x = LIGG_NICKE_X
    filt(c, kudde_x=(lage_x - 85) if lage_ligger_ else None, nalle=True)
    if lage_im is not None:
        figur(c, lage_im, lage_x, (FILT_Y + 8) if lage_ligger_ else (KULLE_Y(lage_x) + 14), LAGE_K)
    if nicke_im is not None:
        figur(c, nicke_im, nicke_x, (FILT_Y + 8) if nicke_sover_ else KULLE_Y(nicke_x) + 12, NICKE_SOVER_K if nicke_sover_ else NICKE_K)
    return c


def tvåbild(**kw):
    return crop_zoom(helbild(**kw), 705, 420, 640)


frames = {}

# 00 Intro: platshållare (introt renderas från 014:s intro/index.html med nytt nummer och titel)
c = himmel(stjärna=True, små=True).convert("RGBA")
f = font(70)
d = ImageDraw.Draw(c)
for i, (t, y) in enumerate((("Avsnitt 16", 300), ("Blinka lilla stjärna", 400))):
    d.text((W / 2, y), t, font=f if i else font(48), fill=GUL, anchor="mm", stroke_width=5, stroke_fill=(30, 40, 90))
frames["00"] = c

# 01 Kritan ritar stjärnan, udd för udd (tre av fem uddar färdiga)
c = Image.new("RGBA", (W, H), PAPER + (255,))
st = Image.new("RGBA", (W, H))
place(st, STJÄRNA, W / 2, H / 2 + 170, 340)
m = Image.new("L", (W, H))
ImageDraw.Draw(m).pieslice((W / 2 - 400, H / 2 - 400, W / 2 + 400, H / 2 + 400), -90 - 216, -90 + 0, fill=255)
st.putalpha(ImageChops.multiply(st.getchannel("A"), m))
c.alpha_composite(st)
m, d = ritmask(c)
kx, ky = W / 2 + 150, H / 2 - 40
d.polygon([(kx, ky), (kx + 30, ky - 18), (kx + 170, ky - 230), (kx + 140, ky - 248)], fill=255)
kritfyll(c, m, (236, 200, 90), vick=0.1, oskarp=0.8)
frames["01"] = c

# 02 Zoom in i teckningen: stjärnan på papperet, kameran åker in (pilar från hörnen)
c = Image.new("RGBA", (W, H), PAPER + (255,))
place(c, STJÄRNA, W / 2, H / 2 + 170, 340)
for (x, y), (x2, y2) in (((70, 70), (190, 160)), ((W - 70, 70), (W - 190, 160)), ((70, H - 70), (190, H - 160)), ((W - 70, H - 70), (W - 190, H - 160))):
    arrow(c, [(x, y), (x2, y2)], col=INK)
frames["02"] = c

# 03 Lejonet går upp på kullen med filten, nyckelpigan efter med kudden och nallen
c = himmel()
lx = 430
figur(c, lage("glad", (0.6, -0.2)), lx, KULLE_Y(lx) + 14, LAGE_K, rot=-4)
place(c, FILT, lx + 95, KULLE_Y(lx) - 70, 70, rot=-10)
nx = 235
figur(c, nicke("glad", (1, 0)), nx, KULLE_Y(nx) + 12, NICKE_K, rot=-3)
place(c, KUDDE, nx + 70, KULLE_Y(nx) - 70, 55)
place(c, NALLE, nx - 70, KULLE_Y(nx) - 40, 60)
arrow(c, [(lx + 60, KULLE_Y(lx) - 250), (650, 300)])
frames["03"] = c

# 04 Nyckelpigan ger lejonet kudden (Varsågod! – Tack!), lejonet sätter sig på filten
c = himmel()
filt(c, nalle=True)
figur(c, lage("skrattar", (0.5, 0)), 640, FILT_Y + 10, LAGE_K, sy=0.86)
figur(c, nicke("glad", (-1, 0)), 815, KULLE_Y(815) + 12, NICKE_K)
place(c, KUDDE, 740, FILT_Y - 70, 70, rot=8)
arrow(c, [(790, 380), (720, 400)])
frames["04"] = crop_zoom(c, 705, 420, 640)

# 05 Närbild stjärnan tindrar
c = himmel(glans=1)
glimt(c, STJ[0] + 70, STJ[1] - 95, 22)
glimt(c, STJ[0] - 62, STJ[1] - 40, 14)
frames["05"] = crop_zoom(c, STJ[0], STJ[1] - 46, 420)

# 06 Tvåbild: båda tittar upp och undrar
frames["06"] = tvåbild(lage_im=lage("nyfiken", (0.6, -1)), nicke_im=nicke("nyfiken", (0.5, -1)))

# 07 Helbild: små på kullen, stjärnan långt borta, lejonet pekar
c = helbild(lage_im=lage("glad", (0.6, -1), peka_r=UPP), nicke_im=nicke("nyfiken", (0.5, -1)))
frames["07"] = c

# 08 Närbild stjärnan: en glittrande glimt
c = himmel(glans=0.6)
glimt(c, STJ[0] + 26, STJ[1] - 70, 30)
frames["08"] = crop_zoom(c, STJ[0], STJ[1] - 46, 420)

# 09 Närbild nyckelpigan blinkar, stjärnan tindrar tillbaka i hörnet
c = helbild(lage_im=lage("glad", (0.6, -1)), nicke_im=nicke("blinkar", (0.4, -1)), glans=1)
frames["09"] = crop_zoom(c, 760, 450, 400)

# 10 Närbild lejonet blinkar också
c = helbild(lage_im=lage("blinkar", (0.5, -1)), nicke_im=nicke("skrattar", (-0.5, -0.5)), glans=1)
frames["10"] = crop_zoom(c, 640, 380, 470)

# 11 Mellanspelet: molnet glider in från vänster mot stjärnan
c = helbild(lage_im=lage("nyfiken", (0.6, -1)), nicke_im=nicke("nyfiken", (0.5, -1)), moln_x=820)
arrow(c, [(600, STJ[1] - 40), (720, STJ[1] - 40)])
frames["11"] = c

# 12 Stjärnan är borta: båda förvånade (Oj!)
frames["12"] = tvåbild(lage_im=lage("forvanad", (0.6, -1)), nicke_im=nicke("forvanad", (0.3, -1)), moln_x=STJ[0])

# 13 Närbild lejonet tittar på tittaren och väntar (Var är stjärnan? … paus 4,5 s)
c = helbild(lage_im=lage("nyfiken"), nicke_im=nicke("nyfiken", (0.3, -1)), moln_x=STJ[0])
frames["13"] = crop_zoom(c, 640, 400, 470)

# 14 Molnet glider vidare, stjärnan tittar fram (Där är den!)
c = helbild(lage_im=lage("skrattar", (0.6, -1), peka_r=UPP), nicke_im=nicke("skrattar", (0.5, -1)), moln_x=1300, glans=1)
arrow(c, [(1180, STJ[1] - 150), (1300, STJ[1] - 150)])
frames["14"] = c

# 15 Lejonet gäspar och lägger sig på kudden med nallen, nyckelpigan kryper intill
frames["15"] = tvåbild(lage_im=lage_ligger("forvanad"), nicke_im=nicke("glad", (-0.8, 0)), lage_x=690, nicke_x=820, lage_ligger_=True)

# 16 Närbild stjärnan tindrar igen, långsammare
c = himmel(glans=0.5)
glimt(c, STJ[0] - 70, STJ[1] - 90, 14, a=0.8)
frames["16"] = crop_zoom(c, STJ[0], STJ[1] - 46, 420)

# 17 De ligger och tittar upp, nyckelpigan gäspar lite
frames["17"] = tvåbild(lage_im=lage_ligger("glad", (0.5, -1)), nicke_im=nicke("blinkar"), lage_x=690, nicke_x=820, lage_ligger_=True)

# 18 Helbild, kameran glider sakta in mot filten
c = helbild(lage_im=lage_ligger("glad", (0.5, -1)), nicke_im=nicke("glad", (0.3, -1)), lage_x=690, nicke_x=820, lage_ligger_=True)
for (x, y), (x2, y2) in (((300, 200), (440, 300)), ((W - 300, 200), (W - 440, 300)), ((300, H - 60), (440, H - 130)), ((W - 300, H - 60), (W - 440, H - 130))):
    arrow(c, [(x, y), (x2, y2)])
frames["18"] = c

# 19 Närbild stjärnan: en sista glimt
c = himmel(glans=0.7)
glimt(c, STJ[0] + 30, STJ[1] - 20, 26)
frames["19"] = crop_zoom(c, STJ[0], STJ[1] - 46, 420)

# 20 Nyckelpigan somnar (sovposen), lejonet blinkar långsamt
frames["20"] = tvåbild(lage_im=lage_ligger("njuter"), nicke_im=nicke_sover(), lage_x=680, nicke_x=815, lage_ligger_=True, nicke_sover_=True)

# 21 Lejonet somnar med nallen
frames["21"] = tvåbild(lage_im=lage_ligger("sleep"), nicke_im=nicke_sover(), lage_x=680, nicke_x=815, lage_ligger_=True, nicke_sover_=True)

# 22 Svansen: månen lyser upp, båda sover (godnatt)
frames["22"] = helbild(lage_im=lage_ligger("sleep"), nicke_im=nicke_sover(), lage_x=680, nicke_x=815, lage_ligger_=True, nicke_sover_=True,
                       måne_sken=0.55, glans=0.6)

# 23 Kritirisen sluter sig runt de sovande på filten
c = helbild(lage_im=lage_ligger("sleep"), nicke_im=nicke_sover(), lage_x=680, nicke_x=815, lage_ligger_=True, nicke_sover_=True,
            måne_sken=0.55, glans=0.6)
kritiris(c, 715, 465, 215)
glimt(c, 870, 330, 20)
frames["23"] = c

# --- Text till varje bild (ur ../storyboard.md) ---------------------------------------------------------------
I, F, V1, M, V2, S = "Intro", "Förspel", "Vers 1", "Mellanspel", "Vers 2", "Svans"
SHOTS = [  # (id, sångtid start, del, kamera, vad, sjungs, sägs)
    ("00", -INTRO, I, "fast", "Det nya introt (som 013/015, 9,0 s): LILLA KRITAN, titeln Blinka lilla stjärna på en guldgul kritfläck, nattblått kritsvep in i ritandet. I ../intro/.", "", ""),
    ("01", 0.0, F, "kritan ritar · papper", "Kritan (blekgul) ritar en femuddig stjärna, udd för udd.", "", "BERÄTTAREN: Nu ska vi se vad kritan ritar. … Hmm. … En stjärna!"),
    ("02", 9.0, F, "zoom in", "Kameran åker in i teckningen, och stjärnan hamnar högt på natthimlen.", "", ""),
    ("03", 11.0, F, "helbild", "Kväll. Lejonet går upp på kullen med filten, nyckelpigan efter med kudden och nallen.", "", ""),
    ("04", 18.0, F, "tvåbild", "Nyckelpigan ger lejonet kudden. Lejonet sätter sig på filten med nallen.", "", "NICKE: Varsågod! · LAGE: Tack!"),
    ("05", 24.0, V1, "närbild stjärnan", "Stjärnan tindrar på ”blinka”: lite större och ljusare.", "Blinka lilla stjärna där,", ""),
    ("06", 29.0, V1, "tvåbild", "Båda tittar upp och lutar huvudet.", "hur jag undrar vad du är.", ""),
    ("07", 33.5, V1, "helbild", "Små på kullen, stjärnan högt och långt borta. Lejonet pekar upp.", "Fjärran lockar du min syn,", ""),
    ("08", 39.3, V1, "närbild stjärnan", "Stjärnan glittrar, en glimt som vandrar över den.", "lik en diamant i skyn.", ""),
    ("09", 45.7, V1, "närbild Nicke", "Nyckelpigan blinkar långsamt mot stjärnan, och stjärnan tindrar tillbaka.", "Blinka lilla stjärna där,", ""),
    ("10", 51.6, V1, "närbild Lage", "Lejonet blinkar också, och stjärnan tindrar tillbaka.", "hur jag undrar vad du är.", ""),
    ("11", 57.5, M, "helbild", "Molnet glider sakta in från vänster och lägger sig framför stjärnan.", "", ""),
    ("12", 64.0, M, "tvåbild", "Stjärnan är borta. De tittar på varandra.", "", "NICKE: Oj!"),
    ("13", 67.0, M, "närbild Lage", "Lejonet tittar på tittaren och väntar.", "", "BERÄTTAREN: Var är stjärnan? … (paus 4,5 s)"),
    ("14", 74.0, M, "helbild", "Molnet glider vidare åt höger, och stjärnan tittar fram igen.", "", "BERÄTTAREN: Där är den!"),
    ("15", 78.0, M, "tvåbild", "Lejonet gäspar stort och lägger sig på kudden med nallen, nyckelpigan kryper intill.", "", "LAGE: Rrroar! … Oj, det blev visst en gäspning."),
    ("16", 84.0, V2, "närbild stjärnan", "Stjärnan tindrar igen, långsammare.", "Blinka lilla stjärna där,", ""),
    ("17", 89.0, V2, "tvåbild", "De ligger och tittar upp. Nyckelpigan gäspar en liten gäspning.", "hur jag undrar vad du är.", ""),
    ("18", 93.5, V2, "helbild", "Kameran glider sakta in mot filten.", "Fjärran lockar du min syn,", ""),
    ("19", 99.4, V2, "närbild stjärnan", "En sista glittrande glimt.", "lik en diamant i skyn.", ""),
    ("20", 105.4, V2, "tvåbild", "Nyckelpigan blundar och somnar (sovposen). Lejonet blinkar långsamt.", "Blinka lilla stjärna där,", ""),
    ("21", 111.9, V2, "tvåbild", "Lejonet blundar och somnar med nallen.", "hur jag undrar vad du är.", ""),
    ("22", 116.4, S, "helbild", "Månen lyser upp sakta. Stjärnan tindrar en gång. Båda sover.", "",
     "BERÄTTAREN: Godnatt, lejonet. · Godnatt, nyckelpigan. · Godnatt, lilla stjärna."),
    ("23", 130.0, S, "helbild → kritiris", "Kritirisen sluter sig runt de sovande på filten, stjärnan glimtar, svart.", "", ""),
]
UNGEFÄR = {"17", "18"}   # vers 2-rader som är uppskattade (vers 1 + 60 s), se ../rader.txt
FÄRG = {I: "#c9c3b5", F: "#b9b7d6", V1: "#f6e7a8", M: "#9fb6e0", V2: "#f2d48a", S: "#8e9cc4"}


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
<title>Blinka lilla stjärna: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --acc:#2F3A6B;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#f6e7a8; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --acc:#f6e7a8; color-scheme:dark }}
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
<h1>Blinka lilla stjärna <span>storyboard</span></h1>
<p class="lede">Avsnitt 016, första utkast. Bilderna är byggda av utklippen i <code>assets/</code> på Nattkullen i 16:9, med ansiktena ritade i kod. Pilarna visar rörelsen. Avsnittstid = sångtid + 11 s.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>1</b><span>plats</span></div><div><b>2</b><span>figurer</span></div><div><b>0</b><span>nya saker</span></div><div><b>5</b><span>kamerainställningar</span></div><div><b>≈{mmss(SLUT)}</b><span>längd</span></div></div>
<div class="tl">{tl}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Repliker och berättarröst bara i förspelet, mellanspelet och svansen.</li>
<li><b>Platshållare:</b> introt (00) och lejonets sittande pose (04), som här är den stående figuren nedtryckt på filten. Den sittande posen är avsnittets nya pose.</li>
<li><b>Nyckelpigans svarta huvud</b> ritas i kod som i godnattsagan; sovposen har huvudet i bilden.</li>
<li><b>Filten</b> har lila rutor, omfärgad i kod från den röda (beslutat 2026-11-07).</li><li><b>Stjärnans tindrande</b> är sken och små glimtar i kod, inga effektstreck. Stjärnan har inget ansikte.</li>
<li><b>≈</b> på 17–18: vers 2-raderna är uppskattade (vers 1 + 60 s), lyssna på sang.m4a.</li>
<li><b>Byggs om</b> med <code>python3 bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")
print(f"{len(frames)} bilder, längd ≈{mmss(SLUT)}, index.html klar")
