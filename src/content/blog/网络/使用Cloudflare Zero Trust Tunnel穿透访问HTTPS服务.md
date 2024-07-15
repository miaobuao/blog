---
title: 使用Cloudflare Zero Trust Tunnel穿透访问HTTPS服务
date: 2023-07-21 15:23:39
tags: [网络]
---

# 使用 Cloudflare Zero Trust Tunnel 穿透访问 HTTPS 服务

创建 https 和 http 的过程是一样的, 特别注意的是, 由于 cf 在客户机和源服务器之间充当了代理, 因此客户机访问的实际上是 CF 的服务器, 而不是直接访问源服务器, 同时又因为 CF 会默认开启 HTTPS 功能, 因此**源服务器并不需要开启 https**, 源服务器开启的依然是 http 服务.

:::info
此处`源服务器`就是运行服务程序的机器
:::

## Tunnel 的通用配置

1. 域名托管到 CF
2. 安装 cloudflared

```
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb &&
sudo dpkg -i cloudflared.deb
```

3. 登录

```
cloudflared tunnel login
```

4. 创建隧道

```
cloudflare tunnel create <TUNNEL NAME>
```

5. 创建解析记录

```
cloudflared tunnel route dns <TUNNEL NAME> <xxxx.exmaple.com>
```


6. 编辑 tunnel 的配置文件

```yml
tunnel: <TUNNEL ID>
credentials-file: /xxx/<ID>.json

ingress:
  - hostname: xxxx.example.com
    service: http://localhost:888
  - service: http_status:404
```

上面的`xxxx.exmaple.com`也就是在第四步创建的 dns 记录的 URL, 需要注意的是这里的 service 的协议需要填写 **http**, 而不是 https

因为 cf 的代理会自动开启 https, 所以并不需要在本地使用 ssl/tls(https).

7. 运行配置

```sh
cloudflared tunnel run <TUNNEL NAME>
```

这时候直接访问`https://xxxx.example.com`即可.
