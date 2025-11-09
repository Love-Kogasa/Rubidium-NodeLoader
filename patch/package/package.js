(function() {
  const $path = require( "path" )
  function create(pkg) {
    var cache = {}
    localRequire.cache = cache
    // 设计遗留问题(
    return {
      require: localRequire,
      submodule: (name, module) => (cache["/node_modules/" + name] = module),
      run: () => localRequire($path.join("/", package().main)),
      content: pkg,
      share, package, shareCache: share,
    }
    function package(dir = "/") {
      var path = $path.join(dir, "package.json")
      return pkg[path] ? localRequire(path) : {main: "index.js"}
    }
    function localRequire(name, dir="/") {
      var path = name
      if(parseInt(name[0], 36) + 1) path = "/node_modules/" + path
      if(!name.includes("/")) path = $path.join(path, package(path).main)
      if(!$path.extname(path)) path += ".js"
      path = path[0] === "." ? $path.join(path, dir) : path
      return cache[path] || ((cache[path] = load(path)) || require(name))
    }
    function share(onlyModule = true, to = window) {
      var shared = Object.keys(cache),
        moduleFilter = m => (/^\/node_modules\/.*/).test(m)
      if(onlyModule) shared = shared.filter(moduleFilter)
      shared = Object.fromEntries(
        shared.map(m => [m, cache[m]])
        .concat(shared.map(m => [m.replace("/node_modules/", ""), cache[m]])) )
      for( let key in shared ) !shared[key] ? delete shared[key] : void 0
      Object.assign(to.require.cache, shared)
      return shared
    }
    function runner(code, path) {
      var module = {module: {exports: {}}};
      (function(__dirname, __pathname, require, module) {
        exports = module.exports
        eval(code)
      })($path.dirname(path), $path.basename(path),
        (name) => localRequire(name, path),
      module.module)
      module = module.module
      return typeof module === "object" ?
        (Object.keys(module).length === 1 ? module.exports : module)
      : module
    }
    function load(path) {
      var data = pkg[path]
      if(!data) return false
      data = Buffer.from(data)
      if([".js",".ejs"].includes($path.extname(path))) {
        return runner(data.toString(), path)
      } else if($path.extname(path) === ".json") {
        return JSON.parse(data.toString())
      } else {
        return data
      }
    }
  }
  
  var packager = {create}
  require.browser.register({
    "rubidium:package": packager,
    "package": packager
  })
})()