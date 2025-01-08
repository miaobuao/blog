---
title: '解决xxx is not in the sudoers file'
date: 2022-08-19 19:55:54
tags: [Linux]
published: true
hideInList: false
feature: 
isTop: false
---
首先切换到root用户，然后执行：
```sh
usermod -G sudo xxx
```
xxx 是需要加入sudoer的用户名