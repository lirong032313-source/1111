# 微信文章发布 Skill

> 将公众号文章发布到草稿箱（通过微信官方 API）

## 触发词

- `发布公众号`
- `发到草稿箱`
- `微信发布`
- `草稿箱发布`

## 触发场景

当用户确认文章内容无误，需要发布到微信公众号草稿箱时调用

## 前置要求

1. 已完成公众号文章创作（通过 article-gen skill）
2. 用户已确认内容无误
3. 文章状态为 `status: draft`

## 输入

用户提供：
- 已生成的文章 markdown 内容
- 或本地文件路径

## 处理流程

### Step 1: 文章格式转换

将 Markdown 转换为微信支持的 HTML 格式：
- 处理 frontmatter（去掉）
- 转换标题层级（# → h1, ## → h2, ### → h3）
- 处理图片（检查是否支持微信格式）
- 保留加粗、斜体、引用等格式

### Step 2: 构造草稿 JSON

```json
{
  "title": "文章标题",
  "author": "蓉蓉子",
  "digest": "文章摘要（默认取前54字）",
  "content": "<html内容>",
  "thumb_media_id": "",  // 封面图，如不需要可不传
  "need_open_comment": 0,
  "only_fans_can_comment": 0
}
```

### Step 3: 调用微信 API 发布

使用 `wechat-article-publisher` skill 的 publish 命令发布到草稿箱

### Step 4: 返回结果

成功时返回：
```
✅ 已发布到草稿箱
📝 标题：{文章标题}
🔗 草稿链接：https://mp.weixin.qq.com/cgi-bin/draftlist?t=draft/list
请登录微信公众号后台确认并发布。
```

失败时返回错误信息和可能的原因

---

## 注意事项

- ⚠️ 草稿箱发布后仍需手动在微信后台确认并点击「发布」
- 图片建议使用公众号支持的格式（jpg/png/gif）
- 不支持外链图片，建议先上传到微信素材库

---

*Skill 定义 for 内容发布 · 2026-05-13*