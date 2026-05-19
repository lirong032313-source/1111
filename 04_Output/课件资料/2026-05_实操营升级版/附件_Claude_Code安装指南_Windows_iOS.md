# 附件：Claude Code 安装指南（Windows + iOS）

> 适用场景：21天实操营学员 · Claude Code 是什么 + 怎么装
> 前置条件：已安装 WorkBuddy（必选）· Claude Code 为可选增强工具
> ⚠️ **重要提示**：没有 Claude Code 也完全不影响使用！WorkBuddy 已经能完成所有核心操作。Claude Code 是进阶选项。

---

## 一、Claude Code 是什么？我需不需要装？

| 问题 | 答案 |
|---|---|
| **它是啥？** | Anthropic 官方的终端 AI 助手，可以读写文件、执行命令、理解代码 |
| **跟 WorkBuddy 啥关系？** | WorkBuddy = 你的主脑（网页/小程序都能用）；Claude Code = 进阶版终端工具，能力更强但需要电脑操作 |
| **必须装吗？** | ❌ 不必须！实操营所有任务用 WorkBuddy 就够了 |
| **谁建议装？** | 想要更强文件操作能力、愿意折腾终端的同学 |

### 一句话总结

> **WorkBuddy = 够用 · Claude Code = 更强但费 token**

---

## 二、Windows 安装指南

### 方式 A：npm 安装（推荐，最通用）

#### 第 1 步：安装 Node.js

1. 打开浏览器，访问 **https://nodejs.org**
2. 点击下载 **LTS 版本**（长期支持版）
3. 运行安装程序，一路「下一步」即可
4. ⚠️ 安装时**务必勾选** "Add to PATH"（添加到环境变量）
5. 安装完成后，**重启电脑**

> 验证是否安装成功：打开 PowerShell，输入 `node -v`，看到版本号就说明 OK

```
C:\> node -v
v22.x.x    ← 看到这个就对了
```

#### 第 2 步：安装 Claude Code

1. 按 `Win + X`，选择 **Windows PowerShell（管理员）** 或 **终端**
2. 输入以下命令并回车：

```bash
npm install -g @anthropic-ai/claude-code
```

3. 等待安装完成（可能需要几分钟）
4. 验证：

```bash
claude --version
```

看到版本号就说明安装成功了 ✅

#### 第 3 步：登录认证

1. 在 PowerShell 中输入：

```bash
claude
```

2. 第一次启动会自动弹出浏览器登录页面
3. 用你的 **Anthropic 账号登录**（就是官网 claude.ai 的账号）
4. 登录成功后回到终端，就可以开始用了

> 如果没有 Anthropic 账号，去 https://claude.ai 注册一个（免费或 Plus 都行）

### 方式 B：原生安装器（更简单，无需 Node.js）

1. 访问 https://claude.com/download
2. 选择 **Windows** 版本下载
3. 运行 `.msi` 安装包
4. 一路「下一步」安装
5. 安装完成后在开始菜单找到 **Claude Code** 打开即可

> ⚠️ 注意：原生安装器是较新的功能，如果你的 Windows 版本较旧可能不支持，此时请用方式 A

### 方式 C：通过 VS Code 插件（适合已经在用 VS Code 的同学）

1. 打开 VS Code
2. 按 `Ctrl+Shift+X` 打开扩展商店
3. 搜索 **"Claude"**
4. 找到 **Anthropic 官方的 Claude Code 扩展** → 点击安装
5. 安装后侧边栏会出现 Claude 图标，点击即可使用

---

## 三、iOS / iPhone / iPad 使用指南

### ⚠️ 先说结论：iOS 上不能直接安装 Claude Code CLI

**原因**：Claude Code 是一个**终端命令行工具**，只能在 Mac/Windows/Linux 的电脑上运行。iPhone/iPad 上没有原生终端环境。

### 但你可以在 iOS 上「远程使用」Claude Code！

#### 方案 ①：用 Claude 官方 App（最简单，推荐 👍）

这是绝大多数人的选择 —— 直接用官方 App 就够了：

1. 打开 **App Store**，搜索 **"Claude"**
2. 下载 **Claude by Anthropic**（蓝色图标）
3. 用你的账号登录
4. 可以直接对话、上传文件、分析图片

| 对比项 | Claude App | Claude Code (电脑端) |
|---|---|---|
| 设备要求 | iPhone 即可 | 需要 Mac/Windows 电脑 |
| 文件操作 | 能看能传，但不能直接改本地文件 | 可以直接读写本地文件夹 |
| 知识库场景 | 对话式问答 | 可直接扫描 ob大脑目录 |
| 费用 | 免费 / Pro $20/月 | 按 API用量计费 |
| 适合谁 | 所有人 | 想深度定制的人 |

#### 方案 ②：Happy Coder（开源免费，远程操控）

如果你想用手机操控电脑上的 Claude Code：

1. **电脑端先装好 Claude Code**（参考上面的 Windows/Mac 安装方法）
2. 手机上访问 Happy Coder 的 GitHub 页面下载 iOS 版
3. 通过手机发指令，电脑上的 Claude Code 来干活

> 这个方案比较折腾，**不推荐新手尝试**。等实操营后期有需求再探索。

#### 方案 ③：Tactic Remote（付费方案）

- 商业化产品，体验较好
- 支持从 iPhone 远程连接 Claude Code
- 有免费试用额度
- 访问：https://www.clauderc.com

---

## 四、Mac 用户补充（简略版）

如果实操营里有用 Mac 的同学：

```bash
# 方式一：Homebrew（最简单）
brew install claude-code

# 方式二：npm（同 Windows）
npm install -g @anthropic-ai/claude-code

# 方式三：原生安装器
# 访问 https://claude.com/download 选 macOS 版本
```

安装完成后终端输入 `claude` 回车即可。

---

## 五、常见问题排查（FAQ）

### Q1：npm 安装报错 "command not found"
**原因**：Node.js 没加到 PATH，或者没重启电脑
**解决**：
- 重启电脑后再试
- 或者手动把 Node.js 的路径加到系统环境变量

### Q2：PowerShell 说"无法加载文件，因为在此系统上禁止运行脚本"
**原因**：Windows 默认禁止运行 PowerShell 脚本
**解决**：以管理员身份打开 PowerShell，输入：
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
然后输入 Y 确认

### Q3：Claude Code 启动很慢 / 一直转圈
**原因**：网络问题（国内直连 Anthropic 可能慢）
**解决**：
- 开梯子（VPN）再试
- 或者在 WorkBuddy 里用内置模型（不走 Anthropic 直连）

### Q4：装完 Claude Code 还需要装 WorkBuddy 吗？
**答：需要！两者不冲突。**
- **WorkBuddy**：你的主控台，管理记忆、自动化、微信对接
- **Claude Code**：增强工具，更强的文件操作和代码能力

实操营核心流程全部基于 WorkBuddy，Claude Code 是锦上添花。

### Q5：token 费用大概多少？
| 用途 | 大约费用 |
|---|---|
| Claude API（Code 用） | 约 $20/月（重度使用） |
| 国内模型替代（MiniMax 等） | ¥40-50/月，性价比高 |
| WorkBuddy 内置模型 | 看套餐，日常够用 |

> 💡 省钱技巧：日常任务用 WorkBuddy 内置模型或接国产模型（MiniMax/智谱），只有需要最强能力时才切 Claude 原生模型。

### Q6：Windows 中文用户名导致路径报错怎么办？
**现象**：路径里包含中文时报错找不到文件
**解决**：
- 把 ob大脑文件夹放在**纯英文路径**下（如 `C:\ob-brain\`）
- 或创建一个新的英文用户名账户来使用

---

## 六、实操营学员快速决策表

| 你是谁 | 推荐方案 | 需要花的时间 |
|---|---|---|
| **只想跟上课程进度** | 只装 WorkBuddy 就够了 | 已完成 ✅ |
| **Windows 用户，想试试 Claude Code** | 方式 B（原生安装器） | 10 分钟 |
| **Windows 用户，技术小白怕出错** | 方式 C（VS Code 插件） | 15 分钟 |
| **iPhone 用户，移动端为主** | 装 Claude 官方 App | 3 分钟 |
| **想手机远程操控电脑上的 CC** | 先别折腾，21 天后再说 | — |
| **Mac 用户** | Homebrew 一行命令 | 2 分钟 |

---

## 七、安装后的第一步验证

不管用的哪种方式，装好后做这个测试确认能用：

```
输入：帮我建一个 test 文件夹，在里面新建 hello.md 写入"Hello from Claude Code!"
```

如果能成功生成文件，说明 Claude Code 工作正常 ✅

---

*文档版本：v1 · 更新时间：2026-05-11*
*适用范围：21天AI实操营学员 · 如有问题群内艾特蓉蓉子*
