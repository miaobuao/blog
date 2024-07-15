---
title: 'Linux 基本操作记录'
date: 2022-08-15 15:17:14
tags: [Linux]
published: true
hideInList: false
feature: 
isTop: false
---
## SSH
1. **连接**
```sh
ssh username@host
```

## 用户管理

1. **切换用户**
```sh
su <username>
```

2. **添加用户**
```sh
useradd <username> -m
```
`-m` 会在/home下创建一个与用户名相同的文件夹

3. **删除用户**
```sh
userdel [username]
```

## 进程管理

1. 列出进程
```sh
ps -ef
```

2. 终止进程
```sh
kill -9 [PID]
```
`-9`表示强制关闭进程


## 磁盘管理

[菜鸟教程-linux文件系统](https://www.runoob.com/linux/linux-filesystem.html)

