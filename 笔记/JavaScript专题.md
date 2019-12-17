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