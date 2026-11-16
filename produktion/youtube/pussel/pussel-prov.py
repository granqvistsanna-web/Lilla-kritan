"""Pusselprov 3: tjocka 3D-bitar i en pusselbricka. Snitten är lagda för hand per bild så att varje bit har en ledtråd,
bitarna kommer i bestämd ordning, Malin säger ledtråden när biten visas i närbild, frågar "Vad blir det?" efter bit 3,
och sist blir bilden levande (äpplet studsar, bilen kör en runda, kaninen skuttar).

Malins repliker hämtas ur assets/ljud/roster/pussel/<id>.m4a. Saknas en fil blir det tyst där (längden uppskattas)
och repliken står som text nederst i bild, så att provet går att titta på innan rösterna är inspelade.
Kör: python3 produktion/youtube/pussel/pussel-prov.py [filmnamn | pusselnamn ...] | --remsa namn ... | --rost   (rost.txt i samma mapp är listan till ElevenLabs)"""
import os, math, random, subprocess
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import numpy as np

REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))
UT = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1280, 720, 30
SS = 2                                  # översampling för rena kanter
PAPPER = (251, 247, 238)
BRADA_W, BRADA_H = 600, 450             # bildytan
MITT = (W // 2, H // 2 - 6)
DJUP = 14                               # bitens tjocklek i px
E = 'assets/ljud/effekter/'
ROST = 'assets/ljud/roster/pussel/'

# Malins repliker (ElevenLabs v3, känslotagg först). Samma text i flera filer = olika tagningar, varje fil används en gång.
REPLIKER = {
    'ska-vi-lagga':     '[excited] Ska vi lägga ett pussel?',
    **{f'nytt-pussel-{n}': '[warm] Ett nytt pussel!' for n in range(1, 11)},
    **{f'dar-{n}': '[pleased] Där!' for n in range(1, 12)},
    **{f'den-passar-{n}': '[pleased] Den passar!' for n in range(1, 12)},
    **{f'vad-blir-det-{n}': '[curious] Hmm … vad blir det?' for n in range(1, 12)},
    'applet-rott':      '[curious] Något rött.',
    'applet-runt':      '[curious] Något runt.',
    'applet-blanker':   '[curious] Det blänker!',
    'applet-rott-runt': '[curious] Rött och runt …',
    'applet-blad':      '[excited] Ett blad!',
    'ett-apple':        '[excited] Ett äpple!',
    'bilen-rott':       '[curious] Något rött.',
    'bilen-gult':       '[curious] Något gult.',
    'bilen-fonster':    '[excited] Ett fönster!',
    'bilen-hjul':       '[excited] Ett hjul!',
    'bilen-hjul-till':  '[excited] Ett hjul till!',
    'en-bil':           '[excited] En bil!',
    'en-kanin':         '[excited] En kanin!',
    'sa-fint-hej-da':   '[warm] Så fint! Hej då!',
}

# Bitarna: 0 överst till vänster, 1 överst till höger, 2 nederst till vänster, 3 nederst i mitten, 4 nederst till höger.
# snitt (andelar av bildytan): y = vågräta skarven, topp = lodräta skarven överst, botten = de två nederst.
# ordning: (bit, ledtrådens replik). Det som avgör kommer sist. levande: vad saken gör när den är klar.
PUSSEL = [
    dict(namn='applet', bild='assets/rekvisita/applet-rott/cut/applet-rott-v3-tunn.png', bg=(190, 222, 240), hojd=1.12, yfast=0.0,
         snitt=dict(y=0.58, topp=0.38, botten=(0.33, 0.67), agare=dict(topp=1)),
         # 3: botten (rött)  2: vänstra rundningen  0: glansen  4: högra rundningen  1: skaftet och bladet
         ordning=[(3, 'applet-rott'), (2, 'applet-runt'), (0, 'applet-blanker'), (4, 'applet-rott-runt'), (1, 'applet-blad')],
         svar='ett-apple', levande='studsa'),
    dict(namn='bilen', bild='assets/rekvisita/bil-rod/cut/bil-rod.png', bg=(246, 226, 150), hojd=1.0,
         snitt=dict(y=0.70, topp=0.49, botten=(0.40, 0.62), agare=dict(b1=2, b2=4, h0=2)),
         # 3: rött mellan hjulen  1: främre fönstret och lyktan  0: bakre fönstret  2: bakhjulet  4: framhjulet (frågan före hjulen)
         ordning=[(3, 'bilen-rott'), (1, 'bilen-gult'), (0, 'bilen-fonster'), (2, 'bilen-hjul'), (4, 'bilen-hjul-till')],
         svar='en-bil', levande='kora'),
    dict(namn='kaninen', bild='assets/karaktarer/kaninen-kanel/v2/cut/kanel.png', bg=(196, 230, 186), hojd=1.0,
         snitt=dict(y=0.33, topp=0.50, botten=(0.36, 0.64)),
         # 1: högra (vikta) örat  2: vänster arm  4: höger arm och fot  0: vänstra örat  3: ansiktet och magen
         ordning=[(1, 'kaninen-langt'), (2, 'kaninen-rosa'), (4, 'kaninen-fot'), (0, 'kaninen-ora'), (3, 'kaninen-ogon')],
         svar='en-kanin', levande='skutta'),
]
# filmer: filmnamn -> pusslen i ordning (högst 11)
FILMER = {'pussel-prov-3': ['applet', 'bilen', 'kaninen']}
import sys as _sys; _sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from liv_extra import Extra; import pusseldata; pusseldata.anslut(PUSSEL, REPLIKER, FILMER)   # Vanliga och Jul
# tider (s)
IN, VISA, LAGG, MELLAN = 0.8, 1.3, 0.8, 0.8      # lugnare: biten visas längre, längre paus mellan bitarna
FRAGA = 4.0                             # tyst gissningspaus efter frågan
TAKTER = {'dar': [0, 2, 4]}             # efter vilka bitar Malin säger "Där!"/"Den passar!"


def ease_ut_bak(x, c=1.7):
    return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2


def gnistor(ram, cx, cy, rx, ry, age, n=14, seed=0, liten=False):
    """Krit-gnistor som sprätter ut från (cx, cy) och tonas bort på 0,7 s."""
    if not 0 <= age < 0.7: return
    rng = random.Random(seed); d = ImageDraw.Draw(ram)
    e = ease(age / 0.7); a = int(255 * (1 - age / 0.7) ** 1.3)
    for i in range(n):
        v = 2 * math.pi * (i + rng.random() * 0.6) / n
        ut = (50 if liten else 110) * e * (0.7 + 0.6 * rng.random())   # börjar på brickans kant och sprätter utåt
        x, y = cx + (rx + ut) * math.cos(v), cy + (ry + ut) * math.sin(v)
        st = (3 if liten else 5) + 3 * rng.random()
        col = rng.choice([(245, 197, 66), (240, 150, 80), (242, 160, 181), (140, 196, 232)])
        if i % 3 == 0:                                 # liten fyruddig stjärna
            d.polygon([(x, y - st * 1.8), (x + st * 0.5, y - st * 0.5), (x + st * 1.8, y), (x + st * 0.5, y + st * 0.5),
                       (x, y + st * 1.8), (x - st * 0.5, y + st * 0.5), (x - st * 1.8, y), (x - st * 0.5, y - st * 0.5)], fill=col + (a,))
        else:
            d.ellipse((x - st, y - st, x + st, y + st), fill=col + (a,))


def ease(x):
    x = min(max(x, 0), 1); return 1 - (1 - x) ** 3

def easeio(x):
    x = min(max(x, 0), 1); return x * x * (3 - 2 * x)

def easein(x):
    x = min(max(x, 0), 1); return x * x * x


_langd = {}
def langd(fil):
    if fil not in _langd:
        r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fil],
                           capture_output=True, text=True)
        _langd[fil] = float(r.stdout.strip() or 0)
    return _langd[fil]


def replik(rid):
    """(fil eller None, längd i s, text utan tagg)"""
    fil = os.path.join(REPO, ROST, rid + '.m4a')
    text = REPLIKER[rid].split('] ', 1)[1]
    if os.path.exists(fil):
        return fil, langd(fil), text
    return None, 0.5 + 0.06 * len(text), text


def etiketter(w, h, snitt):
    """5 bitar efter snitten. Klassiska knoppar (hals + runt huvud) på varje inre kant."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    sy, st = snitt['y'] * h, snitt['topp'] * w
    b1, b2 = snitt['botten'][0] * w, snitt['botten'][1] * w
    lab = np.where(yy < sy, (xx >= st).astype(int), np.where(xx < b1, 2, np.where(xx < b2, 3, 4)))
    r = h * 0.075
    def knopp(cx, cy, dx, dy, agare):
        hx, hy = cx + dx * r * 1.15, cy + dy * r * 1.15
        huvud = (xx - hx) ** 2 + (yy - hy) ** 2 < r * r
        if dx:
            hals = (np.abs(yy - cy) < r * 0.55) & ((xx - cx) * dx > -2) & ((xx - cx) * dx < r * 1.15)
        else:
            hals = (np.abs(xx - cx) < r * 0.55) & ((yy - cy) * dy > -2) & ((yy - cy) * dy < r * 1.15)
        lab[huvud | hals] = agare
    # vem knoppen hör till (sticker ut ur): snitt['agare'] kan byta, så att biten med ledtråden behåller hela saken
    ag = dict(topp=0, b1=3, b2=3, h0=None, h1=3, h2=4); ag.update(snitt.get('agare', {}))
    c0 = b1 / 2
    if ag['h0'] is None: ag['h0'] = 0 if c0 < st else 1
    knopp(st, sy / 2, +1 if ag['topp'] == 0 else -1, 0, ag['topp'])
    knopp(b1, sy + (h - sy) * 0.38, -1 if ag['b1'] == 3 else +1, 0, ag['b1'])   # olika höjd: mittbiten snörs aldrig av
    knopp(b2, sy + (h - sy) * 0.68, +1 if ag['b2'] == 3 else -1, 0, ag['b2'])
    knopp(c0, sy, 0, +1 if ag['h0'] in (0, 1) else -1, ag['h0'])
    knopp((b1 + b2) / 2, sy, 0, +1 if ag['h1'] in (0, 1) else -1, ag['h1'])
    knopp((b2 + w) / 2, sy, 0, +1 if ag['h2'] in (0, 1) else -1, ag['h2'])
    return lab


def bildyta(p):
    w, h = BRADA_W * SS, BRADA_H * SS
    yta = Image.new('RGBA', (w, h), p['bg'] + (255,))
    rng = np.random.default_rng(1)
    korn = (rng.normal(0, 6, (h // 4, w // 4))).astype(np.int16)
    korn = np.array(Image.fromarray(np.clip(korn + 128, 0, 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)).astype(np.int16) - 128
    a = np.array(yta).astype(np.int16); a[:, :, :3] += korn[:, :, None]; yta = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    tom = yta.copy()
    im = Image.open(os.path.join(REPO, p['bild'])).convert('RGBA'); im = im.crop(im.getbbox())
    s = min(h * p['hojd'] / im.height, w * p.get('bredd', 0.92) / im.width)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    pos = (round((w - im.width) * p.get('xfast', 0.5)), round((h - im.height) * p.get('yfast', 1.0)))
    yta.alpha_composite(im, pos)
    return yta, tom, im, pos


def mjuk(mask_bool):
    m = Image.fromarray((mask_bool * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7 * SS))
    return m.resize((m.width // SS, m.height // SS), Image.LANCZOS)


def bygg(p):
    yta, tom, sak, pos = bildyta(p)
    w, h = yta.size
    lab = etiketter(w, h, p['snitt'])
    yta_s = yta.resize((w // SS, h // SS), Image.LANCZOS)
    bitar = []
    for i in range(5):
        alfa = mjuk(lab == i)
        topp = yta_s.copy(); topp.putalpha(alfa)
        ys, xs = np.where(np.array(alfa) > 0)
        bb = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
        bitar.append(dict(alfa=alfa.crop(bb), topp=topp.crop(bb), pos=(bb[0], bb[1])))
    for b in bitar:
        b['sprite_lyft'] = sprite(b, DJUP)
        b['sprite_ligg'] = sprite(b, 4)
    sak_s = sak.resize((sak.width // SS, sak.height // SS), Image.LANCZOS)
    sak_mitt = ((pos[0] + sak.width / 2) / SS, (pos[1] + sak.height / 2) / SS)
    return yta_s, tom.resize((w // SS, h // SS), Image.LANCZOS), sak_s, sak_mitt, bitar


def sprite(b, djup):
    """Tjock bit: sidan (mörkare kopia staplad nedåt), toppen med fasad kant (ljus uppe till vänster, skugga nere till höger)."""
    pad = djup + 4
    tw, th = b['topp'].size
    ut = Image.new('RGBA', (tw + 2 * pad, th + 2 * pad))
    a = np.array(b['alfa']).astype(np.float32) / 255
    tc = np.array(b['topp']).astype(np.float32)
    sida = tc.copy(); sida[:, :, :3] *= 0.62
    sida_im = Image.fromarray(sida.clip(0, 255).astype(np.uint8))
    for d in range(djup, 0, -1):
        ut.alpha_composite(sida_im, (pad, pad + d))
    # mörk kontur längs sidans nederkant
    # fasning på toppen
    ab = Image.fromarray((a * 255).astype(np.uint8))
    blur = np.array(ab.filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255
    inre = np.clip((a - blur) * 2.2, 0, 1)                   # band längs kanten
    gy, gx = np.gradient(np.array(ab.filter(ImageFilter.GaussianBlur(2))).astype(np.float32))
    ljus = np.clip((-gx - gy) / 40, -1, 1)                   # uppe/vänster = ljust, nere/höger = mörkt
    top = tc.copy()
    top[:, :, :3] += (inre * ljus * 70)[:, :, None]
    top[:, :, :3] += (np.clip(1 - blur, 0, 1) * a * 10)[:, :, None]   # lite glans i kanten
    kant = np.clip(a - np.array(ab.filter(ImageFilter.MinFilter(3))).astype(np.float32) / 255, 0, 1)
    top[:, :, :3] *= (1 - 0.35 * kant)[:, :, None]           # tunn mörk skarv runt biten
    ut.alpha_composite(Image.fromarray(top.clip(0, 255).astype(np.uint8)), (pad, pad))
    return ut, pad


_sk = {}
def skugga(sprite_im, lyft):
    lyft = round(lyft, 2)
    k = (id(sprite_im), lyft)
    if k not in _sk: _sk[k] = _skugga(sprite_im, lyft)
    return _sk[k]

def _skugga(sprite_im, lyft):
    a = sprite_im.getchannel('A').point(lambda v: int(v * (0.32 - 0.12 * lyft)))
    a = a.filter(ImageFilter.GaussianBlur(4 + 10 * lyft))
    s = Image.new('RGBA', sprite_im.size, (70, 50, 35, 0)); s.putalpha(a)
    return s


def bricka():
    """Pusselbrickan: en tjock kartongplatta med försänkt ruta."""
    m = 26
    bw, bh = BRADA_W + 2 * m, BRADA_H + 2 * m
    ut = Image.new('RGBA', (bw + 40, bh + 50))
    d = ImageDraw.Draw(ut)
    sk = Image.new('L', ut.size, 0); ImageDraw.Draw(sk).rounded_rectangle((20, 34, 20 + bw, 34 + bh), 30, fill=90)
    sk = sk.filter(ImageFilter.GaussianBlur(14))
    s = Image.new('RGBA', ut.size, (70, 50, 35, 0)); s.putalpha(sk); ut.alpha_composite(s)
    d.rounded_rectangle((20, 30, 20 + bw, 30 + bh), 30, fill=(214, 168, 112))        # kanten (sidan)
    d.rounded_rectangle((20, 20, 20 + bw, 20 + bh), 30, fill=(236, 198, 146))        # ovansidan
    d.rounded_rectangle((20 + m, 20 + m, 20 + m + BRADA_W, 20 + m + BRADA_H), 10, fill=(196, 150, 98))  # hålet
    # inre skugga i hålet (uppe och vänster)
    hs = Image.new('L', ut.size, 0)
    ImageDraw.Draw(hs).rounded_rectangle((20 + m, 20 + m, 20 + m + BRADA_W, 20 + m + BRADA_H), 10, fill=255)
    inner = Image.new('L', ut.size, 0)
    ImageDraw.Draw(inner).rounded_rectangle((20 + m + 7, 20 + m + 9, 20 + m + BRADA_W + 20, 20 + m + BRADA_H + 20), 10, fill=255)
    inner = inner.filter(ImageFilter.GaussianBlur(6))
    skug = np.clip(np.array(hs).astype(int) - np.array(inner).astype(int), 0, 255).astype(np.uint8)
    s2 = Image.new('RGBA', ut.size, (90, 60, 30, 0)); s2.putalpha(Image.fromarray((skug * 0.6).astype(np.uint8)))
    ut.alpha_composite(s2)
    return ut, (20 + m, 20 + m)


def lagg(ram, im, x, y, skala=1.0, vrid=0.0):
    if skala != 1 or vrid:
        im = im.resize((max(1, round(im.width * skala)), max(1, round(im.height * skala))), Image.BICUBIC)
        if vrid: im = im.rotate(vrid, Image.BICUBIC, expand=True)
    ram.alpha_composite(im, (int(round(x - im.width / 2)), int(round(y - im.height / 2))))



def lagg2(ram, im, x, y, sx=1.0, sy=1.0, vrid=0.0, botten=False):
    """Som lagg men med olika skala i x och y (squash). botten=True: (x, y) är bildens nederkant i mitten."""
    im = im.resize((max(1, round(im.width * sx)), max(1, round(im.height * sy))), Image.BICUBIC)
    if vrid: im = im.rotate(vrid, Image.BICUBIC, expand=True)
    yy = y - im.height if botten else y - im.height / 2
    ram.alpha_composite(im, (int(round(x - im.width / 2)), int(round(yy))))


_saksk = {}
def sakskugga(sak, lyft):
    k = (id(sak), round(lyft, 2))
    if k not in _saksk:
        a = sak.getchannel('A').point(lambda v: int(v * (0.30 - 0.12 * lyft))).filter(ImageFilter.GaussianBlur(5 + 8 * lyft))
        s = Image.new('RGBA', sak.size, (70, 50, 35, 0)); s.putalpha(a); _saksk[k] = s
    return _saksk[k]


LYFT, LAND = 0.5, 0.75   # popp ut ur bilden; sats + snäpp ner + fjädring
HALL = 0.6          # still före och efter rörelsen (reaktionsslag)
PASSA = 0.80        # lyft sak får högst så här stor del av skärmens höjd


def levande(typ, u):
    """Sakens rörelse u s efter att den lyfts ur bilden. Ger (dx, dy, sx, sy, vrid, lyft) och total längd.
    Urklipp vänds och snurrar aldrig (minnet Figurer snurrar inte): bara hopp, gupp, lutning och körning framåt."""
    if u < 0.1:                                        # hukar lite: laddar
        q = math.sin(math.pi / 2 * u / 0.1); return (0, 0, 1 + 0.05 * q, 1 - 0.07 * q, 0, 0)
    if u < LYFT:                                       # poppar ut med en liten översväng
        v = (u - 0.1) / (LYFT - 0.1); e = ease_ut_bak(v)
        s = 1 + 0.06 * e + 0.08 * math.sin(math.pi * v)
        return (0, -14 * e, s * (1 + 0.05 * (1 - v) ** 2), s * (1 - 0.07 * (1 - v) ** 2), 0, ease(v))
    u -= LYFT
    s0 = 1.06
    if u < HALL: return (0, -14, s0, s0, 0, 1)        # står still en stund: barnet hinner se hela saken
    u -= HALL
    def hopp(u, hojder, tid=0.62):
        for n, hh in enumerate(hojder):
            if u < tid:
                v = u / tid
                if v < 0.12:                           # sätter av: hukar
                    q = math.sin(math.pi * v / 0.12); return (0, -14, s0 * (1 + 0.06 * q), s0 * (1 - 0.08 * q), 0, 1)
                v2 = (v - 0.12) / 0.88
                return (0, -14 - hh * math.sin(math.pi * v2), s0 * (1 - 0.03 * math.sin(math.pi * v2)),
                        s0 * (1 + 0.05 * math.sin(math.pi * v2)), 0, 1)
            u -= tid
        return None
    if typ == 'studsa':                                # äpplet studsar tre gånger, allt lägre
        r = hopp(u, [70, 45, 25])
        if r: return r
        u -= 3 * 0.62
    elif typ == 'skutta':                              # kaninen skuttar två gånger och vickar glatt
        r = hopp(u, [80, 80], 0.7)
        if r: return r
        u -= 1.4
        if u < 1.6:
            return (0, -14, s0, s0, 5 * math.sin(u * math.pi * 2) * min(1, (1.6 - u) / 0.4 + 0.2), 1)
        u -= 1.6
    elif typ == 'kora':                                # bilen tutar, guppar, kör ut åt höger och in från vänster
        if u < 0.9:
            return (0, -14 + 3 * math.sin(u * 40), s0, s0, 0, 1)
        u -= 0.9
        if u < 1.1:
            e = easein(u / 1.1); return (e * (W / 2 + 420), -14 + 2 * math.sin(u * 40), s0, s0, -2 * e, 1)
        u -= 1.1
        if u < 1.4:
            e = ease(u / 1.4); return (-(W / 2 + 420) * (1 - e), -14 + 2 * math.sin(u * 40), s0, s0, 2 * (1 - e), 1)
        u -= 1.4
        if u < 0.3:                                    # bromsar: lutar fram lite
            return (0, -14, s0, s0, -3 * math.sin(math.pi * u / 0.3), 1)
        u -= 0.3
    elif typ == 'flyga':                               # flygplanet stiger snett uppåt höger, kommer in från vänster och glider ner
        if u < 1.2:
            e = easein(u / 1.2); return (e * (W / 2 + 420), -14 - e * 260, s0, s0, 5 * e, 1)
        u -= 1.2
        if u < 1.6:
            e = ease(u / 1.6); return (-(W / 2 + 420) * (1 - e), -14 - 200 * (1 - e), s0, s0, 5 * (1 - e), 1)
        u -= 1.6
        if u < 0.3:                                    # lite landningsguppet
            return (0, -14 + 4 * math.sin(math.pi * u / 0.3), s0, s0, 0, 1)
        u -= 0.3
    elif typ == 'gunga':                               # lugn gungning, lutar +-4 grader två gånger
        if u < 3.0:
            return (0, -14 + 3 * math.sin(u * math.pi * 2), s0, s0, 4 * math.sin(u * math.pi * 2), 1)
        u -= 3.0
    elif typ == 'singla':                              # flingan flyter upp och singlar ner
        if u < 0.8:
            e = easeio(u / 0.8); return (0, -14 - 40 * e, s0, s0, 0, 1)
        u -= 0.8
        if u < 2.0:
            e = easeio(u / 2.0)
            return (25 * math.sin(u * math.pi), -14 - 40 * (1 - e), s0, s0, 4 * math.sin(u * math.pi * 1.5), 1)
        u -= 2.0
    if u < HALL: return (0, -14, s0, s0, 0, 1)        # still igen före den sjunker tillbaka
    u -= HALL
    if u < 0.15:                                       # tar sats uppåt
        e = ease(u / 0.15); return (0, -14 - 22 * e, s0 * (1 - 0.03 * e), s0 * (1 + 0.04 * e), 0, 1)
    u -= 0.15
    if u < 0.25:                                       # snäpper ner i hålet
        e = easein(u / 0.25); return (0, -36 * (1 - e), s0 - 0.06 * e, s0 - 0.06 * e, 0, 1 - e)
    u -= 0.25
    if u < LAND - 0.4:                                 # landar: trycks ihop och fjädrar tillbaka
        v = u / (LAND - 0.4); q = math.sin(math.pi * v) * (1 - v)
        return (0, 0, 1 + 0.08 * q, 1 - 0.10 * q, 0, 0)
    return None


LEVANDE_LANGD = {k: LYFT + v + 2 * HALL + LAND for k, v in {
    'studsa': 3 * 0.62, 'skutta': 1.4 + 1.6, 'kora': 0.9 + 1.1 + 1.4 + 0.3,
    'flyga': 1.2 + 1.6 + 0.3, 'gunga': 3.0, 'singla': 0.8 + 2.0}.items()}


PLATSHALLARE = {'tindra-1.m4a', 'tindra-2.m4a'}   # "använd inte" enligt README
MAXLANGD = {'tuff-tuff': 2.5, 'bjallror': 2.5, 'vagor': 2.5, 'mums': 1.8, 'jubel': 1.5}   # s, tonas ut 0.4 s


MUSIK = {'pussel-vanliga': ('assets/ljud/musik/stada-radion-slinga.m4a', 0.13),
         'pussel-jul': ('assets/ljud/musik/jul/jul-badd-2.m4a', 0.10)}


def musikbadd(fil, langd, ut, mjuk=96):
    """Slingan upprepad exakt (takten glider aldrig) till langd s; sista 2 ms före varje skarv glider mot nästa varvs början."""
    import numpy as np, wave
    sr = 48000
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', fil, '-f', 'f32le', '-ac', '2', '-ar', str(sr), '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
    r = np.linspace(0, 1, mjuk)[:, None]
    a[-mjuk:] = a[-mjuk:] * (1 - r) + a[0] * r
    bed = np.tile(a, (int(langd * sr) // len(a) + 2, 1))[:int(langd * sr) + sr]
    with wave.open(ut, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((np.clip(bed, -1, 1) * 32767).astype('<i2').tobytes())


def ljudfil(mapp, n=0):
    """Fil nr n (roterar) i assets/ljud/effekter/<mapp>/, relativt repot."""
    filer = sorted(f for f in os.listdir(os.path.join(REPO, E, mapp)) if f.endswith('.m4a') and f not in PLATSHALLARE)
    return f'{E}{mapp}/{filer[n % len(filer)]}'


def levande_ljud(p, t0, k=0):
    """Ljuden till rörelsen: (fil, tid, volym). p['ljud'] = ljudmapp, annars de gamla fasta ljuden."""
    typ, lj = p['levande'], p.get('ljud')
    ut = []
    t = t0 + LYFT + HALL
    if typ == 'studsa':
        for n, v in enumerate([0.6, 0.45, 0.3]):
            ut.append((E + f'studs/studs-{n + 2}.m4a', t + 0.62 * (n + 1) - 0.02, v))
    elif typ == 'skutta':
        ut.append((ljudfil(lj, k) if lj else E + 'kanin-gullig/kanin-gullig-3.m4a', t - 0.3, 0.8))
        for n in range(2):
            ut.append((E + f'hopp-mjuk/hopp-mjuk-{n + 1}.m4a', t + 0.7 * n + 0.08, 0.3))
            ut.append((E + f'landa-mjuk/landa-mjuk-{n + 1}.m4a', t + 0.7 * (n + 1) - 0.02, 0.4))
    elif typ == 'kora':
        if lj:                                         # eget ljud: vid utkörning och vid inkomst, inget brum
            ut.append((ljudfil(lj, k), t + 0.9, 0.6))
            ut.append((ljudfil(lj, k), t + 0.9 + 1.1, 0.6))
        else:
            ut.append((E + 'tuta-tut/tuta-tut-1.m4a', t, 0.8))
            ut.append((E + 'brum/brum-1.m4a', t + 0.5, 0.35))
            ut.append((E + 'tuta-tut/tuta-tut-2.m4a', t + 0.9 + 1.1 + 1.4 + 0.1, 0.6))
    elif typ == 'flyga':
        ut.append((ljudfil(lj, k), t, 0.8))
    elif typ == 'gunga':
        ut.append((ljudfil(lj, k), t, 0.7))
        ut.append((E + 'glitter/glitter-2.m4a', t + 1.0, 0.25))
    elif typ == 'singla':
        ut.append((ljudfil(lj, k), t, 0.7))
    return ut


TYPSNITT = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf', 30)
def textrad(ram, text):
    d = ImageDraw.Draw(ram)
    tw = d.textlength(text, font=TYPSNITT)
    d.rounded_rectangle((W / 2 - tw / 2 - 18, H - 62, W / 2 + tw / 2 + 18, H - 16), 20, fill=(255, 255, 255, 230))
    d.text((W / 2 - tw / 2, H - 56), text, font=TYPSNITT, fill=(90, 70, 60))


class Tagningar:
    """Varje röstfil används högst en gång per film. Tar slut tagningarna blir det tyst."""
    def __init__(self):
        self.anv = set()
        self.n = 0          # pusslets nummer i filmen, för att rotera ljuden
    def ta(self, *prefix):
        for pre in prefix:
            for rid in REPLIKER:
                if (rid == pre or rid.startswith(pre + '-')) and rid not in self.anv and rid[len(pre):].lstrip('-').isdigit():
                    self.anv.add(rid); return rid
        return None


TIDER, BARA_TID = [], False     # BARA_TID: räkna bara ut tiderna (för stillbilder), rita inget


def rendera(p, rd, f0, ljud, tagn, forsta, sista):
    k = tagn.n; tagn.n += 1
    _sk.clear(); _saksk.clear()     # cachen nycklas på id(): förra pusslets bitar får annars ge sina skuggor åt de nya
    yta, tom, sak, sak_mitt, bitar = bygg(p)
    ext = Extra(p, sak, LEVANDE_LANGD[p['levande']])
    br, hal = bricka()
    bx, by = MITT[0] - br.width // 2, MITT[1] - br.height // 2
    ox, oy = bx + hal[0], by + hal[1]
    T0 = f0 / FPS
    rader = []                                         # (start, slut, text) för textraden

    def sag(rid, t):
        if not rid: return 0
        fil, d, text = replik(rid)
        if fil: ljud.append((fil, T0 + t, 1.0))
        rader.append((t, t + d + 0.3, text))
        return d

    t = 0.4
    t += sag('ska-vi-lagga' if forsta else tagn.ta('nytt-pussel'), t) + 0.9
    plan = []
    for n, (i, rid) in enumerate(p['ordning']):
        sida = -1 if n % 2 == 0 else 1
        fram = t + IN
        fil, d, _ = replik(rid)
        visa = max(VISA, 0.2 + d + 0.7)
        land = fram + visa + LAGG
        plan.append(dict(i=i, t=t, sida=sida, visa=visa))
        sag(rid, fram + 0.2)
        ljud.append((E + f'swoosh/swoosh-{(k + n) % 4 + 1}.m4a', T0 + t, 0.2))
        ljud.append((E + f'hopp-mjuk/hopp-mjuk-{n % 6 + 1}.m4a', T0 + fram + visa, 0.25))
        ljud.append((E + f'knack/knack-{n % 3 + 1}.m4a', T0 + land - 0.01, 0.55))
        if n == 4:
            ljud.append((E + 'ding/ding-1.m4a', T0 + land + 0.05, 0.4))
        t = land
        if n in TAKTER['dar'] and n != 4:
            d2 = sag(tagn.ta('dar', 'den-passar') if n == 0 else tagn.ta('den-passar', 'dar'), t + 0.45)
            t += 0.45 + d2 + 0.7
        else:
            t += MELLAN
        if n == 2:
            t += sag(tagn.ta('vad-blir-det'), t + 0.1) + 0.1 + FRAGA
    klar = t + 0.2
    ljud.append((E + f'glitter/glitter-{k % 4 + 1}.m4a', T0 + klar, 0.35))
    svar_t = klar + 1.1
    d = sag(p['svar'], svar_t)
    liv_t = svar_t + d + 0.5
    ljud.extend((f, T0 + tt, v) for f, tt, v in levande_ljud(p, liv_t, k))
    ljud.append((E + f'pop/pop-{k % 4 + 1}.m4a', T0 + liv_t + 0.08, 0.6))
    ljud.append((E + 'glitter/glitter-3.m4a', T0 + liv_t + 0.1, 0.2))
    ljud.append((E + f'duns/duns-{k % 4 + 1}.m4a', T0 + liv_t + LEVANDE_LANGD[p['levande']] - LAND + 0.38, 0.5))
    liv_slut = liv_t + LEVANDE_LANGD[p['levande']]
    if k % 2 == 0:
        ljud.append((E + f'jubel/jubel-{k // 2 % 4 + 1}.m4a', T0 + liv_slut - 0.6, 0.4))
    else:                                              # varannan gång tre små klapp i stället
        for j in range(3):
            ljud.append((E + f'klapp/klapp-{j % 2 + 1}.m4a', T0 + liv_slut - 0.6 + 0.28 * j, 0.5))
    slut = liv_slut + 0.8
    if sista:
        slut += sag('sa-fint-hej-da', liv_slut + 0.3) + 0.9

    n_rutor = int(slut * FPS)
    TIDER.append((p['namn'], T0 + liv_t, T0 + liv_slut))
    if BARA_TID: return n_rutor
    sx0, sy0 = ox + sak_mitt[0], oy + sak_mitt[1] + sak.height / 2      # sakens nederkant i mitten
    passa = min(1.0, PASSA * H / sak.height, 0.8 * W / sak.width)
    yfit = H / 2 + sak.height * passa / 2 + 40           # nederkant när den är lyft; luft ovanför för hoppen
    for f in range(n_rutor):
        tt = f / FPS
        ram = Image.new('RGBA', (W, H), PAPPER + (255,))
        ram.alpha_composite(br, (bx, by))
        q = tt - klar
        if q < 0:
            flyg = None
            for pl in plan:
                b = bitar[pl['i']]
                u = tt - pl['t']
                if u <= 0: continue
                malx = ox + b['pos'][0] + b['topp'].width / 2
                maly = oy + b['pos'][1] + b['topp'].height / 2
                if u >= IN + pl['visa'] + LAGG:
                    spr, _ = b['sprite_ligg']
                    v = u - (IN + pl['visa'] + LAGG)
                    s = 1 + 0.035 * math.sin(math.pi * v / 0.22) if v < 0.22 else 1
                    lagg(ram, skugga(spr, 0), malx + 2, maly + 3, s)
                    lagg(ram, spr, malx, maly, s)
                else:
                    flyg = (b, pl, u, malx, maly)
            if flyg:
                b, pl, u, malx, maly = flyg
                spr, _ = b['sprite_lyft']
                visx, visy = W / 2, MITT[1] - 10
                fx = W / 2 + pl['sida'] * (W / 2 + 300)
                if u < IN:
                    e = ease(u / IN); x = fx + (visx - fx) * e; y = visy - math.sin(math.pi * e) * 30
                    s, lyft, vr = 1.35, 1, pl['sida'] * -10 * (1 - e)
                elif u < IN + pl['visa']:
                    v = (u - IN) / pl['visa']
                    x, y = visx, visy + math.sin(v * math.pi * 2) * 4
                    s, lyft, vr = 1.35, 1, math.sin(v * math.pi * 2) * 3
                else:
                    e = easeio((u - IN - pl['visa']) / LAGG)
                    x = visx + (malx - visx) * e; y = visy + (maly - visy) * e - math.sin(math.pi * e) * 60
                    s, lyft, vr = 1.35 - 0.35 * e, 1 - e, 0
                lagg(ram, skugga(spr, lyft), x + 10 + 26 * lyft, y + 14 + 34 * lyft, s, vr)
                lagg(ram, spr, x, y - 10 * lyft, s, vr)
        else:
            # klar: skarvarna tonas bort, sedan lyfter saken ur bilden och blir levande
            liv = levande(p['levande'], tt - liv_t) if tt >= liv_t else None
            if liv:
                ram.alpha_composite(tom, (ox, oy))
                dx, dy, sx, sy, vr, lyft = liv
                rk = p.get('riktning', 1); dx *= rk; vr *= rk          # kälken kör åt vänster, dit den pekar
                bild, _ = ext.bild(tt - liv_t)
                # lyft: krymper så hela saken syns och flyttar till mitten av skärmen
                g = 1 + (passa - 1) * lyft
                bx_ = sx0 + (W / 2 - sx0) * lyft + dx
                by_ = sy0 + (yfit - sy0) * lyft
                gnistor(ram, MITT[0], MITT[1], BRADA_W * 0.5 + 10, BRADA_H * 0.5 + 10, tt - liv_t - 0.12, 18, seed=k)   # bakom saken
                lagg2(ram, sakskugga(sak, lyft), bx_ + 8 + 14 * lyft, by_ + 6 + 10 * lyft, sx * g, g, 0, botten=True)
                lagg2(ram, bild, bx_, by_ + dy * g, sx * g, sy * g, vr, botten=True)
                ext.ovanpa(ram, tt - liv_t, bx_, by_ + dy * g, sak.width * sx * g, sak.height * sy * g)
            else:
                # små skarvar kvar i 0,5 s, sedan hel bild
                for pl in plan:
                    b = bitar[pl['i']]; spr, _ = b['sprite_ligg']
                    lagg(ram, spr, ox + b['pos'][0] + b['topp'].width / 2, oy + b['pos'][1] + b['topp'].height / 2)
                a = min(1, q / 0.5)
                hel = yta.copy(); hel.putalpha(Image.new('L', yta.size, int(255 * a)))
                ram.alpha_composite(hel, (ox, oy))
        if q >= 0:                                     # gnistor när saken poppar ut och när den snäpper tillbaka
            uu = tt - liv_t; TL = LEVANDE_LANGD[p['levande']]
            gnistor(ram, MITT[0], MITT[1], BRADA_W * 0.5 + 20, BRADA_H * 0.5 + 20, uu - (TL - LAND + 0.38), 12, seed=k + 50, liten=True)
        if VISA_TEXT:
            for a_, b_, text in rader:
                if a_ <= tt < b_: textrad(ram, text)
        ram.convert('RGB').save(f'{rd}/{f0 + f:05d}.png')
    return n_rutor


VISA_TEXT = True     # sätts till False när alla röster finns


def skriv_rost():
    """Skriver rost.txt ur REPLIKER: delade repliker först, sedan per pussel, sist hejdå."""
    delade = ['ska-vi-lagga', 'nytt-pussel', 'dar', 'den-passar', 'vad-blir-det']
    ids = [r for r in REPLIKER if r.rsplit('-', 1)[0] in delade or r == 'ska-vi-lagga']
    ids += [r for r in REPLIKER if r not in ids and r != 'sa-fint-hej-da'] + ['sa-fint-hej-da']
    with open(os.path.join(UT, 'rost.txt'), 'w') as f:
        for r in ids: f.write(f'{r:<20}{REPLIKER[r]}\n')


def remsa(p):
    """remsor/remsa-<namn>.png: hela bilden med snitten, sedan de 5 bitarna i ordning med ledtråd (snabbt, ingen video)."""
    yta, tom, sak, sak_mitt, bitar = bygg(p)
    HH, pad = 300, 16
    sk = HH / yta.height
    hel = yta.resize((round(yta.width * sk), HH), Image.LANCZOS)
    lab = etiketter(yta.width * SS, yta.height * SS, p['snitt'])[::SS, ::SS]
    kant = (lab[:, 1:] != lab[:, :-1])[:-1, :] | (lab[1:, :] != lab[:-1, :])[:, :-1]
    kk = Image.fromarray((kant * 255).astype(np.uint8)).resize(hel.size, Image.BILINEAR).point(lambda v: v // 3)
    hel.paste((60, 40, 30), mask=kk)
    ft = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf', 16)
    spr = [(n, i, replik(rid)[2]) for n, (i, rid) in enumerate(p['ordning'])]
    celler = [(hel, 'hela bilden')] + [(bitar[i]['sprite_ligg'][0], f'{n + 1}. {text}') for n, i, text in spr]
    skal = [min(1, (HH - 30) / c.height) for c, _ in celler]
    bredd = [max(round(c.width * k), 150) for (c, _), k in zip(celler, skal)]
    ut = Image.new('RGBA', (sum(bredd) + pad * (len(celler) + 1), HH + 50), PAPPER + (255,))
    d = ImageDraw.Draw(ut); x = pad
    for (c, txt), k, bw in zip(celler, skal, bredd):
        c2 = c.resize((max(1, round(c.width * k)), max(1, round(c.height * k))), Image.LANCZOS)
        ut.alpha_composite(c2, (x + (bw - c2.width) // 2, 10 + (HH - 30 - c2.height) // 2))
        d.text((x + bw / 2, HH - 6), txt, font=ft, fill=(90, 70, 60), anchor='mm')
        x += bw + pad
    mapp = os.path.join(UT, 'remsor'); os.makedirs(mapp, exist_ok=True)
    fil = os.path.join(mapp, f"remsa-{p['namn']}.png"); ut.convert('RGB').save(fil); print(fil)


if __name__ == '__main__':
    import sys, shutil
    a = sys.argv[1:]
    if '--rost' in a:
        skriv_rost(); sys.exit()
    if a and a[0] == '--remsa':
        for p in PUSSEL:
            if p['namn'] in a[1:]: remsa(p)
        sys.exit()
    if not a: namn = 'pussel-prov-3'
    elif a[0] in FILMER: namn = a[0]
    else: namn = 'pussel-test'
    lista = FILMER[a[0]] if a and a[0] in FILMER else (a or FILMER['pussel-prov-3'])
    val = [next(p for p in PUSSEL if p['namn'] == n) for n in lista]
    VISA_TEXT = any(replik(r)[0] is None for r in REPLIKER)
    rd = os.path.join(UT, 'rutor-' + namn); os.makedirs(rd, exist_ok=True)
    for x in os.listdir(rd): os.remove(os.path.join(rd, x))
    ljud, f0, tagn = [], 0, Tagningar()
    for k, p in enumerate(val):
        f0 += rendera(p, rd, f0, ljud, tagn, k == 0, k == len(val) - 1)
    total = f0 / FPS
    args, filt, lab = [], [], []
    musik, mvol = MUSIK.get(namn, MUSIK['pussel-vanliga'])
    badd = os.path.join(UT, f'badd-{namn}.wav'); musikbadd(os.path.join(REPO, musik), total, badd)
    args += ['-i', badd]
    filt.append(f'[1:a]volume={mvol},afade=t=out:st={max(total - 1.5, 0)}:d=1.5[m]')
    lab.append('[m]')
    for k, (fil, tid, vol) in enumerate(ljud):
        args += ['-i', fil if fil.startswith('/') else os.path.join(REPO, fil)]
        L = MAXLANGD.get(os.path.basename(os.path.dirname(fil)))
        kort = f'atrim=0:{L},afade=t=out:st={L - 0.4}:d=0.4,' if L else ''
        filt.append(f'[{k + 2}:a]aformat=channel_layouts=stereo,{kort}adelay={int(tid * 1000)}:all=1,volume={vol}[a{k}]')
        lab.append(f'[a{k}]')
    filt.append(''.join(lab) + f'amix=inputs={len(lab)}:normalize=0,apad,atrim=0:{total}[ut]')
    film = os.path.join(UT, namn + '.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{rd}/%05d.png', *args,
                    '-filter_complex', ';'.join(filt), '-map', '0:v', '-map', '[ut]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
                    '-crf', '18', '-c:a', 'aac', '-shortest', film], check=True)
    shutil.rmtree(rd); os.remove(badd)
    print(film, round(total, 1), 's', '(textrad: rösterna saknas)' if VISA_TEXT else '')
