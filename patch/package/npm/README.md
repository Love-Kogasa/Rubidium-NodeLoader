# Package.npm
Package Npm允许你在前端为package安装模块  
(本包依赖stdlib和package运行)

## Install
```html5
<!-- ... -->
  <script src="./patch/package/package.js"></script>
  <script src="./patch/package/npm/npm-files.js"></script>
  <script src="./patch/package/npm/npm.js"></script>
<!-- ... -->
```

## Usage
一个简单的用例  
(你可以在demo测试这段代码，Hello World NPM会被输出到控制台)
```js
const $pkg = require( "rubidium:package" )
const Npm = require( "rubidium:package.npm" )
var pkg = new Npm($pkg.create({}), console.log)
pkg.install("hello-world-npm").then(({pkg}) => {
  // 这将会安装hello-world-npm和它的依赖(本包没有)的最新版本到package内
  console.log(pkg.require("hello-world-npm")())
})
```

其他用例
```js
await pkg.install()
// 如果package中包含了所需依赖列表，该函数会自动安装所有依赖

await pkg.install(name, version)
await pkg.install("name@version")
// 安转指定版本的模块
```

除了基本的模块安装，npm包还包含一些其他的方法
```js
pkg.module(name, module)
// 从kv文件对象或package安装模块

pkg.remove(name)
// 从package移除一个模块

pkg.registry = "https://registry.npmmirror.com/"
// npm源，默认为 https://registry.npmjs.org/
// 如果能用不建议换源)
```

## Other
package.npm使用package执行，因此您可以通过 `require("rubidium\:package.npm.pkg")` 获取package.npm的package  
分享package.npm中所有使用的node库即一系列依赖
```js
const npm = require("rubidium:package.npm.pkg")

npm.share(false, pkg)
// 向pkg分享package.npm用到的所有模块的缓存

const fstream = npm.require("fstream")
// 引用包装内的fstream包
// 尽管您可以将模块分享到rubidium的window上的require.cache，但是不建议这么做
// rubidium的模块栈是专门为轻型node模块设计的，它并不具备大多数nodejs require所支持的功能
// 如果您将cache分享给了模块栈，您则需要告诉require 模块的main是哪个文件，而且还可能出现一些由require引起的bug
// 这些我后面可能回去修复也可能就保持不变了)
// (候补www)
```

package.npm打包了以下模块，您也可以在前端通过它的package来引用它们
```
any-promise
assertion-error
balanced-match
block-stream
bluebird
brace-expansion
chai
commander
concat-map
debug
deep-eql
diff
escape-string-regexp
fs.realpath
fstream
glob
graceful-fs
growl
inflight
inherits
jade
lru-cache
minimatch
minimist
mkdirp
mocha
mout
ms
node-tar.gz
once
path-is-absolute
rimraf
sigmund
stream-to-array
supports-color
tar
to-iso-string
type-detect
wrappy
```

感谢阅读w