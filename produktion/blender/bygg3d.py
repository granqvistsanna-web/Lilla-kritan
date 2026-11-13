# Bygger provet "katten i badrummet" (030, 0:15.6–0:20.1) som riktig 3D och renderar det med Cycles. Allt byggs i kod:
#   katt3d.py    katten: modell, armatur, filtludd, ansikte
#   rorelse3d.py rörelsen: går in, stannar, blir glad, vinkar (nyckelbilder på armaturen)
#   badrum3d.py  rummet, ljuset och kameran
# Kör (Blender 5.3; antingen Blender självt eller Python-modulen bpy):
#   blender -b -P produktion/blender/bygg3d.py -- <ut-mapp> [--skala 50] [--rutor 1,60,120 | 1-45] [--prov 16] [--har 1.0] [--gpu] [--utsnitt 0,0.1,0.8,0.8] [--spara]
#   python produktion/blender/bygg3d.py -- <ut-mapp> …
# <ut-mapp>/NNNN.png, en per bildruta. --spara skriver också <ut-mapp>/scen.blend (animerad, går att öppna och ändra för hand).
# Hela vägen till färdig film med ljud och sida-vid-sida: bash produktion/blender/bygg3d.sh
import bpy, sys, os, time
sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import katt3d, badrum3d, rorelse3d

a = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if not a: sys.exit('Ange en ut-mapp: … bygg3d.py -- <ut-mapp> [--skala 50] [--rutor 1,60,120 | 1-45] [--prov 48] [--har 1.0] [--spara]')
UT = os.path.abspath(a[0]); val = lambda n, std=None: a[a.index(n) + 1] if n in a else std
SKALA, PROV, HAR, RUTOR = int(val('--skala', 100)), int(val('--prov', 16)), float(val('--har', 1.0)), val('--rutor')

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.fps = 30; sc.frame_start, sc.frame_end = 1, rorelse3d.RUTOR
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = 1920, 1080, SKALA
sc.render.engine = 'CYCLES'; c = sc.cycles; c.device = 'CPU'
c.samples = PROV; c.use_adaptive_sampling = True; c.adaptive_threshold = 0.02; c.adaptive_min_samples = 16
c.use_denoising = True; c.denoiser = 'OPENIMAGEDENOISE'; c.denoising_input_passes = 'RGB_ALBEDO_NORMAL'
c.max_bounces, c.diffuse_bounces, c.glossy_bounces, c.transmission_bounces, c.transparent_max_bounces = 4, 2, 3, 0, 4
c.caustics_reflective = c.caustics_refractive = False; c.sample_clamp_indirect = 4
c.seed = int(val('--fro', 0)); c.use_animated_seed = False                    # samma brus i varje ruta: det som står still flimrar inte
if '--gpu' in a:                                            # grafikkort om det finns ett (annars processorn, som utan flaggan)
    try:
        pref = bpy.context.preferences.addons['cycles'].preferences
        for typ in ('OPTIX', 'CUDA', 'METAL', 'HIP', 'ONEAPI'):
            try: pref.compute_device_type = typ
            except TypeError: continue
            pref.get_devices(); kort = [d for d in pref.devices if d.type == typ]
            if kort:
                for d in pref.devices: d.use = d.type == typ
                c.device = 'GPU'; print('GRAFIKKORT', typ, [d.name for d in kort], flush=True); break
        else: print('Inget grafikkort hittades, renderar på processorn', flush=True)
    except Exception as fel: print('Grafikkortet gick inte att slå på, renderar på processorn:', fel, flush=True)
sc.cycles_curves.shape = 'RIBBONS'; sc.render.use_persistent_data = True
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGB'; sc.render.image_settings.compression = 30

if val('--utsnitt'):                                       # bara en del av bilden (x0,y0,x1,y1 som andelar, y nerifrån): snabba materialprov
    sc.render.use_border = True; sc.render.use_crop_to_border = True; sc.render.border_min_x, sc.render.border_min_y, sc.render.border_max_x, sc.render.border_max_y = (float(v) for v in val('--utsnitt').split(','))
badrum3d.bygg_rum(sc); badrum3d.bygg_ljus(sc); badrum3d.bygg_kamera(sc, rorelse3d.RUTOR)
ao, vila, delar = katt3d.bygg_katt(sc, HAR)
ao.location = (badrum3d.KATT[0] * katt3d.U, badrum3d.KATT[1] * katt3d.U, 0)
rorelse3d.animera(ao, vila, delar)

os.makedirs(UT, exist_ok=True)
if '--spara' in a: sc.frame_set(1); bpy.ops.wm.save_as_mainfile(filepath=os.path.join(UT, 'scen.blend'))
if RUTOR and '-' in RUTOR: r0, r1 = RUTOR.split('-'); rutor = range(int(r0), int(r1) + 1)
else: rutor = [int(x) for x in RUTOR.split(',')] if RUTOR else range(1, rorelse3d.RUTOR + 1)
for r in rutor:
    fil = os.path.join(UT, f'{r:04d}.png')
    if os.path.exists(fil) and '--om' not in a: continue                 # redan renderad (avbruten körning fortsätter där den slutade)
    t = time.time(); sc.frame_set(r); sc.render.filepath = fil; bpy.ops.render.render(write_still=True); print(f'RUTA {r} {time.time() - t:.1f} s', flush=True)
