---
title: 'Quasar v2使用Jsx或Tsx'
date: 2023-02-23 22:00:11
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
真是坑啊~~
遇到的问题就是版本不对, 总之一个版本一个版本试过去终于还是行了.

我Quasar的版本:

```txt
 » Pkg quasar............. v2.11.6
 » Pkg @quasar/app-vite... v1.2.0
 ```

需要安装`@vitejs/plugin-vue-jsx`, 但是必须要选择适合的版本, 测试之后发现只有1.3.10版本可以用.
```sh
npm i @vitejs/plugin-vue-jsx@1.3.10
```
如果使用更高的版本在下一步会报错

然后修改quasar.config.js.

在开头要加上
```js
const vueJsx = require("@vitejs/plugin-vue-jsx");
```

然后修改build>extendViteConf
```js
extendViteConf(viteConf) {
    viteConf.plugins.push(vueJsx());
}
```

如果使用更高的版本就会告诉你vueJsx不是个函数.

然后就可以愉快使用jsx了!
```js
import { defineComponent } from "vue";

export default defineComponent(() => {
	return () => <p>1</p>;
});
```