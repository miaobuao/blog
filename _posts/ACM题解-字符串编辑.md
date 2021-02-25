---
title: ACM题解-字符串编辑
date: 2021-02-24 23:04:25
tags: [ACM,C++]
toc: true
# thumbnail: http://www.dimtub.com/user/1.png
---
测试数据对字符串的删除，替换，以及插入
<!--more-->
## 题目描述
从键盘输入一个字符串（长度<=40 个字符），并以字符 '.'结束。

例如：'This is a book.' 现对该字符串进行编辑，编辑功能有：

D：删除一个字符，命令的方式为：D a  
其中a为被删除的字符
例如：D s  表示删除字符 's' ，若字符串中有多个 's'，则删除第一次出现的。
如上例中删除的结果为： 'Thi is a book.'

I：插入一个字符，命令的格式为：I a1 a2  
其中a1表示插入到指定字符前面，a2表示将要插入的字符。
例如：I s d  表示在指定字符 's' 的前面插入字符 'd' ，若原串中有多个 's' ，则插入在最后一个字符的前面。
如上例中：
原串：'This is a book.'
插入后：'This ids a book.'

R：替换一个字符，命令格式为：
R a1 a2  其中a1为被替换的字符，a2为替换的字符，若在原串中有多个a1则应全部替换。
例如： 原串： 'This is a book.'
输入命令：R o e
替换后的字符串为：'This is a beek.'

在编辑过程中，若出现被改的字符不存在时，则给出提示信息"Not exist"。

## 输入

每个测试文件只包含一组测试数据，每组输入数据包含两行：

第一行，输入一个字符串，表示原串；
第二行，输入一个字符串，表示命令。

## 输出

对于每组输入数据，输出编辑后的字符串，如果被改的字符不存在，则输出"Not exist"（引号不输出）。

## 样例输入

> This is a book.
> D s

## 样例输出

> Thi is a book.

## 我的代码

```c++
#include <bits/stdc++.h>
using namespace std;
int main(){
    char str[55];
    vector<char> res;
    gets(str);
    int len=strlen(str);
    char op,oped;
    cin>>op>>oped;
    int sign=0;
    if(op=='D'){
        for(int i=0;i<len;i++){
            if(str[i]==oped and sign==0){
                sign=1;
            }else{
                res.push_back(str[i]);
            }
        }
    }else{
        char exts;
        cin>> exts;
        if(op=='I'){
            for(int i=len-1;i>=0;i--){
                if(str[i]==oped and sign==0){
                    res.push_back(str[i]);
                    res.push_back(exts);;
                    sign=1;
                }else{
                    res.push_back(str[i]);
                }
            }
        }else if(op=='R'){
            for(int i=0;i<len;i++){
                if(str[i]==oped){
                    sign=1;
                    res.push_back(exts);
                }else{
                    res.push_back(str[i]);
                }
            }
        }
    }

    if(sign==0){
        cout<<"Not exist";
    }else{
        vector<char>::iterator it =res.end();
        if(op=='I'){
            while(it!=res.begin()){
                it--;
                cout<<(*it);
            }
        }else{
            it =res.begin();
            while(it!=res.end()){
                cout<<(*it);
                it++;
            }
        }
    }
}

```
