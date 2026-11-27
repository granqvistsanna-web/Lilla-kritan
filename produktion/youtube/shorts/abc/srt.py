#!/usr/bin/env python3
"""SRT-undertexter till ABC-shortsen: Malins repliker (text ur malin-x-recept-3.txt, tid ur scenens window.LJUD via rader.mjs).
Bokstavens toner (A!, a-ja …) och röster utan rad i manuset hoppas över. Kör från repots rot: python3 produktion/youtube/shorts/abc/srt.py"""
import json, re, subprocess, pathlib
H = pathlib.Path('produktion/youtube/shorts/abc')
langd = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
tid = lambda s: f'{int(s // 3600):02}:{int(s % 3600 // 60):02}:{int(s % 60):02},{int(round(s % 1 * 1000)) % 1000:03}'
for rad in open(H / 'klipp.sh'):
    m = re.search(r"kor (\w) '([^|]+)\|([\d.]+)\|([\d.]+)", rad)
    if not m or not (H / m[2]).is_dir(): continue
    l, namn, a, b = m[1], m[2], float(m[3]), float(m[4])
    scen = f'produktion/youtube/alfabet/abc-{l}-recept-3'
    text = {k: re.sub(r'\s+\([^)]*\)\s*$', '', re.sub(r'^\[[^\]]+\]\s*', '', v)) for k, v in (r.strip().split(None, 1) for r in open(f'{scen}/malin-{l}-recept-3.txt') if r.strip())}
    # B och E fick introsamtalet efter manuset (E:s riktning 25/11), så de raderna står inte i deras txt
    for k, v in (('n-ska-vi-leka', f'Ska vi leka, {l.upper()}?'), ('n-ja-vad-kul', 'Ja! Vad kul!'), ('n-vad-ritar-nu', 'Vad ritar kritan nu?')): text.setdefault(k, v)
    rost = json.loads(subprocess.run(['node', H / 'rader.mjs', scen], capture_output=True, text=True).stdout)
    ut = []
    for i, (t, fil) in enumerate(rost):
        k = pathlib.Path(fil).stem.removesuffix('-1') if pathlib.Path(fil).stem not in text else pathlib.Path(fil).stem
        if k not in text or not a <= t < b: continue
        nasta = next((u for u, _ in rost[i + 1:] if u > t + 0.2), 1e9)
        s0, s1 = t - a, min(t + langd(fil) + 0.3, nasta - 0.05, b) - a
        ut.append(f'{len(ut) + 1}\n{tid(s0)} --> {tid(s1)}\n{text[k]}\n')
    (H / namn / f'{namn}.srt').write_text('\n'.join(ut))
    print(namn, len(ut), 'rader')
