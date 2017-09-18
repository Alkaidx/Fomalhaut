// 载入模块
var server = require("./pngUpload/server"); 
var router = require("./pngUpload/router");
var requestHandlers = require("./pngUpload/requestHandlers");

// 充当路由
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);