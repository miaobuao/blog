---
title: 'FastAPI完成跨域发送Cookie'
date: 2022-10-19 03:58:51
tags: [记录问题]
sticky: 1
---
这个问题搞到了凌晨四点，太气了，网上的都是不完整的！甚至错的！
前后端都要设置，才能完成跨域Cookie！


## 后端
```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['http://127.0.0.1:5173', "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age = 1,
)
```


origins必须指定，**不能为星号(*)**^[https://fastapi.tiangolo.com/tutorial/cors/]

`allow_credentials`必须是True

而且根据约定，我们必须在set-cookie时，**把SameSite设置为none**^[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie]

在fastapi里需要这样:
```py
@router.post("/login")
async def login(*,
        response: Response
):
    response.set_cookie("token", access_token, max_age=age, httponly=True, samesite='none')
```

注意是字符串none而不是None

但是在这种情况下就只能同时设置secure, 表示只能在Https中使用跨站设置cookie

## 前端

请求的时候必须把withCredentials 设置为true
例如我使用axios：
```js
import axios from "axios"
axios.defaults.withCredentials = true
```

## 为什么还没完!

虽然我们已经按照格式设置完了, 但是我们还是会看到后端设置的cookie被阻止了! 因为SameSite=None的时候, 浏览器不会报错 但是再devTools的网络里看到, cookie没有设置成功, 必须再设置一个Secure, ~~我说实话你要是没看我这篇文章, 估计要自己要琢磨好久(逃)~~
但是我们是本地环境, 浏览器里都是127.0.0.1或者localhost, 所以为了开ssl, 还需要安装一个软件
`mkcert : [https://github.com/FiloSottile/mkcert/releases](https://github.com/FiloSottile/mkcert/releases)
下载地址都给出来了 怎么用就不说了...反正windows就是双击运行 会把证书安装在电脑上, 还会再软件所在的目录下生成两个文件,一个是cert证书文件 一个是private key私钥
接下来我要说fastapi怎么用uvicorn开ssl了, 其他框架的可以退出了()

## 完结撒花 FastAPI开启HTTPS🌸

```python
# run.py
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host='0.0.0.0',
        port=8000, 
        reload=True, 
        ssl_keyfile="./localhost+1-key.pem", 
        ssl_certfile="./localhost+1.pem"
    )
```
新建一个run.py用来启动服务, 我把mkcert生成的两个文件复制到这里来了, 在最后三行写的就是他们的路径.
当然我们也可以用uvicorn指令启动..
```sh
uvicorn app.main:app --port 8011 --host 0.0.0.0 --reload \
    --ssl-keyfile ./privkey.pem \
    --ssl-certfile ./fullchain.pem
```
这指令你可不能直接用...因为我又给文件换了个名字 反正格式就是这样, ~~自己改去~~