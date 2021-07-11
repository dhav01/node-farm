//in real world applications, routing is implemented using express js (which we are going to learn soon)
const url = require('url')
const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
  const path = req.url
  //for root
  if (path === '/') {
    res.end('This is home section')
  } else if (path === '/overview') {
    res.end('hello from the server to overview section')
  } else if (path === '/dhaval') {
    res.end('hello from the server to dhaval section')
  } else {
    //this section is for pages searched by user which are unavailable .i.e. 404 handle
    //to add status code 404

    //we always need to set up response code and headers before sending out the request/response content
    res.writeHead(404, {
      //setting headers
      'content-type': 'text/html', //we are informing the browser of content type
      //we can also setup our own custom headers
      'my-header': 'i-am-dhaval',
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
