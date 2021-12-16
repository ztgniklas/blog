---
title: 使用lrzsz工具包实现Windows和Linux之间文件传送
date: '2019-05-01 11:58:01'
tags:
- 工具
---

我们有时需要在Windows和Linux系统机之间传送文件，比如Windows宿主机上开启一个Linux系统的虚拟机，又比如向远程Linux服务器传送/接收文件。

可以使用ftp等工具实现这种需求，但是都比较麻烦。这里介绍使用Xshell和lrzsz实现一条命令传送文件的方法。
<!--more-->
首先用Xshell连接Linux系统机，安装lrzsz工具包：
~~~shell
yum install lrzsz
~~~

安装之后，运行命令rz，会弹出文件浏览框，就可选择文件传送到Linux系统机器中。

运行命令sz file则正好相反，会将Linux机器上的file文件传送至Windows主机上。

传送接收都是一条命令，结合图形化界面，使得文件传送变得十分便捷。