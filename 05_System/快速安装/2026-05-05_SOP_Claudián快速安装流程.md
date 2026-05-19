# SOP: Claudián 插件快速安装流程（AI 助手版）

> 快速将 Claude Code 集成到 Obsidian
>
> 包含 Claude Code / WorkBuddy AI 助手安装提示词
> 更新：2026-05-05

---

## 方案对比

| 方案 | 可行性 | 难点 |
|------|--------|------|
| Claude Code 直接安装 | ✓ | GitHub 下载慢 |
| WorkBuddy 安装 | ✓ | 同样网络限制 |
| **预下载 + 系统链接** | **✓✓** | **推荐** |

---

## 方案一：Claude Code 安装（约3分钟）

> 使用 Claude Code (claude) 作为 AI 助手时的安装流程

### 步骤 1：检查环境

```bash
# 检查 Node.js 是否可用
which node
node --version
```

### 步骤 2：创建插件目录

```bash
mkdir -p ~/.obsidian/plugins/claudian
```

### 步骤 3：下载插件文件

**提示词 for Claude Code：**

```
请帮我从 GitHub 下载 Claudián 插件 v2.0.10：
1. 访问 https://github.com/YishenTu/claudian/releases
2. 下载 main.js、manifest.json、styles.css 三个文件
3. 放置到 ~/.obsidian/plugins/claudian/ 目录
```

如果下载超时，让 AI 重试几次，或使用本地缓存。

### 步骤 4：启用社区插件

编辑 `~/.obsidian/community-plugins.json`：
```json
["enhanced-publisher", "claudian"]
```

### 步骤 5：解决 Node.js 找不到

```bash
# 让 AI 执行（需要 sudo 密码）
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
sudo ln -sf /Users/rong/.deskclaw/node/bin/npm /usr/local/bin/npm
```

### 步骤 6：验证

```bash
node --version
```

---

## 方案二：WorkBuddy 安装（约3分钟）

> 使用 WorkBuddy 作为 AI 助手时的安装流程

### 步骤 1：检查环境

在 WorkBuddy 中输入：
```
检查 node 和 npm 是否可用
```

### 步骤 2：创建插件目录

```
请帮我创建目录 ~/.obsidian/plugins/claudian
```

### 步骤 3：下载插件文件

**提示词 for WorkBuddy：**

```
请帮我从 GitHub 下载 Claudián 插件 v2.0.10：
1. 访问 https://github.com/YishenTu/claudian/releases
2. 下载 main.js、manifest.json、styles.css 三个文件
3. 放置到 ~/.obsidian/plugins/claudian/ 目录
```

### 步骤 4：启用社区插件

```
请帮我编辑 ~/.obsidian/community-plugins.json，添加 "claudian" 到插件列表
```

### 步骤 5：解决 Node.js 找不到

**提示词：**

```
请帮我创建系统链接，需要 sudo 执行：
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
sudo ln -sf /Users/rong/.deskclaw/node/bin/npm /usr/local/bin/npm
```

---

## 方案三：预下载 + 系统链接（推荐）

### 步骤 1：创建插件目录

```bash
mkdir -p ~/.obsidian/plugins/claudian
```

### 步骤 2：下载插件文件

从 GitHub 下载（推荐使用代理/科学上网）：
- https://github.com/YishenTu/claudian/releases
- 版本：v2.0.10
- 文件：main.js、manifest.json、styles.css

### 步骤 3：放置文件

```
~/.obsidian/plugins/claudian/
├── main.js        (~3.6MB)
├── manifest.json  (~300B)
└── styles.css    (~125KB)
```

### 步骤 4：启用社区插件

编辑 `~/.obsidian/community-plugins.json`：
```json
["enhanced-publisher", "claudian"]
```

### 步骤 5：解决 Node.js 找不到的问题

```bash
# 创建全局链接（需要 sudo 密码）
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
sudo ln -sf /Users/rong/.deskclaw/node/bin/npm /usr/local/bin/npm
```

### 步骤 6：重启 Obsidian

完成！

---

## 关键问题解决

### 问题 1：GitHub 下载超时

**方案 A**：手动下载后复制
- 自己下载三个文件，告诉我存放位置

**方案 B**：预先缓存
- 我已将文件下载到本地，可以直接使用

### 问题 2：Obsidian 找不到 Node.js

**原因**：Obsidian 启动时不加载 .zshrc 环境变量

**方案 A**：系统链接（推荐，一次性解决）
```bash
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
```

**方案 B**：通过终端启动
```bash
/Users/rong/.deskclaw/run-obsidian.sh
```

---

## 快速验证

安装完成后，在 Obsidian 中：
1. 设置 → 社区插件 → 启用 Claudián
2. 打开命令面板 `Ctrl/Cmd + P`
3. 搜索 "Claudian" 开始对话

---

## 相关文件位置

| 文件 | 路径 |
|------|------|
| Claudián 插件 | `~/.obsidian/plugins/claudian/` |
| 启动脚本 | `/Users/rong/.deskclaw/run-obsidian.sh` |
| 本地缓存（已下载） | `/Users/rong/Desktop/ob大脑/.obsidian/plugins/claudian/` |

---

*SOP 文档 · 2026-05-05*
