const initPath = () => {
   var paths = {}
   paths.__filename = document.currentScript ? new URL(document.currentScript.src, location.href) : location.href
   paths.__module = document.currentScript ? (document.currentScript.getAttribute( "require" ) || paths.__filename) : paths.__filename
   paths.__dirname = new URL( ".", paths.__filename )
   return paths
}

Object.assign(window, initPath())

var _nodeJsModuleStack = {}
var _module = {}
const module = new Proxy(_module, {
  set(self, key, value) {
    var {__module} = initPath()
    _nodeJsModuleStack[__module] = _nodeJsModuleStack[__module] || {}
    if( key === "exports" ) {
      _nodeJsModuleStack[__module] = value
    } else {
      _nodeJsModuleStack[__module][key] = value
    }
    return value
  },
  get(self, key) {
    var {__module} = initPath()
    return key === "exports" ? _nodeJsModuleStack[__module] : _nodeJsModuleStack[__module][key]
  },
  apply(self, thisArg, args) {
    var {__module} = initPath()
    return _nodeJsModuleStack[__module].apply(thisArg, args)
  },
  defineProperty(self, key, value) {
    var {__module} = initPath()
    return Object.Property(_nodeJsModuleStack[__module], key, value)
  },
  has(self, key) {
    var {__module} = initPath()
    return key in _nodeJsModuleStack[__module]
  }
})
_module.exports = module
window.exports = module

var require = ( moduleName ) => {
  if( parseInt(moduleName, 36) ) {
    return _nodeJsModuleStack[moduleName]
  } else {
    var {__module} = initPath()
    return _nodeJsModuleStack[
      new URL(moduleName, __module)
    ]
  }
}

require.cache = _nodeJsModuleStack

require.browser = {
  register( name, object ) {
    if(!object) {
      for( let key in name ) this.register( key, name[key] )
      return;
    } else _nodeJsModuleStack[name] = object
  }
}