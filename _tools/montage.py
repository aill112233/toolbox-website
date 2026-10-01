# -*- coding: utf-8 -*-
"""把提取出的图标候选拼成一张对比图，便于肉眼挑选最清晰的一张。"""
import os
from PIL import Image, ImageDraw

SRC = r"D:\Administrator\Documents\toolbox-website\_tools"
OUT = os.path.join(SRC, "contact_sheet.png")

stems = ["avtools", "compresstool"]
sizes = [256, 128, 96, 64, 48, 32]

cell = 280
cols = 7
rows = len(stems) + 1
sheet = Image.new("RGB", (cell * cols, cell * rows), (24, 26, 40))
draw = ImageDraw.Draw(sheet)

# 表头
draw.text((10, 10), "size ->", fill=(220, 224, 245))
for c, s in enumerate(sizes):
    draw.text((cell * (c + 1) + 10, 10), str(s), fill=(220, 224, 245))
draw.text((10, cell + 10), "gmt ico 256", fill=(220, 224, 245))

for r, stem in enumerate(stems):
    y = cell * (r + 1)
    draw.text((10, y + 10), stem, fill=(220, 224, 245))
    for c, s in enumerate(sizes):
        p = os.path.join(SRC, "%s_%d.png" % (stem, s))
        if not os.path.isfile(p):
            continue
        img = Image.open(p).convert("RGBA")
        # 棋盘背景，便于观察透明区域
        bg = Image.new("RGB", (s, s), (60, 64, 96))
        for yy in range(0, s, 8):
            for xx in range(0, s, 8):
                if ((xx // 8) + (yy // 8)) % 2 == 0:
                    for a in range(xx, min(xx + 8, s)):
                        for b in range(yy, min(yy + 8, s)):
                            bg.putpixel((a, b), (92, 98, 138))
        bg.paste(img, (0, 0), img)
        sheet.paste(bg, (cell * (c + 1) + 10, y + 30))

gmt = os.path.join(SRC, "gmt_256.png")
if os.path.isfile(gmt):
    img = Image.open(gmt).convert("RGBA")
    bg = Image.new("RGB", img.size, (60, 64, 96))
    bg.paste(img, (0, 0), img)
    sheet.paste(bg, (10, cell + 30))

sheet.save(OUT)
print(OUT, sheet.size)
