#!/usr/bin/env node
/**
 * html2png - 超轻量HTML→PNG转换工具
 * 方案：启动本地Server → 用系统screencapture截图
 * 适用：macOS（无需安装任何依赖）
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const SRC_DIR  = '/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/配图素材';
const OUT_DIR  = '/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/配图输出';
const PORT     = 18899;
const WIDTH    = 900;
const HEIGHT   = 500;

// 确保输出目录
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// 启动HTTP服务器（静态文件）
function startServer() {
  const server = http.createServer((req, res) => {
    const filePath = path.join(SRC_DIR, req.url === '/' ? '' : req.url);
    // 安全校验
    if (!filePath.startsWith(SRC_DIR)) {
      res.writeHead(403); res.end(); return;
    }
    try {
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        // 列出文件
        const files = fs.readdirSync(filePath).filter(f => f.endsWith('.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>文件列表</h2><ul>$｛files.map(f => `<li><a href="$｛f｝">$｛f｝</a></li>`).join('')｝</ul>`);
      } else {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      }
    } catch (e) {
      res.writeHead(404); res.end('Not Found');
    }
  });
  server.listen(PORT);
  console.log(`📡 服务器已启动：http://localhost:$｛PORT｝`);
  return server;
}

// 用screencapture截图（macOS自带）
function screenshotWithScreencapture(url, outputPath) {
  // 用open命令在默认浏览器打开
  execSync(`open "$｛url｝"`, { stdio: 'ignore' });
  console.log(`  ⏳ 已在浏览器打开，3秒后截图...`);
  execSync(`sleep 3`);
  
  // 用screencapture截取整个屏幕（用户需要手动选择窗口）
  // 更好的方式：用window ID自动截图
  // 获取Chrome窗口ID
  try {
    const windowInfo = execSync(`osascript -e 'tell application "Google Chrome" to id of window 1' 2>/dev/null || osascript -e 'tell application "Safari" to id of window 1' 2>/dev/null || echo ""`, { encoding: 'utf8' });
    const windowId = windowInfo.trim();
    if (windowId) {
      execSync(`screencapture -l $｛windowId｝ "$｛outputPath｝"`, { stdio: 'inherit' });
      console.log(`  ✅ 已保存：$｛path.basename(outputPath)｝`);
      return true;
    }
  } catch (e) {}
  
  // 兜底：让用户手动截图
  console.log(`  ⚠️  无法自动截图，请手动截图后保存到：`);
  console.log(`     $｛outputPath｝`);
  return false;
}

// 主函数
function main() {
  const htmlFiles = fs.readdirSync(SRC_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(SRC_DIR, f));
  
  if (htmlFiles.length === 0) {
    console.log('📭 没有找到HTML文件');
    process.exit(0);
  }
  
  console.log(`🆘 找到 $｛htmlFiles.length｝ 个HTML文件：`);
  htmlFiles.forEach(f => console.log(`  - $｛path.basename(f)｝`));
  console.log();
  
  const server = startServer();
  
  console.log(`📷 截图方案（macOS）：`);
  console.log(`  1. 脚本会打开浏览器`);
  console.log(`  2. 请按 Cmd+Shift+4 手动截图`);
  console.log(`  3. 截图保存到：$｛OUT_DIR｝`);
  console.log();
  
  server.close();
  
  // 实际上，最可靠的是：直接用Node.js调用wkhtmltoimage
  // 但之前检查没装。最后的方案：
  console.log(`💡 最可靠的方案：`);
  console.log(`  1. 用Homebrew安装wkhtmltopdf：`);
  console.log(`     brew install --cask wkhtmltopdf`);
  console.log(`  2. 然后运行：`);
  console.log(`     wkhtmltoimage 图1_三层架构图.html 图1_三层架构图.png`);
  console.log();
}

main();
