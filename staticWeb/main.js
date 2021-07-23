const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    let _url = request.url;
    if(_url=='/'){
        _url = '/index/index.html'
    }
    if(_url=='/bookshelf1'){
      _url = '/index/bookshelf1.html'
    }
    if(_url=='/bookshelf2'){
      _url = '/index/bookshelf2.html'
    }

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname+_url));
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
