---
date: 2022-10-31 10:32:43
---

# Cisco CLI(随手记录 不可作为参考)

## 常用指令

清除现有配置(#):

```
erase startup-config
reload
```

进入配置模式(#):
`config terminal`

修改主机名(config):
`hostname xxxx`

禁用 DNS 查找（config）：
`no ip domain-lookup`

设置口令(config):
`enable secret <psw>`

进入控制台线路配置模式(config):
`line con 0`

设置控制台口令(config-line):
`password <psw>`

进入全部五条虚拟终端线路的线路配置模式(config):
`line vty 0 4`

设置 vty 口令(config-line):
`password <psw>`

设置连接时标语(config):
`banner motd XXXXXXX`

## 配置接口

### 在路由器上配置接口

进入 FastEthernet 接口配置模式(config):
`interface fa0/0`

设置 IP 和子网掩码(config-if):
`ip address <IP> <Subnet Mask>`

启用接口(config-if):
`no shutdown`

描述接口(config-if):
`description <Text>`

进入串行接口配置模式(config):
`interface s0/0/0`

### 在交换机上配置接口

进入 vlan 接口配置模式(config):
`interface vlan 1`

Tips: 其他与路由器一致

### 检验 RIP

```
show running-config
show ip interface brief: 检查物理层 数据链路层是否 UP， ip 地址配置
show ip route: 路由表是否正确
ping
show ip protocols
```

#### 比较哈人的指令：

```
debug ip rip
undebug all
```
