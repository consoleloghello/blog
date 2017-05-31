const express = require("express");
const router = express.Router();
var User = require("../models/User");

//统一返回格式
var responseData;
router.use(function (req, res, next) {
	responseData = {
		code: 0,
		message: ""
	}
	next();
});

//用户注册
router.post("/user/register", function (req, res, next) {
	// res.send("api-user");
	// console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	//用户是否为空
	if (username == "") {
		responseData.code = 1;
		responseData.message = "用户名不能为空";
		res.json(responseData);
		return;
	};
	//密码不能为空
	if (password == "") {
		responseData.code = 2;
		responseData.message = "密码不能为空";
		res.json(responseData);
		return;
	}
	//两次输入密码必须一致
	if (password != repassword) {
		responseData.code = 3;
		responseData.message = "两次输入的密码必须一致";
		res.json(responseData);
		return;
	}

	//数据库操作
	User.findOne({
		username: username
	}).then(function (userInfo) {
		//console.log(1);
		//用户存在
		if (userInfo) {
			responseData.code = 4;
			responseData.message = "用户名已经被注册";
			res.json(responseData);
			return;
		}
		//保存用户数据到数据库
		var user = new User({
			username: username,
			password: password
		});
		return user.save();
	}).then(function (newUserInfo) {
		console.log(newUserInfo);
		responseData.message = "注册成功";
		res.json(responseData);
	});

	// responseData.message = "注册成功";
	// res.json(responseData);
});


//登录
router.post("/user/login", function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username == "" || password == "") {
		responseData.code = 1;
		responseData.message = "用户名或者密码不能为空";
		res.json(responseData);
		return;
	}
	//查询数据库中的用户和密码，存在则登录
	User.findOne({
		username: username,
		password: password
	}).then(function (userInfo) {
		if(!userInfo){
			responseData.code = 2;
			responseData.message = "用户名或密码错误";
			res.json(responseData);
			return;
		}
		//用户名和密码是正确的
		responseData.message = "登录成功";
		responseData.userInfo = {
			_id: userInfo._id,
			username: userInfo.username
		}
		req.cookies.set("userInfo", JSON.stringify({
			_id: userInfo._id,
			username: userInfo.username
		}));
		res.json(responseData);
		return;
	});
});

//退出登录
router.get("/user/logout", function (req, res) {
	req.cookies.set("userInfo", null);
	//responseData.message = "退出"
	res.json(responseData);
});

module.exports = router;