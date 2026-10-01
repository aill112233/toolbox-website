# -*- coding: utf-8 -*-
"""生成网站图形资源：产品图标、站点 favicon、社交分享大图。"""
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = r"D:\Administrator\Documents\toolbox-website"
TOOLS = os.path.join(ROOT, "_tools")
IMG = os.path.join(ROOT, "assets", "img")
os.makedirs(IMG, exist_ok=True)

INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)
PURPLE = (168, 85, 247)
BG = (11, 13, 22)
CARD = (21, 26, 51)
LINE = (38, 44, 82)
TEXT = (232, 234, 246)
MUTED = (154, 163, 199)


def gradient(size, c1=INDIGO, c2=PURPLE, angle_diag=True):
    """生成对角线性渐变图。"""
    w, h = size
    y, x = np.mgrid[0:h, 0:w]
    if angle_diag:
        t = (x / max(w - 1, 1) + y / max(h - 1, 1)) / 2.0
    else:
        t = y / max(h - 1, 1)
    t = t[..., None]
    arr = (np.array(c1) * (1 - t) + np.array(c2) * t).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def rounded_mask(size, radius_ratio=0.22):
    w, h = size
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    r = int(min(w, h) * radius_ratio)
    d.rounded_rectangle([0, 0, w - 1, h - 1], radius=r, fill=255)
    return mask


def toolbox_glyph(draw, box, color=(255, 255, 255), width=None):
    """在给定方框内画一个工具箱图标。"""
    x0, y0, x1, y1 = box
    w = x1 - x0
    h = y1 - y0
    lw = width or max(2, int(w * 0.085))
    # 提手
    hx0 = x0 + w * 0.30
    hx1 = x0 + w * 0.70
    hy1 = y0 + h * 0.34
    draw.arc([hx0, y0 + h * 0.02, hx1, y0 + h * 0.62], start=180, end=360,
             fill=color, width=lw)
    # 箱体
    by0 = y0 + h * 0.34
    draw.rounded_rectangle([x0 + w * 0.06, by0, x1 - w * 0.06, y1 - h * 0.06],
                           radius=int(w * 0.12), fill=color)
    # 中间锁扣（用背景色抠出）
    notch = [x0 + w * 0.40, by0 + h * 0.16, x0 + w * 0.60, by0 + h * 0.38]
    draw.rounded_rectangle(notch, radius=int(w * 0.04), fill=(0, 0, 0, 0))


def make_logo(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    grad = gradient((size, size)).convert("RGBA")
    mask = rounded_mask((size, size))
    img.paste(grad, (0, 0), mask)
    # 白色工具箱画在单独图层上，便于打出透明锁扣
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pad = size * 0.22
    toolbox_glyph(d, (pad, pad, size - pad, size - pad), (255, 255, 255), int(size * 0.055))
    img = Image.alpha_composite(img, layer)
    return img


FONTS = [
    r"C:\Windows\Fonts\msyhbd.ttc",
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\simhei.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
]


def load_font(px):
    for f in FONTS:
        if os.path.isfile(f):
            try:
                return ImageFont.truetype(f, px)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    # ---- 产品图标 ----
    pairs = [
        ("avtools_128.png", "app-avtools.png"),
        (r"D:\Administrator\Documents\CompressKit\icon-256.png", "app-compresskit.png"),
        ("gmt_256.png", "app-gamemodtranslator.png"),
    ]
    for src, dst in pairs:
        p = os.path.join(TOOLS, src)
        im = Image.open(p).convert("RGBA")
        im.save(os.path.join(IMG, dst))
        im.resize((64, 64), Image.LANCZOS).save(
            os.path.join(IMG, dst.replace(".png", "-64.png")))
        print("icon ->", dst, im.size)

    # ---- 站点 logo / favicon ----
    logo = make_logo(512)
    logo.save(os.path.join(IMG, "logo.png"))
    logo.resize((180, 180), Image.LANCZOS).save(os.path.join(IMG, "apple-touch-icon.png"))
    logo.resize((32, 32), Image.LANCZOS).save(os.path.join(IMG, "favicon-32.png"))
    logo.save(os.path.join(ROOT, "favicon.ico"),
              sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("logo/favicon ok")

    # ---- 社交分享大图 1200x630 ----
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(og)
    # 背景光晕
    glow = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(glow)
    for i in range(220, 0, -4):
        a = i / 220.0
        col = (int(11 + 60 * a * 0.6), int(13 + 40 * a * 0.6), int(22 + 90 * a * 0.6))
        gd.ellipse([W - 520 - i * 2, -320 - i, W + 260 + i, 320 + i], fill=col)
    og = Image.blend(og, glow, 0.55)
    d = ImageDraw.Draw(og)

    f_title = load_font(74)
    f_sub = load_font(32)
    f_small = load_font(26)
    f_name = load_font(28)

    d.text((78, 96), "三款 Windows 实用工具", font=f_title, fill=TEXT)
    d.text((78, 196), "音视频处理 · 压缩解压 · 游戏 Mod AI 翻译", font=f_sub, fill=VIOLET)
    d.text((78, 258), "中文界面 · 本地运行 · 一处下载全部拿到", font=f_sub, fill=MUTED)

    cards = [
        ("app-avtools.png", "AVTools", "音视频工具箱"),
        ("app-compresskit.png", "CompressKit", "压缩工具箱"),
        ("app-gamemodtranslator.png", "GameModTranslator", "游戏 Mod 翻译器"),
    ]
    cw, ch = 330, 210
    gap = 27
    x = 78
    for fname, title, sub in cards:
        y = 340
        d.rounded_rectangle([x, y, x + cw, y + ch], radius=18, fill=CARD, outline=LINE, width=2)
        ic = Image.open(os.path.join(IMG, fname)).convert("RGBA").resize((72, 72), Image.LANCZOS)
        og.paste(ic, (x + 26, y + 30), ic)
        d.text((x + 26, y + 120), title, font=f_name, fill=TEXT)
        d.text((x + 26, y + 160), sub, font=f_small, fill=MUTED)
        x += cw + gap

    d.text((78, 578), "Windows 10 / 11 64 位 · 免费下载 · SHA256 校验", font=f_small, fill=MUTED)
    og.save(os.path.join(IMG, "og-image.png"))
    print("og-image ok", og.size)


if __name__ == "__main__":
    main()
