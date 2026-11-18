import sys
from PIL import Image, ImageDraw, ImageFilter
S, SK, CX, FOT, SHIFT, ut = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), sys.argv[6]
bg = Image.open(f'{S}/f-120.png').convert('RGB'); tom = Image.open(f'{S}/f-19.5.png').convert('RGB')
c = tom.copy(); c.paste(bg, (SHIFT, 0))
apa = Image.open(f'{S}/apa-cut.png'); apa = apa.resize((round(apa.width * SK), round(apa.height * SK)), Image.LANCZOS)
sk = Image.new('L', c.size, 0); ImageDraw.Draw(sk).ellipse((CX - 300, FOT - 40, CX + 300, FOT + 25), fill=95)
c = Image.composite(Image.new('RGB', c.size, (59, 52, 49)), c, sk.filter(ImageFilter.GaussianBlur(22)))
c.paste(apa, (CX - apa.width // 2, FOT - apa.height), apa)
c.resize((1280, 720), Image.LANCZOS).save(ut)
