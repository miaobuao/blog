---
title: KVM中安装Windows11跳过检验
date: 2023-10-07 12:26:24
tags: [linux]
---

# KVM中安装Windows11跳过检验

## win11 专业版激活密钥

```
J8WVF-9X3GM-4WVYC-VDHQG-42CXT

7Y64F-88DCY-Y6WTC-H33D2-64QHF
```

[https://zhuanlan.zhihu.com/p/637930518](https://zhuanlan.zhihu.com/p/637930518)

## 跳过校验

1、首先正常进行系统更新升级，依旧等待弹窗出现，不要关闭。
2、直接按下键盘上的“shift+F10”快捷键打开命令输入行。
3、接着在命令输入行中输入“regedit”回车确定，进入注册表编辑器。
4、然后在注册表中定位到如下位置“HKEY_LOCAL_MACHINE\SYSTEM\Setup”
5、在其中创建一个项，将它命名为“LabConfig”的项，接着在其中创建两个DWORD值。
6、其中一个值命名为“BypassTPMCheck”，双击打开它，将值改为“00000001”。
安装升级Win11时如何跳过系统检测？
7、另一个DWORD值命名为“BypassSecureBootCheck”，值改为“00000001”即可。
