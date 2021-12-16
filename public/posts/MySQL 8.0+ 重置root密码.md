---
title: MySQL 8.0+ 重置root密码
date: '2019-08-03 20:00:12'
tags:
- Linux
- 工具
---
###  MySQL 8.0+ 重置root密码

#### 0x00 修改my.ini
找到mysql安装目录下的my.ini文件，在[mysqld]下加入skip-grant-tables，如下：
```
[mysqld]
# 绕过密码登录
skip-grant-tables
...
```

#### 0x01 重启MySQL服务
```shell
net stop mysql
net start mysql
```
或者用其他方式（如linux系统的一些命令）

#### 0x02 免密登入root帐户
```shell
mysql -u root -p
```
密码不用输直接回车即可进入mysql控制台

#### 0x03 重置密码
先把root密码置空，MySQL 5.7之前 authentication_string要改成password字段
```shell
use mysql;
update user set authentication_string='' where user='root';
```

设置新密码
```shell
alter user 'root'@'localhost' identified by 'your_new_pwd';
```

在 MySQL 8.0之前的命令是：
```shell
update user set password=password('your_new_pwd') where user='root';
```

#### 0x04 删除skip-grant-tables字段

#### 0x05 重启MySQL服务，使用新密码登入即可