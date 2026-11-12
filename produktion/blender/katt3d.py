# Katten Kaj som riktig 3D-figur: modellerad kropp, armatur, filtyta och ansikte. Allt byggs i kod (ingen fil ritas för hand).
# Används av bygg3d.py. Mått i "kattpixlar" (ungefär 2D-riggens skärmpixlar), x åt höger i bild, y bakåt, z uppåt; katten tittar mot -y.
# Sidorna heter efter bilden: .V = vänster i bild (-x), .H = höger i bild (+x).
import bpy, bmesh, math
import numpy as np
from mathutils import Vector, Matrix, Quaternion

U = 0.001            # meter per pixel: hela bilden är ca 1,9 m bred
KS = 1.1             # kattens skala (hon står längre in i rummet än handfatet och ska se lika stor ut som i 2D)

# --- Mått ----------------------------------------------------------------------------------------------------------------
ZB, H, R, FY = 94.0, 492.0, 232.0, 0.93          # äggkroppen: undersidans höjd, höjd, största radie, djup/bredd
SVART, GRADDE, ROSA = (0.072, 0.063, 0.061), (0.90, 0.82, 0.66), (0.90, 0.40, 0.46)
OGA_X, OGA_Z, OGA_RX, OGA_RZ = 80.0, ZB + 0.615 * H, 41.0, 46.0      # ögonlappen (gräddvit)
NOS_Z, MUN_Z = ZB + 0.555 * H, ZB + 0.503 * H
KIND_X, KIND_Z, KIND_RX, KIND_RZ = 122.0, ZB + 0.50 * H, 36.0, 20.0
HOFT_X, AXEL_Z = 86.0, ZB + 0.43 * H
ARM_LUT = math.radians(48)                        # vilovinkel under vågrätt
HAR_LANGD = 4.5                                   # filtluddets längd i kattpixlar

def egg_r(z):
    c = np.clip(1 - 2 * (np.asarray(z, float) - ZB) / H, -1, 1); s = np.sqrt(1 - c * c)
    return R * s ** 0.85 * (1 + 0.10 * c)

def fram(x, z):
    """y på kroppens framsida vid (x, z)."""
    return -FY * np.sqrt(np.clip(egg_r(z) ** 2 - np.asarray(x, float) ** 2, 0, None))

def ss(a, b, x):
    t = np.clip((np.asarray(x, float) - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

def norm(v):
    v = np.asarray(v, float); return v / np.linalg.norm(v)

class Nat:
    """Samlar hörn, ytor, färg och benvikter för ett nät."""
    def __init__(s): s.v, s.f, s.farg, s.vikt = [], [], [], {}
    @property
    def n(s): return sum(len(a) for a in s.v)
    def lagg(s, pos, ytor, farg, vikter):
        n0 = s.n; pos = np.asarray(pos, float)
        s.v.append(pos); s.f += [tuple(i + n0 for i in y) for y in ytor]
        s.farg.append(np.broadcast_to(np.asarray(farg, float), (len(pos), 3)).copy())
        for namn, w in vikter.items(): s.vikt.setdefault(namn, []).append((n0, np.broadcast_to(np.asarray(w, float), (len(pos),)).copy()))
        return slice(n0, n0 + len(pos))
    def ror(s, c, A, B, n, p0, p1):
        """Ringar (mitt c, halvaxlar A och B) med en polpunkt i var ände. Ger (hörn, ytor, ringnr per hörn, vinkel per hörn)."""
        m = len(c); th = np.arange(n) * 2 * math.pi / n
        pos = (c[:, None, :] + np.cos(th)[None, :, None] * A[:, None, :] + np.sin(th)[None, :, None] * B[:, None, :]).reshape(-1, 3)
        pos = np.concatenate([pos, [p0], [p1]]); i0, i1 = m * n, m * n + 1; ytor = []
        for i in range(m - 1):
            for j in range(n):
                k = (j + 1) % n; ytor.append((i * n + j, i * n + k, (i + 1) * n + k, (i + 1) * n + j))
        for j in range(n):
            k = (j + 1) % n; ytor.append((i0, k, j)); ytor.append((i1, (m - 1) * n + j, (m - 1) * n + k))
        ring = np.concatenate([np.repeat(np.arange(m), n), [0, m - 1]]); vink = np.concatenate([np.tile(th, m), [0, 0]])
        return pos, ytor, ring, vink
    def objekt(s, namn, sc):
        pos = np.concatenate(s.v) * (KS * U); me = bpy.data.meshes.new(namn); me.from_pydata(pos.tolist(), [], s.f)
        bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
        me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
        fa = me.color_attributes.new('farg', 'FLOAT_COLOR', 'POINT'); f = np.concatenate(s.farg)
        fa.data.foreach_set('color', np.concatenate([f, np.ones((len(f), 1))], 1).ravel())
        o = bpy.data.objects.new(namn, me); sc.collection.objects.link(o)
        for g, bitar in s.vikt.items():
            vg = o.vertex_groups.new(name=g)
            for n0, w in bitar:
                for i in np.nonzero(w > 1e-4)[0]: vg.add([int(n0 + i)], float(w[i]), 'REPLACE')
        return o

def kapsel(p0, p1, r0, r1, nr=18, kapp=6):
    """Ringlägen längs en kapsel p0→p1 med rundade ändar. Ger (lägen längs axeln 0..L med ändarna, radier)."""
    L = float(np.linalg.norm(np.asarray(p1) - np.asarray(p0))); s, r = [], []
    for i in range(1, kapp + 1): a = i / kapp * math.pi / 2; s.append(-r0 * math.cos(a)); r.append(r0 * math.sin(a))
    for i in range(1, nr): t = i / nr; s.append(t * L); r.append(r0 + (r1 - r0) * t)
    for i in range(kapp): a = i / kapp * math.pi / 2; s.append(L + r1 * math.sin(a)); r.append(r1 * math.cos(a))
    return np.array(s), np.array(r), L

def ram(d):
    d = norm(d); a = norm(np.cross(d, (0, 1, 0) if abs(d[1]) < 0.9 else (1, 0, 0))); return d, a, np.cross(d, a)

def spline(P, n):
    """Catmull–Rom genom punkterna, n punkter med jämnt avstånd."""
    P = np.asarray(P, float); Q = np.concatenate([[2 * P[0] - P[1]], P, [2 * P[-1] - P[-2]]]); ut = []
    for i in range(len(P) - 1):
        p0, p1, p2, p3 = Q[i:i + 4]
        for t in np.linspace(0, 1, 24, endpoint=False):
            ut.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    ut = np.array(ut + [P[-1]]); d = np.concatenate([[0], np.cumsum(np.linalg.norm(np.diff(ut, axis=0), axis=1))])
    return np.stack([np.interp(np.linspace(0, d[-1], n), d, ut[:, k]) for k in range(3)], 1)

SVANS_P = [(45, 150, 170), (135, 226, 136), (262, 240, 118), (382, 222, 138), (464, 198, 205), (484, 182, 292), (446, 172, 356), (388, 170, 346), (374, 170, 304)]
SVANS_BEN = 9

def axel(sgn):
    S = np.array([sgn * (float(egg_r(AXEL_Z)) - 22), -14.0, AXEL_Z]); d = norm([sgn * math.cos(ARM_LUT), -0.10, -math.sin(ARM_LUT)])
    return S, d
ARM = (64.0, 120.0, 146.0)      # armbåge, handled, tasspets (avstånd från axeln)

def ora(sgn):
    z = ZB + H * (1 - math.cos(0.795 * math.pi)) / 2; P = np.array([sgn * float(egg_r(z)), 0.0, z]); ax = norm([sgn * 0.42, 0.0, 1.0])
    return P - 24 * ax, ax, np.array([ax[2], 0.0, -ax[0]]) * sgn       # bas (inne i kroppen), axel, breddriktning utåt

def bygg_kropp(sc):
    N = Nat()
    # kroppen
    m, n = 110, 160; t = np.linspace(0.012, 0.988, m) * math.pi; z = ZB + H * (1 - np.cos(t)) / 2; r = egg_r(z)
    c = np.stack([np.zeros(m), np.zeros(m), z], 1); A = np.stack([r, np.zeros(m), np.zeros(m)], 1); B = np.stack([np.zeros(m), FY * r, np.zeros(m)], 1)
    pos, ytor, _, _ = N.ror(c, A, B, n, (0, 0, ZB), (0, 0, ZB + H))
    kind = np.zeros(len(pos))
    for sgn in (-1, 1):
        e = np.hypot((pos[:, 0] - sgn * KIND_X) / KIND_RX, (pos[:, 2] - KIND_Z) / KIND_RZ); kind = np.maximum(kind, (1 - ss(0.55, 1.05, e)) * (pos[:, 1] < 0))
    farg = np.array(SVART)[None] * (1 - kind[:, None]) + np.array(ROSA)[None] * kind[:, None]
    wb = ss(ZB + 0.12 * H, ZB + 0.36 * H, pos[:, 2])
    # kortare ludd där ansiktet sitter, så att det inte växer igenom lappar, nos och mun
    kort = np.zeros(len(pos))
    for x0, z0, rx, rz in ((-OGA_X, OGA_Z, OGA_RX + 6, OGA_RZ + 6), (OGA_X, OGA_Z, OGA_RX + 6, OGA_RZ + 6), (0, (NOS_Z + MUN_Z) / 2, 40, 40)):
        kort = np.maximum(kort, (1 - ss(0.9, 1.25, np.hypot((pos[:, 0] - x0) / rx, (pos[:, 2] - z0) / rz))) * (pos[:, 1] < 0))
    N.lagg(pos, ytor, farg, {'brost': wb, 'hofter': 1 - wb, 'svart': 1 - kind, 'rosa': kind, 'langd': 1 - 0.5 * kort})
    for sgn, sida in ((-1, 'V'), (1, 'H')):
        # ben och fot
        p0, p1 = np.array([sgn * HOFT_X, 0, 152.0]), np.array([sgn * HOFT_X, 0, 32.0]); s, r, L = kapsel(p0, p1, 31, 30, 14)
        d, a, b = ram(p1 - p0); c = p0 + s[:, None] * d; pos, ytor, ring, _ = N.ror(c, r[:, None] * a, r[:, None] * b, 28, p0 - 31 * d, p1 + 30 * d)
        wv = ss(102, 74, pos[:, 2]); N.lagg(pos, ytor, SVART, {f'lar.{sida}': 1 - wv, f'vad.{sida}': wv, 'svart': 1, 'langd': 1})
        fc = np.array([sgn * (HOFT_X + 3), -16.0, 25.0]); k = np.linspace(-1, 1, 22)[1:-1]; rr = np.sqrt(1 - k * k)
        c = fc + np.outer(k, (0, 54, 0)); pos, ytor, _, _ = N.ror(c, np.outer(rr, (40, 0, 0)), np.outer(rr, (0, 0, 25)), 28, fc - (0, 54, 0), fc + (0, 54, 0))
        pos[:, 2] = np.maximum(pos[:, 2], 1.5 + 0 * pos[:, 2]) ; pos[:, 2] = np.where(pos[:, 2] < fc[2], fc[2] - (fc[2] - pos[:, 2]) * 0.94, pos[:, 2])
        N.lagg(pos, ytor, GRADDE, {f'fot.{sida}': 1, 'gradde': 1, 'langd': 0.8})
        # arm med tass
        S, d = axel(sgn); _, a, b = ram(d); p0, p1 = S - 34 * d, S + (ARM[2] - 30) * d; s, r, L = kapsel(p0, p1, 28, 30, 26)
        s0 = s - 34                                           # avstånd från axeln
        r = r * (1 + 0.10 * ss(ARM[1] - 26, ARM[1] + 4, s0))    # tassen lite knubbigare
        c = p0 + s[:, None] * d; pos, ytor, ring, _ = N.ror(c, r[:, None] * a, r[:, None] * b, 28, p0 - 28 * d, p1 + 30 * d)
        av = (pos - S) @ d; tass = ss(ARM[1] - 22, ARM[1] - 10, av); w2 = ss(ARM[0] - 16, ARM[0] + 16, av); w3 = ss(ARM[1] - 12, ARM[1] + 10, av)
        farg = np.array(SVART)[None] * (1 - tass[:, None]) + np.array(GRADDE)[None] * tass[:, None]
        N.lagg(pos, ytor, farg, {f'overarm.{sida}': 1 - w2, f'underarm.{sida}': w2 * (1 - w3), f'tass.{sida}': w2 * w3, 'svart': 1 - tass, 'gradde': tass, 'langd': 1})
        # öra: rundad trekant, plattare framtill, rosa inuti
        c0, ax, bd = ora(sgn); hojd, m = 132.0, 26; s = np.linspace(0, 0.985, m)
        W = 62 * (1 - s) ** 0.72 + 5 * (1 - s); T = 25 * (1 - s) ** 0.55 + 2
        c = c0 + (s * hojd)[:, None] * ax; pos, ytor, ring, vink = N.ror(c, W[:, None] * bd, T[:, None] * np.array([0, 1.0, 0]), 36, c0 - 8 * ax, c0 + hojd * ax)
        framtill = np.sin(vink) < 0; pos[:, 1] = np.where(framtill, c0[1] + (pos[:, 1] - c0[1]) * 0.45, pos[:, 1])
        sv = s[ring]; inne = ss(0.30, 0.42, -np.sin(vink)) * ss(0.20, 0.27, sv) * (1 - ss(0.70, 0.80, sv)) * (1 - ss(0.50, 0.66, np.abs(np.cos(vink))))
        pos[:, 1] += 5 * inne                                 # örat är lite kupat där det är rosa
        farg = np.array(SVART)[None] * (1 - inne[:, None]) + np.array(ROSA)[None] * inne[:, None]; w2 = ss(0.30, 0.70, sv)
        N.lagg(pos, ytor, farg, {f'ora.{sida}': 1 - w2, f'ora2.{sida}': w2, 'svart': 1 - inne, 'rosa': inne, 'langd': 1 - 0.35 * inne})
    # svansen
    m = 72; c = spline(SVANS_P, m); T = np.gradient(c, axis=0); T /= np.linalg.norm(T, axis=1)[:, None]
    a = np.zeros((m, 3)); a[0] = norm(np.cross(T[0], (0, 0, 1)))
    for i in range(1, m): v = a[i - 1] - T[i] * (a[i - 1] @ T[i]); a[i] = v / np.linalg.norm(v)
    b = np.cross(T, a); u = np.linspace(0, 1, m); r = (25 + 3 * u) * np.sqrt(np.clip(1 - ((u - 0.965) / 0.035).clip(0, 1) ** 2, 0.02, 1))
    pos, ytor, ring, _ = N.ror(c, r[:, None] * a, r[:, None] * b, 26, c[0], c[-1] + T[-1] * 6)
    uv = u[ring]; topp = ss(0.76, 0.81, uv); farg = np.array(SVART)[None] * (1 - topp[:, None]) + np.array(GRADDE)[None] * topp[:, None]
    vikter = {'svart': 1 - topp, 'gradde': topp, 'langd': 1}; lage = uv * SVANS_BEN - 0.5
    for k in range(SVANS_BEN): vikter[f'svans{k}'] = np.clip(1 - np.abs(lage - k), 0, 1) if 0 < k < SVANS_BEN - 1 else (np.clip(1 - (lage - k), 0, 1) if k == 0 else np.clip(1 + (lage - k), 0, 1))
    N.lagg(pos, ytor, farg, vikter)
    return N.objekt('katt', sc)

def skiva(x0, z0, kontur, lyft, nr=10, n=40):
    """Ett litet nät som ligger på kroppens framsida: kontur(vinkel) = (a, b) för ytterkanten, lyft(rho) = höjd över ytan."""
    th = np.arange(n) * 2 * math.pi / n; ka, kb = kontur(th); pos, uv = [(x0, z0, lyft(0.0))], [(0.0, 0.0)]; ytor = []
    for i in range(1, nr + 1):
        rho = i / nr
        for j in range(n): pos.append((x0 + rho * ka[j], z0 + rho * kb[j], lyft(rho))); uv.append((rho * math.cos(th[j]), rho * math.sin(th[j])))
    for j in range(n): ytor.append((0, 1 + j, 1 + (j + 1) % n))
    for i in range(nr - 1):
        for j in range(n): k = (j + 1) % n; ytor.append((1 + i * n + j, 1 + (i + 1) * n + j, 1 + (i + 1) * n + k, 1 + i * n + k))
    return np.array(pos), np.array(uv), ytor

def pa_kroppen(p):
    """(x, z, lyft) → punkt på kroppen, lyft ut längs ytans normal."""
    x, z, l = p[:, 0], p[:, 1], p[:, 2]; e = 0.5; y = fram(x, z)
    nx, nz = (fram(x + e, z) - fram(x - e, z)) / (2 * e), (fram(x, z + e) - fram(x, z - e)) / (2 * e)
    nrm = np.stack([nx, -np.ones_like(x), nz], 1); nrm /= np.linalg.norm(nrm, axis=1)[:, None]
    return np.stack([x, y, z], 1) + nrm * l[:, None]

def nat(sc, namn, pos, ytor, grupp, farg=None, uv=None):
    me = bpy.data.meshes.new(namn); me.from_pydata((pos * KS * U).tolist(), [], ytor)
    bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
    if farg is not None:
        fa = me.color_attributes.new('farg', 'FLOAT_COLOR', 'POINT'); fa.data.foreach_set('color', np.concatenate([farg, np.ones((len(farg), 1))], 1).ravel())
    if uv is not None:
        hornen = np.empty(len(me.loops), np.int32); me.loops.foreach_get('vertex_index', hornen); me.uv_layers.new(name='uv').data.foreach_set('uv', uv[hornen].ravel())
    o = bpy.data.objects.new(namn, me); sc.collection.objects.link(o); o.vertex_groups.new(name=grupp).add(list(range(len(pos))), 1.0, 'REPLACE'); return o

def bygg_ansikte(sc):
    delar = {}
    for sgn, sida in ((-1, 'V'), (1, 'H')):
        # ögonlappen: gräddvit filt. Formnyckeln "stangd" drar ihop den till en glad båge (blink och glada ögon).
        kontur = lambda th: (OGA_RX * np.cos(th), OGA_RZ * np.sin(th))
        p, uv, ytor = skiva(sgn * OGA_X, OGA_Z, kontur, lambda rho: 6.5 * math.sqrt(max(1 - rho ** 4, 0)) - 1.0)
        o = nat(sc, f'ogonlapp.{sida}', pa_kroppen(p), ytor, 'brost', uv=uv); o.vertex_groups.new(name='allt').add(list(range(len(p))), 1.0, 'REPLACE')
        o.shape_key_add(name='Basis'); k = o.shape_key_add(name='stangd'); k.value = 0; a, b = uv[:, 0], uv[:, 1]; hb = 31.0
        q = np.stack([sgn * OGA_X + a * hb, OGA_Z - 8 + 15 * (1 - a * a) + b * 4.2 * np.sqrt(np.clip(1 - a * a, 0, 1)) + 0 * b, 4.5 * np.sqrt(np.clip(1 - (a * a + b * b) ** 2, 0, 1)) + 1.5], 1)
        k.data.foreach_set('co', (pa_kroppen(q) * KS * U).ravel()); delar[f'lapp.{sida}'] = o
        # ögat: blank mörk kupa. Följer benet oga.*, som flyttas för blicken och krymps när ögat stängs.
        kontur = lambda th: (21.5 * np.cos(th), 25.5 * np.sin(th))
        p, uv, ytor = skiva(sgn * OGA_X, OGA_Z - 1, kontur, lambda rho: 5.0 + 10.0 * math.sqrt(max(1 - rho ** 2.4, 0)), nr=14, n=48)
        delar[f'oga.{sida}'] = nat(sc, f'oga.{sida}', pa_kroppen(p), ytor, f'oga.{sida}', uv=uv)
    # nosen: rundad rosa trekant med spetsen ner
    kontur = lambda th: (16.0 * (1 + 0.22 * np.cos(3 * (th - math.pi / 6))) * np.cos(th), 12.0 * (1 + 0.22 * np.cos(3 * (th - math.pi / 6))) * np.sin(th))
    p, uv, ytor = skiva(0, NOS_Z, kontur, lambda rho: 3.0 + 6.5 * math.sqrt(max(1 - rho ** 2.5, 0)), nr=8, n=36)
    delar['nos'] = nat(sc, 'nos', pa_kroppen(p), ytor, 'brost', farg=np.tile(ROSA, (len(p), 1)))
    # munnen: ett band över munnens bredd. Vila = liten kattmun (ω). Formnycklar: "leende" (bredare, mungiporna upp) och
    # "oppen" (underläppen ner: munhåla, tänder upptill, tunga nertill).
    nu, nv = 33, 11; u = np.linspace(-1, 1, nu); LAPP, TAND, HALA, TUNGA = (0.30, 0.07, 0.09), (0.93, 0.92, 0.86), (0.16, 0.025, 0.035), (0.80, 0.30, 0.36)
    rad = [LAPP, LAPP, TAND, TAND, TAND, HALA, HALA, TUNGA, TUNGA, LAPP, LAPP]
    def form(bredd, mitt, ner, tjock=2.0):
        """mitt(u) = läpplinjens höjd, ner(u) = hur långt underläppen dras ner."""
        pts = []
        for j in range(nv):
            v = (0, 0, 0.02, 0.2, 0.36, 0.4, 0.6, 0.7, 0.98, 1, 1)[j]; kant = (tjock, 0, 0, 0, 0, 0, 0, 0, 0, 0, -tjock)[j]
            avsm = np.sqrt(np.clip(1 - u ** 4, 0, 1)); z = MUN_Z + mitt(u) - v * ner(u) + kant * (0.35 + 0.65 * avsm)
            lyft = np.full(nu, 4.6) - 2.6 * (0 < j < nv - 1) * np.clip(ner(u) / 10, 0, 1) * (1 if 2 <= j <= 8 else 0.3)
            pts.append(np.stack([u * bredd, z, lyft], 1))
        return pa_kroppen(np.concatenate(pts))
    vila = lambda u: 3.5 - 7.0 * np.sin(math.pi * np.abs(u)) ** 0.8 + 3.0 * np.abs(u) ** 2
    glad = lambda u: -3.0 - 5.0 * np.sin(math.pi * np.abs(u)) ** 0.8 * 0.5 + 11.0 * np.abs(u) ** 2
    noll = lambda u: 0 * u
    ytor = [(j * nu + i, j * nu + i + 1, (j + 1) * nu + i + 1, (j + 1) * nu + i) for j in range(nv - 1) for i in range(nu - 1)]
    o = nat(sc, 'mun', form(21, vila, noll), ytor, 'brost', farg=np.repeat(np.array(rad), nu, axis=0)); o.shape_key_add(name='Basis')
    for namn, f in (('leende', form(27, glad, noll)), ('oppen', form(25, glad, lambda u: 19 * (1 - u * u) ** 0.6))):
        k = o.shape_key_add(name=namn); k.value = 0; k.data.foreach_set('co', (f * KS * U).ravel())
    delar['mun'] = o
    return delar

# --- Armaturen ------------------------------------------------------------------------------------------------------------
def bygg_armatur(sc):
    ad = bpy.data.armatures.new('katt-rigg'); ao = bpy.data.objects.new('katt-rigg', ad); sc.collection.objects.link(ao)
    bpy.context.view_layer.objects.active = ao; bpy.ops.object.mode_set(mode='EDIT'); eb = ad.edit_bones
    def ben(namn, huvud, svans, foralder=None, deform=True):
        b = eb.new(namn); b.head = Vector(np.asarray(huvud, float) * KS * U); b.tail = Vector(np.asarray(svans, float) * KS * U); b.use_deform = deform
        if foralder: b.parent = eb[foralder]
        return b
    ben('hofter', (0, 0, ZB + 6), (0, 0, ZB + 0.24 * H))
    ben('brost', (0, 0, ZB + 0.24 * H), (0, 0, ZB + 0.80 * H), 'hofter')
    for sgn, s in ((-1, 'V'), (1, 'H')):
        x = sgn * HOFT_X
        ben(f'lar.{s}', (x, 0, 150), (x, -10, 91), 'hofter'); ben(f'vad.{s}', (x, -10, 91), (x, 0, 38), f'lar.{s}')
        ben(f'fot.{s}', (x, 0, 38), (x, -60, 22), f'vad.{s}'); ben(f'fot_ik.{s}', (x, 0, 38), (x, -60, 22), None, deform=False)
        S, d = axel(sgn)
        ben(f'overarm.{s}', S, S + ARM[0] * d, 'brost'); ben(f'underarm.{s}', S + ARM[0] * d, S + ARM[1] * d, f'overarm.{s}'); ben(f'tass.{s}', S + ARM[1] * d, S + ARM[2] * d, f'underarm.{s}')
        c0, ax, _ = ora(sgn); ben(f'ora.{s}', c0 + 22 * ax, c0 + 70 * ax, 'brost'); ben(f'ora2.{s}', c0 + 70 * ax, c0 + 128 * ax, f'ora.{s}')
        o = np.array([sgn * OGA_X, float(fram(sgn * OGA_X, OGA_Z)), OGA_Z]); ben(f'oga.{s}', o, o + (0, -24, 0), 'brost')
    c = spline(SVANS_P, SVANS_BEN + 1)
    for k in range(SVANS_BEN): ben(f'svans{k}', c[k], c[k + 1], f'svans{k - 1}' if k else 'hofter')
    for b in eb: b.roll = 0
    bpy.ops.object.mode_set(mode='POSE')
    for pb in ao.pose.bones: pb.rotation_mode = 'QUATERNION'
    for s in 'VH':
        ik = ao.pose.bones[f'vad.{s}'].constraints.new('IK'); ik.target, ik.subtarget, ik.chain_count = ao, f'fot_ik.{s}', 2
        cr = ao.pose.bones[f'fot.{s}'].constraints.new('COPY_ROTATION'); cr.target, cr.subtarget = ao, f'fot_ik.{s}'
        for n in (f'lar.{s}', f'vad.{s}'): ao.pose.bones[n].ik_stretch = 0.08
    bpy.ops.object.mode_set(mode='OBJECT')
    vila = {b.name: b.matrix_local.copy() for b in ad.bones}
    return ao, vila

def stall(ao, vila, namn, rot=None, flytt=(0, 0, 0), skala=(1, 1, 1), ruta=None):
    """Ställer ett ben som en ändring i armaturens egna axlar (x höger, y bakåt, z upp), runt benets huvud; föräldrarnas rörelse följer med.
    rot = Quaternion, flytt i kattpixlar, skala (x, y, z). Sätter nyckelbilder om ruta ges."""
    Rb = vila[namn]; h = Rb.to_translation(); D = Matrix.Translation(Vector(flytt) * KS * U) @ Matrix.Translation(h) @ (rot or Quaternion()).to_matrix().to_4x4() @ Matrix.Diagonal((*skala, 1)) @ Matrix.Translation(-h)
    pb = ao.pose.bones[namn]; pb.matrix_basis = Rb.inverted() @ D @ Rb
    if ruta is not None:
        for kanal in ('location', 'rotation_quaternion', 'scale'): pb.keyframe_insert(kanal, frame=ruta)

# --- Material: filt -------------------------------------------------------------------------------------------------------
def material(namn):
    m = bpy.data.materials.new(namn)
    try: m.use_nodes = True
    except Exception: pass
    nt = m.node_tree; nt.nodes.clear(); return m, nt.nodes.new, nt.links.new

def filt(namn, farg=None, strand=False):
    """Matt, lite fibrig filt. farg None = nätets färgattribut. strand = materialet för luddets strån (lite olika ljusa strån)."""
    m, N, L = material(namn); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    p.inputs['Roughness'].default_value = 1.0; p.inputs['Specular IOR Level'].default_value = 0.1
    p.inputs['Sheen Weight'].default_value = 0.55 if not strand else 0.0; p.inputs['Sheen Roughness'].default_value = 0.6
    if farg is None: f = N('ShaderNodeAttribute'); f.attribute_name = 'farg'; ut = f.outputs['Color']
    else: f = N('ShaderNodeRGB'); f.outputs[0].default_value = (*farg, 1); ut = f.outputs[0]
    if strand:
        info = N('ShaderNodeHairInfo'); ramp = N('ShaderNodeMapRange'); L(info.outputs['Random'], ramp.inputs[0]); ramp.inputs[3].default_value, ramp.inputs[4].default_value = 0.95, 1.07
        rot = N('ShaderNodeMapRange'); L(info.outputs['Intercept'], rot.inputs[0]); rot.inputs[3].default_value, rot.inputs[4].default_value = 0.93, 1.06   # mörkare vid roten
        g = N('ShaderNodeMath'); g.operation = 'MULTIPLY'; L(ramp.outputs[0], g.inputs[0]); L(rot.outputs[0], g.inputs[1])
        mix = N('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1; L(ut, mix.inputs['A']); L(g.outputs[0], mix.inputs['B']); ut = mix.outputs['Result']
    else:
        brus = N('ShaderNodeTexNoise'); brus.inputs['Scale'].default_value = 900; brus.inputs['Detail'].default_value = 3
        bula = N('ShaderNodeBump'); bula.inputs['Strength'].default_value = 0.5; bula.inputs['Distance'].default_value = 0.002; L(brus.outputs['Fac'], bula.inputs['Height']); L(bula.outputs[0], p.inputs['Normal'])
    L(ut, p.inputs['Base Color']); p.inputs['Sheen Tint'].default_value = (1, 0.93, 0.86, 1)
    return m

def ogonmaterial():
    """Blankt mörkbrunt öga med svart pupill och två målade glansprickar, ritat efter nätets uv (ögats egna mått)."""
    m, N, L = material('oga'); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    uv = N('ShaderNodeUVMap'); uv.uv_map = 'uv'
    def prick(cx, cy, r, mjuk=0.03):
        d = N('ShaderNodeVectorMath'); d.operation = 'DISTANCE'; L(uv.outputs[0], d.inputs[0]); d.inputs[1].default_value = (cx, cy, 0)
        s = N('ShaderNodeMapRange'); s.interpolation_type = 'SMOOTHSTEP'; L(d.outputs['Value'], s.inputs[0]); s.inputs[1].default_value, s.inputs[2].default_value, s.inputs[3].default_value, s.inputs[4].default_value = r - mjuk, r + mjuk, 1, 0
        return s.outputs[0]
    iris = N('ShaderNodeMix'); iris.data_type = 'RGBA'; L(prick(0.0, -0.02, 0.50, 0.05), iris.inputs['Factor']); iris.inputs['A'].default_value = (0.11, 0.035, 0.016, 1); iris.inputs['B'].default_value = (0.004, 0.003, 0.003, 1)
    glans = N('ShaderNodeMath'); glans.operation = 'MAXIMUM'; L(prick(-0.30, 0.36, 0.20), glans.inputs[0]); L(prick(0.27, -0.33, 0.085), glans.inputs[1])
    L(iris.outputs['Result'], p.inputs['Base Color']); p.inputs['Roughness'].default_value = 0.12; p.inputs['Coat Weight'].default_value = 1.0; p.inputs['Coat Roughness'].default_value = 0.04
    p.inputs['Emission Color'].default_value = (1, 0.98, 0.95, 1); L(glans.outputs[0], p.inputs['Emission Strength'])
    return m

def ludd(o, namn, grupp, mat, antal, langd=HAR_LANGD, barn=6, fro=1):
    """Ett hårsystem: korta, lite trassliga strån (filtludd) där viktgruppen är målad."""
    md = o.modifiers.new(namn, 'PARTICLE_SYSTEM'); ps = o.particle_systems[-1]; s = ps.settings; s.name = namn
    s.type = 'HAIR'; s.count = antal; s.hair_length = langd * KS * U; s.emit_from = 'FACE'; s.distribution = 'RAND'; s.use_modifier_stack = True
    s.use_advanced_hair = True; s.normal_factor = langd * KS * U / 4; s.factor_random = 0.45 * s.normal_factor;   # stråets längd = 4 × farten (hair_length räknas inte i den här Blender-versionen)
    s.hair_step = 3; s.display_step = 2; s.render_step = 2
    s.child_type = 'SIMPLE'; s.rendered_child_count = barn; s.child_percent = 1; s.child_radius = 5.0 * KS * U; s.child_roundness = 1.0
    s.child_length = 1.0; s.roughness_1 = 0.0012; s.roughness_1_size = 0.004; s.roughness_endpoint = 0.0025; s.roughness_2 = 0.0008; s.roughness_2_size = 0.01
    s.root_radius, s.tip_radius, s.radius_scale, s.shape = 0.55, 0.2, 1.1 * KS * U, 0.2
    o.data.materials.append(mat); s.material = len(o.data.materials)
    ps.vertex_group_density = grupp; ps.seed = fro
    if 'langd' in o.vertex_groups: ps.vertex_group_length = 'langd'
    return ps

def bygg_katt(sc, har=1.0):
    """Bygger hela katten. har = luddets täthet (1 = full, 0 = inget ludd, för snabba prov). Ger (armatur, vilomatriser, delar)."""
    ao, vila = bygg_armatur(sc); kropp = bygg_kropp(sc); delar = bygg_ansikte(sc); delar['kropp'] = kropp
    kropp.data.materials.append(filt('filt'))
    delar['lapp.V'].data.materials.append(filt('filt-gradde', (0.95, 0.90, 0.78))); delar['lapp.H'].data.materials.append(delar['lapp.V'].data.materials[0])
    om = ogonmaterial(); delar['oga.V'].data.materials.append(om); delar['oga.H'].data.materials.append(om)
    nm = filt('filt-nos'); delar['nos'].data.materials.append(nm)
    mm = filt('mun'); mm.node_tree.nodes['Principled BSDF'].inputs['Sheen Weight'].default_value = 0.1; mm.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.6; delar['mun'].data.materials.append(mm)
    for o in delar.values():
        md = o.modifiers.new('rigg', 'ARMATURE'); md.object = ao; o.parent = ao
    if har > 0:
        # Luddet sitter på en kopia av kroppen som bara visar stråna och inte kastar skugga: strån som skuggar varandra ger ett korn
        # som ändras med renderingens brus (flimmer när katten rör sig). Kroppen under kastar skuggorna.
        fast = kropp; kropp = fast.copy(); kropp.name = 'katt-ludd'; sc.collection.objects.link(kropp); kropp.parent = ao
        kropp.show_instancer_for_render = False; kropp.visible_shadow = False; delar['ludd'] = kropp
        ludd(kropp, 'ludd-svart', 'svart', filt('ludd-svart', SVART, strand=True), int(110000 * har), barn=4, fro=1)
        ludd(kropp, 'ludd-gradde', 'gradde', filt('ludd-gradde', GRADDE, strand=True), int(16000 * har), barn=4, fro=2)
        ludd(kropp, 'ludd-rosa', 'rosa', filt('ludd-rosa', ROSA, strand=True), int(4500 * har), langd=HAR_LANGD * 0.8, barn=4, fro=3)
    return ao, vila, delar
