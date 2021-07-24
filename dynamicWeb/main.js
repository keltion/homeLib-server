const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const templateList = (filelist)=>{
  let list = `<ul>`
  const length= filelist.length;
  let i = 0;
  while(i<length){
    list = list+ `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>` 
    i++;
  }
    list =list+ `</ul>`
    return list;
  };
    

const templateHTML = (title, description,list)=>{
  console.log(list);
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>keltion's Book Shelf Main</title>
  </head>
  <body>
      <h1> <a href= "/"> Home </a>, keltion의 책장에 오신것을 환영합니다.</h1>

        ${list}
      <h2>${title}</h2>
      <p> ${description}</p>
  </body>
  </html>`;
}
const server = http.createServer((request, response) => {
    let _url = request.url;
    const pathName = url.parse(_url,true).pathname;
    const queryData = url.parse(_url,true).query;
    let title=queryData.id;
    let templeate;
    let list;
    
    if(pathName==='/'){
      if(queryData.id===undefined){
        fs.readdir('./data', (err, files) => {
          title = 'Welcome';
          let description = '개인서제에 있는 책제목을 열람할 수 있는 웹 사이트입니다.';
          list = templateList(files);
          template = templateHTML(title,description,list);
          response.writeHead(200);
          response.end(template);   
        });
      } else{
        fs.readdir('./data', (err, files) => {
          fs.readFile(`data/${title}`,'utf8', (err,description)=>{
            list = templateList(files);
            template = templateHTML(title,description,list);
            response.writeHead(200);
            response.end(template);   
          });
        })
      }   

    } else{
      response.writeHead(404);
      response.end("Not Found");
    }
    
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});