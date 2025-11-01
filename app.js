var code = document.getElementById( "code" )
var run = document.getElementById( "run" )
var modules = document.getElementById( "modules" )
var output = document.getElementById( "output" )
var {__pathname, __dirname} = initPath()

code.value = 
`const app = require( "app" )
const path = require( "path" )

if(!__pathname) var {__pathname} = initPath()
// In fact, you may need to initialize the path for each file once, if necessary

app.log( "File already run at: " )
app.log(
  path.join( "/", path.basename( __pathname || "app.js" ) )
)`
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