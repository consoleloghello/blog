
const mongoose = require("mongoose");
var userSchema = require("../schema/users");

module.exports = mongoose.model("User",userSchema);




