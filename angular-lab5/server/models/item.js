// app/models/bear.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ItemSchema   = new Schema({
    name: String,
    price: Number,
    tax: Number,
    quantity: Number,
    description : String,
    sales: Number,
    ratings: Array(5),
    comments: Array(5)
});


module.exports = mongoose.model('Item', ItemSchema);