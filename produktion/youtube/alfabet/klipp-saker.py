"""Klipper ut Flow-bilderna till alfabetsfilmen: python3 produktion/youtube/alfabet/klipp-saker.py apelsin:01:1 ananas:02:1 …
(namn:scen:vald tagning). Originalen i assets/rekvisita/<namn>/original/, urklippet i cut/<namn>.png, kontrollbild på mörkblått."""
import sys, shutil, subprocess, os
from PIL import Image
F = os.path.expanduser('~/flow-mcp-out/' + os.environ.get('FLOWMAPP', 'lk-alfabet-a'))
for arg in sys.argv[1:]:
    namn, scen, val = arg.split(':'); d = f'assets/rekvisita/{namn}'
    os.makedirs(f'{d}/original', exist_ok=True); os.makedirs(f'{d}/cut', exist_ok=True)
    for v in (1, 2):
        if os.path.exists(f'{F}/scene-{scen}-v{v}.jpeg'): shutil.copy(f'{F}/scene-{scen}-v{v}.jpeg', f'{d}/original/{namn}-{v}.jpeg')
    shutil.copy(f'{F}/scene-{scen}-v{val}.jpeg', f'{d}/{namn}.jpeg')
    subprocess.run(['python3', 'verktyg/egen_kant.py', f'{d}/{namn}.jpeg', f'{d}/cut/{namn}.png'], check=True)
    i = Image.open(f'{d}/cut/{namn}.png'); b = Image.new('RGBA', i.size, (30, 40, 90, 255)); b.alpha_composite(i)
    b.convert('RGB').save(f'{d}/original/{namn}-kontroll.png'); print(namn, i.size)
