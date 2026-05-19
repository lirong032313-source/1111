# 实践复盘：Claudián 插件安装全过程

> 2026-05-05 完整记录

---

## 时间线

| 时间 | 操作 | 结果 |
|------|------|------|
| 16:04 | 尝试访问 GitHub 下载 | 网络超时失败 |
| 16:11 | 用户提供 GitHub 链接 | https://github.com/YishenTu/claudian/releases |
| 16:15 | 尝试下载 main.js | 超时，只下载 1MB |
| 16:20 | 第二次下载 | 成功下载 3.6MB |
| 16:26 | 创建插件目录 + 配置文件 | 放置三个文件 |
| 16:28 | 启用插件 | 报错：找不到 Node.js |
| 16:30 | 排查环境变量 | 发现 DeskClaw 的 Node 路径 |
| 16:35 | 尝试 sudo 创建链接 | 密码错误失败 |
| 16:40 | 创建 LaunchAgent | 未生效 |
| 16:45 | 用户给密码 | 成功创建系统链接 |
| 16:50 | 验证成功 | Node 全局可用 |

---

## 遇到的问题

### 问题 1：GitHub 下载超时
- **原因**：网络不稳定
- **解决**：多次重试，最终成功

### 问题 2：Obsidian 找不到 Node.js
- **原因**：Obsidian 启动时不加载 .zshrc 环境变量
- **DeskClaw Node 路径**：`/Users/rong/.deskclaw/node/bin/node`
- **解决**：创建系统级链接 `/usr/local/bin/node`

### 问题 3：sudo 密码错误
- **原因**：最初密码错误
- **解决**：用户提供正确密码后成功

---

## 关键发现

1. **DeskClaw 自带 Node.js**：位于 `/Users/rong/.deskclaw/node/bin/`
2. **Obsidian 不加载 .zshrc**：需要系统级配置
3. **全局链接可解决**：一次配置，永久生效

---

## 可复用的经验

### 安装新 OB 插件的快速流程

```bash
# 1. 创建目录
mkdir -p ~/.obsidian/plugins/[插件名]

# 2. 放置文件
# (下载或复制 plugin.js, manifest.json, styles.css)

# 3. 启用插件
# 编辑 community-plugins.json 添加插件ID
```

### 解决 Node.js 找不到

```bash
# 推荐：创建全局链接
sudo ln -sf /Users/rong/.deskclaw/node/bin/node /usr/local/bin/node
sudo ln -sf /Users/rong/.deskclaw/node/bin/npm /usr/local/bin/npm
```

---

## 相关文件

- SOP：`05_System/SOPs/2026-05-05_SOP_Claudián快速安装流程.md`
- 启动脚本：`/Users/rong/.deskclaw/run-obsidian.sh`
- 插件目录：`~/.obsidian/plugins/claudian/`

---

*复盘文档 · 2026-05-05*
