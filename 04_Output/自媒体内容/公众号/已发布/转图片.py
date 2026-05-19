#!/usr/bin/env python3
"""
把配图 pptx 转成图片
"""
import subprocess
import os

output_dir = "/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/已发布"

# 用 macOS 内置的 sips 和 qlmanage 转换
pptx_files = [
    "配图1_头图.pptx",
    "配图2_痛点.pptx",
    "配图3_三层架构.pptx",
    "配图4_金句.pptx"
]

for pptx in pptx_files:
    src = f"{output_dir}/{pptx}"
    dst = f"{output_dir}/{pptx.replace('.pptx', '.png')}"

    # 用 Automator/qlmanage 转成 PNG
    cmd = f'qlmanage -t -s 1200 -o "{output_dir}" "{src}" 2>/dev/null'
    os.system(cmd)
    print(f"✅ 转换: {pptx} -> {pptx.replace('.pptx', '.png')}")

print("\n用 macOS 预览打开检查:")
os.system(f"open {output_dir}")