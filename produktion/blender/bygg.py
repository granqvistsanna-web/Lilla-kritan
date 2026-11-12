# Bygger 030:s badrum och en figur som riktig 3D i Blender och renderar. Allt görs ur de bilder och den rörelse som redan finns:
# varje urklipp (figurens delar, handfatet, bordet, skåpet …) blir en rund eller kantad form ur sin egen bild, så kritstrukturen
# följer med. Figurens delar ställs i varje bildruta efter riggens rörelse ur webbläsaren, och ansiktet (ritat i kod) läggs på kroppen.
#   1. Rummets bilder:  cd avsnitt/030-…/scener && for l in platta vagg anka bakom kar,pafat; do
#                       node render.mjs badet --lager $l --fran 15.6 --till 15.64 --ut <lager>/${l%%,*}; done
#   2. Figuren:         node produktion/blender/figur.mjs <figur> 15.6 20.1
#   3. Bygg:            /Applications/Blender.app/Contents/MacOS/Blender -b -P produktion/blender/bygg.py -- <lager> <figur> <ut> [--skala 25] [--rutor 1,60,120] [--spara]
# <ut>/NNNN.jpg, en per bildruta. --spara skriver också <ut>/scen.blend att öppna och ändra för hand.
# ponytail: rummets saker tas ur en stillbild, så det som flyttas i filmen (borstarna, tuben) står still här. De blir egna delar
# som figurens (figur.mjs) när ett helt avsnitt ska göras. Kameran är en bild (helbilden); klippen läggs i Blenders kamera då.
import bpy, sys, os, math, glob, json
import numpy as np
from mathutils import Vector, Matrix

a = sys.argv[sys.argv.index('--') + 1:]
LAGER, FIGUR, UT = (os.path.abspath(p) for p in a[:3])
val = lambda n, std=None: a[a.index(n) + 1] if n in a else std
SKALA, RUTOR = int(val('--skala', 100)), val('--rutor')

# Mått i scenens skärmpixlar (helbilden, 1920 × 1080). M = meter per pixel: bilden är 38 cm bred, som en liten dockteater.
M = 0.0002
D = 3580                    # kamerans avstånd till handfatets plan (långt objektiv, 67 mm: nästan ingen förvrängning)
FOT, HC = 988, 448          # raden där golvet ligger i handfatets plan, och kamerans höjd över golvet (bildens mitt = horisonten)
# Djupet bakom handfatets plan: figuren står bakom handfatet, bordet med muggen bakom figuren mot väggen.
FIG_Y, BORD_Y, VAGG = 215, 400, 520
SOL = (-0.7, -1, 1)         # mot ljuset: uppifrån, framifrån, lite från vänster. Lika brant mot golv och vägg, så att båda blir lika ljusa
LJUS0 = 0.254               # så ljus blir en vit yta i det ljuset (mätt i Blender 5.3 med solen 1,0); byts solens riktning mäts den om
SKUGGA = (0.58, 0.63, 0.76)                                    # skuggans ton på golv, vägg och saker: sval och ljus, aldrig svart
SKUGGA_RUND, LJUS_RUND, GLANS = (0.50, 0.54, 0.70), 0.30, 0.35  # figuren: skuggton, ljuset där ytan är fullt belyst, glansens styrka
BLANDARE, PUSH = 8.0, 0.03  # skärpedjup (lägre = suddigare vägg) och hur långt kameran glider in (andel av avståndet)
STEG = 4                    # nätets rutstorlek i bildens pixlar
KANT_FIGUR, NER = 10, 6     # figurens vita kant skalas bort (px i riggens mått), och figuren sänks så att fötterna når golvet
SLAT, KANTLJUS = 5, 0.16    # figurens kritstruktur slätas ut så många varv (0 = som ritad), och ett svagt ljus längs figurens kanter
# Rummets saker: (lager, läge, djup, golvrad i bilden, kant som skalas bort, rundning). 'golv' = står på golvet på sitt djup,
# 'vagg' = sitter på väggen där den syns i bilden. Rundning None = helt rund (som figuren), annars en skiva med så bred rundad kant (px).
SAKER = [('vagg', 'vagg', VAGG, None, 2, 16), ('bakom', 'golv', BORD_Y, 995, 2, 36), ('kar', 'golv', 0, 995, 2, 44), ('anka', 'golv', 30, 982, 2, None)]

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'
sc.world = bpy.data.worlds.new('svart'); sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0      # bara solen lyser; färgerna kommer ur bilderna
sc.view_settings.view_transform = 'Standard'                             # bildernas färger rakt av
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage, sc.render.fps = 1920, 1080, SKALA, 30
sc.eevee.taa_render_samples = 64; sc.eevee.use_shadows = True
forsta = lambda mapp: sorted(glob.glob(os.path.join(mapp, '*.png')))[0]
k_av = lambda y: (D + y) / D                                             # så mycket större måste något vara på djupet y för att se lika stort ut

def noder(namn):
    m = bpy.data.materials.new(namn); m.use_nodes = True; m.surface_render_method = 'DITHERED'; m.use_transparent_shadow = True
    nt = m.node_tree; nt.nodes.clear(); return m, nt.nodes.new, nt.links.new

def skuggad(N, L, farg, alfa=None, rund=False):
    """Färgen ur bilden × (skuggton … 1) efter hur mycket sol ytan får. Platta ytor: bara slagskuggor. Runda: också formen, plus lite glans."""
    vit = N('ShaderNodeBsdfDiffuse'); rgb = N('ShaderNodeShaderToRGB'); L(vit.outputs[0], rgb.inputs[0])
    ljus = N('ShaderNodeSeparateColor'); L(rgb.outputs[0], ljus.inputs[0])
    syns = N('ShaderNodeMath'); syns.operation = 'DIVIDE'; syns.use_clamp = True; L(ljus.outputs[0], syns.inputs[0])     # 0 = i skugga, 1 = i ljus
    syns.inputs[1].default_value = LJUS_RUND if rund else 0.9 * LJUS0
    ton = N('ShaderNodeMix'); ton.data_type = 'RGBA'; ton.inputs['A'].default_value = (*(SKUGGA_RUND if rund else SKUGGA), 1); ton.inputs['B'].default_value = (1, 1, 1, 1); L(syns.outputs[0], ton.inputs['Factor'])
    ut = N('ShaderNodeMix'); ut.data_type = 'RGBA'; ut.blend_type = 'MULTIPLY'; ut.inputs['Factor'].default_value = 1
    L(farg, ut.inputs['A']); L(ton.outputs['Result'], ut.inputs['B']); ut = ut.outputs['Result']
    if rund:
        blank = N('ShaderNodeBsdfGlossy'); blank.inputs['Roughness'].default_value = 0.5; g = N('ShaderNodeShaderToRGB'); L(blank.outputs[0], g.inputs[0])
        plus = N('ShaderNodeMix'); plus.data_type = 'RGBA'; plus.blend_type = 'ADD'; plus.inputs['Factor'].default_value = GLANS
        L(ut, plus.inputs['A']); L(g.outputs[0], plus.inputs['B']); ut = plus.outputs['Result']
        kant = N('ShaderNodeLayerWeight'); kant.inputs['Blend'].default_value = 0.25; kl = N('ShaderNodeMix'); kl.data_type = 'RGBA'; kl.blend_type = 'ADD'
        fk = N('ShaderNodeMath'); fk.operation = 'MULTIPLY'; fk.inputs[1].default_value = KANTLJUS; L(kant.outputs['Facing'], fk.inputs[0]); L(fk.outputs[0], kl.inputs['Factor'])
        L(ut, kl.inputs['A']); kl.inputs['B'].default_value = (0.75, 0.85, 1, 1); ut = kl.outputs['Result']
    lys = N('ShaderNodeEmission'); L(ut, lys.inputs[0]); slut = lys.outputs[0]
    if alfa:
        blanda = N('ShaderNodeMixShader'); L(alfa, blanda.inputs[0]); L(N('ShaderNodeBsdfTransparent').outputs[0], blanda.inputs[1]); L(slut, blanda.inputs[2]); slut = blanda.outputs[0]
    L(slut, N('ShaderNodeOutputMaterial').inputs[0])

def krymp(m, varv, forsta=0):                          # masken ett steg mindre per varv, omväxlande 4 och 8 grannar (ungefär runt)
    for n in range(forsta, forsta + varv):
        p = np.pad(m, 1); k = p[1:-1, 1:-1] & p[:-2, 1:-1] & p[2:, 1:-1] & p[1:-1, :-2] & p[1:-1, 2:]
        if n % 2: k &= p[:-2, :-2] & p[:-2, 2:] & p[2:, :-2] & p[2:, 2:]
        m = k
    return m
mjuka = lambda a: sum(np.roll(np.roll(a, i, 0), j, 1) for i in (-1, 0, 1) for j in (-1, 0, 1)) / 9

def blas_upp(namn, fil, x0, y0, kant, rundning=None, ansikte=None):
    """Ett platt urklipp blir en form: höjden växer in från kanten som på en kudde (rundning None), eller bara så långt som
    rundningen och sedan plant (en skiva med rundad kant). Lika på fram- och baksidan. Ger (objekt, halva tjockleken i bildens px)."""
    bild = bpy.data.images.load(fil); w, h = bild.size
    px = np.empty(w * h * 4, np.float32); bild.pixels.foreach_get(px); px = px.reshape(h, w, 4)[::-1].copy()      # rad 0 överst
    mask = krymp(px[..., 3] > 0.5, kant)                                       # utan den vita kanten
    if not rundning:                                                           # figuren: en slätare, putsad yta (färgen dras först ut över kanten, så att den inte blir vit där)
        inne = px[..., 3:] > 0.9; farg = np.where(inne, px[..., :3], 0); vikt = inne.astype(np.float32)
        for _ in range(KANT_FIGUR + 4): farg, vikt = mjuka(farg), mjuka(vikt)
        px[..., :3] = np.where(krymp(inne[..., 0], KANT_FIGUR - 2)[..., None], px[..., :3], farg / np.maximum(vikt, 1e-4))
        for _ in range(SLAT): px[..., :3] = mjuka(px[..., :3])
    px[..., 3] = mjuka(mask.astype(np.float32)); bild.pixels.foreach_set(px[::-1].ravel()); bild.update(); bild.pack()
    sub = np.pad(mask[::STEG, ::STEG], 2); av = np.zeros(sub.shape, np.float32); m = sub; varv = 0
    while m.any(): av += m; m = krymp(m, 1, varv); varv += 1                   # av = avståndet in från kanten, i nätrutor
    R = min(av.max(), rundning / STEG) if rundning else av.max(); av = np.minimum(av, R)
    hojd = mjuka(mjuka(np.sqrt(np.clip(2 * R * av - av * av, 0, None)))) * STEG * (1 if rundning else 0.8)      # 0,8: figuren är lite plattare än ett klot
    cell = sub[:-1, :-1] | sub[1:, :-1] | sub[:-1, 1:] | sub[1:, 1:]; jj, ii = np.nonzero(cell)
    med = np.zeros(sub.shape, bool); med[jj, ii] = med[jj + 1, ii] = med[jj, ii + 1] = med[jj + 1, ii + 1] = True
    nr = np.full(sub.shape, -1); n = int(med.sum()); nr[med] = np.arange(n); vj, vi = np.nonzero(med)
    xs, ys, hs = x0 + (vi - 2) * STEG, y0 + (vj - 2) * STEG, hojd[vj, vi]
    q = np.stack([nr[jj, ii], nr[jj, ii + 1], nr[jj + 1, ii + 1], nr[jj + 1, ii]], 1)
    me = bpy.data.meshes.new(namn)
    me.from_pydata(np.concatenate([np.stack([xs, ys, hs], 1), np.stack([xs, ys, -hs], 1)]).tolist(), [], np.concatenate([q, q[:, ::-1] + n]).tolist())
    hornen = np.empty(len(me.loops), np.int32); me.loops.foreach_get('vertex_index', hornen); hornen %= n
    me.uv_layers.new().data.foreach_set('uv', np.stack([(xs[hornen] - x0) / w, 1 - (ys[hornen] - y0) / h], 1).ravel())
    me.polygons.foreach_set('use_smooth', [True] * len(me.polygons))
    mt, N, L = noder(namn); tex = N('ShaderNodeTexImage'); tex.image = bild; tex.extension = 'CLIP'; farg = tex.outputs['Color']
    if ansikte:                                                                # ansiktet (ritat i kod, taget ur webbläsaren) rakt framifrån ovanpå kroppens färg
        filer = sorted(glob.glob(os.path.join(ansikte, '*.png'))); ab = bpy.data.images.load(filer[0]); ab.source = 'SEQUENCE'; k = k_av(FIG_Y)
        xyz = N('ShaderNodeSeparateXYZ'); L(N('ShaderNodeNewGeometry').outputs['Position'], xyz.inputs[0]); uv = N('ShaderNodeCombineXYZ')
        for ut, in_, gang, plus in ((0, 'X', 1 / (M * k * 1920), 0.5), (1, 'Z', 1 / (M * k * 1080), 1 - (FOT - NER) / 1080)):
            r = N('ShaderNodeMath'); r.operation = 'MULTIPLY_ADD'; L(xyz.outputs[in_], r.inputs[0]); r.inputs[1].default_value, r.inputs[2].default_value = gang, plus; L(r.outputs[0], uv.inputs[ut])
        at = N('ShaderNodeTexImage'); at.image = ab; at.extension = 'CLIP'; L(uv.outputs[0], at.inputs[0])
        at.image_user.frame_duration, at.image_user.frame_start, at.image_user.use_auto_refresh = len(filer), 1, True
        at.image_user.frame_offset = int(os.path.basename(filer[0])[:-4]) - 1
        pa = N('ShaderNodeMix'); pa.data_type = 'RGBA'; L(at.outputs['Alpha'], pa.inputs['Factor']); L(farg, pa.inputs['A']); L(at.outputs['Color'], pa.inputs['B']); farg = pa.outputs['Result']
    skuggad(N, L, farg, tex.outputs['Alpha'], rund=not rundning); me.materials.append(mt)
    o = bpy.data.objects.new(namn, me); sc.collection.objects.link(o); return o, float(hojd.max())

def stall(o, m, y, golvrad=None):
    """Ställer en form i rummet. m = (a, b, c, d, e, f): från formens egna mått till skärmens pixlar. På djupet y görs den så mycket
    större att den ser lika stor ut som i bilden. Med golvrad står den på golvet (raden i bilden där dess fot är); utan sitter den där den syns i bilden."""
    a_, b, c, d, e, f = m; s = math.sqrt(abs(a_ * d - b * c)); k = k_av(y)
    z = (-k * b, -k * d, k * (golvrad - f)) if golvrad else (-k * b, -k * d, HC + k * (540 - f))
    o.matrix_world = Matrix(((M * k * a_, M * k * c, 0, M * k * (e - 960)), (0, 0, -M * k * s, M * y), (M * z[0], M * z[1], 0, M * z[2]), (0, 0, 0, 1)))

# --- Rummet: väggen och golvet ur plattan (väggens rutor uppåt från golvlinjen, golvet den vita remsan), sakerna ur sina lager ------------
platta = bpy.data.images.load(forsta(os.path.join(LAGER, 'platta'))); SOM, VS = 866, 1.25      # raden där väggen möter golvet i plattan, och väggens skala
def yta(namn, horn, uv):
    me = bpy.data.meshes.new(namn); me.from_pydata([tuple(c * M for c in h) for h in horn], [], [(0, 1, 2, 3)])
    me.uv_layers.new().data.foreach_set('uv', [v for p in uv for v in p])
    mt, N, L = noder(namn); tex = N('ShaderNodeTexImage'); tex.image = platta; tex.extension = 'EXTEND'; skuggad(N, L, tex.outputs['Color']); me.materials.append(mt)
    sc.collection.objects.link(bpy.data.objects.new(namn, me))
B = 960 * VS
yta('vagg', [(-B, VAGG, 0), (B, VAGG, 0), (B, VAGG, SOM * VS), (-B, VAGG, SOM * VS)], [(0, 1 - SOM / 1080), (1, 1 - SOM / 1080), (1, 1), (0, 1)])
yta('golv', [(-B, -1500, 0), (B, -1500, 0), (B, VAGG, 0), (-B, VAGG, 0)], [(0, 0), (1, 0), (1, 1 - (SOM + 14) / 1080), (0, 1 - (SOM + 14) / 1080)])
for lager, lage, y, golvrad, kant, rundning in SAKER:
    o, _ = blas_upp(lager, forsta(os.path.join(LAGER, lager)), 0, 0, kant, rundning)
    stall(o, (1, 0, 0, 1, 0, 0), y, golvrad if lage == 'golv' else None)

# --- Figuren: delarna byggs en gång och ställs i varje bildruta efter sin matris ur webbläsaren. Delar som ritas före kroppen sitter i
# kroppens mittplan (de sticker ut ur den som på en riktig figur), svansen bakom, delar som ritas efter kroppen framför den.
# ponytail: lägena sätts i renderingsslingan, inte som nyckelbilder, så scen.blend står still. Nyckelbilder när rörelsen ska ändras i Blender.
data = json.load(open(os.path.join(FIGUR, 'delar.json')))
figur = [(i, d, *blas_upp(d['namn'], os.path.join(FIGUR, d['png']), d['x0'], d['y0'], KANT_FIGUR, ansikte=os.path.join(FIGUR, 'ansikte') if d['namn'] == 'kropp' else None))
         for i, d in enumerate(data['delar']) if any(r[i] for r in data['rutor'])]              # bara delar som syns någon gång
tjock = next(t for i, d, o, t in figur if d['namn'] == 'kropp')
def stall_figur(r):
    for i, d, o, t in figur:
        m = data['rutor'][r - 1][i]; o.hide_render = m is None
        if m: s = math.sqrt(abs(m[0] * m[3] - m[1] * m[2])); stall(o, m, FIG_Y + s * tjock * (-0.6 if d['fram'] else 0.5 if d['namn'] == 'tail' else 0), FOT - NER)

sol = bpy.data.lights.new('sol', 'SUN'); sol.energy = 1; sol.angle = math.radians(4.5)      # 4,5° = mjuka skuggkanter
so = bpy.data.objects.new('sol', sol); sc.collection.objects.link(so)
so.rotation_euler = Vector(SOL).to_track_quat('Z', 'Y').to_euler()

kam = bpy.data.cameras.new('kamera'); ko = bpy.data.objects.new('kamera', kam); sc.collection.objects.link(ko); sc.camera = ko
kam.sensor_fit, kam.sensor_width, kam.lens = 'HORIZONTAL', 36, 36 * D / 1920
kam.clip_start, kam.clip_end = 0.05, 10
kam.dof.use_dof, kam.dof.aperture_fstop = True, BLANDARE
ko.rotation_euler = (math.radians(90), 0, 0)
n = len(data['rutor']); sc.frame_start, sc.frame_end = 1, n
for r, k in ((1, 0), (n, PUSH)):                                             # glider rakt in mot figuren; skärpan ligger kvar på den
    ko.location = (0, -D * M * (1 - k), HC * M); ko.keyframe_insert('location', frame=r)
    kam.dof.focus_distance = (D * (1 - k) + FIG_Y) * M; kam.dof.keyframe_insert('focus_distance', frame=r)

os.makedirs(UT, exist_ok=True)
if '--spara' in a: stall_figur(1); bpy.ops.wm.save_as_mainfile(filepath=os.path.join(UT, 'scen.blend'))
sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 95
for r in ([int(x) for x in RUTOR.split(',')] if RUTOR else range(1, n + 1)):
    sc.frame_set(r); stall_figur(r); sc.render.filepath = os.path.join(UT, f'{r:04d}.jpg'); bpy.ops.render.render(write_still=True)
