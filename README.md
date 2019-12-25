# artest

# AR技术概述
基于AR.js和three.js结合进行的3D渲染、
其中AR部分：核心AR库使用到开源的artoolkit5，通过封装改进可以更好的应用于Web端包括手机端Android和ios。
基本原理：
摄像头获取的实时视频去识别一个的特殊图像（AR标记），识别成功时会在视频之上展现Threejs构建3D场景和物体动画。
限制：
•	 3D建模模型的面，模型的复杂度，面越多，模型越大，加载所需开销就越大
•	Android设备版本要求Android4以上
•	 IOS设备要求IOS11及其以上
•	 除此之外，针对于微信app，IOS设备需要用户跳出微信app，转至浏览器Safari观看
•	

 IOS用户分享请自行使用原生浏览器分享
参考见：
①	https://ngd.lxustudio.cn/ 

②	To try it on your phone, it is only 2 easy steps, check it out!
1.	

Open this hiro marker image in your desktop browser. 


2.	

Open this augmented reality webapps in your phone browser, and point it at your screen. 

技术障碍：
1.	AR标记 需要如上图所示（可进行一些修改） 由于是前端实时抓取摄像头画面帧，通过分析处理当前帧具体像素匹配标识码，那么过于复杂的标记方法（例如，特征点计算和训练图形等），在前端计算能力不足，以至于3D展现部分性能不足。

其他方法：
1.	前端将视频流传到给后端，后端在进行处理 前端提供每秒多大的图片给后端处理 后端也是使用现有的ar供应商的api
2.	我们可提供建模动画效果但集装到app上需要另外合作ar供应商案例参考：http://www.sightp.com/case/107.html


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
