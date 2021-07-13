//when requested, this api will send data from data.json
const http = require('http')
const url = require('url')

const fs = require('fs')

const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8', (err, data) => {
  // const prodData = JSON.parse(data)
  // return data
  //you can remove the callback function from here
})

const server = http.createServer((req, res) => {
  const path = req.url
  if (path === '/') res.end('Welcome to home page')
  else if (path === '/dhaval') res.end('Welcome to dhaval Section')
  else if (path === '/api') {
    //we want to read data from the file and parse JSON to javascript and then send back the result to the client
    // fs.readFile('./dev-data/data.json', (err, data) => {})
    //alternate and better way as . means the location where node is running, not the place where we are executing code
    //(node may be running on desktop folder or somewhere else and place where we are executing code is different)

    // fs.readFile(`../dev-data/data.json`, 'utf-8', (err, data) => {
    //here we have used ..to go to NodeJS folder ; using . we would be in BuildingAPIs folder
    // const prodData = JSON.parse(data) // this will convert JSON to javascript
    // console.log(prodData)
    //we want to send string; not an object thats why we are sending data, and not prodData
    //but before sending, we need to tell browser that we are sending JSON
    res.writeHead(200, {
      'content-type': 'application/json',
    })
    //we commmented the some part of code to make the api faster
    //previously we used to read data from file and send res everytime we call the api
    //now we read the data first before even starting the server, and everytime our api is called, we send the res
    res.end(data)
    // })
    // res.end('trying to send res to api section')
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      // 'custom-header': 'I-am-Dhaval-developer-of-this-server',
    })
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to port 8000')
})
