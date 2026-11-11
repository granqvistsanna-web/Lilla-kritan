# Shorts ur ett färdigt avsnitt, samma recept som 019–021: stående 1080×1920, hela 16:9-bilden i mitten med en suddig, förstorad kopia
# ovanför och under, 0,3 s toning in och ut, −14 LUFS (tvåpass). Undertexterna (SRT) tas ur filmens egen film/avsnitt-NNN.sv.srt,
# så klippen börjar och slutar mellan Malins repliker. Tiderna är filmtid i sekunder.
# Kör (från repots rot): python3 avsnitt/gor-shorts-ur-srt.py 022 [nr …]   → avsnitt/022-*/shorts/NN-namn.mp4 + .srt
import json, re, subprocess, sys, pathlib
AVS = pathlib.Path(__file__).resolve().parent
# avsnitt: [(nr, namn, start, slut)]
SHORTS = {
    '022': [(1, 'en-banan', 46.0, 68.5), (2, 'tittut-var-ar-kaninen', 68.5, 100.0),
            (3, 'var-tog-glaset-vagen', 118.0, 137.9), (4, 'mjolkmustasch', 137.9, 162.0)],
    '023': [(1, 'en-hal-tval', 51.5, 88.0), (2, 'gnugga-gnugga-ren', 88.0, 108.0),
            (3, 'kan-du-hjalpa-bjornen', 108.0, 140.5), (4, 'klapp-klapp-och-handduken', 140.5, 184.0)],
    '024': [(1, 'en-rod-mossa', 43.5, 70.9), (2, 'tittut-var-ar-lammet', 70.9, 92.0),
            (3, 'var-ar-stovlarna', 110.0, 139.0), (4, 'stamp-stamp-stamp', 139.0, 163.5)],
}

def tid(s):
    h, m, r = s.split(':'); r, ms = r.split(','); return int(h) * 3600 + int(m) * 60 + int(r) + int(ms) / 1000
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

def lufs(fil, a, d):
    ut = subprocess.run(['ffmpeg', '-nostdin', '-hide_banner', '-ss', f'{a:.2f}', '-t', f'{d:.2f}', '-i', fil, '-af',
                         'loudnorm=I=-14:TP=-1.5:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', ut).group())

avs = sys.argv[1]
mapp = next(AVS.glob(f'{avs}-*'))
film = mapp / f'film/avsnitt-{avs}.mp4'
srt = (mapp / f'film/avsnitt-{avs}.sv.srt').read_text().replace('\r', '')
rader = [(tid(m[2]), tid(m[3]), m[4].strip()) for m in re.finditer(r'(\d+)\n(\S+) --> (\S+)\n(.+?)(?:\n\n|\Z)', srt, re.S)]
(mapp / 'shorts').mkdir(exist_ok=True)
for nr, namn, a, b in SHORTS[avs]:
    if len(sys.argv) > 2 and str(nr) not in sys.argv[2:]: continue
    ut, d = mapp / 'shorts' / f'{nr:02}-{namn}', b - a
    ur = [(s - a, min(e, b) - a, tx.replace('\n', ' ')) for s, e, tx in rader if a <= s < b]
    ut.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(s)} --> {srt_tid(e)}\n{tx}\n\n' for i, (s, e, tx) in enumerate(ur, 1)))
    m = lufs(film, a, d)
    an = (f"loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']},aresample=48000")
    fk = (f'[0:v]split[v][b];[b]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=0.04[bg];'
          f'[v]scale=1080:608[fg];[bg][fg]overlay=0:656,fade=in:d=0.3,fade=out:st={d - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
          f'[0:a]{an},afade=in:d=0.3,afade=out:st={d - 0.3:.2f}:d=0.3[a]')
    subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-ss', f'{a:.2f}', '-t', f'{d:.2f}', '-i', film,
                    '-filter_complex', fk, '-map', '[ut]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-r', '30',
                    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', ut.with_suffix('.mp4')], check=True)
    print(ut.name + '.mp4', f'{d:.1f} s', len(ur), 'rader', f"klippet var {m['input_i']} LUFS")
