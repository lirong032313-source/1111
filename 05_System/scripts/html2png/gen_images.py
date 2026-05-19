#!/usr/bin/env python3
"""
用 Pillow 直接生成公众号配图 PNG（无需浏览器）
生成 4 张图：三层架构 / 提示词vs契约书 / 6个核心章节 / 风格采样
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ===== 配置 =====
OUT_DIR = '/Users/rong/Desktop/ob大脑/04_Output/自媒体内容/公众号/配图输出'
W, H   = 1800, 1000   # 高清大图，截图后依然清晰
BG_DARK   = (13, 27, 42)    # #0D1B2A
BG_PURPLE = (26, 26, 46)   # #1A1A2E
NEON_PINK  = (255, 0, 255)  # #FF00FF
NEON_CYAN  = (0, 255, 255)  # #00FFFF
WARM_ORANGE= (255, 107, 53)  # #FF6B35
GOLD       = (255, 215, 0)   # #FFD700
TEXT_WHITE = (240, 240, 240)
TEXT_GRAY  = (180, 180, 180)
DIVIDER    = (255, 255, 255, 40)

def ensure_dir():
    os.makedirs(OUT_DIR, exist_ok=True)

def gradient_bg(draw, w, h):
    """画渐变背景"""
    for y in range(h):
        r = int(BG_DARK[0] + (BG_PURPLE[0]-BG_DARK[0]) * y / h)
        g = int(BG_DARK[1] + (BG_PURPLE[1]-BG_DARK[1]) * y / h)
        b = int(BG_DARK[2] + (BG_PURPLE[2]-BG_DARK[2]) * y / h)
        draw.line([(0,y), (w,y)], fill=(r,g,b))

def glow_rect(draw, x, y, w, h, color, border=2):
    """画发光矩形框"""
    # 外发光
    for i in range(6, 0, -2):
        alpha = int(25 * (6-i+1) / 6)
        c = (*color, alpha)
        draw.rectangle([x-i, y-i, x+w+i, y+h+i], outline=color, width=1)
    # 主边框
    draw.rectangle([x, y, x+w, y+h], outline=color, width=border)
    # 内柔光
    draw.rectangle([x+4, y+4, x+w-4, y+h-4], fill=(*color[:3], 25))

def try_font(size, bold=False):
    """尝试加载中文字体"""
    font_paths = [
        '/System/Library/Fonts/PingFang.ttc',
        '/System/Library/Fonts/STHeiti Light.ttc',
        '/System/Library/Fonts/Hiragino Sans GB.ttc',
        '/Applications/WeChat.app/Contents/Resources/App.ttf',
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                pass
    return ImageFont.load_default()

# ============================================================
# 图1：三层架构图
# ============================================================
def gen_fig1():
    img  = Image.new('RGB', (W, H), BG_DARK)
    draw = ImageDraw.Draw(img)
    gradient_bg(draw, W, H)

    # 标题
    f48 = try_font(48)
    f36 = try_font(36)
    f30 = try_font(30)
    f26 = try_font(26)
    f22 = try_font(22)

    draw.text((W//2, 55), '🏗️  LLM Wiki 三层架构', font=f48, fill=TEXT_WHITE, anchor='mm')

    # 三层
    layers = [
        {'y': 140, 'h': 200, 'color': NEON_PINK,  'label': 'Schema 层 · 规则 / 契约',
         'sub': '你和 AI 共同维护  ·  越用越懂你', 'tag': '📄  CLAUDE.md', 'star': '★  你在这层'},
        {'y': 420, 'h': 200, 'color': NEON_CYAN,  'label': 'Wiki 层 · 已编译的知识（AI 拥有）',
         'sub': 'AI 把你的原始素材，消化成「信息卡」', 'tag': '🏠  六间房信息卡'},
        {'y': 700, 'h': 200, 'color': WARM_ORANGE,'label': 'Raw Sources 层 · 原始素材（不可变）',
         'sub': '你产生的所有内容，只存不改', 'tag': '📥  00_Inbox → 01_Raw'},
    ]

    for L in layers:
        x, w = 100, W-200
        # 背景
        draw.rounded_rectangle([x, L['y'], x+w, L['y']+L['h']], radius=16, fill=(*L['color'][:3], 20))
        # 边框
        draw.rounded_rectangle([x, L['y'], x+w, L['y']+L['h']], radius=16, outline=L['color'], width=3)
        # 星标
        if 'star' in L:
            draw.text((x+w-220, L['y']+18), L['star'], font=f26, fill=GOLD)
        # 主标签
        draw.text((x+30, L['y']+30), L['label'], font=f36, fill=L['color'])
        # 副标题
        draw.text((x+30, L['y']+80), L['sub'], font=f26, fill=TEXT_GRAY)
        # tag
        draw.rounded_rectangle([x+30, L['y']+130, x+330, L['y']+170], radius=8, fill=(*L['color'][:3], 50))
        draw.text((x+50, L['y']+137), L['tag'], font=f22, fill=GOLD)

    # 箭头
    arr_f = try_font(72)
    for ay in [355, 635]:
        draw.text((W//2, ay), '↓', font=arr_f, fill=NEON_CYAN, anchor='mm')

    out = os.path.join(OUT_DIR, '图1_三层架构图.png')
    img.save(out, 'PNG')
    print(f'  ✅  图1_三层架构图.png')

# ============================================================
# 图2：提示词 vs 契约书
# ============================================================
def gen_fig2():
    img  = Image.new('RGB', (W, H), BG_DARK)
    draw = ImageDraw.Draw(img)
    gradient_bg(draw, W, H)

    f48=try_font(48); f40=try_font(40); f30=try_font(30)
    f26=try_font(26); f22=try_font(22)

    draw.text((W//2, 55), '⚡  提示词  vs  契约书（CLAUDE.md）', font=f48, fill=TEXT_WHITE, anchor='mm')

    # 左右两卡
    cards = [
        {'x':80, 'color':(168,85,247), 'icon':'⚡', 'title':'提示词',
         'rows':[('时效','单次对话'),('目标','写好这次回答'),('核心','指令 / 命令'),('方式','每次重写'),('本质','你指挥 AI 干活')],
         'tag':'📌 像"临时工"'},
        {'x':W//2+40, 'color':NEON_CYAN, 'icon':'🤝', 'title':'契约书（CLAUDE.md）',
         'rows':[('时效','长期复用'),('目标','让 AI 理解"你是谁"'),('核心','身份 / 表达 / 边界'),('方式','持续迭代生长'),('本质','你和 AI 共同进化')],
         'tag':'📌 像"合伙人"'},
    ]

    vs_f = try_font(72)
    draw.text((W//2, H//2-40), 'VS', font=vs_f, fill=GOLD, anchor='mm')

    for card in cards:
        x, y, w, h = card['x'], 140, W//2-120, H-280
        c = card['color']
        # 背景
        draw.rounded_rectangle([x,y,x+w,y+h], radius=16, fill=(*c[:3],18))
        draw.rounded_rectangle([x,y,x+w,y+h], radius=16, outline=c, width=3)
        # 标题
        draw.text((x+30, y+20), f"{card['icon']}  {card['title']}", font=f30, fill=c)
        # 分割线
        draw.line([(x+20, y+70), (x+w-20, y+70)], fill=(*c[:3],80), width=2)
        # 行
        for i, (k,v) in enumerate(card['rows']):
            ry = y + 90 + i*52
            draw.text((x+30, ry), f"▸  {k}：", font=f22, fill=c)
            draw.text((x+170, ry), v, font=f22, fill=TEXT_GRAY)
        # tag
        draw.rounded_rectangle([x+30, y+h-55, x+w-30, y+h-20], radius=8, fill=(*c[:3],40))
        draw.text((x+50, y+h-50), card['tag'], font=f22, fill=TEXT_WHITE)

    out = os.path.join(OUT_DIR, '图2_提示词vs契约书.png')
    img.save(out, 'PNG')
    print(f'  ✅  图2_提示词vs契约书.png')

# ============================================================
# 图3：CLAUDE.md 6个核心章节
# ============================================================
def gen_fig3():
    img  = Image.new('RGB', (W, H), BG_DARK)
    draw = ImageDraw.Draw(img)
    gradient_bg(draw, W, H)

    f48=try_font(48); f36=try_font(36); f28=try_font(28); f22=try_font(22)

    draw.text((W//2, 55), '📄  CLAUDE.md · 6个核心章节', font=f48, fill=TEXT_WHITE, anchor='mm')

    cells = [
        {'n':'01','color':NEON_PINK,  'title':'我是谁（身份定义）',       'desc':'名字 / 称呼 / 性格 / 价值观\nAI 的"第一印象"'},
        {'n':'02','color':NEON_CYAN,  'title':'我的真实故事（成长经历）', 'desc':'关键转折点 / 重要选择\n让 AI 理解你的来路'},
        {'n':'03','color':GOLD,        'title':'写作风格（语气+金句+禁忌）','desc':'喜欢怎么说话 / 哪些话绝不讲\nAI 的"语气模板"'},
        {'n':'04','color':WARM_ORANGE,'title':'产品体系（卖什么）',         'desc':'产品矩阵 / 价格锚点\nAI 的"销售指南"'},
        {'n':'05','color':(168,85,247),'title':'用户是谁（目标人群）',     'desc':'30-35岁 IP / 自由职业者\nAI 的"客服手册"'},
        {'n':'06','color':(103,232,249),'title':'思考边界（什么能做/不能做）','desc':'红线 / 价值观边界\nAI 的"行为准则"'},
    ]

    cols = 3
    cell_w = (W - 80*(cols+1)) // cols
    cell_h = 240
    start_x = 80
    start_y = 160

    for i, cell in enumerate(cells):
        row = i // cols
        col = i % cols
        x = start_x + col*(cell_w+80)
        y = start_y + row*(cell_h+40)
        c = cell['color']
        # 背景
        draw.rounded_rectangle([x,y,x+cell_w,y+cell_h], radius=14, fill=(*c[:3],15))
        draw.rounded_rectangle([x,y,x+cell_w,y+cell_h], radius=14, outline=c, width=2)
        # 大数字（背景装饰）
        draw.text((x+cell_w-80, y+10), cell['n'], font=f48, fill=(*c[:3],60))
        # 标题
        draw.text((x+20, y+30), cell['title'], font=f28, fill=c)
        # 描述
        draw.text((x+20, y+80), cell['desc'], font=f22, fill=TEXT_GRAY)

    out = os.path.join(OUT_DIR, '图3_6个核心章节.png')
    img.save(out, 'PNG')
    print(f'  ✅  图3_6个核心章节.png')

# ============================================================
# 图4：风格采样
# ============================================================
def gen_fig4():
    img  = Image.new('RGB', (W, H), BG_DARK)
    draw = ImageDraw.Draw(img)
    gradient_bg(draw, W, H)

    f48=try_font(48); f30=try_font(30); f26=try_font(26); f22=try_font(22); f20=try_font(20)

    draw.text((W//2, 55), '🎙️  风格采样 · 让 AI 学会"你的声音"', font=f48, fill=TEXT_WHITE, anchor='mm')
    draw.text((W//2, 115), '从你自己写过的文字里，挑出最像自己的段落，喂给 AI', font=f26, fill=TEXT_GRAY, anchor='mm')

    # 左侧大脑
    cx, cy, cr = 280, 480, 120
    draw.ellipse([cx-cr, cy-cr, cx+cr, cy+cr], outline=NEON_PINK, width=4)
    draw.ellipse([cx-cr+15, cy-cr+15, cx+cr-15, cy+cr-15], outline=(*NEON_PINK[:3],80), width=2)
    draw.text((cx, cy), '🧠', font=f48, fill=NEON_PINK, anchor='mm')

    # 中间箭头
    arr_f = try_font(72)
    draw.text((W//2, cy), '→', font=arr_f, fill=GOLD, anchor='mm')
    draw.text((W//2, cy+70), '喂给 AI', font=f26, fill=GOLD, anchor='mm')

    # 右侧38
    draw.ellipse([W-400, cy-100, W-160, cy+100], outline=GOLD, width=4)
    draw.text((W-280, cy-50), '38', font=try_font(96), fill=GOLD, anchor='mm')
    draw.text((W-280, cy+40), '个精选段落', font=f26, fill=TEXT_GRAY, anchor='mm')

    # 右侧类型标签
    types = [('观点型', NEON_CYAN), ('故事型', GOLD), ('对话型', NEON_PINK)]
    for i,(t,c) in enumerate(types):
        tx = W-430
        ty = cy+140 + i*55
        draw.rounded_rectangle([tx, ty, tx+180, ty+42], radius=8, fill=(*c[:3],40))
        draw.text((tx+20, ty+8), t, font=f22, fill=c)

    # 左下方：示例段落（3条）
    examples = [
        ('📌 观点型', NEON_CYAN,  '"AI工具最大的误区，是以为装上了就能用。\n其实装上去只是开始…"'),
        ('📖 故事型', GOLD,       '"32岁那年，我做了个很叛逆的决定：\n不升职了，去搞副业…"'),
        ('💬 对话型', NEON_PINK,  '"你有没有过这种感觉？每天忙得要死，\n但回头一看，什么都没留下…"'),
    ]
    for i,(label,lc,txt) in enumerate(examples):
        ex = 100
        ey = 720 + i*85
        ew = W-200
        draw.rounded_rectangle([ex, ey, ex+ew, ey+72], radius=10, fill=(*lc[:3],12))
        draw.rectangle([ex, ey, ex+5, ey+72], fill=lc)
        draw.text((ex+25, ey+10), label, font=f22, fill=lc)
        draw.text((ex+25, ey+38), txt, font=f20, fill=TEXT_GRAY)

    out = os.path.join(OUT_DIR, '图4_风格采样.png')
    img.save(out, 'PNG')
    print(f'  ✅  图4_风格采样.png')

# ===== 主程序 =====
if __name__ == '__main__':
    ensure_dir()
    print('🎨 开始生成配图（PNG）...\n')
    gen_fig1()
    gen_fig2()
    gen_fig3()
    gen_fig4()
    print(f'\n🎉 全部完成！输出目录：{OUT_DIR}')
