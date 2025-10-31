**中文自述文件请往下滑)**
# Rubidium NodeLoader
`Rebidium => Rb => Require (node module in) browser`
Rubidium • Node Module Loader  
This project provides a frontend Node.js module loader, allowing you to use Node.js modules in the frontend.  
*For development use only; stability is not guaranteed! Do not use in formal production environments.*

## Why
Influenced and inspired by early Browserify CDN.  
__But I don't have the funds to run a CDN, and no one is supporting me.__  
~~And the `audiobuffer-to-wav` library doesn’t provide a version that can be directly referenced in the frontend, even though it could easily be used.~~  
↑ I found it unnecessarily cumbersome to use Browserify or other bundlers for small projects.  
So, I developed this in half an evening to use certain Node.js libraries in my own small projects.

## Usage
Load Rb and the standard library (recommended to use a CDN):
```html
<script src="nbnl.js"></script>
  <!-- index.js in this repository -->
<script src="dist/stdlib.js"></script>
<!--
  The Node standard library needs to be compiled with Browserify yourself. This repository provides a precompiled version.
  If not strictly necessary, you can also directly reference the buffer module to simulate Node.js's Buffer in the frontend.
-->
<script>
  // Load as you would in Node.js
  require( "path" )
</script>
```

Load third-party libraries (synchronous method, URLs acceptable):
```html
<script src="./lib.js"></script>
<script src="./lib2.js" require="mod"></script>
<script>
  // Load Node.js libraries
  require( "./lib.js" ) // Cannot be require( "lib.js" )
  require( "mod" )
  // For CDN modules without a name, you can also reference them via URL.
</script>
```
**Note: Rb does not actively load Node.js modules. You need to manually add the relevant Node.js dependency libraries. Referenced Node.js modules can also normally reference relative paths.**

Export modules:
```js
// You can export modules just like in Node.js, without any special comments.
module.exports = {...}
module.a = 1
module.b = 2
exports.func = () => void
module.c = {d: 3}
module.c.e = 4
// ...
// However, it is always recommended to use `module.exports` to export modules, as it is the most compatible method.

// Due to technical limitations, some module exports using methods like `exports = {}` may not load properly. In such cases, you can manually register the module using the following method:
require.browser.register( name, data )

// This method is also suitable for batch registration:
require.browser.register({ lib1, lib2, lib3 })
```

Using Browserify and Rb together (e.g., stdlib.js):
```js
// This file relies on Browserify to build :)
window.require.browser.register({
  path: require("path"),
  url: require("url"),
  querystring: require("querystring"),
  util: require("util"),
  events: require("events"),
  buffer: require("buffer"),
  stream: require("stream"),
  crypto: require("crypto"),
  assert: require("assert"),
  string_decoder: require("string_decoder"),
  timers: require("timers"),
  console: require("console"),
  fs: require("browserify-fs"),
  os: require("os-browserify"),
  http: require( "http-browserify" ),
  https: require( "https-browserify" )
})
window.Buffer = Buffer
```

Thank you for reading! w)

# Rubidium NodeLoader
`Rebidium => Rb => Require (node module in) browser`
铷•Node模块加载器  
本项目提供了一个前端的nodejs模块加载器，允许您在前端使用Nodejs模块  
*开发使用，不保证稳定性！请勿用于正式生产环境*

## Why
受早期BrowserIfyCDN影响和启发  
__但是我没钱做CDN也没人支持我啊__  
~~以及audiobuffer-to-wav库不提供前端可直接引用的版本但明明可以直接使用~~  
↑我认为为小项目使用browserify打包或其他打包器过于麻烦了，没有必要  
因此我用半晚上开发了这个，用来在自己的小型项目中使用部分Nodejs库  

## Usage
加载Rb和标准库(建议使用cdn)
```html
<script src="nbnl.js"></script>
  <!-- 本仓库中的index.js -->
<script src="dist/stdlib.js"></script>
<!--
  Node标准库，需要用browserify自行编译，本仓库提供预编译版本
  如果不是很需要也可以直接引用buffer模块在前端模拟Nodejs的Buffer
-->
<script>
  // 像在nodejs中一样加载
  require( "path" )
</script>
```

加载第三方库(同步方法，可用URL)
```
<script src="./lib.js"></script>
<script src="./lib2.js" require="mod"></script>
<script>
  // 加载nodejs库
  require( "./lib.js" ) // 不可以是 require( "lib.js" )
  require( "mod" )
  // 对于cdn模块且未命名，也可以使用URL引用
</script>
```
**注: Rb不会主动加载Nodejs模块，你需要手动添加相关Nodejs依赖库，引用的nodejs模块也可以正常引用相对路径**

导出模块
```js
// 你可以像Nodejs里一样导出模块，无需任何注释
module.exports = {...}
module.a = 1
module.b = 2
exports.func = () => void
module.c = {d: 3}
module.c.e = 4
// ...
// 不过无论如何，都和你推荐使用module.exports导出模块，这是兼容性最好的方法

// 受技术限制，一些模块导出使用如exports = {}无法正常加载，当出现这种情况时，你可以使用如下方法手动注册模块
require.browser.register( name, data )

// 此方法也适用于批量注册
require.browser.register({ lib1, lib2, lib3 })
```

browserify与Rb混用(如:stdlib.js)
```js
// This file relies on Browserify to build :)
window.require.browser.register({
  path: require("path"),
  url: require("url"),
  querystring: require("querystring"),
  util: require("util"),
  events: require("events"),
  buffer: require("buffer"),
  stream: require("stream"),
  crypto: require("crypto"),
  assert: require("assert"),
  string_decoder: require("string_decoder"),
  timers: require("timers"),
  console: require("console"),
  fs: require("browserify-fs"),
  os: require("os-browserify"),
  http: require( "http-browserify" ),
  https: require( "https-browserify" )
})
window.Buffer = Buffer
```

感谢您的阅读w)