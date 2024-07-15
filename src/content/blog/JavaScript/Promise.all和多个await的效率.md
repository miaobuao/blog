---
title: Promise.all和多个await的效率
date: 2024-06-02 02:24:21
tags: [JavaScript]
---

# Promise.all和多个await的效率

## 性能测试

笔者在项目中经常遇到需要同时开始多个异步任务的情况，但是不知道多个await和Promise.all的效率是否一样。

为此笔者写了以下的测试代码：

```js
function createTask(delay) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
}

async function test() {
  {
    const st = Date.now();
    for (let i = 0; i < 5; ++i) {
      await createTask(1000)();
    }
    const time = Date.now() - st;
    console.log("多个await，但是在await之前不启动任务：" + time);
  }
  {
    const st = Date.now();
    const tasks = Array.from({ length: 5 }).map(createTask(1000));
    for (const task of tasks) {
      await task;
    }
    const time = Date.now() - st;
    console.log("多个await，但是在await之前启动任务：" + time);
  }
  {
    const st = Date.now();
    const tasks = Array.from({ length: 5 }).map(createTask(1000));
    await Promise.all(tasks);
    const time = Date.now() - st;
    console.log("Promise.all: " + time);
  }
}

test();
```

最终输出：

```txt
多个await，但是在await之前不启动任务：5006
多个await，但是在await之前启动任务：1002
Promise.all: 1001
```

这表明：只要在await之前就执行了异步任务，那么使用多个await的效率跟Promise.all是一样的。

## 区别

虽然效率一样，但是使用Promise.all的时候，如果某一个任务失败了（抛出异常），那么其他没有执行完的任务会立马终止，这是因为Promise.all具有“快速失败”的行为^[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#description]。而多个await会将所有任务都执行完：

```js
function createTask(delay) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error()); // throw Error
      }, delay);
    });
}

async function test() {
  {
    const st = Date.now();
    for (let i = 0; i < 5; ++i) {
      await createTask(1000)().catch(() => {});
    }
    const time = Date.now() - st;
    console.log("多个await，但是在await之前不启动任务：" + time);
  }
  {
    const st = Date.now();
    const tasks = [createTask(1000)(), createTask(2000)(), createTask(3000)()];
    for (const task of tasks) {
      await task.catch(() => {});
    }
    const time = Date.now() - st;
    console.log("多个await，但是在await之前启动任务：" + time);
  }
  {
    const st = Date.now();
    const tasks = [createTask(1000)(), createTask(2000)(), createTask(3000)()];
    await Promise.all(tasks).catch(() => {});
    const time = Date.now() - st;
    console.log("Promise.all: " + time);
  }
}

test();
```

输出为：

```txt
多个await，但是在await之前不启动任务：5007
多个await，但是在await之前启动任务：3001
Promise.all: 1001
```
