var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ReviewSchema   = new Schema({
    rating: Number,
    comment: String,
    user: String,
    itemName: String,
    ratings: Array(),
    comments: Array()
});


module.exports = mongoose.model('Review', ReviewSchema);