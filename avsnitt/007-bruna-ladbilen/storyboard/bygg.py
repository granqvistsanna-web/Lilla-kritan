"""Bygger storyboarden för avsnitt 007 (Bruna sången) av utklippen och bakgrunderna. Kopierad från 006:s bygg.py och bytt:
båten → lastbilen (skumpar på vägen, hjulen rullar), Dinon Disa → Björnen Bulle (grön keps i kod), sjön → vägen,
bryggan med Ankan Agda → ängen med Lammet Ludde på en filt, apelsinen → kanelbullen, Agda som simmar → Igge som rullar ihop sig.

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/*.jpg, index.html och tabellen i ../storyboard.md. Kostar inga krediter.

TIDERNA kommer ur ../rader.txt (sang.m4a, tagning 3, 3:21.7): bildernas starttider i sångtid står i SÅNGTID nedan. Bilder utan
egen tid får ≈ och räknas vidare från bilden före med sina takter (SHOTS), ca 94,6 bpm.
Allt ritat i kod får kritstruktur och ett svagt papperskorn över hela bilden; `--platt` stänger av det.
"""
import html
import json
import math
import random
import runpy
import sys
from pathlib import Path

import numpy as np

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HÄR = Path(__file__).resolve().parent
ROT = HÄR.parents[2]
A = ROT / "assets"
W, H = 1376, 768
INK = (29, 29, 29)
PAPER = (250, 248, 242)
BRUN = (160, 103, 58)        # #A0673A, Bulles päls och kritan
KAROSS = (201, 147, 90)      # #C9935A, lastbilens kaross
KONTUR_BR = (104, 62, 30)    # mörkbrun kritkontur runt lastbilen i refrängen (lastbilen(kontur=True))
GRÖN = (86, 160, 72)         # kepsen och flaggan
GRÄS = (150, 205, 100)       # backen på ängen (inget brunt i bakgrunden)
VÄGG = (166, 216, 107)       # #A6D86B, vägens ljusgröna vägg
BEIGE = (232, 203, 168)      # #E8CBA8, glöden i refrängen
FILT = (246, 226, 122)       # Luddes filt, ljusgul
random.seed(7)
PLATSHÅLLARE = []

# --- Tiderna ---------------------------------------------------------------------------------------------------
BPM = 92.3
TAKT = 4 * 60 / BPM   # 2,6 s (tagning 8, ca 92 bpm, librosa)
INTRO = 11.0          # avsnittstid = sångtid + 11 s (introt före), som 006
# Bildens start i sångtid (sekunder) ur ../rader.txt. Bara de bilder som står här är mätta; de andra räknas vidare med sina
# takter och visas med ≈. Raderna med ≈ i rader.txt är uppskattade där också.
SÅNGTID = {   # tagning 8 (sang.m4a, "Bruna sången.m4a", Suno version 10 calypso, 3:32.3), rader.txt
    # introt 0–12 s är instrumentalt: kritan ritar lastbilen i tystnad (02–02c)
    "02": 0.0, "02a": 3.0, "02b": 5.2, "02c": 7.4, "03": 9.2, "03a": 9.8, "03b": 11.0, "04": 11.6,
    "041": 12.0, "042": 16.0, "04a": 27.0, "04b": 32.0,
    "05a": 50.0, "05b": 52.1, "05c": 54.2, "05d": 57.4, "05e": 60.0, "05f": 62.0, "05g": 65.0, "05h": 69.95,   # 05h nästan borta: "Vad är brunt? Titta ut!" stannar i 05g (Sanna 2026-11-08: "scene at 1:24 is a random skip it")
    "06": 70.0, "06a": 72.0, "06b": 76.0, "08": 81.0, "08a": 84.0, "08b": 87.0, "08c": 90.0, "08d": 92.3,
    "09a": 103.5, "09b": 105.6, "09c": 107.7, "09d": 110.8, "09e": 113.6, "09f": 115.5, "09g": 118.6, "09h": 120.95,   # 09h nästan borta: raka vägen till ängen efter kolahavet (Sanna 2026-11-08: "cut to picnic direct")
    "10": 121.0, "11": 122.6, "11a": 124.6, "11b": 126.6, "11d": 129.2, "11e": 132.4,   # "Vi är framme! Titta i korgen! Bullen är brun – mums, mums!"
    # mellanspelet 2:14.5–2:36.0 (instrumentalt): oroligt (13a–13f), sedan glatt (14a–14b), och tack, bitarna och mumset bara i bild (14c–14f)
    "13a": 134.5, "13b": 137.1, "13c": 139.2, "13d": 140.7, "13e": 143.1, "13f": 144.3,
    "14a": 145.3, "14b": 147.7, "14c": 150.5, "14d": 152.3, "14e": 154.2, "14f": 155.2,
    # danspausen, tre varv direkt efter varandra, en takt per rad: stampa (trebilden), hoppa (Gurra), klappa (Mille)
    "15a": 156.0, "15c": 161.6, "15d": 164.2, "15e": 166.8, "15f": 169.4, "15g": 172.0, "15h": 174.6, "15i": 177.2, "15j": 179.8,
    "16a": 182.4, "16b": 186.6, "16c": 194.0, "16d": 197.0, "17": 200.5,
}
SÅNG_SLUT = 212.3
INSATT = {}   # sången klipps aldrig: avsnittstid = sångtid + 11 s hela vägen

# Bilderna. Rekvisitan har två varianter var som Sanna inte valt än: v1 används som platshållare (byt här).
ASSET = {
    "vägen": "bakgrunder/vagen/vagen.png",
    "ängen": "bakgrunder/angen/angen.png",
    "berget": "bakgrunder/kanelbullsberget/kanelbullsberget-v1.png",
    "lastbil": "rekvisita/lastbil-brun/cut/lastbil-brun-v5.png",   # v5: hytt med tak och öppet fönster (Sanna 2026-11-06, skiss 2)
    "kanelbulle": "rekvisita/kanelbulle/cut/kanelbulle-v1.png",
    "kotte": "rekvisita/kotte/cut/kotte-v1.png",
    "gosekanin": "rekvisita/gosekanin/cut/gosekanin-v4.png",
    "igge-boll": "karaktarer/igelkotten-igge/cut/igge-hoprullad-v1.png",
}


def bild(nyckel, ersätt):
    """Bilden ur assets/ om den finns, annars en platshållare (och den antecknas)."""
    p = A / ASSET[nyckel]
    if p.exists():
        return Image.open(p).convert("RGBA")
    PLATSHÅLLARE.append(ASSET[nyckel])
    return ersätt()


def tom(w=1024, h=1024):
    im = Image.new("RGBA", (w, h))
    return im, ImageDraw.Draw(im)


# --- Kritstruktur: det som ritas i kod fylls med äkta kritkorn och får lite ojämna kanter (som 005) ---------------
KRITA = "--platt" not in sys.argv
_g = Image.open(A / "bakgrunder" / "glasskiosken" / "glasskiosken.png").convert("L").crop((480, 0, 1376, 560)).resize((W, H))
_d = np.asarray(_g, float) - np.asarray(_g.filter(ImageFilter.GaussianBlur(12)), float)
KORN = np.clip(0.5 + _d / (4 * _d.std()), 0, 1)
_rng = np.random.default_rng(6)
BRUS = sum(np.asarray(Image.fromarray((_rng.random((H // k, W // k)) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), float)
           for k in (6, 16)) / 255 - 1


def kritfyll(c, mask, col, alpha=1.0, vick=0.25, oskarp=2.0):
    """Fyller masken med färgen som vaxkrita: ojämn kant, kritkorn, papperet skymtar i luckorna."""
    if not KRITA:
        c.paste(col[:3], mask=mask.point(lambda v: int(v * alpha)))
        return
    w, h = mask.size
    kx, ky = KORN, BRUS
    if w > W or h > H:  # större än bilden (1024-rutor med TOPP): korn och brus upprepas
        kx = np.tile(KORN, (h // H + 1, w // W + 1))[:h, :w]
        ky = np.tile(BRUS, (h // H + 1, w // W + 1))[:h, :w]
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(oskarp)), float) / 255
    m = np.clip((m - 0.5 + vick * ky[:h, :w]) * 4 + 0.5, 0, 1)
    t = kx[:h, :w]
    m *= np.clip(0.35 + 0.9 * t, 0, 1) * alpha
    färg = np.clip(np.array(col[:3], float) * (0.9 + 0.2 * t[..., None]), 0, 255).astype(np.uint8)
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
    """Klistermärkets vita kant runt en RGBA-bild."""
    under = Image.new("RGBA", im.size, (255, 255, 255, 0))
    under.putalpha(im.getchannel("A").filter(ImageFilter.MaxFilter(r)))
    under.alpha_composite(im)
    return under


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
    if canvas.mode == "RGBA":
        lag = Image.new("RGBA", canvas.size)
        lag.paste(big, (x0, y0), big)
        canvas.alpha_composite(lag)
    else:
        canvas.paste(big, (x0, y0), big)
    return s, x0, y0



def ph(col):
    """Platshållare: en rund platta i rätt färg (används bara om en bild saknas i assets/)."""
    def rita():
        im, _ = tom()
        m, d = ritmask(im)
        d.ellipse((200, 300, 824, 820), fill=255)
        kritfyll(im, m, col)
        return vit_kant(im, 13)
    return rita


_plåt = {}


def plåt(namn):
    if namn not in _plåt:
        _plåt[namn] = bild(namn, lambda: Image.new("RGB", (W, H), VÄGG if namn == "vägen" else (94, 189, 227))).convert("RGB").resize((W, H))
    return _plåt[namn]


# --- Figurer: kropp, armar ur riggen och ansiktet ur verktyg/ansikten.py --------------------------------------
MUS = runpy.run_path(str(ROT / "verktyg" / "rita-lemmar-mus.py"))  # musen Mille (statist) med de ritade lemmarna
rita_ansikte = MUS["ansikten"].rita
MUS["ansikten"].KRITA = KRITA
DJUROGON = [(413, 401), (604, 398)]   # uppmätt: samma läge i Bulles, Luddes och Igges bilder med ansikte
ANSIKTE = {
    "bjornen-bulle": dict(ogon=DJUROGON, mun=(511, 482), munskala=1.1),     # munnen under nosen på den ljusa nospartiet
    "lammet-ludde": dict(ogon=DJUROGON, mun=(511, 466), munskala=1.0),      # karaktarer/lammet-ludde.md
    "igelkotten-igge": dict(ogon=DJUROGON, mun=(512, 540), munskala=0.9),   # under den svarta nosen
    "grodan-gurra": dict(ogon=[(337, 262), (686, 260)], ogonskala=1.45, mun=(512, 392), munskala=1.4, munbredd=2.6),
}
RIGG = {"lammet-ludde": "ludde-rigg.json"}
SPETS = {"grodan-gurra": {"arm-r": (895, 655), "arm-l": (110, 660)}}
_spets = {}


def spets_av(fil, piv):
    """Handen = den bit av armbilden som ligger längst från vridpunkten."""
    if fil not in _spets:
        ys, xs = np.nonzero(np.asarray(Image.open(fil).getchannel("A")) > 128)
        i = np.argmax((xs - piv[0]) ** 2 + (ys - piv[1]) ** 2)
        _spets[fil] = (float(xs[i]), float(ys[i]))
    return _spets[fil]


def vinkel_mot(piv, spets, mål):
    return math.degrees(math.atan2(piv[1] - mål[1], mål[0] - piv[0]) - math.atan2(piv[1] - spets[1], spets[0] - piv[0]))


def hand(piv, spets, vinkel):
    a = math.radians(vinkel)
    dx, dy = spets[0] - piv[0], spets[1] - piv[1]
    return piv[0] + dx * math.cos(a) + dy * math.sin(a), piv[1] - dx * math.sin(a) + dy * math.cos(a)


def lägg(canvas, im, cx, ground, h, rot=0):
    lag = Image.new("RGBA", canvas.size)
    place(lag, im, cx, ground, h, rot=rot)
    canvas.alpha_composite(lag)


ARM_LÄNGD = {}  # Bulles och Luddes armar ur riggen, oförlängda
_armar = {}


def armbild(namn, mapp, rig, d):
    """Armen utan ledbiten som ligger innanför kroppen (som masken i kit.js), förlängd och med vit klistermärkeskant,
    så att en lyft arm syns mot kroppen i samma färg."""
    if (namn, d) not in _armar:
        im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
        piv = rig["delar"][d]["vridpunkt"]
        if not rig.get("ritadeDelar"):
            kropp = Image.open(mapp / rig["kropp"]).getchannel("A").filter(ImageFilter.MinFilter(15))
            im.putalpha(ImageChops.subtract(im.getchannel("A"), kropp))
        k = ARM_LÄNGD.get(namn, 1)
        if k != 1:
            im = im.transform(im.size, Image.AFFINE, (1 / k, 0, piv[0] * (1 - 1 / k), 0, 1 / k, piv[1] * (1 - 1 / k)), Image.BICUBIC)
        _armar[namn, d] = vit_kant(im, 9)
    return _armar[namn, d]


def arrow(canvas, pts, col=INK):
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
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def båge(cx, cy, r, a0, a1, steg=15, ry=None):
    ry = ry or r
    return [(cx + r * math.cos(math.radians(a)), cy - ry * math.sin(math.radians(a))) for a in np.arange(a0, a1 + (1 if a1 > a0 else -1), steg if a1 > a0 else -steg)]


def streck(canvas, x, y, r=40, n=5, start=-150, slut=-30, col=INK, w=5):
    m, d = ritmask(canvas)
    for i in range(n):
        a = math.radians(start + (slut - start) * i / max(1, n - 1))
        d.line((x + r * math.cos(a), y + r * math.sin(a), x + r * 1.7 * math.cos(a), y + r * 1.7 * math.sin(a)), fill=255, width=w + 1)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def vift(canvas, x, y, r=34, col=INK):
    m, d = ritmask(canvas)
    for k in (1, 1.5):
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 300, 360, fill=255, width=6)
        d.arc((x - r * k, y - r * k, x + r * k, y + r * k), 180, 240, fill=255, width=6)
    kritfyll(canvas, m, col, vick=0.2, oskarp=1.2)


def stänk(c, x, y, r=40):
    """Vattenstänk: vita droppar i en solfjäder uppåt och en ring på vattnet (plask)."""
    m, d = ritmask(c)
    for i in range(6):
        a = math.radians(-160 + i * 28)
        px, py = x + r * 1.3 * math.cos(a), y + r * 1.3 * math.sin(a)
        d.ellipse((px - 9, py - 12, px + 9, py + 12), fill=255)
    d.ellipse((x - r * 1.4, y - r * 0.3, x + r * 1.4, y + r * 0.3), outline=255, width=6)
    kritfyll(c, m, (255, 255, 255), vick=0.15, oskarp=0.8)


def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Chalkboard.ttc", size)
    except OSError:
        return ImageFont.load_default()


REGNBÅGE = [(198, 40, 40), (31, 105, 173), (106, 44, 145), (176, 24, 95), (46, 125, 50), (0, 105, 110)]


def color_text(canvas, cy, text, size, färger=REGNBÅGE):
    f = font(size)
    d = ImageDraw.Draw(canvas)
    x = W / 2 - d.textlength(text, font=f) / 2
    for i, ch in enumerate(text):
        d.text((x, cy + (8 if i % 2 else -8)), ch, font=f, fill=färger[i % len(färger)], anchor="lm", stroke_width=6, stroke_fill=(255, 255, 255))
        x += d.textlength(ch, font=f)


def crop_zoom(img, cx, cy, w):
    h = w * H / W
    cx = min(max(cx, w / 2), W - w / 2)
    cy = min(max(cy, h / 2), H - h / 2)
    return img.crop((round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))).resize((W, H), Image.LANCZOS)


def paper():
    return Image.new("RGB", (W, H), PAPER)


def skugga(c, cx, y, w, hopp, col=(70, 64, 60)):
    """Skuggan står kvar när figuren hoppar och blir mindre (kritklotter, som 005)."""
    k = 0.6 if hopp else 1
    rx, ry = w * k / 2, 16 * k
    m, d = ritmask(c)
    if not KRITA:
        d.ellipse((cx - rx, y - ry, cx + rx, y + ry), fill=255)
    for x in np.arange(cx - rx * 0.95, cx + rx * 0.95, 9) if KRITA else ():
        hh = ry * math.sqrt(max(0, 1 - ((x - cx) / rx) ** 2))
        d.line((x - 7, y + hh, x + 7, y - hh), fill=255, width=4)
    kritfyll(c, m, col, alpha=0.3, vick=0.15, oskarp=1)



def keps(c):
    """Bulles gröna keps i kod (den står i hans beskrivning men finns inte i bilden): en låg kulle mellan öronen och en
    skärm framåt, med vit klistermärkeskant. 1024-rutan."""
    m, d = ritmask(c)
    d.chord((396, 168, 628, 290), 180, 360, fill=255)
    d.chord((372, 196, 652, 264), 0, 180, fill=255)
    vit = Image.new("RGBA", c.size, (255, 255, 255, 0))
    vit.putalpha(m.filter(ImageFilter.MaxFilter(11)))
    c.alpha_composite(vit)
    kritfyll(c, m, GRÖN, vick=0.15, oskarp=1.2)
    m, d = ritmask(c)
    d.chord((372, 196, 652, 264), 0, 180, fill=255)   # skärmen framåt
    kritfyll(c, m, (58, 120, 50), vick=0.15, oskarp=1)


def figur(namn, mood="glad", blick=(0, 0), arm_r=0, arm_l=0, peka_r=None, peka_l=None, håll=None, ben=True, lager="allt", nick=0):
    """En figur ur riggen med ansiktet ritat. arm_* = vinkel (grader moturs), peka_* = punkt armen pekar mot.
    håll = {"r": (bild, höjd)}: en sak i den handen. lager: allt, kropp (utan armar) eller armar (bara armarna).
    nick: ögon och mun så många px lägre (tittar ner). ben="sitter": benen förkortade. Bulle har alltid sin keps."""
    mapp = A / "karaktarer" / namn
    rig = json.loads((mapp / RIGG.get(namn, f"{namn}-rigg.json")).read_text())
    c = Image.new("RGBA", (1024, 1024))
    leder = {}
    for d, v, p in (("arm-r", arm_r, peka_r), ("arm-l", arm_l, peka_l)):
        if d not in rig["delar"]:
            continue
        piv = tuple(rig["delar"][d]["vridpunkt"])
        spets = SPETS.get(namn, {}).get(d) or spets_av(mapp / rig["delar"][d]["fil"], piv)
        leder[d] = (piv, spets, vinkel_mot(piv, spets, p) if p else v)

    def arm(d):
        if d not in leder:
            return
        piv, spets, v = leder[d]
        c.alpha_composite(armbild(namn, mapp, rig, d).rotate(v, resample=Image.BICUBIC, center=piv))
        if håll and d[-1] in håll:
            im, h = håll[d[-1]]
            hx, hy = hand(piv, spets, v)
            lägg(c, im, hx, hy + h * 0.45, h)

    if not lager.startswith("arm"):
        if ben:
            for d in ("leg-l", "leg-r"):
                if d in rig["delar"]:
                    im = Image.open(mapp / rig["delar"][d]["fil"]).convert("RGBA")
                    if ben == "sitter":
                        y = rig["delar"][d]["vridpunkt"][1]
                        im = im.transform(im.size, Image.AFFINE, (1, 0, 0, 0, 2, -y), Image.BICUBIC)
                    c.alpha_composite(im)
        c.alpha_composite(Image.open(mapp / rig["kropp"]).convert("RGBA"))
        ans = ANSIKTE[namn]
        if nick:
            ans = dict(ans, ogon=[(x, y + nick) for x, y in ans["ogon"]], mun=(ans["mun"][0], ans["mun"][1] + nick))
        rita_ansikte(c, mood, (blick[0] / 9, blick[1] / 9), **ans)
        if namn == "bjornen-bulle":
            keps(c)
        if lager == "kropp":
            return c
    for d in ("arm-l", "arm-r"):   # lager "arm-r"/"arm-l": bara den armen
        if lager in ("allt", "armar", d):
            arm(d)
    return c


def bulle(mood="glad", **kw):
    return figur("bjornen-bulle", mood, **kw)


def ludde(mood="glad", **kw):
    return figur("lammet-ludde", mood, **kw)


def igge(mood="glad", **kw):
    return figur("igelkotten-igge", mood, **kw)


def musen(mood="glad", arm_r=None, arm_l=None):
    v = MUS["VILA"]
    return MUS["mus"](mood, arm_r if arm_r is not None else v, arm_l if arm_l is not None else v)


FIA = Image.open(A / "karaktarer/fjarilen-fia/cut/fia.png").convert("RGBA")


def sätt(c, im, x, fot, k):
    """En figurbild (1024-rutan) med fötterna (512, 833) på (x, fot), skala k."""
    im = im.resize((round(1024 * k),) * 2, Image.LANCZOS)
    c.paste(im, (round(x - 512 * k), round(fot - 833 * k)), im)


def mot(x, y, fx, fot, k):
    """En punkt på bilden i figurens 1024-koordinater (för peka_*), när figuren står med sätt(c, im, fx, fot, k)."""
    return 512 + (x - fx) / k, 833 + (y - fot) / k


# --- Saker ----------------------------------------------------------------------------------------------------
def i_rutan(im, hjul=((330, 732.5), (873, 733.5)), mål=((282, 726), (745, 728))):
    """Lastbilens bild (1200×896, hjulen uppmätta i v5) i en 1024-ruta, skalad och flyttad så att hjulen hamnar på HJUL."""
    if im.size == (1024, 1024):
        return im
    k = (mål[1][0] - mål[0][0]) / (hjul[1][0] - hjul[0][0])
    ut = Image.new("RGBA", (1024, 1024))
    ut.alpha_composite(im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS),
                      (round(mål[0][0] - hjul[0][0] * k), round(mål[0][1] - hjul[0][1] * k)))
    return ut


LASTBIL = i_rutan(bild("lastbil", ph(KAROSS)))
BULLEN = bild("kanelbulle", ph((214, 150, 80)))
KOTTE = bild("kotte", ph((130, 84, 50)))
IGGE_BOLL = bild("igge-boll", ph((140, 128, 118)))
def gosekanin():
    """Gosekaninen (v4: en sned rosa klump med litet huvud, ett öra upp och ett vikt) med ansiktet i kod som figurernas
    (verktyg/ansikten.py): två prickögon, en liten rosa nos och ett litet leende. Bilden är 255 × 520; ×4 så att ansiktet
    ritas i samma skala som Bulles. k: om bilden har en bredare kant än 255 × 520 flyttas ansiktet med den."""
    im = bild("gosekanin", ph((244, 190, 204)))
    k = 4 * (im.width - 255) / 2   # kantens bredd i ×4-skalan
    im = im.resize((im.width * 4, im.height * 4), Image.LANCZOS)
    rita_ansikte(im, "glad", ogon=[(440 + k, 750 + k), (620 + k, 750 + k)], ogonskala=1.3, mun=(530 + k, 850 + k), munskala=0.7,
                 nos=(530 + k, 805 + k))
    return im


KANIN = gosekanin()
FLAGGA = Image.open(A / "rekvisita/cut/flagga-rosa.png").convert("RGBA")


def grön_flagga():
    """005:s rosa flagga omfärgad till grön (bara duken; stången behålls)."""
    hsv = np.asarray(FLAGGA.convert("RGB").convert("HSV")).copy()
    rosa = (hsv[..., 1] > 60) & ((hsv[..., 0] > 200) | (hsv[..., 0] < 10))
    hsv[..., 0] = np.where(rosa, 78, hsv[..., 0])
    hsv[..., 2] = np.where(rosa, np.clip(hsv[..., 2] * 0.85, 0, 255), hsv[..., 2])
    im = Image.merge("HSV", [Image.fromarray(hsv[..., i]) for i in range(3)]).convert("RGBA")
    im.putalpha(FLAGGA.getchannel("A"))
    return im


FLAGGA_GR = grön_flagga().transpose(Image.FLIP_LEFT_RIGHT)   # duken pekar bakåt (åt vänster), Sanna 2026-11-05


def korg():
    """Luddes korg: samma flätade korg med handtag som Agdas i 006, full med kanelbullar: en liten hög av fem som sticker
    upp över kanten (bullen Bulle får läggs i separat, så att den kan tas ur)."""
    im, d = tom(520, 360)
    m, dm = ritmask(im)
    dm.arc((76, 14, 444, 386), 180, 360, fill=255, width=30)
    kritfyll(im, m, (196, 150, 96), vick=0.2)  # handtaget bakom bullarna (ljust trä: korgen ska inte vara ett av de bruna målen)
    bulle_ = BULLEN.crop(BULLEN.getbbox())
    for box in ((120, 70, 260, 200), (260, 60, 400, 190), (60, 110, 200, 240), (190, 100, 330, 230), (320, 110, 460, 240)):
        b = bulle_
        k = min((box[2] - box[0]) / b.width, (box[3] - box[1]) / b.height)
        b = b.resize((round(b.width * k), round(b.height * k)), Image.LANCZOS)
        im.alpha_composite(b, (box[0] + (box[2] - box[0] - b.width) // 2, box[3] - b.height))
    m, dm = ritmask(im)
    dm.polygon([(36, 200), (484, 200), (440, 330), (410, 350), (110, 350), (80, 330)], fill=255)
    kritfyll(im, m, (222, 186, 128), vick=0.25)  # korgen, halmgul
    m, dm = ritmask(im)
    for rad, y in enumerate(range(232, 345, 30)):
        dm.line((60 + (y - 200) * 0.3, y, 460 - (y - 200) * 0.3, y), fill=255, width=6)
        for x in range(90 + 18 * (rad % 2), 440, 36):
            dm.line((x, y - 24, x + (12 if rad % 2 else -12), y - 4), fill=255, width=5)
    kritfyll(im, m, (186, 146, 90), alpha=0.85, vick=0.1, oskarp=0.6)
    m, dm = ritmask(im)
    dm.rounded_rectangle((26, 186, 494, 218), 16, fill=255)
    kritfyll(im, m, (236, 206, 150), vick=0.2)  # kanten
    return vit_kant(im, 11)


KORG = korg()


def bit(i):
    """En tredjedel av kanelbullen (i = 0, 1, 2), skuren som en tårtbit ur den riktiga bilden, med vit kant."""
    b = BULLEN.crop(BULLEN.getbbox())
    cx, cy, r = b.width / 2, b.height / 2, max(b.size)
    m = Image.new("L", b.size)
    a0 = -90 + i * 120
    ImageDraw.Draw(m).pieslice((cx - r, cy - r, cx + r, cy + r), a0 + 3, a0 + 117, fill=255)
    b.putalpha(ImageChops.multiply(b.getchannel("A"), m))
    return vit_kant(b.crop(b.getbbox()), 11)


BITAR = [bit(i) for i in range(3)]


# --- Lastbilen med Bulle -----------------------------------------------------------------------------------------
TOPP = 60             # luft ovanför lastbilen för flaggan och Bulles armar
VÄNSTER = 60          # luft till vänster om 1024-rutan: flaggans duk pekar bakåt, förbi bilens bakkant
BULLE_K, BULLE_X, BULLE_Y = 0.40, 575, 535   # Bulle i hytten, huvudet och ratten i fönstret (v5: x 457–693, y 241–503): fötterna (512, 833) på (575, 535);
# huvudet, axlarna och bröstet syns ovanför sätet, armarna ligger framför karossen med tassarna på pucklarna
HJUL = [(282, 726), (745, 728)]             # hjulens mitt i lastbilens 1024-ruta (i_rutan lägger dem här), radie 98


def lastbilen(med_bulle=True, rot=0, vit=False, kontur=False, tuta=False, **kw):
    """Lastbilen i lager: flaggan bak → Bulle (utan ben) med armarna → karossen, så att han sitter nere i sätet mellan
    pucklarna och tassarna är inne i bilen. rot: Bulle lutar (grader moturs). kontur: mask för bilens mörkbruna kontur i .kontur (refrängen)."""
    c = Image.new("RGBA", (1024, 1024 + TOPP))
    ImageDraw.Draw(c).line((150, TOPP + 742, 52, TOPP + 750), fill=(125, 119, 114, 255), width=30)   # avgasröret bak, under flaket
    lag = []
    if med_bulle:
        # vila = tassen på ratten (armen syns inte); en arm som pekar uppåt eller ut släpper ratten.
        # Neråt (magen, stampet) räknas som vila, så att ingen arm hänger utanför bilen.
        uppe = [s for s in "rl" if kw.get(f"peka_{s}") is not None and kw[f"peka_{s}"][1] <= 600]
        for s in "rl":
            if s not in uppe:
                kw.pop(f"peka_{s}", None)
        armar = "armar" if len(uppe) == 2 else f"arm-{uppe[0]}" if uppe else None
        for lager in ("kropp", armar):
            if lager is None:
                lag.append(Image.new("RGBA", c.size))
                continue
            m = bulle(lager=lager, ben=False, **kw).resize((round(1024 * BULLE_K),) * 2, Image.LANCZOS)
            stor = Image.new("RGBA", c.size)
            stor.alpha_composite(m, (round(BULLE_X - 512 * BULLE_K), round(TOPP + BULLE_Y - 833 * BULLE_K)))
            if rot:
                stor = stor.rotate(rot, resample=Image.BICUBIC, center=(BULLE_X, TOPP + BULLE_Y - 60))
            lag.append(stor)
        c.alpha_composite(lag[0])
        ratt(c, [s for s in "rl" if s not in uppe], tuta)   # ratten syns alltid; tassar som är uppe har släppt den
    place(c, KANIN, 350, TOPP + 520, 150)   # gosekaninen på flaket, en tredjedel så hög som Bulle
    c.alpha_composite(LASTBIL, (0, TOPP))
    # flaggan längst bak, på en bredare duk (VÄNSTER): stången står kvar i flaket vid x 163 (stångens fot är x 303 i
    # flagga-rosa.png, i spegelvända bilden x 721), duken når förbi bilens bakkant
    ut = Image.new("RGBA", (VÄNSTER + 1024, 1024 + TOPP))
    place(ut, FLAGGA_GR, VÄNSTER + 77, TOPP + 510, 330)
    ut.alpha_composite(c, (VÄNSTER, 0))
    c = vit_kant(ut, 15) if vit else ut
    if lag:   # armarna framför karossen, från axlarna (som ligger strax bakom pucklarna) upp över dem
        c.alpha_composite(vit_kant(lag[1], 15) if vit else lag[1], (VÄNSTER, 0))
    ring = None
    if kontur:
        sk = Image.new("L", c.size)
        sk.paste(LASTBIL.getchannel("A").point(lambda v: 255 if v > 200 else 0), (VÄNSTER, TOPP))
        sk = sk.filter(ImageFilter.MinFilter(13))
        ring = ImageChops.subtract(sk, sk.filter(ImageFilter.MinFilter(15)))
        if lag:
            armmask = Image.new("L", c.size)
            armmask.paste(lag[1].getchannel("A").point(lambda v: 255 if v > 40 else 0), (VÄNSTER, 0))
            ring = ImageChops.subtract(ring, armmask)
    c.kontur = ring
    return c


RATT_MITT, RATT_R = (512, 700), 150   # ratten i Bulles 1024-ruta: mitt framför bröstet, nedre halvan bakom bilens kant (som 005)


def ratt(c, tassar, tuta=False):
    """Ratten framifrån som musens i 005: mörkgrå kritring med ekrar och grön tutknapp, Bulles tassar på klockan 10 och 2."""
    k = BULLE_K
    cx, cy = BULLE_X + (RATT_MITT[0] - 512) * k, TOPP + BULLE_Y + (RATT_MITT[1] - 833) * k
    r = RATT_R * k
    m, d = ritmask(c)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=255, width=round(0.24 * r))
    d.line((cx - r, cy, cx + r, cy), fill=255, width=round(0.16 * r))
    d.line((cx, cy, cx, cy + r), fill=255, width=round(0.16 * r))
    kritfyll(c, m, (75, 69, 66), vick=0.1, oskarp=0.8)
    m, d = ritmask(c)
    d.ellipse((cx - 0.27 * r, cy - 0.27 * r, cx + 0.27 * r, cy + 0.27 * r), fill=255)
    kritfyll(c, m, (96, 170, 80), vick=0.1, oskarp=0.8)
    for s in tassar:
        x, y, v = (cx + 0.75 * r, cy - 0.6 * r, -30) if s == "r" else (cx - 0.75 * r, cy - 0.6 * r, 30)
        if tuta and s == "r":   # tassen trycker på den gröna tutknappen
            x, y, v = cx + 0.1 * r, cy - 0.05 * r, -10
        m = Image.new("L", c.size)
        e = Image.new("L", (round(0.75 * r), round(0.57 * r)))
        ImageDraw.Draw(e).ellipse((0, 0, e.width - 1, e.height - 1), fill=255)
        e = e.rotate(v, expand=True, resample=Image.BICUBIC)
        m.paste(e, (round(x - e.width / 2), round(y - e.height / 2)))
        kritfyll(c, m, (226, 178, 128), vick=0.1, oskarp=0.8)   # ljusbrun som nosen, syns mot kroppen


def bulle_punkt(bpos, px=511, py=480):
    """Var en punkt på Bulle (hans 1024-koordinater, munnen som standard) hamnar på bilden."""
    s, x0, y0 = bpos
    return x0 + (VÄNSTER + BULLE_X + (px - 512) * BULLE_K) * s, y0 + (TOPP + BULLE_Y + (py - 833) * BULLE_K) * s


def bulle_mot(bpos, x, y):
    """En punkt på bilden i Bulles 1024-koordinater (omvänd bulle_punkt), för att rikta armen dit."""
    s, x0, y0 = bpos
    return 512 + ((x - x0) / s - VÄNSTER - BULLE_X) / BULLE_K, 833 + ((y - y0) / s - TOPP - BULLE_Y) / BULLE_K


def bilpunkt(bpos, px, py):
    """En punkt i lastbilens 1024-ruta (utan TOPP) på bilden."""
    s, x0, y0 = bpos
    return x0 + (VÄNSTER + px) * s, y0 + (TOPP + py) * s


def hjulpilar(c, b):
    """Hjulen rullar: en böjd pil över varje hjul."""
    s = b[0]
    for hx, hy in HJUL:
        x, y = bilpunkt(b, hx, hy)
        arrow(c, båge(x, y, 140 * s, 150, 40, steg=12))


# --- A · Vägen: körscenen ---------------------------------------------------------------------------------------
# Lastbilen står på vägen med mitten vid vänstra tredjedelslinjen och kör in i bilden åt höger. Det bruna som dyker upp
# (kotten) landar på högra tredjedelen. Buskar långt bort glider förbi bakom (parallax), vägen glider.
GV, BIL_H, BIL_X = 742, 580, W / 3 + 10
NÄR_H, NÄR_ÖGON = 700, 0.42   # närbildens höjd i Bulles koordinater och ögonens läge uppifrån


def _träd(namn, kvar=1.0):
    """Ett träd ur bakgrunder/vagen-saker; kvar < 1 skär bort den bruna stammen nertill (den döljs bakom en buske)."""
    im = Image.open(A / "arkiv/bakgrunder/vagen-saker" / f"{namn}.png").convert("RGBA")
    return im.crop((0, 0, im.width, round(im.height * kvar)))


BJÖRK, GRAN_B, LÖVTRÄD = _träd("bjork"), _träd("gran", 0.87), _träd("lovtrad", 0.66)
# träden långt bort på andra sidan vägen, bakom buskraden: mest björkar; granen och lövträdet utan stam, kanten bakom en buske
TRÄD = [(GRAN_B, 150, 560, 150), (BJÖRK, 330, 578, 220), (BJÖRK, 520, 578, 190), (BJÖRK, 720, 578, 230),
        (LÖVTRÄD, 970, 556, 150), (BJÖRK, 1150, 578, 210), (GRAN_B, 1290, 560, 140)]


def träd(c):
    for im, x, g, h in TRÄD:
        place(c, im, x, g, h)


def buskar(c):
    """Låga gröna buskar långt bort vid vägkanten (glider förbi långsammare än vägen). Gröna, inga bruna stammar."""
    for x, r in ((150, 46), (930, 60), (1010, 40), (1290, 52)):
        m, d = ritmask(c)
        d.ellipse((x - r, 572 - 1.4 * r, x + r, 576), fill=255)
        d.ellipse((x - r * 1.6, 572 - r, x - r * 0.2, 576), fill=255)
        kritfyll(c, m, (112, 178, 78), vick=0.25)


def avgaspuffar(c, b, n=3):
    """Vita kritpuffar ur avgasröret som driver bakåt (som 005:s bil): en per brum, den äldsta störst och längst bak."""
    for i in range(n):   # bakåt och uppåt, så att de syns mot grönskan och inte bara mot den ljusa vägen
        x, y = bilpunkt(b, 40 - i * 60, 720 - i * 75)
        r = (18 + i * 9) * b[0] / 0.5
        for col, k in (((196, 196, 196), 1.18), ((255, 255, 255), 1.0)):   # en mjuk grå kant runt den vita puffen
            m, d = ritmask(c)
            d.ellipse((x - r * k, y - r * k, x + r * k, y + r * k), fill=255)
            d.ellipse((x - r * 1.5 * k, y - r * 0.4 * k, x - r * 0.3, y + r * 0.8 * k), fill=255)
            kritfyll(c, m, col, alpha=0.95 - i * 0.12, vick=0.3)


def körscen(stuff=None, fart=True, skump=True, plåt_=None, **kw):
    c = (plåt_ or plåt("vägen")).copy()
    träd(c)
    buskar(c)
    if fart:  # buskarna glider förbi bakom
        arrow(c, [(1180, 520), (1060, 520)])
    if stuff:
        stuff(c)
    b = place(c, lastbilen(vit=True, **kw), BIL_X, GV, BIL_H)
    if fart:
        hjulpilar(c, b)
    if skump:  # lastbilen skumpar lite på vägen och puffar
        avgaspuffar(c, b)
        x, y = bilpunkt(b, 990, 520)
        arrow(c, [(x, y - 30), (x, y - 90)])
        arrow(c, [(x, y + 10), (x, y + 70)])
    return c, b


def närbild(c, b, dx=0, zoom=1.0):
    """Närbild på Bulle, samma inramning i alla scener: ögonen strax ovanför mitten, bilens kant längst ner."""
    h = NÄR_H * BULLE_K * b[0] / zoom
    x, _ = bulle_punkt(b)
    _, y = bulle_punkt(b, 511, 400)
    return crop_zoom(c, x + dx, y + h * (0.5 - NÄR_ÖGON), h * W / H)


# Peka-riktningar i Bulles koordinater (bara riktningen räknas)
HÖGER, UPP = (3000, 600), (950, -3000)
VINKA = (1500, -500)
MAGE = (512, 640)            # in mot bröstet och magen: så långt in de korta armarna når
UPP_R, UPP_L = (1500, -700), (-480, -700)

frames = {}

# 01 Intro: det riktiga introt (../intro/, 006:s med Avsnitt 7 · Bruna sången); bilden är en stillbild ur intro.mp4 vid 7,5 s
frames["01"] = Image.open(HÄR.parent / "intro" / "titel.jpg").convert("RGB").resize((W, H), Image.LANCZOS)


# 02–02c Kritan ritar lastbilen i den riktiga lastbilens form: flaket, sätet och motorhuven med lampan, under frågan hjulen ett i taget, sedan
# den gröna flaggan och svaret. Den står där lastbilen står i 03 (körscen()), så att zoomen in landar på den riktiga lastbilen.
# flaket bak, hytten med tak och det stora öppna fönstret, och den korta motorhuven fram: följer karossens kant i lastbil-brun-v5
# (lastbilens 1024-ruta, uppmätt 2026-11-06), så att den ritade blir samma lastbil när 03 zoomar in. RITAD_FONSTER är hålet i hytten.
RITAD_BIL = [(81, 465), (95, 455), (123, 468), (389, 470), (403, 454), (417, 227), (431, 204), (445, 196), (697, 200), (711, 205), (725, 224),
             (739, 440), (879, 446), (907, 462), (919, 500), (919, 700), (951, 700), (951, 716), (925, 724), (107, 724), (81, 712)]
RITAD_FONSTER = [(665, 241), (679, 245), (689, 255), (693, 269), (693, 474), (689, 488), (679, 498), (665, 502), (485, 502), (471, 498), (461, 488), (457, 474), (457, 269), (461, 255), (471, 245), (485, 241)]


def ritad_bil(c, lampa=True, hjul=0, flagga=False, lyft=0):
    bb = lastbilen(med_bulle=False).getbbox()
    s = BIL_H / (bb[3] - bb[1])
    P = lambda x, y: (BIL_X + (VÄNSTER + x - (bb[0] + bb[2]) / 2) * s, GV - (bb[3] - TOPP - y) * s - lyft)
    if flagga:
        m, d = ritmask(c)
        d.line((*P(150, 491), *P(150, 131)), fill=255, width=11)
        kritfyll(c, m, (168, 120, 78), vick=0.2)
        m, d = ritmask(c)
        d.polygon([P(144, 135), P(-30, 191), P(144, 261)], fill=255)   # duken pekar bakåt, som den riktiga flaggan
        kritfyll(c, m, GRÖN, vick=0.3)
    kaross, d = ritmask(c)
    d.polygon([P(*q) for q in RITAD_BIL], fill=255)
    d.polygon([P(*q) for q in RITAD_FONSTER], fill=0)   # fönstret i hytten
    kritfyll(c, kaross, KAROSS, vick=0.4, oskarp=3)
    if lampa:   # den runda ljusgula lampan på motorhuven
        m, d = ritmask(c)
        (x, y), r = P(926, 548), 26 * s
        d.ellipse((x - r, y - r, x + r, y + r), fill=255)
        kritfyll(c, m, (250, 226, 140), vick=0.2)
    for hx, hy in HJUL[:hjul]:
        m, d = ritmask(c)
        (x, y), r = P(hx, hy), 98 * s
        d.ellipse((x - r, y - r, x + r, y + r), fill=255)
        kritfyll(c, m, (70, 70, 74), vick=0.3)
        m, d = ritmask(c)
        d.ellipse((x - r * 0.3, y - r * 0.3, x + r * 0.3, y + r * 0.3), fill=255)
        kritfyll(c, m, (190, 190, 190), vick=0.2)


def krita(c, x, y):
    """Kritan utan ansikte, spetsen i (x, y). Den här gången brun."""
    m, d = ritmask(c)
    d.polygon([(x, y), (x + 100, y - 100), (x + 130, y - 70), (x + 30, y + 30)], fill=255)
    kritfyll(c, m, BRUN)


c = paper(); ritad_bil(c); krita(c, 1010, 520); frames["02"] = c
c = paper(); ritad_bil(c, hjul=2); krita(c, 640, 700); frames["02a"] = c   # kritan har lyft från det andra hjulet
c = paper(); ritad_bil(c, hjul=2, flagga=True); krita(c, 600, 160); frames["02b"] = c   # kritan har lyft från flaggan
c = paper(); ritad_bil(c, hjul=2, flagga=True, lyft=30); krita(c, 1080, 200)
arrow(c, [(BIL_X + 300, 560), (BIL_X + 300, 460), (BIL_X + 300, 560)])
frames["02c"] = c

# 03 Zoom in: den ritade lastbilen blir Bulles lastbil på vägen
c, b = körscen(fart=False, skump=False)
for r in (240, 310):
    ImageDraw.Draw(c).ellipse((BIL_X - r * 1.3, GV - BIL_H / 2 - r, BIL_X + r * 1.3, GV - BIL_H / 2 + r), outline=(255, 255, 255), width=5)
frames["03"] = c

# 03a Bulle vinkar till tittaren ("Hej hej!"), 03b … och lägger tassarna på bilens kant
c, b = körscen(skump=False, fart=False, mood="blinkar", peka_r=VINKA)
vift(c, *bulle_punkt(b, 980, 330))
frames["03a"] = närbild(c, b)
c, b = körscen(skump=False, fart=False, blick=(8, 0))
frames["03b"] = närbild(c, b)

# 04 Mellanspelet: vägen glider, lastbilen skumpar, buskarna glider förbi bakom (parallax), Bulle gungar i shuffletakten.
c, b = körscen(mood="skrattar", blick=(6, -2))
hx, hy = bulle_punkt(b, 511, 240)
arrow(c, [(hx - 90, hy - 30), (hx - 150, hy + 10)])   # gungar åt sidorna i takten
arrow(c, [(hx + 90, hy - 30), (hx + 150, hy + 10)])
frames["04"] = c
# 041 "Björnen kör sin bruna bil": körscen, gungar i takten (närbilden är bara 03a–03b)
c, b = körscen(mood="skrattar", rot=6)
frames["041"] = c
# 042 "Brum, brum, brum – på vägen här!": körscen, lastbilen skumpar en gång per brum
c, b = körscen(mood="ropar", blick=(6, -2))
frames["042"] = c
# 04a "Björnen letar efter brunt, leta med – jag och du!": spanar åt vänster och höger, sedan tittar han på oss
c, b = körscen(mood="nyfiken", peka_l=(-3000, -400), blick=(-10, -2), rot=6)
hx, hy = bulle_punkt(b, 511, 250)
arrow(c, [(hx + 40, hy - 150), (hx - 220, hy - 150)])
arrow(c, [(hx + 80, hy - 150), (hx + 340, hy - 150)])
frames["04a"] = c


VIT, SKEN = (255, 255, 255), (255, 236, 205)


def stjärna(c, x, y, r, col=VIT, sken=False):
    if sken:
        m, d = ritmask(c)
        d.ellipse((x - r * 0.9, y - r * 0.9, x + r * 0.9, y + r * 0.9), fill=255)
        c.paste(SKEN, mask=m.filter(ImageFilter.GaussianBlur(r * 0.45)).point(lambda v: int(v * 0.7)))
    m, d = ritmask(c)
    k = r * 0.28
    d.polygon([(x, y - r), (x + k, y - k), (x + r, y), (x + k, y + k), (x, y + r), (x - k, y + k), (x - r, y), (x - k, y - k)], fill=255)
    kritfyll(c, m, col, vick=0.15, oskarp=0.8)


def snurra(c, x, y, r, varv=3):
    """Snurran som tassen ritar i luften: en spiral inifrån och ut, med pil i änden (snurr, snurr, snurr)."""
    pts = [(x + r * t / (360 * varv) * math.cos(math.radians(t)), y - r * t / (360 * varv) * math.sin(math.radians(t)))
           for t in range(40, 360 * varv, 20)]
    arrow(c, pts)


# Refrängen (sang.md, version 5), likadan varje gång: rad 1 på vägen (björnstampet), sedan kritsvep till kanelbullsberget,
# en jättestor kanelbulle sedd från sidan mot ljusblå himmel (som Glassberget i 005). Lastbilen rullar in vid foten till
# vänster, kör uppför bullen, över toppen och nerför andra sidan, alltid åt höger och aldrig vänd (bara lutad efter
# backen). Kritan ritar kolasås och en chokladrand över bullen i kod. Himlen glöder varmbeige på "allt är brunt – hurra!".
# "Titta ut!" är närbild på vägen igen (kameran zoomar ut tillbaka till vägen).
DANS = {
    "upp": dict(mood="ropar", peka_r=UPP_R, peka_l=UPP_L),
    "stamp": dict(mood="ropar", peka_r=(1300, 900), peka_l=(-280, 900)),    # tassarna ner, stampar så att lastbilen skumpar
    "mage": dict(mood="njuter", peka_r=MAGE, peka_l=MAGE),
    "tut": dict(mood="skrattar", peka_r=(1300, 200), peka_l=(-280, 200)),   # tutar med handen
    "kör": dict(mood="skrattar"),
    "titta": dict(mood="nyfiken", peka_r=(3000, -400), blick=(10, -2), rot=-4),
}
DANS_X, DANS_G, DANS_H = W / 2, 735, 520
BERG_H = 300   # lastbilen på berget


def berget_plåt(glöd=False):
    """Kanelbullsberget (bakgrunder/kanelbullsberget, v1 tills Sanna väljer). glöd: himlen varmbeige, bullen som den är."""
    nyckel = "berget-glöd" if glöd else "berget"
    if nyckel not in _plåt:
        c = bild("berget", lambda: Image.new("RGB", (W, H), (155, 223, 246))).convert("RGB").resize((W, H))
        if glöd:
            a = np.asarray(c, np.float32)
            himmel = ((a[..., 2] > 200) & (a[..., 0] < 200)).astype(np.float32)[..., None]
            ton = a.mean(-1, keepdims=True) / 220
            c = Image.fromarray(np.clip(a * (1 - himmel) + np.array(BEIGE, np.float32) * ton * himmel, 0, 255).astype(np.uint8))
        _plåt[nyckel] = c
    return _plåt[nyckel]


# bullbergets överkant, uppmätt i v1-plåten (x, y); foten når bildens underkant
BERG = [(225, 768), (240, 642), (300, 496), (360, 404), (420, 348), (480, 310), (540, 276), (600, 256), (660, 244), (720, 238),
        (780, 248), (840, 264), (900, 288), (960, 324), (1020, 374), (1080, 452), (1140, 564), (1170, 768)]


def berg_y(x):
    return float(np.interp(x, [p[0] for p in BERG], [p[1] for p in BERG]))


def berg_lut(x):
    """Backens lutning i grader (moturs), så att lastbilen lutar med bullen."""
    return -math.degrees(math.atan2(berg_y(x + 25) - berg_y(x - 25), 50))


def på_berget(c, x, ground=None, rot=None, **kw):
    """Lastbilen på bullen vid x (eller på marken), lutad efter backen. Hjulen står på ytan."""
    g = berg_y(x) + 14 if ground is None else ground
    r = berg_lut(x) if rot is None else rot
    return place(c, lastbilen(vit=True, **kw), x, g, BERG_H, rot=r)


def kolasås(c, steg=2):
    """Kritan ritar en tjock kolarinnel (steg ≥ 1) och en chokladrand (steg 2) över bullen, i kod."""
    m, d = ritmask(c)
    xs = range(300, 1110, 12)
    d.line([(x, berg_y(x) + 18) for x in xs], fill=255, width=34)
    for x, l in ((380, 90), (520, 140), (700, 70), (860, 120), (1000, 80)):   # rinnande droppar
        y = berg_y(x) + 18
        d.line((x, y, x, y + l), fill=255, width=26)
        d.ellipse((x - 17, y + l - 17, x + 17, y + l + 17), fill=255)
    kritfyll(c, m, (214, 150, 62), vick=0.3, oskarp=2)          # kola
    if steg >= 2:
        m, d = ritmask(c)
        d.line([(x, berg_y(x) + 110 + 10 * math.sin(x / 40)) for x in range(330, 1090, 12)], fill=255, width=26)
        kritfyll(c, m, (92, 52, 28), vick=0.3, oskarp=2)        # choklad


def flaska(färg):
    """En stor klämflaska upp och ner, i krita med vit kant: kroppen (lite hopklämd i mitten) och en spetsig pip nedåt."""
    im, _ = tom(300, 420)
    m, d = ritmask(im)
    d.polygon([(40, 0), (260, 0), (262, 120), (236, 150), (262, 185), (250, 260), (190, 300), (110, 300), (50, 260),
               (38, 185), (64, 150), (38, 120)], fill=255)
    kritfyll(im, m, färg, vick=0.3)
    m, d = ritmask(im)
    d.polygon([(118, 296), (182, 296), (162, 392), (138, 392)], fill=255)
    kritfyll(im, m, (240, 236, 226), vick=0.2)   # pipen, ljus plast
    return vit_kant(im, 13)


KOLA, CHOKLAD = (214, 150, 62), (92, 52, 28)
FLASKOR = {KOLA: flaska(KOLA), CHOKLAD: flaska((110, 66, 38))}


def kläm(c, x, färg, stråle=True):
    """Flaskan hänger ner från bildens överkant vid x och klämmer: en tjock vågig stråle ner på bullen."""
    place(c, FLASKOR[färg], x, 300, 300)
    for dx in (-150, 150):   # klämstreck på sidorna
        arrow(c, [(x + dx, 120), (x + dx * 0.75, 120)])
    if stråle:
        m, d = ritmask(c)
        d.line([(x + 14 * math.sin(y / 30), y) for y in range(296, int(berg_y(x)) + 30, 8)], fill=255, width=26)
        kritfyll(c, m, färg, vick=0.3, oskarp=1.5)


def dansa(c, rörelse, hopp, x, ground, h):
    """Lastbilen med Bulle i dansrörelsen, på vägen (rad 1 och närbilden på rad 8)."""
    b = place(c, lastbilen(vit=True, **DANS[rörelse]), x, ground, h)
    if hopp:   # tre stamp, lastbilen skumpar en gång per "brun"
        for k in range(3):
            ax = x - h * 0.62 + k * 36
            arrow(c, [(ax, ground - 30), (ax, ground - 110)])
    if rörelse == "titta":
        hx, hy = bulle_punkt(b, 512, 160)
        arrow(c, [(hx, hy), (hx + 150, hy)])
        arrow(c, [(hx, hy), (hx - 150, hy)])
    return b


def tassavtryck(c, x, y, r=20, col=(130, 84, 50)):
    """Ett brunt tassavtryck i krita (trampdyna och tre tår), som poppar upp på vägen."""
    m, d = ritmask(c)
    d.ellipse((x - r, y - r * 0.7, x + r, y + r * 0.7), fill=255)
    for dx, dy in ((-0.9, -1.05), (0, -1.35), (0.9, -1.05)):
        d.ellipse((x + dx * r - r * 0.35, y + dy * r - r * 0.35, x + dx * r + r * 0.35, y + dy * r + r * 0.35), fill=255)
    kritfyll(c, m, col, vick=0.2, oskarp=0.8)


def hjärta(c, x, y, r, col):
    m, d = ritmask(c)
    d.ellipse((x - r, y - r * 0.8, x, y + r * 0.2), fill=255)
    d.ellipse((x, y - r * 0.8, x + r, y + r * 0.2), fill=255)
    d.polygon([(x - r * 0.95, y - r * 0.1), (x + r * 0.95, y - r * 0.1), (x, y + r)], fill=255)
    kritfyll(c, m, col, vick=0.15, oskarp=0.8)


def ringar(c, x, y, r0, n=3, col=VIT):
    """Små ljudringar (tut, pop): öppna bågar ut från en punkt."""
    for i in range(n):
        r = r0 * (1 + 0.6 * i)
        m, d = ritmask(c)
        d.arc((x - r, y - r, x + r, y + r), -70, 70, fill=255, width=7)
        d.arc((x - r, y - r, x + r, y + r), 110, 250, fill=255, width=7)
        kritfyll(c, m, col, vick=0.1, oskarp=0.6)


def fartstreck(c, pts, col=VIT):
    """Fartstreck i krita bakom lastbilen, längs backen."""
    m, d = ritmask(c)
    for k in (-34, 0, 34):
        d.line([(x - 40, y + k) for x, y in pts], fill=255, width=9)
    kritfyll(c, m, col, alpha=0.9, vick=0.2, oskarp=0.8)


# Refrängen, ny bildplan (refrang-plan.md): en idé per rad, kameran följer lastbilen, huvudsaken på en tredjedel och hel.
# Lastbilen kör alltid åt höger och vänds aldrig, ratten syns alltid. Saker på ord blir klistermärken/kritpynt.
REF_H = 0.42 * H   # lastbilen i halvbilderna, 35–45 % av bildhöjden
REF = {}
c = plåt("vägen").copy(); träd(c); buskar(c)               # a Brun, brun, brun!: halvbild, stamp, sex tassavtryck på vägen
b = dansa(c, "stamp", True, W / 2 - 60, 735, REF_H * 1.25)
for i in range(6):
    tassavtryck(c, 930 + i * 72, 728 - (i % 2) * 18)
streck(c, 930 + 5 * 72, 690, r=34, n=4, col=VIT)          # pop
REF["a"] = crop_zoom(c, W / 2, H / 2 + 20, W / 1.06)      # liten knuff in per stamp
c = berget_plåt().copy()                                   # b Lastbil, lastbil – (brum, brum!): kör redan, vänster tredjedel
b = på_berget(c, W / 3 - 120, ground=H - 4, rot=0, mood="skrattar")
hjulpilar(c, b)
avgaspuffar(c, b)
arrow(c, [(W / 3 - 60, 70), (W / 3 + 160, 70)])            # kameran följer åt höger
REF["b"] = c
c = berget_plåt().copy()                                   # c Upp på stora backen, (upp, upp!): kameran följer uppför
b = på_berget(c, 400, mood="ropar")
for k, (px, py) in enumerate(BERG[3:6]):
    arrow(c, [(px + 60, py - 150 - 20 * k), (px + 60, py - 230 - 20 * k)], col=VIT)   # små vita pilar upp
kx, ky = bilpunkt(b, 350, 300)
arrow(c, [(kx, ky), (kx, ky - 40)])                        # kaninen guppar
REF["c"] = crop_zoom(c, *bilpunkt(b, 512, 420), W / 1.2)   # lastbilen i mitten
c = berget_plåt().copy()                                   # d Nerför sidan, vii!: väntar på toppen, susar ner
fartstreck(c, [(p[0], p[1] - 70) for p in BERG[8:12]])
b = på_berget(c, 1030, mood="ropar", peka_r=UPP_R, peka_l=UPP_L)
REF["d"] = crop_zoom(c, bilpunkt(b, 512, 420)[0] - 120, bilpunkt(b, 512, 420)[1], W / 1.2)   # lastbilen på höger tredjedel
c = berget_plåt().copy()                                   # e Kolasås och choklad: hela bullen, flaskorna hela från lock till pip
kolasås(c)
for x, färg in ((470, KOLA), (900, CHOKLAD)):
    place(c, FLASKOR[färg], x, 250, 220)
    m, d = ritmask(c)
    d.line([(x + 12 * math.sin(y / 30), y) for y in range(248, int(berg_y(x)) + 30, 8)], fill=255, width=22)
    kritfyll(c, m, färg, vick=0.3, oskarp=1.5)
    for dy in (0, 30):                                     # guppar två gånger på "mums, mums"
        arrow(c, [(x + 120, 70 + dy), (x + 120, 40 + dy)])
på_berget(c, 1140, ground=H - 4, rot=0, mood="slickar")
REF["e"] = c
c = berget_plåt(glöd=True).copy()                          # f allt är brunt – hurra!: glitter ur bullens topp
kolasås(c)
for x, y, r, form in ((620, 150, 26, "s"), (720, 110, 30, "h"), (820, 150, 26, "s"), (560, 210, 18, "h"), (880, 205, 20, "s")):
    (stjärna if form == "s" else hjärta)(c, x, y, r, (124, 74, 40))
på_berget(c, 1140, ground=H - 4, rot=0, mood="skrattar", peka_r=UPP_R, peka_l=UPP_L)
REF["f"] = crop_zoom(c, W / 2 + 40, H / 2, W / 1.08)
c = berget_plåt().copy()                                   # g Tut, tut, tut, tut: närbild på ratten, tassen på tutknappen
kolasås(c)
b = på_berget(c, 1000, ground=H - 4, rot=0, mood="skrattar", tuta=True)
tx, ty = bulle_punkt(b, *RATT_MITT)
ringar(c, tx, ty, 1.25 * RATT_R * BULLE_K * b[0], n=2)   # utanför ratten, på båda sidor
REF["g"] = närbild(c, b, zoom=1.15)
c = plåt("vägen").copy(); träd(c); buskar(c)               # h vad är brunt? Titta ut!: närbild på vägen, tass över ögonen
b = place(c, lastbilen(vit=True, mood="nyfiken", peka_r=(640, 300), blick=(-10, -2)), W / 2, 735, REF_H * 1.25)
hx, hy = bulle_punkt(b, 512, 160)
arrow(c, [(hx - 40, hy - 40), (hx - 200, hy - 40)])
arrow(c, [(hx + 40, hy - 40), (hx + 200, hy - 40)])
REF["h"] = närbild(c, b)
# Kolasåsresan (tagning 3): stillbilderna ur kodscenen (scener/_test/refrang, refrang.js) ersätter de ritade berg-bilderna ovan
for k in REF:
    p = HÄR / "refrang" / f"{k}.jpg"
    if p.exists():
        REF[k] = Image.open(p).convert("RGB").resize((W, H), Image.LANCZOS)
for n in ("05", "09"):
    for k, im in REF.items():
        frames[n + k] = im


# 06 Brun sak 1 – kotten: en brun kotte trillar ner från ovan bildkanten framför lastbilen (högra tredjedelen) och studsar
# på vägen; Bulle blir förvånad och tittar dit.
# Kotten trillar ur en gran vid vägkanten. Granens bruna stam skärs bort (bara barren, nederkanten mot vägkanten), så att
# kotten är det enda bruna i bilden.
GRAN = Image.open(A / "arkiv/bakgrunder/vagen-saker/gran.png").convert("RGBA")
GRAN = GRAN.crop((0, 0, GRAN.width, 512))
KOTTE_X, KOTTE_H = 2 * W / 3 + 90, 100
gran = lambda c: place(c, GRAN, KOTTE_X - 60, 590, 430)
c, b = körscen(stuff=lambda c: (gran(c), place(c, KOTTE, KOTTE_X + 10, 430, KOTTE_H, rot=-12)), fart=False, skump=False,
               mood="forvanad", blick=(10, -6))
arrow(c, [(KOTTE_X + 70, 420), (KOTTE_X + 70, 640)])
frames["06"] = c
# 06a Titta där! Kotten är brun: kotten ligger på vägen under granen, Bulle pekar på den
pb = place(Image.new("RGB", (W, H)), lastbilen(vit=True), BIL_X, GV, BIL_H)
c, b = körscen(stuff=lambda c: (gran(c), place(c, KOTTE, KOTTE_X, 700, KOTTE_H)), fart=False, skump=False, mood="skrattar",
               blick=(10, 2), peka_r=bulle_mot(pb, KOTTE_X, 640))
frames["06a"] = c
# 06b dunk, dunk, dunk: närbild, Bulle lyfter tassen mot huvudet och knackar försiktigt, en gång per dunk (de korta armarna
# når inte ända upp: tassen vid örat), och kotten studsar tre gånger på bilens kant bredvid honom.
c, b = körscen(stuff=gran, fart=False, skump=False, mood="njuter", peka_l=(-300, -3000), blick=(0, -4))
kx, ky = bulle_punkt(b, 1000, 700)
for i, dx in enumerate((0, 70, 140)):
    place(c, KOTTE, kx + dx, ky - (60 if i == 1 else 0), 70)
arrow(c, båge(kx + 35, ky - 20, 35, 170, 10, ry=60))
arrow(c, båge(kx + 105, ky - 20, 35, 170, 10, ry=60))
hx, hy = bulle_punkt(b, 240, 230)
arrow(c, [(hx - 10, hy - 70), (hx - 10, hy)])
frames["06b"] = närbild(c, b, dx=40)


# 08 Frågan: frågande min mot tittaren, huvudet på sned och tassarna uppåt
c, b = körscen(fart=False, skump=False, mood="nyfiken", blick=(0, -2), rot=8, peka_r=(1500, -300), peka_l=(-480, -300))
frames["08"] = närbild(c, b)
# 08a Pausen (4–5 s): Bulle tittar ner på sin päls, kameran åker in mot den (ca 1,25×)
c, b = körscen(fart=False, skump=False, mood="nyfiken", blick=(0, 9), nick=14)
frames["08a"] = närbild(c, b, zoom=1.25)
# 08b Björnen är brun – och öronen med!: ena tassen på magen, den andra pekar upp mot örat
c, b = körscen(fart=False, skump=False, mood="skrattar", peka_r=MAGE, peka_l=(-200, -3000), blick=(-4, -6))
frames["08b"] = närbild(c, b)
# 08c Brum, brum, brum!: båda tassarna klappar på magen, tre gånger, nöjd
c, b = körscen(fart=False, skump=False, mood="njuter", peka_r=MAGE, peka_l=MAGE)
for px in (360, 660):
    x, y = bulle_punkt(b, px, 700)
    arrow(c, [(x, y - 70), (x, y)])
frames["08c"] = närbild(c, b)


def tankemoln(c, b, plask=False):
    """Bryggan: Bulle blundar, tankemolnet med kolalandet (rekvisita/kolalandet) uppe till höger, plasket på "Ett hav av kolasås"."""
    hx, hy = bulle_punkt(b, 700, 120)
    for i, r in enumerate((14, 22, 30)):
        m, d = ritmask(c); x, y = hx + 40 + i * 45, hy - 20 - i * 50
        d.ellipse((x - r, y - r, x + r, y + r), fill=255); kritfyll(c, m, VIT, vick=0.1, oskarp=0.8)
    mx, my = hx + 330, hy - 230
    m, d = ritmask(c)
    for x, y, r in ((-150, 10, 95), (-60, -55, 110), (60, -60, 115), (155, 5, 95), (70, 60, 100), (-60, 60, 100)):
        d.ellipse((mx + x - r, my + y - r, mx + x + r, my + y + r), fill=255)
    kritfyll(c, m, VIT, vick=0.1, oskarp=0.8)
    land = Image.open(A / "rekvisita/kolalandet/cut/kolalandet.png").convert("RGBA")
    place(c, land, mx, my + 120, 230)
    if plask:
        place(c, Image.open(A / "rekvisita/kolasas/cut/plask.png").convert("RGBA"), mx + 150, my + 140, 120)


# 04b / 08d Bryggan "Björnen blundar … tänk om": blundar, molnet med kolalandet; plasket på "Ett hav av kolasås"
c, b = körscen(mood="njuter", rot=4)
tankemoln(c, b)
frames["04b"] = c
c, b = körscen(mood="njuter", rot=-4)
tankemoln(c, b, plask=True)
frames["08d"] = c

# 10 Kritsvep i ängens himmelsblå, från vänster till höger
c = frames["09f"].copy()
m, d = ritmask(c)
for i in range(70):
    y = i * 12 - 20
    x1 = 780 + random.uniform(-50, 50)
    d.line((-20, y + 30, x1, y - 30), fill=255, width=40)
    d.ellipse((x1 - 20, y - 50, x1 + 20, y - 10), fill=255)
kritfyll(c, m, (94, 189, 227), vick=0.35, oskarp=3)
arrow(c, [(860, 380), (1060, 380)], (255, 255, 255))
frames["10"] = c


# --- B · Ängen: Ludde sitter på en filt uppe på en låg grön backe, lastbilen stannar bredvid. Backen går ner åt höger
# till den platta marken, dit bullen rullar och där Igge kommer rullande in.
PLATÅ, FOT_Y, BACKE = 590, 716, (790, 1130)   # backens topp, foten och var den lutar (x)


def backe_y(x):
    a, b = BACKE
    t = min(max((x - a) / (b - a), 0), 1)
    return PLATÅ + (FOT_Y - PLATÅ) * (1 - math.cos(math.pi * t)) / 2


def ängen_plåt():
    """Ängens plåt med backen i kod (grön, inget brunt). Plåten själv är platt; backen behövs för att bullen ska rulla."""
    if "backe" not in _plåt:
        c = plåt("ängen").copy()
        m, d = ritmask(c)
        d.polygon([(-20, PLATÅ + 8 * math.sin(-0.2))] + [(x, backe_y(x) + 6 * math.sin(x / 90)) for x in range(-20, BACKE[1] + 40, 15)]
                  + [(BACKE[1] + 60, H + 10), (-20, H + 10)], fill=255)
        kritfyll(c, m, GRÄS, vick=0.3, oskarp=2)
        m, d = ritmask(c)
        rnd = random.Random(4)
        for _ in range(60):   # grässtrån
            x = rnd.uniform(0, BACKE[1]); y = rnd.uniform(backe_y(x) + 20, H)
            d.line((x, y, x + rnd.uniform(-6, 6), y - rnd.uniform(14, 26)), fill=255, width=4)
        kritfyll(c, m, (112, 176, 72), alpha=0.8, vick=0.1, oskarp=0.8)
        _plåt["backe"] = c
    return _plåt["backe"]


BIL_B = (300, 620, 360)          # lastbilen på ängen: x, mark, höjd
FILT_X = (500, 860)
LUDDE_X, LUDDE_FOT, LUDDE_K = 735, 612, 0.36
# Ludde sittande, platshållare: v1 tills Sanna valt mellan v1 och v2
LUDDE_SITTER, LUDDE_SITT_H = vit_kant(Image.open(A / "karaktarer/lammet-ludde/cut/ludde-sitter-v1.png").convert("RGBA"), 13), 230
KORG_X, KORG_G, KORG_H = 585, 618, 110
BULL_I_KORG = (KORG_X - 58, KORG_G - KORG_H * 0.45, 64)
IGGE_X, IGGE_FOT, IGGE_K = 1230, 742, 0.2
BULLE_UTE = (470, 618, 0.36)     # Bulle ute ur lastbilen, på filten (14c–f)
BULLE_GRÄS = (470, 660, 0.36)    # Bulle har klivit ur lastbilen (11a–13f): i gräset framför bilens nos, vid filten


def filt(c):
    m, d = ritmask(c)
    a, b = FILT_X
    d.polygon([(a + 30, PLATÅ - 6), (b - 30, PLATÅ - 6), (b + 10, PLATÅ + 34), (a - 10, PLATÅ + 34)], fill=255)
    kritfyll(c, m, FILT, vick=0.2, oskarp=1.5)
    m, d = ritmask(c)
    for x in range(a + 50, b, 60):
        d.line((x, PLATÅ - 4, x - 10 + (x - (a + b) / 2) * 0.08, PLATÅ + 32), fill=255, width=7)
    kritfyll(c, m, (255, 250, 230), alpha=0.8, vick=0.1, oskarp=0.8)


def ängsbild(bil=True, bulle_kw=None, ludde_kw=None, korg_bulle=True, igge_=None, igge_boll=False, bulle_ute=None,
             fia=None, ute=BULLE_UTE):
    """Hela ängen (helbilden). bulle_kw: Bulle i lastbilen (None = lastbilen är tom). ludde_kw: Ludde på filten.
    igge_: (humör, peka) för Igge vid backens fot, None = borta. bulle_ute: kw för Bulle stående på filten."""
    c = ängen_plåt().copy()
    if fia:
        place(c, FIA, *fia, 80, rot=8)
    filt(c)
    b = None
    if bil:
        b = place(c, lastbilen(vit=True, med_bulle=bulle_kw is not None, **(bulle_kw or {})), *BIL_B)
    place(c, KORG, KORG_X, KORG_G, KORG_H)
    if korg_bulle:
        place(c, BULLEN, BULL_I_KORG[0], BULL_I_KORG[1], BULL_I_KORG[2])
    if ludde_kw is not None and not ({"håll", "peka_r", "arm_r"} & set(ludde_kw)):   # sitter på filten (bilden har armar och ansikte)
        place(c, LUDDE_SITTER, LUDDE_X, LUDDE_FOT + 12, LUDDE_SITT_H)
    elif ludde_kw is not None:   # håller något eller armarna upp: riggen (14d–f)
        kw = dict(ludde_kw)
        mood = kw.pop("mood", "glad")
        sätt(c, ludde(mood, ben="sitter", **kw), LUDDE_X, LUDDE_FOT, LUDDE_K)
    if bulle_ute is not None:
        kw = dict(bulle_ute)
        mood = kw.pop("mood", "glad")
        x, fot, k = ute
        sätt(c, bulle(mood, **kw), x, fot, k)
    if igge_boll:
        place(c, IGGE_BOLL, IGGE_X, IGGE_FOT, 150)
    elif igge_ is not None:
        sätt(c, igge(igge_[0], **igge_[1]), IGGE_X, IGGE_FOT, IGGE_K)
    return c, b


def tvåbild(c):
    return crop_zoom(c, 540, 470, W / 1.45)


def ludde_närbild(c):
    return crop_zoom(c, (LUDDE_X + KORG_X) / 2, 520, W / 2.5)


B_ÄNG = place(Image.new("RGB", (W, H)), lastbilen(vit=True), *BIL_B)


def mot_bulle(x, y):
    """En punkt på ängen som peka-riktning för Bulle i lastbilen (bara riktningen räknas)."""
    return bulle_mot(B_ÄNG, x, y)


def mot_ludde(x, y):
    return mot(x, y, LUDDE_X, LUDDE_FOT, LUDDE_K)


def gräs(**kw):
    """Ängen med Bulle utanför lastbilen (11a–13f): bilen står tom, Bulle står i gräset med ben."""
    kw.setdefault("bulle_kw", None)
    return ängsbild(ute=BULLE_GRÄS, **kw)


def mot_ute(x, y, pos=BULLE_GRÄS):
    return mot(x, y, *pos)


def ute_punkt(px, py, pos=BULLE_GRÄS):
    """En punkt på Bulle (hans 1024-koordinater) när han står i gräset."""
    x, fot, k = pos
    return x + (px - 512) * k, fot + (py - 833) * k


def närbild_ute(c, pos=BULLE_GRÄS, zoom=1.0):
    """Närbild på Bulle när han står, samma inramning som i lastbilen: ögonen strax ovanför mitten."""
    h = NÄR_H * pos[2] / zoom
    x, y = ute_punkt(511, 400, pos)
    return crop_zoom(c, x, y + h * (0.5 - NÄR_ÖGON), h * W / H)


# Brun sak 2 – kanelbullen (tagning 2: ingen lucka, sången klipps aldrig). Bilderna är utan röst: ”Hej!”, Ludde håller
# fram korgen, Bulle pekar, får bullen, ”Tack!”, allt inom ”Vad är brunt? … snurr, snurr, snurr!”.
# 11 Vad är brunt?: lastbilen rullar in från vänster mot filten, Ludde sitter redan där med korgen. Fia fladdrar förbi högt.
c, b = ängsbild(bulle_kw=dict(blick=(10, 0)), ludde_kw=dict(blick=(-8, 0)), fia=(1040, 200))
avgaspuffar(c, b)                                          # brum, brum
arrow(c, [(990, 170), (1160, 120)])
arrow(c, [(40, 470), (190, 470)])
frames["11"] = c
# 11a (2:01) Bulle kliver ur lastbilen: kameran zoomar in på honom, ett kort lugnt hopp ner bredvid bilen (ingen snurr)
c, b = ängsbild(bulle_kw=None, ludde_kw=dict(blick=(-8, 0)), bulle_ute=dict(mood="skrattar", blick=(6, 4), arm_r=40, arm_l=-40),
                ute=(BULLE_GRÄS[0], BULLE_GRÄS[1] - 40, BULLE_GRÄS[2]))
sx, sy = bulle_punkt(b, 512, 600)                          # från sätet
lx, ly = ute_punkt(512, 833)
arrow(c, båge((sx + lx) / 2, sy + 10, (lx - sx) / 2, 170, 10, ry=60))
frames["11a"] = crop_zoom(c, (sx + lx) / 2, ly - 150, W / 2.2)
# 11b Titta där! (Ludde: ”Hej!”): Bulle står vid filten och pekar på korgen, Ludde håller fram den
c, _ = gräs(ludde_kw=dict(blick=(-6, 2)), bulle_ute=dict(mood="forvanad", peka_r=mot_ute(*BULL_I_KORG[:2]), blick=(9, 4)))
streck(c, LUDDE_X, 330, r=36, n=5, col=VIT)                # Ludde säger ”Hej!”
frames["11b"] = tvåbild(c)
# 11d Bullen är brun – (Bulle: ”Tack!”): Bulle har fått bullen och håller upp den
c, _ = gräs(ludde_kw=dict(blick=(-8, 0)), korg_bulle=False,
            bulle_ute=dict(mood="skrattar", peka_r=(1500, -500), håll={"r": (BULLEN, 150)}, blick=(8, -4)))
bx, by = ute_punkt(900, 300)
streck(c, bx, by, r=30, n=5, start=-170, slut=-10, col=VIT)   # pling
frames["11d"] = tvåbild(c)
# 11e snurr, snurr, snurr!: närbild, Bulle ritar bullens snurra i luften med den andra tassen, tre varv
c, _ = gräs(ludde_kw=None, korg_bulle=False,
            bulle_ute=dict(mood="skrattar", peka_r=(1500, 200), håll={"r": (BULLEN, 150)}, peka_l=(-900, -600), blick=(-8, -4)))
sx, sy = ute_punkt(60, 300)                                # bredvid den lediga tassen
snurra(c, sx, sy, 45)
frames["11e"] = närbild_ute(c, zoom=0.8)


# Vers 2 (sang.md v5): bullen glider ur Bulles tassar på "trillar", studsar en gång i gräset och rullar nerför backen åt höger,
# mindre och mindre (bort, bort, bort). Den rullar men snurrar inte runt (lutar och skuttar, se frågorna). Bulle står i
# gräset (han klev ur lastbilen i 11a), blir ledsen och frågar efter hjälp. Igge syns inte förrän ledtråden i 13f.
def bullen_på_backen(c, x, h=74, rot=0):
    place(c, BULLEN, x, backe_y(x) + 6, h, rot=rot)


def spöke(c, x, h=74):
    m, d = ritmask(c)
    y = backe_y(x) + 6 - h / 2
    d.ellipse((x - h / 2, y - h / 2, x + h / 2, y + h / 2), outline=255, width=5)
    kritfyll(c, m, (255, 255, 255), alpha=0.7, vick=0.15, oskarp=0.8)


def igge_tittar(c):
    """Ledtråden: Igges nos och några taggar tittar fram bakom blommorna nere till höger."""
    lag = Image.new("RGBA", c.size)
    sätt(lag, igge("nyfiken", blick=(-8, -2)), W - 80, IGGE_FOT + 40, IGGE_K)
    c.paste(lag, (0, 0), lag)


# 13a Oj, oj! Bullen trillar! (Åh nej!): bullen glider ur Bulles tass, studsar en gång i gräset vid filtens kant; båda förvånade
c, _ = gräs(ludde_kw=dict(mood="forvanad", blick=(-4, 8)), korg_bulle=False,
            bulle_ute=dict(mood="forvanad", peka_r=(1400, 300), blick=(8, 8)))
place(c, BULLEN, 640, PLATÅ + 20, 74, rot=-10)
arrow(c, [(560, 470), (600, 530), (625, 560)])
arrow(c, båge(700, PLATÅ - 30, 50, 170, 10, ry=50))
frames["13a"] = tvåbild(c)
# 13b Rull, rull – nerför backen: helbild, bullen rullar av filten och nerför backen, ett skutt per "rull"
c, _ = gräs(ludde_kw=dict(mood="forvanad", blick=(10, 6)), korg_bulle=False,
            bulle_ute=dict(mood="forvanad", peka_r=(1600, 200), blick=(10, 6)))
STEG = [760, 860, 960]
for x in STEG:
    spöke(c, x)
bullen_på_backen(c, 1040, rot=-14)
for a, b_ in zip(STEG, STEG[1:] + [1040]):
    arrow(c, båge((a + b_) / 2, backe_y((a + b_) / 2) - 60, (b_ - a) / 2, 170, 10, ry=40))
frames["13b"] = c
# 13c bort!: bullen rullar vidare åt höger på den platta marken, mindre och mindre, ut mot kanten
c, _ = gräs(ludde_kw=dict(mood="forvanad", blick=(10, 6)), korg_bulle=False, bulle_ute=dict(mood="ledsen", blick=(10, 6)))
for x, h in ((1150, 64), (1230, 52)):
    spöke(c, x, h)
place(c, BULLEN, 1300, FOT_Y + 2, 40, rot=-10)
arrow(c, [(1120, FOT_Y - 60), (1290, FOT_Y - 60)])
frames["13c"] = c
# 13d Björnen är ledsen – snyft: närbild, ledsen med en liten tår
c, _ = gräs(ludde_kw=None, korg_bulle=False, bulle_ute=dict(mood="ledsen", blick=(0, 4)))
tx, ty = ute_punkt(640, 470)
m, d = ritmask(c)
d.ellipse((tx - 5, ty - 2, tx + 5, ty + 11), fill=255)
d.polygon([(tx - 4, ty + 2), (tx, ty - 9), (tx + 4, ty + 2)], fill=255)
kritfyll(c, m, (120, 190, 235), vick=0.1, oskarp=0.6)
frames["13d"] = närbild_ute(c)
# 13e Vem kan hjälpa? (Vem kan hjälpa?): närbild, Bulle tittar ut mot tittaren med tassarna uppåt och en O-mun
c, _ = gräs(ludde_kw=None, korg_bulle=False, bulle_ute=dict(mood="forvanad", peka_r=(1500, -300), peka_l=(-480, -300)))
frames["13e"] = närbild_ute(c, zoom=0.85)
# 13f Takten, tyst på sista slaget (barnet ropar "Igelkotten!"): utsnitt vid backens fot. Bullen rullar sakta mot högerkanten,
# och Igges nos tittar fram bakom blommorna (ledtråden). Inget annat rör sig.
c, _ = gräs(ludde_kw=dict(mood="nyfiken", blick=(10, 6)), korg_bulle=False, bulle_ute=dict(mood="nyfiken", blick=(10, 6)))
place(c, BULLEN, 1240, FOT_Y + 2, 46, rot=-8)
igge_tittar(c)
frames["13f"] = crop_zoom(c, 1010, 560, W / 1.4)

# Vers 3: Igge rullar in, rullar ihop sig, bullen stannar mot honom; tack, och Ludde bryter bullen i tre bitar.
# 14a Igelkotten! (Igelkotten!): Igge rullar in nerifrån backen som en boll, från högerkanten (lutar och skuttar, vänds aldrig)
c, _ = gräs(bulle_ute=dict(mood="skrattar", blick=(10, 6)), ludde_kw=dict(mood="skrattar", blick=(10, 6)), korg_bulle=False)
place(c, BULLEN, 1200, FOT_Y + 2, 50, rot=-8)
place(c, IGGE_BOLL, 1320, IGGE_FOT, 130, rot=8)
arrow(c, [(W - 10, IGGE_FOT - 150), (1250, IGGE_FOT - 150)])
frames["14a"] = crop_zoom(c, 1010, 560, W / 1.4)
# 14b Rullar ihop sig – stopp!: Igge ligger som en taggig boll, bullen rullar emot och stannar
c, _ = gräs(bulle_ute=dict(mood="forvanad", blick=(10, 6)), ludde_kw=dict(mood="forvanad", blick=(10, 6)), korg_bulle=False, igge_boll=True)
place(c, BULLEN, IGGE_X - 115, IGGE_FOT - 4, 64)
arrow(c, [(IGGE_X - 230, IGGE_FOT - 90), (IGGE_X - 150, IGGE_FOT - 90)])
frames["14b"] = crop_zoom(c, 1010, 560, W / 1.4)
# 14c Bullen stannar – tack, tack, tack!: Igge har rullat upp sig och knuffat upp bullen till filten med nosen. Bulle har
# klivit ur lastbilen och står på filten; han vinkar tack, en gång per "tack", och Ludde nickar.
c, _ = ängsbild(bil=False, bulle_kw=None, ludde_kw=dict(mood="skrattar", blick=(6, 0)), korg_bulle=False,
                bulle_ute=dict(mood="skrattar", blick=(10, 2), peka_r=VINKA))
sätt(c, igge("skrattar", blick=(-6, 0)), 940, PLATÅ + 26, IGGE_K)
place(c, BULLEN, 870, PLATÅ + 30, 74)
for x in (470, 735):
    arrow(c, [(x, 300), (x, 340)])
frames["14c"] = crop_zoom(c, 700, 470, W / 1.4)
# 14d En bit var – till alla tre!: Ludde har brutit bullen i tre bitar; Bulle och Ludde håller upp sin bit, Igges ligger framför honom
c, _ = ängsbild(bil=False, bulle_kw=None, ludde_kw=dict(mood="skrattar", peka_l=(-480, -700), håll={"l": (BITAR[1], 120)}), korg_bulle=False,
                bulle_ute=dict(mood="skrattar", peka_r=(1500, -700), håll={"r": (BITAR[0], 120)}))
sätt(c, igge("skrattar"), 940, PLATÅ + 26, IGGE_K)
place(c, BITAR[2], 880, PLATÅ + 32, 52)
frames["14d"] = crop_zoom(c, 700, 470, W / 1.4)
# 14e Mums, mums, mums: alla tre äter sin bit, en tugga per "mums"
c, _ = ängsbild(bil=False, bulle_kw=None, ludde_kw=dict(mood="slickar", peka_l=(-200, 400), håll={"l": (BITAR[1], 100)}), korg_bulle=False,
                bulle_ute=dict(mood="slickar", peka_r=(1200, 400), håll={"r": (BITAR[0], 100)}))
sätt(c, igge("slickar"), 940, PLATÅ + 26, IGGE_K)
place(c, BITAR[2], 885, PLATÅ + 32, 40)
frames["14e"] = crop_zoom(c, 700, 470, W / 1.4)
# 14f – hurra!: armarna upp, bullen är slut, händerna är fria till dansen
c, _ = ängsbild(bil=False, bulle_kw=None, ludde_kw=dict(mood="skrattar", arm_r=150, arm_l=-150), korg_bulle=False,
                bulle_ute=dict(mood="skrattar", peka_r=UPP_R, peka_l=UPP_L))
sätt(c, igge("skrattar"), 940, PLATÅ + 26 - 30, IGGE_K)
arrow(c, [(860, PLATÅ + 10), (860, PLATÅ - 60)])
frames["14f"] = crop_zoom(c, 700, 470, W / 1.4)


# --- Danspausen (15a–15e) och sista refrängen i discot, omfärgat till mjukt lila med en brun kula ---------
SOLO_H, SOLO_FOT = 0.58 * H, 0.85 * H
KULA = (688, 78, 64)
IKON_BÅGE = [(288, 162), (488, 198), (888, 198), (1088, 162)]   # 006:s rad (IKON_BAGE i discot/index.html) utan mittplatsen
IKON_R = 54
GOLV_Y, GOLV_VP = 0.64 * H, (W / 2, -1.4 * H)
STOR = (W / 2, 0.56 * H, 2.6)   # klistermärket mitt i bild: läge och skala mot småbilden, som STOR i 006:s discot


def lila_discot():
    """006:s discoplåt (vägg, rutgolv i perspektiv och glitter: scener/lager/disco-prickar.png) omfärgad till mörk choklad
    (Sanna 2026-11-06: brunt disco). Förut lila, eftersom den ljusa lastbilen försvann mot ett mellanbrunt golv; nu är väggen och
    golvet mycket mörkare än lastbilen (#C9935A) och Bulle, och glittret är vitt. Namnet är kvar för anropen."""
    hsv = np.asarray(Image.open(ROT / "avsnitt/006-orange-baten/scener/lager/disco-prickar.png").convert("RGB").convert("HSV"),
                     dtype=np.float32).copy()
    färgad = hsv[..., 1] > 25                     # glittret (vitt) behålls
    hsv[..., 0] = np.where(färgad, 17, hsv[..., 0])    # chokladbrun (PIL:s nyans 0–255)
    hsv[..., 1] = np.where(färgad, np.clip(hsv[..., 1] * 0.8 + 95, 0, 255), hsv[..., 1])
    hsv[..., 2] = np.where(färgad, hsv[..., 2] * 0.36, hsv[..., 2])
    rgb = np.asarray(Image.merge("HSV", [Image.fromarray(hsv[..., i].astype(np.uint8)) for i in range(3)]).convert("RGB"),
                     dtype=np.float32)
    # vaxkorn (Sanna 2026-11-06: mer textur): fläckigt vax, långa sneda kritdrag och små ljusa papperskorn, inte på glittret
    h, w = färgad.shape
    rng = np.random.default_rng(11)
    def brus(bw, bh, sudd):
        n = Image.fromarray((rng.random((bh, bw)) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
        n = np.asarray(n.filter(ImageFilter.GaussianBlur(sudd)), dtype=np.float32)
        return (n - n.mean()) / (n.std() + 1e-6)
    fläck = brus(w // 60, h // 60, 18)
    drag = np.asarray(Image.fromarray((rng.random((h // 3, w // 45)) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
                      .rotate(-14, resample=Image.BICUBIC, expand=False), dtype=np.float32)
    drag = (drag - drag.mean()) / (drag.std() + 1e-6)
    korn = rng.random((h, w)) > 0.994
    f = 1 + 0.10 * fläck + 0.06 * drag
    rgb = np.where(färgad[..., None], rgb * f[..., None], rgb)
    rgb = np.where((färgad & korn)[..., None], rgb * 0.5 + np.array([235, 205, 170]) * 0.5, rgb)
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8)).resize((W, H))


def golvrutor(c):
    """Golvrutor som lyser upp mjukt (#FFE9C8, 0,45, oskarpa 5), var sjunde ruta som discoljus.js RUTOR vid en takts topp."""
    vx, vy = GOLV_VP
    rader = [GOLV_Y + (H + 60 - GOLV_Y) * ((1.55 ** i - 1) / (1.55 ** 5 - 1)) for i in range(6)]
    xs = [W / 2 + (i - 7.5) * 190 for i in range(16)]
    at = lambda xb, y: vx + (xb - vx) * (y - vy) / (H - vy)
    m, d = ritmask(c)
    for j in range(5):
        for i in range(15):
            if (i * 3 + j * 5 + 4) % 7 == 0:
                y0, y1 = rader[j], rader[j + 1]
                d.polygon([(at(xs[i], y0), y0), (at(xs[i + 1], y0), y0), (at(xs[i + 1], y1), y1), (at(xs[i], y1), y1)], fill=255)
    c.paste((255, 233, 200), mask=m.filter(ImageFilter.GaussianBlur(5)).point(lambda v: int(v * 0.45)))


DISCO_BILD = lila_discot()
golvrutor(DISCO_BILD)
KULA_MITT, KULA_R0 = (513, 583), 298
_kula = Image.open(A / "bakgrunder/danspaus/cut/discokula.png").convert("RGBA")
_h = np.asarray(_kula.convert("RGB").convert("HSV")).copy()
_h[..., 0] = np.where(_h[..., 1] > 40, 18, _h[..., 0])
_h[..., 2] = np.where(_h[..., 1] > 40, (_h[..., 2] * 0.72).astype(np.uint8), _h[..., 2])
DISCOKULA = Image.merge("HSV", [Image.fromarray(_h[..., i]) for i in range(3)]).convert("RGBA")
DISCOKULA.putalpha(_kula.getchannel("A"))


def stjärnregn(c, x, y, r, n=4):
    for i in range(n):
        v = math.radians(150 - i * 120 / max(1, n - 1))
        stjärna(c, x + r * math.cos(v), y - r * math.sin(v), 0.013 * W if i % 2 else 0.01 * W, sken=True)


def käglor(c):
    """Ljuskäglorna från kulan som i discoljus.js: fyra käglor (−58, −22, 22, 58 grader från lodrätt), 28 px breda vid kulan
    och 340 px 900 px ner, #FFF6DC från 0,55 till 0 nedåt, oskarpa 7, gruppen 0,9."""
    x, y, _ = KULA
    kägla = Image.new("L", (400, 900))
    ImageDraw.Draw(kägla).polygon([(186, 0), (214, 0), (370, 900), (30, 900)], fill=255)
    tona = Image.linear_gradient("L").rotate(180).resize((400, 900))   # 255 överst, 0 nederst
    kägla = ImageChops.multiply(kägla, tona.point(lambda v: int(v * 0.55 * 0.9 * 0.75)))   # lite svagare: väggen är ljusare än 006:s
    m = Image.new("L", (W, H))
    for v in (-58, -22, 22, 58):
        stor = Image.new("L", (1800, 1800))
        stor.paste(kägla, (700, 900))
        stor = stor.rotate(-v, resample=Image.BICUBIC, center=(900, 900))
        m = ImageChops.lighter(m, stor.crop((900 - x, 900 - y, 900 - x + W, 900 - y + H)))
    c.paste((255, 246, 220), mask=m.filter(ImageFilter.GaussianBlur(7)))


def ljusfläckar(c):
    """De mjuka färgade ljusfläckarna på väggen och golvet (discoljus.js FLACK och FARG vid tid 0), 0,35, oskarpa 24."""
    FARG = [(255, 240, 176), (255, 200, 212), (255, 224, 168), (214, 236, 255), (232, 216, 255), (217, 245, 207)]
    for i, (x, y, rx, ry, ax, ay, p, f) in enumerate([(330, 640, 150, 48, 260, 30, 13, 0), (900, 700, 170, 54, 300, 26, 16, 2.1),
            (640, 600, 130, 40, 380, 18, 11, 4.0), (250, 300, 70, 70, 160, 90, 14, 1.0), (1120, 260, 64, 64, 170, 100, 12, 3.2),
            (700, 200, 76, 76, 330, 40, 17, 5.1)]):
        cx, cy = x + ax * math.sin(f), y + ay * math.sin(2 * f + 1)
        m, d = ritmask(c)
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=255)
        c.paste(FARG[i], mask=m.filter(ImageFilter.GaussianBlur(24)).point(lambda v: int(v * 0.35)))


def ljusprickar(c):
    rnd = random.Random(5)
    m, d = ritmask(c)
    for _ in range(26):
        x, y, rr = rnd.uniform(30, W - 30), rnd.uniform(20, H * 0.8), rnd.uniform(4, 8)
        if abs(x - KULA[0]) > 90 or y > 170:
            d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=255)
    kritfyll(c, m, VIT, alpha=0.6, vick=0.2, oskarp=1)
    n = 0
    while n < 16:
        x, y = rnd.uniform(40, W - 40), rnd.uniform(40, H * 0.72)
        if math.dist((x, y), KULA[:2]) > 140 and all(math.dist((x, y), p) > 90 for p in IKON_BÅGE):
            stjärna(c, x, y, rnd.uniform(0.0075, 0.01) * W, sken=True)
            n += 1


def björnhuvud():
    """Bulle själv som klistermärke ("björnen"): bara huvudet med kepsen, utan egen vit kant (skivan är kanten)."""
    im = bulle("skrattar")
    return im.crop((200, 120, 824, 600))


# [bild, storlek] som SAKER i 006:s discot (båten 95); storleken är höjden i en skiva med radien 60
IKONER = [(KOTTE, 90), (björnhuvud(), 90), (BULLEN, 85), (lastbilen(med_bulle=False), 95)]


def skiva(c, i, x, y, skala=1.0, rot=0):
    """En småbild som i 006: en vit kritskiva (radie IKON_R × skala) med saken i, botten 0,45 under mitten, höjd 0,9."""
    r, (im, hs) = IKON_R * skala, IKONER[i]
    h = hs * r / 60
    m, d = ritmask(c)
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    kritfyll(c, m, (255, 255, 255), vick=0.3)
    place(c, im, x, y + h * 0.45, h * 0.9, rot=rot)


def ikoner(c, n, pop=(), gunga=()):
    """Sammanfattningen: de n första småbilderna i raden (kotten, björnen, bullen, lastbilen)."""
    r = IKON_R
    for i in range(n):
        x, y = IKON_BÅGE[i]
        skiva(c, i, x, y, rot=-14 if i in gunga else 0)
        if i in pop:
            streck(c, x, y, r=r + 8, n=7, start=-170, slut=-10, col=(255, 255, 255))
        if i in gunga:
            arrow(c, [(x - r - 22, y + 6), (x - r * 0.4, y + r + 16), (x + r * 0.4, y + r + 16), (x + r + 22, y + 6)])


def disco(n=0, pop=(), gunga=(), ljus=True):
    c = DISCO_BILD.copy()
    if ljus:
        ljusfläckar(c)
        käglor(c)
    ljusprickar(c)
    x, y, r = KULA
    bb, s = DISCOKULA.getbbox(), r / KULA_R0
    place(c, DISCOKULA, x - (KULA_MITT[0] - (bb[0] + bb[2]) / 2) * s, y + (bb[3] - KULA_MITT[1]) * s, (bb[3] - bb[1]) * s)
    stjärna(c, x - r * 0.4, y - r * 0.35, 9)
    stjärna(c, x + r * 0.45, y + r * 0.3, 7)
    if n:
        ikoner(c, n, pop, gunga)
    return c


# Rörelserna: Bulle och Ludde med peka_*, musen i sina vinklar. Statisternas enda rörelse: (rörelse, hopp, gung).
RÖR = {"upp": dict(peka_r=UPP_R, peka_l=UPP_L), "mage": dict(peka_r=MAGE, peka_l=MAGE), "stamp": dict(peka_r=(1300, 900), peka_l=(-280, 900)), "stå": {}}
EGEN = {"grodan-gurra": ("upp", True, 0), "lejonet-lage": ("klapp", False, 0)}
# Lage ersätter Mille i danspausen (Sanna 2026-11-06); i storyboarden står han stilla med klappstrecken, discot/ klappar på riktigt
LAGE = Image.open(A / "karaktarer" / "lejonet-lage" / "cut" / "lejonet-lage.png").convert("RGBA")


def dansbild(namn, rörelse=None, mood="skrattar"):
    hopp, gung = False, 0
    if namn in EGEN:
        rörelse, hopp, gung = EGEN[namn]
    rörelse = rörelse or "stå"
    if namn == "lejonet-lage":
        return LAGE, rörelse, hopp, gung
    if namn == "igelkotten-igge" and rörelse == "rulla":
        return IGGE_BOLL, rörelse, False, 10
    return figur(namn, mood if rörelse != "stå" else "glad", **RÖR.get(rörelse, {})), rörelse, hopp, gung


HOPP = 40  # så högt en figur hoppar i dansen


def dansare(c, namn, rörelse=None, x=None, h=SOLO_H, fot=SOLO_FOT, hopp=None, lyft=0, fokus=True, lås=False):
    """lås: h och x gäller figuren som står (armarna nere), så att kroppen inte flyttar sig när armarna går upp."""
    im, rörelse, egen_hopp, gung = dansbild(namn, rörelse)
    hopp = egen_hopp if hopp is None else hopp
    x = W / 2 if x is None else x
    bb = im.getbbox()
    if lås:
        st = dansbild(namn, "stå")[0].getbbox()
        k = h / (st[3] - st[1])
        x, h = x + ((bb[0] + bb[2]) - (st[0] + st[2])) / 2 * k, (bb[3] - bb[1]) * k
    skugga(c, x, fot - 4, (bb[2] - bb[0]) * h / (bb[3] - bb[1]) * 0.7, hopp or lyft)
    y = fot - (HOPP if hopp else 0) - lyft
    b = place(c, im, x, y, h, rot=gung)
    s, x0, y0 = b
    if hopp:
        arrow(c, [(x - h * 0.55, fot - 20), (x - h * 0.55, fot - 120)])
    if rörelse == "rulla":   # bollen rullar en bit åt sidan och tillbaka och gungar (vänds aldrig runt)
        arrow(c, [(x - h * 0.7, fot + 14), (x + h * 0.7, fot + 14)])
        arrow(c, båge(x, y - h * 0.5, h * 0.62, 120, 60, steg=10))
    if rörelse == "klapp":
        streck(c, x, y0 + 60 * s, r=h * 0.12, n=3, start=-130, slut=-50)
    if fokus:
        stjärnregn(c, x, y - h * 0.55, h * 0.62)
    return b


V_ORDNING = ["grodan-gurra", "lammet-ludde", "bjornen-bulle", "igelkotten-igge", "lejonet-lage"]
# Ett svagt V: Bulle störst och ett steg fram (lägst) i mitten, Ludde och Igge bredvid, Gurra och Lage ytterst.
V_H = {n: h * 0.91 for n, h in {"bjornen-bulle": 0.44, "lammet-ludde": 0.36, "igelkotten-igge": 0.27, "grodan-gurra": 0.32,
                               "lejonet-lage": 0.33}.items()}   # 9 % mindre: stampet med armarna ut ryms i bild (16b)
V_FOT = {"bjornen-bulle": 0.905 * H, "lammet-ludde": 0.86 * H, "igelkotten-igge": 0.86 * H, "grodan-gurra": 0.835 * H, "lejonet-lage": 0.835 * H}


def _v_rad():
    bred = {n: (lambda bb: (bb[2] - bb[0]) / (bb[3] - bb[1]))(dansbild(n, "stå")[0].getbbox()) * V_H[n] * H for n in V_ORDNING}
    lucka = 30
    x, rad = (W - sum(bred.values()) - 4 * lucka) / 2, {}
    for n in V_ORDNING:
        rad[n] = (x + bred[n] / 2, V_H[n] * H, V_FOT[n])
        x += bred[n] + lucka
    return rad


RAD = _v_rad()


def alla(c, rörelse, hopp=False):
    """Alla fem i V:et; Bulle och Ludde gör rörelsen, Igge står, statisterna gör sin egen. Stjärnregnet runt Bulle."""
    for namn in sorted(V_ORDNING, key=V_H.get):
        egen = namn in EGEN
        x, h, fot = RAD[namn]
        r = None if egen else ("stå" if namn == "igelkotten-igge" else rörelse)
        dansare(c, namn, r, x=x, h=h, fot=fot, hopp=None if egen else hopp and namn == "bjornen-bulle",
                fokus=namn == "bjornen-bulle", lås=True)


def rgb(c):
    return c.convert("RGB")


c = disco(); dansare(c, "bjornen-bulle", "upp"); frames["15a"] = rgb(c)
DUO_H = 0.46 * H
c = disco()   # Ludde hoppar in från höger och Igge trippar in från vänster, alla tre dansar
dansare(c, "igelkotten-igge", "stå", x=W * 0.2, h=0.3 * H, fokus=False)
dansare(c, "bjornen-bulle", "upp", x=W * 0.47, h=DUO_H, fokus=False)
dansare(c, "lammet-ludde", "upp", x=W * 0.76, h=0.4 * H, lyft=110, fokus=False)
arrow(c, [(W - 30, SOLO_FOT - 0.4 * H - 40), (W * 0.76 + 170, SOLO_FOT - 0.4 * H - 190), (W * 0.76 + 60, SOLO_FOT - 0.4 * H - 150)])
arrow(c, [(20, SOLO_FOT + 20), (W * 0.2 - 110, SOLO_FOT + 20)])
frames.pop("15b", None)  # tagning 4: ingen andra omgång ("Igen!") i danspausen
c = disco(); dansare(c, "grodan-gurra"); frames["15c"] = rgb(c)                              # Hoppa, hoppa!
c = disco(); dansare(c, "lejonet-lage"); frames["15d"] = rgb(c)                              # Klappa, klappa!
for a, b in (("15e", "15a"), ("15f", "15c"), ("15g", "15d"), ("15h", "15a"), ("15i", "15c"), ("15j", "15d")): frames[a] = frames[b]   # tagning 8: tre varv   # tagning 6: andra varvet
   # "Igen!": samma solon en gång till                               # Klappa, klappa!


# 16a–16d Sista refrängen (sang.md v5). 16a: saken på ordet stor mitt i bild som ett klistermärke (som 005:s disco, inga
# figurer), en per ord, som flyger upp i raden överst runt kulan. 16b alla fem stampar, 16c Bulle i lastbilen skumpar per "brum",
# och lastbilen poppar upp i raden. 16d Bulle kör iväg i lastbilen.
def klistermärke(c, i):
    """Saken på sitt ord, stor mitt i bild på en vit skiva (STOR, som 006), med stjärnregn; pilen visar vart den flyger."""
    x, y, k = STOR
    skiva(c, i, x, y, skala=k)
    stjärnregn(c, x, y, IKON_R * k + 50)
    arrow(c, [(x + IKON_R * k * 0.7, y - IKON_R * k * 0.8), (IKON_BÅGE[i][0] - 40, IKON_BÅGE[i][1] + IKON_R + 20)])


c = disco(2, [1]); klistermärke(c, 2); frames["16a"] = rgb(c)                         # Kotten, björnen, bullen – brun!
c = disco(3); alla(c, "stamp", hopp=True); frames["16b"] = rgb(c)                      # Brun, brun, brun!
SLUT_X, SLUT_Y, SLUT_H = W / 2, H - 6, 0.7 * H
c = disco(4, [3])                                                                      # Lastbil, lastbil – (brum, brum!)
b = place(c, lastbilen(vit=True, mood="skrattar"), SLUT_X - 120, SLUT_Y - 40, SLUT_H)
avgaspuffar(c, b)                                          # brum, brum
for dx in (0, 40):
    arrow(c, [(SLUT_X + 330 + dx, SLUT_Y - 60), (SLUT_X + 330 + dx, SLUT_Y - 150)])
frames["16c"] = rgb(c)

# 16d Hej då: kvar i discot. Bulle i lastbilen rullar från vänster tredjedel till mitten och vinkar; där tar slutet (17) vid.
c = disco(4)
place(c, lastbilen(vit=True, mood="blinkar", peka_r=VINKA), 0.36 * W, SLUT_Y, SLUT_H)
arrow(c, [(0.36 * W + 330, 0.62 * H), (SLUT_X + 360, 0.62 * H)])
frames["16d"] = rgb(c)

# 17 Slutet, som 005 och 006: kvar i discot, Bulle i lastbilen vinkar och kritirisen sluter sig runt hans ansikte.
c = disco(4, ljus=False)
b = place(c, lastbilen(vit=True, mood="glad", peka_r=VINKA), SLUT_X, SLUT_Y, SLUT_H)
c = rgb(c)
ix, iy = bulle_punkt(b, 511, 400)
m, d = ritmask(c)
ring = [(ix + 218 * (1 + 0.07 * math.sin(9 * a)) * math.cos(a), iy + 218 * (1 + 0.07 * math.sin(9 * a)) * math.sin(a))
        for a in np.linspace(0, 2 * math.pi, 145)]
d.rectangle((0, 0, W, H), fill=255)
d.polygon(ring, fill=0)
c.paste((0, 0, 0), mask=m)
ImageDraw.Draw(c).line(ring + ring[:1], fill=(255, 248, 224), width=14, joint="curve")
frames["17"] = c

out = HÄR / "frames"
out.mkdir(exist_ok=True)
for f in out.glob("*.jpg"):
    f.unlink()
for k, im in frames.items():
    papperskorn(im).resize((960, 536), Image.LANCZOS).save(out / f"{k}.jpg", quality=86)

# --- Sidan ---------------------------------------------------------------------------------------------------
REFRÄNG_TEXT = [   # refrang-plan.md, Kolasåsresan (tagning 3, 2026-11-05); bilderna är stillbilder ur refrang.js
    ("a", "(stamp) · (pop)", "”Brun, brun! (Brun, brun!)”: vägen, halvbild, lastbilen stor i mitten. Björnstampet: två tunga stamp, ekot två till, lastbilen skumpar och ett brunt tassavtryck poppar upp på vägen per ”brun”, fyra i rad.", "2 dansbild (vägen)"),
    ("b", "(mums, mums) · (slurp)", "”Åh, vad gott! (Mums, mums!)”: samma bild, Bulle slickar sig om munnen, en vit puff och ett skutt per ”mums”. En gyllene kolatunga rinner in över vägen från höger kant.", "2 dansbild (vägen)"),
    ("c", "(plask!) · (plask, plask)", "”Plask i kolasåsen – (plask, plask!)”: klipp till kolasåshavet, helbild. Lastbilen plumsar ner ovanifrån vänster: PLASK, en rund krona av kola med vit kant. Ekot: två små plask, och lastbilen flyter med hjulen under ett främre våglager.", "4 helbild (havet)"),
    ("d", "(boing, boing)", "”Hoppa, hoppa – (jiihaa!)”: två lugna hopp på vågorna, och två små koladroppar hoppar med i bågar som delfiner. På ”jiihaa!” vinkar Bulle högt. Kotten kommer flytande från höger, sittande i en kanelbulle som badring.", "4 helbild (havet)"),
    ("e", "(plask, plask)", "”Gunga i såsen – (gung, gung!)”: Bulle sträcker upp armarna, lastbilen gungar stort hit … och dit i kolasåsen, sjunker ner lite på varje lutning, och på varje ”gung” stänker ett kolaplask upp på den sidan.", "4 helbild, inåkning"),
    ("f", "(slurp) · (slick, slick)", "”Kola på nosen – (slick, slick!)”: närbild, nallen hel till vänster. En kolaklick skvätter upp ur havet och landar på Bulles nos, han slickar två gånger.", "3 närbild Bulle"),
    ("g", "(pop, pop, pop) · (glitter)", "”Brun är den godaste färgen! (Mmm!)”: halvnära. Godiset dyker upp i kolan runt lastbilen, ett per ord: en stor chokladruta flyter upp som flotte, en kolabit guppar upp som boj, och kotten skuttar i sin kanelbullsring. På ”Mmm!” guppar allt i takt, glimtar och små bruna hjärtan stiger, och Bulle slickar sig om munnen.", "halvnära (havet)"),
    ("h", "(tut-tut) · (skrrrrt)", "”Tut, tut! (Tut, tut!)”: närbild på ratten, en vit ring per tut. ”Vad är brunt?”: kolasåsen väller ner och rinner av, tillbaka på vägen. ”Titta ut!”: närbild, tassen som skärm över ögonen, Bulle tittar åt vänster och sedan åt höger.", "3 närbild ratten → närbild Bulle"),
]


def refräng(n):
    return [(n + k, 1, "Refräng", ljud, vad, kamera) for k, ljud, vad, kamera in REFRÄNG_TEXT]


A_ = "A · Vägen"
B = "B · Ängen"
D_ = "Danspaus · discot"
# (id, längd i takter, scen, repliker och ljud, vad som händer, kamera). En takt = 2,55 s vid 94 bpm. 01 är introt (11 s).
SHOTS = [
    ("01", INTRO / TAKT, "Intro", "♪ Jingel: Rita, rita, ett, två, tre – lilla kritan! Kom och se! · (titeln syns, ingen röst)", "Samma intro som 003–006 (”Kort i himlen”) med nytt nummer och ny titel: Avsnitt 7 · Bruna sången, titeln i brunt. Renderat i ../intro/ (intro-med-jingel.mp4, 11,3 s, kapas till 11 s i klippet som 006).", "fast"),
    ("02", 2.5, "Kritan ritar", "(skrrrrt)", "Introt (0:00–0:17) är instrumentalt i tagning 6, ingen sång: den bruna kritan ritar en liten brun lastbil från sidan i tystnad över ukulelen: flaket bak, hytten med tak och ett stort fönster och en kort motorhuv fram.", "1 papper"),
    ("02a", 2.5, "Kritan ritar", "(skrrt, skrrt)", "Instrumentalt: ett runt hjul under flaket, och ett hjul till.", "1 papper"),
    ("02b", 0.4, "Kritan ritar", "(skrrt)", "Instrumentalt: kritan ritar en liten grön flagga på en pinne bak, och bilden håller teckningen ett slag.", "1 papper"),
    ("02c", 2, "Kritan ritar", "(tut-tut)", "Instrumentalt: lastbilen skumpar till och kritan lyfter ut. Sist åker kameran in i teckningen, dit den riktiga lastbilen står i 03.", "1 papper"),
    # 03–04 ryms i 3,3 s (sångtid 15,6–18,9): tagningen har inget mellanspel mellan "nu kör vi!" och vers 1
    ("03", 0.5, A_, "(swoosh)", "”Tut-tut”: zoom in i den ritade lastbilen, den blir Bulles lastbil på vägen. Bulle sitter redan i den med sin gröna keps.", "zoom in"),
    ("03a", 0.5, A_, "BULLE: Hej hej!", "Bulle vinkar till tittaren, en vinkning.", "3 närbild Bulle"),
    ("03b", 0.3, A_, "", "”nu kör vi!”: han tar ratten igen och tittar framåt.", "3 närbild Bulle"),
    ("04", 0.3, A_, "(brum, brum)", "Lastbilen rullar i gång: vägen glider, hjulen rullar, björkar, granar och buskar glider förbi långt bak (parallax). Direkt in i vers 1.", "2 körscen"),
    ("041", 1, A_, "(brum, brum)", "”Björnen kör sin bruna lastbil – (brum, brum!)”: körscenen, Bulle med tassarna på ratten gungar i takten, lastbilen skumpar till en gång per brum.", "2 körscen"),
    ("042", 3.7, A_, "(pop) · (mmm)", "”Björnen tycker brunt är gott! (Mmm!)”: Bulle klappar magen och slickar sig om munnen. ”Choklad är brun – (mmm, mmm!)”: en chokladruta poppar upp som klistermärke med vit kant i luften framför lastbilen. ”Kola är brun – (mmm, mmm!)”: en kolabit poppar upp bredvid. Bulle slickar sig om munnen på varje mmm. Klistermärkena ligger kvar en stund och tonar ut.", "2 körscen"),
    ("04a", 2.4, A_, "", "”Björnen letar efter brunt”: Bulle spanar och pekar åt vänster, sedan åt höger, så att barnet kan peka med. ”leta med – jag och du!”: han tittar på oss och nickar i takt.", "2 körscen"),
    ("04b", 8.4, A_, "(harpa) · (pop) · (plask)", "Brygga 1 (Suno v7b): ”Björnen blundar … tänk om, tänk om …”: Bulle blundar och ler, tre prickar stiger ur hans huvud och tankemolnet poppar upp. ”Ett brunt land! (Ett brunt land!)”: kolalandet (kolakullar med kolasås och chokladträd) poppar in i molnet och guppar. ”Ett hav av kolasås! (Kolasås!)”: ett kolaplask stänker upp i molnet. ”Nu kör vi dit – brum, brum!”: Bulle öppnar ögonen, tar ratten, två puffar. Harpluften utan sång: molnet glittrar och svävar upp ur bild, och kolasåsen väller in till refrängen.", "2 körscen"),
    *refräng("05"),
    ("06", 1, A_, "(dunk)", "”Vad är brunt? (Vad är brunt?)”: lastbilen stannar vid en gran vid vägkanten (högra tredjedelen). En brun kotte lossnar ur grenarna, trillar ner och studsar på vägen. Bulle blir förvånad och tittar dit.", "2 körscen"),
    ("06a", 1.8, A_, "(glimt)", "”Titta, en gran! Vad trillar där?”: kameran åker in mot kotten på vägen. ”Kotten är brun –”: kotten poppar upp stor mitt i bild som ett klistermärke med vit kant och en glimt (som sakerna i 005), och glider sedan tillbaka till vägen.", "2 körscen, inåkning"),
    ("06b", 1, A_, "(dunk, dunk)", "”dunk, dunk!”: närbild, kotten studsar två gånger på Bulles gröna keps, en gång per dunk. Kepsen trycks ihop lite, Bulle tittar upp med stora ögon och skrattar. Barnet kan knacka sig på huvudet.", "3 närbild Bulle"),
    ("08", 1.2, A_, "", "”Vad mer är brunt? (Vad är brunt?) Kan du se?”: frågan till tittaren. Bulle tittar ut mot tittaren med huvudet på sned och tassarna uppåt, frågande.", "3 närbild Bulle"),
    ("08a", 0.4, A_, "", "”Kan du se?”: ingen paus i tagningen (”Titta närmare” kommer direkt). Ledtråd: Bulle vänder huvudet mot flaket och kameran börjar åka mot nallen.", "3 närbild Bulle, inåkning"),
    ("08b", 1.6, A_, "(pip)", "”Titta närmare – nallen är brun!”: kameran åker in mot nallen på flaket, den guppar två gånger på ”nallen är brun”.", "2 halvbild flaket"),
    ("08c", 1, A_, "(brum, brum)", "”Och björnen med – brum, brum!”: kameran glider tillbaka till Bulle, som klappar sig på magen och brummar nöjt två gånger. Direkt in i refräng 2 (inget mellanspel i tagning 3).", "2 körscen, halvbild"),
    ("08d", 5.7, A_, "(harpa) · (plask)", "Brygga 2: ”Björnen blundar … tänk om, tänk om …”: samma moln igen, med kolalandet i. ”Ett hav av kolasås!”: kolaplasket stänker upp i molnet. ”Nu kör vi dit – brum, brum!”: ögonen upp, två puffar, molnet svävar bort under harpluften och kolasåsen väller in.", "2 körscen"),
    *refräng("09"),
    ("10", 0.25, "Kritsvep", "(skrrrrt)", "”Titta ut!”: kritsvep i ängens himmelsblå, från vänster till höger.", "kritsvep"),
    ("11", 0.4, B, "(brum, brum)", "”Vad är brunt?”: ängen. Lastbilen rullar in från vänster mot filten, där Ludde sitter med korgen full av kanelbullar. Fia fladdrar förbi högt över ängen.", "4 helbild"),
    ("11a", 1, B, "(boing)", "2:01 avsnittstid, ”(Vad är brunt?)”: Bulle kliver ur lastbilen. Kameran zoomar in på honom: ett kort, lugnt hopp ner bredvid bilen (ingen snurr). Från nu står och går han i gräset med ben, ända till delningen i 14.", "3 närbild Bulle, inzoomning"),
    ("11b", 1, B, "LUDDE: Hej!", "”Titta i korgen! (I korgen!)”: Bulle står vid filten och pekar på korgen, Ludde håller fram den (bara bild, ingen röst).", "4 tvåbild"),
    ("11d", 0.7, B, "BULLE: Tack! (pling)", "”Bullen är brun –”: Bulle har fått en kanelbulle och håller upp den (pling).", "4 tvåbild"),
    ("11e", 0.8, B, "", "”mums, mums!”: närbild, Bulle lyfter bullen mot munnen, en gång per ”mums”, men hinner inte ta en tugga.", "3 närbild Bulle"),
    ("13a", 2, B, "(åh nej)", "Mellanspelet (instrumentalt, tagning 6), musiken blir tunn: bullen glider ur Bulles tass och studsar en gång i gräset vid filtens kant. Bulle och Ludde blir förvånade.", "4 tvåbild"),
    ("13b", 1, B, "(rull, rull)", "Instrumentalt: helbild, bullen rullar nerför backen åt höger, ett skutt per takt (spökringarna visar var den var). Den lutar och skuttar men snurrar inte runt.", "4 helbild"),
    ("13c", 1, B, "", "Instrumentalt: bullen rullar vidare åt höger på den platta marken, mindre och mindre, nästan ut ur bild. Bulle tittar efter den.", "4 helbild"),
    ("13d", 1.5, B, "(snyft)", "Instrumentalt: närbild, Bulle står i gräset, ledsen med en liten tår.", "3 närbild Bulle"),
    ("13e", 2, B, "", "Instrumentalt: tvåbild med Ludde, Bulle tittar ut mot tittaren med tassarna uppåt och en liten O-mun, frågande (vem kan hjälpa?), inte ledsen längre.", "4 tvåbild (filten)"),
    ("13f", 1, B, "", "Instrumentalt, sista oroliga takten: utsnitt nere vid backens fot. Bullen rullar sakta mot högerkanten, och Igges nos och taggar tittar fram bakom blommorna.", "4 helbild (närmare foten)"),
    ("14a", 1, B, "", "Hela bandet tillbaka, glatt: Igge rullar in från höger som en taggig boll, mot bullen (lutar och skuttar, vänds aldrig).", "4 helbild (närmare foten)"),
    ("14b", 1, B, "(stopp!)", "Instrumentalt: Igge ligger hoprullad, bullen rullar emot honom och stannar. Igge rullar upp sig och knuffar upp bullen till filten med nosen.", "4 helbild (närmare foten)"),
    ("14c", 1, B, "BULLE: Tack!", "Instrumentalt (tagning 8): Bulle står på filten med bullen och vinkar tack, en gång per tack.", "4 tvåbild (filten)"),
    ("14d", 1, B, "", "Instrumentalt: Ludde bryter bullen i tre bitar. Bulle och Ludde håller upp sin bit, och Igges bit ligger framför honom på filten (han har inga armar).", "4 tvåbild (filten)"),
    ("14e", 0.5, B, "", "Instrumentalt: alla tre äter sin bit, två tuggor.", "4 tvåbild (filten)"),
    ("14f", 0.5, B, "", "Sista mumset: alla sträcker armarna upp och Igge hoppar. Bullen är slut, så händerna är fria till dansen.", "4 tvåbild (filten)"),
    ("15a", 0.45, D_, "(boing!)", "”Nu dansar vi! (Nu dansar vi!) Stampa, stampa!”: klipp till discot. Bulle i mitten, Igge och Ludde hoppar in, och alla stampar.", "6 dansbild (discot)"),
    ("15c", 1, D_, "", "”Hoppa, hoppa!”: solobild, grodan Gurra ensam och stor mitt i bild, hoppar.", "6 dansbild (discot)"),
    ("15d", 1, D_, "(klapp, klapp)", "”Klappa, klappa!”: solobild, musen Mille klappar: tassarna möts mitt på magen på slaget.", "6 dansbild (discot)"),
    ("15e", 1, D_, "(stamp)", "Andra varvet, ”Stampa, stampa!”: alla tre i trebilden stampar igen.", "6 dansbild (discot)"),
    ("15f", 1, D_, "", "”Hoppa, hoppa!”: solobild, grodan Gurra hoppar igen.", "6 dansbild (discot)"),
    ("15g", 1, D_, "(klapp, klapp)", "”Klappa, klappa!”: solobild, musen Mille klappar igen.", "6 dansbild (discot)"),
    ("15h", 1, D_, "(stamp)", "Tredje varvet, ”Stampa, stampa!”: trebilden stampar en sista gång.", "6 dansbild (discot)"),
    ("15i", 1, D_, "", "”Hoppa, hoppa!”: solobild, Gurra hoppar en sista gång.", "6 dansbild (discot)"),
    ("15j", 1, D_, "(klapp, klapp)", "”Klappa, klappa!”: solobild, Mille klappar en sista gång.", "6 dansbild (discot)"),
    ("16a", 0.6, D_, "(pop, pop, pop)", "Sista refrängen. ”Kotten, nallen, bullen –”: saken på ordet slås upp stor mitt i bild på en vit kritskiva (som 005:s och 006:s disco, inga figurer), en per ord, och flyger upp i raden av små vita skivor överst runt kulan, från vänster: kotten, nallen, bullen, lastbilen.", "6 dansbild (discot)"),
    ("16b", 3.3, D_, "(stamp) · (mmm)", "”Bruna! Bruna! Bruna! Bruna –”: alla fem i ett svagt V gör björnstampet, ett stamp per bruna. ”den godaste färgen! (Mmm!)”: alla klappar magen och slickar sig om munnen.", "6 dansbild (discot)"),
    ("16c", 2, D_, "(wiii!) · (pop)", "”Rutscha ner i kolasås – (wiii!)”: Bulle sitter i lastbilen, stor mitt i bild, och den skumpar. Lastbilen poppar upp som fjärde och sista småbild i raden.", "6 dansbild (discot)"),
    ("16d", 5, D_, "(tut, tut)", "”Hej då, hej då – tut, tut!” och ett sista ”Hej då”: kvar i discot, raden av småbilder ligger kvar överst. Bulle i lastbilen rullar in till mitten och vinkar, tutar på varje tut.", "6 dansbild (discot)"),
    ("17", (SÅNG_SLUT - SÅNGTID["17"]) / TAKT, "Avslutning", "(swoosh)", "Outrot är instrumentalt i tagning 3 (ca 3:10–3:21.7): Bulle i lastbilen vinkar, och kritirisen sluter sig runt hans ansikte, håller, stängs, en stjärna glimtar, svart.", "kritiris"),
]
assert sorted(s[0] for s in SHOTS) == sorted(frames), (set(s[0] for s in SHOTS) ^ set(frames))

FÄRG = {"Intro": "#c9bfae", "Kritan ritar": "#c9bfae", A_: "#A6D86B", "Refräng": "#D49A4A", "Kritsvep": "#5EBDE3",
        B: "#96CD64", D_: "#F2E4D0", "Avslutning": "#c9bfae"}


def mmss(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"


def tider():
    """Avsnittstid (start, slut, mätt) för varje bild: SÅNGTID där den finns, annars föregående start + takter."""
    ut, t, extra = [], 0.0, 0.0
    for sid, takter, *_ in SHOTS:
        extra += INSATT.get(sid, 0)
        mätt = sid in SÅNGTID
        if mätt:
            t = INTRO + extra + SÅNGTID[sid]
        ut.append([t, t + takter * TAKT, mätt])
        t += takter * TAKT
    for a, b in zip(ut, ut[1:]):
        a[1] = b[0]
    return ut


TID = {s[0]: (f"{'' if m else '≈'}{mmss(a)}–{mmss(b)}") for s, (a, b, m) in zip(SHOTS, tider())}
TID["01"] = "0:00.0–0:11.0"
SLUT = tider()[-1][1]

REF = lambda n: [n + b for b in "abcdefghh"]   # nio rader: h är både "Tut, tut" och "Vad är brunt? Titta ut!"
KARTA = {
    "Intro – kritan ritar": ["02", "02a", "02b", "02c", "02c"],
    "Vers 1": ["041", "042", "042", "042", "04a", "04a"],
    "Refräng": REF("05"),
    "Brun sak 1 – kotten": ["06", "06a", "06a", "06b"],
    "Frågan till tittaren": ["08", "08", "08a", "08b", "08c"],
    "Refräng #2": REF("09"),
    "Brun sak 3 – kanelbullen (ängen)": [["11", "11a"], "11b", "11d", "11e", []],   # luckraden finns inte i tagning 2
    "Vers 2 – problemet": ["13a", "13b", "13c", "13d", "13e", "13f"],
    "Vers 3 – lösningen": ["14a", "14b", "14c", "14d", ["14e", "14f"]],
    "Danspaus": ["15a", "15c", "15d", "15e", "15f", "15g", "15h", "15i"],
    "Sista refrängen – sammanfattning": [["16a", "16b"], "16b", "16c", "16c", "16d"],
}

IDS = [s[0] for s in SHOTS]
SÅNG = {i: [] for i in IDS}


def läs_sång():
    avsnitt, namn = {}, None
    for rad in (HÄR.parent / "sang.md").read_text(encoding="utf-8").splitlines():
        rad = rad.strip()
        if rad.startswith("---"):
            break
        if rad.startswith("## "):
            namn = rad[3:].strip()
            if namn in avsnitt:
                namn += " #2"
            avsnitt[namn] = []
        elif namn and rad and not rad.startswith(("**", "-", "|")) and not (rad.startswith("*") and not rad.startswith("*(")):
            avsnitt[namn].append(rad)
    for namn, rader in list(avsnitt.items()):
        if not rader and namn.endswith(" #2"):
            avsnitt[namn] = avsnitt[namn[:-3]]
    return avsnitt


for namn, rader in läs_sång().items():
    if namn.startswith("Refrängdansen"):
        continue
    if namn not in KARTA:
        if rader:
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
        ut.append(f'<div class="sh">♪ {t}</div>' if typ == "rubrik" else f'<div class="sung">{t}</div>' if typ == "sjungs" else f'<div class="pause">{t}</div>')
    return f'<div class="song">{"".join(ut)}</div>' if ut else ""


def repliker(rad):
    return " · ".join(d for d in rad.split(" · ") if d and not d.startswith("♪"))


rows, scen = [], None
for sid, _, sc, rad, vad, kamera in SHOTS:
    if sc != scen:
        if scen:
            rows.append("</div>")
        rows.append(f'<h3><span class="dot" style="background:{FÄRG[sc]}"></span>{html.escape(sc)}</h3><div class="frames">')
        scen = sc
    rows.append(
        f'<figure class="frame"><img src="frames/{sid}.jpg" alt="{html.escape(vad)}" width="960" height="536" loading="lazy">'
        f'<figcaption><div class="t">{sid} · {TID[sid]}</div>'
        + (f'<p class="line">{html.escape(repliker(rad))}</p>' if repliker(rad) else "")
        + sång_html(sid) + f'<p>{html.escape(vad)}</p><span class="tag">{html.escape(kamera)}</span></figcaption></figure>')
rows.append("</div>")

tl = []
for (sid, _, sc, *_), (a, b, _) in zip(SHOTS, tider()):
    tl.append(f'<div style="left:{a / SLUT * 100:.2f}%;width:{(b - a) / SLUT * 100:.2f}%;background:{FÄRG[sc]}" title="{sid} {TID[sid]}">{sid}</div>')

ph_ = ("<li><b>Platshållare</b> (platta former tills bilderna finns): "
       + ", ".join(f"<code>{html.escape(p)}</code>" for p in dict.fromkeys(PLATSHÅLLARE)) + ".</li>") if PLATSHÅLLARE else \
      "<li><b>Platshållare:</b> inga, alla saker är riktiga bilder ur <code>assets/</code>. Lastbilen är v2 (Sannas val); kanelbullen, kotten och Igge hoprullad är v1; byt i <code>ASSET</code>.</li>"
mätta = sum(1 for s in SHOTS if s[0] in SÅNGTID)

page = f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bruna sången: storyboard</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --chip:#f2eee5; --red:#A0673A;
  --display:"Grandstander","Chalkboard SE",cursive; --body:"Atkinson Hyperlegible",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#d9a070; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --chip:#312f38; --red:#d9a070; color-scheme:dark }}
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
.song {{ border-left:3px solid #A0673A; padding-left:10px; display:grid; gap:1px }}
.sh {{ font:500 11px var(--mono); color:var(--muted); margin-top:4px }}
.sung {{ font-style:italic }} .sung::before {{ content:"♪ "; color:var(--muted) }}
.pause {{ justify-self:start; font:500 11px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:1px 8px; margin:2px 0 }} figcaption p {{ margin:0 }}
.tag {{ justify-self:start; font:500 11px var(--mono); background:var(--chip); border-radius:999px; padding:2px 9px }}
.notes {{ margin-top:48px; background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 22px }}
.notes li {{ margin:6px 0 }} code {{ font-family:var(--mono); font-size:.9em }}
.utkast {{ display:inline-block; margin-top:14px; font:500 12px var(--mono); background:#fde7a6; color:#241f18; border-radius:999px; padding:3px 10px }}
</style></head><body><div class="wrap">
<h1>Bruna sången <span>storyboard</span></h1>
<p class="lede">Avsnitt 007, första utkast. Bilderna är byggda av utklippen i <code>assets/</code> med ansiktena ritade i kod. Pilarna visar rörelsen.</p>
<span class="utkast">Tiderna är uppskattade (≈): 92 bpm, ungefär en sjungen rad per takt (2,61 s). Ingen sang.m4a än. {mätta} av {len(SHOTS)} bilder mätta.</span>
<div class="stats"><div><b>{len(SHOTS)}</b><span>bilder</span></div><div><b>2</b><span>platser</span></div><div><b>3 + 3</b><span>figurer + statister</span></div><div><b>1</b><span>körscen</span></div><div><b>6</b><span>kamerainställningar (max 6)</span></div><div><b>≈{mmss(SLUT)}</b><span>längd</span></div></div>
<div class="tl">{''.join(tl)}</div>
{''.join(rows)}
<div class="notes"><h3 style="margin-top:0">Anteckningar</h3><ul>
<li><b>Ingen säger det som sjungs.</b> Ekot sjungs av kören. Varje brun sak har en rörelse i bild: dunk (06b), brum (08c), snurr (11b).</li>
<li><b>Refrängen är en dans</b> (05, 09 och sista refrängen 16), lugn och likadan: björnstampet på vägen, sedan kritsvep till kanelbullsberget där lastbilen kör upp och ner över bullen (alltid åt höger, lutad men aldrig vänd), kolasås och choklad i kod, och zoom ut till vägen på ”Titta ut!”. Sista refrängen är klistermärken i discot som i 005.</li>
<li><b>Lastbilen</b> är i lager: flaggan, Bulle, karossen, Bulles armar. Den gröna kepsen och den gröna flaggan (005:s rosa omfärgad) är kod.</li>
<li><b>Ängen</b> har en låg grön backe i kod (plåten är platt), så att bullen kan rulla ner. Igge syns först i 13f (nosen bakom blommorna) och rullar in i 14a.</li>
{ph_}
<li><b>Sångraderna</b> under varje bild läses ur sang.md (♪ sjungs, gul lapp = paus eller lucka). Fetstilt = repliker.</li>
<li><b>Tiderna</b> läggs in i <code>SÅNGTID</code> överst i bygg.py när rader.txt finns; resten räknas om.</li>
<li><b>Byggs om</b> med <code>~/.claude/skills/ai-video/.venv/bin/python -I bygg.py</code> i den här mappen.</li>
</ul></div>
</div></body></html>"""
(HÄR / "index.html").write_text(page, encoding="utf-8")


def sång_md(sid):
    ut = []
    for typ, text in SÅNG[sid]:
        ut.append(f"**{text}**" if typ == "rubrik" else f"♪ *{text}*" if typ == "sjungs" else f"⏸ {text}")
    return "<br>".join(ut).replace("|", "/")


md = HÄR.parent / "storyboard.md"
tabell = ["| # | Tid (≈ = uppsk.) | Plats · kamera | Bild | Repliker | Sång (ur sang.md) |", "|---|---|---|---|---|---|"]
for sid, _, sc, rad, vad, kamera in SHOTS:
    tabell.append(f"| {sid} | {TID[sid]} | {sc} · {kamera} | {vad} | {repliker(rad)} | {sång_md(sid)} |".replace("\n", " "))
if md.exists():
    text = md.read_text(encoding="utf-8")
    start, slutm = "<!-- tabell: skrivs av storyboard/bygg.py -->", "<!-- /tabell -->"
    if start in text:
        före, _, rest = text.partition(start)
        _, _, efter = rest.partition(slutm)
        md.write_text(före + start + "\n" + "\n".join(tabell) + "\n" + slutm + efter, encoding="utf-8")
print(f"{len(frames)} bilder, längd ≈{mmss(SLUT)}, index.html klar" + (f", platshållare: {', '.join(dict.fromkeys(PLATSHÅLLARE))}" if PLATSHÅLLARE else ", inga platshållare"))
