### 起因

> 最近面试的时候有被问过：你对npm了解多少？有发布过包吗？ 当时我表示一脸懵逼、其实是有参与过npm包的代码维护，但未曾自己发布过包。。趁着热乎劲儿，在网上找下资料，简单的记录下吧

### 简介

> 主要从注册账号、到编写包代码、到发布、到删除的一系列操作吧

### 流程

+ 安装verdaccio

```javascript
sudo npm install verdaccio -g
```

+ 安装完成后，命令行直接输入`verdaccio`命令即可运行

![执行verdaccio](https://raw.githubusercontent.com/liujinhuan/LearnNotes/master/imgs/执行verdaccio.png)

+ 这时候浏览器打开`http://localhost:4873`，如果未发布过包，则会见到如下所示的图

![未发布包的服务](https://raw.githubusercontent.com/liujinhuan/LearnNotes/master/imgs/未发布包的服务.png)

+ 将当前npm指向本地

```javascript
npm set registry http://localhost:4873
```

+ 注册用户，按照提示输入userName 和 password 和 email，输入后就注册完成，一般注册完成后也算登录成功

```javascript
npm adduser –registry http://localhost:4873
```

+ 接下来就是编写包内容

```javascript
// 创建测试文件夹
mkdir npmtest
// 初始化项目，一路回车即可
npm init 
// 创建index.js文件，内容如下
!function(){
    console.log(`这是引入的包入口`)
}()
```
+ 准备好上述包内容之后，就是发布包了，发布成功就如下图所示

```javascript
// 发布
npm publish
// 期间可能会遇到提示未登录的错误信息，重新登录下即可，输入userName 和 password 和 email
npm login –registry http://localhost:4873
```
![发布成功](https://raw.githubusercontent.com/liujinhuan/LearnNotes/master/imgs/发布成功.png)

![发布成功后服务器中显示的包](https://raw.githubusercontent.com/liujinhuan/LearnNotes/master/imgs/发布成功后服务器中显示的包.png)

+ 如何使用呢？编写测试文件

```javascript
// 创建测试目录
mkdir test
// 初始化项目，一路回车
npm init
// 安装我们自己的包依赖，可以在package.json文件中看到
npm install npmtest@1.0.0 --save-dev
// 编写测试文件index.js，内容如下
var f = require('npmtest')
// 执行测试文件，结果如下图所示就OK了
node index.js
```

![测试成功](https://raw.githubusercontent.com/liujinhuan/LearnNotes/master/imgs/测试成功.png)

+ 至此一个包就发布成功啦。。。

### 参考

[如何搭建一个私有 npm 服务器](http://auan.cn/internet/2010.html)
[一分钟教你发布npm包](https://www.jianshu.com/p/7bba18925fbf)



