---
title: Linux Nvidia依赖包导致 Unmet dependencies 报错
date: '2019-04-22 21:37:20'
tags: 
- 报错处理
---

Linux Mint 64位机器上运行apt install报错：
```shell
$ sudo apt insall 任意软件
... ...
The following packages have unmet dependencies:
 libnvidia-ifr1-390 : Depends: libnvidia-gl-390 but it is not going to be installed
 nvidia-driver-390 : Depends: libnvidia-gl-390 (= 390.87-0ubuntu0~gpu18.04.1) but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```
<!--more-->
这一问题导致机器无法安装任何软件，目测是由于nvidia的相关依赖包导致。且运行`sudo apt-get remove --purge nvidia-*`等命令都会报类似错误。

##### 可能的解决办法
运行`sudo dpkg --force-all -P nvidia-` nvidia-后跟你的版本，比如在我这里是nvidia-390。

然后把报错信息里的依赖包驱动等一并删除。比如：
```shell
sudo dpkg --force-all -P nvidia-driver-390
sudo dpkg --force-all -P libnvidia-ifr1-390
```

输入`nvidia-smi`等命令查看GPU状态等，似乎并未受到影响，但是apt install已经可以正常安装软件包了（很迷...）