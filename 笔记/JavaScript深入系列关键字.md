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

## JavaScript深入之bind的模拟实现 

> 一句话介绍 bind:bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

注意两点：
+ 返回一个函数
+ 可以传入参数

```js
var foo = {
    value: 1
};

function bar() {
    return this.value;
}

// 返回了一个函数
var bindFoo = bar.bind(foo); 

console.log(bindFoo();) // 1
```

模拟的第一版

```js
Function.prototype.bind2 = function(context){
    var self = this;
    return function(){
        // 考虑到了bind有返回值
        return self.apply(context)
    }
}
```

但素：还可以在 bind 的时候传递参数，在指定返回函数的时候再传入参数

```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

所以模拟的第二版，就是要把这两处的参数都拼接到一起

```js
Function.prototype.bind2 = function(context){
    var self = this;
    // 从位置1开始截取外层参数
    var outterarr = Array.prototype.slice.call(arguments,1)
    return function(){
        // 返回的函数所有参数都要截取
        var innerarr = Array.prototype.slice.call(arguments)
        // 考虑到了bind有返回值
        return self.apply(context,outterarr.concat(innerarr))
    }
}
```

构造函数的模拟实现：

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

第三版：

```js
Function.prototype.bind2 = function(context){
    var self = this;
    // 从位置1开始截取外层参数
    var outterarr = Array.prototype.slice.call(arguments,1)
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : context, outterarr.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype
    return fBound
}
```

但素：我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：

```js
Function.prototype.bind2 = function(context){
    var self = this;
    // 从位置1开始截取外层参数
    var outterarr = Array.prototype.slice.call(arguments,1)
    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, outterarr.concat(bindArgs));
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}
```

所以最终再加上点兼容 

```js
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

## JavaScript深入之new的模拟实现

> 一句话介绍new：new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

举个栗子

```js
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;
    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
console.log(person.age) // 18

person.sayYourName(); // I am Kevin
```

注意点：
+ 访问到 Otaku 构造函数里的属性
+ 访问到 Otaku.prototype 中的属性


初步实现

```js
// 因为 new 是关键字，所以无法像 bind 函数一样直接覆盖，所以我们写一个函数，命名为 objectFactory，来模拟 new 的效果。用的时候是这样的：
function objectFactory(){
    // 创建一个新对象
    var obj = new Object()
    // 取出传递进来的构造函数，第一个参数，并修改了arguments为截取后的传递进来的参数
    var Contructor = [].shift.call(arguments)
    // 设置原型链
    obj.__proto__ = Contructor.prototype
    // 给obj添加新的属性
    Contructor.apply(obj,arguments)
    return obj
}
```

验证

```js
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
};

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

如果构造函数有返回值

```js
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    // 判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
    return typeof ret === 'object' ? ret : obj;

};
```

## JavaScript深入之类数组对象与arguments 

```js
1. 定义：拥有一个 length 属性和若干索引属性的对象
2. 类数组对象不可以直接使用数组的方法，可以间接使用，通过call、或者转换为数组
3. Arguments 对象只定义在函数体中，包括了函数的参数和其他属性
4. 在函数体中，arguments 指代该函数的 Arguments 对象。
5. Arguments 对象的 callee 属性，通过它可以调用函数自身。
```

```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 间接调用数组的方法
Array.prototype.join.call(arrayLike, '&'); // name&age&sex
```

```js
// 类数组转数组的方法
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```

## JavaScript深入之创建对象的多种方式以及优缺点

+ 工厂模式

缺点：对象无法识别，因为所有的实例都指向一个原型

```js
function createPerson(name){
    var obj = new Object()
    obj.name = name;
    obj.getName = function(){
        return this.name
    }
    return obj
}
```


+ 构造函数模式

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次

```js
function Person(name){
    this.name = name;
    this.getName = function(){
        return this.name
    }
}
var person1 = new Person('kevin');
```

+ 构造函数模式优化

优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

```js
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```

+  原型模式

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

```js
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
```

+ 原型模式优化

优点：封装性好了一点

缺点：重写了原型，丢失了constructor属性

```js
function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

+ 原型模式优化

优点：实例可以通过constructor属性找到所属构造函数

缺点：原型模式该有的缺点还是有

```js
function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

+ 组合模式

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

```js
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

+ 动态原型模式

注意：使用动态原型模式时，不能用对象字面量重写原型

```js
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
```

+ 寄生构造函数模式

```js
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

+ 稳妥构造函数模式

无法识别对象所属类型。

```js
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}

var person1 = person('kevin');

person1.sayName(); // kevin

person1.name = "daisy";

person1.sayName(); // kevin

console.log(person1.name); // daisy
```

## JavaScript深入之继承的多种方式和优缺点

+ 原型链继承

缺点：引用类型的属性被所有实例共享
缺点：在创建 Child 的实例时，不能向Parent传参

```js
function Parent(){
    this.name='hello'
}
Parent.prototype.getName = function(){
    console.log( this.name )
}

function Child () {

}

Child.prototype = new Parent()
var child1 = new Child();

console.log(child1.getName()) // kevin
```

+ 借用构造函数(经典继承)

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法。


```js
function Parent(){
    this.name='hello'
}
function Child () {
    Parent.call(this)
}
```

+ 组合继承

原型链继承和经典继承双剑合璧。
优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

```js
function Parent(){
    this.name='hello'
}
Parent.prototype.getName = function(){
    console.log( this.name )
}
function Child (name,age) {
    Parent.call(this,name)
    this.age = age
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

+ 原型式继承

ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

```js
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

+ 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

```js
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

+ 寄生组合式继承

组合继承最大的缺点是会调用两次父构造函数。一次是设置子类型实例的原型的时候：一次在创建子类型实例的时候：

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```