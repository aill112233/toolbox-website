# -*- coding: utf-8 -*-
"""网站数据更新：AVTools 改为「主程序 14.9 MB + 解码器 23.3 MB」两步安装。"""
import io
import json
import os

SITE = r"D:\Administrator\Documents\toolbox-website"
DATA = os.path.join(SITE, "data", "site.js")

SETUP = {
    "file": "AVTools_Setup_1.0.0.exe",
    "url": "downloads/AVTools_Setup_1.0.0.exe",
    "bytes": 15600631,
    "sha256": "F582B6DE3EC90682C4E9EACF61C5250C779E45469CFA40DF48CD49C6FFABDFA9",
    "note": "装完主程序后，请再运行同一目录下的「AVTools-解码器.exe」。两个文件放在一起时，主程序安装过程会自动把解码器一并装好。",
}
DECODER = {
    "name": "AVTools 视频解码器（ffmpeg 7.1）",
    "version": "7.1",
    "file": "AVTools-解码器.exe",
    "url": "downloads/AVTools-解码器.exe",
    "size": "23.3 MB",
    "date": "2026-10-01",
    "sha256": "B83E09C9E1A6688741A6DE68CD66F01CAB9461E66C9C1A85D9D5C9299E214E84",
    "appId": "avtools",
}


def main():
    with io.open(DATA, encoding="utf-8") as f:
        text = f.read()
    head, body = text.split("=", 1)
    body = body.strip()
    if body.endswith(";"):
        body = body[:-1]
    data = json.loads(body)

    app = [a for a in data["apps"] if a["id"] == "avtools"][0]
    app["date"] = "2026-10-01"
    app["sizeText"] = "14.9 MB"
    app["tagline"] = "视频提取音频 + 音频转 MIDI；为把安装包压到 25 MB 内，解码器拆成独立组件"
    app["summary"] = ("把视频里的音轨一键提取成 MP3 / FLAC 等格式，也能把单旋律音频（哼唱、口琴、独奏）转成 MIDI 文件。"
                      "原版把 83.58 MB 的 ffmpeg 解码器塞进安装包，导致安装包 36.5 MB、无法用 GitHub 网页上传；"
                      "现在拆成「主程序 14.9 MB + 解码器 23.3 MB」两个文件，功能完全不变。")
    app["highlights"] = ["15 种视频格式", "6 种音频输出", "音频 → MIDI 转换", "解码器单独下载", "实时进度可取消"]
    app["download"] = SETUP
    app["extraDownload"] = {
        "label": "下载解码器",
        "file": DECODER["file"],
        "url": DECODER["url"],
        "size": DECODER["size"],
    }

    # 功能项：把“内置 ffmpeg”改成说明两步安装
    for feat in app["features"]:
        if feat["name"] == "内置 ffmpeg":
            feat["icon"] = "📦"
            feat["name"] = "解码器单独安装（体积优化）"
            feat["desc"] = ("主程序 14.9 MB、解码器 23.3 MB，两个文件都低于 GitHub 网页上传的单文件 25 MB 限制；"
                            "放在同一目录安装时，主程序会自动联动装好解码器。漏装也不会静默失败——"
                            "程序会明确提示「未找到视频解码器（ffmpeg）」。")
        if feat["name"] == "完全本地处理":
            feat["desc"] = ("音视频文件始终留在你的电脑里，程序不会把它们上传到任何服务器；"
                            "解码器（ffmpeg 7.1）也是本地可执行文件，可断网使用。")

    # 下载清单：AVTools 主程序 + 解码器（主程序在前，保证 downloadOf 取到主包）
    items = data["downloads"]["items"]
    idx = [i for i, it in enumerate(items) if it.get("appId") == "avtools"]
    if idx:
        items[idx[0]] = {
            "name": "AVTools 音视频工具箱",
            "version": "v1.0.0",
            "file": SETUP["file"],
            "url": SETUP["url"],
            "size": "14.9 MB",
            "date": "2026-10-01",
            "sha256": SETUP["sha256"],
            "appId": "avtools",
        }
        if not any(it.get("file") == DECODER["file"] for it in items):
            items.insert(idx[0] + 1, DECODER)

    # 总量与共同特点文案
    total = 14.88 + 23.27 + 15.79 + 10.61
    data["site"]["updated"] = "2026-10-01"
    data["hero"]["meta"] = ("四个安装文件合计约 %.1f MB · 每个文件都提供 SHA256 校验值 · 无需注册、无需登录" % total)
    for s in data["hero"]["stats"]:
        if s["label"] == "安装包总大小":
            s["num"] = "%.1f MB" % total
    data["downloads"]["subtitle"] = "四个安装文件 · 合计约 %.1f MB · 均低于 GitHub 单文件 25 MB 限制" % total
    for item in data["shared"]["items"]:
        if item["name"] == "计算全在本地":
            item["desc"] = ("AVTools 用内置 ffmpeg 与本机计算完成转码；CompressKit 用内置的纯 Python 压缩引擎；"
                            "GameModTranslator 只在你点击翻译时访问你自己填写的接口地址。")
        if item["name"] == "无需预装环境":
            item["desc"] = "已内置 Python 运行库与所需引擎，不必另外安装 Python、ffmpeg 或 7-Zip。"

    # 通用 FAQ：追加一条关于 AVTools 两步安装的说明
    if not any("解码器" in it["q"] for it in data["faq"]["items"]):
        data["faq"]["items"].insert(1, {
            "q": "为什么 AVTools 要装两个文件？",
            "a": ("AVTools 自带的 ffmpeg 解码器解压后有 83.58 MB，压缩后仍占约 23 MB，塞进一个安装包就会超过 25 MB，"
                  "没法用 GitHub 网页上传。所以把它拆成「主程序 14.9 MB」和「解码器 23.3 MB」两个文件："
                  "把两个文件放在同一个文件夹里，运行主程序安装向导时会自动把解码器也装好；"
                  "假如漏装了解码器，程序在用到时会明确提示，不会静默失败。"),
        })

    with io.open(DATA, "w", encoding="utf-8", newline="\n") as f:
        f.write(head + "= ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("已更新", DATA)
    print("下载清单：")
    for it in data["downloads"]["items"]:
        print("  %-12s %-34s %s" % (it["appId"], it["file"], it["size"]))
    print("总量：%.2f MB" % total)


if __name__ == "__main__":
    main()
