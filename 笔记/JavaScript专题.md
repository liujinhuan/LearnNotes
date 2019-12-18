## debounce防抖

> 解决事件的频繁触发，两种解决方案：debounce 防抖、throttle 节流

+ 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，

第一版本

```js
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        // 是否立即执行
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            // 返回值的情况、处理this、处理参数event
            if (callNow) {
                result = func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };
    // 取消
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

## throttle 节流

+ 节流的原理很简单：

如果你持续触发事件，每隔一段时间，只执行一次事件。
根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

+ 关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

```js
// 使用时间戳
function throttle(func, wait) {
    var context,args;
    var previous = 0;
    return function(){
        var now = +Date()
        context = this;
        args = arguments
        if(now-previous>wait){
            func.apply(context,arg)
            previous = now
        }
    }
}
// 使用定时器
function throttle(func, wait) {
    var context,args,timeout;
    return function(){
        context = this;
        args = arguments
        if(!timeout){
            timeout = setTimeout(function(){
                timeout = null
                func.apply(context,arg)
            },wait)
        }
    }
}
```

所以比较两个方法：

第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件


双剑合璧

```js
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调
// 二者不可同时设置
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        // 禁用第一次的话，上一个的时间就设置为此时
        if (!previous && options.leading === false) previous = now;
        // 下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            // 清空定时器
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            // 上一个的时间就设置为此时
            previous = now;
            // 立即执行
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {// 禁用停止触发的回调
            timeout = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}
```

## 数组去重


```js
// array：表示要去重的数组，必填
// isSorted：表示函数传入的数组是否已排过序，如果为 true，将会采用更快的方法进行去重
// iteratee：传入一个函数，可以对每个元素进行重新的计算，然后根据处理的结果进行去重
var array3 = [1, 1, 'a', 'A', 2, 2];

// 第二版
// iteratee 英文释义：迭代 重复
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value)
            }
            seen = computed;
        }
        else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }        
    }
    return res;
}

console.log(unique(array3, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
})); // [1, "a", 2]
```

## 类型判断

+ typeof
    + 在 ES6 前，JavaScript 共六种数据类型，分别是：Undefined、Null、Boolean、Number、String、Object
    + typeof 对这些数据类型的值进行操作，结果分别是：undefined、object、boolean、number、string、object
    + Null 和 Object 类型都返回了 object 字符串。
    + 但是 typeof 却能检测出函数类型。
    + 但是 Object 下还有很多细分的类型呐，如 Array、Function、Date、RegExp、Error ，所以有没有更好的方法呢？
    + 是的，当然有！这就是 Object.prototype.toString！

+ Object.prototype.toString！可以识别至少 14 种类型
+ 写一个 type 函数能检测各种类型的值，如果是基本类型，就使用 typeof，引用类型就使用 toString。此外鉴于 typeof 的结果是小写，我也希望所有的结果都是小写。

```js
// 第二版
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

## 深浅拷贝
+ 复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个
+ concat 和 slice 是一种浅拷贝
+ JSON.parse( JSON.stringify(arr) )可以实现数组的深拷贝，但是不能拷贝函数
+ 如何实现一个对象或者数组的浅拷贝

```js
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

+ 如何实现一个深拷贝呢？我们在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数不就好了~

```js
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```