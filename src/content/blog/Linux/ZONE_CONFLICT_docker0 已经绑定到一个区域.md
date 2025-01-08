---
title: "ZONE_CONFLICT: docker0 已经绑定到一个区域"
date: 2024-02-16 22:41:07
tags: [Linux]
---

# ZONE_CONFLICT: `docker0` 已经绑定到一个区域

1. 检查 firewall-cmd 中是否存在 docker zone

```sh
firewall-cmd --get-active-zones
```

2. 如果“docker”区域可用，请将接口更改为 docker0（持久化）

```sh
sudo firewall-cmd --permanent --zone=docker --change-interface=docker0
sudo systemctl restart firewalld
```

3. 重启 docker

```sh
systemctl start docker
```
