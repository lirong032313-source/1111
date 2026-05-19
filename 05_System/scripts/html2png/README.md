# html2png 使用指南

## ✅ 最简单方案（推荐）

你的 HTML 配图文件已经生成在：

```
04_Output/自媒体内容/公众号/配图素材/
├── 图1_三层架构图.html
├── 图2_提示词vs契约书.html
├── 图3_6个核心章节.html
└── 图4_风格采样.html
```

### 一键转PNG步骤（macOS）：

**第1步**：双击任意HTML文件，在浏览器中打开

**第2步**：浏览器窗口拉到最大（越大截图越清晰）

**第3步**：按 `Cmd + Shift + 4`，用十字光标框选图片区域

**第4步**：截图自动保存到桌面，重命名为对应文件名

> 💡 HTML是**矢量渲染**，浏览器拉多大，截图就有多清晰！

---

## 🚀 一键自动化脚本（推荐）

我已经写好了 **Node.js + Puppeteer** 脚本！

### 安装步骤：

```bash
# 1. 进入脚本目录
cd "/Users/rong/Desktop/ob大脑/05_System/scripts/html2png"

# 2. 安装 puppeteer（只用装一次）
npm install puppeteer

# 3. 运行脚本
node index.js
```

脚本会自动：
1. 找到所有 HTML 文件
2. 用 Headless Chrome 打开
3. 截图保存为 900×500px 的 PNG
4. 输出到 `配图输出/` 目录

---

## 📷 手动截图尺寸参考

| 用途 | 尺寸 |
|---|---|
| 公众号封面图 | 900×500 px |
| 文章内插图 | 900×任意高度 |
| 封面缩略图 | 200×200 px |

---

## 🔧 脚本文件说明

| 文件 | 用途 |
|---|---|
| `package.json` | npm 项目配置 |
| `index.js` | 主程序（Puppeteer 截图） |
| `screenshot.js` | 备用方案（AppleScript） |

---

## ❓ 遇到问题？

**Q: Puppeteer 安装太慢？**
A: 设置国内镜像：
```bash
npm config set puppeteer_download_host=https://registry.npmmirror.com/-/binary/chrome-for-testing
npm install puppeteer
```

**Q: 不想装 Puppeteer？**
A: 用浏览器手动截图，效果一样好！

**Q: 想要批量自动截图？**
A: 运行 `node index.js`，全自动处理所有 HTML 文件。
