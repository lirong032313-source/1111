#!/usr/bin/env python3
"""用 weasyprint 把 HTML 转图片"""
import weasyprint

html_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师-私教咨询记录_诊断报告_含行动版.html"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"

try:
    weasyprint.HTML(filename=html_path).write_png(output_path)
    print(f"✅ 截图成功: {output_path}")
except Exception as e:
    print(f"❌ 错误: {e}")