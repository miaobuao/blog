---
title: 'Uncaught (in promise) TypeError: Cannot read properties of null (reading ''isUnmounted'')'
date: 2023-01-18 11:37:25
tags: [开发]
published: true
hideInList: false
feature: 
isTop: false
---
```
Uncaught (in promise) TypeError: Cannot read properties of null (reading 'isUnmounted')
    at onVnodeUnmounted (vue-router.mjs:2428:37)
    at callWithErrorHandling (runtime-core.esm-bundler.js:157:22)
    at callWithAsyncErrorHandling (runtime-core.esm-bundler.js:166:21)
    at invokeVNodeHook (runtime-core.esm-bundler.js:7080:5)
    at Array.<anonymous> (runtime-core.esm-bundler.js:6131:30)
    at flushPostFlushCbs (runtime-core.esm-bundler.js:343:46)
    at flushJobs (runtime-core.esm-bundler.js:397:9)
onVnodeUnmounted @ vue-router.mjs:2428
callWithErrorHandling @ runtime-core.esm-bundler.js:157
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:166
invokeVNodeHook @ runtime-core.esm-bundler.js:7080
(匿名) @ runtime-core.esm-bundler.js:6131
flushPostFlushCbs @ runtime-core.esm-bundler.js:343
flushJobs @ runtime-core.esm-bundler.js:397
Promise.then(异步)
queueFlush @ runtime-core.esm-bundler.js:282
queuePostFlushCb @ runtime-core.esm-bundler.js:304
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1585
scheduler @ runtime-core.esm-bundler.js:1820
triggerEffect @ reactivity.esm-bundler.js:397
triggerEffects @ reactivity.esm-bundler.js:387
triggerRefValue @ reactivity.esm-bundler.js:1003
(匿名) @ reactivity.esm-bundler.js:1137
triggerEffect @ reactivity.esm-bundler.js:397
triggerEffects @ reactivity.esm-bundler.js:382
triggerRefValue @ reactivity.esm-bundler.js:1003
(匿名) @ reactivity.esm-bundler.js:1137
triggerEffect @ reactivity.esm-bundler.js:397
triggerEffects @ reactivity.esm-bundler.js:382
triggerRefValue @ reactivity.esm-bundler.js:1003
set value @ reactivity.esm-bundler.js:1048
finalizeNavigation @ vue-router.mjs:3334
(匿名) @ vue-router.mjs:3207
Promise.then(异步)
pushWithRedirect @ vue-router.mjs:3174
push @ vue-router.mjs:3099
handleChoose @ SideBar.vue:64
call @ call.js:6
doSelect @ Menu.js:158
handleClick @ MenuOption.js:32
vNode.props.<computed> @ Popover.js:29
onClick @ MenuOptionContent.js:66
callWithErrorHandling @ runtime-core.esm-bundler.js:157
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:166
invoker @ runtime-dom.esm-bundler.js:345
```
真是离谱妈妈给离谱小子开门 离谱到家了...

总之是路由出问题了, 错误的写法:
```js
{
    path: "/",
    name: "home",
    component: () => <h1>Hello World</h1>,
},
```
改成:
```js
{
    path: "/bbs",
    name: "bbs",
    component: () => import("@/views/BBSView.vue"),
}
```

也就是说, 不能在router里用jsx写法