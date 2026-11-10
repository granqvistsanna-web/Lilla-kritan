"""Bildstoryboarden för 011 Gula sången, tagning 2, i art direction v2 (som 013 och 019).

Kör: ~/.claude/skills/ai-video/.venv/bin/python -I bygg.py   (från den här mappen)
Skriver frames/<id>.jpg och index.html. Kostar inga krediter. Läser tabellen i storyboard.md (en bild per rad).

Ritverktygen (krita, vita kanter, v2-ansikten, solen, jättesolen, discot) hämtas ur ../storyboard/bygg.py.
Nytt här: v2-plattorna (himlen-v2, dammen-v2 med urklipp), bananen v2, helikoptern v3 (öppet kar, glasbubblan och
rotorn i kod, Lage sitter i karet) och Kajsa och Humle som v2-riggar.

Lärdomar från 013 och 019 (format/fargsang-v2.md): ingen slump som byter bild, glitter i en ring runt sakens egen form,
klistermärken i discot två och två runt kulan, klappet med händerna framför bröstet, små munnar i discot,
vinkningar en i taget, helikoptern åt höger och aldrig vänd, inga effektstreck.
"""
import html
import json
import math
import re
import runpy
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HÄR = Path(__file__).resolve().parent
ARGV = sys.argv[1:]
sys.argv = [sys.argv[0]] + [a for a in ARGV if a.startswith("--")]   # basen ser bara flaggorna
G = runpy.run_path(str(HÄR.parent / "storyboard/bygg.py"), run_name="bas")
for k in ("A", "W", "H", "VIT", "GRÅ", "SOLGUL", "fyll", "place", "crop_zoom", "sätt", "figur", "V2", "vit_kant",
          "papperskorn", "gyllene_himlen", "sol", "disco", "kritan", "papper", "titelkort", "prick", "font"):
    globals()[k] = G[k]

# --- v2-figurer som saknas i basen -----------------------------------------------------------------------------
V2["kajsa"] = dict(mapp="kon-kajsa/premium", rigg="kajsa-rigg.json", fot=925, bak=("tail", "leg-l", "leg-r", "ear-l", "ear-r"), fram=(),
                   ogon=[(419, 402), (601, 401)], oga=(18, 26), glans=[(-6, -10, 6)], kinder=[(380, 453), (639, 450)], kind=(26, 16), mun="ingen", egen="ko")
V2["humle"] = dict(mapp="humlan-humle/premium", rigg="humle-rigg.json", fot=925,
                   bak=("wing-l", "wing-r", "leg-l", "leg-r", "antenn-l", "antenn-r"), fram=(),
                   ogon=[(411, 403), (612, 403)], oga=(18, 26), glans=[(-6, -10, 6)], kinder=[(361, 459), (662, 459)], kind=(34, 21), mun="ingen", egen="humla")
V2["hugo"] = dict(mapp="hunden-hugo/premium", rigg="hugo-rigg.json", fot=923, bak=("tail", "leg-l", "leg-r"), fram=("ear-l", "ear-r"),
                  ogon=[(417, 402), (602, 401)], oga=(19, 27), glans=[(-6, -10, 6)], kinder=[(387, 456), (639, 454)], kind=(27, 16), mun="ingen", egen="hund")

# Munnar och nosar ur figurernas uttryck.html: kons mule (kajsa-nos.png) med näsborrar och leendet på mulen,
# hundens svarta nos med strecket ner till leendet, humlans lilla mun. Basen ritar ögon och kinder (mun="ingen").
_ansikte = G["figur_v2"].__globals__["ansikte_v2"]
MULE = Image.open(G["A"] / "karaktarer/kon-kajsa/premium/cut/kajsa-nos.png").convert("RGBA")


def ansikte_v2(c, f, humör="glad", titt=(0, 0)):
    typ = f.get("egen")
    if typ == "ko":
        c.alpha_composite(MULE)
    _ansikte(c, f, humör, titt)
    if not typ:
        return
    h, SS = G["ANS"]["HUMÖR"][humör], 2
    lag = Image.new("RGBA", (1024 * SS, 1024 * SS))
    d = ImageDraw.Draw(lag)
    S = lambda pts: [(x * SS, y * SS) for x, y in pts]
    oval = lambda cx, cy, rx, ry, col: d.ellipse(((cx - rx) * SS, (cy - ry) * SS, (cx + rx) * SS, (cy + ry) * SS), fill=col)
    def linje(pts, w, col):
        d.line(S(pts), fill=col, width=round(w * SS), joint="curve")
        for x, y in (pts[0], pts[-1]):
            oval(x, y, w / 2, w / 2, col)
    q = G["ANS"]["_q"]
    m, b = h["mun"], h.get("b", 1)
    le = {"le": 1.0, "tunga": 1.0, "ledsen": -0.8, "streck": 0.2}.get(m, 0)
    öppen = {"o": (0.45, 0.6), "oppen": (0.6 * b + 0.3, 0.55 * h.get("m", 1) + 0.25)}.get(m)
    bb = b if m == "le" else (0.5 if m == "streck" else 1)
    if typ == "ko":          # näsborrarna i mulen, leendet på mulens nederdel (491–529, botten 541)
        for x in (468, 550):
            oval(x, 492, 12, 16, (205, 118, 128))
        if öppen:
            oval(510, 536, 34 * öppen[0], 28 * öppen[1], (122, 42, 52))
        else:
            linje(q((510 - 19 * bb, 541 - 10 * le), (510, 541 + 10 * le), (510 + 19 * bb, 541 - 10 * le)), 6, (83, 50, 58))
    elif typ == "hund":      # nosen (512, 424), strecket 438 → 452, leendet från 452
        oval(512, 424, 22, 14, (42, 29, 26))
        oval(505, 419, 6, 3.5, (255, 255, 255))
        if öppen:
            linje([(512, 438), (512, 446)], 5, (58, 42, 34))
            oval(512, 458 + 10 * öppen[1], 30 * öppen[0], 24 * öppen[1], (122, 42, 28))
        else:
            ey, cy = 452 - 4 * (le - 1), 452 + 16 * le
            linje([(512, 438), (512, 452)], 5, (58, 42, 34))
            linje(q((512 - 30 * bb, ey), (512 - 15 * bb, cy), (512, 452)) + q((512, 452), (512 + 15 * bb, cy), (512 + 30 * bb, ey))[1:], 5, (58, 42, 34))
    else:                    # humlan: en liten mun på (513, 445), 48 px bred
        if öppen:
            oval(513, 448, 30 * öppen[0], 26 * öppen[1], (122, 42, 28))
        else:
            linje(q((513 - 24 * bb, 445 - 8 * le), (513, 445 + 14 * le), (513 + 24 * bb, 445 - 8 * le)), 6, (122, 58, 28))
    c.alpha_composite(lag.resize(c.size, Image.LANCZOS))


G["figur_v2"].__globals__["ansikte_v2"] = ansikte_v2
V2["lage"].update(mapp="lejonet-lage/premium-v3", bak=("leg-l", "leg-r"), fram=())   # det släta lejonet (2026-11-10), öronen i kroppen; svansen ritas av heli()

# Humören i tabellen (v2-namn) → humören i verktyg/ansikten.py
HUMÖR = {"glad": "glad", "jatteglad": "skrattar", "fnissig": "skrattar", "forvanad": "forvanad", "nyfiken": "nyfiken",
         "ledsen": "ledsen", "stolt": "glad", "blinkar": "blinkar", "somnig": "somnig", "neutral": "glad", "tanker": "nyfiken"}
_ok = set(runpy.run_path(str(G["ROT"] / "verktyg/ansikten.py"))["HUMÖR"])
hum = lambda m: HUMÖR.get(m, m) if HUMÖR.get(m, m) in _ok else "glad"


def fig(namn, mood="glad", **kw):
    return figur(namn, hum(mood), **kw)


def bild(rel):
    return Image.open(G["A"] / rel).convert("RGBA")


# --- Platserna ---------------------------------------------------------------------------------------------------
HIMMEL = bild("bakgrunder/himlen/himlen-v2.png").resize((W, H), Image.LANCZOS)
MOLN = {n: bild(f"bakgrunder/himlen-saker/moln-{n}.png") for n in ("stort", "mellan", "litet", "langt")}
MOLNLÄGE = [("stort", 230, 300, 170), ("litet", 1180, 200, 90), ("langt", 820, 620, 110), ("mellan", 1250, 560, 120)]   # fast, ingen slump


def himmel(glid=0.0):
    """Himlen v2 med fyra moln. glid flyttar molnen åt vänster (helikoptern flyger åt höger)."""
    c = HIMMEL.copy()
    for n, x, y, h in MOLNLÄGE:
        place(c, MOLN[n], (x - glid) % (W + 300) - 150, y, h)
    return c


DAMMPLATTA = bild("bakgrunder/dammen/dammen-v2.png").resize((W, H), Image.LANCZOS)
DS = {n: bild(f"bakgrunder/dammen-saker/{n}.png") for n in ("damm", "blad", "nackros", "vass")}
GOLV = round(0.68 * H)                       # väggens underkant i plattan
DAMM_MITT, DAMM_Y = (860, 640), 640
BLADEN = [(660, 650), (850, 690), (1050, 652)]   # Gurras tre blad; hatten landar på det tredje


def dammen(hatt_på_blad=False, blad=True):
    c = DAMMPLATTA.copy()
    place(c, DS["vass"], 120, GOLV + 40, 300)
    place(c, DS["damm"], DAMM_MITT[0], 745, 210)
    if blad:
        for x, y in BLADEN:
            place(c, DS["blad"], x, y + 22, 52)
    place(c, DS["nackros"], 1170, 712, 60)
    place(c, DS["vass"], 1300, GOLV + 60, 240)
    if hatt_på_blad:
        hatt(c, BLADEN[2][0], BLADEN[2][1] + 4, 70)
    return c


def jättesol(flod=0.0, mood="glad"):
    c = gyllene_himlen(flod)
    sol(c, 1024, 312, 230, mood, kant=True)
    return c


SOLHATT = bild("rekvisita/solhatt-gul/cut/solhatt-gul.png")
KAJSA_HATT = 300   # hattens underkant i Kajsas 1024-ruta: brättet ner över hjässan, hornen sticker ut under (var 250, svävade)
BANAN = bild("rekvisita/banan/cut/banan-v2.png")
PLAN = bild("rekvisita/flygplan-rod/cut/flygplan-rod.png")              # bakgrund, långt bort
FJÄRIL = bild("karaktarer/fjarilen-fia/premium/cut/fia-faceless.png")   # bakgrund, liten


def hatt(c, x, botten, h):
    place(c, SOLHATT, x, botten, h)


def glitter(c, x, y, r, n=6):
    """Små gula krit-gnistor i en ring runt sakens egen form (013: aldrig i en fast ruta)."""
    for i in range(n):
        a = 2 * math.pi * i / n + 0.4
        px, py, s = x + r * math.cos(a), y + 0.85 * r * math.sin(a), 9 + 5 * (i % 2)
        fyll(c, (255, 236, 120), lambda d: d.polygon([(px, py - 2 * s), (px + s * .5, py - s * .5), (px + 2 * s, py), (px + s * .5, py + s * .5),
                                                     (px, py + 2 * s), (px - s * .5, py + s * .5), (px - 2 * s, py), (px - s * .5, py - s * .5)], fill=255),
             vick=0.05, oskarp=0.6)


# --- Helikoptern v3: karet ur bilden, Lage i det, glasbubblan och rotorn i kod -----------------------------------
KAR = bild("rekvisita/helikopter-gul/cut/helikopter-gul-v3.png")   # 1669 x 984
SVANS = bild("karaktarer/lejonet-lage/premium-v3/cut/lage-tail.png")   # Lages svans, roten (713, 772), tofsen (880, 650)
SVANS_ROT, SVANS_TOFS = (713, 772), (880, 650)
ÖPP = (1070, 198, 475, 108)        # öppningens ellips (cx, cy, rx, ry) i karets bild
TOPP = 640                         # luft ovanför karet för Lage och bubblan
HW, HH_ = KAR.width, KAR.height + TOPP
_fram = Image.new("L", KAR.size)
_d = ImageDraw.Draw(_fram)
_d.rectangle((0, ÖPP[1], KAR.width, KAR.height), fill=255)
_d.ellipse((ÖPP[0] - ÖPP[2], ÖPP[1] - ÖPP[3], ÖPP[0] + ÖPP[2], ÖPP[1] + ÖPP[3]), fill=0)
_d.rectangle((0, 0, 560, KAR.height), fill=0)         # helikopterns stjärt ligger bakom Lage ändå
KAR_FRAM = KAR.copy()
KAR_FRAM.putalpha(Image.fromarray(np.minimum(np.asarray(KAR.getchannel("A")), np.asarray(_fram.filter(ImageFilter.GaussianBlur(2))))))
LAGE_K, LAGE_X = 0.82, ÖPP[0]     # Sanna 2026-11-10: lite mindre i helikoptern (var 1,05)
LAGE_FOT = TOPP + ÖPP[1] + 300     # magen vid kanten, manen i bubblan
LAGE_ANSIKTE = (LAGE_X, LAGE_FOT - (947 - 430) * LAGE_K)


SVANS_FÄST = (LAGE_X + 230, TOPP + ÖPP[1] + 60)   # roten bakom karets vägg, till höger om Lage


def svans_punkt(xy, v, k):
    """En punkt i svansbilden → helikopterns ruta (skalad k och vriden v grader kring roten)."""
    a = math.radians(v)
    dx, dy = (xy[0] - SVANS_ROT[0]) * k, (xy[1] - SVANS_ROT[1]) * k
    return SVANS_FÄST[0] + dx * math.cos(a) + dy * math.sin(a), SVANS_FÄST[1] - dx * math.sin(a) + dy * math.cos(a)


SVANS_UPP = (15, 1.3)                 # svansen-scenen: tofsen sticker upp över karets kant till höger om Lage
TOFSEN = svans_punkt(SVANS_TOFS, *SVANS_UPP)


def heli(mood="glad", lyft_r=0, lyft_l=0, blick=(0, 0), lage=True, svans=False, rotor=1.0, bubbla=True, tår_=False):
    c = Image.new("RGBA", (HW, HH_))
    c.alpha_composite(KAR, (0, TOPP))
    if lage and svans:   # svansen-scenen: tofsen sticker upp över kanten (annars är svansen gömd i karet)
        v, k = SVANS_UPP
        sv = SVANS.resize((round(1024 * k),) * 2, Image.LANCZOS).rotate(v, resample=Image.BICUBIC, center=(SVANS_ROT[0] * k, SVANS_ROT[1] * k))
        c.alpha_composite(sv, (round(SVANS_FÄST[0] - SVANS_ROT[0] * k), round(SVANS_FÄST[1] - SVANS_ROT[1] * k)))
    if lage:
        sätt(c, fig("lage", mood, blick=blick, lyft_r=lyft_r, lyft_l=lyft_l, ben=False, lager="armar"), LAGE_X, LAGE_FOT, LAGE_K)
        sätt(c, fig("lage", mood, blick=blick, ben=False, lager="kropp", tår_=tår_), LAGE_X, LAGE_FOT, LAGE_K)
    c.alpha_composite(KAR_FRAM, (0, TOPP))
    cx, by = ÖPP[0], TOPP + ÖPP[1]
    if bubbla:   # glas: ljust blåvitt, ca 20 %, vit kant och två glansstreck uppe till vänster
        rx, ry = ÖPP[2] + 25, 470
        lag = Image.new("RGBA", c.size)
        d = ImageDraw.Draw(lag)
        d.pieslice((cx - rx, by - ry, cx + rx, by + ry), 180, 360, fill=(220, 238, 250, 52))
        d.arc((cx - rx, by - ry, cx + rx, by + ry), 180, 360, fill=(255, 255, 255, 235), width=16)
        for a0, a1, k in ((200, 232, 0.86), (238, 250, 0.86)):
            d.arc((cx - rx * k, by - ry * k, cx + rx * k, by + ry * k), a0, a1, fill=(255, 255, 255, 210), width=20)
        c.alpha_composite(lag)
        topp = by - ry
    else:
        topp = by - 40
    fyll(c, GRÅ, lambda d: d.rounded_rectangle((cx - 26, topp - 70, cx + 26, topp + 10), 14, fill=255), vick=0.06, oskarp=1)   # rotorfoten
    b = 760 * rotor   # rotorbladen: kortare = snurrar (sett från sidan)
    fyll(c, VIT, lambda d: d.rounded_rectangle((cx - b - 8, topp - 96, cx + b + 8, topp - 54), 21, fill=255), vick=0.04, oskarp=1)
    fyll(c, GRÅ, lambda d: d.rounded_rectangle((cx - b, topp - 88, cx + b, topp - 62), 13, fill=255), vick=0.06, oskarp=1)
    return c


def lägg(c, cx, botten, h, rot=0, **kw):
    """Helikoptern med medarna på `botten`, h px hög (rotorn till medarna). Returnerar (s, x0, y0)."""
    return place(c, heli(**kw), cx, botten, h, rot=rot, bakad=True)


def på(b, xy):
    s, x0, y0 = b
    return x0 + xy[0] * s, y0 + xy[1] * s


def nära(c, b, dy=0, w=560):
    x, y = på(b, LAGE_ANSIKTE)
    return crop_zoom(c, x, y + dy, w)


def vind(c, x, y, n=2):
    fyll(c, VIT, lambda d: [d.arc((x - 40 - 30 * i, y - 18 - 10 * i, x + 40 + 30 * i, y + 18 + 10 * i), 200, 340, fill=255, width=9) for i in range(n)],
         vick=0.1, oskarp=0.8)


# --- Scenerna ----------------------------------------------------------------------------------------------------
HX, HB, HHÖ = 560, 690, 520      # helbild: helikoptern på vänstra tredjedelen, ca 68 % av höjden med bubblan och rotorn


def flyg(glid=0, cx=HX, botten=HB, h=HHÖ, **kw):
    c = himmel(glid)
    return c, lägg(c, cx, botten, h, **kw)


def klistermärke(c, x, y, r, sak):
    fyll(c, VIT, lambda d: d.ellipse((x - r, y - r, x + r, y + r), fill=255), vick=0.05, oskarp=1)
    if sak == "banan":
        place(c, BANAN, x, y + r * .55, r * 1.1)
    elif sak == "hatt":
        hatt(c, x, y + r * .4, r * .9)
    elif sak == "heli":
        place(c, heli(lage=False, bubbla=False), x, y + r * .6, r * 1.1)
    else:
        place(c, fig(sak, "jatteglad"), x, y + r * .7, r * 1.3)


DANSARE = [("kajsa", 250), ("gurra", 540), ("humle", 830), ("hugo", 1120)]   # Sanna 2026-11-10: hunden i stället för kycklingen
DSKALA = {"kajsa": 0.5, "gurra": 0.4, "humle": 0.5, "hugo": 0.5}                # grodan lite mindre, humlan lika stor som de andra


def disco_bild(mood="jatteglad", lyft=0, hopp=0, luta=0, stickers=(), stort=None, solo=None, heli_in=False):
    """Discot som i 013. solo = {namn: dict(mood, lyft, lyft_l, hopp, luta)}: bara de rör sig, de andra står glada.
    stort = saken som slås upp stort mitt i bild. heli_in: helikoptern har kommit fram genom luckan, dansarna har krympt."""
    c = disco()
    for x, y, sak in stickers:
        klistermärke(c, x, y, 78, sak)
    krymp = 0.82 if heli_in else 1
    for i, (n, x) in enumerate(DANSARE):
        r = dict(mood=mood, lyft=lyft, lyft_l=None, hopp=hopp * (1 if i % 2 == 0 else 0.8), luta=luta * (1 if i % 2 else -1))
        if solo is not None:
            r = dict(mood="glad", lyft=25, lyft_l=None, hopp=0, luta=0) | solo.get(n, {})
        im = fig(n, r["mood"], lyft_r=r["lyft"], lyft_l=r["lyft"] if r["lyft_l"] is None else r["lyft_l"])
        if n == "kajsa":
            hatt(im, 512, KAJSA_HATT, 300)
        if r["luta"]:
            im = im.rotate(r["luta"], resample=Image.BICUBIC, center=(512, 925))
        if heli_in:   # luckan i mitten: dansarna glider isär
            x = W / 2 + (x - W / 2) * 1.12
        sätt(c, im, x, 735 - r["hopp"], DSKALA[n] * krymp)
    if stort:
        klistermärke(c, W / 2, 300, 150, stort)
        glitter(c, W / 2, 300, 175, 8)
    if heli_in:
        lägg(c, W / 2, 770, 470, mood="blinkar", lyft_r=130)
    return c


KÖ = [(530, 150, "banan"), (846, 150, "humle"), (330, 250, "hatt"), (1046, 250, "heli")]   # två och två runt kulan


def B():
    f = {}
    f["00"] = lambda: Image.open(HÄR / "intro-still.png").convert("RGBA").resize((W, H), Image.LANCZOS)   # formatets intro (../intro, gul)

    def ritar(steg, krita):
        def g():
            c = papper()
            if steg == 3:
                place(c, BANAN, W / 2, 620, 420)
                glitter(c, W / 2, 420, 260)
                lägg(c, 1150, 640, 260, lage=False, bubbla=False)
            else:
                m = Image.new("L", BANAN.size)
                a = np.asarray(BANAN.getchannel("A"))
                e = np.asarray(Image.fromarray(a).filter(ImageFilter.MinFilter(25)))
                lin = Image.fromarray(((a > 128) & (e < 128)).astype(np.uint8) * 255)
                lin = lin.filter(ImageFilter.MaxFilter(9))
                ink = Image.new("RGBA", BANAN.size, (60, 52, 40, 255))
                ink.putalpha(lin)
                place(c, ink, W / 2, 620, 420, bakad=True)
            kritan(c, *krita)
            return c
        return g
    f["01a"] = ritar(1, (980, 300))
    f["01b"] = ritar(2, (1060, 470))
    f["01c"] = ritar(3, (1240, 250))

    # Sanna 2026-11-10: helikoptern börjar på marken vid dammen och flyger upp i molnen
    def marken(mood, upp=0, rotor=1.0, **kw):
        c = dammen()
        return c, lägg(c, 470, GOLV + 175 - upp, 420, mood=mood, rotor=rotor, **kw)
    def g(): c, b = marken("jatteglad", lyft_r=120); return c
    f["02a"] = g
    def g(): c, b = marken("fnissig"); return nära(c, b, w=640)
    f["02b"] = g
    def g():
        c, b = marken("glad", upp=150, rotor=0.55)
        vind(c, 470, GOLV + 60, 3)
        return c
    f["02c"] = g
    def g():
        c, b = flyg(120, botten=520, mood="jatteglad", lyft_r=150, lyft_l=150)
        place(c, MOLN["stort"], 330, 790, 170)
        place(c, MOLN["mellan"], 900, 760, 130)
        place(c, PLAN, 1230, 190, 60)
        x, y = på(b, (ÖPP[0] - 260, TOPP + ÖPP[1] - 400))
        place(c, MOLN["litet"], x, y, 55, rot=-12)   # molntussen från molnet de flög igenom
        return c
    f["02d"] = g
    def medåkare(c, b):   # refräng 2: humlan surrar bredvid bubblan, bananen sitter i karet
        x, y = på(b, (ÖPP[0] + 640, TOPP - 40))
        sätt(c, fig("humle", "jatteglad"), x, y + 110, 0.2)
        x, y = på(b, (ÖPP[0] + 300, TOPP + ÖPP[1] + 10))
        place(c, BANAN, x, y, 110, rot=-20)
    def refräng(mood="jatteglad", rot=-4, med=False, fjäril=False):
        def g():
            c, b = flyg(180, botten=650, mood=mood, rot=rot, lyft_r=60, lyft_l=60)
            if fjäril:
                place(c, FJÄRIL, 1180, 250, 80, rot=12)
            if med:
                medåkare(c, b)
            return c
        return g
    def pekar():
        def g(): c, b = flyg(200, mood="glad", lyft_r=150, rotor=0.55); return nära(c, b, dy=-120, w=760)
        return g
    def solen(flod, mood, med=False):
        def g():
            c = jättesol(flod, "blinkar" if flod else "glad")   # Ha-ha-skämtet: solen blinkar
            b = lägg(c, 520, 650 if not flod else 600, 440, mood=mood, lyft_r=90 if flod else 0, lyft_l=90 if flod else 0)
            if med:
                medåkare(c, b)
            return c
        return g
    for p, med in (("03", False), ("06", True)):
        f[p + "a"] = refräng(med=med, fjäril=not med)
        f[p + "b"] = pekar()
        f[p + "c"] = refräng(rot=4, med=med)
        f[p + "d"] = solen(0, "forvanad", med)
        f[p + "e"] = solen(1, "jatteglad", med)

    def g():
        c, b = flyg(240, mood="nyfiken", lyft_r=120, blick=(0.8, -0.4))
        sätt(c, fig("humle", "glad"), 1290, 300, 0.07)   # humlan långt borta: barnet ser den först
        return c
    f["04a"] = g
    def humle_in(mood, öglor=False):
        def g():
            c, b = flyg(260, mood=mood, lyft_r=150 if mood == "jatteglad" else 0)
            x, y = på(b, (ÖPP[0] + 760, -60))
            if öglor:
                G["pil"](c, G["båge"](x - 60, y + 30, 120, 70, -40, 300, 16))
            sätt(c, fig("humle", "jatteglad" if öglor else "glad"), x, y + 120, 0.24)
            glitter(c, x, y, 110)
            return c
        return g
    f["04b"] = humle_in("jatteglad")
    f["04c"] = humle_in("fnissig", öglor=True)
    def g():
        c, b = flyg(300, mood="nyfiken", lyft_l=120, blick=(-0.8, -0.4))
        place(c, BANAN, 1090, 380, 150, rot=-10)
        place(c, MOLN["mellan"], 1070, 490, 190)       # bananens spets kikar fram ovanför molnet
        return c
    f["04d"] = g
    def g():
        c, b = flyg(320, mood="forvanad")
        x, y = på(b, (ÖPP[0] + 820, 200))
        place(c, MOLN["litet"], x, y + 60, 110)
        place(c, BANAN, x, y + 10, 150, rot=-10)
        glitter(c, x, y - 60, 120)
        return c
    f["04e"] = g
    def g():
        c, b = flyg(330, mood="jatteglad", lyft_r=60)
        x, y = på(b, (LAGE_X + 300, LAGE_ANSIKTE[1] + 160))
        place(c, BANAN, x, y, 160, rot=30)
        return nära(c, b)
    f["04f"] = g
    def g():
        c, b = flyg(350, mood="nyfiken", svans=True, blick=(-0.9, 0))
        return nära(c, b, w=760)
    f["05a"] = g
    def g():
        c, b = flyg(360, mood="forvanad", svans=True, blick=(1, 0.6))
        x, y = på(b, TOFSEN)
        glitter(c, x, y, 120)
        return crop_zoom(c, x - 60, y + 40, 480)
    f["05c"] = g
    def g():
        c, b = flyg(370, mood="fnissig", svans=True, blick=(1, 0.6))
        x, y = på(b, TOFSEN)
        G["pil"](c, G["båge"](x, y + 40, 90, 50, 30, 150, 10))
        return crop_zoom(c, x - 60, y + 40, 480)
    f["05d"] = g

    # Dammen
    def landar(mood_l, mood_k, botten=GOLV + 175, rotor=1.0, kajsa_lyft=0, hatt_på=True, blad=True, hatt_blad=False, tår_=False):
        c = dammen(hatt_blad, blad)
        lägg(c, 330, botten, 360, mood=mood_l, rotor=rotor, lyft_r=120 if mood_l == "jatteglad" else 0)
        k = fig("kajsa", mood_k, lyft_r=kajsa_lyft, tår_=tår_)
        if hatt_på:
            hatt(k, 512, KAJSA_HATT, 300)
        sätt(c, k, 1180, GOLV + 160, 0.33)
        return c
    f["07a"] = lambda: landar("nyfiken", "glad", botten=GOLV + 120)
    def g():
        c = landar("glad", "stolt")
        glitter(c, 1180, GOLV - 145, 90)
        return crop_zoom(c, 900, GOLV - 20, 860)
    f["07b"] = g
    f["07c"] = lambda: landar("jatteglad", "jatteglad", kajsa_lyft=130)
    def g():
        c = landar("forvanad", "ledsen", rotor=0.55, hatt_på=False, hatt_blad=True, tår_=True)
        vind(c, 560, GOLV + 10, 3)
        G["pil"](c, [(1180, GOLV - 150), (1110, GOLV - 230), (1050, GOLV + 60)])
        return c
    f["08a"] = g
    def g():
        c = landar("glad", "ledsen", rotor=1.0, hatt_på=False, hatt_blad=True)
        x0, y0 = BLADEN[0]
        sätt(c, fig("gurra", "jatteglad"), x0, y0 + 18, 0.16)
        G["pil"](c, [(x0, y0 - 40), (x0 + 95, y0 - 110), (BLADEN[1][0], BLADEN[1][1] - 40), (BLADEN[1][0] + 100, y0 - 110), (BLADEN[2][0] - 20, BLADEN[2][1] - 40)])
        return crop_zoom(c, 880, 600, 900)
    f["08b"] = g
    def vid_dammen(mood="jatteglad", hopp=0, heli_upp=0, vinka=False, rotor=1.0):
        def g():
            c = dammen()
            lägg(c, 330, GOLV + 175 - heli_upp, 360, mood=mood, rotor=rotor, lyft_r=120)
            k = fig("kajsa", mood, lyft_r=130 if vinka else 30)
            hatt(k, 512, KAJSA_HATT, 300)
            sätt(c, k, 1100, GOLV + 160 - hopp, 0.33)
            sätt(c, fig("gurra", mood, lyft_r=130 if vinka else 30), 880, GOLV + 175 - hopp * 0.8, 0.2)
            return c
        return g
    f["09a"] = vid_dammen()
    f["09b"] = vid_dammen("glad", rotor=0.55)
    f["09c"] = vid_dammen(hopp=10)
    f["09d"] = vid_dammen("jatteglad", heli_upp=200, vinka=True)
    def g():
        c = vid_dammen(hopp=50, heli_upp=260)()
        sol(c, 1250, 150, 105, "skrattar", kant=True)
        gul = Image.new("RGBA", c.size, (255, 226, 110, 46))
        return Image.alpha_composite(c, gul)
    f["09e"] = g

    # Discot (som 013: en dansare per rörelse, sedan alla; sakerna stora i mitten, sedan upp i bågen)
    f["10a"] = lambda: disco_bild(lyft=150)
    f["10b"] = lambda: disco_bild(solo={"kajsa": dict(mood="jatteglad", lyft=75)})
    f["10c"] = lambda: disco_bild(solo={"humle": dict(mood="jatteglad", lyft=40, luta=10)})
    f["10d"] = lambda: disco_bild(solo={"gurra": dict(mood="jatteglad", lyft=120, hopp=130)})
    f["10e"] = lambda: disco_bild(solo={"hugo": dict(mood="blinkar", lyft=110, lyft_l=0)})
    def g(): return crop_zoom(disco_bild(lyft=75, hopp=25), W / 2, 520, 1050)
    f["10f"] = g
    f["10g"] = lambda: disco_bild(lyft=165, hopp=30)
    heli_s, banan_s, humle_s, hatt_s = KÖ[3], KÖ[0], KÖ[1], KÖ[2]
    f["11a"] = lambda: disco_bild(stickers=[heli_s], stort="banan", solo={})
    f["11b"] = lambda: disco_bild(stickers=[heli_s, banan_s], stort="humle", solo={"humle": dict(mood="jatteglad", lyft=60, hopp=40)})
    f["11c"] = lambda: disco_bild(stickers=[heli_s, banan_s, humle_s], stort="hatt", solo={"kajsa": dict(mood="jatteglad", lyft=130, lyft_l=20)})
    f["11d"] = lambda: disco_bild(hopp=55, lyft=165, stickers=KÖ)
    f["11e"] = lambda: disco_bild("glad", lyft=120, stickers=KÖ, heli_in=True)
    def g():
        c, b = flyg(400, mood="jatteglad", lyft_r=120)
        x, y = på(b, LAGE_ANSIKTE)
        m = Image.new("L", (W, H), 255)
        ImageDraw.Draw(m).ellipse((x - 260, y - 240, x + 260, y + 240), fill=0)
        c.paste((20, 20, 24), mask=m.filter(ImageFilter.GaussianBlur(6)))
        return c
    f["12"] = g
    return f


# --- Tabellen och sidan -----------------------------------------------------------------------------------------
def tabell():
    rader = []
    for rad in (HÄR / "storyboard.md").read_text(encoding="utf-8").split("\n"):
        if not rad.startswith("|") or "---" in rad or "| # |" in rad:
            continue
        c = [s.strip() for s in rad.split("|")[1:-1]]
        if len(c) >= 6:
            rader.append(dict(id=c[0], tid=c[1], plats=c[2], sjungs=c[3], bild=c[4], ansikten=c[5]))
    return rader


def md(s):
    s = html.escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*(.+?)\*", r"<i>\1</i>", s)
    s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    return re.sub(r"\[(.+?)\]\((.+?)\)", r"\1", s)


def sida(rader):
    rutor = "".join(
        f"<figure class='frame'><img src='frames/{r['id']}.jpg' alt='Bild {r['id']}' loading='lazy'>"
        f"<figcaption><div class='t'>{r['id']} · {r['tid']} · {md(r['plats'])}</div><div class='song'>{md(r['sjungs'])}</div>"
        f"<p>{md(r['bild'])}</p><p class='ans'>{md(r['ansikten'])}</p></figcaption></figure>" for r in rader)
    return f"""<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gula sången storyboard</title>
<style>
:root {{ --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --gul:#B07D00 }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --gul:#f5c842; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --gul:#f5c842; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 system-ui,sans-serif }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 16px 72px }}
h1 {{ font-size:clamp(30px,6vw,52px); margin:0 }} h1 span {{ color:var(--gul) }}
.lede {{ color:var(--muted); max-width:72ch }}
.frames {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-top:24px }}
.frame {{ margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }}
.frame img {{ width:100%; height:auto; display:block }}
figcaption {{ padding:12px 14px 14px; display:grid; gap:6px; font-size:14px }} figcaption p {{ margin:0 }}
.t {{ font:500 12px ui-monospace,monospace; color:var(--muted) }}
.song {{ border-left:3px solid var(--gul); padding-left:10px; font-style:italic }}
.ans {{ color:var(--muted); font-size:13px }}
</style></head><body><div class="wrap">
<h1>Gula sången <span>storyboard v2</span></h1>
<p class="lede">Avsnitt 011, tagning 2 (2:28.0). En stillbild per rad i <code>storyboard.md</code>, avsnittstid = sångtid + 24,5 s. Byggd av v2-plattorna, bananen v2 och helikoptern v3 (glasbubblan och rotorn i kod), figurerna ur sina v2-riggar med ansiktena i kod. Pilarna visar rörelsen. {len(rader)} bilder.</p>
<div class="frames">{rutor}</div>
</div></body></html>"""


if __name__ == "__main__":
    (HÄR / "frames").mkdir(exist_ok=True)
    rader = tabell()
    valda = [a for a in ARGV if not a.startswith("--")]
    f = B()
    saknas = []
    for r in rader:
        if r["id"] not in f:
            saknas.append(r["id"])
            continue
        if valda and r["id"] not in valda:
            continue
        im = f[r["id"]]()
        papperskorn(im).convert("RGB").resize((960, 536), Image.LANCZOS).save(HÄR / "frames" / f"{r['id']}.jpg", quality=86)
        print(r["id"], end=" ", flush=True)
    (HÄR / "index.html").write_text(sida(rader), encoding="utf-8")
    print(f"\nklart, utan bild: {saknas}")
