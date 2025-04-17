// ==UserScript==
// @name         subMyGirl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  机翻.srt字幕文件同步显示
// @author       活好话不多
// @match        https://www.youtube.com/watch*
// @match        https://weverse.io/*
// @license      CC BY-NC-SA 4.0
// @grant        none
// @updateURL    https://code-1123.github.io/subMyGirl/subMyGirl.user.js
// @downloadURL  https://code-1123.github.io/subMyGirl/subMyGirl.user.js
// ==/UserScript==

/**
 * 版权声明 | Copyright Notice
 *
 * 本脚本版权归作者所有，仅供学习与个人使用，禁止任何形式的商业用途。
 * 采用“署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)”许可协议。
 * 如需使用本脚本进行非个人用途，请联系作者取得授权。
 *
 * This script is copyrighted by the author and is provided solely for learning and personal use.
 * Commercial use in any form is strictly prohibited.
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).
 * For non-personal or commercial usage, please contact the author for permission.
 *
 * License URL:
 * https://creativecommons.org/licenses/by-nc-sa/4.0/
 */

(function () {
    'use strict';

    // CSS
    const style = document.createElement('style');
    style.textContent = `
    #myFloatingBox {
        position: fixed;
        top: 0px;
        right: 200px;
        width: 250px;
        height: 250px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 1px solid #aaa;
        border-radius: 8px;
        padding: 10px;
        z-index: 99999;
        resize: both;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        cursor: default;
        backdrop-filter: blur(4px);
    }

    #myFloatingBox button {
        position: absolute;
        width: 75px;
        height: 25px;
        background: rgba(192, 240, 234, 0.7);
        font-size: 12px;
        border: none;
        text-align: center;
        border-radius: 8px;
        transition: background 0.3s ease;
    }

    #myFloatingBox button:hover {
    background: rgba(72, 205, 184, 0.7);
    }

    #myFloatingBox button:active {
    background-color: rgba(72, 205, 184, 1);
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }

    #subtitleDisplay {
        position: fixed;
        bottom: 25%;
        left: 50%;
        height: 32px;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.7);
        color: black;
        padding: 6px 15px;
        font-size: 22px;
        border-radius: 8px;
        z-index: 99999;
        max-width: 80%;
        text-align: center;
        white-space: pre-wrap;
        cursor: move;
        user-select: none;
    }

    #myFloatingBox::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: url('https://code-1123.github.io/subMyGirl/background.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.5;
        z-index: -1;
        border-radius: 8px;
    }
    `;
    document.head.appendChild(style);

    // box
    const box = document.createElement('div');
    box.id = 'myFloatingBox';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.srt';
    fileInput.style.display = 'none';

    // box缩小
    let originalBoxStyle = {};

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '－';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '5px';
    minimizeButton.style.right = '5px';
    minimizeButton.style.width = '20px';
    minimizeButton.style.height = '20px';
    minimizeButton.style.fontSize = '14px';
    minimizeButton.style.padding = '0';
    minimizeButton.style.background = 'rgba(255,255,255,0.6)';
    minimizeButton.style.border = '1px solid #ccc';
    minimizeButton.style.borderRadius = '50%';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.zIndex = '99999';

    box.appendChild(minimizeButton);

    // 图标
    const restoreIcon = document.createElement('div');
    restoreIcon.textContent = '还原';
    restoreIcon.style.position = 'fixed';
    restoreIcon.style.bottom = '20px';
    restoreIcon.style.right = '20px';
    restoreIcon.style.width = '100px';
    restoreIcon.style.height = '30px';
    restoreIcon.style.background = 'rgba(192,240,234,1)';
    restoreIcon.style.borderRadius = '50%';
    restoreIcon.style.display = 'none';
    restoreIcon.style.alignItems = 'center';
    restoreIcon.style.justifyContent = 'center';
    restoreIcon.style.textAlign = 'center';
    restoreIcon.style.lineHeight = '30px';
    restoreIcon.style.fontSize = '18px';
    restoreIcon.style.zIndex = '99999';
    restoreIcon.style.cursor = 'pointer';
    document.body.appendChild(restoreIcon);

    // 最小化
    minimizeButton.addEventListener('click', () => {
        originalBoxStyle = {
            display: box.style.display,
            width: box.style.width,
            height: box.style.height,
            top: box.style.top,
            left: box.style.left,
            right: box.style.right,
        };
        box.style.display = 'none';
        restoreIcon.style.display = 'flex';
    });

    // 还原
    restoreIcon.addEventListener('click', () => {
        box.style.display = originalBoxStyle.display || 'block';
        box.style.width = originalBoxStyle.width || '250px';
        box.style.height = originalBoxStyle.height || '250px';
        box.style.top = originalBoxStyle.top || '0px';
        box.style.left = originalBoxStyle.left || '';
        box.style.right = originalBoxStyle.right || '200px';
        restoreIcon.style.display = 'none';
    });


    // 本地加载
    const loadButton = document.createElement('button')
    loadButton.textContent = '本地字幕';
    loadButton.style.left = '10px';
    loadButton.style.top = '55px';
    loadButton.addEventListener('click', function(){
        fileInput.click();
    });

    box.appendChild(loadButton)
    box.appendChild(fileInput);
    document.body.appendChild(box);

    //在线加载
    const loadOnlineButton = document.createElement('button');
    loadOnlineButton.textContent = '在线字幕';
    loadOnlineButton.style.top = '55px';
    loadOnlineButton.style.left = '95px';
    loadOnlineButton.addEventListener('click', async () => {
        try {
            const response = await fetch('https://code-1123.github.io/subMyGirl/subs.json');
            const mappings = await response.json();

            const currentURL = window.location.href;
            const match = mappings.find(item => item.url === currentURL);

            if (!match) {
                alert('未找到匹配的字幕文件');
                return;
            }

            const srtUrl = 'https://code-1123.github.io/subMyGirl' + match.srt;
            const srtResponse = await fetch(srtUrl);
            if (!srtResponse.ok) throw new Error('字幕文件加载失败');

            const srtText = await srtResponse.text();
            subtitleList = parseSRT(srtText);
            alert('在线字幕加载完成，共 ' + subtitleList.length + ' 条');

        } catch (error) {
            console.error('加载字幕出错:', error);
            alert('字幕加载失败ㅠㅠ');
        }
    });
    box.appendChild(loadOnlineButton);

    // 帮助文档
    const helpDocument = document.createElement('button')
    helpDocument.textContent = '字幕&帮助'
    helpDocument.style.top = '55px';
    helpDocument.style.left = '180px';

    helpDocument.addEventListener('click', () => {
        window.open('https://github.com/code-1123/subMyGirl/blob/main/README.md', '_blank');
    });

    // 添加代码

    box.appendChild(helpDocument);

    // 字幕区
    const subtitleDiv = document.createElement('div');
    subtitleDiv.id = 'subtitleDisplay';
    document.body.appendChild(subtitleDiv);
    subtitleDiv.style.display = 'none';

    // 字幕区可拖动
    (function makeDraggable(el) {
        let isDragging = false, offsetX = 0, offsetY = 0;

        el.addEventListener('mousedown', function (e) {
            if (e.target !== fileInput) {
                isDragging = true;
                offsetX = e.clientX - el.offsetLeft;
                offsetY = e.clientY - el.offsetTop;
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                el.style.left = (e.clientX - offsetX) + 'px';
                el.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });
    })(subtitleDiv);

    // 解析SRT
    function parseSRT(srtText) {
        const entries = [];
        const lines = srtText.split(/\r?\n/);
        let i = 0;

        while (i < lines.length) {
            i++; // 序号行
            const timeLine = lines[i++];
            if (!timeLine) continue;

            const [startStr, endStr] = timeLine.split(' --> ');
            const start = parseTime(startStr);
            const end = parseTime(endStr);

            let text = '';
            while (i < lines.length && lines[i]) {
                text += lines[i++] + '\n';
            }
            i++; // 空

            entries.push({
                start,
                end,
                text: text.trim()
            });
        }
        return entries;
    }

    function parseTime(timeStr) {
        const [h, m, s] = timeStr.split(':');
        const [sec, ms] = s.split(',');
        return (
            parseInt(h) * 3600 +
            parseInt(m) * 60 +
            parseInt(sec) +
            parseInt(ms) / 1000
        );
    }

    let subtitleList = [];

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            const srtText = e.target.result;
            subtitleList = parseSRT(srtText);
            console.log('字幕加载完成，条数：', subtitleList.length);
        };
        reader.readAsText(file);
    });

    // 显示字幕
    setInterval(() => {
        const video = document.querySelector('video');
        if (!video || subtitleList.length === 0) return;

        const currentTime = video.currentTime;

        const currentSub = subtitleList.find(
            sub => currentTime >= sub.start && currentTime <= sub.end
        );
        if (currentSub) {
            subtitleDiv.textContent = currentSub.text;
            subtitleDiv.style.display = 'block';
        } else {
            subtitleDiv.textContent = '';
            subtitleDiv.style.display = 'none';
        }
        //subtitleDiv.textContent = currentSub ? currentSub.text : '';
    }, 300);

    // 全屏
    let originalLeft = '';
    let originalTop = '';
    document.addEventListener('fullscreenchange', () => {
        const subtitleDiv = document.getElementById('subtitleDisplay');
        if (!subtitleDiv) return;
        //
        const fsElement = document.fullscreenElement;
        if (fsElement) {
            originalLeft = subtitleDiv.style.left;
            originalTop = subtitleDiv.style.top;
            fsElement.appendChild(subtitleDiv);
            subtitleDiv.style.position = 'fixed';
        } else {
            subtitleDiv.style.left = originalLeft;
            subtitleDiv.style.top = originalTop;
            document.body.appendChild(subtitleDiv);
            subtitleDiv.style.position = 'fixed';
        }
    });

})();