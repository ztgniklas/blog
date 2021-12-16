---
title: 使用ffmpeg提取视频中的音频
date: '2021-05-19 00:0:52'
---
### 使用ffmpeg提取视频中的音频

```shell
ffmpeg -i input_video_name.mp4 -f mp3 -vn output_audio_name.mp3
```