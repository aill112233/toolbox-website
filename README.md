# 实用工具箱 · 官网（静态站点）

三款 Windows 实用软件的下载与说明页面，纯静态、零依赖、可直接托管在 **GitHub Pages**。

| 软件 | 版本 | 安装包 | 大小 |
|---|---|---|---|
| [AVTools 音视频工具箱](avtools.html) | v1.0.0 | `AVTools_Setup_1.0.0.exe` + `AVTools-解码器.exe` | 14.9 + 23.3 MB |
| [CompressKit 压缩工具箱](compresskit.html) | v1.0.0 | `CompressKit_Setup_1.0.0.exe` | 15.8 MB |
| [GameModTranslator 游戏 Mod AI 翻译器](gamemodtranslator.html) | v1.0 | `GameModTranslator-Setup-1.0.exe` | 10.6 MB |

---

## 一、本地预览

两种方式都可以，任选其一：

**方式 1：直接双击 `index.html`**
页面用 `data/site.js` 提供数据、用 `assets/js/render.js` 渲染，因此不依赖网络请求，双击即可正常浏览（下载按钮也能用）。

**方式 2：起一个本地服务（更接近线上环境）**
```bat
cd /d D:\Administrator\Documents\toolbox-website
python -m http.server 8765
```
然后浏览器打开 <http://127.0.0.1:8765/>。

---

## 二、目录结构

```
toolbox-website/
├─ index.html                  首页（三款软件总览 + 全部下载 + 常见问题）
├─ avtools.html                产品详情页
├─ compresskit.html            产品详情页
├─ gamemodtranslator.html      产品详情页
├─ 404.html                    404 页面
├─ favicon.ico                 网站图标
├─ data/
│   └─ site.js                 ★ 所有文案与下载数据都在这里（改这里就够了）
├─ assets/
│   ├─ css/style.css           样式（深色主题，响应式）
│   ├─ js/render.js            渲染脚本（一般不用动）
│   └─ img/                    图标、社交分享图、赞赏码
├─ downloads/                  ★ 三个安装包（下载按钮指向这里）
├─ deploy.ps1                  一键推送到 GitHub
├─ DEPLOY.md                   部署详细说明
└─ .nojekyll / .gitignore
```

---

## 三、怎么改内容

**只改 `data/site.js`**（大括号内部就是标准 JSON，保存后刷新页面即可看到效果）：

| 想改什么 | 改哪里 |
|---|---|
| 站点名称、英文名 | `site.name` / `site.en` |
| 顶部导航、按钮 | `nav.links` / `nav.cta` |
| 首页大标题、简介、标签 | `hero.*` |
| 三款软件的介绍、功能、FAQ、更新日志 | `apps` 数组（每项对应一款软件） |
| 下载区列表（文件名、大小、SHA256） | `downloads.items` |
| 常见问题 | `faq.items` |
| 支持作者（爱发电链接、赞赏码、免费支持方式） | `support` |
| 页脚 | `footer.cols` / `footer.note` |

**替换图标**：把新图标覆盖到 `assets/img/app-avtools.png`、`app-compresskit.png`、`app-gamemodtranslator.png`（建议 128×128 或 256×256 的 PNG，透明背景）。三款软件卡片与详情页会自动使用新图。

**换网站图标**：覆盖 `favicon.ico` 与 `assets/img/apple-touch-icon.png` 即可。

**新增一款软件**：在 `data/site.js` 的 `apps` 数组里复制一项改内容，同时把安装包放进 `downloads/`，再在 `downloads.items` 里加一条；首页会自动多出一张卡片。若要让详情页也存在，再复制一份 `avtools.html` 改 `data-app="你的id"` 与标题即可。

> 提醒：改完 `data/site.js` 后请确认 JSON 合法（多一个逗号就会导致整页空白）。可以先用 `python -c "import json,io;json.load(io.open('data/site.js',encoding='utf-8').read().split('=',1)[1].rstrip().rstrip(';'))"` 之类的命令检查，或直接刷新页面看控制台报错。

---

## 四、部署到 GitHub

见 [DEPLOY.md](DEPLOY.md)。最快路径：先在 GitHub 网页建一个空仓库，然后双击运行 `deploy.ps1`（或按 DEPLOY.md 里的命令手动推送），最后在仓库 `Settings → Pages` 里选择 `main` 分支根目录即可。

---

## 五、技术说明

- **纯静态**：没有构建步骤、没有 npm 依赖、没有后端，改完文件直接推。
- **数据驱动**：页面结构由 `assets/js/render.js` 按 `data/site.js` 生成，改文案不用碰 HTML。
- **响应式**：手机、平板、桌面都已适配；深色主题（靛蓝 → 紫罗兰渐变）。
- **依赖文件不受 Jekyll 影响**：已放 `.nojekyll`，GitHub Pages 会按原样发布所有文件。
- 下载文件由仓库直接提供（`downloads/` 目录），单个文件 36.5 MB，低于 GitHub 的 100 MB/文件限制。
