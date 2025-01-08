---
title: "curl: error setting certificate verify locations"
date: 2023-05-15 11:05:48
tags: [Linux]
---

# curl: error setting certificate verify locations

我的报错

```
curl: (77) error setting certificate verify locations:
    CAfile: /build/anaconda/pkg/anaconda/opt/anaconda/ssl/cacert.pem
    CApath: none
```

说明 CA 文件不在`/build/anaconda/pkg/anaconda/opt/anaconda/ssl/cacert.pem`这里, 
可以通过添加环境变量解决这个问题^[https://stackoverflow.com/questions/3160909/how-do-i-deal-with-certificates-using-curl-while-trying-to-access-an-https-url]

```sh
# CA File Path
export CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
