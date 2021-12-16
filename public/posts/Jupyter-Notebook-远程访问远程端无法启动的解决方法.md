---
title: Jupyter Notebook 远程访问远程端无法启动的解决方法
date: '2019-04-21 21:30:03'
tags: 
- 报错处理
---

按照网络上设置jupyter notebook 远程访问（可参考https://blog.csdn.net/simple_the_best/article/details/77005400 ）的方法修改 ~/.jupyter/jupyter_notebook_config.py 后，再次启动 jupyter notebook 报错：
<!--more-->
``` shell
$ jupyter notebook
Traceback (most recent call last):
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/traitlets/traitlets.py", line 528, in get
    value = obj._trait_values[self.name]
KeyError: 'allow_remote_access'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 864, in _default_allow_remote
    addr = ipaddress.ip_address(self.ip)
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/ipaddress.py", line 54, in ip_address
    address)
ValueError: '' does not appear to be an IPv4 or IPv6 address

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/bin/jupyter-notebook", line 11, in <module>
    sys.exit(main())
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/jupyter_core/application.py", line 266, in launch_instance
    return super(JupyterApp, cls).launch_instance(argv=argv, **kwargs)
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/traitlets/config/application.py", line 657, in launch_instance
    app.initialize(argv)
  File "<decorator-gen-7>", line 2, in initialize
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/traitlets/config/application.py", line 87, in catch_config_error
    return method(app, *args, **kwargs)
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 1628, in initialize
    self.init_webapp()
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 1378, in init_webapp
    self.jinja_environment_options,
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 159, in __init__
    default_url, settings_overrides, jinja_env_options)
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 252, in init_settings
    allow_remote_access=jupyter_app.allow_remote_access,
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/traitlets/traitlets.py", line 556, in __get__
    return self.get(obj, cls)
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/traitlets/traitlets.py", line 535, in get
    value = self._validate(obj, dynamic_default())
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/site-packages/notebook/notebookapp.py", line 867, in _default_allow_remote
    for info in socket.getaddrinfo(self.ip, self.port, 0, socket.SOCK_STREAM):
  File "/home/chenyanjiao/anaconda3/envs/pwdgs/lib/python3.6/socket.py", line 745, in getaddrinfo
    for res in _socket.getaddrinfo(host, port, family, type, proto, flags):
socket.gaierror: [Errno -2] Name or service not known
```
##### 一个可能的解决办法
将配置文件的``` c.NotebookApp.ip='*' ```改成``` c.NotebookApp.ip='0.0.0.0' ```
