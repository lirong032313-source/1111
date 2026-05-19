const messagesEl = document.querySelector("#messages");
const composer = document.querySelector("#composer");
const input = document.querySelector("#messageInput");
const statusEl = document.querySelector("#status");
const chunkCountEl = document.querySelector("#chunkCount");
const wechatEl = document.querySelector("#wechatId");
const copyWechat = document.querySelector("#copyWechat");
const agentButtons = [...document.querySelectorAll(".agent-card")];
const activeAgentEl = document.querySelector("#activeAgent");
const useExample = document.querySelector("#useExample");

const history = [];
let wechatId = "";
let activeAgent = agentButtons[0].dataset.agent;
let activeRole = agentButtons[0].dataset.role;

function addMessage(role, content, className = "") {
  const node = document.createElement("div");
  node.className = `message ${role} ${className}`.trim();
  node.textContent = content;
  messagesEl.appendChild(node);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return node;
}

function setLoading(isLoading) {
  composer.querySelector("button").disabled = isLoading;
  input.disabled = isLoading;
  useExample.disabled = isLoading;
}

function autosize() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
}

function switchAgent(button) {
  agentButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  activeAgent = button.dataset.agent;
  activeRole = button.dataset.role;
  activeAgentEl.textContent = `${activeAgent} · ${activeRole}`;
  input.placeholder = `对 ${activeAgent} 说：${button.dataset.prompt}`;
}

function buildAgentMessage(message) {
  return `【分身：${activeAgent}｜${activeRole}】\n${message}`;
}

async function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  addMessage("user", `${activeAgent}：${message}`);
  const apiMessage = buildAgentMessage(message);
  history.push({ role: "user", content: apiMessage });
  input.value = "";
  autosize();
  setLoading(true);

  const loading = addMessage("assistant", `${activeAgent} 正在调用 ob 大脑...`, "loading");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: apiMessage, history: history.slice(-6) }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "请求失败");
    loading.classList.remove("loading");
    loading.textContent = data.answer;
    history.push({ role: "assistant", content: data.answer });
  } catch (error) {
    loading.classList.remove("loading");
    loading.textContent = `我这边暂时没连上模型服务。\n\n你可以先检查 MINIMAX_API_KEY 是否配置正确，或者确认本地 Node 服务是否还在运行。\n\n错误信息：${error.message}`;
  } finally {
    setLoading(false);
    input.focus();
  }
}

agentButtons.forEach((button) => {
  button.addEventListener("click", () => switchAgent(button));
});

useExample.addEventListener("click", () => {
  const button = agentButtons.find((item) => item.dataset.agent === activeAgent);
  input.value = button?.dataset.prompt || "";
  autosize();
  input.focus();
});

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("input", autosize);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    composer.requestSubmit();
  }
});

copyWechat.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(wechatId);
    copyWechat.textContent = "已复制";
    setTimeout(() => {
      copyWechat.textContent = "复制微信号";
    }, 1400);
  } catch {
    copyWechat.textContent = "请手动复制";
  }
});

async function init() {
  addMessage(
    "assistant",
    "你好呀，这里是蓉蓉子的 AI 私教团控制台。\n\n你可以先在上方选择分身：小蜜写内容，小李做咨询报告，石榴管提醒，小懂管交付，小策管产品。\n\n第一版建议你先从小蜜和石榴开始跑，每天让系统真的替你省下一点时间。"
  );

  try {
    const [config, health] = await Promise.all([
      fetch("/api/config").then((res) => res.json()),
      fetch("/api/health").then((res) => res.json()),
    ]);
    wechatId = config.wechatId || "";
    wechatEl.textContent = wechatId;
    statusEl.textContent = health.hasApiKey ? "MiniMax 已连接" : "本地预览";
    chunkCountEl.textContent = `${health.chunks || 0} 个知识片段`;
  } catch {
    statusEl.textContent = "连接异常";
    chunkCountEl.textContent = "请刷新重试";
    wechatEl.textContent = "请稍后刷新";
  }
}

switchAgent(agentButtons[0]);
init();
