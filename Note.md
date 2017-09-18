# nodejs使用简要
## 给个理由
	能用javaScript写后台,还需要什么理由.

## 从安装开始
	1. 在windows上我就不多说
	2. 在linux上,使用apt-get一类的方式安装之外,还可以通过编译安装.
      1. 确保系统下g++版本在4.6以上,Python版本在2.6以上.
      2. 从[nodejs.org](https://nodejs.org)下载tar.gz后缀的NodeJS最新版源代码包并解压到某个位置.
      
	3. 进入解压到的目录,使用以下命令编译和安装.
       
```shell
         $ ./configure
         $ make
         $ sudo make install
  ```
	4. 开始运行
		打开终端,键入`node`进入命令交互模式,可以输入一条代码后立即执行并显示结果

         ```shell
         $ node
         > console.log('hello world!')
         hello world!
         ```
		当然,一般咱们是先写一个`js`文件,然后在终端的目录下键入`node xx.js`运行

## 模块
	当我们需要写稍大点的程序,不可能都放在一个文件里,所以一般都会将代码模块化.
	Node.js采用模块化结构，按照[CommonJS规范](http://wiki.commonjs.org/wiki/CommonJS)定义和使用模块。
	在`NodeJS`中,一般将代码合理拆分到不同的`js`文件中,每一个文件就是一个模块,而文件路径就是模块名.除了咱们自己写，还可以使用别人写好的模块，那么就得使用一个神器，叫npm（**Node Package Manager**）,一般安装node的时候就安装上了npm，我们进入终端输入：

```
> npm -v
5.4.2
```

### NPM [资料](http://javascript.ruanyifeng.com/nodejs/npm.html#toc1)
	

	咱们顺带说说npm，因为nodejs中命令行用的比较多，很多时候就是使用这个npm，说起来呢npm本身也不是很复杂，但是功能很强大，本质上只做一件事，管理模块，无论是下载还是升级，卸载，都可以用npm，甚至还能用npm升级npm
	1. 因为服务器的原因，可能速度会很慢，所以换一个源（taobao源）
	
```
npm config set registry https://registry.npm.taobao.org
// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或npm info express
```
	2. 安装插件
		1. *本地安装*：就是只能当前目录使用 `npm install <Module  Name>`
			1. 将安装包放在 `./node_modules` 下（运行 npm 命令时所在的目录），如果没有` node_modules` 目录，会在当前执行 `npm` 命令的目录下生成 `node_modules` 目录。
			2. 可以通过 `require()` 来引入本地安装的包。
		2. *全局安装*：任何地方都能使用	  `npm install <Modlue Name> -g`
			1. 将安装包放在 `/usr/local` 下或者你 `node` 的安装目录。
		 	2. 可以直接在命令行里使用。

		tip:如果出现以下错误：`npm err!  Error: connect ECONNREFUSED 127.0.0.1:8087`
	解决办法为：`$ npm config set proxy null`
	
	3. 常用命令
		
```
npm list / ls           查看所有本地安装的模块
npm ls  -g              查看所有全局安装的模块

npm uninstall <Module Name>   卸载模块
npm update                    更新npm
npm update <Module Name>      更新模块
npm init                初始化生成一个新的`package.json`文件
npm run xxx             执行`package.json`里`scripts`字段，可以用于指定脚本命令
```
### 自定义模块
	下面是一个最简单的模块，假定新建一个foo.js文件，写入以下内容
```javascript
// foo.js

module.exports = function(x) {
    console.log(x);
};
```
	上面代码就是一个模块，它通过module.exports变量，对外输出一个方法。

### 使用模块
	*node的核心模块*

```
http：提供HTTP服务器功能。
url：解析URL。
fs：与文件系统交互。
querystring：解析URL的查询字符串。
child_process：新建子进程。
util：提供一系列实用小工具。
path：处理文件路径。
crypto：提供加密和解密功能，基本上是对OpenSSL的包装。
```
	`require`命令用于指定加载模块，*加载时可以省略脚本文件的后缀名*。
	`require`方法的参数是模块文件的名字。它分成两种情况，第一种情况是参数中含有文件路径（比如上例），这时路径是相对于当前脚本所在的目录，第二种情况是参数中不含有文件路径，这时Node到模块的安装目录，去寻找已安装的模块
	
	
```javascript
// index.js

var http = require（'http'）         //加载默认模块http
var express = require('express');    //加载express模块(得用npm install express)

var m = require('./foo');            //上文的自定义模块

m.print("这是自定义模块");
```


## http协议

   ​![http协议中URL]($res/TIM%E6%88%AA%E5%9B%BE20170904141355.png)
	
   ![详解url]($res/TIM%E6%88%AA%E5%9B%BE20170904141525.png)

   ![http内容]($res/TIM%E6%88%AA%E5%9B%BE20170904141718.png)

## Node基础
### node全局
	*node的全局对象*

```javascript
global：表示Node所在的全局环境，类似于浏览器的window对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如var x = 1等同于设置window.x = 1，但是Node不是这样，至少在模块中不是这样（REPL环境的行为与浏览器一致）。在模块文件中，声明var x = 1，该变量不是global对象的属性，global.x等于undefined。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。

process：该对象表示Node所处的当前进程，允许开发者与该进程互动。

console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。
```
	*node的全局函数*
```javascript
setTimeout()：用于在指定毫秒之后，运行回调函数。实际的调用间隔，还取决于系统因素。间隔的毫秒数在1毫秒到2,147,483,647毫秒（约24.8天）之间。如果超过这个范围，会被自动改为1毫秒。该方法返回一个计时器对象。
clearTimeout()：用于终止一个setTimeout方法新建的定时器。
setInterval()：用于每隔一定毫秒调用回调函数。由于系统因素，可能无法保证每次调用之间正好间隔指定的毫秒数，但只会多于这个间隔，而不会少于它。指定的毫秒数必须是1到2,147,483,647（大约24.8天）之间的整数，如果超过这个范围，会被自动改为1毫秒。该方法返回一个计时器对象。
clearInterval()：终止一个用setInterval方法新建的定时器。
require()：用于加载模块。
Buffer()：用于操作二进制数据。
```
	*node的全局变量*

```
__filename：指向当前运行的脚本文件名。
__dirname：指向当前运行的脚本所在的目录。
```
### 异常处理
	因为nodejs是异步单线程，所以如果中间出错了，就可能会发生整个程序的错误，所以，在nodejs中异常处理对于程序的稳定运行极为重要(其实对任何程序都很重要)。
	一般来说，Node有三种方法，传播一个错误。
		1. 使用throw语句抛出一个错误对象，即抛出异常。
		2. 将错误对象传递给回调函数，由回调函数负责发出错误。
		3. 通过EventEmitter接口，发出一个error事件。
	最常用的捕获异常的方式，就是使用try…catch结构。但是，这个结构无法捕获异步运行的代码抛出的异常，所以Node只在很少场合才用try/catch语句，比如使用`JSON.parse`解析JSON文本。
	*Node采用的方法，是将错误对象作为第一个参数，传入回调函数。*
	回调函数的第一个参数就是一个错误对象，这是为了处理异步操作抛出的错误。
	














参考资料:
	[nodejs 入门](https://www.nodebeginner.org/index-zh-cn.html#javascript-and-nodejs)
	[阮一峰node教程](http://javascript.ruanyifeng.com/nodejs/basic.html)
	[nodejs 基础教程](https://yunnysunny.gitbooks.io/nodebook/content/)
	[七天学会nodejs](http://nqdeng.github.io/7-days-nodejs/)
	[Nodejs API 中文文档](https://nodejs.xiangfa.org/)
	[Node.js 包教不包会](https://github.com/alsotang/node-lessons)
	[使用 Express + MongoDB 搭建多人博客](https://maninboat.gitbooks.io/n-blog/content/)

