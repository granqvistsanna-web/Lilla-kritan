"""Bygger storyboarden för avsnitt 005 av de färdiga utklippen och bakgrunderna.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg, index.html och tabellen i ../storyboard.md. Kostar inga krediter.
Samma grepp som 004:s bygg.py: figurerna är de ansiktslösa utklippen med ansiktet ritat som i kit.js.
Saker som inte finns i assets/ än ritas som enkla platta former; kör om när bilderna finns.
"""
import html
import json
import math
import random
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
ROSA = (240, 110, 170)  # kioskens vägg, #F06EAA
BIL_ROSA = (246, 170, 200)
random.seed(5)
PLATSHÅLLARE = []


def bild(rel, ersätt):
    """Bilden ur assets/ om den finns, annars en platt platshållare (och den antecknas)."""
    p = A / rel
    if p.exists():
        return Image.open(p).convert("RGBA")
    PLATSHÅLLARE.append(rel)
    return ersätt()


def tom(w=1024, h=1024):
    im = Image.new("RGBA", (w, h))
    return im, ImageDraw.Draw(im)


def ph_kaross(säte=True):
    im, d = tom()
    d.rounded_rectangle((90, 520, 935, 820), 110, fill=BIL_ROSA)
    if säte:
        d.rounded_rectangle((340, 400, 420, 560), 30, fill=(120, 130, 210))
        d.ellipse((580, 380, 650, 450), outline=INK, width=12)
    return im


def ph_hjul(x):
    im, d = tom()
    d.ellipse((x - 80, 765, x + 80, 925), fill=INK)
    d.ellipse((x - 25, 820, x + 25, 870), fill=(250, 210, 60))
    return im


def ph_glass():
    im, d = tom(431, 743)
    d.polygon([(70, 300), (360, 300), (215, 740)], fill=(214, 160, 90))
    d.ellipse((40, 40, 390, 360), fill=(236, 120, 150))
    return im


def ph_buske():
    im, d = tom(857, 692)
    d.ellipse((0, 40, 857, 692), fill=(60, 150, 70))
    for x, y in ((220, 220), (430, 160), (620, 260), (300, 430), (560, 470)):
        d.ellipse((x - 50, y - 50, x + 50, y + 50), fill=(240, 120, 170))
    return im


def ph_ballong():
    im, d = tom(547, 895)
    d.ellipse((20, 0, 527, 580), fill=(232, 90, 160))
    d.line((273, 580, 260, 890), fill=INK, width=6)
    return im


def plate(slug):
    return Image.open(A / "bakgrunder" / slug / f"{slug}.png").convert("RGB").resize((W, H))


# --- Figurer: kropp, lemmar ur riggen och ansiktet ritat som i kit.js -----
DJUROGON = [(414, 401), (605, 399)]
ANSIKTE = {"musen-mille": dict(mun=(509, 482)), "kycklingen-pip": dict(mun=(512, 462))}
SPETS = {"musen-mille": {"arm-r": (885, 640), "arm-l": (178, 640)},  # handen, i figurens 1024-koordinater
         "kycklingen-pip": {"arm-r": (835, 645), "arm-l": (185, 650)}}
ÖRON = [((155, 100, 420, 265), (330, 265)), ((605, 100, 870, 265), (690, 265))]  # musens öron: ruta och fäste
GH = 250  # glassens höjd i figurens koordinater


def vinkel_mot(piv, spets, mål):
    """Grader moturs som vrider armen så att handen pekar mot mål."""
    return math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]) - math.atan2(piv[1] - spets[1], spets[0] - piv[0]))


def hand(piv, spets, vinkel, flytt=(0, 0)):
    """Var handen hamnar när armen vrids `vinkel` grader moturs runt vridpunkten (och flyttas `flytt`)."""
    a = math.radians(vinkel)
    dx, dy = spets[0] - piv[0], spets[1] - piv[1]
    return (piv[0] + dx * math.cos(a) + dy * math.sin(a) + flytt[0],
            piv[1] - dx * math.sin(a) + dy * math.cos(a) + flytt[1])


def lägg(canvas, im, cx, ground, h, rot=0):
    """Som place, men lägger RGBA på RGBA utan att förstöra genomskinligheten."""
    lager = Image.new("RGBA", canvas.size)
    place(lager, im, cx, ground, h, rot=rot)
    canvas.alpha_composite(lager)


def figur(namn, mood="open", blick=(0, 0), arm_r=0, arm_l=0, peka_r=None, peka_l=None, hand_r=None, hand_l=None,
          glass=(), spöke=(), vick=False, ben=True, lager="allt"):
    """Figuren med ansiktet ritat och armarna ur riggen.
    arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot, hand_* = punkt handen når (armen flyttas dit om den är för kort).
    glass = "r"/"l": en jordgubbsglass i den handen. spöke = [(del, vinkel)]: halvgenomskinlig arm där den var nyss.
    vick: halvgenomskinliga öron åt båda håll. lager: allt, kropp (utan armar) eller armar (armar och glassar).
    mood: open, happy, sad, big, skel (tittar på nosen), mums (tungan ute)."""
    mapp = A / "karaktarer" / namn
    rig = json.loads((mapp / f"{namn}-rigg.json").read_text())
    c = Image.new("RGBA", (1024, 1024))
    leder = {}
    for d, v, p, h in (("arm-r", arm_r, peka_r, hand_r), ("arm-l", arm_l, peka_l, hand_l)):
        piv, spets = tuple(rig["delar"][d]["vridpunkt"]), SPETS[namn][d]
        f = (0, 0)
        if p or h:
            v = vinkel_mot(piv, spets, p or h)
        if h:
            ex, ey = hand(piv, spets, v)
            f = (h[0] - ex, h[1] - ey)
        leder[d] = (piv, spets, v, f)

    def arm(d, alpha=1.0, v=None):
        piv, spets, vv, f = leder[d]
        if v is not None:
            vv, f = v, (0, 0)
        im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
        im = im.rotate(vv, resample=Image.BICUBIC, center=piv, translate=f)
        if alpha < 1:
            im.putalpha(im.getchannel("A").point(lambda a: int(a * alpha)))
        c.alpha_composite(im)
        if d[-1] in glass and alpha == 1:
            hx, hy = hand(piv, spets, vv, f)
            lägg(c, GLASS, hx, hy + GH * 0.3, GH)

    kropp = Image.open(mapp / rig["kropp"]).convert("RGBA")
    if lager != "armar":
        for d, v in spöke:
            arm(d, 0.35, v)
        if vick:
            for box, fäste in ÖRON:
                bit = Image.new("RGBA", (1024, 1024))
                bit.paste(kropp.crop(box), box[:2])
                for v in (18, -18):
                    g = bit.rotate(v, resample=Image.BICUBIC, center=fäste)
                    g.putalpha(g.getchannel("A").point(lambda a: int(a * 0.4)))
                    c.alpha_composite(g)
        if ben:
            for d in ("leg-l", "leg-r"):
                c.alpha_composite(Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA"))
        if lager == "allt":
            arm("arm-l")
        c.alpha_composite(kropp)
        ansikte(c, namn, mood, blick)
        if lager == "kropp":
            return c
    if lager == "armar":
        arm("arm-l")
    arm("arm-r")
    return c


def ansikte(c, namn, mood, blick):
    d = ImageDraw.Draw(c)
    for i, (x, y) in enumerate(DJUROGON):
        r = 26
        if mood in ("happy", "mums"):
            d.arc((x - r, y - r * 0.4, x + r, y + r), 200, 340, fill=INK, width=8)
            continue
        d.ellipse((x - r, y - r, x + r, y + r), fill="white", outline=INK, width=6)
        bx, by = blick
        if mood == "skel":  # pupillerna in mot nosen
            bx, by = (9 if i == 0 else -9), 9
        d.ellipse((x + bx - 10, y + by - 10, x + bx + 10, y + by + 10), fill=INK)
        if mood == "sad":
            d.line((x - r, y - r * 1.5, x + r, y - r * 1.2), fill=INK, width=5)
    mx, my = ANSIKTE[namn]["mun"]
    m = 18 * 1.2
    if mood in ("big", "skel"):
        d.ellipse((mx - m * 0.7, my - m * 0.5, mx + m * 0.7, my + m), fill=(90, 36, 24))
    elif mood == "sad":
        d.arc((mx - m, my, mx + m, my + m * 1.4), 200, 340, fill=INK, width=7)
    else:
        d.arc((mx - m, my - m, mx + m, my + m * 0.8), 20, 160, fill=INK, width=7)
        if mood == "mums":
            d.ellipse((mx - 9, my + 4, mx + 13, my + 26), fill=(232, 90, 120))


def place(canvas, im, cx, ground, h, rot=0, flip=False):
    """Klistrar in med underkanten på `ground`. Returnerar (skala, x0, y0) för bildens egna koordinater."""
    box = im.getbbox()
    s = h / (box[3] - box[1])
    big = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    if flip:
        big = big.transpose(Image.FLIP_LEFT_RIGHT)
    if rot:
        big = big.rotate(rot, resample=Image.BICUBIC, center=(big.width / 2, box[3] * s))
    x0 = round(cx - (box[0] + box[2]) / 2 * s)
    y0 = round(ground - box[3] * s)
    canvas.paste(big, (x0, y0), big)
    return s, x0, y0


# --- Saker ----------------------------------------------------------------
BIL = A / "rekvisita" / "rosa-bilen"
_brig = json.loads((BIL / "rosa-bilen-rigg.json").read_text()) if (BIL / "rosa-bilen-rigg.json").exists() else {"delar": {
    "bakhjul": {"vridpunkt": [312, 844]}, "framhjul": {"vridpunkt": [687, 845]}}}
KAROSS = bild("rekvisita/rosa-bilen/cut/rosa-bilen-kaross.png", ph_kaross)
KANT = bild("rekvisita/rosa-bilen/cut/rosa-bilen-kant.png", lambda: ph_kaross(säte=False))
HJUL = [bild(f"rekvisita/rosa-bilen/cut/rosa-bilen-{n}.png", lambda n=n: ph_hjul(_brig["delar"][n]["vridpunkt"][0]))
        for n in ("bakhjul", "framhjul")]
GLASS = bild("rekvisita/jordgubbsglass.png", ph_glass)
BUSKE = bild("bakgrunder/vagen-saker/buske-rosa.png", ph_buske)
BALLONG = bild("bakgrunder/vagen-saker/ballong-rosa.png", ph_ballong)
FIA = Image.open(A / "karaktarer" / "fjarilen-fia" / "cut" / "fia.png").convert("RGBA")

TOPP = 300  # luft ovanför bilen så att musens huvud får plats
MUS_K, MUS_X, MUS_Y = 0.6, 460, 555  # musens skala och var hennes fötter hamnar i bilens koordinater (axlarna över kanten)
RATT = (600, 400)  # rattens nav i bilens koordinater (ratten sitter i kant-lagret)


def i_mus(x, y):
    """Bilens koordinater → musens 1024-koordinater."""
    return 512 + (x - MUS_X) / MUS_K, 926 + (y - TOPP - MUS_Y) / MUS_K


KÖR = i_mus(RATT[0], RATT[1] + TOPP)  # höger hand på ratten


def bilen(mus=True, rot=0, vit=False, **kw):
    """Bilen i lager: kaross (med säte) → musen → kanten med ratten → musens armar → hjulen.
    Höger hand ligger på ratten om inget annat sägs. vit: tjockare vit kant runt allt (mot kioskens rosa vägg)."""
    c = Image.new("RGBA", (1024, 1024 + TOPP))
    c.alpha_composite(KAROSS, (0, TOPP))
    lag = []
    if mus:
        if not ({"arm_r", "peka_r", "hand_r"} & kw.keys()):
            kw["hand_r"] = KÖR
        for lager in ("kropp", "armar"):
            m = figur("musen-mille", lager=lager, ben=False, **kw)
            m = m.resize((round(1024 * MUS_K), round(1024 * MUS_K)), Image.LANCZOS)
            stor = Image.new("RGBA", c.size)
            stor.alpha_composite(m, (round(MUS_X - 512 * MUS_K), round(TOPP + MUS_Y - 926 * MUS_K)))
            if rot:
                stor = stor.rotate(rot, resample=Image.BICUBIC, center=(MUS_X, TOPP + MUS_Y - 60))
            lag.append(stor)
        c.alpha_composite(lag[0])
    c.alpha_composite(KANT, (0, TOPP))
    for l in lag[1:]:
        c.alpha_composite(l)
    for h in HJUL:
        c.alpha_composite(h, (0, TOPP))
    if vit:
        under = Image.new("RGBA", c.size, (255, 255, 255, 0))
        under.putalpha(c.getchannel("A").filter(ImageFilter.MaxFilter(15)))
        under.alpha_composite(c)
        c = under
    return c


def mus_huvud(bil_pos, px=509, py=440):
    """Var en punkt på musen (hennes 1024-koordinater, nosen som standard) hamnar på bilden."""
    s, x0, y0 = bil_pos
    return x0 + (MUS_X + (px - 512) * MUS_K) * s, y0 + (TOPP + MUS_Y + (py - 926) * MUS_K) * s


# --- Ritat i kod ----------------------------------------------------------
def arrow(canvas, pts, col=INK):
    """Streckad rörelsepil, som i 004."""
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


def streck(canvas, x, y, r=40, n=5, start=-150, slut=-30, col=INK, w=5):
    """Små rörelse- och ljudstreck i en solfjäder (klapp, tut, pop, pling)."""
    d = ImageDraw.Draw(canvas)
    for i in range(n):
        a = math.radians(start + (slut - start) * i / max(1, n - 1))
        d.line((x + r * math.cos(a), y + r * math.sin(a), x + r * 1.7 * math.cos(a), y + r * 1.7 * math.sin(a)), fill=col, width=w)


def vift(canvas, x, y, r=34, col=INK):
    """Två bågar bredvid en hand som vinkar."""
    d = ImageDraw.Draw(canvas)
    for k in (1, 1.5):
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 300, 360, fill=col, width=5)
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 180, 240, fill=col, width=5)


def doft(canvas, p, q, col=(236, 96, 160)):
    """Doften från blommorna till nosen: en slingrande prickig linje."""
    d = ImageDraw.Draw(canvas)
    n = 40
    for i in range(n):
        t = i / n
        x = p[0] + (q[0] - p[0]) * t
        y = p[1] + (q[1] - p[1]) * t + 22 * math.sin(t * math.pi * 4)
        if i % 2 == 0:
            d.ellipse((x - 6, y - 6, x + 6, y + 6), fill=col)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size):
    f = font(size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=f) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=f, fill=REGNBÅGE[i % len(REGNBÅGE)],
               anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
        x += d.textlength(ch, font=f)


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def paper():
    return Image.new("RGB", (W, H), PAPER)


def krita(c, x, y):
    """Kritan utan ansikte, spetsen i (x, y)."""
    ImageDraw.Draw(c).polygon([(x, y), (x + 100, y - 100), (x + 130, y - 70), (x + 30, y + 30)], fill=(242, 140, 124))


# --- Platserna ------------------------------------------------------------
# A · Vägen: väggen slutar vid y ≈ 580, vägen med mittlinjen under. Bilen står i mitten, vägen glider.
GV, BIL_H, BIL_X = 735, 400, W / 2 - 80


def drive(stuff=None, fart=True, **kw):
    c = plate("vagen")
    if stuff:
        stuff(c)
    if fart:
        for y in (560, 620, 680):
            ImageDraw.Draw(c).line((150, y, 240, y), fill=(255, 255, 255), width=7)
    b = place(c, bilen(**kw), BIL_X, GV, BIL_H, rot=-1)
    return c, b


def närbild(c, b, w=620, dx=0, dy=40):
    x, y = mus_huvud(b)
    return crop_zoom(c, x + dx, y + dy, w)


def buske(c, x=960):
    place(c, BUSKE, x, 615, 300)


def ballong(c, x=1000, y=300):
    place(c, BALLONG, x, y, 250, rot=6)


# B · Glasskiosken, spegelvänd så att kiosken står till höger och bilen fortsätter åt höger som på vägen,
# och lite inzoomad (1,38×) så att musen i bilen och Pip i fönstret kan räcka varandra glassen.
Z, ZX, ZY = 1.376, 376, 210  # zoomen: x' = (x − ZX)·Z, y' = (y − ZY)·Z


def zoom_box(x0, y0, x1, y1):
    return tuple(round(v) for v in ((x0 - ZX) * Z, (y0 - ZY) * Z, (x1 - ZX) * Z, (y1 - ZY) * Z))


_k = ImageOps.mirror(plate("glasskiosken"))
KIOSK = _k.crop((ZX, ZY, round(ZX + W / Z), round(ZY + H / Z))).resize((W, H), Image.LANCZOS)
DISK = zoom_box(950, 530, 1292, 676)  # disken, läggs tillbaka framför Pip
GK = 735  # bilens hjul framför kiosken
PIP_X, PIP_Y, PIP_H = 905, 505, 235


def kiosk(pip="open", lift=0, **pip_kw):
    c = KIOSK.copy()
    if pip:
        lägg_rgb(c, figur("kycklingen-pip", pip, **pip_kw), PIP_X, PIP_Y - lift, PIP_H)
        c.paste(KIOSK.crop(DISK), DISK[:2])  # disken framför Pips fötter
    return c


def lägg_rgb(c, im, x, ground, h, rot=0):
    return place(c, im, x, ground, h, rot=rot)


def på_kiosk(c, x=520, **kw):
    return place(c, bilen(vit=True, **kw), x, GK, 440)


def pip_närbild(c, dy=0):
    return crop_zoom(c, PIP_X, 330 + dy, 560)


def ikoner(c, n, pop=()):
    """Sammanfattningen: de första n småbilderna på väggen; de i `pop` har just poppat fram."""
    nos = Image.open(A / "karaktarer" / "musen-mille" / "cut" / "musen-mille-faceless.png").convert("RGBA").crop((160, 105, 870, 560))
    saker = [(BUSKE, 110), (BALLONG, 140), (nos, 95), (GLASS, 130), (bilen(mus=False), 95)]
    for i, (im, h) in enumerate(saker[:n]):
        x = 110 + i * 150
        ImageDraw.Draw(c).ellipse((x - 66, 120 - 66, x + 66, 120 + 66), fill=(255, 255, 255))
        place(c, im, x, 120 + h / 2, h)
        if i in pop:
            streck(c, x, 120, r=74, n=7, start=-170, slut=-10, col=(255, 255, 255))


# Peka-riktningar i musens koordinater (bara riktningen räknas)
HÖGER, UPP_HÖGER, UPP = (3000, 450), (3000, -2200), (850, -3000)
MUN = (585, 600)  # handen här: glassen når munnen


# --- Bilderna ---------------------------------------------------------------
frames = {}

# 01 Intro: titelkortet på rosa vägg med logotypen och en liten rosa bil (titeln är formatets text, inte i bilden här)
c = Image.new("RGB", (W, H), ROSA)
color_text(c, H * 0.38, "lilla kritan", 120)
place(c, bilen(mus=False, vit=True), W / 2, 660, 170)
frames["01"] = c


# 02–02c Kritan ritar bilen: först formen, i pausen hjul, hjul, ratt, sedan svaret
def ritad_bil(c, hjul=0, ratt=False, lyft=0):
    d = ImageDraw.Draw(c)
    x0, y0 = 430, 300 - lyft
    d.rounded_rectangle((x0, y0 + 60, x0 + 520, y0 + 230), 80, fill=BIL_ROSA)
    d.ellipse((x0 + 150, y0 + 10, x0 + 330, y0 + 120), fill=PAPER)  # öppningen där föraren sitter
    for i in range(140):  # kritkorn
        x, y = random.uniform(x0 + 20, x0 + 500), random.uniform(y0 + 130, y0 + 220)
        d.line((x, y, x + 24, y - 6), fill=(236, 150, 186), width=3)
    for i, hx in enumerate((x0 + 120, x0 + 400)[:hjul]):
        d.ellipse((hx - 55, y0 + 185, hx + 55, y0 + 295), fill=INK)
        d.ellipse((hx - 18, y0 + 222, hx + 18, y0 + 258), fill=(250, 210, 60))
    if ratt:
        d.line((x0 + 360, y0 + 90, x0 + 390, y0 + 40), fill=INK, width=8)
        d.ellipse((x0 + 365, y0 + 5, x0 + 420, y0 + 60), outline=INK, width=8)


c = paper()
ritad_bil(c)
krita(c, 950, 470)
frames["02"] = c
c = paper()
ritad_bil(c)
krita(c, 980, 380)
arrow(c, [(1180, 420), (1180, 320)])
frames["02a"] = c
c = paper()
ritad_bil(c, hjul=2)
krita(c, 830, 340)
frames["02b"] = c
c = paper()
ritad_bil(c, hjul=2, ratt=True, lyft=30)
krita(c, 1080, 200)
arrow(c, [(380, 520), (380, 420), (380, 520)])
frames["02c"] = c

# 03 Zoom in: den ritade bilen blir musens bil på vägen
c, b = drive(fart=False)
for r in (240, 310):
    ImageDraw.Draw(c).ellipse((BIL_X - r * 1.3, GV - 200 - r, BIL_X + r * 1.3, GV - 200 + r), outline=(255, 255, 255), width=5)
frames["03"] = c

# 03a Musen vinkar till tittaren
c, b = drive(mood="happy", arm_r=150, spöke=[("arm-r", 95)])
vift(c, *mus_huvud(b, 960, 300))
frames["03a"] = närbild(c, b)
# 03b … och lägger handen på ratten
c, b = drive(mood="happy", blick=(8, 0))
frames["03b"] = närbild(c, b)

# 04 Vers 1: vägen glider, en fjäril fladdrar förbi högt uppe
c, b = drive(lambda c: (place(c, FIA, 1050, 250, 100, rot=8), arrow(c, [(1180, 200), (950, 270)])))
frames["04"] = c

# Refrängen: ett klipp per sjungen rad, likadant båda gångerna
c, b = drive(mood="happy", hand_r=(560, 600), hand_l=(465, 600))  # klappar på ekot
streck(c, *mus_huvud(b, 600, 600), r=30, n=3, start=-30, slut=30)
streck(c, *mus_huvud(b, 425, 600), r=30, n=3, start=150, slut=210)
KLAPP = närbild(c, b)
HEL_RATT, _ = drive(mood="happy")  # håller ratten och ler, vägen glider
c, b = drive(mood="big", hand_r=i_mus(RATT[0], RATT[1] + TOPP + 5))  # handen på tutan mitt i ratten
streck(c, *mus_huvud(b, *i_mus(RATT[0] + 50, RATT[1] + TOPP)), r=26, start=-80, slut=20)
TUT = närbild(c, b)
c, b = drive(mood="open", rot=-8, hand_r=(640, 335), blick=(10, -2))  # lutar sig ut, handen över ögonen
arrow(c, [(1000, 300), (1220, 300)])
SPANA = c
REFRÄNG_BILD = [KLAPP, KLAPP, HEL_RATT, KLAPP, KLAPP, HEL_RATT, TUT, SPANA]
for n in ("05", "09"):
    for bokstav, im in zip("abcdefgh", REFRÄNG_BILD):
        frames[n + bokstav] = im

# 06 Blommorna: busken glider in från höger
c, b = drive(lambda c: (buske(c, 1250), arrow(c, [(1240, 300), (1040, 300)])), blick=(10, 0))
frames["06"] = c
# 06a … vägen stannar mitt för den, musen pekar
c, b = drive(buske, fart=False, mood="big", peka_r=HÖGER, blick=(10, 4))
frames["06a"] = c
# 06b sniff, sniff, mmm: lutar sig mot blommorna med nosen uppåt och blundar, doften slingrar till nosen
c, b = drive(buske, fart=False, mood="happy", rot=-9, arm_r=10)
x, y = mus_huvud(b)
doft(c, (930, 470), (x + 40, y))
frames["06b"] = crop_zoom(c, x + 160, y + 60, 780)

# 07 Ballongen: vägen glider igen, busken åker ut till vänster, ballongen svävar in högt uppe
c, b = drive(lambda c: (buske(c, 120), arrow(c, [(260, 330), (60, 330)]), ballong(c, 1230, 280),
                        arrow(c, [(1330, 420), (1270, 380), (1330, 330)])))
frames["07"] = c
# 07a … vägen stannar, musen pekar på ballongen
c, b = drive(ballong, fart=False, mood="big", peka_r=UPP_HÖGER, blick=(9, -9))
frames["07a"] = c
# 07b upp, upp, upp: huvudet bakåt, pekar rakt upp
c, b = drive(ballong, fart=False, mood="open", rot=7, peka_r=UPP, blick=(4, -12), spöke=[("arm-r", 60)])
x, y = mus_huvud(b, 900, 250)
arrow(c, [(x + 40, y + 60), (x + 40, y - 110)])
frames["07b"] = närbild(c, b, 720, dx=120, dy=-20)

# 08 Frågan: frågande min mot tittaren, ena handen på ratten
c, b = drive(fart=False, mood="big", arm_l=-40)
frames["08"] = närbild(c, b)
# 08a Pausen: skelögd mot sin egen nos
c, b = drive(fart=False, mood="skel")
frames["08a"] = närbild(c, b)
# 08b Nosen är rosa: fingret på nosen
c, b = drive(fart=False, mood="happy", hand_r=(540, 455))
frames["08b"] = närbild(c, b)
# 08c Vick, vick, vick: öronen vickar
c, b = drive(fart=False, mood="happy", vick=True)
for px in (250, 770):
    streck(c, *mus_huvud(b, px, 120), r=22, n=3, start=-130 if px < 512 else -80, slut=-100 if px < 512 else -50)
frames["08c"] = närbild(c, b)

# 10 Kritsvep i kioskens rosa
c = HEL_RATT.copy()
d = ImageDraw.Draw(c)
for i in range(70):
    y = i * 12 - 20
    x1 = 780 + random.uniform(-50, 50)
    d.line((-20, y + 30, x1, y - 30), fill=ROSA, width=40)
    d.ellipse((x1 - 20, y - 50, x1 + 20, y - 10), fill=ROSA)
arrow(c, [(860, 380), (1060, 380)], (255, 255, 255))
frames["10"] = c

# 11 Bilen kör in från vänster mot kiosken
c = kiosk()
på_kiosk(c, 300, blick=(10, 0))
arrow(c, [(40, 300), (230, 300)])
frames["11"] = c
# 11a Titta där – glassen är rosa: bilen har stannat, musen pekar på glasstruten ovanför kiosken
c = kiosk(blick=(-8, -4))
på_kiosk(c, mood="big", peka_r=UPP_HÖGER, blick=(9, -9))
frames["11a"] = c
# 11b mums, mums, mums: närbild, musen slickar sig om munnen
c = kiosk()
b = på_kiosk(c, mood="mums", blick=(8, -6))
streck(c, *mus_huvud(b, 600, 490), r=18, n=3, start=-30, slut=30)
frames["11b"] = närbild(c, b, 600)
# 11c Beställer: musen lutar sig mot fönstret och vinkar
c = kiosk("happy", blick=(-8, 0))
på_kiosk(c, mood="happy", rot=-10, arm_r=140, spöke=[("arm-r", 100)])
frames["11c"] = c
# 11d Varsågod: Pip räcker fram två rosa glassar, musen sträcker sig efter dem
c = kiosk("happy", peka_l=(-3000, 300), arm_r=40, glass="rl", lift=0)
streck(c, 760, 330, r=30, n=5, start=-170, slut=-90, col=(255, 255, 255))
på_kiosk(c, mood="big", rot=-12, peka_r=HÖGER)
frames["11d"] = c
# 11e Tack: musen håller en glass i varje hand
c = kiosk("happy")
på_kiosk(c, mood="happy", arm_r=115, arm_l=-115, glass="rl")
frames["11e"] = c

# 12 Närbild Pip: tittar på musens två glassar
c = kiosk("open", blick=(-12, 4))
frames["12"] = pip_närbild(c)
# 12a … och ner på sig själv, lite ledsen
c = kiosk("sad", blick=(0, 12))
frames["12a"] = pip_närbild(c)

# 13 Närbild musen vid kiosken: räcker fram den ena glassen
c = kiosk("open")
b = på_kiosk(c, mood="happy", rot=-6, peka_r=HÖGER, arm_l=-115, glass="rl")
frames["13"] = närbild(c, b, 640, dx=60)
# 13a Pip tar glassen
c = kiosk("big", peka_l=(-3000, 600), glass="l")
på_kiosk(c, mood="happy", rot=-12, peka_r=HÖGER, arm_l=-115, glass="l")
frames["13a"] = c
# 13b Närbild Pip glad med glassen, hoppar
c = kiosk("happy", lift=45, arm_l=-120, glass="l")
arrow(c, [(PIP_X + 150, 420), (PIP_X + 150, 320)])
frames["13b"] = pip_närbild(c, -30)

# 14a–d Vers 2, en bild per rad
c = kiosk("happy", arm_l=-120, glass="l")  # En glass till dig och en till mig
på_kiosk(c, mood="happy", arm_l=-115, glass="l")
frames["14a"] = c
c = kiosk("mums", hand_l=(470, 580), glass="l")  # rosa glass – mums, mums, mums
på_kiosk(c, mood="mums", hand_r=MUN, glass="r")
frames["14b"] = c
c = kiosk("happy", arm_l=-150, glass="l", blick=(0, -6))  # Nu är Pip också rosa
frames["14c"] = pip_närbild(c, -20)
c = kiosk("happy", lift=45, arm_l=-150, arm_r=150, glass="l")  # pip, pip, pip – hurra, hurra
arrow(c, [(PIP_X + 150, 420), (PIP_X + 150, 320)])
på_kiosk(c, mood="happy", hand_r=MUN, glass="r", blick=(8, -4))
frames["14d"] = c


# 15a–e Sista refrängen, en bild per rad: småbilderna poppar upp på väggen, sedan en närbild på var och en
def sist(n, pop):
    c = kiosk("happy", arm_l=-120, glass="l")
    på_kiosk(c, mood="happy", arm_l=-115, glass="l")
    ikoner(c, n, pop)
    return c


frames["15a"] = sist(1, [0])  # Blommor – rosa!
frames["15b"] = sist(2, [1])  # Ballong – rosa!
frames["15c"] = sist(5, [2, 3, 4])  # Nos och glass och bil – rosa!
c = kiosk("happy", arm_l=-120, glass="l")
ikoner(c, 5)
b = på_kiosk(c, mood="happy", arm_l=-115, glass="l")
frames["15d"] = närbild(c, b, 640, dx=40)  # Rosa är min favoritfärg
c = kiosk("happy", arm_l=-150, glass="l")
ikoner(c, 5)
frames["15e"] = pip_närbild(c, -20)  # rosa som ett glassberg

# 16 Hej då: bilen kör iväg åt höger, musen vinkar och tutar, Pip vinkar
c = kiosk("happy", arm_l=-140, spöke=[("arm-l", -100)], glass="")
ikoner(c, 5)
b = på_kiosk(c, 760, mood="happy", arm_l=-150, spöke=[("arm-l", -110)])
streck(c, *mus_huvud(b, *i_mus(RATT[0] + 50, RATT[1] + TOPP)), r=22, start=-80, slut=20)
arrow(c, [(1000, 640), (1250, 640)])
frames["16"] = c

# 17 Zoom ut till papperet
c = paper()
liten = frames["16"].resize((W // 2, H // 2), Image.LANCZOS)
c.paste(liten, (W // 4, H // 4))
for sx, sy in ((-1, -1), (1, -1), (-1, 1), (1, 1)):
    arrow(c, [(W / 2 + sx * 620, H / 2 + sy * 340), (W / 2 + sx * 400, H / 2 + sy * 220)])
frames["17"] = c

# 18 Outro: logotypen, musen och Pip tittar fram och vinkar
c = paper()
color_text(c, H * 0.42, "lilla kritan", 110)
place(c, figur("musen-mille", "happy", arm_r=140), 470, 900, 330)
place(c, figur("kycklingen-pip", "happy", arm_l=-140), 900, 900, 330)
frames["18"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for f in out.glob("*.jpg"):
    f.unlink()
for k, im in frames.items():
    im.convert("RGB").resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------
REFRÄNG_TEXT = [
    ("Fast klippmönster, likadant båda gångerna. Rad 1 ”Rosa! (Rosa!)”: närbild musen, hon studsar på ”Rosa!” och klappar två gånger på ekot.", "3 närbild musen"),
    ("Rad 2 ”Rosa! (Rosa!)”: samma närbild. Upprepningen är poängen.", "3 närbild musen"),
    ("Rad 3 ”Rosa är min favoritfärg!”: helbild, musen håller ratten och ler, hjulen snurrar och vägen glider.", "2 körscen"),
    ("Rad 4: samma närbild som rad 1.", "3 närbild musen"),
    ("Rad 5: samma närbild som rad 1.", "3 närbild musen"),
    ("Rad 6 ”Rosa som ett glassberg!”: samma helbild som rad 3.", "2 körscen"),
    ("Rad 7 ”Brum, brum, tut, tut”: närbild musen, handen på tutan mitt i ratten, en tut per ”tut”.", "3 närbild musen"),
    ("Rad 8 ”vad är rosa? Titta ut!”: helbild, musen lutar sig ut över kanten och spanar framåt med handen över ögonen.", "2 körscen"),
]
REFRÄNG_TID = {"05": ["0:50", "0:52", "0:55", "0:57", "0:59", "1:01", "1:04", "1:06", "1:08"],
               "09": ["1:42", "1:44", "1:47", "1:49", "1:51", "1:53", "1:56", "1:58", "2:00"]}


def refräng(n):
    t = REFRÄNG_TID[n]
    return [(n + "abcdefgh"[i], f"{t[i]}–{t[i + 1]}", "Refräng", "", vad, kamera) for i, (vad, kamera) in enumerate(REFRÄNG_TEXT)]


B = "B · Glasskiosken"
# (id, tid, scen, repliker och ljud, vad som händer, kamera)
SHOTS = [
    ("01", "0:00–0:11", "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som 003 och 004 med nytt nummer och ny titel: Avsnitt 5 · Rosa bilen. Rosa vägg och en liten rosa bil på kortet.", "fast"),
    ("02", "0:11–0:16", "Kritan ritar", "(skrrrrt)", "Kritan ritar en rosa rundad form, långsamt. Bara formen, inga hjul.", "1 papper"),
    ("02a", "0:16–0:19", "Kritan ritar", "", "Frågan kommer innan teckningen är klar: kritan stannar och lyfter lite.", "1 papper"),
    ("02b", "0:19–0:24", "Kritan ritar", "(skrrt … skrrt … skrrt)", "Gissningspausen, 4–5 s: ett svart hjul, ett hjul till och en liten ratt, ett i taget som ledtrådar.", "1 papper"),
    ("02c", "0:24–0:30", "Kritan ritar", "", "”En bil!”: bilen studsar en gång och kritan lyfter.", "1 papper"),
    ("03", "0:30–0:32", "A · Vägen", "(swoosh)", "Zoom in i den ritade bilen: den blir musens bil på vägen. Musen sitter redan vid ratten.", "zoom in"),
    ("03a", "0:32–0:34", "A · Vägen", "MUSEN: Pip pip!", "Musen vinkar till tittaren. Grooven startar, instrumentalt. Inget talat ”Brum-brum, nu kör vi!”: det sjöngs nyss.", "3 närbild musen"),
    ("03b", "0:34–0:36", "A · Vägen", "", "Hon lägger handen på ratten och tittar framåt.", "3 närbild musen"),
    ("04", "0:36–0:50", "A · Vägen", "", "Vers 1. Vägen glider, hjulen snurrar och bilen gungar i takt. En fjäril fladdrar förbi högt uppe, den enda rörelsen i bakgrunden.", "2 körscen"),
    *refräng("05"),
    ("06", "1:08–1:10", "A · Vägen", "", "”Vad är rosa?”: busken med rosa blommor glider in från höger. Musen tittar dit.", "2 körscen"),
    ("06a", "1:10–1:15", "A · Vägen", "", "”Titta där!”: vägen stannar mitt för busken och musen pekar på blommorna.", "2 körscen"),
    ("06b", "1:15–1:17", "A · Vägen", "", "”sniff, sniff, mmm”: närbild, musen lutar sig mot blommorna med nosen uppåt och sniffar, doften slingrar fram till nosen. På ”mmm” blundar hon och ler.", "3 närbild musen"),
    ("07", "1:17–1:19", "A · Vägen", "", "”Vad är rosa?”: vägen glider igen, busken åker ut till vänster och en rosa ballong svävar in högt uppe i mjuka vågor.", "2 körscen"),
    ("07a", "1:19–1:24", "A · Vägen", "", "”Titta där!”: vägen stannar och musen pekar upp på ballongen.", "2 körscen"),
    ("07b", "1:24–1:26", "A · Vägen", "", "”upp, upp, upp”: närbild, musen lutar huvudet bakåt, tittar upp och pekar rakt upp, en gång per ”upp”.", "3 närbild musen"),
    ("08", "1:26–1:30", "A · Vägen", "", "Frågan till tittaren. Musen tittar ut mot tittaren med frågande min.", "3 närbild musen"),
    ("08a", "1:30–1:35", "A · Vägen", "", "Pausen, 4–5 s. Ledtråd: musen blir lite skelögd och tittar på sin egen nos. Inget annat rör sig.", "3 närbild musen"),
    ("08b", "1:35–1:38", "A · Vägen", "", "”Nosen är rosa – och öronen med!”: musen sätter fingret på nosen och ler.", "3 närbild musen"),
    ("08c", "1:38–1:40", "A · Vägen", "", "”Vick, vick, vick!”: hon vickar på öronen, en gång per ”vick”, så att det rosa inuti syns.", "3 närbild musen"),
    *refräng("09"),
    ("10", "2:00–2:01", "Kritsvep", "(skrrrrt)", "Kritsvep i kioskens rosa (#F06EAA), från vänster till höger.", "kritsvep"),
    ("11", "2:01–2:04", B, "", "”Vad är rosa?”: Pip står i kioskfönstret. Bilen kör in från vänster.", "4 helbild"),
    ("11a", "2:04–2:07", B, "", "”Titta där! Glassen är rosa”: bilen stannar framför kiosken och musen pekar på den stora glasstruten ovanför.", "4 helbild"),
    ("11b", "2:07–2:09", B, "", "”mums, mums, mums”: närbild, musen slickar sig om munnen.", "3 närbild musen"),
    ("11c", "2:09–2:12", B, "MUSEN: Pip pip! Hej, Pip! Två rosa glassar, tack!", "Luckan i sången. Musen lutar sig mot fönstret, vinkar och beställer.", "4 helbild"),
    ("11d", "2:12–2:14", B, "PIP: Pip! Varsågod! (pling)", "Pip räcker fram två rosa glassar över disken och musen sträcker sig efter dem.", "4 helbild"),
    ("11e", "2:14–2:16", B, "MUSEN: Tack!", "Musen håller en glass i varje hand och ler.", "4 helbild"),
    ("12", "2:16–2:18", B, "", "Närbild Pip: hon tittar på musens två rosa glassar.", "5 närbild Pip"),
    ("12a", "2:18–2:20", B, "PIP: Oj … jag är inte rosa.", "Pip tittar ner på sig själv, lite ledsen (inte gråtande). Det är problemet.", "5 närbild Pip"),
    ("13", "2:20–2:22", B, "MUSEN: Den här är till dig, Pip!", "Närbild musen: hon räcker fram den ena glassen mot fönstret.", "3 närbild musen"),
    ("13a", "2:22–2:24", B, "", "Pip tar glassen. Musen har kvar sin egen.", "4 helbild"),
    ("13b", "2:24–2:26", B, "PIP: Tack! (boing)", "Närbild Pip, glad med den rosa glassen, hoppar. Inget talat ”nu är jag rosa”: det sjungs i vers 2.", "5 närbild Pip"),
    ("14a", "2:26–2:29", B, "", "Vers 2, en bild per rad. ”En glass till dig och en till mig”: musen och Pip håller upp var sin glass.", "4 helbild"),
    ("14b", "2:29–2:32", B, "", "”rosa glass – mums, mums, mums”: båda slickar på glassen, en slick per ”mums”.", "4 helbild"),
    ("14c", "2:32–2:35", B, "", "”Nu är Pip också rosa”: närbild Pip, stolt, håller glassen högt.", "5 närbild Pip"),
    ("14d", "2:35–2:38", B, "", "”pip, pip, pip – hurra, hurra”: Pip hoppar med glassen och vinkar, musen slickar och ler.", "4 helbild"),
    ("15a", "2:38–2:40", B, "(pop)", "Sista refrängen, en bild per rad. ”Blommor – rosa!”: en liten bild av busken poppar upp högt på väggen. Båda håller upp glassen på ekot.", "4 helbild"),
    ("15b", "2:40–2:42", B, "(pop)", "”Ballong – rosa!”: ballongen poppar upp bredvid. Samma bild, en sak till.", "4 helbild"),
    ("15c", "2:42–2:45", B, "(pop, pop, pop)", "”Nos och glass och bil – rosa!”: nosen, glassen och bilen poppar upp, en per ord.", "4 helbild"),
    ("15d", "2:45–2:47", B, "", "”Rosa är min favoritfärg”: närbild musen med glassen, ler mot tittaren.", "3 närbild musen"),
    ("15e", "2:47–2:49", B, "", "”rosa som ett glassberg”: närbild Pip håller glassen högt.", "5 närbild Pip"),
    ("16", "2:49–2:54", B, "", "”Hej då, hej då – tut, tut!”: bilen kör iväg åt höger, musen vinkar och tutar på ”tut, tut”, Pip vinkar från fönstret. Ingen säger hej då: det sjungs.", "4 helbild"),
    ("17", "2:54–2:56", "Avslutning", "(swoosh)", "Zoom ut: kiosken krymper till en teckning på papperet, med den rosa bilen och två rosa glassar.", "zoom ut"),
    ("18", "2:56–3:06", "Outro", "♪ Outrojingeln (ingen röst)", "Det vanliga outrot. Musen och Pip tittar fram vid kanten och vinkar.", "fast"),
]
assert sorted(s[0] for s in SHOTS) == sorted(frames), "en bild per rad i SHOTS"

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", "A · Vägen": "#A6D86B", "Refräng": "#8cc35f", "Kritsvep": "#F06EAA",
        B: "#F06EAA", "Avslutning": "#c9bfae", "Outro": "#c9bfae"}


def sek(t):
    m, s = t.split(":")
    return int(m) * 60 + int(s)


# Sångraderna läses ur sang.md, så att storyboarden följer med när texten ändras.
# sang.md har inga bildnummer, så här står vilken bild varje rad i ett avsnitt hör till (en per rad, pauser räknas).
# En rad som hör till flera bilder står på den första; de andra får "forts.". Fler rader än i listan → sista bilden.
REF = lambda n: [n + b for b in "abcdefgh"]
KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02a", "02b", "02c", "02c"],
    "Vers 1": ["04"],
    "Refräng": REF("05"),
    "Rosa sak 1 – blommorna": ["06", "06a", "06a", "06b"],
    "Rosa sak 2 – ballongen": ["07", "07a", "07a", "07b"],
    "Frågan till tittaren": ["08", "08", "08a", "08b", "08c"],
    "Refräng #2": REF("09"),
    "Rosa sak 3 – glassen (glasskiosken)": ["11", "11a", "11a", "11b", ["11c", "11d", "11e", "12", "12a", "13", "13a", "13b"]],
    "Vers 2": ["14a", "14b", "14c", "14d"],
    "Sista refrängen – sammanfattning": ["15a", "15b", "15c", "15d", "15e", "16"],
}

IDS = [s[0] for s in SHOTS]
SÅNG = {i: [] for i in IDS}


def läs_sång():
    avsnitt, namn = {}, None
    for rad in (HÄR.parent / "sang.md").read_text(encoding="utf-8").splitlines():
        rad = rad.strip()
        if rad.startswith("---"):
            break  # rörelserna efter strecket sjungs inte
        if rad.startswith("## "):
            namn = rad[3:].strip()
            if namn in avsnitt:
                namn += " #2"
            avsnitt[namn] = []
        elif namn and rad and not rad.startswith(("**", "-")) and not (rad.startswith("*") and not rad.startswith("*(")):
            avsnitt[namn].append(rad)
    for namn, rader in list(avsnitt.items()):
        if not rader and namn.endswith(" #2"):  # "## Refräng" utan text = samma refräng igen
            avsnitt[namn] = avsnitt[namn[:-3]]
    return avsnitt


for namn, rader in läs_sång().items():
    if namn not in KARTA:
        print(f"OBS: {namn!r} i sang.md har ingen bild i KARTA")
        continue
    visas = namn.removesuffix(" #2")
    for n, rad in enumerate(rader):
        mål = KARTA[namn][min(n, len(KARTA[namn]) - 1)]
        mål = mål if isinstance(mål, list) else [mål]
        typ = "paus" if rad.startswith("*(") else "sjungs"
        text = rad.strip("*()") if typ == "paus" else rad.replace("*", "")
        for k, sid in enumerate(mål):
            if ("rubrik", visas) not in SÅNG[sid]:
                SÅNG[sid].append(("rubrik", visas))
            SÅNG[sid].append((typ, text) if k == 0 else ("paus", "forts."))


def sång_html(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        t = html.escape(text)
        if typ == "rubrik":
            ut.append(f'<div class="sh">♪ {t}</div>')
        elif typ == "sjungs":
            ut.append(f'<div class="sung">{t}</div>')
        else:
            ut.append(f'<div class="pause">{t}</div>')
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
    a, b = sek(a), sek(b)
    tl.append(f'<div style="left:{a / total * 100:.2f}%;width:{(b - a) / total * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {tid}">{sid}</div>')

ph = ("<li><b>Platshållare</b> (platta former tills bilderna finns, kör om bygg.py sedan): "
      + ", ".join(f"<code>{html.escape(p)}</code>" for p in PLATSHÅLLARE) + ".</li>") if PLATSHÅLLARE else \
     "<li><b>Platshållare:</b> inga, alla saker är riktiga bilder ur <code>assets/</code>.</li>"

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rosa bilen: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#E0508F;
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
.song {{ border-left:3px solid #E0508F; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
</style></head><body><div class="wrap">
<h1>Rosa bilen <span>storyboard</span></h1>
<p class="lede">Avsnitt 005. Bilderna är byggda av de färdiga utklippen och bakgrunderna i <code>assets/</code>, med ansiktena ritade som i <code>kit.js</code>. Pilarna och strecken visar rörelsen. Alla tider är preliminära: sången låser dem.</p>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>2</b><span>figurer</span></div><div><b>1</b><span>körscen</span></div><div><b>5</b><span>kamerainställningar (max 6)</span></div><div><b>~{slut}</b><span>längd, preliminärt</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje rosa sak har en rörelse i bild i stället för en replik: sniff (06a), upp (07a), vick (08b), mums (11, 14).</li>
<li><b>En bild per handling</b>, så att historien går att läsa ur bilderna, och högst ett klipp per sjungen rad.</li>
<li><b>Refrängen</b> (05a–h och 09a–h) har ett fast klippmönster, ett klipp per sjungen rad, likadant båda gångerna: klapp-närbilden på rad 1, 2, 4 och 5, helbilden på rad 3 och 6, tutan på rad 7 och spanandet på rad 8. Klippen är ca 2,3 s (en takt i 104 bpm).</li>
<li><b>Bilen</b> är riggad i lager: kaross med säte, musen, kanten med ratten, musens armar och hjulen. Musen syns från midjan och upp, höger hand ligger på ratten när hon kör, och glassarna hålls i händerna. Halvgenomskinliga armar och öron visar rörelsen (vinka, vicka).</li>
<li><b>Glasskiosken</b> är spegelvänd och lite inzoomad i storyboarden: kiosken står till höger så att bilen fortsätter åt höger som på vägen, och musen och Pip når varandra över disken. Bilen har en tjockare vit kant mot den rosa väggen.</li>
<li><b>Vers 2 och sista refrängen</b> (14a–d, 15a–e) har en bild per rad. Småbilderna på väggen är busken, ballongen, musens huvud (nosen), glassen och bilen, i samma ordning som sången.</li>
{ph}
<li><b>Sångraderna</b> under varje bild läses ur sang.md (♪ sjungs, gul lapp = paus eller lucka). Fetstilt = repliker.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")


# Tabellen i storyboard.md skrivs om mellan markeringarna, med sångraderna ur sang.md
def sång_md(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        if typ == "rubrik":
            ut.append(f"**{text}**")
        elif typ == "sjungs":
            ut.append(f"♪ *{text}*")
        else:
            ut.append(f"⏸ {text}")
    return "<br>".join(ut).replace("|", "/")


md = HÄR.parent / "storyboard.md"
tabell = ["| # | Tid (prel.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |", "|---|---|---|---|---|---|"]
for sid, tid, sc, rad, vad, kamera in SHOTS:
    tabell.append(f"| {sid} | {tid} | {sc} · {kamera} | {vad} | {repliker(rad)} | {sång_md(sid)} |".replace("\n", " "))
text = md.read_text(encoding="utf-8")
start, slutm = "<!-- tabell: skrivs av storyboard/bygg.py -->", "<!-- /tabell -->"
if start in text:
    före, _, rest = text.partition(start)
    _, _, efter = rest.partition(slutm)
    md.write_text(före + start + "\n" + "\n".join(tabell) + "\n" + slutm + efter, encoding="utf-8")
print(f"{len(frames)} bilder, index.html klar" + (f", platshållare: {', '.join(PLATSHÅLLARE)}" if PLATSHÅLLARE else ", inga platshållare"))
