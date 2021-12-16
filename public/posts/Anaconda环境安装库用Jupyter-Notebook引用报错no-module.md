---
title: Anaconda环境安装库用Jupyter Notebook引用报错no module
date: '2019-05-03 14:16:41'
tags:
- 工具
- python
mathjax: true
---

在Anaconda创建的环境下安装库后，命令行直接import是成功的，但是使用Jupyter Notebook后import却报错：
$ImportError:\ No\ module\ named\ 'xxx'$
<!--more-->
##### 解决方法
打开Anaconda安装目录，比如D:\Anaconda3，进入D:\Anaconda3\Lib\site-packages；

再打开你安装该库的的环境的文件夹，比如环境名叫myenv、库名xxx，则打开D:\Anaconda3\envs\myenv\Lib\site-packages；

在其中找到xxx的文件夹（应该有两个），拷贝到第一个文件夹中，再尝试import xxx。如果报错没有找到其它包，就按照同样的方法将第二个文件夹中的这个包名文件夹拷贝到第一个文件夹中，一直到不报错为止。