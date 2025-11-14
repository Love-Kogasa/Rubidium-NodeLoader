const {Reader} = require("zip")
const path = require("path")
const {create} = require("rubidium:package")

function createPackage(bytes) {
  var files = Reader(Buffer.from(bytes)).toObject("base64")
  files = Object.fromEntries(Object.keys(files).map(k => [path.join("/", k), Buffer.from(files[k], "base64").toJSON().data]))
  return create(files)
}

createPackage["from"] = async url => createPackage(await (await fetch(url)).arrayBuffer())

module.exports = createPackage