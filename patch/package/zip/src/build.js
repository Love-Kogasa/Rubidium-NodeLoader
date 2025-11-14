const fs = require( "fs" )
const path = require( "path" )

const output = "../zip-files.js"
const exportName = "_zip"
const textType = [
  ".js", ".json", ".ejs", ".txt"
]
const excludes = [
  /^build\.js$/,
  /^zip\-files\.js$/,
  /.*\.zip$/,
  /.*\.ts$/,
  /.*\.bak$/,
  /.*\.md$/,
  /^[^.]+$/,
  /.*\.html$/
]

var files = fs.readdirSync(".", {recursive: true})
files = files.filter(p => {
  if(!fs.statSync(p).isFile()) return false
  for(let v of excludes) if( v.test(p) ) return false
  return true
})
files = files.map(p => ["/" + p, textType.includes(path.extname(p)) ? fs.readFileSync(p).toString() : fs.readFileSync(p).toJSON().data])
fs.writeFileSync(
  output,
  "const " + exportName + " = " + JSON.stringify(Object.fromEntries(files))
)

console.log( "build ok ::: " + output )