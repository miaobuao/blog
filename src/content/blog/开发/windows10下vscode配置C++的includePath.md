---
title: 'windows10下vscode配置C++的includePath'
date: 2021-02-24 22:46:38
tags: [开发]
published: true
hideInList: false
feature: 
isTop: false
---
解决：
> 检测到 #include 错误。请更新 includePath。已为此翻译单元(C:\miaobuao\Development\xxxx.cpp)禁用波形曲线。C/C++(1696)
<!--more-->
之前一直使用的linux系统编写c++程序，非常好用，直到最近切换到windows，配置c++运行环境遇到了很多问题。

为此我安装了MinGW，TDM-GCC，甚至是devC++，但是没用！

### 解决方案
1. 安装TDM-GCC，
我的安装路径是 C:\TDM-GCC-64
2. 在vscode中使用 ctrl + shift + P ,找到C/C++：编辑配置(JSON)，然后修改includePath为
>C:/TDM-GCC-64/lib/gcc/x86_64-w64-mingw32/9.2.0/include/c++/**

之前就是因为末尾的两个星号没加，所以才报错