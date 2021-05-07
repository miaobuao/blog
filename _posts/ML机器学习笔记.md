---
title: ML机器学习笔记
date: 2021-05-07 01:04:38
tags: [机器学习]
categroies:  机器学习
mathjax: true
---

机器学习的学习笔记,感谢吴恩达老师的视频教程以及字幕组

<!--more-->

## 线性回归

### “J函数”和“h函数”

+ <a id=H>$h(x^{(i)})$</a>：
这个函数叫做**假设函数**，但是他的作用和假设没有很大的关系。
这个函数传入的参数$x^{(i)}$表示*第i个样本*，
该函数主要就是在计算一个表达式：
$$
h(x^{(i)})=\theta_0\times x^{(i)}_0+\theta_1\times x^{(i)}_1+...+\theta_n\times x^{(i)}_n
$$

+ <a id=J>$J(\theta)$</a>：
这个函数叫做“**代价函数**”，该函数的返回值是代入参数$\theta$之后，根据样本计算出来的标准差的0.5倍，公式如下：
$$
J(\theta)=\frac{1}{2m}\sum^n_{i=0}(h(x^{(i)})-y^i)^2
$$至于结果为什么是标准差的一半，在下文进行<a href=#why_square>说明</a>

### 梯度下降法

$$
\theta_j:=\theta_j-\varphi\frac{\partial}{\partial\theta_j}J(\theta)
$$

其中$J(\theta)$指代代价函数（有时候我会叫它开销函数），公式当中的$:=$实际上就是赋值的意思。

<a id=why_square>**为什么代价函数要对标准差除以2：**</a>
上式后半部分$\frac{\partial}{\partial\theta_j}J(\theta)$是对$J(\theta)$的$\theta_j$求偏导数，而<a href=#J>$J(\theta)$的公式</a>当中带了个平方，在求偏导数的时候，平方与代价函数中$\frac{1}{2m}$当中的2抵消了

需要注意的是，在这个公式中，$\varphi$指代学习率，也就是纠正偏差的幅度，**太大**会导致**无法收敛**，**太小**则**消耗过多时间**

无论有多少$\theta$, 都可以使用这种梯度下降法.

假设我们有**m**个样本，每个样本有**n**个特征，那么我们需要通过梯度下降算法得出n+1个$\theta$的近似值，于是分别记作$\theta_0,\theta_1,\theta_2,...,\theta_n$，通常来说我们的$J(\theta)$，中的$\theta$是一个矩阵，记作$n*1$的矩阵(n*1的矩阵也称为“向量”)：$\begin{bmatrix}
\theta_0 \\\\
\theta_2 \\\\
... \\\\
\theta_n
\end{bmatrix}
$，与此同时，把样本数据记作：
$$
A=\begin{bmatrix}
1 & x^1_1 & x^1_2 & ... &x^1_m & y^1 \\\\
1 & x^2_1 & x^2_2 & ... &x^2_m & y^2 \\\\
... \\\\
1 & x^m_1 & x^m_2 & ... &x^m_n & y^n
\end{bmatrix}$$一个$m*(n+2)$规模的矩阵，其中,矩阵A的第一列是默认的全是1，为了方便计算假设函数，而最后一列$y^i$是样本特征值的正确结果，也就是我们在代价函数中计算标准差时用到的期望值

值得一提的是，我们使用$x^{(i)}$指代$\begin{bmatrix}
1 & x^i_1 & x^i_2 & ... &x^i_n
\end{bmatrix}$这样的矩阵，使用$x^{(i)}_j$指代矩阵A中第i行第j个元素

根据矩阵的乘法规则，可以知道：$\theta*x^{(i)}$的结果是一个$1*1$的矩阵，且满足如下式子：
$$
\begin{bmatrix}
1 & x^i_1 & x^i_2 & ... &x^i_n
\end{bmatrix}
\begin{bmatrix}
\theta_0 \\\\
\theta_2 \\\\
... \\\\
\theta_n
\end{bmatrix}= \begin{bmatrix}
h(x^{(i)})
\end{bmatrix} =\begin{bmatrix}
\theta_0\times x^{(i)}_0+\theta_1\times x^{(i)}_1+...+\theta_n\times x^{(i)}_n
\end{bmatrix}
$$
所以我们可以用$\begin{bmatrix}
1 & x^1_1 & x^1_2 & ... &x^1_m \\\\
1 & x^2_1 & x^2_2 & ... &x^2_m \\\\
... \\\\
1 & x^m_1 & x^m_2 & ... &x^m_n
\end{bmatrix}\begin{bmatrix}
\theta_0 \\\\
\theta_2 \\\\
... \\\\
\theta_n
\end{bmatrix}$来对样本进行批量计算。

## 分类
