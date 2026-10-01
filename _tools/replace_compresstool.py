# -*- coding: utf-8 -*-
"""把网站里的 CompressTool 条目整体替换为 CompressKit（含文案、下载数据、导航与页脚）。"""
import io
import json
import os
import sys

SITE = r"D:\Administrator\Documents\toolbox-website"
DATA = os.path.join(SITE, "data", "site.js")

NEW_APP = {
    "id": "compresskit",
    "name": "CompressKit 压缩工具箱",
    "short": "压缩工具箱",
    "en": "CompressKit",
    "version": "v1.0.0",
    "date": "2026-10-01",
    "sizeText": "15.8 MB",
    "accent": "#34d399",
    "icon": "assets/img/app-compresskit.png",
    "tagline": "纯 Python 实现，不依赖 7-Zip：9 种格式压缩，自带中文名修复与 AES-256 加密",
    "summary": "重写版的压缩工具。ZIP / 7Z / TAR / TAR.GZ / TAR.BZ2 / TAR.XZ / GZIP / BZIP2 / XZ 九种格式，7Z 支持 AES-256 密码与文件名加密；ZIP 中文乱码自动修复，解压带路径穿越防护，实时进度可取消，全程本地运行。",
    "highlights": ["9 种压缩格式", "AES-256 加密", "中文名乱码修复", "无需安装 7-Zip", "命令行模式"],
    "features": [
        {"icon": "🧩", "name": "纯 Python 引擎，不依赖外部程序",
         "desc": "上一代工具把 7z.exe 打进了安装包却漏掉 7z.dll，压缩时只能报「Codec Load Error」。本版 ZIP / TAR / GZ / BZ2 / XZ 用内置实现，7Z 用内置 py7zr 引擎，装完就能用。"},
        {"icon": "🔐", "name": "AES-256 加密",
         "desc": "7Z 支持密码保护，并可勾选「同时加密文件名」，连压缩包里的文件名都看不到；错误密码无法解压，也不会误以为加密成功。"},
        {"icon": "🈶", "name": "中文文件名修复",
         "desc": "老工具打包的 ZIP 里 GBK 文件名会变成乱码，本版自动还原为正确中文；TAR 可手动切换 GBK / UTF-8 编码。"},
        {"icon": "📦", "name": "9 种格式",
         "desc": "ZIP、7Z、TAR、TAR.GZ、TAR.BZ2、TAR.XZ、GZIP、BZIP2、XZ；解压还额外支持 tgz / tbz / txz / lzma / zipx。"},
        {"icon": "🎚", "name": "5 档压缩等级",
         "desc": "极速 / 快速 / 标准 / 最大压缩 / 极限压缩，速度与体积自己权衡；ZIP 等级 1 与等级 9 的体积差异实测有效。"},
        {"icon": "📊", "name": "实时进度与取消",
         "desc": "按已处理字节数显示百分比进度，长任务随时可停；取消或出错时会自动删除未完成的压缩包，不留残file。"},
        {"icon": "🛡", "name": "安全解压",
         "desc": "拦截压缩包里的 ../ 路径穿越，避免文件被写到目标目录之外；目标文件已存在时可选择覆盖或自动改名。"},
        {"icon": "⌨️", "name": "命令行模式",
         "desc": "提供 --cli 参数：compress / extract / list / formats 四个命令，方便写进批处理、定时任务或自己的脚本里。"},
    ],
    "tables": [
        {
            "title": "压缩格式",
            "subtitle": "选择扩展名即可，压缩等级决定速度与体积",
            "columns": ["扩展名", "格式", "说明"],
            "rows": [
                [".zip", "ZIP", "兼容性最好，Windows / 手机 / macOS 都能直接打开"],
                [".7z", "7Z", "LZMA2 压缩率最高，支持 AES-256 密码与文件名加密"],
                [".tar", "TAR", "仅打包不压缩，Linux 场景常用"],
                [".tar.gz", "TAR + GZIP", "打包并压缩，Unix 工具链通用"],
                [".tar.bz2", "TAR + BZIP2", "压缩率优于 GZ"],
                [".tar.xz", "TAR + XZ", "高压缩率且通用"],
                [".gz", "GZIP（单文件）", "只压缩一个文件，常用于日志"],
                [".bz2", "BZIP2（单文件）", "只压缩一个文件"],
                [".xz", "XZ（单文件）", "只压缩一个文件，体积最小"],
            ],
        },
        {
            "title": "解压支持",
            "subtitle": "常见压缩包都能打开",
            "columns": ["类别", "扩展名"],
            "rows": [
                ["内置支持", ".zip · .7z · .tar · .tar.gz · .tgz · .tar.bz2 · .tbz · .tar.xz · .txz · .gz · .bz2 · .xz · .lzma"],
                ["需要系统安装 7-Zip（可选）", ".rar · .iso · .cab · .wim · .arj · .z · .cpio · .rpm · .deb · .dmg · .chm · 分卷 .001"],
            ],
        },
        {
            "title": "命令行速查",
            "subtitle": "适合脚本化与批处理",
            "columns": ["命令", "作用"],
            "rows": [
                ["compress -o 输出 -f 格式 输入…", "压缩文件或文件夹（-l 等级、-p 密码、--encrypt-names 加密文件名）"],
                ["extract -o 目录 压缩包", "解压（-p 密码、--tar-encoding gbk 修中文名）"],
                ["list 压缩包", "查看压缩包内容"],
                ["formats", "列出可用格式与引擎状态"],
            ],
        },
    ],
    "usage": {
        "title": "快速上手",
        "steps": [
            {"no": "1", "name": "添加内容", "desc": "点「＋ 添加文件」或「＋ 添加文件夹」，把要压缩的东西加入列表（暂不支持拖放）。"},
            {"no": "2", "name": "选择格式与等级", "desc": "默认 ZIP 兼容性最好；追求最小体积选 7Z + 极限压缩；需要密码只能选 7Z。"},
            {"no": "3", "name": "开始压缩", "desc": "确认输出路径后点「▶ 开始压缩」，进度条实时刷新，完成后可直接打开输出目录。"},
            {"no": "4", "name": "解压同样简单", "desc": "到「解压」页选择压缩包，程序会自动识别格式并预览内容；中文名乱码时把 TAR 编码改为 GBK。"},
        ],
        "cliTitle": "命令行示例",
        "cliBlocks": [
            "CompressKit.exe --cli compress -o 备份.7z -f 7z -l \"极限压缩（最慢）\" -p 密码 --encrypt-names D:\\资料",
            "CompressKit.exe --cli extract -o D:\\解压结果 备份.7z -p 密码\nCompressKit.exe --cli list 备份.7z",
        ],
    },
    "faq": [
        {"q": "和上一代 CompressTool 有什么区别？",
         "a": "上一代程序把 7z.exe 和 7zr.exe 打包进来，却漏带了必需的 7z.dll，压缩时会报「Codec Load Error: 7z.dll 找不到指定的模块」，功能实际不可用。本版改成纯 Python 实现（ZIP/TAR/GZ/BZ2/XZ 用标准库、7Z 用内置 py7zr），不再依赖任何外部 exe，另外补上了中文名修复、路径穿越防护、实时进度与命令行模式。"},
        {"q": "需要另外安装 7-Zip 吗？",
         "a": "不需要。只有解压 RAR / ISO / CAB / WIM 这类专有格式时，程序才会去找系统里已安装的 7-Zip 来调用；没有安装也不影响其它格式。"},
        {"q": "ZIP 为什么不能设密码？",
         "a": "程序的加密基于 7Z 的 AES-256；ZIP 传统的 ZipCrypto 加密强度很低，因此没有提供。需要加密请选择 7Z 格式，还可以勾选「同时加密文件名」。"},
        {"q": "密码忘了能找回吗？",
         "a": "不能。AES-256 没有任何后门，密码只存在于你输入的那一刻，不保存也不上传，请务必自行记录。"},
        {"q": "压缩会不会改动或删除我的原文件？",
         "a": "不会。压缩只读取原文件并写出一个新的压缩包；解压时可选择覆盖还是自动改名；任务取消时会删除未完成的压缩包。"},
        {"q": "速度怎么样？",
         "a": "ZIP / GZ / BZ2 / XZ 走标准库，速度较快；7Z 的极限压缩最慢但体积最小。实测对 3.3 MB 混合数据，ZIP 约 0.2 秒、7Z 约 0.9 秒、TAR.XZ 约 0.9 秒。"},
    ],
    "changelog": {
        "version": "v1.0.0",
        "date": "2026-10-01",
        "badge": "首发",
        "items": [
            "纯 Python 引擎：ZIP / TAR / TAR.GZ / TAR.BZ2 / TAR.XZ / GZIP / BZIP2 / XZ + 内置 py7zr 的 7Z",
            "9 种压缩格式、5 档压缩等级，全部实测往返一致（31 项自动化测试）",
            "7Z 支持 AES-256 密码与文件名加密（带回归测试，确保密码真的生效）",
            "ZIP 中文乱码文件名自动修复，TAR 支持手动指定 GBK / UTF-8",
            "解压路径穿越防护、覆盖前自动改名、取消后清理残缺文件",
            "压缩 / 解压 / 浏览三个页面，字节级进度条与随时取消",
            "命令行模式（--cli）：compress / extract / list / formats",
            "深色中文界面，窗口按内容自适应尺寸；Inno Setup 中文安装包，自带卸载程序",
        ],
    },
    "download": {
        "file": "CompressKit_Setup_1.0.0.exe",
        "url": "downloads/CompressKit_Setup_1.0.0.exe",
        "bytes": 16556902,
        "sha256": "592F9D36E3806C9BD255D21CED24F3899ACB6AA1C7491930A77A7738CA188ACB",
        "note": "中文安装向导，可选「仅为我安装」而无需管理员权限；自带卸载程序，安装目录含第三方组件许可证。",
    },
}


def main():
    with io.open(DATA, encoding="utf-8") as f:
        text = f.read()
    head, body = text.split("=", 1)
    body = body.strip()
    if body.endswith(";"):
        body = body[:-1]
    data = json.loads(body)

    # 1) 替换应用条目
    apps = data["apps"]
    idx = [i for i, a in enumerate(apps) if a["id"] == "compresstool"]
    if not idx:
        print("未找到 compresstool 条目，可能已替换过")
    else:
        apps[idx[0]] = NEW_APP
        print("已替换 apps[%d]" % idx[0])

    # 2) 下载清单
    for i, it in enumerate(data["downloads"]["items"]):
        if it.get("appId") == "compresstool":
            data["downloads"]["items"][i] = {
                "name": "CompressKit 压缩工具箱",
                "version": "v1.0.0",
                "file": NEW_APP["download"]["file"],
                "url": NEW_APP["download"]["url"],
                "size": "15.8 MB",
                "date": "2026-10-01",
                "sha256": NEW_APP["download"]["sha256"],
                "appId": "compresskit",
            }
            print("已替换 downloads.items[%d]" % i)

    # 3) 总量与文案
    total_mb = 36.54 + 15.79 + 10.61
    data["site"]["updated"] = "2026-10-01"
    data["hero"]["meta"] = ("三个安装包合计约 %.1f MB · 每个安装包都提供 SHA256 校验值 · 无需注册、无需登录"
                            % total_mb)
    for s in data["hero"]["stats"]:
        if s["label"] == "安装包总大小":
            s["num"] = "%.1f MB" % total_mb
    data["hero"]["tags"] = ["🎬 视频提取音频", "🎼 音频转 MIDI", "🗜 9 种压缩格式", "🌏 Mod 批量翻译",
                            "💻 本地运行", "🔍 SHA256 校验"]
    data["downloads"]["subtitle"] = ("三个安装包 · 合计约 %.1f MB · 点按钮即可下载" % total_mb)

    # 4) 共同特点里的说明
    for item in data["shared"]["items"]:
        if item["name"] == "计算全在本地":
            item["desc"] = ("AVTools 用内置 ffmpeg 与 NumPy 在本机转码；CompressKit 用内置的纯 Python "
                            "压缩引擎；GameModTranslator 只在你点击翻译时访问你自己填写的接口地址。")
        if item["name"] == "无需预装环境":
            item["desc"] = "已内置 Python 运行库与所需引擎，不必另外安装 Python、ffmpeg 或 7-Zip。"
    data["shared"]["subtitle"] = "同一套打包与安装标准，装哪一款体验都一样干净"

    # 5) 通用 FAQ 里的软件名
    for item in data["faq"]["items"]:
        item["a"] = (item["a"].replace("AVTools 与 CompressTool", "AVTools 与 CompressKit")
                              .replace("CompressTool", "CompressKit"))

    # 6) 页脚链接与品牌文案
    for col in data["footer"]["cols"]:
        col["html"] = col["html"].replace("compresstool.html", "compresskit.html") \
                                 .replace("CompressTool 极致压缩工具", "CompressKit 压缩工具箱")

    with io.open(DATA, "w", encoding="utf-8", newline="\n") as f:
        f.write(head + "= ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("已写回", DATA)
    print("apps:", [a["id"] for a in data["apps"]])


if __name__ == "__main__":
    main()
