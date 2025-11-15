var code = document.getElementById("code")
var run = document.getElementById("run")
var output = document.getElementById("output")

var _log = console.log
window.console.log = (...str) => {
  output.textContent = str.join(" ") + "\n" + output.textContent
  return _log(...str)
}

fetch(code.getAttribute("src"))
  .then(res => res.text())
  .then(script => {
    code.textContent = script
    run.onclick = () => {
      output.textContent = ""
      var start = performance.now()
      try { eval(script) } catch( err ){ console.log( err ) }
      console.log( "----- END: " + ((performance.now() - start) / 1000).toFixed(9) + "s -----" )
    }
  })
.catch(console.log)