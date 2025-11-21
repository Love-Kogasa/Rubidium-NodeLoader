# Rubidium\:ServerLess
在前端模拟服务端，真正的"ServerLess"  
本补丁包未实现对nodejs http(s)包的Server等功能，仅提供一个基本框架  
~~nodejs标准库的那个太复杂懒得整~~  
在前端运行http"服务器"，后端只需要负责一些网络和公共数据存储功能即可)，节省成本也节约性能  
~~实际上并不十分需要，功能直接在前端实现即可，何必整个假Server呢~~  

## Usage
ServerLess主要由以下几部分组成  
ServerRequest = stream.Readable + Request + URL  
ServerResponse = stream.Writable + Response(的init对象)

一些相关的测试可以在这里被找到 [Demo](https://rubidium.js.org/list.html)  
TIP: 本包可以在nodejs中运行以测试哦w

```js
const {Server, fetch} = require("serverless")
var server = new Server(3000)
server.request = (req, res) => {
  res.end( "Hello World！" )
}
var res = await fetch("https://virtual.local:3000/")
console.log(await res.text()) // Hello World！
```