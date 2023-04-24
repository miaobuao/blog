---
title: '网络安全协议与VPN'
date: 2021-05-21 10:41:04
tags: [信息安全]
published: true
hideInList: false
feature: 
isTop: false
---


**第十二章 前情提要：**

<table>
    <tr>
        <td>NTC网卡</td>
        <td>IP</td>
        <td>Transport传输层(TCP)</td>
        <td>应用层（数据）</td>
    </tr>
</table>

<!--more-->

## VPN是什么

**Virtual Private Network：**
虚拟专用网。
利用密码协议进行安全数据传输的都叫VPN

## SSL/TLS

在传输层与数据之间加一层SSL层，对数据进行加密

在应用层前加上技术参数（如加密方式等处理流程），国内**百分之九十九**网站都使用SSL协议，代价小
即**端到端加密**

## IPSec(AH/ESP)

IKE：本质上使用David-哈夫曼密钥交换协议，用于解决密钥交换问题

AH：轻量级保护，只能保护数据不被修改，

ESP：重量级，保护不被修改且不被查看

**ESP：**
封装安全载荷。
使用对称加密算法
+ Encryption
    PC5，IDE等
+ Authentication
  HMAC-MD5-96
  HMAC-SHA-1-96

+ 鉴别首部AH
+ 封装安全载荷ESP
+ 加上新的IP2IP


**地址到地址加密**
在IP与TCP之间加密
主要应用于*翻墙*

+ 传输模式
    不对IP进行保护
+ 隧道模式
    添加外部IP，对原始IP进行保护

## 路由器

路由器在网卡与IP之间加一层加密