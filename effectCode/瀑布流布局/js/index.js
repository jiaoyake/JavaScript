/*
 * @Author: your name
 * @Date: 2020-07-20 15:06:58
 * @LastEditTime: 2020-07-21 16:44:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \瀑布流布局\js\index.js
 */ 
window.onload = function () {
    //1.实现瀑布流布局
    waterFull("main", "box");

    //2.动态加载图片
    var timer1 = null;
    window.onscroll = function () {
        clearTimeout(timer1);
        timer1 = setTimeout(function () {
            if(checkWillLoadImage()){
                //2.1造数据
                var dataArr = [
                    {"src": "1.jpg"},
                    {"src": "2.jpg"},
                    {"src": "3.jpg"},
                    {"src": "4.jpg"},
                    {"src": "5.jpg"},
                    {"src": "6.jpg"},
                    {"src": "7.jpg"},
                    {"src": "8.jpg"},
                    {"src": "9.jpg"},
                    {"src": "1.jpg"},
                    {"src": "2.jpg"},
                ];
                //2.2创建元素
                for(var i=0; i<dataArr.length; i++){
                    var newBox = document.createElement("div");
                    newBox.className = "box";
                    $("main").appendChild(newBox);
    
                    var newPic = document.createElement("div");
                    newPic.className = "pic";
                    newBox.appendChild(newPic);
    
                    var newImg = document.createElement("img");
                    newImg.src = "images/" + dataArr[i].src;
                    newPic.appendChild(newImg);
                }
                //2.3重新布局
                waterFull("main", "box");
            }
        }, 200);
    }
    //3.窗口的大小发生改变
    var timer = null;
    window.onresize = function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            console.log(1);
            waterFull("main", "box");
        }, 200);
    }
};

/**
 * 实现瀑布流布局
 */
function waterFull(parent, child) {
    //1. 父盒子居中
    //1.1 获取所有盒子
    var allBox = $(parent).getElementsByClassName(child);
    //1.2获取子盒子的宽度
    var boxW = allBox[0].offsetWidth;
    //1.3获取屏幕宽度
    var screenW = document.documentElement.clientWidth;
    //1.4求出列数
    var cols = parseInt(screenW / boxW);
    //1.5父盒子居中
    $(parent).style.width = cols * boxW + 'px';
    $(parent).style.margin = "0 auto";

    //2.子盒子的定位
    //2.1定义高度数组
    var heightArr = [], boxHeight, minBoxHeight = 0, minBoxIndex = 0;
    //2.2遍历子盒子
    for(var i=0;i<allBox.length;i++){
        //2.2.1求出每个子盒子的高度
        boxHeight = allBox[i].offsetHeight;
        //2.2.2取出第一行盒子的高度放入高度数组
        if(i < cols){ //第一行
            heightArr.push(boxHeight);
            allBox[i].style = '';
        }else{ //剩余行
            //1.取出最矮的盒子高度
            minBoxHeight = Math.min.apply(this, heightArr);
            //2.求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            //3.子盒子定位
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * boxW + 'px';
            allBox[i].style.top = minBoxHeight + 'px';

            //4.更新数组中高度
            heightArr[minBoxIndex] += boxHeight;
        }  
    }
};

/**
 * 拿到最矮盒子对应索引
 * @param {*} arr 
 * @param {*} val 
 */
function getMinBoxIndex(arr, val) {
    for(var i=0;i<arr.length;i++){
        if(arr[i] === val){
            return i;
        }
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
};

/**
 * 判断是否具备加载图片的条件
 * @param {*} params 
 */
function checkWillLoadImage(params) {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];
    //2.求出最后一个盒子自身高度的一半加上盒子距离顶部的高度
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
    //3.求出屏幕的高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;
    //4.求出页面偏移浏览器的高度
    var scrollTop = scroll().top;
    return lastBoxDis <= screenW + scrollTop;
}