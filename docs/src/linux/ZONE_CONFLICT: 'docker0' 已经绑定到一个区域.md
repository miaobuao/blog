---
title: ZONE_CONFLICT: 'docker0' 已经绑定到一个区域
date: 2024-02-16 22:41:07
tags: [linux]
---

# ZONE_CONFLICT: 'docker0' 已经绑定到一个区域

1. 检查firewall-cmd中是否存在docker zone 

```sh
firewall-cmd --get-active-zones
```

2. 如果“docker”区域可用，请将接口更改为 docker0（持久化）

```sh
sudo firewall-cmd --permanent --zone=docker --change-interface=docker0 
sudo systemctl restart firewalld
```

3. 重启docker

```sh
systemctl start docker
```