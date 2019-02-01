var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

var User = mongoose.model('User', userSchema,'user');
module.exports = User;