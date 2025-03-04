---
title: 判断 IPv4 地址是内网还是外网
date: 2024-12-09 11:05:23
tags: [网络]
---

# 判断 IPv4 地址是内网还是外网

最近在做文件下载接口, 为了防止用户使用该接口传播违规文件, 需要确保下载文件的IP与上传文件的IP相同, 同时又要允许内网服务访问该接口, 因此需要写个方法来判断是否为内网 IP.

方法比较简单, 从IP地址的范围即可判断^[https://zh-hans.ipshu.com/tell_IP_within_1_minute], 内网IP地址有3个IP地址段, 分别对应A、B、C 三类网络：

1. 10.0.0.0 ~ 10.255.255.255
2. 172.16.0.0 ~ 172.31.255.255
3. 192.168.0.0 ~ 192.168.255.255

需要注意的是传入的IP地址可能是 IPv4 映射地址(用来在 IPv6 环境中表示 IPv4 地址), 例如: `::ffff:192.168.2.131`, 因此选择使用正则提取 IPv4 地址.

```ts
export function isIntranetIPv4Address(addr: string) {
	const reg = /(::ffff:)?(\d+)\.(\d+)\.(\d+)\.(\d+)$/g
	const match = addr.matchAll(reg)
	const segments = Array.from(match).at(0)?.slice(2).map(Number)
	if (!segments) {
		return false
	}
	switch (segments[0]) {
		case 10:
			// 10.0.0.0 ~ 10.255.255.255
			return true
		case 172:
			// 172.16.0.0 ~ 172.31.255.255
			if (segments[1] >= 16 && segments[1] <= 31) return true
			break
		case 192:
			// 192.168.0.0 ~ 192.168.255.255
			if (segments[1] === 168) return true
			break
	}
	return false
}

console.log(isIntranetIPv4Address('10.100.200.255'))     // true
console.log(isIntranetIPv4Address('172.16.0.1'))         // true
console.log(isIntranetIPv4Address('172.31.255.255'))     // true
console.log(isIntranetIPv4Address('192.168.0.1'))        // true
console.log(isIntranetIPv4Address('::ffff:192.168.0.1')) // true
console.log(isIntranetIPv4Address('12.34.56.78'))        // false
console.log(isIntranetIPv4Address('invalid.ip'))         // false
console.log(isIntranetIPv4Address('256.0.0.1'))          // false
```
