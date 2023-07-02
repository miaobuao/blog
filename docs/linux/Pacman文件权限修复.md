---
title: 'Pacman文件权限修复'
date: 2023-07-02 11:35:51
tags: [linux]
---

# Pacman文件权限修复

## 查看错误的文件有哪些

```bash
pacman -Qkk 1>/dev/null
```

##

修复前装包`extra/pacutils`

```bash
pacman -S pacutils
```

修复: ^[https://github.com/andrewgregory/pacutils]

```bash
find /usr/share | pacrepairfile --uid --gid
```