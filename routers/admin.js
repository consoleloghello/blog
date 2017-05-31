const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.use(function (req, res, next) {
	if (!req.userInfo.isAdmin) {
		//当前用户是非管理员
		res.send("不是管理员");
		return;
	}
	next();
});

/*
 *首页
*/
router.get("/", function (req, res, next) {
	res.render("admin/index", {
		userInfo: req.userInfo
	});
});

/*
 *用户管理
*/
router.get("admin/user_index", function (req, res) {
	/*
	 *从数据库中读取所有的用户数据
	*/
	User.find().then(function (users) {
		console.log(users);
		res.render("admin/index", {
			userInfo: req.userInfo,
			users: users
		});

	});

})




module.exports = router;