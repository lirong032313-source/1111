const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = path.resolve(__dirname, "../..");
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const MODEL = process.env.MINIMAX_MODEL || "MiniMax-M2.7";
const BASE_URL = (process.env.MINIMAX_BASE_URL || "https://api.minimaxi.com/v1").replace(/\/$/, "");
const API_KEY = process.env.MINIMAX_API_KEY || "";
const WECHAT_ID = process.env.RONG_WECHAT_ID || "请在环境变量 RONG_WECHAT_ID 中配置";

const knowledgePaths = [
  "AGENTS.md",
  "index.md",
  "02_Wiki/1号房-我是谁",
  "02_Wiki/2号房-我会什么",
  "02_Wiki/3号房-我说过什么/信息卡",
  "02_Wiki/3号房-我说过什么/金句库",
  "02_Wiki/3号房-我说过什么/风格采样",
  "02_Wiki/4号房-我卖什么",
  "02_Wiki/5号房-我面对谁",
  "02_Wiki/6号房-我怎么想",
  "02_Wiki/案例库",
  "05_System/agents",
];

const systemPrompt = `
你是“蓉蓉子的AI私教团控制台”，既能作为线上服务前台答疑，也能根据用户选择的分身完成内部工作辅助。

你的核心任务：
1. 用温暖、有能量、专业但不说教的方式回应用户。
2. 基于 ob大脑知识库回答，不确定就说“不确定，需要蓉蓉子本人确认”。
3. 如果用户消息中包含【分身：xxx】，优先按对应分身职责回答。
4. 主动识别用户处境：知识库焦虑、产品迷失、主副业拉扯、AI工具困惑、内容创作卡住、实操营学习卡点。
5. 给出清晰下一步，不制造焦虑，不承诺自动变现、自动起号或保证收益。
6. 可以主动推荐产品，但要克制、真诚、按适配度推荐。

五个内部 AI 分身：
- 小蜜：内容助手，负责公众号、小红书、选题、标题、金句提炼。优先调用 3号房、5号房、1号房、6号房。
- 小李：咨询分身，负责咨询诊断、飞书报告、HTML 图片版报告、用户路径建议。优先调用 5号房、2号房、4号房、案例库。
- 石榴：工作助理，负责微信提醒、待办、日报周报、入库协调。只提醒和建议，不擅自替用户改日程或回复他人。
- 小懂：交付助手，负责私教学员交付跟进、行动项、风险提醒、交付复盘。注意隐私保护。
- 小策：产品教练，负责产品细节优化、产品实验、SOP 打磨、可复制模板沉淀。

内部工作边界：
- 对外发布内容必须经过蓉蓉子确认。
- 涉及学员隐私时，不泄露聊天记录、个人信息和案例细节。
- 定时提醒可以生成提醒方案，但真正的微信定时推送需要后端任务服务或 ClawBot 定时能力配合。
- 飞书文档和 HTML 图片报告可以输出结构、正文和文件生成建议；真正创建飞书文档需要飞书 API 权限。

当前产品推荐规则：
- 不推荐 ¥199 模板，它已从前台推荐中移除。
- 知识库/产品线梳理咨询：¥999，适合“有很多想法但不知道先做哪个”“想先被梳理一次”的人。
- 21天 IP 六间房 AI 实操营：¥1899，适合想系统跑通知识库、AI调用、内容输出闭环的人。
- 3个月私教陪跑：¥16800，适合已有专业能力、想搭定制知识库/专属智能体/数字产品体系的人，需要人工审核。
- 如果用户情况复杂，优先引导加微信做人工判断。

当前对外口径锁定：
- 只允许推荐 ¥999 咨询、¥1899 实操营、¥16800 私教陪跑。
- 不要提 ¥199、¥599、¥799、¥1599、早鸟价、终价、动态稀缺、14天实操营等历史口径。
- 如果知识库资料中出现旧价格或旧周期，以本段“当前对外口径锁定”为准。

回答结构建议：
- 先接住用户的真实处境。
- 再给判断和拆解。
- 给 2-4 条可执行建议。
- 最后给轻量引导：加微信 / 预约咨询 / 选择合适服务。

表达习惯：
- 可以使用“💡”“👉”“一起”“我们”“陪你”等表达。
- 不要使用高压销售、限时限量、最后机会。
- 不泄露学员隐私，不编造案例细节。
`.trim();

function readMarkdownFiles(targetPath) {
  const absolute = path.join(ROOT, targetPath);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    if (!absolute.endsWith(".md")) return [];
    return [{ file: targetPath, text: fs.readFileSync(absolute, "utf8") }];
  }
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(targetPath, entry.name);
    if (entry.isDirectory()) return readMarkdownFiles(child);
    if (!entry.name.endsWith(".md")) return [];
    return [{ file: child, text: fs.readFileSync(path.join(ROOT, child), "utf8") }];
  });
}

function toChunks(doc) {
  const cleaned = doc.text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n");
  const sections = cleaned.split(/\n(?=#{1,3}\s+)/g);
  return sections
    .map((section, index) => ({
      file: doc.file,
      id: `${doc.file}#${index + 1}`,
      text: section.trim().slice(0, 2600),
    }))
    .filter((chunk) => chunk.text.length > 80);
}

const chunks = knowledgePaths.flatMap(readMarkdownFiles).flatMap(toChunks);

function tokenize(text) {
  const ascii = (text.toLowerCase().match(/[a-z0-9_]{2,}/g) || []);
  const cjk = (text.match(/[\u4e00-\u9fa5]{2,}/g) || []).flatMap((word) => {
    const tokens = [word];
    for (let i = 0; i < word.length - 1; i += 1) tokens.push(word.slice(i, i + 2));
    return tokens;
  });
  return [...ascii, ...cjk];
}

function retrieve(question, limit = 7) {
  const queryTokens = tokenize(question);
  const querySet = new Set(queryTokens);
  const ranked = chunks
    .map((chunk) => {
      const text = `${chunk.file}\n${chunk.text}`;
      let score = 0;
      for (const token of querySet) {
        if (text.includes(token)) score += token.length > 2 ? 2 : 1;
      }
      if (/产品|价格|服务|咨询|实操营|私教|报名|加微/.test(question) && chunk.file.includes("4号房")) score += 8;
      if (/适合|痛点|用户|客户|学员|我这种/.test(question) && chunk.file.includes("5号房")) score += 7;
      if (/风格|文案|内容|公众号|小红书/.test(question) && chunk.file.includes("3号房")) score += 7;
      if (/知识库|六间房|AI|智能体|分身|工具/.test(question) && chunk.file.includes("2号房")) score += 7;
      if (/主业|副业|裸辞|人生|选择|低谷/.test(question) && chunk.file.includes("6号房")) score += 6;
      return { ...chunk, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
  const seenText = new Set();
  const results = [];
  for (const item of ranked) {
    const fingerprint = `${item.file}:${item.text.slice(0, 120)}`;
    if (seenText.has(fingerprint)) continue;
    seenText.add(fingerprint);
    results.push(item);
    if (results.length >= limit) break;
  }
  return results;
}

function buildContext(docs) {
  return docs
    .map((doc, index) => `【资料${index + 1}｜${doc.file}】\n${doc.text}`)
    .join("\n\n---\n\n");
}

function stripReasoning(content) {
  return String(content || "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .trim();
}

async function callMiniMax(messages) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.45,
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MiniMax ${response.status}: ${body.slice(0, 500)}`);
  }

  const data = await response.json();
  return stripReasoning(data.choices?.[0]?.message?.content || "");
}

function localDraft(question, docs) {
  const sourceLines = docs.map((doc) => `- ${doc.file}`).slice(0, 4).join("\n");
  return `💡我先接住你的问题：你问的是“${question}”。\n\n从蓉蓉子的 ob 大脑来看，这类问题通常会落在两个方向：一是你现在的知识、经验和内容有没有形成可调用的结构；二是它能不能进一步变成一个小而美的产品或服务。\n\n👉 第一版建议你先做一个最小判断：\n1. 你现在最常被别人问的问题是什么？\n2. 你有没有一套稳定的方法，而不只是零散经验？\n3. 你希望 AI 分身先帮你做答疑、内容生产，还是产品转化？\n\n如果你是想系统跑通“知识库搭建 + AI 调用 + 内容输出”的闭环，更适合看 21 天 IP 六间房 AI 实操营；如果你已经有很多素材但不知道怎么产品化，更适合先做 ¥999 的知识库/产品线梳理咨询；如果你想直接定制自己的知识库、智能体和数字产品体系，可以加微信让蓉蓉子判断是否适合私教陪跑。\n\n当前是本地预览回答，配置 MINIMAX_API_KEY 后会调用 MiniMax-M2.7 生成更完整的知识库回答。\n\n参考资料：\n${sourceLines || "- 暂未命中资料"}`;
}

async function answerQuestion(question, history = []) {
  const docs = retrieve(question);
  const context = buildContext(docs);
  let answer;
  if (API_KEY) {
    answer = await callMiniMax([
      { role: "system", content: systemPrompt },
      ...history.map((item) => ({
        role: item.role === "assistant" ? "assistant" : "user",
        content: String(item.content || "").slice(0, 1200),
      })),
      {
        role: "user",
        content: `用户问题：${question}\n\n当前对外口径再次确认：只推荐 ¥999 咨询、¥1899 实操营、¥16800 私教陪跑；不要提 ¥199、¥599、¥799、¥1599、早鸟价、终价、动态稀缺、14天实操营等历史口径。\n\n请基于以下知识库资料回答，并在结尾用“参考资料”列出命中的文件名。若资料不足，请说明不确定并建议加微信人工确认。\n\n${context}`,
      },
    ]);
  } else {
    answer = localDraft(question, docs);
  }
  return {
    answer,
    sources: Array.from(new Map(docs.map((doc) => [doc.file, { file: doc.file, score: doc.score }])).values()),
  };
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath);
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
  };
  res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      model: MODEL,
      hasApiKey: Boolean(API_KEY),
      chunks: chunks.length,
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/config") {
    sendJson(res, 200, { wechatId: WECHAT_ID, hasApiKey: Boolean(API_KEY) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/chat") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) req.destroy();
    });
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const question = String(payload.message || "").trim();
        const history = Array.isArray(payload.history) ? payload.history.slice(-6) : [];
        if (!question) {
          sendJson(res, 400, { error: "请输入问题" });
          return;
        }
        sendJson(res, 200, await answerQuestion(question, history));
      } catch (error) {
        sendJson(res, 500, { error: error.message || "服务异常" });
      }
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/clawbot") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) req.destroy();
    });
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const rawText = payload.message || payload.text || payload.content || payload.msg || "";
        const question = String(rawText).trim();
        if (!question) {
          sendJson(res, 400, { error: "ClawBot 消息为空" });
          return;
        }
        const result = await answerQuestion(question);
        sendJson(res, 200, {
          reply: result.answer,
          answer: result.answer,
          sources: result.sources,
        });
      } catch (error) {
        sendJson(res, 500, { error: error.message || "ClawBot 服务异常" });
      }
    });
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`AI avatar MVP running at http://${HOST}:${PORT}`);
  console.log(`Knowledge chunks: ${chunks.length}`);
  console.log(`MiniMax API key: ${API_KEY ? "configured" : "not configured, using local preview"}`);
});
