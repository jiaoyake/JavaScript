# JS对象

JS是基于对象的语言。无法创建自定义的类型，不能很好的支持继承和多态

## JS中常见的对象

### 1、无序属性的集合

其属性可以包含基本值、对象或函数

对象就是一组没有顺序的值

我们可以把JS中的对象想象成键值对，其中值可以是数据和函数

### 2、对象的行为和特征

特征--->属性

行为--->方法

### 3、字面量对象

```
var  dog = {

​	//属性
​	name: "旺财",
​	age: 10,
​	dogFriends: ["阿福", "阿黄", "阿旺"],

​	//方法
​	eat: function () {
​		console.log("吃");
​	}

​	run: function () {
​		console.log("跑");
​	}
};

console.log(dog.name); //输出旺财

dog.name = "张三"; //改变对象中的name

console.log(dog.name); //输出张三

dog.eat(); //输出吃
```

### 4、JSON

JS对象的表示形式，JS的子集

**JSON和对象字面量的区别：**

​		JSON的属性必须用双引号引起来，对象字面量可以省略

```
	例：var dog = {
​				"name": "旺财",
​				"age":10,
​				dogFriends: ["阿福", "阿黄", "阿旺"]
​		};
```

​		JSON本质上是一种数据交换格式，JSON有两种结构：对象和数组，两种结构相互组合从而形成各种复杂的数据结构。

### 5、遍历对象的属性

for...in遍历对象的属性或者方法

```
var  dog = {

​	//属性
​	name: "旺财",
​	age: 10,
​	dogFriends: ["阿福", "阿黄", "阿旺"],

​	//方法
​	eat: function () {
​		console.log("吃");
​	}

​	run: function () {
​		console.log("跑");
​	}

};

for (var key in dog) {
​	console.log(key); //输出name  age  dogFriends  eat run
​	console.log(dog[key]); //输出旺财 10等值
}
```

### 6、构造函数

new后面调用函数（new Object()）,凡是能产生对象的函数就是构造函数

```
 function Person() {
​	var obj = new Object();

​	//属性
​	obj.name = null;
​	obj.age = null;
​	obj.sex = null;

​	//方法
​	obj.study = function () {
​		console.log(this.name + "在学习");
​	}

​	obj.sleep = function () {
​		console.log(this.name + "在睡觉");
​	}
​	return obj;
}

​	var p = Person(); //创建第一个对象
​		p.name = "张三";
​		p.age = "18";
​		p.sex = "男";

​		console.log(p);

​		p.study(); //输出张三在学习
​	var p1 = Person(); //创建第二个对象
​		p1.name = "李四";

​		console.log(p1); //输出李四  null null等
```

​		

### 7、this

this所在的函数在哪个对象中，this就代表这个对象

谁调用this就是谁

构造函数中的this，始终是new的当前对象

```
function Dog(name, age, dogFriends) {

​	this.name = name;
​	this.age = age;
​	this.dogFriends = dogFriends;

​	this.eat = function(something) {
​			console.log(this.name + "在吃" + something);
​	}

​	this.run = function(somewhere) {
​			console.log(this.name + "跑" + somewhere);
​	}
}

var smallDog = new Dog("小花", 1);

console.log(smallDog.name, smallDog.age);//输出小花  1

smallDog.age = 10;

consoe.log(smallDog.age); //输出10

smallDog.eat("狗粮"); //输出小花在吃狗粮
smallDog.run("公园"); //小花跑公园
var bigDog = new Dog("大华", 10, ["大大", "小小"]);

console.log(bigDog);
```

*另一种方式：*

```
function Dog(option) {

​	this.name = option.name;
​	this.age = option.age;
​	this.dogFriends = option.dogFriends;
​	this.eat = function(something) {
​			console.log(this.name + "在吃" + something);
​	}

​	this.run = function(somewhere) {
​			console.log(this.name + "跑" + somewhere);
​	}
}

var smallDog = new Dog({name:"小花", age:1});

console.log(smallDog.name, smallDog.age);//输出小花  1

smallDog.age = 10;

console.log(smallDog.age); //输出10

smallDog.eat("狗粮"); //输出小花在吃狗粮
smallDog.run("公园"); //小花跑公园
var bigDog = new Dog({name:"大华", age:10, dogFriends:["大大", "小小"]});

console.log(bigDog);
```



### 8、构造器和原型属性

var arr = new Array();//Array()是数组对象的构造方法

Array对象属性：

​	constructor：返回对创建此对象的数组函数的引用

​	prototype：使我们有能力向对象添加属性和方法

**例：**

```
var arr = new Array();

arr.eat = function() {
​	alert("我会吃东西");
}

arr.eat(); //输出我会吃东西

var arr2 = new Array();
arr2.eat(); //无输出内容
```

**prototype和constructor的使用**

```
Array.prototype.eat = function () {
​	alert("我会吃东西");
}

Array.prototype.test = "小花";
var arr = new Array();
arr.eat(); //输出我会吃东西

console.log("-----" + arr.test); //输出-----小花

console.log(arr.constructor); //输出Array()

var arr2 = new Array();
arr2.eat(); //输出我会吃东西

console.log("+++++" + arr2.test); //输出+++++小花
console.log(arr2.constructor); //输出Array()
```

*补充*：

```
function Dog(option) {
​	this._init(option);
}

Dog.prototype = {

​	_init: function (option) {

​		//属性
​		this.name = option.name;
​		this.age = option.age;
​		this.dogFriends = option.dogFriends;
​	},

​	eat: function (something) {
​		console.log(this.name + "在吃" + something);
​	},

run: function (somewhere) {
​		console.log(this.name + "跑" + somewhere);
​	}
};

var smallDog = new Dog({name:"小花", age:1});

console.log(smallDog.name, smallDog.age);//输出小花  1

smallDog.age = 10;

console.log(smallDog.age); //输出10
```



### 8、数据类型

堆区和栈区：

栈区：一般由编译器自动分配释放，存放函数的参数值，局部变量的值等。

堆区：一般由程序员分配释放，若开发者不释放，程序结束时可能由OS回收

简单（基本）数据类型：

number,string,boolean,undefined,null

存储在栈区

复杂（引用）数据类型：

object,array,date

存储在堆区，不能直接访问堆区，只能通过栈区访问堆区，在堆区开辟的空间会有一个地址，地址存放在栈区。（通过栈区访问堆区）

### 9、内置对象

常见的内置对象：Date, Array, Math, RegExp, Error, String...

#### **sort()**

默认按照升序排列数组项，只能通过第一位排列，可以通过回调函数进行规则设置。a - b升序（默认），b - a降序

```
var arr = [1, 6, 11, 8, 2];

arr.sort(function(a, b) {
​	return a - b; //默认升序
});

arr.sort(function(a, b) {
​	return b - a; //默认降序
});
```

#### **slice()**

返回从原数组中指定开始下标到结束下标之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项（但不包括结束位置的项）。

#### **splice()**

可以实现删除（splice(删除的位置,删除的项数)）、插入（splice(起始位置,0(要删除的项数),要插入的项)）和替换（splice(起始位置,要删除的项,要替换的内容)）、清空数组（splice(0)）。

#### **foreach()**

```
var arr = [4, 5, 6];
arr.forEach(function (value, index) {
​	console.log(index + ":" + value); //输出1:4   2:5  3:6
})
```

#### **map()**

映射：对数组中的每一项运行给定函数，返回每次函数调用组成的数组。

```
var arr = [1, 3, 5, 7, 9];
var arr2 = arr.map(function(value, index){
​	return value * value;
});

console.log(arr2); //输出1  9  25  49  81
```

#### **filter()**

过滤功能：数组中的每一项运行给定函数，返回满足过滤条件组成的数组。

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var arr2 = arr.filter(function (value, index){
​	return index%3 === 0 || index >= 9;//过滤数组索引是3的倍数和索引大于9
});

console.log(arr2);
```

#### **every()**

数组中每一项都满足条件时返回true。

#### **some()**

数组中只要有一项满足条件就会返回true。