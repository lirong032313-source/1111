#!/usr/bin/env node
/**
 * html2png - HTML配图一键转PNG
 * 用法：node index.js
 *
 * 首次使用：
 *   npm install puppeteer-core
 *   并手动安装 Chrome（或指定已有Chrome路径）
 *
 * 如果 puppeteer 安装失败，请手动在浏览器截图：
 *   双击 HTML 文件 → 拉大窗口 → Cmd+Shift+4 截图
 */

const fs   = require('fs');
const path = require('path');

const SRC  = '/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/配图素材';
const OUT  = '/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/配图输出';
const W    = 900;
const H    = 500;

async function main() {
  // 检查输出目录
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.html'));
  if (!files.length) { console.log('📭 没有HTML文件'); return; }
  console.log(`🆘 找到 ${files.length} 个HTML文件，开始转换...\n`);

  let puppeteer;
  try {
    puppeteer = require('puppeteer-core');
    console.log('✅ puppeteer-core 已安装');
  } catch {
    console.log('❌ 未安装 puppeteer-core');
    console.log('请用以下命令安装：');
    console.log('  cd "/Users/rong/Desktop/ob大脑/05_System/scripts/html2png"');
    console.log('  npm install puppeteer-core');
    console.log('\n或者直接用浏览器手动截图（更简单）：');
    console.log('  双击 HTML 文件 → 拉大窗口 → Cmd+Shift+4 截图\n');
    return;
  }

  // 尝试找Chrome路径（macOS常见位置）
  const chromePaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    process.env.HOME + '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  let executablePath = '';
  for (const p of chromePaths) {
    if (fs.existsSync(p)) { executablePath = p; break; }
  }
  if (!executablePath) {
    console.log('❌ 未找到Chrome，请先安装 Google Chrome');
    console.log('   或者修改脚本中的 executablePath 指向你的Chrome\n');
    return;
  }
  console.log(`✅ 找到Chrome：${executablePath}\n`);

  const browser = await puppeteer.launch({
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const file of files) {
    const htmlPath = path.join(SRC, file);
    const outPath  = path.join(OUT, file.replace(/\.html$/i, '.png'));
    const url = 'file://' + htmlPath;

    console.log(`  📷 处理：${file}`);
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: W, height: H } });
    await page.close();
    console.log(`  ✅ 已保存：${path.basename(outPath)}`);
  }

  await browser.close();
  console.log(`\n🎉 全部完成！输出目录：${OUT}`);
}

main().catch(e => {
  console.error('❌ 错误：', e.message);
  process.exit(1);
});
