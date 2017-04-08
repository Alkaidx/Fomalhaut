# nodeJsStudy

这是我在学习nodejs时写一些小栗子

1. 用nodejs实现的路由，其中使用了http 和url两个模块，实现了打印出输入url的功能:
    当输入的url为http://123.0.0.1:3000/teacher/六位数字
        会在网页上显示：您要查询老师信息，id（为输入的六个数字）；
    当输入的url为http://123.0.0.1:3000/student/十位数字
        会在网页上显示：您要查询学生信息，id（为输入的十个数字）；

2. 用nodejs实现的静态服务文件夹，其中使用了http，fs，url，path这四个模块，以及以一个第三方的mime模块，实现了一个简易的静态服务。
    输入stacic中的文件地址，就能通过网页访问。
    如: http://127.0.0.1:3000/hhh.html

3. 用nodejs实现的模版引擎，其中使用http，fs，以及第三方模块ejs。
    实现了类似php中的混编。
    可输入查看: http://127.0.0.1:3000/任意后缀

4. to be continue。。。