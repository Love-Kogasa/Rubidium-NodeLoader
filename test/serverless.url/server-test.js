(async () => {
  const {Server, createBlobURL} = require("serverless")
  var server = new Server(3000, false)
  server.request = async (req, res) => (res.body = await fetch("./test.png"))
  
  console.log("正在获取图片w")
  var url = await createBlobURL("https://virtual.local:3000/")
  console.log(url)
  window.open(url)
  console.log("图片获取完毕，窗口已经弹出")
})()