var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ReviewSchema   = new Schema({
    rating: Number,
    comment: String,
    user: String,
    itemName: String
});


module.exports = mongoose.model('Review', ReviewSchema);