const fs = require( "fs" )
const path = require( "path" )
const excludes = [
  /^build\.js$/,
  /^npm\-files\.js$/,
  /.*\.ts$/,
  /.*\.bak$/,
  /.*\.md$/,
  /^[^.]+$/,
  /.*\.html$/
]
const textType = [
  ".js", ".json", ".ejs", ".txt"
]
var files = fs.readdirSync(".", {recursive: true})
files = files.filter(p => {
  if(!fs.statSync(p).isFile()) return false
  for(let v of excludes) if( v.test(p) ) return false
  return true
})
files = files.map(p => ["/" + p, textType.includes(path.extname(p)) ? fs.readFileSync(p).toString() : fs.readFileSync(p).toJSON().data])
fs.writeFileSync(
  "../npm-files.js",
  "const _npm = " + JSON.stringify(Object.fromEntries(files))
)

console.log( "build ok ::: npm-files.js" )