#!/usr/bin/env python3
"""PDF 转图片"""
import fitz

pdf_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.pdf"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"

try:
    doc = fitz.open(pdf_path)
    page = doc[0]
    mat = fitz.Matrix(2.0, 2.0)  # 2x zoom for better quality
    pix = page.get_pixmap(matrix=mat)
    pix.save(output_path)
    doc.close()
    print(f"✅ 截图成功: {output_path}")
except Exception as e:
    print(f"错误: {e}")