(() => {
  var $package = require( "rubidium:package" )
  var npm = $package.create(_npm)
  require.browser.register({
    "rubidium:package.npm": npm.run(),
    "rubidium:package.npm.pkg": npm
  })
})()