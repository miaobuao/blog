---
title: 使用队列走迷宫-BFS&数据结构
date: 2021-04-25 16:58:27
tags: [数据结构,算法]
categories: 数据结构
---

数据结构的作业，写个队列，然后实现走迷宫

<!--more-->

## 思路

不管怎么说，先实现队列吧，毕竟是数据结构的作业。
我用的是**链队列**
走迷宫用到的是**BFS**的思想

## 测试数据

**输入:**

    5
    8
    11111111
    1S101011
    10001011
    101000E1
    11111111

**输出:**

    (2,2)
    (3,2)
    (3,3)
    (3,4)
    (2,4)
    (4,4)
    (4,5)
    (4,6)
    FIND!

## Code

```C++
#include <iostream>

using namespace std;

typedef struct position
{
    int x,y;
} position;

class Q
{
    public:
    position p;
    Q *next;
    Q(position pos)
    {
        next=nullptr;
        p=pos;
    }
    Q()
    {
        next=nullptr;
    }
    void push(position p)
    {
        auto temp=next;
        while(temp)
        {
            temp=temp->next;
        }
        temp=new Q(p);
        temp->next=next;
        next=temp;
        // cout<<temp->p.y;
    }
    int size()
    {
        int cnt=0;
        auto temp=next;
        while(temp)
        {
            temp=temp->next;
            cnt++;
        }
        return cnt;
    }
    bool empty()
    {
        if(next==nullptr) return true;
        return false;
    }
    position front()
    {
        return p;
    }
    position pop()
    {
        auto temp=next;
        next=temp->next;
        return temp->p;
    }
};

char a[1000][1000];
int f[1000][1000];

int main()
{
    position start,end;
    int dx[4]={0,1,-1,0},
        dy[4]={-1,0,0,1};
    int n,m;
    cin>>n>>m;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
        {
            char c;
            cin>>c;
            if(c=='S')
            {
                start.x=i,start.y=j;
                c=='0';
            }
            else if(c=='E')
            {
                end.x=i,end.y=j;
                c='0';
            }
            a[i][j]=c;
        }
    Q q;
    q.push(start);
    while(!q.empty())
    {
        auto p=q.pop();
        int x=p.x,y=p.y;
        printf("(%d,%d)\n",x,y);
        f[x][y]=1;
        for(int i=0;i<4;i++)
        {
            int xx=x+dx[i],yy=y+dy[i];
            if(xx>0 && yy>0 && a[xx][yy]!='1' && f[xx][yy]!=1 && xx<=n && yy<=m)
            {
                if(xx==end.x && yy==end.y)
                {
                    cout<<"FIND!"<<endl;
                    return 1;
                }
                position pos;
                pos.x=xx;
                pos.y=yy;
                q.push(pos);
            }
        }
    }
    cout<<"NOT FOUND!";
    return 0;
}
```
