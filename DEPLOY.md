# 部署指南：把网站挂到 GitHub Pages

本站是纯静态站点，**不需要服务器、不需要数据库**，推到 GitHub 仓库再开启 Pages 即可获得公网地址：

```
https://你的用户名.github.io/仓库名/
```

> 全程大约 3 分钟。**推荐用「方式 A」**（命令行推送），因为网页上传单个文件上限 25 MB，
> 而 AVTools 主程序 14.9 MB、解码器 23.3 MB、CompressKit 15.8 MB 都在限制内，用网页拖拽会上传失败。

---

## 第一步：在 GitHub 建一个空仓库

1. 打开 <https://github.com>，登录（没有账号就注册，免费）。
2. 右上角 `+` → **New repository**。
3. 填写：
   - **Repository name**：例如 `toolbox-website`（名字随意，会出现在网址里）
   - **Public**（公开）—— 私有仓库用 Pages 需要付费账号，免费账号请选 Public
   - **不要**勾选 `Add a README file`（保持空仓库，避免推送冲突）
4. 点 **Create repository**，记下页面显示的仓库地址：
   `https://github.com/你的用户名/仓库名.git`

---

## 方式 A：用自带的 `deploy.ps1` 一键推送（推荐）

1. 打开 `D:\Administrator\Documents\toolbox-website` 文件夹；
2. 右键 `deploy.ps1` → **使用 PowerShell 运行**；
   （若提示脚本被禁止，先在 PowerShell 里执行一次：`Set-ExecutionPolicy -Scope Process Bypass`）
3. 按提示输入你的 **GitHub 用户名**（脚本会自动填好站点地址、远程仓库地址，并提交推送）；
4. 第一次推送会弹出浏览器窗口要求登录 GitHub —— 点 **Sign in with your browser** 完成授权即可（凭据会被 Windows 记住，以后不用再登）。

脚本做的事：写入本地 git 身份 → 把页面里的 `__SITE_URL__` 换成你的真实网址 → `git init` → 提交 → 关联远程 → 推送 `main` 分支。

### 手动推送（等价于上面脚本）

```bat
cd /d D:\Administrator\Documents\toolbox-website
git init
git config user.name "你的名字"
git config user.email "你的邮箱"
git add .
git commit -m "官网 v1.0：三款软件下载页"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

以后每次更新文案或替换安装包后，只需：

```bat
cd /d D:\Administrator\Documents\toolbox-website
git add .
git commit -m "更新内容"
git push
```

Pages 会在 1~2 分钟内自动重新发布。

---

## 第二步：开启 GitHub Pages

1. 进入你的仓库页面 → **Settings**（设置）；
2. 左侧栏找到 **Pages**；
3. **Build and deployment** → **Source** 选择 `Deploy from a branch`；
4. **Branch** 选择 `main`，目录选择 `/ (root)`，点 **Save**；
5. 等 1~2 分钟，刷新该页面，顶部会出现：
   `Your site is live at https://你的用户名.github.io/仓库名/`

**第三步：把网址告诉别人**，或者在手机上打开检查排版。想用根域名（`https://你的用户名.github.io/`）访问，把仓库命名为 `你的用户名.github.io` 即可。

---

## 部署后检查清单

- [ ] 首页正常显示三张软件卡片，图标显示正确
- [ ] 三个「下载安装包」按钮都能下载到文件（文件名、大小正确）
- [ ] 点「查看详情」能打开三个产品页，页面内容完整
- [ ] 手机打开页面，布局正常（卡片自动堆叠）
- [ ] 复制 SHA256 的按钮可用（需要 https，GitHub Pages 自带 https）
- [ ] 随便访问一个不存在的路径（如 `/abc`），能看到 404 页面
- [ ] 换一张不是本机的浏览器/设备验证，排除缓存影响

---

## 常见问题

**Q：安装包会一起传到 GitHub 吗？会超限吗？**
会，位于 `downloads/` 目录。GitHub 限制单个文件 100 MB、仓库建议 1 GB 以内，本站四个安装文件合计约 64.6 MB，完全没问题。首次推送 55 MB 会稍慢（国内的网络可能需要几分钟），耐心等它跑完即可。

**Q：网页上传（拖拽）方式可以吗？**
可以，但**单个文件必须小于 25 MB**，所以 AVTools 的 36.5 MB 安装包传不上去。若必须用网页方式，请把安装包放到 **Releases**：
仓库页 → `Releases` → `Create a new release` → 填版本号 → 把三个 exe 拖到附件区 → 发布；
然后把 `data/site.js` 里三处 `download.url` 改成对应的 Release 附件直链（形如 `https://github.com/你的用户名/仓库名/releases/download/v1.0/文件名`）。

**Q：`__SITE_URL__` 是什么？**
是社交分享（微信/QQ/Twitter 卡片）用的绝对网址占位符。`deploy.ps1` 会自动替换成你的真实地址；若你手动推送，可以把四个 HTML 里的 `__SITE_URL__` 手动替换为 `https://你的用户名.github.io/仓库名/`（不改也不影响网站正常浏览，只是分享卡片可能没有预览图）。

**Q：打开网站是空白页？**
99% 是 `data/site.js` 里的 JSON 被改坏了（多一个逗号、少一个引号）。按 `F12` 打开开发者工具看 Console 里的报错，或对比最近一次改动恢复。

**Q：想改网址路径 / 换仓库名？**
仓库名就是网址的路径部分，改名后 Pages 地址会变（旧地址失效）。也可以在 Pages 设置里绑定自己的域名（`Custom domain`）。

**Q：国内访问慢怎么办？**
GitHub Pages 在国内偶尔会慢或被墙。同一套文件可以直接上传到其他静态托管（都在网页上拖拽即可，无需改代码）：
- **Cloudflare Pages**：`Workers & Pages` → `Create` → `Pages` → `Upload assets` → 拖入本站所有文件 → 部署，得到 `xxx.pages.dev`
- **腾讯云 EdgeOne Pages**：控制台搜索 EdgeOne Pages → 新建项目 → 上传文件 → 发布，国内访问较快
- 由于页面内所有链接都是相对路径，放到任何子目录/域名下都能正常工作，无需修改代码。

**Q：以后更新安装包怎么做？**
把新包放进 `downloads/`，删除旧包，然后更新 `data/site.js` 里对应的 `file` / `url` / `size` / `sha256` 与 `downloads.items`，再 `git add . && git commit -m "更新 vX" && git push`。

> 取得 SHA256：在安装包所在目录打开 PowerShell，执行
> `Get-FileHash .\AVTools_Setup_1.0.0.exe -Algorithm SHA256`
