# rubidium\:package
rubidium node-loader的补丁包  
用于创建一个用于包裹运行Nodejs代码的"包装"(≠容器)

## Why
* 不同于容器，package并不需要实现各种复杂的东西，因为学业问题，package可以极大的节省我的开发时间

* Rubidium的require实现基于模块栈(一个kv对象)并不能实现复杂的引用行为，只能引用小型模块，并且文件需要一个一个手动引入，但很多模块涉及到的文件很多，很不方便

* package对复杂开发情况很有用，与browserify和rubidium混用相比，可以节省更多存储(比如不用重复加载同一模块)，可优化项更多

* package仅主包非常小，且非常简单，方便开发，如果是做container则可能需要很多的依赖，很不方便处理

## Sub Module
- [rubidium\:package.npm](./npm/README.md) 向package中安装npm模块

## Usage
(打包器暂无，不过很快就会有，因为包装所需要的结构非常简单，只是一个kv对象，如"/绝对路径": 内容)  
rubidium\:package只是一个基础库，后面会出一些方便操作的快捷方法，如pkg内npm)

模块依赖表(勾选代表stdlib包含)
- [x] path
- [x] Buffer

引入
```html
<script src=".../package.js"></script>
<!-- 主包，不需要定义导出模块名 -->
```

执行
```js
const packager = require("rubidium:package")
var pkg = packager.create(...)
pkg.run()
```

从包装引用
```js
// 直接从包装引用
var xxx = pkg.require( "xxx" )

// 从包装模块导入到模块栈
require.browser.register("xxx", pkg.require( "xxx" ))
var xxx = require("xxx")
```

共享模块(将包装引用cache处理后合并到另一个require.cache)
```js
// 向模块栈共享
pkg.share()
// 请在共享前确保库被调用过并且成功写入cache

// 向另一个包装分享require缓存
pkg.share(true
  /* ↑ 是否仅分享模块，即/node_modules中的内容*/,
  pkg2
)
```

获取包装信息
```js
// 获取包的package.json
pkg.package(/*包路径，默认根目录*/)
// 等效于
pkg.require("/package.json")
```

自定义包装内模块
```js
// 通过设置包装内模块实现一些包装内nodejs接口
// 一个为包装自定义fs模块的方法)
// 包装内程序需要用到readFileSync函数
pkg.write("fs", {
  readFileSync: pkg.require
  // TIP: 如果直接使用require模拟文件读取的话，./xxx和xxx是不同的，前者会从./xxx获取，后者则会试图通过/node_modules/xxx/index.js获取模块
})
// 包装内模块会随着share分享给其他require.cache
pkg.shareCache(true, pkg1)
// pkg1也可以使用fs.readFileSync方法
```

