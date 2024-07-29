---
title: 解决PVE系统在华硕B650e-e主板上的断网故障
date: 2024-07-29 16:36:11
tags: [PVE]
---

# 解决 PVE 系统在华硕 B650e-e 主板上的断网故障

如果您使用的是华硕的 B650e-e 主板，并且搭配了 I225-V 网卡，您可能会遇到在 Linux 系统上长时间工作后突然断网的问题。这个问题可能表现为系统不定期地断开网络连接，且除了重启外，其他方法似乎都无法恢复网络连接。

## 转载声明

本文内容部分参考自[绅士喵的博客](https://blog.hentioe.dev/posts/asus-x670e-linux-network-fault.html)，感谢作者的分享。


## 检查问题

当您遇到断网问题时，可以通过 `journalctl` 命令来检查系统日志，确认是否发生了故障。运行以下命令：

```sh
journalctl -b | grep -i eno1
```

如果看到类似以下的错误信息：

```
[时间戳] kernel: igc 0000:0c:00.0 eno1: PCIe link lost, device now detached
```

这表明网卡的 PCIe 链接丢失了，设备已经从总线上分离。这种情况下，尝试使用其他命令来恢复网络连接通常是无效的。

用 `dmesg` 进一步寻找可用信息:

```sh
dmesg -T | grep -i igc
```

可以看到igc 模块发生崩溃:

```
[时间戳] 0000:0c:00.0: igc failed to read reg 0xc030
```

## 修复方法

为了避免这个问题，您可以尝试添加以下两个内核启动参数：

+ pcie_port_pm=off
+ pcie_aspm.policy=performance

具体来说,对于使用 GRUB 引导的系统，编辑 /etc/default/grub 文件，将上述参数**追加**到 GRUB_CMDLINE_LINUX_DEFAULT 选项中：

```sh
GRUB_CMDLINE_LINUX_DEFAULT="pcie_port_pm=off pcie_aspm.policy=performance"
```

然后执行 `sudo update-grub` 并重启系统。

## 问题原因

尽管目前尚不清楚这个问题的底层原因，但根据用户反馈和一些社区讨论，这个问题可能需要华硕、Intel 和 Linux 社区的共同努力来解决。遗憾的是，华硕对于 Linux 系统的支持似乎并不积极。
