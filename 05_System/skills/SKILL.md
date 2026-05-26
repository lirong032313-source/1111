# OB大脑 Skills 索引

> 技能定义目录

## 目录结构

```
05_System/skills/
├── SKILL.md                 ← 本文件
├── 蓉蓉子的公众号创作助手   ← 公众号草稿生成（私用不对外）
├── article-gen/             ← 公众号草稿生成（学员版）
├── wechat-ingest/           ← 微信消息入库
├── wechat-publisher/        ← 公众号草稿发布
├── xiaohongshu-gen/         ← 小红书图文生成
├── xiaohongshu-publisher/   ← 小红书发布指引
├── daily-brief/             ← 每日工作汇总
├── topic-generator/         ← 选题生成
├── content-gen/             ← 内容路由器
├── digital-worker-content/  ← 🅐 内容数字员工
├── digital-worker-product/  ← 🅑 产品顾问数字员工
├── digital-worker-sales/    ← 🅒 销售教练数字员工
├── digital-worker-knowledge/← 🅓 知识库管理员数字员工
└── digital-worker-coach/    ← 🅔 个人教练数字员工
```

## Skills 清单（14个）

| Skill           | 功能     | 触发词        | 使用场景   | 备注  |
| --------------- | ------ | ---------- | ------ | --- |
| 蓉蓉子的公众号创作助手     | 公众号草稿  | "写公众号"[私用] | 需要写文章  | 私用  |
| article-gen     | 公众号草稿  | "写公众号"[学员] | 需要写文章  | 学员版 |
| wechat-ingest   | 微信消息入库 | "入库"       | 微信收到消息 |     |
| wechat-publisher| 公众号草稿发布 | "发布公众号"、"发到草稿箱" | 确认后发布 | 调微信API |
| xiaohongshu-gen | 小红书图文  | "写小红书"     | 需要发小红书 |     |
| xiaohongshu-publisher | 小红书发布指引 | "发布小红书" | 确认后发布 | 手动/浏览器 |
| daily-brief     | 每日汇总   | "日报"       | 每天下午   |     |
| topic-generator | 选题生成   | "选题"       | 没选题时   |     |
| content-gen     | 内容路由   | 自动判断       | 收到内容   |     |
| digital-worker-content | 🅐 内容数字员工 | "写公众号""改写" | 内容生产 | 主调3号房 |
| digital-worker-product | 🅑 产品顾问数字员工 | "设计产品""定价" | 产品设计 | 主调4号房 |
| digital-worker-sales | 🅒 销售教练数字员工 | "销售文案""帮我说" | 销售沟通 | 主调4+5号房 |
| digital-worker-knowledge | 🅓 知识库管理员 | "帮我归类""入库" | 知识整理 | 调全部房间 |
| digital-worker-coach | 🅔 个人教练 | "帮我分析""我纠结" | 决策支持 | 主调6号房 |

---

> **不需要单独做 Skill 的**：
> - CLAUDE.md 更新 → 每次对话直接让 AI 改
> - Lint 体检 → Day 7/14/20 手动执行

*更新于 2026-05-23（新增5大数字员工Skill：content/product/sales/knowledge/coach）*