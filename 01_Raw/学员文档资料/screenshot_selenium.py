#!/usr/bin/env python3
"""用 Chrome headless + Selenium 截图"""
import time

html_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师-私教咨询记录_诊断报告_含行动版.html"
output_path = "/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png"

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

options = Options()
options.add_argument("--headless")
options.add_argument("--window-size=1200,900")
options.add_argument("--screenshot=/Users/rong/Desktop/ob大脑/01_Raw/学员文档资料/魏师_截图.png")

try:
    driver = webdriver.Chrome(options=options)
    driver.get(f"file://{html_path}")
    time.sleep(2)
    driver.save_screenshot(output_path)
    driver.quit()
    print(f"截图成功: {output_path}")
except Exception as e:
    print(f"错误: {e}")
    print("需要先安装 chromedriver: brew install chromedriver")