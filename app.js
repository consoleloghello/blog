const express = require("express");
const swig = require("swig");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookies = require("cookies");
const User = require("./models/User");
var app = express();



/*设置静态文件托管*/
app.use("/public", express.static(__dirname + "/public"));

// 参数1：模板引擎名称，同时也是模板文件的后缀
// 参数2：解析模板内容的方法
app.engine("html", swig.renderFile);
// 参数1：必须是views
// 参数2：目录路径
app.set("views", "./views");

// 注册模板引擎
// 参数1：必须是view engine
// 参数2：和app.engine（）定义的第一个参数是一致的
app.set("view engine", "html");
// 开发中，取消缓存，不用每次重启服务器
swig.setDefaults({ cache: false });


app.use(bodyParser.urlencoded({ extended: true }));

//设置cookies
app.use(function (req, res, next) {
	req.cookies = new cookies(req, res);
	
	//解析登录用户的cookies
	req.userInfo = {};
	if(req.cookies.get("userInfo")){
		try{
			req.userInfo = JSON.parse(req.cookies.get("userInfo"));
			
			//获取当前用户是否为管理员
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				next();
			});
		}catch(e){
			next();
		}
	}else{
		next();
	}
	
	
});

app.use("/admin", require("./routers/admin"));
app.use("/api", require("./routers/api"));
app.use("/", require("./routers/main"));


/*监听http请求*/
mongoose.connect("mongodb://localhost:27018/miaoBlog", function (err) {
	if (err) {
		console.log("数据库连接错误");
	} else {
		console.log("数据库连接成功");
		app.listen(8081);
	}
});




console.log("server running...");
/*// 首页
app.get("/", function(req,res,next) {
	// res.send("<h1>欢迎来到我的博客!!!</h1>");

	// 读取目录下的文件，返回客户端
	// 参数1：模板文件，相对于views目录 views/index.html
	res.render("index");
});*/
