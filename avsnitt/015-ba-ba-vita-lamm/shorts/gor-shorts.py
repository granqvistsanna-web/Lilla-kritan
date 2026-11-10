# Shorts för avsnitt 015 Bä, bä, vita lamm: stående 1080×1920 som 019:s, hela 16:9-bilden i mitten med en suddig, förstorad kopia ovanför och under,
# 0,3 s toning in och ut, och undertexter som SRT. Avsnittstid = sångtid + 13,5 (INTRO i scener/lager/matt.json, uppmätt mot sang.m4a 10 nov).
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp)
import subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, AV = HAR.parent / 'film/avsnitt-015.mp4', 13.5
X, W = 0, 1920
SHORTS = [
    (1, 'ba-ba-vita-lamm', 10.5, 33.4, [
        (12.0, 'Bä, bä, vita lamm, har du någon ull?'), (17.2, 'Ja, ja, kära barn, jag har säcken full.'),
        (23.0, 'Helgedagsrock åt far och söndagskjol åt mor,'), (28.4, 'och två par strumpor åt lille, lille bror.')]),
    (2, 'strumpor-pa', 33.4, 66.0, [
        (44.0, 'Bä, bä, vita lamm, har du någon ull?'), (49.2, 'Ja, ja, kära barn, jag har säcken full.'),
        (55.0, 'Helgedagsrock åt far och söndagskjol åt mor,'), (60.4, 'och två par strumpor åt lille, lille bror.')]),
]
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

for nr, namn, a, b, rader in SHORTS:
    if len(sys.argv) > 1 and str(nr) not in sys.argv[1:]: continue
    ut, d = HAR / f'{nr:02}-{namn}', b - a
    block = [(t - a, min(rader[i + 1][0] if i + 1 < len(rader) else b, b, t + 4) - a, tx)   # en rad står högst 4 s
             for i, (t, tx) in enumerate(rader)]
    ut.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(s)} --> {srt_tid(e)}\n{tx}\n\n' for i, (s, e, tx) in enumerate(block, 1)))
    h = round(1080 * 1080 / W / 2) * 2
    fk = (f'[0:v]crop={W}:1080:{X}:0,split[v][b];[b]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=0.04[bg];'
          f'[v]scale=1080:{h}[fg];[bg][fg]overlay=0:{(1920 - h) // 2},fade=in:d=0.3,fade=out:st={d - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
          f'[0:a]afade=in:d=0.3,afade=out:st={d - 0.3:.2f}:d=0.3[a]')
    subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-ss', f'{a + AV:.2f}', '-t', f'{d:.2f}', '-i', FILM,
                    '-filter_complex', fk, '-map', '[ut]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-r', '30',
                    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', ut.with_suffix('.mp4')], check=True)
    print(ut.with_suffix('.mp4').name, f'{d:.1f} s', len(block), 'rader')
