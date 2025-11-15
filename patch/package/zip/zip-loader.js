// This script is untested

var loaded = []
function loadScript() {
  const pkg = require("package.zip")
  var scripts = Array.from(document.getElementsByTagName("script"))
  scripts.forEach(async e => {
    if(e.type !== "zip") return;
    if(!loaded.includes(e.src)) {
      loaded.push(e.src)
      var pkg = await pkg.from(e.src)
      var exports = pkg.run()
      if(e.hasAttribute("share")) {
        Object.assign(window, exports)
      }
    }
  })
}

document.addEventListener("DOMContentLoaded",loadScript);