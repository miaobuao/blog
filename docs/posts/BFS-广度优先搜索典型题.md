---
title: 'BFS-广度优先搜索典型题'
date: 2021-03-06 22:11:54
tags: [算法,C++]
published: true
hideInList: false
feature: 
isTop: false
---

BFS基础题-红与黑，是走迷宫和自动寻路算法

<!--more-->

## 题目

有一间长方形的房子，地上铺了红色、黑色两种颜色的正方形瓷砖。

你站在其中一块黑色的瓷砖上，只能向相邻（上下左右四个方向）的黑色瓷砖移动。

请写一个程序，计算你总共能够到达多少块黑色的瓷砖。

输入格式
输入包括多个数据集合。

每个数据集合的第一行是两个整数 W 和 H，分别表示 x 方向和 y 方向瓷砖的数量。

在接下来的 H 行中，每行包括 W 个字符。每个字符表示一块瓷砖的颜色，规则如下

1）‘.’：黑色的瓷砖；
2）‘#’：红色的瓷砖；
3）‘@’：黑色的瓷砖，并且你站在这块瓷砖上。该字符在每个数据集合中唯一出现一次。

当在一行中读入的是两个零时，表示输入结束。

输出格式
对每个数据集合，分别输出一行，显示你从初始位置出发能到达的瓷砖数(记数时包括初始位置的瓷砖)。

数据范围
1≤W,H≤20

输入样例：
> 6 9
....#.
.....#
......
......
......
......
......
\#@...#
.#..#.
0 0

输出样例：
> 45

## Code

```cpp
#include <bits/stdc++.h>

using namespace std;

struct qu
{
    int hh, tt;
    int x[25 * 25], y[25 * 25];
    void recover()
    {
        memset(x, 0, sizeof(x));
        memset(y, 0, sizeof(y));
        hh = 0;
        tt = 0;
    }
} q;

int main()
{
    while (true)
    {
        char a[25][25];
        int f[25][25];
        memset(f, 0, sizeof(f));
        memset(a, '0', sizeof(a));
        int n, m;
        q.hh = 0;
        q.tt = 0;
        q.recover();
        int x, y;
        cin >> m >> n;
        if (m == n && m == 0)
            break;
        int cnt = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
            {
                cin >> a[i][j];
                if (a[i][j] == '@')
                {
                    q.x[q.tt] = i;
                    q.y[q.tt] = j;
                    q.tt++;
                    f[i][j] = 1;
                    cnt++;
                    a[i][j] = '.';
                }
            }
        while (q.hh <= q.tt)
        {
            int hh = q.hh;
            int x = q.x[hh], y = q.y[hh];

            if (a[x + 1][y] == '.' and f[x + 1][y] != 1)
            {
                q.x[q.tt] = x + 1;
                q.y[q.tt] = y;
                q.tt++;
                f[x + 1][y] = 1;
                cnt++;
            }

            if (a[x - 1][y] == '.' and f[x - 1][y] != 1)
            {
                q.x[q.tt] = x - 1;
                q.y[q.tt] = y;
                f[x - 1][y] = 1;
                q.tt++;
                cnt++;
            }

            if (a[x][y - 1] == '.' and f[x][y - 1] != 1)
            {
                q.x[q.tt] = x;
                q.y[q.tt] = y - 1;
                q.tt++;
                f[x][y - 1] = 1;
                cnt++;
            }

            if (a[x][y + 1] == '.' and f[x][y + 1] != 1)
            {
                q.x[q.tt] = x;
                q.y[q.tt] = y + 1;
                q.tt++;
                f[x][y + 1] = 1;
                cnt++;
            }
            q.hh++;
        }
        cout << cnt <<endl;
    }
    return 0;
}
```