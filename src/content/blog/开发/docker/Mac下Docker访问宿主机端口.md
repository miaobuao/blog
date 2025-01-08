---
title: Mac下Docker访问宿主机端口
date: 2024-08-22 18:14:03
tags: [docker]
---

# Mac下Docker访问宿主机端口

最近在公司用 CF Tunnel (for Docker) 的时候报错, 说找不到源服务器,
这才突然想起 Docker 是基于 Linux内核的, 
所以大概是不能直接用 localhost 或者 127.0.0.1 来访问宿主机的服务的.

经过搜索后发现,当Docker版本高于v18, 在容器内使用 `host.docker.internal:PORT` 来访问宿主机服务即可

## 参考资料

[docker容器内访问宿主机host服务](https://www.cnblogs.com/forlive/p/15989409.html)
