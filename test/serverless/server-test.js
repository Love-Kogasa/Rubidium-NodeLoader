(async () => {
  var {createServer, fetch} = require("serverless")
  var {get} = require("https")
  var server = createServer((req, res) => {
    get("./hello.txt", (result) => result.pipe(res))
  }).listen(1145, async () => {
    var res = await fetch("http://virtual.local:1145/")
    console.log(await res.text()) // Hello World
    server.close()
  })
})()