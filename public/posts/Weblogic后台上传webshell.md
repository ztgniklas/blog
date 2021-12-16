---
title: Weblogic后台上传webshell
date: '2019-08-15 19:16:01'
tags:
- 渗透测试
- weblogic
---

典型弱密码 weblogic/Oracle@123 进入后台

<!--more-->

我们要上传的是war文件。war文件和jar文件一样，实际上就是压缩包，用解压缩工具解压即可。解压后在WEB-INF/weblogic.xml中将\<context-root>标签内容改成自己想要的目录名，比如/jspspy；在解压后的的主目录中添加webshell，比如jspspy.jspx。最后再压缩回去，把后缀名直接改为.war即可

进入后台

左边 域结构 --> 部署 --> 安装 --> 上载文件 --> 一路下一步

![7463220d.png](7463220d.png)

![7447597f.png](7447597f.png)

这样war包就安装成功了

![6e9b97d1.png](6e9b97d1.png)

地址框中输入url/jspspy/jspspy.jspx即可（密码是xxxxxx）

![3942ff3c.png](3942ff3c.png)