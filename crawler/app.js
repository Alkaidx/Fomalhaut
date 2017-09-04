
var superagent = require('superagent');    //引入我们安装好的模块
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');                   //引入文件读取模块



var initPage = 70
var page = 10 
var lists = [] 
for (var i = 0; i <= page; i++) {
   let list = `http://jandan.net/ooxx/page-${initPage}#comments`
   initPage--
   //console.log(list)
   lists.push(list)
   //crwalerMain(list)
}
var imgArr = [];
var dir = './images';
  var downloadImg = function(url, filename){
       request.head(url, function(err, res, body){
         request(url).pipe(fs.createWriteStream(dir + "/" + filename));
       });
  };
function crwalerMain(url){
  //使用superagent请求url http://jandan.net/ooxx
  superagent.get(url)    
            .end(function(err,docs){
              var $ = cheerio.load(docs.text);    //docs.text就是爬取到的数据，把它经过cheerio转换
              
              //$('.commentlist li .text p img')找到当前这页的所有图片元素,具体看下图hmtl结构就明白了
              $('.commentlist li .text p img').each(function(idx, element){
                  var $el = $(element);
                  imgArr.push("http:"+$el.attr('src'));   //将图片的链接push到数组里
              })
              
            })

  

}
var index=0
function main() {
  if (lists.length == 0) {
    console.log(imgArr.length)
   
    if(index<imgArr.length){
      setTimeout(function(){
      console.log("正在下载第"+index+"张照片"); 
      downloadImg(imgArr[index],imgArr[index].split('/')[4]); 
      index++
      main()
    },100)
    }
    

  }else{
    setTimeout(function(){
      var tempUrl = lists.shift()
      console.log(tempUrl)
      crwalerMain(tempUrl)
      main()
    },1000)
  }
  

}

main()