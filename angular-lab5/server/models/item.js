// app/models/bear.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ItemSchema   = new Schema({
    name: String,
    price: Number,
    tax: Number,
    quantity: Number
});


module.exports = mongoose.model('Item', ItemSchema);