const http = require('http')
const url = require('url')

const fs = require('fs')

const data = fs.readFileSync(`../dev-data/data.json`, 'utf-8')
const tempOverview = fs.readFileSync(
  `../NODE-Farm/templates/template-overview.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `../NODE-Farm/templates/template-product.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `../NODE-Farm/templates/template-card.html`,
  'utf-8'
)
const dataObj = JSON.parse(data)

//replace template function
replaceTemplate = (tempCard, element) => {
  //here we want to replace all the placeholders , not only first one thats why we need to use /g (to make it global)
  let output = tempCard.replace(/{%productName%}/g, element.productName)
  output = output.replace(/{%productImage%}/g, element.image)
  output = output.replace(/{%productDescription%}/g, element.description)
  output = output.replace(/{%productPrice%}/g, element.price)
  output = output.replace(/{%productQuantity%}/g, element.quantity)
  output = output.replace(/{%productFrom%}/g, element.from)
  output = output.replace(/{%productId%}/g, element.id)
  output = output.replace(/{%productNutrients%}/g, element.nutrients)

  if (!element.organic) {
    output = output.replace(/{%notOrganic%}/g, 'not-organic')
  }
  return output
}

/**
  * AS url.parse is deprecated, we need to use the following syntax:
  * const server = http.createServer((req, res) => {
   const baseURL = 'http://' + req.headers.host + '/';
   const reqUrl = new URL(req.url,baseURL);
   console.log(reqUrl);
});

you will following output
URL {
  href: 'http://127.0.0.1:3000/favicon.ico',
  origin: 'http://127.0.0.1:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: '127.0.0.1:3000',
  hostname: '127.0.0.1',
  port: '3000',
  pathname: '/favicon.ico',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
  */

const server = http.createServer((req, res) => {
  // const pathname = req.url
  // console.log(url.parse(req.url))
  const baseURL = 'http://' + req.headers.host + '/'
  const { searchParams, pathname } = new URL(req.url, baseURL)
  // const reqUrl = new URL(req.url, baseURL)
  // console.log(reqUrl); uncomment this code to understand why we destructured and gave searchParams and pathname name as variable

  if (pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    //here we want to replace placeholders with the data from data.json
    const htmlCards = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el) //without return you will get undefined and arrow func in map without
        //curly braces implicitly returns the func
      })
      .join('')
    //htmlCards is an array of all the elements(in html form).... we want to convert it into string format
    //and we do that using join('') method
    // console.log(htmlCards)
    //before sending the final response,we need to replace card placeholder with htmlCards
    const output = tempOverview.replace('{%productCards%}', htmlCards)
    res.end(output)
  }
  //the product page
  else if (pathname === '/product') {
    // const id = searchParams.get('id')     this way you can get the current id of element

    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    const product = dataObj[searchParams.get('id')]
    const output = replaceTemplate(tempProduct, product)
    // console.log(id)

    res.end(output)
  }
  //this is the res we send when our api is hit
  else if (pathname === '/api') {
    res.end(data)
  }
  //pages which are not found
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
    })
    res.end('Man... You are lost! Please find right URL')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to server on port 8000....I am online')
})
