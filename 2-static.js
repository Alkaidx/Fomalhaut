var http = require("http");
var fs = require("fs");         //file system 文件系统
var url = require("url");
var path = require("path");     //路径
var mime = require("mime");     //第三方的模块，使用npm install引入，用处就是方遍我们设置相应头，有助于游览器解析文件

console.log("服务器已打开");
var  server = http.createServer(function(req,res) {
    console.log("服务器接收到了请求：" + req.url);
    var pathname = url.parse(req.url).pathname;
    if(pathname == "/") {
        pathname = "/index.html";
    }
    var extname = path.extname(pathname); //获取拓展名

    fs.readFile("./static/"+pathname,function(err,data){
        if(err){ 
            fs.readFile("./static/404.html",function(err,data){
				res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
				res.end(data);
            })
            return;
         }
         var myMime = mime.lookup(pathname);
         var tmpchar = "Content-Type:"+myMime+";charset=UTF8";
         res.writeHead(200,{tmpchar})
         res.end(data);
    })




})

server.listen(3000,"127.0.0.1");