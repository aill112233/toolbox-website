# =============================================================================
#  实用工具箱 · 官网一键推送到 GitHub
#
#  用法（在 PowerShell 中运行本脚本）：
#     .\deploy.ps1                       # 交互式输入 GitHub 用户名
#     .\deploy.ps1 -User aify233         # 指定用户名
#     .\deploy.ps1 -User aify233 -Repo toolbox-website
#     .\deploy.ps1 -User aify233 -SkipPush   # 只提交到本地，不推送
#
#  前置条件：已安装 git；已在 GitHub 网页上建好空仓库（不要勾选 README）
# =============================================================================
[CmdletBinding()]
param(
    [string]$User,
    [string]$Repo = 'toolbox-website',
    [string]$Branch = 'main',
    [string]$Message = '官网更新',
    [string]$Name,
    [string]$Email,
    [switch]$SkipPush
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
Set-Location -LiteralPath $root

function Info($msg) { Write-Host "  $msg" -ForegroundColor Gray }
function Ok($msg) { Write-Host "  $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "  $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "  $msg" -ForegroundColor Red }

Write-Host ""
Write-Host "=== 实用工具箱 · 官网部署 ===" -ForegroundColor Cyan
Info "站点目录：$root"

# ---------- 0. 环境检查 ----------
if (-not (Test-Path -LiteralPath (Join-Path $root 'index.html'))) {
    Fail "当前目录下没有 index.html，请把本脚本放在站点根目录后再运行。"
    exit 1
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Fail "没有找到 git，请先安装 Git for Windows：https://git-scm.com/download/win"
    exit 1
}

if (-not $User) {
    $User = Read-Host "请输入你的 GitHub 用户名（例如 aify233）"
}
$User = $User.Trim()
if (-not $User) { Fail "GitHub 用户名不能为空。"; exit 1 }

if (-not $Name) { $Name = $User }
if (-not $Email) { $Email = "$User@users.noreply.github.com" }

$siteUrl = "https://$User.github.io/$Repo/"
$remoteUrl = "https://github.com/$User/$Repo.git"
Info "站点地址（预计）：$siteUrl"
Info "远程仓库：$remoteUrl"

# ---------- 1. 把占位符换成真实网址 ----------
$patched = 0
Get-ChildItem -LiteralPath $root -Filter '*.html' | ForEach-Object {
    $text = Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8
    if ($text -like '*__SITE_URL__*') {
        $text = $text.Replace('__SITE_URL__', $siteUrl)
        Set-Content -LiteralPath $_.FullName -Value $text -Encoding UTF8 -NoNewline
        $patched++
    }
}
if ($patched -gt 0) { Ok "已把 $patched 个页面里的 __SITE_URL__ 替换为真实网址" }
else { Info "页面里的网址占位符已是真实地址（或已替换过），跳过" }

# 页脚 / 导航里的 GitHub 仓库链接
$dataFile = Join-Path $root 'data\site.js'
if (Test-Path -LiteralPath $dataFile) {
    $js = Get-Content -LiteralPath $dataFile -Raw -Encoding UTF8
    $new = [regex]::Replace($js, '("repo"\s*:\s*)"[^"]*"', ('${1}"' + $remoteUrl.TrimEnd('.git') + '"'))
    if ($new -ne $js) {
        Set-Content -LiteralPath $dataFile -Value $new -Encoding UTF8 -NoNewline
        Ok "已写入 GitHub 仓库链接到 data/site.js"
    }
}

# ---------- 2. 初始化仓库 ----------
if (-not (Test-Path -LiteralPath (Join-Path $root '.git'))) {
    git init --quiet
    Ok "已初始化本地 git 仓库"
} else {
    Info "已存在本地 git 仓库"
}

# 分支与身份
git symbolic-ref HEAD ("refs/heads/" + $Branch) 2>$null | Out-Null
$curName = (git config user.name) 2>$null
$curMail = (git config user.email) 2>$null
if (-not $curName) { git config user.name $Name }
if (-not $curMail) { git config user.email $Email }
Ok ("提交身份：" + (git config user.name) + " <" + (git config user.email) + ">")

# ---------- 3. 提交 ----------
git add -A
$staged = (git diff --cached --name-only | Measure-Object).Count
if ($staged -gt 0) {
    Info "本次提交 $staged 个文件（含安装包，首次推送约 56 MB，请耐心等待）"
    git commit --quiet -m $Message
    Ok "已提交：$Message"
} else {
    Info "没有需要提交的改动"
}

# ---------- 4. 关联远程仓库 ----------
$existing = (git remote) 2>$null
if ($existing -contains 'origin') {
    git remote set-url origin $remoteUrl
    Info "已更新 origin 地址"
} else {
    git remote add origin $remoteUrl
    Ok "已添加远程仓库 origin"
}

# ---------- 5. 推送 ----------
if ($SkipPush) {
    Warn "已跳过推送（-SkipPush）。稍后手动执行：git push -u origin $Branch"
    exit 0
}

Write-Host ""
Write-Host "开始推送……" -ForegroundColor Cyan
Info "如果弹出登录窗口，请点 “Sign in with your browser” 完成 GitHub 授权（只需一次）。"
git push -u origin $Branch
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Fail "推送失败。常见原因："
    Info "1) GitHub 上还没有创建这个仓库 → 先到 https://github.com/new 建一个名为 $Repo 的空仓库"
    Info "2) 网络原因（国内访问 GitHub 较慢）→ 重试一次，或使用代理"
    Info "3) 认证失败 → 重新运行本脚本，在弹出的窗口重新登录"
    exit 1
}

Write-Host ""
Ok "推送完成！"
Write-Host ""
Write-Host "最后一步（只需做一次）：开启 GitHub Pages" -ForegroundColor Cyan
Info "1) 打开 https://github.com/$User/$Repo/settings/pages"
Info "2) Source 选择 “Deploy from a branch”"
Info "3) Branch 选择 $Branch，目录选择 / (root)，点 Save"
Info "4) 等 1~2 分钟，访问：$siteUrl"
Write-Host ""
