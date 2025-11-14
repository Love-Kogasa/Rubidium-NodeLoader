(function() {
  const {create} = require("rubidium:package")
  var zip = create(_zip)
  var module = zip.run()
  require.browser.register({
    "package.zip": module,
    "rubidium:package.zip": module,
    "package.zip.pkg": zip,
    "rubidium:package.zip.pkg": zip
  })
})()