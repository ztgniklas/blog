---
title: 使用frp内网穿透并远程连接Jupyter Notebook
data: '2019-04-21 17:23:00'
tags:
- 工具
categories:
---

> #### 0x00 准备工作

用实验室的服务器（Linux Mint 64位，桌面版）做机器学习的相关工作。一开始通过Teamviewer连接，但感觉到有诸多不便。因为主要使用的是Jupyter Notebook，所以想通过远程连接Jupyter然后直接在自己的电脑上进行操作。

而远程连接需要服务器有公网IP，实验室这台服务器只有内网IP：
```shell
$ ifconfig
enp5s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.103  netmask 255.255.255.0  broadcast 192.168.1.255
        ... ...
```
因此选择用frp先进行内网穿透。其原理大致如下图：
<!--more-->
![frp structure](9e9dd039.png)

由图可知，我们需要一台具有公网IP的服务器作为中转。从[Releases/frp · GitHub](https://github.com/fatedier/frp/releases)页面可以下载最新版本的frp程序。将 frps 及 frps.ini 放到公网 IP 的中转服务器上，将 frpc 及 frpc.ini 放到处于内网环境的服务器上。

根据上面的示意图依次设置端口等信息。

> #### 0x01 配置frps

这里作为示例，对于中转的公网服务器上，修改frps.ini内容：
```shell
# frps.ini
[common]
bind_port = 7000
vhost_http_port = 80
```
意思是设置公网的机器通过访问中转服务器80端口的http服务来运行内网服务器应用（本例中是Jupyter Notebook），使用7000端口监听内网服务器运行的web服务。这里有一点需要注意的是，一些云服务提供商比如阿里云固定http服务监听80端口，而且自带防火墙设置，所以在自己的服务器上单独设置可能没有效果。如阿里云可以进入管理控制台进行设置：
![Aliyun control](194a93f5.png)

然后运行frps：
```shell
$ ./frps -c ./frps.ini
```
可以用screen让其在后台保持运行：
```shell
$ sudo apt install screen
$ screen ./frps -c ./frps.ini
```

> #### 0x02 配置frpc

接下来在内网服务器打开frpc.ini设置frpc：
```shell
# frpc.ini
[common]
server_addr = 公网服务器IP
server_port = 7000

[web]
type = http
local_port = 8080
custom_domains = 公网服务器IP或绑定域名
```
这里的server_port要与上面frps.ini中的bind_port一致。local_port是web服务（这里是Jupyter Notebook）监听的本地端口，后面要设置，作为示例设为8080，server_addr和custom_domains都可以填中转服务器的IP地址，对于后者如果要填自己的域名，一定要保证域名已经解析到中转服务器的IP，而且国内服务器的话域名要通过备案，否则会出现意想不到问题（很坑~）。在设置时因为都是我一个人用而且浏览器有记忆提示功能，所以统一设成了IP地址。

同理，启动frpc：
```shell
$ ./frpc -c ./frpc.ini
```

> #### 0x03 配置Jupyter Notebook

到这一步，如果没有报错，说明frp已经成功运行。就像原理图所示，此时具有公网IP的中转服务器的7000端口已经不断监听内网服务器的8080端口，并准备通过80端口把内网的应用暴露在公网上供访问。接下来要做的就是在内网服务器的8080端口上运行应用。

对于Jupyter Notebook，生成配置文件jupyter_notebook_config.py：
```shell
$ jupyter notebook --generate-config
```

编辑配置文件~/.jupyter/jupyter_notebook_config.py，将其中的几行取消注释，如果找不到也可以直接添加：
```shell
c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.port = 8080
```
其中c.NotebookApp.port的值要与frpc_ini中的local_port一致。事实上作为外网访问，应该为Jupyter Notebook设置访问密码以保证安全性。读者可以搜索相关资料，这里就不做进一步说明了。

有访问密码的界面：
![password required](4c45a1c6.png)

> #### 0x04 运行效果

最后，运行Jupyter Notebook：
```
$ jupyter notebook
```

从自己的电脑上访问中转服务器的IP地址（或域名）或者加上端口，如x.x.x.x:80，如果返回Jupyter Notebook的界面说明大功告成。
![success](c53bcf83.png)

> #### 0x05 结语

我们通过使用frp实现了内网穿透，让外网的机器得以远程连接内网环境的服务器上运行的应用。我们使用的是http服务，当然通过修改配置可以改为https。内网穿透存在一定的安全隐患，frp也提供了一些机制使我们能够安全地暴露内网服务。同时，frp也有很多其他用途和技巧，所有的这些都可以在frp的[文档](https://github.com/fatedier/frp/blob/master/README_zh.md)中查看。

