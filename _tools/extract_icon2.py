# -*- coding: utf-8 -*-
"""从 exe 资源中提取图标（PrivateExtractIconsW / ExtractIconExW）并保存多尺寸 PNG。"""
import ctypes
import os
from ctypes import wintypes

from PIL import Image

user32 = ctypes.WinDLL("user32", use_last_error=True)
gdi32 = ctypes.WinDLL("gdi32", use_last_error=True)

DIB_RGB_COLORS = 0
LR_DEFAULTCOLOR = 0x0000


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


user32.PrivateExtractIconsW.restype = wintypes.UINT
user32.PrivateExtractIconsW.argtypes = [
    wintypes.LPCWSTR, ctypes.c_int, ctypes.c_int, ctypes.c_int,
    ctypes.POINTER(wintypes.HICON), ctypes.POINTER(wintypes.UINT),
    wintypes.UINT, wintypes.UINT]
user32.GetIconInfo.argtypes = [wintypes.HANDLE, ctypes.POINTER(ICONINFO)]
user32.DestroyIcon.argtypes = [wintypes.HICON]
user32.DestroyIcon.restype = wintypes.BOOL
gdi32.GetDIBits.argtypes = [wintypes.HDC, wintypes.HBITMAP, wintypes.UINT, wintypes.UINT,
                            ctypes.c_void_p, ctypes.POINTER(BITMAPINFO), wintypes.UINT]
gdi32.DeleteObject.argtypes = [wintypes.HGDIOBJ]
gdi32.DeleteObject.restype = wintypes.BOOL


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
            bmi.bmiHeader.biHeight = -size
            bmi.bmiHeader.biPlanes = 1
            bmi.bmiHeader.biBitCount = 32
            bmi.bmiHeader.biCompression = 0
            buf = ctypes.create_string_buffer(size * size * 4)
            got = gdi32.GetDIBits(hdc, info.hbmColor, 0, size, buf,
                                  ctypes.byref(bmi), DIB_RGB_COLORS)
            if got == 0:
                return None
            img = Image.frombuffer("RGBA", (size, size), buf, "raw", "BGRA", 0, 1).copy()
        finally:
            user32.ReleaseDC(None, hdc)
    finally:
        try:
            if info.hbmColor:
                gdi32.DeleteObject(info.hbmColor)
            if info.hbmMask:
                gdi32.DeleteObject(info.hbmMask)
        except Exception:
            pass
        try:
            user32.DestroyIcon(hicon)
        except Exception:
            pass
    if img.getchannel("A").getextrema()[1] == 0:
        img.putalpha(Image.new("L", img.size, 255))
    return img


def extract(exe_path, out_dir, stem, sizes=(256, 128, 96, 64, 48, 32)):
    results = []
    for s in sizes:
        hicon = wintypes.HICON()
        iconid = wintypes.UINT()
        n = user32.PrivateExtractIconsW(exe_path, 0, s, s,
                                        ctypes.byref(hicon), ctypes.byref(iconid), 1, 0)
        if not n or not hicon.value:
            print("  %s size %d: not found" % (stem, s))
            continue
        img = hicon_to_image(hicon, s)
        if img is None:
            print("  %s size %d: convert failed" % (stem, s))
            continue
        out = os.path.join(out_dir, "%s_%d.png" % (stem, s))
        img.save(out)
        alpha = img.getchannel("A")
        data = list(alpha.getdata())
        nonzero = sum(1 for p in data if p > 8)
        opaque = sum(1 for p in data if p > 250)
        results.append((s, out, nonzero / float(s * s), opaque / float(s * s)))
        print("  %s size %d -> %s coverage=%.3f opaque=%.3f"
              % (stem, s, os.path.basename(out), nonzero / float(s * s), opaque / float(s * s)))
    return results


if __name__ == "__main__":
    out_dir = r"D:\Administrator\Documents\toolbox-website\_tools"
    for exe, stem in [
        (r"D:\Program Files\AVTools\AVTools.exe", "avtools"),
        (r"D:\Program Files\CompressTool\CompressTool.exe", "compresstool"),
    ]:
        print(exe)
        extract(exe, out_dir, stem)
