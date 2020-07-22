# 数组的定义

### 1、使用Array构造函数

```
var arr1 = new Array(); //创建了一个空数组
var arr2 = new Array(20); //创建了一个长度为20的数组
var arr3 = new Array("第一个数据","第二个数据",3); //初始化数组内的值
```

### 2、使用数组字面量

```
var arr4 = [];
var arr5 = [30]; //30为数组内的内容
```

### 3、使用数组字面量定义数组长度100

```
var arr = [];
arr.length = 100;

var arr = ["jiao", 18, "女"];
console.log(arr.length); //输出数组长度3
console.log(arr[0]); //输出jiao
console.log(arr[length]); //输出undefined
```

**例题：**

```
//将数组中值为0的去掉，不为0的存入一个新数组

var arr = [0, "jiao", 0, "女", 15565652536], newArr = [];
​	for (var i = 0; i <  arr.length; i++) {
​		if (arr[i] != 0) {
​						newArr[newArr.length] = arr[i];
​			}
}
```

# JS数组的常用方法

```
//join("分隔符类型，默认为,")
var arr = ["jiao", 18, "女"];
arr.join("|") //输出字符串jiao|18|女
```

### **//push()和pop()**

push()接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。

pop()数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

```
var arr = ["张三", "李四", "王五"];
var count = arr.push("赵六", "赵七");

console.log(count);  //输出7
console.log(arr);  //输出数组["张三", "李四", "王五", "赵六", "赵七"]

var item = arr.pop()
console.log(item); //输出赵七
console.log(arr); //输出数组["张三", "李四", "王五", "赵六"]
```

### **shift()和unshift()**

shift()删除原数组的第一项，并返回删除元素的值，如果数组为空则返回undefined

unshift()将参数添加到原数组开头，并返回数组的长度。

```
var arr = ["张三", "李四", "王五"];

console.log(arr.shift()); //输出"张三"
console.log(arr); //输出数组["李四","王五"]

var arr = ["张三", "李四", "王五"];
console.log(arr); //输出数组["张三", "李四", "王五"]

var count = arr.unshift("小沈阳", "宋小宝");
console.log(count); //输出5
console.log(arr); //输出数组["小沈阳", "宋小宝", "张三", "李四", "王五"]
```

### **reverse()**反转数组元素

```
var arr = ["张三", "李四", "王五"];
arr.reverse(); //自身也会输出数组["王五", "李四", "张三"]

console.log(arr); //输出数组["王五", "李四", "张三"]
```

### **concat**()

将参数添加到原数组中，这个方法会先copy一个当前数组，然后将接收到的参数添加到这个copy数组的末尾，最后返回新构建的数组，在没有给concat()方法传递参数的情况下，它只是复制当前数组并返回。

```
var arr = [1, 3, 5, 7, 9];
var copyArr = arr.concat(11, "王二", ["张三", "李四"]);

console.log(arr); //输出数组[1, 3, 5, 7, 9]
console.log(copyArr); //输出数组[1, 3, 5, 7, 9, 11, "王二", "张三", "李四"]
```

注：concat()和push()的区别：concat()不会影响原数组，可以把参数中的数组拆成单个元素添加进去，push()后原数组也随之改变，数组直接放进原数组，不会拆分

### **indexOf()和lastIndexOf()**

indexOf()接收两个参数：要查找的项和（可选的）表示查找起点位置的索引，其中，从数组的开头（位置0）开始向后查找。

lastIndexOf()接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中，从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1.

在比较第一个参数与数组中的每一项时，会使用全等操作符。

```
var arr = [2, 4, 6, 8, 8, 6, 4, 2];
arr.indexOf(4); //输出1
arr.indexOf(4, 2); //输出6
arr.lastIndexOf(4); //输出6
arr.lastIndexOf(4, 2); //输出1
arr.indexOf("4"); //输出-1（查找字符串4，但是数组中的4是number类型）
```

# 函数

### 1、函数声明方式

```
function sum() {
​	console.log(1+3);
}
sum();
```

### 2、函数表达式声明方式

```
var add = function () {
​	console.log(1+3);
};

add();
```

### 3、使用function构造函数

```
var add2 = new function('console.log(1+3)');

add2();
```

注：函数中实参个数可以和形参个数不一样

```
//求出多个数的和

function sum(numAr) {
​	var value = 0;
​	for (var i = 0; i < numArr.length; i++) {
​				value += numArr[i];
	}

​	console.log(value);
}
var numArr = [1, 2, 3];

sum(numArr);
```

### 补充：

**函数内部有一个arguments对象**

包含了传入函数中的所有参数，arguments并不是一个数组，只是于数组相似，除了拥有length属性，数组的所有属性和方法都不具备。

arguments对象还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。

```
//求出多个数的和

function sum(numAr) {
​	//console.log(arguments); //输出长度为3的伪数组

​	var value = 0;
​		for (var i = 0; i < arguments.length; i++) {
​				value += arguments[i];
​		}

​		console.log(value);
​		console.log(arguments.length); //输出实参（10， 20， 30）的个数3
​		console.log(sum.length); //输出function sum(num1, num2)中形参num1, num2的个数2
​	}

sum(10, 20, 30);
```

**函数直接声明和函数表达式声明的区别：**

函数直接声明时JS解析器会把当前作用域的函数声明提前到整个作用域的最前面。

### **匿名函数：**

#### （1）用在绑定时间的时候

```
document.onclick = function (){	alert("点我干嘛？");	}
```

#### （2）定时器

```
setInteval(function () {
​	console.log(111);
	}, 1000);
```

#### （3）自调用函数

```
闭包：(function() {	alert("真的会执行吗？")	})();
```

#### **（4）回调函数：**

如果你把函数的指针（地址）作为参数传递给另外一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。

**递归**

```
//求数列的第n个数：1 1 2 3 4 8 13 21...

function f1(n) {
​	if (n === 1 || n === 2) {return 1};
​	return f1(n-1) + f1(n-2);
}

console.log(f1(4)); //输出3

//求n个数的累加 1, 2, 3, 4...
function f2(n) {
​	if (n ===1 ) {return 1};
​	return f2(n-1) + n;
}
```

# **变量的作用域**

**全局变量**：定义在script或者不属于某个函数的变量

**局部变量**：定义在函数内部的变量

**注**：函数内部可以访问到该函数所属的外部作用域的变量（作用域链）

不使用var声明的变量，是全局变量（不推荐）

变量退出作用域之后会销毁，全局变量关闭网页或浏览器才会销毁

**例题：**

```
// 输出undefined

var num = 10;
fun();
function fun(){
​	console.log(num);
​	var num = 20;
}
```

因为fun()中num的声明在最后，但是在执行函数时会把声明提前，赋值在后：

```
function fun() {
​	var num;
​	console.log(num);
​	num = 20;
}

//输出undefined  9

var a = 18;
f1();
function f1(){
​	var b = 9;

​	console.log(a);
​	console.log(b);

​	var a = '123';
}

//输出9  9  9  9  9  报错

f1();

console.log(c);
console.log(b);
console.log(a);
function f1(){
​	var a = b = c = 9;

​	console.log(a);
​	console.log(b);
​	console.log(c);
}
```

函数f1()等同如下：

```
function f1(){
​	var a = 9; //局部变量
​	b = 9; //全局变量
​	c = 9; //全局变量

​	console.log(a);
​	console.log(b);
​	console.log(c);
}

```