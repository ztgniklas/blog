---
title: 使用Expo调试React Native出现手机无法连接的问题
date: '2021-11-24 12:19:56'
---
# 使用Expo调试React Native出现手机无法连接的问题

手机（android）上安装Expo Go app
电脑上使用Expo init创建react native project
运行npm start，启动Expo调试窗口
手机扫描二维码，试图连接电脑19000端口启动app
显示Network response timed out错误

checklist
- 手机与电脑没有连接同一网络
- 电脑防火墙阻止了手机访问19000端口

经排查，问题是防火墙导致的，打开19000端口成功解决问题。关于如何在Windows系统打开特定端口，可以参见