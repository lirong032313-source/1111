#!/usr/bin/env python3
"""用 Safari + screencapture 截图 HTML"""
import subprocess
import time
import os

html_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师-私教咨询记录_诊断报告_含行动版.html"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"

# AppleScript 用 Safari 打开 HTML，然后用系统截图
script = f'''
tell application "Safari"
    activate
    open POSIX file "{html_path}"
    delay 3
end tell

delay 1
'''

# 先打开 Safari
subprocess.run(['osascript', '-e', script])
time.sleep(3)

# 用 screencapture 截取屏幕
subprocess.run(['screencapture', '-x', '-w', output_path])
print("截图已保存，如需手动调整请在预览中查看")