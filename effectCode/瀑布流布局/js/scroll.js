/*
 * @Author: your name
 * @Date: 2020-07-20 16:42:45
 * @LastEditTime: 2020-07-20 16:43:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \瀑布流布局\js\scroll.js
 */ 
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