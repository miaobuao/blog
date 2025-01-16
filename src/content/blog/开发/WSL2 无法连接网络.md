---
date: 2022-05-17 12:12:28
tags: [开发]
---

# WSL2 无法连接网络(apt update 错误/ping 失败)

以管理员身份打开 PowerShell，输入

```sh
netsh winsock reset
```

然后重启电脑
