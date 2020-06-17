# flow基础入门
Flow是一个由Facebook出品的JavaScript静态类型检查工具，它与Typescript不同的是，它可以部分引入，不需要完全重构整个项目，所以对于一个已有一定规模的项目来说，迁移成本更小，也更加可行。除此之外，Flow可以提供实时增量的反馈，通过运行Flow server不需要在每次更改项目的时候完全从头运行类型检查，提高运行效率。目前React和Vue均采用了Flow作为静态检查的工具

# 优点
- 使得大型项目可维护
- 增加代码的可读性 无需额外的关于变量、参数、返回值类型的注释，可以让读者了解必要的附加信息
- 几乎消灭了由函数数据类型引起的bug
- 大量减少由于使用第三方库不当引起的类型错误
- 可以在CI系统中集成
- 工具链配置成本比较低，只需要很少的工作量即可达到这些效果
- 可以一个文件一个文件地迁移，不需要一竿子全弄了。
- Babel 和 ESLint 都有对应的 Flow 插件以支持语法，可以完全沿用现有的构建配置；
- 更贴近 ES 规范。除了 Flow 的类型声明之外，其他都是标准的 ES。万一哪天不想用 Flow 了，用 babel-plugin-transform-flow-strip-types 转一下，就得到符合规范的 ES。
- 在需要的地方保留 ES 的灵活性，并且对于生成的代码尺寸有更好的控制力 (rollup / 自定义 babel 插件）
- Flow 只做类型检查，你只需要在你需要的地方加上声明就可以。而 Typescript 和 babel 有功能上的重叠，可能对你的代码有侵入，要用就要用全套，但 Typescript 有 vs code 这个红利，如果完全用 ts 开发可以拥有近似静态语言的开发体验。

- Flow与Ts讨论：https://www.zhihu.com/question/46397274/answer/101193678

## 安装flow
```js
//1
npm i  --dev @babel/core @babel/cli @babel/preset-flow   flow-bin
//2  .babelrc
{
  "presets": ["@babel/preset-flow"]
}
//3 flow init  创建flowconfig 
flow init 
```
## 用法
- 命令列表
```js
flow --help
// Usage: flow [COMMAND]

// Valid values for COMMAND:
//   ast             输出 AST
//   autocomplete    查询自动提示完成的信息
//   check           作完整检测并且输出接过
//   check-contents  对标准输入的内容作检测
//   coverage        显示一个文件的覆盖率
//   find-module     解析模块，返回对应文件信息
//   get-def         获取变量或者属性的定义位置
//   get-importers   列出通过 import 引用了指定模块的所有模块
//   get-imports     列出一个或多个模块中，所有 import 的模块
//   init            初始化一个目录为 flow 根目录
//   port            Shows ported type annotations for given files
//   search          Searches a pattern
//   server          启动 flow 前台服务
//   start           启动 flow 后台服务
//   status          (默认) 访问 flow 服务，显示当前错误情况
//   stop            停止 flow 后台服务
//   suggest         对指定的文件，给出建议的类型注解
//   type-at-pos     显示指定的文件的某个位置的类型
//   version   


```
- 初始化项目
```bash
flow init
```
在项目的顶层运行此命令以创建一个名为的空文件.flowconfig。从最基本的层面.flowconfig上讲，它告诉Flow后台进程从哪里开始检查Flow代码中的错误的根源。

- 关闭/开启实时监测代码的进程

Flow的核心优势在于它能够快速检查代码中的错误。为Flow启用项目后，就可以开始允许Flow逐步检查代码的过程。
```js 
//最基本的命令 但是不是最高效的
flow check 
这个命令会让 flow 每次都把项目下所有文件检查一遍
对于大型项目来说，你应该不希望每次改文件都让 Flow 立刻检查所有文件。 Flow 使用 c/s 架构设计，于是你就可以先开启一个 Flow 后台服务， 当你文件改变时，Flow 就在后台默默地检测。命令很简单

//开启(默认) 月 flow是等价的
flow status Or  flow
使用带后台服务的 flow 命令，避免每次修改都触发项目所有文件的检查，节省时间， 提高工作效率 - 更不用说与IDE插件和其他工具更好地整合。
//关闭
flow stop 
//强制 Flow 检测所有的文件，不管文件有没有 @flow 注释，带上 --all 参数就行了
//不过还是要慎用呀，特别是在一个大项目，或者是项目中有很多第三方库的。 检测器会找到巨多错误，然后你就崩溃吧。
//想在老项目中立刻用 Flow 检测然后改 bug，靠谱一点的话，还是 一个个文件弄吧。
flow check --all
```
- 代码准备

Flow后台进程监视所有Flow文件。但是，如何知道哪些文件是Flow文件，因此应进行检查？在JavaScript文件中的任何代码之前放置以下内容是该过程用来回答该问题的标志。
```js
/* @flow */
// @flow
通过在文件加入以上的注释来告诉flow后台进程监视那些文件,除非调用flow check --all来监测所有的js文件
```

## 如何使用flow
需要添加flow注释，凡加Flow注释的文件，以下称flow文件，flow文件就是将// @flow或 /* @flow */加到js文件的最顶部。只有flow文件，flow进程才会在后台监视这些文件，当有类型检查时，有错误它就会报错
准备第1个js文件: 内容如下
```js
// @flow
function square(n:number): number {
    return n * n;
}

square('2')
//执行 flow check 报错如下
Error ---------------------------------------------------------------------------- a.js:12:8

Cannot call `square` with `'2'` bound to `n` because string [1] is incompatible with number [2].

   a.js:6:8
   6| square('2')
             ^^^ [1]
References:
   a.js:2:19
   2| function square(n:number): number {
                        ^^^^^^ [2]
Found 1 error
//将square('2')改为square(2)再flow check看下
Found 0 errors
```
## 删除flow类型标注
function square(n:number): number {中的类型标注，如:number，含有这样的js文件，事实上运行起来会报错的，不论是在nodejs还是浏览器中，现在在nodejs中运行测试下
```js
$ node a.js
F:\youshengyouse\del\a.js:2
function square(n:number): number {
                 ^

SyntaxError: Unexpected token :
    at new Script (vm.js:79:7)
    at createScript (vm.js:251:10)
    at Object.runInThisContext (vm.js:303:10)
    at Module._compile (internal/modules/cjs/loader.js:657:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
    at startup (internal/bootstrap/node.js:283:19)
```
将两个:number去掉再测试下，不会报错。所以说flow文件是两个过程，编程时加上类型检查，最后成品代码中，得将所有的类型约束要去掉，去掉这个过程肯定不能人工操作，有相应的程序处理。目前有两个方法去掉类型注解，一是包flow-remove-types，二是在babel中去掉
### flow-remove-types
```js
//安装包
npm install --save-dev flow-remove-types
//配置script flow-remove
"scripts": {
    "flow-remove": "flow-remove-types src/ -d lib/"
},
//运行
npm run flow-remove
//发现对应的lib中的文件已经删除对应的类型检查
//flow/main.js
function square(n){
  return n * n;
}
square(2);
```
### @babel/preset-flow
```js
//下载对应的包
npm i  @babel/cli @babel/core @babel/preset-flow -D
//配置.babelrc
{
    "presets": ["@babel/preset-flow"]
}
//配置script
"scripts": {
    "node":"babel-node ./src/flow/test.js"
},
//之后就可以正常运行
npm run node 
```
参考文档：https://flow.org/en/docs/install/
## 在vs code中配置类型,自动类型检查
在VS Code中搜索flow，发现有vscode-flow-ide、Flow-Language-Support两个插件，在这里以vscode-flow-ide为例
先安装vscode-flow-ide
条件：
- 项目根目录有配置文件.flowconfig
- nodejs添加到了环境变量path中
- 全局或项目内安装了flow,推荐全局安装flow-bin
- 自我感觉Flow-Language-Support的提示比较友好（推荐）
### 配置(默认就行)
VS Code左下角管理/设置/User Settings/Extensions/Flow-IDE Configurations(只有启用后才能配置，否则找不到这项)，下面是文字版，实际上在面板中就可以设置

- flowide.enable: 启用/关闭
- flowide.pathToFlow: Absolute path to the Flow executable. Set it only if the default behaviour of the extension doesn't work out for you. The extension will try first to read it from local node_modules/flow-bin or globally if not otherwise set here.
- flowide.useCodeSnippetsOnFunctionSuggest - Add the function paramters when selecting a function to autocomple.
重启vs Code，就会发现可以报错了，现在可以去掉顶部的// @flow及传递不合要求的参数测试下。

## 注意
重启vs Code，就会发现可以报错了，现在可以去掉顶部的// @flow及传递不合要求的参数测试下。
如果在problem窗口有错误，[ts]'types' can only be used in a .ts file. 8010，请在扩展中找到typescript，找到"javascript.validate.enable": false



## 类型注释
Flow具有强大的功能来推断您的程序类型。您的大多数代码都可以依靠它。不过，仍有一些地方需要添加类型。
```js
function concat(a, b) {
  return a + b;
}
// 有可能是数字、字符串相加， 不严谨  所以通过类型注释的方法来确定这个函数，使其更严谨
```
### 基本类型
- 基本类型 (字面量的形式)
  ```js
    // 小写来注释
    // @flow
    function method(x: number, y: string, z: boolean) {
      // ...
    }
    method(3.14, "hello", true);

    function acceptsBoolean(value: boolean) {
      // ...
    } 
    acceptsBoolean(0);          // Error!
    acceptsBoolean(Boolean(0)); // Works!
    acceptsBoolean(!!0);   // Works!
          
    // @flow
    function acceptsNumber(value: number) {
      // ...
    }
    acceptsNumber(42);       // Works!
    acceptsNumber(3.14);     // Works!
    acceptsNumber(NaN);      // Works!
    acceptsNumber(Infinity); // Works!
    acceptsNumber("foo");    // Error!     
    // @flow
    function acceptsString(value: string) {
      // ...
    }
    acceptsString("foo"); // Works!
    acceptsString(false); // Error!
    //仅接受strigng与string或者number相加
    acceptsString("foo" + 42); // Works!
    acceptsString("foo" + "foo"); // Works!
    acceptsString("foo" + {}); // errors!
    acceptsString("foo" + []); // errors!

    //必须显示的声明 让flow接受
    acceptsString("foo" + String({})); // Works!
    acceptsString("foo" + [].toString()); // Works!
    acceptsString("" + JSON.stringify({})); // Works!
  //JavaScript同时具有null和undefined。Flow将它们视为单独的类型：null和void（用于undefined）
  // @flow
    function acceptsNull(value: null) {
      /* ... */
    }
    function acceptsUndefined(value: void) {
      /* ... */
    }
    acceptsNull(null);      // Works!
    acceptsNull(undefined); // Error!
    acceptsUndefined(null);      // Error!
    acceptsUndefined(undefined); // Works!
  ```
- 基本包装类型
  ```js
    //new Boolean(false);new String("world");new Number(42);
    // 大写来注释
    // @flow
    function method(x: Number, y: String, z: Boolean) {
      // ...
    }
    method(new Number(42), new String("world"), new Boolean(false));
  ```
- Maybe types
```js 
  // 加跟没加一样的也许类型
  // @flow
  function acceptsMaybeString(value: ?string) {
    // ...
  }
  acceptsMaybeString("bar");     // Works!
  acceptsMaybeString(undefined); // Works!
  acceptsMaybeString(null);      // Works!
  acceptsMaybeString();          // Works!
```
- Optional types
```js
注意与Maybe types区别
除了它们的设置值类型之外，这些可选属性也可以其他类型（void），但是，它们不能是null。
// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}
acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!

// @flow
function acceptsObject(value: { foo?: string }) {
  // ...
}
acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({}); 
```

- defaults

```js
  除了它们的设置值类型之外，这些可选属性也可以其他类型（void），但是，它们不能是null。
  // @flow
  function acceptsOptionalString(value: string = "foo") {
    // ...
  }
  acceptsOptionalString("bar");     // Works!
  acceptsOptionalString(undefined); // Works!
  acceptsOptionalString(null);      // Error!
  acceptsOptionalString();          // Works!
```

- 具体类型
```js
  // string number  bool
  // 确定参数的值
  // @flow
  function getColor(name: "success" | "warning" | "danger") {
    switch (name) {
      case "success" : return "green";
      case "warning" : return "yellow";
      case "danger"  : return "red";
    }
  }
  getColor("success"); // Works!
  getColor("danger");  // Works!
  // $ExpectError
  getColor("error");   // Error!
```
其他的还有很多注释,比如数组，函数，类等 参考链接:https://flow.org/en/docs/types/


## 配置文件
```js
// 已当前的目录为根目录
[ignore]
.*/__tests__/.*
.*/src/\(foo\|bar\)/.*
.*\.ignore\.js

// 目录下的任何文件或目录 __tests__
// 下方.*/src/foo或下方的任何文件或目录.*/src/bar
// 以扩展名结尾的任何文件 .ignore.js

[include]
../externalFile.js
../externalDir/
../otherProject/*.js
../otherProject/**/coolStuff/
// /path/to/root/ （自动包含）
// /path/to/externalFile.js
// /path/to/externalDir/
// 以/path/to/otherProject/。结尾的任何文件.js
// /path/to/otherProject命名下的任何目录coolStuff/
[libs]

[lints]
// 设置校验的规则
// https://flow.org/en/docs/linting/rule-reference/
sketchy-null=off
//开启非null检查
//当然可以在保存的那一行通过/* flowlint-line sketchy-null:off */来忽略这个报警

//  优先级  文件中注释> cli --lints  > .flowconfig
[options]
// log.file (string): 日志文件路径 (默认为 /tmp/flow/<根目录转义>.log)
babel_loose_array_spread =true
// 设置此选项可true检查数组扩展语法仅用于数组，而不用于任意可迭代对象（例如Map或Set）。如果您在宽松模式下使用Babel转换代码，这会在运行时做出不符合规范的假设，则这很有用。
// const set = new Set();
// const values = [...set];
[version]
// 0.22.0  其他版本的会报错
// 指定flow的版本
```

## flow-typed （第三方库引入）

- 存在对应的 libdef
```js
// .flowconfig 配置[libs] ./flow-typed

//全局安装
npm i flow-typed -g 
//项目中安装某一个三方库的flow-type
flow-typed install rxjs@5.0.x

//全部安装 根据package.json 选择安装  安装最后会提示那些没有对应的libs,那对应的类型注释就是any,相当于没有注释

//• @babel/core@^7.9.0
//    └> flow-typed\npm\@babel\core_vx.x.x.js
//!! No flow@v0.122.0-compatible libdefs found in flow-typed for the above untyped dependencies !!
flow-typed install


//根据package.json对应的更新libdef
flow-typed updade
```

- 第三方库没有对用的libdef
```js
//esmodule
declare module "some-es-module" {
  // Declares a named "concatPath" export
  declare export function concatPath(dirA: string, dirB: string): string;
}
//cmd
declare module "some-commonjs-module" {
  // The export of this module is an object with a "concatPath" method
  declare module.exports: {
    concatPath(dirA: string, dirB: string): string;
  };
}
```
参考链接:https://flow.org/en/docs/libdefs/creation/
### 采坑记录
-  TypeError: Invalid Version: undefined   
https://github.com/flow-typed/flow-typed/issues/3809
-  ERROR: Unable to rebase the local cache repo. Error checking out the `master` branch of the following repo:
https://github.com/flow-typed/flow-typed/issues/2954





