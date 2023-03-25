---
title: 'GitHub常用API'
date: 2021-07-12 12:01:49
tags: [资源]
published: true
hideInList: false
feature: 
isTop: false
---



**api地址区分大小写**



<!--more-->



| 功能                                 | api地址                                                      | 请求方式 | 请求参数                                      | 返回参数                       | 例子                                                         |
| ------------------------------------ | ------------------------------------------------------------ | -------- | --------------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| 获取用户信息                         | https://api.github.com/users/                                | get      | path路径： 用户名                             | `一个用户对象`                 | https://api.github.com/users/ygunoil                         |
| 获取用户所有仓库                     | https://api.github.com/users/{用户名}/repos                  | get      | path路径： 用户名                             | `返回一个数组`                 | https://api.github.com/users/ygunoil/repos                   |
| 获取某个仓库的详细信息               | [https://api.github.com/repos/{用户名}/](https://api.github.com/repos/ygunoil/Common-functions){仓库名} | get      | path路径： 用户名 和 仓库名                   | `返回一个仓库对象`             | https://api.github.com/repos/ygunoil/Common-functions        |
| 获取某个仓库里根目录文件或文件夹数组 | [https://api.github.com/repos/](https://api.github.com/repos/ygunoil/Common-functions/contents)[/{用户名}/](https://api.github.com/repos/ygunoil/Common-functions)[{仓库名}/contents](https://api.github.com/repos/ygunoil/Common-functions/contents) | get      | path路径： 用户名 和 仓库名                   | `返回一个首层文件或文件夹数组` | https://api.github.com/repos/ygunoil/Common-functions/contents |
| 获取某个仓库里子目录文件或文件夹数组 | [https://api.github.com/repos/](https://api.github.com/repos/ygunoil/Common-functions/contents)[/{用户名}/](https://api.github.com/repos/ygunoil/Common-functions)[{仓库名}/contents](https://api.github.com/repos/ygunoil/Common-functions/contents)/{文件名或文件夹名} | get      | path路径： 用户名 和 仓库名和文件名或文件夹名 | 返回一个文件数组               | https://api.github.com/repos/ygunoil/Common-functions/contents/utilshttps://api.github.com/repos/ygunoil/Common-functions/contents/utils/Currency/CurrencyFormat.js |
| 获取某文件的原始内容（Raw）          | [1. 通过上面的文件信息中提取`download_url`这条链接，就能获取它的原始内容了。](https://api.github.com/repos/ygunoil/Common-functions/contents)[2. 或者直接访问：`https://raw.githubusercontent.com/{用户名}/{仓库名}/{分支名}/`](https://api.github.com/repos/ygunoil/Common-functions/contents){文件路径} | get      | path路径： 用户名 和 仓库名和文件l路径        | 返回一个文件内容的字符串       | https://raw.githubusercontent.com/ygunoil/Common-functions/master/utils/Currency/CurrencyFormat.js |
| 获取某个用户的跟随者列表             | https://api.github.com/users/{用户名}/followers              | get      | path路径： 用户名                             | `返回一个数组`                 | https://api.github.com/users/ygunoil/followers               |
| 获取某个用户正在关注谁列表           | https://api.github.com/users/{用户名}}/following             | get      | path路径： 用户名                             | 返回一个数组                   | https://api.github.com/users/ygunoil/following               |
| 获取某个用户加入的组织列表           | [https://api.github.com/users/{用户名}/orgs](https://api.github.com/users/ygunoil/orgs) | get      | path路径： 用户名                             | 返回一个数组                   | https://api.github.com/users/ygunoil/orgs                    |
| repo中所有的commits列表              | https://api.github.com/repos/{用户名}/{仓库名}/commits       | get      |                                               |                                |                                                              |
| 某一条commit详情                     | https://api.github.com/repos/{用户名}/{仓库名}/commits/{某一条commit的SHA} | get      |                                               |                                |                                                              |
| issues列表                           | https://api.github.com/repos/{用户名}/{仓库名}/issues        | get      |                                               |                                |                                                              |
| 某条issue详情                        | https://api.github.com/repos/{用户名}/{仓库名}/issues/{序号} | get      | issues都是以1,2,3这样的序列排号的             |                                |                                                              |
| 某issue中的comments列表              | https://api.github.com/repos/{用户名}/{仓库名}/issues/{序号}/comments | get      |                                               |                                |                                                              |
| 某comment详情                        | https://api.github.com/repos/{用户名}/{仓库名}/issues/comments/{评论详情的ID} | get      | 评论ID是从issues列表中获得的                  |                                |                                                              |
