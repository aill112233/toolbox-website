# -*- coding: utf-8 -*-
"""扫描 Inno Setup 安装包中的可读字符串，提取发布者/主页/安装目录等元信息。"""
import re
import sys

KEYWORDS = ["http://", "https://", "www.", ".com", ".cn", "publisher",
            "AVTools", "Compress", "压缩", "音视频", "Translator", "翻译",
            "DefaultDirName", "PrivilegesRequired", "AppName", "AppVersion",
            "安装", "卸载", "版权", "作者", "工具", "工具箱", "官网", "版本", "许可", "协议"]

RUN_ASCII = re.compile(r"[\x20-\x7e]{6,}")
RUN_WIDE = re.compile(r"[\x20-\x7e\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]{4,}")


def collect(data):
    out = []
    latin = data.decode("latin-1", errors="replace")
    out.extend(RUN_ASCII.findall(latin))
    wide = data.decode("utf-16-le", errors="replace")
    out.extend(RUN_WIDE.findall(wide))
    return out


for path in sys.argv[1:]:
    print("=" * 20, path)
    with open(path, "rb") as f:
        data = f.read()
    seen = set()
    hits = []
    for s in collect(data):
        s2 = s.strip()
        if not s2 or s2 in seen or len(s2) > 200:
            continue
        seen.add(s2)
        if any(k.lower() in s2.lower() for k in KEYWORDS):
            hits.append(s2)
    for h in hits[:70]:
        print("  ", h)
    print("  total hits:", len(hits))
