#!/usr/bin/env python3
"""用 Chrome 截图 HTML"""
import subprocess
import os

html_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师-私教咨询记录_诊断报告_含行动版.html"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"

# AppleScript 打开 Chrome 并截图
script = f'''
tell application "Google Chrome"
    activate
    open POSIX file "{html_path}"
    delay 2

    -- 获取当前窗口
    set win to front window
    set tab to active tab of win

    -- 截图
    tell application "System Events"
        keystroke "s" using {{command down, shift down}}
    end tell

    delay 1

    close every tab of win
end tell
'''

# 简单方法：用 screencapture 直接截屏
script2 = f'''
tell application "Google Chrome"
    activate
    open POSIX file "{html_path}"
    delay 2
end tell

delay 1

tell application "System Events"
    keystroke "4" using command down
    key code 53 -- ESC
end tell

delay 0.5

tell application "Google Chrome"
    close every tab of front window
end tell
'''

print("用 Command+Shift+4 手动截取窗口...")
print(f"HTML 路径: {html_path}")
print("按 Ctrl+C 取消")