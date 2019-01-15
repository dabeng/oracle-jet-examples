var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('rest/db.json')
var middlewares = jsonServer.defaults()
var cors = require('cors')

server.use(cors())
server.use(middlewares)
server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})