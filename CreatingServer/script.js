const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req)
  res.end('hello from the server')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
