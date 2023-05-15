---
title: 'Fish使用nvm'
date: 2023-05-15 10:57:24
tags: [linux, fish, nvm]
---

# Fish使用nvm(Node Version Manager)

## 安装fisher

```sh
fisher install jorgebucaran/fisher
```

出现问题：`Invalid plugin name or host unavailable: xxx`
说明cURL有问题^[https://github.com/jorgebucaran/fisher/issues/634]
参考[这篇博客](../../curl%3A_error_setting_certificate_verify_locations.md)

## 安装nvm.fish

```sh
fisher install jorgebucaran/nvm.fish
```

## 安装node版本

```sh
# 查看所有版本
nvm list-remote
```

```sh
# 安装最新版
nvm install latest
```

## 记住版本

```sh
node --version > ~/.nvmrc
echo "nvm use" >> ~/.config/fish/config.fish
```
