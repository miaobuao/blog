---
title: 'STM32F4xx-库函数工程模板创建'
date: 2021-03-30 08:23:13
tags: [资源]
published: true
hideInList: false
feature: 
isTop: false
---
记录遇到的小问题。

<!--more-->

## 下载模板文件

[>>>下载<<<](https://wwa.lanzous.com/ip3Grngmhmf)
确保安装了MDK_Keil5，解压模板文件之后进入USER文件夹内，打开*T2.uvprojx*即可

## 遇到的问题

选择build之后报错，好长好长一串。

1. 需要在魔术棒的C/C++选项卡内的define中写上`STM32F40_41xxx,USE_STDPERIPH_DRIVER`
2. 同样是在魔术棒中，target选项卡内，Code Generation框内的ARM Compiler下拉栏中，选择`Use default compiler version 5`