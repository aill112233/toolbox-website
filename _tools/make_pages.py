# -*- coding: utf-8 -*-
"""由模板生成三张产品详情页，保证结构一致、便于统一改版。"""
import io
import os

ROOT = r"D:\Administrator\Documents\toolbox-website"

TEMPLATE = u"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="{keywords}">
<meta name="theme-color" content="#0b0d16">

<!-- 社交分享（部署到 GitHub Pages 后，可把 __SITE_URL__ 换成你的站点地址） -->
<meta property="og:type" content="article">
<meta property="og:title" content="{ogtitle}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="__SITE_URL__assets/img/og-image.png">
<meta property="og:url" content="__SITE_URL__{file}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="app" data-app="{appid}">

<nav id="site-nav"></nav>

<header class="hero" id="app-hero-root"></header>

<section id="app-features">
  <div class="container" id="app-features-root"></div>
</section>

<section class="alt" id="app-tables">
  <div class="container" id="app-tables-root"></div>
</section>

<section id="app-usage">
  <div class="container" id="app-usage-root"></div>
</section>

<section class="alt" id="app-faq">
  <div class="container" id="app-faq-root"></div>
</section>

<section id="app-changelog">
  <div class="container" id="app-changelog-root"></div>
</section>

<section class="alt" id="app-download">
  <div class="container" id="app-download-root"></div>
</section>

<section id="support">
  <div class="container" id="support-root"></div>
</section>

<footer id="site-footer"></footer>

<script src="data/site.js"></script>
<script src="assets/js/render.js"></script>
</body>
</html>
"""

PAGES = [
    dict(
        file="avtools.html",
        appid="avtools",
        title=u"AVTools 音视频工具箱 v1.0.0 下载 - 视频提取音频 / 音频转 MIDI",
        desc=u"AVTools 音视频工具箱：支持 15 种视频格式提取音频（MP3/WAV/FLAC/AAC/OGG/M4A），内置 ffmpeg 无需另装；支持音频转 MIDI（STFT 频谱分析 + 音符跟踪），完全本地运行。Windows 10/11 64 位，含 SHA256 校验。",
        keywords=u"AVTools,音视频工具箱,视频提取音频,视频转音频,音频转MIDI,mp3提取,内置ffmpeg,免费工具下载",
        ogtitle=u"AVTools 音视频工具箱 v1.0.0 - 视频提取音频 / 音频转 MIDI",
    ),
    dict(
        file="compresskit.html",
        appid="compresskit",
        title=u"CompressKit 压缩工具箱 v1.0.0 下载 - 9 种格式 / AES-256 加密 / 中文名修复",
        desc=u"CompressKit 压缩工具箱：纯 Python 实现，不依赖 7-Zip。支持 ZIP/7Z/TAR/TAR.GZ/TAR.BZ2/TAR.XZ/GZIP/BZIP2/XZ 九种压缩格式，7Z 支持 AES-256 密码与文件名加密，ZIP 中文文件名乱码自动修复，解压带路径穿越防护，并提供命令行模式。",
        keywords=u"CompressKit,压缩工具箱,压缩软件下载,7z压缩,zip压缩,AES-256加密压缩,中文名乱码修复,免安装7-Zip,命令行压缩",
        ogtitle=u"CompressKit 压缩工具箱 v1.0.0 - 9 种格式 / AES-256 加密",
    ),
    dict(
        file="gamemodtranslator.html",
        appid="gamemodtranslator",
        title=u"GameModTranslator 游戏 Mod AI 翻译器 v1.0 下载 - Mod 文本批量翻译",
        desc=u"GameModTranslator 游戏 Mod AI 翻译器：兼容 DeepSeek / OpenAI / 本地 Ollama 等任意 OpenAI 兼容接口，支持 JSON/YAML/XML/Paradox YML/CSV/INI/TXT 七种格式，占位符保护、翻译缓存、并发批量与命令行模式。",
        keywords=u"GameModTranslator,游戏Mod翻译器,Mod汉化,AI翻译,DeepSeek翻译,本地Ollama,群星汉化,环世界汉化,Mod文本批量翻译",
        ogtitle=u"GameModTranslator 游戏 Mod AI 翻译器 v1.0 - Mod 文本批量翻译",
    ),
]

for p in PAGES:
    html = TEMPLATE.format(**p)
    path = os.path.join(ROOT, p["file"])
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("wrote", path, len(html), "chars")
