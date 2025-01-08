---
title: "Arch Linux使用nvidia驱动代替nouveau"
date: 2023-06-30 13:51:27
tags: [Linux]
---

# Arch Linux 使用 nvidia 驱动代替 nouveau

并不难.

1.  编辑`/etc/mkinitcpio.conf`, 从 `HOOKS` 中删除 `kms`, 然后:

```bash
mkinitcpio -P
```

2.  安装 nvidia 驱动并自动配置 xorg.conf:

```bash
pacman -S nvidia nvidia-utils
nvidia-xconfig
```

3. 重启