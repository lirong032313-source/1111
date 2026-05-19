# SOP: 在 Obsidian 中安装 Claudián 插件

> 将 Claude Code 集成到 Obsidian 作为 AI 助手
> 更新时间：2026-05-05

---

## 准备工作

1. **下载 Claudián 插件文件**
   - GitHub 仓库：https://github.com/YishenTu/claudian/releases
   - 版本：v2.0.10
   - 需要下载三个文件：
     - `main.js` (~3.6MB)
     - `manifest.json` (~300B)
     - `styles.css` (~125KB)

---

## 安装步骤

### 步骤 1：创建插件目录

在 Obsidian  vault 的 `.obsidian/plugins/` 目录下创建 `claudian` 文件夹：

```
/path/to/your-vault/.obsidian/plugins/claudian/
```

### 步骤 2：放置插件文件

将下载的三个文件放入 `claudian` 目录：

```
claudian/
├── main.js
├── manifest.json
└── styles.css
```

### 步骤 3：启用社区插件

编辑 `community-plugins.json` 文件（位于 `.obsidian/` 目录）：

```json
["enhanced-publisher", "claudian"]
```

如果没有 `community-plugins.json`，创建一个空数组文件。

### 步骤 4：重启 Obsidian

1. 完全退出 Obsidian
2. 重新打开 vault
3. 进入设置 → 社区插件
4. 应该能看到 Claudián 插件
5. 启用并配置

---

## 验证安装

- 启用插件后，侧边栏或命令面板中应该出现 Claudián 的选项
- 可以通过 `Ctrl/Cmd + P` 打开命令面板搜索 "Claudian" 验证

---

## 常见问题

### 加载失败
- 检查 `main.js` 文件大小是否正确（~3.6MB）
- 检查 `manifest.json` 格式是否正确（有效 JSON）
- 尝试删除重新下载

### 网络下载慢
- 可以使用代理或科学上网
- 或者手动复制已下载的文件

### Node.js 找不到

启动 Obsidian 时报错：`Claude Code CLI requires Node.js`

**解决方案：**

#### 方案1：通过终端启动（推荐）
```bash
# 在终端中运行：
/Users/rong/.deskclaw/run-obsidian.sh
```

或者：
```bash
export PATH="/Users/rong/.deskclaw/node/bin:$PATH"
open -a Obsidian
```

#### 方案2：创建系统链接（需要 sudo 密码）
```bash
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
```

---

*SOP 文档 · 2026-05-05*