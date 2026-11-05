# Igges armar: korta rundade stumpar i magens kritstruktur med vit kant (som rita-lemmar.py, mindre mått)
# Körs i igelkotten-igge/: ~/.claude/skills/ai-video/.venv/bin/python -I lemmar/rita-armar.py
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageChops
SS = 4; N = 1024 * SS
bit = Image.open("cut/igelkotten-igge-body.png").convert("RGB").crop((420, 600, 560, 720))
tex = Image.new("RGB", (1024, 1024))
for y in range(0, 1024, bit.height):
    for x in range(0, 1024, bit.width):
        tex.paste(bit if (x // bit.width + y // bit.height) % 2 == 0 else bit.transpose(Image.FLIP_LEFT_RIGHT), (x, y))
def kapsel(d, a, b, ra, rb):
    for i in range(65):
        t = i / 64; x = a[0] + (b[0] - a[0]) * t; y = a[1] + (b[1] - a[1]) * t; r = ra + (rb - ra) * t
        d.ellipse([(x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS], fill=255)
for namn, p, sida in (("arm-l", (268, 548), -1), ("arm-r", (756, 548), 1)):
    m = Image.new("L", (N, N), 0)
    kapsel(ImageDraw.Draw(m), p, (p[0] + sida * 34, p[1] + 62), 24, 29)
    m = m.resize((1024, 1024), Image.LANCZOS)
    rim = m.filter(ImageFilter.MaxFilter(13)).filter(ImageFilter.GaussianBlur(0.8))
    im = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))
    im.paste((255, 255, 255, 255), mask=rim); im.paste(tex, mask=m)
    im.putalpha(ImageChops.lighter(rim, m))
    im.save(f"lemmar/igelkotten-igge-{namn}.png")
