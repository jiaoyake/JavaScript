# JS进阶

## 1.星星海特效

### 自定义动画

```
animation: flash 0.5s alternate infinite;
/*自定义动画*/
@keyframes flash {
	0%{opcity: 0;}
	100%{opcity: 1;}
}
//延迟执行
start.style.animationDelay = delay + 's';
```

### 代码

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        body{
            background-color: #000;
        }
        span{
            width: 70px;
            height: 70px;
            background: url('img/star.jpg') no-repeat;
            position: absolute;
            background-size: 100% 100%;
            animation: flash 1s alternate infinite;
        }
        @keyframes flash {
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
        span:hover{
            transform: rotate(180deg) scale(2) !important;
            transition: all 1s;
        }
    </style>
```

```javascript
    <span></span>
    <script>
        //屏幕宽高
        var screenW = document.documentElement.clientWidth;
        var screenH = document.documentElement.clientHeight;
        for(var i=0;i<=180;i++){
            //创建星星
            var span = document.createElement('span');
            document.body.appendChild(span);
            //坐标
            var x = parseInt(Math.random() * screenW);
            var y = parseInt(Math.random() * screenH);
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            //随机缩放
            var scale = Math.random() * 1.5;
            span.style.transform = 'scale( '+ scale +', '+ scale +' )';
            //频率
            var rate = Math.random() * 1.5;
            span.style.animationDelay = rate + 's';
        }
    </script>
```

## 2.照片墙特效

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }
        img{
            width: 360px;
            height: 250px;
        }
        html, body, ul{
            width: 100%;
            height: 100%;
        }
        #ps{
            position: relative;
        }
        #ps li{
            width: 360px;
            height: 250px;
            box-shadow: 0 0 10px #000;
            transition: all 1s;
            position: absolute;
        }
        #ps li.active{
            left: 50% !important;
            top: 50% !important;
            transform: rotate(0deg) translate(-50%, -50%) scale(1.2) !important;
            z-index: 99 !important;
        }
    </style>
```

```javascript
    <ul id="ps"></ul>
    <script>
        var ps = document.getElementById("ps");
        for(var i=1;i<=10;i++){
            var li = document.createElement("li");
            ps.appendChild(li);
            var img = document.createElement("img");
            img.src = "img/" + i + ".jpg";
            li.appendChild(img);
        }
        var allLis = ps.children;
        var screenW = document.documentElement.clientWidth - 360;
        var screenH = document.documentElement.clientHeight - 350;
        for(var j=0;j<allLis.length;j++){
            var li = allLis[j];
            li.style.top = Math.random() * screenH + 'px';
            li.style.left = Math.random() * screenW + 'px';
            li.style.transform = 'rotate('+ Math.random() * 360 +'deg)';
            li.onclick = function () {
                for(var a=0;a<allLis.length;a++){
                    allLis[a].className = '';
                }
                this.className = 'active';
            }
        }
    </script>
```

## 3.offset家族

### offsetWidth和offsetHeight

获取对象自身的宽度和高度。包括内容、边框和内边距，即offsetWidth = width + border +padding。

```
    <style>
        #box{
            width: 250px;
            height: 250px;
            padding: 10px;
            margin: 10px;
        }
    </style>
        <div id="box"></div>
    <script>
        var box = document.getElementById("box");
        console.log(box.offsetHeight); //270
        console.log(box.offsetWidth); //270
    </script>
```

### offsetLeft和offsetTop

距离第一个有定位的父级盒子左边和上边的距离。注意：父级盒子必须要有定位，如果没有，则最终以body为准。

offsetLeft和offsetTop从父标签的padding开始计算，不包括border。即从子盒子边框到定位父盒子边框的距离。

```javascript
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #father{
            width: 400px;
            height: 400px;
            border: 1px solid #000;
            background-color: red;
            position: relative;
            padding: 10px;
            margin-left: 10px;
        }
        #box{
            width: 250px;
            height: 250px;
            padding: 10px;
            margin-left: 10px;
            position: absolute;
            background-color: blue;
            border: 1px solid #fff;
        }
    </style>
        <div id="father">
        <div id="box"></div>
    </div>
    <script>
        var box = document.getElementById("box");
        console.log(box.offsetLeft); //20
        console.log(box.offsetTop);  //10
    </script>
```

### offsetParent

如果当前元素的父级元素没有进行css定位（position:absolute或relative），则其offsetParent为body；如果当前元素的父级元素中有css定位（position:absolute或relative），offsetParent取最近的那个父级元素。

### offsetXXX和style.XXX的区别

用offsetLeft和style.left来分析，其他以此类推

1. style.left只能获取的，而offsetLeft则可以获取到所有的
2. offsetLeft可以返回没有定位盒子距离左侧的未知，而style.left不可以，它只能返回有定位盒子的left
3. offsetLeft返回的是数字，而style.left返回的是字符串，除了数字外还有单位：px
4. offsetLeft是只读的，而style.left是可读写的
5. 如果没有给当前元素指定过top样式，则style.top返回的是空字符串

## 4.天猫弹性导航

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: 0;
        }
        body{
            background-color: pink;
        }
        #nav{
            width: 950px;
            height: 60px;
            background-color: #fff;
            margin: 100px auto;
            background: url("img/cat.png") no-repeat right center #fff;
            position: relative;
        }
        #t_mall{
            width: 99px;
            height: 60px;
            background: url("img/t-mall.png") no-repeat;
            position: absolute;
        }
        #nav ul{
            position: relative;
        }
        #nav ul li{
            float: left;
            width: 100px;
            height: 60px;
            text-align: center;
            line-height: 67px;
            cursor: pointer;
        }
    </style>
```

```javascript
    <div id="nav">
        <span id="t_mall"></span>
        <ul>
            <li>双11狂欢</li>
            <li>服装会场</li>
            <li>数码家电</li>
            <li>家居建材</li>
            <li>母婴童装</li>
            <li>手机会场</li>
            <li>美妆会场</li>
            <li>进口会场</li>
            <li>飞猪旅行</li>
        </ul>
    </div>
    <script>
        window.onload = function () {
            var nav = $("nav");
            var t_mall = nav.children[0];
            var ul  = nav.children[1];
            var allLis = ul.children;
            //记录鼠标点击的位置
            var beginX = 0;
            for(var i=0;i<allLis.length;i++){
                var li = allLis[i];
                //鼠标进入
                li.onmouseover = function () {
                    end = this.offsetLeft;
                }
                //鼠标按下
                li.onmousedown = function () {
                    beginX = this.offsetLeft;
                }
                //鼠标离开
                li.onmouseout = function () {
                    end = beginX;
                }
            }

            //缓动动画
            var begin = 0, end = 0;
            setInterval(function () {
                begin = begin + (end-begin) * 0.2;
                t_mall.style.left = begin + 'px';
            }, 10)

            function $(id) {
                return typeof id === "string" ? document.getElementById(id) : null;
            }
        }
    </script>
```

## 5.事件对象event

### 基本定义

只要触发DOM上的某一个事件时，会产生一个事件对象event，这个对象中包含着所有与事件相关的信息。所有浏览器都支持event对象，但支持的方式不同。IE6-8只能通过window.event获取事件对象，而其他的则可以直接获取。通常兼容性的写法：

```javascript
var event = event || window.event;
```

### 常见属性

| 属性    | 用途                                     |
| ------- | ---------------------------------------- |
| clientX | 光标相对于该网页的水平位置               |
| clientY | 光标相对于该网页的垂直问题               |
| type    | 事件的类型                               |
| target  | 该事件被传送到的对象                     |
| screenX | 光标相对于该屏幕的水平位置               |
| screenY | 光标相对于该屏幕的垂直位置               |
| pageX   | 光标相对于该网页的水平位置（不适用于IE） |
| pageY   | 光标相对于该网页的垂直位置（不适用于IE） |
| width   | 该窗口或框架的宽度                       |
| height  | 该窗口或框架的高度                       |
| data    | 返回拖拽对象的URL字符串                  |

pageX/pageY、screenX/screenY、clientX/clientY的区别

- screenX/screenY是以屏幕为基准进行测量，即当前元素距离屏幕的尺寸。
- pageX和pageY是以当前文档（绝对定位）为基准，不适用于IE6-8。
- clientX和clientY是以当前可视区域为基准，类似于固定定位。

### 放大镜特效

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            border: 0;
        }
        img{
            vertical-align: top;
        }
        #box{
            width: 300px;
            height: 300px;
            margin: 100px 0 0 300px;
            position: relative;
        }
        #small_box{
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            position: relative;
        }
        #small_box img{
            width: 300px;
            height: 300px;
        }
        #mask{
            width: 100px;
            height: 100px;
            background-color: rgba(255, 255, 0, .4);
            position: absolute;
            left: 0;
            top: 0;
            cursor: move;
            display: none;
        }
        #big_box{
            width: 600px;
            height: 600px;
            border: 1px solid #ccc;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 320px;
            display: none;
        }
        #big_box img{
            position: absolute;
            left: 0;
            top: 0;
        }
        #list{
            margin: 10px 0 0 300px;
        }
    </style>
```

```javascript
    <div id="box">
        <div id="small_box">
            <img src="img/small01.png" alt="">
            <span id="mask"></span>
        </div>
        <div id="big_box">
            <img src="img/small001.png" alt="">
        </div>
    </div>
    <div id="list">
        <img src="img/small1.png" alt="">
        <img src="img/small2.png" alt="">
        <img src="img/small3.png" alt="">
    </div>
    <script>
        var box = document.getElementById("box");
        var small_box = box.children[0];
        var big_box = box.children[1];
        var mask = small_box.children[1];
        var big_img = big_box.children[0];
        var list_img = document.getElementById("list").children;
        small_box.onmouseover = function () {
            mask.style.display = 'block';
            big_box.style.display = 'block';
            small_box.onmousemove = function (event) {
                var event = event || window.event;
                var pointX = event.clientX - box.offsetLeft - mask.offsetWidth * 0.5;
                var pointY = event.clientY - box.offsetTop - mask.offsetHeight * 0.5;
                
                if(pointX < 0){
                    pointX = 0;
                }else if(pointX >= small_box.offsetWidth - mask.offsetWidth){
                    pointX = small_box.offsetWidth - mask.offsetWidth;
                }
                if(pointY < 0){
                    pointY = 0;
                }else if(pointY >= small_box.offsetHeight - mask.offsetHeight){
                    pointY = small_box.offsetHeight - mask.offsetHeight;
                }
                mask.style.left = pointX + 'px';
                mask.style.top = pointY + 'px';
                /*
                让大图移动起来
                smallX / bigX = small_box.width / 大图的宽度
                bigX = smallX / (small_box.width / 大图的宽度)
                */
                big_img.style.left = -pointX / (small_box.offsetWidth / big_box.offsetWidth) + 'px';
                big_img.style.top = -pointY / (small_box.offsetHeight / big_box.offsetHeight) + 'px';
            }
        }
    
        small_box.onmouseout = function () {
            mask.style.display = 'none';
            big_box.style.display = 'none';
        }

        for(var i=0;i<list_img.length;i++){
            (function (i) {
                var img = list_img[i];
                img.onmouseover = function () {
                    small_box.children[0].src = "img/small0"+ (i + 1) +".png";
                    big_img.src = "img/small00"+ (i + 1) +".png";
                }
            })(i);
        }
    </script>
```

### 进度条

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }
        #progress{
            width: 1000px;
            height: 35px;
            line-height: 35px;
            margin: 100px auto;
            position: relative;
        }
        #progress_bar{
            width: 900px;
            height: 100%;
            background-color: #ccc;
            border-radius: 8px;
            position: relative;
        }
        #progress_value{
            position: absolute;
            right: 30px;
            top: 0;
        }
        #progress_bar_fg{
            width: 0;
            height: 100%;
            background-color: orangered;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        span{
            width: 25px;
            height: 49px;
            background-color: orangered;
            position: absolute;
            left: 0;
            top: -7px;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
```

```javascript
    <div id="progress">
        <div id="progress_bar">
            <div id="progress_bar_fg"></div>
            <span></span>
        </div>
        <div id="progress_value">0%</div>
    </div>
    <script>
        window.onload = function () {
            var progress = document.getElementById("progress");
            var progress_bar = progress.children[0];
            var progress_bar_fg = progress_bar.children[0];
            var mask = progress_bar.children[1];
            var progress_value = progress.children[1];
            mask.onmousedown = function (event) {
                var e = event || window.event;
                var beginLeft = e.clientX - mask.offsetLeft;
                document.onmousemove = function (event) {
                    var e = event || window.event;
                    var x = e.clientX - beginLeft;
                    if(x<0){
                        x = 0;
                    }else if(x >= progress_bar.offsetWidth - mask.offsetWidth){
                        x = progress_bar.offsetWidth - mask.offsetWidth;
                    }
                    mask.style.left = x + 'px';
                    progress_bar_fg.style.width = x + 'px';
                    progress_value.innerHTML = parseInt(x / (progress_bar.offsetWidth - mask.offsetWidth) * 100)  + '%';

                    return false;
                }
                document.onmouseup = function () {
                    document.onmousemove = null;
                }
            }
        }
    </script>
```

### 橱窗特效

```scss
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }
        #box{
            width: 800px;
            height: 200px;
            border: 1px solid #ccc;
            position: relative;
            margin: 100px auto;
            overflow: hidden;
        }
        img{
            width: 130px;
            height: 130px;
        }
        #box ul{
            width: 1300px;
            position: absolute;
            left: 0;
            top: 20px;
        }
        #box ul li{
            float: left;
        }
        #box_bottom{
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: #e8e8e8;
            width: 100%;
            height: 25px;
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            height: 25px;
            background-color: orangered;
            border-radius: 12px;
            cursor: pointer;
        }
    </style>
```

```javascript
    <div id="box">
        <ul id="box_top">
            <li><img src="img/1.jpg" alt=""></li>
            <li><img src="img/2.jpg" alt=""></li>
            <li><img src="img/3.jpg" alt=""></li>
            <li><img src="img/4.jpg" alt=""></li>
            <li><img src="img/5.jpg" alt=""></li>
            <li><img src="img/6.jpg" alt=""></li>
            <li><img src="img/7.jpg" alt=""></li>
            <li><img src="img/8.jpg" alt=""></li>
            <li><img src="img/7.jpg" alt=""></li>
            <li><img src="img/8.jpg" alt=""></li>
        </ul>
        <div id="box_bottom">
            <span class="mask"></span>
        </div>
    </div>
    <script>
        window.onload = function () {
            //1.获取需要的标签
            var box = document.getElementById("box");
            var box_top = document.getElementById("box_top");
            var box_bottom = document.getElementById("box_bottom");
            var mask = box_bottom.children[0];
            //2.设置滚动条的长度
            //滚动条长度 / 盒子宽度 = 盒子宽度 / 内容宽度
            var mask_len = (box.offsetWidth / box_top.offsetWidth) * box.offsetWidth;
            mask.style.width = mask_len + 'px';
            //3.鼠标操作
            mask.onmousedown = function (event) {
                var e = event || window.event;
                //求出初始值
                var beginX = e.clientX - mask.offsetLeft;
                //移动
                document.onmousemove = function (event) {
                    var e = event || window.event;
                    //求出移动距离
                    var endX = e.clientX - beginX;
                    //处理边界值
                    if(endX<0){
                        endX = 0;
                    }else if(endX >= box.offsetWidth - mask.offsetWidth){
                        endX = box.offsetWidth - mask.offsetWidth;
                    }
                    //动起来
                    mask.style.left = endX + 'px';
                    //内容走的距离/滚动条走的距离 = （内容的长度-盒子长度）/（盒子长度-滚动条长度）
                    var content_len = (box_top.offsetWidth - box.offsetWidth) / (box.offsetWidth - mask.offsetWidth) * endX;
                    box_top.style.left = - content_len + 'px';
                    return false;
                };
                //鼠标抬起
                document.onmouseup = function () {
                    document.onmousemove = null;
                }
            }
        }
    </script>
```

## 6.scroll家族

### 浏览器适配问题

- ie9和最新浏览器

```
window.pageXOffset; （scrollLeft）
window.pageYOffet; (scrollTop)
```

- Firefox浏览器和其他浏览器

```
document.documentElement.scrollTop;
```

- Chrome浏览器和没有声明DTD<DOCTYPE>

```
document.body.scrollTop;
```

- 兼容写法

```
var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
```

### scroll(x,y)

- 把内容滚动到指定的坐标
- 格式：scrollTo(xpos,ypos)
    - xpos必需：要在窗口文档显示区左上角显示的文档的x坐标
    - ypos必需：要在窗口文档显示区左上角显示的文档的y坐标
- 网页大部分都没有水平滚动条，所以这个x不太常用。

## 7.JSON

JSON有两种结构：对象和数组，两种结构相互组合从而形成各种复杂的数据结构。

- 数据在键值对中
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组

## 8.用JSON封装scroll

```javascript
    <script>
        /**
        *获取滚动的头部距离和滚动距离
        *scroll().top scroll().left
        *return {*}
        */
        function scroll() {
            if(window.pageYOffset !== null){
                return {
                    top: window.pageYOffset,
                    left: window.pageXOffset
                }
            }else if(document.compatMode === "CSS1Compat"){ //如果浏览器按照w3c的规范来（兼容模式）
                return {
                    top: document.documentElement.scrollTop,
                    left: document.documentElement.scrollLeft
                }
            }
            return {
                top: document.body.scrollTop,
                left: document.body.scrollLeft
            }
        }
        window.onscroll = function () {
            console.log(scroll().top);
        }
    </script>
```

## 9.中部导航吸顶

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            border: none;
        }
        img{
            vertical-align: top;
            width: 100%;
        }
        .nav{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
        }
    </style>
```

```javascript
    <header id="head">
        <img src="images/head.png" alt="">
    </header>
    <nav id="nav">
        <img src="images/nav.png" alt="">
    </nav>
    <section>
        <img src="images/body1.png" alt="">
        <img src="images/body2.png" alt="">
    </section>
    <script src="js/scroll.js"></script>
    <script>
        window.onload = function () {
            //1.求出offsetHeight
            var nav_top_height = $("nav").offsetTop;
            //2.监听窗口滚动
            window.onscroll = function () {
                var scroll_top_height = scroll().top;

                //2.1判断
                if(scroll_top_height >= nav_top_height){
                    $("nav").className = "nav";
                }else{
                    $("nav").className = "";
                }
            }
        }
    </script>
```

注：scroll.js文件同用JSON封装scroll中文件一致

## 10.侧边广告效果

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }

        #aside{
            width: 250px;
            position: absolute;
            left: 0;
            top: 150px;
        }

        #aside img{
            width: 100%;
        }
        p{
            height: 50px;
            text-align: center;
            font-size: 20px;
        }
    </style>
```

```javascript
    <div id="aside">
        <img src="images/float.png" alt="">
    </div>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <p>好好学习，天天向上</p>
    <script src="js/scroll.js"></script>
    <script>
        window.onload = function () {
            //1.获取广告头部的高度
            var offset_top = $("aside").offsetTop;
            //2.监听窗口的滚动
            var begin = 0, end = 0, timer = null;
            window.onscroll = function () {
                //2.0清除定时器
                clearInterval(timer);
                //2.1获取滚动高度
                var scroll_top = scroll().top;
                end = offset_top + scroll_top;
                //2.2开启缓动动画
                timer = setInterval(function () {
                    begin = begin + (end - begin) * 0.2;
                    $("aside").style.top = begin + 'px';

                    //清除定时器
                    if(Math.round(begin) === end){
                        clearInterval(timer);
                    }
                }, 20);
            }
        }
    </script>
```

注：scroll.js文件同用JSON封装scroll中文件一致

## 11.返回顶部

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>返回顶部</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }
        body{
            background-color: #ccc;
        }

        p{
            margin-bottom: 20px;
            text-align: center;
        }

        #top{
            width: 50px;
            height: 80px;
            background: url("img/top.png") no-repeat;
            background-size: 100% 100%;
            position: fixed;
            right: 10px;
            bottom: 30px;   
            display: none;
        }
    </style>
</head>
<body>
    <span id="top"></span>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <p>今天星期一</p>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            //0变量
            var scroll_top = 0, begin = 0, end = 0, timer = null;
            //1. 监听窗口滚动
            window.onscroll = function () {
                //1.1获取滚动的高度
                scroll_top = scroll().top;
                //1.2显示和隐藏
                scroll_top > 0 ? show($("top")) : hidden($("top"));
                begin = scroll_top;
            };
            //2.监听点击
            $("top").onclick = function () {
                //2.1清除定时器
                clearInterval(timer);
                //2.2开启缓动动画
                timer = setInterval(function () {
                    begin = begin + (end - begin) * 0.2;
                    window.scrollTo(0, begin);
                    //2.3清除定时器
                    if(parseInt(begin) === end){
                        clearInterval(timer);
                    }
                }, 20);
            }
        }
    </script>
</body>
</html>
```

## 12.client家族

### clientWidth、clientHeight、clientLeft、clientRight

- 网页可见区域宽：document.body.clientWidth
- 网页可见区域高：document.body.clientHeight
- clientLeft，clientTop
    - 返回的是元素边框的borderWidth
    - 如果不指定一个边框或者不定位改元素，其值就为0

### offset、client、scroll的区别

1. width和height
    - offsetWidth和offsetHeight：border+padding+内容的宽度和高度
    - clientWidth和clientHeight：padding+内容的宽度和高度
    - scrollWidth和scrollHeight：能够滚动的内容的宽度和高度
2. left和top
    - offsetLeft和offsetTop：当前元素距离有定位父盒子左边、上边的距离
    - clientLeft和clientTop：左边、上边边框的宽度
    - scrollLeft和scrollTop：左边、上边滚动的长度

### 获取屏幕的可视区域

- ie9及其以上的版本、最新浏览器

```
window.innerWidth，window.innerHeight
```

- 标准模式浏览器

```
document.documentElement.clientWidth，document.documentElement.clientHeight
```

- 怪异模式

```
document.body.clientWidth，document.body.clientHeight
```

- 通用写法

```javascript
    function client() {
        if(window.innerWidth){//ie9+和最新浏览器
            return {
                width: innerWidth,
                height: innerHeight
            }
        }else if(document.compatMode === "CSS1Compat"){
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }

        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
```

## 13.常用窗口事件--onresize

当窗口或框架的大小发生改变的时候就会调用，一般被运用于自适应页面布局等多屏幕适配场景

获取屏幕的分辨率：

```
window.screen.width  window.screen.height
```

案例：根据屏幕宽度不同改变背景颜色

```javascript
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var bgColor;
            changeColor();
            window.onresize = changeColor;

            function changeColor() {
                if(client().width >= 960){
                    bgColor = 'red';
                }else if(client().width >= 640){
                    bgColor = 'blue';
                }else{
                    bgColor = 'green';
                }
                document.body.style.backgroundColor = bgColor;
            }
        }
    </script>
```

注：myFunc.js文件与12章client兼容写法代码一致

## 14.冒泡机制

事件从dom树的底层层层往上传递，直至传递到dom的根节点。

IE6.0

```
div->body->html->document
```

其他浏览器

```
div->body->html->document->window
```

注：不是所有事件都能冒泡，以下事件不能冒泡：blur、focus、load、unload

**阻止冒泡的方法：**

- 标准浏览器和ie浏览器

```
w3c：event.stopPropagation()
IE：event.cancelBubble = true
```

- 兼容的写法

```javascript
if(event && event.stopPropagation){ //w3c标准
    event.stopPropagation();
}else{ //ie678
    event.calcelBubble = true;
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>冒泡机制</title>
    <style>
        #father{
            width: 200px;
            height: 200px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="father">
        <button id="btn">点我</button>
    </div>
    <script>
        var father = document.getElementById("father");
        var btn = document.getElementById("btn");
        btn.onclick = function (event) {
            var event = event || window.event; //阻止事件冒泡
            if(event && event.stopPropagation){ //w3c标准
                event.stopPropagation();
            }else{ //ie678
                event.calcelBubble = true;
            }
            alert("点击了按钮");
        }
        father.onclick = function () {
            alert("点击了父标签");
        }
        document.onclick = function () {
            alert("点击了文档");
        }
    </script>
</body>
</html>
```

## 15.蒙版效果

### ie兼容opacity

```
opacity: 0.4;
filter: alpha(opacity=40);
```

### 获取当前操作对象

- 火狐、谷歌event.target
- ie 678 ：event.srcElement
- 兼容：

```
var targetId = event.target ? event.target.id : event.srcElement.id;
```

代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>蒙版效果</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        html,body{
            width: 100%;
            height: 3000px;
        }
        #panel{
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.4;
            filter: alpha(opacity=40);
            position: absolute;
            top: 0;
            left: 0; 
            display: none;
        }
        #login{
            width: 300px;
            height: 300px;
            background-color: skyblue;
            border-radius: 5px;
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -150px;
            display: none;
        }
    </style>
</head>
<body>
    <button id="btn">立即登录</button>
    <div id="panel"></div>
    <div id="login"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            //1.监听按钮点击
            $("btn").onclick = function (event) {
                var event = event || window.event;
                if(event && event.stopPropagation){
                    event.stopPropagation();
                }else{
                    window.event.cancelBubble = true;
                }
                //1.1显示面板和蒙版
                $("panel").style.display = "block";
                $("login").style.display = "block";
                //1.2隐藏滚动条
                document.body.style.overflow = "hidden";
            }

            //2.点击文档
            document.onclick = function (event) {
                var e = event || window.event;
                //2.1获取点击标签
                var targetId = e.target ? e.target.id : e.srcElement.id;
                //2.2判断
                if(targetId !== "login"){
                    $("panel").style.display = "none";
                    $("login").style.display = "none";
                    document.body.style.overflow = "auto";
                }else{
                    window.location.href = "http://www.baidu.com";
                }
            }
        }
    </script>
</body>
</html>
```

注：myFunc.js文件与12章client兼容写法代码一致

## 16.获取用户选中的内容

- 标准浏览器

```
window.getSelection()
```

- IE获得选择的文字

```
document.selection.createRange().text
```

- 兼容性的写法

```
var selectedText;
if(window.getSelection){ //标准浏览器
	selectedText = window.getSelection().toString();
}else{ //IE
	selectedText = document.selection.createRange().text;
}
```

- 防止拖动时选中内容

```
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
```

## 17.微博分享

```html
index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        p{
            margin: 100px;
            width: 300px;
        }
        #share_weibo{
            width: 49px;
            height: 43px;
            background: url("img/weibo.png") no-repeat;
            position: absolute;
            display: none;
        }
    </style>
</head>
<body>
    <p id="word">
        微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享
        分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活
        微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享
        分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活
        微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享
        分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活微博分享分享生活
    </p>
    <div id="share_weibo"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var selectedText;
            //1.监听鼠标抬起
            $("word").onmouseup = function (event) {
                //1.0兼容
                var event = event || window.event;
                //1.1获取选中的文字
                if(window.getSelection){ //标准浏览器
	                selectedText = window.getSelection().toString();
                }else{ //IE
	                selectedText = document.selection.createRange().text;
                }
                    //1.2显示面板
                    $("share_weibo").style.display = "block";
                    //1.3改变位置
                    $("share_weibo").style.left = event.clientX + 'px';
                    $("share_weibo").style.top = event.clientY + 'px';
            }
            //2.监听文档的点击
            document.onmousedown = function (event) {
                //2.0兼容
                var e = event || window.event;
                //2.1获取点击区域的ID
                var targetId = e.target ? e.target.id : e.srcElement.id;
                //2.2判断
                if(targetId !== "share_weibo"){
                    $("share_weibo").style.display = "none";
                }else{
                    window.location.href = 'http://v.t.sina.com.cn/share/share.php?searchPic=false&title=' + selectedText + '&url=https://github.com/jiaoyake';
                }
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }
        }
    </script>
</body>
</html>
```

注：myFunc.js文件与12章client兼容写法代码一致

## 18.综合动画封装

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #box1{
            width: 200px;
            height: 200px;
            background-color: green;
            position: relative;
            left: 10px;
            top: 100px;
        }
        #box2{
            width: 200px;
            height: 200px;
            background-color: red;
            position: relative;
            left: 700px;
            top: 400px;
        }
    </style>
</head>
<body>
    <button id="btn1">往右走</button>
    <button id="btn2">往左走</button>
    <div id="box1"></div>
    <div id="box2"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            $("btn1").onclick = function () {
                constant($("box1"), 400, 20);
            }
            $("btn2").onclick = function () {
                constant($("box2"), 100, 20);
            }
        }
        /**匀速动画函数
        *
        */
        function constant(obj, target, speed) {
            clearInterval(obj.timer);
            //判断方向
            var dir = obj.offsetLeft < target ? speed : -speed;
            obj.timer = setInterval(function () {
                obj.style.left = obj.offsetLeft + dir + 'px';
                if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
                    clearInterval(obj.timer);
                    obj.style.left = target + 'px';
                }
            }, 20);
        }
    </script>
</body>
</html>
```

注：myFunc.js文件与12章client兼容写法代码一致

## 19.无限轮播

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>无限轮播</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
            border: none;
        }
        img{
            vertical-align: top;
        }
        #slider{
            width: 750px;
            height: 320px;
            border: 1px solid #ccc;
            padding: 10px;
            margin: 100px auto;
            position: relative;
        }
        #top{
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        #top ul{
            width: 4500px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }

        #top ul li{
            width: 750px;
            height: 320px;
            float: left;
        }
        #slider ol{
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
        #slider ol li{
            width: 20px;
            height: 20px;
            background-color: darkgray;
            display: inline-block;
            margin-right: 3px;
            border-radius: 50%;
            cursor: pointer;
        }
        #slider ol li.current{
            background-color: orangered;
        }
    </style>
</head>
<body>
    <div id="slider">
        <div id="top">
            <ul id="ul">
                <li><img src="imgs/1.jpg" alt=""></li>
                <li><img src="imgs/2.jpg" alt=""></li>
                <li><img src="imgs/3.jpg" alt=""></li>
                <li><img src="imgs/4.jpg" alt=""></li>
                <li><img src="imgs/5.jpg" alt=""></li>
            </ul>
        </div>
        <ol id="ol"></ol>
    </div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            //1.获取需要的标签
            var lis = $("ul").children;
            var currentIndex = 0, indicatorIndex = 0;
            //2.克隆li标签
            $("ul").appendChild(lis[0].cloneNode(true));
            //3.动态创建页码
            for(var i=0; i<lis.length-1; i++){
                var li = document.createElement("li");
                $("ol").appendChild(li);
            }
            //4.让第一个选中
            $("ol").children[0].className = "current";
            //5.监听鼠标进入圆点
            var olLis = $("ol").children;
            for(var j=0; j<olLis.length; j++){
                (function (j) {
                    //5.1获取单独的li标签
                    var li = olLis[j];
                    //5.2监听鼠标进入事件
                    li.onmouseover = function () {
                        for(var i=0; i<olLis.length; i++){
                            olLis[i].className = "";
                        }
                        this.className = "current";
                        //5.3动起来
                        constant($("ul"), -(750 * j), 100);
                        currentIndex = indicatorIndex = j;
                    }   
                })(j)
            }
            //6.自动轮播
            var timer = setInterval(autoPlay, 1000);
            //7.清除和设置定时器
            $("slider").onmouseover = function () {
                clearInterval(timer);
            }
            $("slider").onmouseout = function () {
                timer = setInterval(autoPlay, 1000);
            }

            function autoPlay() {
                //6.1ul滚起来
                currentIndex++;
                if(currentIndex > lis.length - 1){
                    $("ul").style.left = 0;
                    currentIndex = 1;
                }
                constant($("ul"), -currentIndex * 750, 100);
                //6.2指示器滚起来
                indicatorIndex++;
                if(indicatorIndex > olLis.length - 1){
                    indicatorIndex = 0;
                }
                for(var i=0; i<olLis.length; i++){
                    olLis[i].className = "";
                }
                olLis[indicatorIndex].className = "current";
            }
        }
    </script>
</body>
</html>
```

```javascript
myFunc.js
/**
 * 获取滚动的头部距离和滚动距离
 */
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ //如果浏览器按照w3c的规范来（兼容模式）
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
    }

    function $(id){
        return typeof id === "string" ? document.getElementById(id) : null;
    }

    /**
     * 获取屏幕的宽度和高度
     */
    function client() {
        if(window.innerWidth){//ie9+和最新浏览器
            return {
                width: innerWidth,
                height: innerHeight
            }
        }else if(document.compatMode === "CSS1Compat"){
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }

        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }

    /**匀速动画函数
    *
    */
    function constant(obj, target, speed) {
        clearInterval(obj.timer);
        //判断方向
        var dir = obj.offsetLeft < target ? speed : -speed;
        obj.timer = setInterval(function () {
            obj.style.left = obj.offsetLeft + dir + 'px';
            if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
                clearInterval(obj.timer);
                obj.style.left = target + 'px';
            }
        }, 20);
    }
```

## 20.Math常用函数

- Math.ceil()向上取整

```
Math.ceil(1.11) 结果：2
Math.ceil(1.99) 结果：2
Math.ceil(-1.5) 结果：-1
```

- Math.floor()向下取整

```
Math.floor(1.11) 结果：1
Math.floor(1.99) 结果：1
Math.floor(-1.2) 结果：-2
```

- Math.round()四舍五入

```
Math.round(1.11) 结果：1
Math.round(1.99) 结果：2
Math.round(-1.2) 结果：-2	
```

- Math.abs()取绝对值

```
Math.abs(-12.11) 结果：12.11
```

## 21.关于缓动动画

- 缓动动画的原理：盒子本身的位置 + 步长（不断变化的，由大到小）
- 步长：begin = begin + (end - begin)  * 缓动系数

### 封装后的一般缓动动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>缓动动画</title>
    <style>
        #box{
            width: 100px;
            height: 100px;
            background-color: green;
            position: relative;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <button id="btn1">向右走</button>
    <button id="btn2">向左走</button>
    <div id="box"></div>
    <script>
        window.onload = function () {
            var box = document.getElementById("box");
            var btn1 = document.getElementById("btn1");
            var btn2 = document.getElementById("btn2");
            btn1.onclick = function () {
                buffer(box, 900);
            };
            btn2.onclick = function () {
                buffer(box, 200);
            };
        }
        function buffer(obj, target) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var speed = (target - obj.offsetLeft) * 0.2;
                speed = target > obj.offsetLeft ? Math.ceil(speed) : Math.floor(speed);
                obj.style.left = obj.offsetLeft + speed + 'px';
                if(obj.offsetLeft === target){
                    clearInterval(obj.timer);
                }
            }, 20);
        }
    </script>
</body>
</html>
```

### 单值缓动动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>缓动动画</title>
    <style>
        #box{
            width: 100px;
            height: 100px;
            background-color: green;
            position: relative;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <button id="btn1">向右走</button>
    <button id="btn2">向下走</button>
    <div id="box"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var box = document.getElementById("box");
            var btn1 = document.getElementById("btn1");
            var btn2 = document.getElementById("btn2");
            btn1.onclick = function () {
                buffer(box, 900, "left");
            };
            btn2.onclick = function () {
                buffer(box, 200, "top");
            };
        }
        function buffer(obj, target, attr) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var begin = parseInt(getCSSAttrValue(obj, attr));
                var speed = (target - begin) * 0.2;
                speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
                obj.style[attr] = begin + speed + 'px';
                if(begin === target){
                    clearInterval(obj.timer);
                }
            }, 20);
        }
    </script>
</body>
</html>
```

### 多值缓动动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多值缓动动画</title>
    <style>
        #box{
            width: 100px;
            height: 100px;
            background-color: green;
            position: relative;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <button id="btn1">向右走</button>
    <button id="btn2">向下走</button>
    <div id="box"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var box = document.getElementById("box");
            var btn1 = document.getElementById("btn1");
            var btn2 = document.getElementById("btn2");
            btn1.onclick = function () {
                buffer(box, {"width": 200, "height": 50, "left": 600});
            };
            btn2.onclick = function () {
                buffer(box, {"width": 200, "top": 500, "top": 600});
            };
        }
        function buffer(obj, json) {
            clearInterval(obj.timer);
            var begin = 0, target = 0, speed = 0;
            obj.timer = setInterval(function () {
                var flag = true;
                for(var k in json){
                    begin = parseInt(getCSSAttrValue(obj, k)) || 0;
                    target = parseInt(json[k]);
                    speed = (target - begin) * 0.2;
                    speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
                    obj.style[k] = begin + speed + 'px';
                    if(begin !== target){
                        flag = false;
                    }
                }
                if(flag){
                    clearInterval(obj.timer);
                }
            }, 20);
        }
    </script>
</body>
</html>
```

### 回调缓动动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多值缓动动画</title>
    <style>
        #box{
            width: 100px;
            height: 100px;
            background-color: green;
            position: relative;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <button id="btn1">向右走</button>
    <button id="btn2">向下走</button>
    <div id="box"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var box = document.getElementById("box");
            var btn1 = document.getElementById("btn1");
            var btn2 = document.getElementById("btn2");
            btn1.onclick = function () {
                buffer(box, {"width": 200, "height": 50, "left": 600}, function () {
                    buffer(box, {"width": 200, "top": 500, "top": 600});
                });
            };
            btn2.onclick = function () {
                buffer(box, {"width": 200, "top": 500, "top": 600}, function () {
                    buffer(box, {"width": 200, "height": 50, "left": 600});
                });
            };
        }
        function buffer(obj, json, fn ){
            clearInterval(obj.timer);
            var begin = 0, target = 0, speed = 0;
            obj.timer = setInterval(function () {
                var flag = true;
                for(var k in json){
                    begin = parseInt(getCSSAttrValue(obj, k)) || 0;
                    target = parseInt(json[k]);
                    speed = (target - begin) * 0.2;
                    speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
                    obj.style[k] = begin + speed + 'px';
                    if(begin !== target){
                        flag = false;
                    }
                }
                if(flag){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
            }, 20);
        }
    </script>
</body>
</html>
```

### 透明度-缓动动画

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多值缓动动画</title>
    <style>
        #box{
            width: 100px;
            height: 100px;
            background-color: green;
            position: relative;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <button id="btn1">向右走</button>
    <button id="btn2">向下走</button>
    <div id="box"></div>
    <script src="js/myFunc.js"></script>
    <script>
        window.onload = function () {
            var box = document.getElementById("box");
            var btn1 = document.getElementById("btn1");
            var btn2 = document.getElementById("btn2");
            btn1.onclick = function () {
                buffer(box, {"width": 200, "height": 50, "left": 600, "opacity": 0.4});
            };
            btn2.onclick = function () {
                buffer(box, {"width": 200, "top": 500, "top": 600});
            };
        }
        function buffer(obj, json) {
            clearInterval(obj.timer);
            var begin = 0, target = 0, speed = 0;
            obj.timer = setInterval(function () {
                var flag = true;
                for(var k in json){
                    if(k === "opacity"){
                        begin = Math.round(parseFloat(getCSSAttrValue(obj, k)) * 100) || 100;
                        target = parseInt(json[k] * 100);
                    }else{
                        begin = parseInt(getCSSAttrValue(obj, k)) || 0;
                        target = parseInt(json[k]);
                    }
                    speed = (target - begin) * 0.2;
                    speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
                    if(k === "opacity"){
                        obj.style.opacity = (begin + speed) / 100;
                        obj.style.filter = 'alpha(opacity='+ (begin + speed) +')';
                    }else{
                        obj.style[k] = begin + speed + 'px';
                    }
                    if(begin !== target){
                        flag = false;
                    }
                }
                if(flag){
                    clearInterval(obj.timer);
                }
            }, 20);
        }
    </script>
</body>
</html>
```

## 22.常见的js访问css属性

- 点语法：跟在style后面的属性不能由外面传入

```
var h = 'height';
box.style.h = 300 + 'px';
```

- 下标语法：利用[]访问属性  元素.style.["属性"]，可以动态的传递参数作为属性。

```
var h = 'height';
box.style[h] = 300 + 'px';
```

## 23.JS获取CSS的样式

- 在IE或Opera浏览器

```
obj.currentStyle
```

- 其他W3C标准浏览器

```
window.getComputedStyle("元素","伪类")(这两个选项是必须的，没有伪类用null代替)
```

- 兼容写法

```
function getStyleAttr(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj, null)[attr];
	}
}
```

## 24.JSON遍历

for in 关键字

for (变量 in 对象){ 执行语句; }

```
for(var k in json){
	console.log(k); //key
	console.log(json[k]); //value
}
```

```
var dataArr = [10, 20, 30, 40];
dataArr.forEach(function(item, index){
	console.log(item, index);
})
//输出
//10 0
//20 1
//30 2
//40 3

var obj = {"width": 100, "height": 200, "border": 1};
for(var key in obj){
	console.log(key, obj[key]);
}
//输出
//width 100
//height 200
//border 1
```





