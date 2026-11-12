# Kattens rörelse i provet (135 bildrutor, 0:15.6–0:20.1): hon går in från vänster, stannar bakom handfatet, blir glad och vinkar.
# Tiderna följer 2D-scenen (prov-030-katt/figur/delar.json: går till ruta ca 88, armarna upp 88–100, vinkar 103–135, glada ögon från ca 93),
# men rörelsen är gjord för 3D-riggen: fötter som står stilla på golvet medan kroppen går över dem, tyngd i stegen, armpendling,
# vinkning från axeln, och öron och svans som släpar efter. Allt sätts som nyckelbilder på armaturen. Används av bygg3d.py.
import math
import numpy as np
from mathutils import Quaternion, Vector
from katt3d import KS, HOFT_X, SVANS_BEN, stall

RUTOR = 135
START_X, STOPP = -905.0, 99        # där hon börjar (px från slutplatsen, i världens mått) och rutan där hon står still
STEG = 13                          # bildrutor per steg (2,3 steg i sekunden: små lugna steg på korta ben)
SVING = 10                         # bildrutor som en fot är i luften
VRID = math.radians(50)            # så mycket är hon vriden åt gångriktningen (0 = rakt mot kameran)
X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))
q = lambda axel, grader: Quaternion(axel, math.radians(grader))
ss = lambda a, b, x: (lambda t: t * t * (3 - 2 * t))(min(max((x - a) / (b - a), 0.0), 1.0))

def bana():
    """Kroppens väg: jämn fart och sedan en lång, mjuk inbromsning. Ger x(ruta), fart(ruta) (px per ruta), för ruta −40 … RUTOR."""
    f = np.arange(-40, RUTOR + 1); v = np.array([1 - ss(44, STOPP, t) for t in f], float); v *= -START_X / v[f > 1].sum()
    x = START_X + np.cumsum(v) - np.cumsum(v)[f == 1][0] + 0.0; return f, x, v

class Fjader:
    """Dämpad fjäder för det som släpar efter (öron, svans)."""
    def __init__(s, styvhet, dampning): s.k, s.c, s.x, s.v = styvhet, dampning, 0.0, 0.0
    def steg(s, mal):
        for _ in range(4): s.v += ((mal - s.x) * s.k - s.v * s.c) / 4; s.x += s.v / 4
        return s.x

def animera(ao, vila, delar):
    f, bx, bv = bana(); v0 = bv.max(); i_av = lambda t: int(np.clip(round(t) + 40, 0, len(f) - 1))
    xb = lambda t: float(np.interp(t, f, bx)); gang = lambda t: float(np.interp(t, f, bv)) / v0                 # gang: 1 = full gång, 0 = står
    vrid = lambda t: VRID * (1 - ss(62, STOPP + 2, t))
    # --- fötterna: varje fot står still på golvet tills den lyfts och sätts ner där höften kommer att vara mitt i nästa stöd ---------------
    def fotplats(t, sgn):
        a = vrid(t); return np.array([xb(t) + sgn * HOFT_X * KS * math.cos(a), sgn * HOFT_X * KS * math.sin(a)]), a
    spar = {}
    for sgn, sida, fas in ((-1, 'V', 0), (1, 'H', STEG)):
        stod = 2 * STEG - SVING; t = -36 + fas; p, a = fotplats(t + stod / 2, sgn); lista = []      # (lyft, landa, från, till, vinkel från, vinkel till)
        while t < RUTOR + 30:
            lyft = t + stod; landa = lyft + SVING; p2, a2 = fotplats(landa + stod / 2, sgn)
            if np.linalg.norm(p2 - p) > 1.0: lista.append((lyft, landa, p, p2, a, a2))
            p, a, t = p2, a2, landa
        spar[sida] = lista
    def fot(t, sida):
        """Fotens läge (x, y, z över golvet), vridning och tålutning vid rutan t."""
        lista = spar[sida]; p, a, z, lut = lista[0][2], lista[0][4], 0.0, 0.0
        for lyft, landa, p0, p1, a0, a1 in lista:
            if t >= landa: p, a = p1, a1
            elif t > lyft:
                u = (t - lyft) / (landa - lyft); e = (1 - math.cos(math.pi * u)) / 2; lang = np.linalg.norm(p1 - p0); st = min(lang / 150, 1.0)
                p, a = p0 + (p1 - p0) * e, a0 + (a1 - a0) * e; z = (10 + 20 * st) * math.sin(math.pi * u) ** 0.9; lut = st * (24 * math.sin(math.pi * min(u * 1.6, 1)) * (1 - u) - 10 * ss(0.55, 0.95, u) * (1 - ss(0.95, 1.0, u)))
                break
            else: break
        return p, a, z, lut
    senaste_landning = lambda t: max([l[1] for s in 'VH' for l in spar[s] if l[1] <= t] or [-99])
    stodsida = lambda t: sum((1 if s == 'H' else -1) * (0 if any(l[0] < t < l[1] for l in spar[s]) else 1) for s in 'VH')   # +1 = står på höger, −1 = vänster, 0 = båda

    ora_f = {s: (Fjader(0.20 + 0.03 * i, 0.30), Fjader(0.17 + 0.03 * i, 0.26)) for i, s in enumerate('VH')}
    svans_f, svans_g = Fjader(0.07, 0.20), Fjader(0.10, 0.22)
    for s in ora_f.values():
        for fj in s: fj.x = 0.0
    hoft = {}; tidigare = None; mjuk_sida = [0.0]
    for t in range(-30, RUTOR + 1):
        g = gang(t); a = vrid(t); fas = 2 * math.pi * (t - senaste_landning(t) - 2) / STEG
        gupp = (-9 * g - 6.5 * g * math.cos(fas)) * KS                                             # lägst strax efter att foten landat, högst mitt i steget
        mjuk_sida[0] += (stodsida(t) - mjuk_sida[0]) * 0.22; self_sida = mjuk_sida[0]
        # stanna: sätter sig lite (trycks ihop) och fjädrar upp; vinkar: lutar sig lite åt höger
        satt = 0.035 * math.exp(-((t - (STOPP - 1)) / 4.0) ** 2) - 0.014 * math.exp(-((t - (STOPP + 6)) / 4.5) ** 2); andas = 0.006 * math.sin(2 * math.pi * (t - 100) / 52) * ss(104, 116, t)
        vink = ss(100, 112, t); luta = 3.2 * vink + 0.8 * math.sin(2 * math.pi * (t - 110) / 26) * ss(108, 118, t)
        pos = Vector((xb(t) + 5.5 * self_sida * g * math.cos(a) + 10 * vink, 5.5 * self_sida * g * math.sin(a), gupp))
        rot = q(Y, 3.4 * g + 2.0 * self_sida * g * math.sin(a) + 0.5 * luta) @ q(X, -2.0 * self_sida * g * math.cos(a)) @ Quaternion(Z, a)
        tryck = satt + andas; hoft[t] = (pos, a)
        # det som släpar efter: farten ändras → öronen och svansen hänger kvar
        fart = Vector((pos.x, pos.y, pos.z)); acc = Vector((0, 0, 0))
        if tidigare is not None and tidigare[1] is not None: acc = fart - 2 * tidigare[0] + tidigare[1]
        tidigare = (fart, tidigare[0] if tidigare else None)
        fram_acc = acc.x * math.sin(a) * -1 + 0.0; sid_acc = acc.x * math.cos(a)                 # i kattens egna axlar: framåt (−y hos katten) och åt sidan (+x)
        oron = {s: (ora_f[s][0].steg(-1.6 * acc.z - 1.2 * fram_acc), ora_f[s][1].steg(-2.2 * sid_acc - 0.9 * luta)) for s in 'VH'}
        sv_slap = svans_f.steg(34 * g + 0 * a); sv_gung = svans_g.steg(-3.0 * sid_acc)
        if t < 1: continue
        stall(ao, vila, 'hofter', rot=rot, flytt=pos / KS, skala=(1 + tryck / 2, 1 + tryck / 2, 1 - tryck), ruta=t)
        stall(ao, vila, 'brost', rot=q(Y, 0.5 * luta + 1.2 * g * math.sin(fas) * 0.4) @ q(X, 1.4 * g * math.cos(fas)), ruta=t)
        for sgn, s in ((-1, 'V'), (1, 'H')):
            p, fa, fz, lut = fot(t, s); vilo = Vector((sgn * HOFT_X * KS, 0, 0))
            stall(ao, vila, f'fot_ik.{s}', rot=Quaternion(Z, fa) @ q(X, lut), flytt=(Vector((p[0], p[1], fz * KS)) - vilo) / KS, ruta=t)
            # armarna pendlar mot benen (höger arm fram när vänster fot är fram), lite böjda och nära kroppen
            motfot, _, _, _ = fot(t, 'H' if s == 'V' else 'V'); fram = ((motfot[0] - xb(t)) * math.sin(a) - motfot[1] * math.cos(a)) / (75 * KS)            # −1 … 1: motsatta foten bak … fram
            pend = float(np.clip(fram, -1.2, 1.2)) * 20 * g
            if s == 'V':
                ut = 7 * ss(86, 100, t) - 3 * vink
                stall(ao, vila, f'overarm.{s}', rot=q(Y, sgn * 6 * g + ut) @ q(X, -pend - 3 * g), ruta=t)
                stall(ao, vila, f'underarm.{s}', rot=q(X, -(14 + 0.5 * pend) * g), ruta=t); stall(ao, vila, f'tass.{s}', rot=q(X, -6 * g), ruta=t)
            else:
                # vinkningen: tar sats (armen lite ner och in), lyfter från axeln, och underarmen och tassen viftar med lite eftersläp
                sats = math.exp(-((t - 97) / 3.0) ** 2); lyft = ss(98, 110, t); t0 = 109.0; per = 13.0; w = 2 * math.pi * (t - t0) / per; pa = ss(107, 112, t) * (1 - 0.35 * ss(128, 136, t))
                stall(ao, vila, f'overarm.{s}', rot=q(Y, sgn * 6 * g + 5 * sats - 96 * lyft - 5 * pa * math.sin(w)) @ q(X, -pend - 3 * g - 14 * lyft), ruta=t)
                stall(ao, vila, f'underarm.{s}', rot=q(Y, -20 * lyft - 22 * pa * math.sin(w - 0.5)) @ q(X, -(14 + 0.5 * pend) * g - 8 * lyft), ruta=t)
                stall(ao, vila, f'tass.{s}', rot=q(Y, -8 * lyft - 15 * pa * math.sin(w - 1.1)) @ q(X, -6 * g), ruta=t)
            # öronen: fjädrar fram och bak i stegen, hänger kvar när hon stannar, och det yttre ledet släpar mest
            fb, sd = oron[s]; fb, sd = float(np.clip(fb, -16, 16)), float(np.clip(sd, -14, 14)); glad = 5 * math.exp(-((t - 103) / 3.0) ** 2)      # ett litet ryck när hon blir glad
            stall(ao, vila, f'ora.{s}', rot=q(X, 0.7 * fb) @ q(Y, 0.7 * sd + sgn * (-glad)), ruta=t); stall(ao, vila, f'ora2.{s}', rot=q(X, 1.1 * fb) @ q(Y, 1.0 * sd + sgn * (-0.6 * glad)), ruta=t)
        # svansen: släpar bakom henne när hon går, svänger ut när hon stannar och gungar sedan lugnt, som en våg från roten till tippen
        for k in range(SVANS_BEN):
            vag = math.sin(2 * math.pi * t / 30 - 0.55 * k); gung = (1.2 + 0.45 * k) * vag * (0.55 + 0.45 * (1 - g))
            stall(ao, vila, f'svans{k}', rot=q(Z, (sv_slap * (0.42 if k == 0 else 0.10) if k < 5 else 0) + 0.35 * gung + (0.5 * sv_gung if k < 4 else 0)) @ q(Y, gung * (0.5 if k < 3 else 1.0) - 0.25 * sv_gung * (k >= 3) + (7.5 * vink if 1 <= k <= 3 else 0)), ruta=t)   # ner och ut när hon vinkar, så att tassen syns fri
        # --- ansiktet ---------------------------------------------------------------------------------------------------------------
        blink = max(math.exp(-((t - 58) / 1.6) ** 2), ss(STOPP - 5, STOPP - 1, t))              # en blinkning på vägen, och glada stängda ögon när hon är framme
        blick = (-4.0 * (1 - ss(30, 44, t)) + 3.0 * ss(30, 44, t) * (1 - ss(70, 84, t)), -3.5 * ss(34, 46, t) * (1 - ss(70, 84, t)))   # tittar mot oss, sedan mot handfatet, sedan rakt fram
        for s in 'VH':
            k = delar[f'lapp.{s}'].data.shape_keys.key_blocks['stangd']; k.value = blink; k.keyframe_insert('value', frame=t)
            o = max(1 - blink * 1.15, 0.02); stall(ao, vila, f'oga.{s}', flytt=(blick[0], 0, blick[1]), skala=(o, o, o), ruta=t)
        mun = delar['mun'].data.shape_keys.key_blocks
        mun['leende'].value = 0.35 + 0.65 * ss(STOPP - 12, STOPP - 2, t); mun['leende'].keyframe_insert('value', frame=t)
        mun['oppen'].value = 0.62 * ss(STOPP - 3, STOPP + 3, t); mun['oppen'].keyframe_insert('value', frame=t)
    return spar
