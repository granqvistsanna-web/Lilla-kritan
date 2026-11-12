# 030:s badrum som riktig 3D: kaklad vägg och golv, handfatet (skål och kran) på pallen, sidobordet med muggen och tre tandborstar,
# väggskåpet, fisktavlan, handduken och ankan, ljus och kamera. Allt byggs i kod. Används av bygg3d.py.
# Mått i skärmpixlar i handfatets plan (helbilden 1920 × 1080): x = bildens x − 960, y = djupet bakåt från handfatet, z = höjden över golvet.
import bpy, bmesh, math
import numpy as np
from mathutils import Vector, Matrix
from katt3d import U, material, filt

D, HC, FOT = 3580.0, 700.0, 988.0     # kamerans avstånd till handfatets plan, kamerans höjd, raden i bilden där golvet ligger i handfatets plan
VAGG = 1010.0                         # väggens djup
KATT = (15.0, 400.0)                  # där katten står till slut (bakom handfatet)
BLANDARE, PUSH = 2.2, 0.03            # skärpedjup (lägre = suddigare vägg) och hur långt kameran glider in
k_av = lambda y: (D + y) / D
def plats(px, rad, y):
    """Punkten på djupet y som syns på (px, rad) i bilden (innan kameran glider in)."""
    k = k_av(y); return ((px - 960) * k, y, HC - (rad - (FOT - HC)) * k)

def yta(namn, farg, rahet=0.55, glans=0.5):
    m, N, L = material(namn); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    p.inputs['Base Color'].default_value = (*farg, 1); p.inputs['Roughness'].default_value = rahet; p.inputs['Specular IOR Level'].default_value = glans
    return m

def obj(sc, namn, bm, mat, slat=True):
    me = bpy.data.meshes.new(namn); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
    me.polygons.foreach_set('use_smooth', [slat] * len(me.polygons)); me.materials.append(mat)
    o = bpy.data.objects.new(namn, me); sc.collection.objects.link(o); return o

def lada(sc, namn, x, y, z, rund, mat):
    """Låda med rundade kanter mellan (x0, x1), (y0, y1), (z0, z1)."""
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts: v.co = Vector(((x[0] + x[1]) / 2 + v.co.x * (x[1] - x[0]), (y[0] + y[1]) / 2 + v.co.y * (y[1] - y[0]), (z[0] + z[1]) / 2 + v.co.z * (z[1] - z[0]))) * U
    bmesh.ops.bevel(bm, geom=list(bm.edges), offset=rund * U, segments=5, profile=0.5, affect='EDGES')
    o = obj(sc, namn, bm, mat); return o

def klot(sc, namn, mitt, radier, mat, vrid=None):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=24, radius=1)
    M = Matrix.Translation(Vector(mitt) * U) @ (vrid or Matrix()) @ Matrix.Diagonal((*(r * U for r in (radier if hasattr(radier, '__len__') else (radier,) * 3)), 1))
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts); return obj(sc, namn, bm, mat)

def svarv(sc, namn, mitt, profil, mat, sy=1.0, n=64):
    """Svarvad form: profil = [(radie, höjd), …] nerifrån och upp (och ner igen på insidan)."""
    bm = bmesh.new(); ringar = []
    for r, z in profil:
        if r < 1e-6: ringar.append([bm.verts.new(Vector((mitt[0], mitt[1], mitt[2] + z)) * U)])
        else: ringar.append([bm.verts.new(Vector((mitt[0] + r * math.cos(a), mitt[1] + sy * r * math.sin(a), mitt[2] + z)) * U) for a in (j * 2 * math.pi / n for j in range(n))])
    for a, b in zip(ringar, ringar[1:]):
        for j in range(n):
            k = (j + 1) % n
            if len(a) == 1 and len(b) > 1: bm.faces.new((a[0], b[j], b[k]))
            elif len(b) == 1 and len(a) > 1: bm.faces.new((a[j], b[0], a[k]))
            elif len(a) > 1: bm.faces.new((a[j], b[j], b[k], a[k]))
    return obj(sc, namn, bm, mat)

def ror(sc, namn, punkter, radie, mat, n=20):
    """Rör längs en mjuk bana genom punkterna, med rundade ändar."""
    from katt3d import spline
    c = spline(punkter, 40); T = np.gradient(c, axis=0); T /= np.linalg.norm(T, axis=1)[:, None]
    a = np.zeros_like(c); a[0] = np.cross(T[0], (1, 0, 0) if abs(T[0][0]) < 0.9 else (0, 1, 0)); a[0] /= np.linalg.norm(a[0])
    for i in range(1, len(c)): v = a[i - 1] - T[i] * (a[i - 1] @ T[i]); a[i] = v / np.linalg.norm(v)
    b = np.cross(T, a); bm = bmesh.new(); ringar = []
    for i in range(len(c)): ringar.append([bm.verts.new(Vector(c[i] + radie * (math.cos(t) * a[i] + math.sin(t) * b[i])) * U) for t in (j * 2 * math.pi / n for j in range(n))])
    for p, q in zip(ringar, ringar[1:]):
        for j in range(n): bm.faces.new((p[j], q[j], q[(j + 1) % n], p[(j + 1) % n]))
    o = obj(sc, namn, bm, mat)
    for i in (0, -1): klot(sc, namn + '-ande', c[i], radie, mat)
    return o

def kakel(namn, storlek, f1, f2, fog, rahet, fogbredd=0.035):
    """Kakel: rutor i två nästan lika toner med ljusare fog, lite blankt."""
    m, N, L = material(namn); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    ko = N('ShaderNodeTexCoord'); mp = N('ShaderNodeMapping'); L(ko.outputs['UV'], mp.inputs[0])
    t = N('ShaderNodeTexBrick'); L(mp.outputs[0], t.inputs['Vector']); t.offset = 0; t.inputs['Scale'].default_value = 1 / (storlek * U)
    t.inputs['Brick Width'].default_value = 1; t.inputs['Row Height'].default_value = 1; t.inputs['Mortar Size'].default_value = fogbredd; t.inputs['Mortar Smooth'].default_value = 0.25; t.inputs['Bias'].default_value = 0
    t.inputs['Color1'].default_value = (*f1, 1); t.inputs['Color2'].default_value = (*f2, 1); t.inputs['Mortar'].default_value = (*fog, 1)
    L(t.outputs['Color'], p.inputs['Base Color'])
    ra = N('ShaderNodeMapRange'); L(t.outputs['Fac'], ra.inputs[0]); ra.inputs[3].default_value, ra.inputs[4].default_value = rahet, 0.9; L(ra.outputs[0], p.inputs['Roughness'])
    bu = N('ShaderNodeBump'); bu.invert = True; bu.inputs['Strength'].default_value = 0.6; bu.inputs['Distance'].default_value = 0.004; L(t.outputs['Fac'], bu.inputs['Height']); L(bu.outputs[0], p.inputs['Normal'])
    return m

def plan(sc, namn, horn, mat):
    bm = bmesh.new(); vs = [bm.verts.new(Vector(h) * U) for h in horn]; f = bm.faces.new(vs); uv = bm.loops.layers.uv.new('uv')
    o0 = Vector(horn[0]) * U; ax = (Vector(horn[1]) - Vector(horn[0])).normalized(); ay = (Vector(horn[3]) - Vector(horn[0])).normalized()
    for l in f.loops: d = l.vert.co - o0; l[uv].uv = (d.dot(ax), d.dot(ay))      # uv i meter, så att kaklet blir lika stort överallt
    return obj(sc, namn, bm, mat, slat=False)

TRA, TRA_LJUS, ROD = (0.72, 0.40, 0.15), (0.86, 0.62, 0.36), (0.78, 0.13, 0.09)

def bygg_rum(sc):
    # vägg, golv och golvlist
    plan(sc, 'vagg', [(-2600, VAGG, -20), (2600, VAGG, -20), (2600, VAGG, 2400), (-2600, VAGG, 2400)], kakel('kakel-vagg', 104, (0.085, 0.43, 0.39), (0.075, 0.40, 0.365), (0.42, 0.74, 0.62), 0.38))
    plan(sc, 'golv', [(-2600, -4200, 0), (2600, -4200, 0), (2600, VAGG, 0), (-2600, VAGG, 0)], kakel('kakel-golv', 260, (0.80, 0.78, 0.74), (0.77, 0.75, 0.71), (0.60, 0.58, 0.55), 0.42, 0.018))
    lada(sc, 'golvlist', (-2600, 2600), (VAGG - 16, VAGG + 5), (0, 62), 7, yta('list', (0.84, 0.82, 0.78), 0.5))
    tra = yta('tra', TRA, 0.6, 0.3); tra_ljus = yta('tra-ljus', TRA_LJUS, 0.6, 0.3); rod = yta('rod', ROD, 0.35)
    # pallen under handfatet
    cx = KATT[0]
    lada(sc, 'pall-skiva', (cx - 178, cx + 178), (-142, 142), (96, 140), 14, tra)
    for sgn in (-1, 1): lada(sc, 'pall-ben', (cx + sgn * 108 - 62, cx + sgn * 108 + 62), (-134, 134), (0, 112), 14, tra)
    # handfatet: en riktig skål med kant, botten och avlopp
    bla = yta('handfat', (0.25, 0.50, 0.84), 0.28); SY = 0.74
    svarv(sc, 'handfat', (cx, 0, 0), [(0, 128), (72, 128), (112, 137), (150, 170), (174, 222), (184, 258), (190, 268), (189, 276), (183, 280), (174, 277), (167, 262), (150, 212), (118, 172), (72, 156), (0, 153)], bla, SY)
    svarv(sc, 'avlopp', (cx, 0, 0), [(0, 154.5), (13, 154.5), (15, 156), (13, 157.5), (0, 157.5)], yta('avlopp', (0.55, 0.6, 0.66), 0.3), SY, 24)
    # kranen: en böjd pip på bakre kanten och två röda vred
    krom = yta('kran', (0.80, 0.88, 0.95), 0.18, 0.8); kx, ky = cx + 128, 92
    svarv(sc, 'kran-fot', (kx, ky, 0), [(0, 274), (22, 274), (22, 286), (17, 292), (0, 292)], krom, 1, 28)
    ror(sc, 'kran', [(kx, ky, 284), (kx, ky, 316), (kx - 2, ky - 20, 344), (kx - 8, ky - 56, 346), (kx - 10, ky - 72, 326)], 11.5, krom)
    for dx, dy in ((-42, 22), (34, -30)):
        svarv(sc, 'vred-fot', (kx + dx, ky + dy, 0), [(0, 272), (9, 272), (9, 286), (0, 286)], krom, 1, 20); klot(sc, 'vred', (kx + dx, ky + dy, 296), (15, 15, 12), rod)
    # tandkrämstuben på handfatets vänstra kant (står på korken)
    tx = cx - 180; vit = yta('tub', (0.90, 0.90, 0.87), 0.4)
    svarv(sc, 'tub-kork', (tx, 0, 0), [(0, 278), (14, 278), (15, 281), (15, 296), (0, 296)], rod, 1, 28)
    bm = bmesh.new(); ringar = []
    for i in range(15):
        t = i / 14; z = 296 + 96 * t; rx = 20 + 3 * t; ry = 20 * (1 - t) ** 0.8 + 2.2
        ringar.append([bm.verts.new(Vector((tx + rx * math.cos(a), ry * math.sin(a), z)) * U) for a in (j * 2 * math.pi / 28 for j in range(28))])
    for p, q in zip(ringar, ringar[1:]):
        for j in range(28): bm.faces.new((p[j], q[j], q[(j + 1) % 28], p[(j + 1) % 28]))
    bm.faces.new(ringar[0]); bm.faces.new(ringar[-1]); tm, N, L = material('tub-rand'); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    g = N('ShaderNodeNewGeometry'); xyz = N('ShaderNodeSeparateXYZ'); L(g.outputs['Position'], xyz.inputs[0]); cr = N('ShaderNodeValToRGB'); cr.color_ramp.interpolation = 'CONSTANT'
    z0, z1 = 296 * U, 392 * U; band = [(0, (0.90, 0.90, 0.87)), (0.30, (0.06, 0.50, 0.50)), (0.52, (0.90, 0.90, 0.87)), (0.86, ROD)]
    while len(cr.color_ramp.elements) < len(band): cr.color_ramp.elements.new(0.5)
    for e, (pos, f) in zip(cr.color_ramp.elements, band): e.position = pos; e.color = (*f, 1)
    mr = N('ShaderNodeMapRange'); L(xyz.outputs['Z'], mr.inputs[0]); mr.inputs[1].default_value, mr.inputs[2].default_value = z0, z1; L(mr.outputs[0], cr.inputs[0]); L(cr.outputs[0], p.inputs['Base Color']); p.inputs['Roughness'].default_value = 0.4
    obj(sc, 'tub', bm, tm)
    # sidobordet (trappsteg) mot väggen, med muggen och de tre tandborstarna
    by = (735, 985)
    lada(sc, 'bord-hogt', (-610, -335), by, (0, 310), 20, tra_ljus); lada(sc, 'bord-lagt', (-825, -580), by, (0, 188), 20, tra_ljus)
    mx, my, mz = -470.0, 850.0, 310.0; mm, N, L = material('mugg'); p = N('ShaderNodeBsdfPrincipled'); L(p.outputs[0], N('ShaderNodeOutputMaterial').inputs[0])
    g = N('ShaderNodeNewGeometry'); xyz = N('ShaderNodeSeparateXYZ'); L(g.outputs['Position'], xyz.inputs[0]); cr = N('ShaderNodeValToRGB'); cr.color_ramp.interpolation = 'CONSTANT'
    band = [(0, (0.80, 0.20, 0.12)), (0.34, (0.05, 0.52, 0.50)), (0.60, (0.80, 0.20, 0.12))]
    while len(cr.color_ramp.elements) < len(band): cr.color_ramp.elements.new(0.5)
    for e, (pos, f) in zip(cr.color_ramp.elements, band): e.position = pos; e.color = (*f, 1)
    mr = N('ShaderNodeMapRange'); L(xyz.outputs['Z'], mr.inputs[0]); mr.inputs[1].default_value, mr.inputs[2].default_value = mz * U, (mz + 128) * U; L(mr.outputs[0], cr.inputs[0]); L(cr.outputs[0], p.inputs['Base Color']); p.inputs['Roughness'].default_value = 0.35
    svarv(sc, 'mugg', (mx, my, mz), [(0, 0), (58, 0), (66, 8), (76, 120), (74, 128), (68, 126), (60, 14), (0, 10)], mm)
    borst = yta('borst', (0.93, 0.93, 0.90), 0.8)
    for i, (farg, lut) in enumerate((((0.03, 0.50, 0.52), -0.30), ((0.88, 0.22, 0.48), 0.02), ((0.93, 0.56, 0.08), 0.30))):
        fm = yta(f'borste{i}', farg, 0.35); fot = np.array([mx + lut * 60, my + (i - 1) * 8, mz + 16]); d = np.array([math.sin(lut), 0.05 * (i - 1), math.cos(lut)]); d /= np.linalg.norm(d)
        topp = fot + d * 250; ror(sc, f'borste{i}-skaft', [fot, fot + d * 120, topp], 9, fm, 14)
        vr = Matrix.Rotation(-lut, 4, 'Y'); klot(sc, f'borste{i}-huvud', topp - d * 22, (14, 9, 36), fm, vr)
        h = lada(sc, f'borste{i}-borst', (-12, 12), (-22, -6), (-28, 28), 5, borst); h.matrix_world = Matrix.Translation(Vector(topp - d * 22) * U) @ vr
    # väggskåpet: två luckor, röda knoppar och en hylla under
    x0, _, z1 = plats(37, 65, VAGG); x1, _, z0 = plats(370, 262, VAGG)
    lada(sc, 'skap', (x0, x1), (VAGG - 125, VAGG + 5), (z0, z1), 22, tra); mx_ = (x0 + x1) / 2
    for sgn in (-1, 1):
        a, b = sorted((mx_ + sgn * 6, mx_ + sgn * ((x1 - x0) / 2 - 22))); lada(sc, 'skap-lucka', (a, b), (VAGG - 140, VAGG - 118), (z0 + 24, z1 - 24), 10, tra_ljus)
        klot(sc, 'skap-knopp', (mx_ + sgn * 26, VAGG - 146, (z0 + z1) / 2 - 10), 12, rod)
    lada(sc, 'skap-hylla', (x0 - 14, x1 + 14), (VAGG - 150, VAGG + 5), (z0 - 30, z0 - 6), 9, tra)
    # fisktavlan
    x0, _, z1 = plats(527, 28, VAGG); x1, _, z0 = plats(735, 232, VAGG); fx, fz = (x0 + x1) / 2, (z0 + z1) / 2
    lada(sc, 'tavla-ram', (x0, x1), (VAGG - 42, VAGG + 5), (z0, z1), 16, tra)
    lada(sc, 'tavla-duk', (x0 + 34, x1 - 34), (VAGG - 50, VAGG - 36), (z0 + 34, z1 - 34), 6, yta('duk', (0.90, 0.86, 0.74), 0.8))
    orange = yta('fisk', (0.88, 0.36, 0.05), 0.5); fy = VAGG - 54
    klot(sc, 'fisk', (fx - 8, fy, fz - 12), (46, 7, 29), orange)
    bm = bmesh.new(); vs = [bm.verts.new(Vector(p) * U) for p in ((fx + 28, fy - 5, fz - 12), (fx + 66, fy - 5, fz + 18), (fx + 56, fy - 5, fz - 12), (fx + 66, fy - 5, fz - 42), (fx + 28, fy + 5, fz - 12), (fx + 66, fy + 5, fz + 18), (fx + 56, fy + 5, fz - 12), (fx + 66, fy + 5, fz - 42))]
    for f in ((0, 1, 2, 3), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)): bm.faces.new([vs[i] for i in f])
    obj(sc, 'fisk-stjart', bm, orange, slat=False)
    klot(sc, 'fisk-oga', (fx - 30, fy - 6, fz - 6), 4.5, yta('svart', (0.02, 0.02, 0.02), 0.3))
    bubbla = yta('bubbla', (0.55, 0.78, 0.90), 0.4)
    for dx, dz, r in ((-52, 30, 6), (-40, 48, 4.5), (-50, 62, 3.5)): klot(sc, 'bubbla', (fx + dx, fy, fz + dz), (r, 3, r), bubbla)
    # handduken på sin knopp: smal upptill, veckad, med ränder nertill
    hx, _, hz = plats(1852, 292, VAGG); _, _, hb = plats(1852, 612, VAGG); bredd = 250.0; nu, nv = 41, 49
    bm = bmesh.new(); uvl = bm.loops.layers.uv.new('uv'); grid = []
    for j in range(nv):
        v = j / (nv - 1); w = bredd / 2 * (0.20 + 0.80 * (min(v / 0.42, 1) ** 0.6)); rad = []
        for i in range(nu):
            u = i / (nu - 1) * 2 - 1; veck = 16 * (0.35 + 0.65 * (1 - min(v / 0.9, 1))) * math.cos(u * math.pi * 2.5) * (0.5 + 0.5 * abs(u))
            rad.append(bm.verts.new(Vector((hx + u * w, VAGG - 40 - veck - 14 * (1 - u * u), hz - 22 - v * (hz - 22 - hb) - 10 * (1 - v) * (1 - u * u))) * U))
        grid.append(rad)
    for j in range(nv - 1):
        for i in range(nu - 1):
            f = bm.faces.new((grid[j][i], grid[j + 1][i], grid[j + 1][i + 1], grid[j][i + 1]))
            for l, (a, b) in zip(f.loops, ((i, j), (i, j + 1), (i + 1, j + 1), (i + 1, j))): l[uvl].uv = (a / (nu - 1), b / (nv - 1))
    hm = filt('handduk', (0.80, 0.22, 0.10)); N, L = hm.node_tree.nodes.new, hm.node_tree.links.new; p = hm.node_tree.nodes['Principled BSDF']
    uvn = N('ShaderNodeUVMap'); uvn.uv_map = 'uv'; xyz = N('ShaderNodeSeparateXYZ'); L(uvn.outputs[0], xyz.inputs[0]); cr = N('ShaderNodeValToRGB'); cr.color_ramp.interpolation = 'CONSTANT'
    band = [(0, (0.80, 0.22, 0.10)), (0.64, (0.92, 0.50, 0.10)), (0.71, (0.92, 0.84, 0.70)), (0.80, (0.92, 0.50, 0.10)), (0.88, (0.80, 0.22, 0.10))]
    while len(cr.color_ramp.elements) < len(band): cr.color_ramp.elements.new(0.5)
    for e, (pos, f) in zip(cr.color_ramp.elements, band): e.position = pos; e.color = (*f, 1)
    L(xyz.outputs['Y'], cr.inputs[0]); L(cr.outputs[0], p.inputs['Base Color'])
    h = obj(sc, 'handduk', bm, hm); sol = h.modifiers.new('tjock', 'SOLIDIFY'); sol.thickness = 16 * U; sub = h.modifiers.new('slat', 'SUBSURF'); sub.levels = sub.render_levels = 1
    klot(sc, 'handduk-knopp', (hx, VAGG - 30, hz), 19, yta('knopp', (0.85, 0.86, 0.88), 0.25))
    # ankan (tittar åt vänster)
    gul = yta('anka', (0.93, 0.66, 0.05), 0.32); ax, ay = cx + 262, 36
    klot(sc, 'anka-kropp', (ax + 6, ay, 40), (60, 44, 40), gul); klot(sc, 'anka-huvud', (ax - 34, ay, 92), (31, 30, 29), gul)
    klot(sc, 'anka-stjart', (ax + 56, ay, 58), (22, 20, 18), gul, Matrix.Rotation(math.radians(-35), 4, 'Y')); klot(sc, 'anka-vinge', (ax + 14, ay - 36, 46), (30, 12, 20), gul, Matrix.Rotation(math.radians(-12), 4, 'Y'))
    klot(sc, 'anka-nabb', (ax - 66, ay, 86), (17, 15, 7.5), yta('nabb', (0.90, 0.33, 0.04), 0.35)); klot(sc, 'anka-oga', (ax - 46, ay - 25, 99), 4.6, yta('svart2', (0.02, 0.02, 0.02), 0.2))

def bygg_ljus(sc):
    """Varmt, mjukt ljus: nyckelljus snett uppifrån vänster, svalt fyllnadsljus från höger, ett svagt toppljus som lyfter luddets kant,
    och lite ljus från hela rummet (mjuka kontaktskuggor)."""
    w = bpy.data.worlds.new('rum'); sc.world = w
    try: w.use_nodes = True
    except Exception: pass
    bg = w.node_tree.nodes['Background']; bg.inputs[0].default_value = (1.0, 0.93, 0.86, 1); bg.inputs[1].default_value = 0.20
    def lampa(namn, pos, mot, watt, storlek, farg):
        l = bpy.data.lights.new(namn, 'AREA'); l.energy, l.size, l.color = watt, storlek * U, farg; o = bpy.data.objects.new(namn, l); sc.collection.objects.link(o)
        o.location = Vector(pos) * U; o.rotation_euler = (Vector(mot) - Vector(pos)).to_track_quat('-Z', 'Y').to_euler(); return o
    lampa('nyckel', (-1300, -2800, 2300), (0, 350, 300), 125, 1500, (1.0, 0.90, 0.76))
    lampa('fyll', (2300, -2000, 900), (0, 350, 350), 26, 2200, (0.84, 0.90, 1.0))
    lampa('topp', (500, 650, 1900), (0, 430, 400), 14, 900, (1.0, 0.95, 0.88))

def bygg_kamera(sc, rutor):
    kam = bpy.data.cameras.new('kamera'); ko = bpy.data.objects.new('kamera', kam); sc.collection.objects.link(ko); sc.camera = ko
    kam.sensor_fit, kam.sensor_width, kam.lens = 'HORIZONTAL', 36, 36 * D / 1920
    kam.shift_y = -(540 - (FOT - HC)) / 1920            # kameran står högt men tittar rakt fram: bilden är förskjuten neråt, lodräta linjer förblir lodräta
    kam.clip_start, kam.clip_end = 0.1, 20; kam.dof.use_dof, kam.dof.aperture_fstop = True, BLANDARE
    ko.rotation_euler = (math.radians(90), 0, 0); skarpa = KATT[1] - 310      # skärpan på kattens ansikte
    for r, k in ((1, 0), (rutor, PUSH)):                # glider rakt in mot katten
        ko.location = (KATT[0] * U * k, -D * U * (1 - k), HC * U - k * (HC - 520) * U); ko.keyframe_insert('location', frame=r)
        kam.dof.focus_distance = (D * (1 - k) + skarpa) * U; kam.dof.keyframe_insert('focus_distance', frame=r)
    return ko
