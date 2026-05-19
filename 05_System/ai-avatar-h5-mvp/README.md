# 蓉蓉子的 AI 私教团控制台 MVP

这是一个基于 ob 大脑的轻量 AI 私教团控制台 MVP，既可作为网页端工作台，也可作为 ClawBot 的微信消息后端。

## 能力范围

- 读取 `AGENTS.md` 和 `02_Wiki` 六间房 Markdown 作为知识库。
- 支持 H5 手机 / 电脑打开。
- 支持 5 个分身：小蜜、小李、石榴、小懂、小策。
- 支持通用 ClawBot webhook：`POST /api/clawbot`。
- 支持 MiniMax OpenAI 兼容接口。
- 可主动推荐 ¥999 咨询、¥1899 实操营、¥16800 私教陪跑。
- 未配置 API Key 时，会用本地预览答案，方便先看产品流程。

## 启动

```bash
cd /Users/rong/Desktop/ob大脑/05_System/ai-avatar-h5-mvp
MINIMAX_API_KEY=你的_key RONG_WECHAT_ID=你的微信号 node server.js
```

浏览器打开：

```text
http://localhost:8787
```

如果 8787 被占用，可以换端口：

```bash
PORT=8788 RONG_WECHAT_ID=你的微信号 node server.js
```

浏览器打开：

```text
http://localhost:8788
```

## ClawBot 接入

让 ClawBot 将微信文本消息转发到：

```text
POST http://127.0.0.1:8788/api/clawbot
```

请求体兼容以下字段之一：

```json
{
  "text": "小蜜，帮我写一条小红书开头"
}
```

也支持 `message`、`content`、`msg` 字段。接口返回：

```json
{
  "reply": "可直接回给微信的文本"
}
```

## 可选配置

也可以复制 `.env.example` 为 `.env` 后，用自己的方式加载环境变量。

```bash
MINIMAX_API_KEY=你的_minimax_api_key
MINIMAX_MODEL=MiniMax-M2.7
MINIMAX_BASE_URL=https://api.minimaxi.com/v1
RONG_WECHAT_ID=你的微信号
PORT=8787
```

## 第一版边界

- 不承诺自动变现、自动起号或保证收益。
- 不推荐 ¥199 模板。
- 复杂个案引导加微信由蓉蓉子人工判断。
- 当前检索是轻量关键词检索，适合 MVP；正式上线可升级为向量检索和后台管理。
