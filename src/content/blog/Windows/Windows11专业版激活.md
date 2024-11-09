---
title: Windows11专业版激活
date: 2024-11-09 14:04:50
tags: [Windows]
---

# Windows11专业版激活

[Microsoft Activation Scripts (MAS)](https://github.com/massgravel/Microsoft-Activation-Scripts)

这是一个利用硬件ID激活的办法, 激活后一劳永逸, 重装系统后不必再次激活.

以前微软有win7免费升级到win10的活动，现在虽然不行了，但是这个激活通道依然存在，这个脚本就是利用这个激活通道来让微软认为你的win10是从win7升级过来的。所以理论上，激活之后和正版没区别。

## 如何使用？

打开PowerShell, 执行:

```sh
irm https://get.activated.win | iex
```

在弹出的窗口中:
- 选择 `[1] HWID` 激活 Windows
- 选择 `[2] Ohook` 激活 Office
