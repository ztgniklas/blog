---
title: apt-get install 因为占用无法使用的解决方法
date: '2019-04-27 21:37:23'
tags: 
- 报错处理
---

Ubuntu使用 **apt-get install** 报错：

```shell
E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)
E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？
```
<!--more-->
##### 解决方法：
```shell
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
```

> 这两条命令可以写成sh脚本，以后再发生这种情况直接运行脚本即可