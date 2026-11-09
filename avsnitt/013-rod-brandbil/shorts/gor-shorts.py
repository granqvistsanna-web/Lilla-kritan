# Shorts för avsnitt 013 Röda sången: stående 1080×1920 (som 007:s men 9:16), hela 16:9-bilden ur slutklippet
# (film/avsnitt-013-final.mp4) i mitten med en suddig, förstorad kopia ovanför och under, 0,3 s toning in och ut, och undertexter
# som SRT (raderna nedan: rader.txt, versen omtajmad med Whisper large-v3-turbo 2026-11-09, den låg ca 2 s fel). Avsnittstid = sångtid + 20,7 (uppmätt mot sang.m4a). Sången klipps bara mellan hela fraser.
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp)
import subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, AV = HAR.parent / 'film/avsnitt-013-final.mp4', 20.7
X, W = 0, 1920   # utsnittets vänsterkant och bredd i 1920-bilden: hela bilden (brandbilen kör över hela bredden, fyra dansar)
# nr, namn, start, slut (sångtid, s), rader (sångtid, text)
SHORTS = [
    (1, 'har-kommer-en-brandbil', 1.5, 34.6, [
        (1.9, 'Här kommer en brandbil! (Iii-ooo!)'), (5.7, 'En stor och röd brandbil! (Röd, röd!)'), (10.0, 'Den kör på vår väg! (Brum, brum!)'),
        (14.0, 'Kom, vi åker med! (Tut, tut!)'), (18.0, 'Röd, röd brandbil! Brandbilen är röd! (Iii-ooo!)'), (22.8, 'Röd, röd brandbil!'),
        (24.7, 'Tuta med oss! (Tut, tut!)'), (26.9, 'Uppför backen! (Brum, brum!)'), (29.0, 'Nerför backen! (Iii-ooo!)'),
        (30.8, 'Röd, röd brandbil! Brandbilen är röd!')]),
    (2, 'vad-ar-rott', 34.6, 60.0, [
        (34.7, 'Vad är rött? Vad är rött?'), (38.5, 'En ballong! (Röd ballong!)'), (40.0, 'Vad är rött? Vad är rött?'),
        (43.2, 'Ett äpple! (Rött äpple!)'), (45.2, 'Vad är rött? Vad är rött?'), (47.2, 'En blomma! (Röd blomma!)'),
        (53.7, 'Röd, röd brandbil! Brandbilen är röd!'), (57.9, 'Röd, röd brandbil!')]),
    (3, 'danspaus', 85.4, 123.8, [
        (86.0, 'Danspaus! (Danspaus!)'), (89.0, 'Stampa, stampa!'), (91.0, 'Vifta, vifta!'), (93.3, 'Hoppa, hoppa!'), (95.2, 'Klappa, klappa!'),
        (97.4, 'Stampa, stampa!'), (99.4, 'Vifta, vifta!'), (101.4, 'Hoppa, hoppa!'), (103.4, 'Klappa, klappa!'),
        (105.5, 'Röd, röd brandbil! Brandbilen är röd!'), (109.0, 'Röd ballong! (Röd ballong!)'), (112.1, 'Rött äpple!'),
        (113.8, 'Röd blomma! (Röd blomma!)'), (116.3, 'Röd brandbil! Röd, röd, röd!'), (119.8, 'Allting är rött! (Rött, rött!)')]),
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
