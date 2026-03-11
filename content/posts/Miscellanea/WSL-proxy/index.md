---
title: "WSL proxy"
date: 2026-03-11T10:08:00+08:00
description: Notes of WSL proxy
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: "WSL proxy"
    identifier: Miscellanea-WSL proxy
    parent: Miscellanea
    weight: 10

hero: images/image-miscellanea.jpg
---


## WSL 访问 GitHub 飞起！🚀 手把手教你打通 Hiddify 代理隧道

### 💡 为什么你的 WSL 连不上网？

很多宝子以为 Windows 开了梯子，WSL 就能自动翻墙。**NO！** WSL 其实是一个独立的虚拟机。要把 Windows 的流量“借”给 WSL，得手动搭个“桥”。

### 🛠️ 第一步：Hiddify 关键设置（必修课）

首先，打开你的 Hiddify，这两点没设对，后面全是白搭：

1. **开启“允许局域网连接” (Share VPN in local network)**：这是为了让 WSL 这个“外人”能访问 Windows 的端口。
2. **记住端口号**：比如 Hiddify 默认的混合端口（Mixed Port）通常是 `12334`。

### 🔍 第二步：精准锁定宿主机 IP

别再去翻什么配置文件啦！最简单的方法就是：

1. 在 Hiddify 界面点击 **“Share VPN in local network”**。
2. 它会跳出一个二维码，下面清清楚楚写着你的 **本地 IP**（比如 `202.141.x.x`）。
3. **记下这个 IP**，它就是 WSL 访问 Windows 的“传送门”地址！

### ⚡ 第三步：配置环境变量（魔法时刻）

打开 WSL 终端，把下面这段贴进去（记得把 `202.141.x.x` 换成你刚才看到的那个 IP）：

```bash
# 填入 Hiddify 给你的那个 IP 和 端口
export host_ip="202.141.x.x" 
export host_port="12334"

# 设置系统代理
export http_proxy="http://$host_ip:$host_port"
export https_proxy="http://$host_ip:$host_port"

# 让 Git 也乖乖听话
git config --global http.proxy "http://$host_ip:$host_port"
git config --global https.proxy "http://$host_ip:$host_port"

```

### ✅ 验证一下

输入 `curl -I https://github.com`。
如果看到 `HTTP/2 200`，恭喜你，隧道通了！GitHub 瞬间秒开！🎉

---

### 🌟 小贴士

* **进阶玩法**：把上面那段代码写进 `~/.bashrc`，以后每次打开 WSL 都能自动挂代理，不用反复粘贴！
* **报错 Connection Refused？** 快去检查 Hiddify 的“允许局域网连接”开关是不是又关掉啦！