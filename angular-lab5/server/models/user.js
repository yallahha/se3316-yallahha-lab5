var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    email: String,
    password: String,
    Isverified : Boolean,
    code: String,
    loggedIn: Boolean
});


module.exports = mongoose.model('User', UserSchema);