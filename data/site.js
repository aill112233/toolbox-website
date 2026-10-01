/* 站点内容配置 —— 以 window.SITE_DATA 形式提供，
   大括号内部就是标准 JSON，改完保存、刷新页面即可生效。 */
window.SITE_DATA = {
  "site": {
    "name": "实用工具箱",
    "en": "WinToolbox",
    "repo": "",
    "updated": "2026-10-01",
    "ogImage": "assets/img/og-image.png"
  },
  "nav": {
    "links": [
      {
        "label": "三款软件",
        "href": "index.html#apps"
      },
      {
        "label": "共同特点",
        "href": "index.html#shared"
      },
      {
        "label": "下载",
        "href": "index.html#download"
      },
      {
        "label": "常见问题",
        "href": "index.html#faq"
      },
      {
        "label": "支持作者",
        "href": "index.html#support"
      }
    ],
    "cta": {
      "label": "⬇ 全部下载",
      "href": "index.html#download"
    }
  },
  "hero": {
    "badge": "v1.0 · Windows 10 / 11 64 位 · 中文界面",
    "titleHtml": "把常用的 <span class=\"grad\">Windows 小工具</span><br>一次装齐",
    "tagline": "音视频处理、极致压缩、游戏 Mod AI 翻译 —— 三款独立软件，<br>同一套干净的安装体验：中文向导、自带卸载、不捆绑任何第三方软件。",
    "tags": [
      "🎬 视频提取音频",
      "🎼 音频转 MIDI",
      "🗜 9 种压缩格式",
      "🌏 Mod 批量翻译",
      "💻 本地运行",
      "🔍 SHA256 校验"
    ],
    "buttons": [
      {
        "href": "index.html#apps",
        "text": "查看三款软件",
        "btnClass": "btn-primary"
      },
      {
        "href": "index.html#download",
        "text": "⬇ 直接下载",
        "btnClass": "btn-ghost"
      }
    ],
    "meta": "四个安装文件合计约 64.5 MB · 每个文件都提供 SHA256 校验值 · 无需注册、无需登录",
    "stats": [
      {
        "num": "3",
        "label": "款独立软件"
      },
      {
        "num": "64.5 MB",
        "label": "安装包总大小"
      },
      {
        "num": "100%",
        "label": "本地运行"
      },
      {
        "num": "0",
        "label": "捆绑与广告"
      }
    ]
  },
  "apps": [
    {
      "id": "avtools",
      "name": "AVTools 音视频工具箱",
      "short": "音视频工具箱",
      "en": "AVTools",
      "version": "v1.0.0",
      "date": "2026-10-01",
      "sizeText": "14.9 MB",
      "accent": "#6366f1",
      "icon": "assets/img/app-avtools.png",
      "tagline": "视频提取音频 + 音频转 MIDI；为把安装包压到 25 MB 内，解码器拆成独立组件",
      "summary": "把视频里的音轨一键提取成 MP3 / FLAC 等格式，也能把单旋律音频（哼唱、口琴、独奏）转成 MIDI 文件。原版把 83.58 MB 的 ffmpeg 解码器塞进安装包，导致安装包 36.5 MB、无法用 GitHub 网页上传；现在拆成「主程序 14.9 MB + 解码器 23.3 MB」两个文件，功能完全不变。",
      "highlights": [
        "15 种视频格式",
        "6 种音频输出",
        "音频 → MIDI 转换",
        "解码器单独下载",
        "实时进度可取消"
      ],
      "features": [
        {
          "icon": "🎬",
          "name": "视频提取音频",
          "desc": "支持 MP4 / MKV / AVI / MOV / WMV / FLV / WEBM / M4V / MPG / MPEG / TS / 3GP / RMVB / RM / VOB 共 15 种视频格式，直接抽取音轨保存为音频文件。"
        },
        {
          "icon": "🎧",
          "name": "6 种输出格式",
          "desc": "MP3 / WAV / FLAC / AAC / OGG / M4A 可选；MP3、AAC、OGG 可自定义比特率（默认 192 kbps）。"
        },
        {
          "icon": "🎚",
          "name": "采样率与无损选项",
          "desc": "44100 / 48000 Hz 或「保持原样」不重采样；WAV、FLAC 为无损输出，不二次损失音质。"
        },
        {
          "icon": "📊",
          "name": "实时进度与取消",
          "desc": "先探测视频时长，再按 ffmpeg 输出换算百分比进度，长视频也能看到进展，随时可取消任务。"
        },
        {
          "icon": "🎼",
          "name": "音频转 MIDI",
          "desc": "STFT 短时傅里叶变换 + 频谱峰值提取 + 音符事件跟踪，纯 NumPy 实现，不需要显卡，也不需要下载深度学习模型。"
        },
        {
          "icon": "🧹",
          "name": "去噪与音符整理",
          "desc": "3 帧中值滤波剔除孤立噪点，50 ms 内的断音合并为同一音符，音符时值按 30 ms 量化，输出的 MIDI 更规整。"
        },
        {
          "icon": "📦",
          "name": "解码器单独安装（体积优化）",
          "desc": "主程序 14.9 MB、解码器 23.3 MB，两个文件都低于 GitHub 网页上传的单文件 25 MB 限制；放在同一目录安装时，主程序会自动联动装好解码器。漏装也不会静默失败——程序会明确提示「未找到视频解码器（ffmpeg）」。"
        },
        {
          "icon": "🔒",
          "name": "完全本地处理",
          "desc": "音视频文件始终留在你的电脑里，程序不会把它们上传到任何服务器；解码器（ffmpeg 7.1）也是本地可执行文件，可断网使用。"
        }
      ],
      "tables": [
        {
          "title": "视频输入格式",
          "subtitle": "自动识别扩展名，覆盖常见下载与录制来源",
          "columns": [
            "类型",
            "扩展名"
          ],
          "rows": [
            [
              "主流视频",
              ".mp4 · .mkv · .avi · .mov · .wmv · .flv"
            ],
            [
              "网络与录制",
              ".webm · .m4v · .ts · .3gp"
            ],
            [
              "老格式与光盘",
              ".mpg · .mpeg · .vob · .rmvb · .rm"
            ]
          ]
        },
        {
          "title": "音频输出格式",
          "subtitle": "按用途选择：分享选 MP3，后期选 WAV / FLAC",
          "columns": [
            "格式",
            "编码器",
            "说明"
          ],
          "rows": [
            [
              ".mp3",
              "libmp3lame",
              "体积小、通用性最好，可调比特率"
            ],
            [
              ".wav",
              "pcm_s16le",
              "无损未压缩，适合再编辑"
            ],
            [
              ".flac",
              "flac",
              "无损压缩，兼顾体积与音质"
            ],
            [
              ".aac",
              "aac",
              "同码率下优于 MP3，移动设备友好"
            ],
            [
              ".ogg",
              "libvorbis",
              "开源格式，游戏与网页常用"
            ],
            [
              ".m4a",
              "aac",
              "苹果生态常用容器"
            ]
          ]
        },
        {
          "title": "音频 → MIDI 参数",
          "subtitle": "轻量方案的能力边界，先说清楚",
          "columns": [
            "参数",
            "默认值",
            "说明"
          ],
          "rows": [
            [
              "分析采样率",
              "22050 Hz",
              "先用 ffmpeg 解码为单声道 16-bit PCM"
            ],
            [
              "FFT / 帧移",
              "2048 / 512",
              "约 23 ms 一帧，兼顾时间分辨率"
            ],
            [
              "检测音域",
              "C2 ~ C7",
              "约 65 ~ 2093 Hz，覆盖人声与常见独奏乐器"
            ],
            [
              "最短音符",
              "80 ms",
              "短于此长度的杂音会被丢弃"
            ],
            [
              "适用素材",
              "单旋律",
              "哼唱、口琴、独奏旋律效果好；复杂和弦与混音作品效果有限"
            ]
          ]
        }
      ],
      "usage": {
        "title": "快速上手",
        "steps": [
          {
            "no": "1",
            "name": "选择视频文件",
            "desc": "打开程序进入「提取音频」，选择要处理的视频文件（支持一次添加多个）。"
          },
          {
            "no": "2",
            "name": "设置输出参数",
            "desc": "选择输出格式（如 MP3）、比特率（默认 192k）、采样率，并指定输出目录。"
          },
          {
            "no": "3",
            "name": "开始并等待",
            "desc": "点击开始，进度条实时刷新，处理完成后到输出目录取文件即可。"
          },
          {
            "no": "4",
            "name": "顺手转个 MIDI",
            "desc": "切到「音频转 MIDI」，选择音频文件，得到 .mid 后可直接拖进编曲软件继续编辑。"
          }
        ]
      },
      "faq": [
        {
          "q": "转出来的 MIDI 为什么听起来是单音？",
          "a": "该功能用频谱峰值跟踪提取主旋律，是轻量方案（不需要 AI 模型、不占显卡）的通用做法。哼唱、口琴、独奏乐器效果最好；和弦与完整混音作品建议先用其他工具分离人声或提取单声道旋律再转换。"
        },
        {
          "q": "需要另外安装 ffmpeg 吗？",
          "a": "不需要。程序自带 ffmpeg（imageio-ffmpeg），安装即可使用；若系统 PATH 中已有 ffmpeg，也会优先使用。"
        },
        {
          "q": "能处理多大的视频？",
          "a": "常见几百 MB 到数 GB 的视频都可以。速度取决于源文件编码、电脑性能和磁盘读写，处理全程在本地进行，不消耗流量。"
        },
        {
          "q": "提取出来的音频音质会变差吗？",
          "a": "WAV / FLAC 为无损输出，与原音轨一致；MP3 / AAC / OGG 会按你设定的比特率转码（默认 192 kbps，属于较高质量）。"
        },
        {
          "q": "为什么杀毒软件会提示风险？",
          "a": "程序使用 PyInstaller 打包且没有购买代码签名证书，部分杀毒软件会对这类程序做启发式拦截。安装包与程序本身不含恶意代码，添加信任或选择「仍要运行」即可。"
        }
      ],
      "changelog": {
        "version": "v1.0.0",
        "date": "2026-09-30",
        "badge": "首发",
        "items": [
          "视频提取音频：15 种视频格式 → MP3 / WAV / FLAC / AAC / OGG / M4A",
          "比特率与采样率可调，支持保持原始采样率",
          "内置 ffmpeg，无需单独安装",
          "音频转 MIDI：STFT 频谱分析 + 音符事件跟踪（纯 NumPy）",
          "中值滤波去噪、断音合并、音符时值量化",
          "中文图形界面，实时进度显示与任务取消",
          "Inno Setup 安装包：中文向导、自选目录、自带卸载程序"
        ]
      },
      "download": {
        "file": "AVTools_Setup_1.0.0.exe",
        "url": "downloads/AVTools_Setup_1.0.0.exe",
        "bytes": 15600631,
        "sha256": "F582B6DE3EC90682C4E9EACF61C5250C779E45469CFA40DF48CD49C6FFABDFA9",
        "note": "装完主程序后，请再运行同一目录下的「AVTools-解码器.exe」。两个文件放在一起时，主程序安装过程会自动把解码器一并装好。"
      },
      "extraDownload": {
        "label": "下载解码器",
        "file": "AVTools-解码器.exe",
        "url": "downloads/AVTools-解码器.exe",
        "size": "23.3 MB"
      }
    },
    {
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
      "highlights": [
        "9 种压缩格式",
        "AES-256 加密",
        "中文名乱码修复",
        "无需安装 7-Zip",
        "命令行模式"
      ],
      "features": [
        {
          "icon": "🧩",
          "name": "纯 Python 引擎，不依赖外部程序",
          "desc": "上一代工具把 7z.exe 打进了安装包却漏掉 7z.dll，压缩时只能报「Codec Load Error」。本版 ZIP / TAR / GZ / BZ2 / XZ 用内置实现，7Z 用内置 py7zr 引擎，装完就能用。"
        },
        {
          "icon": "🔐",
          "name": "AES-256 加密",
          "desc": "7Z 支持密码保护，并可勾选「同时加密文件名」，连压缩包里的文件名都看不到；错误密码无法解压，也不会误以为加密成功。"
        },
        {
          "icon": "🈶",
          "name": "中文文件名修复",
          "desc": "老工具打包的 ZIP 里 GBK 文件名会变成乱码，本版自动还原为正确中文；TAR 可手动切换 GBK / UTF-8 编码。"
        },
        {
          "icon": "📦",
          "name": "9 种格式",
          "desc": "ZIP、7Z、TAR、TAR.GZ、TAR.BZ2、TAR.XZ、GZIP、BZIP2、XZ；解压还额外支持 tgz / tbz / txz / lzma / zipx。"
        },
        {
          "icon": "🎚",
          "name": "5 档压缩等级",
          "desc": "极速 / 快速 / 标准 / 最大压缩 / 极限压缩，速度与体积自己权衡；ZIP 等级 1 与等级 9 的体积差异实测有效。"
        },
        {
          "icon": "📊",
          "name": "实时进度与取消",
          "desc": "按已处理字节数显示百分比进度，长任务随时可停；取消或出错时会自动删除未完成的压缩包，不留残缺文件。"
        },
        {
          "icon": "🛡",
          "name": "安全解压",
          "desc": "拦截压缩包里的 ../ 路径穿越，避免文件被写到目标目录之外；目标文件已存在时可选择覆盖或自动改名。"
        },
        {
          "icon": "⌨️",
          "name": "命令行模式",
          "desc": "提供 --cli 参数：compress / extract / list / formats 四个命令，方便写进批处理、定时任务或自己的脚本里。"
        }
      ],
      "tables": [
        {
          "title": "压缩格式",
          "subtitle": "选择扩展名即可，压缩等级决定速度与体积",
          "columns": [
            "扩展名",
            "格式",
            "说明"
          ],
          "rows": [
            [
              ".zip",
              "ZIP",
              "兼容性最好，Windows / 手机 / macOS 都能直接打开"
            ],
            [
              ".7z",
              "7Z",
              "LZMA2 压缩率最高，支持 AES-256 密码与文件名加密"
            ],
            [
              ".tar",
              "TAR",
              "仅打包不压缩，Linux 场景常用"
            ],
            [
              ".tar.gz",
              "TAR + GZIP",
              "打包并压缩，Unix 工具链通用"
            ],
            [
              ".tar.bz2",
              "TAR + BZIP2",
              "压缩率优于 GZ"
            ],
            [
              ".tar.xz",
              "TAR + XZ",
              "高压缩率且通用"
            ],
            [
              ".gz",
              "GZIP（单文件）",
              "只压缩一个文件，常用于日志"
            ],
            [
              ".bz2",
              "BZIP2（单文件）",
              "只压缩一个文件"
            ],
            [
              ".xz",
              "XZ（单文件）",
              "只压缩一个文件，体积最小"
            ]
          ]
        },
        {
          "title": "解压支持",
          "subtitle": "常见压缩包都能打开",
          "columns": [
            "类别",
            "扩展名"
          ],
          "rows": [
            [
              "内置支持",
              ".zip · .7z · .tar · .tar.gz · .tgz · .tar.bz2 · .tbz · .tar.xz · .txz · .gz · .bz2 · .xz · .lzma"
            ],
            [
              "需要系统安装 7-Zip（可选）",
              ".rar · .iso · .cab · .wim · .arj · .z · .cpio · .rpm · .deb · .dmg · .chm · 分卷 .001"
            ]
          ]
        },
        {
          "title": "命令行速查",
          "subtitle": "适合脚本化与批处理",
          "columns": [
            "命令",
            "作用"
          ],
          "rows": [
            [
              "compress -o 输出 -f 格式 输入…",
              "压缩文件或文件夹（-l 等级、-p 密码、--encrypt-names 加密文件名）"
            ],
            [
              "extract -o 目录 压缩包",
              "解压（-p 密码、--tar-encoding gbk 修中文名）"
            ],
            [
              "list 压缩包",
              "查看压缩包内容"
            ],
            [
              "formats",
              "列出可用格式与引擎状态"
            ]
          ]
        }
      ],
      "usage": {
        "title": "快速上手",
        "steps": [
          {
            "no": "1",
            "name": "添加内容",
            "desc": "点「＋ 添加文件」或「＋ 添加文件夹」，把要压缩的东西加入列表（暂不支持拖放）。"
          },
          {
            "no": "2",
            "name": "选择格式与等级",
            "desc": "默认 ZIP 兼容性最好；追求最小体积选 7Z + 极限压缩；需要密码只能选 7Z。"
          },
          {
            "no": "3",
            "name": "开始压缩",
            "desc": "确认输出路径后点「▶ 开始压缩」，进度条实时刷新，完成后可直接打开输出目录。"
          },
          {
            "no": "4",
            "name": "解压同样简单",
            "desc": "到「解压」页选择压缩包，程序会自动识别格式并预览内容；中文名乱码时把 TAR 编码改为 GBK。"
          }
        ],
        "cliTitle": "命令行示例",
        "cliBlocks": [
          "CompressKit.exe --cli compress -o 备份.7z -f 7z -l \"极限压缩（最慢）\" -p 密码 --encrypt-names D:\\资料",
          "CompressKit.exe --cli extract -o D:\\解压结果 备份.7z -p 密码\nCompressKit.exe --cli list 备份.7z"
        ]
      },
      "faq": [
        {
          "q": "和上一代 CompressTool 有什么区别？",
          "a": "上一代程序把 7z.exe 和 7zr.exe 打包进来，却漏带了必需的 7z.dll，压缩时会报「Codec Load Error: 7z.dll 找不到指定的模块」，功能实际不可用。本版改成纯 Python 实现（ZIP/TAR/GZ/BZ2/XZ 用标准库、7Z 用内置 py7zr），不再依赖任何外部 exe，另外补上了中文名修复、路径穿越防护、实时进度与命令行模式。"
        },
        {
          "q": "需要另外安装 7-Zip 吗？",
          "a": "不需要。只有解压 RAR / ISO / CAB / WIM 这类专有格式时，程序才会去找系统里已安装的 7-Zip 来调用；没有安装也不影响其它格式。"
        },
        {
          "q": "ZIP 为什么不能设密码？",
          "a": "程序的加密基于 7Z 的 AES-256；ZIP 传统的 ZipCrypto 加密强度很低，因此没有提供。需要加密请选择 7Z 格式，还可以勾选「同时加密文件名」。"
        },
        {
          "q": "密码忘了能找回吗？",
          "a": "不能。AES-256 没有任何后门，密码只存在于你输入的那一刻，不保存也不上传，请务必自行记录。"
        },
        {
          "q": "压缩会不会改动或删除我的原文件？",
          "a": "不会。压缩只读取原文件并写出一个新的压缩包；解压时可选择覆盖还是自动改名；任务取消时会删除未完成的压缩包。"
        },
        {
          "q": "速度怎么样？",
          "a": "ZIP / GZ / BZ2 / XZ 走标准库，速度较快；7Z 的极限压缩最慢但体积最小。实测对 3.3 MB 混合数据，ZIP 约 0.2 秒、7Z 约 0.9 秒、TAR.XZ 约 0.9 秒。"
        }
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
          "深色中文界面，窗口按内容自适应尺寸；Inno Setup 中文安装包，自带卸载程序"
        ]
      },
      "download": {
        "file": "CompressKit_Setup_1.0.0.exe",
        "url": "downloads/CompressKit_Setup_1.0.0.exe",
        "bytes": 16556902,
        "sha256": "592F9D36E3806C9BD255D21CED24F3899ACB6AA1C7491930A77A7738CA188ACB",
        "note": "中文安装向导，可选「仅为我安装」而无需管理员权限；自带卸载程序，安装目录含第三方组件许可证。"
      }
    },
    {
      "id": "gamemodtranslator",
      "name": "GameModTranslator 游戏 Mod AI 翻译器",
      "short": "游戏 Mod 翻译器",
      "en": "GameModTranslator",
      "version": "v1.0",
      "date": "2026-08-22",
      "sizeText": "10.6 MB",
      "accent": "#8b5cf6",
      "icon": "assets/img/app-gamemodtranslator.png",
      "tagline": "AI 批量翻译游戏 Mod 文本，格式码与占位符原样保留",
      "summary": "兼容 DeepSeek / OpenAI / Kimi / 通义 / 本地 Ollama 等任意 OpenAI 兼容接口，支持 JSON / YAML / XML / Paradox YML / CSV / INI / TXT 七种格式，翻译缓存、并发批量、命令行模式一应俱全。",
      "highlights": [
        "7 种文本格式",
        "占位符保护",
        "翻译缓存",
        "并发批量",
        "本地模型 / 命令行"
      ],
      "features": [
        {
          "icon": "⚡",
          "name": "并发批量翻译",
          "desc": "1~16 并发可调，遇到 429 / 5xx 自动指数退避重试，几千条文本的大 Mod 也能快速跑完。"
        },
        {
          "icon": "🛡",
          "name": "占位符保护",
          "desc": "<code>{0}</code>、<code>%s</code>、<code>$KEY$</code>、<code>§R..§!</code>、<code>&lt;b&gt;</code>、<code>[Root.X]</code> 等格式码翻译后原样保留；万一丢失会自动重试并在日志中提示。"
        },
        {
          "icon": "🗂",
          "name": "7 种格式支持",
          "desc": "JSON / YAML / XML / CSV / INI / Paradox YML / TXT，覆盖绝大多数主流游戏 Mod 的文本文件。"
        },
        {
          "icon": "💾",
          "name": "翻译缓存",
          "desc": "相同文本只翻译一次，结果保存在 cache.json；重复运行或 Mod 更新时不会重复消耗 API 额度。"
        },
        {
          "icon": "🖥",
          "name": "本地模型离线翻译",
          "desc": "支持 Ollama / LM Studio / vLLM / llama.cpp 等本地服务，完全免费且数据不出电脑。"
        },
        {
          "icon": "🧬",
          "name": "结构与编码保留",
          "desc": "原文件编码（UTF-8 / BOM / UTF-16 / GBK）、缩进风格与注释位置保持不变。"
        },
        {
          "icon": "🔒",
          "name": "安全输出",
          "desc": "默认输出到新文件夹，目录结构与原 Mod 一致；选择覆盖原文件时会自动备份 .bak，随时可回退。"
        },
        {
          "icon": "⌨️",
          "name": "命令行模式",
          "desc": "提供 --cli 参数，可脚本化批处理，方便集成到自己的构建流程里定时翻译。"
        }
      ],
      "tables": [
        {
          "title": "支持的格式与游戏",
          "subtitle": "按文件格式通用支持，未知扩展名按纯文本处理",
          "columns": [
            "扩展名",
            "格式",
            "典型游戏"
          ],
          "rows": [
            [
              ".json",
              "JSON",
              "群星 Stellaris · 我的世界 · 戴森球计划"
            ],
            [
              ".xml",
              "XML / Defs",
              "环世界 RimWorld · 泰拉瑞亚"
            ],
            [
              ".yml",
              "Paradox YML",
              "十字军之王3 · 维多利亚3 · 欧陆风云4"
            ],
            [
              ".yaml",
              "YAML",
              "博德之门3 · 泰拉瑞亚"
            ],
            [
              ".csv",
              "CSV",
              "城市：天际线 · 王国风云2"
            ],
            [
              ".ini",
              "INI / properties",
              "异星工厂 · 大量老游戏配置"
            ],
            [
              ".txt",
              "纯文本",
              "strings / lang / loc 等各类独立游戏文本"
            ]
          ]
        },
        {
          "title": "可用的 AI 接口",
          "subtitle": "任何 OpenAI 兼容接口都能填，费用由对应服务商决定",
          "columns": [
            "服务",
            "接口地址示例",
            "模型示例"
          ],
          "rows": [
            [
              "DeepSeek",
              "https://api.deepseek.com/v1",
              "deepseek-chat（默认预填）"
            ],
            [
              "OpenAI 兼容云服务",
              "各家提供的 /v1 地址",
              "按服务商文档填写"
            ],
            [
              "Ollama（本地）",
              "http://localhost:11434/v1",
              "qwen2.5:7b"
            ],
            [
              "LM Studio（本地）",
              "http://localhost:1234/v1",
              "界面中已加载的模型"
            ],
            [
              "vLLM（本地）",
              "http://localhost:8000/v1",
              "Qwen/Qwen2.5-7B-Instruct"
            ]
          ]
        }
      ],
      "usage": {
        "title": "快速上手",
        "steps": [
          {
            "no": "1",
            "name": "填写 API 设置",
            "desc": "填入接口地址、API Key 与模型名，点「测试连接」确认可用；默认已预填 DeepSeek 配置。"
          },
          {
            "no": "2",
            "name": "选择 Mod 文件夹",
            "desc": "点「扫描」自动识别可翻译文件与文本条数，双击条目可勾选或取消。"
          },
          {
            "no": "3",
            "name": "开始翻译",
            "desc": "点「▶ 开始翻译」，进度实时显示；完成后到输出文件夹取用，格式码与结构保持原样。"
          },
          {
            "no": "4",
            "name": "（可选）命令行批处理",
            "desc": "用 --cli 参数对指定目录批量翻译，适合把翻译流程写进脚本。"
          }
        ],
        "cliTitle": "命令行示例",
        "cliBlocks": [
          "GameModTranslator.exe --cli --input D:\\mods\\MyMod --output D:\\mods\\MyMod_zh ^\n  --api-key sk-xxx --model deepseek-chat --lang 简体中文",
          "GameModTranslator.exe --cli --input D:\\mods\\MyMod --list   :: 仅扫描不翻译\nGameModTranslator.exe --cli --input D:\\mods\\MyMod --inplace --api-key sk-xxx   :: 覆盖原文件（自动备份 .bak）"
        ]
      },
      "faq": [
        {
          "q": "支持哪些游戏？",
          "a": "按文件格式通用支持：群星、环世界、我的世界、十字军之王3、维多利亚3、欧陆风云4、城市：天际线、异星工厂、泰拉瑞亚、博德之门3，以及大量使用 JSON / YAML / XML / CSV / INI / TXT 文本的独立游戏。只要能定位到文本文件，就能翻译。"
        },
        {
          "q": "用什么 AI？要花钱吗？",
          "a": "任意 OpenAI 兼容接口都可以：DeepSeek（便宜）、OpenAI、Kimi、通义千问、智谱，或者完全免费的本地模型（Ollama 等）。费用由你选择的接口服务商决定；翻译缓存保证相同文本不会重复扣费。"
        },
        {
          "q": "会不会把 {0}、%s 这类格式码翻译坏？",
          "a": "不会。翻译前会把 <code>{0}</code>、<code>%s</code>、<code>$KEY$</code>、<code>§R..§!</code>、<code>&lt;b&gt;</code>、<code>[Root.X]</code> 等替换为哨兵标记，翻译后再还原；若模型弄丢标记，程序会自动重试一次并在日志中警告。"
        },
        {
          "q": "翻译结果保存在哪里？",
          "a": "默认输出到「翻译输出」文件夹，目录结构与原 Mod 一致，直接复制回游戏目录即可；也可以选择覆盖原文件模式，程序会先自动生成 <code>.bak</code> 备份。"
        },
        {
          "q": "缓存文件在哪？删掉会怎样？",
          "a": "缓存 <code>cache.json</code> 与配置 <code>config.json</code> 保存在程序同目录（安装版在安装目录）。删除缓存只会让已翻译的文本重新请求接口，没有其他影响。"
        },
        {
          "q": "翻译质量如何保证？",
          "a": "内置游戏本地化提示词：保留专有名词与术语、保持游戏语气、禁止解释性输出；每条文本会附带文件路径与键名作为上下文。你也可以自定义额外提示词或调低温度让结果更稳定。"
        }
      ],
      "changelog": {
        "version": "v1.0",
        "date": "2026-08-22",
        "badge": "首发",
        "items": [
          "中文图形界面：API 设置、文件扫描、进度显示、停止与继续",
          "支持 JSON / YAML / XML / Paradox YML / CSV / INI / TXT 七种格式",
          "占位符保护机制，覆盖 {0} %s $KEY$ §R..§! <b> [Root.X] ^R 等格式码",
          "翻译缓存（cache.json）+ 并发翻译 + 失败自动重试",
          "支持本地模型（Ollama / LM Studio / vLLM）",
          "输出到新文件夹 / 覆盖原文件（自动 .bak 备份）双模式",
          "命令行模式（--cli），可脚本化批量处理",
          "编码自动识别（UTF-8 / BOM / UTF-16 / GBK），结构原样保留"
        ]
      },
      "download": {
        "file": "GameModTranslator-Setup-1.0.exe",
        "url": "downloads/GameModTranslator-Setup-1.0.exe",
        "bytes": 11120378,
        "sha256": "CAC4EA3B8A546E3EC804A6DCC16ABFDBBCD9CA5AD4DBE5FF0C9E8F052AB89647",
        "note": "中文安装向导，默认安装到当前用户目录（无需管理员权限），自带卸载程序。"
      }
    }
  ],
  "shared": {
    "title": "三款软件的共同点",
    "subtitle": "同一套打包与安装标准，装哪一款体验都一样干净",
    "items": [
      {
        "icon": "🧭",
        "name": "中文安装向导",
        "desc": "Inno Setup 向导全中文，可自选安装目录，装完自动创建开始菜单快捷方式，桌面快捷方式按需勾选。"
      },
      {
        "icon": "🗑",
        "name": "自带卸载程序",
        "desc": "在「设置 → 应用」或开始菜单中即可卸载，安装目录中只有程序本体与运行库，没有捆绑的第三方软件。"
      },
      {
        "icon": "💻",
        "name": "计算全在本地",
        "desc": "AVTools 用内置 ffmpeg 与本机计算完成转码；CompressKit 用内置的纯 Python 压缩引擎；GameModTranslator 只在你点击翻译时访问你自己填写的接口地址。"
      },
      {
        "icon": "🧩",
        "name": "无需预装环境",
        "desc": "已内置 Python 运行库与所需引擎，不必另外安装 Python、ffmpeg 或 7-Zip。"
      },
      {
        "icon": "🔍",
        "name": "提供 SHA256 校验",
        "desc": "每个安装包都给出 SHA256 校验值，下载后用一条命令即可确认文件完整、未被篡改。"
      },
      {
        "icon": "🪟",
        "name": "适配 Windows 10 / 11",
        "desc": "面向 64 位 Windows 打包，使用系统自带 Tk 界面库，不依赖 .NET 或 Java 运行环境。"
      }
    ]
  },
  "downloads": {
    "title": "全部下载",
    "subtitle": "四个安装文件 · 合计约 64.5 MB · 均低于 GitHub 单文件 25 MB 限制",
    "note": "下载后建议核对 SHA256：在文件所在目录打开 PowerShell，执行 Get-FileHash .\\文件名 -Algorithm SHA256，与下方数值比对一致即可放心安装。",
    "items": [
      {
        "name": "AVTools 音视频工具箱",
        "version": "v1.0.0",
        "file": "AVTools_Setup_1.0.0.exe",
        "url": "downloads/AVTools_Setup_1.0.0.exe",
        "size": "14.9 MB",
        "date": "2026-10-01",
        "sha256": "F582B6DE3EC90682C4E9EACF61C5250C779E45469CFA40DF48CD49C6FFABDFA9",
        "appId": "avtools"
      },
      {
        "name": "AVTools 视频解码器（ffmpeg 7.1）",
        "version": "7.1",
        "file": "AVTools-解码器.exe",
        "url": "downloads/AVTools-解码器.exe",
        "size": "23.3 MB",
        "date": "2026-10-01",
        "sha256": "B83E09C9E1A6688741A6DE68CD66F01CAB9461E66C9C1A85D9D5C9299E214E84",
        "appId": "avtools"
      },
      {
        "name": "CompressKit 压缩工具箱",
        "version": "v1.0.0",
        "file": "CompressKit_Setup_1.0.0.exe",
        "url": "downloads/CompressKit_Setup_1.0.0.exe",
        "size": "15.8 MB",
        "date": "2026-10-01",
        "sha256": "592F9D36E3806C9BD255D21CED24F3899ACB6AA1C7491930A77A7738CA188ACB",
        "appId": "compresskit"
      },
      {
        "name": "GameModTranslator 游戏 Mod AI 翻译器",
        "version": "v1.0",
        "file": "GameModTranslator-Setup-1.0.exe",
        "url": "downloads/GameModTranslator-Setup-1.0.exe",
        "size": "10.6 MB",
        "date": "2026-08-22",
        "sha256": "CAC4EA3B8A546E3EC804A6DCC16ABFDBBCD9CA5AD4DBE5FF0C9E8F052AB89647",
        "appId": "gamemodtranslator"
      }
    ]
  },
  "faq": {
    "title": "常见问题",
    "subtitle": "安装、安全、卸载相关的通用问题",
    "items": [
      {
        "q": "这些软件要收费吗？有广告吗？",
        "a": "三款软件均为免费使用，没有广告、没有内购、不需要注册账号。如果它们帮你省下了时间，可以到「支持作者」一节请作者喝杯咖啡。",
        "open": true
      },
      {
        "q": "为什么 AVTools 要装两个文件？",
        "a": "AVTools 自带的 ffmpeg 解码器解压后有 83.58 MB，压缩后仍占约 23 MB，塞进一个安装包就会超过 25 MB，没法用 GitHub 网页上传。所以把它拆成「主程序 14.9 MB」和「解码器 23.3 MB」两个文件：把两个文件放在同一个文件夹里，运行主程序安装向导时会自动把解码器也装好；假如漏装了解码器，程序在用到时会明确提示，不会静默失败。"
      },
      {
        "q": "安装需要管理员权限吗？",
        "a": "安装到系统 Program Files 目录时需要管理员权限，安装向导会自动请求；GameModTranslator 默认安装到当前用户目录，不需要管理员权限。也可以把安装目录改到用户目录下来避免提权。"
      },
      {
        "q": "会被杀毒软件或 Windows Defender 拦截吗？",
        "a": "这些程序使用 PyInstaller 打包、未购买代码签名证书，部分杀毒软件会对未签名程序做启发式拦截，属于误报。如果被拦截，请添加信任或选择「仍要运行」后重新安装。"
      },
      {
        "q": "程序会联网或上传我的文件吗？",
        "a": "AVTools 与 CompressKit 的处理流程全部在本机完成，不访问网络。GameModTranslator 只在你点击「开始翻译」时，把待翻译的文本发送到你自己填写的 AI 接口地址（默认 DeepSeek，也可换成完全本地的 Ollama），除此之外不上传任何文件。"
      },
      {
        "q": "怎么卸载？会留下垃圾文件吗？",
        "a": "打开「设置 → 应用 → 已安装的应用」，找到对应软件点击卸载即可；也可以从开始菜单运行卸载程序。卸载会移除程序文件与快捷方式。"
      },
      {
        "q": "网站上的下载文件是官方版本吗？",
        "a": "是。本站提供的安装包与作者发布的一致，每个文件都标注了 SHA256 校验值，可自行核对；如果校验值不一致，说明下载过程中文件被改动，请勿安装。"
      },
      {
        "q": "支持 Windows 7 / 8 吗？",
        "a": "这三个安装包面向 Windows 10 / 11 64 位系统打包与测试，Windows 7 / 8 可能可以运行但未做验证，建议在受支持的系统上使用。"
      }
    ]
  },
  "support": {
    "title": "为爱发电 · 支持作者",
    "subtitle": "软件免费、无广告、无内购。如果它帮你省下了大把时间，欢迎用喜欢的方式支持作者，让这些工具能一直更新下去 💜",
    "platforms": [
      {
        "icon": "💗",
        "name": "爱发电",
        "desc": "国内创作者支持平台，可小额赞赏",
        "url": "https://ifdian.net/a/aify233",
        "button": "前往爱发电 ↗",
        "btnClass": "btn-primary"
      }
    ],
    "qr": {
      "image": "assets/img/qr_wechat.png",
      "title": "微信赞赏码",
      "hint": "扫码或长按识别，赞赏全凭心意"
    },
    "freeTitle": "不花钱也能支持 ✨",
    "freeChips": [
      "⭐ 把工具推荐给朋友",
      "📣 在社区 / 论坛分享使用体验",
      "🐛 反馈 Bug 与使用问题",
      "💬 提出功能建议",
      "🌍 帮忙校对与改进文案"
    ]
  },
  "footer": {
    "cols": [
      {
        "title": "实用工具箱",
        "html": "<div>三款 Windows 实用软件，一处下载。</div>"
      },
      {
        "title": "软件",
        "html": "<a href=\"avtools.html\">AVTools 音视频工具箱</a><br>\n<a href=\"compresskit.html\">CompressKit 压缩工具箱</a><br>\n<a href=\"gamemodtranslator.html\">GameModTranslator 翻译器</a>"
      },
      {
        "title": "快速入口",
        "html": "<a href=\"index.html#download\">全部下载</a> · <a href=\"index.html#shared\">共同特点</a> · <a href=\"index.html#faq\">常见问题</a> · <a href=\"index.html#support\">支持作者</a>"
      }
    ],
    "note": "© <span id=\"year\"></span> 实用工具箱 · 本站为软件下载与说明页面 · 下载后请核对 SHA256 校验值 · 请支持正版软件与 Mod 作者"
  }
};
