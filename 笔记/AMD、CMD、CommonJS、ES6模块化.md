### 概述

1. AMD、CMD、CommonJS、ES6模块化都用于模块化的定义中
2. AMD、CMD、ES6用于浏览器中，CommonJS用于Node端


### AMD

1. AMD是`ES5`中异步模块的规范、实现该规范的是RequireJS
2. 依赖前置、异步定义

```
<!-- 依赖的模块，提前定义引用；在异步回调中使用依赖 -->
define(['/package/lib'],function(lib){
    function foo(){
        lib.log("foo")
    }
    return {
        foo
    }
})
```

### CMD

1. CMD是`ES5`中同步模块的规范、实现该规范的是SeaJS
2. 依赖就近、同步定义

```
define(function(require,exports,module){
    <!-- 用到依赖的时候再引用；同步使用 -->
    var $ = require('jquery')
    $('#div').html("hello world")
})
```

### CommonJS

1. CommonJS是`ES5`中node端的模块化规范、通过`module.exports`定义
2. 两种导出方式：默认输出`module export`和带有名字的输出`exports.XXX`

```
exports.hello = function(){
    console.log("hello")
}
function foo(){
    lib.log("foo")
}
exports default foo
```

### ES6特性

1. ES6特性，通过export/import对模块进行导出导入的

```
export default {
    data:{

    },
    mouted:function(){

    }
}
```