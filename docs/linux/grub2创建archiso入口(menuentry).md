---
title: "grub2创建archiso入口(menuentry)"
date: 2023-07-03 09:03:42
tags: [linux]
---

# grub2 创建 archiso 入口(menuentry)

不推荐直接更改`/boot/grub/grub.cfg`, 我选择修改`/etc/grub.d/40_custom`, 这样的话每次`grub-mkconfig`都会自动把该文件里的内容追加到 `grub.cfg` 里, 参考[Configure GRUB](https://wiki.archlinux.org/title/Multiboot_USB_drive#Configuring_GRUB)得出如下配置文件:

::: code-group

```bash [/etc/grub.d/40_custom]
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.

probe -u $root --set=rootuuid
set imgdevpath="/dev/disk/by-uuid/$rootuuid"
menuentry 'ArchLinux-x86_64.iso' {
        set isofile='/iso/archlinux-2023.07.01-x86_64.iso'
        loopback loop $isofile
        linux (loop)/arch/boot/x86_64/vmlinuz-linux img_dev=$imgdevpath img_loop=$isofile earlymodules=loop
        initrd (loop)/arch/boot/intel-ucode.img (loop)/arch/boot/amd-ucode.img (loop)/arch/boot/x86_64/initramfs-linux.img
}
```

:::

需要说明的是我把 archiso 放在了`/boot/iso/`目录下, 除了 iso 的版本或存放路径可能不一样, 其他地方如果不出意外的话无需特别修改.

修改完后重新`grub-mkconfig -o /boot/grub/grub.cfg`即可

::: info
iso 可从 [archlinux - tuna](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/) 下载
:::
