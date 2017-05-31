const mongoose = require("mongoose");

// 用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    uesername: String,
    //密码
    password: String,
    //是否是管理员字段
    isAdmin: {
        type: Boolean,
        default: false
    }

});
