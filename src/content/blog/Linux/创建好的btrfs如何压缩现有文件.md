---
title: 创建好的btrfs如何压缩现有文件
date: 2023-08-16 00:55:42
tags: [Linux]
---

# 创建好的btrfs如何压缩现有文件

[参考](https://archive.kernel.org/oldwiki/btrfs.wiki.kernel.org/index.php/Problem_FAQ.html#Defragmenting_a_directory_doesn.27t_work)

```sh
btrfs filesystem defragment -r -czstd /
```

表示从根目录开始递归的使用zstd算法压缩文件

