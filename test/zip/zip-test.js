(async () => {
  const loader = require("package.zip")
  var pkg = await loader.from("./res.zip")
  pkg.run() // Hello World
})()