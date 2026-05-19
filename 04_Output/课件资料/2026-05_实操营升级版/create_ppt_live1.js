const pptxgen = require("pptxgenjs");

// =============================================
// 赛博霓虹风格配色方案
// =============================================
const C = {
  bg: "0A0E27",
  bgLight: "141B3D",
  primary: "00D4FF",
  secondary: "FF2D95",
  accent: "A855F7",
  white: "FFFFFF",
  gray: "94A3B8",
  grayDark: "64748B",
  green: "34D399",
  orange: "FB923C",
  cardBg: "1A2245",
};

function glow(color, blur, opacity) {
  blur = blur || 4; opacity = opacity || 0.35;
  return { type: 'outer', color: color, blur: blur, offset: 0, angle: 0, opacity: opacity };
}
function makeShadow() {
  return { type: 'outer', color: '000000', blur: 8, offset: 3, angle: 135, opacity: 0.25 };
}
function addSectionTitle(slide, presObj, text) {
  slide.addText(text, {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 24, bold: true, color: 'FFFFFF',
    fontFace: 'Microsoft YaHei', align: 'left', valign: 'middle'
  });
  slide.addShape(presObj.shapes.RECTANGLE, {
    x: 0.5, y: 0.97, w: 2.5, h: 0.045,
    fill: { color: C.primary }
  });
}

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = '蓉蓉子';
pres.title = '直播1 | 领养你的AI大脑';

// ========== Slide 1: 封面 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.secondary } });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.2, y: 0.35, w: 2.4, h: 0.45,
    fill: { color: C.cardBg }, line: { color: C.accent, width: 1 }, rectRadius: 0.08
  });
  s.addText('5月「LLM Wiki × 六间房」AI 实操营', {
    x: 7.2, y: 0.35, w: 2.4, h: 0.45, fontSize: 9, color: C.accent, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei'
  });

  s.addText('领养你的 AI 大脑', {
    x: 0.5, y: 1.6, w: 9, h: 1.0,
    fontSize: 44, bold: true, color: C.white, align: 'center',
    fontFace: 'Microsoft YaHei', shadow: glow(C.primary, 6, 0.4)
  });

  s.addText('认知升级 + 三层架构 + 跑通 MVP', {
    x: 0.5, y: 2.65, w: 9, h: 0.55, fontSize: 22, color: C.primary, align: 'center', fontFace: 'Microsoft YaHei'
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.35, w: 3, h: 0.03, fill: { color: C.secondary } });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.8, y: 3.65, w: 6.4, h: 1.15,
    fill: { color: C.cardBg }, rectRadius: 0.12, shadow: makeShadow()
  });
  s.addText([
    { text: '🎯 90分钟结束后，你拥有一个能跑的 MVP\n', options: { fontSize: 14 } },
    { text: '三层知识库骨架 · CLAUDE.md v1 · Ingest+Query跑通 · 学习搭子', options: { fontSize: 12, color: C.gray } }
  ], { x: 1.8, y: 3.65, w: 6.4, h: 1.15, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei', color: C.white });

  s.addText('蓉蓉子 × 石榴🐾', {
    x: 0.5, y: 5.05, w: 9, h: 0.35, fontSize: 12, color: C.grayDark, align: 'center', fontFace: 'Microsoft YaHei'
  });
})();

// ========== Slide 2: 痛点 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '你是不是也踩过这些坑？');

  var pains = [
    { emoji: '😫', text: 'Notion / 飞书 / Obsidian 都试过\n没有一个坚持用下来' },
    { emoji: '📚', text: '收藏了几百篇好文章\n写东西时还是从零开始' },
    { emoji: '🤖', text: '用 ChatGPT / Claude\n回答总像在敷衍——「对，但跟我没关系」' },
    { emoji: '🔄', text: '试过几次「建知识库」\n都半途而废了' },
  ];

  var startY = 1.45;
  var cardH = 0.9;

  for (var i = 0; i < pains.length; i++) {
    var cy = startY + i * (cardH + 0.07);
    var p = pains[i];
    var barColor = (i % 2 === 0) ? C.secondary : C.accent;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: cy, w: 8.8, h: cardH,
      fill: { color: C.cardBg }, rectRadius: 0.1, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: cy, w: 0.06, h: cardH, fill: { color: barColor } });
    s.addText(p.emoji, { x: 0.85, y: cy, w: 0.7, h: cardH, fontSize: 26, valign: 'middle', align: 'center' });
    s.addText(p.text, { x: 1.6, y: cy, w: 7.5, h: cardH, fontSize: 15, color: C.white, valign: 'middle', fontFace: 'Microsoft YaHei' });
  }

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.85, w: 8.8, h: 0.58,
    fill: { color: C.bgLight }, line: { color: C.primary, width: 1.5 },
    rectRadius: 0.1, shadow: glow(C.primary, 4, 0.2)
  });
  s.addText([
    { text: '中了 2 条以上？你不是不努力，你是 ', options: { color: C.gray, fontSize: 13 } },
    { text: '用错了范式', options: { color: C.secondary, bold: true, fontSize: 14 } },
    { text: ' → 这门课就是来帮你换范式的', options: { color: C.gray, fontSize: 13 } }
  ], { x: 0.6, y: 4.85, w: 8.8, h: 0.58, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
})();

// ========== Slide 3: 痛点×期待匹配表 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '每一分钟都对应一个真实痛点');

  var headers = ['🔴 你的真实痛点', '🟢 这堂课给你的解法', '✨ 上完之后'];
  var rows = [
    ['知识散落各处\n找不到、用不上', '三层目录结构\n(Raw→Wiki→Schema)', '所有素材有去处\nAI帮你归位'],
    ['AI 写的东西不像你\n没有灵魂', 'CLAUDE.md = \n你和 AI 的「风格契约」', 'AI 输出带着\n你的语气和味道'],
    ['不知道该喂什么给 AI', '六间房框架 =\n「装什么」的导航图', '每条素材自动\n找到自己的房间'],
    ['搭了知识库但 AI\n还是答非所问', 'LLM Wiki 范式 =\n摄入时编译', '一次喂养\n持续复利'],
    ['怕学不会\n怕搭了又废掉', '直播现场同步操作\n+ 搭子互助', '当晚就跑通\nIngest + Query'],
    ['一个人坚持不下来', '搭子配对机制\n(详见后文)', '每周互打卡\n有人陪你走完全程'],
  ];
  var colW = [3.1, 3.2, 2.9];
  var tableX = 0.55, headerY = 1.25, rowH = 0.64;

  for (var ci = 0; ci < 3; ci++) {
    var hx = tableX + ci * 3.1;
    var hc = [C.secondary, C.green, C.accent][ci];
    s.addShape(pres.shapes.RECTANGLE, { x: hx, y: headerY, w: colW[ci], h: rowH, fill: { color: hc } });
    s.addText(headers[ci], { x: hx, y: headerY, w: colW[ci], h: rowH, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  }

  for (var ri = 0; ri < rows.length; ri++) {
    var cy = headerY + (ri + 1) * rowH;
    var bgCol = (ri % 2 === 0) ? C.cardBg : C.bgLight;
    for (var ci = 0; ci < 3; ci++) {
      var cx = tableX + ci * 3.1;
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: colW[ci], h: rowH, fill: { color: bgCol }, line: { color: C.bgLight, width: 0.5 } });
      var tc = (ci === 1) ? C.green : ((ci === 2) ? C.accent : C.white);
      s.addText(rows[ri][ci], { x: cx + 0.1, y: cy, w: colW[ci] - 0.2, h: rowH, fontSize: 10.5, color: tc, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
    }
  }
})();

// ========== Slide 4: 核心交付承诺 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '90 分钟结束后，你拥有的是——');

  var items = [
    { icon: '🎁', title: '三层目录已搭建好', desc: '的知识库骨架' },
    { icon: '🎁', title: '一份 CLAUDE.md v1', desc: '你和 AI 的契约' },
    { icon: '🎁', title: '第一张手写信息卡', desc: '「我是谁」地基卡' },
    { icon: '🎁', title: '第一次跑通 Ingest', desc: '原始素材 → AI 整理' },
    { icon: '🎁', title: '第一次跑通 Query', desc: '你提问 → AI 回答' },
    { icon: '🎁', title: '一个学习搭子', desc: '陪你走 21 天' },
  ];
  var cols = 3, cardW = 2.85, cardH = 1.55, gapX = 0.28, gapY = 0.25;
  var startX = (10 - (cols * cardW + (cols - 1) * gapX)) / 2, startY = 1.35;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var col = i % cols, row = Math.floor(i / cols);
    var cx = startX + col * (cardW + gapX), cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH, fill: { color: C.cardBg }, rectRadius: 0.12, shadow: makeShadow(), line: { color: C.primary, width: 0.8, transparency: 60 } });
    s.addText(item.icon, { x: cx, y: cy + 0.12, w: cardW, h: 0.55, fontSize: 30, align: 'center', valign: 'middle' });
    s.addText(item.title, { x: cx + 0.15, y: cy + 0.68, w: cardW - 0.3, h: 0.42, fontSize: 14, bold: true, color: C.primary, align: 'center', fontFace: 'Microsoft YaHei' });
    s.addText(item.desc, { x: cx + 0.15, y: cy + 1.05, w: cardW - 0.3, h: 0.38, fontSize: 11, color: C.gray, align: 'center', fontFace: 'Microsoft YaHei' });
  }
})();

// ========== Slide 5: 为什么以前搭不起来？ ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '为什么以前的知识库搭不起来？');

  // 左侧旧范式
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.35, w: 4.3, h: 2.2, fill: { color: C.cardBg }, rectRadius: 0.12 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.35, w: 4.3, h: 0.48, fill: { color: C.orange }, rectRadius: 0.12 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.71, w: 4.3, h: 0.18, fill: { color: C.cardBg } });
  s.addText('❌ 旧范式：资料堆积', { x: 0.5, y: 1.35, w: 4.3, h: 0.48, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  s.addText([
    { text: '• 收藏了一堆文章 PDF\n', options: { bullet: true } },
    { text: '• 分了文件夹但从来不看\n', options: { bullet: true } },
    { text: '• AI 每次临时去翻找\n', options: { bullet: true } },
    { text: '• 知识之间没有关联', options: { bullet: true } }
  ], { x: 0.7, y: 1.92, w: 3.9, h: 1.5, fontSize: 12, color: C.gray, fontFace: 'Microsoft YaHei', valign: 'top' });

  // 右侧新范式
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 1.35, w: 4.3, h: 2.2, fill: { color: C.cardBg }, rectRadius: 0.12 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.3, h: 0.48, fill: { color: C.green }, rectRadius: 0.12 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.71, w: 4.3, h: 0.18, fill: { color: C.cardBg } });
  s.addText('✅ 新范式：让 AI 读懂你的大脑', { x: 5.2, y: 1.35, w: 4.3, h: 0.48, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  s.addText([
    { text: '• 素材摄入时就被 AI 编译\n', options: { bullet: true } },
    { text: '• 知识之间自动建立关联\n', options: { bullet: true } },
    { text: '• AI 持续维护你的 Wiki\n', options: { bullet: true } },
    { text: '• 一次喂养，复利增长', options: { bullet: true } }
  ], { x: 5.4, y: 1.92, w: 3.9, h: 1.5, fontSize: 12, color: C.gray, fontFace: 'Microsoft YaHei', valign: 'top' });

  s.addText('→', { x: 4.55, y: 2.2, w: 0.9, h: 0.6, fontSize: 36, color: C.primary, align: 'center', valign: 'middle', bold: true });

  // Karpathy 引用框
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.75, w: 9, h: 1.55,
    fill: { color: C.bgLight }, line: { color: C.accent, width: 1.5 },
    rectRadius: 0.12, shadow: glow(C.accent, 4, 0.15)
  });
  s.addText('OpenAI 前研究负责人 Andrej Karpathy 提出 LLM Wiki 范式：', {
    x: 0.75, y: 3.88, w: 8.5, h: 0.35, fontSize: 11, color: C.accent, fontFace: 'Microsoft YaHei'
  });
  s.addText([
    { text: '传统 RAG 是', options: { color: C.gray, fontSize: 13 } },
    { text: '「每次让 AI 临时去图书馆翻书」', options: { color: C.orange, fontSize: 14, italic: true } },
    { text: '\n', options: {} },
    { text: 'LLM Wiki 是', options: { color: C.gray, fontSize: 13 } },
    { text: '「你雇了一个私人图书管理员，他每天帮你整理书架」', options: { color: C.green, fontSize: 14, italic: true } }
  ], { x: 0.75, y: 4.28, w: 8.5, h: 0.95, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
})();

// ========== Slide 6: 三层架构 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '三层架构 × 六间房联动（核心认知）');

  var layerColors = [C.accent, C.primary, C.green];
  var layerTitles = ['Schema 层（规则/契约）', 'Wiki 层（六间房）', 'Raw Sources 层'];
  var layerSubs = ['← 你和 AI 共同维护', '← AI 写、你读 + 纠错', '← 你写、AI 只读'];
  var layerContents = [
    'CLAUDE.md · 写作风格 · 边界 · 母题\n→ 告诉 AI 「怎么像你」',
    '01我是谁 02我会什么 03我说过什么\n04我卖什么 05我面对谁 06我怎么想\n→ AI 自动维护的信息卡',
    '文章 / 对话记录 / 灵感碎片 / 课件 PDF\n→ 你的原始档案，不可变'
  ];
  var layerIcons = ['📐', '📚', '📥'];
  var boxW = 8.8, boxX = 0.6, startY = 1.25, layerH = 1.32;

  for (var i = 0; i < 3; i++) {
    var cy = startY + i * (layerH + 0.12);
    var isMiddle = (i === 1);

    if (isMiddle) {
      s.addShape(pres.shapes.RECTANGLE, { x: boxX, y: cy, w: boxW, h: layerH, fill: { color: C.cardBg }, line: { color: layerColors[i], width: 2 }, shadow: glow(layerColors[i], 4, 0.12) });
    } else {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: boxX, y: cy, w: boxW, h: layerH, fill: { color: C.cardBg }, rectRadius: 0.1, line: { color: layerColors[i], width: 1.5 }, shadow: glow(layerColors[i], 4, 0.12) });
    }
    s.addShape(pres.shapes.RECTANGLE, { x: boxX, y: cy, w: 0.08, h: layerH, fill: { color: layerColors[i] } });
    s.addText(layerIcons[i] + '  ' + layerTitles[i], { x: boxX + 0.2, y: cy + 0.08, w: 7, h: 0.38, fontSize: 14, bold: true, color: layerColors[i], fontFace: 'Microsoft YaHei' });
    s.addText(layerSubs[i], { x: boxX + 5.5, y: cy + 0.1, w: 3.2, h: 0.34, fontSize: 9.5, color: C.grayDark, align: 'right', fontFace: 'Microsoft YaHei' });
    s.addText(layerContents[i], { x: boxX + 0.25, y: cy + 0.5, w: 8.3, h: 0.75, fontSize: 11.5, color: C.white, fontFace: 'Microsoft YaHei', valign: 'top' });
  }

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.0, w: 8.8, h: 0.46, fill: { color: C.bgLight }, rectRadius: 0.08 });
  s.addText('💡 金句：「六间房解决「装什么」，LLM Wiki 解决「怎么活」。CLAUDE.md 是契约。」', {
    x: 0.6, y: 5.0, w: 8.8, h: 0.46, fontSize: 11.5, color: C.secondary, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei'
  });
})();

// ========== Slide 7: RAG vs LLM Wiki 对比 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, 'RAG vs LLM Wiki —— 一张表看懂区别');

  var tHeaders = ['维度', '传统 RAG（你现在的用法）', 'LLM Wiki（这堂课教的）'];
  var tRows = [
    ['知识处理时机', '查询时处理（每次重复算）', '摄入时处理（一次性编译）'],
    ['交叉引用', '临时发现', '预先构建并持续维护'],
    ['矛盾检测', '容易被忽略', '摄入时主动标记'],
    ['知识积累', '无——每次从头开始', '复利增长'],
    ['一句话类比', '每次去图书馆翻书', '有一个私人图书管理员'],
  ];
  var colW = [2.2, 3.4, 3.4], tableX = 0.55, headerY = 1.25, rowH = 0.72;

  for (var ci = 0; ci < 3; ci++) {
    var hx = (ci === 0) ? tableX : ((ci === 1) ? tableX + 2.2 : tableX + 5.6);
    var hc = (ci === 0) ? C.grayDark : ((ci === 1) ? C.orange : C.green);
    s.addShape(pres.shapes.RECTANGLE, { x: hx, y: headerY, w: colW[ci], h: rowH, fill: { color: hc } });
    s.addText(tHeaders[ci], { x: hx, y: headerY, w: colW[ci], h: rowH, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  }

  for (var ri = 0; ri < tRows.length; ri++) {
    var cy = headerY + (ri + 1) * rowH;
    var bgCol = (ri % 2 === 0) ? C.cardBg : C.bgLight;
    for (var ci = 0; ci < 3; ci++) {
      var cx = (ci === 0) ? tableX : ((ci === 1) ? tableX + 2.2 : tableX + 5.6);
      s.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: colW[ci], h: rowH, fill: { color: bgCol }, line: { color: C.bgLight, width: 0.5 } });
      var tc = (ci === 1) ? C.orange : ((ci === 2) ? C.green : C.white);
      s.addText(tRows[ri][ci], { x: cx + 0.12, y: cy, w: colW[ci] - 0.24, h: rowH, fontSize: 10.5, color: tc, valign: 'middle', fontFace: 'Microsoft YaHei', ...(ci === 0 ? { bold: true } : {}) });
    }
  }
})();

// ========== Slide 8: 直播现场流程 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '直播现场我们具体做什么？（90-120 min）');

  var parts = [
    { time: '5 min', label: 'Part 0 开场', color: C.grayDark, items: ['主播介绍 + 学员破冰', '21天愿景'] },
    { time: '25 min', label: 'Part 1 认知升级', color: C.secondary, items: ['痛点共鸣 + Karpathy LLM Wiki', '三层架构 × 六间房联动', '三个常见误区避坑'] },
    { time: '35 min', label: 'Part 2 现场搭建 ⭐', color: C.primary, items: ['建三层目录（屏幕共享带做）', 'CLAUDE.md 初版（大脑芯片）', '⭐ 手写vsAI分工法则'] },
    { time: '25 min', label: 'Part 3 跑通 MVP', color: C.green, items: ['手写01_我是谁 信息卡', '第一次 Ingest + Query', '验证 AI 真的懂你了'] },
    { time: '10 min', label: 'Part 4 Q&A+搭子', color: C.accent, items: ['Day1-7 任务清单发布', '搭子配对名单公布', '高频Q&A解答'] },
  ];

  var cardW = 1.78, cardH = 3.35, gap = 0.12;
  var totalW = parts.length * cardW + (parts.length - 1) * gap;
  var startX = (10 - totalW) / 2, startY = 1.25;

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    var cx = startX + i * (cardW + gap);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: startY, w: cardW, h: cardH, fill: { color: C.cardBg }, rectRadius: 0.1, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: startY, w: cardW, h: 0.44, fill: { color: p.color } });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: startY + 0.38, w: cardW, h: 0.12, fill: { color: C.cardBg } });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + (cardW - 0.8) / 2, y: startY + 0.56, w: 0.8, h: 0.3,
      fill: { color: p.color }, rectRadius: 0.06
    });
    s.addText(p.time, { x: cx + (cardW - 0.8) / 2, y: startY + 0.56, w: 0.8, h: 0.3, fontSize: 9, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
    s.addText(p.label, { x: cx + 0.08, y: startY + 0.95, w: cardW - 0.16, h: 0.4, fontSize: 11, bold: true, color: p.color, align: 'center', fontFace: 'Microsoft YaHei' });

    for (var ii = 0; ii < p.items.length; ii++) {
      s.addText(p.items[ii], { x: cx + 0.1, y: startY + 1.4 + ii * 0.62, w: cardW - 0.2, h: 0.58, fontSize: 9.5, color: C.white, fontFace: 'Microsoft YaHei', valign: 'top', bullet: { type: 'bullet', color: p.color } });
    }
  }

  s.addText('屏幕共享同步实操 → 当晚就有能跑的 MVP 🚀', {
    x: 0.5, y: 4.82, w: 9, h: 0.4, fontSize: 12, color: C.primary, align: 'center', fontFace: 'Microsoft YaHei', italic: true
  });
})();

// ========== Slide 9: 搭子组合机制 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '搭子组合机制 —— 为什么需要搭子？');

  // 一个人的路
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.45, y: 1.25, w: 4.4, h: 2.35, fill: { color: C.cardBg }, rectRadius: 0.1 });
  s.addText('❌ 一个人的路', { x: 0.45, y: 1.25, w: 4.4, h: 0.4, fontSize: 13, bold: true, color: C.orange, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  var soloPath = [
    { day: 'Day 1', emoji: '🎉', text: '兴奋搭建' },
    { day: 'Day 3', emoji: '😵', text: '遇到卡点' },
    { day: 'Day 7', emoji: '😴', text: '「明天再说」' },
    { day: 'Day 14', emoji: '🪦', text: '废弃文件夹' },
  ];
  for (var i = 0; i < soloPath.length; i++) {
    s.addText(' ' + soloPath[i].day + '   ' + soloPath[i].emoji + '  ' + soloPath[i].text, {
      x: 0.65, y: 1.72 + i * 0.43, w: 4, h: 0.4, fontSize: 11, color: C.gray, fontFace: 'Microsoft YaHei', valign: 'middle'
    });
  }

  // 有搭子的路
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.25, w: 4.4, h: 2.35, fill: { color: C.cardBg }, rectRadius: 0.1, line: { color: C.green, width: 1.5 } });
  s.addText('✅ 有搭子的路', { x: 5.15, y: 1.25, w: 4.4, h: 0.4, fontSize: 13, bold: true, color: C.green, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });
  var duoPath = [
    { day: 'Day 1', emoji: '🎉', text: '一起搭建' },
    { day: 'Day 3', emoji: '🤝', text: '互相解决卡点' },
    { day: 'Day 7', emoji: '⏰', text: '搭子催你打卡' },
    { day: 'Day 14', emoji: '🚀', text: '两人都有 MVP' },
  ];
  for (var i = 0; i < duoPath.length; i++) {
    s.addText(' ' + duoPath[i].day + '   ' + duoPath[i].emoji + '  ' + duoPath[i].text, {
      x: 5.35, y: 1.72 + i * 0.43, w: 4, h: 0.4, fontSize: 11, color: C.white, fontFace: 'Microsoft YaHei', valign: 'middle'
    });
  }

  s.addText('VS', { x: 4.55, y: 2.1, w: 0.9, h: 0.5, fontSize: 16, bold: true, color: C.accent, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });

  // 底部三列
  var bottomCards = [
    { title: '怎么配？', color: C.primary, lines: ['强弱混搭（技术+小白互补）', '2-3人一组，保持高效', '背景多元，碰撞灵感'] },
    { title: '做什么？', color: C.secondary, lines: ['互打卡 ≥ 2次/周', '先问搭子再问主群', '每周互查作业'] },
    { title: '数据说话', color: C.green, lines: ['有搭子完成率 89%', '没有搭子 41%', '差了不止一倍'] },
  ];
  var bCardW = 2.95, bStartX = (10 - bCardW * 3 - 0.4) / 2, bY = 3.75;

  for (var i = 0; i < bottomCards.length; i++) {
    var bc = bottomCards[i];
    var bx = bStartX + i * (bCardW + 0.2);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: bY, w: bCardW, h: 1.6, fill: { color: C.cardBg }, rectRadius: 0.1 });
    s.addText(bc.title, { x: bx, y: bY + 0.08, w: bCardW, h: 0.36, fontSize: 12, bold: true, color: bc.color, align: 'center', fontFace: 'Microsoft YaHei' });
    for (var li = 0; li < bc.lines.length; li++) {
      s.addText(bc.lines[li], { x: bx + 0.15, y: bY + 0.5 + li * 0.35, w: bCardW - 0.3, h: 0.33, fontSize: 10, color: C.white, fontFace: 'Microsoft YaHei', bullet: true });
    }
  }
})();

// ========== Slide 10: 21天全景地图 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, 'Phase 1 · Day 1-7 · 打地基');

  var phases = [
    { day: 'Day 1\n(直播当天)', tasks: ['✋ 三层目录建好', '✋ CLAUDE.md 初版', '✋ 手写 01_我是谁', '🤖 Ingest × 1', '🤖 Query × 1'], color: C.secondary },
    { day: 'Day 2-3', tasks: ['🤖 方法论文章 → raw/', '🤖 AI提炼 ≥2张方法论卡'], color: C.primary },
    { day: 'Day 4-5', tasks: ['🤖 公众号 → raw/ → 金句库', '🤖 咨询记录 → 用户痛点卡'], color: C.accent },
    { day: 'Day 6', tasks: ['✋ 手写核心价值观', '🤖 Query 测试自我介绍'], color: C.orange },
    { day: 'Day 7\n里程碑验收', tasks: ['✅ 5间房各≥1张卡', '🤖 Lint 全局体检', '✋ CLAUDE.md → v2'], color: C.green },
  ];

  var pW = 1.76, pH = 3.6, pgap = 0.15;
  var pTotal = phases.length * pW + (phases.length - 1) * pgap;
  var pStartX = (10 - pTotal) / 2, pStartY = 1.2;

  for (var i = 0; i < phases.length; i++) {
    var ph = phases[i];
    var px = pStartX + i * (pW + pgap);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: pStartY, w: pW, h: pH, fill: { color: C.cardBg }, rectRadius: 0.1, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: pStartY, w: pW, h: 0.56, fill: { color: ph.color } });
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: pStartY + 0.48, w: pW, h: 0.12, fill: { color: C.cardBg } });
    s.addText(ph.day, { x: px, y: pStartY, w: pW, h: 0.56, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });

    for (var ti = 0; ti < ph.tasks.length; ti++) {
      var tc = (ph.tasks[ti].indexOf('✋') === 0 || ph.tasks[ti].indexOf('✅') === 0) ? C.white : C.gray;
      s.addText(ph.tasks[ti], { x: px + 0.1, y: pStartY + 0.68 + ti * 0.56, w: pW - 0.2, h: 0.53, fontSize: 9.5, color: tc, fontFace: 'Microsoft YaHei', valign: 'middle' });
    }
  }

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.98, w: 9, h: 0.48, fill: { color: C.bgLight }, rectRadius: 0.08 });
  s.addText('💡 分工原则：AI 帮你写 80% 的卡，你只写「非你不可」的 20%（约3张地基卡）', {
    x: 0.5, y: 4.98, w: 9, h: 0.48, fontSize: 11.5, color: C.primary, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei'
  });
})();

// ========== Slide 11: Q&A ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };
  addSectionTitle(s, pres, '高频 Q&A 预备');

  var qaList = [
    { q: 'Obsidian 客户端打不开？', a: '换网页版，更轻量' },
    { q: 'CLAUDE.md 写不出来？', a: '先用模板原文，Schema 是迭代出来的' },
    { q: 'raw/ 能放 PDF 吗？', a: '能，但建议先转 Markdown' },
    { q: '04_我卖什么必须填吗？', a: '不必，没产品的先空着' },
    { q: 'Wiki 写错了能改吗？', a: '让 AI 改，不要手动改 wiki/ 目录' },
    { q: '技术小白能跟得上吗？', a: '屏幕共享带做 + 搭子互助 + 补救文档' },
  ];

  var qaW = 4.35, qaH = 1.15, gapX = 0.3, gapY = 0.18;
  var cStartX = 0.5, cStartY = 1.25;

  for (var i = 0; i < qaList.length; i++) {
    var qa = qaList[i];
    var col = i % 2, row = Math.floor(i / 2);
    var cx = cStartX + col * (qaW + gapX), cy = cStartY + row * (qaH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: qaW, h: qaH, fill: { color: C.cardBg }, rectRadius: 0.1 });
    s.addShape(pres.shapes.OVAL, { x: cx + 0.12, y: cy + 0.15, w: 0.36, h: 0.36, fill: { color: C.accent } });
    s.addText('Q', { x: cx + 0.12, y: cy + 0.15, w: 0.36, h: 0.36, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Arial' });
    s.addText(qa.q, { x: cx + 0.56, y: cy + 0.12, w: qaW - 0.7, h: 0.36, fontSize: 12, bold: true, color: C.white, valign: 'middle', fontFace: 'Microsoft YaHei' });
    s.addShape(pres.shapes.OVAL, { x: cx + 0.12, y: cy + 0.6, w: 0.36, h: 0.36, fill: { color: C.green } });
    s.addText('A', { x: cx + 0.12, y: cy + 0.6, w: 0.36, h: 0.36, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle', fontFace: 'Arial' });
    s.addText(qa.a, { x: cx + 0.56, y: cy + 0.57, w: qaW - 0.7, h: 0.48, fontSize: 11.5, color: C.green, valign: 'middle', fontFace: 'Microsoft YaHei' });
  }
})();

// ========== Slide 12: 结束页 ==========
(function() {
  let s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.secondary } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.primary } });

  s.addText('今晚见！', {
    x: 0.5, y: 1.6, w: 9, h: 1.0,
    fontSize: 48, bold: true, color: C.white, align: 'center', fontFace: 'Microsoft YaHei',
    shadow: glow(C.secondary, 6, 0.4)
  });

  s.addText('带好电脑，我们一起跑通第一个 MVP 🚀', {
    x: 0.5, y: 2.7, w: 9, h: 0.5, fontSize: 18, color: C.primary, align: 'center', fontFace: 'Microsoft YaHei'
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.4, w: 3, h: 0.03, fill: { color: C.accent } });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.8, y: 3.7, w: 6.4, h: 1.2,
    fill: { color: C.cardBg }, rectRadius: 0.12, shadow: makeShadow()
  });
  s.addText([
    { text: '⏰ 开营直播：5月XX日（周X）晚 20:00\n', options: { fontSize: 14, bold: true, color: C.white } },
    { text: '📍 #腾讯会议：XXX-XXX-XXX\n', options: { fontSize: 12, color: C.gray } },
    { text: '💙 先看完成长手册再来效果更好哦', options: { fontSize: 12, color: C.primary } }
  ], { x: 1.8, y: 3.7, w: 6.4, h: 1.2, align: 'center', valign: 'middle', fontFace: 'Microsoft YaHei' });

  s.addText('蓉蓉子 × 石榴🐾  |  5月「LLM Wiki × 六间房」AI 实操营', {
    x: 0.5, y: 5.1, w: 9, h: 0.3, fontSize: 11, color: C.grayDark, align: 'center', fontFace: 'Microsoft YaHei'
  });
})();

// ========== Write ==========
var outputPath = '/Users/rong/Desktop/ob大脑/04_Output/课件资料/2026-05_实操营升级版/直播1_PPT_赛博霓虹正式版.pptx';
pres.writeFile({ fileName: outputPath }).then(function() {
  console.log('✅ PPT generated: ' + outputPath);
}).catch(function(err) {
  console.error('❌ Error:', err.message);
});
