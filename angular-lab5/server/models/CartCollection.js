var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartCollectionSchema = new Schema ({
    cartUser: String,
    cartName: String,
    desc: String,
    isprivate: Boolean,
    items : Array()
});

module.exports = mongoose.model('Collections', CartCollectionSchema);