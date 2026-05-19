# OB大脑 Skills 索引

> 技能定义目录

## 目录结构

```
05_System/skills/
├── SKILL.md                 ← 本文件
├── 蓉蓉子的公众号创作助手   ← 公众号草稿生成（私用不对外）
├── article-gen/          ← 公众号草稿生成（学员版）
├── wechat-ingest/            ← 微信消息入库
├── xiaohongshu-gen/       ← 小红书图文生成
├── daily-brief/           ← 每日工作汇总
├── topic-generator/       ← 选题生成
└── content-gen/         ← 内容路由器
```

## Skills 清单（7个）

| Skill           | 功能     | 触发词        | 使用场景   | 备注  |
| --------------- | ------ | ---------- | ------ | --- |
| 蓉蓉子的公众号创作助手     | 公众号草稿  | "写公众号"[私用] | 需要写文章  | 私用  |
| article-gen     | 公众号草稿  | "写公众号"[学员] | 需要写文章  | 学员版 |
| wechat-ingest   | 微信消息入库 | "入库"       | 微信收到消息 |     |
| xiaohongshu-gen | 小红书图文  | "写小红书"     | 需要发小红书 |     |
| daily-brief     | 每日汇总   | "日报"       | 每天下午   |     |
| topic-generator | 选题生成   | "选题"       | 没选题时   |     |
| content-gen     | 内容路由   | 自动判断       | 收到内容   |     |

---

> **不需要单独做 Skill 的**：
> - CLAUDE.md 更新 → 每次对话直接让 AI 改
> - Lint 体检 → Day 7/14/20 手动执行

*更新于 2026-05-06*