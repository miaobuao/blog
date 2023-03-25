---
title: 'vim插件配置'
date: 2022-09-08 14:37:06
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
安装Vundle
```sh
git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle
```

打开vim的配置文件:`.vimrc`
```sh
vim ~/.vimrc
```

在最上方加上
```sh
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'preservim/nerdtree'

call vundle#end()            " required
filetype plugin indent on    " required
```

保存并退出，之后进入vim，使用指令`:PluginInstall`
