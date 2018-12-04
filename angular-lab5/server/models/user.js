var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    email: String,
    password: String,
    loggedIn: Boolean,
    isVerified: Boolean,
    isAdmin: Boolean,
    verificationCode: String
});


module.exports = mongoose.model('User', UserSchema);