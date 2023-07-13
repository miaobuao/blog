---
title: 'uvicorn: 相对导入问题'
date: 2023-01-18 11:45:51
tags: [记录问题]
published: true
hideInList: false
feature: 
isTop: false
---
应用结构:
```
.
├── app     # ①: 应用所在文件夹
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   └── routers
│   │   ├── __init__.py
│   │   ├── items.py
│   │   └── users.py
│   └── internal
│       ├── __init__.py
│       └── admin.py
```

错误的:
```sh
uvicorn main:app
```

正确的:
```sh
cd ..
uvicorn app.main:app
```
app.main:app, 第一个app表示应用所在文件夹的名称(①)
也就是说你必须要退出去一个目录才可以...