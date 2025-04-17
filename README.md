# subMyGirl

## 简介：
随手搓的机翻字幕同步工具，用于将已有的 `.srt` 字幕文件同步显示到网页视频中。脚本支持本地加载字幕文件和从 GitHub 仓库在线获取已上传的机翻字幕文件。此项目完全**免费**、**开源**，**禁止商用**。

主观上来说，采用 whisper 识别 + Papago 机翻的机翻字幕文件的时间轴的对齐、断句及翻译的流畅程度明显优于 YouTube 自带识别 + 谷歌自动翻译和 Weverse 的付费识别。whisper 识别 + Papago 机翻的方法进行机翻的过程十分迅速，GPU 计算下的识别耗时通常只需要几分钟。若采用压制 + 发 B 站的方式发布翻译视频，则需浪费大量的时间在压制视频上。同时，视频发布需要等待 B 站审核，版权要求也容易导致稿件下架，因此使用最简单的实现方法开发了该脚本。只需要通过在浏览器（Edge 或 Chrome）安装[Tampermonkey](https://www.tampermonkey.net/)（油猴）插件并导入 `.js` 脚本，即可轻松扩展 subMyGirl 的字幕功能。

仓库中的字幕文件均采用 whisper 识别 + Papago 机翻的方法识别生成并由作者上传更新，已上传字幕的视频及链接可在文档最下的表格中找到，网络中可找到翻译资源的内容不做上传。
由于字幕存在github，如果出现加载不出的情况请开启科学:)

最后，祝欧买一够十周年快乐。

活好话不多  
_2025.04.17_

## 项目地址：  
[subMyGirl](https://github.com/Code-1123/subMyGirl)

## License

This project, **submygirl**, is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](http://creativecommons.org/licenses/by-nc-sa/4.0/) license.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

© 2025 活好话不多


## 已上传字幕
| 物料       | 时间       | 导航       |
|----------------|--------------------|--------------------|
| 10周年[oh my] girl直播  | 250410      | [链接](https://weverse.io/ohmygirl/live/3-196520185)      |
