# -*- coding: utf-8 -*-
"""从 exe 中提取图标并保存为多个尺寸的 PNG，用于挑选最清晰的一张。"""
import ctypes
import os
import sys
from ctypes import wintypes

from PIL import Image

user32 = ctypes.WinDLL("user32", use_last_error=True)
gdi32 = ctypes.WinDLL("gdi32", use_last_error=True)

LR_LOADFROMFILE = 0x0010
IMAGE_ICON = 1
DIB_RGB_COLORS = 0


class ICONINFO(ctypes.Structure):
    _fields_ = [
        ("fIcon", wintypes.BOOL),
        ("xHotspot", wintypes.DWORD),
        ("yHotspot", wintypes.DWORD),
        ("hbmMask", wintypes.HBITMAP),
        ("hbmColor", wintypes.HBITMAP),
    ]


class BITMAPINFOHEADER(ctypes.Structure):
    _fields_ = [
        ("biSize", wintypes.DWORD),
        ("biWidth", wintypes.LONG),
        ("biHeight", wintypes.LONG),
        ("biPlanes", wintypes.WORD),
        ("biBitCount", wintypes.WORD),
        ("biCompression", wintypes.DWORD),
        ("biSizeImage", wintypes.DWORD),
        ("biXPelsPerMeter", wintypes.LONG),
        ("biYPelsPerMeter", wintypes.LONG),
        ("biClrUsed", wintypes.DWORD),
        ("biClrImportant", wintypes.DWORD),
    ]


class BITMAPINFO(ctypes.Structure):
    _fields_ = [("bmiHeader", BITMAPINFOHEADER), ("bmiColors", wintypes.DWORD * 3)]


user32.LoadImageW.restype = wintypes.HANDLE
user32.LoadImageW.argtypes = [wintypes.HINSTANCE, wintypes.LPCWSTR, wintypes.UINT,
                              ctypes.c_int, ctypes.c_int, wintypes.UINT]
user32.GetIconInfo.argtypes = [wintypes.HANDLE, ctypes.POINTER(ICONINFO)]
gdi32.GetDIBits.argtypes = [wintypes.HDC, wintypes.HBITMAP, wintypes.UINT, wintypes.UINT,
                            ctypes.c_void_p, ctypes.POINTER(BITMAPINFO), wintypes.UINT]


def hicon_to_image(hicon, size):
    info = ICONINFO()
    if not user32.GetIconInfo(hicon, ctypes.byref(info)):
        return None
    try:
        hdc = user32.GetDC(None)
        try:
            bmi = BITMAPINFO()
            bmi.bmiHeader.biSize = ctypes.sizeof(BITMAPINFOHEADER)
            bmi.bmiHeader.biWidth = size
            bmi.bmiHeader.biHeight = -size  # 自上而下
            bmi.bmiHeader.biPlanes = 1
            bmi.bmiHeader.biBitCount = 32
            bmi.bmiHeader.biCompression = 0
            buf = ctypes.create_string_buffer(size * size * 4)
            got = gdi32.GetDIBits(hdc, info.hbmColor, 0, size, buf,
                                  ctypes.byref(bmi), DIB_RGB_COLORS)
            if got == 0:
                return None
            img = Image.frombuffer("RGBA", (size, size), buf, "raw", "BGRA", 0, 1)
        finally:
            user32.ReleaseDC(None, hdc)
    finally:
        if info.hbmColor:
            gdi32.DeleteObject(info.hbmColor)
        if info.hbmMask:
            gdi32.DeleteObject(info.hbmMask)
        user32.DestroyIcon(hicon)

    img = img.copy()
    # 某些 32bpp 图标 alpha 全 0，则视为不透明
    if img.getchannel("A").getextrema()[1] == 0:
        img.putalpha(Image.new("L", img.size, 255))
    return img


def extract(exe_path, out_prefix, sizes=(256, 128, 96, 64, 48, 32)):
    written = []
    for s in sizes:
        hicon = user32.LoadImageW(None, exe_path, IMAGE_ICON, s, s, LR_LOADFROMFILE)
        if not hicon:
            print("  size %d: LoadImage failed" % s)
            continue
        img = hicon_to_image(hicon, s)
        if img is None:
            print("  size %d: convert failed" % s)
            continue
        out = "%s_%d.png" % (out_prefix, s)
        img.save(out)
        # 统计非透明像素占比，用于判断是否为空白
        alpha = img.getchannel("A")
        nonzero = sum(1 for p in alpha.getdata() if p > 8)
        written.append((s, out, nonzero / float(s * s)))
        print("  size %d -> %s  coverage=%.3f" % (s, os.path.basename(out), nonzero / float(s * s)))
    return written


if __name__ == "__main__":
    for exe, prefix in [
        (r"D:\Program Files\AVTools\AVTools.exe", r"D:\Administrator\Documents\toolbox-website\_tools\avtools"),
        (r"D:\Program Files\CompressTool\CompressTool.exe", r"D:\Administrator\Documents\toolbox-website\_tools\compresstool"),
    ]:
        print(exe)
        extract(exe, prefix)

    # GameModTranslator 直接有 icon.ico，取最大尺寸转 PNG
    ico = r"D:\Administrator\Documents\GameModTranslator\icon.ico"
    img = Image.open(ico)
    print("ico mode=%s size=%s" % (img.mode, img.size))
    best = None
    for s in (256, 128, 96, 64, 48, 32, 16):
        try:
            img2 = Image.open(ico)
            img2.size = (s, s)
            img2.load()
            if best is None:
                best = (s, img2.copy())
        except Exception as e:
            print("  ico size %d unavailable (%s)" % (s, e))
    if best:
        out = r"D:\Administrator\Documents\toolbox-website\_tools\gmt_%d.png" % best[0]
        best[1].convert("RGBA").save(out)
        print("  saved %s" % out)
