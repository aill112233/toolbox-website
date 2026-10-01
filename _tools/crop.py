# -*- coding: utf-8 -*-
"""从整页截图里裁出局部并放大，检查细节排版。"""
import os
import sys

from PIL import Image

SHOTS = r"D:\Administrator\Documents\toolbox-website\_tools\shots"

jobs = [
    ("index-desktop.png", (0, 2400, 1440, 2980), "crop-support.png"),
    ("index-desktop.png", (0, 620, 1440, 960), "crop-cards.png"),
    ("index-desktop.png", (0, 1600, 1440, 2000), "crop-downloads.png"),
    ("avtools-desktop.png", (0, 0, 1440, 700), "crop-apphero.png"),
]

for src, box, out in jobs:
    p = os.path.join(SHOTS, src)
    if not os.path.isfile(p):
        print("missing", p)
        continue
    im = Image.open(p).convert("RGB").crop(box)
    im.save(os.path.join(SHOTS, out))
    print("wrote", out, im.size)
