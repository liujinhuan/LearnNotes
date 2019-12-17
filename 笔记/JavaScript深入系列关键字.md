## JavaScript深入之词法作用域和动态作用域

```js
1. Person是构造函数、person是创建出来的实例对象
2. 构造函数（Person）具有prototype属性，指向的是实例对象（person）的原型
3. 实例对象（person）的__proto__也会指向原型
4. 原型的contructor属性会指向构造函数
5. 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
6. 由__proto__组成的链状结构就是原型链
7. 什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
```

## JavaScript深入之词法作用域和动态作用域

```js
1. JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
2. 作用域是指程序源代码中定义变量的区域。规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
3. 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
4. 而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
5. 
```

## JavaScript深入之执行上下文栈

```js
1. JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，
2. JavaScript 的可执行代码：全局代码、函数代码、eval代码
3. 当执行到一个函数的时候，就会进行准备工作，叫做"执行上下文(execution context)"
4. JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文
5. 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

```

## JavaScript深入之变量对象

```js
1. 每个执行上下文，都有三个重要属性：变量对象(Variable object，VO)、作用域链(Scope chain)、this
2. 全局上下文中的变量对象就是全局对象呐！
3. 在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。
4. 变量对象是在引擎层面实现的，js环境中不可访问，只有进入了执行上下文被激活变成AO，才可以被访问
5. 全局上下文的变量对象初始化是全局对象、
6. 函数上下文的变量对象初始化只包括 Arguments 对象、
7. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值、
8. 在代码执行阶段，会再次修改变量对象的属性值
9. 执行上下文的代码会分成两个阶段进行处理：分析和执行
```

## JavaScript深入之作用域链 

```js
1. 从 ECMASciript5 规范开始讲起
```

## JavaScript深入之执行上下文

```js

```

## JavaScript深入之闭包

```js
1. 闭包=函数+函数可以访问的自由变量
2. 在《JavaScript权威指南》中就讲到：从技术的角度讲，所有的JavaScript函数都是闭包。
```

```js
ECMAScript中，闭包指的是：
1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）在代码中引用了自由变量

因为这个作用域链, JavaScript 依然会将已经销毁了的AO对象保存在内存中，所以可以被他人使用，形成闭包
```

## JavaScript深入之参数按值传递

```js
1. 按值传递:把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样
2. 引用传递:传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。
3. 共享传递:在传递对象的时候，传递对象的引用的副本
4. 注意： 按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！
5. 最后：参数如果是基本类型是按值传递，如果是引用类型按共享传递。但是因为拷贝副本也是一种值的拷贝，所以在高程中也直接认为是按值传递了。
```

## JavaScript深入之call和apply的模拟实现

> 一句话介绍call：call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

举个栗子

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

注意两点：

+ call 改变了 this 的指向，指向到 foo
+ bar 函数执行了

相当于：foo.bar()

模拟的第一版本：

```js 
var foo = {
    value:1,
    bar:function(){
        console.log(this.value)
    }
}
foo.bar()
```

但是新增了参数、我们执行之后要删除掉这个参数，所以就有

```js
foo.fn = bar;
foo.fn()
delete foo.fn
```

所以模拟的第二版：

```js
// 想象是：bar.call2(foo).context就是foo、this就是bar（ 调用call的函数，用this可以获取）
Function.prototype.call2 = function(context){
    context.fn = this
    context.fn()
    delete context.fn
}
```

但素：1:call是可以传递参数的；2:this参数还可以传递为null，此时的this指向window；3：可以有返回值

```js
var foo = {
    value: 1
};
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(foo, 'kevin', 18));
// kevin
// 18
// 1
```

所以还要取出从index=1及以后的位置上的参数，传到执行的函数中；并且兼容this为null的情况

所以有了模拟的第三版

```js
Function.prototype.call2 = function(context){
    context = context || window
    context.fn = this;
    // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]解决不定长参数
    var args = []
    // 从位置1开始截取参数，因为位置0是传递进来的期望this
    for(var i=1;i<arguments.length;i++){
        args.push('arguments[' + i + ']');
    }
    // console.log(args,args.join(','),'context.fn('+args+')')
    var result = eval('context.fn('+args+')')
    delete context.fn
    return result
}
```

同理apply的实现如下：apply也是改变this的指向、和call不同之处在于、call的参数是按顺序传递，apply则是以数组的形式传递

```js
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value); // 1
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.apply(null); // 2

console.log(bar.apply(obj, ['kevin', 18])); // {value: 1, name: "kevin", age: 18}
```

模拟实现的版本为：

```js
Function.prototype.apply2 = function(context,arr){
    context = context||window
    context.fn = this;
    var result = null
    if(!arr){
        result = eval('context.fn()')
    }else{
        // 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]解决不定长参数
        var args = []
        // 从arr的位置0开始就是参数了，所以从0开始截取
        for(var i=0;i<arr.length;i++){
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn('+ args +')')
    }
    delete context.fn
    return result
}
```