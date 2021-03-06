### nodejs介绍

1. 使用nodejs能解决什么问题？

+ 修改了客户端连接到服务端的连接方法，不再为每个客户创建一个连接，而是为每个客户端连接，触发一个在nodejs内部进行处理的事件

2. 实现高性能的web服务器

+ 运行的是V8JavaScript语言，拥有对二进制处理的能力，更接近C语言的开发效率

3. 非阻塞型IO及事件环机制

+ 在执行了访问数据库的操作之后，可以转而执行其他代码，而将数据库的返回结果放在回调中执行，从而提高效率

+ nodejs中，同一时刻只能执行一个事件回调函数，但是在该事件回调函数的执行过程中又可以转而执行其他事件的回调函数，然后返回继续执行原函数的事件回调函数，这种被称作事件环机制

4. nodejs中的模块

+ exports.XXX 导出，require()导入
+ 有内置模块

### nodejs基础知识

1. 全局作用域与全局函数

+ global对象
+ setTimeout和setInterval函数

2. 与模块相关的全局函数及对象

+ 使用require函数加载模块
```
a. 加载模块时，将会执行模块中的每一行代码
a. 模块首次加载后将缓存在内存缓存区中，这意味着，多次引用指向的都是同一个对象，且不会多次执行模块内代码
a. 如果想多次引用时执行多次的模块代码，可将模块内代码放置在一个函数内，然后将函数导出来，即可
```

+ 使用require.resolve('模块名')可以获得带有当前模块所在的绝对路径的文件名，此时不会加载模块
+ require.cache，代表缓存中所有已被加载缓存区，是一个键值对，可以用delete删除，下次再加载的时候，会重新运行模块内容

3. `__filename__` 和 `__dirname__` 

+ `__filename__` 可以获得带有当前模块所在的绝对路径的文件名
+ `__dirname__` 可以获得带有当前模块所在的目录的完整绝对路径


### 创建多进程 child_process

1. spawn创建：用于运行某个命令的子进程，可以实时接收数据，是异步方法
2. fork创建：用于运行某个模块文件的子进程、可以通过send方法在父子进程间通信，监听使用message方法
3. exec创建：用于运行某个命令的子进程并缓存子进程的输出结果，必须等待子进程所有数据缓存完毕后才能接收数据，是同步方法
4. execFile创建：用于执行某个可执行文件的子进程


### 在多个子进程中运行node应用程序 cluster

1. 使用fork创建worker对象：开启多个子进程，运行多个node应用程序实例，并且在应用程序中运行一个模块文件