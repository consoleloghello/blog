const express = require("express");
const swig = require("swig");
var app = express();
app.listen(8081);

// 参数1：模板引擎名称，同时也是模板文件的后缀
// 参数2：解析模板内容的方法
app.engine("html",swig.renderFile);
// 参数1：必须是views
// 参数2：目录路径
app.set("views","./views");

// 注册模板引擎
// 参数1：必须是view engine
// 参数2：和app.engine（）定义的第一个参数是一致的
app.set("view engine","html");
// 开发中，取消缓存，不用每次重启服务器
swig.setDefaults({cache:false});



// 首页
app.get("/", function(req,res,next) {
	// res.send("<h1>欢迎来到我的博客!!!</h1>");

	// 读取目录下的文件，返回客户端
	// 参数1：模板文件，相对于views目录 views/index.html
	res.render("index");
});
console.log("server running...");