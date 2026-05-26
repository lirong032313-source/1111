# 微信文章发布 · 主提示词（学员版）

> 调用：wechat-publisher skill 时将公众号文章发布到草稿箱

## 前置确认
- 文章已通过 article-gen 生成，内容已确认
- 用户有自己的微信公众号 AppID 和 AppSecret
- API 密钥存在于用户的环境中

## 执行步骤

### Step 1：格式转换
去掉 frontmatter，Markdown 转微信 HTML：
- `##` → `<h2>` / `###` → `<h3>`
- `**加粗**` → `<strong>`
- `> 引用` → `<blockquote>`
- `- 列表` → `<ul><li>`
- 段落 → `<p style="line-height:2;font-size:15px;color:#555">`

### Step 2：调微信API发草稿
- 获取 access_token
- 上传封面图（如有）
- POST /cgi-bin/draft/add

### Step 3：返回结果
```
✅ 已发布到公众号草稿箱
📌 请登录 mp.weixin.qq.com → 草稿箱 预览后手动发布
```
