---
title: Linux Error mounting can't read superblock 问题解决
date: '2019-04-24 14:49:32'
tags: 
- 报错处理
mathjax: true
---

在服务器 (运行Linux Mint 64位) 断电重启后，一块硬盘mount失败，报错信息：
$$Error\ mounting: mount: /dev/sda1: can't\ read\ superblock\ on\ ...$$
<!--more-->
一种可能的解决方法是通过**fsck**命令检查并修复分区 (将/dev/sda1改为你自己加载出错的分区):
```shell
$ sudo fsck /dev/sda1
fsck from util-linux 2.31.1
e2fsck 1.44.1 (24-Mar-2018)
data: recovering journal
JBD2: Invalid checksum recovering block 2 in log
JBD2: Invalid checksum recovering block 2 in log
JBD2: Invalid checksum recovering block 3 in log
JBD2: Invalid checksum recovering block 3 in log
JBD2: Invalid checksum recovering block 8 in log
JBD2: Invalid checksum recovering block 9 in log
JBD2: Invalid checksum recovering block 20 in log
JBD2: Invalid checksum recovering block 28 in log
JBD2: Invalid checksum recovering block 34 in log
JBD2: Invalid checksum recovering block 40 in log
JBD2: Invalid checksum recovering block 41 in log
JBD2: Invalid checksum recovering block 42 in log
JBD2: Invalid checksum recovering block 46 in log
JBD2: Invalid checksum recovering block 48 in log
Journal checksum error found in data
data was not cleanly unmounted, check forced.
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
Free blocks count wrong (478028754, counted=397389365).
Fix<y>? yes
Free inodes count wrong (121487349, counted=121455392).
Fix<y>? yes

data: ***** FILE SYSTEM WAS MODIFIED *****
data: 31968/121487360 files (0.1% non-contiguous), 88548043/485937408 blocks
```
修复后硬盘又重新加载了。