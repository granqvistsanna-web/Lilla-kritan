# Kodansikten för storyboarden (PIL), ritade som i kit.js: vita ögon med svart ring och prick, kodmun under nosen.
# Samma humör finns i avsnitt/005-rosa-bilen/scener/ansikten.js för animationen. Mått i figurens egen 1024-ruta.
#   from ansikten import rita
#   rita(figur_rgba_1024, "skrattar")                              # musen Mille är standard
#   rita(im, "nyfiken", titt=(1, 0), ogon=[(414, 401), (605, 399)], mun=(509, 482), munskala=1.2)   # en annan figur
# Musen Milles nos finns inte i den ansiktslösa bilden (blobversionen): den ritas här, med ett streck ner till leendet.
import math
import random

from PIL import Image, ImageChops, ImageDraw, ImageFilter

INK = (29, 29, 29)
MUNHÅL = (90, 36, 24)        # #5a2418
TUNGA = (231, 137, 140)      # #e7898c
KIND = (240, 140, 165, 150)
DJUROGON = [(414, 401), (605, 399)]
MILLE = dict(ogon=[(413, 401), (604, 398)], mun=(512, 459), munskala=1.4, nos=(509, 418))   # uppmätt: med ansikte mot ansiktslös
NOS, NOSKANT, NOS_R = (214, 86, 138), (128, 40, 78), (25, 17)   # mörkrosa, lite högre och mindre (Sanna, 005); syns ändå i liten bild

# ogon: open | happy (^) | sleep (stängda, nöjda) | (vänster, höger) för blink. stor = ögonskala. titt/tittY: pupillen −1..1.
# skel: pupillerna in mot nosen. mun: le (b = bredd) | oppen (m = hur mycket) | o | tunga | ledsen.
HUMÖR = {
    "glad":        dict(ogon="open", mun="le"),
    "skrattar":    dict(ogon="happy", mun="oppen", m=0.8),
    "ropar":       dict(ogon="open", stor=1.15, mun="oppen", m=1.6, b=1.4),
    "forvanad":    dict(ogon="open", stor=1.3, mun="o"),
    "nyfiken":     dict(ogon="open", titt=1, tittY=-0.4, mun="le", b=0.55),
    "skelogd":     dict(ogon="open", stor=1.1, skel=True, mun="le", b=0.7),
    "njuter":      dict(ogon="sleep", mun="le", b=0.45),
    "slickar":     dict(ogon="happy", mun="tunga"),
    "karleksfull": dict(ogon="happy", mun="le", kinder=True),
    "blinkar":     dict(ogon=("open", "happy"), mun="le", b=1.3),
    "ledsen":      dict(ogon="open", tittY=0.5, mun="ledsen"),
}
# kit.js namn och de gamla namnen i 005:s bygg.py
HUMÖR |= {"open": HUMÖR["glad"], "happy": dict(ogon="happy", mun="le"), "big": HUMÖR["forvanad"],
          "sleep": dict(ogon="sleep", mun="le"), "sad": HUMÖR["ledsen"], "skel": HUMÖR["skelogd"], "mums": HUMÖR["slickar"]}

SS = 2  # ritas i dubbel storlek och skalas ner, för mjuka kanter
KRITA = False  # True: ojämn vaxkritlinje med korn i stället för en jämn vektorlinje (005:s bygg.py slår på den)
_korn = {}


def _kritkorn(size):
    """Fast kornmönster (samma varje gång) som gör linjen lite gles, som krita på papper."""
    if size not in _korn:
        brus = Image.frombytes("L", size, random.Random(5).randbytes(size[0] * size[1])).filter(ImageFilter.GaussianBlur(1.2))
        _korn[size] = brus.point(lambda v: max(0, min(255, round(255 * (0.82 + (v - 128) / 70)))))
    return _korn[size]


def _q(p0, c, p1, n=24):
    return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0],
             (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]) for t in (i / n for i in range(n + 1))]


def rita(im, humör="glad", titt=(0, 0), ogon=MILLE["ogon"], mun=MILLE["mun"], munskala=MILLE["munskala"], ogonskala=1, munbredd=1, nos=None):
    """Ritar ansiktet på `im` (RGBA i figurens 1024-ruta). titt = (x, y) −1..1 lägger sig ovanpå humörets egen blick.
    munbredd: bredare leende med samma tjocklek (grodan: 2.6, som munBredd i kit.js).
    nos: punkt för en ritad rosa nos. Utan egna ögon (= musen) ritas Milles nos."""
    if nos is None and ogon is MILLE["ogon"]:
        nos = MILLE["nos"]
    h = HUMÖR[humör]
    lager = Image.new("RGBA", (im.width * SS, im.height * SS))
    d = ImageDraw.Draw(lager)

    def linje(pts, w, col=INK):
        pts = [(x * SS, y * SS) for x, y in pts]
        if not KRITA:
            d.line(pts, fill=col, width=round(w * SS), joint="curve")
            for x, y in (pts[0], pts[-1]):
                d.ellipse((x - w * SS / 2, y - w * SS / 2, x + w * SS / 2, y + w * SS / 2), fill=col)
            return
        s = 0  # kritlinje: tjockleken varierar lite längs linjen
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            n = max(1, round(math.dist((x0, y0), (x1, y1))))
            for i in range(n):
                x, y, s = x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, s + 1
                r = w * SS / 2 * (0.88 + 0.16 * math.sin(s * 0.07 + x0 * 0.01) + 0.06 * math.sin(s * 0.31))
                d.ellipse((x - r, y - r, x + r, y + r), fill=col)

    def oval(cx, cy, rx, ry, fill, w=0):
        d.ellipse(((cx - rx) * SS, (cy - ry) * SS, (cx + rx) * SS, (cy + ry) * SS), fill=fill,
                  outline=INK if w else None, width=round(w * SS))

    lägen = h["ogon"] if isinstance(h["ogon"], tuple) else (h["ogon"],) * 2
    for i, ((x, y), läge) in enumerate(zip(ogon, lägen)):
        k = ogonskala
        P = lambda px, py: (x + px * k, y + py * k)
        if h.get("kinder"):
            ut = -1 if i == 0 else 1
            oval(*P(ut * 14, 42), 26 * k, 15 * k, KIND)
        if läge == "happy":
            linje(_q(P(-22, 8), P(0, -18), P(22, 8)), 7 * k)
        elif läge == "sleep":
            linje(_q(P(-22, -2), P(0, 18), P(22, -2)), 7 * k)
        else:
            s = k * h.get("stor", 1)
            oval(x, y, 26 * s, 26 * s, "white", 6 * k)
            tx = (1 if i == 0 else -1) * 0.75 if h.get("skel") else h.get("titt", 0) + titt[0]
            ty = 0.75 if h.get("skel") else h.get("tittY", 0) + titt[1]
            tx, ty = max(-1, min(1, tx)), max(-1, min(1, ty))
            oval(x + tx * 9 * s, y + ty * 9 * s, 10 * k, 10 * k, INK)

    mx, my = mun
    M = lambda px, py, sx=munskala, sy=munskala: (mx + px * sx, my + py * sy)
    b, typ = h.get("b", 1), h["mun"]
    if nos:
        if typ == "le":   # streck från nosen ner till leendets mitt
            linje([(nos[0], nos[1] + NOS_R[1] - 3), (mx, my + 4.5 * b * munbredd * munskala)], 4)
        d.ellipse(((nos[0] - NOS_R[0]) * SS, (nos[1] - NOS_R[1]) * SS, (nos[0] + NOS_R[0]) * SS, (nos[1] + NOS_R[1]) * SS), fill=NOS,
                  outline=NOSKANT, width=3 * SS)
    if typ == "le":
        bb = b * munbredd   # bara leendet blir bredare, som i kit.js
        linje(_q(M(-20 * bb, -5), M(0, 5 + 9 * bb), M(20 * bb, -5)), 5 * munskala)
    elif typ == "ledsen":
        linje(_q(M(-16, 7), M(0, -6), M(16, 7)), 5 * munskala)
    elif typ == "o":
        oval(*M(0, 2), 9 * munskala, 11 * munskala, MUNHÅL, 4 * munskala)
    elif typ == "tunga":
        oval(*M(9, 7), 9 * munskala, 10 * munskala, TUNGA, 4 * munskala)
        linje(_q(M(-20, -5), M(0, 14), M(20, -5)), 5 * munskala)
    elif typ == "oppen":   # kit.js öppna mun, skalad (0.8·b, 1.3·m) runt munpunkten
        sx, sy = munskala * 0.8 * b, munskala * 1.3 * h["m"]
        ytter = _q((-24, -12), (0, -6), (24, -12), 8) + _q((24, -12), (22, 18), (0, 18), 8) + _q((0, 18), (-22, 18), (-24, -12), 8)
        d.polygon([((mx + px * sx) * SS, (my + py * sy) * SS) for px, py in ytter], fill=MUNHÅL,
                  outline=INK, width=round(4 * munskala * SS))
        oval(mx + 2 * sx, my + 10 * sy, 11 * sx, 6 * sy, TUNGA)
    lager = lager.resize(im.size, Image.LANCZOS)
    if KRITA:
        lager.putalpha(ImageChops.multiply(lager.getchannel("A"), _kritkorn(im.size)))
    im.alpha_composite(lager)
    return im
