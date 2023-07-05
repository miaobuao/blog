---
title: Archlinux的蓝牙问题解决
date: Wed Jul  5 08:48:52 AM CST 2023
tags: [linux]
---

# Archlinux 的蓝牙问题解决

以前没遇到过, 都是装完桌面开箱即用, 这次不知道为什么必须要手动操作

```bash
pacman -S bluez-utils
systemctl enable --now bluetooth.service
```

这时候应该可以连接设备, 但是连接耳机连接不上, 通过`systemctl status bluetooth.service`查看后发现是`a2dp`协议不能使用, 所以还要安装:

```bash
yay -S pulseaudio-bluetooth
```
可以编辑`/usr/lib/systemd/system/bluetooth.service`, 在`ExecStart`的最后加`-E`, 用于开启实验模式
![bluetooth](image.png)

重启设备即可.