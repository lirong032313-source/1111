#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🦞 公众号历史文章批量下载器
For: 蓉蓉子 × 5月 LLM Wiki 实操营

通过公众号管理后台的 cookie + token 调用 appmsgpublish 接口，
批量下载所有已发表文章为 Markdown，落到 ob大脑 raw/articles/wechat/

Usage:
    1. 在下方 CONFIG 区域填好 cookie 和 token（详细见 README.md）
    2. pip install -r requirements.txt
    3. python3 download_wechat.py

Inspired by: GitHub 社区上若干 wechat-spider 项目（如 wnma3mz/wechat_articles_spider、
            gnimoay/Wechat-Articles-Crawler），但为 Mac 用户简化重写。
"""

import os
import sys
import json
import time
import re
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
    import html2text
except ImportError:
    print("\n❌ 缺少依赖。请先在终端执行：")
    print("   pip3 install -r requirements.txt --break-system-packages\n")
    sys.exit(1)


# ╔══════════════════════════════════════════════════════════╗
# ║  📝 配置区域 —— 你需要填写下面 3 个字段                   ║
# ║  详细教程：见同目录下 README.md 第 2 节                  ║
# ╚══════════════════════════════════════════════════════════╝
CONFIG = {
    # 1️⃣ 你的 cookie（从浏览器开发者工具 Network 标签拿到）
    "cookie": "appmsglist_action_3949760791=card; ua_id=2Sn6SNYpKjqcTct6AAAAACSI3JroCmN7EIEV8Om23EQ=; mm_lang=zh_CN; _qimei_q36=; _qimei_h38=ceca043244034e7db88b97ce0300000b018b01; pgv_pvid=5773257420; ts_uid=5895624980; wxuin=48247502611765; _qimei_fingerprint=719cd65fac204ed1510a2d111e616e87; _qimei_uuid42=19c160b3215100824248f8882574fd6cc81c292d58; wedrive_uin=13102670771531321; wedrive_sid=zzlRZYwuNkYu8llKAERRUgAA; wedrive_skey=13102670771531321&07d678281808e5141c32bca22dc254bf; wedrive_ticket=13102670771531321&CAESIGbxehFqqir7sX3-da3je0bxOxO9LZ6Bu2YpSaBfVep9; rand_info=CAESIOG0ISrGKpMdDRiL/6+kaArLvvytvL2oG+/0H/7Kf6pl; slave_bizuin=3949760791; data_bizuin=3949760791; bizuin=3949760791; data_ticket=Inr3STmfF5wZ4+BfKZd/TwFWkq3BFkZy5/O4nQCtw6F5J5VVtw04zbHhgm4LubaG; slave_sid=T0Vua2ZNWUFCMDNFVkdsODNBejE2QXZJN3YzaUpXZE1HYUYxSGE5U25Pd3VkOGc5U1JwNThGNmZfcTdWOGw5dW1RSGhsb1ZTOTQ5MExCV1RRc0ZsejNyWGxmOXo1YmhwRk1kbl9VMzI5TF9BbHhrd2xpN1JzUjI0aHR0N3ZqaWVBRU9nMjJkNHdnb0lqQTJR; slave_user=gh_8c32bb571f0b; xid=2193d062460967daaa0af7cbb584130a; _clck=3949760791|1|g5p|0; _clsk=bckhnh|1777722784396|3|1|mp.weixin.qq.com/weheat-agent/payload/record",

    # 2️⃣ 你的 token（从公众号后台 URL 拿，是个数字）
    "token": "1683204063",

    # 3️⃣ 下载到哪里（默认是 ob大脑/raw/articles/wechat/）
    "output_dir": "../../../01_Raw/公众号历史文章",

    # 可选：限制下载数量（None=全部，数字=只下前 N 篇）
    "limit": None,

    # 每篇文章之间的间隔秒数（防止微信风控）
    "delay_seconds": 3,
}


class WeChatDownloader:
    BASE = "https://mp.weixin.qq.com"

    def __init__(self, config):
        self.config = config
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Cookie": config["cookie"],
            "Referer": f"{self.BASE}/",
        })
        # 解析输出目录（相对于本脚本所在目录）
        script_dir = os.path.dirname(os.path.abspath(__file__))
        self.output_dir = os.path.normpath(
            os.path.join(script_dir, config["output_dir"])
        )
        os.makedirs(self.output_dir, exist_ok=True)

    # -------------------- 列表 --------------------
    def list_articles(self, begin=0, count=10):
        """调用 appmsgpublish 接口拿一页文章"""
        url = f"{self.BASE}/cgi-bin/appmsgpublish"
        params = {
            "sub": "list",
            "begin": begin,
            "count": count,
            "token": self.config["token"],
            "lang": "zh_CN",
            "f": "json",
            "ajax": 1,
        }
        r = self.session.get(url, params=params, timeout=30)
        if r.status_code != 200:
            raise RuntimeError(f"列表接口 HTTP {r.status_code}\n响应前 300 字：{r.text[:300]}")
        try:
            data = r.json()
        except Exception:
            raise RuntimeError(f"接口返回不是 JSON。前 300 字：{r.text[:300]}")
        err = data.get("base_resp", {}).get("err_msg", "")
        if err and err != "ok":
            raise RuntimeError(f"接口错误：{err}\n完整响应：{json.dumps(data, ensure_ascii=False)[:500]}")
        return data

    def parse_publish_list(self, data):
        """从返回 JSON 提取文章信息"""
        articles = []
        publish_page = data.get("publish_page", "")
        if isinstance(publish_page, str):
            try:
                publish_page = json.loads(publish_page)
            except Exception:
                return articles

        for entry in publish_page.get("publish_list", []):
            content = entry.get("publish_info", "")
            if isinstance(content, str):
                try:
                    content = json.loads(content)
                except Exception:
                    continue

            # 兼容不同的字段名
            for app in content.get("appmsg_info", []):
                articles.append({
                    "title": app.get("title", "").strip(),
                    "url": app.get("content_url") or app.get("link", ""),
                    "publish_time": app.get("update_time") or app.get("create_time"),
                    "digest": app.get("digest", "") or "",
                })
        return articles

    def fetch_all_list(self):
        """分页拉取全部文章列表"""
        all_articles = []
        begin = 0
        while True:
            page_no = begin // 10 + 1
            print(f"  📋 拉第 {page_no} 页（已累积 {len(all_articles)} 篇）...")
            data = self.list_articles(begin=begin, count=10)
            articles = self.parse_publish_list(data)
            if not articles:
                break
            all_articles.extend(articles)
            limit = self.config.get("limit")
            if limit and len(all_articles) >= limit:
                all_articles = all_articles[:limit]
                break
            begin += 10
            time.sleep(2)
        return all_articles

    # -------------------- 单篇 --------------------
    def download_html(self, url):
        r = self.session.get(url, timeout=30)
        r.encoding = r.apparent_encoding or "utf-8"
        return r.text

    def extract_content(self, html):
        soup = BeautifulSoup(html, "html.parser")
        for sel in [("div", {"id": "js_content"}),
                    ("div", {"class": "rich_media_content"})]:
            tag = soup.find(*sel) if isinstance(sel[1], dict) else soup.find(sel[0], sel[1])
            if tag:
                return str(tag)
        return None

    def html_to_markdown(self, html):
        h = html2text.HTML2Text()
        h.ignore_links = False
        h.ignore_images = False
        h.body_width = 0
        h.escape_snob = False
        return h.handle(html)

    @staticmethod
    def safe_filename(name):
        cleaned = re.sub(r'[\\/:*?"<>|\n\r\t]', "_", name).strip()
        return cleaned[:80] or "未命名"

    def save_article(self, article):
        title = article.get("title") or "未命名"
        url = article.get("url")
        ts = article.get("publish_time")
        date_str = (datetime.fromtimestamp(int(ts)).strftime("%Y-%m-%d")
                    if ts else datetime.now().strftime("%Y-%m-%d"))
        filename = f"{date_str}_{self.safe_filename(title)}.md"
        filepath = os.path.join(self.output_dir, filename)

        if os.path.exists(filepath):
            print(f"    ⏭  已存在，跳过：{filename}")
            return True

        if not url:
            print(f"    ⚠️  无链接，跳过：{title}")
            return False

        try:
            html = self.download_html(url)
            content = self.extract_content(html)
            if not content:
                print(f"    ⚠️  正文区域未识别：{title}")
                return False
            markdown = self.html_to_markdown(content).strip()

            with open(filepath, "w", encoding="utf-8") as f:
                f.write("---\n")
                f.write(f"title: {title}\n")
                f.write(f"url: {url}\n")
                f.write(f"publish_date: {date_str}\n")
                f.write(f"source: wechat_official_account\n")
                digest = (article.get("digest") or "").replace("\n", " ").strip()
                if digest:
                    f.write(f"digest: {digest}\n")
                f.write("---\n\n")
                f.write(f"# {title}\n\n")
                f.write(markdown)
            print(f"    ✅ {filename}")
            return True
        except Exception as e:
            print(f"    ❌ 失败：{title}\n        原因：{e}")
            return False

    # -------------------- 主流程 --------------------
    def run(self):
        print("=" * 60)
        print("🦞 蓉蓉子 · 公众号历史文章批量下载器")
        print("=" * 60)

        if "粘贴你的" in self.config.get("cookie", ""):
            print("\n❌ 配置未完成。")
            print("   请打开 download_wechat.py 顶部的 CONFIG 区域，")
            print("   填好 cookie 和 token 再运行。\n")
            print("   详细步骤：see README.md 第 2 节\n")
            return

        print(f"\n📂 输出目录：{self.output_dir}")
        print(f"⏱  延迟：{self.config['delay_seconds']}s/篇")
        if self.config.get("limit"):
            print(f"🔢 限量：只下前 {self.config['limit']} 篇")
        else:
            print("🔢 限量：无（下载全部）")

        print("\n📥 第 1 步：拉取文章列表 ----------------")
        try:
            articles = self.fetch_all_list()
        except Exception as e:
            print(f"\n❌ 列表拉取失败：{e}\n")
            print("常见原因：")
            print("  1. cookie 失效 → 重登公众号后台再复制一次 cookie")
            print("  2. token 过期 → 重新从公众号后台 URL 复制 token")
            print("  3. 触发风控 → 等待 30 分钟后再试\n")
            return

        if not articles:
            print("\n⚠️  未取到任何文章。检查公众号是否真的有已发表文章。\n")
            return

        print(f"\n✅ 共获取 {len(articles)} 篇文章信息")

        # 列表备份
        list_file = os.path.join(self.output_dir, "_article_list.json")
        with open(list_file, "w", encoding="utf-8") as f:
            json.dump(articles, f, ensure_ascii=False, indent=2)
        print(f"📋 元数据备份：{list_file}")

        print(f"\n📥 第 2 步：逐篇下载 ----------------")
        ok = fail = 0
        for i, art in enumerate(articles, 1):
            print(f"\n[{i}/{len(articles)}] {art.get('title')}")
            if self.save_article(art):
                ok += 1
            else:
                fail += 1
            if i < len(articles):
                time.sleep(self.config["delay_seconds"])

        print("\n" + "=" * 60)
        print(f"🎉 完成！成功 {ok} 篇 | 失败 {fail} 篇 | 总计 {len(articles)} 篇")
        print(f"📂 文件位置：{self.output_dir}")
        print("=" * 60)


if __name__ == "__main__":
    WeChatDownloader(CONFIG).run()
