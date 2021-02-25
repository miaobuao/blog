---
title: C++奇偶数判断的两种方法
date: 2021-02-25 21:01:22
tags: C++
categories: C++
toc: true
---

## 方法1 - mod
方法一较为常见，就是取余操作，对n求2的余数，若余数为0，则是偶数，反之则为奇数

## 方法2 - &
这里用到了二进制的知识：

    &运算通常用于二进制取位操作，
    例如 19 & 1 的结果就是把19转化为二进制然后取最末位；
    顺带一提，>>运算符是去掉二进制最后一位。

```c++
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int b;
    cin >> b;
    if (b & 1) //取b二进制的最低位，判断和1是否相同，相同返回1，否则返回0
    {
        cout << "奇数";
        return 0;
    }
    cout << "偶数";
    return 0;
}
```