#!/usr/bin/env python3
"""用 Chrome headless 截图"""
import subprocess
import time

html_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师-私教咨询记录_诊断报告_含行动版.html"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"
pdf_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.pdf"

# 先转 PDF
cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    f"--print-to-pdf={pdf_path}",
    f"--virtual-time-budget=5000",
    f"file://{html_path}"
]

result = subprocess.run(cmd, capture_output=True, text=True)
print("PDF 输出:", result.returncode)
print(result.stderr[-200:] if result.stderr else "")

time.sleep(1)

# PDF 转图片
try:
    from PIL import Image
    img = Image.open(pdf_path)
    img.save(output_path)
    print(f"✅ 截图成功: {output_path}")
except Exception as e:
    print(f"PDF转图片失败: {e}")
    print("截图已保存为 PDF:", pdf_path)