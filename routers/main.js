const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
	
	// console.log(req.userInfo);

	// res.send("main/index.html", {
	// 	userInfo: req.userInfo
	// });
	// res.send("ok");
	// res.end();
	res.render("main/index.html",{
		userInfo: req.userInfo
	})
});





module.exports = router;