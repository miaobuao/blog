---
title: 'torch实现线性回归模型'
date: 2022-03-04 10:46:09
tags: [机器学习]
published: true
hideInList: false
feature: 
isTop: false
---
视频：[08 线性回归 + 基础优化算法【动手学深度学习v2】](https://www.bilibili.com/video/BV1PX4y1g7KC?p=3)

## 生成数据
```python
import torch

def synthetic_data(w, b, n_examples): # 生成数据集
    """生成 y = Xw + b + 噪声"""
    # X是符合均值为0，方差为1的正态分布， size为(n_examples, len(w))的矩阵
    X = torch.normal(0, 1, size=(n_examples, len(w)))
    y = torch.matmul(X, w) + b
    y += torch.normal(0, 0.01, y.shape)
    return X, y.reshape([-1, 1])

true_w = torch.tensor([2, -4.2])
true_b = 3.6

features,labels = synthetic_data(true_w, true_b, 1000)
print("features: ", features.size())
print("labels: ", labels.size())
```
```txt
features:  torch.Size([1000, 2])
labels:  torch.Size([1000, 1])
```

## 生成批量数据(batch)
```python
import random
def data_iter(batch_size, features, labels): # 生成batch(批量)数据的方法
    num_examples = len(features)
    indices = list(range(num_examples)) # 生成样本的下标
    random.shuffle(indices) # 打乱下标
    for i in range(0, num_examples, batch_size):
        batch_indices = torch.tensor(indices[i: min(i+batch_size, num_examples)])
        yield features[batch_indices], labels[batch_indices]
```

## 定义模型
```python
# 定义模型
def linreg(X, w, b):
    return torch.matmul(X, w) + b
```

## 随机梯度下降（SGD）
```python
def sgd(params, lr, batch_size):
    """小批量随机梯度下降方法"""
    with torch.no_grad():
        for param in params:
            param -= lr * param.grad / batch_size # 对参数进行优化
            '''
            因为是batch模式，一次输入了多个样本，所以param.grad是多个样本的累积梯度，
            因此要除以batch_size，才能得到正确的梯度
            参数的更新方法：
                参数 := 参数 - 学习率*梯度
            '''
            param.grad.zero_() # 梯度清零
```

## 均方损失函数
$$
L = \frac{1}{2} * (\hat{y} - y) ^ 2
$$
```python
def square_loss(y_hat, y):
    """均方损失函数"""
    return (y_hat - y) **2 / 2
```

## 训练模型
```python
EPOCHES = 10 # 数据集循环轮数
lr = 0.01 # learning rate 学习率
net = linreg # 线性回归模型
loss = square_loss
batch_size = 10
# 初始化参数
w = torch.normal(0, 0.01, size=(2, 1), requires_grad=True)
b = torch.zeros(1, requires_grad=True)

for i in range(EPOCHES):
    for X, y in data_iter(batch_size, features, labels):
        l = loss(net(X, w, b), y)
        '''
        计算出来的loss的shape是(batch_size, 1)，不是一个标量
        因此我们需要对loss求sum，再求梯度
        '''
        l.sum().backward()
        sgd([w, b], lr, len(X))
    with torch.no_grad():
        train_l = loss(net(features, w, b), labels)
        print("epoch %d, loss %f" % (i+1, float(train_l.mean()))) 
```
运行结果：
```txt
epoch 1, loss 2.347667
epoch 2, loss 0.326492
epoch 3, loss 0.045885
epoch 4, loss 0.006559
epoch 5, loss 0.000980
epoch 6, loss 0.000182
epoch 7, loss 0.000068
epoch 8, loss 0.000052
epoch 9, loss 0.000049
epoch 10, loss 0.000049
```


## 简洁实现

数据生成的方法是一样的，没有改动
```python
import torch

def synthetic_data(w, b, n_examples): # 生成数据集
    """生成 y = Xw + b + 噪声"""
    # X是符合均值为0，方差为1的正态分布， size为(n_examples, len(w))的矩阵
    X = torch.normal(0, 1, size=(n_examples, len(w)))
    y = torch.matmul(X, w) + b
    y += torch.normal(0, 0.01, y.shape)
    return X, y.reshape([-1, 1])

true_w = torch.tensor([2, -4.2])
true_b = 3.6

features,labels = synthetic_data(true_w, true_b, 1000)
print("features: ", features.size())
print("labels: ", labels.size())
```

batch的生成方式有所不同，这里使用torch的```DataLoader```进行处理

```python
from torch.utils.data import TensorDataset, DataLoader

def load_array(data_arrays, batch_size, is_train=True):
    dataset = TensorDataset(*data_arrays)
    return DataLoader(dataset, batch_size, shuffle=is_train)

batch_size = 10
data_iter = load_array([features, labels], batch_size)
```

torch里的```nn.Linear```就是我们需要用的线性回归模型，也叫```全连接层```
```python
from torch import nn
net = nn.Sequential(nn.Linear(2, 1)) # 创建模型，用到了torch的Sequential类，可以理解成模型的容器，里面其实可以放多个模型，构成复杂神经网络
# 初始化模型
net[0].weight.data.normal_(0, 0.01) # 设置w
net[0].bias.data.fill_(0) # 设置b
```

训练模型
```python
EPOCHES = 10
for i in range(EPOCHES):
    for X, y in data_iter:
        l = loss(net(X), y)
        trainer.zero_grad()
        l.backward()
        trainer.step()
    l = loss(net(features), labels)
    print("epoch %d, loss %f" % (i+1, l))
```
