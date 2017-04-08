// 首先是先引入模块require
var http = require("http");   
var url = require("url");   //这个用来解析url


// 创建一个服务器，参数是一个回调函数(callback)，里面传入参数请求(request)和回应(response)
var server = http.createServer(function(req,res){
    console.log("服务器接收到了请求" + req.url);    //检测是否接到了请求
    if(req.url == "/favicon.ico"){
		return;
	}                                           //这个主要是为了处理chrome的小图标
    var pathname = url.parse(req.url).pathname;  //使用url.paese可以吧url解析成不同的部分
    
    var userurl = req.url;  //先获取当前的url
    
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"}) //设置响应头
	//substr函数来判断此时的开头
	if(pathname.substr(0,9) == "/student/"){
		var studentid = pathname.substr(9);
		console.log(studentid);
		if(/^\d{10}$/.test(studentid)){
			res.end("您要查询学生信息，id为" + studentid);
		}else{
			res.end("学生学号位数不对");
		}
	}else if(pathname.substr(0,9) == "/teacher/"){
		var teacherid = pathname.substr(9);
		if(/^\d{6}$/.test(teacherid)){
			res.end("您要查询老师信息，id为" + teacherid);
		}else{
			res.end("老师学号位数不对");
		}
	}else{
        console.log(pathname)
		res.end("请检查url");
	}


})


server.listen(3000,"127.0.0.1");