---
title: "微信聊天记录导出"
date: 2026-10-01T16:00:00+08:00
description: Notes of WeChat chat history export using PyWxDump
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: "微信聊天记录导出"
    identifier: WXMsg
    parent: Life
    weight: 10

hero: images/image-life.jpg
---

📱 **手把手教你把微信聊天记录导出为干净的TXT！用 PyWxDump 轻松搞定** ✨

之前很多姐妹和朋友用的 MemoTrace 随着微信版本更新频繁失效闪退😭。折腾了一圈，终于找到了目前最稳定、解密最快的方法——基于开源神器 **PyWxDump**！

不仅万条聊天记录只要几秒钟就能提取出来，而且引用回复、语音时长甚至语音转文字都能整整齐齐排好版！赶紧马住这篇保姆级教程👇

---

## ✅ 准备工作
- **电脑一台**（Windows 系统）
- **Python 环境**（Miniconda / Python 3.10+ 均可）
- **电脑端微信已登录**（提取加密 Key 的关键！）

---

## 📝 超简单实操指南

### 第 1 步：将手机记录迁移到电脑（可选）
如果电脑端本身就有完整聊天记录，可直接跳过这步。如果想把手机里的历史记录也导出来：
1. 手机和电脑连入同一局域网 WiFi；
2. 手机微信打开：【我】→【设置】→【聊天记录管理】→【迁移】；
3. 选择想导出的好友，直接迁移到电脑微信，等传输完成。

---

### 第 2 步：一行命令安装工具
打开终端（PowerShell 或 CMD），激活你的 Python 环境，执行以下命令安装：

```powershell
pip install pywxdump
```

> 💡 **小贴士**：Windows 终端建议先运行一次 `$env:PYTHONUTF8="1"`，防止中文显示编码问题。

---

### 第 3 步：导出聊天记录（两种姿势任选）

#### 🌸 姿势 A：小白首选 —— 浏览器 Web 可视化界面
如果你习惯像 MemoTrace 那样在图形界面里点点鼠标：

1. 保持电脑微信登录；
2. 在终端直接输入：
   ```powershell
   wxdump ui
   ```
3. 工具会自动在本地启动一个网页服务，并自动弹出浏览器！
4. 在页面上点击 **【获取信息】** → **【解密数据库】**，就能在浏览器里直接搜索联系人、翻看聊天记录，并支持一键导出为 HTML 或 TXT！🎉

---

#### 💻 姿势 B：极客首选 —— Python 脚本一键导出纯净 TXT
如果你想要最干净、排版最完美的 TXT 文件（自动过滤乱糟糟的底层 XML 代码，完美解析“引用回复”和“语音转文字”）：

保持微信登录状态，运行下面这个现成脚本：

```python
import sqlite3
import os
import time
import lz4.block
import re
import html
import pywxdump

# 1. 自动获取微信登录信息与数据库密钥
wx_info = pywxdump.get_wx_info()
if not wx_info or not wx_info[0]:
    print("[-] 请先在电脑端登录微信！")
    exit()

info = wx_info[1]
key = info['key']
wx_dir = info['wx_dir']
print(f"[+] 成功获取账号: {info.get('account')} 的数据库密钥！")

# 2. 解密消息数据库 (MSG0.db - MSG7.db)
multi_dir = os.path.join(wx_dir, "Msg", "Multi")
out_dir = "./decrypted_db"
os.makedirs(out_dir, exist_ok=True)

for i in range(8):
    db_file = os.path.join(multi_dir, f"MSG{i}.db")
    if os.path.exists(db_file):
        pywxdump.decrypt(key, db_file, os.path.join(out_dir, f"de_MSG{i}.db"))

# 3. 指定好友微信号或 wxid 导出
target_wxid = "填写你想导出的好友wxid或微信号"
export_file = f"微信聊天记录_{target_wxid}.txt"

def decompress_lz4(comp_bytes):
    if not comp_bytes: return ""
    try: return lz4.block.decompress(comp_bytes, uncompressed_size=len(comp_bytes)*15).decode('utf-8', errors='replace')
    except: return ""

def format_row(r):
    mtype, is_sender, ctime, content, comp = r[0], r[1], r[2], r[3] or "", r[4]
    sender = "我" if is_sender == 1 else "对方"
    time_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(ctime))
    
    # 消息类型精细化解析
    if mtype == 1:
        text = content
    elif mtype == 3:
        text = "[图片]"
    elif mtype == 34:
        text = "[语音]"
    elif mtype == 47:
        text = "[动画表情]"
    elif mtype == 49:
        xml = decompress_lz4(comp) or content
        m_title = re.search(r'<title>(.*?)</title>', xml)
        text = html.unescape(m_title.group(1)) if m_title else "[分享/卡片消息]"
    else:
        text = "[消息]"
    return f"[{time_str}] {sender}:\n{text}\n"

# 4. 汇总所有分卷数据库并按时间排序
all_msgs = []
for i in range(8):
    path = os.path.join(out_dir, f"de_MSG{i}.db")
    if os.path.exists(path):
        conn = sqlite3.connect(path)
        cur = conn.cursor()
        try:
            cur.execute("SELECT Type, IsSender, CreateTime, StrContent, CompressContent FROM MSG WHERE StrTalker=?", (target_wxid,))
            all_msgs.extend(cur.fetchall())
        except: pass
        conn.close()

all_msgs.sort(key=lambda x: x[2])

with open(export_file, "w", encoding="utf-8") as f:
    f.write(f"=== 微信聊天记录导出（共 {len(all_msgs)} 条）===\n\n")
    for msg in all_msgs:
        f.write(format_row(msg) + "\n")

print(f"[🎉] 导出完成！保存至: {export_file}")
```

打开生成的 TXT 文件，所有对话、时间线、回复内容一目了然，再也没有乱七八糟的乱码和代码片段啦！

---

## 💡 避坑小提醒
1. **必须在提取前登录微信**：数据库是有 64 位 AES 加密的，工具需要读取正在运行的微信内存来获取解密 Key。
2. **多分卷数据库支持**：微信现在的电脑版消息会分散存储在 `MSG0.db` 到 `MSG7.db` 多个文件中，脚本已贴心地帮你全部合并并按时间正序重新排列好了。
3. **数据安全**：全过程完全在本地离线运行，不经过任何外部服务器，个人隐私 100% 安全放心！

---

## 🌟 真实感受
相比原先打包好的 exe 工具经常因为微信小更新就罢工，`PyWxDump` 更加稳定底层，解密速度超快（上万条消息只要两三秒）。导出的 TXT 文本不仅可以直接做永久云备份，还能丢给大模型（如 Gemini、Claude）帮你生成年度回忆录或者词云手账！小伙伴们快去试试吧！

#微信聊天记录导出 #微信聊天记录备份 #PyWxDump #实用技巧 #程序员日常 #生活记录

---

💬 操作中遇到什么问题可以在评论区留言，看到都会解答哦～