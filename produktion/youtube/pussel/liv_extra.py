"""Extra liv i pusslets slut, ritat i kod ovanpå urklippet:
anga  – ånga stiger (gröten, julskinkan)
lysa  – ljusen och stjärnan i granen glimmar
vinka – blinkar två gånger och vinkar med armen bakom kroppen (tomten, snögubben)
u = sekunder sedan saken lyfte ur bilden, T = hela levande-tiden."""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

# per pussel: var ångan börjar (andel av bilden) och var armen sitter
ANGA = {'groten': dict(x=(0.32, 0.47, 0.62), y=0.22), 'julskinkan': dict(x=(0.30, 0.45, 0.60), y=0.06)}
VINKA = {'tomten': dict(ogon=(0.40, 0.55), axel=(0.80, 0.60), arm=0.24, vante=True),
         'snogubben': dict(ogon=(0.10, 0.22), axel=(0.84, 0.42), arm=0.30, vante=False)}
BLINK = ((0.95, 0.14), (2.05, 0.14))        # (start, längd) s


def _rund(t): return 0.5 - 0.5 * math.cos(math.pi * min(1, max(0, t)))


def _in_ut(u, T, d=0.4): return min(_rund(u / d), _rund((T - u) / d))


class Extra:
    def __init__(self, p, sak, T):
        self.typ, self.namn, self.T, self.sak = p.get('extra'), p['namn'], T, sak
        self.pad = 0
        if self.typ == 'lysa': self._lysa_prep()
        if self.typ == 'vinka': self._vinka_prep()

    # ---------- bild som följer med rörelsen ----------
    def bild(self, u):
        """Urklippet för den här rutan; pad = extra marginal runt (för armen)."""
        if self.typ == 'lysa': return self._lysa(u), 0
        if self.typ == 'vinka': return self._vinka(u), self.pad
        return self.sak, 0

    # ---------- ånga, ritas på ramen ovanför ----------
    def ovanpa(self, ram, u, xm, yb, w, h):
        """xm, yb: sakens nederkant i mitten på ramen; w, h: sakens storlek på ramen."""
        if self.typ != 'anga': return
        c = ANGA[self.namn]; a0 = _in_ut(u - 0.2, self.T - 0.2, 0.6)
        if a0 <= 0: return
        hojd = 0.55 * h; bred = int(w * 0.7 + 80)
        lag = Image.new('RGBA', (bred, int(hojd + 60)), (0, 0, 0, 0)); d = ImageDraw.Draw(lag)
        for i, rx in enumerate(c['x']):
            x0 = (rx - 0.5) * w + bred / 2
            for j in range(26):
                hh = (j / 26 + u * 0.35 + i * 0.29) % 1.0          # stiger hela tiden, börjar om nertill
                x = x0 + 0.045 * w * math.sin(2 * math.pi * (hh * 1.1 - u * 0.6) + i * 2)
                y = lag.height - 20 - hh * hojd
                r = (0.018 + 0.03 * hh) * w
                al = int(150 * a0 * math.sin(math.pi * hh) ** 1.5)
                d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 252, 246, al))
        lag = lag.filter(ImageFilter.GaussianBlur(max(2, w * 0.012)))
        ram.alpha_composite(lag, (int(xm - bred / 2), int(yb - h * (1 - c['y']) - lag.height + 20)))

    # ---------- granen lyser ----------
    def _lysa_prep(self):
        a = np.array(self.sak).astype(int)
        r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
        gul = (al > 200) & (r > 215) & (g > 175) & (b < 170)
        lab, n = ndimage.label(gul)
        storl = ndimage.sum(gul, lab, range(1, n + 1))
        stjarna = int(np.argmax(storl)) + 1
        self.lager = []
        H, W = gul.shape
        for grp in range(4):                                # fyra grupper som glimmar i otakt; stjärnan egen
            m = np.isin(lab, [k + 1 for k in range(n) if k + 1 != stjarna and storl[k] >= 3 and k % 3 == grp]) if grp < 3 else lab == stjarna
            mi = Image.fromarray((m * 255).astype(np.uint8))
            sken = mi.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(W * (0.012 if grp < 3 else 0.03)))
            sken = sken.point(lambda v: min(255, v * (3 if grp < 3 else 2)))
            lagret = Image.new('RGBA', (W, H), (255, 236, 150, 0)); lagret.putalpha(sken)
            karna = Image.new('RGBA', (W, H), (255, 252, 225, 0)); karna.putalpha(mi.filter(ImageFilter.GaussianBlur(0.8)))
            self.lager.append((lagret, karna))

    def _lysa(self, u):
        a0 = _in_ut(u - 0.35, self.T - 0.35)
        if a0 <= 0: return self.sak
        im = self.sak.copy()
        for grp, (sken, karna) in enumerate(self.lager):
            f = a0 * ((0.5 + 0.5 * math.sin(2 * math.pi * (u * 1.3 + grp / 3))) if grp < 3 else (0.65 + 0.35 * math.sin(2 * math.pi * u * 0.7)))
            for lag in (sken, karna):
                l2 = lag.copy(); l2.putalpha(lag.getchannel('A').point(lambda v: int(v * f)))
                im.alpha_composite(l2)
        return im

    # ---------- blinka och vinka ----------
    def _vinka_prep(self):
        c = VINKA[self.namn]; sak = self.sak
        a = np.array(sak).astype(int); H, W = a.shape[:2]
        mork = (a[..., 3] > 200) & (a[..., :3].sum(-1) < 220)
        mork[:int(c['ogon'][0] * H)] = 0; mork[int(c['ogon'][1] * H):] = 0
        lab, n = ndimage.label(mork)
        storl = ndimage.sum(mork, lab, range(1, n + 1))
        self.ogon = []
        for k in np.argsort(storl)[::-1][:2]:
            ys, xs = np.where(lab == k + 1)
            cx, cy, r = xs.mean(), ys.mean(), math.sqrt(len(xs) / math.pi)
            ring = [(int(cx + 2.2 * r * math.cos(v)), int(cy - 2.2 * r * abs(math.sin(v)))) for v in np.linspace(0.3, 2.8, 9)]
            hud = np.median([a[y, x, :3] for x, y in ring if 0 <= x < W and 0 <= y < H], axis=0)
            self.ogon.append((cx, cy, r, tuple(int(v) for v in hud)))
        kant = max(3, round(H * 0.011))                    # vit klistermärkeskant, som urklippen
        self.pad = int(W * 0.45)
        bas = sak
        if c['vante']:
            bas, self.vante = self._lossa_vante(a, kant)
        self.bas = bas
        self.kant, self.c, self.W, self.H = kant, c, W, H
        rod = (a[..., 3] > 200) & (a[..., 0] > a[..., 1] + 70)
        rod[:int(0.55 * H)] = 0
        self.rock = tuple(int(v) for v in np.median(a[rod][:, :3], axis=0)) if rod.any() else (200, 60, 50)

    def _lossa_vante(self, a, kant):
        """Högra vanten blir en egen bit; rocken under fylls med närmaste färg och kanten ritas om."""
        H, W = a.shape[:2]
        gron = (a[..., 3] > 150) & (a[..., 1] > a[..., 0] + 15) & (a[..., 1] >= a[..., 2])
        gron[:, :int(0.75 * W)] = 0
        lab, n = ndimage.label(gron)
        vm = lab == (int(np.argmax(ndimage.sum(gron, lab, range(1, n + 1)))) + 1)
        vm = ndimage.binary_closing(vm, iterations=2)
        vit = (a[..., :3].min(-1) > 215) & (a[..., 3] > 100)
        vkant = ndimage.binary_dilation(vm, iterations=kant + 2) & vit & ~vm
        bort = vm | vkant
        # vanten som egen bit
        ys, xs = np.where(bort)
        bit = np.zeros_like(a); bit[bort] = a[bort]
        self.vante_mitt = (xs.mean(), ys.mean())
        vante = Image.fromarray(bit[ys.min():ys.max() + 1, xs.min():xs.max() + 1].astype(np.uint8), 'RGBA')
        # rockens högerkant rad för rad, tagen ovanför och under vanten
        kropp = (a[..., 3] > 150) & ~bort & ~vit
        y0, y1 = ys.min(), ys.max()
        def hoger(y):
            x = np.where(kropp[y])[0]; return x.max() if len(x) else None
        yo = next(y for y in range(y0 - 1, 0, -1) if hoger(y) is not None)
        yu = next(y for y in range(y1 + 1, H) if hoger(y) is not None)
        ny = a.copy()
        idx = ndimage.distance_transform_edt(~kropp, return_distances=False, return_indices=True)
        for y in range(y0, y1 + 1):
            t = (y - yo) / max(1, yu - yo); kx = hoger(yo) * (1 - t) + hoger(yu) * t
            for x in np.where(bort[y])[0]:
                if x <= kx: ny[y, x] = a[idx[0][y, x], idx[1][y, x]]
                elif x <= kx + kant: ny[y, x] = (252, 251, 248, 255)
                else: ny[y, x, 3] = 0
        return Image.fromarray(ny.astype(np.uint8), 'RGBA'), vante

    def _arm(self, vinkel):
        """Armen som eget lager i storleken (W+2pad, H+pad): ärm + vante, eller en pinne. vinkel i grader, 0 = rakt åt höger."""
        c, W, H, k = self.c, self.W, self.H, self.kant
        P = self.pad
        lag = Image.new('RGBA', (W + 2 * P, H + P), (0, 0, 0, 0)); d = ImageDraw.Draw(lag)
        ax, ay = P + c['axel'][0] * W, P + c['axel'][1] * H
        L = c['arm'] * H; v = math.radians(-vinkel)
        ex, ey = ax + L * math.cos(v), ay + L * math.sin(v)
        if c['vante']:
            tj = 0.11 * W
            d.line((ax, ay, ex, ey), fill=(252, 251, 248, 255), width=int(tj + 2 * k)); d.ellipse((ex - tj / 2 - k, ey - tj / 2 - k, ex + tj / 2 + k, ey + tj / 2 + k), fill=(252, 251, 248, 255))
            mork = tuple(int(x * 0.8) for x in self.rock)
            d.line((ax, ay, ex, ey), fill=mork, width=int(tj)); d.line((ax, ay, ex, ey), fill=self.rock, width=int(tj * 0.7))
            d.ellipse((ex - tj / 2, ey - tj / 2, ex + tj / 2, ey + tj / 2), fill=mork)
            vt = self.vante.rotate(vinkel - 60, Image.BICUBIC, expand=True)
            lag.alpha_composite(vt, (int(ex + 0.25 * tj * math.cos(v) - vt.width / 2), int(ey + 0.25 * tj * math.sin(v) - vt.height / 2)))
        else:                                              # snögubbens pinnarm med en liten kvist
            tj = max(4, 0.032 * W)
            kv = (ax + 0.62 * L * math.cos(v), ay + 0.62 * L * math.sin(v))
            v2 = v - math.radians(38); kt = (kv[0] + 0.3 * L * math.cos(v2), kv[1] + 0.3 * L * math.sin(v2))
            for col, w in (((252, 251, 248, 255), tj + 2 * k), ((112, 72, 42, 255), tj), ((140, 92, 56, 255), tj * 0.5)):
                d.line((ax, ay, ex, ey), fill=col, width=int(w)); d.line((*kv, *kt), fill=col, width=int(w * 0.8))
                for x, y, ww in ((ex, ey, w), (kt[0], kt[1], w * 0.8)):
                    d.ellipse((x - ww / 2, y - ww / 2, x + ww / 2, y + ww / 2), fill=col)
        return lag.filter(ImageFilter.GaussianBlur(0.6))

    def _vinka(self, u):
        a0 = _in_ut(u - 0.3, self.T - 0.3, 0.35)
        W, H, P = self.W, self.H, self.pad
        # vinkar två gånger fram och tillbaka; armen uppe 40-75 grader, i vila ner vid sidan
        upp = a0
        vink = 18 * math.sin(2 * math.pi * 1.6 * max(0, u - 0.5)) * a0
        vila = -60 if self.c['vante'] else -25
        vinkel = vila + (55 - vila) * upp + vink
        ut = Image.new('RGBA', (W + 2 * P, H + P), (0, 0, 0, 0))
        ut.alpha_composite(self._arm(vinkel))
        if not self.c['vante']:                            # snögubben: vänstra pinnen står still
            ut.alpha_composite(self._arm(vila).transpose(Image.FLIP_LEFT_RIGHT))
        kropp = self.bas.copy(); d = ImageDraw.Draw(kropp)
        for b0, bl in BLINK:                               # blinkar: ögonlocket ner och upp
            q = (u - b0) / bl
            if 0 <= q <= 1:
                stang = math.sin(math.pi * q)
                for cx, cy, r, hud in self.ogon:
                    R = r * 1.35
                    d.ellipse((cx - R, cy - R, cx + R, cy + R * (2 * stang - 1)), fill=hud + (255,))
                    if stang > 0.6:
                        d.arc((cx - r * 1.1, cy - r * 0.9, cx + r * 1.1, cy + r * 0.7), 20, 160, fill=(45, 35, 30, 255), width=max(2, int(r * 0.5)))
        ut.alpha_composite(kropp, (P, P))
        return ut
