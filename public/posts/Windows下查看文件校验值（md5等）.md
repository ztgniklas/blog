---
title: Windows下查看文件校验值（md5等）
date: '2019-08-01 12:14:33'
tags:
- Windows
---

Windows系统中自带计算文件校验值的函数。在命令行中输入以下命令即可：

```shell
> certutil -hashfile filename MD5
> certutil -hashfile filename SHA1
> certutil -hashfile filename SHA256
```
