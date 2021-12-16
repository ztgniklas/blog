---
title: Linux文本处理相关命令
date: '2019-04-30 16:59:31'
tags:
- Linux
- 文本处理
---

由于项目中要处理一些大的文本文件（最大可达100G），用python的命令去处理就会很慢，后来看到Linux本身自带的命令就可以做文本处理的相关工作，而且据说所使用的算法比KMP还要快3-5倍，非常适合大文本的处理工作。

一些命令的功能极其强大，这里就只记录一些实际使用中我所用到的简单的用法。
<!--more-->
**统计行数**
wc -l file

**去除重复行**
sort file | uniq 加-c 对重复次数进行统计

**将file中长度大于5（不算换行符）的行删除**
cat file | egrep -w '^.{1,5}' file

**将处理后的结果保存在file文件中，而不是打印在屏幕上**
\> file 

**输出2中1没有的内容(2-1)**
grep -v -f 1.txt 2.txt 
comm -13 1.txt 2.txt （建议用这个）

**输出file中前/末n行**
cat file | head/tail -n 

**打印file第99行**
sed -n '99p;100q' file

**打印文件第5-10行**
sed -n '5,10p' filename 

**文档合并**
cat file1 file2 ... > file

**grep的一些注意点**
egrep = grep -E
fgrep = grep -F
grep和egrep会匹配正则表达式，如果视要处理的文本的内容为普通的字符串可以使用fgrep

**截取文件file文件的第1列和第三列，以:分割取其中的第一列和第三列（起始为第一列），默认分隔符为\t**
cut -d  ":"  -f 1,3 file

cut -b 42- test.txt > ll.txt

**随机打乱文件所有行**
shuf input_file.txt -o output_file.txt