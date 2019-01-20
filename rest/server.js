var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('rest/db.json')
var middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(function(req, res, next){
  setTimeout(next, 1000);
});

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})