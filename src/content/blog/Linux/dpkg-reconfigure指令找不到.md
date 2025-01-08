---
title: dpkg-reconfigure指令找不到?
date: 2024-11-17 15:02:30
tags: [Linux]
---

# dpkg-reconfigure指令找不到?

一般来说 `dpkg-reconfigure` 这个指令是在 `debconf` 这个包里, 可以先试试通过apt安装这个包.

其次, 这个指令在 `/usr/sbin/dpkg-reconfigure`, 这个路径需要用root用户登录才行，所以非root用户直接执行 dpkg-reconfigure 肯定是找不到的。

而通过su命令切换到root之后，虽然是切换到了root权限，但是因为Debian系统官方的更改，直接使用su命令切换并没有切换到root用户的PATH，因此必须通过 `su -` 切换到 root 才行!


### 参考

[dpkg-reconfigure命令找不到问题解决](https://blog.csdn.net/qq_19440071/article/details/133591237)
