var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    email: String,
    password: String,
    code : String,
    loggedIn: Boolean
});


module.exports = mongoose.model('User', UserSchema);