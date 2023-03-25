---
title: 'Linux安装oh-my-zsh'
date: 2022-08-15 16:39:38
tags: [Linux]
published: true
hideInList: false
feature: 
isTop: false
---
## 安装

```sh
sudo apt install zsh
git clone https://gitee.com/mirrors/oh-my-zsh.git
cd oh-my-zsh
sh ./tools/install.sh
```

## 下载插件

```sh
git clone https://gitee.com/qiushaocloud/zsh-autosuggestions.git ~/.oh-my-zsh/plugins/zsh-autosuggestions
git clone https://gitee.com/lightnear/zsh-syntax-highlighting.git ~/.oh-my-zsh/plugins/zsh-syntax-highlighting
```
然后再编辑`~/.zshrc`的plugins：

```sh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

保存更改之后在终端里输入
```sh
zsh
```
来更新配置
