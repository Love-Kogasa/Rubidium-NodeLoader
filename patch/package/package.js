(function() {
  const $path = require( "path" )
  function create(pkg) {
    var cache = {}
    localRequire.cache = cache
    // 设计遗留问题(
    return {
      require: localRequire,
      subModule: write, write: write,
      run: () => localRequire($path.join("/", package().main || "index.js")),
      content: pkg,
      share, package, shareCache: share,
    }
    function package(dir = "/") {
      var path = $path.join(dir, "package.json")
      return pkg[path] ? localRequire(path) : {}
    }
    function getPath(name, dir="/") {
      var path = name
      if(parseInt(name[0], 36) + 1) path = "/node_modules/" + path
      if(!name.includes("/")) path = $path.join(path, package(path).main || "index.js")
      if(!$path.extname(path)) path += ".js"
      return path[0] === "." ? $path.join(dir, path) : path
    }
    function write(path, module) {
      path = getPath(path)
      return cache[path] = module
    }
    function localRequire(name, dir="/") {
      var path = getPath(name, dir)
      return cache[path] || (load(path) || require(name))
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
      var module = {}
      cache[path] = {}
      Object.defineProperty(module, "exports", {
        get() {return cache[path]},
        set(v) {return cache[path] = v}
      })
      var dirname = $path.dirname(path)
      var require = (name) => localRequire(name, dirname)
      require.cache = cache;
      (function(__dirname, __pathname, require, module, exports) {
        eval(code)
      })(dirname, path, require, module, module.exports)
      return cache[path]
    }
    function load(path) {
      var data = pkg[path]
      if(!data) return false
      data = Buffer.from(data)
      if([".js",".ejs"].includes($path.extname(path))) {
        return runner(data.toString(), path)
      } else if($path.extname(path) === ".json") {
        return (cache[path] = JSON.parse(data.toString()))
      } else {
        return (cache[path] = data)
      }
    }
  }
  
  var packager = {create}
  require.browser.register({
    "rubidium:package": packager,
    "package": packager
  })
})()