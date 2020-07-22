# JS特效

### 1.BOM

浏览器对象模型。所有全局的变量都是window的属性，所有全局的函数都是window的方法。

### **2.事件**：

**事件三要素：**事件源，事件，事件驱动程序。

获取事件源、绑定事件、书写事件驱动程序。

```html
<button name="btn" id="btn" class="my-btn">点我</button>
<script>
//1、获取事件源
var btn = document.getElementById("btn");
//var btn2 = document.getElementsByClassName("my-btn")[0];
//var btn3 = document.getElementsByTagName("button")[0];
//var btn4 = document.getElementsByName("btn")[0];
//var btn5 = document.querySelector("#btn"或".my-btn");
//var btn5 = document.querySelectorAll("#btn"或".my-btn")[1];
btn.onclick = function () {
	alert("点我干啥？");
};
// btn.onclick = deal;
//function deal() {
//	alert("点我干啥？");
//};
</script>
```

```javascript
window.onload = function () {
​	 btn.onclick = deal;
​	function deal() {
​		alert("点我干啥？");
​	};
}//加上window.onload使在整个页面加载完之后执行function()里面的内容
```

### 3.DOM

节点的访问关系：以属性的方式存在。

DOM的节点并不是孤立的，因此	可以通过DOM节点之间的相对关系对它们进行访问。

#### **父节点**(parentNode)

```html
<div id="box">
	<button id="btn">按钮</button>
	<span id="sp">
		<a href="#">链接</a>
	</span>
</div>
<script>
	window.onload = function () {
		var a = document.getElementsByTagName(a)[0];
		//获取a标签的父元素span
		parent = a.parentNode;
		//获取span的父元素div
		parent2 = a.parentNode.parentNode;
	}
</script>

```

#### **兄弟节点**

***next下一个***

nextSibling在IE678指下一个元素节点（标签），在火狐谷歌IE9以后指的是下一个节点（包括空文档和换行节点）。

nextElementSibling在火狐谷歌IE9指的是下一个元素节点

总结：在IE678中用nextSibling，在火狐谷歌IE9以后用nextElementSibling

***previous上一个***

```html
<div id="box">
		<button class="btn">按钮</button>
		<span id="span">
			<a href="#">链接</a>
		</span>
		<p>我是标签</p>
		<h1>标题</h1>
</div>
<script>
    	window.onload = function () {
    		var span = document.getElementById("span");
    		//下一个
    		var next = span.nextElementSibling || span.nextSibling;
    		//上一个
    		var previous = span.previousElementSibling || span.previousSibling;
    		console.log(next); //输出<p></p>
    		console.log(previous); //输出<button></button>
    	}
    </script>
	
```

#### **单个节点**

***第一个子节点***

firstChild（关于浏览器同上面的nextAibling）

第一个子节点 = 父节点.firstElementChild || 父节点.firstChild

***最后一个子节点***

lastChild（同上）

最后一个结点 = 父节点.lastElementChild || 父节点.lastChild

```html
<div id="box">
		<button class="btn">按钮</button>
		<span id="span">
			<a href="#">链接</a>
		</span>
		<p>我是标签</p>
		<h1>标题</h1>
</div>
<script>
    	window.onload = function () {
    		var box = document.getElementById("box");
    		//第一个子节点
    		var first = box.firstElementChild || box.firstChild;
    		//最后一个子节点
    		var last = box.lastElementChild || box.lastChild;
    		console.log(first); //输出button按钮
    		console.log(last); //输出h1标题
    	}
 </script>
```

#### **所有子节点**

***childNodes***

它是标准属性，它返回指定元素的子元素集合，包括HTML节点、所有属性、文本节点。

注：火狐、谷歌等高版本会把换行也看作是子节点。

nodeType == 1：表示的是元素节点 （元素就是标签）

nodeType == 2：表示是属性节点

nodeType == 3表示是文本节点

获取所有子节点：子节点数组 = 父节点.childNodes;

***children***（使用高版本浏览器）

只返回HTML节点，不返回文本节点。

注：children在IE6/7/8中包含注释节点，在IE6/7/8中，注释节点写在里面

获取所有子节点：子节点数组 = 父节点.children

```html
<div id="box">
		<button class="btn">按钮</button>
		<span id="span">
			<a href="#">链接</a>
		</span>
		<p>我是标签</p>
		<h1>标题</h1>
</div>
<script>
    	window.onload = function () {
    		var box = document.getElementById("box");
    		//所有子节点
    		var list = box.childNodes;
    		var newList = [];
    		for(var i=0; i<list.length; i++){
    			var type = list[i].nodeType;
    			if(type === 1){
    				newList.push(list[i]);
    			}
    		}
    		var list2 = box.children;
    		console.log(list); //输出button text span text p text等
    		console.log(newList); //输出button span p h1
    		console.log(list2); //输出button span p h1
    	}
</script>
```

***获取任意的兄弟节点***

节点自己.parentNode.children[index];

#### 节点的CRUD（增删改查）

```html
//增加一个节点
<div id="box">
		<p>我是标签</p>
		<button class="btn">按钮</button>
</div>
<script>
    	window.onload = function () {
    		var box = document.getElementById("box");
    		var img = document.createElement("img");
    		img.src = "新建文件夹/2.jpg";
    		//box.appendChild(img); //默认插入在父节点box的最后
    		var btn = document.getElementsByClassName("btn")[0];
    		box.insertBefore(img, btn); //插入在父节点box中的button的前面
    	}
</script>
```

```html
//删除一个节点
<div id="box">
		<p id="word">我是标签</p>
		<button class="btn">按钮</button>
</div>
<script>
    	window.onload = function () {
    		var word = document.getElementById("word");
    		//word.parentNode.removeChild(word); //自杀式
    		word.remove();
    	}
</script>
```

```html
//复制节点
<div class="box">
		<p class="word">我是标签</p>
		<button class="btn">按钮</button>
</div>
<script>
    	window.onload = function () {
    		//新节点= 要复制的节点.cloneNode(参数)，参数可选复制节点
    		var node = document.getElementsByClassName("box")[0];
    		// var newNode = node.cloneNode(false); //浅拷贝：只拷贝了最外层的div
    		var newNode = node.cloneNode(true); //深拷贝：拷贝了所有元素：div p button
    		document.body.appendChild(newNode);
    	}
</script>
```

#### 节点属性

```html
<div class="box">
		<p class="word">我是标签</p>
		<button class="btn">按钮</button>
		<img>
</div>
<script>
    	window.onload = function () {
    		var img = document.getElementsByTagName("img")[0];
    		//获取 getAttribute
    		//img.getAttribute("src");
    		//img.getAttribute("alt");
    		//img.src;
    		//img.alt;

    		// 设置，setAttribute(名称, 值)
    		img.setAttribute("src", "新建文件夹/1.jpg");
    		img.setAttribute("alt", "图片");
    		img.setAttribute("aa", "附加");
    		//console.log(img.getAttribute("aa"));

    		//删除removeAttribute(名称)
    		img.removeAttribute("alt");
    		img.removeAttribute("aa");
    	}
</script>
```

#### 图片切换

```html
<div id="box">
		<img id="icon" src="1.jpg">
		<p></p>
		<button id="prev">上一张</button>
		<button id="next">下一张</button>
</div>
<script>
    	window.onload = function () {
    		//获取需要的元素
    		var icon = document.getElementById("icon");
    		var prev = document.getElementById("prev");
    		var next = document.getElementById("next");
    		//监听按钮的点击，一共有六张图片
    		var minIndex = 1, maxIndex = 6, currentIndex = minIndex;
    		prev.onclick = function () {
    			if(currentIndex === minIndex){ //边界值
    				currentIndex = maxIndex;
    			}else{ //正常情况
    				currentIndex --;
    			}
    			icon.setAttribute("src", currentIndex + ".jpg");
    		}
    		next.onclick = function () {
    			if(currentIndex === maxIndex){ //边界值
    				currentIndex = minIndex; 
    			}else{ //正常情况
    				currentIndex ++;
    			}
    			icon.setAttribute("src", currentIndex + ".jpg");
    		}
    	}
</script>
```

#### 图片的显示

```html
//innerHTML  innerText
<div id="box">
		<button>隐藏</button>
		<p></p>
		<img id="icon" src="1.jpg">
</div>
<script>
    	window.onload = function () {
    		//获取事件源和所需要的元素
    		var box = document.getElementById("box");
    		var img = document.getElementsByTagName("img")[0];
    		var btn = document.getElementsByTagName("button")[0];
    		//绑定事件
    		btn.onclick = function () {
    			//事件驱动程序
    			// console.log(box.innerHTML); //输出<button>隐藏</button>等三句（包括标签）
    			// console.log(box.innerText); //输出隐藏（不包括标签）
    			if(btn.innerText === "隐藏"){
    				img.style.display = "none";
    				btn.innerText = "显示";
    			}else{
    				img.style.display = "block";
    				btn.innerText = "隐藏";
    			}
    		}
    	}
</script>
```

#### 简易相册

```html
<p id="p">图片</p>
<img id="img" src="1.jpg" alt="阿令">
<ul id="ling">
	<li>
		<a href="1.jpg" title="第一张">
			<img src="1.jpg">
		</a>
	</li>
	<li>
		<a href="2.jpg" title="第二张">
			<img src="2.jpg">
		</a>
	</li>
	<li>
		<a href="3.jpg" title="第三张">
			<img src="3.jpg">
		</a>
	</li>
	<li>
		<a href="4.jpg" title="第四张">
			<img src="4.jpg">
		</a>
	</li>
	<li>
		<a href="5.jpg" title="第五张">
			<img src="5.jpg">
		</a>
	</li>
	<li>
		<a href="6.jpg" title="第六张">
			<img src="6.jpg">
		</a>
	</li>
</ul>
<script type="text/javascript">
	var img = document.getElementById("img");
	var p = document.getElementById("p");
	var ul = document.getElementById("ling");
	var aList = ul.getElementsByTagName("a");
	for(var i=0; i<aList.length; i++){
		aList[i].onclick = function (){
			img.src = this.href;
			p.innerHTML = this.title;
			return false;
		}
	}
</script>
```

#### document对象：

##### **内置对象window**

1、所有的全局变量都是window的属性

2、所有的全局函数都是window的方法

```javascript
var str = "张三";
console.log(str); //输出张三
console.log(window.str); //输出张三
function func() {
	var age = 19;
	console.log(111);
}

func(); //输出111
window.func(); 输出111

console.log(window.age); //输出undefined
```

window的自动跳转：

```javascript
console.log(111);
console.log(222);
//动态跳转
window.location.href = "http://www.baidu.com";
console.log(333);
console.log(444);
console.log(555);
```

##### 获取整个页面的document对象

```javascript
console.log(document);
```

##### 获取网页中document的所有子节点

```javascript
console.log(document.childNodes);
```

##### document和body的区别

document是虚拟存在的，是整个网页的最高管理者，总体节点就分为：1、文档声明，2、html语句

body则指的是网页的具体内容

##### 获取html元素

**如何获取**

```javascript
getElementById("my-div");
getElementsByClassName("my-div")[0];
getElementsByTagName("my-div")[0];
getElementByName("my-div")[0];
```

**获取方式**

```javascript
document.querySelector("#my-div"); //只找第一个
document.querySelectAll("div"); //找到所有的
```

##### document常见的内置属性和方法

```javascript
document.head; //直接获取头部
document.body; //直接获取body
document.title; //直接获取title
```

##### 补充：

```html
//二维码的隐藏与显示
<style>
		* {
    		margin: 0;
    		padding: 0;
    		list-style: none;
    	}
    	#box {
    		width: 50px;
    		height: 50px;
    		background: url("12.jpg") no-repeat;
    		position: fixed;
    		top: 40%;
    		left: 0;
    	}
    	#code {
    		position: absolute;
    		left: 70px;
    		top: -70px;
    		display: none;
    	}
<style>
<body>
<div id="box">
		<div id="code">
			<img src="12.jpg" width="200px" height="200px">
		</div>
	</div>
<script type="text/javascript">
	window.onload = function () {
		var box = document.getElementById("box");
		var code = document.getElementById("code");
		var img = document.getElementsByTagName("img")[0];
		//监听鼠标进入
		box.onmouseover = function () {
			code.style.display = "block";
		}
		//监听鼠标离开
		box.onmouseout = function () {
			code.style.display = "none";
		}
	}
</script>
</body>
```

```html
//图片切换
<style>
		* {
    		margin: 0;
    		padding: 0;
    		list-style: none;
    	}
    	#box {
    		width: 500px;
    		height: 100px;
    		padding-top: 400px;
    		border: 1px solid #cccccc;
    		margin: 0 auto;
    		background: url("1.jpg") no-repeat;
    	}
    	ul {
    		display: flex;
    		justify-content: center;
    		align-items: center;
    		cursor: pointer;
    	}
    	li img {
    		width: 100px;
    		height: 100px;
    	}
</style>
<body>
<div id="box">
		<ul>
			<li id="li1"><img src="1.jpg"></li>
			<li id="li2"><img src="2.jpg"></li>
			<li id="li3"><img src="3.jpg"></li>
			<li id="li4"><img src="4.jpg"></li>
			<li id="li5"><img src="5.jpg"></li>
		</ul>
	</div>
<script type="text/javascript">
//方法一
	window.onload = function () {
		var li1 = document.getElementById("li1");
		var li2 = document.getElementById("li2");
		var li3 = document.getElementById("li3");
		var li4 = document.getElementById("li4");
		var li5 = document.getElementById("li5");
		var box = document.getElementById("box");	
		li1.onmouseover = function () {
			box.style.background = 'url("1.jpg") no-repeat'
		};
		li2.onmouseover = function () {
			box.style.background = 'url("2.jpg") no-repeat'
		};
		li3.onmouseover = function () {
			box.style.background = 'url("3.jpg") no-repeat'
		};
		li4.onmouseover = function () {
			box.style.background = 'url("4.jpg") no-repeat'
		};
		li5.onmouseover = function () {
			box.style.background = 'url("5.jpg") no-repeat'
		};
	}
	//方法二
	window.onload = function () {
		function $(id) {
			return typeof id === "string" ? document.getElementById(id) : null;
		}
		function changeImg(liId, imgSrc) {
			$(liId).onmouseover = function () {
				box.style.background = imgSrc;
			};
		}
		changeImg("li1", 'url("1.jpg") no-repeat');
		changeImg("li2", 'url("2.jpg") no-repeat');
		changeImg("li3", 'url("3.jpg") no-repeat');
		changeImg("li4", 'url("4.jpg") no-repeat');
		changeImg("li5", 'url("5.jpg") no-repeat');
	}
	//方法三
	window.onload = function () {
		var box = document.getElementById("box");
		var liList = document.getElementsByTagName("li");
		for (var i=0; i<liList.length; i++) {
			var sLi = liList[i];
			sLi.index = i+1;
			sLi.onmouseover = function () {
				box.style.background = 'url("'+ this.index + '.jpg") no-repeat';
			}
		}
	}
</script>
</body>
```

```html
//更换背景图片
<style type="text/css">
    	* {
    		margin: 0;
    		padding: 0;
    		list-style: none;
    		vertical-align: top;
    	}
    	body {
    		background: url("1.jpg") no-repeat;
    		background-size: cover;
    	}
       	#box {
    		background-color: rgba(255, 255, 255, .5);
    	}
    	#box ul {
    		display: flex;
    		justify-content: space-around;
    		align-items: center;
    		cursor: pointer;
    	}
    	#box li img {
    		width: 200px;
    		height: 130px;
    		padding: 10px 0;
    	}
</style>
<body>
	<div id="box">
		<ul>
			<li><img src="1.jpg"></li>
			<li><img src="2.jpg"></li>
			<li><img src="3.jpg"></li>
			<li><img src="4.jpg"></li>
			<li><img src="5.jpg"></li>
		</ul>
	</div>
<script type="text/javascript">
	window.onload = function () {
		var box = document.getElementById("box");
		var liList = box.getElementsByTagName("li");
		for (var i=0; i<liList.length; i++) {
			var sLi = liList[i];
			sLi.index = i+1;
			sLi.onclick = function () {
				document.body.style.background = 'url("'+ this.index + '.jpg") no-repeat';
			}
		}
	}
</script>
<body>
```

```html
//选中和取消
<style type="text/css">
    	* {
    		margin: 0;
    		padding: 0;
    		list-style: none;
    	}
    	#box {
    		width: 500px;
    		height: 400px;
    		margin: 110px auto;
    		text-align: center;
    		box-shadow:0 0  10px #000;
    		padding-top: 20px;
    	}
    	hr {
    		margin-top: 20px;
    		margin-bottom: 20px;
    	}
</style>
<body>
	<div id="box">
		<h3>歌曲排行榜</h3>
		<hr>
		<ul>
			<li><input type="checkbox">第一首</li><br>
			<li><input type="checkbox">第二首</li><br>
			<li><input type="checkbox">第三首</li><br>
			<li><input type="checkbox">第四首</li><br>
			<li><input type="checkbox">第五首</li><br>
		</ul>
		<button id="allSelect">全选</button>
		<button id="resetSelect">重置</button>
		<button id="contrarySelect">反选</button>
	</div>
<script type="text/javascript">
	window.onload = function () {
		var inputs = document.querySelectorAll("input");
		//全选
		$("allSelect").onclick = function () {
			for(var i=0; i<inputs.length; i++) {
				inputs[i].checked = true;
			}
		}
		//重置
		$("resetSelect").onclick = function () {
			for(var i=0; i<inputs.length; i++) {
				inputs[i].checked = false;
			}
		}
		//反选
		$("contrarySelect").onclick = function () {
			for(var i=0; i<inputs.length; i++) {
				inputs[i].checked = !inputs[i].checked;
			}
		}
		function $(id) {
			return typeof id === "string" ? document.getElementById(id) : null;
		}
	}
</script>
</body>
```

### 4.tab选项卡

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>选项卡</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
<div id="tab">
    <!--头部-->
    <div id="tab_header">
        <ul>
            <li class="selected">公告</li>
            <li>规则</li>
            <li>论坛</li>
            <li>安全</li>
            <li>公益</li>
        </ul>
    </div>
    <!--身体-->
    <div id="tab_content">
        <div class="dom" style="display: block;">
            <ul>
                <li><a href="">模块一</a></li>
                <li><a href="">模块一一</a></li>
                <li><a href="">模块一一一</a></li>
                <li><a href="">模块一一一一</a></li>
            </ul>
        </div>
        <div class="dom">
            <ul>
                <li><a href="">模块二</a></li>
                <li><a href="">模块二二</a></li>
                <li><a href="">模块二二二</a></li>
                <li><a href="">模块二二二二</a></li>
            </ul>
        </div>
        <div class="dom">
            <ul>
                <li><a href="">模块三</a></li>
                <li><a href="">模块三三</a></li>
                <li><a href="">模块三三三</a></li>
                <li><a href="">模块三三三三</a></li>
            </ul>
        </div>
        <div class="dom">
            <ul>
                <li><a href="">模块四</a></li>
                <li><a href="">模块四四</a></li>
                <li><a href="">模块四四四</a></li>
                <li><a href="">模块四四四四</a></li>
            </ul>
        </div>
        <div class="dom">
            <ul>
                <li><a href="">模块五</a></li>
                <li><a href="">模块五五</a></li>
                <li><a href="">模块五五五</a></li>
                <li><a href="">模块五五五五</a></li>
            </ul>
        </div>
    </div>
</div>
<script src="js/index.js"></script>
</body>
</html>
```

index.css

```css
*{
    margin: 0;
    padding: 0;
    list-style: none;
}

a{
    text-decoration: none;
    color: #000;
}

#tab{
    width: 498px;
    height: 120px;
    border: 1px solid #ccc;
    margin: 10px auto;
    /*overflow: hidden;*/
}

#tab_header{
    background-color: #ccc;
    height: 30px;
    line-height: 28px;
}

#tab_header ul{
    width: 500px;
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*align-items: center;*/
}

#tab_header ul li{
    width: 98px;
    float: left;
    text-align: center;
    padding: 0 1px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}

#tab_header ul li.selected{
    background-color: #fff;
    border-bottom: none;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 0;
}

#tab_header ul li:nth-child(1){
    border-left: none;
}

#tab_header ul li:nth-last-child{
    border-right: none;
}

#tab_header ul li:hover{
    font-weight: bolder;
    color: orangered;
}

/*内容区域*/
#tab_content{

}

#tab_content .dom{
    padding-top: 20px;
    display: none;
}

#tab_content .dom ul li{
    float: left;
    width: 220px;
    text-align: center;
    margin: 5px;
}
#tab_content .dom ul li a:hover{
    color: orangered;
}


```

index.js

```javascript
window.onload = function () {
    var allLi = $('tab_header').getElementsByTagName('li');
    var allDom = $('tab_content').getElementsByClassName('dom');
    for(var i=0; i<allLi.length; i++){
        var li = allLi[i];
        li.index = i;
        li.onclick = function () {
            for(var j=0; j<allLi.length; j++){
                allLi[j].className = '';
                allDom[j].style.display = 'none';
            }
            this.className = 'selected';
            allDom[this.index].style.display = 'block';
        }
    }
};
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}
```

### 5.面试知识

1. 面试题1

   输出程序结果

   ```javascript
   <script>
       fc();
       console.log(bb); // 9
       console.log(cc); // 9
       console.log(aa); // aa is not defined
       function fc() {
           var aa = bb = cc =9;
           console.log(aa); // 9
           console.log(bb); // 9
           console.log(cc); // 9
       }
   </script>
   ```

2. 面试题2

   输出程序结果

```javascript
<script>
    var a = 123;
    f1();
    function f1() {
        var b = 456;
        console.log(a); // undefined
        console.log(b); // 456
        var a = '12306';
    }
</script>
```

### 6.数组高级API

#### 1.instanceof

（1）是一个关键字，判断A是否是B类型

（2）布尔类型值 = A instanceof B;

#### 2.Array.isArray()

（1）H5中新增，判断是不是数组

（2）布尔类型值 = Array.isArray(变量);

#### 3.toString()

（1）把数组转换成字符串，每一项用,分割

（2）字符串 = 数组.toString();

#### 4.valueOf()

（1）返回数组对象本身

（2）数组本身 = 数组.valueOf();

#### 5.Join()

（1）根据每个字符把数组元素连起来变成字符串

（2）字符串 = 数组.join(变量);

（3）变量可以有可以没有，不写默认用逗号分割，无缝连接用空字符串

#### 6.indexOf()（从前往后找），lastIndexOf()从后往前找

（1）如果没有找到则返回-1

（2）索引值 = 数组。indexOf/lastIndexOf(数组中的元素)

代码测试如下：

```javascript
<script>
    //1. instanceof
    var arr = [1, 2, "haha"];
    console.log(typeof arr); //object
    console.log(arr instanceof Array); //true

    //2. Array.isArray()
    var arr = [1, 2, "haha"];
    var arr2 = new Array();
    var name = "jack";
    console.log(Array.isArray(arr)); //true
    console.log(Array.isArray(arr2)); //true
    console.log(Array.isArray(name)); //false

    //3. toString()
    var arr = [1, 2, "haha", 3, 4];
    console.log(arr.toString()); //1,2,haha,3,4
    console.log(typeof arr.toString()); //string

    //4. valueOf()
    var arr = [1, 2, "haha", 3, 4];
    console.log(arr.valueOf()) //(5) [1, 2, "haha", 3, 4]

    //5. join()
    var arr = [1, 2, "haha", 3, 4];
    console.log(arr.join("*")); //1*2*haha*3*4

    //6. indexOf()、lastIndexOf()
    var arr = [1, 2, 33, 2, 1];
    console.log(arr.indexOf(2)); //1
    console.log(arr.lastIndexOf(2)); //3
    console.log(arr.indexOf(12)); //-1
    console.log(arr.lastIndexOf(22)); //-1
</script>
```

### 7.部分习题

1. 将一个字符串数组输出为以“|”分隔的形式，比如“刘备|关羽|张飞”

```javascript
var arr = ['刘备', '张飞', '关羽'];
    console.log(arr.join("|"));
```

2. 找到数组中每个字母出现的次数

```javascript
var arr = ["c","a","z","a","a"];
    var object = {};
    for (var i=0;i<arr.length;i++){
        var key = arr[i];
        if(object[key]){
            object[key] = object[key]+1;
        }else{
            object[key] = 1;
        }
    }
    console.log(object); //{c: 1, a: 3, z: 1}
```

3. 把工资超过2000的删除

```javascript
var arr = [1500, 1200, 2000, 2100, 2200];
    for (var i=arr.length -1;i>=0;i--){
        if(arr[i] > 2000){
            arr.splice(i,1);
        }
    }
    console.log(arr); //(3) [1500, 1200, 2000]
```

### 8. 字符串的相关操作

#### 转换成字符串

```javascript
	var str = "张三";
    var str2 = '张三';
    var age = 18;
    console.log(typeof str); //string
    console.log(typeof str2); //string
    console.log(typeof (age + '')); //string
    console.log(typeof age.toString()); //18
    console.log(typeof String(age)); //string
```

#### 根据位置返回字符串

##### charAt

（1）获取相应位置字符(参数：字符位置)

（2）字符串中第一个字符的下标是0，如果参数index不在0余string.length之间，该方法将返回一个空字符串

（3）获取相应位置的字符(参数：索引值)

##### charCodeAt

获取相应位置字符编码（参数：字符位置），获取的是Unicode字符集中的编码值

```javascript
<script>
    var str = "A,Hello World";
    var str1 = "你好，中国！";
    var str2 = "abcd";
    console.log(str.charAt(1)); //,
    console.log(str1.charAt(1)); //好
    console.log(str.charCodeAt(0)); //65
    console.log(str1.charCodeAt(0)); //20320
    console.log(str2.charCodeAt(0)); //97
</script>
```

##### 获取字符串的真实长度

```javascript
<script>
    var str = "Hello world";
    var str1 = "你好，世界！";

    console.log(getStringLength(str));
    console.log(getStringLength(str1));

    /**
     * 获取字符串的真实长度
     * @param [string] str
     * @returns {number}
     */
    function getStringLength(str) {
        var len = 0, code = 0;
        for(var i=0;i<str.length;i++){
            code = str.charCodeAt(i);
            if(code >= 0 && code <= 127){
                len += 1;
            }else{
                len += 2;
            }
        }
        return len;
    }
</script>
```

#### 根据字符返回位置

##### indexOf

1. 从前往后索引字符串位置（参数：索引字符串）

2. 从前面寻找第一个符合元素的位置，找不到则返回-1

##### lastIndexOf

1. 从后往前索引字符串位置（参数：索引字符串）
2. 从后面寻找第一个符合元素的位置，找不到则返回-1

#### uri编码和解码

1. URI（通用资源标识符）进行编码，以便发送给浏览器，有效的URI中不能包含某些字符，例如空格。
2. URI编码方法可以对URI进行编码，用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。
3. encodeURIComponent()函数可把字符串作为URI组件进行编码。
4. decodeURIComponent()函数可把字符串作为URI组件进行解码。

```javascript
<script>
    var str = "https://www.baidu.com/";
    var str1 = "file:///C:/Users/81548/Desktop/js%E6%96%87%E4%BB%B6/URI.html";

    //1. 编码
    var encodestr = encodeURIComponent(str);
    console.log(encodestr); //https%3A%2F%2Fwww.baidu.com%2F

    //2. 解码
    var decodestr = decodeURIComponent(str1);
    console.log(decodestr); //file:///C:/Users/81548/Desktop/js文件/URI.html

```

#### toFixed()

参数：小数位数，结果遵循四舍五入。

```javascript
    var PI = 3.1415926;
    console.log(PI.toFixed(2)); // 3.14
```

#### 大小写转换

##### toUpperCase

转换成大写，参数：无

##### toLowerCase

转换成小写，参数：无

```javascript
<script>
    var str = "hello world";
    var str1 = "HELLO WORLD";
    console.log(str.toUpperCase()); //HELLO WORLD
    console.log(str1.toLowerCase()); //hello world
</script>
```

#### 上传图片的格式验证

```javascript
<script>
    /**
     * jpg, png, gif, jpeg
     */
    window.onload = function () {
        var file = document.getElementById('imgFile');
        file.onchange = function () {
            var path = this.value;
            var suffix = path.substr(path.lastIndexOf('.'));
            var low_suffix = suffix.toLowerCase();
            if(low_suffix === '.jpg' || low_suffix === '.png' || low_suffix === '.gif' || low_suffix === 'jpeg'){
                alert('图片上传格式正确');
            }else{
                alert('图片上传格式错误');
            }
        }
    }
</script>
```

#### 案例巩固

##### 发表评论

```css
<style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #box{
            width: 600px;
            margin: 100px auto;
            padding: 20px;
            border: 1px solid #ccc;
        }
        .box-top textarea{
            width: 70%;
            height: 100px;
        }
        .box-bottom{
            margin-top: 20px;
        }
        #ul{
            margin: 0 80px;
        }
        #ul li{
            color: red;
            border-bottom: 1px dashed #ccc;
            line-height: 44px;
        }
        #ul a{
            float: right;
        }
    </style>
```

```html
<div id="box">
    <div class="box-top">
        <label>发表评论：</label>
        <textarea id="my_textarea" cols="50" rows="10"></textarea>
        <button id="btn">发表</button>
    </div>
    <div class="box-bottom">
        <ul id="ul">
        </ul>
    </div>
</div>
```

```javascript
<script>
    $('btn').onclick = function () {
        //1.获取发表内容
        var content = $('my_textarea').value;
        //2.判断
        if(content.length === 0){
            alert('发表内容不能为空！');
            return;
        }
        //3.添加li标签
        var li = document.createElement('li');
        li.innerHTML = content+ '<a href="javascript:;">删除</a>';
        $('ul').insertBefore(li, $('ul').children[0]);
        //4.清空输入框内容
        $('my_textarea').value = '';
        //5.删除评论
        var as = $('ul').getElementsByTagName('a');
        for(var i=0;i<as.length;i++){
            var a = as[i];
            a.onclick = function () {
                this.parentNode.remove();
            }
        }
    };

    function $(id) {
        return typeof id === "string" ? document.getElementById(id) : null;
    }
</script>
```

##### 九宫格

```css
<style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #btn{
            margin: 20px;
        }
        #bottom{
            position: relative;
        }
        .bottom-item img{
            width: 270px;
            height: 400px;
        }
        .bottom-item{
            width: 270px;
            height: 450px;
            background-color: #e8e8e8;
            margin: 10px 10px;
        }
        .bottom-item p:last-child{
            font-size: 10px;
            color: red;
        }
    </style>
```

```html
<div id="btn">
    <button>3列</button>
    <button>4列</button>
    <button>5列</button>
</div>
<div id="bottom">
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
    <div class="bottom-item">
        <img src="image/1.jpg" alt="">
        <p>咱们裸熊</p>
        <p>咱是一只小熊小熊熊小熊熊可爱小熊熊</p>
    </div>
</div>
```

```javascript
<script>
    window.onload = function () {
        var btn = document.getElementById('btn').children;
        var bottom = document.getElementById('bottom');
        btn[0].onclick = function () {
            j_flex(3, bottom);
        };
        btn[1].onclick = function () {
            j_flex(4, bottom);
        };
        btn[2].onclick = function () {
            j_flex(5, bottom);
        };

        /**
         * 封装函数
         * @param allCols 总列数
         * @param parentNode 节点
         */
        function j_flex(allCols, parentNode) {
            var width = 270, height = 450, marginXY = 10;
            for(var i=0;i<parentNode.children.length;i++){
                //计算行数和列数
                var row = parseInt(i / allCols);
                var col = parseInt(i % allCols);
                //盒子的定位
                var currentBox = parentNode.children[i];
                currentBox.style.position = 'absolute';
                currentBox.style.left = col * (width + marginXY) + 'px';
                currentBox.style.top = row * (height + marginXY) +'px';
            }
        }
    }
</script>
```

### 9. 内置对象Date

#### 目前js中常用的内置对象

| 常用的内置对象 | 功能说明       |
| -------------- | -------------- |
| window         | 窗口对象       |
| document       | 文档对象       |
| Array          | 数组对象       |
| String         | 字符串对象     |
| Boolean        | 布尔对象       |
| Date           | 日期对象       |
| Error          | 异常对象       |
| Math           | 数学对象       |
| Arguments      | 函数参数对象   |
| Obiect         | 基对象         |
| RegExp         | 正则对象       |
| Number         | 数值对象       |
| Function       | 函数构造器对象 |

#### 关于Date

##### date对象常用方法

获取日期和时间

| 方法              | 作用                             |
| ----------------- | -------------------------------- |
| getDate()         | 获取日1-31                       |
| getDay()          | 获取星期0-6                      |
| getMonth()        | 获取月0-11                       |
| getFullYear()     | 获取完整年份（浏览器都支持）     |
| getHours()        | 获取小时0-23                     |
| getMinutes()      | 获取分钟0-59                     |
| getSeconds()      | 获取秒0-59                       |
| getMilliseconds() | 获取毫秒 1s = 1000ms             |
| getTime()         | 返回累计毫秒数（从1970/1/1午夜） |

```javascript
var date = new Date();
    console.log(date); //Fri Jul 03 2020 20:06:59 GMT+0800 (中国标准时间)
    console.log(date.getDate()); //日
    console.log(date.getDay()); //星期几 从0开始
    console.log(date.getMonth() + 1); //月
    console.log(date.getFullYear()); //完整年份
    console.log(date.getHours()); //小时
    console.log(date.getMinutes()); //分钟
    console.log(date.getSeconds()); //秒
    console.log(date.getMilliseconds()); //毫秒
    console.log(date.getTime()); //时间戳
```

##### date日历

```css
<style>
        #box{
            width: 240px;
            height: 340px;
            margin: 100px auto;
            background-color: orangered;
            padding: 40px;
        }
        #box_top{
            font-size: 23px;
            color: #ffffff;
        }
        #box_bottom{
            width: 90%;
            height: 70%;
            background-color: orange;
            margin: 50px auto;
            font-size: 70px;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
```

```html
<div id="box">
    <div id="box_top"></div>
    <div id="box_bottom"></div>
</div>
```

```javascript
<script>
    window.onload = function () {
        var date = new Date();
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            i = date.getMinutes(),
            week = date.getDay();
        var weeks = ['星期日', '星期一.', '星期二', '星期三', '星期四', '星期五', '星期六'];
        $('box_top').innerText = y + '年' + m +'月' + d + '日' + ' ' + weeks[week];
        $('box_bottom').innerText = h + ':' + i;
        function $(id) {
            return typeof id === 'string' ? document.getElementById(id) : null;
        }
    }
</script>
```

##### date案例巩固

###### 定时器

1. 基本语法结构

```javascript
window.setInterval("执行的代码串",间隔时间);
setInterval("console.log(每隔一秒打印一次)",1000);
```

2. 常见形式

```javascript
setInterval("func()",1000); //操作
setInterval(func,1000);  //函数
setInterval(func(){},1000);  //函数
```

3. 每间隔一秒输出'哈哈哈哈'

```javascript
<script>
        1. window.setInterval("console.log('哈哈哈哈')", 1000);

        2. setInterval(function () {
             console.log('哈哈哈哈');
         }, 1000)

        3. function test() {
            console.log('哈哈哈哈');
        }
        setInterval(test, 1000);
</script>
```

4. 定时器

```html
<button id="btn1">开启定时器</button>
<button id="btn2">关闭定时器</button>
```

```javascript
<script>
        window.onload = function () {
            var btn1 = document.getElementById('btn1');
            var btn2 = document.getElementById('btn2');

            var height = 170, timer = null;
            btn1.onclick = function () {
                timer = setInterval(function () {
                    height += 1;
                    console.log(height);
                }, 500);
            }
            btn2.onclick = function () {
                clearInterval(timer);
            }
        }
</script>
```

###### 鲜花表白

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        body{
            background-color: #000000;
            text-align: center;
            padding: 10px;
        }
        #num{
            font-size: 100px;
            color: red;
        }
        #pic{
            display: none;;
        }
    </style>
```

```javascript
    <div id="num">5</div>
    <img id="pic" src="img/pic.jpg" alt="">
    <script>
        window.onload = function () {
            timer = setInterval(function () {
                    $('num').innerText -= 1;

                    if($('num').innerText == 0){
                        clearInterval(timer);
                        $('num').style.display = 'none';
                        $('pic').style.display = 'block';
                        $('pic').style.margin = 'auto';
                    }
                }, 1000);

            function $(id) {
                return typeof id === 'string' ? document.getElementById(id) : null;
            }
        }
    </script>
```

###### 放假倒计时

```css
    <style>
        #time{
            font-size: 50px;
            text-align: center;
            color: red;
        }
    </style>
```

```javascript
    <div id="time"></div>
    <script>
        window.onload = function () {
            var time = document.getElementById('time');
            //1. 获取放假时间
            var nextDate = new Date('2020/10/1 10:10:10');
            setInterval(function () {
                //2. 获取现在时间
                var currentDate = new Date();
                //3. 获取现在时间戳
                var currentTime = currentDate.getTime();
                //4. 获取放假时间戳
                var nextTime = nextDate.getTime();
                //5. 剩下的时间戳
                var allTime = nextTime - currentTime; //毫秒
                //7. 毫秒转成秒
                var allSecond = parseInt(allTime / 1000);
                //8. 转化
                var d = size(parseInt(allSecond / 3600 / 24));
                var h = size(parseInt(allSecond / 3600 % 24));
                var m = size(parseInt(allSecond / 60 % 60));
                var s = size(parseInt(allSecond % 60));
                //9. 注入
                time.innerHTML = '距离放假还有' + d + '天' + h + '小时' + m + '分钟' + s + '秒';
            }, 1000)
            function size(num) {
                return num>=10 ? num : '0' + num ;
            }
        }
    </script>
```

###### 时钟案例

所需图片：

![clock](img/clock.jpg)

![](E:/GitProjects/Documents/Image/Markdown/hour.png)

![](E:/GitProjects/Documents/Image/Markdown/minute.png)

![](E:/GitProjects/Documents/Image/Markdown/second.png)

```css
    <style>
        #box{
            width: 600px;
            height: 600px;
            background: url('img/clock.jpg') no-repeat;
            position: relative;
        }
        #hour, #minute, #second{
            position: absolute;
            width: 30px;
            height: 600px;
            left: 50%;
            top: 0;
            margin-left: -15px;
        }
        #hour{
            background: url('img/hour.png') no-repeat center center;
            
        }
        #minute{
            background: url('img/minute.png') no-repeat center center;
        }
        #second{
            background: url('img/second.png') no-repeat center center;
        }
    </style>
```

```javascript
    <div id="box">
        <div id="hour"></div>
        <div id="minute"></div>
        <div id="second"></div>
    </div>
    <script>
        var hour = document.getElementById('hour');
        var minute = document.getElementById('minute');
        var second = document.getElementById('second');
        setInterval(function () {
           var date = new Date();
           var ms = date.getMilliseconds(); //毫秒
           var s = date.getSeconds() + ms / 1000; //秒 360/60
           var m = date.getMinutes() + s / 60; //分钟 360/60
           var h = date.getHours() + m / 60; //小时 360/12
           hour.style.transform = 'rotate('+ 30 * (h % 12) +'deg)';     
           minute.style.transform = 'rotate('+ 6 * m +'deg)';
           second.style.transform = 'rotate('+ 6 * s +'deg)'
        }, 10)
    </script>
```

###### 防止定时器累加

**原则：**先清空再设置定时器

```css
<style>
        #box{
            width: 200px;
            height: 200px;
            background-color: orange;
        }
</style>
```

```javascript
    <button id="box"></button>
    <script>
        var btn = document.getElementById('box');
        var height = 0, timer = null;
        btn.onmouseover = function () {
            /**
            * 防止定时器累加，先清空再设置定时器
            **/
            clearInterval(timer);
            timer = setInterval(function () {
                    height += 1;
                    console.log(height);
                }, 1000)
        }
    </script>
```

###### 滚动长图

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        body{
            background-color: #000000;
        }
        img{
            width: 550px;
        }
        #box{
            width: 550px;
            height: 350px;
            overflow: hidden;
            margin: 100px auto;
            position: relative;
        }
        #img{
            position: absolute;
            top: 0;
            left: 0;
        }
        #to_top, #to_bottom{
            width: 100%;
            height: 50%;
            position: absolute;
            left: 0;
            cursor: pointer;
        }
        #to_top{
            top: 0;
        }
        #to_bottom{
            bottom: 0;
        }
    </style>
```

```javascript
    <div id="box">
        <img id="img" src="img/长图.png" alt="">
        <span id="to_top"></span>
        <span id="to_bottom"></span>
    </div> 
    <script>
        window.onload = function () {
            var box = document.getElementById('box');
            var img = document.getElementById('img');
            var to_top = document.getElementById('to_top');
            var to_bottom = document.getElementById('to_bottom');

            var num = 0, timer = null;
            to_top.onmouseover = function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    num -= 5;
                    if(num >= -1025){
                        img.style.top = num + 'px';  
                    }else{
                        clearInterval(timer);
                    }
                }, 20);
            };
            to_bottom.onmouseover = function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    num += 5;
                    if(num <= 0){
                        img.style.top = num + 'px';
                    }else{
                        clearInterval(timer);
                    }
                }, 20);
            };
            to_top.onmouseout = function () {
                clearInterval(timer);
            }
            to_bottom.onmouseout = function () {
                clearInterval(timer);
            }
        }
    </script>
```

###### 点名册

```javascript
    <button id="open">开始点名</button>
    <button id="close">结束点名</button>
    <div id="name"></div>
    <script>
        var open = document.getElementById('open');
        var close = document.getElementById('close');
        var names = document.getElementById('name');
        var timer = null, nameList = [
            "张三", "李四", "李三", "王五", "王六", "小陈", "校长"
        ];
        open.onclick = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                    var num = parseInt(Math.random() * nameList.length);
                    var n_index = nameList[num];
                    names.innerText = n_index;
                }, 20);
        }
        close.onclick = function () {
            clearInterval(timer);
        }
    </script>
```

###### 一次定时器

核心：setTimeout(function(){}, 1000); //过一秒再去执行function函数

```javascript
    <button id="btn1">3秒后吃饭</button>
    <button id="btn2">结束</button>
    <script>
        var btn1 = document.getElementById('btn1');
        var btn2 = document.getElementById('btn2');
        var timer = null;
        btn1.onclick = function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                alert('该吃饭了');
            }, 3000);
        };
        btn2.onclick = function () {
            clearTimeout(timer);
        };
    </script>
```

###### 定时器匀速动画

```css
    <style>
        #box{
            width: 90px;
            height: 90px;
            background-color: red;
        }
    </style>
```

```javascript
    <button id="btn">开始动画</button>
    <div id="box"></div>
    <script>
    window.onload = function () {
        var btn = document.getElementById('btn');
        var box = document.getElementById('box');
        btn.onclick = function () {
            var timer = null,begin = 0, step = 10, target = 700;
            clearInterval(timer);
            timer = setInterval(function () {
                begin += step;
                if(begin >= target){
                    begin = target;
                    clearInterval(timer);
                }
                box.style.marginLeft = begin + 'px';
            }, 10);
        };
    }
    </script>
```

###### 定时器缓动动画

```css
    <style>
        #box{
            width: 90px;
            height: 90px;
            background-color: red;
        }
    </style>
```

```javascript
    <button id="btn">开始动画</button>
    <div id="box"></div>
    <script>
        window.onload = function () {
            var timer = null, begin = 0, target = 800;
            $('btn').onclick = function () {
                clearInterval(timer);
                setInterval(function () {
                    //起始值 += （结束值-起始值） * 缓动系数，缓动系数的大小决定了缓动的快慢
                    begin += (target - begin) * 0.2;
                    if(Math.round(begin) >= target){
                        begin = target;
                        clearInterval(timer);
                    }
                    $('box').style.marginLeft = begin + 'px';
                }, 100);
            };
            function $(id) {
                return typeof id === 'string' ? document.getElementById(id) : null;
            };
        }
    </script>
```

###### 仿淘宝轮播

```css
    <style>
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        a{
            text-decoration: none;
            color: #000000;
        }
        #box{
            width: 522px;
            height: 250px;
            border: 1px solid #ccc;
            margin: 100px auto;
            position: relative;
        }
        .left, .right{
            width: 60px;
            height: 250px;
            float: left;
            text-align: center;
        }
        .center{
            width: 400px;
            height: 250px;
            float: left;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            overflow: hidden;
        }
        li{
            line-height: 27px;
            border-bottom: 1px solid #ccc;
        }
        .left li:last-child, .right li:last-child{
            border: none;
        }
        .active{
            background-color: red;
        }
    </style>
```

```html
    <div id="box">
        <ul class="left">
            <li class="active"><a href="#">美食1</a></li>
            <li><a href="#">美食2</a></li>
            <li><a href="#">美食3</a></li>
            <li><a href="#">美食4</a></li>
            <li><a href="#">美食5</a></li>
            <li><a href="#">美食6</a></li>
            <li><a href="#">美食7</a></li>
            <li><a href="#">美食8</a></li>
            <li><a href="#">美食9</a></li>
        </ul>
        <div class="center">
            <a href="#"><img src="img/1.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/2.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/3.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/4.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/5.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/6.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/7.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/8.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/9.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/10.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/11.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/12.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/13.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/14.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/15.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/16.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/17.jpg" alt="" width="400px" height="250px"></a>
            <a href="#"><img src="img/18.jpg" alt="" width="400px" height="250px"></a>
        </div>
        <ul class="right">
            <li><a href="#">美食10</a></li>
            <li><a href="#">美食11</a></li>
            <li><a href="#">美食12</a></li>
            <li><a href="#">美食13</a></li>
            <li><a href="#">美食14</a></li>
            <li><a href="#">美食15</a></li>
            <li><a href="#">美食16</a></li>
            <li><a href="#">美食17</a></li>
            <li><a href="#">美食18</a></li>
        </ul>
    </div>
```

```javascript
    <script>
        var allLi = document.getElementsByTagName('li');
        var allImg = document.getElementsByTagName('img');
        var loop = 0;
        setInterval(function () {
            loop += 1;
            loop %= 18;
            for(var i=0;i<allLi.length;i++){
                allLi[i].className = '';
                allImg[i].style.display = 'none';
            }
            allLi[loop].className = 'active';
            allImg[loop].style.display = 'block';
        }, 500)
    </script>
```





