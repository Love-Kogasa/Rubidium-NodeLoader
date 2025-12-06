// This file relies on Browserify to build :)
const fs = require("virtualfs")
const console = require("console-class-browser")
window.console.Console = console.Console

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
  os: require("os-browserify"),
  http: require( "http-browserify" ),
  https: require( "https-browserify" ),
  zlib: require( "browserify-zlib" ),
  vm: require( "vm-browserify" ),
  constants: require( "constants" ),
  domain: require("domain-browser"),
  console: console,
  fs: fs.default,
  virtualfs: fs
})

window.Buffer = Buffer
window.process = process
Object.assign(process, {
  stdout: console.stdout, stderr: console.stderr,
  cwd: () => fs.default.getCwd(),
  chdir: path => fs.default.chdir(path),
  umask: mask => fs.default.setUmask(mask)
})
window.global = globalThis