# Shorts för avsnitt 020 Grisen badar, gjorda som 019:s: stående 1080×1920, hela 16:9-bilden ur slutklippet (film/avsnitt-020.mp4)
# i mitten med en suddig, förstorad kopia ovanför och under, 0,3 s toning in och ut, och Malins repliker som SRT.
# Tiderna är filmtid (s). Varje klipp börjar och slutar mellan repliker, när kameran står still; ljudet läggs på −14 LUFS.
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp)
import json, re, subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM = HAR.parent / 'film/avsnitt-020.mp4'
# nr, namn, start, slut, rader (filmtid, text)
SHORTS = [
    (1, 'grisen-hoppar-i', 118.3, 146.8, [
        (118.77, 'Upp på pallen. Ett steg … två steg …'), (125.37, 'Oj! Nu hoppar grisen i badkaret!'),
        (133.97, 'Ha ha! Det var inte så dumt ändå.'), (143.77, 'Ni pratar visst med varandra.')]),
    (2, 'kan-du-hjalpa-grisen', 188.6, 215.0, [
        (189.31, 'Oj, lite lera är kvar. Grisen vet inte var.'), (195.64, 'Kan du hjälpa grisen? Kan du se var leran är?'),
        (207.28, 'Ja, där! Ja, på kinden!'), (211.57, 'Skrubba, skrubba … borta!')]),
    (3, 'plask-plask', 216.3, 243.8, [
        (216.66, 'Nu är du alldeles ren! Kan du blåsa en bubbla?'), (227.21, 'Fff … plopp!'),
        (233.16, 'Nu leker grisen i badkaret! Plask, plask!')]),
]
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

def lufs(fil, a=None, d=None):
    tid = ['-ss', f'{a:.2f}', '-t', f'{d:.2f}'] if a is not None else []
    ut = subprocess.run(['ffmpeg', '-nostdin', '-hide_banner', *tid, '-i', fil, '-af', 'loudnorm=I=-14:TP=-1.5:print_format=json',
                         '-f', 'null', '-'], capture_output=True, text=True).stderr
    return json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', ut).group())

for nr, namn, a, b, rader in SHORTS:
    if len(sys.argv) > 1 and str(nr) not in sys.argv[1:]: continue
    ut, d = HAR / f'{nr:02}-{namn}', b - a
    block = [(t - a, min(rader[i + 1][0] if i + 1 < len(rader) else b, b, t + 5) - a, tx)   # en rad står högst 5 s
             for i, (t, tx) in enumerate(rader)]
    ut.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(s)} --> {srt_tid(e)}\n{tx}\n\n' for i, (s, e, tx) in enumerate(block, 1)))
    m = lufs(FILM, a, d)   # tvåpass: mät klippet, lägg sedan på −14 linjärt
    an = (f"loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']},aresample=48000")
    fk = (f'[0:v]split[v][b];[b]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=0.04[bg];'
          f'[v]scale=1080:608[fg];[bg][fg]overlay=0:656,fade=in:d=0.3,fade=out:st={d - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
          f'[0:a]{an},afade=in:d=0.3,afade=out:st={d - 0.3:.2f}:d=0.3[a]')
    subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-ss', f'{a:.2f}', '-t', f'{d:.2f}', '-i', FILM,
                    '-filter_complex', fk, '-map', '[ut]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-r', '30',
                    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', ut.with_suffix('.mp4')], check=True)
    print(ut.with_suffix('.mp4').name, f'{d:.1f} s', len(block), 'rader', f"klippet var {m['input_i']} LUFS")
