var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Item         = mongoose.Schema
var UserSchema   = new Schema({
    email: String,
    password: String,
    isVerified: Boolean,
    isAdmin: Boolean,
    verificationCode: String,
});


module.exports = mongoose.model('User', UserSchema);