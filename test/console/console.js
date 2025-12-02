const {Console} = require("console-class-browser")
// Stdout should be a Writable stream. If not necessary, just provide an object containing the write method
var console = new Console({
  write: (string) => (output.textContent += string)
})

// https://cdn.jsdelivr.net/npm/console-class-browser/test.js
console.group("SIMPLE LOG")
  console.group("LOG")
    console.log("Hello %s", "World")
    console.info("Hello %s", "World")
    console.debug("Hello %s", "World")
    console.dirxml("Hello %s", "World")
    console.table("Hello %s", "World") // TODO
    console.warn("Hello %s", "World")
  console.groupEnd()
  console.group("ERROR")
    console.error(new Error("An Error"))
    console.trace("Bye %s", "Bug")
  console.groupEnd()
console.groupEnd()

console.groupCollapsed("UTIL LOG")
  console.assert(true, "Hello %s", "World")
  console.time("Time")
  console.timeLog("Time")
  console.timeEnd("Time")
  console.count("Count")
  console.count("Count")
  console.countReset("Count")
  console.log({key: "value"}, "Hello", "World")
  console.dir(console.Console.prototype, {depth: 0})
console.groupEnd()
