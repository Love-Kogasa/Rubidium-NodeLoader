(() => {
  const stream = require("stream")
  const {parse} = require("url")
  
  var netstack = {}
  
  class ServerRequest extends stream.Readable {
    constructor(request) {
      super()
      Object.assign(this, request)
      Object.assign(this, parse(request.url))
      this.url = this.path
    }
    _read() {
      var reader = this.body.getReader()
      reader.read().then(({value}) => {
        this.push(value || null)
      })
    }
  }
  
  class ServerResponse extends stream.Writable {
    body = new Blob()
    constructor(init) {
      super()
      Object.assign(this, init)
      this.stream = new WritableStream({
        start: chunk => (this.body = new Blob([this.body, chunk])),
        close: () => this.emit("finish")
      })
    }
    _write(chunk, encoding) {
      this.body = new Blob([this.body, Buffer.from(chunk, encoding)])
    }
    end(chunk, encoding, cb) {
      chunk && (this.write(chunk, encoding, cb))
      this.emit("finish")
      return this
    }
    _isResponse(object) {
      return object.toString() === "[object Response]"
    }
    _createResponse() {
      return this._isResponse(this.body) ? this.body : new Response(this.body, this)
    }
  }
  
  class Server {
    host = "virtual.local"
    constructor(port, waitResponse = true) {
      port && (this.listen(port))
      this.waitResponse = waitResponse
    }
    request(req, res) {
      res.end()
    }
    listen(port, cb = () => void 0) {
      this.port = port
      netstack[port] = this
      cb()
      return this
    }
    close(cb = () => void 0) {
      delete netstack[this.port]
      cb()
      return this
    }
  }
  
  function localFetch(to, init) {
    var url = parse(to)
    var req = new Request(to, init)
    if(netstack[url.port] && netstack[url.port].host === url.hostname) {
      var server = netstack[url.port]
      req = new ServerRequest(req)
      var res = new ServerResponse({
        headers: {host: server.hostname}
      })
      res.url = to
      return new Promise (async (resolve, rej) => {
        if(server.waitResponse) {
          res.on("error", rej)
          res.on("finish", () => {
            var result = res._createResponse()
            Object.defineProperty(result, "url", {
              value: res.url
            })
            resolve(result)
          })
          await server.request(req, res)
        } else {
          await server.request(req, res)
          var result = res._createResponse()
          Object.defineProperty(result, "url", {
            value: res.url
          })
          resolve(result)
        }
      })
    } else return fetch(req)
  }
  
  async function createBlobURL(to, init) {
    var blob = await (await localFetch(to, init)).blob()
    var url = URL.createObjectURL(blob)
    return url
  }
  
  function createServer(request) {
    var server = new Server
    server.request = request
    return server
  }
  
  var exports = {
    createServer, Server, ServerRequest, ServerResponse, localFetch, fetch: localFetch, netstack, createBlobURL
  }
  
  if(!window) {
    module.exports = exports
  } else {
    require.browser.register({
      "rubidium:serverless": exports,
      serverless: exports
    })
  }
})()