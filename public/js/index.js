$(function(){
	var $loginBox = $("#loginBox");
	var $registerBox = $("#registerBox");
	var $userInfo = $("#userInfo");

	$loginBox.find("a.colMint").on("click",function(){
		$loginBox.hide();
		$registerBox.show();
	});

	//注册
	$registerBox.find("button").on("click", function () {
		//通过ajax提交请求
		$.ajax({
			type: "post",
			url: "/api/user/register",
			data: {
				username: $registerBox.find("[name=username]").val(),
				password: $registerBox.find("[name=password]").val(),
				repassword: $registerBox.find("[name=repassword]").val()
			},
			dataType: "json",
			success: function (results) {
				console.log(results);
				$registerBox.find(".colWarning").html(results.message);
				if (!results.code) {
					//success
					setTimeout(function(){
						$loginBox.show();
						$registerBox.hide();
					},1000);
					// window.location.reload();
				}
			}
		});
	});

	//登录
	$loginBox.find("button").on("click", function () {
		console.log(0);
		//通过ajax提交请求
		$.ajax({
			type: "post",
			url: "/api/user/login",
			data:{
				username: $loginBox.find("[name=username]").val(),
				password: $loginBox.find("[name=password]").val()
			},
			dataType:"json",
			success: function (result) {
				console.log(result);

				$loginBox.find(".colWarning").html(result.message);

				if (!result.code){
					//登录成功
					setTimeout(function(){
						$loginBox.hide();
						$userInfo.show();
						//显示登录用户的信息
						$userInfo.find(".username").html(result.userInfo.username);
						$userInfo.find(".info").html("你好，欢迎光临我的博客！");
					},1000);
				}
			}
		})
	})

	//退出登录
	$("#logout").on("click", function () {
		$.ajax({
			url: "/api/user/logout",
			success: function (result) {
				if (!result.code) {
					window.location.reload();
				}
			}
		});
	});
});









