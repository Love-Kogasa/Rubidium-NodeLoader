# Package.ZIP
从zip中加载package)

## Install
```html
<!-- ... -->
  <script src="./patch/package/package.js"></script>
  <script src="./patch/package/zip/zip-files.js"></script>
  <script src="./patch/package/zip/zip.js"></script>
<!-- ... -->
```

## Usage
Package.zip包的食用方法非常简单  
这里有一个简单的Demo [Click Me](https://rubidium.js.org/test/zip/)
```js
const loader = require("package.zip")
var pkg = await loader.from("yours.zip")
pkg.run() // Just run it
```

如果你已经有zip数据写入内存，你可以直接同步加载它
```js
var pkg = loader(bytes)
// bytes 可以是任意Buffer.from方法支持的类型
```

当然，如果你更习惯于用script标签加载js，你还可以这样  
__前提是zip-loader.js被加载__  
```html
<script type="zip" src="./yours.zip"></script>
<!-- 如果你需要使用其中导出的内容，你可以↓ -->
<script type="zip" src="./yours.zip" share></script>
<!-- 这样，您导出的内容会被assign到window对象上 -->
```
值得一提，这种方式是异步加载的，您无法像正常js模块一样按顺序加载它  
该内容未经过任何测试，因此它可能存在bug

## Other
package.zip同样使用package执行，因此您可以通过 `require("package.zip.pkg")` 获取加载该补丁模块的package  
__不想列表了，自己install一下就知道了__