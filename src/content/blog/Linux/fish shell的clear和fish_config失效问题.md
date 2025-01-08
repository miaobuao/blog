---
title: fish shell的clear和fish_config失效问题
date: Tue Jul  4 07:08:24 PM CST 2023
tags: [Linux]
---

# fish shell 的 clear 和 fish_config 失效问题

问题如下:

```
➤ fish_config
Traceback (most recent call last):
  File "/usr/share/fish/tools/web_config/webconfig.py", line 1676, in <module>
    esc = get_special_ansi_escapes()
  File "/usr/share/fish/tools/web_config/webconfig.py", line 576, in get_special_ansi_escapes
    curses.setupterm()
_curses.error: setupterm: could not find terminfo database
```

出现这个问题不出意外的话当我们 clear 的时候会显示`terminals database is inaccessible`

::: info
`clear` 才会报错, `CTRL` + `L`没什么效果
:::

用 which 指令看到:
![which clear](./assets/image-1.png)
表示我们 clear 用的是 anaconda 下的, 当我们`conda deactivate`之后再清屏就有效果了.

但是这不能解决问题!
实际上由于一个环境变量配置的问题导致的, 往`/etc/environment`中写入这段内容之后重启电脑就好了:

```sh
TERMINFO=/usr/share/terminfo
```
