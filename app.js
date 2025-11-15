var code = document.getElementById( "code" )
var run = document.getElementById( "run" )
var modules = document.getElementById( "modules" )
var output = document.getElementById( "output" )
var {__pathname, __dirname} = initPath()

code.value = 
`const app = require( "app" )
app.log("I Love U")`
run.onclick = () => {
  try {
    output.textContent = ""
    eval(code.value)
  } catch( err ){
    output.textContent += err.toString()
  }
}

module.exports = {
  dom: output,
  log(...text) {
    output.textContent += text.join( " " ) + "\n"
    return this
  }
}

modules.textContent = Object.keys(require.cache).join( " | " )