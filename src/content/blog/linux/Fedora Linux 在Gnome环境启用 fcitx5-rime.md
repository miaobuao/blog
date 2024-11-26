---
title: Fedora Linux 在Gnome环境启用 fcitx5-rime
date: 2024-04-25 13:58:06
tags: [linux]
---

# Fedora Linux 在 Gnome 环境启用 fcitx5-rime

## 安装

```sh
sudo dnf install fcitx5 fcitx5-configtool \
    fcitx5-chinese-addons fcitx5-autostart fcitx5-lua \
    fcitx5-qt fcitx5-gtk 
```

## 添加环境变量

往 `/etc/environment` 写入

```sh
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

## 安装 GNOME 插件

为了在 GNOME Shell 中绘制 fcitx5 候选词列表，需要安装 [gnome-shell-extension-kimpanel](https://extensions.gnome.org/extension/261/kimpanel/)

## 参考

[Fedora 安装 fcitx5-rime 输入法并配置雾凇拼音](https://blog.csdn.net/a18434646561/article/details/134090193)

[Using Fcitx 5 on Wayland](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland#GNOME)
