var code = document.getElementById("code")
var run = document.getElementById("run")
var output = document.getElementById("output")

var _log = console.log
window.console.log = (...str) => {
  output.textContent += str.join(" ") + "\n"
  return _log(...str)
}

fetch(code.getAttribute("src"))
  .then(res => res.text())
  .then(script => {
    code.textContent = script
    run.onclick = async () => {
      output.textContent = ""
      var start = performance.now()
      try {
        await eval(script)
        console.log( "##### END: " + ((performance.now() - start) / 1000).toFixed(4) + "s #####")
      } catch( err ){
        console.log( err.toString() )
      }
    }
  })
.catch(console.log)