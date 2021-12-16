---
title: unicode转中文的python代码
date: '2019-08-02 12:07:55'
tags:
- python
- 编码转换
---
~~~python
>>> s = '\\\u5730\\\u5740\\\u952e\\\u503c\\\u5bf9\\\u4fe1\\\u606f'
>>> s.encode('utf-8').decode('unicode_escape')
'地址键值对信息'
~~~

> 注意unicode要改成双反斜杠来转义