---
title: '修复/重装MS Store'
date: 2022-05-17 11:34:38
tags: [记录问题]
published: true
hideInList: false
feature: 
isTop: false
---
昨天在下载Ubuntu on windows 时，一直提示安装失败，然后我把Microsoft Store给卸载了...之后费了好大劲才装回来。

0. **使用管理员身份运行PowerShell**

1. **删除原来的微软Store**
   ```sh
   get-appxpackage *store* | remove-Appxpackage
   ```
2. **获取包的全名**
   ```sh
   Get-AppxPackage -allusers | Select Name, PackageFullName | select-string "WindowsStore"
   ```
执行完上边的指令之后，我们会得到以下的输出
@{Name=Microsoft.WindowsStore; PackageFullName=<span style="color:red;">Microsoft.WindowsStore_22204.1401.3.0_x64__8wekyb3d8bbwe</span>}

我们需要把上面红色的文字复制下来（**注意：请以个人电脑上的实际输出为准！**），这就是我们需要的包全名。

3. **安装**
   ```sh
   add-appxpackage -register "C:\Program Files\WindowsApps\<包全名>\AppxManifest.xml" -disabledevelopmentmode
   ```
把<包全名>替换成第2步复制的文本即可。

4. **结束**
等待一会儿之后就可以重新打开Microsoft Store了。
