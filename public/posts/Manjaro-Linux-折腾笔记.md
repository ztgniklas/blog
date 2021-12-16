---
title: Manjaro Linux 折腾笔记
date: '2019-08-05 20:00:38'
tags:
- Linux
- 工具
---

> #### 0x00 前言

一直在尝试各种Linux的桌面发行版，常用的Ubuntu、CentOS自不必说，像国内口碑不错的Deepin，还有Mint、openSUSE都挨个试用了一遍。

这次安装了号称最受欢迎的发行版Manjaro Linux。它的优势在于很多在Ubuntu等发行版上装起来很麻烦的软件比如qq等都能一条命令之间完成安装。

<!--more-->

> #### 0x01 安装版本

manjaro-xfce-18.0.4-stable-x86_64

> #### 0x02 安装方式

安装方式使用u盘安装。有一点需要注意的是用Rufus等工具将系统镜像写入U盘时要选择以 **DD 模式**，而非推荐的那个模式，否则安装时grub引导会出问题。

> #### 0x03 配置国内源

排列国内源，会弹出图形界面，选择一个速度最快的：
~~~shell
sudo  pacman-mirrors -i -c China -m rank
~~~

更新源列表，正常情况你会发现更新的速度是很快的，否则可以尝试更换其他源：
~~~shell
sudo pacman -Syyu
~~~

> #### 0x04 安装必要软件包

安装archlinuxcn-keyring。**这个一定先装好**，否则后面安装其他软件是会出现密钥损坏等一系列问题：
~~~shell
sudo pacman -S archlinuxcn-keyring
~~~

安装yaourt，这个可选：
~~~shell
sudo pacman -S yaourt
~~~

安装gedit，这个也可选：
~~~shell
sudo pacman -S gedit
~~~

安装搜狗拼音输入法：
~~~shell
sudo pacman -S fcitx-sogoupinyin
sudo pacman -S fcitx-im
sudo pacman -S fcitx-configtool
~~~

然后使用gedit或其他文本编辑器打开~/.xprofile：
~~~shell
sudo gedit ~/.xprofile
# 输入如下内容
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
~~~

**注销，重新登录**，点击右下键盘标志应该就能切换到拼音输入法了。

安装QQ、TIM在Manjaro中就是一条命令的事：
~~~shell
yaourt -S deepin.com.qq.im #QQ
yaourt -S deepin.com.qq.office #TIM
~~~

安装WPS：
~~~shell
sudo pacman -S wps-office
sudo pacman -S ttf-wps-fonts
~~~

卸载LibreOffice：
~~~shell
sudo pacman -Rs libreoffice-fresh
# 或者
sudo pacman -Rs libreoffice-still
~~~

当然，安装/卸载软件也可通过Manjaro提供的图形化管理界面直接操作。

> #### 0x05 结语

这些就是一些简单的配置，更深的东西还留待以后发掘。

系统装在了13年的老笔记本上，和Windows7共存。但是根据短暂的使用体验来看，Manjaro即使使用了轻量的Xfce桌面还不如Windows7流畅（仅个人体验）...