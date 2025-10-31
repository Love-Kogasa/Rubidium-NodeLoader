// This file relies on Browserify to build :)
window.require.browser.register({
  path: require("path"),
  url: require("url"),
  querystring: require("querystring"),
  util: require("util"),
  events: require("events"),
  buffer: require("buffer"),
  stream: require("stream"),
  crypto: require("crypto"),
  assert: require("assert"),
  string_decoder: require("string_decoder"),
  timers: require("timers"),
  console: require("console"),
  fs: require("browserify-fs"),
  os: require("os-browserify"),
  http: require( "http-browserify" ),
  https: require( "https-browserify" )
})
window.Buffer = Buffer