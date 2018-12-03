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
    _id: String
});


module.exports = mongoose.model('Item', ItemSchema);