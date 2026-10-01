# -*- coding: utf-8 -*-
"""静态检查：页面与数据文件中引用的每一个本地资源/链接是否真实存在。"""
import io
import json
import os
import re

ROOT = r"D:\Administrator\Documents\toolbox-website"
SKIP_PREFIX = ("http://", "https://", "mailto:", "tel:", "#", "data:")

problems = []
checked = []


def exists(rel, base):
    if not rel:
        return True
    if rel.startswith(SKIP_PREFIX):
        return True
    rel = rel.split("#")[0].split("?")[0]
    if not rel:
        return True
    path = os.path.normpath(os.path.join(base, rel.replace("/", os.sep)))
    ok = os.path.exists(path)
    checked.append((rel, ok))
    if not ok:
        problems.append((base, rel))
    return ok


def load_site_data():
    with io.open(os.path.join(ROOT, "data", "site.js"), encoding="utf-8") as f:
        txt = f.read()
    body = txt.split("=", 1)[1].strip()
    if body.endswith(";"):
        body = body[:-1]
    return json.loads(body)


# ---------- 1. HTML 文件里的引用 ----------
html_files = [f for f in os.listdir(ROOT) if f.endswith(".html")]
attr_re = re.compile(r'(?:href|src)\s*=\s*"([^"]+)"', re.I)
meta_re = re.compile(r'<meta[^>]+content="([^"]*)"', re.I)

for hf in sorted(html_files):
    p = os.path.join(ROOT, hf)
    with io.open(p, encoding="utf-8") as f:
        txt = f.read()
    for target in attr_re.findall(txt):
        exists(target, ROOT)
    # meta 里的 og:image（去掉占位符前缀后检查）
    for content in meta_re.findall(txt):
        if "__SITE_URL__" in content:
            exists(content.replace("__SITE_URL__", ""), ROOT)

print("--- HTML 引用检查：%d 个文件 ---" % len(html_files))

# ---------- 2. data/site.js 里的引用 ----------
D = load_site_data()

refs = []
refs.append(("site.ogImage", D["site"]["ogImage"]))
for l in D["nav"]["links"]:
    refs.append(("nav.link", l["href"]))
refs.append(("nav.cta", D["nav"]["cta"]["href"]))
for b in D["hero"]["buttons"]:
    refs.append(("hero.button", b["href"]))
for a in D["apps"]:
    refs.append((a["id"] + ".icon", a["icon"]))
    refs.append((a["id"] + ".download.url", a["download"]["url"]))
    refs.append((a["id"] + ".download.file", "downloads/" + a["download"]["file"]))
for it in D["downloads"]["items"]:
    refs.append(("downloads." + it["appId"], it["url"]))
    refs.append(("downloads." + it["appId"] + ".file", "downloads/" + it["file"]))
refs.append(("support.qr.image", D["support"]["qr"]["image"]))
for p in D["support"]["platforms"]:
    refs.append(("support.platform", p.get("url") or None))
for col in D["footer"]["cols"]:
    for target in attr_re.findall(col["html"]):
        refs.append(("footer." + col["title"], target))

for label, target in refs:
    if target and not exists(target, ROOT):
        print("  MISSING(%-28s) %s" % (label, target))

print("--- 数据引用检查：%d 条 ---" % len(refs))

# ---------- 3. 安装包大小与 SHA256 与真实文件比对 ----------
import hashlib

print("--- 安装包校验 ---")
for a in D["apps"]:
    fp = os.path.join(ROOT, "downloads", a["download"]["file"])
    if not os.path.isfile(fp):
        problems.append(("app", a["download"]["file"]))
        continue
    size = os.path.getsize(fp)
    h = hashlib.sha256()
    with open(fp, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    digest = h.hexdigest().upper()
    size_ok = (size == a["download"]["bytes"])
    sha_ok = (digest == a["download"]["sha256"])
    print("  %-34s size=%d (%s) sha256=%s" % (
        a["download"]["file"], size, "OK" if size_ok else "MISMATCH",
        "OK" if sha_ok else "MISMATCH " + digest))
    if not size_ok:
        problems.append(("bytes", a["download"]["file"]))
    if not sha_ok:
        problems.append(("sha256", a["download"]["file"]))

# ---------- 4. 汇总 ----------
print()
if problems:
    print("发现 %d 个问题：" % len(problems))
    for base, rel in problems:
        print("   -", rel)
else:
    print("全部检查通过：%d 个本地引用全部存在，3 个安装包大小与 SHA256 与站点标注一致。" %
          len([c for c in checked if c[1]]))
