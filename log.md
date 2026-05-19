# 📝 Wiki 操作日志

> **作用**：记录每次 Ingest / Query / Lint / 信息卡新增-修改-删除  
> **维护规则**：仅追加，不删除（Append-only）。AI 每次操作必须留痕。  
> **格式**：`[YYYY-MM-DD HH:mm] [操作类型] [操作描述] - 由 [人/AI]`

---

## 2026-05-11

```
[17:30] [Ingest] 5月AI实操营开营直播逐字稿 → 02_Wiki/2号房/信息卡/5月AI实操营开营直播.md - 由 Claude Code
[17:30] [Wiki+] 02_Wiki/3号房/金句库/5月开营直播金句.md（新建） - 由 Claude Code
[17:30] [Index+] 更新 index.md，新增信息卡+金句库索引 - 由 Claude Code
```

---

## 2026-05-10

```
[22:05] [Ingest] 01_Raw/行业文章/Taki访谈字幕 → 02_Wiki/2号房/信息卡/个人品牌爆炸性增长 - 由 Claude Code
[22:05] [Wiki+] 02_Wiki/2号房/信息卡/私教复盘模板.md（新建） - 由 Claude Code
[22:05] [Index+] 更新 index.md，新增 2 张信息卡索引 - 由 Claude Code
```

---

## 2026-05-02

```
[14:30] [Init] 创建 02_Wiki/log.md 操作日志 - 由 石榴🐾
[14:30] [Init] 创建 02_Wiki/index.md 全局索引 - 由 石榴🐾
[14:25] [Wiki+] 02_Wiki/案例库/_index.md 案例库索引 - 由 石榴🐾
[14:25] [Wiki+] 02_Wiki/案例库/ 新增 5 篇案例（M1×2 + M2×1 + M3×2）- 由 石榴🐾
[14:00] [Wiki+] 02_Wiki/6号房-我怎么想/信息卡/ 新增 3 张决策原则卡（内容/商业/人生）- 由 石榴🐾
[13:50] [Wiki+] 02_Wiki/4号房-我卖什么/信息卡/ 新增 4 张产品/销售卡（矩阵/价格/边界/SOP）- 由 石榴🐾
[13:30] [Skill+] 05_System/skills/ 6 个 skill 补 prompts/ - 由 石榴🐾
[13:00] [Wiki+] 02_Wiki/2号房-我会什么/信息卡/ 新增 5 张方法论卡（六间房/LLM Wiki/CLAUDE.md/阶梯/智囊团）- 由 石榴🐾
[12:30] [SOP+] 05_System/SOP/内容助手最佳实践.md - 由 石榴🐾
[12:30] [Output+] 04_Output/自媒体内容/公众号/草稿箱/ 系列①《3步教你搭建可调用的AI知识库》- 由 石榴🐾（蓉蓉子审过）
[12:00] [Lint] 03_Dashboard/2026-05-02_结构诊断_v2_行动清单.md 全 ob大脑诊断 - 由 石榴🐾
[11:30] [SOP+] 05_System/SOP/公众号文章入库最佳实践.md - 由 石榴🐾
[10:00] [Ingest] 01_Raw/公众号历史文章/ 一次性入库 154 篇（wechat_download 工具）- 由 蓉蓉子 + Claude Code
[09:00] [Tool+] 05_System/tools/wechat_download/ 公众号批量下载工具（Python）- 由 石榴🐾
```

---

## 操作类型说明

| 类型 | 含义 |
|---|---|
| `[Init]` | 系统级初始化（极少触发）|
| `[Ingest]` | 原始素材入 raw/ |
| `[Wiki+]` | wiki/ 新增信息卡 / 总览卡 |
| `[Wiki~]` | wiki/ 修改已有内容 |
| `[Wiki-]` | wiki/ 删除（极少，需注明理由）|
| `[Query]` | 用户向 wiki 提问 |
| `[Lint]` | 体检 / 诊断 / 整理 |
| `[Skill+]` | 新增/扩展 skill |
| `[SOP+]` | 新增最佳实践文档 |
| `[Tool+]` | 新增工具脚本 |
| `[Output+]` | 新增 04_Output 内容（公众号/小红书/课件等）|

---

## 维护规则（AI 必读）

```
1. 每次操作必须追加一行
2. 只追加，不修改历史行
3. 时间用本地时间 HH:mm（北京时间）
4. 操作描述简洁（1 行内）
5. 由谁做要标注（"石榴🐾" / "蓉蓉子" / "Claude Code" / "WorkBuddy"）
6. 月度 Lint 时压缩超过 30 天的旧记录到 06_Archive
```

---

## 用法示例

### 给 AI 的指令模板

```
你刚做了 X 操作，请：
1. 在 02_Wiki/log.md 文件末尾追加一行
2. 格式：[YYYY-MM-DD HH:mm] [类型] [描述] - 由 你的名字
3. 不要修改之前的行
4. 不要在文件其他地方写
```

### 给 Claude Code 的指令模板

```
请把刚才的操作记到 log.md：
- 时间：现在
- 类型：Wiki+
- 描述：[一句话]
- 由：Claude Code
```

---

*🐾 Append-only · 历史不可篡改 · 这是 Wiki 健康的脊梁*
