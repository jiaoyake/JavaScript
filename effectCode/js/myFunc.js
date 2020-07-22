/*
 * @Author: your name
 * @Date: 2020-07-21 16:07:38
 * @LastEditTime: 2020-07-22 17:44:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \未命名文件夹\myFunc.js
 */ 
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
    
    /**
     * 获取css的样式值
     * @param {objext} obj 
     * @param {string} attr 
     */
    function getCSSAttrValue(obj, attr) {
        if(obj.currentStyle){ //IE和Opera
            return obj.currentStyle[attr];
        }else{
            return window.getComputedStyle(obj, null)[attr];
        }
    }