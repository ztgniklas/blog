---
title: C语言中argc和argv的含义
date: '2019-08-07 19:32:23'
tags:
- C
---

> C语言主函数：

~~~C
int main(int argc, char** argv);
~~~
其中，argc为传入参数个数，argv是具体的参数。

> 具体含义：

<!--more-->

一个程序test.exe，在命令行中输入
~~~shell
> test.exe c:\a.txt hhh
~~~
则 argc = 3， 且：
argv[0] = "test.exe"
argv[1] = "c:\a.txt"
argv[2] = "hhh"

> 注意：如果路径名包含空格，整体需要用引号包含。如"C:\Program Files\xxx"
