---
title: 'GDM: 切换xorg到wayland'
date: 2023-06-20 15:55:45
tags: [linux]
---

# GDM: 切换xorg到wayland

主要有两个配置文件

+ /etc/gdm/custom.conf
+ /usr/lib/udev/rules.d/61-gdm.rules

第一个文件的`WaylandEnable=false`表示关闭wayland，如果这句话被注释掉，就表示启用

另一个文件中加入

```
LABEL="gdm_prefer_wayland"
RUN+="/usr/lib/gdm-runtime-config set daemon PreferredDisplayServer wayland"
GOTO="gdm_end"
```

然后在开头加上
```
GOTO = "gdm_prefer_wayland"
```