const https = require( "https" )
const tgz = require( "node-tar.gz" )
const fs = require( "fs" )
const toArray = require( "stream-to-array" )
const path = require( "path" )
const pkg = require( "rubidium:package" )

class Npm {
  registry = "https://registry.npmjs.org/"
  constructor(pkg, log = console.log) {
    this.pkg = pkg
    this.log = log
  }
  clone() {
    return pkg.create({...this.pkg.content})
  }
  module(name, fileObj) {
    var files = {...fileObj}
    if(typeof fileObj.require === "function") files = {...fileObj.content}
    files = Object.fromEntries(Object.keys(files).map(p => [path.join("/node_modules/" + name, p), files[p]]))
    Object.assign(this.pkg.content, files)
    return this
  }
  remove(name) {
    for( let fn in this.pkg.content )
      if(fn.indexOf(path.join("/node_modules", name)) === 0) delete this.pkg.content[fn]
    return this
  }
  install(npmName, version) {
    if(npmName) {
      var name = npmName
      if(npmName.includes("@") && npmName[0] !== "@") {
        [name, version] = npmName.split("@")
      } else if(version && ["~", "^"].includes(version[0])) version = version.slice(1)
       return this._install(name, version)
    } else {
      return (async () => {
        var depends = this.pkg.package().dependencies || []
        for(let name in depends) await this.install(name, depends[name])
        return this
      })()
    }
  }
  async _install(name, version) {
    this.log("∷ " + name + "@" + (version || "latest"))
    const pkgConfig = await (await fetch(this.registry + name)).json()
    const distPkg = pkgConfig.versions[version || pkgConfig["dist-tags"].latest]
    this.module(name, await parseTarball(distPkg.dist.tarball))
    for(let name in distPkg.dependencies)
      await this.install(name, distPkg.dependencies[name])
    this.log("✓ " + name + "@" + (version || "latest"))
    return this
    function parseTarball(url) {
      return new Promise((res, rej) => {
        var untar = tgz().createParseStream()
        var tasks = []
        untar.on("entry", (entry) => {
          var path = entry.path
          if(path.includes("package/")) {
            tasks.push((async () => [entry.path.replace("package", "."), Buffer.concat(await toArray(entry))])())
          } else return;
        })
        untar.on("end", () => {
          Promise.all(tasks).then(m => res(Object.fromEntries(m))).catch(rej)
        })
        https.get(url, res => res.pipe(untar)).on("error", rej)
      })
    }
  }
}

module.exports = Npm