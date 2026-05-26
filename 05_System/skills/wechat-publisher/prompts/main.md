# 微信文章发布 · 主提示词

> 调用：wechat-publisher skill 时将当前文章发布到公众号草稿箱

## 执行步骤

### Step 1：确认文章就绪
- 用户已确认文章内容无误，状态为 `status: draft`
- 获取文章全文 markdown 或文件路径

### Step 2：Markdown → 微信 HTML 格式转换

规则：
- 去掉 frontmatter（`---` 之间的内容）
- H1（`# `）→ 提取为标题，不在正文显示
- H2（`## `）→ `<h2>` 带行内样式
- H3（`### `）→ `<h3>` 带行内样式
- **加粗** → `<strong>`
- *斜体* → `<em>`
- `> 引用` → `<blockquote>` 带左边框样式
- `- 列表` → `<ul><li>`
- `---` → `<hr>`
- 段落 → `<p>` 带 `line-height:2` + `font-size:15px`

### Step 3：构造草稿

```json
{
  "title": "文章标题（微信限制64字节，中文字每个3字节，注意超限）",
  "author": "蓉蓉子",
  "content": "<转换后的HTML>",
  "digest": "摘要（建议54字以内）",
  "thumb_media_id": "封面图media_id（可选）",
  "need_open_comment": 1,
  "only_fans_can_comment": 0
}
```

### Step 4：调微信API发草稿
- 获取 access_token：`GET /cgi-bin/token?grant_type=client_credential&appid={appid}&secret={secret}`
- 上传封面图（如有）：`POST /cgi-bin/material/add_material?type=thumb`（multipart/form-data）
- 创建草稿：`POST /cgi-bin/draft/add`

### Step 5：返回结果

成功：
```
✅ 已发布到草稿箱
📝 标题：{文章标题}
📌 请登录 mp.weixin.qq.com → 草稿箱 预览并手动发布
```

失败：输出错误码和原因
