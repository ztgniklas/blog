---
title: 一次google hacking的实践：登录学生账号
date: '2019-08-14 10:42:56'
tags:
- google hacking
- 社工
---

> ### 使用google hacking语法

<!--more-->

~~~
site:xxx.edu.cn intext:身份证号
~~~

> ### 找到xxx大学官网上展示的身份证号信息，比如

![861ecbd6.png](861ecbd6.png)

> ### 身份证信息并未打码（可能本来也不能打码）

![273bac80.png](273bac80.png)

> ### 打开xxx大学的统一身份认证平台。一般口令都是学号/身份证后6位，随便尝试一个，直接可以登入（吐槽一句：这不同大学的身份认证界面都一模一样的就换个背景...）：

![eedd9142.png](eedd9142.png)

![a35b1ee4.png](a35b1ee4.png)

> ### 随便看看，一位学霸的成绩单就这样展现在我面前 Orz

![776cef00.png](776cef00.png)

> ### 总结

没什么用，好玩而已...建议不要使用任何默认密码